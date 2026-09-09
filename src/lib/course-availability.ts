import type { CourseConfigV2, ResolvedCourseConfig } from './course-config';

export type AvailabilityConfig = Pick<CourseConfigV2, 'enabledSessionIds' | 'sessions'>;

/** Return the configured session IDs that can be exposed by a static page. */
export function getAvailableSessionIds(config: AvailabilityConfig): string[] {
  return config.enabledSessionIds.filter((sessionId) => {
    const session = config.sessions[sessionId];
    return session !== undefined && session.enabled !== false;
  });
}

/** A session is available only when the course enables it and its own flag permits it. */
export function isSessionAvailable(config: AvailabilityConfig, sessionId: string): boolean {
  return getAvailableSessionIds(config).includes(sessionId);
}

/** Check a route without allowing URL state to enable an unavailable session or route. */
export function isRouteAvailable(
  config: AvailabilityConfig,
  sessionId: string,
  routeId: string,
): boolean {
  if (!isSessionAvailable(config, sessionId)) return false;
  const routes = config.sessions[sessionId]?.enabledRouteIds;
  return routes === undefined || routes.includes(routeId);
}

export function getSessionPath(sessionId: string): string {
  return sessionId === 'S01' ? '/sistema/' : `/sesiones/${sessionId.toLowerCase()}/`;
}

export function getCourseTitle(config: ResolvedCourseConfig): string {
  return config.identity.title;
}
