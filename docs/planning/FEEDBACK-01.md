# Primera retroalimentación del curso y la web

Fecha de registro: 2026-09-07. Fuente: mensaje del usuario y dos capturas adjuntas de S01.

Estado: piloto de S01 implementado y verificado localmente; snapshots Linux pendientes. Este documento registra lo solicitado y propone una secuencia de trabajo. Las decisiones técnicas propuestas están en [arquitectura y flujos](../architecture/COURSE_EVOLUTION.md); las opciones funcionales del piloto se documentan en la [guía de forks](../guides/FORK_CONFIGURATION.md) y los resultados en el [registro de verificación](S01_PILOT_QA.md).

## Dirección pedagógica

El curso debe poder enseñarse con más espacio visual, ejemplos concretos y ayudas para el tutor. Cada fork debe permitir seleccionar sesiones, rutas de ejemplo e interacción mediante una configuración comprensible. Los ejemplos se centran en exoplanetas; cuando no haya un ejemplo pertinente, se amplían a estrellas. Se omiten los ejemplos de galaxias.

## Requisitos y criterios de aceptación

Los criterios traducen la retroalimentación a comprobaciones. R04 y R05 están implementados; R01, R03, R07–R10 y R12 tienen implementación en el piloto S01. La cobertura completa del curso continúa pendiente y se cerrará con evidencia de validación.

| ID | Solicitud del usuario | Criterio de aceptación |
| --- | --- | --- |
| R01 | Diapositiva 0 bibliográfica en cada sesión. | Cada sesión empieza con libros y materiales realmente utilizados, capítulos o secciones cuando se conozcan y su función en la sesión. Los enlaces y atribuciones son verificables; las referencias completas siguen disponibles durante el recorrido. |
| R02 | Crear S00: introducción, guía de la página y requerimientos, especialmente para forks. | S00 explica propósito, recorrido, prerrequisitos conceptuales y técnicos, navegación y adaptación de un fork. Incluye cómo configurar, ejecutar, comprobar y preparar la publicación. S01 conserva su identificador. |
| R03 | Poder activar o desactivar la interacción desde la configuración. | En modo directo las tarjetas muestran definición, reverso y ejemplo desde el inicio, sin exigir abrirlas ni girarlas. En modo interactivo conservan anticipación y revelado. La elección funciona en todas las sesiones que adopten el contrato. |
| R04 | Imagen 1: flechas del centro hacia afuera. | Las cinco conexiones parten de «una observación» y terminan con puntas visibles hacia Predecir, Describir, Estimar, Decidir y Generar; la dirección se entiende en proyección y móvil. |
| R05 | Imagen 2: Estadística → ML → IA. | El orden visual, de lectura y de teclado es Estadística, ML, IA. Se presenta como orden didáctico; no se infiere una jerarquía de inclusión entre disciplinas. |
| R06 | Botoncito de ejemplo en todas las explicaciones. | Cada unidad explicativa tiene una acción «Ver ejemplo», con caso concreto y recurso pertinente: paper, página o noticia. Puede incluir una imagen original de apoyo. Se identifica qué afirmación ilustra y qué respalda la fuente. |
| R07 | Cada parte de una estación debe ser una subslide, en lugar de mostrar las tres partes a la vez. | Presentación muestra una parte principal por vez y un indicador de estación/subslide. Anterior y Siguiente recorren las partes sin perder ruta ni contexto. Lectura conserva la secuencia completa. |
| R08 | Normalmente la subsección de la derecha debe aparecer primero. | Se revisa cada estación y se registra su orden. El panel derecho actual abre la secuencia por defecto; las excepciones se justifican por el desarrollo pedagógico. |
| R09 | El tutor puede activar o desactivar ejemplos de ruta en su fork. | La configuración selecciona rutas por ID; una ruta desactivada desaparece de selectores y enlaces. La ruta inicial pertenece al conjunto habilitado y se define qué hacer si no queda ninguna. |
| R10 | En Instancia, cada tarjeta debe mostrar claramente el ejemplo de cada elemento del flujo. | Instancia, observación, representación, objetivo/señal, modelo y salida muestran una miniatura o representación concreta y una frase aplicada al mismo caso. Al cambiar de ruta se actualizan todos los elementos. |
| R11 | Organizar una línea visual para imágenes realizadas con la herramienta de GPT. | Existe una guía de composición, paleta, significado de colores, encuadres y prompts reutilizables. Cada imagen tiene propósito, texto alternativo y procedencia; una ilustración se distingue de datos o resultados. |
| R12 | Modo docente configurable, con preguntas sugeridas en muchos temas. | Las unidades relevantes ofrecen preguntas de apertura, diagnóstico o transferencia cuando se habilita el modo docente. La ayuda se ubica junto al concepto correspondiente y evita duplicar la explicación. |
| R13 | Configuración docente para activar o desactivar sesiones progresivamente. | El tutor puede publicar una selección de sesiones. Índices, navegación, enlaces y rutas generadas reflejan la misma selección; una sesión desactivada no sigue disponible mediante su antigua URL en el nuevo build. |
| R14 | Glosario emergente: términos técnicos clicables con definición breve. | Un término abre una definición sintética y un enlace a su entrada completa. Las definiciones se reutilizan por ID, admiten teclado y toque, y preservan relaciones concepto ↔ sesiones/ejercicios. |
| R15 | Cajas o secciones de precaución para distinciones delicadas. | Un componente reconocible presenta distinción, posible confusión y consecuencia junto a la afirmación. Usa texto y forma además del color. |
| R16 | Abundancia de ejemplos de exoplanetas, después estrellas; omitir galaxias. | El inventario de ejemplos registra dominio y justificación. Se revisan texto, imágenes, tarjetas, rutas y actividades; los ejemplos galácticos se sustituyen y los genéricos se concretan donde corresponda. |

La sesión S00 es una unidad introductoria del curso. La diapositiva 0 es la apertura bibliográfica de **cada** sesión, incluida S00 con sus materiales pertinentes.

Para R06, se propone definir «unidad explicativa» como el bloque con una idea y una interpretación propias: subslide, definición, distinción o explicación de una actividad. No hace falta repetir el botón después de cada párrafo del mismo bloque.

## Correspondencia de las capturas

- **Imagen 1:** «¿Qué podemos hacer con una observación?». El centro representa la observación y la periferia sus cinco posibles salidas. Corresponde a `QuestionScene` en `src/components/react/S01LearningJourney.tsx`. R04 afecta las conexiones del SVG; no cambia los verbos.
- **Imagen 2:** «¿Qué aporta cada disciplina?». Corresponde a `s01Lenses` en `src/lib/s01-journey.ts` y a su presentación en `QuestionScene`. R05 requiere revisar también el fallback y cualquier selección que dependa de la posición en el arreglo.

Las capturas son evidencia de la interfaz comentada. Las peticiones proceden del mensaje del usuario; las etiquetas visibles de la interfaz no definen instrucciones adicionales.

## Lo que ya existe y se puede ampliar

Inspección local realizada al registrar esta retroalimentación:

| Pieza actual | Punto de partida |
| --- | --- |
| S01: `src/components/react/S01LearningJourney.tsx` | Presentación, lectura, actividades, tarjetas, escenas y panel derecho. La reorganización puede conservar sus conceptos y separar la composición. |
| Datos: `src/lib/s01-journey.ts` | Siete estaciones; rutas `spectrum`, `catalog`, `followup`; definiciones, preguntas `tutorPrompt`, misconcepciones y reparaciones. |
| Glosario: `src/content.config.ts` y `src/pages/glosario/[...id].astro` | Colección de conceptos y relaciones inversas existentes; falta poblar contenido aprobado y añadir acceso contextual. |
| Configuración: `astro.config.mjs` | `BASE_PATH` y `SITE_URL` ya parametrizan el sitio. Falta una configuración pedagógica común. |
| Prototipo: `src/pages/sistema/index.astro` | S01 se monta directamente fuera de las colecciones públicas. La selección progresiva deberá contemplar esta ruta y su alias `/sistema/s01/`. |
| Skill web: `skills/develop-mlcp-web/` | Fuente canónica con espejos en `.agents/skills/` y `.codex/skills/`; el validador actual comprueba esta skill concreta. |

La nota [sobre el prototipo](../../outbox/2026-08-19-s01-prototype-observation.md) registra la retirada de un modo tutor por duplicación. R12 introduce una petición nueva: ayudas contextuales configurables. Su implementación debe resolver esa duplicación anterior.

## Orden de trabajo propuesto

La asignación concreta se desarrolla en el [plan ejecutable para agentes](agent-execution/README.md), con una ficha por tarea, dependencias, archivos permitidos, evidencia exigida y aceptación por criterio.

| Fase | Entrega revisable | Requisitos | Dependencias |
| --- | --- | --- | --- |
| 1. Contratos y correcciones puntuales | Ficha de subslides, contrato de configuración y corrección de flechas/orden en S01. | R03–R05, R07–R09, R12–R13 | Revisar las fichas existentes y fijar IDs y valores por defecto antes de repartir código. |
| 2. Piloto S01 | Apertura bibliográfica; estaciones Pregunta e Instancia adaptadas; navegación por subslides; modo directo/docente; selección de rutas. | R01, R03, R07–R10, R12 | Contratos de fase 1. Verificar el mismo contenido en ambas modalidades. |
| 3. Contenido y lenguaje visual | Inventario de ejemplos y fuentes, componentes de ejemplo/glosario/precaución y primeras imágenes revisadas. | R06, R10–R11, R14–R16 | Puede prepararse en paralelo a fase 2; integrar sobre sus interfaces estabilizadas. |
| 4. Generalización y S00 | Resto de S01 adaptado, guía de fork, S00 y activación progresiva de sesiones. | R01–R03, R06–R16 | Patrones probados en el piloto y configuración funcional para documentar pasos reales. |

Primera entrega recomendada: estaciones **Pregunta** e **Instancia**, porque concentran ambas capturas, el panel derecho, las tarjetas y el flujo visual. Esta selección sirve como piloto; el alcance final incluye todas las sesiones.

## Cierre y validación

- Contrastar cada entrega con sus IDs R01–R16; conservar pendientes explícitos.
- Revisar fuentes y derechos antes de incorporar ejemplos externos. Esta organización todavía no selecciona papers ni valida afirmaciones nuevas.
- Para cambios funcionales: gates de [calidad y entrega](../protocols/QUALITY_AND_RELEASE.md), raíz y subruta, teclado, móvil, proyección, movimiento reducido y lectura sin JavaScript.
- Verificar combinaciones de interacción y ayudas docentes, rutas habilitadas, sesiones deshabilitadas y navegación directa por URL.
- Registrar resultados visuales y funcionales por separado. Publicar requiere instrucción expresa y verificación posterior.
