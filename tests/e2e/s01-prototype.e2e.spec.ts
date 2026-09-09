import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));
  await page.goto('./sistema/#pregunta');
  await page.waitForLoadState('networkidle');
  expect(pageErrors).toEqual([]);
});

test('weaves an astronomy route through its signal and task map', async ({ page }) => {
  const journey = page.locator('[data-ready="true"][data-active-stop]');
  await expect(journey).toHaveAttribute('data-active-stop', 'question');

  await page.getByRole('button', { name: 'Catálogo → estructura' }).click();
  await page.getByRole('button', { name: '3. Señal y paradigma' }).click();
  await page.getByRole('button', { name: '2. Tres paradigmas' }).click();
  await expect(page).toHaveURL(/#senal\/paradigmas$/);

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

  await page.getByRole('button', { name: '3. La ruta activa' }).click();
  await expect(page.getByText('Predice antes de revelar la ruta')).toBeVisible();
  await page.getByRole('button', { name: 'Sin objetivo etiquetado' }).click();
  await expect(page.getByText(/conduce a no supervisado/i)).toBeVisible();

  await page.getByRole('button', { name: '4. Tarea y salida' }).click();
  await page.getByRole('button', { name: '3. Tres niveles' }).click();
  await expect(page.getByRole('heading', { name: 'Tres niveles, tres decisiones' })).toBeVisible();
  const taskGuide = page.locator('.s01-task-guide');
  await expect(taskGuide.getByText('¿Qué salida necesitamos?')).toBeVisible();
  await expect(taskGuide.getByText('¿Qué relación vamos a comparar?')).toBeVisible();
});

test('explains each task output through an accessible definition card', async ({ page }) => {
  await page.getByRole('button', { name: '4. Tarea y salida' }).click();
  await page.getByRole('button', { name: '2. Árbol de salidas' }).click();

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
  await page.getByRole('button', { name: '2. Cinco salidas' }).click();
  await expect(
    page.getByRole('heading', { name: '¿Qué podemos hacer con una observación?' }),
  ).toBeVisible();
  await page.getByRole('button', { name: '3. Tres disciplinas' }).click();
  await expect(page.getByRole('heading', { name: '¿Qué aporta cada disciplina?' })).toBeVisible();
  await page.getByRole('button', { name: 'Estadística' }).click();
  await expect(
    page.getByText('¿Qué podemos aprender de los datos y con qué incertidumbre?'),
  ).toBeVisible();

  await page.getByRole('button', { name: '2. Cinco salidas' }).click();
  await page.getByRole('button', { name: 'Predecir. Abrir tarjeta' }).click();
  const definition = page.getByText(/Asignar una salida a una instancia nueva/i);
  await expect(definition).toBeHidden();

  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();
  await expect(definition).toBeVisible();

  await page.getByRole('button', { name: 'Cerrar tarjeta de Predecir' }).click();
  await expect(page.getByRole('button', { name: 'Predecir. Abrir tarjeta' })).toBeFocused();

  await page.getByRole('button', { name: '1. La pregunta' }).click();
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
  await page.getByRole('button', { name: '2. De observación a salida' }).click();
  await expect(
    page.getByRole('heading', { name: 'De una observación a una salida' }),
  ).toBeVisible();
  await page.getByRole('button', { name: '3. Ajustar y usar' }).click();
  await expect(
    page.getByRole('heading', { name: 'La notación separa ajustar de usar' }),
  ).toBeVisible();
  await expect(
    page.getByLabel(/D contiene representaciones x sub i sin objetivo por fila/i),
  ).toBeVisible();

  await page.getByRole('button', { name: '2. De observación a salida' }).click();
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

test('builds the signal concept map in explicit layers', async ({ page }) => {
  await page.goto('./sistema/#senal/paradigmas');
  await page.waitForLoadState('networkidle');

  const builder = page.getByRole('group', { name: 'Construcción guiada del mapa conceptual' });
  const progress = builder.locator('.s01-map-builder__heading strong');
  const status = builder.getByRole('status');

  await expect(progress).toHaveText('0/3 capas');
  await expect(page.locator('.s01-signal-branch[data-revealed="false"]')).toHaveCount(3);

  await builder.getByRole('button', { name: 'Construir mapa' }).click();
  await expect(progress).toHaveText('1/3 capas');
  await expect(status).toContainText('Capa 1 de 3');
  await expect(page.locator('.s01-signal-trunk path')).toHaveAttribute('data-revealed', 'true');

  await builder.getByRole('button', { name: 'Construir siguiente capa' }).click();
  await expect(progress).toHaveText('2/3 capas');
  await expect(status).toContainText('Capa 2 de 3');
  await expect(page.locator('.s01-signal-branch[data-revealed="true"]')).toHaveCount(3);

  await builder.getByRole('button', { name: 'Construir siguiente capa' }).click();
  await expect(progress).toHaveText('3/3 capas');
  await expect(status).toContainText('Mapa completo');
  await expect(
    page.getByRole('button', { name: 'Supervisado. Abrir definición', exact: true }),
  ).toBeEnabled();

  await builder.getByRole('button', { name: 'Reiniciar mapa' }).click();
  await expect(progress).toHaveText('0/3 capas');
});

test('loads the ImageGen miniature family in the Instancia cards', async ({ page }) => {
  await page.goto('./sistema/#instancia/flujo');
  await page.waitForLoadState('networkidle');

  const miniatures = page.locator('img.s01-instance-miniature');
  await expect(miniatures).toHaveCount(6);
  await expect
    .poll(
      () =>
        miniatures.evaluateAll((nodes) =>
          nodes.every((node) => {
            const image = node as HTMLImageElement;
            return image.complete && image.naturalWidth > 0;
          }),
        ),
      { timeout: 10_000, message: 'Las miniaturas de Instancia deben terminar de cargar.' },
    )
    .toBe(true);

  const loaded = await miniatures.evaluateAll((nodes) =>
    nodes.map((node) => {
      const image = node as HTMLImageElement;
      return {
        source: image.getAttribute('src'),
        complete: image.complete,
        naturalWidth: image.naturalWidth,
      };
    }),
  );

  expect(loaded.map((item) => item.source)).toEqual([
    '/images/s01/instance-miniatures/instance.png',
    '/images/s01/instance-miniatures/observation.png',
    '/images/s01/instance-miniatures/representation.png',
    '/images/s01/instance-miniatures/model.png',
    '/images/s01/instance-miniatures/output-spectrum.png',
    '/images/s01/instance-miniatures/target.png',
  ]);
  expect(
    loaded.every((item) => item.complete && item.naturalWidth > 0),
    JSON.stringify(loaded),
  ).toBe(true);
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
  await page.getByRole('button', { name: '3. Sesgo inductivo' }).click();

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
  await page.goto('./sistema/#evidencia');
  await expect(page.locator('[data-ready="true"]')).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test('keeps long definition cards readable at short viewport heights', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 480 });
  await page.reload();

  await page.getByRole('button', { name: '2. Cinco salidas' }).click();
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

test('gives each S01 part the projection surface', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  for (const hash of [
    'pregunta',
    'pregunta/salidas',
    'pregunta/disciplinas',
    'instancia',
    'instancia/flujo',
    'instancia/notacion',
    'senal',
    'senal/paradigmas',
    'senal/ruta',
    'tarea',
    'tarea/salidas',
    'tarea/niveles',
    'familia',
    'familia/reglas',
    'familia/sesgo',
    'dominio',
    'dominio/cambio',
    'dominio/diagnostico',
    'evidencia',
    'evidencia/capacidad',
    'evidencia/afirmacion',
  ]) {
    await page.goto('./sistema/#' + hash);
    const workspace = page.locator('.s01-workspace');
    await expect(workspace).toBeVisible();
    await expect(
      workspace.locator('.s01-focus, .s01-scene__graphic, .s01-scene__interaction'),
    ).toHaveCount(1);
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
      text: Number.parseFloat(
        getComputedStyle(
          document.querySelector(
            '.s01-workspace .s01-focus__explanation, .s01-workspace .s01-scene p:not(.s01-mini-label)',
          )!,
        ).fontSize,
      ),
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.text, hash).toBeGreaterThanOrEqual(17.5);
    const box = await workspace.boundingBox();
    expect(box!.y + box!.height, hash).toBeLessThanOrEqual(1080);
  }
});

test('restores a subslide with history and retains it across modes', async ({ page }) => {
  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await expect(page).toHaveURL(/#pregunta\/salidas$/);
  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await expect(page).toHaveURL(/#pregunta\/disciplinas$/);
  await page.goBack();
  await expect(
    page.getByRole('heading', { name: '¿Qué podemos hacer con una observación?' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Lectura' }).click();
  await page.getByRole('button', { name: 'Presentación', exact: true }).click();
  await expect(page).toHaveURL(/#pregunta\/salidas$/);
  await page.getByRole('button', { name: 'Reiniciar' }).click();
  await expect(
    page.getByRole('heading', { name: 'Dos libros para orientar el recorrido' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await expect(page).toHaveURL(/#pregunta$/);
});

test('keeps the former nested route as a compatibility redirect', async ({ page }) => {
  await page.goto('./sistema/s01/');
  await expect(page).toHaveURL(/\/sistema\/$/);
  await expect(page.locator('.s01-journey[data-ready="true"]')).toBeVisible();
});

test('keeps all S01 parts readable on mobile', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const hash of [
    'pregunta',
    'pregunta/salidas',
    'pregunta/disciplinas',
    'instancia',
    'instancia/flujo',
    'instancia/notacion',
    'senal',
    'senal/paradigmas',
    'senal/ruta',
    'tarea',
    'tarea/salidas',
    'tarea/niveles',
    'familia',
    'familia/reglas',
    'familia/sesgo',
    'dominio',
    'dominio/cambio',
    'dominio/diagnostico',
    'evidencia',
    'evidencia/capacidad',
    'evidencia/afirmacion',
  ]) {
    await page.goto('./sistema/#' + hash);
    await expect(page.locator('.s01-workspace[data-pilot="true"]')).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content, hash).toBeLessThanOrEqual(dimensions.viewport);
    if (hash === 'pregunta/salidas') {
      const nodes = page.locator('.s01-outcome-node');
      for (const index of [0, 1]) {
        const label = await nodes.nth(index).locator('strong').boundingBox();
        const nextNode = await nodes.nth(index + 1).boundingBox();
        expect(label!.y + label!.height).toBeLessThan(nextNode!.y);
        expect(nextNode!.width).toBeGreaterThanOrEqual(24);
      }
    }
    await page.screenshot({
      path: testInfo.outputPath(`mobile-${hash.replace('/', '-')}.png`),
      fullPage: true,
    });
  }
});

test('retains bibliography and conceptual definitions without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(new URL('sistema/', baseURL).href);
    await expect(
      page.getByRole('heading', { name: 'Dos libros para orientar el recorrido' }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Siete decisiones conectadas' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Objetos del ciclo mínimo' })).toBeVisible();
  } finally {
    await context.close();
  }
});
