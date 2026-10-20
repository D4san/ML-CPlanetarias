import { cp, readdir, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const skills = (await readdir(join(root, 'skills'), { withFileTypes: true })).filter((entry) =>
  entry.isDirectory(),
);
for (const mirror of ['.codex', '.agents']) {
  await mkdir(join(root, mirror, 'skills'), { recursive: true });
  for (const skill of skills) {
    await cp(join(root, 'skills', skill.name), join(root, mirror, 'skills', skill.name), {
      recursive: true,
      force: true,
    });
  }
}
console.log(`${skills.length} skills copiadas a ambos directorios de descubrimiento.`);
