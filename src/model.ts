export type PropertyKind = 'number' | 'color';
export type Easing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface Keyframe {
  id: string;
  time: number;
  value: number | string;
  easing: Easing;
}

export interface MotionProperty {
  id: string;
  name: string;
  kind: PropertyKind;
  unit: string;
  keyframes: Keyframe[];
}

export interface Sketch {
  version: 1;
  name: string;
  duration: number;
  properties: MotionProperty[];
}

export const EMPTY_SKETCH: Sketch = {
  version: 1,
  name: 'Untitled motion',
  duration: 2000,
  properties: [],
};

export const SAMPLE_SKETCH: Sketch = {
  version: 1,
  name: 'Lantern drift',
  duration: 2400,
  properties: [
    {
      id: 'drift-x', name: 'Drift X', kind: 'number', unit: 'px',
      keyframes: [
        { id: 'x-0', time: 0, value: 0, easing: 'ease-out' },
        { id: 'x-1', time: 1350, value: 168, easing: 'ease-in-out' },
        { id: 'x-2', time: 2400, value: 210, easing: 'linear' },
      ],
    },
    {
      id: 'lift', name: 'Lift', kind: 'number', unit: 'px',
      keyframes: [
        { id: 'y-0', time: 0, value: 20, easing: 'ease-out' },
        { id: 'y-1', time: 900, value: -34, easing: 'ease-in-out' },
        { id: 'y-2', time: 2400, value: 0, easing: 'linear' },
      ],
    },
    {
      id: 'scale', name: 'Scale', kind: 'number', unit: '',
      keyframes: [
        { id: 's-0', time: 0, value: 0.86, easing: 'ease-out' },
        { id: 's-1', time: 1100, value: 1.08, easing: 'ease-in-out' },
        { id: 's-2', time: 2400, value: 1, easing: 'linear' },
      ],
    },
    {
      id: 'glow', name: 'Glow colour', kind: 'color', unit: '',
      keyframes: [
        { id: 'c-0', time: 0, value: '#ffc56f', easing: 'ease-in-out' },
        { id: 'c-1', time: 1200, value: '#72e1e7', easing: 'ease-in-out' },
        { id: 'c-2', time: 2400, value: '#ffc56f', easing: 'linear' },
      ],
    },
  ],
};

export function cloneSketch(sketch: Sketch): Sketch {
  return JSON.parse(JSON.stringify(sketch)) as Sketch;
}

export function slugify(value: string): string {
  const slug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return slug || 'property';
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16)) as [number, number, number];
}

function rgbToHex(rgb: [number, number, number]): string {
  return `#${rgb.map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`;
}

const EASING_POINTS: Record<Easing, [number, number, number, number]> = {
  linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1], 'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};

function cubic(a: number, b: number, t: number): number {
  const inverse = 1 - t;
  return 3 * inverse * inverse * t * a + 3 * inverse * t * t * b + t * t * t;
}

function easeProgress(progress: number, easing: Easing): number {
  if (easing === 'linear') return progress;
  const [x1, y1, x2, y2] = EASING_POINTS[easing];
  let low = 0;
  let high = 1;
  for (let index = 0; index < 12; index += 1) {
    const middle = (low + high) / 2;
    if (cubic(x1, x2, middle) < progress) low = middle;
    else high = middle;
  }
  return cubic(y1, y2, (low + high) / 2);
}

export function valueAt(property: MotionProperty, time: number): number | string {
  const frames = [...property.keyframes].sort((a, b) => a.time - b.time);
  if (!frames.length) return property.kind === 'color' ? '#ffc56f' : 0;
  if (time <= frames[0].time) return frames[0].value;
  if (time >= frames[frames.length - 1].time) return frames[frames.length - 1].value;
  const rightIndex = frames.findIndex((frame) => frame.time >= time);
  const left = frames[rightIndex - 1];
  const right = frames[rightIndex];
  const raw = (time - left.time) / (right.time - left.time);
  const progress = easeProgress(raw, left.easing);
  if (property.kind === 'number') {
    return Number(left.value) + (Number(right.value) - Number(left.value)) * progress;
  }
  const from = hexToRgb(String(left.value));
  const to = hexToRgb(String(right.value));
  return rgbToHex(from.map((channel, index) => channel + (to[index] - channel) * progress) as [number, number, number]);
}

function cssSyntax(property: MotionProperty): string {
  if (property.kind === 'color') return '<color>';
  if (property.unit === 'px') return '<length>';
  if (property.unit === '%') return '<percentage>';
  if (property.unit === 'deg') return '<angle>';
  return '<number>';
}

function formattedValue(property: MotionProperty, value: number | string): string {
  if (property.kind === 'color') return String(value);
  return `${Number(Number(value).toFixed(3))}${property.unit}`;
}

export function exportCss(sketch: Sketch): string {
  const properties = sketch.properties.map((property, index) => {
    const name = `${slugify(property.name)}-${index + 1}`;
    const first = [...property.keyframes].sort((a, b) => a.time - b.time)[0];
    const initial = formattedValue(property, first?.value ?? (property.kind === 'color' ? '#ffc56f' : 0));
    return `@property --${name} {\n  syntax: '${cssSyntax(property)}';\n  inherits: false;\n  initial-value: ${initial};\n}`;
  });
  const animations = sketch.properties.map((property, index) => {
    const name = `${slugify(property.name)}-${index + 1}`;
    const frames = [...property.keyframes].sort((a, b) => a.time - b.time).map((frame) => {
      const percent = Number(((frame.time / sketch.duration) * 100).toFixed(3));
      return `  ${percent}% { --${name}: ${formattedValue(property, frame.value)}; animation-timing-function: ${frame.easing}; }`;
    }).join('\n');
    return `@keyframes ${name}-motion {\n${frames}\n}`;
  });
  const declaration = sketch.properties.map((property, index) => {
    const name = `${slugify(property.name)}-${index + 1}`;
    return `${name}-motion ${sketch.duration}ms linear both`;
  }).join(',\n    ');
  return `/* ${sketch.name} — Motion Graph Sketchpad */\n${properties.join('\n\n')}\n\n${animations.join('\n\n')}\n\n.motion-sketch {\n  animation:\n    ${declaration};\n}\n`;
}

export function exportWaapi(sketch: Sketch): string {
  const lines = sketch.properties.map((property, index) => {
    const name = `--${slugify(property.name)}-${index + 1}`;
    const frames = [...property.keyframes].sort((a, b) => a.time - b.time).map((frame) => ({
      offset: Number((frame.time / sketch.duration).toFixed(5)),
      [name]: formattedValue(property, frame.value),
      easing: frame.easing,
    }));
    const initial = formattedValue(property, property.keyframes[0]?.value ?? (property.kind === 'color' ? '#ffc56f' : 0));
    return `CSS.registerProperty({ name: '${name}', syntax: '${cssSyntax(property)}', inherits: false, initialValue: '${initial}' });\nelement.animate(${JSON.stringify(frames, null, 2)}, { duration: ${sketch.duration}, fill: 'both' });`;
  });
  return `// ${sketch.name} — Motion Graph Sketchpad\nconst element = document.querySelector('.motion-sketch');\n\n${lines.join('\n\n')}\n`;
}

export function exportJson(sketch: Sketch): string {
  const stable: Sketch = {
    version: 1,
    name: sketch.name,
    duration: sketch.duration,
    properties: sketch.properties.map((property) => ({
      ...property,
      keyframes: [...property.keyframes].sort((a, b) => a.time - b.time),
    })),
  };
  return `${JSON.stringify(stable, null, 2)}\n`;
}

export function validateSketch(value: unknown): Sketch {
  if (!value || typeof value !== 'object') throw new Error('The file does not contain a sketch. Choose a JSON export from this tool.');
  const sketch = value as Partial<Sketch>;
  if (sketch.version !== 1 || typeof sketch.name !== 'string' || typeof sketch.duration !== 'number' || !Array.isArray(sketch.properties)) {
    throw new Error('The sketch format is not supported. Choose a version 1 JSON export.');
  }
  if (sketch.properties.length > 8) throw new Error('This sketch has more than eight properties. Remove extras and try again.');
  return cloneSketch(sketch as Sketch);
}
