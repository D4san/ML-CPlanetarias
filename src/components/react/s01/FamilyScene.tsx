import type { S01FamilyBiasId, S01LearningMode } from '../../../lib/s01-journey';
import type { FamilySceneProps } from './scene-types';

export function FamilyScene({ state, dispatch, part }: FamilySceneProps) {
  const showGraphic = part !== 'interaction';
  const showInteraction = part !== 'graphic';
  const biasCorrect = state.familyBiasGuess === 'open';
  const biasFeedback: Record<S01FamilyBiasId, string> = {
    closed:
      'Una familia cerrada obliga al caso A+B a parecerse a A, B o C. La etiqueta no demuestra que esas sean todas las categorías posibles.',
    open: 'La familia abierta conserva una salida híbrida o una abstención. Así podemos investigar si A+B es una categoría, una mezcla, ruido o un caso fuera del dominio.',
    complexity:
      'Más parámetros pueden cambiar la frontera, pero no crean una categoría que el conjunto de salidas excluye desde el principio.',
  };
  const flow =
    state.learningMode === 'rules'
      ? ['inspeccionar ejemplos', 'escribir umbrales', 'probar casos', 'añadir excepciones']
      : ['reunir ejemplos', 'elegir una familia', 'evaluar no vistos', 'revisar sesgos'];

  return (
    <section className="s01-scene s01-scene--family" aria-labelledby="s01-family-title">
      {showGraphic && (
        <div className="s01-scene__graphic s01-learning-flow">
          <div className="s01-learning-flow__header">
            <div>
              <p className="s01-mini-label">La salida todavía no elige el modelo</p>
              <h4>La familia decide qué hipótesis caben</h4>
              <p>
                La tarea fija qué debe salir. La familia aporta una forma de construir la relación,
                extenderla a casos nuevos y representar lo que queda fuera.
              </p>
            </div>
            <div className="s01-segmented" aria-label="Forma de construir la regla">
              {(
                [
                  ['rules', 'Reglas explícitas'],
                  ['learning', 'Aprender de datos'],
                ] as const
              ).map(([mode, label]) => (
                <button
                  type="button"
                  key={mode}
                  aria-pressed={state.learningMode === mode}
                  onClick={() =>
                    dispatch({ type: 'set-learning-mode', mode: mode as S01LearningMode })
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <ol data-mode={state.learningMode}>
            {flow.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
          <p className="s01-learning-flow__note">
            {state.learningMode === 'rules'
              ? 'El conocimiento se escribe antes de clasificar.'
              : 'La relación se ajusta con ejemplos y una medida de desempeño.'}
          </p>
        </div>
      )}
      {showInteraction && (
        <div className="s01-scene__interaction s01-compatible s01-bias-challenge">
          <div>
            <p className="s01-mini-label">Elegir una familia también elige sus salidas</p>
            <h4 id="s01-family-title">¿Qué hace con un objeto híbrido?</h4>
            <p>
              Tenemos ejemplos de tres clases: A, B y C. Un objeto nuevo combina rasgos de A y B.
              Compara qué hipótesis deja abierta cada familia antes de elegir el modelo.
            </p>
          </div>
          <div
            className="s01-bias-map"
            role="img"
            aria-label="Una familia cerrada fuerza el caso híbrido a una clase; una familia abierta conserva híbrido o abstención"
          >
            <div className="s01-bias-map__observations">
              <span className="s01-bias-map__label">Casos y nueva observación</span>
              <div>
                {['A', 'B', 'C'].map((label) => (
                  <span className="s01-bias-map__class" key={label}>
                    {label}
                  </span>
                ))}
                <span className="s01-bias-map__hybrid">
                  <b>A+B</b>
                  <small>híbrido</small>
                </span>
              </div>
            </div>
            <div className="s01-bias-map__arrow" aria-hidden="true">
              →
            </div>
            <div className="s01-bias-map__families">
              <article data-selected={state.familyBiasGuess === 'closed'}>
                <span className="s01-bias-map__family-kind">Familia cerrada</span>
                <strong>A · B · C</strong>
                <small>A+B → A / B / C</small>
                <em>fuerza una clase</em>
              </article>
              <article data-selected={state.familyBiasGuess === 'open'}>
                <span className="s01-bias-map__family-kind">Familia abierta</span>
                <strong>A · B · C · H</strong>
                <small>A+B → híbrido / abstención</small>
                <em>conserva la duda</em>
              </article>
            </div>
          </div>
          <div
            className="s01-choice-grid s01-choice-grid--bias"
            aria-label="Decisiones sobre la familia del modelo"
          >
            {(
              [
                ['closed', 'Familia cerrada: A / B / C'],
                ['open', 'Familia abierta: añadir híbrido o abstención'],
                ['complexity', 'Hacerla más compleja, sin cambiar las categorías'],
              ] as const
            ).map(([bias, label]) => (
              <button
                type="button"
                key={bias}
                aria-pressed={state.familyBiasGuess === bias}
                data-correct={state.familyBiasGuess === bias && bias === 'open'}
                onClick={() => dispatch({ type: 'set-family-bias', bias })}
              >
                {label}
              </button>
            ))}
          </div>
          <p
            className="s01-feedback"
            data-status={
              state.familyBiasGuess === null ? 'idle' : biasCorrect ? 'correct' : 'repair'
            }
            aria-live="polite"
          >
            {state.familyBiasGuess === null
              ? 'La elección de la familia también decide qué categorías puede reconocer.'
              : biasFeedback[state.familyBiasGuess]}
          </p>
          <details className="s01-bias-note">
            <summary>¿Por qué una muestra finita deja hipótesis abiertas?</summary>
            <p>
              Con tres casos no observados y tres clases posibles, todavía hay{' '}
              <strong>3³ = 27</strong> completaciones compatibles. La cuenta muestra la ambigüedad;
              el caso híbrido muestra el costo de cerrar las categorías demasiado pronto.
            </p>
          </details>
        </div>
      )}
    </section>
  );
}
