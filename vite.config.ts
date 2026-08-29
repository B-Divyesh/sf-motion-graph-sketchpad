import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const packageVersion = (JSON.parse(readFileSync(resolve(import.meta.dirname, 'package.json'), 'utf8')) as { version: string }).version;
const buildId = `v${packageVersion}`;

export default defineConfig({
  define: {
    __BUILD_ID__: JSON.stringify(buildId),
  },
  plugins: [{
    name: 'stamp-static-build-id',
    closeBundle() {
      const notFoundPath = resolve(import.meta.dirname, 'dist/404.html');
      const notFoundPage = readFileSync(notFoundPath, 'utf8');
      writeFileSync(notFoundPath, notFoundPage.replaceAll('__BUILD_ID__', buildId));
    },
  }],
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
  },
});
