import {
  exampleAnchorId,
  getExampleTask,
  isRenderableExample,
  isSafeExternalHref,
  type ContextualExampleRecord,
  type ContextualExampleSource,
} from '../../lib/contextual-content';
import './course-content.css';

export interface ExampleLinkProps {
  example?: Pick<ContextualExampleRecord, 'id'> &
    Partial<Pick<ContextualExampleRecord, 'question'>>;
  href?: string;
  label?: string;
}

function exampleIdFromLink(example: ExampleLinkProps['example']): string | null {
  if (!example || typeof example.id !== 'string' || example.id.trim() === '') return null;
  return example.id.trim();
}

function isSafeExampleDestination(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const destination = value.trim();
  if (destination === '' || /[\s<>]/.test(destination)) return false;
  if (destination.startsWith('#')) return destination.length > 1;
  if (destination.startsWith('/') && !destination.startsWith('//')) return true;
  return isSafeExternalHref(destination);
}

export function ExampleLink({ example, href, label }: ExampleLinkProps) {
  const exampleId = exampleIdFromLink(example);
  const fallbackDestination = exampleId ? `#${exampleAnchorId(exampleId)}` : null;
  const requestedDestination = href?.trim();
  const destination = isSafeExampleDestination(requestedDestination)
    ? requestedDestination
    : fallbackDestination;
  if (!destination) return null;
  const visibleLabel =
    label?.trim() || (exampleId ? `Ver ejemplo: ${exampleId}` : 'Ver ficha del ejemplo');

  return (
    <a className="example-link" href={destination}>
      {visibleLabel}
    </a>
  );
}

export interface ExamplePanelProps {
  example: unknown;
  sources?: readonly ContextualExampleSource[];
  title?: string;
}

function SourceReference({ source }: { source: ContextualExampleSource }) {
  const href =
    source.status === 'pendiente' ? null : isSafeExternalHref(source.url) ? source.url : null;
  const statusLabel =
    source.status === 'verificado'
      ? 'verificada'
      : source.status === 'parcial'
        ? 'parcial'
        : 'pendiente de lectura';
  return (
    <li>
      {href ? (
        <a href={href}>{source.title} ↗</a>
      ) : (
        <span>
          {source.status === 'pendiente'
            ? `Fuente pendiente de lectura: ${source.title}`
            : `Fuente sin enlace verificable: ${source.title}`}
        </span>
      )}
      <span> · Estado: {statusLabel}.</span>
      {href && <small> Destino externo; se abre en esta pestaña.</small>}
      {source.location && <small> · {source.location}</small>}
      {source.claim_limit && <p>{source.claim_limit}</p>}
    </li>
  );
}

export function ExamplePanel({ example: rawExample, sources = [], title }: ExamplePanelProps) {
  if (!isRenderableExample(rawExample)) {
    return (
      <p className="contextual-example contextual-example--unavailable" role="status">
        Este ejemplo todavía no tiene una ficha válida para esta versión.
      </p>
    );
  }

  const example = rawExample;
  const panelId = exampleAnchorId(example.id);
  const headingId = `${panelId}-title`;
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  const sourceIds = example.sourceIds ?? [];

  return (
    <section
      id={panelId}
      className="contextual-example"
      aria-labelledby={headingId}
      data-example-id={example.id}
    >
      <header className="contextual-example__header">
        <span className="eyebrow">Ficha de ejemplo</span>
        <h3 id={headingId}>{title ?? `Ejemplo ${example.id}`}</h3>
      </header>
      <dl className="contextual-example__facts">
        <div>
          <dt>Pregunta</dt>
          <dd>{example.question}</dd>
        </div>
        <div>
          <dt>Dominio</dt>
          <dd>{example.domain}</dd>
        </div>
        <div>
          <dt>Observación y representación</dt>
          <dd>{example.representation}</dd>
        </div>
        <div>
          <dt>Tarea o uso</dt>
          <dd>{getExampleTask(example)}</dd>
        </div>
        {example.model && (
          <div>
            <dt>Modelo o mecanismo</dt>
            <dd>{example.model}</dd>
          </div>
        )}
        {example.baseline && (
          <div>
            <dt>Línea base</dt>
            <dd>{example.baseline}</dd>
          </div>
        )}
        <div>
          <dt>Resultado o uso</dt>
          <dd>{example.output}</dd>
        </div>
        {example.evaluation && (
          <div>
            <dt>Evaluación declarada</dt>
            <dd>{example.evaluation}</dd>
          </div>
        )}
        <div>
          <dt>Interpretación</dt>
          <dd>{example.interpretation}</dd>
        </div>
        <div className="contextual-example__limit">
          <dt>Límite</dt>
          <dd>{example.limits}</dd>
        </div>
      </dl>

      {(example.claim_status || example.next_action) && (
        <div className="contextual-example__status">
          {example.claim_status && (
            <p>
              <strong>Estado de la afirmación:</strong> {example.claim_status}
            </p>
          )}
          {example.next_action && (
            <p>
              <strong>Siguiente revisión:</strong> {example.next_action}
            </p>
          )}
        </div>
      )}

      <section className="contextual-example__sources" aria-labelledby={`${panelId}-sources-title`}>
        <h4 id={`${panelId}-sources-title`}>Fuente externa y alcance</h4>
        {sourceIds.length === 0 ? (
          <p>Este caso es una adaptación didáctica propia y no declara una fuente externa.</p>
        ) : (
          <ul>
            {sourceIds.map((sourceId) => {
              const source = sourceMap.get(sourceId);
              return source ? (
                <SourceReference key={source.id} source={source} />
              ) : (
                <li key={sourceId}>Fuente no disponible para esta versión: {sourceId}</li>
              );
            })}
          </ul>
        )}
      </section>
    </section>
  );
}

export function examplePanelId(exampleId: string): string {
  return exampleAnchorId(exampleId);
}
