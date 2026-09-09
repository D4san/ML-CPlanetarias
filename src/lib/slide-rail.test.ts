import { describe, expect, it } from 'vitest';

import { getSlideRailStackOrder, getSlideRailStackSide, getSlideRailWindow } from './slide-rail';

describe('shared slide rail layout', () => {
  it('centers a bounded window and reports both hidden edges', () => {
    expect(getSlideRailWindow(12, 6)).toEqual({
      start: 4,
      end: 8,
      count: 5,
      leftCount: 4,
      rightCount: 3,
    });
    expect(getSlideRailWindow(3, 99, 5)).toEqual({
      start: 0,
      end: 2,
      count: 3,
      leftCount: 0,
      rightCount: 0,
    });
  });

  it('alternates hidden cards across the two edges without overlapping order', () => {
    expect(getSlideRailStackSide(0, 12, 6)).toBe('right');
    expect(getSlideRailStackSide(1, 12, 6)).toBe('left');
    expect(getSlideRailStackSide(9, 12, 6)).toBe('right');
    expect(getSlideRailStackSide(10, 12, 6)).toBe('left');
    expect(getSlideRailStackSide(6, 12, 6)).toBeNull();
    expect(getSlideRailStackOrder(11, 12, 6)).toBe(3);
  });
});
