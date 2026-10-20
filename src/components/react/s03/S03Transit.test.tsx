// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import S03TransitAnimation from './S03TransitAnimation';
import S03TransitGeometry from './S03TransitGeometry';
import S03TransitInference from './S03TransitInference';

function enableReducedMotion() {
  vi.stubGlobal('matchMedia', (media: string) => ({
    matches: true,
    media,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('escenas de tránsito S03', () => {
  beforeEach(enableReducedMotion);
  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('monta las tres escenas juntas con IDs accesibles únicos', () => {
    const { container } = render(
      <>
        <S03TransitAnimation />
        <S03TransitGeometry />
        <S03TransitInference />
      </>,
    );
    const ids = Array.from(container.querySelectorAll('[id]'), (element) => element.id);

    expect(ids.length).toBeGreaterThan(20);
    expect(new Set(ids).size).toBe(ids.length);
    expect(screen.getAllByRole('img')).toHaveLength(5);
    expect(screen.getByText(/Una caída aislada puede tener varias causas/)).toBeTruthy();
  });

  it('muestra una serie sintética estática con caídas repetidas y sin controles locales', () => {
    render(<S03TransitInference />);
    const scene = screen.getByRole('region', {
      name: 'La repetición ayuda a formular una hipótesis',
    });
    const plot = within(scene).getByRole('img', {
      name: /^Serie fotométrica sintética con tres caídas repetidas/,
    });

    expect(plot.querySelectorAll('circle')).toHaveLength(481);
    expect(plot.querySelectorAll('.s03-inference__event-center')).toHaveLength(3);
    expect(plot.querySelectorAll('circle[data-in-transit="true"]').length).toBeGreaterThan(0);
    expect(within(scene).queryByRole('slider')).toBeNull();
    expect(within(scene).queryByRole('button')).toBeNull();
    expect(scene).toHaveTextContent('Una caída:');
    expect(within(scene).getByText('Ejemplo sintético.', { exact: true })).toBeInTheDocument();
    expect(
      within(scene).getByRole('note', { name: 'Advertencia: hipótesis por contrastar' }),
    ).toHaveTextContent('una binaria eclipsante también puede ser periódica.');
    expect(scene.querySelector('.s03-inference__warning-item')).toBeInTheDocument();
    expect(plot.querySelector('desc')).toHaveTextContent('no es una observación de Kepler');
  });

  it('reduce los controles y permite explorar la fase del tránsito a mano', () => {
    render(<S03TransitAnimation />);
    const animation = screen.getByRole('region', {
      name: 'Modelo orbital y caída de luz observada',
    });
    const controls = within(animation).getByRole('group', {
      name: 'Controles de la animación orbital',
    });
    const buttons = within(controls).getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(within(controls).getByRole('button', { name: 'Reproducir' })).toBeTruthy();
    expect(within(controls).getByRole('button', { name: 'Reiniciar' })).toBeTruthy();

    const phaseSlider = within(controls).getByRole('slider', { name: /Fase orbital/ });
    fireEvent.change(phaseSlider, { target: { value: '0' } });

    expect(phaseSlider).toHaveProperty('value', '0');
    expect(animation.querySelector('.s03-transit__live-summary')?.textContent).toContain(
      'flujo relativo 0.990',
    );
    expect(animation.textContent).toContain('Vemos el tránsito de frente');
    expect(animation.querySelector('.s03-transit__line-of-sight')?.textContent).toContain(
      'mirada −z',
    );
    expect(animation.querySelector('.s03-transit__line-of-sight')?.textContent).toContain(
      'observador +z',
    );
    expect(within(animation).getByText(/Movimiento reducido activo/)).toBeTruthy();
  });

  it('amplía y rotula la escala vertical de la caída', () => {
    render(<S03TransitAnimation />);
    const curve = screen.getByRole('img', {
      name: /Caída del flujo estelar durante el tránsito/,
    });
    expect(curve.querySelectorAll('.s03-transit__tick-label--flux')).toHaveLength(3);
    expect(curve.textContent).toContain('0.985');
    expect(curve.textContent).toContain('1.000');
    expect(curve.closest('figure')?.querySelector('figcaption')).toHaveTextContent(
      'Eje vertical ampliado (0.985–1.002)',
    );
  });

  it('mantiene la escena montada al cambiar la fase con movimiento reducido', () => {
    render(<S03TransitAnimation />);
    const animation = screen.getByRole('region', {
      name: 'Modelo orbital y caída de luz observada',
    });
    const phaseSlider = within(animation).getByRole('slider', { name: /Fase orbital/ });

    phaseSlider.focus();
    fireEvent.change(phaseSlider, { target: { value: '-0.21' } });

    expect(phaseSlider).toHaveProperty('value', '-0.21');
    expect(within(animation).getByText(/Movimiento reducido activo/)).toBeTruthy();
    expect(animation.querySelector('.s03-transit__live-summary')).toHaveTextContent(
      'flujo relativo',
    );
  });

  it('actualiza la clasificación, el perfil estelar y la fase desde controles etiquetados', async () => {
    const user = userEvent.setup();
    render(<S03TransitGeometry />);
    const geometry = screen.getByRole('region', {
      name: 'Una órbita, dos representaciones sincronizadas',
    });
    const projection = within(geometry).getByRole('img', { name: /^Geometría del tránsito/ });
    const curve = within(geometry).getByRole('img', { name: /Curva de luz sincronizada/ });
    expect(curve).toHaveAttribute('viewBox', '0 0 520 340');
    expect(curve.closest('figure')?.querySelector('figcaption')).toBeNull();
    expect(geometry.querySelector('.s03-transit__live-summary')).toBeNull();
    expect(within(geometry).queryByRole('button', { name: 'Central' })).toBeNull();
    expect(within(geometry).queryByRole('button', { name: 'Rasante' })).toBeNull();
    expect(within(geometry).queryByRole('button', { name: 'Sin tránsito' })).toBeNull();
    expect(within(geometry).queryByRole('button', { name: 'Uniforme' })).toBeNull();
    expect(within(geometry).queryByText('I/Ic = 1 en todo el disco.')).toBeNull();

    const limbButton = screen.getByRole('button', { name: 'Oscurecimiento al limbo' });
    expect(limbButton.getAttribute('aria-pressed')).toBe('false');
    await user.click(limbButton);
    expect(limbButton.getAttribute('aria-pressed')).toBe('true');
    expect(projection).toHaveAttribute('data-profile', 'linear-limb-darkening');
    expect(projection.querySelector('.s03-transit__star')).toHaveAttribute(
      'data-profile',
      'linear-limb-darkening',
    );
    expect(projection.querySelector('.s03-transit__star-edge')).toHaveAttribute(
      'data-profile',
      'linear-limb-darkening',
    );
    const stops = Array.from(projection.querySelectorAll('stop'));
    expect(stops).toHaveLength(7);
    expect(stops[0]).toHaveAttribute('data-normalized-intensity', '1.000');
    expect(stops[6]).toHaveAttribute('data-normalized-intensity', '0.400');
    expect(stops[0]).toHaveAttribute('stop-color', '#f7c85c');
    expect(stops.at(6)?.getAttribute('stop-color')).not.toBe('#f7c85c');
    expect(projection.querySelector('desc')?.textContent).toContain('0,4 en el borde');
    expect(geometry.querySelector('.s03-transit__limb-comparison')).toBeNull();
    expect(geometry).toHaveTextContent(/1 en el centro a 0,4 en el borde/);

    const phaseSlider = screen.getByRole('slider', { name: /Fase/ });
    fireEvent.change(phaseSlider, { target: { value: '0.01' } });
    expect(Number((phaseSlider as HTMLInputElement).value)).toBeGreaterThan(0);

    await user.click(limbButton);
    expect(limbButton.getAttribute('aria-pressed')).toBe('false');
    expect(projection).toHaveAttribute('data-profile', 'uniform');
    expect(projection.querySelector('.s03-transit__star-edge')).toHaveAttribute(
      'data-profile',
      'uniform',
    );
    expect(Array.from(projection.querySelectorAll('stop'))).toHaveLength(2);
  });

  it('explica el parámetro de impacto desde el signo de interrogación junto a su ecuación', async () => {
    const user = userEvent.setup();
    render(<S03TransitGeometry />);

    const help = screen.getByRole('button', { name: '¿Qué significa Parámetro de impacto?' });
    await user.click(help);

    const dialog = screen.getByRole('dialog', { name: '¿Qué significa Parámetro de impacto?' });
    expect(within(dialog).getByText(/separación proyectada entre los centros/)).toBeInTheDocument();
    expect(within(dialog).getByText(/b = \(a\/R\*\) cos\(i\)/)).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Cerrar' }));
    expect(help).toHaveFocus();
  });

  it('expone pausa y reinicio y restaura la fase de inicio', async () => {
    const user = userEvent.setup();
    render(<S03TransitAnimation />);
    const playButton = screen.getByRole('button', { name: 'Reproducir' });
    await user.click(playButton);
    expect(playButton.getAttribute('aria-pressed')).toBe('true');

    const pauseButton = screen.getByRole('button', { name: 'Pausar' });
    await user.click(pauseButton);
    expect(screen.getByRole('button', { name: 'Reproducir' }).getAttribute('aria-pressed')).toBe(
      'false',
    );

    await user.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByRole('slider', { name: /Fase orbital/ })).toHaveProperty('value', '-0.22');
  });

  it('mantiene flujo y duración nulos si la orientación no produce tránsito', async () => {
    render(<S03TransitGeometry />);
    const geometry = screen.getByRole('region', {
      name: 'Una órbita, dos representaciones sincronizadas',
    });
    const inclinationSlider = within(geometry).getByRole('slider', { name: /Inclinación i/ });
    const projection = within(geometry).getByRole('img', { name: /^Geometría del tránsito/ });
    fireEvent.change(inclinationSlider, { target: { value: '82' } });

    expect(projection).toHaveAttribute('data-transit-kind', 'none');
    expect(projection.querySelector('.s03-transit__diagram-label--state')).toHaveTextContent(
      'sin tránsito',
    );
    expect(geometry.querySelector('.s03-transit__live-summary')).toBeNull();
  });
});
