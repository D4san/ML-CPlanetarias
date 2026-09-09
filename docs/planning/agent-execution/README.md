# Plan ejecutable del curso y la web

Este paquete convierte la primera retroalimentación en **32 tareas delegables: 31 de implementación/revisión y una de publicación opcional**. Está preparado para que un agente nuevo trabaje con contexto limitado, produzca una entrega acotada y demuestre que cumple sus criterios.

**Estado:** plan preparado; las tareas nuevas no se han ejecutado por haber escrito estas fichas. El piloto previo de S01 permanece como punto de partida. El estado operativo de cada tarea vive únicamente en [BOARD.md](BOARD.md).

## Cómo empezar

1. Asignar [A01](tasks/A01.md) a un agente integrador.
2. Cuando se acepte, asignar [A02](tasks/A02.md) y después [A03](tasks/A03.md).
3. Abrir el [tablero](BOARD.md), elegir una tarea cuyas dependencias estén aceptadas y copiar el [prompt de asignación](templates/ASSIGNMENT.md).
4. El ejecutor lee su ficha, los contratos comunes y solo las fuentes adicionales de su tarea. Implementa la ficha completa, registra evidencia y entrega un informe.
5. El integrador o revisor aplica los criterios AC de esa ficha y el [protocolo de revisión](templates/REVIEW.md). Acepta o devuelve con defectos concretos.
6. Actualizar el tablero y liberar los archivos antes de asignar el siguiente lote.

El usuario conserva la decisión sobre qué agentes ejecutar. Este plan no inicia agentes ni tareas remotas automáticamente.

Si una tarea consume una skill creada en D01–D03 antes de distribuir los espejos en D04, leer su `SKILL.md` y recursos directamente desde la fuente canónica `skills/<nombre>/`. No asumir que ya aparece en el catálogo del agente ni duplicarla para poder usarla.

## Archivos que debe conocer cada agente

- [CONTRACTS.md](CONTRACTS.md): decisiones de partida, campos propuestos, invariantes y casos extremos.
- [VALIDATION.md](VALIDATION.md): comandos, perfiles, pruebas y evidencia de cierre.
- [BOARD.md](BOARD.md): estado, dependencias y propiedad de las tareas.
- [BITACORA.md](BITACORA.md): recorrido operativo, responsables, decisiones, ideas abiertas y siguientes acciones.
- [templates/ASSIGNMENT.md](templates/ASSIGNMENT.md): texto para encargar una tarea.
- [templates/DELIVERY.md](templates/DELIVERY.md): informe que debe devolver el ejecutor.
- [templates/REVIEW.md](templates/REVIEW.md): procedimiento de aceptación.
- [tasks/](tasks/): una ficha por tarea, con pasos, archivos permitidos, criterios AC y criterio de logro.
- [PLAN_REVIEW.md](PLAN_REVIEW.md): comprobación de la estructura del plan; no acredita ejecución de las tareas.

Las rutas de las fichas son relativas a la raíz del repositorio. Los archivos que todavía no existen se indican como nuevos o propuestos. A02 fija sus nombres antes de que los agentes de implementación dependan de ellos.

## Etapas y resultado observable

| Etapa                     | Tareas  | Resultado de etapa                                                                          |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| 0. Base y contratos       | A01–A03 | Estado real, contrato técnico y frontera editorial definidos.                               |
| 1. Infraestructura        | B01–B04 | Datos validados, escenas separadas, configuración común y páginas filtradas.                |
| 2. Componentes y recursos | C01–C04 | Ejemplos, glosario, bibliografía, ayudas y precauciones reutilizables.                      |
| 3. Skills                 | D01–D04 | Cuatro skills nuevas probadas y distribuidas; la skill web vigente conserva implementación. |
| 4. S01 completa           | E01–E07 | Inventario de unidades y las siete estaciones bajo un mismo motor de subslides.             |
| 5. Fuentes e imágenes     | F01–F04 | Ejemplos sustentados, línea visual, assets revisados y cobertura integrada.                 |
| 6. S00 y forks            | G01–G03 | Introducción funcional y adaptación reproducible de un fork.                                |
| 7. Aceptación             | H01–H02 | Matriz de calidad y requisitos revisada con evidencia.                                      |
| Publicación opcional      | H03     | Sitio desplegado y verificado, únicamente con instrucción expresa.                          |

Los números de etapa organizan el trabajo; las dependencias del tablero determinan qué puede empezar. Por ejemplo, las skills D01–D03 pueden prepararse antes de terminar toda la infraestructura.

## Qué ya existe y se conserva

La inspección que sustenta el plan encontró:

- Astro estático con React, colecciones públicas aprobadas y prototipo S01 en `/sistema/`.
- Configuración funcional en `config/course.config.ts`: interacción, ayudas docentes, vista inicial y rutas de S01.
- Bibliografía inicial; tres partes en Pregunta y tres en Instancia; cinco flechas hacia afuera y orden Estadística → ML → IA.
- Definiciones directas e interactivas, lectura y actividades; ejemplos visuales esquemáticos de Instancia.
- Pruebas y [registro del piloto](../S01_PILOT_QA.md). Los resultados anteriores son antecedentes, no una garantía sobre cambios futuros.
- La skill canónica `skills/develop-mlcp-web/` y sus espejos.
- Un carril común ya presente en `src/components/react/SlideRail.tsx`, `src/lib/slide-rail.ts` y [su contrato](../../architecture/SLIDE_RAIL.md), integrado por el adaptador S01. Su estado/pruebas se confirman en A01; B02 y E07 lo reutilizan.

A01 confirma la vigencia de este inventario. La licencia del curso y la promoción editorial conservan sus estados reales. No hace falta rehacer los elementos que ya cumplen criterios.

## Cómo repartir el trabajo

**Con un agente:** seguir dependencias, terminar una tarea, verificarla y actualizar el tablero antes de continuar.

**Con varios agentes:**

- El integrador reserva configuración, esquemas, páginas/índices, contenedor de navegación, tokens, registros compartidos y documentación de contratos.
- Tras A03, D01–D03 pueden ejecutarse en carpetas distintas; B01 y B02 pueden avanzar por separado si A02 fijó las interfaces.
- Tras B02 y E01, E02–E06 pueden ejecutarse por escena. Los cambios de datos compartidos se entregan al integrador como propuesta/parche; no se aplican simultáneamente.
- Investigación F01 y guía visual F02 pueden avanzar en paralelo cuando sus dependencias estén aceptadas. F03 espera casos y reglas visuales concretos.
- C02–C04 requieren reserva de carpetas/componentes y pruebas distintas. Si necesitan el mismo archivo, el integrador serializa ese cambio.
- B04, E07, F04 y G02 son integraciones: evitar que otros agentes editen sus consumidores durante el ensamblado.
- Un solo agente usa `dist/`, puertos de preview y `output/playwright/` en un checkout compartido. Ejecutar builds simultáneos mezcla perfiles y vuelve inválida la evidencia.

Si se usan worktrees autorizados, comprobar que incluyen la base que requiere la tarea; un worktree nuevo no incluye automáticamente los cambios locales sin commit. No hacer commits para facilitar el reparto sin autorización. El modo serial en el checkout compartido es una alternativa válida.

## Estados y autoridad de cierre

`pendiente → en curso → entregada → aceptada`

- **Pendiente:** falta asignación o alguna dependencia.
- **En curso:** un agente tiene responsabilidad y archivos reservados.
- **Entregada:** existe resultado e informe, pendiente de revisión.
- **Devuelta:** el revisor encontró criterios incumplidos; registrar cuáles y cómo reproducirlos.
- **Bloqueada:** existe una dependencia/decisión/entorno que impide terminar; identificar la condición concreta y avanzar lo independiente.
- **Aceptada:** todos los AC requeridos tienen evidencia suficiente y el revisor lo confirma.
- **No autorizada:** se usa para H03 mientras falte una instrucción de publicación.

Marcar los pasos de una ficha ayuda a trabajar. La aceptación depende de los AC y del criterio de logro, no del número de casillas marcadas. Una captura, un build o una declaración del agente no bastan por sí solos.

## Manejo de problemas

1. Reproducir y delimitar el problema; distinguir código, fuente, configuración y entorno.
2. Resolver dentro de los archivos y decisiones asignados.
3. Si exige cambiar un contrato, enviar al integrador el problema, propuesta, consumidores afectados y pruebas necesarias. No inventar otra API en paralelo.
4. Si falta una decisión editorial, identificar el paquete exacto y preparar la representación revisable/fixtures; no alterar `publish_ready` para forzar avance.
5. Si falta Docker u otra herramienta, registrar qué gate queda pendiente. Completar pruebas independientes y conservar la tarea sin aceptación total cuando ese gate sea requerido.
6. No preguntar al usuario por decisiones rutinarias ya fijadas en este plan. Escalar contradicciones reales, datos indispensables o acciones fuera de la autorización.

## Definición de cierre del proyecto

H02 cierra la implementación cuando S00 y S01 cumplen el contrato, todas las unidades explicativas tienen ejemplos sustentados, el glosario funciona, las ayudas/precauciones son contextuales, los forks seleccionan contenido coherentemente y las skills permiten continuar con otras sesiones. Las sesiones futuras deberán pasar el mismo contrato; este plan no inventa su contenido.

El cierre requiere evidencia técnica, pedagógica, visual y editorial. H03 es independiente: escribir este plan y completar su implementación no autorizan commit, push ni despliegue.
