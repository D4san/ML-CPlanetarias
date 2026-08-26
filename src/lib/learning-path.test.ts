import { describe, expect, it } from 'vitest';

import {
  getProgress,
  getStage,
  getStageIndex,
  learningStages,
  moveStage,
  type LearningStageId,
} from './learning-path';

describe('learning path model', () => {
  it('keeps the agreed pedagogical endpoints', () => {
    expect(learningStages).toHaveLength(9);
    expect(learningStages[0].id).toBe('question');
    expect(learningStages.at(-1)?.id).toBe('transfer');
  });

  it('finds stages and their progress deterministically', () => {
    expect(getStage('evaluation').title).toBe('Métrica y evaluación');
    expect(getStageIndex('evaluation')).toBe(6);
    expect(getProgress('question')).toBeCloseTo(100 / 9);
    expect(getProgress('transfer')).toBe(100);
  });

  it('moves one stage and clamps at both boundaries', () => {
    expect(moveStage('question', -1).id).toBe('question');
    expect(moveStage('question', 1).id).toBe('representation');
    expect(moveStage('transfer', 1).id).toBe('transfer');
  });

  it('falls back safely when untrusted runtime data contains an unknown id', () => {
    const unknown = 'unknown-stage' as LearningStageId;

    expect(getStage(unknown).id).toBe('question');
    expect(getStageIndex(unknown)).toBe(0);
    expect(moveStage(unknown, 1).id).toBe('representation');
  });
});
