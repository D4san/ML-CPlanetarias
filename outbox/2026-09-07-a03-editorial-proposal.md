---
packet: COURSE-CONTEXT-MLCP / S01-ML-IA-metodos-estadisticos / S01-CONCEPTS / S01-SOURCE-MAP
artifact: docs/architecture/decisions/ADR-0002-course-content-contract.md
vault_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/03 Producción digital/Plan de producción oficial.md
vault_heading: Procedencia y promoción del material digital
kind: proposal
status: open
---

# Propuesta A03 · Procedencia y promoción editorial

El repositorio conserva cuatro paquetes internos en `inbox/`, todos en estado `drafting` y con
`publish_ready: false`. El piloto S01 integrado en código se mantiene como prototipo técnico
interno; su existencia en `/sistema/` no constituye una promoción editorial.

Se propone conservar dos variantes explícitas de procedencia:

- `origin: obsidian` con `source_vault: DASAN`, `source_note` relativo al vault y
  `source_heading` real;
- `origin: repo` con `source_path` relativo al repositorio y existente en la revisión evaluada,
  sin inventar un `source_note` de Obsidian.

Para la futura S00, la guía técnica parte de las rutas reales `README.md` y
`docs/guides/FORK_CONFIGURATION.md`. G01 deberá convertir esa documentación en una sesión
revisable, registrar sus pruebas y conservar la compatibilidad con la procedencia de Obsidian
si después se incorpora una guía pedagógica desde el vault.

## Decisiones solicitadas al vault

1. Confirmar qué partes de los paquetes S01 pueden atomizarse como conceptos y bajo qué
   encabezados/fuentes se revisarán.
2. Confirmar el alcance editorial de una futura S00 y si la guía de forks seguirá siendo una
   síntesis originada en el repositorio o recibirá además un guion de Obsidian.
3. Mantener `drafting` hasta que procedencia, derechos, límites y revisión estén documentados.

Esta salida no modifica notas del vault ni cambia estados de publicación.
