import { Fragment, useEffect, useId, useRef, useState, type ReactElement } from 'react';

import sample from '../../../data/s03/kepler10-q1-transit-window.json';
import S03PaperFigure from './S03PaperFigure';
import { withBase } from '../../../lib/urls';
import './s03-science.css';

type SceneProps = { sceneId: string };
type MissionEra = 'primary' | 'k2';
type VocabularyTerm = 'TCE' | 'PC' | 'AFP' | 'NTP' | 'FP';

const preparationFields = [
  { symbol: 't', label: 'Tiempo', description: 'cuándo se hizo la medición' },
  { symbol: 'F(t)', label: 'Flujo', description: 'brillo de la estrella registrado' },
  { symbol: 'σ', label: 'Incertidumbre', description: 'margen estimado del flujo' },
  {
    symbol: 'q',
    label: 'Calidad',
    description: 'bandera SAP_QUALITY de la cadencia, no una medida de brillo',
  },
];

const classificationSignals = [
  {
    name: 'Señal A',
    className: 'Tránsito',
    description: 'Tres descensos similares que se repiten entre las mediciones.',
    points: Array.from({ length: 60 }, (_, index) => {
      const phase = index % 20;
      const depth = phase >= 8 && phase <= 12 ? (5 - Math.abs(phase - 10)) * 5 : 0;
      const scatter = ((index * 7) % 5) - 2;
      return { x: 12 + index * 10, y: 26 + depth + scatter };
    }),
  },
  {
    name: 'Señal B',
    className: 'No tránsito',
    description: 'Fluctuaciones sin descensos similares que se repitan.',
    points: Array.from({ length: 60 }, (_, index) => ({
      x: 12 + index * 10,
      y: 27 + (((index * 23 + Math.floor(index / 4) * 17) % 13) - 6),
    })),
  },
];

const missionDetails: Record<MissionEra, { title: string; dates: string; copy: string }> = {
  primary: {
    title: 'Misión primaria',
    dates: '2009–2013 · Q0–Q17',
    copy: 'Campo fijo observado durante cuatro años. El conjunto del artículo parte de tránsitos de Q1–Q17, DR24, y excluye la clase UNK.',
  },
  k2: {
    title: 'Extensión K2',
    dates: '2014–2018 · campañas',
    copy: 'Tras perder dos ruedas de reacción, el telescopio continuó con campañas y una estrategia de apuntado distinta. Sus cifras y campos se informan por separado.',
  },
};

function MissionHistory() {
  const [era, setEra] = useState<MissionEra>('primary');
  const imageDialogRef = useRef<HTMLDialogElement>(null);
  const imageTriggerRef = useRef<HTMLAnchorElement>(null);
  const dialogTitleId = `s03-kepler-image-dialog-${useId().replaceAll(':', '')}`;
  const selected = missionDetails[era];
  const imageSrc = withBase('/images/s03/kepler-k2-artist-concept-nasa.jpg');

  const closeImageDialog = () => {
    const dialog = imageDialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      imageTriggerRef.current?.focus();
    }
  };

  return (
    <section className="s03-science__mission" aria-label="Etapas de la misión Kepler">
      <div className="s03-science__mission-overview">
        <div className="s03-science__toggle" role="group" aria-label="Seleccionar etapa de Kepler">
          {(['primary', 'k2'] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={era === item}
              onClick={() => setEra(item)}
            >
              {missionDetails[item].title}
            </button>
          ))}
        </div>
        <div className="s03-science__mission-card" aria-live="polite">
          <p className="s03-science__eyebrow">{selected.dates}</p>
          <h3>{selected.title}</h3>
          <p>{selected.copy}</p>
        </div>
      </div>
      <figure className="s03-science__mission-image">
        <a
          ref={imageTriggerRef}
          className="s03-science__mission-image-trigger"
          href={imageSrc}
          target="_blank"
          rel="noreferrer"
          aria-label="Ampliar el concepto artístico de Kepler durante K2"
          onClick={(event) => {
            const dialog = imageDialogRef.current;
            if (!dialog) return;
            event.preventDefault();
            if (typeof dialog.showModal === 'function') dialog.showModal();
            else dialog.setAttribute('open', '');
          }}
        >
          <img
            src={imageSrc}
            alt="Concepto artístico de la nave Kepler en el espacio durante su misión K2."
            loading="lazy"
            decoding="async"
          />
          <span aria-hidden="true">Ampliar imagen</span>
        </a>
        <figcaption>
          Concepto artístico de Kepler durante K2. NASA/JPL · PIA18904.{' '}
          <a
            href="https://science.nasa.gov/image-detail/amf-pia18904/"
            target="_blank"
            rel="noreferrer"
          >
            Ficha NASA ↗
          </a>
        </figcaption>
      </figure>
      <dialog
        ref={imageDialogRef}
        className="s03-science__mission-image-dialog"
        aria-labelledby={dialogTitleId}
        aria-modal="true"
        onClose={() => imageTriggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeImageDialog();
        }}
      >
        <div className="s03-science__mission-image-dialog-content">
          <header className="s03-science__mission-image-dialog-header">
            <h3 id={dialogTitleId}>Kepler durante la misión K2</h3>
            <button
              type="button"
              className="s03-science__mission-image-dialog-close"
              aria-label="Cerrar imagen ampliada"
              onClick={closeImageDialog}
            >
              Cerrar
            </button>
          </header>
          <div className="s03-science__mission-image-dialog-body">
            <figure className="s03-science__mission-image-dialog-figure">
              <img
                src={imageSrc}
                alt="Concepto artístico de la nave Kepler en el espacio durante su misión K2."
                decoding="async"
              />
              <figcaption>
                Concepto artístico: representa la misión, no una fotografía de la nave en operación.
              </figcaption>
            </figure>
            <aside className="s03-science__mission-image-dialog-source">
              <p className="s03-science__eyebrow">NASA/JPL · PIA18904</p>
              <h4>Fuente y contexto</h4>
              <p>
                Concepto artístico de Kepler operando en su nuevo perfil de misión K2. Publicado el
                18 de diciembre de 2014; imagen original de 1920 × 1536 píxeles.
              </p>
              <a
                href="https://science.nasa.gov/image-detail/amf-pia18904/"
                target="_blank"
                rel="noreferrer"
              >
                Ficha original en NASA ↗
              </a>
            </aside>
          </div>
        </div>
      </dialog>
      <div className="s03-science__legacy">
        <strong>&gt; 2 600</strong>
        <span>
          exoplanetas confirmados al retiro de Kepler, según el balance publicado en 2018.
        </span>
      </div>
      <div
        className="s03-science__target-volume"
        aria-label="Población histórica de estrellas observadas"
      >
        <p>
          <strong>≈ 150 000</strong>
          <span>estrellas en el campo fijo de la misión primaria</span>
        </p>
        <p>
          <strong>&gt; 500 000</strong>
          <span>estrellas observadas por Kepler y K2 en conjunto</span>
        </p>
      </div>
    </section>
  );
}

const pixels = Array.from({ length: 25 }, (_, index) => ({
  index,
  x: index % 5,
  y: Math.floor(index / 5),
  fluxLevel: Math.max(
    1,
    5 - Math.round(Math.hypot((index % 5) - 2, Math.floor(index / 5) - 2) * 1.3),
  ),
  inAperture: [6, 7, 8, 11, 12, 13, 16, 17, 18].includes(index),
}));

function PixelsApertureFlux() {
  const [step, setStep] = useState(0);
  const labels = ['Píxeles', 'Apertura', 'Suma SAP'] as const;
  const descriptions = [
    'Cada celda es un píxel. En cada cadencia, el píxel i registra Fᵢ(t): el flujo luminoso que recibe en ese instante.',
    'La máscara selecciona una apertura A de nueve píxeles. El borde ámbar marca cuáles aportes entran en la suma; la apertura también puede recoger luz de fuentes vecinas.',
    'SAP suma los píxeles elegidos en cada cadencia: fotometría de apertura simple. Al repetir la suma en el tiempo se forma una curva de luz; PDCSAP aplica correcciones adicionales de tendencias instrumentales.',
  ];
  return (
    <section className="s03-science__pixels" aria-label="De la luz estelar a la curva de flujo">
      <div
        className="s03-science__toggle"
        role="group"
        aria-label="Etapas de extracción del flujo por apertura"
      >
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            aria-pressed={step === index}
            onClick={() => setStep(index)}
          >
            {index + 1}. {label}
          </button>
        ))}
      </div>
      <figure className="s03-science__pixel-figure">
        <div
          className="s03-science__pixel-field"
          role="img"
          aria-label={`Fuente estelar difuminada detrás de una retícula de 25 píxeles; cada celda corresponde a un flujo Fᵢ(t). ${step > 0 ? 'La apertura A resalta nueve celdas.' : 'La intensidad es mayor cerca del centro.'}`}
        >
          <img
            className="s03-science__pixel-source"
            src={withBase('/images/s03/s03-kepler-pixel-source.png')}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <div className="s03-science__pixel-grid" aria-hidden="true">
            {pixels.map((pixel) => (
              <span
                key={pixel.index}
                className={[
                  's03-science__pixel',
                  `s03-science__pixel--flux-${pixel.fluxLevel}`,
                  pixel.inAperture && step > 0 ? 's03-science__pixel--selected' : '',
                  step === 2 && !pixel.inAperture ? 's03-science__pixel--dimmed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                F
                {String(pixel.index + 1)
                  .split('')
                  .map((digit) => String.fromCharCode(0x2080 + Number(digit)))
                  .join('')}
              </span>
            ))}
          </div>
        </div>
        <figcaption className="s03-science__pixel-caption">
          <span>
            <strong>Fᵢ(t)</strong> flujo del píxel <i>i</i> en cada cadencia
          </span>
          <span
            className="s03-science__pixel-scale"
            aria-label="Flujo relativo en cada píxel, de menor a mayor"
          >
            <span>menor</span>
            <i aria-hidden="true" />
            <span>mayor flujo</span>
          </span>
          {step > 0 && (
            <span className="s03-science__aperture-key">
              <i aria-hidden="true">A</i> píxeles seleccionados
            </span>
          )}
        </figcaption>
      </figure>
      <div className="s03-science__flux-panel" aria-live="polite">
        <h3>{labels[step]}</h3>
        <p>{descriptions[step]}</p>
        {step === 1 && (
          <p className="s03-science__aperture-total">
            <strong>A = 9</strong> píxeles seleccionados de 25
          </p>
        )}
        {step === 2 && (
          <>
            <p className="s03-science__flux-equation">
              <code>
                F<sub>SAP</sub>(t) = ∑<sub>i∈A</sub> F<sub>i</sub>(t)
              </code>
            </p>
            <figure className="s03-science__flux-chart">
              <div
                className="s03-science__flux-chart-plot"
                role="img"
                aria-label="Curva de luz resultante: flujo total frente al tiempo, con una caída y recuperación del brillo."
              >
                <span>Flujo total</span>
                <svg viewBox="0 0 460 124" aria-hidden="true" focusable="false">
                  <line x1="36" y1="12" x2="36" y2="102" />
                  <line x1="36" y1="102" x2="448" y2="102" />
                  <path d="M36 30 H156 C170 30 174 31 185 49 L198 73 H228 L241 48 C252 31 260 30 277 30 H448" />
                </svg>
              </div>
              <figcaption>Una suma por cadencia construye la serie temporal.</figcaption>
            </figure>
          </>
        )}
      </div>
      <p className="s03-science__quality-note">
        La incertidumbre del flujo y la bandera <code>SAP_QUALITY</code> acompañan cada cadencia y
        ayudan a juzgar cada medición.
      </p>
    </section>
  );
}

type KeplerRow = {
  bjd_minus_2454833: number;
  relative_flux_ppm: number;
  relative_flux_err_ppm: number;
};

const sampleRows = sample.rows as KeplerRow[];
const CHART = { left: 76, top: 22, width: 672, height: 194 };

function ObservedKepler10() {
  const titleId = `s03-kepler10-chart-${useId().replaceAll(':', '')}`;
  const xValues = sampleRows.map((row) => row.bjd_minus_2454833);
  const yValues = sampleRows.map((row) => row.relative_flux_ppm);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues) - 55;
  const maxY = Math.max(...yValues) + 55;
  const xAt = (x: number) => CHART.left + ((x - minX) / (maxX - minX)) * CHART.width;
  const yAt = (y: number) => CHART.top + ((maxY - y) / (maxY - minY)) * CHART.height;
  return (
    <section className="s03-science__observed" aria-label="Ventana observada de Kepler-10">
      <div className="s03-science__observed-heading">
        <p className="s03-science__eyebrow">
          Datos de MAST · Kepler Q1 · PDCSAP · Kepler-10 (KIC 11904151)
        </p>
        <p className="s03-science__observed-reading">
          Con ruido, quizá no veamos ninguna caída clara; otras veces destaca una aislada o aparecen
          varias que se repiten. Aquí sobresale la bajada central y su recuperación: podría ser una
          candidata a tránsito. Comparar otros ciclos permitiría evaluar si el patrón es periódico.
        </p>
      </div>
      <figure className="s03-science__chart">
        <svg viewBox="0 0 800 286" role="img" aria-labelledby={`${titleId}-title ${titleId}-desc`}>
          <title id={`${titleId}-title`}>
            Curva de luz observada de Kepler-10 con una bajada central
          </title>
          <desc id={`${titleId}-desc`}>
            {sampleRows.length} puntos sin unir muestran cadencias del archivo Kepler Q1 de MAST. El
            eje vertical muestra flujo PDCSAP relativo en partes por millón. Las barras verticales
            muestran la incertidumbre; la línea discontinua en cero es la mediana Q1 de cadencias
            con SAP_QUALITY igual a cero. La ventana se centra en el segundo tránsito predicho con
            la época y el período publicados.
          </desc>
          <line
            className="s03-science__axis"
            x1={CHART.left}
            x2={CHART.left + CHART.width}
            y1={CHART.top + CHART.height}
            y2={CHART.top + CHART.height}
          />
          <line
            className="s03-science__axis"
            x1={CHART.left}
            x2={CHART.left}
            y1={CHART.top}
            y2={CHART.top + CHART.height}
          />
          {Array.from({ length: 5 }, (_, index) => {
            const fraction = index / 4;
            const x = CHART.left + fraction * CHART.width;
            const value = minX + fraction * (maxX - minX);
            return (
              <g key={`x-tick-${index}`}>
                <line
                  className="s03-science__tick"
                  x1={x}
                  x2={x}
                  y1={CHART.top + CHART.height}
                  y2={CHART.top + CHART.height + 5}
                />
                <text
                  className="s03-science__tick-label"
                  x={x}
                  y={CHART.top + CHART.height + 20}
                  textAnchor="middle"
                >
                  {value.toFixed(2)}
                </text>
              </g>
            );
          })}
          {Array.from({ length: 5 }, (_, index) => {
            const fraction = index / 4;
            const value = maxY - fraction * (maxY - minY);
            const y = yAt(value);
            return (
              <g key={`y-tick-${index}`}>
                <line
                  className="s03-science__tick"
                  x1={CHART.left - 5}
                  x2={CHART.left}
                  y1={y}
                  y2={y}
                />
                <text
                  className="s03-science__tick-label"
                  x={CHART.left - 10}
                  y={y + 4}
                  textAnchor="end"
                >
                  {value.toFixed(0)}
                </text>
              </g>
            );
          })}
          <line
            className="s03-science__reference"
            x1={CHART.left}
            x2={CHART.left + CHART.width}
            y1={yAt(0)}
            y2={yAt(0)}
          />
          {sampleRows.map((row, index) => {
            const x = xAt(row.bjd_minus_2454833);
            const y = yAt(row.relative_flux_ppm);
            const error = (row.relative_flux_err_ppm / (maxY - minY)) * CHART.height;
            return (
              <g key={`${row.bjd_minus_2454833}-${index}`}>
                <line
                  className="s03-science__errorbar"
                  x1={x}
                  x2={x}
                  y1={y - error}
                  y2={y + error}
                />
                <circle className="s03-science__datum" cx={x} cy={y} r="4.2" />
              </g>
            );
          })}
          <text className="s03-science__axis-label" x="412" y="279" textAnchor="middle">
            BJD − 2 454 833 · días (TDB)
          </text>
          <text
            className="s03-science__axis-label"
            x="18"
            y="118"
            transform="rotate(-90 18 118)"
            textAnchor="middle"
          >
            PDCSAP relativo · ppm
          </text>
        </svg>
        <figcaption>
          Cada punto resume 29,4 min; las barras indican incertidumbre y la línea discontinua marca
          la mediana de Q1 (0 ppm). La ventana se centró en el segundo tránsito predicho para
          Kepler-10 b con la época y el período publicados.
        </figcaption>
      </figure>
    </section>
  );
}

const starspotLayout = [
  { longitude: -0.88, latitude: -0.08 },
  { longitude: -0.52, latitude: 0.08 },
  { longitude: -0.12, latitude: -0.14 },
  { longitude: 0.29, latitude: 0.11 },
  { longitude: 0.72, latitude: -0.04 },
] as const;
const starspotDepth = 0.008;

function starspotFlux(phase: number, spotCount: number) {
  const rotation = phase * Math.PI * 2;
  const deficit = starspotLayout.slice(0, spotCount).reduce((sum, spot) => {
    const projectedArea = Math.max(
      0,
      Math.cos(spot.latitude) * Math.cos(spot.longitude + rotation),
    );
    return sum + starspotDepth * projectedArea;
  }, 0);
  return 1 - deficit;
}

function StarspotVariability() {
  const [spotCount, setSpotCount] = useState(3);
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const svgId = useId().replaceAll(':', '');
  const spotCountId = `${svgId}-spot-count`;
  const starGradientId = `${svgId}-star-gradient`;
  const starGlowId = `${svgId}-star-glow`;
  const starClipId = `${svgId}-star-clip`;
  const starTitleId = `${svgId}-star-title`;
  const starDescriptionId = `${svgId}-star-description`;
  const curveTitleId = `${svgId}-curve-title`;
  const curveDescriptionId = `${svgId}-curve-description`;
  const flux = starspotFlux(phase, spotCount);
  const curveX = (samplePhase: number) => 54 + samplePhase * 426;
  const curveY = (sampleFlux: number) => 42 + ((1 - sampleFlux) / 0.06) * 112;
  const curvePath = Array.from({ length: 121 }, (_, index) => {
    const samplePhase = index / 120;
    const command = index === 0 ? 'M' : 'L';
    return `${command}${curveX(samplePhase).toFixed(1)} ${curveY(starspotFlux(samplePhase, spotCount)).toFixed(1)}`;
  }).join(' ');
  const markerX = curveX(phase);
  const markerY = curveY(flux);
  const renderedSpots = starspotLayout.slice(0, spotCount).map((spot, index) => {
    const longitude = spot.longitude + phase * Math.PI * 2;
    const limbWeight = Math.cos(spot.latitude) * Math.cos(longitude);
    return {
      index,
      visible: limbWeight > 0,
      cx: 132 + Math.cos(spot.latitude) * Math.sin(longitude) * 76,
      cy: 128 - Math.sin(spot.latitude) * 76,
      rx: Math.max(0.8, 8 * limbWeight),
    };
  });

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      setIsPlaying(true);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => setIsPlaying(!reducedMotion.matches);
    updatePlayback();
    reducedMotion.addEventListener?.('change', updatePlayback);
    return () => reducedMotion.removeEventListener?.('change', updatePlayback);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1 / 120) % 1);
    }, 100);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  return (
    <section className="s03-science__lookalike" aria-label="Variabilidad por manchas estelares">
      <div className="s03-science__lookalike-pair">
        <figure className="s03-science__starspot-figure">
          <figcaption>La rotación lleva manchas oscuras dentro y fuera de vista</figcaption>
          <svg
            className="s03-science__starspot-disc"
            viewBox="0 0 270 250"
            role="img"
            aria-labelledby={`${starTitleId} ${starDescriptionId}`}
            data-phase={phase.toFixed(3)}
            data-spot-count={spotCount}
            data-visible-spots={renderedSpots.filter((spot) => spot.visible).length}
          >
            <title id={starTitleId}>Disco estelar giratorio con {spotCount} manchas totales</title>
            <desc id={starDescriptionId}>
              Vista de frente del hemisferio visible. Las manchas oscuras cruzan el disco al girar;
              las del hemisferio opuesto quedan ocultas. Cuando entra o sale área manchada de la
              vista, cambia el flujo total representado en la curva.
            </desc>
            <defs>
              <radialGradient id={starGradientId} cx="35%" cy="28%" r="78%">
                <stop offset="0" stopColor="#fff2b2" />
                <stop offset="0.36" stopColor="#ffd266" />
                <stop offset="0.73" stopColor="#ff9638" />
                <stop offset="1" stopColor="#d64a17" />
              </radialGradient>
              <filter id={starGlowId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="10" />
              </filter>
              <clipPath id={starClipId}>
                <circle cx="132" cy="128" r="80" />
              </clipPath>
            </defs>
            <path
              className="s03-science__starspot-rotation-arrow"
              d="M83 48 C103 20 158 19 181 43"
            />
            <path className="s03-science__starspot-rotation-arrowhead" d="m174 35 11 8-13 3" />
            <text
              className="s03-science__starspot-rotation-label"
              x="132"
              y="22"
              textAnchor="middle"
            >
              rotación
            </text>
            <circle
              className="s03-science__starspot-glow"
              cx="132"
              cy="128"
              r="86"
              filter={`url(#${starGlowId})`}
            />
            <circle cx="132" cy="128" r="80" fill={`url(#${starGradientId})`} />
            <circle className="s03-science__starspot-limb" cx="132" cy="128" r="79" />
            <g clipPath={`url(#${starClipId})`}>
              {renderedSpots.map(
                (spot) =>
                  spot.visible && (
                    <ellipse
                      key={spot.index}
                      className="s03-science__starspot-mark"
                      cx={spot.cx}
                      cy={spot.cy}
                      rx={spot.rx}
                      ry="7"
                    />
                  ),
              )}
            </g>
            <text className="s03-science__starspot-view-label" x="132" y="232" textAnchor="middle">
              {renderedSpots.filter((spot) => spot.visible).length} de {spotCount} manchas visibles
            </text>
          </svg>
          <div
            className="s03-science__starspot-controls"
            role="group"
            aria-label="Controles de manchas y rotación"
          >
            <div className="s03-science__starspot-count-control">
              <label htmlFor={spotCountId}>
                Manchas totales <output>{spotCount}</output>
              </label>
              <input
                id={spotCountId}
                type="range"
                min="1"
                max="5"
                step="1"
                value={spotCount}
                aria-label="Número total de manchas"
                onChange={(event) => setSpotCount(Number(event.currentTarget.value))}
              />
            </div>
            <button
              type="button"
              className="s03-science__starspot-play"
              aria-pressed={isPlaying}
              onClick={() => setIsPlaying((playing) => !playing)}
            >
              {isPlaying ? 'Pausar giro' : 'Reanudar giro'}
            </button>
          </div>
          <p className="s03-science__starspot-note">
            Las manchas conservan tamaño y contraste; en este ejemplo están agrupadas.
          </p>
        </figure>
        <figure className="s03-science__diagnostic s03-science__starspot-chart">
          <figcaption>
            Flujo total · modelo didáctico <output>F/F₀ = {flux.toFixed(3)}</output>
          </figcaption>
          <svg
            viewBox="0 0 520 205"
            role="img"
            aria-labelledby={`${curveTitleId} ${curveDescriptionId}`}
            data-phase={phase.toFixed(3)}
            data-spot-count={spotCount}
            data-flux={flux.toFixed(4)}
          >
            <title id={curveTitleId}>Flujo relativo durante una rotación estelar</title>
            <desc id={curveDescriptionId}>
              Curva didáctica calculada con {spotCount} manchas iguales. El punto y la línea
              vertical muestran la misma fase y el flujo actual del disco. Flujo base sin manchas:
              uno.
            </desc>
            <path className="s03-science__diagnostic-axis" d="M54 26 V158 H488" />
            <path
              className="s03-science__diagnostic-grid"
              d="M54 42 H488 M54 98 H488 M54 154 H488"
            />
            <path className="s03-science__diagnostic-trace" d={curvePath} />
            <text className="s03-science__diagnostic-label" x="55" y="20">
              F/F₀
            </text>
            <path
              className="s03-science__starspot-phase-line"
              d={`M${markerX.toFixed(1)} 30 V158`}
            />
            <circle className="s03-science__starspot-phase-point" cx={markerX} cy={markerY} r="6" />
            <text className="s03-science__diagnostic-label" x="49" y="46" textAnchor="end">
              1,00
            </text>
            <text className="s03-science__diagnostic-label" x="49" y="102" textAnchor="end">
              0,97
            </text>
            <text className="s03-science__diagnostic-label" x="49" y="158" textAnchor="end">
              0,94
            </text>
            <text className="s03-science__diagnostic-axis-label" x="54" y="179">
              0
            </text>
            <text className="s03-science__diagnostic-axis-label" x="488" y="179" textAnchor="end">
              1 vuelta
            </text>
            <text className="s03-science__diagnostic-axis-label" x="488" y="198" textAnchor="end">
              Fase de rotación
            </text>
          </svg>
          <p>El nivel sin manchas es 1; el área visible de cada mancha reduce el flujo.</p>
        </figure>
      </div>
      <p className="s03-science__image-note">
        La cantidad cambia la curva en esta distribución; manchas repartidas de forma simétrica
        pueden compensarse.
      </p>
    </section>
  );
}

const binaryModel = {
  primaryRadius: 1,
  secondaryRadius: 0.46,
  primaryBrightness: 1,
  secondaryBrightness: 0.3,
  separation: 3.5,
  blendFlux: 0.55,
} as const;

function circleOverlap(radiusA: number, radiusB: number, separation: number) {
  if (separation >= radiusA + radiusB) return 0;
  if (separation <= Math.abs(radiusA - radiusB)) {
    return Math.PI * Math.min(radiusA, radiusB) ** 2;
  }

  const firstAngle = Math.acos(
    (separation ** 2 + radiusA ** 2 - radiusB ** 2) / (2 * separation * radiusA),
  );
  const secondAngle = Math.acos(
    (separation ** 2 + radiusB ** 2 - radiusA ** 2) / (2 * separation * radiusB),
  );
  const triangleArea =
    0.5 *
    Math.sqrt(
      (-separation + radiusA + radiusB) *
        (separation + radiusA - radiusB) *
        (separation - radiusA + radiusB) *
        (separation + radiusA + radiusB),
    );
  return radiusA ** 2 * firstAngle + radiusB ** 2 * secondAngle - triangleArea;
}

function eclipsingBinaryFlux(phase: number) {
  const angle = phase * Math.PI * 2;
  const projectedSeparation = binaryModel.separation * Math.abs(Math.cos(angle));
  const overlap = circleOverlap(
    binaryModel.primaryRadius,
    binaryModel.secondaryRadius,
    projectedSeparation,
  );
  const secondaryInFront = Math.sin(angle) >= 0;
  const blockedFlux = secondaryInFront
    ? (binaryModel.primaryBrightness - binaryModel.secondaryBrightness) * overlap
    : binaryModel.secondaryBrightness * overlap;
  const baseline =
    Math.PI * binaryModel.primaryRadius ** 2 * binaryModel.primaryBrightness +
    Math.PI * binaryModel.secondaryRadius ** 2 * binaryModel.secondaryBrightness;
  return 1 - blockedFlux / baseline;
}

function blendedBinaryFlux(phase: number) {
  return (eclipsingBinaryFlux(phase) + binaryModel.blendFlux) / (1 + binaryModel.blendFlux);
}

function EclipsingBinary() {
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const svgId = useId().replaceAll(':', '');
  const primaryGradientId = `${svgId}-primary-gradient`;
  const secondaryGradientId = `${svgId}-secondary-gradient`;
  const neighborGradientId = `${svgId}-neighbor-gradient`;
  const glowId = `${svgId}-binary-glow`;
  const projectedAngle = 2 * Math.PI * phase;
  const secondaryDepth = Math.sin(projectedAngle);
  const secondaryInFront = secondaryDepth >= 0;
  const primaryX = 180 - 28 * Math.cos(projectedAngle);
  const primaryY = 120 + 28 * Math.sin(projectedAngle);
  const secondaryX = 180 + 56 * Math.cos(projectedAngle);
  const secondaryY = 120 - 56 * Math.sin(projectedAngle);
  const skySeparation = 84 * Math.cos(projectedAngle);
  const projectedPrimaryX = 150 - skySeparation / 3;
  const projectedSecondaryX = 150 + (2 * skySeparation) / 3;
  const phaseFlux = blendedBinaryFlux(phase);
  const intrinsicPrimaryDepth = 1 - eclipsingBinaryFlux(0.25);
  const intrinsicSecondaryDepth = 1 - eclipsingBinaryFlux(0.75);
  const blendedPrimaryDepth = 1 - blendedBinaryFlux(0.25);
  const curveX = (samplePhase: number) => 56 + samplePhase * 426;
  const curveY = (flux: number) => 40 + ((1.02 - flux) / 0.22) * 145;
  const intrinsicPath = Array.from({ length: 241 }, (_, index) => {
    const samplePhase = index / 240;
    return `${index === 0 ? 'M' : 'L'}${curveX(samplePhase).toFixed(1)} ${curveY(eclipsingBinaryFlux(samplePhase)).toFixed(1)}`;
  }).join(' ');
  const blendedPath = Array.from({ length: 241 }, (_, index) => {
    const samplePhase = index / 240;
    return `${index === 0 ? 'M' : 'L'}${curveX(samplePhase).toFixed(1)} ${curveY(blendedBinaryFlux(samplePhase)).toFixed(1)}`;
  }).join(' ');
  const markerX = curveX(phase);
  const markerY = curveY(phaseFlux);
  const inEclipse =
    circleOverlap(
      binaryModel.primaryRadius,
      binaryModel.secondaryRadius,
      binaryModel.separation * Math.abs(Math.cos(projectedAngle)),
    ) > 0;
  const eventLabel = inEclipse
    ? secondaryInFront
      ? 'Eclipse primario · la compañera pasa delante'
      : 'Eclipse secundario · la compañera pasa detrás'
    : 'Sin eclipse · las estrellas se ven separadas';

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      setIsPlaying(true);
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePlayback = () => setIsPlaying(!reducedMotion.matches);
    updatePlayback();
    reducedMotion.addEventListener?.('change', updatePlayback);
    return () => reducedMotion.removeEventListener?.('change', updatePlayback);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1 / 120) % 1);
    }, 100);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const drawPrimary = (
    <g aria-hidden="true">
      <circle
        cx={primaryX}
        cy={primaryY}
        r="30"
        fill="#ffab43"
        opacity="0.34"
        filter={`url(#${glowId})`}
      />
      <circle cx={primaryX} cy={primaryY} r="24" fill={`url(#${primaryGradientId})`} />
      <ellipse cx={primaryX - 8} cy={primaryY - 7} rx="8" ry="5" fill="#fff2bd" opacity="0.3" />
      <ellipse cx={primaryX + 12} cy={primaryY + 8} rx="5" ry="3" fill="#d9511d" opacity="0.38" />
      <circle cx={primaryX} cy={primaryY} r="23" fill="none" stroke="#ffe4a3" strokeOpacity="0.6" />
    </g>
  );
  const drawSecondary = (
    <g aria-hidden="true">
      <circle
        cx={secondaryX}
        cy={secondaryY}
        r="15"
        fill="#ff7b35"
        opacity="0.4"
        filter={`url(#${glowId})`}
      />
      <circle cx={secondaryX} cy={secondaryY} r="11" fill={`url(#${secondaryGradientId})`} />
      <ellipse
        cx={secondaryX - 4}
        cy={secondaryY - 5}
        rx="5"
        ry="3"
        fill="#fff0bd"
        opacity="0.36"
      />
      <circle
        cx={secondaryX}
        cy={secondaryY}
        r="10"
        fill="none"
        stroke="#ffd48d"
        strokeOpacity="0.68"
      />
    </g>
  );
  const curveTitleId = `${svgId}-curve-title`;
  const curveDescriptionId = `${svgId}-curve-description`;

  return (
    <section
      className="s03-science__lookalike"
      aria-label="Binaria eclipsante y luz de una fuente vecina"
    >
      <div className="s03-science__lookalike-pair">
        <figure className="s03-science__binary-figure">
          <figcaption>
            <span>Una binaria en órbita y su proyección</span>
            <output>{eventLabel}</output>
          </figcaption>
          <div className="s03-science__binary-views">
            <div className="s03-science__binary-view-card">
              <h3>
                Vista lateral <span>· +z hacia el observador</span>
              </h3>
              <svg
                className="s03-science__binary-orbit"
                viewBox="0 0 360 230"
                role="img"
                aria-label="Vista lateral: dos estrellas orbitan su baricentro; el eje z apunta hacia el observador."
                data-phase={phase.toFixed(3)}
                data-event={inEclipse ? (secondaryInFront ? 'primary' : 'secondary') : 'none'}
              >
                <defs>
                  <radialGradient id={primaryGradientId} cx="34%" cy="27%" r="78%">
                    <stop offset="0" stopColor="#fff5c3" />
                    <stop offset="0.42" stopColor="#ffd56a" />
                    <stop offset="0.8" stopColor="#ff9a3e" />
                    <stop offset="1" stopColor="#d84e1b" />
                  </radialGradient>
                  <radialGradient id={secondaryGradientId} cx="32%" cy="26%" r="78%">
                    <stop offset="0" stopColor="#fff0b6" />
                    <stop offset="0.48" stopColor="#ffb04f" />
                    <stop offset="1" stopColor="#d54b27" />
                  </radialGradient>
                  <radialGradient id={neighborGradientId} cx="35%" cy="30%" r="80%">
                    <stop offset="0" stopColor="#fff1d0" />
                    <stop offset="0.6" stopColor="#d7c7fa" />
                    <stop offset="1" stopColor="#8a76bf" />
                  </radialGradient>
                  <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </defs>
                <circle className="s03-science__binary-orbit-line" cx="180" cy="120" r="56" />
                <circle
                  className="s03-science__binary-orbit-line s03-science__binary-orbit-line--inner"
                  cx="180"
                  cy="120"
                  r="28"
                />
                <path className="s03-science__binary-sightline" d="M180 37 V74" />
                <path className="s03-science__binary-arrow" d="m174 47 6-10 6 10" />
                <text className="s03-science__binary-axis-label" x="192" y="48">
                  +z
                </text>
                <text className="s03-science__binary-observer" x="260" y="28" textAnchor="middle">
                  observador
                </text>
                <circle className="s03-science__binary-barycenter" cx="180" cy="120" r="3.5" />
                <text
                  className="s03-science__binary-axis-label"
                  x="180"
                  y="218"
                  textAnchor="middle"
                >
                  punto común de las órbitas · baricentro
                </text>
                {secondaryInFront ? (
                  <>
                    {drawPrimary}
                    {drawSecondary}
                  </>
                ) : (
                  <>
                    {drawSecondary}
                    {drawPrimary}
                  </>
                )}
                <text
                  className="s03-science__binary-star-label"
                  x={primaryX}
                  y={primaryY + 39}
                  textAnchor="middle"
                >
                  A · más brillante
                </text>
                <text
                  className="s03-science__binary-star-label"
                  x={secondaryX}
                  y={secondaryY < 95 ? secondaryY + 34 : secondaryY - 25}
                  textAnchor="middle"
                >
                  B · compañera
                </text>
              </svg>
            </div>
            <div className="s03-science__binary-view-card">
              <h3>
                Desde el telescopio <span>· proyección sobre el cielo</span>
              </h3>
              <svg
                className="s03-science__binary-projection"
                viewBox="0 0 360 230"
                role="img"
                aria-label="Vista proyectada: la binaria se eclipsa y una fuente vecina queda dentro de la apertura fotométrica."
                data-phase={phase.toFixed(3)}
                data-primary-depth={intrinsicPrimaryDepth.toFixed(4)}
                data-secondary-depth={intrinsicSecondaryDepth.toFixed(4)}
                data-blended-primary-depth={blendedPrimaryDepth.toFixed(4)}
              >
                <rect
                  className="s03-science__binary-aperture"
                  x="14"
                  y="28"
                  width="332"
                  height="163"
                  rx="12"
                />
                <text
                  className="s03-science__binary-aperture-label"
                  x="331"
                  y="47"
                  textAnchor="end"
                >
                  apertura
                </text>
                <circle
                  cx={projectedPrimaryX}
                  cy="112"
                  r="30"
                  fill="#ffab43"
                  opacity="0.3"
                  filter={`url(#${glowId})`}
                />
                <circle
                  cx={projectedSecondaryX}
                  cy="112"
                  r="15"
                  fill="#ff7b35"
                  opacity="0.34"
                  filter={`url(#${glowId})`}
                />
                {secondaryInFront ? (
                  <>
                    <circle
                      cx={projectedPrimaryX}
                      cy="112"
                      r="24"
                      fill={`url(#${primaryGradientId})`}
                    />
                    <circle
                      cx={projectedSecondaryX}
                      cy="112"
                      r="11"
                      fill={`url(#${secondaryGradientId})`}
                    />
                  </>
                ) : (
                  <>
                    <circle
                      cx={projectedSecondaryX}
                      cy="112"
                      r="11"
                      fill={`url(#${secondaryGradientId})`}
                    />
                    <circle
                      cx={projectedPrimaryX}
                      cy="112"
                      r="24"
                      fill={`url(#${primaryGradientId})`}
                    />
                  </>
                )}
                <circle
                  cx="298"
                  cy="112"
                  r="17"
                  fill="#bca7eb"
                  opacity="0.26"
                  filter={`url(#${glowId})`}
                />
                <circle cx="298" cy="112" r="11" fill={`url(#${neighborGradientId})`} />
                <text
                  className="s03-science__binary-star-label"
                  x="298"
                  y="145"
                  textAnchor="middle"
                >
                  fuente vecina
                </text>
                <text
                  className="s03-science__binary-panel-subtitle"
                  x="180"
                  y="175"
                  textAnchor="middle"
                >
                  su luz constante atenúa la señal
                </text>
              </svg>
            </div>
          </div>
          <p className="s03-science__binary-phase" data-phase={phase.toFixed(3)}>
            Fase {phase.toFixed(2)} · eclipse primario en 0,25 · secundario en 0,75
          </p>
          <button
            type="button"
            className="s03-science__binary-play"
            aria-pressed={isPlaying}
            onClick={() => setIsPlaying((playing) => !playing)}
          >
            {isPlaying ? 'Pausar órbita' : 'Reanudar órbita'}
          </button>
        </figure>

        <figure className="s03-science__diagnostic s03-science__binary-chart">
          <figcaption>Dos eclipses por vuelta · la luz vecina cambia la profundidad</figcaption>
          <svg
            viewBox="0 0 520 250"
            role="img"
            aria-labelledby={`${curveTitleId} ${curveDescriptionId}`}
            data-phase={phase.toFixed(3)}
            data-flux={phaseFlux.toFixed(4)}
            data-primary-depth={intrinsicPrimaryDepth.toFixed(4)}
            data-secondary-depth={intrinsicSecondaryDepth.toFixed(4)}
            data-blended-primary-depth={blendedPrimaryDepth.toFixed(4)}
          >
            <title id={curveTitleId}>Curva de luz de una binaria eclipsante con y sin mezcla</title>
            <desc id={curveDescriptionId}>
              Modelo sintético de una órbita: la curva sólida muestra eclipses primario y
              secundario; la curva discontinua añade el flujo constante de una fuente vecina y
              reduce ambos descensos. El marcador sigue la fase de la animación.
            </desc>
            <path className="s03-science__diagnostic-axis" d="M56 28 V194 H492" />
            <path
              className="s03-science__diagnostic-grid"
              d="M56 53 H492 M56 119 H492 M56 185 H492"
            />
            <path
              className="s03-science__diagnostic-trace s03-science__binary-intrinsic"
              d={intrinsicPath}
            />
            <path
              className="s03-science__diagnostic-trace s03-science__binary-diluted"
              d={blendedPath}
            />
            <text className="s03-science__diagnostic-label" x="57" y="20">
              F/F₀
            </text>
            <path
              className="s03-science__starspot-phase-line"
              d={`M${markerX.toFixed(1)} 29 V194`}
            />
            <circle className="s03-science__starspot-phase-point" cx={markerX} cy={markerY} r="6" />
            <text className="s03-science__diagnostic-label" x="51" y="57" textAnchor="end">
              1,0
            </text>
            <text className="s03-science__diagnostic-label" x="51" y="123" textAnchor="end">
              0,9
            </text>
            <text className="s03-science__diagnostic-label" x="51" y="189" textAnchor="end">
              0,8
            </text>
            {[
              ['0', 0],
              ['0,25', 0.25],
              ['0,5', 0.5],
              ['0,75', 0.75],
              ['1', 1],
            ].map(([label, value]) => (
              <text
                key={label}
                className="s03-science__diagnostic-axis-label"
                x={curveX(Number(value))}
                y="213"
                textAnchor="middle"
              >
                {label}
              </text>
            ))}
            <text className="s03-science__diagnostic-axis-label" x="492" y="235" textAnchor="end">
              Fase orbital
            </text>
          </svg>
          <div className="s03-science__binary-legend" aria-label="Curvas comparadas">
            <span>
              <i className="s03-science__binary-legend-line" />
              Binaria sola
            </span>
            <span>
              <i className="s03-science__binary-legend-line s03-science__binary-legend-line--diluted" />
              Con fuente vecina
            </span>
          </div>
          <p>
            Las dos caídas se repiten por órbita. La luz vecina eleva el nivel base y hace que cada
            eclipse parezca menos profundo.
          </p>
        </figure>
      </div>
      <p className="s03-science__image-note">
        El eclipse primario ocurre cuando la compañera más tenue oculta parte de A; el secundario
        ocurre cuando A tapa a la compañera. Las profundidades dependen del tamaño y brillo de las
        estrellas, y la curva ilustrada no representa datos de Kepler.
      </p>
    </section>
  );
}

function ApertureMotionFigure() {
  const pixels = Array.from({ length: 25 }, (_, index) => index);
  return (
    <figure className="s03-science__aperture-motion">
      <div
        className="s03-science__motion-snapshots"
        role="img"
        aria-label="La misma estrella aparece en dos momentos sobre la misma retícula. En t₀ está centrada en la apertura A; en t₁ se desplaza hacia su borde y parte de la luz queda fuera."
      >
        <div className="s03-science__motion-snapshot">
          <strong>t₀ · estrella centrada</strong>
          <div className="s03-science__motion-detector" aria-hidden="true">
            <img
              className="s03-science__motion-source"
              src={withBase('/images/s03/s03-kepler-pixel-source.png')}
              alt=""
            />
            <div className="s03-science__motion-grid">
              {pixels.map((pixel) => (
                <span key={pixel} />
              ))}
            </div>
            <div className="s03-science__motion-aperture">
              <span>A</span>
            </div>
          </div>
        </div>
        <div className="s03-science__motion-transition" aria-hidden="true">
          <span>misma estrella</span>
          <b>→</b>
        </div>
        <div className="s03-science__motion-snapshot s03-science__motion-snapshot--shifted">
          <strong>t₁ · estrella desplazada</strong>
          <div className="s03-science__motion-detector" aria-hidden="true">
            <img
              className="s03-science__motion-source"
              src={withBase('/images/s03/s03-kepler-pixel-source.png')}
              alt=""
            />
            <div className="s03-science__motion-grid">
              {pixels.map((pixel) => (
                <span key={pixel} />
              ))}
            </div>
            <div className="s03-science__motion-aperture">
              <span>A</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption>
        La apertura A permanece fija. Al moverse la estrella, parte de su luz queda fuera de la
        suma.
      </figcaption>
    </figure>
  );
}

function Lookalikes({ sceneId }: SceneProps) {
  if (sceneId === 'variability') return <StarspotVariability />;
  if (sceneId === 'eclipsing-blend') return <EclipsingBinary />;

  const diagnosis = {
    title: 'El flujo y el centroide cambian en el mismo intervalo',
    label:
      'Entre t₀ y t₁, el flujo sumado dentro de la apertura baja mientras el centroide se desplaza hacia la derecha.',
    flowPath: 'M112 58 H232 C249 58 254 84 274 84 H428',
    centroidPath: 'M112 168 H232 C249 168 254 140 274 140 H428',
    note: 'Centroide: posición ponderada de la luz. La coincidencia orienta la revisión del movimiento y la apertura.',
  };
  return (
    <section
      className="s03-science__lookalike"
      aria-label="Movimiento de una fuente respecto de una apertura fija"
    >
      <div className="s03-science__lookalike-pair">
        <ApertureMotionFigure />
        <figure className="s03-science__diagnostic">
          <figcaption>{diagnosis.title}</figcaption>
          <svg viewBox="0 0 520 232" role="img" aria-label={diagnosis.label}>
            <path className="s03-science__diagnostic-axis" d="M42 28 V190 H488" />
            <path className="s03-science__diagnostic-grid" d="M42 78 H488 M42 140 H488" />
            <path className="s03-science__diagnostic-separation" d="M112 30 V190 M428 30 V190" />
            <path className="s03-science__diagnostic-trace" d={diagnosis.flowPath} />
            <path className="s03-science__diagnostic-centroid" d={diagnosis.centroidPath} />
            <text className="s03-science__diagnostic-label" x="50" y="52">
              F
              <tspan baselineShift="sub" fontSize="11">
                A
              </tspan>
            </text>
            <text className="s03-science__diagnostic-label" x="50" y="160">
              Centroide
            </text>
            <text
              className="s03-science__diagnostic-axis-label"
              x="112"
              y="214"
              textAnchor="middle"
            >
              t₀
            </text>
            <text
              className="s03-science__diagnostic-axis-label"
              x="428"
              y="214"
              textAnchor="middle"
            >
              t₁
            </text>
            <text className="s03-science__diagnostic-axis-label" x="488" y="214" textAnchor="end">
              Tiempo
            </text>
          </svg>
          <p>{diagnosis.note}</p>
        </figure>
      </div>
    </section>
  );
}

function ClassificationTask() {
  return (
    <section className="s03-science__classification" aria-label="Tarea de clasificación binaria">
      <figure className="s03-classification__figure">
        <div className="s03-classification__rows">
          {classificationSignals.map((signal) => (
            <div className="s03-classification__row" key={signal.name}>
              <span className="s03-classification__signal-name">{signal.name}</span>
              <svg
                className="s03-classification__plot"
                viewBox="0 0 620 66"
                role="img"
                aria-label={signal.description}
              >
                {signal.points.map((point, index) => (
                  <circle
                    className="s03-classification__point"
                    cx={point.x}
                    cy={point.y}
                    r="2.8"
                    key={`${signal.name}-${index}`}
                  />
                ))}
              </svg>
              <span className="s03-classification__arrow" aria-hidden="true">
                →
              </span>
              <strong className="s03-classification__class">{signal.className}</strong>
            </div>
          ))}
        </div>
        <figcaption>Ejemplos esquemáticos.</figcaption>
      </figure>
    </section>
  );
}

function BinaryInputOutput() {
  const [mode, setMode] = useState<'training' | 'inference'>('training');
  const panelId = `s03-binary-flow-${useId().replaceAll(':', '')}`;
  return (
    <section
      className="s03-science__input-output"
      aria-label="Entrenamiento e inferencia de un clasificador de señales"
    >
      <p className="s03-science__study-lead">
        <strong>Datos de partida.</strong> El catálogo Autovetter de Kepler aportó 15 737 señales
        etiquetadas; se excluyeron las de clase desconocida (UNK).
      </p>
      <section
        className="s03-science__catalog-labels"
        aria-label="Etiquetas del catálogo Autovetter de Kepler"
      >
        <div className="s03-science__catalog-heading">
          <strong>Qué significaba cada etiqueta</strong>
          <span>PC fue positiva · AFP y NTP se agruparon como negativas</span>
        </div>
        <div className="s03-science__catalog-grid">
          <div className="s03-science__catalog-card" data-tone="candidate">
            <p>
              <b>PC</b>
              <span>Planet Candidate</span>
              <strong>3 600</strong>
            </p>
            <h3>Candidata a planeta</h3>
            <p>El catálogo la marcó como posible planeta; aún requiere confirmación.</p>
          </div>
          <div className="s03-science__catalog-card" data-tone="astrophysical">
            <p>
              <b>AFP</b>
              <span>Astrophysical False Positive</span>
              <strong>9 596</strong>
            </p>
            <h3>Falso positivo astrofísico</h3>
            <p>Otro fenómeno astronómico imita un tránsito, por ejemplo, una binaria eclipsante.</p>
          </div>
          <div className="s03-science__catalog-card" data-tone="non-transit">
            <p>
              <b>NTP</b>
              <span>Non-Transiting Phenomenon</span>
              <strong>2 541</strong>
            </p>
            <h3>Fenómeno no transitorio</h3>
            <p>La señal detectada no corresponde a un tránsito planetario.</p>
          </div>
        </div>
        <p className="s03-science__catalog-note">
          El catálogo combinó revisión manual y otros diagnósticos; los autores detectaron algunas
          etiquetas erróneas.
        </p>
      </section>
      <div
        className="s03-science__toggle"
        role="group"
        aria-label="Cambiar entre entrenamiento e inferencia"
      >
        <button
          type="button"
          aria-pressed={mode === 'training'}
          aria-controls={panelId}
          onClick={() => setMode('training')}
        >
          Entrenamiento
        </button>
        <button
          type="button"
          aria-pressed={mode === 'inference'}
          aria-controls={panelId}
          onClick={() => setMode('inference')}
        >
          Inferencia
        </button>
      </div>
      <div id={panelId} className="s03-science__binary-panel" aria-live="polite" aria-atomic="true">
        <div className="s03-science__binary-flow">
          {mode === 'training' ? (
            <>
              <div data-tone="data">
                <span>1 · Señal ya revisada</span>
                <strong>Curva de luz + etiqueta del catálogo</strong>
                <p>PC: candidata · AFP/NTP: clases negativas</p>
              </div>
              <span aria-hidden="true">→</span>
              <div data-tone="model">
                <span>2 · El modelo calcula</span>
                <strong>Un puntaje para la clase candidata</strong>
                <p>Compara su salida con la etiqueta conocida</p>
              </div>
              <span aria-hidden="true">→</span>
              <div data-tone="decision">
                <span>3 · Ajuste</span>
                <strong>Modifica sus parámetros</strong>
                <p>Aprende de las diferencias en los ejemplos</p>
              </div>
            </>
          ) : (
            <>
              <div data-tone="data">
                <span>1 · Señal nueva</span>
                <strong>Una curva sin etiqueta conocida</strong>
                <p>El modelo recibe la señal preparada</p>
              </div>
              <span aria-hidden="true">→</span>
              <div data-tone="model">
                <span>2 · Modelo entrenado</span>
                <strong>Calcula un puntaje de candidatura</strong>
                <p>Usa los parámetros aprendidos</p>
              </div>
              <span aria-hidden="true">→</span>
              <div data-tone="decision">
                <span>3 · Predicción</span>
                <strong>Compara s con un umbral</strong>
                <p>El resultado es candidata o no candidata, según el umbral elegido</p>
              </div>
            </>
          )}
        </div>
        <p className="s03-science__binary-outcome">
          {mode === 'training'
            ? 'La red aprende a reproducir las etiquetas del catálogo, incluidas sus posibles imperfecciones.'
            : 'El puntaje ayuda a priorizar la revisión; por sí solo no confirma un planeta.'}
        </p>
      </div>
    </section>
  );
}

const vocabulary: Record<
  VocabularyTerm,
  {
    tabLabel: string;
    heading: string;
    expansion: string;
    image: string;
    alt: string;
    caption: string;
    description: string;
    flow?: { label: string; value: string }[];
  }
> = {
  TCE: {
    tabLabel: 'Señal detectada',
    heading: 'Evento de cruce de umbral',
    expansion: 'Threshold Crossing Event',
    image: '/images/s03/s03-classification-tce-conceptual.png',
    alt: 'Una estrella brillante vista a través de un telescopio; una pequeña silueta oscura aparece sobre el borde del disco estelar.',
    caption: 'Señal con forma de tránsito detectada; su causa se clasifica después.',
    description:
      'El sistema de búsqueda de Kepler detectó rasgos periódicos parecidos a un tránsito. Ese evento es la instancia que recibe el clasificador; por sí solo no identifica su causa.',
  },
  PC: {
    tabLabel: 'Clase planetaria',
    heading: 'Candidato planetario',
    expansion: 'Planet Candidate',
    image: '/images/s03/s03-classification-pc-conceptual.png',
    alt: 'Un solo cuerpo oscuro cruza el disco de una estrella brillante.',
    caption: 'Escena conceptual de una señal compatible con un candidato planetario.',
    description:
      'PC es la etiqueta de referencia para la clase planetaria del estudio. El catálogo aporta esa referencia durante el entrenamiento y la evaluación del modelo.',
  },
  AFP: {
    tabLabel: 'Origen astrofísico',
    heading: 'Falso positivo astrofísico',
    expansion: 'Astrophysical False Positive',
    image: '/images/s03/s03-classification-afp-conceptual.png',
    alt: 'Dos estrellas de distinto brillo se superponen en la línea de visión; la estrella menor eclipsa parcialmente a la mayor.',
    caption: 'Una binaria eclipsante puede producir una caída parecida a un tránsito.',
    description:
      'AFP es una etiqueta del catálogo para una señal explicada por otro fenómeno astrofísico, como una binaria eclipsante o la luz de una fuente vecina.',
  },
  NTP: {
    tabLabel: 'Fenómeno sin tránsito',
    heading: 'Fenómeno no transitorio',
    expansion: 'Non-Transiting Phenomenon',
    image: '/images/s03/s03-classification-ntp-conceptual.png',
    alt: 'Una estrella con varias manchas oscuras sobre su superficie y sin un cuerpo que cruce delante de ella.',
    caption: 'La actividad estelar puede variar el brillo sin un tránsito planetario.',
    description:
      'NTP es la etiqueta para una señal sin tránsito planetario; puede deberse a variabilidad estelar o a un efecto instrumental detectado durante la revisión.',
  },
  FP: {
    tabLabel: 'Error de predicción',
    heading: 'Falso positivo del clasificador',
    expansion: 'False Positive',
    image: '/images/s03/s03-classification-fp-conceptual.png',
    alt: 'Una estrella con manchas se observa a través de una lente; una sombra aparente cruza la luz, aunque no se ve un planeta.',
    caption: 'Una señal no planetaria puede recibir una predicción de planeta.',
    description:
      'El modelo predice planeta para una señal cuya referencia es AFP o NTP: es una celda de error, no una etiqueta AFP.',
    flow: [
      { label: 'Referencia del catálogo', value: 'AFP o NTP · no planeta' },
      { label: 'Predicción del modelo', value: 'Planeta' },
      { label: 'Resultado', value: 'FP · falso positivo' },
    ],
  },
};

function ClassificationVocabulary() {
  const [term, setTerm] = useState<VocabularyTerm>('TCE');
  const detail = vocabulary[term];
  return (
    <section
      className="s03-science__vocabulary"
      aria-label="Etiquetas del catálogo y error del clasificador"
    >
      <div
        className="s03-science__toggle s03-science__vocabulary-tabs"
        role="group"
        aria-label="Explorar los términos del estudio"
      >
        {(Object.keys(vocabulary) as VocabularyTerm[]).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={term === item}
            onClick={() => setTerm(item)}
          >
            <strong>{item}</strong>
            <span>{vocabulary[item].tabLabel}</span>
          </button>
        ))}
      </div>
      <div className="s03-science__vocabulary-card" aria-live="polite" aria-atomic="true">
        <figure className="s03-science__vocabulary-figure">
          <img src={withBase(detail.image)} alt={detail.alt} />
          <figcaption>{detail.caption}</figcaption>
        </figure>
        <div className="s03-science__vocabulary-copy">
          <p className="s03-science__vocabulary-expansion">
            {term} · {detail.expansion}
          </p>
          <h3>{detail.heading}</h3>
          <p>{detail.description}</p>
          {detail.flow && (
            <div
              className="s03-science__vocabulary-flow"
              aria-label="Ejemplo de desacuerdo entre referencia y predicción"
            >
              {detail.flow.map((step, index) => (
                <Fragment key={step.label}>
                  {index > 0 && (
                    <span className="s03-science__vocabulary-flow-arrow" aria-hidden="true" />
                  )}
                  <div className="s03-science__vocabulary-flow-step">
                    <span>{step.label}</span>
                    <strong>{step.value}</strong>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Preparation() {
  return (
    <section
      className="s03-science__preparation"
      aria-label="Preprocesamiento de las curvas de Kepler"
    >
      <ol className="s03-science__prep-sequence">
        <li className="s03-science__prep-step">
          <span className="s03-science__prep-number">01</span>
          <h3>¿Qué mide cada punto?</h3>
          <p>Kepler observa la misma estrella en muchas cadencias, una medición por instante.</p>
          <dl className="s03-science__prep-fields">
            {preparationFields.map((field) => (
              <div key={field.symbol}>
                <dt>{field.symbol}</dt>
                <dd>
                  <strong>{field.label}:</strong> {field.description}
                </dd>
              </div>
            ))}
          </dl>
        </li>
        <li className="s03-science__prep-step">
          <span className="s03-science__prep-number">02</span>
          <h3>Aplanar sin borrar el tránsito</h3>
          <p>
            Para cada TCE, retiran los tránsitos de otros planetas confirmados. Luego estiman la
            tendencia lenta <code>B(t)</code> con una spline: ocultan las mediciones del tránsito
            buscado durante el ajuste y las interpolan, para que la tendencia no lo aplaste. Dividen
            el flujo por <code>B(t)</code> (<code>F(t) / B(t)</code>) y retiran puntos que se alejan
            más de 3σ del ajuste.
          </p>
        </li>
        <li className="s03-science__prep-step">
          <span className="s03-science__prep-number">03</span>
          <h3>Alinear y resumir los ciclos</h3>
          <p>
            Usan el período del TCE para plegar la curva: cada repetición cae en la misma fase.
            Agrupan mediciones en bins, calculan la mediana de cada uno y normalizan la curva a
            mediana 0 y mínimo −1. Así crean vectores comparables para las vistas global y local que
            veremos enseguida.
          </p>
        </li>
      </ol>
      <p className="s03-science__source-note">
        El clasificador recibe esta representación preparada; cada decisión puede conservar o borrar
        un rasgo de la señal.
      </p>
    </section>
  );
}

function FoldedViews() {
  return (
    <section className="s03-science__folded" aria-label="Método de representación global y local">
      <p className="s03-science__folded-intro">
        Para separar tránsitos de imitadores, era necesario analizar la forma local del evento y el
        contexto global del ciclo; la CNN seleccionada recibió ambas vistas.
      </p>

      <div className="s03-science__folded-columns">
        <article className="s03-science__folded-view s03-science__folded-view--global">
          <header className="s03-science__folded-view-heading">
            <div>
              <p className="s03-science__folded-kicker">CNN SELECCIONADA · CICLO COMPLETO</p>
              <h3>Vista global</h3>
            </div>
            <strong>2 001 bins</strong>
          </header>
          <p>
            Plegaron la curva aplanada con el período <code>P</code> del TCE y calcularon la mediana
            de flujo en cada bin.
          </p>
          <p className="s03-science__folded-parameters">
            <code>λ = δ = P / 2001</code>
            <span>λ: paso · δ: ancho del bin</span>
          </p>
          <p className="s03-science__folded-tradeoff">
            Conserva el ciclo completo y posibles eclipses secundarios; un tránsito breve puede
            ocupar pocos bins.
          </p>
        </article>

        <article className="s03-science__folded-view s03-science__folded-view--local">
          <header className="s03-science__folded-view-heading">
            <div>
              <p className="s03-science__folded-kicker">CNN SELECCIONADA · EVENTO</p>
              <h3>Vista local</h3>
            </div>
            <strong>201 bins</strong>
          </header>
          <p>
            Recortaron <code>±4d</code> desde el centro del tránsito; <code>d</code> es su duración.
          </p>
          <p className="s03-science__folded-parameters">
            <code>λ = 8d / 201 · δ = 0,16d</code>
            <span>δ &gt; λ: los bins se solapan.</span>
          </p>
          <p className="s03-science__folded-tradeoff">
            Resuelve la forma de la caída; deja fuera el resto del ciclo.
          </p>
        </article>
      </div>

      <div className="s03-science__folded-bottom">
        <section className="s03-science__folded-phase" aria-label="Plegado por fase">
          <p className="s03-science__folded-kicker">OPERACIÓN COMÚN</p>
          <h3>Plegado por fase</h3>
          <code className="s03-science__folded-equation">φ = frac[(t − T₀) / P]</code>
          <p>
            <code>T₀</code>: centro del tránsito; <code>P</code>: período. Así alinean los ciclos en
            fase 0, resumen bins por mediana y normalizan ambas vistas a mediana 0 y mínimo −1.
          </p>
        </section>

        <aside className="s03-science__folded-paper" aria-label="Figura 3 del artículo">
          <S03PaperFigure figureNumber={3} variant="wide" />
        </aside>
      </div>
    </section>
  );
}

function CnnScore() {
  const [stage, setStage] = useState<'training' | 'inference'>('training');
  const reflectionId = useId().replaceAll(':', '');
  return (
    <section className="s03-science__cnn" aria-label="Representaciones, CNN y puntaje">
      <div className="s03-science__toggle" role="group" aria-label="Etapa de uso del modelo">
        <button
          type="button"
          aria-pressed={stage === 'training'}
          onClick={() => setStage('training')}
        >
          Entrenamiento
        </button>
        <button
          type="button"
          aria-pressed={stage === 'inference'}
          onClick={() => setStage('inference')}
        >
          Inferencia
        </button>
      </div>
      <div className="s03-science__cnn-flow" aria-live="polite">
        <div>
          <span>Global + local</span>
          <strong>dos vistas</strong>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <span>Red convolucional</span>
          <strong>{stage === 'training' ? 'ajusta filtros' : 'combina patrones'}</strong>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <span>Salida</span>
          <strong>puntaje s</strong>
        </div>
      </div>
      <p>
        {stage === 'training'
          ? 'La etiqueta de referencia guía el ajuste del modelo. Al invertir el orden de los bins, la señal conserva su clase: PC sigue siendo PC y una señal no planetaria sigue siendo no planetaria.'
          : 'La inferencia entrega el puntaje. No se interpreta como probabilidad calibrada sin una prueba de calibración.'}
      </p>
      {stage === 'training' && (
        <section
          className="s03-science__cnn-augmentation"
          aria-label="Reflejo horizontal durante el entrenamiento"
        >
          <div className="s03-science__cnn-augmentation-heading">
            <p className="s03-science__folded-kicker">AUMENTACIÓN · SOLO EN ENTRENAMIENTO</p>
            <h3>Reflejar invierte el orden de los bins</h3>
          </div>
          <figure className="s03-science__cnn-augmentation-figure">
            <svg
              viewBox="0 0 740 166"
              preserveAspectRatio="none"
              role="img"
              aria-labelledby={`${reflectionId}-title ${reflectionId}-description`}
            >
              <title id={`${reflectionId}-title`}>
                Reflejo horizontal de una curva de tránsito
              </title>
              <desc id={`${reflectionId}-description`}>
                Esquema de una curva y su reflejo superpuestos: se invierte el orden horizontal de
                los bins, el tránsito sigue en fase cero y ambas entradas conservan la etiqueta PC.
              </desc>
              <rect
                className="s03-science__cnn-augmentation-panel"
                x="8"
                y="8"
                width="724"
                height="148"
                rx="8"
              />
              <line
                className="s03-science__cnn-augmentation-axis"
                x1="24"
                y1="76"
                x2="716"
                y2="76"
              />
              <line
                className="s03-science__cnn-augmentation-center"
                x1="370"
                y1="32"
                x2="370"
                y2="132"
              />
              <path
                className="s03-science__cnn-augmentation-curve"
                d="M24 76 H250 C280 76 305 77 320 87 C336 98 345 121 357 132 C367 139 385 139 398 136 C418 133 431 129 446 120 C461 111 476 95 490 82 C500 76 510 76 530 76 H716"
              />
              <g transform="translate(740 0) scale(-1 1)">
                <path
                  className="s03-science__cnn-augmentation-reflected"
                  d="M24 76 H250 C280 76 305 77 320 87 C336 98 345 121 357 132 C367 139 385 139 398 136 C418 133 431 129 446 120 C461 111 476 95 490 82 C500 76 510 76 530 76 H716"
                />
              </g>
            </svg>
            <div
              className="s03-science__cnn-augmentation-legend"
              role="group"
              aria-label="Leyenda de las curvas"
            >
              <span>
                <i className="s03-science__cnn-augmentation-swatch" aria-hidden="true" />
                Curva original · PC
              </span>
              <span>
                <i
                  className="s03-science__cnn-augmentation-swatch s03-science__cnn-augmentation-swatch--reflected"
                  aria-hidden="true"
                />
                Reflejo · PC
              </span>
            </div>
            <figcaption>
              La línea punteada marca la fase 0. Inversión temporal: <code>x₁,…,xₙ → xₙ,…,x₁</code>.
              El dibujo es esquemático; no es una curva observada.
            </figcaption>
          </figure>
          <p className="s03-science__cnn-augmentation-note">
            El artículo aplica estos reflejos al azar durante el entrenamiento. Genera variantes con
            la misma clase; no añade observaciones de Kepler. En inferencia se usan las vistas
            originales.
          </p>
        </section>
      )}
    </section>
  );
}

function PaperResults() {
  const [metric, setMetric] = useState<'accuracy' | 'auc'>('accuracy');
  const models = [
    { name: 'Lineal', accuracy: 0.917, auc: 0.963 },
    { name: 'Totalmente conectado', accuracy: 0.941, auc: 0.977 },
    { name: 'CNN', accuracy: 0.96, auc: 0.988 },
  ];
  const metricLabel = metric === 'accuracy' ? 'Accuracy' : 'ROC-AUC';
  return (
    <section
      className="s03-science__results"
      aria-label="Resultados reportados por Shallue y Vanderburg"
    >
      <p className="s03-science__eyebrow">Test del estudio · 1 523 TCE · accuracy con umbral 0,5</p>
      <div className="s03-science__results-layout">
        <div className="s03-science__results-analysis">
          <div
            className="s03-science__toggle"
            role="group"
            aria-label="Elegir métrica para comparar"
          >
            <button
              type="button"
              aria-pressed={metric === 'accuracy'}
              onClick={() => setMetric('accuracy')}
            >
              Accuracy
            </button>
            <button type="button" aria-pressed={metric === 'auc'} onClick={() => setMetric('auc')}>
              ROC-AUC
            </button>
          </div>
          <div className="s03-results-chart" aria-live="polite">
            <h3>{metricLabel} · comparación de modelos</h3>
            <p>Escala completa de 0 a 1. Los tres modelos reciben las mismas dos vistas.</p>
            <div className="s03-results-chart__axis" aria-hidden="true">
              <span>0</span>
              <span>0,5</span>
              <span>1,0</span>
            </div>
            <ol>
              {models.map((model) => {
                const value = model[metric];
                return (
                  <li key={model.name}>
                    <span>{model.name}</span>
                    <span className="s03-results-chart__track" aria-hidden="true">
                      <span style={{ width: `${value * 100}%` }} />
                    </span>
                    <strong>{value.toFixed(3).replace('.', ',')}</strong>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="s03-science__table-scroll">
            <table>
              <caption>Valores publicados en el test del artículo.</caption>
              <thead>
                <tr>
                  <th scope="col">Modelo</th>
                  <th scope="col">Accuracy</th>
                  <th scope="col">ROC-AUC</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.name}>
                    <th scope="row">{model.name}</th>
                    <td>{model.accuracy.toFixed(3).replace('.', ',')}</td>
                    <td>{model.auc.toFixed(3).replace('.', ',')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <S03PaperFigure figureNumber={6} variant="wide" />
      </div>
      <p className="s03-science__source-note">
        La Figura 6 del artículo es precision–recall; ROC-AUC se reporta en el texto y en otra
        figura. Alterna las métricas para comparar el test; la búsqueda posterior es una población
        distinta.
      </p>
    </section>
  );
}

function PaperLimits() {
  const [selectedStage, setSelectedStage] = useState(0);
  const [selectedFigure, setSelectedFigure] = useState<8 | 10 | 11>(11);
  const stages = [
    {
      count: '513',
      label: 'eventos de cruce de umbral',
      detail:
        'La búsqueda abarcó 670 estrellas con sistemas múltiples y relajó el corte de señal/ruido. Cada evento cruzó el umbral de detección, pero todavía podía tener otra causa.',
    },
    {
      count: '30',
      label: 'puntaje superior a 0,5',
      detail:
        'El clasificador dejó 30 señales por encima de 0,5. Ese puntaje organiza la revisión: indica cuáles se parecen más a los ejemplos planetarios del entrenamiento.',
    },
    {
      count: '9',
      label: 'puntaje superior a 0,8',
      detail:
        'Al elevar el corte a 0,8 quedaron nueve señales para un examen más cuidadoso. El valor alto sigue siendo una predicción del modelo, no una confirmación astronómica.',
    },
    {
      count: '4',
      label: 'puntaje superior a 0,9',
      detail:
        'Cuatro señales superaron 0,9. Los autores buscaron para ellas fuentes vecinas y explicaciones instrumentales o astrofísicas antes de calcular si podían validarse como planetas.',
    },
  ];
  return (
    <section
      className="s03-science__limits"
      aria-label="Del puntaje del clasificador a la validación astronómica"
    >
      <div className="s03-science__limits-layout">
        <div className="s03-science__limits-analysis">
          <p className="s03-science__eyebrow">
            Del ranking a los planetas · cada corte reduce la lista
          </p>
          <ol className="s03-followup-steps" aria-label="Resultados de priorización">
            {stages.map((stage, index) => (
              <li key={stage.count}>
                <button
                  type="button"
                  aria-pressed={selectedStage === index}
                  onClick={() => setSelectedStage(index)}
                >
                  <strong>{stage.count}</strong>
                  <span>{stage.label}</span>
                </button>
                {index < stages.length - 1 && (
                  <span className="s03-followup-steps__arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="s03-science__stage-detail" aria-live="polite">
            {stages[selectedStage]!.detail}
          </p>
          <section className="s03-validation-story" aria-labelledby="s03-validation-story-title">
            <h3 id="s03-validation-story-title">
              La revisión separó las señales de sus imitadores
            </h3>
            <p>
              Para las cuatro señales mayores que 0,9, revisaron píxeles y centroides, eclipses
              secundarios, tránsitos pares/impares y estabilidad temporal. En Kepler-534 no pudieron
              descartar una compañera como origen; en Kepler-647, la profundidad parecía cambiar.
            </p>
            <p>
              Kepler-80 y Kepler-90 pasaron las pruebas. La probabilidad de falso positivo fue 0,2 %
              y 0,5 %; al contar sus otros planetas, ambas quedaron por debajo de 0,01 %. Así
              validaron Kepler-80 g y Kepler-90 i.
            </p>
            <div className="s03-validation-results" aria-label="Los dos planetas validados">
              <article>
                <strong>Kepler-80 g</strong>
                <span>Completa una cadena resonante de cinco planetas.</span>
              </article>
              <article>
                <strong>Kepler-90 i</strong>
                <span>Octavo planeta conocido del sistema.</span>
              </article>
            </div>
          </section>
          <p className="s03-ml-transfer">
            <strong>Regla de ML:</strong> el puntaje ordena la revisión; evidencia independiente
            decide.
          </p>
        </div>
        <div className="s03-science__limits-figures">
          <div className="s03-science__toggle" role="group" aria-label="Elegir figura del artículo">
            {([11, 8, 10] as const).map((figure) => (
              <button
                key={figure}
                type="button"
                aria-pressed={selectedFigure === figure}
                onClick={() => setSelectedFigure(figure)}
              >
                Figura {figure}
              </button>
            ))}
          </div>
          <S03PaperFigure
            figureNumber={selectedFigure}
            variant={selectedFigure === 8 ? 'portrait' : 'wide'}
            surface="white"
          />
        </div>
      </div>
    </section>
  );
}

const sceneComponents: Record<string, (props: SceneProps) => ReactElement | null> = {
  'mission-history': () => <MissionHistory />,
  'pixels-aperture-flux': () => <PixelsApertureFlux />,
  'kepler10-observation': () => <ObservedKepler10 />,
  variability: (props) => <Lookalikes {...props} />,
  'eclipsing-blend': (props) => <Lookalikes {...props} />,
  'artifact-aperture': (props) => <Lookalikes {...props} />,
  'classification-task': () => <ClassificationTask />,
  'binary-input-output': () => <BinaryInputOutput />,
  'classification-vocabulary': () => <ClassificationVocabulary />,
  preparation: () => <Preparation />,
  'folded-views': () => <FoldedViews />,
  'cnn-score': () => <CnnScore />,
  'paper-results': () => <PaperResults />,
  'paper-limits': () => <PaperLimits />,
};

export function S03ScienceScenes({ sceneId }: SceneProps) {
  const Scene = sceneComponents[sceneId];
  return Scene ? <Scene sceneId={sceneId} /> : null;
}

export default S03ScienceScenes;
