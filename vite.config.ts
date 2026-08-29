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
    name: 'stamp-static-release-id',
    closeBundle() {
      for (const file of ['404.html', 'sw.js']) {
        const outputPath = resolve(import.meta.dirname, 'dist', file);
        const template = readFileSync(outputPath, 'utf8');
        writeFileSync(outputPath, template.replaceAll('__BUILD_ID__', buildId));
      }
    },
  }],
  build: {
    target: 'es2022',
    outDir: 'dist',
    sourcemap: true,
  },
});
