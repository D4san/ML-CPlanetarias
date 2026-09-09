import { describe, expect, it } from 'vitest';
import {
  getS01SlideHash,
  getS01SlideIndex,
  getS01SlideNumber,
  getS01SlideStackOrder,
  getS01SlideStackSide,
  getS01SlideWindow,
  moveS01Slide,
  parseS01SlideHash,
  s01Slides,
} from './s01-slides';

describe('presentation parts', () => {
  it('preserves old links and resolves deep links to each part', () => {
    expect(parseS01SlideHash('#instancia')).toEqual({ stopId: 'instance', partIndex: 0 });
    expect(parseS01SlideHash('#pregunta/disciplinas')).toEqual({
      stopId: 'question',
      partIndex: 2,
    });
    expect(getS01SlideHash('instance', 1)).toBe('#instancia/flujo');
    expect(getS01SlideHash('signal', 0)).toBe('#senal');
  });
  it('rejects malformed, missing and extra parts without throwing', () => {
    for (const hash of ['#%', '#missing', '#pregunta/missing', '#instancia/flujo/extra']) {
      expect(parseS01SlideHash(hash)).toBeNull();
    }
  });
  it('walks forward and back across station boundaries', () => {
    expect(moveS01Slide('question', 0, 1)).toEqual({ stopId: 'question', partIndex: 1 });
    expect(moveS01Slide('question', 2, 1)).toEqual({ stopId: 'instance', partIndex: 0 });
    expect(moveS01Slide('instance', 0, -1)).toEqual({ stopId: 'question', partIndex: 2 });
    expect(moveS01Slide('signal', 0, -1)).toEqual({ stopId: 'instance', partIndex: 2 });
    expect(moveS01Slide('question', 0, -1)).toBeNull();
    expect(moveS01Slide('evidence', 0, 1)).toEqual({ stopId: 'evidence', partIndex: 1 });
    expect(moveS01Slide('evidence', 2, 1)).toBeNull();
  });

  it('flattens the bibliography and station parts into one stable slide sequence', () => {
    expect(s01Slides).toHaveLength(22);
    expect(s01Slides[0]).toMatchObject({
      id: 's01-bibliography-0',
      unitId: 's01-bibliography-0',
      stopId: null,
      partLabel: 'Bibliografía',
    });
    expect(s01Slides.slice(1, 4).map((slide) => slide.partId)).toEqual([
      'apertura',
      'salidas',
      'disciplinas',
    ]);
    expect(getS01SlideNumber(s01Slides[0]!)).toBe('00');
    expect(s01Slides.slice(1, 4).map((slide) => getS01SlideNumber(slide))).toEqual([
      '01.1',
      '01.2',
      '01.3',
    ]);
    expect(s01Slides.slice(4, 7).map((slide) => getS01SlideNumber(slide))).toEqual([
      '02.1',
      '02.2',
      '02.3',
    ]);
    expect(s01Slides.map((slide) => slide.unitId)).toEqual([
      's01-bibliography-0',
      's01-question-opening',
      's01-question-outputs',
      's01-question-lenses',
      's01-instance-opening',
      's01-instance-flow',
      's01-instance-notation',
      's01-signal-opening',
      's01-signal-paradigms',
      's01-signal-route',
      's01-task-opening',
      's01-task-tree',
      's01-task-levels',
      's01-family-opening',
      's01-family-rules-learning',
      's01-family-bias',
      's01-domain-opening',
      's01-domain-shift',
      's01-domain-diagnosis',
      's01-evidence-opening',
      's01-evidence-capacity',
      's01-evidence-claim',
    ]);
    expect(getS01SlideIndex('question', 2)).toBe(3);
    expect(getS01SlideIndex('instance', 2)).toBe(6);
    expect(s01Slides.slice(7, 10).map((slide) => slide.partId)).toEqual([
      'apertura',
      'paradigmas',
      'ruta',
    ]);
    expect(getS01SlideIndex('evidence')).toBe(19);
  });

  it('keeps five slides in view and exposes the hidden stack counts', () => {
    expect(getS01SlideWindow(0)).toMatchObject({
      start: 0,
      end: 4,
      leftCount: 0,
      rightCount: 17,
    });
    expect(getS01SlideWindow(6)).toMatchObject({
      start: 4,
      end: 8,
      leftCount: 4,
      rightCount: 13,
    });
    expect(getS01SlideWindow(21)).toMatchObject({
      start: 17,
      end: 21,
      leftCount: 17,
      rightCount: 0,
    });
    expect(getS01SlideStackSide(5, 0)).toBe('right');
    expect(getS01SlideStackSide(6, 0)).toBe('left');
    expect(getS01SlideStackSide(11, 0)).toBe('right');
    expect(getS01SlideStackOrder(11, 0)).toBe(3);
    expect(getS01SlideStackSide(3, 3)).toBeNull();
  });
});
