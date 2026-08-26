---
packet: S01-ML-IA-metodos-estadisticos
artifact: src/pages/sistema/index.astro
vault_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
vault_heading: Guion narrativo para impartir la sesión
kind: observation
status: open
---

## Corrección de fidelidad solicitada

La parada 2 se revisó contra el ciclo mínimo del guion. La interfaz distingue instancia,
observación, representación `x_i`, objetivo `y_i` o señal disponible, modelo `h_θ` y salida. Las
fórmulas ahora cambian entre la ruta supervisada, el catálogo sin etiquetas y el seguimiento por
refuerzo; todos esos conceptos abren tarjetas de anticipación y definición. El panel lateral se
reescribió como una secuencia de cuatro decisiones para permitir el paso posterior al contenido
completo del Markdown sin aplanar sus distinciones.

## Decisión de ritmo editorial

Se retira el `Modo tutor`: su capa duplicaba información y no respondía al uso real de la página.
S01 pasa a ofrecer dos vistas del mismo contenido y del mismo estado interactivo. `Presentación`
conserva las siete paradas para proyección y conversación; `Lectura` las despliega como artículo
continuo, con pregunta guía, interpretación, ejemplo y misconcepción alrededor de cada figura.
La decisión sigue el patrón de artículo explicativo usado para transformar notas de clase en una
página web, sin promover el paquete interno ni cargar `inbox/` durante el build.

## Decisión de continuidad en la primera parada

La primera parada se ordena como una secuencia pública de dos niveles. Primero pregunta `¿Qué
podemos hacer con una observación?` y presenta cinco verbos de salida. Después pregunta `¿Qué aporta
cada disciplina?` y presenta IA, estadística y ML como lentes disciplinares; cada lente declara su
propia pregunta de trabajo antes de la definición. El panel lateral elimina los
rótulos internos `Pregunta del guion` y `Qué debe quedar`: el desplegable ofrece directamente una
respuesta orientadora y el ejemplo identifica la ruta activa.

## Decisión de proyección

El modo `Presentación` se trata como una superficie horizontal de clase. En 1080p aumenta la escala
del texto esencial, los controles y las etiquetas de las figuras; los metadatos instrumentales
conservan jerarquía sin caer en tamaños difíciles de leer a distancia. Desde 1280 px, figura y foco
permanecen en paralelo y la superficie ocupa al menos el 95% del viewport, con un borde de seguridad
pequeño. La primera parada distribuye además el mapa de verbos y las lentes en dos columnas internas
para reducir el recorrido vertical. El modo `Lectura` conserva su composición editorial centrada.

## Decisión narrativa

Las siete paradas usan la misma secuencia: `la ruta llega aquí → pregunta → transformación →
conclusión → ejemplo activo → esto nos lleva a`. Esta estructura conecta el gráfico, la interacción
y el panel de foco, y también ordena el modo `Lectura`. La redacción se mantiene clara, sencilla y
seria; cada término formal aparece dentro de una decisión del recorrido y no como una caja aislada.

# Observación del prototipo interno de S01

Por decisión de diseño, `/sistema/` es la propia forma visual de la sesión 1. La ruta dejó de
funcionar como muestrario separado de tokens y controles; abre directamente el recorrido. La
envoltura visible se redujo al instrumento y una nota de procedencia plegada.

La sesión aparece además en `/sesiones/` como `S01 · en desarrollo`, enlazada al recorrido y con su
estado interno explícito. En la primera parada, la pregunta científica gana jerarquía; los cinco
usos abren tarjetas que solo revelan su definición al voltearse, y las lentes IA, estadística y ML
usan definiciones de trabajo formalizadas.

El guion actualizado se condensó en un laboratorio web `noindex` de siete paradas:

```text
pregunta y uso → instancia y representación → señal y paradigma
→ tarea y salida → familia y aprendizaje → datos y dominio
→ evidencia y límites
```

La transferencia docente funciona como una capa transversal. En cada parada muestra pregunta,
respuesta esperada, error frecuente y reparación. El cierre conserva el arco de evaluación hacia la
pregunta, los datos y el uso previsto.

El prototipo incorporó como gráficos e interacciones originales:

- cinco usos posibles de una observación y tres lentes de trabajo;
- el ciclo instancia → observación → representación → señal → modelo → salida, con notación
  específica para supervisado, no supervisado y refuerzo;
- predicción de la señal para espectro, catálogo o seguimiento telescópico;
- reparación de los niveles señal, tarea y familia;
- comparación entre reglas explícitas y ajuste desde ejemplos;
- microreto de `3³ = 27` reglas compatibles con combinaciones no observadas;
- transformación de espectro sintético a observado;
- comparación de capacidad, línea base, datos no vistos y afirmaciones permitidas.

La experiencia usa tres rutas: espectro → abundancia, catálogo → estructura/anomalía y telescopio →
seguimiento. Ninguna ruta recomienda automáticamente un algoritmo ni representa un resultado
científico.

Antes de una promoción pública conviene probar si las siete paradas conservan el ritmo de 60–90
minutos, revisar la formulación de IA y estadística con bibliografía específica y completar derechos
y atomización del glosario.

## Auditoría conceptual y procedencia adicional

Se volvió a leer la nota canónica de Obsidian `01 Sesiones/S01 - ML, IA y métodos estadísticos.md`,
su digest de fuentes y el paquete `inbox/sessions/S01-ML-IA-metodos-estadisticos`. La interfaz conserva
la distinción del guion entre pregunta/salida, instancia/representación, señal/paradigma,
tarea/familia y evaluación/límites.

La revisión de definiciones hizo estos ajustes:

- `predecir` ahora significa asignar una salida a una instancia nueva o a un objetivo todavía no
  disponible; no implica necesariamente futuro;
- `describir` se formula como resumen y exploración de distribución, variabilidad y estructura,
  sin exigir ausencia de etiquetas;
- `estimar` explicita cantidad o relación, incertidumbre y supuestos;
- `decidir` explicita acción, recomendación y criterio de utilidad, pérdida o costo;
- `generar` explicita muestras o reconstrucciones condicionadas y advierte que plausibilidad no
  equivale a evidencia física;
- `objetivo`, `señal`, `modelo` y `salida` distinguen, respectivamente, etiqueta disponible,
  información que guía el ajuste, función/regla/representación ajustada y resultado con alcance;
- `política` dejó de aparecer como tarea: en seguimiento es la regla que selecciona una acción;
- `sin objetivo por instancia` reemplaza `sin objetivo` para no sugerir que el aprendizaje no
  supervisado carece de criterio o señal.

La lente de IA se alinea como síntesis de trabajo con la definición de sistema de IA del NIST
(objetivos definidos por personas y salidas como predicciones, recomendaciones o decisiones);
la lente estadística incorpora recoger, describir y analizar datos, variabilidad, incertidumbre y
evidencia; la lente ML conserva la formulación E–T–P de Mitchell y del guion. Estas fuentes externas
se usan para revisión conceptual, no se copian como texto de autor en la interfaz.

El bloque formal de la parada 2 también se reescribió: además de la ecuación completa, muestra en
paralelo `Ajuste` y `Uso`, para hacer visible que los pares o experiencias construyen la relación y
que una instancia nueva recibe una salida estimada.

## Corrección de tarjetas según viewport

La tarjeta de definiciones podía perder texto cuando la proporción de la ventana era baja: las
caras rotadas vivían dentro de una escena animada, tenían una altura fija y el botón quedaba sobre
el ejemplo. La implementación ahora monta el diálogo en `document.body`, separa cierre, contenido y
acción, deja que la etapa crezca con la cara más larga y permite desplazamiento vertical del
overlay. La prueba funcional cubre una ventana móvil de 390 × 480 px y verifica que el ejemplo y
el botón permanecen alcanzables.

## Rama alterna de actividades

La ruta principal conserva el flujo narrativo de siete paradas y ahora ofrece una tercera vista
independiente, `Actividades`, junto a `Presentación` y `Lectura`. La rama reúne cinco retos breves
del guion: reglas frente a aprendizaje desde curvas etiquetadas, señal disponible, nivel de
clasificación, afirmación defendible y transferencia ante cambio de instrumento. Cada reto tiene
retroalimentación inmediata, progreso propio y un enlace de regreso a la parada conceptual
correspondiente; no sustituye la explicación ni se presenta como evaluación científica.

La ilustración `public/images/s01/reglas-aprendizaje.png` fue generada para esta rama con una curva
de luz que se divide en una ruta de umbrales explícitos y otra de ejemplos que llega a un modelo
ajustado. Se conserva como apoyo interno, sin texto legible ni afirmación observacional específica.
La ficha completa de la interacción quedó en `docs/specs/interactions/s01-activities.md`, pendiente
de revisión de derechos antes de cualquier promoción pública.

## Tarjetas para cada salida de la parada Tarea

La figura `De la señal a la tarea` ahora permite abrir las seis salidas —regresión, clasificación,
clustering, anomalía, decisión y generación— como tarjetas de definición. Cada tarjeta conserva la
pregunta que guía la tarea, una definición de trabajo, un ejemplo astronómico y el límite de la
afirmación. La caja de la salida permanece en el mapa y usa foco, teclado, `Escape` y restauración
de foco; la definición aparece después de pulsar `Voltear`.

La ficha de interacción está en `docs/specs/interactions/s01-task-output-cards.md`. El contenido es
una síntesis interna basada en el paquete S01 y queda pendiente de revisión antes de promoción.

## Señal, mapa conceptual, dominio y generalización

La parada `Señal y paradigma` ahora conserva el reto de identificar la señal y añade tres tarjetas
formales para supervisado, no supervisado y por refuerzo. Cada tarjeta distingue la señal disponible,
la notación mínima, un ejemplo astronómico y el alcance de la definición.

El panorama general usa `@xyflow/react` para presentar la cadena `pregunta → instancia → señal → tarea
→ familia → dominio → evidencia`, con ramas visibles para los tres paradigmas. La lista de paradas
permanece como respaldo accesible y para la lectura lineal; los nodos principales abren la parada
correspondiente y no permiten editar la topología durante la presentación.

La parada `Familia` se reorganizó alrededor de una muestra finita: cinco casos conocidos, tres casos
ocultos y tres clases posibles por caso, de modo que `3 × 3 × 3 = 27` completaciones siguen siendo
compatibles. La figura acompaña el reto y conecta la comparación reglas explícitas frente a aprendizaje
desde ejemplos con la decisión de familia y sesgo inductivo.

La parada `Datos y dominio` sustituye las líneas ambiguas por puntos sintéticos y observados, barras de
error, señal latente y una región de cobertura faltante. La parada `Evidencia` usa puntos de ajuste y
datos no vistos para explicar subajuste, ajuste útil y sobreajuste antes de pedir una afirmación
defendible. Los gráficos son esquemas originales: no representan datos observacionales ni resultados
científicos.

La ficha completa de esta revisión está en
`docs/specs/interactions/s01-paradigm-domain-evidence.md`; el paquete S01 sigue `drafting`, `internal`
y `publish_ready: false`.

## Árbol de tareas y sesgo inductivo

La parada `Tarea y salida` dejó de mezclar el árbol principal con un ejercicio de clasificación de
términos. Ahora la figura conserva una secuencia legible `entrada → salida/tarea → familias y
ejemplos de algoritmos`: regresión, clasificación, clustering, anomalía, decisión y generación.
Cada rama muestra algunas familias —lineales, árboles, vecinos, densidad, políticas o modelos
latentes— como ejemplos comparables, no como un catálogo exhaustivo ni como una selección automática.
El panel lateral explica por separado `señal`, `tarea` y `familia`, y mantiene visible la ruta
astronómica activa. La interacción de tarjetas de definición sigue disponible al abrir una tarea.

El reto de ordenar `señal/tarea/familia` pasa a la vista `Actividades`, donde el árbol sirve de apoyo
antes de elegir la respuesta. Así el modo presentación desarrolla la idea y la rama alterna permite
ensayarla sin interrumpir la narración.

La interacción de `Familia y aprendizaje` se reorientó al sesgo inductivo. Además de los casos A, B y
C, la figura introduce un objeto híbrido A+B: una familia cerrada lo fuerza a una categoría existente,
mientras una familia abierta puede conservar una clase híbrida o abstenerse. La elección correcta
explicita que aumentar la complejidad no recupera una categoría excluida por el espacio de salidas.
La cuenta `3 × 3 × 3 = 27` quedó como desarrollo secundario para mostrar ambigüedad de una muestra
finita; el reto visible pregunta qué hipótesis deja abierta cada familia.

La ficha de estas decisiones quedó en `docs/specs/interactions/s01-task-family-bias.md`. Ambos paquetes
siguen en revisión interna (`publish_ready: false`).
