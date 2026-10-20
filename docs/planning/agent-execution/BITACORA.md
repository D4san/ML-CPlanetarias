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

**Fecha de actualización:** 2026-09-27  
**Responsable de esta actualización:** Codex, agente colaborador  
**Fuente de estado:** [BOARD.md](BOARD.md)  
**Foco inmediato:** resolver los bloqueos vigentes de D04 y F03; después continuar con `F04 → G03 → H01 → H02`.  
**Publicación:** H03 figura como entregada en `BOARD.md`; su publicación verificada no sustituye la revisión editorial de H02 ni la revisión de derechos.

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
### 2026-09-15 · Retiro de Estación 08/09 del carril oral y traslado completo al taller interactivo de Actividades en S00

- **Tarea o frente:** Retirar la estación final de cierre (`s00-cierre`) del carril de presentación oral para agilizar la exposición y reubicar toda la formalización metodológica en un taller interactivo estructurado dentro de la pestaña de Actividades.
- **Responsable:** Agente Antigravity.
- **Tipo:** cierre y entrega técnica.
- **Alcance y archivos:**
  - `src/lib/s00-content.ts`: consolidación de unidades temáticas en 7 estaciones (31 diapositivas totales en el carril: 1 bibliografía + 30 subdiapositivas); ampliación de `s00ClosureSteps` con el contrato de interfaz `S00ClosureStepChallenge` para dotar a los 7 pasos (`pregunta`, `medicion`, `dato`, `representacion`, `tarea`, `evaluacion`, `limite`) de desafíos conceptuales interactivos con 3 opciones diferenciadas y retroalimentación epistemológica inmediata; resolución de enlaces retrocompatibles `#cierre` redirigiendo a la subdiapositiva final de `#ramas`.
  - `src/components/react/S00LearningJourney.tsx`: sustitución de la lista estática anterior por el componente interactivo `S00Activities`, compuesto por un stepper horizontal de 7 pasos con indicador de progreso porcentual, renderizado matemático KaTeX de principios rectores, tarjetas de decisiones metodológicas y riesgos evitados, interfaz de desafíos con evaluación formativa instantánea, y desbloqueo condicional del Contrato Epistemológico del Curso acompañado de su ticket de salida para la Sesión 01; incorporación de botones de llamado a la acción (CTA) de transferencia hacia el taller de actividades al final de la estación de Ramas (`#ramas/aplicacion`) y al cierre de la vista de lectura lineal; activación directa del modo de actividades ante URLs con hash `#cierre`.
  - `src/components/react/s00-learning-journey.css`: estilos modulares para el taller de actividades, stepper de progreso con gradiente esmeralda-índigo, fichas de opciones de respuesta con retroalimentación cromática accesible (verde para aciertos, ámbar para precauciones), contenedor del contrato epistemológico desbloqueado, y tarjetas de llamado a la acción (CTA) responsivas en ramas y lectura.
  - `src/lib/s00-content.test.ts`: actualización de pruebas unitarias verificando la presencia de 31 diapositivas, 7 unidades temáticas y validación de desafíos en los 7 pasos metodológicos.
  - `src/components/react/S00LearningJourney.test.tsx`: adaptación de pruebas unitarias cubriendo el taller interactivo de 7 pasos, redirección de `#cierre`, conmutación entre modos conservando respuestas y activación vía CTA en `#ramas/aplicacion`.
  - `tests/e2e/s00-prototype.e2e.spec.ts`: actualización de pruebas funcionales de extremo a extremo verificando la persistencia de respuestas del taller de actividades (1 de 7 pasos) al alternar entre vistas.
  - `tests/a11y/s00.a11y.spec.ts`: ajuste de selector en la suite de accesibilidad automatizada.
  - `docs/specs/interactions/s00-pilot.md`: actualización de la especificación técnica de interacción documentando las 7 estaciones temáticas, las 31 diapositivas del carril y la mecánica del taller metodológico interactivo.
- **Resultado:**
  - El carril de presentación oral se aligeró significativamente, eliminando 7 subdiapositivas de síntesis redundantes y permitiendo al docente concentrarse en los núcleos temáticos del curso a lo largo de 7 estaciones nítidas.
  - El rigor epistemológico y la formulación matemática de la cadena de inferencia se potenciaron en la pestaña de Actividades como un taller activo donde los estudiantes resuelven decisiones conceptuales concretas y desbloquean su ticket de salida hacia la Sesión 01.
  - Se mantuvieron intactas la accesibilidad universal (WCAG 2.2 AA), la navegación fluida y la retrocompatibilidad con URLs previas.
- **Evidencia:**
  - `npm run check`: 0 errores, 0 advertencias, 0 hints en 96 archivos (Prettier, ESLint, Astro check, validación de contenido, ejemplos y skills).
  - `npm run test:unit`: 19 archivos de prueba, 107 pruebas unitarias aprobadas al 100% con 74.81% de cobertura de ramas (superando el umbral del 70%).
  - `npm run build` y `npm run build:subpath`: compilación estática limpia de todas las páginas del sitio.
  - `npm run test:e2e`: 39 pruebas de Playwright pasadas al 100% en proyectos `functional-chromium`, `a11y` y `reduced-motion`.
- **Siguiente acción:** Revisión y navegación directa por el usuario en su entorno local (`http://localhost:4321/sesiones/s00/?modo=actividades`).

### 2026-09-27 — Diagnóstico y estandarización del sistema de presentación S01/S00

- **Tarea o frente:** Comparar S01 como referencia visual con S00; identificar decisiones compartibles para tamaños, layout, navegación, tarjetas, ilustraciones y modos; ordenar el código y las instrucciones sin perder las diferencias pedagógicas de cada sesión.
- **Responsable:** Codex integrador.
- **Tipo:** inicio y cierre de primera pasada.
- **Alcance y archivos reservados:** comparación de componentes, estilos, tokens, páginas y contratos de S00/S01. Se añadieron tokens `--presentation-*`, `session-presentation.css` y `SessionPresentationFooter.tsx`; se alinearon marco, escala de texto, superficies, footer y `SlideRail`; se actualizaron `VISUAL_SYSTEM.md`, `SLIDE_RAIL.md` y `s00-pilot.md`. Se conserva el trabajo sin commit que ya estaba presente en `S00LearningJourney.tsx`, `s00-learning-journey.css`, `s00-content.ts`, sus pruebas y especificaciones. Skills consultadas en modo lectura por la reserva D04 de `BOARD.md`.
- **Resultado:** S01 queda documentada como referencia de marco y composición para Presentación; S00 comparte ese marco, escala de controles, footer modular y carril, mientras mantiene sus variantes pedagógicas y científicas. Cada sesión conserva una secuencia de cualquier longitud y una cantidad variable de partes por parada. Las cinco tarjetas visibles por defecto son una ventana configurable del carril. S00 sigue teniendo un componente raíz extenso; su división de navegación, lectura, esquemas y actividades queda para una pasada posterior, preservando el rediseño existente.
- **Evidencia:** `npm run check` completó: Prettier, ESLint, Astro (97 archivos; 0 errores, advertencias ni hints), validadores de contenido y ejemplos; el validador normal de skills pasó con ocho espejos pendientes reportados por D04. Tras extraer el footer común, `npm run build` y `npm run build:subpath` generaron 8 páginas cada uno con permiso local ampliado, después de que el sandbox inicial bloqueara esbuild (`spawn EPERM`). La verificación visual en navegador sigue pendiente porque el servidor de desarrollo tampoco alcanzó a iniciar en este entorno.
- **Ideas y decisiones:** El inventario encontró skills canónicas para desarrollo web, autoría de sesiones, búsqueda de ejemplos y activos visuales. Falta una guía de voz editorial propia para lograr prosa menos genérica; queda como propuesta porque el área de skills está reservada a D04. La unificación presente fija el lenguaje visual exterior; una revisión futura debe revisar tipografía compacta dentro de diagramas y módulos individuales.
- **Bloqueos:** revisión visual renderizada pendiente; el build requirió permiso local ampliado por el bloqueo `spawn EPERM` del sandbox. D04 conserva la reserva de skills y el validador informa espejos pendientes.
- **Siguiente acción:** con un entorno que permita iniciar Vite, revisar S00/S01 en escritorio y móvil; luego descomponer S00 en módulos de navegación, lectura, esquemas y actividades y valorar la skill de voz editorial con la persona responsable de D04.

### 2026-09-27 — Reemplazo de imágenes de referencia bibliográfica en S00

- **Tarea o frente:** Actualizar las cuatro imágenes asociadas a papers en S00 con figuras originales de los artículos y conservar la atribución y el límite de cada evidencia.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** `public/images/s00/`, `src/lib/s00-content.ts`, render de tarjetas de referencia, ficha de assets y evidencia en `docs/planning/agent-execution/`.
- **Resultado:** La revisión inicial confirmó que las cuatro imágenes actuales son reconstrucciones generadas localmente y varias usan datos sintéticos con captions que las presentan como observaciones. Se están verificando fuentes y licencias antes de sustituirlas.
- **Evidencia:** `scripts/generate-s00-real-plots.py`; `src/lib/s00-content.ts`; figuras y licencias de las fuentes enlazadas en la evidencia de cierre.
- **Ideas y decisiones:** Mantener la referencia de descubrimiento de HR 8799 separada de la procedencia de la imagen si la figura abierta usada proviene de un estudio posterior.
- **Bloqueos:** Ninguno por ahora; faltan extracción y revisión de las figuras definitivas.
- **Siguiente acción:** Adquirir las figuras autorizadas, actualizar captions y créditos visibles, registrar manifiesto de procedencia y revisar el render.

### 2026-09-27 — Cierre de figuras bibliográficas en S00

- **Tarea o frente:** Sustitución de las cuatro imágenes simuladas por figuras de los artículos citados en S00.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** `public/images/s00/papers/`, `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css`, `scripts/generate-s00-real-plots.py` y evidencia en `docs/planning/agent-execution/evidence/`.
- **Resultado:** Las tarjetas ahora muestran la Figura 1 de Boccaletti et al. (2024) para JWST/MIRI en HR 8799, el panel Kepler-90 i de la Figura 12 de Shallue y Vanderburg (2018), la Figura 2 de WASP-39 b de Nature y la Figura 3 de AstroNet. Se añadieron dimensiones, atribuciones, licencias y transformaciones junto a cada figura y en su lightbox; se corrigieron captions y datos científicos que no correspondían a los gráficos. El generador sintético anterior quedó retirado para evitar que regenere imágenes que aparenten observaciones.
- **Evidencia:** [fichas de figuras](evidence/S00-PAPER-FIGURES.md) y [manifiesto de assets](evidence/S00-PAPER-FIGURES-MANIFEST.yaml). Revisión renderizada de las cuatro tarjetas a 1440×900 y de las cuatro ampliaciones a 390×844.
- **Comprobaciones:** `npm run check` pasó con 0 errores, advertencias ni hints de Astro; siguen los avisos conocidos por colecciones públicas vacías y espejos de skills pendientes. `npm run build` generó las 8 páginas después de repetirlo con permiso local ampliado, porque el sandbox bloqueó esbuild con `spawn EPERM`. No se ejecutaron suites de pruebas.
- **Ideas y decisiones:** La referencia de descubrimiento de HR 8799 (Marois et al., 2008) permanece separada de la procedencia visual JWST/MIRI (Boccaletti et al., 2024). Se mantiene la licencia abierta como criterio para incorporar imágenes de papers a las tarjetas.
- **Siguiente acción:** revisión editorial del encuadre científico y las atribuciones por el equipo del curso; las figuras quedan listas para esa revisión.

### 2026-09-27 — Contrato de código pedagógico y educativo

- **Tarea o frente:** Definir criterios de sencillez, legibilidad y explicación para el código usado en notebooks, ejemplos y actividades de aprendizaje.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos reservados:** `docs/protocols/PEDAGOGICAL_CODE.md`, `README.md`, `AGENTS.md`, `notebooks/README.md` y esta bitácora. No se modificarán componentes de la aplicación ni los espejos de skills protegidos por D04.
- **Resultado:** Se creó el protocolo con reglas de sencillez, dependencias, supuestos, validaciones, comentarios y recorrido de aprendizaje. `AGENTS.md`, `README.md` y `notebooks/README.md` lo enlazan; la guía de notebooks también distingue la plantilla fuente en GitHub de la copia personal que cada estudiante abre en Colab.
- **Evidencia:** Relectura del protocolo y revisión de los cambios focalizados en `AGENTS.md`, `README.md`, `notebooks/README.md` y esta bitácora. No se ejecutaron suites de pruebas porque el cambio es documental.
- **Ideas y decisiones:** El contrato se aplica al código que el estudiante lee o modifica; conserva el rigor necesario para actividades de ML y evita validaciones de entradas hipotéticas. No se modificaron las skills porque D04 mantiene reservado ese frente y las carpetas de skills son de lectura en este entorno.
- **Siguiente acción:** usar el protocolo al preparar la próxima actividad de código; la versión fuente seguirá en `notebooks/` y el enlace a Colab se incorpora tras revisión.

### 2026-09-27 — Regresión visual y funcional de S00

- **Tarea o frente:** verificar el estado del sitio después de incorporar las figuras bibliográficas de S00 y los ajustes visuales relacionados.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** ejecutar validadores, pruebas unitarias, builds de raíz y subruta, Playwright funcional/accesibilidad/movimiento y comparación visual Linux. Registrar resultados aquí; no actualizar snapshots ni alterar código de prueba salvo que sea necesario para diagnosticar una regresión.
- **Resultado:** la pasada terminó; ver entrada de cierre y resumen de evidencia.
- **Evidencia:** [resumen de regresión](evidence/S00-REGRESSION-2026-09-27.md).
- **Ideas y decisiones:** preservar los cambios locales existentes de S00/S01; la pasada verifica el estado combinado actual.
- **Bloqueos:** no fue posible iniciar Docker Desktop Linux para la comparación visual oficial.
- **Siguiente acción:** revisar las dos expectativas unitarias y repetir las capturas en Linux cuando su motor esté disponible.

### 2026-09-27 — Cierre de regresión visual y funcional de S00

- **Tarea o frente:** verificación del estado combinado de S00/S01.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** suites existentes, builds raíz y `/preview`; cambios de prueba restringidos a esta bitácora y su evidencia. No se modificaron componentes ni snapshots.
- **Resultado:** `npm run check`, builds raíz/subruta, 39 pruebas E2E raíz y 39 bajo `/preview` pasan. En unitarias pasan 105/107; quedan dos expectativas sobre el texto alternativo de HR 8799 y la leyenda del SlideRail. La suite visual Linux quedó inaccesible por falta del motor Docker. En Windows, 4 snapshots pasan, 16 difieren y 2 se omiten; las diferencias deben verificarse con el runner Linux fijado antes de valorar baselines.
- **Evidencia:** [resumen de resultados y fallas](evidence/S00-REGRESSION-2026-09-27.md).
- **Ideas y decisiones:** conservar snapshots sin actualización. La comparación local de Windows no resuelve por sí sola si las diferencias visuales corresponden al producto o al entorno.
- **Bloqueos:** Docker Desktop Linux no disponible.
- **Siguiente acción:** revisar las dos fallas unitarias y ejecutar `npm run test:visual:linux` cuando el motor Linux vuelva a estar disponible.

### 2026-09-27 — Transferencia de S02 al inbox

- **Tarea o frente:** puente Obsidian ↔ repositorio para la sesión S02.
- **Responsable:** Codex, agente colaborador.
- **Tipo:** avance y transferencia.
- **Alcance y archivos:** nuevo paquete en inbox/sessions/S02-arboles-decision-random-forest/, copia completa de la nota de Obsidian, inbox/INDEX.md y esta bitácora. No se promovió material a docs/ ni notebooks/.
- **Resultado:** paquete con origen obsidian, estado drafting, visibilidad internal, publish_ready: false y derechos pendientes. Incluye teoría, ejemplos y flujo de código; Gradient Boosting queda fuera. La práctica plantea regresión del radio, compara masa con masa más irradiación y separa por sistema.
- **Evidencia:** lectura de los artefactos y verificación por hash de identidad entre nota fuente y copia. No se ejecutó el notebook ni se reportan resultados científicos.
- **Ideas y decisiones:** nombres de planeta y estrella no son predictores; hostname solo agrupa sistemas. La población, extracción y política final de límites y casos controvertidos dependen de la auditoría del catálogo.
- **Bloqueos:** revisión de derechos y decisión editorial de publicación pendientes.
- **Siguiente acción:** congelar y auditar una consulta TAP a pscomppars, resolver filtros y preparar el notebook reproducible.

### 2026-09-27 — Revisión pedagógica inicial de S02

- **Tarea o frente:** evaluar el paquete S02 frente al formato de presentación breve más notebook central en Colab.
- **Responsable:** Codex integrador.
- **Tipo:** revisión.
- **Alcance y archivos:** manifiesto, README y nota fuente en `inbox/sessions/S02-arboles-decision-random-forest/`; índice del inbox, protocolo de código pedagógico y propuesta en `outbox/2026-09-27-s02-sequence-and-tap-proposal.md`. Sin promoción a `docs/` ni creación del notebook.
- **Resultado:** S02 tiene una secuencia clara para los ejemplos de tablero y una práctica completa candidata al notebook de GitHub abierto desde Colab. La comparación masa frente a masa más irradiación conecta pregunta científica, línea base, modelos, partición por sistema, MAE e interpretación. El paquete permanece en `drafting`, `internal`, con derechos pendientes y sin resultados ejecutados.
- **Evidencia:** revisión del contenido del paquete y contraste con documentación del NASA Exoplanet Archive para `PSCompPars` y sus columnas, y documentación de scikit-learn para `GroupShuffleSplit`. Se corrigió la fila S02 para que forme parte de la tabla en `inbox/INDEX.md`.
- **Ideas y decisiones:** el orden pedagógico parte de reglas interactivas, pasa a umbrales y criterios de información, después trata sobreajuste y bootstrap/RF, presenta el catálogo y entra al Colab. El notebook podrá consultar TAP directamente; guardará el ADQL, la fecha de recuperación y los filtros porque el archivo se actualiza. Aclarar que `test_size=0.2` representa una fracción de sistemas y presentar un único split como exploración didáctica. Añadir el trazado de una predicción del árbol y el análisis por rangos de radio descritos en la secuencia. La práctica describe asociación predictiva en la población filtrada, no causalidad ni todos los planetas.
- **Bloqueos:** consulta y población sin cerrar; el notebook y la revisión de derechos aún están pendientes.
- **Siguiente acción:** acordar filtros, probar la consulta TAP y cerrar la secuencia temporal con el equipo del curso; después preparar celdas cortas y lineales para Colab y revisar la corrida completa.

### 2026-09-27 — Inicio de presentación web y notebook S02

- **Tarea o frente:** convertir S02 en una presentación web interna y un notebook tutorial ejecutable desde Colab.
- **Responsable:** Codex integrador, con apoyo de agentes para el notebook y la ficha de interacción.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** `notebooks/S02_arboles_decision_random_forest.ipynb` (agente notebook); `docs/specs/interactions/s02-rule-split.md` (agente de especificación); `src/pages/sesiones/s02.astro`, `src/components/S02SessionPage.astro` y la experiencia React S02 (integración); esta bitácora. El prototipo seguirá `noindex`, internal/drafting y fuera de `docs/content/`.
- **Resultado:** iniciado el trabajo desde la secuencia acordada: reglas y umbrales interactivos, criterio de información, sobreajuste y bootstrap/RF, explicación de PSCompPars y práctica Colab con TAP.
- **Evidencia:** solicitud explícita del usuario y revisión de las ADR, protocolos, skills, paquete S02 y patrón de presentación S00/S01.
- **Ideas y decisiones:** la copia íntegra de Obsidian conserva su identidad; los cambios de guion regresan mediante outbox. No se añade enlace Colab hasta ejecutar el notebook desde un entorno limpio.
- **Bloqueos:** población y filtros del catálogo siguen provisionales; la licencia del paquete continúa pendiente.
- **Siguiente acción:** revisar la ficha de interacción y la estructura del notebook; integrar la presentación con el patrón existente.

### 2026-09-27 — Entrega interna de prototipos S02

- **Tarea o frente:** preparar la presentación de clase y la práctica central en notebook para S02.
- **Responsable:** Codex integrador, agente de interacción y agente de notebook.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** ruta interna `/sesiones/s02/`; `src/components/S02SessionPage.astro`; componentes, contenido y estilos en `src/components/react/` y `src/lib/s02-content.ts`; ficha `docs/specs/interactions/s02-rule-split.md`; `notebooks/S02_arboles_decision_random_forest.ipynb`; actualización de propuesta en `outbox/2026-09-27-s02-sequence-and-tap-proposal.md`. Sin promoción a `docs/content/`, commit, push ni publicación.
- **Resultado:** presentación con nueve paradas, comenzando por el explorador de reglas sintéticas y siguiendo umbral, criterios de clasificación/regresión, sobreajuste, bootstrap, bagging/Random Forest, PSCompPars, actividad Colab y límites. El notebook contiene código ejecutable para las ideas sintéticas y para consultar NASA TAP, inspeccionar la población y comparar línea base, árbol y dos bosques agrupando por sistema.
- **Evidencia:** `npm run check` terminó con código 0; Prettier, ESLint, Astro (102 archivos, 0 errores/avisos/hints), validación de contenido y ejemplos pasaron. El validador de skills reportó ocho espejos pendientes conocidos. Builds de raíz y de subruta generaron nueve páginas e incluyeron `/sesiones/s02/`; el primer intento de subruta dentro del sandbox recibió `spawn EPERM`, el reintento con permiso de ejecución terminó correctamente. En el navegador local se comprobó el estilo, el avance del umbral y la aplicación de la regla: quedaron ramas de 6 puntos con mayorías opuestas. El notebook conserva JSON válido y su flujo se recorrió con 75 filas sintéticas y 10 sistemas en prueba, sin salidas guardadas.
- **Ideas y decisiones:** la extracción NASA real no se logró desde este entorno por `ConnectionRefusedError` (WinError 10061); no se informan resultados del archivo. El botón/enlace directo a Colab no se incorpora hasta ejecutar una versión sincronizada desde un entorno limpio. La página lleva `noindex`, pero la URL estática no restringe acceso; el paquete conserva estado interno y derechos pendientes.
- **Bloqueos:** queda pendiente probar la consulta TAP y el notebook en Colab con conexión real, revisar filtros y cerrar derechos/decisión editorial.
- **Siguiente acción:** ejecutar la fuente desde GitHub en un entorno limpio de Colab; si pasa, activar el enlace y solicitar revisión pedagógica/editorial antes de promover cualquier contenido.

### 2026-09-27 — Inicio de ajuste visual para S02

- **Tarea o frente:** responder a la revisión visual de la presentación web S02.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, `src/components/S02SessionPage.astro`, ficha de interacción, propuesta de `outbox/` y esta bitácora. Sin cambiar el notebook fuente salvo que haga falta sincronizar las celdas mostradas.
- **Resultado:** se aceptó el criterio de una diapositiva horizontal por vista; el material se agrupa en estaciones y subestaciones, con tablas para los parámetros y celdas con enlace de ejecución en Colab.
- **Evidencia:** comentario del usuario y captura del prototipo mostrando columna estrecha y contenido fuera de la primera vista.
- **Ideas y decisiones:** el ejemplo adjunto se usa como evidencia del problema visual; las instrucciones de rediseño vienen del texto del usuario. La práctica completa permanece en Colab.
- **Bloqueos:** el enlace de GitHub aún no contiene los cambios locales; el notebook necesita correrse en Colab para validar TAP y activar el uso con estudiantes.
- **Siguiente acción:** completar el lienzo 16:9, comprobar todas las subestaciones, el ancho de las tablas y los enlaces a Colab.

### 2026-09-27 — Cierre visual de S02

- **Tarea o frente:** incorporar la revisión del usuario a la presentación y al recorrido hacia Colab.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** ruta interna `/sesiones/s02/`; `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-rule-split.md`, `outbox/2026-09-27-s02-sequence-and-tap-proposal.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** presentación de seis estaciones y catorce subestaciones, con una diapositiva horizontal por vista. PSCompPars tiene tablas para variables, unidades, procedencia, límites e incertidumbres. La práctica separa consulta NASA, partición por sistema, configuración del bosque y comparación; incluye celdas de código visibles y tablas que explican los parámetros del split y del Random Forest. La cabecera y cada celda enlazan al notebook de Colab.
- **Evidencia:** `npm run check` pasó con 0 errores, avisos y hints de Astro; `npm run build` y `npm run build:subpath` generaron nueve páginas. La revisión visual en `/sesiones/s02/` comprobó ambas tablas de datos, las subestaciones de práctica y el código sin desplazamiento horizontal. La navegación bajo `/preview/sesiones/s02/` no la monta el servidor local de preview, que sirve el build desde la raíz; el build con `BASE_PATH=/preview` sí terminó correctamente.
- **Ideas y decisiones:** el enlace de Colab apunta al archivo esperado en GitHub `main`. El notebook permanece solo en el árbol de trabajo local, así que requiere sincronización con GitHub antes de que ese enlace lo abra. La prueba real de NASA TAP en Colab sigue pendiente; el catálogo, filtros y derechos del paquete no se consideran validados por la vista web.
- **Bloqueos:** sincronizar el notebook con GitHub y ejecutarlo desde un entorno limpio antes de usar el enlace con estudiantes.
- **Siguiente acción:** sincronizar y ejecutar el notebook en Colab; revisar la consulta y la población resultante antes de la práctica de clase.

### 2026-09-27 — Inicio de recuperación del carrusel visual de S02

- **Tarea o frente:** responder a la observación del usuario sobre la pérdida del carrusel visual al dividir S02 en diapositivas.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-rule-split.md`, `outbox/2026-09-27-s02-sequence-and-tap-proposal.md` y esta bitácora. Se conserva el contenido de cada lámina.
- **Resultado:** revisión del contrato transversal en `docs/architecture/SLIDE_RAIL.md`; se confirmó que la simplificación anterior quitó el `SlideRail` común y sus tarjetas, pilas, marcador y progresión visual.
- **Evidencia:** captura actual de `/sesiones/s02/` y lectura del contrato y del componente compartido.
- **Ideas y decisiones:** conservar las subestaciones como tarjetas navegables del carrusel, con número estación.subestación, nombre de estación, etiqueta activa y marcas de partes; usar `SlideRail` en vez de reproducir sus estilos con botones locales.
- **Bloqueos:** ninguno identificado.
- **Siguiente acción:** integrar el carril compartido y revisar el resultado visual con la secuencia S02 completa.

### 2026-09-27 — Cierre de recuperación del carrusel de S02

- **Tarea o frente:** restaurar el lenguaje visual común de la presentación S02 y corregir el código que se recortaba.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-rule-split.md`, `outbox/2026-09-27-s02-sequence-and-tap-proposal.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** `SlideRail` vuelve a mostrar cinco tarjetas visibles, las restantes apiladas en los bordes, tonos semánticos, marcador de progreso y numeración estación.subestación. S02 conserva seis estaciones y ahora tiene quince diapositivas. La tabla de variables, la tabla de procedencia y las láminas de partición y Random Forest se revisaron junto al carrusel. La configuración del bosque y su evaluación quedaron en láminas separadas para que cada celda aparezca completa.
- **Evidencia:** `npm run check` pasó; `npm run build` generó nueve páginas. En `/sesiones/s02/` se comprobó visualmente el carrusel y las láminas de variables, procedencia, configuración del bosque y MAE. El código completo y sus tablas quedan visibles sin desplazamiento interno; los botones de ejecución y el enlace general a Colab están presentes.
- **Ideas y decisiones:** mantener el carrusel como contrato transversal y representar cada subestación en una tarjeta; dividir celdas largas antes de reducir el texto.
- **Bloqueos:** el notebook sigue pendiente de sincronización con GitHub y de ejecución real en Colab; la consulta NASA/TAP aún no tiene resultado validado.
- **Siguiente acción:** revisar el notebook y sincronizarlo con GitHub antes de usar el enlace Colab con estudiantes.

### 2026-09-28 — Inicio de revisión de la apertura S02

- **Tarea o frente:** ordenar las primeras diapositivas de la sesión sobre árboles.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** `src/lib/s02-content.ts`, `src/components/react/S02LearningJourney.tsx`, nuevas escenas iniciales bajo `src/components/react/s02/`, `src/components/react/s02-learning-journey.css`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Mantener el resto de la sesión, el notebook, la frontera interna y el carrusel compartido.
- **Resultado:** secuencia prevista: diapositiva 00 de referencias; pregunta ilustrada de clasificación planetaria; exploración de umbrales; comparación interactiva de ganancia de información.
- **Evidencia:** revisión del paquete interno S02, la presentación actual, las fichas visuales/interactivas y fuentes primarias sobre radios planetarios y PSCompPars.
- **Ideas y decisiones:** presentar radio y densidad como pistas con alcance limitado; dejar explícito que `puffy` describe inflación/baja densidad en contexto y que las categorías no comparten un umbral universal. Los ejemplos de la interacción serán sintéticos.
- **Bloqueos:** ninguno identificado.
- **Siguiente acción:** actualizar la ficha de interacción antes de implementar las escenas.

### 2026-09-28 — Cierre de revisión de la apertura S02

- **Tarea o frente:** reorganizar y ajustar las primeras diapositivas para una lectura horizontal.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** `docs/specs/interactions/s02-rule-split.md`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/s02-opening.css`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts` y esta bitácora. El carrusel y las diapositivas posteriores se conservan; sin cambios al notebook, promoción, commit, push ni publicación.
- **Resultado:** apertura ordenada como `00` referencias, `01.1` pregunta de clasificación planetaria, `01.2` umbral en puntos abstractos y `01.3` comparación de Gini y entropía sobre otro ejemplo sintético. La secuencia actual continúa con código de árbol y un explorador de hiperparámetros en `01.4` y `01.5`; el carrusel tiene 19 diapositivas. La numeración principal refleja estación.subestación. Las escenas iniciales caben completas a 1280 × 720.
- **Evidencia:** inspección visual de las cuatro vistas en el navegador local a 1280 × 720; «Masa + radio» actualizó la explicación de densidad y alternar Gini/entropía recalculó las medidas. `npm run check` pasó (Astro: 0 errores, advertencias ni hints); los builds de raíz y `/preview` generaron nueve páginas. El primer build dentro del sandbox recibió `spawn EPERM`; los mismos builds terminaron con permiso local ampliado. Quedan avisos conocidos por colecciones públicas vacías y ocho espejos de skills pendientes.
- **Ideas y decisiones:** aclarar el tránsito del esquema planetario a los 12 puntos abstractos A/B y distinguir el segundo ejemplo sintético de ocho casos. Las fronteras de radio permanecen contextuales; radio, masa y densidad no se presentan como taxonomía universal.
- **Bloqueos:** la consulta NASA/TAP y la ejecución limpia en Colab siguen pendientes de validar; esta edición no produce métricas del catálogo.
- **Siguiente acción:** revisar la apertura con el equipo docente y validar el notebook desde GitHub/Colab antes de habilitar su uso en clase.

### 2026-09-28 — Completar referencias de la estación 0 de S02

- **Tarea o frente:** incorporar las fuentes base de árboles que faltaban en la bibliografía visible.
- **Responsable:** Codex integrador.
- **Tipo:** corrección de contenido.
- **Alcance y archivos:** `src/lib/s02-content.ts` y esta bitácora. Sin cambios al paquete interno, notebook, promoción, commit, push ni publicación.
- **Resultado:** añadidos Géron (2023, capítulos 6–7) y Kelleher et al. (2015, capítulo 4) a las referencias de apertura y al cierre de fuentes, con enlaces a las páginas editoriales.
- **Evidencia:** ambas obras aparecen como fuentes base en `inbox/sessions/S02-arboles-decision-random-forest/SESSION_PACKET.md` y en el apartado de trazabilidad de la nota fuente. La vista de `/sesiones/s02/` a 1280 × 720 muestra las doce referencias y el cierre completos dentro de la diapositiva. Los enlaces añadidos apuntan a O’Reilly y MIT Press.
- **Bloqueos:** ninguno.
- **Siguiente acción:** continuar la revisión docente de la apertura S02.

### 2026-09-28 — Código, hiperparámetros y regresión en S02

- **Tarea o frente:** ampliar la explicación de árboles de decisión antes de abrir la estación de ensambles.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto.
- **Alcance y archivos:** `src/lib/s02-content.ts`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/S02TreePlayground.tsx`, `src/components/react/s02/s02-opening.css`, `src/components/react/s02/s02-tree-playground.css`, `src/components/react/s02-learning-journey.css`, `src/components/S02SessionPage.astro`, `docs/specs/interactions/s02-rule-split.md`, `docs/specs/interactions/s02-tree-hyperparameter-playground.md`, `outbox/2026-09-27-s02-sequence-and-tap-proposal.md` y esta bitácora. El trabajo queda dentro de la presentación interna; no cambia el notebook ni promueve el paquete.
- **Resultado:** la apertura explica Gini y entropía como medidas de impureza y muestra `gini`, `entropy` y `log_loss` en scikit-learn. La subestación `01.4` presenta `DecisionTreeClassifier`, sus parámetros, `fit` y `predict`; `01.5` permite variar `max_depth` y `min_samples_leaf`, ver el árbol y seguir la predicción de un punto; `01.6` ilustra valores por hoja, `DecisionTreeRegressor`, pérdida cuadrática y la distinción entre ajuste y MAE. `02.1` separa la salida determinista de un árbol fijado de la sensibilidad al conjunto de entrenamiento que puede acompañar al sobreajuste, y enlaza esa variabilidad con bootstrap y Random Forest.
- **Evidencia:** lectura visual a 1280 × 720 y 390 × 844. Al aumentar `max_depth` de 1 a 2, el ejemplo pasa de 8/12 a 12/12 aciertos de entrenamiento; exigir `min_samples_leaf=3` impide las ramas hijas y devuelve 8/12. El selector cambia la ruta, la predicción y el resaltado del punto. El código cabe completo y los gráficos de criterios y regresión se leen en la lámina. Prettier sobre los archivos de S02, ESLint, Astro Check (105 archivos; 0 errores, avisos o hints), validadores de contenido y ejemplos pasaron. Los builds de raíz y `/preview` generaron nueve páginas cada uno. El `npm run check` general se detuvo en Prettier por un YAML generado bajo `.playwright-mcp`; ese archivo quedó intacto y los chequeos restantes se ejecutaron por separado. El validador reporta ocho espejos de skills pendientes.
- **Ideas y decisiones:** los doce puntos del explorador son sintéticos; el CART visual reproduce una lógica didáctica y no ejecuta scikit-learn. Los aciertos miden el entrenamiento y no estiman generalización. La determinación de una predicción con el árbol fijado no causa sobreajuste; la complejidad puede ajustarse a detalles de la muestra y cambiar cuando cambia el entrenamiento. No se presentan estos ejemplos como resultados científicos.
- **Bloqueos:** ninguno para el prototipo local. La ejecución limpia del notebook en Colab y la validación de NASA/TAP siguen pendientes antes de usar esa práctica con estudiantes.
- **Siguiente acción:** revisión docente de esta secuencia; validar el notebook desde GitHub/Colab antes del uso de la práctica.

### 2026-09-28 — Ecuaciones de las reglas, hojas y cortes en S02

- **Tarea o frente:** reforzar los puentes matemáticos entre criterios de división, código, árbol visible y regresión.
- **Responsable:** Codex integrador.
- **Tipo:** avance técnico propuesto.
- **Alcance y archivos:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02TreePlayground.tsx`, `src/components/react/s02/s02-tree-playground.css`, `src/components/react/s02-learning-journey.css`, `src/components/S02SessionPage.astro`, `docs/specs/interactions/s02-tree-hyperparameter-playground.md` y esta bitácora.
- **Resultado:** `01.4` hace explícita la regla `x_j ≤ t`; `01.5` relaciona la predicción de clase con `ĉ_R = argmax_k n_{k,R}`; `01.6` muestra la media y mediana por hoja, el SSE por región y el corte que minimiza la suma de SSE de sus hijos. El fallback textual y la ficha del explorador recogen las mismas relaciones.
- **Evidencia:** revisión visual a 1280 × 720: la regla de corte aparece junto al código completo en `01.4`; la ecuación de mayoría y las cinco líneas del clasificador caben en `01.5`; las cuatro relaciones de regresión y el MAE caben en `01.6`. Prettier, ESLint, Astro Check (105 archivos; 0 errores, avisos ni hints), validadores de contenido y ejemplos pasaron. Los builds de raíz y `/preview` generaron nueve páginas cada uno. Permanecen los avisos conocidos por colecciones públicas vacías y dos notices de metadatos auxiliares.
- **Ideas y decisiones:** se usan ecuaciones breves en notación de texto para conectarlas con las regiones y los valores dibujados en cada lámina; Gini, entropía y reducción ponderada ya se presentan en `01.3`. El explorador sigue siendo un CART sintético didáctico y no ejecuta scikit-learn.
- **Siguiente acción:** revisión docente de la progresión de ecuaciones y del nivel de formalismo antes de usar la presentación en clase.

### 2026-09-28 — Ajustar la clasificación planetaria y la ubicación de Colab en S02

- **Tarea o frente:** incorporar comentarios visuales y pedagógicos a la apertura de la estación 1.
- **Responsable:** Codex integrador.
- **Tipo:** corrección de interacción y presentación.
- **Alcance y archivos:** `src/components/react/s02/S02PlanetClassification.tsx`, `src/components/react/s02/s02-opening.css`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-rule-split.md`, `public/images/s02/planet-categories-v2.png`, evidencia de procedencia y esta bitácora. Sin edición del notebook, commit, push ni publicación.
- **Resultado:** la subestación `01.1` tiene dos etapas: conocer cuatro casos con masa, radio y densidad; después seleccionar un caso, recorrer los nodos por radio y densidad y ver su hoja resaltada. Se añadió un gigante puffy como descriptor contextual. La ilustración original generada con IA se presenta en tarjetas con marca MLCP en HTML. Se retiró el botón general de Colab de la cabecera y quedó en `05.5`, al cierre de la práctica; las celdas individuales conservan sus enlaces de ejecución.
- **Evidencia:** revisión visual a 1280 × 720 y 1085 × 856; las dos etapas caben en la diapositiva horizontal. La ruta del caso puffy resalta los nodos y ramas y termina en su hoja; las comparaciones del texto usan `≥` al tomar la rama «no». Metadatos y hash del PNG en `docs/planning/agent-execution/evidence/S02-PLANET-ILLUSTRATIONS.md`.
- **Ideas y decisiones:** los cuatro ejemplos y sus cortes son didácticos, no observaciones ni fronteras universales. Sus densidades se calculan con masa y radio; «puffy» es descriptivo. El notebook de regresión usa la misma API TAP y tabla `pscomppars`, pero una selección de columnas y filtros distinta al fragmento compartido; no se trasladó a este ejemplo ni se alteraron sus filtros.
- **Bloqueos:** el notebook no se sincronizó ni se ejecutó limpiamente desde GitHub/Colab en este cambio; sus cifras de población siguen sin validación.
- **Siguiente acción:** revisión docente de la escena y validación del notebook desde GitHub/Colab antes de habilitarlo para la actividad.

### 2026-09-28 — Simplificar el paso al árbol en S02

- **Tarea o frente:** aplicar comentarios de revisión a la escena de clasificación planetaria `01.1`.
- **Responsable:** Codex integrador.
- **Tipo:** corrección de interacción y navegación.
- **Alcance y archivos:** `src/components/react/s02/S02PlanetClassification.tsx`, `src/components/react/SessionPresentationFooter.tsx`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/s02-opening.css`, `src/components/react/s02-learning-journey.css`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Sin cambios al notebook, commit, push ni publicación.
- **Resultado:** retirada la barra de dos etapas; «Clasificar» abre el árbol con la ruta del gigante puffy resaltada. Elegir otro planeta actualiza de inmediato las ramas, la hoja y el resumen. «Puffy» queda aclarado junto a los ejemplos con una frase breve. El pie de S02 conserva únicamente «Anterior/Siguiente».
- **Evidencia:** formatos Prettier, ESLint dirigido y Astro Check pasaron; Astro Check reportó 0 errores, advertencias o hints. Inspección visual a 1280 × 720 y 1085 × 856: galería y árbol caben con el carrusel y el pie. Selección de «Gigante gaseoso» actualiza la ruta sin acción adicional; la primera entrada al árbol usa «Gigante puffy». Los builds raíz y `/preview` generaron nueve páginas cada uno. El build dentro del sandbox dio `spawn EPERM`; ambos builds finalizaron al ejecutarlos con permiso local ampliado. No se ejecutó una suite de pruebas.
- **Ideas y decisiones:** el puffy se conserva como ejemplo de baja densidad y descriptor contextual, sin sugerir una clase composicional universal; los umbrales siguen siendo didácticos.
- **Bloqueos:** ninguno para la edición local.
- **Siguiente acción:** revisión docente de esta interacción simplificada.

### 2026-09-28 — Reorganización de generalización en S02

- **Tarea o frente:** responder a los comentarios docentes sobre la subdiapositiva `02.1` de sobreajuste.
- **Responsable:** Codex integrador.
- **Tipo:** corrección editorial y visual.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02Generalization.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts` y esta bitácora. La figura será estática y explicativa; no añade controles ni cambia el notebook, la ficha de reglas o el estado de publicación.
- **Resultado:** `02.1` presenta tres tarjetas ilustradas para separar una predicción fija, el riesgo de sobreajuste y la sensibilidad a la muestra. La franja final define ensamble y muestra un árbol, varios árboles de colores y la salida conjunta.
- **Evidencia:** vista renderizada de `/sesiones/s02/` a 1085 × 912; la secuencia y el diagrama caben en la diapositiva. `npm exec prettier -- --check` pasó en los cinco archivos reservados. El servidor de desarrollo actualizó la escena y la presentó en el navegador.
- **Ideas y decisiones:** la ilustración es estática; color, etiquetas y texto transmiten juntos el significado. Random Forest se presenta con remuestras bootstrap y subconjuntos de variables considerados en cada corte. No se agregaron controles ni afirmaciones de desempeño medido.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la nueva secuencia y del nivel de detalle de Random Forest.

### 2026-09-28 — Definir árboles antes de elegir umbrales en S02

- **Tarea o frente:** incorporar comentarios docentes a la subestación `01.2` y dejar la elección del corte para `01.3`.
- **Responsable:** Codex integrador.
- **Tipo:** corrección pedagógica y visual.
- **Alcance y archivos:** `src/components/react/s02/S02ThresholdExplorer.tsx`, `src/components/react/s02/s02-threshold-explorer.css`, `src/components/react/s02-learning-journey.css`, `src/components/react/S02LearningJourney.tsx`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Sin cambios al notebook, commit, push ni publicación.
- **Resultado:** `01.2` ahora define el árbol mediante reglas binarias y muestra en paralelo los puntos y el árbol resultante. Se puede mover el umbral de `x₁` o `x₂`, aplicar la regla, seleccionar una hoja y elegir el siguiente corte; la variable opuesta se sugiere, pero permanece editable para recorrer `x₁ → x₂` o `x₂ → x₁`. `01.3` formula la elección del umbral con Gini y entropía.
- **Evidencia:** revisión visual en 1085 × 912 y 1280 × 720; el gráfico, árbol candidato, controles y navegación quedan visibles. Recorrido manual de ambos órdenes: tras `x₂` como raíz, el control ofrece dividir la rama elegida con `x₁`; tras `x₁`, la siguiente regla sugiere `x₂`. Prettier, ESLint dirigidos y el validador de contenido pasaron; quedan dos notices previos por metadatos auxiliares del inbox. Astro Check reportó 106 archivos, 0 errores, advertencias ni hints; los builds raíz y `/preview` generaron nueve páginas cada uno. No se ejecutó una suite automatizada.
- **Ideas y decisiones:** las coordenadas A/B son sintéticas, sin unidades ni interpretación planetaria. La escena explora reglas; `01.3` aborda cómo comparar los umbrales localmente mediante impureza.
- **Bloqueos:** ninguno para la edición local; Astro conserva avisos por colecciones públicas de contenido vacías.
- **Siguiente acción:** revisión docente de la definición y del paso desde probar reglas hasta comparar cortes.

### 2026-09-28 — Explicar cómo se elige el mejor corte en S02

- **Tarea o frente:** responder a comentarios docentes sobre la subdiapositiva `01.3`.
- **Responsable:** Codex integrador.
- **Tipo:** corrección pedagógica y visual.
- **Alcance y archivos:** `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/s02-opening.css`, `src/components/react/S02LearningJourney.tsx`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Se conserva el ejemplo de ocho puntos sintéticos; sin cambios al notebook, promoción, commit, push ni publicación.
- **Resultado:** la escena pregunta «¿Cómo establecemos el mejor corte?» y explica en prosa breve que cada rama debe reunir ejemplos de una misma etiqueta. La tarjeta desplegable define Gini y entropía con intuiciones narrativas y fórmulas, explica los pesos de cada hijo y distingue la ganancia de información de la reducción de Gini. El gráfico lleva `Radio (R⊕)` bajo el eje; desapareció el aviso inferior. El botón de recomendación y las métricas usan etiquetas contrastantes y cambian con el criterio.
- **Evidencia:** inspección visual del estado plegado y abierto en `/sesiones/s02/` a 1085 × 912 y 1280 × 720; las definiciones abiertas caben en el área visual y no requieren desplazamiento en la vista 16:9. Se cambió entre Gini y entropía y se movió el umbral; las medidas se recalcularon y el botón volvió a `1.5 R⊕`. Prettier, ESLint dirigido y Astro Check (106 archivos; 0 errores, advertencias ni hints) pasaron. `npm run validate:content` pasó con dos notices previos de metadatos auxiliares del inbox. Los builds de raíz y `/preview` generaron nueve páginas; ambos requieren permiso local ampliado porque el sandbox bloquea esbuild con `spawn EPERM`. Los avisos por colecciones públicas vacías siguen presentes. La consola del navegador no reportó errores.
- **Ideas y decisiones:** la ganancia de información equivale a la reducción ponderada de entropía; con Gini se informa una reducción de impureza. Cada criterio elige localmente la división que más reduce su medida. Los puntos y etiquetas siguen siendo sintéticos y didácticos.
- **Bloqueos:** ninguno para la edición local.
- **Siguiente acción:** revisión docente de la explicación y las fórmulas antes de usar la diapositiva en clase.

### 2026-09-28 — Integrar código y explorador de árboles en S02

- **Tarea o frente:** aplicar observaciones docentes a la subestación `01.3` y a las diapositivas `01.4–01.5`.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/S02TreePlayground.tsx`, `src/components/react/s02/s02-opening.css`, `src/components/react/s02/s02-tree-playground.css`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-tree-hyperparameter-playground.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** en curso; primero se evaluó la composición de ambas láminas en vista 16:9 y pantalla alta.
- **Evidencia:** capturas locales de `01.4` y `01.5` en 1280 × 720 antes de editar.
- **Ideas y decisiones:** integrar código, tabla y exploración conservando legibilidad en proyección; hacer visible el acceso a definiciones antes de los resultados de Gini y entropía.
- **Bloqueos:** ninguno.
- **Siguiente acción:** aplicar los cambios y revisar la lámina combinada y la tarjeta de definiciones en dos tamaños.

### 2026-09-28 — Aclarar los patrones que aprende cada árbol en S02

- **Tarea o frente:** incorporar nuevos comentarios docentes a la subdiapositiva `03.1`.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; corrección de prosa y diagrama.
- **Alcance y archivos reservados:** `src/lib/s02-content.ts`, `src/components/react/s02/S02BootstrapSampler.tsx`, `src/components/react/s02/s02-bootstrap-sampler.css`, `docs/specs/interactions/s02-bootstrap-resampler.md` y esta bitácora. Explicitar que remuestras distintas pueden inducir patrones distintos y redibujar los árboles como diagramas de decisión legibles. Sin cambios a las demás diapositivas ni al notebook.
- **Resultado:** la introducción explica que las remuestras pueden diferir y llevar a los árboles a aprender patrones distintos. OOB se define en una frase y se limita a los casos ausentes de la remuestra de cada árbol. Los iconos se sustituyeron por tres diagramas esquemáticos de decisión con estructuras variadas; la franja inferior agrupa los árboles antes de combinar sus predicciones.
- **Evidencia:** revisión visual de `/sesiones/s02/` a 1085 × 912. Los tres árboles, las muestras, sus casos OOB y el ensamble aparecen en el mismo flujo. «Sortear otras remuestras» actualizó las tres filas y el resumen accesible; «Reiniciar» volvió a los ejemplos iniciales. `npm exec prettier -- --check` pasó en los cinco archivos reservados.
- **Ideas y decisiones:** los diagramas son esquemas ilustrativos; la lámina no afirma que se hayan ajustado reglas reales a las tarjetas A–D. No se modificaron los sorteos ni los controles.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la explicación y los esquemas de decisión.

### 2026-09-28 — Organizar la definición visual de bootstrap y ensambles en S02

- **Tarea o frente:** responder a los comentarios docentes de la subdiapositiva `03.1`.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; revisión pedagógica, visual e interactiva.
- **Alcance y archivos reservados:** `docs/specs/interactions/s02-bootstrap-resampler.md`, `src/components/react/s02/S02BootstrapSampler.tsx`, `src/components/react/s02/s02-bootstrap-sampler.css`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts` y esta bitácora. Sin cambios al notebook ni publicación.
- **Resultado:** `03.1` define bootstrap como remuestreo con reemplazo y muestra tres secuencias reproducibles de cuatro casos. Cada secuencia conecta visualmente la remuestra con su árbol y los casos OOB de ese árbol; los tres árboles confluyen en la definición de ensamble como combinación de predicciones. Los controles vuelven a sortear y restauran el estado inicial.
- **Evidencia:** inspección visual de `/sesiones/s02/` a 1085 × 912. Se activó «Sortear otras remuestras» y el resumen accesible cambió junto con las tres filas; «Reiniciar» restauró los ejemplos iniciales. `npm exec prettier -- --check` pasó en los siete archivos reservados. No se ejecutó una suite automatizada.
- **Ideas y decisiones:** el ejemplo pequeño enseña el mecanismo, no la proporción promedio de casos únicos ni el desempeño del bosque; se retiró la cifra de 63,2 % de esta lámina. OOB se traduce como casos que no salieron en la remuestra de ese árbol.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la explicación de bootstrap y del paso visual desde cada árbol hasta el ensamble.

### 2026-09-28 — Mejorar controles y visualización de regresión en S02

- **Tarea o frente:** responder a comentarios docentes sobre la interacción de `01.4` y la explicación de regresión en `01.5`.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ajuste pedagógico, visual e interactivo.
- **Alcance y archivos reservados:** `src/components/react/s02/S02TreePlayground.tsx`, `src/components/react/s02/s02-tree-playground.css`, nuevo `src/components/react/s02/S02RegressionExplorer.tsx` y su CSS, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, fichas de interacción S02 y esta bitácora. Sin cambios al notebook, promoción de contenido, commit, push ni publicación.
- **Resultado:** en curso; revisar controles estrechos de hiperparámetros y especificar una representación más clara de las predicciones continuas por hoja.
- **Evidencia:** comentarios del usuario y vista local de `/sesiones/s02/` a 1085 × 912.
- **Ideas y decisiones:** `max_depth` y `min_samples_leaf` deben tener opciones táctiles explícitas y reflejarse enseguida en el árbol, las regiones y el resumen. La regresión usará cuatro pares sintéticos predictor/objetivo, un umbral movible entre valores candidatos y ecuaciones legibles para la predicción por media.
- **Bloqueos:** ninguno.
- **Siguiente acción:** cerrar la ficha de regresión y aplicar ambos cambios en la presentación.

### 2026-09-28 — Cierre de controles y regresión visual en S02

- **Tarea o frente:** aplicar los comentarios sobre la comodidad de `01.4` y la comprensión matemática de `01.5`.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste de interacción y explicación visual.
- **Alcance y archivos:** controles, gráfico de regresión, composición de S02, copy y fichas de interacción enumerados en la entrada de inicio anterior. Sin cambios al notebook, promoción de contenido, commit, push ni publicación.
- **Resultado:** `01.4` usa selectores táctiles de botones para `max_depth` y `min_samples_leaf`; cambian enseguida el código, la tabla, las regiones, el árbol, los aciertos y la ruta de un punto. `01.5` muestra los cuatro datos sintéticos, los grupos a ambos lados de un corte, una función escalonada, la ruta `entrada → hoja → predicción` y el cálculo numérico de la media. La notación TeX se renderiza como matemática; la comparación SSE y la mediana quedan en una sección desplegable.
- **Evidencia:** revisión manual del navegador local a 1085 × 912. En `01.4`, `max_depth=2` cambió el árbol de 3 a 7 nodos y los aciertos de 8/12 a 12/12; `min_samples_leaf=3` volvió a 3 nodos y 8/12; «Reiniciar» restauró `1` y `1`. En `01.5`, los cortes `1,5`, `2,5` y `3,5` actualizaron ruta, medias, gráfico y SSE; «Reiniciar» volvió a `2,5`. Las fórmulas renderizadas se inspeccionaron también desplegadas. No se ejecutaron suites automatizadas ni se revisó una ventana móvil.
- **Ideas y decisiones:** la visualización explica una salida numérica que puede contener decimales, constante en cada región y diferente al cruzar un umbral. Los cuatro pares son sintéticos y no representan observaciones planetarias. La ficha de regresión permanece en estado `draft`.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de las explicaciones y, si la sesión se proyecta en otro tamaño, una pasada visual en ese formato.

### 2026-09-28 — Explicar con claridad el sorteo bootstrap en S02

- **Tarea o frente:** resolver el comentario de comprensión sobre devolver la tarjeta al conjunto en `03.1`.
- **Responsable:** Codex integrador.
- **Tipo:** corrección de comprensión; simplificación pedagógica.
- **Alcance y archivos reservados:** introducción bootstrap en `src/lib/s02-content.ts`, rótulo OOB en `src/components/react/s02/S02BootstrapSampler.tsx`, ficha `docs/specs/interactions/s02-bootstrap-resampler.md` y esta bitácora. Explicar la devolución de la tarjeta antes del siguiente sorteo con palabras cotidianas. Sin cambios al sorteo interactivo ni a las demás láminas.
- **Resultado:** la introducción define bootstrap como remuestreo con reemplazo y explica la devolución antes del siguiente sorteo. El ejemplo de cuatro casos aclara que cada árbol recibe cuatro sorteos; la muestra distinta permite aprender patrones diferentes. OOB queda descrito como los casos que no salieron para ese árbol.
- **Evidencia:** revisión visual de `/sesiones/s02/` en navegador a 1085 × 912; el texto se lee en tres líneas y la explicación de OOB queda visible sobre las filas. `npm exec prettier -- --check` pasó en los cuatro archivos reservados.
- **Ideas y decisiones:** nombrar la acción concreta —sacar y devolver una tarjeta antes del siguiente sorteo— y conectar la muestra distinta con patrones que pueden diferir entre árboles.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la explicación bootstrap y de los casos OOB por árbol.

### 2026-09-28 — Revisar tipografía y fórmulas de S02

- **Tarea o frente:** legibilidad de las subdiapositivas `01.3`, `01.4` y `01.5`.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; revisión visual y corrección tipográfica.
- **Alcance y archivos reservados:** `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/S02TreePlayground.tsx`, `src/components/react/s02-learning-journey.css`, `src/components/react/s02/s02-opening.css`, `src/components/react/S02LearningJourney.tsx`, `src/lib/s02-content.ts` y esta bitácora. Sin publicación.
- **Resultado:** se corrigió el escape TeX de las expresiones de Gini, entropía y reducciones ponderadas; las ecuaciones de regresión usan subíndices, sumatorias y exponentes tipográficos. El texto de código, tabla y controles de `01.4` se amplió y la composición compacta se ajustó para mantener visibles el árbol y el mapa.
- **Evidencia:** revisión manual de `/sesiones/s02/` a 1280 × 720. Se verificaron visualmente Gini, entropía, ganancia de información, reducción de Gini, predicción media por hoja, SSE y mediana para `absolute_error`; no aparecen comandos TeX crudos. El código y tabla de `01.4` se leen en la composición; al cambiar `max_depth` y `min_samples_leaf` se actualizaron mapa, árbol y resumen, y `Reiniciar` restauró los valores iniciales. Prettier pasó y `npm run check:astro` reportó 0 errores y ningún diagnóstico de advertencia o sugerencia; la sincronización avisó que las tres colecciones de contenido están vacías. No se ejecutaron suites de pruebas ni se validó móvil.
- **Ideas y decisiones:** la tarjeta de ecuaciones y el panel de regresión son desplazables cuando el alto disponible es reducido. Los rótulos internos de los SVG permanecen compactos para caber junto al ejemplo; revisar su lectura en proyección real.
- **Bloqueos:** ninguno.
- **Siguiente acción:** continuar la edición de S02 a partir de la siguiente observación docente.

### 2026-09-28 — Integrar 01.4 y destacar definiciones en S02

- **Tarea o frente:** atender los comentarios sobre la integración de las subestaciones 01.4–01.5 y la tarjeta de Gini y entropía en 01.3.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste visual y pedagógico.
- **Alcance y archivos:** `src/lib/s02-content.ts`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02TreePlayground.tsx`, `src/components/react/s02-learning-journey.css`, `src/components/react/s02/s02-opening.css`, `docs/specs/interactions/s02-tree-hyperparameter-playground.md` y esta bitácora. Sin publicación.
- **Resultado:** se integraron en 01.4 el código de `DecisionTreeClassifier`, la tabla de parámetros y el explorador interactivo del árbol. `max_depth` y `min_samples_leaf` actualizan el código, la tabla y el árbol; `Reiniciar` restaura sus valores iniciales. En 01.3 la tarjeta de Gini y entropía ahora aparece arriba del comparador con un control más visible; al abrirla, muestra definiciones narrativas, fórmulas y la ponderación de las ramas.
- **Evidencia:** revisión visual manual en `/sesiones/s02/` a 1280 × 720 y 1085 × 912. En 01.4 se ven simultáneamente código, tabla, controles, mapa, árbol y recorrido de un ejemplo; el estado accesible confirma los valores iniciales del modelo. En 01.3 se verificó la apertura de la tarjeta y la lectura de las ecuaciones en su panel desplazable. Los chequeos dirigidos de formato, ESLint, Astro y contenido pasaron; no se ejecutaron suites de pruebas.
- **Ideas y decisiones:** mantener código y parámetro en la misma lámina para conectar ajuste con resultado visible. La tarjeta expandida conserva desplazamiento interno para mostrar las definiciones y ecuaciones en proyección.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la nueva composición antes de promover el material.

### 2026-09-28 — Inicio: tarjetas centrales para conceptos de 01.3

- **Tarea o frente:** hacer clicables «ganancia de información» e «impureza» y mostrar sus definiciones en una tarjeta centrada.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ajuste de interacción educativa.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/s02-opening.css`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Sin cambios al explorador numérico ni publicación.
- **Resultado:** «ganancia de información» e «impureza» abren diálogos centrales separados. Cada tarjeta explica el concepto y presenta sus expresiones; la de impureza incluye Gini y entropía. Se ajustó el tamaño en línea de los botones para mantener el espaciado normal del párrafo.
- **Evidencia:** ambas tarjetas se revisaron en el navegador a 1085 × 912; `Escape` cierra el diálogo y devuelve el foco al término activado. La ficha de interacción registra apertura, cierre, foco y adaptación a pantallas estrechas. Prettier, ESLint y `check:astro` pasaron. Astro reporta las tres colecciones vacías existentes (`sessions`, `concepts`, `exercises`); el diagnóstico final tiene 0 errores, warnings o hints. No se ejecutaron suites de pruebas.
- **Decisión:** dejar la definición breve en la explicación de 01.3 y abrir el detalle matemático únicamente al activar cada concepto.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la tarjeta en la proyección prevista.

### 2026-09-28 — Inicio: notación matemática común para S02

- **Tarea o frente:** mejorar la legibilidad de las ecuaciones de 01.3 y unificar el render matemático en las estaciones de S02 que presentan fórmulas.
- **Responsable:** Codex integrador.
- **Tipo:** ajuste visual y cierre técnico propuesto.
- **Alcance y archivos reservados:** nuevo `src/components/react/s02/S02Math.tsx`; `src/components/react/S02LearningJourney.tsx`; componentes de clasificación planetaria, ganancia de información y regresión; hojas de estilo S02; ficha `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Mantener el render aislado de S00/S01.
- **Resultado:** se añadió el componente reutilizable `S02Math` sobre KaTeX y se aplicó una composición común a la densidad de `01.1`, la regla de `01.2`, las definiciones y comparaciones de `01.3`, las ecuaciones de regresión de `01.5` y la varianza del ensamble en `03.2`. En `01.3`, Gini y entropía ocupan tarjetas paralelas; las dos fórmulas de reducción quedan agrupadas bajo su explicación. Se ocultaron barras de desplazamiento vertical accidentales dentro de las ecuaciones y se mantuvo desplazamiento horizontal para expresiones largas.
- **Evidencia:** revisión manual en `/sesiones/s02/` a 1085 × 912: se comprobaron las fórmulas renderizadas en `01.1`, `01.2`, `01.3`, `01.5` y `03.2`, además del diálogo centrado de impureza. ESLint dirigido, Prettier y Astro Check (109 archivos; 0 errores, advertencias ni hints) pasaron. Los builds raíz y `/preview` generaron nueve páginas cada uno; el sandbox bloqueó inicialmente esbuild con `spawn EPERM` y ambos builds pasaron al repetir con permiso local ampliado. Siguen los avisos previos de colecciones de contenido vacías. No se ejecutaron suites de pruebas; la revisión visual se hizo en pantalla de escritorio.
- **Ideas y decisiones:** reservar el render TeX para expresiones matemáticas explicativas y conservar como texto las reglas visibles de los diagramas, valores calculados y fragmentos de código. En la vista estrecha, las tarjetas matemáticas se apilan y las expresiones largas mantienen desplazamiento horizontal.
- **Bloqueos:** no se contó con una vista de navegador estrecha para comprobar visualmente el punto de quiebre móvil.
- **Siguiente acción:** revisión docente de la escala de las ecuaciones en proyección y verificación visual en móvil cuando esté disponible el viewport correspondiente.

### 2026-09-28 — Separar las definiciones de 01.3 en un slider

- **Tarea o frente:** resolver el recorte de las definiciones y fórmulas al abrir la sección de 01.3.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste de interacción y composición.
- **Alcance y archivos reservados:** `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/s02-opening.css`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Separar las definiciones y la comparación del corte en tres pasos; mantener acceso por teclado y una lectura completa sin JavaScript.
- **Resultado:** la sección de definiciones ahora recorre tres pasos —Gini, entropía y comparación del corte— con un control deslizante, botones anterior/siguiente y progreso visible. Cada paso cabe en el panel; sin JavaScript, las tres explicaciones permanecen disponibles en un bloque desplazable.
- **Evidencia:** revisión visual de `/sesiones/s02/` en navegador a 1610 × 912. Se inspeccionaron los tres pasos; el slider y las fórmulas se ven completos, y las flechas del teclado cambian de paso. Prettier pasó en los cuatro archivos reservados; ESLint dirigido pasó para `S02InformationGain.tsx`; Astro Check cubrió 109 archivos con 0 errores, advertencias o hints. Se mantienen los avisos previos de colecciones de contenido vacías; no se ejecutaron suites automatizadas.
- **Ideas y decisiones:** dedicar un paso a cada medida y otro a comparar el corte; mantener visibles el control deslizante, el progreso y la navegación anterior/siguiente. El HTML conserva una explicación completa si la isla no se hidrata.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la lectura y densidad de los tres pasos antes de usar la diapositiva en clase.

### 2026-09-28 — Avanzar revisión visual del resto de S02

- **Tarea o frente:** revisar tamaño de letra, render matemático y composición del resto de las 18 diapositivas de S02.
- **Responsable:** Codex integrador.
- **Tipo:** avance; inspección y corrección tipográfica y de composición.
- **Alcance y archivos reservados:** `src/components/react/s02-learning-journey.css`, `src/components/react/s02/s02-opening.css`, `src/components/react/s02/S02ThresholdExplorer.tsx`, `src/components/react/s02/s02-bootstrap-sampler.css`, `src/components/react/s02/S02ForestExplainer.tsx`, `src/components/react/s02/s02-forest-explainer.css`, `src/components/react/s02/S02ExoplanetPredictionActivity.tsx`, `src/components/react/s02/s02-exoplanet-activity.css` y esta bitácora. Mejorar lectura y encaje, manteniendo el contenido científico y las interacciones.
- **Resultado:** el recorrido de las 18 diapositivas identificó etiquetas pequeñas en `01.1`/`01.2`, tarjetas montadas en `02.1`, una fila cortada en `03.1`, solapamientos de texto y diagramas en `03.2` y contenido inferior ajustado en `04.1`. Se corrigieron visualmente `01.1`, `01.2`, `02.1`, `03.1` y `03.2`; `04.1` recibió una composición compacta y una edición breve de texto para ganar espacio, a la espera de revisión visual posterior.
- **Evidencia:** revisión posterior en navegador de `01.1`, `01.2`, `02.1`, `03.1` y `03.2` a 1280 × 720: etiquetas, diagramas y tarjetas caben sin montarse. Se comprobó el render de la densidad, Gini, entropía, ganancia de información, media y SSE; sus expresiones se ven correctamente. Astro Check: 112 archivos, 0 errores, advertencias o hints. Prettier pasó en los ocho componentes/estilos editados y esta bitácora. No se ejecutaron suites. La comprobación visual posterior de `04.1` quedó impedida porque Astro no inicia: el runtime instalado no encuentra `piccolore`, dependencia declarada por Astro en el lockfile; la recuperación offline no resolvió el módulo.
- **Ideas y decisiones:** preservar tamaños legibles en proyección y dar espacio propio a texto, controles y diagramas. Mantener las fórmulas explicativas en TeX y las reglas operativas de los diagramas como texto.
- **Bloqueos:** queda pendiente validar en navegador la composición compacta de `04.1`; el servidor local requiere recuperar `piccolore` en `node_modules`.
- **Siguiente acción:** restaurar la dependencia local y revisar `04.1` a 1280 × 720; inspeccionar entonces las demás láminas no editadas en la misma pasada posterior.

### 2026-09-28 — Inicio: explicar visualmente Random Forest en S02

- **Tarea o frente:** S02, diapositiva 03.2.
- **Responsable:** Codex.
- **Tipo:** inicio.
- **Alcance y archivos:** los componentes y estilos de la diapositiva 03.2 en `src/components/react/`, el texto en `src/lib/s02-content.ts` y esta bitácora. Sustituir la fórmula de varianza por tres ilustraciones que expliquen remuestreo, selección aleatoria de predictores y combinación de predicciones.
- **Resultado:** pendiente.
- **Evidencia:** se revisará la diapositiva 03.2 en el navegador local.
- **Ideas y decisiones:** explicar con lenguaje común cuánto puede cambiar una predicción entre entrenamientos y cómo promediar árboles diversos suaviza esos cambios; conservar la secuencia visual y el sistema de S02.
- **Bloqueos:** ninguno.
- **Siguiente acción:** implementar las tres ilustraciones y verificar su lectura en la composición de presentación.

### 2026-09-28 — Cierre: explicar visualmente Random Forest en S02

- **Tarea o frente:** S02, diapositiva 03.2.
- **Responsable:** Codex.
- **Tipo:** cierre; ajuste pedagógico y visual.
- **Alcance y archivos:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02ForestExplainer.tsx`, `src/components/react/s02/s02-forest-explainer.css`, `src/lib/s02-content.ts` y esta bitácora.
- **Resultado:** la lámina presenta tres ilustraciones propias: remuestras bootstrap para distintos árboles, predictores candidatos en cada corte y combinación de tres predicciones. La tercera explica varianza en palabras y distingue promedio para regresión de mayoría de votos para clasificación.
- **Evidencia:** inspección visual de 03.2 en `http://127.0.0.1:4321/sesiones/s02/` a 1257 × 912; Prettier y ESLint dirigidos pasaron; `npm run check:astro` informó 0 errores, advertencias ni sugerencias en 111 archivos; `npm run build` generó las 9 páginas. El build conserva avisos existentes por colecciones de contenido vacías. No se ejecutaron suites de pruebas.
- **Ideas y decisiones:** los valores 2.1, 2.7, 3.0 y 2.6 son un ejemplo ilustrativo de regresión, identificado como tal en la figura. La explicación de varianza enfatiza cuánto cambia una predicción entre entrenamientos y cuándo el promedio puede suavizar esos cambios.
- **Bloqueos:** ninguno.
- **Siguiente acción:** revisión docente de la lectura de la lámina en proyección de aula.

### 2026-09-28 — Replantear 04.1 como actividad con datos de NASA

- **Tarea o frente:** S02, estación 4 · subestación 1; abrir la actividad con una pregunta sobre una base de datos de exoplanetas y explicar la tabla de NASA Exoplanet Archive.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ajuste pedagógico e interactivo.
- **Alcance y archivos reservados:** `src/lib/s02-content.ts`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, nueva ficha `docs/specs/interactions/s02-exoplanet-prediction-question.md` y esta bitácora. Sin descargar datos, informar métricas ni promover contenido a `docs/content/`.
- **Resultado:** 04.1 se titula «Actividad: ¿qué datos usarías para estimar el radio?». Presenta una fila esquemática de PSCompPars, el flujo predictores → modelo → radio objetivo, una selección interactiva entre masa y masa + irradiación, una hipótesis sobre el MAE y una advertencia sobre radios calculados desde la masa. Añade enlaces oficiales a la tabla, las definiciones, los cálculos y TAP; no presenta métricas ni datos descargados.
- **Evidencia:** revisión visual manual de `/sesiones/s02/` a 1257 × 912. El estado A muestra `pl_bmasse → pl_rade`; el estado B añade `pl_insol`, actualiza `aria-pressed` y el resumen, y mantiene el diagrama dentro del panel. `Space` alterna A/B por teclado. Se comprobó la legibilidad de la fila, la nota de procedencia y los enlaces. Prettier quedó aplicado al componente nuevo; no se ejecutaron suites de pruebas. La vista móvil queda pendiente.
- **Ideas y decisiones:** `pl_name` identifica, `hostname` agrupa los planetas por sistema al separar entrenamiento y prueba, `pl_bmasse` guarda la mejor estimación disponible, `pl_insol` expresa el flujo recibido respecto a la Tierra y `pl_rade` es el objetivo. La diapositiva 04.2 audita referencias y mediciones derivadas antes del ajuste.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente; la ficha de interacción conserva `status: draft`.
- **Siguiente acción:** revisar la pregunta, los criterios de inclusión y la secuencia; comprobar el ajuste móvil antes de aceptar la ficha.

### 2026-09-28 — Inicio: explicar visualmente la auditoría de PSCompPars

- **Tarea o frente:** S02, estación 4 · subestación 2; continuar la explicación del dataset tras la actividad de predicción del radio.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ajuste pedagógico y visual.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, nueva ficha `docs/specs/interactions/s02-dataset-audit.md` y esta bitácora. No descargar datos ni reportar métricas.
- **Resultado:** pendiente.
- **Evidencia:** se contrastarán las definiciones de PSCompPars con la documentación del NASA Exoplanet Archive y se revisará la subestación en el navegador local.
- **Ideas y decisiones:** cambiar la tabla extensa por una lectura visual de población, incertidumbre y procedencia. Separar las columnas del catálogo de las decisiones didácticas del filtro; marcar la fila esquemática como ilustrativa.
- **Bloqueos:** ninguno.
- **Siguiente acción:** definir la interacción accesible, implementarla con el sistema visual de S02 y revisar cada estado.

### 2026-09-28 — Cierre: explicar las decisiones de auditoría en 04.2

- **Tarea o frente:** S02, estación 4 · subestación 2; continuar la lectura de PSCompPars tras la pregunta de predicción del radio.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; mejora pedagógica, visual e interactiva.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02DatasetAudit.tsx`, `src/components/react/s02/s02-dataset-audit.css`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-dataset-audit.md` y esta bitácora.
- **Resultado:** se reemplazó la tabla de diez filas por una secuencia interactiva de tres preguntas: población (`tran_flag`, `pl_controv_flag`), lectura de límites e incertidumbres, y procedencia (`pl_bmassprov`, `pl_rade_reflink`). El panel relaciona cada grupo con la decisión preliminar del ejercicio; un esquema visual explica la incertidumbre inferior/superior. Se añadieron enlaces oficiales a definiciones y cálculos de PSCompPars. El título y la introducción presentan 04.2 como continuación de la actividad 04.1.
- **Evidencia:** inspección manual de los tres estados en `/sesiones/s02/`, a 1280 × 720; lectura móvil apilada a 390 × 844; `Space` cambió el panel y actualizó el resumen accesible. Se corrigió la composición para que el contenido no invada el pie en una pantalla de 720 px de alto. Prettier aplicado, ESLint dirigido pasó y `npm run check:astro` informó 0 errores, advertencias ni sugerencias en 112 archivos. No se ejecutaron suites automatizadas ni consultas TAP; no se descargaron datos ni se reportaron métricas.
- **Ideas y decisiones:** la selección de planetas en tránsito y sin bandera de controversia delimita el ejercicio, no todo el catálogo. El notebook actual rellena banderas de límite ausentes con `0`; la diapositiva lo presenta como una suposición por validar con la extracción. Los radios con referencia `Calculated Value` se excluyen porque pueden derivarse de la masa usada como predictor.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente; la ficha de interacción permanece en borrador.
- **Siguiente acción:** revisar la política de filtros, especialmente el tratamiento de banderas ausentes, antes de ejecutar la extracción del notebook.

### 2026-09-28 — Inicio: concentrar la práctica S02 en una consigna y Colab

- **Tarea o frente:** S02, estación 5; reunir consulta, auditoría, partición, modelos y evaluación en un único enunciado de actividad.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; simplificación editorial de la práctica web.
- **Alcance y archivos reservados:** `src/lib/s02-content.ts`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css` y esta bitácora. La actividad ejecutable permanece en `notebooks/S02_arboles_decision_random_forest.ipynb`; no sincronizarla ni publicarla.
- **Resultado:** pendiente.
- **Evidencia:** se revisarán la secuencia actual de cinco subdiapositivas, el destino Colab y la vista local de 05.1.
- **Ideas y decisiones:** dejar una sola subdiapositiva con objetivo, consigna integrada y enlace directo a Colab; retirar de la presentación los fragmentos y desarrollos paso a paso que ya pertenecen al notebook.
- **Bloqueos:** el notebook está presente en el árbol local, aún sin sincronizar con GitHub; no se afirma que el enlace externo esté operativo.
- **Siguiente acción:** implementar la versión breve y revisar el recorrido visual en escritorio; comprobar Colab después de sincronizar el notebook.

### 2026-09-28 — Cierre: concentrar la práctica S02 en 05.1

- **Tarea o frente:** S02, estación 5; resumir la práctica ejecutable en una consigna y dar acceso directo a Colab.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; simplificación editorial.
- **Alcance y archivos:** `src/lib/s02-content.ts`, `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css` y esta bitácora. Sin sincronizar el notebook ni publicar cambios.
- **Resultado:** 05.1 ahora reúne el objetivo y el enunciado integrado: auditar PSCompPars, excluir radios calculados desde la masa, reservar sistemas por `hostname` y comparar la mediana, un árbol y dos Random Forest con MAE. El enlace a Colab quedó en esta lámina y se retiraron las cuatro subdiapositivas de código, parámetros y comparación.
- **Evidencia:** inspección de 05.1 en `/sesiones/s02/` a 1280 × 720; la navegación muestra 14 diapositivas y una sola parada de práctica, y el árbol accesible expone el objetivo, el enunciado y el enlace. Prettier, ESLint dirigido y `npm run check:astro` pasaron; no se ejecutaron suites de prueba ni el notebook.
- **Ideas y decisiones:** el enlace apunta al archivo esperado en `main`. `notebooks/S02_arboles_decision_random_forest.ipynb` sigue local y no versionado en este árbol, así que la apertura remota queda pendiente de sincronizar la fuente y comprobar Colab.
- **Bloqueos:** ninguno para la simplificación local; la disponibilidad externa del notebook aún no está verificada.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** sincronizar y ejecutar el notebook desde GitHub/Colab antes de usar el enlace con estudiantes.

### 2026-09-28 — Inicio: aclarar la ganancia de información y la búsqueda del corte

- **Tarea o frente:** S02, estación 1 · subestación 3; explicar en lenguaje intuitivo qué compara la ganancia y cómo se selecciona el corte.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ajuste pedagógico de la explicación formal.
- **Alcance y archivos reservados:** `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/s02-opening.css`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Sin cambiar los controles ni los datos sintéticos.
- **Resultado:** pendiente.
- **Evidencia:** revisión de la tercera página de definiciones en `/sesiones/s02/`; se añadirá la comparación intuitiva antes/después y el procedimiento para buscar el mejor corte en cada nodo.
- **Ideas y decisiones:** explicar que la métrica evalúa cortes candidatos, compara su reducción ponderada y escoge la mayor localmente; luego repite la búsqueda dentro de cada rama.
- **Bloqueos:** ninguno.
- **Siguiente acción:** implementar el texto y la secuencia visual, actualizar la ficha y revisar la página en el navegador.

### 2026-09-28 — Cierre: explicar la comparación antes y después del corte

- **Tarea o frente:** S02, estación 1 · subestación 3; ampliar la explicación de ganancia de información y cómo se escoge el umbral.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste pedagógico y visual.
- **Alcance y archivos:** `src/components/react/s02/S02InformationGain.tsx`, `src/components/react/s02/s02-opening.css`, `docs/specs/interactions/s02-rule-split.md` y esta bitácora. Sin cambiar los controles ni los datos sintéticos.
- **Resultado:** se añadió una paráfrasis que compara la mezcla antes y después del corte y tres pasos para evaluar puntos medios, calcular la impureza ponderada y escoger la mayor reducción en cada nodo. El ejemplo identifica el corte de `1.5 R⊕`, con Gini de `0.5` a `0` y entropía de `1` a `0` bits.
- **Evidencia:** inspección visual manual de 01.3 en `/sesiones/s02/` a 1257 × 912; fórmulas, explicación, pasos, ejemplo y controles del slider caben en el panel. ESLint dirigido y `npm run check:astro` sin diagnósticos. No se ejecutaron suites de prueba.
- **Ideas y decisiones:** precisar que la selección busca la mayor reducción local y repite el procedimiento en cada rama; no afirma que se haya optimizado el árbol completo de una vez.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente; la ficha conserva `status: draft`.
- **Siguiente acción:** revisar si la explicación sobre búsqueda local necesita una demostración práctica adicional en el notebook.

### 2026-09-28 — Inicio: revisar notebook S02 y validar banderas de límite

- **Tarea o frente:** revisar y editar el notebook S02; comprobar el tratamiento de banderas ausentes en PSCompPars.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; revisión pedagógica y metodológica.
- **Alcance y archivos reservados:** `notebooks/S02_arboles_decision_random_forest.ipynb`, `src/components/react/s02/S02DatasetAudit.tsx`, `docs/specs/interactions/s02-dataset-audit.md` y esta bitácora. La ejecución se hará en memoria y no se guardarán sus salidas en el notebook fuente.
- **Resultado:** revisión en curso; no se presupone la equivalencia entre bandera ausente y `0`.
- **Evidencia:** lectura de las 49 celdas; consulta de documentación oficial NASA; el entorno local no logra conectar al servicio TAP.
- **Ideas y decisiones:** verificar si una bandera ausente permite afirmar `0` (`=`). Si la documentación no respalda esa equivalencia, tratarla como dato desconocido y contarlo por separado.
- **Bloqueos:** TAP no responde desde este entorno; cualquier conteo de la extracción en vivo queda pendiente de una ejecución desde Colab u otro entorno con acceso.
- **Siguiente acción:** completar la auditoría sintética, actualizar el mensaje de 04.2 y validar la estructura del notebook.

### 2026-09-28 — Cierre: revisar notebook S02 y corregir banderas de límite

- **Tarea o frente:** revisión del notebook ejecutable S02 y validación documental del tratamiento de `pl_bmasselim`, `pl_insollim` y `pl_radelim`.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; corrección metodológica y pedagógica.
- **Alcance y archivos:** notebook S02, ficha `S02DatasetAudit`, especificación `s02-dataset-audit` y esta bitácora. Sin sincronización, publicación ni guardado de resultados sintéticos en la fuente.
- **Resultado:** se eliminó `fillna(0)`. El filtro conserva solo filas con las tres banderas presentes y en `0`; faltantes quedan como desconocidos y se cuentan aparte. La auditoría también separa cotas `+1/-1` y códigos inesperados. La ficha web y su especificación quedaron alineadas. Se añadieron IDs estables a las 49 celdas.
- **Evidencia:** `nbformat.validate` correcto; 49 celdas, sin resultados guardados. Las 23 celdas de código corrieron en orden con una tabla sintética en lugar de la consulta TAP; la auditoría distinguió 3 ausencias, 4 filas con cotas y 1 código inesperado en esa fixture, y conservó 52 filas con las tres banderas en `0`. Esos conteos son solo de la fixture. Prettier pasó para el componente web.
- **Ideas y decisiones:** NASA identifica estos campos como columnas de límite y su documentación de códigos define `0 =`, `+1 >`, `-1 <`; las fuentes revisadas no indican que un valor faltante sea `0`. La política conservadora excluye y cuenta banderas faltantes.
- **Bloqueos:** la conexión TAP devolvió `WinError 10061`. El kernel de Jupyter no pudo crear su archivo de conexión por `WinError 5`; por eso se ejecutaron las celdas directamente en Python con una fixture y se dejó el notebook fuente limpio. No se validaron la extracción real ni sus conteos.
- **Estado propuesto:** entregada para revisión docente; pendiente la ejecución limpia en Colab o un entorno con acceso al NASA TAP.
- **Siguiente acción:** ejecutar el notebook fuente contra PSCompPars en un entorno con red, revisar los conteos reales y validar el enlace de Colab antes de usarlo con estudiantes.

### 2026-09-28 — Cierre: dar protagonismo al mapa y al árbol en 01.4

- **Tarea o frente:** S02, estación 1 · subestación 4; reducir el espacio visual de los ajustes y acercar el selector de ejemplo a las visualizaciones.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste de composición.
- **Alcance y archivos reservados:** `src/components/react/s02/S02TreePlayground.tsx`, `src/components/react/s02/s02-tree-playground.css`, `src/components/react/s02-learning-journey.css` y esta bitácora. Mantener opciones, cálculos, controles y accesibilidad actuales.
- **Resultado:** el mapa y el árbol ahora ocupan una fila de mayor altura. Los controles de hiperparámetros quedan en una franja superior más compacta; se retiraron de esa franja el código y las explicaciones repetidas, que siguen visibles en el ejemplo y la tabla de la izquierda. El selector de ejemplo, la ruta y la etiqueta predicha se ubican inmediatamente antes de los gráficos.
- **Evidencia:** revisión de 01.4 en navegador a 1257 × 912: ambos gráficos caben completos y ganan protagonismo; el título del mapa cabe en una línea y el selector se lee junto a la predicción. Astro Check: 112 archivos, 0 errores, advertencias o hints. Prettier pasó para los tres archivos de interfaz y esta bitácora. No se ejecutaron suites automatizadas.
- **Ideas y decisiones:** conservar blancos de interacción accesibles, compactar el texto redundante ya explicado en la tabla de parámetros y colocar la selección inmediatamente antes de los gráficos.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** revisar con estudiantes si el nuevo orden facilita asociar cada ejemplo con su ruta, el mapa y la estructura del árbol.

### 2026-09-28 — Inicio: centrar el notebook S02 en la práctica de exoplanetas

- **Tarea o frente:** reducir el notebook a la práctica planetaria desde su antigua sección 6; añadir R² y un gráfico interpretable de importancia de predictores; validar las suposiciones sobre valores calculados de PSCompPars.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; revisión y edición de notebook.
- **Alcance y archivos reservados:** `notebooks/S02_arboles_decision_random_forest.ipynb`, `src/components/react/S02LearningJourney.tsx` y esta bitácora. Sin publicar, sincronizar ni guardar salidas de ejecución en el notebook fuente.
- **Resultado:** en curso.
- **Evidencia:** el notebook original tenía 49 celdas; una instantánea NASA con ADQL y fecha UTC está disponible para una ejecución local sin TAP.
- **Ideas y decisiones:** probar explícitamente las referencias `Calculated Value` de masa y radio para evitar fuga del objetivo; auditar la irradiación calculada y decidir cómo interpretarla.
- **Bloqueos:** la consulta en vivo desde Colab no se ejecutará en este entorno.
- **Siguiente acción:** editar el flujo, calcular ambas métricas y visualizar la importancia por permutación en los sistemas reservados.

### 2026-09-28 — Cierre: centrar S02 en exoplanetas, MAE, R² e importancia por permutación

- **Tarea o frente:** enfocar el notebook en PSCompPars desde la antigua sección 6 y validar referencias, banderas y métricas con la instantánea disponible.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; edición pedagógica y validación de análisis.
- **Alcance y archivos:** `notebooks/S02_arboles_decision_random_forest.ipynb`, `src/components/react/S02LearningJourney.tsx` y esta bitácora. Se conservaron la instantánea y su JSON existentes; no se guardaron salidas en el `.ipynb`.
- **Resultado:** se quitaron el preámbulo sintético y las secciones conceptuales anteriores; el notebook quedó en 9 secciones planetarias. Se añadieron definiciones e interpretación de MAE/R², ambas métricas para los cuatro modelos y una gráfica horizontal de importancia por permutación del bosque con masa e irradiación, usando el incremento de MAE en prueba. La consigna única 05.1 se alineó para pedir MAE, R² y esa gráfica sin añadir otra subdiapositiva.
- **Evidencia:** `nbformat.validate` pasó con 32 celdas sin salidas ni contadores ejecutados. Todas las celdas de código corrieron en orden con la instantánea `notebooks/S02_PSCompPars_20260929T032525Z.csv` (consulta UTC `2026-09-29T03:25:25+00:00`); se omitió únicamente la celda que consulta TAP en vivo. La selección conservó 1.529 planetas y 1.249 sistemas; 1.229 planetas/999 sistemas quedaron en entrenamiento y 300/250 en prueba, sin sistemas compartidos. La auditoría encontró 0 radios calculados y 0 masas calculadas dentro de `pl_bmassprov = Mass`; contó 82 irradiaciones calculadas conservadas y 6 filas con banderas de límite ausentes entre 1.724 filas previas al filtro de censura. En esta partición, el Random Forest masa + irradiación obtuvo MAE 1,397 R⊕ y R² 0,855, frente a 1,796 R⊕ y 0,781 para masa sola. El barajado aumentó el MAE en promedio 4,099 R⊕ para masa y 0,520 R⊕ para irradiación. La gráfica de permutación se renderizó desde la celda nueva y se inspeccionó visualmente. `npm run check:astro` pasó con 0 errores/avisos/hints; Prettier pasó para `S02LearningJourney.tsx`.
- **Ideas y decisiones:** la masa requiere tanto `pl_bmassprov = Mass` como una referencia disponible y no calculada; el radio objetivo también requiere referencia disponible y no calculada. Se conservan las irradiaciones calculadas por el Archivo porque su cálculo documentado usa luminosidad y semieje mayor, no el radio objetivo; la interpretación registra esa mezcla de procedencias. La importancia por permutación depende de esta partición y puede verse afectada por la correlación entre predictores.
- **Bloqueos:** el TAP en vivo y una ejecución limpia en Colab siguen pendientes; las métricas corresponden a la instantánea citada y pueden cambiar con otra extracción.
- **Estado propuesto:** entregada para revisión docente; sin commit ni publicación.
- **Siguiente acción:** antes de distribuir métricas nuevas, ejecutar la consulta desde Colab y comparar fecha, conteos y métricas de la extracción.

### 2026-09-28 — Inicio: simplificar el notebook de la práctica planetaria

- **Tarea o frente:** aplicar la revisión docente al notebook S02 completo: simplificar el planteamiento, las columnas explicadas, la consulta y los pasos de análisis.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; edición pedagógica del notebook.
- **Alcance y archivos reservados:** `notebooks/S02_arboles_decision_random_forest.ipynb` y esta bitácora. Mantener el alcance en la práctica de exoplanetas y no cambiar el estado de publicación.
- **Resultado:** en curso.
- **Evidencia:** comentarios del usuario sobre el encuadre, el recorrido, las importaciones, las referencias, los límites, los valores ausentes y la complejidad del resto del notebook.
- **Ideas y decisiones:** quitar fecha y zona horaria del flujo; conservar las referencias y banderas que justifican filtros; retirar columnas de incertidumbre y análisis que el ejercicio no usa.
- **Bloqueos:** ninguno.
- **Siguiente acción:** simplificar todas las celdas y volver a ejecutar las celdas de análisis con la instantánea disponible.

### 2026-09-28 — Garantizar legibilidad tipográfica en S02

- **Tarea o frente:** establecer un tamaño mínimo uniforme para el texto de las 14 diapositivas de S02.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; contrato tipográfico y corrección de desbordamientos.
- **Alcance y archivos:** estilos compartidos y locales de S02, `S02ThresholdExplorer.tsx`, `docs/protocols/VISUAL_SYSTEM.md` y esta bitácora. Sin commit ni publicación.
- **Resultado:** S02 tiene ahora un piso de 15 px para todo el texto visible, incluidas etiquetas de gráficas, controles y metadatos. El contenido denso puede desplazarse sin reducir la letra; se corrigieron montajes en 02.1 y 04.1 y se ampliaron etiquetas SVG en 01.2 y 01.4.
- **Evidencia:** auditoría de declaraciones tipográficas en las hojas CSS de S02; revisión visual de las diapositivas 01.2, 01.3, 01.4, 01.5, 02.1, 03.1, 03.2, 04.1, 04.2, 05.1, 06.1 y 06.2, además de 01.1 en una revisión previa. Los paneles densos muestran desplazamiento cuando hace falta. No se ejecutaron suites automatizadas.
- **Ideas y decisiones:** mantener la escala del sistema visual y usar el piso local de 15 px en S02; reorganizar o desplazar el contenido denso antes que encoger el texto.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** revisar la legibilidad en proyección en la resolución habitual del aula.

### 2026-09-28 — Cierre: simplificar la práctica planetaria de S02

- **Tarea o frente:** revisar y simplificar el notebook de PSCompPars según las observaciones docentes.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; edición pedagógica y validación del análisis.
- **Alcance y archivos:** notebooks/S02_arboles_decision_random_forest.ipynb y esta bitácora. Sin cambios a la interfaz, publicación ni guardado de salidas en el notebook fuente.
- **Resultado:** el notebook pasó de 32 a 15 celdas. Se quitaron el recorrido, la fecha y zona horaria, los metadatos JSON, las columnas de incertidumbre, las auditorías detalladas, la ruta de un ejemplo y los gráficos auxiliares. El inicio plantea la pregunta masa-radio e irradiación, incluye el enlace NASA, explica las librerías y muestra una vista previa y describe() del dataframe. Se aclararon banderas, referencias, valores calculados y límites. Se conserva la referencia mediana, un árbol pequeño y dos Random Forest comparables; el análisis cierra con MAE, R² y una gráfica sencilla de importancia por permutación.
- **Evidencia:** nbformat.validate pasó; las 7 celdas de código se ejecutaron en orden con la instantánea local de 6.372 filas, sustituyendo solo la consulta TAP en vivo. La muestra quedó en 1.529 planetas y 1.249 sistemas; entrenamiento y prueba no comparten sistemas. En esa partición: mediana MAE 5,107 R⊕ / R² −0,032; árbol 1,690 / 0,816; bosque con masa 1,796 / 0,781; bosque con masa e irradiación 1,462 / 0,843. La importancia por permutación aumentó el MAE 4,093 R⊕ al barajar masa y 0,500 R⊕ al barajar irradiación. La gráfica se renderizó e inspeccionó; el notebook quedó sin salidas guardadas.
- **Ideas y decisiones:** se conserva la referencia de masa y radio para excluir valores Calculated Value, y la bandera de límite de irradiación para excluir cotas. Se omite pl_insol_reflink, pues el cálculo documentado de irradiación usa luminosidad estelar y semieje mayor, sin radio planetario. Los resultados describen una partición de esta muestra y no una relación causal o universal.
- **Bloqueos:** no se consultó TAP en vivo; la conexión continúa pendiente de una ejecución desde Colab o un entorno con acceso. La instantánea local sustenta la validación y las métricas anteriores.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** ejecutar desde Colab la versión fuente actualizada para verificar la consulta y obtener resultados de la extracción vigente antes de distribuirla.

### 2026-09-29 — Inicio: explicar variables, modelos y gráficas de S02

- **Tarea o frente:** ampliar las explicaciones y visualizaciones del notebook planetario de S02 a partir de los comentarios docentes.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; revisión pedagógica y edición de notebook.
- **Alcance y archivos:** notebook S02 y esta bitácora. Conservar la pregunta científica, la comparación de modelos y la separación por sistema estelar.
- **Resultado:** en curso.
- **Evidencia:** comentarios sobre el significado de las columnas, el filtrado, DummyRegressor, MAE, R² y las gráficas de predicción.
- **Ideas y decisiones:** explicar entradas y objetivo, simplificar el código de selección sin perder los filtros necesarios, formalizar las métricas y visualizar tanto la predicción por escalones del árbol como la comparación observado-predicho.
- **Bloqueos:** ninguno.
- **Siguiente acción:** editar las celdas y ejecutar el flujo con la instantánea local.

### 2026-09-29 — Cierre: recuperar la versión oficial del notebook S02

- **Tarea o frente:** recuperar la versión del notebook preparada por la persona usuaria antes de la sobrescritura accidental.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; recuperación de archivo.
- **Alcance y archivos:** **notebooks/S02_arboles_decision_random_forest.ipynb** y esta bitácora.
- **Resultado:** se restauró el notebook byte por byte desde el commit **a28159d**. Quedó la versión de 21 celdas con la separación de entrenamiento y prueba por sistema estelar.
- **Evidencia:** el blob del archivo coincide con el del commit y Git no reporta cambios en el notebook; la validación nbformat pasó y el código mantiene la partición agrupada por hostname y la comprobación de sistemas compartidos.
- **Ideas y decisiones:** conservar esta versión oficial como base y hacer cambios posteriores puntuales, manteniendo su estructura.
- **Bloqueos:** ninguno.
- **Estado propuesto:** recuperada; pendiente de confirmación de la persona usuaria.
- **Siguiente acción:** ninguna sobre el notebook hasta que la persona usuaria retome su revisión.

### 2026-09-29 — Inicio: aclarar los datos y la mediana en regresión S02

- **Tarea o frente:** atender la duda docente sobre el origen de P01–P04 y los valores usados para calcular la mediana en `01.5`.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ajuste pedagógico de explicación y visualización.
- **Alcance y archivos reservados:** `src/components/react/s02/S02RegressionExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Mantener los datos sintéticos y el corte interactivo; sin commit, push ni publicación.
- **Resultado:** en curso.
- **Evidencia:** comentario docente: no queda claro qué representan P01/P02 ni respecto a qué se calcula la mediana.
- **Ideas y decisiones:** indicar que P01–P04 son etiquetas para filas inventadas; distinguir predictor `x` y objetivo observado `y`; ejemplificar la mediana con los objetivos de una hoja que tenga tres puntos.
- **Bloqueos:** ninguno.
- **Siguiente acción:** ajustar copy y fórmulas, inspeccionar la lámina en el navegador y registrar la evidencia visual.

### 2026-09-29 — Cierre: explicar el origen de los datos y la mediana en 01.5

- **Tarea o frente:** aclarar la procedencia de P01–P04 y hacer explícitos los valores usados por cada criterio de regresión.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste pedagógico, matemático y visual.
- **Alcance y archivos:** `src/components/react/s02/S02RegressionExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** la lámina identifica P01–P04 como filas inventadas y explica `x` como entrada y `y` como número observado. La ruta de P02 muestra la regla y todos los puntos de su hoja; `squared_error` enseña el promedio de los `y` concretos. El ejemplo de `absolute_error` muestra los valores ordenados `1,2 < 2,8 < 3,0` y señala la mediana `2,8`, con la media de ese mismo grupo (`2,33`) para comparar criterios.
- **Evidencia:** inspección del navegador a 1610 × 912. Con `t=2,5`, la ruta, el cálculo `(1,0 + 1,2)/2 = 1,1` y la mediana explícita quedan visibles. Al cambiar a `t=1,5`, P02 pasa correctamente a la hoja derecha junto con P03 y P04; la media cambia a `2,33` y la mediana sigue en `2,8`. El corte inicial `t=2,5` quedó restaurado. Prettier pasó en el componente, su CSS, `s02-content.ts` y la ficha; ESLint focalizado pasó; Astro Check pasó en 112 archivos sin errores, advertencias ni hints. El build estático generó 9 páginas; la primera ejecución encontró `spawn EPERM` del sandbox y la segunda pasó con permiso local ampliado, con los avisos conocidos por colecciones vacías. No se ejecutaron suites de pruebas.
- **Ideas y decisiones:** conservar el ejemplo con tres objetivos porque deja un único valor central y permite distinguir la mediana de la media. La ficha de interacción continúa en `draft`.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** preguntar a estudiantes si ahora identifican qué valores llegan a cada hoja y cómo se toma el valor central.

### 2026-09-29 — Inicio: simplificar la introducción a regresión en S02

- **Tarea o frente:** revisar la subestación `01.5` para explicar con claridad cómo un árbol pasa de etiquetas discretas a predicciones numéricas continuas.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; simplificación pedagógica y visual.
- **Alcance y archivos reservados:** `src/components/react/s02/S02RegressionExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** en curso.
- **Evidencia:** comentario docente: el selector cambia el umbral a la vez que explica regresión; se solicita una explicación más sencilla y una visual informativa.
- **Ideas y decisiones:** dejar una sola regla fija, seguir una entrada desde la pregunta del nodo hasta una hoja, y mostrar que la hoja predice el promedio de sus objetivos `y`. Comparar en pocas palabras etiqueta discreta y número continuo; retirar de esta introducción selector, mediana y comparación de criterios.
- **Bloqueos:** ninguno.
- **Siguiente acción:** rehacer la visual y el texto, inspeccionar la lámina en el navegador y registrar la evidencia.

### 2026-09-29 — Cierre: simplificar la introducción a regresión en S02

- **Tarea o frente:** explicar el paso de clasificación a regresión y cómo una hoja produce una predicción numérica.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; edición pedagógica y validación local.
- **Alcance y archivos:** `src/components/react/s02/S02RegressionExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** se retiró el selector de umbral, la comparación de medianas y el detalle de suma de cuadrados. La lámina fija `x ≤ 2.5`, contrasta etiqueta discreta y valor continuo, sigue P02 hasta la hoja izquierda y muestra `(1.0 + 1.2) / 2 = 1.1`. El gráfico relaciona ambos valores de hoja con los datos sintéticos y los presenta como tramos constantes.
- **Evidencia:** inspección visual a 1600 × 900 en `/sesiones/s02/`; la ecuación renderiza la coma decimal y todos los bloques se ven sin recorte. Prettier y ESLint focalizado pasaron; Astro Check pasó en 112 archivos; el build estático produjo 9 páginas, incluida `/sesiones/s02/`. La primera ejecución del build chocó con `spawn EPERM` del sandbox; la repetición local pasó. Permanecen los avisos conocidos por colecciones de contenido vacías. No se ejecutaron suites de prueba.
- **Ideas y decisiones:** una regla fija deja ver la lógica de una hoja antes de estudiar los criterios de error, la selección del corte y el sobreajuste. La ficha de la visualización continúa en `draft`; revisión móvil pendiente.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** revisar legibilidad en móvil y confirmar con estudiantes que distinguen etiqueta, valor objetivo y promedio por hoja.

### 2026-09-29 — Inicio: hacer explícitos los datos y el error cuadrático de la regresión

- **Tarea o frente:** atender revisión docente de `01.5`: aclarar el origen de P01–P04 y de `y=1.2`, invertir la composición y explicar visualmente `squared_error`.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ampliación pedagógica en dos pasos consecutivos.
- **Alcance y archivos reservados:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02RegressionExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** en curso.
- **Evidencia:** comentario docente: explicar a la izquierda, mostrar de dónde vienen los valores del ejemplo y hacer visibles las operaciones del error cuadrático.
- **Ideas y decisiones:** conservar una regla fija. En `01.5` explicar los datos inventados y la media por hoja; añadir `01.6` para mostrar residuos al cuadrado, su suma por hojas y cómo el árbol compara el total.
- **Bloqueos:** ninguno.
- **Siguiente acción:** reordenar la composición, añadir la subestación enfocada en `squared_error` y revisar ambas en el navegador.

### 2026-09-29 — Cierre: explicitar observaciones y error cuadrático en S02

- **Tarea o frente:** aclarar la mecánica de regresión con árbol y hacer visible el cálculo de `squared_error` solicitado en revisión.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; edición de contenido, composición visual y verificación local.
- **Alcance y archivos:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02/S02RegressionExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** `01.5` pone la explicación a la izquierda y el gráfico con una tabla explícita a la derecha. El texto define P01–P04 como filas ficticias, `x` como entrada e `y` como objetivo observado; aclara que `y=1.2` de P02 viene dado y no es producido por el modelo. La ruta de P02 explica la media de hoja y obtiene `ŷ=1.1`. Se añadió `01.6`: define el residuo, muestra ambos errores por hoja elevados al cuadrado, suma `0.02 + 0.02 = 0.04` y compara con `SSE=3.28` sin división.
- **Evidencia:** ambas láminas inspeccionadas en el navegador a 1440 × 900; datos y ecuaciones quedan visibles y sin selector de umbral. Prettier y ESLint focalizado pasaron; Astro Check pasó en 112 archivos; el build generó 9 páginas, incluida `/sesiones/s02/`. El primer build volvió a fallar con `spawn EPERM` del sandbox y la repetición con permiso local ampliado pasó. Persisten avisos conocidos por colecciones de contenido vacías. No se ejecutaron suites de prueba.
- **Ideas y decisiones:** dividir predicción por hoja y puntuación del corte en dos pasos contiguos mantiene una regla fija y deja las operaciones cuadráticas legibles. La ficha sigue en `draft`; revisión móvil pendiente.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** revisar las láminas en móvil y validar con estudiantes si ahora distinguen datos, predicción por hoja y error cuadrático.

### 2026-09-29 — Inicio: separar la explicación fija y la exploración de regresión S02

- **Tarea o frente:** rehacer las subestaciones `01.5` y `01.6` para explicar primero la predicción media por hoja y después explorar cómo cambian los errores al mover y encadenar cortes.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; revisión docente y nueva interacción educativa.
- **Alcance y archivos reservados:** `src/components/react/s02/S02RegressionExplorer.tsx`, nuevo `src/components/react/s02/S02RegressionThresholdExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/components/react/S02LearningJourney.tsx`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** en curso.
- **Evidencia:** instrucción docente de separar una experiencia fija con tabla y explicación de medias/error cuadrático de otra interactiva donde se mueve el umbral y se prueba una segunda etapa.
- **Ideas y decisiones:** usar seis filas sintéticas con objetivos `{1,2,30,7,8,9}` para que en la hoja derecha media `13.5` y mediana `8.5` sean diferentes. Mantener `squared_error` asociado a la media y mostrar la mediana solo como contraste con `absolute_error`.
- **Bloqueos:** ninguno.
- **Siguiente acción:** implementar las dos subestaciones según la ficha, revisar render matemático, operaciones y estados en navegador.

### 2026-09-29 — Cierre: separar predicción y búsqueda de cortes en regresión S02

- **Tarea o frente:** desarrollar la explicación fija y la exploración interactiva de regresión por árboles en `01.5` y `01.6`.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; contenido, interacción, revisión visual y validación técnica.
- **Alcance y archivos:** `src/components/react/s02/S02RegressionExplorer.tsx`, `src/components/react/s02/S02RegressionThresholdExplorer.tsx`, `src/components/react/s02/s02-regression-explorer.css`, `src/components/react/S02LearningJourney.tsx`, `src/lib/s02-content.ts`, `docs/specs/interactions/s02-regression-leaf-output.md` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** `01.5` usa seis filas sintéticas con objetivos `{1,2,30,7,8,9}`; aclara ID, entrada `x` y valor observado `y`; muestra que la hoja derecha predice la media `13.5` y contrasta la mediana `8.5` mediante los dos valores centrales ordenados, `(8+9)/2`. Explica el residuo, `SSE = Σ eᵢ²`, la comparación `0.5 + 365 = 365.5` frente a `557.5` sin corte y la selección entre cinco umbrales. Como se comparan los mismos seis datos, aclara que minimizar `SSE` equivale a minimizar `MSE = SSE/6`. Una entrada nueva `x=4.4` llega a esa hoja y recibe `ŷ=13.5`. `01.6` permite mover la raíz, leer el SSE y los datos de cada hoja, y pasar a una segunda etapa donde la raíz queda fija y se explora un corte local en la hoja derecha. La ficha interactiva permanece en `draft` para revisión docente.
- **Evidencia:** inspección visual en 1920×1080, 1440×900, 1610×912 y 390×844; la ecuación, tabla, predicción y resúmenes caben en escritorio, móvil no presenta desbordamiento horizontal y los controles permanecen accesibles en ambas etapas. Teclado y puntero actualizaron los dos deslizadores: la raíz `x≤3.5` da `SSE=544`; con raíz `2.5`, el segundo corte `3.5` da `SSE=2.5` y el corte `4.5` da `265.5`. La emulación `prefers-reduced-motion` respondió `true` y se restauró luego. Prettier, ESLint focalizado y Astro Check pasaron; Astro Check reportó 113 archivos sin errores, avisos ni hints. `npm.cmd run build:subpath` produjo 9 páginas, incluida `/sesiones/s02/`; permanecen los avisos conocidos por colecciones de contenido vacías. No se ejecutaron suites de pruebas.
- **Ideas y decisiones:** la mediana se conserva solo como contraste con `absolute_error`; `squared_error` predice con la media. Los puntos son inventados y sirven para enseñar la regla, no son mediciones planetarias. La segunda etapa deja planteada la conexión con sobreajuste y ensambles de las subestaciones siguientes.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** revisar la progresión pedagógica con estudiantes y confirmar que distinguen observación, predicción de la hoja y suma de residuos cuadrados.

### 2026-09-29 — Cierre: actualizar los resultados y límites de S02

- **Tarea o frente:** alinear la subestación `06.1` con la ejecución actual del notebook de regresión.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; corrección de contenido y revisión visual.
- **Alcance y archivos:** `src/components/react/S02LearningJourney.tsx`, `src/components/react/s02-learning-journey.css`, `src/lib/s02-content.ts` y esta bitácora. El notebook no se editó.
- **Resultado:** `06.1` ahora indica los 1.529 planetas y 1.249 sistemas del corte, los filtros de la muestra y los resultados guardados del Random Forest: MAE 1,673 → 1,191 R⊕ y R² 0,814 → 0,889 al añadir insolación. Explica el cambio de MAE y aclara que el código separa filas al azar; 66 estrellas aparecen en entrenamiento y prueba, por lo que esta comparación no mide sistemas completamente nuevos.
- **Evidencia:** resultados de la tabla del notebook (celda 14), reproducidos localmente con `S02_PSCompPars_20260929T032525Z.csv`; inspección del navegador a 1056 × 912, con texto, tabla y navegación visibles; Prettier pasó en los tres archivos de código. No se ejecutaron suites de prueba.
- **Ideas y decisiones:** el notebook todavía tiene una discrepancia entre el texto, que anuncia separar sistemas estelares, y el código, que usa `train_test_split` por filas. La página comunica el comportamiento ejecutado. Propuesta abierta: corregir la partición por grupos en el notebook y regenerar sus métricas antes de usar estas cifras como estimación de generalización a sistemas nuevos.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** decidir si se cambia el notebook a una partición por sistema; si se cambia, recalcular las métricas y actualizar esta lámina.

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

### 2026-09-29 — Inicio: adaptar la escala de proyección de S02

- **Tarea o frente:** mejorar la adaptación tipográfica y visual de S02 en pantallas amplias.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; revisión de diseño y ajuste CSS.
- **Alcance y archivos reservados:** `src/components/react/s02-learning-journey.css`, `docs/protocols/VISUAL_SYSTEM.md` y esta bitácora. Sin cambios de contenido, navegación ni publicación.
- **Resultado:** en curso.
- **Evidencia:** capturas compartidas muestran texto y diagramas pequeños en pantallas cercanas a 1800 px de ancho; el modo de poca altura reduce actualmente los diagramas de la lámina 02.1 a 2.5 rem.
- **Ideas y decisiones:** escalar texto y figuras según ancho y alto disponibles, preservar el piso legible y mantener el desplazamiento cuando una lámina queda densa.
- **Bloqueos:** ninguno.
- **Siguiente acción:** ajustar la escala local de S02 y revisar las dimensiones amplias, 16:9 y móvil.

### 2026-09-29 — Cierre: escala adaptable de proyección S02

- **Tarea o frente:** adaptar el tamaño del texto y la composición de S02 a pantallas amplias.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste CSS y revisión de disposición en navegador.
- **Alcance y archivos:** `src/components/react/s02-learning-journey.css`, `docs/protocols/VISUAL_SYSTEM.md` y esta bitácora. Sin cambios de contenido, navegación funcional ni publicación.
- **Resultado:** el piso tipográfico de S02 escala de 15 a 19 px con el ancho y la altura disponibles; títulos, controles, pies, etiquetas e ilustraciones aumentan con esa escala. Se compactan los márgenes y el carril en pantallas bajas. La lámina 02.1 usa filas de contenido de altura natural y el área de diapositiva desplaza el contenido cuando hace falta, sin superponer el ensamble con las tarjetas.
- **Evidencia:** revisión en navegador a 1800×700, 1800×900 y 390×844. En 1800×700, el tamaño calculado llegó a 19 px para texto de apoyo, 38.4 px para el título de 02.1 y 76.8 px para el dibujo del árbol; el navegador reportó DPR 0.9 y un viewport CSS de 2000×777. En 390×844 no apareció desbordamiento horizontal. En la vista completa con encabezado y carril, algunas láminas densas conservan desplazamiento vertical.
- **Comprobaciones:** medición del árbol de accesibilidad, estilos calculados y dimensiones renderizadas. No se ejecutaron suites de pruebas.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** comprobar la composición en el modo de proyección de lámina usado en clase y ajustar si mantiene visibles encabezado y carril en pantallas de poca altura.

### 2026-09-29 — Inicio: hacer coherente la explicación del split y MDI en S02

- **Tarea o frente:** ajustar el texto del notebook a la división aleatoria por planeta elegida en la versión de trabajo y describir correctamente la importancia MDI del regresor.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; corrección puntual de notebook.
- **Alcance y archivos reservados:** notebooks/S02_arboles_decision_random_forest.ipynb y esta bitácora. Preservar la estructura y el split actual; sin ejecutar la consulta TAP ni guardar salidas.
- **Resultado:** pendiente.
- **Evidencia:** revisión estática de las celdas de división, evaluación, gráfico de importancia y texto introductorio.
- **Ideas y decisiones:** usar train_test_split como división aleatoria de planetas y dejar explícito que no reserva sistemas estelares completos.
- **Bloqueos:** ninguno.
- **Siguiente acción:** editar solo las explicaciones y etiquetas incompatibles y revisar el diff.

### 2026-09-29 — Cierre: split y MDI coherentes en el notebook S02

- **Tarea o frente:** alinear la descripción del conjunto de prueba y de la importancia de características con el código actual.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; corrección puntual y revisión estática.
- **Alcance y archivos:** notebooks/S02_arboles_decision_random_forest.ipynb y esta bitácora. Se preservó la división aleatoria por planeta que dejó la persona usuaria.
- **Resultado:** el texto y los títulos aclaran que el 20 % reservado son planetas y que sistemas estelares pueden aparecer en ambas partes. La explicación de MDI usa el criterio squared_error, define sus ecuaciones y distingue la importancia de entrenamiento de las métricas de prueba. Se explicitó el criterio en los bosques, se corrigió el comentario del tamaño mínimo de hoja y se retiró una importación de permutación que no se usaba.
- **Evidencia:** JSON válido, 21 celdas y 9 celdas de código; revisión estática confirmó que el ajuste usa entrenamiento y que MAE y R² se calculan contra y_test. Se conservaron las salidas existentes; no se ejecutó el notebook ni una consulta TAP.
- **Ideas y decisiones:** esta partición estima desempeño en planetas reservados al azar; no demuestra generalización a sistemas estelares completos que el modelo no vio.
- **Bloqueos:** la extracción y la ejecución completa en Colab no se comprobaron.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** revisar la explicación MDI en Colab junto con las salidas guardadas.

### 2026-09-29 — Inicio: afinar tamaños de la lámina S02 03.2

- **Tarea o frente:** corregir la escala tipográfica de los tres diagramas de Random Forest en la lámina `03.2`.
- **Responsable:** Codex integrador.
- **Tipo:** inicio; ajuste CSS focalizado y revisión visual.
- **Alcance y archivos reservados:** `src/components/react/s02/s02-forest-explainer.css` y esta bitácora. Sin cambios al contenido, navegación ni a las demás láminas.
- **Resultado:** en curso.
- **Evidencia:** la captura compartida muestra las etiquetas internas de los SVG ampliadas por el piso tipográfico de S02 y desbordando algunos recuadros.
- **Ideas y decisiones:** ajustar la escala de los textos internos al tamaño renderizado del `viewBox` y mantener las ilustraciones centradas dentro de cada tarjeta.
- **Bloqueos:** ninguno.
- **Siguiente acción:** ajustar los estilos de la explicación de bosque y revisar la lámina en el navegador local.

### 2026-09-29 — Cierre: afinar tamaños de la lámina S02 03.2

- **Tarea o frente:** corregir la escala tipográfica de los tres diagramas de Random Forest en la lámina `03.2`.
- **Responsable:** Codex integrador.
- **Tipo:** cierre; ajuste CSS y revisión visual.
- **Alcance y archivos:** `src/components/react/s02/s02-forest-explainer.css` y esta bitácora. Las demás láminas y el contenido permanecen intactos.
- **Resultado:** los SVG se centran con un ancho máximo de 27.5 rem y usan tamaños en sus unidades gráficas: etiquetas de 13 px, anotaciones de 12 px y cifras de 15 px. En escritorio, el texto de “irradiación” cabe en el recuadro de decisión. En móvil, se conservan tamaños adaptados y la composición apila las tarjetas.
- **Evidencia:** vista de escritorio a 2082×1010 con SVG de 440 px y etiquetas de 13 px; vista estrecha a 438×912 con las tarjetas apiladas y desplazamiento vertical. La presentación conserva el texto introductorio y la explicación de cada tarjeta.
- **Comprobaciones:** Prettier pasó. `npm run build:subpath` pasó y generó 9 páginas; conserva avisos existentes porque las colecciones de contenido están vacías. El primer build dentro del sandbox recibió `EPERM` al iniciar esbuild; la repetición local con permisos ampliados terminó correctamente. No se ejecutaron suites de pruebas.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** confirmar si el tamaño de las ilustraciones de `03.2` se siente equilibrado en proyección.

### 2026-09-29 — Inicio: alinear el cierre web y el enlace de retorno del notebook S02

- **Tarea o frente:** hacer coincidir la actividad y la estación de cierre con los resultados y el split por planeta del notebook; enlazar desde la última celda a la estación de cierre.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto; edición de notebook, contenido web y navegación directa.
- **Alcance y archivos reservados:** notebook S02, contenido y presentación React S02, especificación de la pregunta de predicción y esta bitácora. Preservar los cambios manuales existentes y no publicar ni subir commits.
- **Resultado:** la consigna y el cierre de S02 ahora describen la partición aleatoria 80/20 por planeta del notebook. La estación presenta las métricas guardadas de sus 306 planetas de prueba, explica el solapamiento posible de sistemas anfitriones y aclara que MDI no sustituye la evaluación. La última celda del notebook enlaza al cierre publicado; `?estacion=cierre` abre directamente la subestación 6.1.
- **Evidencia:** salida guardada del notebook: mediana MAE 4,897/R² −0,003; árbol 1,751/0,805; Random Forest con masa 1,673/0,814; Random Forest con masa e insolación 1,191/0,889. La interfaz local mostró Estación 6.1 y la misma tabla al abrir `?estacion=cierre`. `npm run build:subpath` generó 9 páginas; Prettier, ESLint y el validador de contenido pasaron para el alcance revisado. `git diff --check` detectó espacios finales en dos cambios previos de metadatos al inicio de esta bitácora; no señaló los archivos de la tarea.
- **Ideas y decisiones:** la partición actual es aleatoria por planeta (train_test_split); la página debe declarar ese alcance. El enlace de la última celda debe seleccionar directamente la primera subestación de Cierre.
- **Bloqueos:** Vitest y el runner de Playwright no pudieron iniciar sus procesos auxiliares por `spawn EPERM`; la prueba E2E puntual no alcanzó a ejecutarse. El gate global de formato reportó además artefactos generados y archivos ajenos ya modificados; el formato de los cuatro archivos web S02 sí pasó de forma aislada.
- **Siguiente acción:** revisión del usuario; repetir las pruebas unitarias y E2E cuando el entorno permita crear sus procesos auxiliares. No se hizo commit ni push.

### 2026-09-29 — Modo Lectura lineal para S02

- **Tarea o frente:** añadir a S02 un modo Lectura inspirado en la lectura lineal de S01.
- **Responsable:** Codex integrador.
- **Tipo:** cierre técnico propuesto; navegación de modos y edición de contenido web.
- **Alcance y archivos:** `docs/specs/interactions/s02-linear-reading-mode.md`, `src/components/react/s02/S02ReadingView.tsx`, `src/components/react/s02/s02-reading.css`, `src/components/react/S02LearningJourney.tsx` y esta bitácora. Sin commit, push ni publicación.
- **Resultado:** se añadió el selector Presentación/Lectura y una versión escrita que recorre las quince paradas con explicaciones ampliadas, índice navegable y los componentes interactivos existentes. `?modo=lectura` abre directamente Lectura; cambiar de modo conserva la parada activa. Los widgets se remontan y reinician sus valores locales al cambiar de modo.
- **Evidencia:** `npm run build` generó nueve páginas. Revisión en navegador de escritorio y viewport estrecho (433×937): índice completo, actividades presentes y sin desbordamiento horizontal. Prettier revisó sin cambios los componentes TSX y CSS de la tarea. El build conserva los avisos existentes por colecciones públicas vacías; no se ejecutaron suites de pruebas.
- **Ideas y decisiones:** la lectura sigue el orden de `s02Stops`; los widgets usan el mismo renderer y comportamiento en ambas vistas. La parada activa persiste al cambiar, mientras que el estado local de los widgets se reinicia por el montaje condicional.
- **Bloqueos:** ninguno.
- **Estado propuesto:** entregada para revisión docente.
- **Siguiente acción:** revisar la vista Lectura en `http://127.0.0.1:4321/sesiones/s02/?modo=lectura`.

### 2026-09-29 — Inicio I01: organizar observaciones de S00 y S01

- **Tarea o frente:** I01.
- **Responsable:** Codex integrador, con dos agentes de lectura separados para S00 y S01.
- **Tipo:** inicio y reserva de alcance.
- **Alcance y archivos reservados:** `docs/planning/agent-execution/tasks/I01.md`, `evidence/I01.md`, `BOARD.md`, `BITACORA.md`, `README.md`, `docs/architecture/COURSE_EVOLUTION.md` y `PLAN_REVIEW.md`. Las fuentes de S00/S01 se consultan en solo lectura.
- **Resultado:** revisión organizada por sesión; se excluyen cambios de producto y cualquier archivo que afecte S02.
- **Evidencia:** [`evidence/I01.md`](evidence/I01.md).
- **Ideas y decisiones:** identificar por separado los paquetes técnico y pedagógico de S00; reutilizar tareas existentes para evitar duplicados.
- **Bloqueos:** decisiones editoriales abiertas y dependencias existentes se conservan como abiertas.
- **Siguiente acción:** completar la matriz con las dos revisiones y registrar el cierre de I01.

### 2026-09-29 — Cierre I01: solicitudes S00/S01 organizadas

- **Tarea o frente:** I01.
- **Responsable:** Codex integrador; agentes `organize_s0` y `organize_s1` aportaron inventarios independientes.
- **Tipo:** cierre de revisión y planificación.
- **Alcance y archivos:** planificación y evidencia I01; sin cambios a paquetes fuente, `outbox/`, código, configuración, pruebas, notebooks o recursos de S02.
- **Resultado:** R01–R16 quedan agrupadas por sesión y frente; se distinguen los dos paquetes S00, los estados del tablero, las salidas editoriales abiertas y el orden F03/F04/G03/H01/H02.
- **Evidencia:** [`evidence/I01.md`](evidence/I01.md) y la [ficha I01](tasks/I01.md).
- **Ideas y decisiones:** las salidas `open` y los estados internos se mantienen hasta revisión editorial; la aceptación técnica no promueve contenido.
- **Bloqueos:** F03 continúa bloqueada; F04 y G03 siguen pendientes; H01/H02 esperan sus dependencias. El informe de regresión S00 citado es evidencia previa y no se reejecutó.
- **Estado propuesto:** entregada para revisión.
- **Siguiente acción:** resolver F03/F04 y la decisión editorial sobre los paquetes S00; después continuar G03, H01 y H02 según dependencias. No modificar S02.

### 2026-09-29 — I01: incorporar feedback docente visual de S00

- **Tarea o frente:** I01, ampliación de la trazabilidad de solicitudes S00.
- **Responsable:** Codex integrador.
- **Tipo:** avance documental.
- **Alcance y archivos:** `docs/planning/agent-execution/evidence/I01.md`, esta bitácora y la ficha I01. Solo se consultaron registros de S00; no se modificó S02.
- **Resultado:** se vinculó el feedback docente de la presentación del 15 sep. con los ajustes de escala tipográfica y las cuatro figuras de papers registradas el 27 sep. Se separaron las mejoras aplicadas de los puntos pendientes sobre marca de agua, legibilidad de módulos densos y formato reutilizable para docentes.
- **Evidencia:** [matriz I01](evidence/I01.md), [figuras de papers](evidence/S00-PAPER-FIGURES.md) e informe de regresión S00.
- **Ideas y decisiones:** las propuestas de la reunión no se trataron todas como acuerdos cerrados.
- **Bloqueos:** la revisión renderizada general en proyección y la decisión editorial sobre reutilización siguen pendientes.
- **Siguiente acción:** revisar las láminas densas en proyección y decidir con el equipo docente el formato de reutilización. Mantener S02 fuera del alcance.

### 2026-10-18 — Revisión documental de la reunión S02 sobre árboles y Random Forest

- **Tarea o frente:** revisión puntual de retroalimentación, sin ID asignado en `BOARD.md`.
- **Responsable:** Codex integrador.
- **Tipo:** revisión documental.
- **Alcance y archivos:** transcripción, resumen automático y notas manuscritas proporcionados por el usuario; lectura de `notebooks/S02_arboles_decision_random_forest.ipynb`; nueva evidencia de síntesis. Sin cambios al notebook, la interfaz, los datos ni el tablero.
- **Resultado:** se separaron recomendaciones respaldadas por marcas de tiempo, aclaraciones confirmadas por el usuario y propuestas exploratorias. Los ejes incluyen navegación global, ejemplo numérico de impureza, valores visibles en controles interactivos, visualización de regresión escalonada, diagrama de Random Forest, prefijo `cond_`, ocultamiento de warnings y un split por configuración del dataset.
- **Evidencia:** [síntesis de la reunión](evidence/S02-REUNION-RF-2026-09-29.md).
- **Ideas y decisiones:** `random_state=42` ya aparece en el notebook; el uso de `display` se acordó de forma selectiva. El usuario confirmó que la reunión recomendó ocultar warnings y dividir cada configuración por separado, con la misma semilla y proporción para comparar los mismos planetas. Unity, Gem y el taller infantil quedan como propuestas exploratorias.
- **Bloqueos:** la transcripción termina a 01:12:24 y atribuye todos los bloques a una sola persona; no permite confirmar la atribución individual ni el contenido posterior.
- **Siguiente acción:** usar la síntesis como guía si se solicita aplicar las recomendaciones; revisar los cálculos manuscritos antes de reutilizarlos.

## Ideas abiertas

### 2026-09-29 — Inicio de I02: legibilidad visual en S00 y S01

- **Tarea o frente:** I02, aplicar las mejoras tipográficas locales que organizó I01.
- **Responsable:** Codex integrador, con ejecución separada por sesión.
- **Tipo:** inicio.
- **Alcance y archivos:** `src/lib/s00-content.ts`, `src/components/react/S00LearningJourney.tsx`, `src/components/react/s00-learning-journey.css` y `src/components/react/s01-learning-journey.css`; ficha y evidencia I02. No se reservan tokens globales, `SlideRail` compartido ni archivos de S02.
- **Resultado:** se inicia el trabajo sobre texto alternativo, caption técnico y texto pequeño en diagramas y módulos densos. Los cambios se dividen por sesión para evitar colisiones.
- **Evidencia:** [I02](tasks/I02.md) y [registro I02](evidence/I02.md).
- **Ideas y decisiones:** se ajustará tipografía a los mínimos existentes en `VISUAL_SYSTEM.md`; las decisiones sobre marca de agua y reutilización docente permanecen abiertas.
- **Bloqueos:** ninguno identificado al inicio.
- **Siguiente acción:** completar los cambios locales, revisar el resultado renderizado y documentar cualquier pendiente editorial.

### 2026-09-29 — Avance de I02: diagramas y rótulos de proyección

- **Tarea o frente:** I02, corregir las discrepancias registradas y ampliar el texto pequeño de S00/S01.
- **Responsable:** Codex integrador; ejecución de CSS de S01 por agente asignado.
- **Tipo:** avance.
- **Alcance y archivos:** cuatro archivos locales de contenido/estilo de S00/S01, ficha y evidencia I02. Sin tokens globales, `SlideRail` compartido ni archivos S02.
- **Resultado:** se completaron el alt de HR 8799 y el ocultamiento del caption técnico en S00, manteniendo el nombre accesible del progreso. En Presentación se ampliaron y ajustaron rótulos del tránsito y la serie temporal; tarjetas y descripciones densas permiten envolver texto. S01 aplica mínimos de 13/15 px para metadatos/controles, 15 px en el mapa formal y 16 px en el tronco de señal.
- **Evidencia:** [I02](tasks/I02.md) y [revisión visual y límites](evidence/I02.md).
- **Ideas y decisiones:** las figuras de papers con créditos ya constan en I01. Sigue abierta la decisión sobre marca de agua y reutilización docente.
- **Bloqueos:** la escena S01 no se pudo revisar renderizada porque el navegador permaneció en Bibliografía pese a cargar `#senal`; no se afirma aceptación visual completa.
- **Siguiente acción:** revisar las escenas S01 modificadas en un estado navegable del navegador; después actualizar el tablero y cerrar AC3/AC5 con evidencia. No modificar S02.



Estas ideas no son todavía requisitos ni cambios aprobados:

| Fecha | Propuesta | Responsable de valorar | Estado |
|---|---|---|---|
| 2026-09-08 | Mantener una entrada breve de inicio y cierre para cada tarea, con una sola siguiente acción verificable. | Integrador | Propuesta |
| 2026-09-08 | Usar la bitácora para anotar decisiones pedagógicas y editoriales que después puedan convertirse en una actualización de `CONTRACTS.md`, una tarea o una salida a `outbox/`. | Integrador y revisión editorial | Propuesta |
| 2026-09-27 | Crear una skill de voz editorial con ejemplos aprobados, tono, ritmo y reglas para redactar los materiales del curso con estilo propio. | Responsable de D04 y revisión editorial | Propuesta |

### 2026-10-18 — Inicio I04: libro interactivo

- **Responsable:** Codex integrador.
- **Autorización:** solicitud directa de organizar todo el modo Lectura y escribir las explicaciones que dependían del profesor.
- **Alcance/reservas:** componentes de lectura S00–S02, prosa propia del libro, fallback sin JavaScript, estilos comunes de lectura, ficha, guía y pruebas. Se preserva el trabajo previo de I02/I03.
- **Decisión editorial:** capítulos con exposición propia y correspondencia explícita a las unidades; ejemplos razonados antes de explorar, comprobación de comprensión y referencias finales. [Inventario I04](tasks/I04.md) y [ficha](../../specs/interactions/session-book-reading.md).
- **Siguiente acción:** implementar con `develop-mlcp-web`, comprobar navegación y lectura autónoma. Sin commit, push ni publicación.

### 2026-10-19 — Cierre I04: veinte capítulos de libro interactivo

- **Responsable:** Codex integrador.
- **Resultado:** S00/S01 con siete capítulos y S02 con seis; prosa autónoma, veinte ejemplos resueltos, respuestas razonadas, transiciones y fuentes. La exposición esencial se conserva con modo docente apagado y sin JavaScript. Cada exploración incluye consigna e interpretación; la presentación conserva sus unidades y enlaces.
- **Decisiones:** `READING_BOOK.md` fija el criterio y la guía de creación lo incorpora; ADR-0003 aclara la correspondencia de unidades entre modalidades. La ficha histórica de lectura S02 queda sustituida por `session-book-reading`. El desplazamiento inmediato evita cambios accidentales de capítulo al volver a los controles superiores.
- **Comprobaciones:** 118 unitarias con cobertura; builds raíz/subruta; 69 E2E/axe/movimiento reducido bajo `/preview`, y 11 comprobaciones finales de accesibilidad en raíz. Doce capturas locales escritorio/móvil; corregidos contraste y retorno a presentación. [Evidencia I04](evidence/I04.md).
- **Problema de entorno:** la consulta Docker está denegada en el sandbox y no responde fuera de él; se detiene sin iniciar ni modificar el motor. Los baselines Linux conservan su gate pendiente.
- **Estado propuesto:** I04 `entregada` para revisión del usuario/tutor; archivos liberados. Aceptación editorial/científica y comparación visual Linux pendientes. No se hicieron commit, push ni publicación.
- **Siguiente acción:** leer y valorar un capítulo completo en la vista local; revisar las ubicaciones bibliográficas pendientes. [Propuesta al vault](../../../outbox/2026-10-19-lectura-libro-interactivo.md); el vault no se modificó.

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

### 2026-10-18 — Inicio I03: retroalimentación RF y autoría S00–S02

- **Responsable:** Codex integrador.
- **Autorización:** plan completo solicitado por el usuario; portada 0, referencias al final y recorrido guiado antes de explorar.
- **Alcance/reservas:** navegación y contenido S00–S02, notebook S02, componentes comunes, contratos/protocolos, skills canónicas/espejos y pruebas afectadas. Los cambios existentes de I02 son la base de integración.
- **Siguiente acción:** implementar por subsistema y registrar matriz AC1–AC6 en evidencia I03. Sin commit, push ni publicación.

### 2026-10-18 — Avance I03: recorrido común, explicación RF y notebook

- **Responsable:** Codex integrador.
- **Alcance:** archivos reservados en I03; se conservaron los cambios previos de I02 y del checkout.
- **Resultado:** portadas iniciales y fuentes finales en S00–S02, roles explícitos, adaptadores de navegación y controles comunes; ejemplo guiado de Gini antes de explorar entropía; regresión con residuos/SSE/MSE y bosque con variables por nodo y agregación por tarea. Notebook con warnings ocultos, imports reunidos, `cond_`, dos splits alineados, salidas selectivas y guía de parámetros.
- **Comprobaciones:** 116 unitarias y 53 pruebas E2E/axe/movimiento reducido en raíz y subruta; comparación del notebook anterior y modificado en kernels nuevos sobre la misma instantánea (1529 casos, 306 de prueba, índices y métricas idénticos). Los retoques visuales agregaron comprobaciones de posición del footer y de ausencia de solapamiento en las tarjetas del bosque.
- **Decisiones:** ADR-0003 reemplaza la ubicación inicial de bibliografía. Protocolos, guía, plantillas y skills activos actualizados. Las cinco skills están sincronizadas en ambos espejos; `validate:skills:strict` resuelve el defecto abierto de D04. La revisión navegable de S01 `#senal` que faltaba en I02 se comprueba en I03.
- **Evidencia:** [matriz I03](evidence/I03.md) y [registro del notebook](evidence/I03-notebook-validation.json); logs y 21 capturas locales en carpetas ignoradas. [Salida al vault](../../../outbox/2026-10-18-s02-feedback-and-authoring.md), sin editar el vault.
- **Problema de entorno:** Docker Desktop falla al abrir `dockerInference`; no permite generar baselines en la imagen Linux fijada. Se conserva ese gate pendiente y no se aprueban goldens Windows.
- **Estado propuesto:** implementación local revisable; I03 permanece `en curso` hasta cerrar AC6 y la revisión. D04 pasa a `entregada`, con aceptación editorial pendiente. «Caso aplicativo» conserva su incertidumbre.
- **Siguiente acción:** revisar las pantallas con el usuario/tutor; cuando el motor Docker funcione, ejecutar actualización visual Linux, revisar capturas y repetir comparación. No se hicieron commit, push ni publicación.

### 2026-10-19 — Inicio: paquete de entrada S03 sobre tránsitos y métricas

- **Tarea o frente:** transferencia Obsidian → inbox, S03.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos:** nuevo paquete inbox/sessions/S03-de-un-transito-a-las-metricas/, recursos de revisión locales inbox-private/sessions/S03-de-un-transito-a-las-metricas/, índice del inbox y esta bitácora. docs/content/, notebooks, ejercicios publicados y estado de Git quedan fuera del alcance.
- **Autorización:** solicitud directa del usuario para enviar toda la información necesaria al inbox del repo.
- **Decisión de procedencia:** conservar literalmente el guion y la nota de métricas. Guardar localmente las figuras del artículo bajo inbox-private/ porque la licencia consultada de arXiv no expresa permiso abierto de reutilización; incluir en el inbox rastreable la figura didáctica propia.
- **Siguiente acción:** completar el paquete, registrar su fila en el índice y verificar copias, recursos y cambios del repo. Sin commit, push ni publicación.

### 2026-10-19 — Cierre: paquete S03 transferido al inbox interno

- **Tarea o frente:** transferencia Obsidian → inbox, S03.
- **Responsable:** Codex integrador.
- **Tipo:** cierre.
- **Alcance y archivos:** inbox/sessions/S03-de-un-transito-a-las-metricas/, fila de inbox/INDEX.md, esta bitácora e imágenes de consulta local en inbox-private/sessions/S03-de-un-transito-a-las-metricas/.
- **Resultado:** se copió el guion literal de 48 032 bytes y la nota conceptual literal de 10 919 bytes; hashes SHA-256 coinciden con DASAN. Se añadió manifiesto, README y ficha de figuras. La curva didáctica propia acompaña el paquete rastreable; las cinco figuras del artículo están en la carpeta privada ignorada.
- **Evidencia:** git check-ignore confirmó la regla inbox-private/. El paquete permanece con status: drafting, visibility: internal, publish_ready: false y rights: pending. docs/content/ no cambió. El checkout ya contenía cambios locales de otras tareas; se conservaron.
- **Estado propuesto:** transferencia completa; revisión científica/editorial y de derechos pendiente.
- **Siguiente acción:** revisar el paquete y resolver derechos antes de derivar contenido para docs/. Sin commit, push ni publicación.

### 2026-10-19 — Inicio: revisión y propuesta de implementación S03

- **Tarea o frente:** revisar el nuevo paquete S03 y proponer su aterrizaje educativo y web.
- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Alcance y archivos reservados:** esta bitácora y una propuesta de revisión en `outbox/`; lectura del paquete S03, contratos y componentes reutilizables. Se conservan los cambios locales existentes.
- **Autorización:** solicitud del usuario de revisar la sesión y explicar cómo implementarla.
- **Siguiente acción:** contrastar guion, conceptos, fuentes y figuras; entregar secuencia, interacciones y fases como propuesta abierta. Sin implementar la web ni promover contenido.

### 2026-10-19 — Cierre: revisión y propuesta web de S03

- **Tarea o frente:** revisión del paquete S03 y propuesta de implementación.
- **Responsable:** Codex integrador.
- **Tipo:** revisión y cierre.
- **Resultado:** propuesta abierta de siete estaciones y tres interacciones (tránsito/flujo, preparación y vistas, laboratorio de umbrales/matriz/PR/ROC). Lectura autónoma, presentación y actividades mantienen correspondencia. Se identificaron cronograma inconsistente, denominador de la línea base, distinción entrenamiento/inferencia, conceptos pendientes y estado documental histórico.
- **Evidencia:** [revisión y propuesta S03](../../../outbox/2026-10-19-s03-revision-propuesta-web.md). Leídos guion, manifiesto, concepto y figuras; inspeccionadas ROC propia y Figura 3 local. Contraste acotado con artículo v1, secciones 3–5, y revisión de componentes/contratos vigentes.
- **Comprobaciones:** recálculo independiente de matrices para umbrales 0,80 y 0,50, extremos con cero/todas predicciones positivas, AUC por pares 8/9 y baseline de catálogo 12 137/15 737. La propuesta es documental; no se ejecutaron gates de aplicación ni se atribuyen pruebas web nuevas.
- **Estado propuesto:** revisión entregada al usuario; implementación y decisiones editoriales abiertas. No se cambia el tablero de implementación ni el manifiesto del paquete. Archivos liberados.
- **Siguiente acción:** usuario/tutor valora recorrido y núcleo interactivo; convertir después el alcance elegido en tareas y fichas. Sin cambios en vault, código, contenido público, commit, push o publicación.

### 2026-10-19 — Inicio: storyboard de la presentación S03

- **Responsable:** Codex integrador.
- **Tipo:** inicio.
- **Autorización y alcance:** el usuario precisa una presentación como las existentes y pide ver cada estación, su composición visual y el uso de figuras/información del paper.
- **Archivos reservados:** nueva propuesta de storyboard en `outbox/`, enlace desde la propuesta anterior y esta bitácora. Las imágenes privadas se inspeccionan sin modificar.
- **Decisión de trabajo:** concretar portada, siete estaciones, subdiapositivas y referencias con la plantilla común; la primera propuesta funcional queda subordinada a este recorrido de presentación.
- **Siguiente acción:** entregar el guion visual completo, con figuras 3/6/11 en el recorrido y 8/10 como ampliaciones propuestas.

### 2026-10-19 — Cierre: storyboard visual de S03

- **Responsable:** Codex integrador.
- **Tipo:** revisión y cierre.
- **Resultado:** propuesta de presentación con portada, siete estaciones, 24 subdiapositivas y referencias (26 pantallas base); dos ampliaciones opcionales. Figuras 3/6/11 en el recorrido principal y 8/10 en ampliaciones, con lectura guiada, anotaciones externas, escalas y fuente visibles.
- **Evidencia:** [storyboard de presentación](../../../outbox/2026-10-19-s03-storyboard-presentacion.md). La propuesta anterior enlaza el storyboard como actualización de la secuencia tras la aclaración del usuario.
- **Comprobaciones:** inspección de las cinco figuras del paper; recuento de 24 IDs base únicos y existencia de las cinco imágenes; coherencia con el marco común, roles visuales y cierre bibliográfico. Sin generación o edición de imágenes ni implementación/pruebas de aplicación.
- **Estado propuesto:** diseño entregado para revisión del usuario; derechos de las figuras conservan su pendiente antes de una incorporación pública. Archivos liberados; estados de implementación sin cambios.
- **Siguiente acción:** valorar estaciones y partes del storyboard; desarrollar luego la presentación con el alcance acordado.

### 2026-10-19 — Inicio S03: implementación coordinada con tres agentes Luna max

- **Responsable:** Codex integrador y agentes `s03_geometria`, `s03_datos_visuales`, `s03_metricas_integracion` (gpt-6-luna, esfuerzo max), por instrucción expresa del usuario.
- **Tipo:** inicio.
- **Autorización:** diseño final de nueve estaciones aprobado; el usuario pide hacer seguimiento y coordinar la ejecución completa.
- **Alcance:** 33 pantallas base, animación geométrica, datos Kepler, imágenes realistas, clasificación, matriz, siete métricas y curvas, resultados y lectura/fallback. La secuencia final sustituye las propuestas anteriores de siete estaciones.
- **Reservas:** geometría: `s03-transit` y componentes `S03Transit*`; datos: `s03-content`, `S03ScienceScenes`, datos/recursos S03; métricas: `s03-metrics`, `S03EvaluationScenes`. Integrador: wrapper/navegación, lectura, configuración/disponibilidad, pruebas de integración, imágenes generadas, tablero, bitácora y evidencia. Cada bloque reserva también sus estilos, ficha y pruebas específicas.
- **Criterios:** preservar cambios locales preexistentes; no modificar vault ni publicar. Figuras privadas del artículo conservarán derechos pendientes y enlaces acreditados hasta disponer de autorización de reutilización.
- **Siguiente acción:** implementar bloques en paralelo, integrar contratos y ejecutar comprobaciones científicas, funcionales y visuales.

### 2026-10-19 — Entrega S03: integración, seguimiento y comprobaciones

- **Responsable:** Codex integrador, con tres agentes gpt-6-luna/esfuerzo max. Geometría entregó el modelo y tres escenas; datos entregó registro editorial, escenas científicas y muestra observada; métricas entregó evaluación, siete métricas y curvas. El integrador revisó contratos, devolvió defectos concretos, coordinó reservas y congeló los bloques antes del cierre.
- **Resultado:** 33 pantallas en nueve estaciones, libro de nueve capítulos con 31 instrumentos y fallback completo; recursos con procedencia y leyendas. Marco común de portada, carril y controles. Disponible como prototipo interno en `/sesiones/s03/` y vista previa local bajo `/preview`.
- **Decisiones y correcciones:** se resolvieron captura diferida del evento de slider, IDs y regiones repetidas, contraste en Lectura, jerarquía de títulos, `withBase` en recursos, incertidumbres sin inflación visual, ticks numéricos, identificación del segundo tránsito Kepler-10, hash reproducible tras formato y YAML del paquete. Las dos propuestas de siete estaciones quedaron diferidas e identificadas como históricas. Se añadió bibliografía primaria de geometría; las figuras del paper siguen enlazadas mientras se revisan derechos.
- **Comprobaciones:** calidad global y gates de contenido/ejemplos/skills; 190/190 unitarias con cobertura superior a umbrales; builds raíz y `/preview`; 15/15 controles S03 en cada montaje; 16 regresiones de Lectura S00–S02; 44 capturas en cuatro tamaños. Un build separado probó exclusión real al desactivar S03 y restauró la configuración byte por byte. El FITS conserva advertencias de checksum internas y hashes coincidentes con dos descargas; no se presenta como validación limpia.
- **Evidencia:** [I05](evidence/I05.md), fichas `s03-*`, manifiestos/guías y [retorno para revisión](../../../outbox/2026-10-19-s03-implementacion-integrada.md). Capturas y reporte en `output/playwright/`; cobertura en `coverage/`.
- **Estado propuesto:** I05 `entregada`, revisión usuario/tutor pendiente. Goldens Linux pendientes: sandbox deniega acceso Docker y la consulta fuera del sandbox no responde; se detuvo. No se aprobaron baselines Windows. En ventanas bajas las escenas densas permiten desplazamiento vertical.
- **Siguiente acción:** revisión editorial/científica con el usuario; ejecutar comparación Linux cuando el motor esté disponible. Sin cambios en el vault, commit, push ni despliegue. Archivos de agentes liberados; cambios locales preexistentes preservados.

### 2026-10-19 — Comparación visual de S03 con S02

- **Responsable y alcance:** Codex integrador; el usuario pide comparar las sesiones y aclarar el uso de la guía visual. Reserva documental: esta bitácora y evidencia/estado I05. Sin cambios de código, nuevas imágenes o publicación.
- **Revisión:** páginas locales de clasificación y cálculos en ambas sesiones, sistema visual, guía de assets y brief S03. Se usaron pestañas temporales; la pestaña original del usuario se conserva.
- **Hallazgo:** S03 comparte componentes y tokens, pero altera el marco, uniforma el carril como datos, separa explicación y objetos y muestra cálculos como listas/código. La navegación fija y la altura de escena dificultan comprender algunas relaciones en el primer encuadre. Las imágenes siguen el medio y la procedencia exigidos, con familia realista declarada, pero su integración didáctica se aleja de S02.
- **Evidencia:** [revisión visual I05](evidence/I05-VISUAL-REVIEW.md). La entrega funcional y las pruebas previas conservan su alcance; la coherencia visual requiere corrección y no se considera aceptada por esos resultados.
- **Siguiente acción propuesta:** reconstruir tres escenas piloto sobre la composición de S02 —geometría, clasificación de una señal y precision— y extender el patrón tras comparar a igual viewport. La secuencia aprobada y el realismo solicitado se preservan.

### 2026-10-19 — Corrección de composición visual S03

- **Responsable:** Codex integrador.
- **Tipo:** corrección posterior a comparación.
- **Autorización y alcance:** el usuario pide organizar la corrección tras comparar S03 con S02. Se ajustan marco, carril, pantallas 1.1/1.2, 4.1 y precision, además de sus fichas y evidencia. Se conservan los cambios preexistentes y la secuencia aprobada.
- **Resultado:** S03 retiene la estructura de presentación compartida y el carril semántico; se corrige el scroll de la ventana del carril; 1.1 abre con definición de tránsito y enlaza repetición con período y profundidad con razón de radios; 4.1 representa la clasificación de una TCE de curva a umbral; precision construye TP/(TP+FP) con PC-01 y NEG-01 desde una matriz separada. Las ilustraciones realistas conceptuales acompañan los diagramas diagnósticos propios; figuras del artículo siguen enlazadas hasta resolver derechos.
- **Verificación:** `npm run check` completado con 0 errores, 0 advertencias y 0 hints; quedan avisos auxiliares previos del repositorio. Build `/preview` y comprobación visual final en escritorio/móvil se completan antes del cierre. Evidencia: [I05](evidence/I05.md), [revisión visual](evidence/I05-VISUAL-REVIEW.md), fichas `s03-transit`, `s03-science-scenes` y `s03-evaluation`.
- **Estado propuesto:** I05 entregada para revisión usuario/tutor; no aceptada todavía. Goldens Linux pendientes. Sin cambios en vault, commit, push o despliegue.
- **Siguiente acción:** terminar el build `/preview`, verificar vistas 1.1, 1.2, 4.1 y 7.3 a 1280×720, y revisar 1.1 y 7.3 a 390×844.

### 2026-10-20 — Verificación final de composición S03

- **Responsable:** Codex integrador. Al consultar el seguimiento, geometría y métricas ya estaban completados; el agente `s03_datos_visuales` había alcanzado su límite de uso y no pudo cerrar la coordinación. El integrador completó las verificaciones visuales restantes.
- **Resultado:** 1.1, 1.2, 1.3, 4.1 y 7.3 caben en el primer cuadro de 1280×720 sin desplazamiento interno. Las pruebas a 390×844 de tránsito, clasificación y precision no muestran desbordamiento horizontal. Se confirma el marco común de S02, la definición de tránsito, el enlace geométrico entre modelo y señal, la clasificación de la TCE ficticia y la construcción interactiva de precision.
- **Controles comprobados:** el preset sin tránsito presenta `b = 1.20 R*`, `F/F₀ = 1.000` y `ΔF = 0.00 %`; el perfil de oscurecimiento al limbo cambia el flujo; subir el umbral a `0.95` cambia la predicción de TP a FN mientras PC queda como referencia; mover PC-01 actualiza y permite restaurar matriz, conteos e interpretación.
- **Comprobaciones:** `npm run check` y `npm run build:subpath` pasan; se generaron 10 páginas. Las suites S03 de clasificación y evaluación pasan 41 pruebas. La repetición completa encontró `EPERM` con el temporal de Windows y quedó sin progreso por más de dos minutos al reubicarlo; el pase previo 190/190 sigue como evidencia de su propia ejecución. Revisión: [I05](evidence/I05.md) y [comparación visual](evidence/I05-VISUAL-REVIEW.md).
- **Estado propuesto:** I05 continúa `entregada` para revisión del usuario/tutor. Goldens Linux, aceptación editorial y revisión científica permanecen pendientes. Sin cambios en vault, commit, push ni despliegue.
- **Siguiente acción:** revisión editorial con el usuario en la vista local `/preview/sesiones/s03/`.

### 2026-10-20 — Ajustes de portada S03 según comentarios del usuario

- **Responsable:** Codex integrador.
- **Alcance y reserva:** aplicar tres observaciones sobre la portada de S03 en `SessionOpening.tsx`, `session-presentation.css`, `session-openings.ts` y la prueba integrada; registrar la evidencia en I05. Se conservan los demás cambios locales.
- **Resultado:** se retiró la instrucción redundante sobre los controles; el recorrido se rediseñó con cuatro hitos numerados y conectores, en línea para escritorio y vertical en móvil; el pie de imagen ahora dice «Ilustración generada con IA.»
- **Comprobaciones:** `npm run check` pasó con 0 errores, 0 advertencias y 0 hints en Astro; `S03LearningJourney` pasó 4/4 con Vitest y cobertura desactivada para aislar el pase; `npm run build:subpath` generó 10 páginas. Revisión de portada a 1074×884 y 390×844: sin desbordamiento horizontal.
- **Evidencia y estado:** [revisión visual I05](evidence/I05-VISUAL-REVIEW.md). Corrección aplicada; I05 sigue entregada para revisión del usuario/tutor. Sin cambios en el vault, commit, push o despliegue.
- **Siguiente acción:** revisar la portada en la vista local `/preview/sesiones/s03/#portada`.

### 2026-10-20 — Ajustes de animación orbital S03 según comentarios del usuario

- **Responsable y alcance:** Codex integrador; atender cinco comentarios sobre la pantalla 1.1: reducir espacio vacío en la curva, enriquecer el disco estelar, simplificar controles, corregir la señal del observador y nombrar la vista frontal.
- **Resultado:** la curva aprovecha mejor el panel y rotula el eje ampliado; la animación usa reproducir/pausar, reiniciar y fase; el observador queda en `+z` mirando `−z` con marcador `×`, y el texto dice que vemos el tránsito de frente. Se integró una estrella realista generada con IA manteniendo órbita y anotaciones en SVG.
- **Comprobaciones y límites:** `npm run check` pasó (163 archivos Astro, 0 errores/advertencias/hints; dos avisos preexistentes en otros paquetes) y `npm run build:subpath` compiló 10 páginas. Vista local de 1.1 revisada a 1280×720. La comparación de fondo claro y otros tamaños de esta imagen nueva sigue pendiente; la vista temporal `data:` fue rechazada por la política del navegador. La suite E2E nueva queda pendiente: Playwright no avanzó al conectarse al preview y se canceló sin resultado de prueba. Las unitarias S03 de tránsito pasaron 7/7 y la suite completa, 192/192, en la corrida ya registrada. Detalle: [revisión de tránsito 1.1](evidence/S03-TRANSIT-1.1-REVISION.md).
- **Estado propuesto:** corrección aplicada; I05 continúa entregada para revisión del usuario/tutor, sin aceptación editorial implícita. Sin cambios en vault, commit, push ni despliegue.
- **Siguiente acción:** revisar la pantalla 1.1 en `/preview/sesiones/s03/#s03-transit-1`; si el aspecto de la estrella convence, revisar su render sobre fondo claro y completar la prueba E2E cuando el servidor de Playwright esté disponible.

### 2026-10-20 — Imagen ampliable de Kepler en S03

- **Responsable y alcance:** Codex integrador, a partir de la solicitud del usuario; reemplazar la imagen de la nave en la estación 2.1 por NASA PIA18904 y garantizar una vista íntegra, ampliable y con fuente visible.
- **Resultado:** la pantalla usa el concepto artístico NASA/JPL de Kepler durante K2, en una miniatura 5:4 con `object-fit: contain`. La estación ubica misión y contexto a la izquierda e imagen a la derecha; en móvil la imagen aparece primero. Al activarla abre un diálogo con el original completo, crédito, fecha, resolución y enlace NASA; Cerrar, Escape y fondo lo cierran, y el foco regresa al enlace. El JPEG también queda como fallback directo sin JavaScript.
- **Procedencia:** ficha [PIA18904](https://science.nasa.gov/image-detail/amf-pia18904/) y directrices de [uso de imágenes NASA](https://www.nasa.gov/nasa-brand-center/images-and-media/). La ficha se presenta como concepto artístico, con crédito NASA/JPL; no se rotula como observación ni fotografía de operación. Archivo local: `public/images/s03/kepler-k2-artist-concept-nasa.jpg`; ficha del curso: [s03-kepler-image](../../guides/s03-kepler-image.md).
- **Comprobaciones:** `npm run check` pasó: Prettier, ESLint, Astro (163 archivos; 0 errores, advertencias o hints), contenido, ejemplos y espejos de skills. `S03ScienceScenes.test.tsx`, 30/30, y `S03EvaluationScenes.test.tsx`, 12/12, tras integrar las correcciones de la estación de métricas. `npm run build:subpath` compiló 10 páginas. Revisión en navegador con vista de 1280×720 y 390×844: imagen nativa de 1920×1536, proporción íntegra, fuente legible en el diálogo y retorno de foco tras Escape. Capturas: `output/playwright/s03/kepler-pia18904-dialog-1280x720.png` y `output/playwright/s03/kepler-pia18904-dialog-390x844.png`. La suite E2E por CLI quedó sin respuesta del servidor de comprobación y se interrumpió; esa ejecución no se reporta como aprobada.
- **Evidencia y estado:** [procedencia](../../guides/s03-kepler-image.md), [especificación de ampliación](../../specs/interactions/s03-kepler-image-lightbox.md), [evidencia I05](evidence/I05.md). I05 sigue entregada para revisión del usuario/tutor; quedan pendientes la revisión de zoom y goldens Linux. Sin cambios en el vault, commit, push ni publicación.
- **Siguiente acción:** revisar la estación 2.1 en `/preview/sesiones/s03/#s03-mission-1`.
### 2026-10-20 — Inicio: revisión amplia de imágenes e interacciones S03

- **Responsable:** Codex integrador.
- **Solicitud:** integrar imágenes originales del paper con citas, extender animación y estilo a todas las diapositivas, mejorar el tramo final con información, diagramas e interacción, hacer visible el oscurecimiento al limbo y explicar conceptos al pulsar `?`.
- **Alcance reservado:** `src/components/react/S03LearningJourney.tsx`, componentes y estilos `src/components/react/s03/`, `src/lib/s03-content.ts`, pruebas S03, fichas de interacción, guía y manifiesto de figuras, evidencia I05, BOARD y esta bitácora. Se preservan los demás cambios locales.
- **Procedencia visual:** cinco figuras originales de Shallue y Vanderburg (2017) ya descargadas desde la versión HTML del artículo y verificadas localmente; cada reproducción tendrá autoría, número de figura y enlace a la fuente, además de ampliación completa.
- **Estado:** en curso; el detalle de uso y pruebas se registrará al cerrar.
- **Siguiente acción:** completar primero las fichas de las nuevas interacciones y después integrar y revisar las escenas.

### 2026-10-20 — Cierre: figuras, animación e interacción S03

- **Responsable y alcance:** Codex integrador; revisión amplia pedida por el usuario sobre figuras originales, continuidad visual, resultados, limbo y conceptos contextuales.
- **Resultado:** Figuras 3, 6, 8, 10 y 11 incorporadas completas con cita visible y diálogo de ampliación; mini tránsito y caída de flujo acompañan las estaciones posteriores; el perfil de oscurecimiento al limbo se representa con discos e intensidad normalizada y sigue el control; las ayudas `?` definen conceptos en el contexto de la sesión. Las pantallas finales comparan Accuracy/ROC-AUC y permiten recorrer la selección 513 → 30 → 9 junto a las figuras 8, 10 y 11 y la cadena de validación.
- **Comprobaciones:** 54/54 pruebas unitarias S03; `npm run check` pasó (Prettier, ESLint, Astro sin errores/advertencias/hints, contenido, ejemplos y skills); `npm run build:subpath` compiló 10 páginas; Playwright S03 pasó 17/17 pruebas funcionales, axe y movimiento reducido sobre `/preview`. Inspección directa a 1280×900 de las pantallas 1.2, 9.1 y 9.2, Figuras 6 y 11 ampliadas, ayuda de parámetro de impacto y control visual del limbo.
- **Estado propuesto:** I05 entregada para revisión editorial; goldens Linux y aceptación del usuario/tutor pendientes. Evidencia ampliada en [I05](evidence/I05.md) y fuentes/activos en [guía de figuras](../../guides/s03-paper-figures.md). Vista local: `http://127.0.0.1:4327/preview/sesiones/s03/`.
- **Siguiente acción:** revisar la sesión en la vista previa y registrar las correcciones editoriales que indique el usuario. Sin cambios en el vault, commit, push o publicación.

### 2026-10-20 — Inicio: compactar encabezado de presentación S03

- **Responsable:** Codex integrador.
- **Solicitud:** el usuario señala que el encabezado y el carril superiores ocupan demasiado alto en la diapositiva 1.1; propone plegarlos y dejar visibles el título de sesión, el número de diapositiva y un control para desplegar.
- **Alcance reservado:** `src/components/react/S03LearningJourney.tsx`, `src/components/react/s03-learning-journey.css`, `docs/specs/interactions/s03-presentation.md`, `docs/planning/agent-execution/evidence/I05-VISUAL-REVIEW.md` y esta bitácora. Se preservan los demás cambios locales.
- **Decisión de trabajo:** usar un disclosure nativo cerrado por defecto solo en Presentación; al abrirlo quedan accesibles el encabezado completo, sus acciones y el carril. Lectura y Actividades conservan su encabezado actual; los controles globales anterior/siguiente permanecen visibles.
- **Estado:** en curso. Se revisará la composición en la vista previa horizontal de 1280×720 y en el ancho móvil antes del cierre.
- **Siguiente acción:** implementar el resumen plegable y documentar el comportamiento en la ficha de S03.

### 2026-10-20 — Cierre: compactar navegación superior de S03

- **Responsable:** Codex integrador.
- **Resultado:** en Presentación, el título de sesión, el contador `n / 33` y un control con chevrón ocupan una franja compacta. El disclosure nativo devuelve la pregunta, todos los accesos de sesión y `SlideRail`; Lectura y Actividades mantienen el encabezado completo. El pie Anterior/Siguiente permanece visible.
- **Evidencia:** inspección manual de los estados cerrado y desplegado en la vista previa; [revisión visual I05](evidence/I05-VISUAL-REVIEW.md). Ficha actualizada en [S03 — Presentación](../../specs/interactions/s03-presentation.md).
- **Comprobaciones:** Prettier pasó en los cinco archivos reservados; `npm run build:subpath` terminó y generó 10 páginas, con avisos de las colecciones editoriales vacías. No se ejecutaron suites de prueba. La adaptación móvil quedó implementada por CSS, pendiente de inspección visual a 390×844.
- **Estado propuesto:** corrección entregada para revisión del usuario; I05 sigue `entregada` y pendiente de revisión editorial. Sin cambios en vault, commit, push o publicación. Archivos liberados.
- **Siguiente acción:** revisar el encabezado plegado en la vista S03; si aprueba la composición, incorporar las demás observaciones de layout de esta sesión.

### 2026-10-20 — Inicio: mostrar oscurecimiento al limbo en el disco principal

- **Responsable:** Codex integrador.
- **Solicitud:** retirar el diagrama auxiliar de comparación del limbo y hacer que el control cambie de forma visible el brillo radial del disco estelar de la escena 1.2.
- **Alcance reservado:** `S03TransitGeometry.tsx`, `s03-transit.css`, `S03Transit.test.tsx`, `s03-transit.md`, evidencia I05 y esta bitácora. Se conservan los demás cambios locales.
- **Estado:** en curso; verificar con pruebas que el mismo disco y la curva reaccionen al control, y revisar la escena en navegador.
- **Siguiente acción:** integrar el gradiente radial directo, quitar la figura auxiliar y validar los estados uniforme/limbo.

### 2026-10-20 — Cierre: oscurecimiento al limbo en el disco principal

- **Resultado:** se eliminó el diagrama auxiliar; el control ahora transforma el disco principal de brillo uniforme a gradiente radial opaco, con intensidad normalizada 1 en el centro y 0,4 en el borde para `u=0,6`. La curva comparte el perfil y la opción «Uniforme» restaura el disco plano. La ficha y evidencia I05 describen el comportamiento actualizado.
- **Comprobaciones:** `npm run check`, `npm run build:subpath` y las 9 pruebas de `S03Transit.test.tsx` pasaron. En navegador comprobé el perfil activo, los siete niveles radiales, la curva y la ausencia de la comparación separada. E2E por CLI quedó sin respuesta del servidor local y no se cuenta como pase.
- **Estado propuesto:** corrección aplicada para revisión del usuario; I05 continúa entregada, con aceptación editorial pendiente. Sin cambios en el vault, commit, push o publicación. Archivos liberados.
- **Siguiente acción:** revisar la pantalla 1.2 en `/preview/sesiones/s03/#s03-transit-2`.

### 2026-10-20 — Inicio: replantear la pantalla 1.3 de S03

- **Responsable:** Codex integrador.
- **Solicitud:** presentar una serie temporal más parecida a una curva fotométrica observada, con muchos puntos, ruido y varias caídas; retirar los controles locales y explicar que una caída aislada admite varias causas, mientras que una forma repetida con periodicidad orienta una hipótesis sobre su origen.
- **Alcance reservado:** `src/components/react/s03/S03TransitMetrics.tsx`, `src/components/react/s03/s03-transit.css`, `src/lib/s03-content.ts`, `docs/specs/interactions/s03-transit.md`, `src/components/react/s03/S03Transit.test.tsx`, evidencia I05 y esta bitácora. Se preservan los demás cambios locales.
- **Decisión de trabajo:** representar una serie sintética, identificada como tal y sin controles de escena; distinguir hipótesis de confirmación y nombrar causas alternativas compatibles con una señal periódica.
- **Estado:** en curso.
- **Siguiente acción:** reemplazar la línea temporal idealizada, actualizar la ficha y verificar el contenido, la accesibilidad y el ajuste en escritorio y móvil.

### 2026-10-20 — Inicio: integrar la explicación de los datos de Kepler en 2.1

- **Responsable y solicitud:** Codex integrador; el usuario pidió trasladar el texto «Datos de Kepler» desde su burbuja de pregunta al texto principal y quitar una cautela innecesaria en la misma diapositiva.
- **Alcance reservado:** `src/lib/s03-content.ts`, `src/components/react/s03/S03ContextHelp.tsx`, `src/components/react/s03/S03ScienceScenes.tsx`, fichas `s03-science-scenes.md` y `s03-paper-figures-and-help.md`, evidencia visual I05 y esta bitácora. Se preservan los demás cambios locales.
- **Estado:** en curso; revisar el texto y el control de conceptos en la vista previa 2.1, actualizar las fichas y validar el build de subruta.

### 2026-10-20 — Cierre: integrar la explicación de los datos de Kepler en 2.1

- **Resultado:** el texto de apertura ahora explica qué mide Kepler y qué conserva su archivo; 2.1 mantiene la ayuda «Cadencia y flujo» y ya no muestra la ayuda «Datos de Kepler». Se retiró la nota que advertía que el total de estrellas era histórico.
- **Comprobaciones:** revisión de navegador en `/preview/sesiones/s03/#s03-mission-1` a 1299 × 882; texto en dos líneas y composición dentro de la diapositiva. El árbol de accesibilidad confirma la ayuda contextual restante y ausencia de la nota. `npx prettier --check` pasó y `npm run build:subpath` generó 10 páginas con avisos de colecciones vacías. El primer intento de build falló por `EPERM` al reemplazar `.astro/content-assets.mjs`; la repetición pasó. No se ejecutaron pruebas automatizadas.
- **Estado propuesto:** corrección entregada para revisión del usuario; I05 sigue `entregada` y pendiente de revisión editorial. Sin cambios en el vault, commit, push o publicación. Archivos liberados.
- **Siguiente acción:** revisar la diapositiva 2.1 en la vista previa S03.

### 2026-10-20 — Inicio: rehacer la escena de píxeles de Kepler y retirar la viñeta global

- **Responsable y solicitud:** Codex integrador; el usuario pidió aclarar 2.2 con la luz estelar detrás de una retícula y el aporte de cada píxel al flujo, evitar el término TPF sin definición, quitar el disclaimer de la escena y retirar la viñeta de tránsito pequeña de todas las diapositivas.
- **Alcance reservado:** `src/components/react/S03LearningJourney.tsx`, componentes y estilos de escenas S03, `src/lib/s03-content.ts`, `scripts/s03-illustrations-manifest.mjs`, PNG y manifiesto de la ilustración, guía visual, fichas `s03-science-scenes.md` y `s03-paper-figures-and-help.md`, evidencia I05 y esta bitácora. Se preservan los demás cambios locales.
- **Estado:** en curso; definir la visualización, actualizar texto y composición, y comprobar 2.2 en escritorio y móvil.

### 2026-10-20 — Inicio: rehacer la parada 5.2 como reporte metodológico

- **Responsable:** Codex integrador.
- **Solicitud:** el usuario pide cambiar de fondo la parada 5.2: explicar primero por qué se analizan juntas las escalas local y global; desarrollarlas en dos columnas con el método; definir el plegado por fase y la aumentación de datos; quitar el esquema y las ayudas de concepto que solo los nombran.
- **Alcance reservado:** `src/lib/s03-content.ts`, `S03ScienceScenes.tsx`, `S03ContextHelp.tsx`, `s03-science.css`, prueba de escenas científicas, fichas `s03-science-scenes.md` y `s03-paper-figures-and-help.md`, evidencia I06 y esta bitácora. Se conservan los demás cambios locales.
- **Decisión científica inicial:** usar la descripción del artículo de las vistas de longitud 2001 y 201, los parámetros de la configuración CNN seleccionada, el pliegue de la curva aplanada en el período del TCE y los reflejos horizontales aleatorios durante entrenamiento. Presentar el espejo como aumentación de entradas de entrenamiento, sin describirlo como observación nueva.
- **Estado:** en curso; verificar contenido con la fuente primaria, accesibilidad, encuadre de Figura 3 y lectura dentro del primer cuadro proyectado.
- **Siguiente acción:** sustituir el esquema y los controles de solo nombre por dos columnas metodológicas, un resumen común del plegado/normalización y una explicación visible de la aumentación.

### 2026-10-20 — Entrega: reporte metodológico de la parada 5.2

- **Resultado:** la apertura declara por qué la CNN seleccionada usa las escalas local y global. Dos columnas reportan cómo se formaron: plegado con el período del TCE, medianas en 2 001 bins globales con `λ = δ = P/2001`, y recorte local `±4d` con 201 bins, `λ = 8d/201`, `δ = 0,16d` y solapamiento. Se define la fase con `φ = frac[(t − T₀) / P]`, los roles de `T₀`/`P` y la normalización común. El espejo horizontal aleatorio se describe como aumentación de entrenamiento con la misma etiqueta. La Figura 3 original conserva cita, enlace y diálogo de ampliación; todas las partes caben en la pantalla de escritorio.
- **Comprobaciones:** `S03ScienceScenes.test.tsx` 30/30; suite completa con cobertura 195/195 en 29 archivos; Prettier dirigido a I06; Astro (0 errores/advertencias, un hint ajeno), validadores de contenido/ejemplos/skills y build `/preview` (10 páginas) pasan. Inspección visual y árbol accesible en `/preview/sesiones/s03/#s03-representation-2` a 1880×884; Figura 3 y fuente se ven junto con la explicación. `npm run check` continúa fallando en formato de `s03-transit.css` y `S03TransitGeometry.tsx`; ESLint reporta `kind` sin uso en `S03TransitGeometry.tsx:505`, fuera del alcance. Vista móvil no inspeccionada. Evidencia detallada en [I06](evidence/I06.md).
- **Estado propuesto:** I06 entregada para revisión editorial del usuario. Sin cambios del vault, commit, push o publicación; se preservan los demás cambios locales.
- **Siguiente acción:** revisión del usuario de la 5.2 en la vista previa.
### 2026-10-20 — Cierre: serie temporal de la estación 1.3

- **Responsable y alcance:** Codex integrador; atender la preferencia del usuario por una señal fotométrica con muchos puntos, varias caídas y lectura sin controles locales. Se actualizan `S03TransitInference.tsx`, `S03LearningJourney.tsx`, `S03ContextHelp.tsx`, los estilos de tránsito, `s03-content.ts`, la ficha de interacción, las pruebas y evidencia I05.
- **Resultado:** la estación muestra 481 mediciones sintéticas con ruido y variación suave durante 24 días, tres caídas similares separadas por `P ≈ 8 días`, una caída aislada con cuatro causas posibles y una explicación de por qué repetición y forma apoyan una hipótesis que aún debe contrastarse. La binaria eclipsante permanece como alternativa periódica. No hay controles propios de la escena.
- **Comprobaciones:** `npm run check`; `npm run test:unit` (195/195, 29 suites, temporal bajo `node_modules`); `npm run build` y `npm run build:subpath` (10 páginas). La vista `/preview/sesiones/s03/#s03-transit-3` confirma visual y accesiblemente la serie, los tres eventos y ausencia de controles locales. Playwright E2E por CLI no pudo iniciar su servidor porque el entorno bloqueó el socket local; se interrumpió sin reportarlo como pase. La evidencia está en [I05](evidence/I05.md).
- **Estado propuesto:** I05 sigue `entregada` para revisión del usuario/tutor. Goldens Linux y aceptación editorial/científica pendientes. Sin cambios en vault, commit, push o publicación.
- **Siguiente acción:** revisar la escena 1.3 en la vista previa; decidir si la lectura científica y la densidad visual representan la idea que el usuario busca.
### 2026-10-20 — Inicio: ajustar la lectura visual de la estación 1.3

- **Responsable:** Codex integrador.
- **Solicitud:** aplicar tres comentarios del usuario: reducir el pie a «Ejemplo sintético», organizar mejor el rótulo del eje Y y encuadrar la limitación de la hipótesis como advertencia visible.
- **Alcance reservado:** `S03TransitInference.tsx`, estilos de tránsito, prueba unitaria y E2E de S03, `s03-transit.md`, evidencia I05, revisión visual y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** conservar los detalles numéricos en la descripción accesible y en la ficha; mantener el orden de lectura y destacar la tercera nota con el token visual de estado aprobado para el proyecto.
- **Estado:** en curso.
- **Siguiente acción:** revisar tokens y patrones de warning, aplicar los tres cambios y verificar la vista /preview.

### 2026-10-20 — Inicio: simplificar controles y gráfica de la escena 1.2

- **Responsable:** Codex integrador.
- **Solicitud:** aplicar los comentarios del usuario: quitar presets de orientación, reemplazar las opciones de perfil por un único conmutador, retirar el disclaimer y el resumen duplicado, quitar el pie de la curva y darle una proporción más cuadrada.
- **Alcance reservado:** `src/components/react/s03/S03TransitGeometry.tsx`, `src/components/react/s03/s03-transit.css`, `src/components/react/s03/S03Transit.test.tsx`, `tests/e2e/s03-presentation.e2e.spec.ts`, `docs/specs/interactions/s03-transit.md` y esta bitácora. Se preservan los demás cambios locales.
- **Estado:** en curso; conservar la interacción del deslizador de inclinación, actualizar las pruebas y comprobar la composición en la vista previa.
- **Siguiente acción:** integrar los cambios, validar los gates del repo y revisar el perfil activo en navegador.
### 2026-10-20 — Cierre: ajuste editorial de la estación 1.3

- **Resultado:** el pie quedó en «Ejemplo sintético.»; el eje Y ganó espacio frente a sus ticks; la hipótesis alternativa de binaria eclipsante quedó en un cuadro rojo con rótulo «Advertencia» y rol accesible `note`.
- **Comprobaciones:** `S03Transit.test.tsx` pasó 9/9; `npm run check` pasó (166 archivos Astro, 0 errores, advertencias o hints); `npm run build:subpath` compiló 10 páginas. La vista `/preview/sesiones/s03/#s03-transit-3` y el árbol accesible se revisaron a 1299×884. No se ejecutaron E2E ni captura móvil en esta corrección.
- **Estado propuesto:** ajuste aplicado; I05 continúa entregada para revisión del usuario/tutor, con aceptación editorial y goldens Linux pendientes. Sin cambios en vault, commit, push o publicación.
- **Siguiente acción:** revisar la vista actualizada; completar la inspección móvil y el pase E2E cuando el entorno permita iniciar el servidor local.

### 2026-10-20 — Inicio: aclarar la lectura del ejemplo observado de Kepler-10

- **Responsable y solicitud:** Codex integrador; el usuario observa que la diapositiva 2.3 muestra un plot sin explicar qué lectura permite ni de dónde vienen los datos, y pide quitar la línea que une mediciones.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, `docs/specs/interactions/s03-science-scenes.md` y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** presentar en el primer cuadro la procedencia MAST/Q1/PDCSAP y una lectura directa del descenso y recuperación; mostrar puntos y barras de incertidumbre sin interpolación entre cadencias.
- **Estado:** en curso.
- **Siguiente acción:** ajustar texto y figura y revisar la vista 2.3 en el navegador.

### 2026-10-20 — Cierre: aclarar la lectura del ejemplo observado de Kepler-10

- **Resultado:** la vista 2.3 identifica los datos como una curva de Kepler Q1/PDCSAP de MAST para KIC 11904151. El texto explica la caída bajo la mediana Q1 y la recuperación como una forma compatible con tránsito, y conecta la periodicidad con comparar otros ciclos. Se eliminaron las líneas que unían mediciones; quedan puntos independientes y barras de incertidumbre. El pie define la cadencia, la referencia de 0 ppm y la selección de la ventana con la época y el período publicados. Se actualizó la ficha de escenas.
- **Comprobaciones:** Prettier pasó para los archivos de la tarea. `npm run build:subpath` compiló 10 páginas; Astro mostró avisos por las colecciones de contenido vacías. Revisión visual y accesible en `/preview/sesiones/s03/#s03-mission-3` a 1299×884: procedencia, lectura, puntos sin unir y pie visibles junto al gráfico. No se ejecutaron pruebas automatizadas.
- **Estado propuesto:** corrección entregada para revisión editorial del usuario; los datos y el manifiesto de procedencia permanecen sin cambios. Sin cambios en el vault, commit, push o publicación.
- **Siguiente acción:** revisar el texto y la lectura de 2.3 en la vista previa.

### 2026-10-20 — Cierre: simplificar controles y gráfica de la escena 1.2

- **Resultado:** la escena mantiene el deslizador de inclinación y elimina los tres presets. «Oscurecimiento al limbo» funciona como único conmutador accesible (`aria-pressed`); al activarlo, el disco y la curva cambian juntos. Se retiraron el texto repetido del perfil, el resumen que duplicaba los diagramas y el pie de la curva. La gráfica usa una proporción 520×340.
- **Comprobaciones:** `S03Transit.test.tsx` pasó 9/9; Prettier y ESLint pasaron para los archivos de esta corrección; `astro check` informó 0 errores, advertencias o hints; `npm run build:subpath` generó 10 páginas. Inspección en navegador a 1299×884 y 390×844; en móvil los diagramas se apilan y no hay desbordamiento horizontal. La prueba E2E se actualizó, pero no se ejecutó por CLI.
- **Nota del gate global:** la última corrida de `npm run check` se detuvo en Prettier por tres archivos de otras ediciones (`s03-learning-journey.css`, `s03-science.css` y `S03ScienceScenes.tsx`). Para preservar esos cambios, no los formateé dentro de esta corrección.
- **Estado propuesto:** lista para revisión del usuario; I05 sigue entregada para revisión editorial. Sin cambios en vault, commit, push o publicación.
- **Siguiente acción:** revisar la pantalla 1.2 en la vista previa actualizada.

### 2026-10-20 — Inicio: animar variabilidad estelar por rotación

- **Responsable y solicitud:** Codex integrador; el usuario pide reemplazar la imagen conceptual de la escena 3.1 por una animación sencilla asociada al plot, donde una estrella rota y la cobertura de manchas modifica el brillo total.
- **Alcance reservado:** `S03ScienceScenes.tsx`, `s03-science.css`, `S03ScienceScenes.test.tsx`, `tests/e2e/s03-presentation.e2e.spec.ts`, `docs/specs/interactions/s03-science-scenes.md`, evidencia I05 y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** enlazar disco estelar y curva con una misma fase; representar manchas de igual contraste en una superficie que rota. Explicar que la modulación depende del área, contraste y distribución longitudinal, y ofrecer control de movimiento reducido.
- **Estado:** en curso.
- **Siguiente acción:** definir ficha y estados accesibles, implementar la escena y revisar navegador, teclado, móvil y pruebas.

### 2026-10-20 — Cierre: animación de variabilidad estelar en la estación 3.1

- **Resultado:** la imagen conceptual se reemplazó por un disco estelar con manchas que rotan dentro y fuera de vista. El deslizador cambia el total de manchas y actualiza tanto el disco como la curva; el marcador mantiene la fase común. Un solo botón pausa/reanuda. El flujo lleva nivel base 1, la nota distingue esta distribución agrupada de una distribución simétrica y el material cita Basri et al. (2011). La ficha y las pruebas reflejan el modelo y sus límites.
- **Comprobaciones:** `npm run check` pasó; `npm run test:unit` pasó 195/195 en 29 suites; `npm run build:subpath` generó 10 páginas. Revisión de navegador a 1299×884 y 390×844; variación de 3 a 5 manchas, punto sincronizado y respeto a cambios de `prefers-reduced-motion` verificados manualmente. Consola sin errores. Playwright E2E por CLI quedó esperando el servidor local y se detuvo; no se cuenta como pase.
- **Estado propuesto:** cambio entregado para revisión del usuario; I05 conserva estado `entregada` con aceptación editorial y goldens Linux pendientes. Sin cambios al vault, commit, push o publicación.
- **Siguiente acción:** revisar la escena 3.1 en la vista previa y decidir si la representación del giro y el contraste entre número de manchas y modulación se entienden bien.

### 2026-10-20 — Inicio: reubicar y explicar la aumentación de la pantalla 5.2

- **Responsable y solicitud:** Codex integrador; el usuario pregunta si el reflejo horizontal encaja en 5.2 y pide explicar qué significa.
- **Alcance reservado:** `src/lib/s03-content.ts`, `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, prueba `S03ScienceScenes`, `tests/e2e/s03-presentation.e2e.spec.ts`, fichas `s03-science-scenes.md` y `s03-paper-figures-and-help.md`, evidencia I06, BOARD y BITACORA. Se conservan los demás cambios locales.
- **Decisión inicial:** la metodología de § III.3 presenta las vistas y el plegado; § IV.2 ubica los reflejos aleatorios en el entrenamiento. Mantener 5.2 en representaciones/Figura 3 y explicar el reflejo como inversión del orden de bins en 5.3, conservando la clase y diferenciando entrenamiento de inferencia.
- **Estado:** en curso.
- **Siguiente acción:** actualizar componente, contenido y ficha; probar los dos estados y verificar el build de `/preview`.

### 2026-10-20 — Cierre: reubicar y explicar la aumentación de datos

- **Resultado:** 5.2 queda centrada en las vistas global/local, el plegado y la Figura 3. 5.3 muestra por defecto el entrenamiento y explica el reflejo horizontal con un diagrama, la inversión de bins, la etiqueta conservada y la ausencia de nuevas observaciones. En inferencia, el diagrama desaparece y se puntúan las vistas originales.
- **Comprobaciones:** `S03ScienceScenes.test.tsx` 30/30; unidad completa 195/195 en 29 archivos; `npm run check` y `npm run build:subpath` pasan. Inspección manual en navegador a 1864×884 y 390×844; el conmutador entrenamiento/inferencia funciona y no hay desbordamiento móvil. Se añadió un caso E2E dedicado, aunque el runner no logró iniciar conexión con su servidor local por la restricción de sockets del entorno.
- **Estado propuesto:** I06 entregada para revisión editorial del usuario. Se actualizan ficha de interacción, tarea, evidencia y Board. No se hizo commit, push ni publicación, y no se editó el vault.

### 2026-10-20 — Cierre: flujo de píxeles y limpieza visual de S03

- **Responsable y alcance:** Codex integrador; revisión de 2.2 y retiro de la viñeta común, conservando los demás cambios locales.
- **Resultado:** `De los píxeles al flujo` muestra un halo estelar transparente detrás de 25 celdas etiquetadas con sus flujos. La secuencia resalta una apertura de nueve píxeles, formula la suma SAP y presenta su curva de luz. El texto define SAP, evita Target Pixel File/TPF y elimina el disclaimer de la diapositiva. Se retiró el componente y sus estilos para que el número de cada slide quede solo en el encabezado. La ayuda «Datos de Kepler» tampoco se repite en 2.2.
- **Comprobaciones:** revisión de los tres estados en `/preview/sesiones/s03/#s03-mission-2` a 1299 × 884. El encabezado muestra 6/33 y 2.2 sin viñeta; la retícula, apertura, fórmula, curva, fuentes y navegación caben en el estado final. El PNG se revisó sobre fondos oscuro y claro. A 390 × 844 no hay desbordamiento horizontal; la diapositiva se desplaza verticalmente. `npx prettier --write` terminó sin errores; `npm run build:subpath` generó 10 páginas, con los avisos esperados de colecciones vacías. No se ejecutaron pruebas automatizadas.
- **Estado propuesto:** ajuste entregado para revisión del usuario; I05 continúa entregada y pendiente de revisión editorial. Sin cambios en el vault, commit, push o publicación.
- **Siguiente acción:** revisar 2.2 en la vista previa S03.

### 2026-10-20 — Inicio: dar una lectura narrativa a la curva de Kepler-10

- **Responsable y solicitud:** Codex integrador; aplicar los comentarios del usuario a 2.3: retirar tarjetas, tabla y recuentos técnicos; narrar cómo el ruido puede ocultar, aislar o repetir caídas y señalar la bajada central como candidata.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, estilos de esa escena, `src/lib/s03-content.ts`, su prueba unitaria, ficha `docs/specs/interactions/s03-science-scenes.md` y esta bitácora. Se preservan datos, manifiesto y demás cambios locales.
- **Decisión inicial:** conservar puntos sin unir, barras de incertidumbre y atribución a MAST; mencionar que el recorte se centró con los parámetros publicados para no presentar la selección como una búsqueda ciega.
- **Estado:** en curso.
- **Siguiente acción:** editar la narración visible, retirar los elementos auxiliares y revisar el estado de presentación 2.3 en navegador.

### 2026-10-20 — Cierre: narrar la curva observada de Kepler-10

- **Responsable y alcance:** Codex integrador; 2.3 en `S03ScienceScenes.tsx`, sus estilos, `s03-content.ts`, la prueba de escenas, la ficha `s03-science-scenes.md` y esta bitácora.
- **Resultado:** se retiraron del slide las tarjetas estadísticas, la tabla de cadencias, los conteos de calidad y los parámetros publicados. La pregunta y el texto guían la lectura de una curva ruidosa: puede no distinguirse una caída, destacar una aislada o verse varias repetidas; la bajada central y su recuperación se presentan como candidata que habría que contrastar en otros ciclos. Permanecen la fuente MAST/Q1/PDCSAP, los 25 puntos sin unir, las barras de incertidumbre y un pie conciso que explica la referencia y la selección del recorte. Datos y manifiesto no se modificaron.
- **Hallazgo auxiliar:** se corrigió una etiqueta de cierre JSX desparejada en el componente que impedía analizar el archivo completo con Prettier.
- **Comprobaciones:** Prettier pasó en los archivos de código y ficha revisados; `npm run build:subpath` compiló 10 páginas. La vista previa y el árbol accesible de `/preview/sesiones/s03/#s03-mission-3` se revisaron a 1299×884: lectura, curva, pie y fuentes caben juntos y no hay tabla ni tarjetas de datos. No se ejecutaron pruebas automatizadas; se actualizaron las aserciones afectadas.
- **Nota de build:** Astro avisó que las colecciones públicas `sessions`, `concepts` y `exercises` están vacías; compiló sin errores.
- **Estado propuesto:** ajuste entregado para revisión del usuario; I05 continúa `entregada` para revisión editorial. Sin cambios en el vault, commit, push ni publicación.
- **Siguiente acción:** revisar la versión actualizada de 2.3 en la vista previa.

### 2026-10-20 — Inicio: animar la binaria eclipsante de la estación 3.2

- **Responsable y solicitud:** Codex integrador; el usuario propone una animación sencilla y atractiva en la pantalla 3.2, junto a la curva de binarias eclipsantes.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, pruebas unitaria/E2E/movimiento/accesibilidad, ficha `docs/specs/interactions/s03-science-scenes.md`, evidencia I05 y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** reemplazar la ilustración generada por dos diagramas responsivos —órbita lateral y proyección telescópica— sincronizados con una curva calculada. Mostrar eclipses primario/secundario y la dilución producida por una fuente vecina dentro de la apertura, con un único botón de reproducción.
- **Estado:** en curso.
- **Siguiente acción:** validar el modelo geométrico y la curva, adaptar la legibilidad en móvil, y comprobar reducción de movimiento, accesibilidad y la vista previa.

### 2026-10-20 — Inicio: narrar la selección y validación de planetas en S03 9.2

- **Responsable y solicitud:** Codex integrador; aplicar los comentarios del usuario a 9.2: mejorar legibilidad de las figuras del artículo con fondo blanco, escribir en español el nombre del evento de detección y narrar cómo el ranking condujo a la validación de nuevos planetas y a una regla general de ML.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/S03ScienceScenes.test.tsx`, `src/components/react/s03/s03-science.css`, `src/components/react/s03/S03PaperFigure.tsx`, `src/components/react/s03/s03-paper-figure.css`, `src/lib/s03-content.ts`, ficha `docs/specs/interactions/s03-science-scenes.md`, pruebas S03 E2E/motion, tarea I07, evidencia I07, `BOARD.md` y esta bitácora. Se conservan los demás cambios locales.
- **Decisión inicial:** mostrar 513 → 30 → 9 → 4 con umbrales explícitos; narrar las comprobaciones astronómicas y el cálculo estadístico que llevaron a Kepler-80 g y Kepler-90 i; mantener separado el puntaje predictivo de la validación.
- **Estado:** en curso.
- **Siguiente acción:** implementar el relato y la superficie blanca de las figuras; comprobar exactitud científica, interacción, adaptación visual y build de `/preview`.

### 2026-10-20 — Cierre: narrar la selección y validación de planetas en S03 9.2

- **Resultado:** 9.2 recorre 513 señales en 670 estrellas y los cortes 0,5 → 30, 0,8 → 9 y 0,9 → 4. Explica por qué Kepler-534 y Kepler-647 no avanzaron y cómo los diagnósticos y las probabilidades de falso positivo permitieron validar Kepler-80 g y Kepler-90 i. La conclusión explicita que el puntaje prioriza la revisión y la evidencia independiente sostiene la decisión. Las Figuras 11, 8 y 10 usan superficie blanca y conservan ampliación, explicación y fuente; la Figura 11 queda seleccionada en la vista previa.
- **Comprobaciones:** `npm run check` pasó (166 archivos Astro, 0 errores, advertencias ni hints); `npm run test:unit` pasó (195 pruebas en 29 archivos); `npm run build:subpath` generó las 10 páginas bajo `/preview`. Revisión manual en navegador de 9.2 en escritorio y estados del selector; el diálogo ampliado de la Figura 10 conserva fondo blanco, explicación y enlace a la fuente. La ejecución E2E se quedó esperando el servidor local y se interrumpió; la revisión automatizada móvil queda pendiente.
- **Estado propuesto:** I07 entregada para revisión editorial. No se editaron archivos del vault ni se hizo commit, push o publicación.
- **Siguiente acción:** revisar la diapositiva abierta en la Figura 11; volver a ejecutar E2E y comprobar móvil cuando el servidor local esté accesible al runner.

### 2026-10-20 — Inicio: codificar por color las celdas de la matriz S03 6.2

- **Responsable y solicitud:** Codex integrador; aplicar el comentario del usuario a la matriz: asignar un color propio a cada una de las cuatro celdas, rotular las clases visibles como «Tránsito» y «NTránsito», y actualizar el rótulo/color de cada caso al cambiar su predicción y moverse de celda.
- **Alcance reservado:** `src/components/react/s03/S03EvaluationScenes.tsx`, `src/components/react/s03/s03-evaluation.css`, `src/components/react/s03/S03EvaluationScenes.test.tsx`, `src/lib/s03-content.ts`, `docs/specs/interactions/s03-evaluation.md`, nueva tarea/evidencia I08, `BOARD.md` y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** usar cuatro roles existentes del sistema visual; mantener TP/FN/FP/TN y definir en la propia matriz que Tránsito corresponde a PC y NTránsito agrupa AFP/NTP. El color acompaña al texto, la referencia y la posición, sin ser la única señal.
- **Estado:** en curso.
- **Siguiente acción:** actualizar matriz y etiquetas dinámicas; verificar movimiento del caso, legibilidad, pruebas y vista `/preview`.

### 2026-10-20 — Cierre: colorear y rotular la matriz interactiva S03 6.2

- **Resultado:** cada cuadrante TP, FN, FP y TN tiene un color propio y conserva su rótulo. Las filas y columnas muestran «Tránsito» y «NTránsito»; la matriz define Tránsito como PC y NTránsito como AFP/NTP. Cada ficha enseña su predicción actual y cambia de clase visible y color al moverse de columna. La referencia fija del caso sigue visible y el color acompaña al texto y a la posición.
- **Archivos:** `src/components/react/s03/S03EvaluationScenes.tsx`, `src/components/react/s03/s03-evaluation.css`, `src/components/react/s03/S03EvaluationScenes.test.tsx`, `src/components/react/s03/S03ContextHelp.tsx`, `src/components/react/s03/S03ScienceScenes.test.tsx` (aserciones obsoletas alineadas), `src/lib/s03-content.ts`, `docs/specs/interactions/s03-evaluation.md`, tarea I08 y evidencia I08.
- **Comprobaciones:** `npm run check` pasó; `npm run test:unit` pasó con 196 pruebas en 29 archivos; `npm run build:subpath` generó 10 páginas. Revisión manual en `/preview/sesiones/s03/#s03-errors-2` a 1299 × 884: PC-01 pasó de TP a FN; la etiqueta accesible, el conteo y el color cambiaron juntos, y su referencia permaneció fija. La prueba E2E focalizada no completó: Playwright quedó esperando el servidor/pruebas sin iniciar; se interrumpió y no se cuenta como pase. La ejecución directa de la vista previa local sí inició. Persisten avisos informativos del build por colecciones editoriales públicas vacías.
- **Estado propuesto:** I08 entregada para revisión editorial del usuario. Sin cambios en el vault, commit, push o publicación.
- **Siguiente acción:** revisar la matriz en la vista previa de S03 6.2.

### 2026-10-20 — Inicio: aclarar la diapositiva 3.3 sobre movimiento y apertura

- **Responsable y solicitud:** Codex integrador; el usuario indica que 3.3 no se entiende y pide retirar la frase sobre la escala y el detector Kepler.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, ficha `docs/specs/interactions/s03-science-scenes.md`, guía/manifiesto de ilustraciones S03, evidencia I05 y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** mostrar la misma fuente en dos momentos sobre una apertura fija, con un desplazamiento legible y trazas simultáneas de flujo sumado y centroide. La figura y el texto deben explicar la asociación sin una nota de cautela visible.
- **Estado:** en curso.
- **Siguiente acción:** actualizar escena y procedencia, y revisar la diapositiva 3.3 en la vista previa.

### 2026-10-20 — Cierre: aclarar la diapositiva 3.3 sobre movimiento y apertura

- **Resultado:** se retiró la imagen de dos destellos y se reemplazó por dos vistas de la misma estrella sobre retículas de 5 × 5. La apertura `A` permanece fija; el halo se desplaza entre `t₀` y `t₁`. El gráfico conecta la caída del flujo sumado con el movimiento del centroide y define este término junto a la figura. El texto seleccionado por el usuario desapareció de la diapositiva; el raster anterior salió del manifiesto y del directorio público. Se actualizaron contenido, ficha y guía visual.
- **Comprobaciones:** `npx prettier --write` pasó para los archivos de código incluidos. `npm run validate:content` reportó contenido válido con dos avisos existentes sobre metadatos auxiliares del inbox. `npm run check:astro` pasó con 166 archivos, 0 errores, advertencias ni hints. `npm run build:subpath` generó 10 páginas; persisten avisos por colecciones editoriales vacías. En el navegador, la vista 3.3 a 1299 × 884 muestra toda la relación; a 390 × 844, documento de 390 px, diapositiva de 332 px y sin desbordamiento horizontal. Los dos instantes y el gráfico se apilan en móvil. No se ejecutaron pruebas automatizadas.
- **Estado propuesto:** I05 continúa `entregada`, pendiente de revisión editorial. Sin cambios en el vault, commit, push o publicación.
- **Siguiente acción:** revisar la vista actualizada de 3.3 en la presentación.

### 2026-10-20 — Inicio: simplificar el diagrama de clasificación de S03 4.1

- **Responsable y solicitud:** Codex integrador; convertir la escena 4.1 en un diagrama sencillo de puntos con dos casos, tránsito y no tránsito.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, ficha `docs/specs/interactions/s03-science-scenes.md` y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** retirar los puntajes, umbral manipulable, vistas duplicadas y texto explicativo de la diapositiva. Mostrar únicamente dos señales esquemáticas representadas por mediciones independientes y la clase asignada a cada una.
- **Estado:** en curso.
- **Siguiente acción:** implementar el diagrama, actualizar la ficha y revisar la presentación 4.1.

### 2026-10-20 — Cierre: simplificar el diagrama de clasificación de S03 4.1

- **Resultado:** la diapositiva muestra dos series sintéticas de puntos sin unir. La señal A tiene tres descensos repetidos y se clasifica como «Tránsito»; la señal B muestra fluctuaciones sin ese patrón y se clasifica como «No tránsito». Se retiraron las vistas duplicadas, el puntaje, el umbral manipulable, la referencia de catálogo y el texto de evaluación. La frase de entrada nombra directamente las dos clases y la ficha describe el diagrama estático.
- **Comprobaciones:** Prettier no encontró cambios de formato. `npm run build:subpath` compiló las 10 páginas. La vista previa `/preview/sesiones/s03/#s03-classification-1` se revisó en navegador a 1299 × 884; ambas señales y sus clases aparecen juntas, sin líneas que conecten los puntos ni controles del diseño anterior. No se ejecutaron pruebas automatizadas.
- **Nota de build:** se mantienen los avisos existentes porque las colecciones públicas `sessions`, `concepts` y `exercises` están vacías; el build terminó sin errores.
- **Estado propuesto:** ajuste entregado para revisión del usuario. Sin cambios en el vault, commit, push ni publicación.
- **Siguiente acción:** revisar la versión actualizada de 4.1 en la presentación.

### 2026-10-20 — Inicio: explicar el preprocesamiento en S03 5.1

- **Responsable y solicitud:** Codex integrador; atender la observación del usuario de que 5.1 no narra qué significa preparar la curva ni define `t`, `F`, `σ` y `q`.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, ficha `docs/specs/interactions/s03-science-scenes.md` y esta bitácora. Se preservan los demás cambios locales y los datos.
- **Decisión inicial:** sustituir la selección de símbolos abstractos por una secuencia visible que explique qué mide Kepler, cómo el artículo limpia y aplana la señal, y cómo alinea, resume y normaliza las curvas para generar las vistas de entrada.
- **Estado:** en curso.
- **Siguiente acción:** implementar la narración, revisar la precisión de los pasos y observar 5.1 en la presentación.

### 2026-10-20 — Animar binarias eclipsantes y dilución (estación 3.2)

- **Resultado:** la diapositiva 3.2 ahora vincula la órbita de una binaria eclipsante, la apertura del telescopio y una curva sintética en fase compartida. La fuente vecina añade flujo constante y reduce la profundidad aparente de ambos eclipses. La interacción conserva un único control de pausa/reanudación y movimiento reducido.
- **Comprobaciones:** 195/195 pruebas unitarias en 29 suites; `npm run check` y `npm run build:subpath` pasaron. Revisión manual en navegador a 1299 × 884. El E2E de Playwright no se cuenta como pase: el entorno negó la conexión local al servidor. Evidencia: `evidence/I05.md` y `evidence/I05-VISUAL-REVIEW.md`.
- **Estado propuesto:** I05 continúa `entregada`, pendiente de revisión editorial y científica. Sin cambios en el vault, commit, push o publicación.
- **Siguiente acción:** revisar en la vista previa la relación entre geometría, dos eclipses y dilución.

### 2026-10-20 — Inicio: dar una función clara a la diapositiva 4.2

- **Responsable y solicitud:** Codex integrador; el usuario cuestiona si «Entrada y salida» aporta información suficiente y señala que el flujo actual no se entiende.
- **Alcance reservado:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, ficha `docs/specs/interactions/s03-science-scenes.md`, evidencia I05 y esta bitácora. Se preservan los demás cambios locales.
- **Decisión inicial:** mantener la pantalla cuando explique qué papel cumplen las etiquetas conocidas durante el entrenamiento y qué recibe una señal nueva durante la inferencia. Separar puntaje, umbral y predicción, y tener en cuenta el ajuste pendiente de la escena 4.1.
- **Estado:** en curso.
- **Siguiente acción:** aclarar la secuencia de clasificación 4.1–4.2 y revisarla en la vista previa.

### 2026-10-20 — Cierre: aclarar entrenamiento e inferencia en S03 4.2

- **Resultado:** se conservó la diapositiva 4.2 como puente entre los dos ejemplos de 4.1 y la metodología específica de la CNN en 5.3. El estado inicial muestra señal con etiqueta de catálogo → puntaje para PC → ajuste de parámetros. Inferencia muestra una señal nueva sin etiqueta → modelo entrenado y puntaje → comparación con umbral y predicción. La referencia queda para evaluar después. Se reemplazaron «Entrada y salida», las cajas genéricas y la asignación errónea de la etiqueta como salida del entrenamiento.
- **Archivos:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, `src/components/react/s03/S03ScienceScenes.test.tsx`, `docs/specs/interactions/s03-science-scenes.md`, evidencia I05 y esta bitácora.
- **Comprobaciones:** Prettier, `npm run validate:content`, `npm run check:astro` (166 archivos; 0 errores, advertencias ni hints) y `npm run build:subpath` (10 páginas) pasaron. En navegador, ambas variantes caben en `/preview/sesiones/s03/#s03-classification-2` a 1299 × 884. A 390 × 844, el documento conserva 390 px de ancho, la diapositiva 332 px, las tres etapas se apilan y no hay desbordamiento horizontal. Se actualizó una aserción existente; no se ejecutaron pruebas automatizadas. Persisten avisos de build por colecciones públicas vacías y dos avisos del validador sobre metadatos auxiliares existentes.
- **Estado propuesto:** I05 continúa `entregada`, pendiente de revisión editorial. Sin cambios en el vault, commit, push o publicación.
- **Siguiente acción:** revisar en la vista previa la diferencia entre ajuste con etiquetas y predicción de una señal nueva.

### 2026-10-20 — Inicio: narrar el artículo e ilustrar las clases en S03 4.3

- **Tarea:** abrir con el contexto del artículo, explicar qué significan TCE, PC, AFP, NTP y FP, y crear una ilustración para cada caso según la guía visual de S03.
- **Responsable:** Codex integrador.
- **Alcance:** narrar la tarea del estudio y la relación entre las tres etiquetas del catálogo y la decisión binaria del modelo; separar las etiquetas de referencia del error FP; producir cinco imágenes cualitativas, una por término.
- **Archivos reservados:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, prueba unitaria de `S03ScienceScenes`, ficha `docs/specs/interactions/s03-science-scenes.md`, ficha visual, manifiesto S03, evidencia I05 y esta bitácora.
- **Decisión inicial:** las siglas se desarrollan y traducen en el contenido visible; el flujo exacto de etiqueta y predicción vive en HTML, mientras que ImageGen ilustra el caso astronómico sin texto ni escalas.
- **Estado:** en curso.
- **Siguiente acción:** preparar la familia visual, integrar las cinco imágenes con sus descripciones y comprobar la diapositiva en la vista previa.

### 2026-10-20 — Cierre: narrar el artículo e ilustrar las clases en S03 4.3

- **Resultado:** la entrada explica la tarea de Shallue y Vanderburg y cómo las referencias PC, AFP y NTP se agrupan en planeta/falso positivo. TCE queda definido como evento detectado; FP, como error cuando una referencia AFP/NTP recibe predicción de planeta. Cada término tiene nombre desarrollado, explicación e ilustración 16:9. El disclaimer retirado no reaparece.
- **Archivos:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, `docs/specs/interactions/s03-science-scenes.md`, `docs/guides/s03-classification-illustrations.md`, `scripts/s03-illustrations-manifest.mjs`, `public/images/s03/s03-illustrations.manifest.json`, cinco PNG de clasificación y evidencia I05.
- **Comprobaciones:** revisión manual a 1920×1080, 1440×900, 1024×768, 1299×884 y 390×844, con selección de los cinco términos en móvil. Las tarjetas se apilan en móvil; el flujo FP queda en columna y la composición conserva el ancho. `npm run check` y `npm run build:subpath` pasaron; se conservan dos avisos de metadatos auxiliares del inbox y avisos por colecciones públicas vacías. No se ejecutaron pruebas automatizadas.
- **Estado propuesto:** I05 sigue `entregada`, pendiente de revisión editorial. Sin cambios en el vault, commit, push o publicación.
- **Siguiente acción:** revisión editorial de la secuencia y de las cinco ilustraciones.

### 2026-10-20 — Cierre: explicar el preprocesamiento en S03 5.1

- **Resultado:** 5.1 ahora cuenta el recorrido desde cada medición de Kepler hasta la representación que recibe el clasificador. Define `t`, `F(t)`, `σ` y `q`; identifica `q` como bandera SAP_QUALITY y aclara que no es un canal adicional de la CNN. Explica el retiro de tránsitos de otros planetas confirmados, el ajuste de la spline `B(t)` con el evento objetivo enmascarado, la división `F(t)/B(t)`, el recorte iterativo de puntos a más de 3σ, el plegado por período, el binning y la normalización. Las tres etapas están visibles, sin esconder el relato detrás de controles. También se corrigió la operación de restar tendencia que aparecía en el diseño anterior.
- **Archivos:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, `docs/specs/interactions/s03-science-scenes.md` y esta bitácora.
- **Comprobaciones:** Prettier, `npm run validate:content` y `npm run build:subpath` pasaron; el build compiló 10 páginas. Revisión de la vista previa `/preview/sesiones/s03/#s03-representation-1` a 1299 × 884: las definiciones, las tres etapas y la nota final caben en la diapositiva. No se ejecutaron pruebas automatizadas. Persisten avisos de build por colecciones públicas vacías y dos avisos del validador sobre metadatos auxiliares existentes.
- **Estado propuesto:** ajuste entregado para revisión del usuario. Sin cambios en el vault, commit, push ni publicación.
- **Siguiente acción:** revisar que la secuencia explique con claridad qué decisiones transforman la curva original en las vistas global y local.

### 2026-10-20 — Cierre: contextualizar las etiquetas del catálogo en S03 4.2

- **Resultado:** la diapositiva abre con el propósito del trabajo de Shallue y Vanderburg y desarrolla PC, AFP y NTP antes de presentar el ajuste del modelo. Cada tarjeta ofrece nombre expandido, traducción, conteo y significado; la agrupación binaria y el límite de una candidatura también quedan visibles. Entrenamiento e inferencia conservan secuencias distintas.
- **Archivos:** `src/components/react/s03/S03ScienceScenes.tsx`, `src/components/react/s03/s03-science.css`, `src/lib/s03-content.ts`, sus pruebas, `docs/specs/interactions/s03-science-scenes.md`, evidencia I05, revisión visual y outbox S03.
- **Comprobaciones:** 196/196 pruebas unitarias en 29 suites; `npm run check`; `npm run build:subpath` con 10 páginas. Inspección manual de ambos estados en `/preview/sesiones/s03/#s03-classification-2` a 1299 × 884. Las colecciones editoriales públicas vacías generan avisos informativos.
- **Estado propuesto:** I05 entregada para revisión editorial/científica del usuario o tutor. La observación se devuelve abierta al paquete fuente; no se editó el vault ni se hizo commit, push o publicación.
- **Siguiente acción:** revisión editorial de claridad y aceptación del contenido.

### 2026-10-20 — Inicio: publicar la actualización de la app y el sitio

- **Solicitud:** el usuario pidió actualizar la aplicación en GitHub y el webpage; el push a `main` activa el despliegue configurado de GitHub Pages.
- **Alcance reservado:** integrar la app y las sesiones S00–S03 en `src/`, pruebas y `public/`; conservar atribución CC BY 3.0 para las figuras originales de S03; ejecutar los gates antes del push y verificar el despliegue.
- **Límites de publicación:** no incluir paquetes internos de `inbox/`/`outbox/` ni extracciones de datos/notebook que no forman parte de la app web.
- **Estado:** en curso; rama `main`, HEAD inicial `58a3efb` igual a `origin/main`.
- **Siguiente acción:** completar calidad, pruebas y builds; revisar el conjunto staged antes del commit y push.

- **Avance de validación:** `npm run check` pasó; `npm run test:unit -- --maxWorkers=1 --no-file-parallelism --testTimeout=20000` pasó con 197/197 pruebas; `npm run build:subpath` y `npm run build` con `BASE_PATH=/ML-CPlanetarias` y `SITE_URL=https://d4san.github.io` compilaron 10 páginas. Persisten avisos informativos por colecciones públicas vacías y metadatos auxiliares pendientes.
- **Límite local:** Playwright E2E no pudo iniciar el servidor de vista previa; el sistema negó el socket local `127.0.0.1:4321`. El flujo de CI en GitHub debe verificar E2E y visuales antes de integrar a `main`.
- **Estado:** commit local `54f5e4e` en la rama revisable `codex/site-update-2026-10-20`; aún sin push ni despliegue.
- **Siguiente acción:** actualizar la bitácora de cierre tras CI, integración y verificación de la URL pública.
