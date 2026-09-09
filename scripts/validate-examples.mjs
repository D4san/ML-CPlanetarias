import { readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const registryPath = join(root, 'glossary', 'examples', 'registry.json');
const fixtureDirectory = join(root, 'tests', 'fixtures', 'examples');
const errors = [];

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function add(path, message) {
  errors.push(`${path}: ${message}`);
}

function stringArray(value, path, { allowEmpty = false } = {}) {
  if (!Array.isArray(value) || value.some((item) => !nonEmpty(item))) {
    add(path, 'debe ser una lista de textos no vacíos');
    return [];
  }
  if (!allowEmpty && value.length === 0) add(path, 'no puede estar vacía');
  if (new Set(value).size !== value.length) add(path, 'contiene IDs duplicados');
  return value;
}

const registry = JSON.parse(await readFile(registryPath, 'utf8'));
if (!isObject(registry)) add('/registry', 'debe ser un objeto');
if (registry.kind !== 'example-registry') add('/kind', 'debe ser example-registry');
if (registry.visibility !== 'internal') add('/visibility', 'debe permanecer internal');
if (registry.publish_ready !== false) add('/publish_ready', 'debe ser false durante C01');
if (!nonEmpty(registry.domain_policy))
  add('/domain_policy', 'debe declarar la política de dominio');

const sources = isObject(registry.sources) ? registry.sources : {};
const sourceIds = Object.keys(sources);
if (sourceIds.length === 0) add('/sources', 'requiere al menos una fuente registrada');
for (const [id, source] of Object.entries(sources)) {
  if (!isObject(source) || source.id !== id || !nonEmpty(source.title)) {
    add(`/sources/${id}`, 'requiere ID coincidente y título');
    continue;
  }
  if (
    !['mission-dataset-documentation', 'institutional-source', 'original-paper'].includes(
      source.type,
    )
  ) {
    add(`/sources/${id}/type`, 'tipo no permitido');
  }
  if (!['verificado', 'parcial', 'pendiente'].includes(source.status)) {
    add(`/sources/${id}/status`, 'estado no permitido');
  }
  if (source.status === 'verificado' && (!nonEmpty(source.url) || !nonEmpty(source.location))) {
    add(`/sources/${id}`, 'una fuente verificada requiere URL y ubicación leída');
  }
}

const records = Array.isArray(registry.records) ? registry.records : [];
if (records.length === 0) add('/records', 'requiere registros');
const recordIds = records.map((record) => record?.id).filter((id) => nonEmpty(id));
if (new Set(recordIds).size !== recordIds.length)
  add('/records', 'contiene IDs duplicados o ausentes');
const requiredFields = [
  'question',
  'domain',
  'representation',
  'paradigm_task',
  'model',
  'baseline',
  'output',
  'evaluation',
  'interpretation',
  'limits',
  'claim_status',
  'next_action',
];
for (const [index, record] of records.entries()) {
  const path = `/records/${index}`;
  if (!isObject(record) || !nonEmpty(record.id)) {
    add(`${path}/id`, 'requiere un ID estable');
    continue;
  }
  if (record.status === 'verificado' && record.sourceIds?.length === 0) {
    add(`${path}/status`, 'un registro verificado requiere fuente');
  }
  if (!['verificado', 'parcial', 'pendiente'].includes(record.status)) {
    add(`${path}/status`, 'estado no permitido');
  }
  if (record.publish_ready !== undefined && record.publish_ready !== false) {
    add(`${path}/publish_ready`, 'debe ser false en preparación');
  }
  stringArray(record.sessionIds, `${path}/sessionIds`);
  stringArray(record.unitIds, `${path}/unitIds`);
  stringArray(record.routeIds, `${path}/routeIds`, { allowEmpty: true });
  for (const sourceId of stringArray(record.sourceIds, `${path}/sourceIds`, { allowEmpty: true })) {
    if (!sources[sourceId]) add(`${path}/sourceIds`, `falta la fuente ${sourceId}`);
  }
  stringArray(record.assetIds, `${path}/assetIds`, { allowEmpty: true });
  for (const field of requiredFields) {
    if (!nonEmpty(record[field])) add(`${path}/${field}`, 'debe ser texto no vacío');
  }
  if (/galax/i.test(JSON.stringify(record)))
    add(path, 'contiene un dominio galáctico no permitido');
}

const fixtureFiles = (await readdir(fixtureDirectory)).filter((file) => extname(file) === '.json');
const fixtures = await Promise.all(
  fixtureFiles.map(async (file) => [
    file,
    JSON.parse(await readFile(join(fixtureDirectory, file), 'utf8')),
  ]),
);
for (const [file, fixture] of fixtures) {
  if (!isObject(fixture) || !nonEmpty(fixture.id)) add(`/fixtures/${file}/id`, 'requiere un ID');
  if (fixture.publish_ready === true) add(`/fixtures/${file}/publish_ready`, 'no puede promoverse');
  if (file === 'valid-paper.json' && fixture.source_type !== 'mission-dataset-documentation') {
    add(`/fixtures/${file}`, 'debe representar el fixture documental del paper/mission');
  }
  if (file === 'valid-institution.json' && fixture.source_type !== 'institutional-source') {
    add(`/fixtures/${file}`, 'debe representar una fuente institucional');
  }
  if (file === 'pending-concept.json' && fixture.status !== 'pendiente') {
    add(`/fixtures/${file}/status`, 'debe conservar el bloqueo pendiente');
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Ejemplos válidos: ${records.length} registros, ${sourceIds.length} fuentes y ${fixtures.length} fixtures internos.`,
  );
}
