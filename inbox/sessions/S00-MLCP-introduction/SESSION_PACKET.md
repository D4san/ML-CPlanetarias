---
id: S00-MLCP-introduction
kind: session-packet
status: drafting
origin: repo
source_path: docs/guides/FORK_CONFIGURATION.md
source_heading: Configurar el piloto en un fork
title: Introducción al curso, la cadena científica y el fork
summary: Orientación inicial para recorrer el curso y preparar una adaptación reproducible sin convertir la selección técnica en aprobación editorial.
objectives:
  - Reconocer la cadena pregunta científica → representación → tarea → evaluación → límites.
  - Elegir una vista del curso y localizar ejemplos o conceptos por sus identificadores.
  - Configurar identidad, modos y sesiones de un fork respetando que S00 no declara rutas.
  - Distinguir contenido de trabajo, contenido aprobado y publicación.
bibliographyId: s00-bibliography
stationIds:
  - purpose
  - student
  - tutor
  - collaborator
  - achievement
units:
  - s00-purpose-chain
  - s00-student-orientation
  - s00-tutor-fork
  - s00-collaborator-contract
  - s00-achievement-check
concepts:
  - cadena-cientifica
  - unidad-de-analisis
  - configuracion-de-fork
  - sesion-sin-rutas
  - disponibilidad-editorial
  - procedencia-repo
  - build-subruta
source_refs:
  - mlcp-readme
  - mlcp-fork-guide
  - mlcp-adr-0002
  - mlcp-contracts
  - mlcp-validation
  - mlcp-quality
  - mlcp-package
  - mlcp-runtime
  - mlcp-course-config
  - mlcp-astro-config
  - mlcp-playwright-config
  - mlcp-pages-workflow
  - s01-reference-packet
visibility: internal
publish_ready: false
rights: pending
editorial:
  visibility: internal
  publish_ready: false
  rights: pending
---

# S00 — Introducción al curso, la cadena científica y el fork

## Propósito y frontera

S00 orienta a tres lectores antes de que S00 se monte en el motor común: el estudiante aprende a
leer la secuencia científica; el tutor aprende a seleccionar sesiones, modos y vista; el
colaborador aprende dónde preparar contenido y cómo conservar su procedencia. La sesión sirve de
puente entre el propósito del curso y el uso reproducible del repositorio.

La cadena científica que organiza el curso es:

```text
pregunta científica → unidad de análisis → datos/representación → señal de aprendizaje
→ tarea → familia de modelo → línea base → métrica/evaluación
→ interpretación y límites → transferencia docente
```

S00 usa un microproblema de espectros de atmósferas de exoplanetas tomado como referencia del
paquete S01. Es un ejemplo conceptual: no contiene datos, etiquetas verificadas, línea base,
métrica, resultado ni validación física. El nombre astronómico no autoriza a presentar una
demostración como evidencia científica.

Dentro de S00 quedan la orientación, la configuración y el ejercicio de logro. Fuera quedan la
implementación del adaptador, la integración de contenido público, la producción de assets, la
validación científica de ejemplos y la publicación.

## Audiencia, pregunta y resultados

**Audiencia de trabajo.** Estudiantes que llegan al curso para aprender ML aplicado a preguntas de
ciencias planetarias; tutores que adaptan una selección; y colaboradores que preparan o revisan
paquetes del repositorio. El nivel formal exacto de la audiencia estudiantil queda pendiente de
decisión editorial.

**Pregunta de aprendizaje.** ¿Cómo puedo recorrer y adaptar el curso conservando la pregunta
científica, la evidencia, la procedencia y los límites de cada salida?

Al terminar la orientación, un lector debería poder:

1. completar una cadena breve desde una pregunta hasta una evaluación y un límite;
2. distinguir una instancia, su representación y una salida esperada;
3. cambiar entre `presentation`, `reading` y `activities` sin confundir vista con contenido;
4. leer un ejemplo y un concepto mediante sus IDs cuando estén integrados;
5. reconocer que `enabledSessionIds` selecciona contenido disponible, pero no lo aprueba ni le
   asigna derechos.

## Prerrequisitos y actividades de orientación

Leer S00 no requiere instalar Node, npm ni una herramienta de desarrollo. La orientación inicial
puede hacerse en un despliegue del curso o con el HTML lineal de una sesión integrada.

| Audiencia | Prerrequisito real | Recurso o actividad breve |
| --- | --- | --- |
| Estudiante | Ningún prerrequisito técnico; debe poder describir una observación en lenguaje común. | Completar: “Quiero conocer ___ a partir de ___; la salida serviría para ___”. |
| Estudiante | Distinguir entrada, salida y límite, aunque aún no conozca algoritmos. | Clasificar un microproblema como estimación, clasificación, estructura o generación y escribir qué no demuestra. |
| Tutor | Conocer la pregunta y el uso de su adaptación; consultar la guía viva del fork. | Comparar `defaults` con `sessions.S00: { enabled: true }` y explicar por qué S00 no tiene rutas. |
| Colaborador | Para ejecutar el repo: Node `24.14.0` mediante `.nvmrc` y npm `11.9.0` según `package.json`. | Ejecutar los comandos de verificación en el informe, sin editar el vault ni publicar. |

La instalación es un requisito del colaborador que ejecuta el repositorio, no del estudiante que
lee el material.

## Secuencia editorial e inventario

La bibliografía 0 ocupa el inicio. S00 no declara rutas: el orden estable queda en estaciones y
unidades, y un futuro adaptador deberá entregar esta secuencia plana al `SlideRail` común.

| Orden | Estación | Unidad | Función | Producto |
| ---: | --- | --- | --- | --- |
| 0 | bibliografía | `s00-bibliography` | context | fuentes técnicas y frontera editorial |
| 1 | propósito | `s00-purpose-chain` | opening | cadena científica aplicada a un microproblema |
| 2 | estudiante | `s00-student-orientation` | explain | recorrido sin instalación y vistas |
| 3 | tutor | `s00-tutor-fork` | configure | configuración reproducible del fork |
| 4 | colaborador | `s00-collaborator-contract` | contribute | procedencia, inbox y gates |
| 5 | logro | `s00-achievement-check` | transfer | comprobación observable reservada a G02/G03 |

### `s00-purpose-chain`

- `function`: `opening`
- `title`: De la pregunta científica a los límites
- `question`: ¿Qué queremos conocer, qué observación representa la instancia y cómo sabremos si la salida sirve?
- `visual_object`: cadena textual `pregunta → unidad → representación → tarea → evaluación → límites`.
- `idea`: la pregunta y el uso de la salida organizan la elección posterior de tarea, familia y evaluación.
- `content`: presentar el microproblema de un espectro de una atmósfera de exoplaneta; fijar la unidad y la representación antes de hablar de un modelo.
- `interpretation`: la salida solo adquiere sentido frente a una pregunta, una evidencia y un uso definidos.
- `exampleIds`: [`s00-example-exoplanet-chain`]
- `conceptIds`: [`cadena-cientifica`, `unidad-de-analisis`]
- `limits`: S00 no define datos, objetivo, baseline, métrica ni resultado físico.
- `sourceIds`: [`s01-reference-packet`, `mlcp-contracts`]
- `status`: `drafting`

### `s00-student-orientation`

- `function`: `explain`
- `title`: Recorrer el curso sin instalar herramientas
- `question`: ¿Cómo puedo encontrar la explicación, el ejemplo, el concepto y la actividad que necesito?
- `visual_object`: mapa de navegación con bibliografía 0, Presentación, Lectura, Actividades, ejemplo y glosario.
- `idea`: la vista cambia la composición de lectura, pero conserva la secuencia y el significado editorial.
- `content`: Presentación muestra una unidad principal; Lectura conserva el orden lineal; Actividades separa el estado de respuesta de la narrativa. Un futuro enlace de concepto usará `/glosario/<id>/` cuando exista una entrada pública.
- `interpretation`: el estudiante puede orientarse por la secuencia y no necesita conocer la implementación para leerla.
- `exampleIds`: [`s00-example-glossary-context`]
- `conceptIds`: [`cadena-cientifica`, `disponibilidad-editorial`]
- `limits`: las colecciones públicas de sesiones, conceptos y ejercicios están vacías en la revisión actual; los destinos son de integración futura.
- `sourceIds`: [`mlcp-readme`, `mlcp-adr-0002`, `mlcp-quality`]
- `status`: `drafting`

### `s00-tutor-fork`

- `function`: `configure`
- `title`: Elegir sesiones, modos y vista
- `question`: ¿Qué selección de sesiones y qué defaults necesita este fork?
- `visual_object`: bloque TypeScript de `defineCourseConfig` con identidad, defaults, sesiones y rutas.
- `idea`: la configuración del tutor selecciona disponibilidad y preferencias; no cambia estado editorial ni derechos.
- `content`: S00 se declara con `sessions.S00: { enabled: true }` y sin `enabledRouteIds` ni `defaultRouteId`; S01 conserva sus tres rutas conocidas cuando se incluye.
- `interpretation`: una configuración válida expresa la selección del fork y permite comprobar precedencia de overrides.
- `exampleIds`: [`s00-example-fork-selection`]
- `conceptIds`: [`configuracion-de-fork`, `sesion-sin-rutas`, `disponibilidad-editorial`]
- `limits`: el archivo vivo puede validar S00, pero todavía no genera su página ni su adaptador.
- `sourceIds`: [`mlcp-fork-guide`, `mlcp-course-config`, `mlcp-adr-0002`]
- `status`: `drafting`

### `s00-collaborator-contract`

- `function`: `contribute`
- `title`: Preparar sin promover automáticamente
- `question`: ¿Qué debo conservar para que otra persona reconstruya la procedencia y los límites?
- `visual_object`: flujo `paquete → inbox → revisión → docs/content` con la rama `outbox` hacia el vault.
- `idea`: un paquete reproducible conserva origen, estado, referencias, lagunas y derechos antes de entrar en una salida pública.
- `content`: para una síntesis escrita en este repositorio se usa `origin: repo` con `source_path` relativo real; `inbox/` queda fuera del build y `publish_ready` no se infiere de que el texto esté completo.
- `interpretation`: el siguiente agente puede saber qué usar, qué verificar y qué no publicar.
- `exampleIds`: [`s00-example-disabled-s01`]
- `conceptIds`: [`procedencia-repo`, `disponibilidad-editorial`, `build-subruta`]
- `limits`: no se modifica el vault, no se copian libros o extracciones privadas y no se publican cambios desde S00.
- `sourceIds`: [`mlcp-bridge`, `mlcp-contracts`, `mlcp-adr-0002`, `mlcp-validation`]
- `status`: `drafting`

### `s00-achievement-check`

- `function`: `transfer`
- `title`: Verificar una adaptación controlada
- `question`: ¿Puedo reconocer la identidad del fork, llegar a un ejemplo y un concepto, cambiar de vista y confirmar la exclusión de S01?
- `visual_object`: tabla de precondiciones, acciones y resultados observables del ejercicio `G01-EX-01`.
- `idea`: una adaptación se considera encaminada cuando sus cambios son observables en navegación, configuración y disponibilidad.
- `content`: ejecutar el ejercicio en una copia de ensayo después de G02/G03; mantener una tabla de resultados y separar los pasos no ejecutables hoy.
- `interpretation`: el ejercicio comprueba el contrato de uso, no la validez científica de un modelo ni la autorización de publicación.
- `exampleIds`: [`s00-example-fork-selection`, `s00-example-glossary-context`, `s00-example-disabled-s01`]
- `conceptIds`: [`configuracion-de-fork`, `disponibilidad-editorial`, `sesion-sin-rutas`]
- `limits`: S00 aún no tiene ruta ni entrada pública; la ejecución queda pendiente y no se reporta como realizada.
- `sourceIds`: [`mlcp-fork-guide`, `mlcp-course-config`, `mlcp-adr-0002`, `mlcp-validation`]
- `status`: `drafting`

## Ejemplos por ID

Son registros conceptuales para la futura integración; no son resultados científicos ni entradas
aprobadas de una colección pública.

```yaml
- id: s00-example-exoplanet-chain
  type: conceptual
  question: ¿Qué propiedad queremos estimar de una atmósfera a partir de un espectro?
  domain: atmósfera de un exoplaneta, como microproblema docente
  representation: valores de flujo u otra representación que deberá fijarse con el objetivo
  task: formular una estimación continua o una clasificación, según la salida elegida
  interpretation: hacer explícitos unidad, entrada, salida, uso y evaluación pendiente
  limits: no hay datos, etiquetas, baseline, métrica, incertidumbre ni validación física
  sourceIds: [s01-reference-packet]
  assetIds: []

- id: s00-example-fork-selection
  type: conceptual
  question: ¿Cómo selecciono S00, los modos y la vista sin editar componentes?
  domain: adaptación local del curso
  representation: objeto TypeScript `courseConfig`
  task: declarar identidad, defaults, `enabledSessionIds` y `sessions`
  interpretation: observar la configuración resuelta y, después de G02, su efecto en la interfaz
  limits: la configuración actual no implementa la página S00 ni prueba por sí sola los enlaces
  sourceIds: [mlcp-course-config, mlcp-fork-guide]
  assetIds: []

- id: s00-example-disabled-s01
  type: conceptual
  question: ¿Qué debe desaparecer al excluir S01 del fork?
  domain: disponibilidad estática del curso
  representation: `enabledSessionIds` y las rutas estáticas generadas
  task: habilitar solo S00 y comprobar navegación, aliases y 404 de S01
  interpretation: la selección de disponibilidad afecta páginas y enlaces sin reactivar contenido por hash
  limits: la prueba depende de la integración de S00 y del build de G02/G03
  sourceIds: [mlcp-adr-0002, mlcp-course-config, mlcp-validation]
  assetIds: []
```

## Semillas conceptuales

Estas semillas se proponen para el glosario y permanecen sin registro público aprobado:

| ID | Término | Definición breve de trabajo | Estado |
| --- | --- | --- | --- |
| `cadena-cientifica` | Cadena científica de ML | relación ordenada entre pregunta, representación, tarea, evaluación, interpretación y transferencia | `atomization-pending` |
| `unidad-de-analisis` | Unidad de análisis | instancia reconocible a la que se asocian entrada, objetivo o salida | `atomization-pending` |
| `configuracion-de-fork` | Configuración de fork | selección declarativa de identidad, defaults, sesiones y rutas permitidas | `seed` |
| `sesion-sin-rutas` | Sesión sin rutas | sesión válida que no necesita selector ni ruta inicial ficticia | `seed` |
| `disponibilidad-editorial` | Disponibilidad editorial | selección de contenido visible en un fork separada de revisión, derechos y publicación | `atomization-pending` |
| `procedencia-repo` | Procedencia de repositorio | origen portable que identifica un archivo y tramo real del repositorio | `seed` |
| `build-subruta` | Build bajo subruta | salida estática construida con un `BASE_PATH` explícito | `seed` |

## Preguntas docentes

```yaml
- id: s00-purpose-opening
  intent: opening
  question: ¿Qué queremos conocer, qué observación representa la instancia y qué límite debemos declarar?
  guidance: pedir entrada, salida, uso y evidencia antes de nombrar una familia de modelos
  unitId: s00-purpose-chain

- id: s00-tutor-diagnostic
  intent: diagnostic
  question: ¿Qué cambiaría en el fork si S00 no tiene rutas y S01 sí tiene tres?
  guidance: revisar `sessions.S00: {}` frente a `sessions.S01.enabledRouteIds` y el default de S01
  unitId: s00-tutor-fork

- id: s00-collaborator-transfer
  intent: transfer
  question: ¿Qué evidencia permitiría promover este paquete y qué evidencia sigue faltando?
  guidance: separar integración técnica, revisión editorial, derechos y autorización de publicación
  unitId: s00-collaborator-contract
```

## Precauciones esenciales

```yaml
- id: s00-config-is-not-approval
  distinction: selección del fork y autorización editorial son decisiones distintas
  confusion: asumir que incluir S00 en `enabledSessionIds` la vuelve revisada o publicable
  consequence: enlazar o publicar material interno sin revisión, derechos ni `publish_ready: true`
  sourceIds: [mlcp-contracts, mlcp-adr-0002]

- id: s00-no-install-prerequisite
  distinction: leer el curso y ejecutar el repositorio son actividades distintas
  confusion: exigir Node/npm al estudiante para acceder a una explicación
  consequence: convertir una herramienta de colaboración en una barrera pedagógica
  sourceIds: [mlcp-readme, mlcp-validation]

- id: s00-prediction-not-physics
  distinction: una salida predictiva y una explicación física responden preguntas distintas
  confusion: tratar un microproblema conceptual como evidencia científica
  consequence: atribuir validación o causalidad sin datos, métrica y evaluación pertinentes
  sourceIds: [s01-reference-packet, mlcp-contracts]

- id: s00-route-not-content
  distinction: una URL o hash navega una salida disponible; no autoriza contenido excluido
  confusion: usar un enlace profundo para reactivar S01 o una fuente interna
  consequence: romper la frontera de disponibilidad del fork
  sourceIds: [mlcp-adr-0002, mlcp-course-config]
```

Las precauciones pertenecen al contenido principal y no dependen de `teacherMode`.

## Recorridos por audiencia

### Estudiante

1. Entrar al curso y leer la pregunta, el propósito y la bibliografía 0.
2. Seguir `s00-purpose-chain` con el microproblema conceptual; escribir entrada, salida y límite.
3. En Presentación, leer una unidad principal; en Lectura, recorrer el mismo orden; en
   Actividades, responder el ejercicio manteniendo separado su estado.
4. Abrir un ejemplo por su ID y seguir el término relacionado al glosario cuando ambos estén
   integrados en contenido público.
5. Entregar la frase de logro: “pregunta ___; representación ___; tarea ___; evaluación ___; no
   puedo concluir ___”.

La ruta actual no permite ejecutar este recorrido en S00: no existe su adaptador y `docs/content/`
no contiene registros públicos. La secuencia queda preparada para G02.

### Tutor

1. Copiar la configuración del fork en una rama o copia controlada.
2. Elegir identidad y defaults globales.
3. Incluir S00 sin rutas; incluir S01 solo si se desea y conservar sus rutas conocidas.
4. Elegir modo `interactive` o `direct`, ayuda docente `true`/`false` y vista
   `presentation`/`reading`/`activities`.
5. Ejecutar los gates de la sección siguiente en G03 y revisar que una exclusión no se reactive por
   URL.

### Colaborador

1. Leer `AGENTS.md`, el README, el puente, los contratos y la ADR antes de cambiar un paquete.
2. Mantener el material de preparación en `inbox/`; usar `origin: repo` y `source_path` relativo
   a un archivo existente.
3. Diferenciar paráfrasis del curso, fuente consultada, ejemplo conceptual y afirmación científica.
4. Registrar cada laguna con evidencia disponible, falta, tarea y condición de cierre.
5. Entregar el paquete al integrador; no modificar el vault, `docs/content/`, componentes ni
   workflow desde G01.

## Configuración del fork

La forma siguiente corresponde a los tipos y validaciones vivos de `config/course.config.ts`. Es
un ejemplo de trabajo para una copia de ensayo; no se aplicó al workspace.

```ts
import { defineCourseConfig } from '../src/lib/course-config';

export const courseConfig = defineCourseConfig({
  identity: {
    id: 's00-fork-demo',
    title: 'Mi adaptación de ML Ciencias Planetarias',
  },
  defaults: {
    interactionMode: 'direct',
    teacherMode: true,
    defaultView: 'reading',
  },
  enabledSessionIds: ['S00', 'S01'],
  sessions: {
    S00: {
      enabled: true,
    },
    S01: {
      enabled: true,
      enabledRouteIds: ['spectrum', 'catalog', 'followup'],
      defaultRouteId: 'spectrum',
    },
  },
});
```

Reglas verificadas contra el código vivo:

- `S00` no puede declarar `enabledRouteIds` ni `defaultRouteId`; es una sesión sin rutas.
- S01 usa únicamente `spectrum`, `catalog` y `followup`, y su ruta inicial debe estar habilitada.
- Un override de sesión puede prevalecer sobre `defaults`; `false` es explícito.
- Para probar solo S00, usar `enabledSessionIds: ['S00']` y conservar `sessions.S00`.
- El archivo de configuración no modifica `status`, `visibility`, `publish_ready` ni derechos.

### Comandos y rutas vivas

| Elemento | Evidencia viva | Uso en S00 |
| --- | --- | --- |
| Runtime | `.nvmrc` = `24.14.0`; `package.json` = `npm@11.9.0` | requisito técnico del colaborador |
| Instalación | `npm ci` en `README.md` y workflow | preparación local |
| Calidad | `npm run check` | gate mínimo de esta preparación |
| Unitarias | `npm run test:unit` | gate proporcional; no cambia S00 porque aún no hay código nuevo |
| Build raíz | `npm run build` | G02/G03, antes de E2E |
| Build subruta | `npm run build:subpath` con `/preview` | comprobar contrato de `BASE_PATH` |
| S01 actual | `src/pages/sistema/[...id].astro` → `/sistema/`, `/sistema/s01/` | referencia del piloto; no se duplica para S00 |
| Sesiones públicas | `src/pages/sesiones/[...id].astro` → `/sesiones/<id>/` | destino previsto para S00 tras integración pública; hoy sin entradas |
| Glosario y ejercicios | `src/pages/glosario/[...id].astro`, `src/pages/ejercicios/[...id].astro` | destinos de ejemplo/término; hoy sin entradas públicas |
| Subruta de Pages | `.github/workflows/deploy-pages.yml` → `/ML-CPlanetarias` | preparación informativa; no publicar desde G01 |

El runner de Playwright usa el build estático servido por `npm run preview:test`; esto pertenece a
la verificación de G02/G03, no a la ejecución de este paquete.

## Ejercicio de logro `G01-EX-01`

**Resultado observable diseñado.** En una copia de ensayo posterior a G02, el tutor puede
identificar la identidad del fork, recorrer S00 sin selector de rutas, abrir un ejemplo y un
concepto, cambiar de vista conservando la unidad y comprobar que la exclusión de S01 produce la
desaparición de sus páginas y aliases.

**Precondición.** G02 debe integrar S00 y G03 debe crear una copia/checkout de ensayo. El ejercicio
no modifica el `config/course.config.ts` de este workspace.

| Paso | Acción en la copia de ensayo | Resultado observable |
| ---: | --- | --- |
| 1 | Aplicar el bloque de configuración anterior. | Cabecera/título usan la identidad del fork; defaults quedan en directo, docente y lectura. |
| 2 | Abrir S00 y recorrer Presentación, Lectura y Actividades. | S00 aparece sin selector de rutas; el orden de unidades se conserva y el estado de actividad no se completa solo. |
| 3 | Abrir `s00-example-exoplanet-chain` y el término `cadena-cientifica`. | El ejemplo queda localizable por ID y el término apunta a `/glosario/cadena-cientifica/` solo si existe el registro público; si falta, se registra la laguna, no un éxito. |
| 4 | Cambiar de Lectura a Presentación y volver. | Se conserva el punto de retorno o se explica la recuperación definida por el adaptador. |
| 5 | Cambiar a `enabledSessionIds: ['S00']`, reconstruir y revisar navegación, aliases y hashes de S01. | S01 no aparece ni se reactiva por URL; `/sistema/` y `/sistema/s01/` deben responder 404 en el build nuevo. |
| 6 | Guardar configuración, rutas, resultados y código de cada comando. | Otra persona puede repetir la comprobación sin usar conocimiento implícito del autor. |

**Estado actual del ejercicio.** No ejecutado: S00 no tiene adaptador/ruta en la revisión actual y
las colecciones públicas están vacías. G01 deja el procedimiento y sus resultados esperados; G02/G03
deben producir la evidencia de navegador y build.

## Bibliografía 0 — materiales realmente usados

Esta bibliografía 0 contiene materiales del repositorio consultados para preparar S00. No se
añaden fuentes externas, DOI, páginas o licencias que no estén en los archivos vivos.

| ID | Material | Ubicación consultada | Uso en S00 |
| --- | --- | --- | --- |
| `mlcp-readme` | README del repositorio | `README.md`: `Inicio rápido`, `Contrato del producto`, `Estado` | instalación, frontera de producto y estado interno |
| `mlcp-fork-guide` | Guía de configuración | `docs/guides/FORK_CONFIGURATION.md`: `Perfil mínimo`, `Recorrido del piloto`, `Alcance pendiente` | defaults, sesiones, rutas y límites del fork |
| `mlcp-adr-0002` | ADR del contrato de contenido | `docs/architecture/decisions/ADR-0002-course-content-contract.md`: `Configuración definitiva`, `Frontera editorial y procedencia`, `Pruebas de contrato` | S00 sin rutas, disponibilidad y estados |
| `mlcp-contracts` | Contratos de partida | `docs/planning/agent-execution/CONTRACTS.md`: `Modelo de contenido`, `Disponibilidad y frontera editorial`, `Navegación y modalidades` | jerarquía, procedencia y vistas |
| `mlcp-validation` | Validación y evidencia | `docs/planning/agent-execution/VALIDATION.md`: `Gates por tipo de tarea`, `Comandos vigentes`, `Evidencia durable` | gate proporcional y ejercicio |
| `mlcp-quality` | Protocolo de calidad | `docs/protocols/QUALITY_AND_RELEASE.md`: `Comandos estables`, `CI y publicación` | build, subruta y separación de publicación |
| `mlcp-package` | Scripts y engines | `package.json`: `scripts`, `engines`, `packageManager` | comandos y versiones |
| `mlcp-runtime` | Versión fijada | `.nvmrc`: primera línea | Node vivo del colaborador |
| `mlcp-course-config` | Configuración actual | `config/course.config.ts`: `courseConfig` | forma real del fork y rutas S01 |
| `mlcp-astro-config` | Configuración de Astro | `astro.config.mjs`: `normalizeBasePath`, `defineConfig` | `BASE_PATH` y salida estática |
| `mlcp-playwright-config` | Configuración de navegador | `playwright.config.ts`: `baseURL`, `webServer` | build servido y subruta de pruebas |
| `mlcp-pages-workflow` | Workflow de Pages | `.github/workflows/deploy-pages.yml`: variables `BASE_PATH`/`SITE_URL` y jobs | preparación de publicación, sin ejecutarla |
| `s01-reference-packet` | Paquete S01 usado como referencia | `inbox/sessions/S01-ML-IA-metodos-estadisticos/SESSION_PACKET.md`: `Propósito`, `Alcance`, `Mensaje núcleo` | cadena científica y microproblema conceptual |

Las ubicaciones anteriores se consultaron en la revisión de trabajo del 2026-09-08. Las
referencias no tienen URL externa ni licencia declarada en este paquete.

## Lagunas editoriales y revisión

| Afirmación o decisión retenida | Evidencia disponible | Falta | Tarea y condición de cierre |
| --- | --- | --- | --- |
| Audiencia estudiantil exacta y duración | propósito del curso y S01 consultados | nivel, duración y decisión editorial explícitos | confirmar con la persona responsable de contenido antes de promover S00 |
| `cadena-cientifica` y los demás conceptos | semillas del paquete y contrato | atomización, fuentes específicas y entrada aprobada | crear/revisar registros en el flujo editorial; no enlazar una entrada inexistente |
| Ejemplo astronómico | S01 lo formula como microproblema | datos, objetivo, baseline, métrica, incertidumbre y validación física | convertirlo en práctica solo con fuente, datos/derechos y evaluación trazables |
| Ejemplo y término navegables | componentes/rutas del código y contrato | integración de S00 y registros públicos | G02 integra; G03 prueba el enlace en build; `publish_ready` sigue falso hasta revisión |
| Derechos y licencia | ningún archivo consultado declara autorización para este paquete | decisión de derechos y licencia del curso | resolver editorialmente antes de `docs/content/` o publicación |
| Ruta canónica de S00 | helper vivo devuelve `/sesiones/<id>/` para sesiones distintas de S01 | adaptador y decisión final de ruta | G02 implementa y documenta; hoy `/sesiones/s00/` no existe |

### Revisión G01

- IDs de sesión, bibliografía, estaciones, unidades, ejemplos, conceptos, preguntas y
  precauciones son estables y están listados en este paquete.
- Cada unidad declara pregunta, objeto visual, idea, contenido, interpretación, ejemplo,
  conceptos, límites y fuentes; los IDs que aún no existen quedan marcados como preparación.
- Procedencia, estado y derechos son explícitos: `origin: repo`, `status: drafting`, `visibility:
  internal`, `publish_ready: false`, `rights: pending`.
- No se modificó el vault, `docs/content/`, código, tests, configuración ni workflow para crear
  S00.
- El informe `evidence/G01.md` conserva los comandos ejecutados, sus códigos y los bloqueos.
