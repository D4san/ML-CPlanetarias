import { describe, expect, it } from 'vitest';
import { s00Book } from './s00-reading';
import { s01Book } from './s01-reading';
import { s02Book, s02ReadingUnits } from './s02-reading';
import { s00Units } from './s00-content';
import { s01Stops } from './s01-journey';
import { s02Stops } from './s02-content';

describe('correspondencia del libro con la secuencia editorial', () => {
  it('cubre S00 y S01 sin perder ni reordenar sus decisiones', () => {
    expect(s00Book.chapters.map((chapter) => chapter.id)).toEqual(s00Units.map((unit) => unit.id));
    expect(s01Book.chapters.map((chapter) => chapter.id)).toEqual(s01Stops.map((stop) => stop.id));
  });

  it('agrupa todas las unidades de S02 una sola vez, en orden y sin duplicar portada o referencias', () => {
    expect(s02Book.chapters.flatMap((chapter) => s02ReadingUnits[chapter.id]!)).toEqual(
      s02Stops.filter((stop) => stop.role === 'content').map((stop) => stop.id),
    );
  });
});
