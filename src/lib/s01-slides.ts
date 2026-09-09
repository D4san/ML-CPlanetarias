import {
  getS01Stop,
  getS01StopFromHash,
  s01Stops,
  type S01StopId,
  type S01Tone,
} from './s01-journey';
import {
  getSlideRailStackOrder,
  getSlideRailStackSide,
  getSlideRailWindow,
  type SlideRailStackSide,
  type SlideRailItem,
} from './slide-rail';

export const s01Parts = {
  question: [
    { id: 'apertura', unitId: 's01-question-opening', label: 'La pregunta' },
    { id: 'salidas', unitId: 's01-question-outputs', label: 'Cinco salidas' },
    { id: 'disciplinas', unitId: 's01-question-lenses', label: 'Tres disciplinas' },
  ],
  instance: [
    { id: 'apertura', unitId: 's01-instance-opening', label: 'El caso individual' },
    { id: 'flujo', unitId: 's01-instance-flow', label: 'De observación a salida' },
    { id: 'notacion', unitId: 's01-instance-notation', label: 'Ajustar y usar' },
  ],
  signal: [
    { id: 'apertura', unitId: 's01-signal-opening', label: 'La señal' },
    { id: 'paradigmas', unitId: 's01-signal-paradigms', label: 'Tres paradigmas' },
    { id: 'ruta', unitId: 's01-signal-route', label: 'La ruta activa' },
  ],
  task: [
    { id: 'apertura', unitId: 's01-task-opening', label: 'La tarea' },
    { id: 'salidas', unitId: 's01-task-tree', label: 'Árbol de salidas' },
    { id: 'niveles', unitId: 's01-task-levels', label: 'Tres niveles' },
  ],
  family: [
    { id: 'apertura', unitId: 's01-family-opening', label: 'La familia' },
    { id: 'reglas', unitId: 's01-family-rules-learning', label: 'Reglas y aprendizaje' },
    { id: 'sesgo', unitId: 's01-family-bias', label: 'Sesgo inductivo' },
  ],
  domain: [
    { id: 'apertura', unitId: 's01-domain-opening', label: 'El dominio' },
    { id: 'cambio', unitId: 's01-domain-shift', label: 'Cambio de condiciones' },
    { id: 'diagnostico', unitId: 's01-domain-diagnosis', label: 'Diagnóstico y transferencia' },
  ],
  evidence: [
    { id: 'apertura', unitId: 's01-evidence-opening', label: 'La evidencia' },
    { id: 'capacidad', unitId: 's01-evidence-capacity', label: 'Capacidad y generalización' },
    { id: 'afirmacion', unitId: 's01-evidence-claim', label: 'Afirmación defendible' },
  ],
} as const;

export type S01Slide = SlideRailItem & {
  unitId: string;
  stopId: S01StopId | null;
  stopIndex: number;
  partIndex: number;
  partId: string;
  stopLabel: string;
  stopTitle: string;
  tone: S01Tone;
};

export function getS01SlideNumber(slide: Pick<S01Slide, 'stopId' | 'stopIndex' | 'partIndex'>) {
  if (slide.stopId === null) return '00';
  return `${String(slide.stopIndex + 1).padStart(2, '0')}.${slide.partIndex + 1}`;
}

export function getS01Parts(
  stopId: S01StopId,
): readonly { id: string; unitId: string; label: string }[] {
  return s01Parts[stopId];
}

const s01ContentSlides: S01Slide[] = s01Stops.flatMap((stop, stopIndex) =>
  getS01Parts(stop.id).map((part, partIndex) => ({
    id: part.unitId,
    unitId: part.unitId,
    groupLabel: stop.shortLabel,
    title: stop.title,
    partIndex,
    partLabel: part.label,
    partLabels: getS01Parts(stop.id).map((item) => item.label),
    tone: stop.tone,
    stopId: stop.id,
    stopIndex,
    partId: part.id,
    stopLabel: stop.shortLabel,
    stopTitle: stop.title,
  })),
);

/**
 * The presentation rail treats every explainable part as a slide while keeping
 * the old station hashes and labels stable. Bibliography is the only slide
 * without a station and remains slide 0 by design.
 */
export const s01Slides: readonly S01Slide[] = [
  {
    id: 's01-bibliography-0',
    unitId: 's01-bibliography-0',
    groupLabel: 'Inicio',
    title: 'Bibliografía de S01',
    partLabel: 'Bibliografía',
    partLabels: [],
    tone: 'question',
    stopId: null,
    stopIndex: -1,
    partIndex: 0,
    partId: 'bibliografia',
    stopLabel: 'Inicio',
    stopTitle: 'Bibliografía de S01',
  },
  ...s01ContentSlides,
];

export function getS01SlideIndex(stopId: S01StopId, partIndex = 0) {
  return s01Slides.findIndex((slide) => slide.stopId === stopId && slide.partIndex === partIndex);
}

export function getS01SlideWindow(activeIndex: number, visibleCount = 5) {
  return getSlideRailWindow(s01Slides.length, activeIndex, visibleCount);
}

export type S01SlideStackSide = SlideRailStackSide;

export function getS01SlideStackSide(
  index: number,
  activeIndex: number,
  visibleCount = 5,
): S01SlideStackSide | null {
  return getSlideRailStackSide(index, s01Slides.length, activeIndex, visibleCount);
}

export function getS01SlideStackOrder(index: number, activeIndex: number, visibleCount = 5) {
  return getSlideRailStackOrder(index, s01Slides.length, activeIndex, visibleCount);
}

export function getS01SlideHash(stopId: S01StopId, partIndex: number) {
  const part = getS01Parts(stopId)[partIndex];
  return `#${getS01Stop(stopId).hash}${partIndex > 0 && part ? `/${part.id}` : ''}`;
}

export function parseS01SlideHash(hash: string) {
  const [stopHash = '', partId, extra] = hash.split('/');
  let stopId: S01StopId | null;
  try {
    stopId = getS01StopFromHash(stopHash);
  } catch {
    return null;
  }
  if (!stopId || extra !== undefined) return null;
  const index = partId ? getS01Parts(stopId).findIndex((part) => part.id === partId) : 0;
  return index < 0 ? null : { stopId, partIndex: index };
}

export function moveS01Slide(stopId: S01StopId, partIndex: number, delta: -1 | 1) {
  const parts = getS01Parts(stopId);
  const nextPart = partIndex + delta;
  if (nextPart >= 0 && nextPart < parts.length) return { stopId, partIndex: nextPart };
  const index = s01Stops.findIndex((stop) => stop.id === stopId);
  const next = s01Stops[index + delta];
  if (!next) return null;
  return { stopId: next.id, partIndex: delta === 1 ? 0 : getS01Parts(next.id).length - 1 };
}
