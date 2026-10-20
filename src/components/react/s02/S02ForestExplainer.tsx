import { useState } from 'react';

function BootstrapIllustration() {
  return (
    <svg
      aria-label="Cuatro casos originales y dos remuestras posibles: en una se repite B y en la otra se repite C."
      className="s02-forest-explainer__svg"
      role="img"
      viewBox="0 0 360 150"
    >
      <text className="s02-forest-explainer__svg-heading" x="10" y="16">
        datos base
      </text>
      <text className="s02-forest-explainer__svg-heading" x="107" y="16">
        remuestras posibles
      </text>

      {['A', 'B', 'C', 'D'].map((caseName, index) => {
        const x = 108 + index * 61;
        return (
          <g key={caseName}>
            <rect
              className="s02-forest-explainer__case"
              height="23"
              rx="7"
              width="49"
              x={x}
              y="23"
            />
            <text
              className="s02-forest-explainer__case-text"
              textAnchor="middle"
              x={x + 24.5}
              y="39"
            >
              {caseName}
            </text>
          </g>
        );
      })}

      <text className="s02-forest-explainer__row-label" x="10" y="72">
        árbol 1
      </text>
      <text className="s02-forest-explainer__row-label" x="10" y="112">
        árbol 2
      </text>

      {[
        { y: 53, cases: ['A', 'B', 'B', 'D'] },
        { y: 93, cases: ['A', 'C', 'C', 'D'] },
      ].map(({ y, cases }, rowIndex) => (
        <g key={rowIndex}>
          {cases.map((caseName, index) => {
            const x = 108 + index * 61;
            const repeated = cases.filter((candidate) => candidate === caseName).length > 1;
            return (
              <g key={caseName + '-' + index}>
                <rect
                  className={
                    repeated
                      ? 's02-forest-explainer__case s02-forest-explainer__case--repeated'
                      : 's02-forest-explainer__case'
                  }
                  height="23"
                  rx="7"
                  width="49"
                  x={x}
                  y={y}
                />
                <text
                  className="s02-forest-explainer__case-text"
                  textAnchor="middle"
                  x={x + 24.5}
                  y={y + 16}
                >
                  {caseName}
                </text>
              </g>
            );
          })}
        </g>
      ))}

      <text className="s02-forest-explainer__svg-note" x="108" y="134">
        cada remuestra puede cambiar
      </text>
    </svg>
  );
}

function FeatureIllustration() {
  return (
    <table>
      <caption>
        Variables candidatas en nodos distintos; el subconjunto puede cambiar dentro de un árbol.
      </caption>
      <thead>
        <tr>
          <th>Árbol / nodo</th>
          <th>Candidatas</th>
          <th>Corte elegido sobre</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1 / 1</th>
          <td>radio, masa</td>
          <td>radio</td>
        </tr>
        <tr>
          <th>1 / 2</th>
          <td>masa, irradiación</td>
          <td>irradiación</td>
        </tr>
        <tr>
          <th>2 / 1</th>
          <td>radio, irradiación</td>
          <td>radio</td>
        </tr>
      </tbody>
    </table>
  );
}

function PredictionIllustration() {
  const [task, setTask] = useState<'classification' | 'regression'>('classification');
  return (
    <div className="s02-forest-prediction">
      <div role="group" aria-label="Salida del bosque">
        <button
          type="button"
          aria-pressed={task === 'classification'}
          onClick={() => setTask('classification')}
        >
          Clasificación
        </button>
        <button
          type="button"
          aria-pressed={task === 'regression'}
          onClick={() => setTask('regression')}
        >
          Regresión
        </button>
      </div>
      {task === 'classification' ? (
        <>
          <table>
            <caption>Clases didácticas: tipo Tierra y tipo Neptuno</caption>
            <thead>
              <tr>
                <th>Árbol</th>
                <th>P(Tierra)</th>
                <th>P(Neptuno)</th>
              </tr>
            </thead>
            <tbody>
              {[0.8, 0.6, 0.2].map((p, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{Math.round(p * 100)} %</td>
                  <td>{Math.round((1 - p) * 100)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p role="status">
            Promedio de probabilidades: tipo Tierra 53,3 %; tipo Neptuno 46,7 %. Clase elegida: tipo
            Tierra.
          </p>
          <p>
            (0,8 + 0,6 + 0,2) / 3 = 0,533. scikit-learn promedia probabilidades, que pueden diferir
            de una votación de etiquetas.
          </p>
        </>
      ) : (
        <>
          <p>Tres árboles predicen radios de 2,1; 2,7 y 3,0 R⊕ para el mismo planeta.</p>
          <p role="status">Radio del bosque: (2,1 + 2,7 + 3,0) / 3 = 2,6 R⊕.</p>
          <p>En esta práctica, radio es el objetivo; masa e insolación son las entradas.</p>
        </>
      )}
      <p>Valores inventados para explicar la agregación.</p>
    </div>
  );
}

export default function S02ForestExplainer() {
  return (
    <div className="s02-forest-explainer">
      <details className="s02-forest-explainer__dataset">
        <summary>¿Qué representan filas, columnas y árboles?</summary>
        <table>
          <caption>
            Tabla sintética de clasificación: cada fila es un planeta; las columnas contienen
            medidas y una etiqueta.
          </caption>
          <thead>
            <tr>
              <th>Planeta</th>
              <th>Masa (M⊕)</th>
              <th>Radio (R⊕)</th>
              <th>Irradiación (S⊕)</th>
              <th>Etiqueta didáctica</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['A', 1, 1, 1, 'tipo Tierra'],
              ['B', 2, 1.2, 2, 'tipo Tierra'],
              ['C', 8, 3, 5, 'tipo Neptuno'],
              ['D', 10, 3.5, 8, 'tipo Neptuno'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Bootstrap remuestrea filas completas, con sus medidas y etiqueta. Un árbol es un modelo
          que aprende de esas filas. La selección de variables elige columnas candidatas dentro de
          cada nodo.
        </p>
      </details>
      <article className="s02-forest-explainer__card">
        <header className="s02-forest-explainer__card-heading">
          <span>01 · BAGGING</span>
          <h3>Remuestrear los casos</h3>
        </header>
        <figure className="s02-forest-explainer__figure">
          <BootstrapIllustration />
        </figure>
        <p>
          Bootstrap hace que cada árbol vea una remuestra distinta; algunos casos se repiten y otros
          quedan fuera.
        </p>
      </article>

      <article className="s02-forest-explainer__card">
        <header className="s02-forest-explainer__card-heading">
          <span>02 · RANDOM FOREST</span>
          <h3>Variar los predictores</h3>
        </header>
        <figure className="s02-forest-explainer__figure">
          <FeatureIllustration />
        </figure>
        <p>
          En cada nodo se sortean variables candidatas según max_features. Con max_features=1.0, el
          regresor de la práctica considera todas las entradas; valores menores introducen esa
          selección aleatoria.
        </p>
      </article>

      <article className="s02-forest-explainer__card s02-forest-explainer__card--combine">
        <header className="s02-forest-explainer__card-heading">
          <span>03 · ENSAMBLE</span>
          <h3>Combinar predicciones</h3>
        </header>
        <figure className="s02-forest-explainer__figure s02-forest-explainer__figure--prediction">
          <PredictionIllustration />
        </figure>
        <p className="s02-forest-explainer__definition">
          <strong>Varianza:</strong> cambio de la predicción al entrenar con otra muestra. Promediar
          puede reducir ese cambio si los errores de los árboles difieren. En clasificación,
          scikit-learn combina probabilidades; en regresión, valores predichos.
        </p>
      </article>
    </div>
  );
}
