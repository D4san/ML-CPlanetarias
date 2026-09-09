// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { resolveSessionSettings, defineCourseConfig } from '../../lib/course-config';
import { c04LongAuthorUnknownChapter } from '../../../tests/fixtures/course-content/c04-bibliography-long-author';
import { CautionBox, SessionBibliography, TeacherPrompt } from './CourseContent';

describe('shared course content', () => {
  it('renders long authors, optional location and didactic function without inventing a chapter', () => {
    render(<SessionBibliography {...c04LongAuthorUnknownChapter} />);

    expect(screen.getByText(/Instituto para Estudios/)).toBeInTheDocument();
    expect(screen.getByText('Función didáctica:')).toBeInTheDocument();
    expect(screen.queryByText(/Capítulo/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver la fuente en su sitio ↗' })).toHaveAttribute(
      'href',
      'https://example.test/c04-bibliography-fixture',
    );
  });

  it('keeps caution content in static HTML and separates it from teacher-only prompts', () => {
    const bibliographyMarkup = renderToStaticMarkup(
      <SessionBibliography
        sessionId="S00"
        label="Materiales"
        title="Guía de uso"
        intro="Introducción"
        references={[
          {
            id: 'guide',
            institution: 'Equipo del curso',
            title: 'Guía reproducible',
            didacticFunction: 'Orientar el recorrido.',
            url: 'https://example.test/guide',
          },
        ]}
      />,
    );
    expect(bibliographyMarkup).toContain('<cite>Guía reproducible</cite>');
    expect(bibliographyMarkup).toContain('https://example.test/guide');

    const cautionMarkup = renderToStaticMarkup(
      <CautionBox
        caution={{
          id: 'metric-no-physics',
          distinction: 'Una métrica no equivale a una explicación física.',
          confusion: 'Confundir desempeño predictivo con causalidad.',
          consequence: 'La conclusión excede lo que los datos permiten sostener.',
          relatedConceptHref: '/glosario/generalizacion/',
          relatedExampleHref: '#example-kepler',
        }}
      />,
    );
    expect(cautionMarkup).toContain('Una métrica no equivale a una explicación física.');
    expect(cautionMarkup).toContain('Confusión frecuente');
    expect(cautionMarkup).toContain('/glosario/generalizacion/');

    const { container } = render(
      <TeacherPrompt
        prompt={{
          id: 'transfer-prompt',
          intent: 'transfer',
          question: '¿Qué cambiaría en otro dominio?',
          guidance: 'Pide señalar dato, tarea y límite.',
        }}
        teacherMode={false}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('does not emit unsafe contextual links while preserving valid concept/example links', () => {
    const markup = renderToStaticMarkup(
      <CautionBox
        caution={{
          id: 'unsafe-links',
          distinction: 'El límite debe poder localizarse.',
          confusion: 'Confiar en un vínculo no validado.',
          consequence: 'La navegación abandona el contexto seguro.',
          relatedConceptHref: 'javascript:alert(1)',
          relatedExampleHref: '#example-safe',
        }}
      />,
    );

    expect(markup).not.toContain('javascript:alert');
    expect(markup).toContain('#example-safe');
  });

  it('labels the three teaching intents and keeps guidance separate', () => {
    const { rerender } = render(
      <TeacherPrompt
        prompt={{
          id: 'opening-prompt',
          intent: 'opening',
          question: '¿Qué queremos responder?',
          guidance: 'Parte de la salida útil.',
        }}
        teacherMode
      />,
    );
    expect(screen.getByText('Pregunta docente · apertura')).toBeInTheDocument();
    expect(screen.getByText('¿Qué queremos responder?')).toBeInTheDocument();
    expect(screen.getByText('Orientación para acompañar')).toBeInTheDocument();

    rerender(
      <TeacherPrompt
        prompt={{
          id: 'diagnostic-prompt',
          intent: 'diagnostic',
          question: '¿Qué señal está disponible?',
          guidance: 'Compara objetivos, estructura y recompensa.',
        }}
        teacherMode
      />,
    );
    expect(screen.getByText('Pregunta docente · diagnóstico')).toBeInTheDocument();
    expect(screen.queryByText('Pregunta docente · apertura')).not.toBeInTheDocument();

    rerender(
      <TeacherPrompt
        prompt={{
          id: 'transfer-prompt',
          intent: 'transfer',
          question: '¿Qué cambiaría en otro dominio?',
          guidance: 'Pide señalar dato, tarea y límite.',
        }}
        teacherMode
      />,
    );
    expect(screen.getByText('Pregunta docente · transferencia')).toBeInTheDocument();
    expect(screen.getByText('Pide señalar dato, tarea y límite.')).toBeInTheDocument();
  });

  it('uses the resolved session teacher mode without removing an essential caution', () => {
    const config = defineCourseConfig({
      identity: { id: 'c04-fixture', title: 'Fixture C04' },
      defaults: { interactionMode: 'interactive', teacherMode: true, defaultView: 'reading' },
      enabledSessionIds: ['S00', 'S01'],
      sessions: {
        S00: { teacherMode: false },
        S01: { enabledRouteIds: ['spectrum'], defaultRouteId: 'spectrum' },
      },
    });
    const sessionSettings = resolveSessionSettings(config, 'S00');
    const markup = renderToStaticMarkup(
      <>
        <TeacherPrompt
          prompt={{
            id: 'session-prompt',
            intent: 'diagnostic',
            question: '¿Qué dato está disponible?',
            guidance: 'Pide describir la representación.',
          }}
          teacherMode={sessionSettings.teacherMode}
        />
        <CautionBox
          caution={{
            id: 'essential-caution',
            distinction: 'La salida conserva sus límites.',
            confusion: 'Confundir una ayuda docente con una condición del contenido.',
            consequence: 'El límite debe permanecer legible.',
          }}
        />
      </>,
    );

    expect(sessionSettings.teacherMode).toBe(false);
    expect(markup).not.toContain('¿Qué dato está disponible?');
    expect(markup).toContain('La salida conserva sus límites.');
  });
});
