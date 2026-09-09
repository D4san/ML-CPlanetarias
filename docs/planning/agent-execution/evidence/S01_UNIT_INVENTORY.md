# Inventario de unidades de S01

Revisión: E01 · 2026-09-08  
Procedencia del guion: `inbox/sessions/S01-ML-IA-metodos-estadisticos/SESSION_PACKET.md`,
`source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md`,
encabezado `Guion narrativo para impartir la sesión`.  
Estado editorial: `drafting`, `internal`, `publish_ready: false`.

Este documento asigna IDs estables y ordena el trabajo que E02–E07, F01/F03 y F04 deberán
recibir. El inventario distingue lo que ya existe en el piloto de lo que está decidido como
extensión y todavía no está implementado. Los índices de la interfaz sirven para navegación, no
para identidad persistente.

## Secuencia común

```text
bibliografía 0 → pregunta → instancia → señal → tarea → familia → dominio → evidencia
```

Cada estación conserva el hash histórico: `#pregunta`, `#instancia`, `#senal`, `#tarea`,
`#familia`, `#dominio`, `#evidencia`. La barra de presentación aplana las unidades; lectura las
recorre en el mismo orden y Actividades mantiene sus respuestas en un estado separado.

## Unidades por estación

| Orden | ID estable | Estación / parte | Estado en código | Idea y pregunta de trabajo | Visual o recurso | Ejemplo requerido | Conceptos / cautión | Pregunta docente |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | `s01-bibliography-0` | Bibliografía / apertura | Existe como `SessionBibliography` y diapositiva 0 | Qué lecturas orientan instancia, señal, tarea y evaluación | Dos tarjetas bibliográficas HTML | No aplica; la bibliografía no sustituye un ejemplo | `ml-project-baseline`; no atribuir páginas no comprobadas | Qué material usarás para sostener cada distinción |
| 1 | `s01-question-opening` | Pregunta / apertura | Existe como foco y apertura de `QuestionScene` | Qué queremos producir y para qué uso; qué unidad de análisis responde | Panel derecho y mapa de cinco salidas | `s01-question-exoplanet-use` | `question-output-use`, `scientific-problem`; una colección no define sola el problema | Qué salida sería útil y cómo reconoceríamos que responde |
| 2 | `s01-question-outputs` | Pregunta / cinco salidas | Existe como gráfico, tarjetas y definiciones directas | Predecir, describir estructura, estimar, decidir y generar son salidas distintas | Mapa radial de `s01Outcomes` | `s01-question-exoplanet-use` y F01 para casos concretos | `prediction-subject-representation`; predicción no implica futuro ni causalidad | Qué cambia en tarea y evaluación si cambia el verbo |
| 3 | `s01-question-lenses` | Pregunta / tres disciplinas | Existe como selector de lentes | IA, estadística y ML nombran aspectos relacionados con preguntas diferentes | Selector IA/estadística/ML y texto de lente | `s01-question-exoplanet-use` | `ai-statistics-ml`; síntesis amplia pendiente de bibliografía específica | Qué afirmación pertenece a cada lente y cuál queda sin justificar |
| 4 | `s01-instance-opening` | Instancia / apertura | Existe como foco y subslide piloto | Separar instancia, observación y representación | Panel de foco y entrada al flujo formal | `s01-instance-spectrum` | `prediction-subject-representation`; una instancia debe ser reconocible | Qué cuenta como caso individual en este problema |
| 5 | `s01-instance-flow` | Instancia / observación a salida | Existe como cadena formal de cinco nodos | Una observación se representa antes de entrar al modelo y producir una salida | Cadena SVG/HTML instancia → observación → representación → modelo → salida | `s01-instance-spectrum`, `s01-instance-catalog`, `s01-instance-followup` | `prediction-subject-representation`; no confundir fenómeno, dato y representación | Qué información conserva o pierde la representación |
| 6 | `s01-instance-notation` | Instancia / ajustar y usar | Existe con tres formalizaciones por ruta | Separar datos de ajuste, señal y uso en una instancia nueva/estado | Fórmulas accesibles y tarjetas | Los tres ejemplos anteriores, según ruta | `paradigm-task-family`; una salida estimada no es verdad física | Qué parte guía el ajuste y qué parte aparece al usar |
| 7 | `s01-signal-opening` | Señal / apertura | Existe como `SignalScene` y parte de apertura | Qué información está disponible para aprender | Mapa de ramas de señal | F01: curva etiquetada, catálogo y seguimiento | `learning-signal`; el paradigma se deriva de la señal | De dónde proviene la señal y qué sesgo contiene |
| 8 | `s01-signal-paradigms` | Señal / tres paradigmas | Existe como parte gráfica y definiciones | Distinguir objetivo por instancia, estructura sin objetivo y recompensa | Tres formas SVG y definiciones | `s01-instance-spectrum`, `s01-instance-catalog`, `s01-instance-followup` | `paradigm-task-family`; deep learning no es paradigma | Qué cambiaría si retiro la etiqueta o agrego una recompensa |
| 9 | `s01-signal-route` | Señal / ruta activa | Existe como parte de interacción, predicción y feedback | Justificar la ruta seleccionada por la señal disponible | Elección de paradigma y explicación | F01 debe aportar un caso con fuente pertinente | `learning-signal`; no inferir método por usar red neuronal | Qué información permite ajustar o evaluar aquí |
| 10 | `s01-task-opening` | Tarea / apertura | Existe como foco y árbol | La forma de la salida nombra la tarea antes del algoritmo | Panel derecho y árbol compacto | `s01-question-exoplanet-use` | `paradigm-task-family`; tarea y paradigma ocupan niveles distintos | Qué tipo de salida responde a la pregunta |
| 11 | `s01-task-tree` | Tarea / árbol de salidas | Existe como `TaskAlgorithmTree` | Una tarea puede abrir varias familias y métodos | Árbol con seis ramas y ejemplos textuales | F01: un caso por rama usada | `paradigm-task-family`; el árbol no elige un algoritmo automáticamente | Qué rama es pertinente y qué alternativas comparar |
| 12 | `s01-task-levels` | Tarea / tres niveles | Existe como `TaskLevelsGuide` | Ordenar señal → tarea → familia | Tres tarjetas de niveles y ruta activa | `s01-instance-spectrum` o catálogo según ruta | `paradigm-task-family`; clasificación no es supervisado | Qué término estás nombrando y en qué nivel |
| 13 | `s01-family-opening` | Familia / apertura | Existe como foco y parte de apertura | Varias reglas pueden concordar con la misma muestra | Panel de foco y comparación | F01: mismo caso con dos familias | `inductive-bias`; la familia es hipótesis de trabajo | Qué supuesto hace razonable esta familia |
| 14 | `s01-family-rules-learning` | Familia / reglas y aprendizaje | Existe como parte gráfica de comparación | Contrastar reglas explícitas con relaciones ajustadas desde ejemplos | Comparación y tarjetas de elección | `s01-question-exoplanet-use` | `inductive-bias`; más capacidad no corrige datos frágiles | Qué experiencia aporta el aprendizaje y cómo medirlo |
| 15 | `s01-family-bias` | Familia / sesgo inductivo | Existe como parte de interacción | Una muestra finita admite soluciones compatibles; la familia incorpora preferencias | Mapa de sesgos y selección | F01: caso exoplanetario con baseline documentada o `not_reported` | `generalization-inductive-bias`; no afirmar mejor modelo sin comparación | Qué línea base debe superar y bajo qué condiciones |
| 16 | `s01-domain-opening` | Dominio / apertura | Existe como foco y parte de apertura | Entrenamiento y uso pueden diferir por medición, selección o población | Panel y contraste sintético/observado | `s01-instance-spectrum` | `domain-shift`; simulación no equivale a observación | Los datos de ajuste representan el uso |
| 17 | `s01-domain-shift` | Dominio / cambio de condiciones | Existe como parte gráfica | Ruido, resolución, faltantes y selección alteran la representación | Comparación de condiciones; asset condicionado a F03 | F01: espectros sintéticos/observados con fuente o declarar didáctico | `domain-shift`, `prediction-subject-representation`; no inventar valores | Qué componente del dominio cambió primero |
| 18 | `s01-domain-diagnosis` | Dominio / diagnóstico y transferencia | Existe como controles de dominio y actividad `transfer` | Revisar medición, representación, partición y métrica antes de culpar al modelo | Selector sintético/observado y explicación | `s01-instance-followup` o espectro investigado por F01 | `domain-shift`, `ml-project-baseline`; métrica depende del uso | Qué revisarías antes de aumentar complejidad |
| 19 | `s01-evidence-opening` | Evidencia / apertura | Existe como foco y parte de apertura | Comparar línea base, datos no vistos, uso e interpretación | Panel de foco y gráfica de evidencia | F01/F03: caso con evaluación real o marcado `not_reported` | `generalization-inductive-bias`, `ml-project-baseline`; métrica alta no prueba física | Qué conclusión seguiría injustificada |
| 20 | `s01-evidence-capacity` | Evidencia / capacidad y generalización | Existe con tres capacidades | Distinguir subajuste, ajuste útil y sobreajuste | Gráfica con series de ajuste/no vistos | F01: valores solo si fuente/proceso los respalda | `generalization-inductive-bias`; ilustración conceptual no es medición | Qué patrón aparece en datos no usados |
| 21 | `s01-evidence-claim` | Evidencia / afirmación defendible | Existe como parte de interacción y selección de tres afirmaciones | Acotar la conclusión a métrica, partición, dominio y uso | Challenge de afirmación y feedback | F01: paper/dataset o `not_reported` | `ml-project-baseline`; predicción no equivale a mecanismo o universalidad | Qué sí permite decir la evidencia y qué no |

## Actividades separadas

Las cinco actividades tienen explicación, respuesta y reparación inventariables. El estado de una
respuesta permanece dentro de `ActivitiesView`; cambiar de modalidad no marca respuestas como
correctas ni completa el recorrido narrativo.

| Orden | ID de unidad | Actividad actual | Estación relacionada | Concepto que diagnostica | Caso / estado |
| ---: | --- | --- | --- | --- | --- |
| 1 | `s01-activity-rules` | `rules`: reglas o aprendizaje | Familia | experiencia, desempeño y generalización | Diez mil curvas etiquetadas + curva nueva; ejemplo didáctico, fuente pendiente |
| 2 | `s01-activity-signal` | `signal`: qué guía el ajuste | Señal | objetivo por instancia y paradigma | Tránsito/binaria/artefacto en curva de luz; no atribuir dataset real |
| 3 | `s01-activity-levels` | `levels`: señal, tarea y familia | Tarea | niveles semánticos | Árbol de seis ramas; nombres de métodos son ejemplos de trabajo |
| 4 | `s01-activity-evidence` | `evidence`: qué puedes defender | Evidencia | comparación, no vistos y límites | Buen resultado sintético; no prueba mecanismo ni universalidad |
| 5 | `s01-activity-transfer` | `transfer`: cambia el instrumento | Dominio | cambio de dominio y métrica | Baja resolución y faltantes; escenario conceptual, no resultado medido |

## Cobertura editorial y dependencias

| Elemento | Existe | Requiere investigación o revisión |
| --- | --- | --- |
| Siete hashes y navegación de estación | Sí, en `s01-journey.ts` y `s01-slides.ts` | E07 debe ensamblar las partes nuevas sin duplicar estado |
| Bibliografía 0 | Sí, dos libros y función didáctica en el piloto | Confirmar edición/capítulo/páginas antes de una ficha pública |
| Pregunta e Instancia en tres partes | Sí, probado en B02 | Mantener IDs de partes y lectura lineal |
| Señal, Tarea, Familia, Dominio y Evidencia en tres partes | Sí, cada una con tres partes en su escena extraída | E07 debe cerrar la integración y F01/F04 la cobertura editorial |
| Cinco actividades | Sí | C04/F04 revisan precauciones, ejemplos y fuente de cada explicación |
| Ejemplos con fuentes | Solo el registro interno C01; un flujo Kepler/TCE documentado por D02 | F01 completa unidad por unidad; `publish_ready` permanece falso |
| Assets | Existe un raster conceptual para Actividades | F02/F03 deben decidir SVG/HTML, ilustración o gráfico reproducible; no inventar medidas |
| Conceptos atómicos | Semillas en `inbox/concepts/S01-CONCEPTS.md` | C02/F01 atomizan y calculan backlinks; el vault no se edita desde este inventario |

## Bibliografía inicial auditada

La fuente del paquete declara Géron, 3.ª edición, capítulos 1–2 y otros capítulos de apoyo, y
Kelleher, Mac Namee y D’Arcy (MIT Press, 2015), capítulos 1–2 y 8. En esta revisión se conserva
la función didáctica declarada en el paquete y el mapa de fuentes; páginas y ubicaciones atómicas
quedan pendientes cuando no aparecen comprobadas en la fuente. El documento D02 aporta una fuente
primaria/documental distinta —Thompson, *Data Validation Time Series File: Description of File
Format and Content*, NASA Ames, 2016, PDF pp. 5–6, §1— para el flujo Kepler/TCE. Esa fuente no
respalda por sí sola una afirmación de ML, confirmación planetaria ni métrica.

## Lotes de trabajo derivados

1. E02: unidades 7–9, conservando `SignalScene` y su predicción antes del feedback.
2. E03: unidades 10–12, conservando `TaskAlgorithmTree`, definiciones y teclado.
3. E04: unidades 13–15, separando comparación, sesgo inductivo y activity `rules`.
4. E05: unidades 16–18, separando síntesis/observación de la transferencia.
5. E06: unidades 19–21, separando capacidad, no vistos y alcance de afirmación.
6. E07: integrar las 21 unidades y las 5 actividades con una sola secuencia; C04 aporta
   bibliografía, precauciones y preguntas docentes comunes.
7. F01/F03: trabajar únicamente con los IDs anteriores; una fuente o asset pendiente bloquea la
   promoción y se conserva como tal.

## Auditoría de dominio

Los casos de este inventario se formulan alrededor de exoplanetas: espectros, catálogos,
candidatos y seguimiento. No se incorporan galaxias. La mención de estrellas queda fuera del
registro hasta que una tarea de investigación justifique por qué un caso exoplanetario no resuelve
la unidad; la implementación actual no presenta esa alternativa como contenido validado.

## Cierre E01

El inventario tiene 22 unidades de navegación (incluida bibliografía 0) y 5 unidades de actividad,
con IDs únicos dentro de S01. Las siete estaciones tienen ahora implementación en tres partes y
el ensamblado compartido conserva una sola secuencia de estado. E07 mantiene el cierre formal de
integración y ninguna unidad editorial pendiente se marca como cubierta por la existencia de texto
genérico: cada una conserva una necesidad explícita de fuente, ejemplo, asset o revisión.
