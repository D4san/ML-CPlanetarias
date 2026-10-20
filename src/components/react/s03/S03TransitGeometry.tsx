import { useCallback, useEffect, useId, useMemo, useState } from 'react';

import {
  classifyTransit,
  DEFAULT_TRANSIT_STATE,
  getImpactParameter,
  getProjectedPosition,
  getTransitFlux,
  sampleTransitLightCurve,
  wrapTransitPhase,
  type TransitKind,
  type TransitState,
} from '../../../lib/s03-transit';
import { withBase } from '../../../lib/urls';
import { S03ConceptHelp } from './S03ContextHelp';
import './s03-transit.css';

const PHASE_RATE_CYCLES_PER_MS = 1 / 14000;
const WIDE_PLOT = {
  viewBoxWidth: 620,
  viewBoxHeight: 250,
  left: 76,
  top: 32,
  width: 486,
  height: 150,
  tickY: 222,
  phaseLabelX: 600,
  phaseLabelY: 242,
};
const GEOMETRY_PLOT = {
  viewBoxWidth: 520,
  viewBoxHeight: 340,
  left: 76,
  top: 32,
  width: 420,
  height: 228,
  tickY: 294,
  phaseLabelX: 508,
  phaseLabelY: 324,
};
const DEFAULT_FLUX_MIN = 0.985;
const FLUX_MAX = 1.002;
const TRANSIT_STAR_IMAGE = withBase('/images/s03/s03-transit-star-conceptual.png');

function useReducedMotionPreference(onReduce: () => void) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!query) return undefined;
    const update = () => {
      setReducedMotion(query.matches);
      if (query.matches) onReduce();
    };
    update();
    query.addEventListener?.('change', update);
    return () => query.removeEventListener?.('change', update);
  }, [onReduce]);

  return reducedMotion;
}

function statusLabel(kind: TransitKind): string {
  if (kind === 'central') return 'tránsito central';
  if (kind === 'full') return 'tránsito completo';
  if (kind === 'grazing') return 'tránsito rasante';
  return 'sin tránsito';
}

function phasePoint(state: TransitState, phase: number, scale: number, cx: number, cy: number) {
  const position = getProjectedPosition(state, phase);
  return { x: cx + position.xSky * scale, y: cy - position.ySky * scale };
}

function orbitArcPath(
  state: TransitState,
  startPhase: number,
  endPhase: number,
  sampleCount: number,
  scale: number,
  cx: number,
  cy: number,
): string {
  return Array.from({ length: sampleCount }, (_, index) => {
    const phase = startPhase + ((endPhase - startPhase) * index) / (sampleCount - 1);
    const point = phasePoint(state, phase, scale, cx, cy);
    return `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }).join(' ');
}

function scaleSrgbColor(color: string, intensity: number): string {
  const channels = [1, 3, 5].map((index) => Number.parseInt(color.slice(index, index + 2), 16));
  const scaled = channels.map((channel) => {
    const srgb = channel / 255;
    const linear = srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
    const dimmed = linear * intensity;
    const output = dimmed <= 0.0031308 ? dimmed * 12.92 : 1.055 * dimmed ** (1 / 2.4) - 0.055;
    return Math.round(output * 255)
      .toString(16)
      .padStart(2, '0');
  });
  return `#${scaled.join('')}`;
}

function formatSpanishDecimal(value: number, digits = 1): string {
  return value.toFixed(digits).replace('.', ',');
}

function limbGradientStops(coefficient: number) {
  return Array.from({ length: 7 }, (_, index) => {
    const radius = index / 6;
    const mu = Math.sqrt(Math.max(0, 1 - radius ** 2));
    const intensity = 1 - coefficient * (1 - mu);
    return {
      offset: `${radius * 100}%`,
      intensity,
      color: scaleSrgbColor('#f7c85c', intensity),
    };
  });
}

export function TransitProjection({
  state,
  label = 'Geometría del tránsito',
  showVisualHeading = false,
  illustratedStar = false,
}: {
  state: TransitState;
  label?: string;
  showVisualHeading?: boolean;
  illustratedStar?: boolean;
}) {
  const uniqueId = useId().replaceAll(':', '');
  const gradientId = `${uniqueId}-star-gradient`;
  const position = getProjectedPosition(state);
  const impactParameter = getImpactParameter(state);
  const kind = classifyTransit(state);
  const scale = 44;
  const centerX = 410;
  const centerY = 190;
  const starRadius = scale;
  const orbitX = state.aOverRStar * scale;
  const orbitY = orbitX * Math.cos((state.inclinationDegrees * Math.PI) / 180);
  const projectedPlanet = phasePoint(state, state.phaseCycles, scale, centerX, centerY);
  const behindAndOcculted =
    !position.inFront && position.projectedSeparation < 1 + state.radiusRatio;
  const markerVisible = !behindAndOcculted;

  return (
    <figure className="s03-transit__projection-figure">
      {showVisualHeading && (
        <header className="s03-transit__visual-heading s03-transit__visual-heading--model">
          <span>01 · MODELO</span>
          <h4>Geometría proyectada</h4>
        </header>
      )}
      <svg
        className="s03-transit__projection"
        data-profile={state.profile}
        viewBox="0 0 820 380"
        data-transit-kind={kind}
        role="img"
        aria-labelledby={`${uniqueId}-projection-title ${uniqueId}-projection-desc`}
      >
        <title id={`${uniqueId}-projection-title`}>{label}</title>
        <desc id={`${uniqueId}-projection-desc`}>
          Órbita circular proyectada sobre el plano del cielo. La mitad discontinua queda detrás de
          la estrella y la mitad continua pasa delante.{' '}
          {state.profile === 'linear-limb-darkening'
            ? `El disco muestra oscurecimiento al limbo: el brillo normalizado baja de 1 en el centro a ${formatSpanishDecimal(1 - state.limbDarkeningCoefficient)} en el borde. `
            : 'El disco tiene brillo uniforme. '}
          La inclinación es {state.inclinationDegrees.toFixed(1)}
          grados, b es {impactParameter.toFixed(2)} radios estelares y la fase es{' '}
          {state.phaseCycles.toFixed(3)}
          ciclos. Vemos el tránsito de frente: el observador está en +z y mira hacia −z.
        </desc>
        <defs>
          <radialGradient
            id={gradientId}
            gradientUnits="userSpaceOnUse"
            cx={centerX}
            cy={centerY}
            r={starRadius}
          >
            {state.profile === 'uniform' ? (
              <>
                <stop offset="0%" stopColor="#f7c85c" stopOpacity="1" />
                <stop offset="100%" stopColor="#f7c85c" stopOpacity="1" />
              </>
            ) : (
              limbGradientStops(state.limbDarkeningCoefficient).map((stop) => (
                <stop
                  key={stop.offset}
                  offset={stop.offset}
                  stopColor={stop.color}
                  data-normalized-intensity={stop.intensity.toFixed(3)}
                />
              ))
            )}
          </radialGradient>
        </defs>

        <rect
          className="s03-transit__projection-surface"
          x="0"
          y="0"
          width="820"
          height="380"
          rx="16"
        />
        <path
          className="s03-transit__orbit s03-transit__orbit--back"
          d={orbitArcPath(state, 0.25, 0.75, 61, scale, centerX, centerY)}
        />
        <path
          className="s03-transit__orbit s03-transit__orbit--front"
          d={orbitArcPath(state, -0.25, 0.25, 61, scale, centerX, centerY)}
        />
        {orbitY > 0.01 ? (
          <ellipse
            className="s03-transit__orbit-star"
            cx={centerX}
            cy={centerY}
            rx={orbitX}
            ry={orbitY}
          />
        ) : (
          <line
            className="s03-transit__orbit-star"
            x1={centerX - orbitX}
            x2={centerX + orbitX}
            y1={centerY}
            y2={centerY}
          />
        )}
        <circle
          className="s03-transit__star"
          data-profile={state.profile}
          cx={centerX}
          cy={centerY}
          r={starRadius}
          fill={`url(#${gradientId})`}
        />
        {illustratedStar && (
          <image
            className="s03-transit__star-image"
            href={TRANSIT_STAR_IMAGE}
            x={centerX - starRadius * 1.4}
            y={centerY - starRadius * 1.4}
            width={starRadius * 2.8}
            height={starRadius * 2.8}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          />
        )}
        <circle
          className="s03-transit__star-edge"
          data-profile={state.profile}
          cx={centerX}
          cy={centerY}
          r={starRadius}
        />
        {markerVisible && (
          <g
            className={
              position.inFront
                ? 's03-transit__planet s03-transit__planet--front'
                : 's03-transit__planet s03-transit__planet--back'
            }
          >
            <circle
              cx={projectedPlanet.x}
              cy={projectedPlanet.y}
              r={starRadius * state.radiusRatio}
            />
          </g>
        )}

        <g className="s03-transit__line-of-sight" aria-hidden="true">
          <path d="M 572 46 L 588 62 M 588 46 L 572 62" strokeWidth="3" />
          <text x="600" y="54">
            mirada −z
          </text>
          <text x="600" y="78">
            observador +z
          </text>
        </g>
        <text
          className="s03-transit__diagram-label s03-transit__diagram-label--coordinates"
          x="24"
          y="32"
        >
          Plano del cielo · x–y
        </text>
        <text
          className="s03-transit__diagram-label s03-transit__diagram-label--parameters"
          x="24"
          y="356"
        >
          b = {impactParameter.toFixed(2)} R* · k = {state.radiusRatio.toFixed(2)}
        </text>
        <text
          className="s03-transit__diagram-label s03-transit__diagram-label--state"
          x="796"
          y="356"
          textAnchor="end"
        >
          {statusLabel(kind)}
        </text>
        {behindAndOcculted && (
          <text
            className="s03-transit__behind-label"
            x={centerX}
            y={centerY + starRadius + 28}
            textAnchor="middle"
          >
            detrás de la estrella · flujo estelar sin caída
          </text>
        )}
      </svg>
      <figcaption>
        Vemos el tránsito de frente: observador en +z y mirada hacia −z. El trazo continuo va
        delante de la estrella; el discontinuo, detrás.{' '}
        {state.profile === 'linear-limb-darkening'
          ? `El disco pasa de intensidad normalizada 1 en el centro a ${formatSpanishDecimal(1 - state.limbDarkeningCoefficient)} en el borde.`
          : 'El disco mantiene el mismo brillo del centro al borde.'}
      </figcaption>
    </figure>
  );
}

export function TransitLightCurve({
  state,
  label = 'Curva de luz sincronizada',
  showVisualHeading = false,
  showCaption = true,
}: {
  state: TransitState;
  label?: string;
  showVisualHeading?: boolean;
  showCaption?: boolean;
}) {
  const plot = showVisualHeading ? GEOMETRY_PLOT : WIDE_PLOT;
  const uniqueId = useId().replaceAll(':', '');
  const samples = useMemo(
    () => sampleTransitLightCurve(state, 121),
    [
      state.radiusRatio,
      state.inclinationDegrees,
      state.aOverRStar,
      state.profile,
      state.limbDarkeningCoefficient,
    ],
  );
  const minimumFlux = Math.min(...samples.map((sample) => sample.flux));
  const fluxMin = Math.min(DEFAULT_FLUX_MIN, minimumFlux - 0.003);
  const yForFlux = (flux: number) =>
    plot.top + ((FLUX_MAX - flux) / (FLUX_MAX - fluxMin)) * plot.height;
  const xForPhase = (phase: number) => plot.left + (phase + 0.5) * plot.width;
  const curvePath = samples
    .map(
      (sample, index) =>
        `${index === 0 ? 'M' : 'L'} ${xForPhase(sample.phaseCycles).toFixed(2)} ${yForFlux(sample.flux).toFixed(2)}`,
    )
    .join(' ');
  const currentPhase = wrapTransitPhase(state.phaseCycles);
  const currentFlux = getTransitFlux(state, currentPhase);
  const markerX = xForPhase(currentPhase);
  const markerY = yForFlux(currentFlux);

  return (
    <figure className="s03-transit__curve-figure">
      {showVisualHeading && (
        <header className="s03-transit__visual-heading s03-transit__visual-heading--data">
          <span>02 · SEÑAL</span>
          <h4>Flujo estelar normalizado</h4>
        </header>
      )}
      <svg
        className="s03-transit__curve"
        viewBox={`0 0 ${plot.viewBoxWidth} ${plot.viewBoxHeight}`}
        role="img"
        aria-labelledby={`${uniqueId}-curve-title ${uniqueId}-curve-desc`}
      >
        <title id={`${uniqueId}-curve-title`}>{label}</title>
        <desc id={`${uniqueId}-curve-desc`}>
          Flujo estelar normalizado frente a fase orbital. En fase 0 el planeta está delante de la
          estrella; en fase 0.5 está detrás y el modelo de planeta oscuro mantiene flujo 1. La fase
          actual es {currentPhase.toFixed(3)}, el flujo es {currentFlux.toFixed(4)} y el eje
          vertical se amplía entre {fluxMin.toFixed(3)} y {FLUX_MAX.toFixed(3)}.
        </desc>
        <rect
          className="s03-transit__curve-surface"
          x="0"
          y="0"
          width={plot.viewBoxWidth}
          height={plot.viewBoxHeight}
          rx="12"
        />
        {[fluxMin, (fluxMin + 1) / 2, 1].map((tick) => (
          <g key={tick.toFixed(5)}>
            <line
              className="s03-transit__gridline"
              x1={plot.left}
              x2={plot.left + plot.width}
              y1={yForFlux(tick)}
              y2={yForFlux(tick)}
            />
            <text
              className="s03-transit__tick-label s03-transit__tick-label--flux"
              x={plot.left - 8}
              y={yForFlux(tick) + 4}
              textAnchor="end"
            >
              {tick.toFixed(3)}
            </text>
          </g>
        ))}
        <line
          className="s03-transit__axis"
          x1={plot.left}
          x2={plot.left + plot.width}
          y1={plot.top + plot.height}
          y2={plot.top + plot.height}
        />
        <line
          className="s03-transit__axis"
          x1={plot.left}
          x2={plot.left}
          y1={plot.top}
          y2={plot.top + plot.height}
        />
        <path
          className={`s03-transit__curve-line ${state.profile === 'linear-limb-darkening' ? 's03-transit__curve-line--limb' : ''}`}
          d={curvePath}
        />
        <line
          className="s03-transit__phase-line"
          x1={markerX}
          x2={markerX}
          y1={plot.top}
          y2={plot.top + plot.height}
        />
        <circle className="s03-transit__phase-dot" cx={markerX} cy={markerY} r="6" />
        <text className="s03-transit__axis-label s03-transit__axis-label--flux" x="20" y="28">
          F / F₀
        </text>
        <text
          className="s03-transit__axis-label s03-transit__axis-label--phase"
          x={plot.phaseLabelX}
          y={plot.phaseLabelY}
          textAnchor="end"
        >
          fase orbital
        </text>
        <text className="s03-transit__tick-label" x={plot.left} y={plot.tickY} textAnchor="middle">
          ±0.5
        </text>
        <text
          className="s03-transit__tick-label"
          x={xForPhase(0)}
          y={plot.tickY}
          textAnchor="middle"
        >
          0 · tránsito
        </text>
        <text
          className="s03-transit__tick-label"
          x={xForPhase(0.5)}
          y={plot.tickY}
          textAnchor="end"
        >
          0.5 · detrás
        </text>
      </svg>
      {showCaption && (
        <figcaption>
          Eje vertical ampliado ({fluxMin.toFixed(3)}–{FLUX_MAX.toFixed(3)}) para hacer visible la
          caída. El punto y la proyección comparten fase.
        </figcaption>
      )}
    </figure>
  );
}

export default function S03TransitGeometry() {
  const controlPrefix = `s03-transit-${useId().replaceAll(':', '')}`;
  const phaseId = `${controlPrefix}-phase`;
  const radiusRatioId = `${controlPrefix}-radius-ratio`;
  const inclinationId = `${controlPrefix}-inclination`;
  const [state, setState] = useState<TransitState>(DEFAULT_TRANSIT_STATE);
  const [isPlaying, setIsPlaying] = useState(false);
  const stopPlayback = useCallback(() => setIsPlaying(false), []);
  const reducedMotion = useReducedMotionPreference(stopPlayback);

  useEffect(() => {
    if (!isPlaying || reducedMotion) return undefined;
    let frameId = 0;
    let lastTime = 0;
    const tick = (time: number) => {
      if (lastTime > 0) {
        const elapsed = Math.min(time - lastTime, 100);
        setState((current) => ({
          ...current,
          phaseCycles: wrapTransitPhase(current.phaseCycles + elapsed * PHASE_RATE_CYCLES_PER_MS),
        }));
      }
      lastTime = time;
      frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying, reducedMotion]);

  const impactParameter = getImpactParameter(state);
  const update = (patch: Partial<TransitState>) =>
    setState((current) => ({ ...current, ...patch }));

  return (
    <section
      className="s03-transit s03-transit--geometry"
      aria-labelledby="s03-transit-geometry-title"
    >
      <header className="s03-transit__intro">
        <p className="s03-transit__eyebrow">1.2 · Geometría y proyección</p>
        <h3 id="s03-transit-geometry-title">Una órbita, dos representaciones sincronizadas</h3>
        <p>
          El tránsito ocurre cuando el planeta está delante y su trayectoria proyectada cruza el
          disco estelar. El mismo estado determina el dibujo y la caída de flujo.
        </p>
      </header>

      <div className="s03-transit__layout">
        <div className="s03-transit__visuals">
          <TransitProjection state={state} showVisualHeading />
          <TransitLightCurve state={state} showVisualHeading showCaption={false} />
        </div>

        <aside className="s03-transit__controls" aria-label="Controles de geometría del tránsito">
          <fieldset className="s03-transit__control-group s03-transit__control-group--phase">
            <legend>Fase orbital</legend>
            <label htmlFor={phaseId}>
              Fase · <output htmlFor={phaseId}>{state.phaseCycles.toFixed(2)} ciclos</output>
            </label>
            <input
              id={phaseId}
              type="range"
              min="-0.5"
              max="0.5"
              step="0.01"
              value={state.phaseCycles}
              aria-valuetext={`${state.phaseCycles.toFixed(2)} ciclos; cero es el centro del tránsito`}
              onChange={(event) => update({ phaseCycles: Number(event.currentTarget.value) })}
            />
            <small>0: delante · ±0.25: de lado · ±0.5: detrás</small>
          </fieldset>

          <fieldset className="s03-transit__control-group s03-transit__control-group--parameter">
            <legend>Tamaño relativo</legend>
            <label htmlFor={radiusRatioId}>
              k = Rp/R* · <output htmlFor={radiusRatioId}>{state.radiusRatio.toFixed(2)}</output>
            </label>
            <input
              id={radiusRatioId}
              type="range"
              min="0.04"
              max="0.18"
              step="0.01"
              value={state.radiusRatio}
              aria-valuetext={`Razón de radios ${state.radiusRatio.toFixed(2)}`}
              onChange={(event) => update({ radiusRatio: Number(event.currentTarget.value) })}
            />
            <small>
              La órbita mantiene a/R* = {state.aOverRStar.toFixed(1)} como valor ilustrativo.
            </small>
          </fieldset>

          <fieldset className="s03-transit__control-group s03-transit__control-group--parameter">
            <legend>Orientación orbital</legend>
            <label htmlFor={inclinationId}>
              Inclinación i ·{' '}
              <output htmlFor={inclinationId}>{state.inclinationDegrees.toFixed(1)}°</output>
            </label>
            <input
              id={inclinationId}
              type="range"
              min="75"
              max="90"
              step="0.1"
              value={state.inclinationDegrees}
              aria-valuetext={`Inclinación ${state.inclinationDegrees.toFixed(1)} grados`}
              onChange={(event) =>
                update({ inclinationDegrees: Number(event.currentTarget.value) })
              }
            />
            <div className="s03-transit__impact-help">
              <small>b = (a/R*) cos(i) = {impactParameter.toFixed(2)} R*</small>
              <S03ConceptHelp termId="impact-parameter" iconOnly />
            </div>
          </fieldset>

          <fieldset className="s03-transit__control-group s03-transit__control-group--profile">
            <legend>
              Brillo de la estrella <S03ConceptHelp termId="limb-darkening" iconOnly />
            </legend>
            <div className="s03-transit__profile-toggle">
              <button
                type="button"
                aria-pressed={state.profile === 'linear-limb-darkening'}
                onClick={() =>
                  update({
                    profile:
                      state.profile === 'linear-limb-darkening'
                        ? 'uniform'
                        : 'linear-limb-darkening',
                  })
                }
              >
                Oscurecimiento al limbo
              </button>
            </div>
          </fieldset>

          <div
            className="s03-transit__playback"
            role="group"
            aria-label="Animación de la fase orbital"
          >
            <button
              type="button"
              onClick={() => setIsPlaying((playing) => !playing)}
              aria-pressed={isPlaying}
            >
              {isPlaying ? 'Pausar' : 'Reproducir'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setState(DEFAULT_TRANSIT_STATE);
              }}
            >
              Reiniciar
            </button>
          </div>
          {reducedMotion && (
            <p className="s03-transit__motion-note">
              Movimiento reducido activo; usa el control de fase para recorrer la órbita.
            </p>
          )}
        </aside>
      </div>

      <p className="s03-transit__limit">
        Modelo ideal: órbita circular, sin ruido ni dilución. Detrás de la estrella hay ocultación;
        el flujo estelar no cae.
      </p>
    </section>
  );
}
