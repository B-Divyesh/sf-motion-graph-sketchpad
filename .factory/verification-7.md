# Independent verification 7 — FAIL

**Date:** 2026-08-29  
**Candidate:** `8514909526b8888b11b77c77f27e577a31b39b40`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>  
**Artifact:** static web / PWA  
**Verdict:** **FAIL**

The live deployment is healthy and byte-for-byte matches the candidate build. The product flow and all declared claims work. Release is still blocked because the repository's exact `npm test` gate timed out on the same test in two complete local runs, and the keyboard focus indicator disappears on the JSON import control.

No product code was changed during this verification.

## First-read gate

Fresh Chromium contexts were opened before any interaction at 1440×900 and 390×844.

- **What it does:** “Sketch property motion before coding.”
- **For whom:** web and game creators testing animation without scripts or a full timeline editor.
- **What to click first:** “Try it with sample data,” with the adjacent explanation “Loads a four-property motion sketch.”
- **One-click demo:** PASS. One click opened `/?demo=1` with the persistent no-save banner, “Lantern drift,” four named properties, preview controls, and the working editor.
- **Phone first screen:** PASS. At 390×844 the primary action ended at 603.2 px and the three facts at 742.0 px. Body width was exactly 390 px.

The mandatory first-screen gate passes.

## Claims gate

`.factory/claims.json` exists with 18 entries and exactly one matching tagged test per entry. Before installing dependencies, every exact command was invoked as requested and stopped before assertions with `vitest: not found`. After the clean-clone install (`npm ci`), every exact listed command was rerun and passed. These are the operative claim results:

| Claim | Result | Evidence |
| --- | --- | --- |
| `offline-reload` | PASS | `/tmp/mgs-verification-7-artifacts/claims/offline-reload.postinstall.log` |
| `local-only` | PASS | `/tmp/mgs-verification-7-artifacts/claims/local-only.postinstall.log` |
| `three-exports` | PASS | `/tmp/mgs-verification-7-artifacts/claims/three-exports.postinstall.log` |
| `demo-isolation` | PASS | `/tmp/mgs-verification-7-artifacts/claims/demo-isolation.postinstall.log` |
| `eight-properties` | PASS | `/tmp/mgs-verification-7-artifacts/claims/eight-properties.postinstall.log` |
| `deterministic-export` | PASS | `/tmp/mgs-verification-7-artifacts/claims/deterministic-export.postinstall.log` |
| `keyboard-keyframes` | PASS | `/tmp/mgs-verification-7-artifacts/claims/keyboard-keyframes.postinstall.log` |
| `free-no-account` | PASS | `/tmp/mgs-verification-7-artifacts/claims/free-no-account.postinstall.log` |
| `json-import` | PASS | `/tmp/mgs-verification-7-artifacts/claims/json-import.postinstall.log` |
| `drag-keyframes` | PASS | `/tmp/mgs-verification-7-artifacts/claims/drag-keyframes.postinstall.log` |
| `easing-preview` | PASS | `/tmp/mgs-verification-7-artifacts/claims/easing-preview.postinstall.log` |
| `demo-four-property-sample` | PASS | `/tmp/mgs-verification-7-artifacts/claims/demo-four-property-sample.postinstall.log` |
| `five-standard-easings` | PASS | `/tmp/mgs-verification-7-artifacts/claims/five-standard-easings.postinstall.log` |
| `no-account-demo-network` | PASS | `/tmp/mgs-verification-7-artifacts/claims/no-account-demo-network.postinstall.log` |
| `demo-reset` | PASS | `/tmp/mgs-verification-7-artifacts/claims/demo-reset.postinstall.log` |
| `waapi-registers-properties` | PASS | `/tmp/mgs-verification-7-artifacts/claims/waapi-registers-properties.postinstall.log` |
| `clear-sketch-data` | PASS | `/tmp/mgs-verification-7-artifacts/claims/clear-sketch-data.postinstall.log` |
| `add-keyframe` | PASS | `/tmp/mgs-verification-7-artifacts/claims/add-keyframe.postinstall.log` |

Landing, legal, editor, README, and catalog copy were cross-checked against the claims manifest. The earlier unlisted “Original generated imagery” visitor claim is gone. No remaining unlisted product claim was found.

## Clean checkout and build gates

| Check | Result | Exact evidence |
| --- | --- | --- |
| Candidate identity | PASS | detached `HEAD` at `8514909526b8888b11b77c77f27e577a31b39b40` |
| `npm ci` | PASS | 73 packages; zero vulnerabilities |
| `npm audit --audit-level=high` | PASS | zero vulnerabilities |
| `npm run build` | PASS | exact `tsc && vite build`; `dist/index.html` produced |
| Type check | PASS | `tsc` is the first part of the production build |
| Lint | N/A | no lint script or lint configuration exists |
| `npm test` run 1 | **FAIL** | 12 unit tests passed; 33/34 Chromium tests passed; route/Axe test timed out at 30.6 s |
| `npm test` run 2 | **FAIL** | same 12 unit and 33/34 result; same test timed out at 31.0 s |
| Failed test alone | PASS | completed in 6.9 s with one worker |
| Full live suite | PASS | 12 unit and 34 Chromium tests; route/Axe test finished at 29.2 s |

The exact release command is not reliable under its checked-in four-worker configuration. The repeated local failures are release-blocking even though independent Axe scans and the isolated test pass.

## Product exercise

Independent live checks covered:

- sample play, pause, restart, playhead movement, interpolation, and adding a 600 ms keyframe;
- keyframe keyboard movement, including a 250 ms Shift+Arrow step;
- all five easing values and the repaired ArrowLeft/ArrowRight/Home/End export-tab pattern;
- CSS, Web Animations, and JSON output, valid JSON download, deterministic filename, and property registration order;
- real numeric and colour properties, persistence across reload, eight-property limit, and Clear sketch recovery;
- 200 ms and 30,000 ms duration boundaries;
- malformed JSON, unsupported-version JSON, and preservation of the current sketch after failed import;
- demo reset, memory-only edits, exit to a separately seeded real sketch, and re-entry with a fresh sample;
- browser history, route metadata, direct HTTP 404, reduced motion, 200% text, desktop, and 390 px mobile.

The smallest useful product works end to end. The earlier export-tab defect is fixed in the live deployment.

## Accessibility and keyboard

- Independent Axe 4.10.2 scans on Home, Demo, Privacy, Terms, and the actual 404 at both 1440×900 and 390×844 found **zero violations**.
- One `<h1>`, one `<main>`, `lang=en`, labelled controls, image alternatives, skip link, route focus announcements, heading order, and 44 px visible mobile targets passed.
- Reduced motion moves the preview directly to its final frame and explains the change.
- The first Tab reveals a 3 px cyan skip-link outline. Keyframes and export tabs work with their documented Arrow-key controls.
- **Failure:** keyboard focus on Import JSON lands on the clipped `#import-file`, not the visible label. The focused input measured **1×44 px**. Its visible “Import JSON” label measured 78×61.625 px but had `outline: none` and no box shadow. Enter still opened the file chooser, but a keyboard user cannot see where focus is. Screenshot: `/tmp/mgs-verification-7-artifacts/import-focus.png`.

## Privacy, network, headers, and PWA

- A fresh independent live edit/export/import/persistence flow recorded 29 requests and 29 successful responses. Every request was same-origin. There were no analytics, third-party runtime scripts/fonts, failed requests, console errors, or page errors.
- Demo edits did not alter the seeded real `motion-graph-sketchpad:sketch:v1` key. Leaving demo restored the real sketch.
- Browser-observed home headers include CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, and camera/microphone/geolocation restrictions.
- HTML uses `public, must-revalidate, max-age=30`; hashed assets use `public, max-age=31536000, immutable`; `/sw.js` uses `no-cache, no-store, must-revalidate`. Conditional HTML and JavaScript requests returned 304.
- The active worker is `/sw.js`; `registration.update()` completed with no waiting or installing worker; the only cache was `motion-graph-sketchpad-v6`; `/demo` reloaded offline with its sample and banner.
- This static product made no API, unlock, payment, or sign-in calls. Rate-limit/429/`Retry-After` and Microsoft Entra tenant checks are not applicable.

## Deployment identity, links, and performance

- All 21 publicly served build files matched local `dist/` byte-for-byte by SHA-256. `staticwebapp.config.json` correctly returned 404 rather than being exposed.
- Internal routes and the Param Factory external link returned 200. The privacy contact is an explicit `mailto:`. The deliberate missing route returned the designed page with HTTP 404; its same-document skip fragment remains usable.
- Bundle sizes: JavaScript 34,424 B raw / 11,050 B gzip; CSS 22,313 B raw / 5,720 B gzip; WOFF2 fonts 52,972 B total; largest hero candidate 31,994 B. All stated budgets pass.
- Lighthouse 12.8.2 mobile: Performance **98**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 1.22 s, LCP 1.29 s, TBT 177.5 ms, CLS 0.031, transfer 86,277 B.
- `/opt/fleet/lib/verify-url.sh` passed `/demo`: HTTP 200, correct route title, `lang=en`, one h1/main, no missing alt, no unnamed button, and no console error.

## Defects by severity

### Blocker — V7-1: the exact `npm test` release gate fails reproducibly

`npm test` failed twice from the installed clean candidate. In both runs, `tests/e2e/quality.spec.ts:4` timed out after 30 seconds while scanning four routes with Axe under the configured four fully parallel workers. Results were 12/12 unit tests and 33/34 browser tests. The test passes alone, and equivalent independent scans found no accessibility violation, so the defect is suite timing/reliability. Definition of done still requires the exact command to pass.

Suggested repair: split the route scans into separate tests or give this multi-route Axe test a justified longer timeout, then demonstrate repeated passing `npm test` runs with the default configuration.

### High — V7-2: Import JSON has no visible keyboard focus

At live `/demo`, Tab focuses the screen-reader-only file input at `src/main.ts:255`. The global outline is clipped by `.sr-only` at `src/styles.css:35`, while the visible label receives no focus style. Keyboard activation works, but the current focus position is not perceivable, violating the required visible-focus baseline.

Suggested repair: make the visible import control itself keyboard-focusable and trigger the file input, or mirror `#import-file:focus-visible` onto a clear outline around its visible label. Add a keyboard regression test that checks the visible label's focus treatment.

### Low — V7-3: entering zero duration silently restores the old value

Entering `0` and leaving the field restored 800 ms without an error or explanation because the handler treats numeric zero as falsy. Negative input clamps to 200 ms and values above the maximum clamp to 30,000 ms. The recovery is safe but does not tell the user what happened or how to correct it.

## Evidence

Detailed command logs, claim outputs, parity hashes, request/header records, screenshots, keyboard order, Axe results, PWA evidence, and Lighthouse JSON are in `/tmp/mgs-verification-7-artifacts/` in this worker environment.
