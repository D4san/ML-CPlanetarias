# ADR-0002 — Contrato común de contenido, navegación y disponibilidad

- Estado: aceptada para implementación
- Fecha: 2026-09-07
- Alcance: modelo de curso, sesiones, estaciones, unidades, configuración y navegación
- Relación: extiende ADR-0001; convierte `docs/planning/agent-execution/CONTRACTS.md` en una decisión implementable

## Contexto y decisión

El piloto S01 ya tiene un adaptador propio en `src/lib/s01-journey.ts`, un carril común en
`src/components/react/SlideRail.tsx` y una configuración reducida en
`config/course.config.ts`. Las tareas siguientes necesitan una interfaz estable para añadir
S00, otras sesiones, ejemplos, conceptos, rutas y filtros de disponibilidad sin duplicar el
orden pedagógico en cada componente.

Se adopta un modelo común de contenido editorial con IDs estables, un orden explícito de
unidades y una configuración de curso separada de la presentación. El código existente se
mantiene mediante un adaptador de compatibilidad hasta que B01–B04 implementen el contrato.
Astro estático, Markdown/MDX autorizado y React como islas siguen siendo la decisión de
ADR-0001. `inbox/` nunca entra en el build.

## 1. Entidades y referencias

Los campos marcados como requeridos forman el mínimo del registro. Las propiedades de
procedencia y estado editorial son obligatorias en cada paquete que pueda promoverse a
contenido público; un fixture técnico puede declarar explícitamente que aún no es publicable.

| Entidad | ID y campos requeridos | Campos opcionales | Regla de referencia y ejemplo |
| --- | --- | --- | --- |
| Curso | `id`, `identity`, `enabledSessionIds`, `sessions` | `description`, `defaults` | `id: 'mlcp'`; la lista de sesiones define el orden y cada ID aparece una sola vez. |
| Sesión | `id`, `title`, `summary`, `objectives`, `bibliographyId`, `stationIds`, `units`, `provenance`, `editorial` | `routeIds`, `enabledRouteIds`, `defaultRouteId`, `conceptIds`, `teacherQuestionIds` | `id: 'S01'`, `stationIds: ['question', ...]`; S00 y S01 son IDs distintos. |
| Bibliografía | `id`, `title`, `items` | `summary` | `id: 's01-bibliography'`; una sesión la referencia y la navegación la coloca en la diapositiva 0. |
| Estación | `id`, `title`, `purpose`, `unitIds` | `shortLabel`, `hash`, `tone` | `id: 'question'`, `unitIds: ['s01-question-opening']`; el array declara el orden. |
| Unidad explicativa | `id`, `function`, `title`, `idea`, `content`, `exampleIds`, `conceptIds` | `visualId`, `cautionIds`, `teacherQuestionIds`, `activityId`, `sourceIds` | `id: 's01-question-opening'`; un ID puede aparecer en una ruta, pero no se redefine su significado. |
| Ejemplo | `id`, `question`, `domain`, `representation`, `task`, `interpretation`, `limits`, `sourceIds` | `sessionIds`, `unitIds`, `assetIds`, `routeIds` | `id: 's01-spectrum-transit'`; la evidencia científica y la adaptación didáctica se distinguen. |
| Concepto | `id`, `term`, `definition`, `sources` | `aliases`, `development`, `branch` | `id: 'generalizacion'`; las relaciones inversas se calculan desde referencias, no se duplican manualmente. |
| Precaución | `id`, `distinction`, `confusion`, `consequence` | `relatedConceptIds`, `relatedExampleIds`, `sourceIds` | `id: 'metric-no-physics'`; su contenido esencial no depende de `teacherMode`. |
| Pregunta docente | `id`, `intent`, `question`, `guidance`, `unitId` o `conceptId` | `sourceIds` | `intent` es `opening`, `diagnostic` o `transfer`; se muestra solo cuando corresponde. |
| Asset | `id`, `type`, `file`, `alt`, `caption`, `purpose`, `provenance`, `rights` | `width`, `height`, `transformation`, `units` | `type` es `conceptual`, `simulated` u `observed`; la herramienta que lo produjo no define su evidencia. |
| Referencia | `id`, `title`, `authors` o `institution`, `url` o `doi` | `year`, `location`, `edition`, `chapter` | `id: 'geron-ml'`; una URL sola no justifica una afirmación sin ubicación pertinente. |

Cada sesión y paquete conserva, cuando aplica, `source_vault`, `source_note`, `source_heading`,
`source_block`, `source_refs`, `visibility`, `publish_ready` y `rights` conforme a los
protocolos de ciclo, procedencia y derechos. Para contenido escrito en el repositorio, A03
debe fijar el origen portable y la ruta relativa real antes de promoverlo.

## 2. Configuración definitiva

La configuración común adoptada tiene esta forma TypeScript conceptual. B03 define los tipos
ejecutables y el adaptador; el ejemplo no autoriza aún a copiarlo sobre el archivo vivo.

```ts
type InteractionMode = 'interactive' | 'direct';
type DisplayMode = 'presentation' | 'reading' | 'activities';

type SessionConfig = {
  enabled: boolean;
  enabledRouteIds?: string[];
  defaultRouteId?: string;
};

type CourseConfigV2 = {
  identity: { id: string; title: string; institution?: string; description?: string };
  defaults: {
    interactionMode: InteractionMode;
    teacherMode: boolean;
    defaultView: DisplayMode;
  };
  enabledSessionIds: string[];
  sessions: Record<string, SessionConfig>;
};
```

### Migración del piloto

| Configuración actual | Contrato común | Regla de migración |
| --- | --- | --- |
| `interactionMode` | `defaults.interactionMode` | Copia literal; `interactive` conserva anticipación y revelado, `direct` muestra la explicación desde el inicio. |
| `teacherMode` | `defaults.teacherMode` | Copia literal; `false` es un valor explícito. |
| `defaultView` | `defaults.defaultView` | Copia literal; no cambia el estado de las actividades. |
| `s01.enabledRouteIds` | `sessions.S01.enabledRouteIds` | Conserva los IDs `spectrum`, `catalog` y `followup`; una selección vacía se valida según la tabla de casos. |
| `s01.defaultRouteId` | `sessions.S01.defaultRouteId` | Debe pertenecer a `enabledRouteIds`; no se elige una ruta sustituta en silencio. |
| Ausente | `enabledSessionIds` | El adaptador inicial produce `['S01']` mientras no exista S00 en el registro disponible. |
| Ausente | `sessions[id].enabled` | Se resuelve `true` para una sesión incluida y `false` para una sesión conocida excluida. |

La resolución usa esta precedencia: opción de sesión definida > default global definido >
valor por defecto documentado. Un `false` explícito nunca se confunde con ausencia. El
contrato no añade login, panel administrativo, persistencia del estudiante ni sincronización
entre dispositivos.

### Casos de validación y disponibilidad

| Caso | Decisión observable |
| --- | --- |
| `enabledSessionIds` vacío | Build válido con portada/índices en estado vacío útil; no genera sesiones ni enlaces a ellas. |
| ID de sesión desconocido | Error accionable con el ID y el campo que lo contiene. |
| ID repetido | Error; nunca deduplicación silenciosa. |
| Sesión sin rutas | Válida sin selector ni ruta ficticia; S00 puede usar este caso. |
| Sesión con rutas y `enabledRouteIds` omitido | Usa las rutas aprobadas del registro de esa sesión, según el adaptador. |
| Sesión con rutas y lista vacía | Error accionable, salvo que el registro declare explícitamente que la sesión no tiene rutas. |
| Ruta desconocida | Error con sesión, campo e ID. |
| `defaultRouteId` deshabilitada | Error; no seleccionar otra ruta automáticamente. |
| URL/hash de sesión excluida | 404 en el build nuevo, sin reactivación mediante query, hash o selección guardada. |
| Concepto sin sesiones visibles | Puede permanecer en el glosario si está aprobado; omite enlaces a sesiones excluidas. |
| URL antigua de estación | Resuelve la primera unidad de la estación si la sesión sigue disponible; un hash de subslide válido conserva esa unidad. |

La disponibilidad del fork se aplica a generación de páginas, alias, índices, navegación,
backlinks y recursos referenciados. El contenido excluido no reaparece por un enlace profundo.
La selección del tutor tampoco cambia `status`, `visibility`, `publish_ready` ni derechos.

## 3. Orden y navegación

- El orden de sesiones, estaciones y unidades vive en arrays o mapas ordenados del registro.
  Los índices sirven para navegación, nunca como identidad persistente.
- S01 conserva los siete IDs y hashes existentes: `question/pregunta`, `instance/instancia`,
  `signal/senal`, `task/tarea`, `family/familia`, `domain/dominio` y `evidence/evidencia`.
- La bibliografía recibe un ID propio y ocupa la diapositiva 0. No renumera las estaciones.
- El enlace `#instancia` abre la primera unidad de esa estación. Un hash específico usa
  `#<station-hash>/<unit-id>`; un hash inválido recupera una entrada útil y no lanza una
  excepción sin controlar.
- Presentación, lectura y actividades consumen la misma secuencia de unidades. Presentación
  muestra una unidad principal; lectura mantiene el orden lineal; actividades mantienen su
  estado de respuesta separado del contenido.
- Anterior y Siguiente recorren unidades declaradas y cruzan estaciones disponibles. En
  bibliografía, Anterior está deshabilitado. En el último elemento, Siguiente queda
  deshabilitado o muestra una acción final explícita definida por la sesión.
- Cambiar de ruta conserva estación/unidad cuando existe una correspondencia válida; de lo
  contrario vuelve a la primera unidad de la nueva ruta y explica el cambio.
- Cambiar vista conserva el punto de retorno. Reset vuelve a bibliografía y ruta inicial
  resuelta, conserva la vista elegida y no reactiva sesiones/rutas excluidas.
- El carril reutilizado es `SlideRail`; el adaptador entrega una secuencia plana y resuelve
  contenido, IDs, hashes y rutas. No se crea un carril alternativo por sesión.

## 4. Modalidades y accesibilidad

La ficha [course-navigation.md](../../specs/interactions/course-navigation.md) es normativa
para la interacción principal. El contrato exige:

- controles nativos con nombre accesible, foco visible y operación por teclado (`Tab`, flechas,
  `Home`, `End`, `Enter`/espacio);
- flujo vertical legible en móvil, sin desbordamiento horizontal, y contenido esencial en
  HTML sin JavaScript;
- `prefers-reduced-motion` sin transiciones imprescindibles para comprender el estado;
- lectura equivalente de SVG/Canvas, resumen textual del estado y explicación de qué observar;
- cierre de diálogos con retorno de foco a su origen, sin dejar foco en un nodo desmontado;
- `teacherMode` como ayuda contextual independiente de la definición, ejemplos, precauciones y
  actividad;
- `direct` sin giro, hover ni respuesta previa para acceder a definición, interpretación y
  ejemplo; el cambio de modalidad no marca una actividad como correcta.

## 5. Frontera editorial y procedencia

Este contrato permite que una implementación use fixtures y contenido del piloto para probar
la mecánica. No convierte un paquete en revisado o publicable. `inbox/` sigue fuera del build;
la promoción a `docs/content/` requiere procedencia, derechos, revisión y `publish_ready: true`
según los protocolos.

### Variantes de procedencia

La procedencia de un paquete adopta una de estas formas, sin rellenar campos de la otra con
valores ficticios:

```yaml
# Material originado en Obsidian/DASAN
origin: obsidian
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion narrativo para impartir la sesión

# Síntesis escrita en este repositorio
origin: repo
source_path: docs/guides/FORK_CONFIGURATION.md
source_heading: Configuración funcional del fork
```

`source_note` es obligatorio para `origin: obsidian` y siempre es una ruta relativa al vault.
`source_path` es obligatorio para `origin: repo` y siempre es una ruta relativa al repositorio
que existe en la revisión evaluada. `source_heading` identifica el tramo usado. Una síntesis
puede declarar varias entradas de procedencia en una lista, pero cada entrada conserva su
origen y ruta. B01 debe reflejar esta distinción en el esquema y en el validador sin relajar
los requisitos de contenido público.

### Estado real al cerrar A03

| Paquete/artefacto | Origen y ubicación | Estado técnico/editorial | Visibilidad y destino | Condición de promoción |
| --- | --- | --- | --- | --- |
| `COURSE-CONTEXT-MLCP` | `origin: obsidian`; sus tres `source_notes` están en `inbox/COURSE_CONTEXT.md` | paquete `drafting`; no revisado para publicación | `internal`; arquitectura, portada y navegación | confirmar alcance, derechos y qué síntesis puede pasar a `docs/` |
| `S01-ML-IA-metodos-estadisticos` | `origin: obsidian`; `inbox/sessions/S01-ML-IA-metodos-estadisticos/SESSION_PACKET.md` | `drafting`; el guion y las fuentes siguen en el vault | `internal`; futura sesión, glosario y prácticas | revisión editorial, procedencia por tramo, fuentes/derechos y representación pública propia |
| `S01-CONCEPTS` | `origin: obsidian`; `inbox/concepts/S01-CONCEPTS.md` | `drafting`; varias semillas requieren atomización en el vault | `internal`; `glossary/` y enlaces futuros | notas atómicas, definiciones revisadas, fuentes y autorización |
| `S01-SOURCE-MAP` | `origin: obsidian`; `inbox/sessions/S01-ML-IA-metodos-estadisticos/S01-SOURCE-MAP.md` | `drafting`; mapa de apoyo y límites de las definiciones | `internal`; referencias de notas/páginas | comprobar cada fuente y ubicación antes de atribuir una afirmación |
| Piloto S01 integrado | `origin: repo`; `src/pages/sistema/index.astro`, `src/components/react/S01LearningJourney.tsx` y adaptadores | prototipo técnico interno/no indexado; no es paquete público revisado | ruta `/sistema/` y alias `/sistema/s01/` en el build actual | B04 debe aplicar disponibilidad; una promoción editorial requiere paquete propio y revisión |
| Guía técnica de forks para S00 | `origin: repo`; `README.md` y `docs/guides/FORK_CONFIGURATION.md` son rutas reales existentes | documentación funcional parcial; S00 aún no está creado | guía interna del repo; destino futuro S00 | G01 sintetiza una sesión con procedencia `repo`, añade pruebas reales y conserva enlaces a estas rutas |

El piloto puede ser consumido por tests y fixtures como código original del repositorio. La
etiqueta `noindex` y la nota de estado no sustituyen la selección de disponibilidad de B04 ni
una revisión editorial. La existencia de un directorio en `inbox/` tampoco equivale a permiso
de publicación.

## 6. Pruebas de contrato

| Grupo | Caso positivo | Caso negativo o límite | Resultado esperado |
| --- | --- | --- | --- |
| Configuración | `interactive`, `teacherMode: false`, `presentation`, S01 y ruta `spectrum` | ruta desconocida o ruta inicial ausente | config válida en el primer caso; error con campo/ID en el segundo |
| Precedencia | default global `true`, override de sesión `false` | tratar `false` como ausencia | prevalece `false` y queda cubierto por prueba |
| Sesiones | S00 sin rutas y S01 con tres rutas | lista de sesiones vacía o ID repetido | estado vacío útil o error explícito |
| Navegación | bibliografía → primera unidad → siguiente unidad → siguiente estación | hash viejo con sesión excluida o hash con unidad inexistente | recuperación/404 conforme a disponibilidad, sin reactivar contenido |
| Modalidad | mismo contenido en `interactive` y `direct` | depender de giro, hover o respuesta para leer el contenido | semántica y actividad se conservan; la respuesta sigue separada |
| Accesibilidad | teclado, foco, móvil, sin JS y movimiento reducido | foco perdido o control solo visual | prueba bloquea la regresión |

Los nombres de los tipos, campos, IDs y reglas de esta ADR son la referencia para B01–G03.
Si el código vivo exige un cambio, el agente debe proponer una modificación mínima, listar
consumidores y actualizar esta ADR, sus fixtures y pruebas en la misma entrega.
