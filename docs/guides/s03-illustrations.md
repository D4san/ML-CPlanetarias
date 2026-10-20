# Ilustraciones de S03 — encargo y revisión

Fecha: 2026-10-19. Origen: propuesta del repositorio para pantallas 3.1–3.3. El usuario pidió imágenes reales o generadas de apariencia muy realista; esa instrucción define esta familia en lugar del line-art habitual. El marco conserva los tokens del curso.

## Brief común

- Medio: raster cualitativo generado con ImageGen integrado, fondo opaco y proporción horizontal próxima a 16:9. Sin API ni clave del usuario.
- Familia: ilustración astronómica realista, iluminación sobria, pocos objetos y márgenes para rótulos HTML externos.
- Exclusiones: texto, gráficos, escalas, números, logotipos y marcas de agua añadidas. Las relaciones y cifras exactas viven en SVG/HTML.
- Límite: ilustraciones, nunca observaciones de Kepler ni simulaciones calibradas.
- Destinos: 1920×1080, 1440×900, 390×844 e intermedio. Inspección intrínseca completada; composición final en evidencia S03.

## Ilustración focal de la pantalla 1.1

- ID: `s03-transit-star-conceptual`; propósito: dar textura y resplandor al disco estelar de la escena orbital sin reemplazar su geometría verificable.
- Medio: raster cuadrado RGBA generado con ImageGen; se conserva el canal alfa para integrarlo sobre la superficie oscura del diagrama.
- Composición: una sola estrella semejante al Sol, granulación superficial contenida y borde con resplandor suave. Sin planeta, órbita, texto, cifras, ejes, etiquetas ni fondo sólido.
- Integración: el SVG coloca la estrella en el centro calculado y conserva su radio; la posición del planeta, la fase, la línea de visión y la curva de flujo siguen en código.
- Límite y pie: «La estrella es una ilustración generada con IA; la órbita y la curva muestran un modelo ideal».
- Verificación inicial: PNG RGBA de 1254×1254 px, alfa cero en las cuatro esquinas; render integrado revisado en fondo oscuro a 1280×720. La revisión en fondo claro y otros tamaños queda pendiente.

| ID | Pantalla y propósito | Encargo | Alt y pie |
| --- | --- | --- | --- |
| s03-variabilidad | 3.1: actividad estelar | Estrella similar al Sol con granulación y manchas; sin planeta, eclipse o explosión exagerada. | «Ilustración realista de una estrella con grupos de manchas». Pie: «Ilustración generada de actividad estelar; no es una observación de Kepler». |
| s03-eclipsante | 3.2: otra causa de caída | Binaria separada con estrellas de tamaño/color distintos superpuestas en proyección; sin puentes de plasma ni planeta. | «Ilustración de una estrella más pequeña delante de otra». Pie: «Binaria eclipsante conceptual; ilustración generada, sin escala de un sistema observado». |
| s03-transit-star | 1.1: disco estelar del esquema orbital | Estrella solar con granulación, borde difuso y resplandor suave; fondo transparente y sin geometría ni etiquetas. | «Disco estelar con granulación en el centro de una órbita proyectada». Pie: «La estrella es una ilustración generada con IA». |

### Esquema exacto de la pantalla 3.3

La diapositiva usa un diagrama HTML/CSS junto a una gráfica SVG. Compara dos instantes de la misma fuente sobre retículas iguales de 5 × 5; el borde de la apertura `A` mantiene su posición mientras el halo se desplaza hacia fuera. El gráfico sitúa la caída del flujo sumado y el movimiento del centroide en el mismo intervalo. El halo reutiliza `s03-kepler-pixel-source.png`, generado para 2.2; retículas, apertura, etiquetas, desplazamiento y trazos se dibujan en código.

La imagen raster anterior de 3.3 se retiró del manifiesto público al rehacer la diapositiva; el diagrama actual explica directamente la relación entre posición, apertura y flujo.

## Inspección

Las ilustraciones raster previas de las pantallas 3.1–3.3 se revisaron completas: sin texto inventado, con manchas reconocibles, siluetas eclipsantes separables y una fuente distribuida sobre varios píxeles. Tras la revisión editorial, el raster de 3.3 dejó de formar parte del sitio y fue sustituido por el esquema exacto descrito arriba. Granulación, colores y luminosidad de las ilustraciones raster son cualitativos, sin temperaturas ni distancias inferidas. La estrella de 1.1 se verifica por separado con alfa real y textura solo en el disco.

Los PNG se copiaron al proyecto conservando originales. Dimensiones, pesos y hashes: `public/images/s03/s03-illustrations.manifest.json`. Derechos: material generado propio `original`; revisión editorial pendiente. Las figuras del paper y su procedencia se documentan en [`s03-paper-figures.md`](s03-paper-figures.md).

Inspección integrada completada: las tres ilustraciones se revisaron en 1920×1080, 1440×900, 1024×768 y 390×844. Se conservan proporciones, ausencia de desbordamiento horizontal y leyendas externas. Las ventanas bajas requieren desplazamiento vertical para recuperar pies y fuentes bajo el control fijo. Capturas: `output/playwright/s03/{ancho}-s03-lookalikes-{1,2,3}.png`. La aceptación editorial y la comparación con goldens Linux siguen pendientes; véase la evidencia I05.

Actualización de 3.3 (2026-10-20): la vista de 1299 × 884 confirma dos instantes con la misma fuente, la apertura fija en la retícula y el flujo/centroide sincronizados. A 390 × 844 no hay desbordamiento horizontal; los paneles se apilan para conservar los rótulos legibles. La evidencia integrada más reciente queda en [`I05-VISUAL-REVIEW.md`](../planning/agent-execution/evidence/I05-VISUAL-REVIEW.md).
