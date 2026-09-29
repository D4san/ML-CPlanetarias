---
id: s02-linear-reading-mode
status: draft
page: /sesiones/s02/
packet_id: S02-arboles-decision-random-forest
---

# S02: modo de lectura lineal

## Pregunta del lector

¿Cómo se conectan las reglas de los árboles, la variación entre muestras y la evaluación con datos planetarios?

## Objetivo de aprendizaje

Recorrer la sesión como un argumento continuo, ampliar las explicaciones breves de las diapositivas y detenerse en las mismas visualizaciones y controles interactivos de cada parada.

## Estado inicial y fallback

- Presentación sigue siendo el modo inicial y conserva su carril, diapositiva activa y controles de avance.
- `?modo=lectura` abre el artículo completo; quitar `modo` regresa a Presentación.
- La lectura contiene las quince paradas de S02 en su orden actual. El botón de contenidos desplaza al apartado elegido y conserva su identificador como parada activa.
- Cambiar de modo conserva la parada activa. Los widgets interactivos se desmontan al salir de un modo y vuelven a sus valores iniciales cuando se montan en el otro.
- Si React no carga, el documento conserva la vista de presentación existente como contenido de fallback.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Modo de visualización | `displayMode` | presentación, lectura | presentación | — | Botones Presentación y Lectura |
| Parada activa | `activeStopId` | IDs de `s02Stops` | references | — | Carril, anterior/siguiente, índice de lectura |

## Codificación visual

- Los grupos, tonos, títulos y numeración reutilizan los metadatos existentes de `s02Stops`.
- La lectura usa flujo de artículo, ancho de texto limitado y apartados con anclas; las áreas de interacción pueden usar el ancho necesario para sus figuras.
- Se conserva la codificación cromática y textual de cada visualización. El color no será la única señal de estado.

## Comportamiento

- Al cambiar: se actualiza el modo y `?modo=lectura`; la parada activa se conserva. Entrar en lectura lleva esa parada al área visible. Los controles siguen disponibles en ambos modos; el estado local de cada widget se reinicia al cambiar porque su componente se desmonta.
- Al saltar desde el índice: se activa y desplaza el apartado elegido.
- Al volver a Presentación: reaparece la diapositiva activa en el carril y la página vuelve a su encabezado.
- Con teclado: los modos, enlaces de índice y controles existentes son botones/enlaces nativos; conservan foco visible y orden DOM.
- En móvil: el índice fluye y las interacciones apilan sus columnas existentes sin fijar la altura del artículo.
- Con movimiento reducido: la navegación evita desplazamiento animado.
- Ante datos vacíos: la prosa explicativa y el resumen de la parada siguen visibles.

## Texto alrededor de la figura

- Pie: cada sección identifica la pregunta conceptual que ilustra su interacción.
- Qué observar: la prosa de lectura explica variables, mecanismo y relación con la parada siguiente.
- Resumen de estado: cada interacción existente conserva sus etiquetas y salidas actuales.
- Misconcepción prevenida: un resultado descriptivo o una división aleatoria por planeta no prueba causalidad ni desempeño en estrellas no vistas.
- Qué no demuestra: la lectura no convierte una salida guardada en evidencia en vivo ni amplía el alcance de la partición registrada.

## Matriz de pruebas

- [ ] Presentación sigue siendo el modo inicial y mantiene la navegación actual.
- [ ] El botón Lectura muestra los quince apartados; los enlaces del índice actualizan la parada activa y la posición.
- [ ] Cambiar de modo y volver conserva la parada activa; los widgets interactivos funcionan en cada modo y vuelven a sus valores iniciales al remontarse; `?modo=lectura` abre directamente el artículo.
- [ ] Cada actividad interactiva existente permanece disponible en lectura.
- [ ] Navegación con teclado, enfoque visible y movimiento reducido.
- [ ] Pantalla de escritorio y pantalla estrecha: sin recortes, altura fijada ni desplazamiento horizontal general.
