import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const state of [
  '#portada',
  '#s03-transit-1',
  '#s03-transit-2',
  '#s03-transit-3',
  '#s03-mission-3',
  '#s03-lookalikes-1',
  '#s03-lookalikes-2',
  '#s03-errors-2',
  '#s03-metrics-3',
  '#s03-metrics-7',
  '#s03-thresholds-4',
  '?modo=lectura',
  '?modo=actividades',
]) {
  test(`S03 accesible: ${state}`, async ({ page }) => {
    await page.goto(`./sesiones/s03/${state}`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
