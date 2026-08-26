import { defineConfig, devices } from '@playwright/test';

const port = 4321;
const basePath = process.env.BASE_PATH?.replace(/^\/+|\/+$/g, '') ?? '';
const pathPrefix = basePath ? `/${basePath}/` : '/';
const baseURL = `http://127.0.0.1:${port}${pathPrefix}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'output/playwright/report', open: 'never' }]],
  outputDir: 'output/playwright/test-results',
  snapshotPathTemplate: '{testDir}/visual/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}',
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixels: 0,
    },
  },
  use: {
    baseURL,
    locale: 'es-CO',
    timezoneId: 'America/Bogota',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  webServer: {
    // Vite serves Astro's static dist in the foreground, including an explicit
    // base path, without Astro CLI's agent-mode background lock.
    command: `npm run preview:test -- --base ${pathPrefix} --host 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'functional-chromium',
      testMatch: /.*\.e2e\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'a11y',
      testMatch: /.*\.a11y\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'reduced-motion',
      testMatch: /.*\.motion\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        contextOptions: { reducedMotion: 'reduce' },
      },
    },
    {
      name: 'visual-desktop',
      testMatch: /.*\.visual\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'visual-mobile',
      testMatch: /.*\.visual\.spec\.ts/,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'functional-firefox',
      testMatch: /.*\.e2e\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'functional-webkit',
      testMatch: /.*\.e2e\.spec\.ts/,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
