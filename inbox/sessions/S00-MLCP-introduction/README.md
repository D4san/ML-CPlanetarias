---
packet_id: S00-MLCP-introduction
kind: session-packet
status: drafting
origin: repo
source_path: docs/guides/FORK_CONFIGURATION.md
source_heading: Configurar el piloto en un fork
visibility: internal
publish_ready: false
rights: pending
---

# S00 — Introducción al curso y al fork

Paquete mínimo de preparación para una futura sesión introductoria. S00 explica cómo leer la
cadena científica del curso, cómo recorrer sus vistas y cómo adaptar la configuración del fork.
La sesión todavía no está integrada en `src/`, `docs/content/` ni en el build.

## Estado editorial

- `status: drafting` y `visibility: internal` describen una preparación revisable.
- `origin: repo` usa la ruta real `docs/guides/FORK_CONFIGURATION.md`; no se inventa una nota de
  Obsidian.
- `publish_ready: false` y `rights: pending` se conservan porque la revisión editorial, los
  derechos y la autorización de publicación siguen abiertos.
- La configuración puede seleccionar `S00` en el contrato vivo, pero la página/adaptador de S00
  aún debe implementarse en G02.

## Recorridos

- **Estudiante:** leer propósito y cadena; abrir Presentación, Lectura o Actividades; localizar un
  ejemplo y un concepto cuando existan registros públicos; completar el ejercicio de logro. No
  necesita instalar Node para leer un despliegue.
- **Tutor:** escoger sesiones, modos y vista en `config/course.config.ts`; dejar S00 sin rutas;
  probar primero un fork controlado.
- **Colaborador:** leer los contratos, mantener procedencia `origin: repo`, trabajar en `inbox/`
  y proponer promoción solo después de revisión; `inbox/` no entra al build.

## Inventario

| Orden | Estación | Unidad | Estado |
| ---: | --- | --- | --- |
| 0 | bibliografía | `s00-bibliography` | preparado con archivos locales consultados |
| 1 | propósito | `s00-purpose-chain` | drafting |
| 2 | estudiante | `s00-student-orientation` | drafting |
| 3 | tutor | `s00-tutor-fork` | drafting |
| 4 | colaborador | `s00-collaborator-contract` | drafting |
| 5 | logro | `s00-achievement-check` | drafting; ejecución reservada a G02/G03 |

El detalle de unidades, ejemplos, conceptos, precauciones, preguntas y lagunas está en
[`SESSION_PACKET.md`](./SESSION_PACKET.md). La evidencia de esta entrega está en
[`docs/planning/agent-execution/evidence/G01.md`](../../../docs/planning/agent-execution/evidence/G01.md).

## Rutas y comandos contrastados

- Node vivo: `.nvmrc` contiene `24.14.0`; `package.json` fija `npm@11.9.0` y exige Node `>=22.12.0
  <25`.
- Instalación y calidad: `npm ci`, `npm run check`, `npm run test:unit`.
- Builds: `npm run build` y `npm run build:subpath` (`BASE_PATH=/preview`).
- Workflow de Pages: `.github/workflows/deploy-pages.yml` usa `BASE_PATH=/ML-CPlanetarias` y
  `SITE_URL=https://d4san.github.io`; publicar requiere autorización expresa.
- Rutas actuales: `/sistema/` y `/sistema/s01/` corresponden al piloto S01. S00 no tiene ruta
  generada; `/sesiones/s00/` es el destino previsto por el helper de sesiones cuando G02 agregue
  su entrada y adaptador.

La comprobación exacta y sus códigos están en `evidence/G01.md`.
