# Independent verification 9 — PASS

**Date:** 2026-08-29

**Candidate:** `931556280acf59809e08f7553af3a62467e80843`

**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

**Artifact:** static web / PWA

**Verdict:** **PASS**

The live deployment is the candidate's production output. All required claim tests, the complete clean-checkout test/build gates, the smallest useful workflow, recovery paths, accessibility checks, privacy checks, PWA behavior, delivery policy, and performance budgets passed. The previously reported deployment-only concern is not present in this deployment.

## Cold first-read and demo gate

A fresh 1440 × 900 Chromium context opened the live root without prior storage or cookies. The first viewport answers all three required questions:

- **What it does:** “Sketch property motion before coding.”
- **Who it is for:** “For web and game creators testing animation without scripts or a full timeline editor.”
- **What to click first:** **Try it with sample data**, beside “Loads a four-property motion sketch.”

The same viewport shows the three plain facts: offline after first visit, browser-local sketches, and free/no account. One click opened `/?demo=1` with the persistent “Demo — sample data, nothing is saved” banner, Reset demo, the “Lantern drift” sample, four named properties, and preview controls. This passes the mandatory plain-words and one-click demo gate.

## Required claims gate

`.factory/claims.json` exists and declares 18 claims. After `npm ci` in the clean candidate checkout, every exact `test` command was run separately through the local demo entry point. All 18 passed, and each `@claim:<id>` tag occurs exactly once in the test source.

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

Landing, editor, Privacy, README, and demo-documentation claims were cross-checked against the manifest and `.factory/copy-audit.md`. No unlisted visitor-facing product claim was found.

## Clean-checkout gates

| Check | Result | Evidence |
| --- | --- | --- |
| Candidate identity | PASS | `git rev-parse HEAD` returned the requested candidate before QA artifacts were added. |
| Install | PASS | `npm ci`: 73 packages installed; 0 vulnerabilities. |
| Exact complete suite | PASS | `npm test`: 13 Vitest tests and 40 Chromium tests passed. |
| Live complete browser suite | PASS | `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm run test:e2e`: 40/40 passed. |
| Type check and production build | PASS | `npm run build` ran `tsc && vite build` and produced `dist/`. |
| Lint | N/A | No lint script or lint configuration exists. |
| Dependency audit | PASS | `npm audit --audit-level=high`: 0 vulnerabilities. |

The production build emitted 34,600 B JavaScript (11,135 B gzip), 22,471 B CSS (5,763 B gzip), 106,688 B of all WOFF/WOFF2 files, and an 8,752 B mobile AVIF hero. These are within the 200 KB JS, 50 KB CSS, 120 KB font, and 300 KB mobile-hero budgets.

## Independent end-to-end and recovery exercise

A separate Playwright audit—not the repository test suite—exercised the live product:

- The demo opened “Lantern drift” with Drift X, Lift, Scale, and Glow colour.
- Play advanced the time to 254 ms and changed the preview object's computed transform.
- ArrowRight moved the first keyframe to 50 ms; Shift+ArrowRight moved it to 300 ms.
- At a 600 ms playhead, Add keyframe created exactly one 600 ms Drift X keyframe.
- CSS, Web Animations, and JSON downloads were non-empty and named `lantern-drift.css`, `lantern-drift.js`, and `lantern-drift.json`.
- Malformed JSON kept the original sample and reported: “This file is not valid JSON. Export the sketch again, then choose that JSON file.”
- Duration `0` recovered to 200 ms with an explanation; `999999` recovered to 30,000 ms with an explanation.
- A real-storage sentinel remained untouched throughout demo edits. **Open my real sketch** restored it, proving the demo/real boundary.
- The full suite additionally passed valid import, deterministic exports, drag editing, five easings, the eight-property boundary, Reset demo, Clear sketch, export-tab keyboard behavior, and browser-history focus restoration.

This fulfills the researched smallest useful product: 1–8 numeric/colour properties, draggable and keyboard-editable keyframes, easing preview, and deterministic CSS/Web Animations/JSON export.

## Accessibility, responsive behavior, and motion

- Independent Axe 4.10.2 scans on Home, Demo, Privacy, Terms, and the actual HTTP 404 found zero violations at both 1440 × 900 and 390 × 844. Therefore serious/critical findings are zero.
- Every scanned route had `lang=en`, exactly one `h1`, exactly one `main`, the correct route title, no horizontal overflow, and no visible interactive target below 44 × 44 CSS px.
- The factory `verify-url.sh` passed Home, Demo, Privacy, and Terms: HTTP 200, title, language, one h1/main, alt text, labelled buttons, and no application console errors.
- The first Tab focused the 232 × 48.8 px skip link with a visible 3 px cyan outline. The visible Import JSON label also showed a 3 px cyan outline and measured 118 × 44 px when its file input had focus.
- At 200% root text size on a 390 px viewport, the heading and primary action remained visible and document width remained 390 px.
- With `prefers-reduced-motion: reduce`, Play moved directly to 2400 ms and announced that motion was reduced.
- Normal Home, Demo, Privacy, and Terms loads produced no console errors, page errors, or failed requests. The deliberate 404 navigation produced only the browser's expected failed-resource log for its 404 document.

Desktop and mobile screenshots were visually reviewed. The product-specific night editing-bay treatment matches `.factory/design.md`; controls, hierarchy, sample state, export output, legal copy, and mobile stacking are legible and coherent.

## Privacy, network, headers, and PWA

- The independent multi-route/edit/export/import/storage/PWA flow observed 103 requests. Every request was a same-origin `GET` to `motion-graph-sketchpad.sociobot.in`; there were no analytics, remote fonts/scripts, account, billing, AI, or third-party product requests.
- Browser-observed document headers include HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, camera/microphone/geolocation restrictions, and a self-restricted CSP with header-only `frame-ancestors 'none'`.
- HTML uses `public, must-revalidate, max-age=30`; hashed JS/CSS use `public, max-age=31536000, immutable`; `/sw.js` uses `no-cache, no-store, must-revalidate`. A conditional hashed-JS request returned 304.
- The active service worker was controlling `/demo`; `registration.update()` completed with no waiting/installing worker. The only cache was `motion-graph-sketchpad-v1.0.9`. Offline reload retained the demo banner and “Lantern drift” sample.
- This is a static app with no server-side product, unlock, or payment endpoint. API allowance/429/`Retry-After` testing is therefore not applicable. It has no sign-in, so Microsoft Entra tenant validation is also not applicable.

## Routes, links, performance, and deployment identity

- `/`, `/demo`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and `/sw.js` returned 200. A deliberate unknown route returned the designed page with HTTP 404.
- The link crawl found no dead HTTP link. The Param Factory link returned 200; the privacy contact is an explicit `mailto:` action.
- Lighthouse 12.8.2 mobile: Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 1.2 s, LCP 1.3 s, TBT 40 ms, CLS 0.031, interactive 1.4 s, and 84 KiB transfer.
- All 22 public files in local `dist/` matched their live responses byte-for-byte by SHA-256, including HTML, JS, CSS, source map, fonts, images, manifest, service worker, robots, sitemap, favicon, and 404. The deployment-only `staticwebapp.config.json` correctly returned 404.
- The live footer and worker cache identify build `v1.0.9`, matching `package.json`.

## Defects by severity

None found.

## Scope notes

The product is a static PWA, not a library, CLI, or backend. Consumer-package, CLI, backend concurrency/persistence, endpoint rate-limit, and sign-in-provider checks do not apply. Chromium was the installed browser used for functional and accessibility verification.

Transient QA artifacts and raw screenshots are retained in `/tmp/mgs-verification-9-evidence` in this worker environment.
