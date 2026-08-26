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
  note: Los retos y la ilustración son una adaptación didáctica interna; requieren revisión antes de cualquier publicación.
---

# S01 · Rama de actividades

## Promesa

En menos de diez minutos, el grupo prueba las decisiones de la sesión y reconoce qué evidencia permite defender una conclusión.

## Relación con el recorrido

La ruta de siete paradas conserva la explicación para presentación o lectura lineal. Esta rama reúne los microproblemas del guion como retos separados. Cada tarjeta indica la parada a la que puede regresar para ampliar el concepto.

## Actividades

| Reto | Parada | Pregunta | Concepto que diagnostica |
| --- | --- | --- | --- |
| 1 · Reglas o aprendizaje | Familia | ¿Qué harías con diez mil curvas etiquetadas y una nueva? | reglas explícitas, experiencia y evaluación |
| 2 · La señal | Señal | ¿Qué información guía el ajuste? | supervisado, no supervisado y refuerzo |
| 3 · El nivel correcto | Tarea | ¿Dónde vive cada término del mapa? | señal, tarea y familia |
| 4 · La afirmación | Evidencia | ¿Qué conclusión permite la comparación? | línea base, datos no vistos y límites |
| 5 · Transferencia | Dominio | ¿Qué revisarías al cambiar de instrumento? | representación, dominio y cambio de distribución |

Los retos dan retroalimentación inmediata, permiten cambiar de respuesta y no convierten una opción correcta en evidencia científica. Son apoyos para la conversación del aula, no una evaluación sumativa.

## Estado y controles

- Estado inicial determinista: ningún reto respondido.
- Cada reto admite una respuesta activa y muestra una explicación breve después de elegir.
- El progreso visible cuenta respuestas elegidas y aciertos por separado.
- El enlace “Volver a la parada” cambia a presentación y conserva el identificador de la parada.
- El teclado usa botones nativos; `Escape` no tiene una función especial en esta rama.
- Bajo `prefers-reduced-motion: reduce` se conserva el estado final sin desplazamiento animado.

## Imagen de apoyo

`public/images/s01/reglas-aprendizaje.png` es una ilustración original generada para esta rama. Muestra una curva de luz que se divide en una ruta de umbrales explícitos y otra de ejemplos que conduce a un modelo ajustado. No incluye texto legible y no representa un pipeline observacional específico. Se usa como apoyo visual, no como evidencia.

## Límites

Los retos no entrenan un modelo, no calculan una métrica y no validan una afirmación astronómica. Las respuestas correctas condensan decisiones del guion y deben abrir una explicación oral o una parada del recorrido.

## Pruebas mínimas

- renderiza la rama y su progreso con JavaScript;
- cada reto actualiza su estado y retroalimentación sin perder los demás;
- el enlace de una tarjeta vuelve a la parada correcta en presentación;
- la imagen tiene texto alternativo y la ilustración no es la única señal del concepto;
- la rama se apila en móvil y mantiene una composición horizontal legible en proyección amplia;
- `prefers-reduced-motion` no oculta contenido ni depende de una transición.
