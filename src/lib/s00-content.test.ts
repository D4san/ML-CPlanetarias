import { describe, expect, it } from 'vitest';

import {
  getS00Parts,
  getS00SlideIndex,
  getS00SlideHash,
  getS00SlideIndexFromHash,
  getS00SlideNumber,
  s00BibliographyReferences,
  s00Concepts,
  s00Slides,
  s00Units,
} from './s00-content';

describe('S00 scientific content', () => {
  it('flattens bibliography and uneven station parts for the shared SlideRail', () => {
    expect(s00Slides).toHaveLength(42);
    expect(s00Slides[0]).toMatchObject({
      id: 's00-bibliografia',
      partLabel: 'Fuentes',
    });
    expect(
      s00Slides
        .slice(1)
        .filter((slide) => slide.partIndex === 0)
        .map((slide) => slide.unitId),
    ).toEqual(s00Units.map((unit) => unit.id));
    expect(s00Slides.slice(1).map((slide) => slide.partIndex)).toContain(6);
    expect(getS00SlideNumber(s00Slides[1]!)).toBe('01.1');
    expect(getS00SlideNumber(s00Slides[2]!)).toBe('01.2');
    expect(getS00SlideNumber(s00Slides[3]!)).toBe('01.3');
    expect(getS00SlideNumber(s00Slides[4]!)).toBe('02.1');
    expect(s00Units).toHaveLength(9);
    expect(getS00Parts('s00-pregunta')).toHaveLength(3);
    expect(getS00Parts('s00-datos')).toHaveLength(5);
    expect(getS00Parts('s00-cierre')).toHaveLength(7);
    expect(s00Units.map((unit) => unit.shortLabel)).toEqual([
      'Mundo',
      'Campo',
      'Acotar',
      'Medición',
      'Datos',
      'Verbos',
      'Impacto',
      'Ramas',
      'Cierre',
    ]);
  });

  it('resolves stable scientific hashes and opens the first station by default', () => {
    expect(getS00SlideHash(0)).toBe('#bibliografia');
    expect(getS00SlideHash(1)).toBe('#pregunta');
    expect(getS00SlideHash(2)).toBe('#pregunta/senal');
    expect(getS00SlideIndexFromHash('')).toBe(1);
    expect(getS00SlideIndexFromHash('#ramas')).toBe(getS00SlideIndex('s00-ramas'));
    expect(getS00SlideIndexFromHash('#ramas/teoria')).toBe(getS00SlideIndex('s00-ramas', 1));
    expect(getS00SlideIndexFromHash('#missing')).toBeNull();
    expect(getS00SlideIndexFromHash('#pregunta/missing')).toBeNull();
  });

  it('keeps the scientific chain, references and visual contracts complete', () => {
    expect(s00Units.every((unit) => unit.question && unit.idea && unit.limits)).toBe(true);
    expect(s00Units.every((unit) => unit.visualAlt && unit.visualCaption)).toBe(true);
    expect(s00Units.some((unit) => unit.dataCards?.length === 5)).toBe(true);
    expect(s00Units.some((unit) => unit.impactCases?.length === 6)).toBe(true);
    expect(s00Units.some((unit) => unit.branches?.length === 3)).toBe(true);
    expect(s00Concepts.length).toBeGreaterThanOrEqual(10);
    expect(s00BibliographyReferences.length).toBeGreaterThanOrEqual(8);
    expect(s00BibliographyReferences.every((reference) => reference.didacticFunction)).toBe(true);
  });
});
