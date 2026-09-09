# Verificación del piloto S01

Fecha: 2026-09-07. Alcance: bibliografía 0, subslides de Pregunta e Instancia, configuración del fork, tarjetas directas y preguntas docentes. El piloto sigue en revisión; no se publicó esta revisión.

## Resultados

| Comprobación | Resultado |
| --- | --- |
| Calidad estática | `npm run check` y `git diff --check` aprobados; Astro informa 0 errores, 0 advertencias y 0 indicaciones. |
| Pruebas unitarias e integración React | 45 pruebas aprobadas, incluidos configuración, navegación y modo directo/docente. |
| Build raíz y `/preview` | Ambos completados. |
| Playwright Chromium, axe y movimiento reducido bajo `/preview` | 30 pruebas aprobadas. |
| Proyección 1920 × 1080 | Las seis partes piloto muestran una parte principal; el contenido principal cabe en altura y el texto comprobado es de al menos 17,5 px. |
| Móvil 390 × 844 | Las seis partes carecen de desbordamiento horizontal; las etiquetas de las tres salidas izquierdas no se superponen a los botones siguientes. |
| Teclado, historial y modos | Pruebas de foco/cierre de tarjetas, enlaces profundos, historial, reinicio y conservación de la parte entre vistas aprobadas. |
| Sin JavaScript | Bibliografía y explicación conceptual de respaldo disponibles. |
| Perfil real de fork | Compilado temporalmente con `direct`, ayudas docentes y solo `catalog`: cinco definiciones visibles, acceso con foco sin diálogo, pregunta docente visible, sin desbordamiento móvil y reinicio que conserva la ruta habilitada. Configuración original restaurada. |
| Revisión visual local | Inspección en navegador del reparto en proyección, flechas hacia afuera, separación móvil, flujo de Instancia y tarjetas directas. |
| Snapshots Linux | Pendientes: el motor Docker no estuvo disponible. No se actualizaron referencias desde Windows. |

Los builds mantienen avisos por colecciones públicas vacías y tamaño de un bundle. El contenido del prototipo conserva su estado editorial; esta verificación no equivale a una promoción de `inbox/` ni a una validación científica de resultados.

## Continuación

La [matriz R01–R16](FEEDBACK-01.md) conserva el alcance completo. Falta generalizar las subslides a las otras cinco estaciones, crear S00, habilitar sesiones progresivamente, añadir ejemplos externos y glosario contextual, extender las precauciones y crear las skills y recursos de imagen previstos. La [guía del fork](../guides/FORK_CONFIGURATION.md) documenta únicamente controles implementados.
