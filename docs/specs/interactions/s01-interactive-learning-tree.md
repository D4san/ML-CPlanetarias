---
id: s01-interactive-learning-tree
status: draft
page: /sistema/
packet_id: S01-ML-IA-metodos-estadisticos
---

# Árbol interactivo de decisiones de S01

## Propósito

Convertir la taxonomía inicial de ML en un mapa que el lector construye, recorre y puede abrir por niveles. El árbol debe permitir comprender por qué paradigma, tarea y familia de modelo son decisiones distintas, y cómo dependen de la pregunta científica, los datos, la evaluación y los límites.

La referencia conceptual es el Excalidraw privado del vault `Excalidraw/mapa machine learning.excalidraw.md`. No se copia ni se publica. Su organización inicial se usa como diagnóstico de categorías mezcladas; la figura web es una reconstrucción original, accesible y corregida.

## Audiencia y promesa

- audiencia: tutores y estudiantes que inician ML aplicado a ciencias planetarias;
- prerrequisitos: ninguno más allá de reconocer datos, observaciones y preguntas científicas;
- promesa: al terminar, el lector podrá entrar en cada nivel del árbol, justificar una ruta para un microproblema astronómico y explicar por qué una buena predicción no basta como evidencia física.

## Pregunta del lector

¿Qué decisiones conectan una pregunta astronómica con un modelo evaluable, y qué cambia cuando entro en cada nivel del problema?

## Objetivo de aprendizaje

Distinguir y relacionar pregunta científica, observables, representación, señal de aprendizaje, paradigma, tarea, familia de modelo, entrenamiento, línea base, métrica, generalización e interpretación.

## Objeto mínimo

Un árbol por capas con una espina principal y ramas semánticas:

```text
pregunta científica
└── datos y representación
    └── señal de aprendizaje
        ├── supervisado
        ├── no supervisado
        └── por refuerzo
            └── tarea y tipo de salida
                └── familia de modelo
                    └── entrenamiento
                        └── línea base y evaluación
                            └── generalización
                                └── interpretación y límites
```

La evaluación no se representa como una hoja terminal: un arco de retorno la conecta con la pregunta, los datos y el uso previsto. Los ejes `batch/online` e `instance/model-based` aparecen como filtros transversales, no como ramas equivalentes a los paradigmas.

## Corte del prototipo interno

La primera implementación vive como laboratorio `noindex` y condensa el guion en siete paradas.
Conserva la separación entre niveles y ofrece dos ritmos sobre el mismo contenido: `Presentación`,
que avanza parada por parada, y `Lectura`, que despliega la sesión como un artículo lineal.

Las siete paradas comparten una estructura narrativa visible:

```text
la ruta llega aquí → pregunta de la parada → transformación visual
→ conclusión orientadora → ejemplo activo → esto nos lleva a la siguiente decisión
```

El texto evita rótulos de producción o instrucciones para el autor. Cada bloque habla al grupo con
frases breves, vocabulario formal explicado y una transición causal hacia la parada siguiente. El
gráfico y su control interactivo deben responder a la misma pregunta; una interacción secundaria
explica cómo continúa la transformación en lugar de abrir un tema paralelo.

| Parada | Transformación que se ve | Idea que debe quedar |
| --- | --- | --- |
| pregunta y uso | una observación se conecta con predecir, describir, estimar, decidir o generar | los datos adquieren sentido desde una pregunta y un uso |
| instancia y representación | una instancia produce una observación, se representa como `x` o `s`, recibe la señal disponible y pasa por un modelo hacia una salida | instancia, observación, representación, señal, modelo y salida son objetos distintos |
| señal y paradigma | aparecen objetivo por instancia, ausencia de objetivo etiquetado por instancia o acción–consecuencia–recompensa | la señal disponible organiza el paradigma |
| tarea y salida | el mismo objeto puede producir un número, clase, grupo, rareza, acción o muestra | regresión, clasificación y clustering describen tareas o salidas |
| familia y aprendizaje | varias familias rodean la tarea y se compara escribir reglas con ajustar desde ejemplos | una tarea admite familias distintas; deep learning pertenece al nivel de familia |
| datos y dominio | un espectro sintético limpio se transforma en una observación ruidosa y de menor resolución | unidad, representación, selección y dominio cambian el problema |
| evidencia y límites | línea base, datos no vistos y capacidad se conectan mediante un arco de retorno a la pregunta | ajuste, generalización, explicación física y utilidad son afirmaciones diferentes |

Las lentes IA, estadística y ML aparecen dentro de la primera parada como tres lecturas breves del mismo espectro. No ocupan tres recorridos separados. Las preguntas guía, respuestas esperadas, misconcepciones y reparaciones se integran en la lectura y en los retos donde aportan contexto; no forman un modo separado.

La primera parada da centralidad a la pregunta `¿Qué queremos responder con los datos?`. La figura
declara primero `¿Qué podemos hacer con una observación?` y organiza cinco verbos de salida:
predecir, describir, estimar, decidir y generar. Cada verbo es un control accesible que abre el
frente de una tarjeta con el término y una pregunta de anticipación; la definición de trabajo y el
ejemplo astronómico permanecen ocultos hasta que el lector activa `Voltear`. Cerrar o pulsar
`Escape` devuelve el foco al control de origen.

En la tercera parada, los tres cajones que salen de `¿qué buscamos y qué tenemos?` son también los
controles de las tarjetas de paradigma. El mapa conserva el hilo causal y cada cajón abre el frente
de `Supervisado`, `No supervisado` o `Por refuerzo`; `Voltear` revela la definición formal y el
ejemplo astronómico. El reto de la ruta permanece debajo como una decisión breve: primero se predice
la señal disponible y después se consulta la definición que la explica.

Después, la interfaz pregunta `¿Qué aporta cada disciplina?`. Las tres cajas son un
selector de lente disciplinar, no tres respuestas equivalentes a los cinco verbos. Cada lente
muestra primero su pregunta de trabajo y después una definición formalizada. ML conserva
explícitamente la relación `experiencia E → tarea T → desempeño P`; IA y estadística se presentan
como síntesis del curso y mantienen pendiente bibliografía específica antes de cualquier promoción
pública.

El prototipo integra tres retos dentro de las interacciones ya definidas:

- predecir el paradigma antes de revelar la ruta astronómica;
- reparar el nivel de `supervisado`, `regresión`, `clustering` y `deep learning`;
- decidir qué afirmación sigue injustificada después de un buen desempeño.

La comparación de modelos compatibles funciona como puente visual hacia sesgo inductivo: con tres combinaciones todavía no observadas y tres clases posibles quedan `3³ = 27` reglas compatibles con los casos conocidos. Es una ilustración pedagógica discreta, no un resultado científico.

Cada panel de foco incorpora un control `Ver una respuesta orientadora`. El desplegable contiene
directamente la respuesta conceptual de la parada y evita rótulos internos como `pregunta del
guion` o `qué debe quedar`. El caso se identifica como `En la ruta {escenario}`. En modo `Lectura`,
la pregunta de reflexión, la `Idea central` y la misconcepción aparecen abiertas alrededor de cada
figura. Así, el modo visual funciona como presentación y el modo lineal como desarrollo web de la
sesión.

## Dos ritmos de lectura

### Presentación

- una parada visible a la vez, con numeración `01 / 07`;
- controles `Anterior`, `Siguiente`, panorama y reinicio;
- panel de foco con explicación breve, ruta activa y desarrollo plegable;
- escala tipográfica de proyección: contenido esencial de aproximadamente 18 px o más en 1080p y
  metadatos compactos de al menos 13 px;
- composición prioritaria horizontal desde 1280 px, con figura y foco en paralelo y la primera
  parada distribuida internamente entre mapa y lentes;
- superficie de presentación de al menos 95% del viewport horizontal, con un borde de seguridad
  pequeño; el modo lectura conserva su ancho editorial centrado;
- útil para proyectar, conversar y construir el mapa por etapas.

### Lectura

- artículo continuo con las siete paradas en orden;
- columna de texto de 65–80 caracteres y figuras anchas intercaladas;
- índice local, pregunta guía, interpretación, ejemplo activo y error que vigilar;
- mismas interacciones y estado de escenario que la presentación;
- en móvil, una sola columna sin información dependiente de `hover`.

El selector `Presentación | Lectura` permanece visible al inicio. Cambiar de modo conserva el
escenario y la parada activa. El modo elegido se refleja en `?modo=lectura`; presentación es el
valor por defecto y no necesita parámetro.

## Profundidad de navegación

### 1. Panorama

Muestra el árbol completo, sus niveles y la ruta actualmente seleccionada. El lector puede reconocer dónde se encuentra sin abrir detalles.

### 2. Foco de nodo

Al activar un nodo, la vista se acerca a su vecindad sin borrar el contexto. Permanecen visibles un minimapa y una ruta de migas. El panel de foco contiene:

- definición de trabajo;
- por qué importa en la cadena;
- pregunta que debe formular el tutor;
- microejemplo astronómico;
- misconcepción frecuente;
- conexiones de entrada y salida;
- límite: qué no demuestra ese nodo;
- enlace futuro a la entrada atómica del glosario.

Cada nodo tiene un ID estable en la URL mediante `#concepto`. Atrás, adelante y un enlace compartido deben restaurar el mismo foco.

### 3. Ruta astronómica

El lector elige un escenario y el árbol resalta solo la ruta justificable. Inicialmente se ofrecen tres microproblemas teóricos:

- espectro → abundancia continua;
- catálogo sin etiquetas → estructura o anomalías;
- telescopio → elección de seguimiento con recompensa.

La ruta no recomienda un algoritmo. En los puntos donde la información no basta, el árbol muestra una bifurcación pendiente y pide una decisión.

## Interacciones necesarias

### A. Construir el árbol

Las secciones narrativas revelan capas en orden. También existen controles explícitos `Anterior`, `Siguiente`, `Ver mapa completo` y `Reiniciar`; el desplazamiento de la página nunca es el único mecanismo.

### B. Entrar y salir de un nodo

`Enter`, `Espacio`, clic o toque abren el foco. `Escape`, `Volver al árbol` o la miga anterior regresan un nivel. Abrir un nodo no navega inesperadamente a otra página.

### C. Seguir una ruta

Seleccionar un microproblema activa sus conexiones, actualiza el resumen textual y plantea una predicción antes de revelar la clasificación propuesta.

### D. Reparar el mapa inicial

Antes de mostrar la estructura corregida, el lector ubica elementos del Excalidraw de referencia —por ejemplo `supervisado`, `regresión`, `clustering` y `deep learning`— en los niveles `señal`, `tarea` o `familia`. No se requiere arrastrar: cada elemento puede colocarse con botones o selección de nivel.

### E. Abrir y voltear los cinco usos

Los cinco nodos iniciales funcionan como botones HTML asociados a la figura. Al activarlos aparece
una tarjeta frontal sobre el instrumento. Una segunda acción explícita la voltea y revela una
definición de trabajo más un microejemplo. La tarjeta ofrece `Cerrar`, responde a `Escape`, no
depende de `hover` y conserva el término visible en ambas caras. El diálogo se monta fuera de la
escena animada y la tarjeta calcula su altura a partir del contenido; si la pantalla es baja, el
overlay permite desplazamiento vertical sin que el ejemplo quede debajo del botón.

### F. Leer y abrir el ciclo formal

La segunda parada conserva la cadena del guion y separa seis objetos: instancia, observación,
representación, señal u objetivo, modelo y salida. Cada objeto es un botón HTML; al activarlo abre
el frente de una tarjeta de anticipación y solo `Voltear` revela la definición y el microejemplo.
La tarjeta comparte el contrato de teclado, `Escape` y restauración de foco de los cinco usos.

La notación se renderiza con KaTeX y cambia con la ruta activa:

- espectro supervisado: `\mathcal D=\{(x_i,y_i)\}_{i=1}^{n}` y
  `\hat y_*=h_\theta(x_*)`;
- catálogo sin etiquetas: `\mathcal D=\{x_i\}_{i=1}^{n}` y `z_i=h_\theta(x_i)`, con
  ausencia explícita de `y_i` por fila;
- seguimiento por refuerzo: `a_t=\pi_\theta(s_t)` y `r_t=R(s_t,a_t)`.

La fórmula, las etiquetas y las definiciones usan los mismos símbolos. El bloque de la parada 2
explica además la diferencia entre `Ajuste` —ejemplos o experiencias que construyen la relación— y
`Uso` —una instancia o estado nuevo que recibe la salida—. El panel de foco presenta una secuencia
explícita: unidad → representación → señal → salida, seguida del ejemplo activo.

## Estado inicial y fallback

- estado inicial: panorama con `pregunta científica` activa y las capas posteriores visibles como contornos etiquetados;
- no se inicia ninguna animación hasta una acción del lector;
- fallback sin JavaScript: árbol completo como lista jerárquica, cuatro tablas de clasificación, microproblemas y detalles de cada nodo mediante encabezados y enlaces internos;
- el contenido esencial nunca depende de `hover`, zoom visual o color.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| capa construida | `p` | 0–6 | 0 | etapa | anterior, siguiente, completa |
| nodo en foco | `f` | ID o ninguno | pregunta científica | concepto | nodos, migas, URL |
| escenario | `s` | ninguno, espectro, catálogo, seguimiento | ninguno | caso | selector de escenario |
| predicción revelada | `r` | falso, verdadero | falso | estado | predecir, revelar |
| vista | `v` | panorama, foco, ruta | panorama | modo | acciones contextuales |
| ritmo de lectura | `u` | presentación, lectura | presentación | vista editorial | selector de modo |
| uso abierto | `c` | ninguno, predecir, describir, estimar, decidir, generar | ninguno | concepto | cinco nodos iniciales |
| definición revelada | `d` | falso, verdadero | falso | cara | voltear tarjeta |
| término formal abierto | `m` | ninguno, instancia, observación, representación, objetivo/señal, modelo, salida | ninguno | concepto | nodos de la segunda parada |
| fórmula de ruta | `q` | supervisada, sin objetivo etiquetado por instancia, refuerzo | supervisada | formulación | selector de escenario |

## Codificación visual

- marcas y geometría: espina vertical o diagonal por niveles, ramas para alternativas y arco de retorno para evaluación;
- `data`: observables, representación y evidencia;
- `model`: señal, paradigma, tarea y familia;
- `decision`: línea base, métrica y elecciones justificadas;
- `limit`: generalización, fallas y afirmaciones no permitidas;
- `transfer`: pregunta docente y aplicación a un problema nuevo;
- etiquetas: nombre corto siempre visible; nombre completo, nivel y estado en foco;
- señal redundante: color acompañado por forma, icono textual, patrón de línea y posición;
- conexiones no disponibles: línea discontinua y explicación textual, nunca solo menor opacidad.

## Movimiento implementable

| Cambio | Propósito | Duración máxima | Implementación |
| --- | --- | ---: | --- |
| revelar capa | mostrar dependencia | 180 ms | `opacity` y `transform` |
| entrar en nodo | conservar continuidad espacial | 260 ms | transformación de grupo SVG y panel |
| salir al panorama | recuperar contexto | 220 ms | transformación inversa |
| activar ruta | seguir causalidad decisional | 160 ms por estado, sin cascada larga | color, grosor y patrón |
| corregir categoría | explicar reubicación | 200 ms | desplazamiento entre niveles |

- usar una curva breve equivalente a `cubic-bezier(0.2, 0.8, 0.2, 1)`;
- no usar partículas, pulsos continuos, física elástica ni movimiento automático infinito;
- no secuestrar el scroll ni depender de listeners continuos; `IntersectionObserver` puede sugerir la capa narrativa, pero los controles son la autoridad;
- toda transición es reversible y se interrumpe limpiamente ante una nueva acción.

## Comportamiento

- al cambiar: actualizar árbol, panel, miga, hash, pregunta docente y resumen textual en una sola transición de estado;
- al cambiar de presentación a lectura: conservar escenario y parada, desplegar las siete secciones y desplazar la parada activa a la vista;
- al volver a presentación: conservar la parada activa y recuperar su diapositiva;
- al reiniciar: limpiar escenario, predicción y foco; volver a la pregunta científica;
- al abrir una tarjeta: mostrar primero el frente, enfocar `Voltear` y mantener la definición fuera de lectura hasta revelarla;
- al cerrar una tarjeta: ocultarla, restaurar el frente y devolver foco al nodo de origen;
- al cambiar de escenario en la segunda parada: actualizar simultáneamente señal, símbolos, salida,
  fórmula y equivalente textual;
- con teclado: `Tab` recorre acciones; flechas recorren hermanos; `Home` vuelve a la raíz; `Enter` abre; `Escape` sube un nivel;
- foco: después de abrir, mover el foco al título del panel; al cerrar, devolverlo al nodo que originó la acción;
- en móvil: árbol como niveles verticales plegables, minimapa compacto y panel en flujo; no exigir gestos de pellizco;
- con movimiento reducido: todos los cambios son instantáneos, sin zoom ni desplazamiento animado;
- ante hash inválido: mostrar panorama, explicar que el concepto no existe y conservar navegación útil;
- ante contenido incompleto: mostrar `Concepto en revisión` y sus conexiones conocidas, sin inventar definición.

## Texto alrededor de la figura

- pie: el árbol organiza decisiones; no selecciona automáticamente el mejor modelo;
- qué observar: una tarea puede admitir varias familias y una familia puede operar bajo señales distintas;
- resumen de estado: `Vista {modo}. Nodo {nombre}. Nivel {nivel}. Ruta {escenario o ninguna}.`;
- misconcepciones prevenidas: regresión como paradigma, deep learning como cuarto paradigma, clustering como evidencia de una clase física y métrica alta como explicación;
- qué no demuestra: no valida datos, modelos, causalidad ni resultados científicos de un caso real.

## Arquitectura de implementación

- Astro entrega narrativa, fallback, encabezados y enlaces profundos;
- una única isla React administra el estado del árbol;
- SVG accesible dibuja conexiones; botones HTML asociados administran foco y acciones;
- los nodos provienen de una estructura tipada y estable, no de coordenadas incrustadas del Excalidraw;
- comenzar sin D3, Canvas ni WebGL; añadir una dependencia solo si una necesidad medida no puede resolverse con SVG y React;
- limitar la primera versión a los conceptos de S01 y menos de 40 nodos visibles;
- medir LCP, INP y tamaño del bundle antes de ampliar profundidad o efectos.

## Matriz de pruebas

- [ ] estado inicial determinista y fallback sin JavaScript;
- [ ] construcción por capas, árbol completo y reinicio;
- [ ] alternar presentación/lectura, conservar escenario y parada y restaurar el modo desde URL;
- [ ] abrir, cerrar, migas, atrás/adelante y hash profundo;
- [ ] abrir cada uso, voltear, cerrar con botón y `Escape`, y restaurar el foco;
- [ ] abrir cada término formal, voltear, cerrar y restaurar el foco;
- [ ] verificar KaTeX y el equivalente textual en las tres fórmulas de ruta;
- [ ] rutas de espectro, catálogo y seguimiento;
- [ ] llegada, decisión y enlace siguiente visibles y coherentes en las siete paradas;
- [ ] predicción antes de revelar y reparación de categorías;
- [ ] teclado, restauración de foco y resumen textual actualizado;
- [ ] 1920×1080 de proyección, 1440×900, 390×844 y anchura intermedia;
- [ ] lectura lineal sin solapamientos, saltos de índice funcionales y figuras legibles;
- [ ] movimiento reducido sin desplazamientos;
- [ ] axe y revisión manual del equivalente textual del SVG;
- [ ] snapshots de panorama, foco profundo y ruta activa;
- [ ] presupuesto de bundle, LCP e INP sin regresión material.

## Fuera de alcance de la primera versión

- dataset, entrenamiento o resultado científico;
- editor libre de nodos;
- guardar progreso en una cuenta;
- grafo completo de todo el curso;
- recomendador automático de algoritmos;
- importar o renderizar directamente el JSON del Excalidraw.
