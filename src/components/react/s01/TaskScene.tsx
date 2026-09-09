import { useEffect, useRef, useState } from 'react';

import {
  s01TaskAlgorithmBranches,
  s01TaskDefinitions,
  type S01Scenario,
  type S01TaskId,
} from '../../../lib/s01-journey';
import {
  DefinitionCardDialog,
  DirectDefinitions,
  focusDefinition,
  useCourseConfig,
} from '../S01Pilot';
import { paradigmDescriptions } from './scene-data';
import type { TaskSceneProps } from './scene-types';

export function TaskAlgorithmTree({
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

export function TaskLevelsGuide({ scenario }: { scenario: S01Scenario }) {
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

export function TaskScene({ scenario, part }: TaskSceneProps) {
  const direct = useCourseConfig().interactionMode === 'direct';
  const showGraphic = part !== 'interaction';
  const showInteraction = part !== 'graphic';
  const [selectedTaskId, setSelectedTaskId] = useState<S01TaskId | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const taskButtons = useRef<Partial<Record<S01TaskId, HTMLButtonElement | null>>>({});
  const selectedTask = s01TaskDefinitions.find((item) => item.id === selectedTaskId) ?? null;

  useEffect(() => {
    if (selectedTaskId !== null) flipButtonRef.current?.focus();
  }, [selectedTaskId]);

  function openTask(taskId: S01TaskId) {
    if (direct) return focusDefinition('task', taskId);
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
      {showGraphic && (
        <div className="s01-scene__graphic">
          <header className="s01-graphic-intro">
            <p className="s01-mini-label">De la señal a la tarea</p>
            <h4>La pregunta determina la forma de la salida</h4>
            <p>
              La ruta activa resalta una posibilidad; el mismo dato admite otras preguntas. Abre
              cada salida para ver qué pregunta responde y qué límite conserva.
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

          {direct && <DirectDefinitions prefix="task" items={s01TaskDefinitions} />}
          {!direct && selectedTask !== null && (
            <DefinitionCardDialog
              item={selectedTask}
              definitionVisible={definitionVisible}
              flipButtonRef={flipButtonRef}
              onFlip={() => setDefinitionVisible((visible) => !visible)}
              onClose={closeTask}
            />
          )}
        </div>
      )}
      {showInteraction && <TaskLevelsGuide scenario={scenario} />}
    </section>
  );
}
