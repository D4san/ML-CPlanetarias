---
id: s03-evaluation
status: draft
page: /sesiones/s03/
packet_id: S03-DE-UN-TRANSITO-A-LAS-METRICAS
---

# Evaluación de señales S03 · estaciones 6–8

## Promesa, audiencia y objeto

El estudiante podrá clasificar ocho escenas conceptuales como «tránsito» o «no tránsito», observar cómo la predicción y la referencia determinan TP/FN/FP/TN, explicar por qué esos errores tienen consecuencias distintas para la búsqueda y después calcular métricas sobre una muestra didáctica independiente. El hilo posterior presenta siete métricas y muestra qué cambia al mover el umbral de seis puntajes sintéticos.

Prerrequisito: distinguir etiqueta de referencia, predicción y puntaje. En esta aplicación, PC es positiva y AFP/NTP son negativas; las etiquetas son referencias del catálogo y no confirmaciones físicas.

## Estado inicial y datos didácticos

- La interacción 6.2 contiene ocho tarjetas sin predicción inicial: dos con referencia PC, tres AFP y tres NTP. Cada tarjeta usa una de tres escenas conceptuales repetidas (tránsito, binaria eclipsante y variación estelar sin tránsito); no muestra ID ni la etiqueta de referencia antes de clasificar.
- El estudiante arrastra cada tarjeta a «predecir tránsito» o «predecir no tránsito». La alternativa accesible usa botones por tarjeta. Al clasificarla, la interfaz revela PC, AFP o NTP, ubica la tarjeta en la fila y columna correspondientes, muestra TP/FN/FP/TN y actualiza el resumen. La referencia se mantiene fija; cambiar la predicción mueve la tarjeta entre las dos celdas de la misma fila.
- La mini actividad de ocho tarjetas enseña la lectura de la matriz y no alimenta los cálculos siguientes. Las pantallas de métricas usan otra matriz ficticia de veinte señales, 10 con referencia PC y 10 con AFP/NTP: TP=7, FP=2, FN=3, TN=8.
- Las siete métricas usan la misma matriz numérica fija. La selección de casos y el cambio de predicciones se trabajan en 6.2; no se repiten como controles en cada métrica.
- La secuencia de 6.3 narra el paso desde un TCE detectado por Kepler hasta la priorización de la CNN y la revisión posterior. Presenta un FP asociado a una binaria eclipsante AFP y un FN asociado a una referencia PC relegada por una predicción negativa; son ejemplos narrativos y no provienen de casos individuales del artículo.
- Las señales sintéticas tienen puntajes A=0,92 PC; B=0,81 PC; C=0,76 negativa; D=0,63 PC; E=0,54 negativa; F=0,18 negativa. La decisión es `puntaje ≥ umbral`.
- El umbral es el valor de corte elegido para convertir un puntaje en una predicción: si el puntaje lo iguala o supera se predice PC; si queda por debajo, no tránsito. Inicia en 0,80, recorre 0–1 en pasos de 0,01 y ofrece accesos directos a 0,80 y 0,50. Un ejemplo con la señal C cambia junto con el control y la matriz presenta los conteos sin repetirlos en un resumen adicional.
- Con 0,80, la matriz es TP=2, FP=0, FN=1, TN=3. Con 0,50, es TP=3, FP=2, FN=0, TN=1. El AUC ROC de los seis puntajes es 8/9, independiente del umbral.

## Interacciones

1. **Clasificar señales:** ocho tarjetas conceptuales se pueden arrastrar a dos áreas de predicción. Botones equivalentes hacen la misma acción con teclado o pantalla táctil. Al menos una clasificación activa la matriz; cada tarjeta revela su referencia y ocupa su celda. Las señales ya clasificadas incluyen un botón para cambiar la predicción. Un botón reinicia las ocho.
2. **Leer errores con contexto:** la vista 6.3 expone el recorrido TCE → priorización → revisión humana, y conecta una falsa alerta FP con tiempo de revisión potencial y una omisión FN con posible pérdida de recuperación. El texto indica que las consecuencias dependen de los objetivos y recursos del estudio.
3. **Mover el umbral:** el deslizador y los botones 0,80/0,50 actualizan predicciones, matriz, métricas y punto de operación. Los puntajes y referencias permanecen fijos.
4. **Leer PR, ROC y AUC:** las curvas se calculan con los puntajes del ejemplo. La curva ROC interpola linealmente sus puntos de operación y el AUC se calcula por pares positivo–negativo; empates aportan 0,5. Precision queda indefinida si no hay predicciones positivas y ese punto se omite de PR.

## Métricas y explicación obligatoria

Cada pantalla usa el mismo ejemplo de veinte casos. Una definición breve acompaña la matriz y una explicación guiada de tres pasos construye la fórmula: qué cuenta el numerador, qué reúne el denominador y cómo interpretar y usar el resultado, con un límite pertinente. En F1 se aclara que es una media armónica de precision y recall, no una proporción de señales. Los botones de paso permiten avanzar y retroceder con teclado; cada recorrido comienza en el primer paso y ofrece un resumen completo sin JavaScript.

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

La matriz ofrece los cuatro conteos una vez; la fórmula y su sustitución muestran qué cantidades participan de cada operación. La definición y la interpretación conservan la distinción entre referencia y predicción sin repetir la leyenda de la matriz ni añadir controles para modificar los casos.

## Composición visual y semántica

- La matriz rotula las clases visibles como «Tránsito» y «NTránsito», define Tránsito como PC y NTránsito como AFP/NTP, y muestra filas como referencia y columnas como predicción. Cada celda tiene un color propio (TP verde, FN ámbar, FP rojo, TN violeta) y mantiene el nombre y conteo; texto y posición conservan la distinción sin depender solo del color.
- La actividad 6.2 usa miniaturas sin números ni IDs visibles. La etiqueta del catálogo aparece al clasificar; el texto de la tarjeta y la celda comunica su tipo de señal y la referencia. La actividad termina con la nota de que AFP/NTP forman la referencia negativa.
- La partición 80/10/10 asigna una función clara a entrenamiento, validación y prueba. El diagrama informa la proporción y el propósito de cada conjunto.
- El gráfico de precisión y recuperación se calcula con seis puntajes ficticios y lleva recall en el eje horizontal y precision en el vertical. La narración explica cómo cambiar el umbral mueve el punto y afecta la selección, y que la precisión no baja necesariamente en cada paso. Para una misma recuperación, una curva más alta indica mayor precisión en esa muestra; la comparación depende de la zona de interés. El punto actual conserva una descripción accesible, sin pie numérico visible. La Figura 6 original presenta las arquitecturas lineal, totalmente conectada y convolucional evaluadas sobre el mismo conjunto de prueba, con cita y ampliación.
- La curva ROC lleva la tasa de falsos positivos entre las referencias negativas en el eje horizontal y la recuperación entre las referencias positivas en el vertical. En 8.3 se explican los efectos del umbral, la esquina superior izquierda y la diagonal de referencia aleatoria; el punto conserva una descripción accesible sin pie numérico visible. En 8.4, la gráfica a la izquierda sombrea el área bajo la curva; la lectura a la derecha interpreta el valor del ejemplo y distingue el resultado publicado. Mover el umbral desplaza el punto sin cambiar el área. Los nueve pares y las seis áreas por tramo, incluida la suma exacta `2/9 + 1/3 + 1/3 = 8/9`, se conservan en un desplegable accesible por teclado.
- Los colores usan los roles de `VISUAL_SYSTEM.md` y llevan etiquetas o patrones redundantes. SVG conserva ejes, marcas, títulos y descripción accesible en HTML/SVG.

## Lectura directa y fallback

La prosa, las consecuencias, los denominadores, las fórmulas y los límites permanecen visibles sin interacción. La explicación textual identifica las tres escenas, las dos decisiones posibles y el significado de cada celda; la interacción permite practicar y ver cada referencia. Las curvas se acompañan con una descripción textual del conjunto y del punto de operación. Ninguna conclusión esencial depende de arrastrar o de pasar el puntero.

## Misconcepciones y límites

- `AFP` es una clase astronómica del catálogo; `FP` es un error de predicción respecto a una etiqueta. No se intercambian esos nombres.
- Precision usa predicciones positivas como denominador; recall y especificidad usan referencias positivas y negativas, respectivamente.
- Accuracy alta puede coexistir con recall cero en una población desbalanceada.
- Cambiar umbral cambia el punto de operación; no cambia los puntajes, las referencias ni el AUC de este conjunto.
- ROC-AUC resume ordenamiento. No es accuracy, no fija un umbral, no calibra probabilidades y no confirma planetas.
- Los casos y puntajes son ficticios y didácticos. No son una réplica de Shallue y Vanderburg ni evidencia de desempeño astronómico.
- La Figura 6 del artículo aparece junto al gráfico didáctico; cada representación conserva pie, cita y enlace al paper.

## Matriz mínima de pruebas

- Confirmar las ocho referencias iniciales (PC×2, AFP×3, NTP×3), que no aparecen antes de clasificar, y que clasificar revela etiqueta, fila, celda y conteo correctos.
- Confirmar ambas vías de interacción (arrastre y botones), cambiar una predicción conservando la referencia y reiniciar la actividad.
- Confirmar que la matriz de veinte señales para métricas comienza en `(7,2,3,8)`, separada de la actividad de ocho tarjetas; revisar denominadores cero y las siete sustituciones métricas.
- En las siete pantallas métricas, comprobar que la definición, los valores y la fórmula correspondan a la misma matriz fija; confirmar que no reaparezcan el selector de casos ni los conteos duplicados.
- Confirmar `≥` en puntajes exactamente iguales al umbral; verificar las matrices de 0,80 y 0,50.
- Confirmar los nueve pares y AUC=8/9 por pares y por las seis áreas trapezoidales visibles, tratamiento de empates con 0,5 y AUC indefinida si falta una clase.
- Usar controles con teclado y leer sus estados actualizados; revisar foco visible, resumen de estado y nombres accesibles de la matriz y las curvas.
- Comprobar móvil sin desbordamiento global, movimiento reducido y lectura equivalente sin JavaScript.
