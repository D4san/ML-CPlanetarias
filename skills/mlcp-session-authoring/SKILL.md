---
name: mlcp-session-authoring
description: Preparar y revisar paquetes de sesiones de ML Ciencias Planetarias desde el material fuente hasta una secuencia editorial con unidades, bibliografía, ejemplos, conceptos, preguntas, precauciones y límites; no implementa la web ni aprueba publicación.
metadata:
  short-description: Preparación editorial de sesiones MLCP
---

# Preparación de sesiones MLCP

## Cuándo usarla

Usa esta skill cuando una sesión, unidad o fragmento de `inbox/` deba convertirse en un paquete de preparación trazable para el curso. También sirve para reorganizar un guion existente antes de crear páginas, ejercicios o material para tutores.

La skill termina en un paquete revisable. No edita Astro, React, esquemas, componentes, espejos, `docs/content/` ni el vault. No convierte `status`, `visibility`, `publish_ready` o derechos en una autorización nueva. Para implementación web, el agente debe cambiar a `$develop-mlcp-web` después de una decisión editorial independiente.

## Entrada y salida

Antes de escribir, lee `AGENTS.md`, `README.md`, `docs/architecture/OBSIDIAN_BRIDGE.md`, [ADR-0002](../../docs/architecture/decisions/ADR-0002-course-content-contract.md), el manifiesto del paquete y sus mapas auxiliares. Carga solo los fragmentos de fuente necesarios; conserva sus encabezados y ubicación.

Entrega, en la ruta solicitada, un paquete que contenga:

- procedencia y estado editorial verdaderos;
- inventario de tramos y decisiones de alcance;
- bibliografía con referencias por ID y ubicación verificada o pendiente;
- jerarquía ordenada de estaciones y unidades;
- ejemplos y conceptos enlazados por ID;
- preguntas docentes, precauciones y límites esenciales;
- revisión de cobertura, lagunas, derechos y frontera de publicación.

Las plantillas, el checklist, el contrato operativo, el ensayo S01 y los errores frecuentes están en [templates.md](references/templates.md), [session-contract.md](references/session-contract.md), [example-s01.md](references/example-s01.md) y [common-errors.md](references/common-errors.md).

## Flujo obligatorio

Sigue esta cadena y deja una salida auditable en cada transición:

`paquete → inventario → bibliografía → secuencia → ejemplos/conceptos → preguntas/precauciones → revisión`

1. **Paquete.** Identifica `id`, `kind`, `status`, origen, `source_note` o `source_path`, `source_heading`, conceptos declarados, referencias, visibilidad y derechos. Define audiencia, duración, pregunta de aprendizaje y frontera del fragmento.
2. **Inventario.** Divide el material por tramos fuente, estación, unidad candidata, producto y laguna. Distingue lo presente, lo inferido y lo que requiere investigación. No uses la posición de una diapositiva como identidad.
3. **Bibliografía.** Crea un registro propio, normalmente accesible como bibliografía 0 de la sesión. Cada afirmación conserva la referencia que la sostiene y una ubicación pertinente. Una mención de capítulo sin páginas o sección se marca como ubicación pendiente.
4. **Secuencia.** Organiza `curso → sesión → estación → unidad`. Declara arrays ordenados, conserva los siete IDs/hashes de S01 y asigna IDs de unidad legibles y estables. Cada unidad debe expresar pregunta, objeto visual, idea central, contenido, interpretación, ejemplo, conceptos y límites.
5. **Ejemplos/conceptos.** Registra ejemplos con pregunta, dominio, representación, tarea, interpretación, límites y `sourceIds`. Separa evidencia científica, paráfrasis del curso y adaptación didáctica. Registra conceptos con definición breve, fuentes y estado de atomización; calcula backlinks a partir de referencias.
6. **Preguntas/precauciones.** Añade preguntas con intención `opening`, `diagnostic` o `transfer`. Añade precauciones con distinción, confusión y consecuencia. Las precauciones esenciales permanecen aunque el modo docente esté apagado.
7. **Revisión.** Comprueba IDs únicos, referencias resolubles, orden, cobertura pedagógica, procedencia, derechos, lagunas, lenguaje de evidencia y frontera editorial. Reporta qué queda pendiente y formula una tarea de investigación cuando falte una fuente. La revisión prepara la decisión humana; no certifica ciencia ni publicación automáticamente.

## Reglas que cambian decisiones

- Para `origin: obsidian`, conserva `source_vault`, `source_note` relativo al vault y `source_heading`; para `origin: repo`, usa `source_path` relativo al repositorio. Nunca rellenes la variante contraria con una ruta inventada o absoluta.
- No inventes citas, páginas, DOI, URLs, resultados, medidas ni derechos. Escribe `pendiente`, explica qué afirmación queda retenida y crea una tarea concreta: fuente que falta, ubicación que debe verificarse y decisión que depende de ella.
- Un ejemplo conceptual, simulado u observado debe declarar su tipo y su límite. Un microproblema teórico no se presenta como medición, validación física o resultado científico.
- La sesión puede estar `drafting` e `internal` mientras se prepara. `inbox/` permanece fuera del build y un fixture no equivale a contenido aprobado.
- Presentación, lectura y actividades deben consumir la misma secuencia editorial cuando la salida vaya a implementación; la skill no duplica el protocolo de interacción ni crea componentes.

## Criterio de salida

El paquete está listo para revisión cuando otra persona puede reconstruir qué fuente alimentó cada tramo, qué unidad viene después, qué ejemplo y concepto recibe cada unidad, qué precaución evita una lectura errónea, qué lagunas siguen abiertas y por qué el material permanece dentro o fuera de la frontera editorial.
