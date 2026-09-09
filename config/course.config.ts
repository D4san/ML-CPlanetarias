import { defineCourseConfig } from '../src/lib/course-config';

// Configuración del fork. Reinicia el servidor de desarrollo o reconstruye tras editar.
export const courseConfig = defineCourseConfig({
  identity: {
    id: 'mlcp',
    title: 'ML Ciencias Planetarias',
  },
  defaults: {
    interactionMode: 'interactive', // 'direct': definiciones visibles sin girar tarjetas.
    teacherMode: false, // Preguntas y orientaciones junto a cada tema.
    defaultView: 'presentation', // 'reading' o 'activities'.
  },
  enabledSessionIds: ['S00', 'S01'],
  sessions: {
    S00: {
      enabled: true,
    },
    S01: {
      enabled: true,
      enabledRouteIds: ['spectrum', 'catalog', 'followup'],
      defaultRouteId: 'spectrum',
    },
  },
});
