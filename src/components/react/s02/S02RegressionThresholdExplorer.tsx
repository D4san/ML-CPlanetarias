import { useId, useState } from 'react';

import { regressionObservations } from './S02RegressionExplorer';

type Observation = (typeof regressionObservations)[number];
type Leaf = {
  id: string;
  label: string;
  xStart: number;
  xEnd: number;
  rows: Observation[];
  prediction: number;
  sse: number;
};

const rootThresholds = [1.5, 2.5, 3.5, 4.5, 5.5];
const plot = { left: 78, right: 930, top: 32, bottom: 218 };

function formatNumber(value: number, digits = 2, minimumDigits = 0) {
  return value.toLocaleString('es-CO', {
    minimumFractionDigits: minimumDigits,
    maximumFractionDigits: digits,
  });
}

function mean(rows: Observation[]) {
  return rows.reduce((sum, row) => sum + row.y, 0) / rows.length;
}

function sumSquaredErrors(rows: Observation[], prediction: number) {
  return rows.reduce((sum, row) => sum + (row.y - prediction) ** 2, 0);
}

function candidateThresholds(rows: Observation[]) {
  const xValues = [...new Set(rows.map((row) => row.x))].sort((a, b) => a - b);
  return xValues.slice(0, -1).map((value, index) => (value + xValues[index + 1]!) / 2);
}

function leavesForTree(root: number, second: number | null): Leaf[] {
  const left = regressionObservations.filter((row) => row.x <= root);
  const right = regressionObservations.filter((row) => row.x > root);
  const groups =
    second === null
      ? [
          { id: 'L', label: `x ≤ ${formatNumber(root, 1)}`, xStart: 0.5, xEnd: root, rows: left },
          { id: 'R', label: `x > ${formatNumber(root, 1)}`, xStart: root, xEnd: 6.5, rows: right },
        ]
      : [
          { id: 'L', label: `x ≤ ${formatNumber(root, 1)}`, xStart: 0.5, xEnd: root, rows: left },
          {
            id: 'RL',
            label: `${formatNumber(root, 1)} < x ≤ ${formatNumber(second, 1)}`,
            xStart: root,
            xEnd: second,
            rows: right.filter((row) => row.x <= second),
          },
          {
            id: 'RR',
            label: `x > ${formatNumber(second, 1)}`,
            xStart: second,
            xEnd: 6.5,
            rows: right.filter((row) => row.x > second),
          },
        ];

  return groups.map((group) => {
    const prediction = mean(group.rows);
    return { ...group, prediction, sse: sumSquaredErrors(group.rows, prediction) };
  });
}

function scoreRoot(root: number) {
  return leavesForTree(root, null).reduce((sum, leaf) => sum + leaf.sse, 0);
}

function scoreWithoutCut() {
  const prediction = mean(regressionObservations);
  return sumSquaredErrors(regressionObservations, prediction);
}

function mapX(value: number) {
  return plot.left + ((value - 0.5) / 6) * (plot.right - plot.left);
}

function mapY(value: number) {
  return plot.bottom - (value / 35) * (plot.bottom - plot.top);
}

function PredictionPlot({
  rootThreshold,
  secondThreshold,
  leaves,
}: {
  rootThreshold: number;
  secondThreshold: number | null;
  leaves: Leaf[];
}) {
  const segments = leaves.map((leaf) => ({
    ...leaf,
    x1: mapX(leaf.xStart),
    x2: mapX(leaf.xEnd),
    y: mapY(leaf.prediction),
  }));
  const first = segments[0]!;
  let path = `M ${first.x1} ${first.y} H ${first.x2}`;
  for (const segment of segments.slice(1)) path += ` V ${segment.y} H ${segment.x2}`;

  return (
    <figure className="s02-regression-threshold__figure">
      <figcaption>
        <strong>Puntos observados y predicción de cada hoja</strong>
        <span>
          {secondThreshold === null
            ? 'El escalón cambia solo al cruzar un corte.'
            : 'El segundo corte subdivide solo la hoja derecha.'}
        </span>
      </figcaption>
      <svg
        aria-label={`El corte raíz es x menor o igual que ${formatNumber(rootThreshold, 1)}${secondThreshold === null ? '' : ` y hay otro corte en x menor o igual que ${formatNumber(secondThreshold, 1)} dentro de la hoja derecha`}. El escalón representa la media aprendida por cada hoja.`}
        className="s02-regression-threshold__plot"
        role="img"
        viewBox="0 0 1000 282"
      >
        <title>El árbol de regresión cambia sus medias al mover los umbrales</title>
        <desc>
          Cada punto P01 a P06 es un dato inventado. Las regiones se separan por umbrales en x. La
          línea escalonada muestra la media de y en cada hoja.
        </desc>
        <g aria-hidden="true">
          {segments.map((segment) => (
            <rect
              className={`s02-regression-threshold__region s02-regression-threshold__region--${segment.id}`}
              height={plot.bottom - plot.top}
              key={segment.id}
              width={Math.max(0, segment.x2 - segment.x1)}
              x={segment.x1}
              y={plot.top}
            />
          ))}
          {[0, 10, 20, 30].map((tick) => (
            <g key={`y-${tick}`}>
              <line
                className="s02-regression-threshold__grid"
                x1={plot.left}
                x2={plot.right}
                y1={mapY(tick)}
                y2={mapY(tick)}
              />
              <text
                className="s02-regression-threshold__tick"
                textAnchor="end"
                x={plot.left - 11}
                y={mapY(tick) + 6}
              >
                {tick}
              </text>
            </g>
          ))}
          {[1, 2, 3, 4, 5, 6].map((tick) => (
            <g key={`x-${tick}`}>
              <line
                className="s02-regression-threshold__tick-mark"
                x1={mapX(tick)}
                x2={mapX(tick)}
                y1={plot.bottom}
                y2={plot.bottom + 6}
              />
              <text
                className="s02-regression-threshold__tick"
                textAnchor="middle"
                x={mapX(tick)}
                y={plot.bottom + 21}
              >
                {tick}
              </text>
            </g>
          ))}
          <line
            className="s02-regression-threshold__axis"
            x1={plot.left}
            x2={plot.right}
            y1={plot.bottom}
            y2={plot.bottom}
          />
          <line
            className="s02-regression-threshold__axis"
            x1={plot.left}
            x2={plot.left}
            y1={plot.top}
            y2={plot.bottom}
          />
          <line
            className="s02-regression-threshold__cut s02-regression-threshold__cut--root"
            x1={mapX(rootThreshold)}
            x2={mapX(rootThreshold)}
            y1={plot.top}
            y2={plot.bottom}
          />
          {secondThreshold !== null && (
            <line
              className="s02-regression-threshold__cut s02-regression-threshold__cut--second"
              x1={mapX(secondThreshold)}
              x2={mapX(secondThreshold)}
              y1={plot.top}
              y2={plot.bottom}
            />
          )}
          <path className="s02-regression-threshold__step" d={path} />
          {regressionObservations.map((row) => {
            const leaf = leaves.find((candidate) =>
              candidate.rows.some((observation) => observation.id === row.id),
            );
            const pointLabelOffset =
              row.y > 12 ||
              row.y <= 2 ||
              (leaf !== undefined && Math.abs(row.y - leaf.prediction) < 0.01)
                ? 18
                : -10;

            return (
              <g key={row.id}>
                <circle
                  className="s02-regression-threshold__point"
                  cx={mapX(row.x)}
                  cy={mapY(row.y)}
                  r="7"
                />
                <text
                  className="s02-regression-threshold__point-label"
                  textAnchor="middle"
                  x={mapX(row.x)}
                  y={mapY(row.y) + pointLabelOffset}
                >
                  {row.id}
                </text>
              </g>
            );
          })}
          {segments.map((segment) => (
            <text
              className="s02-regression-threshold__mean-label"
              key={`mean-${segment.id}`}
              textAnchor="middle"
              x={(segment.x1 + segment.x2) / 2}
              y={segment.y - 10}
            >
              ŷ={formatNumber(segment.prediction, 2)}
            </text>
          ))}
          <text
            className="s02-regression-threshold__axis-label"
            textAnchor="middle"
            x={(plot.left + plot.right) / 2}
            y="274"
          >
            Entrada x
          </text>
          <text
            className="s02-regression-threshold__axis-label"
            textAnchor="middle"
            transform="rotate(-90 22 128)"
            x="22"
            y="128"
          >
            Objetivo y
          </text>
        </g>
      </svg>
      <div className="s02-regression-threshold__legend" aria-label="Leyenda">
        <span>
          <i className="s02-regression-threshold__legend-point" /> Valor observado
        </span>
        <span>
          <i className="s02-regression-threshold__legend-step" /> Media predicha por hoja
        </span>
        <span>
          <i className="s02-regression-threshold__legend-cut" /> Cortes del árbol
        </span>
      </div>
    </figure>
  );
}

function LeafSummary({ leaves }: { leaves: Leaf[] }) {
  return (
    <ul
      className="s02-regression-threshold__leaf-list"
      aria-label="Observaciones, predicciones y error de cada hoja"
    >
      {leaves.map((leaf) => (
        <li key={leaf.id}>
          <strong>
            Hoja {leaf.id} · {leaf.label}
          </strong>
          <span>{leaf.rows.map((row) => row.id).join(', ')}</span>
          <span>
            Media ŷ = {formatNumber(leaf.prediction)} · SSE = {formatNumber(leaf.sse)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function S02RegressionThresholdExplorer() {
  const id = useId();
  const [rootIndex, setRootIndex] = useState(rootThresholds.indexOf(2.5));
  const [secondIndex, setSecondIndex] = useState(0);
  const [secondLevel, setSecondLevel] = useState(false);
  const rootThreshold = rootThresholds[rootIndex]!;
  const rootRight = regressionObservations.filter((row) => row.x > rootThreshold);
  const secondThresholds = candidateThresholds(rootRight);
  const secondThreshold = secondLevel
    ? (secondThresholds[secondIndex] ?? secondThresholds[0] ?? null)
    : null;
  const leaves = leavesForTree(rootThreshold, secondThreshold);
  const currentSse = leaves.reduce((sum, leaf) => sum + leaf.sse, 0);
  const rootSse = scoreRoot(rootThreshold);
  const rootScores = rootThresholds.map((thresholdValue) => ({
    threshold: thresholdValue,
    sse: scoreRoot(thresholdValue),
  }));
  const bestRoot = rootScores.reduce(
    (best, score) => (score.sse < best.sse ? score : best),
    rootScores[0]!,
  );
  const secondScores = secondThresholds.map((thresholdValue) => ({
    threshold: thresholdValue,
    sse: leavesForTree(rootThreshold, thresholdValue).reduce((sum, leaf) => sum + leaf.sse, 0),
  }));
  const bestSecond = secondScores.length
    ? secondScores.reduce((best, score) => (score.sse < best.sse ? score : best), secondScores[0]!)
    : null;
  const rootInputId = `${id}-root-threshold`;
  const secondInputId = `${id}-second-threshold`;
  const currentDescription = secondLevel
    ? `Raíz x menor o igual que ${formatNumber(rootThreshold, 1)}; segundo corte x menor o igual que ${formatNumber(secondThreshold ?? 0, 1)} en la hoja derecha; error cuadrático total ${formatNumber(currentSse)}.`
    : `Corte raíz x menor o igual que ${formatNumber(rootThreshold, 1)}; error cuadrático total ${formatNumber(currentSse)}; el menor entre los candidatos raíz es ${formatNumber(bestRoot.sse)} con x menor o igual que ${formatNumber(bestRoot.threshold, 1)}.`;

  function reset() {
    setRootIndex(rootThresholds.indexOf(2.5));
    setSecondIndex(0);
    setSecondLevel(false);
  }

  return (
    <section
      className="s02-regression-threshold"
      aria-label="Explorador de cortes y error cuadrático en regresión"
    >
      <div className="s02-regression-threshold__layout">
        <div className="s02-regression-threshold__visual-column">
          <PredictionPlot
            rootThreshold={rootThreshold}
            secondThreshold={secondThreshold}
            leaves={leaves}
          />
          <p className="s02-regression-threshold__note">
            Los seis puntos son sintéticos. Cada media resume solo los valores <strong>y</strong> de
            su hoja; los cortes se hacen sobre la entrada <strong>x</strong>.
          </p>
        </div>

        <aside
          className="s02-regression-threshold__controls"
          aria-label="Controles y resultado actual"
        >
          <div className="s02-regression-threshold__control-heading">
            <div>
              <p className="s02-regression-threshold__step-label">
                {secondLevel ? 'Paso 2 · divide la hoja derecha' : 'Paso 1 · corte raíz'}
              </p>
              <h3>{secondLevel ? 'Ajusta el segundo corte' : 'Mueve el umbral'}</h3>
            </div>
            <button className="s02-regression-threshold__reset" onClick={reset} type="button">
              Reiniciar
            </button>
          </div>
          {!secondLevel ? (
            <>
              <label className="s02-regression-threshold__slider-label" htmlFor={rootInputId}>
                Corte raíz <output>x ≤ {formatNumber(rootThreshold, 1)}</output>
              </label>
              <input
                aria-label="Corte de la raíz; elegir entre cinco umbrales candidatos"
                aria-valuetext={`x menor o igual que ${formatNumber(rootThreshold, 1)}`}
                className="s02-regression-threshold__slider"
                id={rootInputId}
                max={rootThresholds.length - 1}
                min="0"
                onChange={(event) => {
                  setRootIndex(Number(event.currentTarget.value));
                  setSecondIndex(0);
                }}
                step="1"
                type="range"
                value={rootIndex}
              />
              <div className="s02-regression-threshold__range-labels" aria-hidden="true">
                {rootThresholds.map((value) => (
                  <span key={value}>{formatNumber(value, 1)}</span>
                ))}
              </div>
            </>
          ) : (
            <p className="s02-regression-threshold__fixed-root">
              Raíz fija: <strong>x ≤ {formatNumber(rootThreshold, 1)}</strong>
            </p>
          )}

          {secondLevel && secondThreshold !== null && (
            <>
              <label className="s02-regression-threshold__slider-label" htmlFor={secondInputId}>
                Segundo corte <output>x ≤ {formatNumber(secondThreshold, 1)}</output>
              </label>
              <input
                aria-label="Segundo corte, limitado a la hoja derecha"
                aria-valuetext={`En la hoja derecha, x menor o igual que ${formatNumber(secondThreshold, 1)}`}
                className="s02-regression-threshold__slider"
                id={secondInputId}
                max={secondThresholds.length - 1}
                min="0"
                onChange={(event) => setSecondIndex(Number(event.currentTarget.value))}
                step="1"
                type="range"
                value={Math.min(secondIndex, secondThresholds.length - 1)}
              />
              <div className="s02-regression-threshold__range-labels" aria-hidden="true">
                {secondThresholds.map((value) => (
                  <span key={value}>{formatNumber(value, 1)}</span>
                ))}
              </div>
            </>
          )}

          <div className="s02-regression-threshold__score" aria-live="polite" aria-atomic="true">
            <span>{secondLevel ? 'SSE con dos niveles' : 'SSE de este corte'}</span>
            <strong>{formatNumber(currentSse)}</strong>
            <small>
              {secondLevel
                ? `Raíz sola: ${formatNumber(rootSse)} · mejor segundo corte: ${formatNumber(bestSecond?.sse ?? currentSse)} en x ≤ ${formatNumber(bestSecond?.threshold ?? secondThreshold ?? rootThreshold, 1)}.`
                : `Sin corte: ${formatNumber(scoreWithoutCut())} · mejor corte raíz: ${formatNumber(bestRoot.sse)} en x ≤ ${formatNumber(bestRoot.threshold, 1)}.`}
            </small>
          </div>

          <button
            className="s02-regression-threshold__deepen"
            disabled={!secondLevel && rootRight.length < 2}
            onClick={() => {
              setSecondLevel((active) => !active);
              setSecondIndex(0);
            }}
            type="button"
          >
            {secondLevel ? 'Volver a un solo corte' : 'Añadir otro corte en la hoja derecha'}
          </button>
          <LeafSummary leaves={leaves} />
          <p
            aria-atomic="true"
            aria-live="polite"
            className="s02-regression-threshold__sr-only"
            role="status"
          >
            {currentDescription}
          </p>
        </aside>
      </div>
    </section>
  );
}
