import {
  s01Stops,
  type S01JourneyAction,
  type S01JourneyState,
  type S01Scenario,
  type S01StopId,
} from '../../../lib/s01-journey';
import type { Dispatch } from 'react';
import { SessionBibliography, TeacherPrompt } from '../S01Pilot';
import { SceneForStop } from './SceneForStop';

export interface ReadingViewProps {
  state: S01JourneyState;
  scenario: S01Scenario;
  dispatch: Dispatch<S01JourneyAction>;
  onJump: (id: S01StopId) => void;
}

export function ReadingView({ state, scenario, dispatch, onJump }: ReadingViewProps) {
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

      <SessionBibliography />
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
                <TeacherPrompt stop={stop} />
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
