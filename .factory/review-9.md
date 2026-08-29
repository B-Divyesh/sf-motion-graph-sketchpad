# Adversarial first-read review 9 — PASS

**Reviewed:** 2026-08-29  
**Live site:** <https://motion-graph-sketchpad.sociobot.in>  
**Repository revision:** `1eab90f9c0c9ce829eb1b597025e5c824349b051`

## Verdict

**PASS.** No blocking, major, medium, or minor finding remains. The cold first read is clear, the one-click demo is product-first and isolated, every declared claim passed independently from a clean checkout, and the live product passed the full browser suite. There are no untested declared claims and no unlisted claim-like sentence on the landing page.

## Cold first read

Fresh Chromium contexts (new browser storage) opened `/` at scroll position zero. No console errors or horizontal overflow occurred.

| Viewport | What it does | For whom | What to click first | Result |
| --- | --- | --- | --- | --- |
| 390 × 844 | “Sketch property motion before coding” | “For web and game creators testing animation without scripts or a full timeline editor.” | **Try it with sample data** — “Loads a four-property motion sketch.” | Pass. The action helper and all three facts fit in the first screen. |
| 1440 × 900 | Same literal job statement | Same named audience | Same primary action and adjacent result | Pass. |

The three cold-screen facts are specific and declared: “Works offline after the first visit,” “Sketches stay in this browser,” and “Free. No account.” The first screen therefore answers what it does, for whom, and what to do first without scrolling.

## Copy audit

Counts treat hyphenated terms, product names, URLs, and code identifiers as one word. Repeated navigation labels are listed once. Sample values and generated export text are data, not authored copy. No authored sentence exceeds 22 words. No banned marketing adjective, unexplained/mood heading, inconsistent term, or non-result-naming button was found. Claim-like statements name their associated claim below.

### Landing page (`/`)

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Clear link |
| Motion Graph Sketchpad | 3 | Wordmark / product name |
| Demo / Sketchpad / Privacy / Terms | 1 each | Literal navigation |
| Sketch property motion before coding | 5 | Plain job H1 |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Names audience and situation |
| Try it with sample data | 5 | Result-naming action |
| Loads a four-property motion sketch. | 5 | `demo-four-property-sample` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Sketches stay in this browser. | 5 | `local-only` |
| Free. / No account. | 1 / 2 | `free-no-account` |
| A dark animation desk overlooks mountains crossed by cyan motion paths. | 11 | Useful image alt text |
| Test motion. / Export the code. | 2 / 3 | `easing-preview`; `three-exports` |
| The sketchpad / Edit motion property values | 2 / 4 | Literal section label and H2 |
| Drag keyframes sideways. / Use arrow keys for 50 ms steps. | 3 / 7 | `drag-keyframes`; `keyboard-keyframes` |
| Play preview / Restart preview / Playhead | 2 / 2 / 1 | Literal controls |
| No properties yet. | 3 | Clear empty state |
| Sketch name / Duration / ms | 2 / 1 / 1 | Bound labels |
| Import JSON / Clear sketch | 2 / 2 | Result-naming controls; `json-import`; `clear-sketch-data` |
| Add property / Add number property / Add colour property / 0/8 | 2 / 3 / 3 / 1 | Literal controls |
| Add the first property | 4 | Clear empty-state heading |
| Its keyframes and motion path will appear here. | 8 | Clear empty-state outcome |
| Three moves / How it works | 2 / 3 | Informative section label and heading |
| Add a motion property | 5 | Literal H3 |
| Add up to eight number or colour properties. | 8 | `eight-properties` |
| Set keyframe times | 3 | Literal H3 |
| Add keyframes, drag their times, and choose easing. | 8 | `add-keyframe`; `drag-keyframes`; `five-standard-easings` |
| Export animation code | 3 | Literal H3 |
| Copy CSS, Web Animations code, or stable JSON. | 8 | `three-exports`; `deterministic-export` |
| Tool limits / What this sketchpad does not do | 2 / 6 | Literal label and H2 |
| This tool does not rig characters, render video, or manage teams. | 11 | Specific scope limit |
| It tests plain values before you open a larger editor. | 10 | Useful scope explanation |
| No account exists. | 3 | `free-no-account` |
| Your real sketch uses local browser storage. | 7 | `local-only` |
| Demo changes disappear when you leave. | 6 | `demo-isolation` |
| Export CSS, Web Animations code, or JSON. | 7 | `three-exports` |
| Built by Param Factory / external site | 4 / 2 | Attribution and destination note |
| v1.0.9 | 1 | Build identifier |

### README

| Sentence, heading, or instruction | Words | Check |
| --- | ---: | --- |
| Motion Graph Sketchpad | 3 | Product name |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Plain job statement |
| The tool is for web and game creators. | 8 | Audience |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Feature claims are declared |
| Live site: https://motion-graph-sketchpad.sociobot.in | 2 | Link |
| Try the isolated demo | 4 | Literal heading |
| Open https://motion-graph-sketchpad.sociobot.in/?demo=1. | 2 | Direct action |
| It opens the “Lantern drift” sample with four animated properties in a working editor. | 14 | `demo-four-property-sample` |
| Demo edits use memory only and disappear when you leave. | 10 | `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | `demo-reset` |
| Use Open my real sketch to leave the demo. | 9 | Clear exit instruction |
| Run locally / Requirements: Node.js 20 or newer. | 2 / 5 | Setup heading and requirement |
| Open http://localhost:5173/?demo=1 for the sample or / for a real sketch. | 10 | Local-use instruction |
| Test and build | 3 | Literal heading |
| The exact production build command is npm run build. | 8 | Executed instruction |
| It writes the static site to dist/, with dist/index.html at the root. | 11 | Verified build output |
| Run one public claim by its tag. | 7 | Instruction |
| Claim definitions and sandbox steps are in .factory/claims.json. | 8 | Repository pointer |
| The demo contract is in .factory/demo.md. | 7 | Repository pointer |
| Controls | 1 | Literal heading |
| Drag a keyframe left or right to change its time. | 10 | `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 13 | `keyboard-keyframes` |
| Add a keyframe at the current playhead. | 7 | `add-keyframe` |
| Choose an easing name in the selected keyframe panel. | 9 | `five-standard-easings` |
| Import a JSON sketch or download CSS, Web Animations, and JSON files. | 11 | `json-import`; `three-exports` |
| Data and offline use | 4 | Literal heading |
| Real sketches use one localStorage key: motion-graph-sketchpad:sketch:v1. | 5 | Implementation detail confirmed by storage tests |
| Use Clear sketch in the editor to remove a saved sketch from this browser. | 14 | `clear-sketch-data` |
| Demo mode does not read or write that key. | 9 | `demo-isolation` |
| After one online visit, the browser stores the files needed to reopen the app offline. | 15 | `offline-reload` |
| The app has no accounts. | 5 | `no-account-demo-network` |
| During the demo, it connects only to this website. | 9 | `no-account-demo-network` |
| See the privacy page. | 4 | Link instruction |
| Deployment | 1 | Literal heading |
| Deploy the contents of dist/ as a static site. | 9 | Deployment instruction |
| staticwebapp.config.json includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 12 | Configuration inspected and live-checked |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Scope instruction |
| License / MIT. / See LICENSE. | 1 / 1 / 2 | License material |

## Demo, sandbox, and privacy

- One click from the cold landing page entered `?demo=1`. At 390 × 844 the first screen showed the amber **“Demo — sample data, nothing is saved”** banner, **Reset demo**, **Open my real sketch**, **Lantern drift**, four named editable properties, and working preview controls.
- Reset restored the original four-property, 12-keyframe sample. Direct `/demo` also entered the sample.
- The isolated demo test seeded a distinct real sketch, edited the demo, left it, and proved the real sentinel was neither read nor changed. Demo edits were discarded after reload.
- Fresh-browser request logs during home → demo → edit → export contained only `https://motion-graph-sketchpad.sociobot.in`. There are no account fields or provider keys. Offline reload passed after the service worker had been installed.

## Claims and verification

From a fresh no-hardlink clone at `/tmp/mgs-review9-clean-BD6FAh`, `npm ci --no-audit --no-fund` completed, then every exact command in `.factory/claims.json` passed separately. The 18 passing claim IDs were:

`offline-reload`, `local-only`, `three-exports`, `demo-isolation`, `eight-properties`, `deterministic-export`, `keyboard-keyframes`, `free-no-account`, `json-import`, `drag-keyframes`, `easing-preview`, `demo-four-property-sample`, `five-standard-easings`, `no-account-demo-network`, `demo-reset`, `waapi-registers-properties`, `clear-sketch-data`, and `add-keyframe`.

`npm test` passed 13 unit tests and 40 Chromium tests. `npm run build` passed and produced `dist/`. `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm run test:e2e` passed the same 40 browser tests against the deployed site. The claim test inventory contains exactly one matching `@claim:<id>` tag for each claim.

## Earlier findings: fresh confirmation

Every earlier `review-*.md`, `polish-*.md`, verification record, and handoff was read. This table records fresh code and live checks, rather than accepting a prior “fixed” label.

| Earlier finding | Fresh result |
| --- | --- |
| F-1-1 | Fixed: literal sketchpad, limits, and export headings remain. |
| F-1-2 | Fixed: property, restart-preview, and real-sketch actions name their result. |
| F-1-3 | Fixed: sample, easing, export, and privacy claims are declared and separately tested. |
| Verification-1 High | Fixed: every visible phone control is at least 44 × 44 px on Home, Demo, Privacy, Terms, routed 404, and static 404. |
| Verification-1 Medium | Fixed: live `/assets/*` has immutable caching and `sw.js` remains updateable. |
| Verification-1 Low A | Fixed: malformed JSON gets plain recovery guidance. |
| Verification-1 Low B | Fixed: supported routes rewrite correctly and unknown routes return a designed HTTP 404. |
| F-2-1 | Fixed: primary action, helper, and facts fit above the fold at the five required viewport sizes. |
| F-2-2 | Fixed: the demo banner remains visible and keyboard reachable after scrolling. |
| F-2-3 | Fixed: route-wide mobile target measurement includes the Privacy email link. |
| F-2-4 | Fixed: the direct 404 has shared shell, legal links, metadata, and recovery action. |
| F-2-5 | Fixed: Demo, Privacy, and Terms set route-specific title, description, canonical, OG, and Twitter metadata. |
| F-2-6 | Fixed: Reset demo has a declared restoration test. |
| F-2-7 | Fixed: demo isolation proves neither read nor write of real storage. |
| F-2-8 | Fixed: the Web Animations registration statement is concrete and export-tested. |
| F-2-9 | Fixed: process and export labels are literal. |
| F-2-10 | Fixed: README gives offline and privacy outcomes in plain language. |
| F-2-11 | Fixed: “Web Animations” is used consistently. |
| F-4-1 | Fixed: the phone demo opens directly into a working product-first sample. |
| F-5-1 | Fixed: Clear sketch removal is declared and tested. |
| F-5-2 | Fixed: adding an interpolated playhead keyframe is declared and tested. |
| F-5-3 | Fixed: CSS, Web Animations, and JSON are copied and downloaded with content checks. |
| F-5-4 | Fixed: the 404 says “Page not found” and gives a literal recovery message. |
| F-5-5 | Fixed: the Terms H1 names the Terms page. |
| F-6-1 | Fixed: eight-property flow passes independently and in the parallel suite. |
| V5-1 | Fixed: first-screen bounds pass at 1366×768, 1440×900, 1536×864, 1920×1080, and 390×844. |
| V6-1 / F-7-1 | Fixed: export tabs use roving focus with Arrow, Home, and End behavior plus associated tabpanel. |
| F-7-2 | Fixed: visitor-facing copy makes no untestable generated-imagery assertion. |
| V7-1 | Fixed: route accessibility scans pass under the normal parallel browser run. |
| V7-2 | Fixed: keyboard focus reaches the visible Import JSON control. |
| V7-3 | Fixed: an invalid zero duration is corrected and explained. |
| F-8-2 | Fixed: normal and direct-404 footers derive the same `v1.0.9` build identifier. |

## Structure, routes, accessibility, and identity

- `/`, `/demo`, `/privacy`, `/terms`, `robots.txt`, and `sitemap.xml` return 200. A deliberate unknown route returns 404. The static 404 has title **“Page not found — Motion Graph Sketchpad”**, one H1 and main landmark, shared navigation/legal links, metadata, favicon, and a return action.
- Crawled application and Param Factory links returned 200. The only non-HTTP target is the explicit `mailto:privacy@sociobot.in`; the 404 page's skip-link hash naturally retains its current 404 response.
- Live routes have correct titles, descriptions, canonicals, Open Graph/Twitter metadata, `lang=en`, one H1, one main, skip link, and shared header/footer. Client navigation and Back move focus to the new H1 and announce the route.
- Axe has zero violations on Home, Demo, Privacy, Terms, and 404 in the checked browser suite. Reduced motion swaps travel for the final preview frame.
- The night editing-bay illustration, cyan graph paths, amber keyframes, mono utility type, asymmetric hero, and chamfered surfaces match `.factory/design.md`. This is a distinct product interface rather than a generic SaaS template.

## Missed leverage

The brief implies direct property editing plus practical interchange. The product includes JSON import and CSS, Web Animations, and JSON export. An AI step or sync would not solve an implied missing job here, so none is required. No decorative AI UI, provider key, or off-origin runtime request was found.

## What would make this perfect

Keep the current verification discipline: rerun the cold 390 px and desktop read, all 18 exact claim commands, full live browser suite, request log, route crawl, and history matrix after each deployment. No product change is currently required.
