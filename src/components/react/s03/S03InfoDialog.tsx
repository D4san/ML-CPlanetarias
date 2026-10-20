import { useId, useRef, type ReactNode } from 'react';

import './s03-info-dialog.css';

export default function S03InfoDialog({
  label,
  trigger,
  children,
  className = '',
  dialogClassName = '',
}: {
  label: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  dialogClassName?: string;
}) {
  const dialogId = `s03-dialog-${useId().replaceAll(':', '')}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) dialog.close();
    else {
      dialog.removeAttribute('open');
      triggerRef.current?.focus();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        className={`s03-info-trigger ${className}`.trim()}
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        aria-controls={dialogId}
        onClick={open}
      >
        {trigger}
      </button>
      <dialog
        ref={dialogRef}
        id={dialogId}
        className={`s03-info-dialog ${dialogClassName}`.trim()}
        aria-label={label}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="s03-info-dialog__panel">
          <button className="s03-info-dialog__close" type="button" onClick={close}>
            Cerrar
          </button>
          {children}
        </div>
      </dialog>
    </>
  );
}
