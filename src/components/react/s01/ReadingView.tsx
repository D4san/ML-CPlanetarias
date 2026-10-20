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
import { BookInstrument, BookReading } from '../BookReading';
import { s01Book } from '../../../lib/s01-reading';

export interface ReadingViewProps {
  state: S01JourneyState;
  scenario: S01Scenario;
  dispatch: Dispatch<S01JourneyAction>;
  onJump: (id: S01StopId) => void;
  onVisibleChapter: (id: S01StopId) => void;
  bibliography: boolean;
  onReferencesVisible: () => void;
}

export function ReadingView({
  state,
  scenario,
  dispatch,
  onJump,
  onVisibleChapter,
  bibliography,
  onReferencesVisible,
}: ReadingViewProps) {
  return (
    <BookReading
      book={s01Book}
      activeUnitId={bibliography ? 'references' : state.stopId}
      anchorForChapter={(id) =>
        id === 'references'
          ? 's01-book-references'
          : `lectura-${s01Stops.find((stop) => stop.id === id)!.hash}`
      }
      hashForChapter={(id) => `#${s01Stops.find((stop) => stop.id === id)!.hash}`}
      onNavigate={(id) => onJump(id as S01StopId)}
      onVisibleChapter={(id) => onVisibleChapter(id as S01StopId)}
      onReferencesVisible={onReferencesVisible}
      renderContext={(chapter) => {
        const stop = s01Stops.find((item) => item.id === chapter.id)!;
        return (
          <>
            <aside className="book-reading__context" aria-label="Aplicación a la ruta elegida">
              <strong>En la ruta {scenario.label}</strong>
              <p>
                {stop.id === 'signal' && state.signalGuess === null
                  ? 'Anticipa qué señal guía el ajuste; contrasta tu respuesta con el argumento del capítulo y después explora la figura.'
                  : scenario.route[stop.id]}
              </p>
            </aside>
            <p>
              <strong>Precaución.</strong> {stop.repair}
            </p>
            <TeacherPrompt stop={stop} />
          </>
        );
      }}
      renderInstruments={(chapter) => {
        const stop = s01Stops.find((item) => item.id === chapter.id)!;
        return (
          <BookInstrument
            title={stop.title}
            prompt={stop.tutorPrompt}
            interpretation={stop.expected}
          >
            <SceneForStop stopId={stop.id} state={state} scenario={scenario} dispatch={dispatch} />
          </BookInstrument>
        );
      }}
      references={<SessionBibliography />}
    />
  );
}
