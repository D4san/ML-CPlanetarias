# S03 — Escenas científicas

## Propósito y alcance

`S03ScienceScenes` presenta las estaciones 2–5 y 9 de la secuencia aprobada. Recibe `sceneId: string`, resuelve únicamente sus 14 escenas y devuelve `null` para escenas atendidas por los componentes de tránsito, métricas o navegación. Los textos completos de cada unidad viven en `src/lib/s03-content.ts`; este componente concentra los recursos visuales y las interacciones breves que los acompañan.

## Escenas

| `sceneId` | Representación y control |
| --- | --- |
| `mission-history` | El texto de apertura resume qué datos midió Kepler y qué conserva su archivo. Alterna misión primaria/K2, declara la población de estrellas por etapa y fecha el legado de descubrimientos en 2018. Incluye el concepto artístico PIA18904 de Kepler durante K2; la miniatura mantiene el encuadre y abre la imagen completa con fuente NASA/JPL en un diálogo. Véase [ficha de ampliación](s03-kepler-image-lightbox.md). |
| `pixels-aperture-flux` | Muestra una fuente estelar difuminada bajo una retícula; cada celda identifica un flujo `Fᵢ(t)`. La máscara `A` destaca los píxeles elegidos y el último paso relaciona su suma por cadencia con la curva SAP. El texto define SAP en español, menciona PDCSAP como producto corregido y conserva incertidumbre y `SAP_QUALITY`. |
| `kepler10-observation` | Abre con una pregunta de lectura de la curva de luz de Kepler-10 y explica que, con ruido, puede no verse una caída clara, destacar una aislada o aparecer varias que se repiten. Señala la bajada central y su recuperación como candidata a tránsito, y plantea comparar otros ciclos. Atribuye los datos a Kepler Q1/PDCSAP de MAST; presenta puntos sin unir, barras de incertidumbre y referencia de 0 ppm. |
| `variability` | Escena interactiva con disco estelar en rotación, entre una y cinco manchas del mismo tamaño y contraste, y curva normalizada sincronizada con la fase. Modelo didáctico cualitativo; no representa una estrella observada. |
| `eclipsing-blend` | Una animación de la órbita de una binaria eclipsante sincronizada con una curva calculada; incluye proyección sobre el cielo, una fuente vecina dentro de la apertura y una comparación entre la curva propia y la curva diluida. |
| `artifact-aperture` | Compara la misma estrella en `t₀` y `t₁` sobre dos retículas iguales; la apertura `A` permanece fija y el desplazamiento se conecta con el flujo sumado y el centroide. |
| `classification-task` | Diagrama estático de dos series de puntos sin unir: una con descensos repetidos clasificada como tránsito y otra sin ese patrón clasificada como no tránsito. |
| `binary-input-output` | Presenta el problema supervisado, el conjunto de referencia y la diferencia entre entrenar una CNN y evaluarla en señales reservadas. Una ayuda desplegable define Autovetter y distingue ese proyecto de la CNN del artículo. |
| `classification-vocabulary` | Abre con la tarea del artículo; un selector recorre TCE, PC, AFP, NTP y FP con una ilustración cualitativa por caso. Distingue las etiquetas de referencia del catálogo del error de predicción. |
| `preparation` | Secuencia estática del preprocesamiento: significado de `t`, `F(t)`, `σ` y `q`; limpieza y aplanamiento con máscara; plegado, binning y normalización. |
| `folded-views` | Presenta directamente la metodología global/local en dos columnas, define el plegado por fase y compara ambas escalas con la Figura 3 original, citada y ampliable. |
| `cnn-score` | Reconstruye didácticamente la arquitectura CNN de dos vistas: ramas global/local con convolución 1D y max-pooling, capas densas compartidas y salida de puntaje. La explicación mantiene el límite del puntaje como priorización, no confirmación ni probabilidad calibrada. |
| `paper-results` | Tabla de accuracy y ROC-AUC en el conjunto de prueba y lectura narrativa que compara los modelos, interpreta el resultado y contextualiza sus límites. |
| `paper-limits` | Embudo interactivo 513 → 30 → 9 → 4; relato de diagnóstico astronómico y validación de Kepler-80 g/Kepler-90 i; selector de las Figuras 11, 8 y 10 sobre fondo blanco. |

## 3.3 — Movimiento respecto de una apertura fija

- **Pregunta y objetivo:** ¿por qué un cambio de posición puede alterar el flujo medido? Relacionar la imagen de una fuente, los píxeles dentro de `A`, el flujo sumado `F_A` y la posición del centroide.
- **Secuencia visual:** `t₀` muestra una fuente centrada sobre una retícula de 5 × 5; `t₁` reutiliza el mismo halo, desplaza la estrella hacia el borde y conserva exactamente la posición de `A`. El gráfico marca el mismo intervalo en que `F_A` baja y el centroide se mueve.
- **Lectura accesible:** el diagrama completo tiene un nombre accesible que identifica la misma estrella en dos momentos, la apertura fija y la fracción de luz que queda fuera. Las celdas, el halo y el contorno duplicados son decorativos dentro de esa imagen compuesta.
- **Explicación:** centroide significa posición ponderada por la luz. La coincidencia entre su desplazamiento y una caída de `F_A` orienta revisar movimiento, apertura y calidad fotométrica.
- **Límites:** la secuencia es esquemática y no representa una serie medida de Kepler; no añade una nota de escala al pie.
- **Adaptación:** los dos momentos aparecen lado a lado en pantallas amplias y en columna en ventanas móviles; el gráfico se apila debajo.

## Datos y procedencia

La escena observada carga el subconjunto derivado `src/data/s03/kepler10-q1-transit-window.json`. Se construye desde un único FITS público Q1 de MAST, de 192 960 bytes. `src/data/s03/manifest.json` fija URL, fecha, nombre, SHA-256, hash repetido, selección, unidades, conteos de calidad, parámetros del artículo y limitaciones del checksum FITS. `src/data/s03/prepare_kepler10_q1.py` reproduce la ventana con Python, NumPy y Astropy. El FITS queda como fuente archivada en el repo y el sitio no lo importa en el bundle.

La gráfica normaliza PDCSAP_FLUX por la mediana Q1 de cadencias con `SAP_QUALITY = 0` y propaga PDCSAP_FLUX_ERR con la misma escala. Muestra 25 puntos independientes, sin unirlos con una línea. La ventana se centra en el segundo tránsito indicado por la época de descubrimiento más un período publicado; la narración visible presenta la bajada central y su recuperación como una candidata a tránsito cuya periodicidad habría que evaluar comparando otros ciclos. La selección no filtra por `SAP_QUALITY`; cada bandera original permanece en el JSON. Los 1 639 registros Q1, las 1 624 filas con tiempo, flujo y error finitos, las 1 432 filas con bandera cero y el conteo por bitmask se conservan en la documentación de procedencia. Las cifras de período, profundidad y duración se citan del artículo de descubrimiento y no se reajustan con esta ventana.

Las ilustraciones propias son conceptuales y no se rotulan como observaciones de Kepler. PIA18904 se identifica como concepto artístico de la misión K2, con copia local, crédito NASA/JPL y enlace a la ficha original. Las Figuras 3, 6, 8, 10 y 11 se incorporan en proporción completa y conservan cita, enlace a la fuente y vista ampliada. La lista de procedencia registra sus archivos y hashes. Las cifras de la CNN conservan test, umbral, métrica y población histórica del artículo.

## Accesibilidad y adaptación

- Los selectores son botones nativos con nombres claros, agrupados por `role="group"`, y exponen el estado mediante `aria-pressed`.
- Los cambios relevantes actualizan una región `aria-live="polite"`; las escenas no dependen del color para explicar la información.
- La gráfica observada expone título y descripción únicos mediante `useId`, procedencia MAST/Q1/PDCSAP, ejes con unidades, ticks legibles, puntos independientes, barras de incertidumbre, referencia de 0 ppm y un pie que explica la cadencia y la selección de la ventana.
- Las imágenes incluyen texto alternativo específico y pies que separan ilustración de dato observado.
- En ventanas estrechas, los diagramas se apilan y las tablas mantienen desplazamiento horizontal local. `prefers-reduced-motion` desactiva transiciones decorativas.
- Se puede montar más de una escena en Lectura. Todo ID de documento generado por estos componentes debe ser único dentro de ese montaje.

## Diagrama: dos clases de señal

- **Objetivo:** presentar la clasificación como asignación de una señal a una de dos clases: tránsito o no tránsito.
- **Composición:** dos filas con mediciones puntuales independientes en función del tiempo. La primera repite tres descensos y termina en la clase «Tránsito»; la segunda muestra fluctuaciones sin descensos repetidos claros y termina en «No tránsito».
- **Límite visible:** son ejemplos esquemáticos; no son observaciones ni resultados del artículo. Los puntos no se conectan con líneas.
- **Accesibilidad:** cada gráfico tiene una descripción alternativa de su patrón; nombre de señal, flecha y clase permanecen como texto visible.
- **Adaptación:** en pantallas anchas, rótulo, puntos y clase aparecen en una fila; en pantallas estrechas, el nombre y la clase comparten el encabezado y los puntos ocupan la fila siguiente.

Las escenas de posibles falsos positivos ahora emparejan cada ilustración con un esquema de diagnóstico: variación amplia, eclipses primario/secundario, o flujo y centroide. Los ejes no atribuyen unidades ni datos a Kepler; los captions mantienen visible el carácter conceptual.

## 5.1 — Del registro de Kepler a la entrada del clasificador

- **Narrativa:** Kepler registra el brillo de una estrella, no una imagen del planeta. La curva de luz se prepara para que la CNN compare los tránsitos repetidos y reciba dos vistas de la señal.
- **Registro:** cada punto relaciona un instante `t` con el flujo estelar `F(t)`. La pantalla conserva esta base de la representación sin enumerar todas las variables auxiliares del archivo.
- **Preparación:** la curva puede contener cambios lentos del brillo y tránsitos de otros planetas conocidos. El preprocesamiento reduce esas variaciones y procura mantener visible la señal estudiada; la pantalla explica el propósito, no cada operación del ajuste.
- **Repeticiones y vistas:** el período permite alinear los tránsitos repetidos. El estudio los resume en una vista del ciclo completo y otra centrada en el evento; la 5.2 compara qué información aporta cada escala.
- **Composición:** los tres pasos y sus explicaciones permanecen visibles en una secuencia; no hay controles que oculten etapas. En ventanas estrechas se apilan en orden.
- **Límite:** presentar el propósito general del preprocesamiento descrito por Shallue y Vanderburg; reservar los detalles técnicos para cuando sean necesarios para interpretar las vistas o el modelo.

## Interacción: entrenamiento y evaluación

- **Narración:** 4.2 plantea la clasificación binaria de TCE con forma de tránsito. Menciona PC frente a AFP/NTP sin desarrollar cada etiqueta; sus nombres y diferencias se explican en 4.3.
- **Autovetter y datos:** una ayuda desplegable explica que Autovetter fue un proyecto de clasificación automática basado en bosque aleatorio y estadísticas del pipeline. El artículo entrena otra arquitectura, una CNN sobre curvas de luz. El conjunto reúne 15 737 TCE etiquetados de Q1–Q17 DR24 y excluye UNK; sus etiquetas proceden de revisión manual y otros diagnósticos. Los autores encontraron ejemplos mal asignados, por lo que el desempeño mide acuerdo con el catálogo y no confirmación planetaria.
- **Entrenamiento:** una señal TCE y su referencia conocida → puntaje de la CNN → la entropía cruzada mide el desacuerdo y Adam ajusta los parámetros.
- **Evaluación:** señales reservadas → modelo ya ajustado, sin cambiar parámetros → comparación con las etiquetas de referencia y cálculo de métricas. La división detallada y la población del test se desarrollan en 6.1; las métricas se explican desde 6.2 en adelante.
- **Control y lectura:** botones nativos «Entrenamiento» y «Evaluación» con estado `aria-pressed`; cada estado presenta tres pasos y un resultado en una región `aria-live="polite"`. La ayuda de Autovetter usa un `details` nativo y comienza cerrada.
- **Límite pedagógico:** la escena resume la lógica de aprendizaje y evaluación. La transformación de aumento de datos y las dos vistas aparecen más adelante, en la escena de entrenamiento de la CNN.

## Interacción: clases del catálogo y error del clasificador

- **Narración:** Shallue y Vanderburg usan señales detectadas por Kepler con referencias PC, AFP o NTP. El clasificador aprende una decisión binaria entre «planeta» y «falso positivo»; el selector distingue la instancia de las etiquetas de referencia y del error.
- **Control:** cinco botones nativos muestran sigla y función breve. El estado inicial es TCE; seleccionar otra opción cambia su definición, ilustración y pie en una región `aria-live="polite"`.
- **Casos:** TCE es la instancia detectada; PC, AFP y NTP son clases de referencia; FP es un error cuando la referencia es AFP/NTP y la predicción del modelo es «planeta». FP no se presenta como etiqueta del catálogo.
- **Visual:** cada caso tiene una ilustración ImageGen de S03, sin texto ni escalas. En FP, la secuencia exacta `referencia → predicción → error` permanece en HTML y usa palabras, no solo color.
- **Fuentes y límites:** la narración se apoya en Shallue & Vanderburg (2017), §3.1, y en las referencias de clasificación. Las imágenes son escenas conceptuales, no resultados ni figuras del artículo.
- **Adaptación:** cinco botones ocupan una fila en pantalla amplia y dos columnas en móvil. Imagen y explicación se muestran en dos columnas y se apilan en móvil; el flujo de FP también pasa a columna.

## Interacción principal: flujo por píxel y suma de apertura

- **Pregunta:** ¿cómo pasa la luz que llega a muchos píxeles a una curva de brillo en el tiempo?
- **Estado inicial:** halo estelar difuminado detrás de 25 celdas. Cada celda lleva un subíndice `F₁`–`F₂₅`; el pie define `Fᵢ(t)` como el flujo del píxel `i` en cada cadencia.
- **Secuencia:** `Píxeles` identifica el flujo de cada celda; `Apertura` resalta nueve celdas contiguas con borde ámbar y declara `A = 9`; `Suma SAP` atenúa las restantes, muestra `F_SAP(t) = Σᵢ∈A Fᵢ(t)` y una curva de flujo total frente al tiempo.
- **Interpretación:** una medición de SAP suma, para cada cadencia, el flujo de los píxeles seleccionados. Repetir la suma crea una serie temporal; un tránsito puede aparecer como una caída. La apertura también puede recoger luz de fuentes vecinas. PDCSAP incorpora correcciones de tendencias instrumentales.
- **Visual y alcance:** el halo y la distribución entre celdas son cualitativos; las etiquetas, máscara, fórmula y curva se dibujan con HTML/SVG. No mostrar valores de flujo numéricos ni banderas observadas inventadas ni la cautela genérica sobre representar productos de Kepler.
- **Accesibilidad y fallback:** botones nativos agrupados con `aria-pressed`; cambio de explicación en `aria-live`; descripción accesible del campo y la curva; color reforzado con etiquetas, forma y leyenda. Mantener una distribución apilada en móvil.
- **Comprobación:** los tres estados explican el paso píxel → apertura → suma; comprobar legibilidad en 1920×1080, 1280×720 y 390×844, además del foco de teclado y la ausencia de desbordamiento.

## Interacción principal: manchas estelares y modulación rotacional

- **Pregunta y objetivo:** ¿cómo puede cambiar el brillo medido de una estrella que gira aunque no haya un planeta delante? Relacionar manchas oscuras que entran y salen del hemisferio visible con la variación del flujo total.
- **Estado inicial y fallback:** disco dorado con tres manchas, fase 0, curva calculada para esa configuración y marcador en el flujo de esa fase. El control de reproducción inicia el giro si el sistema permite movimiento; la composición inicial sigue explicando el ejemplo cuando JavaScript está desactivado.
- **Variables y unidades:** `n`, número total de manchas entre 1 y 5 (paso 1, inicial 3); `φ`, fase adimensional de una vuelta; `F/F₀`, flujo relativo y adimensional con nivel sin manchas igual a 1. Las manchas tienen tamaño y contraste fijos en esta demostración.
- **Cálculo didáctico:** cada mancha aporta un déficit fijo multiplicado por su área proyectada visible, aproximada por `max(0, cos(latitud) · cos(longitud + 2πφ))`. La suma de esos déficits da el flujo relativo. La gráfica y el disco usan la misma fase y configuración.
- **Codificación visual:** el disco y el halo dorado representan la estrella; manchas oscuras con contorno cálido señalan las regiones activas; la flecha superior indica la rotación; el trazo cian representa `F/F₀` y un punto con línea vertical marca la fase actual. Ejes y texto complementan el color.
- **Comportamiento:** un deslizador cambia `n` y actualiza manchas, curva y nivel de flujo; un botón pausa o reanuda la rotación. El avance tiene velocidad constante y una vuelta dura 12 s. No hay presets ni reinicio adicional.
- **Teclado y lectores de pantalla:** deslizador y botón nativos, con nombre visible y valor; el SVG ofrece título y descripción que explican el modelo y el vínculo entre fase, manchas y flujo. El cambio continuo del marcador no se anuncia como región en vivo.
- **Móvil:** disco, controles y curva se apilan en una columna estrecha; el gráfico conserva etiquetas legibles y no requiere arrastre horizontal.
- **Movimiento reducido:** la escena queda detenida en fase 0 y el botón permite iniciar manualmente. La consulta a `prefers-reduced-motion` también responde a cambios del sistema mientras la diapositiva está abierta.
- **Qué observar:** al aumentar `n` en esta distribución agrupada, se suman déficits y cambia la forma/amplitud del ciclo. Una distribución más simétrica puede compensar la modulación; el conteo solo no determina la variabilidad.
- **Misconcepción y límites:** rotación y actividad superficial pueden causar variabilidad cuasi periódica que imita estructura en una curva de luz. El modelo no incluye evolución de manchas, faculas, oscurecimiento al limbo, ruido, inclinación ni datos de Kepler; no predice una amplitud universal ni identifica una estrella real.
- **Comprobación mínima:** estado inicial con tres manchas y punto sincronizado; deslizador en 1 y 5 actualiza tanto disco como curva; pausa congela y reanudar continúa; teclado; reducción de movimiento; vista móvil; accesibilidad automática y revisión visual.

## Interacción: órbita de binaria eclipsante y dilución por una fuente vecina

- **Pregunta y objetivo:** ¿cómo puede una binaria producir dos descensos diferentes y cómo cambia su profundidad si la apertura recoge luz de otra estrella?
- **Estado inicial:** vista lateral y proyección sobre el cielo con la misma fase orbital; curva normalizada con eclipse primario en fase 0,25 y secundario en 0,75. La fase 0 corresponde a cuadratura. Una fuente vecina fija permanece dentro de la apertura.
- **Modelo geométrico:** dos discos circulares de radios relativos 1 y 0,46 orbitan su baricentro en una órbita circular de canto. La estrella A es más brillante; B es menor y más tenue. La fase determina separación proyectada y cuál queda en primer plano. La animación se identifica como modelo didáctico, sin asociarse a una binaria concreta.
- **Cálculo de flujo:** el área de intersección de los discos se obtiene con la fórmula geométrica de dos círculos. Durante el eclipse primario, B delante de A, el flujo bloqueado es `(I_A − I_B) · A_solapada`; durante el secundario, A delante de B, es `I_B · A_solapada`. Se normaliza por el flujo fuera de eclipse. La segunda curva suma un flujo vecino constante `F_v` y normaliza por el nuevo nivel base: `F_mezclado/F₀ = (F_binaria/F₀ + F_v/F₀) / (1 + F_v/F₀)`.
- **Codificación visual:** la vista lateral muestra ambas órbitas y el eje `+z` hacia el observador; la proyección muestra el solapamiento aparente y la apertura con la fuente vecina. La curva cian representa la binaria sola y la curva discontinua ámbar incorpora luz vecina. Un marcador vertical y un punto siguen la fase en ambos diagramas.
- **Comportamiento:** un botón pausa o reanuda un giro de 12 s por órbita. La fase única actualiza posiciones, orden de las estrellas, estado del eclipse, marcador y flujo. No se añaden controles de fase ni presets.
- **Accesibilidad y adaptación:** los dos SVG describen su perspectiva; nombres y etiquetas explican A, B, `+z`, baricentro y fuente vecina. El botón informa estado con `aria-pressed`. Las vistas se muestran en dos columnas cuando hay espacio y se apilan en móvil; las curvas se distinguen también por estilo de trazo.
- **Movimiento reducido:** la animación inicia detenida con `prefers-reduced-motion: reduce`; el usuario puede iniciarla manualmente. Cambiar la preferencia con la escena abierta actualiza la reproducción.
- **Interpretación y límites:** las profundidades primaria y secundaria dependen del tamaño y brillo de ambas estrellas; una tercera fuente constante disminuye la profundidad fraccional observada. El modelo asume órbita circular, alineación central, estrellas esféricas, brillo uniforme, fuentes no variables y flujo vecino constante. No incluye ruido, variabilidad, parámetros de un sistema real ni datos de Kepler.
- **Fuente y comprobación:** Prša et al. (2011) respalda el contexto de binarias eclipsantes y los parámetros catalogados; Shallue y Vanderburg (2017) contextualiza binarias y falsos positivos en la búsqueda de exoplanetas. Verificar profundidad primaria mayor que secundaria con los parámetros didácticos, sincronía de ambos SVG y las dos curvas, pausa/reanudación, fase reducida, lectura con teclado, móvil y accesibilidad automática.

## Interacción: entrenamiento y evaluación de la clasificación binaria

- **Pregunta y objetivo:** ¿cómo aprende una CNN de ejemplos etiquetados y cómo estimamos su desempeño con señales que no participaron en el ajuste?
- **Estado inicial y contexto:** el encabezado nombra a Christopher Shallue y Andrew Vanderburg, el año 2017 y el propósito de priorizar TCE que podían corresponder a planetas. La narración plantea PC frente a AFP/NTP y refiere a 4.3 para el significado de las categorías.
- **Conjunto y cautela:** el artículo toma 15 737 TCE etiquetados del catálogo Autovetter de Kepler Q1–Q17 DR24 y excluye UNK. Las etiquetas proceden de revisión manual y otros diagnósticos; se encontraron algunos errores. La pantalla advierte que la evaluación estima acuerdo con esa referencia, no confirmación física.
- **Autovetter:** la ayuda desplegable lo presenta como un proyecto de clasificación automática de Kepler basado en un bosque aleatorio y rasgos derivados de las estadísticas del pipeline. Distingue esa herramienta de la CNN del estudio, que recibe curvas de luz.
- **Entrenamiento:** TCE etiquetado → puntaje de la CNN → función de pérdida que resume la diferencia con la referencia → actualización de parámetros.
- **Evaluación:** un TCE del conjunto reservado → puntaje del modelo ya ajustado → comparación con su etiqueta de referencia → métricas. El protocolo de partición se desarrolla en la pantalla 6.1.
- **Adaptación y acceso:** los botones «Entrenamiento» y «Evaluación» informan la selección con `aria-pressed`. Cada estado presenta tres pasos y un resultado en `aria-live="polite"`. La explicación de Autovetter usa un `details` nativo, cerrado inicialmente y operable con teclado.
- **Comprobación:** se muestran la tarea binaria y la advertencia del catálogo sin tarjetas que desarrollen las tres clases; apertura por teclado de la ayuda; diferencias entre ajuste y evaluación reservada; correspondencia entre estados visuales y texto accesible; presentación a 1299 × 884 y móvil.

## Interacción: arquitectura de la CNN y puntaje

- **Pregunta y función:** ¿cómo transforma el clasificador las vistas global y local en un puntaje? Esta pantalla conecta la representación de 5.2 con la predicción que luego se evalúa.
- **Diagrama:** cada vista alimenta una rama convolucional propia. Los bloques de convolución 1D y max-pooling resumen patrones a escalas distintas; las capas densas reúnen ambas ramas y una salida produce `s`.
- **Reconstrucción y alcance:** recurso gráfico original del curso, basado en la arquitectura seleccionada de la Figura 7 de Shallue y Vanderburg (2018). Las curvas son esquemáticas; los bloques agrupan capas repetidas y omiten tamaños y número de filtros. No reproduce ni redistribuye la figura del artículo.
- **Lectura científica:** el texto describe filtros aprendidos, resumen de respuestas cercanas y combinación de ambas vistas. El puntaje prioriza la revisión, pero no confirma un planeta ni equivale automáticamente a una probabilidad calibrada.
- **Accesibilidad y visual:** el diagrama conserva una descripción accesible del flujo completo, etiquetas textuales junto a las diferencias de color y una distribución en ramas que se apila en móvil.
- **Comprobación:** revisar el contenido del diagrama, la atribución a la fuente primaria y el reflujo en escritorio y móvil.

## Interacción: puntajes, selección y validación astronómica

- **Pregunta y objetivo:** ¿qué ocurre después de que el clasificador asigna un puntaje alto a señales nuevas? Seguir la diferencia entre priorizar y validar una hipótesis planetaria.
- **Estado inicial:** cuatro botones seleccionables muestran el embudo de una búsqueda de 670 estrellas: 513 eventos de cruce de umbral, 30 señales con puntaje mayor que 0,5, nueve mayores que 0,8 y cuatro mayores que 0,9. El primer estado explica que superar el umbral de detección no determina la causa física.
- **Controles:** seleccionar cada cifra actualiza una explicación visible en una región `aria-live="polite"`. El estado de selección se expone con `aria-pressed`. Los botones de Figuras 11, 8 y 10 permanecen independientes y seleccionan la figura original correspondiente.
- **Relato de seguimiento:** los autores examinaron fuentes vecinas, centroides, eclipses secundarios, tránsitos pares/impares y estabilidad temporal. Una de las cuatro señales más puntuadas no avanzó por una compañera sin resolver; otra mostró posible evolución de profundidad. Las señales de Kepler-80 y Kepler-90 pasaron las pruebas, con probabilidades de falso positivo de 0,2 % y 0,5 %, que bajaron a menos de 0,01 % al considerar que ambos sistemas ya tenían varios planetas. El artículo las validó como Kepler-80 g y Kepler-90 i.
- **Transferencia:** una franja final formula la regla de trabajo para ML: el puntaje ordena la revisión; evidencia independiente del dominio respalda la conclusión.
- **Visual y móvil:** las figuras seleccionables se muestran en una superficie blanca tanto en miniatura como en el diálogo ampliado. La narración y los resultados se reacomodan en una columna estrecha; los dos resultados planetarios conservan rótulos textuales además del color.
- **Comprobación mínima:** revisar el texto dinámico en los cuatro cortes, los dos planetas y el enlace a la fuente; alternar las tres figuras; inspeccionar lectura y ampliación de cada figura, teclado, móvil y la explicación cuando no se usa interacción.

## Comprobación

`S03ScienceScenes.test.tsx` renderiza cada `sceneId`, ejercita controles de misión, apertura, etiquetas y preparación, verifica datos/unidades y figuras originales, y monta juntas las 14 escenas para detectar IDs repetidos. Las cinco figuras científicas se conservan como recursos locales separados del paquete de datos de Kepler.
