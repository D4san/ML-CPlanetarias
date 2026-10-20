/**
 * Model didáctico de un tránsito con órbita circular y compañero oscuro.
 * La geometría y el caso de fuente uniforme siguen a Mandel & Agol (2002,
 * https://doi.org/10.1086/345520); la duración circular sigue a Seager &
 * Mallén-Ornelas (2003, https://doi.org/10.1086/346105).
 */

export type TransitProfile = 'uniform' | 'linear-limb-darkening';
export type TransitKind = 'central' | 'full' | 'grazing' | 'none';
export type TransitContact = 'first-to-fourth' | 'second-to-third';

export interface TransitState {
  /** Fase cíclica: 0 es conjunción delante de la estrella; 0.5 queda detrás. */
  phaseCycles: number;
  /** k = Rp / R*. */
  radiusRatio: number;
  /** Inclinación orbital en grados; 90° corresponde a una órbita de canto. */
  inclinationDegrees: number;
  /** A = a / R*. Se fija en 8 para las escenas geométricas didácticas. */
  aOverRStar: number;
  /** Periodo ilustrativo en días para el modelo normalizado de la estación 1.3. */
  periodDays: number;
  profile: TransitProfile;
  /** Coeficiente u de la ley lineal I(μ) = 1 - u(1 - μ). */
  limbDarkeningCoefficient: number;
}

export interface ProjectedPosition {
  phaseCycles: number;
  orbitalAngleRadians: number;
  /** Coordenadas en el plano del cielo, medidas en radios estelares. */
  xSky: number;
  ySky: number;
  /** Distancia hacia el observador, positiva delante de la estrella. */
  zTowardObserver: number;
  projectedSeparation: number;
  inFront: boolean;
}

export interface TransitDurations {
  /** T14: primer a cuarto contacto, en las mismas unidades del periodo. */
  firstToFourth: number;
  /** T23: segundo a tercer contacto; cero si el tránsito es rasante. */
  secondToThird: number;
}

export interface PhaseSample {
  phaseCycles: number;
  flux: number;
}

export const DEFAULT_TRANSIT_STATE: TransitState = {
  phaseCycles: 0,
  radiusRatio: 0.1,
  inclinationDegrees: 90,
  aOverRStar: 8,
  periodDays: 10,
  profile: 'uniform',
  limbDarkeningCoefficient: 0.6,
};

const TAU = 2 * Math.PI;
const LIMB_ANNULI = 256;
const EPSILON = 1e-12;

function assertFinite(value: number, name: string): void {
  if (!Number.isFinite(value)) throw new RangeError(`${name} debe ser finito.`);
}

function validateState(state: TransitState): void {
  assertFinite(state.phaseCycles, 'La fase');
  assertFinite(state.radiusRatio, 'La razón de radios');
  assertFinite(state.inclinationDegrees, 'La inclinación');
  assertFinite(state.aOverRStar, 'a/R*');
  assertFinite(state.periodDays, 'El periodo');
  assertFinite(state.limbDarkeningCoefficient, 'El coeficiente de oscurecimiento');
  if (state.radiusRatio <= 0 || state.radiusRatio >= 1) {
    throw new RangeError('La razón Rp/R* debe estar entre 0 y 1.');
  }
  if (state.inclinationDegrees < 0 || state.inclinationDegrees > 90) {
    throw new RangeError('La inclinación debe estar entre 0° y 90°.');
  }
  if (state.aOverRStar <= 1 + state.radiusRatio) {
    throw new RangeError('a/R* debe situar la órbita fuera de la estrella.');
  }
  if (state.periodDays <= 0) throw new RangeError('El periodo debe ser positivo.');
  if (state.limbDarkeningCoefficient < 0 || state.limbDarkeningCoefficient > 1) {
    throw new RangeError('El coeficiente u debe estar entre 0 y 1.');
  }
}

function clampUnit(value: number): number {
  return Math.min(1, Math.max(-1, value));
}

/** Lleva la fase a [-0.5, 0.5); la curva se repite cada unidad de fase. */
export function wrapTransitPhase(phaseCycles: number): number {
  assertFinite(phaseCycles, 'La fase');
  const wrapped = ((((phaseCycles + 0.5) % 1) + 1) % 1) - 0.5;
  return wrapped === -0.5 && phaseCycles > 0 ? 0.5 : wrapped;
}

export function getImpactParameter(state: TransitState): number {
  validateState(state);
  return state.aOverRStar * Math.cos((state.inclinationDegrees * Math.PI) / 180);
}

/** Proyección de la órbita circular sobre el plano del cielo. */
export function getProjectedPosition(
  state: TransitState,
  phaseCycles = state.phaseCycles,
): ProjectedPosition {
  validateState(state);
  const phase = wrapTransitPhase(phaseCycles);
  const angle = TAU * phase;
  const inclination = (state.inclinationDegrees * Math.PI) / 180;
  const xSky = state.aOverRStar * Math.sin(angle);
  const ySky = state.aOverRStar * Math.cos(inclination) * Math.cos(angle);
  const zTowardObserver = state.aOverRStar * Math.sin(inclination) * Math.cos(angle);

  return {
    phaseCycles: phase,
    orbitalAngleRadians: angle,
    xSky,
    ySky,
    zTowardObserver,
    projectedSeparation: Math.hypot(xSky, ySky),
    inFront: zTowardObserver > EPSILON,
  };
}

export function classifyTransit(state: TransitState): TransitKind {
  const impactParameter = getImpactParameter(state);
  const k = state.radiusRatio;
  if (impactParameter >= 1 + k - EPSILON) return 'none';
  if (impactParameter <= EPSILON) return 'central';
  if (impactParameter < 1 - k - EPSILON) return 'full';
  return 'grazing';
}

/** Área de intersección exacta de dos círculos, en unidades del radio². */
export function circleOverlapArea(
  firstRadius: number,
  secondRadius: number,
  centerDistance: number,
): number {
  assertFinite(firstRadius, 'El primer radio');
  assertFinite(secondRadius, 'El segundo radio');
  assertFinite(centerDistance, 'La separación');
  if (firstRadius < 0 || secondRadius < 0 || centerDistance < 0) {
    throw new RangeError('Los radios y la separación deben ser no negativos.');
  }
  if (firstRadius === 0 || secondRadius === 0) return 0;
  if (centerDistance >= firstRadius + secondRadius) return 0;
  if (centerDistance <= Math.abs(firstRadius - secondRadius)) {
    return Math.PI * Math.min(firstRadius, secondRadius) ** 2;
  }

  const firstAngle = Math.acos(
    clampUnit(
      (centerDistance ** 2 + firstRadius ** 2 - secondRadius ** 2) /
        (2 * centerDistance * firstRadius),
    ),
  );
  const secondAngle = Math.acos(
    clampUnit(
      (centerDistance ** 2 + secondRadius ** 2 - firstRadius ** 2) /
        (2 * centerDistance * secondRadius),
    ),
  );
  const product =
    (-centerDistance + firstRadius + secondRadius) *
    (centerDistance + firstRadius - secondRadius) *
    (centerDistance - firstRadius + secondRadius) *
    (centerDistance + firstRadius + secondRadius);
  return (
    firstRadius ** 2 * firstAngle +
    secondRadius ** 2 * secondAngle -
    0.5 * Math.sqrt(Math.max(0, product))
  );
}

function linearLimbIntensity(radius: number, coefficient: number): number {
  const mu = Math.sqrt(Math.max(0, 1 - radius ** 2));
  return 1 - coefficient * (1 - mu);
}

/**
 * Integra el perfil lineal sobre anillos concéntricos. Cada anillo usa el área
 * exacta de intersección; 256 anillos aproximan solo la integral de intensidad.
 */
function linearLimbDarkenedFlux(
  separation: number,
  radiusRatio: number,
  coefficient: number,
): number {
  if (separation >= 1 + radiusRatio) return 1;
  if (coefficient === 0) {
    return 1 - circleOverlapArea(1, radiusRatio, separation) / Math.PI;
  }

  let blockedFlux = 0;
  for (let index = 0; index < LIMB_ANNULI; index += 1) {
    const innerRadius = Math.sqrt(index / LIMB_ANNULI);
    const outerRadius = Math.sqrt((index + 1) / LIMB_ANNULI);
    const representativeRadius = Math.sqrt((index + 0.5) / LIMB_ANNULI);
    const annulusOverlap =
      circleOverlapArea(outerRadius, radiusRatio, separation) -
      circleOverlapArea(innerRadius, radiusRatio, separation);
    blockedFlux +=
      Math.max(0, annulusOverlap) * linearLimbIntensity(representativeRadius, coefficient);
  }

  // El flujo total de una estrella con ley lineal es π(1 - u/3).
  return 1 - blockedFlux / (Math.PI * (1 - coefficient / 3));
}

/** Flujo estelar normalizado; un planeta oscuro solo resta luz cuando está delante. */
export function getTransitFlux(state: TransitState, phaseCycles = state.phaseCycles): number {
  validateState(state);
  const position = getProjectedPosition(state, phaseCycles);
  if (!position.inFront || position.projectedSeparation >= 1 + state.radiusRatio) return 1;

  if (state.profile === 'linear-limb-darkening') {
    return linearLimbDarkenedFlux(
      position.projectedSeparation,
      state.radiusRatio,
      state.limbDarkeningCoefficient,
    );
  }
  return 1 - circleOverlapArea(1, state.radiusRatio, position.projectedSeparation) / Math.PI;
}

export function getTransitDepthAtMidpoint(state: TransitState): number {
  return 1 - getTransitFlux(state, 0);
}

/**
 * T14/T23 exactas para órbita circular, en las unidades usadas por P.
 * Para T23, un tránsito rasante no tiene meseta y devuelve cero.
 */
export function getTransitDuration(
  state: TransitState,
  contact: TransitContact = 'first-to-fourth',
): number {
  validateState(state);
  const k = state.radiusRatio;
  const impactParameter = getImpactParameter(state);
  const outerContact = 1 + k;
  const innerContact = 1 - k;

  if (contact === 'first-to-fourth' && impactParameter >= outerContact - EPSILON) return 0;
  if (contact === 'second-to-third' && impactParameter >= innerContact - EPSILON) return 0;

  const contactRadius = contact === 'first-to-fourth' ? outerContact : innerContact;
  const chordSquared = contactRadius ** 2 - impactParameter ** 2;
  if (chordSquared <= EPSILON) return 0;

  const inclination = (state.inclinationDegrees * Math.PI) / 180;
  const projectedOrbitalScale = state.aOverRStar * Math.sin(inclination);
  if (projectedOrbitalScale <= 0) return 0;
  const arcArgument = Math.sqrt(chordSquared) / projectedOrbitalScale;
  if (arcArgument > 1 + EPSILON) {
    throw new RangeError('La duración queda fuera del dominio de la órbita circular.');
  }
  const halfAngle = Math.asin(Math.min(1, arcArgument));
  return (state.periodDays / Math.PI) * halfAngle;
}

export function getTransitDurations(state: TransitState): TransitDurations {
  return {
    firstToFourth: getTransitDuration(state, 'first-to-fourth'),
    secondToThird: getTransitDuration(state, 'second-to-third'),
  };
}

/**
 * δ≈k² para un tránsito completo, una estrella uniforme, sin dilución y con
 * un compañero oscuro. Un tránsito central es un caso particular completo;
 * los tránsitos rasantes no alcanzan esa profundidad geométrica.
 */
export function getUniformFullTransitDepthApproximation(state: TransitState): number | null {
  if (state.profile !== 'uniform' || !['central', 'full'].includes(classifyTransit(state)))
    return null;
  return state.radiusRatio ** 2;
}

export function sampleTransitLightCurve(state: TransitState, sampleCount = 161): PhaseSample[] {
  if (!Number.isInteger(sampleCount) || sampleCount < 3) {
    throw new RangeError('La curva requiere al menos tres muestras enteras.');
  }
  return Array.from({ length: sampleCount }, (_, index) => {
    const phaseCycles = -0.5 + index / (sampleCount - 1);
    return { phaseCycles, flux: getTransitFlux(state, phaseCycles) };
  });
}

/** Épocas de repetición tₙ = t₀ + nP, con P en días. */
export function getPeriodicTransitEpochs(
  periodDays: number,
  count = 4,
  firstEpochDays = 0,
): number[] {
  assertFinite(periodDays, 'El periodo');
  assertFinite(firstEpochDays, 'La primera época');
  if (periodDays <= 0) throw new RangeError('El periodo debe ser positivo.');
  if (!Number.isInteger(count) || count < 1)
    throw new RangeError('count debe ser un entero positivo.');
  return Array.from({ length: count }, (_, index) => firstEpochDays + index * periodDays);
}
