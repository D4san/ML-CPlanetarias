import { describe, expect, it } from 'vitest';
import { courseConfig } from '../../config/course.config';
import {
  defineCourseConfig,
  resolveSessionSettings,
  type CourseConfig,
  type CourseConfigV2,
} from './course-config';

const s01 = {
  enabled: true,
  enabledRouteIds: ['spectrum', 'catalog', 'followup'],
  defaultRouteId: 'spectrum',
} as const;

function v2(overrides: Partial<CourseConfigV2> = {}): CourseConfigV2 {
  return {
    identity: { id: 'mlcp', title: 'ML Ciencias Planetarias' },
    defaults: { interactionMode: 'interactive', teacherMode: false, defaultView: 'presentation' },
    enabledSessionIds: ['S01'],
    sessions: { S01: s01 },
    ...overrides,
  };
}

describe('fork configuration', () => {
  it('normalizes the V2 profile and preserves the pilot defaults', () => {
    const resolved = defineCourseConfig(courseConfig);

    expect(resolved.identity).toEqual({ id: 'mlcp', title: 'ML Ciencias Planetarias' });
    expect(resolved.enabledSessionIds).toEqual(['S00', 'S01']);
    expect(resolved.sessions.S00).toMatchObject({ enabled: true, enabledRouteIds: [] });
    expect(resolved.defaults).toEqual({
      interactionMode: 'interactive',
      teacherMode: false,
      defaultView: 'presentation',
    });
    expect(resolved.s01).toEqual({
      enabledRouteIds: ['spectrum', 'catalog', 'followup'],
      defaultRouteId: 'spectrum',
    });
  });

  it('lets a session override false win over a true global default', () => {
    const resolved = defineCourseConfig(
      v2({
        defaults: { interactionMode: 'interactive', teacherMode: true, defaultView: 'reading' },
        sessions: { S01: { ...s01, teacherMode: false } },
      }),
    );

    expect(resolveSessionSettings(resolved, 'S01')).toEqual({
      interactionMode: 'interactive',
      teacherMode: false,
      defaultView: 'reading',
    });
  });

  it('accepts a session without routes for S00', () => {
    const resolved = defineCourseConfig(v2({ enabledSessionIds: ['S00'], sessions: { S00: {} } }));

    expect(resolved.enabledSessionIds).toEqual(['S00']);
    expect(resolved.sessions.S00).toMatchObject({ enabled: true, enabledRouteIds: [] });
  });

  it.each([
    ['S00 + S01', ['S00', 'S01'], { S00: {}, S01: s01 }],
    ['solo S00', ['S00'], { S00: {} }],
    ['ninguna sesión', [], {}],
  ] as const)('resolves the availability profile %s', (_label, enabledSessionIds, sessions) => {
    const resolved = defineCourseConfig(v2({ enabledSessionIds, sessions }));
    expect(resolved.enabledSessionIds).toEqual(enabledSessionIds);
    expect(resolved.sessions.S00?.enabled).toBe(
      (enabledSessionIds as readonly string[]).includes('S00'),
    );
    expect(resolved.sessions.S01?.enabled).toBe(
      (enabledSessionIds as readonly string[]).includes('S01'),
    );
  });

  it('accepts the legacy pilot shape during migration', () => {
    const legacy: CourseConfig = {
      interactionMode: 'direct',
      teacherMode: true,
      defaultView: 'reading',
      s01: { enabledRouteIds: ['catalog'], defaultRouteId: 'catalog' },
    };

    const resolved = defineCourseConfig(legacy);

    expect(resolved.defaults).toEqual({
      interactionMode: 'direct',
      teacherMode: true,
      defaultView: 'reading',
    });
    expect(resolved.s01).toEqual({ enabledRouteIds: ['catalog'], defaultRouteId: 'catalog' });
  });

  it.each([
    [
      'ruta vacía',
      v2({ sessions: { S01: { ...s01, enabledRouteIds: [] } } }),
      /no puede estar vacío/,
    ],
    [
      'rutas duplicadas',
      v2({ sessions: { S01: { ...s01, enabledRouteIds: ['catalog', 'catalog'] } } }),
      /IDs duplicados/,
    ],
    [
      'ruta desconocida',
      v2({ sessions: { S01: { ...s01, enabledRouteIds: ['missing'] } } }),
      /ruta desconocida missing/,
    ],
    [
      'ruta inicial deshabilitada',
      v2({
        sessions: { S01: { ...s01, enabledRouteIds: ['catalog'], defaultRouteId: 'spectrum' } },
      }),
      /defaultRouteId debe pertenecer/,
    ],
  ])('rejects %s', (_label, config, message) => {
    expect(() => defineCourseConfig(config)).toThrow(message);
  });

  it.each([
    ['sesión desconocida', v2({ enabledSessionIds: ['S99'] }), /sesión desconocida S99/],
    ['sesión repetida', v2({ enabledSessionIds: ['S01', 'S01'] }), /IDs duplicados/],
    [
      'sesión ausente',
      v2({ enabledSessionIds: ['S00'] }),
      /falta la configuración de sessions.S00/,
    ],
  ])('rejects %s', (_label, config, message) => {
    expect(() => defineCourseConfig(config)).toThrow(message);
  });
});
