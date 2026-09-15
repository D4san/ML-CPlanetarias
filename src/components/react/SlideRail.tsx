import { useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';

import {
  getSlideRailStackOrder,
  getSlideRailStackSide,
  getSlideRailWindow,
  type SlideRailItem,
  type SlideRailStackSide,
} from '../../lib/slide-rail';
import './slide-rail.css';

export type { SlideRailItem } from '../../lib/slide-rail';

export type SlideRailProps<T extends SlideRailItem> = {
  slides: readonly T[];
  activeIndex: number;
  activeLabel: ReactNode;
  ariaLabel: string;
  progressLabel?: string;
  visibleCount?: number;
  homeIndex?: number;
  onSelect: (slide: T, index: number) => void;
  getKeyboardIndex?: (index: number, direction: 'next' | 'previous') => number;
  getIndexLabel?: (slide: T, index: number) => string;
  getAriaLabel?: (slide: T, index: number) => string;
  isVisited?: (slide: T, index: number) => boolean;
  compactCaption?: boolean;
  hideCaption?: boolean;
  className?: string;
};

function getStackCounts<T extends SlideRailItem>(
  slides: readonly T[],
  activeIndex: number,
  visibleCount: number,
) {
  return slides.reduce(
    (counts, _slide, index) => {
      const side = getSlideRailStackSide(index, slides.length, activeIndex, visibleCount);
      if (side) counts[side] += 1;
      return counts;
    },
    { left: 0, right: 0 } as Record<SlideRailStackSide, number>,
  );
}

export default function SlideRail<T extends SlideRailItem>({
  slides,
  activeIndex,
  activeLabel,
  ariaLabel,
  progressLabel = 'Avance de las diapositivas',
  visibleCount = 5,
  homeIndex = 0,
  onSelect,
  getKeyboardIndex,
  getIndexLabel,
  getAriaLabel,
  isVisited,
  compactCaption = false,
  hideCaption = false,
  className,
}: SlideRailProps<T>) {
  const slideButtons = useRef<Array<HTMLButtonElement | null>>([]);

  if (slides.length === 0) return null;

  const boundedActiveIndex = Math.min(Math.max(activeIndex, 0), slides.length - 1);
  const slideWindow = getSlideRailWindow(slides.length, boundedActiveIndex, visibleCount);
  const stackCounts = getStackCounts(slides, boundedActiveIndex, visibleCount);
  const progress = slides.length === 1 ? 100 : (boundedActiveIndex / (slides.length - 1)) * 100;
  const railClassName = className ? `slide-rail ${className}` : 'slide-rail';

  function activate(index: number, moveFocus = false) {
    const slide = slides[index];
    if (!slide) return;
    onSelect(slide, index);
    if (moveFocus) slideButtons.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = getKeyboardIndex
        ? getKeyboardIndex(index, 'next')
        : Math.min(index + 1, slides.length - 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = getKeyboardIndex ? getKeyboardIndex(index, 'previous') : Math.max(index - 1, 0);
    } else if (event.key === 'Home') {
      nextIndex = Math.min(Math.max(homeIndex, 0), slides.length - 1);
    } else if (event.key === 'End') {
      nextIndex = slides.length - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    activate(nextIndex, true);
  }

  return (
    <div
      className={railClassName}
      style={{ '--slide-rail-progress': `${progress}%` } as CSSProperties}
    >
      <div
        className="slide-rail__progress"
        role="progressbar"
        aria-label={progressLabel}
        aria-valuemin={0}
        aria-valuemax={slides.length - 1}
        aria-valuenow={boundedActiveIndex}
      >
        <span />
      </div>

      <nav aria-label={ariaLabel}>
        {!hideCaption && (
          <div className="slide-rail__caption">
            <span className="slide-rail__count">
              <span className="slide-rail__count-compact" aria-hidden="true">
                {slideWindow.count} / {slides.length}
              </span>
              <span className="slide-rail__count-full" aria-hidden={compactCaption}>
                {slideWindow.count} destacadas · {slides.length} totales
              </span>
            </span>
            {compactCaption && (
              <span className="slide-rail__count-a11y">
                {slideWindow.count} diapositivas visibles de {slides.length}
              </span>
            )}
            <strong>{activeLabel}</strong>
            <small className="slide-rail__stack-summary">
              {stackCounts.left > 0 ? `${stackCounts.left} en el borde izquierdo` : ''}
              {stackCounts.left > 0 && stackCounts.right > 0 ? ' · ' : ''}
              {stackCounts.right > 0 ? `${stackCounts.right} en el borde derecho` : ''}
            </small>
          </div>
        )}

        <div className="slide-rail__viewport">
          {stackCounts.left > 0 && (
            <span
              className="slide-rail__stack-hint slide-rail__stack-hint--left"
              aria-hidden="true"
            >
              ← {stackCounts.left}
            </span>
          )}
          {stackCounts.right > 0 && (
            <span
              className="slide-rail__stack-hint slide-rail__stack-hint--right"
              aria-hidden="true"
            >
              {stackCounts.right} →
            </span>
          )}

          <ol>
            {slides.map((slide, index) => {
              const side = getSlideRailStackSide(
                index,
                slides.length,
                boundedActiveIndex,
                visibleCount,
              );
              const isVisible = side === null;
              const stackOrder = getSlideRailStackOrder(
                index,
                slides.length,
                boundedActiveIndex,
                visibleCount,
              );
              const partLabels = slide.partLabels ?? [];
              const ariaSlideLabel = getAriaLabel
                ? getAriaLabel(slide, index)
                : slide.partLabel === slide.title
                  ? `${index + 1}. ${slide.title}`
                  : `Subslide ${index + 1} · ${slide.groupLabel} · ${slide.partLabel}`;
              const indexLabel = getIndexLabel
                ? getIndexLabel(slide, index)
                : String(index).padStart(2, '0');

              return (
                <li
                  key={slide.id}
                  data-tone={slide.tone ?? 'model'}
                  data-active={boundedActiveIndex === index}
                  data-visited={isVisited ? isVisited(slide, index) : index <= boundedActiveIndex}
                  data-visible={isVisible}
                  data-side={isVisible ? undefined : side}
                  style={{ '--slide-rail-stack-order': stackOrder } as CSSProperties}
                >
                  <button
                    ref={(node) => {
                      slideButtons.current[index] = node;
                    }}
                    type="button"
                    aria-current={boundedActiveIndex === index ? 'step' : undefined}
                    aria-label={ariaSlideLabel}
                    onClick={() => activate(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span className="slide-rail__index">{indexLabel}</span>
                    <span className="slide-rail__node" aria-hidden="true" />
                    <span className="slide-rail__group">{slide.groupLabel}</span>
                    <strong className="slide-rail__part">{slide.partLabel}</strong>
                    {partLabels.length > 1 && (
                      <span className="slide-rail__parts" aria-hidden="true">
                        {partLabels.map((partLabel, partIndex) => (
                          <span
                            key={`${slide.id}-${partLabel}`}
                            data-active={partIndex === (slide.partIndex ?? 0)}
                            title={partLabel}
                          />
                        ))}
                      </span>
                    )}
                    {boundedActiveIndex === index && (
                      <span className="slide-rail__traveler" aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </div>
  );
}
