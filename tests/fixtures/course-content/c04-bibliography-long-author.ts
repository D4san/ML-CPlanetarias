import type { SessionBibliographyContent } from '../../../src/lib/pedagogical-content';

/** Synthetic fixture: the omitted location is intentional and must stay omitted in the UI. */
export const c04LongAuthorUnknownChapter: SessionBibliographyContent = {
  sessionId: 'S00',
  label: 'Materiales de la sesión',
  title: 'Una guía extensa',
  intro: 'Fixture técnico para probar composición responsive y procedencia explícita.',
  references: [
    {
      id: 'c04-long-author-unknown-chapter',
      authors: ['Instituto para Estudios de Representaciones Planetarias y Datos Abiertos'],
      title: 'Manual de trabajo reproducible',
      edition: 'Edición de prueba',
      didacticFunction: 'Orientar la preparación del tutor.',
      url: 'https://example.test/c04-bibliography-fixture',
    },
  ],
  note: 'Fixture sintético: no atribuye capítulo, sección ni ubicación que no hayan sido declarados.',
};
