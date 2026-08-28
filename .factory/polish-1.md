# Polish round 1 — finding resolution map

**Base candidate:** `a2dcb2d57e3c048d19a311bebc673ecc0d65fd18`  
**Repair:** `23ae3666a45205012bf3aefb586ab5fc555e4b3f`  
**Deployed URL:** <https://motion-graph-sketchpad.sociobot.in>

## Current adversarial review findings

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 — unexplained headings and jargon | Replaced “Shape the values” with “Edit motion property values,” “Small on purpose” with “What this sketchpad does not do,” the eyebrow with “Tool limits,” and the hero caption with “Test motion. Export the code.” | Live cold-browser assertion passed; screenshot: `/tmp/mgs-evidence/live/demo-mobile.png`; `npm test` passed. |
| F-1-2 — vague action names | Replaced `+ Number`, `+ Colour`, `Restart`, and `Start for real` with `Add number property`, `Add colour property`, `Restart preview`, and `Open my real sketch`. | Live cold-browser assertion passed for all four labels; `@claim:eight-properties`, `@claim:local-only`, and `npm test` passed. |
| F-1-3a — unlisted four-property demo claim | Added `demo-four-property-sample` to `claims.json`, its isolated one-click `?demo=1` route, and a tagged test that asserts “Lantern drift” plus Drift X, Lift, Scale, and Glow colour. | `npm test -- --grep @claim:demo-four-property-sample` passed from clean clone; live browser assertion passed; screenshot: `/tmp/mgs-evidence/live/demo-desktop.png`. |
| F-1-3b — unlisted timing-function count | Reworded the support note to “Choose from five standard timing functions,” added `five-standard-easings`, and tested all five selectable values. | `npm test -- --grep @claim:five-standard-easings` passed from clean clone; live browser inspected `linear`, `ease`, `ease-in`, `ease-out`, and `ease-in-out`. |
| F-1-3c — vague footer export claim | Replaced “ready-to-use code” with “Export CSS, Web Animations code, or JSON,” already covered by `three-exports`. | `npm test -- --grep @claim:three-exports` passed from clean clone; live demo exposes all three export tabs. |
| F-1-3d — unlisted account/network claim | Replaced broad README/privacy assertions with “The app has no accounts and makes no off-origin requests during the demo,” added `no-account-demo-network`, and exercised edit/download flow under network interception. | `npm test -- --grep @claim:no-account-demo-network` passed from clean clone; live cold-browser interceptor recorded `[]` off-origin requests. |

## Earlier verification findings

| Finding | Change made or retained | Evidence |
| --- | --- | --- |
| verification-1 High — mobile targets under 44 px | Earlier fix retained; rechecked the keyframes, demo actions, property inputs, and selects. | Live mobile check: 21 controls, all ≥44×44 px; no overflow; screenshot: `/tmp/mgs-evidence/live/demo-mobile.png`; `keeps primary mobile editing controls at least 44 pixels` passed. |
| verification-1 Medium — hashed assets not immutable | Earlier `staticwebapp.config.json` asset and service-worker policies retained. | Live `HEAD /assets/index-DQABXrZC.js`: `public, max-age=31536000, immutable`; live `HEAD /sw.js`: `no-cache, no-store, must-revalidate`; static-config unit tests passed. |
| verification-1 Low — raw malformed JSON errors | Earlier deep validation retained; rechecked syntax-invalid and structurally incomplete imports live. | Live browser observed “This file is not valid JSON…” and “Property 1 needs a name…” with no implementation error; `shows plain recovery guidance for malformed JSON imports` passed. |
| verification-1 Low — unknown route responded 200 | Earlier supported-route rewrites and response override retained. | Live `GET /missing-frame` returned 404 and rendered “This frame does not exist”; route test passed. |

## Full acceptance evidence

- Clean clone `/tmp/mgs-polish-clean-UwKNQi`: `npm ci`, all 14 `claims.json` commands, `npm test`, `npm run build`, and `npm audit --audit-level=high` passed.
- Claim-tag audit: exactly one test per declared claim.
- Local `verify-url.sh` passed at `http://127.0.0.1:4173/?demo=1` with no console errors and valid title/lang/main/h1/alt/button checks.
- Live cold-browser review: 0 Axe violations, no off-origin requests, real route titles and focus announcement, service-worker offline demo reload, and all linked first-party routes checked 200 except the intentional 404.
