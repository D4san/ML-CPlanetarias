# Ficha de interacción · Navegación de curso y sesiones

## Propósito

- Audiencia: estudiantes y tutores que recorren sesiones de ML en ciencias planetarias.
- Prerrequisitos: distinguir pregunta, representación, tarea y evidencia; conocer los
  controles básicos del navegador.
- Promesa: el lector puede ubicar su punto en el curso, recorrer una unidad por vez y cambiar
  ruta o vista sin perder el significado ni reactivar contenido excluido.
- Interacción principal: carril de sesión, navegación anterior/siguiente, selector de ruta y
  selector de vista/modo cuando estén habilitados por configuración.

## Estado inicial determinista

1. Resolver `enabledSessionIds`, defaults globales y overrides de la sesión.
2. Abrir la bibliografía de la sesión como diapositiva 0.
3. Elegir la ruta inicial declarada y validar que esté habilitada.
4. Seleccionar vista `presentation` salvo que `defaultView` resuelva otra vista válida.
5. Ignorar hash/query de una sesión o ruta excluida; responder 404 en una URL de sesión no
   disponible en el build.

El estado persistente mínimo es `{ sessionId, stationId, unitId, routeId, displayMode,
interactionMode }`. El estado de una actividad —respuesta, feedback y reinicio— vive aparte y
nunca se infiere de `interactionMode`.

## Variables y controles

| Control/variable | Valores | Unidad/significado |
| --- | --- | --- |
| Sesión | IDs declarados, por ejemplo `S00`, `S01` | conjunto y orden de sesiones disponibles |
| Estación | siete IDs de S01 o IDs de otra sesión | parada conceptual del recorrido |
| Unidad | IDs estables de la estación | una idea e interpretación principales |
| Ruta | IDs declarados, por ejemplo `spectrum`, `catalog`, `followup` | caso que actualiza los elementos del flujo |
| Vista | `presentation`, `reading`, `activities` | composición del mismo contenido |
| Interacción | `interactive`, `direct` | anticipación/revelado o explicación visible |
| Docente | `true`, `false` | preguntas y orientaciones contextuales |

Los botones del carril son controles nativos. Cada uno recibe etiqueta de estación/unidad,
estado seleccionado y posición accesible. `Anterior`, `Siguiente`, `Inicio`/bibliografía,
selector de ruta, selector de vista, `Reset` y enlaces de ejemplo deben poder operarse con
teclado y toque.

## Codificación y significado

Los tonos del sistema visual comunican pregunta, datos, modelo, decisión, límite y transferencia;
la ficha debe acompañarlos con texto, forma o etiqueta. El progreso indica posición en la
secuencia, no porcentaje de comprensión ni desempeño. Una tarjeta apilada sigue siendo un
control; su representación visual no puede ser la única forma de conocer el orden.

## Comportamiento

### Navegación

- `Tab` recorre controles en orden DOM.
- Flechas izquierda/derecha y arriba/abajo avanzan o retroceden en la secuencia; `Home` abre
  bibliografía y `End` va al último elemento disponible.
- Enter/espacio selecciona el control enfocado. La selección actualiza etiqueta, contenido,
  hash e historial sin recarga completa.
- Anterior/Siguiente cruzan unidades y estaciones según los arrays declarados. Los límites se
  deshabilitan de forma perceptible y semántica.
- Un hash de estación sin unidad abre su primera unidad. Un hash inválido muestra una
  recuperación útil y registra el destino válido; nunca deja una pantalla vacía o una
  excepción sin controlar.
- Atrás/adelante del navegador restaura estación, unidad, ruta y vista disponibles. El cambio
  de vista conserva el punto de retorno.

### Ruta, modalidad y reset

- El selector solo enumera rutas habilitadas. Al cambiar de ruta, conserva la unidad si la
  correspondencia existe y actualiza el ejemplo; si no, anuncia que vuelve a la primera unidad.
- `direct` muestra definición, interpretación y ejemplo desde el inicio. `interactive`
  conserva la anticipación y el revelado. Ninguno modifica el estado de la actividad.
- El modo docente añade preguntas y orientación cerca del concepto o unidad. Apagarlo no
  elimina definiciones, ejemplos, precauciones ni límites.
- `Reset` devuelve a bibliografía y la ruta inicial resuelta, conserva la vista escogida y
  deja intacto el registro de una respuesta solo si la actividad tiene un reinicio explícito.

### Móvil, sin JavaScript y movimiento reducido

- En 390×844 y 390×480 el carril pasa a flujo vertical; no se permite desbordamiento
  horizontal ni solapamiento de etiquetas/controles.
- En 1440×900 y 1920×1080 hay una unidad principal legible; el apilado no oculta el progreso
  ni las puntas/indicadores necesarios.
- El HTML inicial contiene título, bibliografía, orden, texto esencial y enlaces de fallback.
  JavaScript añade selección, historial y composición interactiva.
- Con `prefers-reduced-motion`, las transiciones quedan instantáneas o reducidas y ningún
  estado depende de una animación.
- Los diálogos largos permiten scroll interno/vertical, mantienen el cierre visible y devuelven
  el foco al botón que abrió el diálogo.

## Resumen textual y fallback

La interfaz expone una frase equivalente al estado: “S01, estación 3 de 7, unidad Señal,
ruta Catálogo, vista Presentación, modo interactivo”. Cada SVG/Canvas tiene texto alternativo
o tabla/resumen con la relación científica que comunica. Sin JavaScript, el lector puede abrir
la sesión, leer la bibliografía y seguir enlaces HTML a estaciones/unidades.

## Misconcepción que previene

“La tarjeta que se ve primero es todo el contenido de la estación y cambiar de ruta solo cambia
una imagen.” La interfaz hace visible estación, unidad, orden, ruta y ejemplo actual; la lectura
mantiene la secuencia completa y el texto explica qué cambia y qué permanece.

## Límites

La navegación demuestra organización y acceso al contenido. No demuestra aprendizaje del
estudiante, calidad científica de un modelo, autorización editorial ni control de acceso a
assets públicos. Un ejemplo ilustrativo tampoco es una medición.

## Matriz mínima de pruebas

| Área | Prueba |
| --- | --- |
| Orden | Bibliografía, todas las unidades, cruce de estación, primer/último paso |
| Historial | hash específico, hash viejo, recarga, atrás/adelante y sesión excluida |
| Configuración | ruta válida, ruta inválida, lista vacía, sesión sin rutas y override `false` |
| Modalidad | directo/interactivo con definición, ejemplo, ayuda docente y actividad |
| Teclado/foco | Tab, flechas, Home, End, Enter/espacio, cierre y retorno de foco |
| Responsive | 1920×1080, 1440×900, 390×844 y diálogo 390×480 |
| Sin JS | contenido inicial, enlaces, bibliografía y orden legible |
| Movimiento | `prefers-reduced-motion` sin dependencia de transición |
