# Preparar una sesión reutilizable

El contrato del recorrido es ADR-0003: portada 0 → unidades de contenido → interpretación/cierre → referencias. Mantener IDs de conceptos, fuentes y unidades; una posición de diapositiva no es una identidad.

## Dónde vive cada decisión

- Planeación y guion: fuente del vault, transferida como paquete con procedencia y estado.
- Secuencia y texto de la web: registros de contenido de la sesión; las portadas se declaran en `src/lib/session-openings.ts`.
- Presentación: `SessionOpening`, `SessionNavigationControls`, `SessionPresentationFooter` y `SlideRail`. El adaptador de cada sesión conserva sus enlaces y estado; las escenas conservan la acción de aprendizaje.
- Cálculos: una lógica compartida por la ecuación sustituida, la figura y el resultado. La ficha documenta valores esperados antes de implementar.
- Código del estudiante: protocolo PEDAGOGICAL_CODE. La práctica declara datos, baseline, evaluación, semilla, interpretación y qué volver a ejecutar al modificarla.

## Antes de abrir la exploración

Elegir un objeto concreto. Explicar su representación y las variables antes de usarlas. Cuando hay cálculo, recorrer un ejemplo trabajado con conteos/unidades, valores intermedios e interpretación; después habilitar la manipulación y mostrar el resultado junto al control. Una unidad cualitativa puede usar selección y contraste sin inventar una métrica.

En S02, el corte 3/5 hace visibles los pesos antes del corte perfecto. Es un ejemplo de esta pauta, no una secuencia de cuatro pasos obligatoria para otras sesiones.

## Escribir la lectura autónoma

Aplicar [READING_BOOK](../protocols/READING_BOOK.md): redactar capítulos con argumento propio, desarrollar las explicaciones esenciales del guion, resolver un ejemplo antes de explorar y ofrecer preguntas con respuesta razonada. Conservar la secuencia conceptual y mapear unidades; agrupar diapositivas contiguas cuando desarrollan una misma pregunta. El modo docente añade apoyo de aula y las explicaciones esenciales permanecen visibles. Renderizar la misma prosa sin JavaScript.

## Antes de entregar

Recorrer portada, contenido, cierre, fuentes y reinicio; probar enlaces anteriores, teclado, lector sin JS, móvil y proyección. Comprobar la correspondencia control → salida visible → explicación y verificar las cuentas. Registrar comandos, entorno, fuentes y límites en una matriz de evidencia. Distribuir skills desde su fuente canónica con `npm run sync:skills` y comprobar `npm run validate:skills:strict`.
