// @vitest-environment jsdom

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import S03EvaluationScenes from './S03EvaluationScenes';

const metricExpectations = [
  {
    id: 'accuracy',
    numerator: ['tp', 'tn'],
    denominator: ['tp', 'tn', 'fp', 'fn'],
    result: '14/20 = 0,7 (70 %)',
  },
  {
    id: 'error',
    numerator: ['fp', 'fn'],
    denominator: ['tp', 'tn', 'fp', 'fn'],
    result: '6/20 = 0,3 (30 %)',
  },
  {
    id: 'precision',
    numerator: ['tp'],
    denominator: ['tp', 'fp'],
    result: '6/8 = 0,75 (75 %)',
  },
  { id: 'recall', numerator: ['tp'], denominator: ['tp', 'fn'], result: '6/10 = 0,6 (60 %)' },
  {
    id: 'specificity',
    numerator: ['tn'],
    denominator: ['tn', 'fp'],
    result: '8/10 = 0,8 (80 %)',
  },
  { id: 'fpr', numerator: ['fp'], denominator: ['fp', 'tn'], result: '2/10 = 0,2 (20 %)' },
  {
    id: 'f1',
    numerator: ['tp'],
    denominator: ['tp', 'fp', 'fn'],
    result: '12/18 = 0,667 (66,667 %)',
  },
] as const;

describe('S03: escenas de evaluación', () => {
  it.each(metricExpectations)(
    'actualiza la matriz y la sustitución de $id al cambiar una predicción',
    async ({ id, numerator, denominator, result }) => {
      const user = userEvent.setup();
      render(<S03EvaluationScenes sceneId={`metric-${id}`} />);

      const matrix = screen.getByRole('table');
      for (const cellId of ['tp', 'fp', 'fn', 'tn']) {
        const cell = matrix.querySelector(`td[data-cell="${cellId}"]`)!;
        expect(cell.classList.contains('s03-confusion__cell--numerator')).toBe(
          numerator.includes(cellId as never),
        );
        expect(cell.classList.contains('s03-confusion__cell--denominator')).toBe(
          denominator.includes(cellId as never),
        );
      }

      if (id === 'precision') {
        await user.click(
          screen.getByRole('button', {
            name: /^PC-01 · referencia PC · predicción PC\. Clase visible: Tránsito/,
          }),
        );
      } else {
        await user.click(screen.getByRole('button', { name: 'Cambiar predicción a AFP/NTP' }));
      }

      expect(screen.getByText('Conteos actuales: TP 6 · FP 2 · FN 4 · TN 8.')).toBeInTheDocument();
      if (id === 'precision') {
        expect(document.querySelector('.s03-case-control')).not.toBeInTheDocument();
        expect(
          screen.getByRole('button', {
            name: /^PC-01 · referencia PC · predicción AFP\/NTP\. Clase visible: NTránsito/,
          }),
        ).toHaveAttribute('aria-pressed', 'false');
      } else {
        expect(document.querySelector('.s03-case-control p')).toHaveTextContent(
          'Referencia fija: PC. Solo cambia la columna de predicción.',
        );
        expect(screen.getByRole('button', { name: 'Cambiar predicción a PC' })).toBeInTheDocument();
      }
      expect(screen.getByText(result)).toBeInTheDocument();
    },
  );

  it('mantiene IDs únicos cuando las catorce escenas se montan simultáneamente', () => {
    const sceneIds = [
      'evaluation-split',
      'confusion-matrix',
      'confusion-cases',
      ...metricExpectations.map(({ id }) => `metric-${id}`),
      'threshold',
      'pr',
      'roc',
      'auc',
    ];
    render(
      <>
        {sceneIds.map((sceneId) => (
          <section key={sceneId}>
            <S03EvaluationScenes sceneId={sceneId} />
          </section>
        ))}
      </>,
    );

    const ids = Array.from(document.querySelectorAll('[id]'), (element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(screen.getAllByLabelText('Caso ficticio que cambiará')).toHaveLength(6);
    expect(document.querySelectorAll('input[type="range"]')).toHaveLength(4);
    expect(document.querySelectorAll('select#s03-case-select')).toHaveLength(0);
    expect(document.querySelectorAll('input#s03-threshold-slider')).toHaveLength(0);
  });

  it('permite mover una señal ficticia entre celdas sin mover su referencia', async () => {
    const user = userEvent.setup();
    render(<S03EvaluationScenes sceneId="confusion-matrix" />);

    const transit = screen.getByRole('button', { name: /^PC-01 · referencia PC · predicción PC/ });
    expect(transit).toHaveAttribute('data-cell', 'tp');
    expect(transit).toHaveTextContent('PC-01Tránsito');
    expect(screen.getByRole('columnheader', { name: 'Tránsito' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'NTránsito' })).toBeInTheDocument();
    expect(
      screen.getByText(/Tránsito representa PC; NTránsito reúne AFP\/NTP/),
    ).toBeInTheDocument();

    await user.click(transit);

    expect(screen.getByText(/TP 6 · FP 2 · FN 4 · TN 8/)).toBeInTheDocument();
    const nonTransit = screen.getByRole('button', {
      name: /^PC-01 · referencia PC · predicción AFP\/NTP\. Clase visible: NTránsito/,
    });
    expect(nonTransit).toHaveAttribute('aria-pressed', 'false');
    expect(nonTransit).toHaveAttribute('data-cell', 'fn');
    expect(nonTransit).toHaveTextContent('PC-01NTránsito');
    expect(screen.getByRole('rowheader', { name: 'Tránsito (positiva)' })).toBeInTheDocument();

    const falsePositive = screen.getByRole('button', {
      name: /^NEG-01 · referencia AFP\/NTP · predicción PC/,
    });
    expect(falsePositive).toHaveAttribute('data-cell', 'fp');
    expect(falsePositive).toHaveTextContent('NEG-01Tránsito');
    await user.click(falsePositive);

    const trueNegative = screen.getByRole('button', {
      name: /^NEG-01 · referencia AFP\/NTP · predicción AFP\/NTP\. Clase visible: NTránsito/,
    });
    expect(trueNegative).toHaveAttribute('data-cell', 'tn');
    expect(trueNegative).toHaveTextContent('NEG-01NTránsito');
  });

  it('actualiza la clasificación inclusiva al umbral seleccionado', async () => {
    const user = userEvent.setup();
    render(<S03EvaluationScenes sceneId="threshold" />);

    await user.click(screen.getByRole('button', { name: '0,5' }));

    expect(document.querySelector('.s03-threshold-summary [role="status"]')).toHaveTextContent(
      'TP 3 · FP 2 · FN 0 · TN 1',
    );
    expect(document.querySelector('input[type="range"]')).toHaveValue('0.5');
  });

  it('presenta la curva PR sintética junto a la Figura 6 publicada', async () => {
    const user = userEvent.setup();
    render(<S03EvaluationScenes sceneId="pr" />);

    expect(
      screen.getByRole('img', { name: /Curva precision–recall sintética/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Figura 6 del artículo/ })).toHaveAttribute(
      'src',
      expect.stringContaining('paper-fig-06.svg'),
    );
    expect(
      screen.getByRole('link', {
        name: /Christopher J\. Shallue & Andrew Vanderburg \(2018\).*Figura 6/,
      }),
    ).toHaveAttribute('href', 'https://doi.org/10.3847/1538-3881/aa9e09');
    await user.click(screen.getByRole('button', { name: '0,5' }));
    expect(screen.getByText(/Con umbral 0,5, recall = 1 y precision = 0,6/)).toBeInTheDocument();
  });

  it('muestra los nueve pares y el área ROC desglosada, constante ante el umbral', async () => {
    const user = userEvent.setup();
    render(<S03EvaluationScenes sceneId="auc" />);

    const comparisons = screen.getByRole('table', {
      name: /Ordenar PC por encima de la referencia negativa/,
    });
    expect(within(comparisons).getAllByRole('cell')).toHaveLength(9);
    const area = screen.getByRole('table', {
      name: /Seis tramos entre los siete puntos de operación ROC/,
    });
    expect(within(area).getAllByRole('row')).toHaveLength(8);
    expect(within(area).getByText('2/9 + 1/3 + 1/3 = 8/9')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '0,5' }));

    expect(screen.getByText('AUC = 8/9 = 0,889')).toBeInTheDocument();
    expect(within(area).getByText('2/9 + 1/3 + 1/3 = 8/9')).toBeInTheDocument();
  });
});
