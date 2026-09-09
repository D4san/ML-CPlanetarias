import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import {
  formatContentIssues,
  validateCourseContent,
  validatePublicContentMetadata,
} from './course-content';

const fixturePath = (name: string) =>
  fileURLToPath(new URL(`../../tests/fixtures/course/${name}`, import.meta.url));

async function readFixture(name: string) {
  return JSON.parse(await readFile(fixturePath(name), 'utf8')) as unknown;
}

describe('course content contract', () => {
  it('accepts a routed S01 fixture and a route-free S00 fixture', async () => {
    const s01 = validateCourseContent(await readFixture('valid-s01.json'));
    const s00 = validateCourseContent(await readFixture('valid-s00-no-routes.json'));

    expect(s01).toEqual({ valid: true, issues: [] });
    expect(s00).toEqual({ valid: true, issues: [] });
  });

  it('reports the ID and field responsible for a missing example', async () => {
    const result = validateCourseContent(await readFixture('invalid-missing-example.json'));

    expect(result.valid).toBe(false);
    expect(formatContentIssues(result.issues)).toContain(
      '/sessions/S01.units.unit.exampleIds [missing-example] no existe el ejemplo missing-example.',
    );
  });

  it('rejects duplicate IDs and absolute repository provenance', async () => {
    const duplicate = (await readFixture('valid-s01.json')) as {
      sessions: { S01: { stationIds: string[] } };
    };
    duplicate.sessions.S01.stationIds.push('question');
    const duplicateResult = validateCourseContent(duplicate);
    expect(formatContentIssues(duplicateResult.issues)).toContain(
      '/sessions/S01.stationIds [duplicate-id]',
    );

    const absolute = await readFixture('invalid-absolute-provenance.json');
    const absoluteResult = validateCourseContent(absolute);
    expect(formatContentIssues(absoluteResult.issues)).toContain(
      '/sessions/S00.provenance.source_path [portable-path]',
    );
  });

  it('keeps public promotion stricter than an internal preparation package', () => {
    const base = {
      title: 'Sesión revisada',
      summary: 'Resumen',
      kind: 'session',
      status: 'reviewed',
      visibility: 'public',
      publish_ready: true,
      rights: { status: 'original', note: 'Texto propio.' },
      origin: 'repo',
      source_path: 'docs/guides/FORK_CONFIGURATION.md',
      source_heading: 'Configuración',
    };
    expect(validatePublicContentMetadata(base).valid).toBe(true);
    expect(validatePublicContentMetadata({ ...base, status: 'drafting' }).valid).toBe(false);
    expect(validatePublicContentMetadata({ ...base, publish_ready: false }).valid).toBe(false);
  });
});
