---
id: session-book-reading
status: draft
page: /sesiones/s00/, /sistema/, /sesiones/s02/
packet_id: I04
---

# Libro interactivo S00–S02

## Promesa, audiencia y objeto

Un estudiante que estudia por su cuenta puede reconstruir el argumento de la sesión, resolver un ejemplo pequeño y explicar qué permite concluir, sin escuchar al profesor. Audiencia: introducción a ML para ciencias planetarias. Objeto mínimo: capítulo con explicación continua, ejemplo trabajado, exploración pertinente y comprobación razonada.

## Estado inicial y variables

`?modo=lectura` abre el libro. Los IDs originales siguen enlazando al capítulo que los desarrolla; índice de capítulos con enlaces nativos. No hay progreso persistente ni calificación. Cada comprobación comienza cerrada y usa `details/summary`; abrirla muestra una respuesta explicada. Cerrar y abrir de nuevo no altera otros capítulos. Las figuras mantienen rangos, unidades, estado inicial y reinicio de sus fichas existentes.

## Composición y feedback

Columna editorial de hasta 72 caracteres sobre papel cálido; instrumentos sobre la superficie oscura común, con consigna antes y explicación después. El color acompaña rótulos y nunca codifica solo una distinción. Los ejemplos sintéticos se identifican como didácticos. El contenido esencial y los límites permanecen visibles. Las preguntas para el profesor pueden añadirse, pero nunca contienen la única explicación de un concepto.

## Navegación y comportamiento

- Índice → capítulo enlazado → título enfocable y URL compartible. Anterior/siguiente del libro recorren capítulos; el cambio a presentación conserva la unidad asociada al capítulo visitado.
- Se conserva la asociación con las rutas y unidades originales, con referencias al final. El libro agrupa unidades contiguas sin duplicar su identidad ni el orden conceptual.
- Comprobación → abrir «Leer el razonamiento» → respuesta visible; funciona con teclado y sin JavaScript.
- Móvil: índice y notas en flujo, figuras apiladas, sin alturas fijas; tablas con desplazamiento local si lo necesitan.
- Movimiento reducido: desplazamiento inmediato. Sin JavaScript: la misma prosa, ejemplos y respuestas; se omiten widgets y se conserva su explicación escrita.
- El cambio entre modos puede remontar figuras con estado local; no se promete conservar controles locales. S01 conserva el estado que administra su contenedor.

## Ejemplo trabajado

Ocho casos sintéticos: cuatro A y cuatro B. Gini inicial `1 − (4/8)² − (4/8)² = 0,5`. Corte con hijos de cuatro casos, composiciones `(3 A, 1 B)` y `(1 A, 3 B)`: Gini de cada hijo `0,375`; ponderación `4/8 × 0,375 + 4/8 × 0,375 = 0,375`; reducción `0,125`. La explicación precede al explorador, cuyo conjunto propio puede ser distinto. La ganancia describe ese nodo de entrenamiento, sin garantizar generalización.

## Matriz de pruebas

Verificar índice y enlaces históricos, retorno a presentación, respuesta abierta/cerrada con teclado, prosa sin JS, ausencia de overflow global a 390 px, axe y movimiento reducido. Ejecutar check, unitarias y builds raíz/subruta. Inspeccionar capturas locales; los goldens Linux mantienen su gate independiente.
