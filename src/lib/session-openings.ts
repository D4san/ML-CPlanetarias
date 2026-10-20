export type SessionSlideRole = 'opening' | 'content' | 'references';

export const sessionOpenings = {
  S03: {
    session: 'S03',
    title: 'De un tránsito a las métricas',
    question: '¿Qué evidencia conecta una caída de brillo con una decisión de seguimiento?',
    promise:
      'Comprender el tránsito, representar datos de Kepler y evaluar una clasificación desde sus errores.',
    steps: [
      'Tránsito y Kepler',
      'Datos y clasificación',
      'Matriz y métricas',
      'Decisión y evidencia',
    ],
    image: '/images/s03/s03-variabilidad-conceptual.png',
    imageAlt:
      'Ilustración conceptual realista de una estrella con manchas; la variabilidad puede complicar la búsqueda de tránsitos.',
    caption: 'Ilustración generada con IA.',
  },
  S00: {
    session: 'S00',
    title: 'De los mundos a los datos',
    question: '¿Cómo conectamos un mundo que observamos con una pregunta que podemos investigar?',
    promise:
      'Relacionar observación, representación, aprendizaje y evidencia en ciencias planetarias.',
    steps: ['Mundos', 'Observaciones', 'Datos', 'Preguntas de ML'],
    image: '/images/s00/papers/hr8799-miri-fig1.png',
    imageAlt: 'Imágenes del sistema HR 8799 y sus planetas con JWST/MIRI.',
    caption:
      'Boccaletti et al. (2024), A&A 686, A33, figura 1 (recorte de paneles). CC BY 4.0. DOI: 10.1051/0004-6361/202347912.',
  },
  S01: {
    session: 'S01',
    title: 'De una observación a una afirmación',
    question: '¿Qué decisiones conectan una pregunta astronómica con un resultado defendible?',
    promise: 'Distinguir el caso, la señal de aprendizaje, la tarea, el modelo y sus límites.',
    steps: ['Pregunta', 'Caso y señal', 'Tarea y modelo', 'Dominio y evidencia'],
  },
  S02: {
    session: 'S02',
    title: 'Árboles de decisión y Random Forest',
    question: '¿Cómo decide un árbol dónde cortar y qué aporta combinar varios árboles?',
    promise:
      'Seguir un corte desde los ejemplos hasta su puntuación y comparar predicciones de radio.',
    steps: ['Planetas', 'Reglas y cortes', 'Árboles', 'Bosque y evaluación'],
    image: '/images/s02/planet-categories-v2.png',
    imageAlt:
      'Cuatro ilustraciones conceptuales de planetas: compacto, sub-Neptuno, gigante y puffy.',
    caption: 'Ilustración didáctica original del curso, generada con IA; no está a escala.',
  },
} as const;
