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
  note: El mapa, las tarjetas y la escena son síntesis didácticas internas; los ejemplos externos esperan F01/F04.
---

# S01 · Señal y paradigma en tres subslides

## Unidades y orden

| Orden | ID estable | Parte | Superficie principal |
| ---: | --- | --- | --- |
| 1 | `s01-signal-opening` | La señal | foco de estación: qué información está disponible |
| 2 | `s01-signal-paradigms` | Tres paradigmas | mapa SVG/HTML y tarjetas de supervisado, no supervisado y refuerzo |
| 3 | `s01-signal-route` | La ruta activa | predicción de la señal y feedback según la ruta astronómica |

La secuencia conserva el hash `#senal` para la apertura; `#senal/paradigmas` y
`#senal/ruta` son deep links de las partes 2 y 3. `Anterior`, `Siguiente`, el carril y las
pestañas de parte resuelven la misma secuencia aplanada.

## Comportamiento

- La apertura mantiene el panel de llegada y la pregunta docente cuando `teacherMode` está activo.
- El mapa pregunta `qué buscamos → qué tenemos → cómo aprendemos` y conserva tres señales distintas:
  `D = {(xᵢ, yᵢ)}`, estructura sin objetivo etiquetado y transición con recompensa.
- El mapa se genera por capas: primero aparece la pregunta, luego la información disponible y después
  las tres rutas. `Construir siguiente capa`, los botones de capa, `Ver mapa completo` y `Reiniciar`
  mantienen la secuencia bajo control del lector y actualizan un resumen textual del estado.
- Cada tarjeta muestra primero la pregunta; el modo interactivo revela definición, ejemplo y límite
  tras voltear y devuelve el foco al control de origen. El modo directo presenta esa información sin
  diálogo ni giro.
- La parte de ruta exige una predicción antes del feedback. Retirar etiquetas o agregar recompensa
  cambia el paradigma disponible; una red neuronal no lo determina por sí sola.
- La selección de `spectrum`, `catalog` o `followup` llega del contenedor y cambia el prompt y la
  respuesta, sin estado local duplicado de ruta.

## Accesibilidad, visual y límites

Los controles son botones nativos con nombres de paradigma y foco visible. El mapa repite la
distinción en texto; los SVG tienen título/descripción. El fallback lineal y la lectura completa
permiten seguir el argumento sin depender de la figura. La escena debe conservar una sola superficie
principal por parte, caber en 1920×1080 y no desbordar 390×844; textos directos extensos pueden
desplazarse verticalmente. Movimiento reducido elimina transiciones espaciales sin ocultar estados.

Los ejemplos de abundancia, catálogo y seguimiento son marcadores didácticos hasta que F01/F04
aporten fuente y alcance. No se presenta una etiqueta, objetivo o recompensa como sinónimo de otro.

## Comprobaciones

- [ ] Las tres partes y sus deep links resuelven el ID correcto.
- [ ] Las tres rutas producen la señal y el feedback correspondientes.
- [ ] Interactivo/directo mantienen la explicación conceptual y la diferencia de revelación.
- [ ] Apertura de tarjeta, giro, Escape, cierre y restauración de foco pasan.
- [ ] La construcción por capas, el salto de capa, `Ver mapa completo` y `Reiniciar` pasan con
  teclado y movimiento reducido.
- [ ] Axe, movimiento reducido, 1920×1080, 390×844 y la subruta se verifican en el ensamblado.
