import { describe, expect, it } from 'vitest';

import {
  calculateMetrics,
  calculateRocAuc,
  confusionAtThreshold,
  countPredictions,
  precisionRecallCurve,
  rocCurve,
  S03_CONFUSION_CASES,
  S03_CONFUSION_PRESETS,
  S03_SCORED_SIGNALS,
  togglePrediction,
} from './s03-metrics';

describe('S03: matriz de confusión y métricas', () => {
  it('calcula las siete métricas desde TP=7, FP=2, FN=3, TN=8', () => {
    const metrics = calculateMetrics({ tp: 7, fp: 2, fn: 3, tn: 8 });

    expect(metrics.accuracy).toEqual({ numerator: 15, denominator: 20, value: 0.75 });
    expect(metrics.error).toEqual({ numerator: 5, denominator: 20, value: 0.25 });
    expect(metrics.precision).toEqual({ numerator: 7, denominator: 9, value: 7 / 9 });
    expect(metrics.recall).toEqual({ numerator: 7, denominator: 10, value: 0.7 });
    expect(metrics.specificity).toEqual({ numerator: 8, denominator: 10, value: 0.8 });
    expect(metrics.fpr).toEqual({ numerator: 2, denominator: 10, value: 0.2 });
    expect(metrics.f1).toEqual({ numerator: 14, denominator: 19, value: 14 / 19 });
  });

  it('counts individual fictional examples in the 2×2 matrix', () => {
    expect(S03_CONFUSION_CASES).toHaveLength(20);
    expect(countPredictions(S03_CONFUSION_CASES)).toEqual({ tp: 7, fp: 2, fn: 3, tn: 8 });
  });

  it('changes a prediction without changing its reference label', () => {
    const updated = togglePrediction(S03_CONFUSION_CASES, 'PC-01');
    expect(updated.find((example) => example.id === 'PC-01')).toEqual({
      id: 'PC-01',
      reference: 'PC',
      prediction: 'NEG',
    });
    expect(countPredictions(updated)).toEqual({ tp: 6, fp: 2, fn: 4, tn: 8 });
    expect(S03_CONFUSION_CASES.find((example) => example.id === 'PC-01')?.prediction).toBe('PC');
    expect(() => togglePrediction(S03_CONFUSION_CASES, 'missing')).toThrow(/No existe/);
  });

  it('keeps preset populations explicit and exposes the majority-class trap', () => {
    expect(S03_CONFUSION_PRESETS.map(({ counts }) => counts)).toEqual([
      { tp: 7, fp: 2, fn: 3, tn: 8 },
      { tp: 5, fp: 1, fn: 5, tn: 9 },
      { tp: 9, fp: 5, fn: 1, tn: 5 },
      { tp: 0, fp: 0, fn: 2, tn: 18 },
    ]);
    const imbalanced = calculateMetrics(S03_CONFUSION_PRESETS[3]!.counts);
    expect(imbalanced.accuracy.value).toBe(0.9);
    expect(imbalanced.precision.value).toBeUndefined();
    expect(imbalanced.recall.value).toBe(0);
    expect(imbalanced.f1.value).toBe(0);
  });

  it('marks each zero-denominator metric as undefined', () => {
    const noPredictedPositive = calculateMetrics({ tp: 0, fp: 0, fn: 2, tn: 18 });
    expect(noPredictedPositive.precision.value).toBeUndefined();
    expect(noPredictedPositive.f1.value).toBe(0);

    const noReferencePositive = calculateMetrics({ tp: 0, fp: 2, fn: 0, tn: 8 });
    expect(noReferencePositive.recall.value).toBeUndefined();

    const noReferenceNegative = calculateMetrics({ tp: 4, fp: 0, fn: 1, tn: 0 });
    expect(noReferenceNegative.specificity.value).toBeUndefined();
    expect(noReferenceNegative.fpr.value).toBeUndefined();

    const empty = calculateMetrics({ tp: 0, fp: 0, fn: 0, tn: 0 });
    expect(empty.accuracy.value).toBeUndefined();
    expect(empty.error.value).toBeUndefined();
    expect(empty.f1.value).toBeUndefined();
  });

  it('rejects invalid counts and invalid thresholds', () => {
    expect(() => calculateMetrics({ tp: -1, fp: 0, fn: 0, tn: 1 })).toThrow(RangeError);
    expect(() => calculateMetrics({ tp: 0.5, fp: 0, fn: 0, tn: 1 })).toThrow(RangeError);
    expect(() => confusionAtThreshold(S03_SCORED_SIGNALS, 1.1)).toThrow(RangeError);
  });
});

describe('S03: umbrales, curvas y AUC', () => {
  it('applies the inclusive score >= threshold rule at 0.8 and 0.5', () => {
    expect(confusionAtThreshold(S03_SCORED_SIGNALS, 0.8)).toEqual({
      tp: 2,
      fp: 0,
      fn: 1,
      tn: 3,
    });
    expect(confusionAtThreshold(S03_SCORED_SIGNALS, 0.5)).toEqual({
      tp: 3,
      fp: 2,
      fn: 0,
      tn: 1,
    });
    expect(confusionAtThreshold([{ id: 'igual', reference: 'PC', score: 0.8 }], 0.8)).toEqual({
      tp: 1,
      fp: 0,
      fn: 0,
      tn: 0,
    });
  });

  it('computes a ROC AUC of 8/9 from the six fictional scores', () => {
    expect(calculateRocAuc(S03_SCORED_SIGNALS)).toBeCloseTo(8 / 9, 12);
    const curve = rocCurve(S03_SCORED_SIGNALS);
    expect(curve[0]).toMatchObject({ x: 0, y: 0 });
    expect(curve.at(-1)).toMatchObject({ x: 1, y: 1 });

    const trapezoidalArea = curve.slice(1).reduce((area, point, index) => {
      const previous = curve[index]!;
      return area + ((point.x! - previous.x!) * (point.y! + previous.y!)) / 2;
    }, 0);
    expect(trapezoidalArea).toBeCloseTo(8 / 9, 12);
  });

  it('gives half credit to a tied positive-negative pair and reports missing classes', () => {
    expect(
      calculateRocAuc([
        { id: 'P', reference: 'PC', score: 0.5 },
        { id: 'N', reference: 'NEG', score: 0.5 },
      ]),
    ).toBe(0.5);
    expect(calculateRocAuc([{ id: 'P', reference: 'PC', score: 0.9 }])).toBeUndefined();
  });

  it('keeps precision undefined before the first predicted positive', () => {
    const curve = precisionRecallCurve(S03_SCORED_SIGNALS);
    const firstPoint = curve[0]!;
    expect(firstPoint.threshold).toBe(Number.POSITIVE_INFINITY);
    expect(firstPoint.y).toBeUndefined();
    expect(firstPoint.x).toBe(0);
    expect(curve[1]).toMatchObject({ threshold: 0.92, y: 1, x: 1 / 3 });
  });
});
