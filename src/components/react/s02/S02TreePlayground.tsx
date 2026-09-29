import { useState } from 'react';

type Label = 'A' | 'B';
type Feature = 'x1' | 'x2';
type Point = { id: string; x1: number; x2: number; label: Label };
type Split = { feature: Feature; threshold: number; reduction: number };
type TreeNode = {
  depth: number;
  samples: Point[];
  countA: number;
  countB: number;
  prediction: Label;
  split?: Split;
  left?: TreeNode;
  right?: TreeNode;
};
type PositionedNode = { node: TreeNode; path: string; x: number; y: number };
type Edge = { from: PositionedNode; to: PositionedNode; branch: string; path: string };

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

function gini(items: Point[]) {
  if (items.length === 0) return 0;
  const countA = items.filter((point) => point.label === 'A').length;
  const probabilityA = countA / items.length;
  const probabilityB = 1 - probabilityA;
  return 1 - probabilityA ** 2 - probabilityB ** 2;
}

function findBestSplit(items: Point[], minSamplesLeaf: number): Split | undefined {
  let best: Split | undefined;
  let lowestChildImpurity = gini(items);

  for (const feature of ['x1', 'x2'] as const) {
    const values = [...new Set(items.map((point) => point[feature]))].sort((a, b) => a - b);
    const thresholds = values.slice(0, -1).map((value, index) => (value + values[index + 1]!) / 2);

    for (const threshold of thresholds) {
      const left = items.filter((point) => point[feature] <= threshold);
      const right = items.filter((point) => point[feature] > threshold);
      if (left.length < minSamplesLeaf || right.length < minSamplesLeaf) continue;

      const childImpurity =
        (left.length / items.length) * gini(left) + (right.length / items.length) * gini(right);
      if (childImpurity < lowestChildImpurity - 1e-9) {
        lowestChildImpurity = childImpurity;
        best = { feature, threshold, reduction: gini(items) - childImpurity };
      }
    }
  }

  return best;
}

function buildTree(items: Point[], maxDepth: number, minSamplesLeaf: number, depth = 0): TreeNode {
  const countA = items.filter((point) => point.label === 'A').length;
  const countB = items.length - countA;
  const node: TreeNode = {
    depth,
    samples: items,
    countA,
    countB,
    prediction: countA >= countB ? 'A' : 'B',
  };

  if (depth >= maxDepth) return node;
  const split = findBestSplit(items, minSamplesLeaf);
  if (!split) return node;

  const left = items.filter((point) => point[split.feature] <= split.threshold);
  const right = items.filter((point) => point[split.feature] > split.threshold);
  return {
    ...node,
    split,
    left: buildTree(left, maxDepth, minSamplesLeaf, depth + 1),
    right: buildTree(right, maxDepth, minSamplesLeaf, depth + 1),
  };
}

function predict(node: TreeNode, point: Pick<Point, Feature>): Label {
  if (!node.split || !node.left || !node.right) return node.prediction;
  return point[node.split.feature] <= node.split.threshold
    ? predict(node.left, point)
    : predict(node.right, point);
}

function getRoute(root: TreeNode, point: Point) {
  let node = root;
  let path = 'root';
  const pathKeys = [path];
  const decisions: string[] = [];

  while (node.split && node.left && node.right) {
    const { feature, threshold } = node.split;
    const wentLeft = point[feature] <= threshold;
    decisions.push(`${featureLabel(feature)} ${wentLeft ? '≤' : '>'} ${threshold.toFixed(1)}`);
    node = wentLeft ? node.left : node.right;
    path += wentLeft ? 'L' : 'R';
    pathKeys.push(path);
  }

  return { node, pathKeys, decisions };
}

function featureLabel(feature: Feature) {
  return feature === 'x1' ? 'x₁' : 'x₂';
}

function leafCount(node: TreeNode): number {
  if (!node.left || !node.right) return 1;
  return leafCount(node.left) + leafCount(node.right);
}

function nodeCount(node: TreeNode): number {
  if (!node.left || !node.right) return 1;
  return 1 + nodeCount(node.left) + nodeCount(node.right);
}

function layoutTree(root: TreeNode) {
  const nodes: PositionedNode[] = [];
  const edges: Edge[] = [];

  function visit(node: TreeNode, left: number, right: number, path: string) {
    const position = { node, path, x: (left + right) / 2, y: 18 + node.depth * 60 };
    nodes.push(position);
    if (!node.left || !node.right) return;

    const middle = (left + right) / 2;
    const leftPosition = {
      node: node.left,
      path: `${path}L`,
      x: (left + middle) / 2,
      y: 18 + node.left.depth * 60,
    };
    const rightPosition = {
      node: node.right,
      path: `${path}R`,
      x: (middle + right) / 2,
      y: 18 + node.right.depth * 60,
    };
    edges.push({ from: position, to: leftPosition, branch: '≤', path: leftPosition.path });
    edges.push({ from: position, to: rightPosition, branch: '>', path: rightPosition.path });
    visit(node.left, left, middle, `${path}L`);
    visit(node.right, middle, right, `${path}R`);
  }

  visit(root, 8, 472, 'root');
  return { nodes, edges };
}

function mapX(value: number) {
  return 42 + ((value - 0.5) / 5) * 300;
}

function mapY(value: number) {
  return 205 - ((value - 0.5) / 5) * 170;
}

type S02TreePlaygroundProps = {
  maxDepth: number;
  minSamplesLeaf: number;
  onMaxDepthChange: (value: number) => void;
  onMinSamplesLeafChange: (value: number) => void;
  onReset: () => void;
};

export default function S02TreePlayground({
  maxDepth,
  minSamplesLeaf,
  onMaxDepthChange,
  onMinSamplesLeafChange,
  onReset,
}: S02TreePlaygroundProps) {
  const [selectedId, setSelectedId] = useState('P05');
  const tree = buildTree(points, maxDepth, minSamplesLeaf);
  const selectedPoint = points.find((point) => point.id === selectedId) ?? points[4]!;
  const route = getRoute(tree, selectedPoint);
  const layout = layoutTree(tree);
  const treeDepth = Math.max(...layout.nodes.map(({ node }) => node.depth));
  const treeViewBox = treeDepth >= 2 ? '0 0 480 170' : '60 0 360 110';
  const correct = points.filter((point) => predict(tree, point) === point.label).length;
  const gridSize = 20;
  const gridStep = 5 / gridSize;
  const grid = Array.from({ length: gridSize * gridSize }, (_, index) => {
    const column = index % gridSize;
    const row = Math.floor(index / gridSize);
    const sample = { x1: 0.5 + (column + 0.5) * gridStep, x2: 0.5 + (row + 0.5) * gridStep };
    return { ...sample, label: predict(tree, sample), column, row };
  });

  function reset() {
    onReset();
    setSelectedId('P05');
  }

  return (
    <section
      className="s02-tree-playground"
      aria-label="Explorador didáctico de hiperparámetros de un árbol"
    >
      <aside className="s02-tree-playground__controls" aria-label="Controles del árbol">
        <fieldset className="s02-tree-playground__control">
          <legend>
            <span>Ajustes</span>
            <button className="s02-tree-playground__reset" onClick={reset} type="button">
              Reiniciar
            </button>
          </legend>
          <div className="s02-tree-playground__parameter">
            <div className="s02-tree-playground__parameter-heading">
              <h3 id="s02-tree-max-depth-title">
                Profundidad máxima <code>max_depth</code>
              </h3>
              <output>
                {maxDepth} {maxDepth === 1 ? 'nivel' : 'niveles'}
              </output>
            </div>
            <div
              className="s02-tree-playground__choices"
              role="group"
              aria-labelledby="s02-tree-max-depth-title"
            >
              {[1, 2].map((value) => (
                <button
                  aria-label={'Fijar max_depth en ' + value}
                  aria-pressed={maxDepth === value}
                  className="s02-tree-playground__choice"
                  key={value}
                  onClick={() => onMaxDepthChange(value)}
                  type="button"
                >
                  <strong>{value}</strong>
                  <small>{value === 1 ? 'pregunta' : 'preguntas'}</small>
                </button>
              ))}
            </div>
            <p>Cuántas preguntas puede encadenar el árbol.</p>
          </div>

          <div className="s02-tree-playground__parameter">
            <div className="s02-tree-playground__parameter-heading">
              <h3 id="s02-tree-min-leaf-title">
                Mínimo por hoja <code>min_samples_leaf</code>
              </h3>
              <output>
                {minSamplesLeaf} {minSamplesLeaf === 1 ? 'caso' : 'casos'}
              </output>
            </div>
            <div
              className="s02-tree-playground__choices s02-tree-playground__choices--three"
              role="group"
              aria-labelledby="s02-tree-min-leaf-title"
            >
              {[1, 2, 3].map((value) => (
                <button
                  aria-label={
                    'Fijar mínimo de ' +
                    value +
                    (value === 1 ? ' caso por hoja' : ' casos por hoja')
                  }
                  aria-pressed={minSamplesLeaf === value}
                  className="s02-tree-playground__choice"
                  key={value}
                  onClick={() => onMinSamplesLeafChange(value)}
                  type="button"
                >
                  <strong>{value}</strong>
                  <small>{value === 1 ? 'caso' : 'casos'}</small>
                </button>
              ))}
            </div>
            <p>Descarta cortes que dejarían menos ejemplos en una hoja.</p>
          </div>
        </fieldset>
      </aside>

      <div className="s02-tree-playground__model">
        <aside className="s02-tree-playground__prediction">
          <label htmlFor="s02-tree-selected-point">Ejemplo</label>
          <select
            id="s02-tree-selected-point"
            onChange={(event) => setSelectedId(event.currentTarget.value)}
            value={selectedId}
          >
            {points.map((point) => (
              <option key={point.id} value={point.id}>
                {point.id} · ({point.x1}, {point.x2}) · {point.label}
              </option>
            ))}
          </select>
          <p className="s02-tree-playground__route">
            {route.decisions.length ? route.decisions.join(' → ') : 'Sin preguntas'} → hoja{' '}
            {route.node.prediction}
          </p>
          <strong
            className={
              predict(tree, selectedPoint) === selectedPoint.label ? 'is-correct' : 'is-error'
            }
          >
            Predice {predict(tree, selectedPoint)} · etiqueta {selectedPoint.label}
          </strong>
        </aside>

        <figure className="s02-tree-playground__map">
          <figcaption>Mapa · {correct}/12 aciertos</figcaption>
          <svg
            aria-label={`Mapa sintético con doce puntos. El árbol predice ${correct} correctamente en estos mismos datos de entrenamiento. El punto seleccionado ${selectedPoint.id} tiene etiqueta ${selectedPoint.label} y predicción ${predict(tree, selectedPoint)}.`}
            role="img"
            viewBox="0 0 370 230"
          >
            {grid.map((cell) => (
              <rect
                className={`s02-tree-playground__region s02-tree-playground__region--${cell.label.toLowerCase()}`}
                height={170 / gridSize + 0.5}
                key={`${cell.column}-${cell.row}`}
                width={300 / gridSize + 0.5}
                x={mapX(0.5 + cell.column * gridStep)}
                y={mapY(0.5 + (cell.row + 1) * gridStep)}
              />
            ))}
            <rect
              className="s02-tree-playground__plot-border"
              height="170"
              width="300"
              x="42"
              y="35"
            />
            <line className="s02-tree-playground__axis" x1="42" x2="342" y1="205" y2="205" />
            <line className="s02-tree-playground__axis" x1="42" x2="42" y1="35" y2="205" />
            {[1, 3, 5].map((tick) => (
              <g key={tick}>
                <text
                  className="s02-tree-playground__tick"
                  x={mapX(tick)}
                  y="222"
                  textAnchor="middle"
                >
                  {tick}
                </text>
                <text
                  className="s02-tree-playground__tick"
                  x="29"
                  y={mapY(tick) + 4}
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            ))}
            <text className="s02-tree-playground__axis-label" x="342" y="223" textAnchor="end">
              x₁
            </text>
            <text className="s02-tree-playground__axis-label" x="42" y="27">
              x₂
            </text>
            {points.map((point) => {
              const predicted = predict(tree, point);
              const selected = point.id === selectedPoint.id;
              const pointClass = [
                's02-tree-playground__point',
                `s02-tree-playground__point--${point.label.toLowerCase()}`,
                predicted === point.label ? 'is-correct' : 'is-error',
                selected ? 'is-selected' : '',
              ]
                .filter(Boolean)
                .join(' ');
              return point.label === 'A' ? (
                <circle
                  className={pointClass}
                  cx={mapX(point.x1)}
                  cy={mapY(point.x2)}
                  key={point.id}
                  r={selected ? 7 : 5}
                />
              ) : (
                <rect
                  className={pointClass}
                  height={selected ? 14 : 10}
                  key={point.id}
                  width={selected ? 14 : 10}
                  x={mapX(point.x1) - (selected ? 7 : 5)}
                  y={mapY(point.x2) - (selected ? 7 : 5)}
                />
              );
            })}
          </svg>
          <div className="s02-tree-playground__legend" aria-label="Leyenda del mapa">
            <span>
              <i className="s02-tree-playground__symbol--a" />
              Clase A
            </span>
            <span>
              <i className="s02-tree-playground__symbol--b" />
              Clase B
            </span>
            <span>
              <i className="s02-tree-playground__outline" />
              Error
            </span>
          </div>
        </figure>

        <figure className="s02-tree-playground__tree">
          <figcaption>
            Árbol: {nodeCount(tree)} nodos · {leafCount(tree)} hojas
          </figcaption>
          <svg
            aria-label={`Árbol con ${nodeCount(tree)} nodos y ${leafCount(tree)} hojas.`}
            role="img"
            viewBox={treeViewBox}
          >
            {layout.edges.map((edge) => (
              <g
                className={route.pathKeys.includes(edge.path) ? 'is-on-route' : ''}
                key={edge.path}
              >
                <line
                  className="s02-tree-playground__edge"
                  x1={edge.from.x}
                  x2={edge.to.x}
                  y1={edge.from.y + 20}
                  y2={edge.to.y - 20}
                />
                <text
                  className="s02-tree-playground__branch"
                  x={(edge.from.x + edge.to.x) / 2}
                  y={(edge.from.y + edge.to.y) / 2 - 2}
                  textAnchor="middle"
                >
                  {edge.branch}
                </text>
              </g>
            ))}
            {layout.nodes.map(({ node, path, x, y }) => {
              const isLeaf = !node.left || !node.right;
              const label = isLeaf
                ? `Hoja: ${node.prediction}`
                : `${featureLabel(node.split!.feature)} ≤ ${node.split!.threshold.toFixed(1)}`;
              const detail = isLeaf
                ? `${node.countA} A · ${node.countB} B`
                : `n = ${node.samples.length}`;
              return (
                <g className={route.pathKeys.includes(path) ? 'is-on-route' : ''} key={path}>
                  <rect
                    className={`s02-tree-playground__node ${isLeaf ? `s02-tree-playground__node--${node.prediction.toLowerCase()}` : 's02-tree-playground__node--rule'}`}
                    height="42"
                    rx="6"
                    width="112"
                    x={x - 56}
                    y={y - 20}
                  />
                  <text
                    className="s02-tree-playground__node-label"
                    x={x}
                    y={y - 3}
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                  <text
                    className="s02-tree-playground__node-detail"
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                  >
                    {detail}
                  </text>
                </g>
              );
            })}
          </svg>
        </figure>
      </div>

      <p className="s02-tree-playground__limit">
        Doce casos sintéticos; los aciertos describen el entrenamiento y no estiman generalización.
      </p>
      <p className="s02-tree-playground__status" role="status" aria-live="polite">
        max_depth {maxDepth}; min_samples_leaf {minSamplesLeaf}; {nodeCount(tree)} nodos y{' '}
        {leafCount(tree)} hojas. {selectedPoint.id}: ruta{' '}
        {route.decisions.join(', ') || 'sin preguntas'}, predicción {predict(tree, selectedPoint)}{' '}
        frente a etiqueta {selectedPoint.label}.
      </p>
    </section>
  );
}
