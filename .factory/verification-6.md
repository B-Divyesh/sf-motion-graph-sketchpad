# Independent verification 6 — PASS

**Verified:** 2026-08-29

**Candidate:** `bbddc19ddb8b2c25dd6bef4b74a2c61064e4da0e` (`docs: record repair two release evidence`)

**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

## Release decision

**PASS.** Fresh clean-checkout and deployed-site evidence confirms that the candidate completes the researched job: web and game creators can sketch one to eight numeric or colour properties, edit keyframes, preview easing, and export deterministic CSS, Web Animations code, or JSON without an account. The live deployment is byte-identical to the candidate's production output. No release-blocking defect was found.

The previously reported deployment-only failure did not reproduce. One low-severity keyboard convention gap is recorded below; it does not prevent keyboard access to any export.

## Required first read

A cold 1440 × 900 live visit plainly answered all three required questions:

- **What it does:** “Sketch property motion before coding.”
- **For whom:** “For web and game creators testing animation without scripts or a full timeline editor.”
- **What to click first:** **Try it with sample data**, paired with “Loads a four-property motion sketch.”

One click opened `/?demo=1` with the persistent “Demo — sample data, nothing is saved” banner, “Lantern drift,” four named properties, and working preview controls. The gate passes.

The primary action and all three facts fit in the first viewport at every required size:

| Viewport | Action bounds | Facts bounds |
| --- | --- | --- |
| 1366 × 768 | 493.5–542.3 px | 558.3–641.0 px |
| 1440 × 900 | 565.2–614.0 px | 630.0–712.7 px |
| 1536 × 864 | 547.2–596.0 px | 612.0–694.7 px |
| 1920 × 1080 | 839.7–888.5 px | 920.5–1027.2 px |
| 390 × 844 | 499.7–603.2 px | 635.2–742.0 px |

## Claims gate

`.factory/claims.json` exists and declares 18 claims. After `npm ci`, every listed command was run separately and verbatim against the local production demo entry point. All passed; each invocation also passed the 11 unit tests.

| Claim | Result |
| --- | --- |
| `offline-reload` | PASS |
| `local-only` | PASS |
| `three-exports` | PASS |
| `demo-isolation` | PASS |
| `eight-properties` | PASS |
| `deterministic-export` | PASS |
| `keyboard-keyframes` | PASS |
| `free-no-account` | PASS |
| `json-import` | PASS |
| `drag-keyframes` | PASS |
| `easing-preview` | PASS |
| `demo-four-property-sample` | PASS |
| `five-standard-easings` | PASS |
| `no-account-demo-network` | PASS |
| `demo-reset` | PASS |
| `waapi-registers-properties` | PASS |
| `clear-sketch-data` | PASS |
| `add-keyframe` | PASS |

The live landing page and README were cross-checked against the manifest. No unlisted product or privacy claim was found. Per-claim logs are in `/tmp/mgs-verification-6-artifacts/claims/`.

## Clean-checkout quality gates

- Candidate identity: `HEAD`, `main`, and `origin/main` were `bbddc19ddb8b2c25dd6bef4b74a2c61064e4da0e` before verification changes.
- `npm ci`: PASS; 73 packages installed from the lockfile and zero vulnerabilities reported.
- `npm audit --audit-level=high`: PASS; zero vulnerabilities.
- `npm test`: PASS; 11 Vitest tests and 33 Chromium tests.
- `npm run build`: PASS; exact `tsc && vite build`, with `dist/index.html` produced. There is no separate lint script; TypeScript checking is part of the build.
- `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test`: PASS; the same 11 unit and 33 Chromium tests passed against deployment.
- `/opt/fleet/lib/verify-url.sh https://motion-graph-sketchpad.sociobot.in/demo ...`: PASS; HTTP 200, route title, `lang=en`, one `h1`, one `main`, no missing alt text, no unlabelled buttons, and no console errors.

## Independent product exercise

- Normal flow: loaded and played the sample, paused it, moved the playhead to 600 ms, added an interpolated keyframe, changed easing, inspected all three export formats, left demo mode, added numeric and colour properties, reloaded, and recovered the saved real sketch.
- Boundaries: duration input clamped below 200 ms to 200 and above 30,000 ms to 30,000; keyframes clamped at 0 and the duration; the eighth-property limit and disabled add controls passed in the claim suite.
- Invalid/recovery: malformed JSON, an unsupported version, an incomplete property, and a keyframe outside the sketch duration produced plain recovery messages while keeping the current sample.
- Demo isolation: demo edits remained memory-only, Reset restored the sample, and leaving demo mode recovered the independent real sketch.
- Exports: CSS, Web Animations, and JSON copy/download paths passed; JSON parsed, filenames were deterministic, and repeated exports were byte-stable.
- Routes: `/`, `/demo`, `/privacy`, and `/terms` returned 200 with route-specific metadata. A missing route returned the designed page with HTTP 404. Every crawled product link and the Param Factory link returned 200; the privacy email is an explicit `mailto:` link.

## Accessibility, keyboard, mobile, and motion

- Independent Axe 4.10.2 scans found zero violations, including zero serious/critical findings, on Home, Demo, Privacy, Terms, and the real 404 at 1440 × 900 and 390 × 844.
- The first Tab exposes the skip link with a computed 3 px cyan outline. Activating it skips header navigation; all product actions remain reachable and operable with the keyboard. Keyframe arrows move 50 ms, Shift+Arrow moves 250 ms, and endpoint clamping works.
- One `<h1>`, one `<main>`, `lang=en`, labelled controls, alt text, route focus/announcements, 44 px mobile targets, and semantic legal pages passed local and live checks.
- At 390 × 844 the body width is exactly 390 px, the complete home contract fits, and the complete sample deck ends at 745.8 px. At 320 px the page does not overflow; each keyframe rail scrolls inside its own region.
- A 200% text-size probe at 1280 px retained all content with no page-level horizontal overflow.
- With reduced motion, Play moves directly to the final frame and announces why; no continuous preview travel occurs.
- Low finding V6-1: the export format controls declare `role="tab"` but do not implement the conventional Left/Right Arrow and roving-tabindex pattern. All formats are still reachable and selectable with Tab plus Enter/Space, so no functionality is blocked.

## Privacy, network, PWA, and headers

- A fresh live Playwright flow recorded 32 requests during landing, demo editing/playback/import/export, leaving demo, real-sketch editing, and reload. Every request used `https://motion-graph-sketchpad.sociobot.in`; there were no failed requests, console errors, page errors, analytics, CDN fonts/scripts, or background third-party calls.
- Demo mode did not write the real storage key. Real mode used the single documented `motion-graph-sketchpad:sketch:v1` localStorage key.
- Browser-observed responses include the self-restricted CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, and camera/microphone/geolocation restrictions.
- HTML uses `public, must-revalidate, max-age=30`; hashed assets use `public, max-age=31536000, immutable`; `/sw.js` uses `no-cache, no-store, must-revalidate`. Conditional requests returned 304 for HTML and hashed JavaScript.
- The active `/sw.js` controls `/`, `registration.update()` completed with no waiting or installing worker, and only cache `motion-graph-sketchpad-v5` remained. After going offline, `/demo` reloaded with the banner, sample name, and working editor.
- This is a static local-first product with no product API, unlock call, payment, or sign-in. Rate-limit/429/`Retry-After` and Microsoft Entra authority checks are not applicable.

## Deployment identity and budgets

All 22 deployable files in `dist/` matched the live response byte-for-byte, including HTML, JavaScript, source map, CSS, fonts, responsive hero images, social image, service worker, manifest, robots, sitemap, icons, and 404 page. `staticwebapp.config.json` is correctly consumed by the host and not publicly served.

Key SHA-256 values:

- HTML: `1100f65761f469c13e83ef3da67b2e1fc1aab04365b4152586a1f0075938adc5`
- JavaScript: `2b28521a89422fb660bae455a739e40671863d1711e2c35f9baa315c846c05ef`
- CSS: `2bbf91013ca055bf1a96b8176bceb13e225ecaf86cffe7a236169f01544aa028`
- Service worker: `54ab74a17a93db1eba919914c7fcc5818ca549402935380066aeb46aa132d1fa`

Budget evidence:

- Initial JavaScript: 34.09 kB raw / 10.85 kB gzip (budget 200 kB).
- CSS: 22.28 kB raw / 5.74 kB gzip (budget 50 kB).
- WOFF2 fonts: 52.97 kB total (budget 120 kB).
- Largest hero candidate: 31.99 kB WebP / 22.19 kB AVIF (budget 300 kB).
- Lighthouse 12.8.2 mobile, live home: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.3 s, TBT 50 ms, CLS 0.031, Speed Index 1.2 s, 84 KiB transferred.

## Defects by severity

| Severity | Count | Finding |
| --- | ---: | --- |
| Blocker | 0 | None |
| Critical | 0 | None |
| High | 0 | None |
| Medium | 0 | None |
| Low | 1 | V6-1 — ARIA export tabs lack conventional Left/Right Arrow navigation; Tab plus Enter/Space works |

## Evidence

Detailed command logs, request/header records, parity hashes, screenshots, Lighthouse JSON, Axe output, and PWA cache evidence are in `/tmp/mgs-verification-6-artifacts/` for this worker run.
