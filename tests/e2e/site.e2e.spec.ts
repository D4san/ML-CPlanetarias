import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));
  await page.goto('./');
  await page.waitForLoadState('networkidle');
  expect(pageErrors).toEqual([]);
});

test('presenta el alcance y dirige a los dos destinos principales', async ({ page }) => {
  await expect(
    page.getByRole('heading', {
      name: 'Comprender el problema antes de elegir el modelo.',
      level: 1,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Tres líneas que avanzan juntas.' }),
  ).toBeVisible();

  await page.getByRole('link', { name: /Ver sesiones/ }).click();
  await expect(page).toHaveURL(/\/sesiones\/$/);
  await expect(page.getByRole('heading', { name: 'ML, IA y métodos estadísticos' })).toBeVisible();

  await page.goto('./');
  await page.getByRole('link', { name: /Abrir glosario/ }).click();
  await expect(page).toHaveURL(/\/glosario\/$/);
  await expect(page.getByRole('heading', { name: 'El glosario público está vacío' })).toBeVisible();
});

test('lists S01 honestly and reports the remaining public empty states', async ({ page }) => {
  const mainNav = page.getByRole('navigation', { name: 'Navegación principal' });
  await mainNav.getByRole('link', { name: 'Sesiones', exact: true }).click();
  await expect(page).toHaveURL(/\/sesiones\/$/);
  await expect(page.getByRole('heading', { name: 'ML, IA y métodos estadísticos' })).toBeVisible();
  await expect(page.getByText('Prototipo interno', { exact: true })).toBeVisible();
  await expect(page.getByText(/Las colecciones públicas siguen vacías/i)).toBeVisible();

  await mainNav.getByRole('link', { name: 'Glosario', exact: true }).click();
  await expect(page).toHaveURL(/\/glosario\/$/);
  await expect(page.getByRole('heading', { name: 'El glosario público está vacío' })).toBeVisible();
});
