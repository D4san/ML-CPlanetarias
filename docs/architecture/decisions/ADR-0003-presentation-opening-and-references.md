# ADR-0003 — Portada inicial y referencias finales

- Estado: aceptada para implementación por solicitud explícita del usuario.
- Fecha: 2026-10-18.
- Sustituye: la posición de bibliografía y el destino de reinicio de ADR-0002; conserva sus identidades y contratos editoriales.

## Decisión

Toda presentación comienza con una **portada 0**: título, pregunta de aprendizaje, promesa breve y objeto visual orientador. Continúa con sus estaciones, interpretación/cierre y **referencias al final**. “−1” significa última posición de la secuencia, no un número visible negativo.

Las diapositivas declaran el rol `opening`, `content` o `references`. Bibliografía y portada conservan identidad propia; un índice de array no define una identidad ni una URL. Las estaciones conservan su numeración y enlaces. Los enlaces anteriores a bibliografía se resuelven en la nueva posición final.

La carga sin enlace y el reinicio abren la portada. Anterior/Siguiente recorren la secuencia completa, incluida la transición cierre → referencias. Los controles globales permanecen fuera del contenido desplazable; los de explicaciones internas se nombran Paso anterior/Paso siguiente. Lectura desarrolla los mismos conceptos, fuentes y unidades en capítulos de exposición propia, con referencias finales, según [READING_BOOK](../../protocols/READING_BOOK.md). Puede agrupar unidades contiguas y ampliar el razonamiento del guion; conserva IDs y correspondencias. El mapa permite volver a avanzar por el recorrido.

## Autoría y revisión

Se reutilizan la portada y los controles comunes. Antes de implementar, una ficha de interacción identifica la selección/valor del control, el cambio observable y su interpretación. Cuando hay cálculo, incluye un ejemplo trabajado con entrada, conteos/unidades, valores intermedios y resultado esperado. La revisión comprueba estas relaciones y la legibilidad real en proyección y móvil.

Las fuentes siguen asociadas a afirmaciones y figuras, aunque su listado completo cierre la sesión. Esta decisión organiza la lectura; no autoriza publicación ni modifica derechos.

El registro de fuentes tiene un título que lo identifica como referencias, distinto del título de la portada. No confundir identidad bibliográfica, rol y posición.
