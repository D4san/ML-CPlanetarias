import type { ReadingBook } from './reading-book';

const observing = {
  label: 'NASA · métodos de detección y caracterización',
  href: 'https://science.nasa.gov/exoplanets/how-we-find-and-characterize/',
};
const products = {
  label: 'Archivo NASA · productos Kepler',
  href: 'https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html',
};

export const s00Book: ReadingBook = {
  session: 'S00',
  title: 'De los mundos a los datos',
  introduction:
    '¿Cómo llega una pregunta sobre un planeta a convertirse en un problema que puede aprender una máquina? Seguiremos una señal de tránsito desde la observación hasta la conclusión. Cada capítulo desarrolla una decisión de esa cadena y permite detenerse a explorarla.',
  prerequisites:
    'Puedes empezar sin programar. Basta con distinguir una medición de una interpretación; iremos construyendo el vocabulario y las comparaciones numéricas necesarias.',
  chapters: [
    {
      id: 's00-pregunta',
      title: 'Conocer un mundo a través de su señal',
      lead: 'Una pregunta se vuelve investigable cuando podemos decir qué observaríamos si nuestra explicación fuera adecuada.',
      paragraphs: [
        'Imagina que el brillo de una estrella disminuye y luego se recupera. Lo que registra el instrumento es luz recibida a lo largo del tiempo. Un planeta que pasa frente a su estrella puede producir esa forma, pero también intervienen la actividad estelar, otras configuraciones astronómicas y los efectos del instrumento. Entre la curva y la afirmación «hay un planeta» hay un trabajo de comparación de explicaciones.',
        'Conviene separar tres objetos: el sistema físico que queremos conocer, la medición que conseguimos y la inferencia que construimos. El sistema puede existir aunque nunca lo observemos; la medición registra una parte de su comportamiento; la inferencia necesita supuestos sobre cómo ese comportamiento produce los datos. ML puede participar en esa inferencia, por ejemplo ordenando señales para revisarlas, y hereda las limitaciones de la información que recibe.',
        'Durante la lectura mantendremos una pregunta acotada: ¿qué señales merecen seguimiento como candidatas a tránsito? Esta pregunta permite decidir una salida útil sin atribuir al clasificador la responsabilidad completa de confirmar un planeta. Al cambiar el uso de la salida, también tendremos que cambiar la evidencia exigida.',
      ],
      example: {
        title: 'De una curiosidad a una decisión',
        introduction: 'Ejemplo didáctico de formulación; no corresponde a una observación nueva.',
        steps: [
          'Curiosidad: queremos encontrar sistemas planetarios en una colección de curvas de luz.',
          'Objeto que revisaremos: una señal candidata extraída de una curva, con su contexto estelar.',
          'Salida útil: una puntuación para ordenar las candidatas que recibirán revisión adicional.',
          'Comprobación: revisar qué candidatas recuperamos y cuántos falsos positivos ocupan el tiempo de seguimiento.',
        ],
        conclusion:
          'La puntuación orienta una acción. La confirmación exige comprobaciones adicionales sobre el origen de la señal.',
      },
      question: 'Si la puntuación de una candidata aumenta, ¿qué podemos afirmar de inmediato?',
      answer:
        'Podemos afirmar que el procedimiento la sitúa más arriba según la regla aprendida. Para interpretar ese aumento como probabilidad o evidencia de un planeta debemos comprobar la calibración, la población de uso y las explicaciones alternativas.',
      bridge:
        'Para elegir las comprobaciones, primero situemos qué clase de pregunta planetaria estamos haciendo.',
      sources: [observing],
    },
    {
      id: 's00-ciencias-planetarias',
      title: 'Una pregunta dentro de un sistema planetario',
      lead: 'Origen, estructura, evolución y habitabilidad conectan escalas y observables distintos.',
      paragraphs: [
        'Un planeta forma parte de un sistema: recibe radiación de una estrella, interactúa gravitacionalmente con otros cuerpos y conserva una historia de formación y evolución. Por eso una misma propiedad puede intervenir en preguntas diferentes. Un radio ayuda a describir una población; combinado con una masa, informa sobre la densidad media; dentro de un modelo de evolución, puede contrastar hipótesis sobre la historia del objeto.',
        'El verbo científico determina el alcance del análisis. Describir cómo se distribuyen los radios pide una muestra y una selección bien caracterizadas. Comparar explicaciones de su distribución exige además modelos y supuestos. Estudiar condiciones relevantes para habitabilidad reúne información del planeta, la estrella y el entorno. Cada transición requiere evidencia adicional: una propiedad aislada deja abiertas varias interpretaciones.',
        'En nuestro caso de tránsito, una selección automática de candidatas puede aumentar la colección que luego estudiaremos. La pregunta poblacional aparece después: ¿esa selección conserva por igual señales profundas y débiles, periodos cortos y largos, estrellas tranquilas y variables? La herramienta altera qué objetos llegan al análisis y, por tanto, debe formar parte de su explicación.',
      ],
      example: {
        title: 'El mismo catálogo, dos investigaciones',
        introduction: 'Contraste didáctico entre dos usos de una colección de planetas.',
        steps: [
          'Pregunta descriptiva: comparar los radios de los objetos incluidos en el catálogo.',
          'Pregunta poblacional: estimar cómo se distribuyen los radios en la población de interés.',
          'Para la segunda pregunta, identificar qué objetos era más probable detectar y cuáles quedaron fuera.',
        ],
        conclusion:
          'El catálogo describe objetos seleccionados. Extender el resultado a una población requiere estudiar esa selección.',
      },
      question:
        '¿Qué falta si un gráfico de planetas detectados se usa para describir todos los planetas?',
      answer:
        'Falta explicar la población objetivo y el proceso de detección y selección. La ausencia de objetos en una región del gráfico puede relacionarse con la sensibilidad del procedimiento, además de con la población física.',
      bridge:
        'La selección comienza en la observación: veamos qué registra el instrumento y qué objeto cuenta como un caso.',
      sources: [
        {
          label: 'National Academies · Origins, Worlds, and Life',
          href: 'https://nap.nationalacademies.org/resource/26522/interactive/',
        },
      ],
    },
    {
      id: 's00-medicion',
      title: 'Medir, representar y conservar la señal',
      lead: 'El instrumento registra una magnitud; nuestra representación decide qué parte de esa medición llegará al método.',
      paragraphs: [
        'Una curva de luz relaciona tiempo y flujo; un espectro relaciona longitud de onda y una magnitud radiativa; una imagen organiza medidas en posiciones del detector. Estas formas contienen relaciones físicas diferentes. Antes de convertirlas en números de entrada debemos decir qué representa cada eje, qué unidades usamos y qué incertidumbres acompañan a cada medida.',
        'La unidad de análisis responde a otra pregunta: ¿sobre qué caso emitiremos una salida? Una estrella observada en varias visitas puede generar muchos segmentos. Si una salida corresponde a una señal candidata, los segmentos son representaciones o vistas de esa señal, y comparten información. Contarlos como objetos independientes cambia tanto el tamaño aparente de la muestra como la evaluación.',
        'Representar también transforma. Normalizar una curva facilita comparar formas relativas, aunque puede retirar información de escala. Recortar alrededor de un evento concentra la atención, pero pierde parte del contexto temporal. Cada transformación necesita una justificación relacionada con la tarea. Una figura permite ver la forma; la explicación escrita debe dejar claro qué se conservó y qué se perdió.',
      ],
      example: {
        title: 'Leer una caída de brillo',
        introduction: 'Cálculo didáctico con flujo relativo, sin ruido ni efectos estelares.',
        steps: [
          'Fuera del evento, el flujo normalizado es 1; durante el mínimo, es 0,99.',
          'La disminución relativa es 1 − 0,99 = 0,01, equivalente al 1 %.',
          'Ese número resume la profundidad; la duración, la repetición y la forma del evento requieren información adicional de la curva.',
        ],
        conclusion:
          'La profundidad es una característica de la señal. Su interpretación física depende de un modelo del sistema y de posibles contaminaciones.',
      },
      question: '¿Dos segmentos de la misma estrella equivalen a dos estrellas independientes?',
      answer:
        'Son dos entradas posibles para el método, pero comparten el sistema de origen y parte de sus propiedades. Esa relación debe conservarse al diseñar la partición y al describir qué constituye un caso nuevo.',
      bridge:
        'Una medición representada todavía necesita procedencia, selección y un lugar dentro del conjunto de datos.',
      sources: [observing, products],
    },
    {
      id: 's00-datos',
      title: 'Construir un conjunto de datos es tomar decisiones',
      lead: 'Observaciones, catálogos, simulaciones y datos de entrenamiento cumplen funciones diferentes en la investigación.',
      paragraphs: [
        'Una observación conserva una relación directa con un proceso de medición. Un catálogo reúne parámetros y decisiones derivados de análisis anteriores. Una simulación produce datos bajo un modelo elegido. Un conjunto de entrenamiento es una selección organizada para ajustar un método y puede combinar esos orígenes. Saber que todos son archivos numéricos dice poco sobre lo que permiten inferir.',
        'En el ejemplo de tránsito, una simulación puede generar una señal cuyo periodo y profundidad conocemos. Inyectarla en una curva permite estudiar si un procedimiento la recupera bajo ciertas condiciones. Esa etiqueta es exacta respecto a lo que inyectamos; la semejanza con señales reales depende de los supuestos y del entorno donde hicimos la inyección.',
        'La preparación deja huellas que debemos documentar: filas excluidas, valores faltantes, normalización y etiquetas. Los parámetros de transformaciones aprendidas de los datos se estiman con entrenamiento; usar toda la colección antes de separar puede introducir información del conjunto que luego llamaremos prueba. La procedencia acompaña al número durante todo el flujo.',
      ],
      example: {
        title: 'Una colección grande puede contener pocos sistemas',
        introduction: 'Conteo inventado para distinguir cantidad de filas y diversidad de origen.',
        steps: [
          'Diez estrellas aportan diez segmentos cada una: obtenemos 10 × 10 = 100 filas.',
          'Separar filas al azar puede colocar segmentos de una misma estrella en ambos conjuntos.',
          'Si queremos estudiar transferencia a estrellas nuevas, reservamos estrellas completas y mantenemos juntos sus segmentos.',
        ],
        conclusion:
          'Cien filas y diez sistemas describen aspectos distintos de la muestra. La pregunta de generalización decide cómo separarlos.',
      },
      question:
        '¿Por qué conocer la etiqueta de una simulación no garantiza éxito en observaciones?',
      answer:
        'Porque conocemos la respuesta dentro del proceso simulado. El ruido, las poblaciones y los efectos instrumentales de las observaciones pueden diferir. Debemos comprobar esas diferencias y evaluar en datos pertinentes al uso.',
      bridge: 'Con los datos y su origen claros podemos precisar qué salida queremos aprender.',
      sources: [products],
    },
    {
      id: 's00-ml',
      title: 'Cinco verbos, cinco formas de salida',
      lead: 'Detectar, clasificar, estimar, describir y priorizar hacen explícita la función del método.',
      paragraphs: [
        'Clasificar produce una categoría según una definición de etiquetas; estimar devuelve un valor o parámetros; describir busca estructura útil en una colección; priorizar ordena casos para una acción posterior. Detectar puede reunir varias de estas operaciones dentro de un procedimiento de búsqueda. El verbo necesita un objeto concreto y un criterio de éxito.',
        'Tomemos la misma curva de luz. Podemos clasificar una señal como semejante o no a los ejemplos etiquetados, estimar su periodo o asignarle una prioridad de revisión. Cambian el objetivo, la pérdida que guía el ajuste y la forma de evaluar. Elegir primero una arquitectura dejaría esas decisiones fundamentales sin resolver.',
        'La evaluación debe reflejar las consecuencias del uso. Para una lista de seguimiento con tiempo limitado interesa qué recuperamos entre los primeros casos y cuánto trabajo producen los falsos positivos. Para una estimación numérica interesa la magnitud del error y su comportamiento según las condiciones de observación. La exactitud global puede ocultar precisamente los casos que motivaron la búsqueda.',
      ],
      example: {
        title: 'Una exactitud que oculta las señales',
        introduction: 'Ejemplo didáctico: 100 casos etiquetados, de los cuales 5 son positivos.',
        steps: [
          'Una regla que responde «negativo» para todos acierta los 95 casos negativos.',
          'Su exactitud es 95/100 = 95 %.',
          'Recupera 0 de los 5 positivos: su sensibilidad es 0/5 = 0 %.',
        ],
        conclusion:
          'Una cifra alta puede acompañar una búsqueda inútil. La línea base y la métrica deben expresar qué queremos recuperar.',
      },
      question:
        '¿Qué añadirías a la exactitud para valorar una búsqueda de señales poco frecuentes?',
      answer:
        'Examinaría los positivos recuperados y los falsos positivos, con métricas como sensibilidad y precisión para un umbral definido. También comprobaría el coste de revisar los casos seleccionados y la incertidumbre de esas estimaciones.',
      bridge:
        'Una tarea bien definida permite valorar qué aporta la automatización a una investigación concreta.',
      sources: [
        {
          label: 'McCauliff et al. · clasificación de candidatos Kepler',
          href: 'https://doi.org/10.1088/0004-637X/806/1/6',
        },
      ],
    },
    {
      id: 's00-impacto',
      title: 'Valorar el aporte científico de una automatización',
      lead: 'Escala, rapidez y homogeneidad adquieren valor cuando sabemos qué procedimiento se comparó y qué evidencia produjo.',
      paragraphs: [
        'Una colección extensa puede superar la capacidad de inspección manual. Un método aprendido ayuda a ordenar casos o repetir una decisión de forma homogénea. Un aproximador de simulaciones puede acelerar una etapa costosa. Para valorar cualquiera de estas contribuciones necesitamos conocer la referencia de comparación y qué trabajo sigue siendo necesario después de la salida.',
        'Una aceleración se refiere a una operación y a unas condiciones de cómputo. Un número de candidatos se refiere a una selección. Una validación incorpora criterios adicionales y supuestos de su propio procedimiento. Leer un resultado científico exige conservar esas unidades de afirmación. Al adaptar una técnica a otro instrumento, el resultado original orienta una hipótesis que debe volver a ponerse a prueba.',
        'La galería permite contrastar aplicaciones reales que la sesión ya documenta. Recorre cada caso preguntando qué entró, qué produjo el modelo, con qué se comparó y hasta dónde llega la conclusión. Así una cifra sirve para reconstruir el método y para diseñar la siguiente comprobación.',
      ],
      example: {
        title: 'Leer una afirmación de rapidez',
        introduction:
          'Situación hipotética para practicar una lectura crítica; no es una cifra tomada de un paper.',
        steps: [
          'Supón que un aproximador tarda menos que la simulación usada como referencia.',
          'Pregunta si se comparó el mismo tipo de salida, hardware y rango de parámetros.',
          'Separa el coste de preparar y entrenar el aproximador del coste de aplicarlo.',
          'Comprueba el error de aproximación antes de usar esa rapidez en una decisión científica.',
        ],
        conclusion:
          'La utilidad combina coste, fidelidad y dominio. La rapidez aislada deja incompleta la comparación.',
      },
      question: '¿Qué habría que comprobar al trasladar un modelo a una misión diferente?',
      answer:
        'La representación, resolución, ruido, población y selección de la nueva misión, además del procedimiento de evaluación. La semejanza del problema científico ayuda a plantear la transferencia, pero su desempeño requiere evidencia en el nuevo dominio.',
      bridge: 'Reunamos estas decisiones en una cadena que podamos aplicar a una pregunta propia.',
      sources: [
        {
          label: 'Tamayo et al. · aproximación de estabilidad orbital',
          href: 'https://arxiv.org/abs/1610.05359',
        },
      ],
    },
    {
      id: 's00-ramas',
      title: 'Cerrar la cadena y empezar una investigación',
      lead: 'La pregunta astronómica, la formulación de ML y la implementación reproducible deben seguir hablando del mismo problema.',
      paragraphs: [
        'La astronomía define qué queremos conocer y qué mediciones podrían informarlo. La formulación de ML precisa la unidad, la representación, la señal de aprendizaje, la salida y la evaluación. La aplicación lleva esas decisiones a un procedimiento que otra persona pueda inspeccionar y repetir. Cada rama impone preguntas a las otras: una métrica obliga a revisar el uso; una limitación instrumental obliga a revisar la representación.',
        'Podemos comprobar la coherencia leyendo la cadena hacia atrás. Desde una conclusión, identifica qué métrica la respalda, qué casos se reservaron, qué aprendió el modelo, qué representación recibió y qué fenómeno motivó la medición. Si un eslabón cambia de objeto sin explicación, el procedimiento necesita una revisión aunque el código termine sin errores.',
        'El resultado de esta introducción es un diseño de investigación acotado. Todavía faltan el aprendizaje formal, la selección de modelos y las comprobaciones de una ejecución. Escribir lo que falta permite avanzar con una tarea concreta en lugar de presentar el diseño como un resultado.',
      ],
      example: {
        title: 'Una conclusión que conserva sus condiciones',
        introduction: 'Redacción didáctica sin resultados numéricos inventados.',
        steps: [
          'Pregunta: priorizar señales candidatas para revisión.',
          'Entrada: segmentos de curvas, con unidades de origen identificadas.',
          'Evaluación prevista: comparar recuperación y falsos positivos frente a una regla simple, reservando los sistemas pertinentes.',
          'Conclusión que habrá que respaldar: el procedimiento mejora esa selección bajo las condiciones evaluadas.',
        ],
        conclusion:
          'El diseño permite decidir qué ejecutar y qué evidencia guardar. La afirmación de mejora espera a la evaluación.',
      },
      question:
        '¿Qué eslabón revisarías si el modelo acierta y su salida resulta inútil para el seguimiento?',
      answer:
        'Volvería al uso y a la métrica. Puede que la salida responda otra pregunta, que el umbral produzca demasiados casos o que el coste del error no esté reflejado en la evaluación. Después revisaría la representación y el ajuste si esas decisiones lo exigen.',
      bridge:
        'En S01 desarrollaremos cómo distinguir señal, tarea y familia de modelo. Puedes usar ahora el taller para formular tu propia cadena.',
      sources: [observing, products],
    },
  ],
};
