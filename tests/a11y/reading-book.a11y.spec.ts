import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const route of ['sesiones/s00/', 'sistema/', 'sesiones/s02/']) {
  test(`libro ${route}: accesibilidad con respuesta abierta`, async ({ page }) => {
    await page.goto(`./${route}?modo=lectura`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    await page.locator('.book-check summary').first().click();
    const scan = await new AxeBuilder({ page })
      .include('.book-reading')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      scan.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
    ).toEqual([]);
  });
}
