import { expect, test } from '@playwright/test';

test('S00 sigue siendo navegable con movimiento reducido', async ({ page }) => {
  await page.goto('./sesiones/s00/');
  await expect
    .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
    .toBe(true);

  await page.getByRole('button', { name: 'Siguiente →' }).click();
  await expect(page.locator('.s00-journey')).toHaveAttribute('data-active-slide', '2');
  await expect(page).toHaveURL(/#pregunta\/senal$/);
  const railTransition = await page
    .locator('.slide-rail__traveler')
    .evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(Number.parseFloat(railTransition)).toBeLessThanOrEqual(0.00001);
});
