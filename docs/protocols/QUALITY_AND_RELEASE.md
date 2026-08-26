# Protocolo de calidad y entrega

## Comandos estables

```text
npm run check          formato, lint, tipos, esquemas y skill
npm run test:unit      lógica e islas React con cobertura
npm run build          salida estática de producción
npm run build:subpath  build bajo /preview
npm run test:e2e       flujos, accesibilidad y movimiento reducido
npm run test:visual:linux  snapshots desktop y móvil en Linux fijado
```

`test:e2e` y `test:visual` se ejecutan contra `astro preview` de un build, no contra el servidor de desarrollo.

## Gates proporcionales

- Texto o metadatos: esquema, enlaces, procedencia y build.
- Estilos: `check`, build, móvil, teclado y snapshots afectados.
- Interacción: pruebas unitarias de estado, interacción centrada en el usuario, E2E, axe, movimiento reducido y snapshots de estados significativos.
- Datos o cómputo: además, unidades, semillas, baseline científico, límites y reproducibilidad.

Una captura visual nunca sustituye assertions funcionales. Axe detecta una parte de los problemas de accesibilidad; el recorrido con teclado, el significado de gráficos y la corrección científica requieren revisión explícita.

## Regresión visual determinista

Los golden snapshots se actualizan solo en Linux con la imagen oficial de Playwright fijada en CI. La versión de `@playwright/test` y la etiqueta de la imagen deben cambiar juntas. No aprobar baselines generados en Windows.

`npm run test:visual:update:linux` regenera los baselines dentro de esa imagen. Revisarlos visualmente antes de aceptarlos.

- esperar `document.fonts.ready` y un marcador `data-ready="true"`;
- no usar esperas por tiempo fijo;
- servir fuentes y fixtures localmente;
- desactivar o sembrar animaciones programáticas;
- justificar cualquier tolerancia local de píxeles.

Los artefactos efímeros viven en `output/playwright/`; solo los golden snapshots se versionan.

## CI y publicación

CI valida Node fijado, `npm ci`, calidad, tests, build raíz y build bajo `/preview`. Los navegadores funcionales alternativos pueden correr semanalmente.

`.github/workflows/deploy-pages.yml` publica el build estático en GitHub Pages después de cada push a
`main` y también permite ejecución manual. El workflow construye con `BASE_PATH=/ML-CPlanetarias`
y `SITE_URL=https://d4san.github.io`, sube `dist/` como artefacto y despliega al entorno
`github-pages`. La URL pública verificada es
`https://d4san.github.io/ML-CPlanetarias/`; la sesión 1 vive en `/sistema/`.

Una nueva publicación requiere gates completos, `site`/`base` correctos y verificación posterior de
la URL. La visibilidad del repositorio y la licencia se gestionan por separado del sitio publicado.
