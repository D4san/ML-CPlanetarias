---
id: s00-pilot
status: drafting
page: /sesiones/s00/
packet_id: S00-MLCP-de-los-mundos-a-los-datos
---

# Piloto S00: De los mundos a los datos

## Promesa, audiencia y pregunta

**Promesa de aprendizaje.** Al recorrer una pregunta sobre un exoplaneta, el estudiante podrá
explicar cómo una medición se convierte en dato y representación, qué tarea y modelo de ML podrían
usarse, qué evaluación hace falta y cuál es el límite de la interpretación.

**Audiencia primaria.** Estudiantes que llegan con curiosidad por los planetas y experiencia
diversa en estadística, programación o ML. La experiencia también debe servir a tutores que quieran
reutilizar una actividad y a colaboradores que necesiten rastrear fuentes y estados editoriales.

**Prerrequisitos.** Poder describir una observación o una gráfica en lenguaje común y distinguir
una medición de una hipótesis. No se exige conocer algoritmos ni instalar herramientas.

**Pregunta del lector.** ¿Qué queremos conocer de otros mundos, qué dato puede aportar evidencia y
en qué punto puede ayudar el aprendizaje automático?

**Producto diagnóstico.** Una cadena breve con `pregunta → unidad de análisis → dato →
representación → tarea → evaluación → límite`, más la rama principal del curso.

## Objeto mínimo y presentación

El objeto mínimo es una cadena de medición y decisión con un ejemplo de exoplanetas. La página debe
ofrecer tres modos equivalentes: Presentación, Lectura y Actividades. Presentación guía una idea por
vez; Lectura conserva todo el argumento, referencias y límites en HTML; Actividades separa las
producciones del estudiante.

La vista inicial de Presentación abre en la primera estación, **Mundo**, con la pregunta guía, el
subtítulo «Una señal débil, una pregunta científica, una cadena de decisiones» y una instrucción
de orientación. El contenido estático de las nueve estaciones aparece también en Lectura y en el
resumen lineal.

### Primer cuadro horizontal

En orientación horizontal, la Presentación usa una superficie oscura inspirada en el piloto S01:
fondo azul casi negro, texto claro, retícula y marcas orbitales muy sutiles. Para evitar la saturación
y asegurar una lectura descansada, la primera subpantalla de cada estación (`x.1`) presenta un
único panel centrado con el foco conceptual, la afirmación principal y la pregunta de partida.
El desarrollo visual interactivo se despliega en las subpantallas siguientes (`x.2` en adelante),
donde la escena visual integra la ilustración y los controles a pantalla completa. La superficie
ocupa al menos el 95 % del viewport desde 1280 px; a 1920×1080, el título y la afirmación central
rondan 18 px o más, el texto auxiliar 15–16 px y los metadatos 13 px como mínimo.

En la estación inicial, la subpantalla `01.1` sitúa el marco conceptual de partida y la subpantalla
`01.2` unifica la ilustración del sistema planetario con la curva de luz en tránsito. El panel
declara: «La salida del modelo es evidencia condicionada». En móvil y en Lectura la superficie se
reorganiza a flujo vertical sin perder la cadena.

## Secuencia de estaciones

El carril reutiliza la composición de `SlideRail`: cinco tarjetas desarrolladas alrededor de la
activa y las restantes apiladas en los bordes. S00 conserva nueve estaciones conceptuales como
spine, pero la Presentación se recorre mediante subpantallas jerárquicas (`01.1`, `01.2`, …) para
dar protagonismo a cada objeto, señal, dato o decisión. La cantidad de subpantallas es irregular y
depende de la información que necesita cada estación.

| Orden | Estación | Pregunta de control | Ejemplo mínimo | Salida visible |
| ---: | --- | --- | --- | --- |
| 1 | Mundo | ¿Qué objeto o sistema queremos comprender? | Un exoplaneta y su estrella | Unidad de análisis propuesta |
| 2 | Pregunta | ¿Qué propiedad o evento queremos conocer? | ¿Hay un tránsito compatible con un planeta? | Pregunta acotada |
| 3 | Medición | ¿Qué magnitud llega del instrumento? | Flujo que cambia con el tiempo | Magnitud y unidad declaradas |
| 4 | Dato | ¿Cómo se conserva y de dónde proviene? | Curva observacional, catálogo o inyección | Origen y estructura |
| 5 | Representación | ¿Qué forma permite trabajar con la señal? | Serie temporal, espectro o imagen | Forma elegida y pérdida posible |
| 6 | Tarea | ¿Qué verbo describe la salida? | Detectar, clasificar, estimar, describir o priorizar | Verbo y salida |
| 7 | Modelo | ¿Qué familia aproxima la tarea? | Clasificador, regresor, agrupamiento o surrogate | Modelo como hipótesis de trabajo |
| 8 | Evaluación | ¿Frente a qué comparación y con qué métrica? | Línea base, recuperación, error o calibración | Evidencia de desempeño |
| 9 | Interpretación | ¿Qué afirmación permite y qué límite conserva? | Candidato, estimación o ranking con validación pendiente | Conclusión acotada |

La Presentación distribuye las partes así:

| Estación | Subpantallas visibles | Cantidad |
| --- | --- | ---: |
| 01 · Mundo | Mundo, Señal, Pregunta guía | 3 |
| 02 · Campo | Origen, Estructura, Evolución, Habitabilidad | 4 |
| 03 · Acotar | Curiosidad, Unidad, Salida, Uso | 4 |
| 04 · Medición | Tránsito, Velocidad radial, Espectro, Imagen | 4 |
| 05 · Datos | Observación, Catálogo, Simulación, Entrenamiento, Salida | 5 |
| 06 · ML | Detectar, Clasificar, Estimar, Describir, Priorizar | 5 |
| 07 · Impacto | Curvas de luz, Estabilidad orbital, Atmósfera, Alto contraste, Validación, Candidatos | 6 |
| 08 · Ramas | Problema astronómico, Teoría formal ML, Aplicación reproducible | 3 |
| 09 · Cierre | Pregunta, Medición, Dato, Representación, Tarea, Evaluación, Límite | 7 |

La primera subpantalla de cada estación (`x.1`) presenta exclusivamente el foco conceptual en un
único panel centrado a pantalla completa. La subpantalla siguiente (`x.2`) unifica el desarrollo
visual inicial con los controles de esa parte, dedicando todo el espacio a la escena interactiva.
Cada subpantalla posterior conserva su elemento protagonista a pantalla completa con su visual,
pregunta, límite y actividad. Anterior/Siguiente, las tarjetas del rail, los botones de partes y la
URL recorren el mismo orden plano subyacente de 42 subpantallas. La URL jerárquica conserva el nombre
de estación para la primera parte (`#pregunta`) y añade el identificador de parte para las siguientes
(`#pregunta/senal`). Un estado inválido conserva una salida útil y anuncia la estación activa.

## Interacciones necesarias

### 1. Carril de cadena mundo → interpretación

**Pregunta.** ¿Qué cambia cuando avanzo desde el fenómeno hasta una afirmación científica?

**Estado inicial determinista.** Estación 1, `Mundo`; ninguna respuesta de actividad seleccionada.

**Control y variables.** Selección de subpantalla `01.1–09.7`; botones Anterior/Siguiente; botones
de partes; reinicio a Mundo. El índice muestra el número jerárquico y el nombre, y la tarjeta activa
muestra el resumen textual de su estado.

**Comportamiento.** Seleccionar una subpantalla actualiza figura, panel de foco o escena completa,
resumen accesible y explicación «qué observar». Reiniciar devuelve `01.1 Mundo` y desplaza el foco
a su encabezado. Las tarjetas apiladas y los botones de partes siguen siendo controles nativos. No
se oculta información esencial en hover.

**Qué observar.** Una salida de ML aparece después de definir pregunta, dato, representación y
tarea; interpretación y evaluación califican la afirmación posterior.

**Fallback estático.** Lista lineal de las nueve estaciones con sus partes, el mismo texto,
ejemplos, límites y enlaces. La lectura sigue siendo completa con JavaScript desactivado.

### 2. Lente de representación

**Pregunta.** ¿Qué conserva y qué puede perder una representación de la medición?

**Estado inicial determinista.** Modalidad `curva de luz`; vista de descripción seleccionada.

| Variable | Rango/valores | Unidad | Control |
| --- | --- | --- | --- |
| Modalidad | curva de luz, espectro, imagen de alto contraste, catálogo, simulación, inyección | — | botones o `select` etiquetado |
| Vista | completa, ventana/resumen | — | pestañas o botones |

La curva de luz se expresa como flujo frente a tiempo; el espectro como flujo frente a longitud de
onda; la imagen como intensidad espacial. La selección actualiza origen, estructura, pregunta
posible y pérdida de información. El resumen textual debe decir, por ejemplo, «Curva de luz:
serie temporal; puede ocultar contexto si se reduce a características».

**Visual.** Un plot reproducible con ejes, unidades, semilla y transformación documentadas cuando
se muestran señales analíticas. Una miniatura o ilustración raster puede acompañar el objeto físico
o el observatorio, con alt text y crédito; no reemplaza al plot ni al texto.

**Fallback estático.** Tabla comparativa de modalidades, representación, preguntas y límites.

### 3. Diagnóstico de verbo de ML: predecir antes de revelar

**Pregunta.** ¿Qué salida se quiere producir realmente?

**Estado inicial determinista.** Ninguna respuesta revelada; se muestra un caso: «Ordenar
candidatos para revisión humana».

El estudiante elige una opción entre `detectar`, `clasificar`, `estimar`, `describir` y `priorizar`,
y después solicita la explicación. El sistema muestra la salida esperada, una métrica o criterio
pertinente y una pregunta de seguimiento. No asigna una calificación ni guarda datos personales.

**Diagnóstico.** La actividad previene «ML encuentra planetas directamente» y «la accuracy alta
demuestra que el modelo funciona». La retroalimentación separa señal, candidato, clase,
parámetro, ranking y confirmación científica.

**Fallback estático.** Matriz de cinco verbos con ejemplo, salida, comparación necesaria y límite;
la respuesta se puede discutir sin interacción.

### 4. Tarjeta de impacto: problema, cifra y límite

**Pregunta.** ¿Qué significa una cifra de impacto dentro de la cadena?

**Estado inicial determinista.** Primer caso de la galería, Kepler y clasificación de candidatos,
en vista `problema`.

El control alterna `problema`, `solución`, `cifra` y `límite`. Cada estado conserva el mismo caso,
referencia visible, unidad y estatus de la cifra. Las cifras de artículos recientes muestran fecha
y quedan marcadas para revisión antes de publicar.

**Visual analítico.** Cuando se compare escala, error, recuperación o aceleración, usar un plot o
tabla reproducible con fuente, transformación, unidades y contexto experimental. Una imagen raster
de una misión o un esquema de instrumento solo ilustra el escenario y conserva crédito, alt text y
derechos.

**Qué observar.** «Candidato», «validado estadísticamente» y «confirmado» son estados de evidencia
distintos. Una cifra de sistemas simulados no equivale a planetas descubiertos.

**Fallback estático.** Cada caso se presenta como bloque completo en el orden problema → dato →
intervención → cifra → resultado → límite → referencia.

## Actividades diagnósticas y salida

Las actividades producen respuestas observables, pero la ficha no registra progreso ni convierte el
recorrido en una puntuación.

1. **Una pregunta, dos formulaciones.** Transformar una pregunta amplia en una pregunta con unidad,
   dato, salida y criterio de utilidad.
2. **Clasificar la representación.** Elegir curva, espectro, imagen, catálogo, simulación o
   inyección y escribir qué información podría perderse al resumirla.
3. **Reconstruir un artículo.** Completar pregunta, dato, representación, salida, etiqueta o
   referencia, línea base, métrica, conclusión permitida y alcance.
4. **Elegir el verbo.** Asociar un enunciado con detectar, clasificar, estimar, describir o
   priorizar y justificar la salida.
5. **Límite en una frase.** Completar: «Este modelo puede ayudar a ___ a partir de ___, bajo el
   supuesto de ___. Su resultado debe validarse mediante ___.»
6. **Transferencia docente.** Preparar una mini actividad de 5–10 minutos con pregunta, visual,
   comprobación, límite y referencia.

La ficha de salida debe incluir los ocho campos de la promesa y un enlace visible a Lectura,
Glosario y Referencias. Las respuestas de ejemplo sirven para retroalimentación local; no se
presentan como evaluación científica ni como nota académica.

## Codificación visual y semántica

- `data`: azul/cian para mediciones, datos y representaciones; se acompaña con forma de serie,
  espectro, mapa o tabla.
- `model`: violeta para tarea, familia y mecanismo; se acompaña con etiqueta textual.
- `decision`: ámbar para línea base, métrica y decisión de diseño; se acompaña con comparación o
  icono explícito.
- `limit`: rojo/coral para advertencias, falsos positivos, incertidumbre y dominio de validez;
  siempre lleva texto.
- `transfer`: verde para la pregunta de reutilización docente; se acompaña con el rótulo
  «Transferencia».

La superficie oscura requiere contraste suficiente y estados de foco claramente perceptibles. El
color nunca codifica por sí solo una clase, una rama o un estado. Patrones, posición, símbolos y
leyendas repiten el significado.

## Accesibilidad y estados

- HTML semántico, encabezados jerárquicos, `nav` etiquetada y controles nativos siempre que sea
  posible.
- Cada figura tiene pie, alt text informativo y una versión textual equivalente. SVG/Canvas, si se
  usan, no contienen la única explicación.
- Ejes, unidades, leyendas, cifras y ecuaciones viven en HTML/SVG accesible; las imágenes raster
  aportan contexto cualitativo.
- Contraste revisado en superficie oscura y clara, tamaño de texto ampliable y reflujo sin pérdida
  de información. No usar solo color para las cinco ramas ni para positivo/negativo.
- Teclado: `Tab` recorre modos, carril, controles y actividades; `Enter`/`Space` activa; flechas
  izquierda/derecha recorren estaciones o una lista roving con nombre accesible; `Home`/`End`
  van a la primera/última estación; `Escape` cierra una tarjeta y devuelve el foco al control que
  la abrió. El cambio de estación anuncia título y resumen en una región `aria-live` breve.
- Móvil, desde 390×844: una columna, tarjetas apiladas en flujo vertical, controles próximos a su
  figura, tablas desplazables con encabezados conservados y sin significado dependiente de hover.
- `prefers-reduced-motion: reduce`: elimina desplazamientos, parallax y transiciones; muestra de
  inmediato el estado final. Las actividades, plots y resúmenes mantienen toda la información.
- Sin JavaScript: Presentación cae a la lectura lineal y a tablas/bloques estáticos; todas las
  estaciones, referencias, límites y actividades de texto siguen disponibles.
- Datos vacíos, error de carga o imagen ausente: mostrar mensaje explicativo, alt text, fuente y
  tabla/resumen estático. Nunca presentar una cifra o figura incompleta como resultado.

## Procedencia y derechos

La ficha se basa en el paquete `S00-MLCP-de-los-mundos-a-los-datos` y conserva:

- `source_vault: DASAN`;
- `source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S00 - De los
  mundos a los datos - Introducción al ML para exoplanetas.md`;
- `source_heading: S00 — De los mundos a los datos: introducción al ML para exoplanetas`;
- referencias institucionales de NASA, ESA, ESO, ALMA y National Academies, y artículos citados
  en la nota fuente.

El estado de esta experiencia permanece `internal`, `publish_ready: false` y `rights: pending`.
No se autoriza todavía ningún asset raster, captura, dato descargable o cifra para publicación.
Cada recurso futuro deberá registrar fuente, transformación, licencia o permiso, unidades, versión,
semilla cuando aplique y límite de uso. Las ilustraciones pueden ser propias o abiertas con
atribución verificada; una fotografía institucional requiere revisión de derechos. El contenido
del paquete `inbox/` no se carga directamente al build.

## Límites pedagógicos y científicos

La interacción enseña a ubicar una decisión de ML dentro de una cadena científica. No confirma
planetas, no estima parámetros físicos por sí misma, no demuestra causalidad y no sustituye una
evaluación reproducible o una validación astronómica. Las cifras de rendimiento conservan el
conjunto, la población, el contexto experimental y el estatus descritos por su fuente.

## Matriz mínima de pruebas

| Área | Caso mínimo | Evidencia esperada |
| --- | --- | --- |
| Estado inicial | Carga limpia y recarga en `/sistema/s00/` | Mundo activo, primer foco determinista y resumen correcto |
| Carril | Anterior/Siguiente, tarjetas apiladas, primera/última subpantalla, estado inválido | Orden jerárquico, nombres accesibles, reinicio a `01.1 Mundo` y URL útil |
| Lente de datos | Cambiar cada modalidad y vista | Figura/tabla, unidades, origen, pérdida posible y resumen sincronizados |
| Diagnóstico | Respuesta antes de revelar y respuesta alternativa | Retroalimentación local, sin puntuación persistida ni bloqueo de lectura |
| Impacto | Alternar problema/solución/cifra/límite | Unidad y estatus de cifra conservados; referencia visible |
| Lectura sin JS | Desactivar JavaScript o cargar fallback | Toda la cadena, actividades, referencias y límites legibles |
| Teclado y foco | Tab, Enter/Space, flechas, Home/End, Escape | Foco visible, orden lógico, anuncio y devolución de foco |
| Accesibilidad | axe más revisión manual de nombre, contraste, alt text y tablas | Sin bloqueos conocidos; equivalencia textual de cada visual |
| Responsive | 1920×1080, 1440×900, anchura intermedia y 390×844 | Primer cuadro horizontal comprensible; móvil en una columna sin overflow crítico |
| Movimiento | `prefers-reduced-motion: reduce` | Sin desplazamiento animado; estado final e información completos |
| Visuales | Snapshot de Mundo, una estación, lente, diagnóstico y límite | Contraste, texto largo, ejes, leyendas y estados significativos estables |
| Reproducibilidad | Rehacer plots analíticos desde fuente, transformación y semilla declaradas | Mismas unidades, forma y valores dentro de tolerancia documentada |
