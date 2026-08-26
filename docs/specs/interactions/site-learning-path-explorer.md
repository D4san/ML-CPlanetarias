---
id: site-learning-path-explorer
status: implemented
page: /
packet_id: COURSE-CONTEXT-MLCP
---

# Explorador de la cadena pedagógica

## Pregunta del lector

¿Qué debe justificar una sesión antes de saltar desde una pregunta astronómica hasta un modelo, y dónde aparece la transferencia docente?

## Objetivo de aprendizaje

Reconocer las nueve decisiones conectadas de una sesión MLCP, inspeccionar su función y formular la pregunta que un tutor debe hacer en cada etapa.

## Estado inicial y fallback

Iniciar en `Pregunta científica`. Renderizar ese estado en HTML antes de hidratar React. La página incluye además la cadena completa en texto, por lo que conserva el mapa conceptual sin JavaScript.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| etapa activa | `s` | 1–9 | 1 | etapa | botones, anterior/siguiente, flechas |

## Codificación visual

- marcas y geometría: nueve nodos unidos en secuencia; el nodo activo crece y revela detalle;
- significado del color: pregunta, datos, modelo, decisión, límite y transferencia usan tonos semánticos del sistema;
- etiquetas: número, nombre corto y título completo;
- animación: transición breve de color, borde y desplazamiento del panel; ninguna animación continua.

## Comportamiento

- al cambiar: actualizar nodo, progreso, explicación y pregunta docente;
- al reiniciar: volver a la primera etapa;
- con teclado: `Tab` recorre controles; flechas izquierda/derecha cambian y enfocan etapa;
- en móvil: nodos en carril horizontal desplazable y panel debajo;
- con movimiento reducido: aplicar el estado final sin desplazamiento ni transición;
- ante error o datos vacíos: no aplica; la lista es estática y tipada.

## Texto alrededor de la figura

- pie: la secuencia no elige un algoritmo; obliga a justificar cada decisión;
- qué observar: modelo aparece después de pregunta, datos, paradigma y tarea;
- resumen de estado: “Etapa N de 9” con título y explicación en región viva;
- misconcepción prevenida: empezar por el algoritmo o tratar una buena métrica como explicación física;
- qué no demuestra: no valida una aplicación científica ni convierte S01 en contenido público.

## Matriz de pruebas

- [x] estado inicial determinista;
- [x] controles, teclado y reinicio;
- [x] resumen textual actualizado;
- [x] desktop, móvil y movimiento reducido;
- [x] accesibilidad automatizada y revisión manual;
- [x] snapshot de estados inicial y final.
