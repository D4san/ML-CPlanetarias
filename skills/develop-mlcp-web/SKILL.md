---
name: develop-mlcp-web
description: Construir, editar y revisar el sitio web educativo de ML Ciencias Planetarias en este repositorio. Usar al trabajar con páginas Astro o MDX, islas React, visualizaciones e interacciones, sistema visual, paquetes inbox que deban aterrizarse, glosario bidireccional, pruebas web o gates de publicación del curso.
---

# Desarrollar MLCP Web

Construir el producto web sin romper la frontera con Obsidian, la procedencia ni la capacidad de enseñar el material.

## Preflight

1. Leer `AGENTS.md`, `README.md` y `docs/architecture/OBSIDIAN_BRIDGE.md`.
2. Leer `docs/architecture/decisions/ADR-0001-site-stack.md` para trabajo técnico.
3. Clasificar la tarea y cargar solo los contratos pertinentes:
   - contenido o estados: `docs/protocols/CONTENT_LIFECYCLE.md`;
   - fuentes, datos o figuras: `docs/protocols/PROVENANCE_AND_RIGHTS.md`;
   - interacción: `docs/protocols/INTERACTION_SPEC.md`;
   - estilo o layout: `docs/protocols/VISUAL_SYSTEM.md`;
   - pruebas o entrega: `docs/protocols/QUALITY_AND_RELEASE.md`.
4. Si la tarea parte de `inbox/`, leer `inbox/README.md`, el manifiesto canónico y sus archivos auxiliares.

## Flujo de trabajo

1. Confirmar la pregunta de aprendizaje, audiencia, objeto mínimo y límite de la página.
2. Verificar `status`, `visibility`, `publish_ready`, procedencia y derechos. No cargar ni copiar automáticamente `inbox/` al sitio.
3. Para una interacción principal, completar una ficha desde `docs/specs/interactions/_template.md` antes de implementarla.
4. Usar Astro/HTML/CSS para contenido y React solo cuando exista estado interactivo real. No añadir otro framework.
5. Reutilizar `src/styles/tokens.css`, layouts y componentes existentes. Mantener una lectura útil sin JavaScript, resumen de estado, reinicio, teclado, móvil y movimiento reducido.
6. Mantener conceptos por ID y calcular relaciones inversas durante el build; no duplicar backlinks manuales.
7. Ejecutar gates proporcionales. Para interacciones, incluir como mínimo `npm run check`, `npm run test:unit`, `npm run build:subpath` y las suites Playwright afectadas.
8. Registrar en `outbox/` cualquier corrección o decisión que deba regresar al vault.

## Límites

- No inventar remoto, URL, licencia, publicación, datos, evidencia científica ni autorización de derechos.
- No hacer commit, push ni deploy sin instrucción explícita.
- No usar una captura visual como sustituto de pruebas funcionales, accesibilidad o revisión científica.
- No convertir un microproblema teórico en notebook o resultado científico sin datos, baseline, métrica y límites.

## Entrega

Reportar rutas cambiadas, promesa e interacciones, fuentes usadas, comandos ejecutados, vistas verificadas y gates abiertos.
