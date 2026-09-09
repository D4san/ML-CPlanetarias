import { isSessionAvailable, type AvailabilityConfig } from './course-availability';

export type ContentReference = string | { id: string };

export interface ConceptBacklinkSession {
  id: string;
  data: {
    session: string;
    concepts?: readonly ContentReference[];
  };
}

export interface ConceptBacklinkExercise {
  id: string;
  data: {
    concepts?: readonly ContentReference[];
    sessions?: readonly ContentReference[];
  };
}

export interface ConceptBacklinks {
  sessions: readonly ConceptBacklinkSession[];
  exercises: readonly ConceptBacklinkExercise[];
}

function referenceId(reference: ContentReference): string {
  return typeof reference === 'string' ? reference : reference.id;
}

function mentionsConcept(references: readonly ContentReference[] | undefined, conceptId: string) {
  return (references ?? []).some((reference) => referenceId(reference) === conceptId);
}

export function isExerciseAvailable(
  exercise: ConceptBacklinkExercise,
  config: AvailabilityConfig,
): boolean {
  const sessionIds = (exercise.data.sessions ?? []).map(referenceId);
  return (
    sessionIds.length === 0 || sessionIds.some((sessionId) => isSessionAvailable(config, sessionId))
  );
}

export function getConceptBacklinks(
  conceptId: string,
  sessions: readonly ConceptBacklinkSession[],
  exercises: readonly ConceptBacklinkExercise[],
  config: AvailabilityConfig,
): ConceptBacklinks {
  return {
    sessions: sessions.filter(
      (session) =>
        isSessionAvailable(config, session.data.session) &&
        mentionsConcept(session.data.concepts, conceptId),
    ),
    exercises: exercises.filter(
      (exercise) =>
        isExerciseAvailable(exercise, config) && mentionsConcept(exercise.data.concepts, conceptId),
    ),
  };
}
