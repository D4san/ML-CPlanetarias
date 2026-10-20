export type ReferenceLabel = 'PC' | 'NEG';
export type PredictedLabel = 'PC' | 'NEG';

export interface PredictionCase {
  readonly id: string;
  readonly reference: ReferenceLabel;
  readonly prediction: PredictedLabel;
}

export interface ConfusionCounts {
  readonly tp: number;
  readonly fp: number;
  readonly fn: number;
  readonly tn: number;
}

export type MetricId = 'accuracy' | 'error' | 'precision' | 'recall' | 'specificity' | 'fpr' | 'f1';

export interface MetricResult {
  readonly numerator: number;
  readonly denominator: number;
  readonly value: number | undefined;
}

export interface ScoredSignal {
  readonly id: string;
  readonly reference: ReferenceLabel;
  readonly score: number;
}

export interface CurvePoint {
  readonly threshold: number;
  readonly x: number | undefined;
  readonly y: number | undefined;
  readonly confusion: ConfusionCounts;
}

export interface ConfusionPreset {
  readonly id: string;
  readonly label: string;
  readonly counts: ConfusionCounts;
  readonly population: string;
}

/** Twenty invented cases with a fixed reference and a deliberately imperfect prediction. */
export const S03_CONFUSION_CASES: readonly PredictionCase[] = [
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `PC-${String(index + 1).padStart(2, '0')}`,
    reference: 'PC' as const,
    prediction: (index < 7 ? 'PC' : 'NEG') as PredictedLabel,
  })),
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `NEG-${String(index + 1).padStart(2, '0')}`,
    reference: 'NEG' as const,
    prediction: (index < 2 ? 'PC' : 'NEG') as PredictedLabel,
  })),
];

/** The first three presets share a balanced reference population; D is a separate, imbalanced one. */
export const S03_CONFUSION_PRESETS: readonly ConfusionPreset[] = [
  {
    id: 'a',
    label: 'A',
    counts: { tp: 7, fp: 2, fn: 3, tn: 8 },
    population: '20 casos ficticios: 10 con referencia PC y 10 con referencia negativa.',
  },
  {
    id: 'b',
    label: 'B',
    counts: { tp: 5, fp: 1, fn: 5, tn: 9 },
    population: 'La misma población ficticia balanceada de 20 casos.',
  },
  {
    id: 'c',
    label: 'C',
    counts: { tp: 9, fp: 5, fn: 1, tn: 5 },
    population: 'La misma población ficticia balanceada de 20 casos.',
  },
  {
    id: 'd',
    label: 'D · otra población',
    counts: { tp: 0, fp: 0, fn: 2, tn: 18 },
    population: '20 casos ficticios distintos: 2 con referencia PC y 18 con referencia negativa.',
  },
];

/** Six invented scores used only for the threshold, PR, ROC and AUC demonstrations. */
export const S03_SCORED_SIGNALS: readonly ScoredSignal[] = [
  { id: 'A', reference: 'PC', score: 0.92 },
  { id: 'B', reference: 'PC', score: 0.81 },
  { id: 'C', reference: 'NEG', score: 0.76 },
  { id: 'D', reference: 'PC', score: 0.63 },
  { id: 'E', reference: 'NEG', score: 0.54 },
  { id: 'F', reference: 'NEG', score: 0.18 },
];

function assertNonNegativeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${label} debe ser un entero no negativo.`);
  }
}

function assertCounts(counts: ConfusionCounts): void {
  assertNonNegativeInteger(counts.tp, 'TP');
  assertNonNegativeInteger(counts.fp, 'FP');
  assertNonNegativeInteger(counts.fn, 'FN');
  assertNonNegativeInteger(counts.tn, 'TN');
}

function ratio(numerator: number, denominator: number): MetricResult {
  return {
    numerator,
    denominator,
    value: denominator === 0 ? undefined : numerator / denominator,
  };
}

/** Derive every displayed metric from the same four non-negative integer counts. */
export function calculateMetrics(
  counts: ConfusionCounts,
): Readonly<Record<MetricId, MetricResult>> {
  assertCounts(counts);
  const total = counts.tp + counts.fp + counts.fn + counts.tn;

  return {
    accuracy: ratio(counts.tp + counts.tn, total),
    error: ratio(counts.fp + counts.fn, total),
    precision: ratio(counts.tp, counts.tp + counts.fp),
    recall: ratio(counts.tp, counts.tp + counts.fn),
    specificity: ratio(counts.tn, counts.tn + counts.fp),
    fpr: ratio(counts.fp, counts.fp + counts.tn),
    f1: ratio(2 * counts.tp, 2 * counts.tp + counts.fp + counts.fn),
  };
}

/** Count fixed reference labels against the current predicted labels. */
export function countPredictions(cases: readonly PredictionCase[]): ConfusionCounts {
  const counts = { tp: 0, fp: 0, fn: 0, tn: 0 };
  for (const example of cases) {
    if (example.reference === 'PC') {
      if (example.prediction === 'PC') counts.tp += 1;
      else counts.fn += 1;
    } else if (example.prediction === 'PC') {
      counts.fp += 1;
    } else {
      counts.tn += 1;
    }
  }
  return counts;
}

/** Flip one prediction while preserving its reference label. */
export function togglePrediction(
  cases: readonly PredictionCase[],
  caseId: string,
): PredictionCase[] {
  let found = false;
  const updated = cases.map<PredictionCase>((example) => {
    if (example.id !== caseId) return { ...example };
    found = true;
    return { ...example, prediction: example.prediction === 'PC' ? 'NEG' : 'PC' };
  });
  if (!found) throw new RangeError(`No existe el caso ${caseId}.`);
  return updated;
}

function validateSignals(signals: readonly ScoredSignal[]): void {
  const ids = new Set<string>();
  for (const signal of signals) {
    if (signal.id.trim() === '' || ids.has(signal.id)) {
      throw new RangeError('Cada señal necesita un ID no vacío y único.');
    }
    ids.add(signal.id);
    if (signal.reference !== 'PC' && signal.reference !== 'NEG') {
      throw new RangeError(`Referencia desconocida para la señal ${signal.id}.`);
    }
    if (!Number.isFinite(signal.score) || signal.score < 0 || signal.score > 1) {
      throw new RangeError(`El puntaje de ${signal.id} debe estar entre 0 y 1.`);
    }
  }
}

function assertThreshold(threshold: number): void {
  if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1) {
    throw new RangeError('El umbral debe estar entre 0 y 1.');
  }
}

/** The decision rule is inclusive: a score equal to the threshold predicts PC. */
export function confusionAtThreshold(
  signals: readonly ScoredSignal[],
  threshold: number,
): ConfusionCounts {
  validateSignals(signals);
  assertThreshold(threshold);
  const counts = { tp: 0, fp: 0, fn: 0, tn: 0 };
  for (const signal of signals) {
    const predictsPc = signal.score >= threshold;
    if (signal.reference === 'PC') {
      if (predictsPc) counts.tp += 1;
      else counts.fn += 1;
    } else if (predictsPc) {
      counts.fp += 1;
    } else {
      counts.tn += 1;
    }
  }
  return counts;
}

/** PR operating points at each distinct score; precision stays undefined with no predicted positives. */
export function precisionRecallCurve(signals: readonly ScoredSignal[]): CurvePoint[] {
  validateSignals(signals);
  const thresholds = [...new Set(signals.map((signal) => signal.score))].sort((a, b) => b - a);
  const allNegativeConfusion = {
    tp: 0,
    fp: 0,
    fn: signals.filter((signal) => signal.reference === 'PC').length,
    tn: signals.filter((signal) => signal.reference === 'NEG').length,
  };
  const allNegativeMetrics = calculateMetrics(allNegativeConfusion);
  return [
    {
      threshold: Number.POSITIVE_INFINITY,
      x: allNegativeMetrics.recall.value,
      y: allNegativeMetrics.precision.value,
      confusion: allNegativeConfusion,
    },
    ...thresholds.map((threshold) => {
      const confusion = confusionAtThreshold(signals, threshold);
      const metrics = calculateMetrics(confusion);
      return {
        threshold,
        x: metrics.recall.value,
        y: metrics.precision.value,
        confusion,
      };
    }),
  ];
}

/** ROC operating points at each distinct score plus the all-negative endpoint. */
export function rocCurve(signals: readonly ScoredSignal[]): CurvePoint[] {
  validateSignals(signals);
  const thresholds = [...new Set(signals.map((signal) => signal.score))].sort((a, b) => b - a);
  const allNegativeConfusion = {
    tp: 0,
    fp: 0,
    fn: signals.filter((signal) => signal.reference === 'PC').length,
    tn: signals.filter((signal) => signal.reference === 'NEG').length,
  };
  const allNegative = calculateMetrics(allNegativeConfusion);
  const points: CurvePoint[] = [
    {
      threshold: Number.POSITIVE_INFINITY,
      x: allNegative.fpr.value,
      y: allNegative.recall.value,
      confusion: allNegativeConfusion,
    },
  ];
  for (const threshold of thresholds) {
    const confusion = confusionAtThreshold(signals, threshold);
    const metrics = calculateMetrics(confusion);
    points.push({
      threshold,
      x: metrics.fpr.value,
      y: metrics.recall.value,
      confusion,
    });
  }
  return points;
}

/** Rank-based ROC AUC; a tied positive-negative pair contributes one half. */
export function calculateRocAuc(signals: readonly ScoredSignal[]): number | undefined {
  validateSignals(signals);
  const positives = signals.filter((signal) => signal.reference === 'PC');
  const negatives = signals.filter((signal) => signal.reference === 'NEG');
  if (positives.length === 0 || negatives.length === 0) return undefined;

  let pairCredit = 0;
  for (const positive of positives) {
    for (const negative of negatives) {
      if (positive.score > negative.score) pairCredit += 1;
      else if (positive.score === negative.score) pairCredit += 0.5;
    }
  }
  return pairCredit / (positives.length * negatives.length);
}
