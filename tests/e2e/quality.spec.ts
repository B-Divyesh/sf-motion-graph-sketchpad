import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('has route metadata, landmarks, and no serious accessibility findings', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/demo');
  await expect(page).toHaveTitle('Demo — Motion Graph Sketchpad');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact ?? ''))).toEqual([]);
  expect(errors).toEqual([]);
});

test('@claim:keyboard-keyframes supports keyboard keyframe editing', async ({ page }) => {
  await page.goto('/demo');
  const first = page.locator('.keyframe').first();
  await first.focus();
  await first.press('ArrowRight');
  await expect(page.locator('.keyframe').first()).toHaveAttribute('aria-label', /50 milliseconds/);
  await page.locator('.keyframe').first().press('Shift+ArrowRight');
  await expect(page.locator('.keyframe').first()).toHaveAttribute('aria-label', /300 milliseconds/);
});

test('fits the 390 pixel mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  const sizes = await page.evaluate(() => ({ body: document.body.scrollWidth, viewport: document.documentElement.clientWidth }));
  expect(sizes.body).toBeLessThanOrEqual(sizes.viewport);
  await expect(page.getByRole('button', { name: 'Play preview' })).toBeVisible();
});

test('keeps primary mobile editing controls at least 44 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  const controls = page.locator('.keyframe, .demo-actions .text-button, .rail-head input, .unit-control select');
  const boxes = await controls.evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { width: box.width, height: box.height };
  }));
  expect(boxes.length).toBeGreaterThan(0);
  expect(boxes.every((box) => box.width >= 44 && box.height >= 44)).toBe(true);
});

test('shows plain recovery guidance for malformed JSON imports', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#import-file').setInputFiles({
    name: 'broken.json', mimeType: 'application/json', buffer: Buffer.from('{ not JSON }'),
  });
  await expect(page.locator('#app-status')).toContainText('This file is not valid JSON');
  await expect(page.locator('#app-status')).not.toContainText(/SyntaxError|Unexpected token|Cannot read/i);

  await page.locator('#import-file').setInputFiles({
    name: 'incomplete.json', mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ version: 1, name: 'Broken', duration: 800, properties: [{ id: 'x' }] })),
  });
  await expect(page.locator('#app-status')).toContainText('Property 1 needs a name');
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
});

test('loads privacy, terms, and the styled not-found route', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page).toHaveTitle('Privacy — Motion Graph Sketchpad');
  await expect(page.locator('h1')).toHaveText('Your sketch stays on this device');
  await page.goto('/terms');
  await expect(page).toHaveTitle('Terms — Motion Graph Sketchpad');
  await page.goto('/missing-frame');
  await expect(page.locator('h1')).toHaveText('This frame does not exist');
});
