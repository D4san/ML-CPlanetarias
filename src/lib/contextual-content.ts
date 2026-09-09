export interface ConceptTermRecord {
  id: string;
  title: string;
  summary: string;
  aliases?: readonly string[];
}

export interface ConceptTermData {
  id: string;
  term: string;
  shortDefinition: string;
  aliases: readonly string[];
  fullHref: string;
}

export interface ContextualExampleRecord {
  id: string;
  question: string;
  domain: string;
  representation: string;
  task?: string;
  paradigm_task?: string;
  model?: string;
  baseline?: string;
  output: string;
  evaluation?: string;
  interpretation: string;
  limits: string;
  sourceIds?: readonly string[];
  claim_status?: string;
  next_action?: string;
}

export type ContextualExampleStatus = 'verificado' | 'parcial' | 'pendiente';

export interface ContextualExampleSource {
  id: string;
  title: string;
  url?: string;
  location?: string;
  status: ContextualExampleStatus;
  claim_limit?: string;
}

export function toConceptTermData(record: ConceptTermRecord, fullHref: string): ConceptTermData {
  return {
    id: record.id,
    term: record.title,
    shortDefinition: record.summary,
    aliases: record.aliases ?? [],
    fullHref,
  };
}

export function getExampleTask(example: Pick<ContextualExampleRecord, 'task' | 'paradigm_task'>) {
  if (typeof example.task === 'string') return example.task;
  if (typeof example.paradigm_task === 'string') return example.paradigm_task;
  return '';
}

export function isRenderableExample(value: unknown): value is ContextualExampleRecord {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const example = value as Partial<ContextualExampleRecord>;
  const required = [
    example.id,
    example.question,
    example.domain,
    example.representation,
    example.output,
    example.interpretation,
    example.limits,
  ];
  return (
    required.every((item) => typeof item === 'string' && item.trim().length > 0) &&
    getExampleTask(example).trim().length > 0 &&
    (example.sourceIds === undefined ||
      (Array.isArray(example.sourceIds) &&
        example.sourceIds.every((item) => typeof item === 'string' && item.trim().length > 0)))
  );
}

export function isSafeExternalHref(value: unknown): value is string {
  if (typeof value !== 'string' || value.trim() === '') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function contextualDomId(prefix: string, value: string): string {
  const normalized = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${prefix}-${normalized || 'item'}`;
}

export function exampleAnchorId(exampleId: string): string {
  return contextualDomId('example', exampleId);
}
