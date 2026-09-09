import { describe, expect, it } from 'vitest';

import {
  getAvailableSessionIds,
  getSessionPath,
  isRouteAvailable,
  isSessionAvailable,
} from './course-availability';

const config = {
  enabledSessionIds: ['S01', 'S00', 'S02'],
  sessions: {
    S01: { enabled: true, enabledRouteIds: ['spectrum', 'catalog'] },
    S00: { enabled: false },
    S02: { enabled: true },
  },
} as const;

describe('course availability', () => {
  it('preserves configured order and excludes explicitly disabled sessions', () => {
    expect(getAvailableSessionIds(config)).toEqual(['S01', 'S02']);
    expect(isSessionAvailable(config, 'S01')).toBe(true);
    expect(isSessionAvailable(config, 'S00')).toBe(false);
    expect(isSessionAvailable(config, 'S99')).toBe(false);
  });

  it('does not let an URL route bypass session or route availability', () => {
    expect(isRouteAvailable(config, 'S01', 'catalog')).toBe(true);
    expect(isRouteAvailable(config, 'S01', 'followup')).toBe(false);
    expect(isRouteAvailable(config, 'S00', 'anything')).toBe(false);
  });

  it('maps session IDs to stable public paths', () => {
    expect(getSessionPath('S01')).toBe('/sistema/');
    expect(getSessionPath('S00')).toBe('/sesiones/s00/');
  });

  it.each([
    ['S00 + S01', ['S00', 'S01'], { S00: { enabled: true }, S01: { enabled: true } }],
    ['solo S00', ['S00'], { S00: { enabled: true }, S01: { enabled: false } }],
    ['ninguna sesión', [], { S00: { enabled: false }, S01: { enabled: false } }],
  ] as const)('filters the availability profile %s', (_label, enabledSessionIds, sessions) => {
    expect(getAvailableSessionIds({ enabledSessionIds, sessions })).toEqual(enabledSessionIds);
  });
});
