import type { ReadingBook } from './reading-book';

const trees = {
  label: 'scikit-learn · árboles de decisión, §1.10',
  href: 'https://scikit-learn.org/stable/modules/tree.html',
};
const forests = {
  label: 'scikit-learn · bosques y ensambles',
  href: 'https://scikit-learn.org/stable/modules/ensemble.html#forest',
};
const columns = {
  label: 'Archivo NASA · definición de columnas PS/PSCompPars',
  href: 'https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html',
};

/** Grupos contiguos de unidades: misma secuencia conceptual, exposición propia. */
export const s02ReadingUnits: Record<string, readonly string[]> = {
  'planet-classification': ['planet-classification', 'rules', 'information-gain'],
  'tree-code': ['tree-code', 'regression', 'regression-error', 'overfit'],
  bootstrap: ['bootstrap', 'forest'],
  dataset: ['dataset', 'data-quality'],
  'colab-activity': ['colab-activity'],
  limits: ['limits'],
};

export const s02Book: ReadingBook = {
  session: 'S02',
  title: 'Aprender preguntas, combinar árboles, evaluar predicciones',
  introduction:
    'Un árbol divide los datos con preguntas sucesivas. Entender cómo escoge una pregunta permite entender sus aciertos, su fragilidad y la razón de combinar varios árboles. Después llevaremos esas ideas a una comparación del radio de exoplanetas con datos y resultados ya documentados.',
  prerequisites:
    'Necesitas distinguir entrada, objetivo y predicción, y saber por qué reservamos datos para evaluar. Trabajaremos proporciones, promedios y errores pequeños antes de usar los exploradores.',
  chapters: [
    {
      id: 'planet-classification',
      title: 'Cómo aprende un árbol qué pregunta hacer',
      lead: 'Cada corte transforma una mezcla de ejemplos en grupos. El algoritmo compara cuánto mejora esa separación.',
      paragraphs: [
        'Un nodo recibe los ejemplos que cumplen las condiciones anteriores. Propone preguntas del tipo «¿x es menor o igual que un umbral?» y envía cada respuesta a una rama. Una hoja resume los objetivos de los casos que llegan allí. Durante el ajuste se eligen las preguntas; al predecir, un ejemplo nuevo recorre las preguntas ya fijadas. Esa distinción separa aprender una regla de aplicarla.',
        'En clasificación, la impureza describe cómo se mezclan las clases dentro de un nodo. Para proporciones pₖ, Gini se calcula como 1 − Σpₖ². Vale cero si todos los casos pertenecen a una sola clase. La entropía H = −Σpₖ log₂(pₖ) ofrece otro criterio; una proporción cero contribuye cero. La comparación usa el tamaño de cada hijo para ponderar su impureza.',
        'La reducción es impureza del padre menos impureza ponderada de los hijos. Con entropía, esa reducción se llama ganancia de información. El algoritmo elige localmente entre los cortes candidatos permitidos; no explora todas las estructuras completas posibles. Un grupo más puro en entrenamiento deja pendiente comprobar la predicción en casos nuevos.',
      ],
      example: {
        title: 'Un corte imperfecto, calculado a mano',
        introduction:
          'Ocho casos didácticos, cuatro de clase A y cuatro de clase B. Este microejemplo es independiente de los datos del explorador.',
        steps: [
          'Padre: pA = pB = 4/8 = 0,5. Gini = 1 − 0,5² − 0,5² = 0,5.',
          'Un corte deja 3 A y 1 B a la izquierda, y 1 A y 3 B a la derecha.',
          'Cada hijo tiene Gini = 1 − (3/4)² − (1/4)² = 0,375.',
          'Impureza ponderada = (4/8) × 0,375 + (4/8) × 0,375 = 0,375.',
          'Reducción = 0,5 − 0,375 = 0,125. Se redujo la mezcla, aunque ninguna hoja es pura.',
        ],
        conclusion:
          'Los pesos evitan tratar igual un hijo pequeño y uno grande. Busca ahora esta misma relación entre conteos, pesos y reducción en el explorador.',
      },
      question: '¿Basta con encontrar un hijo puro para saber si el corte es bueno?',
      answer:
        'Debemos examinar ambos hijos y ponderarlos por sus tamaños. Un hijo puro muy pequeño puede dejar casi toda la mezcla en el otro. La reducción compara el resultado conjunto con el padre, dentro del entrenamiento.',
      bridge:
        'Permitir más preguntas mejora la flexibilidad. Veamos cómo cambia la salida y por qué necesitamos limitar esa complejidad.',
      sources: [trees],
    },
    {
      id: 'tree-code',
      title: 'De las hojas a los errores: complejidad y regresión',
      lead: 'El árbol aprende regiones; la tarea y el criterio determinan qué resumen produce cada hoja.',
      paragraphs: [
        'En regresión con error cuadrático, la hoja predice el promedio de los objetivos de entrenamiento que recibe. El modelo genera así valores constantes por regiones. Un nuevo caso obtiene el promedio de su hoja; no se calcula un promedio con el objetivo desconocido de ese caso. Otros criterios pueden cambiar el resumen: con error absoluto se usa la mediana.',
        'Para comparar cortes con error cuadrático calculamos residuos y − ŷ, los elevamos al cuadrado y sumamos: SSE = Σ(y − ŷ)². MSE = SSE/n expresa el promedio por caso. Al ponderar el MSE de cada hijo por su fracción de casos recuperamos el MSE conjunto. El ajuste busca reducirlo dentro del entrenamiento.',
        'max_depth limita la cantidad de niveles; min_samples_leaf impone un mínimo de casos por hoja. Un árbol profundo puede capturar variaciones particulares de una muestra y cambiar mucho ante pequeñas modificaciones. Fijar random_state ayuda a repetir un ajuste, mientras que estudiar estabilidad requiere comparar ajustes y evaluaciones pertinentes. La elección de complejidad se hace con validación; el conjunto final de prueba se reserva para valorar el procedimiento elegido.',
      ],
      example: {
        title: 'Por qué una hoja predice el promedio',
        introduction:
          'Tres objetivos didácticos: 2, 4 y 6 unidades. Una sola hoja contiene los tres.',
        steps: [
          'Promedio = (2 + 4 + 6)/3 = 4 unidades; residuos = −2, 0 y 2.',
          'SSE = 4 + 0 + 4 = 8 unidades²; MSE = 8/3 ≈ 2,67 unidades².',
          'Si un corte válido separa el caso 2 de los casos 4 y 6, las hojas predicen 2 y 5.',
          'Los residuos pasan a 0, −1 y 1: SSE = 2 y MSE = 2/3 ≈ 0,67 unidades².',
        ],
        conclusion:
          'El corte mejora el error de estos tres casos. Esa cuenta todavía no evalúa la generalización del árbol.',
      },
      question:
        'Si añadimos hojas y baja el error de entrenamiento, ¿qué decisión sigue pendiente?',
      answer:
        'Elegir si esa complejidad mejora el desempeño fuera del ajuste. Debemos comparar configuraciones mediante validación y examinar su estabilidad. Una semilla fija hace repetible un resultado, pero no demuestra que sea estable frente a otra muestra.',
      bridge:
        'La sensibilidad de un árbol motiva combinar varios. Para que la combinación ayude, sus errores deben aportar diversidad.',
      sources: [
        {
          label: 'scikit-learn · DecisionTreeRegressor, criterio y hojas',
          href: 'https://scikit-learn.org/stable/modules/generated/sklearn.tree.DecisionTreeRegressor.html',
        },
        {
          label: 'scikit-learn · validación y particiones',
          href: 'https://scikit-learn.org/stable/modules/cross_validation.html',
        },
      ],
    },
    {
      id: 'bootstrap',
      title: 'Por qué un bosque necesita árboles diferentes',
      lead: 'Combinar ayuda cuando los modelos aportan errores parcialmente distintos. Repetir la misma regla conserva sus errores.',
      paragraphs: [
        'Una remuestra bootstrap toma n extracciones con reemplazo de los n casos de entrenamiento. Un caso puede aparecer varias veces y otro puede quedar fuera. Cada árbol recibe una remuestra propia. Los casos ausentes son OOB para ese árbol; pueden participar en una evaluación fuera de bolsa bajo los supuestos de ese procedimiento.',
        'Random Forest añade otra fuente de diversidad: en cada nodo considera un subconjunto aleatorio de variables candidatas. Entre las variables disponibles busca el corte adecuado. La selección se repite por nodo, y los detalles dependen de la configuración. Variar muestras y variables puede disminuir la dependencia entre los errores de los árboles.',
        'En regresión se promedian las predicciones de los árboles. En el clasificador de scikit-learn se promedian sus probabilidades de clase y se elige la clase con mayor promedio. La votación de etiquetas sirve como esquema introductorio, pero puede discrepar de promediar probabilidades. El acuerdo del bosque tampoco constituye por sí mismo una incertidumbre física calibrada.',
      ],
      example: {
        title: 'Seguir la agregación de principio a fin',
        introduction:
          'Ejemplo didáctico con tres árboles de regresión; las cifras no son mediciones planetarias.',
        steps: [
          'Para el mismo caso x, los árboles predicen 2, 4 y 6 unidades.',
          'Predicción del bosque = (2 + 4 + 6)/3 = 4 unidades.',
          'Si los tres repiten un mismo error, el promedio conserva ese error.',
          'Tres probabilidades de clase A, 0,9; 0,4; 0,4, promedian 1,7/3 ≈ 0,567: se elige A aunque dos etiquetas individuales serían B.',
        ],
        conclusion:
          'La regla de agregación debe acompañar a la tarea. Más árboles no corrigen automáticamente un sesgo compartido en los datos.',
      },
      question: '¿Qué cabe esperar al entrenar muchos árboles idénticos y promediar sus salidas?',
      answer:
        'El promedio coincide con cada salida individual. El beneficio requiere diversidad útil, junto con árboles que aprendan relaciones pertinentes. Debe comprobarse mediante una evaluación compartida con el modelo de referencia.',
      bridge:
        'El mecanismo ya está definido. Antes de usarlo en exoplanetas debemos construir una pregunta y una muestra auditables.',
      sources: [
        forests,
        {
          label: 'scikit-learn · RandomForestClassifier, predict',
          href: 'https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html',
        },
      ],
    },
    {
      id: 'dataset',
      title: 'Convertir un catálogo en una pregunta evaluable',
      lead: '¿Añadir irradiación mejora la predicción del radio frente a usar solo la masa, en la muestra definida?',
      paragraphs: [
        'La actividad mantiene fijo el objetivo pl_rade, en radios terrestres, y compara predictores pl_bmasse y pl_bmasse junto con pl_insol. La primera columna es la mejor estimación de masa disponible según la definición del archivo; su procedencia requiere revisión. pl_insol expresa irradiación en unidades terrestres. Los identificadores pl_name y hostname permiten rastrear objetos y sistemas; no se usan como predictores.',
        'Los filtros delimitan el experimento: planetas en tránsito, confirmaciones sin bandera de controversia y valores centrales positivos y completos para las columnas utilizadas. Se excluyen radios calculados a partir de masa para evitar que el objetivo reutilice la información que queremos evaluar como predictor. La tabla compuesta reúne valores de fuentes distintas; conviene auditar referencias, límites e incertidumbres antes de tratar una fila como un conjunto homogéneo de mediciones.',
        'Para aislar el aporte predictivo de la irradiación, conservamos las mismas filas en las dos comparaciones. Si cada modelo usara una selección distinta de casos completos, una diferencia de métricas podría deberse a esa selección. El procedimiento enseña a comparar predictores bajo condiciones comunes; los valores centrales no propagan las incertidumbres de medida.',
      ],
      example: {
        title: 'Diseñar una comparación controlada',
        introduction:
          'Decisiones de diseño de la práctica existente; aquí no se realiza una consulta nueva.',
        steps: [
          'Seleccionar una muestra con objetivo y ambos predictores disponibles bajo los mismos filtros.',
          'Asignar una partición común para todos los modelos.',
          'Ajustar la referencia y los modelos únicamente con entrenamiento.',
          'Comparar masa frente a masa + irradiación sobre los mismos objetivos de prueba.',
        ],
        conclusion:
          'Una comparación común reduce ambigüedades sobre qué cambió entre modelos. La interpretación causal sigue requiriendo otro diseño.',
      },
      question: '¿Por qué retirar radios obtenidos a partir de una relación masa–radio?',
      answer:
        'Porque evaluar la predicción del radio a partir de masa contra un radio ya calculado desde masa puede medir la reproducción de esa relación de cálculo. La procedencia del objetivo determina qué evidencia aporta la evaluación.',
      bridge:
        'Fijada la muestra, definamos la referencia, la partición y las métricas antes de mirar los resultados.',
      sources: [
        columns,
        {
          label: 'Archivo NASA · tabla compuesta',
          href: 'https://exoplanetarchive.ipac.caltech.edu/docs/pscp_about.html',
        },
      ],
    },
    {
      id: 'colab-activity',
      title: 'Evaluar con una referencia y una partición común',
      lead: 'La evaluación responde a qué casos reservamos y qué errores decidimos medir.',
      paragraphs: [
        'La práctica documentada reserva al azar el 20 % de los planetas para prueba. Esto permite evaluar planetas no usados en el ajuste bajo esa partición. Como una estrella puede aportar varios planetas, la prueba puede compartir sistemas con entrenamiento. Para preguntar por sistemas nunca vistos necesitaríamos una partición por anfitriona y una nueva evaluación; no podemos atribuirle ese significado a las cifras guardadas.',
        'La referencia predice para todos los casos la mediana del radio en entrenamiento. Establece qué logra una regla que no utiliza los predictores. MAE promedia errores absolutos y conserva la unidad del radio. R² compara el error cuadrático con el de predecir el promedio de los objetivos de prueba; puede ser negativo. Ese promedio de prueba define la referencia de la fórmula de R², no la constante de la línea base que ajustamos con entrenamiento.',
        'Compara la referencia, un árbol y los dos bosques sobre los mismos índices. Después inspecciona radios observados frente a predichos y errores por regiones. La importancia MDI describe reducciones de impureza acumuladas durante el ajuste; puede verse afectada por correlaciones y propiedades de los predictores. Se interpreta junto con las métricas y el diseño de datos.',
      ],
      example: {
        title: 'Dos medidas del mismo error',
        introduction:
          'Microejemplo sintético: radios de referencia 1 y 3 R⊕; predicciones 2 y 2 R⊕.',
        steps: [
          'Errores absolutos: 1 y 1 R⊕. MAE = (1 + 1)/2 = 1 R⊕.',
          'Suma de errores cuadrados = 1² + 1² = 2 R⊕².',
          'Promedio de los objetivos de prueba = 2 R⊕; suma de cuadrados respecto a ese promedio = 2 R⊕².',
          'R² = 1 − 2/2 = 0. La predicción empata la referencia de promedio de prueba en error cuadrático.',
        ],
        conclusion:
          'MAE describe magnitud del error; R² describe una comparación relativa. Si el objetivo de prueba fuera constante, esta fórmula de R² tendría denominador cero y exigiría tratamiento explícito.',
      },
      question:
        '¿Podemos elegir hiperparámetros mirando repetidamente el mismo conjunto final de prueba?',
      answer:
        'Esa práctica adapta las decisiones a la prueba y debilita su independencia. Se eligen configuraciones mediante validación dentro del desarrollo y se reserva una evaluación final. Al ejecutar la actividad, registra qué decisiones estaban fijadas y cuáles se exploraron.',
      bridge:
        'Ya podemos leer la salida guardada sin confundir el experimento ejecutado con otros que aún faltan.',
      sources: [
        {
          label: 'scikit-learn · métricas de regresión',
          href: 'https://scikit-learn.org/stable/modules/model_evaluation.html#regression-metrics',
        },
        {
          label: 'scikit-learn · particiones agrupadas',
          href: 'https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation-iterators-for-grouped-data',
        },
      ],
    },
    {
      id: 'limits',
      title: 'Qué permiten afirmar los resultados guardados',
      lead: 'La mejora observada pertenece a una muestra, una configuración y una partición concretas.',
      paragraphs: [
        'La salida documentada del 29 de septiembre de 2026 contiene 1.529 planetas de 1.249 sistemas tras los filtros. La prueba aleatoria por planeta incluye 306 casos. Son resultados guardados del análisis del curso; abrir esta lectura no vuelve a consultar el archivo ni ajusta esos modelos.',
        'El bosque con masa obtuvo MAE de 1,673 R⊕ y R² de 0,814. Con masa e irradiación obtuvo MAE de 1,191 R⊕ y R² de 0,889. La comparación favorece incluir irradiación en ese corte y bajo esa configuración. Para describir variabilidad entre particiones necesitaríamos evaluaciones adicionales; una sola diferencia no proporciona esa distribución.',
        'El resultado conserva tres límites esenciales: la partición puede compartir anfitrionas, no se propagaron las incertidumbres de las mediciones y la comparación predictiva no identifica un efecto causal. El siguiente experimento puede reservar sistemas completos, explorar estabilidad y auditar los errores por regiones, manteniendo registro de cada cambio.',
      ],
      example: {
        title: 'Leer el tamaño de una mejora',
        introduction:
          'Operaciones sobre las métricas guardadas, redondeadas a tres decimales; no constituyen un ajuste nuevo.',
        steps: [
          'Cambio de MAE = 1,191 − 1,673 = −0,482 R⊕.',
          'Reducción relativa aproximada = 0,482/1,673 ≈ 0,288, es decir, 28,8 %.',
          'Cambio de R² = 0,889 − 0,814 = 0,075.',
        ],
        conclusion:
          'La reducción se refiere al error promedio de esos 306 planetas. La misma proporción no queda garantizada para cada planeta o para una población nueva.',
      },
      question: '¿Cómo escribirías el resultado sin atribuirle evidencia que no se evaluó?',
      answer:
        'En la muestra y partición aleatoria por planeta documentadas, añadir irradiación redujo el MAE del bosque de 1,673 a 1,191 R⊕. Quedan pendientes la evaluación en sistemas no vistos, la estabilidad entre particiones y el tratamiento de incertidumbres. La mejora es predictiva dentro de ese diseño.',
      bridge:
        'Usa las referencias para rastrear los métodos y los datos. El notebook permite revisar y reproducir las decisiones del experimento documentado.',
      sources: [
        columns,
        {
          label: 'scikit-learn · límites de importancia por impureza',
          href: 'https://scikit-learn.org/stable/auto_examples/inspection/plot_permutation_importance.html',
        },
      ],
    },
  ],
};
