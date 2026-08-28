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
  await expect(page.getByRole('heading', { name: 'Edit motion property values' })).toBeVisible();
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
  await page.getByRole('button', { name: 'Open my real sketch' }).click();
  await page.locator('[data-action="add-property"][data-kind="number"]').first().click();
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

test('@claim:demo-isolation discards demo edits and never reads or writes real storage', async ({ page }) => {
  const realSketch = JSON.stringify({ version: 1, name: 'Real sentinel', duration: 800, properties: [] });
  await page.goto('/');
  await page.evaluate((value) => localStorage.setItem('motion-graph-sketchpad:sketch:v1', value), realSketch);
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
  await page.getByLabel('Sketch name').fill('Changed demo');
  await page.getByLabel('Sketch name').press('Tab');
  expect(await page.evaluate(() => localStorage.getItem('motion-graph-sketchpad:sketch:v1'))).toBe(realSketch);
  await page.getByRole('button', { name: 'Open my real sketch' }).click();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Real sentinel');
  expect(await page.evaluate(() => localStorage.getItem('motion-graph-sketchpad:sketch:v1'))).toBe(realSketch);
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
});

test('@claim:eight-properties limits a real sketch to eight properties', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.locator('[data-action="add-property"][data-kind="color"]').first().click();
  for (let index = 1; index < 8; index += 1) await page.locator('[data-action="add-property"][data-kind="number"]').click();
  await expect(page.getByText('8/8')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add number property' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Add colour property' })).toBeDisabled();
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

test('@claim:demo-four-property-sample opens the named four-property sample', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await page.reload();
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
  await expect(page.locator('[data-field="property-name"]')).toHaveCount(4);
  expect(await page.locator('[data-field="property-name"]').evaluateAll((inputs) =>
    inputs.map((input) => (input as HTMLInputElement).value),
  )).toEqual(['Drift X', 'Lift', 'Scale', 'Glow colour']);
});

test('@claim:five-standard-easings offers five standard timing functions', async ({ page }) => {
  await page.goto('/demo');
  const easing = page.getByLabel('Easing');
  expect(await easing.locator('option').evaluateAll((options) => options.map((option) => (option as HTMLOptionElement).value)))
    .toEqual(['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']);
  for (const name of ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out']) {
    await easing.selectOption(name);
    await expect(easing).toHaveValue(name);
  }
});

test('@claim:no-account-demo-network has no account and makes no off-origin demo requests', async ({ page }) => {
  const outsideRequests: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') outsideRequests.push(request.url());
  });
  await page.goto('/demo');
  await page.getByLabel('Sketch name').fill('Private demo');
  await page.getByLabel('Sketch name').press('Tab');
  await page.getByRole('tab', { name: 'JSON', exact: true }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download file' }).click();
  await downloadPromise;
  await expect(page.locator('input[type="password"], [name*="account" i], [name*="email" i]')).toHaveCount(0);
  expect(outsideRequests).toEqual([]);
});

test('@claim:demo-reset restores the original sample', async ({ page }) => {
  await page.goto('/?demo=1');
  await page.getByLabel('Sketch name').fill('Changed demo');
  await page.getByLabel('Sketch name').press('Tab');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
  await expect(page.locator('[data-field="property-name"]')).toHaveCount(4);
  await expect(page.locator('.keyframe')).toHaveCount(12);
});

test('@claim:waapi-registers-properties exports property registration before animation', async ({ page }) => {
  await page.goto('/?demo=1');
  await page.getByRole('tab', { name: 'Web Animations', exact: true }).click();
  const code = await page.locator('.export-panel code').innerText();
  for (const property of ['--drift-x-1', '--lift-2', '--scale-3', '--glow-colour-4']) {
    const registration = code.indexOf(`CSS.registerProperty({ name: '${property}'`);
    expect(registration).toBeGreaterThanOrEqual(0);
    expect(code.indexOf('element.animate', registration)).toBeGreaterThan(registration);
  }
});
