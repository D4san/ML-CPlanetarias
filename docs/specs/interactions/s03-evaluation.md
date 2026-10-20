---
id: s03-evaluation
status: draft
page: /sesiones/s03/
packet_id: S03-DE-UN-TRANSITO-A-LAS-METRICAS
---

# Evaluación de señales S03 · estaciones 6–8

## Promesa, audiencia y objeto

El estudiante podrá construir una matriz de confusión con PC como clase positiva, explicar los denominadores de siete métricas y describir qué cambia al mover el umbral de seis puntajes sintéticos. El objeto mínimo es una matriz 2×2 con ejemplos identificables, seguida por una curva calculada desde los mismos puntajes.

Prerrequisito: distinguir etiqueta de referencia, predicción y puntaje. En esta aplicación, PC es positiva y AFP/NTP son negativas; las etiquetas son referencias del catálogo y no confirmaciones físicas.

## Estado inicial y datos didácticos

- La matriz individual contiene veinte casos ficticios: 10 con referencia PC y 10 con referencia AFP/NTP. El estado inicial es TP=7, FP=2, FN=3, TN=8.
- Cada caso conserva fija su referencia. Activar un caso cambia únicamente su predicción y lo mueve entre las dos celdas de la misma fila.
- La pantalla de presets comienza en A: `(TP, FP, FN, TN) = (7, 2, 3, 8)`. A, B y C representan poblaciones ficticias con diez referencias de cada clase. D representa otra población de veinte casos con dos PC y dieciocho negativos.
- Las señales sintéticas tienen puntajes A=0,92 PC; B=0,81 PC; C=0,76 negativa; D=0,63 PC; E=0,54 negativa; F=0,18 negativa. La decisión es `puntaje ≥ umbral`.
- El umbral inicia en 0,80. El control recorre 0–1 en pasos de 0,01 y ofrece accesos directos a 0,80 y 0,50.
- Con 0,80, la matriz es TP=2, FP=0, FN=1, TN=3. Con 0,50, es TP=3, FP=2, FN=0, TN=1. El AUC ROC de los seis puntajes es 8/9, independiente del umbral.

## Interacciones

1. **Cambiar una predicción:** las fichas de la matriz individual se pueden activar con puntero o teclado. El conteo y las métricas cambian en vivo; la clase de referencia de cada ID no cambia. Cada ficha muestra su predicción como «Tránsito» o «NTránsito», se mueve a la celda correspondiente y adopta su color.
2. **Comparar conteos:** A, B, C y D son botones con estado inicial determinista. La pantalla muestra el tuple completo y la población que lo produjo. D debe identificarse como población diferente.
3. **Mover el umbral:** el deslizador y los botones 0,80/0,50 actualizan predicciones, matriz, métricas y punto de operación. Los puntajes y referencias permanecen fijos.
4. **Leer PR, ROC y AUC:** las curvas se calculan con los puntajes del ejemplo. La curva ROC interpola linealmente sus puntos de operación y el AUC se calcula por pares positivo–negativo; empates aportan 0,5. Precision queda indefinida si no hay predicciones positivas y ese punto se omite de PR.

## Métricas y explicación obligatoria

Cada pantalla usa el mismo estado de veinte casos y presenta, en este orden, pregunta, denominador, fórmula, sustitución, interpretación y consecuencia/límite:

| ID | Denominador | Fórmula |
| --- | --- | --- |
| `metric-accuracy` | TP + TN + FP + FN | (TP + TN) / N |
| `metric-error` | TP + TN + FP + FN | (FP + FN) / N |
| `metric-precision` | TP + FP | TP / (TP + FP) |
| `metric-recall` | TP + FN | TP / (TP + FN) |
| `metric-specificity` | TN + FP | TN / (TN + FP) |
| `metric-fpr` | FP + TN | FP / (FP + TN) = 1 − especificidad |
| `metric-f1` | 2TP + FP + FN | 2TP / (2TP + FP + FN) |

Un denominador igual a cero produce `indefinida`; la interfaz conserva el numerador y denominador visibles. Para F1 se usa la fórmula directa en conteos, que permite F1=0 cuando no hay predicciones positivas pero sí referencias positivas. Los ceros verdaderos negativos no entran en F1.

En cada matriz métrica, un borde verde identifica el numerador y uno azul el denominador; las celdas que cumplen ambos roles muestran ambos bordes. La sustitución numérica y la lectura textual ofrecen la misma operación para lectoras de pantalla. En la pantalla de precision, PC-01 (TP) y NEG-01 (FP) son ejemplos activables dentro de la matriz: cada botón mueve una sola predicción y conserva su referencia. La matriz completa de veinte casos permanece disponible en la pantalla propia de confusión.

## Composición visual y semántica

- La matriz rotula las clases visibles como «Tránsito» y «NTránsito», define Tránsito como PC y NTránsito como AFP/NTP, y muestra filas como referencia y columnas como predicción. Cada celda tiene un color propio (TP verde, FN ámbar, FP rojo, TN violeta) y mantiene el nombre y conteo; texto y posición conservan la distinción sin depender solo del color.
- La partición 80/10/10 asigna una función clara a entrenamiento, validación y prueba. El diagrama informa la proporción y el propósito de cada conjunto.
- El gráfico PR didáctico se calcula con seis puntajes ficticios y lleva recall en el eje horizontal y precision en el vertical. A un lado aparece la Figura 6 original, con cita visible y ampliación, para comparar la curva de aula con los resultados del paper.
- ROC lleva FPR en el eje horizontal y TPR en el vertical. La pantalla AUC muestra los nueve pares positivo–negativo y seis áreas por tramo, incluida la suma exacta `2/9 + 1/3 + 1/3 = 8/9`; distingue el punto que se mueve con el umbral del área, que depende del orden fijo de los puntajes.
- Los colores usan los roles de `VISUAL_SYSTEM.md` y llevan etiquetas o patrones redundantes. SVG conserva ejes, marcas, títulos y descripción accesible en HTML/SVG.

## Lectura directa y fallback

La prosa, los denominadores, las fórmulas y los límites permanecen visibles sin interacción. El libro sin JavaScript incluye la partición, el estado inicial de la matriz, los cuatro presets, las dos matrices de umbral y el resultado 8/9 con su tabla de nueve comparaciones. Las curvas interactivas se acompañan con una descripción textual del conjunto y del punto de operación. Ninguna conclusión esencial depende de JavaScript o de pasar el puntero.

## Misconcepciones y límites

- `AFP` es una clase astronómica del catálogo; `FP` es un error de predicción respecto a una etiqueta. No se intercambian esos nombres.
- Precision usa predicciones positivas como denominador; recall y especificidad usan referencias positivas y negativas, respectivamente.
- Accuracy alta puede coexistir con recall cero en una población desbalanceada.
- Cambiar umbral cambia el punto de operación; no cambia los puntajes, las referencias ni el AUC de este conjunto.
- ROC-AUC resume ordenamiento. No es accuracy, no fija un umbral, no calibra probabilidades y no confirma planetas.
- Los casos y puntajes son ficticios y didácticos. No son una réplica de Shallue y Vanderburg ni evidencia de desempeño astronómico.
- La Figura 6 del artículo aparece junto al gráfico didáctico; cada representación conserva pie, cita y enlace al paper.

## Matriz mínima de pruebas

- Confirmar para los veinte casos iniciales `(7,2,3,8)` y que activar una ficha conserva su referencia.
- Probar los cuatro presets, los denominadores cero y las siete sustituciones métricas.
- En las siete pantallas métricas, cambiar una predicción debe actualizar los conteos, la matriz y el resultado; la referencia del caso permanece fija y los bordes de numerador/denominador señalan las celdas correspondientes.
- Confirmar `≥` en puntajes exactamente iguales al umbral; verificar las matrices de 0,80 y 0,50.
- Confirmar los nueve pares y AUC=8/9 por pares y por las seis áreas trapezoidales visibles, tratamiento de empates con 0,5 y AUC indefinida si falta una clase.
- Usar controles con teclado y leer sus estados actualizados; revisar foco visible, resumen de estado y nombres accesibles de la matriz y las curvas.
- Comprobar móvil sin desbordamiento global, movimiento reducido y lectura equivalente sin JavaScript.
