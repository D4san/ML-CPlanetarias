# Ficha de investigación de ejemplo

Usa esta ficha para una unidad concreta. Conserva los nombres de referencia de ADR-0002
(`id`, `unitIds`, `sourceIds`, `assetIds`). Los campos de investigación pueden vivir en una
preparación interna hasta que C01/F01 los integren.

## Registro mínimo

```yaml
kind: example-research-record
id: example-id-stable
status: pendiente
sessionIds:
  - S01
unitIds:
  - unit-id-stable
sourceIds: []
assetIds: []
visibility: internal
publish_ready: false
```

## Entrada acotada

- `session_id`: [ID]
- `unit_id`: [ID exacto]
- `station_id` o `route_id`: [si aplica]
- `idea`: [idea y relación que el caso debe ilustrar]
- `domain_requested`: `exoplanet` primero
- `scientific_gap`: [laguna concreta]
- `required_source_type`: `original-paper` / `mission-dataset-documentation` /
  `institutional-source`
- `acceptance_test`: [qué podrá reconocer, comparar o explicar el estudiante]

## Decisión de dominio

- `selected_domain`: [exoplanet / star]
- `object_of_analysis`: [planeta, sistema, estrella, observación, curva, espectro, etc.]
- `exoplanet_search`: [qué búsqueda/casos se revisaron]
- `star_fallback_justification`: [obligatorio si se selecciona una estrella; qué criterio no
  satisfizo el caso exoplanetario]
- `galaxy_check`: [confirmar que no aparece en objeto, asset, actividad ni ruta]

## Ficha del ejemplo para C01/F01

- `question`: [pregunta científica o didáctica]
- `domain`: [caso concreto, no solo “astronomía”]
- `representation`: [datos y transformaciones; unidades si aplica]
- `paradigm_task`: [señal disponible y tarea]
- `model`: [familia/modelo solo si está respaldado; si no aplica, escribir `not_applicable`]
- `baseline`: [línea base solo si la fuente la describe o si se etiqueta como propuesta]
- `evaluation`: [métrica/diseño de evaluación solo con evidencia; de lo contrario, `not_reported`]
- `interpretation`: [qué relación ayuda a entender]
- `limits`: [qué no permite concluir; incluye sesgos, candidatos, dominio o validez]

## Fuentes y afirmaciones

Para cada fuente crea un `source_id`, registra metadatos y usa la plantilla de
[`claim-audit.md`](claim-audit.md) para cada afirmación que vaya a redactarse.

| source_id | tipo | título/autores o institución | año | URL/DOI | ubicación leída | consultado | estado |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [id] | [tipo] | [metadatos] | [año] | [enlace] | [p./sección/figura/tabla/párrafo] | [AAAA-MM-DD] | verificado/parcial/pendiente |

### Separación de capas

| Capa | Redacción | Soporte o límite |
| --- | --- | --- |
| Hecho de fuente | [paráfrasis acotada] | [source_id + ubicación] |
| Paráfrasis del curso | [explicación propia] | [qué conserva y qué simplifica] |
| Decisión pedagógica | [por qué este caso sirve] | [criterio observable; no evidencia científica] |
| Resultado medido | [solo si existe] | [ubicación exacta; omitir si no fue leído] |

## Derechos y assets

| Elemento | Registro separado |
| --- | --- |
| Metadatos bibliográficos | [título, autores/institución, año, URL/DOI, edición si aplica] |
| Derecho de enlazar | [URL pública registrada; términos revisados o pendiente; no equivale a copiar] |
| Derecho de reutilizar figura | [original / open-license / permission / pendiente + nota] |
| Figura original del curso | [provenance: datos, código, transformación, unidades, semilla, creador; o `none`] |
| Asset | [asset_id, tipo conceptual/simulado/observado, alt, pie, propósito] |

Si el recurso visual es de terceros y el derecho de reutilización no está documentado, no lo
descargues ni lo adjuntes: enlázalo para revisión o solicita un gráfico original.

## Estado y siguiente acción

- `record_status`: `verificado` / `parcial` / `pendiente`
- `claim_status`: [por afirmación]
- `asset_status`: [por asset; `not_applicable` si no se solicita]
- `publish_ready`: `false` hasta revisión editorial y derechos
- `next_action`: [leer fuente, localizar sección, buscar alternativa, preparar figura original,
  o entregar a C01/F01]

## Ejemplo aceptable: caso Kepler/TCE

Este bloque muestra el nivel de precisión esperado; volver a consultar la fuente antes de
reutilizarlo.

```yaml
kind: example-research-record
id: s01-kepler-transit-signal
status: parcial
sessionIds: [S01]
unitIds: [s01-question-opening]
sourceIds: [kepler-dv-timeseries-2016]
assetIds: []
visibility: internal
publish_ready: false
selected_domain: exoplanet
question: "¿Cómo pasa una serie temporal de brillo a un evento candidato que todavía debe evaluarse?"
domain: "tránsitos de exoplanetas observados por Kepler"
representation: "serie temporal de flujo PDC y banderas de calidad; la documentación describe su normalización y preparación"
paradigm_task: "detección de señales periódicas tipo tránsito y producción de un TCE; no se afirma que sea ML"
model: not_applicable
baseline: not_reported
evaluation: "la documentación menciona veto y evaluación posterior, sin una métrica de desempeño para este uso didáctico"
interpretation: "ilustra observación → representación temporal → evento que requiere validación"
limits: "un TCE es una señal tipo tránsito; no demuestra por sí solo un planeta confirmado, un mecanismo físico ni desempeño de ML"
```

Fuente: S. E. Thompson, *Data Validation Time Series File: Description of File Format and
Content*, KSCI-19079-001, NASA Ames Research Center, 2016-03-23,
[PDF](https://archive.stsci.edu/files/live/sites/mast/files/home/missions-and-data/kepler/_documents/DVTimeSeries-Description.pdf),
`source_id: kepler-dv-timeseries-2016`, PDF pp. 5–6, §1 *Introduction*. Allí se describen la
entrada de flujo y banderas, la preparación de la curva, la búsqueda de señales periódicas y
el paso de TCE a Data Validation. La fecha de consulta debe completarse en la ficha.

La afirmación de flujo de datos puede quedar `verificado` si se leyó esa sección. El registro
completo queda `parcial` mientras no tenga un asset o una decisión explícita de que no lo
necesita, y el derecho a reutilizar una figura externa no debe inferirse. El ejemplo puede usar
un diagrama original del curso; su procedencia se registra aparte.

## Contraejemplo: cita insuficiente

```text
“El pipeline de Kepler usa aprendizaje supervisado con random forest y obtiene 98 % de exactitud
(Géron, cap. 1)”.
```

La cita solo puede situar ML de forma general; no respalda el pipeline de Kepler, el algoritmo,
la cifra ni su evaluación. Falta un paper o documentación del método, una ubicación precisa y
la definición de la muestra/prueba. La reparación es separar las afirmaciones, buscar la fuente
primaria real y dejarlas `pendiente` hasta leerla. Mientras tanto, el ejemplo aceptable conserva
solo la cadena de datos que Thompson documenta.
