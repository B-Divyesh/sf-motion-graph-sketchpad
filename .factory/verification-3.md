# Independent verification 3 — PASS

**Verified:** 2026-08-29  
**Candidate:** `bf98578619269ca754d4e1ff5f40e6f0b28f87ee`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

## Release decision

**PASS.** No release-blocking defect was found. The live deployment is the production output of the candidate: the built JS and CSS are byte-identical to the files served by the live site, and the service worker, manifest, favicon, and sampled image assets also matched byte-for-byte.

## Cold first read

On a fresh desktop visit, the first screen says “Sketch property motion before coding.” It says it is for “web and game creators” testing animation without scripts or a full timeline editor. The prominent first action is **Try it with sample data**, with the adjacent explanation “Loads a four-property motion sketch.” It therefore answers what it does, for whom, and what to click first in plain words. One click opened the isolated Lantern drift sample.

At 390 × 844, the direct demo showed the persistent “Demo — sample data, nothing is saved” banner, Reset demo / Open my real sketch controls, Lantern drift, all four named properties, and working preview controls without horizontal overflow.

## Clean-checkout verification

- Began at the requested candidate commit with a clean worktree; ran `npm ci`.
- `.factory/claims.json` exists and declares 16 claim tests. Ran each declared command separately through the product's local demo entry point. All passed: `offline-reload`, `local-only`, `three-exports`, `demo-isolation`, `eight-properties`, `deterministic-export`, `keyboard-keyframes`, `free-no-account`, `json-import`, `drag-keyframes`, `easing-preview`, `demo-four-property-sample`, `five-standard-easings`, `no-account-demo-network`, `demo-reset`, and `waapi-registers-properties`.
- `npm test`: PASS — 10 unit tests and 27 Chromium tests. This covers the real/demo storage boundary, offline reload, exports and import, malformed JSON recovery, 1–8 properties, easing preview, drag and keyboard editing, demo reset, metadata/routes/history, mobile layout and target size, reduced motion, and Axe.
- `npm run build`: PASS. `tsc` and Vite produced `dist/`.
- No separate lint script exists. Type checking is part of the production build. `npm audit --audit-level=high` found 0 vulnerabilities.

## Live verification

- `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm run test:e2e`: PASS — all 27 Chromium tests, including all 16 claims, against deployment.
- Independent live Playwright smoke at 390 × 844: one `<main>` and one `<h1>`; title `Demo — Motion Graph Sketchpad`; no console errors or page errors; no Axe serious or critical violations; 390 px document width at a 390 px viewport; Reset demo restored `Lantern drift`.
- Keyboard-only smoke began with the skip link and reached demo controls, navigation, labelled inputs, preview controls, property/keyframe controls, and export controls. Focus styling is a visible 3 px cyan outline.
- Reduced-motion smoke moved the preview directly to 2400 ms and announced “Motion is reduced in your settings.”
- Service worker: one registration controls the page at `/sw.js`; an explicit `registration.update()` succeeded with no waiting worker. After a first online load and reload, `context.setOffline(true)` followed by reload still rendered the demo and banner with no console error.
- Privacy: a fresh demo edit, JSON export/download, and reset generated six browser requests, all same-origin. No account, sign-in, checkout, payment, analytics, or third-party request was observed. The product is static and exposes no server-side product endpoint, so a 429/`Retry-After` allowance is not applicable. It has no sign-in flow.
- Headers: live `/`, `/demo`, `/privacy`, `/terms`, `/sw.js`, manifest, robots, sitemap, and 404 were checked. HTML routes returned 200; a missing route returned 404. Responses include CSP with `frame-ancestors 'none'`, HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, and a restrictive permissions policy. `/sw.js` is no-store; hashed JS/CSS are `public, max-age=31536000, immutable`.
- Build/deploy identity: live `index-5CDAaUuK.js` SHA-256 `194e0b84601a9ce42117fa1c2338840585e78a9ed51516bcf9095fb259c0dfd7` and `index-DCM3P66X.css` SHA-256 `09c6df6b4b3843174ace4799d95e52e52dbc298e884ab44e8f272b092f8a17d7` equal local `dist/`. The deployment-only failure did not reproduce.

## Budget and accessibility evidence

- Initial JS: 34.08 kB / 10.91 kB gzip; CSS: 22.28 kB / 5.72 kB gzip. Both are within the static-product limits. The largest responsive hero candidate is 31,994 bytes WebP (22,191 bytes AVIF), below the 300 kB mobile budget.
- Self-hosted fonts only; no CDN script or font request.
- Semantic landmarks, titles, language, alt text, focus treatment, touch-target coverage, and reduced-motion behavior passed local and live checks. Axe found no serious/critical issue.

## Defects

None found. Severity counts: blocker 0, critical 0, high 0, medium 0, low 0.
