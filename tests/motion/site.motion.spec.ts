import { expect, test } from '@playwright/test';

test('preserves interaction with reduced motion', async ({ page }) => {
  await page.goto('./');
  await expect
    .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
    .toBe(true);

  await page.getByRole('button', { name: '8. Interpretación y límites' }).click();
  const explorer = page.locator('[data-active-stage="limits"]');
  await expect(explorer).toBeVisible();
  await expect(explorer.getByRole('heading', { name: 'Interpretación y límites' })).toBeVisible();
});

test('keeps the S01 route usable and removes its spatial transitions', async ({ page }) => {
  await page.goto('./sistema/');
  await expect
    .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
    .toBe(true);

  await page.getByRole('button', { name: '6. Datos y dominio' }).click();
  await page.getByRole('button', { name: 'Observado' }).click();
  await expect(page.getByText('respuesta instrumental')).toBeVisible();

  const transitionDuration = await page
    .locator('.s01-thread__traveler')
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(transitionDuration)).toBeLessThanOrEqual(0.00001);
});
