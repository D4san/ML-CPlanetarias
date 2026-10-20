import { useCallback, useEffect, useState } from 'react';
import { courseConfig } from '../../../config/course.config';
import { resolveSessionSettings } from '../../lib/course-config';
import { S03_BIBLIOGRAPHY, S03_SCREENS, S03_STATIONS, type S03Screen } from '../../lib/s03-content';
import { s03Book } from '../../lib/s03-reading';
import { withBase } from '../../lib/urls';
import { BookInstrument, BookReading } from './BookReading';
import { SessionOpening } from './SessionOpening';
import { SessionNavigationControls } from './SessionNavigationControls';
import { SessionPresentationFooter } from './SessionPresentationFooter';
import SlideRail from './SlideRail';
import S03ScienceScenes from './s03/S03ScienceScenes';
import S03EvaluationScenes from './s03/S03EvaluationScenes';
import S03TransitAnimation from './s03/S03TransitAnimation';
import S03TransitGeometry from './s03/S03TransitGeometry';
import S03TransitInference from './s03/S03TransitInference';
import S03ContextHelp from './s03/S03ContextHelp';
import './session-presentation.css';
import './s03-learning-journey.css';

type View = 'presentation' | 'reading' | 'activities';
const settings = resolveSessionSettings(courseConfig, 'S03');
const evaluationIds = new Set([
  'evaluation-split',
  'confusion-matrix',
  'confusion-cases',
  'metric-accuracy',
  'metric-error',
  'metric-precision',
  'metric-recall',
  'metric-specificity',
  'metric-fpr',
  'metric-f1',
  'threshold',
  'pr',
  'roc',
  'auc',
]);
const stationTones = {
  transit: 'data',
  mission: 'data',
  lookalikes: 'data',
  classification: 'model',
  representation: 'model',
  errors: 'decision',
  metrics: 'decision',
  thresholds: 'decision',
  results: 'limit',
} as const;
function unitHash(screen: S03Screen) {
  return screen.role === 'opening'
    ? 'portada'
    : screen.role === 'references'
      ? 'bibliografia'
      : screen.id;
}

function readableHash(hash: string) {
  try {
    return decodeURIComponent(hash);
  } catch {
    return '';
  }
}

function chapterForUnit(id: string) {
  const screen = S03_SCREENS.find((item) => item.id === id || item.sceneId === id);
  const stationIndex = S03_STATIONS.findIndex((station) => station.id === screen?.stationId);
  return s03Book.chapters[Math.max(0, stationIndex)]?.id ?? s03Book.chapters[0]!.id;
}

function unitForChapter(chapterId: string) {
  const index = s03Book.chapters.findIndex((chapter) => chapter.id === chapterId);
  const station = S03_STATIONS[index];
  return (
    S03_SCREENS.find((screen) => screen.stationId === station?.id && screen.role === 'content') ??
    S03_SCREENS[1]!
  );
}

function References() {
  return (
    <section className="s03-references" aria-label="Referencias de S03">
      <p>
        Fuentes científicas y metodológicas. Los ejemplos de matriz y puntajes son didácticos; no se
        entrenó una CNN en esta sesión.
      </p>
      <ol>
        {S03_BIBLIOGRAPHY.map((source) => (
          <li key={source.id}>
            <a href={source.href} target="_blank" rel="noreferrer">
              {source.label}
            </a>
            <p>{source.location}</p>
          </li>
        ))}
      </ol>
      <p>
        Las Figuras 3, 6, 8, 10 y 11 incluyen cita visible y enlace a su versión original. Activa
        cualquier imagen para leerla completa.
      </p>
    </section>
  );
}

export function S03Scene({ screen }: { screen: S03Screen }) {
  if (screen.role === 'opening') return <SessionOpening session="S03" />;
  if (screen.role === 'references') return <References />;
  const scene =
    screen.sceneId === 'transit-animation' ? (
      <S03TransitAnimation />
    ) : screen.sceneId === 'transit-geometry' ? (
      <S03TransitGeometry />
    ) : screen.sceneId === 'transit-inference' ? (
      <S03TransitInference />
    ) : evaluationIds.has(screen.sceneId) ? (
      <S03EvaluationScenes sceneId={screen.sceneId} />
    ) : (
      <S03ScienceScenes sceneId={screen.sceneId} />
    );
  return (
    <>
      <S03ContextHelp sceneId={screen.sceneId} />
      {scene}
    </>
  );
}

export default function S03LearningJourney() {
  const [activeId, setActiveId] = useState<string>(S03_SCREENS[0]!.id);
  const [view, setView] = useState<View>(settings.defaultView);
  const [teacherMode, setTeacherMode] = useState(settings.teacherMode);
  useEffect(() => {
    const sync = () => {
      const url = new URL(window.location.href);
      const hash = readableHash(url.hash.slice(1));
      const screen = S03_SCREENS.find((item) => item.id === hash || unitHash(item) === hash);
      const chapterId = hash.replace(/^s03-reading-/, '');
      const chapter = s03Book.chapters.find((item) => item.id === chapterId);
      setActiveId(screen?.id ?? (chapter ? unitForChapter(chapter.id).id : S03_SCREENS[0]!.id));
      const mode = url.searchParams.get('modo');
      setView(
        mode === 'lectura'
          ? 'reading'
          : mode === 'actividades'
            ? 'activities'
            : settings.defaultView,
      );
    };
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);
  const index = Math.max(
    0,
    S03_SCREENS.findIndex((screen) => screen.id === activeId),
  );
  const screen = S03_SCREENS[index]!;
  const stationIndex = S03_STATIONS.findIndex((station) => station.id === screen.stationId);
  const parts = S03_SCREENS.filter(
    (item) => item.stationId === screen.stationId && item.role === 'content',
  );
  const partIndex = parts.findIndex((part) => part.id === screen.id);
  function setLocation(next: S03Screen, mode: View = view, replace = false) {
    const url = new URL(window.location.href);
    if (mode === 'presentation') url.searchParams.delete('modo');
    else url.searchParams.set('modo', mode === 'reading' ? 'lectura' : 'actividades');
    url.hash =
      mode === 'reading' && next.role === 'content'
        ? `s03-reading-${chapterForUnit(next.id)}`
        : unitHash(next);
    window.history[replace ? 'replaceState' : 'pushState']({}, '', url);
    setActiveId(next.id);
    setView(mode);
  }
  function moveTo(i: number) {
    setLocation(S03_SCREENS[Math.max(0, Math.min(S03_SCREENS.length - 1, i))]!);
  }
  function changeView(next: View) {
    setLocation(screen, next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  const visibleChapter = useCallback((id: string) => {
    setActiveId((current) => (chapterForUnit(current) === id ? current : unitForChapter(id).id));
  }, []);
  const slides = S03_SCREENS.map((item) => ({
    ...item,
    partLabel: item.title,
    groupLabel:
      S03_STATIONS.find((station) => station.id === item.stationId)?.shortTitle ??
      (item.role === 'opening' ? 'Inicio' : 'Fuentes'),
    tone:
      item.role === 'opening'
        ? ('question' as const)
        : item.role === 'references'
          ? ('transfer' as const)
          : stationTones[item.stationId as keyof typeof stationTones],
    partIndex: S03_SCREENS.filter(
      (part) => part.stationId === item.stationId && part.role === 'content',
    ).findIndex((part) => part.id === item.id),
    partLabels: S03_SCREENS.filter(
      (part) => part.stationId === item.stationId && part.role === 'content',
    ).map((part) => part.title),
  }));
  const sessionHeader = (
    <header className="s03-header">
      <div>
        <p className="s03-course-label">ML Ciencias Planetarias · S03</p>
        <h1 className="session-presentation__title" id="s03-title">
          De un tránsito a las métricas
        </h1>
        <p className="s03-question">
          ¿Cómo pasa una caída de luz a ser una señal que merece seguimiento?
        </p>
      </div>
      <div className="s03-header__actions">
        <div className="s03-mode-switch" role="group" aria-label="Modo de visualización">
          {(
            [
              ['presentation', 'Presentación'],
              ['reading', 'Lectura'],
              ['activities', 'Actividades'],
            ] as const
          ).map(([id, title]) => (
            <button
              key={id}
              type="button"
              aria-pressed={view === id}
              onClick={() => changeView(id)}
            >
              {title}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setLocation(S03_SCREENS[S03_SCREENS.length - 1]!, 'presentation')}
        >
          Referencias
        </button>
        <button
          type="button"
          aria-pressed={teacherMode}
          onClick={() => setTeacherMode(!teacherMode)}
        >
          Modo docente
        </button>
        <a href={withBase('/sesiones/')}>Sesiones</a>
      </div>
    </header>
  );
  const sessionRail = (
    <SlideRail
      slides={slides}
      activeIndex={index}
      activeLabel={screen.title}
      ariaLabel="Recorrido de diapositivas S03"
      progressLabel="Avance de la sesión 03"
      visibleCount={5}
      compactCaption
      className="slide-rail--session-presentation"
      onSelect={(_item, i) => moveTo(i)}
      getIndexLabel={(item) =>
        item.role === 'opening'
          ? '0'
          : item.role === 'references'
            ? 'Ref.'
            : `${S03_STATIONS.findIndex((station) => station.id === item.stationId) + 1}.${(item.partIndex ?? 0) + 1}`
      }
    />
  );
  return (
    <section
      className="session-presentation s03-journey"
      data-display-mode={view}
      data-slide-role={screen.role}
      data-active-slide={index}
      data-slide-count={S03_SCREENS.length}
      data-ready="true"
      aria-label="Recorrido didáctico de S03"
    >
      {view === 'presentation' ? (
        <details className="s03-navigation-disclosure">
          <summary
            aria-label={`De un tránsito a las métricas. Diapositiva ${index + 1} de ${S03_SCREENS.length}. Mostrar u ocultar navegación`}
            aria-controls="s03-navigation-content"
          >
            <span className="s03-navigation-disclosure__title">De un tránsito a las métricas</span>
            <span className="s03-navigation-disclosure__count" aria-hidden="true">
              {index + 1} / {S03_SCREENS.length}
            </span>
            <span className="s03-navigation-disclosure__toggle" aria-hidden="true">
              <span className="s03-navigation-disclosure__show">Desplegar</span>
              <span className="s03-navigation-disclosure__hide">Contraer</span>
              <svg viewBox="0 0 20 20" focusable="false">
                <path d="m5 7.5 5 5 5-5" />
              </svg>
            </span>
          </summary>
          <div className="s03-navigation-disclosure__content" id="s03-navigation-content">
            {sessionHeader}
            {sessionRail}
          </div>
        </details>
      ) : (
        sessionHeader
      )}
      {view === 'presentation' && (
        <>
          <article
            key={screen.id}
            className="s03-slide"
            aria-labelledby={screen.role === 'opening' ? 'S03-opening-title' : 's03-screen-title'}
          >
            {screen.role !== 'opening' && (
              <header className="s03-slide__heading">
                <div>
                  <p className="s03-slide__eyebrow">
                    {screen.role === 'references'
                      ? 'Fuentes y procedencia'
                      : `Estación ${stationIndex + 1} · Parte ${partIndex + 1} de ${parts.length}`}
                  </p>
                  <h2 id="s03-screen-title" tabIndex={-1}>
                    {screen.title}
                  </h2>
                  <p>{screen.intro}</p>
                </div>
                <span className="s03-part-number">
                  {screen.role === 'references' ? 'Ref.' : `${stationIndex + 1}.${partIndex + 1}`}
                </span>
              </header>
            )}
            <div className="s03-scene" key={screen.id}>
              <S03Scene screen={screen} />
            </div>
            {screen.role === 'content' && (
              <aside className="s03-source-line">
                {screen.sourceIds.map((id) => {
                  const source = S03_BIBLIOGRAPHY.find((item) => item.id === id);
                  return source ? (
                    <a key={id} href={source.href} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  ) : null;
                })}
              </aside>
            )}
            {teacherMode && screen.role === 'content' && (
              <aside className="s03-teacher">
                <strong>Para conversar.</strong>{' '}
                {s03Book.chapters[Math.max(0, stationIndex)]?.question}
              </aside>
            )}
          </article>
        </>
      )}
      {view === 'reading' && (
        <BookReading
          book={s03Book}
          activeUnitId={screen.id}
          chapterForUnit={chapterForUnit}
          anchorForChapter={(id) => `s03-reading-${id}`}
          hashForChapter={(id) => `#s03-reading-${id}`}
          onNavigate={(id) => setLocation(unitForChapter(id), 'reading')}
          onVisibleChapter={visibleChapter}
          onReferencesVisible={() => setActiveId(S03_SCREENS[S03_SCREENS.length - 1]!.id)}
          renderInstruments={(chapter) => {
            const first = unitForChapter(chapter.id);
            return S03_SCREENS.filter(
              (item) => item.role === 'content' && item.stationId === first.stationId,
            ).map((item) => (
              <BookInstrument
                key={item.id}
                title={item.title}
                prompt={item.takeaway}
                interpretation={item.summary}
              >
                <S03Scene screen={item} />
              </BookInstrument>
            ));
          }}
          references={<References />}
        />
      )}
      {view === 'activities' && (
        <section className="s03-activities" aria-labelledby="s03-activities-title">
          <h2 id="s03-activities-title">Decidir y justificar</h2>
          <p>
            Práctica con datos ficticios: anticipa la respuesta y compruébala con los diagramas.
            Cambiar de vista no guarda respuestas.
          </p>
          <h3>1. Reconstruye las cuatro celdas</h3>
          <S03EvaluationScenes sceneId="confusion-cases" />
          <h3>2. Compara dos umbrales</h3>
          <p>
            Antes de mover el corte, predice qué ocurrirá con PC recuperadas y señales enviadas a
            revisión.
          </p>
          <S03EvaluationScenes sceneId="threshold" />
          <h3>3. Comunica la decisión</h3>
          <p>
            ¿Qué criterio elegirías para búsqueda amplia y para seguimiento limitado? Explica el
            denominador de cada métrica y qué evidencia faltaría para validar un planeta.
          </p>
          <details>
            <summary>Ver razonamiento</summary>
            <p>
              Un umbral más bajo puede recuperar más PC de referencia y sumar falsas alertas. Un
              umbral más alto puede reducir revisión y perder candidatos. La elección necesita
              capacidad de seguimiento y evaluación reservada; el ejercicio de seis señales no fija
              un umbral científico.
            </p>
          </details>
        </section>
      )}
      <SessionPresentationFooter
        summary={
          screen.role === 'opening'
            ? 'Prototipo interno · 9 estaciones · 33 pantallas · revisión editorial pendiente'
            : `${screen.title} · ${index + 1} de ${S03_SCREENS.length}`
        }
      >
        <button
          type="button"
          onClick={() => {
            setLocation(S03_SCREENS[0]!);
            window.scrollTo({ top: 0, behavior: 'auto' });
          }}
        >
          Reiniciar
        </button>
        {view === 'presentation' ? (
          <SessionNavigationControls
            index={index}
            count={S03_SCREENS.length}
            onMove={(delta) => moveTo(index + delta)}
          />
        ) : (
          <button type="button" onClick={() => changeView('presentation')}>
            Volver a Presentación
          </button>
        )}
      </SessionPresentationFooter>
    </section>
  );
}
