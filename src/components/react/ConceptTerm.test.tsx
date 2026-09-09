// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ConceptTerm } from './ConceptTerm';

const concept = {
  id: 'generalizacion',
  term: 'Generalización',
  shortDefinition: 'Desempeño en instancias que no participaron en el ajuste.',
  aliases: ['desempeño fuera de muestra'],
  fullHref: '/glosario/generalizacion/',
} as const;

describe('ConceptTerm', () => {
  it('opens with click or keyboard, exposes one definition and returns focus on Escape', async () => {
    const user = userEvent.setup();
    render(<ConceptTerm concept={concept} />);

    const summary = screen.getByText('Generalización').closest('summary');
    expect(summary).not.toBeNull();
    expect(summary).toHaveAccessibleName('Aclarar Generalización');
    expect(screen.queryByText(concept.shortDefinition)).not.toBeVisible();

    await user.click(summary!);
    expect(screen.getByText(concept.shortDefinition)).toBeVisible();
    expect(
      screen.getByRole('link', { name: 'Ver entrada completa de Generalización' }),
    ).toHaveAttribute('href', '/glosario/generalizacion/');

    screen.getByRole('link', { name: 'Ver entrada completa de Generalización' }).focus();
    await user.keyboard('{Escape}');
    expect(summary?.parentElement).not.toHaveAttribute('open');
    expect(summary).toHaveFocus();
  });

  it('keeps repeated terms addressable with unique DOM IDs and follows a changed route', async () => {
    const user = userEvent.setup();
    const { rerender, container } = render(
      <div>
        <ConceptTerm concept={concept} />
        <ConceptTerm concept={concept} />
      </div>,
    );

    const panels = [...container.querySelectorAll('[id$="-panel"]')];
    expect(panels).toHaveLength(2);
    expect(new Set(panels.map((panel) => panel.id)).size).toBe(2);
    expect(new Set([...container.querySelectorAll('summary')].map((node) => node.id)).size).toBe(2);

    const firstSummary = container.querySelector('summary');
    await user.click(firstSummary!);
    rerender(
      <ConceptTerm
        concept={{
          ...concept,
          term: 'Transferencia',
          fullHref: '/glosario/transferencia/',
        }}
      />,
    );
    expect(screen.getByText('Transferencia')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Ver entrada completa de Transferencia' }),
    ).toHaveAttribute('href', '/glosario/transferencia/');
  });

  it('does not emit a broken control for a missing concept', () => {
    const { container } = render(<ConceptTerm concept={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('keeps the disclosure and full-entry link in server-rendered HTML', () => {
    const markup = renderToStaticMarkup(<ConceptTerm concept={concept} />);
    expect(markup).toContain('<details');
    expect(markup).toContain('/glosario/generalizacion/');
    expect(markup).toContain(concept.shortDefinition);
  });
});
