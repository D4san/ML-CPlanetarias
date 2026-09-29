type TreeTone =
  'stable' | 'overfit' | 'sample-a' | 'sample-b' | 'forest-a' | 'forest-b' | 'forest-c';

type TreePoint = {
  id: string;
  x: number;
  y: number;
  level: number;
};

type TreeEdge = {
  id: string;
  from: TreePoint;
  to: TreePoint;
};

function makeTree(center: number, spread: number, depth: number, prefix: string) {
  const levels = Array.from({ length: depth + 1 }, (_, level) =>
    Array.from({ length: 2 ** level }, (_, index) => ({
      id: `${prefix}-${level}-${index}`,
      x: center + (((index + 0.5) / 2 ** level) * 2 - 1) * (spread / 2),
      y: 8 + (78 / depth) * level,
      level,
    })),
  );
  const points = levels.flat();
  const edges = levels.slice(1).flatMap((children, level) =>
    children.map((child, index) => ({
      id: `${prefix}-edge-${level}-${index}`,
      from: levels[level]![Math.floor(index / 2)]!,
      to: child,
    })),
  );

  return { edges, points };
}

function TreeShape({
  center,
  spread,
  depth,
  tone,
  prefix,
}: {
  center: number;
  spread: number;
  depth: number;
  tone: TreeTone;
  prefix: string;
}) {
  const tree = makeTree(center, spread, depth, prefix);

  return (
    <g className="s02-generalization__tree" data-tone={tone}>
      {tree.edges.map((edge: TreeEdge) => (
        <line key={edge.id} x1={edge.from.x} x2={edge.to.x} y1={edge.from.y} y2={edge.to.y} />
      ))}
      {tree.points.map((point: TreePoint) => (
        <circle key={point.id} cx={point.x} cy={point.y} r={point.level === 0 ? 5.5 : 4.2} />
      ))}
    </g>
  );
}

function CaseIllustration({ variant }: { variant: 'fixed' | 'deep' | 'samples' }) {
  return (
    <figure className="s02-generalization__case-figure">
      <svg aria-hidden="true" className="s02-generalization__tree-svg" viewBox="0 0 320 96">
        {variant === 'samples' ? (
          <>
            <TreeShape center={80} depth={2} prefix="sample-a" spread={92} tone="sample-a" />
            <TreeShape center={240} depth={2} prefix="sample-b" spread={138} tone="sample-b" />
          </>
        ) : (
          <TreeShape
            center={160}
            depth={variant === 'deep' ? 3 : 2}
            prefix={variant}
            spread={variant === 'deep' ? 224 : 140}
            tone={variant === 'deep' ? 'overfit' : 'stable'}
          />
        )}
      </svg>
      {variant === 'samples' ? (
        <figcaption className="s02-generalization__sample-labels">
          <span>Muestra A</span>
          <span>Muestra B</span>
        </figcaption>
      ) : (
        <figcaption>
          {variant === 'deep' ? 'más niveles y más reglas' : 'mismas reglas para cada entrada'}
        </figcaption>
      )}
    </figure>
  );
}

function EnsembleDiagram() {
  return (
    <figure className="s02-generalization__ensemble-figure">
      <svg
        aria-label="Un árbol de decisión da paso a varios árboles de colores; sus predicciones se combinan en una salida conjunta."
        className="s02-generalization__ensemble-svg"
        role="img"
        viewBox="0 0 560 104"
      >
        <defs>
          <marker
            id="s02-ensemble-arrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="6"
            refY="4"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" />
          </marker>
        </defs>
        <TreeShape center={58} depth={2} prefix="single-tree" spread={72} tone="stable" />
        <path
          className="s02-generalization__arrow"
          d="M 100 48 H 166"
          markerEnd="url(#s02-ensemble-arrow)"
        />
        <TreeShape center={216} depth={2} prefix="forest-a" spread={50} tone="forest-a" />
        <TreeShape center={292} depth={2} prefix="forest-b" spread={50} tone="forest-b" />
        <TreeShape center={368} depth={2} prefix="forest-c" spread={50} tone="forest-c" />
        <path
          className="s02-generalization__arrow"
          d="M 405 48 H 454"
          markerEnd="url(#s02-ensemble-arrow)"
        />
        <circle className="s02-generalization__combined-output" cx="500" cy="48" r="24" />
        <circle className="s02-generalization__output-mark" cx="500" cy="48" r="5" />
      </svg>
      <figcaption>
        <span>1 árbol</span>
        <span>árboles distintos</span>
        <span>una salida conjunta</span>
      </figcaption>
    </figure>
  );
}

const cases = [
  {
    number: '01',
    label: 'Árbol ya entrenado',
    title: 'Reglas fijas',
    body: 'La misma entrada sigue la misma ruta y obtiene la misma predicción.',
    illustration: 'fixed',
  },
  {
    number: '02',
    label: 'Peligro · sobreajuste',
    title: 'Memorizar la muestra',
    body: 'Un árbol muy profundo puede aprender detalles del entrenamiento y fallar en casos nuevos.',
    illustration: 'deep',
  },
  {
    number: '03',
    label: 'Peligro · alta varianza',
    title: 'Cambiar entre muestras',
    body: 'Al reentrenarlo con otros datos, pueden cambiar los cortes y las predicciones.',
    illustration: 'samples',
  },
] as const;

export default function S02Generalization() {
  return (
    <div className="s02-generalization">
      <section
        aria-label="Tres comportamientos de los árboles de decisión"
        className="s02-generalization__cases"
      >
        {cases.map((item) => (
          <article
            className="s02-generalization__case"
            data-illustration={item.illustration}
            key={item.number}
          >
            <p className="s02-generalization__case-label">
              {item.number} · {item.label}
            </p>
            <h3>{item.title}</h3>
            <CaseIllustration variant={item.illustration} />
            <p className="s02-generalization__case-body">{item.body}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="s02-ensemble-definition" className="s02-generalization__ensemble">
        <div className="s02-generalization__ensemble-copy">
          <p className="s02-generalization__ensemble-label">De la variabilidad a la combinación</p>
          <h3 id="s02-ensemble-definition">
            Un ensamble combina las predicciones de varios modelos en una sola respuesta.
          </h3>
          <p>
            Random Forest ajusta muchos árboles con remuestras bootstrap; en cada corte considera un
            subconjunto aleatorio de variables. Luego promedia en regresión o usa el voto
            mayoritario en clasificación.
          </p>
        </div>
        <EnsembleDiagram />
      </section>
    </div>
  );
}
