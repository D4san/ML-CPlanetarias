---
id: s03-paper-figures-and-help
status: draft
page: /sesiones/s03/
packet_id: S03-DE-UN-TRANSITO-A-LAS-METRICAS
---

# Figuras del artículo y ayudas contextuales

## Pregunta y objetivo

¿Qué evidencia publicaron los autores y cómo se interpreta sin confundir puntaje, selección y confirmación? El lector podrá leer una figura del artículo en su escala completa, relacionarla con la explicación de la pantalla y abrir definiciones breves en el lugar donde aparece cada concepto.

## Figuras

- Se muestran las Figuras 3, 6, 8, 10 y 11 de Shallue y Vanderburg (2017), completas y dentro de su proporción nativa.
- Cada figura tiene texto alternativo específico, una lectura de una o dos frases y una cita visible junto a la imagen. La cita abre la versión HTML del artículo en la figura correspondiente.
- Una miniatura `contain` muestra la figura entera. Un botón explícito abre un diálogo con la imagen a mayor escala, la misma cita y un control de cierre.
- Cerrar, Escape y pulsar fuera del panel cierran el diálogo; el foco vuelve al control que lo abrió. La figura y su explicación no dependen del diálogo.
- La pantalla 5.2 desarrolla en el texto las dos vistas de la Figura 3: su objetivo, construcción, resolución, parámetros y límite; también define el plegado por fase. La reflexión horizontal aleatoria se explica en 5.3, dentro del procedimiento de entrenamiento de la CNN, con un diagrama que muestra la inversión de bins y la conservación de la clase.
- La pantalla final tiene un selector accesible para leer las Figuras 8, 10 y 11. Cambiar de figura actualiza su explicación y la imagen ampliable.

## Ayudas de concepto

- En las pantallas pertinentes aparecen controles compactos `?` con el nombre del término al lado.
- En 2.1, la definición de los datos de Kepler queda integrada en el texto de apertura; la ayuda contextual conserva solo «Cadencia y flujo».
- Activarlos abre un diálogo con definición en el contexto de esta sesión, símbolo o ejemplo numérico si aplica, y la consecuencia para la interpretación.
- Las definiciones se asignan a las pantallas que introducen el término; las ayudas repetidas conservan el mismo contenido.
- Botón de cierre, Escape, clic exterior, foco visible, retorno de foco y diálogo con nombre accesible.

## Estado inicial y fallback

La pantalla comienza con su figura o concepto previsto, sin modal abierto. Sin JavaScript, la figura se conserva en el flujo, la cita sigue activa y los textos introductorios explican el concepto; la interacción añadida es de ampliación y consulta.

## Comprobación mínima

- Una instancia de cada figura valida ruta local, texto alternativo, cita, proporción íntegra y diálogo.
- Las figuras 3/6/8/10/11 muestran la fuente exacta y se pueden ampliar con teclado.
- Escape, botón de cierre, fondo y retorno de foco funcionan; no aparecen IDs duplicados en montaje conjunto.
- Cada pantalla con `?` abre la definición contextual correcta y conserva el contenido esencial visible.
- Probar ancho de proyección, móvil, contraste, foco visible y ruta `/preview`.
