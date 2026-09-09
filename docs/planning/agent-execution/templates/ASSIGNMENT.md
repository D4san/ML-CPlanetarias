# Prompt para asignar una tarea

Copiar el bloque siguiente y sustituir únicamente el ID de tarea, el responsable y las reservas. El ejemplo inicial válido es A01. No asignar una tarea cuyas dependencias no estén aceptadas en el tablero.

```text
Trabaja en el repositorio ML Ciencias Planetarias UdeA.

Tu tarea es [ID: por ejemplo A01], descrita en:
docs/planning/agent-execution/tasks/[ID].md

Lee antes de trabajar:
1. AGENTS.md y README.md.
2. docs/architecture/OBSIDIAN_BRIDGE.md.
3. docs/planning/agent-execution/README.md.
4. docs/planning/agent-execution/CONTRACTS.md.
5. docs/planning/agent-execution/VALIDATION.md.
6. Tu ficha y sus entradas específicas.
7. Para cambios web, usa la skill local develop-mlcp-web y los protocolos pertinentes.
   Para crear skills, lee skill-creator. Para producir imágenes, lee la skill correspondiente.

Las dependencias aceptadas son: [IDs y enlaces a evidencia].
Tu responsable de integración es: [persona/agente].
Puedes editar: [rutas de la ficha y reservas concretas].
Archivos compartidos reservados: [rutas y propietario].
El estado de la tarea se registra en BOARD.md por el integrador.
Puedes crear tu propio evidence/[ID].md y output/[ID]/.
No tienes asignadas otras tareas del plan.

Ejecuta los pasos de la ficha hasta entregar un resultado revisable.
Conserva los cambios locales existentes. Antes de modificar un archivo, confirma que
está dentro de tu asignación y que las interfaces de tus dependencias siguen vigentes.
Si falta una dependencia, identifica el faltante; no inventes su API ni dupliques su trabajo.

Usa las decisiones ya fijadas. Si necesitas cambiar un contrato, informa al integrador
del problema concreto, propuesta mínima, consumidores afectados y pruebas necesarias.
Continúa las partes independientes mientras se resuelve.

No hagas commit, push, deploy, instalación de plugins ni modificaciones al vault.
No publiques contenido de inbox ni cambies su estado editorial para pasar una prueba.
La tarea H03 tiene condiciones de autorización adicionales y no está incluida.

Reserva con el integrador cualquier build o prueba que use dist, puertos o output compartido.
Ejecuta las comprobaciones proporcionales y conserva los resultados reales.
No declares un criterio aprobado si una herramienta faltó o no lo comprobaste.

Entrega usando docs/planning/agent-execution/templates/DELIVERY.md:
archivos, resultado, tabla de AC con evidencia, comandos y códigos de salida,
fuentes/figuras revisadas si aplica, pendientes y estado propuesto.
Marca entregada; la aceptación la realiza el revisor.
```

## Ejemplo de encargo inmediato

```text
Ejecuta A01 del plan docs/planning/agent-execution.
No tiene dependencias. Tu alcance es levantar la base actual y registrar reservas.
Conserva el piloto y los cambios locales. Entrega evidence/A01.md con los resultados
reales y la matriz de archivos compartidos. No implementes A02 todavía.
```

## Al devolver una tarea

```text
Repara la tarea [ID], devuelta por [ACxx incumplido].
Reproducción: [perfil, URL, pasos].
Esperado: [resultado del criterio].
Observado y evidencia: [resultado, archivo/captura/log].
Conserva los criterios que ya pasaron. Repite la prueba afectada y las comprobaciones
de integración que justifique el cambio. Actualiza evidence/[ID].md.
```
