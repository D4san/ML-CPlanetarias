---
id: s02-bootstrap-resampler
status: draft
page: /sesiones/s02/
packet_id:
---

# Especificación de interacción: remuestreo bootstrap

## Pregunta del lector

¿Cómo obtiene cada árbol una muestra de entrenamiento diferente y qué significa que un caso quede fuera de su remuestra?

## Objetivo de aprendizaje

Al terminar, quien estudia podrá explicar que bootstrap sortea, con reemplazo, tantas observaciones como había en el conjunto original; por eso una remuestra puede repetir casos y omitir otros. También podrá explicar que distintas remuestras pueden llevar a árboles que aprendan patrones distintos, y que un ensamble combina sus predicciones.

## Estado inicial y fallback

La lectura funciona sin activar controles: el estado inicial muestra las tarjetas originales `A`, `B`, `C`, `D` y tres remuestras reproducibles de cuatro sorteos. El botón genera otras tres remuestras; reiniciar devuelve exactamente el estado inicial.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Casos del conjunto didáctico | n | 4 | 4 | tarjetas | fijo |
| Árboles representados | B | 3 | 3 | árboles | fijo |
| Sorteos por remuestra | n | 4 | 4 | tarjetas | fijo |
| Ronda del sorteo | r | entero ≥ 0 | 0 | ronda | `Sortear otras remuestras` / `Reiniciar` |

## Codificación visual

- marcas y geometría: cada fila conecta cuatro tarjetas sorteadas con un esquema de estructura de árbol; las tres estructuras varían para ilustrar reglas posibles, y junto a cada fila se enumeran los casos OOB omitidos en esa ronda.
- significado del color: cada árbol y su fila comparten un acento; el número y el rótulo identifican el árbol sin depender del color.
- etiquetas: el conjunto original define el universo de tarjetas; las repeticiones se marcan en su segunda aparición; `OOB` se desarrolla como casos que quedaron fuera de esa remuestra para ese árbol.
- animación: actualización inmediata, sin movimiento esencial.

## Comportamiento

- al cambiar: cada activación genera tres secuencias reproducibles; cada secuencia contiene cuatro sorteos independientes con reemplazo de `A`, `B`, `C` y `D`.
- al reiniciar: vuelve al sorteo inicial (`B, D, B, A`; `A, C, D, D`; `C, B, C, A`).
- con teclado: los botones nativos reciben foco y se activan con `Enter` o espacio; el foco es visible.
- en móvil: las filas pueden envolverse; el orden de lectura permanece remuestra → árbol → casos OOB.
- con movimiento reducido: no se requiere movimiento para leer los estados.
- ante error o datos vacíos: el universo y las tres remuestras iniciales son constantes locales; se conserva la explicación estática.

## Texto alrededor de la figura

- pie: bootstrap (remuestreo con reemplazo) saca una tarjeta y la devuelve al conjunto antes del siguiente sorteo; así una tarjeta puede repetirse y otra puede no salir. Con cuatro casos, cada árbol recibe cuatro sorteos.
- qué observar: cada fila conserva cuatro tarjetas, aunque una o más pueden repetirse; los casos no sorteados son OOB para ese árbol. Remuestras distintas pueden llevar a estructuras y reglas diferentes.
- resumen de estado: una región viva anuncia la ronda, las tarjetas de cada árbol y los casos OOB correspondientes.
- misconcepción prevenida: OOB es relativo a la remuestra de un árbol; no significa que el caso esté fuera de todo el conjunto ni que sea el conjunto de prueba reservado.
- qué no demuestra: las estructuras son esquemas, no árboles ajustados a las tarjetas A–D. El ejemplo enseña el mecanismo; no estima métricas, desempeño ni la fracción esperada de casos únicos en un bosque real.

## Matriz de pruebas

- [ ] estado inicial determinista y con cuatro sorteos en cada fila;
- [ ] controles, teclado y reinicio;
- [ ] resumen textual actualizado con casos OOB por árbol;
- [ ] desktop, móvil y movimiento reducido;
- [ ] accesibilidad automatizada y revisión manual;
- [ ] snapshot de estados significativos.
