// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ExampleLink, ExamplePanel } from './ExamplePanel';

const example = {
  id: 's01-kepler-transit-signal',
  question: '¿Cómo pasa una serie temporal a un evento candidato?',
  domain: 'Kepler exoplanet transit signal',
  representation: 'Serie temporal de flujo y banderas de calidad.',
  paradigm_task: 'Detección de una señal y producción de un evento candidato.',
  model: 'not_applicable',
  baseline: 'not_reported',
  output: 'Un evento candidato que pasa a evaluación posterior.',
  evaluation: 'La fuente describe evaluación posterior, no una métrica de ML.',
  interpretation: 'Ilustra observación → representación → evento pendiente de validación.',
  limits: 'Un TCE no demuestra por sí solo un planeta confirmado ni desempeño de ML.',
  sourceIds: ['kepler-doc', 'pending-source'],
  claim_status: 'parcial',
  next_action: 'Revisar el recurso antes de promocionar la ficha.',
} as const;

describe('ExampleLink and ExamplePanel', () => {
  it('provides a real anchor destination and renders the complete pedagogical distinction', async () => {
    const user = userEvent.setup();
    render(
      <>
        <ExampleLink example={example} label="Ver el caso de Kepler" />
        <ExamplePanel
          example={example}
          title="Señal de tránsito y evento candidato"
          sources={[
            {
              id: 'kepler-doc',
              title: 'Documentación de Kepler',
              url: 'https://archive.stsci.edu/kepler/',
              location: '§1 Introduction',
              status: 'verificado',
              claim_limit: 'Documenta el flujo; no respalda por sí sola ML.',
            },
            {
              id: 'pending-source',
              title: 'Fuente institucional pendiente',
              url: 'https://example.test/pending',
              status: 'pendiente',
            },
          ]}
        />
      </>,
    );

    const link = screen.getByRole('link', { name: 'Ver el caso de Kepler' });
    expect(link).toHaveAttribute('href', '#example-s01-kepler-transit-signal');
    expect(document.getElementById('example-s01-kepler-transit-signal')).toHaveAttribute(
      'data-example-id',
      example.id,
    );
    link.focus();
    expect(link).toHaveFocus();
    await user.keyboard('{Enter}');
    await user.click(link);
    expect(
      screen.getByRole('heading', { name: 'Señal de tránsito y evento candidato' }),
    ).toBeVisible();
    expect(screen.getByText(example.question)).toBeVisible();
    expect(screen.getByText(example.representation)).toBeVisible();
    expect(screen.getByText(example.output)).toBeVisible();
    expect(screen.getByText(example.interpretation)).toBeVisible();
    expect(screen.getByText(example.limits)).toBeVisible();
    expect(screen.getByRole('link', { name: 'Documentación de Kepler ↗' })).toHaveAttribute(
      'href',
      'https://archive.stsci.edu/kepler/',
    );
    expect(screen.getByText(/Estado:\s*verificada\./)).toBeVisible();
    expect(screen.getByText(/Destino externo; se abre en esta pestaña/)).toBeVisible();
    expect(screen.getByText(/Fuente pendiente de lectura/)).toBeInTheDocument();
    expect(screen.getByText(/Estado:\s*pendiente de lectura\./)).toBeVisible();
    expect(
      screen.queryByRole('link', { name: /Fuente institucional pendiente/ }),
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('keeps the complete panel available as static HTML without buttons or scripts', () => {
    const markup = renderToStaticMarkup(
      <>
        <ExampleLink example={example} />
        <ExamplePanel
          example={example}
          sources={[{ id: 'kepler-doc', title: 'Documentación de Kepler', status: 'verificado' }]}
        />
      </>,
    );

    expect(markup).toContain('href="#example-s01-kepler-transit-signal"');
    expect(markup).toContain('id="example-s01-kepler-transit-signal"');
    expect(markup).toContain(example.question);
    expect(markup).not.toContain('<button');
    expect(markup).not.toContain('<script');
  });

  it('shows a safe fallback for absent or malformed examples and invalid sources', () => {
    const { rerender } = render(<ExamplePanel example={undefined} />);
    expect(screen.getByRole('status')).toHaveTextContent('todavía no tiene una ficha válida');

    rerender(
      <ExamplePanel
        example={{
          ...example,
          task: 42,
          paradigm_task: 17,
        }}
      />,
    );
    expect(screen.getByRole('status')).toHaveTextContent('todavía no tiene una ficha válida');

    rerender(
      <ExamplePanel
        example={{ ...example, sourceIds: ['bad-source'] }}
        sources={[
          {
            id: 'bad-source',
            title: 'Recurso mal formado',
            url: 'javascript:alert(1)',
            status: 'verificado',
          },
        ]}
      />,
    );
    expect(screen.getByText(/Fuente sin enlace verificable/)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Recurso mal formado/ })).not.toBeInTheDocument();
  });

  it('rejects an unsafe declared destination and falls back to the real example anchor', () => {
    const { container, rerender } = render(
      <ExampleLink example={example} href="javascript:alert(1)" label="Abrir caso" />,
    );
    expect(screen.getByRole('link', { name: 'Abrir caso' })).toHaveAttribute(
      'href',
      '#example-s01-kepler-transit-signal',
    );

    rerender(<ExampleLink href="javascript:alert(1)" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('omits an example action when its record is absent', () => {
    const { container } = render(<ExampleLink />);
    expect(container).toBeEmptyDOMElement();
  });
});
