// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SlideRail, { type SlideRailItem } from './SlideRail';

const demoSlides: SlideRailItem[] = Array.from({ length: 7 }, (_, index) => ({
  id: `demo-${index}`,
  groupLabel: index < 3 ? 'Pregunta' : 'Modelo',
  title: `Tramo ${index + 1}`,
  partLabel:
    index < 3 ? (['Apertura', 'Datos', 'Lectura'][index] ?? 'Apertura') : `Tramo ${index + 1}`,
  partIndex: index < 3 ? index : 0,
  partLabels: index < 3 ? ['Apertura', 'Datos', 'Lectura'] : undefined,
  tone: index < 3 ? 'question' : 'model',
}));

describe('SlideRail', () => {
  it('renders a reusable five-card window with subslide markers', () => {
    render(
      <SlideRail
        slides={demoSlides}
        activeIndex={1}
        activeLabel="Pregunta · Datos"
        ariaLabel="Diapositivas de demostración"
        onSelect={vi.fn()}
      />,
    );

    const rail = screen.getByRole('navigation', { name: 'Diapositivas de demostración' });
    expect(rail.querySelectorAll('li[data-visible="true"]')).toHaveLength(5);
    expect(rail.querySelectorAll('.slide-rail__parts')).toHaveLength(3);
    expect(rail.querySelectorAll('.slide-rail__parts [data-active="true"]')).toHaveLength(3);
    expect(rail.querySelectorAll('li[data-side]')).toHaveLength(2);
  });

  it('allows a session to expose a hierarchical index without changing the flat sequence', () => {
    render(
      <SlideRail
        slides={demoSlides}
        activeIndex={1}
        activeLabel="Pregunta · Datos"
        ariaLabel="Diapositivas de demostración"
        onSelect={vi.fn()}
        getIndexLabel={(_slide, index) => `01.${index + 1}`}
      />,
    );

    expect(screen.getByText('01.1')).toBeInTheDocument();
    expect(screen.getByText('01.2')).toBeInTheDocument();
    expect(screen.getByText('01.3')).toBeInTheDocument();
  });

  it('selects a stacked slide and moves with the keyboard', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <SlideRail
        slides={demoSlides}
        activeIndex={3}
        activeLabel="Modelo · Tramo 4"
        ariaLabel="Diapositivas de demostración"
        onSelect={onSelect}
      />,
    );

    const stacked = screen.getByRole('button', { name: '7. Tramo 7' });
    await user.click(stacked);
    expect(onSelect).toHaveBeenCalledWith(demoSlides[6], 6);

    const active = screen.getByRole('button', { name: '4. Tramo 4' });
    active.focus();
    await user.keyboard('{ArrowLeft}');
    expect(onSelect).toHaveBeenLastCalledWith(demoSlides[2], 2);
    expect(screen.getByRole('button', { name: 'Subslide 3 · Pregunta · Lectura' })).toHaveFocus();
  });
});
