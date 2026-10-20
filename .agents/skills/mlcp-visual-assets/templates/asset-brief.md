# Ficha de encargo visual

Completa esta ficha antes de producir o editar. Conserva un caso por ficha; si hay dos necesidades
distintas, separa los assets.

## Identidad y función

- `id`: `<id-estable>`
- `session_station_unit`: `<sesión / estación / unidad>`
- `case`: `<caso astronómico o caso didáctico concreto>`
- `purpose`: `<qué idea o decisión hace visible>`
- `learner_action`: `<qué debe poder señalar, comparar o preguntar el estudiante>`
- `focal_object`: `<objeto principal>`
- `visible_relation`: `<relación, secuencia, contraste o cambio que debe verse>`
- `claim_limit`: `<qué no permite concluir>`

## Ruta y contenido

- `medium`: `gpt-illustration` | `exact-svg-html` | `reproducible-data-graphic`
- `reason_for_medium`: `<por qué este medio conserva la necesidad pedagógica y la exactitud>`
- `type`: `conceptual` | `simulated` | `observed`
- `exact_payload`: `<etiquetas, números, ecuaciones, ejes, unidades y leyendas que deben coincidir>`
- `deliberate_omissions`: `<texto, objetos o afirmaciones que no deben aparecer>`

## Tokens, paleta y composición

| Rol semántico | Token vigente | Señal no cromática | Uso en esta figura |
| --- | --- | --- | --- |
| datos / representación | `--data` | `<forma, posición, patrón o etiqueta>` | `<uso>` |
| modelo / mecanismo | `--model` | `<forma, posición, patrón o etiqueta>` | `<uso>` |
| decisión / baseline / métrica | `--decision` | `<forma, posición, patrón o etiqueta>` | `<uso>` |
| límite / advertencia | `--limit` | `<forma, posición, patrón o etiqueta>` | `<uso>` |
| transferencia / pregunta | `--transfer` o `--question` | `<forma, posición, patrón o etiqueta>` | `<uso>` |

- `composition`: `<relación espacial y orden de lectura>`
- `aspect_and_dimensions`: `<proporción, ancho/alto intrínsecos y destino>`
- `label_spaces`: `<márgenes o huecos reservados para texto exacto>`
- `inspection_contexts`: `1920x1080; 1440x900; 390x844; <anchura intermedia>`
- `style_reference`: `<asset o sección inspeccionada; ruta relativa>`
- `style_family`: `<familia visual; usar MLCP editorial line-art v1 para dibujitos cualitativos salvo decisión documentada>`
- `generation_method`: `imagegen` | `exact-code` | `reproducible-code`
- `background_mode`: `transparent-alpha` | `opaque`
- `alpha_status`: `pending` | `passed` | `failed` | `not-applicable`
- `must_not`: `<escala engañosa, objetos inconsistentes, color único, decoración o recorte prohibido>`

## Fuente y entrega

- `source_or_dataset`: `<fuente, dataset o “síntesis didáctica propia”>`
- `transformation_or_process`: `<transformación, código, semilla, parámetros o proceso de generación>`
- `alt_draft`: `<texto alternativo que describe lo visible y la relación útil>`
- `caption_draft`: `<pie con contexto, tipo y límite de interpretación>`
- `provenance_variant`: `origin: repo + source_path` | `origin: obsidian + source_vault/source_note`
- `rights_candidate`: `original` | `open-license` | `permission` | `hold`
- `rights_note`: `<licencia, autorización o condición para promoción>`
- `output_file`: `<ruta relativa al repositorio o “propuesta pendiente”>`
- `weight_budget_or_measurement`: `<peso medido; umbral justificado o excepción>`
- `review_return_condition`: `<qué hallazgo obliga a devolver y qué debe repetirse>`
