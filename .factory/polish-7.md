# Polish 7 — cumulative adversarial repair

**Reviewed candidate:** `bbddc19ddb8b2c25dd6bef4b74a2c61064e4da0e`  
**Repair commits:** `b573f718b1c6ca1f7a91fe11c97ec0fe4003a6e1`, `8514909526b8888b11b77c77f27e577a31b39b40`  
**Deployment:** `c729bd5b-2462-412b-a379-5ec1919acd4f`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

## Evidence key

- Final clean clone: `/tmp/mgs-polish7-final-clean-XfJTIu` at `8514909`; `npm ci`, all 18 exact claim commands, and `npm run build` passed. Claim logs are `/tmp/mgs-polish7-final-claim-*.log`.
- Final local suite: `npm test` passed 12 unit and 34 Chromium tests; `npm run build` passed; `npm audit --audit-level=high` found zero vulnerabilities.
- Final live suite: `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test` passed 12 unit and 34 Chromium tests.
- Live accessibility: `/opt/fleet/lib/verify-url.sh` output is `/tmp/mgs-polish7-live-verify-F7vJcO/verify.json` (no errors); Playwright Axe reported zero violations on `/`, `/?demo=1`, `/privacy`, `/terms`, and `/polish-7-not-found` at 390 × 844.
- Live cold screenshots: [home](/tmp/mgs-polish7-live-cold-gvBjtI/home-1366x768.png), [demo](/tmp/mgs-polish7-live-cold-gvBjtI/demo-390x844.png), and [404](/tmp/mgs-polish7-live-cold-gvBjtI/not-found-390x844.png). The direct 404 body is `/tmp/mgs-polish7-live-cold-gvBjtI/not-found.html`.
- The deployed origin and local `dist/` matched byte-for-byte for all 22 public files. Lighthouse evidence is `/tmp/mgs-polish7-lighthouse-final.json`.

## Finding matrix

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept literal sketchpad and limits headings plus “Test motion. Export the code.” | `keeps every reviewed heading and action in plain words`; live home screenshot and `/`. |
| F-1-2 | Kept result-naming property, preview, and real-sketch actions. | Same plain-language test; live demo screenshot and `/?demo=1`. |
| F-1-3 | Kept the named four-property, timing-function, export, and same-site privacy claims with one tagged test each. | `demo-four-property-sample`, `five-standard-easings`, `three-exports`, and `no-account-demo-network`; all exact clean-clone commands passed. |
| Verification-1 High | Kept the 44 px target treatment and broad phone-control audit. | `keeps every visible mobile interactive target at least 44 pixels`; live 390 px suite passed. |
| Verification-1 Medium | Kept immutable `/assets/*` caching and an updateable no-store service worker. | `caches versioned build assets immutably while keeping the worker updateable`; live `sw.js` reports cache `v6`. |
| Verification-1 Low A | Kept deep import validation with plain recovery wording. | `shows plain recovery guidance for malformed JSON imports`; live suite passed. |
| Verification-1 Low B | Kept supported-route rewrites and the real Static Web Apps 404 override. | `rewrites only the supported SPA routes and preserves an HTTP 404 for unknown paths`; live `/polish-7-not-found` is HTTP 404. |
| F-2-1 | Kept the height-aware hero layout. | First-screen regression at 1366×768, 1440×900, 1536×864, 1920×1080, and 390×844; live home screenshot. |
| F-2-2 | Kept the sticky amber demo banner and its reset/exit controls. | `keeps demo controls visible and keyboard reachable after scrolling`; live `/?demo=1`. |
| F-2-3 | Kept all visible links, buttons, inputs, selects, and tabs at least 44 px on phone. | `keeps every visible mobile interactive target at least 44 pixels`; live 390 px suite. |
| F-2-4 | Kept the shared, metadata-rich direct 404 shell with legal links. | `ships a complete, metadata-rich 404 shell`; live 404 body and screenshot. |
| F-2-5 | Kept per-route title, description, canonical, Open Graph, and Twitter updates. | `sets route-specific metadata on every client route`; live `/demo`, `/privacy`, and `/terms` suite. |
| F-2-6 | Kept reset as a declared observable behavior. | `@claim:demo-reset`; exact clean-clone command and live suite passed. |
| F-2-7 | Kept sentinel-proven demo storage isolation. | `@claim:demo-isolation`; exact clean-clone command and live suite passed. |
| F-2-8 | Kept the concrete Web Animations registration wording and output. | `@claim:waapi-registers-properties`; exact clean-clone command and live suite passed. |
| F-2-9 | Kept literal process headings and the literal export label. | `keeps every reviewed heading and action in plain words`; live `/`. |
| F-2-10 | Kept outcome-first offline and same-site privacy wording. | `@claim:offline-reload` and `@claim:no-account-demo-network`; live suite passed. |
| F-2-11 | Kept “Web Animations” as the single export term. | `uses the reviewed Web Animations term and product-first demo wording`; live demo export control. |
| Review 3 | Preserved its zero-finding cold-read, route, accessibility, privacy, and offline behavior. | Full final live suite and Axe scan. |
| F-4-1 | Kept the product-first, isolated demo deck above the phone fold. | `@claim:demo-four-property-sample`; live demo screenshot and `/?demo=1`. |
| F-5-1 | Kept declared Clear-sketch removal and the plain privacy instruction. | `@claim:clear-sketch-data`; live `/privacy`. |
| F-5-2 | Kept playhead keyframe insertion with its interpolated-value assertion. | `@claim:add-keyframe`; live `/?demo=1`. |
| F-5-3 | Kept copy and file-download checks for CSS, Web Animations, and JSON. | `@claim:three-exports`; exact clean-clone command and live suite passed. |
| F-5-4 | Kept the literal 404 label, heading, and recovery message. | Direct live HTTP 404; [404 screenshot](/tmp/mgs-polish7-live-cold-gvBjtI/not-found-390x844.png). |
| F-5-5 | Kept the Terms h1 that names the page. | `keeps every reviewed heading and action in plain words`; live `/terms`. |
| F-6-1 | Kept the transition-aware eight-property claim test. | `@claim:eight-properties` passed independently in the final clean clone and in both final local/live parallel suites. |
| V5-1 | Kept full action/helper/fact bounds inside all required viewports. | Five first-screen browser regressions; [live desktop home](/tmp/mgs-polish7-live-cold-gvBjtI/home-1366x768.png). |
| V6-1 / F-7-1 | Implemented a complete ARIA tab pattern: typed export kinds, roving `tabindex`, `aria-controls`, an associated `tabpanel`, and wrapping Left/Right/Home/End selection with focus. | `uses a complete keyboard tab pattern for export formats`; exact live suite passes after CSS → ArrowRight focuses/selects Web Animations. |
| F-7-2 | Removed “Original generated imagery” from both visitor-facing footers; provenance remains in `.factory/design.md`. | `does not make an untestable generated-imagery claim in visitor copy`; live home, direct 404 body, and cold 404 screenshot contain no assertion. |

## Final live recheck

Fresh browser contexts confirmed the homepage’s job, audience, primary action, helper, and three facts without scrolling. The one-click `?demo=1` path opens the memory-only Lantern drift editor with its persistent banner, Reset demo, and Open my real sketch controls. The live export tabs now support Left/Right/Home/End keyboard selection, retain a single tab stop, and label the output panel. Privacy, Terms, metadata, focus/history behavior, 44 px mobile controls, offline reload, same-origin demo requests, legal links, and the literal direct 404 all passed the final live suite. No finding remains open.
