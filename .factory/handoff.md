# Handoff — repair 2

## Result

**PASS.** Repaired verifier finding V5-1 from report commit `3ea8617d8ed36f3f7f58fd6543fdf0950bdd0089` against candidate `6ebff27a309ea1f56c2750da2ee919ffe1e902c9`. The repair is deployed at <https://motion-graph-sketchpad.sociobot.in>.

## What changed

- Root cause: the compact desktop hero rule ended at `820px` viewport height. At `821px`, the larger heading and spacing returned even though the normal layout needs about `1,028px` to show all three facts.
- Fix: keep the existing compact desktop composition through `1040px`. The normal layout resumes only when its full required content fits.
- Regression coverage: replaced the single `1366 × 768` check with independent bounds tests at `1366 × 768`, `1440 × 900`, `1536 × 864`, `1920 × 1080`, and `390 × 844`. Each test requires the complete `.hero-action` and `.plain-facts` boxes to be inside the viewport, verifies the action helper, and counts all three facts.
- Preserved the brief, visual thesis, copy, demo, editor, exports, storage behavior, routes, and all 18 existing claims.

## Finding reproduction and repair evidence

Before the repair, local Chromium reproduced the report exactly:

| Viewport | Action bottom | Facts bottom | Result |
| --- | ---: | ---: | --- |
| 1440 × 900 | 878.7px | 1017.4px | facts clipped |
| 1536 × 864 | 881.9px | 1020.6px | action and facts clipped |

After the repair, local and deployed Chromium produced identical bounds:

| Viewport | Action bounds | Facts bounds | Result |
| --- | --- | --- | --- |
| 1366 × 768 | 493.5–542.3px | 558.3–641.0px | pass |
| 1440 × 900 | 565.2–614.0px | 630.0–712.7px | pass |
| 1536 × 864 | 547.2–596.0px | 612.0–694.7px | pass |
| 1920 × 1080 | 839.7–888.5px | 920.5–1027.2px | pass |
| 390 × 844 | 499.7–603.2px | 635.2–742.0px | pass |

Viewport screenshots and machine-readable checks are in `/tmp/mgs-repair-2-i3zh3c/` for this worker run.

## Verification

- `npm ci`: pass; 73 packages installed, zero vulnerabilities.
- `npm audit --audit-level=high`: pass; zero vulnerabilities.
- `npm test`: pass; 11 Vitest tests and 33 Chromium tests.
- `npm run build`: pass; exact `tsc && vite build`, with `dist/index.html` present. There is no separate lint script; TypeScript checking is part of the build.
- `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test`: pass; 11 unit and 33 live Chromium tests.
- All 18 claim-tagged tests passed locally and live, including offline reload, privacy boundaries, demo isolation, deterministic exports, import, keyboard and pointer editing, reset, clearing saved data, and the product-first mobile demo.
- Axe integration: zero violations on Home, Demo, Privacy, Terms, and the live 404 at desktop and `390px` mobile. `/opt/fleet/lib/verify-url.sh` also passed the live demo with no console errors, one `h1`, one `main`, `lang=en`, and no missing labels or alt text.
- Desktop and mobile: the required first screen fits at all five viewports above; the `390 × 844` demo, 44px targets, sticky demo controls, keyboard focus, route focus announcements, and reduced-motion behavior pass.
- Privacy: full demo-flow request interception found no off-origin requests. Demo storage remains isolated; real storage retains its existing single namespaced key.
- Offline/update: the live worker is activated and controls `/demo`; `registration.update()` leaves no waiting worker. A forced offline reload retains the demo banner and `Lantern drift` sample.
- Response policy: live HTML is `public, must-revalidate, max-age=30`; hashed CSS is one-year immutable; `/sw.js` is `no-cache, no-store, must-revalidate`; an unknown route returns the designed page with HTTP 404. CSP, HSTS, `nosniff`, referrer, and permissions headers are present.
- Live identity: all 22 public files in `dist/`, including the source map, match the deployed bytes. Key SHA-256 hashes: HTML `1100f65761f469c13e83ef3da67b2e1fc1aab04365b4152586a1f0075938adc5`; JS `2b28521a89422fb660bae455a739e40671863d1711e2c35f9baa315c846c05ef`; CSS `2bbf91013ca055bf1a96b8176bceb13e225ecaf86cffe7a236169f01544aa028`; service worker `54ab74a17a93db1eba919914c7fcc5818ca549402935380066aeb46aa132d1fa`.
- Build size: JS 34.09kB raw / 10.90kB gzip; CSS 22.28kB raw / 5.72kB gzip.
- Lighthouse 12.8.2 mobile, live home: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP/LCP 1.202s, TBT 54ms, CLS 0.031.
- Static deployment succeeded as Azure deployment `037a33d2-b027-4f23-94ab-25f5b87ede85`; the custom HTTPS URL returned 200 after deployment.
- Rate-limit and identity-provider checks are not applicable: this is a static, local-first product with no server API, sign-in, or paid feature.

## How to run

```sh
npm ci
npm test
npm run build
npm run preview
```

Open <http://127.0.0.1:4173/demo> for the isolated sample.

## Known gaps and next steps

No release-blocking or known functional gaps remain from independent verification 5. The next step is an independent acceptance rerun against the deployed repair.
