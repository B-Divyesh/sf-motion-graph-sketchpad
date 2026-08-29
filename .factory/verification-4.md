# Independent verification 4 — PASS

**Verified:** 2026-08-29  
**Candidate:** `f2ead240f04008309ceb2784dcda7ffd829eae2a` (`docs: record round five release evidence`)  
**Live URL:** <https://motion-graph-sketchpad.sociobot.in>

## Release decision

**PASS.** Fresh local and deployed-site evidence confirms the candidate meets the researched brief: it is a local-first browser sketchpad for web and game creators to prototype numeric/colour property animation, preview easing, and export deterministic CSS, Web Animations code, or JSON. No release-blocking defect was found.

The previously reported deployment-only failure did not reproduce. The deployed HTML, JavaScript, CSS, service worker, manifest, favicon, robots/sitemap, hero AVIF, and social preview were byte-for-byte identical to this candidate's `dist/` output.

## Required first read

A cold visit to `/` plainly answered all three required questions:

- **What it does:** “Sketch property motion before coding.”
- **For whom:** “For web and game creators testing animation without scripts or a full timeline editor.”
- **What to click first:** the visible **Try it with sample data** action, with “Loads a four-property motion sketch.” immediately beside it.

One click opened `/?demo=1` with the isolated **Lantern drift** sample, all four named properties, a working preview, and the persistent “Demo — sample data, nothing is saved” banner with **Reset demo** and **Open my real sketch**. This gate passes.

## Clean-checkout claims gate

The clean worktree began at the requested commit. After `npm ci`, `.factory/claims.json` was present and every declared command was run separately through the local production demo entry point. All passed (each command also ran the 11 Vitest tests):

| Claim | Exact command result |
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

The exact form was `npm test -- --grep @claim:<id>` for every row. The manifest declares 18 claims and the content-contract unit test confirms exactly one tagged test per claim.

## Build and test evidence

- `npm ci`: PASS; `npm audit --audit-level=high`: 0 vulnerabilities.
- Local `npm test`: PASS — 11 Vitest tests and 29 Chromium tests.
- Production `npm run build`: PASS — runs `tsc && vite build` and emitted `dist/`. There is no separate lint command; TypeScript checking is part of the production build.
- Live `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test`: PASS — 11 Vitest tests and all 29 Chromium tests against deployment.
- `/opt/fleet/lib/verify-url.sh https://motion-graph-sketchpad.sociobot.in/?demo=1`: PASS — HTTP 200, `lang=en`, title, one `h1`, one `main`, no missing image alt text, no unlabeled buttons, and no console errors.
- Live Lighthouse (mobile): Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP 1.2 s, LCP 1.3 s, CLS 0, TBT 30 ms.
- Built initial JS is 34.09 kB raw / **10.90 kB gzip**; CSS is 22.28 kB raw / **5.72 kB gzip**. The largest hero candidate is 31,994 B WebP / 22,191 B AVIF. All are within the stated budgets.

## Product and accessibility exercise

- Normal flow: the sample preview played; CSS, Web Animations, and JSON outputs copied/downloaded with deterministic contents. JSON import loaded a valid version-1 sketch.
- Boundaries and recovery: the real editor stopped adding properties at 8; keyframes moved by Arrow keys (50 ms and Shift+Arrow 250 ms); dragging changed time; add-keyframe created the interpolated value at the playhead; malformed and structurally incomplete JSON showed plain recovery guidance while retaining the sample; clearing a real sketch removed its saved contents.
- Desktop and 390 × 844 mobile: no horizontal overflow; all visible controls measured at least 44 × 44 CSS px; demo controls remain reachable after scroll.
- Keyboard: skip link, navigation, labelled controls, keyframes, export tabs, and demo controls are operable. Focus uses a visible 3 px cyan outline. Route navigation moves focus to and announces the new `h1`.
- Reduced motion: preview playback immediately selects the final 2400 ms frame and announces the behavior.
- Axe: the local and deployed 29-test suite scanned `/`, `/demo`, `/privacy`, and `/terms` with zero violations (therefore zero serious/critical findings). No page or console errors were seen in independent cold, demo, mobile, reduced-motion, offline, or export flows.

## Privacy, PWA, headers, and deployment identity

- Fresh live demo request logging during edit/export/playback recorded only same-origin requests to `https://motion-graph-sketchpad.sociobot.in`; no analytics, third-party resources, account, sign-in, payment, or checkout UI was present. Demo state is memory-only and real sketches use local browser storage.
- After an online visit and reload, the active service worker at `/sw.js` controlled the page; `registration.update()` completed with no waiting worker. An offline reload of `/demo` retained the sample heading and demo banner without errors.
- `/`, `/demo`, `/privacy`, `/terms`, `/sw.js`, manifest, robots, sitemap, and assets returned expected 200 responses; a fresh unknown route returned HTTP 404 with the designed page. HTML has short revalidation caching; `/sw.js` is `no-cache, no-store, must-revalidate`; hashed JS/CSS are `public, max-age=31536000, immutable`.
- Responses include HSTS, `X-Content-Type-Options: nosniff`, strict-origin referrer policy, a self-restricted CSP with `frame-ancestors 'none'`, and a restrictive permissions policy.
- Candidate/live SHA-256 matches include JS `c0556aa70cddabdcdd6c793b6113ed511420b4596c59ada44b63b1e30319b4fd`, CSS `09c6df6b4b3843174ace4799d95e52e52dbc298e884ab44e8f272b092f8a17d7`, and service worker `c4028d508ee68ba9a8612a865917187ee32204b5e38be3308a163105233dbc56`.
- This is a static client with no product API/server-side endpoint and no authentication. Rate-limit/429/`Retry-After` and Entra-tenant checks are therefore not applicable.

## Defects by severity

| Severity | Count | Findings |
| --- | ---: | --- |
| Blocker | 0 | None |
| Critical | 0 | None |
| High | 0 | None |
| Medium | 0 | None |
| Low | 0 | None |

