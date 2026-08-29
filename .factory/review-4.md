# Adversarial first-read review 4 — FAIL

**Reviewed:** 2026-08-29  
**Live site:** <https://motion-graph-sketchpad.sociobot.in>  
**Repository revision:** `f9be31f23fe8a46e3e4775463a529709d62487b8`

## Verdict

**FAIL.** One blocking finding remains. The landing is clear and the demo is isolated, but the one-click demo does not show the sample being used on its first phone screen. A PASS requires zero findings.

## Cold first read

Fresh Chromium contexts started at scroll position zero.

| Viewport | What it does | Who it is for | What to click first | Result |
| --- | --- | --- | --- | --- |
| 390 × 844 | “Sketch property motion before coding.” | “For web and game creators testing animation without scripts or a full timeline editor.” | **Try it with sample data**; “Loads a four-property motion sketch.” explains the result. | Pass |
| 1366 × 768 | Same. | Same. | **Try it with sample data** is visible, as are the three facts. | Pass |

At 390 px, the action was at y=499.7–548.5 and the facts ended at y=742.0. At 1366 × 768, the action was at y=493.5–542.3 and the facts ended at y=641.0. The first screen therefore answers all three required questions before scrolling.

## Findings

### Blocking — F-4-1: The one-click demo opens on another landing screen, not a working sample

**Location / exact evidence:** click **“Try it with sample data”** on the live home page at 390 × 844. The URL correctly becomes `/?demo=1` and the banner says **“Demo — sample data, nothing is saved”**, but the first screen is still the hero headed **“Sketch property motion before coding.”** The `.hero` occupies y=147.3–1170.6; the sample editor begins at y=1170.6 and its workspace at y=1448.3. Neither **“Lantern drift”** nor a sample property, keyframe, preview, or export is visible without scrolling.

**Why this fails:** the demo contract requires the first screen after the one click to already look like the product being used with realistic sample data. On a phone, the visitor must scroll past a second full landing screen before seeing what the promised four-property sample is. The banner is present, but it does not demonstrate the product.

**Concrete fix:** give demo mode a product-first route/layout. On `?demo=1` (and `/demo`), place the persistent banner and a visible “Lantern drift” preview/editor at the top of the viewport; the marketing hero may follow below or be replaced by a compact demo heading. Add a 390 × 844 Playwright test that clicks **Try it with sample data** and asserts, without scrolling, the banner, the `Sketch name` value **“Lantern drift”**, four property inputs, and at least one working preview/editor control are visible.

## Copy audit

Counts treat hyphenated terms, URLs, and code identifiers as one word. Headings and controls are included because the first-read contract requires literal headings and result-naming actions. No copy finding was found: no sentence exceeds 22 words; the wording avoids the banned marketing terms; headings name their sections; and buttons name a result.

### Landing page (`/`)

| Copy | Words | Check |
| --- | ---: | --- |
| Motion Graph Sketchpad | 3 | Product label; clear |
| Sketch property motion before coding | 5 | H1; plain job |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Audience and situation |
| Try it with sample data | 6 | Result-naming action |
| Loads a four-property motion sketch. | 5 | Listed: `demo-four-property-sample` |
| Works offline after the first visit. | 6 | Listed: `offline-reload` |
| Sketches stay in this browser. | 5 | Listed: `local-only` |
| Free. | 1 | Listed: `free-no-account` |
| No account. | 2 | Listed: `free-no-account` |
| Test motion. | 2 | Covered by `easing-preview` |
| Export the code. | 3 | Covered by `three-exports` |
| The sketchpad | 2 | Section label |
| Edit motion property values | 4 | Literal H2 |
| Drag keyframes sideways. | 3 | Listed: `drag-keyframes` |
| Use arrow keys for 50 ms steps. | 7 | Listed: `keyboard-keyframes` |
| Play preview | 2 | Result-naming action |
| Restart preview | 2 | Result-naming action |
| No properties yet. | 3 | Clear empty state |
| Its keyframes and motion path will appear here. | 8 | Clear empty-state outcome |
| Import JSON | 2 | Result-naming action |
| Clear sketch | 2 | Result-naming action |
| Add property | 2 | Control label |
| Add number property | 3 | Result-naming action |
| Add colour property | 3 | Result-naming action |
| How it works | 3 | Literal section H2 |
| Add a motion property | 5 | Literal H3 |
| Add up to eight number or colour properties. | 8 | Listed: `eight-properties` |
| Set keyframe times | 3 | Literal H3 |
| Add keyframes, drag their times, and choose easing. | 8 | Covered by keyframe/easing tests |
| Export animation code | 3 | Literal H3 |
| Copy CSS, Web Animations code, or stable JSON. | 8 | Listed: `three-exports`, `deterministic-export` |
| Tool limits | 2 | Literal section label |
| What this sketchpad does not do | 6 | Literal H2 |
| This tool does not rig characters, render video, or manage teams. | 11 | Useful scope limit |
| It tests plain values before you open a larger editor. | 10 | Plain purpose statement |
| No account exists. | 3 | Listed: `free-no-account` |
| Your real sketch uses local browser storage. | 7 | Listed: `local-only` |
| Demo changes disappear when you leave. | 6 | Listed: `demo-isolation` |
| Export CSS, Web Animations code, or JSON. | 7 | Listed: `three-exports` |
| Built by Param Factory | 4 | Attribution link |
| Original generated imagery | 3 | Provenance label; supported by `.factory/design.md` |

### Required demo copy (`/?demo=1`)

| Copy | Words | Check |
| --- | ---: | --- |
| Demo — sample data, nothing is saved | 6 | Listed: `demo-isolation` |
| Reset demo | 2 | Result-naming action; listed: `demo-reset` |
| Open my real sketch | 4 | Result-naming action |
| Select a keyframe to edit its value and easing. | 9 | Clear instruction |
| Export options | 2 | Literal section label |
| Export code | 2 | Literal H3 |
| Output stays stable when the sketch stays the same. | 9 | Listed: `deterministic-export` |
| Choose from five standard timing functions. | 6 | Listed: `five-standard-easings` |
| The Web Animations export registers each custom CSS property before animating it. | 11 | Listed: `waapi-registers-properties` |
| Copy CSS | 2 | Result-naming action |
| Download file | 2 | Result-naming action in the selected export context |

### README

| Sentence | Words | Check |
| --- | ---: | --- |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Plain job statement |
| The tool is for web and game creators. | 8 | Plain audience statement |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Listed feature set |
| Open the isolated demo. | 4 | Clear instruction |
| It loads the “Lantern drift” sample with four animated properties. | 10 | Listed: `demo-four-property-sample` |
| Demo edits use memory only and disappear when you leave. | 10 | Listed: `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | Listed: `demo-reset` |
| Use Open my real sketch to leave the demo. | 9 | Demo exit instruction |
| Requirements: Node.js 20 or newer. | 5 | Developer requirement |
| Open `http://localhost:5173/?demo=1` for the sample or `/` for a real sketch. | 10 | Local instruction |
| The exact production build command is `npm run build`. | 8 | Executed below |
| It writes the static site to `dist/`, with `dist/index.html` at the root. | 11 | Verified build output |
| Run one public claim by its tag. | 7 | Developer instruction |
| Claim definitions and sandbox steps are in `.factory/claims.json`. | 8 | Repository instruction |
| The demo contract is in `.factory/demo.md`. | 7 | Repository instruction |
| Drag a keyframe left or right to change its time. | 10 | Listed: `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | Listed: `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 13 | Listed: `keyboard-keyframes` |
| Choose an easing name in the selected keyframe panel. | 9 | Listed: `five-standard-easings` |
| Import a JSON sketch or download CSS, Web Animations, and JSON files. | 11 | Listed: `json-import`, `three-exports` |
| Real sketches use one localStorage key: `motion-graph-sketchpad:sketch:v1`. | 6 | Storage detail; local-only coverage |
| Demo mode does not read or write that key. | 9 | Listed: `demo-isolation` |
| After one online visit, the browser stores the files needed to reopen the app offline. | 15 | Listed: `offline-reload` |
| The app has no accounts. | 5 | Listed: `no-account-demo-network` |
| During the demo, it connects only to this website. | 9 | Listed: `no-account-demo-network` |
| Deploy the contents of `dist/` as a static site. | 9 | Deployment instruction |
| `staticwebapp.config.json` includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 13 | Inspected and exercised |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Scope instruction |
| MIT. | 1 | License declaration |
| See LICENSE. | 2 | Link instruction |

## Demo, storage, privacy, and claims

- The action reaches demo mode in one click, shows the isolated banner, exposes Reset and real-sketch exit, and Reset restores “Lantern drift.” The missing product-first demo screen is F-4-1.
- In a fresh live context, changing the demo wrote no real-sketch value; Reset restored the original name. The declared isolated-storage test also seeds a real sentinel and proves the demo neither reads nor writes it.
- The live Playwright request log for a full demo edit/reset flow contained no off-origin requests. Normal home and demo loads had no console errors.
- Every command from `.factory/claims.json` was run independently from clean clone `/tmp/motion-graph-sketchpad-review-4-clean-PLYceK`; all 16 passed. The final clean-clone `npm test` passed 7 unit and 23 Chromium tests. `npm run build` passed and produced `dist/`; initial JavaScript was 10.63 kB gzip.

| Claim IDs verified |
| --- |
| `offline-reload`, `local-only`, `three-exports`, `demo-isolation`, `eight-properties`, `deterministic-export`, `keyboard-keyframes`, `free-no-account` |
| `json-import`, `drag-keyframes`, `easing-preview`, `demo-four-property-sample`, `five-standard-easings`, `no-account-demo-network`, `demo-reset`, `waapi-registers-properties` |

No additional claim-like landing, demo, Privacy, or README sentence lacked a matching claim, observable test, or a directly executed repository/deployment instruction.

## Earlier finding verification

All earlier `review-*`, `polish-*`, verification, and handoff files were read. Live and source checks confirm every earlier finding remains fixed.

| Earlier finding | Recheck | Result |
| --- | --- | --- |
| F-1-1 | Literal sketchpad, limits, and export wording remain. | Fixed |
| F-1-2 | Add-property, restart, and real-sketch controls retain result-naming labels. | Fixed |
| F-1-3 | Four-property, timing-function, export, and same-site request statements retain declared tests. | Fixed |
| Verification high | All 53 visible 390 px interactive targets were at least 44 × 44 px. | Fixed |
| Verification medium/low | Immutable hashed assets, plain JSON recovery, and direct HTTP 404 remain verified. | Fixed |
| F-2-1 | At 1366 × 768, action, helper, facts, and art fit above the fold. | Fixed |
| F-2-2 | The demo banner remains sticky at the mobile page bottom with usable actions. | Fixed |
| F-2-3 | Header/footer links and all visible mobile controls meet 44 px targets. | Fixed |
| F-2-4 / F-2-5 | Direct 404 shell and per-route metadata are complete. | Fixed |
| F-2-6 / F-2-7 | Reset and non-reading/non-writing demo isolation retain named tests. | Fixed |
| F-2-8 / F-2-9 / F-2-10 / F-2-11 | Web Animations wording, literal process headings, plain README wording, and consistent terminology remain. | Fixed |

F-4-1 is a newly found demo-gate failure, not a regression of a previously closed finding.

## Structure, accessibility, identity, and leverage

- `/`, `/demo`, `/privacy`, `/terms`, assets, robots, sitemap, favicon, and the crawled Param Factory link returned 200; `/missing-frame` returned 404. The mail link is an explicit `mailto:` destination.
- Normal routes have route-specific title, description, canonical, Open Graph, Twitter fields, language, one h1, and one main. The designed direct 404 has the shared header/footer, legal links, metadata, and return action.
- Client navigation moved focus to the new h1 and updated the polite announcement; Back restored the demo heading. Live Axe reported zero violations on `/demo`. The only console error observed was the expected browser resource error when deliberately loading the HTTP-404 path.
- The live JS response is immutable (`max-age=31536000, immutable`) and `sw.js` is no-cache/no-store. The dark editing-bay art, cyan graph paths, amber keyframes, mono type, and chamfered controls visibly match `.factory/design.md`; this is not a generic SaaS template.
- The brief already implies and supplies the useful interoperability: JSON import plus CSS, Web Animations, and JSON export. An AI or sync feature is not necessary for this deterministic local-first task, and no provider key is embedded.

## What would make this perfect

Make demo mode product-first on a 390 px first screen, then add the direct post-click viewport regression test described in F-4-1. Re-run the cold-read, demo isolation, every claim command, and route/mobile sweep after deployment.
