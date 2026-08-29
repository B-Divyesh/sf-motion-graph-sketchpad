# Adversarial first-read review 6 — FAIL

**Reviewed:** 2026-08-29

**Live site:** <https://motion-graph-sketchpad.sociobot.in>

**Repository revision:** `b88eeb68cf37627ca86d8cffaf5bf1b4b9a2940e`

**Live build observed:** `v1.0.5`, `assets/index-PBjLLl2b.js`

## Verdict

**FAIL.** One blocking finding remains. The product, demo, copy, privacy behavior, routing, and live deployment pass, but a declared claim test failed during the required clean-clone `npm test` quality gate. A PASS requires zero findings and no failing claim test.

## Cold first read

Each viewport used a new Chromium context with no cache or saved product data. Measurements were taken at scroll position zero before any interaction.

| Viewport | What does it do? | For whom? | What should I click first? | Result |
| --- | --- | --- | --- | --- |
| 390 × 844 | “Sketch property motion before coding.” | “For web and game creators testing animation without scripts or a full timeline editor.” | **Try it with sample data**; “Loads a four-property motion sketch.” states the result. | Pass. The action ends at y=603 and all three facts end at y=742. |
| 1366 × 768 | The same plain job. | The same named audience. | The same primary action and adjacent result. | Pass. The action ends at y=542 and all three facts end at y=641. |

Both first screens answer all three questions. Neither has horizontal overflow, a console error, or an off-origin request. Evidence was captured at `/tmp/mgs-review6/home-mobile.png`, `/tmp/mgs-review6/home-desktop.png`, and `/tmp/mgs-review6/cold.json`.

## Findings

### Blocking — F-6-1: A declared claim test is intermittent in the required quality gate

**Exact claim and location:** `.factory/claims.json`, `eight-properties`: **“Supports up to eight number or colour properties.”** The tagged test is `tests/e2e/claims.spec.ts:86`, and the required command is `npm test -- --grep @claim:eight-properties`.

**Observed failure:** all 18 exact claim commands passed independently. However, the first clean-clone default `npm test` run failed in this tagged test. `getByText('8/8')` timed out after the seven scripted additions, and the failure screenshot showed **“7/8”** with only seven property rails. The suite result was 28 passed and 1 failed. A second clean `npm test` run passed 29/29, the public deployment passed 29/29, and 10 focused repeats of this claim passed 10/10. This makes the failure intermittent rather than a consistently broken eight-property feature.

**Why this blocks acceptance:** the product contract requires `npm test` to pass, and the review contract says any failing claim test is blocking. A claim gate that can lose one of its own awaited additions cannot reliably prove the advertised eight-property limit in a normal parallel run.

**Concrete fix:** after every Add-property click, wait for the property count to advance before issuing the next click. For example, after adding the colour property, assert `1/8`; after each numbered addition, assert the next count and rail total. If the count still stalls, fix the re-render/event path so one activated button always creates one property. Then run the complete default `npm test` command repeatedly from a clean clone, not only the focused tag.

## Copy audit

Counts treat hyphenated terms, URLs, and code identifiers as one word. Sample values and generated export code are data rather than authored sentences. No line exceeds 22 words, no banned marketing word appears, terminology is consistent, headings make sense out of context, and actions name a result.

### Live landing page (`/`)

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Clear link |
| Motion Graph Sketchpad | 3 | Product name |
| Motion Graph Sketchpad home | 4 | Clear accessible link name |
| Demo | 1 | Clear navigation |
| Sketchpad | 1 | Clear navigation |
| Privacy | 1 | Clear navigation |
| Terms | 1 | Clear navigation |
| Sketch property motion before coding | 5 | Plain job h1 |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Plain audience and situation |
| Try it with sample data | 5 | Result-naming action |
| Loads a four-property motion sketch. | 5 | `demo-four-property-sample` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Sketches stay in this browser. | 5 | `local-only` |
| Free. | 1 | `free-no-account` |
| No account. | 2 | `free-no-account` |
| Test motion. | 2 | `easing-preview` |
| Export the code. | 3 | `three-exports` |
| A dark animation desk overlooks mountains crossed by cyan motion paths. | 11 | Useful image alt text |
| The sketchpad | 2 | Literal section label |
| Edit motion property values | 4 | Literal h2 |
| Drag keyframes sideways. | 3 | `drag-keyframes` |
| Use arrow keys for 50 ms steps. | 7 | `keyboard-keyframes` |
| 0 ms | 2 | Numeric preview output |
| Play preview | 2 | Result-naming action |
| Restart preview | 2 | Result-naming action |
| Playhead | 1 | Bound control label |
| No properties yet. | 3 | Clear empty state |
| Sketch name | 2 | Bound input label |
| Duration | 1 | Bound input label |
| ms | 1 | Unit label |
| Import JSON | 2 | Result-naming action |
| Clear sketch | 2 | Result-naming action |
| Add property | 2 | Control-group label |
| Add number property | 3 | Result-naming action |
| Add colour property | 3 | Result-naming action |
| 0/8 | 1 | Property-count label |
| Add the first property | 4 | Clear empty-state h3 |
| Its keyframes and motion path will appear here. | 8 | Clear empty-state outcome |
| Three moves | 2 | Informative step count |
| How it works | 3 | Literal h2 |
| Add a motion property | 4 | Literal h3 |
| Add up to eight number or colour properties. | 8 | `eight-properties`; test reliability is F-6-1 |
| Set keyframe times | 3 | Literal h3 |
| Add keyframes, drag their times, and choose easing. | 8 | `add-keyframe`, `drag-keyframes`, `five-standard-easings` |
| Export animation code | 3 | Literal h3 |
| Copy CSS, Web Animations code, or stable JSON. | 8 | `three-exports`, `deterministic-export` |
| Tool limits | 2 | Literal section label |
| What this sketchpad does not do | 6 | Literal h2 |
| This tool does not rig characters, render video, or manage teams. | 11 | Useful scope limit |
| It tests plain values before you open a larger editor. | 10 | Plain purpose statement |
| No account exists. | 3 | `free-no-account` |
| Your real sketch uses local browser storage. | 7 | `local-only` |
| Demo changes disappear when you leave. | 6 | `demo-isolation` |
| Export CSS, Web Animations code, or JSON. | 7 | `three-exports` |
| Built by Param Factory | 4 | Attribution link |
| External site | 2 | Screen-reader destination note |
| v1.0.5 | 1 | Build identifier |
| Original generated imagery | 3 | Provenance label |

### Required demo copy (`/demo` and `/?demo=1`)

Common landing/footer text is not repeated.

| Copy | Words | Result |
| --- | ---: | --- |
| Demo — sample data, nothing is saved | 6 | `demo-isolation` |
| Reset demo | 2 | `demo-reset` |
| Open my real sketch | 4 | Result-naming exit action |
| Sample motion sketch | 3 | Literal section label |
| Edit a sample motion sketch | 5 | Plain h1 |
| Sketch name | 2 | Bound input label |
| 4 motion properties | 3 | `demo-four-property-sample` |
| Property name 1 / 2 / 3 / 4 | 3 each | Bound input labels |
| Play preview | 2 | `easing-preview` |
| Restart preview | 2 | Result-naming action |
| Open the keyframe editor | 4 | Result-naming in-page link |
| Add keyframe at playhead | 4 | `add-keyframe` |
| Selected keyframe | 2 | Literal inspector label |
| Select a keyframe to edit its value and easing. | 9 | Clear instruction |
| Delete keyframe | 2 | Result-naming action |
| Time | 1 | Bound input label |
| Value | 1 | Bound input label |
| Easing | 1 | Bound select label |
| Export options | 2 | Literal section label |
| Export code | 2 | Literal h3 |
| Output stays stable when the sketch stays the same. | 9 | `deterministic-export` |
| Browser support | 2 | Literal support label |
| Choose from five standard timing functions. | 6 | `five-standard-easings` |
| The Web Animations export registers each custom CSS property before animating it. | 12 | `waapi-registers-properties` |
| Copy CSS / Copy Web Animations / Copy JSON | 2 / 3 / 2 | Result-naming actions; `three-exports` |
| Download file | 2 | Result-naming action in the selected format tab; `three-exports` |

### README

Code-block commands were executed and are not counted as prose sentences.

| Sentence, heading, or instruction | Words | Result |
| --- | ---: | --- |
| Motion Graph Sketchpad | 3 | Product name |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Plain product description |
| The tool is for web and game creators. | 8 | Plain audience |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Listed feature claims; F-6-1 affects the eight-property gate |
| Live site: https://motion-graph-sketchpad.sociobot.in | 3 | Link |
| Try the isolated demo | 4 | Literal heading |
| Open https://motion-graph-sketchpad.sociobot.in/?demo=1. | 2 | Direct instruction |
| It opens the “Lantern drift” sample with four animated properties in a working editor. | 14 | `demo-four-property-sample` |
| Demo edits use memory only and disappear when you leave. | 10 | `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | `demo-reset` |
| Use Open my real sketch to leave the demo. | 9 | Clear instruction |
| Run locally | 2 | Literal heading |
| Requirements: Node.js 20 or newer. | 5 | Developer requirement |
| Open http://localhost:5173/?demo=1 for the sample or / for a real sketch. | 11 | Developer instruction |
| Test and build | 3 | Literal heading |
| The exact production build command is npm run build. | 9 | Verified instruction |
| It writes the static site to dist/, with dist/index.html at the root. | 12 | Verified build result |
| Run one public claim by its tag. | 7 | Developer instruction |
| Claim definitions and sandbox steps are in .factory/claims.json. | 8 | Repository pointer |
| The demo contract is in .factory/demo.md. | 6 | Repository pointer |
| Controls | 1 | Literal heading |
| Drag a keyframe left or right to change its time. | 10 | `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 12 | `keyboard-keyframes` |
| Add a keyframe at the current playhead. | 7 | `add-keyframe` |
| Choose an easing name in the selected keyframe panel. | 9 | `five-standard-easings` |
| Import a JSON sketch or download CSS, Web Animations, and JSON files. | 12 | `json-import`, `three-exports` |
| Data and offline use | 4 | Literal heading |
| Real sketches use one localStorage key: motion-graph-sketchpad:sketch:v1. | 7 | Exact storage detail; `local-only` |
| Use Clear sketch in the editor to remove a saved sketch from this browser. | 14 | `clear-sketch-data` |
| Demo mode does not read or write that key. | 9 | `demo-isolation` |
| After one online visit, the browser stores the files needed to reopen the app offline. | 15 | `offline-reload` |
| The app has no accounts. | 5 | `no-account-demo-network` |
| During the demo, it connects only to this website. | 9 | `no-account-demo-network` |
| See the privacy page. | 4 | Link instruction |
| Deployment | 1 | Literal heading |
| Deploy the contents of dist/ as a static site. | 9 | Developer instruction |
| staticwebapp.config.json includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 14 | Repository statement verified against source and live headers |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Scope instruction |
| License | 1 | Literal heading |
| MIT. | 1 | License declaration |
| See LICENSE. | 2 | Link instruction |

### Terminology

| Concept | One term used | Result |
| --- | --- | --- |
| Saved experiment | sketch | Consistent |
| Animated named value | property | Consistent |
| Value at one time | keyframe | Consistent |
| Timeline position | playhead | Consistent |
| Playback surface | preview | Consistent |
| Temporary sample workspace | demo | Consistent |
| Browser animation API/export | Web Animations | Consistent |

No claim-like landing or README sentence is missing from `.factory/claims.json`; developer build/deployment instructions were directly executed or inspected.

## Demo, sandbox, privacy, and offline behavior

- One click from the phone landing page opened `/?demo=1`. Before scrolling, the banner, “Lantern drift,” Drift X, Lift, Scale, Glow colour, and Play/Restart controls were visible; the Play button ended at y=703.
- Playing changed the visible time to 291 ms and changed the preview transform. Reset restored the name and four properties.
- A real-sketch sentinel was saved before demo entry. Demo entry displayed only the sample; editing and Reset left the exact sentinel bytes unchanged; **Open my real sketch** restored the sentinel.
- At the document bottom, the banner remained at y=0–75 with both Reset and exit actions visible.
- The manual demo request log contained no off-origin request. The live `offline-reload` test also reloaded the controlled demo while offline.

## Declared claims

The repository was cloned without local changes to `/tmp/mgs-review6-clean-vI7dDL`, then `npm ci` was run. Every exact command from `.factory/claims.json` passed independently.

| Claim ID | Exact-command result | Evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Controlled demo reloaded offline |
| `local-only` | PASS | Demo/export flow stayed same-origin and the real sketch persisted locally |
| `three-exports` | PASS | All three formats copied and downloaded with exact output |
| `demo-isolation` | PASS | Seeded real bytes were neither read into nor overwritten by demo |
| `eight-properties` | PASS independently; **FAIL once in default `npm test`** | Failure stopped at 7/8; F-6-1 |
| `deterministic-export` | PASS | All three outputs matched byte-for-byte after reload |
| `keyboard-keyframes` | PASS | Arrow moved 50 ms; Shift+Arrow moved a further 250 ms |
| `free-no-account` | PASS | Fact visible; no account/payment gate |
| `json-import` | PASS | Version 1 fixture loaded its name and property |
| `drag-keyframes` | PASS | Pointer drag changed accessible time |
| `easing-preview` | PASS | Preview time and computed transform changed |
| `demo-four-property-sample` | PASS | One phone click exposed the named sample and working preview above the fold |
| `five-standard-easings` | PASS | Five exact timing values were selectable |
| `no-account-demo-network` | PASS | No account field and zero off-origin demo requests |
| `demo-reset` | PASS | Original name, four properties, and 12 keyframes returned |
| `waapi-registers-properties` | PASS | Every custom property was registered before animation |
| `clear-sketch-data` | PASS | Old name, property, keyframes, and stored contents were removed |
| `add-keyframe` | PASS | One interpolated 600 ms keyframe was added |

The first default clean-clone suite was 28 passed / 1 failed. A clean rerun passed 11 unit and 29 Chromium tests. Ten focused repeats of `eight-properties` then passed 10/10. The intermittent failure remains disqualifying under the explicit claim-test rule.

`npm run build` passed and produced `dist/`. Initial JavaScript is 34.09 kB raw / 10.90 kB gzip; CSS is 22.28 kB raw / 5.72 kB gzip. `npm audit --audit-level=high` found zero vulnerabilities.

## Earlier finding verification

Every earlier `review-*.md`, `polish-*.md`, and the prior handoff was read. Each earlier finding was checked in the current source and on the live site rather than accepted from its status label.

| Earlier finding | Current evidence | Result |
| --- | --- | --- |
| F-1-1 — vague headings and caption | Literal sketchpad, limits, and export wording remains live and in `src/main.ts`. | Fixed |
| F-1-2 — vague action labels | Add-property, Restart-preview, and Open-my-real-sketch actions remain explicit. | Fixed |
| F-1-3 — missing claim entries | Four-property, easing, export, and same-site network entries and tagged tests remain. | Fixed |
| Verification-1 High — mobile targets | Live 390 px full-control audit passed; no visible target was below 44 × 44 px. | Fixed |
| Verification-1 Medium — cache headers | Hashed JS is immutable; `sw.js` is no-cache/no-store. | Fixed |
| Verification-1 Low — raw JSON errors | Plain invalid-JSON and structural recovery checks pass. | Fixed |
| Verification-1 Low — unknown route status | `/review-6-not-found` returned HTTP 404 with the designed shell. | Fixed |
| F-2-1 — desktop action below fold | Action, helper, facts, and art fit within 1366 × 768. | Fixed |
| F-2-2 — non-persistent demo banner | Banner and both controls remain visible at the phone document bottom. | Fixed |
| F-2-3 — incomplete 44 px fix | The broad mobile target audit includes header/footer and passes live. | Fixed |
| F-2-4 — incomplete direct 404 | Direct 404 has header, footer, legal links, metadata, and return action. | Fixed |
| F-2-5 — stale route social metadata | Demo, Privacy, and Terms set route-specific title, description, canonical, OG, and Twitter fields. | Fixed |
| F-2-6 — Reset unlisted | `demo-reset` exists and restores the complete original sample. | Fixed |
| F-2-7 — demo read isolation untested | The sentinel test proves demo neither reads nor writes real storage. | Fixed |
| F-2-8 — unclear browser support claim | Copy names Web Animations; the registration-order claim passes. | Fixed |
| F-2-9 — metaphorical process labels | Add a motion property, Set keyframe times, Export animation code, and Export options remain literal. | Fixed |
| F-2-10 — README browser jargon | README uses outcome-first offline and same-site wording. | Fixed |
| F-2-11 — JavaScript/Web Animations inconsistency | Web Animations is used consistently. | Fixed |
| Review 3 | Its no-finding cold-read, demo, route, privacy, accessibility, and claim scope was rerun. | No regression |
| F-4-1 — demo repeated the hero | The product-first demo deck fits the required sample and controls above the phone fold. | Fixed |
| F-5-1 — removal instruction untested | `clear-sketch-data` removes the distinctive saved sketch and survives reload. | Fixed |
| F-5-2 — adding a keyframe unlisted | `add-keyframe` asserts one interpolated keyframe at 600 ms. | Fixed |
| F-5-3 — copy/download outcomes incomplete | `three-exports` now copies and downloads every format and byte-compares output. | Fixed |
| F-5-4 — metaphorical 404 | Direct 404 now says “404”, “Page not found”, and the literal address explanation. | Fixed |
| F-5-5 — vague Terms h1 | The h1 is “Terms for using Motion Graph Sketchpad.” | Fixed |

F-6-1 is a new test-reliability failure, not a regression of the product’s eight-property result: the isolated, repeated, and live checks all reached eight.

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/privacy`, and `/terms` return 200. Each has `lang=en`, one h1, one main, route-specific title/description/canonical/OG metadata, favicon links, and the shared header/footer.
- `/review-6-not-found` returns HTTP 404 and uses “Page not found,” a return action, complete metadata, and legal links.
- Every crawled link resolved: home, demo query and path, Privacy, Terms, and Param Factory returned 200; the privacy email is an explicit `mailto:` destination.
- `robots.txt`, `sitemap.xml`, SVG favicon, Apple touch icon, manifest, and the 1200 × 630 social image return 200.
- Live client navigation focuses and announces the new h1; Back restores the preceding route and focus. Deep links reload correctly.
- The public 29-test browser suite passed. Integrated Axe found zero violations on Home, Demo, Privacy, and Terms. Verify URL reported no console errors, one h1/main, `lang=en`, and no missing alt or unlabelled button.
- Reduced motion, keyboard keyframes, mobile width, and touch targets pass. The live request log is same-origin only.
- Live JS and CSS hashes match the clean build byte-for-byte. Security, immutable asset, and updateable worker headers are present.
- The cinematic night editing bay, cyan graph paths, amber keyframes/actions, mono utility type, asymmetric layout, and chamfered panels match `.factory/design.md`. The site is recognisably product-specific rather than a generic SaaS template.

## Missed leverage

No missing AI or sync feature is implied by the brief. This is a deterministic, local-first motion editor; a remote model would add keys, cost, and privacy exposure without removing a necessary editing step. The obvious interoperability is present through JSON import plus CSS, Web Animations, and JSON export. No provider key, Azure endpoint, or decorative AI feature appears in source or requests.

## What would make this perfect

Make the `eight-properties` claim test deterministic in the full parallel suite by confirming each count transition before the next action and fixing any event loss that remains. Then run every exact claim plus repeated full `npm test` runs from a clean clone. Nothing else in this review requires a product change.
