import { describe, expect, it } from 'vitest';

import {
  countCompatibleRules,
  getRepairScore,
  getS01StopFromHash,
  initialS01JourneyState,
  moveS01Stop,
  s01JourneyReducer,
  s01Activities,
  s01RepairItems,
  s01Scenarios,
  s01Stops,
  s01TaskAlgorithmBranches,
} from './s01-journey';

describe('s01 journey data', () => {
  it('keeps stable unique stops and complete astronomy routes', () => {
    expect(new Set(s01Stops.map((stop) => stop.id)).size).toBe(s01Stops.length);
    expect(new Set(s01Stops.map((stop) => stop.hash)).size).toBe(s01Stops.length);

    for (const scenario of s01Scenarios) {
      expect(Object.keys(scenario.route).sort()).toEqual(s01Stops.map((stop) => stop.id).sort());
    }
  });

  it('connects every stop with an arrival and a next narrative step', () => {
    for (const stop of s01Stops) {
      expect(stop.arrival.trim().split(/\s+/).length).toBeGreaterThanOrEqual(8);
      expect(stop.next.trim().split(/\s+/).length).toBeGreaterThanOrEqual(8);
      expect(stop.arrivalShort).toContain('→');
      expect(stop.nextShort).toContain('→');
      expect(stop.explanation.trim()).not.toBe('');
      expect(stop.expected.trim()).not.toBe('');
    }
  });

  it('resolves hashes and bounds sequential movement', () => {
    expect(getS01StopFromHash('#pregunta')).toBe('question');
    expect(getS01StopFromHash('#se%C3%B1al')).toBeNull();
    expect(getS01StopFromHash('#desconocido')).toBeNull();
    expect(moveS01Stop('question', -1)).toBe('question');
    expect(moveS01Stop('question', 1)).toBe('instance');
    expect(moveS01Stop('evidence', 1)).toBe('evidence');
  });

  it('scores the repair and computes compatible rules', () => {
    const assignments = Object.fromEntries(s01RepairItems.map((item) => [item.id, item.expected]));
    expect(getRepairScore(assignments)).toBe(4);
    expect(countCompatibleRules(3, 3)).toBe(27);
  });

  it('keeps the activity branch connected to distinct narrative stops', () => {
    expect(s01Activities).toHaveLength(5);
    expect(new Set(s01Activities.map((activity) => activity.id)).size).toBe(5);
    expect(s01Activities.every((activity) => activity.options.length === 3)).toBe(true);
    expect(
      s01Activities.every(
        (activity) => activity.options.filter((option) => option.correct).length === 1,
      ),
    ).toBe(true);
    expect(s01Activities.map((activity) => activity.stopId)).toEqual([
      'family',
      'signal',
      'task',
      'evidence',
      'domain',
    ]);
  });

  it('keeps the task tree aligned with the formal task set', () => {
    expect(s01TaskAlgorithmBranches.map((branch) => branch.id)).toEqual(
      expect.arrayContaining([
        'regression',
        'classification',
        'clustering',
        'anomaly',
        'decision',
        'generation',
      ]),
    );
    expect(s01TaskAlgorithmBranches.every((branch) => branch.examples.length >= 2)).toBe(true);
  });
});

describe('s01 journey reducer', () => {
  it('moves, opens the panorama and resets deterministically', () => {
    const moved = s01JourneyReducer(initialS01JourneyState, { type: 'move-stop', delta: 1 });
    expect(moved.stopId).toBe('instance');

    const overview = s01JourneyReducer(moved, { type: 'toggle-overview' });
    expect(overview.view).toBe('overview');

    const reset = s01JourneyReducer(overview, { type: 'reset' });
    expect(reset).toEqual(initialS01JourneyState);
  });

  it('updates scenario, display mode and challenge state', () => {
    const scenario = s01JourneyReducer(
      { ...initialS01JourneyState, signalGuess: 'supervised', claimId: 'predictive' },
      { type: 'set-scenario', scenarioId: 'catalog' },
    );
    expect(scenario.scenarioId).toBe('catalog');
    expect(scenario.signalGuess).toBeNull();
    expect(scenario.claimId).toBeNull();

    const reading = s01JourneyReducer(
      { ...scenario, view: 'overview' },
      {
        type: 'set-display-mode',
        displayMode: 'reading',
      },
    );
    expect(reading.displayMode).toBe('reading');
    expect(reading.view).toBe('focus');

    const assigned = s01JourneyReducer(reading, {
      type: 'assign-term',
      itemId: 'deep-learning',
      level: 'family',
    });
    expect(assigned.assignments['deep-learning']).toBe('family');
  });

  it('updates every visual control without discarding the route', () => {
    const actions = [
      { type: 'set-lens', lensId: 'statistics' },
      { type: 'guess-signal', paradigm: 'unsupervised' },
      { type: 'set-learning-mode', mode: 'rules' },
      { type: 'set-domain-view', view: 'observed' },
      { type: 'guess-compatible', value: 27 },
      { type: 'set-family-bias', bias: 'open' },
      { type: 'set-capacity', capacity: 'overfit' },
      { type: 'set-claim', claimId: 'physical' },
    ] as const;

    const state = actions.reduce(s01JourneyReducer, initialS01JourneyState);
    expect(state).toMatchObject({
      lensId: 'statistics',
      signalGuess: 'unsupervised',
      learningMode: 'rules',
      domainView: 'observed',
      compatibleGuess: 27,
      familyBiasGuess: 'open',
      capacity: 'overfit',
      claimId: 'physical',
    });
  });
});
