---
id: s02-exoplanet-prediction-question
status: draft
page: /sesiones/s02/
packet_id:
---

# Especificación de interacción: plantear una predicción con exoplanetas

## Pregunta del lector

¿Podemos estimar el radio de un exoplaneta con la masa disponible en el catálogo? ¿Qué cambia al añadir la irradiación recibida?

## Objetivo de aprendizaje

Quien estudia identifica una fila de PSCompPars como un planeta, distingue la variable objetivo (`pl_rade`) de los predictores (`pl_bmasse`, y luego `pl_insol`) y formula una comparación que pueda evaluar en sistemas estelares reservados. Reconoce que `pl_name` identifica, `hostname` permite agrupar la partición y ninguna de las dos columnas es predictor.

## Estado inicial y fallback

El estado inicial presenta la comparación A: usar `pl_bmasse` para estimar `pl_rade`. El contenido estático explica qué tabla se usará, el papel de sus columnas y sus límites. La actividad no carga datos ni muestra resultados de modelos; sus controles cambian la pregunta y el diagrama. Los enlaces al archivo y su documentación quedan disponibles aunque no se activen controles.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| comparación de predictores | modelo | `masa`, `masa + irradiación` | `masa` | conjunto de columnas | botones A/B |
| masa reportada | `pl_bmasse` | columna del catálogo | incluida | `M⊕` | selección B mantiene |
| irradiación recibida | `pl_insol` | columna del catálogo | omitida | flujo terrestre `S⊕` | selección B la añade |
| radio planetario | `pl_rade` | columna objetivo | objetivo | `R⊕` | fijo |

## Codificación visual

- marcas y geometría: una tabla de esquema muestra columnas de ejemplo sin inventar mediciones; chips de predictores fluyen hacia un bloque de modelo y luego hacia `pl_rade`.
- significado del color: predictores en acento de datos, el bloque del modelo en acento de decisión y el objetivo en acento de regla; los rótulos siempre explican la función.
- etiquetas: llamar al resultado `radio que el modelo intenta estimar`, no radio observado de un caso nuevo. Nombrar la tabla `Planetary Systems Composite Parameters (PSCompPars)`.
- animación: ninguna animación esencial; el cambio de modo es inmediato.

## Comportamiento

- al cambiar: los botones A/B actualizan las columnas resaltadas, el resumen textual y la pregunta de comparación. A usa `pl_bmasse`; B añade `pl_insol`; ambos mantienen `pl_rade` como objetivo.
- al reiniciar: al volver a la diapositiva, se presenta el estado inicial A.
- con teclado: botones nativos con foco visible; `Enter` y espacio activan la selección; `aria-pressed` identifica el modo y una región `aria-live="polite"` resume el cambio.
- en móvil: apilar contexto, diagrama, selector y enlaces en orden de lectura; permitir que la tabla de esquema se desplace horizontalmente si hace falta.
- con movimiento reducido: el cambio no depende de animación.
- ante error o datos vacíos: no hay consulta remota ni cálculo; se conserva el esquema y la explicación estática.

## Texto alrededor de la figura

- pie: NASA Exoplanet Archive publica PSCompPars como una tabla compuesta, con una fila por planeta; para completar columnas puede combinar referencias y ciertos valores derivados. Por eso se revisan referencias, límites e incertidumbres antes de modelar.
- qué observar: A propone masa como predictor; B añade irradiación. `pl_name` es identificador. `hostname` mantiene los planetas de cada sistema juntos al separar entrenamiento y prueba.
- resumen de estado: “Comparación A: `pl_bmasse` → modelo → `pl_rade`” o “Comparación B: `pl_bmasse` + `pl_insol` → modelo → `pl_rade`”.
- misconcepción prevenida: el selector no demuestra que la irradiación mejore el MAE, y el diagrama no contiene mediciones reales. Antes de ajustar se audita si `pl_rade` fue calculado a partir de masa, para prevenir fuga de información.
- qué no demuestra: PSCompPars no garantiza que todos los valores de una fila provengan de una misma referencia ni que la comparación tenga validez causal o describa todos los exoplanetas.

## Matriz de pruebas

- [ ] estado inicial determinista con `pl_bmasse` y `pl_rade`;
- [ ] botones A/B, teclado, `aria-pressed` y resumen actualizado;
- [ ] enlaces oficiales de tabla, columnas, métodos y TAP;
- [ ] desktop y móvil, con tabla legible y orden de lectura claro;
- [ ] revisión de que la interacción no presenta valores de rendimiento;
- [ ] movimiento reducido y revisión de accesibilidad manual.
