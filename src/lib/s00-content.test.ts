import { describe, expect, it } from 'vitest';

import {
  getS00Parts,
  getS00SlideIndex,
  getS00SlideHash,
  getS00SlideIndexFromHash,
  getS00SlideNumber,
  s00BibliographyReferences,
  s00ClosureSteps,
  s00ConceptCards,
  s00Concepts,
  s00MeasurementModalities,
  s00Slides,
  s00Units,
} from './s00-content';

describe('S00 scientific content', () => {
  it('flattens bibliography and uneven station parts for the shared SlideRail', () => {
    expect(s00Slides).toHaveLength(31);
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
    expect(s00Slides.slice(1).map((slide) => slide.partIndex)).toContain(5);
    expect(getS00SlideNumber(s00Slides[1]!)).toBe('01.1');
    expect(getS00SlideNumber(s00Slides[2]!)).toBe('01.2');
    expect(getS00SlideNumber(s00Slides[3]!)).toBe('01.3');
    expect(getS00SlideNumber(s00Slides[4]!)).toBe('02.1');
    expect(s00Units).toHaveLength(7);
    expect(getS00Parts('s00-pregunta')).toHaveLength(3);
    expect(getS00Parts('s00-datos')).toHaveLength(5);
    expect(getS00Parts('s00-ramas')).toHaveLength(3);
    expect(s00Units.map((unit) => unit.shortLabel)).toEqual([
      'Mundo',
      'Campo',
      'Medición',
      'Datos',
      'Verbos',
      'Impacto',
      'Ramas',
    ]);
    expect(s00ClosureSteps).toHaveLength(7);
    expect(s00ClosureSteps.every((step) => step.challenge.options.length === 3)).toBe(true);
    expect(s00ClosureSteps.every((step) => step.challenge.options.some((opt) => opt.correct))).toBe(
      true,
    );
  });

  it('resolves stable scientific hashes and opens the first station by default', () => {
    expect(getS00SlideHash(0)).toBe('#bibliografia');
    expect(getS00SlideHash(1)).toBe('#pregunta');
    expect(getS00SlideHash(2)).toBe('#pregunta/senal');
    expect(getS00SlideIndexFromHash('')).toBe(1);
    expect(getS00SlideIndexFromHash('#ramas')).toBe(getS00SlideIndex('s00-ramas'));
    expect(getS00SlideIndexFromHash('#ramas/teoria')).toBe(getS00SlideIndex('s00-ramas', 1));
    expect(getS00SlideIndexFromHash('#acotar')).toBe(getS00SlideIndex('s00-medicion'));
    expect(getS00SlideIndexFromHash('#acotar/salida')).toBe(getS00SlideIndex('s00-medicion'));
    expect(getS00SlideIndexFromHash('#cierre')).toBe(getS00SlideIndex('s00-ramas', 2));
    expect(getS00SlideIndexFromHash('#cierre/evaluacion')).toBe(getS00SlideIndex('s00-ramas', 2));
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

    // Concept observation cards (Slide 01.2)
    expect(s00ConceptCards).toHaveLength(4);
    expect(s00ConceptCards.map((c) => c.id)).toEqual([
      'exoplaneta',
      'transito',
      'espectro',
      'representacion',
    ]);
    expect(
      s00ConceptCards.every(
        (c) => c.target && c.instrument && c.dataType && c.study?.doi && c.dataArchive?.url,
      ),
    ).toBe(true);
    expect(s00ConceptCards.find((c) => c.id === 'representacion')?.codeRepo?.url).toBeTruthy();

    // Measurement modalities (Station 03 - Observar y Formular)
    expect(s00MeasurementModalities).toHaveLength(4);
    expect(s00MeasurementModalities.map((m) => m.id)).toEqual([
      'transito',
      'radial',
      'espectro',
      'imagen',
    ]);
    expect(
      s00MeasurementModalities.every(
        (m) =>
          m.governingEquation &&
          m.rawObservable &&
          m.inferredParameter &&
          m.instruments &&
          m.physicalLimit &&
          m.narrativeLead &&
          m.scientificIntention?.question &&
          m.scientificIntention?.physicalMotivation &&
          m.mlUnitFormulation?.instanceDefinition &&
          m.mlUnitFormulation?.tensorStructure &&
          m.mlUnitFormulation?.leakagePrevention &&
          m.mlOutput?.mathematicalForm &&
          m.mlOutput?.outputType &&
          m.mlOutput?.mlRole &&
          m.mlOutput?.typicalLossOrAlgorithm &&
          m.operationalUse?.action &&
          m.operationalUse?.followupCriterion &&
          m.operationalUse?.commonPitfall &&
          m.operationalUse?.validationGate,
      ),
    ).toBe(true);
    expect(s00Units.find((u) => u.id === 's00-medicion')?.measurementModalities).toHaveLength(4);
  });
});
