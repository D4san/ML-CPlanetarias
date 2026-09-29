import { useState } from 'react';

const CASES = ['A', 'B', 'C', 'D'] as const;
const INITIAL_SAMPLES = [
  ['B', 'D', 'B', 'A'],
  ['A', 'C', 'D', 'D'],
  ['C', 'B', 'C', 'A'],
] as const;

function samplesForRound(round: number) {
  if (round === 0) return INITIAL_SAMPLES.map((sample) => [...sample]);

  let seed = (20260928 + round * 104729) >>> 0;
  const nextCase = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return CASES[Math.floor((seed / 2 ** 32) * CASES.length)]!;
  };

  return Array.from({ length: 3 }, () => Array.from({ length: CASES.length }, nextCase));
}

type TreeShape = 'shallow' | 'balanced' | 'uneven';

function TreeDiagram({ shape }: { shape: TreeShape }) {
  return (
    <svg aria-hidden="true" className="s02-bootstrap__tree" viewBox="0 0 120 66">
      {shape === 'shallow' && (
        <>
          <path className="s02-bootstrap__branch" d="M60 18v10L34 46M60 28 86 46" />
          <rect
            className="s02-bootstrap__decision-node"
            height="16"
            rx="4"
            width="26"
            x="47"
            y="2"
          />
          <text className="s02-bootstrap__question" textAnchor="middle" x="60" y="14">
            ?
          </text>
          <circle className="s02-bootstrap__leaf-node" cx="34" cy="50" r="6" />
          <circle className="s02-bootstrap__leaf-node" cx="86" cy="50" r="6" />
        </>
      )}
      {shape === 'balanced' && (
        <>
          <path
            className="s02-bootstrap__branch"
            d="M60 15v5L30 25M60 20l30 5M30 39v3L15 50M30 42l15 8M90 39v3L75 50M90 42l15 8"
          />
          <rect
            className="s02-bootstrap__decision-node"
            height="14"
            rx="4"
            width="22"
            x="49"
            y="1"
          />
          <text className="s02-bootstrap__question" textAnchor="middle" x="60" y="12">
            ?
          </text>
          <rect
            className="s02-bootstrap__decision-node"
            height="14"
            rx="4"
            width="20"
            x="20"
            y="25"
          />
          <rect
            className="s02-bootstrap__decision-node"
            height="14"
            rx="4"
            width="20"
            x="80"
            y="25"
          />
          <text className="s02-bootstrap__question" textAnchor="middle" x="30" y="35">
            ?
          </text>
          <text className="s02-bootstrap__question" textAnchor="middle" x="90" y="35">
            ?
          </text>
          <circle className="s02-bootstrap__leaf-node" cx="15" cy="54" r="5" />
          <circle className="s02-bootstrap__leaf-node" cx="45" cy="54" r="5" />
          <circle className="s02-bootstrap__leaf-node" cx="75" cy="54" r="5" />
          <circle className="s02-bootstrap__leaf-node" cx="105" cy="54" r="5" />
        </>
      )}
      {shape === 'uneven' && (
        <>
          <path
            className="s02-bootstrap__branch"
            d="M60 18v10L32 49M60 28 88 28v11L72 51M88 39l16 12"
          />
          <rect
            className="s02-bootstrap__decision-node"
            height="16"
            rx="4"
            width="26"
            x="47"
            y="2"
          />
          <text className="s02-bootstrap__question" textAnchor="middle" x="60" y="14">
            ?
          </text>
          <rect
            className="s02-bootstrap__decision-node"
            height="14"
            rx="4"
            width="20"
            x="78"
            y="25"
          />
          <text className="s02-bootstrap__question" textAnchor="middle" x="88" y="35">
            ?
          </text>
          <circle className="s02-bootstrap__leaf-node" cx="32" cy="53" r="6" />
          <circle className="s02-bootstrap__leaf-node" cx="72" cy="55" r="5" />
          <circle className="s02-bootstrap__leaf-node" cx="104" cy="55" r="5" />
        </>
      )}
    </svg>
  );
}

function drawCards(sample: readonly string[]) {
  const seen = new Map<string, number>();
  return sample.map((caseId, index) => {
    const occurrence = (seen.get(caseId) ?? 0) + 1;
    seen.set(caseId, occurrence);
    return { caseId, index, occurrence };
  });
}

export default function S02BootstrapSampler() {
  const [round, setRound] = useState(0);
  const samples = samplesForRound(round);
  const oobCases = samples.map((sample) => CASES.filter((caseId) => !sample.includes(caseId)));

  const spokenSummary = samples
    .map((sample, index) => {
      const oob = oobCases[index]!;
      return `Árbol ${index + 1}: ${sample.join(', ')}. Casos OOB: ${oob.join(', ') || 'ninguno'}.`;
    })
    .join(' ');

  return (
    <section aria-label="Remuestreo bootstrap: de los datos al bosque" className="s02-bootstrap">
      <div className="s02-bootstrap__toolbar">
        <div className="s02-bootstrap__source">
          <span className="s02-bootstrap__eyebrow">Conjunto de entrenamiento · 4 casos</span>
          <ul aria-label="Casos originales" className="s02-bootstrap__original-cases">
            {CASES.map((caseId) => (
              <li key={caseId}>{caseId}</li>
            ))}
          </ul>
        </div>
        <div aria-label="Controles del sorteo" className="s02-bootstrap__controls">
          <button onClick={() => setRound((currentRound) => currentRound + 1)} type="button">
            Sortear otras remuestras
          </button>
          <button className="s02-bootstrap__reset" onClick={() => setRound(0)} type="button">
            Reiniciar
          </button>
        </div>
      </div>

      <p className="s02-bootstrap__rule">
        OOB (out-of-bag) identifica los casos del conjunto original que no salieron en los sorteos
        de ese árbol.
      </p>

      <div aria-label="Una remuestra independiente para cada árbol" className="s02-bootstrap__rows">
        {samples.map((sample, treeIndex) => {
          const treeNumber = treeIndex + 1;
          const repeatedCases = new Set(
            drawCards(sample)
              .filter((draw) => draw.occurrence > 1)
              .map((draw) => draw.caseId),
          );
          const oob = oobCases[treeIndex]!;

          return (
            <div className="s02-bootstrap__row" data-tree={treeIndex + 1} key={treeIndex}>
              <strong className="s02-bootstrap__tree-label">Árbol {treeNumber}</strong>
              <ol
                aria-label={`Cuatro sorteos para el árbol ${treeNumber}${repeatedCases.size ? `; se repite ${[...repeatedCases].join(', ')}` : ''}`}
                className="s02-bootstrap__draws"
              >
                {drawCards(sample).map(({ caseId, index, occurrence }) => (
                  <li
                    aria-label={`Caso ${caseId}, sorteo ${index + 1}${occurrence > 1 ? ', repetido' : ''}`}
                    data-repeated={occurrence > 1 ? 'true' : undefined}
                    key={`${caseId}-${index}`}
                  >
                    <span>{caseId}</span>
                    {occurrence > 1 && <small>repite</small>}
                  </li>
                ))}
              </ol>
              <span aria-hidden="true" className="s02-bootstrap__arrow">
                →
              </span>
              <div
                aria-label={`Esquema ilustrativo de una posible estructura del árbol ${treeNumber}`}
                className="s02-bootstrap__tree-wrap"
                role="img"
              >
                <TreeDiagram
                  shape={treeIndex === 0 ? 'shallow' : treeIndex === 1 ? 'balanced' : 'uneven'}
                />
              </div>
              <div
                aria-label={`Casos OOB para el árbol ${treeNumber}`}
                className="s02-bootstrap__oob"
              >
                <span>OOB · casos que no salieron</span>
                <strong>{oob.length ? oob.join(', ') : 'ninguno'}</strong>
              </div>
            </div>
          );
        })}
      </div>

      <div className="s02-bootstrap__forest-bridge">
        <div aria-label="Árboles 1, 2 y 3" className="s02-bootstrap__forest-members">
          <span className="s02-bootstrap__forest-member" data-tree="1">
            Árbol 1
          </span>
          <span aria-hidden="true" className="s02-bootstrap__forest-plus">
            +
          </span>
          <span className="s02-bootstrap__forest-member" data-tree="2">
            Árbol 2
          </span>
          <span aria-hidden="true" className="s02-bootstrap__forest-plus">
            +
          </span>
          <span className="s02-bootstrap__forest-member" data-tree="3">
            Árbol 3
          </span>
        </div>
        <span aria-hidden="true" className="s02-bootstrap__arrow">
          →
        </span>
        <p>
          <strong>Ensamble (bosque)</strong>
          <span>varios árboles combinan sus predicciones</span>
        </p>
      </div>

      <p aria-atomic="true" aria-live="polite" className="s02-bootstrap__sr-only" role="status">
        Ronda {round + 1}. {spokenSummary}
      </p>
    </section>
  );
}
