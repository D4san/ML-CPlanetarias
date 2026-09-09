// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { courseConfig } from '../../../config/course.config';
import S01LearningJourney from './S01LearningJourney';

beforeEach(() => window.history.replaceState(null, '', '/sistema/'));

describe('S01 pilot', () => {
  it('opens bibliography, traverses one part at a time and goes back to bibliography', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);
    expect(
      screen.getByRole('heading', { name: 'Dos libros para orientar el recorrido' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    expect(
      screen.getByRole('heading', { name: '¿Qué queremos responder con los datos?' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: '¿Qué podemos hacer con una observación?' }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    expect(window.location.hash).toBe('#pregunta/salidas');
    expect(
      screen.queryByRole('heading', { name: '¿Qué queremos responder con los datos?' }),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    expect(window.location.hash).toBe('#pregunta/disciplinas');
    expect(
      screen
        .getAllByRole('button')
        .filter((button) => ['Estadística', 'ML', 'IA'].includes(button.textContent ?? ''))
        .map((button) => button.textContent),
    ).toEqual(['Estadística', 'ML', 'IA']);
    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    expect(window.location.hash).toBe('#instancia');
    await user.click(screen.getByRole('button', { name: '← Anterior' }));
    expect(window.location.hash).toBe('#pregunta/disciplinas');
    await user.click(screen.getByRole('button', { name: 'Bibliografía' }));
    expect(window.location.hash).toBe('#bibliografia');
  });

  it('shows definitions without revealing and respects the configured route on reset', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sistema/#pregunta/salidas');
    render(
      <S01LearningJourney
        config={{
          ...courseConfig,
          interactionMode: 'direct',
          teacherMode: true,
          s01: { enabledRouteIds: ['catalog'], defaultRouteId: 'catalog' },
        }}
      />,
    );
    expect(screen.getByText(/Asignar una salida a una instancia nueva/i)).toBeVisible();
    expect(
      screen.queryByRole('button', { name: 'Voltear: ver definición' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Espectro → abundancia' })).not.toBeInTheDocument();
    expect(screen.getByLabelText('Pregunta sugerida para docentes')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Predecir. Ir a definición' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '2. Instancia y representación' }));
    await user.click(screen.getByRole('button', { name: '2. De observación a salida' }));
    expect(screen.getAllByText('Un exoplaneta del catálogo.').length).toBeGreaterThan(0);
    expect(screen.getByText(/Variables o estructuras que describen una instancia/)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'modelo. Ir a definición' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '3. Señal y paradigma' }));
    await user.click(screen.getByRole('button', { name: '2. Tres paradigmas' }));
    expect(screen.getByText(/cada instancia de ajuste viene acompañada/)).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Supervisado. Abrir definición' }));
    await user.click(screen.getByRole('button', { name: '4. Tarea y salida' }));
    await user.click(screen.getByRole('button', { name: '2. Árbol de salidas' }));
    await user.click(screen.getByRole('button', { name: 'Regresión. Abrir definición' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(document.querySelector('.s01-journey')).toHaveAttribute('data-scenario', 'catalog');
    expect(
      screen.getByRole('heading', { name: 'Dos libros para orientar el recorrido' }),
    ).toBeInTheDocument();
  });

  it('preserves the part and scenario across reading and presentation', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sistema/#instancia/flujo');
    render(<S01LearningJourney />);
    await user.click(screen.getByRole('button', { name: 'Telescopio → seguimiento' }));
    expect(
      screen.getByText('Una decisión de seguimiento de un candidato exoplanetario.'),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Lectura' }));
    expect(screen.queryByLabelText('Pregunta sugerida para docentes')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Presentación' }));
    expect(window.location.hash).toBe('#instancia/flujo');
    expect(document.querySelector('.s01-journey')).toHaveAttribute('data-scenario', 'followup');
    expect(
      screen.queryByRole('heading', { name: 'La notación separa ajustar de usar' }),
    ).not.toBeInTheDocument();
  });

  it('uses a configured reading view and permits an explicit presentation view', async () => {
    const user = userEvent.setup();
    render(
      <S01LearningJourney
        config={{ ...courseConfig, defaultView: 'reading', teacherMode: true }}
      />,
    );
    expect(document.querySelector('.s01-journey')).toHaveAttribute('data-display-mode', 'reading');
    expect(screen.getAllByLabelText('Pregunta sugerida para docentes')).toHaveLength(7);
    await user.click(screen.getByRole('button', { name: 'Presentación' }));
    expect(window.location.search).toBe('?modo=presentacion');
  });
});
