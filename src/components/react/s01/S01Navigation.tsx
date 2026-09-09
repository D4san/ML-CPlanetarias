import type { ReactNode } from 'react';

import { getS01SlideNumber, type S01Slide } from '../../../lib/s01-slides';
import {
  s01Activities,
  s01Stops,
  type S01DisplayMode,
  type S01JourneyState,
  type S01Scenario,
  type S01ScenarioId,
  type S01Stop,
} from '../../../lib/s01-journey';
import SlideRail from '../SlideRail';

export interface S01NavigationProps {
  state: S01JourneyState;
  scenario: S01Scenario;
  activeStop: S01Stop;
  activeIndex: number;
  activeSlideIndex: number;
  partIndex: number;
  bibliography: boolean;
  invalidHash: boolean;
  pilot: boolean;
  parts: readonly { id: string; label: string }[];
  availableScenarios: readonly S01Scenario[];
  slides: readonly S01Slide[];
  children: ReactNode;
  onOpenBibliography: () => void;
  onSetDisplayMode: (displayMode: S01DisplayMode) => void;
  onToggleOverview: () => void;
  onScenarioChange: (scenarioId: S01ScenarioId) => void;
  onSelectSlide: (slide: S01Slide) => void;
  onMove: (delta: -1 | 1) => void;
  onReset: () => void;
  onReadingHome: () => void;
  onReturnToPresentation: () => void;
}

export function S01Navigation({
  state,
  scenario,
  activeStop,
  activeIndex,
  activeSlideIndex,
  partIndex,
  bibliography,
  invalidHash,
  pilot,
  parts,
  availableScenarios,
  slides,
  children,
  onOpenBibliography,
  onSetDisplayMode,
  onToggleOverview,
  onScenarioChange,
  onSelectSlide,
  onMove,
  onReset,
  onReadingHome,
  onReturnToPresentation,
}: S01NavigationProps) {
  return (
    <>
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
          <button
            type="button"
            className="s01-overview-toggle s01-bibliography-toggle"
            onClick={onOpenBibliography}
          >
            Bibliografía
          </button>
          <div className="s01-display-switch" aria-label="Modo de lectura">
            <button
              type="button"
              aria-pressed={state.displayMode === 'presentation'}
              onClick={() => onSetDisplayMode('presentation')}
            >
              Presentación
            </button>
            <button
              type="button"
              aria-pressed={state.displayMode === 'reading'}
              onClick={() => onSetDisplayMode('reading')}
            >
              Lectura
            </button>
            <button
              type="button"
              aria-pressed={state.displayMode === 'activities'}
              onClick={() => onSetDisplayMode('activities')}
            >
              Actividades
            </button>
          </div>
          {state.displayMode === 'presentation' && (
            <button
              type="button"
              className="s01-overview-toggle s01-map-toggle"
              aria-pressed={state.view === 'overview'}
              onClick={onToggleOverview}
            >
              {state.view === 'overview' ? 'Volver a la diapositiva' : 'Ver mapa completo'}
            </button>
          )}
        </div>
      </div>

      {state.displayMode !== 'activities' && (
        <div className="s01-scenario-picker" aria-label="Ruta astronómica">
          <span>Ruta:</span>
          {availableScenarios.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={state.scenarioId === item.id}
              onClick={() => onScenarioChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {state.displayMode === 'presentation' && (
        <SlideRail
          slides={slides}
          activeIndex={activeSlideIndex}
          activeLabel={
            bibliography
              ? 'Bibliografía'
              : `${activeStop.shortLabel} · ${parts[partIndex]?.label ?? activeStop.title}`
          }
          className="slide-rail--s01-presentation"
          compactCaption
          ariaLabel="Diapositivas de S01"
          progressLabel="Avance de las diapositivas de S01"
          homeIndex={0}
          onSelect={onSelectSlide}
          getIndexLabel={getS01SlideNumber}
          getAriaLabel={(slide) =>
            slide.stopId === null
              ? '0. Bibliografía de S01'
              : slide.partIndex === 0
                ? `${slide.stopIndex + 1}. ${slide.stopTitle}`
                : `Subslide ${slide.partIndex + 1} · ${slide.stopLabel} · ${slide.partLabel}`
          }
        />
      )}

      {invalidHash && (
        <p className="s01-hash-notice" role="status">
          Ese concepto todavía no existe en S01. Mostramos la parada actual y conservamos el mapa
          útil.
        </p>
      )}

      {children}

      <div className="s01-journey__footer">
        <p className="s01-state-summary" aria-live="polite">
          {state.displayMode === 'activities'
            ? `Rama de actividades. ${s01Activities.length} retos breves; elige una respuesta y vuelve a la parada correspondiente.`
            : bibliography && state.displayMode === 'presentation'
              ? 'Diapositiva 0. Bibliografía de S01.'
              : `Modo ${state.displayMode === 'reading' ? 'lectura lineal' : 'presentación'}. Parada ${activeIndex + 1} de ${s01Stops.length}: ${activeStop.title}. Ruta ${scenario.label}. ${pilot && state.displayMode === 'presentation' ? `Parte ${partIndex + 1} de ${parts.length}: ${parts[partIndex]?.label}.` : ''}`}
        </p>
        <div className="s01-journey__actions" aria-label="Controles del recorrido">
          {state.displayMode === 'presentation' ? (
            <>
              <button
                type="button"
                onClick={() => onMove(-1)}
                disabled={bibliography || state.view === 'overview'}
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => onMove(1)}
                disabled={
                  (!bibliography && activeSlideIndex >= slides.length - 1) ||
                  state.view === 'overview'
                }
              >
                Siguiente →
              </button>
            </>
          ) : state.displayMode === 'reading' ? (
            <button type="button" onClick={onReadingHome}>
              ↑ Volver al inicio
            </button>
          ) : (
            <button type="button" onClick={onReturnToPresentation}>
              ← Volver al recorrido
            </button>
          )}
          <button type="button" className="s01-reset" onClick={onReset}>
            Reiniciar
          </button>
        </div>
      </div>
    </>
  );
}
