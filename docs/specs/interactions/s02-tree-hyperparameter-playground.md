---
id: s02-tree-hyperparameter-playground
status: draft
page: /sesiones/s02/
packet_id: S02-ARBOLES-DECISION-RANDOM-FOREST
---

# Explorador de hiperparámetros de un árbol de clasificación

Esta interacción comparte la diapositiva `01.4` con el código `DecisionTreeClassifier` y su tabla de parámetros. Los botones actualizan `max_depth` y `min_samples_leaf` en el código visible, el árbol didáctico y el mapa de regiones. El resumen muestra enseguida los efectos de cada cambio.

## Pregunta del lector

¿Cómo cambian las reglas, las hojas y las predicciones cuando limitamos la profundidad o exigimos más ejemplos por hoja?

## Objetivo de aprendizaje

Relacionar `max_depth` y `min_samples_leaf` con la estructura visible de un árbol y seguir cómo una entrada sintética llega a una hoja.

## Estado inicial y fallback

- Datos: doce puntos sintéticos bidimensionales, seis con etiqueta A y seis con etiqueta B.
- Estado inicial: `max_depth=1`, `min_samples_leaf=1`, punto P05 seleccionado.
- El árbol, las regiones coloreadas y la predicción inicial se generan de forma determinista con un CART didáctico de impureza Gini. El diagrama ajusta su escala a la profundidad visible.
- La interacción local ilustra el comportamiento de los controles; no ejecuta scikit-learn. El código visible en la misma diapositiva presenta la API real, y el árbol interactivo usa datos sintéticos.
- Fallback textual: tabla de los doce puntos y las reglas/predicción del estado inicial.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Profundidad máxima | `max_depth` | 1–2 | 1 | preguntas encadenadas | Botones de selección |
| Mínimo por hoja | `min_samples_leaf` | 1–3 | 1 | puntos de entrenamiento | Botones de selección |
| Punto a clasificar | `selectedPoint` | P01–P12 | P05 | identificador | Selector nativo |

## Codificación visual

- Marcas y geometría: regiones rectangulares muestran la clase predicha; círculos y cuadrados muestran los puntos A y B; el borde resalta puntos clasificados correctamente o con error.
- Significado del color: turquesa representa A y coral representa B; las etiquetas visibles repiten la clase.
- Árbol: nodos internos muestran regla y recuentos; hojas muestran clase mayoritaria y composición de los puntos. La predicción de una hoja se resume como `ĉ_R = argmax_k n_{k,R}`, donde `n_{k,R}` cuenta los casos de la clase `k` en la hoja `R`.
- Predicción seleccionada: un aro claro localiza el punto y el texto enumera las reglas recorridas, clase predicha y etiqueta conocida.
- Animación: las regiones cambian al recalcular; el estado final se representa sin animación si se solicita movimiento reducido.

## Comportamiento

- Al elegir profundidad o mínimo por hoja, recalcular el código visible, el árbol, el mapa, el resumen y el recorrido del punto actual.
- `min_samples_leaf` restringe cualquier corte que dejaría menos puntos de entrenamiento en uno de sus hijos.
- El resumen muestra aciertos entre los doce puntos de entrenamiento. La cifra describe este ejemplo y no estima generalización.
- Al reiniciar, volver a los valores iniciales y al punto P05.
- Con teclado, recorrer y activar botones nativos; cada opción mide al menos 44 px de alto y expone su selección con `aria-pressed`.
- En móvil, apilar controles, mapa y árbol en ese orden.
- La actualización se muestra directamente, sin transición animada.
- Ante estados sin cortes válidos, mostrar la raíz como hoja y la clase mayoritaria.

## Texto alrededor de la figura

- Pie: conjunto sintético para aprender a leer reglas; las coordenadas y las etiquetas no describen planetas.
- Qué observar: el árbol añade niveles cuando el corte mejora la pureza y respeta el mínimo de puntos por hoja; una hoja clasifica por mayoría.
- Resumen de estado: hiperparámetros, número de nodos/hojas, aciertos en entrenamiento y ruta de la entrada seleccionada.
- Misconcepción prevenida: una estructura más compleja puede aumentar el ajuste a los datos usados para entrenar sin demostrar mejor desempeño en casos nuevos.
- Qué no demuestra: ajuste real de scikit-learn, desempeño en validación/prueba, estabilidad ante remuestreo ni una clasificación astronómica.

## Matriz de revisión

- [x] Estado inicial produce una raíz con dos hojas y P05 sigue una ruta visible.
- [x] `max_depth=2`, `min_samples_leaf=1` permite añadir divisiones y cambia las predicciones de entrenamiento.
- [x] `min_samples_leaf=3` bloquea las divisiones hijas que dejarían solo dos puntos.
- [x] Selector de punto actualiza su aro, ruta, clase predicha y comparación con la etiqueta conocida.
- [x] El resumen indica que los aciertos se miden sobre los datos sintéticos de entrenamiento.
- [x] Los botones tienen nombres accesibles, opciones táctiles, foco visible y resumen actualizado sin animación.
- [x] La diapositiva `01.4` reúne código, tabla e interacción; los selectores actualizan el código, la tabla y los resultados.
- [x] El texto identifica el árbol interactivo como un CART didáctico con datos sintéticos, separado de la API real del código.
