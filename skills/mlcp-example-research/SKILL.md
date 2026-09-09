---
name: mlcp-example-research
description: Investigar y documentar ejemplos científicos auditables para unidades explicativas de ML Ciencias Planetarias, con prioridad exoplanetaria, fuentes localizadas y estados de evidencia. Usar cuando C01 o F01 necesiten seleccionar, verificar o dejar pendiente un ejemplo; no incorpora materiales al sitio automáticamente.
metadata:
  short-description: Ejemplos científicos con trazabilidad y derechos separados
---

# Investigación de ejemplos MLCP

Esta skill prepara fichas que C01 puede registrar y F01 puede integrar por IDs. Conserva
separadas la evidencia científica, la adaptación didáctica, los derechos y la decisión de
publicación. Lee la [ADR-0002](../../docs/architecture/decisions/ADR-0002-course-content-contract.md),
el [protocolo de procedencia y derechos](../../docs/protocols/PROVENANCE_AND_RIGHTS.md) y la
[validación](../../docs/planning/agent-execution/VALIDATION.md) pertinente antes de cerrar una
ficha.

## Entrada mínima

Exige estos campos; si falta uno, devuelve la solicitud como `pendiente` y formula la pregunta
concreta que falta:

- `session_id` y `unit_id` estables; añade estación o ruta si la unidad las tiene.
- `idea`: una idea que el caso debe hacer visible y la relación que el estudiante debe poder
  explicar.
- `domain`: dominio preferido y objeto de análisis, empezando por `exoplanet`.
- `scientific_gap`: qué caso, dato, método o límite aún falta resolver.
- `required_source_type`: `original-paper`, `mission-dataset-documentation` o `institutional-source`.
  Una noticia puede dar contexto, pero no respalda por sí sola el método.
- Salida esperada: ficha de ejemplo, auditoría de afirmación, solicitud de asset o bloqueo
  documentado.

No infieras un `unit_id`, una fuente, una cifra, una licencia ni un resultado cuando la entrada
no los proporcione.

## Flujo de investigación

1. **Fijar el blanco pedagógico.** Escribe la pregunta, la idea, el objeto de análisis y un
   criterio observable: qué debe distinguir o conectar el estudiante. Un caso solo es útil si
   ilustra esa unidad concreta.
2. **Aplicar el filtro de dominio.** Busca primero un caso de exoplanetas. Si ningún caso
   localizado satisface la idea, registra qué criterio falla —objeto, representación, escala,
   tarea o límite— y amplía a estrellas. La elección estelar incluye esa justificación en la
   ficha. Excluye galaxias de objetos, ejemplos, imágenes, actividades y rutas; un caso galáctico
   se rechaza o se sustituye antes de entregarlo.
3. **Elegir y leer la fuente real.** Prioriza el paper original del caso o método, la
   documentación oficial de una misión/dataset y, para contexto acotado, la institución que
   respalda el recurso. Abre el recurso completo disponible; un resultado de búsqueda, una
   referencia bibliográfica o un resumen no cuentan como lectura suficiente.
4. **Auditar afirmaciones atómicas.** Para cada afirmación registra `claim_id`, redacción exacta,
   tipo (`source-fact`, `course-paraphrase`, `pedagogical-choice` o `measured-result`), `source_id`,
   ubicación precisa —página, sección, figura, tabla o párrafo—, fecha de consulta y límite. Si
   el enlace está inaccesible o la ubicación no se puede comprobar, deja la afirmación en
   `pendiente`; si solo se respalda una parte, usa `parcial` y estrecha la redacción.
5. **Construir la cadena del ejemplo.** Completa, cuando aplique, `question → representation →
   paradigm/task → model → baseline/evaluation → interpretation → limits`. Un modelo, baseline,
   métrica o cifra solo aparece si la fuente consultada lo respalda o si se declara como
   demostración propia. Un caso conceptual puede marcar ejecución como `not_applicable`.
6. **Separar afirmación y enseñanza.** Señala qué dice la fuente, qué parafrasea el curso, qué
   decisión pedagógica añade el ejemplo y qué queda fuera de la evidencia. Plausibilidad didáctica
   no equivale a resultado medido. No escribas precisión, tamaño de muestra, mejora, detección o
   descubrimiento sin una ubicación que los respalde.
7. **Auditar derechos por separado.** Conserva metadatos bibliográficos, derecho de enlazar, derecho
   de reutilizar una figura y procedencia de una figura original como campos distintos. Un DOI o
   URL permite localizar una fuente, pero no concede copiar su texto, figura o datos. Para un asset
   público usa `rights.status: original`, `open-license` o `permission` con su nota; si no puedes
   elegir uno, queda interno y `publish_ready: false`.
8. **Entregar por IDs y detener la promoción.** Usa `id`, `unitIds`, `sourceIds` y `assetIds` según
   el contrato. Entrega la ficha en el destino de preparación asignado a C01/F01. Si no existe,
   devuelve un borrador en la respuesta o en el destino que el integrador autorice; no crees una
   colección pública paralela.

## Estados de cierre

- `verificado`: la fuente fue leída, la afirmación tiene ubicación y fecha comprobables, la
  redacción coincide con lo que respalda la fuente y el límite está escrito.
- `parcial`: la evidencia cubre solo una parte del caso o queda pendiente un campo, una fuente
  alternativa o un derecho; la ficha identifica exactamente el faltante y limita la afirmación.
- `pendiente`: la fuente no fue leída, es inaccesible, no tiene ubicación comprobable o la
  afirmación requiere una investigación nueva. Incluye una próxima acción; no lo presentes como
  ejemplo verificado.

Puede haber estados distintos en una misma ficha: una afirmación puede estar `verificado`, la
  adaptación completa `parcial` y un asset `pendiente`. El informe debe conservar esa diferencia.

## Ensayo seguro

Para probar el flujo usa una entrada acotada con `mode: research-only`. Produce la ficha y la
auditoría, comprueba IDs, estados, enlaces y límites, y detén el proceso antes de copiar texto,
descargar figuras, crear assets o escribir en `docs/content/`, `public/`, `inbox/` o el build. La
existencia de una fuente consultada no cambia `status`, `visibility`, `rights` o `publish_ready`
de ningún paquete. El ensayo de esta skill y las dos plantillas están en
[`templates/example-research-record.md`](templates/example-research-record.md) y
[`templates/claim-audit.md`](templates/claim-audit.md).

## Condición de cierre

Entrega una ficha solo cuando contiene la entrada completa, el criterio de selección de dominio,
al menos una afirmación auditada o un bloqueo explícito, ubicación y fecha de consulta, límites,
derechos separados y referencias por ID. Si no puede cumplirlo, entrega el estado `parcial` o
`pendiente` con la reparación concreta. La skill orienta la investigación; el integrador decide
registro, revisión, promoción y publicación.
