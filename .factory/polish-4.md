# Polish round 4 — finding resolution map

**Candidate repaired:** `272bd93ee6ffb0a6beee4dcfc5eb4ee01c4715aa`  
**Review baseline:** `a0df59f87cc7a5f36f0a5d741caec9d8e8886b72`  
**Implementation commit:** `31d9d66b5319837c23406a55e18c78f0d3b20adf`  
**Deployment:** `d7a1137e-3527-43fe-a865-6acda29dc90d`  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

## Every cumulative finding

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 — vague headings and hero caption | Retained the literal sketchpad and limits headings and “Test motion. Export the code.” Added a regression covering every reviewed heading. | `keeps every reviewed heading and action in plain words`; live `/`; `/tmp/mgs-polish4-live/home-first-screen-390x844.png`. |
| F-1-2 — vague action labels | Retained Add number property, Add colour property, Restart preview, and Open my real sketch. | Same plain-copy regression; `@claim:eight-properties`; live `/demo`; `/tmp/mgs-polish4-live/demo-after-one-click-390x844.png`. |
| F-1-3 — missing claim inventory/tests | Retained all four-property, easing, export, deterministic, and same-site request entries. Strengthened `demo-four-property-sample` to prove the first-screen working editor. | All 16 `.factory/claims.json` commands passed independently in `/tmp/mgs-polish4-clean-ynqEXq`; claim-tag audit found exactly one test per claim. |
| Verification High — mobile targets under 44 px | Retained 44 px keyframe, input, link, button, select, and demo-action targets; the new compact demo uses 44 px controls. | `keeps every visible mobile interactive target at least 44 pixels`; live suite PASS; first-screen inputs and Play measured exactly 44 px high. |
| Verification Medium — immutable asset caching | Retained immutable `/assets/*` and no-cache service-worker policies. | `caches versioned build assets immutably while keeping the worker updateable`; live JS header `public, max-age=31536000, immutable`; live `sw.js` header `no-cache, no-store, must-revalidate`. |
| Verification Low A — raw JSON errors | Retained deep validation and plain recovery instructions. | `shows plain recovery guidance for malformed JSON imports`; `rejects structurally incomplete version 1 imports with recovery guidance`; live suite PASS. |
| Verification Low B — unknown URL returned 200 | Retained supported-route rewrites plus the true 404 response override. | `rewrites only the supported SPA routes and preserves an HTTP 404 for unknown paths`; live `/missing-frame` returned 404 and the designed shell. |
| F-2-1 — desktop action below fold | Retained the height-aware landing hero. | `keeps the complete desktop first action and facts above the fold`; `/tmp/mgs-polish4-local/home-first-screen-1366x768.png`; live `/` returned 200. |
| F-2-2 — demo banner not persistent | Retained the sticky amber banner with Reset and exit actions. | `keeps demo controls visible and keyboard reachable after scrolling`; live `/demo` suite PASS; demo screenshot above. |
| F-2-3 — incomplete mobile target fix | Retained the all-interactive-elements geometry audit, including header and footer links. | `keeps every visible mobile interactive target at least 44 pixels`; live suite PASS at 390 × 844. |
| F-2-4 — incomplete direct 404 | Retained the shared header/footer, metadata, legal links, and return action in `404.html`; bumped its build label. | `ships a complete, metadata-rich 404 shell`; live `/missing-frame` 404; captured response `/tmp/mgs-polish4-live/404.html`. |
| F-2-5 — stale route metadata | Retained per-route title, description, canonical, Open Graph, and Twitter updates. | `sets route-specific metadata on every client route`; live suite PASS for `/demo`, `/privacy`, and `/terms`. |
| F-2-6 — reset claim absent | Retained the `demo-reset` claim and full sample restoration check. | `@claim:demo-reset` passed independently and against live `/demo`. |
| F-2-7 — demo could read real storage | Retained the sentinel-based read/write isolation check and memory-only demo state. | `@claim:demo-isolation` passed independently and against live `/?demo=1`. |
| F-2-8 — unclear browser-support claim | Retained the concrete Web Animations registration statement and output test. | `@claim:waapi-registers-properties` passed independently and against live `/demo`. |
| F-2-9 — metaphorical process labels | Retained Add a motion property, Set keyframe times, Export animation code, and Export options. | `keeps every reviewed heading and action in plain words`; `.factory/copy-audit.md`; live suite PASS. |
| F-2-10 — README browser jargon | Retained result-first offline and same-site request wording. | `@claim:offline-reload` and `@claim:no-account-demo-network` passed independently and live. |
| F-2-11 — inconsistent JavaScript/Web Animations term | Retained Web Animations everywhere and added a source-level copy contract. | `uses the reviewed Web Animations term and product-first demo wording`; `@claim:three-exports`. |
| Review 3 | It contained no findings. All its cold-read, claim, privacy, history, accessibility, routing, and copy checks were rerun. | Clean combined suite and live 26-test run passed; live Verify URL found no console errors. |
| F-4-1 — demo first screen repeated the landing hero | Replaced the demo hero with a compact, real editing deck. The first phone screen now contains the persistent banner, sample name, four editable property inputs, and working preview controls; the full keyframe editor follows. | `@claim:demo-four-property-sample`; live 390 × 844 measurements end at y=703; `/tmp/mgs-polish4-live/demo-after-one-click-390x844.png`; live `/?demo=1`. |

## Final verification evidence

- Fresh clone: `/tmp/mgs-polish4-clean-ynqEXq` at `31d9d66`; `npm ci` reported 0 vulnerabilities.
- Claims: all 16 declared commands passed independently; the tag audit found one tagged test per declaration.
- Combined suite: 10 unit tests and 27 Chromium tests after the final evidence additions.
- Build: `dist/index.html` exists; initial JS is 34.08 kB / 10.91 kB gzip and CSS is 22.28 kB / 5.72 kB gzip.
- Local Verify URL: `/tmp/mgs-polish4-local-verify/verify.json`; no console errors, one h1, one main, `lang=en`, no missing alt text, no unlabeled buttons.
- Live Verify URL: `/tmp/mgs-polish4-live/verify/verify.json`; the same checks passed with no console errors.
- Live browser suite: all claim, offline, privacy, mobile, focus/history, metadata, legal-link, reduced-motion, and Axe checks passed against the production origin.
- Live Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.3 s, CLS 0, TBT 70 ms. Report: `/tmp/mgs-polish4-live/lighthouse.json`.
- Live artifact hashes match `dist`: JS `194e0b84601a9ce42117fa1c2338840585e78a9ed51516bcf9095fb259c0dfd7`; CSS `09c6df6b4b3843174ace4799d95e52e52dbc298e884ab44e8f272b092f8a17d7`.

No finding from any review, polish report, or independent verification remains open.
