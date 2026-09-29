import { useEffect, useRef, useState } from 'react';

import S02Math from './S02Math';

type Label = 'Compacto' | 'Con envoltura';
type Criterion = 'gini' | 'entropy';
type DefinitionKey = 'impurity' | 'information-gain';
type Example = { radius: number; label: Label };
type SplitScore = {
  threshold: number;
  left: Example[];
  right: Example[];
  weightedImpurity: number;
  reduction: number;
};

const examples: Example[] = [
  { radius: 0.8, label: 'Compacto' },
  { radius: 1.0, label: 'Compacto' },
  { radius: 1.2, label: 'Compacto' },
  { radius: 1.4, label: 'Compacto' },
  { radius: 1.6, label: 'Con envoltura' },
  { radius: 1.8, label: 'Con envoltura' },
  { radius: 2.0, label: 'Con envoltura' },
  { radius: 2.2, label: 'Con envoltura' },
];

const thresholds = examples.slice(0, -1).map((example, index) => {
  const nextRadius = examples[index + 1]!.radius;
  return (example.radius + nextRadius) / 2;
});

function impurity(items: Example[], criterion: Criterion) {
  if (items.length === 0) return 0;

  const compact = items.filter((example) => example.label === 'Compacto').length;
  const wrapped = items.length - compact;
  const probabilities = [compact / items.length, wrapped / items.length];

  if (criterion === 'gini') {
    return probabilities.reduce((sum, probability) => sum + probability * (1 - probability), 0);
  }

  return probabilities.reduce(
    (sum, probability) => (probability === 0 ? sum : sum - probability * Math.log2(probability)),
    0,
  );
}

function scoreSplit(threshold: number, rootImpurity: number, criterion: Criterion): SplitScore {
  const left = examples.filter((example) => example.radius <= threshold);
  const right = examples.filter((example) => example.radius > threshold);
  const weightedImpurity =
    (left.length / examples.length) * impurity(left, criterion) +
    (right.length / examples.length) * impurity(right, criterion);

  return {
    threshold,
    left,
    right,
    weightedImpurity,
    reduction: rootImpurity - weightedImpurity,
  };
}

function countLabels(items: Example[]) {
  const compact = items.filter((example) => example.label === 'Compacto').length;
  return { compact, wrapped: items.length - compact };
}

function radiusX(radius: number) {
  return 105 + ((radius - 0.8) / 1.4) * 530;
}

function formatRadius(radius: number) {
  return radius.toFixed(1);
}

export function S02InformationGainIntro({ intro }: { intro: string }) {
  const [activeDefinition, setActiveDefinition] = useState<DefinitionKey | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeDefinition && !dialog.open) dialog.showModal();
    if (!activeDefinition && dialog.open) dialog.close();
  }, [activeDefinition]);

  return (
    <>
      <p className="s02-journey__intro s02-information-gain__intro">
        {intro} más{' '}
        <button
          className="s02-information-gain__term"
          onClick={() => setActiveDefinition('information-gain')}
          type="button"
        >
          ganancia de información
        </button>{' '}
        con entropía o mayor reducción de{' '}
        <button
          className="s02-information-gain__term"
          onClick={() => setActiveDefinition('impurity')}
          type="button"
        >
          impureza
        </button>{' '}
        con Gini.
      </p>
      <dialog
        aria-describedby="s02-information-definition-description"
        aria-labelledby="s02-information-definition-title"
        className="s02-information-gain__definition-dialog"
        onCancel={(event) => {
          event.preventDefault();
          setActiveDefinition(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveDefinition(null);
        }}
        onClose={() => setActiveDefinition(null)}
        ref={dialogRef}
      >
        {activeDefinition && (
          <article className="s02-information-gain__definition-card">
            <header className="s02-information-gain__definition-header">
              <p>CONCEPTO · ÁRBOLES</p>
              <button
                aria-label="Cerrar definición"
                className="s02-information-gain__definition-close"
                onClick={() => setActiveDefinition(null)}
                type="button"
              >
                <span aria-hidden="true">×</span>
                <span>Cerrar</span>
              </button>
            </header>
            <h2 id="s02-information-definition-title">
              {activeDefinition === 'impurity'
                ? '¿Qué significa impureza?'
                : '¿Qué es la ganancia de información?'}
            </h2>
            <p
              className="s02-information-gain__definition-description"
              id="s02-information-definition-description"
            >
              {activeDefinition === 'impurity'
                ? 'La impureza describe cuán mezcladas están las etiquetas dentro de un nodo. Vale cero si todos los casos tienen la misma etiqueta; aumenta cuando conviven varias clases.'
                : 'La ganancia de información mide cuánto disminuye la entropía al dividir un nodo. Compara la incertidumbre antes del corte con el promedio ponderado de sus dos ramas.'}
            </p>
            {activeDefinition === 'impurity' ? (
              <div className="s02-information-gain__concept-formulas">
                <section>
                  <h3>Gini</h3>
                  <S02Math
                    block
                    className="s02-information-gain__concept-math"
                    label="G de S igual a uno menos la suma de las proporciones de clase al cuadrado"
                    tex="G(S) = 1 - \sum_{k=1}^{K} p_k^2"
                  />
                </section>
                <section>
                  <h3>Entropía de Shannon</h3>
                  <S02Math
                    block
                    className="s02-information-gain__concept-math"
                    label="H de S igual a menos la suma de las proporciones de clase por su logaritmo en base dos"
                    tex="H(S) = -\sum_{k=1}^{K} p_k \log_2(p_k)"
                  />
                </section>
                <p className="s02-information-gain__concept-note">
                  <i>p</i>ₖ es la fracción de casos de la clase <i>k</i>; <i>K</i> es el número de
                  clases.
                </p>
              </div>
            ) : (
              <div className="s02-information-gain__concept-formulas s02-information-gain__concept-formulas--single">
                <S02Math
                  block
                  className="s02-information-gain__concept-math"
                  label="Ganancia de información: entropía antes del corte menos el promedio ponderado de las entropías de los hijos"
                  tex="\operatorname{IG}(S) = H(S) - \left[w_L H(S_L) + w_R H(S_R)\right]"
                />
                <p className="s02-information-gain__concept-note">
                  H(S) es la entropía antes del corte; H(S_L) y H(S_R) son las entropías de sus
                  ramas. Los pesos w_L y w_R indican qué fracción de casos llegó a cada rama.
                </p>
                <p className="s02-information-gain__concept-note s02-information-gain__concept-limit">
                  Un árbol prefiere el corte con mayor ganancia en ese nodo; esta decisión local no
                  garantiza que el árbol completo sea óptimo.
                </p>
              </div>
            )}
          </article>
        )}
      </dialog>
    </>
  );
}

export default function S02InformationGain() {
  const [criterion, setCriterion] = useState<Criterion>('entropy');
  const [candidateIndex, setCandidateIndex] = useState(3);
  const rootImpurity = impurity(examples, criterion);
  const scores = thresholds.map((threshold) => scoreSplit(threshold, rootImpurity, criterion));
  const bestIndex = scores.reduce(
    (best, score, index) => (score.reduction > scores[best]!.reduction ? index : best),
    0,
  );
  const current = scores[candidateIndex]!;
  const leftCounts = countLabels(current.left);
  const rightCounts = countLabels(current.right);
  const best = scores[bestIndex]!;
  const thresholdX = radiusX(current.threshold);
  const unit = criterion === 'entropy' ? ' bits' : '';
  const criterionLabel = criterion === 'gini' ? 'Gini' : 'Entropía';
  const reductionLabel = criterion === 'entropy' ? 'Ganancia de información' : 'Reducción de Gini';
  const buttonLabel = criterion === 'entropy' ? 'Ver mayor ganancia' : 'Ver mayor reducción';
  const chartTitle = criterion === 'entropy' ? 'Ganancia por corte' : 'Reducción de Gini por corte';
  const chartDescription =
    criterion === 'entropy' ? 'ganancia de información' : 'reducción de impureza Gini';
  const chartScores = scores
    .map(
      (score) =>
        `${formatRadius(score.threshold)} radios terrestres: ${score.reduction.toFixed(3)}${unit}`,
    )
    .join('; ');

  return (
    <section
      className="s02-information-gain"
      aria-label="Elegir el mejor corte con Gini o entropía"
    >
      <div className="s02-information-gain__visuals">
        <div className="s02-information-gain__left">
          <figure className="s02-information-gain__sample">
            <figcaption>Una división candidata sobre ocho ejemplos sintéticos</figcaption>
            <svg
              aria-label={`Ocho ejemplos sintéticos ordenados por radio; el corte actual está en ${formatRadius(current.threshold)} radios terrestres.`}
              className="s02-information-gain__sample-svg"
              role="img"
              viewBox="0 0 700 194"
            >
              <text className="s02-information-gain__row-label" x="8" y="60">
                Compactos
              </text>
              <text className="s02-information-gain__row-label" x="8" y="118">
                Con envoltura
              </text>
              <line className="s02-information-gain__axis" x1="105" x2="635" y1="145" y2="145" />
              <line
                className="s02-information-gain__cut"
                x1={thresholdX}
                x2={thresholdX}
                y1="25"
                y2="145"
              />
              <text
                className="s02-information-gain__cut-label"
                x={thresholdX}
                y="18"
                textAnchor="middle"
              >
                t = {formatRadius(current.threshold)}
              </text>
              {examples.map((example, index) => {
                const x = radiusX(example.radius);
                const y = example.label === 'Compacto' ? 54 : 112;
                return example.label === 'Compacto' ? (
                  <circle
                    className="s02-information-gain__point s02-information-gain__point--compact"
                    cx={x}
                    cy={y}
                    key={`${example.radius}-${index}`}
                    r="9"
                  />
                ) : (
                  <rect
                    className="s02-information-gain__point s02-information-gain__point--wrapped"
                    height="18"
                    key={`${example.radius}-${index}`}
                    width="18"
                    x={x - 9}
                    y={y - 9}
                  />
                );
              })}
              {[0.8, 1.5, 2.2].map((radius) => (
                <g key={radius}>
                  <line
                    className="s02-information-gain__tick"
                    x1={radiusX(radius)}
                    x2={radiusX(radius)}
                    y1="145"
                    y2="150"
                  />
                  <text
                    className="s02-information-gain__tick-label"
                    x={radiusX(radius)}
                    y="166"
                    textAnchor="middle"
                  >
                    {formatRadius(radius)}
                  </text>
                </g>
              ))}
              <text
                className="s02-information-gain__axis-label"
                x="370"
                y="188"
                textAnchor="middle"
              >
                Radio (R⊕)
              </text>
            </svg>
            <div className="s02-information-gain__legend" aria-label="Leyenda de clases">
              <span>
                <i className="s02-information-gain__legend-dot" /> Compacto
              </span>
              <span>
                <i className="s02-information-gain__legend-square" /> Con envoltura
              </span>
            </div>
          </figure>

          <div className="s02-information-gain__control">
            <label htmlFor="s02-information-threshold">
              <span>Umbral candidato</span>
              <output htmlFor="s02-information-threshold">
                {formatRadius(current.threshold)} R⊕
              </output>
            </label>
            <input
              id="s02-information-threshold"
              max={thresholds.length - 1}
              min="0"
              onChange={(event) => setCandidateIndex(Number(event.currentTarget.value))}
              step="1"
              type="range"
              value={candidateIndex}
            />
            <button type="button" onClick={() => setCandidateIndex(bestIndex)}>
              {buttonLabel}
            </button>
          </div>
        </div>

        <aside className="s02-information-gain__readout">
          <DefinitionsDisclosure />
          <fieldset className="s02-information-gain__criteria">
            <legend>¿Con qué criterio comparamos?</legend>
            <div>
              <button
                aria-pressed={criterion === 'gini'}
                onClick={() => setCriterion('gini')}
                type="button"
              >
                Gini
              </button>
              <button
                aria-pressed={criterion === 'entropy'}
                onClick={() => setCriterion('entropy')}
                type="button"
              >
                Entropía
              </button>
            </div>
          </fieldset>
          <div className="s02-information-gain__metrics">
            <p>
              <span>{criterionLabel} en la raíz</span>
              <strong>
                {rootImpurity.toFixed(3)}
                {unit}
              </strong>
            </p>
            <p>
              <span>Impureza de hijos</span>
              <strong>
                {current.weightedImpurity.toFixed(3)}
                {unit}
              </strong>
            </p>
            <p className="s02-information-gain__gain">
              <span>{reductionLabel}</span>
              <strong>
                {current.reduction.toFixed(3)}
                {unit}
              </strong>
            </p>
          </div>

          <div className="s02-information-gain__branches">
            <section>
              <h3>Radio ≤ {formatRadius(current.threshold)}</h3>
              <p>
                {current.left.length} casos · {leftCounts.compact} compactos · {leftCounts.wrapped}{' '}
                con envoltura
              </p>
            </section>
            <section>
              <h3>Radio &gt; {formatRadius(current.threshold)}</h3>
              <p>
                {current.right.length} casos · {rightCounts.compact} compactos ·{' '}
                {rightCounts.wrapped} con envoltura
              </p>
            </section>
          </div>

          <figure className="s02-information-gain__scores">
            <figcaption>
              {chartTitle} · máximo en {formatRadius(best.threshold)} R⊕
            </figcaption>
            <svg
              aria-label={`Criterio ${criterionLabel}. ${chartDescription} en siete cortes. ${chartScores}. El mayor valor es ${best.reduction.toFixed(3)}${unit} en ${formatRadius(best.threshold)} radios terrestres.`}
              role="img"
              viewBox="0 0 510 70"
            >
              <line className="s02-information-gain__score-axis" x1="20" x2="495" y1="52" y2="52" />
              {scores.map((score, index) => {
                const x = 32 + index * 66;
                const height = (score.reduction / rootImpurity) * 32;
                const selected = index === candidateIndex;
                return (
                  <g key={score.threshold}>
                    <rect
                      className={
                        selected
                          ? 's02-information-gain__bar is-active'
                          : 's02-information-gain__bar'
                      }
                      height={height}
                      width="30"
                      x={x}
                      y={52 - height}
                    />
                    <text
                      className="s02-information-gain__bar-value"
                      x={x + 15}
                      y={Math.max(10, 48 - height)}
                      textAnchor="middle"
                    >
                      {score.reduction.toFixed(2)}
                    </text>
                    <text
                      className="s02-information-gain__bar-label"
                      x={x + 15}
                      y="68"
                      textAnchor="middle"
                    >
                      {formatRadius(score.threshold)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </figure>
        </aside>
      </div>

      <p className="s02-information-gain__status" role="status" aria-live="polite">
        Corte {formatRadius(current.threshold)} R⊕: {current.left.length} ejemplos a la izquierda (
        {leftCounts.compact} compactos, {leftCounts.wrapped} con envoltura); {current.right.length}{' '}
        a la derecha ({rightCounts.compact} compactos, {rightCounts.wrapped} con envoltura).
        Criterio {criterionLabel}. Impureza de hijos: {current.weightedImpurity.toFixed(3)}
        {unit}; {reductionLabel.toLowerCase()}: {current.reduction.toFixed(3)}
        {unit}.
      </p>
    </section>
  );
}

function DefinitionsDisclosure() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderEnhanced, setSliderEnhanced] = useState(false);
  const sliderId = 's02-information-gain-definition-slider';
  const slideTitles = ['Impureza Gini', 'Entropía de Shannon', 'Comparar el corte'] as const;

  useEffect(() => setSliderEnhanced(true), []);

  return (
    <details className="s02-information-gain__definitions">
      <summary>
        <strong>Gini y entropía: definiciones</strong>
        <span>Recorrer explicación y fórmulas →</span>
      </summary>
      <div className="s02-information-gain__definition-body" data-slider-enhanced={sliderEnhanced}>
        <p
          aria-atomic="true"
          aria-live="polite"
          className="s02-information-gain__definition-progress"
          role="status"
        >
          {slideTitles[activeSlide]} · {activeSlide + 1} de {slideTitles.length}
        </p>
        <div className="s02-information-gain__definition-pages">
          <section
            aria-label={`Paso 1 de ${slideTitles.length}: ${slideTitles[0]}`}
            className="s02-information-gain__definition-page"
            hidden={sliderEnhanced && activeSlide !== 0}
            role="group"
          >
            <div className="s02-information-gain__measure-grid">
              <section className="s02-information-gain__measure">
                <h3>Impureza Gini</h3>
                <p>
                  Gini es la probabilidad de que dos etiquetas independientes, extraídas según las
                  proporciones del grupo, sean distintas. Vale cero en un grupo puro.
                </p>
                <S02Math
                  block
                  className="s02-information-gain__math"
                  label="G de S es uno menos la suma de p sub k al cuadrado, de k igual a uno hasta K"
                  tex="G(S) = 1 - \sum_{k=1}^{K} p_k^2"
                />
              </section>
              <section className="s02-information-gain__measure">
                <h3>Cómo leerla</h3>
                <p>
                  Con dos clases, Gini = 0 indica un grupo puro y Gini = 0.5, la mezcla máxima
                  (mitad y mitad).
                </p>
                <p className="s02-information-gain__weights">
                  <i>p</i>ₖ es la fracción de casos de la clase <i>k</i>; <i>K</i> es el número de
                  clases.
                </p>
              </section>
            </div>
          </section>

          <section
            aria-label={`Paso 2 de ${slideTitles.length}: ${slideTitles[1]}`}
            className="s02-information-gain__definition-page"
            hidden={sliderEnhanced && activeSlide !== 1}
            role="group"
          >
            <div className="s02-information-gain__measure-grid">
              <section className="s02-information-gain__measure">
                <h3>Entropía de Shannon</h3>
                <p>
                  Mide la incertidumbre al adivinar la etiqueta de un caso al azar. Vale cero en un
                  grupo puro y es máxima cuando las clases están equilibradas; se mide en bits.
                </p>
                <S02Math
                  block
                  className="s02-information-gain__math"
                  label="H de S es menos la suma de p sub k por logaritmo en base dos de p sub k, de k igual a uno hasta K"
                  tex="H(S) = -\sum_{k=1}^{K} p_k \log_2(p_k)"
                />
              </section>
              <section className="s02-information-gain__measure">
                <h3>Cómo leerla</h3>
                <p>
                  Con dos clases, 0 bits indica un grupo puro; 1 bit corresponde a una mezcla mitad
                  y mitad.
                </p>
                <p className="s02-information-gain__weights">
                  <i>p</i>ₖ es la fracción de casos de la clase <i>k</i>; <i>K</i> es el número de
                  clases.
                </p>
              </section>
            </div>
          </section>

          <section
            aria-label={`Paso 3 de ${slideTitles.length}: ${slideTitles[2]}`}
            className="s02-information-gain__definition-page"
            hidden={sliderEnhanced && activeSlide !== 2}
            role="group"
          >
            <section className="s02-information-gain__comparison">
              <h3>¿Cómo comparamos un corte?</h3>
              <p>
                Comparamos la impureza antes de dividir con la que queda en las ramas, ponderada
                según cuántos casos llegaron a cada una.
              </p>
              <div className="s02-information-gain__comparison-formulas">
                <section>
                  <h4>Ganancia de información · entropía</h4>
                  <S02Math
                    block
                    className="s02-information-gain__math"
                    label="Ganancia de información: entropía de S menos el promedio ponderado de las entropías de los hijos"
                    tex="\operatorname{IG}(S) = H(S) - [w_L H(S_L) + w_R H(S_R)]"
                  />
                </section>
                <section>
                  <h4>Reducción de impureza · Gini</h4>
                  <S02Math
                    block
                    className="s02-information-gain__math"
                    label="Reducción de Gini: G de S menos el promedio ponderado de los valores Gini de los hijos"
                    tex="\Delta G = G(S) - [w_L G(S_L) + w_R G(S_R)]"
                  />
                </section>
              </div>
              <p className="s02-information-gain__weights">
                <i>w</i>
                <sub>L</sub> = <i>n</i>
                <sub>L</sub>/<i>n</i> y <i>w</i>
                <sub>R</sub> = <i>n</i>
                <sub>R</sub>/<i>n</i>: fracción de casos que llega a cada hijo.
              </p>
              <p className="s02-information-gain__comparison-intuition">
                En palabras: comparamos cuánta mezcla había antes del corte con la que queda
                después. Si las ramas reúnen mejor cada etiqueta, la reducción es mayor: se llama
                ganancia de información con entropía y reducción de impureza con Gini.
              </p>
              <ol
                aria-label="Cómo encuentra el árbol un buen corte"
                className="s02-information-gain__search-steps"
              >
                <li>
                  <strong>Probar cortes</strong>
                  <span>Probar puntos medios entre valores ordenados.</span>
                </li>
                <li>
                  <strong>Medir la reducción</strong>
                  <span>Medir la impureza ponderada tras cada corte.</span>
                </li>
                <li>
                  <strong>Elegir y repetir</strong>
                  <span>Elegir el mayor valor; repetir en cada rama.</span>
                </li>
              </ol>
              <p className="s02-information-gain__example-note">
                Aquí, 1.5 R⊕ deja ramas puras: Gini 0.5 → 0 y entropía 1 → 0 bit.
              </p>
            </section>
          </section>
        </div>
        <div
          aria-label="Controles de la explicación"
          className="s02-information-gain__definition-controls"
          hidden={!sliderEnhanced}
        >
          <button
            disabled={activeSlide === 0}
            onClick={() => setActiveSlide((current) => Math.max(0, current - 1))}
            type="button"
          >
            Anterior
          </button>
          <label className="s02-information-gain__slider-label" htmlFor={sliderId}>
            Paso de la explicación
          </label>
          <input
            aria-valuetext={`${slideTitles[activeSlide]}, paso ${activeSlide + 1} de ${slideTitles.length}`}
            id={sliderId}
            max={slideTitles.length - 1}
            min={0}
            onChange={(event) => setActiveSlide(Number(event.currentTarget.value))}
            step={1}
            type="range"
            value={activeSlide}
          />
          <output htmlFor={sliderId}>
            {activeSlide + 1} / {slideTitles.length}
          </output>
          <button
            disabled={activeSlide === slideTitles.length - 1}
            onClick={() =>
              setActiveSlide((current) => Math.min(slideTitles.length - 1, current + 1))
            }
            type="button"
          >
            Siguiente
          </button>
        </div>
      </div>
    </details>
  );
}
