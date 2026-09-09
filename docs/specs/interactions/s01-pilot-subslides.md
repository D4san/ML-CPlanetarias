---
id: s01-pilot-subslides
status: drafting
page: /sistema/
packet_id: S01-ML-IA-metodos-estadisticos
---

# Piloto S01: bibliografía, subslides y modalidades

## Pregunta y objetivo

¿Cómo paso de una observación a una pregunta y una representación? El lector distingue apertura, objeto e interpretación al recorrer una parte por vez, conservando el caso astronómico.

## Estado inicial y fallback

Presentación abre la diapositiva bibliográfica 0. Un enlace anterior como `#pregunta` abre la apertura de esa estación; `#pregunta/salidas`, `#pregunta/disciplinas`, `#instancia/flujo` y `#instancia/notacion` abren sus partes específicas. Lectura conserva todas las partes en orden. La bibliografía está disponible también en lectura y sin JavaScript.

El piloto divide las siete estaciones en apertura (panel derecho anterior), desarrollo visual e
interacción o interpretación. Bibliografía permanece como la diapositiva 0; cada estación conserva
tres partes, para 22 unidades navegables. Este contrato prevalece sobre cualquier descripción previa
que dejara Señal, Tarea, Familia, Dominio o Evidencia como una sola escena.

## Variables y configuración

- `config/course.config.ts`: interacción `interactive | direct`, ayudas docentes booleanas, vista inicial y rutas habilitadas de S01 con ruta inicial válida.
- Rutas disponibles: `spectrum`, `catalog`, `followup`; no se permiten listas vacías, duplicados, IDs desconocidos ni ruta inicial deshabilitada.
- Navegación: estación, parte y vista; no representa tiempo, puntuación ni progreso del estudiante.
- Selección de disciplina: Estadística → ML → IA, con ML como selección inicial preservada.
- Disponibilidad de sesiones: `enabledSessionIds` y `sessions.<id>.enabled` controlan generación y
  enlaces; una sesión omitida no reaparece por hash o query.
- La plantilla visual y de navegación vive en `SlideRail`; S01 aporta la secuencia aplanada y
  conserva su estado, contenido y hashes propios.

## Codificación y comportamiento

- El carril de presentación contiene 22 diapositivas: bibliografía 0 y tres subslides
  para cada una de las siete estaciones.
  Mantiene cinco tarjetas desarrolladas alrededor de la diapositiva activa; las demás
  permanecen apiladas en el borde izquierdo o derecho según su posición. La tarjeta
  activa gana espacio para sostener la jerarquía de lectura y cada subslide conserva
  su estación y parte como etiqueta visible. El índice compuesto muestra `00` para
  bibliografía y `01.1`–`07.3` para estación y subslide. En presentación, el riel concentra
  la navegación principal: el conteo lateral y las marcas de partes pasan a una jerarquía
  secundaria para evitar repetir información que ya comunica el índice.
- Las tarjetas apiladas siguen siendo controles nativos, con nombre accesible y foco
  perceptible. En móvil el carril pasa a un flujo vertical para que todas las
  diapositivas sigan siendo legibles y operables.
- La barra de partes se conserva como navegación complementaria, con tratamiento ligero en
  presentación y mayor presencia en lectura. Bibliografía y mapa completo permanecen
  disponibles, pero con menor peso visual que el cambio de modo y la ruta astronómica.
- Cinco flechas del centro hacia los verbos, con puntas separadas del borde de los botones.
- Tonos y tipografía del sistema actual; una figura concreta por elemento del flujo de Instancia y texto aplicado a la ruta activa. Son esquemas didácticos, sin mediciones inventadas.
- Anterior/Siguiente recorren la secuencia aplanada de diapositivas y cruzan a la estación o subslide contiguos. Las tarjetas del carril permiten ir a una diapositiva directamente; los enlaces de estación y las pestañas de parte se conservan como navegación complementaria. El historial restaura la parte; una URL inválida conserva una salida útil y avisa.
- Cambiar ruta conserva estación y parte; reiniciar recupera bibliografía y ruta configurada, conservando la vista elegida.
- El mapa vuelve a la parte en curso. Lectura conserva la selección al volver a presentación.
- En modo directo, las definiciones de las tarjetas de salidas, instancia, paradigma y tarea aparecen en el flujo sin abrir un diálogo ni girar. Los controles de navegación y exploración permanecen disponibles. Las actividades mantienen su modo de ejercicio; no se registra resolución automática.
- Preguntas docentes de apertura/diagnóstico y orientación junto al tema cuando `teacherMode` está activo; las precauciones conceptuales permanecen para todo lector.
- Teclado: controles nativos, foco perceptible, Escape/cierre y devolución del foco en tarjetas interactivas. Al recorrer partes con Anterior/Siguiente, anunciar la nueva parte y mantener un foco útil.
- Móvil: una columna y flujo vertical para textos extensos. Movimiento reducido: sin desplazamientos animados. Contenido directo extenso puede desplazarse, con texto legible.

## Interpretación y límites

Observar cómo cambia la pregunta para el mismo dato y distinguir observación, representación, señal, modelo y salida. Las tres disciplinas son lentes didácticas: el orden no afirma inclusión entre conjuntos. Una ilustración o salida de modelo no constituye evidencia científica.

## Pruebas requeridas

- Configuración inválida falla con mensaje accionable; rutas deshabilitadas no aparecen en el selector y reiniciar respeta la ruta configurada.
- Bibliografía inicial, enlaces antiguos/nuevos, historial, reinicio y conservación de estado entre vistas.
- Una parte principal visible, orden de disciplinas y dirección de cinco flechas.
- Definiciones visibles sin giro en directo; apertura/giro/cierre/foco en interactivo; ambas variantes de ayudas docentes.
- Instancia muestra ejemplos coherentes con cada una de las tres rutas.
- Check, unitarias, build raíz/subruta, Playwright funcional, axe, movimiento reducido y revisión visual en proyección y móvil. Snapshots de referencia únicamente en Linux.
