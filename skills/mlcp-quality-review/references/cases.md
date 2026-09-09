# Ensayos de la revisión

Estos casos prueban decisiones observables de la skill. No sustituyen los gates de una entrega
real.

## Caso 1 · tests verdes, fuente ausente

Entrada: un componente pasa unitarias y build, pero la ficha de ejemplo afirma un método, cifra o
resultado sin fuente/ubicación, y `publish_ready` está en `true`.

Decisión esperada: `devuelta` o `bloqueada` según si la reparación es de contenido o de autoridad.
Conservar el resultado técnico, cambiar la afirmación a `pendiente`, separar el asset y registrar
la fuente que falta. El build verde no aprueba la promoción.

## Caso 2 · buen contenido, fallo móvil reproducible

Entrada: la procedencia y las afirmaciones son correctas, pero en 390×844 el control principal se
sale del viewport, pierde foco o deja una unidad inaccesible.

Decisión esperada: `devuelta`. Registrar la URL, viewport, paso de reproducción y captura/render;
mantener la evidencia editorial como válida y repetir la prueba después del ajuste.

## Caso 3 · entrega completa

Entrada: criterios y dependencias aceptados, código y contenido trazables, pruebas pertinentes
verdes, revisión móvil/accesible comprobada y `publish_ready` coherente con una autorización
explícita.

Decisión esperada: `aceptada`. Registrar comandos, alcance, advertencias no bloqueantes y la
superficie exacta que queda disponible. Una publicación posterior sigue requiriendo su instrucción
propia cuando la ficha la separa.
