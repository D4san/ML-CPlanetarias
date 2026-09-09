import { describe, expect, it } from 'vitest';

import {
  contextualDomId,
  exampleAnchorId,
  getExampleTask,
  isRenderableExample,
  isSafeExternalHref,
  toConceptTermData,
} from './contextual-content';

describe('contextual content adapters', () => {
  it('maps one public concept summary to every contextual appearance', () => {
    expect(
      toConceptTermData(
        {
          id: 'generalizacion',
          title: 'Generalización',
          summary: 'Desempeño en instancias no vistas.',
          aliases: ['fuera de muestra'],
        },
        '/glosario/generalizacion/',
      ),
    ).toEqual({
      id: 'generalizacion',
      term: 'Generalización',
      shortDefinition: 'Desempeño en instancias no vistas.',
      aliases: ['fuera de muestra'],
      fullHref: '/glosario/generalizacion/',
    });
  });

  it('normalizes IDs, accepts the registry task field and rejects unsafe URLs', () => {
    expect(contextualDomId('example', 'Señal / S01')).toBe('example-senal-s01');
    expect(exampleAnchorId('s01-kepler-transit-signal')).toBe('example-s01-kepler-transit-signal');
    expect(getExampleTask({ paradigm_task: 'Detectar una señal.' })).toBe('Detectar una señal.');
    expect(getExampleTask({ task: 42 as unknown as string })).toBe('');
    expect(isSafeExternalHref('https://example.test/source')).toBe(true);
    expect(isSafeExternalHref('javascript:alert(1)')).toBe(false);
  });

  it('rejects malformed records before a public example action is emitted', () => {
    expect(isRenderableExample({ id: 'missing-fields' })).toBe(false);
    expect(
      isRenderableExample({
        id: 'valid',
        question: 'Pregunta',
        domain: 'Exoplanetas',
        representation: 'Espectro',
        paradigm_task: 'Estimar',
        output: 'Salida',
        interpretation: 'Interpretación',
        limits: 'Límite',
        sourceIds: ['source'],
      }),
    ).toBe(true);
  });
});
