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
  - Kelleher, caps. 1–2
rights:
  status: original
  note: El árbol y el reto de sesgo son una síntesis didáctica interna; requieren revisión antes de cualquier publicación.
---

# S01 · Tarea, familia y sesgo inductivo

## Promesa

La salida define la tarea; la tarea abre varias familias y cada familia deja algunas hipótesis
fuera. El reto hace visible que una categoría híbrida puede desaparecer cuando el modelo obliga a
elegir entre clases cerradas.

## Árbol de tareas y algoritmos

La parada **Tarea y salida** muestra una observación que se ramifica primero por la salida pedida y
después por ejemplos de familias y algoritmos. Las ramas son orientativas y no forman una
taxonomía exhaustiva. El árbol conserva el orden `señal → tarea → familia/algoritmo`: una etiqueta,
una recompensa o una estructura sin etiquetas pertenecen a otra dimensión que debe declararse antes
de escoger la familia.

Cada tarea sigue siendo un control que abre su tarjeta formal. La lista textual de tareas y ejemplos
permanece en el DOM para lectura lineal, móvil y lectores de pantalla.

## Reto de sesgo inductivo

La parada **Familia y aprendizaje** presenta ejemplos de tres clases visibles (`A`, `B`, `C`) y un
objeto nuevo con rasgos mixtos (`A+B`). El lector compara tres decisiones:

- una familia cerrada que fuerza toda salida a `A`, `B` o `C`;
- una familia abierta que conserva `híbrido` o `abstención` como salida posible;
- aumentar la complejidad sin cambiar el conjunto de categorías.

La respuesta esperada es la familia abierta. El modelo elegido define un conjunto de hipótesis y de
salidas posibles; más parámetros no recuperan una clase que el diseño haya excluido. La figura no
afirma que exista una cuarta clase física: muestra cómo una decisión de modelado puede ocultar una
posibilidad que merece inspección y validación.

## Accesibilidad y límites

- El árbol usa botones nativos para abrir tarjetas de tarea y conserva una explicación textual de
  cada rama.
- El reto usa botones con estado, feedback inmediato, reinicio global y navegación por teclado.
- El color acompaña a etiquetas como `familia cerrada`, `híbrido` y `abstención`; no codifica el
  significado por sí solo.
- Los algoritmos son ejemplos de trabajo, no una recomendación automática ni un catálogo completo.

## Matriz mínima de pruebas

- [ ] cada tarea abre su tarjeta y restaura el foco;
- [ ] el árbol muestra seis tareas y al menos dos ejemplos por rama;
- [ ] la opción de familia abierta revela la categoría híbrida y feedback correcto;
- [ ] las opciones cerrada y “más compleja” explican el error conceptual;
- [ ] móvil, proyección 1920×1080, axe y movimiento reducido conservan la lectura.
