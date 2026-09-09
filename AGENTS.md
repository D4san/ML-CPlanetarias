# AGENTS.md

## Propósito del repositorio

Este repositorio aterriza el curso **ML Ciencias Planetarias** en material reproducible: notas publicables, notebooks, ejercicios, gráficos originales, código y una futura página web.

El repositorio es un proyecto agéntico independiente del vault de Obsidian. Su contexto de origen está descrito en `docs/architecture/OBSIDIAN_BRIDGE.md`.

## Estilo de comunicación del agente

- Escribir en español directo, afirmativo, específico y con voz activa.
- Empezar por el resultado, la decisión o el hallazgo; elegir después la estructura que mejor lo comunique.
- Variar la forma entre explicación, secuencia, tabla, ejemplo, preguntas o checklist. El agente no debe repetir una plantilla fija.
- Evitar como tic las fórmulas `no es X sino Y`, `no se trata de X sino de Y`, `no es solo X: es Y` y equivalentes. Explicar directamente la función o relación de cada elemento.
- Presentar primero la línea principal. Cerrar con límites, tensiones, incertidumbres o preguntas abiertas cuando aporten valor.
- Recibir las correcciones del usuario, incorporarlas en el material y continuar con la tarea concreta.

## Producto final del curso

Este repo no es solo un almacén de notebooks: debe convertirse en un sitio web educativo del curso, potencialmente publicado con GitHub Pages. La infraestructura web vigente está decidida en `docs/architecture/decisions/ADR-0001-site-stack.md`: Astro estático con React para islas interactivas. Esta decisión no define remoto, URL, licencia ni publicación; esos aspectos siguen abiertos y no deben inventarse.

La web deberá poder ofrecer, de forma navegable y reutilizable:

- una portada y una explicación del propósito del curso;
- sesiones quincenales con guion, objetivos, preguntas, misconcepciones, red conceptual y fuentes;
- un glosario bidireccional: concepto → sesiones, ejercicios y páginas; sesión → conceptos;
- las tres líneas conectadas del curso: problemas astronómicos, teoría formal ML y aplicaciones;
- notas y ecuaciones legibles, gráficos originales y referencias de procedencia;
- notebooks ejecutables, con enlaces a Colab cuando estén probados;
- ejercicios y desafíos astronómicos acotados, separados de las prácticas completas;
- material que permita a los tutores reutilizar una sesión o construir una electiva.

Cada sesión debe poder recorrer la cadena:

```text
pregunta científica → datos/representación → paradigma → tarea → familia de modelo
→ línea base → métrica/evaluación → interpretación y límites → transferencia docente
```

El `inbox/` puede contener el diseño teórico detallado que alimenta la web, pero `docs/` solo recibe una versión revisada y publicable.

## Lectura obligatoria antes de trabajar

1. Leer este archivo.
2. Leer `README.md`.
3. Leer `docs/architecture/OBSIDIAN_BRIDGE.md`.
4. Si la tarea entra por `inbox/`, leer `inbox/README.md` y el paquete concreto.
5. Si la tarea devuelve observaciones al vault, leer `outbox/README.md`.
6. Para trabajo web, leer la ADR activa y el protocolo pertinente de `docs/protocols/`.
7. Para crear o revisar una página interactiva, usar la skill local `$develop-mlcp-web`.

## Fuentes de verdad

- Obsidian/DASAN conserva la planeación pedagógica, el grafo de conceptos, los guiones completos, las decisiones y las fuentes privadas.
- Este repo conserva el aterrizaje reproducible y el material que pueda convertirse en producto.
- `docs/planning/agent-execution/BOARD.md` conserva el estado operativo de las tareas.
- `docs/planning/agent-execution/BITACORA.md` conserva el recorrido de trabajo: quién hizo qué, qué se decidió, qué ideas quedan abiertas y qué debe ocurrir después.
- `source_note` y `source_heading` son obligatorios para cualquier paquete que venga de Obsidian.
- Las rutas compartidas deben ser relativas al vault. La ruta absoluta local se resuelve solo desde `config/obsidian.local.yaml`, que está ignorado por Git.

## Espacio de trabajo y bitácora

Cada tarea debe dejar una entrada en [BITACORA.md](docs/planning/agent-execution/BITACORA.md), además de su evidencia específica cuando la tarea la requiera.

- Al comenzar, registrar fecha, tarea, responsable, alcance y archivos reservados.
- Al avanzar, registrar resultados, comandos o comprobaciones relevantes, decisiones y problemas encontrados.
- Al cerrar, registrar el estado propuesto, la evidencia, la persona o agente que debe revisar y la siguiente acción.
- Las ideas se registran como propuestas abiertas. Solo se convierten en requisito, cambio de alcance o decisión cuando se actualiza el documento que tiene autoridad para ello.
- `BOARD.md` sigue siendo la autoridad del estado (`pendiente`, `en curso`, `entregada`, `aceptada`, `devuelta`, `bloqueada` o `no autorizada`); la bitácora explica cómo se llegó a ese estado.
- No registrar credenciales, datos privados, copias de libros ni información personal. Enlazar rutas y evidencias del repositorio.

## Reglas para agentes

- No asumir una ruta local del vault si no existe `config/obsidian.local.yaml`.
- No editar silenciosamente el vault. Las observaciones y propuestas regresan por `outbox/`.
- No transformar automáticamente un paquete de `inbox/` en una página pública.
- No copiar libros completos, extracciones privadas, credenciales, datos no redistribuibles ni adjuntos sin licencia.
- Mantener la procedencia bibliográfica y la distinción entre definición de fuente, paráfrasis del curso y decisión pedagógica.
- No saltar de un dataset a un modelo sin pregunta científica, representación, línea base, métrica y límites.
- Diferenciar una demostración ejecutable de evidencia científica.
- No hacer `commit`, `push`, crear remotos ni publicar GitHub Pages sin una instrucción expresa.
- No cargar `inbox/` desde el build. El contenido web se obtiene únicamente de las colecciones aprobadas en `docs/content/`.
- No implementar una interacción principal sin una ficha en `docs/specs/interactions/`.
- Reutilizar los tokens y componentes del sistema visual; no crear una estética paralela por página.
- Ejecutar gates proporcionales según `docs/protocols/QUALITY_AND_RELEASE.md` y probar también una subruta.

## Fuentes canónicas de la infraestructura web

- La elección técnica vive en `docs/architecture/decisions/`.
- Los estados y la promoción viven en `docs/protocols/CONTENT_LIFECYCLE.md`.
- La procedencia y los derechos viven en `docs/protocols/PROVENANCE_AND_RIGHTS.md`.
- El contrato interactivo y visual vive en `docs/protocols/INTERACTION_SPEC.md` y `VISUAL_SYSTEM.md`.
- Los comandos y gates viven en `docs/protocols/QUALITY_AND_RELEASE.md`.
- Los esquemas ejecutables viven en `schemas/`; la prosa no debe contradecirlos.

## Flujo de trabajo

```text
paquete de Obsidian → inbox → revisión/aterrizaje → docs, notebooks o exercises
        ↑                                      ↓
        └────────────── outbox ← observaciones y decisiones
```

El estado normal de un paquete es `intake` hasta que una persona confirme su alcance y visibilidad.
