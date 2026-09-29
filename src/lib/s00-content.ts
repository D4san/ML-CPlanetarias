import type { ConceptTermData } from './contextual-content';
import type {
  BibliographyReference,
  CautionContent,
  SessionBibliographyContent,
  TeacherPromptContent,
} from './pedagogical-content';
import type { SlideRailItem } from './slide-rail';

export type S00VisualKind =
  | 'hero'
  | 'planetary-science'
  | 'question-lab'
  | 'measurement'
  | 'data-landscape'
  | 'ml-verbs'
  | 'impact-gallery'
  | 'branches'
  | 'closure';

export interface S00ConceptCard {
  id: 'exoplaneta' | 'transito' | 'espectro' | 'representacion';
  conceptId: string;
  title: string;
  kicker: string;
  badge: string;
  shortDefinition: string;
  description: string;
  target: string;
  instrument: string;
  dataType: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  imageWidth: number;
  imageHeight: number;
  imageCredit: S00PaperFigureCredit;
  study: {
    authors: string;
    year: number;
    title: string;
    journal: string;
    doi?: string;
    url: string;
    arxivUrl?: string;
  };
  dataArchive?: {
    name: string;
    url: string;
    badge: string;
  };
  codeRepo?: {
    name: string;
    url: string;
  };
  limit: string;
}

export interface S00PaperFigureCredit {
  figure: string;
  citation: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  changes: string;
}

export interface S00DataCard {
  id: string;
  number: string;
  title: string;
  kicker: string;
  body: string;
  question: string;
  risk: string;
  tone: 'data' | 'model' | 'question' | 'decision' | 'transfer';
  mathematicalForm: string;
  exoplanetSource: string;
  dataStructure: string;
  dominantBias: string;
  miniatureSrc: string;
  diagramDetail: {
    badge: string;
    description: string;
  };
}

export interface S00MLVerb {
  id: 'detectar' | 'clasificar' | 'estimar' | 'describir' | 'priorizar';
  number: string;
  verb: string;
  label: string;
  kicker: string;
  mathematicalMapping: string;
  lossFunction: string;
  outputSpace: string;
  exoplanetProblem: string;
  classicalBaseline: string;
  mlApproach: string;
  validationMetric: string;
  failureMode: string;
  tone: 'data' | 'model' | 'decision' | 'transfer' | 'limit';
  miniatureSrc: string;
  diagramDetail: {
    badge: string;
    description: string;
  };
}

export interface S00ImpactCase {
  id: string;
  number: string;
  title: string;
  mission: string;
  sourceId: string;
  problem: string;
  data: string;
  intervention: string;
  figure: string;
  figureLabel: string;
  result: string;
  limit: string;
  claimStatus: string;
  tone: 'data' | 'model' | 'decision' | 'limit';
  miniatureSrc: string;
  study: {
    authors: string;
    year: number;
    title: string;
    journal: string;
    doi?: string;
    url: string;
    arxivUrl?: string;
  };
  dataArchive?: {
    name: string;
    url: string;
    badge: string;
  };
  codeRepo?: {
    name: string;
    url: string;
  };
}

export interface S00ClosureChallengeOption {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
}

export interface S00ClosureChallenge {
  question: string;
  options: readonly S00ClosureChallengeOption[];
}

export interface S00ClosureStep {
  id: string;
  number: string;
  stepName: string;
  title: string;
  subtitle: string;
  s00Decision: string;
  epistemologicalRisk: string;
  s01Bridge: string;
  formula: string;
  tone: 'question' | 'data' | 'model' | 'decision' | 'limit';
  challenge: S00ClosureChallenge;
}

export interface S00PlanetaryPillar {
  id: 'origen' | 'estructura' | 'evolucion' | 'habitabilidad';
  number: string;
  title: string;
  subtitle: string;
  tone: 'question' | 'data' | 'model' | 'transfer';
  question: string;
  physicalDefinition: string;
  processes: readonly string[];
  observables: string;
  instruments: string;
  mlRole: string;
  physicalLimit: string;
  miniatureSrc: string;
  formula: string;
}

export interface S00Flashcard {
  id: string;
  collectionId: 'pillars' | 'modalities' | 'datacards' | 'verbs' | 'impact';
  collectionTitle: string;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
  tone: 'question' | 'data' | 'model' | 'decision' | 'transfer' | 'limit';
  miniatureSrc: string;
  miniatureAlt: string;
  miniatureCaption: string;
  physicalConcept: string;
  formula?: string;
  formulaDescription?: string;
  observableVsInference?: {
    observable: string;
    inference: string;
  };
  mlRole: string;
  instrumentsOrData?: string;
  riskOrLimit: string;
  studyOrProvenance?: {
    authors: string;
    year: number;
    title: string;
    journal?: string;
    doi?: string;
    url?: string;
    arxivUrl?: string;
    archiveName?: string;
    archiveUrl?: string;
    codeName?: string;
    codeUrl?: string;
  };
}

export interface S00FormulationStage {
  id: 'curiosidad' | 'unidad' | 'salida' | 'uso';
  number: string;
  stepName: string;
  title: string;
  subtitle: string;
  tone: 'question' | 'data' | 'model' | 'decision';
  decision: string;
  commonPitfall: string;
  caseDetection: {
    title: string;
    mission: string;
    description: string;
    instance: string;
  };
  caseCharacterization: {
    title: string;
    mission: string;
    description: string;
    instance: string;
  };
  validationGate: string;
  visualDetail: {
    badge: string;
    diagramType: 'curiosity-scope' | 'unit-discretization' | 'output-distribution' | 'usage-funnel';
    inputLabel: string;
    transformationLabel: string;
    outputLabel: string;
    formula?: string;
  };
}

export interface S00MeasurementModality {
  id: 'transito' | 'radial' | 'espectro' | 'imagen';
  number: string;
  title: string;
  subtitle: string;
  symbol: string;
  tone: 'question' | 'data' | 'model' | 'decision';
  narrativeLead: string;
  scientificIntention: {
    question: string;
    physicalMotivation: string;
  };
  governingEquation: string;
  equationDescription: string;
  rawObservable: string;
  inferredParameter: string;
  instruments: string;
  mlUnitFormulation: {
    instanceDefinition: string;
    tensorStructure: string;
    leakagePrevention: string;
  };
  mlOutput: {
    mathematicalForm: string;
    outputType: string;
    mlRole: string;
    typicalLossOrAlgorithm: string;
  };
  operationalUse: {
    action: string;
    followupCriterion: string;
    commonPitfall: string;
    validationGate: string;
  };
  physicalLimit: string;
  miniatureSrc: string;
  diagramDetail: {
    badge: string;
    description: string;
  };
}

export interface S00Branch {
  id: string;
  number: string;
  label: string;
  kicker: string;
  question: string;
  product: string;
  responsibility: string;
  tone: 'question' | 'model' | 'transfer';
  tools: readonly string[];
  givesToOthers: string;
  receivesFromOthers: string;
  miniatureSrc: string;
  diagramDetail: {
    badge: string;
    role: string;
  };
}

export interface S00Part {
  id: string;
  label: string;
  visualFocus?: string;
}

export type S00Unit = SlideRailItem & {
  id: string;
  function: 'opening' | 'science' | 'bridge' | 'closing';
  shortLabel: string;
  question: string;
  idea: string;
  content: string;
  interpretation: string;
  limits: string;
  conceptIds: readonly string[];
  visualKind: S00VisualKind;
  visualAlt: string;
  visualCaption: string;
  conceptCards?: readonly S00ConceptCard[];
  dataCards?: readonly S00DataCard[];
  mlVerbs?: readonly S00MLVerb[];
  impactCases?: readonly S00ImpactCase[];
  branches?: readonly S00Branch[];
  closureSteps?: readonly S00ClosureStep[];
  planetaryPillars?: readonly S00PlanetaryPillar[];
  formulationStages?: readonly S00FormulationStage[];
  measurementModalities?: readonly S00MeasurementModality[];
  caution: CautionContent;
  teacherPrompt: TeacherPromptContent;
};

export const s00VisualAssets = {
  hero: '/images/s00/s00-transit-hero.png',
  lightCurve: '/images/s00/plots/s00-light-curve.png',
  spectrum: '/images/s00/plots/s00-spectrum.png',
  impact: '/images/s00/plots/s00-impact-comparison.png',
  paperExoplanet: '/images/s00/papers/hr8799-miri-fig1.png',
  paperTransit: '/images/s00/papers/kepler90i-transit-fig12.png',
  paperSpectrum: '/images/s00/papers/wasp39b-spectrum-fig2.png',
  paperRepresentation: '/images/s00/papers/astronet-input-fig3.png',
  miniatures: {
    datosObservacion: '/images/s00/miniatures/s00-datos-observacion.png',
    datosCatalogo: '/images/s00/miniatures/s00-datos-catalogo.png',
    datosSimulacion: '/images/s00/miniatures/s00-datos-simulacion.png',
    datosEntrenamiento: '/images/s00/miniatures/s00-datos-entrenamiento.png',
    datosSalida: '/images/s00/miniatures/s00-datos-salida.png',
    verbDetectar: '/images/s00/miniatures/s00-verb-detectar.png',
    verbClasificar: '/images/s00/miniatures/s00-verb-clasificar.png',
    verbEstimar: '/images/s00/miniatures/s00-verb-estimar.png',
    verbDescribir: '/images/s00/miniatures/s00-verb-describir.png',
    verbPriorizar: '/images/s00/miniatures/s00-verb-priorizar.png',
    branchAstronomia: '/images/s00/miniatures/s00-branch-astronomia.png',
    branchTeoria: '/images/s00/miniatures/s00-branch-teoria.png',
    branchAplicacion: '/images/s00/miniatures/s00-branch-aplicacion.png',
    pillarOrigen: '/images/s00/miniatures/s00-pillar-origen.png',
    pillarEstructura: '/images/s00/miniatures/s00-pillar-estructura.png',
    pillarEvolucion: '/images/s00/miniatures/s00-pillar-evolucion.png',
    pillarHabitabilidad: '/images/s00/miniatures/s00-pillar-habitabilidad.png',
    medicionTransito: '/images/s00/miniatures/s00-medicion-transito.png',
    medicionRadial: '/images/s00/miniatures/s00-medicion-radial.png',
    medicionEspectro: '/images/s00/miniatures/s00-medicion-espectro.png',
    medicionImagen: '/images/s00/miniatures/s00-medicion-imagen.png',
    impactAstronet: '/images/s00/miniatures/s00-impact-astronet.png',
    impactEstabilidad: '/images/s00/miniatures/s00-impact-estabilidad.png',
    impactAtmosfera: '/images/s00/miniatures/s00-impact-atmosfera.png',
    impactContraste: '/images/s00/miniatures/s00-impact-contraste.png',
    impactRobovetter: '/images/s00/miniatures/s00-impact-robovetter.png',
    impactTess: '/images/s00/miniatures/s00-impact-tess.png',
  },
} as const;

export const s00BibliographyReferences: readonly BibliographyReference[] = [
  {
    id: 'national-academies-origins-worlds-life',
    authors: ['National Academies of Sciences, Engineering, and Medicine'],
    title:
      'Origins, Worlds, and Life: A Decadal Strategy for Planetary Science and Astrobiology 2023–2032',
    year: 2022,
    didacticFunction:
      'Situar las preguntas sobre origen, formación, evolución, habitabilidad y vida dentro de las ciencias planetarias.',
    url: 'https://nap.nationalacademies.org/resource/26522/interactive/',
  },
  {
    id: 'nasa-find-characterize',
    institution: 'NASA Science',
    title: 'How We Find and Characterize Exoplanets',
    didacticFunction:
      'Conectar métodos observacionales con detección, confirmación y caracterización.',
    url: 'https://science.nasa.gov/exoplanets/how-we-find-and-characterize/',
  },
  {
    id: 'nasa-exoplanet-archive',
    institution: 'NASA Exoplanet Archive',
    title: 'The NASA Exoplanet Archive: Data and Tools for Exoplanet Research',
    year: 2013,
    didacticFunction:
      'Introducir archivos, catálogos, productos de misión y herramientas de consulta.',
    url: 'https://exoplanetarchive.ipac.caltech.edu/docs/PASP_FINAL_The.NASA.Exoplanet.Archive.Data.and.Tools.for.Exoplanet.Research_July2013.pdf',
  },
  {
    id: 'nasa-kepler-data-products',
    institution: 'NASA Exoplanet Archive',
    title: 'Kepler Data Products Overview',
    didacticFunction:
      'Distinguir curvas de luz, candidatos, diagnósticos y otros productos de datos.',
    url: 'https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html',
  },
  {
    id: 'shallue-vanderburg-2018',
    authors: ['Shallue', 'Vanderburg'],
    title: 'Identifying Exoplanets with Deep Learning',
    year: 2018,
    didacticFunction:
      'Mostrar detección y priorización de señales temporales sin confundir score con confirmación.',
    doi: '10.3847/1538-3881/aa9e09',
  },
  {
    id: 'marquez-neila-2018',
    authors: ['Márquez-Neila', 'Madhusudhan', 'Knutson'],
    title: 'Supervised Atmospheric Retrieval for Exoplanets',
    year: 2018,
    didacticFunction:
      'Abrir la relación entre espectro, rejilla de modelos, parámetros e incertidumbre.',
    doi: '10.1038/s41550-018-0504-2',
  },
  {
    id: 'gomez-gonzalez-2018',
    authors: ['Gómez González', 'Absil', 'Van Droogenbroeck'],
    title: 'Supervised Detection of Exoplanets in High-Contrast Imaging',
    year: 2018,
    didacticFunction:
      'Examinar señales planetarias, speckles, inyecciones sintéticas y validación sim2real.',
    doi: '10.1051/0004-6361/201731961',
  },
  {
    id: 'armstrong-2021',
    authors: ['Armstrong et al.'],
    title: 'Exoplanet Validation with Machine Learning: 50 New Validated Kepler Planets',
    year: 2021,
    didacticFunction:
      'Separar clasificación, vetting y validación probabilística dentro de una cadena de evidencia.',
    doi: '10.1093/mnras/stab3692',
  },
  {
    id: 'tamayo-2016',
    authors: ['Tamayo et al.'],
    title: 'A Machine Learns to Predict the Stability of Tightly Packed Planetary Systems',
    year: 2016,
    didacticFunction:
      'Presentar ML como aproximador de una simulación y hacer visible el dominio de aplicación.',
    url: 'https://arxiv.org/abs/1610.05359',
  },
  {
    id: 'mccauliff-2015',
    authors: ['McCauliff et al.'],
    title: 'Automatic Classification of Kepler Planetary Transit Candidates',
    year: 2015,
    didacticFunction:
      'Introducir la clasificación automática de candidatos y la necesidad de revisar falsos positivos.',
    doi: '10.1088/0004-637X/806/1/6',
  },
];

export const s00Bibliography: SessionBibliographyContent = {
  sessionId: 'S00',
  label: 'S00 · fuentes para abrir el campo',
  title: 'De los mundos a los datos',
  intro:
    'La sesión usa exoplanetas como entrada para aprender a formular una pregunta, reconocer su medición y ubicar una tarea de aprendizaje automático dentro de una cadena de evidencia.',
  references: s00BibliographyReferences,
  note: 'Las ilustraciones y plots sintéticos de esta experiencia son originales y didácticos. El paquete de origen conserva status: drafting, visibility: internal, publish_ready: false y rights: pending; esta página sigue siendo un prototipo interno.',
};

export const s00Concepts: readonly ConceptTermData[] = [
  {
    id: 'exoplaneta',
    term: 'Exoplaneta',
    shortDefinition:
      'Planeta que orbita una estrella distinta del Sol; suele estudiarse mediante mediciones indirectas.',
    aliases: ['planeta extrasolar'],
    fullHref: '#s00-glossary-exoplaneta',
  },
  {
    id: 'transito',
    term: 'Tránsito',
    shortDefinition:
      'Disminución temporal del brillo de una estrella cuando un planeta pasa frente a ella desde nuestra línea de visión.',
    aliases: ['curva de luz'],
    fullHref: '#s00-glossary-transito',
  },
  {
    id: 'velocidad-radial',
    term: 'Velocidad radial',
    shortDefinition:
      'Cambio medible en el movimiento de la estrella a lo largo de nuestra línea de visión, asociado a la interacción gravitatoria con un compañero.',
    aliases: ['desplazamiento Doppler'],
    fullHref: '#s00-glossary-velocidad-radial',
  },
  {
    id: 'espectro',
    term: 'Espectro',
    shortDefinition:
      'Distribución de la señal con la longitud de onda; puede contener pistas sobre propiedades de una atmósfera o una estrella.',
    aliases: ['espectro de transmisión'],
    fullHref: '#s00-glossary-espectro',
  },
  {
    id: 'catalogo',
    term: 'Catálogo y metadatos',
    shortDefinition:
      'Tabla de objetos, mediciones y contexto observacional que permite seleccionar, comparar y rastrear casos.',
    aliases: ['archivo', 'tabla de propiedades'],
    fullHref: '#s00-glossary-catalogo',
  },
  {
    id: 'simulacion-inyeccion',
    term: 'Simulación e inyección',
    shortDefinition:
      'Datos sintéticos construidos con supuestos explícitos para explorar un sistema o probar si un procedimiento recupera una señal.',
    aliases: ['datos sintéticos'],
    fullHref: '#s00-glossary-simulacion-inyeccion',
  },
  {
    id: 'senal-ruido',
    term: 'Señal, ruido y artefacto',
    shortDefinition:
      'Distinciones de trabajo para preguntar qué estructura interesa, qué variación la oculta y qué proceso instrumental puede imitarla.',
    aliases: ['falso positivo'],
    fullHref: '#s00-glossary-senal-ruido',
  },
  {
    id: 'representacion',
    term: 'Representación',
    shortDefinition:
      'Forma concreta en que una medición entra al análisis: serie temporal, espectro, imagen, tabla o vector de características.',
    aliases: ['entrada'],
    fullHref: '#s00-glossary-representacion',
  },
  {
    id: 'tarea-salida',
    term: 'Tarea y salida',
    shortDefinition:
      'Acción que se pide al sistema y objeto que devuelve: detectar, clasificar, estimar, describir o priorizar.',
    aliases: ['objetivo', 'score', 'posterior'],
    fullHref: '#s00-glossary-tarea-salida',
  },
  {
    id: 'generalizacion',
    term: 'Generalización y desplazamiento de dominio',
    shortDefinition:
      'Capacidad de mantener una conducta útil cuando cambian instrumento, población, ruido o rango físico respecto del desarrollo.',
    aliases: ['domain shift'],
    fullHref: '#s00-glossary-generalizacion',
  },
  {
    id: 'evaluacion-limite',
    term: 'Evaluación y límite',
    shortDefinition:
      'Criterio y condición que permiten interpretar una salida dentro de un contexto, con sus supuestos y alternativas.',
    aliases: ['calibración', 'validez'],
    fullHref: '#s00-glossary-evaluacion-limite',
  },
];

export const s00ConceptCards: readonly S00ConceptCard[] = [
  {
    id: 'exoplaneta',
    conceptId: 'exoplaneta',
    title: 'Exoplaneta',
    kicker: '01 · el mundo en 2D',
    badge: 'Imagen directa',
    shortDefinition:
      'Planeta que orbita una estrella distinta del Sol; la inmensa mayoría solo se revela por sus efectos indirectos.',
    description:
      'En casos excepcionales de planetas jóvenes, calientes, masivos (>1 MJup) y distantes (>10 UA), la óptica adaptativa y la coronografía logran enmascarar el halo estelar para resolver los mundos como fuentes puntuales individuales y rastrear sus órbitas con astrometría multianual.',
    target: 'Sistema HR 8799: planetas b, c, d y e',
    instrument: 'JWST/MIRI (figura de 2024); Keck y Gemini (descubrimiento de Marois et al., 2008)',
    dataType:
      'Imágenes coronagráficas en cuatro filtros MIRI, antes y después de sustraer la estrella de referencia',
    imageSrc: s00VisualAssets.paperExoplanet,
    imageAlt:
      'Figura de ocho paneles en cuatro filtros MIRI: imágenes coronagráficas originales arriba y con sustracción de estrella de referencia abajo; los planetas aparecen señalados en algunos filtros.',
    imageCaption:
      'Las columnas comparan F1065C, F1140C, F1550C y F2100W. La detección cambia entre filtros; la figura también señala un objeto de fondo y una estructura de polvo interior.',
    imageWidth: 2100,
    imageHeight: 1116,
    imageCredit: {
      figure: 'Figura 1',
      citation:
        'Boccaletti et al. (2024), “Imaging detection of the inner dust belt and the four exoplanets in the HR 8799 system with JWST’s MIRI coronagraph”, A&A, 686, A33. DOI: 10.1051/0004-6361/202347912',
      sourceUrl: 'https://doi.org/10.1051/0004-6361/202347912',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      changes: 'Recorte de los paneles de la página 4; se conservan escala, rótulos y colores.',
    },
    study: {
      authors: 'Marois, C., Macintosh, B., Barman, T., et al.',
      year: 2008,
      title: 'Direct Imaging of Multiple Planets Orbiting the Star HR 8799',
      journal: 'Science, 322(5906), 1348–1352',
      doi: '10.1126/science.1166585',
      url: 'https://doi.org/10.1126/science.1166585',
      arxivUrl: 'https://arxiv.org/abs/0811.2606',
    },
    dataArchive: {
      name: 'NASA Exoplanet Archive (HR 8799)',
      url: 'https://exoplanetarchive.ipac.caltech.edu/overview/HR%208799',
      badge: 'Archivo NASA',
    },
    limit:
      'La imagen directa está fuertemente sesgada hacia planetas gigantes (>1 MJup), calientes y muy lejanos (>10 UA); con la tecnología actual no detecta mundos terrestres ni planetas en zonas de habitabilidad.',
  },
  {
    id: 'transito',
    conceptId: 'transito',
    title: 'Tránsito',
    kicker: '02 · la señal temporal 1D',
    badge: 'Curva de luz fotométrica',
    shortDefinition:
      'Disminución periódica del flujo aparente de una estrella cuando un planeta cruza nuestra línea de visión.',
    description:
      'La curva de luz registra el brillo estelar en función del tiempo. La caída en flujo mide directamente el área del disco planetario frente a la estrella ((Rp/R★)²), mientras que la periodicidad fija el semi-eje mayor y la distancia orbital mediante la tercera ley de Kepler.',
    target: 'Kepler-90 i (8º planeta descubierto del sistema)',
    instrument: 'Telescopio Espacial Kepler (NASA)',
    dataType:
      'Brillo relativo frente a horas desde el tránsito; promedios de Kepler y modelo de mejor ajuste',
    imageSrc: s00VisualAssets.paperTransit,
    imageAlt:
      'Recorte del panel inferior de la Figura 12: brillo relativo de Kepler-90 i frente a horas desde el punto medio del tránsito, con datos agrupados y curva roja de mejor ajuste.',
    imageCaption:
      'Recorte del panel Kepler-90 i: puntos grises promediados en intervalos de unos 10 minutos, puntos morados en intervalos de unos 45 minutos y ajuste del tránsito en rojo.',
    imageWidth: 1466,
    imageHeight: 932,
    imageCredit: {
      figure: 'Figura 12, panel Kepler-90 i',
      citation:
        'Shallue y Vanderburg (2018), “Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90”, The Astronomical Journal, 155(2), 94. DOI: 10.3847/1538-3881/aa9e09',
      sourceUrl: 'https://doi.org/10.3847/1538-3881/aa9e09',
      license: 'CC BY 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
      changes: 'Recorte del panel inferior; se conservan datos, modelo, escalas y rótulos.',
    },
    study: {
      authors: 'Shallue, C. J., & Vanderburg, A.',
      year: 2018,
      title:
        'Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90',
      journal: 'The Astronomical Journal, 155(2), 94',
      doi: '10.3847/1538-3881/aa9e09',
      url: 'https://doi.org/10.3847/1538-3881/aa9e09',
      arxivUrl: 'https://arxiv.org/abs/1712.05044',
    },
    dataArchive: {
      name: 'NASA Exoplanet Archive (Kepler-90 i / KIC 11442793)',
      url: 'https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-90%20i',
      badge: 'Archivo NASA',
    },
    limit:
      'Un tránsito mide el radio relativo (Rp/R★), no la masa; además, sistemas de binarias eclipsantes rasantes, estrellas de fondo y manchas estelares producen señales que imitan tránsitos planetarios.',
  },
  {
    id: 'espectro',
    conceptId: 'espectro',
    title: 'Espectro',
    kicker: '03 · la huella química en λ',
    badge: 'Espectroscopía atmosférica',
    shortDefinition:
      'Variación de la profundidad de tránsito según la longitud de onda, revelando los gases de la atmósfera planetaria.',
    description:
      'Cuando el planeta transita, la luz estelar atraviesa las capas altas de su atmósfera. Las moléculas presentes absorben longitudes de onda específicas, haciendo que el planeta parezca ópticamente mayor a esas frecuencias y dejando una huella de absorción característica.',
    target: 'Exoplaneta WASP-39 b (Saturno caliente a ~700 años luz)',
    instrument: 'Telescopio Espacial James Webb (JWST / NIRSpec PRISM)',
    dataType:
      'Espectro de transmisión de 3,0 a 5,5 μm con cuatro reducciones independientes y datos de Spitzer',
    imageSrc: s00VisualAssets.paperSpectrum,
    imageAlt:
      'Figura 2 del artículo: profundidad de tránsito de WASP-39 b frente a longitud de onda, con cuatro reducciones independientes de JWST, puntos de Spitzer y barras de incertidumbre.',
    imageCaption:
      'Las reducciones independientes concuerdan en la banda de absorción de CO₂ cerca de 4,3 μm. El rasgo menor cerca de 4,0 μm se presenta como tentativo en el artículo.',
    imageWidth: 1040,
    imageHeight: 552,
    imageCredit: {
      figure: 'Figura 2',
      citation:
        'JWST Transiting Exoplanet Community ERS Team (2023), “Identification of carbon dioxide in an exoplanet atmosphere”, Nature, 614, 649–652. DOI: 10.1038/s41586-022-05269-w',
      sourceUrl: 'https://doi.org/10.1038/s41586-022-05269-w',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      changes: 'Figura descargada de Nature en su formato publicado; sin modificaciones.',
    },
    study: {
      authors: 'JWST Transiting Exoplanet Community ERS Team',
      year: 2023,
      title: 'Identification of carbon dioxide in an exoplanet atmosphere',
      journal: 'Nature, 614(7949), 649–652',
      doi: '10.1038/s41586-022-05269-w',
      url: 'https://doi.org/10.1038/s41586-022-05269-w',
      arxivUrl: 'https://arxiv.org/abs/2211.10487',
    },
    dataArchive: {
      name: 'MAST Archive (JWST NIRSpec WASP-39b ERS)',
      url: 'https://archive.stsci.edu/hlsp/ers-wasp39b',
      badge: 'Archivo MAST',
    },
    limit:
      'El espectro sufre degeneraciones físicas severas: presencia de brumas o nubes opacas pueden aplanar las líneas moleculares, y variaciones cromáticas de la estrella anfitriona pueden contaminar la señal planetaria.',
  },
  {
    id: 'representacion',
    conceptId: 'representacion',
    title: 'Representación',
    kicker: '04 · del dato al algoritmo',
    badge: 'Vector multiescala para ML',
    shortDefinition:
      'Organización de una curva de luz como entrada numérica para un modelo; cada representación conserva algunos patrones y puede ocultar otros.',
    description:
      'En el estudio de Shallue y Vanderburg, la curva de Kepler se aplana, se pliega al período candidato y se agrupa de dos maneras. La vista global resume la curva completa; la vista local enfoca una ventana alrededor del tránsito. La configuración final usa 2001 bins globales y 201 locales.',
    target: 'Candidatos Kepler (TCEs: Threshold Crossing Events / KOIs)',
    instrument: 'Pipeline Kepler + Red Neuronal Convolucional (AstroNet)',
    dataType:
      'Tres ejemplos de curvas de luz plegadas y normalizadas, mostradas como vistas globales y locales',
    imageSrc: s00VisualAssets.paperRepresentation,
    imageAlt:
      'Figura 3 de Shallue y Vanderburg: tres candidatos TCE comparados en vistas globales de la curva completa y vistas locales centradas en el evento.',
    imageCaption:
      'La vista global conserva el ciclo completo; la local amplía el evento. Los ejemplos muestran tanto un tránsito comprimido en la vista global como un eclipse secundario que puede confundirse con un planeta en la vista local.',
    imageWidth: 2216,
    imageHeight: 1595,
    imageCredit: {
      figure: 'Figura 3',
      citation:
        'Shallue y Vanderburg (2018), “Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90”, The Astronomical Journal, 155(2), 94. DOI: 10.3847/1538-3881/aa9e09',
      sourceUrl: 'https://doi.org/10.3847/1538-3881/aa9e09',
      license: 'CC BY 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
      changes: 'Recorte de la figura para excluir el encabezado de página y el caption original.',
    },
    study: {
      authors: 'Shallue, C. J., & Vanderburg, A.',
      year: 2018,
      title: 'Identifying Exoplanets with Deep Learning',
      journal: 'The Astronomical Journal, 155(2), 94',
      doi: '10.3847/1538-3881/aa9e09',
      url: 'https://doi.org/10.3847/1538-3881/aa9e09',
      arxivUrl: 'https://arxiv.org/abs/1712.05044',
    },
    dataArchive: {
      name: 'NASA Exoplanet Archive (Kepler TCE Table)',
      url: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=q1_q17_dr25_tce',
      badge: 'Archivo NASA',
    },
    codeRepo: {
      name: 'Google Research (AstroNet GitHub)',
      url: 'https://github.com/google-research/astronet',
    },
    limit:
      'Toda representación impone supuestos previos: si la estimación del período orbital o del tiempo de centro de tránsito falla en el preprocesamiento, la representación induce a la red neuronal a descartar un planeta real.',
  },
];

export const s00PlanetaryPillars: readonly S00PlanetaryPillar[] = [
  {
    id: 'origen',
    number: '01',
    title: 'Origen y formación',
    subtitle: '¿Cómo se forman los mundos?',
    tone: 'question',
    miniatureSrc: s00VisualAssets.miniatures.pillarOrigen,
    formula: 'T(r) \\propto r^{-1/2}, \\quad \\Sigma(r) \\propto r^{-3/2}',
    question:
      '¿Cómo se ensamblan los sistemas planetarios y sus arquitecturas a partir de gas y polvo?',
    physicalDefinition:
      'El colapso de nubes moleculares da lugar a discos protoplanetarios donde granos de polvo crecen hasta formar planetesimales y embriones planetarios, condicionados por líneas de hielo y migración orbital.',
    processes: [
      'Colapso molecular y acreción de discos protoplanetarios',
      'Líneas de condensación químicas (nieve de H₂O, CO, CO₂)',
      'Migración orbital tipo I / II y atrapamiento en resonancias',
      'Acreción de núcleos (core accretion) frente a inestabilidad gravitacional',
    ],
    observables:
      'Brechas, anillos y brazos espirales en emisión milimétrica; exceso infrarrojo y firmas espectrales de hielos volátiles.',
    instruments:
      'ALMA (interferometría submilimétrica), VLT/SPHERE (alto contraste), JWST/MIRI y Observatorio W. M. Keck.',
    mlRole:
      'Detección automatizada de subestructuras complejas (anillos, gaps, vórtices) en imágenes de discos de ALMA y emuladores rápidos de hidrodinámica.',
    physicalLimit:
      'Degeneración histórica: la población observada de exoplanetas maduros ha borrado la mayor parte de las huellas directas de su fase de acreción inicial.',
  },
  {
    id: 'estructura',
    number: '02',
    title: 'Estructura y composición',
    subtitle: '¿De qué están hechos y cómo se organizan?',
    tone: 'data',
    miniatureSrc: s00VisualAssets.miniatures.pillarEstructura,
    formula:
      '\\bar{\\rho}_p = \\frac{3 M_p}{4 \\pi R_p^3}, \\quad \\frac{dP}{dr} = - \\frac{G M(r) \\rho(r)}{r^2}',
    question:
      '¿Cuál es la composición interna, distribución de capas y naturaleza atmosférica de un planeta?',
    physicalDefinition:
      'Los mundos se diferencian bajo presiones extremas en núcleos metálicos, mantos rocosos de silicatos y envolturas volátiles, regidos por ecuaciones de estado y relaciones masa-radio.',
    processes: [
      'Diferenciación gravitacional interna (núcleo denso, manto, corteza)',
      'Ecuaciones de estado a presiones de gigapascales (GPa)',
      'Desgasificación volcánica y retención de atmósferas secundarias',
      'Perfiles verticales de temperatura y presión (P-T) atmosféricos',
    ],
    observables:
      'Densidad media combinando radio fotométrico y masa dinámica; espectros de transmisión y emisión con bandas moleculares (H₂O, CO₂, CH₄).',
    instruments:
      'Fotometría de tránsito (Kepler, TESS, PLATO) combinada con espectrógrafos de velocidad radial (ESPRESSO, HARPS) y JWST (NIRSpec/NIRISS).',
    mlRole:
      'Inversión atmosférica rápida (atmospheric retrieval con redes neuronales y normalizing flows) en segundos frente a días de MCMC clásico; clasificación composicional.',
    physicalLimit:
      'Degeneración composicional: múltiples combinaciones de núcleo de hierro, manto de silicato y envoltura de agua reproducen exactamente la misma masa y radio observables.',
  },
  {
    id: 'evolucion',
    number: '03',
    title: 'Evolución y dinámica',
    subtitle: '¿Cómo cambian con el tiempo?',
    tone: 'model',
    miniatureSrc: s00VisualAssets.miniatures.pillarEvolucion,
    formula:
      '\\dot{M}_{\\text{loss}} \\approx \\frac{\\epsilon \\pi R_p R_{\\text{XUV}}^2 F_{\\text{XUV}}}{G M_p}',
    question:
      '¿Cómo se transforman las órbitas, interiores y atmósferas a lo largo de miles de millones de años?',
    physicalDefinition:
      'La intensa radiación X y ultravioleta (XUV) de la estrella anfitriona evapora envolturas primordiales, mientras las mareas y perturbaciones gravitacionales remodelan la arquitectura del sistema.',
    processes: [
      'Fotoevaporación y pérdida de masa atmosférica por radiación estelar',
      'Enfriamiento y contracción térmica del radio planetario con la edad',
      'Migración por mareas, circularización orbital y dispersión de N-cuerpos',
      'Erosión por viento estelar e impacto acumulado de fulguraciones',
    ],
    observables:
      'El «valle de radios» (brecha de Fulton a ~1.8 R⊕), edades estelares por girocronología/asterosismología y variaciones de tiempo de tránsito (TTVs).',
    instruments:
      'Misiones espaciales Kepler, TESS y Gaia (astrometría estelar) acopladas a modelos de evolución estelar y simulaciones orbitales.',
    mlRole:
      'Clasificadores ultrarrápidos de estabilidad orbital a largo plazo en sistemas multiplanetarios (ej. SPOCK con gradient boosting) y modelado demográfico poblacional.',
    physicalLimit:
      'Corte temporal instantáneo: solo observamos el estado presente de los sistemas; reconstruir miles de millones de años de historia depende de supuestos en modelos estelares.',
  },
  {
    id: 'habitabilidad',
    number: '04',
    title: 'Habitabilidad y biosignaturas',
    subtitle: '¿Qué condiciones pueden sostener?',
    tone: 'transfer',
    miniatureSrc: s00VisualAssets.miniatures.pillarHabitabilidad,
    formula: 'T_{\\text{eq}} = T_\\star \\left(\\frac{R_\\star}{2a}\\right)^{1/2} (1 - A_B)^{1/4}',
    question:
      '¿Bajo qué condiciones un mundo puede sostener agua líquida superficial y ambientes propicios para la química de la vida?',
    physicalDefinition:
      'La habitabilidad es una propiedad emergente del sistema completo: requiere una órbita en la zona circunestelar templada, balance térmico por efecto invernadero, blindaje magnético y estabilidad estelar a largo plazo.',
    processes: [
      'Balance radiativo y efecto invernadero atmosférico (H₂O, CO₂)',
      'Ciclo geoquímico carbono-silicato para estabilización climática',
      'Blindaje magnético frente al viento estelar y fulguraciones',
      'Desequilibrio químico atmosférico y ciclos biogeoquímicos potenciales',
    ],
    observables:
      'Flujo estelar incidente, albedo planetario, espectros de alta relación señal-ruido buscando gases en desequilibrio (O₃/O₂ con CH₄) y monitoreo de fulguraciones.',
    instruments:
      'Espectroscopía infrarroja con JWST en exoplanetas terrestres templados (sistema TRAPPIST-1), futuros telescopios gigantes (ELT/ANDES) y misiones HWO.',
    mlRole:
      'De-trending de actividad y manchas estelares en curvas de luz y espectros, y desmezcla de biosignaturas extremadamente tenues sumergidas en ruido instrumental.',
    physicalLimit:
      'Falsos positivos abióticos: el oxígeno y el ozono pueden acumularse por fotólisis del agua sin presencia biológica; la radiación extrema de enanas M puede despojar la atmósfera.',
  },
];

export const s00FormulationStages: readonly S00FormulationStage[] = [
  {
    id: 'curiosidad',
    number: '01',
    stepName: 'Curiosidad',
    title: 'De la ambición científica al fenómeno observable',
    subtitle: '¿Cómo traducir el interés astronómico amplio en un problema delimitado?',
    tone: 'question',
    decision:
      'Delimitar qué fenómeno astronómico concreto se va a estudiar, qué propiedad física gobierna la señal y bajo qué condiciones de observación se busca responder la pregunta.',
    commonPitfall:
      'Tratar preguntas cualitativas («¿hay vida?», «¿cómo se forman los mundos?») como si fueran problemas directos de optimización matemática sin haber acotado el observable ni la física.',
    caseDetection: {
      title: 'Detección en grandes sondeos fotométricos',
      mission: 'Kepler / TESS / PLATO',
      description:
        'Buscar caídas periódicas de brillo causadas por cuerpos que bloquean una fracción diminuta (10⁻⁴ a 10⁻²) del flujo estelar.',
      instance:
        'Pregunta: ¿Existen caídas periódicas en la curva de luz que superen el ruido estelar y correspondan a un tránsito?',
    },
    caseCharacterization: {
      title: 'Espectroscopía y caracterización atmosférica',
      mission: 'JWST / Ariel / HWO',
      description:
        'Medir la absorción diferencial de la luz estelar a través de la atmósfera planetaria durante el tránsito a distintas longitudes de onda.',
      instance:
        'Pregunta: ¿Qué firmas de absorción molecular (H₂O, CO₂, CH₄) son detectables en el espectro de transmisión?',
    },
    validationGate:
      'La pregunta puede enunciarse en términos de cantidades físicas medibles con instrumentos existentes o simulaciones realistas.',
    visualDetail: {
      badge: 'Acotación epistemológica',
      diagramType: 'curiosity-scope',
      inputLabel: 'Ambición amplia: «¿Hay planetas habitables en la galaxia?»',
      transformationLabel: 'Foco en observable físico: variación fotométrica o absorción espectral',
      outputLabel: 'Pregunta acotada: «¿Qué señales son compatibles con un tránsito de radio Rp?»',
      formula: '\\Delta F / F_\\star \\approx (R_p / R_\\star)^2',
    },
  },
  {
    id: 'unidad',
    number: '02',
    stepName: 'Unidad de análisis',
    title: 'La instancia que gobierna el dataset',
    subtitle: '¿Qué cuenta exactamente como una fila o ejemplo en el aprendizaje?',
    tone: 'data',
    decision:
      'Definir el objeto estadístico independiente: qué recorte temporal, espacial o espectral constituye una sola instancia (xi, yi), qué resolución tiene y cómo se normaliza.',
    commonPitfall:
      'Confundir el objeto físico (el planeta o la estrella) con la unidad de datos (una ventana de tránsito, un TCE, un parche de píxeles). Esto causa fugas de datos (data leakage) al mezclar observaciones de la misma estrella en entrenamiento y prueba.',
    caseDetection: {
      title: 'TCE (Threshold Crossing Event)',
      mission: 'Kepler / TESS',
      description:
        'Una ventana temporal centrada en el tránsito candidato, doblada al periodo orbital P, con vista global (órbita completa) y local (detalle del tránsito).',
      instance: 'Instancia: vector o tensor de flujo normalizado xi ∈ ℝ²⁰¹ centrado en fase cero.',
    },
    caseCharacterization: {
      title: 'Espectro de transmisión calibrado',
      mission: 'JWST (NIRISS/NIRSpec)',
      description:
        'Un espectro 1D que mide la profundidad de tránsito (Rp/R★)² en B canales espectrales discretos con sus incertidumbres observacionales σb.',
      instance: 'Instancia: par de vectores (λ, d, σ) ∈ ℝ^(B×3).',
    },
    validationGate:
      'La partición entre conjuntos de entrenamiento y prueba se realiza sobre sistemas estelares independientes para evitar fuga de información.',
    visualDetail: {
      badge: 'Estructuración de datos',
      diagramType: 'unit-discretization',
      inputLabel: 'Serie temporal continua de 4 años (~70,000 puntos en Kepler)',
      transformationLabel: 'Segmentación en épocas, doblado en fase P y re-muestreo uniforme',
      outputLabel: 'Instancia tabular/tensorial: xi = (f₁, f₂, ..., fD)',
      formula: 'x_i \\in \\mathbb{R}^D, \\quad \\mathrm{Var}(f_t) \\sim \\sigma_{\\mathrm{CDPP}}^2',
    },
  },
  {
    id: 'salida',
    number: '03',
    stepName: 'Salida computable',
    title: 'El objeto matemático que devuelve el modelo',
    subtitle: '¿Qué forma exacta tiene la predicción y qué supuestos la acompañan?',
    tone: 'model',
    decision:
      'Especificar la variable objetivo ŷ: clase discreta, probabilidad calibrada, estimación puntual de parámetros físicos o distribución posterior bayesiana completa.',
    commonPitfall:
      'Definir una salida abstracta sin considerar el desbalance de clases (sólo 1 de cada 100 TCEs es un planeta real) o usar un número sin cuantificación de incertidumbre (estimar masa sin barras de error carece de valor científico).',
    caseDetection: {
      title: 'Probabilidad de tránsito genuino',
      mission: 'Robovetter / Astronet',
      description:
        'Un score calibrado ŷ ∈ [0, 1] que cuantifica la confianza de que el evento corresponde a un planeta y no a una binaria eclipsante o ruido instrumental.',
      instance: 'Salida: ŷ = P(Planeta | x), calibrada con inyección sintética de tránsitos.',
    },
    caseCharacterization: {
      title: 'Posterior de parámetros atmosféricos',
      mission: 'Atmospheric Retrieval (Ariel / JWST)',
      description:
        'Distribución multivariada sobre abundancias químicas (H₂O, CO₂, CH₄), temperatura base T₀ y presión de cima de nubes P_cloud.',
      instance: 'Salida: distribución posterior p(θ | d) o aproximación variacional rápida.',
    },
    validationGate:
      'La métrica de evaluación (ej. Precision-Recall AUC, calibración de probabilidad, posterior coverage) está alineada con el costo de falsos positivos y falsos negativos en astronomía.',
    visualDetail: {
      badge: 'Inferencia computacional',
      diagramType: 'output-distribution',
      inputLabel: 'Representación latente extraída de la medición',
      transformationLabel: 'Cálculo de función de pérdida y optimización estadística',
      outputLabel: 'Predicción estructurada con incertidumbre cuantificada',
      formula: '\\hat{y} = P(y = 1 \\mid x), \\quad \\hat{\\theta} \\pm \\sigma_\\theta',
    },
  },
  {
    id: 'uso',
    number: '04',
    stepName: 'Criterio de uso',
    title: 'La acción científica que justifica la predicción',
    subtitle: '¿Qué decisión humana o experimental se toma con la salida computacional?',
    tone: 'decision',
    decision:
      'Definir el umbral de decisión operativa: qué candidatos se envían a seguimiento en telescopios de alta resolución, qué casos se descartan automáticamente y cómo se combinan con otros catálogos.',
    commonPitfall:
      'Entrenar un modelo con métricas de laboratorio (ej. 98% accuracy) que resulta inutilizable en la práctica porque produce cientos de falsos positivos que saturarían el escaso tiempo de telescopios como JWST o VLT.',
    caseDetection: {
      title: 'Filtro y priorización de seguimiento',
      mission: 'Kepler Follow-up Program / TESS TFOP',
      description:
        'Reducir un catálogo de 20,000 eventos a los 200 candidatos más prometedores para confirmación mediante velocidad radial de alta precisión.',
      instance:
        'Decisión: Asignar noches de observación espectroscópica en HARPS-N o ESPRESSO solo a dianas con ŷ > 0.85.',
    },
    caseCharacterization: {
      title: 'Selección de objetivos para caracterización profunda',
      mission: 'JWST Cycle Proposal Prioritization',
      description:
        'Priorizar dianas que presenten baja probabilidad de cobertura nubosa opaca para optimizar los tiempos de exposición en espectroscopía de transmisión.',
      instance:
        'Decisión: Diseñar programas de observación de tiempo garantizado (GTO/GO) en mundos con contrastes moleculares detectables.',
    },
    validationGate:
      'El criterio de corte optimiza el retorno científico por hora de telescopio y previene el desperdicio de recursos observacionales de alta demanda.',
    visualDetail: {
      badge: 'Impacto operacional',
      diagramType: 'usage-funnel',
      inputLabel: 'Población masiva de candidatos (~10⁵ eventos fotométricos)',
      transformationLabel: 'Aplicación de umbral de corte y función de costo asimétrica',
      outputLabel: 'Lista priorizada para confirmación espectroscópica (~10² dianas)',
      formula: '\\mathrm{Score}(x) > \\tau_{\\mathrm{operativo}} \\implies \\text{Seguimiento}',
    },
  },
];

export const s00MeasurementModalities: readonly S00MeasurementModality[] = [
  {
    id: 'transito',
    number: '01',
    title: 'Tránsito fotométrico',
    subtitle: 'Variación temporal del flujo estelar aparente',
    symbol: '\\Delta F(t)',
    tone: 'data',
    miniatureSrc: s00VisualAssets.miniatures.medicionTransito,
    narrativeLead:
      'La fotometría de tránsito convierte el eclipse geométrico de un exoplaneta frente a su estrella en una serie temporal de brillo relativo. La disminución de flujo delimita el radio planetario relativo y el periodo orbital, mientras que la unidad de análisis para Machine Learning extrae ventanas temporales en fase para clasificar candidatos sin confundirlos con binarias eclipsantes o variabilidad estelar.',
    scientificIntention: {
      question:
        '¿Qué planetas cruzan la línea de visión de su estrella y qué tamaño relativo poseen?',
      physicalMotivation:
        'Detectar caídas periódicas en la curva de luz estelar causadas por el bloqueo del disco planetario.',
    },
    governingEquation:
      '\\frac{\\Delta F}{F_\\star} \\approx \\left(\\frac{R_p}{R_\\star}\\right)^2, \\quad P^2 = \\frac{4\\pi^2 a^3}{G(M_\\star + M_p)}',
    equationDescription:
      'La fracción de luz bloqueada mide directamente la razón geométrica entre las áreas del planeta y de la fotosfera estelar; la periodicidad fija el semieje mayor orbital mediante la tercera ley de Kepler.',
    rawObservable:
      'Serie temporal de flujo fotométrico normalizado x_i(t) registrada por detectores CCD/CMOS con ruido fotónico, deriva térmica y modulación por manchas estelares.',
    inferredParameter:
      'Radio planetario relativo (Rp/R★), periodo orbital P, inclinación i, semieje mayor a/R★ y parámetro de impacto b.',
    instruments:
      'Telescopios espaciales Kepler, K2, TESS, CHEOPS y la futura misión europea PLATO.',
    mlUnitFormulation: {
      instanceDefinition:
        'Threshold Crossing Event (TCE): serie temporal doblada al periodo P y centrada en fase cero, estandarizada en dos vistas complementarias.',
      tensorStructure:
        'Vector global de 201 puntos (órbita completa) y vector local de 61 puntos (detalle del tránsito): x_i ∈ ℝ²⁶².',
      leakagePrevention:
        'Partición estricta a nivel de estrella o sistema (KIC/TIC ID): ninguna observación de la misma diana estelar debe compartirse entre entrenamiento y prueba.',
    },
    mlOutput: {
      mathematicalForm: '\\hat{y} = P(\\text{Planeta} \\mid \\mathbf{x}_i) \\in [0, 1]',
      outputType:
        'Probabilidad calibrada de candidato genuino frente a falso positivo instrumental o astrofísico.',
      mlRole:
        'Redes neuronales convolucionales 1D (AstroNet) y modelos de atención para clasificar señales débiles cerca del umbral de detección (SNR ~ 7).',
      typicalLossOrAlgorithm:
        'Entropía cruzada binaria ponderada o focal loss para mitigar el severo desbalance de clases (~1:100).',
    },
    operationalUse: {
      action:
        'Filtrar y priorizar candidatos para campañas de confirmación espectroscópica desde observatorios terrestres.',
      followupCriterion:
        'Asignar noches de telescopio en HARPS o ESPRESSO solo a dianas con score alto y bajo riesgo de contaminación.',
      commonPitfall:
        'Tratar la serie temporal cruda sin doblar en fase o medir precisión global (accuracy) ignorando el 99% de falsos positivos.',
      validationGate:
        'Recuperación demostrada sobre tránsitos inyectados sintéticamente en curvas de luz reales con tasa de falso descubrimiento < 5%.',
    },
    physicalLimit:
      'La fotometría de tránsito mide exclusivamente radio, no masa; binarias eclipsantes rasantes y estrellas de fondo contaminantes imitan caídas planetarias.',
    diagramDetail: {
      badge: 'Fotometría diferencial',
      description: 'Curva de luz normalizada con ingreso, fondo plano y egreso',
    },
  },
  {
    id: 'radial',
    number: '02',
    title: 'Velocidad radial',
    subtitle: 'Bamboleo Doppler estelar por tirón gravitatorio reflejo',
    symbol: '\\Delta v_r(t)',
    tone: 'question',
    miniatureSrc: s00VisualAssets.miniatures.medicionRadial,
    narrativeLead:
      'La espectrometría Doppler mide el movimiento reflejo de la estrella alrededor del baricentro del sistema. Al rastrear el desplazamiento Doppler de miles de líneas de absorción atómica, cuantifica la masa mínima del planeta y su excentricidad orbital. El rol principal de Machine Learning radica en separar la señal kepleriana del ruido estelar magnético originado por manchas y convección granulada.',
    scientificIntention: {
      question:
        '¿Cuál es la masa dinámica de los planetas y qué arquitectura orbital describe el sistema?',
      physicalMotivation:
        'Medir la atracción gravitacional que el cuerpo ejerce sobre su estrella anfitriona a lo largo del tiempo.',
    },
    governingEquation:
      'K = \\left(\\frac{2\\pi G}{P}\\right)^{1/3} \\frac{M_p \\sin i}{(M_\\star + M_p)^{2/3}} \\frac{1}{\\sqrt{1 - e^2}}',
    equationDescription:
      'La semiamplitud de velocidad K cuantifica el tirón gravitatorio y escala linealmente con la masa mínima proyectada Mp sin i e inversamente con la masa estelar.',
    rawObservable:
      'Desplazamiento Doppler de miles de líneas espectrales, medido en velocidad de línea de visión vr(t) con precisión de cm/s, e índices de actividad cromosférica (Ca II H&K, H-alfa).',
    inferredParameter:
      'Masa mínima Mp sin i, excentricidad orbital e, argumento del periastro ω y masa dinámica combinada con tránsitos.',
    instruments:
      'Espectrógrafos ultraestables de vacío: ESPRESSO (VLT, precisión ~10 cm/s), HARPS (La Silla), HARPS-N (La Palma), HIRES (Keck), NEID (Kitt Peak).',
    mlUnitFormulation: {
      instanceDefinition:
        'Secuencia temporal irregular de velocidades radiales y perfiles de correlación cruzada (CCF): (t_k, v_k, σ_k, FWHM_k, BIS_k).',
      tensorStructure:
        'Matriz de series temporales heterogéneas con muestreo escaso y condicionado por visibilidad estacional.',
      leakagePrevention:
        'Validación cruzada por bloques temporales para no interpolar series temporales con autocorrelación estelar.',
    },
    mlOutput: {
      mathematicalForm:
        "f_\\theta(t) = v_{\\text{Kepler}}(t; \\boldsymbol{\\theta}) + \\mathcal{GP}(0, k_{\\text{estelar}}(t, t'))",
      outputType:
        'Posterior marginal sobre parámetros orbitales y descomposición de señal instrumental frente a actividad estelar.',
      mlRole:
        'Modelos de Procesos Gaussianos (GP) con núcleos cuasi-periódicos para disentrelazar la oscilación planetaria del ruido magnético estelar.',
      typicalLossOrAlgorithm:
        'Máxima verosimilitud marginal (log marginal likelihood) e inferencia variacional bayesiana.',
    },
    operationalUse: {
      action:
        'Confirmar candidatos de tránsito midiendo masa y descartando impostores de masa estelar.',
      followupCriterion:
        'Obtener masa dinámica con precisión > 3-5 sigma para fijar la densidad media planetaria ρ̄.',
      commonPitfall:
        'Ajustar una órbita circular pura sin modelar la rotación estelar diferencial, interpretando la actividad estelar como un planeta super-Tierra.',
      validationGate:
        'Persistencia de la semiamplitud K en múltiples longitudes de onda (prueba cromática: las órbitas planetarias son acromáticas; la actividad estelar depende del color).',
    },
    physicalLimit:
      'Indeterminación de la inclinación i (Mp sin i es una cota inferior sin tránsitos); la convección y granulación estelar imponen un piso de ruido físico de ~10-20 cm/s.',
    diagramDetail: {
      badge: 'Espectrometría Doppler',
      description: 'Curva senoidal de velocidad orbital con desfase hacia el azul y rojo',
    },
  },
  {
    id: 'espectro',
    number: '03',
    title: 'Espectroscopía de transmisión y emisión',
    subtitle: 'Huella molecular, perfiles térmicos y opacidad atmosférica',
    symbol: 'D(\\lambda)',
    tone: 'model',
    miniatureSrc: s00VisualAssets.miniatures.medicionEspectro,
    narrativeLead:
      'Durante el tránsito, la luz estelar filtra el anillo superior de la atmósfera planetaria. Las moléculas de gas absorben fotones a longitudes de onda específicas, haciendo que el radio aparente del planeta crezca en dichas frecuencias. La espectroscopía de transmisión mide esta variación cromática minúscula, revelando la composición química (agua, metano, dióxido de carbono) y la presencia de nubes o brumas.',
    scientificIntention: {
      question:
        '¿De qué están compuestas las atmósferas exoplanetarias y qué perfiles térmicos o de nubes las caracterizan?',
      physicalMotivation:
        'Identificar especies químicas, razones elementales (C/O, metalicidad) y biofirmas o fotoquímica en la envoltura gaseosa.',
    },
    governingEquation:
      'D(\\lambda) = \\frac{R_p^2 + 2 R_p h(\\lambda)}{R_\\star^2}, \\quad h(\\lambda) \\approx \\frac{k_B T_{\\text{eq}}}{\\mu g} \\ln\\left(\\frac{\\kappa(\\lambda) P_{\\text{base}}}{\\dots}\\right)',
    equationDescription:
      'La profundidad cromática D(λ) depende del radio base y de la altura de escala atmosférica h, proporcional a la temperatura e inversamente proporcional al peso molecular medio μ.',
    rawObservable:
      'Espectro 1D de profundidad de tránsito en función de la longitud de onda (Rp(λ)/R★)² con barras de error fotométricas en cientos de bins espectrales.',
    inferredParameter:
      'Abundancias moleculares relativas (H₂O, CO₂, CH₄, CO, SO₂), temperatura de equilibrio Teq, presión de cima de nubes Pcloud y metalicidad atmosférica.',
    instruments:
      'Telescopio Espacial James Webb (JWST: NIRSpec, MIRI, NIRISS), Hubble (WFC3), y futuras misiones dedicadas Ariel (ESA) y HWO (NASA).',
    mlUnitFormulation: {
      instanceDefinition:
        'Par de vectores espectrales: longitud de onda, profundidad y error calibrado (λ_b, d_b, σ_b) ∈ ℝ^(B×3).',
      tensorStructure:
        'Vectores 1D de longitud B ~ 100-2000 canales espectrales continuos o discretizados.',
      leakagePrevention:
        'Separación de espectros sintéticos de entrenamiento por física base para evitar memorización de rejillas de opacidad cerradas.',
    },
    mlOutput: {
      mathematicalForm:
        'p(\\boldsymbol{\\theta} \\mid \\mathbf{d}) \\approx q_\\phi(\\boldsymbol{\\theta} \\mid \\mathbf{d}), \\quad \\boldsymbol{\\theta} = (\\log X_{\\text{H}_2\\text{O}}, \\log X_{\\text{CO}_2}, T_0, P_{\\text{cloud}})',
      outputType:
        'Distribución posterior multivariada aproximada o intervalos de credibilidad bayesianos al 68% y 95%.',
      mlRole:
        'Neural Posterior Estimation (NPE) y Normalizing Flows como emuladores de transferencia radiativa para reducir el tiempo de inferencia de días a milisegundos.',
      typicalLossOrAlgorithm:
        'Divergencia Kullback-Leibler o Maximum Mean Discrepancy para entrenamiento condicional amortizado.',
    },
    operationalUse: {
      action:
        'Inversión atmosférica rápida (atmospheric retrieval) para explorar escenarios de desgasificación y química de equilibrio.',
      followupCriterion:
        'Confirmar detecciones moleculares de alta significancia (> 3 sigma bayesiana) y seleccionar bandas para observación en tiempo de director (DDT).',
      commonPitfall:
        'Asumir atmósferas claras y sobreajustar abundancias moleculares en presencia de capas de aerosoles opacas no modeladas.',
      validationGate:
        'Validación cruzada contra códigos de transferencia radiativa estándar (TauREx, PLATON, petitRADTRANS) en pruebas ciegas de la comunidad.',
    },
    physicalLimit:
      'Degeneración nubes-metalicidad: un manto nuboso plano atenúa las líneas moleculares de forma indistinguible de una atmósfera con baja escala de altura o alto peso molecular medio μ.',
    diagramDetail: {
      badge: 'Espectroscopía de transmisión',
      description: 'Profundidad de absorción con bandas moleculares de agua y dióxido de carbono',
    },
  },
  {
    id: 'imagen',
    number: '04',
    title: 'Imagen directa y alto contraste',
    subtitle: 'Resolución espacial, contraste extremo y separación de fotones',
    symbol: 'I(x, y)',
    tone: 'decision',
    miniatureSrc: s00VisualAssets.miniatures.medicionImagen,
    narrativeLead:
      'La imagen directa busca resolver los fotones emitidos por el planeta separándolos espacialmente del inmenso halo de su estrella anfitriona. Requiere coronografía para tapar el brillo estelar y óptica adaptativa extrema para corregir la turbulencia atmosférica. Machine Learning interviene como filtro espacial y temporal avanzado, modelando la respuesta del instrumento (speckles cuasi-estáticos) para descubrir compañeros débiles en órbitas exteriores.',
    scientificIntention: {
      question:
        '¿Qué planetas masivos orbitan a gran distancia (> 5-50 UA) y cómo emiten su radiación térmica?',
      physicalMotivation:
        'Resolver el planeta como una fuente puntual separada espacialmente de su estrella y rastrear su órbita por astrometría directa.',
    },
    governingEquation:
      'C(\\lambda) = \\frac{F_p(\\lambda)}{F_\\star(\\lambda)} \\sim 10^{-4} \\text{ (infrarrojo térmico joven)} \\;\\text{a}\\; 10^{-10} \\text{ (óptico terrestre)}',
    equationDescription:
      'El contraste de brillo C(λ) mide la diferencia de fotones entre la estrella central y el planeta fuera del radio angular de difracción θ ~ 1.22 λ/D.',
    rawObservable:
      'Cubo de imágenes astronómicas 2D I(x, y, t, λ) obtenidas con óptica adaptativa, dominadas por speckles cuasi-estáticos del tren óptico.',
    inferredParameter:
      'Luminosidad térmica Lbol, temperatura efectiva Teff, separación angular proyectada ρ, ángulo de posición P.A. y arquitectura de discos circunestelares.',
    instruments:
      'VLT/SPHERE, Gemini Planet Imager (GPI), Subaru/SCExAO, Keck/NIRC2 y el futuro Coronógrafo del Telescopio Espacial Nancy Grace Roman.',
    mlUnitFormulation: {
      instanceDefinition:
        'Parches locales de píxeles o secuencias multitemporales de imágenes rotadas según el ángulo paraláctico (Angular Differential Imaging).',
      tensorStructure: 'Tensores 3D o 4D de intensidad: X ∈ ℝ^(N_frames × H × W).',
      leakagePrevention:
        'Entrenamiento con inyecciones sintéticas de planetas artificiales preservando la distribución real de speckles no comunes (NCPA).',
    },
    mlOutput: {
      mathematicalForm: '\\hat{S}(x, y) = I(x, y) - \\hat{I}_{\\text{halo, speckles}}(x, y)',
      outputType:
        'Mapa de contraste residual o probabilidad pixel a pixel de albergar una fuente puntual astrofísica no correlacionada.',
      mlRole:
        'Autoencoders convolucionales, PCA no lineal y modelos generativos para sintetizar y restar el patrón instrumental de speckles.',
      typicalLossOrAlgorithm:
        'Error cuadrático medio con regularización de dispersión (norma L1) para preservar fuentes puntuales no redundantes.',
    },
    operationalUse: {
      action:
        'Detectar candidatos a planetas gigantes y enanas marrones en órbitas exteriores y realizar astrometría multianual.',
      followupCriterion:
        'Confirmar movimiento propio común con la estrella anfitriona en observaciones separadas por varios años.',
      commonPitfall:
        'Interpretar un speckle quasi-estático brillante y persistente como un exoplaneta real, o suprimir el flujo planetario por sobre-sustracción.',
      validationGate:
        'Curvas de contraste 5-sigma validadas mediante inyección y recuperación ciega de fuentes sintéticas a diferentes separaciones angulares.',
    },
    physicalLimit:
      'El ángulo de trabajo interior (Inner Working Angle, IWA ~ 2-3 λ/D) hace invisible cualquier planeta cercano a la estrella; la tecnología actual solo detecta planetas gigantes muy jóvenes y calientes (> 1 MJup, < 100 Myr).',
    diagramDetail: {
      badge: 'Coronografía de alto contraste',
      description: 'Atenuación estelar central con anillo de difracción y detección puntual',
    },
  },
];

export const s00DataCards: readonly S00DataCard[] = [
  {
    id: 'observacion',
    number: '01',
    title: 'Observación cruda',
    kicker: '01 · MEDIR EL FENÓMENO',
    body: 'Serie temporal de flujo, espectro calibrado o imagen de alto contraste registrada por un detector físico en una ventana temporal concreta.',
    question:
      '¿Qué propiedad física y qué artefactos instrumentales están presentes en la señal cruda?',
    risk: 'Confundir una modulación instrumental (ruido térmico, gaps de telemetría, manchas estelares) con una señal planetaria.',
    tone: 'data',
    mathematicalForm:
      'x_i = [F(t_1), F(t_2), ..., F(t_N)] \\in \\mathbb{R}^N, \\quad \\text{Var}(F_t) \\sim \\sigma_{\\text{CDPP}}^2',
    exoplanetSource: 'Telescopios Kepler, TESS y JWST procesados con AstroPy y Lightkurve',
    dataStructure:
      'Serie temporal 1D continua de flujo fotométrico normalizado con cadencia de 29.4 min y máscara de gaps',
    dominantBias:
      'Deriva térmica del detector, jitter de apuntamiento y variación estelar cuasi-periódica',
    miniatureSrc: s00VisualAssets.miniatures.datosObservacion,
    diagramDetail: {
      badge: 'Medición cruda',
      description: 'Curva continua con ruido observacional, gaps de telemetría y tendencia térmica',
    },
  },
  {
    id: 'catalogo',
    number: '02',
    title: 'Catálogo estructurado',
    kicker: '02 · TABULAR Y FILTRAR',
    body: 'Tabla de objetos y propiedades astrofísicas (P, Rp, Teq, [Fe/H]) con metadatos de calidad y diagnósticos de vetting.',
    question:
      '¿Qué unidad estadística cuenta cada fila y bajo qué sesgos de selección fue construido?',
    risk: 'Ignorar el sesgo Malmquist y asumir que los objetos tabulados representan la población exoplanetaria real de la galaxia.',
    tone: 'data',
    mathematicalForm:
      '\\mathbf{X} \\in \\mathbb{R}^{N \\times P}, \\quad \\text{fila } i = (P_i, R_{p,i}, T_{\\text{eq},i}, \\log g_i, \\dots)',
    exoplanetSource: 'NASA Exoplanet Archive (Kepler Objects of Interest / TESS TOI Table)',
    dataStructure:
      'Matriz estructurada de N ~ 10⁴ filas y P ~ 40 columnas con metadatos y valores faltantes',
    dominantBias: 'Sesgo de detección hacia planetas gigantes en órbitas ultracortas (<10 días)',
    miniatureSrc: s00VisualAssets.miniatures.datosCatalogo,
    diagramDetail: {
      badge: 'Base de datos',
      description: 'Matriz tabular con columnas astrofísicas, metadatos y flags de calidad',
    },
  },
  {
    id: 'simulacion',
    number: '03',
    title: 'Simulación física e inyección',
    kicker: '03 · MODELO GENERATIVO',
    body: 'Curvas o espectros sintéticos generados por modelos directos (forward models) donde se inyectan tránsitos para calibrar la tasa de recuperación.',
    question:
      '¿Qué supuestos teóricos entraron en el modelo antes de generar el ejemplo sintético?',
    risk: 'Tratar la salida de una simulación como si fuera evidencia observacional independiente (sim-to-real gap).',
    tone: 'model',
    mathematicalForm:
      'y_{\\text{sim}}(t) = F_{\\text{star}}(t) \\cdot M(t; P, t_0, R_p/R_\\star, b) + \\epsilon(t)',
    exoplanetSource:
      'Rejillas radiativas PICASO / Exo-Transmit y generador analítico Mandel & Agol (batman)',
    dataStructure:
      'Modelo físico analítico sobremuestreado e inyectado sobre ruido estelar observado',
    dominantBias:
      'Supuestos simplificadores (estrellas esféricas sin manchas, atmósferas unidimensionales 1D)',
    miniatureSrc: s00VisualAssets.miniatures.datosSimulacion,
    diagramDetail: {
      badge: 'Inyección física',
      description:
        'Tránsito analítico inyectado sobre variabilidad estelar real para medir completitud',
    },
  },
  {
    id: 'entrenamiento',
    number: '04',
    title: 'Conjunto de entrenamiento',
    kicker: '04 · APRENDIZAJE SUPERVISADO',
    body: 'Casos seleccionados, balanceados y etiquetados para optimizar los pesos del modelo, garantizando particiones independientes por estrella.',
    question:
      '¿Quién asignó las etiquetas y qué garantía existe de que no hay fuga de información entre estrellas?',
    risk: 'Fuga de datos (data leakage) al mezclar tránsitos de la misma estrella en entrenamiento y prueba, inflando artificialmente el rendimiento.',
    tone: 'model',
    mathematicalForm:
      '\\mathcal{D}_{\\text{train}} = \\{(x_i, y_i)\\}_{i=1}^M, \\quad \\text{StarID}(x_i) \\cap \\text{StarID}(x_{\\text{test}}) = \\emptyset',
    exoplanetSource:
      'Kepler DR25 Certified TCE Table con etiquetas Robovetter y confirmaciones de archivo',
    dataStructure:
      'Tensores procesados con balanceo sintético de clases (inyección forzada de tránsitos débiles)',
    dominantBias:
      'Contaminación de etiquetas por falsos positivos sutiles no resueltos por vetting humano',
    miniatureSrc: s00VisualAssets.miniatures.datosEntrenamiento,
    diagramDetail: {
      badge: 'Partición estelar',
      description:
        'Separación estricta train/val/test a nivel de sistemas estelares independientes',
    },
  },
  {
    id: 'salida',
    number: '05',
    title: 'Salida evaluada y decisión',
    kicker: '05 · ACCIÓN OPERATIVA',
    body: 'Score probabilístico, clasificación multiclase, parámetro estimado con barras de error o ranking para seguimiento telescópico.',
    question:
      '¿Qué umbral operativo convierte la probabilidad en una acción de telescopio y qué costo tiene errar?',
    risk: 'Convertir un score probabilístico alto en una confirmación física automática sin validación espectroscópica.',
    tone: 'decision',
    mathematicalForm:
      '\\hat{y} = P(y=1|x) \\in [0, 1], \\quad \\text{Decisión: } \\hat{y} > \\tau_{\\text{costo}} \\implies \\text{Telescopio}',
    exoplanetSource:
      'Listas de candidatos priorizados para ESPRESSO (VLT) y JWST Cycle GO Programs',
    dataStructure:
      'Distribución probabilística calibrada con curvas de fiabilidad y función de costo asimétrica',
    dominantBias:
      'Falsos descubrimientos derivados de umbrales optimizados en conjuntos de prueba no representativos',
    miniatureSrc: s00VisualAssets.miniatures.datosSalida,
    diagramDetail: {
      badge: 'Calibración y umbral',
      description: 'Curva de fiabilidad probabilística con corte de decisión operativo',
    },
  },
];

export const s00MLVerbs: readonly S00MLVerb[] = [
  {
    id: 'detectar',
    number: '01',
    verb: 'Detectar',
    label: '01 · Detectar',
    kicker: '01 · SEÑAL SOBRE RUIDO',
    mathematicalMapping: 'f_\\theta: \\mathcal{X} \\to \\{0, 1\\}',
    lossFunction: '\\mathcal{L}_{\\text{BCE}} = - [y \\log \\hat{y} + (1 - y) \\log(1 - \\hat{y})]',
    outputSpace: 'Score binario continuo \\hat{y} \\in [0, 1] que cuantifica presencia de tránsito',
    exoplanetProblem:
      'Identificar caídas de brillo periódicas sumergidas en ruido instrumental y convectivo estelar',
    classicalBaseline: 'Box-fitting Least Squares (BLS) / Transit Least Squares (TLS)',
    mlApproach: 'Redes Convolucionales 1D (CNN) multiescala con filtros temporales adaptativos',
    validationMetric:
      'Precision-Recall AUC (PR-AUC) evaluada en tránsitos inyectados con SNR baja (S/N < 7)',
    failureMode:
      'Confusión sistemática con artefactos térmicos de enfriamiento y manchas estelares rotacionales',
    tone: 'data',
    miniatureSrc: s00VisualAssets.miniatures.verbDetectar,
    diagramDetail: {
      badge: 'Detección temporal',
      description: 'Señal de tránsito que cruza el umbral de significancia estadística',
    },
  },
  {
    id: 'clasificar',
    number: '02',
    verb: 'Clasificar',
    label: '02 · Clasificar',
    kicker: '02 · SEPARACIÓN DISCRETA',
    mathematicalMapping: 'f_\\theta: \\mathcal{X} \\to \\Delta^C, \\quad \\sum_{c=1}^C p_c = 1',
    lossFunction: '\\mathcal{L}_{\\text{CE}} = - \\sum_{c=1}^C y_c \\log \\hat{p}_c',
    outputSpace:
      'Vector de probabilidades sobre clases (Planeta, Binaria eclipsante, Mancha estelar, Ruido)',
    exoplanetProblem:
      'Discriminar candidatos genuinos frente a impostores astrofísicos en sondeos masivos',
    classicalBaseline: 'Robovetter determinista con árboles de decisión fijos y umbrales rígidos',
    mlApproach:
      'Redes Neuronales Profundas (AstroNet) / Gradient Boosting (XGBoost) sobre diagnósticos de tránsito',
    validationMetric: 'Brier Score multiclase, calibración probabilística y F1-score balanceado',
    failureMode:
      'Binarias eclipsantes rasantes con caídas pequeñas que imitan a la perfección la profundidad planetaria',
    tone: 'model',
    miniatureSrc: s00VisualAssets.miniatures.verbClasificar,
    diagramDetail: {
      badge: 'Clasificación multiclase',
      description: 'Frontera de decisión no lineal separando candidatos de falsos positivos',
    },
  },
  {
    id: 'estimar',
    number: '03',
    verb: 'Estimar',
    label: '03 · Estimar',
    kicker: '03 · PARÁMETROS FÍSICOS',
    mathematicalMapping:
      'f_\\theta: \\mathcal{X} \\to \\mathbb{R}^K \\quad \\text{o} \\quad q_\\phi(\\theta | x) \\approx p(\\theta | x)',
    lossFunction:
      '\\mathcal{L}_{\\text{NLL}} = \\frac{1}{2} \\log(2\\pi \\sigma_\\theta^2) + \\frac{(\\theta - \\hat{\\mu}_\\theta)^2}{2\\sigma_\\theta^2}',
    outputSpace:
      'Estimación puntual con incertidumbre \\hat{\\theta} \\pm \\sigma_\\theta o distribución posterior continua completa',
    exoplanetProblem:
      'Recuperar parámetros atmosféricos (abundancias de H₂O, CO₂, temperatura base) a partir de espectros',
    classicalBaseline:
      'Muestreo MCMC bayesiano clásico (emcee, PyMultinest) acoplado a transferencia radiativa lenta',
    mlApproach: 'Inferencia Basada en Simulación (SBI) con Normalizing Flows amortizados (NPE)',
    validationMetric:
      'Posterior Coverage (PIT diagram) y Error Cuadrático Medio (RMSE) en conjuntos sintéticos ciegos',
    failureMode: 'Degeneración física entre nubes/aerosoles opacos y bajas abundancias moleculares',
    tone: 'decision',
    miniatureSrc: s00VisualAssets.miniatures.verbEstimar,
    diagramDetail: {
      badge: 'Inferencia bayesiana',
      description: 'Distribución posterior continua con intervalos de credibilidad al 68% y 95%',
    },
  },
  {
    id: 'describir',
    number: '04',
    verb: 'Describir',
    label: '04 · Describir',
    kicker: '04 · ESTRUCTURA NO SUPERVISADA',
    mathematicalMapping:
      'f_\\theta: \\mathcal{X} \\to \\mathcal{Z} \\subset \\mathbb{R}^d, \\quad d \\ll D',
    lossFunction:
      '\\mathcal{L}_{\\text{recon}} = \\| x - g_\\psi(f_\\theta(x)) \\|^2 + \\beta \\, D_{\\text{KL}}(q_\\phi(z|x) \\| p(z))',
    outputSpace:
      'Coordenadas en subespacio latente continuo \\mathbf{z} y asignación a clusters morfológicos',
    exoplanetProblem:
      'Descubrir familias morfológicas de subestructuras (anillos, espirales, brechas) en discos de ALMA',
    classicalBaseline: 'Ajuste de perfiles radiales analíticos y descomposición PCA lineal',
    mlApproach: 'Variational Autoencoders (VAE), UMAP y agrupamiento jerárquico HDBSCAN',
    validationMetric:
      'Coeficiente Silhouette, pureza de agrupamiento y error de reconstrucción residual',
    failureMode:
      'Agrupamiento de objetos por artefactos de síntesis de apertura de ALMA en lugar de física de disco',
    tone: 'transfer',
    miniatureSrc: s00VisualAssets.miniatures.verbDescribir,
    diagramDetail: {
      badge: 'Espacio latente',
      description: 'Reducción dimensional y agrupamiento morfológico en variedad de baja dimensión',
    },
  },
  {
    id: 'priorizar',
    number: '05',
    verb: 'Priorizar',
    label: '05 · Priorizar',
    kicker: '05 · ASIGNACIÓN ÓPTIMA',
    mathematicalMapping:
      'f_\\theta: \\mathcal{X} \\to \\mathbb{R}, \\quad x_i \\succ x_j \\iff f_\\theta(x_i) > f_\\theta(x_j)',
    lossFunction:
      '\\mathcal{L}_{\\text{rank}} = \\sum_{i, j} \\log(1 + e^{-(s_i - s_j)}) + \\lambda \\, \\text{Cost}(x_i)',
    outputSpace:
      'Cola ordenada de candidatos jerarquizada por rendimiento científico esperado por hora de telescopio',
    exoplanetProblem:
      'Seleccionar las 30 mejores dianas entre 10,000 eventos de TESS para confirmación en ESPRESSO/JWST',
    classicalBaseline:
      'Filtro manual por magnitud aparente V y relación señal-ruido geométrica simple',
    mlApproach:
      'Learning to Rank (RankNet / LambdaMART) ponderado con modelos de visibilidad y brillo estelar',
    validationMetric:
      'Normalized Discounted Cumulative Gain (NDCG@K) y fracción de planetas confirmados por noche',
    failureMode:
      'Exclusión sistemática de tipos planetarios poco convencionales por sesgo de la función de utilidad',
    tone: 'limit',
    miniatureSrc: s00VisualAssets.miniatures.verbPriorizar,
    diagramDetail: {
      badge: 'Cola jerárquica',
      description: 'Ordenamiento por función de utilidad científica y disponibilidad instrumental',
    },
  },
];

export const s00ImpactCases: readonly S00ImpactCase[] = [
  {
    id: 'astronet',
    number: '01',
    title: 'Curvas de luz: recuperar señales débiles',
    mission: 'Telescopio Espacial Kepler',
    sourceId: 'shallue-vanderburg-2018',
    problem:
      'Decenas de miles de curvas de luz contienen tránsitos reales con SNR marginal que quedan enterrados bajo el ruido estelar y artefactos instrumentales.',
    data: 'Curvas de luz fotométricas dobladas en fase de Kepler, con vistas multiescala (global de 201 bins y local de 61 bins).',
    intervention:
      'Una red neuronal convolucional 1D profunda de dos ramas clasifica candidatos y aprende la geometría simétrica de la caída.',
    figure: '98,8 %',
    figureLabel: 'Ranking favorable en test set',
    result:
      'El modelo validó 2 nuevos planetas en sistemas multiplanetarios conocidos (Kepler-90 i y Kepler-80 g) que habían pasado desapercibidos.',
    limit:
      'La inferencia depende críticamente de la precisión del periodo P y tiempo t₀ estimados previamente; si el preprocesamiento falla, la red descarta el planeta.',
    claimStatus:
      'Resultado publicado en revista arbitrada; el porcentaje describe el ranking sobre el benchmark específico del estudio.',
    tone: 'data',
    miniatureSrc: s00VisualAssets.miniatures.impactAstronet,
    study: {
      authors: 'Shallue, C. J., & Vanderburg, A.',
      year: 2018,
      title:
        'Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90',
      journal: 'The Astronomical Journal, 155(2), 94',
      doi: '10.3847/1538-3881/aa9e09',
      url: 'https://doi.org/10.3847/1538-3881/aa9e09',
      arxivUrl: 'https://arxiv.org/abs/1712.05044',
    },
    dataArchive: {
      name: 'NASA Exoplanet Archive (Kepler TCE Table)',
      url: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=q1_q17_dr25_tce',
      badge: 'Archivo NASA',
    },
    codeRepo: {
      name: 'Google Research (AstroNet GitHub)',
      url: 'https://github.com/google-research/astronet',
    },
  },
  {
    id: 'stability',
    number: '02',
    title: 'Dinámica orbital: emulador de estabilidad N-cuerpos',
    mission: 'Sistemas multiplanetarios compactos',
    sourceId: 'tamayo-2016',
    problem:
      'Determinar si un sistema multiplanetario compacto es dinámicamente estable a lo largo de 10⁹ órbitas requiere integraciones numéricas de N-cuerpos computacionalmente prohibitivas.',
    data: 'Series temporales de integraciones orbitales cortas (10⁴ órbitas) procesadas para extraer métricas de caos (espectro de potencias y MEGNO).',
    intervention:
      'Un clasificador supervisado (SPOCK: Stability of Planetary Orbital Configurations Klassifier) predice estabilidad a 10⁹ órbitas en milisegundos.',
    figure: '10⁵×',
    figureLabel: 'Aceleración computacional',
    result:
      'Permite caracterizar la estabilidad de millones de configuraciones orbitales para acotar masas de sistemas como TRAPPIST-1.',
    limit:
      'El modelo sustituto está restringido al espacio de parámetros y multiplicidades de su entrenamiento; no generaliza a arquitecturas con perturbadores externos masivos.',
    claimStatus:
      'Modelo ampliamente validado en la literatura astrofísica (Tamayo et al. 2020, PNAS).',
    tone: 'model',
    miniatureSrc: s00VisualAssets.miniatures.impactEstabilidad,
    study: {
      authors: 'Tamayo, D., Silburt, A., Valencia, D., et al.',
      year: 2020,
      title: 'Predicting the long-term stability of compact multiplanet systems',
      journal: 'Proceedings of the National Academy of Sciences, 117(31), 18194-18205',
      doi: '10.1073/pnas.2004222117',
      url: 'https://doi.org/10.1073/pnas.2004222117',
      arxivUrl: 'https://arxiv.org/abs/2007.06521',
    },
    codeRepo: {
      name: 'SPOCK GitHub Repository',
      url: 'https://github.com/dtamayo/spock',
    },
  },
  {
    id: 'atmosphere',
    number: '03',
    title: 'Espectroscopía: inferencia atmosférica rápida',
    mission: 'Telescopio Espacial James Webb (JWST)',
    sourceId: 'marquez-neila-2018',
    problem:
      'El atmospheric retrieval bayesiano clásico con MCMC requiere días de cálculo por cada espectro observado para resolver la transferencia radiativa.',
    data: 'Rejillas sintéticas masivas de espectros de transmisión calculados con códigos radiativos (PICASO / petitRADTRANS) variando composición y temperatura.',
    intervention:
      'Aproximadores neuronales y Normalizing Flows amortizan la inferencia posterior bayesiana (Neural Posterior Estimation / SBI).',
    figure: '1 ms',
    figureLabel: 'Tiempo de inferencia posterior',
    result:
      'Aproximación en milisegundos de distribuciones posteriores completas sobre abundancias de H₂O, CO₂ y temperatura base.',
    limit:
      'Degeneración severa: composiciones químicas muy diferentes con nubes opacas pueden generar espectros idénticos; la red no puede inventar información ausente.',
    claimStatus: 'Enfoque activo en la era JWST (Márquez-Neila 2018 / Vasist et al. 2023 A&A).',
    tone: 'model',
    miniatureSrc: s00VisualAssets.miniatures.impactAtmosfera,
    study: {
      authors: 'Márquez-Neila, P., Fisher, C., Sznitman, R., & Heng, K.',
      year: 2018,
      title: 'Supervised machine learning for analysing spectra of exoplanetary atmospheres',
      journal: 'Nature Astronomy, 2(9), 719-724',
      doi: '10.1038/s41550-018-0504-2',
      url: 'https://doi.org/10.1038/s41550-018-0504-2',
      arxivUrl: 'https://arxiv.org/abs/1806.03944',
    },
  },
  {
    id: 'contrast',
    number: '04',
    title: 'Alto contraste: sustracción no lineal de speckles',
    mission: 'VLT / SPHERE y Gemini / GPI',
    sourceId: 'gomez-gonzalez-2018',
    problem:
      'Los speckles cuasi-estáticos generados por imperfecciones ópticas enmascaran las señales de exoplanetas tenues a separaciones angulares cortas.',
    data: 'Secuencias de imágenes angulares ADI (Angular Differential Imaging) con coronografía infrarroja.',
    intervention:
      'Autoencoders convolucionales profundos modelan el halo estelar no lineal y extraen el planeta sin atenuar su flujo cromático.',
    figure: '2-3×',
    figureLabel: 'Mejora en contraste a separaciones cortas',
    result:
      'Detección de compañeros subestelares a menor separación angular que los métodos basados en PCA lineal clásico (KLIP / LOCI).',
    limit:
      'Riesgo de atenuación de señal (self-subtraction): el modelo puede aprender a borrar el planeta si se confunde con la estructura del speckle.',
    claimStatus:
      'Algoritmo comprobado en datos de archivo de VLT/SPHERE (Gómez-González et al. 2018, A&A).',
    tone: 'limit',
    miniatureSrc: s00VisualAssets.miniatures.impactContraste,
    study: {
      authors: 'Gómez-González, C. A., Absil, O., & Absil, P.-A.',
      year: 2018,
      title: 'Deep learning for exoplanet detection in high-contrast imaging',
      journal: 'Astronomy & Astrophysics, 613, A71',
      doi: '10.1051/0004-6361/201732060',
      url: 'https://doi.org/10.1051/0004-6361/201732060',
      arxivUrl: 'https://arxiv.org/abs/1711.02641',
    },
  },
  {
    id: 'validation',
    number: '05',
    title: 'Validación estadística: confirmación probabilística',
    mission: 'Catálogo de Candidatos Kepler',
    sourceId: 'armstrong-2021',
    problem:
      'Miles de candidatos de tránsito en el archivo de Kepler carecen de tiempo de telescopio disponible para confirmación por velocidad radial.',
    data: 'Variables fotométricas, métricas de centroiding de píxeles, duraciones de tránsito y probabilidades a priori estelares.',
    intervention:
      'Clasificador probabilístico de validación que calcula formalmente la probabilidad de falso positivo (FPP < 1%).',
    figure: '50',
    figureLabel: 'Planetas validados estadísticamente',
    result:
      'Validación estadística simultánea de 50 planetas confirmados en los datos de Kepler mediante aprendizaje automático.',
    limit:
      'La validación depende críticamente de la precisión de los priors astrofísicos y de la ausencia de contaminación por binarias de fondo no resueltas.',
    claimStatus:
      'Cifra reportada en Monthly Notices of the Royal Astronomical Society (Armstrong et al. 2021).',
    tone: 'decision',
    miniatureSrc: s00VisualAssets.miniatures.impactRobovetter,
    study: {
      authors: 'Armstrong, D. J., Gamper, J., & Damoulas, T.',
      year: 2021,
      title: 'Exoplanet validation with machine learning: 50 new validated Kepler planets',
      journal: 'Monthly Notices of the Royal Astronomical Society, 500(4), 4849-4860',
      doi: '10.1093/mnras/staa3698',
      url: 'https://doi.org/10.1093/mnras/staa3698',
      arxivUrl: 'https://arxiv.org/abs/2008.10512',
    },
  },
  {
    id: 'candidate-search',
    number: '06',
    title: 'Vetting automatizado: clasificación homogénea de sondeos',
    mission: 'Kepler DR24 / DR25 Robovetter',
    sourceId: 'mccauliff-2015',
    problem:
      'La inspección visual manual de cientos de miles de eventos de cruce de umbral (TCEs) por astrónomos es inconsistente y genera sesgos humanos no reproducibles.',
    data: 'Diagnósticos fotométricos, pruebas de forma de tránsito, pruebas de eclipse secundario y desplazamientos de centroide de píxeles.',
    intervention:
      'Random Forests y árboles de decisión automatizados entrenados sobre poblaciones de inyecciones sintéticas.',
    figure: '100 %',
    figureLabel: 'Reproducibilidad y homogeneidad en catálogo',
    result:
      'Generación de los catálogos finales de Kepler (DR24/DR25) con completitud y pureza caracterizadas cuantitativamente.',
    limit:
      'Los algoritmos heredan los sesgos de las pruebas de diagnóstico elegidas; si una prueba descarta tránsitos en V con SNR bajo, el catálogo queda truncado.',
    claimStatus:
      'Base de los estudios de tasas de ocurrencia planetaria moderna (McCauliff et al. 2015, ApJ).',
    tone: 'decision',
    miniatureSrc: s00VisualAssets.miniatures.impactTess,
    study: {
      authors: 'McCauliff, S. D., Jenkins, J. M., Catanzarite, J., et al.',
      year: 2015,
      title: 'Automatic Classification of Kepler Planetary Transit Candidates',
      journal: 'The Astrophysical Journal, 806(1), 6',
      doi: '10.1088/0004-637X/806/1/6',
      url: 'https://doi.org/10.1088/0004-637X/806/1/6',
      arxivUrl: 'https://arxiv.org/abs/1408.1453',
    },
  },
];

export const s00Branches: readonly S00Branch[] = [
  {
    id: 'astronomia',
    number: '01',
    label: 'Problema astronómico',
    kicker: '01 · CIENCIA DEL MUNDO',
    question: '¿Qué queremos comprender o resolver sobre los sistemas planetarios?',
    product:
      'Pregunta científica acotada, unidad de análisis, observable físico y criterio de utilidad.',
    responsibility:
      'Conservar el significado físico de la pregunta y el anclaje a las propiedades del mundo.',
    tone: 'question',
    tools: ['Astropy', 'Lightkurve', 'Astroquery', 'NASA Exoplanet Archive', 'MAST Archive'],
    givesToOthers:
      'Fenómeno observable, datos calibrados, unidades físicas y sesgos de selección observacionales.',
    receivesFromOthers:
      'Modelos predictivos rápidos, aproximaciones bayesianas y código reproducible verificado.',
    miniatureSrc: s00VisualAssets.miniatures.branchAstronomia,
    diagramDetail: {
      badge: 'Fenómeno físico',
      role: 'Gobierna qué tiene valor científico y qué límites impone la naturaleza',
    },
  },
  {
    id: 'teoria',
    number: '02',
    label: 'Teoría formal ML',
    kicker: '02 · FORMALISMO COMPUTACIONAL',
    question:
      '¿Qué objeto matemático, tarea, función de pérdida y supuestos de generalización usamos?',
    product:
      'Mapeo f_θ, espacio de hipótesis, función de costo, garantías estadísticas y diagnóstico de fallas.',
    responsibility:
      'Explicar qué aprende el algoritmo, cómo generaliza y cuándo sus supuestos se rompen.',
    tone: 'model',
    tools: ['PyTorch', 'Scikit-learn', 'JAX', 'SBI / Normalizing Flows', 'Torchvision'],
    givesToOthers:
      'Formalismo de optimización, funciones de pérdida asimétricas y métricas rigurosas de evaluación.',
    receivesFromOthers:
      'Problemas astronómicos auténticos y datos físicos que no pueden trivializarse.',
    miniatureSrc: s00VisualAssets.miniatures.branchTeoria,
    diagramDetail: {
      badge: 'Inferencia formal',
      role: 'Gobierna el mapeo matemático, la regularización y la cuantificación de incertidumbre',
    },
  },
  {
    id: 'aplicacion',
    number: '03',
    label: 'Aplicación reproducible',
    kicker: '03 · PRÁCTICA VERIFICABLE',
    question: '¿Cómo implementamos, diagnosticamos, documentamos e interpretamos la solución?',
    product:
      'Código abierto comprobable, pipelines deterministas, experimentos trazables y cuadernos interactivos.',
    responsibility:
      'Hacer transparente y reproducible el camino desde el dato crudo hasta la afirmación científica.',
    tone: 'transfer',
    tools: ['Git & GitHub', 'Conda & Poetry', 'Jupyter & Colab', 'ArviZ', 'Pytest & Vitest'],
    givesToOthers:
      'Comprobación experimental, reproducibilidad comunitaria y artefactos de software reutilizables.',
    receivesFromOthers:
      'Preguntas físicas fundamentadas y formulaciones matemáticas sin recetas ciegas.',
    miniatureSrc: s00VisualAssets.miniatures.branchAplicacion,
    diagramDetail: {
      badge: 'Software científico',
      role: 'Garantiza que cualquier resultado pueda ser auditado, refutado y transferido',
    },
  },
];

export const s00ClosureSteps: readonly S00ClosureStep[] = [
  {
    id: 'pregunta',
    number: '01',
    stepName: 'Pregunta',
    title: 'De la ambición al fenómeno físico',
    subtitle: 'Acotar la curiosidad en un observable concreto',
    s00Decision:
      'Delimitar qué propiedad física del sistema planetario gobierna la señal observable.',
    epistemologicalRisk:
      'Tratar ambiciones abstractas como problemas directos de optimización matemática.',
    s01Bridge: 'S01 formaliza la relación entre el sistema físico y el problema de decisión.',
    formula: '\\text{Mundo} \\longrightarrow \\text{Pregunta física acotada}',
    tone: 'question',
    challenge: {
      question:
        '¿Cuál de las siguientes formulaciones expresa una pregunta física acotada para Machine Learning en exoplanetas?',
      options: [
        {
          id: 'ambition',
          label: 'Descubrir planetas habitables con formas de vida orgánica en la Vía Láctea.',
          correct: false,
          feedback:
            'Es una ambición abstracta no computable sin variables observables delimitadas ni función de pérdida definida.',
        },
        {
          id: 'physical',
          label:
            '¿Qué firma de absorción en 1.4 µm revela presencia de vapor de agua en el espectro de transmisión?',
          correct: true,
          feedback:
            'Excelente. Delimita un observable espectroscópico medible y un parámetro molecular físico concreto.',
        },
        {
          id: 'unfocused',
          label:
            'Descargar todas las curvas de luz disponibles y buscar anomalías sin hipótesis previa.',
          correct: false,
          feedback:
            'Carece de unidad de análisis, observable objetivo y criterio de éxito científico evaluable.',
        },
      ],
    },
  },
  {
    id: 'medicion',
    number: '02',
    stepName: 'Medición',
    title: 'El instrumento impone la geometría',
    subtitle: 'Diferenciar observable registrado de parámetro inferido',
    s00Decision:
      'Separar el observable crudo (flujo, Doppler, espectro, contraste) de las propiedades físicas que se deducen.',
    epistemologicalRisk:
      'Nombrar masa, radio o atmósfera como si fueran columnas directas del telescopio.',
    s01Bridge: 'S01 formaliza la función de observación y el ruido del detector.',
    formula: '\\Delta F(t), \\quad \\Delta v_r(t), \\quad F(\\lambda), \\quad I(x, y)',
    tone: 'data',
    challenge: {
      question:
        '¿Cuál de los siguientes elementos constituye un observable instrumental directo y no una inferencia física?',
      options: [
        {
          id: 'inferred_radius',
          label: 'El radio planetario exacto expresado en radios terrestres.',
          correct: false,
          feedback:
            'El radio es una propiedad física deducida tras modelar la profundidad del tránsito y conocer el radio estelar.',
        },
        {
          id: 'direct_flux',
          label: 'La serie temporal de flujo relativo normalizado y su dispersión fotométrica.',
          correct: true,
          feedback:
            'Exacto. Es la señal física cruda registrada directamente por los píxeles del detector del telescopio.',
        },
        {
          id: 'inferred_mass',
          label: 'La masa mínima del planeta calculada mediante velocidad radial.',
          correct: false,
          feedback:
            'La masa es un parámetro físico derivado tras resolver la semiamplitud Doppler K observada.',
        },
      ],
    },
  },
  {
    id: 'dato',
    number: '03',
    stepName: 'Dato',
    title: 'El ciclo de vida de la evidencia',
    subtitle: 'Navegar de la observación cruda al conjunto de entrenamiento',
    s00Decision:
      'Identificar qué sesgos de selección, gaps temporales o artefactos heredan las instancias.',
    epistemologicalRisk:
      'Ignorar el sesgo Malmquist y la fuga de información (data leakage) entre sistemas estelares.',
    s01Bridge: 'S01 define formalmente la instancia x_i y la unidad de análisis.',
    formula: 'x_i \\in \\mathcal{X}, \\quad \\mathbf{X} \\in \\mathbb{R}^{N \\times P}',
    tone: 'data',
    challenge: {
      question:
        'Al construir el conjunto de entrenamiento a partir de un catálogo astronómico, ¿qué sesgo domina el riesgo epistemológico?',
      options: [
        {
          id: 'malmquist',
          label:
            'Sesgo de Malmquist: los instrumentos detectan preferentemente fuentes más brillantes y tránsitos más profundos.',
          correct: true,
          feedback:
            'Correcto. El volumen de detección favorece objetos extremos, sesgando la representatividad poblacional de los datos.',
        },
        {
          id: 'detector_noise',
          label: 'Que el detector confunda un fotón óptico con uno infrarrojo.',
          correct: false,
          feedback:
            'La respuesta espectral del detector está calibrada instrumentalmente; el riesgo crítico está en la selección observacional de la muestra.',
        },
        {
          id: 'metadata_lost',
          label: 'Que los catálogos astronómicos nunca incluyan identificadores estelares.',
          correct: false,
          feedback:
            'Los catálogos poseen metadatos astrométricos rigurosos; el problema metodológico es la representatividad física de la muestra.',
        },
      ],
    },
  },
  {
    id: 'representacion',
    number: '04',
    stepName: 'Representación',
    title: 'Del flujo continuo al tensor computable',
    subtitle: 'Elegir qué estructura física se preserva en el vector',
    s00Decision:
      'Estructurar representaciones multiescala (global/local) que aíslen la variabilidad estelar.',
    epistemologicalRisk:
      'Aplanar o normalizar datos destruyendo información de fase o simetría física.',
    s01Bridge: 'S01 conecta la representación con el espacio de características del modelo.',
    formula: '\\phi(x) \\in \\mathbb{R}^D, \\quad \\text{Vista Global + Vista Local}',
    tone: 'model',
    challenge: {
      question:
        '¿Por qué se estructuran representaciones multiescala (vista global + vista local) en curvas de tránsito?',
      options: [
        {
          id: 'augment',
          label:
            'Para duplicar artificialmente la cantidad de datos sin realizar nuevas observaciones.',
          correct: false,
          feedback:
            'Duplicar muestras sin una hipótesis de invarianza física no resuelve la confusión con variabilidad estelar.',
        },
        {
          id: 'multiscale',
          label:
            'La vista global captura variabilidad estelar y ruido de fondo, mientras la vista local resuelve la morfología del tránsito.',
          correct: true,
          feedback:
            'Exacto. Aísla la simetría periódica en U/V del tránsito frente a manchas, pulsaciones estelares y artefactos sistemáticos.',
        },
        {
          id: 'arbitrary',
          label:
            'Porque las redes convolucionales solo admiten tensores de entrada bidimensionales.',
          correct: false,
          feedback:
            'La representación matemática se diseña para respetar la física de la señal, no por una restricción arbitraria de software.',
        },
      ],
    },
  },
  {
    id: 'tarea',
    number: '05',
    stepName: 'Tarea',
    title: 'El verbo matemático y la función de pérdida',
    subtitle: 'Nombrar la acción computable antes del algoritmo',
    s00Decision:
      'Elegir entre detectar, clasificar, estimar, describir o priorizar según la necesidad científica.',
    epistemologicalRisk:
      'Elegir una arquitectura de moda sin saber qué espacio de salida o pérdida matemática requiere.',
    s01Bridge: 'S01 formaliza el espacio de hipótesis y el objetivo de optimización.',
    formula:
      'f_\\theta: \\mathcal{X} \\to \\mathcal{Y}, \\quad \\min_\\theta \\mathcal{L}(f_\\theta(x), y)',
    tone: 'model',
    challenge: {
      question:
        'Para estimar la temperatura atmosférica continua a partir de un espectro observado, ¿qué tarea matemática se formula?',
      options: [
        {
          id: 'classification',
          label: 'Clasificación binaria supervisada con pérdida de entropía cruzada.',
          correct: false,
          feedback:
            'La temperatura es un parámetro continuo con orden métrico físico, no una categoría dicotómica.',
        },
        {
          id: 'regression',
          label:
            'Regresión continua supervisada minimizando error cuadrático medio o pérdida de Huber.',
          correct: true,
          feedback:
            'Correcto. Mapea el vector de flujo a un valor continuo en Kelvin penalizando la discrepancia cuadrática o robusta.',
        },
        {
          id: 'clustering',
          label: 'Clustering no supervisado con k-means para agrupar espectros similares.',
          correct: false,
          feedback:
            'El agrupamiento no asigna valores continuos calibrados de temperatura a nuevas observaciones.',
        },
      ],
    },
  },
  {
    id: 'evaluacion',
    number: '06',
    stepName: 'Evaluación',
    title: 'Métricas alineadas con el costo científico',
    subtitle: 'Comparar siempre con una línea base clásica',
    s00Decision:
      'Evaluar con PR-AUC, Brier score y cobertura bayesiana en datos independientes frente a BLS o Robovetter.',
    epistemologicalRisk:
      'Reportar accuracy engañosa en clases desbalanceadas o celebrar métricas de laboratorio.',
    s01Bridge: 'S01 introduce la regla de decisión bayesiana y el riesgo empírico.',
    formula:
      '\\text{PR-AUC}, \\quad \\text{Coverage}(\\theta), \\quad \\text{Costo}(\\text{FP}) \\gg \\text{Costo}(\\text{FN})',
    tone: 'decision',
    challenge: {
      question:
        'En un censo donde el 99% de las curvas son falsos positivos o ruido, ¿por qué la exactitud (accuracy) del 99% es engañosa?',
      options: [
        {
          id: 'trivial_classifier',
          label:
            'Un modelo trivial que clasifique todo como "no planeta" obtendría 99% de accuracy sin detectar ningún mundo.',
          correct: true,
          feedback:
            'Excelente. El desbalance severo exige métricas sensibles al descubrimiento (PR-AUC, recall de candidatos) y comparación frente a BLS.',
        },
        {
          id: 'scale_wrong',
          label: 'Porque en astronomía ninguna métrica por debajo de 99.9% es aceptada.',
          correct: false,
          feedback:
            'El problema no es un umbral numérico arbitrario, sino que la exactitud ignora por completo la clase minoritaria de interés científico.',
        },
        {
          id: 'no_fp',
          label: 'Porque los falsos positivos nunca ocurren en datos espaciales.',
          correct: false,
          feedback:
            'Binarias eclipsantes y manchas estelares producen miles de falsos positivos en misiones como Kepler o TESS.',
        },
      ],
    },
  },
  {
    id: 'limite',
    number: '07',
    stepName: 'Límite',
    title: 'La salida es evidencia condicionada',
    subtitle: 'El contrato epistemológico del curso',
    s00Decision:
      'Acompañar toda salida de modelo con sus supuestos, su incertidumbre y su necesidad de seguimiento.',
    epistemologicalRisk:
      'Tratar un score o un posterior como confirmación física definitiva de un mundo.',
    s01Bridge: 'S01 abre la construcción formal del paradigma de aprendizaje supervisado.',
    formula:
      '\\text{Salida} = \\text{Evidencia condicionada}(\\text{Datos}, \\text{Física}, \\text{Supuestos}, \\text{Evaluación})',
    tone: 'limit',
    challenge: {
      question:
        'Si un modelo predice un candidato exoplanetario con probabilidad 0.999, ¿cuál es la afirmación científica rigurosa y válida?',
      options: [
        {
          id: 'absolute_truth',
          label:
            'El planeta está confirmado físicamente y se puede anunciar su descubrimiento sin observaciones adicionales.',
          correct: false,
          feedback:
            'Viola el contrato epistemológico: un score estadístico nunca sustituye la confirmación instrumental independiente.',
        },
        {
          id: 'conditional_evidence',
          label:
            'Constituye evidencia condicionada de alta prioridad para optimizar campañas de seguimiento en velocidad radial o espectroscopía.',
          correct: true,
          feedback:
            'Brillante. Reconoce que ML produce evidencia condicionada que guía la decisión experimental dentro de sus límites físicos.',
        },
        {
          id: 'laws_learned',
          label: 'El modelo aprendió de forma autónoma las leyes fundamentales de la física.',
          correct: false,
          feedback:
            'El modelo optimizó una correspondencia estadística en representaciones computables, no dedujo principios físicos fundamentales.',
        },
      ],
    },
  },
];

function caution(
  id: string,
  distinction: string,
  confusion: string,
  consequence: string,
): CautionContent {
  return { id, distinction, confusion, consequence };
}

function prompt(
  id: string,
  intent: TeacherPromptContent['intent'],
  question: string,
  guidance: string,
): TeacherPromptContent {
  return { id, intent, question, guidance, unitId: id };
}

export const s00Units: readonly S00Unit[] = [
  {
    id: 's00-pregunta',
    groupLabel: '01 · abrir',
    title: 'Un mundo se vuelve observable',
    partLabel: 'Pregunta guía',
    tone: 'question',
    function: 'opening',
    shortLabel: 'Mundo',
    question: '¿Qué podemos aprender de un mundo que casi nunca podemos observar directamente?',
    idea: 'Un exoplaneta entra en la ciencia por una medición indirecta; esa medición organiza todo lo que podemos afirmar después.',
    content:
      'Una disminución de brillo, un desplazamiento espectral, una imagen o una simulación no son todavía la historia completa del planeta. Son puntos de entrada a una cadena: mundo → pregunta → medición → dato → representación → tarea → modelo → evaluación → interpretación.',
    interpretation:
      'El curso empieza por la relación entre una curiosidad astronómica y la evidencia que podría hacerla investigable.',
    limits:
      'La ilustración es una metáfora de la cadena. La salida de un modelo sigue siendo evidencia condicionada por datos, supuestos y evaluación.',
    conceptIds: ['exoplaneta', 'transito', 'espectro', 'representacion'],
    visualKind: 'hero',
    visualAlt:
      'Ilustración de una estrella con un planeta en tránsito, un telescopio y una curva de luz conectados por una línea de observación.',
    visualCaption:
      'De la escala de un mundo a la escala de una señal: la medición indirecta abre la pregunta científica.',
    conceptCards: s00ConceptCards,
    caution: caution(
      's00-evidence-is-conditioned',
      'Una señal observada y una conclusión planetaria ocupan niveles diferentes de evidencia.',
      'Leer una curva o un score como si ya fuera una explicación confirmada.',
      'Se borran los pasos de confirmación, comparación y límite que sostienen la interpretación.',
    ),
    teacherPrompt: prompt(
      's00-pregunta-docente',
      'opening',
      '¿Qué parte de esta escena es mundo, qué parte es medición y qué parte es interpretación?',
      'Pedir que el grupo separe objeto físico, observación y conclusión antes de introducir la palabra modelo.',
    ),
  },
  {
    id: 's00-ciencias-planetarias',
    groupLabel: '02 · situar',
    title: 'Las ciencias planetarias estudian sistemas',
    partLabel: 'Campo científico',
    tone: 'question',
    function: 'science',
    shortLabel: 'Campo',
    question: '¿Qué preguntas caben dentro de las ciencias planetarias?',
    idea: 'Los mundos se estudian como sistemas con origen, estructura, evolución, interacción y condiciones de habitabilidad.',
    content:
      'Las ciencias planetarias conectan astronomía, física, geología, química y biología para estudiar cómo se forman los mundos, cómo cambian y qué condiciones pueden sostener. Los exoplanetas amplían ese laboratorio y obligan a combinar mediciones indirectas con modelos físicos y estadística.',
    interpretation:
      'ML puede recorrer una parte de una investigación amplia cuando la tarea conserva la pregunta física que le da sentido.',
    limits:
      'Una lista de métodos o de planetas no agota el campo. La sesión usa exoplanetas como entrada pedagógica, y conserva la definición más amplia para las fuentes del área.',
    conceptIds: ['exoplaneta', 'espectro', 'velocidad-radial'],
    visualKind: 'planetary-science',
    visualAlt:
      'Mapa textual de cuatro preguntas conectadas: origen, estructura, evolución y habitabilidad de los mundos.',
    visualCaption:
      'Las preguntas astronómicas forman una red: cada medición ilumina una propiedad y deja otras abiertas.',
    planetaryPillars: s00PlanetaryPillars,
    caution: caution(
      's00-field-is-broader',
      'Una aplicación de ML responde una pregunta situada dentro de un campo interdisciplinario.',
      'Presentar el algoritmo como si definiera por sí solo el problema astronómico.',
      'La elección técnica pierde el vínculo con la física, la escala y la evidencia disponible.',
    ),
    teacherPrompt: prompt(
      's00-ciencias-docente',
      'diagnostic',
      '¿Qué pregunta de origen, estructura, evolución o habitabilidad podría conectarse con una medición concreta?',
      'Aceptar varias escalas y pedir una propiedad observable para que la pregunta pueda acotarse.',
    ),
  },
  {
    id: 's00-medicion',
    groupLabel: '03 · observar',
    title: 'Formular la observación: de la intención a la señal',
    partLabel: 'Intención → Instrumento → Señal',
    tone: 'data',
    function: 'bridge',
    shortLabel: 'Medición',
    question:
      '¿Cómo se transforma una intención científica en un observable y una unidad computable?',
    idea: 'Una pregunta astronómica exige una geometría de observación, un instrumento físico y una unidad de análisis que preserve la física de la señal sin introducir artefactos.',
    content:
      'La curiosidad científica (“¿qué planetas transitan?”, “¿qué atmósfera los cubre?”) no alimenta directamente una red neuronal. Primero exige acotar el fenómeno físico, elegir una geometría instrumental (tránsito, Doppler, espectro, alto contraste) y estructurar una unidad de datos que declare qué cuenta como instancia y qué salida computable guía la decisión.',
    interpretation:
      'Acotar la intención y modelar la medición impiden saltar a ciegas de una idea vaga a un algoritmo sin datos ni límites.',
    limits:
      'Cada modalidad observacional impone sesgos de selección, límites de difracción, degeneraciones físicas y ruido que ningún modelo puede suprimir por decreto.',
    conceptIds: [
      'transito',
      'velocidad-radial',
      'espectro',
      'representacion',
      'tarea-salida',
      'senal-ruido',
    ],
    visualKind: 'measurement',
    visualAlt:
      'Cuatro modalidades observacionales articulan la intención científica, la física del instrumento, el observable y la unidad de datos para Machine Learning.',
    visualCaption:
      'De la intención al dato computable: el instrumento fija la física de la señal y la unidad de análisis estructura el aprendizaje.',
    measurementModalities: s00MeasurementModalities,
    caution: caution(
      's00-observable-and-unit-are-chosen',
      'La señal observada y la unidad de análisis son decisiones científicas con consecuencias directas en el aprendizaje.',
      'Creer que el instrumento entrega parámetros físicos directos o que el algoritmo compensa una mala formulación.',
      'Se confunden observables con propiedades inferidas y se arriesgan sesgos y fugas de datos irreversibles.',
    ),
    teacherPrompt: prompt(
      's00-medicion-docente',
      'diagnostic',
      'Identifica la intención científica, el observable registrado y la unidad de datos que entra al modelo.',
      'Pedir que separen la propiedad que interesa de la señal que el instrumento realmente produce.',
    ),
  },
  {
    id: 's00-datos',
    groupLabel: '04 · representar',
    title: 'Datos astronómicos no son una sola cosa',
    partLabel: 'Paisaje de datos',
    tone: 'data',
    function: 'bridge',
    shortLabel: 'Datos',
    question:
      '¿Qué cambia cuando la evidencia entra como curva, espectro, imagen, catálogo o simulación?',
    idea: 'La forma, procedencia y selección de los datos condicionan la tarea antes de que aparezca cualquier arquitectura.',
    content:
      'Una curva tiene orden temporal; un espectro, estructura en longitud de onda; una imagen, vecindad espacial; un catálogo, relaciones entre filas y metadatos; una simulación, supuestos generativos. Datos de entrenamiento y salidas añaden etiquetas, scores, posteriores o rankings a la cadena.',
    interpretation:
      'Nombrar la representación permite anticipar qué regularidad puede aprenderse y qué riesgo domina.',
    limits:
      'Las tarjetas son una clasificación de trabajo. Un producto real puede mezclar modalidades, versiones, calibraciones y niveles de reducción.',
    conceptIds: ['catalogo', 'simulacion-inyeccion', 'representacion', 'senal-ruido'],
    visualKind: 'data-landscape',
    visualAlt:
      'Cinco capas de datos se ordenan desde observación hasta salida: curva, catálogo, simulación, entrenamiento y decisión.',
    visualCaption:
      '“Dato astronómico” reúne objetos con geometrías, resoluciones, metadatos y riesgos diferentes.',
    dataCards: s00DataCards,
    caution: caution(
      's00-data-has-shape',
      'La representación conserva estructura y sesgos que participan en el aprendizaje.',
      'Tratar una fila de catálogo, una curva y una imagen como si fueran instancias intercambiables.',
      'Se elige una evaluación que no mide la dificultad ni la incertidumbre del dato disponible.',
    ),
    teacherPrompt: prompt(
      's00-datos-docente',
      'diagnostic',
      'Elige una modalidad y di qué estructura debe conservarse al representarla.',
      'Relacionar forma del dato, unidad de análisis y riesgo principal antes de hablar de dimensionalidad.',
    ),
  },
  {
    id: 's00-ml',
    groupLabel: '05 · ubicar',
    title: 'Cinco verbos para ubicar ML',
    partLabel: 'Tarea y salida',
    tone: 'model',
    function: 'bridge',
    shortLabel: 'Verbos',
    question: '¿Qué está haciendo ML cuando entra en una investigación astronómica?',
    idea: 'Detectar, clasificar, estimar, describir y priorizar nombran acciones distintas y producen salidas diferentes.',
    content:
      'Detectar busca señales compatibles; clasificar organiza clases o probabilidades; estimar devuelve parámetros o posteriores; describir encuentra estructura o representaciones; priorizar ordena casos para una acción posterior. El modelo ocupa un lugar dentro de una cadena evaluable.',
    interpretation:
      'El verbo y la salida ofrecen un puente inicial hacia paradigma, familia de modelo, línea base y métrica.',
    limits:
      'Los cinco verbos no reemplazan una especificación formal. Una aplicación puede combinar tareas y necesitar métricas distintas para cada salida.',
    conceptIds: ['tarea-salida', 'generalizacion', 'evaluacion-limite'],
    visualKind: 'ml-verbs',
    visualAlt:
      'Matriz de cinco verbos de ML con ejemplos de salida: señal, clase, parámetro, grupo y ranking.',
    visualCaption:
      'Antes de escoger una familia de modelos, nombra la acción y el objeto que la salida debe devolver.',
    mlVerbs: s00MLVerbs,
    caution: caution(
      's00-score-is-not-conclusion',
      'Un score, una clase o un parámetro son salidas de un procedimiento con supuestos.',
      'Confundir la salida del modelo con la afirmación científica final.',
      'La evaluación queda desconectada de la decisión y del seguimiento que requiere la evidencia.',
    ),
    teacherPrompt: prompt(
      's00-ml-docente',
      'diagnostic',
      '¿Qué verbo describe mejor una aplicación y cuál sería su salida observable?',
      'Pedir que la respuesta incluya una unidad y una forma de evaluación, aunque sea provisional.',
    ),
  },
  {
    id: 's00-impacto',
    groupLabel: '06 · contrastar',
    title: '¿Qué desbloquea ML?',
    partLabel: 'Galería de impacto',
    tone: 'decision',
    function: 'science',
    shortLabel: 'Impacto',
    question: '¿Qué cambia en la investigación cuando una tarea se puede automatizar o acelerar?',
    idea: 'El valor de ML aparece al ampliar una búsqueda, acelerar una aproximación o hacer más homogénea una decisión, siempre dentro de un dominio.',
    content:
      'La galería sigue el mismo patrón en cada caso: problema → dato → intervención → cifra o salida → resultado → límite. La cifra adquiere significado cuando sabemos qué unidad contó, qué conjunto la produjo y qué evidencia todavía falta.',
    interpretation:
      'La automatización reorganiza el trabajo científico; la responsabilidad consiste en conservar procedimiento, comparación y alcance.',
    limits:
      'Las cifras son reportadas por las fuentes o están marcadas como adaptación didáctica. No son resultados generados por este sitio ni prometen transferencia entre misiones.',
    conceptIds: ['tarea-salida', 'generalizacion', 'evaluacion-limite', 'simulacion-inyeccion'],
    visualKind: 'impact-gallery',
    visualAlt:
      'Comparación horizontal de seis casos de ML en exoplanetas con una métrica o salida y un límite interpretativo.',
    visualCaption:
      'Una cifra de impacto solo se entiende junto con su unidad, conjunto, dominio y siguiente comprobación.',
    impactCases: s00ImpactCases,
    caution: caution(
      's00-impact-needs-context',
      'Una cifra de rendimiento describe un procedimiento en un contexto experimental.',
      'Trasladar porcentajes, aceleraciones o conteos a otra misión sin revisar el dominio.',
      'Se promete una capacidad que la población, los datos o la física del nuevo caso no sostienen.',
    ),
    teacherPrompt: prompt(
      's00-impacto-docente',
      'diagnostic',
      'Elige una cifra de la galería y nombra unidad, conjunto, procedimiento y límite.',
      'Si aparece “validado”, “detectado” o “acelerado”, pedir que el grupo identifique el nivel de afirmación.',
    ),
  },
  {
    id: 's00-ramas',
    groupLabel: '07 · conectar',
    title: 'Tres ramas, una misma pregunta',
    partLabel: 'Curso conectado',
    tone: 'transfer',
    function: 'bridge',
    shortLabel: 'Ramas',
    question: '¿Cómo se mantiene una pregunta astronómica viva al pasar por teoría y aplicación?',
    idea: 'Astronomía, teoría formal ML y aplicación reproducible producen piezas diferentes de una misma investigación.',
    content:
      'La rama astronómica formula una pregunta que valga la pena responder. La teoría la convierte en objeto, tarea, supuestos y evaluación. La aplicación implementa, diagnostica, documenta e interpreta. El recorrido vuelve a la pregunta cada vez que cambia el dato o el modelo.',
    interpretation:
      'Las tres ramas evitan que una solución computacional se desprenda del fenómeno que motivó el análisis.',
    limits:
      'El mapa es una guía de navegación del curso. Una sesión posterior desarrollará formalmente paradigmas, familias de modelos, generalización y líneas base.',
    conceptIds: ['exoplaneta', 'tarea-salida', 'generalizacion', 'evaluacion-limite'],
    visualKind: 'branches',
    visualAlt:
      'Tres nodos conectados en ciclo: problema astronómico, teoría formal ML y aplicación reproducible.',
    visualCaption:
      'La pregunta viaja por tres responsabilidades y regresa a una interpretación que puede ser comprobada.',
    branches: s00Branches,
    caution: caution(
      's00-three-branches-are-linked',
      'Cada rama aporta una responsabilidad distinta a la misma cadena de evidencia.',
      'Separar astronomía, ML y código hasta perder la pregunta original.',
      'La aplicación puede funcionar técnicamente y aun así responder otra pregunta.',
    ),
    teacherPrompt: prompt(
      's00-ramas-docente',
      'transfer',
      '¿Qué producto dejaría cada rama para que otra persona pueda continuar la investigación?',
      'Pedir una frase por rama y terminar con el límite que debe regresar a la pregunta astronómica.',
    ),
  },
];

export const s00Glossary = s00Concepts.map((concept) => ({
  ...concept,
  definition: concept.shortDefinition,
}));

/**
 * S00 conserva siete estaciones temáticas en el carril de presentación.
 * La síntesis y el contrato epistemológico se desarrollan en la actividad interactiva.
 */
export const s00Parts: Readonly<Record<string, readonly S00Part[]>> = {
  's00-pregunta': [
    { id: 'mundo', label: 'Mundo', visualFocus: 'mundo' },
    { id: 'senal', label: 'Conceptos', visualFocus: 'conceptos' },
    { id: 'pregunta-guia', label: 'Pregunta guía', visualFocus: 'pregunta' },
  ],
  's00-ciencias-planetarias': [
    { id: 'origen', label: 'Origen', visualFocus: 'origen' },
    { id: 'estructura', label: 'Estructura', visualFocus: 'estructura' },
    { id: 'evolucion', label: 'Evolución', visualFocus: 'evolucion' },
    { id: 'habitabilidad', label: 'Habitabilidad', visualFocus: 'habitabilidad' },
  ],
  's00-medicion': [
    { id: 'transito', label: 'Tránsito', visualFocus: 'transito' },
    { id: 'radial', label: 'Velocidad radial', visualFocus: 'radial' },
    { id: 'espectro', label: 'Espectro', visualFocus: 'espectro' },
    { id: 'imagen', label: 'Imagen directa', visualFocus: 'imagen' },
  ],
  's00-datos': [
    { id: 'observacion', label: 'Observación', visualFocus: 'observacion' },
    { id: 'catalogo', label: 'Catálogo', visualFocus: 'catalogo' },
    { id: 'simulacion', label: 'Simulación', visualFocus: 'simulacion' },
    { id: 'entrenamiento', label: 'Entrenamiento', visualFocus: 'entrenamiento' },
    { id: 'salida', label: 'Salida', visualFocus: 'salida' },
  ],
  's00-ml': [
    { id: 'detectar', label: 'Detectar', visualFocus: 'detectar' },
    { id: 'clasificar', label: 'Clasificar', visualFocus: 'clasificar' },
    { id: 'estimar', label: 'Estimar', visualFocus: 'estimar' },
    { id: 'describir', label: 'Describir', visualFocus: 'describir' },
    { id: 'priorizar', label: 'Priorizar', visualFocus: 'priorizar' },
  ],
  's00-impacto': [
    { id: 'astronet', label: 'Curvas de luz', visualFocus: 'astronet' },
    { id: 'stability', label: 'Estabilidad orbital', visualFocus: 'stability' },
    { id: 'atmosphere', label: 'Atmósfera', visualFocus: 'atmosphere' },
    { id: 'contrast', label: 'Alto contraste', visualFocus: 'contrast' },
    { id: 'validation', label: 'Validación', visualFocus: 'validation' },
    { id: 'candidate-search', label: 'Candidatos', visualFocus: 'candidate-search' },
  ],
  's00-ramas': [
    { id: 'astronomia', label: 'Problema astronómico', visualFocus: 'astronomia' },
    { id: 'teoria', label: 'Teoría formal ML', visualFocus: 'teoria' },
    { id: 'aplicacion', label: 'Aplicación reproducible', visualFocus: 'aplicacion' },
  ],
};

function fallbackS00Part(unit: S00Unit): readonly S00Part[] {
  return [{ id: 'apertura', label: unit.partLabel, visualFocus: 'overview' }];
}

export function getS00Parts(unitId: string): readonly S00Part[] {
  const unit = s00Units.find((item) => item.id === unitId);
  return s00Parts[unitId] ?? (unit ? fallbackS00Part(unit) : []);
}

export function getS00Part(unitId: string, partIndex = 0): S00Part | null {
  const parts = getS00Parts(unitId);
  return parts[Math.min(Math.max(partIndex, 0), Math.max(parts.length - 1, 0))] ?? null;
}

export interface S00Slide extends SlideRailItem {
  unitId: string;
  unitIndex: number;
  partIndex: number;
  partId: string;
  unitTitle: string;
  unitShortLabel: string;
  tone: S00Unit['tone'];
}

const s00ContentSlides: readonly S00Slide[] = s00Units.flatMap((unit, unitIndex) =>
  getS00Parts(unit.id).map((part, partIndex, parts) => ({
    id: `${unit.id}-${part.id}`,
    groupLabel: unit.groupLabel,
    title: unit.title,
    partLabel: part.label,
    partLabels: parts.map((item) => item.label),
    partIndex,
    tone: unit.tone,
    unitId: unit.id,
    unitIndex,
    partId: part.id,
    unitTitle: unit.title,
    unitShortLabel: unit.shortLabel,
  })),
);

export const s00Slides: readonly S00Slide[] = [
  {
    id: 's00-bibliografia',
    groupLabel: '00 · orientar',
    title: s00Bibliography.title,
    partLabel: 'Fuentes',
    tone: 'model',
    unitId: 's00-bibliografia',
    unitIndex: -1,
    partIndex: 0,
    partId: 'bibliografia',
    unitTitle: s00Bibliography.title,
    unitShortLabel: 'Fuentes',
  },
  ...s00ContentSlides,
];

export function getS00SlideNumber(
  slide: Pick<S00Slide, 'unitIndex' | 'partIndex' | 'unitId'>,
): string {
  if (slide.unitId === 's00-bibliografia') return '00';
  return `${String(slide.unitIndex + 1).padStart(2, '0')}.${slide.partIndex + 1}`;
}

export function getS00SlideIndex(unitId: string, partIndex = 0): number {
  return s00Slides.findIndex((slide) => slide.unitId === unitId && slide.partIndex === partIndex);
}

export function getS00SlideHash(index: number): string {
  const slide = s00Slides[index];
  if (!slide || slide.unitId === 's00-bibliografia') return '#bibliografia';
  const unitHash = slide.unitId.replace(/^s00-/, '');
  return slide.partIndex === 0 ? `#${unitHash}` : `#${unitHash}/${slide.partId}`;
}

export function getS00SlideIndexFromHash(hash: string): number | null {
  const normalized = (() => {
    try {
      return decodeURIComponent(hash.replace(/^#/, '')).trim().toLowerCase();
    } catch {
      return null;
    }
  })();
  if (normalized === null) return null;
  if (normalized === '') return 1;
  if (normalized === 'bibliografia') return 0;
  // Compatibilidad con enlaces previos a cierre -> dirigir a la última subdiapositiva de ramas
  if (normalized.startsWith('cierre')) {
    const ramasIndex = getS00SlideIndex('s00-ramas', 2);
    return ramasIndex >= 0 ? ramasIndex : null;
  }
  const [rawUnitHash, rawPartId, extra] = normalized.split('/');
  if (!rawUnitHash || extra !== undefined) return null;
  // Compatibilidad con hashes previos de acotar
  const unitHash = rawUnitHash === 'acotar' ? 'medicion' : rawUnitHash;
  const partId = rawUnitHash === 'acotar' ? 'transito' : rawPartId;
  const unit = s00Units.find((item) => item.id.replace(/^s00-/, '') === unitHash);
  if (!unit) return null;
  const partIndex = partId ? getS00Parts(unit.id).findIndex((part) => part.id === partId) : 0;
  if (partIndex < 0) return null;
  const index = getS00SlideIndex(unit.id, partIndex);
  return index < 0 ? null : index;
}

export function getS00Unit(index: number): S00Unit | null {
  return s00Units[index - 1] ?? null;
}

export function getS00FlashcardCollection(
  collection: 'pillars' | 'modalities' | 'datacards' | 'verbs' | 'impact',
): readonly S00Flashcard[] {
  switch (collection) {
    case 'pillars':
      return s00PlanetaryPillars.map((p) => ({
        id: p.id,
        collectionId: 'pillars' as const,
        collectionTitle: 'Pilares de Ciencias Planetarias',
        number: p.number,
        title: p.title,
        subtitle: p.subtitle,
        badge: `02.${p.number} · PILAR ACTIVO`,
        tone: p.tone,
        miniatureSrc: p.miniatureSrc,
        miniatureAlt: `Ilustración conceptual del pilar: ${p.title}`,
        miniatureCaption: p.physicalDefinition,
        physicalConcept: p.physicalDefinition,
        formula: p.formula,
        formulaDescription: `Procesos dominantes: ${p.processes.join('; ')}`,
        observableVsInference: {
          observable: p.observables,
          inference: `Propiedades inferidas del mundo y estructura física acotada.`,
        },
        mlRole: p.mlRole,
        instrumentsOrData: p.instruments,
        riskOrLimit: p.physicalLimit,
      }));

    case 'modalities':
      return s00MeasurementModalities.map((m) => ({
        id: m.id,
        collectionId: 'modalities' as const,
        collectionTitle: 'Técnicas Observacionales y Formulación',
        number: m.number,
        title: m.title,
        subtitle: m.subtitle,
        badge: `03.${m.number} · TÉCNICA OBSERVACIONAL`,
        tone: m.tone,
        miniatureSrc: m.miniatureSrc,
        miniatureAlt: `Esquema instrumental de ${m.title}`,
        miniatureCaption: m.diagramDetail.description,
        physicalConcept: `${m.scientificIntention.physicalMotivation} ${m.equationDescription}`,
        formula: m.governingEquation,
        formulaDescription: `Observable: ${m.rawObservable} → Parámetro: ${m.inferredParameter}`,
        observableVsInference: {
          observable: m.rawObservable,
          inference: m.inferredParameter,
        },
        mlRole: `${m.mlOutput.mlRole} Instancia: ${m.mlUnitFormulation.instanceDefinition}`,
        instrumentsOrData: m.instruments,
        riskOrLimit: `${m.physicalLimit} Antipatrón: ${m.operationalUse.commonPitfall}`,
      }));

    case 'datacards':
      return s00DataCards.map((d) => ({
        id: d.id,
        collectionId: 'datacards' as const,
        collectionTitle: 'Ciclo de Vida del Dato Astrofísico',
        number: d.number,
        title: d.title,
        subtitle: d.kicker,
        badge: `04.${d.number} · ETAPA DEL DATO`,
        tone: d.tone,
        miniatureSrc: d.miniatureSrc,
        miniatureAlt: `Representación del dato astronómico: ${d.title}`,
        miniatureCaption: d.diagramDetail.description,
        physicalConcept: d.body,
        formula: d.mathematicalForm,
        formulaDescription: `Estructura: ${d.dataStructure} · Fuente: ${d.exoplanetSource}`,
        observableVsInference: {
          observable: `Pregunta: ${d.question}`,
          inference: `Riesgo: ${d.risk}`,
        },
        mlRole: `Transformación en representaciones tensoriales normalizadas listas para modelos de aprendizaje supervisado o no supervisado.`,
        instrumentsOrData: `Fuente: ${d.exoplanetSource}`,
        riskOrLimit: d.dominantBias,
      }));

    case 'verbs':
      return s00MLVerbs.map((v) => ({
        id: v.id,
        collectionId: 'verbs' as const,
        collectionTitle: 'Verbos Computables de Machine Learning',
        number: v.number,
        title: v.verb,
        subtitle: v.label,
        badge: `05.${v.number} · VERBO COMPUTABLE`,
        tone: v.tone,
        miniatureSrc: v.miniatureSrc,
        miniatureAlt: `Esquema computacional del verbo ${v.verb}`,
        miniatureCaption: v.outputSpace,
        physicalConcept: v.exoplanetProblem,
        formula: `${v.mathematicalMapping} \\quad \\Longleftrightarrow \\quad ${v.lossFunction}`,
        formulaDescription: `Espacio de salida: ${v.outputSpace}`,
        observableVsInference: {
          observable: `Línea base clásica: ${v.classicalBaseline}`,
          inference: `Intervención de Machine Learning: ${v.mlApproach}`,
        },
        mlRole: v.mlApproach,
        instrumentsOrData: `Métrica científica: ${v.validationMetric}`,
        riskOrLimit: `Modo de falla típico: ${v.failureMode}`,
      }));

    case 'impact':
      return s00ImpactCases.map((c) => ({
        id: c.id,
        collectionId: 'impact' as const,
        collectionTitle: 'Estudios de Impacto en Literatura Arbitrada',
        number: c.number,
        title: c.title,
        subtitle: c.mission,
        badge: `06.${c.number} · CASO PUBLICADO · ${c.figure}`,
        tone: c.tone,
        miniatureSrc: c.miniatureSrc,
        miniatureAlt: `Esquema de estudio arbitrado: ${c.title}`,
        miniatureCaption: `${c.study.authors} (${c.study.year}): ${c.study.title}`,
        physicalConcept: c.problem,
        formulaDescription: `Datos observacionales: ${c.data}`,
        observableVsInference: {
          observable: c.data,
          inference: c.result,
        },
        mlRole: c.intervention,
        instrumentsOrData: `${c.mission} · ${c.claimStatus}`,
        riskOrLimit: c.limit,
        studyOrProvenance: {
          authors: c.study.authors,
          year: c.study.year,
          title: c.study.title,
          journal: c.study.journal,
          doi: c.study.doi,
          url: c.study.url,
          arxivUrl: c.study.arxivUrl,
          archiveName: c.dataArchive?.name,
          archiveUrl: c.dataArchive?.url,
          codeName: c.codeRepo?.name,
          codeUrl: c.codeRepo?.url,
        },
      }));
  }
}
