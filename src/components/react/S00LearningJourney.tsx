import { useEffect, useMemo, useState } from 'react';

import {
  defineCourseConfig,
  type CourseConfig,
  type CourseDisplayMode,
} from '../../lib/course-config';
import {
  getS00Part,
  getS00Parts,
  getS00SlideHash,
  getS00SlideIndex,
  getS00SlideIndexFromHash,
  getS00SlideNumber,
  s00Bibliography,
  s00Concepts,
  s00Glossary,
  s00Slides,
  s00Units,
  s00VisualAssets,
  type S00Branch,
  type S00ImpactCase,
  type S00Part,
  type S00Slide,
  type S00Unit,
} from '../../lib/s00-content';
import { CautionBox, SessionBibliography, TeacherPrompt } from './CourseContent';
import { ConceptTerm } from './ConceptTerm';
import SlideRail from './SlideRail';
import './course-content.css';
import './s00-learning-journey.css';

const activityItems = [
  {
    id: 'question',
    label: 'Acoté una curiosidad de exoplanetas con unidad, dato, salida y uso.',
    hint: 'Empieza por una frase amplia y subraya qué tendría que medir un instrumento.',
  },
  {
    id: 'measurement',
    label: 'Distinguí un observable de la propiedad física que quiero inferir.',
    hint: 'Usa dos verbos: registrar para la medición e inferir para el parámetro.',
  },
  {
    id: 'representation',
    label: 'Elegí una representación y nombré el riesgo dominante del dato.',
    hint: 'Una curva, un espectro, una imagen y un catálogo conservan estructuras distintas.',
  },
  {
    id: 'task',
    label: 'Elegí un verbo de ML y escribí la salida que debería devolver.',
    hint: 'Detectar, clasificar, estimar, describir y priorizar no producen el mismo objeto.',
  },
  {
    id: 'limit',
    label: 'Añadí una evaluación y un límite a una afirmación del modelo.',
    hint: 'Pregunta qué conjunto produjo la cifra, qué compara y qué queda fuera.',
  },
] as const;

type ActivityState = Record<(typeof activityItems)[number]['id'], boolean>;

function emptyActivityState(): ActivityState {
  return {
    question: false,
    measurement: false,
    representation: false,
    task: false,
    limit: false,
  };
}

const scienceQuestions = [
  {
    label: 'Origen',
    body: '¿Cómo se forman los mundos?',
    tone: 'question',
  },
  {
    label: 'Estructura',
    body: '¿De qué están hechos y cómo se organizan?',
    tone: 'data',
  },
  {
    label: 'Evolución',
    body: '¿Cómo cambian con el tiempo?',
    tone: 'model',
  },
  {
    label: 'Habitabilidad',
    body: '¿Qué condiciones pueden sostener?',
    tone: 'transfer',
  },
] as const;

const measurementCards = [
  {
    symbol: 'Δ brillo',
    title: 'Tránsito',
    body: 'Brillo aparente a lo largo del tiempo.',
    inference: 'Radio relativo, periodo y geometría.',
    visual: 'light-curve' as const,
  },
  {
    symbol: 'Δ velocidad',
    title: 'Velocidad radial',
    body: 'Movimiento de la estrella en la línea de visión.',
    inference: 'Masa mínima y dinámica orbital.',
    visual: null,
  },
  {
    symbol: 'F(λ)',
    title: 'Espectro',
    body: 'Señal distribuida por longitud de onda.',
    inference: 'Propiedades de la atmósfera o la estrella.',
    visual: 'spectrum' as const,
  },
  {
    symbol: 'I(x,y)',
    title: 'Imagen',
    body: 'Estructura espacial alrededor de una fuente.',
    inference: 'Compañero, disco o señal separada.',
    visual: null,
  },
] as const;

const verbCards = [
  {
    id: 'detectar',
    label: 'Detectar',
    output: 'señal compatible',
    example: '¿Hay un tránsito escondido en esta curva?',
    tone: 'data',
  },
  {
    id: 'clasificar',
    label: 'Clasificar',
    output: 'clase o probabilidad',
    example: '¿Qué candidato se parece a un tránsito?',
    tone: 'model',
  },
  {
    id: 'estimar',
    label: 'Estimar',
    output: 'parámetro o posterior',
    example: '¿Qué composición es compatible con el espectro?',
    tone: 'decision',
  },
  {
    id: 'describir',
    label: 'Describir',
    output: 'grupo o representación',
    example: '¿Qué familias aparecen en la población?',
    tone: 'transfer',
  },
  {
    id: 'priorizar',
    label: 'Priorizar',
    output: 'ranking o acción',
    example: '¿Qué caso merece observación de seguimiento?',
    tone: 'limit',
  },
] as const;

const closureSteps = [
  'Pregunta',
  'Medición',
  'Dato',
  'Representación',
  'Tarea',
  'Evaluación',
  'Límite',
] as const;

function assetUrl(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}

function ConceptStrip({ unit }: { unit: S00Unit }) {
  const concepts = s00Concepts.filter((concept) => unit.conceptIds.includes(concept.id));
  if (concepts.length === 0) return null;
  return (
    <div className="s00-focus__concepts" aria-label={'Conceptos de ' + unit.title}>
      {concepts.map((concept) => (
        <ConceptTerm key={concept.id} concept={concept} />
      ))}
    </div>
  );
}

function Plot({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <img
      className={['s00-plot', className].filter(Boolean).join(' ')}
      src={assetUrl(src)}
      alt={alt}
      loading="lazy"
      width="1200"
      height="720"
    />
  );
}

function VisualFrame({
  unit,
  part,
  compact = false,
  selectedDataCardId,
  onSelectDataCard,
  selectedVerb,
  onSelectVerb,
  selectedImpactCaseId,
  onSelectImpactCase,
  selectedBranchId,
  onSelectBranch,
}: {
  unit: S00Unit;
  part?: S00Part | null;
  compact?: boolean;
  selectedDataCardId?: string;
  onSelectDataCard?: (id: string) => void;
  selectedVerb?: string;
  onSelectVerb?: (id: string) => void;
  selectedImpactCaseId?: string;
  onSelectImpactCase?: (id: string) => void;
  selectedBranchId?: string;
  onSelectBranch?: (id: string) => void;
}) {
  const interactive = !compact;
  const visualFocus = part?.visualFocus ?? 'overview';

  if (unit.visualKind === 'hero') {
    if (visualFocus === 'senal') {
      return (
        <div className="s00-visual s00-visual--hero s00-visual--hero-signal">
          <Plot
            src={s00VisualAssets.lightCurve}
            alt="Curva sintética de brillo normalizado con un descenso de tránsito ilustrativo."
          />
          <div className="s00-hero-card">
            <span>señal</span>
            <strong>Una sombra temporal puede abrir una pregunta sobre un mundo.</strong>
          </div>
        </div>
      );
    }

    if (visualFocus === 'pregunta') {
      return (
        <div className="s00-visual s00-visual--hero s00-visual--hero-question">
          <div className="s00-hero-question">
            <span>pregunta guía</span>
            <strong>
              ¿Qué podemos aprender de un mundo que casi nunca podemos observar directamente?
            </strong>
          </div>
          <div className="s00-question-result">
            <span>punto de partida</span>
            <strong>mundo → medición → evidencia</strong>
          </div>
        </div>
      );
    }

    return (
      <div className="s00-visual s00-visual--hero">
        <img
          src={assetUrl(s00VisualAssets.hero)}
          alt={unit.visualAlt}
          width="1798"
          height="727"
          loading={compact ? 'lazy' : 'eager'}
        />
        <div className="s00-visual__legend" aria-hidden="true">
          <span>mundo</span>
          <span>señal</span>
          <span>pregunta</span>
        </div>
      </div>
    );
  }

  if (unit.visualKind === 'planetary-science') {
    const displayedQuestions =
      visualFocus === 'overview'
        ? scienceQuestions
        : scienceQuestions.filter((item) => item.label.toLowerCase() === visualFocus);
    return (
      <div className="s00-visual s00-visual--science">
        <div className="s00-science-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div
          className={
            visualFocus === 'overview'
              ? 's00-science-grid'
              : 's00-science-grid s00-science-grid--focused'
          }
        >
          {displayedQuestions.map((item, index) => (
            <article
              className="s00-science-node"
              data-focused={visualFocus !== 'overview'}
              data-tone={item.tone}
              key={item.label}
            >
              <span className="s00-card-index">0{index + 1}</span>
              <h3>{item.label}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <p className="s00-visual__annotation">un mundo · muchas escalas de pregunta</p>
      </div>
    );
  }

  if (unit.visualKind === 'question-lab') {
    const steps = [
      ['curiosidad', '¿Hay planetas habitables?'],
      ['unidad', 'una curva de luz por estrella'],
      ['salida', 'score de señal compatible'],
      ['uso', 'priorizar revisión'],
    ];
    const displayedSteps =
      visualFocus === 'overview' ? steps : steps.filter(([label]) => label === visualFocus);
    return (
      <div className="s00-visual s00-visual--question">
        <ol
          className={
            visualFocus === 'overview'
              ? 's00-question-flow'
              : 's00-question-flow s00-question-flow--focused'
          }
        >
          {displayedSteps.map(([label, body], index) => (
            <li key={label}>
              <span className="s00-card-index">0{index + 1}</span>
              <span className="s00-question-flow__label">{label}</span>
              <strong>{body}</strong>
            </li>
          ))}
        </ol>
        <div className="s00-question-result">
          <span>criterio</span>
          <strong>¿Qué respuesta sería útil para el siguiente paso?</strong>
        </div>
      </div>
    );
  }

  if (unit.visualKind === 'measurement') {
    const displayedMeasurements =
      visualFocus === 'overview'
        ? measurementCards
        : measurementCards.filter((item) => {
            if (visualFocus === 'radial') return item.title === 'Velocidad radial';
            return item.title.toLowerCase() === visualFocus;
          });
    return (
      <div className="s00-visual s00-visual--measurement">
        <div
          className={
            visualFocus === 'overview'
              ? 's00-measurement-grid'
              : 's00-measurement-grid s00-measurement-grid--focused'
          }
        >
          {displayedMeasurements.map((item) => (
            <article className="s00-measurement-card" data-tone={item.title} key={item.title}>
              <div className="s00-measurement-card__top">
                <span className="s00-measurement-card__symbol">{item.symbol}</span>
                {item.visual === 'light-curve' && (
                  <Plot
                    src={s00VisualAssets.lightCurve}
                    alt="Curva sintética de brillo normalizado con un descenso de tránsito ilustrativo."
                    className="s00-plot--mini"
                  />
                )}
                {item.visual === 'spectrum' && (
                  <Plot
                    src={s00VisualAssets.spectrum}
                    alt="Espectro sintético con bandas de absorción ilustrativas."
                    className="s00-plot--mini"
                  />
                )}
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="s00-measurement-card__inference">{item.inference}</span>
            </article>
          ))}
        </div>
        <p className="s00-visual__annotation">observable ≠ parámetro físico</p>
      </div>
    );
  }

  if (unit.visualKind === 'data-landscape') {
    const cards = unit.dataCards ?? [];
    const selected = cards.find((card) => card.id === selectedDataCardId) ?? cards[0];
    return (
      <div className="s00-visual s00-visual--data">
        <div
          className="s00-data-stack"
          role={interactive ? 'listbox' : undefined}
          aria-label="Tipos de datos"
        >
          {cards.map((card, index) => {
            const isSelected = card.id === selected?.id;
            const content = (
              <>
                <span className="s00-card-index">0{index + 1}</span>
                <span>
                  <small>{card.kicker}</small>
                  <strong>{card.title}</strong>
                </span>
              </>
            );
            return interactive ? (
              <button
                className="s00-data-tab"
                data-tone={card.visual ?? 'model'}
                data-selected={isSelected}
                key={card.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelectDataCard?.(card.id)}
              >
                {content}
              </button>
            ) : (
              <div className="s00-data-tab" data-tone={card.visual ?? 'model'} key={card.id}>
                {content}
              </div>
            );
          })}
        </div>
        {selected && (
          <article className="s00-data-detail" aria-live={interactive ? 'polite' : undefined}>
            {selected.visual === 'light-curve' && (
              <Plot
                src={s00VisualAssets.lightCurve}
                alt="Curva sintética de tránsito; la señal es una demostración, no un dato observado."
              />
            )}
            <div className="s00-data-detail__copy">
              <p className="s00-data-detail__label">qué preguntar</p>
              <h3>{selected.question}</h3>
              <p>{selected.body}</p>
              <p className="s00-data-detail__risk">
                <strong>Riesgo dominante:</strong> {selected.risk}
              </p>
            </div>
          </article>
        )}
      </div>
    );
  }

  if (unit.visualKind === 'ml-verbs') {
    const selected = verbCards.find((card) => card.id === selectedVerb) ?? verbCards[0];
    return (
      <div className="s00-visual s00-visual--verbs">
        <div
          className="s00-verb-grid"
          role={interactive ? 'listbox' : undefined}
          aria-label="Verbos de ML"
        >
          {verbCards.map((card) => {
            const isSelected = card.id === selected?.id;
            const content = (
              <>
                <strong>{card.label}</strong>
                <span>{card.output}</span>
              </>
            );
            return interactive ? (
              <button
                className="s00-verb-card"
                data-tone={card.tone}
                data-selected={isSelected}
                key={card.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelectVerb?.(card.id)}
              >
                {content}
              </button>
            ) : (
              <div className="s00-verb-card" data-tone={card.tone} key={card.id}>
                {content}
              </div>
            );
          })}
        </div>
        {selected && (
          <article className="s00-verb-detail" aria-live={interactive ? 'polite' : undefined}>
            <span className="s00-verb-detail__label">caso para discutir</span>
            <h3>{selected.example}</h3>
            <p>
              Salida esperada: <strong>{selected.output}</strong>
            </p>
          </article>
        )}
      </div>
    );
  }

  if (unit.visualKind === 'impact-gallery') {
    const cases = unit.impactCases ?? [];
    const selected = cases.find((item) => item.id === selectedImpactCaseId) ?? cases[0];
    return (
      <div className="s00-visual s00-visual--impact">
        <Plot
          src={s00VisualAssets.impact}
          alt="Comparación sintética de escalas de impacto; los valores son demostrativos y no son resultados científicos."
          className="s00-plot--impact"
        />
        <div
          className="s00-impact-list"
          role={interactive ? 'listbox' : undefined}
          aria-label="Casos de impacto"
        >
          {cases.map((item) => {
            const isSelected = item.id === selected?.id;
            const content = (
              <>
                <span>{item.title}</span>
                <strong>{item.figure}</strong>
              </>
            );
            return interactive ? (
              <button
                className="s00-impact-tab"
                data-tone={item.tone}
                data-selected={isSelected}
                key={item.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelectImpactCase?.(item.id)}
              >
                {content}
              </button>
            ) : (
              <div className="s00-impact-tab" data-tone={item.tone} key={item.id}>
                {content}
              </div>
            );
          })}
        </div>
        {selected && <ImpactDetail item={selected} compact={compact} />}
      </div>
    );
  }

  if (unit.visualKind === 'branches') {
    const branches = unit.branches ?? [];
    const selected = branches.find((item) => item.id === selectedBranchId) ?? branches[0];
    return (
      <div className="s00-visual s00-visual--branches">
        <div className="s00-branch-orbit" aria-hidden="true">
          <span className="s00-branch-orbit__line s00-branch-orbit__line--one" />
          <span className="s00-branch-orbit__line s00-branch-orbit__line--two" />
          <span className="s00-branch-orbit__line s00-branch-orbit__line--three" />
        </div>
        <div
          className="s00-branch-grid"
          role={interactive ? 'listbox' : undefined}
          aria-label="Ramas del curso"
        >
          {branches.map((branch) => {
            const isSelected = branch.id === selected?.id;
            const content = (
              <>
                <span className="s00-branch-dot" aria-hidden="true" />
                <strong>{branch.label}</strong>
              </>
            );
            return interactive ? (
              <button
                className="s00-branch-card"
                data-tone={branch.tone}
                data-selected={isSelected}
                key={branch.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => onSelectBranch?.(branch.id)}
              >
                {content}
              </button>
            ) : (
              <div className="s00-branch-card" data-tone={branch.tone} key={branch.id}>
                {content}
              </div>
            );
          })}
        </div>
        {selected && <BranchDetail branch={selected} compact={compact} />}
      </div>
    );
  }

  const closureFocusLabels: Record<string, string> = {
    pregunta: 'Pregunta',
    medicion: 'Medición',
    dato: 'Dato',
    representacion: 'Representación',
    tarea: 'Tarea',
    evaluacion: 'Evaluación',
    limite: 'Límite',
  };
  const activeClosureStep = closureFocusLabels[visualFocus];

  return (
    <div className="s00-visual s00-visual--closure">
      <ol className="s00-closure-chain">
        {closureSteps.map((step, index) => (
          <li key={step} data-active={activeClosureStep === step} data-step={index + 1}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <div className="s00-closure-note">
        <span>salida</span>
        <strong>evidencia condicionada</strong>
        <small>datos · supuestos · evaluación · alcance</small>
      </div>
    </div>
  );
}

function ImpactDetail({ item, compact }: { item: S00ImpactCase; compact: boolean }) {
  return (
    <article className="s00-impact-detail" aria-live={compact ? undefined : 'polite'}>
      <div className="s00-impact-detail__metric">
        <span>cifra / salida</span>
        <strong>{item.figure}</strong>
      </div>
      <div className="s00-impact-detail__body">
        <h3>{item.title}</h3>
        <p>
          <strong>Problema:</strong> {item.problem}
        </p>
        <p>
          <strong>Intervención:</strong> {item.intervention}
        </p>
        <p className="s00-impact-detail__result">
          <strong>Resultado:</strong> {item.result}
        </p>
        <p className="s00-impact-detail__limit">
          <strong>Límite:</strong> {item.limit}
        </p>
        <p className="s00-impact-detail__source">Estado: {item.claimStatus}</p>
      </div>
    </article>
  );
}

function BranchDetail({ branch, compact }: { branch: S00Branch; compact: boolean }) {
  return (
    <article className="s00-branch-detail" aria-live={compact ? undefined : 'polite'}>
      <span className="s00-branch-detail__label">pregunta de la rama</span>
      <h3>{branch.question}</h3>
      <dl>
        <div>
          <dt>Producto</dt>
          <dd>{branch.product}</dd>
        </div>
        <div>
          <dt>Responsabilidad</dt>
          <dd>{branch.responsibility}</dd>
        </div>
      </dl>
    </article>
  );
}

function S00Focus({
  unit,
  part,
  slideNumber,
  teacherMode,
}: {
  unit: S00Unit;
  part: S00Part;
  slideNumber: string;
  teacherMode: boolean;
}) {
  return (
    <article className="s00-focus" data-tone={unit.tone} aria-labelledby="s00-focus-title">
      <div className="s00-focus__meta">
        <span>
          {slideNumber} / {String(s00Units.length).padStart(2, '0')}
        </span>
        <span>{unit.groupLabel}</span>
        <span>{part.label}</span>
      </div>
      <h2 id="s00-focus-title">{unit.title}</h2>
      <div className="s00-focus__question">
        <span>Pregunta</span>
        <p>{unit.question}</p>
      </div>
      <p className="s00-focus__idea">{unit.idea}</p>
      <p className="s00-focus__content">{unit.content}</p>
      <div className="s00-focus__reading">
        <p>
          <strong>Qué llevar:</strong> {unit.interpretation}
        </p>
        <p>
          <strong>Límite:</strong> {unit.limits}
        </p>
      </div>
      <ConceptStrip unit={unit} />
      {teacherMode && <TeacherPrompt prompt={unit.teacherPrompt} teacherMode={teacherMode} />}
    </article>
  );
}

function S00ReadingSection({
  unit,
  index,
  teacherMode,
}: {
  unit: S00Unit;
  index: number;
  teacherMode: boolean;
}) {
  return (
    <section
      className="s00-reading__section"
      data-tone={unit.tone}
      id={'s00-reading-' + unit.id}
      aria-labelledby={'s00-reading-' + unit.id + '-title'}
    >
      <div className="s00-reading__counter">
        {String(index + 1).padStart(2, '0')} / {String(s00Units.length).padStart(2, '0')} ·{' '}
        {unit.groupLabel}
      </div>
      <div className="s00-reading__grid">
        <div className="s00-reading__text">
          <p className="s00-reading__label">{unit.partLabel}</p>
          <h2 id={'s00-reading-' + unit.id + '-title'}>{unit.title}</h2>
          <div className="s00-reading__question">
            <span>Pregunta de lectura</span>
            <p>{unit.question}</p>
          </div>
          <p className="s00-reading__idea">{unit.idea}</p>
          <p>{unit.content}</p>
          <div className="s00-reading__interpretation">
            <p>
              <strong>Interpretación:</strong> {unit.interpretation}
            </p>
            <p>
              <strong>Límite:</strong> {unit.limits}
            </p>
          </div>
          <ConceptStrip unit={unit} />
          <CautionBox caution={unit.caution} />
          {teacherMode && <TeacherPrompt prompt={unit.teacherPrompt} teacherMode={teacherMode} />}
        </div>
        <div className="s00-reading__visual">
          <VisualFrame unit={unit} compact />
          <p className="s00-visual__caption">{unit.visualCaption}</p>
        </div>
      </div>
    </section>
  );
}

function S00Glossary() {
  return (
    <section className="s00-glossary" aria-labelledby="s00-glossary-title">
      <div>
        <p className="s00-reading__label">Vocabulario de la sesión</p>
        <h2 id="s00-glossary-title">Palabras para seguir la cadena</h2>
      </div>
      <dl>
        {s00Glossary.map((concept) => (
          <div id={'s00-glossary-' + concept.id} key={concept.id}>
            <dt>{concept.term}</dt>
            <dd>{concept.definition}</dd>
          </div>
        ))}
      </dl>
      <p className="s00-glossary__note">
        Estas definiciones son ayudas internas de S00 y preparan los conceptos que se formalizarán
        en sesiones posteriores.
      </p>
    </section>
  );
}

function S00Activities({
  state,
  onChange,
}: {
  state: ActivityState;
  onChange: (id: keyof ActivityState) => void;
}) {
  const completed = activityItems.filter((item) => state[item.id]).length;
  return (
    <section className="s00-activities" aria-labelledby="s00-activities-title">
      <div className="s00-activities__intro">
        <p className="s00-reading__label">Producto diagnóstico · 5 movimientos</p>
        <h2 id="s00-activities-title">Construye una cadena que se pueda discutir</h2>
        <p>
          Marca cada paso cuando puedas mostrarlo con un ejemplo. Las casillas conservan tu avance
          local; el resultado sigue siendo una producción de aprendizaje, no una validación
          científica.
        </p>
        <div className="s00-activities__status" role="status" aria-live="polite">
          {completed} de {activityItems.length} movimientos completados.
        </div>
      </div>
      <ol className="s00-activities__list">
        {activityItems.map((item, index) => (
          <li key={item.id} data-complete={state[item.id]}>
            <label>
              <span className="s00-activity-index">0{index + 1}</span>
              <input type="checkbox" checked={state[item.id]} onChange={() => onChange(item.id)} />
              <span className="s00-activity-copy">
                <strong>{item.label}</strong>
                <small>{item.hint}</small>
              </span>
            </label>
          </li>
        ))}
      </ol>
      <aside className="s00-activities__result">
        <span>Al finalizar</span>
        <strong>pregunta → dato → tarea → evaluación → límite</strong>
        <p>Usa esta secuencia como ticket de salida o como punto de partida para S01.</p>
      </aside>
    </section>
  );
}

function S00BibliographyStage() {
  return (
    <div className="s00-bibliography-stage">
      <div className="s00-bibliography-stage__lead">
        <span className="s00-stage-kicker">Fuentes de entrada</span>
        <h2>Una pregunta que todavía está abierta</h2>
        <p>
          Estas fuentes sostienen el mapa de ciencias planetarias, observaciones y aplicaciones de
          ML que recorreremos en nueve estaciones.
        </p>
      </div>
      <SessionBibliography {...s00Bibliography} />
    </div>
  );
}

export default function S00LearningJourney({ config }: { config: CourseConfig }) {
  const settings = useMemo(() => defineCourseConfig(config), [config]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [displayMode, setDisplayMode] = useState<CourseDisplayMode>(settings.defaultView);
  const [invalidHash, setInvalidHash] = useState(false);
  const [activityState, setActivityState] = useState<ActivityState>(emptyActivityState);
  const [selectedDataCardId, setSelectedDataCardId] = useState('observacion');
  const [selectedVerb, setSelectedVerb] = useState('detectar');
  const [selectedImpactCaseId, setSelectedImpactCaseId] = useState('astronet');
  const [selectedBranchId, setSelectedBranchId] = useState('astronomia');
  const activeSlide: S00Slide | undefined = activeIndex > 0 ? s00Slides[activeIndex] : undefined;
  const activeUnit = activeSlide ? s00Units[activeSlide.unitIndex] : undefined;
  const activePart = activeSlide
    ? getS00Part(activeSlide.unitId, activeSlide.partIndex)
    : undefined;
  const activeParts = activeUnit ? getS00Parts(activeUnit.id) : [];
  const activeVisualFocus = activePart?.visualFocus ?? 'overview';

  useEffect(() => {
    function syncLocation() {
      const mode = new URLSearchParams(window.location.search).get('modo');
      const resolvedMode: CourseDisplayMode =
        mode === 'lectura'
          ? 'reading'
          : mode === 'actividades'
            ? 'activities'
            : mode === 'presentacion'
              ? 'presentation'
              : settings.defaultView;
      setDisplayMode(resolvedMode);
      const index = getS00SlideIndexFromHash(window.location.hash);
      setInvalidHash(index === null);
      setActiveIndex(index === null ? 1 : index);
    }

    syncLocation();
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => {
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  }, [settings.defaultView]);

  useEffect(() => {
    setSelectedDataCardId(
      activeUnit?.visualKind === 'data-landscape' ? activeVisualFocus : 'observacion',
    );
    setSelectedVerb(activeUnit?.visualKind === 'ml-verbs' ? activeVisualFocus : 'detectar');
    setSelectedImpactCaseId(
      activeUnit?.visualKind === 'impact-gallery' ? activeVisualFocus : 'astronet',
    );
    setSelectedBranchId(activeUnit?.visualKind === 'branches' ? activeVisualFocus : 'astronomia');
  }, [activeIndex, activeUnit?.visualKind, activeVisualFocus]);

  function updateHash(index: number, replace = false) {
    const hash = getS00SlideHash(index);
    if (replace) window.history.replaceState(window.history.state, '', hash);
    else window.history.pushState(window.history.state, '', hash);
    setInvalidHash(false);
  }

  function selectSlide(index: number) {
    const boundedIndex = Math.min(Math.max(index, 0), s00Slides.length - 1);
    setActiveIndex(boundedIndex);
    updateHash(boundedIndex);
  }

  function changeDisplayMode(nextMode: CourseDisplayMode) {
    setDisplayMode(nextMode);
    const url = new URL(window.location.href);
    if (nextMode === 'reading') url.searchParams.set('modo', 'lectura');
    else if (nextMode === 'activities') url.searchParams.set('modo', 'actividades');
    else url.searchParams.delete('modo');
    window.history.pushState(window.history.state, '', url.pathname + url.search + url.hash);
  }

  function reset() {
    setActiveIndex(1);
    setInvalidHash(false);
    setActivityState(emptyActivityState());
    const url = new URL(window.location.href);
    url.hash = 'pregunta';
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  }

  const completedActivities = activityItems.filter((item) => activityState[item.id]).length;

  return (
    <section
      className="s00-journey"
      data-ready="true"
      data-session-id="S00"
      data-active-slide={activeIndex}
      data-slide-count={s00Slides.length}
      data-display-mode={displayMode}
      data-bibliography={activeIndex === 0}
      data-active-unit={activeSlide?.unitId}
      data-active-part={activeSlide?.partId}
      data-part-index={activeSlide?.partIndex ?? 0}
      data-interaction-mode={settings.interactionMode}
      aria-labelledby="s00-journey-title"
    >
      <header className="s00-journey__header">
        <div className="s00-journey__masthead">
          <p className="eyebrow">Sesión 0 · introducción · 90 min</p>
          <h1 id="s00-journey-title">De los mundos a los datos</h1>
          <p>Una señal débil, una pregunta científica, una cadena de decisiones.</p>
        </div>
        <div className="s00-journey__toggles">
          <button type="button" className="s00-overview-toggle" onClick={() => selectSlide(0)}>
            Fuentes
          </button>
          <div className="s00-display-switch" aria-label="Modo de lectura">
            <button
              type="button"
              aria-pressed={displayMode === 'presentation'}
              onClick={() => changeDisplayMode('presentation')}
            >
              Presentación
            </button>
            <button
              type="button"
              aria-pressed={displayMode === 'reading'}
              onClick={() => changeDisplayMode('reading')}
            >
              Lectura
            </button>
            <button
              type="button"
              aria-pressed={displayMode === 'activities'}
              onClick={() => changeDisplayMode('activities')}
            >
              Actividades
            </button>
          </div>
        </div>
      </header>

      {displayMode === 'presentation' && (
        <SlideRail
          slides={s00Slides}
          activeIndex={activeIndex}
          activeLabel={
            activeIndex === 0
              ? 'Fuentes'
              : activeUnit?.shortLabel === activePart?.label
                ? (activePart?.label ?? 'S00')
                : (activeUnit?.shortLabel ?? 'S00') + ' · ' + (activePart?.label ?? '')
          }
          className="slide-rail--s00-presentation"
          compactCaption
          ariaLabel="Diapositivas de S00"
          progressLabel="Avance de las diapositivas de S00"
          getIndexLabel={(slide) => getS00SlideNumber(slide)}
          getAriaLabel={(slide, index) =>
            index === 0
              ? '0. Fuentes de S00'
              : slide.partIndex === 0
                ? `${slide.unitIndex + 1}. ${slide.title}`
                : `Subslide ${getS00SlideNumber(slide)} · ${slide.groupLabel} · ${slide.partLabel}`
          }
          onSelect={(_slide, index) => selectSlide(index)}
        />
      )}

      {invalidHash && (
        <p className="s00-hash-notice" role="status">
          Ese punto todavía no existe en S00. Mostramos la primera estación y conservamos el
          recorrido disponible.
        </p>
      )}

      <div className="s00-journey__content">
        {displayMode === 'activities' ? (
          <S00Activities
            state={activityState}
            onChange={(id) => setActivityState((current) => ({ ...current, [id]: !current[id] }))}
          />
        ) : displayMode === 'reading' ? (
          <article className="s00-reading" aria-labelledby="s00-reading-title">
            <header className="s00-reading__header">
              <p className="s00-reading__label">Lectura lineal · nueve estaciones</p>
              <h2 id="s00-reading-title">La pregunta viaja con la evidencia</h2>
              <p>
                La lectura conserva la cadena completa, sus visuales, las fuentes y los límites.
                Cada estación tiene solo las partes que necesita para presentar su idea.
              </p>
            </header>
            <SessionBibliography {...s00Bibliography} />
            <div className="s00-reading__body">
              {s00Units.map((unit, index) => (
                <S00ReadingSection
                  key={unit.id}
                  unit={unit}
                  index={index}
                  teacherMode={settings.teacherMode}
                />
              ))}
            </div>
            <S00Glossary />
          </article>
        ) : activeIndex === 0 ? (
          <S00BibliographyStage />
        ) : activeUnit && activeSlide && activePart ? (
          <div
            className="s00-workspace"
            data-pilot={activeParts.length > 1}
            data-part-index={activeSlide.partIndex}
          >
            {activeParts.length > 1 && (
              <nav className="s00-parts" aria-label="Partes de la estación">
                {activeParts.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={index === activeSlide.partIndex ? 'step' : undefined}
                    onClick={() => selectSlide(getS00SlideIndex(activeUnit.id, index))}
                  >
                    {getS00SlideNumber({
                      unitId: activeUnit.id,
                      unitIndex: activeSlide.unitIndex,
                      partIndex: index,
                    })}{' '}
                    · {item.label}
                  </button>
                ))}
              </nav>
            )}
            <div className="s00-scene-deck">
              <section className="s00-scene" aria-labelledby="s00-scene-title">
                <div className="s00-scene__header">
                  <div>
                    <span className="s00-stage-kicker">Estación visual</span>
                    <h2 id="s00-scene-title">{activePart.label}</h2>
                  </div>
                  <span className="s00-scene__status">explorar · nombrar · limitar</span>
                </div>
                <VisualFrame
                  unit={activeUnit}
                  part={activePart}
                  selectedDataCardId={selectedDataCardId}
                  onSelectDataCard={setSelectedDataCardId}
                  selectedVerb={selectedVerb}
                  onSelectVerb={setSelectedVerb}
                  selectedImpactCaseId={selectedImpactCaseId}
                  onSelectImpactCase={setSelectedImpactCaseId}
                  selectedBranchId={selectedBranchId}
                  onSelectBranch={setSelectedBranchId}
                />
                <p className="s00-visual__caption">{activeUnit.visualCaption}</p>
              </section>
            </div>
            {(activeParts.length <= 1 || activeSlide.partIndex === 0) && (
              <S00Focus
                unit={activeUnit}
                part={activePart}
                slideNumber={getS00SlideNumber(activeSlide)}
                teacherMode={settings.teacherMode}
              />
            )}
          </div>
        ) : null}
      </div>

      <footer className="s00-journey__footer">
        <p className="s00-state-summary" aria-live="polite">
          {displayMode === 'activities'
            ? 'Rama de actividades. ' +
              completedActivities +
              ' de ' +
              activityItems.length +
              ' movimientos completados.'
            : activeIndex === 0
              ? 'Diapositiva 0. Fuentes de S00.'
              : 'Modo ' +
                (displayMode === 'reading' ? 'lectura lineal' : 'presentación') +
                '. Subpantalla ' +
                (activeSlide ? getS00SlideNumber(activeSlide) : 'S00') +
                ' de ' +
                s00Slides.length +
                ': ' +
                (activePart?.label ?? activeUnit?.title ?? 'S00') +
                '.'}
        </p>
        <div className="s00-journey__actions" aria-label="Controles del recorrido">
          {displayMode === 'presentation' ? (
            <>
              <button
                type="button"
                onClick={() => selectSlide(activeIndex - 1)}
                disabled={activeIndex === 0}
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => selectSlide(activeIndex + 1)}
                disabled={activeIndex === s00Slides.length - 1}
              >
                Siguiente →
              </button>
            </>
          ) : displayMode === 'reading' ? (
            <button
              type="button"
              onClick={() => document.getElementById('s00-reading-title')?.scrollIntoView()}
            >
              ↑ Volver al inicio
            </button>
          ) : (
            <button type="button" onClick={() => changeDisplayMode('presentation')}>
              ← Volver al recorrido
            </button>
          )}
          <button type="button" className="s00-reset" onClick={reset}>
            Reiniciar
          </button>
        </div>
      </footer>
    </section>
  );
}
