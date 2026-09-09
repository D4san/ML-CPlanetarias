// @vitest-environment jsdom

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import S01LearningJourney from './S01LearningJourney';

beforeEach(() => {
  window.history.replaceState(null, '', '/sistema/#pregunta');
});

describe('S01LearningJourney', () => {
  it('renders a deterministic first stop and changes the conceptual lens', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    const journey = document.querySelector('[data-ready="true"]');
    expect(journey).toHaveAttribute('data-active-stop', 'question');
    expect(
      screen.getByRole('heading', { name: '¿Qué queremos responder con los datos?' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Ver una respuesta orientadora')).toBeInTheDocument();
    expect(screen.queryByText('Pregunta del guion')).not.toBeInTheDocument();
    expect(screen.queryByText('Qué debe quedar')).not.toBeInTheDocument();
    expect(screen.getByText('Llega aquí')).toBeInTheDocument();
    expect(screen.getByText('Sigue hacia')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '3. Tres disciplinas' }));
    expect(screen.getByText('Experiencia, tarea y desempeño')).toBeInTheDocument();
    expect(
      screen.getByText('¿Qué experiencia puede mejorar el desempeño en una tarea medible?'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Estadística' }));
    expect(screen.getByText('Datos, variabilidad y evidencia')).toBeInTheDocument();
    expect(
      screen.getByText('¿Qué podemos aprender de los datos y con qué incertidumbre?'),
    ).toBeInTheDocument();
    expect(window.location.hash).toBe('#pregunta/disciplinas');
  });

  it('opens each initial use on its front and reveals the definition only after flipping', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: '2. Cinco salidas' }));
    const origin = screen.getByRole('button', { name: 'Predecir. Abrir tarjeta' });
    await user.click(origin);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const definition = screen.getByText(/Asignar una salida a una instancia nueva/i);
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'true');

    await user.click(screen.getByRole('button', { name: 'Voltear: ver definición' }));
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'false');

    await user.click(screen.getByRole('button', { name: 'Cerrar tarjeta de Predecir' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(origin).toHaveFocus();
  });

  it('renders route-specific LaTeX and defines every object in the formal cycle', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: 'Catálogo → estructura' }));
    await user.click(screen.getByRole('button', { name: '2. Instancia y representación' }));
    await user.click(screen.getByRole('button', { name: '3. Ajustar y usar' }));

    expect(
      screen.getByLabelText(
        /D contiene representaciones x sub i sin objetivo por fila; z sub i es el grupo/i,
      ),
    ).toHaveClass('s01-math--block');
    expect(screen.getAllByText(/Aquí no se entrega yᵢ por instancia/i)).toHaveLength(1);
    expect(
      screen.getByRole('heading', { name: 'La notación separa ajustar de usar' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Ajuste')).toBeInTheDocument();
    expect(screen.getByText('Uso')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2. De observación a salida' }));
    const origin = screen.getByRole('button', { name: 'representación. Abrir definición' });
    await user.click(origin);
    const definition = screen.getByText(/Variables o estructuras que describen una instancia/i);
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'true');

    await user.click(screen.getByRole('button', { name: 'Voltear: ver definición' }));
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'false');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(origin).toHaveFocus();
  });

  it('predicts the signal before revealing the scenario route', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: 'Catálogo → estructura' }));
    await user.click(screen.getByRole('button', { name: '3. Señal y paradigma' }));
    await user.click(screen.getByRole('button', { name: '3. La ruta activa' }));

    expect(screen.getByText('Predice antes de revelar la ruta')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Sin objetivo etiquetado' }));
    expect(screen.getByText(/conduce a no supervisado/i)).toBeInTheDocument();
    expect(window.location.hash).toBe('#senal/ruta');
  });

  it('opens a formal card for each learning paradigm', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: '3. Señal y paradigma' }));
    await user.click(screen.getByRole('button', { name: '2. Tres paradigmas' }));

    for (const label of ['Supervisado', 'No supervisado', 'Por refuerzo']) {
      expect(
        screen.getByRole('button', { name: `${label}. Abrir definición` }),
      ).toBeInTheDocument();
    }

    const origin = screen.getByRole('button', { name: 'Supervisado. Abrir definición' });
    await user.click(origin);
    const definition = screen.getByText(/cada instancia de ajuste viene acompañada/i);
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'true');

    await user.click(screen.getByRole('button', { name: 'Voltear: ver definición' }));
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'false');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(origin).toHaveFocus();
  });

  it('explains the three levels that organize the task tree', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: '4. Tarea y salida' }));
    await user.click(screen.getByRole('button', { name: '3. Tres niveles' }));
    expect(
      screen.getByRole('heading', { name: 'Tres niveles, tres decisiones' }),
    ).toBeInTheDocument();
    expect(screen.getByText('¿Qué información guía el ajuste?')).toBeInTheDocument();
    expect(screen.getAllByText('¿Qué salida necesitamos?')).not.toHaveLength(0);
    expect(screen.getByText('¿Qué relación vamos a comparar?')).toBeInTheDocument();
    expect(screen.getByText(/La rama resalta una posibilidad/)).toBeInTheDocument();
  });

  it('opens a definition card for each task output', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: '4. Tarea y salida' }));
    await user.click(screen.getByRole('button', { name: '2. Árbol de salidas' }));

    for (const label of [
      'Regresión',
      'Clasificación',
      'Clustering',
      'Anomalía',
      'Decisión',
      'Generación',
    ]) {
      expect(
        screen.getByRole('button', { name: `${label}. Abrir definición` }),
      ).toBeInTheDocument();
    }

    const origin = screen.getByRole('button', { name: 'Regresión. Abrir definición' });
    await user.click(origin);
    const definition = screen.getByText(/Tarea que ajusta una relación para producir un número/i);
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'true');

    await user.click(screen.getByRole('button', { name: 'Voltear: ver definición' }));
    expect(definition.closest('section')).toHaveAttribute('aria-hidden', 'false');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(origin).toHaveFocus();
  });

  it('shows task branches and makes inductive bias visible', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: '4. Tarea y salida' }));
    await user.click(screen.getByRole('button', { name: '2. Árbol de salidas' }));
    expect(document.querySelectorAll('.s01-algorithm-tree__branch')).toHaveLength(6);
    expect(screen.getAllByText(/random forest/i)).toHaveLength(2);
    expect(screen.getByText('contextual bandit')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '5. Familia y aprendizaje' }));
    await user.click(screen.getByRole('button', { name: '3. Sesgo inductivo' }));
    await user.click(screen.getByRole('button', { name: 'Familia cerrada: A / B / C' }));
    expect(screen.getByText(/obliga al caso A\+B/i)).toBeInTheDocument();
    await user.click(
      screen.getByRole('button', { name: 'Familia abierta: añadir híbrido o abstención' }),
    );
    expect(screen.getByText(/conserva una salida híbrida/i)).toBeInTheDocument();
  });

  it('runs the compatible-model, domain and evidence controls', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: '5. Familia y aprendizaje' }));
    await user.click(screen.getByRole('button', { name: '2. Reglas y aprendizaje' }));
    await user.click(screen.getByRole('button', { name: 'Reglas explícitas' }));
    expect(screen.getByText('El conocimiento se escribe antes de clasificar.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '3. Sesgo inductivo' }));
    await user.click(
      screen.getByRole('button', { name: 'Familia abierta: añadir híbrido o abstención' }),
    );
    expect(screen.getByText(/familia abierta conserva una salida híbrida/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '6. Datos y dominio' }));
    await user.click(screen.getByRole('button', { name: '3. Diagnóstico y transferencia' }));
    await user.click(screen.getByRole('button', { name: 'Observado' }));
    expect(screen.getByText('respuesta instrumental')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '7. Evidencia y límites' }));
    await user.click(screen.getByRole('button', { name: '3. Afirmación defendible' }));
    await user.click(screen.getByRole('button', { name: 'Excesiva' }));
    await user.click(
      screen.getByRole('button', {
        name: 'La curva demuestra que el modelo aprendió el mecanismo físico.',
      }),
    );
    expect(screen.getByText(/todavía no prueba mecanismo físico/i)).toBeInTheDocument();
  });

  it('keeps five slides in the rail and exposes every subslide as a control', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    const journey = document.querySelector('[data-ready="true"]');
    const rail = screen.getByRole('navigation', { name: 'Diapositivas de S01' });

    expect(journey).toHaveAttribute('data-slide-count', '22');
    expect(journey).toHaveAttribute('data-active-slide', '1');
    expect(rail.querySelectorAll('li[data-visible="true"]')).toHaveLength(5);
    expect(within(rail).getByText('01.1')).toBeInTheDocument();
    expect(within(rail).getByText('01.2')).toBeInTheDocument();
    expect(within(rail).getByText('01.3')).toBeInTheDocument();
    expect(
      within(rail).getByRole('button', {
        name: 'Subslide 2 · Pregunta · Cinco salidas',
      }),
    ).toBeInTheDocument();

    await user.click(
      within(rail).getByRole('button', {
        name: 'Subslide 3 · Pregunta · Tres disciplinas',
      }),
    );
    expect(window.location.hash).toBe('#pregunta/disciplinas');
    expect(journey).toHaveAttribute('data-active-slide', '3');
    expect(rail.querySelectorAll('li[data-visible="true"]')).toHaveLength(5);

    await user.click(within(rail).getByRole('button', { name: '7. Evidencia y límites' }));
    expect(window.location.hash).toBe('#evidencia');
    expect(journey).toHaveAttribute('data-active-slide', '19');
    expect(rail.querySelectorAll('li[data-visible="true"]')).toHaveLength(5);
    expect(rail.querySelectorAll('li[data-side="left"]')).toHaveLength(9);
    expect(rail.querySelectorAll('li[data-side="right"]')).toHaveLength(8);
  });

  it('switches between presentation and linear reading while preserving the active stop', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/sistema/#familia');
    render(<S01LearningJourney />);

    expect(
      await screen.findByRole('heading', { name: 'Familia y aprendizaje' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Modo tutor' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Lectura' }));
    expect(document.querySelector('[data-ready="true"]')).toHaveAttribute(
      'data-display-mode',
      'reading',
    );
    expect(
      screen.getByRole('article', { name: /De una pregunta astronómica/i }),
    ).toBeInTheDocument();
    expect(document.querySelectorAll('.s01-reading__section')).toHaveLength(7);
    expect(window.location.search).toBe('?modo=lectura');
    expect(window.location.hash).toBe('#familia');

    const readingNavigation = screen.getByRole('navigation', { name: 'Contenido de la lectura' });
    await user.click(within(readingNavigation).getByRole('button', { name: '6. Datos y dominio' }));
    expect(window.location.hash).toBe('#dominio');

    await user.click(screen.getByRole('button', { name: 'Presentación' }));
    expect(document.querySelector('[data-ready="true"]')).toHaveAttribute(
      'data-display-mode',
      'presentation',
    );
    expect(window.location.search).toBe('');
    await user.click(screen.getByRole('button', { name: '3. Diagnóstico y transferencia' }));
    expect(
      screen.getByRole('heading', {
        name: '¿Qué tendría que coincidir para transferir el modelo?',
      }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Ver mapa completo' }));
    expect(
      screen.getByRole('heading', { name: 'El árbol completo regresa a la pregunta' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Abrir 6. Datos y dominio en foco' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Abrir 6. Datos y dominio en foco' }));
    expect(screen.getByRole('heading', { name: 'Datos y dominio' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reiniciar' }));
    expect(
      screen.getByRole('heading', { name: 'Dos libros para orientar el recorrido' }),
    ).toBeInTheDocument();
    expect(window.location.hash).toBe('');
  });

  it('offers an independent activity branch and returns to the narrative route', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: 'Actividades' }));

    expect(document.querySelector('[data-ready="true"]')).toHaveAttribute(
      'data-display-mode',
      'activities',
    );
    expect(
      screen.getByRole('heading', {
        name: 'Prueba las decisiones antes de nombrar el algoritmo',
      }),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Una curva de luz se divide/i)).toBeInTheDocument();
    expect(screen.getByText('0/5 correctas · 0/5 intentadas')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Ajustar una relación con las curvas etiquetadas y evaluar curvas no usadas',
      }),
    );
    expect(screen.getByText(/Aprender de ejemplos puede reducir/i)).toBeInTheDocument();
    expect(screen.getByText('1/5 correctas · 1/5 intentadas')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Volver a familia/i }));
    expect(document.querySelector('[data-ready="true"]')).toHaveAttribute(
      'data-display-mode',
      'presentation',
    );
    expect(window.location.hash).toBe('#familia');
    expect(screen.getByRole('heading', { name: 'Familia y aprendizaje' })).toBeInTheDocument();
  });

  it('moves through the flat thread with arrow, home and end keys', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    const first = screen.getByRole('button', { name: '1. Pregunta y uso' });
    first.focus();
    await user.keyboard('{ArrowRight}');
    expect(
      screen.getByRole('button', { name: 'Subslide 2 · Pregunta · Cinco salidas' }),
    ).toHaveFocus();
    await user.keyboard('{End}');
    expect(
      screen.getByRole('button', { name: 'Subslide 3 · Evidencia · Afirmación defendible' }),
    ).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByRole('button', { name: '0. Bibliografía de S01' })).toHaveFocus();
  });

  it('returns to bibliography at the first content boundary and stops at the final unit', async () => {
    const user = userEvent.setup();
    render(<S01LearningJourney />);

    await user.click(screen.getByRole('button', { name: '← Anterior' }));
    expect(window.location.hash).toBe('#bibliografia');
    expect(
      screen.getByRole('heading', { name: 'Dos libros para orientar el recorrido' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    for (let index = 0; index < 20; index += 1) {
      await user.click(screen.getByRole('button', { name: 'Siguiente →' }));
    }
    expect(window.location.hash).toBe('#evidencia/afirmacion');
    expect(screen.getByRole('button', { name: 'Siguiente →' })).toBeDisabled();
  });
});
