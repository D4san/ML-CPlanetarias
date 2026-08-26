---
id: S01-SOURCE-MAP
kind: source-map
status: drafting
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/03 Producción digital/Fuentes de apoyo/Digest de fuentes - S01 ML, IA y métodos estadísticos.md
visibility: internal
publish_ready: false
---

# Mapa de fuentes para S01

## Secuencia de lectura que sustenta la sesión

La sesión sigue este recorrido:

```text
pregunta y uso → datos/representación → señal → paradigma → tarea/salida
→ familia de modelo → entrenamiento → evaluación → interpretación y límites
```

El punto de partida toma de Kelleher la trayectoria **datos → insights → decisiones** y la pregunta por el uso de la salida. Géron aporta el mapa panorámico de tipos de sistemas, tareas y flujo de un proyecto de ML. La combinación permite que el árbol aparezca después de la discusión inicial, con niveles conceptuales separados.

## Géron

Aurélien Géron, *Hands-on Machine Learning with Scikit-Learn, Keras, and TensorFlow*, 3.ª ed.

| Parte | Uso en S01 |
| --- | --- |
| Cap. 1 | definición operativa de ML; tarea, experiencia y medida de desempeño; ejemplos de regresión, clasificación, clustering, anomalías y decisiones; supervisado, no supervisado, semisupervisado, autosupervisado y refuerzo; batch/online e instance/model-based; sobreajuste y generalización |
| Cap. 2 | formular el objetivo y el uso antes del algoritmo; `X`, `y`, `h` y `ŷ`; selección de métrica; particiones, validación, prueba, representatividad, línea base y flujo de proyecto |
| Caps. 3–4 | clasificación, regresión, funciones de pérdida, ajuste de parámetros, regularización y evaluación por tarea |
| Caps. 8–9 | reducción de dimensionalidad, clustering, densidad y anomalías |
| Caps. 10–11 | redes neuronales y deep learning como familia de modelos; datos, capacidad y entrenamiento |
| Cap. 17 | autoencoders, GAN y difusión; generación como tarea y ruta de continuación |
| Cap. 18 | agente, entorno, acciones, recompensas y política en aprendizaje por refuerzo |

## Kelleher, Mac Namee y D’Arcy

*Fundamentals of Machine Learning for Predictive Data Analytics*, MIT Press, 2015.

| Parte | Uso en S01 |
| --- | --- |
| Cap. 1 | datos → insights → decisiones; predicción como asignación de un valor desconocido; variables descriptivas y objetivo; ML como extracción automatizada de patrones; problema mal planteado; sesgo inductivo; generalización, sobreajuste y subajuste |
| Cap. 2 | problema de dominio antes del modelo; solución analítica y uso; factibilidad; sujeto de predicción; tabla analítica; tipos de datos; características crudas y derivadas; disponibilidad temporal; ciclo CRISP-DM |
| Caps. 4–7 | cuatro familias de aprendizaje predictivo: información, similitud, probabilidad y error |
| Cap. 8 | evaluación como experimento sobre datos no vistos; hold-out, validación cruzada y separación temporal; métricas para objetivos categóricos y continuos; alineación entre métrica, tarea y uso; monitoreo posterior |

## Regla de redacción

Cada concepto o página derivada debe distinguir:

1. qué dice o sustenta la fuente;
2. cuál es la paráfrasis propia del curso;
3. qué ejemplo o decisión pedagógica se añade;
4. qué queda fuera de la evidencia.

Los textos completos y sus extracciones permanecen en la carpeta privada del vault y no se copian al repositorio.

## Alcance de las definiciones

- La definición de ML, la formulación tarea–experiencia–desempeño y las distinciones de supervisión se anclan directamente en Géron.
- La predicción amplia, la unidad de análisis, las variables descriptivas, el objetivo, el sesgo inductivo, la generalización y la evaluación se anclan en Kelleher.
- IA y estadística aparecen como definiciones de trabajo del curso. Ambos libros sirven para situar ML dentro del análisis de datos, pero estas formulaciones amplias requieren bibliografía específica adicional antes de presentarse como definiciones de autor.

## Revisión externa de las definiciones de trabajo

La revisión de la interfaz consultó fuentes institucionales y primarias para acotar las síntesis:

- [NIST, AI RMF 1.0](https://airc.nist.gov/airmf-resources/airmf/0-ai-rmf-1-0/) y su [glosario](https://csrc.nist.gov/glossary/term/artificial_intelligence): un sistema de IA genera predicciones, recomendaciones o
  decisiones para objetivos definidos por personas y puede influir en entornos reales o virtuales.
- [American Statistical Association, Section on Statistics and Data Science Education](https://community.amstat.org/statisticaleducationsection/aboutus/charter): estadística
  como ciencia de aprender de los datos; la formulación del curso añade variabilidad, incertidumbre,
  evidencia y supuestos para hacerla operativa en S01.
- [Tom Mitchell, Carnegie Mellon, *Machine Learning* (1997)](https://www.cs.cmu.edu/~tom/book.html): ML como estudio de algoritmos que
  mejoran automáticamente mediante experiencia; la definición E–T–P sigue siendo la formulación
  formal de la lente ML.
- [Scikit-learn, glosario](https://scikit-learn.org/stable/glossary.html) y [tutorial introductorio](https://scikit-learn.org/1.3/tutorial/basic/tutorial.html): `X` representa datos observados disponibles al
  entrenar y predecir; `y` es el objetivo disponible durante el ajuste y normalmente ausente al
  predecir; supervisado implica objetivo por muestra y no supervisado implica que ese objetivo no
  está disponible por muestra.
- [NIST, glosario de IA generativa](https://csrc.nist.gov/glossary/term/generative_artificial_intelligence): generación como producción de contenido sintético que emula la
  estructura y características de los datos de entrada.

Estas consultas sirven para verificar términos, no sustituyen las fuentes bibliográficas canónicas
del curso ni convierten las definiciones de IA y estadística en citas textuales de autor. La página
mantiene paráfrasis propias, ejemplos astronómicos y límites de interpretación.
