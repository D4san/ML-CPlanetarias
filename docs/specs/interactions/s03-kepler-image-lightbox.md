---
id: s03-kepler-image-lightbox
status: implemented
page: /sesiones/s03/
packet_id: S03-DE-UN-TRANSITO-A-LAS-METRICAS
---

# Ampliar la imagen de Kepler durante K2

## Pregunta del lector

¿Qué muestra la imagen y cómo puedo examinarla completa sin perder su procedencia?

## Objetivo de aprendizaje

Reconocer que PIA18904 es un concepto artístico de Kepler operando durante K2 y consultar su fuente sin confundirlo con una fotografía o una observación científica.

## Estado inicial y fallback

La pantalla 2.1 muestra la imagen completa en una tarjeta pequeña con su pie. El vínculo «Ampliar imagen» apunta al JPEG original; JavaScript mejora el vínculo y abre el diálogo. Si JavaScript no está activo, el navegador abre el JPEG completo directamente.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Diálogo de ampliación | abierto | cerrado/abierto | cerrado | — | vínculo de la imagen, botón Cerrar, Escape o clic en el fondo |

## Codificación visual

- La tarjeta y el diálogo usan la misma imagen local de 1920×1536 px; su proporción 5:4 se conserva con `object-fit: contain`.
- En escritorio, el diálogo presenta imagen y fuente en columnas; en ventanas estrechas, apila la fuente debajo de la imagen.
- El pie identifica «concepto artístico», crédito NASA/JPL, PIA18904 y enlace a la ficha NASA.

## Comportamiento

- Al activar la imagen, se abre un diálogo modal nativo con la imagen completa y el crédito junto a ella.
- El botón Cerrar, Escape y el clic en el fondo cierran el diálogo; el foco vuelve al vínculo que lo abrió.
- El enlace al archivo original sigue funcionando si JavaScript no está disponible.
- En móvil, la imagen limita su altura al viewport y permanece completa; la ficha puede leerse debajo.
- La interacción no añade movimiento decorativo y respeta el estado de movimiento reducido.

## Texto alrededor de la figura

- Pie: «Concepto artístico de Kepler durante K2. NASA/JPL · PIA18904».
- Qué observar: la nave aparece en un campo estelar con una trayectoria que representa la misión K2.
- Misconcepción prevenida: la escena es una representación artística; no es una fotografía de la nave durante la operación ni una curva de luz observada.
- Qué no demuestra: no documenta por sí misma un descubrimiento, un tránsito ni el desempeño fotométrico de Kepler.

## Matriz de pruebas

- [x] la tarjeta conserva la proporción completa y ofrece un nombre accesible para ampliar;
- [x] abrir el diálogo muestra la imagen íntegra, el crédito y la ficha PIA18904;
- [x] Cerrar y Escape cierran el diálogo y devuelven el foco;
- [x] escritorio y móvil conservan la imagen completa y apilan la fuente en ventanas estrechas; el zoom queda pendiente de revisión manual;
- [x] el enlace directo al JPEG permanece disponible como fallback sin JavaScript.
