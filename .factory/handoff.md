# Handoff — Motion Graph Sketchpad

## Independent verification verdict (2026-08-28): **FAIL**

Candidate `8f50cbd827dc7c0b8609aa00e16536899906aa64` was independently tested against the live site <https://motion-graph-sketchpad.sociobot.in>. All 11 required claim tests, the full 3-unit/14-browser test suite, build, live offline reload, axe scan, normal editing/export flows, and live-build byte comparison passed. The candidate is nevertheless **not releasable**:

- **High:** central draggable keyframes are 31–35px at the required 390px mobile viewport; Reset demo/Start for real are 40px high. The product contract requires 44 × 44px touch targets.
- **Medium:** deployed hashed JS, CSS, images, and service worker use only `Cache-Control: public, must-revalidate, max-age=30`, not long-lived immutable caching.
- **Low:** malformed JSON receives raw parser/TypeError feedback instead of a plain validation error; direct unknown routes return HTTP 200 while rendering the client 404.

See [`.factory/verification.md`](verification.md) for commands, measurements, full evidence, and remediation. Product source was not modified by verification.

Completed for work order `motion-graph-sketchpad-build-1` on 2026-08-28.

## What was built

- A Vite and vanilla TypeScript static app with no runtime service dependency.
- A real motion workbench for one to eight numeric or colour properties.
- Keyframe creation, deletion, pointer dragging, arrow-key movement, easing selection, duration changes, and live playback.
- Unitless, pixel, percentage, and degree values for numeric properties.
- Deterministic CSS custom-property, Web Animations, and versioned JSON exports.
- JSON import with plain error messages for invalid files.
- Local browser persistence for real sketches and a memory-only `/demo` sandbox.
- A seeded “Lantern drift” demo with reset and exit controls.
- Offline reload support through a versioned service worker cache.
- Responsive landing, editor, privacy, terms, and styled 404 routes.
- Route titles, canonical metadata, sitemap, robots file, manifest, security headers, and local fonts.
- Original cinematic environmental hero art in responsive AVIF and WebP formats. Provenance and the prompt are in `.factory/design.md` and `assets/src/`.

## How to run

```sh
npm install
npm run dev
```

Use `http://localhost:5173/demo` for the isolated sample.

## How it was verified

```sh
npm test
npm run build
npm audit
VERIFY_NODE_MODULES=/work/repo/node_modules /opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/demo .factory/evidence/final-verify
```

Results:

- 3 Vitest model tests passed.
- 14 Playwright Chromium tests passed.
- All 11 entries in `.factory/claims.json` have one tagged browser test.
- Playwright axe found no serious or critical violations.
- URL verifier found one title, one h1, `lang="en"`, one main landmark, complete image alt text, labeled buttons, and no console errors.
- `npm audit`: 0 vulnerabilities.
- `npm run build`: passed; `dist/index.html` exists.
- Initial production bundle: JavaScript 10.00 KB gzip; CSS 5.17 KB gzip.
- Responsive hero candidates: 9–32 KB each.

Lighthouse 12.8.2 ran against the local production build with mobile defaults:

| Category | Score |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

Measured FCP was 1.2 s, LCP was 1.5 s, CLS was 0.031, and total blocking time was 0 ms. Lab Lighthouse does not measure INP; the playback interaction has automated browser coverage.

The interface was also reviewed from full-page screenshots at 1440 px and 390 px. The mobile test asserts that the document does not overflow its viewport.

## Known gaps

- Automated browser coverage uses Chromium. Safari and Firefox were not available for this handoff.
- CSS and Web Animations exports animate registered custom properties. Consumers still connect those variables to their own transform, opacity, colour, or shader code.
- This v1 does not render video, rig characters, share projects, or sync across devices by design.

## Next steps

- Watch whether exported snippets need presets for common CSS transforms.
- Consider project sharing only after local return use is established.
