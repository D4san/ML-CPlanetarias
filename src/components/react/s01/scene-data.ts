import type { S01Paradigm } from '../../../lib/s01-journey';

export const paradigmOptions: ReadonlyArray<{
  id: S01Paradigm;
  label: string;
  shortLabel: string;
}> = [
  { id: 'supervised', label: 'Objetivo por instancia', shortLabel: 'Supervisado' },
  { id: 'unsupervised', label: 'Sin objetivo etiquetado', shortLabel: 'No supervisado' },
  { id: 'reinforcement', label: 'Acción + recompensa', shortLabel: 'Por refuerzo' },
];

export const paradigmDescriptions: Record<S01Paradigm, string> = {
  supervised: 'cada instancia de ajuste trae un objetivo yᵢ',
  unsupervised: 'no hay un objetivo etiquetado por instancia; se trabaja con la estructura de x',
  reinforcement: 'las acciones producen consecuencias y una recompensa',
};
