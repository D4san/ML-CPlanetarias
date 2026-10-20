# S03 frente a S02 — revisión visual comparativa

Fecha: 2026-10-19–2026-10-20 (America/Bogota). Responsable: Codex integrador. Solicitud: comparar S02 con S03 y explicar la aplicación de la guía visual. Revisión inicial de las páginas locales y del sistema/guía de assets vigentes; seguida por la corrección descrita al final de este informe.

## Hallazgo inicial

La funcionalidad entregada tiene evidencia de pruebas; la coherencia visual con S02 requiere corrección. Compartir tokens y componentes no consiguió conservar su composición ni su forma de explicar. El cierre anterior dio demasiado peso a los gates técnicos y no exigió la comparación directa con S02. La corrección corresponde a la integración.

Se observaron dos pestañas temporales de comparación, sin modificar la pestaña del usuario: S02 clasificación y ganancia de información; S03 clasificación y precision. Ambas comparaciones temporales usan un viewport horizontal próximo a 1280×720; se contrastaron además las reglas de composición y los encargos del repositorio. Las pestañas de comparación se descartan al terminar.

| Aspecto | Referencia S02 | Hallazgo S03 |
| --- | --- | --- |
| Marco | Título, pregunta y etiqueta del curso estables; acciones compactas. | Encabezado reducido y parcialmente oculto en escritorio; más acciones compiten con el contenido. |
| Carril | Formas y tonos diferencian funciones y estaciones. | Todas las entradas declaran `tone: data`; se pierde parte de la semántica visual de modelo, decisión y límite. Se oculta también el caption común. |
| Escena | Clasificación parte de cuatro planetas, sus medidas y una acción que conduce al árbol. | Clasificación presenta cuatro cajas de términos. La señal TCE concreta y su cambio hasta la clase no están representados en esa escena. |
| Desarrollo matemático | Ganancia de información cuenta casos visibles y avanza por cuatro pasos, con cálculo y explicación conectados. | Precision combina una tabla con una lista de seis apartados. Las fracciones aparecen como código lineal; falta la construcción visual progresiva del denominador y del cociente. |
| Espacio y navegación | El grid reserva una fila para controles, separada del contenido desplazable. | La página crece y el footer fijo puede cubrir el contenido en el primer encuadre. Hace falta desplazarse para recuperar interpretaciones y pies. |
| Imágenes | Los planetas se relacionan con valores, selección y recorrido de clasificación. | Las tres ilustraciones son escenas rectangulares con pie. Su integración con curvas, diagnóstico y acción del estudiante es limitada. |

## Aplicación real de las guías

Se consultaron `docs/protocols/VISUAL_SYSTEM.md`, `docs/guides/VISUAL_ASSET_GUIDE.md` y la skill `mlcp-visual-assets`. Se cumplieron decisiones de medio: ImageGen para tres ilustraciones cualitativas; SVG/HTML para geometría y etiquetas exactas; datos reproducibles para la observación; pies, alt y procedencia diferenciados.

El brief `docs/guides/s03-illustrations.md` declara una familia nueva de ilustración astronómica realista, motivada por la petición de imágenes «muy reales». Esa decisión permite conservar realismo y exactitud de las etiquetas, pero no sustituye la referencia de composición de S02. S02 también utiliza objetos realistas; la coherencia requiere conectarlos con datos y acciones. La familia por defecto de la guía es editorial line-art; esa excepción se documentó, pero la composición común quedó aplicada parcialmente.

La guía exige comprender la relación principal dentro del primer cuadro 16:9, mantener el marco exterior común, usar color semántico y ligar la figura a una relación o acción. Estas son las brechas principales. Las pruebas de accesibilidad y la ausencia de desbordamiento horizontal no acreditan esa fidelidad visual.

## Corrección aplicada

Se ajustó el marco de S03 para conservar el título y la pregunta, el carril con etiquetas semánticas y la fila de navegación de la presentación. En escritorio, el área de estaciones recorta las tarjetas inactivas sin desplazar su ventana; esto evita que al elegir una estación avanzada desaparezca el contenido activo. El contenido científico queda en un área desplazable propia cuando una escena supera la altura disponible.

La pantalla 1.1 abre con una definición directa del tránsito, muestra planeta y curva con una fase compartida e introduce repetición → período y profundidad → razón de radios bajo sus supuestos. En 1.2, los rótulos distinguen visualmente MODELO de SEÑAL. La tarea de clasificación 4.1 ahora recorre la curva repetida TCE A, sus vistas, el puntaje CNN y el umbral hasta una predicción PC, con referencia de catálogo fija y la advertencia de que la escena es conceptual. La explicación de precision usa una matriz independiente con los ejemplos PC-01 y NEG-01, cambia los conteos TP/FP y construye TP/(TP+FP) paso a paso; la pantalla de matriz completa conserva los 20 ejemplos.

Las ilustraciones realistas generadas se mantienen como representación conceptual y acompañan diagramas diagnósticos exactos en SVG. Los recursos del artículo permanecen enlazados con atribución hasta resolver sus derechos de redistribución. Esta decisión preserva el realismo solicitado y conecta cada escena con una señal o diagnóstico legible.

## Revisión posterior

Tras el build final de `/preview`, la inspección en navegador a 1280×720 confirmó que el marco, el carril, la estación, la escena y la fila de navegación coexisten como en S02. Las pantallas 1.1, 1.2, 1.3, 4.1 y 7.3 quedan completas en el primer cuadro, sin desplazamiento interno; 1.1 mide 245 px y las otras cuatro, 266 px. El documento conserva una altura de 720 px.

La pantalla 1.1 define el tránsito y sincroniza la posición proyectada con el flujo; 1.2 mantiene modelo, señal, controles y estado, incluso en el preset sin tránsito (`b = 1.20 R*`, `F/F₀ = 1.000`, `ΔF = 0.00 %`). La pantalla 1.3 presenta una serie fotométrica sintética con 481 mediciones en 24 días y tres caídas parecidas separadas por `P ≈ 8 días`, sin controles locales. En 4.1, la TCE ficticia conecta curva, vistas, puntaje, umbral y referencia fija. En 7.3, la matriz PC-01/NEG-01 conecta los conteos con `TP/(TP+FP)` y su interpretación en cuatro pasos. Los controles de 1.2 y de las estaciones de evaluación se probaron: `i`/perfil cambian la geometría y el flujo; al subir `τ` a 0.95, la TCE cambia de TP a FN y su referencia PC permanece fija; mover PC-01 cambia los conteos y la explicación y permite volver al estado inicial.

En móvil, las pantallas 1.1, 4.1 y 7.3 se probaron a 390×844. Documento y cuerpo midieron 390 px de ancho, sin desbordamiento horizontal; los paneles se apilan en flujo vertical. La comparación con S02 continúa guiando jerarquía, secuencia y densidad. Las ilustraciones conceptuales conservan la familia realista solicitada y se conectan con diagramas SVG exactos; los recursos del artículo siguen enlazados con atribución hasta resolver sus derechos.

La última ejecución de `npm run check` pasó formato, lint, Astro (0 errores, 0 advertencias y 0 hints) y validadores de contenido, ejemplos y skills. `npm run build:subpath` generó 10 páginas en `/preview`. Dos suites afectadas —`S03ScienceScenes` y `S03EvaluationScenes`— pasaron 41 pruebas con `TEMP/TMP` dentro de `node_modules`. La repetición completa de `npm run test:unit` no se completó: con el temporal del sistema Vitest dio `EPERM` al renombrar directorios; al reubicarlo en `node_modules`, la corrida quedó sin progreso por más de dos minutos y se interrumpió. Se conserva como evidencia previa el pase 190/190 registrado en [I05](I05.md), sin presentarlo como una repetición de este cierre. Goldens Linux y aceptación editorial siguen pendientes.

Esta revisión no modifica la dirección visual canónica, los datos, el alcance aprobado ni la validez de las comprobaciones técnicas ya ejecutadas. Es una devolución de composición y didáctica visual para la siguiente revisión de I05.

## Devolución de portada y ajuste final

Fecha: 2026-10-20. El usuario pidió quitar la instrucción para usar Anterior/Siguiente, mejorar la secuencia visual de la portada y reducir el crédito de la imagen a una identificación directa de IA.

La portada elimina la instrucción de navegación. Los cuatro hitos ahora aparecen como una ruta numerada con nodos conectados en escritorio; en móvil se ordenan en una columna, con los nombres completos y una conexión vertical. El pie queda como «Ilustración generada con IA.»

La inspección en navegador confirmó la composición a 1074×884 y la secuencia móvil a 390×844; el documento permanece en 390 px de ancho sin desbordamiento horizontal. La prueba completa de `S03LearningJourney` pasó 4/4 con Vitest y cobertura desactivada para el pase aislado. Tras el ajuste móvil, `npm run check` pasó formato, lint, Astro (0 errores, 0 advertencias, 0 hints) y validadores; `npm run build:subpath` generó 10 páginas.

La devolución de portada queda aplicada; I05 continúa entregada para revisión usuario/tutor. No se modificó el vault ni se hizo commit, push o despliegue.

## Encabezado superior plegable

Fecha: 2026-10-20. El usuario señaló que el encabezado de sesión y el carril ocupaban demasiada altura en Presentación y propuso conservar visibles el título, el número de diapositiva y un control para desplegar.

La vista cerrada ahora muestra «De un tránsito a las métricas», la posición actual `n / 33` y un disclosure. Al abrirlo reaparecen la pregunta, los modos Presentación/Lectura/Actividades, Referencias, Modo docente, Sesiones y el carril completo. El título del contenido y el pie con Anterior/Siguiente siguen a la vista; Lectura y Actividades conservan el encabezado desplegado.

La comprobación manual de la vista previa S03 en el navegador confirmó ambos estados y el cambio de posición de la escena: el resumen compacto queda en una sola franja y el carril completo vuelve al desplegar. La adaptación estrecha conserva título y contador y reduce el disclosure a un control con chevrón; no se capturó una vista móvil en este pase. `npm run build:subpath` generó las 10 páginas. El build informó que las colecciones editoriales vacías no contienen aún archivos Markdown/MDX. La revisión de formato de los archivos modificados pasó. No se ejecutaron suites de prueba.

I05 sigue entregada para revisión editorial; este ajuste no cambia la aceptación pendiente, los derechos de figuras ni el estado de goldens Linux. Sin cambios en el vault, commit, push o publicación.

## Corrección editorial de la estación 2.1

Fecha: 2026-10-20. El usuario pidió integrar el contenido de «Datos de Kepler» en el texto principal y retirar una cautela sobre el total histórico.

El texto de apertura ahora explica que Kepler midió repetidamente el brillo de miles de estrellas y que el archivo reúne series de flujo, tiempo, incertidumbre y calidad, además de productos fotométricos procesados. La ayuda «Datos de Kepler» ya no aparece en esta estación; permanece «Cadencia y flujo». Se quitó la nota de cautela debajo de los indicadores de población.

Revisión manual en `/preview/sesiones/s03/#s03-mission-1` a 1299 × 882: el texto ocupa dos líneas, los controles de etapa y la imagen caben con los indicadores y enlaces en el marco de la diapositiva. El árbol de accesibilidad confirma una sola ayuda contextual en 2.1 y ninguna nota sobre el total histórico.

`npx prettier --check` pasó en los archivos modificados. `npm run build:subpath` terminó y generó 10 páginas; Astro mantiene avisos porque las colecciones de sesiones, conceptos y ejercicios están vacías. No se ejecutaron pruebas automatizadas.
## Ajustes de lectura en 1.3

A partir de tres comentarios del usuario, el pie de la serie se reduce a «Ejemplo sintético.», el eje Y obtiene un margen más claro frente a sus marcas y la tercera lectura aparece dentro de un cuadro rojo rotulado «Advertencia · hipótesis por contrastar». Se conserva como nota accesible y como tercer elemento de la lista.

La revisión manual de `/preview/sesiones/s03/#s03-transit-3` a 1299×884 confirma que el rótulo queda separado de los ticks y que el warning se distingue sin ocultar su texto. `S03Transit.test.tsx` pasó 9/9; `npm run check` pasó y `npm run build:subpath` generó 10 páginas. La suite E2E y la inspección móvil no se ejecutaron en esta corrección.

## Flujo de los píxeles a la curva (2.2)

Fecha: 2026-10-20. Se rehízo `De los píxeles al flujo` a partir del comentario del usuario.

La vista presenta un halo estelar difuminado detrás de una retícula de 5 × 5 celdas. Cada celda se identifica con `F₁`–`F₂₅` y el pie define `Fᵢ(t)` por cadencia. La etapa Apertura delinea nueve celdas contiguas en ámbar; Suma SAP atenúa las demás, presenta `F_SAP(t) = Σᵢ∈A Fᵢ(t)` y relaciona la suma con una curva de luz. La apertura vecina, SAP y PDCSAP reciben una explicación breve. No aparece TPF, Target Pixel File ni el disclaimer que se retiró. En la zona del encabezado queda visible el número 2.2; la viñeta pequeña de tránsito desaparece de las diapositivas.

La revisión visual de `/preview/sesiones/s03/#s03-mission-2` a 1299 × 884 confirma que el estado inicial, la apertura, la ecuación y la curva caben con el pie, las fuentes y la navegación. El halo conserva transparencia real y se distingue sobre fondos oscuro y claro. A 390 × 844, el documento mide 390 px de ancho y la diapositiva 332 px; no hay desbordamiento horizontal y el contenido se desplaza verticalmente. El árbol accesible confirma los tres botones con estado, la descripción de la retícula y curva, una sola ayuda «Cadencia y flujo» y ausencia del hilo visual.

`npx prettier --write` en los archivos de esta revisión terminó sin errores. `npm run build:subpath` generó 10 páginas; Astro informa que las colecciones de sesiones, conceptos y ejercicios están vacías. No se ejecutaron pruebas automatizadas.

I05 continúa entregada para revisión editorial; esta modificación no cambia la autorización de publicación ni los derechos de las figuras del artículo. No se modificó el vault ni se hizo commit, push o despliegue.

## Revisión de movimiento y apertura en 3.3

La ilustración de dos destellos se reemplazó por dos vistas de la misma estrella en `t₀` y `t₁`. La retícula de 5 × 5 y el contorno de la apertura `A` conservan idéntica posición; el halo cambia de lugar. La gráfica alinea la caída del flujo sumado con el desplazamiento del centroide y define centroide en el propio panel. Se retiró la frase visible sobre escala y procedencia y el raster anterior salió del manifiesto público.

En `/preview/sesiones/s03/#s03-lookalikes-3`, la inspección a 1299 × 884 confirmó que ambas vistas, el gráfico, la explicación, las fuentes y la navegación caben en el primer cuadro. El árbol accesible identifica la secuencia como la misma estrella en dos momentos y describe los cambios del flujo y del centroide. A 390 × 844, el documento mide 390 px y la diapositiva 332 px de ancho, sin desbordamiento horizontal; los dos momentos se apilan y el gráfico queda debajo, dentro del desplazamiento vertical.

`npx prettier --write` pasó en los archivos de código de esta revisión; `npm run validate:content` reportó contenido válido con dos avisos previos sobre metadatos auxiliares del inbox; `npm run check:astro` terminó con 0 errores, advertencias ni hints; `npm run build:subpath` generó 10 páginas. Astro conserva avisos porque las colecciones de sesiones, conceptos y ejercicios están vacías. No se ejecutaron pruebas automatizadas en este pase.

I05 sigue entregada para revisión editorial. Sin cambios en el vault, commit, push o publicación.

## Revisión visual de la animación de binarias eclipsantes (3.2) — 2026-10-20

En `/preview/sesiones/s03/#s03-lookalikes-2`, a 1299 × 884, se revisaron la órbita de canto, el baricentro, la proyección en la apertura del telescopio y el gráfico sincronizado. Las curvas muestran el eclipse primario más profundo que el secundario; el aporte de la fuente vecina reduce la profundidad de ambos. El marcador sigue la fase y el control único pausa/reanuda la animación. Las vistas se presentan juntas en escritorio; la hoja de estilos las apila bajo 49 rem.

La suite unitaria pasó 195/195 y el build de `/preview` terminó. El E2E de Playwright quedó sin ejecutar porque el entorno denegó la conexión local al servidor. Esta inspección fue manual; no se afirma una validación E2E o automatizada de accesibilidad.

## Clases y entrenamiento del clasificador (4.1–4.2) — 2026-10-20

La 4.1 presenta dos series de puntos independientes: descensos repetidos con la clase «Tránsito» y fluctuaciones sin ese patrón con «No tránsito». La 4.2 conserva una función propia: muestra qué ocurre con una señal etiquetada durante el entrenamiento y con una señal nueva durante la inferencia. El estado de entrenamiento conecta etiqueta de catálogo → puntaje para PC → ajuste de parámetros. El estado de inferencia conecta señal sin etiqueta → puntaje del modelo entrenado → comparación con el umbral y predicción. La etiqueta de catálogo se consulta después para evaluar.

En `/preview/sesiones/s03/#s03-classification-2`, la revisión a 1299 × 884 confirmó que las tres etapas, la frase de resultado, las fuentes y la navegación caben sin superponerse. Se revisaron los dos estados del selector. A 390 × 844, el documento mide 390 px y la diapositiva 332 px; las tres etapas se apilan y el documento conserva 390 px de ancho, sin desbordamiento horizontal.

`npx prettier --check` pasó en los archivos editados; `npm run validate:content` reportó contenido válido con dos avisos previos de metadatos auxiliares; `npm run check:astro` pasó con 0 errores, advertencias ni hints; `npm run build:subpath` generó 10 páginas. Astro mantiene avisos porque las colecciones públicas de sesiones, conceptos y ejercicios están vacías. Se actualizó la aserción existente de la interacción; no se ejecutaron pruebas automatizadas.

I05 continúa entregada para revisión editorial. Sin cambios en el vault, commit, push o publicación.

## S03 4.3 — etiquetas de catálogo y error del clasificador

Fecha: 2026-10-20. La apertura sitúa la tarea en el artículo de Shallue y Vanderburg: el catálogo aporta las referencias PC, AFP y NTP; el modelo aprende a agruparlas como planeta o falso positivo. La interacción distingue TCE como evento detectado, PC/AFP/NTP como referencias del catálogo y FP como error de predicción. Cada término presenta su nombre desarrollado, explicación, pie e ilustración propia. En FP, la secuencia explícita «AFP o NTP · no planeta → Planeta → FP · falso positivo» evita confundir la etiqueta AFP con el error del clasificador.

Las cinco ilustraciones mantienen la familia astronómica realista de S03 y el formato 16:9. En la vista previa se revisaron a 1299×884; TCE, PC, AFP, NTP y FP también se seleccionaron a 390×844. La tarjeta se apila en móvil, las imágenes permanecen completas y el texto, el pie y las fuentes se alcanzan mediante desplazamiento vertical. En FP, las tres etapas pasan a una columna y conservan el orden. No se observó desbordamiento horizontal.

La composición de NTP se revisó además a 1024×768, 1440×900 y 1920×1080. La imagen y su explicación se mantienen en paralelo, con la navegación inferior visible. FP se revisó a 1024×768 y 1920×1080: las etapas quedan en fila y sus etiquetas se leen dentro de cada tarjeta. En el ancho de 1024 px, los textos se distribuyen en varias líneas sin superponerse.

El manifiesto fuente y el JSON reflejan los tamaños realmente inspeccionados por recurso. `npm run check` pasó con 0 errores, advertencias ni hints de Astro; el validador conserva dos avisos de metadatos auxiliares existentes en el inbox. `npm run build:subpath` generó las 10 páginas y dejó los avisos existentes por colecciones públicas vacías. No se ejecutaron pruebas automatizadas. La aceptación editorial y los goldens Linux permanecen pendientes.

I05 continúa entregada para revisión editorial; no se modificó el vault ni se hizo commit, push o publicación.

## Claridad de las etiquetas de catálogo en 4.2 — 2026-10-20

La pantalla ahora abre con los autores, el año y el trabajo de clasificación de señales de Kepler. La banda resume el origen y tamaño del conjunto; tres tarjetas desarrollan PC, AFP y NTP con sus nombres en inglés, traducción, conteo y significado astronómico. En una línea queda explícito que PC es positiva y AFP/NTP son negativas. La composición se inspeccionó a 1299 × 884 en entrenamiento e inferencia; en ambos estados el contexto, las definiciones, el flujo y la fuente permanecen legibles. El contenido puede desplazarse verticalmente dentro de la diapositiva.

La prueba unitaria completa pasó 196/196 y `npm run build:subpath` generó 10 páginas. No se inspeccionó móvil en esta revisión.
