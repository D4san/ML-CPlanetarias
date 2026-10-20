import { expect, test } from '@playwright/test';

for (const [id, route] of [
  ['s00', 'sesiones/s00/'],
  ['s01', 'sistema/'],
  ['s02', 'sesiones/s02/'],
]) {
  test(`${id} portada 0`, async ({ page }) => {
    await page.goto(`./${route}`);
    await expect(page.locator('.session-presentation')).toHaveAttribute(
      'data-slide-role',
      'opening',
    );
    await expect(page.locator('.session-step-controls')).toHaveAttribute('data-hydrated', 'true');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${id}-cover.png`, { fullPage: false });
  });
}
test('S02 ejemplo guiado y exploración', async ({ page }) => {
  await page.goto('./sesiones/s02/#information-gain');
  await expect(page.getByRole('heading', { name: '1. Contar las clases' })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveScreenshot('s02-impurity-counts.png', { fullPage: false });
  for (let step = 0; step < 3; step++)
    await page.getByRole('button', { name: 'Paso siguiente', exact: true }).click();
  await expect(page.locator('.s02-impurity__readout')).toContainText('Reducción de Gini: 0,3');
  await expect(page).toHaveScreenshot('s02-impurity-explore.png', { fullPage: false });
});

for (const stop of ['forest', 'regression-error']) {
  test(`S02 ${stop}`, async ({ page }) => {
    await page.goto(`./sesiones/s02/#${stop}`);
    await expect(
      page.getByRole('navigation', { name: 'Navegación de la sesión', exact: true }),
    ).toHaveAttribute('data-hydrated', 'true');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`s02-${stop}.png`, { fullPage: false });
  });
}
