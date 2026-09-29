import { useState } from 'react';

type FeatureChoice = 'mass' | 'mass-insolation';

const archiveLinks = [
  {
    label: 'Abrir la tabla PSCompPars',
    href: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PSCompPars',
  },
  {
    label: 'Columnas y unidades',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html',
  },
  {
    label: 'Cómo se calculan los parámetros',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/pscp_calc.html',
  },
  {
    label: 'Consultar con TAP',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html',
  },
];

export default function S02ExoplanetPredictionActivity() {
  const [choice, setChoice] = useState<FeatureChoice>('mass');
  const includesInsolation = choice === 'mass-insolation';

  return (
    <section
      className="s02-exoplanet-activity"
      aria-label="Actividad de predicción con exoplanetas"
    >
      <header className="s02-exoplanet-activity__source">
        <div>
          <p className="s02-exoplanet-activity__eyebrow">
            Caso de trabajo · catálogo de exoplanetas
          </p>
          <h3>NASA Exoplanet Archive · PSCompPars</h3>
          <p>
            PSCompPars reúne valores publicados y calculados de varias referencias; revisaremos su
            procedencia antes de ajustar modelos.
          </p>
        </div>
        <a
          className="s02-exoplanet-activity__archive-link"
          href={archiveLinks[0]!.href}
          target="_blank"
          rel="noreferrer"
        >
          Explorar PSCompPars ↗
        </a>
      </header>

      <div className="s02-exoplanet-activity__workspace">
        <section
          className="s02-exoplanet-activity__data-card"
          aria-labelledby="s02-exoplanet-row-title"
        >
          <div className="s02-exoplanet-activity__section-heading">
            <div>
              <p className="s02-exoplanet-activity__eyebrow">1 · Leemos una fila</p>
              <h3 id="s02-exoplanet-row-title">¿Qué información tenemos?</h3>
            </div>
            <span className="s02-exoplanet-activity__row-badge">1 fila = 1 planeta</span>
          </div>

          <div className="s02-exoplanet-activity__table-wrap">
            <table className="s02-exoplanet-activity__schema">
              <caption>Esquema del catálogo, sin mediciones de planetas</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <code>pl_name</code>
                  </th>
                  <th scope="col">
                    <code>hostname</code>
                  </th>
                  <th scope="col">
                    <code>pl_bmasse</code>
                  </th>
                  <th scope="col">
                    <code>pl_insol</code>
                  </th>
                  <th scope="col">
                    <code>pl_rade</code>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>planeta</td>
                  <td>estrella anfitriona</td>
                  <td>masa · M⊕</td>
                  <td>irradiación · S⊕</td>
                  <td>radio · R⊕</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="s02-exoplanet-activity__leakage-note">
            <strong>Fuga de objetivo:</strong> PSCompPars puede calcular <code>pl_rade</code> desde
            la masa; en 04.2 excluiremos esos casos.
          </p>

          <div
            className="s02-exoplanet-activity__flow"
            aria-label="Predictores, modelo y variable objetivo"
          >
            <div className="s02-exoplanet-activity__flow-group">
              <span className="s02-exoplanet-activity__flow-label">Entrada · predictores</span>
              <div className="s02-exoplanet-activity__feature-list">
                <code>pl_bmasse</code>
                {includesInsolation && (
                  <>
                    <span className="s02-exoplanet-activity__plus" aria-hidden="true">
                      +
                    </span>
                    <code className="s02-exoplanet-activity__feature-added">pl_insol</code>
                  </>
                )}
              </div>
            </div>
            <span className="s02-exoplanet-activity__arrow" aria-hidden="true">
              →
            </span>
            <div className="s02-exoplanet-activity__model-node">
              <span className="s02-exoplanet-activity__flow-label">Modelo</span>
              <strong>árbol o bosque</strong>
              <small>aprende reglas</small>
            </div>
            <span className="s02-exoplanet-activity__arrow" aria-hidden="true">
              →
            </span>
            <div className="s02-exoplanet-activity__target-node">
              <span className="s02-exoplanet-activity__flow-label">Objetivo</span>
              <code>pl_rade</code>
              <small>objetivo continuo</small>
            </div>
          </div>
        </section>

        <aside
          className="s02-exoplanet-activity__task-card"
          aria-labelledby="s02-exoplanet-task-title"
        >
          <p className="s02-exoplanet-activity__eyebrow">2 · Planteamos la comparación</p>
          <h3 id="s02-exoplanet-task-title">¿Qué ponemos a prueba?</h3>
          <p className="s02-exoplanet-activity__task-prompt">
            Elige qué datos usarías para estimar el radio.
          </p>

          <div
            className="s02-exoplanet-activity__choices"
            role="group"
            aria-label="Conjunto de predictores"
          >
            <button
              type="button"
              aria-pressed={!includesInsolation}
              onClick={() => setChoice('mass')}
            >
              <span className="s02-exoplanet-activity__choice-index">A</span>
              <span>
                <strong>Masa</strong>
                <small>1 predictor</small>
              </span>
            </button>
            <button
              type="button"
              aria-pressed={includesInsolation}
              onClick={() => setChoice('mass-insolation')}
            >
              <span className="s02-exoplanet-activity__choice-index">B</span>
              <span>
                <strong>Masa + irradiación</strong>
                <small>2 predictores</small>
              </span>
            </button>
          </div>

          <p className="s02-exoplanet-activity__status" aria-live="polite" aria-atomic="true">
            {includesInsolation
              ? 'B: añadimos pl_insol; el objetivo sigue siendo pl_rade.'
              : 'A: pl_bmasse → estimar pl_rade.'}
          </p>

          <div className="s02-exoplanet-activity__hypothesis">
            <strong>Antes de ver resultados</strong>
            <p>
              Antes de mirar el MAE, predice si añadir <code>pl_insol</code> hará que baje, suba o
              se mantenga.
            </p>
          </div>
        </aside>
      </div>

      <nav
        className="s02-exoplanet-activity__resources"
        aria-label="Recursos oficiales del catálogo"
      >
        <span>NASA Exoplanet Archive:</span>
        {archiveLinks.slice(1).map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label} ↗
          </a>
        ))}
      </nav>
    </section>
  );
}
