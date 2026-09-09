---
packet: S01-ML-IA-metodos-estadisticos
kind: interaction-spec
status: drafting
visibility: internal
publish_ready: false
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion narrativo para impartir la sesión
source_refs:
  - Géron, cap. 1
  - Géron, cap. 2
  - Kelleher, caps. 1–2
rights:
  status: original
  note: Las tarjetas, el árbol y sus ejemplos son síntesis didácticas internas; requieren revisión editorial antes de publicar.
---

# S01 · Tarea y salida en tres subslides

## Unidades y orden

| Orden | ID estable | Parte | Superficie principal |
| ---: | --- | --- | --- |
| 1 | `s01-task-opening` | La tarea | foco de estación: la forma de la salida |
| 2 | `s01-task-tree` | Árbol de salidas | seis ramas de `TaskAlgorithmTree` y tarjetas de definición |
| 3 | `s01-task-levels` | Tres niveles | guía señal → tarea → familia y ruta activa |

La apertura conserva `#tarea`; las partes de desarrollo se abren con `#tarea/salidas` y
`#tarea/niveles`. La navegación de la barra y los controles de estación usan estos mismos IDs.

## Comportamiento

- El árbol distingue valor continuo, clase/probabilidad, grupos, rareza, acción y muestra.
- Cada rama es un botón accesible. En interactivo abre una tarjeta que conserva pregunta, definición,
  ejemplo y límite; la definición no aparece antes del giro. En directo las definiciones quedan
  expuestas en el flujo sin abrir diálogo.
- La guía de niveles mantiene la dependencia semántica: la señal informa, la tarea determina la
  salida y la familia propone relaciones comparables. La rama resaltada depende de la ruta, pero las
  demás siguen visibles para comparación.
- La ruta y el escenario llegan del contenedor. La escena no elige automáticamente un único algoritmo.

## Accesibilidad, visual y límites

Los controles tienen nombre de tarea, `aria-pressed` y foco restaurable tras `Escape` o cierre. El
árbol conserva pie textual y la lectura lineal repite la relación. SVG/HTML y tarjetas deben leerse en
1920×1080 y 390×844; la tarjeta puede desplazarse verticalmente en móvil. Con movimiento reducido,
la tarjeta sigue operable y el contenido se muestra sin transición espacial.

La tarea no es un algoritmo: regresión, clasificación, clustering, anomalía, decisión y generación
son salidas con preguntas distintas. Los nombres de métodos son ejemplos de trabajo y no resultados
científicos ni recomendaciones automáticas. Los casos astronómicos concretos esperan F01/F04.

## Comprobaciones

- [ ] Las seis ramas y las tres partes se localizan por IDs estables.
- [ ] Cada tarjeta conserva frente, giro, definición, límite, cierre y foco de origen.
- [ ] La guía muestra los tres niveles y mantiene la rama activa sin ocultar alternativas.
- [ ] Directo/interactivo preservan el contenido conceptual con distinta revelación.
- [ ] Axe, movimiento reducido, proyección, móvil, build y subruta se verifican en el ensamblado.
