import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import katex from 'katex';
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  getS01Scenario,
  getS01Stop,
  getS01StopFromHash,
  getS01StopIndex,
  initialS01JourneyState,
  s01JourneyReducer,
  s01Activities,
  s01Lenses,
  s01InstanceTerms,
  s01Outcomes,
  s01ParadigmDefinitions,
  s01Scenarios,
  s01Stops,
  s01TaskDefinitions,
  s01TaskAlgorithmBranches,
  type S01Capacity,
  type S01ActivityId,
  type S01DisplayMode,
  type S01DomainView,
  type S01FamilyBiasId,
  type S01JourneyAction,
  type S01JourneyState,
  type S01LearningMode,
  type S01LensId,
  type S01InstanceTermId,
  type S01OutcomeId,
  type S01Paradigm,
  type S01Scenario,
  type S01StopId,
  type S01TaskId,
} from '../../lib/s01-journey';
import { withBase } from '../../lib/urls';
import './s01-learning-journey.css';

const paradigmOptions: ReadonlyArray<{
  id: S01Paradigm;
  label: string;
  shortLabel: string;
}> = [
  { id: 'supervised', label: 'Objetivo por instancia', shortLabel: 'Supervisado' },
  { id: 'unsupervised', label: 'Sin objetivo etiquetado', shortLabel: 'No supervisado' },
  { id: 'reinforcement', label: 'Acción + recompensa', shortLabel: 'Por refuerzo' },
];

const paradigmDescriptions: Record<S01Paradigm, string> = {
  supervised: 'cada instancia de ajuste trae un objetivo yᵢ',
  unsupervised: 'no hay un objetivo etiquetado por instancia; se trabaja con la estructura de x',
  reinforcement: 'las acciones producen consecuencias y una recompensa',
};

interface SceneProps {
  state: S01JourneyState;
  scenario: S01Scenario;
  dispatch: Dispatch<S01JourneyAction>;
}

interface DefinitionCardItem {
  label: string;
  question: string;
  definition: string;
  example: string;
  notation?: string;
}

function MathExpression({
  tex,
  label,
  block = false,
}: {
  tex: string;
  label: string;
  block?: boolean;
}) {
  return (
    <span
      className={block ? 's01-math s01-math--block' : 's01-math'}
      role="math"
      aria-label={label}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode: block,
          output: 'htmlAndMathml',
          throwOnError: false,
        }),
      }}
    />
  );
}

function DefinitionCardDialog({
  item,
  definitionVisible,
  flipButtonRef,
  onFlip,
  onClose,
}: {
  item: DefinitionCardItem;
  definitionVisible: boolean;
  flipButtonRef: RefObject<HTMLButtonElement | null>;
  onFlip: () => void;
  onClose: () => void;
}) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="s01-outcome-dialog"
      role="dialog"
      aria-label={`Tarjeta de ${item.label}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <article className="s01-outcome-card">
        <button
          type="button"
          className="s01-outcome-card__close"
          aria-label={`Cerrar tarjeta de ${item.label}`}
          onClick={onClose}
        >
          Cerrar
        </button>
        <div className="s01-outcome-card__stage" data-flipped={definitionVisible}>
          <section className="s01-outcome-card__face" aria-hidden={definitionVisible}>
            <p className="s01-mini-label">Concepto seleccionado</p>
            {item.notation && (
              <MathExpression tex={item.notation} label={`Símbolo de ${item.label}`} />
            )}
            <h4>{item.label}</h4>
            <p>{item.question}</p>
          </section>
          <section
            className="s01-outcome-card__face s01-outcome-card__face--back"
            aria-hidden={!definitionVisible}
          >
            <p className="s01-mini-label">Definición de trabajo</p>
            {item.notation && (
              <MathExpression tex={item.notation} label={`Símbolo de ${item.label}`} />
            )}
            <h4>{item.label}</h4>
            <p>{item.definition}</p>
            <small>{item.example}</small>
          </section>
        </div>
        <button
          ref={flipButtonRef}
          type="button"
          className="s01-outcome-card__flip"
          onClick={onFlip}
        >
          {definitionVisible ? 'Volver al frente' : 'Voltear: ver definición'}
        </button>
      </article>
    </div>,
    document.body,
  );
}

function QuestionScene({ state, dispatch }: SceneProps) {
  const lens = s01Lenses.find((item) => item.id === state.lensId) ?? s01Lenses[2];
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<S01OutcomeId | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const outcomeButtons = useRef<Partial<Record<S01OutcomeId, HTMLButtonElement | null>>>({});
  const selectedOutcome = s01Outcomes.find((item) => item.id === selectedOutcomeId) ?? null;

  useEffect(() => {
    if (selectedOutcomeId !== null) flipButtonRef.current?.focus();
  }, [selectedOutcomeId]);

  function openOutcome(outcomeId: S01OutcomeId) {
    setDefinitionVisible(false);
    setSelectedOutcomeId(outcomeId);
  }

  function closeOutcome() {
    if (selectedOutcomeId !== null) outcomeButtons.current[selectedOutcomeId]?.focus();
    setDefinitionVisible(false);
    setSelectedOutcomeId(null);
  }

  return (
    <section className="s01-scene s01-scene--question" aria-labelledby="s01-question-map-title">
      <div className="s01-scene__graphic">
        <header className="s01-question-map__intro">
          <p className="s01-mini-label">Primero · elige la forma de la salida</p>
          <h4 id="s01-question-map-title">¿Qué podemos hacer con una observación?</h4>
          <p>El verbo fija qué queremos obtener. Abre uno para anticipar su significado.</p>
        </header>
        <div className="s01-question-map" role="group" aria-label="Cinco usos de una observación">
          <svg viewBox="0 0 720 390" aria-hidden="true" focusable="false">
            <g className="s01-orbit-lines">
              <path d="M360 194 C250 100 170 62 82 62" />
              <path d="M360 194 C260 160 185 170 78 172" />
              <path d="M360 194 C250 235 175 276 78 281" />
              <path d="M360 194 C470 105 550 78 643 78" />
              <path d="M360 194 C475 244 557 286 646 293" />
            </g>
            <g className="s01-spectrum-core">
              <circle cx="360" cy="194" r="88" />
              <path d="M294 205 L315 202 L330 175 L348 218 L371 157 L390 209 L408 188 L430 196" />
              <text x="360" y="247" textAnchor="middle">
                una observación
              </text>
            </g>
          </svg>
          {s01Outcomes.map((outcome, index) => {
            const positions = [
              ['10.8%', '16%'],
              ['10.8%', '44%'],
              ['10.8%', '72%'],
              ['89.3%', '20%'],
              ['89.7%', '75%'],
            ];
            const [left, top] = positions[index] ?? ['50%', '50%'];
            return (
              <button
                ref={(node) => {
                  outcomeButtons.current[outcome.id] = node;
                }}
                type="button"
                className="s01-outcome-node"
                key={outcome.id}
                style={{ '--outcome-left': left, '--outcome-top': top } as CSSProperties}
                aria-label={`${outcome.label}. Abrir tarjeta`}
                aria-pressed={selectedOutcomeId === outcome.id}
                onClick={() => openOutcome(outcome.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{outcome.label}</strong>
              </button>
            );
          })}
        </div>

        {selectedOutcome !== null && (
          <DefinitionCardDialog
            item={{
              label: selectedOutcome.label,
              question: '¿Qué significa este verbo cuando formulamos un problema con datos?',
              definition: selectedOutcome.definition,
              example: selectedOutcome.example,
            }}
            definitionVisible={definitionVisible}
            flipButtonRef={flipButtonRef}
            onFlip={() => setDefinitionVisible((visible) => !visible)}
            onClose={closeOutcome}
          />
        )}
      </div>
      <div className="s01-scene__interaction">
        <div className="s01-lens-intro">
          <p className="s01-mini-label">Después · formula la pregunta con una lente</p>
          <h4>¿Qué aporta cada disciplina?</h4>
          <p>
            El verbo dice qué buscamos. La lente cambia qué examinamos y cómo justificamos la
            respuesta.
          </p>
        </div>
        <div className="s01-segmented" aria-label="Elegir enfoque para formular la pregunta">
          {s01Lenses.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={state.lensId === item.id}
              onClick={() => dispatch({ type: 'set-lens', lensId: item.id as S01LensId })}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="s01-lens-copy" data-lens={lens.id} aria-live="polite">
          <small>{lens.notation}</small>
          <p className="s01-lens-copy__question">{lens.question}</p>
          <span>{lens.title}</span>
          <p>{lens.text}</p>
        </div>
      </div>
    </section>
  );
}

function InstanceScene({ scenario }: SceneProps) {
  const [selectedTermId, setSelectedTermId] = useState<S01InstanceTermId | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const termButtons = useRef<Partial<Record<S01InstanceTermId, HTMLButtonElement | null>>>({});
  const selectedTerm = s01InstanceTerms.find((item) => item.id === selectedTermId) ?? null;
  const formalism = {
    spectrum: {
      unit: 'espectro i',
      observation: 'flujo medido',
      representation: 'x_i',
      signalTermId: 'target' as const,
      signalLabel: 'objetivo',
      signal: 'y_i',
      model: 'h_\\theta',
      output: '\\hat y_*',
      outputLabel: 'abundancia estimada',
      formula: '\\mathcal D=\\{(x_i,y_i)\\}_{i=1}^{n},\\qquad \\hat y_*=h_\\theta(x_*)',
      formulaLabel:
        'D es el conjunto de pares x sub i, y sub i; la salida y estimada para una instancia nueva es h theta de x nueva.',
      note: 'El objetivo yᵢ guía el ajuste; para una instancia nueva se observa x★ y se produce ŷ★.',
      fitTex: '\\{(x_i,y_i)\\}_{i=1}^{n}\\longrightarrow h_\\theta',
      fitLabel: 'ejemplos con objetivo',
      useTex: 'x_\\star\\longrightarrow\\hat y_\\star',
      useLabel: 'instancia nueva',
    },
    catalog: {
      unit: 'fuente i',
      observation: 'fila del catálogo',
      representation: 'x_i',
      signalTermId: 'signal' as const,
      signalLabel: 'sin objetivo por fila',
      signal: '\\varnothing\\ y_i',
      model: 'h_\\theta',
      output: 'z_i',
      outputLabel: 'grupo o rareza',
      formula: '\\mathcal D=\\{x_i\\}_{i=1}^{n},\\qquad z_i=h_\\theta(x_i)',
      formulaLabel:
        'D contiene representaciones x sub i sin objetivo por fila; z sub i es el grupo o la rareza producida por h theta.',
      note: 'Aquí no se entrega yᵢ por instancia. La salida zᵢ describe estructura; todavía requiere interpretación externa.',
      fitTex: '\\{x_i\\}_{i=1}^{n}\\longrightarrow h_\\theta',
      fitLabel: 'datos sin objetivo por instancia',
      useTex: 'x_i\\longrightarrow z_i',
      useLabel: 'grupo o rareza',
    },
    followup: {
      unit: 'decisión t',
      observation: 'condiciones disponibles',
      representation: 's_t',
      signalTermId: 'signal' as const,
      signalLabel: 'recompensa',
      signal: 'r_t',
      model: '\\pi_\\theta',
      output: 'a_t',
      outputLabel: 'acción de seguimiento',
      formula: 'a_t=\\pi_\\theta(s_t),\\qquad r_t=R(s_t,a_t)',
      formulaLabel:
        'La política pi theta selecciona la acción a sub t desde el estado s sub t; la recompensa r sub t evalúa su consecuencia.',
      note: 'El estado sₜ resume la información disponible; la recompensa rₜ guía el aprendizaje de la política.',
      fitTex: '\\{(s_t,a_t,r_t)\\}\\longrightarrow\\pi_\\theta',
      fitLabel: 'experiencia con consecuencias',
      useTex: 's_t\\longrightarrow a_t',
      useLabel: 'acción elegida',
    },
  }[scenario.id];

  useEffect(() => {
    if (selectedTermId !== null) flipButtonRef.current?.focus();
  }, [selectedTermId]);

  function openTerm(termId: S01InstanceTermId) {
    setDefinitionVisible(false);
    setSelectedTermId(termId);
  }

  function closeTerm() {
    if (selectedTermId !== null) termButtons.current[selectedTermId]?.focus();
    setDefinitionVisible(false);
    setSelectedTermId(null);
  }

  function termButton(
    termId: S01InstanceTermId,
    label: string,
    notation: string,
    detail: string,
    className = '',
  ) {
    return (
      <button
        type="button"
        className={`s01-formal-node ${className}`.trim()}
        ref={(node) => {
          termButtons.current[termId] = node;
        }}
        aria-label={`${label}. Abrir definición`}
        aria-pressed={selectedTermId === termId}
        onClick={() => openTerm(termId)}
      >
        <small>{label}</small>
        <MathExpression tex={notation} label={`${label}: ${detail}`} />
        <span>{detail}</span>
      </button>
    );
  }

  return (
    <section className="s01-scene s01-scene--instance" aria-labelledby="s01-instance-title">
      <div className="s01-scene__graphic">
        <header className="s01-graphic-intro">
          <p className="s01-mini-label">Primero · separa los objetos</p>
          <h4>De una observación a una salida</h4>
          <p>
            La fuente se mide, el dato se representa, el objetivo guía el ajuste y el modelo produce
            una salida para un caso nuevo.
          </p>
        </header>
        <div
          className="s01-formal-map"
          role="group"
          aria-label="Cadena formal desde una instancia hasta la salida"
        >
          <div className="s01-formal-map__chain">
            {termButton('instance', 'instancia', 'i', formalism.unit)}
            <span className="s01-formal-arrow" aria-hidden="true">
              →
            </span>
            {termButton('observation', 'observación', '\\text{dato}', formalism.observation)}
            <span className="s01-formal-arrow" aria-hidden="true">
              →
            </span>
            {termButton('representation', 'representación', formalism.representation, 'entrada')}
            <span className="s01-formal-arrow" aria-hidden="true">
              →
            </span>
            {termButton(
              'model',
              'modelo',
              formalism.model,
              'relación ajustada',
              's01-formal-node--model',
            )}
            <span className="s01-formal-arrow" aria-hidden="true">
              →
            </span>
            {termButton(
              'output',
              'salida',
              formalism.output,
              formalism.outputLabel,
              's01-formal-node--output',
            )}
          </div>
          <div className="s01-formal-map__signal">
            <span aria-hidden="true">↳</span>
            {termButton(
              formalism.signalTermId,
              formalism.signalLabel,
              formalism.signal,
              'señal de aprendizaje',
              's01-formal-node--signal',
            )}
            <p>{formalism.note}</p>
          </div>
        </div>

        {selectedTerm !== null && (
          <DefinitionCardDialog
            item={selectedTerm}
            definitionVisible={definitionVisible}
            flipButtonRef={flipButtonRef}
            onFlip={() => setDefinitionVisible((visible) => !visible)}
            onClose={closeTerm}
          />
        )}
      </div>
      <div className="s01-scene__interaction s01-formula-strip">
        <div className="s01-formula-strip__intro">
          <p className="s01-mini-label">Después · traduce la ruta a símbolos</p>
          <h4 id="s01-instance-title">La notación separa ajustar de usar</h4>
          <p>
            Durante el ajuste usamos ejemplos para construir la relación. Cuando llega un caso
            nuevo, aplicamos esa relación para producir la salida.
          </p>
        </div>
        <div className="s01-formula-strip__equation">
          <MathExpression tex={formalism.formula} label={formalism.formulaLabel} block />
          <small>Ruta formal de este ejemplo</small>
        </div>
        <div className="s01-formula-strip__stages" aria-label="Diferencia entre ajuste y uso">
          <div className="s01-formula-strip__stage">
            <p className="s01-mini-label">Ajuste</p>
            <MathExpression tex={formalism.fitTex} label={`Ajuste: ${formalism.fitLabel}`} />
            <small>{formalism.fitLabel}</small>
          </div>
          <span className="s01-formula-strip__stage-arrow" aria-hidden="true">
            →
          </span>
          <div className="s01-formula-strip__stage">
            <p className="s01-mini-label">Uso</p>
            <MathExpression tex={formalism.useTex} label={`Uso: ${formalism.useLabel}`} />
            <small>{formalism.useLabel}</small>
          </div>
        </div>
        <p className="s01-formula-strip__note">{formalism.note}</p>
      </div>
    </section>
  );
}

function SignalScene({ state, scenario, dispatch }: SceneProps) {
  const guessed = state.signalGuess;
  const correct = guessed === scenario.paradigm;
  const [selectedParadigmId, setSelectedParadigmId] = useState<S01Paradigm | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const paradigmButtons = useRef<Partial<Record<S01Paradigm, HTMLButtonElement | null>>>({});
  const selectedParadigm =
    s01ParadigmDefinitions.find((item) => item.id === selectedParadigmId) ?? null;

  useEffect(() => {
    if (selectedParadigmId !== null) flipButtonRef.current?.focus();
  }, [selectedParadigmId]);

  function openParadigm(paradigm: S01Paradigm) {
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
      <div className="s01-scene__graphic">
        <header className="s01-graphic-intro">
          <p className="s01-mini-label">Después · pregunta por la señal</p>
          <h4 id="s01-signal-map-title">La estrategia cambia según la información disponible</h4>
          <p>
            Una misma observación puede seguir rutas distintas. La pregunta y lo que acompaña a cada
            instancia indican cómo puede aprender el sistema.
          </p>
          <div className="s01-signal-question" aria-label="Desarrollo de la pregunta">
            <span>La pregunta se desarrolla así</span>
            <strong>qué buscamos → qué tenemos → cómo aprendemos</strong>
          </div>
        </header>
        <div className="s01-signal-map" role="group" aria-label="Tres señales de aprendizaje">
          <svg viewBox="0 0 760 350" aria-hidden="true" focusable="false">
            <title id="s01-signal-svg-title">Tres señales de aprendizaje</title>
            <desc id="s01-signal-svg-desc">
              Una pregunta se ramifica hacia un objetivo por instancia, datos sin objetivo
              etiquetado o acciones con consecuencias y recompensa.
            </desc>
            <g className="s01-signal-trunk">
              <path d="M130 174 H235" />
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
            Haz clic en un cajón para abrir su definición.
          </p>
        </div>
      </div>
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
            Los cajones del mapa abren la tarjeta con la definición formal y el ejemplo astronómico.
          </p>
        </div>
      </div>
      {selectedParadigm !== null && (
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

function TaskAlgorithmTree({
  scenario,
  onOpenTask,
  registerTaskButton,
  compact = false,
}: {
  scenario: S01Scenario;
  onOpenTask?: (taskId: S01TaskId) => void;
  registerTaskButton?: (taskId: S01TaskId, node: HTMLButtonElement | null) => void;
  compact?: boolean;
}) {
  return (
    <figure
      className={`s01-algorithm-tree${compact ? ' s01-algorithm-tree--compact' : ''}`}
      aria-labelledby={compact ? 's01-levels-tree-title' : 's01-task-tree-title'}
    >
      <figcaption>
        <span className="s01-mini-label">La tarea abre varias familias</span>
        <strong id={compact ? 's01-levels-tree-title' : 's01-task-tree-title'}>
          De la salida a ejemplos de algoritmos
        </strong>
        <small>
          La señal define el paradigma; la salida define la tarea; la familia acota las hipótesis
          que vamos a comparar.
        </small>
      </figcaption>
      <div className="s01-algorithm-tree__root">
        <span>entrada x</span>
        <strong>¿Qué salida necesitamos?</strong>
        <small>una observación · una representación</small>
      </div>
      <div className="s01-algorithm-tree__branches">
        {s01TaskAlgorithmBranches.map((branch) => {
          const routeActive =
            (scenario.id === 'spectrum' && branch.id === 'regression') ||
            (scenario.id === 'catalog' &&
              (branch.id === 'clustering' || branch.id === 'anomaly')) ||
            (scenario.id === 'followup' && branch.id === 'decision');
          const taskNode = onOpenTask ? (
            <button
              type="button"
              className="s01-algorithm-tree__task"
              ref={(node) => registerTaskButton?.(branch.id, node)}
              data-route={routeActive}
              aria-label={`${branch.task}. Abrir definición`}
              onClick={() => onOpenTask(branch.id)}
            >
              <span>{branch.output}</span>
              <strong>{branch.task}</strong>
            </button>
          ) : (
            <div className="s01-algorithm-tree__task" data-route={routeActive}>
              <span>{branch.output}</span>
              <strong>{branch.task}</strong>
            </div>
          );

          return (
            <article
              className="s01-algorithm-tree__branch"
              data-route={routeActive}
              key={branch.id}
            >
              {taskNode}
              <div
                className="s01-algorithm-tree__examples"
                aria-label={`Ejemplos para ${branch.task}`}
              >
                {branch.examples.map((example) => (
                  <span key={example.label}>
                    <strong>{example.label}</strong>
                    <small>{example.detail}</small>
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <p className="s01-algorithm-tree__note">
        Ejemplos de trabajo, no un catálogo completo: la tarea no elige automáticamente un único
        algoritmo.
      </p>
    </figure>
  );
}

function TaskLevelsGuide({ scenario }: { scenario: S01Scenario }) {
  const levels = [
    {
      index: '01',
      label: 'Señal',
      question: '¿Qué información guía el ajuste?',
      definition: `${scenario.paradigmLabel}: ${paradigmDescriptions[scenario.paradigm]}.`,
      example: 'Etiqueta, estructura del catálogo o recompensa.',
    },
    {
      index: '02',
      label: 'Tarea',
      question: '¿Qué salida necesitamos?',
      definition: 'La forma de la salida que pedimos para cada instancia o decisión.',
      example: 'Regresión, clasificación, grupos, rareza, acción o muestra.',
    },
    {
      index: '03',
      label: 'Familia',
      question: '¿Qué relación vamos a comparar?',
      definition: 'Una clase de modelos que propone cómo producir la salida.',
      example: 'Lineal, árbol, vecinos, densidad o red neuronal.',
    },
  ] as const;

  return (
    <div className="s01-scene__interaction s01-task-guide">
      <header>
        <p className="s01-mini-label">Para leer el árbol</p>
        <h4 id="s01-task-title">Tres niveles, tres decisiones</h4>
        <p>
          Primero declaramos la señal disponible; luego pedimos una salida; al final comparamos
          familias que pueden producirla.
        </p>
      </header>
      <div className="s01-task-guide__levels">
        {levels.map((level) => (
          <article key={level.label}>
            <span>
              {level.index} · {level.label}
            </span>
            <strong>{level.question}</strong>
            <p>{level.definition}</p>
            <small>{level.example}</small>
          </article>
        ))}
      </div>
      <aside className="s01-task-guide__route">
        <span>En esta ruta</span>
        <strong>{scenario.route.task}</strong>
        <p>La rama resalta una posibilidad; las demás siguen disponibles para compararlas.</p>
      </aside>
    </div>
  );
}

function TaskScene({ scenario }: SceneProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<S01TaskId | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const taskButtons = useRef<Partial<Record<S01TaskId, HTMLButtonElement | null>>>({});
  const selectedTask = s01TaskDefinitions.find((item) => item.id === selectedTaskId) ?? null;

  useEffect(() => {
    if (selectedTaskId !== null) flipButtonRef.current?.focus();
  }, [selectedTaskId]);

  function openTask(taskId: S01TaskId) {
    setDefinitionVisible(false);
    setSelectedTaskId(taskId);
  }

  function closeTask() {
    const origin = selectedTaskId === null ? null : taskButtons.current[selectedTaskId];
    setDefinitionVisible(false);
    setSelectedTaskId(null);
    window.setTimeout(() => origin?.focus(), 0);
  }

  return (
    <section className="s01-scene s01-scene--task" aria-labelledby="s01-task-title">
      <div className="s01-scene__graphic">
        <header className="s01-graphic-intro">
          <p className="s01-mini-label">De la señal a la tarea</p>
          <h4>La pregunta determina la forma de la salida</h4>
          <p>
            La ruta activa resalta una posibilidad; el mismo dato admite otras preguntas. Abre cada
            salida para ver qué pregunta responde y qué límite conserva.
          </p>
        </header>
        <div inert={selectedTaskId !== null}>
          <TaskAlgorithmTree
            scenario={scenario}
            onOpenTask={openTask}
            compact
            registerTaskButton={(taskId, node) => {
              taskButtons.current[taskId] = node;
            }}
          />
        </div>

        {selectedTask !== null && (
          <DefinitionCardDialog
            item={selectedTask}
            definitionVisible={definitionVisible}
            flipButtonRef={flipButtonRef}
            onFlip={() => setDefinitionVisible((visible) => !visible)}
            onClose={closeTask}
          />
        )}
      </div>
      <TaskLevelsGuide scenario={scenario} />
    </section>
  );
}

function FamilyScene({ state, dispatch }: SceneProps) {
  const biasCorrect = state.familyBiasGuess === 'open';
  const biasFeedback: Record<S01FamilyBiasId, string> = {
    closed:
      'Una familia cerrada obliga al caso A+B a parecerse a A, B o C. La etiqueta no demuestra que esas sean todas las categorías posibles.',
    open: 'La familia abierta conserva una salida híbrida o una abstención. Así podemos investigar si A+B es una categoría, una mezcla, ruido o un caso fuera del dominio.',
    complexity:
      'Más parámetros pueden cambiar la frontera, pero no crean una categoría que el conjunto de salidas excluye desde el principio.',
  };
  const flow =
    state.learningMode === 'rules'
      ? ['inspeccionar ejemplos', 'escribir umbrales', 'probar casos', 'añadir excepciones']
      : ['reunir ejemplos', 'elegir una familia', 'evaluar no vistos', 'revisar sesgos'];

  return (
    <section className="s01-scene s01-scene--family" aria-labelledby="s01-family-title">
      <div className="s01-scene__graphic s01-learning-flow">
        <div className="s01-learning-flow__header">
          <div>
            <p className="s01-mini-label">La salida todavía no elige el modelo</p>
            <h4>La familia decide qué hipótesis caben</h4>
            <p>
              La tarea fija qué debe salir. La familia aporta una forma de construir la relación,
              extenderla a casos nuevos y representar lo que queda fuera.
            </p>
          </div>
          <div className="s01-segmented" aria-label="Forma de construir la regla">
            {(
              [
                ['rules', 'Reglas explícitas'],
                ['learning', 'Aprender de datos'],
              ] as const
            ).map(([mode, label]) => (
              <button
                type="button"
                key={mode}
                aria-pressed={state.learningMode === mode}
                onClick={() =>
                  dispatch({ type: 'set-learning-mode', mode: mode as S01LearningMode })
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <ol data-mode={state.learningMode}>
          {flow.map((item, index) => (
            <li key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
        <p className="s01-learning-flow__note">
          {state.learningMode === 'rules'
            ? 'El conocimiento se escribe antes de clasificar.'
            : 'La relación se ajusta con ejemplos y una medida de desempeño.'}
        </p>
      </div>
      <div className="s01-scene__interaction s01-compatible s01-bias-challenge">
        <div>
          <p className="s01-mini-label">Elegir una familia también elige sus salidas</p>
          <h4 id="s01-family-title">¿Qué hace con un objeto híbrido?</h4>
          <p>
            Tenemos ejemplos de tres clases: A, B y C. Un objeto nuevo combina rasgos de A y B.
            Compara qué hipótesis deja abierta cada familia antes de elegir el modelo.
          </p>
        </div>
        <div
          className="s01-bias-map"
          role="img"
          aria-label="Una familia cerrada fuerza el caso híbrido a una clase; una familia abierta conserva híbrido o abstención"
        >
          <div className="s01-bias-map__observations">
            <span className="s01-bias-map__label">Casos y nueva observación</span>
            <div>
              {['A', 'B', 'C'].map((label) => (
                <span className="s01-bias-map__class" key={label}>
                  {label}
                </span>
              ))}
              <span className="s01-bias-map__hybrid">
                <b>A+B</b>
                <small>híbrido</small>
              </span>
            </div>
          </div>
          <div className="s01-bias-map__arrow" aria-hidden="true">
            →
          </div>
          <div className="s01-bias-map__families">
            <article data-selected={state.familyBiasGuess === 'closed'}>
              <span className="s01-bias-map__family-kind">Familia cerrada</span>
              <strong>A · B · C</strong>
              <small>A+B → A / B / C</small>
              <em>fuerza una clase</em>
            </article>
            <article data-selected={state.familyBiasGuess === 'open'}>
              <span className="s01-bias-map__family-kind">Familia abierta</span>
              <strong>A · B · C · H</strong>
              <small>A+B → híbrido / abstención</small>
              <em>conserva la duda</em>
            </article>
          </div>
        </div>
        <div
          className="s01-choice-grid s01-choice-grid--bias"
          aria-label="Decisiones sobre la familia del modelo"
        >
          {(
            [
              ['closed', 'Familia cerrada: A / B / C'],
              ['open', 'Familia abierta: añadir híbrido o abstención'],
              ['complexity', 'Hacerla más compleja, sin cambiar las categorías'],
            ] as const
          ).map(([bias, label]) => (
            <button
              type="button"
              key={bias}
              aria-pressed={state.familyBiasGuess === bias}
              data-correct={state.familyBiasGuess === bias && bias === 'open'}
              onClick={() => dispatch({ type: 'set-family-bias', bias })}
            >
              {label}
            </button>
          ))}
        </div>
        <p
          className="s01-feedback"
          data-status={state.familyBiasGuess === null ? 'idle' : biasCorrect ? 'correct' : 'repair'}
          aria-live="polite"
        >
          {state.familyBiasGuess === null
            ? 'La elección de la familia también decide qué categorías puede reconocer.'
            : biasFeedback[state.familyBiasGuess]}
        </p>
        <details className="s01-bias-note">
          <summary>¿Por qué una muestra finita deja hipótesis abiertas?</summary>
          <p>
            Con tres casos no observados y tres clases posibles, todavía hay{' '}
            <strong>3³ = 27</strong> completaciones compatibles. La cuenta muestra la ambigüedad; el
            caso híbrido muestra el costo de cerrar las categorías demasiado pronto.
          </p>
        </details>
      </div>
    </section>
  );
}

function DomainScene({ state, dispatch }: SceneProps) {
  const observed = state.domainView === 'observed';
  const syntheticPoints = [
    [88, 150],
    [138, 145],
    [188, 151],
    [238, 203],
    [288, 225],
    [338, 151],
    [388, 148],
    [438, 153],
    [488, 173],
    [538, 211],
    [588, 156],
    [638, 147],
    [698, 151],
  ];
  const observedPoints: ReadonlyArray<readonly [number, number, number]> = [
    [88, 159, 9],
    [138, 137, 12],
    [188, 158, 10],
    [238, 215, 15],
    [288, 236, 13],
    [338, 162, 11],
    [388, 137, 10],
    [438, 167, 15],
    [588, 169, 13],
    [638, 136, 10],
    [698, 163, 12],
  ];

  return (
    <section className="s01-scene s01-scene--domain" aria-labelledby="s01-domain-title">
      <div className="s01-scene__graphic">
        <header className="s01-graphic-intro">
          <p className="s01-mini-label">La familia puede permanecer fija</p>
          <h4>El modelo aprende en un mundo y se usa en otro</h4>
          <p>
            La pregunta sigue igual; ruido, resolución y cobertura cambian la distribución que
            recibe.
          </p>
        </header>
        <svg
          viewBox="0 0 780 390"
          role="img"
          aria-labelledby="s01-domain-svg-title s01-domain-svg-desc"
        >
          <title id="s01-domain-svg-title">
            Puntos sintéticos y observados alrededor de una señal latente
          </title>
          <desc id="s01-domain-svg-desc">
            La línea tenue representa una señal latente. Los puntos sintéticos son regulares y
            tienen parámetros conocidos. Los puntos observados incluyen barras de error y una región
            faltante; representan mediciones afectadas por ruido, resolución y efectos del
            instrumento.
          </desc>
          <g className="s01-axis">
            <path d="M72 52 V302 H728" />
            <text x="400" y="348" textAnchor="middle">
              longitud de onda
            </text>
            <text x="26" y="178" textAnchor="middle" transform="rotate(-90 26 178)">
              flujo
            </text>
          </g>
          <path
            className="s01-domain-latent"
            d="M78 146 C130 139 170 146 215 146 C248 145 252 214 280 222 C307 223 310 146 348 146 C405 146 423 148 452 146 C486 144 492 202 520 209 C549 209 561 147 606 147 C654 146 685 143 722 149"
          />
          <g className="s01-domain-series" data-series="synthetic" data-active={!observed}>
            <text className="s01-domain-series__label" x="95" y="92">
              sintético · simulado
            </text>
            {syntheticPoints.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
            ))}
          </g>
          <g className="s01-domain-series" data-series="observed" data-active={observed}>
            <text className="s01-domain-series__label" x="95" y="278">
              observado · medido
            </text>
            {observedPoints.map(([x, y, error]) => (
              <g key={`${x}-${y}`}>
                <path d={`M${x} ${y - error} V${y + error}`} />
                <path d={`M${x - 5} ${y - error} H${x + 5} M${x - 5} ${y + error} H${x + 5}`} />
                <circle cx={x} cy={y} r="5.5" />
              </g>
            ))}
          </g>
          <g className="s01-domain-gap" data-active={observed}>
            <rect x="477" y="65" width="69" height="237" rx="12" />
            <path d="M511 70 V297" />
            <text x="511" y="43" textAnchor="middle">
              cobertura faltante
            </text>
          </g>
        </svg>
      </div>
      <div className="s01-scene__interaction s01-domain-controls">
        <div>
          <p className="s01-mini-label">Antes de evaluar · compara entrenamiento y uso</p>
          <h4 id="s01-domain-title">¿Qué tendría que coincidir para transferir el modelo?</h4>
          <p>
            Activa cada vista. La línea representa el fenómeno ideal; los puntos muestran cómo llega
            la señal al modelo.
          </p>
        </div>
        <div className="s01-segmented" aria-label="Dominio del espectro">
          {(
            [
              ['synthetic', 'Sintético'],
              ['observed', 'Observado'],
            ] as const
          ).map(([view, label]) => (
            <button
              type="button"
              key={view}
              aria-pressed={state.domainView === view}
              onClick={() => dispatch({ type: 'set-domain-view', view: view as S01DomainView })}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          className="s01-domain-definitions"
          aria-label="Diferencia entre datos sintéticos y observados"
        >
          <article data-active={!observed}>
            <strong>Sintético</strong>
            <p>Simulado con parámetros conocidos, muestreo regular y cobertura completa.</p>
          </article>
          <article data-active={observed}>
            <strong>Observado</strong>
            <p>
              Medido por un instrumento: incluye incertidumbre, faltantes, selección y respuesta del
              detector.
            </p>
          </article>
        </div>
        <ul aria-live="polite">
          {(observed
            ? [
                'ruido y resolución',
                'región faltante',
                'respuesta instrumental',
                'selección observacional',
              ]
            : [
                'parámetros conocidos',
                'muestreo regular',
                'cobertura completa',
                'supuestos del simulador',
              ]
          ).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EvidenceScene({ state, dispatch }: SceneProps) {
  const curves: Record<S01Capacity, string> = {
    underfit: 'M74 226 C175 204 255 187 350 172 C455 156 555 143 686 130',
    balanced:
      'M74 248 C140 234 170 199 224 187 C285 173 302 126 360 132 C425 138 455 191 514 177 C578 163 622 111 686 100',
    overfit:
      'M74 246 C112 162 154 266 196 176 C235 93 272 233 315 136 C357 45 398 238 439 141 C482 42 525 222 567 123 C610 27 648 192 686 82',
  };
  const capacityCopy: Record<S01Capacity, { title: string; text: string }> = {
    underfit: {
      title: 'Subajuste · capacidad insuficiente',
      text: 'La curva es demasiado rígida: pierde parte del patrón y falla tanto en los datos de ajuste como en los no vistos.',
    },
    balanced: {
      title: 'Ajuste útil · capacidad equilibrada',
      text: 'La curva recoge la señal principal sin perseguir cada fluctuación. La prueba en datos no vistos decide si generaliza.',
    },
    overfit: {
      title: 'Sobreajuste · capacidad excesiva',
      text: 'La curva memoriza ruido de los ejemplos de ajuste. Una apariencia perfecta en entrenamiento puede empeorar al cambiar de objeto.',
    },
  };
  const claimCorrect = state.claimId === 'predictive';

  return (
    <section className="s01-scene s01-scene--evidence" aria-labelledby="s01-evidence-title">
      <div className="s01-scene__graphic">
        <header className="s01-graphic-intro">
          <p className="s01-mini-label">Con el dominio explícito</p>
          <h4>Generalizar exige equilibrar la capacidad</h4>
          <p>La curva debe seguir la señal, no memorizar el ruido de los ejemplos de ajuste.</p>
        </header>
        <svg
          viewBox="0 0 780 390"
          role="img"
          aria-labelledby="s01-evidence-svg-title s01-evidence-svg-desc"
        >
          <title id="s01-evidence-svg-title">
            Comparación entre subajuste, ajuste útil y sobreajuste
          </title>
          <desc id="s01-evidence-svg-desc">
            Puntos de ajuste con barras de error se comparan con una línea base y una curva de
            capacidad baja, equilibrada o excesiva. Los puntos naranjas representan objetos no
            vistos.
          </desc>
          <g className="s01-axis">
            <path d="M58 35 V300 H714" />
          </g>
          <path className="s01-baseline-line" d="M72 186 H696" />
          <text className="s01-baseline-label" x="690" y="171" textAnchor="end">
            línea base
          </text>
          <path className="s01-model-curve" d={curves[state.capacity]} />
          {(
            [
              [92, 240, 8],
              [140, 210, 10],
              [198, 185, 7],
              [256, 171, 9],
              [316, 131, 8],
              [374, 139, 7],
              [432, 165, 9],
              [490, 181, 8],
              [548, 159, 7],
              [610, 116, 9],
              [672, 93, 8],
            ] as const
          ).map(([x, y, error]) => (
            <g className="s01-evidence-series s01-evidence-series--fit" key={`${x}-${y}`}>
              <path d={`M${x} ${y - error} V${y + error}`} />
              <path d={`M${x - 4} ${y - error} H${x + 4} M${x - 4} ${y + error} H${x + 4}`} />
              <circle cx={x} cy={y} r="5" />
            </g>
          ))}
          {(
            [
              [116, 226, 7],
              [268, 151, 9],
              [408, 174, 8],
              [558, 150, 10],
              [650, 126, 7],
            ] as const
          ).map(([x, y, error]) => (
            <g className="s01-evidence-series s01-evidence-series--unseen" key={`${x}-${y}`}>
              <path d={`M${x} ${y - error} V${y + error}`} />
              <path d={`M${x - 4} ${y - error} H${x + 4} M${x - 4} ${y + error} H${x + 4}`} />
              <circle cx={x} cy={y} r="5.5" />
            </g>
          ))}
          <g className="s01-unseen-lane">
            <rect x="72" y="323" width="622" height="36" rx="18" />
            <text x="383" y="346" textAnchor="middle">
              puntos naranjas · datos no vistos · mismo uso previsto
            </text>
          </g>
        </svg>
      </div>
      <div className="s01-scene__interaction s01-evidence-controls">
        <div>
          <p className="s01-mini-label">Última decisión · limita la afirmación</p>
          <h4 id="s01-evidence-title">¿Qué curva generaliza mejor?</h4>
          <p>
            Compara tres capacidades. Luego decide qué afirmación permite realmente la evidencia.
          </p>
        </div>
        <div className="s01-segmented" aria-label="Capacidad ilustrativa del modelo">
          {(
            [
              ['underfit', 'Subajuste'],
              ['balanced', 'Ajuste útil'],
              ['overfit', 'Sobreajuste'],
            ] as const
          ).map(([capacity, label]) => (
            <button
              type="button"
              key={capacity}
              aria-label={
                capacity === 'underfit'
                  ? 'Insuficiente'
                  : capacity === 'balanced'
                    ? 'Equilibrada'
                    : 'Excesiva'
              }
              aria-pressed={state.capacity === capacity}
              onClick={() => dispatch({ type: 'set-capacity', capacity: capacity as S01Capacity })}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="s01-fit-reading" aria-live="polite">
          <strong>{capacityCopy[state.capacity].title}</strong>
          <p>{capacityCopy[state.capacity].text}</p>
        </div>
        <fieldset className="s01-claim-challenge">
          <legend>¿Cuál es la única afirmación defendible?</legend>
          {[
            ['predictive', 'En estas condiciones, superó la línea base en objetos no vistos.'],
            ['physical', 'La curva demuestra que el modelo aprendió el mecanismo físico.'],
            ['universal', 'Funcionará igual con cualquier instrumento y población.'],
          ].map(([id, label]) => (
            <button
              type="button"
              key={id}
              aria-pressed={state.claimId === id}
              onClick={() =>
                dispatch({
                  type: 'set-claim',
                  claimId: id as 'predictive' | 'physical' | 'universal',
                })
              }
            >
              {label}
            </button>
          ))}
        </fieldset>
        <p
          className="s01-feedback"
          data-status={state.claimId === null ? 'idle' : claimCorrect ? 'correct' : 'repair'}
          aria-live="polite"
        >
          {state.claimId === null
            ? 'La métrica todavía necesita una afirmación con alcance explícito.'
            : claimCorrect
              ? 'Esa afirmación conserva condiciones, comparación y datos no vistos.'
              : 'Una buena predicción todavía no prueba mecanismo físico ni validez universal.'}
        </p>
      </div>
    </section>
  );
}

interface S01ConceptNodeData {
  [key: string]: unknown;
  index: string;
  title: string;
  note: string;
  tone: string;
  stopId?: S01StopId;
  onOpen?: (id: S01StopId) => void;
}

type S01ConceptNodeType = Node<S01ConceptNodeData, 'concept'>;

function S01ConceptNode({ data }: NodeProps<S01ConceptNodeType>) {
  const interactive = data.stopId !== undefined && data.onOpen !== undefined;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!interactive || data.stopId === undefined || data.onOpen === undefined) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      data.onOpen(data.stopId);
    }
  }

  return (
    <div
      className="s01-concept-node"
      data-tone={data.tone}
      data-interactive={interactive}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Abrir ${data.index}. ${data.title} en foco` : undefined}
      onClick={() => {
        if (interactive && data.stopId !== undefined && data.onOpen !== undefined)
          data.onOpen(data.stopId);
      }}
      onKeyDown={handleKeyDown}
    >
      <Handle type="target" position={Position.Left} aria-hidden="true" />
      <span>{data.index}</span>
      <strong>{data.title}</strong>
      <small>{data.note}</small>
      <Handle type="source" position={Position.Right} aria-hidden="true" />
    </div>
  );
}

const s01ConceptNodeTypes = { concept: S01ConceptNode };

function S01ConceptMap({
  scenario,
  onOpen,
}: {
  scenario: S01Scenario;
  onOpen: (id: S01StopId) => void;
}) {
  const nodes: S01ConceptNodeType[] = [
    {
      id: 'question',
      type: 'concept',
      position: { x: 10, y: 152 },
      data: {
        index: '01',
        title: 'Pregunta',
        note: 'qué queremos responder',
        tone: 'question',
        stopId: 'question',
        onOpen,
      },
    },
    {
      id: 'instance',
      type: 'concept',
      position: { x: 220, y: 152 },
      data: {
        index: '02',
        title: 'Instancia',
        note: 'qué representa x',
        tone: 'data',
        stopId: 'instance',
        onOpen,
      },
    },
    {
      id: 'signal',
      type: 'concept',
      position: { x: 430, y: 152 },
      data: {
        index: '03',
        title: 'Señal',
        note: 'qué información guía',
        tone: 'model',
        stopId: 'signal',
        onOpen,
      },
    },
    {
      id: 'task',
      type: 'concept',
      position: { x: 640, y: 152 },
      data: {
        index: '04',
        title: 'Tarea',
        note: 'qué salida pedimos',
        tone: 'model',
        stopId: 'task',
        onOpen,
      },
    },
    {
      id: 'family',
      type: 'concept',
      position: { x: 850, y: 152 },
      data: {
        index: '05',
        title: 'Familia',
        note: 'cómo generaliza',
        tone: 'model',
        stopId: 'family',
        onOpen,
      },
    },
    {
      id: 'domain',
      type: 'concept',
      position: { x: 1060, y: 152 },
      data: {
        index: '06',
        title: 'Dominio',
        note: 'dónde se usará',
        tone: 'data',
        stopId: 'domain',
        onOpen,
      },
    },
    {
      id: 'evidence',
      type: 'concept',
      position: { x: 1270, y: 152 },
      data: {
        index: '07',
        title: 'Evidencia',
        note: 'qué podemos afirmar',
        tone: 'limit',
        stopId: 'evidence',
        onOpen,
      },
    },
    {
      id: 'supervised',
      type: 'concept',
      position: { x: 388, y: 350 },
      data: { index: 'A', title: 'Supervisado', note: 'objetivo por instancia', tone: 'signal' },
    },
    {
      id: 'unsupervised',
      type: 'concept',
      position: { x: 570, y: 350 },
      data: {
        index: 'B',
        title: 'No supervisado',
        note: 'estructura sin etiqueta',
        tone: 'signal',
      },
    },
    {
      id: 'reinforcement',
      type: 'concept',
      position: { x: 752, y: 350 },
      data: { index: 'C', title: 'Por refuerzo', note: 'acción y recompensa', tone: 'signal' },
    },
  ];

  const edges: Edge[] = [
    { id: 'question-instance', source: 'question', target: 'instance', type: 'smoothstep' },
    { id: 'instance-signal', source: 'instance', target: 'signal', type: 'smoothstep' },
    { id: 'signal-task', source: 'signal', target: 'task', type: 'smoothstep' },
    { id: 'task-family', source: 'task', target: 'family', type: 'smoothstep' },
    { id: 'family-domain', source: 'family', target: 'domain', type: 'smoothstep' },
    { id: 'domain-evidence', source: 'domain', target: 'evidence', type: 'smoothstep' },
    { id: 'signal-supervised', source: 'signal', target: 'supervised', type: 'smoothstep' },
    { id: 'signal-unsupervised', source: 'signal', target: 'unsupervised', type: 'smoothstep' },
    { id: 'signal-reinforcement', source: 'signal', target: 'reinforcement', type: 'smoothstep' },
    {
      id: 'evidence-question',
      source: 'evidence',
      target: 'question',
      type: 'smoothstep',
      style: { strokeDasharray: '6 6' },
      label: 'revisar pregunta, datos y uso',
    },
  ];

  return (
    <div className="s01-concept-map" aria-label="Mapa conceptual de la sesión">
      <div className="s01-concept-map__caption">
        <span>La cadena que organiza la sesión</span>
        <strong>{scenario.prompt}</strong>
      </div>
      <div className="s01-concept-map__canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={s01ConceptNodeTypes}
          fitView
          fitViewOptions={{ padding: 0.14, minZoom: 0.55, maxZoom: 1 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          panOnDrag
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch
          proOptions={{ hideAttribution: true }}
          aria-label="Mapa navegable de pregunta, representación, señal, tarea, familia, dominio y evidencia"
        >
          <Background color="rgb(122 150 166 / 0.14)" gap={28} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

function SceneForStop({ stopId, ...props }: SceneProps & { stopId: S01StopId }) {
  switch (stopId) {
    case 'question':
      return <QuestionScene {...props} />;
    case 'instance':
      return <InstanceScene {...props} />;
    case 'signal':
      return <SignalScene {...props} />;
    case 'task':
      return <TaskScene {...props} />;
    case 'family':
      return <FamilyScene {...props} />;
    case 'domain':
      return <DomainScene {...props} />;
    case 'evidence':
      return <EvidenceScene {...props} />;
  }
}

function ActivitiesView({ onOpenStop }: { onOpenStop: (stopId: S01StopId) => void }) {
  const [answers, setAnswers] = useState<Partial<Record<S01ActivityId, string>>>({});
  const completed = s01Activities.filter((activity) => answers[activity.id] !== undefined).length;
  const correct = s01Activities.filter((activity) => {
    const option = activity.options.find((item) => item.id === answers[activity.id]);
    return option?.correct === true;
  }).length;

  function choose(activityId: S01ActivityId, optionId: string) {
    setAnswers((current) => ({ ...current, [activityId]: optionId }));
  }

  return (
    <article className="s01-activities" aria-labelledby="s01-activities-title">
      <header className="s01-activities__hero">
        <div className="s01-activities__intro">
          <p className="eyebrow">Rama alterna · actividades</p>
          <h2 id="s01-activities-title">Prueba las decisiones antes de nombrar el algoritmo</h2>
          <p>
            La ruta principal cuenta la historia. Aquí puedes detenerla en cinco retos breves:
            comparar reglas con aprendizaje, reconocer la señal, ubicar la tarea y acotar una
            afirmación.
          </p>
          <p className="s01-activities__instruction">
            Elige una opción, lee la razón y vuelve a la parada cuando quieras ampliar la idea.
          </p>
        </div>
        <figure className="s01-activities__media">
          <img
            src={withBase('/images/s01/reglas-aprendizaje.png')}
            alt="Una curva de luz se divide en una ruta de reglas explícitas y otra de aprendizaje desde ejemplos"
          />
          <figcaption>
            Ilustración de apoyo: una observación puede abrir rutas de reglas o de aprendizaje.
          </figcaption>
        </figure>
      </header>

      <div className="s01-activities__score" aria-live="polite">
        <div>
          <span className="s01-mini-label">Progreso de la rama</span>
          <strong>
            {correct}/{s01Activities.length} correctas · {completed}/{s01Activities.length}{' '}
            intentadas
          </strong>
        </div>
        <span className="s01-activities__score-track" aria-hidden="true">
          <span style={{ width: `${(completed / s01Activities.length) * 100}%` }} />
        </span>
      </div>

      <ol className="s01-activities__grid">
        {s01Activities.map((activity) => {
          const selectedId = answers[activity.id];
          const selectedOption = activity.options.find((option) => option.id === selectedId);
          const stop = getS01Stop(activity.stopId);
          return (
            <li
              className="s01-activity"
              data-status={selectedOption?.correct ? 'correct' : selectedOption ? 'repair' : 'idle'}
              key={activity.id}
            >
              <article>
                <header className="s01-activity__header">
                  <span>
                    {activity.number} · {activity.kicker}
                  </span>
                  <small>
                    Parada {String(getS01StopIndex(activity.stopId) + 1).padStart(2, '0')}
                  </small>
                </header>
                <h3>{activity.title}</h3>
                <p>{activity.prompt}</p>
                {activity.id === 'levels' && (
                  <TaskAlgorithmTree scenario={getS01Scenario('spectrum')} compact />
                )}
                <div
                  className="s01-activity__options"
                  role="group"
                  aria-label={`Opciones para ${activity.title}`}
                >
                  {activity.options.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      className="s01-activity__option"
                      aria-pressed={selectedId === option.id}
                      data-selected={selectedId === option.id}
                      data-correct={selectedId === option.id && option.correct}
                      onClick={() => choose(activity.id, option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p
                  className="s01-activity__feedback"
                  data-status={
                    selectedOption ? (selectedOption.correct ? 'correct' : 'repair') : 'idle'
                  }
                  aria-live="polite"
                >
                  {selectedOption
                    ? selectedOption.correct
                      ? activity.success
                      : selectedOption.feedback
                    : activity.hint}
                </p>
                <button
                  type="button"
                  className="s01-activity__route-link"
                  onClick={() => onOpenStop(activity.stopId)}
                >
                  Volver a {stop.shortLabel.toLowerCase()} <span aria-hidden="true">→</span>
                </button>
              </article>
            </li>
          );
        })}
      </ol>
    </article>
  );
}

function ReadingView({
  state,
  scenario,
  dispatch,
  onJump,
}: SceneProps & { onJump: (id: S01StopId) => void }) {
  return (
    <article className="s01-reading" aria-labelledby="s01-reading-title">
      <header className="s01-reading__intro">
        <p className="eyebrow">Lectura lineal · siete transformaciones</p>
        <h2 id="s01-reading-title">De una pregunta astronómica a una afirmación con límites</h2>
        <p>
          Sigue una sola ruta y observa cómo cambian la unidad, la representación, la señal, la
          tarea y la evidencia necesaria. Las figuras conservan sus controles: puedes leer de
          corrido o detenerte a explorar.
        </p>
      </header>

      <nav className="s01-reading__toc" aria-label="Contenido de la lectura">
        <ol>
          {s01Stops.map((stop, index) => (
            <li key={stop.id}>
              <button
                type="button"
                aria-label={`${index + 1}. ${stop.title}`}
                onClick={() => onJump(stop.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {stop.shortLabel}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="s01-reading__body">
        {s01Stops.map((stop, index) => {
          const sectionRoute =
            stop.id === 'signal' && state.signalGuess === null
              ? 'Predice la señal en la figura antes de revelar la clasificación de esta ruta.'
              : scenario.route[stop.id];
          return (
            <section
              id={`lectura-${stop.hash}`}
              className="s01-reading__section"
              data-tone={stop.tone}
              data-active={stop.id === state.stopId}
              aria-labelledby={`s01-reading-${stop.id}-title`}
              key={stop.id}
            >
              <div className="s01-reading__copy">
                <p className="s01-mini-label">
                  {String(index + 1).padStart(2, '0')} / {String(s01Stops.length).padStart(2, '0')}{' '}
                  · {scenario.shortLabel}
                </p>
                <p className="s01-reading__arrival">
                  <span>La ruta llega aquí</span>
                  {stop.arrival}
                </p>
                <h2 id={`s01-reading-${stop.id}-title`}>
                  {'focusTitle' in stop ? stop.focusTitle : stop.title}
                </h2>
                <p className="s01-reading__lead">{stop.explanation}</p>
                {'focusSteps' in stop && (
                  <ol className="s01-reading__steps" aria-label="Secuencia conceptual">
                    {stop.focusSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                )}
                <aside className="s01-reading__route" aria-label="Ejemplo de la ruta activa">
                  <span>En la ruta {scenario.label}</span>
                  <p>{sectionRoute}</p>
                </aside>
                <p className="s01-reading__next">
                  <span>Esto nos lleva a</span>
                  {stop.next}
                </p>
                <div className="s01-reading__prompt">
                  <p className="s01-mini-label">Para pensar</p>
                  <p>{stop.tutorPrompt}</p>
                </div>
              </div>

              <figure className="s01-reading__figure">
                <SceneForStop
                  stopId={stop.id}
                  state={state}
                  scenario={scenario}
                  dispatch={dispatch}
                />
                <figcaption>
                  <strong>Idea central:</strong> {stop.expected}
                </figcaption>
              </figure>

              <aside className="s01-reading__caution" aria-label="Error conceptual que vigilar">
                <span>Cuidado</span>
                <p>{stop.misconception}</p>
              </aside>
            </section>
          );
        })}
      </div>
    </article>
  );
}

function Overview({
  scenario,
  onOpen,
}: {
  scenario: S01Scenario;
  onOpen: (id: S01StopId) => void;
}) {
  return (
    <section className="s01-overview" aria-labelledby="s01-overview-title">
      <div className="s01-overview__heading">
        <div>
          <p className="s01-mini-label">Panorama · ruta activa</p>
          <h3 id="s01-overview-title">El árbol completo regresa a la pregunta</h3>
        </div>
        <p>Recorre la cadena principal y abre una parada para volver a la explicación completa.</p>
      </div>
      <S01ConceptMap scenario={scenario} onOpen={onOpen} />
      <ol className="s01-overview__fallback-list" aria-label="Paradas de la sesión">
        {s01Stops.map((stop, index) => (
          <li key={stop.id} data-tone={stop.tone}>
            <button
              type="button"
              aria-label={`Abrir ${index + 1}. ${stop.title} en foco`}
              onClick={() => onOpen(stop.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{stop.title}</strong>
              <small>{scenario.route[stop.id]}</small>
            </button>
          </li>
        ))}
      </ol>
      <div className="s01-overview__return" aria-label="Ciclo de evaluación">
        <span>evaluar</span>
        <span aria-hidden="true">↺</span>
        <span>revisar pregunta, datos y uso</span>
      </div>
    </section>
  );
}

export default function S01LearningJourney() {
  const [state, dispatch] = useReducer(s01JourneyReducer, initialS01JourneyState);
  const [invalidHash, setInvalidHash] = useState(false);
  const [activityResetKey, setActivityResetKey] = useState(0);
  const stopButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const scenario = getS01Scenario(state.scenarioId);
  const activeStop = getS01Stop(state.stopId);
  const activeIndex = getS01StopIndex(state.stopId);
  const routeText =
    state.stopId === 'signal' && state.signalGuess === null
      ? 'Predice la señal disponible para revelar este tramo de la ruta.'
      : scenario.route[state.stopId];
  const cssState = {
    '--s01-index': activeIndex,
    '--s01-progress': `${((activeIndex + 1) / s01Stops.length) * 100}%`,
  } as CSSProperties;

  useEffect(() => {
    function syncLocation() {
      const mode = new URLSearchParams(window.location.search).get('modo');
      const displayMode: S01DisplayMode =
        mode === 'lectura' ? 'reading' : mode === 'actividades' ? 'activities' : 'presentation';
      dispatch({ type: 'set-display-mode', displayMode });
      const rawHash = window.location.hash;
      if (!rawHash) {
        setInvalidHash(false);
        dispatch({ type: 'set-view', view: 'focus' });
        return;
      }
      if (rawHash === '#mapa') {
        setInvalidHash(false);
        dispatch({ type: 'set-view', view: displayMode === 'reading' ? 'focus' : 'overview' });
        return;
      }
      const stopId = getS01StopFromHash(rawHash);
      setInvalidHash(stopId === null);
      if (stopId !== null) {
        dispatch({ type: 'set-stop', stopId });
      } else {
        dispatch({ type: 'set-view', view: 'overview' });
      }
    }

    syncLocation();
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => {
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  }, []);

  function updateHash(hash: string, replace = false) {
    if (replace) {
      window.history.replaceState(null, '', hash);
    } else {
      window.history.pushState(null, '', hash);
    }
    setInvalidHash(false);
  }

  function openStop(stopId: S01StopId, focus = false) {
    dispatch({ type: 'set-stop', stopId });
    updateHash(`#${getS01Stop(stopId).hash}`);
    if (focus) stopButtons.current[getS01StopIndex(stopId)]?.focus();
  }

  function move(delta: -1 | 1) {
    const nextIndex = Math.min(Math.max(activeIndex + delta, 0), s01Stops.length - 1);
    const stop = s01Stops[nextIndex];
    if (stop) openStop(stop.id, true);
  }

  function toggleOverview() {
    dispatch({ type: 'set-view', view: state.view === 'overview' ? 'focus' : 'overview' });
    updateHash(state.view === 'overview' ? `#${activeStop.hash}` : '#mapa');
  }

  function setDisplayMode(displayMode: S01DisplayMode) {
    dispatch({ type: 'set-display-mode', displayMode });
    const url = new URL(window.location.href);
    if (displayMode === 'reading') {
      url.searchParams.set('modo', 'lectura');
      if (url.hash === '#mapa') url.hash = `#${activeStop.hash}`;
    } else if (displayMode === 'activities') {
      url.searchParams.set('modo', 'actividades');
      if (url.hash === '#mapa') url.hash = `#${activeStop.hash}`;
    } else {
      url.searchParams.delete('modo');
    }
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
    if (displayMode === 'reading') {
      window.requestAnimationFrame(() => {
        document.getElementById(`lectura-${activeStop.hash}`)?.scrollIntoView?.({ block: 'start' });
      });
    }
  }

  function openStopInPresentation(stopId: S01StopId) {
    if (state.displayMode !== 'presentation') setDisplayMode('presentation');
    openStop(stopId);
  }

  function jumpReading(stopId: S01StopId) {
    openStop(stopId);
    window.requestAnimationFrame(() => {
      document.getElementById(`lectura-${getS01Stop(stopId).hash}`)?.scrollIntoView?.({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
  }

  function reset() {
    dispatch({ type: 'reset' });
    setActivityResetKey((key) => key + 1);
    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    updateHash(cleanUrl, true);
    stopButtons.current[0]?.focus();
  }

  function handleStopKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = s01Stops[Math.min(index + 1, s01Stops.length - 1)];
      if (next) openStop(next.id, true);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const previous = s01Stops[Math.max(index - 1, 0)];
      if (previous) openStop(previous.id, true);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      openStop('question', true);
    }
    if (event.key === 'End') {
      event.preventDefault();
      openStop('evidence', true);
    }
  }

  return (
    <section
      className="s01-journey"
      data-ready="true"
      data-active-stop={state.stopId}
      data-scenario={state.scenarioId}
      data-view={state.view}
      data-display-mode={state.displayMode}
      style={cssState}
      aria-labelledby="s01-journey-title"
    >
      <div className="s01-journey__header">
        <div>
          <p className="eyebrow">Sesión 1</p>
          <h1 id="s01-journey-title">Una observación va tejiendo el mapa</h1>
          <p>
            {state.displayMode === 'activities'
              ? 'Cinco retos ponen a prueba las decisiones de la ruta.'
              : 'Siete decisiones conectan pregunta, datos, modelo y límites.'}
          </p>
        </div>
        <div className="s01-journey__toggles">
          <div className="s01-display-switch" aria-label="Modo de lectura">
            <button
              type="button"
              aria-pressed={state.displayMode === 'presentation'}
              onClick={() => setDisplayMode('presentation')}
            >
              Presentación
            </button>
            <button
              type="button"
              aria-pressed={state.displayMode === 'reading'}
              onClick={() => setDisplayMode('reading')}
            >
              Lectura
            </button>
            <button
              type="button"
              aria-pressed={state.displayMode === 'activities'}
              onClick={() => setDisplayMode('activities')}
            >
              Actividades
            </button>
          </div>
          {state.displayMode === 'presentation' && (
            <button
              type="button"
              className="s01-overview-toggle"
              aria-pressed={state.view === 'overview'}
              onClick={toggleOverview}
            >
              {state.view === 'overview' ? 'Volver a la diapositiva' : 'Ver mapa completo'}
            </button>
          )}
        </div>
      </div>

      {state.displayMode !== 'activities' && (
        <div className="s01-scenario-picker" aria-label="Ruta astronómica">
          <span>Ruta:</span>
          {s01Scenarios.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={state.scenarioId === item.id}
              onClick={() => dispatch({ type: 'set-scenario', scenarioId: item.id })}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {state.displayMode === 'presentation' && (
        <>
          <div
            className="s01-progress"
            role="progressbar"
            aria-label="Construcción del mapa"
            aria-valuemin={1}
            aria-valuemax={s01Stops.length}
            aria-valuenow={activeIndex + 1}
          >
            <span />
          </div>

          <nav className="s01-thread" aria-label="Paradas de S01">
            <ol>
              {s01Stops.map((stop, index) => (
                <li
                  key={stop.id}
                  data-tone={stop.tone}
                  data-active={stop.id === state.stopId}
                  data-visited={index <= activeIndex}
                >
                  <button
                    ref={(node) => {
                      stopButtons.current[index] = node;
                    }}
                    type="button"
                    aria-current={stop.id === state.stopId ? 'step' : undefined}
                    aria-label={`${index + 1}. ${stop.title}`}
                    onClick={() => openStop(stop.id)}
                    onKeyDown={(event) => handleStopKeyDown(event, index)}
                  >
                    <span className="s01-thread__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="s01-thread__node" aria-hidden="true" />
                    <span>{stop.shortLabel}</span>
                  </button>
                </li>
              ))}
            </ol>
            <span className="s01-thread__traveler" aria-hidden="true" />
          </nav>
        </>
      )}

      {invalidHash && (
        <p className="s01-hash-notice" role="status">
          Ese concepto todavía no existe en S01. Mostramos la parada actual y conservamos el mapa
          útil.
        </p>
      )}

      {state.displayMode === 'activities' ? (
        <ActivitiesView key={activityResetKey} onOpenStop={openStopInPresentation} />
      ) : state.displayMode === 'reading' ? (
        <ReadingView state={state} scenario={scenario} dispatch={dispatch} onJump={jumpReading} />
      ) : state.view === 'overview' ? (
        <Overview scenario={scenario} onOpen={openStop} />
      ) : (
        <div className="s01-workspace">
          <div className="s01-scene-deck">
            <SceneForStop
              stopId={state.stopId}
              state={state}
              scenario={scenario}
              dispatch={dispatch}
            />
          </div>

          <aside
            className="s01-focus"
            data-tone={activeStop.tone}
            aria-labelledby="s01-focus-title"
          >
            <div className="s01-focus__counter" aria-hidden="true">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <small>/ {String(s01Stops.length).padStart(2, '0')}</small>
            </div>
            <p className="s01-mini-label">
              {scenario.shortLabel} · parada {activeIndex + 1}
            </p>
            <p className="s01-focus__arrival">
              <span>Llega aquí</span>
              {activeStop.arrivalShort}
            </p>
            <h3 id="s01-focus-title" tabIndex={-1}>
              {'focusTitle' in activeStop ? activeStop.focusTitle : activeStop.title}
            </h3>
            <p className="s01-focus__explanation">{activeStop.explanation}</p>
            {'focusSteps' in activeStop && (
              <ol className="s01-focus__steps" aria-label="Secuencia de esta parada">
                {activeStop.focusSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
            <details className="s01-focus__depth">
              <summary>Ver una respuesta orientadora</summary>
              <div>
                <p>{activeStop.expected}</p>
              </div>
            </details>
            <div className="s01-route-card">
              <span>En la ruta {scenario.label}</span>
              <p>{routeText}</p>
            </div>
            <p className="s01-focus__next">
              <span>Sigue hacia</span>
              {activeStop.nextShort}
            </p>
          </aside>
        </div>
      )}

      <div className="s01-journey__footer">
        <p className="s01-state-summary" aria-live="polite">
          {state.displayMode === 'activities'
            ? `Rama de actividades. ${s01Activities.length} retos breves; elige una respuesta y vuelve a la parada correspondiente.`
            : `Modo ${state.displayMode === 'reading' ? 'lectura lineal' : 'presentación'}. Parada ${activeIndex + 1} de ${s01Stops.length}: ${activeStop.title}. Ruta ${scenario.label}.`}
        </p>
        <div className="s01-journey__actions" aria-label="Controles del recorrido">
          {state.displayMode === 'presentation' ? (
            <>
              <button
                type="button"
                onClick={() => move(-1)}
                disabled={activeIndex === 0 || state.view === 'overview'}
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                disabled={activeIndex === s01Stops.length - 1 || state.view === 'overview'}
              >
                Siguiente →
              </button>
            </>
          ) : state.displayMode === 'reading' ? (
            <button
              type="button"
              onClick={() => document.getElementById('s01-reading-title')?.scrollIntoView?.()}
            >
              ↑ Volver al inicio
            </button>
          ) : (
            <button type="button" onClick={() => setDisplayMode('presentation')}>
              ← Volver al recorrido
            </button>
          )}
          <button type="button" className="s01-reset" onClick={reset}>
            Reiniciar
          </button>
        </div>
      </div>

      <noscript>
        <p>La lectura lineal completa continúa debajo de este instrumento.</p>
      </noscript>
    </section>
  );
}
