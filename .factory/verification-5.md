# Independent verification 5 — FAIL

**Verified:** 2026-08-29  
**Candidate:** `6ebff27a309ea1f56c2750da2ee919ffe1e902c9` (`docs: record polish six acceptance`)  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

## Release decision

**FAIL.** The application, all 18 declared claims, build, privacy boundary, offline behavior, accessibility scans, and deployed artifact identity pass. One release-blocking responsive defect remains: the mandatory first-screen facts leave the viewport at common desktop heights, and at 1536 × 864 the primary sample action itself is clipped by the bottom edge.

## Required first read

A cold 1440 × 900 visit plainly communicated:

- **What it does:** “Sketch property motion before coding.”
- **For whom:** “For web and game creators testing animation without scripts or a full timeline editor.”
- **What to click first:** **Try it with sample data**, paired with “Loads a four-property motion sketch.”

One click opened `/?demo=1` with the “Lantern drift” sample, four named properties, working preview controls, and the persistent “Demo — sample data, nothing is saved” banner. The explicit what/who/action/demo gate passes at this viewport and at 390 × 844.

The complete first-screen contract does not hold across desktop sizes. At 1440 × 900, the facts start at y=911 and end at y=1,017, below the viewport. At 1536 × 864, the primary action occupies y=833.1–881.9 and is clipped; the facts occupy y=913.9–1,020.6. Evidence: `/tmp/mgs-verification-5-artifacts/live-first-read-desktop.png`, `live-home-390x844.png`, and `live-home-1536x864.png`.

## Release-blocking finding

### High — V5-1: required first-screen content is clipped on common desktop viewports

The compact desktop layout in `src/styles.css` applies only through `max-height: 820px`. Immediately above that breakpoint, the default `7vw` heading and larger spacing return. The result is worse use of the available height: at 1536 × 864 the primary action extends 17.9 px below the viewport, and all three required privacy/offline/price facts are out of view. At 1440 × 900 the action fits, but all facts are still below the fold.

This violates the plain-words and site-structure requirement that the primary action and three plain facts appear on the first screen, and it weakens the mandated desktop experience. The existing browser check covers only 1366 × 768, where the `max-height: 820px` compact rule happens to pass.

Recheck after repair at minimum at 1366 × 768, 1440 × 900, 1536 × 864, 1920 × 1080, and 390 × 844. Assert the full bounds of `.hero-action` and `.plain-facts`, not only text presence.

## Claims gate

`.factory/claims.json` exists and declares 18 claims. After `npm ci`, every exact listed command was run separately against the local production demo entry point. Every observable claim assertion passed.

| Claim | Result | Evidence |
| --- | --- | --- |
| `offline-reload` | PASS | `/tmp/mgs-verification-5-artifacts/claims/offline-reload.log` |
| `local-only` | PASS | `/tmp/mgs-verification-5-artifacts/claims/local-only.log` |
| `three-exports` | PASS | `/tmp/mgs-verification-5-artifacts/claims/three-exports.log` |
| `demo-isolation` | PASS | `/tmp/mgs-verification-5-artifacts/claims/demo-isolation.log` |
| `eight-properties` | PASS | `/tmp/mgs-verification-5-artifacts/claims/eight-properties.log` |
| `deterministic-export` | PASS | `/tmp/mgs-verification-5-artifacts/claims/deterministic-export.log` |
| `keyboard-keyframes` | PASS | `/tmp/mgs-verification-5-artifacts/claims/keyboard-keyframes.log` |
| `free-no-account` | PASS | `/tmp/mgs-verification-5-artifacts/claims/free-no-account.log` |
| `json-import` | PASS | `/tmp/mgs-verification-5-artifacts/claims/json-import.log` |
| `drag-keyframes` | PASS | `/tmp/mgs-verification-5-artifacts/claims/drag-keyframes.log` |
| `easing-preview` | PASS | `/tmp/mgs-verification-5-artifacts/claims/easing-preview.log` |
| `demo-four-property-sample` | PASS | `/tmp/mgs-verification-5-artifacts/claims/demo-four-property-sample.log` |
| `five-standard-easings` | PASS | `/tmp/mgs-verification-5-artifacts/claims/five-standard-easings.log` |
| `no-account-demo-network` | PASS | `/tmp/mgs-verification-5-artifacts/claims/no-account-demo-network.log` |
| `demo-reset` | PASS | `/tmp/mgs-verification-5-artifacts/claims/demo-reset.log` |
| `waapi-registers-properties` | PASS | `/tmp/mgs-verification-5-artifacts/claims/waapi-registers-properties.log` |
| `clear-sketch-data` | PASS | `/tmp/mgs-verification-5-artifacts/claims/clear-sketch-data.log` |
| `add-keyframe` | PASS | `/tmp/mgs-verification-5-artifacts/claims/add-keyframe.log` |

The landing page and README claim-like statements are covered by these entries; no unlisted runtime or marketing claim was found.

## Build and automated checks

- `npm ci`: PASS; 73 packages installed from the lockfile.
- `npm audit --audit-level=high`: PASS; zero vulnerabilities.
- `npm test`: PASS — 11 Vitest tests and 29 Chromium tests. This includes the repaired eight-property claim in the normal four-worker run.
- `npm run build`: PASS — exact `tsc && vite build`; `dist/` produced. There is no separate lint script.
- `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test`: PASS — 11 unit and 29 live Chromium tests.
- `/opt/fleet/lib/verify-url.sh .../?demo=1`: PASS — HTTP 200, title, `lang=en`, one `h1`, one `main`, labelled images/buttons, and no console errors. Evidence: `/tmp/mgs-verification-5-artifacts/verify-url-live/verify.json`.

## Product exercise

- Normal path: sample load, playback, keyframe drag and keyboard movement, easing choices, JSON import, CSS/Web Animations/JSON copy and download, reset, exit to a real sketch, local save, reload, and clear all work.
- Boundaries: eight-property limit; duration values clamp to 200–30,000 ms; keyframe times clamp to the duration; blank names recover to “Untitled”; the last keyframe cannot be removed.
- Invalid/recovery: malformed JSON, a future format version, incomplete property data, and an invalid six-digit colour all show plain recovery messages and preserve the current sample. Canceling property removal or sketch clearing preserves work.
- Mobile: the 390 × 844 home and demo have no horizontal page overflow, at least 44 px controls, all required sample fields above the fold, and a reachable sticky demo banner. A 320 px reflow check kept page content usable; horizontally scrollable editor rails remain keyboard reachable.
- Keyboard: skip link is first; navigation, primary action, inputs, keyframes, tabs, and demo controls are operable. Focus is a computed 3 px cyan outline. History navigation focuses and announces the new `h1`.
- Reduced motion: Play moves directly to the final frame and announces why; continuous travel is removed.
- Axe: zero violations, including zero serious/critical findings, on `/`, `/demo`, `/privacy`, `/terms`, and the real 404 at both desktop and 390 px mobile sizes.

## Privacy, offline behavior, and deployment

- A fresh end-to-end live flow recorded 39 requests, all to `https://motion-graph-sketchpad.sociobot.in`; no analytics, third-party runtime resources, accounts, payment controls, console errors, or page errors appeared.
- Demo mode remained memory-only. Real mode used only `motion-graph-sketchpad:sketch:v1` in local storage.
- The active `/sw.js` controlled the page; `registration.update()` completed with no waiting worker. After priming, `/demo` reloaded offline with its banner, sample, and editor intact.
- HTML uses `public, must-revalidate, max-age=30`; hashed JS/CSS/images/fonts use one-year immutable caching; `/sw.js` uses `no-cache, no-store, must-revalidate`.
- Responses include CSP restricted to self with `frame-ancestors 'none'`, HSTS, `nosniff`, strict-origin referrer policy, and camera/microphone/geolocation restrictions.
- All crawled site links returned 200; the privacy email is an explicit `mailto:` link. `/qa-verification-5-not-found` returned HTTP 404 with the designed page.
- The built HTML, JS, CSS, fonts, four hero variants, social preview, service worker, manifest, robots, sitemap, favicon, touch icon, and 404 body all match live byte-for-byte. Key hashes: JS `3b670110f6dff2b5700320f1f3851613d604b9e34f27d1552231158a3da28c44`; CSS `09c6df6b4b3843174ace4799d95e52e52dbc298e884ab44e8f272b092f8a17d7`; service worker `54ab74a17a93db1eba919914c7fcc5818ca549402935380066aeb46aa132d1fa`.
- This is a static client with no server-side product endpoint and no sign-in. Rate-limit/429/`Retry-After` and Microsoft Entra authority checks are not applicable.

## Performance

- Built initial JS: 34.09 kB raw / 10.90 kB gzip (budget 200 kB).
- Built CSS: 22.28 kB raw / 5.72 kB gzip (budget 50 kB).
- Loaded WOFF2 fonts total 52.97 kB (budget 120 kB); largest hero candidate is 31.99 kB WebP / 22.19 kB AVIF (budget 300 kB).
- Lighthouse 12.8.2 mobile, live home: Performance 99, Accessibility 100, Best Practices 100, SEO 100; FCP 1,230 ms, LCP 1,304 ms, TBT 97 ms, CLS 0.031, interactive 1,377 ms. Evidence: `/tmp/mgs-verification-5-artifacts/lighthouse-live-mobile.json`.

## Defects by severity

| Severity | Count | Finding |
| --- | ---: | --- |
| Blocker | 0 | None |
| Critical | 0 | None |
| High | 1 | V5-1 — first-screen facts leave the viewport and the primary demo action is clipped at 1536 × 864 |
| Medium | 0 | None |
| Low | 0 | None |
