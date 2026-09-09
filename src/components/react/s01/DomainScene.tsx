import type { S01DomainView } from '../../../lib/s01-journey';
import type { DomainSceneProps } from './scene-types';

export function DomainScene({ state, dispatch, part }: DomainSceneProps) {
  const showGraphic = part !== 'interaction';
  const showInteraction = part !== 'graphic';
  const observed = state.domainView === 'observed';
  const syntheticPoints = [
    [88, 150],
    [138, 145],
    [188, 151],
    [238, 203],
    [288, 225],
    [338, 151],
    [388, 148],
    [438, 153],
    [488, 173],
    [538, 211],
    [588, 156],
    [638, 147],
    [698, 151],
  ];
  const observedPoints: ReadonlyArray<readonly [number, number, number]> = [
    [88, 159, 9],
    [138, 137, 12],
    [188, 158, 10],
    [238, 215, 15],
    [288, 236, 13],
    [338, 162, 11],
    [388, 137, 10],
    [438, 167, 15],
    [588, 169, 13],
    [638, 136, 10],
    [698, 163, 12],
  ];

  return (
    <section className="s01-scene s01-scene--domain" aria-labelledby="s01-domain-title">
      {showGraphic && (
        <div className="s01-scene__graphic">
          <header className="s01-graphic-intro">
            <p className="s01-mini-label">La familia puede permanecer fija</p>
            <h4>El modelo aprende en un mundo y se usa en otro</h4>
            <p>
              La pregunta sigue igual; ruido, resolución y cobertura cambian la distribución que
              recibe.
            </p>
          </header>
          <svg
            viewBox="0 0 780 390"
            role="img"
            aria-labelledby="s01-domain-svg-title s01-domain-svg-desc"
          >
            <title id="s01-domain-svg-title">
              Puntos sintéticos y observados alrededor de una señal latente
            </title>
            <desc id="s01-domain-svg-desc">
              La línea tenue representa una señal latente. Los puntos sintéticos son regulares y
              tienen parámetros conocidos. Los puntos observados incluyen barras de error y una
              región faltante; representan mediciones afectadas por ruido, resolución y efectos del
              instrumento.
            </desc>
            <g className="s01-axis">
              <path d="M72 52 V302 H728" />
              <text x="400" y="348" textAnchor="middle">
                longitud de onda
              </text>
              <text x="26" y="178" textAnchor="middle" transform="rotate(-90 26 178)">
                flujo
              </text>
            </g>
            <path
              className="s01-domain-latent"
              d="M78 146 C130 139 170 146 215 146 C248 145 252 214 280 222 C307 223 310 146 348 146 C405 146 423 148 452 146 C486 144 492 202 520 209 C549 209 561 147 606 147 C654 146 685 143 722 149"
            />
            <g className="s01-domain-series" data-series="synthetic" data-active={!observed}>
              <text className="s01-domain-series__label" x="95" y="92">
                sintético · simulado
              </text>
              {syntheticPoints.map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
              ))}
            </g>
            <g className="s01-domain-series" data-series="observed" data-active={observed}>
              <text className="s01-domain-series__label" x="95" y="278">
                observado · medido
              </text>
              {observedPoints.map(([x, y, error]) => (
                <g key={`${x}-${y}`}>
                  <path d={`M${x} ${y - error} V${y + error}`} />
                  <path d={`M${x - 5} ${y - error} H${x + 5} M${x - 5} ${y + error} H${x + 5}`} />
                  <circle cx={x} cy={y} r="5.5" />
                </g>
              ))}
            </g>
            <g className="s01-domain-gap" data-active={observed}>
              <rect x="477" y="65" width="69" height="237" rx="12" />
              <path d="M511 70 V297" />
              <text x="511" y="43" textAnchor="middle">
                cobertura faltante
              </text>
            </g>
          </svg>
        </div>
      )}
      {showInteraction && (
        <div className="s01-scene__interaction s01-domain-controls">
          <div>
            <p className="s01-mini-label">Antes de evaluar · compara entrenamiento y uso</p>
            <h4 id="s01-domain-title">¿Qué tendría que coincidir para transferir el modelo?</h4>
            <p>
              Activa cada vista. La línea representa el fenómeno ideal; los puntos muestran cómo
              llega la señal al modelo.
            </p>
          </div>
          <div className="s01-segmented" aria-label="Dominio del espectro">
            {(
              [
                ['synthetic', 'Sintético'],
                ['observed', 'Observado'],
              ] as const
            ).map(([view, label]) => (
              <button
                type="button"
                key={view}
                aria-pressed={state.domainView === view}
                onClick={() => dispatch({ type: 'set-domain-view', view: view as S01DomainView })}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className="s01-domain-definitions"
            aria-label="Diferencia entre datos sintéticos y observados"
          >
            <article data-active={!observed}>
              <strong>Sintético</strong>
              <p>Simulado con parámetros conocidos, muestreo regular y cobertura completa.</p>
            </article>
            <article data-active={observed}>
              <strong>Observado</strong>
              <p>
                Medido por un instrumento: incluye incertidumbre, faltantes, selección y respuesta
                del detector.
              </p>
            </article>
          </div>
          <ul aria-live="polite">
            {(observed
              ? [
                  'ruido y resolución',
                  'región faltante',
                  'respuesta instrumental',
                  'selección observacional',
                ]
              : [
                  'parámetros conocidos',
                  'muestreo regular',
                  'cobertura completa',
                  'supuestos del simulador',
                ]
            ).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
