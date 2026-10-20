import SlideRail from '../SlideRail';
import { s02Stops, s02TeachingStations } from '../../../lib/s02-content';
export function S02Navigation({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (index: number) => void;
}) {
  const slides = s02Stops.map((stop) => {
    const parts = s02Stops.filter((item) => item.stationId === stop.stationId);
    return {
      ...stop,
      partIndex: parts.findIndex((item) => item.id === stop.id),
      partLabels: parts.map((item) => item.title),
    };
  });
  return (
    <SlideRail
      slides={slides}
      activeIndex={index}
      activeLabel={slides[index]!.title}
      ariaLabel="Recorrido de diapositivas S02"
      progressLabel="Avance de la sesión 02"
      visibleCount={5}
      compactCaption
      className="slide-rail--session-presentation"
      onSelect={(_stop, i) => onSelect(i)}
      getIndexLabel={(stop) =>
        stop.role === 'opening'
          ? '0'
          : stop.role === 'references'
            ? 'Ref.'
            : `${String(s02TeachingStations.findIndex((station) => station.id === stop.stationId) + 1).padStart(2, '0')}.${(stop.partIndex ?? 0) + 1}`
      }
      getAriaLabel={(stop) =>
        stop.role === 'opening'
          ? '0. Portada de S02'
          : stop.role === 'references'
            ? 'Referencias de S02'
            : `${s02TeachingStations.findIndex((station) => station.id === stop.stationId) + 1}.${(stop.partIndex ?? 0) + 1} ${stop.groupLabel}, subestación ${stop.title}: ${stop.partLabel}`
      }
    />
  );
}
