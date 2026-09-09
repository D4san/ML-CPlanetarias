export type SlideRailStackSide = 'left' | 'right';

export type SlideRailItem = {
  id: string;
  groupLabel: string;
  title: string;
  partLabel: string;
  partIndex?: number;
  partLabels?: readonly string[];
  tone?: string;
};

export type SlideRailWindow = {
  start: number;
  end: number;
  count: number;
  leftCount: number;
  rightCount: number;
};

export function getSlideRailWindow(
  totalSlides: number,
  activeIndex: number,
  visibleCount = 5,
): SlideRailWindow {
  const total = Math.max(0, totalSlides);
  const count = total === 0 ? 0 : Math.min(Math.max(1, visibleCount), total);
  const boundedIndex = total === 0 ? 0 : Math.min(Math.max(activeIndex, 0), total - 1);
  const start =
    count === 0 ? 0 : Math.min(Math.max(0, boundedIndex - Math.floor(count / 2)), total - count);

  return {
    start,
    end: start + count - 1,
    count,
    leftCount: start,
    rightCount: total - (start + count),
  };
}

function getStackSideForWindow(
  index: number,
  start: number,
  end: number,
): SlideRailStackSide | null {
  if (index >= start && index <= end) return null;
  if (index < start) return (start - index - 1) % 2 === 0 ? 'left' : 'right';
  return (index - end - 1) % 2 === 0 ? 'right' : 'left';
}

export function getSlideRailStackSide(
  index: number,
  totalSlides: number,
  activeIndex: number,
  visibleCount = 5,
): SlideRailStackSide | null {
  const { start, end } = getSlideRailWindow(totalSlides, activeIndex, visibleCount);
  return getStackSideForWindow(index, start, end);
}

export function getSlideRailStackOrder(
  index: number,
  totalSlides: number,
  activeIndex: number,
  visibleCount = 5,
) {
  const { start, end } = getSlideRailWindow(totalSlides, activeIndex, visibleCount);
  const side = getStackSideForWindow(index, start, end);
  if (side === null) return -1;

  let order = 0;
  for (let candidate = 0; candidate < index; candidate += 1) {
    if (getStackSideForWindow(candidate, start, end) === side) order += 1;
  }
  return order;
}
