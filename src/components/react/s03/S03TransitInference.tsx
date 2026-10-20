import { useId } from 'react';

import { getPeriodicTransitEpochs } from '../../../lib/s03-transit';
import './s03-transit.css';

const SERIES = {
  durationDays: 24,
  periodDays: 8,
  firstEpochDays: 3.2,
  sampleCount: 481,
  yMin: 0.978,
  yMax: 1.022,
  plot: { left: 92, top: 72, width: 562, height: 248 },
};

const EPOCHS = getPeriodicTransitEpochs(SERIES.periodDays, 3, SERIES.firstEpochDays);

type Observation = { time: number; flux: number; inTransit: boolean };

function transitShape(distanceDays: number): number {
  const halfDuration = 0.24;
  const flatHalfDuration = 0.16;
  if (distanceDays <= flatHalfDuration) return 1;
  if (distanceDays >= halfDuration) return 0;
  return (halfDuration - distanceDays) / (halfDuration - flatHalfDuration);
}

function buildSyntheticSeries(): Observation[] {
  return Array.from({ length: SERIES.sampleCount }, (_, index) => {
    const time = (SERIES.durationDays * index) / (SERIES.sampleCount - 1);
    const nearestEpoch = EPOCHS.reduce(
      (nearest, epoch) => (Math.abs(time - epoch) < Math.abs(time - nearest) ? epoch : nearest),
      EPOCHS[0]!,
    );
    const distanceDays = Math.abs(time - nearestEpoch);
    const inTransit = distanceDays <= 0.24;
    const slowVariability =
      0.0018 * Math.sin((2 * Math.PI * time) / 18) + 0.0007 * Math.sin((2 * Math.PI * time) / 3.7);
    const deterministicNoise =
      0.0015 * Math.sin(index * 12.9898) +
      0.0009 * Math.sin(index * 78.233) +
      0.0006 * Math.cos(index * 31.416);
    const occasionalDeviation = index === 108 ? 0.006 : index === 374 ? -0.005 : 0;
    const transitDrop = 0.012 * transitShape(distanceDays);

    return {
      time,
      flux: 1 + slowVariability + deterministicNoise + occasionalDeviation - transitDrop,
      inTransit,
    };
  });
}

const OBSERVATIONS = buildSyntheticSeries();
const X_TICKS = [0, 6, 12, 18, 24];
const Y_TICKS = [0.98, 1, 1.02];

function TransitSignalPlot() {
  const id = useId().replaceAll(':', '');
  const titleId = `s03-transit-inference-title-${id}`;
  const descriptionId = `s03-transit-inference-desc-${id}`;
  const { left, top, width, height } = SERIES.plot;
  const xAt = (time: number) => left + (time / SERIES.durationDays) * width;
  const yAt = (flux: number) => top + ((SERIES.yMax - flux) / (SERIES.yMax - SERIES.yMin)) * height;
  const plotBottom = top + height;
  const firstX = xAt(EPOCHS[0]!);
  const secondX = xAt(EPOCHS[1]!);

  return (
    <figure className="s03-inference__figure">
      <svg
        className="s03-inference__plot"
        viewBox="0 0 700 390"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
        focusable="false"
      >
        <title id={titleId}>Serie fotométrica sintética con tres caídas repetidas</title>
        <desc id={descriptionId}>
          481 mediciones sintéticas de flujo relativo durante 24 días, con variación y ruido. Se ven
          tres caídas de forma parecida, separadas por aproximadamente 8 días. La serie ilustra una
          hipótesis de tránsito y no es una observación de Kepler ni una confirmación planetaria.
        </desc>
        <rect className="s03-inference__surface" x="0" y="0" width="700" height="390" rx="12" />

        <text className="s03-inference__period-label" x={(firstX + secondX) / 2} y="34">
          P ≈ 8 días
        </text>
        <line className="s03-inference__period-line" x1={firstX} x2={secondX} y1="47" y2="47" />
        <path
          className="s03-inference__period-arrow"
          d={`M ${firstX + 8} 42 L ${firstX} 47 L ${firstX + 8} 52 M ${secondX - 8} 42 L ${secondX} 47 L ${secondX - 8} 52`}
        />

        <rect
          className="s03-inference__plot-area"
          x={left}
          y={top}
          width={width}
          height={height}
          rx="5"
        />

        {Y_TICKS.map((tick) => (
          <g key={tick}>
            <line
              className={
                tick === 1
                  ? 's03-inference__gridline s03-inference__baseline'
                  : 's03-inference__gridline'
              }
              x1={left}
              x2={left + width}
              y1={yAt(tick)}
              y2={yAt(tick)}
            />
            <text
              className="s03-inference__tick-label"
              x={left - 9}
              y={yAt(tick) + 7}
              textAnchor="end"
            >
              {tick.toFixed(2)}
            </text>
          </g>
        ))}

        {X_TICKS.map((tick) => (
          <g key={tick}>
            <line
              className="s03-inference__gridline s03-inference__gridline--vertical"
              x1={xAt(tick)}
              x2={xAt(tick)}
              y1={top}
              y2={plotBottom}
            />
            <text
              className="s03-inference__tick-label"
              x={xAt(tick)}
              y={plotBottom + 28}
              textAnchor="middle"
            >
              {tick}
            </text>
          </g>
        ))}

        {EPOCHS.map((epoch, index) => {
          const eventX = xAt(epoch);
          const halfWindow = (0.24 / SERIES.durationDays) * width;
          return (
            <g key={epoch}>
              <rect
                className="s03-inference__event-window"
                x={eventX - halfWindow}
                y={top}
                width={halfWindow * 2}
                height={height}
                rx="3"
              />
              <line
                className="s03-inference__event-center"
                x1={eventX}
                x2={eventX}
                y1={top}
                y2={plotBottom}
              />
              <text
                className="s03-inference__event-label"
                x={eventX}
                y={top + 23}
                textAnchor="middle"
              >
                {index + 1}
              </text>
            </g>
          );
        })}

        {OBSERVATIONS.map((observation, index) => (
          <circle
            key={index}
            className={
              observation.inTransit
                ? 's03-inference__point s03-inference__point--transit'
                : 's03-inference__point'
            }
            data-in-transit={observation.inTransit}
            cx={xAt(observation.time)}
            cy={yAt(observation.flux)}
            r="2.2"
          />
        ))}

        <line
          className="s03-inference__axis"
          x1={left}
          x2={left + width}
          y1={plotBottom}
          y2={plotBottom}
        />
        <line className="s03-inference__axis" x1={left} x2={left} y1={top} y2={plotBottom} />
        <text
          className="s03-inference__axis-label"
          transform={`translate(24 ${top + height / 2}) rotate(-90)`}
          textAnchor="middle"
        >
          Flujo / mediana
        </text>
        <text
          className="s03-inference__axis-label"
          x={left + width / 2}
          y="382"
          textAnchor="middle"
        >
          Tiempo (días)
        </text>
      </svg>
      <figcaption>Ejemplo sintético.</figcaption>
    </figure>
  );
}

export default function S03TransitInference() {
  const headingId = `s03-transit-inference-heading-${useId().replaceAll(':', '')}`;

  return (
    <section className="s03-transit s03-transit--inference" aria-labelledby={headingId}>
      <header className="s03-transit__intro">
        <p className="s03-transit__eyebrow">1.3 · De una caída a un patrón</p>
        <h3 id={headingId}>La repetición ayuda a formular una hipótesis</h3>
        <p>
          Una caída aislada puede tener varias causas. Cuando caídas de forma parecida reaparecen a
          intervalos regulares, podemos investigar si un cuerpo en órbita pasa frente a la estrella.
        </p>
      </header>

      <div className="s03-inference__layout">
        <TransitSignalPlot />
        <aside className="s03-inference__reading" aria-label="Cómo leer esta serie temporal">
          <ol>
            <li>
              <strong>Una caída:</strong> puede deberse a un tránsito planetario, un eclipse
              estelar, variabilidad de la estrella o un artefacto instrumental.
            </li>
            <li>
              <strong>Forma y repetición:</strong> caídas similares y separadas por un intervalo
              regular son compatibles con un cuerpo que orbita y cruza la estrella.
            </li>
            <li className="s03-inference__warning-item">
              <div
                className="s03-inference__warning"
                role="note"
                aria-label="Advertencia: hipótesis por contrastar"
              >
                <strong>Advertencia · hipótesis por contrastar:</strong> una binaria eclipsante
                también puede ser periódica. La señal orienta la búsqueda; los diagnósticos
                adicionales permiten discriminar causas.
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </section>
  );
}
