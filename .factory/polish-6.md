# Polish 6 — cumulative adversarial repair

## Result

**PASS.** Every finding in reviews 1–6 and their earlier verification notes is closed. The release repair is `5cdc5629b42a3844f561d66c93ce5e825d28ac3a`; it is live as build `v1.0.6` with service-worker cache `motion-graph-sketchpad-v5`.

## Evidence shared by the matrix

- Clean checkout: `/tmp/mgs-polish6-clean-YOfQDV` at `5cdc562`; all 18 exact commands in `.factory/claims.json` passed independently (`/tmp/mgs-polish6-clean-claims.log`). Three further clean `npm test` runs passed (`/tmp/mgs-polish6-clean-default.log`), each with 11 unit and 29 Chromium tests.
- Live browser suite: `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test` passed 11 unit and 29 Chromium tests. This includes every claim, same-origin privacy, demo isolation, offline reload, mobile targets, reduced motion, focus/history, route metadata, and AxeBuilder checks.
- Cold screenshots: [`home mobile`](/tmp/mgs-polish6-live/home-390x844.png), [`demo mobile`](/tmp/mgs-polish6-live/demo-390x844.png), [`home desktop`](/tmp/mgs-polish6-live/home-1366x768.png), and [`direct 404`](/tmp/mgs-polish6-live/not-found-390x844.png).
- Live verification: `/opt/fleet/lib/verify-url.sh https://motion-graph-sketchpad.sociobot.in/ /tmp/mgs-polish6-live/verify-home` reported no console errors; title, `lang`, one `h1`, `main`, and all image alt attributes passed. The live 404 check returned HTTP 404.

## Finding matrix

| Finding | Change made | Evidence and live recheck |
| --- | --- | --- |
| F-1-1 | Kept literal sketchpad, limits, and export headings/caption. | `keeps every reviewed heading and action in plain words`; [home mobile](/tmp/mgs-polish6-live/home-390x844.png); live `/`. |
| F-1-2 | Kept result-naming add-property, restart, and real-sketch controls. | Same plain-words test; [demo mobile](/tmp/mgs-polish6-live/demo-390x844.png); live `/?demo=1`. |
| F-1-3 | Kept the four-property, five-easing, export, and same-origin claims with one tagged test each. | `demo-four-property-sample`, `five-standard-easings`, `three-exports`, `no-account-demo-network`; clean exact-command log; live suite. |
| Verification-1 High | Kept 44 px controls across the complete phone UI. | `keeps every visible mobile interactive target at least 44 pixels`; live `/?demo=1`. |
| Verification-1 Medium | Kept immutable build assets and an updateable service worker. | `caches versioned build assets immutably while keeping the worker updateable`; live headers and live `sw.js` cache `v5`. |
| Verification-1 Low A | Kept plain malformed-JSON recovery guidance. | `shows plain recovery guidance for malformed JSON imports`; live `/demo`. |
| Verification-1 Low B | Kept the supported-route rewrites and real HTTP 404 override. | `rewrites only the supported SPA routes and preserves an HTTP 404 for unknown paths`; live `/unknown-polish-six` is HTTP 404; [404](/tmp/mgs-polish6-live/not-found-390x844.png). |
| F-2-1 | Kept the height-aware desktop hero so action, helper, facts, and art fit above the fold. | `keeps the complete desktop first action and facts above the fold`; [home desktop](/tmp/mgs-polish6-live/home-1366x768.png); live `/`. |
| F-2-2 | Kept the sticky demo banner with Reset and real-sketch actions. | `keeps demo controls visible and keyboard reachable after scrolling`; live `/?demo=1`. |
| F-2-3 | Kept the full mobile target audit, including header and footer controls. | `keeps every visible mobile interactive target at least 44 pixels`; [demo mobile](/tmp/mgs-polish6-live/demo-390x844.png). |
| F-2-4 | Kept the shared, metadata-rich direct 404 page with legal links and a return action. | `ships a complete, metadata-rich 404 shell`; live `/unknown-polish-six` HTTP 404; [404](/tmp/mgs-polish6-live/not-found-390x844.png). |
| F-2-5 | Kept per-route title, description, canonical, Open Graph, and Twitter metadata. | `sets route-specific metadata on every client route`; live `/demo`, `/privacy`, and `/terms`. |
| F-2-6 | Kept the named reset claim and full sample restoration. | `@claim:demo-reset`; clean exact command and live `/?demo=1`. |
| F-2-7 | Kept sentinel-proven demo read/write isolation. | `@claim:demo-isolation`; clean exact command and live `/?demo=1`. |
| F-2-8 | Kept concrete Web Animations registration wording and output. | `@claim:waapi-registers-properties`; clean exact command and live `/demo`. |
| F-2-9 | Kept literal process headings and export labels. | `keeps every reviewed heading and action in plain words`; live `/`. |
| F-2-10 | Kept outcome-first offline and same-site privacy copy. | `@claim:offline-reload` and `@claim:no-account-demo-network`; live demo suite. |
| F-2-11 | Kept “Web Animations” as the consistent export term. | `uses the reviewed Web Animations term and product-first demo wording`; live `/demo`. |
| F-4-1 | Kept the product-first isolated demo deck: banner, Lantern drift, four editable properties, and working preview all appear above the phone fold. | `@claim:demo-four-property-sample`; [demo mobile](/tmp/mgs-polish6-live/demo-390x844.png); live `/?demo=1`. |
| F-5-1 | Kept Clear sketch removal and the plain privacy instruction. | `@claim:clear-sketch-data`; live `/privacy`. |
| F-5-2 | Kept the playhead keyframe insertion and interpolated-value assertion. | `@claim:add-keyframe`; live `/?demo=1`. |
| F-5-3 | Kept copy and file-download verification for CSS, Web Animations, and JSON. | `@claim:three-exports`; live `/demo`. |
| F-5-4 | Kept literal 404 wording. | `ships a complete, metadata-rich 404 shell`; live `/unknown-polish-six`; [404](/tmp/mgs-polish6-live/not-found-390x844.png). |
| F-5-5 | Kept the literal Terms h1. | Plain-words regression; live `/terms`. |
| F-6-1 | Replaced the raced add loop with an `add()` helper that waits for both the `n/8` count and n rails after every click. It now proves all eight individual re-renders before asserting the disabled controls. | `@claim:eight-properties` passed independently in the clean checkout, then passed inside all three clean default parallel suites and the live full suite; live `/`. |

Review 3 contained no new findings. The full current browser run rechecked its prior cold-read, demo, routing, privacy, accessibility, and offline scope.
