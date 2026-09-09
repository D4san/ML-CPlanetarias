import { expect, test } from '@playwright/test';

test('preserves the home navigation with reduced motion', async ({ page }) => {
  await page.goto('./');
  await expect
    .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
    .toBe(true);

  await expect(
    page.getByRole('heading', { name: 'Comprender el problema antes de elegir el modelo.' }),
  ).toBeVisible();
  const destination = page.locator('.home-destination--primary');
  await expect(destination).toBeVisible();

  const transitionDuration = await destination.evaluate(
    (element) => getComputedStyle(element).transitionDuration,
  );
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);
});

test('keeps the S01 route usable and removes its spatial transitions', async ({ page }) => {
  await page.goto('./sistema/');
  await expect
    .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
    .toBe(true);

  await page.getByRole('button', { name: '6. Datos y dominio' }).click();
  await page.getByRole('button', { name: '3. Diagnóstico y transferencia' }).click();
  await page.getByRole('button', { name: 'Observado' }).click();
  await expect(page.getByText('respuesta instrumental')).toBeVisible();

  const transitionDuration = await page
    .locator('.slide-rail__traveler')
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);
});
