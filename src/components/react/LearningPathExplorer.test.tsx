// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import LearningPathExplorer from './LearningPathExplorer';

describe('LearningPathExplorer', () => {
  it('renders a deterministic and readable initial state', () => {
    render(<LearningPathExplorer />);

    expect(screen.getByRole('heading', { name: 'Pregunta científica' })).toBeInTheDocument();
    expect(screen.getByText('Etapa 1 de 9')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
  });

  it('selects a stage and restores the default', async () => {
    const user = userEvent.setup();
    render(<LearningPathExplorer />);

    await user.click(screen.getByRole('button', { name: '9. Transferencia docente' }));
    expect(screen.getByRole('heading', { name: 'Transferencia docente' })).toBeInTheDocument();
    expect(screen.getByText('Etapa 9 de 9')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Anterior' }));
    expect(screen.getByRole('heading', { name: 'Interpretación y límites' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Siguiente' }));
    expect(screen.getByRole('heading', { name: 'Transferencia docente' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByRole('heading', { name: 'Pregunta científica' })).toBeInTheDocument();
  });

  it('moves with arrow keys and keeps focus on the selected stage', async () => {
    const user = userEvent.setup();
    render(<LearningPathExplorer />);

    const first = screen.getByRole('button', { name: '1. Pregunta científica' });
    first.focus();
    await user.keyboard('{ArrowRight}');

    const second = screen.getByRole('button', { name: '2. Datos y representación' });
    expect(second).toHaveFocus();
    expect(second).toHaveAttribute('aria-pressed', 'true');

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('button', { name: '3. Paradigma de aprendizaje' })).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(second).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(first).toHaveFocus();

    await user.keyboard('{End}');
    expect(screen.getByRole('button', { name: '9. Transferencia docente' })).toHaveFocus();

    await user.keyboard('{Home}');
    expect(first).toHaveFocus();
  });
});
