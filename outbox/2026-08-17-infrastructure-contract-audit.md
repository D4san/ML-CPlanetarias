---
packet: COURSE-CONTEXT-MLCP
artifact: docs/protocols/CONTENT_LIFECYCLE.md
vault_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/03 Producción digital/Plan de producción oficial.md
vault_heading: Producción digital temporal
kind: observation
status: open
---

# Observaciones de la auditoría inicial del repositorio

Antes de promover contenido conviene resolver en el vault o en el siguiente paquete:

- S01 tiene estado repetido en su README, manifiesto e índice; el manifiesto debe ser canónico.
- Los tipos reales `course-context`, `concept-bundle`, `source-map` y `session-packet` exceden la lista de la plantilla inicial.
- `COURSE_CONTEXT.md` usa varias notas de origen y `S01-SOURCE-MAP.md` no declara `source_heading`; debe acordarse cómo representar fuentes múltiples sin perder la referencia primaria obligatoria.
- La ruta de `S01-SOURCE-MAP.md` parece relativa al curso y no a `vault.root`; antes de corregirla hay que confirmar la convención en la nota de producción digital.

La infraestructura web no transforma ni publica S01 mientras estas decisiones permanezcan abiertas y el paquete siga con visibilidad interna.
