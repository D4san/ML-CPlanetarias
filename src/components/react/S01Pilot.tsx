import { createPortal } from 'react-dom';
import { createContext, useContext, type RefObject } from 'react';
import katex from 'katex';
import { courseConfig } from '../../../config/course.config';
import {
  SessionBibliography as SharedSessionBibliography,
  TeacherPrompt as SharedTeacherPrompt,
  type SessionBibliographyProps,
} from './CourseContent';
import type { ResolvedCourseConfig } from '../../lib/course-config';
import { s01Bibliography } from '../../lib/pedagogical-content';
import type { TeacherPromptContent } from '../../lib/pedagogical-content';
import type { S01InstanceTermId, S01ScenarioId, S01Stop } from '../../lib/s01-journey';
import { withBase } from '../../lib/urls';

export { CautionBox } from './CourseContent';
export type {
  BibliographyReference,
  CautionContent,
  SessionBibliographyContent,
  TeacherPromptContent,
  TeacherPromptIntent,
} from './CourseContent';

export const CourseContext = createContext<ResolvedCourseConfig>(courseConfig);
export const useCourseConfig = () => useContext(CourseContext);

export function MathExpression({
  tex,
  label,
  block = false,
}: {
  tex: string;
  label: string;
  block?: boolean;
}) {
  return (
    <span
      className={block ? 's01-math s01-math--block' : 's01-math'}
      role="math"
      aria-label={label}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode: block,
          output: 'htmlAndMathml',
          throwOnError: false,
        }),
      }}
    />
  );
}

export interface DefinitionCardItem {
  label: string;
  question: string;
  definition: string;
  example: string;
  notation?: string;
}

export function DefinitionCardDialog({
  item,
  definitionVisible,
  flipButtonRef,
  onFlip,
  onClose,
}: {
  item: DefinitionCardItem;
  definitionVisible: boolean;
  flipButtonRef: RefObject<HTMLButtonElement | null>;
  onFlip: () => void;
  onClose: () => void;
}) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="s01-outcome-dialog"
      role="dialog"
      aria-label={`Tarjeta de ${item.label}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
    >
      <article className="s01-outcome-card">
        <button
          type="button"
          className="s01-outcome-card__close"
          aria-label={`Cerrar tarjeta de ${item.label}`}
          onClick={onClose}
        >
          Cerrar
        </button>
        <div className="s01-outcome-card__stage" data-flipped={definitionVisible}>
          <section className="s01-outcome-card__face" aria-hidden={definitionVisible}>
            <p className="s01-mini-label">Concepto seleccionado</p>
            {item.notation && (
              <MathExpression tex={item.notation} label={`Símbolo de ${item.label}`} />
            )}
            <h4>{item.label}</h4>
            <p>{item.question}</p>
          </section>
          <section
            className="s01-outcome-card__face s01-outcome-card__face--back"
            aria-hidden={!definitionVisible}
          >
            <p className="s01-mini-label">Definición de trabajo</p>
            {item.notation && (
              <MathExpression tex={item.notation} label={`Símbolo de ${item.label}`} />
            )}
            <h4>{item.label}</h4>
            <p>{item.definition}</p>
            <small>{item.example}</small>
          </section>
        </div>
        <button
          ref={flipButtonRef}
          type="button"
          className="s01-outcome-card__flip"
          onClick={onFlip}
        >
          {definitionVisible ? 'Volver al frente' : 'Voltear: ver definición'}
        </button>
      </article>
    </div>,
    document.body,
  );
}

function intentForStop(stop: S01Stop): TeacherPromptContent['intent'] {
  if (stop.id === 'question') return 'opening';
  if (stop.id === 'evidence') return 'transfer';
  return 'diagnostic';
}

const s01PromptUnitIds: Record<S01Stop['id'], string> = {
  question: 's01-question-opening',
  instance: 's01-instance-opening',
  signal: 's01-signal-opening',
  task: 's01-task-opening',
  family: 's01-family-opening',
  domain: 's01-domain-opening',
  evidence: 's01-evidence-opening',
};

export function TeacherPrompt({ stop, prompt }: { stop?: S01Stop; prompt?: TeacherPromptContent }) {
  const { teacherMode } = useCourseConfig();
  const resolvedPrompt =
    prompt ??
    (stop
      ? {
          id: `s01-teacher-${stop.id}`,
          intent: intentForStop(stop),
          question: stop.tutorPrompt,
          guidance: stop.repair,
          unitId: s01PromptUnitIds[stop.id],
        }
      : undefined);
  if (!resolvedPrompt) return null;
  return (
    <SharedTeacherPrompt
      prompt={resolvedPrompt}
      teacherMode={teacherMode}
      className="s01-teacher-prompt"
    />
  );
}

export function DirectDefinitions({
  items,
  prefix,
}: {
  items: readonly { id: string; label: string; definition: string; example: string }[];
  prefix: string;
}) {
  return (
    <div className="s01-direct-definitions" aria-label="Definiciones y ejemplos visibles">
      {items.map((item) => (
        <article key={item.id} id={`${prefix}-${item.id}`} tabIndex={-1}>
          <h4>{item.label}</h4>
          <p>{item.definition}</p>
          <p className="s01-direct-example">
            <strong>Ejemplo.</strong> {item.example}
          </p>
        </article>
      ))}
    </div>
  );
}

export function focusDefinition(prefix: string, id: string) {
  const target = document.getElementById(`${prefix}-${id}`);
  target?.focus();
  target?.scrollIntoView?.({ block: 'nearest' });
}

export function SessionBibliography(overrides: Partial<SessionBibliographyProps> = {}) {
  return (
    <SharedSessionBibliography
      {...s01Bibliography}
      {...overrides}
      className={['s01-bibliography', overrides.className].filter(Boolean).join(' ')}
    />
  );
}

export const instanceExamples: Record<S01ScenarioId, Record<S01InstanceTermId, string>> = {
  spectrum: {
    instance: 'Un espectro de la atmósfera de un exoplaneta.',
    observation: 'Señal espectral registrada durante la observación.',
    representation: 'Un vector con la señal en canales de longitud de onda.',
    target: 'Abundancia usada para generar cada espectro de entrenamiento sintético.',
    signal: 'Pares de espectro sintético y abundancia conocida al simular.',
    model: 'Relación ajustada desde el vector espectral a la abundancia.',
    output: 'Abundancia estimada para un espectro nuevo; requiere evaluación.',
  },
  catalog: {
    instance: 'Un exoplaneta del catálogo.',
    observation: 'Registros disponibles de su período, radio y otras propiedades.',
    representation: 'Una fila de variables comparables, con faltantes tratados explícitamente.',
    target: 'Esta ruta no proporciona una etiqueta de grupo por planeta.',
    signal: 'Similitudes entre los registros; no hay una clase objetivo por fila.',
    model: 'Relación que organiza las representaciones según su similitud.',
    output: 'Grupo o puntuación de rareza; no demuestra una clase física.',
  },
  followup: {
    instance: 'Una decisión de seguimiento de un candidato exoplanetario.',
    observation: 'Visibilidad del candidato y condiciones del instrumento.',
    representation: 'Estado que reúne tiempo disponible e información del candidato.',
    target: 'Esta ruta aprende de consecuencias; no recibe una acción correcta por caso.',
    signal: 'Recompensa definida a partir de la utilidad de la observación.',
    model: 'Política ajustada que propone una acción desde el estado.',
    output: 'Elegir el candidato o momento de la siguiente observación.',
  },
};

export function InstanceMiniature({
  termId,
  scenarioId,
}: {
  termId: S01InstanceTermId;
  scenarioId: S01ScenarioId;
}) {
  const assetName = termId === 'output' ? `output-${scenarioId}` : termId;
  return (
    <img
      className="s01-instance-miniature"
      src={withBase(`/images/s01/instance-miniatures/${assetName}.png`)}
      aria-hidden="true"
      alt=""
      draggable="false"
    />
  );
}
