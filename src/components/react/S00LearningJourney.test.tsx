// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { courseConfig } from '../../../config/course.config';
import S00LearningJourney from './S00LearningJourney';

beforeEach(() => window.history.replaceState(null, '', '/sesiones/s00/'));

describe('S00 journey', () => {
  it('opens on the scientific question and traverses the common rail', async () => {
    const user = userEvent.setup();
    render(<S00LearningJourney config={courseConfig} />);

    expect(screen.getByRole('heading', { name: 'De los mundos a los datos' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Un mundo se vuelve observable' })).toBeVisible();
    expect(screen.queryByText(/^Ruta:$/)).not.toBeInTheDocument();
    expect(screen.getByAltText(/estrella con un planeta en tránsito/i)).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    expect(window.location.hash).toBe('#pregunta/senal');
    expect(screen.getByRole('heading', { name: 'Señal' })).toBeVisible();
    expect(document.querySelector('[data-active-part="senal"]')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Subslide 01\.3 · 01 · abrir/ }));
    expect(window.location.hash).toBe('#pregunta/pregunta-guia');
    expect(screen.getByRole('heading', { name: 'Pregunta guía' })).toBeVisible();
  });

  it('keeps scientific activity state when switching views', async () => {
    const user = userEvent.setup();
    render(<S00LearningJourney config={{ ...courseConfig, defaultView: 'activities' }} />);

    const checkbox = screen.getByRole('checkbox', {
      name: /Acoté una curiosidad/i,
    });
    await user.click(checkbox);
    expect(screen.getByRole('status')).toHaveTextContent('1 de 5');
    await user.click(screen.getByRole('button', { name: 'Presentación' }));
    expect(screen.getByRole('heading', { name: 'Un mundo se vuelve observable' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Actividades' }));
    expect(screen.getByRole('checkbox', { name: /Acoté una curiosidad/i })).toBeChecked();
  });

  it('recovers an invalid hash and exposes local terms by keyboard', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#missing');
    render(<S00LearningJourney config={courseConfig} />);

    expect(screen.getByRole('status')).toHaveTextContent(/todavía no existe/i);
    const term = screen.getByLabelText('Aclarar Exoplaneta');
    await user.click(term);
    expect(screen.getByText(/Planeta que orbita una estrella/i)).toBeVisible();
  });

  it('exposes the hierarchical rail and station parts', () => {
    render(<S00LearningJourney config={courseConfig} />);

    const journey = document.querySelector('[data-ready="true"]');
    const rail = screen.getByRole('navigation', { name: 'Diapositivas de S00' });

    expect(journey).toHaveAttribute('data-slide-count', '42');
    expect(rail.querySelectorAll('.slide-rail__index')).toHaveLength(42);
    expect(screen.getByText('01.1')).toBeInTheDocument();
    expect(screen.getByText('01.2')).toBeInTheDocument();
    expect(screen.getByText('01.3')).toBeInTheDocument();
    expect(screen.getByText('02.1')).toBeInTheDocument();
  });
});
