import { expect, test } from '@playwright/test';

test('@claim:offline-reload works offline after the first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sketch property motion before coding');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload();
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Shape the values' })).toBeVisible();
});

test('@claim:local-only keeps the full demo flow on the same origin', async ({ page }) => {
  const outsideRequests: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') outsideRequests.push(request.url());
  });
  await page.goto('/demo');
  await page.getByLabel('Sketch name').fill('Private test');
  await page.getByLabel('Sketch name').press('Tab');
  await page.getByRole('tab', { name: 'JSON', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download file' }).click();
  await downloadPromise;
  await page.getByRole('button', { name: 'Start for real' }).click();
  await page.getByRole('button', { name: 'Add number property' }).click();
  await page.getByLabel('Sketch name').fill('Saved locally');
  await page.getByLabel('Sketch name').press('Tab');
  await page.reload();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Saved locally');
  expect(await page.evaluate(() => localStorage.getItem('motion-graph-sketchpad:sketch:v1'))).toContain('Saved locally');
  expect(outsideRequests).toEqual([]);
});

test('@claim:three-exports creates CSS, Web Animations, and valid JSON', async ({ page }) => {
  await page.goto('/demo');
  const code = page.locator('.export-panel code');
  await expect(code).toContainText('@property --drift-x-1');
  await expect(code).toContainText('@keyframes drift-x-1-motion');

  await page.getByRole('tab', { name: 'Web Animations', exact: true }).click();
  await expect(code).toContainText('CSS.registerProperty');
  await expect(code).toContainText('element.animate');

  await page.getByRole('tab', { name: 'JSON', exact: true }).click();
  const json = await code.textContent();
  expect(JSON.parse(json ?? '{}')).toMatchObject({ name: 'Lantern drift', duration: 2400, version: 1 });
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download file' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('lantern-drift.json');
});

test('@claim:demo-isolation discards demo edits and avoids real storage', async ({ page }) => {
  await page.goto('/demo');
  await page.getByLabel('Sketch name').fill('Changed demo');
  await page.getByLabel('Sketch name').press('Tab');
  expect(await page.evaluate(() => localStorage.getItem('motion-graph-sketchpad:sketch:v1'))).toBeNull();
  await page.getByRole('button', { name: 'Start for real' }).click();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Untitled motion');
  await page.goto('/demo');
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
});

test('@claim:eight-properties limits a real sketch to eight properties', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: 'Add colour property' }).click();
  for (let index = 1; index < 8; index += 1) await page.getByRole('button', { name: '+ Number' }).click();
  await expect(page.getByText('8/8')).toBeVisible();
  await expect(page.getByRole('button', { name: '+ Number' })).toBeDisabled();
  await expect(page.getByRole('button', { name: '+ Colour' })).toBeDisabled();
  await expect(page.locator('.property-rail')).toHaveCount(8);
  await expect(page.locator('.kind-badge').first()).toHaveText('Colour');
});

test('@claim:deterministic-export keeps all formats byte-for-byte stable', async ({ page }) => {
  await page.goto('/demo');
  const collect = async () => {
    const output: string[] = [];
    for (const tab of ['CSS', 'Web Animations', 'JSON']) {
      await page.getByRole('tab', { name: tab, exact: true }).click();
      output.push(await page.locator('.export-panel code').innerText());
    }
    return output;
  };
  const first = await collect();
  await page.reload();
  expect(await collect()).toEqual(first);
});

test('@claim:free-no-account has no account or payment gate', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Free. No account.')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /sign in|checkout|pay/i })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /sign in|checkout|pay/i })).toHaveCount(0);
});

test('@claim:json-import loads a valid sketch file', async ({ page }) => {
  await page.goto('/demo');
  await page.locator('#import-file').setInputFiles({
    name: 'imported.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({
      version: 1, name: 'Imported pulse', duration: 800,
      properties: [{
        id: 'opacity', name: 'Opacity', kind: 'number', unit: '',
        keyframes: [
          { id: 'a', time: 0, value: 0, easing: 'linear' },
          { id: 'b', time: 800, value: 1, easing: 'linear' },
        ],
      }],
    })),
  });
  await expect(page.getByLabel('Sketch name')).toHaveValue('Imported pulse');
  await expect(page.getByLabel('Property name')).toHaveValue('Opacity');
});

test('@claim:drag-keyframes changes the keyframe time', async ({ page }) => {
  await page.goto('/demo');
  const first = page.locator('.keyframe').first();
  const before = await first.getAttribute('aria-label');
  const box = await first.boundingBox();
  if (!box) throw new Error('The keyframe is not visible.');
  await first.hover();
  await page.mouse.down();
  await page.mouse.move(box.x + 70, box.y + box.height / 2, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator('.keyframe').first()).not.toHaveAttribute('aria-label', before ?? '');
});

test('@claim:easing-preview changes time and object transform', async ({ page }) => {
  await page.goto('/demo');
  const object = page.locator('.preview-object');
  const before = await object.evaluate((element) => getComputedStyle(element).transform);
  await page.getByRole('button', { name: 'Play preview' }).click();
  await expect.poll(async () => Number(await page.locator('#current-time').textContent())).toBeGreaterThan(120);
  const after = await object.evaluate((element) => getComputedStyle(element).transform);
  expect(after).not.toBe(before);
});
