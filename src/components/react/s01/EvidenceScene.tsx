import type { S01Capacity } from '../../../lib/s01-journey';
import type { EvidenceSceneProps } from './scene-types';

export function EvidenceScene({ state, dispatch, part }: EvidenceSceneProps) {
  const showGraphic = part !== 'interaction';
  const showInteraction = part !== 'graphic';
  const curves: Record<S01Capacity, string> = {
    underfit: 'M74 226 C175 204 255 187 350 172 C455 156 555 143 686 130',
    balanced:
      'M74 248 C140 234 170 199 224 187 C285 173 302 126 360 132 C425 138 455 191 514 177 C578 163 622 111 686 100',
    overfit:
      'M74 246 C112 162 154 266 196 176 C235 93 272 233 315 136 C357 45 398 238 439 141 C482 42 525 222 567 123 C610 27 648 192 686 82',
  };
  const capacityCopy: Record<S01Capacity, { title: string; text: string }> = {
    underfit: {
      title: 'Subajuste · capacidad insuficiente',
      text: 'La curva es demasiado rígida: pierde parte del patrón y falla tanto en los datos de ajuste como en los no vistos.',
    },
    balanced: {
      title: 'Ajuste útil · capacidad equilibrada',
      text: 'La curva recoge la señal principal sin perseguir cada fluctuación. La prueba en datos no vistos decide si generaliza.',
    },
    overfit: {
      title: 'Sobreajuste · capacidad excesiva',
      text: 'La curva memoriza ruido de los ejemplos de ajuste. Una apariencia perfecta en entrenamiento puede empeorar al cambiar de objeto.',
    },
  };
  const claimCorrect = state.claimId === 'predictive';

  return (
    <section className="s01-scene s01-scene--evidence" aria-labelledby="s01-evidence-title">
      {showGraphic && (
        <div className="s01-scene__graphic">
          <header className="s01-graphic-intro">
            <p className="s01-mini-label">Con el dominio explícito</p>
            <h4>Generalizar exige equilibrar la capacidad</h4>
            <p>La curva debe seguir la señal, no memorizar el ruido de los ejemplos de ajuste.</p>
          </header>
          <svg
            viewBox="0 0 780 390"
            role="img"
            aria-labelledby="s01-evidence-svg-title s01-evidence-svg-desc"
          >
            <title id="s01-evidence-svg-title">
              Comparación entre subajuste, ajuste útil y sobreajuste
            </title>
            <desc id="s01-evidence-svg-desc">
              Puntos de ajuste con barras de error se comparan con una línea base y una curva de
              capacidad baja, equilibrada o excesiva. Los puntos naranjas representan objetos no
              vistos.
            </desc>
            <g className="s01-axis">
              <path d="M58 35 V300 H714" />
            </g>
            <path className="s01-baseline-line" d="M72 186 H696" />
            <text className="s01-baseline-label" x="690" y="171" textAnchor="end">
              línea base
            </text>
            <path className="s01-model-curve" d={curves[state.capacity]} />
            {(
              [
                [92, 240, 8],
                [140, 210, 10],
                [198, 185, 7],
                [256, 171, 9],
                [316, 131, 8],
                [374, 139, 7],
                [432, 165, 9],
                [490, 181, 8],
                [548, 159, 7],
                [610, 116, 9],
                [672, 93, 8],
              ] as const
            ).map(([x, y, error]) => (
              <g className="s01-evidence-series s01-evidence-series--fit" key={`${x}-${y}`}>
                <path d={`M${x} ${y - error} V${y + error}`} />
                <path d={`M${x - 4} ${y - error} H${x + 4} M${x - 4} ${y + error} H${x + 4}`} />
                <circle cx={x} cy={y} r="5" />
              </g>
            ))}
            {(
              [
                [116, 226, 7],
                [268, 151, 9],
                [408, 174, 8],
                [558, 150, 10],
                [650, 126, 7],
              ] as const
            ).map(([x, y, error]) => (
              <g className="s01-evidence-series s01-evidence-series--unseen" key={`${x}-${y}`}>
                <path d={`M${x} ${y - error} V${y + error}`} />
                <path d={`M${x - 4} ${y - error} H${x + 4} M${x - 4} ${y + error} H${x + 4}`} />
                <circle cx={x} cy={y} r="5.5" />
              </g>
            ))}
            <g className="s01-unseen-lane">
              <rect x="72" y="323" width="622" height="36" rx="18" />
              <text x="383" y="346" textAnchor="middle">
                puntos naranjas · datos no vistos · mismo uso previsto
              </text>
            </g>
          </svg>
        </div>
      )}
      {showInteraction && (
        <div className="s01-scene__interaction s01-evidence-controls">
          <div>
            <p className="s01-mini-label">Última decisión · limita la afirmación</p>
            <h4 id="s01-evidence-title">¿Qué curva generaliza mejor?</h4>
            <p>
              Compara tres capacidades. Luego decide qué afirmación permite realmente la evidencia.
            </p>
          </div>
          <div className="s01-segmented" aria-label="Capacidad ilustrativa del modelo">
            {(
              [
                ['underfit', 'Subajuste'],
                ['balanced', 'Ajuste útil'],
                ['overfit', 'Sobreajuste'],
              ] as const
            ).map(([capacity, label]) => (
              <button
                type="button"
                key={capacity}
                aria-label={
                  capacity === 'underfit'
                    ? 'Insuficiente'
                    : capacity === 'balanced'
                      ? 'Equilibrada'
                      : 'Excesiva'
                }
                aria-pressed={state.capacity === capacity}
                onClick={() =>
                  dispatch({ type: 'set-capacity', capacity: capacity as S01Capacity })
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div className="s01-fit-reading" aria-live="polite">
            <strong>{capacityCopy[state.capacity].title}</strong>
            <p>{capacityCopy[state.capacity].text}</p>
          </div>
          <fieldset className="s01-claim-challenge">
            <legend>¿Cuál es la única afirmación defendible?</legend>
            {[
              ['predictive', 'En estas condiciones, superó la línea base en objetos no vistos.'],
              ['physical', 'La curva demuestra que el modelo aprendió el mecanismo físico.'],
              ['universal', 'Funcionará igual con cualquier instrumento y población.'],
            ].map(([id, label]) => (
              <button
                type="button"
                key={id}
                aria-pressed={state.claimId === id}
                onClick={() =>
                  dispatch({
                    type: 'set-claim',
                    claimId: id as 'predictive' | 'physical' | 'universal',
                  })
                }
              >
                {label}
              </button>
            ))}
          </fieldset>
          <p
            className="s01-feedback"
            data-status={state.claimId === null ? 'idle' : claimCorrect ? 'correct' : 'repair'}
            aria-live="polite"
          >
            {state.claimId === null
              ? 'La métrica todavía necesita una afirmación con alcance explícito.'
              : claimCorrect
                ? 'Esa afirmación conserva condiciones, comparación y datos no vistos.'
                : 'Una buena predicción todavía no prueba mecanismo físico ni validez universal.'}
          </p>
        </div>
      )}
    </section>
  );
}
