# Propuesta de estructura del curso y trabajo con agentes

Fecha: 2026-09-07. Estado: propuesta técnica para implementar la [primera retroalimentación](../planning/FEEDBACK-01.md).

La ejecución detallada está en el [plan para agentes](../planning/agent-execution/README.md): 32 fichas con dependencias, tareas y criterios de aceptación. El piloto ya implementa bibliografía de S01, subslides de Pregunta/Instancia y configuración de interacción, ayudas docentes y rutas; consultar la [guía funcional](../guides/FORK_CONFIGURATION.md). El contrato común vigente quedó fijado en [ADR-0002](decisions/ADR-0002-course-content-contract.md) y su ficha de navegación en [course-navigation.md](../specs/interactions/course-navigation.md). El plan distingue explícitamente lo implementado, lo aceptado y lo pendiente.

Este documento conserva el razonamiento y las propuestas de evolución que dieron origen al plan. Para entidades, campos, IDs, precedencia y navegación implementables manda ADR-0002; las propuestas que no estén adoptadas allí siguen siendo trabajo pendiente. La ADR activa, los protocolos y los esquemas ejecutables mantienen su autoridad.

## 1. Separar contenido, configuración y presentación

Se propone una misma fuente de contenido para presentación, lectura y actividades, con cuatro niveles:

1. **Curso:** identidad, sesiones disponibles y configuración del fork.
2. **Sesión:** objetivos, bibliografía inicial, estaciones, conceptos y rutas de ejemplo.
3. **Estación:** pregunta de aprendizaje y secuencia explícita de subslides.
4. **Unidad explicativa:** idea, ejemplo, conceptos enlazados, precauciones y preguntas docentes cuando correspondan.

La presentación consume una subslide por vez; la lectura recorre las mismas unidades como artículo. Las actividades reutilizan conceptos y casos y mantienen su estado de respuesta separado.

Cada subslide conserva un ID estable y un papel pedagógico. Propuesta inicial: **apertura y pregunta → objeto visual → interpretación y aplicación**. El panel derecho actual aporta habitualmente la apertura. Una estación puede necesitar otro orden o más partes; ese orden se declara en contenido y se revisa pedagógicamente, sin deducirlo de su posición CSS.

La navegación debe conservar estación, subslide y ruta de ejemplo. Los enlaces actuales, como `#instancia`, deben abrir la primera subslide de la estación; los enlaces más específicos pueden identificar una subslide. Una nueva diapositiva bibliográfica usa un ID propio y evita renumerar los IDs de las siete estaciones.

Antes de ampliar S01, separar progresivamente su componente principal en contenedor de navegación, escenas y componentes compartidos. La extracción debe conservar comportamiento comprobado; después se cambia la composición.

## 2. Configuración portable para forks

El piloto ya usa el archivo versionado `config/course.config.ts`. Su migración al contrato común, con esquema validado y documentación para tutores, está definida en ADR-0002 y la implementa B03. La tabla siguiente conserva la evolución histórica del diseño:

| Eje | Campos propuestos | Comportamiento |
| --- | --- | --- |
| Interacción | `interactionMode: 'interactive' \| 'direct'` | Directo muestra inmediatamente el contenido explicativo de las tarjetas. Controles útiles como navegación y enlaces siguen disponibles. |
| Ayudas docentes | `teacherMode: boolean` | Muestra preguntas y orientaciones contextuales. Es independiente de interacción y vista. |
| Vista inicial | `defaultView: 'presentation' \| 'reading' \| 'activities'` | Elige la entrada; conserva las vistas actuales cuando tengan contenido disponible. |
| Sesiones | `enabledSessionIds: string[]` | Selecciona las sesiones incluidas en el build y su navegación. S00 y S01 son IDs distintos. |
| Rutas | `sessions[id].enabledRouteIds: string[]` | Selecciona los ejemplos de recorrido de cada sesión. |
| Ruta inicial | `sessions[id].defaultRouteId` | Debe pertenecer a las rutas habilitadas de la sesión. |

Valores iniciales propuestos: conservar el modo interactivo y la vista Presentación del prototipo; activar ayudas docentes solo cuando el tutor lo indique. La lista inicial de sesiones/rutas debe reflejar el contenido realmente disponible al migrar. S00 se incorpora cuando exista.

Reglas de resolución propuestas:

- El esquema rechaza IDs desconocidos, duplicados y una ruta inicial desactivada.
- Una sesión que requiere una ruta debe tener al menos una habilitada; el build explica cómo corregir una lista vacía. Una sesión sin rutas, como podría ser S00, no exige esa selección.
- La configuración del fork determina el contenido disponible; un parámetro de URL o una preferencia guardada no reactiva contenido deshabilitado.
- La selección de sesiones se aplica a generación de páginas, índices, navegación, enlaces inversos y rutas del prototipo. Ocultar solo el enlace del menú no cumple R13.
- Directo muestra el reverso completo en el flujo de lectura. El contenido esencial no depende de un diálogo, giro, hover ni respuesta previa. Las actividades pueden ofrecer su explicación resuelta en esta modalidad, sin registrar un intento del estudiante.
- Docente controla ayudas de presentación. No se presupone autenticación ni se usa para almacenar información privada.
- La disponibilidad cambia al reconstruir el sitio. La primera versión no necesita un panel administrativo ni un servidor.
- `BASE_PATH` y `SITE_URL` siguen atendiendo despliegue y subrutas. La guía de forks debe revisar también los valores específicos del repositorio en el workflow de Pages.

Los cambios de esquema deberán mantener coherentes `schemas/public-content.schema.json` y `src/content.config.ts` donde corresponda. La selección del tutor siempre opera sobre contenido autorizado; no cambia automáticamente `publish_ready` ni promueve paquetes internos. A03 debe completar la procedencia del contenido escrito en el repositorio.

## 3. Ejemplos, glosario y precauciones como contenido reutilizable

Proponer registros con IDs estables evita que una definición o un ejemplo se reescriban en cada tarjeta. Los nombres siguientes son contratos por diseñar:

| Registro | Información mínima propuesta |
| --- | --- |
| Ejemplo | ID, pregunta, dominio, sesión/unidad, representación, interpretación, recurso externo, afirmación respaldada, límites, procedencia y derechos de los recursos visuales. |
| Concepto | ID, término, definición breve, entrada completa, referencias y relaciones. Ampliar la colección existente; calcular las relaciones inversas. |
| Precaución | ID, distinción delicada, error frecuente, consecuencia y enlace al concepto/ejemplo pertinente. |
| Pregunta docente | ID, unidad/concepto, intención —abrir, diagnosticar o transferir—, pregunta y orientación de respuesta. |
| Recurso visual | ID, propósito, tipo —ilustración, esquema o gráfico de datos—, texto alternativo, fuente, transformación, derechos y limitación. |

Componentes compartidos propuestos: `ExampleLink`, `ConceptTerm`, `CautionBox`, `TeacherPrompt`, `DefinitionCard` y `SessionBibliography`. Primero especificar su comportamiento común y después implementarlos con los tokens existentes.

El glosario crece durante la preparación de cada sesión: detectar términos → contrastar definición y fuente → revisar → incorporarlos a la colección → enlazarlos en contexto. «Emergente» describe este crecimiento editorial; no implica generar definiciones improvisadas para el estudiante.

La selección de ejemplos sigue **exoplanetas → estrellas si hace falta**. Antes de proponer un caso estelar se registra por qué el caso exoplanetario no ilustra bien la idea. Los ejemplos de galaxias se omiten. Papers y páginas originales respaldan la explicación científica; una noticia puede servir como entrada contextual, con su alcance identificado.

## 4. Línea visual y producción de imágenes

Extender [VISUAL_SYSTEM.md](../protocols/VISUAL_SYSTEM.md), reutilizando sus tonos de datos, modelo, decisión, límite y transferencia. Las figuras deben comunicar el mismo objeto o caso a lo largo de una ruta.

Para Instancia, proponer un caso continuo: sistema exoplanetario observado → curva de luz → representación de la curva → señal de entrenamiento cuando aplique → modelo → salida. Es una propuesta ilustrativa pendiente de selección de fuente; las rutas de espectros, catálogos y seguimiento necesitan sus propias representaciones coherentes.

Cada pieza visual debe tener:

- un objeto focal y una relación principal que pueda describirse en una frase;
- composición reutilizable para figura amplia y miniatura, con espacio para etiquetas HTML/SVG;
- colores semánticos del sistema y señales adicionales de forma o texto;
- representación consistente de estrella, planeta, observación, dato, modelo y salida;
- etiquetas, unidades y ecuaciones comprobables; para precisión, se añaden mediante código;
- pie de figura que indique si es ilustración conceptual, simulación o medición.

Plantilla propuesta de encargo para la herramienta de imágenes de GPT:

> Objetivo pedagógico: [idea]. Caso: [exoplaneta; estrella si se justifica]. Objeto que debe reconocerse: [objeto]. Relación que debe verse: [relación]. Composición: [miniatura o figura amplia], un foco principal y espacio para etiquetas añadidas en la web. Aplicar los colores semánticos del sistema visual. Mantener consistencia con [recurso de referencia]. Evitar texto y cifras incrustados cuando deban ser exactos. Tipo de imagen: ilustración conceptual. Límite que acompañará la figura: [límite].

Flujo: ficha de figura → selección de fuente/caso → generación → inspección visual y científica → etiquetas/alternativa textual → registro de procedencia → integración y pruebas. Los gráficos que representan datos se producen con código reproducible. Enlazar un paper no autoriza a reutilizar sus figuras.

## 5. Skills y entregas para múltiples agentes

La skill existente `develop-mlcp-web` conserva la coordinación de contratos. Se propone añadir skills pequeñas a medida que se ejecuten los primeros paquetes; todavía **no están creadas ni instaladas**.

| Skill propuesta | Entrada y trabajo acotado | Entrega y condición de cierre |
| --- | --- | --- |
| `mlcp-session-authoring` | Paquete con procedencia y requisitos; organizar bibliografía, estaciones, subslides y preguntas. | Guion estructurado, conceptos detectados y checklist de cobertura; cada afirmación pendiente queda identificada. |
| `mlcp-example-research` | Conceptos y casos necesarios; investigar ejemplos de exoplanetas o estrellas. | Fichas de ejemplos, fuentes primarias comprobadas y límites; sin inventar evidencia ni copiar recursos sin derechos. |
| `mlcp-visual-assets` | Fichas de ejemplo y sistema visual; preparar y producir recursos con herramientas de imágenes o gráficos. | Recursos inspeccionados, texto alternativo, procedencia y manifestación explícita de su carácter ilustrativo/cuantitativo. |
| `mlcp-web-implementation` | Contratos de interacción y contenido revisados; implementar una unidad delimitada. | Componentes integrados, configuración respetada y pruebas funcionales pertinentes. Puede comenzar como flujo de la skill web actual. |
| `mlcp-quality-review` | Cambio integrado, IDs de requisitos y artefactos de prueba. | Informe de cobertura, problemas reproducibles, revisión pedagógica/visual y gates; sin autopublicación. |

Cada skill se redactará usando `skill-creator` cuando se implemente. Se propone conservar fuentes canónicas en `skills/` y distribución compatible con los mecanismos existentes; ampliar `scripts/check-skill-mirrors.mjs` si se mantienen espejos para más skills. Una skill define cómo realizar una tarea; el coordinador asigna agentes a paquetes concretos que la usan.

### Contrato de asignación

Cada paquete de trabajo contiene: objetivo, IDs Rxx, archivos de entrada, rutas que puede editar, archivos compartidos reservados, dependencias, entregables, criterios de aceptación y evidencias exigidas. El resultado distingue trabajo terminado, propuesta y bloqueo concreto.

Un agente integrador conserva la propiedad de configuración, esquemas, navegación, tokens y ensamblado de componentes. Una misma ruta de archivo tiene un escritor por ronda. Si dos tareas necesitan modificarla, primero entregan propuestas y el integrador aplica el cambio acordado; el paralelismo no depende de editar simultáneamente el componente principal de S01.

### Primera ronda de trabajo propuesta

1. **Integración:** fijar contratos de configuración, subslides e IDs; actualizar las fichas de interacción antes de programar.
2. **Trabajo independiente:** un agente prepara bibliografía/guion de S01, otro investiga ejemplos, y otro especifica composición y recursos visuales usando los casos ya confirmados. Se asignan carpetas o archivos diferentes.
3. **Implementación:** integrar el piloto Pregunta/Instancia. Las imágenes definitivas dependen de fichas de ejemplo estables; mientras tanto, el layout puede usar marcadores explícitos.
4. **Revisión:** comprobar contenido, dos modos de interacción, ayudas docentes, rutas, accesibilidad y vistas; devolver fallos reproducibles al responsable.
5. **Generalización:** extender al resto de S01 y crear S00 con instrucciones probadas en un fork de ensayo.

El coordinador puede avanzar en integración mientras los agentes investigan o preparan entregas independientes. Las solicitudes de cambio pedagógico al vault regresan mediante `outbox/`.

## 6. Guion inicial de S00

Propuesta de alcance para preparar su paquete:

1. Diapositiva bibliográfica 0: materiales introductorios y documentación realmente utilizada.
2. Propósito del curso, audiencia y conexión entre pregunta astronómica, teoría ML y aplicación.
3. Prerrequisitos conceptuales y recursos para cubrirlos.
4. Guía de navegación: sesiones, estaciones/subslides, presentación, lectura, actividades, ejemplos y glosario.
5. Cómo preparar una clase: ayudas docentes, precauciones y selección de rutas.
6. Cómo adaptar un fork: requisitos técnicos vigentes, instalación, configuración, selección progresiva de sesiones y comprobaciones locales.
7. Cómo contribuir: frontera con Obsidian, procedencia, paquetes, roles de agentes y proceso de revisión/publicación.

Cierre propuesto: un tutor logra ejecutar un fork de ensayo, seleccionar sesiones/rutas, cambiar la modalidad y recorrer una sesión bajo una subruta. S00 documentará esos pasos una vez comprobados.
