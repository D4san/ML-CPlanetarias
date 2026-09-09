# Ficha de ejemplo del curso

Una ficha conecta una unidad con un caso astronómico concreto. El ID del ejemplo permanece
separado de la URL de la fuente y del ID de cualquier asset. Esta plantilla sirve para preparación
interna y no autoriza promoción a `docs/content/`.

## Identidad y alcance

- `id`: `<example-id-estable>`
- `sessionIds`: `[S01]`
- `unitIds`: `[<unit-id>]`
- `stationId`: `<station-id>`
- `routeIds`: `[spectrum, catalog, followup]` o `[]`
- `status`: `parcial` | `pendiente` | `verificado`
- `visibility`: `internal`
- `publish_ready`: `false`

## Cadena didáctica

- `question`: `<pregunta que el caso permite formular>`
- `domain`: `<exoplaneta/caso concreto>`
- `representation`: `<observación, variables, transformación y unidades>`
- `paradigm_task`: `<señal disponible y tarea; separar ambos niveles>`
- `model`: `<familia/modelo solo si la fuente lo respalda; si no, not_applicable>`
- `baseline`: `<línea base medida, propuesta o not_reported>`
- `output`: `<salida que produce el sistema>`
- `evaluation`: `<métrica/diseño de evaluación o not_reported>`
- `interpretation`: `<qué relación ayuda a entender>`
- `limits`: `<qué no permite concluir>`

## Fuentes, assets y afirmaciones

- `sourceIds`: `[<source-id>]`
- `assetIds`: `[<asset-id>]`
- `claim_status`: `<por afirmación: verificado, parcial o pendiente>`
- `source_location`: `<página, sección, tabla, figura o párrafo realmente leído>`
- `rights_status`: `original` | `open-license` | `permission` | `hold`
- `next_action`: `<leer, contrastar, producir figura original, revisar derechos o promover>`

Cada afirmación separa hecho de fuente, paráfrasis del curso, decisión pedagógica y resultado
medido. Una fuente enlazada no concede derecho de copiar una figura. Un estado pendiente bloquea
la promoción y queda visible en el registro interno.
