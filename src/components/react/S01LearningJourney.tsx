import { useEffect, useReducer, useState, type CSSProperties } from 'react';

import {
  getS01Scenario,
  getS01Stop,
  getS01StopIndex,
  initialS01JourneyState,
  s01JourneyReducer,
  s01Stops,
  type S01DisplayMode,
  type S01ScenarioId,
  type S01StopId,
} from '../../lib/s01-journey';
import { courseConfig } from '../../../config/course.config';
import { defineCourseConfig, type CourseConfig } from '../../lib/course-config';
import {
  getS01Parts,
  getS01SlideHash,
  getS01SlideIndex,
  moveS01Slide,
  parseS01SlideHash,
  s01Slides,
  type S01Slide,
} from '../../lib/s01-slides';
import { CourseContext, SessionBibliography, TeacherPrompt, useCourseConfig } from './S01Pilot';
import { ActivitiesView } from './s01/ActivitiesView';
import { Overview } from './s01/Overview';
import { ReadingView } from './s01/ReadingView';
import { SceneForStop } from './s01/SceneForStop';
import { S01Navigation } from './s01/S01Navigation';
import './s01-learning-journey.css';
import './s01-pilot.css';
import './session-presentation.css';

const s01HistoryStateKey = '__mlcpS01';

type S01HistoryState = {
  [s01HistoryStateKey]?: { routeId?: string };
};

export default function S01LearningJourney({ config = courseConfig }: { config?: CourseConfig }) {
  const settings = defineCourseConfig(config);
  return (
    <CourseContext.Provider value={settings}>
      <S01JourneyContent />
    </CourseContext.Provider>
  );
}

function S01JourneyContent() {
  const config = useCourseConfig();
  const defaultRouteId = config.s01.defaultRouteId ?? 'spectrum';
  const [state, dispatch] = useReducer(s01JourneyReducer, {
    ...initialS01JourneyState,
    displayMode: config.defaultView,
    scenarioId: defaultRouteId,
  });
  const [partIndex, setPartIndex] = useState(0);
  const [bibliography, setBibliography] = useState(true);
  const [invalidHash, setInvalidHash] = useState(false);
  const [activityResetKey, setActivityResetKey] = useState(0);
  const scenario = getS01Scenario(state.scenarioId);
  const activeStop = getS01Stop(state.stopId);
  const activeIndex = getS01StopIndex(state.stopId);
  const parts = getS01Parts(state.stopId);
  const pilot = parts.length > 1;
  const activeSlideIndex = bibliography ? 0 : getS01SlideIndex(state.stopId, partIndex);
  const availableScenarios = config.s01.enabledRouteIds.map(getS01Scenario);
  const routeText =
    state.stopId === 'signal' && state.signalGuess === null
      ? 'Predice la señal disponible para revelar este tramo de la ruta.'
      : scenario.route[state.stopId];
  const cssState = {
    '--s01-index': activeIndex,
  } as CSSProperties;

  function historyStateForRoute(routeId: string): S01HistoryState {
    const current = window.history.state;
    const base = current && typeof current === 'object' ? current : {};
    return { ...base, [s01HistoryStateKey]: { routeId } };
  }

  useEffect(() => {
    function syncLocation() {
      const historyState = window.history.state as S01HistoryState | null;
      const historyRouteId = historyState?.[s01HistoryStateKey]?.routeId;
      const routeId = config.s01.enabledRouteIds.includes(
        historyRouteId as (typeof config.s01.enabledRouteIds)[number],
      )
        ? (historyRouteId as (typeof config.s01.enabledRouteIds)[number])
        : defaultRouteId;
      const mode = new URLSearchParams(window.location.search).get('modo');
      const displayMode: S01DisplayMode =
        mode === 'lectura'
          ? 'reading'
          : mode === 'actividades'
            ? 'activities'
            : mode === 'presentacion'
              ? 'presentation'
              : config.defaultView;
      dispatch({ type: 'set-display-mode', displayMode });
      const rawHash = window.location.hash;
      if (!rawHash || rawHash === '#bibliografia') {
        setBibliography(true);
        setPartIndex(0);
        dispatch({ type: 'set-scenario', scenarioId: routeId });
        dispatch({ type: 'set-stop', stopId: 'question' });
        setInvalidHash(false);
        dispatch({ type: 'set-view', view: 'focus' });
        return;
      }
      setBibliography(false);
      if (rawHash === '#mapa') {
        dispatch({ type: 'set-scenario', scenarioId: routeId });
        setInvalidHash(false);
        dispatch({ type: 'set-view', view: displayMode === 'reading' ? 'focus' : 'overview' });
        return;
      }
      const slide = parseS01SlideHash(rawHash);
      setInvalidHash(slide === null);
      if (slide !== null) {
        dispatch({ type: 'set-scenario', scenarioId: routeId });
        setPartIndex(slide.partIndex);
        dispatch({ type: 'set-stop', stopId: slide.stopId });
      } else {
        dispatch({ type: 'set-scenario', scenarioId: routeId });
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
  }, [config.defaultView]);

  function updateHash(hash: string, replace = false) {
    const nextState = historyStateForRoute(state.scenarioId);
    if (replace) {
      window.history.replaceState(nextState, '', hash);
    } else {
      window.history.pushState(nextState, '', hash);
    }
    setInvalidHash(false);
  }

  function changeScenario(scenarioId: S01ScenarioId) {
    if (scenarioId === state.scenarioId) return;
    dispatch({ type: 'set-scenario', scenarioId });
    window.history.pushState(historyStateForRoute(scenarioId), '', window.location.href);
    setInvalidHash(false);
  }

  function openBibliography() {
    setBibliography(true);
    setPartIndex(0);
    dispatch({ type: 'set-stop', stopId: 'question' });
    dispatch({ type: 'set-view', view: 'focus' });
    updateHash('#bibliografia');
  }

  function openStop(stopId: S01StopId, focus = false) {
    setBibliography(false);
    setPartIndex(0);
    dispatch({ type: 'set-stop', stopId });
    updateHash(getS01SlideHash(stopId, 0));
    if (focus) {
      window.requestAnimationFrame(() => document.getElementById('s01-focus-title')?.focus());
    }
  }

  function openPart(partIndex: number) {
    const partsForStop = getS01Parts(state.stopId);
    const nextPartIndex = Math.min(Math.max(partIndex, 0), partsForStop.length - 1);
    setBibliography(false);
    setPartIndex(nextPartIndex);
    dispatch({ type: 'set-stop', stopId: state.stopId });
    updateHash(getS01SlideHash(state.stopId, nextPartIndex));
  }

  function openSlide(slide: S01Slide) {
    if (slide.stopId === null) {
      openBibliography();
      return;
    }
    setBibliography(false);
    setPartIndex(slide.partIndex);
    dispatch({ type: 'set-stop', stopId: slide.stopId });
    dispatch({ type: 'set-view', view: 'focus' });
    updateHash(getS01SlideHash(slide.stopId, slide.partIndex));
  }

  function move(delta: -1 | 1) {
    if (bibliography) {
      if (delta === 1) openSlide(s01Slides[1]!);
      return;
    }
    const next = moveS01Slide(state.stopId, partIndex, delta);
    if (next) {
      openSlide(s01Slides[getS01SlideIndex(next.stopId, next.partIndex)]!);
    } else if (delta === -1 && state.stopId === 'question' && partIndex === 0) {
      openBibliography();
    }
  }

  function toggleOverview() {
    if (state.view === 'overview') {
      dispatch({ type: 'set-view', view: 'focus' });
      updateHash(getS01SlideHash(state.stopId, partIndex));
    } else {
      dispatch({ type: 'set-view', view: 'overview' });
      updateHash('#mapa');
    }
  }

  function setDisplayMode(displayMode: S01DisplayMode) {
    const leavingActivities = state.displayMode === 'activities' && displayMode === 'presentation';
    dispatch({ type: 'set-display-mode', displayMode });
    const url = new URL(window.location.href);
    const explicitReadingMode = url.searchParams.get('modo') === 'lectura';
    if (displayMode === 'reading') {
      url.searchParams.set('modo', 'lectura');
      if (url.hash === '#mapa') url.hash = getS01SlideHash(state.stopId, partIndex);
    } else if (displayMode === 'activities') {
      url.searchParams.set('modo', 'actividades');
      if (url.hash === '#mapa') url.hash = getS01SlideHash(state.stopId, partIndex);
    } else {
      if (explicitReadingMode || leavingActivities) url.searchParams.delete('modo');
      else url.searchParams.set('modo', 'presentacion');
    }
    window.history.pushState(
      historyStateForRoute(state.scenarioId),
      '',
      `${url.pathname}${url.search}${url.hash}`,
    );
    if (displayMode === 'reading') {
      window.requestAnimationFrame(() => {
        document.getElementById(`lectura-${getS01Stop(state.stopId).hash}`)?.scrollIntoView?.({
          block: 'start',
        });
      });
    }
  }

  function openStopInPresentation(stopId: S01StopId) {
    setDisplayMode('presentation');
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
    dispatch({ type: 'set-scenario', scenarioId: defaultRouteId });
    setPartIndex(0);
    setBibliography(state.displayMode === 'presentation');
    setInvalidHash(false);
    setActivityResetKey((key) => key + 1);
    const url = new URL(window.location.href);
    url.hash = '';
    window.history.replaceState(
      historyStateForRoute(defaultRouteId),
      '',
      `${url.pathname}${url.search}`,
    );
  }

  return (
    <section
      className="session-presentation s01-journey"
      data-ready="true"
      data-active-stop={state.stopId}
      data-scenario={state.scenarioId}
      data-view={state.view}
      data-display-mode={state.displayMode}
      data-part-index={partIndex}
      data-active-slide={activeSlideIndex}
      data-slide-count={s01Slides.length}
      data-bibliography={bibliography}
      data-interaction-mode={config.interactionMode}
      style={cssState}
      aria-labelledby="s01-journey-title"
    >
      <S01Navigation
        state={state}
        scenario={scenario}
        activeStop={activeStop}
        activeIndex={activeIndex}
        activeSlideIndex={activeSlideIndex}
        partIndex={partIndex}
        bibliography={bibliography}
        invalidHash={invalidHash}
        pilot={pilot}
        parts={parts}
        availableScenarios={availableScenarios}
        slides={s01Slides}
        onOpenBibliography={() => {
          setDisplayMode('presentation');
          openBibliography();
        }}
        onSetDisplayMode={setDisplayMode}
        onToggleOverview={toggleOverview}
        onScenarioChange={changeScenario}
        onSelectSlide={openSlide}
        onMove={move}
        onReset={reset}
        onReadingHome={() => document.getElementById('s01-reading-title')?.scrollIntoView?.()}
        onReturnToPresentation={() => setDisplayMode('presentation')}
      >
        {state.displayMode === 'activities' ? (
          <ActivitiesView key={activityResetKey} onOpenStop={openStopInPresentation} />
        ) : state.displayMode === 'reading' ? (
          <ReadingView state={state} scenario={scenario} dispatch={dispatch} onJump={jumpReading} />
        ) : bibliography ? (
          <SessionBibliography />
        ) : state.view === 'overview' ? (
          <Overview scenario={scenario} onOpen={openStop} />
        ) : (
          <div className="s01-workspace" data-pilot={pilot}>
            {pilot && (
              <nav className="s01-parts" aria-label="Partes de la estación">
                {parts.map((part, index) => (
                  <button
                    key={part.id}
                    type="button"
                    aria-current={index === partIndex ? 'step' : undefined}
                    onClick={() => openPart(index)}
                  >
                    {index + 1}. {part.label}
                  </button>
                ))}
              </nav>
            )}
            {(!pilot || partIndex > 0) && (
              <div className="s01-scene-deck">
                <SceneForStop
                  part={pilot ? (partIndex === 1 ? 'graphic' : 'interaction') : undefined}
                  stopId={state.stopId}
                  state={state}
                  scenario={scenario}
                  dispatch={dispatch}
                />
              </div>
            )}

            {(!pilot || partIndex === 0) && (
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
            )}
            <TeacherPrompt stop={activeStop} />
          </div>
        )}
      </S01Navigation>

      <noscript>
        <p>La lectura lineal completa continúa debajo de este instrumento.</p>
      </noscript>
    </section>
  );
}
