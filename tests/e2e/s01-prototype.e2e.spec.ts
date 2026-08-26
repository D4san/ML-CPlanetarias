import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));
  await page.goto('./sistema/');
  await page.waitForLoadState('networkidle');
  expect(pageErrors).toEqual([]);
});

test('weaves an astronomy route through its signal and task map', async ({ page }) => {
  const journey = page.locator('[data-ready="true"][data-active-stop]');
  await expect(journey).toHaveAttribute('data-active-stop', 'question');

  await page.getByRole('button', { name: 'Catálogo → estructura' }).click();
  await page.getByRole('button', { name: '3. Señal y paradigma' }).click();
  await expect(page).toHaveURL(/#senal$/);
  await expect(
    page.getByText('Predice la señal disponible para revelar este tramo de la ruta.'),
  ).toBeVisible();

  const mapParadigm = page.getByRole('button', { name: 'No supervisado. Abrir definición' });
  await expect(mapParadigm).toBeVisible();
  await mapParadigm.click();
  const paradigmDefinition = page.getByText(
    /Paradigma en el que las instancias no traen un objetivo/i,
  );
  await expect(paradigmDefinition).toBeHidden();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();
  await expect(paradigmDefinition).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(mapParadigm).toBeFocused();

  await page.getByRole('button', { name: 'Sin objetivo etiquetado' }).click();
  await expect(page.getByText(/conduce a no supervisado/i)).toBeVisible();

  await page.getByRole('button', { name: '4. Tarea y salida' }).click();
  await expect(page.getByRole('heading', { name: 'Tres niveles, tres decisiones' })).toBeVisible();
  const taskGuide = page.locator('.s01-task-guide');
  await expect(taskGuide.getByText('¿Qué salida necesitamos?')).toBeVisible();
  await expect(taskGuide.getByText('¿Qué relación vamos a comparar?')).toBeVisible();
});

test('explains each task output through an accessible definition card', async ({ page }) => {
  await page.getByRole('button', { name: '4. Tarea y salida' }).click();

  for (const label of [
    'Regresión',
    'Clasificación',
    'Clustering',
    'Anomalía',
    'Decisión',
    'Generación',
  ]) {
    await expect(page.getByRole('button', { name: `${label}. Abrir definición` })).toBeVisible();
  }

  const origin = page.getByRole('button', { name: 'Regresión. Abrir definición' });
  await origin.click();
  const definition = page.getByText(/Tarea que ajusta una relación para producir un número/i);
  await expect(definition).toBeHidden();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();
  await expect(definition).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(origin).toBeFocused();
});

test('reveals a formal use definition only after flipping its card', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: '¿Qué podemos hacer con una observación?' }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: '¿Qué aporta cada disciplina?' })).toBeVisible();

  await page.getByRole('button', { name: 'Estadística' }).click();
  await expect(
    page.getByText('¿Qué podemos aprender de los datos y con qué incertidumbre?'),
  ).toBeVisible();

  await page.getByRole('button', { name: 'Predecir. Abrir tarjeta' }).click();
  const definition = page.getByText(/Asignar una salida a una instancia nueva/i);
  await expect(definition).toBeHidden();

  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();
  await expect(definition).toBeVisible();

  await page.getByRole('button', { name: 'Cerrar tarjeta de Predecir' }).click();
  await expect(page.getByRole('button', { name: 'Predecir. Abrir tarjeta' })).toBeFocused();

  const answer = page.locator('.s01-focus__depth');
  await expect(answer).not.toHaveAttribute('open', '');
  await answer.getByText('Ver una respuesta orientadora').click();
  await expect(answer).toHaveAttribute('open', '');
  await expect(answer.getByText(/La pregunta debe nombrar una unidad de análisis/i)).toBeVisible();
  await expect(page.getByText('Pregunta del guion')).toHaveCount(0);
});

test('connects the route-specific formal cycle with definitions', async ({ page }) => {
  await page.getByRole('button', { name: 'Catálogo → estructura' }).click();
  await page.getByRole('button', { name: '2. Instancia y representación' }).click();

  await expect(
    page.getByRole('heading', { name: '¿Qué entra al método y qué debe salir?' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'De una observación a una salida' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'La notación separa ajustar de usar' }),
  ).toBeVisible();
  await expect(
    page.getByLabel(/D contiene representaciones x sub i sin objetivo por fila/i),
  ).toBeVisible();

  const origin = page.getByRole('button', { name: 'modelo. Abrir definición' });
  await origin.click();
  const definition = page.getByText(
    /Función, regla o representación ajustada que transforma una entrada/i,
  );
  await expect(definition).toBeHidden();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();
  await expect(definition).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(origin).toBeFocused();
});

test('restores a deep focus with browser history', async ({ page }) => {
  await page.goto('./sistema/#familia');
  const journey = page.locator('[data-ready="true"][data-active-stop]');
  await expect(journey).toHaveAttribute('data-active-stop', 'family');

  await page.getByRole('button', { name: '6. Datos y dominio' }).click();
  await expect(journey).toHaveAttribute('data-active-stop', 'domain');
  await page.goBack();
  await expect(journey).toHaveAttribute('data-active-stop', 'family');
  await page.goForward();
  await expect(journey).toHaveAttribute('data-active-stop', 'domain');
});

test('keeps a visible narrative link across all seven stops', async ({ page }) => {
  const stops = [
    '1. Pregunta y uso',
    '2. Instancia y representación',
    '3. Señal y paradigma',
    '4. Tarea y salida',
    '5. Familia y aprendizaje',
    '6. Datos y dominio',
    '7. Evidencia y límites',
  ];

  for (const stop of stops) {
    await page.getByRole('button', { name: stop }).click();
    await expect(page.locator('.s01-focus__arrival')).toContainText('Llega aquí');
    await expect(page.locator('.s01-focus__arrival')).not.toHaveText('');
    await expect(page.locator('.s01-focus__next')).toContainText('Sigue hacia');
    await expect(page.locator('.s01-focus__next')).not.toHaveText('');
  }
});

test('makes inductive bias and a hybrid category visible', async ({ page }) => {
  await page.getByRole('button', { name: '5. Familia y aprendizaje' }).click();

  await page.getByRole('button', { name: 'Familia cerrada: A / B / C' }).click();
  await expect(page.getByText(/obliga al caso A\+B/i)).toBeVisible();

  await page.getByRole('button', { name: 'Familia abierta: añadir híbrido o abstención' }).click();
  await expect(page.getByText(/conserva una salida híbrida/i)).toBeVisible();
  await expect(page.getByText('A+B', { exact: true })).toBeVisible();
});

test('offers presentation and linear reading over the same route and stop', async ({ page }) => {
  const journey = page.locator('.s01-journey[data-ready="true"]');
  await expect(page.getByRole('button', { name: 'Modo tutor' })).toHaveCount(0);

  await page.getByRole('button', { name: 'Catálogo → estructura' }).click();
  await page.getByRole('button', { name: '5. Familia y aprendizaje' }).click();
  await page.getByRole('button', { name: 'Lectura' }).click();

  await expect(journey).toHaveAttribute('data-display-mode', 'reading');
  await expect(page).toHaveURL(/\?modo=lectura#familia$/);
  await expect(page.locator('.s01-reading__section')).toHaveCount(7);
  await expect(
    page.getByRole('heading', { name: 'De una pregunta astronómica a una afirmación con límites' }),
  ).toBeVisible();

  const contents = page.getByRole('navigation', { name: 'Contenido de la lectura' });
  await contents.getByRole('button', { name: '6. Datos y dominio' }).click();
  await expect(journey).toHaveAttribute('data-active-stop', 'domain');
  await expect(page).toHaveURL(/\?modo=lectura#dominio$/);
  const tocBox = await contents.boundingBox();
  const domainTitleBox = await page
    .locator('#lectura-dominio')
    .getByRole('heading', { name: 'Datos y dominio' })
    .boundingBox();
  expect(tocBox).not.toBeNull();
  expect(domainTitleBox).not.toBeNull();
  expect(domainTitleBox!.y).toBeGreaterThanOrEqual(tocBox!.y + tocBox!.height);

  await page.getByRole('button', { name: 'Presentación', exact: true }).click();
  await expect(journey).toHaveAttribute('data-display-mode', 'presentation');
  await expect(journey).toHaveAttribute('data-active-stop', 'domain');
  await expect(page).toHaveURL(/\/sistema\/#dominio$/);
  await expect(page.getByRole('heading', { name: 'Datos y dominio' })).toBeVisible();
});

test('opens the navigable concept map with an accessible fallback sequence', async ({ page }) => {
  await page.getByRole('button', { name: 'Ver mapa completo' }).click();

  await expect(page.locator('.s01-concept-map__canvas .s01-concept-node')).toHaveCount(10);
  await page.locator('.s01-concept-map__canvas').scrollIntoViewIfNeeded();
  await expect(
    page.getByRole('button', { name: 'Abrir 6. Datos y dominio en foco' }),
  ).toBeVisible();

  await page.locator('.s01-concept-node[role="button"]').filter({ hasText: 'Dominio' }).click();
  await expect(page.locator('[data-ready="true"]')).toHaveAttribute('data-active-stop', 'domain');
});

test('offers a separate activity branch and returns to its narrative stop', async ({ page }) => {
  await page.goto('./sistema/?modo=actividades');
  const journey = page.locator('.s01-journey[data-ready="true"]');
  await expect(journey).toHaveAttribute('data-display-mode', 'activities');
  await expect(
    page.getByRole('heading', { name: 'Prueba las decisiones antes de nombrar el algoritmo' }),
  ).toBeVisible();
  await expect(page.getByAltText(/Una curva de luz se divide/i)).toBeVisible();

  await page
    .getByRole('button', {
      name: 'Ajustar una relación con las curvas etiquetadas y evaluar curvas no usadas',
    })
    .click();
  await expect(page.getByText(/Aprender de ejemplos puede reducir/i)).toBeVisible();
  await expect(page.getByText('1/5 correctas · 1/5 intentadas')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Una tarea abre varias familias' })).toBeVisible();
  await expect(
    page.locator('.s01-algorithm-tree--compact .s01-algorithm-tree__branch'),
  ).toHaveCount(6);
  await page
    .getByRole('button', {
      name: 'Clasificación es tarea; un árbol o random forest es familia; una etiqueta es señal',
    })
    .click();
  await expect(page.getByText('2/5 correctas · 2/5 intentadas')).toBeVisible();

  await page.getByRole('button', { name: /Volver a familia/ }).click();
  await expect(journey).toHaveAttribute('data-display-mode', 'presentation');
  await expect(page).toHaveURL(/\/sistema\/#familia$/);
  await expect(page.getByRole('heading', { name: 'Familia y aprendizaje' })).toBeVisible();
});

test('keeps the mobile prototype inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole('button', { name: '7. Evidencia y límites' }).click();
  await expect(
    page.locator('[data-ready="true"]').getByRole('heading', { name: 'Evidencia y límites' }),
  ).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test('keeps long definition cards readable at short viewport heights', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 480 });
  await page.reload();

  await page.getByRole('button', { name: 'Generar. Abrir tarjeta' }).click();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();

  const stage = page.locator('.s01-outcome-card__stage');
  const face = page.locator('.s01-outcome-card__face--back');
  const flip = page.getByRole('button', { name: 'Volver al frente' });
  const [stageBox, flipBox] = await Promise.all([stage.boundingBox(), flip.boundingBox()]);

  expect(stageBox).not.toBeNull();
  expect(flipBox).not.toBeNull();
  expect(stageBox!.y + stageBox!.height).toBeLessThanOrEqual(flipBox!.y + 1);

  await face.locator('small').scrollIntoViewIfNeeded();
  const [faceBox, exampleBox] = await Promise.all([
    face.boundingBox(),
    face.locator('small').boundingBox(),
  ]);
  expect(faceBox).not.toBeNull();
  expect(exampleBox).not.toBeNull();
  expect(exampleBox!.y + exampleBox!.height).toBeLessThanOrEqual(faceBox!.y + faceBox!.height + 1);
  await expect(flip).toBeVisible();
});

test('keeps presentation legible and horizontal on a 1080p projector', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.reload();

  const workspace = page.locator('.s01-workspace');
  const journey = page.locator('.s01-journey[data-display-mode="presentation"]');
  const graphic = page.locator('.s01-scene--question .s01-scene__graphic');
  const lenses = page.locator('.s01-scene--question .s01-scene__interaction');
  const focus = page.locator('.s01-focus');
  const [workspaceBox, journeyBox, graphicBox, lensesBox, focusBox] = await Promise.all([
    workspace.boundingBox(),
    journey.boundingBox(),
    graphic.boundingBox(),
    lenses.boundingBox(),
    focus.boundingBox(),
  ]);

  expect(workspaceBox).not.toBeNull();
  expect(journeyBox).not.toBeNull();
  expect(graphicBox).not.toBeNull();
  expect(lensesBox).not.toBeNull();
  expect(focusBox).not.toBeNull();
  expect(graphicBox!.x + graphicBox!.width).toBeLessThanOrEqual(lensesBox!.x + 1);
  expect(lensesBox!.x + lensesBox!.width).toBeLessThanOrEqual(focusBox!.x + 1);
  expect(workspaceBox!.y + workspaceBox!.height).toBeLessThanOrEqual(1080);
  expect(journeyBox!.width).toBeGreaterThanOrEqual(1920 * 0.95);

  const sizes = await page.evaluate(() => {
    const size = (selector: string) =>
      Number.parseFloat(getComputedStyle(document.querySelector(selector)!).fontSize);
    return {
      body: size('.s01-focus__explanation'),
      control: size('.s01-display-switch button'),
      metadata: size('.s01-mini-label'),
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    };
  });

  expect(sizes.body).toBeGreaterThanOrEqual(17.5);
  expect(sizes.control).toBeGreaterThanOrEqual(15.5);
  expect(sizes.metadata).toBeGreaterThanOrEqual(13);
  expect(sizes.content).toBeLessThanOrEqual(sizes.viewport);

  const projectedStops = [
    '1. Pregunta y uso',
    '2. Instancia y representación',
    '3. Señal y paradigma',
    '4. Tarea y salida',
    '5. Familia y aprendizaje',
    '6. Datos y dominio',
    '7. Evidencia y límites',
  ];
  for (const stop of projectedStops) {
    await page.getByRole('button', { name: stop }).click();
    const projectedBox = await workspace.boundingBox();
    expect(projectedBox).not.toBeNull();
    expect(projectedBox!.y + projectedBox!.height).toBeLessThanOrEqual(1080);
  }
});

test('keeps the former nested route as a compatibility redirect', async ({ page }) => {
  await page.goto('./sistema/s01/');
  await expect(page).toHaveURL(/\/sistema\/$/);
  await expect(page.locator('.s01-journey[data-ready="true"]')).toBeVisible();
});
