export type ContentStatus = 'intake' | 'drafting' | 'reviewed' | 'published' | 'returned';
export type ContentVisibility = 'internal' | 'public';

export type Provenance =
  | {
      origin: 'obsidian';
      source_vault: string;
      source_note: string;
      source_heading: string;
      source_block?: string;
    }
  | {
      origin: 'repo';
      source_path: string;
      source_heading: string;
      source_block?: string;
    };

export type Rights = {
  status: 'original' | 'open-license' | 'permission';
  note: string;
  license?: string;
};

export type EditorialMetadata = {
  status: ContentStatus;
  visibility: ContentVisibility;
  publish_ready: boolean;
  rights: Rights;
};

export type CourseDefaults = {
  interactionMode: 'interactive' | 'direct';
  teacherMode: boolean;
  defaultView: 'presentation' | 'reading' | 'activities';
};

export type ReferenceContent = {
  id: string;
  title: string;
  authors?: readonly string[];
  institution?: string;
  year?: number;
  url?: string;
  doi?: string;
  location?: string;
};

export type BibliographyItem = {
  id: string;
  title: string;
  referenceIds: readonly string[];
};

export type BibliographyContent = {
  id: string;
  title: string;
  items: readonly BibliographyItem[];
};

export type RouteContent = {
  id: string;
  label: string;
};

export type StationContent = {
  id: string;
  title: string;
  purpose: string;
  unitIds: readonly string[];
  hash?: string;
  shortLabel?: string;
  tone?: string;
};

export type UnitContent = {
  id: string;
  function: string;
  title: string;
  idea: string;
  content: string;
  exampleIds: readonly string[];
  conceptIds: readonly string[];
  visualId?: string;
  cautionIds?: readonly string[];
  teacherQuestionIds?: readonly string[];
  activityId?: string;
  sourceIds?: readonly string[];
};

export type SessionContent = {
  id: string;
  title: string;
  summary: string;
  objectives: readonly string[];
  bibliography: BibliographyContent;
  stationIds: readonly string[];
  stations: Readonly<Record<string, StationContent>>;
  units: Readonly<Record<string, UnitContent>>;
  routes?: Readonly<Record<string, RouteContent>>;
  enabledRouteIds?: readonly string[];
  defaultRouteId?: string;
  provenance: Provenance;
  editorial: EditorialMetadata;
};

export type ExampleContent = {
  id: string;
  question: string;
  domain: string;
  representation: string;
  task: string;
  interpretation: string;
  limits: string;
  sourceIds: readonly string[];
  sessionIds?: readonly string[];
  unitIds?: readonly string[];
  assetIds?: readonly string[];
};

export type ConceptContent = {
  id: string;
  term: string;
  definition: string;
  sources: readonly string[];
  aliases?: readonly string[];
  development?: string;
};

export type AssetContent = {
  id: string;
  type: 'conceptual' | 'simulated' | 'observed';
  file: string;
  alt: string;
  caption: string;
  purpose: string;
  provenance: string;
  rights: Rights;
  width?: number;
  height?: number;
};

export type CourseContent = {
  id: string;
  identity: {
    id: string;
    title: string;
    institution?: string;
    description?: string;
  };
  defaults: CourseDefaults;
  enabledSessionIds: readonly string[];
  sessions: Readonly<Record<string, SessionContent>>;
  examples: Readonly<Record<string, ExampleContent>>;
  concepts: Readonly<Record<string, ConceptContent>>;
  references: Readonly<Record<string, ReferenceContent>>;
  assets?: Readonly<Record<string, AssetContent>>;
};

export type ContentIssue = {
  path: string;
  code: string;
  message: string;
};

export type ContentValidationResult = {
  valid: boolean;
  issues: readonly ContentIssue[];
};

type UnknownRecord = Record<string, unknown>;

const STATUS_VALUES: readonly ContentStatus[] = [
  'intake',
  'drafting',
  'reviewed',
  'published',
  'returned',
];

const PUBLIC_KINDS = ['session', 'concept', 'exercise'] as const;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPortablePath(value: unknown): value is string {
  return (
    isNonEmptyString(value) &&
    !/^[A-Za-z]:[\\/]/.test(value) &&
    !value.startsWith('/') &&
    !value.startsWith('file:')
  );
}

function addIssue(issues: ContentIssue[], path: string, code: string, message: string) {
  issues.push({ path, code, message });
}

function requiredString(value: unknown, path: string, issues: ContentIssue[]): value is string {
  if (!isNonEmptyString(value)) {
    addIssue(issues, path, 'required-string', 'debe ser una cadena no vacía.');
    return false;
  }
  return true;
}

function stringArray(
  value: unknown,
  path: string,
  issues: ContentIssue[],
  { allowEmpty = false } = {},
): string[] | null {
  if (!Array.isArray(value) || value.some((item) => !isNonEmptyString(item))) {
    addIssue(issues, path, 'string-array', 'debe ser un arreglo de cadenas no vacías.');
    return null;
  }
  if (!allowEmpty && value.length === 0) {
    addIssue(issues, path, 'non-empty-array', 'no puede estar vacío.');
    return null;
  }
  return value as string[];
}

function uniqueStrings(value: unknown, path: string, issues: ContentIssue[]) {
  const strings = stringArray(value, path, issues, { allowEmpty: true });
  if (!strings) return;
  const duplicates = strings.filter((item, index) => strings.indexOf(item) !== index);
  if (duplicates.length > 0) {
    addIssue(
      issues,
      path,
      'duplicate-id',
      `contiene IDs duplicados: ${[...new Set(duplicates)].join(', ')}.`,
    );
  }
}

function record(value: unknown, path: string, issues: ContentIssue[]): value is UnknownRecord {
  if (!isRecord(value)) {
    addIssue(issues, path, 'record', 'debe ser un objeto indexado por ID.');
    return false;
  }
  return true;
}

function validateRights(value: unknown, path: string, issues: ContentIssue[]) {
  if (!record(value, path, issues)) return;
  const status = value.status;
  if (!['original', 'open-license', 'permission'].includes(String(status))) {
    addIssue(
      issues,
      `${path}.status`,
      'rights-status',
      'debe ser original, open-license o permission.',
    );
  }
  requiredString(value.note, `${path}.note`, issues);
  if (status === 'open-license' || status === 'permission') {
    requiredString(value.license, `${path}.license`, issues);
  }
}

function validateProvenance(value: unknown, path: string, issues: ContentIssue[]) {
  if (!record(value, path, issues)) return;
  if (value.origin === 'obsidian') {
    requiredString(value.source_vault, `${path}.source_vault`, issues);
    if (!isPortablePath(value.source_note)) {
      addIssue(
        issues,
        `${path}.source_note`,
        'portable-path',
        'debe ser una ruta relativa al vault.',
      );
    }
    requiredString(value.source_heading, `${path}.source_heading`, issues);
    return;
  }
  if (value.origin === 'repo') {
    if (!isPortablePath(value.source_path)) {
      addIssue(
        issues,
        `${path}.source_path`,
        'portable-path',
        'debe ser una ruta relativa existente del repositorio.',
      );
    }
    requiredString(value.source_heading, `${path}.source_heading`, issues);
    return;
  }
  addIssue(issues, `${path}.origin`, 'origin', 'debe ser obsidian o repo.');
}

function validateEditorial(value: unknown, path: string, issues: ContentIssue[]) {
  if (!record(value, path, issues)) return;
  if (!STATUS_VALUES.includes(value.status as ContentStatus)) {
    addIssue(issues, `${path}.status`, 'status', `debe ser uno de: ${STATUS_VALUES.join(', ')}.`);
  }
  if (value.visibility !== 'internal' && value.visibility !== 'public') {
    addIssue(issues, `${path}.visibility`, 'visibility', 'debe ser internal o public.');
  }
  if (typeof value.publish_ready !== 'boolean') {
    addIssue(issues, `${path}.publish_ready`, 'publish-ready', 'debe ser booleano.');
  } else if (
    value.publish_ready &&
    (value.visibility !== 'public' || !['reviewed', 'published'].includes(String(value.status)))
  ) {
    addIssue(
      issues,
      `${path}.publish_ready`,
      'publish-state',
      'solo puede ser true con visibility public y status reviewed o published.',
    );
  }
  validateRights(value.rights, `${path}.rights`, issues);
}

function validateReferences(
  value: unknown,
  path: string,
  references: UnknownRecord,
  issues: ContentIssue[],
) {
  if (!record(value, path, issues)) return;
  for (const [id, reference] of Object.entries(value)) {
    const itemPath = `${path}.${id}`;
    if (!record(reference, itemPath, issues)) continue;
    if (reference.id !== id)
      addIssue(issues, `${itemPath}.id`, 'id-mismatch', 'debe coincidir con la clave.');
    requiredString(reference.title, `${itemPath}.title`, issues);
    if (!isNonEmptyString(reference.url) && !isNonEmptyString(reference.doi)) {
      addIssue(issues, itemPath, 'reference-location', 'requiere url o doi no vacío.');
    }
    if (reference.url !== undefined && !isNonEmptyString(reference.url)) {
      addIssue(issues, `${itemPath}.url`, 'reference-url', 'no puede ser una cadena vacía.');
    }
    if (reference.doi !== undefined && !isNonEmptyString(reference.doi)) {
      addIssue(issues, `${itemPath}.doi`, 'reference-doi', 'no puede ser una cadena vacía.');
    }
  }
  void references;
}

function validateExamples(
  value: unknown,
  path: string,
  references: UnknownRecord,
  assets: UnknownRecord,
  issues: ContentIssue[],
) {
  if (!record(value, path, issues)) return;
  for (const [id, example] of Object.entries(value)) {
    const itemPath = `${path}.${id}`;
    if (!record(example, itemPath, issues)) continue;
    if (example.id !== id)
      addIssue(issues, `${itemPath}.id`, 'id-mismatch', 'debe coincidir con la clave.');
    for (const field of [
      'question',
      'domain',
      'representation',
      'task',
      'interpretation',
      'limits',
    ]) {
      requiredString(example[field], `${itemPath}.${field}`, issues);
    }
    const sourceIds = stringArray(example.sourceIds, `${itemPath}.sourceIds`, issues);
    if (sourceIds) {
      for (const sourceId of sourceIds) {
        if (!references[sourceId]) {
          addIssue(
            issues,
            `${itemPath}.sourceIds`,
            'missing-reference',
            `no existe la referencia ${sourceId}.`,
          );
        }
      }
    }
    if (example.assetIds !== undefined) {
      const assetIds = stringArray(example.assetIds, `${itemPath}.assetIds`, issues, {
        allowEmpty: true,
      });
      if (assetIds) {
        for (const assetId of assetIds) {
          if (!assets[assetId]) {
            addIssue(
              issues,
              `${itemPath}.assetIds`,
              'missing-asset',
              `no existe el asset ${assetId}.`,
            );
          }
        }
      }
    }
  }
}

function validateConcepts(
  value: unknown,
  path: string,
  references: UnknownRecord,
  issues: ContentIssue[],
) {
  if (!record(value, path, issues)) return;
  for (const [id, concept] of Object.entries(value)) {
    const itemPath = `${path}.${id}`;
    if (!record(concept, itemPath, issues)) continue;
    if (concept.id !== id)
      addIssue(issues, `${itemPath}.id`, 'id-mismatch', 'debe coincidir con la clave.');
    requiredString(concept.term, `${itemPath}.term`, issues);
    requiredString(concept.definition, `${itemPath}.definition`, issues);
    const sources = stringArray(concept.sources, `${itemPath}.sources`, issues);
    if (sources) {
      for (const sourceId of sources) {
        if (!references[sourceId]) {
          addIssue(
            issues,
            `${itemPath}.sources`,
            'missing-reference',
            `no existe la referencia ${sourceId}.`,
          );
        }
      }
    }
  }
}

function validateSession(
  value: unknown,
  path: string,
  id: string,
  examples: UnknownRecord,
  concepts: UnknownRecord,
  references: UnknownRecord,
  issues: ContentIssue[],
) {
  if (!record(value, path, issues)) return;
  if (value.id !== id)
    addIssue(issues, `${path}.id`, 'id-mismatch', 'debe coincidir con la clave.');
  for (const field of ['title', 'summary'])
    requiredString(value[field], `${path}.${field}`, issues);
  stringArray(value.objectives, `${path}.objectives`, issues);
  validateProvenance(value.provenance, `${path}.provenance`, issues);
  validateEditorial(value.editorial, `${path}.editorial`, issues);

  if (!record(value.bibliography, `${path}.bibliography`, issues)) return;
  const bibliography = value.bibliography;
  requiredString(bibliography.id, `${path}.bibliography.id`, issues);
  requiredString(bibliography.title, `${path}.bibliography.title`, issues);
  if (!Array.isArray(bibliography.items) || bibliography.items.length === 0) {
    addIssue(
      issues,
      `${path}.bibliography.items`,
      'bibliography-required',
      'requiere al menos un material.',
    );
  } else {
    for (const [index, rawItem] of bibliography.items.entries()) {
      const itemPath = `${path}.bibliography.items[${index}]`;
      if (!record(rawItem, itemPath, issues)) continue;
      requiredString(rawItem.id, `${itemPath}.id`, issues);
      requiredString(rawItem.title, `${itemPath}.title`, issues);
      const refIds = stringArray(rawItem.referenceIds, `${itemPath}.referenceIds`, issues);
      if (refIds) {
        for (const referenceId of refIds) {
          if (!references[referenceId]) {
            addIssue(
              issues,
              `${itemPath}.referenceIds`,
              'missing-reference',
              `no existe la referencia ${referenceId}.`,
            );
          }
        }
      }
    }
  }

  if (!record(value.units, `${path}.units`, issues)) return;
  const units = value.units;
  for (const [unitId, rawUnit] of Object.entries(units)) {
    const unitPath = `${path}.units.${unitId}`;
    if (!record(rawUnit, unitPath, issues)) continue;
    if (rawUnit.id !== unitId)
      addIssue(issues, `${unitPath}.id`, 'id-mismatch', 'debe coincidir con la clave.');
    for (const field of ['function', 'title', 'idea', 'content']) {
      requiredString(rawUnit[field], `${unitPath}.${field}`, issues);
    }
    const exampleIds = stringArray(rawUnit.exampleIds, `${unitPath}.exampleIds`, issues);
    if (exampleIds) {
      for (const exampleId of exampleIds) {
        if (!examples[exampleId]) {
          addIssue(
            issues,
            `${unitPath}.exampleIds`,
            'missing-example',
            `no existe el ejemplo ${exampleId}.`,
          );
        }
      }
    }
    const conceptIds = stringArray(rawUnit.conceptIds, `${unitPath}.conceptIds`, issues, {
      allowEmpty: true,
    });
    if (conceptIds) {
      for (const conceptId of conceptIds) {
        if (!concepts[conceptId]) {
          addIssue(
            issues,
            `${unitPath}.conceptIds`,
            'missing-concept',
            `no existe el concepto ${conceptId}.`,
          );
        }
      }
    }
    for (const field of ['sourceIds', 'cautionIds', 'teacherQuestionIds']) {
      if (rawUnit[field] !== undefined)
        stringArray(rawUnit[field], `${unitPath}.${field}`, issues, { allowEmpty: true });
    }
  }

  if (!record(value.stations, `${path}.stations`, issues)) return;
  uniqueStrings(value.stationIds, `${path}.stationIds`, issues);
  const stationIds = Array.isArray(value.stationIds) ? value.stationIds : [];
  for (const stationId of stationIds) {
    if (!value.stations[stationId]) {
      addIssue(
        issues,
        `${path}.stationIds`,
        'missing-station',
        `no existe la estación ${stationId}.`,
      );
    }
  }
  for (const [stationId, rawStation] of Object.entries(value.stations)) {
    const stationPath = `${path}.stations.${stationId}`;
    if (!record(rawStation, stationPath, issues)) continue;
    if (rawStation.id !== stationId)
      addIssue(issues, `${stationPath}.id`, 'id-mismatch', 'debe coincidir con la clave.');
    for (const field of ['title', 'purpose'])
      requiredString(rawStation[field], `${stationPath}.${field}`, issues);
    const unitIds = stringArray(rawStation.unitIds, `${stationPath}.unitIds`, issues);
    if (unitIds) {
      for (const unitId of unitIds) {
        if (!units[unitId])
          addIssue(
            issues,
            `${stationPath}.unitIds`,
            'missing-unit',
            `no existe la unidad ${unitId}.`,
          );
      }
    }
  }

  if (value.routes !== undefined) {
    if (!record(value.routes, `${path}.routes`, issues)) return;
    for (const [routeId, rawRoute] of Object.entries(value.routes)) {
      const routePath = `${path}.routes.${routeId}`;
      if (!record(rawRoute, routePath, issues)) continue;
      if (rawRoute.id !== routeId)
        addIssue(issues, `${routePath}.id`, 'id-mismatch', 'debe coincidir con la clave.');
      requiredString(rawRoute.label, `${routePath}.label`, issues);
    }
  }
  if (value.enabledRouteIds !== undefined) {
    uniqueStrings(value.enabledRouteIds, `${path}.enabledRouteIds`, issues);
    const enabled = Array.isArray(value.enabledRouteIds) ? value.enabledRouteIds : [];
    if (enabled.length === 0 && value.routes !== undefined) {
      addIssue(
        issues,
        `${path}.enabledRouteIds`,
        'empty-routes',
        'una sesión con rutas no puede habilitar una lista vacía.',
      );
    }
    for (const routeId of enabled) {
      if (!isRecord(value.routes) || !value.routes[routeId]) {
        addIssue(
          issues,
          `${path}.enabledRouteIds`,
          'missing-route',
          `no existe la ruta ${routeId}.`,
        );
      }
    }
  }
  if (value.defaultRouteId !== undefined) {
    requiredString(value.defaultRouteId, `${path}.defaultRouteId`, issues);
    if (
      Array.isArray(value.enabledRouteIds) &&
      !value.enabledRouteIds.includes(value.defaultRouteId)
    ) {
      addIssue(
        issues,
        `${path}.defaultRouteId`,
        'disabled-route',
        'debe pertenecer a enabledRouteIds.',
      );
    }
  }
}

export function validateCourseContent(value: unknown): ContentValidationResult {
  const issues: ContentIssue[] = [];
  if (!record(value, '/', issues)) return { valid: false, issues };
  requiredString(value.id, '/id', issues);
  if (!record(value.identity, '/identity', issues)) return { valid: false, issues };
  requiredString(value.identity.id, '/identity/id', issues);
  requiredString(value.identity.title, '/identity/title', issues);
  if (!record(value.defaults, '/defaults', issues)) return { valid: false, issues };
  if (!['interactive', 'direct'].includes(String(value.defaults.interactionMode))) {
    addIssue(
      issues,
      '/defaults/interactionMode',
      'interaction-mode',
      'debe ser interactive o direct.',
    );
  }
  if (typeof value.defaults.teacherMode !== 'boolean') {
    addIssue(issues, '/defaults/teacherMode', 'teacher-mode', 'debe ser booleano.');
  }
  if (!['presentation', 'reading', 'activities'].includes(String(value.defaults.defaultView))) {
    addIssue(
      issues,
      '/defaults/defaultView',
      'display-mode',
      'debe ser presentation, reading o activities.',
    );
  }

  if (!record(value.sessions, '/sessions', issues)) return { valid: false, issues };
  if (!record(value.examples, '/examples', issues)) return { valid: false, issues };
  if (!record(value.concepts, '/concepts', issues)) return { valid: false, issues };
  if (!record(value.references, '/references', issues)) return { valid: false, issues };
  const assets =
    value.assets === undefined ? {} : record(value.assets, '/assets', issues) ? value.assets : {};
  validateReferences(value.references, '/references', value.references, issues);
  validateExamples(value.examples, '/examples', value.references, assets, issues);
  validateConcepts(value.concepts, '/concepts', value.references, issues);

  uniqueStrings(value.enabledSessionIds, '/enabledSessionIds', issues);
  const enabledSessionIds = Array.isArray(value.enabledSessionIds) ? value.enabledSessionIds : [];
  for (const sessionId of enabledSessionIds) {
    if (!value.sessions[sessionId]) {
      addIssue(
        issues,
        '/enabledSessionIds',
        'missing-session',
        `no existe la sesión ${sessionId}.`,
      );
    }
  }
  for (const [sessionId, session] of Object.entries(value.sessions)) {
    validateSession(
      session,
      `/sessions/${sessionId}`,
      sessionId,
      value.examples,
      value.concepts,
      value.references,
      issues,
    );
  }
  return { valid: issues.length === 0, issues };
}

export function formatContentIssues(issues: readonly ContentIssue[]): string {
  return issues.map((issue) => `${issue.path} [${issue.code}] ${issue.message}`).join('; ');
}

export function assertCourseContent(value: unknown): asserts value is CourseContent {
  const result = validateCourseContent(value);
  if (!result.valid)
    throw new Error(`Contenido de curso inválido: ${formatContentIssues(result.issues)}`);
}

export function validatePublicContentMetadata(value: unknown): ContentValidationResult {
  const issues: ContentIssue[] = [];
  if (!record(value, '/', issues)) return { valid: false, issues };
  for (const field of ['title', 'summary']) requiredString(value[field], `/${field}`, issues);
  if (!PUBLIC_KINDS.includes(value.kind as (typeof PUBLIC_KINDS)[number])) {
    addIssue(issues, '/kind', 'public-kind', 'debe ser session, concept o exercise.');
  }
  if (!['reviewed', 'published'].includes(String(value.status))) {
    addIssue(issues, '/status', 'public-status', 'debe ser reviewed o published.');
  }
  if (value.visibility !== 'public')
    addIssue(issues, '/visibility', 'public-visibility', 'debe ser public.');
  if (value.publish_ready !== true)
    addIssue(issues, '/publish_ready', 'public-ready', 'debe ser true.');
  validateRights(value.rights, '/rights', issues);
  if (value.origin === 'repo') {
    validateProvenance(value, '/', issues);
  } else {
    if (!isPortablePath(value.source_note))
      addIssue(issues, '/source_note', 'portable-path', 'debe ser relativa al vault.');
    requiredString(value.source_vault, '/source_vault', issues);
    requiredString(value.source_heading, '/source_heading', issues);
  }
  return { valid: issues.length === 0, issues };
}
