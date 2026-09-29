import type { SlideRailItem } from './slide-rail';

export type S02StationId =
  'references' | 'trees' | 'generalization' | 'ensembles' | 'data' | 'colab' | 'closing';

export type S02Station = {
  id: S02StationId;
  title: string;
  shortTitle: string;
};

export type S02Stop = SlideRailItem & {
  stationId: S02StationId;
  eyebrow: string;
  intro: string;
};

export const s02Stations: readonly S02Station[] = [
  { id: 'references', title: 'Referencias', shortTitle: 'Fuentes' },
  { id: 'trees', title: 'Árboles', shortTitle: 'Reglas' },
  { id: 'generalization', title: 'Generalización', shortTitle: 'Sobreajuste' },
  { id: 'ensembles', title: 'Ensambles', shortTitle: 'Bosques' },
  { id: 'data', title: 'Datos', shortTitle: 'PSCompPars' },
  { id: 'colab', title: 'Práctica', shortTitle: 'Colab' },
  { id: 'closing', title: 'Cierre', shortTitle: 'Interpretar' },
];

export const s02TeachingStations = s02Stations.filter((station) => station.id !== 'references');

export const s02Stops: readonly S02Stop[] = [
  {
    id: 'references',
    stationId: 'references',
    groupLabel: 'Referencias',
    title: 'Bibliografía',
    partLabel: 'Fuentes de la sesión',
    tone: 'transfer',
    eyebrow: 'Diapositiva 00 · Referencias',
    intro: 'Fuentes de astronomía, catálogo y métodos que orientan esta sesión.',
  },
  {
    id: 'planet-classification',
    stationId: 'trees',
    groupLabel: 'Árboles',
    title: 'Clasificación',
    partLabel: 'De medidas a etiquetas',
    tone: 'question',
    eyebrow: 'Estación 1 · subestación 1',
    intro: 'Primero miramos cuatro planetas; luego seguimos sus reglas hasta la etiqueta.',
  },
  {
    id: 'rules',
    stationId: 'trees',
    groupLabel: 'Árboles',
    title: 'Árboles de decisión',
    partLabel: 'Reglas y umbrales',
    tone: 'decision',
    eyebrow: 'Estación 1 · subestación 2',
    intro:
      'Cada nodo pregunta si xⱼ ≤ t y envía los ejemplos por una de dos ramas. Prueba x₁ → x₂ o x₂ → x₁; luego compararemos los cortes.',
  },
  {
    id: 'information-gain',
    stationId: 'trees',
    groupLabel: 'Árboles',
    title: 'Información',
    partLabel: 'Ganancia de información',
    tone: 'model',
    eyebrow: 'Estación 1 · subestación 3',
    intro: 'Buscamos el corte que mejor separa las etiquetas:',
  },
  {
    id: 'tree-code',
    stationId: 'trees',
    groupLabel: 'Árboles',
    title: 'scikit-learn',
    partLabel: 'Entrenar y explorar',
    tone: 'model',
    eyebrow: 'Estación 1 · subestación 4',
    intro:
      'Con fit aprende reglas; con predict clasifica. Ajusta los límites y observa los cambios.',
  },
  {
    id: 'regression',
    stationId: 'trees',
    groupLabel: 'Árboles',
    title: 'Regresión',
    partLabel: 'La media de una hoja',
    tone: 'model',
    eyebrow: 'Estación 1 · subestación 5',
    intro:
      'Con error cuadrático, una hoja aprende la media de sus valores observados y la devuelve para nuevos ejemplos que llegan allí.',
  },
  {
    id: 'regression-error',
    stationId: 'trees',
    groupLabel: 'Árboles',
    title: 'Explorar los cortes',
    partLabel: 'Mover el umbral',
    tone: 'model',
    eyebrow: 'Estación 1 · subestación 6',
    intro:
      'Mueve el corte raíz y observa cómo cambian las hojas, sus promedios y el error cuadrático; después prueba una división más.',
  },
  {
    id: 'overfit',
    stationId: 'generalization',
    groupLabel: 'Generalización',
    title: 'Sobreajuste',
    partLabel: 'Regular la profundidad',
    tone: 'limit',
    eyebrow: 'Estación 2 · subestación 1',
    intro:
      'Con un árbol ya entrenado, la misma entrada produce la misma salida. Al reentrenarlo con otra muestra, sus reglas pueden cambiar; con demasiada profundidad, puede aprender detalles que fallan en datos nuevos.',
  },
  {
    id: 'bootstrap',
    stationId: 'ensembles',
    groupLabel: 'Ensambles',
    title: 'Bootstrap',
    partLabel: 'Remuestrear con reemplazo',
    tone: 'data',
    eyebrow: 'Estación 3 · subestación 1',
    intro:
      'Bootstrap (remuestreo con reemplazo): se saca una tarjeta y se devuelve al conjunto antes del siguiente sorteo. Así, una tarjeta puede salir varias veces y otra no salir. Con cuatro casos, cada árbol recibe cuatro sorteos; como cada uno obtiene una muestra distinta, puede aprender patrones diferentes.',
  },
  {
    id: 'forest',
    stationId: 'ensembles',
    groupLabel: 'Ensambles',
    title: 'Random Forest',
    partLabel: 'Combinar árboles',
    tone: 'model',
    eyebrow: 'Estación 3 · subestación 2',
    intro:
      'Un árbol puede cambiar si aprende con otros datos. Random Forest combina árboles diversos para que la salida dependa menos de uno solo.',
  },
  {
    id: 'dataset',
    stationId: 'data',
    groupLabel: 'Datos',
    title: 'Actividad',
    partLabel: 'Predecir el radio',
    tone: 'data',
    eyebrow: 'Estación 4 · subestación 1',
    intro:
      'Partimos de los registros del NASA Exoplanet Archive: ¿basta la masa para estimar el radio o ayuda añadir la irradiación? Anticipa cuál comparación tendrá menor error.',
  },
  {
    id: 'data-quality',
    stationId: 'data',
    groupLabel: 'Datos',
    title: 'Procedencia',
    partLabel: 'Auditar el catálogo',
    tone: 'limit',
    eyebrow: 'Estación 4 · subestación 2',
    intro:
      'Cada fila reúne datos con referencias y límites distintos. Revisemos qué planetas entran, qué incertidumbre acompaña cada valor y de dónde viene el radio.',
  },
  {
    id: 'colab-activity',
    stationId: 'colab',
    groupLabel: 'Práctica',
    title: 'Actividad',
    partLabel: 'Predecir el radio de exoplanetas',
    tone: 'question',
    eyebrow: 'Estación 5 · subestación 1',
    intro:
      '¿Añadir irradiación a la masa mejora la predicción del radio en planetas reservados al azar?',
  },
  {
    id: 'limits',
    stationId: 'closing',
    groupLabel: 'Cierre',
    title: 'Interpretación',
    partLabel: 'Comunicar los límites',
    tone: 'transfer',
    eyebrow: 'Estación 6 · subestación 1',
    intro:
      'En la salida guardada, añadir insolación mejora MAE y R² en 306 planetas de prueba elegidos al azar. Interpreta el resultado según la muestra y los límites de esta partición.',
  },
  {
    id: 'sources',
    stationId: 'closing',
    groupLabel: 'Cierre',
    title: 'Fuentes',
    partLabel: 'Seguir explorando',
    tone: 'transfer',
    eyebrow: 'Estación 6 · subestación 2',
    intro:
      'Consulta la documentación del catálogo y de los métodos para adaptar esta sesión a otra pregunta científica.',
  },
];

export const s02OpeningSources = [
  {
    group: 'Datos NASA',
    label: 'PSCompPars: columnas, unidades y banderas',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html',
  },
  {
    group: 'Datos NASA',
    label: 'Cómo calcula el archivo parámetros compuestos',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/pscp_calc.html',
  },
  {
    group: 'Datos NASA',
    label: 'Guía para consultas por TAP',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html',
  },
  {
    group: 'Planetas',
    label: 'Fulton et al. (2017) · brecha de radios en planetas Kepler',
    href: 'https://arxiv.org/abs/1703.10375',
  },
  {
    group: 'Planetas',
    label: 'Lopez & Fortney (2014) · radio como pista de composición',
    href: 'https://doi.org/10.1088/0004-637X/792/1/1',
  },
  {
    group: 'Planetas',
    label: 'Sestovic et al. (2018) · radios inflados de Júpiteres calientes',
    href: 'https://doi.org/10.1051/0004-6361/201731454',
  },
  {
    group: 'Árboles',
    label: 'scikit-learn · DecisionTreeClassifier y sus hiperparámetros',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html',
  },
  {
    group: 'Árboles',
    label: 'scikit-learn · formulación y criterios de impureza',
    href: 'https://scikit-learn.org/stable/modules/tree.html',
  },
  {
    group: 'Árboles',
    label: 'Géron (2023) · árboles y ensambles, caps. 6–7',
    href: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/',
  },
  {
    group: 'Árboles',
    label: 'Kelleher et al. (2015) · árboles, cap. 4',
    href: 'https://mitpress.mit.edu/9780262029445/fundamentals-of-machine-learning-for-predictive-data-analytics/',
  },
  {
    group: 'Bosques',
    label: 'scikit-learn · Random Forest',
    href: 'https://scikit-learn.org/stable/modules/ensemble.html#forest',
  },
  {
    group: 'Bosques',
    label: 'Breiman (2001) · Random Forests',
    href: 'https://doi.org/10.1023/A:1010933404324',
  },
];

export const s02Sources = [
  {
    label: 'NASA Exoplanet Archive: servicio TAP',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html',
  },
  {
    label: 'NASA Exoplanet Archive: columnas de PSCompPars',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html',
  },
  {
    label: 'NASA Exoplanet Archive: cálculos de parámetros compuestos',
    href: 'https://exoplanetarchive.ipac.caltech.edu/docs/pscp_calc.html',
  },
  {
    label: 'Fulton et al. (2017), brecha de radios en planetas Kepler',
    href: 'https://arxiv.org/abs/1703.10375',
  },
  {
    label: 'Lopez & Fortney (2014), radio y composición de sub-Neptunos',
    href: 'https://doi.org/10.1088/0004-637X/792/1/1',
  },
  {
    label: 'Sestovic et al. (2018), radios inflados de Júpiteres calientes',
    href: 'https://doi.org/10.1051/0004-6361/201731454',
  },
  {
    label: 'scikit-learn: DecisionTreeClassifier y sus hiperparámetros',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeClassifier.html',
  },
  {
    label: 'scikit-learn: DecisionTreeRegressor y criterios de error',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeRegressor.html',
  },
  {
    label: 'scikit-learn: formulación y criterios de impureza',
    href: 'https://scikit-learn.org/stable/modules/tree.html',
  },
  {
    label: 'Géron (2023), capítulos 6–7: árboles de decisión y Random Forest',
    href: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/',
  },
  {
    label: 'Kelleher et al. (2015), capítulo 4: árboles e información',
    href: 'https://mitpress.mit.edu/9780262029445/fundamentals-of-machine-learning-for-predictive-data-analytics/',
  },
  {
    label: 'scikit-learn: ensambles de árboles',
    href: 'https://scikit-learn.org/stable/modules/ensemble.html#forest',
  },
  {
    label: 'scikit-learn: train_test_split',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html',
  },
  {
    label: 'scikit-learn: RandomForestRegressor e importancia MDI',
    href: 'https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html',
  },
  {
    label: 'Breiman (1996), Bagging Predictors',
    href: 'https://doi.org/10.1007/BF00058655',
  },
  {
    label: 'Breiman (2001), Random Forests',
    href: 'https://doi.org/10.1023/A:1010933404324',
  },
];

export const s02NotebookPath = 'notebooks/S02_arboles_decision_random_forest.ipynb';
export const s02ColabUrl =
  'https://colab.research.google.com/github/D4san/ML-CPlanetarias/blob/main/notebooks/S02_arboles_decision_random_forest.ipynb';
