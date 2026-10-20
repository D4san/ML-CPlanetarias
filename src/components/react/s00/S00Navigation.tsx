import SlideRail from '../SlideRail';
import { s00Slides, getS00SlideNumber } from '../../../lib/s00-content';
export function S00Navigation({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (index: number) => void;
}) {
  const active = s00Slides[index]!;
  return (
    <SlideRail
      slides={s00Slides}
      activeIndex={index}
      activeLabel={
        active.role === 'opening'
          ? 'Portada'
          : active.role === 'references'
            ? 'Referencias'
            : active.unitShortLabel + ' · ' + active.partLabel
      }
      className="slide-rail--session-presentation"
      compactCaption
      hideCaption
      ariaLabel="Diapositivas de S00"
      progressLabel="Avance de las diapositivas de S00"
      getIndexLabel={getS00SlideNumber}
      getAriaLabel={(slide) =>
        slide.role === 'opening'
          ? '0. Portada de S00'
          : slide.role === 'references'
            ? 'Referencias de S00'
            : slide.partIndex === 0
              ? `${slide.unitIndex + 1}. ${slide.title}`
              : `Subslide ${getS00SlideNumber(slide)} · ${slide.groupLabel} · ${slide.partLabel}`
      }
      onSelect={(_slide, i) => onSelect(i)}
    />
  );
}
