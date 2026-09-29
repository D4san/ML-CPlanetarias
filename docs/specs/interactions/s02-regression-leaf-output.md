---
id: s02-regression-threshold-error
status: draft
page: /sesiones/s02/
packet_id: S02-ARBOLES-DECISION-RANDOM-FOREST
---

# Predicción por hojas y búsqueda de cortes en regresión

Dos subestaciones consecutivas separan la explicación del mecanismo y su exploración. `01.5` usa una tabla y un corte fijo para explicar la media de una hoja, la diferencia con la mediana y la minimización del error cuadrático. `01.6` deja mover el corte raíz, actualiza las medias y el SSE y permite explorar una segunda división dentro de la hoja derecha.

## Pregunta del lector

¿Cómo produce un árbol de regresión un número para una entrada nueva, cómo se relaciona esa predicción con la media o la mediana y cómo cambia el error al probar cortes y profundizar el árbol?

## Objetivos de aprendizaje

- Identificar las columnas sintéticas: ID de fila, entrada `x` y objetivo observado `y`.
- Explicar que `squared_error` predice la media de los objetivos en cada hoja y selecciona cortes que minimizan la suma de residuos al cuadrado.
- Diferenciar la media que usa `squared_error` de la mediana que corresponde a `absolute_error`.
- Seguir una entrada nueva hasta su hoja y explicar por qué recibe el promedio aprendido allí.
- Manipular un corte raíz y un segundo corte local, observando sus efectos sobre las regiones, las predicciones y el SSE de entrenamiento.

## Datos y cálculos de referencia

Todos los datos son inventados para la explicación; no son mediciones planetarias. `P01`–`P06` son IDs de fila, `x` es la entrada y `y` es el número observado que se quiere predecir.

| ID | P01 | P02 | P03 | P04 | P05 | P06 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `x` | 1 | 2 | 3 | 4 | 5 | 6 |
| `y` | 1 | 2 | 30 | 7 | 8 | 9 |

Con el corte ilustrativo fijo `x ≤ 2.5`, la hoja izquierda contiene `y={1,2}` y predice la media `1.5`. La hoja derecha contiene `y={30,7,8,9}` y predice la media `13.5`. Ordenados, los objetivos derechos son `{7,8,9,30}`, cuya mediana es `(8+9)/2=8.5`; `absolute_error` usaría esa mediana. `squared_error` usa la media `13.5`.

- Sin corte, la raíz predice `57/6 = 9.5` y tiene `SSE=557.5`.
- Para estos seis ejemplos, `MSE = SSE/6`; minimizar el SSE y el MSE produce el mismo orden de cortes.
- Con `x ≤ 2.5`, la hoja izquierda tiene `SSE=0.5`, la derecha `SSE=365`, y el total es `365.5`.
- Entre los cinco cortes raíz candidatos (`1.5`, `2.5`, `3.5`, `4.5`, `5.5`), `2.5` tiene el menor SSE: `365.5`.
- Si se divide la hoja derecha con `x ≤ 3.5`, quedan predicciones `1.5`, `30` y `8`, y el SSE total baja a `2.5`.
- Con el árbol fijo en `x ≤ 2.5`, una entrada nueva `x=4.4` recorre la rama derecha y recibe `ŷ=13.5`; la predicción no requiere conocer su `y`.

## Experiencia fija: `01.5`

- La explicación ocupa la columna izquierda e identifica el origen de los datos, el uso de la media, la diferencia con la mediana, la comparación de SSE y la predicción para `x=4.4`.
- La columna derecha da protagonismo al gráfico de puntos y escalones; debajo aparece una tabla horizontal con las seis filas.
- El gráfico marca el corte `2.5`, las medias por hoja y la mediana `8.5` de la hoja derecha con una codificación distinta.
- Las ecuaciones se leen como valores observados menos la predicción de su hoja, al cuadrado y sumados. El total se compara con la raíz sin dividir.

## Experiencia interactiva: `01.6`

### Estado inicial y controles

- Inicio determinista: corte raíz `x ≤ 2.5`, sin segundo corte.
- El control raíz selecciona un umbral entre `1.5`, `2.5`, `3.5`, `4.5` y `5.5`.
- El botón «Añadir otro corte en la hoja derecha» abre la segunda etapa y fija la raíz actual; el control raíz se reemplaza por un resumen de esa regla fija.
- El segundo control selecciona el punto medio entre valores `x` adyacentes de esa hoja; con la raíz inicial, las opciones son `3.5`, `4.5` y `5.5`.
- La etapa dos muestra el efecto del segundo umbral en el gráfico, las medias por hoja y el SSE total; «Volver a un solo corte» regresa al ajuste de la raíz.
- «Reiniciar» vuelve al corte raíz `2.5` y quita el segundo corte.

### Representación y actualización

- El gráfico muestra observaciones, límites de región, media de cada hoja y tramos constantes de predicción. Al añadir un segundo corte, la regla nueva solo atraviesa la región derecha.
- El resumen textual da los umbrales activos, las filas de cada hoja, las medias, el SSE actual y la puntuación mínima encontrada entre los candidatos válidos.
- Mover cualquier umbral actualiza las hojas, sus medias, los residuos cuadrados y el total del SSE.
- El segundo nivel deja visible que volver a cortar una hoja puede reducir el error de entrenamiento. La página posterior sobre generalización desarrolla el riesgo de seguir profundizando.

## Comportamiento, accesibilidad y límites

- Los controles son deslizadores nativos etiquetados; flechas del teclado mueven un paso candidato y el valor elegido se presenta como `x ≤ t`.
- Un resumen `aria-live="polite"` comunica corte, grupos, medias y SSE al cambiar el estado.
- El gráfico SVG incluye título y descripción accesibles; el mismo resumen presenta sus datos sin depender del color.
- El botón de segundo corte se desactiva si la hoja derecha tiene menos de dos observaciones.
- En móvil, texto, figura, controles y tabla se apilan; las etiquetas conservan el piso tipográfico de S02.
- El ejemplo demuestra la mecánica determinista del cálculo sobre estos seis casos; no evalúa generalización ni constituye un resultado científico.
- La mediana se muestra solo para distinguir el criterio absoluto; la interacción calcula `squared_error` y predice con medias.

## Matriz de revisión

- [x] La tabla hace inequívocos ID, entrada `x` y objetivo observado `y`.
- [x] La media `13.5` y la mediana `8.5` aparecen como valores distintos y se atribuyen al criterio correcto.
- [x] `01.5` muestra el SSE de raíz, corte y predicción de una entrada nueva.
- [x] `01.6` actualiza gráfico, hojas, medias y suma de cuadrados al mover ambos deslizadores con teclado y puntero.
- [x] El segundo nivel solo divide la hoja derecha y mantiene fija la regla raíz.
- [x] Controles revisados en 1920×1080, 1440×900 y 390×844; no hay desbordamiento horizontal.
- [x] El resumen `aria-live`, la lectura de cada hoja y el ajuste de movimiento reducido revisados.
