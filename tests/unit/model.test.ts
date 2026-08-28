import { describe, expect, it } from 'vitest';
import { cloneSketch, exportCss, exportJson, exportWaapi, SAMPLE_SKETCH, validateSketch, valueAt } from '../../src/model';

describe('motion model', () => {
  it('interpolates numeric and colour values', () => {
    const sketch = cloneSketch(SAMPLE_SKETCH);
    expect(Number(valueAt(sketch.properties[0], 0))).toBe(0);
    expect(Number(valueAt(sketch.properties[0], 2400))).toBe(210);
    expect(valueAt(sketch.properties[3], 0)).toBe('#ffc56f');
  });

  it('creates stable exports', () => {
    const first = cloneSketch(SAMPLE_SKETCH);
    const second = cloneSketch(SAMPLE_SKETCH);
    expect(exportCss(first)).toBe(exportCss(second));
    expect(exportWaapi(first)).toBe(exportWaapi(second));
    expect(exportJson(first)).toBe(exportJson(second));
    expect(JSON.parse(exportJson(first))).toEqual(first);
  });

  it('rejects unsupported sketches', () => {
    expect(() => validateSketch({ version: 2, name: 'Old', duration: 20, properties: [] })).toThrow('not supported');
  });
});
