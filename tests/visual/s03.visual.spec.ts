import { expect, test } from '@playwright/test';

const states = [
  { name: 'geometry', screenId: 's03-transit-2' },
  { name: 'observed', screenId: 's03-mission-3' },
  { name: 'matrix-precision', screenId: 's03-metrics-3' },
  { name: 'auc', screenId: 's03-thresholds-4' },
] as const;

for (const state of states) {
  test(`S03 ${state.name} presentation state`, async ({ page }, testInfo) => {
    const viewport =
      testInfo.project.name === 'visual-mobile'
        ? { width: 390, height: 844 }
        : { width: 1920, height: 1080 };
    await page.setViewportSize(viewport);
    await page.goto(`./sesiones/s03/#${state.screenId}`);

    const journey = page.locator('.s03-journey[data-ready="true"]');
    await expect(journey).toBeVisible();
    await expect(page.locator('#s03-screen-title')).toBeVisible();
    await expect(page.locator('.s03-scene')).not.toBeEmpty();
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: `
        *,
        *::before,
        *::after {
          animation: none !important;
          caret-color: transparent !important;
          scroll-behavior: auto !important;
          transition: none !important;
        }
      `,
    });
    await page.evaluate(
      () =>
        new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        }),
    );

    await expect(page).toHaveScreenshot(`s03-${state.name}.png`, { fullPage: false });
  });
}
