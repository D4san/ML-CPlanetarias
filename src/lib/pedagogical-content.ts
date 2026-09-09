export type TeacherPromptIntent = 'opening' | 'diagnostic' | 'transfer';

export interface BibliographyReference {
  id: string;
  authors?: readonly string[];
  institution?: string;
  title: string;
  publisher?: string;
  edition?: string;
  year?: number;
  chapter?: string;
  section?: string;
  location?: string;
  didacticFunction: string;
  url?: string;
  doi?: string;
}

export interface SessionBibliographyContent {
  sessionId: string;
  label: string;
  title: string;
  intro: string;
  references: readonly BibliographyReference[];
  note?: string;
}

export interface CautionContent {
  id: string;
  distinction: string;
  confusion: string;
  consequence: string;
  relatedConceptHref?: string;
  relatedExampleHref?: string;
}

export interface TeacherPromptContent {
  id: string;
  intent: TeacherPromptIntent;
  question: string;
  guidance: string;
  unitId?: string;
  conceptId?: string;
}

export const s01Bibliography: SessionBibliographyContent = {
  sessionId: 'S01',
  label: 'Diapositiva 0 · materiales de la sesión',
  title: 'Dos libros para orientar el recorrido',
  intro:
    'Comenzaremos por la pregunta y el dato. Estas lecturas sostienen el vocabulario y las distinciones de S01.',
  references: [
    {
      id: 's01-geron',
      authors: ['Aurélien Géron'],
      title: 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow',
      edition: '3.ª edición',
      didacticFunction: 'Mapa de ML: vocabulario para formular y evaluar una tarea.',
      url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/',
    },
    {
      id: 's01-kelleher',
      authors: ['Kelleher', 'Mac Namee', 'D’Arcy'],
      title: 'Fundamentals of Machine Learning for Predictive Data Analytics',
      publisher: 'MIT Press',
      year: 2015,
      didacticFunction: 'Datos → conocimiento → decisión: conectar representación, salida y uso.',
      url: 'https://mitpress.mit.edu/9780262029445/fundamentals-of-machine-learning-for-predictive-data-analytics/',
    },
  ],
  note: 'Las explicaciones son síntesis del curso. Los casos astronómicos y esquemas son adaptaciones didácticas; no reproducen figuras de los libros.',
};
