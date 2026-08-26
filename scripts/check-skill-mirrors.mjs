import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const files = ['SKILL.md', join('agents', 'openai.yaml')];
const source = join(root, 'skills', 'develop-mlcp-web');
const mirrors = [
  join(root, '.codex', 'skills', 'develop-mlcp-web'),
  join(root, '.agents', 'skills', 'develop-mlcp-web'),
];
const failures = [];

for (const file of files) {
  const expected = await readFile(join(source, file), 'utf8').catch(() => null);
  if (expected === null) {
    failures.push(`${file}: falta la fuente canónica.`);
    continue;
  }
  for (const mirror of mirrors) {
    const actual = await readFile(join(mirror, file), 'utf8').catch(() => null);
    if (actual === null) {
      failures.push(`${file}: falta ${relative(root, mirror)}.`);
    } else if (expected !== actual) {
      failures.push(`${file}: ${relative(root, source)} y ${relative(root, mirror)} difieren.`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Skill local y espejo sincronizados.');
}
