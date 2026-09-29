# ML Ciencias Planetarias UdeA

Fundación de un sitio educativo extremadamente interactivo para **enseñar ML en ciencias planetarias y enseñar a enseñarlo**. El repositorio separa con rigor el diseño privado en Obsidian, los paquetes de trabajo y el producto web reproducible.

La infraestructura usa Astro estático y React solo para islas interactivas. El código se versiona en
el repositorio privado [D4san/ML-CPlanetarias](https://github.com/D4san/ML-CPlanetarias) y el prototipo
se sirve públicamente en [d4san.github.io/ML-CPlanetarias](https://d4san.github.io/ML-CPlanetarias/).
Cada push a `main` reconstruye y publica el sitio mediante GitHub Pages. La licencia del curso sigue
pendiente de decisión.

## Inicio rápido

Requiere Node 22.12 o superior; la versión reproducible recomendada está en `.nvmrc`.

```bash
npm ci
npm run dev
```

Comandos principales:

```bash
npm run check
npm run test:unit
npm run build
npm run build:subpath
npm run test:e2e
npm run test:visual:linux
```

Los E2E usan el build de producción. Ejecuta `npm run build` antes de Playwright cuando trabajes fuera de `npm test`.
Los snapshots se comparan en la imagen Linux fijada con `npm run test:visual:linux`; solo actualízalos de forma intencional con `npm run test:visual:update:linux` y revisa las imágenes resultantes.

## Contrato del producto

La web deberá ofrecer:

- sesiones quincenales con pregunta, guion, misconcepciones, red conceptual y fuentes;
- navegación concepto ↔ sesiones, ejercicios y aplicaciones;
- las tres líneas conectadas: problemas astronómicos, teoría formal ML y aplicaciones;
- ecuaciones, gráficos originales, procedencia, límites y material de transferencia docente;
- notebooks ejecutables y enlaces a Colab solo después de probarlos.

Cada sesión recorre:

```text
pregunta científica → datos/representación → paradigma → tarea → familia de modelo
→ línea base → métrica/evaluación → interpretación y límites → transferencia docente
```

## Mapa del repositorio

```text
Obsidian/DASAN
  └── paquete con procedencia
          ▼
      inbox/                    diseño rico, no publicable por defecto
          │ revisión humana
          ├── docs/content/     único origen del build de contenido público
          ├── notebooks/        prácticas reproducibles
          ├── exercises/        consignas y desafíos
          └── glossary/         preparación de conceptos
          ▲
      outbox/                   observaciones que regresan al vault

src/                            aplicación Astro y sistema visual
tests/                          unit, E2E, a11y, motion y visual
schemas/ + scripts/             contratos ejecutables
.codex/skills/                  skill local del producto web
```

`inbox/` nunca se carga en el sitio. Las colecciones Astro solo leen `docs/content/sessions`, `docs/content/concepts` y `docs/content/exercises`, cuyos esquemas exigen revisión, visibilidad pública, autorización y procedencia portable.

## Decisiones y protocolos

- [Stack web](docs/architecture/decisions/ADR-0001-site-stack.md)
- [Puente Obsidian ↔ repo](docs/architecture/OBSIDIAN_BRIDGE.md)
- [Ciclo de contenido](docs/protocols/CONTENT_LIFECYCLE.md)
- [Procedencia y derechos](docs/protocols/PROVENANCE_AND_RIGHTS.md)
- [Código pedagógico](docs/protocols/PEDAGOGICAL_CODE.md)
- [Interacciones educativas](docs/protocols/INTERACTION_SPEC.md)
- [Sistema visual](docs/protocols/VISUAL_SYSTEM.md)
- [Calidad y entrega](docs/protocols/QUALITY_AND_RELEASE.md)

La skill local `$develop-mlcp-web` orquesta estos contratos. `AGENTS.md` conserva las invariantes de mayor autoridad.

## Evolución del curso

- [Plan ejecutable para agentes: tareas, dependencias y criterios de aceptación](docs/planning/agent-execution/README.md)
- [Primera retroalimentación: requisitos y fases](docs/planning/FEEDBACK-01.md)
- [Propuesta de configuración, estructura y flujos con agentes](docs/architecture/COURSE_EVOLUTION.md)

El piloto S01 incorpora bibliografía inicial, subslides en Pregunta e Instancia y modalidades
configurables para el tutor. Consulta la [guía de configuración para forks](docs/guides/FORK_CONFIGURATION.md).
Los documentos de evolución distinguen este piloto del trabajo pendiente.

## Estado

El sitio y sus herramientas siguen en fase de infraestructura. S01 está disponible como prototipo
público para revisión; conserva sus avisos de estado interno hasta completar la revisión editorial.
