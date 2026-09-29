import { useId, useState, type ReactNode } from 'react';

type AuditTopic = 'population' | 'measurement' | 'provenance';

const auditTopics: Array<{ id: AuditTopic; label: string; question: string }> = [
  { id: 'population', label: 'Población', question: '¿Qué planetas entran?' },
  { id: 'measurement', label: 'Medición', question: '¿Qué significa cada valor?' },
  { id: 'provenance', label: 'Procedencia', question: '¿De dónde viene el radio?' },
];

export default function S02DatasetAudit() {
  const [activeTopic, setActiveTopic] = useState<AuditTopic>('population');
  const id = useId();
  const panelId = `${id}-panel`;
  const activeLabel = auditTopics.find((topic) => topic.id === activeTopic)?.label ?? 'Población';

  return (
    <section className="s02-dataset-audit" aria-label="Auditoría visual de PSCompPars">
      <header className="s02-dataset-audit__catalog">
        <div>
          <p className="s02-dataset-audit__kicker">CATÁLOGO NASA · PSCompPars</p>
          <p className="s02-dataset-audit__catalog-summary">
            <strong>1 fila = 1 planeta</strong>
            <span> · parámetros reunidos de varias publicaciones</span>
          </p>
        </div>
        <p className="s02-dataset-audit__catalog-note">
          La tabla es más completa, aunque sus parámetros no siempre provienen de una misma
          solución.
        </p>
      </header>

      <div
        className="s02-dataset-audit__topics"
        role="group"
        aria-label="Preguntas para auditar una fila"
      >
        {auditTopics.map((topic, index) => (
          <button
            key={topic.id}
            className="s02-dataset-audit__topic"
            type="button"
            aria-pressed={activeTopic === topic.id}
            aria-controls={panelId}
            onClick={() => setActiveTopic(topic.id)}
          >
            <span className="s02-dataset-audit__topic-number">0{index + 1}</span>
            <span className="s02-dataset-audit__topic-label">{topic.label}</span>
            <span className="s02-dataset-audit__topic-question">{topic.question}</span>
          </button>
        ))}
      </div>

      <p className="s02-dataset-audit__announcement" aria-live="polite" aria-atomic="true">
        Explorando: {activeLabel}
      </p>

      <div
        className="s02-dataset-audit__panel"
        id={panelId}
        role="region"
        aria-label={`Explicación: ${activeLabel}`}
      >
        {activeTopic === 'population' && <PopulationPanel />}
        {activeTopic === 'measurement' && <MeasurementPanel />}
        {activeTopic === 'provenance' && <ProvenancePanel />}
      </div>

      <footer className="s02-dataset-audit__footer">
        <p>
          El filtro combina tránsito, banderas, procedencia, límites y datos disponibles. La muestra
          resultante no representa todo el catálogo.
        </p>
        <nav aria-label="Documentación del NASA Exoplanet Archive">
          <a href="https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html">
            Definiciones de columnas ↗
          </a>
          <a href="https://exoplanetarchive.ipac.caltech.edu/docs/pscp_calc.html">
            Cómo se calculan ↗
          </a>
        </nav>
      </footer>
    </section>
  );
}

function PopulationPanel() {
  return (
    <article className="s02-dataset-audit__detail" aria-labelledby="s02-audit-population-title">
      <div className="s02-dataset-audit__explanation">
        <p className="s02-dataset-audit__step">PREGUNTA 1 · A QUIÉN REPRESENTA LA MUESTRA</p>
        <h3 id="s02-audit-population-title">Primero definimos qué planetas comparamos</h3>
        <div className="s02-dataset-audit__fields">
          <AuditField name="tran_flag" meaning="1 = se detectó tránsito · 0 = no se detectó." />
          <AuditField
            name="pl_controv_flag"
            meaning="1 = la confirmación fue cuestionada en la literatura · 0 = no está marcada así."
          />
        </div>
      </div>
      <DecisionCard>
        <p>
          La consulta conserva <code>tran_flag = 1</code> y <code>pl_controv_flag = 0</code>.
          Trabajamos con planetas en tránsito cuyo estado no aparece marcado como cuestionado.
        </p>
        <strong>La conclusión se refiere a esta población filtrada.</strong>
      </DecisionCard>
    </article>
  );
}

function MeasurementPanel() {
  return (
    <article className="s02-dataset-audit__detail" aria-labelledby="s02-audit-measurement-title">
      <div className="s02-dataset-audit__explanation">
        <p className="s02-dataset-audit__step">PREGUNTA 2 · QUÉ TAN PRECISOS SON LOS VALORES</p>
        <h3 id="s02-audit-measurement-title">
          Un valor puede tener errores distintos arriba y abajo
        </h3>
        <UncertaintyDiagram />
        <div className="s02-dataset-audit__field-list">
          <span>
            <code>pl_bmasselim</code>, <code>pl_insollim</code>, <code>pl_radelim</code>: marcan
            límites.
          </span>
          <span>
            <code>pl_radeerr1</code> va arriba · <code>pl_radeerr2</code> abajo; masa e irradiación
            usan la misma convención.
          </span>
        </div>
      </div>
      <DecisionCard tone="limit">
        <p>
          <code>0</code> indica un valor central (=); <code>+1</code> y <code>-1</code> indican
          cotas (&gt; y &lt;). Si falta una bandera, el estado queda desconocido: el notebook la
          excluye y la cuenta por separado.
        </p>
        <strong>La muestra conserva solo filas con las tres banderas en 0.</strong>
      </DecisionCard>
    </article>
  );
}

function ProvenancePanel() {
  return (
    <article className="s02-dataset-audit__detail" aria-labelledby="s02-audit-provenance-title">
      <div className="s02-dataset-audit__explanation">
        <p className="s02-dataset-audit__step">PREGUNTA 3 · CÓMO SE OBTUVO CADA PARÁMETRO</p>
        <h3 id="s02-audit-provenance-title">La referencia también forma parte del dato</h3>
        <div className="s02-dataset-audit__fields">
          <AuditField
            name="pl_bmassprov"
            meaning="Indica si la mejor masa es Mass, M sin(i)/sin(i) o M sin(i)."
          />
          <AuditField
            name="pl_rade_reflink"
            meaning="Enlaza la referencia del radio; ‘Calculated Value’ identifica un valor calculado por el archivo."
          />
        </div>
      </div>
      <DecisionCard tone="branch">
        <p>
          La práctica pide <code>pl_bmassprov = Mass</code> y excluye radios con referencia{' '}
          <code>Calculated Value</code>.
        </p>
        <strong>Así evitamos que el radio objetivo ya incorpore la masa usada como entrada.</strong>
      </DecisionCard>
    </article>
  );
}

function AuditField({ name, meaning }: { name: string; meaning: string }) {
  return (
    <div className="s02-dataset-audit__field">
      <code>{name}</code>
      <span>{meaning}</span>
    </div>
  );
}

function DecisionCard({
  children,
  tone = 'question',
}: {
  children: ReactNode;
  tone?: 'question' | 'limit' | 'branch';
}) {
  return (
    <aside className={`s02-dataset-audit__decision s02-dataset-audit__decision--${tone}`}>
      <p className="s02-dataset-audit__decision-label">QUÉ HACE EL EJERCICIO</p>
      {children}
    </aside>
  );
}

function UncertaintyDiagram() {
  return (
    <figure className="s02-dataset-audit__uncertainty">
      <svg viewBox="0 0 420 72" role="img" aria-labelledby="s02-audit-interval-title">
        <title id="s02-audit-interval-title">
          Esquema de incertidumbre inferior y superior alrededor de un valor
        </title>
        <line x1="48" y1="35" x2="372" y2="35" />
        <line className="s02-dataset-audit__interval" x1="112" y1="35" x2="304" y2="35" />
        <line className="s02-dataset-audit__cap" x1="112" y1="24" x2="112" y2="46" />
        <line className="s02-dataset-audit__cap" x1="304" y1="24" x2="304" y2="46" />
        <circle cx="220" cy="35" r="7" />
        <text x="112" y="66" textAnchor="middle">
          err2 · abajo
        </text>
        <text x="220" y="15" textAnchor="middle">
          pl_rade
        </text>
        <text x="304" y="66" textAnchor="middle">
          err1 · arriba
        </text>
      </svg>
      <figcaption>
        Esquema de un intervalo; las longitudes no son mediciones de un planeta.
      </figcaption>
    </figure>
  );
}
