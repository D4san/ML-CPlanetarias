import { expect, test } from '@playwright/test';

test('S03 recorre las 33 pantallas y conserva las fuentes al final', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./sesiones/s03/');
  const root = page.locator('.s03-journey');
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await expect(root).toHaveAttribute('data-slide-count', '33');
  await expect(root).toHaveAttribute('data-slide-role', 'opening');
  const next = page
    .getByRole('navigation', { name: 'Navegación de la sesión', exact: true })
    .getByRole('button', { name: 'Siguiente', exact: true });
  for (let i = 1; i < 33; i++) {
    await next.click();
    await expect(root).toHaveAttribute('data-active-slide', String(i));
    await expect(page.locator('.s03-scene')).not.toBeEmpty();
  }
  await expect(root).toHaveAttribute('data-slide-role', 'references');
  await expect(next).toBeDisabled();
  await page
    .locator('.session-presentation__footer')
    .getByRole('button', { name: 'Reiniciar', exact: true })
    .click();
  await expect(root).toHaveAttribute('data-slide-role', 'opening');
  expect(errors).toEqual([]);
});

test('5.3 muestra el reflejo de bins solo durante entrenamiento', async ({ page }) => {
  await page.goto('./sesiones/s03/#s03-representation-3');
  const scene = page.getByRole('region', { name: 'Representaciones, CNN y puntaje' });
  const training = scene.getByRole('button', { name: 'Entrenamiento' });
  const inference = scene.getByRole('button', { name: 'Inferencia' });

  await expect(training).toHaveAttribute('aria-pressed', 'true');
  await expect(
    scene.getByRole('img', { name: /Reflejo horizontal de una curva de tránsito/ }),
  ).toBeVisible();
  await expect(scene).toContainText('x₁,…,xₙ → xₙ,…,x₁');
  await expect(scene).toContainText('no añade observaciones de Kepler');

  await inference.click();
  await expect(
    scene.getByRole('img', { name: /Reflejo horizontal de una curva de tránsito/ }),
  ).toHaveCount(0);
  await expect(scene).toContainText('No se interpreta como probabilidad calibrada');

  await training.click();
  await expect(training).toHaveAttribute('aria-pressed', 'true');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await expect(scene.getByText(/El dibujo es esquemático/)).toBeVisible();
});

test('el control de limbo modifica el disco estelar y la curva en la pantalla 1.2', async ({
  page,
}) => {
  await page.goto('./sesiones/s03/#s03-transit-2');
  const geometry = page.getByRole('region', {
    name: 'Una órbita, dos representaciones sincronizadas',
  });
  const projection = geometry.getByRole('img', { name: /^Geometría del tránsito/ });

  await expect(projection).toHaveAttribute('data-profile', 'uniform');
  await expect(geometry.locator('.s03-transit__limb-comparison')).toHaveCount(0);
  await expect(geometry.getByRole('button', { name: 'Central' })).toHaveCount(0);
  await expect(geometry.getByRole('button', { name: 'Rasante' })).toHaveCount(0);
  await expect(geometry.getByRole('button', { name: 'Sin tránsito' })).toHaveCount(0);
  await expect(geometry.getByRole('button', { name: 'Uniforme' })).toHaveCount(0);
  await expect(geometry.locator('.s03-transit__live-summary')).toHaveCount(0);
  await expect(geometry.locator('.s03-transit__curve-figure figcaption')).toHaveCount(0);

  const limbToggle = geometry.getByRole('button', {
    name: 'Oscurecimiento al limbo',
    exact: true,
  });
  await expect(limbToggle).toHaveAttribute('aria-pressed', 'false');
  await limbToggle.click();
  await expect(projection).toHaveAttribute('data-profile', 'linear-limb-darkening');
  await expect(limbToggle).toHaveAttribute('aria-pressed', 'true');
  await expect(projection.locator('.s03-transit__star')).toHaveAttribute(
    'data-profile',
    'linear-limb-darkening',
  );
  await expect(projection.locator('.s03-transit__star-edge')).toHaveAttribute(
    'data-profile',
    'linear-limb-darkening',
  );
  await expect(projection.locator('stop').first()).toHaveAttribute(
    'data-normalized-intensity',
    '1.000',
  );
  await expect(projection.locator('stop').last()).toHaveAttribute(
    'data-normalized-intensity',
    '0.400',
  );
  await expect(geometry.locator('.s03-transit__curve-line')).toHaveClass(
    /s03-transit__curve-line--limb/,
  );
  await expect(geometry).toContainText('1 en el centro a 0,4 en el borde');

  await limbToggle.click();
  await expect(limbToggle).toHaveAttribute('aria-pressed', 'false');
  await expect(projection).toHaveAttribute('data-profile', 'uniform');
});

test('1.3 presenta una serie sintética periódica y no agrega controles locales', async ({
  page,
}) => {
  await page.goto('./sesiones/s03/#s03-transit-3');
  const scene = page.getByRole('region', {
    name: 'La repetición ayuda a formular una hipótesis',
  });
  const plot = scene.getByRole('img', {
    name: 'Serie fotométrica sintética con tres caídas repetidas',
  });

  await expect(scene).toContainText('Una caída:');
  await expect(scene).toContainText('Forma y repetición:');
  await expect(scene.getByText('Ejemplo sintético.', { exact: true })).toBeVisible();
  await expect(
    scene.getByRole('note', { name: 'Advertencia: hipótesis por contrastar' }),
  ).toContainText('una binaria eclipsante también puede ser periódica.');
  await expect(plot.locator('circle')).toHaveCount(481);
  await expect(plot.locator('.s03-inference__event-center')).toHaveCount(3);
  await expect(scene.getByRole('slider')).toHaveCount(0);
  await expect(scene.getByRole('button')).toHaveCount(0);
});

test('3.1 enlaza la rotación de las manchas con el flujo del mismo instante', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./sesiones/s03/#s03-lookalikes-1');
  const scene = page.getByRole('region', { name: 'Variabilidad por manchas estelares' });
  const star = scene.locator('.s03-science__starspot-disc');
  const curve = scene.getByRole('img', { name: 'Flujo relativo durante una rotación estelar' });
  const count = scene.getByRole('slider', { name: 'Número total de manchas' });

  await expect(star).toHaveAttribute('data-spot-count', '3');
  await expect(curve).toHaveAttribute('data-spot-count', '3');
  const initialPhase = await star.getAttribute('data-phase');
  await expect(curve).toHaveAttribute('data-phase', initialPhase!);
  const originalTrace = await curve.locator('.s03-science__diagnostic-trace').getAttribute('d');

  await count.focus();
  await page.keyboard.press('End');
  await expect(star).toHaveAttribute('data-spot-count', '5');
  await expect(curve).toHaveAttribute('data-spot-count', '5');
  await expect(curve.locator('.s03-science__diagnostic-trace')).not.toHaveAttribute(
    'd',
    originalTrace!,
  );

  const pause = scene.getByRole('button', { name: 'Pausar giro' });
  await pause.click();
  const pausedPhase = await star.getAttribute('data-phase');
  await page.waitForTimeout(250);
  await expect(star).toHaveAttribute('data-phase', pausedPhase!);
  await expect(curve).toHaveAttribute('data-phase', pausedPhase!);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(count).toBeVisible();
  await expect(curve).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('3.2 sincroniza la órbita binaria, los eclipses y la dilución de la curva', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./sesiones/s03/#s03-lookalikes-2');
  const scene = page.getByRole('region', { name: 'Binaria eclipsante y luz de una fuente vecina' });
  const orbit = scene.getByRole('img', { name: /Vista lateral: dos estrellas orbitan/ });
  const projection = scene.getByRole('img', { name: /Vista proyectada: la binaria se eclipsa/ });
  const curve = scene.getByRole('img', { name: /Curva de luz de una binaria eclipsante/ });

  const initialPhase = await orbit.getAttribute('data-phase');
  await expect(projection).toHaveAttribute('data-phase', initialPhase!);
  await expect(curve).toHaveAttribute('data-phase', initialPhase!);
  await expect(projection).toHaveAttribute('data-primary-depth');
  expect(Number(await projection.getAttribute('data-primary-depth'))).toBeGreaterThan(
    Number(await projection.getAttribute('data-secondary-depth')),
  );
  expect(Number(await projection.getAttribute('data-blended-primary-depth'))).toBeLessThan(
    Number(await projection.getAttribute('data-primary-depth')),
  );
  await expect(curve.locator('.s03-science__binary-intrinsic')).toBeVisible();
  await expect(curve.locator('.s03-science__binary-diluted')).toBeVisible();

  await expect
    .poll(async () => orbit.getAttribute('data-phase'), { timeout: 1500 })
    .not.toBe(initialPhase);
  await expect(projection).toHaveAttribute('data-phase', (await orbit.getAttribute('data-phase'))!);
  await expect(curve).toHaveAttribute('data-phase', (await orbit.getAttribute('data-phase'))!);

  const pause = scene.getByRole('button', { name: 'Pausar órbita' });
  await pause.click();
  const pausedPhase = await orbit.getAttribute('data-phase');
  await page.waitForTimeout(250);
  await expect(orbit).toHaveAttribute('data-phase', pausedPhase!);
  await expect(curve).toHaveAttribute('data-phase', pausedPhase!);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(projection).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});

test('S03 abre enlaces, alterna lectura y actividades y conserva la unidad', async ({ page }) => {
  await page.goto('./sesiones/s03/#s03-metrics-3');
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await expect(page.locator('#s03-screen-title')).toHaveText(
    'De las predicciones PC, ¿cuántas coinciden?',
  );
  await page.locator('.s03-navigation-disclosure > summary').click();
  await page.getByRole('button', { name: 'Lectura', exact: true }).click();
  await expect(page.locator('.book-chapter')).toHaveCount(9);
  await expect(page.locator('.book-example')).toHaveCount(9);
  await expect(page.locator('.book-instrument')).toHaveCount(31);
  await page.getByRole('button', { name: 'Volver a Presentación', exact: true }).click();
  await expect(page.locator('.s03-journey')).toHaveAttribute('data-active-slide', '21');
  await expect(page.locator('#s03-screen-title')).toHaveText(
    'De las predicciones PC, ¿cuántas coinciden?',
  );
  await page.getByRole('button', { name: 'Actividades', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Decidir y justificar' })).toBeVisible();
  await page.locator('.s03-activities details summary').click();
  await expect(page.locator('.s03-activities details p')).toBeVisible();
});

test('S03 sin JavaScript conserva nueve capítulos y respuestas completas', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('./sesiones/s03/?modo=lectura');
  const fallback = page.locator('.book-fallback');
  await expect(fallback).toBeVisible();
  await expect(fallback.locator('.book-chapter')).toHaveCount(9);
  await expect(fallback.locator('.book-example')).toHaveCount(9);
  const details = fallback.locator('.book-check details').first();
  await details.locator('summary').click();
  await expect(details.locator('p')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await context.close();
});

test('S03 1.1 aclara la vista frontal y se ajusta a escritorio y móvil', async ({ page }) => {
  test.setTimeout(60000);
  const starAssetStatuses: number[] = [];
  page.on('response', (response) => {
    if (response.url().includes('s03-transit-star-conceptual.png')) {
      starAssetStatuses.push(response.status());
    }
  });

  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1074, height: 884 },
    { width: 1280, height: 720 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('./sesiones/s03/#s03-transit-1');
    const scene = page.locator('.s03-transit--animation');
    await expect(scene).toBeVisible();
    await expect(scene).toContainText('Vemos el tránsito de frente');
    await expect(scene).toContainText('mirada −z');
    await expect(scene).toContainText('observador +z');
    await expect(scene.locator('.s03-transit__animation-controls button')).toHaveCount(2);
    await expect(scene.locator('.s03-transit__tick-label--flux')).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      viewport.width,
    );
    await page.screenshot({
      path: `output/playwright/s03/${viewport.width}x${viewport.height}-s03-transit-1.png`,
      fullPage: true,
    });
  }

  expect(starAssetStatuses.length).toBeGreaterThan(0);
  expect(starAssetStatuses.every((status) => status === 200)).toBe(true);
});

test('S03 2.1 muestra PIA18904 completa y conserva la fuente al ampliarla', async ({ page }) => {
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('./sesiones/s03/#s03-mission-1');

    const thumbnail = page
      .getByRole('img', { name: /Concepto artístico de la nave Kepler/ })
      .first();
    await expect(thumbnail).toBeVisible();
    await expect
      .poll(() => thumbnail.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBe(1920);
    await expect(thumbnail).toHaveCSS('object-fit', 'contain');

    const trigger = page.getByRole('link', {
      name: 'Ampliar el concepto artístico de Kepler durante K2',
    });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Kepler durante la misión K2' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Ficha original en NASA ↗' })).toHaveAttribute(
      'href',
      'https://science.nasa.gov/image-detail/amf-pia18904/',
    );
    const expandedImage = dialog.getByRole('img', {
      name: /Concepto artístico de la nave Kepler/,
    });
    await expect(expandedImage).toHaveCSS('object-fit', 'contain');
    await expect
      .poll(() => expandedImage.evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBe(1920);
    if (viewport.width <= 700) {
      const displayedRatio = await expandedImage.evaluate((image) => {
        const { width, height } = image.getBoundingClientRect();
        return width / height;
      });
      expect(displayedRatio).toBeCloseTo(5 / 4, 1);
    }
    await page.screenshot({
      path: `output/playwright/s03/kepler-pia18904-dialog-${viewport.width}x${viewport.height}.png`,
    });
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  }
});

test('S03 tiene escenas legibles y recursos locales en proyección y móvil', async ({ page }) => {
  test.setTimeout(60000);
  const missing: string[] = [];
  page.on('response', (response) => {
    if (response.status() >= 400) missing.push(response.url());
  });
  const scenes = [
    's03-transit-1',
    's03-transit-2',
    's03-transit-3',
    's03-mission-1',
    's03-mission-3',
    's03-lookalikes-1',
    's03-lookalikes-2',
    's03-lookalikes-3',
    's03-classification-1',
    's03-errors-2',
    's03-metrics-3',
    's03-thresholds-4',
    's03-results-2',
  ];
  for (const size of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(size);
    for (const id of scenes) {
      await page.goto(`./sesiones/s03/#${id}`);
      await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
      await expect(page.locator('#s03-screen-title')).toBeVisible();
      await expect(page.locator('.s03-scene')).not.toBeEmpty();
      if (id === 's03-results-2') {
        await expect(page.getByText(/Regla de ML:/)).toBeVisible();
        await expect(page.getByRole('img', { name: /Figura 11 del artículo/ })).toBeVisible();
        await expect(
          page.locator('.s03-paper-figure--white .s03-paper-figure__zoom-trigger img'),
        ).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        size.width,
      );
      await page.screenshot({
        path: `output/playwright/s03/${size.width}-${id}.png`,
        fullPage: true,
      });
    }
  }
  expect(missing).toEqual([]);
});
