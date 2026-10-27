import { useId, useState, type DragEvent } from 'react';

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
  S03_SCORED_SIGNALS,
  type ConfusionCounts,
  type CurvePoint,
  type MetricId,
  type MetricResult,
  type ScoredSignal,
} from '../../../lib/s03-metrics';

// La matriz, las curvas y sus controles comparten esta hoja de estilos.
import './s03-evaluation.css';

const METRIC_SPECS: Readonly<
  Record<
    MetricId,
    {
      title: string;
      definition: string;
      denominator: string;
      formula: string;
      limit: string;
    }
  >
> = {
  accuracy: {
    title: 'Accuracy',
    definition: 'Accuracy es la proporción de señales cuya predicción coincide con la referencia.',
    denominator: 'Todas las señales: TP + TN + FP + FN.',
    formula: '(TP + TN) / (TP + TN + FP + FN)',
    limit:
      'Puede ocultar que una clase minoritaria queda sin recuperar; revisa también sus métricas propias.',
  },
  error: {
    title: 'Tasa de error',
    definition:
      'La tasa de error es la proporción de señales cuya predicción difiere de la referencia.',
    denominator: 'Todas las señales: TP + TN + FP + FN.',
    formula: '(FP + FN) / (TP + TN + FP + FN)',
    limit:
      'La fórmula da el mismo peso a FP y FN; una aplicación real debe describir sus consecuencias por separado.',
  },
  precision: {
    title: 'Precision',
    definition: 'Precision es la proporción de predicciones PC cuya referencia también es PC.',
    denominator: 'Predicciones PC: TP + FP.',
    formula: 'TP / (TP + FP)',
    limit:
      'Depende de la población evaluada y puede quedar indefinida cuando no hay predicciones PC.',
  },
  recall: {
    title: 'Recall o TPR',
    definition:
      'Recall es la proporción de señales PC de referencia que el clasificador recupera como PC.',
    denominator: 'Referencias PC: TP + FN.',
    formula: 'TP / (TP + FN)',
    limit:
      'Aumentarlo puede traer más falsas alertas; un recall alto no confirma la naturaleza planetaria.',
  },
  specificity: {
    title: 'Especificidad o TNR',
    definition:
      'La especificidad es la proporción de referencias negativas clasificadas como negativas.',
    denominator: 'Referencias negativas: TN + FP.',
    formula: 'TN / (TN + FP)',
    limit: 'No informa cuántos PC de referencia se recuperaron; acompáñala con recall.',
  },
  fpr: {
    title: 'Tasa de falsos positivos (FPR)',
    definition:
      'La tasa de falsos positivos es la proporción de referencias negativas clasificadas como PC.',
    denominator: 'Referencias negativas: FP + TN.',
    formula: 'FP / (FP + TN) = 1 − especificidad',
    limit:
      'Una tasa baja depende de la población de referencia y no mide por sí sola el número de casos a revisar.',
  },
  f1: {
    title: 'F1',
    definition: 'F1 es la media armónica de precision y recall para la clase PC.',
    denominator: '2TP + FP + FN; los TN no entran en esta cuenta.',
    formula: '2TP / (2TP + FP + FN)',
    limit: 'No incorpora TN ni costos científicos; si su denominador es cero, queda indefinido.',
  },
};

const METRIC_IDS = Object.keys(METRIC_SPECS) as MetricId[];
const DEFAULT_THRESHOLD = 0.8;

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
      return 'Combina la proporción de aciertos entre las señales seleccionadas con la recuperación de PC de referencia.';
  }
}

function countsForMetric(id: MetricId, counts: ConfusionCounts): MetricResult {
  return calculateMetrics(counts)[id];
}

function ConfusionMatrix({
  counts,
  compact = false,
  caption = 'Tránsito representa PC; NTránsito reúne AFP/NTP. Filas = referencia y columnas = predicción.',
}: {
  counts: ConfusionCounts;
  compact?: boolean;
  caption?: string;
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
        <caption>{caption}</caption>
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
                return (
                  <td key={cell.id} data-cell={cell.id}>
                    <strong>{cell.label}</strong>
                    <span className="s03-confusion__count">{cell.count}</span>
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

type SceneKind = 'planet' | 'binary' | 'activity';
type PredictedClass = 'PC' | 'NEG';

type SortableSignal = {
  id: string;
  scene: SceneKind;
  reference: PredictedClass;
  referenceLabel: string;
};

const SORTABLE_SIGNALS: readonly SortableSignal[] = [
  { id: 'signal-a', scene: 'planet', reference: 'PC', referenceLabel: 'PC · candidata a planeta' },
  { id: 'signal-b', scene: 'planet', reference: 'PC', referenceLabel: 'PC · candidata a planeta' },
  {
    id: 'signal-c',
    scene: 'binary',
    reference: 'NEG',
    referenceLabel: 'AFP · falso positivo astrofísico',
  },
  {
    id: 'signal-d',
    scene: 'binary',
    reference: 'NEG',
    referenceLabel: 'AFP · falso positivo astrofísico',
  },
  {
    id: 'signal-e',
    scene: 'binary',
    reference: 'NEG',
    referenceLabel: 'AFP · falso positivo astrofísico',
  },
  {
    id: 'signal-f',
    scene: 'activity',
    reference: 'NEG',
    referenceLabel: 'NTP · fenómeno no transitorio',
  },
  {
    id: 'signal-g',
    scene: 'activity',
    reference: 'NEG',
    referenceLabel: 'NTP · fenómeno no transitorio',
  },
  {
    id: 'signal-h',
    scene: 'activity',
    reference: 'NEG',
    referenceLabel: 'NTP · fenómeno no transitorio',
  },
];

const SCENE_LABELS: Readonly<Record<SceneKind, string>> = {
  planet: 'Planeta en tránsito',
  binary: 'Binaria eclipsante',
  activity: 'Variación estelar sin tránsito',
};

function SignalIcon({ scene }: { scene: SceneKind }) {
  const positions: Readonly<Record<SceneKind, string>> = {
    planet: '0%',
    binary: '50%',
    activity: '100%',
  };
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <span
      className="s03-sort-signal__icon"
      role="img"
      aria-label={SCENE_LABELS[scene]}
      style={{
        backgroundImage: `url("${baseUrl}images/s03/s03-confusion-signal-icons.png")`,
        backgroundPosition: `${positions[scene]} center`,
      }}
    />
  );
}

function SignalSortingActivity() {
  const [predictions, setPredictions] = useState<Record<string, PredictedClass | undefined>>({});
  const [draggedSignalId, setDraggedSignalId] = useState<string | null>(null);
  const classifiedCount = Object.keys(predictions).length;
  const pending = SORTABLE_SIGNALS.filter((signal) => !predictions[signal.id]);
  const cells = {
    tp: SORTABLE_SIGNALS.filter(
      (signal) => signal.reference === 'PC' && predictions[signal.id] === 'PC',
    ),
    fn: SORTABLE_SIGNALS.filter(
      (signal) => signal.reference === 'PC' && predictions[signal.id] === 'NEG',
    ),
    fp: SORTABLE_SIGNALS.filter(
      (signal) => signal.reference === 'NEG' && predictions[signal.id] === 'PC',
    ),
    tn: SORTABLE_SIGNALS.filter(
      (signal) => signal.reference === 'NEG' && predictions[signal.id] === 'NEG',
    ),
  };

  const classify = (signalId: string, prediction: PredictedClass) => {
    setPredictions((current) => ({ ...current, [signalId]: prediction }));
    setDraggedSignalId(null);
  };

  const handleDrop = (event: DragEvent<HTMLElement>, prediction: PredictedClass) => {
    event.preventDefault();
    const signalId = event.dataTransfer.getData('text/plain') || draggedSignalId;
    if (signalId && SORTABLE_SIGNALS.some((signal) => signal.id === signalId)) {
      classify(signalId, prediction);
    }
  };

  return (
    <div className="s03-sort-activity">
      <p className="s03-sort-activity__lead">
        Cada dibujo representa una causa posible de una señal. Decide qué predeciría el
        clasificador; al soltarla, aparece la referencia del catálogo y vemos si la decisión fue un
        acierto o un error.
      </p>

      {pending.length > 0 ? (
        <section className="s03-sort-activity__pool" aria-labelledby="s03-sort-pool-title">
          <div className="s03-sort-activity__section-heading">
            <h4 id="s03-sort-pool-title">Señales por clasificar</h4>
            <span>{pending.length} pendientes</span>
          </div>
          <div className="s03-sort-activity__cards">
            {pending.map((signal, index) => (
              <article
                key={signal.id}
                className="s03-sort-signal"
                draggable
                aria-label={`Señal sin clasificar, ${SCENE_LABELS[signal.scene]}, ${index + 1} de ocho`}
                onDragStart={(event) => {
                  event.dataTransfer.setData('text/plain', signal.id);
                  event.dataTransfer.effectAllowed = 'move';
                  setDraggedSignalId(signal.id);
                }}
                onDragEnd={() => setDraggedSignalId(null)}
              >
                <SignalIcon scene={signal.scene} />
                <span className="s03-sort-signal__title">{SCENE_LABELS[signal.scene]}</span>
                <div
                  className="s03-sort-signal__actions"
                  aria-label="Clasificar con teclado o pantalla táctil"
                >
                  <button type="button" onClick={() => classify(signal.id, 'PC')}>
                    Tránsito
                  </button>
                  <button type="button" onClick={() => classify(signal.id, 'NEG')}>
                    No tránsito
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <p className="s03-sort-activity__complete" role="status">
          Clasificaste las ocho señales. Puedes cambiar cualquier predicción desde su tarjeta.
        </p>
      )}

      <section
        className="s03-sort-activity__targets"
        aria-label="Elige la predicción del clasificador"
      >
        {(['PC', 'NEG'] as const).map((prediction) => (
          <div
            key={prediction}
            className="s03-sort-target"
            data-prediction={prediction.toLowerCase()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, prediction)}
          >
            <strong>{prediction === 'PC' ? 'Predecir: tránsito' : 'Predecir: no tránsito'}</strong>
            <span>Arrastra aquí una señal</span>
          </div>
        ))}
      </section>

      <p className="s03-sort-activity__status" role="status" aria-live="polite">
        Clasificadas {classifiedCount} de ocho · TP {cells.tp.length} · FN {cells.fn.length} · FP{' '}
        {cells.fp.length} · TN {cells.tn.length}
      </p>

      {classifiedCount > 0 && (
        <div className="s03-sort-matrix__scroll">
          <table className="s03-sort-matrix">
            <caption>
              La fila muestra la referencia revelada; la columna conserva tu predicción.
            </caption>
            <thead>
              <tr>
                <th scope="col">Referencia ↓ / Predicción →</th>
                <th scope="col">Tránsito</th>
                <th scope="col">No tránsito</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  reference: 'PC' as const,
                  label: 'PC · candidata a planeta',
                  predicted: 'PC' as const,
                  wrong: 'NEG' as const,
                  correctCell: 'tp' as const,
                  wrongCell: 'fn' as const,
                },
                {
                  reference: 'NEG' as const,
                  label: 'AFP/NTP · referencia negativa',
                  predicted: 'PC' as const,
                  wrong: 'NEG' as const,
                  correctCell: 'fp' as const,
                  wrongCell: 'tn' as const,
                },
              ].map((row) => (
                <tr key={row.reference}>
                  <th scope="row">{row.label}</th>
                  {([row.predicted, row.wrong] as const).map((prediction, index) => {
                    const cellId = index === 0 ? row.correctCell : row.wrongCell;
                    const signals = cells[cellId];
                    const outcome = cellId === 'tp' || cellId === 'tn' ? 'acierto' : 'error';
                    return (
                      <td key={cellId} data-cell={cellId}>
                        <strong>
                          {cellId.toUpperCase()} · {outcome}
                        </strong>
                        {signals.length > 0 ? (
                          <div className="s03-sort-matrix__cards">
                            {signals.map((signal) => (
                              <article
                                key={signal.id}
                                className="s03-sort-signal s03-sort-signal--placed"
                              >
                                <SignalIcon scene={signal.scene} />
                                <span className="s03-sort-signal__title">
                                  {SCENE_LABELS[signal.scene]}
                                </span>
                                <span className="s03-sort-signal__reference">
                                  Referencia: {signal.referenceLabel}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    classify(signal.id, prediction === 'PC' ? 'NEG' : 'PC')
                                  }
                                >
                                  Cambiar a {prediction === 'PC' ? 'no tránsito' : 'tránsito'}
                                </button>
                              </article>
                            ))}
                          </div>
                        ) : (
                          <p>Aún sin señales</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="s03-sort-activity__footer">
        <p>
          En los casos negativos, la referencia agrupa AFP (binaria eclipsante) y NTP (variación sin
          tránsito).
        </p>
        <button type="button" onClick={() => setPredictions({})}>
          Reiniciar actividad
        </button>
      </div>
      <p className="s03-evaluation__note">
        Dibujos y tarjetas son ejemplos conceptuales. PC, AFP y NTP son etiquetas de referencia del
        catálogo; pueden contener errores y no equivalen a una confirmación física.
      </p>
    </div>
  );
}

function ErrorConsequenceStories() {
  return (
    <div className="s03-error-stories">
      <div className="s03-error-stories__context">
        <p>
          Kepler registra variaciones periódicas del brillo y su buscador entrega TCE: eventos que
          podrían parecer tránsitos. La CNN estudiada ayuda a ordenar esas señales para la revisión
          posterior. Imagina ahora un equipo con tiempo limitado para examinar candidatas.
        </p>
        <div
          className="s03-error-stories__flow"
          aria-label="Del registro de Kepler a la revisión de candidatas"
        >
          <span>Caída de brillo</span>
          <b aria-hidden="true">→</b>
          <span>TCE</span>
          <b aria-hidden="true">→</b>
          <span>Prioridad de la CNN</span>
          <b aria-hidden="true">→</b>
          <span>Revisión humana</span>
        </div>
      </div>
      <div className="s03-error-stories__cards">
        <article className="s03-error-story s03-error-story--fp">
          <SignalIcon scene="binary" />
          <div>
            <h4>Falsa alerta · FP</h4>
            <p>
              La señal corresponde a una binaria eclipsante y la referencia la marca AFP. Si el
              clasificador predice «tránsito / PC», la alerta puede ocupar tiempo de revisión o
              seguimiento aunque no sea una candidata planetaria.
            </p>
          </div>
        </article>
        <article className="s03-error-story s03-error-story--fn">
          <SignalIcon scene="planet" />
          <div>
            <h4>Candidata omitida · FN</h4>
            <p>
              La referencia marca PC, pero el clasificador predice «no tránsito». La candidata puede
              quedar relegada y reducirse la recuperación de señales potencialmente interesantes.
            </p>
          </div>
        </article>
      </div>
      <p className="s03-evaluation__note">
        PC significa candidata a planeta, no planeta confirmado. FP y FN nombran desacuerdos con la
        referencia; el catálogo puede contener etiquetas imperfectas. Son escenarios didácticos, no
        errores concretos reportados por el artículo, y su costo relativo depende de la meta y los
        recursos del estudio.
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

function metricWalkthrough(id: MetricId, counts: ConfusionCounts, result: MetricResult) {
  const { tp, fp, fn, tn } = counts;
  const total = tp + fp + fn + tn;
  const explanations = {
    accuracy: {
      numerator: 'TP + TN',
      denominator: 'TP + TN + FP + FN',
      numeratorText: `Contamos los acuerdos: ${tp} PC y ${tn} señales negativas clasificadas según su referencia.`,
      denominatorText: `Los comparamos con las ${total} señales del ejemplo: ${tp} + ${tn} + ${fp} + ${fn}.`,
      use: 'Sirve para resumir el acierto global y comparar modelos sobre una misma muestra.',
    },
    error: {
      numerator: 'FP + FN',
      denominator: 'TP + TN + FP + FN',
      numeratorText: `Contamos los desacuerdos: ${fp} falsas alertas y ${fn} candidatas de referencia que no se recuperaron.`,
      denominatorText: `Los comparamos con las ${total} señales del ejemplo: ${tp} + ${tn} + ${fp} + ${fn}.`,
      use: 'Sirve para resumir la fracción de errores; es el complemento de accuracy.',
    },
    precision: {
      numerator: 'TP',
      denominator: 'TP + FP',
      numeratorText: `Contamos las predicciones PC cuya referencia también es PC: ${tp} verdaderos positivos.`,
      denominatorText: `Reunimos todas las señales seleccionadas como PC: ${tp} TP + ${fp} FP = ${tp + fp}.`,
      use: 'Ayuda a valorar qué tan fiable es la lista seleccionada para revisión.',
    },
    recall: {
      numerator: 'TP',
      denominator: 'TP + FN',
      numeratorText: `Contamos las candidatas de referencia recuperadas: ${tp} verdaderos positivos.`,
      denominatorText: `Reunimos todas las PC de referencia: ${tp} recuperadas y ${fn} omitidas, en total ${tp + fn}.`,
      use: 'Ayuda a valorar cuántas candidatas de referencia se conservan en la búsqueda.',
    },
    specificity: {
      numerator: 'TN',
      denominator: 'TN + FP',
      numeratorText: `Contamos las señales negativas de referencia clasificadas como negativas: ${tn} verdaderos negativos.`,
      denominatorText: `Reunimos las ${tn + fp} referencias negativas: ${tn} TN y ${fp} FP.`,
      use: 'Ayuda a ver qué proporción de señales negativas se descarta correctamente.',
    },
    fpr: {
      numerator: 'FP',
      denominator: 'FP + TN',
      numeratorText: `Contamos las señales negativas de referencia marcadas como PC: ${fp} falsas alertas.`,
      denominatorText: `Las comparamos con las ${fp + tn} referencias negativas: ${fp} FP y ${tn} TN.`,
      use: 'Ayuda a medir la frecuencia de falsas alertas entre las señales negativas; es el complemento de la especificidad.',
    },
    f1: {
      numerator: '2 × TP',
      denominator: '2 × TP + FP + FN',
      numeratorText: `F1 combina precision y recall mediante 2 × precision × recall / (precision + recall). Con los conteos de la matriz, el numerador equivalente es 2 × TP: 2 × ${tp} = ${2 * tp}.`,
      denominatorText: `Sumamos a esa cantidad ${fp} falsas alertas y ${fn} candidatas omitidas: ${2 * tp} + ${fp} + ${fn} = ${2 * tp + fp + fn}.`,
      use: 'Sirve para resumir conjuntamente precision y recall; baja cuando cualquiera de las dos es baja. El valor no es una fracción de señales.',
    },
  } satisfies Record<
    MetricId,
    {
      numerator: string;
      denominator: string;
      numeratorText: string;
      denominatorText: string;
      use: string;
    }
  >;
  return { ...explanations[id], interpretation: metricQuestionInterpretation(id, result) };
}

function MetricWalkthrough({
  id,
  counts,
  result,
}: {
  id: MetricId;
  counts: ConfusionCounts;
  result: MetricResult;
}) {
  const [step, setStep] = useState(0);
  const headingId = useId().replaceAll(':', '');
  const spec = METRIC_SPECS[id];
  const explanation = metricWalkthrough(id, counts, result);
  const numerator = step === 0 ? explanation.numerator : String(result.numerator);
  const fractionDenominator = step === 0 ? explanation.denominator : String(result.denominator);
  const fractionLabel =
    step === 0
      ? `${spec.title}: ${explanation.numerator} dividido entre ${explanation.denominator}.`
      : `${spec.title}: ${numerator} dividido entre ${fractionDenominator}.`;
  const stepContent = [
    {
      title: 'Identifica el numerador',
      description: explanation.numeratorText,
    },
    {
      title: 'Construye el denominador',
      description: explanation.denominatorText,
    },
    {
      title: 'Interpreta y usa el resultado',
      description: `${explanation.interpretation} ${explanation.use} ${spec.limit}`,
    },
  ][step]!;

  return (
    <div className="s03-precision-walkthrough">
      <section
        className="s03-precision-walkthrough__step"
        aria-labelledby={`s03-metric-step-${headingId}`}
      >
        <h4 id={`s03-metric-step-${headingId}`}>Construimos {spec.title}</h4>
        <p className="s03-precision-walkthrough__progress">
          Paso {step + 1} de 3 · {stepContent.title}
        </p>
        <p>{stepContent.description}</p>
        <PrecisionFraction
          numerator={numerator}
          denominator={fractionDenominator}
          label={fractionLabel}
        />
        <p className="s03-precision-walkthrough__current-result" role="status" aria-live="polite">
          <strong>Resultado del ejemplo: </strong>
          <span>{formatFraction(result)}</span>
        </p>
        <SessionNavigationControls
          index={step}
          count={3}
          onMove={(delta) => setStep((current) => Math.max(0, Math.min(2, current + delta)))}
          scope="explanation"
        />
        <noscript>
          <p>
            {explanation.numeratorText} {explanation.denominatorText}
          </p>
          <p>
            {spec.formula}: {metricSubstitution(id, counts)}. {formatFraction(result)}.
          </p>
          <p>
            {explanation.interpretation} {explanation.use} {spec.limit}
          </p>
        </noscript>
      </section>
    </div>
  );
}

function MetricScene({ id }: { id: MetricId }) {
  const counts = countPredictions(S03_CONFUSION_CASES);
  const spec = METRIC_SPECS[id];
  const value = countsForMetric(id, counts);
  return (
    <div className="s03-metric-scene">
      <div className="s03-metric-scene__visual">
        <ConfusionMatrix counts={counts} caption={spec.definition} compact />
      </div>
      <div className="s03-metric-scene__explanation">
        <MetricWalkthrough key={id} id={id} counts={counts} result={value} />
      </div>
    </div>
  );
}

function ThresholdControl({
  value,
  onChange,
  showRule = true,
}: {
  value: number;
  onChange: (value: number) => void;
  showRule?: boolean;
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
      {showRule && <p>Regla de decisión: puntaje ≥ umbral → predicción PC.</p>}
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

function CurveChart({
  kind,
  points,
  current,
  threshold,
  showCaption = true,
  showArea = false,
}: {
  kind: 'pr' | 'roc';
  points: readonly CurvePoint[];
  current: CurvePoint;
  threshold: number;
  showCaption?: boolean;
  showArea?: boolean;
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
  const xLabel = kind === 'pr' ? 'Recall' : 'Tasa de falsos positivos (FPR)';
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
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
      >
        <title id={`${id}-title`}>
          {kind === 'pr' ? 'Curva precision–recall sintética' : 'Curva ROC sintética'}
        </title>
        <desc id={`${id}-description`}>
          {kind === 'pr'
            ? `Curva calculada con seis puntajes ficticios. Con umbral ${formatNumber(threshold)}, recall es ${current.x === undefined ? 'indefinido' : formatNumber(current.x)} y precision es ${current.y === undefined ? 'indefinida' : formatNumber(current.y)}. Si no hay predicciones positivas, precision queda indefinida y no se dibuja el punto.`
            : `Curva calculada con seis puntajes ficticios. ${showArea ? 'La región sombreada representa el área bajo la curva, 8/9.' : ''} Con umbral ${formatNumber(threshold)}, la tasa de falsos positivos es ${current.x === undefined ? 'indefinida' : formatNumber(current.x)} y la recuperación es ${current.y === undefined ? 'indefinida' : formatNumber(current.y)}.`}
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
        {kind === 'roc' && showArea && validPoints.length > 0 && (
          <path
            className="s03-curve__area"
            d={`${path} L ${xPosition(validPoints[validPoints.length - 1]!.x)} ${yPosition(0)} L ${xPosition(validPoints[0]!.x)} ${yPosition(0)} Z`}
            aria-hidden="true"
          />
        )}
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
      {kind === 'roc' && showCaption && (
        <figcaption>
          {`Con umbral ${formatNumber(threshold)}, FPR = ${current.x === undefined ? 'indefinida' : formatNumber(current.x)} y TPR = ${current.y === undefined ? 'indefinido' : formatNumber(current.y)}.`}
        </figcaption>
      )}
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
  const example = S03_SCORED_SIGNALS.find((signal) => signal.id === 'C')!;
  return (
    <div className="s03-threshold-scene">
      <div className="s03-threshold-scene__controls">
        <ThresholdControl value={threshold} onChange={onChange} showRule={false} />
        <p className="s03-threshold-scene__example" role="status" aria-live="polite">
          Por ejemplo, la señal C tiene puntaje {formatNumber(example.score)}. Con umbral{' '}
          {formatNumber(threshold)}, se predice {example.score >= threshold ? 'PC' : 'no tránsito'}.
        </p>
        <ConfusionMatrix counts={counts} compact />
      </div>
      <ScoreTable signals={S03_SCORED_SIGNALS} threshold={threshold} />
      <p className="s03-evaluation__note">
        Al mover el umbral solo cambian las predicciones. Las tres referencias PC y las tres
        referencias negativas permanecen fijas. Todos los casos y puntajes son ficticios.
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
        <ThresholdControl value={threshold} onChange={onChange} showRule={kind !== 'pr'} />
        <CurveChart
          kind={kind}
          points={points}
          current={current}
          threshold={threshold}
          showCaption={false}
        />
      </div>
      <aside className="s03-curve-scene__reading">
        <h3>{kind === 'pr' ? 'Qué muestra la curva' : 'Qué observar'}</h3>
        {kind === 'pr' ? (
          <>
            <p>
              Al comparar modelos, busca una curva que se mantenga más arriba: para la misma
              recuperación, una precisión mayor significa una menor proporción de falsas alertas
              entre las señales seleccionadas. Una curva próxima a la esquina superior derecha
              combina alta recuperación y alta precisión.
            </p>
            <p>
              La figura del artículo compara tres modelos: lineal (morado), red totalmente conectada
              (naranja) y red convolucional (azul). Los tres reciben las vistas global y local de
              las señales; cada curva muestra su precisión y recuperación al variar el umbral.
            </p>
            {current.y === undefined && (
              <p>
                Con este umbral no se selecciona ninguna señal: la precisión queda indefinida y el
                punto no aparece.
              </p>
            )}
            <S03PaperFigure figureNumber={6} variant="wide" />
          </>
        ) : (
          <>
            <p>
              La recuperación cuenta las candidatas encontradas entre las candidatas de referencia.
              La tasa de falsos positivos cuenta las falsas alertas entre las señales de referencia
              negativas. Cada tasa se calcula sobre un grupo distinto.
            </p>
            <p>
              Un punto cerca de la esquina superior izquierda combina una recuperación alta con
              pocas falsas alertas entre las señales negativas.
            </p>
            <p>
              La diagonal representa el comportamiento esperado de un clasificador que ordena al
              azar: allí las tasas de recuperación y de falsas alertas son iguales. Una curva más
              cercana a la esquina superior izquierda muestra una mejor separación en esa zona.
            </p>
          </>
        )}
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
      <div className="s03-auc-scene__threshold">
        <ThresholdControl value={threshold} onChange={onChange} showRule={false} />
        <CurveChart
          kind="roc"
          points={rocPoints}
          current={current}
          threshold={threshold}
          showCaption={false}
          showArea
        />
      </div>
      <aside className="s03-curve-scene__reading">
        <h3>Qué nos dice el área</h3>
        <p>
          El área sombreada resume toda la curva: un valor de 1 corresponde a un ordenamiento
          perfecto y 0,5 al valor esperado si el ordenamiento fuera aleatorio.
        </p>
        <p>
          En el artículo, la red convolucional obtuvo un AUC de <strong>0,988</strong> en el
          conjunto de prueba. Esa cifra resume el ordenamiento de sus señales de prueba.
        </p>
        <details className="s03-auc-scene__details">
          <summary>Ver cómo se calcula el área del ejemplo</summary>
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
                Para cada tramo: ΔFPR × (TPR inicial + TPR final) / 2. Los saltos verticales tienen
                ΔFPR = 0 y aportan área cero.
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
        </details>
      </aside>
    </div>
  );
}

/** Visual and mathematical content for S03 stations 6–8. */
export default function S03EvaluationScenes({ sceneId }: { sceneId: string }) {
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);

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
    return (
      <div className="s03-evaluation s03-evaluation--matrix">
        <SignalSortingActivity />
      </div>
    );
  }

  if (sceneId === 'confusion-cases') {
    return (
      <div className="s03-evaluation">
        <ErrorConsequenceStories />
      </div>
    );
  }

  if (sceneId.startsWith('metric-')) {
    const metricId = sceneId.slice('metric-'.length) as MetricId;
    if (METRIC_IDS.includes(metricId)) {
      return (
        <div className="s03-evaluation s03-evaluation--metric">
          <h3>{METRIC_SPECS[metricId].title}</h3>
          <MetricScene id={metricId} />
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
