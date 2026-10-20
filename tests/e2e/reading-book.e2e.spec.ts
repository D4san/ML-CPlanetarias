import { expect, test } from '@playwright/test';

const books = [
  { session: 'S00', route: 'sesiones/s00/', count: 7, last: 'ramas' },
  { session: 'S01', route: 'sistema/', count: 7, last: 'evidencia' },
  { session: 'S02', route: 'sesiones/s02/', count: 6, last: 'limits' },
];

for (const book of books) {
  test(`${book.session}: argumento, respuesta, índice y regreso a presentación`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`./${book.route}?modo=lectura`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    const article = page.locator('.book-reading');
    await expect(article.locator('.book-chapter')).toHaveCount(book.count);
    await expect(article.locator('.book-example')).toHaveCount(book.count);
    await expect(article.locator('.session-opening')).toHaveCount(0);
    await page.screenshot({ path: `output/playwright/book-${book.session}-desktop.png` });
    await article.locator('.book-example').first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: `output/playwright/book-${book.session}-example.png` });
    await article.locator('.book-instrument').first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: `output/playwright/book-${book.session}-instrument.png` });
    const answer = article.locator('.book-check details').first();
    await expect(answer).not.toHaveAttribute('open');
    await answer.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(answer).toHaveAttribute('open', '');
    await expect(answer.locator('p')).toBeVisible();
    const contents = page.getByRole('navigation', { name: `Capítulos de ${book.session}` });
    await contents.locator('ol a').last().click();
    await expect(page).toHaveURL(new RegExp(`#${book.last}$`));
    const lastTitle = article.locator('.book-chapter').last().locator('h2').first();
    await expect(lastTitle).toBeFocused();
    await page.getByRole('button', { name: 'Presentación', exact: true }).click();
    await expect(page.locator('.session-presentation')).toHaveAttribute(
      'data-display-mode',
      'presentation',
    );
    await expect(page).toHaveURL(new RegExp(`#${book.last}$`));
    expect(errors).toEqual([]);
  });

  test(`${book.session}: libro completo y respuestas sin JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto(`./${book.route}?modo=lectura`);
    const article = page.locator('.book-fallback .book-reading');
    await expect(article).toBeVisible();
    await expect(article.locator('.book-chapter')).toHaveCount(book.count);
    await expect(article.locator('.book-example')).toHaveCount(book.count);
    const answer = article.locator('.book-check details').first();
    await answer.locator('summary').click();
    await expect(answer.locator('p')).toBeVisible();
    await article.locator('.book-reading__contents ol a').last().click();
    await expect(article.locator('.book-chapter').last().locator('h2').first()).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      390,
    );
    await context.close();
  });

  test(`${book.session}: móvil y figuras con ancho contenido`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`./${book.route}?modo=lectura`);
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
    const article = page.locator('.book-reading');
    await expect(article).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      390,
    );
    for (const figure of await article.locator('.book-instrument').all()) {
      const box = await figure.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(391);
    }
    await page.screenshot({ path: `output/playwright/book-${book.session}-mobile.png` });
  });
}

test('S02 conserva las trece escenas dentro de los seis capítulos y responde a un control', async ({
  page,
}) => {
  await page.goto('./sesiones/s02/?modo=lectura#information-gain');
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  const article = page.locator('.book-reading');
  await expect(article.locator('.book-instrument')).toHaveCount(13);
  const sampler = article
    .locator('.book-instrument')
    .filter({ has: page.locator('.s02-bootstrap') });
  const before = await sampler
    .getByLabel('Una remuestra independiente para cada árbol')
    .textContent();
  await sampler.getByRole('button', { name: /Sortear/ }).click();
  await expect(sampler.getByLabel('Una remuestra independiente para cada árbol')).not.toHaveText(
    before!,
  );
  await sampler.getByRole('button', { name: 'Reiniciar', exact: true }).click();
  await expect(sampler.getByLabel('Una remuestra independiente para cada árbol')).toHaveText(
    before!,
  );
});
