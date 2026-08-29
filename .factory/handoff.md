# Handoff — polish round 4

Completed `motion-graph-sketchpad-polish-4` on 2026-08-29.

## Result

The one-click demo is now product-first. At 390 × 844, `/?demo=1` shows the persistent sandbox banner, “Lantern drift,” four editable property inputs, and working preview controls without scrolling. The complete keyframe editor and exports remain directly below. The distinct night editing bay, cyan paths, amber controls, and chamfered surfaces are unchanged.

All earlier review and verification fixes remain in place. `.factory/polish-4.md` maps every cumulative finding to its change and evidence. The catalog description is verb-first and 87 characters.

## Deployment

- Implementation commit: `31d9d66b5319837c23406a55e18c78f0d3b20adf`
- Azure Static Web Apps deployment: `d7a1137e-3527-43fe-a865-6acda29dc90d`
- Live URL: <https://motion-graph-sketchpad.sociobot.in>
- Live JavaScript and CSS hashes match the local `dist/` artifacts.

## Verification

- Fresh clone `/tmp/mgs-polish4-clean-ynqEXq`: `npm ci`, all 16 claim commands independently, `npm test`, `npm run build`, `npm audit --audit-level=high`, and the one-test-per-claim audit passed.
- Final suite: 10 unit tests and 27 Chromium tests cover claims, demo isolation/reset, export/import, offline reload, privacy requests, 390 px geometry, every 44 px target, keyboard editing, route focus/history, legal links, metadata, malformed input, reduced motion, and Axe.
- Build: JS 34.08 kB / 10.91 kB gzip; CSS 22.28 kB / 5.72 kB gzip; generated files are in `dist/`.
- Local Verify URL: `/tmp/mgs-polish4-local-verify/verify.json`.
- Live Verify URL: `/tmp/mgs-polish4-live/verify/verify.json`; no console errors, correct title/lang/main/h1, no missing alt, and no unlabeled buttons.
- Live first-screen evidence: `/tmp/mgs-polish4-live/demo-after-one-click-390x844.png`; the last required control ends at y=703 in an 844 px viewport.
- Live Lighthouse mobile: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; FCP 1.2 s, LCP 1.3 s, CLS 0, TBT 70 ms.
- Live routes `/`, `/demo`, `/?demo=1`, `/privacy`, `/terms`, robots, sitemap, favicon, and social preview return 200. `/missing-frame` returns 404 with the designed shared skeleton and legal links.
- Live cache and security headers are correct: immutable versioned assets, non-cached service worker, CSP, HSTS, nosniff, referrer policy, and permissions policy.

## Run and verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npx playwright test
```

## Known gaps and next steps

None. The factory-provided browser coverage is Chromium; no product or acceptance finding remains open.
