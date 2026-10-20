import { useCallback, useEffect, useId, useRef, useState } from 'react';

import {
  DEFAULT_TRANSIT_STATE,
  getProjectedPosition,
  getTransitFlux,
  wrapTransitPhase,
  type TransitState,
} from '../../../lib/s03-transit';
import { TransitLightCurve, TransitProjection } from './S03TransitGeometry';
import './s03-transit.css';

const ORBIT_DURATION_MS = 14_000;
const INITIAL_ANIMATION_STATE: TransitState = {
  ...DEFAULT_TRANSIT_STATE,
  phaseCycles: -0.22,
};

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

export default function S03TransitAnimation() {
  const phaseId = `s03-transit-animation-phase-${useId().replaceAll(':', '')}`;
  const [state, setState] = useState<TransitState>(INITIAL_ANIMATION_STATE);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackStartPhase = useRef(INITIAL_ANIMATION_STATE.phaseCycles);
  const stopPlayback = useCallback(() => setIsPlaying(false), []);
  const reducedMotion = useReducedMotionPreference(stopPlayback);

  useEffect(() => {
    if (!isPlaying || reducedMotion) return undefined;
    let frameId = 0;
    let startTime: number | undefined;
    const startPhase = playbackStartPhase.current;

    const tick = (time: number) => {
      if (startTime === undefined) startTime = time;
      const elapsed = Math.max(0, time - startTime);
      setState((current) => ({
        ...current,
        phaseCycles: wrapTransitPhase(startPhase + elapsed / ORBIT_DURATION_MS),
      }));
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isPlaying, reducedMotion]);

  const position = getProjectedPosition(state);
  const flux = getTransitFlux(state);

  return (
    <section
      className="s03-transit s03-transit--animation"
      aria-labelledby="s03-transit-animation-title"
    >
      <header className="s03-transit__intro">
        <p className="s03-transit__eyebrow">1.1 · De la órbita a la señal</p>
        <h3 id="s03-transit-animation-title">Modelo orbital y caída de luz observada</h3>
        <p>
          Vemos el tránsito de frente: el observador está en +z y mira hacia −z, perpendicular al
          plano del cielo x–y. La fase sincroniza la posición del planeta con la caída de flujo.
        </p>
      </header>

      <div className="s03-transit__animation-visuals">
        <TransitProjection
          state={state}
          label="Órbita circular vista de frente desde el observador"
          illustratedStar
        />
        <TransitLightCurve state={state} label="Caída del flujo estelar durante el tránsito" />
      </div>

      <aside
        className="s03-transit__animation-panel"
        aria-label="Control e interpretación del modelo"
      >
        <div
          className="s03-transit__animation-controls"
          role="group"
          aria-label="Controles de la animación orbital"
        >
          <button
            type="button"
            onClick={() => {
              if (isPlaying) {
                setIsPlaying(false);
              } else {
                playbackStartPhase.current = state.phaseCycles;
                setIsPlaying(true);
              }
            }}
            aria-pressed={isPlaying}
          >
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              playbackStartPhase.current = INITIAL_ANIMATION_STATE.phaseCycles;
              setState(INITIAL_ANIMATION_STATE);
            }}
          >
            Reiniciar
          </button>
          <label htmlFor={phaseId}>
            Fase orbital · <output htmlFor={phaseId}>{state.phaseCycles.toFixed(3)}</output>
          </label>
          <input
            id={phaseId}
            type="range"
            min="-0.5"
            max="0.5"
            step="0.001"
            value={state.phaseCycles}
            aria-valuetext={`${state.phaseCycles.toFixed(3)} ciclos; el planeta está ${position.inFront ? 'delante' : 'detrás'} de la estrella`}
            onChange={(event) => {
              const phaseCycles = Number(event.currentTarget.value);
              setIsPlaying(false);
              setState((current) => ({ ...current, phaseCycles }));
            }}
          />
        </div>
        {reducedMotion && (
          <p className="s03-transit__motion-note">
            Movimiento reducido activo; la escena inicia pausada. Recorre la fase con el deslizador
            o usa Reproducir para iniciar el movimiento.
          </p>
        )}
        <p className="s03-transit__live-summary" role="status" aria-live="polite">
          {position.inFront
            ? `El planeta está delante de la estrella; flujo relativo ${flux.toFixed(3)}.`
            : 'El planeta está detrás de la estrella o al otro lado de la órbita; el modelo no añade una caída de luz planetaria.'}
        </p>
      </aside>
      <p className="s03-transit__limit">
        La estrella es una ilustración conceptual generada con IA. La órbita y la curva muestran un
        modelo circular ideal; un ciclo dura 14 s y el deslizador permite detenerse en cualquier
        fase.
      </p>
    </section>
  );
}
