import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';

import {
  s01Lenses,
  s01Outcomes,
  type S01LensId,
  type S01OutcomeId,
} from '../../../lib/s01-journey';
import {
  DefinitionCardDialog,
  DirectDefinitions,
  focusDefinition,
  useCourseConfig,
} from '../S01Pilot';
import type { QuestionSceneProps } from './scene-types';

export function QuestionScene({ state, dispatch, part }: QuestionSceneProps) {
  const direct = useCourseConfig().interactionMode === 'direct';
  const arrowId = useId();
  const lens =
    s01Lenses.find((item) => item.id === state.lensId) ??
    s01Lenses.find((item) => item.id === 'ml')!;
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<S01OutcomeId | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const outcomeButtons = useRef<Partial<Record<S01OutcomeId, HTMLButtonElement | null>>>({});
  const selectedOutcome = s01Outcomes.find((item) => item.id === selectedOutcomeId) ?? null;

  useEffect(() => {
    if (selectedOutcomeId !== null) flipButtonRef.current?.focus();
  }, [selectedOutcomeId]);

  function openOutcome(outcomeId: S01OutcomeId) {
    if (direct) return focusDefinition('outcome', outcomeId);
    setDefinitionVisible(false);
    setSelectedOutcomeId(outcomeId);
  }

  function closeOutcome() {
    if (selectedOutcomeId !== null) outcomeButtons.current[selectedOutcomeId]?.focus();
    setDefinitionVisible(false);
    setSelectedOutcomeId(null);
  }

  return (
    <section
      className="s01-scene s01-scene--question"
      data-part={part}
      aria-label="Pregunta y disciplinas"
    >
      {part !== 'interaction' && (
        <div className="s01-scene__graphic">
          <header className="s01-question-map__intro">
            <p className="s01-mini-label">Primero · elige la forma de la salida</p>
            <h4 id="s01-question-map-title">¿Qué podemos hacer con una observación?</h4>
            <p>
              {direct
                ? 'El verbo fija qué queremos obtener. Las definiciones están debajo del mapa.'
                : 'El verbo fija qué queremos obtener. Abre uno para anticipar su significado.'}
            </p>
          </header>
          <div className="s01-question-map" role="group" aria-label="Cinco usos de una observación">
            <svg viewBox="0 0 720 390" aria-hidden="true" focusable="false">
              <defs>
                <marker
                  id={arrowId}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <polygon points="1,1 9,5 1,9" fill="var(--data-soft)" />
                </marker>
              </defs>
              <g className="s01-orbit-lines" markerEnd={`url(#${arrowId})`}>
                <path d="M292 138 C235 91 184 62 120 62" />
                <path d="M272 186 C230 174 175 170 120 172" />
                <path d="M282 235 C225 261 170 276 120 281" />
                <path d="M430 141 C487 99 550 78 602 78" />
                <path d="M438 235 C500 268 552 286 605 293" />
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
                  aria-label={`${outcome.label}. ${direct ? 'Ir a definición' : 'Abrir tarjeta'}`}
                  aria-pressed={selectedOutcomeId === outcome.id}
                  onClick={() => openOutcome(outcome.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{outcome.label}</strong>
                </button>
              );
            })}
          </div>

          {direct && <DirectDefinitions prefix="outcome" items={s01Outcomes} />}
          {!direct && selectedOutcome !== null && (
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
      )}
      {part !== 'graphic' && (
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
          <p className="s01-pilot-caution">
            Tres lentes sobre un mismo problema; este orden no representa una jerarquía de
            inclusión.
          </p>
        </div>
      )}
    </section>
  );
}
