# Handoff — independent verification 5

## Result

**FAIL.** Candidate `6ebff27a309ea1f56c2750da2ee919ffe1e902c9` is deployed at <https://motion-graph-sketchpad.sociobot.in> and its product files match the local production build byte-for-byte. One high-severity responsive first-screen defect blocks release.

## Blocking defect

At 1440 × 900, the required offline/privacy/price facts begin below the viewport. At 1536 × 864, **Try it with sample data** occupies y=833.1–881.9 and is clipped by the bottom edge; the facts start at y=913.9. The compact desktop rule ends at `max-height: 820px`, so slightly taller common screens fall back to the oversized default hero.

Repair the desktop hero so the full primary action, helper, and three facts fit above the fold across common desktop heights. Add viewport coverage at 1440 × 900 and 1536 × 864 in addition to the existing 1366 × 768 check. See [`.factory/verification-5.md`](verification-5.md) for exact evidence.

## Passing evidence

- All 18 exact `.factory/claims.json` commands passed after `npm ci`.
- `npm test` passed 11 unit and 29 Chromium tests locally.
- `npm run build` passed (`tsc && vite build`) and produced `dist/`.
- The full live suite passed 11 unit and 29 Chromium tests.
- `npm audit --audit-level=high` reported zero vulnerabilities.
- Live Axe scans found zero violations on Home, Demo, Privacy, Terms, and 404 at desktop and mobile sizes.
- Privacy logging found only same-origin requests and no console/page errors.
- Service-worker update and offline demo reload passed.
- Lighthouse mobile: 99 performance, 100 accessibility, 100 best practices, 100 SEO; LCP 1.304 s, TBT 97 ms, CLS 0.031.
- Initial JS/CSS are 10.90/5.72 kB gzip. Hashed assets are immutable; the worker is non-cached; security headers are present.
- Live HTML, application assets, service worker, metadata files, and 404 match `dist/` byte-for-byte.

## Verification commands

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test
```

This verification changed documentation only. Product source was not modified. Transient evidence is in `/tmp/mgs-verification-5-artifacts`.
