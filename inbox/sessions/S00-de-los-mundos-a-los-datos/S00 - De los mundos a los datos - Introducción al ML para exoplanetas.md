---
aliases:
  - S00 ML para exoplanetas
  - De los mundos a los datos
  - Introducción al curso ML Ciencias Planetarias
tags:
  - maestria
  - curso
  - ml-ciencias-planetarias
  - sesion
  - sesion/s00
  - exoplanetas
  - introduccion
date: 2026-09-08
estado: semilla
---

tipo:: #curso/sesion
curso:: [[AA ML Ciencias Planetarias]]
sesion:: S00
fecha::
periodicidad:: cada 15 días
lineas:: problema, teoría, aplicación, transferencia docente
conceptos:: [[Problema científico como punto de partida de ML]], [[Paradigma, tarea y familia de modelo]], [[Generalización y sesgo inductivo]], [[Flujo de proyecto de ML y línea base]]
concepto_central:: [[Problema científico como punto de partida de ML]]
produccion_digital:: pendiente: página S00, carril de estaciones, galería de datos, galería de impacto cuantificado, glosario y actividad
audiencia:: estudiantes, tutores y colaboradores del curso
duracion:: 90 minutos, borrador inicial

---

# S00 — De los mundos a los datos: introducción al ML para exoplanetas

> [!important] Idea central
> Las ciencias planetarias formulan preguntas sobre mundos, sistemas y procesos. Las observaciones convierten esas preguntas en señales y datos. El aprendizaje automático puede ayudar a buscar, clasificar, inferir, explorar y priorizar cuando la escala, el ruido, la dimensión o el costo computacional del problema lo justifican. El curso enseña a recorrer toda la cadena: pregunta científica → datos → tarea → modelo → evaluación → interpretación → transferencia docente.

> [!note] Estado de este documento
> Este es un primer borrador amplio de contenido y guion. La estructura, los ejemplos y la bibliografía son una base de diseño. Todavía deben decidirse el nivel de entrada, la selección definitiva de casos, la duración real y qué material pasará a la página web pública.

## 1. Decisión de diseño

S00 tendrá tres capas conectadas:

1. **Puerta de entrada técnica:** explica cómo recorrer el curso y la página.
2. **Núcleo científico:** introduce las ciencias planetarias, sus preguntas, sus datos y algunos problemas donde se ha usado ML.
3. **Orientación técnica avanzada:** explica cómo se organizan las sesiones, los conceptos, las aplicaciones y la transferencia docente; ofrece instrucciones específicas para tutores y colaboradores.

La orientación breve debe aparecer al inicio porque el lector necesita saber cómo usar la página antes de comenzar. La orientación sobre forks, procedencia, integración y publicación puede aparecer al final o en un apartado desplegable para personas que vayan a adaptar o mantener el curso.

La decisión conserva la arquitectura general del curso: sesiones quincenales, conceptos atómicos en tres ramas, producción digital temporal y transferencia docente. La introducción científica será el centro de la experiencia de S00; la documentación técnica quedará visible con una profundidad ajustada a cada audiencia.

## 2. Propósito, pregunta guía y producto

### Propósito

Presentar el curso como un recorrido por problemas científicos de exoplanetas. El estudiante debe reconocer qué estudian las ciencias planetarias, qué tipos de observaciones se utilizan, qué dificultades aparecen al convertirlas en datos y qué funciones puede cumplir el ML dentro de una investigación.

### Pregunta guía

> ¿Qué queremos conocer sobre otros mundos, qué datos pueden aportar evidencia y en qué momentos puede el aprendizaje automático fortalecer una investigación que conserva la formulación y la validación científica?

### Producto de la sesión

Al terminar, cada estudiante debería poder construir una ficha breve:

~~~
Pregunta científica:
Unidad de análisis:
Datos u observación:
Salida que queremos producir:
Ayuda posible del ML:
Línea base o comparación:
Evaluación necesaria:
Límite de la interpretación:
Rama principal del curso:
~~~

La actividad se centra en formular el problema, comprobar la comprensión inicial y preparar el lenguaje de las sesiones siguientes. La programación y el entrenamiento de modelos quedan para las sesiones de aplicación.

### Alcance

S00 cubre:

- qué son las ciencias planetarias;
- qué preguntas se formulan sobre exoplanetas;
- cómo una propiedad física se conecta con una señal observable;
- qué tipos de datos aparecen en el área;
- por qué algunos problemas son adecuados para ML;
- una selección de hitos y ejemplos explicados desde el problema;
- las tres ramas conceptuales del curso;
- el modo de uso de la página;
- una primera actividad de formulación.

S00 deja para sesiones posteriores:

- la formalización detallada de IA, estadística y ML;
- paradigmas, tareas y familias de modelos en profundidad;
- funciones de pérdida y derivaciones;
- selección y entrenamiento de un modelo;
- métricas detalladas;
- construcción de un notebook completo;
- análisis científico de un dataset concreto;
- configuración exhaustiva del repositorio.

El [[S01 - ML, IA y métodos estadísticos]] podrá desarrollar el vocabulario formal que aquí aparece como mapa inicial de orientación. La cadena conceptual inicial dialoga con [[Problema científico como punto de partida de ML]] y [[Flujo de proyecto de ML y línea base]].

## 3. Audiencias y niveles de orientación

| Audiencia | Qué necesita obtener de S00 | Profundidad técnica |
| --- | --- | --- |
| Estudiante | Entender el campo, reconocer datos y formular un problema | Orientación de navegación y lenguaje científico |
| Tutor | Poder explicar, adaptar y evaluar la actividad | Mapa de las tres ramas, errores previsibles y modificaciones |
| Colaborador | Poder preparar material conservando procedencia y estado | Estructura de contenidos, fuentes, validación y frontera editorial |

### Prerrequisitos provisionales

- Curiosidad por los planetas y las observaciones astronómicas.
- Capacidad para describir una señal o una gráfica en lenguaje común.
- Familiaridad elemental con la idea de medir una cantidad y compararla con una hipótesis.
- La experiencia previa con algoritmos de ML puede ser diversa; la sesión construye un punto de partida común.
- La lectura de la página funciona directamente en el navegador; Node, npm y las herramientas de desarrollo quedan fuera de este primer recorrido.

El nivel matemático y computacional exacto queda pendiente de decisión editorial. Esta sesión funciona como una entrada común y permite continuar por rutas de mayor formalización o mayor aplicación.

## 4. Arquitectura temporal de la sesión

| Orden | Unidad | Tiempo | Función | Producto visible |
| ---: | --- | ---: | --- | --- |
| 0 | Bienvenida técnica | 5 min | Mostrar cómo se recorre la página y qué ofrece el curso | Mapa de modos y recursos |
| 1 | Una pregunta sobre un mundo lejano | 5 min | Abrir desde una inferencia astronómica | Cadena mundo → señal → conocimiento |
| 2 | Qué estudian las ciencias planetarias | 10 min | Ubicar el campo y sus familias de preguntas | Mapa de dominios |
| 3 | Preguntas sobre exoplanetas | 10 min | Conectar preguntas con observables | Tarjetas de preguntas |
| 4 | Qué datos utilizamos | 15 min | Reconocer modalidades y dificultades | Galería de datos |
| 5 | Cuándo puede ayudar ML | 8 min | Introducir funciones de ML y reservar los algoritmos para después | Mapa problema → ayuda |
| 6 | Hitos y ejemplos | 25 min | Comprender problema, solución, utilidad, cifra de impacto y límite | Galería de impacto cuantificado |
| 7 | Las tres ramas del curso | 10 min | Explicar la estructura de aprendizaje | Triángulo o cadena de ramas |
| 8 | Actividad y salida | 10 min | Comprobar formulación y límites | Ficha de problema |
| 9 | Cierre técnico | 5 min | Explicar cómo continuar y cómo adaptar | Ruta siguiente y orientación por audiencia |

La versión de 60 minutos conserva las unidades 0, 1, 2, 4, 5, 6, 7 y 8. La versión extendida incorpora más casos, una discusión sobre incertidumbre y una demostración visual de datos.

## 5. Mapa de la página web

La página debe ofrecer una lectura lineal completa y una lectura por estaciones. El contenido se puede presentar mediante tres modos:

| Modo | Función pedagógica | Contenido |
| --- | --- | --- |
| Presentación | Explicar una idea principal por vez | Estaciones, imágenes, diagramas y frases breves |
| Lectura | Conservar el desarrollo argumental | Texto completo, referencias, ejemplos y límites |
| Actividades | Separar la respuesta del desarrollo | Tarjetas, preguntas, clasificación y ficha de salida |

La navegación inicial debe mostrar:

- título de la sesión;
- pregunta guía;
- duración aproximada;
- modos disponibles;
- indicador de avance;
- enlace a la bibliografía;
- enlace al glosario;
- aviso de que los ejemplos tienen límites y estados editoriales;
- acceso a la lectura completa para quien prefiera desplazarse linealmente.

La página ofrece un recorrido comprensible para estudiantes que todavía no conocen la arquitectura técnica del repositorio. Los identificadores, las rutas y los estados editoriales pueden mostrarse en la orientación avanzada o en detalles desplegables.

## 6. Unidad 0 — Bienvenida técnica: cómo recorrer el curso

### Pregunta de la unidad

> ¿Cómo puedo usar esta página para aprender, consultar un concepto y realizar una actividad?

### Texto para decir

> «Bienvenidos al curso de Machine Learning para exoplanetas. Vamos a estudiar problemas científicos concretos y a seguir el camino que lleva desde una pregunta sobre un mundo hasta una interpretación responsable de los datos.
>
> Esta página tiene tres formas de lectura. En Presentación veremos una idea principal a la vez. En Lectura encontraremos el desarrollo completo, con ejemplos, referencias y límites. En Actividades podremos responder preguntas y construir nuestras propias formulaciones. Los conceptos y ejemplos amplían cada estación. Los notebooks aparecerán más adelante, cuando la pregunta, los datos y la línea base estén suficientemente definidos.
>
> Para leer la introducción pueden trabajar directamente en la página. La página es la puerta de entrada conceptual. Las herramientas de programación se incorporarán cuando tengan una función científica y pedagógica clara.»

### Elementos visuales

1. Tres tarjetas: Presentación, Lectura y Actividades.
2. Una flecha que muestre: explicación → consulta → práctica.
3. Una nota de estado: «S00 es una introducción; las demostraciones computacionales aparecen después».
4. Un pequeño mapa del curso: sesiones → conceptos → aplicaciones → transferencia docente.
5. Un botón para abrir la bibliografía de la sesión.
6. Foto con descripción de la web page

### Límite

Esta unidad explica cómo leer el recurso. La configuración de forks, la integración de contenidos y la publicación se explican al final para las personas que necesiten adaptar o mantener el curso.

## 7. Unidad 1 — Una pregunta sobre un mundo lejano

### Pregunta de la unidad

> ¿Qué podemos conocer de un planeta distante a partir de observaciones indirectas?

### Microproblema de apertura

Imaginemos una estrella cuya luz cambia ligeramente con el tiempo. Puede haber un planeta que pasa frente a ella, actividad de la estrella, una binaria eclipsante, una tendencia instrumental u otra fuente de variación.

Preguntar al grupo:

1. ¿Qué observamos directamente?
2. ¿Qué propiedad queremos conocer?
3. ¿Qué explicaciones alternativas debemos considerar?
4. ¿Qué datos adicionales aumentarían nuestra confianza?

### Texto para decir

> «El detector recibe señales parciales producidas por una interacción entre el planeta, su estrella, el entorno y el instrumento. A partir de esas señales construimos inferencias sobre su masa, temperatura, moléculas e historia.
>
> Una caída periódica en el brillo puede sugerir un tránsito. Un desplazamiento periódico en las líneas espectrales puede sugerir el movimiento de la estrella. Una variación pequeña del radio aparente con la longitud de onda puede contener información atmosférica. Una fuente débil cerca de una estrella puede ser un planeta, un artefacto o una estructura residual de la imagen.
>
> El curso comienza en ese punto: queremos aprender a transformar una pregunta científica en una pregunta de datos y a reconocer qué parte de la conclusión depende de la medición, del modelo, de la evaluación y de los supuestos.»

### Cadena visible

~~~mermaid
graph LR
  A["Mundo o sistema planetario"] --> B["Proceso físico"]
  B --> C["Señal observable"]
  C --> D["Datos e incertidumbre"]
  D --> E["Representación"]
  E --> F["Inferencia o decisión"]
  F --> G["Conocimiento científico"]
~~~

### Idea que debe quedar

El dato adquiere sentido dentro de una pregunta. El modelo produce una salida que debe relacionarse con una evidencia, una comparación y un uso científico definido.

^s00-idea-cadena

## 8. Unidad 2 — ¿Qué estudian las ciencias planetarias?

### Pregunta de la unidad

> ¿Qué tipo de conocimiento construyen las ciencias planetarias?

### Definición de trabajo

Las ciencias planetarias estudian el origen, la formación, la estructura, la composición, la dinámica y la evolución de los cuerpos y sistemas planetarios. Integran física, química, geología, astronomía, ciencias atmosféricas, biología y modelamiento computacional.

### Mapa ramificado del campo

La lista funciona mejor como un mapa con una jerarquía principal y conexiones transversales. El árbol principal organiza mundos, cuerpos y sistemas. Los componentes físicos, los entornos y las preguntas científicas atraviesan ese árbol.

#### 1. Mundos, cuerpos y sistemas

- **Sistemas planetarios**
  - **Sistema Solar**
    - planetas del Sistema Solar;
    - sus lunas y otros cuerpos asociados.
  - **Sistemas extrasolares**
    - exoplanetas;
    - exolunas como línea de estudio;
    - arquitecturas planetarias alrededor de otras estrellas.
- **Cuerpos y tipos de mundo**
  - planetas;
  - lunas;
  - mundos oceánicos;
  - asteroides y cometas.
- **Entornos de formación**
  - discos protoplanetarios;
  - regiones de formación y migración planetaria.

#### 2. Estructura, entorno e interacción

- interiores planetarios;
- superficies y procesos geológicos;
- atmósferas y exosferas;
- magnetosferas;
- interacción entre planetas, lunas, estrellas y medio espacial.

#### 3. Procesos y preguntas transversales

- orígenes y formación;
- arquitectura y evolución de sistemas planetarios;
- habitabilidad y búsqueda de vida;
- defensa planetaria.

> [!important] Cómo leer las categorías
> «Exoplaneta» identifica un planeta que pertenece a un sistema extrasolar. «Luna» identifica un cuerpo por su relación orbital con otro cuerpo. «Mundo oceánico» describe una propiedad o estado físico que puede aparecer en una luna o en un planeta. Las tres categorías pueden cruzarse: una luna puede pertenecer al Sistema Solar o a un sistema extrasolar, y un mundo oceánico puede estudiarse dentro de cualquiera de esos contextos.

~~~mermaid
flowchart TD
    A["Ciencias planetarias"] --> B["Mundos, cuerpos y sistemas"]
    A --> C["Estructura, entorno e interacción"]
    A --> D["Procesos y preguntas transversales"]

    B --> B1["Sistemas planetarios"]
    B1 --> B11["Sistema Solar"]
    B11 --> B111["Planetas del Sistema Solar"]
    B11 --> B112["Lunas y cuerpos asociados"]
    B1 --> B12["Sistemas extrasolares"]
    B12 --> B121["Exoplanetas"]
    B12 --> B122["Exolunas"]
    B --> B2["Cuerpos y tipos de mundo"]
    B2 --> B21["Lunas"]
    B2 --> B22["Mundos oceánicos"]
    B2 --> B23["Asteroides y cometas"]
    B --> B3["Entornos de formación"]
    B3 --> B31["Discos protoplanetarios"]

    C --> C1["Interiores"]
    C --> C2["Superficies y geología"]
    C --> C3["Atmósferas y exosferas"]
    C --> C4["Magnetosferas e interacción estelar"]

    D --> D1["Orígenes y formación"]
    D --> D2["Arquitectura y evolución"]
    D --> D3["Habitabilidad y vida"]
    D --> D4["Defensa planetaria"]

    B2 -. "puede aparecer en" .-> B11
    B2 -. "puede estudiarse en" .-> B12
    B3 -. "informa sobre" .-> D1
    C3 -. "aporta datos a" .-> D3
    B23 -. "se relaciona con" .-> D4
~~~

#### Relación entre los elementos de la lista

| Elemento | Nivel principal | Relación con otras ramas |
| --- | --- | --- |
| Planetas del Sistema Solar | Sistema planetario y cuerpos | Sirven de referencia para comparar exoplanetas y otros mundos |
| Exoplanetas | Sistemas extrasolares y población de mundos | Se pueden estudiar mediante tránsito, velocidad radial, imagen y espectros |
| Lunas | Cuerpos ligados orbitalmente a un planeta | Pueden ser lunas del Sistema Solar o exolunas |
| Mundos oceánicos | Propiedad o estado de un mundo | Conecta interiores, superficies, atmósferas y habitabilidad |
| Asteroides y cometas | Cuerpos pequeños | Conectan formación, evolución, impactos y defensa planetaria |
| Discos protoplanetarios | Entornos de formación | Conectan origen, migración y arquitectura planetaria |
| Interiores planetarios | Componente interno | Conecta masa, radio, composición, evolución y habitabilidad |
| Superficies y procesos geológicos | Componente superficial y procesos | Conecta historia térmica, actividad, erosión y observables |
| Atmósferas y exosferas | Envolturas gaseosas | Conectan espectros, clima, escape y habitabilidad |
| Magnetosferas e interacción estelar | Entorno e interacción | Conectan actividad estelar, pérdida atmosférica y señales observables |
| Arquitectura y evolución | Proceso a escala de sistema | Conecta órbitas, formación, estabilidad y migración |
| Habitabilidad y búsqueda de vida | Pregunta transversal | Integra propiedades del mundo, atmósfera, estrella y contexto evolutivo |
| Defensa planetaria | Objetivo aplicado | Se apoya especialmente en el estudio de asteroides, cometas y órbitas |

#### Cómo usar esta ramificación en S00

La ramificación permite presentar una secuencia sencilla:

~~~text
¿Qué estudiamos?
→ un sistema, un planeta, una luna, un cuerpo pequeño o un entorno de formación
→ ¿qué componente o interacción nos interesa?
→ ¿qué proceso o pregunta queremos comprender?
→ ¿qué señal y qué datos contienen información?
~~~

Esta secuencia prepara la entrada al ML. El tipo de objeto orienta la unidad de análisis; el componente orienta la representación; la pregunta define la salida; el proceso científico define la interpretación.

La [estrategia decadal de las National Academies para 2023–2032](https://nap.nationalacademies.org/resource/26522/interactive/) organiza preguntas del campo alrededor de los orígenes, la formación y evolución de los mundos, los procesos que transforman sus atmósferas y superficies, la habitabilidad y la búsqueda de vida. La introducción puede usar ese documento como marco institucional y seleccionar los objetivos pertinentes para el curso.

### Cuatro familias de preguntas

| Familia | Pregunta general | Ejemplo en exoplanetas | Datos posibles |
| --- | --- | --- | --- |
| Origen y formación | ¿Cómo se construyen los mundos? | ¿Qué arquitectura orbital puede surgir de distintos escenarios de formación? | Catálogos, masas, periodos, simulaciones |
| Estructura y evolución | ¿Cómo cambian los planetas? | ¿Cómo evolucionan una atmósfera, un interior o una órbita? | Espectros, curvas temporales, modelos físicos |
| Caracterización | ¿Cómo medimos sus propiedades? | ¿Cuál es su radio, masa, temperatura o composición? | Fotometría, espectros, velocidades radiales |
| Habitabilidad y vida | ¿Qué condiciones permiten ambientes habitables? | ¿Qué señales atmosféricas son compatibles con distintos escenarios? | Espectros, modelos climáticos, biosignaturas, simulaciones |

### Texto para decir

> «Las ciencias planetarias estudian mundos como sistemas. El radio de un planeta puede depender de su estructura interior; la atmósfera puede depender de la gravedad, la temperatura, la estrella y la historia de pérdida de gases; la habitabilidad depende de procesos que cambian con el tiempo. Por eso una propiedad aislada rara vez agota la pregunta científica.
>
> Los exoplanetas ocupan un lugar especial porque permiten comparar sistemas planetarios muy distintos. El Sistema Solar funciona como referencia; las observaciones de otros sistemas amplían el espacio de arquitecturas, composiciones y evoluciones que podemos estudiar.
>
> El aprendizaje automático será una herramienta dentro de este campo de preguntas. Su función se decide a partir del problema que queremos investigar.»

### Preguntas para el grupo

SIN PREGUNTAS

### Límite

S00 ofrece un mapa inicial del campo y deja para otras sesiones el desarrollo de las subdisciplinas, sus preguntas abiertas y sus métodos específicos.

## 9. Unidad 3 — Preguntas sobre exoplanetas

### Pregunta de la unidad

> ¿Cómo transformamos una pregunta amplia sobre un exoplaneta en una pregunta acotada?

### Escalera de preguntas

Una pregunta científica amplia puede descomponerse así:

~~~
¿Qué queremos entender?
→ ¿Qué propiedad o proceso está involucrado?
→ ¿Qué señal puede contener información?
→ ¿Qué datos tenemos?
→ ¿Qué salida necesitamos?
→ ¿Qué evidencia sería suficiente para usarla?
~~~

### Ejemplos de transformación

| Pregunta amplia | Pregunta acotada para datos | Salida posible |
| --- | --- | --- |
| ¿Cómo son las atmósferas de los exoplanetas? | ¿Qué parámetros atmosféricos son compatibles con este espectro? | Distribución de temperatura y abundancias |
| ¿Cuántos planetas existen? | ¿Qué candidatos de una colección de curvas de luz requieren revisión? | Probabilidad o ranking |
| ¿Cómo evolucionan los sistemas? | ¿Qué configuraciones orbitales permanecen estables en la escala estudiada? | Clase, probabilidad o tiempo estimado |
| ¿Qué mundos son diferentes? | ¿Qué objetos forman grupos y cuáles son atípicos en el catálogo? | Representación, clusters o puntuación de anomalía |
| ¿Qué observación conviene solicitar? | ¿Qué objetivo maximiza la información esperada bajo un presupuesto limitado? | Prioridad o acción |

### Texto para decir

> «Una pregunta como “¿hay vida fuera de la Tierra?” tiene gran importancia científica. Para elegir datos y evaluar un modelo necesitamos acotarla: ¿qué ambiente queremos estudiar?, ¿qué propiedad atmosférica podemos medir?, ¿qué señales alternativas pueden producirla?, ¿qué nivel de evidencia requeriríamos?
>
> El curso practicará esa descomposición. Una buena aplicación de ML comienza con una pregunta suficientemente concreta para definir una entrada, una salida, una comparación y una forma de evaluación.»

### Actividad interactiva — Juego de conectar

Este bloque ocupa uno de los subslides de la diapositiva sobre preguntas de exoplanetas. La clase trabaja con tarjetas y conexiones visuales. La primera ronda relaciona cada pregunta con el tipo de conocimiento buscado, el objeto de estudio y la observación que puede aportar evidencia. La segunda ronda añade la dificultad científica que acompaña cada conexión.

#### Ronda 1 — Conecta la pregunta con la evidencia

Presentar tres tarjetas de preguntas:

1. «Quiero encontrar planetas parecidos a la Tierra».
2. «Quiero saber qué hay en una atmósfera».
3. «Quiero entender qué sistemas son dinámicamente posibles».

En otra zona del subslide aparecen tarjetas mezcladas. El grupo debe conectar cada pregunta con:

- **qué queremos conocer:** propiedad, composición o proceso;
- **qué estudiamos:** planeta, atmósfera o sistema planetario;
- **qué observación o dato puede aportar evidencia:** tránsito, velocidad radial, espectro, catálogo, parámetros orbitales o simulación.

La tarjeta «salida» queda reservada para la formalización posterior de ML. En esta actividad funciona mejor la expresión **qué queremos conocer** porque mantiene la conversación dentro de la pregunta astronómica.

#### Ronda 2 — Añade la dificultad

Después de establecer las conexiones, cada grupo elige una pregunta y añade una tarjeta de dificultad:

- definir qué significa «parecido a la Tierra»;
- separar composición atmosférica, temperatura y efectos de nubes;
- evaluar estabilidad en una escala temporal y bajo una arquitectura concreta;
- trabajar con ruido, degeneraciones, selección o simulaciones incompletas.

La puesta en común debe explicar una conexión completa:

~~~text
Pregunta:
→ qué queremos conocer:
→ objeto o sistema:
→ observación disponible:
→ dificultad principal:
~~~

#### Clave docente sugerida

| Pregunta | Qué queremos conocer | Objeto o sistema | Observación o dato | Dificultad |
| --- | --- | --- | --- | --- |
| Encontrar planetas parecidos a la Tierra | Propiedades que definan la semejanza: tamaño, masa, irradiación, órbita o atmósfera | Población de planetas y sistemas planetarios | Tránsitos, velocidades radiales, espectros y catálogos | Convertir «parecido» en criterios observables y comparables |
| Saber qué hay en una atmósfera | Composición, temperatura, nubes o estructura vertical | Atmósfera de un planeta | Espectro y modelo atmosférico | Degeneraciones, ruido y dependencia del modelo físico |
| Entender qué sistemas son dinámicamente posibles | Estabilidad, resonancias, migración o arquitectura orbital | Sistema planetario | Parámetros orbitales y simulaciones dinámicas | Escala temporal, sensibilidad a condiciones iniciales y costo computacional |

#### Texto para decir

> «Vamos a jugar con la cadena que convierte una curiosidad en una pregunta investigable. Cada equipo conectará una pregunta con aquello que queremos conocer, con el objeto que estamos estudiando y con la observación que puede aportar evidencia. Después añadiremos la dificultad que hace necesaria una estrategia de análisis. La palabra “salida” aparecerá más adelante, cuando formalicemos la tarea de ML.»

## 10. Unidad 4 — De una propiedad física a una señal observable

### Pregunta de la unidad

> ¿Qué relación existe entre el proceso planetario que nos interesa y el dato que llega al instrumento?

### La cadena de medición

~~~mermaid
graph TD
  A["Propiedad o proceso planetario"] --> B["Interacción física"]
  B --> C["Señal que alcanza el telescopio"]
  C --> D["Instrumento y detector"]
  D --> E["Calibración y preprocesamiento"]
  E --> F["Dato analítico"]
  F --> G["Modelo e inferencia"]
~~~

### Observatorios, misiones e instrumentos que convierten mundos en datos

La cadena de medición se vuelve concreta cuando seguimos el recorrido de una observación real. Una misión espacial puede registrar el brillo de miles de estrellas durante meses; un espectrógrafo puede medir desplazamientos minúsculos en las líneas de una estrella; un instrumento coronográfico puede separar la luz de un planeta de la luz de su estrella; un interferómetro puede revelar estructuras en un disco donde nacen planetas.

La galería reúne tres niveles relacionados:

- **misión u observatorio:** dónde se organiza la observación y qué población de objetos cubre;
- **instrumento y modo de observación:** cómo se registra la señal;
- **producto de datos:** qué recibe el análisis y qué inferencia permite plantear.

Esta distinción ayuda a ubicar cada ejemplo en la cadena. Kepler, TESS, Hubble, Webb y CHEOPS son misiones u observatorios espaciales. HARPS, ESPRESSO y SPHERE son instrumentos especializados; HARPS y ESPRESSO producen velocidades radiales, mientras SPHERE trabaja con imagen de alto contraste, espectroscopía y polarimetría. ALMA funciona como un observatorio interferométrico de radio.

#### Mapa rápido por modalidad de dato

| Modalidad de observación | Ejemplos | Señal o producto característico | Pregunta planetaria que abre |
| --- | --- | --- | --- |
| Fotometría temporal | Kepler/K2, TESS, CHEOPS | Curva de luz, tránsito, variación de brillo | ¿Qué tamaño, periodo y frecuencia tienen los planetas? |
| Espectroscopía de transmisión y emisión | Hubble, Webb, Ariel | Espectro atmosférico, eclipse, curva de fase | ¿Qué composición, temperatura, nubes o estructura atmosférica son compatibles con la señal? |
| Velocidad radial | HARPS, ESPRESSO | Desplazamiento temporal de líneas espectrales | ¿Qué masa y qué órbita pueden explicar el movimiento de la estrella? |
| Imagen de alto contraste | VLT/SPHERE | Imagen, espectro de baja resolución, polarimetría | ¿Existe un compañero débil? ¿Cómo es su entorno? |
| Radio e interferometría milimétrica | ALMA | Emisión de polvo y moléculas, mapas de discos | ¿Cómo se forman los planetas y qué química acompaña ese proceso? |
| Astrometría y catálogo estelar | Gaia | Posiciones, movimientos, brillo y parámetros estelares | ¿Qué propiedades de la estrella afectan la interpretación de un planeta o de una población? |

#### Tarjetas desplegables para la página del curso

Cada tarjeta puede aparecer cerrada con una miniatura, el nombre del observatorio o instrumento y una frase sobre su modalidad de dato. Al abrirla, el estudiante encuentra la ilustración, la descripción física, la capacidad observacional, el producto de datos, la pregunta científica, el puente con ML y los enlaces institucionales.

> [!example]- Kepler/K2 · la curva de luz como censo de tránsitos
> **Tipo y estado:** misión espacial histórica; sus datos continúan formando parte de archivos de exoplanetas.
>
> **Ilustración sugerida:** representación artística del observatorio y esquema de la geometría de un tránsito. La [página oficial de la misión Kepler](https://science.nasa.gov/mission/kepler/) ofrece la imagen institucional y el contexto histórico.
>
> **Qué permite observar:** disminuciones periódicas del brillo estelar producidas cuando un planeta pasa frente a su estrella. La misión convirtió la fotometría de alta cadencia en un censo estadístico de planetas.
>
> **Producto de datos:** píxeles calibrados, curvas de luz, eventos de cruce de umbral, candidatos, productos de validación, inyecciones y estimaciones de completitud. La [documentación oficial de productos de Kepler](https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html) permite mostrar que una observación genera varias capas de datos.
>
> **Pregunta para la clase:** ¿qué señales periódicas merecen una revisión como posibles tránsitos?
>
> **Puente con ML:** detección de eventos, clasificación de candidatos, búsqueda de señales débiles y priorización de revisiones.
>
> **Idea clave:** una curva de luz conserva información temporal y también la huella de la selección, el ruido y el preprocesamiento.

> [!example]- TESS · ampliar el mapa de planetas cercanos
> **Tipo y estado:** misión espacial de fotometría visible; la página de NASA la presenta como una misión activa con una misión extendida.
>
> **Ilustración sugerida:** mosaico del cielo observado o representación artística de TESS. La [página oficial de TESS](https://science.nasa.gov/mission/TESS/) reúne imágenes, objetivos y descripción de la misión.
>
> **Qué permite observar:** variaciones de brillo en grandes regiones del cielo, con especial valor para estrellas relativamente brillantes y cercanas. El diseño de la misión facilita el seguimiento posterior desde otros observatorios.
>
> **Producto de datos:** series temporales fotométricas, curvas de luz, eventos candidatos y catálogos de objetos variables.
>
> **Pregunta para la clase:** ¿cómo cambia el conjunto de candidatos cuando se amplía la cobertura del cielo y se modifican la cadencia, el ruido y la población estelar?
>
> **Puente con ML:** búsqueda de tránsitos, discriminación entre candidatos y variables estelares, clasificación de señales y priorización de objetivos para observaciones de seguimiento.
>
> **Enlace de contexto:** [misiones de exoplanetas de NASA](https://science.nasa.gov/exoplanets/missions/).

> [!example]- Hubble · observar atmósferas desde el ultravioleta hasta el infrarrojo cercano
> **Tipo y estado:** telescopio espacial en operación, con cobertura ultravioleta, visible e infrarrojo cercano.
>
> **Ilustración sugerida:** imagen del telescopio en órbita junto con un espectro de tránsito. La [página oficial de Hubble](https://science.nasa.gov/mission/hubble/) incluye la descripción del observatorio y el acceso a su galería de imágenes.
>
> **Qué permite observar:** cambios en la luz estelar cuando atraviesa la atmósfera de un exoplaneta, además de procesos estelares y galácticos que aportan contexto a la interpretación.
>
> **Producto de datos:** espectros de transmisión, fotometría, imágenes y series temporales en distintas bandas.
>
> **Pregunta para la clase:** ¿qué rasgos espectrales pueden asociarse con una atmósfera y cuáles admiten explicaciones instrumentales o estelares?
>
> **Puente con ML:** extracción de señales débiles, detección de sistemáticas, clasificación de espectros y estimación de parámetros con incertidumbre.

> [!example]- Webb · estudiar la química y la física de atmósferas
> **Tipo y estado:** observatorio espacial infrarrojo desarrollado por NASA, ESA y CSA; combina imagen y espectroscopía.
>
> **Ilustración sugerida:** representación artística de Webb y esquema de transmisión, emisión o curva de fase. La [página oficial de Webb](https://science.nasa.gov/mission/webb/) ofrece imágenes del observatorio; la explicación de [Webb y la investigación de exoplanetas](https://science.nasa.gov/mission/webb/science-overview/science-explainers/webbs-impact-on-exoplanet-research/) muestra los modos de observación relevantes.
>
> **Qué permite observar:** la luz que atraviesa una atmósfera durante un tránsito, la radiación emitida por el planeta durante un eclipse y los cambios de brillo a lo largo de una órbita. La sensibilidad infrarroja abre acceso a moléculas, nubes, temperaturas y procesos de formación y evolución.
>
> **Producto de datos:** espectros de transmisión y emisión, curvas de fase, imágenes infrarrojas y productos de calibración con incertidumbres asociadas.
>
> **Pregunta para la clase:** ¿cómo pasamos de una diferencia pequeña entre el espectro de la estrella y el espectro estrella-planeta a una hipótesis sobre la atmósfera?
>
> **Puente con ML:** compresión y representación de espectros, detección de rasgos, emulación de modelos de transferencia radiativa, recuperación de parámetros y análisis de poblaciones.
>
> **Enlace de contexto:** [ciencia de Webb](https://science.nasa.gov/mission/webb/science-overview/science-explainers/science-with-webb/).

> [!example]- CHEOPS · medir con precisión el tamaño de mundos conocidos
> **Tipo y estado:** misión de la ESA en operación, dedicada a exoplanetas ya identificados alrededor de estrellas brillantes y cercanas.
>
> **Ilustración sugerida:** representación artística de CHEOPS y una curva de luz de tránsito. La [página oficial de CHEOPS](https://www.esa.int/Science_Exploration/Space_Science/Cheops) ofrece el material visual y el contexto de la misión; su [descripción técnica](https://www.esa.int/Science_Exploration/Space_Science/Cheops/Cheops_overview2) explica el fotómetro de alta precisión.
>
> **Qué permite observar:** tránsitos con precisión suficiente para refinar radios planetarios y, junto con mediciones de masa, densidades medias y composición global.
>
> **Producto de datos:** fotometría de alta precisión, tiempos de tránsito, profundidad del tránsito y parámetros derivados del ajuste de la curva.
>
> **Pregunta para la clase:** ¿qué información adicional aparece cuando el radio de un planeta se mide con mayor precisión?
>
> **Puente con ML:** detección y ajuste de tránsitos, propagación de incertidumbres, comparación de poblaciones y selección de objetivos para caracterización atmosférica.

> [!example]- HARPS y ESPRESSO · convertir desplazamientos espectrales en masas
> **Tipo y estado:** espectrógrafos terrestres de alta resolución y alta estabilidad. HARPS opera en el telescopio de 3,6 m de ESO en La Silla; ESPRESSO trabaja en el Very Large Telescope de ESO en Paranal.
>
> **Ilustración sugerida:** fotografía del espectrógrafo o del conjunto de telescopios, acompañada por una línea espectral cuyo desplazamiento cambia con el tiempo. Las páginas oficiales de [HARPS](https://www.eso.org/sci/facilities/lasilla/instruments/harps/overview.html) y [ESPRESSO](https://www.eso.org/sci/facilities/paranal/instruments/espresso/science.html) permiten enlazar la imagen y la descripción instrumental.
>
> **Qué permite observar:** el movimiento de la estrella alrededor del centro de masa del sistema mediante desplazamientos Doppler de sus líneas espectrales. HARPS alcanza precisiones cercanas a 1 m/s en las condiciones descritas por ESO; ESPRESSO está diseñado para mediciones de precisión extrema, con objetivos por debajo de 10 cm/s en sus modos de mayor resolución.
>
> **Producto de datos:** espectros calibrados, posiciones de líneas, velocidades radiales, errores de medición y series temporales con muestreo irregular.
>
> **Pregunta para la clase:** ¿qué combinación de masas, periodos y actividad estelar explica el movimiento observado?
>
> **Puente con ML:** modelado conjunto de señales planetarias y actividad estelar, detección de periodicidades, regresión con procesos temporales y evaluación de falsos positivos.
>
> **Idea clave:** la masa planetaria suele aparecer como una inferencia dinámica; el instrumento mide el movimiento de la estrella.

> [!example]- VLT/SPHERE · separar la luz de un planeta de la luz de su estrella
> **Tipo y estado:** SPHERE es un instrumento de óptica adaptativa extrema y coronografía instalado en el Very Large Telescope de ESO.
>
> **Ilustración sugerida:** imagen del VLT o de SPHERE junto con una imagen de alto contraste en la que se marque la posición del compañero. La [página oficial de SPHERE](https://www.eso.org/sci/facilities/paranal/instruments/sphere.html) documenta sus capacidades y sus recursos visuales.
>
> **Qué permite observar:** sistemas extrasolares mediante imagen de alto contraste, espectroscopía de baja resolución y polarimetría en el rango óptico y del infrarrojo cercano.
>
> **Producto de datos:** imágenes calibradas, modelos de PSF, mapas de ruido, espectros de baja resolución, polarización y posiciones relativas.
>
> **Pregunta para la clase:** ¿qué estructura espacial o señal espectral permite distinguir un compañero débil de un artefacto óptico?
>
> **Puente con ML:** supresión de la luz estelar, detección de fuentes débiles, clasificación de artefactos, recuperación de compañeros y análisis de imágenes de alto contraste.
>
> **Idea clave:** la geometría espacial y la estructura del ruido forman parte de la evidencia física.

> [!example]- ALMA · seguir la formación de planetas en polvo, gas y moléculas
> **Tipo y estado:** observatorio interferométrico de radio que trabaja en longitudes de onda milimétricas y submilimétricas.
>
> **Ilustración sugerida:** mapa de un disco protoplanetario con anillos, brechas o emisión molecular. La [página oficial de ALMA sobre formación de estrellas y planetas](https://www.almaobservatory.org/en/about-alma/how-alma-works/capabilities/star-and-planet-formation/) explica qué estructuras y procesos puede estudiar; el comunicado sobre [entornos orgánicos ricos en carbono](https://www.almaobservatory.org/en/press-releases/alma-reveals-carbon-rich-organic-birth-environments-of-planets/) ofrece un ejemplo visual y científico.
>
> **Qué permite observar:** distribución de polvo, gas frío y moléculas en discos protoplanetarios; también permite estudiar estructuras que pueden relacionarse con la presencia y formación de planetas.
>
> **Producto de datos:** cubos de datos posición-frecuencia, mapas de intensidad y velocidad, líneas moleculares, continuo de polvo y mediciones de resolución espacial.
>
> **Pregunta para la clase:** ¿qué patrones en un disco son compatibles con la formación de planetas y qué procesos alternativos pueden producirlos?
>
> **Puente con ML:** segmentación de estructuras, clasificación de morfologías, extracción de líneas moleculares, detección de anomalías y comparación entre poblaciones de discos.

#### Instrumentos y misiones que amplían el horizonte

Estas tarjetas pueden aparecer en una sección secundaria o en una diapositiva final de perspectiva. Presentan observaciones futuras y catálogos de apoyo que el grupo encontrará en la literatura.

> [!info]- PLATO · buscar planetas terrestres alrededor de estrellas parecidas al Sol
> **Qué aporta:** fotometría de alta precisión y seguimiento de estrellas brillantes; la misión de la ESA está diseñada para estudiar planetas hasta la zona habitable y caracterizar sus estrellas mediante astrosismología. La página oficial indica 26 cámaras y una fecha de lanzamiento prevista para marzo de 2027; esta fecha debe revisarse antes de publicar la web.
>
> **Producto y puente con ML:** curvas de luz, parámetros estelares y poblaciones de candidatos; detección de tránsitos, estimación de radios y análisis de completitud.
>
> **Ilustración y fuente:** [misión PLATO](https://www.esa.int/Science_Exploration/Space_Science/Plato).

> [!info]- Ariel · comparar atmósferas de una población de exoplanetas
> **Qué aporta:** espectroscopía de tránsito y eclipse en el infrarrojo cercano para estudiar la composición química, la temperatura y las nubes de alrededor de mil planetas en tránsito.
>
> **Producto y puente con ML:** espectros atmosféricos homogéneos y catálogo comparativo; extracción de rasgos, recuperación de parámetros y aprendizaje de relaciones entre propiedades planetarias y composición.
>
> **Ilustración y fuente:** [ficha oficial de Ariel](https://www.esa.int/Science_Exploration/Space_Science/Ariel_factsheet). El estado y el calendario deben revisarse antes de publicar la versión definitiva.

> [!info]- Roman y Gaia · contexto poblacional y nuevas rutas de detección
> **Roman:** el telescopio espacial Nancy Grace Roman abre una ruta de microlente gravitacional para descubrir planetas lejanos y desarrolla capacidades de coronografía para imagen directa. La [página oficial de exoplanetas de Roman](https://science.nasa.gov/mission/roman-space-telescope/exoplanets/) sirve como fuente de la tarjeta; el estado operativo y el calendario requieren verificación en la fecha de publicación.
>
> **Gaia:** la misión astrométrica de la ESA aporta posiciones, movimientos, brillo y propiedades estelares para contextualizar exoplanetas y poblaciones. La [página oficial de Gaia](https://www.esa.int/Science_Exploration/Space_Science/Gaia) registra el cierre de las observaciones científicas y la continuidad de las entregas de datos. Su papel en esta sesión es de catálogo de apoyo.

#### Orden narrativo recomendado

La galería puede avanzar siguiendo la pregunta física que produce cada modalidad:

1. **Detectar un tránsito:** Kepler/K2 y TESS muestran cómo una variación de brillo se transforma en una población de candidatos.
2. **Medir un radio con precisión:** CHEOPS permite conectar la profundidad del tránsito con el tamaño planetario.
3. **Medir una masa dinámica:** HARPS y ESPRESSO muestran que la señal observada corresponde al movimiento de la estrella.
4. **Leer una atmósfera:** Hubble y Webb convierten diferencias espectrales pequeñas en hipótesis sobre composición y temperatura.
5. **Obtener una imagen separada:** VLT/SPHERE introduce la dimensión espacial, la PSF y la supresión de luz estelar.
6. **Seguir la formación:** ALMA lleva la conversación desde planetas detectados hacia discos, polvo, gas y química.
7. **Proyectar el campo:** PLATO, Ariel, Roman y Gaia conectan el presente con poblaciones más grandes y preguntas comparativas.

#### Especificación de interacción para la web

La página puede implementar cada tarjeta con un elemento desplegable basado en details/summary, un acordeón accesible o un componente equivalente. El contenido mínimo de cada tarjeta queda definido así:

| Estado cerrado | Estado abierto |
| --- | --- |
| Miniatura con crédito, nombre, institución y modalidad de dato | Imagen principal o ilustración, descripción física y enlace a la fuente |
| Una frase: «qué señal convierte en dato» | Qué permite observar y qué producto llega al análisis |
| Etiqueta: espacial, terrestre, instrumento o catálogo | Pregunta científica, dificultad observacional, conexión con ML y enlaces de archivo |

Cada imagen debe conservar crédito, licencia o condición de uso, enlace a la página institucional y texto alternativo. La ilustración puede mostrar el observatorio completo, el instrumento, la geometría de observación o un ejemplo del producto de datos; la selección depende de la idea física que acompañe la tarjeta.

Para la primera versión de la web, la selección principal puede contener ocho tarjetas: Kepler/K2, TESS, Hubble, Webb, CHEOPS, HARPS/ESPRESSO, VLT/SPHERE y ALMA. PLATO, Ariel, Roman y Gaia quedan como tarjetas de perspectiva y contexto. La galería completa puede crecer después junto con la rama de problemas astronómicos y la nota atómica **Cadena de medición planetaria**.

### Texto para decir

> «Entre el planeta y la tabla que usamos en un notebook existe una cadena de medición. El planeta produce o modifica una señal; la señal viaja por el sistema; el instrumento la transforma en una medición; después aplicamos calibraciones y procedimientos de extracción.
>
> Cada etapa puede introducir incertidumbre, selección o pérdida de información. Cuando un modelo aprende a partir de los datos, aprende también las regularidades y limitaciones que quedaron incorporadas en esa cadena. Por eso necesitamos conocer el origen de los datos antes de interpretar la salida.»

### Cuatro preguntas de control

1. ¿Qué magnitud se mide?
2. ¿Qué magnitud queremos inferir?
3. ¿Qué transformaciones ocurrieron entre ambas?
4. ¿Qué explicaciones alternativas producen una señal parecida?

### Concepto pendiente de atomización

Esta unidad propone crear posteriormente una nota atómica llamada **Cadena de medición planetaria**, probablemente dentro de la rama de problemas astronómicos.

## 11. Unidad 5 — Qué tipos de datos utilizamos

### Pregunta de la unidad

> ¿Qué forma tienen los datos con los que intentamos responder preguntas planetarias?

### Jerarquía de los datos para el curso

La lista reúne elementos de naturaleza diferente. Una curva de luz y una imagen describen señales registradas por un instrumento; un catálogo organiza parámetros de muchos objetos; una simulación produce datos a partir de un modelo físico; una inyección construye un caso controlado para evaluar un método. La galería puede conservar todas estas entradas si cada una ocupa su nivel correspondiente.

Para leer cualquier conjunto de datos usaremos tres preguntas:

1. **Origen:** ¿proviene de una observación, de una transformación, de un modelo físico o de una construcción para evaluación?
2. **Estructura:** ¿se organiza en tiempo, longitud de onda, espacio, fase orbital o población?
3. **Relación física:** ¿qué propiedad o proceso planetario deja su huella en esa estructura?

Estas familias funcionan como niveles de lectura y también como etiquetas que pueden coexistir. Una curva de luz puede ser observacional por su origen, calibrada por su procesamiento e inyectada cuando se usa para evaluar la recuperación de una señal. Un catálogo puede reunir mediciones observacionales, parámetros derivados y resultados de modelos. La jerarquía organiza la explicación; las etiquetas registran la historia completa del dato.

~~~mermaid
graph TD
  A["Datos usados en ciencias planetarias"] --> B["Observacionales"]
  A --> C["Derivados y poblacionales"]
  A --> D["Simulados"]
  A --> E["Construidos para evaluación"]
  B --> B1["Fotometría"]
  B --> B2["Espectroscopía"]
  B --> B3["Imagen de alto contraste"]
  C --> C1["Organización temporal y productos derivados"]
  C1 --> C2["Serie espectroscópica"]
  C1 --> C3["Velocidad radial"]
  C1 --> C4["Producto calibrado o extraído"]
  C --> C5["Catálogo"]
  D --> D1["Simulación dinámica"]
  D --> D2["Modelo atmosférico sintético"]
  E --> E1["Datos inyectados"]
~~~

#### 1. Datos observacionales: señales registradas por instrumentos

Esta familia contiene la medición que llega desde un sistema planetario después de atravesar el detector y la calibración inicial. Sus ramas principales corresponden a la interacción física que produce la señal.

| Modalidad observacional | Representación habitual | Preguntas que permite plantear | Dificultades y límites |
| --- | --- | --- | --- |
| Fotometría temporal | Curva de luz: flujo en función del tiempo | ¿Hay un tránsito? ¿Cuál es el periodo? ¿Qué señales requieren revisión? | Ruido, actividad estelar, huecos, tendencias y señales confundibles |
| Espectroscopía | Espectro: flujo o intensidad en función de la longitud de onda | ¿Qué moléculas, temperaturas o nubes son compatibles con la señal? | Problema inverso, degeneraciones, baja relación señal-ruido y cobertura incompleta |
| Imagen de alto contraste | Mapa espacial de intensidad cerca de una estrella | ¿Existe un compañero débil? ¿Dónde está? ¿Qué estructura presenta? | Luz estelar, PSF, speckles, falsos positivos y baja señal |

#### 2. Organización temporal y productos derivados

Estas entradas describen operaciones o productos que nacen a partir de una modalidad observacional. Su posición en la jerarquía evita presentar una serie espectroscópica y una medición de velocidad radial como familias independientes de la espectroscopía.

| Producto u organización | Depende de | Qué se representa | Preguntas que permite plantear | Dificultades y límites |
| --- | --- | --- | --- | --- |
| Serie espectroscópica | Espectros repetidos durante el tiempo o la fase orbital | Colección ordenada de espectros, a menudo como matriz longitud de onda–tiempo o longitud de onda–fase | ¿Cómo cambia la señal atmosférica? ¿Qué componentes varían con la fase? | Alta dimensión, dependencia temporal, cobertura irregular y sistemáticas instrumentales |
| Velocidad radial | Desplazamientos de las líneas espectrales | Serie temporal de velocidades de la estrella, con errores de medición | ¿Qué masas y órbitas pueden explicar el movimiento? | Actividad estelar, muestreo irregular, señales periódicas superpuestas y calibración instrumental |
| Producto calibrado o extraído | Píxeles, espectros o imágenes iniciales | Señal corregida, normalizada o resumida para el análisis | ¿Qué información se conserva después de cada transformación? | Supuestos de calibración, pérdida de información, propagación de incertidumbres y decisiones de preprocesamiento |

La **serie espectroscópica** organiza observaciones repetidas. La **velocidad radial** condensa información espectral en una medida cinemática derivada. Ambas conservan una conexión directa con la señal observada y requieren rastrear las transformaciones que las producen.

#### 3. Productos derivados y poblacionales

| Producto | Qué reúne | Preguntas que permite plantear | Dificultades y límites |
| --- | --- | --- | --- |
| Catálogo | Parámetros resumidos de muchas estrellas, planetas o sistemas, junto con identificadores, incertidumbres y criterios de selección | ¿Qué poblaciones existen? ¿Qué objetos son atípicos? ¿Cómo cambian las distribuciones entre campañas o métodos? | Sesgo de selección, heterogeneidad, datos faltantes, incertidumbres con escalas distintas y dependencia entre entradas |

El catálogo ocupa el nivel de población. Puede reunir mediciones observacionales, parámetros derivados, resultados de modelos y metadatos de calidad. Su unidad de análisis suele ser el objeto, la estrella, el planeta o el sistema completo.

#### 4. Datos simulados: explorar relaciones físicas controladas

| Producto simulado | Proceso representado | Preguntas que permite plantear | Dificultades y límites |
| --- | --- | --- | --- |
| Simulación dinámica | Evolución calculada de un sistema planetario bajo condiciones iniciales y leyes físicas especificadas | ¿Qué configuraciones son estables? ¿Qué resonancias o arquitecturas pueden persistir? | Dominio finito, costo computacional, condiciones iniciales, simplificaciones y supuestos del modelo físico |
| Modelo atmosférico sintético | Espectro generado a partir de parámetros atmosféricos, estelares y orbitales elegidos | ¿Qué relación existe entre parámetros físicos y señales observables? ¿Qué escenarios producen espectros parecidos? | Sim-to-real gap, cobertura del prior, opacidades, etiquetas perfectas artificiales y fidelidad del modelo |

Los datos simulados ofrecen control sobre las variables físicas y permiten construir etiquetas conocidas. Su utilidad para ML depende de la relación entre el dominio simulado y las observaciones que llegarán durante la aplicación.

#### 5. Datos construidos para evaluar un método

| Construcción | Cómo se obtiene | Pregunta de evaluación | Dificultades y límites |
| --- | --- | --- | --- |
| Datos inyectados | Señales artificiales introducidas en datos reales o simulados, con parámetros de la inyección registrados | ¿Se recupera una señal conocida bajo diferentes niveles de ruido, muestreo y sistemáticas? | El realismo de la inyección, la representatividad del fondo y la separación entre generación y evaluación |

Los datos inyectados forman una capa experimental. Pueden conservar la estructura de una curva de luz, un espectro o una imagen y añaden una señal cuyo origen se conoce. Por eso sirven para medir recuperación, completitud, sensibilidad y falsos negativos.

#### Lectura vertical de la jerarquía

Un mismo proyecto puede recorrer varias capas:

1. una estrella y su planeta generan una señal física;
2. un instrumento registra fotometría, espectroscopía o imagen;
3. el procesamiento produce una curva de luz, un espectro calibrado, una velocidad radial o una imagen de alto contraste;
4. un catálogo reúne muchos objetos y sus incertidumbres;
5. simulaciones e inyecciones permiten estudiar el dominio físico y evaluar la recuperación de señales;
6. un modelo de ML trabaja sobre una de esas representaciones con una tarea y una evaluación definidas.

Esta lectura ofrece un vocabulario común para las tres líneas del curso: problema científico, representación de datos y decisión sobre el uso de ML.

El [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/docs/PASP_FINAL_The.NASA.Exoplanet.Archive.Data.and.Tools.for.Exoplanet.Research_July2013.pdf) documenta tablas de propiedades, curvas de luz, imágenes, espectros y mediciones de velocidad radial, además de herramientas para trabajar con esos productos. La [documentación de productos de Kepler](https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html) muestra que una misión produce muchas capas: píxeles, curvas de luz, eventos de cruce de umbral, candidatos, productos de validación, inyecciones y estimaciones de completitud.

### Texto para decir

> «Cuando decimos “tenemos datos”, todavía faltan varias preguntas. ¿Son mediciones directas o indirectas? ¿Están calibradas? ¿Qué incertidumbre tienen? ¿Qué objetos fueron observados y cuáles quedaron fuera? ¿Qué transformaciones se aplicaron? ¿Las etiquetas provienen de observaciones, de expertos, de un catálogo o de una simulación?
>
> El formato del archivo importa y la historia de la medición orienta su interpretación. Un conjunto de espectros sintéticos puede tener parámetros conocidos y etiquetas limpias. Un conjunto de espectros observados puede tener ruido, modelos incompletos y degeneraciones. Cada tipo de dato sirve para objetivos diferentes.»

### Elementos visuales de la galería de datos

Las tarjetas de esta unidad se refieren a tipos de datos y a sus representaciones analíticas. Conviene mantenerlas separadas de las tarjetas de observatorios e instrumentos de la Unidad 4.

- un esquema o miniatura;
- nombre del dato;
- familia y origen del dato;
- eje o dimensión principal;
- una pregunta científica;
- una dificultad;
- una relación con una tarea de ML;
- un enlace a la fuente o documentación;
- una etiqueta: observacional, derivado, simulado o inyectado.

### Actividad de clasificación

El grupo recibe las siguientes parejas:

~~~
espectro → abundancia
curva de luz → candidato
catálogo → población
simulación → estabilidad
imagen → compañero débil
~~~

Para cada pareja debe responder:

1. ¿Cuál es la unidad de análisis?
2. ¿Qué información entra?
3. ¿Qué salida se quiere?
4. ¿Qué fuente de incertidumbre domina?

## 12. Unidad 6 — Cuándo puede ayudar el aprendizaje automático

### Pregunta de la unidad

> ¿Qué dificultad científica puede aliviar ML en cada problema?

### Mapa de funciones

| Dificultad | Función posible de ML | Salida | Condición de confianza |
| --- | --- | --- | --- |
| Demasiadas observaciones | Búsqueda, clasificación o priorización | Ranking o probabilidad | Etiquetas y evaluación representativas |
| Señal débil o mezclada | Detección y discriminación | Candidato, máscara o score | Control de falsos positivos |
| Relación compleja entre señal y propiedad | Regresión o inferencia aproximada | Parámetro o distribución | Modelo de medición y cobertura del dominio |
| Simulación muy costosa | Emulación o surrogate model | Evolución o resultado aproximado | Validación física y rango de aplicación |
| Catálogo con pocas etiquetas | Representación, clustering o anomalías | Grupo, embedding o caso raro | Interpretación posterior y control de selección |
| Muchas observaciones posibles | Priorización o decisión | Acción o siguiente objetivo | Función de utilidad y costo de observación |

### Texto para decir

> «ML puede ocupar varias posiciones de la cadena. Cada posición plantea un problema distinto. Clasificar una curva de luz, estimar una abundancia, encontrar un grupo de objetos y decidir qué observar después requieren salidas y evaluaciones diferentes.
>
> La herramienta se justifica cuando responde a una dificultad concreta. La pregunta “¿qué modelo moderno puedo aplicar?” debe transformarse en “¿qué parte del problema necesito automatizar, aproximar o explorar?”»

### Cinco verbos de la sesión

El estudiante debe aprender a distinguir:

- **detectar:** reconocer una señal o evento;
- **clasificar:** asignar una categoría o probabilidad;
- **estimar:** producir un valor o una distribución;
- **describir:** encontrar estructura o representación;
- **priorizar:** ordenar casos u observaciones según una utilidad.

Generar datos sintéticos puede aparecer como extensión y requiere una pregunta sobre distribución, cobertura y validez física.

## 13. Unidad 7 — Hitos, escala e impacto: qué problema había y qué habilitó ML

### Propósito narrativo

Esta unidad debe funcionar como una galería de impacto cuantificado. La pregunta que la abre es:

> ¿Qué cambió en la práctica cuando ML entró en una cadena de datos planetarios?

Cada ejemplo se cuenta con la misma secuencia:

1. **Situación científica:** ¿qué queríamos saber?
2. **Escala del problema:** ¿cuántas estrellas, señales, simulaciones o espectros entraban al análisis?
3. **Cuello de botella:** ¿qué hacía difícil responderlo con el procedimiento disponible?
4. **Intervención de ML:** ¿en qué parte de la cadena ayudó?
5. **Cifra de impacto:** ¿qué cambió en tiempo, volumen, ranking, candidatos, validaciones o espacio explorado?
6. **Significado científico:** ¿qué pregunta se pudo ampliar?
7. **Condición y límite:** ¿qué supuestos, etiquetas, simulaciones o validaciones sostienen la cifra?

La cifra debe llevar siempre su unidad y su estatus: estrellas observadas, curvas de luz procesadas, señales candidatas, planetas estadísticamente validados, sistemas simulados, segundos de inferencia o factor de aceleración. Esta precisión permite contar resultados llamativos sin convertir candidatos en planetas confirmados ni conjuntos de entrenamiento en descubrimientos.

### Panel de impacto cuantificado

| Caso | Escala o cuello de botella | Cifra que se puede mostrar | Lectura científica |
| --- | --- | --- | --- |
| Kepler y clasificación de candidatos (McCauliff et al., 2015) | En los primeros tres años, la misión observó más de 200 000 estrellas y produjo 18 406 señales tipo tránsito | 3 697 candidatos de planeta entre esas señales | El problema de revisión ya tenía escala poblacional antes de aplicar ML; la clasificación ayuda a ordenar el trabajo de vetting |
| Estabilidad dinámica (Tamayo et al., 2016) | Explorar la estabilidad de sistemas compactos requiere integraciones N-body extensas | 3 órdenes de magnitud de aceleración en el régimen de \(10^7\) órbitas; tiempo aproximado de \(1/1000\) frente a la integración directa | Un modelo sustituto convierte una exploración costosa en una consulta rápida dentro de un dominio validado |
| SPOCK para estabilidad de largo plazo (Tamayo et al., 2020) | Predecir estabilidad durante \(10^9\) órbitas a partir de integraciones completas | Hasta \(10^5\) de aceleración; entrenamiento con aproximadamente 100 000 sistemas de tres planetas y estadísticas de las primeras \(10^4\) órbitas | La cifra de 100 000 corresponde a sistemas simulados usados para entrenar; representa cobertura del dominio, no planetas descubiertos |
| AstroNet en Kepler (Shallue y Vanderburg, 2018) | Señales débiles y falsos positivos dentro de sistemas multiplanetarios | 98,8 % de los casos del conjunto de prueba con una señal planetaria plausible ubicada por encima de un falso positivo; 2 planetas estadísticamente validados | ML recuperó señales que merecían una nueva revisión y contribuyó a ampliar sistemas conocidos |
| AstroNet-K2 (Dattilo et al., 2019) | Las campañas K2 cubren entornos galácticos distintos y requieren una identificación homogénea | 98 % de exactitud en el conjunto de prueba; 2 exoplanetas previamente desconocidos identificados y validados | La transferencia entre campañas exige atender al cambio de dominio y conservar supervisión humana |
| Validación probabilística de Kepler (Armstrong et al., 2021) | Miles de candidatos requieren métricas de vetting y comparación frente a escenarios falsos | Miles de candidatos no vistos pueden validarse en segundos una vez calculadas las métricas; 50 candidatos de Kepler fueron validados como planetas | La automatización aumenta el caudal de validación; la cifra depende de la entrada disponible y de los controles del procedimiento |
| RAVEN en TESS (Lafarga et al., 2026) | Una muestra de más de 2,2 millones de estrellas observadas en cuatro años de imágenes de campo completo | 118 planetas estadísticamente validados, incluidos 31 detectados por el estudio; más de 2 000 candidatos vetados, con aproximadamente 1 000 nuevos | Un pipeline combina búsqueda, clasificación, simulaciones realistas y validación; la cifra distingue planetas validados de candidatos |
| T16 en imágenes de campo completo de TESS (Roth et al., 2026) | Buscar tránsitos alrededor de estrellas débiles en un archivo masivo de curvas de luz | 83 717 159 curvas de luz; 11 554 candidatos, de los cuales 10 091 eran nuevos; 1 Júpiter caliente confirmado mediante seguimiento de velocidad radial | La escala de candidatos puede crecer en varios órdenes; el seguimiento independiente conserva el paso de candidato a planeta |

Las dos últimas filas deben aparecer como resultados recientes con fecha visible. La ficha de RAVEN figura aceptada para publicación y la ficha de T16 figura aceptada para publicación en las versiones consultadas; el estado editorial y los números deben revisarse antes de publicar la web.

> [!important] Cómo usar las cifras en clase
> «100 000» puede referirse a sistemas planetarios simulados, «83 millones» a curvas de luz, «10 091» a candidatos nuevos, «118» a planetas estadísticamente validados y «1» a un planeta confirmado mediante seguimiento. Cada número responde a una etapa distinta de la cadena.
>
> El vocabulario importa: **candidato**, **vetado**, **validado estadísticamente** y **confirmado** describen estados de evidencia diferentes. El modelo puede encontrar o priorizar una señal; la conclusión planetaria incorpora datos auxiliares, controles y una evaluación de falsos positivos.

### Secuencia de casos para la exposición

| Orden | Caso | Cifra principal | Idea que debe quedar |
| ---: | --- | --- | --- |
| 1 | Kepler y el cribado de candidatos | \(>200\,000\) estrellas → 18 406 señales → 3 697 candidatos | El volumen de datos crea una tarea de priorización |
| 2 | Estabilidad orbital | \(10^3\) de aceleración; después, hasta \(10^5\) con SPOCK | Un modelo sustituto cambia el costo de explorar un espacio físico |
| 3 | Señales débiles en Kepler/K2 | 98,8 % de ranking; 98 % de exactitud en K2; 2 + 2 planetas validados en los dos estudios | La revisión automatizada puede rescatar señales de archivos existentes |
| 4 | Validación de candidatos | 50 planetas validados; miles de candidatos en segundos | La velocidad adquiere valor cuando conserva escenarios falsos y controles |
| 5 | TESS a gran escala | 2,2 millones de estrellas en RAVEN; 83,7 millones de curvas en T16 | El reto pasa de encontrar datos a procesar y validar poblaciones enormes |

La línea temporal queda como apoyo visual. El panel y la secuencia oral llevan la atención hacia la comparación cuantitativa: escala del archivo, costo del procedimiento, magnitud de la aceleración y estatus de los resultados.

### 13.1. Kepler: de miles de señales a candidatos que merecen atención

**Problema científico.** Las búsquedas de tránsitos producen un gran número de señales candidatas. Cada señal puede corresponder a un planeta, a una binaria eclipsante, a una variación estelar, a un artefacto instrumental o a una combinación de efectos. El equipo científico necesita revisar y priorizar casos.

**Qué aportó ML.** McCauliff et al. desarrollaron una clasificación automática de candidatos de tránsito a partir de productos derivados de Kepler. La idea didáctica central es que un modelo puede ayudar a ordenar y filtrar una población grande, mientras la decisión científica conserva una etapa de validación.

**Cifra de impacto.** El estudio reportó un error global de 5,85 % y un error de 2,81 % al clasificar candidatos de planeta dentro de su conjunto de evaluación. La cifra describe el rendimiento del clasificador en el experimento y acompaña la escala de 18 406 señales tipo tránsito.

**Qué debe decir el docente.**

> «El modelo recibe una representación de la señal medida y aprende a distinguir patrones asociados con candidatos más o menos plausibles. La pregunta práctica es: ¿qué casos conviene examinar primero y qué falsos positivos debemos conservar para mantener abierta su revisión?»

**Qué habilitó.**

- triage de grandes archivos observacionales;
- uso de diagnósticos derivados de una búsqueda previa;
- priorización del tiempo de inspección humana;
- discusión explícita de etiquetas, desbalance y falsos negativos.

**Preguntas para el grupo.**

1. ¿Qué significa una etiqueta positiva en este contexto: planeta confirmado, candidato confiable o señal parecida a ejemplos previos?
2. ¿Qué población representa el entrenamiento y qué población adicional queremos evaluar?
3. ¿Qué costo tiene enviar un falso positivo a revisión? ¿Y descartar un planeta real?

**Límite que debe quedar visible.** Una clasificación automática aporta un primer nivel de evidencia. La confirmación de un candidato como planeta requiere evidencia adicional, coherencia física y procedimientos de validación.

**Referencia principal.** McCauliff et al. (2015), [Automatic Classification of Kepler Planetary Transit Candidates](https://doi.org/10.1088/0004-637X/806/1/6).

### 13.2. Estabilidad orbital: aproximar una simulación costosa

**Problema científico.** Para saber si una configuración planetaria permanece estable, la vía física directa consiste en integrar las ecuaciones de movimiento durante escalas de tiempo adecuadas. Explorar millones de configuraciones puede ser demasiado costoso.

**Qué aportó ML.** Tamayo et al. entrenaron un clasificador basado en XGBoost con resultados de integraciones dinámicas. El modelo aprendió una frontera aproximada entre configuraciones estables e inestables. En el régimen estudiado, la predicción fue aproximadamente 1 000 veces más rápida que repetir la integración para cada caso: tres órdenes de magnitud sobre una escala de \(10^7\) órbitas.

**Continuación cuantitativa.** El trabajo de SPOCK llevó la idea hacia escalas de \(10^9\) órbitas. El modelo utilizó estadísticas de las primeras \(10^4\) órbitas, alcanzó aceleraciones de hasta \(10^5\) frente a simulaciones completas y se entrenó con aproximadamente 100 000 sistemas simulados de tres planetas.

**Qué debe decir el docente.**

> «La dinámica genera ejemplos y define qué significa estable en el experimento. ML aprende una aproximación rápida para consultar muchos casos. El modelo es valioso porque permite explorar; su responsabilidad científica consiste en demostrar dónde sigue siendo confiable.»

**Qué habilitó.**

- exploración rápida de espacios de parámetros;
- uso de ML como modelo sustituto de una simulación;
- búsqueda de configuraciones prometedoras antes de invertir cómputo costoso;
- conversación sobre velocidad, error y dominio de aplicación.

**Preguntas para el grupo.**

1. ¿Qué variable es la salida: una trayectoria, una etiqueta estable/inestable o una probabilidad?
2. ¿Qué evidencia complementaria necesita una solución rápida para ser confiable?
3. ¿Qué ocurre con una configuración muy distinta de las usadas durante el entrenamiento?

**Límite que debe quedar visible.** El modelo hereda el significado de estabilidad, la física y el rango de parámetros definidos por sus simulaciones. La extrapolación a otra arquitectura planetaria, otra escala temporal o una definición distinta de estabilidad requiere evaluación adicional.

**Referencia principal.** Tamayo et al. (2016), [A Machine Learns to Predict the Stability of Tightly Packed Planetary Systems](https://arxiv.org/abs/1610.05359).

### 13.3. Curvas de luz: encontrar señales que quedaron abajo en la lista

**Problema científico.** Las curvas de luz contienen eventos de tránsito, ruido, variabilidad estelar y artefactos. Las búsquedas iniciales producen rankings. Una señal débil puede quedar relegada y conservar información planetaria relevante.

**Qué aportó ML.** Shallue y Vanderburg usaron aprendizaje profundo sobre curvas de luz de Kepler para reconocer patrones de tránsito en candidatos y en sistemas ya conocidos. El modelo ubicó señales planetarias plausibles por encima de falsos positivos en el 98,8 % de los casos del conjunto de prueba y contribuyó a validar dos planetas: uno en la cadena resonante de Kepler-80 y otro que convirtió a Kepler-90 en un sistema de ocho planetas conocidos.

**Qué debe decir el docente.**

> «La contribución está en revisar de otra manera una señal que ya existía en los datos. El sistema aprende qué estructura temporal se parece a un tránsito. La salida inicial es un ranking o una puntuación. La evidencia planetaria se construye después con más pruebas.»

**Qué habilitó.**

- recuperación de señales débiles en archivos existentes;
- análisis conjunto de segmentos de la curva de luz;
- priorización de señales para validación;
- ejemplo claro de colaboración entre automatización y revisión astronómica.

**Preguntas para el grupo.**

1. ¿Por qué una red puede beneficiarse de la forma completa de la curva junto con características resumidas?
2. ¿Qué sesgo aparece si se entrena con planetas grandes y señales profundas?
3. ¿La salida del modelo es una detección, una confirmación o una recomendación de revisión?

**Límite que debe quedar visible.** La red aprende patrones presentes en una población de datos y en un procedimiento de etiquetado. Cambios de misión, ruido, actividad estelar o distribución de planetas pueden producir un desplazamiento de dominio.

**Referencia principal.** Shallue y Vanderburg (2018), [Identifying Exoplanets with Deep Learning](https://doi.org/10.3847/1538-3881/aa9e09).

### 13.4. Espectros atmosféricos: aproximar la recuperación de parámetros

**Problema científico.** Un espectro planetario contiene información sobre temperatura, composición, nubes, presión y propiedades del modelo atmosférico. Inferir estos parámetros suele requerir recorrer una rejilla de modelos y comparar con los datos, proceso que puede ser costoso y degenerado.

**Qué aportó ML.** Márquez-Neila et al. plantearon una recuperación supervisada con bosques aleatorios entrenados sobre una rejilla precomputada de modelos atmosféricos. El modelo produjo estimaciones y distribuciones posteriores aproximadas para los parámetros estudiados, con una comparación frente a métodos de muestreo más costosos.

**Qué debe decir el docente.**

> «El modelo aprende una relación entre espectros sintéticos y parámetros definidos por una familia de modelos atmosféricos. El resultado es útil cuando la rejilla representa la pregunta física, cubre el rango relevante y la incertidumbre acompaña la estimación.»

**Qué habilitó.**

- recuperación rápida sobre una rejilla de modelos;
- evaluación de muchas hipótesis atmosféricas;
- representación de la salida como parámetros con incertidumbre;
- discusión de degeneraciones entre propiedades atmosféricas.

**Preguntas para el grupo.**

1. ¿Qué hipótesis está incluida antes de entrenar: composición, nubes, geometría, ruido y rango de parámetros?
2. ¿Qué diferencia hay entre predecir una abundancia y demostrar que esa abundancia está presente?
3. ¿Cómo se detecta que el espectro observado está fuera de la rejilla de entrenamiento?

**Límite que debe quedar visible.** Las degeneraciones del problema inverso permanecen en una recuperación rápida. También puede producirse una confianza excesiva cuando la observación, el ruido o la física real carecen de representación en los datos sintéticos.

**Referencia principal.** Márquez-Neila et al. (2018), [Supervised atmospheric retrieval for exoplanets](https://doi.org/10.1038/s41550-018-0504-2).

### 13.5. ExoGAN: acelerar una recuperación y mantener visible la física

**Problema científico.** Las recuperaciones atmosféricas pueden requerir muchas evaluaciones de modelos. Los tiempos de cómputo dificultan explorar grandes conjuntos de espectros o realizar análisis repetidos.

**Qué aportó ML.** Zingales y Waldmann propusieron ExoGAN, un enfoque generativo para aproximar la relación entre espectros y parámetros atmosféricos. En la comparación presentada por los autores, el procedimiento podía reducir sustancialmente el tiempo de inferencia respecto de un muestreo tradicional en un caso de prueba.

**Qué debe decir el docente.**

> «La velocidad abre posibilidades experimentales. La pregunta física exige revisar qué modelos sintéticos generaron los ejemplos, qué observaciones estaban cubiertas y cómo se comporta la salida cuando aparecen nubes, ruido o combinaciones fuera del entrenamiento.»

**Qué habilitó.**

- una forma de emular una recuperación costosa;
- comparación entre velocidad y fidelidad;
- uso de modelos generativos como aproximadores de una familia física;
- discusión de validación cruzada entre métodos.

**Límite que debe quedar visible.** La aceleración puede depender fuertemente de la configuración experimental. Si el modelo opera fuera de la distribución aprendida, la salida puede ser plausible visualmente y físicamente incorrecta.

**Referencia principal.** Zingales y Waldmann (2018), [ExoGAN: Retrieving Exoplanetary Atmospheres Using Deep Convolutional Generative Adversarial Networks](https://doi.org/10.3847/1538-3881/aae77c).

### 13.6. Imágenes de alto contraste: distinguir compañero y speckle

**Problema científico.** En imagen directa, la luz de la estrella puede ocultar una señal planetaria muy débil. La estructura de speckles y el procesamiento instrumental producen patrones que se confunden con un compañero.

**Qué aportó ML.** Gómez González, Absil y Van Droogenbroeck exploraron clasificadores supervisados con imágenes simuladas e inyecciones sintéticas para separar señales planetarias de ruido estructurado. El ejemplo permite presentar el aprendizaje como una decisión de detección condicionada por el instrumento, el contraste y la separación angular.

**Qué debe decir el docente.**

> «La tarea consiste en decidir si un punto sigue siendo compatible con una señal planetaria después de considerar el patrón instrumental. Los ejemplos sintéticos permiten entrenar y exigen una comprobación: las simulaciones deben representar con suficiente fidelidad los datos reales.»

**Qué habilitó.**

- detección asistida en imágenes con fondo estructurado;
- aprendizaje de diferencias entre señal inyectada y speckles;
- comparación con pipelines clásicos de reducción;
- discusión sobre sensibilidad y tasa de falsos positivos.

**Preguntas para el grupo.**

1. ¿Qué parte de la imagen contiene información sobre la señal y cuál contiene información sobre el instrumento?
2. ¿Qué sesgo aparece si todas las inyecciones sintéticas son más limpias que los datos?
3. ¿Qué métrica importa: precisión global, completitud, tasa de falsos positivos o contraste de detección?

**Límite que debe quedar visible.** Un resultado obtenido con inyecciones sintéticas necesita validación en observaciones reales y en distintos regímenes instrumentales. El rendimiento en un conjunto simulado requiere una comprobación específica antes de atribuir una mejora a la capacidad observacional.

**Referencia principal.** Gómez González et al. (2018), [Supervised detection of exoplanets in high-contrast imaging](https://doi.org/10.1051/0004-6361/201731961).

### 13.7. Validación de candidatos: combinar score y evidencia

**Problema científico.** Una detección candidata debe distinguirse de escenarios alternativos: binarias eclipsantes, contaminantes, variabilidad estelar o efectos instrumentales. El objetivo es estimar qué tan plausible es la hipótesis planetaria bajo la evidencia disponible.

**Qué aportó ML.** Armstrong et al. desarrollaron un procedimiento de validación con aprendizaje automático que contribuyó a validar 50 planetas de Kepler. Una vez calculadas las métricas de vetting y los metadatos aplicables, el método puede validar miles de candidatos no vistos en segundos. Este ejemplo permite separar dos acciones que los estudiantes suelen mezclar: producir una puntuación de clasificación y construir una conclusión probabilística respaldada por controles, datos auxiliares y supuestos explícitos.

**Qué debe decir el docente.**

> «Una probabilidad de modelo debe interpretarse dentro de un procedimiento. La cifra depende de la población, las etiquetas, los falsos positivos incluidos y las hipótesis sobre el sistema. La validación científica requiere preguntar qué alternativas se descartaron y con qué evidencia.»

**Qué habilitó.**

- validación homogénea de poblaciones de candidatos;
- análisis probabilístico de escenarios alternativos;
- integración de variables de candidatos con conocimiento astronómico;
- ejemplo de ML como componente de una cadena de evidencia.

**Límite que debe quedar visible.** La salida depende del conjunto de entrenamiento, de la población de referencia y de la calidad de los diagnósticos de entrada. La validación necesita independencia entre datos de desarrollo y casos presentados como nuevos.

**Referencia principal.** Armstrong et al. (2021), [Exoplanet validation with machine learning: 50 new validated Kepler planets](https://doi.org/10.1093/mnras/stab3692).

### 13.8. Banco de ejemplos opcionales para ampliar la sesión

Estos trabajos pueden aparecer como tarjetas adicionales o quedar en la lectura complementaria. Cada uno abre una conexión distinta con las tres ramas del curso.

| Trabajo | Pregunta que abre | Uso didáctico |
| --- | --- | --- |
| Waldmann (2016), [Dreaming of Atmospheres](https://doi.org/10.3847/0004-637X/820/2/107) | ¿Cómo puede el aprendizaje profundo entrar en la caracterización atmosférica? | Puente temprano entre espectros, representación y recuperación |
| Pearson, Palafox y Griffith (2018), [Searching for Exoplanets Using Artificial Intelligence](https://doi.org/10.1093/mnras/stx2761) | ¿Cómo se organiza una búsqueda de exoplanetas con IA? | Panorama para distinguir detección, clasificación y confirmación |
| Ofman et al. (2022), [Machine learning classification of exoplanet candidates in TESS data](https://doi.org/10.1016/j.newast.2021.101693) | ¿Qué cambia al trasladar la clasificación a otra misión? | Discusión sobre desplazamiento de dominio entre Kepler y TESS |
| Zhao y Ni (2021), [Machine learning for the interior structures of rocky exoplanets](https://doi.org/10.1051/0004-6361/202140375) | ¿Cómo se infieren estructuras internas a partir de propiedades globales? | Ejemplo de inferencia y degeneración física |
| Nixon y Madhusudhan (2020), [Assessment of machine learning techniques for atmospheric retrieval](https://academic.oup.com/mnras/article/496/1/269/5858025) | ¿Cómo se evalúa críticamente un recuperador? | Lectura para comparar precisión, velocidad y extrapolación |
| Zorzan et al. (2025), [A machine-learning-ready dataset for exoplanet atmospheric retrieval](https://doi.org/10.3847/1538-4365/adb03a) | ¿Qué hace que un conjunto sea realmente utilizable para ML? | Conexión con datos, formatos, cobertura, etiquetas y reproducibilidad |
| Tamayo et al. (2020), [Predicting the long-term stability of compact multiplanet systems](https://doi.org/10.1073/pnas.2001258117) | ¿Qué significa acelerar hasta \(10^5\) una predicción de estabilidad? | Ejemplo de surrogate model, horizonte temporal y cobertura del entrenamiento |
| Dattilo et al. (2019), [Identifying Exoplanets with Deep Learning II](https://doi.org/10.3847/1538-3881/ab0e12) | ¿Qué ocurre cuando una red se traslada de Kepler a campañas K2? | Ejemplo de cambio de dominio y recuperación de dos planetas |
| Lafarga et al. (2026), [Automatic search for transiting planets in TESS-SPOC FFIs with RAVEN](https://arxiv.org/abs/2603.22597) | ¿Qué escala alcanza una búsqueda uniforme en más de 2,2 millones de estrellas? | Resultado reciente: candidatos, vetting y validación en una misma cadena |
| Roth et al. (2026), [The T16 Planet Hunt](https://arxiv.org/abs/2604.18579) | ¿Qué aparece al procesar decenas de millones de curvas de luz de TESS? | Ejemplo de expansión del censo de candidatos y necesidad de seguimiento |

### 13.9. Cierre de la galería

La galería termina con una matriz común. El docente puede pedir que cada grupo ubique los ejemplos:

| Caso | Entrada | Salida | Tarea | Riesgo principal |
| --- | --- | --- | --- | --- |
| Kepler | Diagnósticos de candidato | Clase o score | Clasificación/priorización | Etiquetas y falsos negativos |
| Estabilidad | Parámetros orbitales | Estable/inestable | Clasificación o surrogate | Extrapolación fuera de la simulación |
| Curva de luz | Serie temporal | Score de señal | Detección/ranking | Sesgo de población y ruido |
| Atmósfera | Espectro | Parámetros/posterior | Recuperación/regresión | Degeneración y rejilla incompleta |
| Alto contraste | Imagen/cubo | Detección o máscara | Clasificación | Sim2real y speckles |
| Validación | Variables y diagnósticos | Probabilidad de hipótesis | Inferencia/decisión | Dependencia de supuestos y evidencia |

La frase de transición debe ser:

> «Los casos de la galería usan técnicas distintas y comparten una arquitectura. Hay una pregunta, una representación de datos, una salida, una población de referencia, una evaluación y un límite de interpretación. Esa arquitectura será el hilo conductor del curso.»

### 13.10. Cómo leer una cifra de impacto

Las cifras de la galería adquieren sentido cuando se ubican en el nivel de afirmación que representan:

| Nivel | Qué describe | Ejemplo en la galería | Evidencia que acompaña la lectura |
| --- | --- | --- | --- |
| Medición | Una señal registrada o un producto observacional | 83 717 159 curvas de luz de TESS | Calibración, cobertura, incertidumbre y procedencia |
| Detección o ranking | Una señal que el procedimiento reconoce o prioriza | 98,8 % de ranking favorable en AstroNet | Conjunto de prueba, falsos positivos y población de referencia |
| Inferencia o validación | Una propiedad estimada o una hipótesis planetaria apoyada estadísticamente | 50 planetas de Kepler validados; 118 planetas validados por RAVEN | Modelos, priors, escenarios alternativos y datos auxiliares |
| Interpretación científica | Una conclusión sobre la población, la arquitectura o la evolución del sistema | ampliar el censo de candidatos alrededor de estrellas débiles | Seguimiento independiente, comparación física y alcance del dominio |

El estudiante debe nombrar el nivel que respalda cada número. Una aceleración de \(10^5\) mide costo computacional; una colección de 100 000 sistemas simulados mide cobertura del entrenamiento; 10 091 candidatos nuevos miden una salida de búsqueda; un planeta confirmado mediante velocidad radial agrega evidencia observacional independiente.

#### Checklist breve para cerrar cada caso

- ¿Qué unidad se contó: estrellas, curvas, señales, candidatos, planetas, simulaciones o segundos?
- ¿Qué estatus tiene el resultado: observado, candidato, vetado, validado estadísticamente o confirmado?
- ¿Qué procedimiento de comparación produjo el factor de aceleración o la métrica?
- ¿Qué población, instrumento y rango físico definen el dominio de la cifra?
- ¿Qué evidencia adicional permite pasar de una señal priorizada a una afirmación planetaria?

### Texto para decir

> «Una cifra hace visible el impacto de ML cuando sabemos qué unidad cuenta y en qué etapa aparece. Miles de curvas, miles de candidatos, cientos de planetas validados y una aceleración de mil veces describen logros diferentes. La interpretación científica empieza cuando conectamos cada cifra con su evidencia, su dominio y su siguiente comprobación.»

## 14. Unidad 8 — Las tres ramas del curso

### Presentación general

Las tres líneas del curso forman una ruta iterativa:

~~~mermaid
flowchart LR
    A["1. Problemas astronómicos<br/>¿Qué queremos comprender?"] --> B["2. Teoría formal ML<br/>¿Qué objeto y supuestos usamos?"]
    B --> C["3. Aplicaciones<br/>¿Cómo lo implementamos y evaluamos?"]
    C --> A
~~~

Cada rama tiene una pregunta, un tipo de producto y una responsabilidad.

| Rama | Pregunta central | Producto de aprendizaje | Riesgo que ayuda a controlar |
| --- | --- | --- | --- |
| [[01 Temas/Academia/Maestría/ML Ciencias Planetarias/02 Conceptos/01 Problemas astronómicos/Índice de conceptos - Problemas astronómicos|Problemas astronómicos]] | ¿Qué problema científico queremos comprender o resolver, qué datos tenemos y qué utilidad tendría ML? | Pregunta acotada, unidad de análisis, datos, salida y criterio de utilidad | Aplicar un algoritmo a una pregunta mal formulada |
| [[01 Temas/Academia/Maestría/ML Ciencias Planetarias/02 Conceptos/02 Teoría formal ML/Índice de conceptos - Teoría formal ML|Teoría formal ML]] | ¿Qué objeto matemático, supuesto estadístico y mecanismo de aprendizaje explican el modelo? | Modelo formal, tarea, función de pérdida, evaluación y supuestos | Usar términos técnicos con comprensión parcial de lo que se optimiza |
| [[01 Temas/Academia/Maestría/ML Ciencias Planetarias/02 Conceptos/03 Aplicaciones/Índice de conceptos - Aplicaciones|Aplicaciones]] | ¿Cómo se implementa, diagnostica, reproduce e interpreta el modelo? | Código, experimento, línea base, evaluación, trazabilidad y límites | Confundir un notebook ejecutado con un resultado científico reproducible |

### Cómo explicarlas en S00

La introducción debe presentar las ramas como tres maneras de volver responsable una misma pregunta:

1. **Astronomía:** formular una pregunta que valga la pena responder.
2. **ML:** convertirla en una tarea con datos, salida y supuestos.
3. **Práctica:** construir, evaluar, documentar e interpretar una solución.

El curso se apoya en el ciclo:

~~~text
pregunta científica
→ datos y representación
→ señal y paradigma
→ tarea y salida
→ familia de modelos
→ entrenamiento
→ línea base y evaluación
→ generalización
→ interpretación y límites
~~~

### Texto para decir

> «Durante el curso vamos a volver varias veces sobre las tres ramas. Una aplicación adquiere valor científico cuando responde a un problema astronómico. Una pregunta adquiere precisión cuando se formaliza. Una formalización adquiere evidencia práctica cuando se implementa y se evalúa. La formación completa integra las tres perspectivas.»

### Mini actividad de ubicación

Entregar tres tarjetas:

- «Quiero saber si esta caída de brillo es compatible con un tránsito.»
- «Quiero definir una salida probabilística y separar entrenamiento de prueba.»
- «Quiero comparar el modelo con una línea base y revisar los falsos positivos.»

El estudiante debe asociarlas con las tres ramas y explicar qué información falta para pasar de una tarjeta a un proyecto.

## 15. Unidad 9 — Orientación técnica avanzada del curso y de la página web

Esta unidad debe ser breve en la exposición general y estar disponible como recorrido ampliado. Su función es que los estudiantes sepan cómo moverse por el curso, qué tipo de material encontrarán y cómo dejar evidencia de aprendizaje.

### La página como mapa de trabajo

La web debe presentarse en tres espacios principales:

| Espacio | Qué contiene | Acción esperada del estudiante |
| --- | --- | --- |
| **Presentación** | Objetivo, ruta, sesiones, conceptos y estado del curso | Orientarse y escoger el siguiente paso |
| **Lectura** | Explicaciones, referencias, figuras, glosario y fuentes | Construir comprensión y verificar afirmaciones |
| **Actividades** | Preguntas, microejercicios, notebooks, experimentos y entregables | Producir evidencia y transferir lo aprendido |

La sesión puede mostrar un esquema de navegación:

~~~text
Inicio del curso
→ sesión actual
→ concepto que la sesión atomiza
→ actividad o experimento
→ evidencia del estudiante
→ retroalimentación
→ siguiente sesión
~~~

### Qué significa cada recurso

- **Sesión:** organiza una experiencia temporal de aprendizaje; contiene propósito, guion, preguntas y conexiones.
- **Concepto:** explica una idea que puede reutilizarse en varias sesiones.
- **Aplicación:** reúne un caso, un dataset, un notebook o un experimento reproducible.
- **Actividad:** solicita una producción observable y ofrece una lectura que la prepara.
- **Referencia:** permite rastrear el origen de una definición, método, dato o afirmación.
- **Transferencia docente:** convierte una idea en una pregunta, ejemplo o actividad que el estudiante pueda enseñar.

### Flujo técnico de una actividad

~~~mermaid
flowchart TD
    A["Leer la pregunta"] --> B["Identificar el dato y la salida"]
    B --> C["Ejecutar o inspeccionar el experimento"]
    C --> D["Comparar con línea base"]
    D --> E["Diagnosticar errores e incertidumbre"]
    E --> F["Escribir una conclusión limitada"]
    F --> G["Guardar evidencia y referencia"]
~~~

### Orientación sobre herramientas

La introducción puede mencionar las herramientas como orientación breve:

- Python y notebooks para explorar datos y ejecutar experimentos;
- bibliotecas científicas para arreglos, tablas, series temporales, visualización y evaluación;
- repositorios para versionar código y datos derivados;
- fichas o notas de concepto para conservar definiciones y conexiones;
- la página web como interfaz de navegación y transferencia;
- registros de procedencia para saber qué dato, versión, parámetro y resultado produjeron una figura.

La demostración técnica debe ser mínima: abrir la página, entrar a una sesión, seguir un enlace conceptual, encontrar una actividad y localizar la referencia del ejemplo. El objetivo es reducir la fricción inicial; el aprendizaje de código ocurre en las sesiones de aplicación.

### Qué debe saber el estudiante al terminar esta unidad

El estudiante podrá:

1. encontrar la sesión y reconocer su propósito;
2. distinguir una explicación, una actividad, un concepto y una referencia;
3. seguir un enlace entre problema astronómico, teoría y aplicación;
4. identificar dónde se registra la evidencia de una actividad;
5. leer un resultado con su procedencia y sus límites;
6. saber que el curso conserva explícitamente las decisiones y los supuestos.

### Texto para decir

> «La página reúne sesiones conectadas. Cada sesión vincula una pregunta, una idea, una actividad y una evidencia. Los enlaces muestran cómo se mueve una decisión desde la astronomía hasta la implementación y de vuelta a la interpretación.»

### Cierre técnico opcional

Para estudiantes que quieran profundizar, se puede abrir una sección plegable con:

- organización de carpetas y nombres;
- relación entre sesión, concepto, aplicación y transferencia;
- cómo leer una ficha de actividad;
- cómo registrar versión de datos, semilla, parámetros y métricas;
- qué significa que un recurso esté en estado semilla, borrador, revisado o listo para publicar.

Esta parte debe estar separada visualmente del relato científico para que la orientación acompañe la pregunta inicial y conserve su lugar de apoyo.

## 16. Actividades de la sesión

La sesión necesita producciones pequeñas y observables. Cada actividad debe dejar una respuesta que permita revisar comprensión.

### Actividad 1 — Una pregunta, dos formulaciones

**Consigna.** Escribe una pregunta amplia sobre exoplanetas y conviértela en una pregunta que pueda conectarse con un dato y una salida de ML.

**Ejemplo.**

| Pregunta amplia | Pregunta acotada |
| --- | --- |
| ¿Cómo son los planetas fuera del sistema solar? | ¿Podemos priorizar curvas de luz con señales compatibles con tránsitos de pequeña profundidad dentro de esta población de estrellas? |

**Evidencia esperada.**

- fenómeno de interés;
- unidad de análisis;
- dato disponible;
- salida esperada;
- criterio que haría útil la respuesta.

### Actividad 2 — Clasificar la representación

**Consigna.** Para cada caso, decide qué dato sería la representación primaria y qué información se perdería al resumirlo.

| Caso | Representación posible | Información que puede perderse |
| --- | --- | --- |
| Tránsito | Curva de luz completa, ventana alrededor del evento o características | Duración, forma, variabilidad y contexto temporal |
| Atmósfera | Espectro por longitud de onda y errores | Resolución, correlación entre canales y degeneraciones |
| Imagen directa | Imagen, cubo o mapa de contraste | Información espacial, temporal y espectral |
| Dinámica | Parámetros iniciales, trayectoria o estabilidad final | Resonancias, escalas temporales y dependencia de la definición |

### Actividad 3 — Reconstruir la cadena de un artículo

Cada grupo recibe una tarjeta de uno de los artículos de la galería y completa:

~~~text
Pregunta astronómica:
Dato:
Representación:
Salida del modelo:
Etiqueta o referencia:
Línea base:
Métrica:
Conclusión que sí permite:
Alcance de la conclusión:
~~~

### Actividad 4 — Elegir el verbo de ML

**Consigna.** Asocia cada enunciado con detectar, clasificar, estimar, describir o priorizar. Luego discute si una tarea podría tener más de un verbo.

- «Ordenar candidatos para revisión humana».
- «Asignar probabilidad de que una señal pertenezca a una clase».
- «Aproximar la temperatura atmosférica y su incertidumbre».
- «Encontrar grupos de sistemas con propiedades parecidas».
- «Reconocer una caída de brillo compatible con un tránsito».

### Actividad 5 — Límite en una frase

**Consigna.** Completa:

> «Este modelo puede ayudar a __________ a partir de __________, bajo el supuesto de __________. Su resultado debe validarse mediante __________. La salida puede apoyar la hipótesis de que __________; la confirmación requiere evidencia adicional.»

Esta actividad funciona como evaluación formativa de la sesión completa.

### Actividad 6 — Navegación de la página

**Consigna.** En parejas, encuentra:

1. la pregunta central de la sesión;
2. un concepto relacionado;
3. una actividad;
4. una referencia primaria;
5. el lugar donde se registra la evidencia.

La pareja debe explicar el recorrido en una frase y señalar qué vínculo conecta cada recurso.

## 17. Ideas equivocadas previsibles y cómo abordarlas

| Idea inicial | Intervención breve | Evidencia o pregunta de seguimiento |
| --- | --- | --- |
| «ML encuentra planetas directamente» | Separar medición, detección, inferencia y confirmación | ¿Cuál es la salida exacta del modelo y qué evidencia independiente falta? |
| «Si la accuracy es alta, el modelo funciona» | Introducir desbalance, matriz de confusión, completitud, precisión y costo de errores | ¿Qué ocurre si el evento raro es precisamente el planeta que queremos encontrar? |
| «Más datos siempre producen una mejor solución» | Preguntar por representatividad, calidad, etiquetas y desplazamiento de dominio | ¿Los datos nuevos cubren la misma población y el mismo instrumento? |
| «Las simulaciones reproducen directamente las observaciones» | Explicar el propósito de la simulación y el problema sim2real | ¿Qué fenómeno, ruido o sesgo del instrumento queda pendiente de representar en la simulación? |
| «Una explicación de variables demuestra causalidad» | Distinguir asociación, utilidad predictiva e interpretación física | ¿La variable sigue siendo útil al controlar selección, confusión y covariables? |
| «Una red profunda aporta automáticamente mayor valor científico» | Devolver la elección a la pregunta, dato y evaluación | ¿Qué función añade la red respecto de una línea base interpretable? |
| «Una probabilidad del modelo es una probabilidad física universal» | Aclarar que depende de población, etiquetas, calibración y supuestos | ¿Qué tasa base y qué distribución de casos sustentan esa cifra? |
| «Un notebook ejecutado ya es un resultado reproducible» | Separar ejecución, procedencia, versión, parámetros, evaluación y documentación | ¿Otra persona puede reconstruir el dato, la figura y la métrica? |
| «La web funciona como un lugar para descargar diapositivas» | Presentar la web como mapa de conexiones y evidencia | ¿Qué concepto y qué actividad amplían la sesión? |

### Frase de reparación conceptual

> «La pregunta útil examina qué patrón aprende el modelo, con qué ejemplos, para qué decisión, con qué error y dentro de qué dominio.»

## 18. Transferencia docente: enseñar para que enseñen

El curso tiene una segunda audiencia: quienes deberán explicar o reutilizar estas ideas en otros espacios. S00 debe dejar una pieza transferible, incluso de pequeño formato.

### Producto de transferencia

Cada estudiante prepara una mini actividad de 5–10 minutos para explicar uno de estos conceptos:

- qué es una curva de luz;
- por qué encontrar un tránsito requiere evidencia adicional para confirmar un planeta;
- qué significa que un modelo generalice;
- cómo un surrogate model aproxima una simulación;
- por qué una línea base y una matriz de confusión importan;
- cómo separar la salida de ML de la interpretación astronómica.

La mini actividad debe contener:

1. una pregunta inicial;
2. una representación visual;
3. una comparación o ejemplo;
4. una pregunta de comprobación;
5. un límite explícito;
6. una referencia que el estudiante pueda consultar.

### Plantilla de transferencia

~~~text
Concepto que voy a enseñar:
Audiencia:
Pregunta de entrada:
Ejemplo astronómico:
Imagen, tabla o analogía:
Qué debería poder decir la audiencia al final:
Confusión que debo anticipar:
Límite que debo mencionar:
Referencia:
~~~

### Criterio de calidad

La explicación transferida debe conservar la cadena científica. Una versión accesible puede usar una analogía y debe regresar al dato, la salida y el límite del modelo. La actividad presenta ML como una herramienta condicionada por datos y supuestos, y conserva la diferencia entre correlación e interpretación causal.

## 19. Elementos visuales e interactivos para la página

La primera versión web de S00 debe privilegiar una lectura guiada y modular. Cada bloque debe poder leerse de forma independiente y, a la vez, conducir al siguiente.

### 19.1. Apertura visual

**Título sugerido:** *De los mundos a los datos: una introducción al aprendizaje automático para exoplanetas*.

**Subtítulo:** *Una señal débil, una pregunta científica, una cadena de decisiones.*

**Composición.**

- una estrella y un planeta en tránsito;
- la caída de brillo representada como curva de luz;
- la transformación de la curva en una pregunta;
- un pequeño bloque de datos y una salida probabilística;
- una nota visible: «La salida del modelo es evidencia condicionada».

**Texto alternativo sugerido:** «Esquema que conecta un planeta en tránsito, una curva de luz observada, un conjunto de datos y una estimación de ML con incertidumbre».

### 19.2. Cadena principal de la sesión

Un componente horizontal o vertical con nueve estaciones:

~~~text
Mundo
→ Pregunta
→ Medición
→ Dato
→ Representación
→ Tarea
→ Modelo
→ Evaluación
→ Interpretación
~~~

Cada estación debe abrir una tarjeta con:

- definición corta;
- pregunta de control;
- microejemplo de exoplanetas;
- confusión frecuente;
- enlace al concepto correspondiente;
- límite o decisión asociada.

### 19.3. Tarjetas de tipos de datos

Se propone una galería filtrable por:

- **observación:** curva, espectro, imagen, serie radial;
- **catálogo:** tabla de propiedades y metadatos;
- **simulación:** órbitas, rejillas atmosféricas, poblaciones;
- **datos de entrenamiento:** etiquetas, inyecciones, positivos y negativos;
- **salida:** score, clase, parámetro, posterior, ranking o acción.

Cada tarjeta debe mostrar la pregunta que permite abordar y el riesgo dominante. El filtro ayuda a que el estudiante vea que «datos astronómicos» reúne objetos con geometrías, resoluciones y fuentes de incertidumbre diferentes.

### 19.4. Galería cuantificada de hitos

La galería de impacto debe tener una tarjeta por caso, con el mismo patrón:

~~~text
Problema → dato → intervención → cifra → resultado → límite → referencia
~~~

El control de la tarjeta puede cambiar entre:

- vista de problema;
- vista de solución;
- vista de límite.

La comprensión debe funcionar con el contenido estático; la animación añade una capa opcional de exploración.

### 19.5. Matriz «qué verbo está haciendo ML»

Una visualización de cinco columnas:

| Detectar | Clasificar | Estimar | Describir | Priorizar |
| --- | --- | --- | --- | --- |
| señal compatible | clase/probabilidad | parámetro/posterior | grupos/representación | ranking/acción |

Al seleccionar un verbo, la página muestra un caso de la galería y una métrica o criterio de evaluación pertinente.

### 19.6. Lectura crítica de cifras y afirmaciones

El cierre cuantitativo de la Unidad 7 puede convertirse en un componente de lectura crítica. El estudiante clasifica cifras y afirmaciones según la etapa de la cadena que representan y recibe la pregunta que debe hacer antes de aceptarlas.

### 19.7. Mapa de las tres ramas

Un triángulo o ciclo conectará:

- pregunta astronómica;
- formalización de ML;
- aplicación reproducible.

Cada vértice enlazará con el índice de conceptos correspondiente y con una actividad de S00.

### 19.8. Accesibilidad y lectura

La especificación debe contemplar:

- subtítulos y transcripción si se añade audio;
- texto alternativo informativo y funcional;
- contraste suficiente;
- navegación por teclado;
- versión lineal completa de cada visualización;
- tablas legibles mediante estructura, texto y patrones complementarios al color;
- fórmulas acompañadas por una explicación verbal;
- animaciones pausables y reducidas si el usuario lo solicita;
- enlaces de referencia con título y año visibles.

## 20. Producción digital temporal

Esta sección define qué tendría que producirse en la web cuando S00 entre en el carril digital. El estado actual de esta nota queda como **semilla**; estas rutas describen una especificación de contenido y diseño, y la publicación dependerá de una revisión posterior.

### Paquete mínimo de S00

1. **Página de presentación**
   - título, propósito y pregunta guía;
   - duración y recorrido;
   - botón o enlace a la lectura;
   - indicador de qué conocimientos previos se esperan.

2. **Página de lectura**
   - ciencias planetarias;
   - preguntas sobre exoplanetas;
   - tipos de datos;
   - cuándo ayuda ML;
    - galería de hitos cuantificados;
    - cifras, límites y preguntas de interpretación;
   - referencias.

3. **Página de actividades**
   - actividad de reformulación de preguntas;
   - matriz de datos;
   - reconstrucción de un artículo;
   - selección del verbo de ML;
   - límite en una frase;
   - navegación guiada.

4. **Capa técnica**
   - mapa del curso;
   - explicación de sesiones, conceptos y aplicaciones;
   - procedencia de los recursos;
   - enlace a la siguiente sesión.

### Contrato de cada bloque web

Antes de convertir un bloque en componente, debe quedar definido:

~~~text
ID del bloque:
Pregunta que responde:
Texto principal:
Visualización:
Interacción:
Evidencia esperada:
Conceptos enlazados:
Referencias:
Límite:
Estado de revisión:
~~~

### Protocolo de revisión

La revisión de S00 debe comprobar cuatro dimensiones:

| Dimensión | Pregunta |
| --- | --- |
| Científica | ¿La afirmación corresponde a una pregunta, medición o inferencia que el ejemplo realmente sostiene? |
| Pedagógica | ¿El estudiante produce algo observable y recibe una oportunidad de corregir su modelo mental? |
| Técnica | ¿Los enlaces, componentes, tablas y actividades ofrecen una ruta visible y comprensible? |
| Proveniencia | ¿Cada cifra, imagen, dato y ejemplo tiene fuente, fecha o nota de incertidumbre? |

## 21. Conceptos que S00 debe activar

La sesión debe enlazar explícitamente con las notas ya existentes y preparar conceptos que se desarrollarán después.

### Enlaces centrales existentes

- [[Problema científico como punto de partida de ML]]
- [[Paradigma, tarea y familia de modelo]]
- [[Generalización y sesgo inductivo]]
- [[Flujo de proyecto de ML y línea base]]
- [[Glosario ML Ciencias Planetarias]]

### Conceptos que S00 introduce de manera intuitiva

- exoplaneta y método de detección;
- tránsito y curva de luz;
- velocidad radial;
- espectro y atmósfera;
- imagen de alto contraste;
- catálogo, metadato y selección;
- simulación e inyección sintética;
- señal, ruido y artefacto;
- tarea de ML y salida;
- población de referencia;
- línea base;
- generalización;
- incertidumbre y calibración;
- desplazamiento de dominio;
- validación científica.

### Conceptos que S01 formaliza

S00 deja una intuición compartida para que S01 pueda desarrollar:

- inteligencia artificial, aprendizaje automático y métodos estadísticos;
- paradigmas supervisado, no supervisado y otros usos;
- tarea, familia de modelo y salida;
- generalización, sesgo inductivo y línea base;
- separación entre pregunta científica y solución técnica.

La continuidad sugerida es [[S01 - ML, IA y métodos estadísticos]].

## 22. Referencias y trazabilidad del borrador

### 22.1. Marco de ciencias planetarias y exoplanetas

- National Academies of Sciences, Engineering, and Medicine (2022), *Origins, Worlds, and Life: A Decadal Strategy for Planetary Science and Astrobiology 2023–2032*. [Página interactiva oficial](https://nap.nationalacademies.org/resource/26522/interactive/). Se usa para situar las preguntas sobre orígenes, formación y evolución de mundos, habitabilidad y vida en el marco más amplio de las ciencias planetarias.
- NASA Science, *How We Find and Characterize*. [Recurso oficial](https://science.nasa.gov/exoplanets/how-we-find-and-characterize/). Se usa para el mapa de métodos observacionales y de caracterización.
- NASA Science, *How do you find and confirm a planet?*. [Recurso oficial](https://science.nasa.gov/universe/exoplanets/how-do-you-find-and-confirm-a-planet-10-things-about-the-search-for-exoplanets/). Se usa para distinguir detección, confirmación y caracterización.
- NASA Exoplanet Archive, *The NASA Exoplanet Archive: Data and Tools for Exoplanet Research*. [Descripción y artículo del archivo](https://exoplanetarchive.ipac.caltech.edu/docs/PASP_FINAL_The.NASA.Exoplanet.Archive.Data.and.Tools.for.Exoplanet.Research_July2013.pdf). Se usa para introducir archivos, catálogos, datos de misión y herramientas de consulta.
- NASA Exoplanet Archive, *Kepler Data Products Overview*. [Documentación oficial](https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html). Se usa para distinguir productos de datos, candidatos, curvas y diagnósticos.
- ESA, *Ariel factsheet*. [Ficha oficial de la misión](https://www.esa.int/Science_Exploration/Space_Science/Ariel_factsheet). Se usa como puente hacia la caracterización atmosférica y el crecimiento futuro de los archivos espectroscópicos.

### 22.2. Aplicaciones de ML incluidas en la galería

- McCauliff et al. (2015), *Automatic Classification of Kepler Planetary Transit Candidates*. [The Astrophysical Journal](https://doi.org/10.1088/0004-637X/806/1/6).
- Tamayo et al. (2016), *A Machine Learns to Predict the Stability of Tightly Packed Planetary Systems*. [Preprint arXiv](https://arxiv.org/abs/1610.05359).
- Pearson, Palafox y Griffith (2018), *Searching for Exoplanets Using Artificial Intelligence*. [Monthly Notices of the Royal Astronomical Society](https://doi.org/10.1093/mnras/stx2761).
- Shallue y Vanderburg (2018), *Identifying Exoplanets with Deep Learning*. [The Astronomical Journal](https://doi.org/10.3847/1538-3881/aa9e09).
- Márquez-Neila et al. (2018), *Supervised Atmospheric Retrieval for Exoplanets*. [Nature Astronomy](https://doi.org/10.1038/s41550-018-0504-2).
- Zingales y Waldmann (2018), *ExoGAN: Retrieving Exoplanetary Atmospheres Using Deep Convolutional Generative Adversarial Networks*. [The Astrophysical Journal](https://doi.org/10.3847/1538-3881/aae77c).
- Gómez González, Absil y Van Droogenbroeck (2018), *Supervised Detection of Exoplanets in High-Contrast Imaging*. [Astronomy & Astrophysics](https://doi.org/10.1051/0004-6361/201731961).
- Armstrong et al. (2021), *Exoplanet Validation with Machine Learning: 50 New Validated Kepler Planets*. [Monthly Notices of the Royal Astronomical Society](https://doi.org/10.1093/mnras/stab3692).
- Waldmann (2016), *Dreaming of Atmospheres*. [The Astrophysical Journal](https://doi.org/10.3847/0004-637X/820/2/107).
- Ofman et al. (2022), *Machine Learning Classification of Exoplanet Candidates in TESS Data*. [New Astronomy](https://doi.org/10.1016/j.newast.2021.101693).
- Zhao y Ni (2021), *Machine Learning for the Interior Structures of Rocky Exoplanets*. [Astronomy & Astrophysics](https://doi.org/10.1051/0004-6361/202140375).
- Nixon y Madhusudhan (2020), *Assessment of Machine Learning Techniques for Atmospheric Retrieval*. [Monthly Notices of the Royal Astronomical Society](https://academic.oup.com/mnras/article/496/1/269/5858025).
- Zorzan et al. (2025), *A Machine-Learning-Ready Dataset for Exoplanet Atmospheric Retrieval*. [The Astrophysical Journal Supplement Series](https://doi.org/10.3847/1538-4365/adb03a).
- Tamayo et al. (2020), *Predicting the Long-term Stability of Compact Multiplanet Systems*. [Proceedings of the National Academy of Sciences](https://doi.org/10.1073/pnas.2001258117).
- Dattilo et al. (2019), *Identifying Exoplanets with Deep Learning II: Two New Super-Earths Uncovered by a Neural Network in K2 Data*. [The Astronomical Journal](https://doi.org/10.3847/1538-3881/ab0e12).
- Lafarga et al. (2026), *Automatic Search for Transiting Planets in TESS-SPOC FFIs with RAVEN*. [Versión del artículo en arXiv](https://arxiv.org/abs/2603.22597).
- Roth et al. (2026), *The T16 Planet Hunt: 10,000 New Planet Candidates from TESS Cycle 1 and the Confirmation of a Hot Jupiter Around TIC 183374187*. [Versión del artículo en arXiv](https://arxiv.org/abs/2604.18579).

### 22.3. Criterio de uso de las referencias

Cada referencia debe tener una función visible:

| Función | Lugar de uso |
| --- | --- |
| Contextualizar el campo | Apertura sobre ciencias planetarias y preguntas |
| Describir una fuente de datos | Unidad de datos y página técnica |
| Mostrar una aplicación | Tarjeta de hito |
| Fundamentar un límite | Cierre cuantitativo y checklist |
| Orientar una ampliación | Lectura complementaria |

En la página publicada conviene conservar el título, autores, año y enlace persistente. Las cifras de rendimiento deben mantenerse ligadas al contexto experimental del artículo y acompañarse de una frase sobre su dominio de validez.

## 23. Guion completo resumido para 90 minutos

| Minutos | Bloque | Qué debe quedar |
| ---: | --- | --- |
| 0–5 | Bienvenida técnica | El estudiante sabe cómo recorrer la web y qué producto dejará |
| 5–10 | Pregunta de entrada | Un planeta distante se vuelve una pregunta sobre evidencia |
| 10–20 | Ciencias planetarias | Las ciencias planetarias estudian mundos como sistemas de origen, estructura, evolución y habitabilidad |
| 20–30 | Preguntas sobre exoplanetas | Una pregunta amplia se acota a un dato, una salida y un criterio |
| 30–45 | Tipos de datos | Curvas, espectros, imágenes, catálogos, simulaciones e inyecciones tienen estructuras y riesgos diferentes |
| 45–53 | Cuándo ayuda ML | ML puede detectar, clasificar, estimar, describir o priorizar |
| 53–78 | Galería de impacto cuantificado | Cada caso sigue problema → solución → cifra → resultado → límite |
| 78–86 | Tres ramas | Problema astronómico, teoría formal y aplicación reproducible forman una cadena |
| 86–90 | Cierre técnico | La página conserva conexiones, actividades, referencias y evidencia |

### Guion oral de una sola pieza

> «Bienvenidos al curso de aprendizaje automático para ciencias planetarias. Vamos a trabajar con una pregunta sencilla de formular y difícil de responder: ¿qué podemos aprender de mundos que casi nunca podemos observar directamente? Un exoplaneta se vuelve accesible a través de una medición: una disminución de brillo, un desplazamiento espectral, una imagen, una serie temporal o una salida de simulación. Esa medición se transforma en datos, los datos se representan, y la representación se conecta con una tarea.
>
> Las ciencias planetarias reúnen preguntas sobre cómo se forman los mundos, cómo evolucionan, de qué están hechos y bajo qué condiciones pueden ser habitables. Los exoplanetas son una entrada privilegiada porque obligan a combinar observación, modelos físicos, estadística y computación. El aprendizaje automático aparece cuando necesitamos recorrer muchas observaciones, reconocer señales débiles, aproximar una simulación costosa, estimar propiedades o decidir qué caso merece atención.
>
> A lo largo de la sesión veremos que la herramienta ocupa un lugar dentro de una historia más amplia. En cada ejemplo preguntaremos cuál era el problema, qué dato estaba disponible, qué salida produjo el modelo y qué límite conservó la conclusión. Una curva de luz clasificada ofrece una señal que requiere evidencia adicional para confirmar un planeta. Una abundancia atmosférica estimada depende de la familia de modelos y de la calidad del espectro. Una aproximación rápida de una simulación tiene un dominio de aplicación.
>
> El curso seguirá tres ramas conectadas. Primero, formularemos problemas astronómicos. Después, aprenderemos a expresarlos con objetos, tareas y supuestos de ML. Finalmente, construiremos aplicaciones que puedan evaluarse, reproducirse e interpretarse. La página del curso organizará ese recorrido: cada sesión enlazará conceptos, actividades, referencias y evidencias. Al terminar, cada estudiante deberá poder explicar una aplicación de ML para exoplanetas con una pregunta clara, un dato identificable, una salida concreta y un límite honesto.»

## 24. Decisiones abiertas que propongo conservar para la siguiente iteración

| Decisión | Propuesta para este borrador | Qué debemos revisar |
| --- | --- | --- |
| Duración | 90 minutos | Si la sesión será clase única, video o lectura autónoma |
| Ubicación de la introducción técnica | Entrada de 5 minutos y cierre de 5 minutos | Si el grupo necesita una demostración más extensa |
| Código en S00 | La sesión propone navegación y lectura de resultados; el notebook queda para una microexploración opcional | Si se desea una microexploración de una curva de luz |
| Ejemplos principales | Seis casos: Kepler, estabilidad, curvas, atmósferas, alto contraste y validación | Qué ejemplos son más cercanos al proyecto final |
| Ejemplos complementarios | Banco de seis trabajos para tarjetas o lectura | Nivel matemático y carga de lectura |
| Producto de S00 | Mapa pregunta–dato–tarea–límite más una mini actividad docente | Si el curso requiere una entrega calificable desde la primera sesión |
| Profundidad técnica | Intuición en S00; formalización en S01 y sesiones posteriores | Prerrequisitos de programación, estadística y astronomía |
| Público | Estudiantes, tutores y colaboradores | Ajustar lenguaje, glosario y número de explicaciones |
| Página | Lectura modular con actividades y referencias persistentes | Componentes reales disponibles en el repo de producción |
| Fuente de verdad | Esta nota y sus conceptos enlazados antes de publicar | Revisión manual del puente hacia el repositorio externo |

### Decisión didáctica recomendada

Mantener el código fuera del núcleo de S00 permite que la primera sesión cree un mapa mental común. La web puede mostrar una curva de luz, un espectro o una salida de clasificación, mientras la clase se concentra en la pregunta que esos datos hacen posible y en la interpretación de la respuesta.

## 25. Lista de revisión antes de pasar a producción

### Ciencia

- [ ] La definición de ciencias planetarias tiene un alcance explícito.
- [ ] Se distinguen detección, validación, caracterización e interpretación.
- [ ] Cada ejemplo tiene problema, dato, salida, resultado y límite.
- [ ] Las cifras de rendimiento conservan el contexto del artículo.
- [ ] Las simulaciones e inyecciones se presentan como fuentes de ejemplos con supuestos.
- [ ] Las afirmaciones sobre atmósferas incluyen degeneración, cobertura y modelo físico.

### Pedagogía

- [ ] Hay una pregunta guía que reaparece durante toda la sesión.
- [ ] Las actividades producen respuestas observables.
- [ ] Las ideas equivocadas tienen una intervención preparada.
- [ ] La galería de impacto cuantificado ofrece un recorrido comprensible para estudiantes que todavía están aprendiendo los algoritmos.
- [ ] El producto final conecta pregunta, dato, tarea y límite.
- [ ] La transferencia docente conserva la responsabilidad científica.

### Técnica

- [ ] La página presenta claramente Presentación, Lectura y Actividades.
- [ ] Cada enlace tiene una etiqueta comprensible.
- [ ] La cadena principal tiene una versión lineal.
- [ ] Las tablas se leen mediante estructura, texto y patrones complementarios al color, con una alternativa visible para cada interacción.
- [ ] La navegación de la sesión se puede completar en pocos pasos.
- [ ] La introducción técnica mantiene la pregunta científica como eje.

### Proveniencia

- [ ] Las referencias primarias están enlazadas desde las tarjetas de hitos.
- [ ] Las fuentes institucionales se distinguen de los artículos de aplicación.
- [ ] Las imágenes tienen fuente, licencia o procedencia definida.
- [ ] Los datos de ejemplo tienen versión, consulta o fecha documentada.
- [ ] Las salidas mostradas incluyen métrica, incertidumbre o condición de interpretación.
- [ ] La nota conserva el estado de producción y evita afirmar que una ruta web ya está publicada.

### Revisión de enlaces y estructura

- [ ] Las propiedades de sesión se conservan.
- [ ] El enlace al curso y los conceptos centrales resuelven en Obsidian.
- [ ] La sesión aparece en el índice mediante sus propiedades.
- [ ] La navegación hacia S01 queda clara.
- [ ] La revisión visual comprueba títulos, tablas, Mermaid, callouts y listas.
- [ ] La versión digital futura se contrasta con esta nota antes de publicar.

## 26. Nodo de red

Esta sesión pertenece al curso y prepara el paso hacia S01:

[de:: [[AA ML Ciencias Planetarias]]]

[depende_de:: [[Problema científico como punto de partida de ML]]]

[junto_a:: [[S01 - ML, IA y métodos estadísticos]]]

[genera:: [[Glosario ML Ciencias Planetarias]]]

[considerar:: [[Flujo de proyecto de ML y línea base]]]

[considerar:: [[Generalización y sesgo inductivo]]]

El hilo que debe conservarse en todas las futuras versiones es:

~~~text
una pregunta sobre mundos
→ una medición indirecta
→ un tipo de dato
→ una representación
→ una tarea de ML
→ una evaluación
→ una afirmación científica con límites
~~~
