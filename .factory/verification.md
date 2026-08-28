# Independent verification — FAIL

**Candidate:** `8f50cbd827dc7c0b8609aa00e16536899906aa64` (`8f50cbd docs: record audits and product handoff`)  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>  
**Verified:** 2026-08-28 (fresh clean checkout)

## Decision

**FAIL — do not release this candidate.** The core product and all declared claims work, and the live deployment is the candidate build. It nevertheless misses mandatory mobile accessibility touch-target sizing and immutable static-asset caching.

## First-read result

Cold live load at `/` answered the required questions in plain words:

- **Does:** “Sketch property motion before coding.”
- **For whom:** “For web and game creators testing animation without scripts or a full timeline editor.”
- **First action:** “Try it with sample data”; it opens `/demo` and loads the four-property “Lantern drift” sketch.

The demo banner is present: “Demo — sample data, nothing is saved,” with Reset demo and Start for real. This gate passes.

## Required claims — all pass

After `npm ci`, every command declared in `.factory/claims.json` passed from the local production demo entry point. Each run also passed the three Vitest tests.

| Claim ID | Command | Result |
| --- | --- | --- |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `local-only` | `npm test -- --grep @claim:local-only` | PASS |
| `three-exports` | `npm test -- --grep @claim:three-exports` | PASS |
| `demo-isolation` | `npm test -- --grep @claim:demo-isolation` | PASS |
| `eight-properties` | `npm test -- --grep @claim:eight-properties` | PASS |
| `deterministic-export` | `npm test -- --grep @claim:deterministic-export` | PASS |
| `keyboard-keyframes` | `npm test -- --grep @claim:keyboard-keyframes` | PASS |
| `free-no-account` | `npm test -- --grep @claim:free-no-account` | PASS |
| `json-import` | `npm test -- --grep @claim:json-import` | PASS |
| `drag-keyframes` | `npm test -- --grep @claim:drag-keyframes` | PASS |
| `easing-preview` | `npm test -- --grep @claim:easing-preview` | PASS |

## Build and automated checks

- `npm ci`: PASS; 0 audited vulnerabilities.
- `npm test`: PASS. Fresh follow-up `npm run test:unit` passed 3/3 and `npx playwright test --workers=4` passed 14/14 (`test-results/.last-run.json`: `passed`).
- `npm run build`: PASS. It runs `tsc && vite build` and produced `dist/`.
- Production bundle: JS 29.56 kB (10.00 kB gzip), CSS 19.45 kB (5.17 kB gzip); within the 200 kB JS and 50 kB CSS budgets. The mobile AVIF hero is 8.75 kB.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/demo`: PASS after creating its evidence directory. It found one title, `lang=en`, one `h1`, one `main`, no missing image alt text, no unlabeled buttons, and no console errors.
- Fresh live axe scan at `/demo`: 0 serious/critical violations (indeed 0 violations). No page or console errors observed in normal demo, export, route, keyboard, reduced-motion, or offline flows.

## End-to-end and deployment evidence

- Demo flow loaded the realistic four-property sample, showed its sandbox banner, exported valid JSON as `lantern-drift.json`, and kept network requests on `https://motion-graph-sketchpad.sociobot.in` only.
- Normal and boundary checks passed: ArrowRight changed a keyframe from 0 to 50 ms; duration clamped to 200 ms and 30,000 ms; a negative keyframe time clamped to 0; CSS, Web Animations, and JSON exports worked; keyboard and drag editing worked; the real sketch limit stopped at eight properties.
- At reduced motion, Play moved the preview directly to 2400 ms and announced the reduced-motion behavior. At 390px, no horizontal page overflow was observed. A keyboard Tab focused the skip link with a visible 3px cyan outline.
- Live service worker controlled the page after reload and a subsequent offline reload of `/demo` showed the sample and banner. Its source uses a versioned cache name, `skipWaiting`, `clients.claim`, and old-cache cleanup.
- `/`, `/demo`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, and the footer’s external link all returned HTTP 200. Privacy and terms have their expected route titles. The user-facing unknown route renders the styled “This frame does not exist” page.
- Local candidate `dist/assets/index-BBJDxDH4.js` and `dist/assets/index-CMcsOFeX.css` have byte-for-byte identical SHA-256 values to the files served live. The reported deployment-only failure is not reproduced.
- Live response policies include HSTS, CSP restricted to self, `X-Content-Type-Options: nosniff`, Referrer-Policy, and Permissions-Policy. This static client has no server-side product API or sign-in, so rate-limit and Entra checks are not applicable.

## Defects

### High — mandatory 44px mobile targets are not met

The live 390px `/demo` measures the primary draggable keyframe buttons at **31–35 × 31–35 CSS px** (their CSS base size is 22 × 22 px, enlarged slightly by rotation). They are the central editing control, so this makes touch manipulation materially harder. The persistent demo actions **Reset demo** and **Start for real** are 86 × 40 and 114 × 40 px respectively. Property-name inputs and unit selects are also 40 px tall.

This violates the attached accessibility and design contract: touch targets must be at least 44 × 44 px. Axe does not flag this WCAG 2.2 target-size issue, but it is a release-blocking factory requirement. Increase the actual hit areas (including keyframes and their spacing) to at least 44px and add a mobile geometry test.

### Medium — hashed static files are not cached immutably

Live `HEAD` responses for `/assets/index-BBJDxDH4.js`, `/assets/index-CMcsOFeX.css`, the AVIF hero, and `/sw.js` all return `Cache-Control: public, must-revalidate, max-age=30`. The performance contract requires long-lived immutable caching for hashed assets. Configure the deployment/static-web response headers so `/assets/*` hashed assets use a long immutable lifetime; keep HTML and the service worker short-lived/version-aware.

### Low — malformed JSON feedback leaks implementation details

Importing syntactically invalid JSON displays the raw parser message, and importing a top-level-valid but structurally malformed version-1 object (for example, a property with only `{ "id": "x" }`) displays `Cannot read properties of undefined (reading '0')`. The old demo remains visible and Reset demo recovers it, but this is not a plain-language validation error. Validate every property/keyframe field before rendering and report what is wrong plus the next action.

### Low — unknown paths have a user-facing 404 but HTTP 200

`/missing-frame` renders the correct styled not-found content and title, but the live response status is 200 due to SPA navigation fallback. If a true HTTP 404 is required for unknown direct URLs, adjust deployment routing without breaking the supported deep links.

## Required remediation and re-verification

1. Make all interactive mobile hit targets at least 44 × 44 CSS px, especially every keyframe, and add an automated 390px target-size test.
2. Set immutable caching for hashed `/assets/` files in the deployed response policy.
3. Deep-validate JSON imports and replace raw parser/TypeError output with plain recovery guidance.
4. Rebuild, deploy, then rerun all claims plus mobile, header, and invalid-import checks.
