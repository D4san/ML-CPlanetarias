import { useState } from 'react';

import SlideRail from './SlideRail';
import { SessionPresentationFooter } from './SessionPresentationFooter';
import S02InformationGain, { S02InformationGainIntro } from './s02/S02InformationGain';
import S02Generalization from './s02/S02Generalization';
import S02Math from './s02/S02Math';
import S02PlanetClassification from './s02/S02PlanetClassification';
import S02RegressionExplorer from './s02/S02RegressionExplorer';
import S02RegressionThresholdExplorer from './s02/S02RegressionThresholdExplorer';
import S02ThresholdExplorer from './s02/S02ThresholdExplorer';
import S02TreePlayground from './s02/S02TreePlayground';
import S02BootstrapSampler from './s02/S02BootstrapSampler';
import S02ExoplanetPredictionActivity from './s02/S02ExoplanetPredictionActivity';
import S02DatasetAudit from './s02/S02DatasetAudit';
import S02ForestExplainer from './s02/S02ForestExplainer';
import {
  s02ColabUrl,
  s02OpeningSources,
  s02Sources,
  s02Stations,
  s02Stops,
  s02TeachingStations,
  type S02Stop,
} from '../../lib/s02-content';
import { withBase } from '../../lib/urls';
import './s02-learning-journey.css';
import './s02/s02-opening.css';
import './s02/s02-bootstrap-sampler.css';
import './s02/s02-exoplanet-activity.css';
import './s02/s02-dataset-audit.css';
import './s02/s02-forest-explainer.css';
import './s02/s02-regression-explorer.css';
import './s02/s02-tree-playground.css';
import './session-presentation.css';

export default function S02LearningJourney() {
  const [activeStopId, setActiveStopId] = useState('references');
  const activeIndex = Math.max(
    s02Stops.findIndex((stop) => stop.id === activeStopId),
    0,
  );
  const activeStop = s02Stops[activeIndex]!;
  const activeStation = s02Stations.find((station) => station.id === activeStop.stationId)!;
  const stationIndex = s02TeachingStations.findIndex((station) => station.id === activeStation.id);
  const substations = s02Stops.filter((stop) => stop.stationId === activeStation.id);
  const substationIndex = substations.findIndex((stop) => stop.id === activeStop.id);
  const activeLabel =
    activeStop.id === 'references'
      ? 'Bibliografía inicial'
      : `${activeStation.title} · ${activeStop.title}`;
  const railStops = s02Stops.map((stop) => {
    const stationStops = s02Stops.filter((candidate) => candidate.stationId === stop.stationId);
    return {
      ...stop,
      partIndex: stationStops.findIndex((candidate) => candidate.id === stop.id),
      partLabels: stationStops.map((candidate) => candidate.title),
    };
  });

  function moveTo(index: number) {
    const stop = s02Stops[Math.min(Math.max(index, 0), s02Stops.length - 1)];
    if (stop) setActiveStopId(stop.id);
  }

  return (
    <section
      className="session-presentation s02-journey"
      data-display-mode="presentation"
      aria-labelledby="s02-journey-title"
    >
      <header className="s02-journey__header">
        <div>
          <p className="s02-journey__course-label">ML Ciencias Planetarias · S02</p>
          <h1 className="session-presentation__title" id="s02-journey-title">
            Árboles de decisión y Random Forest
          </h1>
          <p className="s02-journey__question">
            ¿Cómo decide un árbol qué pregunta hacer y dónde cortar?
          </p>
        </div>
        <div className="s02-journey__header-actions">
          <a className="s02-journey__sessions-link" href={withBase('/sesiones/')}>
            Sesiones
          </a>
        </div>
      </header>

      <SlideRail
        slides={railStops}
        activeIndex={activeIndex}
        activeLabel={activeLabel}
        ariaLabel="Recorrido de diapositivas S02"
        progressLabel="Avance de la sesión 02"
        visibleCount={5}
        compactCaption
        className="slide-rail--session-presentation"
        onSelect={(_stop, index) => moveTo(index)}
        getIndexLabel={(stop) => {
          if (stop.stationId === 'references') return '00';
          const stopStationIndex = s02TeachingStations.findIndex(
            (station) => station.id === stop.stationId,
          );
          return `${String(stopStationIndex + 1).padStart(2, '0')}.${(stop.partIndex ?? 0) + 1}`;
        }}
        getAriaLabel={(stop, index) => {
          if (stop.stationId === 'references') {
            return `Diapositiva 0, bibliografía de S02. Diapositiva ${index + 1} de ${s02Stops.length}.`;
          }
          const stopStationIndex = s02TeachingStations.findIndex(
            (station) => station.id === stop.stationId,
          );
          return `${stopStationIndex + 1}.${(stop.partIndex ?? 0) + 1} ${stop.groupLabel}, subestación ${stop.title}: ${stop.partLabel}. Diapositiva ${index + 1} de ${s02Stops.length}.`;
        }}
      />

      <article className="s02-journey__slide" aria-labelledby={`s02-${activeStop.id}-title`}>
        <header className="s02-journey__slide-heading">
          <div>
            <p className="s02-journey__eyebrow">{activeStop.eyebrow}</p>
            <h2 id={`s02-${activeStop.id}-title`} tabIndex={-1}>
              {slideHeading(activeStop)}
            </h2>
            <StopIntro stop={activeStop} />
          </div>
          <span
            className="s02-journey__slide-number"
            aria-label={
              activeStop.id === 'references'
                ? 'Diapositiva 00, referencias'
                : `Estación ${stationIndex + 1}, subestación ${substationIndex + 1}`
            }
          >
            {activeStop.id === 'references'
              ? '00'
              : `${String(stationIndex + 1).padStart(2, '0')}.${substationIndex + 1}`}
          </span>
        </header>
        <div className="s02-journey__slide-content">
          <StopContent stop={activeStop} />
        </div>
      </article>

      <SessionPresentationFooter className="s02-journey__footer">
        <button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0}>
          Anterior
        </button>
        <button
          type="button"
          onClick={() => moveTo(activeIndex + 1)}
          disabled={activeIndex === s02Stops.length - 1}
        >
          Siguiente
        </button>
      </SessionPresentationFooter>
    </section>
  );
}

function slideHeading(stop: S02Stop) {
  const headings: Record<string, string> = {
    references: 'Referencias para la sesión',
    'planet-classification': 'De las medidas a una etiqueta',
    rules: '¿Qué es un árbol de decisión?',
    'information-gain': '¿Cómo establecemos el mejor corte?',
    'tree-code': 'Entrenar y explorar un árbol',
    regression: 'Un árbol también puede predecir números',
    'regression-error': 'Cómo mide el árbol el error al cuadrado',
    overfit: '¿Qué riesgos tiene un árbol demasiado profundo?',
    bootstrap: 'Cada árbol ve una remuestra',
    forest: 'Random Forest combina árboles',
    dataset: 'Actividad: ¿qué datos usarías para estimar el radio?',
    'data-quality': 'Antes de ajustar, auditamos cada fila',
    'colab-activity': 'Actividad: predecir el radio de exoplanetas',
    limits: 'Comunica el resultado y sus límites',
    sources: 'Fuentes para seguir aprendiendo',
  };
  return headings[stop.id] ?? stop.title;
}

function StopIntro({ stop }: { stop: S02Stop }) {
  if (stop.id === 'information-gain') return <S02InformationGainIntro intro={stop.intro} />;

  if (stop.id === 'rules') {
    const [before, after] = stop.intro.split('xⱼ ≤ t');
    if (after !== undefined) {
      return (
        <p className="s02-journey__intro">
          {before}
          <S02Math label="x sub j es menor o igual que t" tex="x_j \le t" />
          {after}
        </p>
      );
    }
  }

  return <p className="s02-journey__intro">{stop.intro}</p>;
}

function TreeTeachingLab() {
  const [maxDepth, setMaxDepth] = useState(1);
  const [minSamplesLeaf, setMinSamplesLeaf] = useState(1);
  const code = `from sklearn.tree import DecisionTreeClassifier
arbol = DecisionTreeClassifier(
    criterion="gini", max_depth=${maxDepth},
    min_samples_leaf=${minSamplesLeaf}, random_state=42,
)
arbol.fit(X_train, y_train)
predicciones = arbol.predict(X_test)`;
  const parameters = [
    ['criterion', '"gini"', 'Criterio para comparar cortes.'],
    ['max_depth', String(maxDepth), 'Niveles máximos de preguntas.'],
    ['min_samples_leaf', String(minSamplesLeaf), 'Ejemplos mínimos por hoja.'],
    ['random_state', '42', 'Fija la aleatoriedad del ajuste.'],
  ];

  return (
    <div className="s02-journey__tree-lab">
      <div className="s02-journey__tree-lab-reference">
        <CodeCell title="Ajuste y predicción" code={code} />
        <ParameterTable
          caption="Qué controla cada parámetro"
          headers={['Parámetro', 'Valor', 'Efecto']}
          rows={parameters}
        />
      </div>
      <S02TreePlayground
        maxDepth={maxDepth}
        minSamplesLeaf={minSamplesLeaf}
        onMaxDepthChange={setMaxDepth}
        onMinSamplesLeafChange={setMinSamplesLeaf}
        onReset={() => {
          setMaxDepth(1);
          setMinSamplesLeaf(1);
        }}
      />
    </div>
  );
}

function StopContent({ stop }: { stop: S02Stop }) {
  if (stop.id === 'references') {
    return (
      <div className="s02-journey__references">
        <p>Fuentes de datos, astronomía planetaria y métodos de la sesión.</p>
        <ul className="s02-journey__references-list">
          {s02OpeningSources.map((source) => (
            <li key={source.href}>
              <span>{source.group}</span>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <small>
          Las escenas de clase son esquemas propios; las fuentes enlazan a los datos y métodos
          citados.
        </small>
      </div>
    );
  }

  if (stop.id === 'planet-classification') return <S02PlanetClassification />;
  if (stop.id === 'rules') return <S02ThresholdExplorer />;
  if (stop.id === 'information-gain') return <S02InformationGain />;

  if (stop.id === 'tree-code') return <TreeTeachingLab />;
  if (stop.id === 'overfit') return <S02Generalization />;

  if (stop.id === 'regression') return <S02RegressionExplorer />;

  if (stop.id === 'regression-error') return <S02RegressionThresholdExplorer />;

  if (stop.id === 'bootstrap') {
    return (
      <div className="s02-journey__content-grid s02-journey__content-grid--bootstrap">
        <S02BootstrapSampler />
      </div>
    );
  }

  if (stop.id === 'forest') {
    return <S02ForestExplainer />;
  }

  if (stop.id === 'dataset') {
    return <S02ExoplanetPredictionActivity />;
  }

  if (stop.id === 'data-quality') {
    return <S02DatasetAudit />;
  }

  if (stop.id === 'colab-activity') {
    return (
      <div className="s02-journey__activity-brief">
        <div className="s02-journey__activity-copy">
          <section>
            <h3>Objetivo</h3>
            <p>
              Responder con una comparación reproducible si la irradiación mejora la predicción del
              radio en sistemas estelares que el modelo no vio durante el entrenamiento.
            </p>
          </section>
          <section>
            <h3>Enunciado</h3>
            <p>
              Consulta PSCompPars del NASA Exoplanet Archive; audita la población, las
              incertidumbres y la procedencia, y excluye radios calculados a partir de la masa.
              Estima <code>pl_rade</code> con <code>pl_bmasse</code> y luego con{' '}
              <code>pl_bmasse</code> + <code>pl_insol</code>. Reserva sistemas completos agrupando
              por <code>hostname</code> y compara, sobre la misma prueba, la mediana de
              entrenamiento, un árbol y dos Random Forest con MAE y R². Grafica la importancia por
              permutación del bosque con ambos predictores y concluye si añadir irradiación mejora
              la predicción para esta población.
            </p>
          </section>
        </div>
        <aside className="s02-journey__activity-action">
          <p>Práctica completa</p>
          <a
            className="s02-journey__colab-action"
            href={s02ColabUrl}
            target="_blank"
            rel="noreferrer"
          >
            Abrir la actividad en Colab ↗
          </a>
        </aside>
      </div>
    );
  }

  if (stop.id === 'sources') {
    return (
      <div className="s02-journey__sources-layout">
        <p>Referencias de datos y algoritmos para revisar antes de adaptar la actividad.</p>
        <ul>
          {s02Sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="s02-journey__source-note">
          Las referencias y paráfrasis de la nota de origen siguen pendientes de revisión de
          derechos.
        </p>
      </div>
    );
  }

  if (stop.id === 'limits') {
    return (
      <div className="s02-journey__content-grid s02-journey__closing-grid">
        <section className="s02-journey__concept-card">
          <h3>Muestra del corte guardado</h3>
          <p className="s02-journey__closing-count">
            <span>
              <strong>1.529</strong>
              <small>planetas</small>
            </span>
            <span>
              <strong>1.249</strong>
              <small>sistemas</small>
            </span>
          </p>
          <p>
            Planetas en tránsito y no controvertidos, con masa reportada como <code>Mass</code>.
            Masa, insolación y radio son valores centrales, positivos y completos; masa y radio
            tienen referencia publicada.
          </p>
          <p>Se excluyen radios calculados a partir de la masa.</p>
          <small className="s02-journey__closing-note">
            CSV de PSCompPars descargado el 29 de septiembre de 2026.
          </small>
        </section>

        <section className="s02-journey__concept-card">
          <h3>¿Qué cambia al añadir insolación?</h3>
          <p>Random Forest · misma configuración · prueba: 300 planetas en 250 sistemas</p>
          <table
            className="s02-journey__closing-table"
            aria-label="Resultados en el conjunto de prueba"
          >
            <thead>
              <tr>
                <th scope="col">Predictores</th>
                <th scope="col">MAE (R⊕)</th>
                <th scope="col">R²</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Masa</th>
                <td>1,618</td>
                <td>0,824</td>
              </tr>
              <tr>
                <th scope="row">Masa + insolación</th>
                <td>1,362</td>
                <td>0,855</td>
              </tr>
            </tbody>
          </table>
          <p>
            En este corte, añadir insolación redujo el error absoluto promedio en 0,256 R⊕. Para R²,
            1 es predicción perfecta y 0 equivale a predecir siempre el radio medio de prueba.
          </p>
        </section>

        <aside className="s02-journey__prompt">
          <strong>Límite de la comparación</strong>
          <p>
            GroupShuffleSplit reservó 999 sistemas para entrenar y 250 para probar; sus 1.229 y 300
            planetas no comparten estrellas anfitrionas. Esta evaluación estima el desempeño en
            sistemas no vistos, dentro de la población filtrada.
          </p>
          <p>
            La mejora predictiva no demuestra causalidad. El análisis tampoco incorpora las
            incertidumbres de las mediciones.
          </p>
        </aside>
      </div>
    );
  }

  return (
    <div className="s02-journey__content-grid s02-journey__content-grid--three">
      <section className="s02-journey__concept-card">
        <h3>Población</h3>
        <p>Indica qué filtros y unidades definen los planetas que comparaste.</p>
      </section>
      <section className="s02-journey__concept-card">
        <h3>Desempeño</h3>
        <p>Compara MAE y R² con la mediana de referencia.</p>
      </section>
      <aside className="s02-journey__prompt">
        <strong>Límite</strong>
        <p>La importancia predictiva de la irradiación no demuestra una causa física.</p>
        <small>La muestra contiene solo los planetas que pasan el filtro elegido.</small>
      </aside>
    </div>
  );
}

function ParameterTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="s02-journey__table-wrap">
      <table className="s02-journey__table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([parameter, ...description]) => (
            <tr key={parameter}>
              <th scope="row">
                <code>{parameter}</code>
              </th>
              {description.map((item, index) => (
                <td key={`${parameter}-${index}`}>{item}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeCell({ title, code, note }: { title: string; code: string; note?: string }) {
  return (
    <figure className="s02-journey__code-cell">
      <figcaption>
        <span>{title}</span>
      </figcaption>
      <pre>
        <code>{code}</code>
      </pre>
      {note && <p>{note}</p>}
    </figure>
  );
}
