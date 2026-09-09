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

export interface S00DataCard {
  id: string;
  title: string;
  kicker: string;
  body: string;
  question: string;
  risk: string;
  visual?: 'light-curve' | 'spectrum' | 'impact';
}

export interface S00ImpactCase {
  id: string;
  title: string;
  sourceId: string;
  problem: string;
  data: string;
  intervention: string;
  figure: string;
  result: string;
  limit: string;
  claimStatus: string;
  tone: 'data' | 'model' | 'decision' | 'limit';
}

export interface S00Branch {
  id: string;
  label: string;
  question: string;
  product: string;
  responsibility: string;
  tone: 'question' | 'model' | 'transfer';
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
  dataCards?: readonly S00DataCard[];
  impactCases?: readonly S00ImpactCase[];
  branches?: readonly S00Branch[];
  caution: CautionContent;
  teacherPrompt: TeacherPromptContent;
};

export const s00VisualAssets = {
  hero: '/images/s00/s00-transit-hero.png',
  lightCurve: '/images/s00/plots/s00-light-curve.png',
  spectrum: '/images/s00/plots/s00-spectrum.png',
  impact: '/images/s00/plots/s00-impact-comparison.png',
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

const s00DataCards: readonly S00DataCard[] = [
  {
    id: 'observacion',
    title: 'Observación',
    kicker: '01 · medir',
    body: 'Curva de luz, espectro, imagen o serie de velocidad radial: una medición situada en un instrumento y un tiempo.',
    question: '¿Qué propiedad física hace visible esta medición?',
    risk: 'Confundir una señal registrada con una explicación ya confirmada.',
    visual: 'light-curve',
  },
  {
    id: 'catalogo',
    title: 'Catálogo',
    kicker: '02 · organizar',
    body: 'Tabla de objetos, propiedades, diagnósticos y metadatos que ayuda a seleccionar casos comparables.',
    question: '¿Qué unidad cuenta cada fila y qué selección la produjo?',
    risk: 'Perder sesgos de selección y de cobertura al tratar todas las filas como equivalentes.',
  },
  {
    id: 'simulacion',
    title: 'Simulación',
    kicker: '03 · explorar',
    body: 'Una familia de escenarios construidos desde una física, un rango y una definición operativa.',
    question: '¿Qué supuestos entraron antes de generar el ejemplo?',
    risk: 'Leer una simulación como si fuera una observación independiente.',
  },
  {
    id: 'entrenamiento',
    title: 'Entrenamiento',
    kicker: '04 · aprender',
    body: 'Casos etiquetados, inyecciones y controles que enseñan al modelo qué regularidad debe reconocer.',
    question: '¿De quién aprendió el modelo y qué quedó fuera?',
    risk: 'Confundir etiquetas convenientes con verdad física universal.',
  },
  {
    id: 'salida',
    title: 'Salida',
    kicker: '05 · decidir',
    body: 'Score, clase, parámetro, posterior, ranking o acción: la forma de la salida delimita la afirmación.',
    question: '¿Qué decisión permite tomar y qué evidencia adicional necesita?',
    risk: 'Convertir una probabilidad o un ranking en confirmación automática.',
  },
];

const s00ImpactCases: readonly S00ImpactCase[] = [
  {
    id: 'astronet',
    title: 'Curvas de luz: recuperar señales débiles',
    sourceId: 'shallue-vanderburg-2018',
    problem:
      'Muchos segmentos de curvas de luz contienen tránsitos, variabilidad y artefactos que compiten por atención.',
    data: 'Curvas de luz de Kepler, con eventos conocidos y candidatos para aprender patrones temporales.',
    intervention:
      'Un modelo profundo ordena señales compatibles con tránsito para dirigir una revisión astronómica.',
    figure: '98,8 %',
    result:
      'El artículo reporta ese porcentaje de ranking favorable en su conjunto de prueba y dos planetas validados en el estudio.',
    limit:
      'La cifra depende de la población, las etiquetas, el ruido y la separación entre desarrollo y prueba.',
    claimStatus:
      'Cifra reportada por la fuente; no es una métrica transferible automáticamente a otra misión.',
    tone: 'data',
  },
  {
    id: 'stability',
    title: 'Dinámica orbital: aproximar una simulación',
    sourceId: 'tamayo-2016',
    problem:
      'Explorar la estabilidad de sistemas compactos puede exigir muchas simulaciones costosas.',
    data: 'Parámetros orbitales y resultados de una familia de integraciones numéricas.',
    intervention:
      'Un modelo sustituto aprende una aproximación rápida de la etiqueta o probabilidad de estabilidad.',
    figure: 'surrogate',
    result:
      'La ganancia didáctica está en consultar una aproximación y volver a la simulación física para comprobar casos relevantes.',
    limit:
      'El modelo hereda la definición de estabilidad, el rango de parámetros y el horizonte temporal de los ejemplos.',
    claimStatus:
      'Adaptación conceptual de la propuesta; el rendimiento depende de la configuración experimental.',
    tone: 'model',
  },
  {
    id: 'atmosphere',
    title: 'Espectros: estimar propiedades atmosféricas',
    sourceId: 'marquez-neila-2018',
    problem:
      'Una atmósfera puede producir espectros compatibles con combinaciones diferentes de temperatura, composición y nubes.',
    data: 'Espectros sintéticos y observados conectados a una rejilla de modelos atmosféricos.',
    intervention:
      'Un recuperador supervisado aproxima parámetros o distribuciones posteriores para acelerar la exploración.',
    figure: 'posterior',
    result:
      'La salida es una estimación condicionada por la rejilla y por la física elegida para generarla.',
    limit:
      'Degeneración, cobertura incompleta y confianza excesiva pueden producir una interpretación físicamente equivocada.',
    claimStatus:
      'Paráfrasis didáctica del caso; la salida no demuestra por sí sola una abundancia.',
    tone: 'model',
  },
  {
    id: 'contrast',
    title: 'Imagen de alto contraste: separar compañero y speckle',
    sourceId: 'gomez-gonzalez-2018',
    problem:
      'La luz estelar y los patrones instrumentales pueden ocultar o imitar una señal planetaria débil.',
    data: 'Imágenes simuladas con inyecciones sintéticas y ruido estructurado.',
    intervention:
      'Un clasificador aprende diferencias entre señal inyectada y speckles para asistir la detección.',
    figure: 'sim2real',
    result:
      'La tarea permite comparar una decisión supervisada con pipelines clásicos de reducción.',
    limit:
      'La validación en datos sintéticos debe contrastarse con observaciones reales y otros regímenes instrumentales.',
    claimStatus: 'Caso de aplicación; la simulación es parte del supuesto de entrenamiento.',
    tone: 'limit',
  },
  {
    id: 'validation',
    title: 'Candidatos: combinar score y evidencia',
    sourceId: 'armstrong-2021',
    problem:
      'Una señal candidata debe competir con binarias eclipsantes, contaminantes y efectos instrumentales.',
    data: 'Variables de candidatos, diagnósticos de vetting y metadatos con escenarios alternativos.',
    intervention:
      'Un procedimiento de ML ayuda a estimar la plausibilidad de la hipótesis planetaria dentro de un protocolo.',
    figure: '50',
    result: 'El estudio reporta 50 planetas de Kepler validados con aprendizaje automático.',
    limit:
      'La validación depende de la población de referencia, los priors, los diagnósticos y la independencia de los datos.',
    claimStatus:
      'Cifra reportada por la fuente; “validado” conserva un significado metodológico específico.',
    tone: 'decision',
  },
  {
    id: 'candidate-search',
    title: 'Candidatos de tránsito: automatizar una búsqueda',
    sourceId: 'mccauliff-2015',
    problem:
      'Un archivo grande requiere clasificar candidatos de tránsito con criterios consistentes y trazables.',
    data: 'Productos y diagnósticos de Kepler que alimentan una clasificación de candidatos.',
    intervention:
      'La automatización reduce trabajo repetitivo y deja una lista priorizada para revisión.',
    figure: 'ranking',
    result:
      'El aporte se ubica en la organización de la evidencia, y conserva el proceso de confirmación.',
    limit:
      'Etiquetas, falsos positivos, cobertura instrumental y procedimiento de vetting condicionan el resultado.',
    claimStatus:
      'Resumen didáctico; consultar la fuente para el diseño experimental y sus métricas.',
    tone: 'decision',
  },
];

const s00Branches: readonly S00Branch[] = [
  {
    id: 'astronomia',
    label: 'Problema astronómico',
    question: '¿Qué queremos comprender o resolver?',
    product: 'Pregunta acotada, unidad de análisis, dato y utilidad.',
    responsibility: 'Conservar el significado físico de la pregunta.',
    tone: 'question',
  },
  {
    id: 'teoria',
    label: 'Teoría formal ML',
    question: '¿Qué objeto, tarea y supuestos usamos?',
    product: 'Salida, familia de modelo, pérdida, evaluación y supuestos.',
    responsibility: 'Explicar qué aprende y qué puede fallar.',
    tone: 'model',
  },
  {
    id: 'aplicacion',
    label: 'Aplicación reproducible',
    question: '¿Cómo lo implementamos, diagnosticamos e interpretamos?',
    product: 'Código, baseline, experimento, trazabilidad y límites.',
    responsibility: 'Hacer comprobable el camino desde el dato hasta la afirmación.',
    tone: 'transfer',
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
    conceptIds: ['exoplaneta', 'transito', 'representacion'],
    visualKind: 'hero',
    visualAlt:
      'Ilustración de una estrella con un planeta en tránsito, un telescopio y una curva de luz conectados por una línea de observación.',
    visualCaption:
      'De la escala de un mundo a la escala de una señal: la medición indirecta abre la pregunta científica.',
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
    id: 's00-acotar',
    groupLabel: '03 · formular',
    title: 'Acotar la curiosidad cambia la tarea',
    partLabel: 'Pregunta → salida',
    tone: 'question',
    function: 'bridge',
    shortLabel: 'Acotar',
    question: '¿Qué debe quedar decidido antes de escoger un modelo?',
    idea: 'Una buena pregunta fija una unidad, una observación, una salida y un criterio de utilidad.',
    content:
      '“¿Hay planetas habitables?” es una conversación de campo. “¿Qué señales son compatibles con un tránsito en estas curvas de luz y cuáles priorizamos para revisión?” ya declara una unidad, un dato, una salida y un siguiente paso. El mismo mundo puede producir tareas distintas según la pregunta.',
    interpretation:
      'La tarea de ML aparece después de una decisión científica sobre qué significa una respuesta útil.',
    limits:
      'Acotar la pregunta no resuelve el ruido, el sesgo de selección, la línea base ni la validación independiente.',
    conceptIds: ['representacion', 'tarea-salida', 'evaluacion-limite'],
    visualKind: 'question-lab',
    visualAlt:
      'Tres tarjetas enlazadas muestran cómo una pregunta amplia se transforma en unidad de análisis, salida y criterio.',
    visualCaption:
      'La pregunta se vuelve computable cuando declara qué cuenta como instancia y qué salida permite actuar.',
    caution: caution(
      's00-question-is-not-task',
      'La pregunta científica y la tarea de aprendizaje se necesitan, pero no son la misma frase.',
      'Saltar de una pregunta amplia al nombre de un algoritmo.',
      'La salida queda sin interpretación y la evaluación no puede responder si el sistema sirve.',
    ),
    teacherPrompt: prompt(
      's00-acotar-docente',
      'diagnostic',
      'Reescribe una pregunta amplia de exoplanetas con unidad, dato, salida y uso.',
      'No evaluar el modelo todavía; revisar primero si la salida responde a la pregunta propuesta.',
    ),
  },
  {
    id: 's00-medicion',
    groupLabel: '04 · observar',
    title: 'Toda inferencia comienza con una medición',
    partLabel: 'Instrumento → señal',
    tone: 'data',
    function: 'science',
    shortLabel: 'Medición',
    question: '¿Qué propiedad física se vuelve visible en cada observación?',
    idea: 'El instrumento y la geometría de observación determinan qué señal puede aparecer y qué incertidumbre la acompaña.',
    content:
      'Un tránsito modifica el brillo aparente; la velocidad radial registra movimiento a lo largo de la línea de visión; un espectro distribuye señal por longitud de onda; una imagen conserva estructura espacial. La medición no entrega directamente radio, masa o atmósfera: ofrece una relación que debe modelarse.',
    interpretation:
      'Pensar en el instrumento antes del modelo ayuda a separar observables, parámetros físicos y artefactos.',
    limits:
      'El esquema resume modalidades. Cada instrumento tiene calibración, resolución, cobertura, ruido y metadatos que deben documentarse en una práctica real.',
    conceptIds: ['transito', 'velocidad-radial', 'espectro', 'senal-ruido'],
    visualKind: 'measurement',
    visualAlt:
      'Cuatro modalidades observacionales se conectan con sus señales: brillo-tiempo, desplazamiento-tiempo, flujo-longitud de onda e imagen espacial.',
    visualCaption:
      'La pregunta física se encuentra con la medición a través de una geometría y un instrumento concretos.',
    caution: caution(
      's00-observable-is-not-parameter',
      'Un observable es una medición relacionada con una propiedad; no es la propiedad completa.',
      'Nombrar masa, composición o habitabilidad como si fueran columnas directas de cualquier observación.',
      'La inferencia oculta supuestos y no permite discutir incertidumbre ni degeneración.',
    ),
    teacherPrompt: prompt(
      's00-medicion-docente',
      'diagnostic',
      '¿Qué mide el instrumento y qué propiedad queremos inferir a partir de esa señal?',
      'Pedir dos verbos distintos: registrar para el observable e inferir para el parámetro.',
    ),
  },
  {
    id: 's00-datos',
    groupLabel: '05 · representar',
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
    groupLabel: '06 · ubicar',
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
    groupLabel: '07 · contrastar',
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
    groupLabel: '08 · conectar',
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
  {
    id: 's00-cierre',
    groupLabel: '09 · cerrar',
    title: 'La salida del modelo es evidencia condicionada',
    partLabel: 'Transferencia',
    tone: 'limit',
    function: 'closing',
    shortLabel: 'Cierre',
    question:
      '¿Qué debe quedar escrito para que una salida de ML sea científicamente interpretable?',
    idea: 'Pregunta, dato, representación, tarea, evaluación, interpretación y límite forman una unidad de lectura.',
    content:
      'Al terminar S00, cada estudiante puede describir una aplicación con una pregunta clara, un dato identificable, una salida concreta, una evaluación y un límite honesto. Ese mapa será el puente hacia S01 y hacia las aplicaciones posteriores del curso.',
    interpretation:
      'La mejor primera decisión técnica suele ser una formulación más precisa de la pregunta y de la evidencia disponible.',
    limits:
      'S00 ofrece intuición y un mapa compartido. Todavía no sustituye una práctica reproducible, una línea base, una métrica calculada ni una validación científica.',
    conceptIds: ['representacion', 'tarea-salida', 'generalizacion', 'evaluacion-limite'],
    visualKind: 'closure',
    visualAlt:
      'Cadena final con siete pasos y una señal de límite que acompaña la salida del modelo.',
    visualCaption:
      'La interpretación empieza cuando la salida queda acompañada por el procedimiento y sus condiciones.',
    caution: caution(
      's00-map-is-not-result',
      'Un mapa de investigación prepara una práctica; no reemplaza su evidencia.',
      'Contar la comprensión de la cadena como validación de un modelo.',
      'Se afirma más de lo que los datos, la evaluación y los límites permiten.',
    ),
    teacherPrompt: prompt(
      's00-cierre-docente',
      'transfer',
      'Explica una aplicación en una sola frase usando pregunta, dato, salida y límite.',
      'Usar la frase como ticket de salida y guardar las dudas que requieren el formalismo de S01.',
    ),
  },
];

export const s00Glossary = s00Concepts.map((concept) => ({
  ...concept,
  definition: concept.shortDefinition,
}));

/**
 * S00 keeps the nine stations as the conceptual spine, but each station is
 * presented through the parts that actually need a visual beat. The count is
 * intentionally uneven: a data landscape needs five parts, while the course
 * branches need three.
 */
export const s00Parts: Readonly<Record<string, readonly S00Part[]>> = {
  's00-pregunta': [
    { id: 'mundo', label: 'Mundo', visualFocus: 'mundo' },
    { id: 'senal', label: 'Señal', visualFocus: 'senal' },
    { id: 'pregunta-guia', label: 'Pregunta guía', visualFocus: 'pregunta' },
  ],
  's00-ciencias-planetarias': [
    { id: 'origen', label: 'Origen', visualFocus: 'origen' },
    { id: 'estructura', label: 'Estructura', visualFocus: 'estructura' },
    { id: 'evolucion', label: 'Evolución', visualFocus: 'evolucion' },
    { id: 'habitabilidad', label: 'Habitabilidad', visualFocus: 'habitabilidad' },
  ],
  's00-acotar': [
    { id: 'curiosidad', label: 'Curiosidad', visualFocus: 'curiosidad' },
    { id: 'unidad', label: 'Unidad', visualFocus: 'unidad' },
    { id: 'salida', label: 'Salida', visualFocus: 'salida' },
    { id: 'uso', label: 'Uso', visualFocus: 'uso' },
  ],
  's00-medicion': [
    { id: 'transito', label: 'Tránsito', visualFocus: 'transito' },
    { id: 'radial', label: 'Velocidad radial', visualFocus: 'radial' },
    { id: 'espectro', label: 'Espectro', visualFocus: 'espectro' },
    { id: 'imagen', label: 'Imagen', visualFocus: 'imagen' },
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
  's00-cierre': [
    { id: 'pregunta', label: 'Pregunta', visualFocus: 'pregunta' },
    { id: 'medicion', label: 'Medición', visualFocus: 'medicion' },
    { id: 'dato', label: 'Dato', visualFocus: 'dato' },
    { id: 'representacion', label: 'Representación', visualFocus: 'representacion' },
    { id: 'tarea', label: 'Tarea', visualFocus: 'tarea' },
    { id: 'evaluacion', label: 'Evaluación', visualFocus: 'evaluacion' },
    { id: 'limite', label: 'Límite', visualFocus: 'limite' },
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
  const [unitHash, partId, extra] = normalized.split('/');
  if (!unitHash || extra !== undefined) return null;
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
