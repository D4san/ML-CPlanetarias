import { useEffect, useRef, useState } from 'react';
import S02Math from './S02Math';
import { SessionNavigationControls } from '../SessionNavigationControls';
import {
  informationExamples as examples,
  informationThresholds as thresholds,
  impurity,
  scoreSplit,
  countLabels,
  type Criterion,
} from '../../../lib/s02-information';
type DefinitionKey = 'impurity' | 'information-gain';
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
                    tex="G(S) = 1 - \sum_{k=1}^{K} p_k(S)^2"
                  />
                </section>
                <section>
                  <h3>Entropía de Shannon</h3>
                  <S02Math
                    block
                    className="s02-information-gain__concept-math"
                    label="H de S igual a menos la suma de las proporciones de clase por su logaritmo en base dos"
                    tex="H(S) = -\sum_{k=1}^{K} p_k(S) \log_2(p_k(S))"
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

const steps = [
  'Contar las clases',
  'Dividir el nodo',
  'Calcular y ponderar',
  'Explorar los cortes',
];
const fmt = (value: number, digits = 3) =>
  value.toLocaleString('es-CO', { maximumFractionDigits: digits });

export default function S02InformationGain() {
  const labRef = useRef<HTMLElement>(null);
  const scrollToStart = () =>
    window.requestAnimationFrame(() =>
      labRef.current
        ?.closest('.s02-journey__slide-content')
        ?.scrollTo({ top: 0, behavior: 'auto' }),
    );
  const [step, setStep] = useState(0);
  const [criterion, setCriterion] = useState<Criterion>('gini');
  const [candidateIndex, setCandidateIndex] = useState(2);
  const root = impurity(examples, criterion);
  const current = scoreSplit(thresholds[candidateIndex]!, root, criterion);
  const scores = thresholds.map((t) => scoreSplit(t, root, criterion));
  const bestIndex = scores.reduce(
    (best, value, index) => (value.reduction > scores[best]!.reduction ? index : best),
    0,
  );
  const symbol = criterion === 'gini' ? 'G' : 'H';
  const unit = criterion === 'entropy' ? ' bits' : '';
  const rootCounts = countLabels(examples);
  const fixed = scoreSplit(thresholds[2]!, impurity(examples, 'gini'), 'gini');
  const changeStep = (delta: -1 | 1) => {
    scrollToStart();
    setStep((value) => Math.min(Math.max(value + delta, 0), 3));
    if (step + delta < 3) {
      setCriterion('gini');
      setCandidateIndex(2);
    }
  };
  const reset = () => {
    scrollToStart();
    setStep(0);
    setCriterion('gini');
    setCandidateIndex(2);
  };
  const node = (id: string, items: typeof current.left) => {
    const counts = countLabels(items);
    const p = counts.compact / items.length;
    const q = counts.wrapped / items.length;
    return (
      <section className="s02-impurity__node" key={id} aria-label={`Nodo ${id}`}>
        <h4>
          {id === 'S_L' ? 'Izquierda Sₗ' : 'Derecha Sᵣ'} · {items.length} casos
        </h4>
        <p>
          {counts.compact} compactos · {counts.wrapped} con envoltura
        </p>
        <p>
          p₁ = {counts.compact}/{items.length} = {fmt(p)}; p₂ = {counts.wrapped}/{items.length} ={' '}
          {fmt(q)}
        </p>
        <S02Math
          block
          label={`Impureza del nodo ${id}: ${fmt(impurity(items, criterion))}${unit}`}
          tex={
            criterion === 'gini'
              ? `G(${id})=1-[${p.toFixed(2)}^2+${q.toFixed(2)}^2]=${impurity(items, criterion).toFixed(3)}`
              : `H(${id})=-\\sum_k p_k(${id})\\log_2 p_k(${id})=${impurity(items, criterion).toFixed(3)}\\ \\mathrm{bits}`
          }
        />
      </section>
    );
  };
  return (
    <section
      className="s02-impurity"
      ref={labRef}
      aria-label="Recorrido guiado de impureza y comparación de cortes"
    >
      <header className="s02-impurity__header">
        <SessionNavigationControls
          scope="explanation"
          index={step}
          count={steps.length}
          onMove={changeStep}
        />
        <h3>
          {step + 1}. {steps[step]}
        </h3>
        <button type="button" onClick={reset}>
          Reiniciar ejemplo
        </button>
      </header>
      <div className="s02-impurity__layout">
        <div className="s02-impurity__visual">
          {step !== 2 && (
            <figure>
              <svg
                viewBox="0 0 620 140"
                role="img"
                aria-label={`Ocho casos sintéticos; corte ${fmt(current.threshold, 1)} radios terrestres: ${current.left.length} a la izquierda y ${current.right.length} a la derecha.`}
              >
                <line x1="30" x2="590" y1="90" y2="90" stroke="currentColor" />
                {examples.map((item, index) => (
                  <g key={item.radius}>
                    {item.label === 'Compacto' ? (
                      <circle
                        cx={50 + index * 73}
                        cy="55"
                        r="13"
                        fill="#4ec4d0"
                        stroke="currentColor"
                      />
                    ) : (
                      <rect
                        x={37 + index * 73}
                        y="42"
                        width="26"
                        height="26"
                        fill="#efb56a"
                        stroke="currentColor"
                      />
                    )}
                    <text x={50 + index * 73} y="115" textAnchor="middle" fill="currentColor">
                      {fmt(item.radius, 1)}
                    </text>
                  </g>
                ))}
                {step > 0 && (
                  <g>
                    <line
                      x1={86.5 + candidateIndex * 73}
                      x2={86.5 + candidateIndex * 73}
                      y1="15"
                      y2="96"
                      stroke="currentColor"
                      strokeDasharray="5 4"
                    />
                    <text x="310" y="20" textAnchor="middle" fill="currentColor">
                      Radio ≤ {fmt(current.threshold, 1)} R⊕
                    </text>
                  </g>
                )}
              </svg>
              <figcaption>
                Ocho ejemplos sintéticos · círculo: Compacto; cuadrado: Con envoltura. Radio en R⊕.
              </figcaption>
            </figure>
          )}
          {step === 0 ? (
            <section className="s02-impurity__node" aria-label="Nodo padre S">
              <h4>Padre S · {examples.length} casos</h4>
              <p>
                {rootCounts.compact} compactos + {rootCounts.wrapped} con envoltura
              </p>
              <p>
                p₁(S) = {rootCounts.compact}/{examples.length} ={' '}
                {fmt(rootCounts.compact / examples.length)}; p₂(S) = {rootCounts.wrapped}/
                {examples.length} = {fmt(rootCounts.wrapped / examples.length)}; Σpₖ(S) = 1.
              </p>
              <S02Math
                block
                label={`Impureza del padre: ${fmt(root)}${unit}`}
                tex={
                  criterion === 'gini'
                    ? `G(S)=1-[(${rootCounts.compact}/${examples.length})^2+(${rootCounts.wrapped}/${examples.length})^2]=${root.toFixed(3)}`
                    : 'H(S)=-[0.5\\log_2(0.5)+0.5\\log_2(0.5)]=1\\ \\mathrm{bit}'
                }
              />
            </section>
          ) : (
            <section
              className="s02-impurity__node s02-impurity__node--compact"
              aria-label="Nodo padre S"
            >
              <strong>
                Padre S · {examples.length} casos: {rootCounts.compact} compactos y{' '}
                {rootCounts.wrapped} con envoltura
              </strong>
              <p>
                {symbol}(S) = {fmt(root)}
                {unit}
              </p>
            </section>
          )}
          {step > 0 && (
            <>
              <p className="s02-impurity__branches-label">
                ↙ Radio ≤ {fmt(current.threshold, 1)} R⊕ · Radio &gt; {fmt(current.threshold, 1)} R⊕
                ↘
              </p>
              <div className="s02-impurity__children">
                {node('S_L', current.left)}
                {node('S_R', current.right)}
              </div>
            </>
          )}
        </div>
        <aside className="s02-impurity__explanation">
          {step === 0 && (
            <>
              <h4>La proporción se calcula dentro del nodo</h4>
              <p>
                pₖ(S) cuenta los casos de la clase k y los divide entre todos los casos de S. Al
                cambiar de nodo cambia el denominador.
              </p>
              <p>
                Un grupo puro tiene proporciones 1 y 0: Gini = 0. Con dos clases, la mezcla mitad y
                mitad tiene el máximo Gini: 0,5.
              </p>
              <p>
                Cada p está entre 0 y 1; por eso p² ≤ p. La suma de cuadrados llega a 1 en un nodo
                puro. Para K clases, el máximo de Gini es 1 − 1/K.
              </p>
            </>
          )}
          {step === 1 && (
            <>
              <h4>El corte reparte los mismos ocho casos</h4>
              <p>
                El umbral de 1,3 R⊕ envía tres compactos al hijo izquierdo. A la derecha quedan un
                compacto y cuatro casos con envoltura.
              </p>
              <p>
                La derecha tiene cinco casos: sus proporciones son 1/5 y 4/5. Cada hijo tiene sus
                propias proporciones, que también suman 1.
              </p>
              <p>
                La izquierda es pura; la derecha todavía mezcla etiquetas. El corte ayuda aunque no
                sea perfecto.
              </p>
            </>
          )}
          {step >= 2 && (
            <>
              <h4>Pesar cada hijo por su tamaño</h4>
              <p>
                w_L = {current.left.length}/8; w_R = {current.right.length}/8. Estos pesos suman 1 y
                evitan dar la misma importancia a hijos de tamaños distintos.
              </p>
              <S02Math
                block
                label="Impureza posterior igual a promedio ponderado de los hijos"
                tex={`${symbol}_{\\mathrm{despues}}=\\frac{${current.left.length}}8\\cdot ${current.leftImpurity.toFixed(3)}+\\frac{${current.right.length}}8\\cdot ${current.rightImpurity.toFixed(3)}=${current.weightedImpurity.toFixed(3)}`}
              />
              <S02Math
                block
                label="Reducción de impureza igual al valor inicial menos el posterior"
                tex={`${criterion === 'gini' ? '\\Delta G' : '\\operatorname{IG}'}=${root.toFixed(3)}-${current.weightedImpurity.toFixed(3)}=${current.reduction.toFixed(3)}`}
              />
              <p>
                El árbol elige la mayor reducción local y repite el proceso en cada rama. El corte
                perfecto de este ejemplo sintético no demuestra generalización.
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <fieldset>
                <legend>Criterio de comparación</legend>
                {(['gini', 'entropy'] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={criterion === value}
                    onClick={() => setCriterion(value)}
                  >
                    {value === 'gini' ? 'Gini' : 'Entropía'}
                  </button>
                ))}
              </fieldset>
              <p>
                La entropía usa las mismas proporciones y se expresa en bits. Se define 0·log₂(0) =
                0 para clases ausentes.
              </p>
              <label htmlFor="s02-information-threshold">
                Umbral candidato: {fmt(current.threshold, 1)} R⊕
              </label>
              <input
                id="s02-information-threshold"
                type="range"
                min={0}
                max={thresholds.length - 1}
                step={1}
                value={candidateIndex}
                onChange={(event) => setCandidateIndex(Number(event.currentTarget.value))}
              />
              <output
                className="s02-impurity__readout"
                htmlFor="s02-information-threshold"
                aria-live="polite"
              >
                Antes: {fmt(root)}
                {unit} · Después: {fmt(current.weightedImpurity)}
                {unit} · {criterion === 'gini' ? 'Reducción de Gini' : 'Ganancia de información'}:{' '}
                {fmt(current.reduction)}
                {unit}
              </output>
              <button type="button" onClick={() => setCandidateIndex(bestIndex)}>
                Ver mejor corte
              </button>
            </>
          )}
        </aside>
      </div>

      <p role="status" aria-live="polite" className="s02-impurity__status">
        Paso {step + 1} de 4 · {steps[step]}. Corte {fmt(current.threshold, 1)} R⊕;{' '}
        {current.left.length}/{current.right.length} casos;{' '}
        {criterion === 'gini' ? 'reducción de Gini' : 'ganancia de información'}{' '}
        {fmt(current.reduction)}
        {unit}.
      </p>
      <details className="s02-impurity__worked">
        <summary>Ejemplo trabajado completo</summary>
        <p>
          Padre: 4/8 y 4/8 → G(S) = 0,5. Corte 1,3 R⊕: izquierda 3/3 y 0/3 → G(S_L) = 0; derecha 1/5
          y 4/5 → G(S_R) = {fmt(fixed.rightImpurity)}. Después: (3/8)·0 + (5/8)·
          {fmt(fixed.rightImpurity)} = {fmt(fixed.weightedImpurity)}. Reducción: 0,5 −{' '}
          {fmt(fixed.weightedImpurity)} = {fmt(fixed.reduction)}. Corte 1,5 R⊕: dos hijos puros;
          Gini posterior 0, reducción 0,5; entropía inicial 1 bit y posterior 0 bits.
        </p>
      </details>
    </section>
  );
}
