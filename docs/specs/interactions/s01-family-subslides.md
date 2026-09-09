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
  note: La comparación de familias y el reto híbrido son síntesis didácticas internas; el caso sustentado espera F01/F04.
---

# S01 · Familia y aprendizaje en tres subslides

## Unidades y orden

| Orden | ID estable | Parte | Superficie principal |
| ---: | --- | --- | --- |
| 1 | `s01-family-opening` | La familia | foco de estación: varias reglas compatibles |
| 2 | `s01-family-rules-learning` | Reglas y aprendizaje | comparación de regla explícita y ajuste desde ejemplos |
| 3 | `s01-family-bias` | Sesgo inductivo | reto del híbrido A+B y familias abierta/cerrada |

Se conservan `#familia`, `#familia/reglas` y `#familia/sesgo`. La actividad `rules` sigue fuera de
la narración y no se marca como resuelta al cambiar de parte o modalidad.

## Comportamiento

- La parte de comparación permite alternar `Reglas explícitas` y `Aprender de datos`, y comunica el
  cambio de flujo sin duplicar la ruta del contenedor.
- La parte de sesgo presenta tres clases A/B/C y una observación híbrida A+B. Las decisiones
  `Familia cerrada`, `Familia abierta` y `Hacerla más compleja` muestran feedback explícito.
- La familia abierta conserva híbrido o abstención; la cerrada fuerza el caso a las categorías
  disponibles. El aumento de complejidad no crea categorías excluidas de antemano.
- En modo directo, la comparación se muestra sin giro; en interactivo, los controles conservan su
  estado y anuncian el feedback. El modo docente añade la pregunta contextual sin alterar la cautión.

## Accesibilidad, visual y límites

Las elecciones son botones nativos con estado `aria-pressed`; el mapa repite la distinción en texto
y no depende del color. Una sola superficie principal se muestra por parte. La composición debe ser
legible en 1920×1080 y 390×844, con scroll vertical para texto directo largo y operación intacta con
movimiento reducido.

Una familia es una hipótesis de trabajo y no garantiza desempeño. El sesgo inductivo describe
preferencias de representación; no equivale por sí solo a un error. La visualización es conceptual y
espera un ejemplo externo con fuente o `not_reported` antes de promoción.

## Comprobaciones

- [ ] Las tres partes y sus hashes son navegables desde carril y pestañas.
- [ ] Reglas/aprendizaje actualiza flujo y feedback sin perder el escenario.
- [ ] Las tres opciones del híbrido son visibles y dejan la cautión explícita.
- [ ] Directo/interactivo, docente, teclado, móvil, proyección y movimiento reducido se verifican.
- [ ] La actividad `rules` conserva estado independiente de la narración.
