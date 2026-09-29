import { expect, test } from '@playwright/test';

const colabUrl =
  'https://colab.research.google.com/github/D4san/ML-CPlanetarias/blob/main/notebooks/S02_arboles_decision_random_forest.ipynb';

test('lista S02 y ofrece en Colab el notebook versionado de la práctica', async ({ page }) => {
  await page.goto('./sesiones/');

  const sessionCard = page.locator('.session-preview--s02');
  await expect(sessionCard).toContainText('S02 · en desarrollo');
  await expect(sessionCard).toContainText('Prototipo interno');
  await expect(
    sessionCard.getByRole('link', { name: 'Árboles de decisión y Random Forest' }),
  ).toHaveAttribute('href', /\/sesiones\/s02\/$/);

  await page.goto('./sesiones/s02/');
  await page.waitForFunction(() => !document.querySelector('astro-island')?.hasAttribute('ssr'));
  await expect(page.locator('.s02-journey__slide')).toBeVisible();
  await page.getByRole('button', { name: /5\.1 Práctica/ }).click();

  const colabLink = page.getByRole('link', { name: /Abrir la actividad en Colab/ });
  await expect(colabLink).toHaveAttribute('href', colabUrl);
  await expect(colabLink).toHaveAttribute('target', '_blank');
  await expect(colabLink).toHaveAttribute('rel', /noreferrer/);

  const closingUrl = new URL(page.url());
  closingUrl.searchParams.set('estacion', 'cierre');
  await page.goto(closingUrl.toString());
  await page.waitForFunction(() => !document.querySelector('astro-island')?.hasAttribute('ssr'));
  await expect(
    page.getByRole('heading', { name: 'Comunica el resultado y sus límites' }),
  ).toBeVisible();
  await expect(page.locator('.s02-journey__eyebrow')).toContainText('Estación 6 · subestación 1');
});
