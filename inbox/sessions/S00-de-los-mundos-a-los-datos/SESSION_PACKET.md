---
id: S00-MLCP-de-los-mundos-a-los-datos
kind: session-packet
status: drafting
origin: obsidian
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S00 - De los mundos a los datos - Introducción al ML para exoplanetas.md
source_heading: "S00 — De los mundos a los datos: introducción al ML para exoplanetas"
source_block: null
title: "De los mundos a los datos: introducción al ML para exoplanetas"
summary: "Sesión introductoria que conecta ciencias planetarias, observaciones, tipos de datos, aplicaciones de ML, impacto cuantificado, tres líneas del curso y orientación técnica de la página."
concepts:
  - "Ciencias planetarias y astrobiología"
  - "Exoplanetas y sistemas planetarios"
  - "Cadena de medición planetaria"
  - "Unidad de análisis y representación"
  - "Curva de luz, espectro, velocidad radial e imagen de alto contraste"
  - "Catálogo, simulación e inyección"
  - "Problema científico como punto de partida de ML"
  - "Detección, clasificación, inferencia, exploración y priorización"
  - "Impacto cuantificado y dominio de validez"
  - "Problemas astronómicos, teoría formal ML y aplicaciones"
  - "Procedencia, evaluación e interpretación"
source_refs:
  - "National Academies (2022), Origins, Worlds, and Life"
  - "NASA Science, How We Find and Characterize"
  - "NASA Science, How do you find and confirm a planet?"
  - "NASA Exoplanet Archive, Data and Tools for Exoplanet Research"
  - "NASA Exoplanet Archive, Kepler Data Products Overview"
  - "ESA, Ariel factsheet"
  - "McCauliff et al. (2015), Automatic Classification of Kepler Planetary Transit Candidates"
  - "Tamayo et al. (2016), A Machine Learns to Predict the Stability of Tightly Packed Planetary Systems"
  - "Pearson, Palafox y Griffith (2018), Searching for Exoplanets Using Artificial Intelligence"
  - "Shallue y Vanderburg (2018), Identifying Exoplanets with Deep Learning"
  - "Márquez-Neila et al. (2018), Supervised Atmospheric Retrieval for Exoplanets"
  - "Zingales y Waldmann (2018), ExoGAN"
  - "Gómez González et al. (2018), Supervised Detection of Exoplanets in High-Contrast Imaging"
  - "Dattilo et al. (2019), Identifying Exoplanets with Deep Learning II"
  - "Tamayo et al. (2020), Predicting the Long-term Stability of Compact Multiplanet Systems"
  - "Nixon y Madhusudhan (2020), Assessment of Machine Learning Techniques for Atmospheric Retrieval"
  - "Armstrong et al. (2021), Exoplanet Validation with Machine Learning"
  - "Ofman et al. (2022), Machine Learning Classification of Exoplanet Candidates in TESS Data"
  - "Zhao y Ni (2021), Machine Learning for the Interior Structures of Rocky Exoplanets"
  - "Zorzan et al. (2025), A Machine-Learning-Ready Dataset for Exoplanet Atmospheric Retrieval"
  - "Lafarga et al. (2026), Automatic Search for Transiting Planets in TESS-SPOC FFIs with RAVEN"
  - "Roth et al. (2026), The T16 Planet Hunt"
visibility: internal
publish_ready: false
rights: pending
editorial:
  visibility: internal
  publish_ready: false
  rights: pending
---

# S00 — De los mundos a los datos: introducción al ML para exoplanetas

## 1. Qué se recibe

Este paquete registra la versión actual de la nota de Obsidian indicada en `source_note`. La
fuente tiene el desarrollo narrativo completo de la sesión y funciona como referencia de autoría
pedagógica. El repositorio recibe aquí una síntesis de handoff para orientar la revisión, la
implementación web y la futura separación entre contenido interno y material publicable.

La nota completa también se conserva literalmente en este paquete, en [S00 - De los mundos a los
datos - Introducción al ML para exoplanetas.md](./S00%20-%20De%20los%20mundos%20a%20los%20datos%20-%20Introducci%C3%B3n%20al%20ML%20para%20exoplanetas.md). La copia mantiene el
contenido editado en Obsidian; la ruta `source_note` sigue siendo la procedencia canónica del
material.

La sesión introduce el curso a partir de una secuencia científica reconocible. Comienza con la
pregunta sobre un mundo lejano, pasa por el campo de las ciencias planetarias, fija qué observan
los instrumentos, organiza las familias de datos y llega a los problemas que el aprendizaje
automático puede ayudar a escalar. El recorrido termina ubicando las tres líneas del curso y
mostrando cómo estudiar la página y sus recursos.

La nota no entrega un notebook ni un resultado científico nuevo. Presenta problemas, datos,
referencias y ejemplos de impacto para que el grupo aprenda a leer la relación entre una
afirmación y la evidencia que la sostiene.

## 2. Decisión pedagógica vigente

S00 funciona como una introducción científica, conceptual y técnica. La bienvenida técnica puede
abrir la clase para reducir la fricción de navegación; el cierre técnico puede volver a la página
como mapa de continuidad. La columna vertebral permanece en la pregunta científica y en la cadena
de medición.

La secuencia que debe quedar visible en la clase y en la futura página es:

```text
pregunta científica → unidad de análisis → datos/representación → señal de aprendizaje
→ tarea → familia de modelo → evaluación → interpretación y límites → transferencia docente
```

La conversación evita comenzar por algoritmos. Cada ejemplo debe aclarar qué queremos conocer,
qué llega del instrumento, qué instancia se estudia, qué salida se espera y qué evidencia permite
confiar en ella.

## 3. Propósito, pregunta y producto

### Propósito

Dar al grupo un mapa inicial del curso de ML para exoplanetas: campo científico, preguntas,
observaciones, representaciones, problemas de aprendizaje automático, hitos y límites. El grupo
debe reconocer que el valor de un modelo depende de su relación con una pregunta, un dato, una
evaluación y un uso.

### Pregunta guía

> ¿Cómo convertimos una pregunta sobre un planeta o un sistema planetario en una cadena de
> observación, datos, aprendizaje, evaluación e interpretación?

### Producto de la sesión

Cada estudiante formula una cadena breve que contenga:

```text
pregunta → unidad de análisis → representación → tarea o verbo de ML
→ evidencia de evaluación → límite de interpretación
```

El producto también incluye una ubicación inicial dentro de las tres ramas del curso y una ruta
de navegación de la página: sesión, lectura, actividad, concepto y referencia.

## 4. Audiencias y niveles de orientación

| Audiencia | Necesidad en S00 | Evidencia breve de logro |
| --- | --- | --- |
| Estudiante | Entender qué estudia el curso y recorrer la página sin convertir la instalación en una barrera. | Puede describir una pregunta, una representación, una tarea y un límite. |
| Tutor | Seleccionar sesiones, vistas, ayudas y recursos para una adaptación. | Puede ubicar una actividad, un concepto, una fuente y una línea del curso. |
| Colaborador | Preparar contenido reproducible y conservar procedencia, estados y derechos. | Puede identificar el paquete, revisar una fuente y distinguir `inbox/` de `docs/content/`. |

Los prerrequisitos estudiantiles son conceptuales: reconocer una observación, una comparación y
una pregunta física en lenguaje común. Los prerrequisitos técnicos pertenecen a quien ejecuta o
modifica el repositorio; Node, npm, builds y pruebas aparecen como orientación para colaboradores
y tutores.

## 5. Arquitectura temporal para aproximadamente 90 minutos

| Tiempo | Bloque | Función didáctica |
| ---: | --- | --- |
| 0–5 min | Bienvenida técnica | Mostrar cómo recorrer Presentación, Lectura, Actividades, conceptos y referencias. |
| 5–10 min | Una pregunta sobre un mundo lejano | Convertir una curiosidad amplia en una pregunta investigable. |
| 10–20 min | Ciencias planetarias | Ubicar mundos, cuerpos, sistemas, procesos y preguntas transversales. |
| 20–30 min | Preguntas sobre exoplanetas | Conectar pregunta, evidencia, unidad de análisis y dificultad. |
| 30–45 min | Señal y tipos de datos | Pasar de la propiedad física a la medición y organizar las modalidades. |
| 45–53 min | Cuándo ayuda ML | Introducir detectar, clasificar, inferir, explorar y priorizar. |
| 53–78 min | Galería de hitos e impacto | Mostrar el problema, la intervención, la cifra, el resultado y el límite. |
| 78–86 min | Tres ramas del curso | Relacionar problema astronómico, teoría formal y aplicación reproducible. |
| 86–90 min | Cierre técnico y transferencia | Dejar una ruta de continuidad en la página y una frase de salida. |

Para una versión de 60 minutos se conserva un ejemplo por transición y se recorta la galería. La
versión de 90 minutos permite mantener el juego de conectar, las tarjetas de instrumentos y la
lectura crítica de cifras.

## 6. Inventario de unidades

La nota fuente organiza la sesión en diez unidades numeradas de 0 a 9. El número de cada unidad
queda ligado a una pregunta, un objeto visual, una idea y una salida pedagógica.

| Unidad | Título | Pregunta central | Objeto o actividad |
| ---: | --- | --- | --- |
| 0 | Bienvenida técnica: cómo recorrer el curso | ¿Cómo encuentro la explicación, la actividad, el concepto y la fuente que necesito? | Mapa de navegación de la página. |
| 1 | Una pregunta sobre un mundo lejano | ¿Qué queremos conocer de un exoplaneta y qué tendría que llegar del instrumento? | Microproblema y cadena pregunta → evidencia. |
| 2 | ¿Qué estudian las ciencias planetarias? | ¿Qué objetos, procesos y preguntas forman el campo? | Mapa ramificado y familias de preguntas. |
| 3 | Preguntas sobre exoplanetas | ¿Cómo acotamos una pregunta a una evidencia y una dificultad? | Juego de conectar en dos rondas. |
| 4 | De una propiedad física a una señal observable | ¿Qué relación existe entre el proceso planetario y el dato que llega al instrumento? | Cadena de medición y tarjetas de misiones/instrumentos. |
| 5 | Qué tipos de datos utilizamos | ¿Qué estructura tiene cada modalidad y qué preguntas permite? | Jerarquía de observacionales, derivados, poblacionales, simulados e inyectados. |
| 6 | Cuándo puede ayudar el aprendizaje automático | ¿Qué función puede cumplir ML dentro de la cadena científica? | Mapa de verbos: detectar, clasificar, inferir, explorar y priorizar. |
| 7 | Hitos, escala e impacto | ¿Qué cuello de botella existía y qué escala habilitó la intervención? | Galería de impacto cuantificado. |
| 8 | Las tres ramas del curso | ¿Cómo se conectan problema astronómico, teoría formal y aplicación? | Mapa triangular y mini actividad de ubicación. |
| 9 | Orientación técnica avanzada del curso y de la página web | ¿Cómo continúo el trabajo con sesiones, glosario, notebooks y ejercicios? | Flujo técnico, herramientas y contrato de recursos. |

## 7. Desarrollo conceptual de la sesión

### 7.1. De una pregunta amplia a una cadena de trabajo

La apertura parte de una formulación como «quiero estudiar un planeta parecido a la Tierra» y la
transforma mediante preguntas sucesivas:

1. ¿Qué propiedad o evento queremos estudiar?
2. ¿Cuál es la unidad de análisis: estrella, planeta, sistema, visita, espectro, imagen, curva o
   segmento?
3. ¿Qué observación está disponible?
4. ¿Qué representación conserva la señal relevante?
5. ¿Qué verbo describe la tarea: detectar, clasificar, estimar, agrupar, generar o priorizar?
6. ¿Qué evidencia y qué límite acompañan la salida?

La cadena evita que la conversación salte directamente del fenómeno físico al nombre de un
algoritmo. También prepara la estructura que S01 formaliza.

### 7.2. Ciencias planetarias como campo ramificado

La nota fuente usa tres ramas amplias para organizar la lista inicial.

#### Mundos, cuerpos y sistemas

- planetas del Sistema Solar;
- exoplanetas y sistemas exoplanetarios;
- lunas y mundos oceánicos;
- asteroides y cometas;
- discos protoplanetarios;
- cuerpos pequeños y poblaciones;
- arquitecturas planetarias.

Las lunas y los mundos oceánicos quedan vinculados a una familia transversal de mundos y también
pueden aparecer dentro del estudio de sistemas exoplanetarios cuando la pregunta se refiere a
exolunas o a la arquitectura completa de un sistema. La taxonomía conserva esas relaciones sin
forzar una única casilla.

#### Estructura, entorno e interacción

- interiores planetarios;
- superficies y procesos geológicos;
- atmósferas y exosferas;
- magnetosferas e interacción con las estrellas;
- discos, envolturas y entornos de formación.

#### Procesos y preguntas transversales

- orígenes, formación y evolución;
- arquitectura y evolución de sistemas planetarios;
- habitabilidad y búsqueda de vida;
- química planetaria y evolución atmosférica;
- defensa planetaria.

La ramificación permite mostrar que una luna, una atmósfera o un disco pueden funcionar como
objeto, entorno o proceso según la pregunta científica. La página debe presentar la relación
entre ramas mediante enlaces y etiquetas, no mediante una lista plana.

### 7.3. Familias de preguntas sobre exoplanetas

La sesión reúne las preguntas en familias que después se traducen a datos y tareas:

| Familia | Ejemplos de preguntas | Dato posible |
| --- | --- | --- |
| Detección y censo | ¿Hay un tránsito o un compañero? ¿Qué población falta por explorar? | Curva de luz, imagen o catálogo. |
| Propiedades | ¿Cuál es el radio, la masa, la temperatura o la composición compatible? | Tránsito, velocidad radial, espectro o parámetros estelares. |
| Sistemas y dinámica | ¿Qué arquitectura es estable? ¿Cómo evoluciona el sistema? | Parámetros orbitales y simulaciones dinámicas. |
| Atmósferas y habitabilidad | ¿Qué escenarios atmosféricos explican la señal? | Espectro, serie espectroscópica o modelo sintético. |

### 7.4. Juego de conectar

La actividad de la Unidad 3 tiene dos rondas. El grupo recibe tarjetas de preguntas y tarjetas de
evidencia. Después añade una tarjeta de dificultad.

#### Ronda 1 — Conecta la pregunta con la evidencia

| Pregunta | Evidencia o representación esperada |
| --- | --- |
| ¿Hay un planeta que transita? | Curva de luz temporal. |
| ¿Qué masa y órbita explican el movimiento? | Serie de velocidades radiales. |
| ¿Qué moléculas o temperaturas son compatibles con la atmósfera? | Espectro o serie espectroscópica. |
| ¿Existe un compañero débil cerca de la estrella? | Imagen de alto contraste y productos asociados. |
| ¿Qué sistemas son estables a largo plazo? | Simulación dinámica o salida de un modelo físico. |

#### Ronda 2 — Añade la dificultad

Cada grupo añade una dificultad que pueda alterar la interpretación: ruido, actividad estelar,
selección, huecos temporales, PSF y speckles, degeneración física, cambio de dominio, etiquetas
incompletas o costo de simulación.

La salida de la actividad es una conexión argumentada entre pregunta, evidencia y dificultad. La
actividad no exige nombrar un modelo ni calcular una métrica.

## 8. Cadena de medición y observatorios

La Unidad 4 hace visible el recorrido que existe entre una propiedad física y una tabla analítica:

```text
propiedad o proceso planetario → interacción física → señal que alcanza el telescopio
→ instrumento y detector → calibración y preprocesamiento → dato analítico
→ modelo e inferencia
```

Las preguntas de control son:

1. ¿Qué magnitud se mide?
2. ¿Qué magnitud queremos inferir?
3. ¿Qué transformaciones ocurrieron entre ambas?
4. ¿Qué explicaciones alternativas producen una señal parecida?

### 8.1. Galería principal de misiones e instrumentos

La versión inicial propone ocho tarjetas clickeables. Cada tarjeta debe reunir imagen o
ilustración con derechos revisados, descripción breve, producto de datos, pregunta científica,
limitación principal y enlace a la fuente oficial.

| Modalidad | Misión o instrumento | Producto y pregunta que habilita |
| --- | --- | --- |
| Fotometría temporal | Kepler/K2, TESS y CHEOPS | Curvas de luz para detectar tránsitos, medir radios y construir censos. |
| Espectroscopía de transmisión/emisión | Hubble y Webb | Espectros y curvas de fase para estudiar composición, temperatura y nubes. |
| Velocidad radial | HARPS y ESPRESSO | Desplazamientos espectrales para inferir masa y órbita. |
| Imagen de alto contraste | VLT/SPHERE | Separación espacial de compañeros débiles frente a la luz estelar. |
| Radio e interferometría milimétrica | ALMA | Mapas de polvo, gas y moléculas en discos y entornos de formación. |

Las tarjetas de perspectiva pueden incorporar PLATO, Ariel, Roman y Gaia. Sus fechas y estados
operativos deben revisarse justo antes de publicar la web.

### 8.2. Orden narrativo recomendado

1. Detectar un tránsito con Kepler/K2 y TESS.
2. Medir con precisión el tamaño de un mundo con CHEOPS.
3. Medir una masa dinámica con HARPS y ESPRESSO.
4. Leer una atmósfera con Hubble y Webb.
5. Separar un compañero de la luz estelar con VLT/SPHERE.
6. Seguir la formación planetaria con ALMA.
7. Proyectar el crecimiento de poblaciones con PLATO, Ariel, Roman y Gaia.

La galería presenta observatorios como puertas hacia productos de datos. Las imágenes y los
enlaces no funcionan como decoración: cada una debe responder qué mide, qué permite preguntar y
qué dificultad hereda el modelo.

## 9. Jerarquía de los datos

La Unidad 5 separa niveles que suelen mezclarse en una sola tabla.

### 9.1. Datos observacionales

Son señales registradas por un instrumento o por una cadena de reducción.

| Familia | Ejemplo | Estructura | Pregunta posible | Límite dominante |
| --- | --- | --- | --- | --- |
| Fotometría | Curva de luz | Flujo frente al tiempo | ¿Hay un tránsito? ¿Cuál es el periodo? | Ruido, actividad, huecos y tendencias. |
| Espectroscopía | Espectro | Flujo frente a longitud de onda | ¿Qué escenarios atmosféricos son compatibles? | Degeneración, baja relación señal/ruido y cobertura. |
| Imagen | Imagen de alto contraste | Intensidad espacial | ¿Existe un compañero débil? | PSF, speckles, contraste y falsos positivos. |

### 9.2. Organización temporal y productos derivados

Estos productos reordenan o resumen observaciones.

| Producto | Qué organiza | Pregunta o uso |
| --- | --- | --- |
| Serie espectroscópica | Espectros por tiempo o fase orbital | ¿Cómo cambia la señal atmosférica? |
| Velocidad radial | Movimiento de la estrella en la línea de visión | ¿Qué masa y órbita explican la variación? |
| Producto calibrado o extraído | Píxeles, flujos, espectros o parámetros tras reducción | ¿Qué información queda lista para analizar? |

### 9.3. Productos poblacionales

Un catálogo resume muchas fuentes, candidatos o parámetros. Permite estudiar poblaciones,
comparar submuestras y buscar casos atípicos. La selección, heterogeneidad e incertidumbre de las
entradas determinan el alcance de cualquier conclusión.

### 9.4. Datos simulados

Las simulaciones dinámicas y los modelos atmosféricos sintéticos permiten explorar relaciones
físicas controladas, preparar etiquetas o estudiar cobertura del espacio de parámetros. Su
utilidad depende de los supuestos físicos, del prior, del dominio y de la distancia entre la
simulación y la observación.

### 9.5. Datos construidos para evaluar

Las inyecciones introducen señales artificiales en datos reales o simulados para preguntar si un
método recupera una señal conocida. Funcionan como herramienta de evaluación de recuperación y
completitud. El realismo de la inyección condiciona la interpretación del resultado.

La página debe mostrar dos lecturas simultáneas: origen del dato y transformación aplicada. Un
espectro puede ser observacional y calibrado; un catálogo puede contener productos derivados; una
inyección puede usar una curva de luz real y cumplir una función de evaluación.

## 10. Cuándo puede ayudar ML

La Unidad 6 organiza las aplicaciones mediante cinco verbos:

| Verbo | Problema que resume | Ejemplo en exoplanetas |
| --- | --- | --- |
| Detectar | Encontrar una señal o un objeto entre muchos datos. | Señales de tránsito o compañeros débiles. |
| Clasificar | Ordenar instancias según clases o plausibilidad. | Candidatos de tránsito frente a falsos positivos. |
| Inferir | Estimar propiedades o parámetros con incertidumbre explícita. | Radios, masas o parámetros atmosféricos. |
| Explorar | Describir estructura, similitud, anomalías o poblaciones. | Agrupar espectros o examinar catálogos. |
| Priorizar | Decidir qué revisar o qué observar después. | Vetting, seguimiento y selección de candidatos. |

La conversación debe vincular cada verbo con una unidad de análisis, una representación, una
señal de aprendizaje, una línea base, una métrica y un límite. La sesión introduce estas piezas
para que S01 y las sesiones posteriores las formalicen.

## 11. Galería de hitos, escala e impacto

La Unidad 7 reúne casos con una estructura narrativa constante:

1. situación científica;
2. escala del problema;
3. cuello de botella;
4. intervención de ML;
5. cifra de impacto;
6. significado científico;
7. condición o límite.

El impacto se expresa con la unidad que el artículo realmente cuenta. La galería distingue curvas
de luz, señales, candidatos, planetas validados, planetas confirmados, sistemas simulados y
órbitas exploradas.

### 11.1. Panel de cifras recibido

| Caso | Problema y escala | Resultado cuantitativo para la tarjeta | Lectura pedagógica |
| --- | --- | --- | --- |
| McCauliff et al. (2015) | Más de 200 000 estrellas de Kepler y 18 406 señales tipo tránsito. | 3 697 candidatos de planeta identificados dentro de esa población de señales. | La automatización ayuda a ordenar el vetting cuando la inspección manual crece. |
| Tamayo et al. (2016) | Explorar la estabilidad de sistemas compactos mediante integraciones N-body extensas. | Aproximadamente tres órdenes de magnitud de aceleración en el régimen de (10^7) órbitas, cerca de (1/1000) del tiempo de integración directa. | Un modelo sustituto permite consultar rápido un dominio validado. |
| SPOCK, Tamayo et al. (2020) | Predecir estabilidad hasta (10^9) órbitas. | Hasta (10^5) de aceleración; entrenamiento con aproximadamente 100 000 sistemas simulados de tres planetas y estadísticas de las primeras (10^4) órbitas. | La cifra corresponde a sistemas simulados y a un horizonte de predicción definido. |
| AstroNet, Shallue y Vanderburg (2018) | Distinguir señales planetarias débiles de falsos positivos en curvas de luz de Kepler. | 98,8 % de los casos del conjunto de prueba con una señal planetaria plausible por encima de un falso positivo; dos planetas estadísticamente validados. | El ranking dirige una nueva revisión de señales archivadas. |
| AstroNet-K2, Dattilo et al. (2019) | Homogeneizar la búsqueda en campañas K2 con entornos observacionales diferentes. | 98 % de exactitud en el conjunto de prueba; dos exoplanetas previamente desconocidos identificados y validados. | El cambio de misión obliga a revisar transferencia y dominio. |
| Armstrong et al. (2021) | Validar grandes cantidades de candidatos de Kepler con métricas de vetting. | Miles de candidatos no vistos pueden validarse en segundos una vez calculadas las métricas; 50 candidatos de Kepler fueron validados como planetas. | La velocidad depende de entradas, controles y supuestos del procedimiento. |
| RAVEN, Lafarga et al. (2026) | Buscar tránsitos en más de 2,2 millones de estrellas observadas durante cuatro años de imágenes de campo completo de TESS. | 118 planetas estadísticamente validados, incluidos 31 detectados por el estudio; más de 2 000 candidatos vetados, con aproximadamente 1 000 nuevos. | La tarjeta debe separar candidatos, vetting y planetas validados. |
| T16, Roth et al. (2026) | Procesar un archivo masivo de curvas de luz de TESS. | 83 717 159 curvas de luz; 11 554 candidatos, 10 091 nuevos; un Júpiter caliente confirmado mediante seguimiento de velocidad radial. | La escala del archivo aumenta el censo de candidatos y conserva la necesidad de seguimiento independiente. |

La tarjeta de impacto debe indicar siempre qué unidad cuenta la cifra y cuál fue el procedimiento de
comparación. «Cien mil» puede referirse a sistemas simulados; «83,7 millones» a curvas de luz;
«10 091» a candidatos nuevos; «118» a planetas estadísticamente validados; «uno» a un planeta
confirmado con seguimiento. Las unidades no se intercambian.

### 11.2. Casos complementarios

La galería puede ampliar el panorama con recuperación de parámetros atmosféricos supervisada,
ExoGAN, detección en imagen de alto contraste, clasificación de candidatos TESS, estructuras
internas rocosas y datasets preparados para retrieval. En cada caso se conserva la pregunta, el
dato, la salida, la cifra disponible y el límite de simulación, degeneración, cobertura o dominio.

### 11.3. Cómo leer una cifra de impacto

Antes de interpretar una cifra, el grupo responde:

- ¿Qué unidad se contó?
- ¿La salida corresponde a una medición, una detección, un candidato, un objeto vetado, una
  validación estadística o una confirmación?
- ¿Contra qué procedimiento se comparó?
- ¿En qué datos, misión, simulación, horizonte o dominio vale la comparación?
- ¿Qué evidencia adicional se requiere?

Este cierre conserva la discusión sobre alcance dentro de la galería de impacto. La Unidad 7
integra la lectura crítica de resultados y evita abrir una unidad independiente redundante.

## 12. Las tres ramas del curso

La Unidad 8 presenta las líneas conectadas que recorren todo el curso.

| Rama | Pregunta | Producto formativo |
| --- | --- | --- |
| Problemas astronómicos | ¿Qué fenómeno, objeto, señal o proceso queremos comprender? | Formulación de preguntas, unidades y datos. |
| Teoría formal de ML | ¿Qué representación, paradigma, tarea, modelo, métrica e incertidumbre corresponden? | Vocabulario, ecuaciones, supuestos y evaluación. |
| Aplicaciones reproducibles | ¿Cómo llevamos la formulación a código, datos, notebooks, visualizaciones y decisiones? | Experimento trazable, límites y transferencia. |

La transferencia docente atraviesa las tres ramas: cada sesión debe poder reutilizarse como
explicación, lectura, actividad o semilla de una electiva.

### Mini actividad de ubicación

El docente lee tres situaciones y el grupo las ubica en la rama que necesita atención inmediata:

1. «La pregunta física todavía es demasiado amplia» → problemas astronómicos.
2. «Tenemos una curva de luz y queremos comparar dos métricas» → teoría formal de ML.
3. «El notebook tarda, no registra la versión y no sabemos si la figura se reproduce» → aplicación
   reproducible.

Después se conectan las tres respuestas en una sola cadena.

## 13. Orientación técnica del curso y de la página web

La Unidad 0 presenta la página como mapa de trabajo. La Unidad 9 retoma el recorrido con mayor
detalle y explica cómo continuar.

### Recursos que el estudiante debe reconocer

| Recurso | Función en la sesión |
| --- | --- |
| Presentación | Una unidad principal, ritmo oral y controles de navegación. |
| Lectura | Recorrido lineal con desarrollo, referencias y límites. |
| Actividades | Preguntas, clasificación, conexión y transferencia; el estado de respuesta se conserva separado del texto. |
| Glosario | Definiciones y relaciones entre conceptos, sesiones y ejercicios. |
| Ejemplos | Casos de datos, preguntas y aplicaciones con procedencia. |
| Notebooks | Prácticas ejecutables solo después de probar entorno, datos y resultados. |
| Referencias | Fuentes persistentes, función de uso y contexto de cada afirmación. |

### Flujo técnico para colaboradores

```text
pregunta de contenido → nota de Obsidian → paquete en inbox/
→ revisión de procedencia, derechos y alcance → docs/content/ o recurso específico
→ validación técnica y científica → propuesta de publicación
```

`inbox/` conserva diseño de trabajo. `docs/content/` recibe contenido revisado para el build.
Este paquete no modifica automáticamente las colecciones públicas, la configuración, los
componentes ni los workflows.

### Ruta mínima para una actividad futura

1. Leer la pregunta y la representación.
2. Abrir el ejemplo y la fuente.
3. Identificar la tarea y la línea base.
4. Ejecutar el notebook cuando el entorno y los datos estén comprobados.
5. Comparar la métrica con el contexto de evaluación.
6. Escribir interpretación, incertidumbre, límite y siguiente pregunta.

## 14. Actividades y transferencia docente

La nota fuente propone seis familias de actividades que pueden convertirse en tarjetas, preguntas
de aula o ejercicios web:

1. formular una pregunta y dos representaciones posibles;
2. clasificar una representación como observacional, derivada, poblacional, simulada o inyectada;
3. reconstruir la cadena de un artículo;
4. elegir el verbo de ML para un cuello de botella;
5. escribir un límite en una frase;
6. recorrer la página y localizar sesión, concepto, actividad y fuente.

El producto de transferencia docente pide adaptar una pregunta de S00 a otro nivel, elegir una
imagen o señal, formular una actividad breve y declarar qué conclusión queda fuera del alcance.

## 15. Elementos visuales e interactivos recibidos

La futura página puede convertir estos elementos en componentes, después de revisar las fichas de
interacción y los derechos de cada asset:

- apertura con un mundo, una señal y la pregunta guía;
- cadena de medición desde propiedad física hasta dato analítico;
- mapa ramificado de ciencias planetarias;
- juego de conectar pregunta, evidencia y dificultad;
- tarjetas desplegables de Kepler/K2, TESS, Hubble, Webb, CHEOPS, HARPS/ESPRESSO, VLT/SPHERE y
  ALMA;
- tarjetas de perspectiva para PLATO, Ariel, Roman y Gaia;
- galería jerárquica de modalidades de datos;
- galería de impacto con cifra, unidad contada, contexto y límite;
- mapa de las tres ramas;
- bloque de accesibilidad con texto alternativo, lectura lineal, teclado y movimiento reducido.

Las tarjetas de observatorios deben ser clickeables y abrir, como mínimo, imagen o ilustración,
descripción, qué permite medir, producto de datos, pregunta científica, límite, enlace oficial y
estado de derechos. Las tarjetas de impacto deben abrir la referencia, el contexto experimental y
la distinción entre candidato, validación estadística y confirmación.

## 16. Conceptos que pasan al glosario

### Conceptos centrales

- ciencias planetarias;
- exoplaneta y sistema planetario;
- cadena de medición planetaria;
- unidad de análisis;
- representación;
- curva de luz;
- espectro;
- velocidad radial;
- imagen de alto contraste;
- catálogo;
- simulación dinámica;
- modelo atmosférico sintético;
- datos inyectados;
- detección, clasificación, inferencia, exploración y priorización;
- impacto cuantificado;
- validación estadística y confirmación;
- procedencia y dominio de validez.

La atomización debe buscar primero notas existentes en el vault y conservar los enlaces semánticos
del sistema. El paquete propone semillas; la entrada pública requiere fuente, definición,
relaciones y revisión.

## 17. Bibliografía y enlaces de trabajo

La nota fuente conserva las referencias completas con título, autores, año, función y enlace. Para
la integración, se agrupan así:

### Marco del campo y datos

- [National Academies — Origins, Worlds, and Life](https://nap.nationalacademies.org/resource/26522/interactive/), marco decadal de ciencias planetarias y astrobiología.
- [NASA Science — How We Find and Characterize](https://science.nasa.gov/exoplanets/how-we-find-and-characterize/), métodos de detección y caracterización.
- [NASA Science — How do you find and confirm a planet?](https://science.nasa.gov/universe/exoplanets/how-do-you-find-and-confirm-a-planet-10-things-about-the-search-for-exoplanets/), distinción entre detección, confirmación y caracterización.
- [NASA Exoplanet Archive — Data and Tools for Exoplanet Research](https://exoplanetarchive.ipac.caltech.edu/docs/PASP_FINAL_The.NASA.Exoplanet.Archive.Data.and.Tools.for.Exoplanet.Research_July2013.pdf), archivos, catálogos y productos.
- [NASA Exoplanet Archive — Kepler Data Products Overview](https://exoplanetarchive.ipac.caltech.edu/docs/Kepler_Data_Products_Overview.html), capas de productos de Kepler.
- [ESA — Ariel factsheet](https://www.esa.int/Science_Exploration/Space_Science/Ariel_factsheet), perspectiva para poblaciones atmosféricas.

### Aplicaciones de ML y cifras de impacto

- [McCauliff et al. (2015)](https://doi.org/10.1088/0004-637X/806/1/6), clasificación automática de candidatos de tránsito de Kepler.
- [Tamayo et al. (2016)](https://arxiv.org/abs/1610.05359), predicción de estabilidad de sistemas compactos.
- [Pearson, Palafox y Griffith (2018)](https://doi.org/10.1093/mnras/stx2761), búsqueda de exoplanetas con IA.
- [Shallue y Vanderburg (2018)](https://doi.org/10.3847/1538-3881/aa9e09), AstroNet en curvas de luz de Kepler.
- [Márquez-Neila et al. (2018)](https://doi.org/10.1038/s41550-018-0504-2), retrieval atmosférico supervisado.
- [Zingales y Waldmann (2018)](https://doi.org/10.3847/1538-3881/aae77c), ExoGAN.
- [Gómez González et al. (2018)](https://doi.org/10.1051/0004-6361/201731961), detección supervisada en imagen de alto contraste.
- [Dattilo et al. (2019)](https://doi.org/10.3847/1538-3881/ab0e12), AstroNet-K2 y dos exoplanetas nuevos.
- [Tamayo et al. (2020)](https://doi.org/10.1073/pnas.2001258117), estabilidad de largo plazo y SPOCK.
- [Nixon y Madhusudhan (2020)](https://academic.oup.com/mnras/article/496/1/269/5858025), evaluación de técnicas de retrieval.
- [Armstrong et al. (2021)](https://doi.org/10.1093/mnras/stab3692), validación de 50 planetas de Kepler.
- [Zhao y Ni (2021)](https://doi.org/10.1051/0004-6361/202140375), estructuras internas de exoplanetas rocosos.
- [Ofman et al. (2022)](https://doi.org/10.1016/j.newast.2021.101693), candidatos de TESS.
- [Zorzan et al. (2025)](https://doi.org/10.3847/1538-4365/adb03a), dataset para retrieval atmosférico.
- [Lafarga et al. (2026)](https://arxiv.org/abs/2603.22597), búsqueda RAVEN en imágenes de campo completo de TESS.
- [Roth et al. (2026)](https://arxiv.org/abs/2604.18579), búsqueda T16 en curvas de luz de TESS.

Las cifras de rendimiento y descubrimiento deben mantenerse ligadas al artículo, al conjunto de
datos, al procedimiento y al estado de la evidencia. El año y el estado editorial de trabajos
recientes deben verificarse antes de publicar una página definitiva.

### Misiones e instrumentos

La nota fuente contiene enlaces oficiales para Kepler/K2, TESS, Hubble, Webb, CHEOPS,
HARPS, ESPRESSO, VLT/SPHERE, ALMA, PLATO, Ariel, Roman y Gaia. El integrador debe consultar la
fuente de cada tarjeta en la revisión de assets y registrar alt text, caption, dimensiones,
licencia o estado de derechos.

## 18. Aterrizaje previsto en el repositorio

| Destino | Uso propuesto | Condición de entrada |
| --- | --- | --- |
| `docs/content/sessions/` | Página publicable de S00 y su contenido estructurado. | Revisión científica, editorial, de procedencia, derechos y visibilidad. |
| `docs/specs/interactions/` | Fichas de tarjetas, galerías, juego de conectar y mapa de ramas. | Especificación de interacción antes de implementar el componente principal. |
| `glossary/` | Conceptos y relaciones bidireccionales. | Atomización y fuente específica para cada definición. |
| `exercises/` | Juego de conectar, clasificación de datos y producto de transferencia. | Consigna, resultado observable, accesibilidad y prueba. |
| `public/` o assets revisados | Ilustraciones originales y recursos autorizados. | Derechos, alt text, dimensiones, proceso y revisión visual. |
| `notebooks/` | Prácticas futuras asociadas a datos y aplicaciones. | Entorno probado, datos redistribuibles, baseline, métrica y resultado reproducible. |

El paquete actual permanece en `inbox/`. No se promueve automáticamente ninguna de estas rutas.

## 19. Lagunas y decisiones abiertas

| Tema | Estado actual | Condición de cierre |
| --- | --- | --- |
| Audiencia y duración | 90 minutos y tres audiencias como propuesta inicial. | Confirmar grupo, nivel y duración institucional. |
| Taxonomía del campo | Mapa ramificado aprobado como estructura didáctica de trabajo. | Revisar etiquetas, relaciones y concepto atómico correspondiente. |
| Tipos de datos | Jerarquía separada por origen, derivación, población, simulación y evaluación. | Convertirla en visualización accesible y validar ejemplos. |
| Observatorios e instrumentos | Ocho tarjetas principales y cuatro de perspectiva. | Verificar estado de misión, enlaces, imágenes, alt text y derechos. |
| Hitos recientes | Cifras de RAVEN y T16 incluidas como trabajo de 2026. | Revisar versión bibliográfica, estado editorial y contexto antes de publicar. |
| Impacto | Cada caso debe declarar unidad contada, comparación y dominio. | Revisión independiente de las cifras y de la redacción de cada tarjeta. |
| Tres ramas | Problemas astronómicos, teoría formal ML y aplicaciones reproducibles. | Alinear nombres con la arquitectura vigente del curso. |
| Página web | La orientación técnica aparece al inicio y al cierre. | Implementar o ajustar el adaptador de S00 y sus rutas según contrato vivo. |
| Derechos | `pending`. | Decisión de licencia y autorización para material externo y assets. |
| Publicación | `publish_ready: false`. | Revisión humana y promoción explícita a colecciones públicas. |

## 20. Precauciones científicas y editoriales

- Una señal tipo tránsito, un candidato, un planeta validado estadísticamente y un planeta
  confirmado ocupan estados distintos en la cadena de evidencia.
- Una aceleración frente a una integración directa depende del dominio, el horizonte, la línea base
  y el costo de preparar o consultar el modelo.
- Un dataset simulado ofrece control y cobertura definidos por sus supuestos; la transferencia a
  datos observacionales requiere una evaluación explícita.
- Una puntuación de ML ordena o clasifica instancias según su formulación; la conclusión física
  requiere contexto, incertidumbres, escenarios alternativos y evidencia apropiada.
- Una imagen enlazada desde una página oficial todavía necesita revisión de derechos para el uso
  concreto de la página del curso.
- Una cifra reciente queda acompañada por su artículo, estado editorial y fecha de verificación.
- `inbox/` es espacio de preparación; la completitud del texto no cambia por sí misma la visibilidad
  ni la autorización de publicación.

## 21. Criterios de revisión del paquete

- [ ] La `source_note` coincide con una nota existente del vault y el `source_heading` identifica
      su encabezado real.
- [ ] El paquete conserva `origin: obsidian`, `source_vault: DASAN` y una ruta relativa portable.
- [ ] `status`, `visibility`, `publish_ready` y `rights` representan el estado editorial actual.
- [ ] La jerarquía de ciencias planetarias conserva ramas y relaciones entre lunas, mundos
      oceánicos, exoplanetas y sistemas.
- [ ] La jerarquía de datos separa modalidades observacionales de productos derivados, catálogos,
      simulaciones e inyecciones.
- [ ] Cada cifra de impacto identifica unidad contada, fuente, contexto y límite.
- [ ] Las tarjetas de observatorios tienen fuente oficial, función científica y revisión de assets.
- [ ] Las actividades tienen resultado observable y pueden leerse sin instalar herramientas.
- [ ] Las tres ramas se relacionan con las sesiones siguientes, el glosario y las prácticas.
- [ ] Ningún fragmento entra en `docs/content/` sin revisión científica, editorial y de derechos.

## 22. Siguiente agente o responsable sugerido

El integrador de contenido debe revisar este paquete junto con la nota fuente, contrastar la
arquitectura con el contrato vivo de S00 y decidir si el paquete técnico anterior se conserva como
complemento de la orientación de fork. La integración posterior requiere fichas de interacción,
conceptos atomizados, assets con procedencia y una revisión independiente de las cifras de impacto.

La entrega actual deja la fuente y el diseño disponibles para ese proceso; no declara integración
publicable ni ejecución de notebooks.
