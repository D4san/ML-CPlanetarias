# S03 — Ilustraciones para las clases de Kepler

Actualizada: 2026-10-26. Uso: las cinco escenas TCE, PC, AFP, NTP y FP se exploran en `s03-classification-3` (4.3), «Instancia, etiqueta, modelo y predicción». La pantalla 4.2 se centra en el problema, el conjunto etiquetado, el entrenamiento y la evaluación; ya no despliega ilustraciones de las clases.

## Brief común de la familia

- **Propósito:** situar visualmente la señal detectada, explicar las clases de referencia del catálogo y mostrar un desacuerdo entre referencia y predicción dentro de la unidad que distingue instancia, etiqueta, modelo y error.
- **Audiencia y acción:** el estudiante recorre TCE, PC, AFP, NTP y FP en 4.3, y puede explicar qué nombra cada término y qué relación muestra la ilustración.
- **Medio y tipo:** cinco ilustraciones raster cualitativas, generadas con ImageGen; tipo `conceptual`. Las etiquetas, descripciones y relaciones exactas permanecen en HTML accesible.
- **Estilo:** familia astronómica realista de S03: composición horizontal 16:9, iluminación sobria, espacio profundo azul oscuro, luz estelar cálida, pocos objetos y márgenes para el texto externo. Usa la paleta semántica del curso en la interfaz; el color de una estrella no codifica una clase.
- **Exclusiones:** no incluir texto, siglas, números, ejes, gráficas, retículas, flechas, marcos, marcas de agua, logotipos ni escalas. Ninguna imagen afirma representar un objeto o dato observado por Kepler.
- **Fondo y recorte:** fondo opaco, PNG horizontal. `object-fit: cover` mantiene el foco en la zona central en escritorio y móvil; el pie queda fuera de la imagen.
- **Contextos de revisión:** tamaño intrínseco, 1920×1080, 1440×900, 1024×768, 1299×884 y 390×844.
- **Fuente y derechos:** paráfrasis didáctica de `src/lib/s03-content.ts#s03-classification-3` y del artículo de Shallue y Vanderburg (2017), §3.1. Ilustraciones originales generadas para el curso; no son datos, simulaciones calibradas ni figuras copiadas del artículo.
- **Procedencia:** `origin: repo`; `source_path: docs/guides/s03-classification-illustrations.md`; `source_heading` identifica cada ficha.

## Fichas por caso

### TCE — señal detectada

- **ID y archivo:** `s03-classification-tce-conceptual` · `public/images/s03/s03-classification-tce-conceptual.png`.
- **Función y acción:** presentar un evento con forma de tránsito que el sistema de búsqueda detecta; señalar que todavía debe clasificarse su causa.
- **Objeto y relación:** estrella observada mediante un telescopio y una pequeña silueta oscura en el borde del disco; el rasgo parece un tránsito, sin afirmar que la causa sea un planeta.
- **Omisiones deliberadas:** planeta confirmado, órbita marcada, curva, etiquetas, valores, escalas y marca de la misión.
- **Alt:** «Una estrella brillante vista a través de un telescopio; una pequeña silueta oscura aparece sobre el borde del disco estelar».
- **Pie:** «Señal con forma de tránsito detectada; su causa se clasifica después».
- **Límite:** la figura representa una apariencia posible de TCE, no una detección identificada.

### PC — clase planetaria

- **ID y archivo:** `s03-classification-pc-conceptual` · `public/images/s03/s03-classification-pc-conceptual.png`.
- **Uso:** exploración de PC en 4.3.
- **Función y acción:** ilustrar la interpretación planetaria que el catálogo asigna a PC y recordar que la clase conserva el estatus de candidata.
- **Objeto y relación:** un solo cuerpo oscuro cruza el disco de una estrella.
- **Omisiones deliberadas:** confirmación física, órbita con escala, datos de Kepler, etiquetas y texto.
- **Alt:** «Un solo cuerpo oscuro cruza el disco de una estrella brillante».
- **Pie:** «Escena conceptual de una señal compatible con un candidato planetario».
- **Límite:** una imagen conceptual no determina el estado de confirmación de una señal del catálogo.

### AFP — falso positivo astrofísico

- **ID y archivo:** `s03-classification-afp-conceptual` · `public/images/s03/s03-classification-afp-conceptual.png`.
- **Uso:** exploración de AFP en 4.3.
- **Función y acción:** distinguir una explicación astrofísica alternativa de un tránsito planetario.
- **Objeto y relación:** dos estrellas de distinto brillo se superponen en la línea de visión; una eclipsa parcialmente a la otra.
- **Omisiones deliberadas:** planeta, tamaños a escala, parámetros orbitales, curva, etiquetas y texto.
- **Alt:** «Dos estrellas de distinto brillo se superponen en la línea de visión; la estrella menor eclipsa parcialmente a la mayor».
- **Pie:** «Una binaria eclipsante puede producir una caída parecida a un tránsito».
- **Límite:** la escena no representa un sistema concreto ni cuantifica la profundidad del eclipse.

### NTP — fenómeno no transitorio

- **ID y archivo:** `s03-classification-ntp-conceptual` · `public/images/s03/s03-classification-ntp-conceptual.png`.
- **Uso:** exploración de NTP en 4.3.
- **Función y acción:** mostrar una causa de variación que no necesita un planeta en tránsito.
- **Objeto y relación:** estrella con manchas oscuras y brillo superficial desigual; no hay un cuerpo cruzando por delante.
- **Omisiones deliberadas:** planeta, explosión, curva, magnitudes medidas, etiquetas y texto.
- **Alt:** «Una estrella con varias manchas oscuras sobre su superficie y sin un cuerpo que cruce delante de ella».
- **Pie:** «La actividad estelar puede variar el brillo sin un tránsito planetario».
- **Límite:** la variabilidad estelar es un ejemplo del grupo, no la única causa posible de un NTP.

### FP — error del clasificador

- **ID y archivo:** `s03-classification-fp-conceptual` · `public/images/s03/s03-classification-fp-conceptual.png`.
- **Función y acción:** acompañar el ejemplo exacto donde una referencia «no planeta» recibe una predicción «planeta».
- **Objeto y relación:** estrella con manchas observada a través de una lente; una sombra aparente parece cruzar la luz sin mostrar un planeta.
- **Omisiones deliberadas:** caja de modelo, etiquetas, puntajes, umbral, flechas, gráficas y texto; la discordancia se explica en HTML.
- **Alt:** «Una estrella con manchas se observa a través de una lente; una sombra aparente cruza la luz, aunque no se ve un planeta».
- **Pie:** «Una señal no planetaria puede recibir una predicción de planeta».
- **Límite:** el caso es un ejemplo pedagógico de FP, no un error reportado por el artículo.

## Revisión

Las cinco salidas se inspeccionaron a tamaño intrínseco: mantienen el estilo horizontal, no contienen texto ni marcas, y cada una conserva el objeto y la relación declarados en su ficha. La revisión de integración en los contextos objetivo se registra en `docs/planning/agent-execution/evidence/I05-VISUAL-REVIEW.md` y en el manifiesto `public/images/s03/s03-illustrations.manifest.json`.

### Exploración de las clases en 4.3

Las imágenes de PC, AFP y NTP aparecen únicamente en el selector de vocabulario de 4.3, junto con TCE y FP. La pantalla 4.2 presenta la procedencia de las etiquetas y la cautela del conjunto en texto, y reserva el desarrollo conceptual de cada categoría para esta secuencia. La revisión de integración pendiente o completada para cada recurso se registra en `docs/planning/agent-execution/evidence/I05-VISUAL-REVIEW.md` y en el manifiesto.
