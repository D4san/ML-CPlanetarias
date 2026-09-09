import { useState } from 'react';

import {
  getS01Scenario,
  getS01Stop,
  getS01StopIndex,
  s01Activities,
  type S01ActivityId,
  type S01StopId,
} from '../../../lib/s01-journey';
import { withBase } from '../../../lib/urls';
import { TaskAlgorithmTree } from './TaskScene';

export interface ActivitiesViewProps {
  onOpenStop: (stopId: S01StopId) => void;
}

export function ActivitiesView({ onOpenStop }: ActivitiesViewProps) {
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
