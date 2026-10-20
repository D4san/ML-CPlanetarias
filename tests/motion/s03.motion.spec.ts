import { expect, test } from '@playwright/test';

test('S03 inicia detenida y conserva control manual con movimiento reducido', async ({ page }) => {
  await page.goto('./sesiones/s03/#s03-transit-1');
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  const play = page.getByRole('button', { name: 'Reproducir', exact: true });
  await expect(play).toHaveAttribute('aria-pressed', 'false');
  const range = page.locator('.s03-transit--animation input[type="range"]').first();
  const before = await range.inputValue();
  await range.focus();
  await page.keyboard.press('ArrowRight');
  expect(await range.inputValue()).not.toBe(before);
  const css = await page
    .locator('.s03-transit')
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(css).toBe('none');
});

test('la variabilidad estelar respeta movimiento reducido y mantiene el control manual', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./sesiones/s03/#s03-lookalikes-1');
  const scene = page.getByRole('region', { name: 'Variabilidad por manchas estelares' });
  const star = scene.locator('.s03-science__starspot-disc');
  const play = scene.getByRole('button', { name: 'Reanudar giro' });

  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await expect(play).toHaveAttribute('aria-pressed', 'false');
  const initialPhase = await star.getAttribute('data-phase');
  await page.waitForTimeout(250);
  await expect(star).toHaveAttribute('data-phase', initialPhase!);

  await play.click();
  await expect(scene.getByRole('button', { name: 'Pausar giro' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect
    .poll(async () => star.getAttribute('data-phase'), { timeout: 1500 })
    .not.toBe(initialPhase);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(scene.getByRole('button', { name: 'Reanudar giro' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});

test('la binaria respeta movimiento reducido y permite iniciar la órbita manualmente', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./sesiones/s03/#s03-lookalikes-2');
  const scene = page.getByRole('region', { name: 'Binaria eclipsante y luz de una fuente vecina' });
  const orbit = scene.getByRole('img', { name: /Vista lateral: dos estrellas orbitan/ });
  const projection = scene.getByRole('img', { name: /Vista proyectada: la binaria se eclipsa/ });
  const curve = scene.getByRole('img', { name: /Curva de luz de una binaria eclipsante/ });
  const play = scene.getByRole('button', { name: 'Reanudar órbita' });

  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await expect(play).toHaveAttribute('aria-pressed', 'false');
  const initialPhase = await orbit.getAttribute('data-phase');
  await page.waitForTimeout(250);
  await expect(orbit).toHaveAttribute('data-phase', initialPhase!);
  await expect(projection).toHaveAttribute('data-phase', initialPhase!);
  await expect(curve).toHaveAttribute('data-phase', initialPhase!);

  await play.click();
  await expect
    .poll(async () => orbit.getAttribute('data-phase'), { timeout: 1500 })
    .not.toBe(initialPhase);
  await expect(projection).toHaveAttribute('data-phase', (await orbit.getAttribute('data-phase'))!);
  await expect(curve).toHaveAttribute('data-phase', (await orbit.getAttribute('data-phase'))!);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(scene.getByRole('button', { name: 'Reanudar órbita' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
});
