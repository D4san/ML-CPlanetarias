---
packet: S01-ML-IA-metodos-estadisticos
kind: interaction-spec
status: drafting
visibility: internal
publish_ready: false
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion narrativo para impartir la sesión
source_refs:
  - Géron, cap. 1
  - Géron, cap. 2
  - Kelleher, caps. 1–2
rights:
  status: original
  note: Los gráficos, tarjetas y ejemplos son una síntesis didáctica interna; requieren revisión antes de cualquier publicación.
---

# S01 · Señal, dominio y generalización

## Promesa

La interfaz conserva la cadena del guion: la señal disponible decide el paradigma; la naturaleza de
los datos puede cambiar el dominio; la comparación entre ajuste y datos no vistos limita la afirmación.

## Tarjetas de paradigma

La parada **Señal y paradigma** mantiene el reto de identificar la señal para la ruta astronómica
activa. El mapa formula la decisión como una secuencia: `qué buscamos → qué tenemos → cómo
aprendemos`. Los tres cajones que salen de la pregunta son controles nativos; al hacer clic en uno,
se abre su tarjeta de definición delante del recorrido. Así la interacción pertenece al mapa y no
aparece como un bloque paralelo desconectado.

| Paradigma | Señal formal | Ejemplo astronómico |
| --- | --- | --- |
| Supervisado | `D = {(xᵢ, yᵢ)}ᵢ₌₁ⁿ` | abundancia o clase de referencia por instancia |
| No supervisado | `zᵢ = hθ(xᵢ)` | familias o rarezas en un catálogo sin etiquetas |
| Por refuerzo | `(sₜ, aₜ, rₜ, sₜ₊₁)` | siguiente observación con consecuencias y recompensa |

La tarjeta muestra primero la pregunta que orienta el paradigma. Al voltearla, entrega una
definición formal, el ejemplo y el alcance. La elección del paradigma sigue dependiendo de la señal,
no de usar una red neuronal. El reto inferior pide anticipar la ruta para el caso astronómico antes
de revelar la respuesta; los cajones del mapa quedan disponibles para consultar el concepto después.

## Mapa conceptual

La vista de panorama usa `@xyflow/react` para dibujar la cadena `pregunta → instancia → señal → tarea
→ familia → dominio → evidencia` y las tres ramas de señal. En la subslide de paradigmas, el mapa
se construye con tres capas accionables: pregunta, información disponible y rutas de aprendizaje.
Los nodos principales son controles de teclado que devuelven a la parada correspondiente. El mapa no
reemplaza el hilo de siete paradas: la lista de respaldo permanece visible para lectura lineal,
lectores de pantalla y pantallas pequeñas.

Estado determinista: la construcción inicia en `0/3` capas y no comienza con una animación automática.
`Construir siguiente capa`, los tres botones de capa y `Ver mapa completo` revelan la continuidad
pregunta → información → paradigmas. Los nodos no se arrastran ni se conectan; permanecen consultables
como controles, mientras la tercera capa los resalta y permite abrirlos con clic, Enter o barra
espaciadora. El mapa permite desplazarse horizontalmente en pantallas estrechas.

## Dominio: sintético frente a observado

La parada **Datos y dominio** presenta una señal latente discontinua y dos series de puntos:

- **Sintético:** simulación con parámetros conocidos, muestreo regular y cobertura completa.
- **Observado:** medición con barras de error, ruido, selección, respuesta del detector y una región
  de cobertura faltante.

Los botones resaltan una serie y su definición, pero dejan visible la comparación. El gráfico no
representa un espectro real ni una distribución científica; es un esquema para preguntar si la
distribución de entrenamiento representa el uso.

## Generalización, subajuste y sobreajuste

La parada **Evidencia y límites** usa tres estados de capacidad:

| Estado visible | Lectura | Riesgo que se discute |
| --- | --- | --- |
| Subajuste | La curva es demasiado rígida | pierde señal y falla incluso en ajuste |
| Ajuste útil | recoge la señal sin perseguir cada fluctuación | debe comprobarse en datos no vistos |
| Sobreajuste | memoriza ruido de los ejemplos de ajuste | empeora al cambiar de objeto o dominio |

Los puntos de ajuste son turquesa y los datos no vistos, naranja; ambos llevan barras de error. La
línea base conserva una comparación mínima. El reto final pide elegir la afirmación defendible:
superar la línea base en estas condiciones y en objetos no vistos. Una predicción no demuestra por sí
sola un mecanismo físico ni validez universal.

## Accesibilidad y límites

- Las tarjetas son botones nativos, revelan la definición solo después de voltear y restauran el foco.
- Los gráficos tienen título y descripción; las listas y textos repiten la distinción semántica.
- La construcción guiada expone su capa actual en un resumen `aria-live`, permite saltar a una capa,
  mostrar el mapa completo y reiniciar sin depender de la animación.
- El mapa tiene un respaldo de paradas; los controles de React Flow no son necesarios para seguir la
  narración.
- Las figuras son originales y esquemáticas. No contienen resultados observacionales ni sustituyen
  datos, métricas o validación.

## Matriz de pruebas

- [ ] los tres cajones del mapa abren, voltean, cierran y restauran foco en sus tarjetas de paradigma;
- [ ] la construcción guiada revela las tres capas, permite mostrar todo y reiniciar;
- [ ] el mapa muestra la cadena, las tres ramas y la lista de paradas;
- [ ] sintético/observado cambia el énfasis sin ocultar la explicación;
- [ ] el gráfico de dominio muestra puntos, barras de error y cobertura faltante;
- [ ] los tres estados de capacidad cambian curva y texto de generalización;
- [ ] axe, movimiento reducido, proyección 1920×1080, móvil y subruta pasan.
