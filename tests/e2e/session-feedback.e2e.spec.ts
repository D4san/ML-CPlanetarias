import { expect, test } from '@playwright/test';

test('las tres sesiones conservan controles visibles y ancho correcto en móvil', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['sesiones/s00/', 'sistema/', 'sesiones/s02/']) {
    await page.goto(`./${route}`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width).toBeLessThanOrEqual(390);
    const footer = await page.locator('.session-presentation__footer').boundingBox();
    expect(footer!.height).toBeLessThan(100);
    expect(footer!.y + footer!.height).toBeLessThanOrEqual(845);
    await page
      .getByRole('navigation', { name: 'Navegación de la sesión', exact: true })
      .getByRole('button', { name: 'Siguiente', exact: true })
      .click();
    await expect(page.locator('.session-presentation')).toHaveAttribute(
      'data-slide-role',
      'content',
    );
  }
});

for (const route of ['sesiones/s00/', 'sistema/', 'sesiones/s02/']) {
  test(`${route}: portada, recorrido completo, fuentes, historial y reinicio`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`./${route}`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    const root = page.locator('.session-presentation');
    await expect(root).toHaveAttribute('data-slide-role', 'opening');
    await expect(root.locator('.session-opening')).toBeVisible();
    const controls = page.getByRole('navigation', { name: 'Navegación de la sesión', exact: true });
    await expect(controls.getByRole('button', { name: 'Anterior', exact: true })).toBeDisabled();
    const count = Number(await root.getAttribute('data-slide-count'));
    const expectFooterInViewport = async () => {
      const footer = await root.locator('.session-presentation__footer').boundingBox();
      expect(footer!.y).toBeGreaterThanOrEqual(0);
      expect(footer!.y + footer!.height).toBeLessThanOrEqual(page.viewportSize()!.height + 1);
    };
    await expectFooterInViewport();
    for (let i = 1; i < count; i++) {
      await controls.getByRole('button', { name: 'Siguiente', exact: true }).click();
      await expect(root).toHaveAttribute('data-active-slide', String(i));
      await expectFooterInViewport();
    }
    await expect(root).toHaveAttribute('data-slide-role', 'references');
    await expect(controls.getByRole('button', { name: 'Siguiente', exact: true })).toBeDisabled();
    await controls.getByRole('button', { name: 'Anterior', exact: true }).click();
    await expect(root).toHaveAttribute('data-slide-role', 'content');
    await page.goBack();
    await expect(root).toHaveAttribute('data-slide-role', 'references');
    await root
      .locator('.session-presentation__footer')
      .getByRole('button', { name: 'Reiniciar', exact: true })
      .click();
    await expect(root).toHaveAttribute('data-slide-role', 'opening');
    await page.goto(`./${route}#bibliografia`);
    await expect(root).toHaveAttribute('data-slide-role', 'references');
    expect(errors).toEqual([]);
  });
}

test('S01 conserva el enlace #senal y avanza desde el mapa', async ({ page }) => {
  await page.goto('./sistema/');
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Ver mapa completo', exact: true }).click();
  await expect(page.locator('.s01-overview')).toBeVisible();
  await page.getByRole('button', { name: 'Volver a la diapositiva', exact: true }).click();
  await expect(page.locator('.session-opening')).toBeVisible();
  await page.goto('./sistema/#senal');
  await expect(page.locator('.s01-journey')).toHaveAttribute('data-active-stop', 'signal');
  await expect(page.locator('.s01-journey')).toHaveAttribute('data-slide-role', 'content');
  await page.getByRole('button', { name: 'Ver mapa completo', exact: true }).click();
  await page
    .getByRole('navigation', { name: 'Navegación de la sesión', exact: true })
    .getByRole('button', { name: 'Siguiente', exact: true })
    .click();
  await expect(page.locator('.s01-journey')).toHaveAttribute('data-view', 'focus');
});

test('S02 conecta conteos, ponderación y exploración del criterio', async ({ page }) => {
  await page.goto('./sesiones/s02/#information-gain');
  const lab = page.getByRole('region', {
    name: 'Recorrido guiado de impureza y comparación de cortes',
  });
  await expect(lab.getByRole('heading', { name: '1. Contar las clases' })).toBeVisible();
  const next = lab.getByRole('button', { name: 'Paso siguiente', exact: true });
  await next.click();
  await expect(lab.getByLabel('Nodo S_R', { exact: true })).toContainText('1/5');
  await next.click();
  await expect(lab).toContainText('w_L = 3/8');
  await next.click();
  const output = lab.locator('output');
  await expect(output).toContainText('Después: 0,2');
  await expect(output).toContainText('Reducción de Gini: 0,3');
  await lab.getByRole('button', { name: 'Entropía', exact: true }).click();
  await expect(output).toContainText('0,549');
  await lab.getByRole('button', { name: 'Ver mejor corte' }).click();
  await expect(output).toContainText('Después: 0 bits');
  await expect(output).toContainText('Ganancia de información: 1 bits');
  await lab.getByRole('button', { name: 'Reiniciar ejemplo' }).click();
  await expect(lab.getByRole('heading', { name: '1. Contar las clases' })).toBeVisible();
});

test('S02 enlaza residuos con MSE y distingue las dos agregaciones del bosque', async ({
  page,
}) => {
  await page.goto('./sesiones/s02/#regression-error');
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  const score = page.locator('.s02-regression-threshold__score');
  const initial = await score.innerText();
  await expect(score).toContainText('MSE = SSE / 6');
  const slider = page.getByRole('slider', { name: /Corte de la raíz/ });
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(score).not.toHaveText(initial);
  await expect(page.locator('.s02-regression-threshold__plot line[marker-end]')).toHaveCount(6);
  await page.goto('./sesiones/s02/#forest');
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await expect(page.locator('.s02-forest-prediction [role="status"]')).toContainText(
    'tipo Tierra 53,3 %',
  );
  for (const card of await page.locator('.s02-forest-explainer__card').all()) {
    const heading = await card.locator('header').boundingBox();
    const figure = await card.locator('figure').boundingBox();
    const explanation = await card.locator(':scope > p').boundingBox();
    expect(heading!.y + heading!.height).toBeLessThanOrEqual(figure!.y + 1);
    expect(figure!.y + figure!.height).toBeLessThanOrEqual(explanation!.y + 1);
  }
  const definition = page.locator('.s02-forest-explainer__definition');
  await definition.scrollIntoViewIfNeeded();
  await expect(definition).toBeInViewport({ ratio: 1 });
  const definitionBox = await definition.boundingBox();
  const footerBox = await page.locator('.session-presentation__footer').boundingBox();
  expect(definitionBox!.y + definitionBox!.height).toBeLessThanOrEqual(footerBox!.y);
  await page.getByRole('button', { name: 'Regresión', exact: true }).click();
  await expect(page.locator('.s02-forest-prediction [role="status"]')).toContainText('2,6 R⊕');
});
