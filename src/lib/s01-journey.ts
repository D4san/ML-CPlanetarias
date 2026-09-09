export type S01Tone = 'question' | 'data' | 'model' | 'decision' | 'limit' | 'transfer';

export const s01Stops = [
  {
    id: 'question',
    hash: 'pregunta',
    shortLabel: 'Pregunta',
    title: 'Pregunta y uso',
    focusTitle: '¿Qué queremos responder con los datos?',
    tone: 'question',
    arrival:
      'El recorrido comienza con una observación disponible, pero todavía no sabemos qué queremos obtener de ella.',
    arrivalShort: 'Observación disponible → definir propósito.',
    explanation:
      'Primero elegimos qué queremos conocer o producir. Después aclaramos para qué servirá esa salida y desde qué disciplina formularemos la pregunta.',
    tutorPrompt: '¿Qué salida sería útil y cómo reconoceríamos que responde la pregunta?',
    expected:
      'La pregunta debe nombrar una unidad de análisis, una salida esperada, un uso y una primera condición de éxito.',
    next: 'Con la salida y el uso claros, podemos decidir qué cuenta como una instancia y qué parte de la observación recibirá el método.',
    nextShort: 'Propósito claro → identificar la instancia.',
    misconception: 'Una colección de datos ya define por sí sola el problema de ML.',
    repair:
      'Usa el mismo dato para proponer dos salidas distintas y muestra que cambian la tarea y la evaluación.',
  },
  {
    id: 'instance',
    hash: 'instancia',
    shortLabel: 'Instancia',
    title: 'Instancia y representación',
    focusTitle: '¿Qué entra al método y qué debe salir?',
    tone: 'data',
    arrival:
      'La pregunta ya indica qué queremos producir. Ahora debemos identificar el caso individual sobre el que responderemos.',
    arrivalShort: 'Pregunta definida → separar los objetos.',
    explanation:
      'Separamos la instancia, la observación medida y su representación. Luego hacemos explícitas la señal que guía el aprendizaje, la relación ajustada y la salida.',
    focusSteps: [
      'Unidad: una fuente, visita, espectro, imagen, curva de luz o segmento.',
      'Representación: x conserva la información que el método podrá usar.',
      'Señal: y existe por instancia en aprendizaje supervisado; otras rutas usan estructura o recompensa.',
      'Salida: el modelo produce una estimación, un grupo, una rareza o una acción.',
    ],
    tutorPrompt: '¿Qué constituye una instancia y qué información conserva su representación?',
    expected:
      'La instancia debe ser reconocible —una fuente, visita, espectro o segmento— y su representación debe conservar información pertinente para la pregunta.',
    next: 'Cuando sabemos qué representa cada caso, podemos preguntar qué información guía el aprendizaje y reconocer el paradigma.',
    nextShort: 'Representación explícita → reconocer la señal.',
    misconception: 'La representación es el fenómeno observado.',
    repair:
      'Cambia la representación del mismo espectro y pregunta qué información se conserva, transforma o pierde.',
  },
  {
    id: 'signal',
    hash: 'senal',
    shortLabel: 'Señal',
    title: 'Señal y paradigma',
    tone: 'model',
    arrival:
      'Ya definimos la representación. Falta reconocer qué información permite ajustar o evaluar el comportamiento del sistema.',
    arrivalShort: 'Representación lista → identificar la señal.',
    explanation:
      'Buscamos objetivos por instancia, estructura sin objetivos o consecuencias acompañadas por recompensa. Esa diferencia organiza el paradigma.',
    tutorPrompt: '¿De dónde proviene la señal que permite aprender y qué sesgos contiene?',
    expected:
      'El paradigma debe justificarse por la señal disponible: objetivos por instancia, estructura sin objetivos o recompensa por acciones.',
    next: 'El paradigma aclara de dónde viene la señal. La siguiente decisión consiste en precisar la forma de la salida y, con ella, la tarea.',
    nextShort: 'Señal identificada → nombrar la tarea.',
    misconception: 'El paradigma depende de usar o no una red neuronal.',
    repair:
      'Mantén fija la familia y cambia únicamente la señal disponible; observa que cambia el paradigma.',
  },
  {
    id: 'task',
    hash: 'tarea',
    shortLabel: 'Tarea',
    title: 'Tarea y salida',
    tone: 'model',
    arrival:
      'La señal disponible ya está identificada. Ahora debemos traducir la pregunta en una salida concreta.',
    arrivalShort: 'Señal identificada → precisar la salida.',
    explanation:
      'La forma de la salida nombra la tarea: un valor, una clase, un grupo, una rareza, una acción o una muestra. Todavía no hemos elegido cómo producirla.',
    tutorPrompt: '¿Qué tipo de salida responde a la pregunta y cómo se podría evaluar?',
    expected:
      'La tarea se identifica por la salida que necesita la pregunta, antes de elegir el algoritmo o la familia que podría producirla.',
    next: 'Con la tarea definida, podemos comparar varias familias de modelo sin mezclar señal, salida y mecanismo.',
    nextShort: 'Tarea definida → comparar familias.',
    misconception: 'Regresión, clasificación y supervisado ocupan el mismo nivel.',
    repair:
      'Pide ubicar cada término en señal, tarea o familia y exige una frase que justifique la posición.',
  },
  {
    id: 'family',
    hash: 'familia',
    shortLabel: 'Familia',
    title: 'Familia y aprendizaje',
    tone: 'model',
    arrival:
      'La tarea ya dice qué debe producir el sistema, pero varias reglas y familias pueden concordar con los mismos ejemplos.',
    arrivalShort: 'Tarea definida → comparar reglas posibles.',
    explanation:
      'Comparamos reglas escritas de antemano con relaciones ajustadas desde datos. Una muestra finita deja varias soluciones compatibles, por lo que cada familia introduce supuestos.',
    tutorPrompt: '¿Qué supuesto hace razonable una familia y qué comparación simple debe superar?',
    expected:
      'La familia se trata como una hipótesis de trabajo con sesgo inductivo, costo de complejidad y una línea base que deberá superar.',
    next: 'Antes de confiar en esa familia, debemos comprobar si los datos usados para ajustarla representan las condiciones reales de uso.',
    nextShort: 'Familia elegida → revisar el dominio.',
    misconception: 'Deep learning es un cuarto paradigma o una elección automática.',
    repair:
      'Coloca deep learning dentro de redes neuronales y conéctalo con más de una tarea y señal posible.',
  },
  {
    id: 'domain',
    hash: 'dominio',
    shortLabel: 'Dominio',
    title: 'Datos y dominio',
    tone: 'data',
    arrival:
      'Una familia puede ser razonable y aun así fallar cuando cambian el instrumento, la selección o la población observada.',
    arrivalShort: 'Familia elegida → comparar datos y uso.',
    explanation:
      'Comparamos las condiciones de entrenamiento con las de uso. Ruido, resolución, faltantes, selección y cambios de distribución pueden alterar la representación y la salida.',
    tutorPrompt:
      '¿Los datos de entrenamiento representan las condiciones donde se usará la salida?',
    expected:
      'Antes de culpar al modelo, formulamos hipótesis concretas sobre medición, representación, partición y cambio de dominio.',
    next: 'Con el dominio explícito, podemos diseñar una evaluación justa y decidir qué afirmaciones permite sostener el resultado.',
    nextShort: 'Dominio explícito → evaluar la evidencia.',
    misconception: 'Un modelo que funciona en simulaciones funcionará igual en observaciones.',
    repair:
      'Transforma un espectro sintético limpio en uno observado y localiza cada diferencia introducida.',
  },
  {
    id: 'evidence',
    hash: 'evidencia',
    shortLabel: 'Evidencia',
    title: 'Evidencia y límites',
    tone: 'limit',
    arrival:
      'Llegamos con pregunta, representación, señal, tarea, familia y dominio explícitos. Ahora debemos probar la salida en condiciones pertinentes.',
    arrivalShort: 'Ruta completa → poner a prueba la salida.',
    explanation:
      'Comparamos con una línea base y evaluamos datos no vistos. Después separamos desempeño predictivo, generalización, utilidad e interpretación física.',
    tutorPrompt: '¿Qué conclusión seguiría injustificada aunque la métrica fuera excelente?',
    expected:
      'La conclusión debe quedar acotada por los datos, la partición, la métrica, el dominio y el uso previsto.',
    next: 'La evaluación cierra el ciclo: si la afirmación no es útil o no se sostiene, revisamos la pregunta, los datos o el uso previsto.',
    nextShort: 'Evidencia insuficiente → revisar el ciclo.',
    misconception: 'Ajuste perfecto o métrica alta demuestran que el modelo aprendió la física.',
    repair:
      'Pide formular una conclusión permitida y otra todavía prohibida usando el mismo resultado.',
  },
] as const;

export type S01Stop = (typeof s01Stops)[number];
export type S01StopId = S01Stop['id'];

export type S01ScenarioId = 'spectrum' | 'catalog' | 'followup';
export type S01Paradigm = 'supervised' | 'unsupervised' | 'reinforcement';

export const s01ParadigmDefinitions = [
  {
    id: 'supervised',
    label: 'Supervisado',
    notation: 'D = \\{(x_i, y_i)\\}_{i=1}^{n}',
    question: '¿Qué objetivo conocido debe aprender a producir el modelo?',
    definition:
      'Paradigma en el que cada instancia de ajuste viene acompañada por un objetivo o etiqueta yᵢ. El modelo aprende una relación entre la representación xᵢ y ese objetivo para producir una salida en instancias nuevas.',
    example:
      'Ejemplo astronómico: estimar una abundancia desde espectros con abundancias de referencia, o clasificar curvas de luz etiquetadas.',
  },
  {
    id: 'unsupervised',
    label: 'No supervisado',
    notation: 'z_i = h_\\theta(x_i)',
    question: '¿Qué estructura aparece cuando no hay una etiqueta por instancia?',
    definition:
      'Paradigma en el que las instancias no traen un objetivo etiquetado por fila. El método busca estructura en la representación —por ejemplo, grupos, densidades o rarezas— mediante una noción explícita de similitud o probabilidad.',
    example:
      'Ejemplo astronómico: encontrar familias de espectros o localizar fuentes atípicas en un catálogo sin clases asignadas por expertos.',
  },
  {
    id: 'reinforcement',
    label: 'Por refuerzo',
    notation: '(s_t, a_t, r_t, s_{t+1})',
    question: '¿Qué acción conviene tomar cuando las consecuencias llegan después?',
    definition:
      'Paradigma en el que un agente interactúa con un entorno: observa un estado sₜ, elige una acción aₜ y recibe consecuencias y una recompensa rₜ. La política se ajusta para aumentar la utilidad acumulada en un horizonte definido.',
    example:
      'Ejemplo astronómico: escoger la siguiente observación de seguimiento teniendo en cuenta tiempo de telescopio, clima, estado del objetivo y la información esperada.',
  },
] as const satisfies ReadonlyArray<{
  id: S01Paradigm;
  label: string;
  notation: string;
  question: string;
  definition: string;
  example: string;
}>;

type ScenarioRoute = Record<S01StopId, string>;

export interface S01Scenario {
  id: S01ScenarioId;
  label: string;
  shortLabel: string;
  prompt: string;
  paradigm: S01Paradigm;
  paradigmLabel: string;
  route: ScenarioRoute;
}

export const s01Scenarios: readonly S01Scenario[] = [
  {
    id: 'spectrum',
    label: 'Espectro → abundancia',
    shortLabel: 'Espectro',
    prompt: 'Estimar una abundancia continua a partir de un espectro.',
    paradigm: 'supervised',
    paradigmLabel: 'Supervisado',
    route: {
      question: 'Quiero estimar una abundancia para apoyar la caracterización de una atmósfera.',
      instance:
        'Una instancia es un espectro; x representa su flujo y y la abundancia conocida al aprender.',
      signal: 'Hay objetivos conocidos para las instancias de entrenamiento: señal supervisada.',
      task: 'La salida es un valor continuo: tarea de regresión.',
      family: 'Varias familias siguen abiertas; una relación simple sirve como primera línea base.',
      domain: 'Espectros sintéticos y observados pueden diferir en ruido, resolución y cobertura.',
      evidence:
        'Se evalúan objetos no vistos y se reporta error; predecir bien no prueba un mecanismo físico.',
    },
  },
  {
    id: 'catalog',
    label: 'Catálogo → estructura',
    shortLabel: 'Catálogo',
    prompt: 'Buscar estructura o casos raros en un catálogo sin etiquetas.',
    paradigm: 'unsupervised',
    paradigmLabel: 'No supervisado',
    route: {
      question: 'Quiero describir estructura y localizar fuentes inusuales en el catálogo.',
      instance:
        'Una instancia es una fuente; x reúne variables observadas y derivadas, sin objetivo por fila.',
      signal: 'No se entrega un objetivo por instancia: señal no supervisada.',
      task: 'La salida puede ser un grupo, una región densa o una puntuación de rareza.',
      family:
        'Similitud, densidad y modelos probabilísticos ofrecen hipótesis distintas sobre estructura.',
      domain:
        'Selección observacional, faltantes y escalas de las variables cambian la geometría del catálogo.',
      evidence:
        'Estabilidad y contraste externo apoyan utilidad; un cluster no constituye una clase física.',
    },
  },
  {
    id: 'followup',
    label: 'Telescopio → seguimiento',
    shortLabel: 'Seguimiento',
    prompt: 'Elegir la siguiente observación a partir de estados, acciones y recompensa.',
    paradigm: 'reinforcement',
    paradigmLabel: 'Por refuerzo',
    route: {
      question: 'Quiero priorizar la siguiente observación bajo tiempo e información limitados.',
      instance:
        'El estado resume objetivo, instrumento, clima, agenda e información ya disponible.',
      signal:
        'Las acciones producen consecuencias y una recompensa definida: aprendizaje por refuerzo.',
      task: 'La salida es una acción de seguimiento; la política es la regla que la selecciona, no la tarea.',
      family:
        'La familia depende de cómo representamos estado, transición, recompensa y horizonte.',
      domain:
        'Clima, disponibilidad instrumental y población de objetivos pueden cambiar durante el uso.',
      evidence:
        'Se compara con una política simple y se evalúa el objetivo; priorizar no confirma una hipótesis.',
    },
  },
] as const;

export type S01ActivityId = 'rules' | 'signal' | 'levels' | 'evidence' | 'transfer';

export interface S01ActivityOption {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
}

export interface S01Activity {
  id: S01ActivityId;
  number: string;
  stopId: S01StopId;
  kicker: string;
  title: string;
  prompt: string;
  hint: string;
  success: string;
  options: readonly S01ActivityOption[];
}

export const s01Activities: readonly S01Activity[] = [
  {
    id: 'rules',
    number: '01',
    stopId: 'family',
    kicker: 'Reglas o aprendizaje',
    title: '¿Qué harías con diez mil curvas?',
    prompt:
      'Tenemos diez mil curvas de luz históricas clasificadas por expertos y una curva nueva. Elige la primera ruta que pondrías a prueba.',
    hint: 'La experiencia debe mejorar una tarea medible en datos que no se usaron para ajustar.',
    success:
      'Aprender de ejemplos puede reducir la lista de reglas, siempre que la representación, las etiquetas y la evaluación sean pertinentes.',
    options: [
      {
        id: 'thresholds',
        label: 'Añadir otro umbral manual para cada error',
        correct: false,
        feedback:
          'Eso extiende la ruta de reglas explícitas; todavía no usa las curvas como experiencia.',
      },
      {
        id: 'examples',
        label: 'Ajustar una relación con las curvas etiquetadas y evaluar curvas no usadas',
        correct: true,
        feedback:
          'La experiencia son los ejemplos; la evaluación comprueba si la relación generaliza.',
      },
      {
        id: 'single',
        label: 'Usar la curva nueva como prueba suficiente del modelo',
        correct: false,
        feedback:
          'Una sola curva no permite comparar una línea base ni estimar el desempeño de forma estable.',
      },
    ],
  },
  {
    id: 'signal',
    number: '02',
    stopId: 'signal',
    kicker: 'La señal',
    title: '¿Qué guía el ajuste?',
    prompt:
      'Queremos distinguir tránsito, binaria eclipsante y artefacto instrumental en curvas de luz. ¿Qué información guía el aprendizaje?',
    hint: 'El paradigma se reconoce por la señal disponible, antes de elegir una red o un algoritmo.',
    success:
      'Una etiqueta por curva abre una ruta supervisada. La familia del modelo se decide después.',
    options: [
      {
        id: 'target',
        label: 'Una etiqueta por curva: tránsito, binaria o artefacto',
        correct: true,
        feedback: 'Hay un objetivo por instancia: la señal es supervisada.',
      },
      {
        id: 'structure',
        label: 'Solo la estructura del catálogo, sin etiquetas',
        correct: false,
        feedback:
          'Esa señal abriría una ruta no supervisada; aquí sí conocemos una clase por curva.',
      },
      {
        id: 'reward',
        label: 'Una recompensa después de cada acción',
        correct: false,
        feedback:
          'La recompensa corresponde a una interacción secuencial, no a esta clasificación estática.',
      },
    ],
  },
  {
    id: 'levels',
    number: '03',
    stopId: 'task',
    kicker: 'La rama correcta',
    title: 'Una tarea abre varias familias',
    prompt:
      'Lee el árbol de una salida a ejemplos de algoritmos. ¿Qué frase conserva la diferencia entre señal, tarea y familia?',
    hint: 'La señal dice de dónde viene la guía; la tarea nombra la salida; la familia propone una forma de producirla.',
    success:
      'Correcto: clasificación nombra la salida; supervisado nombra la señal; árboles, vecinos y modelos lineales son familias o ejemplos de implementación.',
    options: [
      {
        id: 'task-family',
        label: 'Clasificación es tarea; un árbol o random forest es familia; una etiqueta es señal',
        correct: true,
        feedback:
          'La misma tarea puede abrir varias familias. El algoritmo se compara después de declarar la señal y la salida.',
      },
      {
        id: 'paradigm-task',
        label: 'Supervisado es la tarea y regresión es la señal',
        correct: false,
        feedback:
          'Supervisado describe la señal disponible y regresión describe una salida continua; ninguno ocupa el lugar del otro.',
      },
      {
        id: 'algorithm-task',
        label: 'Random forest es una tarea y clustering es una familia',
        correct: false,
        feedback:
          'Random forest es una familia o método; clustering nombra una tarea de estructura, no un algoritmo único.',
      },
    ],
  },
  {
    id: 'evidence',
    number: '04',
    stopId: 'evidence',
    kicker: 'La afirmación',
    title: '¿Qué puedes defender?',
    prompt:
      'El modelo acierta muy bien en curvas sintéticas. Elige la afirmación que todavía necesita una prueba antes de usarlo.',
    hint: 'La evidencia debe conservar comparación, datos no vistos y condiciones de uso.',
    success:
      'Una comparación con línea base en datos pertinentes permite hablar de desempeño bajo esas condiciones; deja abiertas las afirmaciones físicas y universales.',
    options: [
      {
        id: 'unseen',
        label: 'Compararlo con una línea base en curvas no usadas y cercanas al uso real',
        correct: true,
        feedback:
          'Esa prueba acota la afirmación a una métrica, una partición y un dominio explícitos.',
      },
      {
        id: 'mechanism',
        label: 'Concluir que aprendió el mecanismo físico del tránsito',
        correct: false,
        feedback:
          'Una buena predicción no identifica por sí sola el mecanismo físico que la produce.',
      },
      {
        id: 'universal',
        label: 'Afirmar que funcionará con cualquier instrumento',
        correct: false,
        feedback:
          'El cambio de instrumento puede cambiar ruido, resolución, selección y distribución.',
      },
    ],
  },
  {
    id: 'transfer',
    number: '05',
    stopId: 'domain',
    kicker: 'Transferencia',
    title: 'Cambia el instrumento',
    prompt:
      'La resolución baja y aparecen faltantes cuando pasamos a otro instrumento. ¿Qué revisarías primero?',
    hint: 'Antes de aumentar la complejidad del modelo, revisa qué información llega y si representa el uso.',
    success:
      'El cambio de dominio obliga a revisar medición, representación, partición y métrica antes de atribuir el fallo a la familia.',
    options: [
      {
        id: 'domain',
        label: 'Revisar la representación y la diferencia entre entrenamiento y uso',
        correct: true,
        feedback:
          'La señal puede haberse perdido o cambiado de distribución aunque la familia siga fija.',
      },
      {
        id: 'depth',
        label: 'Aumentar la profundidad del modelo sin revisar los datos',
        correct: false,
        feedback:
          'Más capacidad no corrige una representación frágil ni un dominio no representativo.',
      },
      {
        id: 'metric',
        label: 'Mantener la misma métrica aunque cambie el uso',
        correct: false,
        feedback:
          'La métrica debe seguir la tarea y el uso; un cambio de contexto puede cambiar qué error importa.',
      },
    ],
  },
] as const;

export type S01SemanticLevel = 'signal' | 'task' | 'family';
export type S01RepairItemId = 'supervised' | 'regression' | 'clustering' | 'deep-learning';

export const s01RepairItems = [
  { id: 'supervised', label: 'Supervisado', expected: 'signal' },
  { id: 'regression', label: 'Regresión', expected: 'task' },
  { id: 'clustering', label: 'Clustering', expected: 'task' },
  { id: 'deep-learning', label: 'Deep learning', expected: 'family' },
] as const satisfies ReadonlyArray<{
  id: S01RepairItemId;
  label: string;
  expected: S01SemanticLevel;
}>;

export const semanticLevelLabels: Record<S01SemanticLevel, string> = {
  signal: 'Señal',
  task: 'Tarea',
  family: 'Familia',
};

export type S01LensId = 'ai' | 'statistics' | 'ml';

export const s01Outcomes = [
  {
    id: 'predict',
    label: 'Predecir',
    definition:
      'Asignar una salida a una instancia nueva o a un caso cuyo valor objetivo todavía no está disponible. Puede ser una clase, una probabilidad o una cantidad continua; “predicción” no implica necesariamente hablar del futuro.',
    example: 'Espectro nuevo → abundancia, temperatura o clase atmosférica.',
  },
  {
    id: 'describe',
    label: 'Describir',
    definition:
      'Resumir y explorar cómo se distribuyen, varían y relacionan las observaciones, o qué estructura aparece en ellas. Puede usar etiquetas o no; aquí destacamos las salidas de estructura y distribución.',
    example: 'Catálogo sin etiquetas → poblaciones, tendencias o casos atípicos.',
  },
  {
    id: 'estimate',
    label: 'Estimar',
    definition:
      'Obtener desde los datos una cantidad, un parámetro o una relación mediante un procedimiento que explicite la variabilidad, la incertidumbre y los supuestos que sostienen el resultado.',
    example: 'Señal espectral → relación molecular con intervalo de incertidumbre.',
  },
  {
    id: 'decide',
    label: 'Decidir',
    definition:
      'Seleccionar una acción o recomendación a partir de la información disponible, un objetivo y un criterio explícito de utilidad, pérdida o costo.',
    example: 'Candidatos y tiempo de telescopio → próxima observación prioritaria.',
  },
  {
    id: 'generate',
    label: 'Generar',
    definition:
      'Producir muestras, reconstrucciones o instancias sintéticas a partir de un modelo de la distribución de los datos, posiblemente condicionado por variables dadas. Que una muestra parezca plausible no la convierte por sí sola en evidencia física.',
    example: 'Temperatura y composición → espectros sintéticos compatibles.',
  },
] as const;

export type S01OutcomeId = (typeof s01Outcomes)[number]['id'];

export const s01TaskDefinitions = [
  {
    id: 'regression',
    output: 'valor continuo',
    label: 'Regresión',
    notation: '\\hat y \\in \\mathbb{R}^d',
    question: '¿Qué valor continuo corresponde a esta instancia?',
    definition:
      'Tarea que ajusta una relación para producir un número o un vector continuo a partir de variables descriptivas y objetivos conocidos. El error y la incertidumbre deben corresponder al uso científico.',
    example:
      'Ejemplo astronómico: estimar radio, temperatura o abundancia atmosférica desde un espectro. La salida sigue siendo una estimación, no una medición directa de la propiedad física.',
  },
  {
    id: 'classification',
    output: 'clase / prob.',
    label: 'Clasificación',
    notation: '\\hat y \\in \\mathcal{C}',
    question: '¿A qué clase o conjunto de clases pertenece esta instancia?',
    definition:
      'Tarea que produce una clase, una probabilidad o varias etiquetas para cada instancia. Necesita ejemplos etiquetados y una evaluación que haga visibles los costos de los falsos positivos y los falsos negativos.',
    example:
      'Ejemplo astronómico: distinguir tránsito, binaria eclipsante y artefacto instrumental en curvas de luz. Una etiqueta útil no equivale automáticamente a una verdad física.',
  },
  {
    id: 'clustering',
    output: 'grupos',
    label: 'Clustering',
    notation: 'z_i = h_\\theta(x_i)',
    question: '¿Qué grupos o regiones de similitud aparecen en los datos?',
    definition:
      'Tarea que organiza instancias sin objetivo etiquetado mediante una noción explícita de similitud, distancia o densidad. Los grupos inducidos requieren estabilidad, comparación externa e interpretación científica.',
    example:
      'Ejemplo astronómico: encontrar familias de espectros en un catálogo sin etiquetas. Un grupo describe una estructura de la representación; no demuestra por sí mismo una clase natural.',
  },
  {
    id: 'anomaly',
    output: 'rareza',
    label: 'Anomalía',
    notation: 's(x) \\ll s(x_{\\mathrm{ref}})',
    question: '¿Qué instancias se apartan del conjunto de referencia?',
    definition:
      'Tarea que asigna una puntuación o una señal de rareza respecto de una población de referencia. El resultado depende de la representación, la selección y la definición operativa de normalidad.',
    example:
      'Ejemplo astronómico: localizar espectros atípicos, artefactos de detector o candidatos fuera del dominio de referencia. Ser raro no demuestra que el objeto tenga un fenómeno nuevo.',
  },
  {
    id: 'decision',
    output: 'acción',
    label: 'Decisión',
    notation: 'a_t = \\pi_\\theta(s_t)',
    question: '¿Qué acción conviene tomar con la información disponible?',
    definition:
      'Tarea cuya salida es una acción o recomendación elegida con un criterio explícito de utilidad, pérdida o costo. En una secuencia, la decisión considera estados, consecuencias y recompensas.',
    example:
      'Ejemplo astronómico: seleccionar la siguiente observación de seguimiento según la información esperada y el tiempo de telescopio disponible.',
  },
  {
    id: 'generation',
    output: 'muestra',
    label: 'Generación',
    notation: 'x^{\\prime} \\sim p_\\theta(x)',
    question: '¿Qué distribución queremos modelar y qué nueva instancia sería útil?',
    definition:
      'Tarea que produce muestras, reconstrucciones o datos condicionados a partir de una distribución aprendida. La plausibilidad estadística debe contrastarse con cobertura, consistencia física y utilidad posterior.',
    example:
      'Ejemplo astronómico: producir espectros sintéticos condicionados por temperatura y composición. Que una muestra parezca real no constituye por sí sola evidencia física.',
  },
] as const;

export type S01TaskId = (typeof s01TaskDefinitions)[number]['id'];

export const s01TaskAlgorithmBranches = [
  {
    id: 'regression',
    task: 'Regresión',
    output: 'valor continuo',
    examples: [
      { label: 'Lineales', detail: 'lineal · polinómica' },
      { label: 'Árboles', detail: 'árbol · random forest' },
      { label: 'Vecinos', detail: 'k-nearest neighbors' },
    ],
  },
  {
    id: 'classification',
    task: 'Clasificación',
    output: 'clase / probabilidad',
    examples: [
      { label: 'Lineales', detail: 'logística · SVM' },
      { label: 'Árboles', detail: 'árbol · random forest' },
      { label: 'Vecinos', detail: 'k-nearest neighbors' },
    ],
  },
  {
    id: 'clustering',
    task: 'Clustering',
    output: 'grupos',
    examples: [
      { label: 'Centroides', detail: 'k-means' },
      { label: 'Jerárquicos', detail: 'aglomerativo' },
      { label: 'Densidad', detail: 'DBSCAN' },
    ],
  },
  {
    id: 'anomaly',
    task: 'Anomalía',
    output: 'rareza',
    examples: [
      { label: 'Aislamiento', detail: 'isolation forest' },
      { label: 'Frontera', detail: 'one-class SVM' },
      { label: 'Distancia', detail: 'referencia robusta' },
    ],
  },
  {
    id: 'decision',
    task: 'Decisión',
    output: 'acción',
    examples: [
      { label: 'Política', detail: 'regla de utilidad' },
      { label: 'Bandit', detail: 'contextual bandit' },
      { label: 'Refuerzo', detail: 'valor · política' },
    ],
  },
  {
    id: 'generation',
    task: 'Generación',
    output: 'muestra',
    examples: [
      { label: 'Probabilísticos', detail: 'distribución explícita' },
      { label: 'Latentes', detail: 'VAE' },
      { label: 'Adversariales', detail: 'GAN' },
    ],
  },
] as const satisfies ReadonlyArray<{
  id: S01TaskId;
  task: string;
  output: string;
  examples: ReadonlyArray<{ label: string; detail: string }>;
}>;

export type S01FamilyBiasId = 'closed' | 'open' | 'complexity';

export const s01InstanceTerms = [
  {
    id: 'instance',
    label: 'Instancia',
    notation: 'i',
    question: '¿Qué cuenta como un caso individual en este problema?',
    definition:
      'Unidad de análisis sobre la que se define una representación y, cuando corresponde, un objetivo o una salida. Debe ser reconocible antes de elegir el modelo.',
    example:
      'Puede ser una fuente, una visita, un espectro, una imagen, una curva de luz o un segmento temporal.',
  },
  {
    id: 'observation',
    label: 'Observación',
    notation: '\\text{dato medido}',
    question: '¿Qué registro medido tenemos de esa instancia?',
    definition:
      'Registro producido por un instrumento o procedimiento de medición. Incluye selección, resolución, ruido y faltantes; no es idéntico al fenómeno astronómico.',
    example: 'Para una misma fuente pueden existir varios espectros tomados en visitas diferentes.',
  },
  {
    id: 'representation',
    label: 'Representación',
    notation: 'x_i',
    question: '¿Qué información de la observación entregaremos al método?',
    definition:
      'Variables o estructuras que describen una instancia y que el método recibe como entrada. Su elección conserva, transforma o descarta información.',
    example:
      'Un espectro puede representarse por el flujo en cada longitud de onda o por rasgos derivados disponibles antes de producir la salida.',
  },
  {
    id: 'target',
    label: 'Objetivo',
    notation: 'y_i',
    question: '¿Existe una respuesta conocida para cada instancia de entrenamiento?',
    definition:
      'Valor o etiqueta disponible para una instancia y usado como señal en aprendizaje supervisado o semisupervisado. Proviene de una medición o un etiquetado; no es automáticamente la verdad y puede contener incertidumbre y sesgos.',
    example:
      'En espectros sintéticos, la abundancia usada para generarlos puede funcionar como objetivo de entrenamiento.',
  },
  {
    id: 'signal',
    label: 'Señal de aprendizaje',
    notation: 'y_i,\\ \varnothing,\\ r_t',
    question: '¿Qué información permite ajustar o evaluar el comportamiento?',
    definition:
      'Información disponible para construir o actualizar el criterio de aprendizaje. Puede ser un objetivo por instancia, la estructura derivada de datos sin objetivo etiquetado o las consecuencias y recompensas de una acción.',
    example:
      'La señal separa la ruta supervisada, la no supervisada y la de refuerzo antes de elegir una familia de modelo.',
  },
  {
    id: 'model',
    label: 'Modelo',
    notation: 'h_\\theta',
    question: '¿Qué relación ajustada transforma la representación?',
    definition:
      'Función, regla o representación ajustada que transforma una entrada en una salida. Puede incluir parámetros θ y otros supuestos; sus elementos se ajustan con la señal disponible.',
    example:
      'Distintas familias pueden producir una salida desde el mismo x; la tarea todavía no decide la familia.',
  },
  {
    id: 'output',
    label: 'Salida',
    notation: '\\hat y,\\ z_i,\\ a_t',
    question: '¿Qué produce el sistema para una instancia o estado?',
    definition:
      'Resultado del modelo cuyo significado depende de la tarea y del uso. Puede ser una estimación, clase, grupo, rareza, acción o muestra; no equivale automáticamente a verdad física.',
    example:
      'La ruta activa produce una abundancia estimada, una asignación de grupo o una acción de seguimiento.',
  },
] as const;

export type S01InstanceTermId = (typeof s01InstanceTerms)[number]['id'];

export const s01Lenses = [
  {
    id: 'statistics',
    label: 'Estadística',
    title: 'Datos, variabilidad y evidencia',
    notation: 'datos · variabilidad · incertidumbre',
    question: '¿Qué podemos aprender de los datos y con qué incertidumbre?',
    text: 'Disciplina que desarrolla métodos para recoger, describir y analizar datos; modelar su variabilidad y sus relaciones; cuantificar incertidumbre; y evaluar evidencia bajo supuestos explícitos.',
  },
  {
    id: 'ml',
    label: 'ML',
    title: 'Experiencia, tarea y desempeño',
    notation: 'E · T · P',
    question: '¿Qué experiencia puede mejorar el desempeño en una tarea medible?',
    text: 'Un programa aprende cuando, respecto a una clase de tareas T y una medida de desempeño P, mejora su desempeño gracias a una experiencia E. Esa experiencia puede ser ejemplos, datos no etiquetados o interacción, y la mejora debe comprobarse con una evaluación.',
  },
  {
    id: 'ai',
    label: 'IA',
    title: 'Sistema, entorno y objetivo',
    notation: 'sistema · entorno · objetivo',
    question: '¿Qué salida produce un sistema para un objetivo y en qué entorno se usa?',
    text: 'En esta sesión usamos IA para nombrar el campo y los sistemas que, ante objetivos definidos por personas, generan predicciones, recomendaciones o decisiones que influyen en un entorno real o virtual. Pueden combinar representación, razonamiento, búsqueda, aprendizaje y generación; no todos aprenden de datos.',
  },
] as const;

export type S01LearningMode = 'rules' | 'learning';
export type S01DisplayMode = 'presentation' | 'reading' | 'activities';
export type S01DomainView = 'synthetic' | 'observed';
export type S01Capacity = 'underfit' | 'balanced' | 'overfit';
export type S01ClaimId = 'predictive' | 'physical' | 'universal';

export type S01Assignments = Partial<Record<S01RepairItemId, S01SemanticLevel>>;

export interface S01JourneyState {
  stopId: S01StopId;
  view: 'focus' | 'overview';
  displayMode: S01DisplayMode;
  scenarioId: S01ScenarioId;
  lensId: S01LensId;
  signalGuess: S01Paradigm | null;
  assignments: S01Assignments;
  learningMode: S01LearningMode;
  domainView: S01DomainView;
  compatibleGuess: number | null;
  familyBiasGuess: S01FamilyBiasId | null;
  capacity: S01Capacity;
  claimId: S01ClaimId | null;
}

export const initialS01JourneyState: S01JourneyState = {
  stopId: 'question',
  view: 'focus',
  displayMode: 'presentation',
  scenarioId: 'spectrum',
  lensId: 'ml',
  signalGuess: null,
  assignments: {},
  learningMode: 'learning',
  domainView: 'synthetic',
  compatibleGuess: null,
  familyBiasGuess: null,
  capacity: 'balanced',
  claimId: null,
};

export type S01JourneyAction =
  | { type: 'set-stop'; stopId: S01StopId }
  | { type: 'move-stop'; delta: -1 | 1 }
  | { type: 'set-view'; view: 'focus' | 'overview' }
  | { type: 'set-display-mode'; displayMode: S01DisplayMode }
  | { type: 'toggle-overview' }
  | { type: 'set-scenario'; scenarioId: S01ScenarioId }
  | { type: 'set-lens'; lensId: S01LensId }
  | { type: 'guess-signal'; paradigm: S01Paradigm }
  | { type: 'assign-term'; itemId: S01RepairItemId; level: S01SemanticLevel }
  | { type: 'set-learning-mode'; mode: S01LearningMode }
  | { type: 'set-domain-view'; view: S01DomainView }
  | { type: 'guess-compatible'; value: number }
  | { type: 'set-family-bias'; bias: S01FamilyBiasId }
  | { type: 'set-capacity'; capacity: S01Capacity }
  | { type: 'set-claim'; claimId: S01ClaimId }
  | { type: 'reset' };

export function getS01Stop(id: S01StopId): S01Stop {
  return s01Stops.find((stop) => stop.id === id) ?? s01Stops[0];
}

export function getS01StopIndex(id: S01StopId): number {
  const index = s01Stops.findIndex((stop) => stop.id === id);
  return index < 0 ? 0 : index;
}

export function moveS01Stop(id: S01StopId, delta: -1 | 1): S01StopId {
  const index = getS01StopIndex(id);
  const nextIndex = Math.min(Math.max(index + delta, 0), s01Stops.length - 1);
  return s01Stops[nextIndex]?.id ?? s01Stops[0].id;
}

export function getS01Scenario(id: S01ScenarioId): S01Scenario {
  return s01Scenarios.find((scenario) => scenario.id === id) ?? s01Scenarios[0]!;
}

export function getS01StopFromHash(hash: string): S01StopId | null {
  const slug = decodeURIComponent(hash.replace(/^#/, '')).trim().toLowerCase();
  return s01Stops.find((stop) => stop.hash === slug)?.id ?? null;
}

export function getRepairScore(assignments: S01Assignments): number {
  return s01RepairItems.filter((item) => assignments[item.id] === item.expected).length;
}

export function countCompatibleRules(unseenCombinations: number, classes: number): number {
  return classes ** unseenCombinations;
}

export function s01JourneyReducer(
  state: S01JourneyState,
  action: S01JourneyAction,
): S01JourneyState {
  switch (action.type) {
    case 'set-stop':
      return { ...state, stopId: action.stopId, view: 'focus' };
    case 'move-stop':
      return { ...state, stopId: moveS01Stop(state.stopId, action.delta), view: 'focus' };
    case 'set-view':
      return { ...state, view: action.view };
    case 'set-display-mode':
      return {
        ...state,
        displayMode: action.displayMode,
        view: action.displayMode === 'presentation' ? state.view : 'focus',
      };
    case 'toggle-overview':
      return { ...state, view: state.view === 'overview' ? 'focus' : 'overview' };
    case 'set-scenario':
      return {
        ...state,
        scenarioId: action.scenarioId,
        signalGuess: null,
        familyBiasGuess: null,
        claimId: null,
      };
    case 'set-lens':
      return { ...state, lensId: action.lensId };
    case 'guess-signal':
      return { ...state, signalGuess: action.paradigm };
    case 'assign-term':
      return {
        ...state,
        assignments: { ...state.assignments, [action.itemId]: action.level },
      };
    case 'set-learning-mode':
      return { ...state, learningMode: action.mode };
    case 'set-domain-view':
      return { ...state, domainView: action.view };
    case 'guess-compatible':
      return { ...state, compatibleGuess: action.value };
    case 'set-family-bias':
      return { ...state, familyBiasGuess: action.bias };
    case 'set-capacity':
      return { ...state, capacity: action.capacity };
    case 'set-claim':
      return { ...state, claimId: action.claimId };
    case 'reset':
      return { ...initialS01JourneyState, displayMode: state.displayMode };
  }
}
