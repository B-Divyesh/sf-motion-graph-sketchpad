# Independent verification 2 — PASS

**Candidate:** `a2dcb2d57e3c048d19a311bebc673ecc0d65fd18`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>  
**Verified:** 2026-08-28 from a clean checkout

## Decision

**PASS — release candidate accepted.** The previous release-blocking mobile hit-target, caching, malformed-import, and HTTP-404 findings are fixed in this candidate and in the live deployment. No release-blocking defects were found.

## First-read and demo gate

A fresh browser context opened the live home page cold. The first screen plainly states:

- **Does:** “Sketch property motion before coding.”
- **For whom:** “For web and game creators testing animation without scripts or a full timeline editor.”
- **First action:** “Try it with sample data”; its adjacent explanation says it loads a four-property motion sketch.

The one-click action opened `/demo`, loaded the “Lantern drift” four-property sketch, and showed the persistent “Demo — sample data, nothing is saved” banner with **Reset demo** and **Start for real**. This passes the plain-words and isolated-demo gate.

## Required claim checks

After `npm ci` (0 vulnerabilities), each command declared in `.factory/claims.json` was run against the local production demo entry point. Each passed; every claim tag occurs exactly once in the test source.

| Claim ID | Command | Result |
| --- | --- | --- |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `local-only` | `npm test -- --grep @claim:local-only` | PASS |
| `three-exports` | `npm test -- --grep @claim:three-exports` | PASS |
| `demo-isolation` | `npm test -- --grep @claim:demo-isolation` | PASS |
| `eight-properties` | `npm test -- --grep @claim:eight-properties` | PASS |
| `deterministic-export` | `npm test -- --grep @claim:deterministic-export` | PASS |
| `keyboard-keyframes` | `npm test -- --grep @claim:keyboard-keyframes` | PASS |
| `free-no-account` | `npm test -- --grep @claim:free-no-account` | PASS |
| `json-import` | `npm test -- --grep @claim:json-import` | PASS |
| `drag-keyframes` | `npm test -- --grep @claim:drag-keyframes` | PASS |
| `easing-preview` | `npm test -- --grep @claim:easing-preview` | PASS |

One attempted repeat of the deterministic-export command encountered a verifier-created local preview already occupying port 4173. After terminating that known preview process, the exact command passed (1/1); this was harness contamination, not a candidate failure.

## Build, quality, and accessibility

- `npm test`: PASS — 6 Vitest tests and 16 Playwright Chromium tests; `test-results/.last-run.json` reports `passed`.
- `npm run build`: PASS — `tsc && vite build` produced `dist/`.
- `npm audit --audit-level=high`: PASS — 0 vulnerabilities.
- Built initial JavaScript is 32.24 kB (10.59 kB gzip); CSS is 19.61 kB (5.19 kB gzip). Both meet the static-product budgets. The mobile AVIF hero is 8.75 kB.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/demo`: PASS after creating its required output directory. It found a title, `lang="en"`, one `h1`, one `main`, no missing image alt text, no unlabeled buttons, and no console errors.
- The repository’s Playwright `@axe-core/playwright` check and a fresh live `AxeBuilder` scan found **0 serious/critical** violations. The standalone `@axe-core/cli` could not locate a system Chrome binary in this container; the allowed Playwright Axe integration was used instead.
- Live keyboard check: the first Tab reaches the visible 3 px cyan skip-link focus outline (232 × 48.8 px); ArrowRight moves a focused keyframe by 50 ms and Shift+ArrowRight by 250 ms.
- At a 390 px viewport, the page had no horizontal overflow (`scrollWidth=390`, `clientWidth=390`); all 21 keyframes, demo actions, property-name inputs, and unit selects measured at least 44 px in both dimensions. Desktop and mobile full-page visual review found the product-specific night-editing-bay design intact.
- With reduced motion enabled, Play immediately set the sample preview to 2400 ms and announced the reduced-motion behavior.
- Lighthouse 12.8.2 local mobile report: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.5 s, CLS 0.026, TBT 120 ms.

## Product and recovery checks

- Normal demo: loaded all four sample properties, edited and previewed the motion, and exposed CSS, Web Animations, and JSON export.
- Boundaries: duration input clamps to 200 ms and 30,000 ms; the real-sketch property limit reaches and disables controls at 8/8.
- Invalid imports recover clearly: syntax-invalid JSON reports “This file is not valid JSON. Export the sketch again, then choose that JSON file.” An incomplete property reports “Property 1 needs a name…”; no raw `SyntaxError` or implementation `TypeError` is shown.
- Client navigation to Privacy moves focus to the new `h1` and updates the polite route announcement. `/`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, and the footer’s external factory link returned HTTP 200. `/missing-frame` returned HTTP 404 and renders the styled not-found page.
- The live service worker controlled the page after a reload. A subsequent offline reload of `/demo` retained the sample and demo banner. Its versioned cache is `motion-graph-sketchpad-v2` and it removes obsolete caches on activation.

## Privacy, delivery, and live identity

- The complete live demo edit/export flow made requests only to `https://motion-graph-sketchpad.sociobot.in`; source review found no analytics, remote font/script, account, payment, AI, or product API integration. Real data uses the documented localStorage key; demo mode does not write it. No sign-in or server-side product endpoint exists, so Entra and API rate-limit checks are not applicable.
- Live responses provide HTTPS/HSTS, `X-Content-Type-Options: nosniff`, Referrer-Policy, Permissions-Policy, and a self-restricted CSP. `/assets/index-CpjtW2r3.js` and `/assets/index-CuNErJ6C.css` return `Cache-Control: public, max-age=31536000, immutable`; `/sw.js` returns `no-cache, no-store, must-revalidate`.
- Local and live SHA-256 values match exactly:
  - JavaScript `index-CpjtW2r3.js`: `37ecf551b0c4d0222078ce71ff9e1f6ebe579dd8e6f85192f4b8ff710816a7d3`
  - CSS `index-CuNErJ6C.css`: `4456f40871f06b99d4f63918bc33278a1d7aeab01801b5cac844395c1aacfe78`

This fresh evidence does not reproduce the builder’s earlier deployment-only concern.

## Defects by severity

None found.

## Scope notes

This is a static PWA/web product, not a library, CLI, or backend. Browser verification used Chromium; Safari and Firefox are not installed in this worker.
