---
id: COURSE-CONTEXT-MLCP
kind: course-context
status: drafting
source_vault: DASAN
source_notes:
  - 01 Temas/Academia/Maestría/ML Ciencias Planetarias/AA ML Ciencias Planetarias.md
  - 01 Temas/Academia/Maestría/ML Ciencias Planetarias/00 Planeación general/Workflow ML Ciencias Planetarias.md
  - 01 Temas/Academia/Maestría/ML Ciencias Planetarias/03 Producción digital/Plan de producción oficial.md
visibility: internal
publish_ready: false
---

# Contexto inicial del curso

## Propósito

**Enseñar para que enseñen.** El curso forma tutores capaces de comprender ML, explicarlo con rigor, aterrizarlo en problemas astronómicos y reutilizar la estructura para nuevas clases o electivas.

## Audiencia y cadencia

- audiencia: tutores y futuros docentes;
- sesiones: encuentros cada 15 días;
- cada sesión combina planeación, guion, red de conceptos, misconcepciones, microproblemas astronómicos y transferencia docente;
- el nivel matemático y computacional se diagnostica y se ajusta durante el curso.

## Tres líneas que se trabajan iterativamente

| Línea | Pregunta | Producto esperado |
| --- | --- | --- |
| Problemas astronómicos | ¿Qué problema científico queremos comprender, qué datos existen y qué puede aportar ML? | preguntas, observables, sesgos, tareas y utilidad científica |
| Teoría formal ML | ¿Qué objetos matemáticos, supuestos y mecanismos explican el modelo? | modelos, algoritmos, pérdida, generalización y evaluación |
| Aplicaciones | ¿Cómo se implementa, interpreta y enseña una solución reproducible? | notebooks, experimentos, diagnósticos, gráficos y límites |

Una sesión puede tener una línea dominante, pero debe mostrar las conexiones con las otras dos.

## Producto final previsto

El repo debe convertirse en una web educativa del curso, potencialmente publicada con GitHub Pages. La tecnología concreta queda pendiente. La web debe poder contener:

- portada y mapa del curso;
- sesiones quincenales navegables;
- glosario con navegación concepto → sesiones/ejercicios y sesión → conceptos;
- teoría, ecuaciones y gráficos originales;
- ejemplos y desafíos astronómicos acotados;
- notebooks ejecutables y enlaces a Colab comprobados;
- ejercicios y aplicaciones;
- material reutilizable por tutores;
- fuentes, licencias, procedencia y límites científicos.

## Regla de diseño de una sesión

```text
pregunta científica → datos y representación → señal de aprendizaje → tarea
→ familia de modelo → entrenamiento → línea base → métrica/evaluación
→ interpretación y límites → transferencia docente
```

Los microproblemas astronómicos pueden aparecer durante una explicación teórica. No se convierten automáticamente en prácticas ni en evidencia científica.

## Relación con Obsidian

Obsidian conserva la planeación, el grafo conceptual, los guiones completos, las fuentes privadas y las decisiones. El repo recibe paquetes con:

- `source_note` y `source_heading` relativos al vault;
- conceptos enlazados;
- fuentes y procedencia;
- visibilidad y estado;
- destino previsto en `docs/`, `notebooks/`, `exercises/` o `glossary/`.

No se copian libros completos ni extracciones privadas. El repo trabaja con síntesis propias, ecuaciones, gráficos originales, metadatos y referencias permitidas.

## Inicio recomendado

1. Completar el paquete rico de S01.
2. Extraer sus conceptos a paquetes del glosario.
3. Convertir la red conceptual en una nota/gráfico navegable.
4. Producir una primera página de sesión sin notebook.
5. Diseñar después la primera práctica y su enlace a Colab.
