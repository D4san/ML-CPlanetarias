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

for (const notice of notices) console.warn(`NOTICE ${notice}`);

if (failures.length > 0) {
  console.error('La validación de contenido falló:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `Contenido válido: ${canonicalPackets.length} paquete(s), ${publicEntries.length} entrada(s) pública(s), ${outboxEntries.length} salida(s).`,
  );
}
