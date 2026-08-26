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
  - Géron, cap. 2
  - Kelleher, caps. 1–2
rights:
  status: original
  note: Las definiciones son una síntesis didáctica interna; requieren revisión antes de cualquier publicación.
---

# S01 · Tarjetas de tarea y salida

## Promesa

Al abrir cada salida, el lector puede explicar qué pregunta responde, qué datos requiere y qué afirmación no permite sostener por sí sola.

## Relación con el recorrido

La parada **Tarea y salida** conserva el mapa de seis posibilidades para una misma observación. Cada caja del SVG funciona como un control accesible y abre una tarjeta con pregunta, definición, ejemplo astronómico y límite interpretativo.

## Tarjetas

| Salida | Tarea | Pregunta | Ejemplo astronómico |
| --- | --- | --- | --- |
| valor continuo | Regresión | ¿Qué valor continuo corresponde a esta instancia? | Radio, temperatura o abundancia desde un espectro |
| clase / prob. | Clasificación | ¿A qué clase pertenece la instancia? | Tránsito, binaria eclipsante o artefacto |
| grupos | Clustering | ¿Qué estructura de similitud aparece? | Familias de espectros en un catálogo |
| rareza | Anomalía | ¿Qué se aparta de la referencia? | Espectro atípico o artefacto de detector |
| acción | Decisión | ¿Qué conviene hacer con la información disponible? | Elegir la siguiente observación |
| muestra | Generación | ¿Qué distribución y qué instancia nueva son útiles? | Espectro sintético condicionado |

Las definiciones separan tarea, señal y familia de modelo. Una salida no selecciona automáticamente un algoritmo ni demuestra una interpretación física.

## Estado y controles

- Estado inicial determinista: ninguna tarjeta abierta.
- Cada salida es un control con foco, etiqueta y estado `aria-pressed`.
- La tarjeta muestra primero la pregunta; `Voltear: ver definición` revela la definición, el ejemplo y el límite.
- `Cerrar` y `Escape` cierran la tarjeta y restauran el foco a la salida de origen.
- La ruta activa se conserva con borde y relleno; el color no es la única señal.
- En móvil, el SVG mantiene sus controles y la tarjeta admite desplazamiento vertical.
- Con movimiento reducido, la tarjeta conserva el contenido sin transición espacial.

## Texto alrededor de la figura

- pie: el mismo dato puede responder preguntas distintas y producir salidas de formas diferentes;
- qué observar: la salida define la tarea antes de escoger una familia de modelo;
- resumen de estado: `Tarea {nombre}. Tarjeta {abierta o cerrada}. Ruta {escenario}`;
- misconcepciones prevenidas: regresión como paradigma, clustering como clase física, anomalía como descubrimiento y generación como evidencia;
- qué no demuestra: ninguna tarjeta valida datos, métricas, causalidad ni resultados científicos.

## Matriz de pruebas

- [ ] las seis salidas son visibles y tienen nombre accesible;
- [ ] cada salida abre su tarjeta y conserva la pregunta en el frente;
- [ ] la definición permanece oculta hasta voltear;
- [ ] `Cerrar`, `Escape` y restauración de foco funcionan;
- [ ] la tarjeta es legible en 1920×1080, 1440×900 y móvil;
- [ ] axe, movimiento reducido y build en subruta pasan;
- [ ] snapshot del mapa y de una tarjeta volteada.
