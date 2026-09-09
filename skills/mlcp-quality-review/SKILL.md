---
name: mlcp-quality-review
description: Revisar entregas del curso ML Ciencias Planetarias con evidencia separada para código, contenido, diseño, procedencia y autorización editorial.
metadata:
  short-description: Revisión auditable de entregas MLCP
---

# Revisión de calidad MLCP

## Cuándo usarla

Usa esta skill cuando una tarea del plan de ejecución solicite revisión, aceptación, devolución o
matriz de requisitos. También sirve para auditar una entrega antes de integrarla en la web. No
convierte una prueba técnica en validación científica ni un contenido con buena redacción en
autorización de publicación.

## Entrada y salida

Lee la ficha de tarea, `AGENTS.md`, `docs/planning/agent-execution/VALIDATION.md`, la evidencia
entregada y los contratos o protocolos que la tarea declare. Entrega un informe que contenga:

- alcance, base y archivos revisados;
- matriz Rxx/ACxx con evidencia concreta o estado `pendiente`;
- pruebas reproducidas, entorno y salidas relevantes;
- hallazgos priorizados con condición de devolución;
- procedencia, derechos, visibilidad y `publish_ready` separados;
- decisión `aceptada`, `devuelta` o `bloqueada`, con siguiente acción.

## Flujo

1. **Identificar alcance.** Comprueba dependencias aceptadas, propietario de archivos, límites de
   la ficha y cambios realmente presentes. No aceptes por un mensaje del agente sin artefacto.
2. **Revisar cuatro capas.** Evalúa por separado (a) código y contratos, (b) contenido y fuentes,
   (c) diseño, accesibilidad y uso, y (d) procedencia, derechos y autorización editorial.
3. **Reproducir gates proporcionales.** Ejecuta las pruebas indicadas por la tarea; para la web
   incluye la ruta afectada y una subruta cuando corresponda. Registra fallos de entorno sin
   convertirlos en aprobación.
4. **Rastrear afirmaciones.** Cada afirmación fuerte necesita fuente y ubicación; una ilustración
   conceptual, un fixture o una simulación conserva ese tipo y sus límites.
5. **Decidir.** Acepta solo criterios demostrados. Devuelve el hallazgo al archivo o criterio
   responsable, preserva cambios ajenos y actualiza `BOARD.md` únicamente como integrador.

## Referencias de uso

- Para la matriz y estados, lee [review-matrix.md](references/review-matrix.md).
- Para ensayos controlados, lee [cases.md](references/cases.md).
- Para decidir qué skill acompaña una tarea, lee [skill-routing.md](references/skill-routing.md).

## Criterio de salida

Otra persona debe poder repetir la decisión con los archivos, comandos y límites registrados. Una
entrega queda abierta si falta una fuente, un asset inspeccionado, una prueba reproducible, una
superficie de disponibilidad o una autorización. Los espejos de skills se consideran parte de la
entrega cuando la ficha los exige; su ausencia debe aparecer como hallazgo explícito.
