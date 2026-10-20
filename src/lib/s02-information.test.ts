import { describe, expect, it } from 'vitest';
import {
  impurity,
  informationExamples,
  informationThresholds,
  scoreSplit,
} from './s02-information';

describe('impureza con proporciones por nodo', () => {
  it('distingue el nodo puro de la mezcla equilibrada y maneja 0 log 0', () => {
    const pure = informationExamples.filter((x) => x.label === 'Compacto');
    expect(impurity(pure, 'gini')).toBe(0);
    expect(impurity(pure, 'entropy')).toBe(0);
    expect(impurity(informationExamples, 'gini')).toBe(0.5);
    expect(impurity(informationExamples, 'entropy')).toBe(1);
  });
  it('pondera el corte 3/5 por número de casos, sin promediar hijos por igual', () => {
    const score = scoreSplit(1.3, 0.5, 'gini');
    expect(score.left).toHaveLength(3);
    expect(score.right).toHaveLength(5);
    expect(score.leftImpurity).toBe(0);
    expect(score.rightImpurity).toBeCloseTo(0.32, 12);
    expect(score.weightedImpurity).toBeCloseTo(0.2, 12);
    expect(score.reduction).toBeCloseTo(0.3, 12);
    expect(scoreSplit(1.3, 1, 'entropy').reduction).toBeCloseTo(0.5487949406953986, 12);
  });
  it('conserva todos los ejemplos en cada candidato y reconoce el corte perfecto', () => {
    for (const threshold of informationThresholds) {
      const score = scoreSplit(threshold, 0.5, 'gini');
      expect([...score.left, ...score.right]).toEqual(informationExamples);
      expect(score.left.length).toBeGreaterThan(0);
      expect(score.right.length).toBeGreaterThan(0);
    }
    expect(scoreSplit(1.5, 0.5, 'gini').reduction).toBe(0.5);
    expect(scoreSplit(1.5, 1, 'entropy').reduction).toBe(1);
  });
});
