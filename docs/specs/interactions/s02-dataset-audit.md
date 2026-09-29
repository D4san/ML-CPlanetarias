---
id: s02-dataset-audit
status: draft
page: /sesiones/s02/
packet_id: S02-arboles-decision-random-forest
---

# Especificación de interacción

## Pregunta del lector

¿Qué hay que revisar en una fila de PSCompPars antes de comparar predicciones de radio?

## Objetivo de aprendizaje

Relacionar las banderas de detección y selección, los límites e incertidumbres, y las referencias de los parámetros con decisiones explícitas sobre la población que entra en el ejercicio.

## Estado inicial y fallback

El estado inicial muestra el grupo «Población». Los tres botones son HTML nativo y operan tras hidratar la isla. Sin JavaScript permanece legible el panel inicial y los enlaces a las definiciones; la explicación de los otros grupos requiere la interacción.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Grupo de auditoría | `auditTopic` | población, medición, procedencia | población | — | Grupo de botones |

## Codificación visual

- marcas y geometría: cabecera que resume «1 fila = 1 planeta» y la combinación de referencias; tres botones numerados abren el panel con columnas y la decisión asociada.
- significado del color: color de Datos para las columnas, color de Límite para alertas y color de Pregunta para decisiones del ejercicio; el texto y las etiquetas mantienen el significado sin depender del color.
- etiquetas: los nombres de columna se muestran en código; el intervalo de incertidumbre se identifica como esquema, no como medición de un planeta.
- animación: cambio inmediato de panel, sin animación necesaria.

## Comportamiento

- al cambiar: actualiza la explicación y el paso activo; anuncia el nuevo título de panel con una región viva discreta.
- al reiniciar: no aplica; elegir un grupo abre directamente su explicación.
- con teclado: Tab recorre los botones; Enter y Espacio seleccionan el grupo enfocado.
- en móvil: selector y panel se apilan; el contenido conserva orden, etiquetas y lectura sin desplazamiento horizontal.
- con movimiento reducido: no hay movimiento esencial.
- ante error o datos vacíos: la interacción no usa consultas ni datos remotos; el esquema simbólico sigue disponible.

## Texto alrededor de la figura

- pie: PSCompPars combina parámetros de múltiples referencias y puede incluir valores calculados.
- qué observar: el mismo archivo puede describir detección, límites de medición y procedencia; cada columna responde una pregunta distinta.
- decisión de censura: la actividad conserva solo filas con las tres banderas presentes y en `0` (`=`); las banderas ausentes quedan como desconocidas, se excluyen y se cuentan aparte.
- resumen de estado: nombre del grupo activo y decisión didáctica asociada.
- misconcepción prevenida: una bandera de tránsito no representa calidad general; incertidumbres no son observaciones adicionales; una referencia «Calculated Value» no es una medición independiente.
- qué no demuestra: filtros del ejercicio no definen un censo completo ni garantizan que las publicaciones sean homogéneas.

## Matriz de pruebas

- [x] estado inicial determinista;
- [x] controles y teclado;
- [x] resumen textual actualizado;
- [x] desktop y móvil;
- [ ] movimiento reducido y accesibilidad automatizada;
- [x] revisión manual de foco, árbol accesible y estados;
- [ ] snapshot de estados significativos.
