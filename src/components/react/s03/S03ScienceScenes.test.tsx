// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { S03ScienceScenes } from './S03ScienceScenes';

const scienceSceneIds = [
  'mission-history',
  'pixels-aperture-flux',
  'kepler10-observation',
  'variability',
  'eclipsing-blend',
  'artifact-aperture',
  'classification-task',
  'binary-input-output',
  'classification-vocabulary',
  'preparation',
  'folded-views',
  'cnn-score',
  'paper-results',
  'paper-limits',
] as const;

describe('S03: escenas científicas', () => {
  it.each(scienceSceneIds)('renderiza la escena %s con su rótulo accesible', (sceneId) => {
    const { container } = render(<S03ScienceScenes sceneId={sceneId} />);
    expect(container.querySelector('section[aria-label]')).toBeInTheDocument();
  });

  it('distingue misión primaria, K2 y los conteos históricos con población y fecha', async () => {
    const user = userEvent.setup();
    const { container } = render(<S03ScienceScenes sceneId="mission-history" />);

    expect(screen.getByText(/150 000/)).toBeInTheDocument();
    expect(screen.getByText(/500 000/)).toBeInTheDocument();
    expect(screen.getByText(/2018/)).toBeInTheDocument();
    const missionImage = container.querySelector('.s03-science__mission-image img');
    expect(missionImage).toHaveAttribute(
      'src',
      expect.stringContaining('/images/s03/kepler-k2-artist-concept-nasa.jpg'),
    );
    expect(screen.getByRole('link', { name: /Ficha NASA/ })).toHaveAttribute(
      'href',
      'https://science.nasa.gov/image-detail/amf-pia18904/',
    );
    await user.click(screen.getByRole('button', { name: 'Extensión K2' }));

    expect(screen.getByText(/campañas y una estrategia de apuntado distinta/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Extensión K2' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('amplía PIA18904 completa y conserva la fuente dentro del diálogo', async () => {
    const user = userEvent.setup();
    render(<S03ScienceScenes sceneId="mission-history" />);

    const trigger = screen.getByRole('link', {
      name: 'Ampliar el concepto artístico de Kepler durante K2',
    });
    await user.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Kepler durante la misión K2' });
    expect(dialog).toBeVisible();
    expect(
      within(dialog).getByRole('img', { name: /Concepto artístico de la nave Kepler/ }),
    ).toHaveAttribute('src', expect.stringContaining('kepler-k2-artist-concept-nasa.jpg'));
    expect(within(dialog).getByRole('link', { name: 'Ficha original en NASA ↗' })).toHaveAttribute(
      'href',
      'https://science.nasa.gov/image-detail/amf-pia18904/',
    );

    await user.click(within(dialog).getByRole('button', { name: 'Cerrar imagen ampliada' }));
    expect(dialog).not.toHaveAttribute('open');
    expect(trigger).toHaveFocus();
  });

  it('recorre píxeles, apertura y suma fotométrica sin ocultar incertidumbre ni calidad', async () => {
    const user = userEvent.setup();
    render(<S03ScienceScenes sceneId="pixels-aperture-flux" />);

    await user.click(screen.getByRole('button', { name: '2. Apertura' }));
    expect(screen.getByText(/La máscara selecciona una apertura/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '3. Suma SAP' }));
    expect(screen.getByText(/SAP suma los píxeles elegidos/)).toBeInTheDocument();
    expect(screen.getByText(/PDCSAP/)).toBeInTheDocument();
    expect(screen.getByText(/SAP_QUALITY/)).toBeInTheDocument();
  });

  it('narra la caída candidata de Kepler-10 con procedencia y puntos independientes', () => {
    render(<S03ScienceScenes sceneId="kepler10-observation" />);

    const chart = screen.getByRole('img', { name: /Curva de luz observada de Kepler-10/ });
    expect(chart).toBeInTheDocument();
    expect(screen.getByText(/BJD − 2 454 833 · días/)).toBeInTheDocument();
    expect(screen.getByText(/PDCSAP relativo · ppm/)).toBeInTheDocument();
    expect(screen.getByText(/Datos de MAST · Kepler Q1 · PDCSAP/)).toBeInTheDocument();
    expect(screen.getByText(/Con ruido, quizá no veamos ninguna caída clara/)).toBeInTheDocument();
    expect(screen.getByText(/bajada central y su recuperación/)).toBeInTheDocument();
    expect(screen.getAllByText(/segundo tránsito predicho/)).toHaveLength(2);
    expect(chart.querySelectorAll('circle')).toHaveLength(25);
    expect(chart.querySelector('polyline')).not.toBeInTheDocument();
    expect(screen.queryByText('Inspeccionar una cadencia archivada')).not.toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('conecta el movimiento de la estrella con el flujo de la apertura y el centroide', () => {
    const sceneId = 'artifact-aperture';
    render(<S03ScienceScenes sceneId={sceneId} />);
    expect(
      screen.getByRole('img', { name: /La misma estrella aparece en dos momentos/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Entre t₀ y t₁, el flujo sumado/ })).toBeInTheDocument();
    expect(screen.getByText(/Centroide: posición ponderada de la luz/)).toBeInTheDocument();
    expect(
      screen.queryByText(/la cuadrícula y el desplazamiento no están a escala/i),
    ).not.toBeInTheDocument();
  });

  it('sincroniza órbita, eclipse y curvas, y muestra la dilución de la fuente vecina', async () => {
    const user = userEvent.setup();
    render(<S03ScienceScenes sceneId="eclipsing-blend" />);

    const scene = screen.getByRole('region', {
      name: 'Binaria eclipsante y luz de una fuente vecina',
    });
    const orbit = screen.getByRole('img', { name: /Vista lateral: dos estrellas orbitan/ });
    const projection = screen.getByRole('img', { name: /Vista proyectada: la binaria se eclipsa/ });
    const curve = screen.getByRole('img', { name: /Curva de luz de una binaria eclipsante/ });
    const initialPhase = orbit.getAttribute('data-phase');

    expect(projection).toHaveAttribute('data-phase', initialPhase);
    expect(curve).toHaveAttribute('data-phase', initialPhase);
    expect(Number(projection.getAttribute('data-primary-depth'))).toBeGreaterThan(
      Number(projection.getAttribute('data-secondary-depth')),
    );
    expect(Number(projection.getAttribute('data-blended-primary-depth'))).toBeLessThan(
      Number(projection.getAttribute('data-primary-depth')),
    );
    expect(curve.querySelector('.s03-science__binary-intrinsic')).toBeInTheDocument();
    expect(curve.querySelector('.s03-science__binary-diluted')).toBeInTheDocument();
    expect(
      within(scene).getByText(/eclipse primario en 0,25 · secundario en 0,75/),
    ).toBeInTheDocument();

    await waitFor(() => expect(orbit).not.toHaveAttribute('data-phase', initialPhase));
    expect(projection).toHaveAttribute('data-phase', orbit.getAttribute('data-phase'));
    expect(curve).toHaveAttribute('data-phase', orbit.getAttribute('data-phase'));

    await user.click(screen.getByRole('button', { name: 'Pausar órbita' }));
    const pausedPhase = orbit.getAttribute('data-phase');
    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(orbit).toHaveAttribute('data-phase', pausedPhase);
    expect(projection).toHaveAttribute('data-phase', pausedPhase);
    expect(curve).toHaveAttribute('data-phase', pausedPhase);
  });

  it('sincroniza las manchas visibles, la fase y el flujo de la curva', async () => {
    const user = userEvent.setup();
    render(<S03ScienceScenes sceneId="variability" />);

    const star = screen.getByRole('img', { name: /^Disco estelar giratorio con/ });
    const curve = screen.getByRole('img', { name: /Flujo relativo durante una rotación estelar/ });
    const spotCount = screen.getByRole('slider', { name: 'Número total de manchas' });
    const trace = curve.querySelector('.s03-science__diagnostic-trace');
    const initialTrace = trace?.getAttribute('d');

    expect(star).toHaveAttribute('data-spot-count', '3');
    expect(star).toHaveAttribute('data-visible-spots', '3');
    expect(curve).toHaveAttribute('data-spot-count', '3');
    expect(curve).toHaveAttribute('data-phase', star.getAttribute('data-phase'));
    expect(curve.querySelector('.s03-science__starspot-phase-point')).toBeInTheDocument();

    fireEvent.change(spotCount, { target: { value: '5' } });

    expect(star).toHaveAttribute('data-spot-count', '5');
    expect(curve).toHaveAttribute('data-spot-count', '5');
    expect(curve.querySelector('.s03-science__diagnostic-trace')).not.toHaveAttribute(
      'd',
      initialTrace,
    );

    await user.click(screen.getByRole('button', { name: 'Pausar giro' }));
    expect(screen.getByRole('button', { name: 'Reanudar giro' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('separa el entrenamiento de la evaluación y advierte los límites del catálogo', async () => {
    const user = userEvent.setup();
    render(<S03ScienceScenes sceneId="binary-input-output" />);

    expect(screen.getByText(/Una caída de brillo con forma de tránsito/)).toBeInTheDocument();
    expect(screen.getByText(/15 737 TCE etiquetados/)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Candidata a planeta' })).not.toBeInTheDocument();
    const autovetterSummary = screen.getByText('¿Qué era Autovetter?');
    expect(autovetterSummary.closest('details')!).not.toHaveAttribute('open');
    await user.click(autovetterSummary);
    expect(screen.getByText(/Autovetter fue un proyecto/)).toBeVisible();
    expect(screen.getByText(/algunas mal asignadas/)).toBeInTheDocument();
    expect(screen.getByText('TCE + referencia del catálogo')).toBeInTheDocument();
    expect(screen.getByText('Reduce el error de aprendizaje')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Evaluación' }));
    expect(screen.getByText('TCE que no ajustaron la red')).toBeInTheDocument();
    expect(screen.getByText('Predicción frente a referencia')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Evaluar significa medir el acuerdo en señales reservadas; no confirma por sí solo un planeta.',
      ),
    ).toBeInTheDocument();
  });

  it('explica que AFP es etiqueta y FP es un error', async () => {
    const user = userEvent.setup();
    render(<S03ScienceScenes sceneId="classification-vocabulary" />);

    await user.click(screen.getByRole('button', { name: /^AFP/ }));
    expect(screen.getByText(/Astrophysical False Positive/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^FP/ }));
    expect(screen.getByText(/es una celda de error, no una etiqueta AFP/)).toBeInTheDocument();
  });

  it('explica la secuencia de preparación y mantiene visible el límite del preprocesamiento', () => {
    render(<S03ScienceScenes sceneId="preparation" />);

    expect(screen.getByRole('heading', { name: '¿Qué mide cada punto?' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Preparar la curva sin borrar la señal' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Comparar las repeticiones' })).toBeInTheDocument();
    expect(
      screen.getByText(/cambios lentos del brillo y tránsitos de otros planetas conocidos/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Estas decisiones influyen en qué rasgos de la señal quedan visibles/),
    ).toBeInTheDocument();
  });

  it('explica las vistas global/local y el plegado junto a la Figura 3', async () => {
    const user = userEvent.setup();
    render(<S03ScienceScenes sceneId="folded-views" />);

    const scene = screen.getByLabelText('Método de representación global y local');
    expect(within(scene).getByRole('heading', { name: 'Vista global' })).toBeInTheDocument();
    expect(within(scene).getByRole('heading', { name: 'Vista local' })).toBeInTheDocument();
    expect(within(scene).getByText('λ = δ = P / 2001')).toBeInTheDocument();
    expect(within(scene).getByText('λ = 8d / 201 · δ = 0,16d')).toBeInTheDocument();
    expect(within(scene).getByText('φ = frac[(t − T₀) / P]')).toBeInTheDocument();
    expect(
      within(scene).queryByText(/AUMENTACIÓN · SOLO EN ENTRENAMIENTO/),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Global · 2 001 bins/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Local · 201 bins/ })).not.toBeInTheDocument();

    const figure = screen.getByRole('img', { name: /Figura 3 del artículo/ });
    expect(figure).toHaveAttribute('src', expect.stringContaining('paper-fig-03.svg'));
    expect(scene.querySelector('.s03-science__folded-paper')).toContainElement(figure);
    expect(
      screen.getByRole('link', {
        name: /Christopher J\. Shallue & Andrew Vanderburg \(2018\).*Figura 3/,
      }),
    ).toHaveAttribute('href', 'https://doi.org/10.3847/1538-3881/aa9e09');
    expect(screen.getByRole('link', { name: 'Licencia CC BY 3.0 ↗' })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/3.0/',
    );
    const zoom = screen.getByRole('button', { name: 'Ampliar Figura 3 del artículo' });
    await user.click(zoom);
    const dialog = screen.getByRole('dialog', { name: 'Ampliar Figura 3 del artículo' });
    expect(dialog).toBeVisible();
    expect(within(dialog).getByRole('img', { name: /Figura 3 del artículo/ })).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: 'Cerrar' }));
    expect(zoom).toHaveFocus();
  });

  it('presenta la arquitectura de dos vistas que combina rasgos para producir un puntaje', () => {
    render(<S03ScienceScenes sceneId="cnn-score" />);

    expect(
      screen.getByRole('group', { name: /vista global y la vista local/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Convolución 1D/)).toHaveLength(2);
    expect(screen.getAllByText(/Max-pooling/)).toHaveLength(2);
    expect(screen.getByText(/Capas densas/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Figura 7 de Shallue y Vanderburg/ })).toHaveAttribute(
      'href',
      'https://arxiv.org/abs/1712.05044',
    );
    expect(screen.getByText(/por sí solo no confirma un planeta/)).toBeInTheDocument();
  });

  it('presenta la tabla del test y una lectura de los resultados', () => {
    render(<S03ScienceScenes sceneId="paper-results" />);

    const table = screen.getByRole('table', { name: /Valores publicados en el test/ });
    expect(within(table).getByText('0,960')).toBeInTheDocument();
    expect(within(table).getByText('0,988')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '¿Qué muestran los resultados?' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/una evaluación astronómica posterior para confirmar si son planetas/),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('group', { name: 'Elegir métrica para comparar' }),
    ).not.toBeInTheDocument();
  });

  it('narra la selección y validación posterior y cambia entre las figuras 8, 10 y 11', async () => {
    const user = userEvent.setup();
    const { container } = render(<S03ScienceScenes sceneId="paper-limits" />);

    expect(screen.getByText('513')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /puntaje superior a 0,9/ })).toBeInTheDocument();
    expect(screen.getByText('eventos de cruce de umbral')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'La revisión separó las señales de sus imitadores' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Kepler-80 g')).toBeInTheDocument();
    expect(screen.getByText('Kepler-90 i')).toBeInTheDocument();
    expect(container.querySelector('.s03-paper-figure--white')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Figura 11 del artículo/ })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Figura 8' }));
    expect(screen.getByRole('img', { name: /Figura 8 del artículo/ })).toHaveAttribute(
      'src',
      expect.stringContaining('paper-fig-08.png'),
    );
    expect(screen.getAllByText(/ocultan partes de la curva/).length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: /puntaje superior a 0,5/ }));
    expect(screen.getByText(/30 señales por encima de 0,5/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /puntaje superior a 0,9/ }));
    expect(screen.getByText(/Cuatro señales superaron 0,9/)).toBeInTheDocument();
  });

  it('mantiene únicos los IDs al montar juntas todas las escenas para Lectura', () => {
    const { container } = render(
      <>
        {scienceSceneIds.map((sceneId) => (
          <S03ScienceScenes key={sceneId} sceneId={sceneId} />
        ))}
      </>,
    );
    const ids = Array.from(container.querySelectorAll('[id]'), (element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('no produce contenido para una escena que pertenece a otro componente', () => {
    const { container } = render(<S03ScienceScenes sceneId="confusion-matrix" />);
    expect(container).toBeEmptyDOMElement();
  });
});
