# Polish round 5 — cumulative finding resolution

**Reviewed candidate:** `cea8e1ab621e461c348f270af9f1821ca99b08a6`  
**Repair commit:** `935e67ce4a561b13a144dd26d3c7bf927c530eae`  
**Deployment:** `https://brave-dune-0d1da2e10.7.azurestaticapps.net`  
**Public URL rechecked:** <https://motion-graph-sketchpad.sociobot.in>

## Evidence key

- Clean clone: `/tmp/mgs-polish5-clean-NNhtco`, after `npm ci`; all 18 declared claim commands passed independently, then `npm test` passed 11 unit and 29 Chromium tests and `npm run build` passed.
- Live suite: `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm run test:e2e` passed all 29 Chromium tests, including privacy, offline, demo, routing, metadata, mobile, keyboard, and Axe checks.
- Live screenshots: `/tmp/mgs-polish5-evidence/live-cold/home-390x844.png`, `/tmp/mgs-polish5-evidence/live-cold/demo-390x844-cold.png`, `/tmp/mgs-polish5-evidence/live-cold/privacy-390x844.png`, `/tmp/mgs-polish5-evidence/live-cold/terms-390x844.png`, and `/tmp/mgs-polish5-evidence/live-cold/404-desktop.png`.
- Live routes `/`, `/demo`, `/privacy`, and `/terms` returned 200; `/review-5-not-found` returned 404. `verify-url.sh` on `/?demo=1` reported no console errors, one h1/main, `lang=en`, and no missing image alt text or unlabelled buttons.

## Cumulative resolution map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained literal sketchpad/limits headings and the literal export caption. | `keeps every reviewed heading and action in plain words`; live `/`, home screenshot. |
| F-1-2 | Retained explicit Add-property, Restart-preview, and Open-my-real-sketch actions. | Same copy regression; live `/?demo=1`, demo screenshot. |
| F-1-3 | Retained and reran declared four-property, easing, export, and same-site-network claims. | `@claim:demo-four-property-sample`, `@claim:five-standard-easings`, `@claim:three-exports`, `@claim:no-account-demo-network`; live suite passed. |
| Verification-1 High | Retained the all-visible-interactive-target 44 px audit. | `keeps every visible mobile interactive target at least 44 pixels`; live `/?demo=1`, demo screenshot. |
| Verification-1 Medium | Retained immutable hashed assets and an updateable worker. | `caches versioned build assets immutably while keeping the worker updateable`; live JS `Cache-Control: public, max-age=31536000, immutable`; live `/sw.js` is no-store. |
| Verification-1 Low (JSON recovery) | Retained plain malformed-import recovery messages. | `shows plain recovery guidance for malformed JSON imports`; live suite passed. |
| Verification-1 Low (404 status) | Retained the true Static Web Apps 404 override. | `rewrites only the supported SPA routes and preserves an HTTP 404 for unknown paths`; live `/review-5-not-found` returned 404. |
| F-2-1 | Retained the short-desktop hero layout with action, helper, facts, and art above the fold. | `keeps the complete desktop first action and facts above the fold`; live `/`. |
| F-2-2 | Retained the sticky demo banner and its keyboard-reachable actions. | `keeps demo controls visible and keyboard reachable after scrolling`; live `/?demo=1`. |
| F-2-3 | Retained the complete mobile target geometry audit, including navigation and footer links. | `keeps every visible mobile interactive target at least 44 pixels`; live demo screenshot. |
| F-2-4 | Retained the metadata-rich shared-shell direct 404, then replaced its remaining metaphorical wording. | `ships a complete, metadata-rich 404 shell`; live `/review-5-not-found`, 404 screenshot. |
| F-2-5 | Retained per-route title, description, canonical, Open Graph, and Twitter metadata updates. | `sets route-specific metadata on every client route`; live `/demo`, `/privacy`, and `/terms`. |
| F-2-6 | Retained the named demo-reset claim and restoration behavior. | `@claim:demo-reset`; live `/?demo=1`. |
| F-2-7 | Retained the sentinel-based demo read/write isolation check. | `@claim:demo-isolation`; live `/?demo=1`. |
| F-2-8 | Retained the concrete Web Animations registration statement and output check. | `@claim:waapi-registers-properties`; live `/?demo=1`. |
| F-2-9 | Retained literal process and export labels. | `keeps every reviewed heading and action in plain words`; live `/`. |
| F-2-10 | Retained outcome-first offline and same-site privacy wording. | `@claim:offline-reload` and `@claim:no-account-demo-network`; live demo route. |
| F-2-11 | Retained the consistent “Web Animations” product term in the README and UI. | `uses the reviewed Web Animations term and product-first demo wording`; live demo export tabs. |
| F-4-1 | Retained the compact product-first demo deck with banner, Lantern drift, four properties, and preview controls above the phone fold. | `@claim:demo-four-property-sample`; live `/?demo=1`, demo screenshot. |
| F-5-1 | Added `clear-sketch-data`; Clear sketch now has a tagged test that seeds real data, accepts the confirmation, reloads, and proves old editor and localStorage contents are gone. Privacy wording now names browser settings as the alternate removal path. | `@claim:clear-sketch-data`; live `/privacy`, privacy screenshot. |
| F-5-2 | Added `add-keyframe`; the demo test moves to 600 ms, adds exactly one Drift X frame, and checks its interpolated value. | `@claim:add-keyframe`; live `/?demo=1`, demo screenshot. |
| F-5-3 | Expanded `three-exports` to grant clipboard access, copy every format, download every format, and byte-compare each downloaded file with its rendered output. | `@claim:three-exports`; live `/?demo=1`, demo screenshot. |
| F-5-4 | Rewrote both dynamic and direct 404 copy to “404”, “Page not found”, and “This address does not match a page on this site.” | `ships a complete, metadata-rich 404 shell`; live `/review-5-not-found` returned 404, 404 screenshot. |
| F-5-5 | Rewrote the Terms h1 to “Terms for using Motion Graph Sketchpad.” | `keeps every reviewed heading and action in plain words`; live `/terms`, terms screenshot. |

Review 3 reported no findings. Its cold-read, demo, claim, privacy, metadata, route, accessibility, and offline coverage is included in the live 29-test run above.

## Final live recheck

I reopened the public URL in a new Chromium context after deployment. The phone demo opens to the isolated Lantern drift sample with the persistent banner and reset/exit actions. The privacy route shows the Clear-sketch removal instruction. The Terms route uses the literal page-name h1. The deliberately missing route returns a direct HTTP 404 with the literal page-not-found copy, shared header/footer, and legal links. No finding from reviews 1–5 or earlier verification remains unresolved.
