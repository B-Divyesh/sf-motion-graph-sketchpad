import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import { cloneSketch, SAMPLE_SKETCH, valueAt } from '../../src/model';

const appOrigin = new URL(process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4173').origin;

test('@claim:offline-reload works offline after the first visit', async ({ page, context }) => {
  await page.goto('/demo');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Edit a sample motion sketch');
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
    if (new URL(request.url()).origin !== appOrigin) outsideRequests.push(request.url());
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

test('@claim:three-exports copies and downloads CSS, Web Animations, and valid JSON', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: appOrigin });
  await page.goto('/demo');
  const code = page.locator('.export-panel code');
  const formats = [
    { tab: 'CSS', copy: 'Copy CSS', filename: 'lantern-drift.css', fragment: '@property --drift-x-1' },
    { tab: 'Web Animations', copy: 'Copy Web Animations', filename: 'lantern-drift.js', fragment: 'CSS.registerProperty' },
    { tab: 'JSON', copy: 'Copy JSON', filename: 'lantern-drift.json', fragment: '"Lantern drift"' },
  ] as const;

  for (const format of formats) {
    await page.getByRole('tab', { name: format.tab, exact: true }).click();
    await expect(code).toContainText(format.fragment);
    const visibleOutput = await code.innerText();
    if (format.tab === 'JSON') expect(JSON.parse(visibleOutput)).toMatchObject({ name: 'Lantern drift', duration: 2400, version: 1 });

    await page.getByRole('button', { name: format.copy, exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(visibleOutput);

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download file' }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(format.filename);
    const downloadedPath = await download.path();
    expect(downloadedPath).toBeTruthy();
    expect(await readFile(downloadedPath!, 'utf8')).toBe(visibleOutput);
  }
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
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await expect(page).toHaveURL(/\?demo=1$/);
  await expect(page.getByText('Demo — sample data, nothing is saved')).toBeVisible();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
  await expect(page.locator('[data-field="property-name"]')).toHaveCount(4);
  expect(await page.locator('[data-field="property-name"]').evaluateAll((inputs) =>
    inputs.map((input) => (input as HTMLInputElement).value),
  )).toEqual(['Drift X', 'Lift', 'Scale', 'Glow colour']);
  const firstScreen = page.locator('.demo-banner, #sketch-name, [data-field="property-name"], [data-action="play"]');
  const boxes = await firstScreen.evaluateAll((elements) => elements.map((element) => {
    const box = element.getBoundingClientRect();
    return { top: box.top, bottom: box.bottom };
  }));
  expect(boxes).toHaveLength(7);
  expect(boxes.every((box) => box.top >= 0 && box.bottom <= 844)).toBe(true);
  const firstProperty = page.locator('[data-field="property-name"]').first();
  await firstProperty.fill('Drift test');
  await firstProperty.press('Tab');
  await expect(page.locator('.property-summary strong').first()).toHaveText('Drift test');
  await page.getByRole('button', { name: 'Play preview' }).click();
  await expect.poll(async () => Number(await page.locator('#current-time').textContent())).toBeGreaterThan(100);
  await page.reload();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Lantern drift');
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
    if (new URL(request.url()).origin !== appOrigin) outsideRequests.push(request.url());
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

test('@claim:clear-sketch-data removes saved sketch contents from this browser', async ({ page }) => {
  const realSketch = JSON.stringify({
    version: 1,
    name: 'Remove this beacon',
    duration: 800,
    properties: [{
      id: 'opacity', name: 'Beacon opacity', kind: 'number', unit: '',
      keyframes: [
        { id: 'start', time: 0, value: 0, easing: 'linear' },
        { id: 'end', time: 800, value: 1, easing: 'linear' },
      ],
    }],
  });
  await page.goto('/');
  await page.evaluate((value) => localStorage.setItem('motion-graph-sketchpad:sketch:v1', value), realSketch);
  await page.reload();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Remove this beacon');
  await expect(page.getByLabel('Property name')).toHaveValue('Beacon opacity');
  await expect(page.locator('.keyframe')).toHaveCount(2);

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Clear sketch' }).click();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Untitled motion');
  await expect(page.locator('.property-rail')).toHaveCount(0);
  await expect(page.locator('.keyframe')).toHaveCount(0);
  const saved = await page.evaluate(() => localStorage.getItem('motion-graph-sketchpad:sketch:v1'));
  expect(saved).toContain('Untitled motion');
  expect(saved).not.toContain('Remove this beacon');
  expect(saved).not.toContain('Beacon opacity');

  await page.reload();
  await expect(page.getByLabel('Sketch name')).toHaveValue('Untitled motion');
  await expect(page.locator('.property-rail')).toHaveCount(0);
  await expect(page.locator('.keyframe')).toHaveCount(0);
});

test('@claim:add-keyframe adds one interpolated keyframe at the playhead', async ({ page }) => {
  await page.goto('/?demo=1');
  const playhead = page.getByLabel('Playhead in milliseconds');
  await playhead.fill('600');
  await expect(page.locator('#current-time')).toHaveText('600');

  const driftRail = page.locator('[data-property="drift-x"]');
  await expect(driftRail.locator('.keyframe')).toHaveCount(3);
  await driftRail.getByRole('button', { name: 'Add keyframe at playhead' }).click();
  await expect(driftRail.locator('.keyframe')).toHaveCount(4);
  await expect(driftRail.locator('.keyframe[aria-label*="at 600 milliseconds"]')).toHaveCount(1);

  const expected = Number(valueAt(cloneSketch(SAMPLE_SKETCH).properties[0], 600));
  expect(Number(await page.locator('#keyframe-form input[name="value"]').inputValue())).toBeCloseTo(expected, 8);
  await expect(page.locator('#keyframe-form input[name="time"]')).toHaveValue('600');
});
