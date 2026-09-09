import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => document.fonts.ready);
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

test('home initial state', async ({ page }) => {
  await expect(page).toHaveScreenshot('home-initial.png', { fullPage: true });
});

test('S01 journey question state', async ({ page }) => {
  await page.goto('./sistema/#pregunta');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content:
      '.site-header { position: static !important; } .skip-link { display: none !important; }',
  });
  await page.locator('.skip-link').evaluate((element) => element.remove());
  const journey = page.locator('.s01-journey[data-ready="true"]');
  await expect(journey).toBeVisible();
  await expect(journey).toHaveScreenshot('s01-journey-question.png');
});

test('S01 concept map overview', async ({ page }) => {
  await page.goto('./sistema/#pregunta');
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole('button', { name: 'Ver mapa completo' }).click();
  await expect(page.locator('.s01-overview')).toHaveScreenshot('s01-concept-map.png');
});

test('S01 projector presentation at 16 by 9', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'visual-desktop', 'Projector baseline belongs to desktop.');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('./sistema/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.s01-journey[data-ready="true"]')).toBeVisible();
  await expect(page).toHaveScreenshot('s01-projector-16x9.png', { fullPage: false });
});

test('S01 projector narrative across all stops', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'visual-desktop', 'Projector baselines belong to desktop.');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('./sistema/');
  await page.evaluate(() => document.fonts.ready);

  const stops = [
    ['pregunta', '1. Pregunta y uso', null],
    ['instancia', '2. Instancia y representación', null],
    ['senal', '3. Señal y paradigma', '2. Tres paradigmas'],
    ['tarea', '4. Tarea y salida', '2. Árbol de salidas'],
    ['familia', '5. Familia y aprendizaje', '2. Reglas y aprendizaje'],
    ['dominio', '6. Datos y dominio', '2. Cambio de condiciones'],
    ['evidencia', '7. Evidencia y límites', '2. Capacidad y generalización'],
  ] as const;

  for (const [id, label, partLabel] of stops) {
    await page.getByRole('button', { name: label }).click();
    if (partLabel) await page.getByRole('button', { name: partLabel }).click();
    await expect(page).toHaveScreenshot(`s01-projector-${id}.png`, { fullPage: false });
  }
});

test('S01 flipped prediction card', async ({ page }) => {
  await page.goto('./sistema/#pregunta/salidas');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: '.s01-outcome-card__stage { transition: none !important; }',
  });
  await page.getByRole('button', { name: 'Predecir. Abrir tarjeta' }).click();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();
  await expect(page.locator('.s01-outcome-card')).toHaveScreenshot('s01-predict-card-back.png');
});

test('S01 flipped task definition card', async ({ page }) => {
  await page.goto('./sistema/#tarea/salidas');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content: '.s01-outcome-card__stage { transition: none !important; }',
  });
  await page.getByRole('button', { name: 'Regresión. Abrir definición' }).click();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();
  await expect(page.locator('.s01-outcome-card')).toHaveScreenshot('s01-regression-card-back.png');
});

test('sessions lists S01 as an internal prototype', async ({ page }) => {
  await page.goto('./sesiones/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('sessions-s01.png', { fullPage: true });
});

test('S01 journey evidence and limit state', async ({ page }) => {
  await page.goto('./sistema/');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content:
      '.site-header { position: static !important; } .skip-link { display: none !important; }',
  });
  await page.locator('.skip-link').evaluate((element) => element.remove());
  const journey = page.locator('.s01-journey[data-ready="true"]');
  await page.getByRole('button', { name: '7. Evidencia y límites' }).click();
  await page.getByRole('button', { name: '3. Afirmación defendible' }).click();
  await page.getByRole('button', { name: 'Excesiva' }).click();
  await page
    .getByRole('button', {
      name: 'La curva demuestra que el modelo aprendió el mecanismo físico.',
    })
    .click();
  // Keep the visual state deterministic across Chromium/CI focus behavior.
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await expect(journey).toHaveScreenshot('s01-journey-evidence.png');
});

test('S01 linear reading first section', async ({ page }) => {
  await page.goto('./sistema/?modo=lectura');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({
    content:
      '.site-header, .s01-reading__toc { position: static !important; } .skip-link { display: none !important; }',
  });
  await page.locator('.skip-link').evaluate((element) => element.remove());
  const firstSection = page.locator('.s01-reading__section').first();
  await expect(firstSection).toBeVisible();
  await expect(firstSection).toHaveScreenshot('s01-reading-first-section.png');
});

test('S01 activity branch', async ({ page }) => {
  await page.goto('./sistema/?modo=actividades');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: '.site-header { position: static !important; }' });
  const activities = page.locator('.s01-activities');
  await expect(activities).toBeVisible();
  await expect(activities).toHaveScreenshot('s01-activities.png');
});
