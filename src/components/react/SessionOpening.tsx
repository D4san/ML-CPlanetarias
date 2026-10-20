import { sessionOpenings } from '../../lib/session-openings';
import { withBase } from '../../lib/urls';

export function SessionOpening({ session }: { session: keyof typeof sessionOpenings }) {
  const opening = sessionOpenings[session];
  return (
    <section className="session-opening" aria-labelledby={`${session}-opening-title`}>
      <div className="session-opening__copy">
        <p className="eyebrow">{session} · Portada · 0</p>
        <h2 id={`${session}-opening-title`}>{opening.title}</h2>
        <p className="session-opening__question">{opening.question}</p>
        <p>{opening.promise}</p>
      </div>
      <figure className="session-opening__visual">
        {'image' in opening && <img src={withBase(opening.image)} alt={opening.imageAlt} />}
        <ol className="session-opening__chain" aria-label="Recorrido de aprendizaje">
          {opening.steps.map((step, index) => (
            <li key={step}>
              <span className="session-opening__step-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="session-opening__step-label">{step}</span>
            </li>
          ))}
        </ol>
        {'caption' in opening && <figcaption>{opening.caption}</figcaption>}
      </figure>
    </section>
  );
}
