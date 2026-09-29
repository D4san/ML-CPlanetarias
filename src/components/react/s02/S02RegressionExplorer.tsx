import S02Math from './S02Math';

type Observation = { id: string; x: number; y: number };

export const regressionObservations: Observation[] = [
  { id: 'P01', x: 1, y: 1 },
  { id: 'P02', x: 2, y: 2 },
  { id: 'P03', x: 3, y: 30 },
  { id: 'P04', x: 4, y: 7 },
  { id: 'P05', x: 5, y: 8 },
  { id: 'P06', x: 6, y: 9 },
];

const threshold = 2.5;
const plot = { left: 80, right: 950, top: 30, bottom: 228 };

function formatNumber(value: number, digits = 2, minimumDigits = 0) {
  return value.toLocaleString('es-CO', {
    minimumFractionDigits: minimumDigits,
    maximumFractionDigits: digits,
  });
}

function mathNumber(value: number, digits = 1) {
  return value.toFixed(digits).replace('.', '{,}');
}

function mean(items: Observation[]) {
  return items.reduce((sum, item) => sum + item.y, 0) / items.length;
}

function median(items: Observation[]) {
  const ordered = items.map((item) => item.y).sort((a, b) => a - b);
  const middle = ordered.length / 2;
  return ordered.length % 2 === 0
    ? (ordered[middle - 1]! + ordered[middle]!) / 2
    : ordered[Math.floor(middle)]!;
}

function sumSquaredErrors(items: Observation[], prediction: number) {
  return items.reduce((sum, item) => sum + (item.y - prediction) ** 2, 0);
}

function mapX(value: number) {
  return plot.left + ((value - 0.5) / 6) * (plot.right - plot.left);
}

function mapY(value: number) {
  return plot.bottom - (value / 35) * (plot.bottom - plot.top);
}

function RegressionPlot({
  leftMean,
  rightMean,
  rightMedian,
}: {
  leftMean: number;
  rightMean: number;
  rightMedian: number;
}) {
  const splitX = mapX(threshold);
  const leftMeanY = mapY(leftMean);
  const rightMeanY = mapY(rightMean);
  const stepPath = `M ${plot.left} ${leftMeanY} H ${splitX} V ${rightMeanY} H ${plot.right}`;

  return (
    <figure className="s02-regression__figure">
      <figcaption>Una hoja guarda una predicción para toda su región.</figcaption>
      <svg
        aria-label="Seis datos sintéticos: el corte x menor o igual que 2,5 deja una media de 1,5 a la izquierda y una media de 13,5 a la derecha; la mediana del grupo derecho es 8,5."
        className="s02-regression__plot"
        role="img"
        viewBox="0 0 1000 285"
      >
        <title>Predicción por hojas: media frente a mediana</title>
        <desc>
          Los puntos P01 a P06 muestran x como entrada y y como valor observado. La línea escalonada
          muestra las medias 1,5 y 13,5 que predice el árbol con el corte x menor o igual que 2,5.
          Una línea discontinua marca la mediana 8,5 del grupo derecho.
        </desc>
        <g aria-hidden="true">
          <rect
            className="s02-regression__region s02-regression__region--left"
            height={plot.bottom - plot.top}
            width={splitX - plot.left}
            x={plot.left}
            y={plot.top}
          />
          <rect
            className="s02-regression__region s02-regression__region--right"
            height={plot.bottom - plot.top}
            width={plot.right - splitX}
            x={splitX}
            y={plot.top}
          />
          {[0, 10, 20, 30].map((tick) => (
            <g key={`y-${tick}`}>
              <line
                className="s02-regression__grid"
                x1={plot.left}
                x2={plot.right}
                y1={mapY(tick)}
                y2={mapY(tick)}
              />
              <text
                className="s02-regression__tick"
                textAnchor="end"
                x={plot.left - 12}
                y={mapY(tick) + 6}
              >
                {tick}
              </text>
            </g>
          ))}
          {[1, 2, 3, 4, 5, 6].map((tick) => (
            <g key={`x-${tick}`}>
              <line
                className="s02-regression__tick-mark"
                x1={mapX(tick)}
                x2={mapX(tick)}
                y1={plot.bottom}
                y2={plot.bottom + 7}
              />
              <text
                className="s02-regression__tick"
                textAnchor="middle"
                x={mapX(tick)}
                y={plot.bottom + 24}
              >
                {tick}
              </text>
            </g>
          ))}
          <line
            className="s02-regression__axis"
            x1={plot.left}
            x2={plot.right}
            y1={plot.bottom}
            y2={plot.bottom}
          />
          <line
            className="s02-regression__axis"
            x1={plot.left}
            x2={plot.left}
            y1={plot.top}
            y2={plot.bottom}
          />
          <line
            className="s02-regression__cut-line"
            x1={splitX}
            x2={splitX}
            y1={plot.top}
            y2={plot.bottom}
          />
          <line
            className="s02-regression__median-line"
            x1={splitX}
            x2={plot.right}
            y1={mapY(rightMedian)}
            y2={mapY(rightMedian)}
          />
          <path className="s02-regression__step" d={stepPath} />
          {regressionObservations.map((item, index) => (
            <g key={item.id}>
              <circle className="s02-regression__point" cx={mapX(item.x)} cy={mapY(item.y)} r="7" />
              <text
                className="s02-regression__point-label"
                textAnchor="middle"
                x={mapX(item.x)}
                y={mapY(item.y) + (item.y > 12 || index < 2 ? 18 : -11)}
              >
                {item.id}
              </text>
            </g>
          ))}
          <text
            className="s02-regression__cut-label"
            textAnchor="middle"
            x={splitX}
            y={plot.top - 10}
          >
            x ≤ 2,5
          </text>
          <text
            className="s02-regression__axis-label"
            textAnchor="middle"
            x={(plot.left + plot.right) / 2}
            y="278"
          >
            Entrada x
          </text>
          <text
            className="s02-regression__axis-label"
            textAnchor="middle"
            transform="rotate(-90 24 130)"
            x="24"
            y="130"
          >
            Objetivo y
          </text>
        </g>
      </svg>
      <div className="s02-regression__legend" aria-label="Leyenda del gráfico">
        <span>
          <i className="s02-regression__legend-point" /> Valor observado
        </span>
        <span>
          <i className="s02-regression__legend-step" /> Media predicha: {formatNumber(leftMean, 1)}{' '}
          y {formatNumber(rightMean, 1)}
        </span>
        <span>
          <i className="s02-regression__legend-median" /> Mediana derecha:{' '}
          {formatNumber(rightMedian, 1)}
        </span>
      </div>
    </figure>
  );
}

function DataTable({ rightMean }: { rightMean: number }) {
  return (
    <section className="s02-regression__data-card" aria-labelledby="s02-regression-data-title">
      <h3 id="s02-regression-data-title">Seis filas sintéticas · no son datos planetarios</h3>
      <table className="s02-regression__table">
        <thead>
          <tr>
            <th scope="col">Variable</th>
            {regressionObservations.map((item) => (
              <th scope="col" key={item.id}>
                {item.id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Entrada x</th>
            {regressionObservations.map((item) => (
              <td key={item.id}>{formatNumber(item.x)}</td>
            ))}
          </tr>
          <tr>
            <th scope="row">Objetivo y</th>
            {regressionObservations.map((item) => (
              <td key={item.id}>{formatNumber(item.y)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="s02-regression__new-prediction">
        Prueba: <strong>x = 4,4 → hoja derecha → ŷ = {formatNumber(rightMean, 1, 1)}</strong>;
        todavía no conocemos su <strong>y</strong>.
      </p>
    </section>
  );
}

export default function S02RegressionExplorer() {
  const left = regressionObservations.filter((item) => item.x <= threshold);
  const right = regressionObservations.filter((item) => item.x > threshold);
  const leftMean = mean(left);
  const rightMean = mean(right);
  const rightMedian = median(right);
  const rootMean = mean(regressionObservations);
  const rootSse = sumSquaredErrors(regressionObservations, rootMean);
  const leftSse = sumSquaredErrors(left, leftMean);
  const rightSse = sumSquaredErrors(right, rightMean);

  return (
    <section
      className="s02-regression s02-regression--fixed"
      aria-label="Explicación fija de regresión por hojas"
    >
      <div className="s02-regression__layout">
        <article className="s02-regression__explanation">
          <section className="s02-regression__explanation-block">
            <h3>La hoja guarda la media</h3>
            <p>
              P01–P06 son filas sintéticas: <strong>x</strong> es la entrada y <strong>y</strong>,
              el valor observado. Con <strong>x ≤ 2,5</strong>, P01–P02 dan media{' '}
              <strong>1,5</strong>; P03–P06 quedan a la derecha.
            </p>
            <S02Math
              block
              className="s02-regression__math"
              label="La hoja derecha predice la media de treinta, siete, ocho y nueve: trece coma cinco."
              tex={`\\hat{y}_{\\text{der.}}=\\frac{30+7+8+9}{4}=${mathNumber(rightMean)}`}
            />
            <p>
              Ordenados: <strong>7, 8, 9, 30</strong>; mediana = <strong>(8 + 9) / 2 = </strong>
              <strong>{formatNumber(rightMedian, 1, 1)}</strong>. <code>squared_error</code> usa la
              media; <code>absolute_error</code>, la mediana.
            </p>
          </section>
          <section className="s02-regression__explanation-block s02-regression__sse-block">
            <h3>En fit se minimiza el error cuadrático</h3>
            <p>
              El residuo <strong>eᵢ = yᵢ − ŷ de su hoja</strong> es observado menos media predicha.
            </p>
            <div
              className="s02-regression__math s02-regression__math--compact"
              role="math"
              aria-label="SSE igual a la suma de los residuos e sub i elevados al cuadrado."
            >
              <strong>SSE = Σ eᵢ²</strong>
            </div>
            <p>
              En la hoja derecha: <strong>16,5² + 6,5² + 5,5² + 4,5² = 365</strong>. Con{' '}
              <strong>x ≤ 2,5</strong>,{' '}
              <strong>
                {formatNumber(leftSse, 1, 1)} + {formatNumber(rightSse, 0)} ={' '}
                {formatNumber(leftSse + rightSse, 1, 1)}
              </strong>
              ; sin corte da <strong>{formatNumber(rootSse, 1, 1)}</strong>. Entre cinco cortes,
              como los seis datos se mantienen, menor SSE equivale a menor{' '}
              <strong>MSE = SSE/6</strong> y el árbol elige ese corte.
            </p>
          </section>
        </article>

        <aside
          className="s02-regression__visual-column"
          aria-label="Gráfico y tabla de los seis ejemplos"
        >
          <RegressionPlot leftMean={leftMean} rightMean={rightMean} rightMedian={rightMedian} />
          <DataTable rightMean={rightMean} />
        </aside>
      </div>
    </section>
  );
}
