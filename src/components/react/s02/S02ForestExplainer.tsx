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
  const rows = [
    { tree: 'árbol 1', first: 'radio', second: 'masa', chosen: 'radio' },
    { tree: 'árbol 2', first: 'masa', second: 'irradiación', chosen: 'irradiación' },
    { tree: 'árbol 3', first: 'radio', second: 'irradiación', chosen: 'radio' },
  ];

  return (
    <svg
      aria-label="En cada árbol se evalúa un subconjunto distinto de predictores para proponer una división."
      className="s02-forest-explainer__svg"
      role="img"
      viewBox="0 0 360 150"
    >
      <text className="s02-forest-explainer__svg-heading" x="10" y="16">
        candidatos en un corte
      </text>
      <text className="s02-forest-explainer__svg-heading" x="273" y="16">
        pregunta
      </text>

      {rows.map((row, index) => {
        const y = 30 + index * 34;
        return (
          <g key={row.tree}>
            <text className="s02-forest-explainer__row-label" x="10" y={y + 20}>
              {row.tree}
            </text>
            <rect
              className="s02-forest-explainer__feature"
              height="24"
              rx="7"
              width="76"
              x="91"
              y={y}
            />
            <text
              className="s02-forest-explainer__feature-text"
              textAnchor="middle"
              x="129"
              y={y + 17}
            >
              {row.first}
            </text>
            <rect
              className="s02-forest-explainer__feature"
              height="24"
              rx="7"
              width="91"
              x="174"
              y={y}
            />
            <text
              className="s02-forest-explainer__feature-text"
              textAnchor="middle"
              x="219.5"
              y={y + 17}
            >
              {row.second}
            </text>
            <path className="s02-forest-explainer__arrow" d={'M 267 ' + (y + 14.5) + ' H 282'} />
            <path
              className="s02-forest-explainer__arrow-head"
              d={'M 278 ' + (y + 9) + ' L 284 ' + (y + 14.5) + ' L 278 ' + (y + 20)}
            />
            <rect
              className="s02-forest-explainer__feature s02-forest-explainer__feature--chosen"
              height="24"
              rx="7"
              width="68"
              x="288"
              y={y}
            />
            <text
              className="s02-forest-explainer__feature-text"
              textAnchor="middle"
              x="322"
              y={y + 17}
            >
              {row.chosen}
            </text>
          </g>
        );
      })}

      <text className="s02-forest-explainer__svg-note" x="10" y="140">
        el sorteo ocurre en cada división
      </text>
    </svg>
  );
}

function PredictionIllustration() {
  return (
    <svg
      aria-label="En un ejemplo de regresión, tres árboles predicen 2.1, 2.7 y 3.0; el promedio es 2.6."
      className="s02-forest-explainer__svg"
      role="img"
      viewBox="0 0 360 140"
    >
      <text className="s02-forest-explainer__svg-heading" x="10" y="16">
        ejemplo de regresión
      </text>

      {[
        { x: 9, tree: 'árbol 1', value: '2.1' },
        { x: 95, tree: 'árbol 2', value: '2.7' },
        { x: 181, tree: 'árbol 3', value: '3.0' },
      ].map((item) => (
        <g key={item.tree}>
          <text
            className="s02-forest-explainer__svg-note"
            textAnchor="middle"
            x={item.x + 34}
            y="39"
          >
            {item.tree}
          </text>
          <rect
            className="s02-forest-explainer__prediction"
            height="40"
            rx="8"
            width="68"
            x={item.x}
            y="48"
          />
          <text
            className="s02-forest-explainer__prediction-value"
            textAnchor="middle"
            x={item.x + 34}
            y="75"
          >
            {item.value}
          </text>
        </g>
      ))}

      <path className="s02-forest-explainer__arrow" d="M 258 67 H 277" />
      <path className="s02-forest-explainer__arrow-head" d="M 273 61 L 280 67 L 273 73" />
      <rect
        className="s02-forest-explainer__prediction s02-forest-explainer__prediction--mean"
        height="48"
        rx="8"
        width="73"
        x="285"
        y="43"
      />
      <text className="s02-forest-explainer__svg-note" textAnchor="middle" x="321.5" y="60">
        promedio
      </text>
      <text className="s02-forest-explainer__prediction-value" textAnchor="middle" x="321.5" y="80">
        2.6
      </text>
      <text className="s02-forest-explainer__svg-note" x="10" y="126">
        clasificación → gana la clase con más votos
      </text>
    </svg>
  );
}

export default function S02ForestExplainer() {
  return (
    <div className="s02-forest-explainer">
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
          En cada corte, el bosque sortea qué variables probar; así, los árboles pueden aprender
          reglas distintas.
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
          suaviza ese cambio si los árboles difieren; en clasificación, el bosque vota por mayoría.
        </p>
      </article>
    </div>
  );
}
