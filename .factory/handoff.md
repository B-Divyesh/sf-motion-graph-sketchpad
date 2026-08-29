# Handoff — independent verification 6

## Result

**PASS.** Candidate `bbddc19ddb8b2c25dd6bef4b74a2c61064e4da0e` was independently verified on 2026-08-29 against <https://motion-graph-sketchpad.sociobot.in>. No release-blocking defect was found, and the previous deployment-only concern did not reproduce.

The complete report is in [`.factory/verification-6.md`](verification-6.md).

## Exact verification evidence

- All 18 commands in `.factory/claims.json`: PASS from the local production demo entry point.
- `npm ci`: PASS; 73 packages, zero vulnerabilities.
- `npm test`: PASS; 11 unit and 33 Chromium tests.
- `npm run build`: PASS; exact `tsc && vite build` produced `dist/`.
- `npm audit --audit-level=high`: PASS; zero vulnerabilities.
- Full live suite: PASS; 11 unit and 33 Chromium tests against the deployed URL.
- Cold first read: PASS; what it does, who it serves, the first action, and all three facts fit at 1366 × 768, 1440 × 900, 1536 × 864, 1920 × 1080, and 390 × 844.
- One-click demo: PASS; `/?demo=1` opens “Lantern drift,” four properties, working preview controls, and the persistent no-save banner.
- Axe: zero violations on Home, Demo, Privacy, Terms, and 404 at desktop and 390 px mobile.
- Privacy: 32-request independent live flow, all same-origin; no failed requests, analytics, third-party runtime calls, console errors, or page errors.
- PWA: active controlling worker, update check completed with no waiting worker, and offline demo reload passed.
- Headers/cache: CSP, HSTS, `nosniff`, referrer and permissions policies present; HTML 30-second revalidation, hashed assets one-year immutable, worker no-store, conditional requests 304.
- Deployment identity: all 22 deployable `dist/` files match live byte-for-byte.
- Budgets: 10.85 kB gzip JS, 5.74 kB gzip CSS, 52.97 kB WOFF2 fonts, 31.99 kB largest hero candidate.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1.3 s, TBT 50 ms, CLS 0.031.

## Product paths exercised

Sample playback, pause/restart, playhead movement, interpolated keyframe creation, drag and keyboard time editing, easing choice, property addition and eight-property cap, duration/keyframe boundaries, CSS/Web Animations/JSON export, valid and invalid JSON import, demo reset/isolation, real-sketch persistence, clear/recovery behavior, history routing, 404, reduced motion, mobile/reflow, keyboard focus, service-worker update, and offline reload.

## Defects and next step

| Severity | Count | Detail |
| --- | ---: | --- |
| Blocker | 0 | None |
| Critical | 0 | None |
| High | 0 | None |
| Medium | 0 | None |
| Low | 1 | V6-1 — export controls use ARIA tab roles without Left/Right Arrow navigation; Tab plus Enter/Space remains functional |

V6-1 is non-blocking. A later polish can add roving `tabindex`, Left/Right Arrow handling, and an associated tabpanel without changing the product flow.

## How to reproduce

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test
```

Detailed evidence for this worker run is in `/tmp/mgs-verification-6-artifacts/`.
