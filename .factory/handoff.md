# Handoff — polish round 1

Completed for work order `motion-graph-sketchpad-polish-1` on 2026-08-28.

## Result

All findings from the adversarial review and earlier verification records are resolved or revalidated on the deployed site. The product repair is commit `23ae3666a45205012bf3aefb586ab5fc555e4b3f` (`fix: complete review copy and claim coverage`), pushed to `main` and deployed as Azure Static Web Apps deployment `74bb2450-49c1-43bd-aed9-cb70596b4300`.

The live site is <https://motion-graph-sketchpad.sociobot.in>. The isolated one-click demo is <https://motion-graph-sketchpad.sociobot.in/?demo=1>; `/demo` remains supported.

## What changed

- Replaced ambiguous headings, hero caption, and action labels with literal result-naming copy.
- Made the first-screen demo action use `?demo=1`; it opens the memory-only sample with the persistent banner, reset, and real-sketch exit.
- Added the required claim inventory and observable tests for the four-property sample, five timing choices, and no-account/no-off-origin-demo-network statement.
- Rewrote README and privacy copy to use only testable privacy claims.
- Updated the catalog description, demo documentation, and copy audit.

The complete finding-to-evidence map is in [`.factory/polish-1.md`](polish-1.md).

## Exact verification evidence

Final clean checkout: `/tmp/mgs-final-clean-5RqUBG` cloned from `a19d27f`.

```sh
npm ci                         # pass; 0 vulnerabilities
# every test command in .factory/claims.json, individually
npm test                       # pass: 6 Vitest + 19 Chromium tests
npm run build                  # pass; dist/index.html produced
npm audit --audit-level=high   # pass; 0 vulnerabilities
```

All 14 declared claim commands passed independently. A tag audit found exactly one matching `@claim:<id>` test per claim. Individual logs are `/tmp/mgs-final-*.log` in this worker.

The built initial bundle is `dist/assets/index-DQABXrZC.js`: 32.31 kB raw / 10.56 kB gzip. CSS is 19.61 kB raw / 5.19 kB gzip. Both are within the static-product budgets.

`/opt/fleet/lib/verify-url.sh 'http://127.0.0.1:4173/?demo=1' /tmp/mgs-evidence/local` passed with title, `lang=en`, one `h1`, one `main`, zero missing image alt attributes, zero unlabeled buttons, and zero console errors. Local screenshots are `/tmp/mgs-evidence/local/screenshot-desktop.png` and `/tmp/mgs-evidence/local/screenshot-mobile.png`.

Live cold-browser review passed with no off-origin requests, 0 Axe violations, 21 tested mobile controls at least 44×44 px, no horizontal overflow, and screenshots at `/tmp/mgs-evidence/live/demo-desktop.png` and `/tmp/mgs-evidence/live/demo-mobile.png`. A second live check confirmed plain malformed-import recovery, focus and polite announcement after client routing, service-worker control, and offline demo reload.

Live response checks: `/`, `/?demo=1`, `/demo`, `/privacy`, `/terms`, robots, sitemap, favicon, and Apple touch icon return 200; `/missing-frame` returns 404. Hashed JS returns `Cache-Control: public, max-age=31536000, immutable`; `sw.js` returns `no-cache, no-store, must-revalidate`.

## Run and deploy

```sh
npm ci
npm run dev
npm test
npm run build
```

Deploy `dist/` as the static app output. The supplied `public/staticwebapp.config.json` is copied to `dist/` by Vite and provides the supported-route rewrites, designed HTTP 404, headers, and asset caching.

## Known gaps / next steps

None. Chromium is the browser available in this worker; Safari and Firefox were not available for manual browser testing.
