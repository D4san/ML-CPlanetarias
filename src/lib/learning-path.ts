export const learningStages = [
  {
    id: 'question',
    shortLabel: 'Pregunta',
    title: 'Pregunta científica',
    tone: 'question',
    explanation:
      'Nombra qué queremos conocer, para qué serviría la respuesta y qué no resolverá por sí sola.',
    tutorPrompt: '¿Qué tendría que poder explicar un tutor antes de hablar de datos o modelos?',
  },
  {
    id: 'representation',
    shortLabel: 'Datos',
    title: 'Datos y representación',
    tone: 'data',
    explanation:
      'Distingue el fenómeno de los observables y de la representación concreta que recibirá el sistema.',
    tutorPrompt: '¿Qué información conserva esta representación y qué información descarta?',
  },
  {
    id: 'paradigm',
    shortLabel: 'Paradigma',
    title: 'Paradigma de aprendizaje',
    tone: 'model',
    explanation:
      'Identifica qué señal permite aprender: objetivos por instancia, estructura sin etiquetas o recompensa por interacción.',
    tutorPrompt: '¿De dónde proviene la señal de aprendizaje y qué sesgos contiene?',
  },
  {
    id: 'task',
    shortLabel: 'Tarea',
    title: 'Tarea y salida',
    tone: 'model',
    explanation:
      'Define la forma de la salida que responde a la pregunta: valor, clase, representación, grupo o señal de rareza.',
    tutorPrompt: '¿Qué salida concreta puede evaluarse y quién la usará?',
  },
  {
    id: 'family',
    shortLabel: 'Modelo',
    title: 'Familia de modelo',
    tone: 'model',
    explanation:
      'Selecciona una familia después de fijar problema, señal y tarea; explicita su sesgo inductivo y costo.',
    tutorPrompt:
      '¿Por qué esta familia es una hipótesis razonable y no solo una opción disponible?',
  },
  {
    id: 'baseline',
    shortLabel: 'Base',
    title: 'Línea base',
    tone: 'decision',
    explanation:
      'Fija el desempeño mínimo que una solución más compleja debe superar de manera relevante.',
    tutorPrompt: '¿Contra qué comparación simple sabremos si la complejidad aporta algo?',
  },
  {
    id: 'evaluation',
    shortLabel: 'Métrica',
    title: 'Métrica y evaluación',
    tone: 'decision',
    explanation:
      'Evalúa en datos no usados para ajustar, con una métrica alineada al uso y a los costos del error.',
    tutorPrompt: '¿Qué error importa en el problema real y qué partición lo estima honestamente?',
  },
  {
    id: 'limits',
    shortLabel: 'Límites',
    title: 'Interpretación y límites',
    tone: 'limit',
    explanation:
      'Separa desempeño predictivo, explicación física y validez fuera del dominio observado.',
    tutorPrompt: '¿Qué conclusión seguiría siendo injustificada aunque la métrica fuera excelente?',
  },
  {
    id: 'transfer',
    shortLabel: 'Transferir',
    title: 'Transferencia docente',
    tone: 'transfer',
    explanation:
      'Convierte la secuencia en preguntas, ejemplos y límites que otro tutor pueda reutilizar con un caso nuevo.',
    tutorPrompt: '¿Cómo cambiaría la explicación para otra audiencia, dato o problema astronómico?',
  },
] as const;

export type LearningStage = (typeof learningStages)[number];
export type LearningStageId = LearningStage['id'];

export function getStage(id: LearningStageId): LearningStage {
  return learningStages.find((stage) => stage.id === id) ?? learningStages[0];
}

export function getStageIndex(id: LearningStageId): number {
  const index = learningStages.findIndex((stage) => stage.id === id);
  return index < 0 ? 0 : index;
}

export function moveStage(id: LearningStageId, delta: -1 | 1): LearningStage {
  const index = getStageIndex(id);
  const nextIndex = Math.min(Math.max(index + delta, 0), learningStages.length - 1);
  return learningStages[nextIndex] ?? learningStages[0];
}

export function getProgress(id: LearningStageId): number {
  return ((getStageIndex(id) + 1) / learningStages.length) * 100;
}
