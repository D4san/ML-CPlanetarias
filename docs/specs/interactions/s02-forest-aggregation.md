---
id: s02-forest-aggregation
status: draft
page: /sesiones/s02/
packet_id: S02-ARBOLES-DECISION-RANDOM-FOREST
---

# Bosque: filas, variables, nodos y agregación

## Pregunta y objetivo

¿Qué cambia entre los árboles y cómo combinamos sus salidas? Identificar planeta/fila, predictor/columna, nodo/división y árbol/modelo; distinguir remuestreo de filas, selección de columnas por nodo y promedio de predicciones.

## Estado y ejemplo trabajado

`#forest` abre tres paneles: bootstrap, variables candidatas por nodo y agregación. El detalle desplegable define cuatro filas sintéticas A–D con masa, radio, irradiación y clase didáctica. Las clases «tipo Tierra» y «tipo Neptuno» son etiquetas ilustrativas.

- Inicio: Clasificación seleccionada (`aria-pressed`). Tres árboles dan `P(Tierra)={0.8,0.6,0.2}` y probabilidades complementarias de Neptuno.
- Resultado: `(0.8+0.6+0.2)/3=0.5333`; tipo Tierra `53.3 %`, tipo Neptuno `46.7 %`. scikit-learn elige la clase con mayor probabilidad promedio.
- Regresión: tres radios `{2.1,2.7,3.0} R⊕` producen `2.6 R⊕` para el mismo planeta.
- La tabla de candidatos cambia el subconjunto entre nodos del mismo árbol y entre árboles. El regresor del notebook usa `max_features=1.0`: considera todas las variables candidatas. Valores menores permiten explorar la selección aleatoria.

Todos los números y árboles de la figura son didácticos; no son modelos entrenados ni mediciones del catálogo.

## Control → resultado → interpretación

Botones nativos Clasificación/Regresión → selección visible → tabla de probabilidades o radios → promedio y unidad → significado de la salida. La región `status` anuncia el resultado. Volver a Clasificación restaura el ejemplo inicial; el reinicio general remonta la escena desde la portada. El detalle de filas usa `details/summary` nativo.

El remuestreo interactivo conserva su contrato propio en [s02-bootstrap-resampler.md](s02-bootstrap-resampler.md). El ejemplo de probabilidad evita presentar una votación de etiquetas como la operación del clasificador de scikit-learn. Reducir varianza depende de la diversidad de errores; la figura no demuestra desempeño científico.

## Lectura y accesibilidad

Teclado: Tab, Enter y espacio; foco y estado seleccionado visibles. Móvil: paneles en una columna y tablas desplazables sin ocultar controles globales. Sin JavaScript: el panel SSR conserva el ejemplo de clasificación; la lectura lineal explica las dos tareas. Movimiento reducido: cambio inmediato, sin animación esencial.

## Evidencia y fuentes

- `S02LearningJourney.test.tsx`: estados y reinicio bootstrap; `session-feedback.e2e.spec.ts`: promedio de probabilidades y cambio a radio; pruebas axe y movimiento reducido de S02.
- [Random forests, scikit-learn](https://scikit-learn.org/stable/modules/ensemble.html#random-forests).
- [RandomForestRegressor, max_features](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestRegressor.html).
- Revisión visual y límites de validación: [I03](../../planning/agent-execution/evidence/I03.md).
