import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { s01ParadigmDefinitions, type S01Paradigm } from '../../../lib/s01-journey';
import {
  DefinitionCardDialog,
  DirectDefinitions,
  focusDefinition,
  useCourseConfig,
} from '../S01Pilot';
import { paradigmDescriptions, paradigmOptions } from './scene-data';
import type { SignalSceneProps } from './scene-types';

const signalBuildSteps = [
  { label: 'Pregunta', detail: 'qué buscamos' },
  { label: 'Información', detail: 'qué tenemos' },
  { label: 'Rutas', detail: 'cómo aprendemos' },
] as const;

export function SignalScene({ state, scenario, dispatch, part }: SignalSceneProps) {
  const direct = useCourseConfig().interactionMode === 'direct';
  const showGraphic = part !== 'interaction';
  const showInteraction = part !== 'graphic';
  const guessed = state.signalGuess;
  const correct = guessed === scenario.paradigm;
  const [buildStep, setBuildStep] = useState(0);
  const [selectedParadigmId, setSelectedParadigmId] = useState<S01Paradigm | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const paradigmButtons = useRef<Partial<Record<S01Paradigm, HTMLButtonElement | null>>>({});
  const selectedParadigm =
    s01ParadigmDefinitions.find((item) => item.id === selectedParadigmId) ?? null;

  useEffect(() => {
    if (selectedParadigmId !== null) flipButtonRef.current?.focus();
  }, [selectedParadigmId]);

  useEffect(() => {
    setBuildStep(0);
    setSelectedParadigmId(null);
    setDefinitionVisible(false);
  }, [scenario.id]);

  const mapComplete = buildStep === signalBuildSteps.length;
  const buildStatus =
    buildStep === 0
      ? 'La pregunta es el punto de partida. Construye la primera capa para conectar la información disponible.'
      : buildStep === 1
        ? 'Capa 1 de 3: la pregunta se conecta con la información disponible.'
        : buildStep === 2
          ? 'Capa 2 de 3: la información abre tres rutas posibles de aprendizaje.'
          : 'Mapa completo: las rutas quedan resaltadas para compararlas y consultarlas.';

  function setBuildStage(nextStage: number) {
    const stage = Math.min(Math.max(nextStage, 0), signalBuildSteps.length);
    setBuildStep(stage);
    if (stage < signalBuildSteps.length) {
      setDefinitionVisible(false);
      setSelectedParadigmId(null);
    }
  }

  function advanceBuild() {
    setBuildStage(mapComplete ? 0 : buildStep + 1);
  }

  function openParadigm(paradigm: S01Paradigm) {
    if (direct) return focusDefinition('paradigm', paradigm);
    setDefinitionVisible(false);
    setSelectedParadigmId(paradigm);
  }

  function closeParadigm() {
    const origin = selectedParadigmId === null ? null : paradigmButtons.current[selectedParadigmId];
    setDefinitionVisible(false);
    setSelectedParadigmId(null);
    window.setTimeout(() => origin?.focus(), 0);
  }

  return (
    <section className="s01-scene s01-scene--signal" aria-labelledby="s01-signal-map-title">
      {showGraphic && (
        <div className="s01-scene__graphic">
          <div className="s01-signal-intro">
            <header className="s01-graphic-intro">
              <p className="s01-mini-label">Después · pregunta por la señal</p>
              <h4 id="s01-signal-map-title">
                La estrategia cambia según la información disponible
              </h4>
              <p>
                Una misma observación puede seguir rutas distintas. La pregunta y lo que acompaña a
                cada instancia indican cómo puede aprender el sistema.
              </p>
              <div className="s01-signal-question" aria-label="Desarrollo de la pregunta">
                <span>La pregunta se desarrolla así</span>
                <strong>qué buscamos → qué tenemos → cómo aprendemos</strong>
              </div>
            </header>
            <div
              className="s01-map-builder"
              role="group"
              aria-label="Construcción guiada del mapa conceptual"
            >
              <div className="s01-map-builder__heading">
                <span className="s01-mini-label">Construcción guiada</span>
                <strong>
                  {buildStep}/{signalBuildSteps.length} capas
                </strong>
              </div>
              <ol className="s01-map-builder__steps" aria-label="Capas del mapa">
                {signalBuildSteps.map((step, index) => {
                  const stage = index + 1;
                  return (
                    <li
                      data-active={buildStep === stage}
                      data-complete={buildStep >= stage}
                      key={step.label}
                    >
                      <button
                        type="button"
                        aria-current={buildStep === stage ? 'step' : undefined}
                        aria-label={`Mostrar capa ${stage}: ${step.label}`}
                        aria-pressed={buildStep === stage}
                        onClick={() => setBuildStage(stage)}
                      >
                        <span>0{stage}</span>
                        <small>{step.label}</small>
                        <em>{step.detail}</em>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <div className="s01-map-builder__actions">
                <button type="button" className="s01-map-builder__advance" onClick={advanceBuild}>
                  {mapComplete
                    ? 'Reiniciar mapa'
                    : buildStep === 0
                      ? 'Construir mapa'
                      : 'Construir siguiente capa'}
                </button>
                <button
                  type="button"
                  className="s01-map-builder__complete"
                  disabled={mapComplete}
                  onClick={() => setBuildStage(signalBuildSteps.length)}
                >
                  Ver mapa completo
                </button>
              </div>
              <p className="s01-map-builder__status" role="status" aria-live="polite">
                {buildStatus}
              </p>
            </div>
          </div>
          <div className="s01-signal-map" role="group" aria-label="Tres señales de aprendizaje">
            <svg viewBox="0 0 760 350" aria-hidden="true" focusable="false">
              <title id="s01-signal-svg-title">Tres señales de aprendizaje</title>
              <desc id="s01-signal-svg-desc">
                Una pregunta se ramifica hacia un objetivo por instancia, datos sin objetivo
                etiquetado o acciones con consecuencias y recompensa.
              </desc>
              <g className="s01-signal-trunk">
                <path data-revealed={buildStep >= 1} d="M130 174 H235" />
                <circle cx="80" cy="174" r="50" />
                <text x="80" y="169" textAnchor="middle">
                  ¿qué buscamos
                </text>
                <text x="80" y="189" textAnchor="middle">
                  y qué tenemos?
                </text>
              </g>
              {paradigmOptions.map((option, index) => {
                const y = 70 + index * 105;
                const active = guessed !== null && scenario.paradigm === option.id;
                const selected = selectedParadigmId === option.id;
                return (
                  <g
                    className="s01-signal-branch"
                    data-active={active}
                    data-node-visible={buildStep >= 3}
                    data-revealed={buildStep >= 2}
                    data-selected={selected}
                    key={option.id}
                  >
                    <path d={`M235 174 C300 174 300 ${y} 365 ${y} H466`} />
                    <path
                      className="s01-signal-shape"
                      d={
                        option.id === 'supervised'
                          ? `M500 ${y - 34} H680 V${y + 34} H500 Z`
                          : option.id === 'unsupervised'
                            ? `M590 ${y - 43} L680 ${y} L590 ${y + 43} L500 ${y} Z`
                            : `M590 ${y - 44} L668 ${y - 22} L680 ${y + 32} L590 ${y + 45} L500 ${y + 32} L512 ${y - 22} Z`
                      }
                    />
                  </g>
                );
              })}
            </svg>
            {paradigmOptions.map((option, index) => {
              const y = 70 + index * 105;
              return (
                <button
                  ref={(node) => {
                    paradigmButtons.current[option.id] = node;
                  }}
                  type="button"
                  className={`s01-signal-node s01-signal-node--${option.id}`}
                  key={option.id}
                  style={
                    {
                      '--signal-left': '77.6%',
                      '--signal-top': `${(y / 350) * 100}%`,
                    } as CSSProperties
                  }
                  data-revealed={buildStep >= 3}
                  aria-label={`${s01ParadigmDefinitions.find((item) => item.id === option.id)?.label ?? option.shortLabel}. Abrir definición`}
                  aria-pressed={selectedParadigmId === option.id}
                  data-selected={selectedParadigmId === option.id}
                  onClick={() => openParadigm(option.id)}
                >
                  <span>{option.label}</span>
                  <small>{option.shortLabel}</small>
                </button>
              );
            })}
            <p className="s01-signal-map__instruction">
              {buildStep < 3
                ? 'Construye la tercera capa para resaltar las rutas; los cajones siguen disponibles.'
                : 'Haz clic en un cajón para abrir su definición.'}
            </p>
          </div>
        </div>
      )}
      {showInteraction && (
        <div className="s01-scene__interaction s01-signal-interaction">
          <div className="s01-signal-interaction__prompt">
            <p className="s01-mini-label">Ahora · lleva la pregunta a esta ruta</p>
            <h4 id="s01-signal-title">¿Qué señal está disponible en esta ruta?</h4>
            <p>{scenario.prompt}</p>
            <p className="s01-signal-interaction__logic">
              <strong>La secuencia:</strong> pregunta → información disponible → estrategia de
              aprendizaje.
            </p>
          </div>
          <div className="s01-signal-interaction__decision">
            <p className="s01-mini-label">Predice antes de revelar la ruta</p>
            <div className="s01-choice-grid" aria-label="Posibles señales de aprendizaje">
              {s01ParadigmDefinitions.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={guessed === item.id}
                  onClick={() => dispatch({ type: 'guess-signal', paradigm: item.id })}
                >
                  {paradigmOptions[index]?.label ?? item.label}
                </button>
              ))}
            </div>
            <p
              className="s01-feedback"
              data-status={guessed === null ? 'idle' : correct ? 'correct' : 'repair'}
              aria-live="polite"
            >
              {guessed === null
                ? 'Elige la señal antes de revelar el paradigma.'
                : correct
                  ? `Sí. La información disponible conduce a ${scenario.paradigmLabel.toLowerCase()}: ${paradigmDescriptions[scenario.paradigm]}.`
                  : `Revisa la información disponible: esta ruta conduce a ${scenario.paradigmLabel.toLowerCase()}, porque ${paradigmDescriptions[scenario.paradigm]}.`}
            </p>
            <p className="s01-signal-card-hint">
              Los cajones del mapa abren la tarjeta con la definición formal y el ejemplo
              astronómico.
            </p>
          </div>
        </div>
      )}
      {showGraphic && direct && (
        <DirectDefinitions prefix="paradigm" items={s01ParadigmDefinitions} />
      )}
      {showGraphic && !direct && selectedParadigm !== null && (
        <DefinitionCardDialog
          item={selectedParadigm}
          definitionVisible={definitionVisible}
          flipButtonRef={flipButtonRef}
          onFlip={() => setDefinitionVisible((visible) => !visible)}
          onClose={closeParadigm}
        />
      )}
    </section>
  );
}
