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
  note: La curva, la línea base y el reto de afirmaciones son esquemas didácticos internos; no reportan resultados.
---

# S01 · Evidencia y límites en tres subslides

## Unidades y orden

| Orden | ID estable | Parte | Superficie principal |
| ---: | --- | --- | --- |
| 1 | `s01-evidence-opening` | La evidencia | foco de estación: comparación, uso e interpretación |
| 2 | `s01-evidence-capacity` | Capacidad y generalización | curvas de subajuste, ajuste útil y sobreajuste |
| 3 | `s01-evidence-claim` | Afirmación defendible | selección de capacidad y alcance de conclusión |

La secuencia conserva `#evidencia`, `#evidencia/capacidad` y `#evidencia/afirmacion`. La parte 3
regresa la cadena a la pregunta mediante condiciones, partición, métrica, dominio y uso.

## Comportamiento

- El gráfico distingue línea base, datos de ajuste y puntos no vistos con barras de error. Los tres
  estados de capacidad cambian curva y texto, sin introducir números no respaldados.
- La parte final permite elegir capacidad y una de tres afirmaciones. Solo la afirmación predictiva
  acotada recibe feedback correcto; las demás explican por qué una predicción no demuestra mecanismo
  físico ni validez universal.
- Directo presenta el contenido de la escena sin giro; interactivo conserva controles, estados y
  feedback. La ruta del escenario no altera el alcance de la evidencia.
- El modo docente añade una pregunta contextual y la precaución permanece para cualquier lector.

## Accesibilidad, visual y límites

Las capacidades y afirmaciones son botones nativos con `aria-pressed`; el feedback usa región viva.
La gráfica repite el significado de colores y líneas en texto y descripción. Una parte principal
queda visible cada vez. La escena debe leerse en 1920×1080 y 390×844, permitir scroll vertical en
contenido directo y seguir operable con movimiento reducido.

El ajuste al entrenamiento no equivale a generalización sobre datos nuevos. La línea base es una
comparación mínima; una visualización conceptual no demuestra física, causalidad o universalidad.
F01/F03/F04 deben aportar fuente, proceso o `not_reported` antes de promover afirmaciones externas.

## Comprobaciones

- [ ] Las tres partes y sus deep links se restauran desde historial.
- [ ] Subajuste, ajuste útil y sobreajuste actualizan la lectura sin inventar métricas.
- [ ] Las tres afirmaciones dejan explícitos alcance y límites.
- [ ] Directo/interactivo, docente, teclado, axe, proyección, móvil, movimiento reducido y subruta
  se verifican en el ensamblado.
