import { EvidenceScene } from './EvidenceScene';
import { FamilyScene } from './FamilyScene';
import { DomainScene } from './DomainScene';
import { InstanceScene } from './InstanceScene';
import { QuestionScene } from './QuestionScene';
import { SignalScene } from './SignalScene';
import { TaskScene } from './TaskScene';
import type { SceneProps } from './scene-types';
import type { S01StopId } from '../../../lib/s01-journey';

export function SceneForStop({ stopId, ...props }: SceneProps & { stopId: S01StopId }) {
  switch (stopId) {
    case 'question':
      return <QuestionScene {...props} />;
    case 'instance':
      return <InstanceScene {...props} />;
    case 'signal':
      return <SignalScene {...props} />;
    case 'task':
      return <TaskScene {...props} />;
    case 'family':
      return <FamilyScene {...props} />;
    case 'domain':
      return <DomainScene {...props} />;
    case 'evidence':
      return <EvidenceScene {...props} />;
  }
}
