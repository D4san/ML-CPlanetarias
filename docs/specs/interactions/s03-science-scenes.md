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
| `binary-input-output` | Presenta el objetivo del estudio de Shallue y Vanderburg (2017), define PC, AFP y NTP con sus conteos en el catálogo Autovetter y los agrupa para la clasificación binaria. Alterna el flujo de ajuste con etiquetas del catálogo y el puntaje/umbral aplicado a una señal nueva. |
| `classification-vocabulary` | Abre con la tarea del artículo; un selector recorre TCE, PC, AFP, NTP y FP con una ilustración cualitativa por caso. Distingue las etiquetas de referencia del catálogo del error de predicción. |
| `preparation` | Secuencia estática del preprocesamiento: significado de `t`, `F(t)`, `σ` y `q`; limpieza y aplanamiento con máscara; plegado, binning y normalización. |
| `folded-views` | Presenta directamente la metodología global/local en dos columnas, define el plegado por fase y compara ambas escalas con la Figura 3 original, citada y ampliable. |
| `cnn-score` | Alterna entrenamiento/inferencia sobre las dos vistas; en entrenamiento explica con un diagrama el reflejo horizontal aleatorio, la inversión del orden de los bins y la conservación de la etiqueta. En inferencia muestra el puntaje de las vistas originales. |
| `paper-results` | Tabla del test, gráfico interactivo de Accuracy/ROC-AUC y Figura 6 original de precision–recall, con cita y ampliación. |
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

- **Narrativa:** Kepler registra el brillo de una estrella, no una imagen de un planeta. El artículo transforma las curvas de luz para analizar cada TCE y producir representaciones comparables.
- **Registro:** `t` es el instante de la medición; `F(t)`, el flujo estelar medido; `σ`, la incertidumbre de ese flujo; `q`, la bandera de calidad de la cadencia (`SAP_QUALITY`). `q` describe calidad instrumental y no se muestra como una entrada independiente de la CNN.
- **Limpieza y tendencia:** retirar tránsitos de otros planetas confirmados del mismo sistema; ajustar una spline a la variación lenta; enmascarar e interpolar las cadencias del TCE durante el ajuste para no aplanar el tránsito; dividir el flujo por la tendencia estimada y retirar valores atípicos con el criterio descrito de 3σ.
- **Plegado y escala:** usar el período del TCE para alinear las repeticiones en fase; agrupar mediciones en bins y resumirlas con medianas; normalizar las vistas a mediana 0 y mínimo −1. La 5.2 explica las vistas global y local y sus respectivas resoluciones.
- **Composición:** los tres pasos y sus explicaciones permanecen visibles en una secuencia; no hay controles que oculten etapas. En ventanas estrechas se apilan en orden.
- **Límite:** presentar el pipeline descrito por Shallue y Vanderburg; no generalizarlo como una receta universal ni confundir `F/B(t)` con `F − B(t)`.

## Interacción: etiquetas, entrenamiento e inferencia

- **Secuencia:** la escena 4.1 presenta dos señales y sus clases de referencia. La 4.2 empieza en entrenamiento: una señal y su etiqueta conocida acompañan al puntaje; la comparación ajusta los parámetros del modelo. En inferencia, una señal nueva entra sin etiqueta del catálogo, el modelo entrenado calcula `s` para PC y un umbral produce la predicción PC o AFP/NTP. La referencia sirve después para evaluar.
- **Control y lectura:** botones nativos en un grupo con estado `aria-pressed`; cada estado presenta tres pasos y un resultado en una región `aria-live="polite"`.
- **Límite pedagógico:** la escena resume el aprendizaje supervisado. La transformación específica de aumento de datos y las dos vistas aparecen más adelante, en la escena de entrenamiento de la CNN.
- **Adaptación:** los tres pasos se muestran en una fila en pantallas amplias y se apilan en ventanas estrechas.

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

## Interacción: etiquetas, entrenamiento e inferencia de la clasificación binaria

- **Pregunta y objetivo:** ¿qué hicieron Shallue y Vanderburg con señales de Kepler, qué significa cada etiqueta del catálogo y cómo pasa el modelo de ejemplos conocidos a una señal sin etiqueta?
- **Estado inicial y contexto:** el encabezado nombra a Christopher Shallue y Andrew Vanderburg, el año 2017, la red convolucional y el propósito de revisar señales de Kepler para priorizar posibles planetas. La banda de datos indica que el catálogo Autovetter reúne 15 737 señales etiquetadas y excluye UNK.
- **Etiquetas y denominadores:** PC significa *Planet Candidate* (candidata a planeta; 3 600); AFP significa *Astrophysical False Positive* (falso positivo astrofísico; 9 596); NTP significa *Non-Transiting Phenomenon* (fenómeno no transitorio; 2 541). PC es la clase positiva; AFP y NTP se agrupan como negativas. Una etiqueta PC sigue siendo candidatura, no confirmación física. El artículo indica que las etiquetas proceden de evaluación manual y otros diagnósticos, y reconoce errores en algunos ejemplos.
- **Entrenamiento:** curva de luz revisada + etiqueta conocida → puntaje para la clase candidata → ajuste de parámetros. La etiqueta del catálogo funciona como referencia de aprendizaje.
- **Inferencia:** curva nueva sin etiqueta conocida → puntaje del modelo → comparación con el umbral → predicción candidata/no candidata. La etiqueta de catálogo, cuando existe, se consulta después para evaluar; el puntaje por sí solo no confirma un planeta.
- **Adaptación y acceso:** los tres resúmenes de clase se leen antes del control. El cambio entre entrenamiento e inferencia usa botones con `aria-pressed`; las tarjetas se apilan en anchos pequeños. No hay animación en esta escena, por lo que no necesita control de movimiento reducido.
- **Comprobación:** contenido visible de las tres expansiones y conteos; agrupación PC frente a AFP/NTP; entrenamiento desde una señal etiquetada; inferencia desde una señal nueva; teclado, lectura accesible y presentación a 1299 × 884 y móvil.

## Interacción: aumentación de ejemplos y puntaje de la CNN

- **Pregunta:** ¿qué transformación se usa para ampliar los ejemplos de entrenamiento y qué entra al modelo al puntuar una señal?
- **Estado inicial:** entrenamiento seleccionado para mostrar desde la apertura el reflejo horizontal aleatorio descrito por Shallue y Vanderburg (2017, § IV.2).
- **Entrenamiento:** el diagrama compara una curva esquemática con su reflexión izquierda-derecha. Se define como inversión del orden de los bins, `x₁,…,xₙ → xₙ,…,x₁`; la etiqueta PC/no planetaria se conserva. La explicación aclara que son variantes de ejemplos, no observaciones nuevas.
- **Inferencia:** el diagrama de aumentación desaparece; el flujo queda en las dos vistas originales → CNN → puntaje, con la advertencia de calibración.
- **Accesibilidad y visual:** los botones nativos informan su selección con `aria-pressed`; el SVG tiene título y descripción únicos mediante `useId`; la leyenda distingue las curvas por texto y trazo además de color. La gráfica se escala al ancho disponible y su pie declara su carácter esquemático.
- **Comprobación:** validar estado inicial, cambio a inferencia y regreso al entrenamiento; inspeccionar nombres accesibles, IDs al montar varias escenas y lectura en escritorio y móvil.

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
