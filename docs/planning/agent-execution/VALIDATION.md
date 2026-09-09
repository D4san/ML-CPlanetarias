# Validación y evidencia

Este documento traduce los criterios del plan a comprobaciones. Los protocolos de calidad/procedencia vigentes siguen siendo obligatorios. No ejecutar toda la matriz en cada cambio de texto; aplicar gates proporcionales y completar la matriz integrada en H01.

## Gates por tipo de tarea

| Cambio                        | Mínimo requerido                                                                                                      |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Plan, guía, plantilla o ficha | Formato, enlaces/rutas, coherencia de IDs/dependencias y revisión del contenido.                                      |
| Skill                         | Instrucciones skill-creator, ensayo con entrada/salida, validación de estructura y espejos cuando se distribuyan.     |
| Tipos/esquemas/configuración  | Casos válidos e inválidos, compatibilidad, check y builds raíz/subruta.                                               |
| Refactorización de escena     | Unitarias/integración afectadas, flujo de navegador y comparación visual de estados previos.                          |
| Nueva interacción             | Ficha previa, pruebas de usuario, teclado/foco, axe, sin JS, móvil/proyección, movimiento reducido y snapshots Linux. |
| Ejemplo/definición            | Afirmación respaldada, fuente consultada, límites, derechos, referencias por ID y revisión pedagógica.                |
| Imagen                        | Ficha de propósito, inspección al tamaño real, alt/pie, procedencia y distinción conceptual/simulado/observado.       |
| Integración de sesiones       | Matriz de disponibilidad, modos y rutas, builds, E2E, editorial y visual.                                             |

Un fallo previo se registra aparte. Un gate requerido que no pudo ejecutarse queda pendiente. El informe debe identificar qué criterio afecta; nunca cambiarlo a aprobado por haber probado algo parecido.

## Comandos vigentes

Leer package.json y .nvmrc antes de ejecutar. Usar Node/npm fijados por el repositorio; instalar navegadores/dependencias del proyecto solo cuando falten. A la redacción del plan, los comandos siguientes existen.

En PowerShell, `npm.cmd` evita ambigüedades con scripts de la shell. En otras plataformas usar `npm`.

```powershell
npm.cmd run check
npm.cmd run test:unit
```

Para cada comando guardar salida y código final. No continuar a pruebas de navegador si el build falló.

### Raíz

Reservar antes el puerto 4321 y el directorio dist. Si hay un servidor previo, comprobar si pertenece a la tarea; no detener servicios ajenos. El preview 4322 que usa el usuario no es el servidor de pruebas.

```powershell
$taskPreviousBasePath = $env:BASE_PATH
try {
  Remove-Item Env:BASE_PATH -ErrorAction SilentlyContinue
  npm.cmd run build
  if ($LASTEXITCODE -ne 0) { throw 'Falló build raíz' }
  npm.cmd run test:e2e
  if ($LASTEXITCODE -ne 0) { throw 'Falló E2E raíz' }
} finally {
  $env:BASE_PATH = $taskPreviousBasePath
}
```

### Subruta

```powershell
$taskPreviousBasePath = $env:BASE_PATH
try {
  $env:BASE_PATH = '/preview'
  npm.cmd run build:subpath
  if ($LASTEXITCODE -ne 0) { throw 'Falló build de subruta' }
  npm.cmd run test:e2e
  if ($LASTEXITCODE -ne 0) { throw 'Falló E2E de subruta' }
} finally {
  $env:BASE_PATH = $taskPreviousBasePath
}
```

No hacer builds raíz y subruta en paralelo: ambos escriben dist. No usar un build raíz con un servidor configurado para otro prefijo. Playwright puede reutilizar un servidor en modo local: comprobar que sirve el perfil y build recién generados.

Para una tarea de estación se pueden ejecutar sus pruebas con los filtros reales de Playwright/Vitest; documentar el comando exacto y justificar el alcance. E07 y H01 ejecutan integración completa.

### Visual Linux

```text
npm run test:visual:linux
```

Actualizar referencias únicamente cuando el cambio visual sea intencional, dentro de Linux fijado y tras revisar imágenes:

```text
npm run test:visual:update:linux
```

Revisar compose.visual.yaml y las versiones vivas antes de correr. Si Docker no inicia, dejar ese gate pendiente. Las capturas Windows sirven para inspección local, no para aprobar goldens Linux. No ejecutar un compose con limpieza destructiva para intentar resolver un bloqueo.

### Compatibilidad adicional

H01 revisa también `npm run test:e2e:cross-browser` cuando los cambios afectan navegación, popovers o comportamiento de foco entre navegadores. Si falta un navegador requerido, registrar la brecha. En el CI actual los navegadores alternativos se contemplan en ejecución programada; mantener coherencia con el protocolo y no prometer una comprobación que no ocurrió.

## Matriz de perfiles

Los perfiles se construyen con fixtures o copias controladas de configuración. Restaurar el archivo original en finally y verificarlo. Preferir directorios de salida aislados cuando se añada soporte. Ningún fixture queda en docs/content público.

| Perfil | Interacción                    | Docente                 | Vista        | Sesiones/rutas        | Qué demuestra                                                     |
| ------ | ------------------------------ | ----------------------- | ------------ | --------------------- | ----------------------------------------------------------------- |
| P01    | Interactiva                    | Desactivado             | Presentación | S01, tres rutas       | Flujo habitual y tarjetas.                                        |
| P02    | Directa                        | Desactivado             | Presentación | S01, solo catálogo    | Explicaciones visibles, selector restringido, reset correcto.     |
| P03    | Interactiva                    | Activado                | Lectura      | S01, solo espectro    | Ayudas contextualizadas y contenido completo.                     |
| P04    | Directa                        | Activado                | Lectura      | S00 + S01             | Contenido reutilizado y definiciones completas.                   |
| P05    | Ambas mediante dos ejecuciones | Ambos mediante fixtures | Actividades  | S01                   | Responder, feedback y reset; cambiar modo no completa ejercicios. |
| P06    | Default global interactivo     | Global true, S01 false  | Presentación | S00 + S01             | Precedencia de overrides, incluido false explícito.               |
| P07    | Directa                        | Activado                | Presentación | Solo S00, sin rutas   | Sesión sin selector/ruta ficticia; S01 y alias ausentes.          |
| P08    | Cualquiera válida              | Cualquiera válida       | Inicio       | Ninguna sesión        | Estado vacío, sin enlaces a sesiones excluidas.                   |
| P09    | Cualquiera válida              | Cualquiera válida       | Presentación | S01, solo seguimiento | Actualización de todos los nodos del flujo y límites de la ruta.  |

A nivel de componente/configuración cubrir el producto de 2 modos de interacción × 2 valores docentes × 3 vistas. En navegador usar los perfiles anteriores más los casos que descubra la integración; evitar repetir escenarios equivalentes sin motivo.

## Matriz de comportamientos y aceptación

| ID   | Comprobación           | Resultado exigido                                                                                            |
| ---- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| QA01 | Bibliografía e inicio  | Cada sesión abre su diapositiva 0; referencias propias y acceso posterior.                                   |
| QA02 | Secuencia              | Todas las partes se recorren en orden, una principal por vez; primer/último paso y fronteras correctos.      |
| QA03 | URL e historial        | Hash viejo/nuevo, atrás/adelante, recarga y retorno entre vistas; recuperación útil ante inválido.           |
| QA04 | Configuración          | IDs/listas/overrides validados; ruta deshabilitada no se reactiva por URL ni reset.                          |
| QA05 | Exclusión de páginas   | Build sin páginas/alias omitidos y HTTP 404; navegación/backlinks sin enlaces rotos.                         |
| QA06 | Tarjetas y actividades | Directo e interactivo conservan significado; foco/cierre correctos y ejercicios sin respuestas automáticas.  |
| QA07 | Ejemplo/glosario       | Destinos válidos, fuente pertinente, definición breve/completa, retorno al contexto.                         |
| QA08 | Docente/precauciones   | Ayudas según configuración; límites esenciales presentes incluso con docente apagado.                        |
| QA09 | Responsive             | 1920×1080, 1440×900 y 390×844; además diálogo largo a 390×480.                                               |
| QA10 | Accesibilidad          | Teclado, foco, semántica, contraste, axe, movimiento reducido y sin JS.                                      |
| QA11 | Contenido              | Inventario completo, exoplanetas/estrellas justificadas, fuentes/derechos y ausencia de ejemplos galácticos. |
| QA12 | Fork reproducible      | Instalación limpia, identidad diferente, selección de contenido, otra subruta y guía suficiente.             |

### Qué medir visualmente

- En proyección 1920×1080, contenido principal de cada subslide interactiva dentro del área disponible; texto esencial al menos al tamaño comprobado en piloto (17,5 px), con preferencia por 18 px o más.
- En perfiles directos o con ayudas docentes extensas, permitir scroll vertical explícito y legible; no encoger texto para satisfacer artificialmente una prueba de altura.
- En móvil, ancho del documento no mayor que viewport; etiquetas y controles no se superponen. Área accionable al menos 24×24 CSS px, preferiblemente 44×44 cuando el diseño lo permita.
- Los diálogos extensos permiten llegar al final, cerrar y devolver foco. El botón de cierre no queda oculto detrás del contenido.
- Gráficos con ejes/unidades y leyendas legibles; color acompañado por forma/texto. Cinco flechas de Pregunta realmente salen del centro y sus puntas quedan visibles.
- Capturas tras fuentes listas y marcador de estado real; evitar esperas fijas por tiempo.

### Qué revisar científicamente

- Cada afirmación nueva con números o resultados tiene ubicación en una fuente consultada.
- La imagen, caption y ejemplo describen el mismo caso.
- No se salta de dato a modelo omitiendo la pregunta, representación, baseline/evaluación y límites pertinentes.
- Una demostración conceptual se declara así, sin simular datos medidos.
- Bibliografía atribuida por edición/capítulo realmente comprobado.
- Los términos se definen sintéticamente sin borrar distinciones importantes.

## Evidencia durable

Cada informe evidencia/<ID>.md contiene:

- tarea, revisión/base y archivos modificados;
- perfiles y entorno;
- AC por AC: resultado, observación y prueba o ruta que lo demuestra;
- comandos exactos con fecha y código de salida;
- capturas/artefactos en output con resumen textual durable;
- fuentes/ubicaciones si hubo contenido científico;
- fallos y limitaciones, responsable de reparación y estado propuesto.

No depender exclusivamente de output: puede limpiarse. No guardar logs privados, credenciales ni copias de libros. Las evidencias de este plan son informes de trabajo; no contienen datos personales de estudiantes.

## Cierre

La tarea se acepta cuando cumple todos sus AC, su criterio de logro y los gates requeridos. Si el revisor devuelve un defecto, vincularlo a un AC o regla concreta, repararlo y repetir la comprobación pertinente. La revisión completa de H02 distingue implementación, aptitud editorial y autorización de publicación.
