import { useEffect, useMemo, useState } from 'react';

import {
  defineCourseConfig,
  type CourseConfig,
  type CourseDisplayMode,
} from '../../lib/course-config';
import {
  getS00Part,
  getS00Parts,
  getS00SlideHash,
  getS00SlideIndex,
  getS00SlideIndexFromHash,
  getS00FlashcardCollection,
  getS00SlideNumber,
  s00Bibliography,
  s00BibliographyReferences,
  s00Branches,
  s00ClosureSteps,
  s00ConceptCards,
  s00Concepts,
  s00DataCards,
  s00FormulationStages,
  s00Glossary,
  s00ImpactCases,
  s00MLVerbs,
  s00MeasurementModalities,
  s00PlanetaryPillars,
  s00Slides,
  s00Units,
  s00VisualAssets,
  type S00Branch,
  type S00ImpactCase,
  type S00Part,
  type S00Slide,
  type S00Unit,
} from '../../lib/s00-content';
import {
  CautionBox,
  SessionBibliography,
  TeacherPrompt,
  referenceAuthor,
  referenceHref,
  referenceMeta,
} from './CourseContent';
import { ConceptTerm } from './ConceptTerm';
import SlideRail from './SlideRail';
import './course-content.css';
import './s00-learning-journey.css';

const activityItems = [
  {
    id: 'question',
    label: 'Acoté una curiosidad de exoplanetas con unidad, dato, salida y uso.',
    hint: 'Empieza por una frase amplia y subraya qué tendría que medir un instrumento.',
  },
  {
    id: 'measurement',
    label: 'Distinguí un observable de la propiedad física que quiero inferir.',
    hint: 'Usa dos verbos: registrar para la medición e inferir para el parámetro.',
  },
  {
    id: 'representation',
    label: 'Elegí una representación y nombré el riesgo dominante del dato.',
    hint: 'Una curva, un espectro, una imagen y un catálogo conservan estructuras distintas.',
  },
  {
    id: 'task',
    label: 'Elegí un verbo de ML y escribí la salida que debería devolver.',
    hint: 'Detectar, clasificar, estimar, describir y priorizar no producen el mismo objeto.',
  },
  {
    id: 'limit',
    label: 'Añadí una evaluación y un límite a una afirmación del modelo.',
    hint: 'Pregunta qué conjunto produjo la cifra, qué compara y qué queda fuera.',
  },
] as const;

type ActivityState = Record<(typeof activityItems)[number]['id'], boolean>;

function emptyActivityState(): ActivityState {
  return {
    question: false,
    measurement: false,
    representation: false,
    task: false,
    limit: false,
  };
}

function assetUrl(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}

function ConceptStrip({ unit }: { unit: S00Unit }) {
  const concepts = s00Concepts.filter((concept) => unit.conceptIds.includes(concept.id));
  if (concepts.length === 0) return null;
  return (
    <div className="s00-focus__concepts" aria-label={'Conceptos de ' + unit.title}>
      {concepts.map((concept) => (
        <ConceptTerm key={concept.id} concept={concept} />
      ))}
    </div>
  );
}

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  title: string;
  caption: string;
  badge: string;
}

function ImageLightbox({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  caption,
  badge,
}: ImageLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="s00-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Ampliación de imagen: ${title}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="s00-lightbox-container">
        <div className="s00-lightbox-header">
          <div className="s00-lightbox-title-group">
            <span className="s00-lightbox-badge">{badge}</span>
            <h3 className="s00-lightbox-title">{title}</h3>
          </div>
          <div className="s00-lightbox-actions">
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="s00-lightbox-btn s00-lightbox-btn--open"
              title="Abrir imagen completa en nueva pestaña"
            >
              <span>Abrir archivo</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              className="s00-lightbox-btn s00-lightbox-btn--close"
              onClick={onClose}
              aria-label="Cerrar ampliación"
              autoFocus
            >
              <span aria-hidden="true">✕</span>
              <span>Cerrar</span>
            </button>
          </div>
        </div>

        <div className="s00-lightbox-image-wrapper">
          <img src={imageSrc} alt={imageAlt} className="s00-lightbox-image" />
        </div>

        <div className="s00-lightbox-footer">
          <p className="s00-lightbox-caption">{caption}</p>
          <span className="s00-lightbox-hint">Pulsa Esc o haz clic fuera para cerrar</span>
        </div>
      </div>
    </div>
  );
}

function CuriosityScopeDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de acotación: del cosmos abierto al observable de tránsito"
    >
      <defs>
        <linearGradient id="curiosity-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <radialGradient id="curiosity-planet-grad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <marker id="arrow-cyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#38bdf8" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="140"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <circle cx="35" cy="35" r="3" fill="#94a3b8" opacity="0.6" />
        <circle cx="70" cy="25" r="4" fill="#38bdf8" opacity="0.8" />
        <circle cx="110" cy="40" r="2.5" fill="#e2e8f0" opacity="0.5" />
        <circle cx="45" cy="70" r="3.5" fill="#f59e0b" opacity="0.7" />
        <circle cx="95" cy="65" r="4" fill="#94a3b8" opacity="0.7" />
        <text x="70" y="88" fill="#94a3b8" fontSize="10" fontWeight="600" textAnchor="middle">
          Universo de objetos
        </text>
      </g>

      <path
        d="M158,65 L200,65"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeDasharray="3 3"
        markerEnd="url(#arrow-cyan)"
      />
      <text x="180" y="52" fill="#38bdf8" fontSize="9" textAnchor="middle">
        Foco físico
      </text>

      <g transform="translate(210, 15)">
        <rect
          width="170"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <circle cx="70" cy="50" r="24" fill="url(#curiosity-star-grad)" opacity="0.9" />
        <circle
          cx="78"
          cy="50"
          r="7"
          fill="url(#curiosity-planet-grad)"
          stroke="#090d16"
          strokeWidth="1.5"
        />
        <line
          x1="10"
          y1="50"
          x2="160"
          y2="50"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.4"
        />
        <text x="125" y="44" fill="#e2e8f0" fontSize="9" fontWeight="600">
          Rp / R★
        </text>
        <text x="85" y="88" fill="#cbd5e1" fontSize="10" fontWeight="600" textAnchor="middle">
          Alineación visual
        </text>
      </g>

      <path d="M388,65 L430,65" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
      <text x="410" y="52" fill="#38bdf8" fontSize="9" textAnchor="middle">
        Observable
      </text>

      <g transform="translate(438, 15)">
        <rect
          width="132"
          height="100"
          rx="8"
          fill="rgba(8, 47, 73, 0.5)"
          stroke="#0284c7"
          strokeWidth="1.5"
        />
        <text
          x="66"
          y="38"
          fill="#38bdf8"
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="monospace"
        >
          ΔF/F★ ≈ (Rp/R★)²
        </text>
        <path
          d="M20,62 L45,62 Q55,62 60,74 Q66,74 72,62 L112,62"
          stroke="#38bdf8"
          strokeWidth="2"
          fill="none"
        />
        <text x="66" y="88" fill="#bae6fd" fontSize="10" fontWeight="600" textAnchor="middle">
          Caída de brillo ~0.01%
        </text>
      </g>
    </svg>
  );
}

function UnitDiscretizationDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de discretización de unidad: de serie continua a vector de entrenamiento"
    >
      <defs>
        <marker id="arrow-amber" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#f59e0b" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="150"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <path
          d="M15,48 L30,45 L45,52 L60,47 L75,54 L90,46 L105,53 L120,49 L135,51"
          stroke="#94a3b8"
          strokeWidth="1.5"
          fill="none"
        />
        <text x="75" y="74" fill="#94a3b8" fontSize="9" textAnchor="middle">
          Curva de 4 años
        </text>
        <text x="75" y="88" fill="#cbd5e1" fontSize="10" fontWeight="600" textAnchor="middle">
          ~70,000 cadencias
        </text>
      </g>

      <path d="M168,65 L210,65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />
      <text x="190" y="48" fill="#f59e0b" fontSize="9" textAnchor="middle">
        Doblar en fase
      </text>
      <text x="190" y="59" fill="#f59e0b" fontSize="8" textAnchor="middle">
        t mod P
      </text>

      <g transform="translate(220, 15)">
        <rect
          width="160"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <circle cx="35" cy="40" r="2" fill="#fde047" opacity="0.6" />
        <circle cx="50" cy="42" r="2" fill="#fde047" opacity="0.6" />
        <circle cx="65" cy="55" r="2" fill="#f59e0b" />
        <circle cx="80" cy="62" r="2.5" fill="#f59e0b" />
        <circle cx="95" cy="54" r="2" fill="#f59e0b" />
        <circle cx="110" cy="41" r="2" fill="#fde047" opacity="0.6" />
        <circle cx="125" cy="39" r="2" fill="#fde047" opacity="0.6" />
        <path
          d="M25,41 Q60,41 70,58 Q80,64 90,58 Q100,41 135,41"
          stroke="#f59e0b"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
        <text x="80" y="88" fill="#fde68a" fontSize="10" fontWeight="600" textAnchor="middle">
          Tránsito centrado
        </text>
      </g>

      <path d="M388,65 L428,65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />
      <text x="408" y="52" fill="#f59e0b" fontSize="9" textAnchor="middle">
        Muestreo
      </text>

      <g transform="translate(436, 15)">
        <rect
          width="134"
          height="100"
          rx="8"
          fill="rgba(69, 26, 3, 0.4)"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        <text
          x="67"
          y="36"
          fill="#fbbf24"
          fontSize="12"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="monospace"
        >
          x_i ∈ ℝ²⁰¹
        </text>
        <g transform="translate(18, 48)">
          {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
            <rect
              key={i}
              x={x}
              y={i >= 3 && i <= 6 ? 6 : 0}
              width="7"
              height={i >= 3 && i <= 6 ? 14 : 20}
              rx="1.5"
              fill={i >= 3 && i <= 6 ? '#f59e0b' : '#78350f'}
            />
          ))}
        </g>
        <text x="67" y="88" fill="#fef3c7" fontSize="10" fontWeight="600" textAnchor="middle">
          1 instancia = 1 fila
        </text>
      </g>
    </svg>
  );
}

function OutputDistributionDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de salida computable: score de clasificación o posterior de parámetros"
    >
      <defs>
        <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <marker id="arrow-purple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#a855f7" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="130"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <rect x="25" y="32" width="80" height="26" rx="4" fill="#1e293b" stroke="#334155" />
        <text x="65" y="49" fill="#94a3b8" fontSize="11" fontFamily="monospace" textAnchor="middle">
          x_i (TCE)
        </text>
        <text x="65" y="88" fill="#cbd5e1" fontSize="10" fontWeight="600" textAnchor="middle">
          Observable estructurado
        </text>
      </g>

      <path d="M148,65 L190,65" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" />
      <text x="170" y="52" fill="#a855f7" fontSize="9" textAnchor="middle">
        f_θ(x)
      </text>

      <g transform="translate(200, 15)">
        <rect
          width="180"
          height="100"
          rx="8"
          fill="rgba(88, 28, 135, 0.3)"
          stroke="#7e22ce"
          strokeWidth="1.5"
        />
        <text x="90" y="34" fill="#c084fc" fontSize="11" fontWeight="700" textAnchor="middle">
          Score: P(Planeta | x)
        </text>
        <rect
          x="20"
          y="44"
          width="140"
          height="18"
          rx="4"
          fill="#0f172a"
          stroke="#475569"
          strokeWidth="1"
        />
        <rect x="22" y="46" width="130" height="14" rx="3" fill="url(#score-grad)" />
        <text x="90" y="57" fill="#090d16" fontSize="10" fontWeight="800" textAnchor="middle">
          ŷ = 0.942 (94.2%)
        </text>
        <text x="90" y="88" fill="#e9d5ff" fontSize="10" fontWeight="600" textAnchor="middle">
          Probabilidad calibrada
        </text>
      </g>

      <path d="M388,65 L428,65" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-purple)" />
      <text x="408" y="52" fill="#a855f7" fontSize="9" textAnchor="middle">
        o Posterior
      </text>

      <g transform="translate(436, 15)">
        <rect
          width="134"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#a855f7"
          strokeWidth="1"
        />
        <path
          d="M15,62 Q50,62 67,35 Q84,62 119,62"
          stroke="#c084fc"
          strokeWidth="2"
          fill="rgba(192, 132, 252, 0.15)"
        />
        <circle cx="67" cy="35" r="3" fill="#38bdf8" />
        <text x="67" y="74" fill="#f8fafc" fontSize="9" fontFamily="monospace" textAnchor="middle">
          θ̂ ± σ_θ
        </text>
        <text x="67" y="88" fill="#e9d5ff" fontSize="10" fontWeight="600" textAnchor="middle">
          Incertidumbre real
        </text>
      </g>
    </svg>
  );
}

function UsageFunnelDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de criterio de uso: embudo de priorización para telescopios"
    >
      <defs>
        <marker id="arrow-emerald" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#10b981" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="120"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <text
          x="60"
          y="38"
          fill="#94a3b8"
          fontSize="14"
          fontWeight="800"
          textAnchor="middle"
          fontFamily="monospace"
        >
          ~100,000
        </text>
        <text x="60" y="55" fill="#64748b" fontSize="9" textAnchor="middle">
          Eventos crudos
        </text>
        <text x="60" y="88" fill="#cbd5e1" fontSize="10" fontWeight="600" textAnchor="middle">
          Catálogo Kepler/TESS
        </text>
      </g>

      <path d="M138,65 L180,65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-emerald)" />
      <text x="160" y="48" fill="#10b981" fontSize="9" textAnchor="middle">
        Filtro ML
      </text>
      <text x="160" y="58" fill="#10b981" fontSize="8" textAnchor="middle">
        Score &gt; 0.85
      </text>

      <g transform="translate(190, 15)">
        <rect
          width="120"
          height="100"
          rx="8"
          fill="rgba(6, 78, 59, 0.4)"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text
          x="60"
          y="38"
          fill="#34d399"
          fontSize="14"
          fontWeight="800"
          textAnchor="middle"
          fontFamily="monospace"
        >
          ~2,400
        </text>
        <text x="60" y="55" fill="#a7f3d0" fontSize="9" textAnchor="middle">
          Candidatos fiables
        </text>
        <text x="60" y="88" fill="#6ee7b7" fontSize="10" fontWeight="600" textAnchor="middle">
          -97% falsos positivos
        </text>
      </g>

      <path d="M318,65 L360,65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-emerald)" />
      <text x="340" y="48" fill="#10b981" fontSize="9" textAnchor="middle">
        Priorización
      </text>
      <text x="340" y="58" fill="#10b981" fontSize="8" textAnchor="middle">
        Magnitud
      </text>

      <g transform="translate(370, 15)">
        <rect
          width="200"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.8)"
          stroke="#10b981"
          strokeWidth="1.5"
        />
        <g transform="translate(15, 24)">
          <circle cx="16" cy="16" r="14" fill="#065f46" />
          <text x="16" y="21" fill="#34d399" fontSize="13" textAnchor="middle">
            🔭
          </text>
          <text x="40" y="14" fill="#f8fafc" fontSize="11" fontWeight="700">
            HARPS / ESPRESSO / JWST
          </text>
          <text x="40" y="28" fill="#a7f3d0" fontSize="10">
            25 noches asignadas
          </text>
        </g>
        <text x="100" y="88" fill="#6ee7b7" fontSize="10" fontWeight="600" textAnchor="middle">
          Retorno optimizado
        </text>
      </g>
    </svg>
  );
}

function TransitLightCurveDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de tránsito planetario: geometría de eclipse y curva de luz con contactos t1 a t4"
    >
      <defs>
        <linearGradient id="transit-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <radialGradient id="transit-planet-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
        <marker
          id="arrow-teal-transit"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M1,1 L7,4 L1,7 Z" fill="#2dd4bf" />
        </marker>
        <marker
          id="arrow-cyan-transit"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M1,1 L7,4 L1,7 Z" fill="#38bdf8" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="180"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <circle cx="90" cy="50" r="32" fill="url(#transit-star-grad)" opacity="0.95" />
        <circle cx="90" cy="50" r="32" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <line
          x1="25"
          y1="50"
          x2="155"
          y2="50"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <circle
          cx="76"
          cy="50"
          r="8"
          fill="url(#transit-planet-grad)"
          stroke="#090d16"
          strokeWidth="1.5"
        />
        <path
          d="M62,36 L88,36"
          stroke="#38bdf8"
          strokeWidth="1.5"
          markerEnd="url(#arrow-cyan-transit)"
        />
        <text x="75" y="32" fill="#38bdf8" fontSize="8" fontWeight="600" textAnchor="middle">
          v_orb
        </text>
        <text x="138" y="44" fill="#cbd5e1" fontSize="9" fontWeight="600">
          R★
        </text>
        <text x="66" y="66" fill="#7dd3fc" fontSize="8" fontWeight="600">
          Rp
        </text>
        <text x="90" y="93" fill="#94a3b8" fontSize="9" fontWeight="600" textAnchor="middle">
          Geometría de alineación visual
        </text>
      </g>

      <path
        d="M198,65 L232,65"
        stroke="#2dd4bf"
        strokeWidth="2"
        markerEnd="url(#arrow-teal-transit)"
      />
      <text x="215" y="52" fill="#2dd4bf" fontSize="8" fontWeight="600" textAnchor="middle">
        ΔF / F★
      </text>
      <text x="215" y="78" fill="#5eead4" fontSize="8" fontFamily="monospace" textAnchor="middle">
        (Rp/R★)²
      </text>

      <g transform="translate(240, 15)">
        <rect
          width="330"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#2dd4bf"
          strokeWidth="1.5"
        />
        <line x1="30" y1="20" x2="30" y2="82" stroke="#475569" strokeWidth="1" />
        <line x1="30" y1="82" x2="315" y2="82" stroke="#475569" strokeWidth="1" />
        <text x="14" y="28" fill="#94a3b8" fontSize="8" fontFamily="monospace">
          1.0
        </text>
        <text x="10" y="62" fill="#2dd4bf" fontSize="8" fontFamily="monospace">
          1-δ
        </text>
        <text x="310" y="93" fill="#94a3b8" fontSize="8">
          Tiempo
        </text>

        <line
          x1="30"
          y1="25"
          x2="315"
          y2="25"
          stroke="#334155"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        <path
          d="M35,25 L85,25 L110,60 L200,60 L225,25 L310,25"
          stroke="#2dd4bf"
          strokeWidth="2"
          fill="none"
        />
        <polygon points="85,25 110,60 200,60 225,25" fill="rgba(45, 212, 191, 0.12)" />

        <circle cx="85" cy="25" r="2.5" fill="#2dd4bf" />
        <text x="85" y="18" fill="#5eead4" fontSize="8" textAnchor="middle">
          t₁
        </text>
        <circle cx="110" cy="60" r="2.5" fill="#2dd4bf" />
        <text x="110" y="72" fill="#5eead4" fontSize="8" textAnchor="middle">
          t₂
        </text>
        <circle cx="200" cy="60" r="2.5" fill="#2dd4bf" />
        <text x="200" y="72" fill="#5eead4" fontSize="8" textAnchor="middle">
          t₃
        </text>
        <circle cx="225" cy="25" r="2.5" fill="#2dd4bf" />
        <text x="225" y="18" fill="#5eead4" fontSize="8" textAnchor="middle">
          t₄
        </text>

        <line
          x1="155"
          y1="25"
          x2="155"
          y2="60"
          stroke="#fde047"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <text x="162" y="45" fill="#fde047" fontSize="9" fontWeight="700">
          δ = (Rp/R★)²
        </text>

        <line x1="85" y1="78" x2="225" y2="78" stroke="#94a3b8" strokeWidth="1" />
        <text x="155" y="93" fill="#cbd5e1" fontSize="8" fontWeight="600" textAnchor="middle">
          Duración del tránsito T₁₄
        </text>
      </g>
    </svg>
  );
}

function RadialVelocityCurveDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de velocidad radial: órbita reflejo alrededor del baricentro y curva senoidal Doppler"
    >
      <defs>
        <radialGradient id="rv-star-grad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <marker id="arrow-rv" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#38bdf8" />
        </marker>
        <marker id="arrow-red-rv" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1,1 L7,4 L1,7 Z" fill="#f87171" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="180"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <circle cx="85" cy="50" r="2.5" fill="#f59e0b" />
        <line x1="82" y1="50" x2="88" y2="50" stroke="#f59e0b" strokeWidth="1" />
        <line x1="85" y1="47" x2="85" y2="53" stroke="#f59e0b" strokeWidth="1" />
        <text x="85" y="42" fill="#fbbf24" fontSize="7" fontWeight="600" textAnchor="middle">
          Baricentro
        </text>

        <ellipse
          cx="85"
          cy="50"
          rx="16"
          ry="14"
          fill="none"
          stroke="#64748b"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <circle cx="75" cy="40" r="10" fill="url(#rv-star-grad)" />
        <path d="M72,32 L60,26" stroke="#f87171" strokeWidth="1.5" markerEnd="url(#arrow-red-rv)" />
        <text x="56" y="22" fill="#fca5a5" fontSize="7" fontWeight="600">
          v★
        </text>

        <ellipse
          cx="85"
          cy="50"
          rx="60"
          ry="32"
          fill="none"
          stroke="#334155"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle cx="135" cy="62" r="5" fill="#38bdf8" />
        <text x="145" y="65" fill="#7dd3fc" fontSize="8" fontWeight="600">
          Mp
        </text>

        <line
          x1="10"
          y1="86"
          x2="60"
          y2="86"
          stroke="#94a3b8"
          strokeWidth="1"
          markerEnd="url(#arrow-rv)"
        />
        <text x="35" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">
          Línea de visión (i)
        </text>
      </g>

      <path d="M198,65 L232,65" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-rv)" />
      <text x="215" y="52" fill="#38bdf8" fontSize="8" fontWeight="600" textAnchor="middle">
        Doppler
      </text>
      <text x="215" y="78" fill="#7dd3fc" fontSize="8" fontFamily="monospace" textAnchor="middle">
        Δλ/λ = v_r/c
      </text>

      <g transform="translate(240, 15)">
        <rect
          width="330"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <line x1="30" y1="15" x2="30" y2="85" stroke="#475569" strokeWidth="1" />
        <line
          x1="30"
          y1="50"
          x2="315"
          y2="50"
          stroke="#64748b"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text x="12" y="24" fill="#f87171" fontSize="8" fontFamily="monospace">
          +K
        </text>
        <text x="16" y="53" fill="#94a3b8" fontSize="8" fontFamily="monospace">
          0
        </text>
        <text x="12" y="82" fill="#60a5fa" fontSize="8" fontFamily="monospace">
          -K
        </text>
        <text x="310" y="60" fill="#94a3b8" fontSize="8">
          Fase
        </text>

        <path
          d="M30,50 Q65,15 100,50 Q135,85 170,50 Q205,15 240,50 Q275,85 310,50"
          stroke="#38bdf8"
          strokeWidth="2.5"
          fill="none"
        />

        <rect
          x="75"
          y="20"
          width="50"
          height="15"
          rx="3"
          fill="rgba(239, 68, 68, 0.15)"
          stroke="#ef4444"
          strokeWidth="0.8"
        />
        <text x="100" y="31" fill="#fca5a5" fontSize="7" fontWeight="600" textAnchor="middle">
          Corrimiento al rojo
        </text>

        <rect
          x="145"
          y="68"
          width="50"
          height="15"
          rx="3"
          fill="rgba(59, 130, 246, 0.15)"
          stroke="#3b82f6"
          strokeWidth="0.8"
        />
        <text x="170" y="79" fill="#93c5fd" fontSize="7" fontWeight="600" textAnchor="middle">
          Corrimiento al azul
        </text>

        <line x1="240" y1="20" x2="240" y2="50" stroke="#fde047" strokeWidth="1.5" />
        <line x1="236" y1="20" x2="244" y2="20" stroke="#fde047" strokeWidth="1.5" />
        <text x="250" y="38" fill="#fde047" fontSize="9" fontWeight="700">
          K ∝ Mp sin i
        </text>

        <line x1="100" y1="88" x2="240" y2="88" stroke="#94a3b8" strokeWidth="1" />
        <line x1="100" y1="85" x2="100" y2="91" stroke="#94a3b8" strokeWidth="1" />
        <line x1="240" y1="85" x2="240" y2="91" stroke="#94a3b8" strokeWidth="1" />
        <text x="170" y="96" fill="#cbd5e1" fontSize="8" fontWeight="600" textAnchor="middle">
          Periodo orbital P
        </text>
      </g>
    </svg>
  );
}

function TransmissionSpectrumDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de espectroscopía de transmisión: filtrado atmosférico y bandas moleculares de H2O y CO2"
    >
      <defs>
        <radialGradient id="spec-planet-core" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#090d16" />
        </radialGradient>
        <linearGradient id="spec-atm-annulus" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
        </linearGradient>
        <marker
          id="arrow-violet-spec"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M1,1 L7,4 L1,7 Z" fill="#a855f7" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="180"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        {[28, 38, 48, 58, 68, 78].map((y, i) => (
          <line
            key={i}
            x1="18"
            y1={y}
            x2="55"
            y2={y}
            stroke="#fde047"
            strokeWidth="1.2"
            opacity="0.75"
          />
        ))}

        <circle
          cx="85"
          cy="53"
          r="28"
          fill="url(#spec-atm-annulus)"
          stroke="#a855f7"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <circle
          cx="85"
          cy="53"
          r="18"
          fill="url(#spec-planet-core)"
          stroke="#334155"
          strokeWidth="1.5"
        />

        <line x1="85" y1="25" x2="85" y2="35" stroke="#c084fc" strokeWidth="1.5" />
        <text x="92" y="32" fill="#e9d5ff" fontSize="8" fontWeight="700">
          h(λ)
        </text>

        <line
          x1="113"
          y1="33"
          x2="165"
          y2="33"
          stroke="#a855f7"
          strokeWidth="1.5"
          markerEnd="url(#arrow-violet-spec)"
        />
        <line
          x1="113"
          y1="73"
          x2="165"
          y2="73"
          stroke="#a855f7"
          strokeWidth="1.5"
          markerEnd="url(#arrow-violet-spec)"
        />

        <text x="95" y="93" fill="#cbd5e1" fontSize="8" fontWeight="600" textAnchor="middle">
          Opacidad atmosférica h ∝ T / (μ·g)
        </text>
      </g>

      <path
        d="M198,65 L232,65"
        stroke="#a855f7"
        strokeWidth="2"
        markerEnd="url(#arrow-violet-spec)"
      />
      <text x="215" y="52" fill="#c084fc" fontSize="8" fontWeight="600" textAnchor="middle">
        Dispersión
      </text>
      <text x="215" y="78" fill="#e9d5ff" fontSize="8" fontFamily="monospace" textAnchor="middle">
        F(λ)
      </text>

      <g transform="translate(240, 15)">
        <rect
          width="330"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#a855f7"
          strokeWidth="1.5"
        />
        <line x1="32" y1="18" x2="32" y2="82" stroke="#475569" strokeWidth="1" />
        <line x1="32" y1="82" x2="315" y2="82" stroke="#475569" strokeWidth="1" />
        <text x="8" y="24" fill="#a855f7" fontSize="7" fontFamily="monospace">
          (Rp/R★)²
        </text>
        <text x="14" y="75" fill="#64748b" fontSize="7" fontFamily="monospace">
          ppm
        </text>
        <text x="310" y="93" fill="#94a3b8" fontSize="8">
          λ (μm)
        </text>

        <text x="70" y="91" fill="#64748b" fontSize="7" textAnchor="middle">
          1.1
        </text>
        <text x="120" y="91" fill="#64748b" fontSize="7" textAnchor="middle">
          1.4
        </text>
        <text x="175" y="91" fill="#64748b" fontSize="7" textAnchor="middle">
          2.0
        </text>
        <text x="250" y="91" fill="#64748b" fontSize="7" textAnchor="middle">
          4.3
        </text>

        <line
          x1="32"
          y1="68"
          x2="315"
          y2="68"
          stroke="#334155"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text x="270" y="65" fill="#64748b" fontSize="7">
          Continuo / nubes
        </text>

        <path
          d="M35,66 Q55,65 70,62 Q95,62 105,50 Q118,34 125,35 Q135,42 150,58 Q165,52 178,38 Q188,44 205,62 Q225,62 238,48 Q248,22 254,22 Q262,28 275,60 L310,64"
          stroke="#c084fc"
          strokeWidth="2"
          fill="none"
        />

        <rect
          x="106"
          y="18"
          width="36"
          height="14"
          rx="3"
          fill="rgba(192, 132, 252, 0.2)"
          stroke="#a855f7"
          strokeWidth="0.8"
        />
        <text x="124" y="28" fill="#f3e8ff" fontSize="8" fontWeight="700" textAnchor="middle">
          H₂O
        </text>

        <text x="178" y="32" fill="#d8b4fe" fontSize="8" fontWeight="600" textAnchor="middle">
          H₂O
        </text>

        <rect
          x="236"
          y="8"
          width="36"
          height="14"
          rx="3"
          fill="rgba(234, 179, 8, 0.2)"
          stroke="#eab308"
          strokeWidth="0.8"
        />
        <text x="254" y="18" fill="#fef08a" fontSize="8" fontWeight="700" textAnchor="middle">
          CO₂
        </text>

        {[
          { x: 50, y: 64, err: 5 },
          { x: 80, y: 60, err: 6 },
          { x: 105, y: 48, err: 6 },
          { x: 124, y: 36, err: 5 },
          { x: 145, y: 55, err: 6 },
          { x: 178, y: 40, err: 6 },
          { x: 215, y: 60, err: 5 },
          { x: 254, y: 24, err: 4 },
          { x: 290, y: 62, err: 6 },
        ].map((pt, idx) => (
          <g key={idx}>
            <line
              x1={pt.x}
              y1={pt.y - pt.err}
              x2={pt.x}
              y2={pt.y + pt.err}
              stroke="#f8fafc"
              strokeWidth="1"
            />
            <line
              x1={pt.x - 2}
              y1={pt.y - pt.err}
              x2={pt.x + 2}
              y2={pt.y - pt.err}
              stroke="#f8fafc"
              strokeWidth="1"
            />
            <line
              x1={pt.x - 2}
              y1={pt.y + pt.err}
              x2={pt.x + 2}
              y2={pt.y + pt.err}
              stroke="#f8fafc"
              strokeWidth="1"
            />
            <circle cx={pt.x} cy={pt.y} r="2" fill="#38bdf8" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function DirectImagingCoronagraphDiagram() {
  return (
    <svg
      viewBox="0 0 580 130"
      className="s00-schematic-svg"
      role="img"
      aria-label="Diagrama de imagen directa: máscara coronográfica, ángulo de trabajo interno (IWA) y detección puntual"
    >
      <defs>
        <radialGradient id="coronagraph-mask" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="85%" stopColor="#090d16" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>
        <marker
          id="arrow-amber-img"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M1,1 L7,4 L1,7 Z" fill="#f59e0b" />
        </marker>
      </defs>

      <g transform="translate(10, 15)">
        <rect
          width="180"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <circle
          cx="90"
          cy="50"
          r="38"
          fill="none"
          stroke="#334155"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.4"
        />
        <circle
          cx="90"
          cy="50"
          r="28"
          fill="none"
          stroke="#475569"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <circle
          cx="90"
          cy="50"
          r="18"
          fill="url(#coronagraph-mask)"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <circle cx="90" cy="50" r="3" fill="#fde047" opacity="0.8" />

        <text x="90" y="42" fill="#fbbf24" fontSize="7" fontWeight="700" textAnchor="middle">
          IWA
        </text>
        <text x="90" y="52" fill="#94a3b8" fontSize="7" textAnchor="middle">
          ~2-3 λ/D
        </text>

        <text x="90" y="93" fill="#cbd5e1" fontSize="8" fontWeight="600" textAnchor="middle">
          Máscara focal + Óptica Adaptativa extrema
        </text>
      </g>

      <path
        d="M198,65 L232,65"
        stroke="#f59e0b"
        strokeWidth="2"
        markerEnd="url(#arrow-amber-img)"
      />
      <text x="215" y="52" fill="#fbbf24" fontSize="8" fontWeight="600" textAnchor="middle">
        Contraste
      </text>
      <text x="215" y="78" fill="#fde68a" fontSize="8" fontFamily="monospace" textAnchor="middle">
        10⁻⁴ a 10⁻⁸
      </text>

      <g transform="translate(240, 15)">
        <rect
          width="330"
          height="100"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <circle
          cx="90"
          cy="50"
          r="34"
          fill="rgba(2, 6, 23, 0.95)"
          stroke="#334155"
          strokeWidth="1"
        />
        <circle
          cx="90"
          cy="50"
          r="14"
          fill="#020617"
          stroke="#b45309"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <text x="90" y="53" fill="#64748b" fontSize="7" textAnchor="middle">
          Estrella atenuada
        </text>

        <ellipse
          cx="90"
          cy="50"
          rx="60"
          ry="38"
          fill="none"
          stroke="#475569"
          strokeWidth="0.8"
          strokeDasharray="1 3"
          opacity="0.5"
        />

        <g transform="translate(225, 48)">
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
          <line x1="-15" y1="0" x2="-8" y2="0" stroke="#f59e0b" strokeWidth="1" />
          <line x1="8" y1="0" x2="15" y2="0" stroke="#f59e0b" strokeWidth="1" />
          <line x1="0" y1="-15" x2="0" y2="-8" stroke="#f59e0b" strokeWidth="1" />
          <line x1="0" y1="8" x2="0" y2="15" stroke="#f59e0b" strokeWidth="1" />
          <circle cx="0" cy="0" r="3.5" fill="#fde047" />
        </g>
        <text x="225" y="28" fill="#fef08a" fontSize="8" fontWeight="700" textAnchor="middle">
          Compañero planetario
        </text>
        <text x="225" y="73" fill="#cbd5e1" fontSize="7" textAnchor="middle">
          Emisión térmica infrarroja directa
        </text>

        <line x1="90" y1="86" x2="225" y2="86" stroke="#94a3b8" strokeWidth="1" />
        <line x1="90" y1="83" x2="90" y2="89" stroke="#94a3b8" strokeWidth="1" />
        <line x1="225" y1="83" x2="225" y2="89" stroke="#94a3b8" strokeWidth="1" />
        <text x="157" y="95" fill="#cbd5e1" fontSize="8" fontWeight="600" textAnchor="middle">
          Separación angular proyectada: ~0.45″ (35 UA)
        </text>
      </g>
    </svg>
  );
}

function DataLandscapeSchematic({ cardId }: { cardId: string }) {
  if (cardId === 'observacion') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de serie temporal fotométrica cruda con variabilidad y gaps"
      >
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <line x1="40" y1="105" x2="540" y2="105" stroke="#475569" strokeWidth="1" />
        <line x1="40" y1="25" x2="40" y2="105" stroke="#475569" strokeWidth="1" />
        <text x="35" y="32" fill="#94a3b8" fontSize="9" textAnchor="end">
          Flujo F(t)
        </text>
        <text x="535" y="118" fill="#94a3b8" fontSize="9" textAnchor="end">
          Tiempo t (días)
        </text>
        <path
          d="M45,60 Q90,52 140,62 T240,58 T340,65 T440,58 T535,62"
          fill="none"
          stroke="#64748b"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <path
          d="M45,62 L70,60 L95,64 L120,61 L130,85 L138,92 L146,85 L155,63 L180,60 L205,65"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <rect
          x="210"
          y="35"
          width="45"
          height="70"
          fill="rgba(248, 113, 113, 0.1)"
          stroke="#f87171"
          strokeWidth="1"
          strokeDasharray="2 2"
          rx="4"
        />
        <text x="232" y="72" fill="#f87171" fontSize="8" textAnchor="middle">
          Gap orbital
        </text>
        <path
          d="M260,63 L285,61 L310,66 L335,62 L345,86 L353,93 L361,86 L370,64 L395,61 L420,65 L445,60 L470,64 L495,62 L520,63 L535,61"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
        />
        <circle
          cx="138"
          cy="92"
          r="14"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <text x="138" y="118" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="600">
          Tránsito 1 (ΔF ≈ 420 ppm)
        </text>
        <circle
          cx="353"
          cy="93"
          r="14"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <text x="353" y="118" fill="#f59e0b" fontSize="9" textAnchor="middle" fontWeight="600">
          Tránsito 2 (P = 14.45 d)
        </text>
      </svg>
    );
  }
  if (cardId === 'catalogo') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de tabla tabular agregada de candidatos"
      >
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <rect x="25" y="22" width="530" height="24" rx="4" fill="rgba(30, 41, 59, 0.9)" />
        <text x="45" y="38" fill="#94a3b8" fontSize="10" fontWeight="600">
          KIC ID
        </text>
        <text x="130" y="38" fill="#94a3b8" fontSize="10" fontWeight="600">
          Periodo P (d)
        </text>
        <text x="225" y="38" fill="#94a3b8" fontSize="10" fontWeight="600">
          Profundidad δ (ppm)
        </text>
        <text x="350" y="38" fill="#94a3b8" fontSize="10" fontWeight="600">
          MES (SNR)
        </text>
        <text x="460" y="38" fill="#94a3b8" fontSize="10" fontWeight="600">
          Disposición
        </text>
        <rect
          x="25"
          y="50"
          width="530"
          height="22"
          rx="3"
          fill="rgba(45, 212, 191, 0.08)"
          stroke="#2dd4bf"
          strokeWidth="1"
        />
        <text x="45" y="65" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
          11442793
        </text>
        <text x="130" y="65" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
          14.4491
        </text>
        <text x="225" y="65" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
          420 ± 35
        </text>
        <text x="350" y="65" fill="#2dd4bf" fontSize="9" fontWeight="700" fontFamily="monospace">
          8.4 σ &gt; 7.1σ
        </text>
        <text x="460" y="65" fill="#2dd4bf" fontSize="9" fontWeight="700">
          CANDIDATO
        </text>
        <rect x="25" y="75" width="530" height="22" rx="3" fill="rgba(248, 113, 113, 0.06)" />
        <text x="45" y="90" fill="#94a3b8" fontSize="9" fontFamily="monospace">
          08462852
        </text>
        <text x="130" y="90" fill="#94a3b8" fontSize="9" fontFamily="monospace">
          0.8321
        </text>
        <text x="225" y="90" fill="#94a3b8" fontSize="9" fontFamily="monospace">
          15400 ± 120
        </text>
        <text x="350" y="90" fill="#f87171" fontSize="9" fontWeight="700" fontFamily="monospace">
          124.0 σ (V-shape)
        </text>
        <text x="460" y="90" fill="#f87171" fontSize="9" fontWeight="700">
          BINARIA ECLIP.
        </text>
        <rect x="25" y="100" width="530" height="22" rx="3" fill="rgba(148, 163, 184, 0.04)" />
        <text x="45" y="115" fill="#64748b" fontSize="9" fontFamily="monospace">
          10264660
        </text>
        <text x="130" y="115" fill="#64748b" fontSize="9" fontFamily="monospace">
          32.1804
        </text>
        <text x="225" y="115" fill="#64748b" fontSize="9" fontFamily="monospace">
          120 ± 40
        </text>
        <text x="350" y="115" fill="#64748b" fontSize="9" fontFamily="monospace">
          5.2 σ &lt; 7.1σ
        </text>
        <text x="460" y="115" fill="#64748b" fontSize="9">
          DESCARTADO
        </text>
      </svg>
    );
  }
  if (cardId === 'simulacion') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de inyección sintética física Sim2Real"
      >
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <g transform="translate(20, 20)">
          <rect
            width="140"
            height="95"
            rx="6"
            fill="rgba(129, 140, 248, 0.1)"
            stroke="#818cf8"
            strokeWidth="1"
          />
          <text x="70" y="22" fill="#818cf8" fontSize="10" fontWeight="600" textAnchor="middle">
            Modelo Físico M(θ)
          </text>
          <path
            d="M20,48 L45,48 Q55,48 60,70 Q70,78 75,78 Q80,78 90,70 Q95,48 105,48 L120,48"
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
          />
          <text x="70" y="90" fill="#c7d2fe" fontSize="8" textAnchor="middle">
            Mandel &amp; Agol (Rp/R★, b)
          </text>
        </g>
        <text x="180" y="72" fill="#f59e0b" fontSize="20" fontWeight="700" textAnchor="middle">
          +
        </text>
        <g transform="translate(200, 20)">
          <rect
            width="140"
            height="95"
            rx="6"
            fill="rgba(56, 189, 248, 0.1)"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          <text x="70" y="22" fill="#38bdf8" fontSize="10" fontWeight="600" textAnchor="middle">
            Ruido Real Kepler
          </text>
          <path
            d="M15,55 L25,48 L35,58 L45,52 L55,61 L65,49 L75,56 L85,50 L95,62 L105,53 L115,58 L125,51"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <text x="70" y="90" fill="#bae6fd" fontSize="8" textAnchor="middle">
            Píxeles crudos sin señal
          </text>
        </g>
        <text x="360" y="72" fill="#f59e0b" fontSize="20" fontWeight="700" textAnchor="middle">
          =
        </text>
        <g transform="translate(380, 20)">
          <rect
            width="175"
            height="95"
            rx="6"
            fill="rgba(45, 212, 191, 0.12)"
            stroke="#2dd4bf"
            strokeWidth="1.5"
          />
          <text x="87" y="22" fill="#2dd4bf" fontSize="10" fontWeight="700" textAnchor="middle">
            Inyección Sim2Real
          </text>
          <path
            d="M15,48 L30,45 L45,51 L55,47 L65,65 L75,76 L85,73 L95,64 L105,49 L120,46 L135,52 L150,47 L160,49"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="1.5"
          />
          <text x="87" y="90" fill="#a7f3d0" fontSize="8" textAnchor="middle">
            Ground truth: θ conocido
          </text>
        </g>
      </svg>
    );
  }
  if (cardId === 'entrenamiento') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de dataset de entrenamiento multiescala"
      >
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <g transform="translate(25, 20)">
          <rect
            width="210"
            height="95"
            rx="6"
            fill="rgba(129, 140, 248, 0.08)"
            stroke="#818cf8"
            strokeWidth="1"
          />
          <text x="105" y="22" fill="#818cf8" fontSize="10" fontWeight="600" textAnchor="middle">
            Vista Global (201 bins)
          </text>
          <path
            d="M15,50 Q40,48 70,52 Q95,50 100,68 Q105,74 110,68 Q115,50 145,49 Q175,52 195,50"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.5"
          />
          <text x="105" y="88" fill="#94a3b8" fontSize="8" textAnchor="middle">
            Órbita completa: descarta variabilidad estelar
          </text>
        </g>
        <g transform="translate(250, 20)">
          <rect
            width="180"
            height="95"
            rx="6"
            fill="rgba(56, 189, 248, 0.08)"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          <text x="90" y="22" fill="#38bdf8" fontSize="10" fontWeight="600" textAnchor="middle">
            Vista Local (61 bins)
          </text>
          <path
            d="M15,42 L45,42 Q60,42 70,68 Q80,78 90,78 Q100,78 110,68 Q120,42 135,42 L165,42"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <text x="90" y="88" fill="#94a3b8" fontSize="8" textAnchor="middle">
            Tránsito zoom: simetría y fondo plano
          </text>
        </g>
        <g transform="translate(445, 20)">
          <rect
            width="110"
            height="95"
            rx="6"
            fill="rgba(245, 158, 11, 0.1)"
            stroke="#f59e0b"
            strokeWidth="1"
          />
          <text x="55" y="24" fill="#f59e0b" fontSize="10" fontWeight="600" textAnchor="middle">
            Etiqueta y
          </text>
          <text x="55" y="58" fill="#fde047" fontSize="18" fontWeight="700" textAnchor="middle">
            y ∈ &#123;0, 1&#125;
          </text>
          <text x="55" y="88" fill="#cbd5e1" fontSize="8" textAnchor="middle">
            Supervisión humana
          </text>
        </g>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 580 140"
      className="s00-schematic-svg"
      role="img"
      aria-label="Esquema de vector de salida, probabilidades y FPP"
    >
      <defs>
        <linearGradient id="out-grad-bar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="560"
        height="120"
        rx="8"
        fill="rgba(15, 23, 42, 0.7)"
        stroke="#1e293b"
        strokeWidth="1"
      />
      <g transform="translate(30, 22)">
        <text x="0" y="15" fill="#e2e8f0" fontSize="11" fontWeight="600">
          Score continuo de predicción: s = f_θ(x) ∈ [0.0, 1.0]
        </text>
        <rect x="0" y="30" width="500" height="20" rx="4" fill="#1e293b" />
        <rect x="0" y="30" width="440" height="20" rx="4" fill="url(#out-grad-bar)" />
        <line
          x1="250"
          y1="24"
          x2="250"
          y2="56"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <text x="250" y="70" fill="#f59e0b" fontSize="9" textAnchor="middle">
          Umbral de decisión (τ = 0.50)
        </text>
        <polygon points="440,22 434,12 446,12" fill="#2dd4bf" />
        <text x="440" y="8" fill="#2dd4bf" fontSize="10" fontWeight="700" textAnchor="middle">
          s = 0.88
        </text>
      </g>
      <g transform="translate(30, 95)">
        <rect
          x="0"
          y="0"
          width="500"
          height="24"
          rx="4"
          fill="rgba(45, 212, 191, 0.1)"
          stroke="#2dd4bf"
          strokeWidth="1"
        />
        <text x="15" y="16" fill="#2dd4bf" fontSize="10" fontWeight="600">
          FPP (Probabilidad de Falso Positivo): &lt; 1.0%
        </text>
        <text x="350" y="16" fill="#a7f3d0" fontSize="9">
          Estado: Candidato de alta prioridad para RV
        </text>
      </g>
    </svg>
  );
}

function MLVerbSchematic({ verbId }: { verbId: string }) {
  if (verbId === 'detectar') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de detección: cruce de umbral en serie temporal"
      >
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <line x1="40" y1="105" x2="540" y2="105" stroke="#475569" strokeWidth="1" />
        <line x1="40" y1="25" x2="40" y2="105" stroke="#475569" strokeWidth="1" />
        <text x="35" y="32" fill="#94a3b8" fontSize="9" textAnchor="end">
          Score s(t)
        </text>
        <text x="535" y="118" fill="#94a3b8" fontSize="9" textAnchor="end">
          Tiempo t
        </text>
        <line
          x1="40"
          y1="55"
          x2="540"
          y2="55"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x="530" y="50" fill="#f59e0b" fontSize="9" textAnchor="end" fontWeight="600">
          Umbral τ = 0.50
        </text>
        <path
          d="M45,95 L90,92 L130,96 L170,91 L210,94 L240,42 L255,30 L270,45 L290,93 L340,95 L390,91 L430,94 L470,90 L520,95"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
        />
        <circle
          cx="255"
          cy="30"
          r="16"
          fill="rgba(45, 212, 191, 0.2)"
          stroke="#2dd4bf"
          strokeWidth="1.5"
        />
        <polygon points="255,10 250,2 260,2" fill="#2dd4bf" />
        <text x="255" y="18" fill="#2dd4bf" fontSize="9" fontWeight="700" textAnchor="middle">
          s(t) = 0.94 &gt; τ
        </text>
        <text x="255" y="120" fill="#2dd4bf" fontSize="9" textAnchor="middle" fontWeight="600">
          Detección confirmada: Época t₀ = 1421.3 d
        </text>
      </svg>
    );
  }
  if (verbId === 'clasificar') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de clasificación: frontera de decisión multiclase"
      >
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <line x1="50" y1="110" x2="530" y2="110" stroke="#475569" strokeWidth="1" />
        <line x1="50" y1="20" x2="50" y2="110" stroke="#475569" strokeWidth="1" />
        <text x="525" y="122" fill="#94a3b8" fontSize="9" textAnchor="end">
          Profundidad de tránsito δ (ppm)
        </text>
        <text x="45" y="28" fill="#94a3b8" fontSize="9" textAnchor="end">
          Simetría / Duración τ
        </text>
        <path
          d="M120,110 Q220,80 310,50 T480,25"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <text x="380" y="38" fill="#818cf8" fontSize="9" fontWeight="600">
          Frontera f_θ(x) = 0
        </text>
        <circle cx="150" cy="85" r="4" fill="#2dd4bf" />
        <circle cx="180" cy="75" r="4" fill="#2dd4bf" />
        <circle cx="210" cy="90" r="4" fill="#2dd4bf" />
        <circle cx="250" cy="70" r="5" fill="#2dd4bf" stroke="#fff" strokeWidth="1" />
        <circle cx="290" cy="62" r="4" fill="#2dd4bf" />
        <text x="180" y="102" fill="#2dd4bf" fontSize="9" fontWeight="700">
          Clase 1: Candidatos reales
        </text>
        <circle cx="140" cy="35" r="4" fill="#f87171" />
        <circle cx="220" cy="30" r="4" fill="#f87171" />
        <circle cx="350" cy="75" r="4" fill="#f87171" />
        <circle cx="420" cy="65" r="4" fill="#f87171" />
        <circle cx="450" cy="85" r="4" fill="#f87171" />
        <text x="360" y="95" fill="#f87171" fontSize="9" fontWeight="700">
          Clase 0: Binarias / Ruido
        </text>
      </svg>
    );
  }
  if (verbId === 'estimar') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de estimación: distribución posterior e incertidumbre"
      >
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <line x1="50" y1="110" x2="530" y2="110" stroke="#475569" strokeWidth="1" />
        <text x="290" y="124" fill="#94a3b8" fontSize="9" textAnchor="middle">
          Parámetro físico θ (ej: abundancia log(H₂O))
        </text>
        <path
          d="M150,110 Q210,105 240,65 Q290,25 340,65 Q370,105 430,110 Z"
          fill="rgba(129, 140, 248, 0.15)"
        />
        <path d="M210,110 Q250,75 290,28 Q330,75 370,110 Z" fill="rgba(129, 140, 248, 0.3)" />
        <path
          d="M100,110 Q180,108 240,65 Q290,25 340,65 Q400,108 480,110"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
        />
        <line x1="290" y1="26" x2="290" y2="110" stroke="#f59e0b" strokeWidth="2" />
        <text x="290" y="20" fill="#f59e0b" fontSize="10" fontWeight="700" textAnchor="middle">
          Mediana θ̂ = -3.2
        </text>
        <text x="290" y="80" fill="#c7d2fe" fontSize="8" textAnchor="middle">
          Intervalo 68% [±1σ]
        </text>
        <text x="210" y="102" fill="#94a3b8" fontSize="8" textAnchor="middle">
          Intervalo 95% [±2σ]
        </text>
      </svg>
    );
  }
  if (verbId === 'describir') {
    return (
      <svg
        viewBox="0 0 580 140"
        className="s00-schematic-svg"
        role="img"
        aria-label="Esquema de descripción: espacio latente y agrupamiento"
      >
        <defs>
          <marker id="arrow-desc" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M1,1 L7,4 L1,7 Z" fill="#818cf8" />
          </marker>
        </defs>
        <rect
          x="10"
          y="10"
          width="560"
          height="120"
          rx="8"
          fill="rgba(15, 23, 42, 0.7)"
          stroke="#1e293b"
          strokeWidth="1"
        />
        <g transform="translate(25, 25)">
          <rect
            width="130"
            height="85"
            rx="6"
            fill="rgba(30, 41, 59, 0.8)"
            stroke="#475569"
            strokeWidth="1"
          />
          <text x="65" y="22" fill="#94a3b8" fontSize="9" fontWeight="600" textAnchor="middle">
            Espacio Original ℝ^d
          </text>
          <text x="65" y="45" fill="#cbd5e1" fontSize="8" textAnchor="middle">
            d = 70.000 cadencias
          </text>
          <text x="65" y="65" fill="#64748b" fontSize="8" textAnchor="middle">
            Alta dimensionalidad
          </text>
        </g>
        <path d="M165,68 L215,68" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow-desc)" />
        <text x="190" y="58" fill="#818cf8" fontSize="8" textAnchor="middle">
          Encoder z = e(x)
        </text>
        <g transform="translate(225, 20)">
          <rect
            width="325"
            height="95"
            rx="6"
            fill="rgba(15, 23, 42, 0.9)"
            stroke="#818cf8"
            strokeWidth="1"
          />
          <line x1="20" y1="80" x2="305" y2="80" stroke="#334155" strokeWidth="1" />
          <line x1="160" y1="15" x2="160" y2="85" stroke="#334155" strokeWidth="1" />
          <ellipse
            cx="80"
            cy="45"
            rx="35"
            ry="22"
            fill="rgba(56, 189, 248, 0.15)"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <circle cx="70" cy="42" r="3" fill="#38bdf8" />
          <circle cx="85" cy="48" r="3" fill="#38bdf8" />
          <circle cx="90" cy="38" r="3" fill="#38bdf8" />
          <text x="80" y="74" fill="#38bdf8" fontSize="8" fontWeight="600" textAnchor="middle">
            Júpiteres calientes
          </text>
          <ellipse
            cx="230"
            cy="40"
            rx="40"
            ry="24"
            fill="rgba(45, 212, 191, 0.15)"
            stroke="#2dd4bf"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <circle cx="215" cy="36" r="3" fill="#2dd4bf" />
          <circle cx="240" cy="44" r="3" fill="#2dd4bf" />
          <circle cx="235" cy="32" r="3" fill="#2dd4bf" />
          <text x="230" y="74" fill="#2dd4bf" fontSize="8" fontWeight="600" textAnchor="middle">
            Super-Tierras
          </text>
        </g>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 580 140"
      className="s00-schematic-svg"
      role="img"
      aria-label="Esquema de priorización: cola de seguimiento ordenado por rendimiento"
    >
      <rect
        x="10"
        y="10"
        width="560"
        height="120"
        rx="8"
        fill="rgba(15, 23, 42, 0.7)"
        stroke="#1e293b"
        strokeWidth="1"
      />
      <text x="30" y="32" fill="#e2e8f0" fontSize="11" fontWeight="600">
        Cola de asignación para telescopio de seguimiento (ej. Keck / ESPRESSO)
      </text>
      <g transform="translate(30, 45)">
        <rect
          width="115"
          height="65"
          rx="6"
          fill="rgba(45, 212, 191, 0.15)"
          stroke="#2dd4bf"
          strokeWidth="1.5"
        />
        <text x="12" y="20" fill="#2dd4bf" fontSize="10" fontWeight="700">
          #1 Prioridad
        </text>
        <text x="12" y="36" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
          Kepler-90 i
        </text>
        <text x="12" y="52" fill="#a7f3d0" fontSize="8">
          Retorno: 0.96 / h
        </text>
      </g>
      <g transform="translate(160, 45)">
        <rect
          width="115"
          height="65"
          rx="6"
          fill="rgba(56, 189, 248, 0.12)"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        <text x="12" y="20" fill="#38bdf8" fontSize="10" fontWeight="700">
          #2 Prioridad
        </text>
        <text x="12" y="36" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
          Kepler-80 g
        </text>
        <text x="12" y="52" fill="#bae6fd" fontSize="8">
          Retorno: 0.88 / h
        </text>
      </g>
      <g transform="translate(290, 45)">
        <rect
          width="115"
          height="65"
          rx="6"
          fill="rgba(245, 158, 11, 0.1)"
          stroke="#f59e0b"
          strokeWidth="1"
        />
        <text x="12" y="20" fill="#f59e0b" fontSize="10" fontWeight="700">
          #3 Prioridad
        </text>
        <text x="12" y="36" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
          KOI-351.08
        </text>
        <text x="12" y="52" fill="#fde047" fontSize="8">
          Retorno: 0.74 / h
        </text>
      </g>
      <g transform="translate(420, 45)">
        <rect
          width="130"
          height="65"
          rx="6"
          fill="rgba(248, 113, 113, 0.08)"
          stroke="#f87171"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text x="12" y="20" fill="#f87171" fontSize="10" fontWeight="700">
          Baja prioridad
        </text>
        <text x="12" y="36" fill="#94a3b8" fontSize="9" fontFamily="monospace">
          KIC-1041421
        </text>
        <text x="12" y="52" fill="#fca5a5" fontSize="8">
          Alto costo / bajo SNR
        </text>
      </g>
    </svg>
  );
}

function BranchTriadDiagram({
  selectedBranchId,
  onSelectBranch,
  interactive,
}: {
  selectedBranchId?: string;
  onSelectBranch?: (id: string) => void;
  interactive?: boolean;
}) {
  const isAstro = selectedBranchId === 'astronomia';
  const isTeor = selectedBranchId === 'teoria';
  const isApli = selectedBranchId === 'aplicacion';

  return (
    <svg
      viewBox="0 0 580 180"
      className="s00-schematic-svg s00-triad-svg"
      role="img"
      aria-label="Diagrama de la tríada curricular: problema astronómico, teoría formal ML y aplicación reproducible"
    >
      <defs>
        <marker
          id="triad-arrow-cyan"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M1,1 L7,4 L1,7 Z" fill="#38bdf8" />
        </marker>
        <marker
          id="triad-arrow-indigo"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M1,1 L7,4 L1,7 Z" fill="#818cf8" />
        </marker>
        <marker
          id="triad-arrow-emerald"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M1,1 L7,4 L1,7 Z" fill="#34d399" />
        </marker>
      </defs>

      <rect
        x="10"
        y="10"
        width="560"
        height="160"
        rx="10"
        fill="rgba(15, 23, 42, 0.7)"
        stroke="#1e293b"
        strokeWidth="1"
      />

      <path
        d="M230,42 Q150,52 120,95"
        fill="none"
        stroke="#38bdf8"
        strokeWidth={isAstro || isTeor ? 2.5 : 1.5}
        strokeDasharray={isAstro || isTeor ? undefined : '3 3'}
        markerEnd="url(#triad-arrow-cyan)"
      />
      <text x="148" y="58" fill="#38bdf8" fontSize="8" fontWeight="600" textAnchor="middle">
        Observable físico
      </text>

      <path
        d="M170,135 L410,135"
        fill="none"
        stroke="#818cf8"
        strokeWidth={isTeor || isApli ? 2.5 : 1.5}
        strokeDasharray={isTeor || isApli ? undefined : '3 3'}
        markerEnd="url(#triad-arrow-indigo)"
      />
      <text x="290" y="152" fill="#818cf8" fontSize="8" fontWeight="600" textAnchor="middle">
        Pérdida, modelo y garantías
      </text>

      <path
        d="M460,95 Q430,52 350,42"
        fill="none"
        stroke="#34d399"
        strokeWidth={isApli || isAstro ? 2.5 : 1.5}
        strokeDasharray={isApli || isAstro ? undefined : '3 3'}
        markerEnd="url(#triad-arrow-emerald)"
      />
      <text x="432" y="58" fill="#34d399" fontSize="8" fontWeight="600" textAnchor="middle">
        Límite e interpretación
      </text>

      <g
        transform="translate(210, 18)"
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label="Seleccionar rama Problema astronómico"
        onClick={() => interactive && onSelectBranch?.('astronomia')}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelectBranch?.('astronomia');
          }
        }}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        <rect
          width="160"
          height="45"
          rx="8"
          fill={isAstro ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.85)'}
          stroke={isAstro ? '#38bdf8' : '#334155'}
          strokeWidth={isAstro ? 2 : 1}
        />
        <circle cx="20" cy="22" r="10" fill={isAstro ? '#0284c7' : '#1e293b'} />
        <text x="20" y="26" fill="#38bdf8" fontSize="10" textAnchor="middle">
          🔭
        </text>
        <text x="38" y="20" fill={isAstro ? '#e0f2fe' : '#cbd5e1'} fontSize="10" fontWeight="700">
          01 · Astronomía
        </text>
        <text x="38" y="34" fill="#94a3b8" fontSize="8">
          Pregunta y fenómeno
        </text>
      </g>

      <g
        transform="translate(25, 105)"
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label="Seleccionar rama Teoría formal ML"
        onClick={() => interactive && onSelectBranch?.('teoria')}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelectBranch?.('teoria');
          }
        }}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        <rect
          width="160"
          height="45"
          rx="8"
          fill={isTeor ? 'rgba(129, 140, 248, 0.2)' : 'rgba(30, 41, 59, 0.85)'}
          stroke={isTeor ? '#818cf8' : '#334155'}
          strokeWidth={isTeor ? 2 : 1}
        />
        <circle cx="20" cy="22" r="10" fill={isTeor ? '#4f46e5' : '#1e293b'} />
        <text x="20" y="26" fill="#818cf8" fontSize="10" textAnchor="middle">
          📐
        </text>
        <text x="38" y="20" fill={isTeor ? '#ede9fe' : '#cbd5e1'} fontSize="10" fontWeight="700">
          02 · Teoría formal ML
        </text>
        <text x="38" y="34" fill="#94a3b8" fontSize="8">
          Espacio, pérdida y sesgo
        </text>
      </g>

      <g
        transform="translate(395, 105)"
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label="Seleccionar rama Aplicación reproducible"
        onClick={() => interactive && onSelectBranch?.('aplicacion')}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelectBranch?.('aplicacion');
          }
        }}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        <rect
          width="160"
          height="45"
          rx="8"
          fill={isApli ? 'rgba(52, 211, 153, 0.2)' : 'rgba(30, 41, 59, 0.85)'}
          stroke={isApli ? '#34d399' : '#334155'}
          strokeWidth={isApli ? 2 : 1}
        />
        <circle cx="20" cy="22" r="10" fill={isApli ? '#059669' : '#1e293b'} />
        <text x="20" y="26" fill="#34d399" fontSize="10" textAnchor="middle">
          ⚡
        </text>
        <text x="38" y="20" fill={isApli ? '#d1fae5' : '#cbd5e1'} fontSize="10" fontWeight="700">
          03 · Aplicación
        </text>
        <text x="38" y="34" fill="#94a3b8" fontSize="8">
          Pipeline y reproducibilidad
        </text>
      </g>
    </svg>
  );
}

function S00FlashcardModal({
  collectionKey,
  activeCardId,
  onClose,
  onSelectCard,
}: {
  collectionKey: 'pillars' | 'modalities' | 'datacards' | 'verbs' | 'impact';
  activeCardId: string;
  onClose: () => void;
  onSelectCard: (id: string) => void;
}) {
  const cards = useMemo(() => getS00FlashcardCollection(collectionKey), [collectionKey]);
  const activeIndex = Math.max(
    0,
    cards.findIndex((c) => c.id === activeCardId),
  );
  const card = cards[activeIndex] ?? cards[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const prev = cards[(activeIndex - 1 + cards.length) % cards.length];
        if (prev) onSelectCard(prev.id);
      } else if (e.key === 'ArrowRight') {
        const next = cards[(activeIndex + 1) % cards.length];
        if (next) onSelectCard(next.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, cards, onClose, onSelectCard]);

  if (!card) return null;

  const prevIdx = (activeIndex - 1 + cards.length) % cards.length;
  const nextIdx = (activeIndex + 1) % cards.length;
  const prevCard = cards[prevIdx] ?? card;
  const nextCard = cards[nextIdx] ?? card;

  return (
    <div
      className="s00-flashcard-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flashcard-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="s00-flashcard-container" data-tone={card.tone}>
        <header className="s00-flashcard-header">
          <div className="s00-flashcard-header__meta">
            <span className="s00-flashcard-badge">{card.badge}</span>
            <span className="s00-flashcard-collection-title">{card.collectionTitle}</span>
          </div>
          <div className="s00-flashcard-header__title-row">
            <h2 id="flashcard-title" className="s00-flashcard-title">
              {card.title}
            </h2>
            <button
              type="button"
              className="s00-flashcard-close-btn"
              onClick={onClose}
              aria-label="Cerrar ficha interactiva"
            >
              ✕
            </button>
          </div>
          <p className="s00-flashcard-subtitle">{card.subtitle}</p>
        </header>

        <div className="s00-flashcard-body">
          <div className="s00-flashcard-visual">
            <div className="s00-flashcard-img-wrap">
              <img
                src={assetUrl(card.miniatureSrc)}
                alt={card.miniatureAlt}
                className="s00-flashcard-img"
                width="480"
                height="240"
              />
            </div>
            {card.formula && (
              <div className="s00-flashcard-formula-card">
                <span className="s00-formula-tag">Expresión matemática / Formalismo</span>
                <code className="s00-formula-code">{card.formula}</code>
                {card.formulaDescription && (
                  <p className="s00-formula-desc">{card.formulaDescription}</p>
                )}
              </div>
            )}
            <p className="s00-flashcard-caption">{card.miniatureCaption}</p>
          </div>

          <div className="s00-flashcard-dossier">
            <div className="s00-flashcard-quadrant s00-flashcard-quadrant--concept">
              <span className="s00-quadrant-label">Concepto y física del proceso</span>
              <p>{card.physicalConcept}</p>
            </div>

            {card.observableVsInference && (
              <div className="s00-flashcard-quadrant s00-flashcard-quadrant--contrast">
                <div className="s00-contrast-item">
                  <span className="s00-quadrant-sublabel">📡 Observable / Medición:</span>
                  <p>{card.observableVsInference.observable}</p>
                </div>
                <div className="s00-contrast-item">
                  <span className="s00-quadrant-sublabel">🔬 Inferencia / Propiedad:</span>
                  <p>{card.observableVsInference.inference}</p>
                </div>
              </div>
            )}

            <div className="s00-flashcard-quadrant s00-flashcard-quadrant--ml">
              <span className="s00-quadrant-label">Rol computacional de Machine Learning</span>
              <p>{card.mlRole}</p>
            </div>

            <div className="s00-flashcard-quadrant s00-flashcard-quadrant--instrumentation">
              <span className="s00-quadrant-label">Instrumentos, misiones y fuentes</span>
              <p>{card.instrumentsOrData}</p>
            </div>

            <div className="s00-flashcard-quadrant s00-flashcard-quadrant--limit">
              <span className="s00-quadrant-label">⚠️ Límite epistemológico y riesgo de sesgo</span>
              <p>{card.riskOrLimit}</p>
            </div>

            {card.studyOrProvenance && (
              <div className="s00-flashcard-quadrant s00-flashcard-quadrant--study">
                <span className="s00-quadrant-label">Procedencia bibliográfica</span>
                <p className="s00-study-authors">
                  <strong>{card.studyOrProvenance.authors}</strong> ({card.studyOrProvenance.year})
                </p>
                <p className="s00-study-paper-title">{card.studyOrProvenance.title}</p>
                <div className="s00-study-links">
                  {card.studyOrProvenance.url && (
                    <a
                      href={card.studyOrProvenance.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="s00-badge-link"
                    >
                      {card.studyOrProvenance.journal || 'Artículo DOI'} ↗
                    </a>
                  )}
                  {card.studyOrProvenance.archiveUrl && (
                    <a
                      href={card.studyOrProvenance.archiveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="s00-badge-link"
                    >
                      Datos ({card.studyOrProvenance.archiveName}) ↗
                    </a>
                  )}
                  {card.studyOrProvenance.codeUrl && (
                    <a
                      href={card.studyOrProvenance.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="s00-badge-link"
                    >
                      Código ({card.studyOrProvenance.codeName}) ↗
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="s00-flashcard-footer">
          <button
            type="button"
            className="s00-flashcard-nav-btn"
            onClick={() => onSelectCard(prevCard.id)}
            aria-label={`Anterior: ${prevCard.title}`}
          >
            ← {prevCard.title}
          </button>

          <div className="s00-flashcard-dots" role="tablist" aria-label="Seleccionar ficha">
            {cards.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                className={`s00-flashcard-dot ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => onSelectCard(c.id)}
                aria-label={`Ficha ${idx + 1}: ${c.title}`}
                aria-selected={idx === activeIndex}
              />
            ))}
          </div>

          <button
            type="button"
            className="s00-flashcard-nav-btn"
            onClick={() => onSelectCard(nextCard.id)}
            aria-label={`Siguiente: ${nextCard.title}`}
          >
            {nextCard.title} →
          </button>
        </footer>
      </div>
    </div>
  );
}

function VisualFrame({
  unit,
  part,
  compact = false,
  selectedConceptId,
  onSelectConcept,
  selectedDataCardId,
  onSelectDataCard,
  selectedVerb,
  onSelectVerb,
  selectedImpactCaseId,
  onSelectImpactCase,
  selectedBranchId,
  onSelectBranch,
  selectedClosureStepId,
  onSelectClosureStep,
  onSelectSlide,
}: {
  unit: S00Unit;
  part?: S00Part | null;
  compact?: boolean;
  selectedConceptId?: 'exoplaneta' | 'transito' | 'espectro' | 'representacion';
  onSelectConcept?: (id: 'exoplaneta' | 'transito' | 'espectro' | 'representacion') => void;
  selectedDataCardId?: string;
  onSelectDataCard?: (id: string) => void;
  selectedVerb?: string;
  onSelectVerb?: (id: string) => void;
  selectedImpactCaseId?: string;
  onSelectImpactCase?: (id: string) => void;
  selectedBranchId?: string;
  onSelectBranch?: (id: string) => void;
  selectedClosureStepId?: string;
  onSelectClosureStep?: (id: string) => void;
  onSelectSlide?: (index: number) => void;
}) {
  const interactive = !compact;
  const visualFocus = part?.visualFocus ?? 'overview';
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [flashcardState, setFlashcardState] = useState<{
    isOpen: boolean;
    collection: 'pillars' | 'modalities' | 'datacards' | 'verbs' | 'impact';
    cardId: string;
  }>({ isOpen: false, collection: 'pillars', cardId: '' });

  const openFlashcard = (
    collection: 'pillars' | 'modalities' | 'datacards' | 'verbs' | 'impact',
    cardId: string,
  ) => {
    setFlashcardState({ isOpen: true, collection, cardId });
  };

  const closeFlashcard = () => {
    setFlashcardState((prev) => ({ ...prev, isOpen: false }));
  };

  const renderContent = () => {
    if (unit.visualKind === 'hero') {
      if (visualFocus === 'conceptos' || visualFocus === 'senal') {
        const cards = unit.conceptCards ?? s00ConceptCards;
        const activeCard =
          cards.find((c) => c.id === selectedConceptId) ?? cards[0] ?? s00ConceptCards[0];
        if (!activeCard) return null;
        return (
          <div className="s00-visual s00-visual--hero s00-visual--concept-cards">
            <div
              className="s00-concept-tabs"
              role={interactive ? 'tablist' : undefined}
              aria-label="Ejemplos de datos astronómicos y representación para ML"
            >
              {cards.map((card) => {
                const isSelected = card.id === activeCard.id;
                return interactive ? (
                  <button
                    type="button"
                    role="tab"
                    key={card.id}
                    className="s00-concept-tab"
                    data-selected={isSelected}
                    aria-selected={isSelected}
                    onClick={() => onSelectConcept?.(card.id)}
                  >
                    <span className="s00-concept-tab__term">{card.title}</span>
                    <span className="s00-concept-tab__badge">{card.badge}</span>
                  </button>
                ) : (
                  <div key={card.id} className="s00-concept-tab" data-selected={isSelected}>
                    <span className="s00-concept-tab__term">{card.title}</span>
                    <span className="s00-concept-tab__badge">{card.badge}</span>
                  </div>
                );
              })}
            </div>

            <article className="s00-concept-detail" aria-live={interactive ? 'polite' : undefined}>
              <div className="s00-concept-detail__visual">
                <div className="s00-concept-detail__visual-header">
                  <span className="s00-concept-detail__visual-tag">{activeCard.badge}</span>
                  {interactive && (
                    <button
                      type="button"
                      className="s00-concept-zoom-btn"
                      onClick={() => setLightboxOpen(true)}
                      aria-label={`Ampliar imagen de ${activeCard.title}`}
                      title="Ampliar imagen a pantalla completa"
                    >
                      <span aria-hidden="true">🔍</span>
                      <span>Ampliar</span>
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="s00-concept-detail__image-btn"
                  onClick={() => setLightboxOpen(true)}
                  disabled={!interactive}
                  aria-label={`Ver imagen completa: ${activeCard.title}`}
                  title="Clic para ampliar imagen"
                >
                  <img
                    src={assetUrl(activeCard.imageSrc)}
                    alt={activeCard.imageAlt}
                    className="s00-concept-detail__image"
                    loading="lazy"
                    width="1400"
                    height="750"
                  />
                  <span className="s00-concept-detail__zoom-indicator" aria-hidden="true">
                    🔍 Clic para ampliar
                  </span>
                </button>
                <p className="s00-concept-detail__caption">{activeCard.imageCaption}</p>
              </div>

              <div className="s00-concept-detail__content">
                <div className="s00-concept-detail__meta">
                  <span className="s00-concept-detail__kicker">{activeCard.kicker}</span>
                  <h3>{activeCard.title}</h3>
                  <p className="s00-concept-detail__def">{activeCard.shortDefinition}</p>
                  <p className="s00-concept-detail__desc">{activeCard.description}</p>
                </div>

                <dl className="s00-concept-detail__specs">
                  <div>
                    <dt>Objetivo</dt>
                    <dd>{activeCard.target}</dd>
                  </div>
                  <div>
                    <dt>Instrumento</dt>
                    <dd>{activeCard.instrument}</dd>
                  </div>
                  <div>
                    <dt>Modalidad de dato</dt>
                    <dd>{activeCard.dataType}</dd>
                  </div>
                </dl>

                <div className="s00-concept-detail__study">
                  <span className="s00-concept-detail__study-label">
                    Fuentes y archivo original
                  </span>
                  <p className="s00-concept-detail__study-title">
                    <strong>
                      {activeCard.study.authors} ({activeCard.study.year})
                    </strong>
                    : <em>{activeCard.study.title}</em>. {activeCard.study.journal}.
                  </p>

                  <div className="s00-concept-links-row">
                    {activeCard.study.doi && (
                      <a
                        href={activeCard.study.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s00-concept-study-link"
                      >
                        Ver artículo original (
                        {activeCard.study.doi ? `DOI: ${activeCard.study.doi}` : 'Enlace'}) ↗
                      </a>
                    )}
                    {activeCard.study.arxivUrl && (
                      <a
                        href={activeCard.study.arxivUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s00-concept-study-link s00-concept-study-link--arxiv"
                      >
                        <span>Preprint abierto (arXiv) ↗</span>
                      </a>
                    )}
                    {activeCard.dataArchive && (
                      <a
                        href={activeCard.dataArchive.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s00-concept-study-link s00-concept-study-link--archive"
                      >
                        <span>{activeCard.dataArchive.name} ↗</span>
                      </a>
                    )}
                    {activeCard.codeRepo && (
                      <a
                        href={activeCard.codeRepo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="s00-concept-study-link s00-concept-study-link--code"
                      >
                        <span>{activeCard.codeRepo.name} ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                <p className="s00-concept-detail__limit">
                  <strong>Límite científico:</strong> {activeCard.limit}
                </p>
              </div>
            </article>

            {interactive && (
              <ImageLightbox
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                imageSrc={assetUrl(activeCard.imageSrc)}
                imageAlt={activeCard.imageAlt}
                title={`${activeCard.title} · ${activeCard.badge}`}
                caption={activeCard.imageCaption}
                badge={activeCard.badge}
              />
            )}
          </div>
        );
      }

      if (visualFocus === 'pregunta') {
        return (
          <div className="s00-visual s00-visual--hero s00-visual--hero-guide">
            <img
              src={assetUrl(s00VisualAssets.hero)}
              alt={unit.visualAlt}
              width="1798"
              height="727"
              loading={compact ? 'lazy' : 'eager'}
              className="s00-hero-image"
            />
            <div className="s00-hero-question-deck">
              <div className="s00-hero-question">
                <span>pregunta guía</span>
                <strong>
                  ¿Qué podemos aprender de un mundo que casi nunca podemos observar directamente?
                </strong>
              </div>
              <div className="s00-question-result">
                <span>punto de partida</span>
                <strong>mundo → medición → evidencia</strong>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="s00-visual s00-visual--hero">
          <img
            src={assetUrl(s00VisualAssets.hero)}
            alt={unit.visualAlt}
            width="1798"
            height="727"
            loading={compact ? 'lazy' : 'eager'}
          />
          <div className="s00-visual__legend" aria-hidden="true">
            <span>mundo</span>
            <span>señal</span>
            <span>pregunta</span>
          </div>
        </div>
      );
    }

    if (unit.visualKind === 'planetary-science') {
      const pillars = unit.planetaryPillars ?? s00PlanetaryPillars;
      const activePillarId = pillars.some((p) => p.id === visualFocus) ? visualFocus : 'origen';
      const activePillar =
        pillars.find((p) => p.id === activePillarId) ?? pillars[0] ?? s00PlanetaryPillars[0];
      if (!activePillar) return null;

      return (
        <div className="s00-visual s00-visual--science" data-active-pillar={activePillar.id}>
          <div className="s00-science-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          {/* Red de los 4 pilares siempre visible */}
          <div className="s00-science-system">
            <div className="s00-science-system__header">
              <div className="s00-science-system__badge">
                <span className="s00-science-dot" aria-hidden="true" />
                <span>Red del sistema planetario</span>
              </div>
              <p className="s00-science-system__hint">
                Cuatro pilares interconectados: cada observación ilumina un aspecto y abre los
                demás.
              </p>
            </div>

            <div
              className="s00-science-grid"
              role={interactive ? 'tablist' : undefined}
              aria-label="Pilares del sistema planetario"
            >
              {pillars.map((item, index) => {
                const isActive = item.id === activePillar.id;
                const content = (
                  <>
                    <div className="s00-science-node__top">
                      <span className="s00-card-index">{item.number}</span>
                      <span className="s00-science-node__tag">{item.id}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="s00-science-node__sub">{item.subtitle}</p>
                  </>
                );

                return interactive ? (
                  <button
                    type="button"
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`s00-science-node ${isActive ? 'is-active' : ''}`}
                    data-tone={item.tone}
                    onClick={() => {
                      const targetSlideIdx = getS00SlideIndex('s00-ciencias-planetarias', index);
                      if (targetSlideIdx >= 0) onSelectSlide?.(targetSlideIdx);
                    }}
                  >
                    {content}
                  </button>
                ) : (
                  <div
                    key={item.id}
                    className={`s00-science-node ${isActive ? 'is-active' : ''}`}
                    data-tone={item.tone}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dossier científico profundo del pilar activo */}
          <article
            className="s00-pillar-dossier"
            data-tone={activePillar.tone}
            aria-labelledby={`pillar-title-${activePillar.id}`}
          >
            <div className="s00-pillar-dossier__header">
              <div className="s00-pillar-dossier__meta">
                <span className="s00-stage-kicker">
                  {activePillar.number} · PILAR ACTIVO · {activePillar.title.toUpperCase()}
                </span>
                <span className="s00-pillar-dossier__badge">{activePillar.id}</span>
              </div>
              <div className="s00-pillar-dossier__title-row">
                <h3 id={`pillar-title-${activePillar.id}`}>{activePillar.question}</h3>
                <button
                  type="button"
                  className="s00-flashcard-trigger-btn"
                  onClick={() => openFlashcard('pillars', activePillar.id)}
                  title="Ampliar ficha técnica con ilustración conceptual"
                >
                  <img
                    src={assetUrl(activePillar.miniatureSrc)}
                    alt=""
                    aria-hidden="true"
                    className="s00-btn-miniature-thumb"
                    width="24"
                    height="24"
                  />
                  <span>Ficha ampliada 🔍</span>
                </button>
              </div>
              <p className="s00-pillar-dossier__definition">{activePillar.physicalDefinition}</p>
            </div>

            <div className="s00-pillar-dossier__body">
              <div className="s00-pillar-visual-preview">
                <button
                  type="button"
                  className="s00-pillar-miniature-card s00-pillar-miniature-btn"
                  onClick={() => openFlashcard('pillars', activePillar.id)}
                  title="Haz clic para ampliar la ficha técnica"
                >
                  <img
                    src={assetUrl(activePillar.miniatureSrc)}
                    alt={`Ilustración conceptual de ${activePillar.title}`}
                    className="s00-pillar-miniature-img"
                    loading="lazy"
                    width="280"
                    height="140"
                  />
                  <div className="s00-pillar-miniature-info">
                    <span className="s00-miniature-formula">{activePillar.formula}</span>
                    <span className="s00-miniature-action-badge">Ampliar ficha 🔍</span>
                  </div>
                </button>
              </div>

              <div className="s00-pillar-dossier__processes">
                <span className="s00-dossier-label">Procesos físicos en juego</span>
                <ul className="s00-dossier-pills">
                  {activePillar.processes.map((proc, idx) => (
                    <li key={idx} className="s00-dossier-pill">
                      <span className="s00-dossier-bullet" aria-hidden="true">
                        •
                      </span>
                      <span>{proc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="s00-pillar-dossier__grid">
                <div className="s00-pillar-block">
                  <span className="s00-dossier-label">Observables e instrumentos</span>
                  <p>{activePillar.observables}</p>
                  <div className="s00-pillar-block__instruments">
                    <strong>Misiones / Telescopios:</strong> {activePillar.instruments}
                  </div>
                </div>

                <div className="s00-pillar-block s00-pillar-block--ml">
                  <span className="s00-dossier-label">¿Dónde entra Machine Learning?</span>
                  <p>{activePillar.mlRole}</p>
                </div>
              </div>

              <div className="s00-pillar-dossier__limit">
                <span className="s00-dossier-limit-tag">Límite científico</span>
                <p>{activePillar.physicalLimit}</p>
              </div>
            </div>
          </article>

          <p className="s00-visual__annotation">un mundo · cuatro escalas de pregunta física</p>
        </div>
      );
    }

    if (unit.visualKind === 'question-lab') {
      const stages = unit.formulationStages ?? s00FormulationStages;
      const activeStageId = stages.some((s) => s.id === visualFocus) ? visualFocus : 'curiosidad';
      const activeStage =
        stages.find((s) => s.id === activeStageId) ?? stages[0] ?? s00FormulationStages[0];
      if (!activeStage) return null;
      const activeStageIndex = stages.findIndex((s) => s.id === activeStage.id);

      return (
        <div className="s00-visual s00-visual--formulation" data-active-stage={activeStage.id}>
          {/* Pipeline continuo de las 4 decisiones metodológicas */}
          <div className="s00-formulation-pipeline">
            <div className="s00-formulation-pipeline__header">
              <div className="s00-formulation-pipeline__badge">
                <span className="s00-formulation-dot" aria-hidden="true" />
                <span>Cadena de formulación metodológica</span>
              </div>
              <p className="s00-formulation-pipeline__hint">
                Cuatro decisiones antes del algoritmo: acotar la curiosidad fija el dataset, la
                salida y la utilidad.
              </p>
            </div>

            <div
              className="s00-formulation-stepper"
              role={interactive ? 'tablist' : undefined}
              aria-label="Etapas de formulación de la tarea de ML"
            >
              {stages.map((stage, index) => {
                const isActive = stage.id === activeStage.id;
                const isPast = index < activeStageIndex;
                const stepButton = (
                  <>
                    <div className="s00-formulation-step__status">
                      <span className="s00-formulation-step__num">
                        {isPast ? '✓' : stage.number}
                      </span>
                      <span className="s00-formulation-step__pill">{stage.visualDetail.badge}</span>
                    </div>
                    <strong className="s00-formulation-step__name">{stage.stepName}</strong>
                    <span className="s00-formulation-step__sub">{stage.subtitle}</span>
                  </>
                );

                return interactive ? (
                  <button
                    type="button"
                    key={stage.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`s00-formulation-step ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                    data-tone={stage.tone}
                    onClick={() => {
                      const targetSlideIdx = getS00SlideIndex('s00-acotar', index);
                      if (targetSlideIdx >= 0) onSelectSlide?.(targetSlideIdx);
                    }}
                  >
                    {stepButton}
                  </button>
                ) : (
                  <div
                    key={stage.id}
                    className={`s00-formulation-step ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                    data-tone={stage.tone}
                  >
                    {stepButton}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dossier activo de la etapa */}
          <article className="s00-formulation-dossier" data-tone={activeStage.tone}>
            <div className="s00-formulation-dossier__header">
              <div className="s00-formulation-dossier__kicker">
                <span>03.{activeStage.number}</span>
                <span>Paso {activeStage.number} de 04</span>
                <span className="s00-dossier-tag">{activeStage.stepName}</span>
              </div>
              <h3>{activeStage.title}</h3>
              <p className="s00-formulation-dossier__subtitle">{activeStage.subtitle}</p>

              <div className="s00-formulation-decision">
                <span className="s00-decision-tag">Decisión metodológica</span>
                <p>{activeStage.decision}</p>
              </div>
            </div>

            {/* Diagrama visual interactivo de transformación */}
            <div className="s00-formulation-schematic">
              <div className="s00-formulation-schematic__header">
                <span className="s00-schematic-badge">{activeStage.visualDetail.badge}</span>
                {activeStage.visualDetail.formula && (
                  <code className="s00-schematic-formula">{activeStage.visualDetail.formula}</code>
                )}
              </div>

              <div className="s00-schematic-canvas">
                {activeStage.id === 'curiosidad' && <CuriosityScopeDiagram />}
                {activeStage.id === 'unidad' && <UnitDiscretizationDiagram />}
                {activeStage.id === 'salida' && <OutputDistributionDiagram />}
                {activeStage.id === 'uso' && <UsageFunnelDiagram />}
              </div>

              <div className="s00-schematic-flow">
                <div className="s00-schematic-flow__col">
                  <span className="s00-flow-label">Entrada</span>
                  <p>{activeStage.visualDetail.inputLabel}</p>
                </div>
                <div className="s00-schematic-flow__col s00-schematic-flow__col--arrow">
                  <span className="s00-flow-arrow" aria-hidden="true">
                    ➔
                  </span>
                  <p>{activeStage.visualDetail.transformationLabel}</p>
                </div>
                <div className="s00-schematic-flow__col">
                  <span className="s00-flow-label">Resultado computable</span>
                  <p>{activeStage.visualDetail.outputLabel}</p>
                </div>
              </div>
            </div>

            {/* Contraste de dos casos reales en paralelo */}
            <div className="s00-formulation-cases">
              <div className="s00-formulation-case s00-formulation-case--detection">
                <div className="s00-formulation-case__top">
                  <span className="s00-case-badge">Caso Detección</span>
                  <span className="s00-case-mission">{activeStage.caseDetection.mission}</span>
                </div>
                <h4>{activeStage.caseDetection.title}</h4>
                <p className="s00-case-desc">{activeStage.caseDetection.description}</p>
                <div className="s00-case-instance">
                  <strong>Instancia o formulación:</strong>
                  <p>{activeStage.caseDetection.instance}</p>
                </div>
              </div>

              <div className="s00-formulation-case s00-formulation-case--char">
                <div className="s00-formulation-case__top">
                  <span className="s00-case-badge">Caso Caracterización</span>
                  <span className="s00-case-mission">
                    {activeStage.caseCharacterization.mission}
                  </span>
                </div>
                <h4>{activeStage.caseCharacterization.title}</h4>
                <p className="s00-case-desc">{activeStage.caseCharacterization.description}</p>
                <div className="s00-case-instance">
                  <strong>Instancia o formulación:</strong>
                  <p>{activeStage.caseCharacterization.instance}</p>
                </div>
              </div>
            </div>

            {/* Pie: Antipatrón y Criterio de validación */}
            <div className="s00-formulation-footer">
              <div className="s00-formulation-pitfall">
                <span className="s00-pitfall-tag">⚠️ Antipatrón común</span>
                <p>{activeStage.commonPitfall}</p>
              </div>
              <div className="s00-formulation-gate">
                <span className="s00-gate-tag">✓ Criterio de paso</span>
                <p>{activeStage.validationGate}</p>
              </div>
            </div>
          </article>

          <p className="s00-visual__annotation">
            pregunta científica → unidad de dato → salida computable → criterio de uso
          </p>
        </div>
      );
    }

    if (unit.visualKind === 'measurement') {
      const modalities = unit.measurementModalities ?? s00MeasurementModalities;
      const activeModality =
        modalities.find((m) => m.id === visualFocus) ??
        (visualFocus === 'radial'
          ? modalities.find((m) => m.id === 'radial')
          : visualFocus === 'espectro'
            ? modalities.find((m) => m.id === 'espectro')
            : visualFocus === 'imagen'
              ? modalities.find((m) => m.id === 'imagen')
              : modalities[0]) ??
        modalities[0] ??
        s00MeasurementModalities[0];
      if (!activeModality) return null;

      return (
        <div className="s00-visual s00-visual--measurement">
          {/* Sistema de 4 modalidades observacionales conectadas */}
          <div className="s00-measurement-system">
            <div className="s00-measurement-header">
              <span className="s00-measurement-badge">Modalidades observacionales</span>
              <span className="s00-measurement-prompt">
                El instrumento determina qué señal se registra y qué física se puede inferir
              </span>
            </div>

            <div
              className="s00-measurement-track"
              role={interactive ? 'tablist' : undefined}
              aria-label="Modalidades de observación"
            >
              {modalities.map((mod, index) => {
                const isActive = mod.id === activeModality.id;
                const stepButton = (
                  <>
                    <div className="s00-measurement-tab__top">
                      <span className="s00-measurement-tab__num">{mod.number}</span>
                      <span className="s00-measurement-tab__symbol">{mod.symbol}</span>
                    </div>
                    <span className="s00-measurement-tab__title">{mod.title}</span>
                    <span className="s00-measurement-tab__tag">
                      {mod.inferredParameter.split(',')[0]}
                    </span>
                  </>
                );

                return interactive ? (
                  <button
                    type="button"
                    key={mod.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`s00-measurement-tab ${isActive ? 'is-active' : ''}`}
                    data-tone={mod.tone}
                    onClick={() => {
                      const targetSlideIdx = getS00SlideIndex('s00-medicion', index);
                      if (targetSlideIdx >= 0) onSelectSlide?.(targetSlideIdx);
                    }}
                  >
                    {stepButton}
                  </button>
                ) : (
                  <div
                    key={mod.id}
                    className={`s00-measurement-tab ${isActive ? 'is-active' : ''}`}
                    data-tone={mod.tone}
                  >
                    {stepButton}
                  </div>
                );
              })}
            </div>

            {/* Barra de fusión física: cómo se combinan las modalidades */}
            <div className="s00-measurement-fusion-bar">
              <span className="s00-fusion-label">Fusión multifísica:</span>
              <div className="s00-fusion-chain">
                <span className="s00-fusion-item">Tránsito (Rp/R★)</span>
                <span className="s00-fusion-op">+</span>
                <span className="s00-fusion-item">V. Radial (Mp sin i)</span>
                <span className="s00-fusion-arrow">➔</span>
                <span className="s00-fusion-result">Densidad media ρ̄</span>
                <span className="s00-fusion-arrow">➔</span>
                <span className="s00-fusion-item s00-fusion-item--atm">Espectro (atmósfera μ)</span>
                <span className="s00-fusion-op">+</span>
                <span className="s00-fusion-item s00-fusion-item--img">Imagen (separación)</span>
              </div>
            </div>
          </div>

          {/* Dossier científico activo de la modalidad */}
          <article className="s00-measurement-dossier" data-tone={activeModality.tone}>
            <div className="s00-measurement-dossier__header">
              <div className="s00-measurement-dossier__title-row">
                <div className="s00-measurement-dossier__title-group">
                  <span className="s00-dossier-num">Modalidad {activeModality.number} / 04</span>
                  <h3>{activeModality.title}</h3>
                </div>
                <div className="s00-measurement-dossier__actions">
                  <button
                    type="button"
                    className="s00-flashcard-trigger-btn"
                    onClick={() => openFlashcard('modalities', activeModality.id)}
                    title="Ampliar ficha técnica de la técnica observacional"
                  >
                    <img
                      src={assetUrl(activeModality.miniatureSrc)}
                      alt=""
                      aria-hidden="true"
                      className="s00-btn-miniature-thumb"
                      width="24"
                      height="24"
                    />
                    <span>Ficha técnica 🔍</span>
                  </button>
                  <span className="s00-dossier-symbol">{activeModality.symbol}</span>
                </div>
              </div>
              <p className="s00-dossier-subtitle">{activeModality.subtitle}</p>

              {/* Ecuación rectora del observable */}
              <div className="s00-measurement-equation-card">
                <div className="s00-equation-card__header">
                  <span className="s00-equation-tag">Ecuación rectora del observable</span>
                  <code className="s00-equation-code">{activeModality.governingEquation}</code>
                </div>
                <p className="s00-equation-desc">{activeModality.equationDescription}</p>
              </div>
            </div>

            {/* Diagrama visual interactivo */}
            <div className="s00-measurement-schematic">
              <div className="s00-measurement-schematic__header">
                <span className="s00-schematic-badge">{activeModality.diagramDetail.badge}</span>
                <span className="s00-schematic-desc">
                  {activeModality.diagramDetail.description}
                </span>
              </div>

              <div className="s00-schematic-canvas">
                {activeModality.id === 'transito' && <TransitLightCurveDiagram />}
                {activeModality.id === 'radial' && <RadialVelocityCurveDiagram />}
                {activeModality.id === 'espectro' && <TransmissionSpectrumDiagram />}
                {activeModality.id === 'imagen' && <DirectImagingCoronagraphDiagram />}
              </div>
            </div>

            {/* Contraste riguroso: Observable crudo vs Parámetro inferido */}
            <div className="s00-measurement-contrast-grid">
              <div className="s00-contrast-col s00-contrast-col--observable">
                <div className="s00-contrast-col__header">
                  <span className="s00-contrast-badge">📡 Observable registrado (Instrumento)</span>
                </div>
                <p>{activeModality.rawObservable}</p>
              </div>

              <div className="s00-contrast-col s00-contrast-col--parameter">
                <div className="s00-contrast-col__header">
                  <span className="s00-contrast-badge">🔬 Parámetro físico inferido (Modelo)</span>
                </div>
                <p>{activeModality.inferredParameter}</p>
              </div>
            </div>

            {/* Instrumentos reales y Oportunidad de Machine Learning */}
            <div className="s00-measurement-context-grid">
              <div className="s00-context-col s00-context-col--instruments">
                <div className="s00-context-col__header">
                  <span className="s00-context-tag">🔭 Misiones e instrumentos reales</span>
                </div>
                <p>{activeModality.instruments}</p>
              </div>

              <div className="s00-context-col s00-context-col--ml">
                <div className="s00-context-col__header">
                  <span className="s00-context-tag">🤖 Rol de Machine Learning</span>
                </div>
                <p>{activeModality.mlRole}</p>
              </div>
            </div>

            {/* Límite físico y degeneración observacional */}
            <div className="s00-measurement-limit-banner">
              <span className="s00-limit-tag">⚠️ Límite físico y degeneración observacional</span>
              <p>{activeModality.physicalLimit}</p>
            </div>
          </article>

          <p className="s00-visual__annotation">
            observable registrado (instrumento) ≠ parámetro físico inferido (modelo)
          </p>
        </div>
      );
    }

    if (unit.visualKind === 'data-landscape') {
      const cards = unit.dataCards ?? s00DataCards;
      const selected = cards.find((card) => card.id === selectedDataCardId) ?? cards[0];
      return (
        <div className="s00-visual s00-visual--data" data-active-card={selected?.id}>
          {/* Top 5-stage data lifecycle track */}
          <div
            className="s00-data-stack"
            role={interactive ? 'tablist' : undefined}
            aria-label="Etapas del ciclo de datos astronómicos"
          >
            {cards.map((card, index) => {
              const isSelected = card.id === selected?.id;
              const content = (
                <>
                  <span className="s00-card-index">{card.number}</span>
                  <span className="s00-data-tab__text">
                    <small>{card.kicker}</small>
                    <strong>{card.title}</strong>
                  </span>
                </>
              );
              return interactive ? (
                <button
                  className="s00-data-tab"
                  data-tone={card.tone}
                  data-selected={isSelected}
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelectDataCard?.(card.id);
                    const targetIdx = getS00SlideIndex('s00-datos', index);
                    if (targetIdx >= 0) onSelectSlide?.(targetIdx);
                  }}
                >
                  {content}
                </button>
              ) : (
                <div className="s00-data-tab" data-tone={card.tone} key={card.id}>
                  {content}
                </div>
              );
            })}
          </div>

          {selected && (
            <article className="s00-data-detail" aria-live={interactive ? 'polite' : undefined}>
              <div className="s00-data-detail__header">
                <div className="s00-data-detail__title-row">
                  <div>
                    <span className="s00-stage-tag">{selected.number} · ETAPA DE DATOS</span>
                    <h3>{selected.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="s00-flashcard-trigger-btn"
                    onClick={() => openFlashcard('datacards', selected.id)}
                    title="Ampliar ficha técnica del ciclo de datos"
                  >
                    <img
                      src={assetUrl(selected.miniatureSrc)}
                      alt=""
                      aria-hidden="true"
                      className="s00-btn-miniature-thumb"
                      width="24"
                      height="24"
                    />
                    <span>Ficha técnica 🔍</span>
                  </button>
                </div>
                <p className="s00-stage-subtitle">{selected.kicker}</p>
              </div>

              {/* Visual Panel: Schematic + Line-art miniature */}
              <div className="s00-stage-visual-grid">
                <div className="s00-stage-schematic-wrap">
                  <DataLandscapeSchematic cardId={selected.id} />
                </div>
                <button
                  type="button"
                  className="s00-stage-miniature-card s00-stage-miniature-btn"
                  onClick={() => openFlashcard('datacards', selected.id)}
                  title="Haz clic para ampliar la ficha técnica"
                >
                  <img
                    src={assetUrl(selected.miniatureSrc)}
                    alt={`Miniatura conceptual: ${selected.title}`}
                    className="s00-stage-miniature-img"
                    loading="lazy"
                    width="240"
                    height="120"
                  />
                  <span className="s00-stage-miniature-caption">
                    {selected.diagramDetail.description}
                  </span>
                  <span className="s00-stage-miniature-action">Ficha técnica 🔍</span>
                </button>
              </div>

              {/* Scientific Properties Grid */}
              <div className="s00-data-properties-grid">
                <div className="s00-property-card">
                  <span className="s00-property-label">Formulación matemática</span>
                  <code className="s00-formula-code">{selected.mathematicalForm}</code>
                </div>
                <div className="s00-property-card">
                  <span className="s00-property-label">Estructura del tensor</span>
                  <span className="s00-property-val">{selected.dataStructure}</span>
                </div>
                <div className="s00-property-card">
                  <span className="s00-property-label">Fuente / Misión</span>
                  <span className="s00-property-val">{selected.exoplanetSource}</span>
                </div>
                <div className="s00-property-card">
                  <span className="s00-property-label">Sesgo dominante</span>
                  <span className="s00-property-val">{selected.dominantBias}</span>
                </div>
              </div>

              {/* Scientific Narrative & Dominant Bias */}
              <div className="s00-data-detail__copy">
                <p className="s00-data-detail__question">
                  <strong>Pregunta clave:</strong> {selected.question}
                </p>
                <p className="s00-data-detail__body">{selected.body}</p>
              </div>

              <div className="s00-data-bias-banner">
                <span className="s00-bias-tag">⚠️ Riesgo de modelado:</span>
                <p>{selected.risk}</p>
              </div>
            </article>
          )}
        </div>
      );
    }

    if (unit.visualKind === 'ml-verbs') {
      const verbs = unit.mlVerbs ?? s00MLVerbs;
      const selected = verbs.find((verb) => verb.id === selectedVerb) ?? verbs[0];
      return (
        <div className="s00-visual s00-visual--verbs" data-active-verb={selected?.id}>
          {/* Top 5-verb workbench tablist */}
          <div
            className="s00-verb-grid"
            role={interactive ? 'tablist' : undefined}
            aria-label="Cinco verbos de aprendizaje automático"
          >
            {verbs.map((verb, index) => {
              const isSelected = verb.id === selected?.id;
              const content = (
                <>
                  <span className="s00-card-index">{verb.number}</span>
                  <span className="s00-verb-tab__text">
                    <strong>{verb.label}</strong>
                    <small>{verb.verb}</small>
                  </span>
                </>
              );
              return interactive ? (
                <button
                  className="s00-verb-card"
                  data-tone={verb.tone}
                  data-selected={isSelected}
                  key={verb.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelectVerb?.(verb.id);
                    const targetIdx = getS00SlideIndex('s00-ml', index);
                    if (targetIdx >= 0) onSelectSlide?.(targetIdx);
                  }}
                >
                  {content}
                </button>
              ) : (
                <div className="s00-verb-card" data-tone={verb.tone} key={verb.id}>
                  {content}
                </div>
              );
            })}
          </div>

          {selected && (
            <article className="s00-verb-workbench" aria-live={interactive ? 'polite' : undefined}>
              <div className="s00-verb-workbench__header">
                <div className="s00-verb-workbench__title-row">
                  <div>
                    <span className="s00-stage-tag">{selected.number} · VERBO COMPUTABLE</span>
                    <h3>{selected.label}</h3>
                  </div>
                  <button
                    type="button"
                    className="s00-flashcard-trigger-btn"
                    onClick={() => openFlashcard('verbs', selected.id)}
                    title="Ampliar ficha técnica del verbo de Machine Learning"
                  >
                    <img
                      src={assetUrl(selected.miniatureSrc)}
                      alt=""
                      aria-hidden="true"
                      className="s00-btn-miniature-thumb"
                      width="24"
                      height="24"
                    />
                    <span>Ficha técnica 🔍</span>
                  </button>
                </div>
                <p className="s00-stage-subtitle">{selected.kicker}</p>
              </div>

              {/* Visual Panel: Schematic + Line-art miniature */}
              <div className="s00-stage-visual-grid">
                <div className="s00-stage-schematic-wrap">
                  <MLVerbSchematic verbId={selected.id} />
                </div>
                <button
                  type="button"
                  className="s00-stage-miniature-card s00-stage-miniature-btn"
                  onClick={() => openFlashcard('verbs', selected.id)}
                  title="Haz clic para ampliar la ficha técnica"
                >
                  <img
                    src={assetUrl(selected.miniatureSrc)}
                    alt={`Miniatura de acción: ${selected.label}`}
                    className="s00-stage-miniature-img"
                    loading="lazy"
                    width="240"
                    height="120"
                  />
                  <span className="s00-stage-miniature-caption">
                    {selected.diagramDetail.description}
                  </span>
                  <span className="s00-stage-miniature-action">Ficha técnica 🔍</span>
                </button>
              </div>

              {/* Mathematical Formulation Box */}
              <div className="s00-verb-math-box">
                <div className="s00-math-spaces">
                  <span className="s00-math-space-tag">
                    Espacio de salida: <strong>{selected.outputSpace}</strong>
                  </span>
                </div>
                <div className="s00-math-formulas">
                  <div className="s00-formula-item">
                    <span className="s00-formula-label">Mapeo del modelo:</span>
                    <code className="s00-formula-code">{selected.mathematicalMapping}</code>
                  </div>
                  <div className="s00-formula-item">
                    <span className="s00-formula-label">Objetivo de optimización:</span>
                    <code className="s00-formula-code">{selected.lossFunction}</code>
                  </div>
                </div>
              </div>

              {/* Benchmark Contrast: Classical vs Machine Learning */}
              <div className="s00-verb-contrast-grid">
                <div className="s00-contrast-card s00-contrast-card--baseline">
                  <span className="s00-contrast-col-title">Línea base astronómica clásica</span>
                  <p>{selected.classicalBaseline}</p>
                </div>
                <div className="s00-contrast-card s00-contrast-card--ml">
                  <span className="s00-contrast-col-title">Intervención de Machine Learning</span>
                  <p>{selected.mlApproach}</p>
                </div>
              </div>

              {/* Metric & Failure Mode */}
              <div className="s00-verb-evaluation-bar">
                <div className="s00-metric-chip">
                  <strong>Métrica científica recomendada:</strong> {selected.validationMetric}
                </div>
                <div className="s00-failure-banner">
                  <span className="s00-failure-tag">⚠️ Modo de falla típico</span>
                  <p>{selected.failureMode}</p>
                </div>
              </div>
            </article>
          )}
        </div>
      );
    }

    if (unit.visualKind === 'impact-gallery') {
      const cases = unit.impactCases ?? s00ImpactCases;
      const selected = cases.find((item) => item.id === selectedImpactCaseId) ?? cases[0];
      return (
        <div className="s00-visual s00-visual--impact" data-active-case={selected?.id}>
          {/* High-Impact Metric Banner */}
          {selected && (
            <div className="s00-impact-hero-banner" data-tone={selected.tone}>
              <div className="s00-impact-hero-metric">
                <span className="s00-impact-hero-number">{selected.figure}</span>
                <span className="s00-impact-hero-label">{selected.figureLabel}</span>
              </div>
              <div className="s00-impact-hero-context">
                <span className="s00-impact-mission-badge">{selected.mission}</span>
                <h3 className="s00-impact-hero-title">{selected.title}</h3>
                <p className="s00-impact-hero-claim">{selected.claimStatus}</p>
              </div>
            </div>
          )}

          {/* 6 Cases Navigation Tabs */}
          <div
            className="s00-impact-list"
            role={interactive ? 'tablist' : undefined}
            aria-label="Casos publicados de impacto de ML en exoplanetas"
          >
            {cases.map((item, index) => {
              const isSelected = item.id === selected?.id;
              const content = (
                <>
                  <span className="s00-card-index">{item.number}</span>
                  <span className="s00-impact-tab__text">
                    <span>{item.title}</span>
                    <strong>{item.figure}</strong>
                  </span>
                </>
              );
              return interactive ? (
                <button
                  className="s00-impact-tab"
                  data-tone={item.tone}
                  data-selected={isSelected}
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelectImpactCase?.(item.id);
                    const targetIdx = getS00SlideIndex('s00-impacto', index);
                    if (targetIdx >= 0) onSelectSlide?.(targetIdx);
                  }}
                >
                  {content}
                </button>
              ) : (
                <div className="s00-impact-tab" data-tone={item.tone} key={item.id}>
                  {content}
                </div>
              );
            })}
          </div>

          {selected && (
            <ImpactDetail
              item={selected}
              compact={compact}
              onOpenFlashcard={(id) => openFlashcard('impact', id)}
            />
          )}
        </div>
      );
    }

    if (unit.visualKind === 'branches') {
      const branches = unit.branches ?? s00Branches;
      const selected = branches.find((item) => item.id === selectedBranchId) ?? branches[0];
      return (
        <div className="s00-visual s00-visual--branches" data-active-branch={selected?.id}>
          {/* Curricular Triad Diagram */}
          <div className="s00-branch-triad-wrapper">
            <BranchTriadDiagram
              selectedBranchId={selected?.id}
              onSelectBranch={(id) => {
                onSelectBranch?.(id);
                const idx = branches.findIndex((b) => b.id === id);
                const targetIdx = getS00SlideIndex('s00-ramas', idx);
                if (targetIdx >= 0) onSelectSlide?.(targetIdx);
              }}
              interactive={interactive}
            />
          </div>

          {/* Branch Selection Tabs */}
          <div
            className="s00-branch-grid"
            role={interactive ? 'tablist' : undefined}
            aria-label="Las tres ramas conectadas del curso"
          >
            {branches.map((branch, index) => {
              const isSelected = branch.id === selected?.id;
              const content = (
                <>
                  <span className="s00-card-index">{branch.number}</span>
                  <span className="s00-branch-card__text">
                    <small>{branch.kicker}</small>
                    <strong>{branch.label}</strong>
                  </span>
                </>
              );
              return interactive ? (
                <button
                  className="s00-branch-card"
                  data-tone={branch.tone}
                  data-selected={isSelected}
                  key={branch.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    onSelectBranch?.(branch.id);
                    const targetIdx = getS00SlideIndex('s00-ramas', index);
                    if (targetIdx >= 0) onSelectSlide?.(targetIdx);
                  }}
                >
                  {content}
                </button>
              ) : (
                <div className="s00-branch-card" data-tone={branch.tone} key={branch.id}>
                  {content}
                </div>
              );
            })}
          </div>

          {selected && <BranchDetail branch={selected} compact={compact} />}
        </div>
      );
    }

    const steps = unit.closureSteps ?? s00ClosureSteps;
    const activeClosureStepIndex = Math.max(
      0,
      steps.findIndex((s) => s.id === (selectedClosureStepId || visualFocus)),
    );
    const activeStep = steps[activeClosureStepIndex] ?? steps[0];

    return (
      <div className="s00-visual s00-visual--closure" data-active-step={activeStep?.id}>
        {/* Cumulative Synthesis Timeline */}
        <div
          className="s00-closure-pipeline"
          role={interactive ? 'tablist' : undefined}
          aria-label="Cadena metodológica completa del curso"
        >
          {steps.map((step, index) => {
            const isCompleted = index < activeClosureStepIndex;
            const isActive = index === activeClosureStepIndex;
            return interactive ? (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`s00-closure-step-btn ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                data-tone={step.tone}
                onClick={() => {
                  onSelectClosureStep?.(step.id);
                  const targetIdx = getS00SlideIndex('s00-cierre', index);
                  if (targetIdx >= 0) onSelectSlide?.(targetIdx);
                }}
              >
                <span className="s00-closure-step-num">{isCompleted ? '✓' : step.number}</span>
                <strong className="s00-closure-step-name">{step.stepName}</strong>
              </button>
            ) : (
              <div
                key={step.id}
                className={`s00-closure-step-btn ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                data-tone={step.tone}
              >
                <span className="s00-closure-step-num">{isCompleted ? '✓' : step.number}</span>
                <strong className="s00-closure-step-name">{step.stepName}</strong>
              </div>
            );
          })}
        </div>

        {/* Active Step Synthesis Dossier */}
        {activeStep && (
          <article className="s00-closure-dossier" aria-live={interactive ? 'polite' : undefined}>
            <div className="s00-closure-dossier__header">
              <span className="s00-stage-tag">{activeStep.number} / 07 · PASO DE LA CADENA</span>
              <h3>
                {activeStep.stepName}: {activeStep.title}
              </h3>
              <p className="s00-stage-subtitle">{activeStep.subtitle}</p>
            </div>

            <div className="s00-closure-formula-box">
              <span className="s00-formula-label">Principio formal rector:</span>
              <code className="s00-formula-code">{activeStep.formula}</code>
            </div>

            <div className="s00-closure-grid">
              <div className="s00-closure-card s00-closure-card--decision">
                <span className="s00-closure-card__title">Decisión metodológica en S00</span>
                <p>{activeStep.s00Decision}</p>
              </div>
              <div className="s00-closure-card s00-closure-card--risk">
                <span className="s00-closure-card__title">Riesgo epistemológico evitado</span>
                <p>{activeStep.epistemologicalRisk}</p>
              </div>
              <div className="s00-closure-card s00-closure-card--bridge">
                <span className="s00-closure-card__title">Puente formal hacia Sesión 01</span>
                <p>{activeStep.s01Bridge}</p>
              </div>
            </div>

            {/* Epistemological Covenant */}
            <div className="s00-closure-covenant">
              <span className="s00-covenant-tag">CONTRATO EPISTEMOLÓGICO DEL CURSO</span>
              <strong>La salida del modelo nunca es la conclusión científica final.</strong>
              <p>
                Toda inferencia de ML es evidencia condicionada por el observable físico, los
                supuestos generativos, el protocolo de evaluación y los límites del instrumento.
              </p>
            </div>
          </article>
        )}
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      {flashcardState.isOpen && (
        <S00FlashcardModal
          collectionKey={flashcardState.collection}
          activeCardId={flashcardState.cardId}
          onClose={closeFlashcard}
          onSelectCard={(id) => setFlashcardState((prev) => ({ ...prev, cardId: id }))}
        />
      )}
    </>
  );
}

function ImpactDetail({
  item,
  compact,
  onOpenFlashcard,
}: {
  item: S00ImpactCase;
  compact: boolean;
  onOpenFlashcard?: (id: string) => void;
}) {
  return (
    <article className="s00-impact-detail" aria-live={compact ? undefined : 'polite'}>
      <div className="s00-impact-preview-bar">
        <button
          type="button"
          className="s00-impact-miniature-card"
          onClick={() => onOpenFlashcard?.(item.id)}
          title="Ampliar ficha técnica del estudio publicado"
        >
          <img
            src={assetUrl(item.miniatureSrc)}
            alt={`Miniatura del estudio: ${item.title}`}
            className="s00-impact-miniature-img"
            loading="lazy"
            width="200"
            height="100"
          />
          <span className="s00-impact-miniature-action">
            <span>Ficha del paper</span> 🔍
          </span>
        </button>
        <div className="s00-impact-preview-summary">
          <div className="s00-impact-preview-meta">
            <span className="s00-stage-tag">{item.number} · ESTUDIO ARBITRADO</span>
            <span className="s00-impact-mission-badge">{item.mission}</span>
          </div>
          <h4>{item.title}</h4>
          <p className="s00-impact-preview-journal">
            Publicación arbitrada ({item.study?.year}): {item.study?.journal}
          </p>
        </div>
        <button
          type="button"
          className="s00-flashcard-trigger-btn"
          onClick={() => onOpenFlashcard?.(item.id)}
        >
          <span>Ficha de impacto 🔍</span>
        </button>
      </div>

      <div className="s00-impact-detail__grid">
        <div className="s00-impact-detail__col">
          <div className="s00-impact-detail__section">
            <span className="s00-impact-detail__section-title">Problema astronómico</span>
            <p>{item.problem}</p>
          </div>
          <div className="s00-impact-detail__section">
            <span className="s00-impact-detail__section-title">Dato y representación</span>
            <p>{item.data}</p>
          </div>
          <div className="s00-impact-detail__section">
            <span className="s00-impact-detail__section-title">
              Intervención de Machine Learning
            </span>
            <p>{item.intervention}</p>
          </div>
        </div>

        <div className="s00-impact-detail__col">
          <div className="s00-impact-detail__section s00-impact-detail__section--result">
            <span className="s00-impact-detail__section-title">Resultado obtenido</span>
            <p className="s00-impact-detail__result">{item.result}</p>
          </div>
          <div className="s00-impact-detail__section s00-impact-detail__section--limit">
            <span className="s00-impact-detail__section-title">
              ⚠️ Límite epistemológico y dominio
            </span>
            <p className="s00-impact-detail__limit">{item.limit}</p>
          </div>
          <div className="s00-impact-detail__section">
            <span className="s00-impact-detail__section-title">Estado de la afirmación</span>
            <p className="s00-impact-detail__source">{item.claimStatus}</p>
          </div>
        </div>
      </div>

      {/* Academic Paper & Data Resources */}
      {item.study && (
        <div className="s00-impact-study-box">
          <div className="s00-impact-study-meta">
            <span className="s00-study-tag">Publicación científica de procedencia</span>
            <h4 className="s00-study-title">{item.study.title}</h4>
            <p className="s00-study-byline">
              {item.study.authors} ({item.study.year}) · <em>{item.study.journal}</em>
            </p>
          </div>
          <div className="s00-impact-study-actions">
            {item.study.doi && (
              <a
                href={item.study.url}
                target="_blank"
                rel="noopener noreferrer"
                className="s00-badge-link"
                title={`Ver publicación DOI ${item.study.doi}`}
              >
                <span>DOI: {item.study.doi}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {item.study.arxivUrl && (
              <a
                href={item.study.arxivUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="s00-badge-link s00-badge-link--arxiv"
                title="Ver preprint en arXiv"
              >
                <span>arXiv</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {item.dataArchive && (
              <a
                href={item.dataArchive.url}
                target="_blank"
                rel="noopener noreferrer"
                className="s00-badge-link s00-badge-link--data"
                title={`Acceder a datos en ${item.dataArchive.name}`}
              >
                <span>{item.dataArchive.name}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {item.codeRepo && (
              <a
                href={item.codeRepo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="s00-badge-link s00-badge-link--code"
                title={`Ver repositorio de código: ${item.codeRepo.name}`}
              >
                <span>{item.codeRepo.name}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function BranchDetail({ branch, compact }: { branch: S00Branch; compact: boolean }) {
  return (
    <article className="s00-branch-detail" aria-live={compact ? undefined : 'polite'}>
      <div className="s00-branch-detail__header">
        <span className="s00-branch-detail__label">{branch.kicker}</span>
        <h3>{branch.question}</h3>
      </div>

      <dl className="s00-branch-detail__grid">
        <div className="s00-branch-prop-card">
          <dt>Producto concreto entregable</dt>
          <dd>{branch.product}</dd>
        </div>
        <div className="s00-branch-prop-card">
          <dt>Responsabilidad epistemológica</dt>
          <dd>{branch.responsibility}</dd>
        </div>
      </dl>

      {/* Toolchain Badges */}
      <div className="s00-branch-tools-section">
        <span className="s00-branch-tools-title">Ecosistema Python del curso:</span>
        <div className="s00-branch-tools-list">
          {branch.tools.map((tool) => (
            <span key={tool} className="s00-tool-badge">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Interdependence Matrix */}
      <div className="s00-branch-interdep-grid">
        <div className="s00-interdep-card s00-interdep-card--gives">
          <strong>Aporta a las demás ramas:</strong>
          <p>{branch.givesToOthers}</p>
        </div>
        <div className="s00-interdep-card s00-interdep-card--receives">
          <strong>Recibe de las demás ramas:</strong>
          <p>{branch.receivesFromOthers}</p>
        </div>
      </div>
    </article>
  );
}

function S00OpeningStage({
  unit,
  slideNumber,
  teacherMode,
}: {
  unit: S00Unit;
  slideNumber: string;
  teacherMode: boolean;
}) {
  const currentUnitNum = slideNumber.split('.')[0] ?? '01';
  return (
    <article className="s00-opening-stage" aria-labelledby="s00-opening-title">
      <div className="s00-opening-stage__header">
        <div className="s00-opening-stage__meta">
          <div className="s00-opening-stage__kicker-group">
            <span className="s00-stage-kicker">01 · ABRIR · PREGUNTA GUÍA</span>
            <p className="s00-opening-stage__arrival">
              <strong>Punto de partida:</strong> Una señal débil, una curiosidad científica.
            </p>
          </div>
          <div
            className="s00-opening-stage__counter"
            aria-label={`Estación ${currentUnitNum} de ${s00Units.length}`}
          >
            <span>{currentUnitNum.padStart(2, '0')}</span>
            <small> / {String(s00Units.length).padStart(2, '0')}</small>
          </div>
        </div>
        <h2 id="s00-opening-title">{unit.title}</h2>
      </div>

      <div className="s00-opening-stage__hero-question">
        <span className="s00-opening-stage__question-label">Pregunta de partida</span>
        <p className="s00-opening-stage__question-text">{unit.question}</p>
      </div>

      <div className="s00-opening-stage__body">
        <p className="s00-opening-stage__idea">{unit.idea}</p>
        <p className="s00-opening-stage__content">{unit.content}</p>
      </div>

      <div className="s00-opening-stage__footer">
        <div className="s00-opening-stage__pill">
          <span className="s00-opening-stage__pill-label">Qué llevar</span>
          <p>{unit.interpretation}</p>
        </div>
        <div className="s00-opening-stage__pill s00-opening-stage__pill--limit">
          <span className="s00-opening-stage__pill-label">Límite metodológico</span>
          <p>{unit.limits}</p>
        </div>
      </div>

      {teacherMode && <TeacherPrompt prompt={unit.teacherPrompt} teacherMode={teacherMode} />}
    </article>
  );
}

function S00ReadingSection({
  unit,
  index,
  teacherMode,
}: {
  unit: S00Unit;
  index: number;
  teacherMode: boolean;
}) {
  return (
    <section
      className="s00-reading__section"
      data-tone={unit.tone}
      id={'s00-reading-' + unit.id}
      aria-labelledby={'s00-reading-' + unit.id + '-title'}
    >
      <div className="s00-reading__counter">
        {String(index + 1).padStart(2, '0')} / {String(s00Units.length).padStart(2, '0')} ·{' '}
        {unit.groupLabel}
      </div>
      <div className="s00-reading__grid">
        <div className="s00-reading__text">
          <p className="s00-reading__label">{unit.partLabel}</p>
          <h2 id={'s00-reading-' + unit.id + '-title'}>{unit.title}</h2>
          <div className="s00-reading__question">
            <span>Pregunta de lectura</span>
            <p>{unit.question}</p>
          </div>
          <p className="s00-reading__idea">{unit.idea}</p>
          <p>{unit.content}</p>
          <div className="s00-reading__interpretation">
            <p>
              <strong>Interpretación:</strong> {unit.interpretation}
            </p>
            <p>
              <strong>Límite:</strong> {unit.limits}
            </p>
          </div>
          <ConceptStrip unit={unit} />
          <CautionBox caution={unit.caution} />
          {teacherMode && <TeacherPrompt prompt={unit.teacherPrompt} teacherMode={teacherMode} />}
        </div>
        <div className="s00-reading__visual">
          <VisualFrame unit={unit} compact />
          <p className="s00-visual__caption">{unit.visualCaption}</p>
        </div>
      </div>
    </section>
  );
}

function S00Glossary() {
  return (
    <section className="s00-glossary" aria-labelledby="s00-glossary-title">
      <div>
        <p className="s00-reading__label">Vocabulario de la sesión</p>
        <h2 id="s00-glossary-title">Palabras para seguir la cadena</h2>
      </div>
      <dl>
        {s00Glossary.map((concept) => (
          <div id={'s00-glossary-' + concept.id} key={concept.id}>
            <dt>{concept.term}</dt>
            <dd>{concept.definition}</dd>
          </div>
        ))}
      </dl>
      <p className="s00-glossary__note">
        Estas definiciones son ayudas internas de S00 y preparan los conceptos que se formalizarán
        en sesiones posteriores.
      </p>
    </section>
  );
}

function S00Activities({
  state,
  onChange,
}: {
  state: ActivityState;
  onChange: (id: keyof ActivityState) => void;
}) {
  const completed = activityItems.filter((item) => state[item.id]).length;
  return (
    <section className="s00-activities" aria-labelledby="s00-activities-title">
      <div className="s00-activities__intro">
        <p className="s00-reading__label">Producto diagnóstico · 5 movimientos</p>
        <h2 id="s00-activities-title">Construye una cadena que se pueda discutir</h2>
        <p>
          Marca cada paso cuando puedas mostrarlo con un ejemplo. Las casillas conservan tu avance
          local; el resultado sigue siendo una producción de aprendizaje, no una validación
          científica.
        </p>
        <div className="s00-activities__status" role="status" aria-live="polite">
          {completed} de {activityItems.length} movimientos completados.
        </div>
      </div>
      <ol className="s00-activities__list">
        {activityItems.map((item, index) => (
          <li key={item.id} data-complete={state[item.id]}>
            <label>
              <span className="s00-activity-index">0{index + 1}</span>
              <input type="checkbox" checked={state[item.id]} onChange={() => onChange(item.id)} />
              <span className="s00-activity-copy">
                <strong>{item.label}</strong>
                <small>{item.hint}</small>
              </span>
            </label>
          </li>
        ))}
      </ol>
      <aside className="s00-activities__result">
        <span>Al finalizar</span>
        <strong>pregunta → dato → tarea → evaluación → límite</strong>
        <p>Usa esta secuencia como ticket de salida o como punto de partida para S01.</p>
      </aside>
    </section>
  );
}

function S00BibliographyStage() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedIds(new Set(s00BibliographyReferences.map((ref) => ref.id)));
  };

  const handleCollapseAll = () => {
    setExpandedIds(new Set());
  };

  return (
    <div className="s00-bibliography-stage">
      <aside className="s00-bibliography-stage__lead">
        <span className="s00-stage-kicker">00 · Referencias de partida</span>
        <h2>Fuentes de la sesión</h2>
        <p>
          Artículos, catálogos y misiones que sustentan los métodos observacionales, datos y tareas
          de aprendizaje automático de esta introducción.
        </p>

        <div className="s00-bibliography-stage__actions">
          <span className="s00-bibliography-stage__count">
            {s00BibliographyReferences.length} fuentes
          </span>
          <div className="s00-bibliography-stage__btn-group">
            <button type="button" className="s00-biblio-btn" onClick={handleExpandAll}>
              Expandir todas
            </button>
            <button type="button" className="s00-biblio-btn" onClick={handleCollapseAll}>
              Contraer todas
            </button>
          </div>
        </div>

        <p className="s00-bibliography-stage__hint">
          Cada recuadro muestra el título del trabajo y su función didáctica. Amplía cualquier caja
          para ver autores completos, detalles de publicación y el enlace directo al recurso.
        </p>
      </aside>

      <section className="s00-bibliography-stage__grid" aria-label="Lista de fuentes de partida">
        {s00BibliographyReferences.map((reference) => {
          const isExpanded = expandedIds.has(reference.id);
          const href = referenceHref(reference);
          const author = referenceAuthor(reference);
          const meta = referenceMeta(reference);
          const knownLocation = [
            reference.chapter && `Capítulo(s) ${reference.chapter}`,
            reference.section && `Sección ${reference.section}`,
          ]
            .filter(Boolean)
            .join(' · ');

          const shortAuthor =
            reference.authors && reference.authors.length > 0
              ? reference.authors[0]
              : (reference.institution ?? 'Fuente');

          return (
            <article
              key={reference.id}
              className={`s00-biblio-box ${isExpanded ? 'is-expanded' : ''}`}
              data-reference-id={reference.id}
            >
              <div className="s00-biblio-box__header">
                <div className="s00-biblio-box__heading">
                  <h3 className="s00-biblio-box__title">{reference.title}</h3>
                  <span className="s00-biblio-box__byline">
                    {shortAuthor}
                    {reference.year ? ` · ${reference.year}` : ''}
                  </span>
                </div>
                <button
                  type="button"
                  className="s00-biblio-box__toggle"
                  aria-expanded={isExpanded}
                  aria-controls={`biblio-details-${reference.id}`}
                  onClick={() => toggleExpand(reference.id)}
                >
                  <span>{isExpanded ? 'Contraer' : 'Ampliar'}</span>
                  <span className="s00-biblio-box__chevron" aria-hidden="true">
                    {isExpanded ? '▴' : '▾'}
                  </span>
                </button>
              </div>

              <p className="s00-biblio-box__lead">{reference.didacticFunction}</p>

              {isExpanded && (
                <div id={`biblio-details-${reference.id}`} className="s00-biblio-box__details">
                  <dl className="s00-biblio-box__meta-grid">
                    <div>
                      <dt>Autoría / Institución</dt>
                      <dd>{author}</dd>
                    </div>
                    {meta && (
                      <div>
                        <dt>Detalles de publicación</dt>
                        <dd>{meta}</dd>
                      </div>
                    )}
                    {(knownLocation || reference.location) && (
                      <div>
                        <dt>Ubicación</dt>
                        <dd>
                          {knownLocation && <strong>{knownLocation}</strong>}
                          {knownLocation && reference.location && ': '}
                          {reference.location}
                        </dd>
                      </div>
                    )}
                  </dl>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="s00-biblio-box__link"
                    >
                      Ver la fuente en su sitio ↗
                    </a>
                  ) : (
                    <span className="s00-biblio-box__no-link">
                      No hay enlace externo declarado.
                    </span>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default function S00LearningJourney({ config }: { config: CourseConfig }) {
  const settings = useMemo(() => defineCourseConfig(config), [config]);
  const [hydrated, setHydrated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [displayMode, setDisplayMode] = useState<CourseDisplayMode>(settings.defaultView);
  const [activityState, setActivityState] = useState<ActivityState>(emptyActivityState);
  const [selectedConceptId, setSelectedConceptId] = useState<
    'exoplaneta' | 'transito' | 'espectro' | 'representacion'
  >('transito');
  const [selectedDataCardId, setSelectedDataCardId] = useState('observacion');
  const [selectedVerb, setSelectedVerb] = useState('detectar');
  const [selectedImpactCaseId, setSelectedImpactCaseId] = useState('astronet');
  const [selectedBranchId, setSelectedBranchId] = useState('astronomia');
  const [selectedClosureStepId, setSelectedClosureStepId] = useState('pregunta');
  const activeSlide: S00Slide | undefined = activeIndex > 0 ? s00Slides[activeIndex] : undefined;
  const activeUnit = activeSlide ? s00Units[activeSlide.unitIndex] : undefined;
  const activePart = activeSlide
    ? getS00Part(activeSlide.unitId, activeSlide.partIndex)
    : undefined;
  const activeParts = activeUnit ? getS00Parts(activeUnit.id) : [];
  const activeVisualFocus = activePart?.visualFocus ?? 'overview';

  useEffect(() => {
    function syncLocation() {
      const mode = new URLSearchParams(window.location.search).get('modo');
      const resolvedMode: CourseDisplayMode =
        mode === 'lectura'
          ? 'reading'
          : mode === 'actividades'
            ? 'activities'
            : mode === 'presentacion'
              ? 'presentation'
              : settings.defaultView;
      setDisplayMode(resolvedMode);
      const index = getS00SlideIndexFromHash(window.location.hash);
      setActiveIndex(index === null ? 1 : index);
    }

    setHydrated(true);
    syncLocation();
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => {
      window.removeEventListener('hashchange', syncLocation);
      window.removeEventListener('popstate', syncLocation);
    };
  }, [settings.defaultView]);

  useEffect(() => {
    setSelectedDataCardId(
      activeUnit?.visualKind === 'data-landscape' ? activeVisualFocus : 'observacion',
    );
    setSelectedVerb(activeUnit?.visualKind === 'ml-verbs' ? activeVisualFocus : 'detectar');
    setSelectedImpactCaseId(
      activeUnit?.visualKind === 'impact-gallery' ? activeVisualFocus : 'astronet',
    );
    setSelectedBranchId(activeUnit?.visualKind === 'branches' ? activeVisualFocus : 'astronomia');
    setSelectedClosureStepId(activeUnit?.visualKind === 'closure' ? activeVisualFocus : 'pregunta');
  }, [activeIndex, activeUnit?.visualKind, activeVisualFocus]);

  function updateHash(index: number, replace = false) {
    const hash = getS00SlideHash(index);
    if (replace) window.history.replaceState(window.history.state, '', hash);
    else window.history.pushState(window.history.state, '', hash);
  }

  function selectSlide(index: number) {
    const boundedIndex = Math.min(Math.max(index, 0), s00Slides.length - 1);
    setActiveIndex(boundedIndex);
    updateHash(boundedIndex);
  }

  function changeDisplayMode(nextMode: CourseDisplayMode) {
    setDisplayMode(nextMode);
    const url = new URL(window.location.href);
    if (nextMode === 'reading') url.searchParams.set('modo', 'lectura');
    else if (nextMode === 'activities') url.searchParams.set('modo', 'actividades');
    else url.searchParams.delete('modo');
    window.history.pushState(window.history.state, '', url.pathname + url.search + url.hash);
  }

  function reset() {
    setActiveIndex(1);
    setSelectedConceptId('transito');
    setActivityState(emptyActivityState());
    const url = new URL(window.location.href);
    url.hash = 'pregunta';
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  }

  const completedActivities = activityItems.filter((item) => activityState[item.id]).length;

  return (
    <section
      className="s00-journey"
      data-ready="true"
      data-hydrated={hydrated ? 'true' : undefined}
      data-session-id="S00"
      data-active-slide={activeIndex}
      data-slide-count={s00Slides.length}
      data-display-mode={displayMode}
      data-bibliography={activeIndex === 0}
      data-active-unit={activeSlide?.unitId}
      data-active-part={activeSlide?.partId}
      data-part-index={activeSlide?.partIndex ?? 0}
      data-interaction-mode={settings.interactionMode}
      aria-labelledby="s00-journey-title"
    >
      <header className="s00-journey__header">
        <div className="s00-journey__masthead">
          <p className="eyebrow">Sesión 0 · introducción · 90 min</p>
          <h1 id="s00-journey-title">De los mundos a los datos</h1>
          <p>Una señal débil, una pregunta científica, una cadena de decisiones.</p>
        </div>
        <div className="s00-journey__toggles">
          <button type="button" className="s00-overview-toggle" onClick={() => selectSlide(0)}>
            Fuentes
          </button>
          <div className="s00-display-switch" aria-label="Modo de lectura">
            <button
              type="button"
              aria-pressed={displayMode === 'presentation'}
              onClick={() => changeDisplayMode('presentation')}
            >
              Presentación
            </button>
            <button
              type="button"
              aria-pressed={displayMode === 'reading'}
              onClick={() => changeDisplayMode('reading')}
            >
              Lectura
            </button>
            <button
              type="button"
              aria-pressed={displayMode === 'activities'}
              onClick={() => changeDisplayMode('activities')}
            >
              Actividades
            </button>
          </div>
        </div>
      </header>

      {displayMode === 'presentation' && (
        <SlideRail
          slides={s00Slides}
          activeIndex={activeIndex}
          activeLabel={
            activeIndex === 0
              ? 'Fuentes'
              : activeUnit?.shortLabel === activePart?.label
                ? (activePart?.label ?? 'S00')
                : (activeUnit?.shortLabel ?? 'S00') + ' · ' + (activePart?.label ?? '')
          }
          className="slide-rail--s00-presentation"
          compactCaption
          hideCaption
          ariaLabel="Diapositivas de S00"
          progressLabel="Avance de las diapositivas de S00"
          getIndexLabel={(slide) => getS00SlideNumber(slide)}
          getAriaLabel={(slide, index) =>
            index === 0
              ? '0. Fuentes de S00'
              : slide.partIndex === 0
                ? `${slide.unitIndex + 1}. ${slide.title}`
                : `Subslide ${getS00SlideNumber(slide)} · ${slide.groupLabel} · ${slide.partLabel}`
          }
          onSelect={(_slide, index) => selectSlide(index)}
        />
      )}

      <div className="s00-journey__content">
        {displayMode === 'activities' ? (
          <S00Activities
            state={activityState}
            onChange={(id) => setActivityState((current) => ({ ...current, [id]: !current[id] }))}
          />
        ) : displayMode === 'reading' ? (
          <article className="s00-reading" aria-labelledby="s00-reading-title">
            <header className="s00-reading__header">
              <p className="s00-reading__label">Lectura lineal · nueve estaciones</p>
              <h2 id="s00-reading-title">La pregunta viaja con la evidencia</h2>
              <p>
                La lectura conserva la cadena completa, sus visuales, las fuentes y los límites.
                Cada estación tiene solo las partes que necesita para presentar su idea.
              </p>
            </header>
            <SessionBibliography {...s00Bibliography} />
            <div className="s00-reading__body">
              {s00Units.map((unit, index) => (
                <S00ReadingSection
                  key={unit.id}
                  unit={unit}
                  index={index}
                  teacherMode={settings.teacherMode}
                />
              ))}
            </div>
            <S00Glossary />
          </article>
        ) : activeIndex === 0 ? (
          <S00BibliographyStage />
        ) : activeUnit && activeSlide && activePart ? (
          <div
            className="s00-workspace"
            data-pilot={activeParts.length > 1}
            data-part-index={activeSlide.partIndex}
          >
            {activeParts.length > 1 && (
              <nav className="s00-parts" aria-label="Partes de la estación">
                {activeParts.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={index === activeSlide.partIndex ? 'step' : undefined}
                    onClick={() => selectSlide(getS00SlideIndex(activeUnit.id, index))}
                  >
                    {getS00SlideNumber({
                      unitId: activeUnit.id,
                      unitIndex: activeSlide.unitIndex,
                      partIndex: index,
                    })}{' '}
                    · {item.label}
                  </button>
                ))}
              </nav>
            )}
            {activeUnit.id === 's00-pregunta' && activeSlide.partIndex === 0 ? (
              <div className="s00-scene-deck">
                <S00OpeningStage
                  unit={activeUnit}
                  slideNumber={getS00SlideNumber(activeSlide)}
                  teacherMode={settings.teacherMode}
                />
              </div>
            ) : (
              <div className="s00-scene-deck">
                <section className="s00-scene" aria-labelledby="s00-scene-title">
                  <div className="s00-scene__header">
                    <div>
                      <span className="s00-stage-kicker">
                        {getS00SlideNumber(activeSlide)} · {activeUnit.groupLabel} ·{' '}
                        {activePart.label}
                      </span>
                      <h2 id="s00-scene-title">
                        {activeSlide.partIndex === 0 ? activeUnit.title : activePart.label}
                      </h2>
                    </div>
                    <span className="s00-scene__status">explorar · nombrar · limitar</span>
                  </div>
                  <VisualFrame
                    unit={activeUnit}
                    part={activePart}
                    selectedConceptId={selectedConceptId}
                    onSelectConcept={setSelectedConceptId}
                    selectedDataCardId={selectedDataCardId}
                    onSelectDataCard={setSelectedDataCardId}
                    selectedVerb={selectedVerb}
                    onSelectVerb={setSelectedVerb}
                    selectedImpactCaseId={selectedImpactCaseId}
                    onSelectImpactCase={setSelectedImpactCaseId}
                    selectedBranchId={selectedBranchId}
                    onSelectBranch={setSelectedBranchId}
                    selectedClosureStepId={selectedClosureStepId}
                    onSelectClosureStep={setSelectedClosureStepId}
                    onSelectSlide={selectSlide}
                  />
                  <p className="s00-visual__caption">{activeUnit.visualCaption}</p>
                  <div className="s00-scene__narrative">
                    <p>{activeUnit.content}</p>
                  </div>
                  <details className="s00-scene__depth">
                    <summary>Marco conceptual, qué llevar y límites</summary>
                    <div className="s00-scene__depth-body">
                      <div>
                        <strong>Pregunta:</strong> {activeUnit.question}
                      </div>
                      <div>
                        <strong>Idea:</strong> {activeUnit.idea}
                      </div>
                      <div>
                        <strong>Qué llevar:</strong> {activeUnit.interpretation}
                      </div>
                      <div>
                        <strong>Límite:</strong> {activeUnit.limits}
                      </div>
                    </div>
                  </details>
                </section>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <footer className="s00-journey__footer">
        <p className="s00-state-summary" aria-live="polite">
          {displayMode === 'activities'
            ? 'Rama de actividades. ' +
              completedActivities +
              ' de ' +
              activityItems.length +
              ' movimientos completados.'
            : activeIndex === 0
              ? 'Diapositiva 0. Fuentes de S00.'
              : 'Modo ' +
                (displayMode === 'reading' ? 'lectura lineal' : 'presentación') +
                '. Subpantalla ' +
                (activeSlide ? getS00SlideNumber(activeSlide) : 'S00') +
                ' de ' +
                s00Slides.length +
                ': ' +
                (activePart?.label ?? activeUnit?.title ?? 'S00') +
                '.'}
        </p>
        <div className="s00-journey__actions" aria-label="Controles del recorrido">
          {displayMode === 'presentation' ? (
            <>
              <button
                type="button"
                onClick={() => selectSlide(activeIndex - 1)}
                disabled={activeIndex === 0}
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => selectSlide(activeIndex + 1)}
                disabled={activeIndex === s00Slides.length - 1}
              >
                Siguiente →
              </button>
            </>
          ) : displayMode === 'reading' ? (
            <button
              type="button"
              onClick={() => document.getElementById('s00-reading-title')?.scrollIntoView()}
            >
              ↑ Volver al inicio
            </button>
          ) : (
            <button type="button" onClick={() => changeDisplayMode('presentation')}>
              ← Volver al recorrido
            </button>
          )}
          <button type="button" className="s00-reset" onClick={reset}>
            Reiniciar
          </button>
        </div>
      </footer>
    </section>
  );
}
