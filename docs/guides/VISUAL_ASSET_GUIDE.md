# Guía de assets visuales de ML Ciencias Planetarias

**Revisión:** F04 · 2026-09-08  
**Estado:** guía de encargo y revisión; no autoriza por sí sola la producción ni la publicación de
assets.

Esta guía traduce los tokens vivos de [`src/styles/tokens.css`](../../src/styles/tokens.css) y el
[sistema visual](../protocols/VISUAL_SYSTEM.md) a decisiones que otra persona pueda ejecutar y
revisar. Conserva las fronteras de [procedencia y derechos](../protocols/PROVENANCE_AND_RIGHTS.md)
y el contrato de assets de
[`ADR-0002`](../architecture/decisions/ADR-0002-course-content-contract.md). Las fichas y el
manifiesto reutilizables están en
[`skills/mlcp-visual-assets/templates/`](../../skills/mlcp-visual-assets/templates/).

Las fichas I-01, I-02 e I-03 conservan los encargos de F02 sin generar sus recursos. La familia I-04
se generó con la herramienta integrada `$imagegen`; sus archivos y mediciones quedan registrados
en el manifiesto de la familia y permanecen sujetos a revisión editorial y de derechos.

## Decisión de medio

La pregunta pedagógica decide el medio. El formato de archivo y la herramienta se registran en el
manifiesto, pero no convierten una figura en evidencia.

| Necesidad visible | Medio | Tipo de contenido | Decisión para S01 Instancia |
| --- | --- | --- | --- |
| Dibujitos o miniaturas cualitativas dentro de tarjetas y estaciones | `$imagegen`, raster RGBA | `conceptual` | Requerido para la familia de iconos; usar `MLCP editorial line-art v1`, sin texto dentro de la imagen y con alfa real, no checkerboard ni rectángulo de fondo. |
| Relación entre instancia, observación, representación, modelo, señal y salida; fórmulas, flechas y rótulos exactos | SVG/HTML exacto | `conceptual` | Requerido. Es la ruta de `instance/flujo` y `instance/notacion` del piloto. |
| Contexto astronómico cualitativo que ayude a situar una observación | Ilustración GPT | `conceptual` | Opcional y separada del esquema exacto; nunca reemplaza la cadena formal. |
| Serie, vector o comparación numérica con valores, unidades o incertidumbre | Gráfico reproducible | `simulated` u `observed` | Condicionado a disponer de dataset/proceso. El piloto actual no aporta uno. |

Cuando una unidad necesite dos medios, se entregan como capas separadas: una ilustración puede
aportar contexto y un SVG o gráfico reproducible conserva la relación exacta. El texto que nombra
la ruta vive en HTML accesible, aunque la ilustración se mantenga sin rótulos.

Para S01, las formas inline que renderizaba `InstanceMiniature` fueron sustituidas por una familia
integrada de nueve PNG RGBA: cinco funciones visuales de la tarjeta (`instance`, `observation`,
`representation`, `model`, `output`), las marcas auxiliares `target` y `signal`, y tres variantes
de salida. Las etiquetas, fórmulas y flechas críticas siguen viviendo en el sitio.

## Tokens reales y semántica

Los nombres y valores siguientes se copiaron de `src/styles/tokens.css` en esta revisión. No se
crea una paleta alternativa para los assets.

| Rol | Token base | Valor | Token suave | Uso y señal redundante obligatoria |
| --- | --- | --- | --- | --- |
| Pregunta y apertura | `--question` | `#1f5b75` | `--question-soft` `#d6e9f1` | signo o forma de pregunta, encabezado y posición de apertura |
| Datos, observables, representación y evidencia | `--data` | `#007c87` | `--data-soft` `#c8eef0` | etiqueta, trazo/punto, posición de entrada o patrón |
| Paradigma, tarea, familia y mecanismo | `--model` | `#5144c9` | `--model-soft` `#e3defb` | contenedor de transformación, estructura o texto explícito |
| Línea base, métrica y decisión de diseño | `--decision` | `#965000` | `--decision-soft` `#f5dfbb` | orden, línea de referencia, icono o rótulo |
| Advertencia, falla y límite interpretativo | `--limit` | `#b33b3b` | `--limit-soft` `#f7d8d2` | símbolo, borde, patrón y texto de advertencia |
| Transferencia y reutilización docente | `--transfer` | `#256f55` | `--transfer-soft` `#d1eadf` | encabezado, ubicación o patrón de transferencia |
| Estructura y lectura | `--ink-950`, `--ink-900`, `--ink-800`, `--ink-700` | `#071a25`, `#0d2633`, `#173743`, `#31515b` | — | jerarquía tipográfica, ejes, bordes y texto esencial |
| Superficie editorial | `--paper-50`, `--paper-100`, `--white` | `#fbf8f0`, `#f3eddf`, `#fffdf8` | — | fondo, paneles y separación |

Reglas de aplicación:

- Un tono semántico marca una función; no se asigna un color diferente a cada objeto por gusto.
  Una instancia, un planeta o una estrella conservan su forma aun en escala de grises.
- El color se repite con texto, posición, tipo de línea, patrón, borde o forma. Una leyenda que
  solo distingue tonos se devuelve.
- Los tonos suaves son superficies. El texto que vive sobre ellos usa `--ink-950` o `--ink-900`.
  El texto esencial no usa `--ink-500`; el cálculo sobre `--white` da aproximadamente 4,13:1.
- Como referencia de esta revisión, el contraste de los tonos base sobre `--white` es: `data`
  4,88:1, `model` 6,84:1, `decision` 6,00:1, `limit` 5,73:1, `transfer` 5,93:1 y `question`
  7,35:1. Se vuelve a comprobar la combinación real, el tamaño final y el fondo `--paper-50`.
- `--font-display` se reserva para títulos y nombres de estación; `--font-body` para explicación y
  controles; `--font-mono` para variables, IDs, unidades y datos. No se carga una fuente externa.
- La escala tipográfica y espacial sigue los tokens `--step-*` y `--space-*`. En proyección, el
  texto esencial conserva al menos el tamaño comprobado por el sistema visual (preferiblemente
  18 px), el texto secundario 15–16 px y los metadatos 13 px como mínimo. En móvil se mantiene la
  legibilidad mediante flujo y desplazamiento, no encogiendo toda la figura.

## Gramática de formas

Las formas siguientes son una gramática compartida. La miniatura y la figura amplia usan el mismo
orden, anclas y significado; la figura amplia añade texto, escala o detalle solamente cuando la
fuente lo permite.

| Objeto | Forma recurrente | Ampliación | Límite de interpretación |
| --- | --- | --- | --- |
| Estrella | círculo o punto con halo/rayos cortos; cuatro rayos como máximo | contexto de observación o punto de referencia | no codifica tamaño, temperatura ni una estrella concreta sin fuente |
| Planeta/exoplaneta | disco con un arco orbital; el arco indica relación, no una escala física | disco, arco y etiqueta del caso; rasgos de superficie solo si están respaldados | no añadir atmósfera, anillos, continentes o escala relativa inventada |
| Observación | trazo continuo sobre una línea de referencia; si es cuantitativo, ejes y unidades | serie con ejes, incertidumbre, leyenda y fuente | un trazo esquemático no es una medición; una serie sin unidades no se presenta como resultado |
| Representación numérica | corchetes, vector, barras o puntos en una retícula; etiqueta `xᵢ`, `sₜ` u otra exacta | cada variable relevante, orden, unidad y transformación | barras sin valores no significan magnitud; no dibujar números de memoria |
| Modelo | contenedor redondeado con entrada, transformación interna y salida | nombre exacto (`h_θ`, `π_θ`), tarea y relación ajustada | la caja no demuestra entrenamiento, causalidad ni desempeño |
| Salida | punto marcado `ŷ`, grupo encerrado `z`, o flecha de acción `aₜ`; texto junto al símbolo | etiqueta de salida, condición y límite | una marca de verificación no significa verdad científica; usarla solo para un resultado didáctico explícitamente correcto |

Para la Instancia del piloto, la cadena conserva estas anclas:

```text
instancia → observación → representación → modelo → salida
                                      ↳ señal de aprendizaje
```

Las tres rutas cambian el contenido formal, no la gramática:

| Ruta | Representación y señal | Salida que debe permanecer identificable |
| --- | --- | --- |
| `spectrum` | `xᵢ`, con `yᵢ` en los ejemplos de ajuste | `ŷ★`, abundancia estimada; su evaluación queda fuera de la figura |
| `catalog` | `xᵢ` sin objetivo por fila, señal `∅ yᵢ` | `zᵢ`, grupo o rareza; necesita interpretación externa |
| `followup` | estado `sₜ`, recompensa `rₜ` | acción `aₜ = π_θ(sₜ)`; la utilidad depende de la recompensa declarada |

Una miniatura puede mostrar solo la silueta de un trazo, vector o caja, pero no cambia la posición
del objeto entre estados. Las flechas, etiquetas críticas y ecuaciones se rehacen en SVG/HTML; una
imagen GPT no recibe esa responsabilidad.

## Composiciones y adaptación

### Relación

Para la cadena de Instancia se usa una lectura izquierda → derecha desde 1280 px. El lienzo exacto
puede usar `viewBox="0 0 1200 520"`, margen interno mínimo de 48 unidades y una franja superior
reservada para rótulos de 72–96 unidades. Cada nodo tiene un ancla estable y las flechas terminan
antes del borde del siguiente nodo. La señal ocupa una rama inferior con su propio rótulo; no se
oculta dentro de una flecha.

Los textos exactos viven en HTML o nodos de texto SVG. Se reservan espacios para título, etiqueta
de ruta, fórmula, leyenda y caption antes de dibujar. `viewBox`, `preserveAspectRatio`, marcadores
de flecha y `aria-label`/`title`/`desc` se revisan juntos para que ningún extremo quede recortado.

### Secuencia de flujo

Una secuencia muestra pasos numerados, una flecha de continuidad y un verbo breve por etapa. El
color de la etapa se acompaña con número y texto. Para `ajuste → uso`, la línea de ejemplos y la
flecha hacia el modelo quedan separadas de `x★ → ŷ★`; no se mezclan datos de entrenamiento con una
instancia nueva.

### Comparación

Dos paneles tienen el mismo ancho, línea de base, escala y orden de lectura. Se cambia una variable
declarada y se marca con patrón, contorno o anotación. Si las escalas difieren, cada panel muestra su
escala y el caption explica por qué; una comparación que oculta la diferencia de escala se rechaza.

### Móvil y proyección

La adaptación móvil es un cambio de composición, no un recorte del lienzo horizontal. Para la
Instancia, a 390×844 se usa este flujo:

```text
[Instancia · caso activo]
          ↓
[Observación · trazo o registro]
          ↓
[Representación · xᵢ / sₜ]
[Señal · yᵢ / ∅ / rₜ, a todo el ancho]
          ↓
[Modelo · h_θ / π_θ]
          ↓
[Salida · ŷ★ / zᵢ / aₜ]
[Fórmula y límite, en flujo HTML]
```

En esa adaptación:

- los paneles se apilan, el nodo y su etiqueta conservan un ancho común y la señal deja de ser una
  rama lateral comprimida;
- se mantiene la misma secuencia y el mismo texto que en escritorio; si la figura exacta requiere
  otra geometría, se usa una variante vertical con `viewBox` propio o HTML refluible;
- el documento no supera el viewport, las etiquetas pueden envolver palabras largas y los controles
  alcanzan 44×44 CSS px cuando el diseño lo permite (24×24 es el mínimo operativo);
- las flechas verticales quedan fuera de las cajas, las ecuaciones conservan desplazamiento
  horizontal local si es imprescindible y el caption sigue visible;
- no se depende de hover, zoom, animación ni color. Con movimiento reducido se muestra directamente
  el estado final;
- se revisan 1920×1080, 1440×900, una anchura intermedia, 390×844 y el diálogo largo 390×480.

### Reglas de generación para la familia de miniaturas

Usa un único brief y una referencia de estilo para todas las variantes. El prompt debe pedir línea
editorial científica limpia, formas planas reconocibles, pocos objetos, terminaciones consistentes y
fondo transparente con canal alfa real. Debe prohibir explícitamente checkerboard/tablero
cuadriculado, rectángulo blanco u oscuro, retícula horneada, borde, halo, sombra, texto, cifras,
ecuaciones y etiquetas técnicas. Tras generar, inspecciona el archivo a tamaño intrínseco, verifica
las esquinas transparentes y compón una prueba sobre fondo oscuro y claro. Un resultado que falle
cualquiera de estas comprobaciones queda pendiente de regeneración.

## Prompts parametrizables

Los prompts GPT solo encargan escenas cualitativas. Sustituye los campos entre llaves y conserva
las exclusiones. El texto exacto, los números, los ejes, las ecuaciones y las flechas de una
relación formal se producen después en SVG/HTML.

### Plantilla `GPT-CONCEPTUAL-MLCP-v1`

```text
Crea una ilustración editorial cualitativa para ML Ciencias Planetarias.
Caso: {case}.
Objeto focal: {focal_object}.
Relación que debe leerse: {visible_relation}.
Composición: {composition}; proporción {aspect_ratio}; deja un espacio limpio de {label_space}
para que el sitio añada etiquetas HTML accesibles.
Familia visual: MLCP editorial line-art v1; línea limpia, formas planas reconocibles, terminaciones
consistentes, detalle mínimo legible a tamaño de miniatura. Usa como referencia semántica los roles
{palette_roles}, pero no dibujes una leyenda de colores dentro de la imagen.
Entrega un raster RGBA independiente con fondo transparente real. No dibujes checkerboard/tablero
cuadriculado, rectángulo blanco, oscuro o coloreado, retícula horneada, borde, halo ni sombra.
Mantén consistentes {persistent_objects} en todos los estados y evita detalles anatómicos o
geométricos que no estén definidos por el caso.
No incluyas {must_omit}.
La imagen es conceptual: no presenta mediciones, una escala física, un dataset, una ecuación,
un eje, una unidad, una etiqueta técnica, una cifra ni un resultado observado.
Límite de uso: {claim_limit}.
```

Parámetros mínimos:

| Parámetro | Ejemplo S01 | Regla |
| --- | --- | --- |
| `{case}` | observación de un candidato exoplanetario | debe coincidir con unidad y caption |
| `{focal_object}` | telescopio y curva cualitativa | un objeto principal, sin collage accidental |
| `{visible_relation}` | observación que se traduce a una representación | describir qué debe señalar el estudiante |
| `{composition}` | izquierda: contexto; derecha: área limpia para overlay | declarar lectura y recorte móvil |
| `{aspect_ratio}` | `3:2` o `16:9` | elegir según destino, no según la herramienta |
| `{style_family}` | `MLCP editorial line-art v1` | usar la misma familia en toda la serie |
| `{palette_roles}` | `question` para apertura, `data` para trazo | los tokens se aplican en HTML/SVG posterior |
| `{must_omit}` | texto, ejes, números, galaxias y marcas de medición | evita etiquetas ficticias y cambio de dominio |
| `{claim_limit}` | ilustra una relación didáctica; no prueba una detección | se repite en alt/caption |

Ejemplo completado para un contexto opcional de Instancia:

```text
{case}: un telescopio registra cualitativamente un candidato exoplanetario.
{focal_object}: telescopio, estrella y un planeta sugerido por un arco orbital.
{visible_relation}: una observación astronómica se convierte en una señal que luego será
representada formalmente por el sitio.
{composition}: telescopio y cielo en el tercio izquierdo; una zona despejada en el tercio derecho
para texto HTML; composición 16:9 y una variante vertical sin perder telescopio, estrella ni arco.
{aspect_ratio}: 16:9.
{palette_roles}: question y data; sin depender del color.
{persistent_objects}: telescopio, estrella, planeta y arco orbital.
{must_omit}: palabras, fórmulas, ejes, unidades, cifras, resultados, galaxias, escalas de tamaño y
detalles de superficie inventados.
{claim_limit}: ilustración conceptual de contexto; no representa un sistema observado concreto ni
un pipeline ejecutado.
```

### SVG/HTML exacto

Usa `--data`, `--model`, `--decision`, `--limit`, `--transfer` y `--question` mediante variables CSS;
no copies sus hexadecimales en cada figura. Declara `viewBox`, proporción, márgenes, anclas, IDs
únicos y orden de lectura. Incluye `<title>` y `<desc>` o una alternativa HTML lineal. Toda cifra,
unidad, flecha, ecuación o etiqueta crítica debe permanecer editable y verificable.

### Gráfico de datos reproducible

Entrega el código, la ruta de entrada, versión o entorno relevante, transformación, unidades,
escala, incertidumbre, tamaño de muestra cuando aplique, semilla y comando de regeneración. Declara
`simulated` u `observed`; una figura que corre no se convierte por eso en evidencia. Un gráfico sin
dataset, unidades, semilla o proceso pasa a ficha pendiente y se devuelve antes de integrarlo.

## Fichas completadas para Instancia

Las tres fichas cubren los medios que podrían aparecer alrededor de Instancia. La primera es la
única requerida por el piloto actual; la segunda y la tercera dejan un encargo listo sin inventar
que ya exista un recurso o un dataset.

### I-01 · Cadena formal exacta

- `id`: `s01-instance-formal-chain`
- `session_station_unit`: `S01 / instancia / flujo + notacion`
- `case`: `scenario = spectrum | catalog | followup`, con la misma cadena visual y payload formal
  de la ruta activa
- `purpose`: hacer visible la continuidad instancia → observación → representación → modelo →
  salida y la señal que justifica la ruta
- `learner_action`: señalar dónde aparece `xᵢ` o `sₜ`, qué información acompaña la instancia y
  qué salida produce el método
- `focal_object`: cinco nodos formales y la rama de señal
- `visible_relation`: cadena horizontal en escritorio, flujo vertical en móvil y separación entre
  ajuste y uso
- `claim_limit`: esquema conceptual; no demuestra entrenamiento, métrica, causalidad ni desempeño
- `medium`: `exact-svg-html`
- `reason_for_medium`: fórmulas, flechas, etiquetas y equivalencias deben ser exactas, accesibles y
  editables; una rasterización no permite esa revisión
- `type`: `conceptual`
- `exact_payload`: `spectrum`: `D={(xᵢ,yᵢ)}ᵢ₌₁ⁿ`, `ŷ★=h_θ(x★)`; `catalog`: `D={xᵢ}ᵢ₌₁ⁿ`,
  `zᵢ=h_θ(xᵢ)`; `followup`: `aₜ=π_θ(sₜ)`, `rₜ=R(sₜ,aₜ)`. Las etiquetas visibles deben
  acompañar cada símbolo.
- `deliberate_omissions`: números de datos no proporcionados, unidades inventadas, ejes, métricas,
  nombres de algoritmos no seleccionados y afirmaciones de resultado
- `composition`: `viewBox 0 0 1200 520`; cinco nodos y cuatro flechas en una espina; señal debajo
  de representación; tira separada para `ajuste → uso`
- `aspect_and_dimensions`: ancho flexible en presentación; variante vertical para 390 px; sin
  recortar la espina ni la fórmula
- `label_spaces`: franja superior para estación/ruta, espacio encima de cada nodo, leyenda inferior
  y caption fuera del SVG
- `inspection_contexts`: `1920x1080; 1440x900; 1024x768; 390x844; 390x480`
- `style_reference`: `docs/protocols/VISUAL_SYSTEM.md`, `src/styles/tokens.css` y la estructura
  visible de `src/components/react/s01/InstanceScene.tsx`
- `must_not`: usar color como única señal, poner una flecha debajo del borde de un botón, mezclar
  `yᵢ` de ajuste con `x★` nuevo, introducir escala o truncar ecuaciones en móvil
- `source_or_dataset`: síntesis didáctica de
  `docs/specs/interactions/s01-pilot-subslides.md`, encabezados `Codificación y comportamiento` e
  `Interpretación y límites`; implementación de referencia `InstanceScene.tsx`
- `transformation_or_process`: SVG/HTML con tokens CSS, KaTeX o texto equivalente, `title`/`desc`,
  IDs estables y prueba de payload para las tres rutas; no se ejecutó en F02
- `alt_draft`: `Cadena formal que conecta una instancia con su observación, representación, modelo
  y salida; una rama inferior identifica la señal de aprendizaje de la ruta activa.`
- `caption_draft`: `Esquema conceptual de Instancia para la ruta {scenario}; separa ajuste, uso y
  señal de aprendizaje. No representa datos medidos ni desempeño del modelo.`
- `provenance_variant`: `origin: repo + source_path`
- `rights_candidate`: `hold` hasta que exista el archivo y se revise su autoría en la entrega
- `rights_note`: código y texto propuestos para el repositorio; la ficha no concede autorización de
  publicación
- `output_file`: propuesta posterior en el módulo de Instancia; F02 no modifica componentes
- `weight_budget_or_measurement`: SVG/HTML aún sin archivo independiente medido; registrar peso
  real al producirlo. Si se exporta a raster, aplicar el techo provisional de 2.395.910 bytes para
  una pieza comparable de hasta 1536×1024 y documentar cualquier excepción
- `review_return_condition`: devolver si una fórmula cambia entre rutas, una flecha o etiqueta se
  recorta, el móvil pierde la cadena, el alt no describe la relación o el recurso aparenta ser dato

### I-02 · Contexto conceptual GPT, opcional

- `id`: `s01-instance-context-exoplanet`
- `session_station_unit`: `S01 / instancia / apertura contextual`
- `case`: telescopio, estrella y candidato exoplanetario como contexto cualitativo de una observación
- `purpose`: situar la pregunta astronómica antes de traducirla a símbolos
- `learner_action`: identificar el objeto observado y preguntar qué parte de esa escena se convierte
  en representación
- `focal_object`: telescopio y sistema estrella–planeta sugerido
- `visible_relation`: contexto astronómico → señal que el esquema formal nombrará después
- `claim_limit`: no identifica un sistema real ni su escala, composición o detección
- `medium`: `gpt-illustration`
- `reason_for_medium`: el contexto es cualitativo y no necesita cifras, ejes ni ecuaciones; los
  elementos formales permanecen en I-01
- `type`: `conceptual`
- `exact_payload`: ninguno dentro de la imagen; el sitio añade el texto exacto como HTML
- `deliberate_omissions`: texto, números, ejes, unidades, ecuaciones, marcas de medición, galaxias,
  resultados y detalles de superficie no respaldados
- `composition`: lectura izquierda → derecha; objeto focal en el tercio izquierdo y espacio limpio
  para overlay HTML; variante vertical con contexto arriba y texto abajo
- `aspect_and_dimensions`: `16:9` de destino y variante `3:2` o vertical decidida por el layout; no
  ampliar hasta dar una escala física implícita
- `label_spaces`: mínimo un tercio del encuadre sin elementos críticos para etiquetas externas
- `inspection_contexts`: `1920x1080; 1440x900; 1024x768; 390x844`
- `style_reference`: roles de `src/styles/tokens.css` y el recurso existente
  `public/images/s01/reglas-aprendizaje.png`, usado como referencia de composición, no como fuente
  de objetos o escala
- `must_not`: texto falso de la herramienta, anatomía o geometría inconsistente entre variantes,
  color único, escala de planetas, galaxias decorativas o apariencia de observación real
- `source_or_dataset`: síntesis didáctica de `docs/specs/interactions/s01-pilot-subslides.md`,
  encabezado `Interpretación y límites`
- `transformation_or_process`: prompt `GPT-CONCEPTUAL-MLCP-v1` con los parámetros anteriores;
  registrar herramienta y fecha si se produce. No se generó en F02
- `alt_draft`: `Ilustración conceptual de un telescopio que observa un sistema estrella–planeta;
  deja espacio para explicar que la escena se traducirá a una señal y una representación.`
- `caption_draft`: `Contexto conceptual de una observación astronómica; no corresponde a un sistema
  observado ni aporta una medición.`
- `provenance_variant`: `origin: repo + source_path`
- `rights_candidate`: `hold`
- `rights_note`: conservar el proceso y la autoría de la generación antes de proponer promoción
- `output_file`: `propuesta pendiente`; no se creó archivo en F02
- `weight_budget_or_measurement`: si se produce un raster comparable, medir dimensiones y bytes; la
  referencia actual para hasta 1536×1024 es 2.395.910 bytes. Un peso mayor requiere excepción
  justificada en el manifiesto
- `review_return_condition`: devolver por texto o escala ficticios, recorte móvil destructivo,
  objetos cambiantes, ausencia de alt/caption o derechos sin resolver

### I-04 · Familia de miniaturas para tarjetas y estaciones

- `id`: `s01-instance-card-miniatures`
- `session_station_unit`: `S01 / instancia / tarjetas de flujo`
- `case`: cinco funciones cualitativas de la cadena (`instance`, `observation`, `representation`,
  `model`, `output`), dos marcas auxiliares (`target`, `signal`) y tres variantes de salida para
  `spectrum`, `catalog` y `followup`
- `purpose`: reconocer de un vistazo el papel de cada etapa sin convertir la miniatura en una
  fórmula, medición o leyenda
- `learner_action`: señalar qué etapa recibe una instancia, cuál la observa, cuál la representa,
  cuál transforma la representación y qué tipo de salida devuelve la ruta activa
- `focal_object`: un símbolo limpio por función; la familia debe conservar sus objetos y gramática
  entre tarjetas, subslides y futuras presentaciones
- `visible_relation`: progresión izquierda → derecha dentro de la tarjeta; el significado se
  completa con el encabezado, el texto y la fórmula que viven fuera de la imagen
- `claim_limit`: iconografía conceptual; no demuestra una observación, un entrenamiento, una
  métrica, una predicción ni una clase física
- `medium`: `gpt-illustration`
- `reason_for_medium`: son dibujos cualitativos y repetidos en una familia; `$imagegen` permite
  producirlos con una línea visual común y el código conserva los elementos exactos
- `type`: `conceptual`
- `exact_payload`: ninguno dentro del raster; nombres, variables, ecuaciones y relaciones formales
  se escriben en HTML/SVG
- `deliberate_omissions`: texto, cifras, ejes, unidades, ecuaciones, leyendas, flechas críticas,
  marcas de medición, fondos sólidos, checkerboard/tablero cuadriculado, retículas, bordes, halos y
  sombras horneadas
- `style_family`: `MLCP editorial line-art v1`; línea limpia, formas planas reconocibles, pocos
  objetos, terminaciones consistentes, detalle mínimo legible a tamaño pequeño y paleta semántica
  reforzada por forma o posición
- `generation_method`: `imagegen`
- `background_mode`: `transparent-alpha`
- `alpha_status`: `pending` hasta que cada archivo tenga esquinas transparentes comprobadas y un
  render validado sobre fondo claro y oscuro
- `composition`: variante cuadrada o casi cuadrada, objeto centrado, margen transparente uniforme,
  sin recortar el trazo; cada salida conserva la misma escala óptica que las otras miniaturas
- `aspect_and_dimensions`: proporción decidida por el componente; registrar el tamaño intrínseco
  real de cada PNG y comprobar el uso en 1920×1080, 1440×900, 1024×768, 390×844 y 390×480
- `label_spaces`: no reservar texto dentro de la imagen; el card title, la fórmula y el caption
  permanecen en HTML accesible
- `style_reference`: `docs/protocols/VISUAL_SYSTEM.md`, `src/styles/tokens.css`,
  `src/components/react/s01/InstanceScene.tsx` y la función `InstanceMiniature` de
  `src/components/react/S01Pilot.tsx`, esta última solo como referencia de roles y composición
- `must_not`: dibujar la ilustración final a mano en SVG, cambiar la línea entre variantes, depender
  del color, introducir escala física, incluir texto generado, usar transparencia simulada o
  confundir la salida con un resultado científico
- `source_or_dataset`: síntesis didáctica propia a partir de los roles y textos de
  `src/components/react/s01/InstanceScene.tsx` y `src/components/react/S01Pilot.tsx`; no usa dataset
- `transformation_or_process`: un brief y prompt de familia para nueve variantes, generadas con la
  herramienta integrada `$imagegen`; registrar la variante, la inspección alfa y la ruta final. No
  se usó el fallback CLI
- `alpha_status`: `passed`; los nueve PNG reportan `Format32bppArgb` y alfa `0` en sus cuatro esquinas
- `review_status`: `pending-editorial`; la integración en las tarjetas y la carga de la ruta
  `spectrum` ya están comprobadas, mientras siguen pendientes el contraste en fondo claro, las
  escalas móviles y la revisión de derechos
- `alt_draft`: `Miniatura conceptual de la etapa {role} dentro de la cadena de Instancia; el texto
  de la tarjeta nombra la función y explica su relación con la etapa siguiente.`
- `caption_draft`: `Iconografía conceptual de la cadena de Instancia; no representa datos medidos ni
  desempeño del modelo.`
- `provenance_variant`: `origin: repo + source_path`
- `rights_candidate`: `hold`
- `rights_note`: generación propia para el curso; conservar el prompt, la fecha, la herramienta y la
  revisión de derechos antes de promoción
- `output_file`: `public/images/s01/instance-miniatures/{instance,observation,representation,model,target,signal,output-spectrum,output-catalog,output-followup}.png`
- `weight_budget_or_measurement`: dimensiones y bytes medidos en el manifiesto de la familia; el
  presupuesto raster comparable se revisa para cada archivo, sin asumir que el tamaño de un icono
  aprueba su uso
- `review_return_condition`: devolver por canal alfa ausente, checkerboard o fondo horneado, deriva
  de estilo, objetos inconsistentes, ilegibilidad en miniatura, recorte móvil o falta de alt/caption

### I-03 · Representación numérica reproducible, condicionada

- `id`: `s01-instance-spectrum-representation`
- `session_station_unit`: `S01 / instancia / notacion / spectrum`
- `case`: serie de flujo relativo de enseñanza que ilustra cómo una observación puede representarse
  como `xᵢ`; el dataset real queda por seleccionar
- `purpose`: distinguir una representación numérica y su incertidumbre de una ilustración conceptual
- `learner_action`: señalar variables, unidades, transformación y qué parte se entrega al modelo
- `focal_object`: serie y vector de representación
- `visible_relation`: observación → valores transformados → entrada `xᵢ` → salida condicionada
- `claim_limit`: demostración simulada de la representación; no confirma un exoplaneta, una
  abundancia ni un rendimiento científico
- `medium`: `reproducible-data-graphic`
- `reason_for_medium`: si aparecen valores, escala, incertidumbre o distribución, el lector necesita
  datos y proceso reproducibles; GPT no puede conservarlos con exactitud
- `type`: `simulated` para una futura demostración didáctica, hasta que una fuente observacional
  documentada permita otra clasificación
- `exact_payload`: eje temporal y flujo relativo con unidades declaradas, leyenda de incertidumbre,
  etiqueta `simulación didáctica`, transformación hacia `xᵢ` y seed registrada
- `deliberate_omissions`: detector, planeta confirmado, métrica, modelo entrenado, cifra de
  desempeño o cualquier unidad/dataset aún no seleccionado
- `composition`: panel superior de serie; panel inferior de representación; misma variable resaltada
  con patrón y texto; baseline e incertidumbre junto al gráfico
- `aspect_and_dimensions`: SVG/HTML preferido; si se exporta raster, conservar la escala y medir el
  peso; variante móvil apila serie, vector, leyenda y límites
- `label_spaces`: ejes con unidades, leyenda, nota de simulación y caption; nunca dibujar etiquetas
  dentro de una imagen GPT
- `inspection_contexts`: `1920x1080; 1440x900; 1024x768; 390x844; 390x480`
- `style_reference`: `src/components/react/s01/InstanceScene.tsx` y `docs/specs/interactions/s01-pilot-subslides.md`
- `must_not`: valores escritos a mano, eje sin unidad, escala logarítmica no declarada, incertidumbre
  oculta, screenshot como fuente, o etiqueta `observado` sin dataset y transformación
- `source_or_dataset`: dataset y ubicación aún pendientes; la ficha no inventa una fuente
- `transformation_or_process`: entregar script, entorno, transformación, unidades, semilla, comando
  de regeneración y prueba de determinismo antes de crear el asset; no se ejecutó en F02
- `alt_draft`: `Gráfico simulado que muestra una serie de flujo relativo y su representación numérica
  x sub i; la leyenda identifica la incertidumbre y la nota indica que es una demostración.`
- `caption_draft`: `Simulación didáctica de la traducción de una observación a una representación;
  no es una serie observada ni evidencia de un exoplaneta.`
- `provenance_variant`: `origin: repo + source_path` cuando exista el script real; mientras tanto,
  ficha pendiente sin ruta ficticia
- `rights_candidate`: `hold`
- `rights_note`: el dataset, código y licencia deben resolverse antes de publicar
- `output_file`: `propuesta pendiente`; no se creó gráfico en F02
- `weight_budget_or_measurement`: medir el archivo final y sus dependencias; para un export raster
  comparable usar como referencia máxima provisional 2.395.910 bytes, no como permiso automático
- `review_return_condition`: devolver por datos no reproducibles, unidades ausentes, seed omitida,
  incertidumbre o baseline ocultos, clasificación `observed` sin fuente, o lectura engañosa en móvil

## Manifiesto y presupuesto medido

El manifiesto acompaña a cada recurso, incluso si el recurso queda devuelto. Sus campos mínimos
siguen `ADR-0002`: `id`, `type`, `file`, `unit`, `case`, `purpose`, `tool_process`, dimensiones,
peso, alt, caption, procedencia, derechos, límites y revisión. La plantilla está en
[`asset-manifest.yaml`](../../skills/mlcp-visual-assets/templates/asset-manifest.yaml).

### Medición disponible

La inspección de S01 encontró un único raster de curso comparable:

| Recurso | Formato | Dimensiones | Peso medido | Lectura |
| --- | --- | ---: | ---: | --- |
| `public/images/s01/reglas-aprendizaje.png` | PNG RGB | 1536×1024 | 2.395.910 bytes (2,285 MiB) | ilustración conceptual; no contiene etiquetas, ejes, unidades ni ecuaciones |

El valor de 2.395.910 bytes es una referencia observada, no una promesa de rendimiento ni una cifra
universal. Mientras no haya otro raster comparable medido, se adopta como techo provisional para
una pieza raster de hasta 1536×1024. Una pieza que lo supere registra `budget_status: exception`,
explica la razón y conserva la revisión de móvil. SVG/HTML y gráficos vectoriales se miden cuando
exista el archivo; F02 no inventa un límite de bytes para un formato que todavía no tiene un asset
independiente en S01. Un export raster de esos medios vuelve a la regla comparable.

### Manifiesto de referencia para el recurso existente

```yaml
id: s01-activities-learning-rules
type: conceptual
file: public/images/s01/reglas-aprendizaje.png
unit: S01 / actividades / reglas o aprendizaje
case: "Curva de luz que se bifurca entre reglas explícitas y aprendizaje desde ejemplos"
purpose: "Apoyo visual para distinguir reglas codificadas de ajuste desde ejemplos"
tool_process: "PNG existente; el prompt y el proceso histórico no constan en los archivos revisados"
width: 1536
height: 1024
weight_bytes: 2395910
weight_budget_bytes: 2395910
budget_basis: "Único raster de curso comparable medido en F02; techo provisional para hasta 1536x1024"
budget_status: reference-at-ceiling
alt: "Ilustración conceptual de un telescopio y una curva de luz que se divide hacia una ruta de reglas con umbrales y otra de ejemplos que conduce a un modelo ajustado"
caption: "Ilustración conceptual de apoyo; no representa un pipeline observacional, una medición ni un resultado astronómico"

provenance:
  origin: repo
  source_path: docs/specs/interactions/s01-activities.md
  source_heading: Imagen de apoyo
  source_refs: []
  transformation: "Archivo PNG existente; no se recortó ni transformó en F02"
  units: null
  seed: null

rights:
  status: hold
  note: "La especificación la declara original, pero el proceso histórico y la autorización de promoción requieren revisión"

limits:
  - "No contiene ejes, unidades ni etiquetas exactas"
  - "No debe presentarse como observación, entrenamiento o desempeño"
  - "Necesita alt, caption y contexto HTML para nombrar las dos rutas"

review:
  status: returned
  inspected_at: 2026-09-08
  contexts:
    - intrinsic-size
    - 1920x1080
    - 1440x900
    - 390x844
  findings:
    - "Tamaño intrínseco y peso medidos; revisión de los cuatro contextos aún pendiente"
    - "Mantener como conceptual y completar procedencia/proceso antes de promoción"
```

Este manifiesto completa los campos de registro sin convertir el asset en `publish_ready`. El
estado `returned` conserva la observación de D03: el recurso puede apoyar una unidad interna, pero
debe repetir las comprobaciones de contexto, procedencia y derechos antes de promoción.

## Criterios de rechazo

La persona revisora marca el recurso como `returned`, anota el contexto en que se reproduce,
señala la regla incumplida y exige una comprobación de retorno. La estética agradable no compensa
un defecto de exactitud, accesibilidad, procedencia o derechos.

| Hallazgo | Acción obligatoria |
| --- | --- |
| GPT intenta resolver fórmula, eje, unidad, cifra, leyenda o flecha crítica | Cambiar a SVG/HTML o gráfico reproducible; conservar GPT solo como contexto conceptual |
| Escala, baseline, eje, incertidumbre o unidad induce una lectura que la fuente no sostiene | Retirar la apariencia cuantitativa o corregir con fuente y proceso verificables |
| Estrella, planeta, instrumento o modelo cambia entre estados; anatomía o geometría contradice el caso | Rehacer el encargo y repetir inspección intrínseca, proyección y móvil |
| Aparece una etiqueta inventada, texto ilegible o relación formal oculta | Redibujar en código con texto exacto, `title`/`desc` y alternativa HTML |
| El color es la única diferencia, el contraste falla o el patrón se pierde en escala de grises | Añadir texto, forma, posición, tipo de línea o patrón; revisar contraste real |
| El recorte móvil elimina un nodo, flecha, caption o condición | Refluir a una columna o producir variante vertical; no aprobar el recorte |
| Falta alt, caption, tipo, dimensión, peso, procedencia, licencia, semilla o proceso | Completar manifiesto y mantener `returned`/`hold` hasta resolverlo |
| Un conceptual se anuncia como observado, una simulación como resultado o un pipeline como ejecutado | Corregir el tipo y la redacción o retirar el recurso |
| El archivo supera el techo comparable sin `budget_status: exception` y razón explícita | Optimizar, cambiar medio o registrar excepción medible |
| La figura adorna la página sin hacer visible una relación ni una acción del estudiante | Volver a la ficha, definir función observable o eliminar el encargo |

## Paquete mínimo para delegar

Quien reciba un encargo entrega, en la misma revisión:

1. la ficha basada en [`asset-brief.md`](../../skills/mlcp-visual-assets/templates/asset-brief.md),
   con un caso, medio, objeto focal, relación, espacios de etiquetas, recorte móvil y límite;
2. el recurso o una propuesta explícita si falta dataset, herramienta o autorización;
3. el manifiesto YAML con ID estable, ruta relativa, alt, caption, dimensiones, peso, proceso,
   procedencia, derechos, límites y estado de revisión;
4. la inspección a tamaño intrínseco, 1920×1080, 1440×900, una anchura intermedia y 390×844; para
   diálogos, también 390×480;
5. la lista de hallazgos y el comando o procedimiento que permite regenerar un gráfico de datos.

Una ficha completa permite encargar el trabajo. La aceptación de un asset exige además exactitud,
accesibilidad, derechos y revisión editorial conforme al ciclo del curso.
