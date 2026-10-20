---
id: s03-transit
status: draft
page: /sesiones/s03/
packet_id: S03-DE-UN-TRANSITO-A-LAS-METRICAS
---

# Geometría, señal y parámetros del tránsito

## Apertura de la presentación: detectar antes de nombrar

La pantalla 1.1 empieza con la pregunta «¿Qué observación vemos antes de nombrar su causa?» y define el fenómeno en una frase visible: un tránsito ocurre cuando un planeta pasa frente a su estrella y atenúa su luz. La animación enlaza la posición proyectada con el punto de la curva de flujo. La pantalla 1.2 conecta la geometría con el perfil fotométrico; bajo el modelo simple de una estrella uniforme y sin dilución, la profundidad se relaciona con la razón de radios como δ ≈ (Rp/R*)². La pantalla 1.3 deja esa exploración y presenta una serie temporal sintética con 481 mediciones, ruido y tres caídas similares separadas por unos ocho días. Una caída aislada admite varias explicaciones; la forma y la periodicidad orientan una hipótesis de tránsito que todavía debe contrastarse.

En 1.1, la proyección y la curva enlazadas ocupan el lado principal; la fase orbital se puede recorrer manualmente y con reproducción. En 1.2, los controles relacionan orientación, razón de radios y perfil estelar con el flujo. En 1.3, una gráfica amplia comparte el espacio con tres frases de interpretación y no tiene controles locales. La serie se identifica explícitamente como sintética; no representa una observación de Kepler ni una detección real. En móvil, el gráfico y la lectura se apilan en el mismo orden.

## Pregunta del lector

¿Qué cambia en nuestra hipótesis cuando una caída de luz aparece de nuevo con forma similar y a intervalos regulares?

## Objetivo de aprendizaje

Conectar la geometría de un tránsito con el flujo y explicar cómo la forma y la repetición temporal convierten una caída observada en una hipótesis que se debe contrastar.

## Estado inicial y fallback

- La escena 1.1 inicia en fase −0.22 y queda pausada; la escena 1.2 inicia en fase 0 y permite recorrer la órbita.
- La escena 1.3 inicia con una serie sintética fija de 481 puntos entre 0 y 24 días; tres eventos se centran en 3.2, 11.2 y 19.2 días. Su período ilustrativo queda fijo en ocho días.
- El gráfico SVG, su descripción accesible, el pie y la lectura lateral constituyen la experiencia completa de 1.3, con o sin JavaScript. No contiene controles locales.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Fase orbital | φ | −0.5…0.5 | −0.22 (1.1) / 0 (1.2) | ciclos | deslizador, teclado y reproducción/pausa orbital en 1.1; deslizador en 1.2 |
| Razón de radios | k = Rp/R* | 0.04…0.18 | 0.10 | adimensional | deslizador en 1.2 |
| Inclinación | i | 75…90 | 90 | grados | deslizador en 1.2; cambia la separación proyectada y los contactos |
| Semieje normalizado | A = a/R* | fijo = 8 | 8 | adimensional | valor didáctico documentado |
| Periodo de la serie 1.3 | P | fijo ≈ 8 | 8 | días | serie sintética estática; sin control |
| Perfil estelar | — | uniforme / lineal | uniforme | — | botón conmutador «Oscurecimiento al limbo» en 1.2 |
| Coeficiente lineal | u | fijo = 0.6 | 0.6 | adimensional | aplica cuando se activa oscurecimiento al limbo |

## Codificación visual

- Marcas y geometría: órbita circular; su proyección es una elipse de semieje mayor A y menor A cos(i), degenerada en línea para i = 90°. El planeta se dibuja con radio k; la estrella, con radio 1.
- La mitad orbital delantera es continua; la trasera es discontinua. La vista muestra el tránsito de frente: el observador está en +z y mira hacia −z, perpendicular al plano del cielo x–y. El símbolo × y ambos rótulos explicitan la convención. Un planeta detrás y proyectado sobre la estrella queda oculto y no se muestra delante del disco.
- Significado del color: dorado representa la estrella; al activar oscurecimiento al limbo, el mismo disco estelar se atenúa radialmente hacia el borde; turquesa representa la trayectoria delantera y la curva de flujo; azul verdoso representa el planeta opaco; línea discontinua y rótulo explican el tramo trasero. Rótulos y estilos de línea mantienen el significado sin depender del color.
- La curva de flujo usa el mismo φ de la proyección. Su punto móvil identifica la fase actual y no recalcula la curva completa en cada fotograma.
- En 1.3, 481 puntos sintéticos cubren 24 días. El ruido y una variación suave evitan presentar una señal ideal; tres ventanas verticales marcan caídas de forma parecida y una guía indica la separación ilustrativa P ≈ 8 días. Los puntos de cada caída usan el color de datos y las etiquetas numéricas señalan el orden, no una probabilidad de que sean planetas. El rótulo vertical «Flujo / mediana» tiene un margen propio antes de las marcas numéricas del eje Y; el pie se limita a «Ejemplo sintético.»
- En 1.1, la textura estelar es una ilustración generada con IA; el SVG mantiene radio, órbita, planeta, observador y textos exactos. La curva amplía el eje vertical y muestra sus límites numéricos para hacer visible la caída.
- La animación orbital completa dura 14 s por ciclo. Un botón reproduce o pausa el ciclo; el segundo reinicia y el deslizador permite detenerse en cualquier fase.

## Comportamiento

- Al cambiar φ, el planeta, el punto de la curva y el resumen comparten un estado. Si queda detrás y solapado en proyección, la estrella lo oculta y el flujo normalizado conserva F/F₀ = 1.
- Al cambiar k o i en 1.2, la geometría y la fotometría se recalculan. El deslizador de inclinación permite recorrer los tránsitos centrales, rasantes y las orientaciones sin tránsito.
- El perfil uniforme integra el área de solapamiento de dos círculos. El perfil lineal usa I(μ) = 1 − u(1 − μ) y una cuadratura radial de 256 anillos para la integración de intensidad.
- Al activar oscurecimiento al limbo, el disco de la proyección muestra intensidad radial más brillante en el centro y más débil en el borde: I/Ic = 1 en el centro y 1−u = 0,4 en el borde para u = 0,6. La curva de luz se recalcula con ese mismo perfil. No se añade una figura auxiliar de comparación.
- El parámetro de impacto b tiene una ayuda `?` junto a su ecuación: se define como la separación proyectada de los centros en conjunción, en radios estelares, y permite distinguir tránsito central, no central y rasante.
- En 1.3 no hay interacción local. Las mediciones representan un ejemplo construido determinísticamente; mover la diapositiva, su carril y los controles globales de navegación conserva el comportamiento común de S03.
- La tercera lectura de 1.3 mantiene su semántica de elemento de lista y contiene una nota accesible con el rol `note`, presentada como advertencia con borde e interior rojizos para destacar que la binaria eclipsante sigue siendo una explicación periódica alternativa.
- Reiniciar restaura el estado determinista de la escena. Pausar detiene la animación; «Reproducir» la continúa desde la fase actual.
- Con teclado, los botones se activan con Enter/Espacio y los deslizadores con flechas/Home/End; el foco permanece visible. Los valores y mensajes se exponen como texto accesible.
- En móvil, figura y lectura se apilan; el SVG escala al ancho disponible y mantiene una descripción accesible de la serie.
- Con `prefers-reduced-motion: reduce`, la animación inicia pausada; el deslizador sigue disponible y el botón permite iniciar el movimiento de forma explícita.
- Las escenas 1.1 y 1.2 mantienen sus controles actuales; 1.3 es estática para dedicar la atención a leer el patrón y sus límites.

## Texto alrededor de la figura

- Pie: la proyección fija el sentido de observación; continuo va delante, discontinuo va detrás; la curva representa flujo estelar normalizado.
- Qué observar: la caída existe cuando el planeta oscuro está delante y solapa el disco estelar. La profundidad uniforme de un tránsito completo es k², aunque sea no central; un tránsito rasante no alcanza esa geometría de contacto interior.
- Resumen de estado: indica fase, delante/detrás, F/F₀, b y clasificación central, completa/no rasante, rasante o sin tránsito.
- Misconcepción prevenida: la ocultación detrás de una estrella bloquea luz planetaria, pero un compañero oscuro no añade una segunda caída de luz estelar.
- Qué no demuestra: no representa una observación de Kepler ni confirma un planeta. El modelo supone órbita circular, esfera opaca, estrella aislada, sin dilución, contaminación, ruido ni muestreo observacional.
- La serie 1.3 es sintética, no un ajuste a una estrella ni un conjunto de datos observado. Su regularidad se ha construido para ilustrar una pregunta; la caída y la periodicidad no bastan para confirmar un planeta.

## Ejemplo trabajado y feedback

- Entrada para el modelo de 1.1–1.2: k = 0.10 significa que el radio planetario es el 10% del radio estelar; i = 90° y A = 8 sitúan la conjunción central.
- Geometría: b = A cos(i) = 8 cos(90°) = 0. Para una fuente uniforme, el área planetaria proyectada sobre el área estelar da ΔF ≈ k² = 0.10² = 0.01 = 1%.
- Repetición en 1.3: los centros sintéticos aparecen en 3.2, 11.2 y 19.2 días; 11.2 − 3.2 = 8.0 días y 19.2 − 11.2 = 8.0 días. El diseño fija ese patrón para practicar su lectura; no detecta periodicidad en datos reales.
- En la escena 1.2, control → selección → cambio → interpretación: mover i cambia b; el cruce de b = 1−k retira el intervalo T23; al alcanzar b ≥ 1+k desaparecen tránsito, duración y banda. El mismo control afecta la curva y la proyección.
- Recorrido: iniciar en la órbita pausada; comparar el flujo detrás; reproducir el ciclo y observar el punto entrar en el tránsito; mover el deslizador para detenerse en los contactos; en 1.2 variar i, k y el conmutador de oscurecimiento al limbo; en 1.3 distinguir la caída aislada del patrón repetido y proponer qué diagnóstico haría falta después.
- Alternativa sin JavaScript: esta ficha, el texto de supuestos y el dibujo inicial exponen las ecuaciones, unidades, interpretaciones y límites esenciales; no se depende de hover.

## Matriz de pruebas

- [ ] estado inicial de A, k, i, P, perfil y fase en las tres escenas;
- [ ] fronteras b = 0, b = 1−k, b = 1+k y clasificación completa/rasante/sin tránsito;
- [ ] el conmutador único activa y desactiva el oscurecimiento al limbo; el disco cambia a un gradiente radial (centro 1, borde 0,4 para u = 0,6) y la curva usa el mismo perfil;
- [ ] la serie 1.3 mantiene 481 puntos, tres ventanas/eventos, P ≈ 8 días, el pie «Ejemplo sintético.» y un rótulo Y separado de sus ticks;
- [ ] la advertencia sobre la binaria eclipsante se distingue visualmente y está expuesta como nota accesible;
- [ ] 1.3 no presenta deslizadores, botones ni ayudas locales; su descripción accesible distingue periodicidad de confirmación planetaria;
- [ ] controles reducidos, teclado, pausa, foco, reinicio y fase manual; en 1.2 no aparecen presets ni un resumen duplicado de los diagramas;
- [ ] pausa con movimiento reducido, resumen accesible, escritorio/móvil y revisión axe;
- [ ] perfiles SVG, lectura estática y regresión visual de las escenas significativas.
