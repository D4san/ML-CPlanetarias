import { useEffect, useRef, type ReactNode } from 'react';
import type { ReadingBook, ReadingChapter } from '../../lib/reading-book';
import './book-reading.css';

export function BookInstrument({
  title,
  prompt,
  interpretation,
  children,
  id,
}: {
  title: string;
  prompt: string;
  interpretation: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="book-instrument" id={id} aria-label={title}>
      <div className="book-instrument__introduction">
        <p className="book-reading__label">Exploración</p>
        <h3>{title}</h3>
        <p>{prompt}</p>
      </div>
      <div className="book-instrument__surface">{children}</div>
      <p className="book-instrument__interpretation">{interpretation}</p>
    </section>
  );
}

export interface BookReadingProps {
  book: ReadingBook;
  activeUnitId?: string;
  chapterForUnit?: (unitId: string) => string;
  anchorForChapter: (chapterId: string) => string;
  hashForChapter: (chapterId: string) => string;
  onNavigate?: (chapterId: string) => void;
  onVisibleChapter?: (chapterId: string) => void;
  onReferencesVisible?: () => void;
  renderInstruments?: (chapter: ReadingChapter) => ReactNode;
  renderContext?: (chapter: ReadingChapter) => ReactNode;
  references?: ReactNode;
  afterword?: ReactNode;
  referenceTitle?: string;
  referenceItems?: readonly { label: string; href: string }[];
  definitions?: readonly { term: string; definition: string }[];
}

/** La prosa también se renderiza desde Astro sin hidratar este componente. */
export function BookReading({
  book,
  activeUnitId,
  chapterForUnit,
  anchorForChapter,
  hashForChapter,
  onNavigate,
  onVisibleChapter,
  onReferencesVisible,
  renderInstruments,
  renderContext,
  references,
  afterword,
  referenceTitle,
  referenceItems = [],
  definitions,
}: BookReadingProps) {
  const prefix = book.session.toLowerCase();
  const articleRef = useRef<HTMLElement>(null);
  const onVisibleRef = useRef(onVisibleChapter);
  onVisibleRef.current = onVisibleChapter;
  const onReferencesRef = useRef(onReferencesVisible);
  onReferencesRef.current = onReferencesVisible;
  const initialChapter = useRef(
    activeUnitId ? (chapterForUnit?.(activeUnitId) ?? activeUnitId) : undefined,
  );
  const initialAnchor = initialChapter.current
    ? anchorForChapter(initialChapter.current)
    : undefined;

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    let frame = 0;
    let lastChapter: string | undefined;
    const sections = Array.from(article.querySelectorAll<HTMLElement>('[data-book-chapter]'));
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      if (!sections[0]?.getBoundingClientRect().height) return;
      // Volver a los controles superiores conserva el capítulo que se estaba leyendo.
      const header = article.closest('.session-presentation')?.querySelector('header');
      const headerBox = header?.getBoundingClientRect();
      if (headerBox && headerBox.bottom > 0 && headerBox.top < window.innerHeight) return;
      const references = document.getElementById(`${book.session.toLowerCase()}-book-references`);
      if (references && references.getBoundingClientRect().top <= line) {
        if (lastChapter !== 'references') onReferencesRef.current?.();
        lastChapter = 'references';
        return;
      }
      let current: HTMLElement | undefined;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section;
        else break;
      }
      const id = current?.dataset.bookChapter;
      if (id && id !== lastChapter) {
        lastChapter = id;
        onVisibleRef.current?.(id);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(() => {
      const chapter = initialChapter.current;
      if (chapter && chapter !== book.chapters[0]?.id && initialAnchor) {
        document.getElementById(initialAnchor)?.scrollIntoView?.({ block: 'start' });
      }
      update();
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [book, initialAnchor]);

  function visit(chapterId: string) {
    onNavigate?.(chapterId);
    const target = document.getElementById(anchorForChapter(chapterId));
    target?.scrollIntoView?.({ block: 'start', behavior: 'auto' });
    target?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  }

  function chapterLink(chapter: ReadingChapter, label: string) {
    return (
      <a
        href={onNavigate ? hashForChapter(chapter.id) : `#${anchorForChapter(chapter.id)}`}
        onClick={
          onNavigate
            ? (event) => {
                event.preventDefault();
                visit(chapter.id);
              }
            : undefined
        }
      >
        {label}
      </a>
    );
  }

  return (
    <article
      ref={articleRef}
      className={`${prefix}-reading book-reading`}
      aria-labelledby={`${prefix}-reading-title`}
    >
      <header className="book-reading__opening">
        <p className="book-reading__label">Libro interactivo · {book.session}</p>
        <h2 id={`${prefix}-reading-title`}>{book.title}</h2>
        <p className="book-reading__lead">{book.introduction}</p>
        <p>
          <strong>Para empezar.</strong> {book.prerequisites}
        </p>
        <p className="book-reading__method">
          Lee el argumento y el ejemplo resuelto; explora después y prueba a responder antes de
          abrir el razonamiento. Las explicaciones se pueden seguir sin manipular las figuras.
        </p>
      </header>

      <nav className="book-reading__contents" aria-label={`Capítulos de ${book.session}`}>
        <h2>Contenido de esta lectura</h2>
        <ol>
          {book.chapters.map((chapter, index) => (
            <li key={chapter.id}>
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              {chapterLink(chapter, chapter.title)}
            </li>
          ))}
        </ol>
        <a href={`#${prefix}-book-references`}>Referencias y lecturas</a>
      </nav>

      <div className="book-reading__chapters">
        {book.chapters.map((chapter, index) => (
          <section
            className={`book-chapter ${prefix}-reading__section`}
            id={anchorForChapter(chapter.id)}
            data-book-chapter={chapter.id}
            data-reading-stop={chapter.id}
            aria-labelledby={`${prefix}-book-${chapter.id}-title`}
            key={chapter.id}
          >
            <div className="book-reading__prose">
              <p className="book-reading__label">
                {book.session} · {index + 1} / {book.chapters.length}
              </p>
              <h2 id={`${prefix}-book-${chapter.id}-title`} tabIndex={-1}>
                {chapter.title}
              </h2>
              <p className="book-reading__lead">{chapter.lead}</p>
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <section className="book-example" aria-label={chapter.example.title}>
                <p className="book-reading__label">Ejemplo resuelto</p>
                <h3>{chapter.example.title}</h3>
                <p>{chapter.example.introduction}</p>
                <ol>
                  {chapter.example.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="book-example__conclusion">{chapter.example.conclusion}</p>
              </section>
              {renderContext?.(chapter)}
            </div>

            {renderInstruments?.(chapter)}

            <div className="book-reading__prose">
              <aside
                className="book-check"
                aria-label={`Comprueba tu comprensión: ${chapter.title}`}
              >
                <p className="book-reading__label">Pausa para razonar</p>
                <h3>{chapter.question}</h3>
                <details>
                  <summary>Leer el razonamiento</summary>
                  <p>{chapter.answer}</p>
                </details>
              </aside>
              <p className="book-reading__bridge">{chapter.bridge}</p>
              <p className="book-reading__sources">
                <strong>Para seguir esta explicación: </strong>
                {chapter.sources.map((source, sourceIndex) => (
                  <span key={source.href}>
                    {sourceIndex > 0 ? ' · ' : ''}
                    <a href={source.href}>{source.label}</a>
                  </span>
                ))}
                <span>
                  {' '}
                  Los ejemplos señalados como didácticos son desarrollos originales del curso.
                </span>
              </p>
              <nav
                className="book-reading__sequence"
                aria-label={`Continuar desde ${chapter.title}`}
              >
                {index > 0 ? (
                  chapterLink(book.chapters[index - 1]!, '← Apartado anterior')
                ) : (
                  <span />
                )}
                {index < book.chapters.length - 1 ? (
                  chapterLink(book.chapters[index + 1]!, 'Apartado siguiente →')
                ) : (
                  <a href={`#${prefix}-book-references`}>Ir a las referencias →</a>
                )}
              </nav>
            </div>
          </section>
        ))}
      </div>
      {afterword && <div className="book-reading__afterword">{afterword}</div>}
      {definitions && (
        <section className="book-reading__prose" aria-label="Vocabulario de consulta">
          <h2>Objetos del ciclo mínimo</h2>
          <dl>
            {definitions.map((definition) => (
              <div key={definition.term}>
                <dt>
                  <strong>{definition.term}</strong>
                </dt>
                <dd>{definition.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}
      <section
        className="book-reading__references"
        id={`${prefix}-book-references`}
        aria-label="Referencias y lecturas"
      >
        {references ?? (
          <>
            <h2>{referenceTitle ?? 'Referencias y lecturas'}</h2>
            <ul>
              {[
                ...new Map(
                  [...referenceItems, ...book.chapters.flatMap((chapter) => chapter.sources)].map(
                    (source) => [source.href, source],
                  ),
                ).values(),
              ].map((source) => (
                <li key={source.href}>
                  <a href={source.href}>{source.label}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </article>
  );
}
