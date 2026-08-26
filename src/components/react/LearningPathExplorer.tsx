import { useRef, useState, type KeyboardEvent } from 'react';

import {
  getProgress,
  getStage,
  getStageIndex,
  learningStages,
  moveStage,
  type LearningStageId,
} from '../../lib/learning-path';
import './learning-path-explorer.css';

export default function LearningPathExplorer() {
  const [activeId, setActiveId] = useState<LearningStageId>('question');
  const stageButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStage = getStage(activeId);
  const activeIndex = getStageIndex(activeId);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === learningStages.length - 1;

  function selectIndex(index: number) {
    const stage = learningStages[index];
    if (!stage) return;
    setActiveId(stage.id);
    stageButtons.current[index]?.focus();
  }

  function handleStageKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      selectIndex(Math.min(index + 1, learningStages.length - 1));
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectIndex(Math.max(index - 1, 0));
    }
    if (event.key === 'Home') {
      event.preventDefault();
      selectIndex(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      selectIndex(learningStages.length - 1);
    }
  }

  function move(delta: -1 | 1) {
    const nextStage = moveStage(activeId, delta);
    setActiveId(nextStage.id);
    stageButtons.current[getStageIndex(nextStage.id)]?.focus();
  }

  return (
    <section
      className="path-explorer"
      aria-labelledby="path-explorer-title"
      data-active-stage={activeId}
      data-ready="true"
    >
      <div className="path-explorer__heading">
        <div>
          <span className="eyebrow">Instrumento 01</span>
          <h2 id="path-explorer-title">No empieces por el algoritmo</h2>
        </div>
        <p>
          Recorre la cadena. Cada nodo abre la decisión que un tutor debe poder justificar antes de
          continuar.
        </p>
      </div>

      <div
        className="path-explorer__progress"
        role="progressbar"
        aria-label="Progreso en la cadena pedagógica"
        aria-valuemin={1}
        aria-valuemax={learningStages.length}
        aria-valuenow={activeIndex + 1}
      >
        <span style={{ width: `${getProgress(activeId)}%` }} />
      </div>

      <nav className="path-explorer__rail" aria-label="Etapas de una sesión MLCP">
        <ol>
          {learningStages.map((stage, index) => {
            const active = stage.id === activeId;
            const visited = index <= activeIndex;
            return (
              <li
                key={stage.id}
                className="path-stage"
                data-tone={stage.tone}
                data-active={active}
                data-visited={visited}
              >
                <button
                  ref={(node) => {
                    stageButtons.current[index] = node;
                  }}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${index + 1}. ${stage.title}`}
                  onClick={() => setActiveId(stage.id)}
                  onKeyDown={(event) => handleStageKeyDown(event, index)}
                >
                  <span className="path-stage__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="path-stage__dot" aria-hidden="true" />
                  <span className="path-stage__label">{stage.shortLabel}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="path-explorer__detail" data-tone={activeStage.tone}>
        <div className="path-explorer__counter" aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <small>/ {String(learningStages.length).padStart(2, '0')}</small>
        </div>
        <div className="path-explorer__copy">
          <p className="path-explorer__state" aria-live="polite">
            Etapa {activeIndex + 1} de {learningStages.length}
          </p>
          <h3>{activeStage.title}</h3>
          <p>{activeStage.explanation}</p>
          <blockquote>
            <span>Pregunta para transferir</span>
            {activeStage.tutorPrompt}
          </blockquote>
        </div>
        <div className="path-explorer__actions" aria-label="Controles del explorador">
          <button type="button" onClick={() => move(-1)} disabled={isFirst}>
            <span aria-hidden="true">←</span> Anterior
          </button>
          <button type="button" onClick={() => move(1)} disabled={isLast}>
            Siguiente <span aria-hidden="true">→</span>
          </button>
          <button
            className="path-explorer__reset"
            type="button"
            onClick={() => setActiveId('question')}
            disabled={isFirst}
          >
            Reiniciar
          </button>
        </div>
      </div>

      <noscript>
        <p className="path-explorer__noscript">
          La secuencia completa continúa debajo de esta figura. Activa JavaScript solo si quieres
          explorar cada nodo.
        </p>
      </noscript>
    </section>
  );
}
