import type { S01DisplayMode, S01ScenarioId } from './s01-journey';

export type InteractionMode = 'interactive' | 'direct';
export type CourseDisplayMode = S01DisplayMode;

export interface CourseIdentity {
  id: string;
  title: string;
  institution?: string;
  description?: string;
}

export interface CourseDefaults {
  interactionMode: InteractionMode;
  teacherMode: boolean;
  defaultView: CourseDisplayMode;
}

export interface SessionConfig {
  enabled?: boolean;
  enabledRouteIds?: readonly string[];
  defaultRouteId?: string;
  interactionMode?: InteractionMode;
  teacherMode?: boolean;
  defaultView?: CourseDisplayMode;
}

export interface CourseConfigV2 {
  identity: CourseIdentity;
  defaults: CourseDefaults;
  enabledSessionIds: readonly string[];
  sessions: Readonly<Record<string, SessionConfig>>;
}

export interface LegacyS01Config {
  enabledRouteIds: readonly S01ScenarioId[];
  defaultRouteId?: S01ScenarioId;
}

export interface LegacyCourseConfig {
  interactionMode: InteractionMode;
  teacherMode: boolean;
  defaultView: CourseDisplayMode;
  s01: LegacyS01Config;
}

/** Input accepted during migration. The resolved result always contains both V2 and pilot aliases. */
export type CourseConfig =
  CourseConfigV2 | LegacyCourseConfig | (CourseConfigV2 & Partial<LegacyCourseConfig>);

export interface ResolvedSessionConfig extends SessionConfig {
  enabled: boolean;
  enabledRouteIds: readonly S01ScenarioId[];
  defaultRouteId?: S01ScenarioId;
}

export interface ResolvedCourseConfig extends CourseConfigV2, LegacyCourseConfig {
  defaults: CourseDefaults;
  sessions: Readonly<Record<string, ResolvedSessionConfig>>;
}

const knownSessionIds = ['S00', 'S01'] as const;
const knownS01Routes: readonly S01ScenarioId[] = ['spectrum', 'catalog', 'followup'];
const defaultIdentity: CourseIdentity = { id: 'mlcp', title: 'ML Ciencias Planetarias' };
const defaultDefaults: CourseDefaults = {
  interactionMode: 'interactive',
  teacherMode: false,
  defaultView: 'presentation',
};

function hasOwn(value: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function fail(message: string): never {
  throw new Error(`config/course.config.ts: ${message}`);
}

function assertString(value: unknown, path: string): asserts value is string {
  if (typeof value !== 'string' || value.trim() === '') fail(`${path} debe ser un texto no vacío.`);
}

function assertMode(value: unknown, path: string): asserts value is InteractionMode {
  if (value !== 'interactive' && value !== 'direct') {
    fail(`${path} debe ser interactive o direct.`);
  }
}

function assertView(value: unknown, path: string): asserts value is CourseDisplayMode {
  if (value !== 'presentation' && value !== 'reading' && value !== 'activities') {
    fail(`${path} debe ser presentation, reading o activities.`);
  }
}

function uniqueStrings(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) fail(`${path} debe ser una lista.`);
  if (value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    fail(`${path} solo puede contener textos no vacíos.`);
  }
  const values = [...value] as string[];
  if (new Set(values).size !== values.length) fail(`${path} contiene IDs duplicados.`);
  return values;
}

function copyIdentity(value: unknown): CourseIdentity {
  if (value === undefined) return { ...defaultIdentity };
  if (typeof value !== 'object' || value === null) fail('identity debe ser un objeto.');
  const identity = value as Partial<CourseIdentity>;
  assertString(identity.id, 'identity.id');
  assertString(identity.title, 'identity.title');
  for (const key of ['institution', 'description'] as const) {
    if (identity[key] !== undefined) assertString(identity[key], `identity.${key}`);
  }
  return {
    id: identity.id,
    title: identity.title,
    ...(identity.institution === undefined ? {} : { institution: identity.institution }),
    ...(identity.description === undefined ? {} : { description: identity.description }),
  };
}

function copyDefaults(value: unknown): CourseDefaults {
  if (value === undefined) return { ...defaultDefaults };
  if (typeof value !== 'object' || value === null) fail('defaults debe ser un objeto.');
  const defaults = value as Partial<CourseDefaults>;
  assertMode(defaults.interactionMode, 'defaults.interactionMode');
  if (typeof defaults.teacherMode !== 'boolean')
    fail('defaults.teacherMode debe ser true o false.');
  assertView(defaults.defaultView, 'defaults.defaultView');
  return {
    interactionMode: defaults.interactionMode,
    teacherMode: defaults.teacherMode,
    defaultView: defaults.defaultView,
  };
}

function copySession(value: unknown, sessionId: string): SessionConfig {
  if (value === undefined) return {};
  if (typeof value !== 'object' || value === null)
    fail(`sessions.${sessionId} debe ser un objeto.`);
  const session = value as SessionConfig;
  if (session.enabled !== undefined && typeof session.enabled !== 'boolean') {
    fail(`sessions.${sessionId}.enabled debe ser true o false.`);
  }
  if (session.enabledRouteIds !== undefined) {
    uniqueStrings(session.enabledRouteIds, `sessions.${sessionId}.enabledRouteIds`);
  }
  if (session.defaultRouteId !== undefined) {
    assertString(session.defaultRouteId, `sessions.${sessionId}.defaultRouteId`);
  }
  if (session.interactionMode !== undefined) {
    assertMode(session.interactionMode, `sessions.${sessionId}.interactionMode`);
  }
  if (session.teacherMode !== undefined && typeof session.teacherMode !== 'boolean') {
    fail(`sessions.${sessionId}.teacherMode debe ser true o false.`);
  }
  if (session.defaultView !== undefined) {
    assertView(session.defaultView, `sessions.${sessionId}.defaultView`);
  }
  return { ...session };
}

function normalizedSession(
  sessionId: string,
  session: SessionConfig,
  enabledByCourse: boolean,
): ResolvedSessionConfig {
  const isS01 = sessionId === 'S01';
  const approvedRoutes = isS01 ? knownS01Routes : [];
  const configuredRoutes = session.enabledRouteIds;
  const routes = configuredRoutes === undefined ? approvedRoutes : configuredRoutes;
  const enabled = session.enabled ?? enabledByCourse;

  if (sessionId === 'S00' && (routes.length > 0 || session.defaultRouteId !== undefined)) {
    fail('sessions.S00 no declara rutas; elimina enabledRouteIds/defaultRouteId.');
  }
  if (isS01 && enabled && routes.length === 0) {
    fail('sessions.S01.enabledRouteIds no puede estar vacío: habilita al menos una ruta.');
  }
  if (!isS01 && sessionId !== 'S00') {
    fail(`sessions.${sessionId} no tiene un adaptador de rutas conocido.`);
  }
  if (routes.some((route) => !approvedRoutes.includes(route as S01ScenarioId))) {
    const invalid = routes.find((route) => !approvedRoutes.includes(route as S01ScenarioId));
    fail(`sessions.${sessionId}.enabledRouteIds contiene la ruta desconocida ${invalid}.`);
  }
  const defaultRouteId =
    session.defaultRouteId === undefined
      ? (routes[0] as S01ScenarioId | undefined)
      : session.defaultRouteId;
  if (defaultRouteId !== undefined && !routes.includes(defaultRouteId)) {
    fail(`sessions.${sessionId}.defaultRouteId debe pertenecer a enabledRouteIds.`);
  }

  return {
    ...session,
    enabled,
    enabledRouteIds: routes as readonly S01ScenarioId[],
    defaultRouteId: defaultRouteId as S01ScenarioId | undefined,
  };
}

function isV2Config(config: CourseConfig): config is CourseConfigV2 & Partial<LegacyCourseConfig> {
  return (
    'identity' in config ||
    'defaults' in config ||
    'enabledSessionIds' in config ||
    'sessions' in config
  );
}

export function defineCourseConfig(config: CourseConfig): ResolvedCourseConfig {
  const v2 = isV2Config(config);
  const input = config as Partial<CourseConfigV2> & Partial<LegacyCourseConfig>;
  const legacy = config as Partial<LegacyCourseConfig>;
  const identity = copyIdentity(v2 ? input.identity : undefined);
  const defaults = copyDefaults(v2 ? input.defaults : undefined);

  const interactionMode = hasOwn(config, 'interactionMode')
    ? legacy.interactionMode
    : defaults.interactionMode;
  const teacherMode = hasOwn(config, 'teacherMode') ? legacy.teacherMode : defaults.teacherMode;
  const defaultView = hasOwn(config, 'defaultView') ? legacy.defaultView : defaults.defaultView;
  assertMode(interactionMode, 'interactionMode');
  if (typeof teacherMode !== 'boolean') fail('teacherMode debe ser true o false.');
  assertView(defaultView, 'defaultView');

  const enabledSessionIds = v2
    ? uniqueStrings(input.enabledSessionIds, 'enabledSessionIds')
    : ['S01'];
  const sessionsInput = v2 ? input.sessions : { S01: input.s01 };
  if (typeof sessionsInput !== 'object' || sessionsInput === null)
    fail('sessions debe ser un mapa.');
  const sessionEntries = Object.entries(sessionsInput as Record<string, unknown>);
  for (const sessionId of enabledSessionIds) {
    if (!knownSessionIds.includes(sessionId as (typeof knownSessionIds)[number])) {
      fail(`enabledSessionIds contiene la sesión desconocida ${sessionId}.`);
    }
    if (!hasOwn(sessionsInput, sessionId)) fail(`falta la configuración de sessions.${sessionId}.`);
  }
  for (const [sessionId] of sessionEntries) {
    if (!knownSessionIds.includes(sessionId as (typeof knownSessionIds)[number])) {
      fail(`sessions contiene la sesión desconocida ${sessionId}.`);
    }
  }

  const legacyS01 = input.s01;
  const resolvedSessions: Record<string, ResolvedSessionConfig> = {};
  for (const sessionId of knownSessionIds) {
    const rawSession = hasOwn(sessionsInput, sessionId)
      ? copySession((sessionsInput as Record<string, unknown>)[sessionId], sessionId)
      : {};
    if (sessionId === 'S01' && legacyS01 !== undefined && v2) {
      const legacyRoutes = copySession(legacyS01, 's01');
      Object.assign(rawSession, legacyRoutes);
    }
    const sessionEnabled = enabledSessionIds.includes(sessionId);
    resolvedSessions[sessionId] = normalizedSession(sessionId, rawSession, sessionEnabled);
  }

  const s01 = resolvedSessions.S01!;
  if (s01.enabled && !s01.defaultRouteId) {
    fail('sessions.S01 requiere una defaultRouteId cuando S01 está configurada.');
  }
  const resolvedDefaults = { interactionMode, teacherMode, defaultView };
  const sessionSettings = {
    interactionMode: s01.interactionMode ?? interactionMode,
    teacherMode: s01.teacherMode ?? teacherMode,
    defaultView: s01.defaultView ?? defaultView,
  };
  const hasLegacyOverride =
    hasOwn(config, 'interactionMode') ||
    hasOwn(config, 'teacherMode') ||
    hasOwn(config, 'defaultView');
  const effectiveSettings = hasLegacyOverride ? resolvedDefaults : sessionSettings;
  return {
    identity,
    defaults: resolvedDefaults,
    enabledSessionIds,
    sessions: resolvedSessions,
    interactionMode: effectiveSettings.interactionMode,
    teacherMode: effectiveSettings.teacherMode,
    defaultView: effectiveSettings.defaultView,
    s01: {
      enabledRouteIds: s01.enabledRouteIds,
      defaultRouteId: s01.defaultRouteId,
    },
  };
}

export function resolveSessionSettings(
  config: ResolvedCourseConfig,
  sessionId: string,
): CourseDefaults {
  const session = config.sessions[sessionId];
  return {
    interactionMode: session?.interactionMode ?? config.defaults.interactionMode,
    teacherMode: session?.teacherMode ?? config.defaults.teacherMode,
    defaultView: session?.defaultView ?? config.defaults.defaultView,
  };
}
