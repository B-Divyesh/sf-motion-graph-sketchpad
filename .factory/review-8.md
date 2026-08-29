# Adversarial first-read review 8 — FAIL

**Reviewed:** 2026-08-29  
**Live site:** <https://motion-graph-sketchpad.sociobot.in>  
**Repository base:** `221eb421b7eed6981d6ca25578a97594759c165a`

## Verdict

**FAIL.** The first-read, sample path, claims, routing, privacy request log, and visual identity pass. Two findings remain, including one historical mobile-target defect that is still incomplete. A PASS requires zero findings.

## Findings

### Blocking — F-2-3 (reopened): Privacy contact link misses the 44 px phone target rule

**Location / exact copy:** `/privacy` at 390 × 844, the `mailto:` link **“privacy@sociobot.in”** in the “Contact” section.

**Evidence:** Its live bounding box is **190 × 20 CSS px**. The page has no horizontal overflow and Axe reports no violation, but the factory touch-target requirement is 44 × 44 px. The existing regression named “keeps every visible mobile interactive target at least 44 pixels” visits only `/demo`, so it cannot detect this link.

**Why this is blocking:** this is the unfinished remainder of the earlier all-visible-mobile-target finding, F-2-3. A phone visitor has a visibly small tap target for the only contact action. The history rule requires it to be blocking again until the broad claim is true on every route.

**Concrete fix:** give the Contact email link an explicit `inline-flex` 44 px minimum hit area while retaining its underlined link affordance. Expand the regression to visit `/`, `/demo`, `/privacy`, `/terms`, and the direct 404, then measure every visible interactive control (excluding genuinely screen-reader-only inputs).

### Minor — F-8-2: Direct 404 exposes a stale build identifier

**Location / exact copy:** live direct unknown route `/review-8-audit-not-found` footer reads **“v1.0.7”**. The current footer on `/`, `/demo`, `/privacy`, and `/terms` reads **“v1.0.8”**.

**Why this matters:** the direct 404 is a real route in the product skeleton. Showing a different version makes the header/footer handoff inconsistent and makes it unclear which build a visitor is using.

**Concrete fix:** generate the direct `404.html` footer from the same build identifier as the app, or update it as part of every release. Add a direct-404 assertion that its build identifier equals the normal-route footer.

## Cold first read

Fresh browser contexts, no persisted storage, loaded `/` before scrolling.

| Viewport | What it does | For whom | What to click first | Result |
| --- | --- | --- | --- | --- |
| 390 × 844 | “Sketch property motion before coding.” | “For web and game creators testing animation without scripts or a full timeline editor.” | **Try it with sample data** — “Loads a four-property motion sketch.” | Pass; action and all three facts end at y=742.0. |
| 1366 × 768 | Same headline. | Same audience sentence. | **Try it with sample data** and its result. | Pass; facts end at y=641.0. |

The first screen answers all three questions. There is no first-read blocking copy problem.

## Copy audit

Counts treat hyphenated terms, product names, URLs, and code identifiers as one word. Every landing and README sentence-like item is listed below. No item exceeds 22 words. No banned marketing adjective, unexplained/mood heading, inconsistent product term, or non-result-naming button was found. Product claims map to the named claims below; setup and deployment instructions were executed or inspected as documentation, rather than treated as marketing claims.

### Landing page (`/`)

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Clear skip action |
| Motion Graph Sketchpad | 3 | Wordmark |
| Demo / Sketchpad / Privacy | 1 each | Literal navigation |
| Sketch property motion before coding | 5 | Plain H1 job |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Audience and situation |
| Try it with sample data | 6 | Result-naming action |
| Loads a four-property motion sketch. | 5 | `demo-four-property-sample` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Sketches stay in this browser. | 5 | `local-only` |
| Free. / No account. | 1 / 2 | `free-no-account` |
| A dark animation desk overlooks mountains crossed by cyan motion paths. | 10 | Useful image alt |
| Test motion. / Export the code. | 2 / 3 | `easing-preview`; `three-exports` |
| The sketchpad / Edit motion property values | 2 / 4 | Literal section label and H2 |
| Drag keyframes sideways. / Use arrow keys for 50 ms steps. | 3 / 7 | `drag-keyframes`; `keyboard-keyframes` |
| Play preview / Restart preview / Playhead | 2 / 2 / 1 | Literal controls |
| No properties yet. | 3 | Clear empty state |
| Sketch name / Duration / ms | 2 / 1 / 1 | Bound labels |
| Import JSON / Clear sketch | 2 / 2 | Result-naming actions; `json-import`, `clear-sketch-data` |
| Add property / Add number property / Add colour property / 0/8 | 2 / 3 / 3 / 1 | Literal controls |
| Add the first property | 4 | Clear empty-state heading |
| Its keyframes and motion path will appear here. | 8 | Clear empty-state outcome |
| Three moves / How it works | 2 / 3 | Literal section label and H2 |
| Add a motion property | 5 | Literal H3 |
| Add up to eight number or colour properties. | 8 | `eight-properties` |
| Set keyframe times | 3 | Literal H3 |
| Add keyframes, drag their times, and choose easing. | 8 | `add-keyframe`, `drag-keyframes`, `easing-preview` |
| Export animation code | 3 | Literal H3 |
| Copy CSS, Web Animations code, or stable JSON. | 8 | `three-exports`, `deterministic-export` |
| Tool limits / What this sketchpad does not do | 2 / 6 | Literal section label and H2 |
| This tool does not rig characters, render video, or manage teams. | 11 | Clear scope limit |
| It tests plain values before you open a larger editor. | 10 | Clear scope explanation |
| No account exists. | 3 | `free-no-account` |
| Your real sketch uses local browser storage. | 7 | `local-only` |
| Demo changes disappear when you leave. | 6 | `demo-isolation` |
| Export CSS, Web Animations code, or JSON. | 7 | `three-exports` |
| Terms / Built by Param Factory / (external site) | 1 / 4 / 2 | Literal footer links |
| v1.0.8 | 1 | Normal-route build id |

### README

| Sentence or instruction | Words | Check |
| --- | ---: | --- |
| Motion Graph Sketchpad | 3 | Literal title |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Plain description |
| The tool is for web and game creators. | 8 | Audience |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Declared feature claims |
| Live site: https://motion-graph-sketchpad.sociobot.in | 2 | Link |
| Try the isolated demo | 4 | Literal heading |
| Open https://motion-graph-sketchpad.sociobot.in/?demo=1. | 2 | Direct action |
| It opens the “Lantern drift” sample with four animated properties in a working editor. | 14 | `demo-four-property-sample` |
| Demo edits use memory only and disappear when you leave. | 10 | `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | `demo-reset` |
| Use Open my real sketch to leave the demo. | 9 | Literal exit instruction |
| Run locally / Requirements: Node.js 20 or newer. | 2 / 5 | Setup heading and requirement |
| Open http://localhost:5173/?demo=1 for the sample or / for a real sketch. | 10 | Local-use instruction |
| Test and build | 3 | Literal heading |
| The exact production build command is npm run build. | 8 | Executed documentation |
| It writes the static site to dist/, with dist/index.html at the root. | 11 | Build output verified |
| Run one public claim by its tag. | 7 | Instruction |
| Claim definitions and sandbox steps are in .factory/claims.json. | 8 | Repository pointer |
| The demo contract is in .factory/demo.md. | 7 | Repository pointer |
| Controls | 1 | Literal heading |
| Drag a keyframe left or right to change its time. | 10 | `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 13 | `keyboard-keyframes` |
| Add a keyframe at the current playhead. | 7 | `add-keyframe` |
| Choose an easing name in the selected keyframe panel. | 9 | `five-standard-easings` |
| Import a JSON sketch or download CSS, Web Animations, and JSON files. | 11 | `json-import`, `three-exports` |
| Data and offline use | 4 | Literal heading |
| Real sketches use one localStorage key: motion-graph-sketchpad:sketch:v1. | 6 | Implementation detail checked by isolation flow |
| Use Clear sketch in the editor to remove a saved sketch from this browser. | 14 | `clear-sketch-data` |
| Demo mode does not read or write that key. | 9 | `demo-isolation` |
| After one online visit, the browser stores the files needed to reopen the app offline. | 15 | `offline-reload` |
| The app has no accounts. | 5 | `no-account-demo-network` |
| During the demo, it connects only to this website. | 9 | `no-account-demo-network` |
| See the privacy page. | 4 | Link instruction |
| Deployment | 1 | Literal heading |
| Deploy the contents of dist/ as a static site. | 9 | Deployment instruction |
| staticwebapp.config.json includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 13 | Config inspected and live headers checked |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Scope instruction |
| License / MIT. / See LICENSE. | 1 / 1 / 2 | Literal license material |

## Demo, sandbox, and claims

- One click from the cold home route opens `?demo=1` into “Lantern drift,” four named editable properties, and a working preview. The banner says **“Demo — sample data, nothing is saved”** and contains **Reset demo** and **Open my real sketch**.
- In a fresh context, demo localStorage had no real-sketch key. The declared isolation test also seeds a real sentinel, edits the demo, exits, and proves the sentinel is unchanged. Reset restores the original four-property sample.
- The live request log during cold home → demo → edit/export contained only `https://motion-graph-sketchpad.sociobot.in`. No console errors occurred.
- The banner remained at y=0–75.3 on the phone and y=0–52 on desktop after scrolling to the document bottom.

All 18 exact commands in `.factory/claims.json` passed independently from fresh clone `/tmp/mgs-review8-clean-Zf2Rtw`, against the live origin. `npm run build` also passed and produced `dist/` (11.13 kB gzip JavaScript).

| Claim IDs | Result |
| --- | --- |
| `offline-reload`, `local-only`, `three-exports`, `demo-isolation`, `eight-properties`, `deterministic-export` | PASS |
| `keyboard-keyframes`, `free-no-account`, `json-import`, `drag-keyframes`, `easing-preview`, `demo-four-property-sample` | PASS |
| `five-standard-easings`, `no-account-demo-network`, `demo-reset`, `waapi-registers-properties`, `clear-sketch-data`, `add-keyframe` | PASS |

## Earlier findings: fresh live and code recheck

Every earlier `review-*.md`, `polish-*.md`, verification record, and handoff was read. The following are current checks, not accepted status labels.

| Earlier finding | Current result |
| --- | --- |
| F-1-1 | Fixed: literal headings, limits, and export caption remain. |
| F-1-2 | Fixed: add-property, restart-preview, and real-sketch actions name results. |
| F-1-3 | Fixed: sample, timing, export, and same-origin claims retain tagged tests. |
| Initial verification: target/cache/import/404 findings | Cache headers, plain import recovery, and real 404 pass; target coverage is incomplete as reopened F-2-3. |
| F-2-1 | Fixed: desktop action, helper, and facts fit above the fold. |
| F-2-2 | Fixed: sticky banner and controls remain visible after scroll. |
| F-2-3 | **Unfixed: reopened as the blocking finding above.** |
| F-2-4 | Fixed: direct 404 has header, footer, legal links, metadata, one h1/main, and return action. |
| F-2-5 | Fixed: normal app routes set route-specific title, description, canonical, OG, and Twitter metadata. |
| F-2-6 | Fixed: Reset has a declared restoration test. |
| F-2-7 | Fixed: demo isolation proves neither real-storage read nor write. |
| F-2-8 | Fixed: Web Animations registration wording is concrete and output-tested. |
| F-2-9 | Fixed: process and export headings are literal. |
| F-2-10 | Fixed: README uses outcome-first offline and same-site wording. |
| F-2-11 | Fixed: “Web Animations” is used consistently. |
| F-4-1 | Fixed: phone demo is product-first with visible sample and preview. |
| F-5-1 | Fixed: Clear sketch removal is declared and tested. |
| F-5-2 | Fixed: adding an interpolated keyframe is declared and tested. |
| F-5-3 | Fixed: export copy and three downloads are tested. |
| F-5-4 | Fixed: direct 404 says “Page not found.” |
| F-5-5 | Fixed: Terms H1 names the page. |
| F-6-1 | Fixed: eight-property test passed independently, including this review. |
| V5-1 | Fixed: first-screen content fits at 1366×768, 1440×900, 1536×864, 1920×1080, and 390×844. |
| V6-1 / F-7-1 | Fixed: export tabs implement roving focus and Arrow/Home/End behavior. |
| F-7-2 | Fixed: no visitor-facing generated-imagery provenance claim remains. |
| V7-1 / V7-2 / V7-3 | No regression observed: quality tests include the release gate, visible Import JSON focus, and explained duration clamping. |

## Structure, accessibility, routing, and identity

- `/`, `/demo`, `/privacy`, and `/terms` return 200; the deliberate missing route returns 404. Normal routes have titles, descriptions, canonicals, OG/Twitter data, favicon, `lang=en`, one h1, one main, shared header/footer, Privacy/Terms, and no console errors.
- The direct 404 is designed, contains the required legal links and metadata, and returns to the sketchpad. Its stale footer version is F-8-2.
- Link crawl: all first-party destinations and Param Factory returned 200; the contact destination is an explicit `mailto:` link.
- Client route navigation moves focus and the polite announcement to the next H1; browser Back restored `?demo=1` and focused “Edit a sample motion sketch.”
- Axe 4.10.2 returned zero violations on all five checked routes. There is no horizontal phone overflow. The separate 44 px factory rule reveals F-2-3 despite Axe passing.
- The dark editing-bay art, cyan graph paths, amber keyframes, mono utility type, asymmetric hero, and chamfered panels match `.factory/design.md` and are product-specific, not a generic SaaS template.

## Missed leverage

The brief implies direct property editing plus interoperability, not remote generation. JSON import and CSS, Web Animations, and JSON export already provide the expected import/export path. No necessary AI or sync feature is missing, and no provider key or decorative AI feature was found.

## What would make this perfect

Make every real-route touch target meet 44 × 44 px, including the Privacy contact link, and test that broad rule across the whole route set. Generate the direct 404 build id from the same source as the app footer. Then rerun this complete cold-read, demo, claim, request-log, route, and history review with zero findings.
