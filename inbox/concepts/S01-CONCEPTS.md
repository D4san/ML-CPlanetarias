---
id: S01-CONCEPTS
kind: concept-bundle
status: drafting
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/02 Conceptos/Glosario ML Ciencias Planetarias.md
source_heading: Conceptos y lugares de aplicación
visibility: internal
publish_ready: false
---

# Semillas conceptuales de S01

Este paquete separa los conceptos que ya tienen una nota atómica en el vault de los conceptos que aparecen en la nueva secuencia de S01 y todavía requieren una nota propia. Las definiciones son paráfrasis del curso; las fuentes no se copian literalmente.

## 1. Problema científico como punto de partida de ML

**Rama:** problemas astronómicos.

**Idea:** formular primero qué se quiere conocer, qué observables existen, qué salida tendría utilidad y qué no puede resolver el modelo por sí solo.

**Fuente:** Kelleher, caps. 1–2, sobre problema de dominio, prediction subject, variables descriptivas, objetivo y ciclo del proyecto; Géron, cap. 2, sobre formular el problema antes de elegir algoritmo.

**Se usa en:** apertura y cierre de S01; toda práctica futura.

## 2. Paradigma, tarea y familia de modelo

**Rama:** teoría formal ML.

**Idea:** paradigma describe la señal de aprendizaje; tarea describe la salida; familia describe el mecanismo o sesgo del modelo. Deep learning es una familia, no un cuarto paradigma.

**Fuente:** Géron, cap. 1, para tipos de supervisión y ejes batch/online e instance/model-based; caps. 9–11 y 18 para familias y redes; Kelleher, cap. 1 y familias de capítulos 4–7.

**Se usa en:** diagnóstico del gráfico, sección de paradigmas y separación de tareas/familias.

## 3. Generalización y sesgo inductivo

**Rama:** teoría formal ML.

**Idea:** aprender implica producir salidas razonables en instancias no vistas. La memorización del conjunto de entrenamiento puede coexistir con un desempeño pobre fuera de él. El sesgo inductivo reúne restricciones y preferencias que permiten escoger entre modelos compatibles con una muestra finita.

**Fuente:** Kelleher, cap. 1, sobre problema mal planteado, generalización, sobreajuste, subajuste y sesgo inductivo; Géron, cap. 1, sobre error de generalización, representatividad y regularización.

**Se usa en:** ciclo mínimo, misconcepciones, evaluación y límites de interpretación.

## 4. Flujo de proyecto de ML y línea base

**Rama:** aplicaciones.

**Idea:** pregunta, datos, preparación, modelado, evaluación y uso forman un ciclo iterativo. La línea base permite saber qué aporta realmente un modelo más complejo.

**Fuente:** Kelleher, caps. 1–2, sobre CRISP-DM, comprensión del dominio, datos y evaluación; Géron, cap. 2, sobre proyecto de extremo a extremo, métrica, partición, validación y prueba.

**Se usa en:** producción digital y diseño de prácticas posteriores.

## Conceptos que la nueva secuencia debe atomizar

### 5. Pregunta, salida y uso de los datos

**Rama:** problemas astronómicos.

**Idea:** una colección de datos adquiere sentido cuando se especifica qué se quiere conocer o producir, cuál será la salida y cómo esa salida apoyará una interpretación, una hipótesis o una decisión. Las preguntas iniciales de S01 son: predecir, describir estructura/distribución, estimar una relación o incertidumbre, decidir y generar.

**Fuente:** Kelleher, cap. 1, datos → insights → decisiones y predicción como asignación de un valor desconocido; cap. 2, problema de dominio, solución analítica, factibilidad y uso de la salida; Géron, cap. 2, objetivo antes de algoritmo y métrica.

**Se usa en:** apertura, tarjetas de tablero y ejercicio de síntesis de S01.

### 6. IA, estadística y ML como vocabularios

**Rama:** teoría formal ML.

**Idea:** IA enfoca capacidades y sistemas; la estadística enfoca distribuciones, relaciones, incertidumbre y evidencia; ML enfoca el ajuste desde datos y la generalización a instancias nuevas. Una solución puede emplear los tres vocabularios.

**Fuente:** síntesis didáctica del curso. Géron sostiene directamente ML, tarea, experiencia y desempeño; Kelleher sostiene analítica predictiva, modelos, datos e insights. La formulación amplia de IA y estadística queda marcada para una bibliografía específica posterior.

**Se usa en:** segundo bloque de S01 y quiz de misconceptions.

### 7. Sujeto de predicción y representación

**Rama:** problemas astronómicos / teoría formal ML.

**Idea:** el sujeto de predicción es la unidad sobre la que se produce una salida: fuente, visita, espectro, imagen, curva de luz o segmento temporal. La representación convierte ese sujeto en variables, secuencias, imágenes o rasgos derivados; esa elección incorpora conocimiento del dominio y sesgo inductivo.

**Fuente:** Kelleher, cap. 2, prediction subject, analytics base table, variables descriptivas, tipos de datos, características crudas y derivadas; Géron, caps. 1–2, instancias, atributos, `X` y representatividad.

**Se usa en:** objeto formal mínimo, naturaleza de los datos y evaluación por objeto.

### 8. Aprendizaje generativo y distribución

**Rama:** teoría formal ML / aplicaciones.

**Idea:** una tarea generativa modela una distribución o una transformación de referencia para producir muestras, reconstrucciones o datos condicionados. La utilidad científica depende de la cobertura, la diversidad, la consistencia física y el uso posterior.

**Fuente:** Géron, cap. 17, autoencoders, GAN y difusión; cap. 1, tareas y detección de anomalías; formulación astronómica propia del curso.

**Se usa en:** bloque de tareas, árbol visual y continuación hacia prácticas generativas.

## Cola de atomización pendiente

Estos términos aparecen en el guion de S01, pero todavía deben convertirse en notas atómicas del vault antes de cerrar el glosario:

- paradigma, tarea y familia como niveles de un problema;
- señal de aprendizaje y variantes de supervisión;
- aprendizaje profundo como familia de modelos;
- evaluación, métrica y datos no vistos;
- predicción, inferencia y explicación científica;
- incertidumbre y cambio de dominio;
- clustering y estructura de datos;
- regresión, clasificación y generación como salidas.

## Relaciones para el glosario

```text
problema científico → representación/datos → paradigma → tarea → familia
familia → entrenamiento → evaluación → generalización → interpretación
concepto → sesiones → ejercicios → páginas publicables
```
