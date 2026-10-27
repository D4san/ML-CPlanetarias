# S03 — Miniaturas para clasificar ocho señales

## Encargo

- **Unidad:** S03 / 6.2, «La matriz se construye señal por señal».
- **Propósito:** representar tres causas posibles detrás de señales que se comparan como tránsito planetario o no planetario.
- **Acción del estudiante:** arrastrar una de ocho señales a la columna de predicción del clasificador y observar la referencia y celda que le corresponden.
- **Objeto focal:** una familia de tres miniaturas: un planeta cruzando una estrella, dos estrellas en una binaria eclipsante y una estrella variable sin cuerpo en tránsito.
- **Relación visible:** las tres escenas pueden cambiar el brillo de formas distintas; la ilustración no sustituye la referencia del catálogo ni determina el resultado del modelo.
- **Límite:** son ilustraciones conceptuales, no observaciones de Kepler ni datos de los ocho ejemplos didácticos.

## Medio, exactitud y composición

- **Medio/tipo:** ilustración generada con ImageGen; `conceptual`.
- **Familia:** miniaturas astronómicas editoriales de S03, discos estelares cálidos y siluetas limpias; detalle bajo y lectura clara a tamaño pequeño.
- **Composición:** tres iconos independientes en una tira horizontal de tres espacios iguales; cada escena centrada, con aire transparente alrededor y separadores solo de espacio vacío.
- **Fondo:** transparencia RGBA real. No incluir tablero cuadriculado, marco, halo, sombra ni rectángulo de fondo.
- **Paleta:** luz estelar cálida y contorno oscuro con acentos discretos del rol `data`; forma y silueta distinguen las escenas sin depender del color.
- **Omisiones:** texto, siglas, números, curvas, ejes, órbitas dibujadas, etiquetas, flechas, escalas, logotipos y detalles que parezcan datos medidos.
- **Uso previsto:** recorte por tercios en la interfaz y reutilización de cada miniatura en las ocho tarjetas.
- **Alt equivalente:** «Tres escenas conceptuales: un planeta cruza una estrella; dos estrellas se eclipsan; una estrella con manchas varía sin un cuerpo en tránsito».
- **Pie:** «Ilustraciones conceptuales de tres causas posibles; la clasificación se evalúa frente a etiquetas de referencia del catálogo».

## Fuente y derechos

- **Síntesis didáctica:** `src/lib/s03-content.ts#s03-errors-2` y `src/lib/s03-content.ts#s03-classification-3`.
- **Referencia científica:** Shallue y Vanderburg (2018), §§3.1 y 4.2; las clases de referencia PC, AFP y NTP proceden del catálogo y pueden contener errores.
- **Procedencia:** `origin: repo`; `source_path: docs/guides/s03-confusion-signal-icons.md`; `source_heading: Encargo`.
- **Derechos candidatos:** `original`; recurso conceptual generado para el curso. No reproduce figuras ni datos del artículo.
- **Archivo:** `public/images/s03/s03-confusion-signal-icons.png` (2172 × 724 px; PNG RGBA, 870 980 bytes).
- **Revisión intrínseca:** las tres siluetas se distinguen a tamaño completo; la cuarta parte de las esquinas tiene alfa 0, sin panel de fondo. La estrella variable queda sin cuerpo en tránsito.
- **Recorte previsto:** sprites CSS de tres tercios iguales, uno por tarjeta; cada tarjeta repite una de las tres escenas.
- **Pendiente:** inspección de la integración real en fondos claro/oscuro, pantalla ancha y móvil; la revisión editorial del recurso y de la página sigue pendiente.
