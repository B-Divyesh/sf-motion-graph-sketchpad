import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('has route metadata, landmarks, and no serious accessibility findings', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  for (const path of ['/', '/demo', '/privacy', '/terms']) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  }
  await expect(page).toHaveTitle('Terms — Motion Graph Sketchpad');
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

test('keeps every visible mobile interactive target at least 44 pixels', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/demo');
  const controls = page.locator('a, button, input, select, textarea, [role="button"], [role="tab"]');
  const boxes = await controls.evaluateAll((elements) => elements.filter((element) => {
    const style = getComputedStyle(element);
    const box = element.getBoundingClientRect();
    return !element.classList.contains('sr-only') && style.visibility !== 'hidden' && style.display !== 'none' && box.width > 1 && box.height > 1;
  }).map((element) => {
    const box = element.getBoundingClientRect();
    return { name: (element as HTMLElement).innerText || element.getAttribute('aria-label') || element.tagName, width: box.width, height: box.height };
  }));
  expect(boxes.length).toBeGreaterThan(20);
  expect(boxes.filter((box) => box.width < 44 || box.height < 44)).toEqual([]);
});

const firstScreenViewports = [
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1536, height: 864 },
  { width: 1920, height: 1080 },
  { width: 390, height: 844 },
] as const;

for (const viewport of firstScreenViewports) {
  test(`keeps the complete first action and facts above the fold at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    for (const selector of ['.hero-action', '.plain-facts']) {
      const box = await page.locator(selector).boundingBox();
      expect(box, `${selector} has layout bounds`).not.toBeNull();
      expect(box!.y, `${selector} starts inside the viewport`).toBeGreaterThanOrEqual(0);
      expect(box!.y + box!.height, `${selector} ends inside the viewport`).toBeLessThanOrEqual(viewport.height);
    }

    await expect(page.getByRole('link', { name: 'Try it with sample data' })).toBeVisible();
    await expect(page.getByText('Loads a four-property motion sketch.')).toBeVisible();
    await expect(page.locator('.plain-facts li')).toHaveCount(3);
  });
}

test('keeps demo controls visible and keyboard reachable after scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?demo=1');
  await page.locator('.export-panel').scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const banner = page.locator('.demo-banner');
  await expect(banner).toBeVisible();
  const box = await banner.boundingBox();
  expect(box && box.y >= 0 && box.y + box.height <= 844).toBeTruthy();
  const reset = page.getByRole('button', { name: 'Reset demo' });
  await reset.focus();
  await expect(reset).toBeFocused();
  await expect(page.getByRole('button', { name: 'Open my real sketch' })).toBeVisible();
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

test('sets route-specific metadata on every client route', async ({ page }) => {
  const routes = [
    ['/demo', 'Demo — Motion Graph Sketchpad', 'Try a four-property motion sketch with sample data.', '/demo'],
    ['/privacy', 'Privacy — Motion Graph Sketchpad', 'How Motion Graph Sketchpad stores local sketches.', '/privacy'],
    ['/terms', 'Terms — Motion Graph Sketchpad', 'Terms for using Motion Graph Sketchpad.', '/terms'],
  ] as const;
  for (const [path, title, description, canonicalPath] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://motion-graph-sketchpad.sociobot.in${canonicalPath}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://motion-graph-sketchpad.sociobot.in${canonicalPath}`);
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description);
  }
});

test('moves focus and announces history route changes', async ({ page }) => {
  await page.goto('/?demo=1');
  await page.locator('.site-header a[href="/privacy"]').click();
  await expect(page).toHaveURL('/privacy');
  const privacyHeading = page.getByRole('heading', { level: 1, name: 'Your sketch stays on this device' });
  await expect(privacyHeading).toBeFocused();
  await expect(page.locator('#route-status')).toHaveText('Your sketch stays on this device');

  await page.goBack();
  await expect(page).toHaveURL(/\?demo=1$/);
  const demoHeading = page.getByRole('heading', { level: 1, name: 'Edit a sample motion sketch' });
  await expect(demoHeading).toBeFocused();
  await expect(page.locator('#route-status')).toHaveText('Edit a sample motion sketch');
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
});

test('keeps the shared skeleton and legal links on every real route', async ({ page }) => {
  for (const path of ['/', '/demo', '/privacy', '/terms']) {
    await page.goto(path);
    await expect(page.locator('.site-header')).toHaveCount(1);
    await expect(page.locator('.site-footer')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.site-footer a[href="/privacy"]')).toHaveText('Privacy');
    await expect(page.locator('.site-footer a[href="/terms"]')).toHaveText('Terms');
  }
});

test('replaces preview travel with a final frame when motion is reduced', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Play preview' }).click();
  await expect(page.locator('#current-time')).toHaveText('2400');
  await expect(page.locator('#app-status')).toContainText('Motion is reduced in your settings.');
});

test('keeps every reviewed heading and action in plain words', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 2, name: 'Edit motion property values' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'What this sketchpad does not do' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Add a motion property' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Set keyframe times' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Export animation code' })).toBeVisible();
  await expect(page.locator('.hero-art figcaption')).toHaveText('Test motion. Export the code.');

  await page.goto('/demo');
  await expect(page.getByRole('button', { name: 'Add number property' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add colour property' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Restart preview' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open my real sketch' })).toBeVisible();
  await expect(page.getByText('Export options', { exact: true })).toBeVisible();

  await page.goto('/privacy');
  await expect(page.getByRole('heading', { level: 2, name: 'Remove your data' })).toBeVisible();
  await expect(page.getByText('Use “Clear sketch” in the editor. You can also remove this site’s data in your browser settings.')).toBeVisible();

  await page.goto('/terms');
  await expect(page.getByRole('heading', { level: 1, name: 'Terms for using Motion Graph Sketchpad' })).toBeVisible();
});
