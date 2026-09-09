import type { Dispatch } from 'react';

import type { S01JourneyAction, S01JourneyState, S01Scenario } from '../../../lib/s01-journey';

export type S01ScenePart = 'graphic' | 'interaction';

export interface SceneProps {
  state: S01JourneyState;
  scenario: S01Scenario;
  dispatch: Dispatch<S01JourneyAction>;
  part?: S01ScenePart;
}

export type QuestionSceneProps = SceneProps;
export type InstanceSceneProps = SceneProps;
export type SignalSceneProps = SceneProps;
export type TaskSceneProps = SceneProps;
export type FamilySceneProps = SceneProps;
export type DomainSceneProps = SceneProps;
export type EvidenceSceneProps = SceneProps;
