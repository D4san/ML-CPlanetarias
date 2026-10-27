// @vitest-environment jsdom

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import S03EvaluationScenes from './S03EvaluationScenes';

const metricExpectations = [
  {
    id: 'accuracy',
    definition: 'Accuracy es la proporción de señales cuya predicción coincide con la referencia.',
    result: '15/20 = 0,75 (75 %)',
  },
  {
    id: 'error',
    definition:
      'La tasa de error es la proporción de señales cuya predicción difiere de la referencia.',
    result: '5/20 = 0,25 (25 %)',
  },
  {
    id: 'precision',
    definition: 'Precision es la proporción de predicciones PC cuya referencia también es PC.',
    result: '7/9 = 0,778 (77,778 %)',
  },
  {
    id: 'recall',
    definition:
      'Recall es la proporción de señales PC de referencia que el clasificador recupera como PC.',
    result: '7/10 = 0,7 (70 %)',
  },
  {
    id: 'specificity',
    definition:
      'La especificidad es la proporción de referencias negativas clasificadas como negativas.',
    result: '8/10 = 0,8 (80 %)',
  },
  {
    id: 'fpr',
    definition:
      'La tasa de falsos positivos es la proporción de referencias negativas clasificadas como PC.',
    result: '2/10 = 0,2 (20 %)',
  },
  {
    id: 'f1',
    definition: 'F1 es la media armónica de precision y recall para la clase PC.',
    result: '14/19 = 0,737 (73,684 %)',
  },
] as const;

describe('S03: escenas de evaluación', () => {
  it.each(metricExpectations)(
    'define $id y calcula el resultado de la misma matriz fija',
    ({ id, definition, result }) => {
      render(<S03EvaluationScenes sceneId={`metric-${id}`} />);

      const matrix = screen.getByRole('table', { name: definition });
      for (const [cellId, count] of Object.entries({ tp: 7, fn: 3, fp: 2, tn: 8 })) {
        expect(matrix.querySelector(`td[data-cell="${cellId}"]`)).toHaveTextContent(String(count));
      }
      expect(within(matrix).queryByRole('button')).not.toBeInTheDocument();
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
      expect(
        screen.queryByText(/Conteos actuales|El borde verde|Caso ficticio que cambiará/),
      ).not.toBeInTheDocument();
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
    expect(screen.queryByLabelText('Caso ficticio que cambiará')).not.toBeInTheDocument();
    expect(document.querySelectorAll('input[type="range"]')).toHaveLength(4);
    expect(document.querySelectorAll('select#s03-case-select')).toHaveLength(0);
    expect(document.querySelectorAll('input#s03-threshold-slider')).toHaveLength(0);
  });

  it('clasifica escenas y revela su referencia junto con la celda correspondiente', async () => {
    const user = userEvent.setup();
    render(<S03EvaluationScenes sceneId="confusion-matrix" />);

    expect(screen.getAllByRole('article', { name: /Señal sin clasificar/ })).toHaveLength(8);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    const planet = screen.getAllByRole('article', { name: /Planeta en tránsito/ })[0]!;
    await user.click(within(planet).getByRole('button', { name: 'Tránsito' }));

    const matrix = screen.getByRole('table');
    expect(
      within(matrix).getByRole('rowheader', { name: 'PC · candidata a planeta' }),
    ).toBeInTheDocument();
    expect(within(matrix).getByText('TP · acierto')).toBeInTheDocument();
    expect(screen.getByText(/Clasificadas 1 de ocho/)).toBeInTheDocument();

    const binary = screen.getAllByRole('article', { name: /Binaria eclipsante/ })[0]!;
    await user.click(within(binary).getByRole('button', { name: 'Tránsito' }));
    expect(within(matrix).getByText('FP · error')).toBeInTheDocument();
    expect(
      within(matrix).getByText('Referencia: AFP · falso positivo astrofísico'),
    ).toBeInTheDocument();

    const falsePositiveCell = matrix.querySelector<HTMLTableCellElement>('td[data-cell="fp"]')!;
    await user.click(
      within(falsePositiveCell).getByRole('button', { name: 'Cambiar a no tránsito' }),
    );
    expect(within(matrix).getByText('TN · acierto')).toBeInTheDocument();
    expect(screen.getByText(/TP 1 · FN 0 · FP 0 · TN 1/)).toBeInTheDocument();
  });

  it('actualiza la clasificación inclusiva al umbral seleccionado', async () => {
    const user = userEvent.setup();
    render(<S03EvaluationScenes sceneId="threshold" />);

    await user.click(screen.getByRole('button', { name: '0,5' }));

    const matrix = screen.getByRole('table', { name: /Tránsito representa PC/ });
    for (const [cellId, count] of Object.entries({ tp: 3, fp: 2, fn: 0, tn: 1 })) {
      expect(matrix.querySelector(`td[data-cell="${cellId}"]`)).toHaveTextContent(String(count));
    }
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
    expect(
      screen.getByRole('img', { name: /Curva precision–recall sintética/ }),
    ).toHaveAccessibleDescription(/Con umbral 0,5, recall es 1 y precision es 0,6/);
  });

  it('muestra los nueve pares y el área ROC desglosada, constante ante el umbral', async () => {
    const user = userEvent.setup();
    render(<S03EvaluationScenes sceneId="auc" />);

    await user.click(screen.getByText('Ver cómo se calcula el área del ejemplo'));

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
