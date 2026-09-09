import { useId, useRef } from 'react';

import { contextualDomId, type ConceptTermData } from '../../lib/contextual-content';
import './course-content.css';

export interface ConceptTermProps {
  concept?: ConceptTermData | null;
}

/**
 * A native disclosure keeps the short definition and full-entry link usable in static HTML.
 * React adds only the small focus-return behavior expected when Escape closes the disclosure.
 */
export function ConceptTerm({ concept }: ConceptTermProps) {
  const reactId = useId();
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  if (!concept || concept.fullHref.trim() === '') return null;

  const baseId = contextualDomId('concept-term', `${concept.id}-${reactId}`);
  const summaryId = `${baseId}-summary`;
  const panelId = `${baseId}-panel`;

  function closeAndReturnFocus() {
    if (!detailsRef.current) return;
    detailsRef.current.open = false;
    summaryRef.current?.focus();
  }

  return (
    <details
      ref={detailsRef}
      className="concept-term"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeAndReturnFocus();
        }
      }}
    >
      <summary
        ref={summaryRef}
        id={summaryId}
        aria-controls={panelId}
        aria-label={`Aclarar ${concept.term}`}
      >
        <span className="concept-term__word">{concept.term}</span>
        <span className="concept-term__action" aria-hidden="true">
          Aclarar
        </span>
      </summary>
      <div id={panelId} className="concept-term__panel" role="region" aria-labelledby={summaryId}>
        <p>{concept.shortDefinition}</p>
        {concept.aliases.length > 0 && (
          <p className="concept-term__aliases">
            <strong>También:</strong> {concept.aliases.join(', ')}
          </p>
        )}
        <a href={concept.fullHref}>Ver entrada completa de {concept.term}</a>
      </div>
    </details>
  );
}
