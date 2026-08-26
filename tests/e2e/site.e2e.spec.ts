import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));
  await page.goto('./');
  await page.waitForLoadState('networkidle');
  expect(pageErrors).toEqual([]);
});

test('explores the full pedagogical chain and resets', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /Pensar el problema/i, level: 1 })).toBeVisible();

  const explorer = page.locator('[data-ready="true"][data-active-stage]');
  await expect(explorer).toHaveAttribute('data-active-stage', 'question');

  await page.getByRole('button', { name: '9. Transferencia docente' }).click();
  await expect(explorer).toHaveAttribute('data-active-stage', 'transfer');
  await expect(page.getByText('Etapa 9 de 9')).toBeVisible();

  await page.getByRole('button', { name: 'Reiniciar' }).click();
  await expect(explorer).toHaveAttribute('data-active-stage', 'question');
});

test('lists S01 honestly and reports the remaining public empty states', async ({ page }) => {
  await page.getByRole('link', { name: 'Sesiones', exact: true }).click();
  await expect(page).toHaveURL(/\/sesiones\/$/);
  await expect(page.getByRole('heading', { name: 'ML, IA y métodos estadísticos' })).toBeVisible();
  await expect(page.getByText('Prototipo interno', { exact: true })).toBeVisible();
  await expect(page.getByText(/Las colecciones públicas siguen vacías/i)).toBeVisible();

  await page.getByRole('link', { name: 'Glosario' }).click();
  await expect(page).toHaveURL(/\/glosario\/$/);
  await expect(page.getByRole('heading', { name: 'El glosario público está vacío' })).toBeVisible();
});

test('supports keyboard navigation inside the learning path', async ({ page }) => {
  const first = page.getByRole('button', { name: '1. Pregunta científica' });
  await first.focus();
  await page.keyboard.press('ArrowRight');

  const second = page.getByRole('button', { name: '2. Datos y representación' });
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-pressed', 'true');
});
