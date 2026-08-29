import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('public copy and claim contract', () => {
  it('gives every declared claim exactly one matching tagged test', () => {
    const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as Array<{ id: string; test: string }>;
    const tests = `${readFileSync('tests/e2e/claims.spec.ts', 'utf8')}\n${readFileSync('tests/e2e/quality.spec.ts', 'utf8')}`;
    expect(claims).toHaveLength(16);
    for (const claim of claims) {
      expect(claim.test).toBe(`npm test -- --grep @claim:${claim.id}`);
      expect(tests.split(`@claim:${claim.id}`)).toHaveLength(2);
    }
  });

  it('keeps the catalog description verb-first, plain, and under 120 characters', () => {
    const description = readFileSync('.factory/catalog-description.txt', 'utf8').trim();
    expect(description.startsWith('Sketch ')).toBe(true);
    expect(description.length).toBeLessThanOrEqual(120);
    expect(description).not.toMatch(/seamless|effortless|robust|powerful|intuitive|reimagine|supercharge|unlock/i);
  });

  it('uses the reviewed Web Animations term and product-first demo wording', () => {
    const readme = readFileSync('README.md', 'utf8');
    expect(readme).toContain('CSS, Web Animations, and JSON files');
    expect(readme).not.toContain('CSS, JavaScript, and JSON files');
    expect(readme).toContain('four animated properties in a working editor');
  });
});
