import type { ReadingBook } from './reading-book';

const paper = 'https://doi.org/10.3847/1538-3881/aa9e09';
const nasa = 'https://science.nasa.gov/mission/kepler/';
const archive = 'https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html';

/** Exposición propia del curso. Los ejemplos numéricos son didácticos. */
export const s03Book: ReadingBook = {
  session: 'S03',
  title: 'De una caída de brillo a una decisión evaluada',
  introduction:
    'Un tránsito conecta una geometría orbital con una medición de luz. Clasificar esa medición exige decidir cómo representarla, qué etiqueta aprender y qué errores podemos aceptar. Este libro recorre esas decisiones antes de interpretar las cifras del estudio de Kepler.',
  prerequisites:
    'Fracciones, lectura de ejes y la diferencia entre entrenar un modelo y aplicarlo. Cada símbolo y denominador se introduce antes de usarlo.',
  chapters: [
    {
      id: 'transit-animation',
      title: '1. El tránsito: una geometría que deja una señal',
      lead: 'Un planeta produce un tránsito cuando cruza el disco de su estrella desde nuestra línea de visión.',
      paragraphs: [
        'El instrumento registra flujo: luz recibida por unidad de tiempo. Cuando una parte del disco estelar queda cubierta, el flujo disminuye. Un dibujo de la órbita desde arriba ayuda a entender el movimiento, pero la ocultación depende de su proyección hacia el observador. Por eso la animación mantiene ambas vistas enlazadas.',
        'La profundidad relativa se define como δ = (Ffuera − Ftránsito)/Ffuera. Para una estrella uniforme y un planeta completamente dentro de su disco, el área bloqueada da δ = (Rp/R★)². En un tránsito rasante el solapamiento es parcial; con oscurecimiento hacia el limbo, el brillo depende de la posición. La fórmula de áreas es una aproximación con supuestos, no una descripción universal de cualquier curva.',
        'En una órbita que repite su geometría, los tiempos de tránsito siguen una efeméride aproximada tₙ = t₀ + nP. Varias caídas compatibles permiten estimar el período P; una caída aislada no lo determina. Muchos planetas no transitan desde nuestra perspectiva. Además, una señal periódica requiere descartar otras causas antes de atribuirla a un planeta.',
      ],
      example: {
        title: 'Un porcentaje de área',
        introduction: 'Ejemplo ideal: estrella uniforme, tránsito central y Rp/R★ = 0,10.',
        steps: [
          'El cociente de radios es 0,10.',
          'Su cuadrado es 0,01: el planeta bloquea el 1 % del área proyectada.',
          'El flujo normalizado pasa de 1 a 0,99 durante la parte plenamente interior del tránsito.',
        ],
        conclusion:
          'La profundidad compara luz bloqueada y luz total; no mide directamente el radio sin información sobre la estrella y el modelo.',
      },
      question: '¿Un planeta que pasa detrás de la estrella produce otro tránsito en este modelo?',
      answer:
        'No. El modelo usa un planeta oscuro: detrás de la estrella no tapa su superficie visible. Una ocultación de luz emitida o reflejada por el planeta sería otro fenómeno que este modelo no incluye.',
      bridge:
        'Para encontrar estas variaciones pequeñas hacen falta observaciones repetidas y estables. Ese fue el papel de Kepler.',
      sources: [
        { label: 'NASA: tránsito y misión Kepler', href: nasa },
        {
          label: 'Mandel y Agol: curvas de tránsito',
          href: 'https://arxiv.org/abs/astro-ph/0210099',
        },
      ],
    },
    {
      id: 'kepler-data',
      title: '2. Del telescopio a los datos',
      lead: 'Kepler convierte patrones de iluminación sobre píxeles en series temporales de flujo.',
      paragraphs: [
        'La misión primaria observó repetidamente un campo estelar. La extensión K2 cambió de campos mediante campañas. Una cifra de estrellas observadas necesita indicar si describe el campo original, objetivos distintos o ambas fases de la misión. Lo mismo ocurre con los descubrimientos: una cifra histórica de cierre y un catálogo actualizado tienen fechas y poblaciones diferentes.',
        'Un archivo de píxeles del objetivo contiene la distribución de luz alrededor de una estrella en distintos instantes. Una apertura selecciona píxeles cuya suma construye la fotometría. La curva SAP conserva esa fotometría de apertura; PDCSAP incorpora correcciones del pipeline. Que una curva esté corregida no elimina la necesidad de examinar calidad, contaminantes y transformaciones posteriores.',
        'Las filas de una curva incluyen tiempos, flujos, incertidumbres y banderas de calidad. Los catálogos de eventos y candidatos son productos derivados: un período o una profundidad ajustados no son la misma clase de dato que un flujo medido. El ejemplo de Kepler-10 permite seguir filas concretas hasta puntos del gráfico; su manifiesto conserva la fuente y el número de mediciones de la instantánea.',
      ],
      example: {
        title: 'De una fila a un punto',
        introduction:
          'Supongamos una medición didáctica con tiempo 10 d, flujo 99 000 e⁻/s y referencia fuera de tránsito 100 000 e⁻/s.',
        steps: [
          'El tiempo fija la coordenada horizontal.',
          'Dividir 99 000 entre 100 000 da flujo relativo 0,99.',
          'La incertidumbre y la bandera de calidad acompañan ese punto; normalizar no las convierte en información inexistente.',
        ],
        conclusion:
          'La curva es una representación de mediciones con contexto, no una fotografía del planeta.',
      },
      question: '¿Un período del catálogo es una medición de flujo?',
      answer:
        'Es una estimación derivada del análisis de mediciones. Necesitamos saber qué método, eventos y versión del catálogo la sustentan.',
      bridge:
        'La luz recogida puede variar por muchas causas. Ese contexto determina qué eventos merecen una interpretación planetaria.',
      sources: [
        { label: 'NASA: misión y legado', href: nasa },
        { label: 'NASA Exoplanet Archive: productos Kepler', href: archive },
      ],
    },
    {
      id: 'difficulties',
      title: '3. Otras causas pueden parecer un tránsito',
      lead: 'Una caída pequeña y repetida es una pista; su origen necesita diagnóstico.',
      paragraphs: [
        'El ruido y la variabilidad estelar pueden ocultar eventos o producir estructuras que una búsqueda interpreta como posibles señales. También intervienen la duración de las observaciones, el muestreo y los huecos. Una curva más suave después de corregirla requiere revisar qué información se conservó.',
        'Una binaria eclipsante puede generar caídas periódicas. Si su luz se mezcla con una estrella brillante, el eclipse queda diluido y parece poco profundo. Los eclipses secundarios y los cambios en la posición de la luz pueden aportar información que una ventana local de la curva no contiene.',
        'El instrumento añade sus propios patrones: movimiento sobre píxeles, cambios de sensibilidad y correcciones imperfectas. La búsqueda entrega eventos que superan criterios de detección, llamados TCEs. El umbral del pipeline detecta eventos; el umbral de un clasificador posterior decide etiquetas a partir de puntajes. Son decisiones en etapas diferentes.',
      ],
      example: {
        title: 'Un eclipse diluido',
        introduction:
          'Dos fuentes ficticias aportan 90 y 10 unidades de flujo dentro de una apertura.',
        steps: [
          'El flujo combinado fuera del eclipse es 100.',
          'Si la fuente débil pierde la mitad de su flujo, el total pasa a 95.',
          'La caída observada es 5/100 = 5 %, aunque en la fuente que eclipsa fue del 50 %.',
        ],
        conclusion:
          'La profundidad observada depende de la mezcla de luz. Una caída poco profunda no identifica por sí sola el tamaño del objeto ocultante.',
      },
      question: '¿Qué dato adicional buscarías si sospechas una fuente de fondo?',
      answer:
        'Inspeccionaría los píxeles y el centroide, además de la forma de la curva. Una variación localizada fuera de la estrella objetivo puede revelar contaminación que el flujo integrado oculta.',
      bridge:
        'Cuando existen eventos y etiquetas de referencia, podemos formular una tarea de aprendizaje supervisado.',
      sources: [
        { label: 'Artículo: datos, representaciones y pruebas simuladas', href: paper },
        { label: 'Productos y diagnósticos Kepler', href: archive },
      ],
    },
    {
      id: 'classification',
      title: '4. Esto es una tarea de clasificación',
      lead: 'La pregunta computacional asigna una de dos etiquetas a cada evento representado por sus datos.',
      paragraphs: [
        'Una instancia es el evento que clasificamos. Su representación contiene las características que recibe el modelo. La etiqueta de referencia describe la clase usada para aprender o evaluar; la predicción es la salida que obtenemos del modelo. El entrenamiento ajusta parámetros con ejemplos; la inferencia aplica los parámetros ya ajustados.',
        'En el artículo, PC identifica candidatos planetarios y se toma como clase positiva. AFP identifica falsos positivos astrofísicos y NTP fenómenos no transitantes; ambas forman la clase negativa. Las etiquetas desconocidas UNK quedan fuera. La clasificación es binaria por la agrupación elegida, aunque las categorías originales sean más numerosas.',
        'El modelo devuelve un puntaje y el umbral lo convierte en predicción de clase. En la práctica didáctica usaremos puntaje ≥ umbral para asignar PC. Un puntaje alto puede orientar la revisión, pero su interpretación como probabilidad física calibrada requiere otro análisis. Las etiquetas de catálogo también pueden contener errores.',
      ],
      example: {
        title: 'Una salida y dos decisiones',
        introduction: 'Un evento ficticio recibe puntaje 0,76.',
        steps: [
          'Con umbral 0,80 queda como negativo.',
          'Con umbral 0,50 queda como PC.',
          'El puntaje y el evento no cambiaron; cambió la regla que convierte la salida en etiqueta.',
        ],
        conclusion: 'Definir la clase positiva y la regla de decisión precede a contar errores.',
      },
      question: '¿AFP y FP significan lo mismo?',
      answer:
        'AFP es una categoría del catálogo. FP es un error de predicción: marcar PC cuando la referencia es negativa. Una etiqueta y una relación entre referencia y predicción cumplen funciones diferentes.',
      bridge:
        'La definición de la tarea deja abierta una decisión crucial: cómo preparar las entradas.',
      sources: [{ label: 'Artículo: TCEs y etiquetas, §3.1', href: paper }],
    },
    {
      id: 'representations',
      title: '5. Qué recibe el modelo del artículo',
      lead: 'El clasificador aprende sobre una representación construida mediante decisiones de análisis.',
      paragraphs: [
        'Los autores parten de curvas procesadas por el pipeline de Kepler. Retiran tránsitos de otros planetas confirmados del sistema, enmascaran el evento al ajustar una tendencia y aplanan la curva. El tratamiento de valores atípicos y el ajuste de la spline buscan evitar que una medición discrepante deforme la base.',
        'Después pliegan por el período del evento y agrupan mediciones para obtener vectores de longitud fija. La vista global conserva contexto del ciclo; la local dedica resolución al evento. El caso de eclipse secundario de la Figura 3 muestra por qué una ventana local convincente puede omitir una explicación que aparece en el resto del ciclo.',
        'La configuración publicada combina 2 001 valores globales y 201 locales. La CNN aprende patrones locales y produce un puntaje. La normalización fija una escala comparable, pero también elimina la profundidad absoluta de esa entrada. La sesión explica esta cadena; no entrena ni reproduce el modelo publicado.',
      ],
      example: {
        title: 'Representar es seleccionar',
        introduction: 'Imagina un evento estrecho en una órbita larga.',
        steps: [
          'Una vista global reparte sus posiciones a lo largo del ciclo completo.',
          'El evento puede quedar comprimido en pocos intervalos.',
          'Una vista local conserva más detalle alrededor del evento, pero deja de mostrar el resto del ciclo.',
        ],
        conclusion:
          'Combinar vistas responde a pérdidas de información distintas, sin recuperar datos que nunca entraron en ellas.',
      },
      question: '¿Cambiar los bins del esquema permite afirmar que mejoró la CNN publicada?',
      answer:
        'Solo muestra cómo cambia la representación didáctica. Comparar el desempeño del modelo requeriría reentrenar o aplicar el procedimiento adecuado y evaluarlo con un protocolo explícito.',
      bridge: 'Una predicción necesita un contraste con referencia sobre ejemplos reservados.',
      sources: [{ label: 'Artículo: §§3.2–3.3, figuras 3 y 5', href: paper }],
    },
    {
      id: 'confusion-matrix',
      title: '6. Contar errores antes de resumirlos',
      lead: 'La matriz conserva qué clase predijimos y qué clase tenía cada referencia.',
      paragraphs: [
        'Entrenamiento ajusta el modelo; validación permite comparar opciones y elegir decisiones; el test final estima desempeño en ejemplos reservados. El artículo describe una partición aleatoria 80/10/10. Esa prueba no demuestra por sí misma transferencia a estrellas o misiones completamente nuevas.',
        'Fijamos filas de referencia y columnas de predicción. Un PC marcado PC es TP; un PC descartado es FN. Una referencia negativa marcada PC es FP y una referencia negativa rechazada es TN. La matriz depende de las etiquetas y de la decisión de umbral.',
        'Los ejemplos alternativos permiten ver patrones distintos de error. Al comparar conjuntos hay que revisar su composición: 18 aciertos negativos en veinte señales pueden convivir con no recuperar ninguno de los dos positivos. Contar ejemplos antes de calcular métricas hace visible a quién representa cada denominador.',
      ],
      example: {
        title: 'Veinte eventos ficticios',
        introduction: 'Hay diez PC de referencia y diez negativos.',
        steps: [
          'El clasificador recupera siete PC y descarta tres: TP=7 y FN=3.',
          'Marca dos negativos como PC y rechaza ocho: FP=2 y TN=8.',
          'La suma 7+3+2+8 es veinte; cada evento aparece una sola vez.',
        ],
        conclusion:
          'Siete verdaderos positivos no significan siete planetas nuevos confirmados: describen acuerdo con la referencia del ejercicio.',
      },
      question: '¿Qué pregunta cambiaría la partición si queremos probar estrellas nuevas?',
      answer:
        'Separaríamos estrellas o sistemas completos entre conjuntos. Una partición aleatoria de eventos puede compartir contextos de observación entre entrenamiento y prueba.',
      bridge: 'Cada métrica hará una pregunta diferente a estas mismas cuatro celdas.',
      sources: [{ label: 'Artículo: partición y evaluación, §§3.1 y 5.1', href: paper }],
    },
    {
      id: 'metric-accuracy',
      title: '7. Los denominadores explican las métricas',
      lead: 'Una métrica comprime la matriz; elegirla significa decidir qué aspecto del error interesa.',
      paragraphs: [
        'Accuracy=(TP+TN)/N pregunta qué fracción total recibió la etiqueta correcta; error=(FP+FN)/N es su complemento. En el ejemplo son 15/20=0,75 y 5/20=0,25. Ninguna revela por sí sola si fallamos principalmente ante positivos o negativos.',
        'Precision=TP/(TP+FP) mira las predicciones positivas: siete de nueve seleccionadas coinciden con PC. Recall=TP/(TP+FN) mira los positivos de referencia: siete de diez fueron recuperados. La primera informa sobre la composición de la selección; la segunda, sobre lo que dejó fuera.',
        'Especificidad=TN/(TN+FP) y FPR=FP/(FP+TN) dividen por las referencias negativas. Aquí valen 0,80 y 0,20. FPR no es la fracción de errores entre las señales seleccionadas: ese denominador pertenece a otra pregunta.',
        'F1 es la media armónica 2PR/(P+R), donde P y R representan precision y recall; también es 2TP/(2TP+FP+FN). En el ejemplo vale 14/19≈0,74. No incluye TN ni fija el costo científico de cada error. Una razón con denominador cero queda indefinida: no la convertimos silenciosamente en un éxito.',
      ],
      example: {
        title: 'Revisión de candidatos con recursos limitados',
        introduction: 'El ejemplo base selecciona nueve señales y siete tienen referencia PC.',
        steps: [
          'Precision=7/9≈0,78: dos seleccionadas son negativas de referencia.',
          'Recall=7/10=0,70: tres PC de referencia quedaron fuera.',
          'Decidir si conviene esa selección exige valorar la capacidad de revisión y la importancia de recuperar candidatos.',
        ],
        conclusion:
          'Los porcentajes describen consecuencias complementarias; el objetivo científico define cuáles conviene priorizar.',
      },
      question: '¿Por qué siempre predecir negativo puede producir una accuracy alta?',
      answer:
        'Si abundan los negativos, acierta muchas etiquetas aunque pierda todos los positivos. En el catálogo del artículo 12 137/15 737≈77,12 % son negativos; esa baseline tiene recall cero. Ese cálculo usa el catálogo completo, no la composición exacta del test.',
      bridge:
        'Hasta aquí fijamos una decisión. Un puntaje permite explorar varias decisiones mediante umbrales.',
      sources: [
        { label: 'Artículo: definiciones y resultados, §5.1', href: paper },
        {
          label: 'Géron: clasificación, capítulo 3',
          href: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/ch03.html',
        },
      ],
    },
    {
      id: 'threshold',
      title: '8. Una familia de decisiones y sus curvas',
      lead: 'Mover el umbral cambia las etiquetas predichas sin reentrenar el modelo.',
      paragraphs: [
        'La práctica nueva usa seis puntajes inventados, tres positivos y tres negativos. Bajar el umbral añade predicciones positivas: TP y FP no pueden disminuir con puntajes fijos, aunque precision puede subir o bajar en una muestra finita. No extrapolamos la elección de estos seis casos a un umbral científico real.',
        'La curva PR relaciona recall y precision al recorrer decisiones. La curva ROC usa FPR horizontal y TPR vertical. Una misma matriz determina un punto correspondiente en cada curva. La Figura 6 del artículo es PR; el ROC-AUC informado en la tabla resume otra curva.',
        'El área ROC resume ordenamiento. Con los seis puntajes, ocho de nueve pares positivo-negativo están bien ordenados, por lo que AUC=8/9≈0,89. Mover el umbral desplaza el punto activo, pero no cambia el ordenamiento ni el área de esos mismos puntajes. Los empates requieren cambiar los casos juntos y dar medio crédito al comparar un par empatado.',
      ],
      example: {
        title: 'Dos umbrales sobre seis señales',
        introduction:
          'A=.92 PC, B=.81 PC, C=.76 negativa, D=.63 PC, E=.54 negativa y F=.18 negativa.',
        steps: [
          'Con t=0,80: TP=2, FP=0, FN=1, TN=3; precision=1 y recall=2/3.',
          'Con t=0,50: TP=3, FP=2, FN=0, TN=1; precision=3/5 y recall=1.',
          'El AUC sigue siendo 8/9: no se cambiaron puntajes ni referencias.',
        ],
        conclusion:
          'Un filtro amplio y una selección restrictiva tienen consecuencias distintas, incluso sobre el mismo clasificador.',
      },
      question: '¿AUC alto significa que cada puntaje es una probabilidad física bien calibrada?',
      answer:
        'No. AUC mide ordenamiento entre clases; calibración compara puntajes con frecuencias observadas. Confirmar un planeta necesita además evidencia astronómica y validación.',
      bridge:
        'Ahora podemos interpretar resultados del estudio sin confundir el conjunto, el umbral y la métrica.',
      sources: [{ label: 'Artículo: §5.1 y figura 6', href: paper }],
    },
    {
      id: 'results',
      title: '9. De una cifra a una conclusión defendible',
      lead: 'Una conclusión conserva el conjunto, la referencia, el criterio de decisión y sus límites.',
      paragraphs: [
        'Para la CNN con ambas vistas el artículo informa accuracy 0,960 con umbral 0,5 y ROC-AUC 0,988 en su test de 1 523 TCEs. También describe un punto PR con recall 0,95 y precision 0,90. Esas tres afirmaciones contestan preguntas diferentes; no conocemos el umbral de ese punto PR a partir de estos números solamente.',
        'Las pruebas simuladas examinan fallos concretos: señales fuera del objetivo, binarias y señales débiles. Sus denominadores corresponden a TCEs recuperados en cada escenario, no a toda la misión. La Figura 11 relaciona el puntaje mediano con la razón de MES esperada del eclipse primario y secundario; el eje horizontal es logarítmico y el vertical no es recall.',
        'En la aplicación posterior los autores ordenan eventos para inspección y realizan validación estadística. El modelo ayuda a priorizar; los ejemplos de esta presentación no ejecutan aquella búsqueda ni reproducen su entrenamiento. Una siguiente investigación necesitaría datos, protocolo, baseline y evidencia propia.',
      ],
      example: {
        title: 'Interpretar sin cambiar el significado',
        introduction: 'Alguien afirma: «AUC=0,988 significa 98,8 % de planetas confirmados».',
        steps: [
          'Identificar la métrica: es ROC-AUC, un resumen de ranking.',
          'Identificar referencia y conjunto: etiquetas de TCEs del test.',
          'Reformular: el modelo ordena muy bien esas clases en ese conjunto; la validación de objetos ocurre después.',
        ],
        conclusion:
          'La interpretación correcta puede ser menos espectacular y, a la vez, mucho más útil para decidir el siguiente paso.',
      },
      question: '¿Qué comunicarías al elegir un umbral para seguimiento?',
      answer:
        'Explicaría el objetivo, la población evaluada, las métricas en validación, los errores esperados y la capacidad de revisión. Reservaría el test para estimar el desempeño final y separaría clasificación de validación planetaria.',
      bridge: 'Usa las referencias para reconstruir la procedencia de las cifras y las figuras.',
      sources: [{ label: 'Artículo: §§5–6, tablas 1–3', href: paper }],
    },
  ],
};
