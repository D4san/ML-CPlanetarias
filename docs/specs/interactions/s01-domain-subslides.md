---
packet: S01-ML-IA-metodos-estadisticos
kind: interaction-spec
status: drafting
visibility: internal
publish_ready: false
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion narrativo para impartir la sesión
source_refs:
  - Géron, cap. 1
  - Géron, cap. 2
  - Kelleher, caps. 1–2
rights:
  status: original
  note: El gráfico sintético/observado es un esquema original; no representa una medición científica.
---

# S01 · Datos y dominio en tres subslides

## Unidades y orden

| Orden | ID estable | Parte | Superficie principal |
| ---: | --- | --- | --- |
| 1 | `s01-domain-opening` | El dominio | foco de estación: entrenamiento y uso pueden diferir |
| 2 | `s01-domain-shift` | Cambio de condiciones | gráfico de señal latente, sintética y observada |
| 3 | `s01-domain-diagnosis` | Diagnóstico y transferencia | selector sintético/observado y checklist de revisión |

La estación mantiene `#dominio`, `#dominio/cambio` y `#dominio/diagnostico`. La actividad `transfer`
es independiente y vuelve a esta estación sin reutilizar respuestas como estado narrativo.

## Comportamiento

- El desarrollo muestra ejes, señal latente, puntos sintéticos regulares, puntos observados con barras
  de error y una cobertura faltante.
- La parte de diagnóstico permite alternar las vistas y enumera las condiciones que deben revisarse:
  ruido/resolución, faltantes, respuesta instrumental y selección observacional, o sus equivalentes
  del simulador.
- La ruta astronómica permanece seleccionada al cambiar de parte. La figura y los textos mantienen
  el mismo caso conceptual.
- Directo e interactivo usan la misma explicación; la diferencia de modalidad se limita a la
  revelación de ayudas o definiciones que el contenedor controla.

## Accesibilidad, visual y límites

El SVG tiene título y descripción, ejes textuales y etiquetas repetidas fuera de la geometría. Los
selectores son botones con `aria-pressed` y feedback en región viva. Debe caber en proyección y no
desbordar horizontalmente en 390×844; los detalles largos se desplazan verticalmente. Movimiento
reducido mantiene el selector y la lectura operables.

La simulación no prueba transferencia al telescopio ni sustituye datos reales. No se inventan valores,
métricas o resultados de dominio; un asset futuro requiere ficha y derechos según F02/F03.

## Comprobaciones

- [ ] Los tres IDs resuelven la parte correcta y el selector conserva la ruta.
- [ ] Sintético/observado cambia el énfasis sin borrar la comparación ni las cautelas.
- [ ] Ejes, barras de error, región faltante y texto alternativo son verificables.
- [ ] Axe, movimiento reducido, 1920×1080, 390×844 y la subruta pasan en ensamblado.
