# Ensayo completado: fragmento S01, Pregunta → Instancia

Esta referencia es la salida del ensayo de la skill. Vive dentro de la carpeta de instrucciones y fuera de `docs/content/`; conserva el estado interno del paquete y no se presenta como contenido publicable.

## Entrada leída

| Artefacto | Fragmento usado | Función |
| --- | --- | --- |
| `inbox/sessions/S01-ML-IA-metodos-estadisticos/SESSION_PACKET.md` | `Apertura que debe conservarse`, `0. Apertura: qué intentamos responder cuando tenemos datos` y `2. El ciclo mínimo de ML` | pregunta, cinco salidas, `datos → insight → decisión`, `x`, `y`, instancia y `ŷ` |
| `inbox/sessions/S01-ML-IA-metodos-estadisticos/S01-SOURCE-MAP.md` | `Secuencia de lectura que sustenta la sesión`, tablas de Géron y Kelleher y `Regla de redacción` | trazabilidad, ubicación por capítulo y frontera de paráfrasis |
| `inbox/concepts/S01-CONCEPTS.md` | semillas 1–4 y cola de atomización | enlaces provisionales a problema, paradigma/tarea/familia y generalización |
| `src/lib/s01-slides.ts` | `s01Parts.question` y `s01Parts.instance` | comprobar que `apertura`, `flujo` y `notacion` son partes existentes; no se editó el código |

La procedencia primaria del paquete es:

```yaml
origin: obsidian
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion narrativo para impartir la sesión
status: drafting
visibility: internal
publish_ready: false
```

## Salida del flujo

### 1. Inventario del fragmento

| Orden | Tramo | ID editorial | Parte viva relacionada | Resultado | Estado |
| ---: | --- | --- | --- | --- | --- |
| 0 | bibliografía | `s01-bibliography` | diapositiva 0 | Géron y Kelleher accesibles por ID | preparado con ubicación de capítulo |
| 1 | Pregunta | `question` | `question/apertura` | delimitar qué queremos conocer o producir y para qué uso | preparado |
| 2 | Instancia | `instance` | `instance/flujo` | identificar unidad, representación, objetivo y salida | preparado |
| 3 | Instancia | `instance` | `instance/notacion` | escribir `xᵢ`, `yᵢ`, `D` y `ŷ = hθ(x)` sin confundir predicción con causalidad | preparado |

El ensayo cubre una muestra acotada. `question/salidas`, `question/disciplinas` y `instance/apertura` se observaron en el adaptador, pero quedan fuera de esta salida y aparecen como trabajo pendiente; no se afirma que el fragmento cubra la sesión completa.

### 2. Bibliografía con ubicación honesta

| `id` | Referencia | Ubicación recibida | Uso en el fragmento | Cierre pendiente |
| --- | --- | --- | --- | --- |
| `geron-ml` | Aurélien Géron, *Hands-on Machine Learning with Scikit-Learn, Keras, and TensorFlow*, 3.ª ed. | caps. 1–2; ubicación exacta pendiente | tarea, experiencia, desempeño, objetivo, particiones y evaluación | verificar página/sección para cada afirmación antes de promoción |
| `kelleher-fml` | John D. Kelleher, Brian Mac Namee y Aoife D’Arcy, *Fundamentals of Machine Learning for Predictive Data Analytics*, MIT Press, 2015 | caps. 1–2; ubicación exacta pendiente | `datos → insight → decisiones`, sujeto de predicción, variables descriptivas, objetivo y uso | verificar página/sección para cada afirmación antes de promoción |

El paquete fuente también declara capítulos posteriores para otras partes de S01, pero este fragmento no los atribuye. No se añadió URL, DOI ni página que no estuvieran suministrados.

### 3. Secuencia y unidades

```yaml
courseId: mlcp
sessionId: S01
bibliographyId: s01-bibliography
stationIds:
  - question
  - instance
units:
  - s01-question-opening
  - s01-instance-flow
  - s01-instance-notation
```

Los IDs de unidad incluyen el namespace de la sesión y la estación. Los IDs de la UI anterior se usan como correspondencia, no como identidad editorial.

#### `s01-question-opening`

- `function`: opening
- `title`: Qué intentamos responder cuando tenemos datos
- `question`: ¿Qué valor desconocido, estructura, relación, acción o instancia queremos obtener?
- `visual_object`: cinco tarjetas de salida conectadas con la trayectoria `datos → insight → decisión`
- `idea`: la pregunta científica y el uso de la salida preceden a la elección de un algoritmo.
- `content`: el tutor presenta predicción, estructura, estimación, decisión y generación con microproblemas astronómicos cerrados; registra primero las respuestas en lenguaje común.
- `interpretation`: elegir la salida hace visible qué problema se está formulando y qué evidencia sería pertinente.
- `exampleIds`: [`s01-spectrum-abundance`]
- `conceptIds`: [`problema-cientifico`, `paradigma-tarea-familia`]
- `limits`: es una discusión teórica; el microproblema no contiene datos, métrica ni resultado científico.
- `sourceIds`: [`kelleher-fml`, `geron-ml`]
- `existingPart`: `question/apertura`

#### `s01-instance-flow`

- `function`: explain
- `title`: De la instancia a la salida
- `question`: ¿Qué cuenta como un caso individual y qué información conserva su representación?
- `visual_object`: esquema textual `instancia → representación x → objetivo y → modelo hθ → salida ŷ`
- `idea`: la unidad de análisis y la representación definen qué recibe el método y qué puede producir.
- `content`: una instancia puede ser una fuente, visita, espectro, imagen, curva de luz o segmento; `x` representa la observación y `y` es un objetivo disponible cuando la señal es supervisada.
- `interpretation`: `ŷ` es una salida estimada para una instancia nueva; su significado depende de la tarea, la evidencia y el uso.
- `exampleIds`: [`s01-spectrum-abundance`]
- `conceptIds`: [`representacion-instancia-objetivo`, `generalizacion-sesgo-inductivo`]
- `limits`: la representación y el objetivo pueden contener sesgos e incertidumbre; todavía no se evalúa desempeño ni transferencia entre dominios.
- `sourceIds`: [`kelleher-fml`, `geron-ml`]
- `existingPart`: `instance/flujo`

#### `s01-instance-notation`

- `function`: explain
- `title`: Ajustar y usar
- `question`: ¿Qué información permite ajustar el comportamiento y qué se produce para una instancia nueva?
- `visual_object`: tabla mínima con `xᵢ`, `yᵢ`, `D = {(xᵢ, yᵢ)}` y `ŷ = hθ(x)`
- `idea`: aprender relaciona una representación y una señal con una salida bajo una tarea y una medida de desempeño.
- `content`: la experiencia mejora el desempeño en una tarea medible; asignar un valor desconocido no implica hablar del futuro.
- `interpretation`: una predicción puede apoyar la pregunta definida, pero no demuestra por sí sola causalidad ni aprendizaje de la física.
- `exampleIds`: [`s01-spectrum-abundance`]
- `conceptIds`: [`representacion-instancia-objetivo`, `generalizacion-sesgo-inductivo`]
- `limits`: faltan línea base, partición, métrica y evaluación pertinente para juzgar una salida.
- `sourceIds`: [`geron-ml`, `kelleher-fml`]
- `cautionIds`: [`metric-no-physics`]
- `existingPart`: `instance/notacion`

### 4. Ejemplo enlazado

```yaml
id: s01-spectrum-abundance
question: ¿Qué abundancia queremos estimar a partir de un espectro y para qué uso?
domain: atmósfera de un exoplaneta, como microproblema teórico
representation: espectro representado por sus valores de flujo; x describe la instancia elegida
task: estimar un valor continuo, si el objetivo de abundancia está definido en una escala continua
interpretation: producir una estimación para un espectro nuevo y discutir qué uso tendría
limits: el caso no trae datos ni etiquetas, línea base, métrica, incertidumbre o prueba de cambio de dominio; una salida plausible no constituye evidencia física
sourceIds:
  - geron-ml
  - kelleher-fml
```

La frase condicional sobre la tarea conserva una ambigüedad real: el fragmento dice “abundancia”, pero no fija la codificación del objetivo ni la métrica. La preparación puede plantear el caso; una práctica posterior debe especificar esos elementos.

### 5. Conceptos y enlaces

Estos IDs se proponen para enlazar el fragmento con las semillas de `S01-CONCEPTS.md`; permanecen en estado de atomización pendiente y no se presentan como notas atómicas ya aprobadas.

| `id` | Término | Paráfrasis del fragmento | Fuente/semilla |
| --- | --- | --- | --- |
| `problema-cientifico` | Problema científico como punto de partida de ML | formular qué se quiere conocer, qué observables existen, qué salida sirve y qué queda fuera del modelo | semilla 1; Kelleher caps. 1–2; Géron cap. 2 |
| `paradigma-tarea-familia` | Paradigma, tarea y familia de modelo | señal de aprendizaje, salida y mecanismo son niveles distintos | semilla 2; Géron cap. 1; Kelleher cap. 1 |
| `representacion-instancia-objetivo` | Sujeto de predicción y representación | una instancia reconocible recibe una representación y puede tener un objetivo disponible | semilla 7; Kelleher cap. 2; Géron caps. 1–2 |
| `generalizacion-sesgo-inductivo` | Generalización y sesgo inductivo | el comportamiento en instancias nuevas depende de restricciones, representación y evaluación | semilla 3; Kelleher cap. 1; Géron cap. 1 |

### 6. Pregunta docente y precaución

```yaml
teacherQuestion:
  id: s01-question-opening
  intent: opening
  question: ¿Qué salida sería útil y cómo reconoceríamos que responde la pregunta?
  guidance: pedir unidad, entrada, salida, señal y uso antes de nombrar algoritmos
  unitId: s01-question-opening

caution:
  id: metric-no-physics
  distinction: desempeño predictivo y explicación física responden preguntas distintas
  confusion: interpretar una buena predicción como prueba de que se aprendió la física
  consequence: atribuir causalidad o evidencia física a un microproblema sin datos y evaluación pertinentes
  sourceIds:
    - geron-ml
    - kelleher-fml
```

La precaución queda en el contenido principal. Su visibilidad no depende de `teacherMode`.

## Lagunas y ambigüedades encontradas

| Tipo | Observación | Acción de cierre |
| --- | --- | --- |
| Bibliografía | El paquete entrega capítulos, pero no páginas/secciones por afirmación. | Consultar la edición usada y añadir ubicación pertinente a cada referencia antes de atribuir una frase con mayor precisión. |
| Definiciones | La fuente map dice que las formulaciones amplias de IA y estadística requieren bibliografía específica; este fragmento no las atribuye a un autor. | Abrir tarea de investigación con una fuente específica; mantener la formulación como síntesis didáctica pendiente. |
| Correspondencia | La parte `apertura` se repite en `question` e `instance`; el fragmento exige namespace editorial. | Conservar `question/*` e `instance/*` como contexto de la parte y usar IDs `s01-*` para las unidades. |
| Granularidad | Los encabezados narrativos no indican por sí solos cómo repartir `question/salidas`, `question/disciplinas` e `instance/apertura`. | Confirmar el mapa de contenido con el integrador antes de declarar completa la estación. |
| Ejemplo | “Abundancia” no fija escala, etiquetas ni métrica. | Mantener la tarea condicional y definir objetivo, línea base y métrica en una práctica posterior. |
| Visual | El fragmento describe esquemas, pero no entrega aquí el registro de asset con archivo, alt, pie, procedencia y derechos. | Crear el registro de asset solo cuando exista una ruta y una procedencia revisables. |

## Revisión del ensayo

| Comprobación | Resultado |
| --- | --- |
| Paquete → inventario → bibliografía → secuencia | Completo para el fragmento declarado |
| IDs de sesión/estación/unidad | Conserva S01 y los hashes de Pregunta/Instancia; unidades namespaceadas |
| Ejemplo y conceptos | Enlazados por ID, con estado de atomización explícito |
| Pregunta y precaución | Incluidas; la precaución esencial queda fuera del modo docente |
| Fuentes y lagunas | Capítulos conservados; páginas, definiciones amplias, asset y partes no incluidas quedan pendientes |
| Frontera editorial | `drafting`, `internal`, `publish_ready: false`; el ensayo queda fuera del build |

El resultado es un borrador de preparación útil para revisión. No demuestra que el contenido científico esté validado ni que pueda publicarse.
