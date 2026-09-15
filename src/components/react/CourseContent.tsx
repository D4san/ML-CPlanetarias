import { useId } from 'react';

import { contextualDomId, isSafeExternalHref } from '../../lib/contextual-content';
import type {
  BibliographyReference,
  CautionContent,
  SessionBibliographyContent,
  TeacherPromptContent,
  TeacherPromptIntent,
} from '../../lib/pedagogical-content';
import './course-content.css';

export interface SessionBibliographyProps extends SessionBibliographyContent {
  className?: string;
  headingId?: string;
}

export function referenceAuthor(reference: BibliographyReference): string {
  const authors = reference.authors?.filter((author) => author.trim() !== '');
  return authors && authors.length > 0
    ? authors.join(', ')
    : (reference.institution ?? 'Autoría no declarada');
}

export function referenceMeta(reference: BibliographyReference): string {
  return [reference.edition, reference.publisher, reference.year]
    .filter((value) => value !== undefined && String(value).trim() !== '')
    .map(String)
    .join(' · ');
}

export function referenceHref(reference: BibliographyReference): string | null {
  if (isSafeExternalHref(reference.url)) return reference.url;
  if (reference.doi?.trim()) {
    return `https://doi.org/${reference.doi.trim().replace(/^https?:\/\/doi.org\//, '')}`;
  }
  return null;
}

function contextualHref(value: string | undefined): string | null {
  if (typeof value === 'string' && (value.startsWith('/') || value.startsWith('#'))) {
    return value;
  }
  if (isSafeExternalHref(value)) return value;
  return null;
}

export function SessionBibliography({
  className,
  headingId: explicitHeadingId,
  ...content
}: SessionBibliographyProps) {
  const reactId = useId();
  const headingId =
    explicitHeadingId ?? contextualDomId('bibliography', `${content.sessionId}-${reactId}`);
  const rootClassName = ['course-bibliography', className].filter(Boolean).join(' ');

  return (
    <section
      className={rootClassName}
      data-session-id={content.sessionId}
      aria-labelledby={headingId}
    >
      <p className="course-bibliography__label">{content.label}</p>
      <h2 id={headingId} tabIndex={-1}>
        {content.title}
      </h2>
      <p>{content.intro}</p>
      <div className="course-bibliography__items">
        {content.references.map((reference) => {
          const href = referenceHref(reference);
          const meta = referenceMeta(reference);
          const knownLocation = [
            reference.chapter && `Capítulo(s) ${reference.chapter}`,
            reference.section && `Sección ${reference.section}`,
          ]
            .filter(Boolean)
            .join(' · ');
          return (
            <article key={reference.id} data-reference-id={reference.id}>
              <span className="course-bibliography__label">{reference.didacticFunction}</span>
              <h3>{referenceAuthor(reference)}</h3>
              <p>
                <cite>{reference.title}</cite>
                {meta && <> · {meta}</>}
              </p>
              {(knownLocation || reference.location) && (
                <p>
                  {knownLocation && <strong>{knownLocation}</strong>}
                  {knownLocation && reference.location && ': '}
                  {reference.location}
                </p>
              )}
              <p>
                <strong>Función didáctica:</strong> {reference.didacticFunction}
              </p>
              {href ? (
                <a href={href}>Ver la fuente en su sitio ↗</a>
              ) : (
                <p className="course-bibliography__missing-link">
                  No hay enlace externo declarado.
                </p>
              )}
            </article>
          );
        })}
      </div>
      {content.note && <p className="course-bibliography__note">{content.note}</p>}
    </section>
  );
}

export interface CautionBoxProps {
  caution: CautionContent;
  className?: string;
}

export function CautionBox({ caution, className }: CautionBoxProps) {
  const reactId = useId();
  const headingId = contextualDomId('caution', `${caution.id}-${reactId}`);
  const rootClassName = ['course-caution', className].filter(Boolean).join(' ');
  const relatedConceptHref = contextualHref(caution.relatedConceptHref);
  const relatedExampleHref = contextualHref(caution.relatedExampleHref);
  return (
    <aside
      id={headingId}
      className={rootClassName}
      aria-labelledby={`${headingId}-title`}
      data-caution-id={caution.id}
    >
      <span className="course-caution__label">Precaución conceptual</span>
      <h3 id={`${headingId}-title`}>{caution.distinction}</h3>
      <dl>
        <div>
          <dt>Confusión frecuente</dt>
          <dd>{caution.confusion}</dd>
        </div>
        <div>
          <dt>Consecuencia</dt>
          <dd>{caution.consequence}</dd>
        </div>
      </dl>
      {(relatedConceptHref || relatedExampleHref) && (
        <p className="course-caution__links">
          {relatedConceptHref && <a href={relatedConceptHref}>Aclarar el concepto relacionado</a>}
          {relatedExampleHref && <a href={relatedExampleHref}>Ver un ejemplo relacionado</a>}
        </p>
      )}
    </aside>
  );
}

const intentLabels: Record<TeacherPromptIntent, string> = {
  opening: 'Pregunta docente · apertura',
  diagnostic: 'Pregunta docente · diagnóstico',
  transfer: 'Pregunta docente · transferencia',
};

export interface TeacherPromptProps {
  prompt: TeacherPromptContent;
  teacherMode: boolean;
  className?: string;
}

export function TeacherPrompt({ prompt, teacherMode, className }: TeacherPromptProps) {
  if (!teacherMode) return null;
  const rootClassName = ['course-teacher-prompt', className].filter(Boolean).join(' ');
  return (
    <aside
      className={rootClassName}
      aria-label="Pregunta sugerida para docentes"
      data-prompt-id={prompt.id}
      data-intent={prompt.intent}
    >
      <p className="course-teacher-prompt__label">{intentLabels[prompt.intent]}</p>
      <p>{prompt.question}</p>
      <details>
        <summary>Orientación para acompañar</summary>
        <p>{prompt.guidance}</p>
      </details>
    </aside>
  );
}

export type {
  BibliographyReference,
  CautionContent,
  SessionBibliographyContent,
  TeacherPromptContent,
  TeacherPromptIntent,
};
