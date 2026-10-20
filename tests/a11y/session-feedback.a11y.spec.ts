import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const hash of ['information-gain', 'forest', 'regression-error']) {
  test(`S02 ${hash} conserva accesibilidad y alternativas textuales`, async ({ page }) => {
    await page.goto(`./sesiones/s02/#${hash}`);
    await expect(page.locator('.s02-journey')).toHaveAttribute('data-slide-role', 'content');
    if (hash === 'information-gain') {
      for (let step = 0; step < 3; step++)
        await page.getByRole('button', { name: 'Paso siguiente', exact: true }).click();
    }
    const scan = await new AxeBuilder({ page })
      .include('.s02-journey')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(scan.violations).toEqual([]);
  });
}
