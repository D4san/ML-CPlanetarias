# Matriz de revisión MLCP

## Capas independientes

| Capa | Pregunta de cierre | Evidencia mínima | Estado si falta |
| --- | --- | --- | --- |
| Código/contrato | ¿Los tipos, rutas, IDs y estados producen el comportamiento declarado? | prueba o gate reproducible + archivos exactos | `pendiente` o `devuelta` |
| Contenido/fuente | ¿La afirmación, ejemplo y definición tienen fuente/ubicación o un límite claro? | claim audit, ficha o paquete con procedencia | `pendiente`; nunca inferir |
| Diseño/uso | ¿La persona puede leer, operar y recuperar el estado en teclado, móvil y sin JS cuando aplique? | E2E/a11y/render o revisión contextual | `devuelta` si una ruta esencial falla |
| Editorial/derechos | ¿El estado, visibilidad, licencia y autorización coinciden con el uso? | metadatos y decisión editorial | `bloqueada` si se pretende promover |

## Estados

- `aceptada`: todos los criterios de la tarea tienen evidencia y los límites están registrados.
- `devuelta`: hay un defecto reparable que contradice un criterio o un gate.
- `bloqueada`: falta una autoridad, fuente, permiso o entorno externo; no se rellena con una
  suposición.
- `pendiente`: la tarea no puede cerrarse porque una dependencia o criterio todavía no se ha
  ejecutado.

La puntuación, el porcentaje de cobertura o un build verde no sustituyen las capas de contenido y
editorial. Una tarea puede tener código aceptable y permanecer abierta por procedencia.

## Registro por criterio

Usa esta fila para cada `ACxx` y `Rxx`:

```text
criterio | estado | archivo/URL + ubicación | comando o inspección | límite | siguiente acción
```

No marques un criterio con la palabra “cumplido” sin la ubicación del artefacto. Si el hallazgo
afecta una línea concreta, el integrador puede emitir un comentario en código además del informe.
