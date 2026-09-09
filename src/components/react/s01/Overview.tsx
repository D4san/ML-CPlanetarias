import { s01Stops, type S01Scenario, type S01StopId } from '../../../lib/s01-journey';
import { S01ConceptMap } from './S01ConceptMap';

export interface OverviewProps {
  scenario: S01Scenario;
  onOpen: (id: S01StopId) => void;
}

export function Overview({ scenario, onOpen }: OverviewProps) {
  return (
    <section className="s01-overview" aria-labelledby="s01-overview-title">
      <div className="s01-overview__heading">
        <div>
          <p className="s01-mini-label">Panorama · ruta activa</p>
          <h3 id="s01-overview-title">El árbol completo regresa a la pregunta</h3>
        </div>
        <p>Recorre la cadena principal y abre una parada para volver a la explicación completa.</p>
      </div>
      <S01ConceptMap scenario={scenario} onOpen={onOpen} />
      <ol className="s01-overview__fallback-list" aria-label="Paradas de la sesión">
        {s01Stops.map((stop, index) => (
          <li key={stop.id} data-tone={stop.tone}>
            <button
              type="button"
              aria-label={`Abrir ${index + 1}. ${stop.title} en foco`}
              onClick={() => onOpen(stop.id)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{stop.title}</strong>
              <small>{scenario.route[stop.id]}</small>
            </button>
          </li>
        ))}
      </ol>
      <div className="s01-overview__return" aria-label="Ciclo de evaluación">
        <span>evaluar</span>
        <span aria-hidden="true">↺</span>
        <span>revisar pregunta, datos y uso</span>
      </div>
    </section>
  );
}
