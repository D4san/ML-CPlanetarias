import { describe, expect, it } from 'vitest';

import {
  classifyTransit,
  DEFAULT_TRANSIT_STATE,
  getImpactParameter,
  getPeriodicTransitEpochs,
  getProjectedPosition,
  getTransitDepthAtMidpoint,
  getTransitDuration,
  getTransitFlux,
  getTransitDurations,
  getUniformFullTransitDepthApproximation,
  sampleTransitLightCurve,
  wrapTransitPhase,
  type TransitState,
} from './s03-transit';

function stateAtImpactParameter(impactParameter: number): TransitState {
  return {
    ...DEFAULT_TRANSIT_STATE,
    inclinationDegrees:
      (Math.acos(impactParameter / DEFAULT_TRANSIT_STATE.aOverRStar) * 180) / Math.PI,
  };
}

describe('modelo geométrico S03', () => {
  it('proyecta una órbita circular con el centro del tránsito delante de la estrella', () => {
    const central = getProjectedPosition(DEFAULT_TRANSIT_STATE);
    const opposite = getProjectedPosition(DEFAULT_TRANSIT_STATE, 0.5);

    expect(central.xSky).toBeCloseTo(0, 12);
    expect(central.ySky).toBeCloseTo(0, 12);
    expect(central.inFront).toBe(true);
    expect(opposite.projectedSeparation).toBeCloseTo(0, 12);
    expect(opposite.inFront).toBe(false);
    expect(getTransitFlux(DEFAULT_TRANSIT_STATE, 0.5)).toBe(1);
  });

  it('distingue el caso central, un tránsito completo no central, el rasante y la ausencia', () => {
    expect(classifyTransit(DEFAULT_TRANSIT_STATE)).toBe('central');
    expect(classifyTransit(stateAtImpactParameter(0.5))).toBe('full');
    expect(classifyTransit(stateAtImpactParameter(1 - DEFAULT_TRANSIT_STATE.radiusRatio))).toBe(
      'grazing',
    );
    expect(classifyTransit(stateAtImpactParameter(1))).toBe('grazing');
    expect(classifyTransit(stateAtImpactParameter(1 + DEFAULT_TRANSIT_STATE.radiusRatio))).toBe(
      'none',
    );
    expect(getTransitFlux(stateAtImpactParameter(1 + DEFAULT_TRANSIT_STATE.radiusRatio), 0)).toBe(
      1,
    );
    expect(
      getTransitDuration(
        stateAtImpactParameter(1 + DEFAULT_TRANSIT_STATE.radiusRatio),
        'first-to-fourth',
      ),
    ).toBe(0);
    expect(
      getTransitDuration(
        stateAtImpactParameter(1 - DEFAULT_TRANSIT_STATE.radiusRatio),
        'second-to-third',
      ),
    ).toBe(0);
  });

  it('recupera δ = k² para tránsitos completos en una fuente uniforme', () => {
    expect(getTransitDepthAtMidpoint(DEFAULT_TRANSIT_STATE)).toBeCloseTo(0.01, 12);
    expect(getUniformFullTransitDepthApproximation(DEFAULT_TRANSIT_STATE)).toBeCloseTo(0.01, 12);
    expect(getUniformFullTransitDepthApproximation(stateAtImpactParameter(0.5))).toBeCloseTo(
      0.01,
      12,
    );
    expect(getUniformFullTransitDepthApproximation(stateAtImpactParameter(1))).toBeNull();
  });

  it('hace que un tránsito rasante tenga menos profundidad y T23 = 0', () => {
    const grazing = stateAtImpactParameter(1);
    const durations = getTransitDurations(grazing);

    expect(getTransitDepthAtMidpoint(grazing)).toBeGreaterThan(0);
    expect(getTransitDepthAtMidpoint(grazing)).toBeLessThan(grazing.radiusRatio ** 2);
    expect(durations.firstToFourth).toBeGreaterThan(0);
    expect(durations.secondToThird).toBe(0);
  });

  it('aplica un perfil lineal de oscurecimiento al limbo con flujo normalizado', () => {
    const limbDarkened = { ...DEFAULT_TRANSIT_STATE, profile: 'linear-limb-darkening' as const };
    const depth = getTransitDepthAtMidpoint(limbDarkened);

    expect(depth).toBeGreaterThan(getTransitDepthAtMidpoint(DEFAULT_TRANSIT_STATE));
    expect(depth).toBeCloseTo(0.0125, 3);
    expect(getTransitFlux(limbDarkened, 0.5)).toBe(1);
  });

  it('usa la duración circular T14 y conserva T23 ≤ T14', () => {
    const state = DEFAULT_TRANSIT_STATE;
    const expectedT14 =
      (state.periodDays / Math.PI) * Math.asin((1 + state.radiusRatio) / state.aOverRStar);
    const expectedT23 =
      (state.periodDays / Math.PI) * Math.asin((1 - state.radiusRatio) / state.aOverRStar);
    const durations = getTransitDurations(state);

    expect(getTransitDuration(state, 'first-to-fourth')).toBeCloseTo(expectedT14, 12);
    expect(durations.secondToThird).toBeCloseTo(expectedT23, 12);
    expect(durations.secondToThird).toBeLessThan(durations.firstToFourth);
  });

  it('escala la duración con P y las épocas como t₀ + nP', () => {
    const doubledPeriod = { ...DEFAULT_TRANSIT_STATE, periodDays: 20 };

    expect(getTransitDuration(doubledPeriod)).toBeCloseTo(
      2 * getTransitDuration(DEFAULT_TRANSIT_STATE),
      12,
    );
    expect(getPeriodicTransitEpochs(10, 4, 2)).toEqual([2, 12, 22, 32]);
  });

  it('muestra una curva simétrica alrededor del tránsito y repite la fase', () => {
    const samples = sampleTransitLightCurve(DEFAULT_TRANSIT_STATE, 101);
    const left = getTransitFlux(DEFAULT_TRANSIT_STATE, -0.01);
    const right = getTransitFlux(DEFAULT_TRANSIT_STATE, 0.01);

    expect(samples).toHaveLength(101);
    expect(samples[50]?.phaseCycles).toBeCloseTo(0, 12);
    expect(samples[50]?.flux).toBeCloseTo(0.99, 12);
    expect(left).toBeCloseTo(right, 12);
    expect(getTransitFlux(DEFAULT_TRANSIT_STATE, 1.01)).toBeCloseTo(right, 12);
    expect(wrapTransitPhase(0.5)).toBe(0.5);
    expect(wrapTransitPhase(-0.5)).toBe(-0.5);
    expect(wrapTransitPhase(1.5)).toBe(0.5);
  });

  it('rechaza entradas fuera del dominio físico del modelo', () => {
    expect(() => getImpactParameter({ ...DEFAULT_TRANSIT_STATE, radiusRatio: 1 })).toThrow(
      RangeError,
    );
    expect(() => getTransitDuration({ ...DEFAULT_TRANSIT_STATE, periodDays: 0 })).toThrow(
      RangeError,
    );
    expect(() => sampleTransitLightCurve(DEFAULT_TRANSIT_STATE, 2)).toThrow(RangeError);
    expect(() => getPeriodicTransitEpochs(10, 0)).toThrow(RangeError);
  });
});
