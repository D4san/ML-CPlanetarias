import { chromium } from '@playwright/test';

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Station 02: open flashcard modal
  await page.goto('http://127.0.0.1:4321/sesiones/s00/#ciencias-planetarias/origen');
  await page.waitForTimeout(1000);

  // Click on trigger button
  const triggerBtn = page.locator('.s00-flashcard-trigger-btn').first();
  await triggerBtn.click();
  await page.waitForTimeout(600);

  await page.screenshot({ path: 'public/images/s00/flashcard-modal-preview.png' });
  console.log('Saved flashcard-modal-preview.png');

  // Close modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // 2. Station 05: data-landscape
  await page.goto('http://127.0.0.1:4321/sesiones/s00/#datos/observacion');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/images/s00/station-05-miniature-preview.png' });
  console.log('Saved station-05-miniature-preview.png');

  // 3. Station 07: impact paper preview
  await page.goto('http://127.0.0.1:4321/sesiones/s00/#impacto/astronet');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'public/images/s00/station-07-impact-preview.png' });
  console.log('Saved station-07-impact-preview.png');

  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
