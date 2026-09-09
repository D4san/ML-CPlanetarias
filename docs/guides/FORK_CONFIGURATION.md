# Configurar el piloto en un fork

La configuración versionada vive en [`config/course.config.ts`](../../config/course.config.ts) y
usa el contrato común de [ADR-0002](../architecture/decisions/ADR-0002-course-content-contract.md).
Después de editarla, reinicia el servidor de desarrollo o reconstruye el sitio con los comandos del
[README](../../README.md).

## Perfil mínimo

```ts
export const courseConfig = defineCourseConfig({
  identity: { id: 'mlcp', title: 'ML Ciencias Planetarias' },
  defaults: {
    interactionMode: 'interactive',
    teacherMode: false,
    defaultView: 'presentation',
  },
  enabledSessionIds: ['S01'],
  sessions: {
    S01: {
      enabled: true,
      enabledRouteIds: ['spectrum', 'catalog', 'followup'],
      defaultRouteId: 'spectrum',
    },
  },
});
```

`enabledSessionIds` conserva el orden del build. La selección actual contiene únicamente S01,
porque S00 todavía no está implementada. Una sesión futura sin rutas puede declarar `S00: {}`;
no se fabrica un selector ni una ruta ficticia.

| Opción | Valores | Efecto |
| --- | --- | --- |
| `identity.id`, `identity.title` | Textos no vacíos | Identidad portable del curso aplicada a cabecera, pie, título y metadatos. |
| `defaults.interactionMode` | `interactive`, `direct` | Anticipar y girar tarjetas, o mostrar sus definiciones y ejemplos completos. |
| `defaults.teacherMode` | `true`, `false` | Añadir preguntas sugeridas y orientación contextual; `false` conserva el contenido esencial. |
| `defaults.defaultView` | `presentation`, `reading`, `activities` | Seleccionar la vista inicial. El lector puede cambiarla con los controles. |
| `sessions.S01.enabledRouteIds` | Lista de `spectrum`, `catalog`, `followup` | Rutas visibles en el selector; una sesión con rutas necesita al menos una. Si se omite, usa las rutas aprobadas del adaptador. |
| `sessions.S01.defaultRouteId` | Una ruta habilitada | Ruta inicial y ruta recuperada al reiniciar. |

`enabledSessionIds` también controla la generación y los enlaces. Una sesión fuera de la lista no
aparece en la portada, navegación principal, índice de sesiones ni backlinks de conceptos; sus
páginas y alias estáticos tampoco se generan. Un hash o query no reactiva una sesión omitida. Los
assets públicos se rigen por su propio manifiesto y no se convierten en control de acceso por este
filtro.

Los campos `interactionMode`, `teacherMode`, `defaultView` y `s01` en la raíz se aceptan como
adaptador temporal para forks antiguos. Los perfiles nuevos deben escribir `defaults` y
`sessions.S01`. Un override de sesión definido prevalece sobre el default global; un `false`
explícito se conserva.

Ejemplo de una configuración directa, docente y de una sola ruta:

```ts
defaults: {
  interactionMode: 'direct',
  teacherMode: true,
  defaultView: 'reading',
},
sessions: {
  S01: {
    enabledRouteIds: ['catalog'],
    defaultRouteId: 'catalog',
  },
},
```

La validación rechaza identidad incompleta, sesiones desconocidas o repetidas, rutas desconocidas,
listas vacías cuando S01 tiene rutas y una ruta inicial deshabilitada. El archivo no promueve
contenido de `inbox/` ni modifica su autorización editorial.

## Recorrido del piloto

- La entrada a Presentación muestra la diapositiva bibliográfica 0. El botón Bibliografía permite volver a ella.
- Pregunta: apertura → cinco salidas → Estadística, ML e IA.
- Instancia: apertura → flujo con ejemplos → notación de ajuste y uso.
- Anterior y Siguiente recorren las partes. Los controles superiores cambian de estación directamente.
- Los enlaces `#pregunta` y `#instancia` abren la primera parte. También puedes compartir
  `#pregunta/salidas`, `#pregunta/disciplinas`, `#instancia/flujo` y `#instancia/notacion`.
- Lectura conserva el desarrollo completo; al regresar a Presentación se mantiene la parte seleccionada.

`BASE_PATH` y `SITE_URL` siguen controlando la subruta y el sitio de despliegue. Antes de publicar
un fork, revisa también los valores de su workflow de Pages. Publicar requiere una instrucción
expresa y permanece fuera de esta guía de implementación.

## Alcance pendiente

La activación de S00, el cierre formal de integración E07, el glosario contextual, el catálogo de
ejemplos externos y la producción de nuevos assets siguen en el [plan de evolución](../planning/FEEDBACK-01.md).
Las siete estaciones de S01 ya cuentan con sus tres partes navegables; esta guía documenta las
opciones funcionales disponibles del piloto y sus límites editoriales.
