// @vitest-environment jsdom
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import S03LearningJourney from './S03LearningJourney';

beforeEach(() => {
  window.history.replaceState({}, '', '/sesiones/s03/');
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe('S03: recorrido integrado', () => {
  it('abre con una ruta visual numerada y un crédito breve de IA', () => {
    render(<S03LearningJourney />);
    const route = screen.getByRole('list', { name: 'Recorrido de aprendizaje' });
    const steps = within(route).getAllByRole('listitem');

    expect(steps).toHaveLength(4);
    expect(steps[0]).toHaveTextContent('Tránsito y Kepler');
    expect(steps[3]).toHaveTextContent('Decisión y evidencia');
    expect(route.querySelectorAll('.session-opening__step-number')).toHaveLength(4);
    expect(route.querySelector('.session-opening__step-number')).toHaveTextContent('01');
    expect(screen.getByText('Ilustración generada con IA.')).toBeInTheDocument();
    expect(
      screen.queryByText(/Sigue el recorrido con Anterior y Siguiente/),
    ).not.toBeInTheDocument();
  });

  it('recorre 33 pantallas, abre referencias y reinicia', () => {
    render(<S03LearningJourney />);
    const root = document.querySelector('.s03-journey')!;
    const nav = screen.getByRole('navigation', { name: 'Navegación de la sesión' });
    expect(root).toHaveAttribute('data-slide-role', 'opening');
    for (let i = 1; i < 33; i++) {
      fireEvent.click(within(nav).getByRole('button', { name: 'Siguiente' }));
      expect(root).toHaveAttribute('data-active-slide', String(i));
      expect(document.querySelector('.s03-scene')).not.toBeEmptyDOMElement();
    }
    expect(root).toHaveAttribute('data-slide-role', 'references');
    fireEvent.click(screen.getByRole('button', { name: /^Reiniciar$/ }));
    expect(root).toHaveAttribute('data-slide-role', 'opening');
  }, 20000);
  it('conserva vistas, capítulos y actividades, y vuelve a presentación', () => {
    render(<S03LearningJourney />);
    fireEvent.click(screen.getByRole('button', { name: /^Lectura$/ }));
    expect(document.querySelectorAll('.book-chapter')).toHaveLength(9);
    expect(document.querySelectorAll('.book-example')).toHaveLength(9);
    fireEvent.click(screen.getByRole('button', { name: /^Actividades$/ }));
    expect(screen.getByRole('heading', { name: 'Decidir y justificar' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Volver a Presentación' }));
    expect(document.querySelector('.s03-journey')).toHaveAttribute(
      'data-display-mode',
      'presentation',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Modo docente' }));
    fireEvent.click(screen.getByRole('button', { name: /^Referencias$/ }));
    expect(document.querySelector('.s03-journey')).toHaveAttribute('data-slide-role', 'references');
  }, 20000);
  it('abre enlaces profundos y recupera portada ante un hash desconocido', () => {
    window.history.replaceState({}, '', '/sesiones/s03/#unknown');
    render(<S03LearningJourney />);
    expect(document.querySelector('.s03-journey')).toHaveAttribute('data-active-slide', '0');
    window.history.replaceState({}, '', '/sesiones/s03/#bibliografia');
    fireEvent(window, new Event('hashchange'));
    expect(document.querySelector('.s03-journey')).toHaveAttribute('data-slide-role', 'references');
    window.history.replaceState({}, '', '/sesiones/s03/?modo=lectura#s03-reading-threshold');
    fireEvent(window, new Event('popstate'));
    expect(document.querySelector('.s03-journey')).toHaveAttribute('data-display-mode', 'reading');
  });
});
