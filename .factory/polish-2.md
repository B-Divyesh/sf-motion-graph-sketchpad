# Polish round 2 — finding resolution map

**Base reviewed:** `4746a2e9fe89fc13c3421624894d1b3f9dbf961b`  
**Repair commit:** `f7cab95e827b47d9498938bf9c64cb74f868d25c`  
**Deployment:** `0f5b4a2e-6282-4f3d-bf49-3d03aae5bb16`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept literal sketchpad and limits headings, plus the literal hero caption. | Live cold check; `/tmp/mgs-polish2-live/home-1366x768.png`. |
| F-1-2 | Kept result-naming controls: Add number property, Add colour property, Restart preview, and Open my real sketch. | Live demo check; `@claim:eight-properties`; `@claim:demo-isolation`. |
| F-1-3 | Retained prior four-property, easing, export, and network claims; added claims for reset and Web Animations registration. | All 16 `claims.json` commands passed in `/tmp/mgs-polish2-clean`. |
| Verification-1 High: mobile targets | Made header/footer links and range inputs 44 px minimum; replaced the narrow selector with an audit of every visible interactive target. | `keeps every visible mobile interactive target at least 44 pixels`; live mobile audit found 0 undersized targets. |
| Verification-1 Medium: immutable assets | Retained asset and worker cache policies. | `static-config.test.ts`; live new asset is served from `/assets/`. |
| Verification-1 Low: import errors | Retained recovery wording for malformed JSON. | `shows plain recovery guidance for malformed JSON imports`. |
| Verification-1 Low: HTTP 404 | Retained the response override and expanded the direct 404 page. | Live `/missing-frame` returned HTTP 404. |
| F-2-1 | Added a short-desktop hero rule that reduces header/hero gaps and headline scale while retaining art; action, helper, and facts remain above 1366×768. | `keeps the complete desktop first action and facts above the fold`; live screenshot. |
| F-2-2 | Made the demo banner sticky with a high stacking level; reset and exit remain visible at page bottom. | `keeps demo controls visible and keyboard reachable after scrolling`; `/tmp/mgs-polish2-live/demo-mobile-bottom.png`. |
| F-2-3 | Applied 44 px minimum link sizing and audited all visible links, buttons, inputs, selects, textareas, and tabs at 390 px. | Full mobile-target regression; live audit found 0 undersized controls. |
| F-2-4 | Rebuilt `public/404.html` with shared skeleton, legal links, favicon, canonical, Open Graph/Twitter tags, and return action. | `ships a complete, metadata-rich 404 shell`; live HTTP-404 check. |
| F-2-5 | `setMetadata()` now updates title, description, canonical, Open Graph, and Twitter fields per route. | `sets route-specific metadata on every client route`; live Demo/Privacy/Terms checks. |
| F-2-6 | Added `demo-reset`; it edits, resets, and verifies Lantern drift, four properties, and 12 original keyframes. | `@claim:demo-reset` clean-clone pass and live reset check. |
| F-2-7 | Expanded `demo-isolation` to seed a distinctive real sketch and require exact real-storage bytes after demo exit. | `@claim:demo-isolation` clean-clone pass. |
| F-2-8 | Rewrote the support note with the concrete Web Animations outcome and added `waapi-registers-properties`. | `@claim:waapi-registers-properties` clean-clone pass. |
| F-2-9 | Replaced vague process headings with Add a motion property, Set keyframe times, Export animation code, and Export options. | Live cold copy check; `.factory/copy-audit.md`. |
| F-2-10 | Rewrote README/privacy browser jargon as offline reopening and same-site demo connection outcomes. | `@claim:offline-reload`; `@claim:no-account-demo-network`; live console/request check. |
| F-2-11 | Changed README’s broad JavaScript export name to the product term Web Animations. | README audit; `@claim:three-exports`. |

## Verification

- Fresh clone `/tmp/mgs-polish2-clean`: `npm ci` and `npm audit --audit-level=high` passed with 0 vulnerabilities.
- Every one of the 16 declared `npm test -- --grep @claim:<id>` commands passed individually. The complete claim file passed 15 Chromium tests; the quality file passed 8; the unit suite passed 7; `npm test` completed.
- `npm run build` emitted `dist/index.html`, `dist/404.html`, and `dist/staticwebapp.config.json`. Initial JavaScript is 10.63 kB gzip; CSS is 5.33 kB gzip.
- Local verifier: `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/?demo=1 /tmp/mgs-polish2-evidence`; screenshots `/tmp/mgs-polish2-evidence/home-1366x768.png` and `/tmp/mgs-polish2-evidence/demo-390x844.png`.
- Live verifier: `/opt/fleet/lib/verify-url.sh https://motion-graph-sketchpad.sociobot.in/?demo=1 /tmp/mgs-polish2-live`; zero console errors; live Axe reported 0 violations; live `/missing-frame` returned HTTP 404.
