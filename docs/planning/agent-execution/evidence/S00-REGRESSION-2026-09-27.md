# Regresión S00 — 2026-09-27

## Alcance

Comprobación del estado combinado S00/S01 después de incorporar a S00 las figuras de papers y los ajustes del sistema de presentación. Se conservaron los snapshots existentes; no se ejecutó ningún comando de actualización.

## Resultados

| Comprobación | Resultado |
|---|---|
| `npm run check` | Pasa: formato, ESLint, Astro y validadores. Astro informa 0 errores, 0 warnings y 0 hints. Persisten avisos conocidos por colecciones públicas vacías y 8 espejos de skills pendientes. |
| `npm run test:unit` | 105 pasan, 2 fallan, en 19 archivos (18 archivos pasan, 1 falla). |
| `npm run build` | Pasa; genera las 8 páginas. Se repitió al final para dejar `dist` con base raíz. |
| `npm run build:subpath` | Pasa; genera las 8 páginas con base `/preview`. |
| `npm run test:e2e` | 39 pasan en la base raíz. Incluye flujos de S00, S01, accesibilidad y movimiento reducido. |
| `BASE_PATH='/preview' npm run test:e2e` | 39 pasan bajo `/preview`, incluidos móvil, accesibilidad y movimiento reducido. |
| `npm run test:visual:linux` | No inicia: el pipe `dockerDesktopLinuxEngine` no existe; Docker Desktop no tiene disponible el motor Linux. |
| `npm run test:visual` (Windows) | 4 pasan, 16 fallan por diferencias de screenshot y 2 quedan omitidas. No es el entorno de comparación oficial configurado por el repositorio. |

## Fallas que requieren revisión

1. `src/components/react/S00LearningJourney.test.tsx`: el test busca `/HR 8799/i` en el texto alternativo de la figura. El texto actual describe sus ocho paneles y las observaciones coronagráficas, pero no nombra el sistema. Revisar si se debe añadir el nombre del sistema al texto alternativo.
2. El test espera que `.slide-rail__caption` no exista. S00 monta el `SlideRail` con `compactCaption` y deja `hideCaption` en su valor predeterminado (`false`), por lo que la leyenda sí se renderiza. Revisar el comportamiento deseado y alinear implementación y prueba.
3. La suite visual local compara contra baselines con tamaños/contenido distintos; por ejemplo, la captura de inicio espera 1440×4696 y recibió 1440×1406. Hasta correr la suite en el contenedor Linux configurado, estas diferencias no permiten separar cambios visuales reales del efecto del entorno.

## Cierre

Los builds y recorridos funcionales/accesibles pasan, también bajo subruta. La validación estática pasa. Queda pendiente resolver las dos expectativas unitarias y repetir la comparación de snapshots en Linux. No se alteraron snapshots durante esta revisión.
