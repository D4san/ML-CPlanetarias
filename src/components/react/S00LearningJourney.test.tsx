// @vitest-environment jsdom
import { fireEvent, render, screen, within } from '@testing-library/react';
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
    // In 1.1, hero image is omitted so text occupies full screen
    expect(screen.queryByAltText(/estrella con un planeta en tránsito/i)).not.toBeInTheDocument();

    // Move to 1.2: interactive concept cards with real observations and studies
    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    expect(window.location.hash).toBe('#pregunta/senal');
    expect(screen.getByRole('heading', { name: 'Conceptos' })).toBeVisible();
    expect(document.querySelector('[data-active-part="senal"]')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Exoplaneta/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Tránsito/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Espectro/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Representación/i })).toBeVisible();

    // Click Exoplaneta tab and check real observation & study link
    await user.click(screen.getByRole('tab', { name: /Exoplaneta/i }));
    expect(screen.getByAltText(/HR 8799/i)).toBeVisible();
    expect(screen.getByRole('link', { name: /Ver artículo original/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /NASA Exoplanet Archive/i })).toBeInTheDocument();

    // Open image in Lightbox Modal
    await user.click(screen.getByRole('button', { name: /Ampliar imagen/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeVisible();
    expect(screen.getByText(/Pulsa Esc o haz clic fuera para cerrar/i)).toBeVisible();
    expect(screen.getByRole('link', { name: /Abrir archivo/i })).toHaveAttribute(
      'href',
      expect.stringContaining('.png'),
    );

    // Non-escape key does not close modal
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('dialog')).toBeVisible();

    // Close via close button
    await user.click(screen.getByRole('button', { name: /Cerrar ampliación/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Re-open and close with backdrop click
    await user.click(screen.getByRole('button', { name: /Ampliar imagen/i }));
    expect(screen.getByRole('dialog')).toBeVisible();
    await user.click(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Re-open and close with Escape key
    await user.click(screen.getByRole('button', { name: /Ampliar imagen/i }));
    expect(screen.getByRole('dialog')).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Click Tránsito tab and verify transit observation
    await user.click(screen.getByRole('tab', { name: /Tránsito/i }));
    expect(screen.getByAltText(/Curva de luz fotométrica/i)).toBeVisible();

    // Click Espectro tab and verify atmospheric data & MAST link
    await user.click(screen.getByRole('tab', { name: /Espectro/i }));
    expect(screen.getByAltText(/WASP-39 b/i)).toBeVisible();
    expect(screen.getByRole('link', { name: /MAST Archive/i })).toBeInTheDocument();

    // Click Representación tab and verify multi-scale vectors & GitHub code repo
    await user.click(screen.getByRole('tab', { name: /Representación/i }));
    expect(screen.getByAltText(/Representación multiescala/i)).toBeVisible();
    expect(screen.getByRole('link', { name: /AstroNet GitHub/i })).toBeInTheDocument();

    // Move to 1.3: hero image combined with guiding question
    await user.click(screen.getByRole('button', { name: /Subslide 01\.3 · 01 · abrir/ }));
    expect(window.location.hash).toBe('#pregunta/pregunta-guia');
    expect(screen.getByRole('heading', { name: 'Pregunta guía' })).toBeVisible();
    expect(screen.getByAltText(/estrella con un planeta en tránsito/i)).toBeVisible();
    expect(screen.getByText(/mundo → medición → evidencia/i)).toBeVisible();
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

    expect(screen.queryByText(/todavía no existe/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Un mundo se vuelve observable' })).toBeVisible();
    // Navigate to concepts on 1.2 to inspect definition
    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    await user.click(screen.getByRole('tab', { name: /Exoplaneta/i }));
    expect(screen.getByText(/Planeta que orbita una estrella distinta del Sol/i)).toBeVisible();
  });

  it('exposes the hierarchical rail and station parts', () => {
    render(<S00LearningJourney config={courseConfig} />);

    const journey = document.querySelector('[data-ready="true"]');
    const rail = screen.getByRole('navigation', { name: 'Diapositivas de S00' });

    expect(document.querySelector('.slide-rail__caption')).not.toBeInTheDocument();
    expect(journey).toHaveAttribute('data-slide-count', '38');
    expect(rail.querySelectorAll('.slide-rail__index')).toHaveLength(38);
    expect(screen.getByText('01.1')).toBeInTheDocument();
    expect(screen.getByText('01.2')).toBeInTheDocument();
    expect(screen.getByText('01.3')).toBeInTheDocument();
    expect(screen.getByText('02.1')).toBeInTheDocument();
  });

  it('renders expandable bibliography boxes on slide 0 with direct layout', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#bibliografia');
    render(<S00LearningJourney config={courseConfig} />);

    expect(screen.getByRole('heading', { name: 'Fuentes de la sesión' })).toBeVisible();
    expect(screen.getByText(/10 fuentes/i)).toBeInTheDocument();

    const decadalCard = screen.getByText(/Origins, Worlds, and Life/i);
    expect(decadalCard).toBeVisible();
    expect(
      screen.getByText(/Situar las preguntas sobre origen, formación, evolución/i),
    ).toBeVisible();

    // Initially collapsed: author details dl is not rendered
    expect(screen.queryByText('Autoría / Institución')).not.toBeInTheDocument();

    // Toggle expand on the first card
    const toggleButtons = screen.getAllByRole('button', { name: /Ampliar/i });
    expect(toggleButtons.length).toBe(10);
    expect(toggleButtons[0]).toBeDefined();
    await user.click(toggleButtons[0]!);

    // Now expanded: shows full author and link
    expect(screen.getByText('Autoría / Institución')).toBeVisible();
    expect(screen.getByRole('link', { name: /Ver la fuente en su sitio ↗/i })).toBeInTheDocument();

    // Test bulk collapse and expand
    await user.click(screen.getByRole('button', { name: /Contraer todas/i }));
    expect(screen.queryByText('Autoría / Institución')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Expandir todas/i }));
    const details = screen.getAllByText('Autoría / Institución');
    expect(details.length).toBe(10);
  });

  it('renders connected planetary pillars and active scientific dossier on station 02', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#ciencias-planetarias');
    render(<S00LearningJourney config={courseConfig} />);

    expect(
      screen.getByRole('heading', { name: 'Las ciencias planetarias estudian sistemas' }),
    ).toBeVisible();
    expect(
      screen.getByText(
        /Las ciencias planetarias conectan astronomía, física, geología, química y biología/i,
      ),
    ).toBeVisible();

    // All 4 pillars must be present in the system network
    expect(screen.getByRole('tab', { name: /Origen y formación/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Estructura y composición/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Evolución y dinámica/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Habitabilidad y biosignaturas/i })).toBeVisible();

    // Active pillar dossier on 02.1 is Origen
    expect(screen.getByText(/01 · PILAR ACTIVO · ORIGEN Y FORMACIÓN/i)).toBeVisible();
    expect(screen.getByText(/ALMA \(interferometría submilimétrica\)/i)).toBeVisible();
    expect(screen.getByText(/Degeneración histórica/i)).toBeVisible();

    // Switch to Estructura tab
    await user.click(screen.getByRole('tab', { name: /Estructura y composición/i }));
    expect(window.location.hash).toBe('#ciencias-planetarias/estructura');
    expect(screen.getByText(/02 · PILAR ACTIVO · ESTRUCTURA Y COMPOSICIÓN/i)).toBeVisible();
    expect(screen.getByText(/ESPRESSO, HARPS/i)).toBeVisible();
    expect(screen.getByText(/Degeneración composicional/i)).toBeVisible();
  });

  it('renders unified observational modalities, narrative box, and 4-lens cards on station 03', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#medicion/espectro');
    render(<S00LearningJourney config={courseConfig} />);

    // Slide header on 03.3 is the active part label
    expect(screen.getByRole('heading', { name: 'Espectro' })).toBeVisible();

    // All 4 connected modalities in the top track
    expect(screen.getByRole('tab', { name: /Tránsito/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Velocidad radial/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Espectro/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Imagen/i })).toBeVisible();

    // Physical fusion bar
    expect(screen.getByText(/Fusión multifísica:/i)).toBeVisible();
    expect(screen.getByText(/Densidad media ρ̄/i)).toBeVisible();

    // Active dossier for Espectro
    expect(screen.getByText(/Modalidad 03 \/ 04/i)).toBeVisible();
    expect(
      screen.getByRole('heading', { name: /Espectroscopía de transmisión y emisión/i }),
    ).toBeVisible();
    expect(
      screen.getAllByLabelText(/Espectroscopía de transmisión y emisión/i)[0],
    ).toBeInTheDocument();

    // Narrative box with scientific intention
    expect(screen.getByText(/🧭 Intención científica e hipótesis/i)).toBeVisible();
    expect(
      screen.getByText(/¿De qué están compuestas las atmósferas exoplanetarias/i),
    ).toBeVisible();
    expect(screen.getByText(/Identificar especies químicas/i)).toBeVisible();

    // 4 dynamic lenses
    expect(screen.getByRole('tab', { name: /1\. Física & Instrumento/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /2\. Tensor & Unidad ML/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /3\. Inferencia & Salida/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /4\. Decisión & Límites/i })).toBeVisible();

    // Default lens is 'fisica': shows detector observable and physical parameter
    expect(screen.getByText(/📡 Observable registrado \(Detector\)/i)).toBeVisible();
    expect(screen.getByText(/Telescopio Espacial James Webb \(JWST/i)).toBeVisible();

    // Switch to 'datos' lens (Tensor & Unidad ML)
    await user.click(screen.getByRole('tab', { name: /2\. Tensor & Unidad ML/i }));
    expect(screen.getByText(/📊 Unidad de análisis \/ Instancia x_i/i)).toBeVisible();
    expect(screen.getByText(/Par de vectores espectrales/i)).toBeVisible();
    expect(screen.getByText(/🧱 Estructura tensorial y resolución/i)).toBeVisible();
    expect(screen.getByText(/🛡️ Prevención de fuga de información/i)).toBeVisible();

    // Switch to 'modelo' lens (Inferencia & Salida)
    await user.click(screen.getByRole('tab', { name: /3\. Inferencia & Salida/i }));
    expect(screen.getByText(/📐 Salida matemática computable/i)).toBeVisible();
    expect(screen.getByText(/Neural Posterior Estimation/i)).toBeVisible();
    expect(screen.getByText(/Función de pérdida \/ Objetivo:/i)).toBeVisible();

    // Switch to 'decision' lens (Decisión & Límites)
    await user.click(screen.getByRole('tab', { name: /4\. Decisión & Límites/i }));
    expect(screen.getByText(/🎯 Decisión operacional/i)).toBeVisible();
    expect(screen.getByText(/Criterio de seguimiento:/i)).toBeVisible();
    expect(screen.getByText(/⚠️ Antipatrón común/i)).toBeVisible();
    expect(screen.getByText(/🛑 Límite físico y degeneración observacional/i)).toBeVisible();
    expect(screen.getByText(/Degeneración nubes-metalicidad/i)).toBeVisible();
    expect(screen.getByText(/Criterio de paso científico:/i)).toBeVisible();

    // Switch to Velocidad radial modality
    await user.click(screen.getByRole('tab', { name: /Velocidad radial/i }));
    expect(window.location.hash).toBe('#medicion/radial');
    expect(screen.getByText(/Modalidad 02 \/ 04/i)).toBeVisible();
    expect(screen.getAllByLabelText(/Velocidad radial/i)[0]).toBeInTheDocument();

    // Switch back to 'fisica' lens to verify instruments on the new modality
    await user.click(screen.getByRole('tab', { name: /1\. Física & Instrumento/i }));
    expect(screen.getByText(/ESPRESSO \(VLT/i)).toBeVisible();
  });

  it('redirects legacy #acotar hash to unified station 03 #medicion/transito', () => {
    window.history.replaceState(null, '', '/sesiones/s00/#acotar');
    render(<S00LearningJourney config={courseConfig} />);
    expect(
      screen.getByRole('heading', { name: 'Formular la observación: de la intención a la señal' }),
    ).toBeVisible();
  });

  it('renders data landscape stages and properties on station 04', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#datos');
    render(<S00LearningJourney config={courseConfig} />);

    expect(
      screen.getByRole('heading', { name: 'Datos astronómicos no son una sola cosa' }),
    ).toBeVisible();

    // 5 data tabs present
    expect(screen.getByRole('tab', { name: /Observación/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Catálogo/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Simulación/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Entrenamiento/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Salida/i })).toBeVisible();

    // Default stage 04.1 is Observación cruda
    expect(screen.getByText(/01 · ETAPA DE DATOS/i)).toBeVisible();
    expect(screen.getByText(/Formulación matemática/i)).toBeVisible();
    expect(screen.getByText(/x_i = \[F\(t_1\)/i)).toBeVisible();
    expect(screen.getByText(/Estructura del tensor/i)).toBeVisible();
    expect(screen.getByText(/Serie temporal 1D continua/i)).toBeVisible();
    expect(screen.getByText(/⚠️ Riesgo de modelado:/i)).toBeVisible();

    // Switch to Simulación (index 2 -> part 'simulacion')
    await user.click(screen.getByRole('tab', { name: /Simulación/i }));
    expect(window.location.hash).toBe('#datos/simulacion');
    expect(screen.getByText(/03 · ETAPA DE DATOS/i)).toBeVisible();
    expect(screen.getByRole('heading', { name: /Simulación física e inyección/i })).toBeVisible();
    expect(screen.getByText(/Modelo físico analítico sobremuestreado/i)).toBeVisible();
  });

  it('renders 5 ML verbs and benchmark contrast on station 05', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#ml');
    render(<S00LearningJourney config={courseConfig} />);

    expect(screen.getByRole('heading', { name: 'Cinco verbos para ubicar ML' })).toBeVisible();

    // 5 ML verb tabs present
    expect(screen.getByRole('tab', { name: /Detectar/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Clasificar/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Estimar/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Describir/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Priorizar/i })).toBeVisible();

    // Default verb on 05.1 is Detectar
    expect(screen.getByText(/01 · VERBO COMPUTABLE/i)).toBeVisible();
    expect(screen.getByText(/Línea base astronómica clásica/i)).toBeVisible();
    expect(screen.getByText(/Intervención de Machine Learning/i)).toBeVisible();
    expect(screen.getByText(/Métrica científica recomendada:/i)).toBeVisible();
    expect(screen.getByText(/⚠️ Modo de falla típico/i)).toBeVisible();

    // Switch to Estimar (index 2 -> part 'estimar')
    await user.click(screen.getByRole('tab', { name: /Estimar/i }));
    expect(window.location.hash).toBe('#ml/estimar');
    expect(screen.getByText(/03 · VERBO COMPUTABLE/i)).toBeVisible();
    expect(screen.getByText(/Espacio de salida:/i)).toBeVisible();
    expect(screen.getByText(/Inferencia Basada en Simulación/i)).toBeVisible();
  });

  it('renders published impact cases, metrics, and academic links on station 06', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#impacto');
    render(<S00LearningJourney config={courseConfig} />);

    expect(screen.getByRole('heading', { name: '¿Qué desbloquea ML?' })).toBeVisible();

    // High-impact hero metric
    expect(screen.getAllByText(/98,8 %/i)[0]).toBeVisible();
    expect(screen.getByText(/Ranking favorable en test set/i)).toBeVisible();

    // 6 impact cases tabs present
    expect(screen.getByRole('tab', { name: /Curvas de luz/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Dinámica orbital/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Espectroscopía/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Alto contraste/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Validación estadística/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Vetting automatizado/i })).toBeVisible();

    // Default case 06.1 is AstroNet: check study links
    expect(screen.getByText(/Shallue, C\. J\., & Vanderburg, A\./i)).toBeVisible();
    expect(
      screen.getByRole('link', { name: /DOI: 10\.3847\/1538-3881\/aa9e09/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /arXiv/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /NASA Exoplanet Archive/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Google Research/i })).toBeInTheDocument();

    // Switch to Dinámica orbital (index 1 -> part 'stability')
    await user.click(screen.getByRole('tab', { name: /Dinámica orbital/i }));
    expect(window.location.hash).toBe('#impacto/stability');
    expect(screen.getAllByText(/10⁵×/i)[0]).toBeVisible();
    expect(screen.getByText(/Aceleración computacional/i)).toBeVisible();
    expect(screen.getByText(/Tamayo, D\./i)).toBeVisible();
  });

  it('renders curricular triad diagram and branch toolchains on station 07', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#ramas');
    render(<S00LearningJourney config={courseConfig} />);

    expect(screen.getByRole('heading', { name: 'Tres ramas, una misma pregunta' })).toBeVisible();

    // 3 branch tabs
    expect(screen.getByRole('tab', { name: /Problema astronómico/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Teoría formal ML/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Aplicación reproducible/i })).toBeVisible();

    // Default branch 07.1 is Problemas astronómicos
    expect(screen.getByText(/Producto concreto entregable/i)).toBeVisible();
    expect(screen.getByText(/Responsabilidad epistemológica/i)).toBeVisible();
    expect(screen.getByText(/Ecosistema Python del curso:/i)).toBeVisible();
    expect(screen.getByText('Lightkurve')).toBeVisible();
    expect(screen.getByText('Astropy')).toBeVisible();
    expect(screen.getByText(/Aporta a las demás ramas:/i)).toBeVisible();
    expect(screen.getByText(/Recibe de las demás ramas:/i)).toBeVisible();

    // Click triad node for Teoría ML (index 1 -> part 'teoria')
    const triadTeoriaBtn = screen.getByRole('button', {
      name: /Seleccionar rama Teoría formal ML/i,
    });
    await user.click(triadTeoriaBtn);
    expect(window.location.hash).toBe('#ramas/teoria');
    expect(screen.getByText('PyTorch')).toBeVisible();
    expect(screen.getByText('Scikit-learn')).toBeVisible();
  });

  it('renders methodological pipeline and epistemological covenant on station 08', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sesiones/s00/#cierre');
    render(<S00LearningJourney config={courseConfig} />);

    expect(
      screen.getByRole('heading', { name: 'La salida del modelo es evidencia condicionada' }),
    ).toBeVisible();

    // 7 cumulative closure pipeline steps
    expect(screen.getByRole('tab', { name: /Pregunta/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Medición/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Dato/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Representación/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Tarea/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Evaluación/i })).toBeVisible();
    expect(screen.getByRole('tab', { name: /Límite/i })).toBeVisible();

    // Active step dossier 09.1
    expect(screen.getByText(/01 \/ 07 · PASO DE LA CADENA/i)).toBeVisible();
    expect(screen.getByText(/Principio formal rector:/i)).toBeVisible();
    expect(screen.getByText(/Decisión metodológica en S00/i)).toBeVisible();
    expect(screen.getByText(/Riesgo epistemológico evitado/i)).toBeVisible();
    expect(screen.getByText(/Puente formal hacia Sesión 01/i)).toBeVisible();

    // Epistemological Covenant
    expect(screen.getByText(/CONTRATO EPISTEMOLÓGICO DEL CURSO/i)).toBeVisible();
    expect(
      screen.getByText(/La salida del modelo nunca es la conclusión científica final\./i),
    ).toBeVisible();

    // Switch to step 09.6 Evaluación (index 5 -> part 'evaluacion')
    await user.click(screen.getByRole('tab', { name: /Evaluación/i }));
    expect(window.location.hash).toBe('#cierre/evaluacion');
    expect(screen.getByText(/06 \/ 07 · PASO DE LA CADENA/i)).toBeVisible();
    expect(
      screen.getByText(/Evaluar con PR-AUC, Brier score y cobertura bayesiana/i),
    ).toBeVisible();
    expect(screen.getByText(/Reportar accuracy engañosa en clases desbalanceadas/i)).toBeVisible();
  });

  it('opens interactive flashcard modal, cycles cards with keyboard and closes with Escape', async () => {
    const user = userEvent.setup();
    window.location.hash = '#ciencias-planetarias/origen';

    render(<S00LearningJourney config={courseConfig} />);

    // Click on the pillar miniature trigger button to open flashcard
    const triggerBtn = screen.getByRole('button', {
      name: /Ficha ampliada/i,
    });
    expect(triggerBtn).toBeVisible();
    await user.click(triggerBtn);

    // Modal is rendered with role="dialog" and aria-modal="true"
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole('heading', { name: /Origen y formación/i })).toBeVisible();
    expect(screen.getByText(/Pilares de Ciencias Planetarias/i)).toBeVisible();
    expect(within(dialog).getByText(/PILAR ACTIVO/i)).toBeVisible();

    // Navigate to next card with ArrowRight
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(
      within(dialog).getByRole('heading', { name: /Estructura y composición/i }),
    ).toBeVisible();

    // Close with Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
