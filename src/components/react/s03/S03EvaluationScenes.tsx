import { useId, useState } from 'react';

import { SessionNavigationControls } from '../SessionNavigationControls';
import S03PaperFigure from './S03PaperFigure';
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
  type ConfusionCounts,
  type CurvePoint,
  type MetricId,
  type MetricResult,
  type PredictionCase,
  type ScoredSignal,
} from '../../../lib/s03-metrics';

import './s03-evaluation.css';

const METRIC_SPECS: Readonly<
  Record<
    MetricId,
    {
      title: string;
      question: string;
      denominator: string;
      formula: string;
      interpretation: string;
      limit: string;
    }
  >
> = {
  accuracy: {
    title: 'Accuracy',
    question: 'De todas las señales, ¿qué fracción quedó clasificada según su referencia?',
    denominator: 'Todas las señales: TP + TN + FP + FN.',
    formula: '(TP + TN) / (TP + TN + FP + FN)',
    interpretation: 'Compara los aciertos totales con el tamaño de esta muestra.',
    limit:
      'Puede ocultar que una clase minoritaria queda sin recuperar; revisa también sus métricas propias.',
  },
  error: {
    title: 'Tasa de error',
    question: 'De todas las señales, ¿qué fracción quedó mal clasificada?',
    denominator: 'Todas las señales: TP + TN + FP + FN.',
    formula: '(FP + FN) / (TP + TN + FP + FN)',
    interpretation:
      'Cuenta falsas alertas y señales positivas omitidas dentro de una fracción total.',
    limit:
      'La fórmula da el mismo peso a FP y FN; una aplicación real debe describir sus consecuencias por separado.',
  },
  precision: {
    title: 'Precision',
    question: 'De las señales que el clasificador marcó PC, ¿cuántas tienen referencia PC?',
    denominator: 'Predicciones PC: TP + FP.',
    formula: 'TP / (TP + FP)',
    interpretation: 'Describe qué tan concentradas en PC quedan las señales seleccionadas.',
    limit:
      'Depende de la población evaluada y puede quedar indefinida cuando no hay predicciones PC.',
  },
  recall: {
    title: 'Recall o TPR',
    question: 'De los PC de referencia, ¿cuántos recuperó el clasificador?',
    denominator: 'Referencias PC: TP + FN.',
    formula: 'TP / (TP + FN)',
    interpretation: 'Mide qué fracción de las etiquetas positivas de esta muestra se recuperó.',
    limit:
      'Aumentarlo puede traer más falsas alertas; un recall alto no confirma la naturaleza planetaria.',
  },
  specificity: {
    title: 'Especificidad o TNR',
    question: 'De las referencias negativas, ¿cuántas quedaron correctamente como negativas?',
    denominator: 'Referencias negativas: TN + FP.',
    formula: 'TN / (TN + FP)',
    interpretation: 'Mide qué fracción de las etiquetas negativas se dejó sin alerta PC.',
    limit: 'No informa cuántos PC de referencia se recuperaron; acompáñala con recall.',
  },
  fpr: {
    title: 'Tasa de falsos positivos (FPR)',
    question: 'De las referencias negativas, ¿cuántas recibieron una predicción PC?',
    denominator: 'Referencias negativas: FP + TN.',
    formula: 'FP / (FP + TN) = 1 − especificidad',
    interpretation: 'Mide la fracción de negativas que se convierte en alerta PC.',
    limit:
      'Una tasa baja depende de la población de referencia y no mide por sí sola el número de casos a revisar.',
  },
  f1: {
    title: 'F1',
    question: '¿Cómo resumimos el balance armónico entre precision y recall?',
    denominator: '2TP + FP + FN; los TN no entran en esta cuenta.',
    formula: '2TP / (2TP + FP + FN)',
    interpretation: 'En esta convención, F1 queda entre cero y uno y resume precision con recall.',
    limit: 'No incorpora TN ni costos científicos; si su denominador es cero, queda indefinido.',
  },
};

const METRIC_IDS = Object.keys(METRIC_SPECS) as MetricId[];
const DEFAULT_THRESHOLD = 0.8;
const METRIC_CELL_ROLES: Readonly<
  Record<MetricId, { numerator: readonly string[]; denominator: readonly string[] }>
> = {
  accuracy: { numerator: ['tp', 'tn'], denominator: ['tp', 'tn', 'fp', 'fn'] },
  error: { numerator: ['fp', 'fn'], denominator: ['tp', 'tn', 'fp', 'fn'] },
  precision: { numerator: ['tp'], denominator: ['tp', 'fp'] },
  recall: { numerator: ['tp'], denominator: ['tp', 'fn'] },
  specificity: { numerator: ['tn'], denominator: ['tn', 'fp'] },
  fpr: { numerator: ['fp'], denominator: ['fp', 'tn'] },
  f1: { numerator: ['tp'], denominator: ['tp', 'fp', 'fn'] },
};

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return 'indefinido';
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',');
}

function formatThird(value: number): string {
  if (value === 0 || value === 1) return String(value);
  if (Math.abs(value - 1 / 3) < 1e-10) return '1/3';
  if (Math.abs(value - 2 / 3) < 1e-10) return '2/3';
  return formatNumber(value);
}

function formatArea(value: number): string {
  if (Math.abs(value) < 1e-10) return '0';
  if (Math.abs(value - 2 / 9) < 1e-10) return '2/9';
  if (Math.abs(value - 1 / 3) < 1e-10) return '1/3';
  return formatNumber(value);
}

function formatFraction(result: MetricResult): string {
  if (result.denominator === 0 || result.value === undefined) {
    return `${result.numerator}/${result.denominator} = indefinida (denominador cero)`;
  }
  return `${result.numerator}/${result.denominator} = ${formatNumber(result.value)} (${formatNumber(result.value * 100)} %)`;
}

function predictionName(value: 'PC' | 'NEG'): string {
  return value === 'PC' ? 'PC' : 'AFP/NTP';
}

function matrixClassName(value: 'PC' | 'NEG'): string {
  return value === 'PC' ? 'Tránsito' : 'NTránsito';
}

function caseLabel(example: PredictionCase): string {
  return `${example.id} · referencia ${predictionName(example.reference)} · predicción ${predictionName(example.prediction)}`;
}

function metricCountLine(counts: ConfusionCounts): string {
  return `TP ${counts.tp} · FP ${counts.fp} · FN ${counts.fn} · TN ${counts.tn}`;
}

function metricSubstitution(id: MetricId, counts: ConfusionCounts): string {
  const { tp, fp, fn, tn } = counts;
  const total = tp + fp + fn + tn;
  switch (id) {
    case 'accuracy':
      return `(${tp} + ${tn}) / (${tp} + ${tn} + ${fp} + ${fn}) = (${tp + tn}) / ${total}`;
    case 'error':
      return `(${fp} + ${fn}) / (${tp} + ${tn} + ${fp} + ${fn}) = (${fp + fn}) / ${total}`;
    case 'precision':
      return `${tp} / (${tp} + ${fp}) = ${tp} / ${tp + fp}`;
    case 'recall':
      return `${tp} / (${tp} + ${fn}) = ${tp} / ${tp + fn}`;
    case 'specificity':
      return `${tn} / (${tn} + ${fp}) = ${tn} / ${tn + fp}`;
    case 'fpr':
      return `${fp} / (${fp} + ${tn}) = ${fp} / ${fp + tn}`;
    case 'f1':
      return `2 × ${tp} / (2 × ${tp} + ${fp} + ${fn}) = ${2 * tp} / ${2 * tp + fp + fn}`;
  }
}

function metricQuestionInterpretation(id: MetricId, result: MetricResult): string {
  if (result.value === undefined) {
    return `La fracción no se define porque su denominador es cero (${result.denominator}).`;
  }
  const percentage = `${formatNumber(result.value * 100)} %`;
  switch (id) {
    case 'accuracy':
      return `${result.numerator} de ${result.denominator} señales coinciden con la referencia: ${percentage}.`;
    case 'error':
      return `${result.numerator} de ${result.denominator} señales no coinciden con la referencia: ${percentage}.`;
    case 'precision':
      return `${result.numerator} de ${result.denominator} predicciones PC coinciden con la referencia: ${percentage}.`;
    case 'recall':
      return `Se recuperaron ${result.numerator} de ${result.denominator} referencias PC: ${percentage}.`;
    case 'specificity':
      return `${result.numerator} de ${result.denominator} referencias negativas quedaron negativas: ${percentage}.`;
    case 'fpr':
      return `${result.numerator} de ${result.denominator} referencias negativas se marcaron como PC: ${percentage}.`;
    case 'f1':
      return `La sustitución en conteos produce F1 = ${formatNumber(result.value)} (${percentage}).`;
  }
}

function countsForMetric(id: MetricId, counts: ConfusionCounts): MetricResult {
  return calculateMetrics(counts)[id];
}

function ConfusionMatrix({
  counts,
  cases,
  onToggle,
  compact = false,
  metricId,
}: {
  counts: ConfusionCounts;
  cases?: readonly PredictionCase[];
  onToggle?: (caseId: string) => void;
  compact?: boolean;
  metricId?: MetricId;
}) {
  const cells = [
    {
      id: 'tp',
      label: 'TP · verdadero positivo',
      reference: 'PC',
      prediction: 'PC',
      count: counts.tp,
    },
    {
      id: 'fn',
      label: 'FN · falso negativo',
      reference: 'PC',
      prediction: 'NEG',
      count: counts.fn,
    },
    {
      id: 'fp',
      label: 'FP · falso positivo',
      reference: 'NEG',
      prediction: 'PC',
      count: counts.fp,
    },
    {
      id: 'tn',
      label: 'TN · verdadero negativo',
      reference: 'NEG',
      prediction: 'NEG',
      count: counts.tn,
    },
  ] as const;
  const cellFor = (reference: 'PC' | 'NEG', prediction: 'PC' | 'NEG') =>
    cells.find((cell) => cell.reference === reference && cell.prediction === prediction)!;

  return (
    <div className="s03-confusion__scroll">
      <table className={`s03-confusion${compact ? ' s03-confusion--compact' : ''}`}>
        <caption>
          Tránsito representa PC; NTránsito reúne AFP/NTP. Filas = referencia y columnas =
          predicción.
        </caption>
        <thead>
          <tr>
            <th scope="col">Referencia ↓ / Predicción →</th>
            <th scope="col">Tránsito</th>
            <th scope="col">NTránsito</th>
          </tr>
        </thead>
        <tbody>
          {(['PC', 'NEG'] as const).map((reference) => (
            <tr key={reference}>
              <th scope="row">
                {reference === 'PC' ? 'Tránsito (positiva)' : 'NTránsito (negativa)'}
              </th>
              {(['PC', 'NEG'] as const).map((prediction) => {
                const cell = cellFor(reference, prediction);
                const roles = metricId ? METRIC_CELL_ROLES[metricId] : undefined;
                const isNumerator = roles?.numerator.includes(cell.id) ?? false;
                const isDenominator = roles?.denominator.includes(cell.id) ?? false;
                const examples = cases?.filter(
                  (example) => example.reference === reference && example.prediction === prediction,
                );
                return (
                  <td
                    key={cell.id}
                    data-cell={cell.id}
                    data-numerator={isNumerator || undefined}
                    data-denominator={isDenominator || undefined}
                    className={[
                      isNumerator && 's03-confusion__cell--numerator',
                      isDenominator && 's03-confusion__cell--denominator',
                      isNumerator && isDenominator && 's03-confusion__cell--numerator-denominator',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <strong>{cell.label}</strong>
                    <span className="s03-confusion__count">{cell.count}</span>
                    {examples && examples.length > 0 && (
                      <span className="s03-confusion__examples">
                        {examples.map((example) => (
                          <button
                            key={example.id}
                            type="button"
                            data-cell={cell.id}
                            aria-label={`${caseLabel(example)}. Clase visible: ${matrixClassName(example.prediction)}. Cambiar solo la predicción.`}
                            aria-pressed={example.prediction === 'PC'}
                            title="Activa para cambiar la predicción; la referencia permanece fija."
                            onClick={() => onToggle?.(example.id)}
                          >
                            <span className="s03-confusion__case-id">{example.id}</span>
                            <span className="s03-confusion__prediction">
                              {matrixClassName(example.prediction)}
                            </span>
                          </button>
                        ))}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CasePredictionControl({
  cases,
  selectedCaseId,
  onSelect,
  onToggle,
}: {
  cases: readonly PredictionCase[];
  selectedCaseId: string;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const id = useId().replaceAll(':', '');
  const selected = cases.find((example) => example.id === selectedCaseId) ?? cases[0]!;
  const nextPrediction = selected.prediction === 'PC' ? 'AFP/NTP' : 'PC';
  return (
    <div className="s03-case-control">
      <label htmlFor={`s03-case-select-${id}`}>Caso ficticio que cambiará</label>
      <div className="s03-case-control__row">
        <select
          id={`s03-case-select-${id}`}
          value={selected.id}
          onChange={(event) => onSelect(event.currentTarget.value)}
        >
          {cases.map((example) => (
            <option key={example.id} value={example.id}>
              {caseLabel(example)}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => onToggle(selected.id)}>
          Cambiar predicción a {nextPrediction}
        </button>
      </div>
      <p>
        Referencia fija: <strong>{predictionName(selected.reference)}</strong>. Solo cambia la
        columna de predicción.
      </p>
    </div>
  );
}

function PrecisionFraction({
  numerator,
  denominator,
  label,
}: {
  numerator: string;
  denominator: string;
  label: string;
}) {
  return (
    <div className="s03-precision-fraction" role="img" aria-label={label}>
      <span className="s03-precision-fraction__numerator" aria-hidden="true">
        {numerator}
      </span>
      <span className="s03-precision-fraction__bar" aria-hidden="true" />
      <span className="s03-precision-fraction__denominator" aria-hidden="true">
        {denominator}
      </span>
    </div>
  );
}

function PrecisionWalkthrough({
  counts,
  result,
  spec,
}: {
  counts: ConfusionCounts;
  result: MetricResult;
  spec: (typeof METRIC_SPECS)['precision'];
}) {
  const [step, setStep] = useState(0);
  const headingId = useId().replaceAll(':', '');
  const denominator = `${counts.tp} + ${counts.fp} = ${result.denominator}`;
  const numerator = step === 0 ? 'TP' : String(counts.tp);
  const fractionDenominator = step === 0 || step === 1 ? 'TP + FP' : denominator;
  const fractionLabel =
    step === 0
      ? 'Precision: TP dividido entre TP más FP.'
      : `Precision: ${numerator} dividido entre ${fractionDenominator}.`;
  const stepContent = [
    {
      title: 'Pregunta',
      description: spec.question,
    },
    {
      title: 'Cuenta los aciertos',
      description: `El numerador cuenta las predicciones PC cuya referencia también es PC: ${counts.tp} verdaderos positivos.`,
    },
    {
      title: 'Reúne las predicciones PC',
      description: `El denominador incluye todos los casos marcados PC: ${counts.tp} TP y ${counts.fp} FP, para un total de ${result.denominator}.`,
    },
    {
      title: 'Interpreta el resultado y su límite',
      description: `${metricQuestionInterpretation('precision', result)} Un FP reduce precision; recall cuenta los FN. La cifra depende de la población y queda indefinida si no se predice ningún PC.`,
    },
  ][step]!;

  return (
    <div className="s03-precision-walkthrough">
      <section
        className="s03-precision-walkthrough__step"
        aria-labelledby={`s03-precision-step-${headingId}`}
      >
        <h4 id={`s03-precision-step-${headingId}`}>Construimos la precision</h4>
        <p className="s03-precision-walkthrough__progress">
          Paso {step + 1} de 4 · {stepContent.title}
        </p>
        <p>{stepContent.description}</p>
        {step === 0 && (
          <p className="s03-precision-walkthrough__denominator-note">{spec.denominator}</p>
        )}
        <PrecisionFraction
          numerator={numerator}
          denominator={fractionDenominator}
          label={fractionLabel}
        />
        <p className="s03-precision-walkthrough__current-result" role="status" aria-live="polite">
          <strong>Resultado actual: </strong>
          <span>{formatFraction(result)}</span>
        </p>
        <SessionNavigationControls
          index={step}
          count={4}
          onMove={(delta) => setStep((current) => Math.max(0, Math.min(3, current + delta)))}
          scope="explanation"
        />
      </section>
    </div>
  );
}

function MetricScene({
  id,
  cases,
  onToggle,
  selectedCaseId,
  onSelectCase,
}: {
  id: MetricId;
  cases: readonly PredictionCase[];
  onToggle: (caseId: string) => void;
  selectedCaseId: string;
  onSelectCase: (caseId: string) => void;
}) {
  const counts = countPredictions(cases);
  const spec = METRIC_SPECS[id];
  const value = countsForMetric(id, counts);
  const matrixExamples =
    id === 'precision' ? cases.filter((example) => ['PC-01', 'NEG-01'].includes(example.id)) : [];
  return (
    <div className="s03-metric-scene">
      <div className="s03-metric-scene__visual">
        <ConfusionMatrix
          counts={counts}
          cases={id === 'precision' ? matrixExamples : undefined}
          onToggle={onToggle}
          compact
          metricId={id}
        />
        <p className="s03-metric-scene__matrix-key">
          {id === 'precision'
            ? 'PC-01 (TP) y NEG-01 (FP) cambian de celda al activar el caso; su referencia queda fija.'
            : 'El borde verde marca el numerador y el azul el denominador; una celda con ambos bordes aporta a los dos.'}
        </p>
        <p className="s03-metric-scene__counts" role="status" aria-live="polite">
          Conteos actuales: {metricCountLine(counts)}.
        </p>
        {id !== 'precision' && (
          <CasePredictionControl
            cases={cases}
            selectedCaseId={selectedCaseId}
            onSelect={onSelectCase}
            onToggle={onToggle}
          />
        )}
      </div>
      <div className="s03-metric-scene__explanation">
        {id === 'precision' ? (
          <PrecisionWalkthrough counts={counts} result={value} spec={spec} />
        ) : (
          <>
            <section>
              <h4>Pregunta</h4>
              <p>{spec.question}</p>
            </section>
            <section>
              <h4>Denominador</h4>
              <p>{spec.denominator}</p>
            </section>
            <section>
              <h4>Fórmula</h4>
              <code className="s03-formula">{spec.formula}</code>
            </section>
            <section>
              <h4>Sustitución</h4>
              <code className="s03-formula">{metricSubstitution(id, counts)}</code>
              <p className="s03-metric-scene__result">{formatFraction(value)}</p>
            </section>
            <section>
              <h4>Interpretación</h4>
              <p>{metricQuestionInterpretation(id, value)}</p>
            </section>
            <section className="s03-metric-scene__limit">
              <h4>Consecuencia y límite</h4>
              <p>{spec.limit}</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function ThresholdControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId().replaceAll(':', '');
  return (
    <div className="s03-threshold-control">
      <label htmlFor={`s03-threshold-slider-${id}`}>
        Umbral: <output htmlFor={`s03-threshold-slider-${id}`}>{formatNumber(value)}</output>
      </label>
      <input
        id={`s03-threshold-slider-${id}`}
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        aria-valuetext={`Umbral ${formatNumber(value)}; predice PC si el puntaje es mayor o igual.`}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
      />
      <div className="s03-threshold-control__presets" role="group" aria-label="Umbrales de ejemplo">
        {[0.8, 0.5].map((threshold) => (
          <button
            key={threshold}
            type="button"
            aria-pressed={value === threshold}
            onClick={() => onChange(threshold)}
          >
            {formatNumber(threshold)}
          </button>
        ))}
      </div>
      <p>Regla de decisión: puntaje ≥ umbral → predicción PC.</p>
    </div>
  );
}

function ScoreTable({
  signals,
  threshold,
}: {
  signals: readonly ScoredSignal[];
  threshold: number;
}) {
  return (
    <div className="s03-scores__scroll">
      <table className="s03-scores">
        <caption>
          Seis señales ficticias. El puntaje y la referencia permanecen fijos al cambiar el umbral.
        </caption>
        <thead>
          <tr>
            <th scope="col">Señal</th>
            <th scope="col">Referencia</th>
            <th scope="col">Puntaje</th>
            <th scope="col">Predicción actual</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((signal) => {
            const predictsPc = signal.score >= threshold;
            return (
              <tr key={signal.id}>
                <th scope="row">{signal.id}</th>
                <td>{predictionName(signal.reference)}</td>
                <td>{formatNumber(signal.score)}</td>
                <td>{predictsPc ? 'PC' : 'AFP/NTP'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ThresholdSummary({
  signals,
  threshold,
}: {
  signals: readonly ScoredSignal[];
  threshold: number;
}) {
  const counts = confusionAtThreshold(signals, threshold);
  const metrics = calculateMetrics(counts);
  return (
    <div className="s03-threshold-summary">
      <ConfusionMatrix counts={counts} compact />
      <p role="status" aria-live="polite">
        {metricCountLine(counts)} · accuracy {formatFraction(metrics.accuracy)} · precision{' '}
        {formatFraction(metrics.precision)} · recall {formatFraction(metrics.recall)}.
      </p>
    </div>
  );
}

function CurveChart({
  kind,
  points,
  current,
  threshold,
}: {
  kind: 'pr' | 'roc';
  points: readonly CurvePoint[];
  current: CurvePoint;
  threshold: number;
}) {
  const id = useId().replaceAll(':', '');
  const width = 480;
  const height = 322;
  const left = 58;
  const right = 20;
  const top = 20;
  const bottom = 54;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const xLabel = kind === 'pr' ? 'Recall (TPR)' : 'Tasa de falsos positivos (FPR)';
  const yLabel = kind === 'pr' ? 'Precision' : 'Recall (TPR)';
  const validPoints = points.filter(
    (point): point is CurvePoint & { x: number; y: number } =>
      point.x !== undefined && point.y !== undefined,
  );
  const xPosition = (value: number) => left + value * plotWidth;
  const yPosition = (value: number) => top + (1 - value) * plotHeight;
  const path = validPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${xPosition(point.x)} ${yPosition(point.y)}`)
    .join(' ');
  const currentDefined = current.x !== undefined && current.y !== undefined;
  const currentX = currentDefined ? xPosition(current.x!) : undefined;
  const currentY = currentDefined ? yPosition(current.y!) : undefined;

  return (
    <figure className={`s03-curve s03-curve--${kind}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
      >
        <title id={`${id}-title`}>
          {kind === 'pr' ? 'Curva precision–recall sintética' : 'Curva ROC sintética'}
        </title>
        <desc id={`${id}-description`}>
          {kind === 'pr'
            ? 'Curva calculada a partir de seis puntajes ficticios. El punto actual cambia con el umbral. Cuando no hay predicciones positivas, precision queda indefinida y no se dibuja el punto.'
            : 'Curva calculada a partir de seis puntajes ficticios. El punto actual cambia con el umbral; el área total se calcula una sola vez a partir del orden de los puntajes.'}
        </desc>
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
          <g key={tick} className="s03-curve__gridline" aria-hidden="true">
            <line x1={left} x2={width - right} y1={yPosition(tick)} y2={yPosition(tick)} />
            <line x1={xPosition(tick)} x2={xPosition(tick)} y1={top} y2={height - bottom} />
            <text x={left - 10} y={yPosition(tick) + 5} textAnchor="end">
              {formatNumber(tick)}
            </text>
            <text x={xPosition(tick)} y={height - bottom + 22} textAnchor="middle">
              {formatNumber(tick)}
            </text>
          </g>
        ))}
        <line
          className="s03-curve__axis"
          x1={left}
          x2={width - right}
          y1={height - bottom}
          y2={height - bottom}
        />
        <line className="s03-curve__axis" x1={left} x2={left} y1={top} y2={height - bottom} />
        {kind === 'roc' && (
          <line
            className="s03-curve__reference"
            x1={xPosition(0)}
            y1={yPosition(0)}
            x2={xPosition(1)}
            y2={yPosition(1)}
          />
        )}
        <path className="s03-curve__line" d={path} />
        {validPoints.map((point, index) => (
          <circle
            key={`${point.threshold}-${index}`}
            className="s03-curve__point"
            cx={xPosition(point.x)}
            cy={yPosition(point.y)}
            r="4"
            aria-hidden="true"
          />
        ))}
        {currentDefined && (
          <circle
            className="s03-curve__current"
            cx={currentX}
            cy={currentY}
            r="8"
            aria-hidden="true"
          />
        )}
        <text
          className="s03-curve__label"
          x={left + plotWidth / 2}
          y={height - 8}
          textAnchor="middle"
        >
          {xLabel}
        </text>
        <text
          className="s03-curve__label"
          x="16"
          y={top + plotHeight / 2}
          textAnchor="middle"
          transform={`rotate(-90 16 ${top + plotHeight / 2})`}
        >
          {yLabel}
        </text>
      </svg>
      <figcaption>
        {kind === 'pr'
          ? `Con umbral ${formatNumber(threshold)}, recall = ${current.x === undefined ? 'indefinido' : formatNumber(current.x)} y precision = ${current.y === undefined ? 'indefinida' : formatNumber(current.y)}.`
          : `Con umbral ${formatNumber(threshold)}, FPR = ${current.x === undefined ? 'indefinida' : formatNumber(current.x)} y TPR = ${current.y === undefined ? 'indefinido' : formatNumber(current.y)}.`}
      </figcaption>
    </figure>
  );
}

function currentCurvePoint(
  kind: 'pr' | 'roc',
  signals: readonly ScoredSignal[],
  threshold: number,
): CurvePoint {
  const confusion = confusionAtThreshold(signals, threshold);
  const metrics = calculateMetrics(confusion);
  return {
    threshold,
    x: kind === 'pr' ? metrics.recall.value : metrics.fpr.value,
    y: kind === 'pr' ? metrics.precision.value : metrics.recall.value,
    confusion,
  };
}

function ThresholdScene({
  threshold,
  onChange,
}: {
  threshold: number;
  onChange: (threshold: number) => void;
}) {
  const counts = confusionAtThreshold(S03_SCORED_SIGNALS, threshold);
  return (
    <div className="s03-threshold-scene">
      <div className="s03-threshold-scene__controls">
        <ThresholdControl value={threshold} onChange={onChange} />
        <ThresholdSummary signals={S03_SCORED_SIGNALS} threshold={threshold} />
      </div>
      <ScoreTable signals={S03_SCORED_SIGNALS} threshold={threshold} />
      <p className="s03-evaluation__note">
        Al mover el umbral solo cambian las predicciones. Las tres referencias PC y las tres
        referencias negativas permanecen fijas. Conteos: {metricCountLine(counts)}. Todos los casos
        y puntajes son ficticios.
      </p>
    </div>
  );
}

function CurveScene({
  kind,
  threshold,
  onChange,
}: {
  kind: 'pr' | 'roc';
  threshold: number;
  onChange: (threshold: number) => void;
}) {
  const points =
    kind === 'pr' ? precisionRecallCurve(S03_SCORED_SIGNALS) : rocCurve(S03_SCORED_SIGNALS);
  const current = currentCurvePoint(kind, S03_SCORED_SIGNALS, threshold);
  return (
    <div className={`s03-curve-scene s03-curve-scene--${kind}`}>
      <div>
        <ThresholdControl value={threshold} onChange={onChange} />
        <CurveChart kind={kind} points={points} current={current} threshold={threshold} />
      </div>
      <aside className="s03-curve-scene__reading">
        <h3>Qué observar</h3>
        {kind === 'pr' ? (
          <>
            <p>
              PR sigue recall frente a precision mientras el umbral recorre los puntajes. El punto
              cambia; las seis señales se mantienen.
            </p>
            <p>
              Si ningún caso se predice PC, precision no tiene denominador y queda indefinida. Por
              eso el gráfico omite ese punto.
            </p>
            <p>
              El artículo compara tres modelos sobre el test: recorre sus curvas para elegir un
              balance entre recuperar señales y controlar falsas alarmas.
            </p>
            <S03PaperFigure figureNumber={6} variant="wide" />
          </>
        ) : (
          <>
            <p>ROC grafica la tasa de falsas alertas FPR frente a la recuperación TPR.</p>
            <p>
              La línea diagonal es una referencia de ordenamiento aleatorio; cada umbral selecciona
              otro punto de operación.
            </p>
            <p>
              La curva se construye con los seis puntajes ficticios. El área de esta figura es 8/9.
            </p>
          </>
        )}
        <p className="s03-evaluation__note">
          El gráfico es didáctico y propio; no representa resultados publicados.
        </p>
      </aside>
    </div>
  );
}

function AucScene({
  threshold,
  onChange,
}: {
  threshold: number;
  onChange: (value: number) => void;
}) {
  const auc = calculateRocAuc(S03_SCORED_SIGNALS);
  const positives = S03_SCORED_SIGNALS.filter((signal) => signal.reference === 'PC');
  const negatives = S03_SCORED_SIGNALS.filter((signal) => signal.reference === 'NEG');
  const rocPoints = rocCurve(S03_SCORED_SIGNALS);
  const current = currentCurvePoint('roc', S03_SCORED_SIGNALS, threshold);
  const areaSegments = rocPoints.slice(1).map((point, index) => {
    const previous = rocPoints[index]!;
    const width = point.x! - previous.x!;
    const area = (width * (point.y! + previous.y!)) / 2;
    return { previous, point, area };
  });
  return (
    <div className="s03-auc-scene">
      <div className="s03-auc-scene__pairwise">
        <p>Compara cada puntaje PC con cada puntaje negativo: hay 3 × 3 = 9 pares.</p>
        <div className="s03-pairwise__scroll">
          <table className="s03-pairwise">
            <caption>
              Ordenar PC por encima de la referencia negativa suma 1; un empate sumaría 0,5.
            </caption>
            <thead>
              <tr>
                <th scope="col">PC ↓ / negativa →</th>
                {negatives.map((negative) => (
                  <th scope="col" key={negative.id}>
                    {negative.id} · {formatNumber(negative.score)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {positives.map((positive) => (
                <tr key={positive.id}>
                  <th scope="row">
                    {positive.id} · {formatNumber(positive.score)}
                  </th>
                  {negatives.map((negative) => {
                    const comparison = Math.sign(positive.score - negative.score);
                    const label =
                      comparison > 0
                        ? 'orden correcto'
                        : comparison < 0
                          ? 'orden invertido'
                          : 'empate';
                    return (
                      <td
                        key={negative.id}
                        data-order={
                          comparison > 0 ? 'correct' : comparison < 0 ? 'inverted' : 'tie'
                        }
                      >
                        <span aria-hidden="true">
                          {comparison > 0 ? '>' : comparison < 0 ? '<' : '='}
                        </span>
                        <span className="s03-sr-only">{label}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="s03-auc-scene__result">
          {auc === undefined ? 'AUC indefinida' : `AUC = 8/9 = ${formatNumber(auc)}`}
          <span> Ocho pares quedan ordenados correctamente de nueve.</span>
        </p>
        <p>El AUC depende del orden de los puntajes; no depende del umbral elegido.</p>
        <div className="s03-auc-scene__area">
          <h3>Área bajo la ROC por tramos</h3>
          <p>
            Para cada tramo: ΔFPR × (TPR inicial + TPR final) / 2. Los saltos verticales tienen ΔFPR
            = 0 y aportan área cero.
          </p>
          <div className="s03-area__scroll">
            <table className="s03-area">
              <caption>Seis tramos entre los siete puntos de operación ROC.</caption>
              <thead>
                <tr>
                  <th scope="col">Puntos (FPR, TPR)</th>
                  <th scope="col">Área del tramo</th>
                </tr>
              </thead>
              <tbody>
                {areaSegments.map(({ previous, point, area }, index) => (
                  <tr key={index}>
                    <th scope="row">
                      ({formatThird(previous.x!)}, {formatThird(previous.y!)}) → (
                      {formatThird(point.x!)}, {formatThird(point.y!)})
                    </th>
                    <td>{formatArea(area)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Suma</th>
                  <td>2/9 + 1/3 + 1/3 = 8/9</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <div className="s03-auc-scene__threshold">
        <ThresholdControl value={threshold} onChange={onChange} />
        <CurveChart kind="roc" points={rocPoints} current={current} threshold={threshold} />
        <p>El punto de operación se mueve con el umbral; el área 8/9 permanece constante.</p>
      </div>
    </div>
  );
}

/** Visual and mathematical content for S03 stations 6–8. */
export default function S03EvaluationScenes({ sceneId }: { sceneId: string }) {
  const [cases, setCases] = useState<PredictionCase[]>(() => [...S03_CONFUSION_CASES]);
  const [selectedCaseId, setSelectedCaseId] = useState('PC-01');
  const [selectedPresetId, setSelectedPresetId] = useState('a');
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);
  const toggleCase = (caseId: string) => setCases((current) => togglePrediction(current, caseId));

  if (sceneId === 'evaluation-split') {
    return (
      <div className="s03-evaluation s03-evaluation--split">
        <div
          className="s03-split"
          role="img"
          aria-label="Partición aleatoria de TCEs: 80 por ciento entrenamiento, 10 por ciento validación y 10 por ciento prueba"
        >
          {[
            {
              id: 'train',
              size: '80%',
              title: 'Entrenamiento',
              detail: 'Ajustar los parámetros del clasificador.',
            },
            {
              id: 'validation',
              size: '10%',
              title: 'Validación',
              detail: 'Comparar decisiones durante el desarrollo.',
            },
            {
              id: 'test',
              size: '10%',
              title: 'Prueba',
              detail: 'Estimar el desempeño final sobre señales reservadas.',
            },
          ].map((part) => (
            <div key={part.id} className={`s03-split__part s03-split__part--${part.id}`}>
              <strong>{part.size}</strong>
              <span>{part.title}</span>
              <small>{part.detail}</small>
            </div>
          ))}
        </div>
        <div className="s03-evaluation__prose">
          <p>
            En el diseño reportado, los TCEs se separan aleatoriamente en 80/10/10. La unidad es el
            evento detectado; sus etiquetas son referencias de catálogo.
          </p>
          <p>
            Entrenamiento ajusta los parámetros. Validación orienta las decisiones de desarrollo. La
            prueba queda reservada para estimar el desempeño del procedimiento elegido.
          </p>
          <p className="s03-evaluation__note">
            La partición organiza la evaluación; no convierte una etiqueta PC en confirmación física
            ni responde por sí sola cómo generaliza a otra población.
          </p>
        </div>
        <p className="s03-evaluation__source">
          Fuente: Shallue y Vanderburg (2018), §4.2. El ejemplo didáctico no ejecuta una nueva
          partición.
        </p>
      </div>
    );
  }

  if (sceneId === 'confusion-matrix') {
    const counts = countPredictions(cases);
    return (
      <div className="s03-evaluation s03-evaluation--matrix">
        <p>
          Veinte señales ficticias con una referencia fija por caso. Activa un ID para cambiar su
          predicción y observa cómo se mueve entre columnas.
        </p>
        <ConfusionMatrix counts={counts} cases={cases} onToggle={toggleCase} />
        <p className="s03-evaluation__status" role="status" aria-live="polite">
          {metricCountLine(counts)}. Tránsito = PC (positiva) y NTránsito = AFP/NTP (negativa). La
          predicción cambia y la referencia permanece fija.
        </p>
      </div>
    );
  }

  if (sceneId === 'confusion-cases') {
    const preset = S03_CONFUSION_PRESETS.find((item) => item.id === selectedPresetId)!;
    const metrics = calculateMetrics(preset.counts);
    return (
      <div className="s03-evaluation s03-evaluation--presets">
        <div className="s03-preset-picker" role="group" aria-label="Conjuntos de conteos ficticios">
          {S03_CONFUSION_PRESETS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selectedPresetId === item.id}
              onClick={() => setSelectedPresetId(item.id)}
            >
              <strong>{item.label}</strong>
              <span>
                TP {item.counts.tp} · FP {item.counts.fp} · FN {item.counts.fn} · TN{' '}
                {item.counts.tn}
              </span>
            </button>
          ))}
        </div>
        <div className="s03-preset-detail" aria-live="polite">
          <p>{preset.population} Estos conteos son ficticios.</p>
          <ConfusionMatrix counts={preset.counts} compact />
          <p className="s03-preset-detail__readout">
            Accuracy: {formatFraction(metrics.accuracy)} · Recall: {formatFraction(metrics.recall)}.
          </p>
          {preset.id === 'd' && (
            <p className="s03-evaluation__note">
              Aquí accuracy llega a 90 % aunque recall es cero: el clasificador no recupera ninguno
              de los dos PC de referencia.
            </p>
          )}
        </div>
        <p className="s03-evaluation__source">
          A, B y C comparten una población ficticia balanceada. D usa otra composición; comparar
          poblaciones distintas cambia también la referencia.
        </p>
      </div>
    );
  }

  if (sceneId.startsWith('metric-')) {
    const metricId = sceneId.slice('metric-'.length) as MetricId;
    if (METRIC_IDS.includes(metricId)) {
      return (
        <div className="s03-evaluation s03-evaluation--metric">
          <h3>{METRIC_SPECS[metricId].title}</h3>
          <MetricScene
            id={metricId}
            cases={cases}
            onToggle={toggleCase}
            selectedCaseId={selectedCaseId}
            onSelectCase={setSelectedCaseId}
          />
        </div>
      );
    }
  }

  if (sceneId === 'threshold') {
    return (
      <div className="s03-evaluation s03-evaluation--threshold">
        <ThresholdScene threshold={threshold} onChange={setThreshold} />
      </div>
    );
  }

  if (sceneId === 'pr' || sceneId === 'roc') {
    return (
      <div className="s03-evaluation s03-evaluation--curve">
        <CurveScene kind={sceneId} threshold={threshold} onChange={setThreshold} />
      </div>
    );
  }

  if (sceneId === 'auc') {
    return (
      <div className="s03-evaluation s03-evaluation--auc">
        <AucScene threshold={threshold} onChange={setThreshold} />
      </div>
    );
  }

  return null;
}
