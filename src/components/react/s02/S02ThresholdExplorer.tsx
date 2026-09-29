import { useEffect, useId, useState } from 'react';

import './s02-threshold-explorer.css';

type Feature = 'x1' | 'x2';
type Label = 'A' | 'B';
type Rule = { feature: Feature; threshold: number };
type Point = { id: string; x1: number; x2: number; label: Label };
type Bounds = { xMin: number; xMax: number; yMin: number; yMax: number };
type LeafStats = { total: number; a: number; b: number };
type TreeNode = { path: string; depth: number };
type HistoryEntry = {
  splits: Record<string, Rule>;
  activePath: string | null;
  candidate: Rule;
};

const points: Point[] = [
  { id: 'P01', x1: 1, x2: 1, label: 'A' },
  { id: 'P02', x1: 1, x2: 2, label: 'A' },
  { id: 'P03', x1: 2, x2: 1, label: 'A' },
  { id: 'P04', x1: 2, x2: 2, label: 'A' },
  { id: 'P05', x1: 1, x2: 4, label: 'B' },
  { id: 'P06', x1: 2, x2: 4, label: 'B' },
  { id: 'P07', x1: 4, x2: 1, label: 'B' },
  { id: 'P08', x1: 5, x2: 1, label: 'B' },
  { id: 'P09', x1: 4, x2: 2, label: 'B' },
  { id: 'P10', x1: 5, x2: 2, label: 'B' },
  { id: 'P11', x1: 4, x2: 4, label: 'A' },
  { id: 'P12', x1: 5, x2: 4, label: 'A' },
];

const domainMin = 0.5;
const domainMax = 5.5;
const plot = { left: 66, right: 520, top: 32, bottom: 286 };
const initialRule: Rule = { feature: 'x1', threshold: 3 };

function candidateForLeaf(path: string, splits: Record<string, Rule>): Rule {
  if (path === '') return initialRule;

  const parentRule = splits[path.slice(0, -1)];
  const nextFeature = parentRule?.feature === 'x1' ? 'x2' : 'x1';

  return { feature: nextFeature, threshold: 3 };
}

function featureName(feature: Feature) {
  return feature === 'x1' ? 'x₁' : 'x₂';
}

function formatThreshold(value: number) {
  return value.toFixed(1);
}

function formatRule(rule: Rule) {
  return `${featureName(rule.feature)} ≤ ${formatThreshold(rule.threshold)}`;
}

function countPoints(items: Point[]): LeafStats {
  const a = items.filter((point) => point.label === 'A').length;
  const b = items.length - a;
  return { total: items.length, a, b };
}

function resultLabel(stats: LeafStats) {
  if (stats.total === 0) return 'rama vacía';
  if (stats.a === stats.b) return 'empate';
  return stats.a > stats.b ? 'mayoría A' : 'mayoría B';
}

function countLabel(stats: LeafStats) {
  const noun = stats.total === 1 ? 'punto' : 'puntos';
  return `${stats.total} ${noun} (${stats.a} A, ${stats.b} B; ${resultLabel(stats)})`;
}

function pointPath(point: Point, splits: Record<string, Rule>) {
  // La regla envía cada punto a la rama que cumple su umbral.
  let path = '';

  while (true) {
    const rule = splits[path];
    if (!rule) break;
    path += point[rule.feature] <= rule.threshold ? 'L' : 'R';
  }

  return path;
}

function pointsInLeaf(path: string, splits: Record<string, Rule>) {
  return points.filter((point) => pointPath(point, splits) === path);
}

function pointsUnderNode(path: string, splits: Record<string, Rule>) {
  return points.filter((point) => pointPath(point, splits).startsWith(path));
}

function leafPaths(splits: Record<string, Rule>) {
  // Una hoja es un grupo que todavía no tiene otra regla.
  const paths = [''];

  for (const path of paths) {
    if (splits[path] && path.length < 2) paths.push(`${path}L`, `${path}R`);
  }

  return paths.filter((path) => !splits[path]);
}

function eligibleLeafPaths(splits: Record<string, Rule>) {
  return leafPaths(splits).filter((path) => path.length < 2);
}

function branchDescription(path: string, splits: Record<string, Rule>) {
  if (!path) return 'raíz';

  const conditions: string[] = [];
  let parent = '';

  for (const direction of path) {
    const rule = splits[parent];
    if (!rule) break;
    const sign = direction === 'L' ? '≤' : '>';
    conditions.push(`${featureName(rule.feature)} ${sign} ${formatThreshold(rule.threshold)}`);
    parent += direction;
  }

  return conditions.join(' y ');
}

function branchName(path: string) {
  if (path === '') return 'Raíz';
  if (path === 'L') return 'Rama izquierda';
  if (path === 'R') return 'Rama derecha';
  return `Hoja ${path}`;
}

function getBounds(path: string, splits: Record<string, Rule>): Bounds {
  // El camino anterior recorta la región donde se aplica la nueva regla.
  const bounds: Bounds = {
    xMin: domainMin,
    xMax: domainMax,
    yMin: domainMin,
    yMax: domainMax,
  };
  let parent = '';

  for (const direction of path) {
    const rule = splits[parent];
    if (!rule) break;

    if (rule.feature === 'x1') {
      if (direction === 'L') bounds.xMax = Math.min(bounds.xMax, rule.threshold);
      else bounds.xMin = Math.max(bounds.xMin, rule.threshold);
    } else if (direction === 'L') {
      bounds.yMax = Math.min(bounds.yMax, rule.threshold);
    } else {
      bounds.yMin = Math.max(bounds.yMin, rule.threshold);
    }

    parent += direction;
  }

  return bounds;
}

function xPosition(value: number) {
  return plot.left + ((value - domainMin) / (domainMax - domainMin)) * (plot.right - plot.left);
}

function yPosition(value: number) {
  return plot.bottom - ((value - domainMin) / (domainMax - domainMin)) * (plot.bottom - plot.top);
}

function splitRegions(bounds: Bounds, rule: Rule) {
  if (rule.feature === 'x1') {
    const cut = Math.min(bounds.xMax, Math.max(bounds.xMin, rule.threshold));
    return [
      { side: 'less', xMin: bounds.xMin, xMax: cut, yMin: bounds.yMin, yMax: bounds.yMax },
      { side: 'greater', xMin: cut, xMax: bounds.xMax, yMin: bounds.yMin, yMax: bounds.yMax },
    ];
  }

  const cut = Math.min(bounds.yMax, Math.max(bounds.yMin, rule.threshold));
  return [
    { side: 'less', xMin: bounds.xMin, xMax: bounds.xMax, yMin: bounds.yMin, yMax: cut },
    { side: 'greater', xMin: bounds.xMin, xMax: bounds.xMax, yMin: cut, yMax: bounds.yMax },
  ];
}

function ruleLine(rule: Rule, bounds: Bounds, className: string, key: string) {
  if (rule.feature === 'x1') {
    const x = xPosition(rule.threshold);
    return (
      <line
        key={key}
        className={className}
        x1={x}
        x2={x}
        y1={yPosition(bounds.yMax)}
        y2={yPosition(bounds.yMin)}
      />
    );
  }

  const y = yPosition(rule.threshold);
  return (
    <line
      key={key}
      className={className}
      x1={xPosition(bounds.xMin)}
      x2={xPosition(bounds.xMax)}
      y1={y}
      y2={y}
    />
  );
}

function treeNodes(splits: Record<string, Rule>): TreeNode[] {
  const nodes: TreeNode[] = [{ path: '', depth: 0 }];

  for (const node of nodes) {
    if (splits[node.path] && node.depth < 2) {
      nodes.push(
        { path: `${node.path}L`, depth: node.depth + 1 },
        { path: `${node.path}R`, depth: node.depth + 1 },
      );
    }
  }

  return nodes;
}

function treeX(path: string) {
  return (
    350 +
    [...path].reduce((x, direction, index) => {
      const offset = 170 / 2 ** index;
      return x + (direction === 'L' ? -offset : offset);
    }, 0)
  );
}

function treeY(depth: number) {
  return 35 + depth * 85;
}

function S02TreeBranch({
  path,
  splits,
  activePath,
}: {
  path: string;
  splits: Record<string, Rule>;
  activePath: string | null;
}) {
  const rule = splits[path];
  const stats = countPoints(pointsUnderNode(path, splits));

  return (
    <li data-active={activePath === path}>
      <span>
        <strong>{branchName(path)}</strong>:{' '}
        {rule ? `regla ${formatRule(rule)}` : countLabel(stats)}
        {!rule && ` · ${resultLabel(stats)}`}
        {activePath === path && ' · seleccionada'}
      </span>
      {rule && (
        <ol>
          {(['L', 'R'] as const).map((direction) => (
            <li key={direction}>
              <span>
                {direction === 'L' ? '≤' : '>'} {formatThreshold(rule.threshold)}
              </span>
              <ol>
                <S02TreeBranch
                  path={`${path}${direction}`}
                  splits={splits}
                  activePath={activePath}
                />
              </ol>
            </li>
          ))}
        </ol>
      )}
    </li>
  );
}

function S02Tree({
  splits,
  candidate,
  activePath,
}: {
  splits: Record<string, Rule>;
  candidate: Rule;
  activePath: string | null;
}) {
  const previewSplits = activePath === null ? splits : { ...splits, [activePath]: candidate };
  const nodes = treeNodes(previewSplits);
  const internalNodes = nodes.filter((node) => previewSplits[node.path]);

  return (
    <div className="s02-threshold__tree-map">
      <svg
        className="s02-threshold__tree-svg"
        viewBox="0 0 700 240"
        aria-hidden="true"
        focusable="false"
      >
        {internalNodes.map((node) => {
          const rule = previewSplits[node.path];
          if (!rule) return null;
          const parentX = treeX(node.path);
          const parentY = treeY(node.depth) + 30;

          return (['L', 'R'] as const).map((direction) => {
            const childPath = `${node.path}${direction}`;
            const childX = treeX(childPath);
            const childY = treeY(node.depth + 1) - 30;
            const labelX = (parentX + childX) / 2;
            const labelY = (parentY + childY) / 2;

            return (
              <g
                className="s02-threshold__tree-branch"
                data-candidate={node.path === activePath}
                key={`${node.path}-${direction}`}
              >
                <path d={`M${parentX} ${parentY} L${childX} ${childY}`} />
                <text x={labelX} y={labelY + 6} textAnchor="middle">
                  {direction === 'L' ? '≤' : '>'}
                </text>
              </g>
            );
          });
        })}

        {nodes.map((node) => {
          const rule = previewSplits[node.path];
          const stats = countPoints(pointsUnderNode(node.path, previewSplits));
          const x = treeX(node.path);
          const y = treeY(node.depth);
          const top = y - 30;
          const firstLine = rule ? `${formatRule(rule)}?` : 'Hoja';
          const secondLine = `n=${stats.total} · A${stats.a}/B${stats.b}`;

          return (
            <g
              className="s02-threshold__tree-node"
              data-active={activePath === node.path}
              data-candidate={activePath === node.path}
              key={node.path || 'root'}
            >
              <rect x={x - 90} y={top} width="180" height="60" rx="6" />
              <text
                className="s02-threshold__tree-node-title"
                x={x}
                y={top + 23}
                textAnchor="middle"
              >
                {firstLine}
              </text>
              <text x={x} y={top + 50} textAnchor="middle">
                {secondLine}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="s02-threshold__tree-list" aria-label="Árbol con la regla candidata">
        <S02TreeBranch path="" splits={previewSplits} activePath={activePath} />
      </ol>
    </div>
  );
}

export function S02ThresholdExplorer() {
  const id = useId();
  const [splits, setSplits] = useState<Record<string, Rule>>({});
  const [activePath, setActivePath] = useState<string | null>('');
  const [candidate, setCandidate] = useState<Rule>(initialRule);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const leafChoices = eligibleLeafPaths(splits);
  const activePoints = activePath === null ? [] : pointsInLeaf(activePath, splits);
  const candidateLower = activePoints.filter(
    (point) => point[candidate.feature] <= candidate.threshold,
  );
  const candidateUpper = activePoints.filter(
    (point) => point[candidate.feature] > candidate.threshold,
  );
  const candidateBounds = activePath === null ? null : getBounds(activePath, splits);
  const plotTitleId = `${id}-plot-title`;
  const plotDescriptionId = `${id}-plot-description`;
  const sliderId = `${id}-threshold`;
  const previewId = `${id}-preview`;
  const ruleCount = Object.keys(splits).length;
  const candidateStep =
    activePath === null
      ? 'Árbol completo'
      : `Regla ${ruleCount + 1} · ${branchName(activePath).toLowerCase()}`;
  const activeDescription = activePath === null ? null : branchDescription(activePath, splits);
  const previewLeftStats = countPoints(candidateLower);
  const previewRightStats = countPoints(candidateUpper);

  const statusText =
    activePath === null
      ? `El árbol tiene ${ruleCount} reglas aplicadas. Todas las hojas alcanzaron la profundidad máxima de dos.`
      : `Nodo seleccionado: ${activeDescription}. Regla candidata: ${formatRule(candidate)}. Rama menor o igual: ${countLabel(previewLeftStats)}. Rama mayor: ${countLabel(previewRightStats)}. Reglas aplicadas: ${ruleCount}.`;

  function selectLeaf(path: string) {
    setActivePath(path);
    setCandidate(candidateForLeaf(path, splits));
  }

  function applyRule() {
    if (activePath === null) return;

    setHistory((entries) => [...entries, { splits, activePath, candidate }]);
    const nextSplits = { ...splits, [activePath]: candidate };
    const nextPath = eligibleLeafPaths(nextSplits)[0] ?? null;
    setSplits(nextSplits);
    setActivePath(nextPath);
    if (nextPath !== null) {
      setCandidate(candidateForLeaf(nextPath, nextSplits));
    }
  }

  function undoRule() {
    const previous = history[history.length - 1];
    if (!previous) return;
    setSplits(previous.splits);
    setActivePath(previous.activePath);
    setCandidate(previous.candidate);
    setHistory((entries) => entries.slice(0, -1));
  }

  function reset() {
    setSplits({});
    setActivePath('');
    setCandidate(initialRule);
    setHistory([]);
  }

  return (
    <section className="s02-threshold" aria-labelledby={`${id}-heading`}>
      <header className="s02-threshold__intro">
        <p className="s02-threshold__eyebrow">Exploración antes de las fórmulas</p>
        <h3 id={`${id}-heading`}>Un árbol decide con reglas y umbrales</h3>
        <p>
          Cada nodo pregunta si una variable cumple la regla. La respuesta lleva a una de dos ramas;
          repite en una hoja para continuar el árbol.
        </p>
        <p className="s02-threshold__synthetic-note">
          Los 12 puntos A/B son inventados para esta demostración. x₁ y x₂ son coordenadas sin
          unidad y no representan planetas.
        </p>
      </header>

      <div className="s02-threshold__visuals">
        <figure className="s02-threshold__plot-panel">
          <figcaption>
            <strong>Mueve la regla sobre los datos</strong>
            <span>x₁: corte vertical; x₂: horizontal. Datos sintéticos.</span>
          </figcaption>
          <svg
            className="s02-threshold__plot-svg"
            viewBox="0 0 560 360"
            role="img"
            aria-labelledby={`${plotTitleId} ${plotDescriptionId}`}
          >
            <title id={plotTitleId}>Separación de doce puntos sintéticos</title>
            <desc id={plotDescriptionId}>
              Ejes x uno y x dos, con doce puntos: círculos para A y cuadrados para B. Las reglas
              aplicadas son líneas sólidas; la regla candidata es discontinua.
            </desc>
            <rect
              className="s02-threshold__plot-background"
              x={plot.left}
              y={plot.top}
              width={plot.right - plot.left}
              height={plot.bottom - plot.top}
            />

            {candidateBounds !== null &&
              splitRegions(candidateBounds, candidate).map((region) => (
                <rect
                  className={`s02-threshold__plot-region s02-threshold__plot-region--${region.side}`}
                  key={region.side}
                  x={xPosition(region.xMin)}
                  y={yPosition(region.yMax)}
                  width={Math.max(0, xPosition(region.xMax) - xPosition(region.xMin))}
                  height={Math.max(0, yPosition(region.yMin) - yPosition(region.yMax))}
                />
              ))}

            {[1, 2, 3, 4, 5].map((tick) => (
              <g className="s02-threshold__plot-tick" key={tick}>
                <line x1={xPosition(tick)} x2={xPosition(tick)} y1={plot.top} y2={plot.bottom} />
                <line x1={plot.left} x2={plot.right} y1={yPosition(tick)} y2={yPosition(tick)} />
                <text x={xPosition(tick)} y={plot.bottom + 20} textAnchor="middle">
                  {tick}
                </text>
                <text x={plot.left - 14} y={yPosition(tick) + 5} textAnchor="end">
                  {tick}
                </text>
              </g>
            ))}

            <line
              className="s02-threshold__plot-axis"
              x1={plot.left}
              x2={plot.right}
              y1={plot.bottom}
              y2={plot.bottom}
            />
            <line
              className="s02-threshold__plot-axis"
              x1={plot.left}
              x2={plot.left}
              y1={plot.top}
              y2={plot.bottom}
            />

            {Object.entries(splits).map(([path, rule]) =>
              ruleLine(rule, getBounds(path, splits), 's02-threshold__plot-rule', path || 'root'),
            )}
            {candidateBounds !== null &&
              ruleLine(
                candidate,
                candidateBounds,
                's02-threshold__plot-rule-candidate',
                'candidate',
              )}

            {points.map((point) => {
              const x = xPosition(point.x1);
              const y = yPosition(point.x2);

              return point.label === 'A' ? (
                <circle
                  className="s02-threshold__point s02-threshold__point--a"
                  key={point.id}
                  cx={x}
                  cy={y}
                  r="9"
                >
                  <title>{`${point.id}: x₁ ${point.x1}, x₂ ${point.x2}, etiqueta A`}</title>
                </circle>
              ) : (
                <rect
                  className="s02-threshold__point s02-threshold__point--b"
                  key={point.id}
                  x={x - 8}
                  y={y - 8}
                  width="16"
                  height="16"
                  rx="2"
                >
                  <title>{`${point.id}: x₁ ${point.x1}, x₂ ${point.x2}, etiqueta B`}</title>
                </rect>
              );
            })}

            <text
              className="s02-threshold__plot-label"
              x={(plot.left + plot.right) / 2}
              y="344"
              textAnchor="middle"
            >
              x₁
            </text>
            <text
              className="s02-threshold__plot-label"
              x="16"
              y={(plot.top + plot.bottom) / 2}
              textAnchor="middle"
              transform={`rotate(-90 16 ${(plot.top + plot.bottom) / 2})`}
            >
              x₂
            </text>
          </svg>
          <div
            className="s02-threshold__legend"
            role="group"
            aria-label="Leyenda de puntos y reglas"
          >
            <span>
              <i className="s02-threshold__legend-mark s02-threshold__legend-mark--a" /> A · círculo
            </span>
            <span>
              <i className="s02-threshold__legend-mark s02-threshold__legend-mark--b" /> B ·
              cuadrado
            </span>
            <span>
              <i className="s02-threshold__legend-line" /> regla candidata
            </span>
          </div>
        </figure>

        <figure className="s02-threshold__tree-panel">
          <figcaption>
            <strong>Una regla se convierte en ramas</strong>
            <span>Punteada: en prueba. Sólida: aplicada.</span>
          </figcaption>
          <S02Tree splits={splits} candidate={candidate} activePath={activePath} />
        </figure>
      </div>

      <div className="s02-threshold__controls">
        <fieldset
          className="s02-threshold__rule-controls"
          disabled={!hydrated || activePath === null}
          aria-label="Regla candidata para la hoja seleccionada"
        >
          <legend>{candidateStep}</legend>
          <div
            className="s02-threshold__feature-picker"
            role="group"
            aria-label="Variable de la regla"
          >
            <span>Variable de esta regla:</span>
            <label>
              <input
                type="radio"
                name={`${id}-feature`}
                value="x1"
                checked={candidate.feature === 'x1'}
                onChange={() => setCandidate({ ...candidate, feature: 'x1' })}
              />
              x₁ · horizontal
            </label>
            <label>
              <input
                type="radio"
                name={`${id}-feature`}
                value="x2"
                checked={candidate.feature === 'x2'}
                onChange={() => setCandidate({ ...candidate, feature: 'x2' })}
              />
              x₂ · vertical
            </label>
          </div>
          <label className="s02-threshold__slider-label" htmlFor={sliderId}>
            <span>Umbral de {featureName(candidate.feature)}</span>
            <output htmlFor={sliderId}>{formatThreshold(candidate.threshold)}</output>
          </label>
          <input
            id={sliderId}
            className="s02-threshold__slider"
            type="range"
            min="0.5"
            max="5.5"
            step="0.5"
            value={candidate.threshold}
            aria-describedby={previewId}
            onChange={(event) =>
              setCandidate({ ...candidate, threshold: Number(event.currentTarget.value) })
            }
          />
          <p id={previewId} className="s02-threshold__preview">
            Si {formatRule(candidate)}, quedan {countLabel(previewLeftStats)} en la rama «menor o
            igual» y {countLabel(previewRightStats)} en la rama «mayor».
          </p>
        </fieldset>

        <div className="s02-threshold__actions" role="group" aria-label="Acciones del árbol">
          {leafChoices.length > 1 && (
            <label className="s02-threshold__branch-select">
              <span>Dividir hoja</span>
              <select
                aria-label="Hoja donde aplicar la siguiente regla"
                disabled={!hydrated}
                value={activePath ?? ''}
                onChange={(event) => selectLeaf(event.currentTarget.value)}
              >
                {leafChoices.map((path) => {
                  const stats = countPoints(pointsInLeaf(path, splits));
                  return (
                    <option key={path || 'root'} value={path}>
                      {branchName(path)} · {stats.total} puntos
                    </option>
                  );
                })}
              </select>
            </label>
          )}
          <button
            className="s02-threshold__apply"
            type="button"
            disabled={!hydrated || activePath === null}
            onClick={applyRule}
          >
            Aplicar regla
          </button>
          <button type="button" disabled={!hydrated || history.length === 0} onClick={undoRule}>
            Deshacer última
          </button>
          <button type="button" disabled={!hydrated} onClick={reset}>
            Reiniciar
          </button>
        </div>
      </div>

      <p className="s02-threshold__status" role="status" aria-live="polite" aria-atomic="true">
        {statusText}
      </p>

      <p className="s02-threshold__observation">
        <strong>Qué observar:</strong> la primera regla deja grupos mezclados. Prueba otras
        posiciones y pregúntate qué umbral conviene. Más adelante conectaremos esa pregunta con
        entropía y Gini, criterios de pureza para clasificación. En regresión se usan criterios de
        error.
      </p>

      <p className="s02-threshold__limit">
        Las coordenadas no tienen significado físico. Esta figura muestra cómo se organizan reglas;
        la pureza de estas hojas pequeñas no demuestra que el árbol generalice ni identifica causas.
      </p>

      <noscript>
        <p className="s02-threshold__noscript">
          La figura inicial, los conteos y la tabla permanecen disponibles. Para mover umbrales y
          construir reglas necesitas JavaScript activado.
        </p>
      </noscript>
    </section>
  );
}

export default S02ThresholdExplorer;
