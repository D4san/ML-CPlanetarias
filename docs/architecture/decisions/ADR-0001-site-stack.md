# ADR-0001 — Astro estático con islas React

- Estado: aceptada
- Fecha: 2026-08-17
- Alcance: infraestructura web local; no decide remoto, dominio ni publicación

## Contexto

El producto será principalmente editorial: sesiones, conceptos, ecuaciones, fuentes y material de transferencia docente. Algunas páginas necesitarán visualizaciones y simulaciones con bastante estado compartido. La salida debe poder servirse como archivos estáticos y tolerar una futura subruta de GitHub Pages.

## Decisión

Usar Astro 7 con salida `static`, Markdown/MDX tipado para contenido revisado y React 19 como único runtime de islas interactivas.

- Astro/HTML/CSS resuelven estructura, navegación, contenido y componentes sin estado.
- React se hidrata solo para una interacción que lo necesite; no se convierte el sitio completo en SPA.
- Markdown es la opción por defecto. MDX se reserva para contenido revisado que realmente inserte componentes.
- KaTeX se compila durante el build; las ecuaciones no requieren un runtime matemático en el navegador.
- El sitio se prueba con `/` y con `BASE_PATH=/preview` para detectar rutas incompatibles con GitHub Pages.
- `site`, dominio, remoto y ruta final quedan sin definir hasta que exista una instrucción de publicación.

Las colecciones cargan únicamente `docs/content/sessions`, `docs/content/concepts` y `docs/content/exercises`. `inbox/` nunca forma parte del grafo de build.

## Consecuencias

- La mayor parte de cada página llega como HTML y conserva una lectura útil sin interacción.
- Las visualizaciones complejas pueden usar el ecosistema React sin enviar React a páginas estáticas.
- No se mezclan React, Preact, Svelte u otros runtimes.
- Toda URL interna y todo recurso público deben respetar `import.meta.env.BASE_URL`.
- Una migración futura sigue siendo posible porque el contenido público permanece en Markdown/MDX con metadatos explícitos.

## Decisiones aplazadas

- URL, organización, remoto y nombre del repositorio en GitHub.
- Publicación con GitHub Pages u otro proveedor.
- Licencia del curso y de sus artefactos.
- Incorporación de D3, Canvas, WebGL o un catálogo de componentes; se decidirán por interacción.

## Fuentes técnicas

- [Astro: contenido con loaders](https://docs.astro.build/en/reference/content-loader-reference/)
- [Astro: islas y componentes de framework](https://docs.astro.build/en/guides/framework-components/)
- [Astro: integración React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Astro: integración MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Astro: GitHub Pages y base path](https://docs.astro.build/en/guides/deploy/github/)
