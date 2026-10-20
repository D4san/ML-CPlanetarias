export type Criterion = 'gini' | 'entropy';
export type Example = { radius: number; label: 'Compacto' | 'Con envoltura' };
export const informationExamples: readonly Example[] = [
  { radius: 0.8, label: 'Compacto' },
  { radius: 1.0, label: 'Compacto' },
  { radius: 1.2, label: 'Compacto' },
  { radius: 1.4, label: 'Compacto' },
  { radius: 1.6, label: 'Con envoltura' },
  { radius: 1.8, label: 'Con envoltura' },
  { radius: 2.0, label: 'Con envoltura' },
  { radius: 2.2, label: 'Con envoltura' },
];
export const informationThresholds = informationExamples
  .slice(0, -1)
  .map((example, i) => (example.radius + informationExamples[i + 1]!.radius) / 2);

export function countLabels(items: readonly Example[]) {
  const compact = items.filter((example) => example.label === 'Compacto').length;
  return { compact, wrapped: items.length - compact };
}

export function impurity(items: readonly Example[], criterion: Criterion) {
  if (!items.length) return 0;
  const { compact, wrapped } = countLabels(items);
  return [compact / items.length, wrapped / items.length].reduce(
    (sum, p) => sum + (criterion === 'gini' ? p * (1 - p) : p === 0 ? 0 : -p * Math.log2(p)),
    0,
  );
}

export function scoreSplit(threshold: number, rootImpurity: number, criterion: Criterion) {
  const left = informationExamples.filter((example) => example.radius <= threshold);
  const right = informationExamples.filter((example) => example.radius > threshold);
  const leftImpurity = impurity(left, criterion);
  const rightImpurity = impurity(right, criterion);
  const weightedImpurity =
    (left.length * leftImpurity + right.length * rightImpurity) / informationExamples.length;
  return {
    threshold,
    left,
    right,
    leftImpurity,
    rightImpurity,
    weightedImpurity,
    reduction: rootImpurity - weightedImpurity,
  };
}
