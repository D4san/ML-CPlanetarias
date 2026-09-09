import { useEffect, useRef, useState } from 'react';

import { s01InstanceTerms, type S01InstanceTermId } from '../../../lib/s01-journey';
import {
  DefinitionCardDialog,
  DirectDefinitions,
  focusDefinition,
  InstanceMiniature,
  MathExpression,
  instanceExamples,
  useCourseConfig,
} from '../S01Pilot';
import type { InstanceSceneProps } from './scene-types';

export function InstanceScene({ scenario, part }: InstanceSceneProps) {
  const direct = useCourseConfig().interactionMode === 'direct';
  const examples = instanceExamples[scenario.id];
  const [selectedTermId, setSelectedTermId] = useState<S01InstanceTermId | null>(null);
  const [definitionVisible, setDefinitionVisible] = useState(false);
  const flipButtonRef = useRef<HTMLButtonElement>(null);
  const termButtons = useRef<Partial<Record<S01InstanceTermId, HTMLButtonElement | null>>>({});
  const selectedTerm = s01InstanceTerms.find((item) => item.id === selectedTermId) ?? null;
  const formalism = {
    spectrum: {
      unit: 'espectro i',
      observation: 'señal espectral',
      representation: 'x_i',
      signalTermId: 'target' as const,
      signalLabel: 'objetivo',
      signal: 'y_i',
      model: 'h_\\theta',
      output: '\\hat y_*',
      outputLabel: 'abundancia estimada',
      formula: '\\mathcal D=\\{(x_i,y_i)\\}_{i=1}^{n},\\qquad \\hat y_*=h_\\theta(x_*)',
      formulaLabel:
        'D es el conjunto de pares x sub i, y sub i; la salida y estimada para una instancia nueva es h theta de x nueva.',
      note: 'El objetivo yᵢ guía el ajuste; para una instancia nueva se observa x★ y se produce ŷ★.',
      fitTex: '\\{(x_i,y_i)\\}_{i=1}^{n}\\longrightarrow h_\\theta',
      fitLabel: 'ejemplos con objetivo',
      useTex: 'x_\\star\\longrightarrow\\hat y_\\star',
      useLabel: 'instancia nueva',
    },
    catalog: {
      unit: 'exoplaneta i',
      observation: 'fila del catálogo',
      representation: 'x_i',
      signalTermId: 'signal' as const,
      signalLabel: 'sin objetivo por fila',
      signal: '\\varnothing\\ y_i',
      model: 'h_\\theta',
      output: 'z_i',
      outputLabel: 'grupo o rareza',
      formula: '\\mathcal D=\\{x_i\\}_{i=1}^{n},\\qquad z_i=h_\\theta(x_i)',
      formulaLabel:
        'D contiene representaciones x sub i sin objetivo por fila; z sub i es el grupo o la rareza producida por h theta.',
      note: 'Aquí no se entrega yᵢ por instancia. La salida zᵢ describe estructura; todavía requiere interpretación externa.',
      fitTex: '\\{x_i\\}_{i=1}^{n}\\longrightarrow h_\\theta',
      fitLabel: 'datos sin objetivo por instancia',
      useTex: 'x_i\\longrightarrow z_i',
      useLabel: 'grupo o rareza',
    },
    followup: {
      unit: 'decisión t',
      observation: 'condiciones disponibles',
      representation: 's_t',
      signalTermId: 'signal' as const,
      signalLabel: 'recompensa',
      signal: 'r_t',
      model: '\\pi_\\theta',
      output: 'a_t',
      outputLabel: 'acción de seguimiento',
      formula: 'a_t=\\pi_\\theta(s_t),\\qquad r_t=R(s_t,a_t)',
      formulaLabel:
        'La política pi theta selecciona la acción a sub t desde el estado s sub t; la recompensa r sub t evalúa su consecuencia.',
      note: 'El estado sₜ resume la información disponible; la recompensa rₜ guía el aprendizaje de la política.',
      fitTex: '\\{(s_t,a_t,r_t)\\}\\longrightarrow\\pi_\\theta',
      fitLabel: 'experiencia con consecuencias',
      useTex: 's_t\\longrightarrow a_t',
      useLabel: 'acción elegida',
    },
  }[scenario.id];

  useEffect(() => {
    if (selectedTermId !== null) flipButtonRef.current?.focus();
  }, [selectedTermId]);

  function openTerm(termId: S01InstanceTermId) {
    if (direct) return focusDefinition('instance', termId);
    setDefinitionVisible(false);
    setSelectedTermId(termId);
  }

  function closeTerm() {
    if (selectedTermId !== null) termButtons.current[selectedTermId]?.focus();
    setDefinitionVisible(false);
    setSelectedTermId(null);
  }

  function termButton(
    termId: S01InstanceTermId,
    label: string,
    notation: string,
    detail: string,
    className = '',
  ) {
    return (
      <button
        type="button"
        className={`s01-formal-node ${className}`.trim()}
        ref={(node) => {
          termButtons.current[termId] = node;
        }}
        aria-label={`${label}. ${direct ? 'Ir a definición' : 'Abrir definición'}`}
        aria-pressed={selectedTermId === termId}
        onClick={() => openTerm(termId)}
      >
        <small>{label}</small>
        <InstanceMiniature termId={termId} scenarioId={scenario.id} />
        <MathExpression tex={notation} label={`${label}: ${detail}`} />
        <span>{examples[termId]}</span>
      </button>
    );
  }

  return (
    <section
      className="s01-scene s01-scene--instance"
      data-part={part}
      aria-label="Instancia y representación"
    >
      {part !== 'interaction' && (
        <div className="s01-scene__graphic">
          <header className="s01-graphic-intro">
            <p className="s01-mini-label">Primero · separa los objetos</p>
            <h4>De una observación a una salida</h4>
            <p>
              Identifica el caso, su registro y la representación que recibe el método. La señal
              disponible guía el ajuste; el modelo produce una salida.
            </p>
          </header>
          <div
            className="s01-formal-map"
            role="group"
            aria-label="Cadena formal desde una instancia hasta la salida"
          >
            <div className="s01-formal-map__chain">
              {termButton('instance', 'instancia', 'i', formalism.unit)}
              <span className="s01-formal-arrow" aria-hidden="true">
                →
              </span>
              {termButton('observation', 'observación', '\\text{dato}', formalism.observation)}
              <span className="s01-formal-arrow" aria-hidden="true">
                →
              </span>
              {termButton('representation', 'representación', formalism.representation, 'entrada')}
              <span className="s01-formal-arrow" aria-hidden="true">
                →
              </span>
              {termButton(
                'model',
                'modelo',
                formalism.model,
                'relación ajustada',
                's01-formal-node--model',
              )}
              <span className="s01-formal-arrow" aria-hidden="true">
                →
              </span>
              {termButton(
                'output',
                'salida',
                formalism.output,
                formalism.outputLabel,
                's01-formal-node--output',
              )}
            </div>
            <div className="s01-formal-map__signal">
              <span aria-hidden="true">↳</span>
              {termButton(
                formalism.signalTermId,
                formalism.signalLabel,
                formalism.signal,
                'señal de aprendizaje',
                's01-formal-node--signal',
              )}
              <p>{formalism.note}</p>
            </div>
          </div>

          {direct && (
            <DirectDefinitions
              prefix="instance"
              items={s01InstanceTerms
                .filter((term) => term.id !== (scenario.id === 'spectrum' ? 'signal' : 'target'))
                .map((term) => ({ ...term, example: examples[term.id] }))}
            />
          )}
          {!direct && selectedTerm !== null && (
            <DefinitionCardDialog
              item={{ ...selectedTerm, example: examples[selectedTerm.id] }}
              definitionVisible={definitionVisible}
              flipButtonRef={flipButtonRef}
              onFlip={() => setDefinitionVisible((visible) => !visible)}
              onClose={closeTerm}
            />
          )}
        </div>
      )}
      {part !== 'graphic' && (
        <div className="s01-scene__interaction s01-formula-strip">
          <div className="s01-formula-strip__intro">
            <p className="s01-mini-label">Después · traduce la ruta a símbolos</p>
            <h4 id="s01-instance-title">La notación separa ajustar de usar</h4>
            <p>
              Durante el ajuste usamos ejemplos para construir la relación. Cuando llega un caso
              nuevo, aplicamos esa relación para producir la salida.
            </p>
          </div>
          <div className="s01-formula-strip__equation">
            <MathExpression tex={formalism.formula} label={formalism.formulaLabel} block />
            <small>Ruta formal de este ejemplo</small>
          </div>
          <div className="s01-formula-strip__stages" aria-label="Diferencia entre ajuste y uso">
            <div className="s01-formula-strip__stage">
              <p className="s01-mini-label">Ajuste</p>
              <MathExpression tex={formalism.fitTex} label={`Ajuste: ${formalism.fitLabel}`} />
              <small>{formalism.fitLabel}</small>
            </div>
            <span className="s01-formula-strip__stage-arrow" aria-hidden="true">
              →
            </span>
            <div className="s01-formula-strip__stage">
              <p className="s01-mini-label">Uso</p>
              <MathExpression tex={formalism.useTex} label={`Uso: ${formalism.useLabel}`} />
              <small>{formalism.useLabel}</small>
            </div>
          </div>
          <p className="s01-formula-strip__note">{formalism.note}</p>
          <p className="s01-pilot-caution">
            Esquemas didácticos, sin escala ni datos medidos. Una salida estimada necesita
            evaluación e interpretación.
          </p>
        </div>
      )}
    </section>
  );
}
