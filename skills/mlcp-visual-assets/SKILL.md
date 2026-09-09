---
name: mlcp-visual-assets
description: Produce and review visual assets for ML Ciencias Planetarias, requiring ImageGen for qualitative raster illustrations and icon families, exact SVG/HTML for verifiable schematics, and reproducible graphics for data while preserving visual coherence, accessibility, provenance, rights, and evidence boundaries.
metadata:
  short-description: Decide, encargar y auditar assets visuales de MLCP
---

# Producción visual para MLCP

Usa esta skill cuando una unidad, ejemplo o actividad del curso necesite un asset visual, una
ficha de encargo o una revisión de un recurso existente. La unidad de entrega es un conjunto
revisable: ficha, recurso o propuesta, manifiesto y revisión. Mantén las rutas de archivo
relativas al repositorio y separa la evidencia científica de la adaptación didáctica.

Lee el [sistema visual](../../docs/protocols/VISUAL_SYSTEM.md), el [protocolo de procedencia y
derechos](../../docs/protocols/PROVENANCE_AND_RIGHTS.md), el [contrato de assets de
ADR-0002](../../docs/architecture/decisions/ADR-0002-course-content-contract.md) y la
[validación](../../docs/planning/agent-execution/VALIDATION.md) antes de producir o promover un
recurso. Verifica los valores vivos en [`src/styles/tokens.css`](../../src/styles/tokens.css).

## Elegir el medio por la necesidad pedagógica

| Necesidad visible | Ruta de producción | Tipo habitual | Regla decisiva |
| --- | --- | --- | --- |
| Dibujito, miniatura, icono, escena astronómica, metáfora o contexto cualitativo sin números, ecuaciones ni etiquetas que deban ser exactos | Ilustración GPT mediante `$imagegen` | `conceptual` | Es la ruta obligatoria para la ilustración cualitativa; la relación se completa con texto, alt y pie. El archivo lleva alfa real si se solicita transparencia. |
| Flujo, taxonomía, arquitectura, flechas, ejes, leyendas, etiquetas o ecuaciones exactas | Esquema SVG/HTML | `conceptual` o el tipo que corresponda al contenido | El texto y la geometría viven en código verificable, con `viewBox`, unidades y estructura accesible. |
| Serie, distribución, medición, simulación, incertidumbre o comparación numérica | Gráfico reproducible | `simulated` u `observed` | Los datos, transformaciones, unidades, semilla y proceso permiten volver a generar la figura. |

Cuando una composición mezcle necesidades, separa las capas: por ejemplo, una ilustración de
contexto junto a un esquema exacto o un gráfico reproducible. No solicites a una imagen GPT que
escriba cifras, ejes, ecuaciones o etiquetas críticas. La herramienta no determina el tipo de
evidencia: `conceptual`, `simulated` y `observed` describen el contenido y su procedencia.

## Regla obligatoria para dibujitos e ilustraciones cualitativas

Todo dibujito, miniatura o icono que represente un objeto, escena o metáfora de una unidad se
produce con `$imagegen`. La regla incluye los iconos dentro de tarjetas, carriles, estaciones y
presentaciones futuras. Un SVG dibujado a mano puede conservarse como prototipo de layout, pero no
se acepta como ilustración cualitativa final cuando la ficha pide una imagen.

La familia visual por defecto es `MLCP editorial line-art v1`:

- línea limpia y sobria, formas planas y reconocibles, detalle suficiente para distinguir el objeto
  a tamaño de miniatura, terminaciones y grosor de trazo consistentes entre variantes;
- composición centrada, pocos objetos persistentes, sin textura fotográfica, collage accidental,
  marco ni decoración que compita con la relación didáctica;
- roles cromáticos tomados de `src/styles/tokens.css`, reforzados por forma, posición, patrón o
  texto externo. El color nunca es la única señal;
- imagen sin texto técnico, cifras, ecuaciones, ejes, unidades, leyendas ni flechas críticas. Esos
  elementos exactos permanecen en HTML/SVG accesible alrededor de la imagen.

Cuando la ficha pida fondo transparente, el entregable debe ser un raster RGBA con canal alfa real:
las esquinas y el exterior del dibujo quedan transparentes. No se acepta un tablero cuadriculado
dibujado, ni un rectángulo blanco, oscuro o coloreado, ni una retícula, borde, halo o sombra horneada
que simule transparencia. La ficha y el manifiesto registran `background_mode:
transparent-alpha` y `alpha_status`; la revisión incluye el render sobre una superficie oscura y otra
clara, además de una comprobación intrínseca del canal alfa.

Antes de generar una familia, fija un único brief de estilo y reutilízalo en todas las variantes.
Si `$imagegen` no está disponible, entrega la ficha y deja el recurso pendiente; no reemplaces la
salida faltante por un dibujo manual ni declares generado un asset que no fue inspeccionado.

## Ficha de encargo

Completa [`templates/asset-brief.md`](templates/asset-brief.md) antes de producir. La ficha debe
fijar, como mínimo:

- `id` estable, sesión/estación/unidad y caso concreto;
- propósito didáctico, pregunta o acción esperada del estudiante, objeto focal y relación que debe
  poder señalarse al mirar la figura;
- medio elegido y razón de la elección;
- texto, números, ecuaciones, unidades y nombres que deben ser exactos, además de los elementos
  que deliberadamente no deben aparecer;
- composición, proporción, espacios reservados para etiquetas, recortes previstos en móvil y
  contextos de inspección: 1920×1080, 1440×900, 390×844 y una anchura intermedia;
- referencia de estilo, familia visual, restricciones de objetos y anatomía, y señales que
  acompañarán al color;
- para una ilustración cualitativa: `generation_method: imagegen`, `background_mode` y estado de
  verificación del alfa; si es una familia, el mismo estilo y brief para todas las variantes;
- fuente, transformación prevista, estado inicial de derechos y límite de la afirmación.

La ficha vincula la figura a la pregunta, representación, tarea, evaluación o límite que le
corresponda. Un recurso decorativo sin relación visible con la unidad vuelve a encargo.

## Tokens y paleta semántica

Estos son los valores vigentes de `src/styles/tokens.css` en la revisión de esta skill. Usa los
nombres de token en SVG/HTML y describe estos roles en un encargo raster. Vuelve a leer el archivo
antes de una producción posterior si los tokens pudieron cambiar.

| Rol | Token | Base | Suave | Señales adicionales obligatorias |
| --- | --- | --- | --- | --- |
| datos, observables, representación, evidencia | `--data` | `#007c87` | `--data-soft` `#c8eef0` | etiqueta, posición, forma o patrón |
| paradigma, tarea, familia, mecanismo | `--model` | `#5144c9` | `--model-soft` `#e3defb` | texto o estructura, además del color |
| línea base, métrica, decisión de diseño | `--decision` | `#965000` | `--decision-soft` `#f5dfbb` | línea, icono, orden o etiqueta |
| advertencia, falla, límite | `--limit` | `#b33b3b` | `--limit-soft` `#f7d8d2` | texto explícito o símbolo |
| transferencia y reutilización docente | `--transfer` | `#256f55` | `--transfer-soft` `#d1eadf` | posición, encabezado o patrón |
| pregunta y apertura | `--question` | `#1f5b75` | `--question-soft` `#d6e9f1` | forma o texto de pregunta |
| estructura y lectura | `--ink-950` `#071a25`, `--ink-900` `#0d2633` | — | — | contraste y jerarquía tipográfica |
| superficie editorial | `--paper-50` `#fbf8f0`, `--paper-100` `#f3eddf`, `--white` `#fffdf8` | — | — | fondo y separación |

El color nunca porta por sí solo una diferencia científica. Añade texto, forma, posición, patrón,
tipo de línea o iconografía. Comprueba contraste y legibilidad en el tamaño final; una leyenda que
solo distingue por color requiere devolución.

## Rutas de producción

### Ilustración con herramienta de imágenes GPT

1. Inspecciona cada referencia local a tamaño intrínseco antes de editarla y anota dimensiones,
   peso, recorte, objetos, relación visible, contraste y elementos que deben permanecer. Usa
   `view_image` o un inspector equivalente. Para una imagen nueva, inspecciona la ficha y el
   espacio de destino antes de invocar la herramienta.
2. Cuando la generación o edición esté autorizada, sigue la skill disponible `$imagegen`; esta es la
   ruta requerida para los dibujitos, miniaturas, iconos y escenas cualitativas. Deja que
   la herramienta resuelva su modelo y su interfaz vigente; no fijes modelos, endpoints, API keys ni
   comandos obsoletos en esta skill.
3. Construye el encargo con objeto focal, relación, composición, tono y exclusiones. Pide una
   ilustración de la familia visual declarada, con fondo transparente RGBA cuando corresponda;
   incluye literalmente la prohibición de checkerboard/tablero cuadriculado y de cualquier fondo
   sólido horneado. Excluye texto técnico que pueda salir falso, números que parezcan medidos,
   escalas implícitas u objetos adicionales. La imagen generada o alterada con GPT se registra como
   ilustración y nunca se presenta como observación ni como resultado científico real.
4. Revisa el archivo a tamaño intrínseco y comprueba el canal alfa: las esquinas deben ser
   transparentes, el dibujo no debe estar pegado a un rectángulo y el render debe seguir funcionando
   sobre superficies claras y oscuras.
5. Revisa consistencia de objetos entre etapas, anatomía y geometría plausibles para la intención,
   ausencia de etiquetas inventadas, ausencia de escalas engañosas y recorte en proyección/móvil.
   El alt y el pie explican la relación y dejan claro el carácter conceptual cuando pueda confundirse
   con una observación.

### Esquema SVG/HTML exacto

- Escribe en SVG/HTML los textos, cifras, ecuaciones, ejes, unidades, leyendas, flechas y relaciones
  que deban ser exactos. Conserva la fuente de esos valores junto al registro; no los rasterices para
  ocultar una discrepancia.
- Define `viewBox`, proporción, márgenes y puntos de anclaje. Usa los tokens semánticos del sistema y
  señales redundantes. Incluye `title`/`desc` o una alternativa HTML equivalente; el lector debe
  poder entender qué observar sin pasar el puntero.
- Renderiza e inspecciona a 1920×1080, 1440×900, 390×844 y una anchura intermedia. Devuelve por
  etiquetas superpuestas, flechas cortadas, overflow, ecuaciones ilegibles, ejes sin unidades,
  leyendas ambiguas o una relación que se pierda al pasar a flujo vertical.
- Clasifica el tipo por el contenido. Un mapa conceptual exacto suele ser `conceptual`; un panel que
  representa una simulación o una observación necesita la procedencia y los datos de esa afirmación.

### Gráfico de datos reproducible

- Conserva la ruta de código, entrada o dataset, versión/entorno relevante, transformación, unidades,
  semilla y parámetros. Declara si los datos son `simulated` u `observed`; una demostración ejecutable
  no adquiere estatus de evidencia por poder correr.
- Muestra ejes, unidades, leyenda, escala lineal/logarítmica, incertidumbre, réplicas o tamaño de
  muestra cuando sean pertinentes. Mantén visibles el baseline, la evaluación y los límites que
  evitan interpretar una figura como conclusión física completa.
- No dibujes a mano números de un dataset ni entregues un screenshot como fuente reproducible.
  Registra licencia, transformación y comando de regeneración. Si faltan datos, derechos, unidades,
  semilla o una ruta de ejecución, entrega una ficha/propuesta y devuelve el gráfico para completar.

## Inspección, accesibilidad y manifiesto

### Antes de producir o editar

- Lee la unidad y el caso; identifica la afirmación respaldada, la paráfrasis del curso, la decisión
  pedagógica y el límite de evidencia.
- Resuelve la ruta del recurso sin inventar una ubicación. Inspecciona el archivo existente a tamaño
  intrínseco y mide ancho, alto, formato y peso. Revisa también el render en los cuatro contextos
  definidos por el sistema visual.
- Comprueba qué partes son exactas y qué partes son cualitativas. Si una referencia contiene datos,
  etiquetas o derechos de terceros, registra la fuente y no la reutilices hasta resolver el permiso.

### Después de producir

Comprueba, y deja evidencia de cada resultado:

1. **Propósito:** el objeto focal y la relación visible responden a la ficha; el caso coincide con el
   caption, la unidad y el texto que lo acompaña.
2. **Exactitud científica:** números, ecuaciones, escalas, ejes y unidades coinciden con su fuente;
   un gráfico conceptual no aparenta ser una medición; un cambio de dominio o instrumento queda
   declarado.
3. **Composición:** la relación principal se entiende en el primer cuadro de proyección; no hay
   solapamiento, recorte destructivo, escala engañosa, objetos inconsistentes ni texto técnico falso.
   En proyección, el texto esencial conserva aproximadamente 18 px o más y los metadatos al menos
   13 px; en móvil el flujo no desborda ni oculta la relación.
4. **Sistema visual:** la paleta usa los roles vigentes; contraste, tipografía y composición respetan
    `VISUAL_SYSTEM.md`; color, forma, posición o patrón se refuerzan mutuamente.
5. **Familia y transparencia:** una ilustración cualitativa usa `$imagegen`, conserva la familia visual
    declarada y, cuando corresponde, tiene `background_mode: transparent-alpha`, canal alfa comprobado
    y ningún checkerboard, rectángulo o fondo horneado. Se revisa sobre superficie clara y oscura.
6. **Accesibilidad:** el alt describe lo visible y la relación útil sin prometer una conclusión; el pie
    aporta contexto, tipo y límite; SVG/HTML ofrece `title`/`desc` o texto equivalente; el recurso no
    depende de hover, animación o color único.
7. **Procedencia y derechos:** el manifiesto conserva `source_vault`/`source_note`/`source_heading`
    para origen Obsidian, o `origin: repo` con `source_path` y `source_heading` reales para una síntesis
    del repositorio. Añade `source_refs`, transformación, unidades, herramienta/proceso, licencia y
    `rights.status` (`original`, `open-license` o `permission`). Nunca publiques rutas personales,
    credenciales o datos sin permiso.
8. **Entrega:** el manifiesto contiene los campos del contrato (`id`, `type`, `file`, `alt`, `caption`,
    `purpose`, `provenance`, `rights`) y además unidad, caso, dimensiones, peso, proceso y límites.
   Usa [`templates/asset-manifest.yaml`](templates/asset-manifest.yaml) como base.

Los tipos significan:

- `conceptual`: construcción explicativa o esquema que no afirma haber medido el mundo;
- `simulated`: salida de datos generados por un procedimiento documentado, con sus parámetros y
  semilla;
- `observed`: dato observacional o derivado con fuente, transformación, unidades y derechos
  comprobables.

La herramienta o el formato no cambia estas etiquetas. Una ilustración GPT queda fuera de
`observed`, incluso si acompaña la explicación de un resultado observado.

## Criterios de devolución

Marca el recurso como `returned` y escribe defecto, regla incumplida, contexto de reproducción,
reparación requerida y comprobación de retorno. Devuelve el recurso cuando ocurra cualquiera de
estos casos:

| Hallazgo | Devolución concreta |
| --- | --- |
| El medio no puede preservar la exactitud requerida | Cambiar a SVG/HTML o gráfico reproducible; conservar la ilustración solo como apoyo conceptual. |
| Un dibujito cualitativo se produjo a mano, con otra familia visual o sin `$imagegen` | Rehacerlo mediante `$imagegen` usando el brief de familia; mantener en código solo los elementos exactos. |
| El archivo simula transparencia con checkerboard, rectángulo, halo, sombra o fondo horneado; el alfa no está comprobado | Regenerar/exportar como RGBA con alfa real, verificar esquinas y repetir el render sobre fondos claro y oscuro. |
| Escala, eje, incertidumbre o unidad induce una lectura cuantitativa que la fuente no sostiene | Retirar la apariencia de medición, corregir el gráfico o añadir la información verificable; no aprobar por estética. |
| El objeto cambia entre pasos, la anatomía/geometría contradice el caso o aparecen elementos inventados | Rehacer el encargo y repetir la inspección a tamaño intrínseco y final. |
| Falta una etiqueta exacta, una ecuación es ilegible o una leyenda asigna un significado falso | Rehacer en código o corregir con fuente comprobada; una imagen GPT no resuelve ese requisito. |
| Color es la única señal, el contraste falla, el recorte móvil pierde la relación o el texto se solapa | Añadir señales redundantes y ajustar composición; repetir desktop, proyección y móvil. |
| Alt, caption, tipo, dimensiones, peso, procedencia o derechos están ausentes o se contradicen | Completar el manifiesto y el registro de revisión; mantener el recurso interno hasta resolver la brecha. |
| Un recurso conceptual se anuncia como dato observado, resultado científico o pipeline real | Cambiar la afirmación y el tipo, o retirarlo; una etiqueta de "ilustración" debe ser visible en el contexto de uso. |
| La figura adorna la página sin hacer visible una relación o acción del estudiante | Volver a la ficha, definir su función o eliminar el encargo. |

La apariencia agradable no compensa un defecto de exactitud, accesibilidad, procedencia o derechos.
No marques `publish_ready` por completar una ficha; ese estado requiere la revisión editorial que
corresponda.

## Salida mínima y revisión

Entrega la ficha, el recurso o la propuesta, el manifiesto y una revisión con fecha, entornos,
comandos y resultado. Si la solicitud prohíbe generar, inspecciona y documenta un recurso existente;
declara explícitamente que no hubo generación nueva. Para una devolución, conserva la evidencia del
fallo y el criterio que debe repetirse. Usa el validador de skills indicado por la tarea, por ejemplo:

```powershell
python C:\Users\User\.codex\skills\.system\skill-creator\scripts\quick_validate.py skills/mlcp-visual-assets
```

La skill es la fuente canónica; un espejo solo se actualiza cuando una tarea posterior lo autoriza.
