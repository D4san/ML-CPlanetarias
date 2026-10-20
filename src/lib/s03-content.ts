/**
 * Editorial source of truth for the 33-screen S03 presentation.
 * Paper figures are paired with visible citations and tracked as local assets.
 * Editorial promotion remains a separate decision.
 */

export type S03StationId =
  | 'transit'
  | 'mission'
  | 'lookalikes'
  | 'classification'
  | 'representation'
  | 'errors'
  | 'metrics'
  | 'thresholds'
  | 'results';

export type S03ScreenRole = 'opening' | 'content' | 'references';

export type S03SceneId =
  | 'opening'
  | 'transit-animation'
  | 'transit-geometry'
  | 'transit-inference'
  | 'mission-history'
  | 'pixels-aperture-flux'
  | 'kepler10-observation'
  | 'variability'
  | 'eclipsing-blend'
  | 'artifact-aperture'
  | 'classification-task'
  | 'binary-input-output'
  | 'classification-vocabulary'
  | 'preparation'
  | 'folded-views'
  | 'cnn-score'
  | 'evaluation-split'
  | 'confusion-matrix'
  | 'confusion-cases'
  | 'metric-accuracy'
  | 'metric-error'
  | 'metric-precision'
  | 'metric-recall'
  | 'metric-specificity'
  | 'metric-fpr'
  | 'metric-f1'
  | 'threshold'
  | 'pr'
  | 'roc'
  | 'auc'
  | 'paper-results'
  | 'paper-limits'
  | 'sources';

export type S03PaperFigure = {
  figureNumber: 3 | 6 | 8 | 10 | 11;
  sourceId: 'shallue-vanderburg-2017';
  href: string;
  caption: string;
  extension?: boolean;
};

export type S03Screen = {
  id: string;
  sceneId: S03SceneId;
  stationId: S03StationId | 'opening' | 'references';
  title: string;
  partLabel: string;
  intro: string;
  role: S03ScreenRole;
  sourceIds: string[];
  /** A stand-alone explanatory paragraph for the Reading route. */
  summary: string;
  /** Short phrase that states what the learner should notice or do. */
  takeaway: string;
  /** Exact, accessible image description; illustration assets remain conceptual. */
  image?: {
    src: string;
    alt: string;
    caption: string;
    type: 'conceptual' | 'observed';
  };
  paperFigures?: S03PaperFigure[];
};

export type S03Station = {
  id: S03StationId;
  title: string;
  shortTitle: string;
  purpose: string;
  screenIds: string[];
  partCount: number;
};

export type S03BibliographyEntry = {
  id: string;
  label: string;
  href: string;
  location: string;
};

const paperHref = 'https://doi.org/10.3847/1538-3881/aa9e09';

export const S03_BIBLIOGRAPHY: S03BibliographyEntry[] = [
  {
    id: 'mandel-agol-2002',
    label: 'Mandel & Agol (2002) — Analytic Light Curves for Planetary Transit Searches',
    href: 'https://arxiv.org/abs/astro-ph/0210099',
    location:
      'Geometría de discos y flujo de tránsito; aquí se calcula el caso uniforme y se integra numéricamente un perfil lineal de limbo.',
  },
  {
    id: 'seager-mallen-ornelas-2003',
    label: 'Seager & Mallén-Ornelas (2003) — A Unique Solution of Planet and Star Parameters',
    href: 'https://arxiv.org/abs/astro-ph/0206228',
    location:
      'Relaciones entre profundidad, duración, período y geometría bajo los supuestos de órbita circular y luz de una única estrella.',
  },
  {
    id: 'nasa-kepler-mission',
    label: 'NASA Science — Kepler / K2: misión, escala y legado',
    href: 'https://science.nasa.gov/mission/kepler/',
    location:
      'Overview, K2 y Legacy; escala de estrellas observadas y total histórico al retiro en 2018.',
  },
  {
    id: 'mast-kepler-archive',
    label: 'MAST — Kepler mission archive',
    href: 'https://archive.stsci.edu/missions-and-data/kepler',
    location: 'Active From, documentación y productos destacados; datos y archivo de Kepler.',
  },
  {
    id: 'mast-kepler-products',
    label: 'Kepler & K2 Science Center — data products',
    href: 'https://keplergo.github.io/KeplerScienceWebsite/data-products.html',
    location: 'Archivos de píxeles y curvas de luz; cadencias, aperturas y banderas de calidad.',
  },
  {
    id: 'basri-kepler-variability-2011',
    label:
      'Basri et al. (2011) — Photometric Variability in Kepler Target Stars II: Amplitude, Periodicity, and Rotation',
    href: 'https://arxiv.org/abs/1008.1092',
    location:
      'Variabilidad fotométrica, rotación y modulación asociada con manchas en curvas de luz de Kepler.',
  },
  {
    id: 'prsa-kepler-eb-2011',
    label:
      'Prša et al. (2011) — Kepler Eclipsing Binary Stars. I: Catalog and Principal Characterization of 1879 Eclipsing Binaries',
    href: 'https://arxiv.org/abs/1006.2815',
    location:
      'Catálogo Kepler de binarias eclipsantes; profundidades primaria/secundaria, geometría y contaminación de luz de terceros.',
  },
  {
    id: 'nasa-kepler-data-overview',
    label: 'NASA Exoplanet Archive — Kepler Data Products Overview',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html',
    location: 'Light Curve Files, SAP_FLUX, PDCSAP_FLUX y releases de datos.',
  },
  {
    id: 'jenkins-kepler-pipeline',
    label: 'Jenkins et al. (2010) — Overview of the Kepler Science Processing Pipeline',
    href: 'https://arxiv.org/abs/1001.0258',
    location: 'Calibración a nivel de píxel, apertura fotométrica y procesamiento de datos.',
  },
  {
    id: 'kepler10-discovery',
    label: 'Batalha et al. (2011) — Kepler-10b: A rocky planet in a 0.84-day orbit',
    href: 'https://arxiv.org/abs/1102.0605',
    location: 'Curva de tránsito, parámetros reportados y confirmación por velocidad radial.',
  },
  {
    id: 'nasa-exoplanet-archive-kepler10',
    label: 'NASA Exoplanet Archive — Kepler-10 / KIC 11904151',
    href: 'https://exoplanetarchive.ipac.caltech.edu/overview/KIC%2011904151',
    location:
      'Instantánea que debe fijarse en implementación; registros KOI y parámetros de catálogo.',
  },
  {
    id: 'shallue-vanderburg-2017',
    label:
      'Shallue & Vanderburg (2018) — Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90',
    href: paperHref,
    location:
      'The Astronomical Journal, 155, 94; §§3.1–3.3, 4.1–4.3, 5.1–5.5 y 6.1–6.4. Figuras originales bajo CC BY 3.0; DOI 10.3847/1538-3881/aa9e09.',
  },
  {
    id: 'nasa-kepler-retirement-2018',
    label: 'NASA (2018) — Kepler mission retirement announcement',
    href: 'https://www.nasa.gov/news-release/nasa-retires-kepler-space-telescope-passes-planet-hunting-torch/',
    location: 'As-of-retirement legacy statement; any discovery total is explicitly dated to 2018.',
  },
  {
    id: 'nasa-kepler-spacecraft-image',
    label: 'NASA/JPL — Reborn Kepler Discovers First K2 Exoplanet Artist Concept',
    href: 'https://science.nasa.gov/image-detail/amf-pia18904/',
    location:
      'PIA18904, concepto artístico de Kepler operando durante K2; 18 de diciembre de 2014; productor JPL.',
  },
  {
    id: 'geron-classification',
    label: 'Géron (2022) — Hands-On Machine Learning, 3rd ed.',
    href: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/ch03.html',
    location:
      'Cap. 3; ubicación exacta de la versión consultada pendiente de cotejo antes de promoción.',
  },
  {
    id: 'kelleher-classification',
    label:
      'Kelleher, Mac Namee & D’Arcy (2015) — Fundamentals of Machine Learning for Predictive Data Analytics',
    href: 'https://mitpress.mit.edu/9780262029445/fundamentals-of-machine-learning-for-predictive-data-analytics/',
    location: 'Cap. 8, §§8.3–8.4.3; cotejo de ubicación pendiente antes de promoción.',
  },
];

export const S03_STATIONS: S03Station[] = [
  {
    id: 'transit',
    title: 'De la geometría a la señal',
    shortTitle: 'Tránsito',
    purpose:
      'Conectar el movimiento planetario con una disminución periódica de flujo y distinguir observación de interpretación.',
    screenIds: ['s03-transit-1', 's03-transit-2', 's03-transit-3'],
    partCount: 3,
  },
  {
    id: 'mission',
    title: 'Kepler: misión y medición',
    shortTitle: 'Kepler',
    purpose:
      'Situar la misión primaria y K2 por separado, explicar la construcción fotométrica y abrir un ejemplo observado con procedencia.',
    screenIds: ['s03-mission-1', 's03-mission-2', 's03-mission-3'],
    partCount: 3,
  },
  {
    id: 'lookalikes',
    title: 'Señales que pueden parecer tránsitos',
    shortTitle: 'Parecidos',
    purpose:
      'Reconocer variabilidad, binarias eclipsantes, mezcla de fuentes y efectos instrumentales como explicaciones alternativas.',
    screenIds: ['s03-lookalikes-1', 's03-lookalikes-2', 's03-lookalikes-3'],
    partCount: 3,
  },
  {
    id: 'classification',
    title: 'Esto es una tarea de clasificación',
    shortTitle: 'Clasificación',
    purpose:
      'Nombrar la instancia, sus entradas, las etiquetas de referencia y la predicción binaria antes de hablar de la red.',
    screenIds: ['s03-classification-1', 's03-classification-2', 's03-classification-3'],
    partCount: 3,
  },
  {
    id: 'representation',
    title: 'Qué recibe el modelo',
    shortTitle: 'Representación',
    purpose:
      'Seguir la preparación de la curva, comparar vistas plegadas y relacionar entradas con el puntaje de una CNN superficialmente.',
    screenIds: ['s03-representation-1', 's03-representation-2', 's03-representation-3'],
    partCount: 3,
  },
  {
    id: 'errors',
    title: 'Dónde se equivoca y cómo se prueba',
    shortTitle: 'Errores',
    purpose:
      'Separar entrenamiento, validación y test; fijar la clase positiva y construir la matriz con un ejemplo guiado.',
    screenIds: ['s03-errors-1', 's03-errors-2', 's03-errors-3'],
    partCount: 3,
  },
  {
    id: 'metrics',
    title: 'Qué pregunta responde cada métrica',
    shortTitle: 'Métricas',
    purpose:
      'Leer cada métrica como una pregunta con denominador y población, y reconocer qué errores prioriza.',
    screenIds: [
      's03-metrics-1',
      's03-metrics-2',
      's03-metrics-3',
      's03-metrics-4',
      's03-metrics-5',
      's03-metrics-6',
      's03-metrics-7',
    ],
    partCount: 7,
  },
  {
    id: 'thresholds',
    title: 'Cómo cambia la decisión con el umbral',
    shortTitle: 'Umbrales',
    purpose:
      'Conectar puntajes y decisiones y construir PR, ROC y AUC en un conjunto didáctico pequeño.',
    screenIds: ['s03-thresholds-1', 's03-thresholds-2', 's03-thresholds-3', 's03-thresholds-4'],
    partCount: 4,
  },
  {
    id: 'results',
    title: 'Qué permiten concluir los resultados',
    shortTitle: 'Resultados',
    purpose:
      'Interpretar cifras publicadas y sus límites, conservar la diferencia entre ranking, selección y validación planetaria.',
    screenIds: ['s03-results-1', 's03-results-2'],
    partCount: 2,
  },
];

const paperFigure = (
  figureNumber: S03PaperFigure['figureNumber'],
  caption: string,
  extension = false,
): S03PaperFigure => ({
  figureNumber,
  sourceId: 'shallue-vanderburg-2017',
  href: paperHref,
  caption,
  ...(extension ? { extension: true } : {}),
});

const opening: S03Screen = {
  id: 's03-opening',
  sceneId: 'opening',
  stationId: 'opening',
  title: 'De una caída de luz a una decisión',
  partLabel: '0',
  intro: '¿Qué evidencia permite pasar de una señal a un candidato que merece seguimiento?',
  role: 'opening',
  sourceIds: ['mast-kepler-archive'],
  summary:
    'Una caída periódica de brillo inicia una investigación. A lo largo de S03 seguiremos cómo Kepler mide la luz, cómo se preparan las señales y cómo se evalúa una clasificación; ninguna puntuación sustituye la validación astronómica.',
  takeaway: 'Una señal abre una pregunta; las decisiones requieren contexto y evaluación.',
};

const contentScreens: S03Screen[] = [
  {
    id: 's03-transit-1',
    sceneId: 'transit-animation',
    stationId: 'transit',
    title: 'Una caída periódica de brillo',
    partLabel: '1.1',
    intro:
      'Un tránsito ocurre cuando un planeta pasa frente a su estrella y atenúa su luz; al repetirse, revela su período orbital.',
    role: 'content',
    sourceIds: ['kepler10-discovery'],
    summary:
      'Cuando un planeta cruza por delante de su estrella, la luz total observada disminuye durante el tránsito. La repetición permite estimar el período orbital y la profundidad, en un modelo simple, informa la razón de radios mediante δ ≈ (Rp/R*)². La curva registra flujo frente al tiempo; la forma de una caída por sí sola no identifica qué objeto la produjo.',
    takeaway:
      'La curva representa luz medida; “planeta” es una interpretación que requiere evidencia adicional.',
  },
  {
    id: 's03-transit-2',
    sceneId: 'transit-geometry',
    stationId: 'transit',
    title: 'Geometría enlazada con flujo',
    partLabel: '1.2',
    intro: 'Sigue la posición del planeta y el cambio de brillo en la misma fase.',
    role: 'content',
    sourceIds: ['mandel-agol-2002', 'seager-mallen-ornelas-2003'],
    summary:
      'La geometría del tránsito y la curva deben usar el mismo recorrido didáctico: antes del contacto, el planeta entra al disco estelar, alcanza una fase central y sale. En una observación real, la inclinación, el tamaño relativo y la cadencia afectan la forma registrada.',
    takeaway: 'La posición proyectada y el flujo cambian de manera sincronizada.',
  },
  {
    id: 's03-transit-3',
    sceneId: 'transit-inference',
    stationId: 'transit',
    title: 'De la señal a una hipótesis',
    partLabel: '1.3',
    intro:
      'Una caída aislada puede tener varios orígenes. ¿Qué aporta observar caídas parecidas a intervalos regulares?',
    role: 'content',
    sourceIds: ['seager-mallen-ornelas-2003', 'kepler10-discovery', 'shallue-vanderburg-2017'],
    summary:
      'La figura presenta una serie sintética de 481 mediciones durante 24 días, con ruido y variación suave. Sus tres caídas de forma parecida, separadas por unos ocho días, ilustran un patrón compatible con un cuerpo en órbita que cruza la estrella. Una caída aislada también podría deberse a un eclipse estelar, variabilidad de la estrella o un artefacto instrumental. La repetición orienta una hipótesis y una estimación inicial del período, pero no confirma un planeta: algunas explicaciones alternativas también son periódicas y requieren diagnósticos adicionales.',
    takeaway:
      'La forma y la periodicidad acotan la hipótesis de tránsito; otros diagnósticos determinan si hay un planeta.',
  },
  {
    id: 's03-mission-1',
    sceneId: 'mission-history',
    stationId: 'mission',
    title: 'Misión primaria y etapa K2',
    partLabel: '2.1',
    intro:
      'Kepler midió repetidamente el brillo de miles de estrellas. Su archivo reúne series temporales de flujo, tiempo, incertidumbre y calidad, además de productos fotométricos procesados.',
    role: 'content',
    sourceIds: [
      'nasa-kepler-mission',
      'mast-kepler-archive',
      'nasa-kepler-retirement-2018',
      'nasa-kepler-spacecraft-image',
    ],
    summary:
      'La misión primaria de Kepler midió estrellas de un campo fijo entre 2009 y 2013; NASA describe una población inicial de unas 150 000 estrellas. Tras fallar dos ruedas de reacción, K2 continuó con campos y campañas distintos y elevó a más de 500 000 el total de estrellas examinadas entre ambas etapas. Al retiro en 2018, NASA reportó más de 2 600 descubrimientos planetarios. El artículo trabajado en S03 usa TCEs Q1–Q17 DR24 de la misión primaria; sus cifras no se mezclan con K2 ni con los conteos actuales del archivo.',
    takeaway:
      'La escala y el legado son cifras históricas; el conjunto Q1–Q17 tiene su propio recorte.',
  },
  {
    id: 's03-mission-2',
    sceneId: 'pixels-aperture-flux',
    stationId: 'mission',
    title: 'De los píxeles al flujo',
    partLabel: '2.2',
    intro:
      'Cada píxel registra parte de la luz estelar; al sumar una apertura en cada cadencia, obtenemos la curva de flujo.',
    role: 'content',
    sourceIds: ['mast-kepler-products', 'nasa-kepler-data-overview', 'jenkins-kepler-pipeline'],
    summary:
      'En cada cadencia, cada píxel del detector registra un flujo Fᵢ(t). La máscara de apertura A selecciona qué píxeles se suman; esa suma es la fotometría de apertura simple (SAP). Al repetirla en el tiempo se forma una curva de luz: flujo frente a tiempo. PDCSAP es otro producto, con correcciones de tendencias instrumentales. La incertidumbre y SAP_QUALITY acompañan las mediciones.',
    takeaway:
      'La apertura define qué píxeles aportan al flujo y qué fuentes o cambios pueden contaminarlo.',
  },
  {
    id: 's03-mission-3',
    sceneId: 'kepler10-observation',
    stationId: 'mission',
    title: 'Kepler-10: un ejemplo observado',
    partLabel: '2.3',
    intro:
      'Veamos una curva observada de Kepler-10: entre sus fluctuaciones, ¿qué caída podría indicar un tránsito?',
    role: 'content',
    sourceIds: [
      'nasa-exoplanet-archive-kepler10',
      'mast-kepler-archive',
      'mast-kepler-products',
      'kepler10-discovery',
    ],
    summary:
      'La curva procede de MAST: Kepler Q1, producto PDCSAP, para Kepler-10 (KIC 11904151). Con ruido, puede que no distingamos ninguna caída clara, que destaque una aislada o que aparezcan varias que se repiten. Aquí la bajada central y su recuperación podrían ser una candidata a tránsito. El recorte se centró en el segundo tránsito predicho con la época y el período publicados; otros ciclos permitirían evaluar si el patrón es periódico.',
    takeaway:
      'La bajada central es una candidata a tránsito; otros ciclos permitirían evaluar si el patrón se repite.',
  },
  {
    id: 's03-lookalikes-1',
    sceneId: 'variability',
    stationId: 'lookalikes',
    title: 'Ruido y variabilidad estelar',
    partLabel: '3.1',
    intro: 'Una estrella también cambia aunque no haya un planeta en tránsito.',
    role: 'content',
    sourceIds: ['mast-kepler-products', 'basri-kepler-variability-2011', 'shallue-vanderburg-2017'],
    summary:
      'La rotación puede llevar manchas oscuras dentro y fuera del hemisferio visible, y modular el flujo total de la estrella. Una distribución y cantidad distintas de manchas producen curvas diferentes; el número por sí solo no fija la amplitud. La animación es un modelo didáctico con manchas de igual tamaño y contraste, no una observación de Kepler. Una variación de brillo no equivale automáticamente a un tránsito: importan la forma, la repetición, la incertidumbre y la calidad de las cadencias.',
    takeaway: 'Variabilidad y tránsito pueden coexistir; el patrón requiere diagnóstico.',
  },
  {
    id: 's03-lookalikes-2',
    sceneId: 'eclipsing-blend',
    stationId: 'lookalikes',
    title: 'Binarias eclipsantes y fuentes mezcladas',
    partLabel: '3.2',
    intro: 'Un eclipse estelar o una fuente vecina puede producir una caída aparente.',
    role: 'content',
    sourceIds: ['prsa-kepler-eb-2011', 'shallue-vanderburg-2017'],
    summary:
      'La vista lateral fija la fase 0 en cuadratura: las estrellas aparecen separadas. En la fase 0,25 la compañera más tenue pasa delante de A y produce el eclipse primario; en 0,75 queda detrás y produce el secundario. La curva calcula el área superpuesta y el brillo de cada estrella para generar ambos descensos. Una fuente vecina permanece en la apertura y añade luz constante: la curva mezclada muestra por qué sus eclipses parecen menos profundos. Es un modelo geométrico didáctico, no una observación de Kepler ni un ajuste a una binaria real.',
    takeaway: 'La misma forma integrada puede tener causas físicas diferentes.',
  },
  {
    id: 's03-lookalikes-3',
    sceneId: 'artifact-aperture',
    stationId: 'lookalikes',
    title: 'Apertura, movimiento y artefactos',
    partLabel: '3.3',
    intro:
      'Entre t₀ y t₁, la misma estrella se desplaza; la apertura fija puede sumar una fracción distinta de su luz.',
    role: 'content',
    sourceIds: ['mast-kepler-products', 'jenkins-kepler-pipeline', 'shallue-vanderburg-2017'],
    summary:
      'La apertura A reúne los píxeles cuya luz se suma en cada instante. Si la imagen de la estrella se mueve respecto de A, cambia la fracción recogida y puede bajar el flujo sumado. El centroide, que resume la posición ponderada de la luz, también se desplaza. La coincidencia temporal entre ambas señales orienta la revisión de la posición, la apertura y la calidad fotométrica.',
    takeaway:
      'Una caída del flujo sumado junto con el desplazamiento del centroide orienta la revisión de la apertura.',
  },
  {
    id: 's03-classification-1',
    sceneId: 'classification-task',
    stationId: 'classification',
    title: 'Esto es una tarea de clasificación',
    partLabel: '4.0',
    intro: 'Cada señal recibe una clase: tránsito o no tránsito.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017'],
    summary:
      'El artículo formula un problema de clasificación supervisada binaria. La unidad es un Threshold Crossing Event (TCE), una señal que superó el umbral de búsqueda del pipeline. La salida del clasificador estima si la etiqueta de referencia pertenece a PC o a las clases negativas AFP/NTP; no decide por sí sola si hay un planeta confirmado.',
    takeaway: 'El clasificador asigna cada señal a una de dos clases.',
  },
  {
    id: 's03-classification-2',
    sceneId: 'binary-input-output',
    stationId: 'classification',
    title: 'Entrenamiento e inferencia',
    partLabel: '4.1',
    intro:
      'En 2017, Christopher Shallue y Andrew Vanderburg entrenaron una red convolucional para clasificar señales de Kepler y priorizar posibles planetas.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017'],
    summary:
      'El estudio usa 15 737 TCEs del catálogo Autovetter de Kepler Q1–Q17 DR24: 3 600 PC (Planet Candidate, candidata a planeta), 9 596 AFP (Astrophysical False Positive, falso positivo astrofísico) y 2 541 NTP (Non-Transiting Phenomenon, fenómeno no transitorio); excluye UNK. Las etiquetas, obtenidas por evaluación manual y otros diagnósticos, se agrupan en PC como clase positiva y AFP/NTP como negativas. Los autores encontraron algunos ejemplos mal etiquetados, así que la salida del modelo se interpreta respecto al catálogo y no como confirmación física. En entrenamiento, la red compara su puntaje con una etiqueta conocida y ajusta parámetros; en inferencia, puntúa una señal nueva sin etiqueta, y un umbral determina la predicción.',
    takeaway:
      'La red aprende a reproducir etiquetas de referencia; su puntaje orienta la revisión y no confirma por sí solo un planeta.',
  },
  {
    id: 's03-classification-3',
    sceneId: 'classification-vocabulary',
    stationId: 'classification',
    title: 'Instancia, etiqueta, modelo y predicción',
    partLabel: '4.3',
    intro:
      'En el artículo de Shallue y Vanderburg, el catálogo aporta las referencias PC, AFP y NTP; el modelo aprende a agruparlas como «planeta» o «falso positivo». Aquí distinguimos la señal, la etiqueta y el error.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017', 'geron-classification', 'kelleher-classification'],
    summary:
      'Una señal detectada por Kepler (TCE) es la instancia que se clasifica. PC, AFP y NTP son etiquetas de referencia del catálogo; en la decisión binaria del artículo, PC representa «planeta» y AFP/NTP «falso positivo». El modelo produce una predicción; FP ocurre cuando marca «planeta» para una referencia AFP o NTP. Así, TCE nombra la señal, las otras tres siglas nombran clases de referencia y FP nombra un error.',
    takeaway:
      'PC, AFP y NTP son referencias del catálogo; FP es predecir «planeta» para una referencia «no planeta».',
  },
  {
    id: 's03-representation-1',
    sceneId: 'preparation',
    stationId: 'representation',
    title: 'Del registro de Kepler a la entrada del clasificador',
    partLabel: '5.1',
    intro:
      'Kepler registra el brillo de una estrella, no una imagen del planeta. Para analizar un TCE (evento que superó el umbral de búsqueda), el artículo limpia la curva, alinea sus repeticiones y construye dos vistas.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017'],
    summary:
      'Una curva de Kepler registra el tiempo t y el flujo F(t), junto con la incertidumbre σ y la bandera de calidad q (SAP_QUALITY) de cada cadencia. La bandera acompaña la medición; las vistas de entrada del artículo se construyen a partir del flujo. Para cada TCE, el artículo retira las mediciones de tránsitos de otros planetas confirmados, estima la variación lenta con una spline y enmascara e interpola el tránsito estudiado durante ese ajuste para no aplanarlo. Divide el flujo por la tendencia, itera el ajuste y retira puntos que se alejan más de 3σ del ajuste. Después pliega la curva por el período del TCE, agrupa puntos en bins y normaliza las vistas a mediana 0 y mínimo −1. El resultado son representaciones comparables, no la curva original sin decisiones.',
    takeaway:
      'El clasificador recibe una representación preparada; su forma depende de estas decisiones.',
  },
  {
    id: 's03-representation-2',
    sceneId: 'folded-views',
    stationId: 'representation',
    title: 'Dos escalas para leer la señal',
    partLabel: '5.2',
    intro:
      'Para distinguir tránsitos de sus imitadores, el estudio combinó el ciclo orbital completo con una ventana local alrededor del evento.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017'],
    summary:
      'El artículo pliega cada curva aplanada con el período del TCE, centra el tránsito en fase cero y calcula medianas de flujo en bins. Su configuración CNN elegida usa una vista global de 2 001 valores sobre el período y una vista local de 201 valores en una ventana de cuatro duraciones a cada lado. La global conserva eclipses secundarios, aunque un tránsito de período largo puede caer en pocos bins; la local compara la forma del tránsito, aunque pierde contexto exterior. Ambas vistas se normalizan a mediana cero y mínimo −1. La Figura 3 original acompaña y documenta la comparación.',
    takeaway:
      'La vista global conserva contexto orbital; la local resuelve la forma del tránsito. Cada una puede ocultar evidencia que la otra conserva.',
    paperFigures: [
      paperFigure(3, 'Figura 3 del artículo: vistas global y local del tránsito plegado.'),
    ],
  },
  {
    id: 's03-representation-3',
    sceneId: 'cnn-score',
    stationId: 'representation',
    title: 'De las vistas a un puntaje',
    partLabel: '5.3',
    intro: 'La CNN compara patrones en las dos vistas y entrega un puntaje.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017'],
    summary:
      'Durante el entrenamiento, el estudio aplica reflejos horizontales aleatorios a las entradas: invierte de izquierda a derecha el orden de los bins (x₁,…,xₙ → xₙ,…,x₁). La transformación conserva la clase planetaria/no planetaria, así que ofrece una variante del ejemplo sin añadir observaciones. La CNN aprende patrones en las vistas global y local y combina esa información para producir un puntaje. En inferencia se evalúan las vistas originales. No se deriva la arquitectura ni se entrena una red en esta sesión. El puntaje no es una probabilidad calibrada salvo que se demuestre calibración, y la decisión de clase requiere un umbral explícito.',
    takeaway: 'La CNN produce un puntaje; la evaluación y el umbral determinan cómo leerlo.',
  },
  {
    id: 's03-errors-1',
    sceneId: 'evaluation-split',
    stationId: 'errors',
    title: 'Qué ejemplos sustentan la evaluación',
    partLabel: '6.1',
    intro: 'Entrenamiento, validación y test cumplen funciones distintas.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017'],
    summary:
      'El artículo separa los TCEs en particiones de entrenamiento, validación y prueba con proporción 80/10/10. El test queda apartado del ajuste del modelo y sustenta las métricas reportadas sobre 1 523 TCEs. El diseño de evaluación define a qué población se refieren las cifras; no debe confundirse con los TCEs que aparecen en una búsqueda posterior.',
    takeaway: 'Una métrica se interpreta con su partición y población explícitas.',
  },
  {
    id: 's03-errors-2',
    sceneId: 'confusion-matrix',
    stationId: 'errors',
    title: 'La matriz tiene una clase positiva',
    partLabel: '6.2',
    intro: 'Tránsito (PC) es la clase positiva; NTránsito agrupa AFP/NTP.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017', 'geron-classification', 'kelleher-classification'],
    summary:
      'La matriz cruza referencia y predicción: Tránsito representa PC y NTránsito agrupa AFP/NTP. TP, FN, FP y TN identifican las cuatro combinaciones; cada celda tiene un color propio y cada caso muestra la clase que predice el modelo. Activar un caso cambia su predicción, su celda y su color, mientras conserva fija la referencia. Cambiar la clase positiva cambia el significado de las métricas; la etiqueta de referencia continúa siendo imperfecta.',
    takeaway: 'Los términos TP, FP, FN y TN dependen de la referencia y de la clase positiva.',
  },
  {
    id: 's03-errors-3',
    sceneId: 'confusion-cases',
    stationId: 'errors',
    title: 'Dos errores, dos consecuencias',
    partLabel: '6.3',
    intro: 'Compara FP y FN en el ejemplo de veinte señales.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017', 'geron-classification', 'kelleher-classification'],
    summary:
      'En el ejemplo ficticio guiado hay TP=6, FN=4, FP=2 y TN=8. Un FP añade una señal negativa de referencia a la lista de predicciones PC; un FN deja sin recuperar una señal PC de referencia. La prioridad entre revisión y recuperación depende del objetivo científico y del presupuesto de seguimiento, no existe un costo universal.',
    takeaway: 'Los errores importan por sus consecuencias para la tarea, además de por el conteo.',
  },
  {
    id: 's03-metrics-1',
    sceneId: 'metric-accuracy',
    stationId: 'metrics',
    title: '¿Qué fracción total acertó?',
    partLabel: '7.1',
    intro: 'Accuracy resume aciertos sobre todas las señales evaluadas.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification', 'shallue-vanderburg-2017'],
    summary:
      'Accuracy se calcula como (TP+TN)/(TP+TN+FP+FN). En el ejemplo de veinte señales es 14/20=0,70. La muestra del catálogo está desbalanceada: predecir siempre AFP/NTP acertaría 12 137 de 15 737 etiquetas (77,12 %) y tendría recall cero para PC. Ese cálculo usa el catálogo etiquetado completo y no describe la composición exacta del test.',
    takeaway: 'Una accuracy alta puede esconder cero recuperación de la clase minoritaria.',
  },
  {
    id: 's03-metrics-2',
    sceneId: 'metric-error',
    stationId: 'metrics',
    title: '¿Qué fracción total se equivocó?',
    partLabel: '7.2',
    intro: 'La tasa de error complementa accuracy en el mismo conjunto.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification'],
    summary:
      'La tasa de error es (FP+FN)/N. Para la matriz didáctica, (2+4)/20=0,30. Accuracy y tasa de error se complementan cuando todas las observaciones participan de la misma cuenta; sus valores no describen qué clase concentra los errores.',
    takeaway: 'La tasa total de error necesita métricas por clase para mostrar dónde falla.',
  },
  {
    id: 's03-metrics-3',
    sceneId: 'metric-precision',
    stationId: 'metrics',
    title: 'De las predicciones PC, ¿cuántas coinciden?',
    partLabel: '7.3',
    intro: 'Precision mira la columna de predicciones positivas.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification'],
    summary:
      'Precision es TP/(TP+FP): entre las señales que el clasificador marcó PC, cuántas tienen etiqueta de referencia PC. En el ejemplo es 6/8=0,75. Responde a la coincidencia de la lista de predicciones positivas con las etiquetas, no a la verdad física del planeta.',
    takeaway: 'Precision baja cuando crece la fracción de falsos avisos entre predicciones PC.',
  },
  {
    id: 's03-metrics-4',
    sceneId: 'metric-recall',
    stationId: 'metrics',
    title: 'De los PC de referencia, ¿cuántos recuperó?',
    partLabel: '7.4',
    intro: 'Recall mira la fila de referencias positivas.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification'],
    summary:
      'Recall o TPR es TP/(TP+FN): entre las señales con etiqueta de referencia PC, cuántas recuperó el clasificador. En el ejemplo es 6/10=0,60. Elevar recall puede incorporar más señales positivas y también cambiar la cantidad de falsas alertas.',
    takeaway: 'Recall bajo deja más PC de referencia sin recuperar.',
  },
  {
    id: 's03-metrics-5',
    sceneId: 'metric-specificity',
    stationId: 'metrics',
    title: 'De los negativos, ¿cuántos dejó negativos?',
    partLabel: '7.5',
    intro: 'Especificidad resume los negativos clasificados correctamente.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification'],
    summary:
      'Especificidad o TNR es TN/(TN+FP). En el ejemplo es 8/10: ocho señales AFP/NTP de referencia se predicen negativas. El denominador incluye todos los negativos de referencia, no todas las instancias.',
    takeaway: 'Especificidad mide aciertos dentro de la clase negativa de referencia.',
  },
  {
    id: 's03-metrics-6',
    sceneId: 'metric-fpr',
    stationId: 'metrics',
    title: '¿Qué fracción de negativos marcó PC?',
    partLabel: '7.6',
    intro: 'FPR completa la lectura de la fila negativa.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification'],
    summary:
      'FPR es FP/(FP+TN)=1−especificidad. En el ejemplo es 2/10. Es la tasa de falsas alarmas entre los negativos de referencia y forma el eje horizontal de la curva ROC.',
    takeaway: 'FPR describe falsas predicciones positivas dentro de la población negativa.',
  },
  {
    id: 's03-metrics-7',
    sceneId: 'metric-f1',
    stationId: 'metrics',
    title: '¿Cómo se combinan precision y recall?',
    partLabel: '7.7',
    intro: 'F1 resume armónicamente ambas métricas para una clase positiva fijada.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification'],
    summary:
      'F1=2·precision·recall/(precision+recall)=2TP/(2TP+FP+FN). En el ejemplo, precision=6/8 y recall=6/10, por lo que F1=12/18≈0,67. La fórmula no incluye TN y no sustituye la decisión sobre qué error importa en la tarea.',
    takeaway: 'F1 resume precision y recall; no evalúa por sí sola todas las consecuencias.',
  },
  {
    id: 's03-thresholds-1',
    sceneId: 'threshold',
    stationId: 'thresholds',
    title: 'El umbral transforma puntajes en clases',
    partLabel: '8.1',
    intro: 'Usamos una práctica nueva de seis señales con regla puntaje ≥ umbral.',
    role: 'content',
    sourceIds: ['geron-classification', 'shallue-vanderburg-2017'],
    summary:
      'En la práctica ficticia de seis señales A–F, un puntaje mayor o igual al umbral produce la predicción PC. El umbral cambia qué señales pasan, la matriz y las métricas de ese ejemplo. No cambia los puntajes del modelo ni selecciona automáticamente un umbral válido para el test científico.',
    takeaway:
      'Cambiar el umbral mueve decisiones; los puntajes de las seis señales permanecen fijos.',
  },
  {
    id: 's03-thresholds-2',
    sceneId: 'pr',
    stationId: 'thresholds',
    title: 'Cada umbral produce un punto precision–recall',
    partLabel: '8.2',
    intro: 'Lee qué combinación de precision y recall corresponde a cada corte.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification', 'shallue-vanderburg-2017'],
    summary:
      'Al recorrer los puntajes y variar el umbral, cambia el conjunto predicho PC y se obtiene un punto de precision frente a recall. La práctica pequeña es ficticia y su curva no reproduce la Figura 6. Si no se predice ninguna señal positiva, precision queda sin definir y cualquier convención para dibujar el extremo debe declararse.',
    takeaway: 'La curva PR muestra la relación entre precision y recall a través de umbrales.',
    paperFigures: [
      paperFigure(
        6,
        'Figura 6 del artículo: curvas precision–recall publicadas para los modelos evaluados.',
      ),
    ],
  },
  {
    id: 's03-thresholds-3',
    sceneId: 'roc',
    stationId: 'thresholds',
    title: 'ROC conecta falsas alarmas y recuperación',
    partLabel: '8.3',
    intro: 'La curva relaciona FPR con TPR al mover el umbral.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification'],
    summary:
      'Cada punto ROC combina FPR en el eje horizontal y TPR o recall en el eje vertical para un umbral. En la práctica didáctica de seis señales, la curva escalonada se calcula de los puntajes fijados; no representa resultados de Kepler ni del artículo.',
    takeaway: 'ROC describe el balance de tasas en el conjunto y los puntajes evaluados.',
  },
  {
    id: 's03-thresholds-4',
    sceneId: 'auc',
    stationId: 'thresholds',
    title: 'AUC mide ordenamiento, no confirmación',
    partLabel: '8.4',
    intro: 'Ocho de nueve pares positivo–negativo quedan en el orden esperado.',
    role: 'content',
    sourceIds: ['geron-classification', 'kelleher-classification', 'shallue-vanderburg-2017'],
    summary:
      'El AUC de la práctica es 8/9≈0,89: en ocho de nueve pares con una señal positiva y una negativa, la positiva recibe mayor puntaje. Es una propiedad del conjunto de puntajes; no es accuracy, no fija un umbral, no mide calibración y no confirma planetas. El valor publicado para la CNN con dos vistas es ROC-AUC=0,988 en el test del artículo.',
    takeaway: 'AUC resume el ordenamiento de puntajes a través de umbrales.',
  },
  {
    id: 's03-results-1',
    sceneId: 'paper-results',
    stationId: 'results',
    title: 'Qué reportó el estudio',
    partLabel: '9.1',
    intro: 'El test, la accuracy al umbral 0,5 y ROC-AUC responden preguntas distintas.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017'],
    summary:
      'Sobre el test de 1 523 TCEs, el artículo reporta con dos vistas: modelo lineal accuracy 0,917 y ROC-AUC 0,963; totalmente conectado 0,941 y 0,977; CNN 0,960 y 0,988. Accuracy se reporta con umbral 0,5; la Figura 6 muestra precision–recall, no ROC. El test etiquetado del artículo y los TCEs encontrados después en otras estrellas son poblaciones diferentes.',
    takeaway: 'Cada cifra conserva su conjunto, umbral, métrica y fuente.',
  },
  {
    id: 's03-results-2',
    sceneId: 'paper-limits',
    stationId: 'results',
    title: 'Del puntaje al seguimiento y la validación',
    partLabel: '9.2',
    intro:
      'El clasificador priorizó señales; evidencia astronómica independiente validó Kepler-80 g y Kepler-90 i.',
    role: 'content',
    sourceIds: ['shallue-vanderburg-2017', 'nasa-exoplanet-archive-kepler10'],
    summary:
      'En una búsqueda de sistemas multiplanetarios de 670 estrellas, los autores obtuvieron 513 eventos de cruce de umbral. El clasificador priorizó 30 con puntaje mayor que 0,5, nueve por encima de 0,8 y cuatro por encima de 0,9. La revisión halló una compañera estelar posible en Kepler-534 y una profundidad que parecía cambiar en Kepler-647. Las señales de Kepler-80 y Kepler-90 pasaron las pruebas; sus probabilidades de falso positivo, 0,2 % y 0,5 %, quedaron por debajo de 0,01 % al contar los otros planetas de ambos sistemas. El equipo las validó como Kepler-80 g y Kepler-90 i. Las Figuras 11, 8 y 10 analizan límites y sensibilidad del modelo; una puntuación alta orientó la revisión, pero no confirmó por sí sola los planetas.',
    takeaway: 'El puntaje organiza la búsqueda; la evidencia independiente valida el resultado.',
    paperFigures: [
      paperFigure(
        11,
        'Figura 11: probabilidad predicha frente a razón entre MES primario y secundario.',
      ),
      paperFigure(
        8,
        'Extensión: Figura 8, respuesta del clasificador al ocultar partes de la señal.',
        true,
      ),
      paperFigure(
        10,
        'Extensión: Figura 10, puntaje frente a MES en señales planetarias simuladas.',
        true,
      ),
    ],
  },
];

const references: S03Screen = {
  id: 's03-references',
  sceneId: 'sources',
  stationId: 'references',
  title: 'Fuentes y procedencia',
  partLabel: 'Fuentes',
  intro: 'Consulta aquí las fuentes usadas y las localizaciones de cada afirmación.',
  role: 'references',
  sourceIds: S03_BIBLIOGRAPHY.map((source) => source.id),
  summary:
    'Las fuentes primarias sustentan la misión, los productos archivados, los datos de Kepler-10 y los resultados publicados. Las ilustraciones generadas son conceptuales; la muestra observada tiene un manifiesto de archivo y transformación propio. Las Figuras 3, 6, 8, 10 y 11 aparecen con su cita y enlace a la fuente original.',
  takeaway: 'Procedencia y tipo de evidencia acompañan cada figura y cifra.',
};

export const S03_SCREENS: S03Screen[] = [opening, ...contentScreens, references];

export const S03_OPENING = opening;
export const S03_REFERENCES = references;

export function getS03Screen(screenId: string): S03Screen | undefined {
  return S03_SCREENS.find((screen) => screen.id === screenId);
}
