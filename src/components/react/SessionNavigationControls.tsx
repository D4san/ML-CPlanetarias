import { useEffect, useState } from 'react';
export interface SessionNavigationControlsProps {
  index: number;
  count: number;
  onMove: (delta: -1 | 1) => void;
  scope?: 'session' | 'explanation';
}

export function SessionNavigationControls({
  index,
  count,
  onMove,
  scope = 'session',
}: SessionNavigationControlsProps) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const local = scope === 'explanation';
  return (
    <nav
      className="session-step-controls"
      data-hydrated={hydrated}
      aria-label={local ? 'Pasos de la explicación' : 'Navegación de la sesión'}
    >
      <button type="button" onClick={() => onMove(-1)} disabled={!hydrated || index === 0}>
        {local ? 'Paso anterior' : 'Anterior'}
      </button>
      <span className="session-step-controls__progress" aria-live="polite">
        {index + 1} / {count}
      </span>
      <button type="button" onClick={() => onMove(1)} disabled={!hydrated || index === count - 1}>
        {local ? 'Paso siguiente' : 'Siguiente'}
      </button>
    </nav>
  );
}
