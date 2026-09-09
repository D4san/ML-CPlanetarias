import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceRoot = join(root, 'skills');
const mirrorRoots = [join(root, '.codex', 'skills'), join(root, '.agents', 'skills')];
const strict = process.argv.includes('--strict');
const failures = [];
const pending = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  const paths = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return paths.flat();
}

async function relativeFiles(directory) {
  const files = await walk(directory);
  return new Set(files.map((file) => relative(directory, file)));
}

const skillDirectories = (await readdir(sourceRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const skillName of skillDirectories) {
  const source = join(sourceRoot, skillName);
  const sourceFiles = await relativeFiles(source);
  if (!sourceFiles.has('SKILL.md')) {
    failures.push(`skills/${skillName}: falta SKILL.md.`);
    continue;
  }

  for (const mirrorRoot of mirrorRoots) {
    const mirror = join(mirrorRoot, skillName);
    const mirrorFiles = await relativeFiles(mirror);
    const mirrorLabel = relative(root, mirror);
    if (mirrorFiles.size === 0) {
      pending.push(`${mirrorLabel}: espejo ausente para skills/${skillName}.`);
      if (strict) failures.push(`${mirrorLabel}: falta el espejo completo.`);
      continue;
    }

    for (const file of sourceFiles) {
      if (!mirrorFiles.has(file)) {
        failures.push(`${mirrorLabel}/${file}: falta respecto a skills/${skillName}/${file}.`);
        continue;
      }
      const expected = await readFile(join(source, file), 'utf8');
      const actual = await readFile(join(mirror, file), 'utf8');
      if (expected !== actual) {
        failures.push(`${mirrorLabel}/${file}: difiere de skills/${skillName}/${file}.`);
      }
    }
    for (const file of mirrorFiles) {
      if (!sourceFiles.has(file)) {
        failures.push(`${mirrorLabel}/${file}: recurso no existe en la fuente.`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  if (pending.length > 0) console.error(`Espejos pendientes: ${pending.join(' | ')}`);
  process.exitCode = 1;
} else {
  console.log(`Skills canónicas válidas: ${skillDirectories.length}.`);
  if (pending.length > 0) {
    console.log(
      `${pending.length} espejos pendientes; usa --strict para exigir distribución completa.`,
    );
    console.log(pending.join('\n'));
  } else {
    console.log('Fuentes canónicas y espejos sincronizados.');
  }
}
