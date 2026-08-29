import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('Static Web Apps response policy', () => {
  const config = JSON.parse(readFileSync('public/staticwebapp.config.json', 'utf8')) as {
    navigationFallback?: unknown;
    routes: Array<{ route: string; rewrite?: string; headers?: Record<string, string> }>;
    responseOverrides: Record<string, { rewrite: string }>;
  };

  it('caches versioned build assets immutably while keeping the worker updateable', () => {
    expect(config.routes.find((route) => route.route === '/assets/*')?.headers?.['Cache-Control'])
      .toBe('public, max-age=31536000, immutable');
    expect(config.routes.find((route) => route.route === '/sw.js')?.headers?.['Cache-Control'])
      .toBe('no-cache, no-store, must-revalidate');
  });

  it('rewrites only the supported SPA routes and preserves an HTTP 404 for unknown paths', () => {
    expect(config.navigationFallback).toBeUndefined();
    expect(config.routes.filter((route) => route.rewrite === '/index.html').map((route) => route.route))
      .toEqual(['/demo', '/privacy', '/terms']);
    expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html' });
  });

  it('ships a complete, metadata-rich 404 shell for direct HTTP 404 responses', () => {
    const page = readFileSync('public/404.html', 'utf8');
    expect(page).toContain('<header>');
    expect(page).toContain('<footer>');
    expect(page).toContain('href="/privacy"');
    expect(page).toContain('href="/terms"');
    expect(page).toContain('href="/favicon.svg"');
    expect(page).toContain('rel="canonical"');
    expect(page).toContain('property="og:title"');
    expect(page).toContain('name="twitter:title"');
    expect(page).toContain('<main id="main">');
    expect(page).toContain('<p class="eyebrow">404</p>');
    expect(page).toContain('<h1 tabindex="-1">Page not found</h1>');
    expect(page).toContain('This address does not match a page on this site.');
    expect(page).toContain('Return to the sketchpad');
  });

  it('stamps the app and static 404 build identifiers from one source', () => {
    const app = readFileSync('src/main.ts', 'utf8');
    const page = readFileSync('public/404.html', 'utf8');
    const build = readFileSync('vite.config.ts', 'utf8');
    expect(app).toContain('const BUILD_ID = __BUILD_ID__');
    expect(page).toContain('<p class="build">__BUILD_ID__</p>');
    expect(build).toContain("name: 'stamp-static-build-id'");
    expect(build).toContain("notFoundPage.replaceAll('__BUILD_ID__', buildId)");
  });
});
