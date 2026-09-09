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
- **Siguiente acción:** revisión humana de derechos y contenido; repetir el gate visual Linux cuando el
  entorno lo permita. H02 mantiene su revisión independiente.

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
