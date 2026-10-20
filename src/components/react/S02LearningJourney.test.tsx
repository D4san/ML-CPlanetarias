// @vitest-environment jsdom
import { useState } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import S02LearningJourney from './S02LearningJourney';
import S02InformationGain from './s02/S02InformationGain';
import S02RegressionThresholdExplorer from './s02/S02RegressionThresholdExplorer';
import S02ThresholdExplorer from './s02/S02ThresholdExplorer';
import S02TreePlayground from './s02/S02TreePlayground';
import S02BootstrapSampler from './s02/S02BootstrapSampler';

function TreeHarness() {
  const [depth, setDepth] = useState(1);
  const [leaf, setLeaf] = useState(1);
  return (
    <S02TreePlayground
      maxDepth={depth}
      minSamplesLeaf={leaf}
      onMaxDepthChange={setDepth}
      onMinSamplesLeafChange={setLeaf}
      onReset={() => {
        setDepth(1);
        setLeaf(1);
      }}
    />
  );
}

beforeEach(() => {
  window.history.replaceState(null, '', '/sesiones/s02/');
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  Element.prototype.scrollTo = vi.fn();
});

describe('S02: recorrido y estados educativos', () => {
  it('recorre todas las unidades y presenta el mismo contenido con referencias finales en lectura', () => {
    render(<S02LearningJourney />);
    const root = document.querySelector('.s02-journey')!;
    const count = Number(root.getAttribute('data-slide-count'));
    const navigation = screen.getByRole('navigation', { name: 'Navegación de la sesión' });
    expect(root).toHaveAttribute('data-slide-role', 'opening');
    for (let i = 1; i < count; i++) {
      fireEvent.click(within(navigation).getByRole('button', { name: 'Siguiente' }));
      expect(root).toHaveAttribute('data-active-slide', String(i));
      expect(document.querySelector('.s02-journey__slide-content')).not.toBeEmptyDOMElement();
    }
    expect(root).toHaveAttribute('data-slide-role', 'references');
    fireEvent.click(
      within(document.querySelector('.s02-journey__footer')!).getByRole('button', {
        name: 'Reiniciar',
      }),
    );
    expect(root).toHaveAttribute('data-slide-role', 'opening');
    fireEvent.click(screen.getByRole('button', { name: 'Lectura' }));
    expect(root).toHaveAttribute('data-display-mode', 'reading');
    expect(document.querySelectorAll('.s02-reading__section')).toHaveLength(6);
    expect(document.querySelectorAll('.book-instrument')).toHaveLength(count - 2);
    expect(document.querySelector('.book-reading > :last-child')).toHaveAttribute(
      'id',
      's02-book-references',
    );
  }, 15000);

  it('mantiene umbral y datos al cambiar de criterio, y reinicia el ejemplo guiado', () => {
    render(<S02InformationGain />);
    for (let i = 0; i < 3; i++)
      fireEvent.click(screen.getByRole('button', { name: 'Paso siguiente' }));
    const output = document.querySelector('output')!;
    expect(output).toHaveTextContent('Después: 0,2');
    fireEvent.click(screen.getByRole('button', { name: 'Entropía' }));
    expect(output).toHaveTextContent('0,549');
    fireEvent.click(screen.getByRole('button', { name: 'Ver mejor corte' }));
    expect(output).toHaveTextContent('Ganancia de información: 1 bits');
    for (let value = 0; value < 7; value++) {
      fireEvent.change(screen.getByRole('slider'), { target: { value } });
      expect(output).not.toHaveTextContent('NaN');
    }
    fireEvent.click(screen.getByRole('button', { name: 'Paso anterior' }));
    expect(screen.getByRole('status')).toHaveTextContent('reducción de Gini 0,3');
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar ejemplo' }));
    expect(screen.getByRole('heading', { name: '1. Contar las clases' })).toBeVisible();
  });

  it('recalcula medias, residuos y MSE con el corte raíz y el segundo nivel', () => {
    render(<S02RegressionThresholdExplorer />);
    const score = document.querySelector('.s02-regression-threshold__score')!;
    expect(score).toHaveTextContent('365,5');
    expect(score).toHaveTextContent('60,92');
    fireEvent.change(screen.getByRole('slider'), { target: { value: 2 } });
    expect(score.querySelector('strong')).toHaveTextContent('544');
    fireEvent.click(screen.getByRole('button', { name: 'Añadir otro corte en la hoja derecha' }));
    fireEvent.change(screen.getByRole('slider'), { target: { value: 1 } });
    expect(score).toHaveTextContent('SSE con dos niveles');
    expect(document.querySelectorAll('line[marker-end]')).toHaveLength(6);
    fireEvent.click(screen.getByRole('button', { name: 'Volver a un solo corte' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(score).toHaveTextContent('365,5');
  });

  it('aplica una regla, permite deshacerla y restablece el nodo raíz', () => {
    render(<S02ThresholdExplorer />);
    const tree = screen.getByRole('list', { name: 'Árbol con la regla candidata' });
    const original = tree.textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar regla' }));
    expect(screen.getByRole('button', { name: 'Deshacer última' })).toBeEnabled();
    fireEvent.click(screen.getByRole('button', { name: 'Deshacer última' }));
    expect(tree.textContent).toBe(original);
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByRole('button', { name: 'Deshacer última' })).toBeDisabled();
  });

  it('relaciona la profundidad con la estructura y permite inspeccionar cada ejemplo', () => {
    render(<TreeHarness />);
    const original = screen.getByRole('img', { name: /Árbol con/ }).getAttribute('aria-label');
    fireEvent.click(screen.getByRole('button', { name: 'Fijar max_depth en 2' }));
    expect(screen.getByRole('img', { name: /Árbol con/ }).getAttribute('aria-label')).not.toBe(
      original,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Fijar mínimo de 3 casos por hoja' }));
    fireEvent.click(screen.getByRole('button', { name: 'Fijar mínimo de 2 casos por hoja' }));
    const selected = screen.getByLabelText('Ejemplo') as HTMLSelectElement;
    for (const option of Array.from(selected.options))
      fireEvent.change(selected, { target: { value: option.value } });
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByRole('img', { name: /Árbol con/ }).getAttribute('aria-label')).toBe(
      original,
    );
  });

  it('genera remuestras completas y recupera la ronda inicial', () => {
    render(<S02BootstrapSampler />);
    const initial = screen.getByLabelText(
      'Una remuestra independiente para cada árbol',
    ).textContent;
    fireEvent.click(screen.getByRole('button', { name: /Sortear/ }));
    expect(
      screen.getByLabelText('Una remuestra independiente para cada árbol').textContent,
    ).not.toBe(initial);
    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(screen.getByLabelText('Una remuestra independiente para cada árbol').textContent).toBe(
      initial,
    );
  });
});
