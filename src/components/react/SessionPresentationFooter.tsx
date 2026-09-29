import type { ReactNode } from 'react';

interface SessionPresentationFooterProps {
  actionsClassName?: string;
  children: ReactNode;
  className?: string;
  summary?: ReactNode;
  summaryClassName?: string;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

export function SessionPresentationFooter({
  actionsClassName,
  children,
  className,
  summary,
  summaryClassName,
}: SessionPresentationFooterProps) {
  return (
    <footer className={joinClassNames('session-presentation__footer', className)}>
      {summary != null && (
        <p
          className={joinClassNames('session-presentation__state-summary', summaryClassName)}
          aria-live="polite"
        >
          {summary}
        </p>
      )}
      <div
        className={joinClassNames('session-presentation__actions', actionsClassName)}
        aria-label="Controles del recorrido"
      >
        {children}
      </div>
    </footer>
  );
}
