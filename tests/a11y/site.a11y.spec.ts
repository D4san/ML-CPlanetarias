import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const route of ['./', './sesiones/', './sistema/']) {
  test(`has no automated WCAG A/AA violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test('has no automated WCAG A/AA violations on the flipped S01 use card', async ({ page }) => {
  await page.goto('./sistema/');
  await page.getByRole('button', { name: 'Predecir. Abrir tarjeta' }).click();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('has no automated WCAG A/AA violations on the formal-cycle definition card', async ({
  page,
}) => {
  await page.goto('./sistema/#instancia');
  await page.getByRole('button', { name: 'representación. Abrir definición' }).click();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('has no automated WCAG A/AA violations on the task definition card', async ({ page }) => {
  await page.goto('./sistema/#tarea');
  await page.getByRole('button', { name: 'Regresión. Abrir definición' }).click();
  await page.getByRole('button', { name: 'Voltear: ver definición' }).click();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('has no automated WCAG A/AA violations in S01 linear reading mode', async ({ page }) => {
  await page.goto('./sistema/?modo=lectura');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.s01-journey')).toHaveAttribute('data-display-mode', 'reading');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('has no automated WCAG A/AA violations in the S01 activity branch', async ({ page }) => {
  await page.goto('./sistema/?modo=actividades');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.s01-journey')).toHaveAttribute('data-display-mode', 'activities');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
