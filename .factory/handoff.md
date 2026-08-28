# Handoff — Motion Graph Sketchpad repair

Completed for work order `motion-graph-sketchpad-repair-1` on 2026-08-28.

## Release result

Repair commit: `e54d8ce5d29f51d1e8af32f005930abb09fd9b9d`.

All release-blocking findings from independent verification commit `9cfa6ba57a56a30fc22a128824ff3cf60a9ae64e` are repaired and deployed at <https://motion-graph-sketchpad.sociobot.in>.

- Mobile touch controls now have real 44 × 44 px hit areas. Keyframes retain their small amber-diamond appearance inside a 44 px draggable button; demo actions, property-name inputs, and unit selects are also at least 44 px high.
- `/assets/*` now sends `Cache-Control: public, max-age=31536000, immutable`; `/sw.js` sends `no-cache, no-store, must-revalidate`. The service-worker cache name is `motion-graph-sketchpad-v2`, so clients update to this shell.
- JSON import separately handles invalid JSON and validates every sketch/property/keyframe field before rendering. Errors name the problem and tell the person to export again and choose that file; malformed imports leave the existing sketch unchanged.
- Supported client routes (`/demo`, `/privacy`, `/terms`) explicitly rewrite to the app shell. There is no catch-all navigation fallback, so unknown direct paths return HTTP 404 and render the styled `404.html` page.

The researched brief, static-web deployment class, existing demo isolation, exports, keyboard editing, offline behavior, local-only storage, and visual system were preserved.

## Regression coverage

- `tests/e2e/quality.spec.ts`: a 390 px test measures every keyframe, demo action, property-name input, and unit select; all are at least 44 px in both dimensions.
- `tests/e2e/quality.spec.ts`: invalid syntax and incomplete version-1 JSON receive plain recovery guidance, never raw parser/TypeError text, and preserve the sample sketch.
- `tests/unit/model.test.ts`: deep structural validation rejects incomplete properties and keyframes with recovery guidance.
- `tests/unit/static-config.test.ts`: locks immutable assets, updateable service-worker caching, explicit SPA routes, and the preserved 404 response override.

## Verification

From a clean `npm ci` install:

```sh
npm test
npm run build
npm audit --audit-level=high
VERIFY_NODE_MODULES=/work/repo/node_modules /opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/demo .factory/evidence/repair/verify-url
```

Results:

- `npm ci`: passed; 0 vulnerabilities.
- `npm test`: passed — 6 Vitest tests and 16 Playwright Chromium tests, including all 11 declared claims, desktop/mobile, keyboard, offline reload, and axe serious/critical scan.
- `npm run build`: passed; `dist/index.html` exists. Final initial JS is 10.59 kB gzip and CSS is 5.19 kB gzip.
- `npm audit --audit-level=high`: passed; 0 vulnerabilities.
- URL verifier: passed at `/demo`; title, `lang="en"`, one h1, one main landmark, complete image alt text, labeled buttons, and no demo-load console errors.
- Local Lighthouse 12.8.2 mobile run: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.5 s, CLS 0.026, TBT 90 ms.
- Visual review: full-page 1440 px desktop and 390 px mobile captures are in `.factory/evidence/repair/`; the page does not horizontally overflow at 390 px.

Live checks after deployment:

- `/demo` returns 200; the deployed JavaScript is byte-identical to `dist/assets/index-CpjtW2r3.js` (SHA-256 `37ecf551b0c4d0222078ce71ff9e1f6ebe579dd8e6f85192f4b8ff710816a7d3`).
- `/assets/index-CpjtW2r3.js` and CSS return the immutable policy, `/sw.js` returns no-store, and `/missing-frame` returns HTTP 404.
- A fresh 390 px live browser check measured 21 targeted controls with a smallest dimension of 44 px, moved a focused keyframe from 0 to 50 ms by keyboard, showed plain syntax and structural JSON recovery messages, and confirmed service-worker control after reload. Demo load produced no console errors.
- Live identity and privacy checks: HTTPS/HSTS, self-only CSP, no remote requests in the demo flow, and the expected Motion Graph Sketchpad title/build identifier are present.

## Run and deploy

```sh
npm run dev
# demo: http://localhost:5173/demo
npm test
npm run build
```

Deploy the generated `dist/` folder to the existing `sf-motion-graph-sketchpad` Azure Static Web App. `public/staticwebapp.config.json` must ship with that folder; it contains the cache and 404 policy.

## Known gaps

- Automated browser coverage uses Chromium. Safari and Firefox were not available in this worker.
- CSS and Web Animations exports animate registered custom properties; consumers connect them to their own transform, opacity, colour, or shader code.
- This v1 intentionally does not render video, rig characters, share projects, or sync across devices.
