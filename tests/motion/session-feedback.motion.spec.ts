import { expect, test } from '@playwright/test';

for (const route of ['sesiones/s00/', 'sistema/', 'sesiones/s02/']) {
  test(`recorrido ${route} con movimiento reducido`, async ({ page }) => {
    await page.goto(`./${route}`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    await expect(page.locator('.session-presentation')).toHaveAttribute(
      'data-slide-role',
      'opening',
    );
    await expect
      .poll(() => page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches))
      .toBe(true);
    const navigation = page.getByRole('navigation', {
      name: 'Navegación de la sesión',
      exact: true,
    });
    await navigation.getByRole('button', { name: 'Siguiente', exact: true }).click();
    await expect(page.locator('.session-presentation')).toHaveAttribute(
      'data-slide-role',
      'content',
    );
    await navigation.getByRole('button', { name: 'Anterior', exact: true }).click();
    await expect(page.locator('.session-presentation')).toHaveAttribute(
      'data-slide-role',
      'opening',
    );
  });
}
