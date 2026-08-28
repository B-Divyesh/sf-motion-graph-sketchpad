import '@fontsource/bricolage-grotesque/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import './styles.css';
import {
  cloneSketch, EMPTY_SKETCH, exportCss, exportJson, exportWaapi,
  SAMPLE_SKETCH, slugify, validateSketch, valueAt,
  type Easing, type Keyframe, type MotionProperty, type PropertyKind, type Sketch,
} from './model';

const app = document.querySelector<HTMLDivElement>('#app')!;

const STORAGE_KEY = 'motion-graph-sketchpad:sketch:v1';
const BUILD_ID = 'v1.0.0';
const easings: Easing[] = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
let demoMode = location.pathname === '/demo' || new URLSearchParams(location.search).get('demo') === '1';
let sketch = demoMode ? cloneSketch(SAMPLE_SKETCH) : loadSketch();
let selected: { propertyId: string; frameId: string } | null = firstSelection();
let currentTime = 0;
let exportKind: 'css' | 'waapi' | 'json' = 'css';
let animationFrame = 0;
let playing = false;
let route = routeFromPath();

function routeFromPath(): 'home' | 'privacy' | 'terms' | 'not-found' {
  if (location.pathname === '/' || location.pathname === '/demo') return 'home';
  if (location.pathname === '/privacy') return 'privacy';
  if (location.pathname === '/terms') return 'terms';
  return 'not-found';
}

function loadSketch(): Sketch {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? validateSketch(JSON.parse(stored)) : cloneSketch(EMPTY_SKETCH);
  } catch {
    return cloneSketch(EMPTY_SKETCH);
  }
}

function saveSketch(message = 'Saved in this browser') {
  if (demoMode) return;
  try {
    localStorage.setItem(STORAGE_KEY, exportJson(sketch));
    announce(message);
  } catch {
    announce('The sketch could not be saved. Free browser storage, then edit again.', true);
  }
}

function firstSelection() {
  const property = sketch.properties[0];
  const frame = property?.keyframes[0];
  return property && frame ? { propertyId: property.id, frameId: frame.id } : null;
}

function escapeHtml(value: unknown): string {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] ?? character);
}

function header(): string {
  return `
    <a class="skip-link" href="#main">Skip to main content</a>
    ${demoMode && route === 'home' ? `<aside class="demo-banner" aria-label="Demo mode">
      <span><strong>Demo</strong> — sample data, nothing is saved</span>
      <span class="demo-actions"><button class="text-button" data-action="reset-demo">Reset demo</button><button class="text-button" data-action="start-real">Start for real</button></span>
    </aside>` : ''}
    <header class="site-header">
      <a class="wordmark" href="/" data-route aria-label="Motion Graph Sketchpad home"><span class="wordmark-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>Motion Graph<br>Sketchpad</span></a>
      <nav aria-label="Main navigation">
        <a href="/demo" data-route>Demo</a>
        <a href="/#sketchpad">Sketchpad</a>
        <a href="/privacy" data-route>Privacy</a>
      </nav>
    </header>`;
}

function footer(): string {
  return `<footer class="site-footer">
    <p>Sketch property motion and export ready-to-use code.</p>
    <nav aria-label="Footer navigation"><a href="/privacy" data-route>Privacy</a><a href="/terms" data-route>Terms</a><a href="https://hello-factory.sociobot.in" rel="external">Built by Param Factory <span class="sr-only">(external site)</span></a></nav>
    <p class="build">${BUILD_ID} · Original generated imagery</p>
  </footer>`;
}

function hero(): string {
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow">Motion Graph Sketchpad</p>
      <h1 id="hero-title" tabindex="-1">Sketch property motion before coding</h1>
      <p class="lede">For web and game creators testing animation without scripts or a full timeline editor.</p>
      <div class="hero-action">
        <a class="button primary" href="/demo" data-route>Try it with sample data</a>
        <span>Loads a four-property motion sketch.</span>
      </div>
      <ul class="plain-facts" aria-label="Product facts">
        <li><span aria-hidden="true">01</span> Works offline after the first visit.</li>
        <li><span aria-hidden="true">02</span> Sketches stay in this browser.</li>
        <li><span aria-hidden="true">03</span> Free. No account.</li>
      </ul>
    </div>
    <figure class="hero-art">
      <picture>
        <source type="image/avif" srcset="/assets/hero-night-bay-768.avif 768w, /assets/hero-night-bay-1280.avif 1280w" sizes="(max-width: 760px) 100vw, 58vw">
        <source type="image/webp" srcset="/assets/hero-night-bay-768.webp 768w, /assets/hero-night-bay-1280.webp 1280w" sizes="(max-width: 760px) 100vw, 58vw">
        <img src="/assets/hero-night-bay-1280.webp" width="1280" height="853" alt="A dark animation desk overlooks mountains crossed by cyan motion paths." fetchpriority="high" decoding="async">
      </picture>
      <div class="hero-curve" aria-hidden="true"><i></i><i></i><i></i></div>
      <figcaption>Test the path. Keep the code.</figcaption>
    </figure>
  </section>`;
}

function graphPath(property: MotionProperty): string {
  const frames = [...property.keyframes].sort((a, b) => a.time - b.time);
  if (property.kind === 'color' || frames.length < 2) return 'M 0 32 L 100 32';
  const numbers = frames.map((frame) => Number(frame.value));
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return frames.map((frame, index) => {
    const x = (frame.time / sketch.duration) * 100;
    const y = max === min ? 32 : 52 - ((Number(frame.value) - min) / (max - min)) * 40;
    return `${index ? 'L' : 'M'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function keyframeBottom(property: MotionProperty, frame: Keyframe, index: number): number {
  if (property.kind === 'color') return 22 + (index % 2) * 18;
  const values = property.keyframes.map((item) => Number(item.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max === min ? 30 : 10 + ((Number(frame.value) - min) / (max - min)) * 40;
}

function propertyRail(property: MotionProperty): string {
  const frames = [...property.keyframes].sort((a, b) => a.time - b.time);
  return `<article class="property-rail" data-property="${property.id}">
    <div class="rail-head">
      <label><span>Property name</span><input data-field="property-name" data-property-id="${property.id}" value="${escapeHtml(property.name)}" maxlength="28"></label>
      ${property.kind === 'color' ? '<span class="kind-badge">Colour</span>' : `<label class="unit-control"><span>Unit</span><select data-field="property-unit" data-property-id="${property.id}" aria-label="Unit for ${escapeHtml(property.name)}"><option value="" ${property.unit === '' ? 'selected' : ''}>None</option><option value="px" ${property.unit === 'px' ? 'selected' : ''}>px</option><option value="%" ${property.unit === '%' ? 'selected' : ''}>%</option><option value="deg" ${property.unit === 'deg' ? 'selected' : ''}>deg</option></select></label>`}
      <button class="icon-button danger" data-action="remove-property" data-property-id="${property.id}" aria-label="Remove ${escapeHtml(property.name)}">×</button>
    </div>
    <div class="track-wrap">
      <div class="track" data-track="${property.id}" tabindex="-1">
        <svg viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true"><path class="grid-line" d="M0 16H100 M0 32H100 M0 48H100"/><path class="graph-line" d="${graphPath(property)}"/></svg>
        <span class="playhead" style="left:${(currentTime / sketch.duration) * 100}%"></span>
        ${frames.map((frame, index) => `<button class="keyframe ${selected?.frameId === frame.id ? 'selected' : ''}" style="left:${(frame.time / sketch.duration) * 100}%;bottom:${keyframeBottom(property, frame, index)}px" data-property-id="${property.id}" data-frame-id="${frame.id}" aria-label="${escapeHtml(property.name)} keyframe at ${frame.time} milliseconds, value ${escapeHtml(frame.value)}"><span class="sr-only">Edit keyframe</span></button>`).join('')}
      </div>
      <div class="time-scale" aria-hidden="true"><span>0</span><span>${Math.round(sketch.duration / 2)} ms</span><span>${sketch.duration} ms</span></div>
    </div>
    <button class="text-button add-frame" data-action="add-keyframe" data-property-id="${property.id}">+ Add keyframe at playhead</button>
  </article>`;
}

function inspector(): string {
  if (!selected) return `<div class="inspector empty-inspector"><p>Select a keyframe to edit its value and easing.</p></div>`;
  const property = sketch.properties.find((item) => item.id === selected?.propertyId);
  const frame = property?.keyframes.find((item) => item.id === selected?.frameId);
  if (!property || !frame) return `<div class="inspector empty-inspector"><p>Select a keyframe to edit it.</p></div>`;
  return `<form class="inspector" id="keyframe-form">
    <div class="inspector-title"><div><span class="eyebrow">Selected keyframe</span><strong>${escapeHtml(property.name)}</strong></div><button type="button" class="text-button danger-text" data-action="remove-keyframe">Delete keyframe</button></div>
    <label>Time <span class="input-with-unit"><input name="time" type="number" min="0" max="${sketch.duration}" step="10" value="${frame.time}"><span>ms</span></span></label>
    <label>Value <span class="input-with-unit"><input name="value" type="${property.kind === 'color' ? 'color' : 'number'}" step="any" value="${escapeHtml(frame.value)}"><span>${escapeHtml(property.unit)}</span></span></label>
    <label>Easing <select name="easing">${easings.map((easing) => `<option value="${easing}" ${frame.easing === easing ? 'selected' : ''}>${easing}</option>`).join('')}</select></label>
  </form>`;
}

function exportText(): string {
  if (exportKind === 'css') return exportCss(sketch);
  if (exportKind === 'waapi') return exportWaapi(sketch);
  return exportJson(sketch);
}

function exportPanel(): string {
  return `<section class="export-panel" aria-labelledby="export-title">
    <div class="section-heading"><div><p class="eyebrow">Transfer the experiment</p><h3 id="export-title">Export code</h3></div><p>Output stays stable when the sketch stays the same.</p></div>
    <div class="export-tabs" role="tablist" aria-label="Export format">
      <button role="tab" aria-selected="${exportKind === 'css'}" data-export-kind="css">CSS</button>
      <button role="tab" aria-selected="${exportKind === 'waapi'}" data-export-kind="waapi">Web Animations</button>
      <button role="tab" aria-selected="${exportKind === 'json'}" data-export-kind="json">JSON</button>
    </div>
    <div class="support-note"><strong>Browser support:</strong> Exports use five standard timing function names. Registered custom properties need CSS.registerProperty.</div>
    <pre tabindex="0"><code>${escapeHtml(exportText())}</code></pre>
    <div class="export-actions"><button class="button primary" data-action="copy-export">Copy ${exportKind === 'waapi' ? 'Web Animations' : exportKind.toUpperCase()}</button><button class="button secondary" data-action="download-export">Download file</button></div>
  </section>`;
}

function previewValues(): string {
  if (!sketch.properties.length) return '<li>No properties yet.</li>';
  return sketch.properties.map((property) => {
    const value = valueAt(property, currentTime);
    const formatted = property.kind === 'number' ? `${Number(Number(value).toFixed(2))}${property.unit}` : value;
    return `<li><span>${escapeHtml(property.name)}</span><output data-value-for="${property.id}">${formatted}</output></li>`;
  }).join('');
}

function workbench(): string {
  const hasProperties = sketch.properties.length > 0;
  return `<section class="sketchpad-section" id="sketchpad" aria-labelledby="sketchpad-title">
    <div class="section-heading"><div><p class="eyebrow">The sketchpad</p><h2 id="sketchpad-title">Shape the values</h2></div><p>Drag keyframes sideways. Use arrow keys for 50 ms steps.</p></div>
    <div class="workspace">
      <div class="preview-panel">
        <div class="preview-stage" aria-label="Motion preview">
          <div class="horizon" aria-hidden="true"></div><div class="preview-object" aria-hidden="true"><i></i></div>
          <span class="preview-time"><output id="current-time">${Math.round(currentTime)}</output> ms</span>
        </div>
        <div class="transport">
          <button class="button primary compact" data-action="play">${playing ? 'Pause preview' : 'Play preview'}</button>
          <button class="button secondary compact" data-action="restart">Restart</button>
          <label>Playhead <input id="playhead-input" type="range" min="0" max="${sketch.duration}" value="${Math.round(currentTime)}" aria-label="Playhead in milliseconds"></label>
        </div>
        <ul class="current-values" aria-label="Current property values">${previewValues()}</ul>
      </div>
      <div class="editor-panel">
        <div class="sketch-settings">
          <label>Sketch name <input id="sketch-name" value="${escapeHtml(sketch.name)}" maxlength="48"></label>
          <label>Duration <span class="input-with-unit"><input id="duration" type="number" min="200" max="30000" step="100" value="${sketch.duration}"><span>ms</span></span></label>
          <div class="file-actions"><label class="button secondary compact" for="import-file">Import JSON</label><input class="sr-only" id="import-file" type="file" accept="application/json,.json"><button class="text-button danger-text" data-action="clear-sketch">Clear sketch</button></div>
        </div>
        <div class="add-property"><span>Add property</span><button class="button secondary compact" data-action="add-property" data-kind="number" ${sketch.properties.length >= 8 ? 'disabled' : ''}>+ Number</button><button class="button secondary compact" data-action="add-property" data-kind="color" ${sketch.properties.length >= 8 ? 'disabled' : ''}>+ Colour</button><span class="property-count">${sketch.properties.length}/8</span></div>
        ${hasProperties ? `<div class="rails">${sketch.properties.map(propertyRail).join('')}</div>${inspector()}` : `<div class="empty-state"><div class="empty-curve" aria-hidden="true"></div><h3>Add the first property</h3><p>Its keyframes and motion path will appear here.</p><div><button class="button primary compact" data-action="add-property" data-kind="number">Add number property</button><button class="button secondary compact" data-action="add-property" data-kind="color">Add colour property</button></div></div>`}
      </div>
    </div>
    ${hasProperties ? exportPanel() : ''}
  </section>`;
}

function howItWorks(): string {
  return `<section class="how" aria-labelledby="how-title"><div class="section-heading"><div><p class="eyebrow">Three moves</p><h2 id="how-title">How it works</h2></div></div>
    <ol><li><span>01</span><div><h3>Name a value</h3><p>Add up to eight number or colour properties.</p></div></li><li><span>02</span><div><h3>Place the moments</h3><p>Add keyframes, drag their times, and choose easing.</p></div></li><li><span>03</span><div><h3>Take the result</h3><p>Copy CSS, Web Animations code, or stable JSON.</p></div></li></ol>
  </section>
  <section class="boundaries" aria-labelledby="boundaries-title"><div><p class="eyebrow">A disposable motion experiment</p><h2 id="boundaries-title">Small on purpose</h2></div><p>This tool does not rig characters, render video, or manage teams. It tests plain values before you open a larger editor.</p><p>No account exists. Your real sketch uses local browser storage. Demo changes disappear when you leave.</p></section>`;
}

function homePage(): string {
  return `${header()}<main id="main">${hero()}${workbench()}${howItWorks()}</main>${footer()}`;
}

function legalPage(kind: 'privacy' | 'terms'): string {
  const privacy = `<p class="eyebrow">Privacy</p><h1 tabindex="-1">Your sketch stays on this device</h1><p class="lede">Motion Graph Sketchpad has no accounts, analytics, ads, or remote storage.</p><h2>What is stored</h2><p>Your real sketch is saved in local browser storage. Demo changes use temporary memory and are discarded when you leave.</p><h2>What is sent</h2><p>The app makes no data requests after its files load. Exporting creates a file or copies text on your device.</p><h2>Remove your data</h2><p>Use “Clear sketch” in the editor. You can also clear this site’s browser storage.</p><h2>Contact</h2><p>Questions can be sent to <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a>.</p>`;
  const terms = `<p class="eyebrow">Terms</p><h1 tabindex="-1">Use the sketchpad as it is</h1><p class="lede">These terms apply when you use Motion Graph Sketchpad.</p><h2>Your work</h2><p>You keep all rights to the sketches and code you create or export.</p><h2>Allowed use</h2><p>You may use the tool for personal or commercial work. Do not use it to break laws or harm other people.</p><h2>No warranty</h2><p>The tool is provided without a warranty. Check exported code before using it in production.</p><h2>Changes</h2><p>Features and these terms may change. The date below shows the latest version.</p><p>Last updated: 28 August 2026.</p>`;
  return `${header()}<main id="main" class="legal"><article>${kind === 'privacy' ? privacy : terms}</article></main>${footer()}`;
}

function notFoundPage(): string {
  return `${header()}<main id="main" class="not-found"><div class="lost-path" aria-hidden="true"><i></i><i></i><i></i></div><p class="eyebrow">404 · Path ended</p><h1 tabindex="-1">This frame does not exist</h1><p>The address points outside this sketch.</p><a class="button primary" href="/" data-route>Return to the sketchpad</a></main>${footer()}`;
}

function setMetadata() {
  const data = route === 'privacy'
    ? ['Privacy — Motion Graph Sketchpad', 'How Motion Graph Sketchpad stores local sketches.', '/privacy']
    : route === 'terms'
      ? ['Terms — Motion Graph Sketchpad', 'Terms for using Motion Graph Sketchpad.', '/terms']
      : route === 'not-found'
        ? ['Page not found — Motion Graph Sketchpad', 'Return to Motion Graph Sketchpad.', location.pathname]
        : demoMode
          ? ['Demo — Motion Graph Sketchpad', 'Try a four-property motion sketch with sample data.', '/demo']
          : ['Motion Graph Sketchpad — Sketch property motion', 'Sketch numeric and colour property motion, preview each change, and export CSS, Web Animations, or JSON.', '/'];
  document.title = data[0];
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', data[1]);
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', `https://motion-graph-sketchpad.sociobot.in${data[2]}`);
}

function render(focusHeading = false) {
  cancelAnimationFrame(animationFrame);
  playing = false;
  route = routeFromPath();
  setMetadata();
  app.innerHTML = route === 'home' ? homePage() : route === 'privacy' || route === 'terms' ? legalPage(route) : notFoundPage();
  bindEvents();
  updatePreview();
  if (!document.getElementById('route-status')) {
    const region = document.createElement('div');
    region.id = 'route-status';
    region.className = 'sr-only';
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
  }
  if (!document.getElementById('app-status')) {
    const region = document.createElement('div');
    region.id = 'app-status';
    region.className = 'toast';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
  }
  if (focusHeading) {
    const heading = document.querySelector<HTMLElement>('h1');
    heading?.focus();
    const status = document.getElementById('route-status');
    if (status && heading) status.textContent = heading.textContent;
  }
}

function navigate(path: string) {
  history.pushState({}, '', path);
  demoMode = path.startsWith('/demo');
  if (demoMode) {
    sketch = cloneSketch(SAMPLE_SKETCH);
    selected = firstSelection();
    currentTime = 0;
  } else if (path === '/') {
    sketch = loadSketch();
    selected = firstSelection();
    currentTime = 0;
  }
  window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  render(true);
}

function announce(message: string, error = false) {
  const status = document.getElementById('app-status');
  if (!status) return;
  status.textContent = message;
  status.classList.toggle('error', error);
  status.classList.add('show');
  window.setTimeout(() => status.classList.remove('show'), 2800);
}

function selectedParts(): [MotionProperty | undefined, Keyframe | undefined] {
  const property = sketch.properties.find((item) => item.id === selected?.propertyId);
  return [property, property?.keyframes.find((frame) => frame.id === selected?.frameId)];
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

function addProperty(kind: PropertyKind) {
  if (sketch.properties.length >= 8) {
    announce('This sketch already has eight properties. Remove one before adding another.', true);
    return;
  }
  const count = sketch.properties.length + 1;
  const property: MotionProperty = {
    id: uid('property'), name: kind === 'color' ? `Colour ${count}` : `Value ${count}`, kind,
    unit: kind === 'number' ? 'px' : '',
    keyframes: [
      { id: uid('frame'), time: 0, value: kind === 'color' ? '#ffc56f' : 0, easing: 'ease-in-out' },
      { id: uid('frame'), time: sketch.duration, value: kind === 'color' ? '#72e1e7' : 100, easing: 'linear' },
    ],
  };
  sketch.properties.push(property);
  selected = { propertyId: property.id, frameId: property.keyframes[0].id };
  saveSketch();
  render();
}

function addKeyframe(propertyId: string) {
  const property = sketch.properties.find((item) => item.id === propertyId);
  if (!property) return;
  const existing = property.keyframes.find((frame) => Math.abs(frame.time - currentTime) < 10);
  if (existing) {
    selected = { propertyId, frameId: existing.id };
    announce('A keyframe already exists at this time. It is selected now.');
  } else {
    const frame: Keyframe = { id: uid('frame'), time: Math.round(currentTime), value: valueAt(property, currentTime), easing: 'ease-in-out' };
    property.keyframes.push(frame);
    selected = { propertyId, frameId: frame.id };
    saveSketch('Keyframe added and saved');
  }
  render();
}

function updatePreview() {
  const object = document.querySelector<HTMLElement>('.preview-object');
  const numeric = sketch.properties.filter((property) => property.kind === 'number');
  const colour = sketch.properties.find((property) => property.kind === 'color');
  const x = numeric[0] ? Number(valueAt(numeric[0], currentTime)) : 0;
  const y = numeric[1] ? Number(valueAt(numeric[1], currentTime)) : 0;
  const scale = numeric[2] ? Number(valueAt(numeric[2], currentTime)) : 1;
  if (object) {
    object.style.transform = `translate3d(${Math.max(-220, Math.min(220, x))}px, ${Math.max(-80, Math.min(80, y))}px, 0) scale(${Math.max(0.2, Math.min(2, scale))})`;
    object.style.setProperty('--object-color', String(colour ? valueAt(colour, currentTime) : '#ffc56f'));
  }
  document.querySelectorAll<HTMLElement>('.playhead').forEach((item) => { item.style.left = `${(currentTime / sketch.duration) * 100}%`; });
  const timeOutput = document.getElementById('current-time');
  if (timeOutput) timeOutput.textContent = String(Math.round(currentTime));
  const slider = document.querySelector<HTMLInputElement>('#playhead-input');
  if (slider) slider.value = String(Math.round(currentTime));
  sketch.properties.forEach((property) => {
    const output = document.querySelector<HTMLOutputElement>(`[data-value-for="${property.id}"]`);
    if (!output) return;
    const value = valueAt(property, currentTime);
    output.value = property.kind === 'number' ? `${Number(Number(value).toFixed(2))}${property.unit}` : String(value);
  });
}

function togglePlay() {
  if (playing) {
    playing = false;
    cancelAnimationFrame(animationFrame);
    render();
    return;
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    currentTime = sketch.duration;
    updatePreview();
    announce('Preview moved to the final frame. Motion is reduced in your settings.');
    return;
  }
  if (currentTime >= sketch.duration) currentTime = 0;
  playing = true;
  const startAt = performance.now() - currentTime;
  document.querySelector<HTMLButtonElement>('[data-action="play"]')!.textContent = 'Pause preview';
  const tick = (now: number) => {
    currentTime = Math.min(sketch.duration, now - startAt);
    updatePreview();
    if (currentTime < sketch.duration && playing) animationFrame = requestAnimationFrame(tick);
    else {
      playing = false;
      const button = document.querySelector<HTMLButtonElement>('[data-action="play"]');
      if (button) button.textContent = 'Play preview';
      announce('Preview finished');
    }
  };
  animationFrame = requestAnimationFrame(tick);
}

async function copyExport() {
  try {
    await navigator.clipboard.writeText(exportText());
  } catch {
    const area = document.createElement('textarea');
    area.value = exportText();
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  announce(`${exportKind === 'waapi' ? 'Web Animations' : exportKind.toUpperCase()} copied`);
}

function downloadExport() {
  const extension = exportKind === 'json' ? 'json' : exportKind === 'css' ? 'css' : 'js';
  const blob = new Blob([exportText()], { type: exportKind === 'json' ? 'application/json' : 'text/plain' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `${slugify(sketch.name)}.${extension}`;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
  announce(`${anchor.download} downloaded`);
}

function bindKeyframeDrag(button: HTMLButtonElement) {
  button.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    const propertyId = button.dataset.propertyId!;
    const frameId = button.dataset.frameId!;
    const property = sketch.properties.find((item) => item.id === propertyId);
    const frame = property?.keyframes.find((item) => item.id === frameId);
    const track = document.querySelector<HTMLElement>(`[data-track="${propertyId}"]`);
    if (!property || !frame || !track) return;
    selected = { propertyId, frameId };
    const rect = track.getBoundingClientRect();
    const move = (moveEvent: PointerEvent) => {
      const ratio = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
      frame.time = Math.round((ratio * sketch.duration) / 10) * 10;
      button.style.left = `${ratio * 100}%`;
      currentTime = frame.time;
      updatePreview();
    };
    const end = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      property.keyframes.sort((a, b) => a.time - b.time);
      saveSketch('Keyframe moved and saved');
      render();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end, { once: true });
  });
  button.addEventListener('click', () => {
    selected = { propertyId: button.dataset.propertyId!, frameId: button.dataset.frameId! };
    render();
  });
  button.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    selected = { propertyId: button.dataset.propertyId!, frameId: button.dataset.frameId! };
    const [, frame] = selectedParts();
    if (!frame) return;
    const step = event.shiftKey ? 250 : 50;
    frame.time = Math.max(0, Math.min(sketch.duration, frame.time + (event.key === 'ArrowRight' ? step : -step)));
    currentTime = frame.time;
    saveSketch('Keyframe moved and saved');
    render();
    document.querySelector<HTMLButtonElement>(`[data-frame-id="${frame.id}"]`)?.focus();
  });
}

function bindEvents() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-route]').forEach((anchor) => anchor.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(new URL(anchor.href).pathname);
  }));
  document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach((button) => button.addEventListener('click', () => {
    const action = button.dataset.action;
    if (action === 'reset-demo') { sketch = cloneSketch(SAMPLE_SKETCH); selected = firstSelection(); currentTime = 0; render(); announce('Demo reset'); }
    if (action === 'start-real') navigate('/');
    if (action === 'add-property') addProperty(button.dataset.kind as PropertyKind);
    if (action === 'add-keyframe') addKeyframe(button.dataset.propertyId!);
    if (action === 'play') togglePlay();
    if (action === 'restart') { playing = false; cancelAnimationFrame(animationFrame); currentTime = 0; render(); announce('Preview returned to the first frame'); }
    if (action === 'copy-export') void copyExport();
    if (action === 'download-export') downloadExport();
    if (action === 'remove-property') {
      const property = sketch.properties.find((item) => item.id === button.dataset.propertyId);
      if (property && confirm(`Remove “${property.name}” and all its keyframes?`)) {
        sketch.properties = sketch.properties.filter((item) => item.id !== property.id);
        selected = firstSelection(); saveSketch('Property removed'); render();
      }
    }
    if (action === 'remove-keyframe') {
      const [property, frame] = selectedParts();
      if (!property || !frame) return;
      if (property.keyframes.length <= 1) { announce('Each property needs one keyframe. Add another before deleting this one.', true); return; }
      if (confirm(`Delete the keyframe at ${frame.time} ms?`)) {
        property.keyframes = property.keyframes.filter((item) => item.id !== frame.id);
        selected = { propertyId: property.id, frameId: property.keyframes[0].id };
        saveSketch('Keyframe deleted'); render();
      }
    }
    if (action === 'clear-sketch' && confirm(`Clear “${sketch.name}” and all its properties?`)) {
      sketch = cloneSketch(EMPTY_SKETCH); selected = null; currentTime = 0; saveSketch('Sketch cleared'); render();
    }
  }));
  document.querySelectorAll<HTMLButtonElement>('.keyframe').forEach(bindKeyframeDrag);
  document.querySelectorAll<HTMLButtonElement>('[data-export-kind]').forEach((button) => button.addEventListener('click', () => {
    exportKind = button.dataset.exportKind as typeof exportKind; render();
    document.querySelector<HTMLButtonElement>(`[data-export-kind="${exportKind}"]`)?.focus();
  }));
  document.querySelector<HTMLInputElement>('#sketch-name')?.addEventListener('change', (event) => {
    sketch.name = (event.target as HTMLInputElement).value.trim() || 'Untitled motion'; saveSketch(); render();
  });
  document.querySelector<HTMLInputElement>('#duration')?.addEventListener('change', (event) => {
    const previous = sketch.duration;
    sketch.duration = Math.max(200, Math.min(30000, Number((event.target as HTMLInputElement).value) || previous));
    const ratio = sketch.duration / previous;
    sketch.properties.forEach((property) => property.keyframes.forEach((frame) => { frame.time = Math.round(frame.time * ratio); }));
    currentTime = Math.min(currentTime * ratio, sketch.duration); saveSketch(); render();
  });
  document.querySelectorAll<HTMLInputElement>('[data-field="property-name"]').forEach((input) => input.addEventListener('change', () => {
    const property = sketch.properties.find((item) => item.id === input.dataset.propertyId);
    if (property) { property.name = input.value.trim() || 'Untitled property'; saveSketch(); render(); }
  }));
  document.querySelectorAll<HTMLSelectElement>('[data-field="property-unit"]').forEach((input) => input.addEventListener('change', () => {
    const property = sketch.properties.find((item) => item.id === input.dataset.propertyId);
    if (property) { property.unit = input.value; saveSketch(); render(); }
  }));
  document.querySelector<HTMLInputElement>('#playhead-input')?.addEventListener('input', (event) => {
    currentTime = Number((event.target as HTMLInputElement).value); updatePreview();
  });
  document.querySelector<HTMLFormElement>('#keyframe-form')?.addEventListener('change', (event) => {
    const [property, frame] = selectedParts();
    if (!property || !frame) return;
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    if (target.name === 'time') frame.time = Math.max(0, Math.min(sketch.duration, Number(target.value)));
    if (target.name === 'value') frame.value = property.kind === 'number' ? Number(target.value) : target.value;
    if (target.name === 'easing') frame.easing = target.value as Easing;
    property.keyframes.sort((a, b) => a.time - b.time);
    saveSketch(); render();
  });
  document.querySelector<HTMLInputElement>('#import-file')?.addEventListener('change', async (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      sketch = validateSketch(JSON.parse(await file.text())); selected = firstSelection(); currentTime = 0; saveSketch('JSON imported and saved'); render();
    } catch (error) {
      announce(error instanceof Error ? error.message : 'The file could not be read. Choose a JSON sketch export.', true);
    }
  });
}

window.addEventListener('popstate', () => {
  demoMode = location.pathname === '/demo';
  sketch = demoMode ? cloneSketch(SAMPLE_SKETCH) : loadSketch();
  selected = firstSelection(); currentTime = 0; render(true);
});
window.addEventListener('online', () => announce('Back online. Your sketch stayed available.'));
window.addEventListener('offline', () => announce('You are offline. Editing and exports still work.'));

render();

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {
    announce('Offline setup failed. Reload while online to try again.', true);
  }));
}
