import { readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import matter from 'gray-matter';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  const paths = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return paths.flat();
}

function markdownOnly(paths) {
  return paths.filter((path) => ['.md', '.mdx'].includes(extname(path).toLowerCase()));
}

function formatAjvErrors(errors = []) {
  return errors.map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ');
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function portablePath(value) {
  return (
    nonEmpty(value) &&
    !/^[A-Za-z]:[\\/]/.test(value) &&
    !value.startsWith('/') &&
    !value.startsWith('file:')
  );
}

function addFixtureIssue(issues, path, message) {
  issues.push(`${path}: ${message}`);
}

function fixtureStringArray(value, path, issues, { required = true } = {}) {
  if (!Array.isArray(value) || value.some((item) => !nonEmpty(item))) {
    addFixtureIssue(issues, path, 'debe ser un arreglo de cadenas no vacías');
    return [];
  }
  if (required && value.length === 0) addFixtureIssue(issues, path, 'no puede estar vacío');
  const duplicateIds = value.filter((item, index) => value.indexOf(item) !== index);
  if (duplicateIds.length > 0)
    addFixtureIssue(issues, path, `IDs duplicados: ${[...new Set(duplicateIds)].join(', ')}`);
  return value;
}

function validateCourseFixture(course) {
  const issues = [];
  if (!isObject(course)) return ['/: debe ser un objeto'];
  for (const field of ['id'])
    if (!nonEmpty(course[field]))
      addFixtureIssue(issues, `/${field}`, 'debe ser una cadena no vacía');
  if (
    !isObject(course.identity) ||
    !nonEmpty(course.identity.id) ||
    !nonEmpty(course.identity.title)
  ) {
    addFixtureIssue(issues, '/identity', 'requiere id y title no vacíos');
  }
  if (!isObject(course.defaults)) {
    addFixtureIssue(issues, '/defaults', 'debe ser un objeto');
  } else {
    if (!['interactive', 'direct'].includes(course.defaults.interactionMode))
      addFixtureIssue(issues, '/defaults/interactionMode', 'modo inválido');
    if (typeof course.defaults.teacherMode !== 'boolean')
      addFixtureIssue(issues, '/defaults/teacherMode', 'debe ser booleano');
    if (!['presentation', 'reading', 'activities'].includes(course.defaults.defaultView))
      addFixtureIssue(issues, '/defaults/defaultView', 'vista inválida');
  }
  if (!isObject(course.references)) addFixtureIssue(issues, '/references', 'debe ser un registro');
  const references = isObject(course.references) ? course.references : {};
  for (const [id, reference] of Object.entries(references)) {
    if (
      !isObject(reference) ||
      reference.id !== id ||
      !nonEmpty(reference.title) ||
      (!nonEmpty(reference.url) && !nonEmpty(reference.doi))
    ) {
      addFixtureIssue(issues, `/references/${id}`, 'requiere ID coincidente, título y URL/DOI');
    }
  }
  if (!isObject(course.examples)) addFixtureIssue(issues, '/examples', 'debe ser un registro');
  const examples = isObject(course.examples) ? course.examples : {};
  for (const [id, example] of Object.entries(examples)) {
    if (!isObject(example) || example.id !== id) {
      addFixtureIssue(issues, `/examples/${id}/id`, 'debe coincidir con la clave');
      continue;
    }
    for (const field of [
      'question',
      'domain',
      'representation',
      'task',
      'interpretation',
      'limits',
    ]) {
      if (!nonEmpty(example[field]))
        addFixtureIssue(issues, `/examples/${id}/${field}`, 'debe ser no vacío');
    }
    for (const sourceId of fixtureStringArray(
      example.sourceIds,
      `/examples/${id}/sourceIds`,
      issues,
    )) {
      if (!references[sourceId])
        addFixtureIssue(issues, `/examples/${id}/sourceIds`, `falta la referencia ${sourceId}`);
    }
  }
  if (!isObject(course.concepts)) addFixtureIssue(issues, '/concepts', 'debe ser un registro');
  const concepts = isObject(course.concepts) ? course.concepts : {};
  for (const [id, concept] of Object.entries(concepts)) {
    if (
      !isObject(concept) ||
      concept.id !== id ||
      !nonEmpty(concept.term) ||
      !nonEmpty(concept.definition)
    ) {
      addFixtureIssue(issues, `/concepts/${id}`, 'requiere ID, término y definición');
      continue;
    }
    for (const sourceId of fixtureStringArray(concept.sources, `/concepts/${id}/sources`, issues)) {
      if (!references[sourceId])
        addFixtureIssue(issues, `/concepts/${id}/sources`, `falta la referencia ${sourceId}`);
    }
  }
  if (!isObject(course.sessions)) addFixtureIssue(issues, '/sessions', 'debe ser un registro');
  const sessions = isObject(course.sessions) ? course.sessions : {};
  const enabledSessions = fixtureStringArray(
    course.enabledSessionIds,
    '/enabledSessionIds',
    issues,
    { required: false },
  );
  for (const sessionId of enabledSessions)
    if (!sessions[sessionId])
      addFixtureIssue(issues, '/enabledSessionIds', `falta la sesión ${sessionId}`);
  for (const [id, session] of Object.entries(sessions)) {
    const path = `/sessions/${id}`;
    if (!isObject(session) || session.id !== id) {
      addFixtureIssue(issues, `${path}/id`, 'debe coincidir con la clave');
      continue;
    }
    for (const field of ['title', 'summary'])
      if (!nonEmpty(session[field]))
        addFixtureIssue(issues, `${path}/${field}`, 'debe ser no vacío');
    fixtureStringArray(session.objectives, `${path}/objectives`, issues);
    if (
      !isObject(session.bibliography) ||
      !nonEmpty(session.bibliography.id) ||
      !nonEmpty(session.bibliography.title) ||
      !Array.isArray(session.bibliography.items) ||
      session.bibliography.items.length === 0
    ) {
      addFixtureIssue(issues, `${path}/bibliography`, 'requiere al menos un material');
    }
    if (isObject(session.bibliography) && Array.isArray(session.bibliography.items)) {
      for (const [index, item] of session.bibliography.items.entries()) {
        if (!isObject(item) || !nonEmpty(item.id) || !nonEmpty(item.title))
          addFixtureIssue(issues, `${path}/bibliography/items/${index}`, 'requiere ID y título');
        for (const sourceId of fixtureStringArray(
          item?.referenceIds,
          `${path}/bibliography/items/${index}/referenceIds`,
          issues,
        )) {
          if (!references[sourceId])
            addFixtureIssue(
              issues,
              `${path}/bibliography/items/${index}/referenceIds`,
              `falta la referencia ${sourceId}`,
            );
        }
      }
    }
    if (!isObject(session.units)) addFixtureIssue(issues, `${path}/units`, 'debe ser un registro');
    const units = isObject(session.units) ? session.units : {};
    for (const [unitId, unit] of Object.entries(units)) {
      const unitPath = `${path}/units/${unitId}`;
      if (!isObject(unit) || unit.id !== unitId)
        addFixtureIssue(issues, `${unitPath}/id`, 'debe coincidir con la clave');
      for (const field of ['function', 'title', 'idea', 'content'])
        if (!nonEmpty(unit?.[field]))
          addFixtureIssue(issues, `${unitPath}/${field}`, 'debe ser no vacío');
      for (const exampleId of fixtureStringArray(
        unit?.exampleIds,
        `${unitPath}/exampleIds`,
        issues,
      ))
        if (!examples[exampleId])
          addFixtureIssue(issues, `${unitPath}/exampleIds`, `falta el ejemplo ${exampleId}`);
      for (const conceptId of fixtureStringArray(
        unit?.conceptIds,
        `${unitPath}/conceptIds`,
        issues,
        { required: false },
      ))
        if (!concepts[conceptId])
          addFixtureIssue(issues, `${unitPath}/conceptIds`, `falta el concepto ${conceptId}`);
    }
    if (!isObject(session.stations))
      addFixtureIssue(issues, `${path}/stations`, 'debe ser un registro');
    const stations = isObject(session.stations) ? session.stations : {};
    const stationIds = fixtureStringArray(session.stationIds, `${path}/stationIds`, issues);
    for (const stationId of stationIds)
      if (!stations[stationId])
        addFixtureIssue(issues, `${path}/stationIds`, `falta la estación ${stationId}`);
    for (const [stationId, station] of Object.entries(stations)) {
      if (
        !isObject(station) ||
        station.id !== stationId ||
        !nonEmpty(station.title) ||
        !nonEmpty(station.purpose)
      )
        addFixtureIssue(issues, `${path}/stations/${stationId}`, 'requiere ID, título y propósito');
      for (const unitId of fixtureStringArray(
        station?.unitIds,
        `${path}/stations/${stationId}/unitIds`,
        issues,
      ))
        if (!units[unitId])
          addFixtureIssue(
            issues,
            `${path}/stations/${stationId}/unitIds`,
            `falta la unidad ${unitId}`,
          );
    }
    if (session.enabledRouteIds !== undefined) {
      const routeIds = fixtureStringArray(
        session.enabledRouteIds,
        `${path}/enabledRouteIds`,
        issues,
        { required: false },
      );
      const routes = isObject(session.routes) ? session.routes : {};
      if (routeIds.length === 0 && Object.keys(routes).length > 0)
        addFixtureIssue(issues, `${path}/enabledRouteIds`, 'no puede estar vacío si hay rutas');
      for (const routeId of routeIds)
        if (!routes[routeId])
          addFixtureIssue(issues, `${path}/enabledRouteIds`, `falta la ruta ${routeId}`);
      if (session.defaultRouteId !== undefined && !routeIds.includes(session.defaultRouteId))
        addFixtureIssue(issues, `${path}/defaultRouteId`, 'debe pertenecer a enabledRouteIds');
    }
    if (!isObject(session.provenance))
      addFixtureIssue(issues, `${path}/provenance`, 'debe declarar procedencia');
    else if (session.provenance.origin === 'obsidian') {
      if (
        !nonEmpty(session.provenance.source_vault) ||
        !portablePath(session.provenance.source_note) ||
        !nonEmpty(session.provenance.source_heading)
      )
        addFixtureIssue(
          issues,
          `${path}/provenance`,
          'Obsidian requiere vault, nota relativa y encabezado',
        );
    } else if (session.provenance.origin === 'repo') {
      if (
        !portablePath(session.provenance.source_path) ||
        !nonEmpty(session.provenance.source_heading)
      )
        addFixtureIssue(
          issues,
          `${path}/provenance`,
          'repo requiere source_path relativo y encabezado',
        );
    } else addFixtureIssue(issues, `${path}/provenance/origin`, 'debe ser obsidian o repo');
    if (!isObject(session.editorial))
      addFixtureIssue(issues, `${path}/editorial`, 'debe declarar estado editorial');
    else {
      if (
        !['intake', 'drafting', 'reviewed', 'published', 'returned'].includes(
          session.editorial.status,
        )
      )
        addFixtureIssue(issues, `${path}/editorial/status`, 'estado inválido');
      if (!['internal', 'public'].includes(session.editorial.visibility))
        addFixtureIssue(issues, `${path}/editorial/visibility`, 'visibilidad inválida');
      if (typeof session.editorial.publish_ready !== 'boolean')
        addFixtureIssue(issues, `${path}/editorial/publish_ready`, 'debe ser booleano');
      if (
        !isObject(session.editorial.rights) ||
        !nonEmpty(session.editorial.rights.note) ||
        !['original', 'open-license', 'permission'].includes(session.editorial.rights.status)
      )
        addFixtureIssue(issues, `${path}/editorial/rights`, 'derechos incompletos');
    }
  }
  return issues;
}

async function parseMarkdown(path) {
  const source = await readFile(path, 'utf8');
  const parsed = matter(source);
  return { path, source, data: parsed.data };
}

const packetSchema = await readJson(join(root, 'schemas', 'packet.schema.json'));
const publicSchema = await readJson(join(root, 'schemas', 'public-content.schema.json'));
const outboxSchema = await readJson(join(root, 'schemas', 'outbox.schema.json'));

const validatePacket = ajv.compile(packetSchema);
const validatePublic = ajv.compile(publicSchema);
const validateOutbox = ajv.compile(outboxSchema);
const failures = [];
const notices = [];

function validateEntry(entry, validator, label) {
  if (!validator(entry.data)) {
    failures.push(`${relative(root, entry.path)} (${label}): ${formatAjvErrors(validator.errors)}`);
  }
}

const inboxEntries = await Promise.all(
  markdownOnly(await walk(join(root, 'inbox'))).map(parseMarkdown),
);
const canonicalPackets = inboxEntries.filter(({ path, data }) => {
  const name = path.split(/[\\/]/).at(-1);
  return (
    name !== 'README.md' &&
    name !== '_template-packet.md' &&
    data.id &&
    !['course-context', 'source-map'].includes(data.kind)
  );
});

const packetIds = new Map();
for (const entry of canonicalPackets) {
  validateEntry(entry, validatePacket, 'packet');
  const prior = packetIds.get(entry.data.id);
  if (prior) {
    failures.push(
      `ID de paquete duplicado ${entry.data.id}: ${relative(root, prior)} y ${relative(root, entry.path)}`,
    );
  } else {
    packetIds.set(entry.data.id, entry.path);
  }
}

for (const entry of inboxEntries.filter(({ data }) =>
  ['course-context', 'source-map'].includes(data.kind),
)) {
  notices.push(
    `${relative(root, entry.path)} conserva metadatos auxiliares pendientes de normalizar.`,
  );
}

const publicEntries = await Promise.all(
  markdownOnly(await walk(join(root, 'docs', 'content'))).map(parseMarkdown),
);
for (const entry of publicEntries) {
  validateEntry(entry, validatePublic, 'public content');
  if (/\b[A-Za-z]:[\\/]/.test(entry.source)) {
    failures.push(`${relative(root, entry.path)} contiene una ruta absoluta local.`);
  }
}

const outboxEntries = (
  await Promise.all(markdownOnly(await walk(join(root, 'outbox'))).map(parseMarkdown))
).filter(({ path }) => !path.endsWith(`${join('outbox', 'README.md')}`));
for (const entry of outboxEntries) validateEntry(entry, validateOutbox, 'outbox');

const fixturePaths = (await walk(join(root, 'tests', 'fixtures', 'course'))).filter(
  (path) => extname(path).toLowerCase() === '.json',
);
for (const path of fixturePaths) {
  const fileName = path.split(/[\\/]/).at(-1) ?? '';
  const issues = validateCourseFixture(JSON.parse(await readFile(path, 'utf8')));
  if (fileName.startsWith('valid-') && issues.length > 0) {
    failures.push(`${relative(root, path)} (fixture válido): ${issues.join('; ')}`);
  }
  if (fileName.startsWith('invalid-') && issues.length === 0) {
    failures.push(`${relative(root, path)} (fixture inválido): debía fallar al menos una regla.`);
  }
}

for (const notice of notices) console.warn(`NOTICE ${notice}`);

if (failures.length > 0) {
  console.error('La validación de contenido falló:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Contenido válido: ${canonicalPackets.length} paquete(s), ${publicEntries.length} entrada(s) pública(s), ${outboxEntries.length} salida(s), ${fixturePaths.length} fixture(s) de curso.`,
  );
}
