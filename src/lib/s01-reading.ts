import type { ReadingBook } from './reading-book';

const geron = {
  label: 'Géron · cap. 1 (localización detallada pendiente)',
  href: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/',
};
const kelleher = {
  label: 'Kelleher et al. · fundamentos (localización detallada pendiente)',
  href: 'https://mitpress.mit.edu/9780262029445/fundamentals-of-machine-learning-for-predictive-data-analytics/',
};

export const s01Book: ReadingBook = {
  session: 'S01',
  title: 'De una pregunta astronómica a una afirmación con límites',
  introduction:
    'Antes de escoger un algoritmo, necesitamos un problema bien formulado. Este recorrido desarrolla siete decisiones conectadas. Usaremos como hilo una estimación a partir de espectros; las figuras permiten contrastarla con las otras rutas disponibles.',
  prerequisites:
    'Conviene distinguir medición, representación y conclusión, como hicimos en S00. No necesitas conocer una arquitectura de ML: construiremos primero el problema que una familia de modelos intentaría resolver.',
  chapters: [
    {
      id: 'question',
      title: 'La pregunta define para qué sirve una salida',
      lead: 'Una observación admite varios usos. Formular el problema exige elegir uno y decir cómo reconoceremos una respuesta útil.',
      paragraphs: [
        'Imagina una colección de espectros. Podríamos estimar parámetros, agrupar formas semejantes, localizar casos raros o decidir qué objeto observar después. Compartir datos de entrada no vuelve equivalentes esas preguntas. Cada una define una salida, una referencia de comparación y consecuencias distintas cuando el método se equivoca.',
        'Para concretar el recorrido, consideremos un ejemplo didáctico: estimar un parámetro atmosférico a partir de un espectro representado en una rejilla. La pregunta debe especificar qué parámetro, en qué población y para qué uso. Una estimación rápida para explorar una rejilla y una inferencia para sostener una afirmación física requieren comprobaciones diferentes, aunque ambas devuelvan números.',
        'Estadística aporta herramientas para describir variabilidad y evaluar evidencia. ML organiza relaciones ajustadas a partir de experiencia para una tarea y un desempeño definidos. Un sistema de IA puede integrar esas relaciones con decisiones y acciones. Estas perspectivas se conectan dentro del procedimiento; nombrarlas ayuda a identificar qué responsabilidad cubre cada parte.',
      ],
      example: {
        title: 'Escribir el contrato de una estimación',
        introduction:
          'Formulación ilustrativa; el capítulo no ejecuta una recuperación atmosférica.',
        steps: [
          'Unidad provisional: un espectro de un objeto bajo condiciones de observación definidas.',
          'Salida: un parámetro numérico, con unidad o transformación declarada.',
          'Uso: producir una primera estimación que oriente un análisis posterior.',
          'Éxito: mejorar una referencia simple en casos reservados y diagnosticar dónde falla.',
        ],
        conclusion:
          'Estas cuatro decisiones permiten juzgar una propuesta antes de discutir su arquitectura.',
      },
      question:
        'Si cambiamos «estimar un parámetro» por «encontrar espectros raros», ¿qué debemos revisar?',
      answer:
        'La salida pasa de un valor objetivo a una medida o selección de rareza. Debemos revisar la señal disponible, la tarea, la referencia de comparación y cómo validar la utilidad de los casos elegidos. La representación también puede necesitar cambios.',
      bridge:
        'Una pregunta precisa todavía necesita definir qué cuenta como un ejemplo y qué números recibe el método.',
      sources: [geron, kelleher],
    },
    {
      id: 'instance',
      title: 'Del objeto físico al ejemplo que aprende el método',
      lead: 'Instancia, observación y representación nombran tres decisiones que conviene mantener separadas.',
      paragraphs: [
        'La instancia es el caso al que asignaremos una salida: puede ser un objeto, una visita, una señal o un segmento, según la pregunta. La observación es lo que medimos de ese caso. La representación x es la forma numérica que construimos para el método. Una misma instancia puede tener varias observaciones y cada observación admitir varias representaciones.',
        'En un espectro, x puede ser un vector de flujos sobre una rejilla común, un conjunto de índices espectrales o una representación aprendida. La primera conserva información distribuida; los índices resumen regiones elegidas; una representación aprendida incorpora su propio proceso de ajuste. Debemos explicar qué información necesita la salida y qué transformaciones podrían eliminarla.',
        'Si disponemos de un objetivo conocido por caso, lo llamamos y. Una relación ajustada produce una salida ŷ al recibir x. El sombrero recuerda que es una predicción. Usar símbolos distintos evita atribuir al modelo acceso a y cuando se aplica a un caso nuevo. También obliga a separar las variables disponibles durante el uso de las que solo conocemos al preparar los ejemplos.',
      ],
      example: {
        title: 'Seguir un caso sin confundir sus objetos',
        introduction:
          'Ejemplo conceptual con un espectro simulado; la etiqueta procede de la simulación.',
        steps: [
          'Instancia: una configuración atmosférica de la rejilla de simulación.',
          'Observación simulada: un espectro generado bajo esa configuración.',
          'Representación x: los valores espectrales preparados para el método.',
          'Objetivo y: el parámetro usado al generar el caso; salida ŷ: su estimación aprendida.',
        ],
        conclusion:
          'Conocer y permite evaluar la estimación dentro de la simulación. El uso en observaciones exige comprobar el dominio.',
      },
      question:
        '¿Qué riesgo aparece si incluimos en x una columna calculada a partir del objetivo?',
      answer:
        'El método puede recibir indirectamente la respuesta que queremos predecir. Si esa columna no estará disponible de manera independiente en el uso real, la evaluación resulta optimista o responde otra pregunta. Hay que rastrear la procedencia de las variables.',
      bridge: 'Ahora podemos preguntar de dónde sale la información que guía el aprendizaje.',
      sources: [kelleher],
    },
    {
      id: 'signal',
      title: 'La señal disponible organiza el aprendizaje',
      lead: 'El paradigma depende de qué información guía el ajuste o la decisión del sistema.',
      paragraphs: [
        'En aprendizaje supervisado tenemos ejemplos con objetivos asociados. El ajuste compara la salida predicha con esos objetivos mediante una pérdida y busca una relación que reduzca esa discrepancia. Los objetivos pueden provenir de mediciones, anotaciones o simulaciones. Su existencia no garantiza su exactitud ni su pertinencia para el uso final.',
        'En aprendizaje no supervisado buscamos estructura sin disponer de ese objetivo por ejemplo para la tarea planteada. Un agrupamiento depende de la representación y de la noción de similitud; interpretar sus grupos requiere trabajo adicional. En aprendizaje por refuerzo aparecen estados, acciones y consecuencias valoradas mediante recompensa. Allí importa cómo una acción modifica lo que ocurre después.',
        'Conviene justificar el paradigma mostrando la señal. Una red neuronal puede intervenir en formulaciones diferentes; conocer su nombre deja pendiente qué guía el ajuste. Del mismo modo, un modelo que predice algo llamado «recompensa» a partir de etiquetas fijas puede ser un problema supervisado si no existe el ciclo de interacción y decisión que estamos estudiando.',
      ],
      example: {
        title: 'Tres preguntas para localizar la señal',
        introduction: 'Comparación didáctica de formulaciones, sin resultados de entrenamiento.',
        steps: [
          '¿Cada espectro tiene un parámetro objetivo para comparar la salida? Tenemos una formulación supervisada.',
          '¿Solo queremos organizar espectros por similitud sin ese objetivo? Consideramos una formulación no supervisada.',
          '¿Una política elige observaciones y recibe consecuencias que afectan la siguiente decisión? Podemos plantear aprendizaje por refuerzo, si el entorno y la recompensa están definidos.',
        ],
        conclusion: 'La señal y el procedimiento justifican el nombre del paradigma.',
      },
      question:
        '¿Podemos llamar «no supervisado» a un problema solo porque sus etiquetas sean imperfectas?',
      answer:
        'Si esas etiquetas se usan como objetivos para guiar el ajuste, la formulación sigue siendo supervisada. Su imperfección exige analizar ruido y sesgos de etiqueta, así como qué comportamiento aprende el modelo al seguirlas.',
      bridge:
        'La señal indica cómo aprendemos; la forma de la salida precisa qué tarea resolvemos.',
      sources: [geron],
    },
    {
      id: 'task',
      title: 'La salida distingue las tareas',
      lead: 'Un valor, una categoría, un grupo y una acción piden criterios de evaluación diferentes.',
      paragraphs: [
        'En regresión buscamos una salida numérica; en clasificación, una categoría o información sobre categorías definidas. El agrupamiento organiza casos según una representación y un criterio; la detección de anomalías identifica discrepancias respecto de una referencia. En una tarea de decisión interesa una acción y sus consecuencias; en generación, producir muestras bajo una distribución o condición planteada.',
        'El número de la salida por sí solo puede engañar. Codificar dos categorías como 0 y 1 no convierte la pregunta en estimar una magnitud continua. Un identificador numérico tampoco representa una distancia física. El significado de la salida debe acompañar a su formato computacional.',
        'La pérdida de entrenamiento y la métrica de evaluación pueden ser distintas y ambas deben declararse. Una pérdida ayuda a ajustar parámetros; una métrica resume un aspecto del desempeño en los casos evaluados. Elegimos la segunda pensando en el uso: cuánto error toleramos, qué tipos de equivocación cuestan más y qué subpoblaciones debemos revisar.',
      ],
      example: {
        title: 'Calcular e interpretar un error',
        introduction:
          'Ejemplo didáctico de regresión con unidades arbitrarias, sin interpretación física.',
        steps: [
          'Valores de referencia y: 2 y 4; predicciones ŷ: 3 y 3.',
          'Residuos y − ŷ: −1 y 1.',
          'Errores absolutos: 1 y 1; MAE = (1 + 1)/2 = 1 unidad.',
          'El promedio de los residuos es 0, aunque ambas predicciones tienen error.',
        ],
        conclusion:
          'La operación que resume los errores determina qué información conserva la métrica.',
      },
      question: '¿Qué pierde un resumen que informa únicamente el promedio de los residuos?',
      answer:
        'Los errores positivos y negativos pueden cancelarse. Ese promedio ayuda a diagnosticar sesgo, pero necesitamos medidas de magnitud como MAE y una inspección por regiones del dominio para describir la precisión.',
      bridge: 'Una vez fijada la tarea podemos comparar varias formas de producir la misma salida.',
      sources: [kelleher],
    },
    {
      id: 'family',
      title: 'Elegir una familia es elegir supuestos',
      lead: 'Una muestra finita admite relaciones distintas. La familia limita cuáles puede aprender el procedimiento.',
      paragraphs: [
        'Una regla escrita de antemano produce salidas según decisiones fijadas por quien la diseña. Un modelo aprendido ajusta parte de esa relación con datos. Ambos incorporan supuestos. En una familia lineal suponemos una forma de relación; en un árbol construimos regiones mediante preguntas; otras familias permiten relaciones diferentes y requieren otras condiciones de ajuste.',
        'Llamamos sesgo inductivo al conjunto de preferencias o restricciones que ayuda a elegir entre soluciones compatibles con los ejemplos. Esa elección es necesaria porque los datos de entrenamiento no especifican todas las entradas futuras. La complejidad puede ampliar las relaciones representables y, al mismo tiempo, permitir seguir particularidades de la muestra.',
        'Una línea base proporciona una comparación concreta: una regla física simple, una constante o un método convencional apropiado. Su función es preguntar si la complejidad añadida aporta utilidad bajo la misma evaluación. La elección final necesita además costes de ajuste y uso, estabilidad, diagnóstico e interpretación.',
      ],
      example: {
        title: 'Dos reglas compatibles, predicciones diferentes',
        introduction: 'Ejemplo matemático didáctico con dos observaciones: (0, 0) y (1, 1).',
        steps: [
          'La regla f(x) = x coincide con ambos puntos.',
          'La regla g(x) = x² también coincide con ambos puntos.',
          'En x = 0,5 predicen 0,5 y 0,25; fuera de los puntos vistos ya discrepan.',
        ],
        conclusion:
          'Ajustar los ejemplos observados deja pendiente justificar el comportamiento entre ellos y fuera de su rango.',
      },
      question: '¿Qué demuestra que una red más compleja ajuste mejor los datos de entrenamiento?',
      answer:
        'Demuestra una mejora del ajuste bajo esa pérdida y esos ejemplos. Para sostener utilidad predictiva debemos compararla con una línea base y otras familias en casos reservados, con un diseño de evaluación adecuado al uso.',
      bridge:
        'Incluso una familia razonable necesita datos que representen las condiciones donde se aplicará.',
      sources: [geron, kelleher],
    },
    {
      id: 'domain',
      title: 'El dominio conecta entrenamiento y uso',
      lead: 'Población, instrumento, ruido y selección delimitan la experiencia de la que aprende el método.',
      paragraphs: [
        'El dominio describe las condiciones en que aparecen los ejemplos. Dos espectros con las mismas columnas pueden corresponder a resoluciones, niveles de ruido o procesos de selección diferentes. Si esas diferencias alteran las relaciones relevantes, una evaluación en las condiciones de entrenamiento no basta para anticipar el comportamiento en las nuevas.',
        'En el caso simulado, conocemos los parámetros porque construimos la rejilla. Al aplicar el método a observaciones, pueden aparecer efectos ausentes del simulador y objetos fuera de sus rangos. Antes de añadir complejidad conviene formular hipótesis concretas: ¿cambió la medición, la representación, la población o la relación entre entrada y objetivo?',
        'La partición convierte una intención de generalización en una prueba. Si el uso será en sistemas nuevos, separamos sistemas; si buscamos transferencia temporal, respetamos la separación pertinente en el tiempo. Además, las transformaciones ajustables deben aprenderse dentro del entrenamiento. El conjunto de prueba conserva su función cuando permanece fuera de las decisiones de ajuste.',
      ],
      example: {
        title: 'Reservar el tipo correcto de caso nuevo',
        introduction:
          'Diseño didáctico; los grupos representan sistemas, no una muestra descargada.',
        steps: [
          'Cada sistema aporta varias observaciones que comparten propiedades.',
          'Una partición por observación puede colocar el mismo sistema a ambos lados.',
          'Reservar sistemas completos permite preguntar por sistemas ausentes del ajuste.',
          'Todavía debemos comparar si los sistemas reservados representan la población de uso.',
        ],
        conclusion: 'Cambiar la unidad de partición cambia la pregunta que responde la evaluación.',
      },
      question:
        '¿Un buen resultado en un conjunto sintético reservado prueba transferencia a un telescopio?',
      answer:
        'Respalda desempeño en el experimento sintético definido. Para valorar transferencia necesitamos comprobar las diferencias con el telescopio y evaluar observaciones o pruebas que representen esas condiciones, conservando sus límites.',
      bridge:
        'Con el dominio y la partición explícitos podemos escribir una conclusión que conserve sus condiciones.',
      sources: [kelleher],
    },
    {
      id: 'evidence',
      title: 'De una métrica a una afirmación defendible',
      lead: 'El resultado cobra significado al reunir referencia, casos evaluados, incertidumbre y uso previsto.',
      paragraphs: [
        'La evaluación compara predicciones con una referencia en casos que no se usaron para ajustar el modelo. Debe conservar la misma partición y métrica para los métodos comparados. Una mejora promedio puede esconder fallos en una región importante: conviene examinar errores según las variables y las condiciones relevantes para la pregunta.',
        'El desempeño predictivo describe una relación entre datos y salidas bajo un procedimiento. Interpretar esa relación físicamente requiere revisar mediciones, supuestos y explicaciones alternativas. Una variable puede resultar útil por selección o correlación, y una métrica alta puede convivir con dependencia de información ajena al fenómeno que queríamos estudiar.',
        'La comunicación final debe permitir reconstruir qué se comparó. Escribe qué casos, representación, partición y métrica respaldan la afirmación; después delimita su dominio y lo que aún falta comprobar. Si los resultados contradicen el uso previsto, la evaluación invita a revisar la pregunta, los datos o el método.',
      ],
      example: {
        title: 'Redactar una conclusión condicional',
        introduction: 'Plantilla argumental sin cifras ni resultados de una ejecución nueva.',
        steps: [
          'Identifica la muestra y qué constituye un caso reservado.',
          'Compara el error del modelo con la línea base en esos mismos casos.',
          'Describe dónde mejora y dónde falla, junto con la variabilidad que se haya evaluado.',
          'Limita la afirmación al dominio comprobado y propone la siguiente prueba de transferencia.',
        ],
        conclusion: 'Una conclusión sólida conserva el recorrido que la hizo posible.',
      },
      question: '¿Qué afirmación seguiría pendiente aunque el error reservado fuera muy pequeño?',
      answer:
        'Que el modelo identificó un mecanismo causal o que funcionará en cualquier instrumento o población. El error respalda una capacidad predictiva acotada por el diseño; esas otras afirmaciones requieren evidencia adicional.',
      bridge:
        'La sesión siguiente desarrolla una familia concreta: árboles que aprenden preguntas y bosques que combinan sus predicciones.',
      sources: [geron, kelleher],
    },
  ],
};
