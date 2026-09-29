# Bitácora de ejecución del curso y la web

Este documento registra el recorrido de trabajo del plan de agentes: quién intervino, qué se hizo, qué se decidió, qué quedó bloqueado y qué ideas siguen abiertas.

## Cómo usarla

La bitácora acompaña al tablero y a las evidencias, con funciones distintas:

- `BOARD.md` responde cuál es el estado operativo de cada tarea.
- `evidence/<ID>.md` demuestra si una tarea cumple sus criterios de aceptación.
- Esta bitácora conserva la secuencia de trabajo, el contexto, las decisiones, las ideas y las siguientes acciones.

Cada entrada debe incluir, cuando aplique:

- **Fecha**: fecha local de la actividad.
- **Tarea o frente**: ID de la tarea o área de trabajo.
- **Responsable**: persona, agente o rol que realizó la acción.
- **Tipo**: inicio, avance, decisión, bloqueo, revisión o cierre.
- **Alcance y archivos**: qué se tocó o qué quedó reservado.
- **Resultado**: qué cambió o qué se verificó.
- **Evidencia**: enlace a informe, prueba, captura o comando relevante.
- **Ideas y decisiones**: propuestas, dudas o acuerdos que convenga conservar.
- **Siguiente acción**: paso concreto y responsable sugerido.

No se deben registrar aquí credenciales, datos privados, copias de libros, información personal ni afirmaciones científicas sin su procedencia. Las ideas abiertas no cambian por sí mismas el alcance ni el estado del `BOARD.md`.

## Estado de referencia

**Fecha de actualización:** 2026-09-08  
**Responsable de esta actualización:** Codex, agente colaborador  
**Fuente de estado:** [BOARD.md](BOARD.md)  
**Foco inmediato:** completar la documentación operativa, resolver el bloqueo ambiental de D04 y acompañar F03, que está en curso con Harvey; después continuar con `F04 → G03 → H01 → H02`.  
**Publicación:** H03 permanece no autorizada y requiere una instrucción expresa.

## Registro

### 2026-09-08 — Apertura de la bitácora

- **Tarea o frente:** coordinación del plan de ejecución.
- **Responsable:** Codex, agente colaborador.
- **Tipo:** decisión operativa.
- **Alcance y archivos:** `AGENTS.md`, `docs/planning/agent-execution/README.md` y este documento.
- **Resultado:** se estableció un espacio común para registrar responsables, avances, decisiones, ideas abiertas, bloqueos y siguientes acciones.
- **Decisión:** `BOARD.md` mantiene la autoridad del estado; las evidencias mantienen la autoridad de aceptación; esta bitácora mantiene el contexto del recorrido.
- **Siguiente acción:** añadir una entrada al comenzar y al cerrar cada frente de trabajo.

### 2026-09-08 — G02: introducción S00

- **Tarea o frente:** G02.
- **Responsable:** Codex, agente ejecutor.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** contenido interno S00, componente de recorrido, página de sesión, configuración, pruebas unitarias, E2E, accesibilidad, movimiento reducido y evidencia G02.
- **Resultado:** S00 quedó implementada como prototipo interno, con lectura sin JavaScript, navegación de cinco unidades, actividades, términos y referencias. La ruta no se promovió a contenido público.
- **Evidencia:** [evidence/G02.md](evidence/G02.md).
- **Comprobaciones registradas:** `check`, pruebas unitarias focalizadas, builds raíz y subruta, E2E específico de S00, accesibilidad y movimiento reducido. El E2E completo conserva un fallo previo de S01 relacionado con el conteo de miniaturas.
- **Decisión:** conservar la atribución bibliográfica como `Autoría no declarada` cuando la fuente disponible no declara autoría, sin completar ese dato por inferencia.
- **Siguiente acción:** revisión integradora y resolución de la discrepancia entre el estado de G02 en `BOARD.md` y el estado propuesto en su evidencia.

### 2026-09-08 — Relevo operativo del plan

- **Tarea o frente:** D04, F03 y continuidad de la ruta crítica.
- **Responsables registrados:** Codex integrador para D04; Harvey para F03; Linnaeus para F01, ya aceptada en preparación interna.
- **Tipo:** coordinación.
- **Resultado:** D04 permanece bloqueada únicamente en la distribución a espejos protegidos y en el gate estricto; F03 puede continuar con sus dependencias aceptadas; F04 todavía no debe iniciar su integración hasta disponer de sus recursos y del cierre de D04.
- **Evidencia:** [BOARD.md](BOARD.md), [evidence/D04.md](evidence/D04.md) y [evidence/F01.md](evidence/F01.md).
- **Siguiente acción:** resolver la operación de espejos de D04 en un entorno con permisos adecuados y recibir la entrega verificable de F03.

### 2026-09-08 — Ajuste de jerarquía en la presentación S01

- **Tarea o frente:** revisión visual y de navegación del piloto S01.
- **Responsable:** Codex, agente ejecutor.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `docs/specs/interactions/s01-pilot-subslides.md`, `src/components/react/SlideRail.tsx`, `src/components/react/slide-rail.css`, `src/components/react/s01/S01Navigation.tsx` y `src/components/react/s01-pilot.css`.
- **Resultado:** el modo presentación conserva sus controles, pero concentra la jerarquía en título, modo y ruta; el riel muestra un contador compacto, reduce marcas repetidas y las partes pasan a pestañas ligeras. Se conservan índices `00` y `01.1`–`07.3`, navegación por teclado y etiquetas accesibles.
- **Evidencia:** revisión visual en navegador local; `npm.cmd run check`; 95 pruebas unitarias; 39 pruebas E2E, accesibilidad y movimiento reducido; builds raíz y subruta.
- **Ideas y decisiones:** la información lateral del riel permanece disponible para tecnologías asistivas; la reducción visual no elimina controles ni contenido.
- **Bloqueos:** el proyecto mantiene avisos conocidos por colecciones públicas vacías, espejos de skills pendientes y tamaño de chunk; no bloquearon las validaciones.
- **Siguiente acción:** revisión del resultado en proyección real y ajuste adicional solo si la lectura del docente lo requiere.

### 2026-09-09 — Simplificación de la portada del curso

- **Tarea o frente:** revisión de la arquitectura visible de la web.
- **Responsable:** Codex, agente colaborador.
- **Tipo:** inicio.
- **Alcance y archivos:** portada, navegación global y pruebas asociadas; S01 queda fuera del alcance funcional.
- **Resultado:** se confirmó que la segmentación percibida proviene de la portada, que mezcla presentación institucional, mapa pedagógico, demo interactiva y estado de infraestructura.
- **Evidencia:** revisión de `src/pages/index.astro`, `src/components/SiteHeader.astro`, capturas visuales vigentes y rutas de sesiones/glosario.
- **Ideas y decisiones:** la portada se reorganizará como entrada breve al curso con alcance y dos destinos principales: Sesiones y Glosario. S01 conservará su recorrido y se abrirá desde Sesiones.
- **Bloqueos:** ninguno para la simplificación de la interfaz.
- **Siguiente acción:** aplicar la nueva jerarquía, actualizar pruebas de portada y verificar build, accesibilidad y subruta.

### 2026-09-09 — Cierre de la simplificación de la portada

- **Tarea o frente:** revisión de la arquitectura visible de la web.
- **Responsable:** Codex, agente colaborador.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/pages/index.astro`, `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`, `docs/specs/interactions/site-learning-path-explorer.md`, pruebas de sitio y movimiento reducido.
- **Resultado:** la portada presenta el propósito y las tres líneas del curso, ofrece Sesiones y Glosario como destinos principales y deja S01 dentro del índice de sesiones. El explorador anterior queda documentado como interacción futura.
- **Evidencia:** `npm.cmd run check`; `npm.cmd run test:unit` (95 pruebas); `npm.cmd run build`; `npm.cmd run build:subpath`; `npm.cmd run test:e2e` (38 pruebas); captura local de escritorio y móvil.
- **Ideas y decisiones:** se conserva `LearningPathExplorer` como componente y especificación diferida para una futura página de orientación; no participa en la portada vigente.
- **Bloqueos:** `npm.cmd run test:visual:linux` no pudo iniciar porque Docker Desktop no expone `dockerDesktopLinuxEngine`. Las baselines visuales deben regenerarse y revisarse en Linux cuando el motor vuelva a estar disponible.
- **Siguiente acción:** ejecutar el gate visual Linux y actualizar intencionalmente las capturas afectadas por la nueva portada y el menú global.

### 2026-09-09 — Transferencia literal de S00 al inbox

- **Tarea o frente:** puente Obsidian ↔ repositorio para la sesión S00.
- **Responsable:** Codex, agente colaborador.
- **Tipo:** avance.
- **Alcance y archivos:** `inbox/sessions/S00-de-los-mundos-a-los-datos/README.md`,
  `SESSION_PACKET.md`, la copia literal de la nota de Obsidian e `inbox/INDEX.md`.
- **Resultado:** se registró la versión actual de «De los mundos a los datos» como paquete de
  origen `obsidian`, con `status: drafting`, `visibility: internal`, `publish_ready: false` y
  `rights: pending`. La nota completa quedó copiada literalmente dentro del paquete; la nota
  original del vault se conservó sin modificación.
- **Evidencia:** comparación del contenido normalizado entre la fuente y la copia: 120 071
  caracteres y 1 820 líneas coincidentes; `docs/content/` no recibió cambios.
- **Ideas y decisiones:** se mantuvo separado el paquete anterior
  `S00-MLCP-introduction/`, cuyo origen es `repo` y cuyo foco es la configuración técnica del
  fork. La nueva entrega representa el contenido pedagógico de la sesión.
- **Bloqueos:** revisión de derechos de imágenes y enlaces externos, verificación editorial de
  cifras recientes y decisión de promoción pública permanecen pendientes.
- **Siguiente acción:** revisar el paquete junto con la nota fuente y preparar las fichas de
  interacción antes de promover contenido a `docs/content/`.

### 2026-09-09 — Revisión visual y de alcance de la nueva S00

- **Tarea o frente:** revisión del paquete `S00-MLCP-de-los-mundos-a-los-datos` frente al piloto
  visual S01.
- **Responsable:** Codex, agente colaborador.
- **Tipo:** revisión y decisión propuesta.
- **Alcance y archivos:** `inbox/sessions/S00-de-los-mundos-a-los-datos/SESSION_PACKET.md`, la
  copia literal de la nota S00, `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`,
  `src/components/react/s00-learning-journey.css` y el sistema `SlideRail`/estilos de S01. No se
  reservaron cambios de implementación.
- **Resultado:** el plan nuevo describe una introducción científica de diez unidades, con mundo,
  medición, datos, funciones de ML, impacto cuantificado, tres ramas y orientación técnica. La
  implementación vigente conserva cinco unidades centradas en configuración del fork, usa la
  superficie clara editorial y muestra todo el vocabulario dentro de la estación activa. La
  revisión visual confirmó que esa composición se aparta del instrumento oscuro, el carril y la
  estación acotada de S01.
- **Evidencia:** `npm.cmd run build` pasó después de repetirlo fuera del sandbox por `spawn EPERM`;
  `npm.cmd run check` pasó con 0 errores, 0 advertencias y 0 hints; la suite focalizada de S00 pasó
  4/4 pruebas. En el preview a 1280×720, la estación actual de S00 midió aproximadamente 2 895 px
  de alto y la página 4 085 px; una estación de S01 midió aproximadamente 506 px.
- **Ideas y decisiones:** tomar S01 como referencia visual de S00: superficie oscura, `SlideRail`,
  una pregunta y un objeto visual por estación, panel de foco y controles dentro del encuadre de
  presentación. La lectura completa, las referencias y el detalle técnico quedan en Lectura; las
  actividades conservan su rama propia. La orientación de fork del paquete anterior puede vivir
  como unidad técnica breve o apéndice, sin ocupar la columna vertebral científica de S00.
- **Bloqueos:** `rights: pending`, cifras y assets externos requieren revisión; el paquete sigue
  `status: drafting`, `visibility: internal` y `publish_ready: false`. Falta elegir la división
  definitiva entre estaciones y subslides antes de implementar las galerías del plan nuevo.
- **Siguiente acción:** diseñar el modelo de contenido y las fichas de interacción de S00 con esta
  jerarquía visual; después implementar el shell oscuro reutilizando `SlideRail` y validar 16:9,
  1440×900, móvil, teclado y movimiento reducido.

### 2026-09-09 — Implementación jerárquica y revisión final de S00

- **Tarea o frente:** aterrizaje visual del nuevo paquete científico `S00-de-los-mundos-a-los-datos`.
- **Responsable:** Codex, con apoyo de Faraday y Tesla.
- **Tipo:** cierre propuesto.
- **Alcance y archivos:** `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`,
  `src/components/react/s00-learning-journey.css`, `src/components/S00SessionPage.astro`,
  las pruebas de S00, `docs/specs/interactions/s00-pilot.md`, el hero raster y los plots en
  `public/images/s00/`, además de `scripts/generate-s00-plots.py`.
- **Resultado:** S00 conserva las nueve unidades científicas del paquete nuevo y las presenta
  como 42 posiciones lineales internas, con numeración visible `00`, `01.1`, `01.2`, etc. La
  primera subpantalla combina escena y foco; las siguientes dejan que cada parte ocupe la escena.
  La presentación usa el shell oscuro de S01, admite divisiones desiguales por unidad y emplea
  ilustración y gráficos rasterizados con procedencia sintética explícita.
- **Evidencia:** `npm.cmd run check` pasó con 0 errores, 0 advertencias y 0 hints; Vitest pasó
  96/96 pruebas; el build normal y `npm.cmd run build:subpath` pasaron; Playwright funcional
  pasó 5/5, accesibilidad 2/2 y movimiento reducido 1/1. La inspección manual en el preview a
  1280×720 revisó `01.1`, `01.2`, `01.3`, `05.2` y `07.2`.
- **Ideas y decisiones:** la cuestión del fork queda fuera de esta implementación y permanece
  en la documentación del repositorio. El paquete continúa en `inbox/` con `status: drafting`,
  `visibility: internal`, `publish_ready: false` y `rights: pending`; `docs/content/` no recibe
  promoción automática.
- **Bloqueos:** el gate visual Linux sigue pendiente porque Docker Desktop no expone
  `dockerDesktopLinuxEngine`; también siguen pendientes la revisión editorial de derechos y la
  promoción pública.
- **Siguiente acción:** revisión humana del paquete y de los assets; después decidir si la sesión
  pasa a contenido publicable y regenerar las baselines visuales en Linux.

### 2026-09-09 — Publicación técnica en GitHub Pages (H03)

- **Tarea o frente:** H03, publicación autorizada y verificación del sitio real.
- **Responsable:** Codex integrador.
- **Tipo:** cierre propuesto.
- **Alcance y archivos:** todo el estado local autorizado por el usuario quedó incluido en el commit
  `0e497fc`; esta ronda añade `docs/planning/agent-execution/evidence/H03.md` y actualiza `BOARD.md`.
- **Resultado:** `main` recibió el commit `0e497fc` y el workflow de GitHub Pages construyó y publicó
  el sitio bajo `/ML-CPlanetarias`. S00 quedó accesible con el enlace profundo `#pregunta/senal`,
  numeración `01.1`, `01.2`, `01.3` y el hero/plots rasterizados.
- **Evidencia:** workflow `34397202433` con build y deploy aprobados; HTTP `200` para home, S00,
  S01 habilitada, glosario y hero PNG; HTTP `404` para `/sesiones/s01/`; árbol de accesibilidad del
  enlace profundo confirma la subpantalla `01.2 · Señal`.
- **Ideas y decisiones:** la instrucción explícita habilitó commit, push y publicación en GitHub Pages.
  Netlify queda fuera del alcance. La ruta pública refleja el prototipo integrado, mientras el estado
  editorial de S00 sigue bajo revisión.
- **Bloqueos:** el gate visual Linux sigue pendiente por `dockerDesktopLinuxEngine`; derechos,
  promoción editorial y ocho espejos protegidos de skills siguen pendientes.
### 2026-09-14 — Ajuste de estaciones x.1 y unificación visual en x.2 (S00)

- **Tarea o frente:** presentación interactiva S00.
- **Responsable:** Antigravity.
- **Tipo:** inicio.
- **Alcance y archivos:** `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, pruebas de S00 y `docs/specs/interactions/s00-pilot.md`.
- **Resultado:** se inicia el ajuste conservador instruido por el usuario: eliminar el doble panel en subpantallas `x.1` para dejar 1 panel a ancho completo con el foco conceptual de la estación, unificar el desarrollo visual que estaba a la izquierda en `x.1` dentro de `x.2`, y mantener intactas las subpantallas `x.2+n` (`x.3`, `x.4`, etc.) conservando las 42 subpantallas y hashes estables.
- **Evidencia:** [implementation_plan.md](file:///C:/Users/User/.gemini/antigravity/brain/03a450ce-2fb3-4543-a147-1444bfc66787/implementation_plan.md).
- **Ideas y decisiones:** mantener el conteo de 42 slides y los hashes `#pregunta`, `#campo`, etc. para preservar la compatibilidad con enlaces profundos y pruebas.
- **Siguiente acción:** implementar el renderizado condicional en `S00LearningJourney.tsx`, ajustar CSS y enriquecer `x.2` en cada estación.

### 2026-09-14 — Cierre: unificación visual en x.2 y foco de 1 panel en x.1 (S00)

- **Tarea o frente:** presentación interactiva S00.
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `src/components/react/S00LearningJourney.test.tsx`, `tests/e2e/s00-prototype.e2e.spec.ts` y `docs/specs/interactions/s00-pilot.md`.
- **Resultado:** se corrigieron todas las subpantallas `x.1` para mostrar exclusivamente 1 panel con la información conceptual de foco a pantalla completa (`.s00-focus--standalone`), eliminando la compresión de doble panel. El desarrollo visual y componentes interactivos iniciales se unificaron en la subpantalla `x.2` de cada estación (ej. hero con tránsito en `01.2`, origen con estructura en `02.2`, curiosidad con unidad en `03.2`, tránsito con velocidad radial en `04.2`, y pregunta con medición en `09.2`). Se conservaron intactas las 42 subpantallas existentes y su numeración (`01.1`–`09.7`), hashes y enlaces sin alterar `x.2+n`.
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints.
  - `npm run test:unit`: 19 archivos y 98/98 tests unitarios pasados.
  - `npm run build` y `npm run build:subpath`: completados con 8 páginas generadas con éxito.
  - `npx playwright test tests/e2e/s00-prototype.e2e.spec.ts --project=functional-chromium`: 5/5 tests pasados.
- **Ideas y decisiones:** la separación estricta entre subpantallas conceptuales puras (`x.1`) y subpantallas visuales interactivas (`x.2` en adelante) mejora la legibilidad pedagógica sin alterar el conteo ni la estructura de navegación.
- **Siguiente acción:** revisión visual del usuario en el navegador local (`http://localhost:4321/sesiones/s00/`).

### 2026-09-14 — Rediseño directo y cajas ampliables en la diapositiva de fuentes S00

- **Tarea o frente:** presentación interactiva S00 (Diapositiva 0 · Bibliografía).
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `src/components/react/CourseContent.tsx` y `src/components/react/S00LearningJourney.test.tsx`.
- **Resultado:** se corrigió el desbordamiento de la diapositiva 0 reemplazando el bloque estático duplicado por un diseño directo y recuadros ampliables (`s00-biblio-box`). Cada caja muestra en estado compacto el título del trabajo y su frase didáctica, permitiendo ampliar individual o masivamente para inspeccionar autoría completa, metadatos y el enlace externo original con scroll interno contenido. La cabecera se simplificó a un mensaje directo con conteo y acciones en bloque.
- **Evidencia:** `npm run check` (0 errores, 0 warnings, 0 hints), 97 pruebas unitarias en Vitest con cobertura incrementada a 85.84% líneas, 7 pruebas Playwright (`functional-chromium`, `a11y` y WCAG A/AA).
### 2026-09-14 — Corrección de ReferenceError: invalidHash is not defined en S00

- **Tarea o frente:** presentación interactiva S00 (estabilidad SSR y enrutamiento por hash).
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/components/react/S00LearningJourney.tsx` y `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:** se corrigió la excepción `ReferenceError: invalidHash is not defined` durante la renderización en el servidor Vite/Astro. Se restauró la declaración `const [invalidHash, setInvalidHash] = useState(false);` en `S00LearningJourney`, sincronizando el estado ante hashes desconocidos y limpiándolo al navegar o reiniciar. Se depuró la importación no utilizada `S00ConceptCard` y se validó que tanto SSR como el hot module reloading y el cliente carguen con código HTTP 200 sin errores en consola ni terminal.
- **Evidencia:** `npm run check` (0 errores, 0 advertencias, 0 hints), 98/98 pruebas unitarias en Vitest, pruebas e2e y accesibilidad Playwright (`s00-prototype.e2e.spec.ts` y `s00.a11y.spec.ts`), y verificación HTTP 200 en servidor de desarrollo.
### 2026-09-14 — Reorganización de subpantallas 01.1, 01.2 y 01.3 en S00 con tarjetas interactivas de conceptos y observaciones reales

- **Tarea o frente:** presentación interactiva S00 (estación 1: «Mundo y preguntas»).
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico y de contenido.
- **Alcance y archivos:** `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `public/images/s00/s00-real-exoplanet.png`, `public/images/s00/s00-real-transit.png`, `public/images/s00/s00-real-representation.png`, `tests/e2e/s00-prototype.e2e.spec.ts`, `tests/motion/s00.motion.spec.ts`, `src/components/react/S00LearningJourney.test.tsx` y `src/layouts/SiteLayout.astro`.
- **Resultado:**
  - **Slide 01.1 («Mundo»):** presentación tipográfica a ancho completo (`.s00-opening-stage`), con el texto de partida de gran tamaño, pregunta rectora, idea fuerza, qué llevar y límites metodológicos, sin paneles dobles ni píldoras reducidas.
  - **Slide 01.2 («Conceptos»):** sustitución del gráfico estático por tarjetas interactivas (`Exoplaneta`, `Tránsito`, `Representación`). Cada tarjeta conmuta imágenes de observaciones astronómicas reales (imagen directa de HR 8799 vía Keck AO, curva de Kepler-90i con inmersión de 420 ppm, y representación dual global/local para CNNs de Shallue & Vanderburg 2018), especificando target, instrumento, tipo de dato, límites físicos y enlaces directos a los artículos revisados por pares (Science, AJ, ApJ).
  - **Slide 01.3 («Pregunta guía»):** reubicación de la ilustración hero de la estrella con tránsito y telescopio, acompañada de las tarjetas de pregunta rectora (*«¿Qué podemos aprender de un mundo que casi nunca podemos observar directamente?»*) y el marco epistemológico (*«mundo → medición → evidencia»*).
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints.
  - `npm run test:unit`: 19 archivos, 98/98 tests unitarios pasados.
  - `npm run build`: 8 páginas compiladas correctamente en `dist/`.
  - `npx playwright test tests/e2e/s00-prototype.e2e.spec.ts tests/a11y/s00.a11y.spec.ts tests/motion/s00.motion.spec.ts --project=functional-chromium --project=a11y --project=reduced-motion`: 8/8 tests pasados (incluyendo navegación funcional, accesibilidad WCAG 2.2 AA y movimiento reducido).
- **Ideas y decisiones:** mantener el hash `#pregunta/senal` para la diapositiva 1.2 garantiza compatibilidad con enlaces y marcadores previos, mientras su etiqueta visible «Conceptos» comunica con precisión el contenido interactivo.
- **Siguiente acción:** revisión en navegador por parte del usuario.

### 2026-09-14 — Limpieza de interfaz en S00 (eliminación de conteo técnico en riel y aviso de hash)

- **Tarea o frente:** depuración de interfaz de usuario en S00.
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/components/react/SlideRail.tsx`, `src/components/react/slide-rail.css`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `src/components/react/SlideRail.test.tsx`, `src/components/react/S00LearningJourney.test.tsx` y `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:**
  - Se eliminó la barra superior de información (`.slide-rail__caption`) en S00 pasando la propiedad `hideCaption` a `SlideRail`, suprimiendo los conteos técnicos (`5 DESTACADAS · 42 TOTALES`) y el rótulo redundante.
  - Se ocultó visualmente el resumen de apilamiento lateral (`.slide-rail__stack-summary`) en la hoja base `slide-rail.css` manteniéndolo accesible para lectores de pantalla (`sr-only`), evitando que conteos internos aparezcan visualmente en cualquier sesión.
  - Se suprimió el cartel de advertencia de hash (`s00-hash-notice`) y su estado asociado en `S00LearningJourney`, permitiendo que el recorrido resuelva la primera estación de forma silenciosa y fluida.
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints.
  - `npm run test:unit`: 19 archivos, 98/98 pruebas unitarias superadas.
  - Playwright (`functional-chromium`, `a11y`, `reduced-motion`): 8/8 pruebas superadas sin regresiones.
  - `npm run build` y `npm run build:subpath`: compilación estática completada exitosamente.
- **Siguiente acción:** comprobación visual final por parte del usuario.

### 2026-09-14 — Paridad visual entre S00 y S01: tema inmersivo oscuro, layout full-bleed y reorganización de espacios

- **Tarea o frente:** paridad visual e integración espacial de presentaciones (S00 y S01).
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico y de experiencia visual.
- **Alcance y archivos:** `src/layouts/SiteLayout.astro`, `src/styles/global.css`, `src/components/S00SessionPage.astro`, `src/components/S01SessionPage.astro`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `src/components/react/S00LearningJourney.test.tsx` y `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:**
  - **Eliminación del marco blanco**: `SiteLayout.astro` ahora soporta `theme="dark"` y `fullBleed={true}`, aplicando `body.theme-dark` y `body.layout-full-bleed`. El fondo claro de papel y la cabecera clara se sustituyeron por un fondo azul profundo nocturno integrado (`#071821` / `#0c2430`) con cabecera oscura traslúcida y tipografía de alto contraste.
  - **Ancho completo full-bleed**: `.site-shell`, `.s00-journey` y `.s01-journey` toman el 100% del ancho disponible sin bandas laterales en pantallas panorámicas.
  - **Reorganización espacial en S00**: se suprimió la división en 2 columnas comprimidas de la presentación. La apertura de la estación 1 (`01.1`) cuenta con un escenario dedicado (`.s00-opening-stage`) integrado en `.s00-scene-deck` que escala fluidamente con el viewport sin superponerse con el pie de diapositiva.
  - **Cajón de profundidad colapsable**: en las subpantallas interactivas (`01.2`, `01.3`, etc.), la visualización astronómica y la tarjeta conceptual ocupan el área principal, mientras la información de marco conceptual, qué llevar y límites queda en un cajón desplegable inferior (`.s00-scene__depth`).
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints en 94 archivos Astro y TypeScript.
  - `npm run test:unit`: 19/19 archivos, 98/98 pruebas unitarias pasadas con umbrales de cobertura cumplidos.
  - Playwright: 24/24 pruebas funcionales Chromium superadas (`s00-prototype.e2e.spec.ts` y `s01-prototype.e2e.spec.ts`).
  - Capturas de pantalla Playwright en resolución 1440x900 validando ausencia total de marco blanco y respiración del contenido.
- **Siguiente acción:** revisión interactiva por parte del usuario en el navegador local.

### 2026-09-14 — Alineación total del layout, escala y distribución de S00 con S01

- **Tarea o frente:** paridad dimensional y jerarquía visual entre S00 y S01 solicitada por el usuario.
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico y de experiencia de usuario.
- **Alcance y archivos:** `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:**
  - **Eliminación de compresión central en S00**: se suprimieron las restricciones artificiales `max-width: 68rem` y `margin-inline: auto` en `.s00-opening-stage` y `.s00-focus--standalone`. El escenario central ahora ocupa el 100% del ancho disponible alineado con el riel superior, idéntico a `.s01-focus` de S01.
  - **Jerarquía tipográfica y composición proporcional a S01**:
    - Cabecera de escena con kicker `01 · ABRIR · PREGUNTA GUÍA` y subtítulo de llegada a la izquierda.
    - Contador numérico monumental `01 / 09` en fuente monospace a la derecha (`clamp(3rem, 5vw, 4.5rem)`).
    - Título `h2` imponente con tipografía display (`clamp(2rem, 3.4vw, 3.8rem)` y `line-height: 1.05`).
    - Destacado de pregunta de partida (`clamp(1.25rem, 2vw, 1.85rem)`) con borde cian y fondo traslúcido.
    - Cuerpos de texto y notas didácticas en escala amplia (`clamp(1rem, 1.15vw, 1.15rem)`) sin reducción forzada.
  - **Eliminación de la degradación forzada en modo presentación**: se retiraron las reglas de la media query que encogían los textos a `1.2rem` y `0.78rem` en orientación horizontal y se liberó la altura forzada de `height: min(48rem, ...)` a `min-height`, permitiendo scroll y respiración natural.
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints.
  - `npm run test:unit`: 98/98 pruebas pasadas.
  - Playwright E2E: 24/24 pruebas funcionales pasadas (`s00-prototype.e2e.spec.ts` y `s01-prototype.e2e.spec.ts`).
  - Capturas comparativas de pantalla en 1440×900: `s00_opening_new.png`, `s00_station_01_2_interactive.png`, `s00_fuentes.png` y `s01_new.png`.
- **Siguiente acción:** confirmación de revisión por parte del usuario en el navegador local (`http://127.0.0.1:4321/sesiones/s00/`).

### 2026-09-14 — Corrección de vacío visual y enriquecimiento científico en Estación 02 (S00)

- **Tarea o frente:** enriquecimiento científico y corrección de diseño en Estación 02 (`s00-ciencias-planetarias`).
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `src/components/react/S00LearningJourney.test.tsx`, `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:**
  - **Estructura de datos enriquecida (`s00PlanetaryPillars`)**: se modelaron los 4 pilares científicos (Origen, Estructura, Evolución, Habitabilidad) con procesos físicos detallados, observables/misiones reales (ALMA, JWST, Kepler, TESS, ESPRESSO, Gaia, Parker Solar Probe, CHEOPS), tareas y roles concretos de Machine Learning (detección de subestructuras, emuladores de estabilidad N-cuerpos, retrievals atmosféricos acelerados, biofirmas y métricas no guiadas) y límites físicos o inferenciales.
  - **Resolución del vacío visual en la diapositiva**: el contenedor ya no filtra ni oculta los demás pilares; despliega un mapa navegable del sistema planetario con los 4 pilares simultáneamente interconectados y destaca el nodo activo (`02.1` a `02.4`). Debajo, presenta el dossier técnico completo del pilar activo con diseño visual proporcionado y tarjetas temáticas.
  - **Eliminación del texto vacío / redundante**: se reemplazó la concatenación de metadatos curriculares idénticos en el acordeón por la narrativa sustantiva real de la estación (`unit.content`), conservando los metadatos de apoyo plegados para consulta opcional.
  - **Pruebas y gates**: suite de pruebas unitarias actualizada con test específico de la estación 02; gates Astro check, build y Playwright E2E ejecutados con éxito al 100%.
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints en 94 archivos.
  - `npm run test:unit`: 19 suites pasadas, 99 pruebas pasadas (+1 prueba nueva para la estación 02).
  - `npm run build`: 8 páginas estáticas compiladas limpiamente en 2.60s.
  - `npx playwright test tests/e2e/s00-prototype.e2e.spec.ts`: 5/5 pruebas E2E pasadas.
  - Capturas de validación visual: `s00_station02_origen_full.png` y `s00_station02_estructura.png`.
- **Siguiente acción:** verificación visual directa del usuario en el navegador local (`http://localhost:4321/sesiones/s00/#ciencias-planetarias`).

### 2026-09-14 — S00: Galería de datos científicos, lightbox y conceptualización de representación

- **Tarea o frente:** S00 — Estación 01 (Subslide 01.2: Conceptos y representaciones de datos).
- **Responsable:** Antigravity.
- **Tipo:** cierre.
- **Alcance y archivos:**
  - `scripts/generate-s00-real-plots.py`: Generación de 4 gráficos científicos de alta resolución con estilo visual del curso.
  - `public/images/s00/`: Incorporación de gráficos reales (`s00-real-exoplanet.png`, `s00-real-transit.png`, `s00-real-spectrum.png`, `s00-real-representation.png`).
  - `src/lib/s00-content.ts`: Adición de metadatos de fuentes, archivo de datos, repositorios de código y nueva tarjeta "Espectro". Reescritura conceptual de "Representación" conectando señales astronómicas con tensores/vectores para ML.
  - `src/components/react/S00LearningJourney.tsx`: Componente `ImageLightbox` accesible (tecla Esc, clic exterior, trampas de foco, enlaces directos a imagen completa) y ficha técnica rediseñada con enlaces a fuentes y archivos.
  - `src/styles/s00-learning-journey.css`: Estilos para botones de zoom, enlaces a fuentes, modal lightbox con blur y soporte de `prefers-reduced-motion`.
  - `src/components/react/S00LearningJourney.test.tsx`: Pruebas unitarias ampliadas cubriendo interacciones con el lightbox y navegación entre pestañas de datos.
- **Resultado:** La galería de datos de la diapositiva 01.2 ahora presenta ejemplos reales de datos astronómicos con explicaciones pedagógicas claras sobre qué es una "representación" en Machine Learning, con visualización ampliada mediante lightbox y enlaces a los artículos y archivos de datos oficiales.
- **Evidencia:**
  - `npm.cmd run check`: 0 errores, 0 advertencias, 0 hints en 94 archivos.
  - `npm.cmd run test:unit`: 19 suites pasadas, 100 pruebas pasadas, 70.52% cobertura de ramas (superando el umbral de 70%).
  - `npm.cmd run build` & `npm.cmd run build:subpath`: Compilación estática limpia de 8 páginas en ambas configuraciones de base path.
  - `npx playwright test`: 8/8 pruebas E2E, a11y (WCAG 2.2 AA) y reduced-motion pasadas.
- **Siguiente acción:** Revisión y aprobación final del usuario.

### 2026-09-14 — Continuidad, enriquecimiento visual y formulación metodológica en Estación 03 (S00)

- **Tarea o frente:** corrección de discontinuidad secuencial, vacío visual y enriquecimiento metodológico/gráfico en Estación 03 (`s00-acotar` / `03 · formular`).
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `src/components/react/S00LearningJourney.test.tsx`, `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:**
  - **Pipeline continuo de formulación metodológica**: se sustituyó el filtrado restrictivo que rompía la secuencia (dejando pantallas vacías y etiquetas '01' erróneas) por un pipeline horizontal siempre visible en las 4 subdiapositivas (`03.1 Curiosidad` ➔ `03.2 Unidad de análisis` ➔ `03.3 Salida computable` ➔ `03.4 Criterio de uso`). Los pasos previos muestran marca de consolidación (`✓`), el paso activo tiene borde temático y pulso, y los pasos futuros permanecen accesibles e interactivos para navegación directa.
  - **Dossier enriquecido de formulación**: cada etapa incluye una definición de decisión epistemológica, el antipatrón de riesgo común al omitirla, y dos casos exoplanetarios reales en paralelo: *Detección fotométrica* (Kepler / TESS / PLATO) vs. *Caracterización espectroscópica* (JWST / Ariel / HWO).
  - **Diagramas esquemáticos SVG interactivos**: se añadieron 4 esquemas gráficos vectoriales originales en alta resolución:
    - *Curiosidad*: de la inmensidad del campo estelar al foco de alineación de tránsito y su señal detectable ($\Delta F/F_\star$).
    - *Unidad*: de la serie temporal continua de 4 años (~70,000 cadencias) al doblado en fase $P$ y discretización en vector $\mathbf{x}_i \in \mathbb{R}^{201}$.
    - *Salida*: de la inferencia $f_\theta(\mathbf{x})$ a la barra de probabilidad calibrada $P(\text{Planeta}) = 94.2\%$ o posterior bayesiano $\hat{\boldsymbol{\theta}} \pm \boldsymbol{\sigma}_\theta$.
    - *Uso*: embudo de retorno científico por hora de observación (de $10^5$ eventos crudos a 25 noches de telescopio asignadas en HARPS/ESPRESSO/JWST).
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints en 94 archivos.
  - `npm run test:unit`: 19 suites pasadas, 100 pruebas pasadas (+1 prueba nueva para la estación 03).
  - `npm run build`: 8 páginas estáticas compiladas limpiamente en 2.43s.
  - `npx playwright test tests/e2e/s00-prototype.e2e.spec.ts --project=functional-chromium`: 5/5 pruebas E2E pasadas.
  - Capturas de validación visual: `s00_station03_curiosidad_full.png` y `s00_station03_salida_full.png`.
- **Siguiente acción:** verificación visual directa del usuario en el navegador local (`http://localhost:4321/sesiones/s00/#acotar`).

### 2026-09-14 — Resolución de vacío visual, 4 modalidades observacionales conectadas y dossier astrofísico en Estación 04 (S00)

- **Tarea o frente:** corrección de subdiapositiva vacía (04.3 Espectro) y enriquecimiento astrofísico/visual en Estación 04 (`s00-medicion` / `04 · observar`).
- **Responsable:** Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:** `src/lib/s00-content.ts`, `src/lib/s00-content.test.ts`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `src/components/react/S00LearningJourney.test.tsx`, `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:**
  - **Sistema persistente de 4 modalidades observacionales**: se eliminó el filtrado que dejaba la subdiapositiva 04.3 aislada con 85% de pantalla en negro. En su lugar, las 4 subdiapositivas (`04.1 Tránsito`, `04.2 Velocidad radial`, `04.3 Espectro`, `04.4 Imagen directa`) presentan la barra de 4 técnicas conectadas con selector interactivo y una barra de síntesis física que articula cómo se combinan: $\text{Tránsito }(R_p/R_\star) + \text{V. Radial }(M_p \sin i) \implies \bar{\rho}_p \text{ (densidad media)} \implies \text{Espectro }(\mu) + \text{Imagen (separación)}$.
  - **Dossier astrofísico activo por técnica**: cada modalidad despliega su ecuación física rectora comentada, contraste explícito entre observable registrado por el detector vs. parámetro físico inferido, observatorios e instrumentos reales (Kepler/TESS, ESPRESSO/HARPS, JWST NIRSpec/MIRI, SPHERE/GPI), rol concreto de Machine Learning (redes 1D/TCEs, GPs cuasi-periódicos para variabilidad estelar, Neural Posterior Estimation para retrievals atmosféricos, PCA/autoencoders para sustracción de speckles) y advertencia de degeneración/límite físico.
  - **4 Diagramas esquemáticos vectoriales SVG originales**:
    - *Tránsito*: geometría de eclipse con cuerda de tránsito y oscurecimiento al limbo, junto a curva de luz diferencial con contactos $t_1, t_2, t_3, t_4$, profundidad $\delta = (R_p/R_\star)^2$ y duración $T_{14}$.
    - *Velocidad radial*: bamboleo reflejo respecto al baricentro y curva senoidal Doppler con regiones de corrimiento al rojo/azul, semi-amplitud $K$ y periodo $P$.
    - *Espectro*: filtrado selectivo a través del anillo atmosférico de altura de escala $h(\lambda) \propto T/(\mu g)$ y espectro de transmisión JWST con bandas moleculares de $\text{H}_2\text{O}$ ($1.4\,\mu\text{m}, 1.9\,\mu\text{m}$) y $\text{CO}_2$ ($4.3\,\mu\text{m}$) con barras de error observacionales sobre el continuo de nubes.
    - *Imagen directa*: máscara coronográfica focal y óptica adaptativa extrema con ángulo de trabajo interno (IWA $\sim 2-3\,\lambda/D$), dark hole y detección puntual del compañero a separación angular proyectada ($0.45''$, $35\text{ UA}$).
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints en 94 archivos (Prettier, ESLint, Astro check, validación de contenido, ejemplos y skills).
  - `npm run test:unit`: 19 suites pasadas, 101 pruebas pasadas (incluye nueva prueba para estación 04).
  - `npm run build`: 8 páginas estáticas compiladas limpiamente en 2.29s.
  - `npx playwright test tests/e2e/s00-prototype.e2e.spec.ts --project=functional-chromium`: 5/5 pruebas E2E pasadas.
  - Capturas de validación visual completa: `s00_station04_espectro_full.png`, `s00_station04_transito_full.png`, `s00_station04_radial_full.png`, `s00_station04_imagen_full.png`.
- **Siguiente acción:** verificación visual por parte del usuario en su navegador local (`http://localhost:4321/sesiones/s00/#medicion/espectro`).

### 2026-09-15 — Renovación integral visual y narrativa pedagógica de estaciones 05 a 09 (S00)

- **Tarea o frente:** Renovación de estaciones 05 (datos), 06 (ML), 07 (impacto), 08 (ramas) y 09 (cierre) en S00.
- **Responsable:** Agente Antigravity.
- **Tipo:** cierre técnico.
- **Alcance y archivos:**
  - `src/lib/s00-content.ts` (enriquecimiento formal de datos, DOIs, arXiv, repositorios de código, matrices de interdependencia y pasos de cierre).
  - `src/components/react/S00LearningJourney.tsx` (despliegue de esquemas SVG interactivos, miniaturas de línea transparentes, matrices de contraste, dossiers y banners de límite epistemológico).
  - `src/components/react/s00-learning-journey.css` (estilos para esquemas, miniaturas, cuadrículas de propiedades tensoriales, dossiers de impacto, nodos SVG accesibles y pipeline de cierre acumulativo).
  - `src/components/react/S00LearningJourney.test.tsx` (cobertura ampliada para las 5 estaciones renovadas).
  - `public/images/s00/miniatures/*.png` (13 miniaturas con transparencia real RGBA generadas bajo la guía visual).
- **Resultado:**
  - Se eliminó el 100% de los vacíos negros e imágenes raster problemáticas en las estaciones 05, 06, 07, 08 y 09.
  - Se implementaron 10 nuevos esquemas SVG interactivos originales (5 etapas de datos en Estación 05 y 5 verbos computables en Estación 06).
  - Se integraron 13 ilustraciones vectoriales de trazo fino (`MLCP editorial line-art v1`) con fondo transparente RGBA adaptadas al tema nocturno.
  - La narrativa pedagógica se consolidó a lo largo del eje del curso: desde el fenómeno físico y la medición (01–04), hacia las representaciones de datos (05), los espacios y objetivos de ML (06), los casos de impacto real en astronomía con enlaces a DOIs y código (07), la articulación disciplinar (08) y el cierre metodológico acumulativo con contrato epistemológico (09).
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints en todo el repositorio.
  - `npm run test:unit`: 19 suites pasadas, 106 pruebas unitarias pasadas (100%), cobertura global de ramas en 73.9% (superando el umbral de 70%).
  - `npm run build`: compilación estática limpia de las 8 páginas del sitio en 2.25s.
  - Capturas de auditoría visual en `presentation mode`: `s00_05_1_observacion.png`, `s00_05_2_catalogo.png`, `s00_06_1_detectar.png`, `s00_06_2_clasificar.png`, `s00_07_1_astronet.png`, `s00_08_1_astronomia.png`, `s00_09_1_cierre.png`, `s00_09_6_cierre.png`.
- **Siguiente acción:** Presentación de resultados y recorrido visual en `walkthrough.md` al usuario.

### 2026-09-15 — Preparación del guion docente para S00 y publicación del sitio en GitHub

- **Tarea o frente:** entrega del guion de clase oral para Sesión 0 y publicación del sitio en GitHub.
- **Responsable:** Antigravity.
- **Tipo:** cierre.
- **Alcance y archivos:** `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`, `docs/planning/agent-execution/BITACORA.md`.
- **Resultado:**
  - Se estructuró el guion de clase oral completo y secuenciado para impartir los 90 minutos de la Sesión 0 («De los mundos a los datos»), con aperturas textuales ("qué decir"), preguntas de interacción, manejo de misconcepciones y la cadena epistemológica del curso.
  - Se corrigió el mapeo de interfaces en `getS00FlashcardCollection` dentro de `src/lib/s00-content.ts` y se limpió el código de renderizado en `src/components/react/S00LearningJourney.tsx`.
  - Se superaron todas las pruebas de calidad: `npm run check` (0 errores, 0 warnings, 0 hints), 19 suites con 106 tests unitarios en Vitest (100% aprobados), `npm run build` y `npm run build:subpath`.
  - Se consolidaron los cambios en `git` y se enviaron a `origin/main` para desplegar la versión web interactiva en GitHub Pages.
- **Evidencia:** ejecución limpia de `check` y `build`, commit y push en GitHub `origin/main`.
- **Siguiente acción:** despliegue de GitHub Actions en GitHub Pages y dictado de la sesión por el docente.

### 2026-09-15 · Sistema de miniaturas conceptuales y fichas técnicas interactivas (flashcards) para S00

- **Tarea o frente:** Enriquecimiento visual e interactivo de S00 mediante miniaturas de línea editorial y fichas técnicas ampliables (flashcards).
- **Responsable:** Agente Antigravity.
- **Tipo:** avance y entrega.
- **Alcance y archivos:**
  - scripts/generate-s00-miniatures.py: generador procedural de 27 miniaturas vectoriales y conceptuales de línea editorial v1 (pilares, modalidades, ciclo de datos, verbos ML, papers de impacto y ramas curriculares).
  - public/images/s00/miniatures/: 27 activos PNG en alta resolución (1774x887, canal alfa puro, paleta institucional teal #2dd4bf, índigo #818cf8, ámbar #fbbf24, esmeralda #34d399 y coral #f87171).
  - src/lib/s00-content.ts: modelos de datos, interfaz S00Flashcard y función getS00FlashcardCollection() para colecciones pillars, modalities, datacards, verbs e impact.
  - src/components/react/S00LearningJourney.tsx: componente modal accesible S00FlashcardModal (WAI-ARIA dialog, atajos Escape/flechas, bloqueo de scroll), botones de activación y tarjetas miniaturas interactivas en estaciones 02, 04, 05, 06 y 07. Corrección de estructura <dl> para tarjetas de ramas.
  - src/components/react/s00-learning-journey.css: estilos de overlay, cuadrantes de dossier técnico, botones con miniaturas, dots de navegación y adaptabilidad móvil.
  - src/components/react/S00LearningJourney.test.tsx y tests/e2e/s00-prototype.e2e.spec.ts: pruebas unitarias y e2e con cobertura completa.
- **Resultado:**
  - 27 miniaturas conceptuales generadas y validadas visualmente sin perturbar el flujo narrativo principal.
  - El usuario puede explorar en profundidad cada concepto, técnica u observación mediante un clic o atajo de teclado, accediendo a fórmulas, observable vs inferencia, rol de ML, fuentes de datos y límites físicos.
  - Comprobaciones limpias: `npm run check` (0 errores), `npm run test:unit` (107/107 pruebas pasando, 73.17% branch coverage), `npm run build` (generación estática limpia), `npm run test:e2e` (39/39 pruebas pasando, WCAG A/AA conforme).
- **Evidencia:**
  - Pruebas unitarias: 107/107 pasando (src/components/react/S00LearningJourney.test.tsx).
  - Pruebas E2E y accesibilidad: 39/39 pasando (tests/e2e, tests/a11y, tests/motion).
  - Capturas en navegador real: public/images/s00/flashcard-modal-preview.png, public/images/s00/station-05-miniature-preview.png, public/images/s00/station-07-impact-preview.png.
- **Siguiente acción:** Revisión por el docente/usuario para valorar la experiencia interactiva en clase.

### 2026-09-15 · Corrección de renderizado matemático (KaTeX), centrado de miniaturas y navegación continua en presentación para S00

- **Tarea o frente:** Corrección visual y funcional de S00: renderizado KaTeX de fórmulas LaTeX, centrado geométrico de ilustraciones de pilares, visibilidad persistente del botón Siguiente y navegación por teclado en presentación.
- **Responsable:** Agente Antigravity.
- **Tipo:** cierre y entrega.
- **Alcance y archivos:**
  - `src/components/react/MathExpression.tsx`: nuevo componente React que renderiza fórmulas TeX usando `katex.renderToString` con soporte inline/block y `throwOnError: false`.
  - `src/components/react/S00LearningJourney.tsx`: integración de `MathExpression` en dossiers de pilares, modales de flashcards, esquemas de formulación y pasos de cierre; botones de navegación de diapositivas en la cabecera de escena y oyente de teclado (`ArrowRight`/`ArrowLeft`, `PageUp`/`PageDown`) en modo presentación con guardia de modales.
  - `src/components/react/s00-learning-journey.css`: footer en modo presentación con `position: sticky; bottom: 0; z-index: 90;` y fondo difuminado de alto contraste para visibilidad garantizada sin importar la altura del viewport; atenuación de órbitas decorativas `.s00-science-orbit` para evitar interferencia visual con tarjetas; centrado y encuadre de miniaturas en tarjetas con `.s00-pillar-miniature-card`.
  - `scripts/generate-s00-miniatures.py`: corrección de coordenadas espaciales en los 4 pilares planetarios (origen, estructura, evolución, habitabilidad) centrando todas las figuras geométricas en el lienzo `[0, 10] x [0, 5]`.
  - `public/images/s00/miniatures/*.png`: regeneración de los 27 activos PNG en alta resolución.
  - `src/lib/s00-content.ts`: saneamiento de sintaxis LaTeX (eliminación de caracteres no estándar o advertencias KaTeX como `\star`, `\hat{y}`).
- **Resultado:**
  - Todas las fórmulas matemáticas de S00 ahora se renderizan tipográficamente con KaTeX de forma nítida y accesible.
  - Las miniaturas de los pilares planetarios se visualizan perfectamente centradas en sus marcos de tarjeta interactiva.
  - Los controles de navegación («← Anterior» y «Siguiente →») quedan permanentemente visibles y accesibles en modo presentación (sticky footer + botones de cabecera de escena + atajos de teclado de flechas).
  - Verificaciones completas: `npm run check` (0 errores, 0 warnings), `npm run test:unit` (19 archivos, 107 pruebas pasadas al 100%), `npm run build` y `npm run build:subpath` exitosos, `npm run test:e2e` (39/39 pruebas superadas en Chromium, a11y WCAG A/AA y reduced-motion).
- **Evidencia:**
  - Pruebas unitarias: 107/107 superadas con cobertura de ramas al 72.71%.
  - Pruebas E2E y accesibilidad: 39/39 superadas.
  - `npm run check`: 0 errores, 0 advertencias en 96 archivos.
### 2026-09-15 · Unificación narrativa de las paradas 3 y 4 en Estación 03 y tarjetas dinámicas de análisis en S00

- **Tarea o frente:** Unificación conceptual y enriquecimiento narrativo de la Estación 03 de S00 («Formular la observación: de la intención a la señal»), consolidando las 9 estaciones en 8 y las 42 diapositivas en 38.
- **Responsable:** Agente Antigravity.
- **Tipo:** cierre y entrega técnica.
- **Alcance y archivos:**
  - `src/lib/s00-content.ts`: reestructuración de unidades (de 9 a 8), fusión de `s00-acotar` y `s00-medicion` en `s00-medicion` («03 · observar · Formular la observación»), ampliación de interfaces y tipado para `S00MeasurementModality` incorporando narrativa científica continua, intención física, unidad ML, tensor, inferencia, función de pérdida, decisión operativa y límites físicos; preservación de retrocompatibilidad de hashes (`#acotar` redirige a `#medicion/transito`).
  - `src/components/react/S00LearningJourney.tsx`: vista unificada de la Estación 03 que articula pregunta científica, caja narrativa contextual, visualizador esquemático SVG interactivo (tránsito, velocidad radial, espectroscopía, imagen directa) y selector de 4 lentes analíticas dinámicas («📡 Física & Instrumento», «🔢 Tensor & Unidad ML», «🤖 Inferencia & Salida», «🎯 Decisión & Límites») con accesibilidad WAI-ARIA estricta (`tablist`, `tab`, `tabpanel`).
  - `src/components/react/s00-learning-journey.css`: estilos de caja narrativa con borde acentuado, pestañas de lentes analíticas y tarjetas dinámicas con paletas cromáticas diferenciadas por dimensión epistemológica.
  - `src/lib/s00-content.test.ts`: actualización de pruebas de integridad de diapositivas (38 slides, 8 unidades, etiquetas y hashes retrocompatibles).
  - `src/components/react/S00LearningJourney.test.tsx`: pruebas unitarias de renderizado de modalidades, diagramas SVG, conmutación de lentes y redirección de `#acotar`.
  - `tests/e2e/s00-prototype.e2e.spec.ts`: actualización de selectores por renumeración de estaciones (06.2 Estabilidad orbital).
  - `docs/specs/interactions/s00-pilot.md`: sincronización de especificación de interacciones con el modelo de 8 estaciones y 38 diapositivas.
- **Resultado:**
  - Se eliminó el solapamiento pedagógico entre acotar y medir: la intención científica y la señal observable quedan conectadas orgánicamente en cada una de las 4 modalidades observacionales principales.
  - La navegación es más concisa, fluida y coherente, reduciendo la fricción sin perder profundidad técnica gracias a las 4 lentes interactivas.
  - Se garantiza plena accesibilidad (WCAG 2.2 AA) en todos los modos (presentación, lectura y actividades).
  - Todos los gates de calidad superados: `npm run check` (0 errores, 0 warnings, 0 hints en 96 archivos), `npm run test:unit` (19/19 archivos, 107/107 pruebas pasadas), `npm run build` y `npm run build:subpath` limpios, y `npm run test:e2e` (39/39 pruebas superadas en Chromium, a11y y reduced-motion).
- **Evidencia:**
  - Pruebas unitarias: 107/107 pruebas superadas en Vitest.
  - Pruebas E2E y accesibilidad: 39/39 pruebas superadas en Playwright.
  - Astro check y ESLint: 0 errores.
- **Siguiente acción:** Revisión y aprobación del usuario para commit y push a GitHub.

### 2026-09-29 — Publicar S02 y verificar Colab

- **Tarea o frente:** alinear la práctica de regresión con la explicación de la lámina de cierre, listar S02 y publicar el sitio con un enlace verificable a Colab.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico con acceso a Colab pendiente.
- **Alcance y archivos:** notebook y presentación S02, índice de sesiones, specs de interacción, recursos visuales y prueba E2E. Se excluyeron del commit el paquete interno de `inbox/`, los CSV/JSON locales de consulta y los cambios previos ajenos a S02.
- **Resultado:** commit `a28159d` publicado en `main`; Pages sirve el índice con S02 y la ruta `/sesiones/s02/`. La sesión permanece marcada como prototipo interno. El notebook usa una partición agrupada por `hostname`, y la lámina final presenta las métricas recalculadas con esa misma partición.
- **Evidencia:** `npm run lint`, `npm run check:astro`, los validadores de contenido, ejemplos y skills, los builds raíz y de subruta, y `tests/e2e/s02-publication.e2e.spec.ts` pasaron. La comprobación en navegador confirmó la tarjeta S02 y la ruta publicada. Colab devuelve 404 anónimo porque el repositorio es privado.
- **Decisiones:** conservar privado el repositorio completo; no exponer `inbox/` ni cambiar su visibilidad. El notebook fuente quedó sin salidas guardadas. La prueba de unidad global conserva dos fallos preexistentes de S00; el chequeo global de formato también encuentra artefactos temporales ajenos a S02.
- **Bloqueo:** el enlace de Colab requiere permiso de GitHub o un destino público para el notebook. Crear un Gist público divulgaría el código y el material docente del notebook y requiere autorización específica.
- **Siguiente acción:** solicitar autorización para publicar solo el notebook limpio como Gist público; entonces actualizar el enlace en la presentación, repetir la comprobación y publicar el cambio.

## Ideas abiertas



Estas ideas no son todavía requisitos ni cambios aprobados:

| Fecha | Propuesta | Responsable de valorar | Estado |
|---|---|---|---|
| 2026-09-08 | Mantener una entrada breve de inicio y cierre para cada tarea, con una sola siguiente acción verificable. | Integrador | Propuesta |
| 2026-09-08 | Usar la bitácora para anotar decisiones pedagógicas y editoriales que después puedan convertirse en una actualización de `CONTRACTS.md`, una tarea o una salida a `outbox/`. | Integrador y revisión editorial | Propuesta |

## Plantilla para nuevas entradas

```markdown
### AAAA-MM-DD — Título breve

- **Tarea o frente:** ID o área.
- **Responsable:** persona, agente o rol.
- **Tipo:** inicio | avance | decisión | bloqueo | revisión | cierre.
- **Alcance y archivos:** rutas o límites.
- **Resultado:** cambio o comprobación realizada.
- **Evidencia:** enlace a evidencia, prueba o salida durable.
- **Ideas y decisiones:** contexto que convenga conservar.
- **Bloqueos:** condición concreta, si existe.
- **Siguiente acción:** paso verificable y responsable sugerido.
```
