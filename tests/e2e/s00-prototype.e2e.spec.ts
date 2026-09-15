import { expect, test } from '@playwright/test';

test.describe('S00 introducción científica', () => {
  test('recorre las subpantallas, muestra la ilustración y mantiene la ruta sin selector', async ({
    page,
  }) => {
    const pageErrors: Error[] = [];
    page.on('pageerror', (error) => pageErrors.push(error));
    await page.goto('./sesiones/s00/');
    await page.waitForLoadState('networkidle');

    const journey = page.locator('.s00-journey[data-ready="true"]');
    await expect(journey).toBeVisible();
    await expect(page.getByText(/^Ruta:$/)).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'De los mundos a los datos' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Un mundo se vuelve observable' }),
    ).toBeVisible();
    await expect(page.getByText('01.1', { exact: true })).toBeVisible();
    await expect(page.getByText('01.2', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Siguiente →' }).click();
    await expect(page).toHaveURL(/\/sesiones\/s00\/#pregunta\/senal$/);
    await expect(page.getByRole('heading', { name: 'Conceptos' })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Tránsito/i })).toBeVisible();

    await page.getByRole('button', { name: /Subslide 01\.3 · 01 · abrir/ }).click();
    await expect(page).toHaveURL(/\/sesiones\/s00\/#pregunta\/pregunta-guia$/);
    await expect(page.getByRole('heading', { name: 'Pregunta guía' })).toBeVisible();
    await expect(page.getByAltText(/estrella con un planeta en tránsito/i)).toBeVisible();

    await page.goto('./sesiones/s00/#datos');
    await expect(page.locator('.s00-journey')).toHaveAttribute('data-active-part', 'observacion');
    await expect(
      page.getByRole('heading', { name: 'Datos astronómicos no son una sola cosa' }),
    ).toBeVisible();

    await page.goto('./sesiones/s00/#datos/catalogo');
    await expect(page.getByRole('tab', { name: /Observación/ })).toBeVisible();
    await page.getByRole('tab', { name: /Catálogo/ }).click();
    await expect(page.locator('.s00-data-detail')).toContainText(
      '¿Qué unidad estadística cuenta cada fila',
    );
    expect(pageErrors).toEqual([]);
  });

  test('mantiene separado el estado de actividades al cambiar de vista', async ({ page }) => {
    await page.goto('./sesiones/s00/?modo=actividades');
    await expect(page.locator('.s00-activities')).toBeVisible();
    const firstCheck = page.getByRole('checkbox').first();
    await firstCheck.check();
    await expect(page.getByRole('status')).toContainText('1 de 5');

    await page.getByRole('button', { name: 'Presentación' }).click();
    await expect(page.locator('.s00-journey')).toHaveAttribute('data-display-mode', 'presentation');
    await page.getByRole('button', { name: 'Actividades' }).click();
    await expect(page.getByRole('checkbox').first()).toBeChecked();
  });

  test('conserva el flujo sin desbordamiento en móvil', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./sesiones/s00/?modo=lectura');
    await expect(page.locator('.s00-reading')).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  });

  test('permite abrir una subpantalla de impacto sin perder el marco', async ({ page }) => {
    await page.goto('./sesiones/s00/#impacto/stability');
    await expect(page.locator('.s00-journey')).toHaveAttribute('data-active-part', 'stability');
    await expect(page.getByRole('heading', { name: 'Estabilidad orbital' })).toBeVisible();
    await expect(page.getByRole('button', { name: '06.2 · Estabilidad orbital' })).toBeVisible();
  });
});

test.describe('S00 sin JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('expone una lectura lineal y su estado editorial', async ({ page }) => {
    await page.goto('./sesiones/s00/');
    await expect(page.locator('#s00-fallback-title')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fuentes de entrada' })).toBeVisible();
    await expect(page.locator('.s00-fallback__status')).toContainText('status: drafting');
  });
});
