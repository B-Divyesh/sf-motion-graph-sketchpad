# Polish 8 — cumulative adversarial repair

**Reviewed candidate:** `221eb421b7eed6981d6ca25578a97594759c165a`  
**Review commit:** `8f8faf3e6dd6acbedc0a71adf12a613dc7fad69a`  
**Repair commits:** `0f8904b8e637ef9f09fcfab6cec6de36a5866498`, `6d92d45a96a6644df09b948340705e7e75c2f797`  
**Deployment:** `8969d11d-28a4-4a91-8307-ba59c1ed7771`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

## Evidence key

- Clean clone: `/tmp/mgs-polish8-final-clean-AU0cK7` at `6d92d45`; `npm ci`, all 18 exact `.factory/claims.json` commands, `npm test`, and `npm run build` passed. Per-claim logs are in `/tmp/mgs-polish8-evidence/final/claims/`.
- Clean full suite: `/tmp/mgs-polish8-evidence/final/full-suite.log` records 13 unit and 40 Chromium tests passing. Build output is `/tmp/mgs-polish8-evidence/final/build.log`.
- Live full suite: `/tmp/mgs-polish8-evidence/final/live-full-suite.log` records 13 unit and 40 Chromium tests passing against the production origin.
- Live accessibility: `/tmp/mgs-polish8-evidence/final/live-cold/report.json` records zero Axe violations on `/`, `/?demo=1`, `/privacy`, `/terms`, and a direct HTTP 404. URL-verifier reports and screenshots are under `/tmp/mgs-polish8-evidence/final/verify-*`.
- Cold screenshots: `/tmp/mgs-polish8-evidence/final/live-cold/home-1366x768.png`, `home-390x844.png`, `demo-390x844.png`, `privacy-390x844.png`, `terms-390x844.png`, and `not-found-390x844.png`. Measured route data is in the same directory's `report.json`.
- Production parity: 22 served files matched local `dist/` byte-for-byte. The direct missing route returned HTTP 404. Hashed assets were immutable and `sw.js` was no-store.
- Mobile Lighthouse: `/tmp/mgs-polish8-evidence/final/lighthouse-mobile.json` — Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1,296 ms, CLS 0.031, TBT 132 ms.

## Finding matrix

| Finding | Change retained or made | Test, screenshot, and live check |
| --- | --- | --- |
| F-1-1 | Kept literal sketchpad and limits headings plus “Test motion. Export the code.” | `keeps every reviewed heading and action in plain words`; `home-1366x768.png`; live `/`. |
| F-1-2 | Kept result-naming property, restart-preview, and real-sketch actions. | Same plain-language test; `demo-390x844.png`; live `/?demo=1`. |
| F-1-3 | Kept all four previously missing claims declared with one observable tagged test each. | `@claim:demo-four-property-sample`, `@claim:five-standard-easings`, `@claim:three-exports`, `@claim:no-account-demo-network`; `demo-390x844.png`; live demo. |
| Verification-1 High | Kept 44 px keyframes, controls, fields, and navigation, then expanded the audit across every route. | `keeps every visible mobile interactive target at least 44 pixels on every route`; `privacy-390x844.png`; live routes reported no small targets. |
| Verification-1 Medium | Kept immutable caching for hashed assets and no-store caching for the worker. | `caches versioned build assets immutably while keeping the worker updateable`; `home-1366x768.png`; live header checks. |
| Verification-1 Low A | Kept structural import validation and plain recovery guidance. | `shows plain recovery guidance for malformed JSON imports`; `demo-390x844.png`; live demo. |
| Verification-1 Low B | Kept explicit deep-link rewrites and the real Static Web Apps 404 override. | `rewrites only the supported SPA routes and preserves an HTTP 404 for unknown paths`; `not-found-390x844.png`; live `/round-8-cold-not-found` returned 404. |
| F-2-1 | Kept the height-aware hero with action, helper, and three facts above the fold. | Five `keeps the complete first action and facts above the fold` tests; `home-1366x768.png`; live `/`. |
| F-2-2 | Kept the sticky demo banner and its reset/exit controls. | `keeps demo controls visible and keyboard reachable after scrolling`; `demo-390x844.png`; live `/?demo=1`. |
| F-2-3 | Added a 44 px `inline-flex` hit area to the Privacy email and changed the regression from Demo-only to Home, Demo, Privacy, Terms, routed 404, and static 404. | Route-wide target test; `privacy-390x844.png`; live email measured 190 × 44 px and no route had a small target. |
| F-2-4 | Kept the metadata-rich direct 404 with shared header, footer, legal links, and return action. | `ships a complete, metadata-rich 404 shell`; `not-found-390x844.png`; live direct 404. |
| F-2-5 | Kept per-route title, description, canonical, Open Graph, and Twitter metadata. | `sets route-specific metadata on every client route`; `terms-390x844.png`; live Demo, Privacy, and Terms. |
| F-2-6 | Kept Reset demo as a declared restoration behavior. | `@claim:demo-reset`; `demo-390x844.png`; live `/?demo=1`. |
| F-2-7 | Kept sentinel-proven demo read/write isolation. | `@claim:demo-isolation`; `demo-390x844.png`; live `/?demo=1`. |
| F-2-8 | Kept concrete custom-property registration wording and matching Web Animations output. | `@claim:waapi-registers-properties`; `demo-390x844.png`; live demo export. |
| F-2-9 | Kept process headings and export labels literal out of context. | Plain-language regression; `home-1366x768.png`; live `/`. |
| F-2-10 | Kept offline and same-site privacy outcomes in plain words. | `@claim:offline-reload` and `@claim:no-account-demo-network`; `demo-390x844.png`; live demo. |
| F-2-11 | Kept “Web Animations” as the single export term. | Content-contract test; `demo-390x844.png`; live export tabs. |
| Review 3 | This review had no findings; its cold-read, claims, routes, privacy, accessibility, and offline scope was rerun. | Clean and live full suites; `home-390x844.png`; live `/`. |
| F-4-1 | Kept the direct, product-first sample deck with banner, name, four properties, and preview controls above the phone fold. | `@claim:demo-four-property-sample`; `demo-390x844.png`; live `/?demo=1`. |
| F-5-1 | Kept the declared Clear-sketch removal flow and literal Privacy guidance. | `@claim:clear-sketch-data`; `privacy-390x844.png`; live `/privacy`. |
| F-5-2 | Kept playhead keyframe insertion with an interpolated-value assertion. | `@claim:add-keyframe`; `demo-390x844.png`; live demo. |
| F-5-3 | Kept copy and file-download verification for CSS, Web Animations, and JSON. | `@claim:three-exports`; `demo-390x844.png`; live demo. |
| F-5-4 | Kept literal “Page not found” recovery copy. | Static 404 contract test; `not-found-390x844.png`; live direct 404. |
| F-5-5 | Kept the Terms h1 naming the page. | Plain-language regression; `terms-390x844.png`; live `/terms`. |
| F-6-1 | Kept transition-aware eight-property test steps that await every render. | `@claim:eight-properties` passed independently and in both full suites; `demo-390x844.png`; live editor. |
| V5-1 | Kept full first-screen bounds checks at all five required viewports. | Five viewport regressions; `home-1366x768.png`; live `/`. |
| V6-1 / F-7-1 | Kept roving export-tab focus, Arrow/Home/End behavior, `aria-controls`, and the labelled tabpanel. | `uses a complete keyboard tab pattern for export formats`; `demo-390x844.png`; live demo. |
| F-7-2 | Kept generated-image provenance out of visitor claims and in the design record. | `does not make an untestable generated-imagery claim in visitor copy`; `home-1366x768.png`; live footer. |
| V7-1 | Kept route accessibility scans split into independent tests; the exact gate is stable under four workers. | Clean and live `npm test`: 13 unit and 40 browser tests passed; `home-390x844.png`; live suite. |
| V7-2 | Kept a visible 3 px cyan outline on the Import JSON label when its file input receives focus. | `shows keyboard focus on the visible Import JSON label`; `demo-390x844.png`; live demo. |
| V7-3 | Kept zero-duration clamping with an announced explanation. | `explains and corrects a zero duration`; `demo-390x844.png`; live demo. |
| F-8-2 | Removed duplicated release literals. Vite now derives `v1.0.9` from `package.json`, injects it into the app, and stamps the static 404 and offline cache during every build. | `uses one build identifier on normal and direct 404 routes` plus the single-source unit test; `home-390x844.png` and `not-found-390x844.png`; both live footers read `v1.0.9`. |

## Final live recheck

Fresh contexts confirmed the first screen, isolated `?demo=1` sample, persistent demo controls, reset/exit behavior, local-storage boundary, exports, route metadata, focus/history, legal links, reduced motion, offline reload, and direct HTTP 404. The Privacy email is 44 px high. Every normal and 404 footer shows `v1.0.9`. No finding from reviews 1–8 or their carried verification findings remains open.
