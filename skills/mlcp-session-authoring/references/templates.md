# Plantillas y checklist de preparación

Estas plantillas son esqueletos de trabajo. Ajusta los campos al registro aprobado y conserva los nombres de ADR-0002; no los copies sobre un archivo funcional sin un consumidor y una prueba.

## Plantilla de sesión

```yaml
---
id: SXX
kind: session-packet
status: intake
origin: obsidian # usar repo cuando el origen sea una síntesis del repositorio
source_vault: DASAN
source_note: ruta relativa verdadera al vault
source_heading: Encabezado fuente
# source_path: ruta relativa verdadera al repositorio; usarlo con origin: repo
title: Título de la sesión
summary: Resumen de una frase
objectives:
  - Resultado observable 1
  - Resultado observable 2
bibliographyId: sxx-bibliography
stationIds:
  - question
units: []
provenance:
  sourceIds: []
editorial:
  visibility: internal
  publish_ready: false
  rights: pending
---

# SXX — Título

## Pregunta y alcance

- Audiencia:
- Duración:
- Pregunta de aprendizaje:
- Dentro:
- Fuera:

## Mensaje núcleo

## Secuencia resumida

| Orden | Estación | Unidad | Fuente | Resultado |
| ---: | --- | --- | --- | --- |
| 0 | bibliografía | sxx-bibliography | referencias | acceso y contexto |
| 1 | question | sxx-question-opening | fuente | transición inicial |

## Lagunas abiertas

| Afirmación | Evidencia disponible | Falta | Tarea y condición de cierre |
| --- | --- | --- | --- |
| | | | |
```

Si el origen es `repo`, elimina los campos de Obsidian de la instancia y usa `source_path`. Si aún no existe autorización de publicación, conserva `visibility: internal` y `publish_ready: false`.

## Plantilla de unidad

```markdown
### Unidad: sxx-station-purpose

- `function`: función editorial del contrato
- `title`: título visible
- `question`: pregunta que activa la unidad
- `visual_object`: diagrama, tabla, imagen, objeto o esquema que se observará
- `idea`: relación central en una frase
- `content`: explicación/paráfrasis con la distinción de fuente y curso
- `interpretation`: qué permite interpretar la salida en este caso
- `exampleIds`: [sxx-example]
- `conceptIds`: [concepto-existente]
- `limits`: qué permanece fuera de la evidencia
- `sourceIds`: [referencia-con-ubicacion]
- `cautionIds`: [precaucion-si-aplica]
- `teacherQuestionIds`: [pregunta-docente-si-aplica]
- `status`: drafted | reviewed-pending | ...
```

Una unidad completa tiene un ejemplo pertinente. Si el ejemplo o el objeto visual aún no existe, registra un ID/entregable pendiente y explica qué impide cerrarlo; no lo sustituyas con un ejemplo genérico ni con una figura sin procedencia.

## Plantilla de ejemplo

```yaml
id: sxx-example-short-name
question: Pregunta astronómica o de uso
domain: dominio del caso
representation: qué recibe el método y qué unidad representa
task: salida solicitada
interpretation: cómo se leería la salida
limits: qué no demuestra y qué evaluación falta
sourceIds:
  - referencia-pertinente
assetIds: []
```

Añade una nota explícita `conceptual`, `simulated` u `observed` cuando el estatus de evidencia pueda confundirse. La adaptación del ejemplo puede cambiar el dominio para enseñar una idea, pero conserva separadas la evidencia de la fuente y la decisión didáctica.

## Plantilla de concepto, pregunta y precaución

```yaml
concept:
  id: concepto-legible
  term: término
  definition: definición breve en paráfrasis propia
  sources:
    - referencia-pertinente
  status: seed | atomization-pending | reviewed

teacherQuestion:
  id: sxx-unit-diagnostic
  intent: opening | diagnostic | transfer
  question: pregunta para el tutor o grupo
  guidance: qué observar o cómo orientar sin responder por adelantado
  unitId: sxx-station-purpose

caution:
  id: metric-no-physics
  distinction: diferencia que debe conservarse
  confusion: lectura equivocada esperable
  consequence: qué error de interpretación produciría
  sourceIds:
    - referencia-pertinente
```

## Checklist de cobertura

Marca cada casilla con una ruta, ID, fuente o nota de laguna. Una declaración general del autor no cuenta como evidencia suficiente.

### Paquete y editorial

- [ ] `id`, `kind`, `status`, origen y alcance están definidos.
- [ ] `source_note/source_heading` o `source_path/source_heading` son verdaderos, relativos y verificables.
- [ ] `visibility`, `publish_ready` y derechos reflejan el estado real.
- [ ] Se distingue preparación, fixture, revisión editorial y autorización de publicación.

### Inventario y jerarquía

- [ ] El inventario cubre cada tramo usado y registra lo excluido.
- [ ] Curso, sesión, bibliografía 0, estaciones y unidades tienen IDs estables.
- [ ] El orden vive en arrays explícitos; ningún índice funciona como URL permanente.
- [ ] Cada `unitId`, `exampleId`, `conceptId`, `cautionId`, `teacherQuestionId` y `sourceId` resuelve o queda marcado como pendiente.

### Bibliografía y afirmaciones

- [ ] Cada referencia usada tiene ubicación pertinente o una laguna explícita.
- [ ] La definición de la fuente, la paráfrasis del curso y la adaptación pedagógica están separadas.
- [ ] Las afirmaciones con números, resultados o causalidad no exceden la evidencia consultada.
- [ ] No se inventaron páginas, DOI, URLs, resultados, datos ni derechos.

### Unidades, ejemplos y conceptos

- [ ] Cada unidad declara pregunta, objeto visual, idea, interpretación, ejemplo, conceptos y límites.
- [ ] Cada ejemplo declara pregunta, dominio, representación, tarea, interpretación, límites y referencias.
- [ ] El tipo conceptual/simulado/observado y la procedencia del asset están claros.
- [ ] Deep learning aparece como familia de modelos cuando el contenido lo requiere, no como paradigma adicional.
- [ ] Los conceptos se enlazan por ID y sus relaciones inversas no se duplican manualmente.

### Preguntas, precauciones y revisión

- [ ] Hay preguntas de apertura/diagnóstico/transferencia donde aportan una decisión pedagógica.
- [ ] Las precauciones esenciales quedan visibles para todo lector.
- [ ] Se revisaron cobertura, IDs, fuentes, derechos, límites y frontera editorial.
- [ ] Cada laguna tiene una tarea de investigación y condición de cierre.
- [ ] El informe indica qué gate se ejecutó, qué quedó pendiente y quién debe resolverlo.
