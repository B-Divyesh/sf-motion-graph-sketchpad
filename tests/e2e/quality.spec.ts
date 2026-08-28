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

test('loads privacy, terms, and the styled not-found route', async ({ page }) => {
  await page.goto('/privacy');
  await expect(page).toHaveTitle('Privacy — Motion Graph Sketchpad');
  await expect(page.locator('h1')).toHaveText('Your sketch stays on this device');
  await page.goto('/terms');
  await expect(page).toHaveTitle('Terms — Motion Graph Sketchpad');
  await page.goto('/missing-frame');
  await expect(page.locator('h1')).toHaveText('This frame does not exist');
});
