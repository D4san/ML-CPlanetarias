# Sistema visual — Observatorio editorial v0.1

Esta es la dirección visual inicial del producto. Combina la calma de una publicación científica con instrumentos de observación interactivos. No copia la identidad de Distill ni la de otro sitio.

## Carácter

- fondo de papel cálido para lectura larga;
- tinta azul muy oscura para estructura y contraste;
- retícula, órbitas y marcas de medición sutiles;
- color reservado para relaciones científicas y estado, no para adornar secciones;
- figuras anchas cuando la comparación lo exige y columna de texto de 65–80 caracteres;
- etiquetas compactas de “instrumento” para metadatos, variables y estados.

Los valores ejecutables viven en `src/styles/tokens.css`. Esta guía define su significado:

- `data`: observables, representación y evidencia;
- `model`: paradigma, tarea, familia y mecanismo;
- `decision`: línea base, métrica y decisiones de diseño;
- `limit`: advertencias, fallas y límites interpretativos;
- `transfer`: preguntas para enseñar o reutilizar.

El color nunca es la única señal: se acompaña con texto, forma, posición o patrón.

## Tipografía y composición

Usar una serif editorial de sistema en títulos, una sans legible en texto y una monoespaciada en variables. No depender de una CDN de fuentes. Las páginas son artículos, no tableros de tarjetas: los contenedores agrupan controles o herramientas, no cada sección narrativa.

La escala espacial usa incrementos deliberados y un ancho máximo por función: lectura, figura amplia y pantalla. En móvil, las notas marginales pasan a flujo, los paneles se apilan y ningún significado depende de pasar el puntero.

El modo `Presentación` se calibra para proyección horizontal. En 1920×1080, el texto esencial se
mantiene alrededor de 18 px o más; controles y texto secundario, alrededor de 15–16 px; metadatos
instrumentales compactos, nunca por debajo de 13 px. Desde 1280 px en orientación horizontal, la
figura y el panel de foco permanecen lado a lado y la superficie ocupa al menos el 95% del viewport,
con un borde de seguridad pequeño. Una parada puede requerir desplazamiento vertical cuando su
interacción lo exige, pero su relación principal debe entenderse dentro del primer cuadro 16:9. El
modo `Lectura` conserva su escala editorial y una medida centrada más estrecha.

## Movimiento

Toda transición explica continuidad, cambio de estado o relación espacial. Preferir `transform` y `opacity`; evitar animar layout. Mantener duraciones breves y reversibles. Bajo `prefers-reduced-motion: reduce`, eliminar desplazamientos y conservar de inmediato el estado final y toda la información.

## Revisión visual

Comprobar al menos 1920×1080 para proyección, 1440×900, 390×844 y una anchura intermedia. Revisar
contraste, foco, texto largo en español, ecuaciones, controles, estados vacíos y figuras sin
JavaScript. Un cambio de dirección estética requiere actualizar este documento, los tokens y los
snapshots en la misma revisión.
