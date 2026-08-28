# Handoff — polish round 2

Completed for `motion-graph-sketchpad-polish-2` on 2026-08-28.

## Result

Released repair commit `f7cab95e827b47d9498938bf9c64cb74f868d25c` to <https://motion-graph-sketchpad.sociobot.in> through deployment `0f5b4a2e-6282-4f3d-bf49-3d03aae5bb16`.

The release fixes every finding recorded in `.factory/review-1.md`, `.factory/review-2.md`, `.factory/polish-1.md`, `.factory/verification.md`, and `.factory/verification-2.md`: desktop first-screen placement, persistent isolated demo identity/reset/exit, all mobile interactive target sizes, direct HTTP-404 skeleton/metadata, per-route social metadata, plain copy/terminology, and complete claim inventory/test coverage.

## Exact verification evidence

- Clean clone: `/tmp/mgs-polish2-clean`, from repair commit `f7cab95`.
- `npm ci`: passed; `npm audit --audit-level=high`: 0 vulnerabilities.
- Every one of the 16 commands declared in `.factory/claims.json` passed individually from the clean clone. The combined claim browser file passed 15 tests; the quality browser file passed 8 tests; the unit suite passed 7 tests. `npm test` completed from the clean clone.
- `npm run build`: passed. `dist/` contains `index.html`, `404.html`, and `staticwebapp.config.json`; initial JS is 32.93 kB raw / 10.63 kB gzip and CSS is 20.21 kB raw / 5.33 kB gzip.
- Local browser evidence: `/tmp/mgs-polish2-evidence/home-1366x768.png`, `/tmp/mgs-polish2-evidence/demo-390x844.png`, and `/tmp/mgs-polish2-evidence/verify.json`. The verifier reported no console errors, title/lang, one h1/main, and no missing image alt text or unlabeled buttons.
- Live cold-browser evidence: `/tmp/mgs-polish2-live/home-1366x768.png`, `/tmp/mgs-polish2-live/demo-mobile-bottom.png`, and `/tmp/mgs-polish2-live/verify.json`. The live verifier found zero console errors. Live Axe found 0 violations. `/missing-frame` returned HTTP 404 and includes the wordmark, footer, Privacy, Terms, favicon, canonical, Open Graph/Twitter tags, one h1/main, and return link.
- Live 1366×768 check confirmed the primary action, helper, three facts, and art are fully visible. Live 390×844 check found no horizontal overflow, no visible interactive target below 44×44 px, and the sticky demo banner/actions still visible at page bottom.

## Run and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh motion-graph-sketchpad dist
```

## Known gaps

None. This is a local-first static web app; it has no accounts, analytics, payments, server-side product API, or runtime third-party requests.
