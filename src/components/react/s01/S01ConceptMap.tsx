import { type KeyboardEvent } from 'react';
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { S01Scenario, S01StopId } from '../../../lib/s01-journey';

export interface S01ConceptNodeData {
  [key: string]: unknown;
  index: string;
  title: string;
  note: string;
  tone: string;
  stopId?: S01StopId;
  onOpen?: (id: S01StopId) => void;
}

type S01ConceptNodeType = Node<S01ConceptNodeData, 'concept'>;

function S01ConceptNode({ data }: NodeProps<S01ConceptNodeType>) {
  const interactive = data.stopId !== undefined && data.onOpen !== undefined;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!interactive || data.stopId === undefined || data.onOpen === undefined) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      data.onOpen(data.stopId);
    }
  }

  return (
    <div
      className="s01-concept-node"
      data-tone={data.tone}
      data-interactive={interactive}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Abrir ${data.index}. ${data.title} en foco` : undefined}
      onClick={() => {
        if (interactive && data.stopId !== undefined && data.onOpen !== undefined)
          data.onOpen(data.stopId);
      }}
      onKeyDown={handleKeyDown}
    >
      <Handle type="target" position={Position.Left} aria-hidden="true" />
      <span>{data.index}</span>
      <strong>{data.title}</strong>
      <small>{data.note}</small>
      <Handle type="source" position={Position.Right} aria-hidden="true" />
    </div>
  );
}

const s01ConceptNodeTypes = { concept: S01ConceptNode };

export function S01ConceptMap({
  scenario,
  onOpen,
}: {
  scenario: S01Scenario;
  onOpen: (id: S01StopId) => void;
}) {
  const nodes: S01ConceptNodeType[] = [
    {
      id: 'question',
      type: 'concept',
      position: { x: 10, y: 152 },
      data: {
        index: '01',
        title: 'Pregunta',
        note: 'qué queremos responder',
        tone: 'question',
        stopId: 'question',
        onOpen,
      },
    },
    {
      id: 'instance',
      type: 'concept',
      position: { x: 220, y: 152 },
      data: {
        index: '02',
        title: 'Instancia',
        note: 'qué representa x',
        tone: 'data',
        stopId: 'instance',
        onOpen,
      },
    },
    {
      id: 'signal',
      type: 'concept',
      position: { x: 430, y: 152 },
      data: {
        index: '03',
        title: 'Señal',
        note: 'qué información guía',
        tone: 'model',
        stopId: 'signal',
        onOpen,
      },
    },
    {
      id: 'task',
      type: 'concept',
      position: { x: 640, y: 152 },
      data: {
        index: '04',
        title: 'Tarea',
        note: 'qué salida pedimos',
        tone: 'model',
        stopId: 'task',
        onOpen,
      },
    },
    {
      id: 'family',
      type: 'concept',
      position: { x: 850, y: 152 },
      data: {
        index: '05',
        title: 'Familia',
        note: 'cómo generaliza',
        tone: 'model',
        stopId: 'family',
        onOpen,
      },
    },
    {
      id: 'domain',
      type: 'concept',
      position: { x: 1060, y: 152 },
      data: {
        index: '06',
        title: 'Dominio',
        note: 'dónde se usará',
        tone: 'data',
        stopId: 'domain',
        onOpen,
      },
    },
    {
      id: 'evidence',
      type: 'concept',
      position: { x: 1270, y: 152 },
      data: {
        index: '07',
        title: 'Evidencia',
        note: 'qué podemos afirmar',
        tone: 'limit',
        stopId: 'evidence',
        onOpen,
      },
    },
    {
      id: 'supervised',
      type: 'concept',
      position: { x: 388, y: 350 },
      data: { index: 'A', title: 'Supervisado', note: 'objetivo por instancia', tone: 'signal' },
    },
    {
      id: 'unsupervised',
      type: 'concept',
      position: { x: 570, y: 350 },
      data: {
        index: 'B',
        title: 'No supervisado',
        note: 'estructura sin etiqueta',
        tone: 'signal',
      },
    },
    {
      id: 'reinforcement',
      type: 'concept',
      position: { x: 752, y: 350 },
      data: { index: 'C', title: 'Por refuerzo', note: 'acción y recompensa', tone: 'signal' },
    },
  ];

  const edges: Edge[] = [
    { id: 'question-instance', source: 'question', target: 'instance', type: 'smoothstep' },
    { id: 'instance-signal', source: 'instance', target: 'signal', type: 'smoothstep' },
    { id: 'signal-task', source: 'signal', target: 'task', type: 'smoothstep' },
    { id: 'task-family', source: 'task', target: 'family', type: 'smoothstep' },
    { id: 'family-domain', source: 'family', target: 'domain', type: 'smoothstep' },
    { id: 'domain-evidence', source: 'domain', target: 'evidence', type: 'smoothstep' },
    { id: 'signal-supervised', source: 'signal', target: 'supervised', type: 'smoothstep' },
    { id: 'signal-unsupervised', source: 'signal', target: 'unsupervised', type: 'smoothstep' },
    { id: 'signal-reinforcement', source: 'signal', target: 'reinforcement', type: 'smoothstep' },
    {
      id: 'evidence-question',
      source: 'evidence',
      target: 'question',
      type: 'smoothstep',
      style: { strokeDasharray: '6 6' },
      label: 'revisar pregunta, datos y uso',
    },
  ];

  return (
    <div className="s01-concept-map" aria-label="Mapa conceptual de la sesión">
      <div className="s01-concept-map__caption">
        <span>La cadena que organiza la sesión</span>
        <strong>{scenario.prompt}</strong>
      </div>
      <div className="s01-concept-map__canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={s01ConceptNodeTypes}
          fitView
          fitViewOptions={{ padding: 0.14, minZoom: 0.55, maxZoom: 1 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          panOnDrag
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch
          proOptions={{ hideAttribution: true }}
          aria-label="Mapa navegable de pregunta, representación, señal, tarea, familia, dominio y evidencia"
        >
          <Background color="rgb(122 150 166 / 0.14)" gap={28} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
