# Independent verification 8 — PASS

**Date:** 2026-08-29  
**Candidate:** `a43f15c8ceead4b805747201a848930e40d774a6`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>  
**Artifact:** static web / PWA  
**Verdict:** **PASS**

The deployed artifact is byte-for-byte identical to this candidate's public production build. The required claims, clean checkout gates, real demo flow, local-first privacy model, PWA/offline behavior, accessibility checks, performance budgets, and deployment policy all passed.

## First-read and demo gate

A fresh cold Chromium visit to the live home page at 1440×900 answered the required questions in plain words:

- **What it does:** “Sketch property motion before coding.”
- **For whom:** “For web and game creators testing animation without scripts or a full timeline editor.”
- **What to do first:** the visible **Try it with sample data** action says it “Loads a four-property motion sketch.”

One click opened `/?demo=1`. At 390×844, before scrolling, the persistent “Demo — sample data, nothing is saved” banner, **Lantern drift**, all four named property inputs, and preview controls were visible and usable. The demo uses memory only; Reset restores the original sample and Open my real sketch returns to separate real storage.

## Required claims gate

`.factory/claims.json` exists and contains 18 claim entries. From the clean candidate after `npm ci`, every exact command in its `test` field ran through the local production demo entry point and passed. The final `@claim:add-keyframe` command was rerun explicitly and passed. The complete local `npm test` then passed all 12 unit and 39 Chromium tests; `test-results/.last-run.json` reports `"status": "passed"`. The full 39-test live suite also passed with `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in`.

| Claim IDs verified | Result |
| --- | --- |
| `offline-reload`, `local-only`, `three-exports`, `demo-isolation`, `eight-properties`, `deterministic-export`, `keyboard-keyframes` | PASS |
| `free-no-account`, `json-import`, `drag-keyframes`, `easing-preview`, `demo-four-property-sample`, `five-standard-easings` | PASS |
| `no-account-demo-network`, `demo-reset`, `waapi-registers-properties`, `clear-sketch-data`, `add-keyframe` | PASS |

Landing, editor, legal-page, README, and demo documentation claims were cross-checked against the manifest. No unlisted visitor-facing product claim was found.

## Clean checkout and build gates

| Check | Result | Evidence |
| --- | --- | --- |
| Candidate identity | PASS | `git rev-parse HEAD` = `a43f15c8ceead4b805747201a848930e40d774a6` |
| Install | PASS | `npm ci`: 73 packages, 0 vulnerabilities |
| Dependency audit | PASS | `npm audit --audit-level=high`: 0 vulnerabilities |
| Unit/integration/browser suite | PASS | `npm test`: 12 unit + 39 Chromium tests; local and live runs passed |
| Type check / production build | PASS | exact `npm run build` (`tsc && vite build`) created `dist/` |
| Lint | N/A | no lint script or lint configuration is present |
| Static budget | PASS | JS 34,579 B raw / 11.13 KB gzip; CSS 22,395 B raw / 5.75 KB gzip; WOFF2 fonts 52,972 B total; largest hero source 31,994 B |
| Live Lighthouse mobile | PASS | Performance 98, Accessibility 100, Best Practices 100, SEO 100; FCP 1.4 s, LCP 1.5 s, TBT 140 ms, CLS 0, transfer 76 KiB |

Lighthouse emitted a final Chromium-tab crash message after it had written the complete JSON report; the recorded category scores and audits above are from that report. This did not affect its completed measurements or any product browser test.

## Independent product, accessibility, and recovery exercise

- The sample exposes four number/colour properties, playback/restart, playhead editing, draggable keyframes, five easings, stable CSS/Web Animations/JSON exports, and `CSS.registerProperty` before Web Animations output.
- The full live test suite independently exercised adding an interpolated 600 ms keyframe, arrow/Shift+Arrow keyframe movement, export tab arrows/Home/End, valid import/download, real-sketch persistence, the eight-property boundary, clear-data confirmation/reload, malformed and invalid-version JSON recovery, 200/30,000 ms duration boundaries, reset/exit demo isolation, and browser-history route restoration.
- The repaired zero-duration path clamps to 200 ms and announces: “Duration must be between 200 and 30,000 ms. It was set to 200 ms.” Malformed JSON reports a plain recovery instruction without parser internals.
- Fresh keyboard traversal showed the designed `rgb(114, 225, 231) solid 3px` focus outline on the skip link, banner controls, navigation, fields, preview controls, keyframes, and the visible Import JSON label. The keyboard-only export tab pattern passed.
- Axe 4.10.2 scans found **zero violations** on Home, Demo, Privacy, Terms, and the designed 404 at desktop. A fresh 390×844 Demo scan also found zero violations; body and viewport widths were both 390 px. Each normal route had exactly one `h1` and one `main`, correct `lang`, labelled controls, image text alternative, and no console/page errors.
- `prefers-reduced-motion: reduce` moves preview playback directly to the final frame with an explanatory status, rather than animating travel.

## Privacy, PWA, headers, routes, and deployment identity

- A fresh mobile live demo recorded no off-origin requests and no normal-route console/page errors. The full live claim suite likewise exercised edit/export/import without third-party or account calls. No sign-in, billing, API, or AI endpoint exists, so rate-limit/429 and Microsoft Entra checks are not applicable.
- The service worker was active and controlling `/demo`, scope was the product origin, cache was `motion-graph-sketchpad-v7`, and `registration.update()` had no waiting/installing worker. After the online load, `/demo` reloaded offline with the demo banner and sample heading.
- Browser/live response policy: HTML has `public, must-revalidate, max-age=30`; hashed assets have one-year immutable caching; `/sw.js` has `no-cache, no-store, must-revalidate`. Headers include HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, camera/microphone/geolocation restrictions, and CSP with header-only `frame-ancestors 'none'`.
- `/`, `/demo`, `/privacy`, and `/terms` returned 200; the designed missing route returned HTTP 404. All discovered internal links and the Param Factory external link returned 200; the privacy address is an explicit `mailto:` link.
- All 22 public files in locally built `dist/` (including HTML, assets, worker, manifest, sitemap, robots, and 404) matched live responses byte-for-byte. `staticwebapp.config.json` remains deployment-only as intended.

## Defects by severity

None found. The previous verification's release-gate timeout, Import JSON focus-indicator, and zero-duration recovery findings are fixed in this candidate and live deployment.

## Evidence retained during verification

- Cold first-read desktop screenshot: `/tmp/live-first-read-desktop.png`
- Fresh mobile demo screenshot: `/tmp/mgs-live-mobile-demo.png`
- Lighthouse JSON: `/tmp/mgs-live-lighthouse.json`

