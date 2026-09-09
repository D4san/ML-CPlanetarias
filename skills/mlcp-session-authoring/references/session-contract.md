# Contrato operativo para autoría de sesiones

Este resumen sirve para preparar contenido. La decisión normativa es [ADR-0002](../../../docs/architecture/decisions/ADR-0002-course-content-contract.md); si hay una discrepancia, se registra y se remite al integrador. Los nombres de API o de componentes no se inventan desde esta guía.

## Jerarquía

```text
curso mlcp
└── sesión S01
    ├── bibliografía: diapositiva 0
    └── estaciones en orden
        └── unidades explicativas en orden
            ├── ejemplos por ID
            ├── conceptos por ID
            ├── precauciones por ID
            └── preguntas docentes por ID
```

El curso determina identidad, defaults y orden de sesiones. La sesión contiene título, resumen, objetivos, `bibliographyId`, `stationIds`, `units`, procedencia y estado editorial. Una estación contiene `id`, título, propósito y `unitIds`. Una unidad contiene como mínimo `id`, `function`, `title`, `idea`, `content`, `exampleIds` y `conceptIds`; puede añadir `visualId`, `cautionIds`, `teacherQuestionIds` y `sourceIds`.

Para que la unidad sea utilizable por un tutor, conserva además estas preguntas editoriales aunque el registro las agrupe dentro de `content`:

| Elemento | Debe dejar claro |
| --- | --- |
| Pregunta | qué quiere averiguar o hacer el estudiante |
| Objeto visual | qué diagrama, imagen, tabla o esquema se observará |
| Idea central | qué relación debe quedar |
| Interpretación | qué significa la salida en este caso |
| Ejemplo | qué instancia concreta hace visible la idea |
| Conceptos | qué entradas del glosario se reutilizan |
| Límites | qué no puede concluirse con este material |

## IDs y referencias

- Curso: `mlcp`.
- Sesión: `S00`, `S01`; no usar el número de una posición como identidad.
- S01 conserva las estaciones `question/pregunta`, `instance/instancia`, `signal/senal`, `task/tarea`, `family/familia`, `domain/dominio` y `evidence/evidencia`. Sus hashes existentes no se renombran ni se deduplican.
- La bibliografía tiene un ID propio y ocupa el inicio de la navegación; no renumera las estaciones.
- Las unidades nuevas usan un namespace legible, por ejemplo `s01-question-opening` o `s01-instance-cycle`. Los IDs de una UI anterior, como `apertura`, sirven para mapear una fuente viva y no sustituyen el ID editorial.
- Un ejemplo tiene `id`, `question`, `domain`, `representation`, `task`, `interpretation`, `limits` y `sourceIds`; puede añadir `assetIds`, `unitIds` y `sessionIds`.
- Un concepto tiene `id`, `term`, `definition` y `sources`; sus backlinks se derivan de `conceptIds` y no se copian manualmente en varias notas.
- Una precaución tiene `id`, `distinction`, `confusion` y `consequence`. Una pregunta docente tiene `id`, `intent`, `question`, `guidance` y una referencia a unidad o concepto.
- Una referencia tiene ID, título, autores o institución, URL/DOI cuando exista y ubicación relevante. Una URL sola no justifica una afirmación.

Los arrays de sesiones, estaciones y unidades declaran el orden. Un ID repetido, desconocido o redefinido se reporta como error accionable. Una sesión sin rutas sigue siendo válida; no se crea una ruta ficticia.

## Procedencia, fuentes y lagunas

Registra una variante real por paquete:

```yaml
# Origen Obsidian/DASAN
origin: obsidian
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion narrativo para impartir la sesión

# Origen escrito en este repositorio
origin: repo
source_path: docs/guides/una-ruta-real.md
source_heading: Un encabezado existente
```

`source_note` siempre es relativo al vault y `source_path` siempre es relativo al repositorio. Comprueba que la ruta y el encabezado existan en la revisión usada. Una síntesis puede tener varias entradas de procedencia, pero cada entrada mantiene su origen y ruta.

Usa un registro de lagunas con cuatro campos:

| Campo | Contenido |
| --- | --- |
| Afirmación retenida | qué frase o decisión no se puede cerrar todavía |
| Evidencia disponible | fuente, tramo y ubicación que sí se consultaron |
| Falta | página/sección, fuente específica, dato, derecho o decisión |
| Tarea y condición de cierre | búsqueda o consulta concreta y qué habilitaría |

Una laguna conserva la paráfrasis provisional si es útil para la preparación, pero queda marcada como tal. No se fabrica una cita para llenar la tabla. Las definiciones amplias de IA o estadística necesitan una fuente específica antes de atribuirlas a un autor; una fuente de ML puede situarlas sin sostener por sí sola toda la definición.

## Frontera editorial

`inbox/` es material de trabajo. Un paquete `drafting`, `internal` o `publish_ready: false` puede orientar un fixture o una revisión, pero no debe entrar al build ni presentarse como aprobado. Antes de promover un tramo a `docs/content/` deben coincidir procedencia portable, derechos, revisión de contenido, representación pública autorizada y `publish_ready: true`. La skill registra estas condiciones; no cambia sus estados.
