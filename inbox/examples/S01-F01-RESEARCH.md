---
id: S01-F01-RESEARCH
kind: example-research-package
session_id: S01
scope: minimum-verifiable
status: drafting
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion narrativo para impartir la sesión
visibility: internal
publish_ready: false
rights:
  status: hold
  note: La investigación conserva enlaces y propuestas de diagramas originales. No incorpora figuras, tablas, texto extenso, datos descargados ni activos de terceros.
---

# F01 · Investigación preparatoria de ejemplos y definiciones para S01

## Propósito y alcance

Este paquete prepara ejemplos, definiciones y decisiones de uso para las 22 unidades de navegación y las 5 actividades de S01. Se entrega en estado interno y de preparación. No es una promoción a docs/content, no actualiza el registro público de ejemplos y no certifica resultados del curso.

La cola se cubrió con casos de exoplanetas. Se mantiene la regla de empezar por exoplanetas y no se usa un caso autónomo de estrellas ni de galaxias como sustituto. La continuación del 2026-09-08 añadió una fuente primaria de RL para control de frente de onda en imagen directa de exoplanetas y una fuente primaria de GAN para retrieval de atmósferas; ambas conservan los límites de simulación, etapa preliminar y transferencia que declaran sus autores.

### Convenciones de estado

- verificado: se leyó el recurso, se registró su ubicación y la afirmación queda limitada a lo que el recurso permite sostener.
- parcial: existe una fuente leída, pero la adaptación a S01 requiere una decisión pedagógica, una fuente especializada adicional o una comprobación que aún no está cerrada.
- pendiente: la fuente requerida no fue accesible o no se leyó con suficiente detalle; la afirmación queda bloqueada y no se usa como evidencia.
- N/A: la unidad de bibliografía organiza fuentes y capítulos; no requiere un ejemplo científico propio. Se conserva un bloqueo de verificación bibliográfica.

Las afirmaciones atómicas se identifican como C-IDs en la auditoría. Cada definición indica si es hecho de fuente, paráfrasis del curso o elección pedagógica. Ninguna métrica de este paquete es un resultado producido por el repositorio.

## Cobertura de fuentes consultadas

Fecha de consulta de las fuentes accesibles: 2026-09-08.

| source_id | Recurso y tipo | Localización leída | Qué permite sostener | Límite y derechos |
|---|---|---|---|---|
| nist-ai-glossary-2025 | NIST, entrada AI, fuente institucional | Entrada AI, sección Definitions; definición atribuida a NIST SP 800-218A | Una definición institucional de sistema basado en máquina que produce predicciones, recomendaciones o decisiones para objetivos definidos | No define ML astronómico, calidad física ni una tarea del curso. Solo se conserva el enlace; no se reutiliza texto extenso |
| nist-generative-ai-glossary-2025 | NIST, entrada generative artificial intelligence, fuente institucional | Entrada completa, sección Definitions; definición atribuida a NIST AI 100-2e2025 y SP 800-218A | La IA generativa como clase de modelos que emula estructura o características de datos de entrada para generar contenido sintético derivado | No demuestra realismo físico, validez científica ni un modelo generativo de exoplanetas. Solo enlace; reutilización de contenido externo en hold |
| asa-statistics-education-charter-2025 | American Statistical Association, Statistics Education Section Charter | Article II, Objectives, párrafo de apertura | La formulación institucional de estadística como aprendizaje a partir de datos | No es una definición completa de incertidumbre, inferencia o ML. Solo enlace; no se copia contenido |
| cmu-mitchell-mlbook-1997 | Tom M. Mitchell, página de Machine Learning, recurso institucional del autor | Descripción de apertura de la página | La descripción general de ML como estudio de algoritmos que mejoran automáticamente con la experiencia | La página no contiene por sí sola el formalismo E-T-P. El libro completo y capítulos concretos no están incorporados al repositorio; solo se enlaza |
| geron-3e | Aurélien Géron, *Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow*, 3.ª ed., O’Reilly, 2023; PDF y extracción privados declarados en el digest del vault | PDF privado: p. 30, “What Is Machine Learning?”; p. 38, “Types of Machine Learning Systems”; p. 39, “Reinforcement learning”; p. 53, “Instance-Based Versus Model-Based Learning”; p. 61, “Main Challenges of Machine Learning”; p. 73, “Testing and Validating”; p. 80, inicio del cap. 2; pp. 83, 87 y 106, “Look at the Big Picture”, “Select a Performance Measure” y “Create a Test Set” | Definición de ML, esquema T–P–E, categorías de sistemas, aprendizaje por refuerzo, aprendizaje basado en instancias/modelos, desafíos, validación y formulación/evaluación de un proyecto | La paginación indicada es la del PDF privado accesible; no se copian pasajes ni se infiere una aplicación exoplanetaria. El uso público y los derechos siguen en hold |
| kelleher-2015 | John D. Kelleher, Brian Mac Namee y Aoife D’Arcy, *Fundamentals of Machine Learning for Predictive Data Analytics*, MIT Press, 2015; PDF y extracción privados declarados en el digest del vault | PDF privado: p. 41, §1.1; p. 43, §1.2; p. 46, §1.3; p. 50, §1.4; p. 52, §1.5; pp. 65, 68, 71 y 77, §§2.1–2.4; pp. 457, 458, 461, 466–467, cap. 8, §§8.1, 8.3, 8.4 y 8.4.1 | Predicción, extracción de patrones, variables descriptivas/objetivo, sesgo inductivo, ciclo de proyecto, tabla analítica, características y evaluación experimental | La paginación indicada es la del PDF privado accesible; la extracción se usa solo para localizar y contrastar. No se copian contenidos ni se atribuye un caso exoplanetario al libro; los derechos siguen en hold |
| mitchell-key-ideas-2017 | Tom M. Mitchell, Key Ideas in Machine Learning, borrador educativo alojado en CMU | PDF, pp. 1-2 (T, P, E y ejemplo de correo); pp. 3-5 (generalización, no-free-lunch, sesgo-varianza, sobreajuste y validación); pp. 5-6 (familia de redes profundas); pp. 7-8 (representación/PCA); p. 9 (retroalimentación retardada y RL) | Definiciones operativas y relaciones conceptuales para la cadena de S01 | El PDF indica que no debe redistribuirse sin permiso. Se mantiene en hold: enlace y referencia, sin copiar texto, tablas o figuras |
| sklearn-glossary-1.9 | scikit-learn User Guide, Glossary, documentación institucional | Entradas supervised, target, unlabeled, unsupervised, classifier, clusterer, fit, predict, data leakage, X e y | Convenciones operativas para etiquetas, ajuste, predicción, clasificación, clustering y fuga de datos | Documenta API y conceptos de uso; no valida un resultado astronómico ni sustituye una fuente de dominio |
| kepler-dv-timeseries-2016 | Thompson et al., Kepler Data Validation Time Series, documentación de misión NASA/Ames | PDF KSCI-19079-001, p. 6, §1 Introduction; pp. 6-7, §1 sobre SES/MES, TCE y DV; pp. 7-8, §2.2 TCE Extensions | El flujo documentado de búsquedas de señales de tránsito en series temporales Kepler y la estructura de productos TCE | No demuestra desempeño de ML ni confirmación planetaria. Documento enlazable; no se reutilizan sus figuras o datos |
| nasa-kepler-tce-columns | NASA Exoplanet Archive, Kepler TCE Columns | §1 Target Labels and Flags; §2 Transit Fit Parameters | Identificadores y parámetros publicados para registros TCE, con cautela sobre errores y covarianzas | No se extrajo una fila ni se atribuye un planeta particular. Enlace de documentación; sin copia de tablas |
| nasa-exoplanet-archive-api | NASA Exoplanet Archive, Programmatic Interfaces | §Data Available Through API y §Query Syntax | El archivo ofrece tablas y acceso TAP/API para consultas reproducibles | La consulta de datos no se ejecutó para este paquete; no se afirma un conteo o valor actual de catálogo |
| nasa-pscomppars-calculation | NASA Exoplanet Archive, PSCompPars Calculation Details | §§1-2 sobre selección de valores y consistencia de parámetros; secciones de parámetros derivados consultadas | Un registro de planeta puede reunir parámetros provenientes de referencias distintas y valores calculados pueden carecer de incertidumbre | No se usa para afirmar valores físicos concretos. La documentación es enlazable; no se copia una fila |
| shallue-vanderburg-2018 | Shallue y Vanderburg, Identifying Exoplanets with Deep Learning, artículo original alojado en arXiv | §§I, III.1-III.3, IV y V; descripción de datos, particiones, representaciones global/local, CNN, baseline logístico y Tablas 1-2 | Un caso publicado de clasificación supervisada de TCEs con representación de curvas de luz, baseline y evaluación separada | Sus métricas son del artículo y no del curso. Se enlaza el artículo; no se reutilizan sus figuras, datos o texto |
| pinhas-et-al-2020 | Pinhas et al., Assessment of supervised machine learning for atmospheric retrieval of exoplanets, artículo original MNRAS | §3 y subsecciones sobre entrenamiento sintético, validación/predicción y comparación con espectro observado de HD 209458b; discusión de degeneraciones | Un caso publicado de regresión/retrieval supervisado y el problema de pasar de espectros sintéticos a observados | La simulación y el objeto pertenecen al artículo; no se transfieren sus valores a S01. Solo enlace DOI/página; no figuras ni datos |
| goyal-et-al-2020 | Goyal et al., Optimizing exoplanet atmosphere retrieval using unsupervised machine-learning classification, artículo original MNRAS | §§2-3, especialmente vector espectral, PCA, k-means, espectros sintéticos y requisitos de resolución/longitud de onda | Un caso publicado de reducción/clustering no supervisado para formar grupos y priors informados | Sus supuestos y resultados son del artículo. No se presenta como resultado universal ni se copia ninguna figura |
| cabona-et-al-2021 | Cabona et al., Scheduling strategies for the ESPRESSO follow-up of TESS targets, artículo original MNRAS | Introducción/objetivo y conclusiones sobre planificación simulada de seguimiento RV | Un ejemplo astronómico de decisión secuencial y utilidad de seguimiento, con distinción explícita entre simulación y observación | El artículo no se leyó como evidencia de RL aplicado. La conexión con RL en S01 es elección pedagógica; solo enlace |
| gutierrez-et-al-2024-rl-exoplanet-imaging | Gutierrez et al., A Deep Reinforcement Learning Approach to Wavefront Control for Exoplanet Imaging, artículo original en proceedings SPIE | §§1–2.3, definición del MDP, observaciones de diversidad de fase, acción sobre espejo deformable, recompensa y PPO; §§3.1–3.2, experimento numérico; §§4.1–4.2, coronógrafo, dark hole y resultados preliminares; §5, límites y validación futura | Implementa RL model-free con PPO para controlar un espejo deformable a partir de imágenes y reducir luz estelar residual en un escenario simulado de imagen directa de exoplanetas | Es pertinente a control de la observación por imagen, no a scheduling de objetivos ni a observaciones en cielo. Los resultados son simulados y preliminares; la validación experimental/on-sky queda como trabajo futuro. DOI 10.1117/12.3020374; derechos del proceedings no autorizan reutilizar figuras |
| zingales-waldmann-2018-exogan | Zingales y Waldmann, ExoGAN: Retrieving Exoplanetary Atmospheres Using Deep Convolutional Generative Adversarial Networks, artículo original The Astronomical Journal | §§2.1–2.4, GAN/DCGAN, ASPA, espectros atmosféricos y entrenamiento con TauREx; §2.5, reconstrucción por inpainting; §§3–4, escenarios de retrieval y evaluación; Apéndices A–C, configuración | Justifica la familia generativa GAN, específicamente una DCGAN llamada ExoGAN, aplicada a espectros y parámetros de atmósferas de exoplanetas | El entrenamiento usa modelos forward sintéticos y la demostración es retrieval; no convierte ExoGAN en evidencia observacional universal ni autoriza copiar figuras/datos. El artículo es open access CC BY 3.0 con atribución, pero el paquete conserva derechos en hold hasta revisión |

URLs y DOI de los recursos consultados:

- nist-ai-glossary-2025: https://csrc.nist.gov/glossary/term/ai
- nist-generative-ai-glossary-2025: https://csrc.nist.gov/glossary/term/generative_artificial_intelligence
- asa-statistics-education-charter-2025: https://community.amstat.org/statisticaleducationsection/aboutus/charter
- cmu-mitchell-mlbook-1997: https://www.cs.cmu.edu/~tom/mlbook.html
- geron-3e: edición y PDF privado declarados en el Digest de fuentes de S01; la localización verificable se registra mediante páginas del PDF privado, sin convertir una ruta personal en procedencia portable
- kelleher-2015: edición y PDF privado declarados en el Digest de fuentes de S01; la localización verificable se registra mediante páginas del PDF privado, sin convertir una ruta personal en procedencia portable
- mitchell-key-ideas-2017: https://www.cs.cmu.edu/~tom/mlbook/keyIdeas.pdf
- sklearn-glossary-1.9: https://scikit-learn.org/stable/glossary.html
- kepler-dv-timeseries-2016: https://archive.stsci.edu/files/live/sites/mast/files/home/missions-and-data/kepler/_documents/DVTimeSeries-Description.pdf
- nasa-kepler-tce-columns: https://exoplanetarchive.ipac.caltech.edu/docs/API_tce_columns.html
- nasa-exoplanet-archive-api: https://exoplanetarchive.ipac.caltech.edu/docs/program_interfaces.html
- nasa-pscomppars-calculation: https://exoplanetarchive.ipac.caltech.edu/docs/pscp_calc.html
- shallue-vanderburg-2018: https://arxiv.org/html/1712.05044
- pinhas-et-al-2020: https://academic.oup.com/mnras/article/496/1/269/5858025
- goyal-et-al-2020: https://doi.org/10.1093/mnras/staa978
- cabona-et-al-2021: https://doi.org/10.1093/mnras/stab826
- gutierrez-et-al-2024-rl-exoplanet-imaging: https://doi.org/10.1117/12.3020374 (versión verificable: https://arxiv.org/abs/2407.18733)
- zingales-waldmann-2018-exogan: https://doi.org/10.3847/1538-3881/aae77c (versión open access: https://discovery.ucl.ac.uk/id/eprint/10063375/)

## Fuentes auditadas y desbloqueo puntual

La auditoría de seguimiento del 2026-09-08 confirmó que el digest privado declara ambos libros, que sus extracciones están disponibles en el vault y que los PDF locales declarados son accesibles. Las ubicaciones atómicas se registran como páginas del PDF privado y sección; no se usan como rutas portables ni se copia contenido.

| source_id | resultado de la auditoría | alcance que puede cerrarse | límite que permanece |
|---|---|---|---|
| geron-3e | edición 3.ª y páginas del PDF verificadas | localizar la bibliografía y respaldar las síntesis generales de S01 en las secciones/páginas registradas | fuente general de ML; no respalda por sí sola un caso exoplanetario ni autoriza reproducción |
| kelleher-2015 | edición 2015 y páginas del PDF verificadas | localizar la bibliografía y respaldar las síntesis de predicción, proyecto, representación y evaluación en las secciones/páginas registradas | fuente general de ML; no respalda por sí sola un caso exoplanetario ni autoriza reproducción |
| gutierrez-et-al-2024-rl-exoplanet-imaging | artículo y DOI comprobados; proceedings SPIE de 9 páginas, consultado el 2026-09-08 | cerrar el bloqueo de una implementación de RL pertinente a imagen directa de exoplanetas: §2.2 define estado/observación/acción/recompensa, §2.3 PPO; §§4.1–4.2 muestran el escenario coronográfico simulado y la métrica de dark hole | no implementa programación de seguimiento RV, no tiene validación en cielo y declara resultados preliminares; la integración pedagógica debe decir control instrumental y simulación |
| zingales-waldmann-2018-exogan | artículo open access de 14 páginas, DOI y PDF institucional UCL comprobados el 2026-09-08 | cerrar el bloqueo de una familia generativa específica: §§2.1–2.4 describen GAN/DCGAN, ASPA y entrenamiento TauREx; §2.5 el inpainting; §§3–4 los escenarios de retrieval | la evidencia se apoya en espectros forward sintéticos y retrieval; no respalda una métrica del repositorio, una distribución celeste real ni transferencia automática a otro instrumento |

## Fuentes bloqueadas o de alcance limitado

| source_id | Estado | Bloqueo | Unidades afectadas |
|---|---|---|---|
| nature-marquz-neila-2018 | pendiente | La página de Nature permitió consultar el resumen y metadatos, pero el contenido completo quedó restringido. No se usa como soporte de ninguna afirmación | s01-task-levels, s01-domain-diagnosis, s01-evidence-claim |
| soboczenski-2018 | pendiente | La página HTML de arXiv no cargó y solo se identificó un resumen; se excluye del soporte | s01-task-tree, s01-task-levels, s01-family-bias |
| nasa-kepler-ps-columns-current | pendiente | La página actual de columnas PS no respondió dentro de la consulta; se usan las páginas TCE, API y PSCompPars accesibles y se evita afirmar el esquema completo | s01-instance-catalog, s01-instance-notation, s01-evidence-claim |

Regla aplicada: un bloqueo de acceso no se convierte en una afirmación de contenido. Cuando existe una fuente alternativa leída, esta se usa únicamente para el alcance que documenta.

## Banco de definiciones para S01

Todas las formulaciones de esta sección son paráfrasis breves para el curso. Las definiciones de curso no sustituyen las definiciones de las fuentes. Los IDs de afirmación remiten a la auditoría posterior.

| definition_id | Unidad conceptual | Definición sintética para S01 | Capa | Soporte y límite |
|---|---|---|---|---|
| def-question-use | pregunta, salida y uso | Una pregunta de ML fija qué decisión o conocimiento se busca; la salida es la predicción, grupo, señal, representación o recomendación que responde; el uso indica qué hará una persona con esa salida | course-paraphrase | C-01, C-02, C-14. La partición pregunta-salida-uso es diseño pedagógico |
| def-ai | inteligencia artificial | En S01, IA es el paraguas para sistemas basados en máquina que producen predicciones, recomendaciones o decisiones respecto de objetivos definidos | course-paraphrase | C-01. NIST no avala la cadena completa del curso ni la corrección física |
| def-statistics | estadística | En S01, estadística nombra las herramientas para aprender de datos, describir variación y hacer explícito qué incertidumbre y qué límites acompañan una conclusión | course-paraphrase | C-02, C-19. La cláusula sobre incertidumbre es una ampliación didáctica; requiere fuentes específicas si se publica como definición formal |
| def-ml | aprendizaje automático | ML estudia algoritmos que mejoran con la experiencia; en S01 esa experiencia se concreta en datos y un criterio de evaluación | course-paraphrase | C-03, C-04. No equivale a aprendizaje científico ni implica validez causal |
| def-tpe | tarea, desempeño y experiencia | El esquema T-P-E describe una tarea T, una medida de desempeño P y la experiencia E que permite mejorar sobre T | course-paraphrase | C-04. El ejemplo de correo de Mitchell se usa como estructura, no se copia |
| def-instance | instancia | Una instancia es el objeto o evento individual al que se asocia una observación, representación, etiqueta o predicción; en S01 puede ser un TCE o un espectro sintético/observado | course-paraphrase | C-07, C-08, C-09. Una instancia de catálogo no equivale por sí misma a planeta confirmado |
| def-observation | observación | Una observación es una medición contextualizada, con instrumento, escala, calidad y posibles transformaciones; el recurso de misión debe indicar qué producto se está usando | course-paraphrase | C-07, C-08. Este paquete no asigna valores de instrumento no leídos |
| def-representation | representación | La representación es la forma numérica o estructurada con la que la tarea recibe la instancia, por ejemplo una curva de luz, una secuencia plegada o un vector espectral | course-paraphrase | C-08, C-09, C-16. Una representación no es la señal física completa |
| def-target | objetivo y etiqueta | En la convención de scikit-learn, X contiene variables de entrada y y el target aporta el resultado que se predice; una etiqueta puede ser humana, derivada o de simulación y debe declararse | course-paraphrase | C-06. La fuente documenta la interfaz, no el origen físico de una etiqueta |
| def-signal | señal | Señal es el patrón medible que interesa distinguir, modelar o resumir frente a ruido, artefactos y variación instrumental; en S01 la señal de tránsito se trata como objeto de análisis del caso Kepler | course-paraphrase | C-07, C-08. La palabra señal no prueba que el evento sea un planeta |
| def-supervised | supervisado | Aprendizaje supervisado ajusta una relación entre entradas y un target disponible durante el entrenamiento; clasificación y regresión son tareas posibles | course-paraphrase | C-06, C-16. La disponibilidad de un target no garantiza que sea correcto o representativo |
| def-unsupervised | no supervisado | Aprendizaje no supervisado busca estructura en entradas sin un target de clase suministrado; clustering y reducción son rutas posibles | course-paraphrase | C-06, C-17. Encontrar grupos no les asigna automáticamente significado físico |
| def-reinforcement | refuerzo | En aprendizaje por refuerzo, una secuencia de acciones recibe retroalimentación; en el caso exoplanetario de S01, el agente controla un espejo deformable desde imágenes de diversidad de fase y optimiza una recompensa óptica. El seguimiento como scheduling sigue siendo una aplicación distinta | course-paraphrase | C-05, C-18, C-32. Gutierrez et al. implementan PPO para imagen directa simulada; no implementan scheduling de objetivos ni observación en cielo |
| def-semi-self | semi-supervisado y auto-supervisado | Son rutas intermedias para explotar datos con etiquetas incompletas o para construir una señal de aprendizaje desde los propios datos; se dejan como vocabulario de mapa, no como caso principal de S01 | course-paraphrase | C-06 y C-05 como orientación conceptual. Requiere fuente específica antes de una afirmación técnica publicable |
| def-regression | regresión | Regresión produce una cantidad numérica o una distribución de parámetros a partir de entradas; la recuperación atmosférica se usa como ejemplo de curso y conserva sus degeneraciones | course-paraphrase | C-16, C-15. No se copian valores del caso publicado |
| def-classification | clasificación | Clasificación asigna una instancia a clases o probabilidades de clase; el caso de vetting de TCEs separa candidatos genuinos y falsos positivos según etiquetas del estudio | course-paraphrase | C-06, C-11. El significado de las etiquetas depende del protocolo del estudio |
| def-clustering | clustering | Clustering agrupa representaciones por similitud definida por el procedimiento; PCA puede preceder al agrupamiento para reducir o reorganizar la representación | course-paraphrase | C-06, C-17. Un cluster no es una taxonomía física validada |
| def-generation | generación | Generación produce contenido derivado a partir de una estructura o distribución aprendida; ExoGAN ofrece en S01 un caso publicado de DCGAN para completar representaciones de espectros y parámetros atmosféricos de exoplanetas. La simulación física de Goyal conserva una función separada como baseline/antecedente | course-paraphrase | C-02, C-19, C-33. ExoGAN usa entrenamiento forward sintético y retrieval; no convierte sus salidas en observaciones reales |
| def-anomaly | anomalía | Detección de anomalías busca observaciones que se apartan de una referencia o estructura; en el tránsito Kepler se mantiene como posible tarea de triage, no como explicación física | course-paraphrase | C-06, C-07. No se revisó un artículo exoplanetario específico de anomalías para este paquete |
| def-family | familia de modelos | Una familia reúne modelos que comparten una forma de representación, función o mecanismo de aprendizaje; la elección de familia condiciona qué patrones puede captar y qué supuestos introduce | course-paraphrase | C-05, C-11. No predice por sí sola un resultado |
| def-deep | aprendizaje profundo | En S01, aprendizaje profundo designa familias con varias capas de representación aprendida; la CNN del caso Kepler opera sobre series de luz transformadas | course-paraphrase | C-05, C-11. No se afirma que sea siempre superior |
| def-inductive-bias | sesgo inductivo | El sesgo inductivo es el conjunto de preferencias que permite generalizar desde datos finitos, como priorizar patrones locales o suavidad | course-paraphrase | C-05, C-11. Las preferencias son una lectura conceptual del modelo |
| def-generalization | generalización | Generalización es el desempeño sobre datos o condiciones no usados para ajustar el modelo; exige separar entrenamiento, validación y prueba y declarar cambios de dominio | course-paraphrase | C-05, C-11, C-15. Un test del artículo no transfiere automáticamente al curso |
| def-domain | dominio | Un dominio fija población, instrumento, representación, distribución y condiciones de adquisición; cambiar de sintético a observado o de instrumento puede cambiar la tarea efectiva | course-paraphrase | C-15, C-17. La formulación es de curso apoyada por las limitaciones de los artículos |
| def-domain-shift | cambio de dominio | Cambio de dominio es una diferencia relevante entre las condiciones de entrenamiento y las de uso, por ejemplo resolución, ruido, longitudes de onda o proceso de observación | course-paraphrase | C-15, C-17. No se estima aquí una magnitud de shift |
| def-baseline | línea base | Una línea base es un procedimiento simple y explícito contra el que se compara una familia más compleja; debe compartir, cuando sea posible, partición y evaluación | course-paraphrase | C-11. El baseline logístico es del artículo; la regla de usarlo en todas las unidades es elección pedagógica |
| def-evaluation | evaluación | Evaluar significa medir el comportamiento bajo un protocolo declarado, separando datos de ajuste y de prueba y relacionando métricas con el uso previsto | course-paraphrase | C-06, C-11, C-15. Ninguna métrica aislada certifica una interpretación planetaria |
| def-evidence | evidencia y afirmación | Una evidencia respalda una afirmación bajo condiciones documentadas; una afirmación de S01 debe declarar fuente, localización, límite y si el resultado es observado, simulado o didáctico | course-paraphrase | C-07, C-11, C-15, C-17. Es el contrato de trazabilidad de F01 |
| def-interpretation | interpretación y límite | Interpretar conecta la salida con la pregunta y explicita qué mecanismo, población o dominio quedan fuera del alcance del modelo | course-paraphrase | C-15, C-17. La interpretación científica exige revisar la fuente de dominio |

## Ejemplos canónicos propuestos

Los siguientes casos son fichas internas reutilizables. Cada ficha completa la cadena pregunta → representación → paradigma/tarea → familia/modelo → baseline/evaluación → interpretación/límites → transferencia. Las palabras “fuente” y “curso” separan lo documentado de la adaptación propuesta.

### F01-EX-01 · Flujo de TCE y señal de tránsito en Kepler

- example_id: f01-kepler-tce-pipeline
- status: verificado para el flujo documental; parcial para la lectura pedagógica de paradigmas
- visibility: internal
- publish_ready: false
- domain: exoplanet
- object_of_analysis: producto TCE y serie temporal de flujo asociada
- unit_ids: s01-question-opening, s01-question-outputs, s01-instance-opening, s01-instance-flow, s01-instance-notation, s01-signal-opening, s01-signal-paradigms, s01-signal-route, s01-domain-opening, s01-evidence-opening, s01-evidence-claim, s01-activity-signal
- existing_c01_context: s01-kepler-transit-signal
- question: ¿Qué patrón periódico de tránsito aparece en una serie temporal y cómo se conserva su trazabilidad hasta un registro TCE?
- representation: flujo corregido y productos de serie temporal documentados por la misión; extensión TCE con tiempo, fase, flujo y modelo, sin extraer valores de una instancia concreta
- paradigm_task: ruta de detección/triage de señal; no se atribuye aquí una etiqueta ML al pipeline
- family_model: no aplica para el ejemplo documental; el flujo de detección y validación de misión no se convierte en un modelo de aula
- baseline: no reportado por la documentación consultada como baseline de ML
- evaluation: umbrales, vetoes y creación de TCE están descritos por la documentación; no se presenta una métrica de ML ni una tasa de confirmación
- output_and_use: un TCE y sus productos permiten pasar a revisión y a otras etapas; el uso pedagógico es mostrar que instancia, señal, producto y afirmación tienen capas diferentes
- interpretation: una señal de tránsito documentada es un objeto de análisis; el ejemplo no afirma por sí mismo que exista un planeta confirmado
- limits: no se consulta una fila actual del archivo, no se descargan datos, no se atribuye una etiqueta humana concreta y no se afirma desempeño
- source_ids: kepler-dv-timeseries-2016, nasa-kepler-tce-columns, nasa-exoplanet-archive-api
- claim_ids: f01-c-kepler-pipeline, f01-c-kepler-products, f01-c-tce-fields
- asset_status: original-diagram-proposed
- rights: external_figure_reuse_hold; use only links and a future original schematic of the pipeline
- transfer_prompt: Cambiar la representación de la curva o la calidad de datos y pedir qué parte de la cadena queda sin soporte

### F01-EX-02 · Vetting supervisado de TCEs con curvas de luz

- example_id: f01-kepler-deep-vetting
- status: verificado para el estudio; parcial para cualquier transferencia al curso
- visibility: internal
- publish_ready: false
- domain: exoplanet
- object_of_analysis: TCE clasificado a partir de curvas de luz
- unit_ids: s01-question-lenses, s01-task-opening, s01-task-tree, s01-task-levels, s01-family-opening, s01-family-rules-learning, s01-family-bias, s01-evidence-opening, s01-evidence-capacity, s01-evidence-claim, s01-activity-rules, s01-activity-levels, s01-activity-evidence
- question: ¿Puede una representación de curva de luz distinguir las clases definidas por el estudio de vetting?
- representation: representaciones global y local de curvas de luz, con mediciones aplanadas, plegadas y agrupadas según el protocolo descrito
- paradigm_task: supervisado; clasificación binaria de las clases del estudio
- family_model: redes neuronales convolucionales de una dimensión con una, dos o tres entradas según la representación
- baseline: regresión logística lineal reportada por el estudio
- evaluation: partición aleatoria de entrenamiento, validación y prueba; el estudio reporta 1.523 TCEs en prueba. Para una de sus configuraciones, la Tabla 1 reporta accuracy 0,960 y AUC 0,988; estos números pertenecen al estudio y no son resultados de este repositorio
- output_and_use: probabilidad/clase para priorizar revisión de TCEs
- interpretation: el resultado responde a una tarea de clasificación definida por etiquetas del estudio; no sustituye revisión física ni confirma una naturaleza planetaria
- limits: el artículo documenta correcciones de etiquetas y particiones del estudio; la etiqueta puede contener error, el dominio es el pipeline Kepler y la transferencia a otro instrumento/dataset queda abierta
- source_ids: shallue-vanderburg-2018, sklearn-glossary-1.9, mitchell-key-ideas-2017
- claim_ids: f01-c-shallue-representation, f01-c-shallue-supervised, f01-c-shallue-baseline, f01-c-shallue-test, f01-c-shallue-metrics, f01-c-shallue-label-noise
- asset_status: original-diagram-proposed
- rights: external_figure_reuse_hold; any teaching chart must be redrawn from the cited description or generated from a newly licensed/reproducible source
- transfer_prompt: Repetir la comparación con etiquetas simuladas y preguntar qué parte del AUC deja de ser interpretable si cambia el dominio

### F01-EX-03 · Registro TCE/catálogo como instancia estructurada

- example_id: f01-kepler-tce-catalog
- status: parcial
- visibility: internal
- publish_ready: false
- domain: exoplanet
- object_of_analysis: registro estructurado de un TCE y sus parámetros documentados
- unit_ids: s01-instance-opening, s01-instance-notation, s01-task-opening, s01-evidence-claim, s01-activity-levels
- question: ¿Qué información de un registro permite reconstruir qué se midió, qué se ajustó y qué incertidumbre acompaña el registro?
- representation: identificador de objetivo, periodo, época, razón de radios y parámetros de ajuste según la documentación TCE; se omite cualquier valor concreto
- paradigm_task: descripción/diagnóstico de instancia; no se asigna una tarea ML por defecto
- family_model: no aplica
- baseline: no aplica
- evaluation: auditoría de presencia, procedencia y consistencia de campos; no se declara un resultado de catálogo
- output_and_use: ficha de instancia para decidir qué entrada puede llegar a una tarea
- interpretation: un campo es evidencia sobre el registro que documenta; la mezcla de referencias en tablas compiladas exige cuidado
- limits: la página actual de columnas PS no fue accesible; no se afirma el esquema completo, no se consulta una fila y no se infiere confirmación
- source_ids: nasa-kepler-tce-columns, nasa-pscomppars-calculation, nasa-exoplanet-archive-api
- claim_ids: f01-c-tce-fields, f01-c-pscomp-reference-mix, f01-c-api-scope
- asset_status: none
- rights: metadata_link_only; no se redistribuyen filas ni capturas
- transfer_prompt: Marcar qué columnas sobreviven cuando se cambia de TCE a espectro y cuáles deben volver a documentarse

### F01-EX-04 · Retrieval supervisado de atmósferas

- example_id: f01-atmosphere-supervised-retrieval
- status: verificado para el artículo; parcial para la transferencia docente
- visibility: internal
- publish_ready: false
- domain: exoplanet
- object_of_analysis: espectro de transmisión sintético y observado
- unit_ids: s01-question-outputs, s01-instance-opening, s01-instance-flow, s01-instance-notation, s01-task-tree, s01-task-levels, s01-family-opening, s01-family-bias, s01-domain-opening, s01-domain-shift, s01-domain-diagnosis, s01-evidence-opening, s01-evidence-capacity, s01-evidence-claim, s01-activity-transfer
- question: ¿Qué parámetros atmosféricos puede recuperar un modelo entrenado con espectros sintéticos y qué cambia al comparar un espectro observado?
- representation: vector de profundidad de tránsito por longitud de onda; el artículo describe un conjunto sintético y una comparación con 29 puntos WFC3 de HD 209458b
- paradigm_task: supervisado; regresión/retrieval de parámetros atmosféricos
- family_model: random forest, según el artículo
- baseline: comparación del artículo con un retrieval por nested sampling; no se propone que uno sea universalmente mejor
- evaluation: predicción en espectros sintéticos y comparación de estimaciones/incertidumbres con el caso observado descrito por el artículo
- output_and_use: parámetros estimados y sus incertidumbres para inspección de degeneraciones
- interpretation: la salida es útil bajo los supuestos del modelo atmosférico, las distribuciones sintéticas y la observación comparada
- limits: el artículo discute degeneraciones y el costo/alcance del entrenamiento; el paquete no transfiere R², tiempos, parámetros ni incertidumbres a un dataset de S01
- source_ids: pinhas-et-al-2020
- claim_ids: f01-c-pinhas-training, f01-c-pinhas-observed, f01-c-pinhas-degeneracy
- asset_status: original-diagram-proposed
- rights: external_figure_reuse_hold; redibujar solo una cadena sintético → modelo → observado con datos propios/licenciados en una fase posterior
- transfer_prompt: Simular una caída de resolución y pedir cuáles parámetros ya no admiten la misma interpretación

### F01-EX-05 · PCA y k-means para espectros atmosféricos

- example_id: f01-atmosphere-unsupervised-clustering
- status: verificado para el artículo; parcial para la lectura de dominio
- visibility: internal
- publish_ready: false
- domain: exoplanet
- object_of_analysis: vector de espectro de transmisión sintético
- unit_ids: s01-signal-paradigms, s01-signal-route, s01-task-tree, s01-task-levels, s01-family-opening, s01-family-bias, s01-domain-shift, s01-domain-diagnosis, s01-evidence-capacity, s01-activity-levels, s01-activity-transfer
- question: ¿Qué estructura de similitud aparece al reducir y agrupar espectros sintéticos, y bajo qué condiciones puede orientar un prior?
- representation: vector espectral por longitud de onda, reducido mediante PCA
- paradigm_task: no supervisado; clustering con k-means y uso de distribuciones de grupo como priors informados
- family_model: reducción lineal más agrupamiento
- baseline: la comparación didáctica debe ser contra una selección de prior no informada; el artículo no se convierte aquí en una comparación universal
- evaluation: coherencia del agrupamiento y utilidad en el procedimiento del artículo; no se importa una métrica numérica a S01
- output_and_use: grupo y distribución de parámetros que pueden orientar una búsqueda posterior
- interpretation: un grupo resume similitud en la representación elegida; no prueba que el grupo sea una clase física
- limits: el artículo exige compatibilidad de apariencia, resolución y bins de longitud de onda para clasificar un espectro no visto; sus supuestos sintéticos limitan la transferencia
- source_ids: goyal-et-al-2020
- claim_ids: f01-c-goyal-vector, f01-c-goyal-pca-kmeans, f01-c-goyal-domain
- asset_status: original-diagram-proposed
- rights: external_figure_reuse_hold; construir un plano PCA propio solo con datos pedagógicos autorizados
- transfer_prompt: Cambiar bins o ruido y separar “grupo encontrado” de “interpretación física”

### F01-EX-06 · Planificación de seguimiento como decisión

- example_id: f01-followup-scheduling
- status: parcial; RL de control instrumental verificado, scheduling RL pendiente
- visibility: internal
- publish_ready: false
- domain: exoplanet
- object_of_analysis: conjunto de objetivos de seguimiento RV y acciones de programación
- unit_ids: s01-question-lenses, s01-signal-paradigms, s01-signal-route, s01-task-opening, s01-task-levels, s01-domain-opening, s01-evidence-claim, s01-activity-transfer
- question: ¿Qué observación de seguimiento conviene priorizar cuando cada acción cambia la información disponible?
- representation: para Cabona, estado de objetivos, calendario y utilidad esperada; para Gutierrez, imágenes de diversidad de fase y comando previo del espejo deformable
- paradigm_task: decisión secuencial; Gutierrez et al. implementan RL model-free sobre el control instrumental de imagen directa, mientras Cabona conserva el scheduling RV como simulación sin RL
- family_model: PPO actor-critic con redes neuronales para control de espejo deformable; no se atribuye RL a Cabona
- baseline: estrategia de programación myopic como contraste conceptual reportado en el artículo
- evaluation: Cabona compara estrategias en una campaña simulada; Gutierrez evalúa Strehl en el caso no coronográfico y la intensidad normalizada del dark hole en el caso coronográfico simulado. El paquete conserva ambos resultados como evidencia de sus respectivos artículos y no los transfiere al curso
- output_and_use: prioridad de seguimiento para una simulación docente
- interpretation: Cabona muestra valor informativo del scheduling; Gutierrez muestra una implementación RL pertinente para suprimir luz estelar en imagen directa. Son problemas astronómicos relacionados pero no intercambiables
- limits: la implementación RL es simulada, preliminar y orientada al control óptico; no prueba una política para priorizar objetivos TESS/RV ni resultados on-sky
- source_ids: cabona-et-al-2021, gutierrez-et-al-2024-rl-exoplanet-imaging, mitchell-key-ideas-2017
- claim_ids: f01-c-cabona-followup, f01-c-cabona-simulation, f01-c-mitchell-rl, f01-c-gutierrez-rl-exoplanet-imaging
- asset_status: original-diagram-proposed
- rights: external_figure_reuse_hold; proponer una línea de tiempo/árbol de decisiones original
- transfer_prompt: Introducir una observación faltante y exigir que se declare la recompensa antes de elegir una acción

### F01-EX-07 · Espectro sintético como generación conceptual

- example_id: f01-synthetic-spectrum-generation
- status: verificado para familia generativa; experimento pedagógico y derechos de integración pendientes
- visibility: internal
- publish_ready: false
- domain: exoplanet
- object_of_analysis: espectro sintético condicionado por parámetros atmosféricos
- unit_ids: s01-task-tree, s01-task-levels, s01-family-opening, s01-domain-shift, s01-evidence-opening, s01-evidence-claim, s01-activity-evidence
- question: ¿Cómo se puede generar una representación sintética para explorar una distribución de escenarios atmosféricos sin presentarla como observación?
- representation: vector espectral sintético y parámetros que lo condicionan
- paradigm_task: generación/reconstrucción de una representación atmosférica; ExoGAN aplica una DCGAN con inpainting a espectros y parámetros de exoplanetas, mientras Goyal aporta una simulación física separada
- family_model: GAN, específicamente DCGAN (ExoGAN), con generador y discriminador convolucionales; la familia queda documentada por el artículo, sin afirmar que sea la única adecuada
- baseline: simulador/regla física documentada como contraste conceptual
- evaluation: consistencia con el simulador y con restricciones de representación que se declaren; no se reporta métrica
- output_and_use: datos de práctica para separar generación, evaluación y evidencia
- interpretation: ExoGAN demuestra una familia generativa aplicada a retrieval y reconstrucción dentro de un espacio atmosférico definido por TauREx; las salidas generadas no prueban por sí mismas la distribución de atmósferas del cielo
- limits: el entrenamiento usa modelos forward sintéticos, la evaluación pertenece al artículo y la transferencia a datos observados, otro instrumento o una práctica del curso requiere validación propia
- source_ids: nist-generative-ai-glossary-2025, goyal-et-al-2020, zingales-waldmann-2018-exogan
- claim_ids: f01-c-nist-generation, f01-c-goyal-synthetic, f01-c-zingales-exogan, f01-c-generation-block
- asset_status: original-diagram-proposed
- rights: no_external_asset; cualquier gráfico debe generarse desde datos sintéticos propios y quedar marcado como ilustrativo
- transfer_prompt: Alterar el instrumento simulado y escribir qué propiedad del dato debe conservarse para que la comparación sea honesta

## Matriz de cobertura por unidad

La matriz incluye cada ID de S01 del inventario de unidades. Un ejemplo compartido puede cubrir varias unidades; la fila conserva el foco de esa unidad. Cuando el ejemplo es conceptual o la evidencia no alcanza, se deja el bloqueo individual.

| unit_id | idea de la unidad | example_id o resultado | definition_ids | claim_ids | estado | siguiente acción o bloqueo |
|---|---|---|---|---|---|---|
| s01-bibliography-0 | bibliografía y apertura | N/A: mapa de fuentes | def-question-use, def-ml | f01-c-bibliography-access | verificado para localización | La edición, las secciones y las páginas del PDF privado quedaron documentadas; la revisión editorial y los derechos de cualquier uso público siguen pendientes |
| s01-question-opening | una pregunta organiza el recorrido | f01-kepler-tce-pipeline | def-question-use, def-observation | f01-c-kepler-pipeline | verificado | Convertir la pregunta en ficha editorial después de revisión C01/F04 |
| s01-question-outputs | salida y uso de la salida | f01-kepler-deep-vetting, f01-atmosphere-supervised-retrieval | def-question-use, def-target, def-evaluation | f01-c-shallue-supervised, f01-c-pinhas-observed | parcial | Precisar el uso docente y mantener separados resultado del artículo y transferencia |
| s01-question-lenses | lentes IA, estadística y ML | f01-kepler-deep-vetting, f01-followup-scheduling | def-ai, def-statistics, def-ml, def-reinforcement | f01-c-ai-output, f01-c-statistics-learning, f01-c-ml-improves, f01-c-cabona-followup, f01-c-gutierrez-rl-exoplanet-imaging | parcial | La partición de tres lentes es de curso; el caso RL documenta control instrumental simulado y no sustituye un caso de scheduling |
| s01-instance-opening | instancia como objeto de análisis | f01-kepler-tce-pipeline, f01-kepler-tce-catalog | def-instance, def-observation | f01-c-kepler-products, f01-c-tce-fields | verificado | No asignar “planeta confirmado” a la instancia sin fuente de estado |
| s01-instance-flow | flujo de datos de la instancia | f01-kepler-tce-pipeline | def-instance, def-representation, def-signal | f01-c-kepler-pipeline, f01-c-kepler-products | verificado | Dibujar esquema original y documentar cada transformación |
| s01-instance-notation | notación de entrada, target y salida | f01-kepler-tce-catalog, f01-kepler-deep-vetting | def-target, def-representation | f01-c-tce-fields, f01-c-shallue-representation | parcial | El esquema actual de PS quedó bloqueado; usar solo campos TCE leídos |
| s01-signal-opening | señal frente a observación | f01-kepler-tce-pipeline | def-signal, def-observation | f01-c-kepler-pipeline | verificado | Mantener “señal de tránsito” como objeto documental, no como confirmación |
| s01-signal-paradigms | paradigmas posibles | f01-kepler-deep-vetting, f01-atmosphere-unsupervised-clustering, f01-followup-scheduling | def-supervised, def-unsupervised, def-reinforcement | f01-c-shallue-supervised, f01-c-goyal-pca-kmeans, f01-c-mitchell-rl, f01-c-gutierrez-rl-exoplanet-imaging | parcial | RL ya tiene fuente primaria pertinente para imagen directa; queda pendiente decidir si S01 necesita además scheduling RL de objetivos |
| s01-signal-route | ruta señal → tarea | f01-kepler-tce-pipeline, f01-atmosphere-unsupervised-clustering | def-signal, def-representation, def-task | f01-c-kepler-products, f01-c-goyal-domain | parcial | Revisar la ruta para que no mezcle detección de misión con clasificación ML |
| s01-task-opening | tarea como verbo operativo | f01-kepler-deep-vetting, f01-atmosphere-supervised-retrieval | def-classification, def-regression | f01-c-shallue-supervised, f01-c-pinhas-training | verificado | Mantener la tarea explícita antes de nombrar una familia |
| s01-task-tree | árbol de tareas | f01-kepler-deep-vetting, f01-atmosphere-unsupervised-clustering, f01-synthetic-spectrum-generation | def-classification, def-regression, def-clustering, def-generation, def-anomaly | f01-c-shallue-supervised, f01-c-goyal-pca-kmeans, f01-c-zingales-exogan | parcial | Generación ya tiene familia generativa documentada; anomalías y la actividad del curso permanecen preparatorias |
| s01-task-levels | niveles de tarea | f01-kepler-deep-vetting, f01-atmosphere-supervised-retrieval | def-task, def-family, def-evaluation | f01-c-shallue-baseline, f01-c-pinhas-degeneracy | parcial | La fuente Nature alternativa está bloqueada; no usarla para completar niveles |
| s01-family-opening | familia antes que modelo | f01-kepler-deep-vetting, f01-atmosphere-supervised-retrieval | def-family, def-deep | f01-c-shallue-baseline, f01-c-ml-improves | verificado | Verificar en revisión editorial que familia y modelo no se presenten como sinónimos |
| s01-family-rules-learning | reglas frente a aprendizaje | f01-kepler-deep-vetting | def-tpe, def-family, def-baseline | f01-c-ml-improves, f01-c-shallue-baseline | parcial | La actividad es pedagógica; requiere registrar la regla exacta antes de ejecutarla |
| s01-family-bias | sesgo inductivo y generalización | f01-kepler-deep-vetting, f01-atmosphere-unsupervised-clustering | def-inductive-bias, def-generalization | f01-c-mitchell-generalization, f01-c-shallue-label-noise, f01-c-goyal-domain | parcial | Mantener el ejemplo de CNN/PCA como ilustración de supuestos, no como ranking de modelos |
| s01-domain-opening | dominio de datos | f01-atmosphere-supervised-retrieval | def-domain, def-representation | f01-c-pinhas-training, f01-c-pinhas-observed | verificado | Etiquetar explícitamente sintético y observado |
| s01-domain-shift | cambio de dominio | f01-atmosphere-supervised-retrieval, f01-atmosphere-unsupervised-clustering | def-domain-shift, def-generalization | f01-c-pinhas-degeneracy, f01-c-goyal-domain | verificado | Convertir resolución, bins y ruido en preguntas de transferencia, sin cuantificar shift |
| s01-domain-diagnosis | diagnosticar el cambio | f01-atmosphere-unsupervised-clustering, f01-synthetic-spectrum-generation | def-domain-shift, def-evidence | f01-c-goyal-domain, f01-c-zingales-exogan | parcial | La fuente Nature sobre diagnóstico quedó bloqueada; ExoGAN aporta un caso sintético que exige declarar instrumento, resolución y representación |
| s01-evidence-opening | qué cuenta como evidencia | f01-kepler-deep-vetting, f01-atmosphere-supervised-retrieval | def-evidence, def-evaluation | f01-c-shallue-test, f01-c-pinhas-observed | verificado | Separar evidencia del estudio y evidencia que el curso produciría |
| s01-evidence-capacity | capacidad y límite de la evidencia | f01-kepler-deep-vetting, f01-atmosphere-unsupervised-clustering | def-generalization, def-domain, def-evidence | f01-c-shallue-metrics, f01-c-goyal-domain | parcial | No traducir AUC, clusters o comparación sintética en afirmación planetaria |
| s01-evidence-claim | redactar una afirmación limitada | f01-kepler-tce-catalog, f01-atmosphere-supervised-retrieval | def-evidence, def-interpretation | f01-c-pscomp-reference-mix, f01-c-pinhas-degeneracy, f01-c-bibliography-access | parcial | Cada frase pública futura debe heredar claim_id, ubicación, fecha y límite |
| s01-activity-rules | regla vs aprendizaje | f01-kepler-deep-vetting | def-tpe, def-baseline | f01-c-shallue-baseline | parcial | Caso didáctico; no inventar un resultado de la actividad |
| s01-activity-signal | tránsito, binario y artefacto | f01-kepler-tce-pipeline | def-signal, def-observation | f01-c-kepler-pipeline | parcial | Las etiquetas binario/artefacto son contraste docente; no atribuirlas al archivo Kepler sin fuente |
| s01-activity-levels | árbol señal/tarea/familia | f01-kepler-deep-vetting, f01-atmosphere-unsupervised-clustering | def-signal, def-task, def-family | f01-c-shallue-supervised, f01-c-goyal-pca-kmeans | parcial | Usar ejemplos de método, sin presentarlos como catálogo exhaustivo |
| s01-activity-evidence | resultado sintético y evidencia | f01-synthetic-spectrum-generation, f01-kepler-deep-vetting | def-generation, def-evidence, def-evaluation | f01-c-goyal-synthetic, f01-c-zingales-exogan | pendiente | ExoGAN cierra la familia publicada, pero falta un experimento sintético propio y reproducible; conservar la actividad como escenario |
| s01-activity-transfer | cambio de instrumento | f01-atmosphere-supervised-retrieval, f01-atmosphere-unsupervised-clustering | def-domain-shift, def-generalization | f01-c-pinhas-degeneracy, f01-c-goyal-domain | parcial | La menor resolución o datos faltantes son hipótesis de transferencia, no resultado medido |

## Auditoría de afirmaciones atómicas

| claim_id | afirmación exacta usada en el paquete | tipo | source_id | localización precisa | fecha | estado | la fuente sí respalda | la fuente no respalda | límite aplicado |
|---|---|---|---|---|---|---|---|---|---|
| f01-c-ai-output | Un sistema de IA puede producir predicciones, recomendaciones o decisiones para objetivos definidos | source-fact | nist-ai-glossary-2025 | entrada AI, Definitions, definición atribuida a SP 800-218A | 2026-09-08 | verificado | definición institucional general de AI | dominio exoplanetario, calidad o causalidad | Se usa solo para abrir la lente IA |
| f01-c-statistics-learning | La estadística se formula institucionalmente como ciencia de aprender de datos | source-fact | asa-statistics-education-charter-2025 | Article II, Objectives, párrafo inicial | 2026-09-08 | verificado | frase de alcance de educación estadística | una teoría completa de incertidumbre | Se presenta como punto de partida y no como glosario exhaustivo |
| f01-c-ml-improves | ML estudia algoritmos que mejoran automáticamente con la experiencia | source-fact | cmu-mitchell-mlbook-1997 | descripción inicial de la página Machine Learning | 2026-09-08 | verificado | descripción general del autor | formalismo E-T-P y desempeño astronómico | Se añade que los datos y la evaluación son decisiones de S01 |
| f01-c-tpe | Una tarea T, un desempeño P y una experiencia E forman el esquema operativo de Mitchell | source-fact | mitchell-key-ideas-2017 | PDF pp. 1-2, secciones T, P, E y ejemplo de correo | 2026-09-08 | verificado | relaciones y ejemplo conceptual del documento leído | que el esquema sea suficiente para una investigación | Se parafrasea y se conserva el enlace por derechos |
| f01-c-mitchell-generalization | La generalización requiere supuestos y evaluación sobre datos no usados para ajustar | course-paraphrase | mitchell-key-ideas-2017 | PDF pp. 3-5, generalización, sesgo-varianza, sobreajuste y validación | 2026-09-08 | parcial | relación entre generalización, supuestos y validación | un umbral universal o una regla astronómica | Se marca como paráfrasis y se evita cuantificar |
| f01-c-supervised | scikit-learn usa supervised para aprendizaje con target y distingue target de entradas | source-fact | sklearn-glossary-1.9 | entradas supervised, target, X e y | 2026-09-08 | verificado | convenciones de documentación | validez de las etiquetas astronómicas | La procedencia de y se exige por separado |
| f01-c-unsupervised | scikit-learn distingue unsupervised de una tarea con target de clase suministrado | source-fact | sklearn-glossary-1.9 | entradas unsupervised, unlabeled, clusterer | 2026-09-08 | verificado | distinción API/conceptual | que un cluster tenga significado físico | Se conserva la limitación en def-clustering |
| f01-c-mitchell-rl | El aprendizaje por refuerzo usa retroalimentación retardada y acciones/estados en una secuencia | source-fact | mitchell-key-ideas-2017 | PDF p. 9, delayed feedback y reinforcement learning | 2026-09-08 | verificado | marco conceptual de RL | que el seguimiento Cabona sea RL | La conexión exoplanetaria queda como propuesta pedagógica |
| f01-c-gutierrez-rl-exoplanet-imaging | Gutierrez et al. implementan RL model-free con PPO para controlar un espejo deformable desde imágenes de diversidad de fase en imagen directa de exoplanetas | source-fact | gutierrez-et-al-2024-rl-exoplanet-imaging | proceedings SPIE PDF pp. 2–3, §§2.2–2.3 (MDP, observación, acción, recompensa, PPO); pp. 5–7, §§4.1–4.2 (coronógrafo simulado, dark hole y resultados); p. 8, §5 (validación futura) | 2026-09-08 | verificado | implementación RL pertinente al control instrumental de una observación de exoplanetas y su evaluación simulada | scheduling de seguimiento, observación en cielo o validez operacional | Se etiqueta como control de imagen directa simulado y preliminar; no se usa para afirmar que Cabona emplee RL |
| f01-c-nist-generation | La IA generativa se define como una clase de modelos que genera contenido sintético derivado | source-fact | nist-generative-ai-glossary-2025 | entrada generative artificial intelligence, Definitions | 2026-09-08 | verificado | definición institucional general | fidelidad física o uso de un generador exoplanetario | No se usa para afirmar un modelo concreto |
| f01-c-kepler-pipeline | La documentación Kepler describe una búsqueda de firmas periódicas parecidas a tránsitos en series temporales y su paso a TCE/DV | source-fact | kepler-dv-timeseries-2016 | PDF p. 6, §1 Introduction; pp. 6-7, SES/MES, TCE y DV | 2026-09-08 | verificado | flujo y productos de la misión | una métrica ML o confirmación | Se mantiene como ejemplo de señal/producto |
| f01-c-kepler-products | Las extensiones TCE documentan tiempo, fase, flujo y modelo en productos de curva | source-fact | kepler-dv-timeseries-2016 | PDF pp. 7-8, §2.2 TCE Extensions | 2026-09-08 | verificado | estructura de productos descrita | una fila o valor actual concreto | No se descargan datos |
| f01-c-tce-fields | La documentación del archivo describe identificadores TCE y parámetros como periodo, época y razón de radios, con advertencias sobre errores/covarianzas | source-fact | nasa-kepler-tce-columns | §§1-2 Target Labels and Transit Fit Parameters | 2026-09-08 | verificado | campos y cautela documental | el estado de confirmación de una instancia | Se presenta como esquema de representación |
| f01-c-api-scope | El archivo ofrece tablas y vías API/TAP para consultas programáticas | source-fact | nasa-exoplanet-archive-api | §Data Available Through API y §Query Syntax | 2026-09-08 | verificado | alcance de interfaces | una consulta ejecutada en F01 | Se declara que no se consultó una fila |
| f01-c-pscomp-reference-mix | PSCompPars puede reunir parámetros provenientes de referencias distintas y valores calculados que no tienen incertidumbre | source-fact | nasa-pscomppars-calculation | §§1-2, selección de valores y parámetros calculados | 2026-09-08 | verificado | advertencia de heterogeneidad y valores calculados | un valor físico concreto o consistencia universal | Se usa para exigir procedencia |
| f01-c-shallue-representation | El estudio de Shallue y Vanderburg describe representaciones global y local construidas desde curvas de luz procesadas | source-fact | shallue-vanderburg-2018 | §§III.2-III.3, light curves, flattening, folding, binning y entradas global/local | 2026-09-08 | verificado | representación y preparación del artículo | que esas transformaciones sean la única opción | Se usa como caso publicado |
| f01-c-shallue-supervised | El caso de Shallue es una clasificación supervisada de TCEs con etiquetas del estudio y redes convolucionales | source-fact | shallue-vanderburg-2018 | §§I, III.1 y IV, TCEs, labels y arquitecturas | 2026-09-08 | verificado | tarea, datos y familias del artículo | desempeño fuera de Kepler o causalidad | Se conserva el dominio del estudio |
| f01-c-shallue-baseline | El estudio compara sus redes con una regresión logística lineal como baseline | source-fact | shallue-vanderburg-2018 | §IV.1, Logistic Regression | 2026-09-08 | verificado | baseline reportado | que sea el mejor baseline general | Se usa como regla de diseño para S01, marcada como elección |
| f01-c-shallue-test | El estudio separa entrenamiento/validación/prueba y reporta 1.523 TCEs en la prueba descrita | source-fact | shallue-vanderburg-2018 | §III.1 y §V, descripción de partición y test set | 2026-09-08 | verificado | protocolo y tamaño del test del artículo | tamaño o partición del curso | El número se atribuye siempre al artículo |
| f01-c-shallue-metrics | Para una configuración reportada, la Tabla 1 muestra accuracy 0,960 y AUC 0,988 | measured-result | shallue-vanderburg-2018 | §V.1, Tables 1-2, configuración global+local indicada por el artículo | 2026-09-08 | verificado | valores medidos/reportados en ese estudio | resultado reproducido por este repositorio | Se incluye solo como resultado ajeno y contextualizado |
| f01-c-shallue-label-noise | El artículo registra correcciones o problemas de etiquetas durante la construcción del conjunto | source-fact | shallue-vanderburg-2018 | §III.1, discusión de mislabeling y particiones | 2026-09-08 | verificado | limitación de etiquetas del estudio | una tasa general de error o el curso | Se usa para enseñar capacidad y límite |
| f01-c-pinhas-training | Pinhas et al. describen entrenamiento con espectros atmosféricos sintéticos y predicción de parámetros | source-fact | pinhas-et-al-2020 | §3, subsecciones de training/validation y predicción | 2026-09-08 | verificado | diseño sintético y retrieval supervisado | validez universal o datos del curso | Se conserva la palabra sintético |
| f01-c-pinhas-observed | El artículo compara estimaciones con un espectro observado de HD 209458b descrito con 29 puntos WFC3 | source-fact | pinhas-et-al-2020 | §3, párrafos de observed WFC3 spectrum y comparación | 2026-09-08 | verificado | objeto, instrumento y cantidad descrita por el artículo | una nueva medición o una conclusión del curso | No se reutilizan valores |
| f01-c-pinhas-degeneracy | El artículo discute degeneraciones y la comparación entre estimaciones/incertidumbres de métodos | source-fact | pinhas-et-al-2020 | §3 y discusión sobre degeneracies y parameter estimates | 2026-09-08 | verificado | limitación interpretativa | solución única o transferencia de incertidumbres | Se enseña como límite del dominio sintético-observado |
| f01-c-goyal-synthetic | Goyal et al. construyen espectros de transmisión sintéticos para estudiar la recuperación atmosférica | source-fact | goyal-et-al-2020 | §3.2, simulación y variables atmosféricas | 2026-09-08 | verificado | uso de simulación sintética | que sea un generador IA o un dataset observado | Se mantiene como antecedente de generación/simulación |
| f01-c-zingales-exogan | Zingales y Waldmann entrenan ExoGAN, una DCGAN, con arreglos ASPA de espectros atmosféricos y parámetros forward generados con TauREx, y la usan para reconstrucción/retrieval | source-fact | zingales-waldmann-2018-exogan | PDF UCL de 14 páginas, pp. 2–5, §§2.1–2.5 (GAN/DCGAN, ASPA, entrenamiento e inpainting); §§3–4 y Apéndices A–C (escenarios, evaluación y configuración) | 2026-09-08 | verificado | familia GAN/DCGAN específica y aplicación a espectros/parámetros de atmósferas de exoplanetas | una validación observacional universal, una métrica del repositorio o adecuación automática a otros instrumentos | Se conserva el carácter sintético del entrenamiento, la tarea de retrieval y el límite de transferencia |
| f01-c-goyal-vector | El artículo representa el espectro como vector de profundidad de tránsito por longitud de onda | source-fact | goyal-et-al-2020 | §3.2, spectrum vector ΔF(λ) y resolución espectral | 2026-09-08 | verificado | forma de entrada y resolución | un único formato válido | Se usa para notación y transferencia |
| f01-c-goyal-pca-kmeans | El procedimiento usa PCA y k-means para clasificar espectros no vistos y formar priors informados | source-fact | goyal-et-al-2020 | §§2-3, PCA, k-means y informed priors | 2026-09-08 | verificado | método descrito | que los grupos sean clases físicas | Se explicita la interpretación limitada |
| f01-c-goyal-domain | El artículo exige similitud de apariencia, bins de longitud de onda y condiciones de resolución para la clasificación de un espectro no visto | source-fact | goyal-et-al-2020 | §3.2, requisitos para unseen spectrum y wavelength bins | 2026-09-08 | verificado | condición de compatibilidad de dominio | una magnitud universal de domain shift | Se usa como diagnóstico cualitativo |
| f01-c-cabona-followup | Cabona et al. plantean programar seguimiento RV de objetivos TESS para maximizar información sobre masas/parámetros orbitales | source-fact | cabona-et-al-2021 | resumen e introducción, objetivo del scheduling | 2026-09-08 | verificado | pregunta astronómica y utilidad de seguimiento | que usen RL o que el resultado sea observado | La tarea se presenta como decisión secuencial |
| f01-c-cabona-simulation | El artículo trabaja con una campaña o muestra simulada al comparar estrategias de programación | source-fact | cabona-et-al-2021 | conclusiones y descripción del experimento simulado | 2026-09-08 | verificado | carácter simulado | desempeño en una misión real o curso | Se marca como simulación |
| f01-c-generation-block | ExoGAN cierra la identificación de una familia generativa específica, pero la actividad del curso todavía requiere experimento y evaluación propios | course-paraphrase | zingales-waldmann-2018-exogan, goyal-et-al-2020 | ExoGAN §§2.1–2.5 y §§3–4; Goyal §3.2 | 2026-09-08 | parcial | existe una implementación primaria de DCGAN para espectros/atmósferas de exoplanetas | que una réplica del curso sea válida, que las salidas sean observaciones o que la familia sea universal | Se elimina el bloqueo bibliográfico y se conserva el bloqueo de integración/validación docente |
| f01-c-bibliography-access | El digest privado y los PDF locales declarados permiten localizar atómicamente las referencias de Géron 3.ª ed. y Kelleher 2015 | source-fact | geron-3e, kelleher-2015 | Géron PDF pp. 30, 38–39, 53, 61, 73, 80, 83, 87 y 106; Kelleher PDF pp. 41, 43, 46, 50, 52, 65, 68, 71, 77, 457–458, 461 y 466–467, con las secciones registradas en la tabla de fuentes | 2026-09-08 | verificado | edición, sección y página de PDF accesibles para la bibliografía y las síntesis generales declaradas | derechos de reproducción, aplicación exoplanetaria y cualquier afirmación no contenida en esas secciones | Se usan páginas del PDF privado, no se copian pasajes y no se presenta la localización como autorización pública |

## Activos, procedencia y próxima integración

- No se incorporan activos binarios, figuras externas, capturas, datasets, tablas ni texto copiado.
- Los diagramas marcados como original-diagram-proposed deberán generarse desde especificaciones propias y conservar una nota de procedencia del diseño. Hasta entonces, su estado es hold.
- Los números 1.523, 0,960 y 0,988 solo describen el artículo de Shallue y Vanderburg; no son métricas de un notebook, una demo o un resultado del repositorio.
- Los casos de Pinhas, Goyal y Cabona conservan la distinción entre simulación, datos observados y propuesta de aula.
- La integración editorial futura debe seleccionar ejemplos y claims desde este paquete, revisar C01 y F03/F04, y crear fichas conforme al contrato. Este archivo no autoriza promoción automática.

## Declaración de preparación

Cobertura preparatoria: 27/27 IDs de S01 tienen un ejemplo revisado, una propuesta conceptual claramente limitada o un bloqueo individual. La continuación del 2026-09-08 cerró la búsqueda bibliográfica de un caso RL pertinente a imagen directa de exoplanetas y de una familia generativa específica mediante ExoGAN. El paquete permanece en `drafting` por los límites de simulación/transferencia, las fuentes de alcance limitado, los activos originales y la revisión editorial aún pendientes.

status: drafting
visibility: internal
publish_ready: false
