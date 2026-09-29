import { useState } from 'react';

import { withBase } from '../../../lib/urls';
import S02Math from './S02Math';

const EARTH_DENSITY = 5.51;

const planetCases = [
  {
    id: 'rocky',
    name: 'Rocoso compacto',
    mass: 1,
    radius: 1,
    imagePosition: '0%',
  },
  {
    id: 'sub-neptune',
    name: 'Sub-Neptuno',
    mass: 8,
    radius: 3,
    imagePosition: '33.333%',
  },
  {
    id: 'gas-giant',
    name: 'Gigante gaseoso',
    mass: 220,
    radius: 11,
    imagePosition: '66.667%',
  },
  {
    id: 'puffy-giant',
    name: 'Gigante puffy',
    mass: 100,
    radius: 14,
    imagePosition: '100%',
  },
] as const;

type PlanetId = (typeof planetCases)[number]['id'];
type PlanetCase = (typeof planetCases)[number];

function density(planet: PlanetCase) {
  return (EARTH_DENSITY * planet.mass) / planet.radius ** 3;
}

function format(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function classify(planet: PlanetCase) {
  if (planet.radius < 2) {
    return {
      category: 'Rocoso',
      activeNodes: ['radius-small'],
      activeBranches: ['root-yes'],
      route: `${format(planet.radius)} R⊕ < 2 R⊕ → sí → hoja Rocoso.`,
    };
  }

  if (planet.radius < 4) {
    return {
      category: 'Sub-Neptuno',
      activeNodes: ['radius-small', 'radius-medium'],
      activeBranches: ['root-no', 'medium-yes'],
      route: `${format(planet.radius)} R⊕ ≥ 2 R⊕ → no; ${format(planet.radius)} R⊕ < 4 R⊕ → sí → hoja Sub-Neptuno.`,
    };
  }

  if (density(planet) < 0.45) {
    return {
      category: 'Gigante puffy',
      activeNodes: ['radius-small', 'radius-medium', 'density-low'],
      activeBranches: ['root-no', 'medium-no', 'density-yes'],
      route: `${format(planet.radius)} R⊕ ≥ 2 R⊕ → no; ${format(planet.radius)} R⊕ ≥ 4 R⊕ → no; ${density(planet).toFixed(2)} g/cm³ < 0.45 g/cm³ → sí → hoja Puffy.`,
    };
  }

  return {
    category: 'Gigante gaseoso',
    activeNodes: ['radius-small', 'radius-medium', 'density-low'],
    activeBranches: ['root-no', 'medium-no', 'density-no'],
    route: `${format(planet.radius)} R⊕ ≥ 2 R⊕ → no; ${format(planet.radius)} R⊕ ≥ 4 R⊕ → no; ${density(planet).toFixed(2)} g/cm³ ≥ 0.45 g/cm³ → no → hoja Gigante gaseoso.`,
  };
}

export default function S02PlanetClassification() {
  const [stage, setStage] = useState<'examples' | 'tree'>('examples');
  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId>('puffy-giant');
  const selectedPlanet = planetCases.find((planet) => planet.id === selectedPlanetId)!;
  const route = classify(selectedPlanet);
  const artUrl = withBase('/images/s02/planet-categories-v2.png');

  function choosePlanet(id: PlanetId) {
    setSelectedPlanetId(id);
  }

  return (
    <section className="s02-planet-classifier" aria-label="Clasificar planetas con un árbol">
      {stage === 'examples' ? (
        <div className="s02-planet-classifier__examples">
          <div className="s02-planet-classifier__example-heading">
            <p>Cuatro casos didácticos: cada planeta tiene masa, radio y densidad.</p>
            <span className="s02-planet-classifier__density-formula">
              <S02Math
                label="La densidad relativa es cinco coma cincuenta y uno por la masa dividida por el radio al cubo"
                tex="\rho = 5.51 \times \frac{M}{R^3}"
              />
            </span>
          </div>

          <div className="s02-planet-classifier__gallery" aria-hidden="true">
            {planetCases.map((planet) => (
              <div
                className="s02-planet-classifier__art"
                key={planet.id}
                style={{
                  backgroundImage: `url("${artUrl}")`,
                  backgroundPosition: `${planet.imagePosition} center`,
                }}
              />
            ))}
            <span className="s02-planet-classifier__watermark">
              <svg viewBox="0 0 48 48" focusable="false" aria-hidden="true">
                <circle cx="24" cy="24" r="4.2" fill="currentColor" />
                <ellipse
                  cx="24"
                  cy="24"
                  rx="19"
                  ry="8.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  transform="rotate(-28 24 24)"
                />
                <circle cx="39.4" cy="17.2" r="2.7" fill="var(--decision)" />
                <path
                  d="M8 34.5c7.5 4 22.2 4.8 32-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="2.5 3.5"
                />
              </svg>
              <span>MLCP</span>
            </span>
          </div>

          <div className="s02-planet-classifier__case-grid">
            {planetCases.map((planet) => (
              <article className="s02-planet-classifier__case" key={planet.id}>
                <h3>{planet.name}</h3>
                <dl>
                  <div>
                    <dt>Masa</dt>
                    <dd>{format(planet.mass)} M⊕</dd>
                  </div>
                  <div>
                    <dt>Radio</dt>
                    <dd>{format(planet.radius)} R⊕</dd>
                  </div>
                  <div>
                    <dt>Densidad</dt>
                    <dd>{density(planet).toFixed(2)} g/cm³</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="s02-planet-classifier__stage-footer">
            <p>«Puffy» nombra aquí un gigante de baja densidad.</p>
            <button onClick={() => setStage('tree')} type="button">
              Clasificar
            </button>
          </div>
          <p className="s02-planet-classifier__caption">
            Ilustración conceptual generada con IA; sin escala física.
          </p>
        </div>
      ) : (
        <div className="s02-planet-classifier__tree-stage">
          <div className="s02-planet-classifier__tree-controls">
            <p>Elige un caso y sigue sus decisiones por el árbol:</p>
            <div
              className="s02-planet-classifier__case-buttons"
              aria-label="Planeta para clasificar"
            >
              {planetCases.map((planet) => (
                <button
                  aria-pressed={selectedPlanetId === planet.id}
                  key={planet.id}
                  onClick={() => choosePlanet(planet.id)}
                  type="button"
                >
                  {planet.name}
                </button>
              ))}
            </div>
          </div>

          <div className="s02-planet-classifier__tree-scroll">
            <svg
              className="s02-planet-classifier__tree"
              viewBox="0 0 2400 240"
              role="img"
              aria-labelledby="s02-tree-title s02-tree-description"
            >
              <title id="s02-tree-title">Árbol didáctico de clasificación planetaria</title>
              <desc id="s02-tree-description">
                De izquierda a derecha: separa primero por radio menor que dos radios terrestres,
                después por radio menor que cuatro; en los gigantes compara la densidad con 0.45
                gramos por centímetro cúbico para identificar el caso puffy.
              </desc>

              <path
                className={branchClass(route, 'root-yes')}
                d="M 320 114 C 420 114, 450 55, 570 55"
              />
              <path
                className={branchClass(route, 'root-no')}
                d="M 320 114 C 430 114, 450 192, 570 192"
              />
              <path
                className={branchClass(route, 'medium-yes')}
                d="M 860 192 C 970 192, 1010 55, 1140 55"
              />
              <path
                className={branchClass(route, 'medium-no')}
                d="M 860 192 C 970 192, 1010 192, 1140 192"
              />
              <path
                className={branchClass(route, 'density-yes')}
                d="M 1500 192 C 1650 192, 1790 55, 1980 55"
              />
              <path
                className={branchClass(route, 'density-no')}
                d="M 1500 192 C 1650 192, 1790 187, 1980 187"
              />

              <text className="s02-planet-classifier__branch-label" x="405" y="91">
                Sí
              </text>
              <text className="s02-planet-classifier__branch-label" x="435" y="148">
                No
              </text>
              <text className="s02-planet-classifier__branch-label" x="970" y="127">
                Sí
              </text>
              <text className="s02-planet-classifier__branch-label" x="970" y="220">
                No
              </text>
              <text className="s02-planet-classifier__branch-label" x="1680" y="113">
                Sí
              </text>
              <text className="s02-planet-classifier__branch-label" x="1685" y="220">
                No
              </text>

              <TreeNode x={60} y={82} width={260} id="radius-small" route={route}>
                ¿R &lt; 2 R⊕?
              </TreeNode>
              <TreeLeaf x={570} y={28} width={270} active={route?.category === 'Rocoso'}>
                Rocoso
              </TreeLeaf>
              <TreeNode x={570} y={160} width={290} id="radius-medium" route={route}>
                ¿R &lt; 4 R⊕?
              </TreeNode>
              <TreeLeaf x={1140} y={28} width={285} active={route?.category === 'Sub-Neptuno'}>
                Sub-Neptuno
              </TreeLeaf>
              <TreeNode x={1140} y={160} width={360} id="density-low" route={route}>
                ¿ρ &lt; 0.45 g/cm³?
              </TreeNode>
              <TreeLeaf x={1980} y={28} width={300} active={route?.category === 'Gigante puffy'}>
                Gigante puffy
              </TreeLeaf>
              <TreeLeaf x={1980} y={160} width={340} active={route?.category === 'Gigante gaseoso'}>
                Gigante gaseoso
              </TreeLeaf>
            </svg>
          </div>

          <p className="s02-planet-classifier__route" aria-live="polite">
            <strong>{route.category}.</strong> {route.route}
          </p>
          <div className="s02-planet-classifier__tree-footer">
            <button onClick={() => setStage('examples')} type="button">
              ← Volver a los ejemplos
            </button>
            <small>
              Estos umbrales separan los cuatro casos didácticos; no definen clases universales.
            </small>
          </div>
        </div>
      )}
    </section>
  );
}

function branchClass(route: ReturnType<typeof classify>, branch: string) {
  return `s02-planet-classifier__branch${route.activeBranches.includes(branch) ? ' is-active' : ''}`;
}

function TreeNode({
  children,
  id,
  route,
  width,
  x,
  y,
}: {
  children: string;
  id: string;
  route: ReturnType<typeof classify>;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <g
      className={`s02-planet-classifier__node${route.activeNodes.includes(id) ? ' is-active' : ''}`}
    >
      <rect x={x} y={y} width={width} height="64" rx="12" />
      <text x={x + width / 2} y={y + 41} textAnchor="middle">
        {children}
      </text>
    </g>
  );
}

function TreeLeaf({
  active = false,
  children,
  width,
  x,
  y,
}: {
  active?: boolean;
  children: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <g className={`s02-planet-classifier__leaf${active ? ' is-active' : ''}`}>
      <rect x={x} y={y} width={width} height="54" rx="12" />
      <text x={x + width / 2} y={y + 35} textAnchor="middle">
        {children}
      </text>
    </g>
  );
}
