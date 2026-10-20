import { expect, test } from '@playwright/test';

for (const route of ['sesiones/s00/', 'sistema/', 'sesiones/s02/']) {
  test(`libro ${route}: navegación con movimiento reducido`, async ({ page }) => {
    await page.goto(`./${route}?modo=lectura`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    await expect
      .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
      .toBe(true);
    await page.locator('.book-reading__contents ol a').last().click();
    await expect(page.locator('.book-chapter').last().locator('h2').first()).toBeInViewport();
    await page
      .locator('.book-reading__sequence')
      .last()
      .getByRole('link', { name: 'Apartado anterior', exact: false })
      .click();
    await expect(page.locator('.book-chapter').nth(-2).locator('h2').first()).toBeFocused();
  });
}
