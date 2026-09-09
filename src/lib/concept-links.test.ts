import { describe, expect, it } from 'vitest';

import { getConceptBacklinks, isExerciseAvailable } from './concept-links';

const config = {
  enabledSessionIds: ['S01', 'S02'],
  sessions: {
    S01: { enabled: true },
    S02: { enabled: false },
  },
} as const;

const sessions = [
  {
    id: 's01-page',
    data: { session: 'S01', concepts: [{ id: 'concept-generalizacion' }] },
  },
  {
    id: 's02-page',
    data: { session: 'S02', concepts: [{ id: 'concept-generalizacion' }] },
  },
] as const;

const exercises = [
  {
    id: 'independent',
    data: { concepts: [{ id: 'concept-generalizacion' }], sessions: [] },
  },
  {
    id: 'disabled-only',
    data: { concepts: [{ id: 'concept-generalizacion' }], sessions: [{ id: 'S02' }] },
  },
  {
    id: 'mixed-availability',
    data: {
      concepts: [{ id: 'concept-generalizacion' }],
      sessions: [{ id: 'S02' }, { id: 'S01' }],
    },
  },
] as const;

describe('concept backlinks', () => {
  it('calculates inverse links and filters disabled sessions and exercises', () => {
    const backlinks = getConceptBacklinks('concept-generalizacion', sessions, exercises, config);

    expect(backlinks.sessions.map((entry) => entry.id)).toEqual(['s01-page']);
    expect(backlinks.exercises.map((entry) => entry.id)).toEqual([
      'independent',
      'mixed-availability',
    ]);
  });

  it('keeps independent exercises available and hides an exercise tied only to a disabled session', () => {
    expect(isExerciseAvailable(exercises[0], config)).toBe(true);
    expect(isExerciseAvailable(exercises[1], config)).toBe(false);
  });
});
