---
id: contextual-examples
status: draft
page: unidades explicativas y ejemplos
packet_id: C03
---

# Ficha contextual de ejemplo

## Pregunta del lector

¿Qué caso concreto ilustra esta unidad, qué parte proviene de una fuente y qué límite tiene la
interpretación?

## Objetivo de aprendizaje

El lector recorre una ficha única de ejemplo y separa pregunta, dominio, representación, tarea o
uso, resultado, interpretación, evaluación y límite.

## Estado inicial y fallback

`ExampleLink` es un enlace HTML a un ID estable (`#example-<id>` por defecto), a una ruta
interna raíz o a una ficha externa declarada. Solo acepta destinos no vacíos y seguros; una URL
mal formada vuelve al ancla del ejemplo cuando existe y, sin un registro válido, no emite el
enlace. `ExamplePanel` muestra la ficha completa al llegar a ese destino; no requiere modal ni
JavaScript.

La ficha recibe un registro del catálogo C01 y el mapa de sus fuentes. Un registro ausente,
incompleto o una fuente sin URL verificable se presenta como estado editorial legible y no genera
un botón o enlace vacío. Una fuente `pendiente` conserva su título y estado, sin aparentar que ya
respalda la afirmación.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Ejemplo | `example.id` | ID estable del registro | el declarado por la unidad | ID | enlace de la unidad |
| Destino | `href` | ancla, ruta interna raíz o URL HTTP(S) no vacía | `#example-<id>` | URL | `<a>` |
| Fuente | `source.status` | verificado / parcial / pendiente | el del registro | estado editorial | enlace o texto de estado |

## Codificación visual

- marcas y geometría: la ficha usa una cuadrícula de hechos y un bloque separado para fuente y
  alcance;
- significado del color: datos, interpretación y límite tienen bordes semánticos; cada bloque
  conserva además un encabezado textual;
- etiquetas: `Pregunta`, `Dominio`, `Observación y representación`, `Tarea o uso`, `Resultado o
  uso`, `Interpretación`, `Límite` y `Fuente externa y alcance`;
- animación: ninguna; la llegada al ancla usa el comportamiento normal del navegador y respeta
  `prefers-reduced-motion`.

## Comportamiento

- al cambiar: el enlace navega al panel y el navegador identifica el destino por su ID; una misma
  ficha puede ser enlazada desde presentación, lectura o una tarjeta directa;
- al reiniciar: la navegación vuelve al destino de la unidad que la invocó; el registro no se
  duplica por vista;
- con teclado: `Tab` llega al enlace y `Enter` activa la navegación nativa;
- en móvil: los hechos pasan a una columna y las fuentes mantienen un destino tocable;
- con movimiento reducido: no hay transición necesaria;
- ante error o datos vacíos: `ExampleLink` retorna vacío cuando el registro falta; `ExamplePanel`
  anuncia la indisponibilidad o la fuente pendiente, sin ofrecer un control sin destino.

## Texto alrededor de la figura

- pie: indicar si el asset es conceptual, simulado u observado cuando exista;
- qué observar: la relación entre la pregunta, la representación y la salida declarada;
- resumen de estado: la ficha nombra el estado de la afirmación y la siguiente revisión cuando
  están registrados;
- misconcepción prevenida: un ejemplo didáctico ilustra una relación y no convierte por sí solo
  el resultado en evidencia científica;
- qué no demuestra: la ficha conserva el límite del registro y el alcance de cada fuente.

## Matriz de pruebas

- [x] enlace estable por ID y activación nativa con teclado/toque;
- [x] todos los campos pedagógicos mínimos visibles;
- [x] fuente verificada con enlace y fuente pendiente sin enlace engañoso;
- [x] URL externa mal formada sin `<a>`;
- [x] registro ausente o incompleto con fallback legible;
- [x] sin botones vacíos y sin incrustar páginas de terceros;
- [ ] prueba E2E en una unidad pública aprobada cuando el primer ejemplo sea promovido desde C01.
