import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('S00 no presenta violaciones WCAG A/AA en presentación', async ({ page }) => {
  await page.goto('./sesiones/s00/');
  await page.waitForLoadState('networkidle');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});

test('S00 no presenta violaciones WCAG A/AA en lectura y actividades', async ({ page }) => {
  await page.goto('./sesiones/s00/?modo=lectura');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.s00-journey')).toHaveAttribute('data-display-mode', 'reading');

  const readingResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(readingResults.violations).toEqual([]);

  await page.getByRole('button', { name: 'Actividades', exact: true }).click();
  const activityResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(activityResults.violations).toEqual([]);
});
