# Adversarial first-read review 5 — FAIL

**Reviewed:** 2026-08-29

**Live site:** <https://motion-graph-sketchpad.sociobot.in>

**Repository revision:** `cea8e1ab621e461c348f270af9f1821ca99b08a6`

**Live build observed:** `v1.0.4`, `assets/index-5CDAaUuK.js`

## Verdict

**FAIL.** No blocking behavior failed, but five findings remain: one medium claim-inventory gap and four minor claim/copy gaps. A PASS requires zero findings and no untested claim.

## Cold first read

Each viewport used a fresh Chromium context at scroll position zero. No storage, cache, or prior product knowledge was carried in.

| Viewport | What does this do? | For whom? | What should I click first? | Result |
| --- | --- | --- | --- | --- |
| 390 × 844 | “Sketch property motion before coding.” | “For web and game creators testing animation without scripts or a full timeline editor.” | **Try it with sample data**; the adjacent text says “Loads a four-property motion sketch.” | Pass. The action ends at y=548.5, its explanation ends at y=603.2, and all three facts end at y=742.0. |
| 1366 × 768 | The same literal job. | The same named audience. | The same primary action and adjacent result. | Pass. The action ends at y=542.3 and the facts end at y=641.0. |

The first screen answers all three required questions on both viewports. It also shows the three facts: **“Works offline after the first visit,” “Sketches stay in this browser,”** and **“Free. No account.”** Neither viewport has horizontal overflow or a console error.

Evidence:

- `/tmp/mgs-review-5/home-390x844.png`
- `/tmp/mgs-review-5/home-1366x768.png`
- `/tmp/mgs-review-5/live-audit.json`

## Findings

### Medium — F-5-1: The privacy data-removal instruction has no declared claim test

**Location / exact quote:** `/privacy`, under **“Remove your data”**: **“Use ‘Clear sketch’ in the editor. You can also clear this site’s browser storage.”**

**Why this matters:** a visitor may rely on this instruction to remove a saved sketch. `local-only` proves where a sketch is stored, but no entry in `.factory/claims.json` names removal and no tagged test presses **Clear sketch** or verifies that the prior name, properties, and keyframes are gone. The live control worked in a manual check, but the public privacy outcome remains outside the repeatable claim contract.

**Concrete fix:** add a `clear-sketch-data` claim with the exact outcome **“Clear sketch removes the saved sketch contents from this browser.”** Its tagged test should seed a distinctive real sketch, accept the confirmation, press **Clear sketch**, reload, and verify that the old name, properties, and keyframes are absent from both the editor and the stored value. Rewrite the second sentence as **“You can also remove this site’s data in your browser settings.”**

### Minor — F-5-2: Adding a keyframe is an unlisted product claim

**Location / exact quotes:** landing How it works: **“Add keyframes, drag their times, and choose easing.”** README introduction: **“Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON.”**

**Why this matters:** `drag-keyframes`, `keyboard-keyframes`, and `five-standard-easings` cover moving and easing existing sample keyframes. No declared claim or tagged test adds a keyframe at the playhead. This is a core workflow step, not incidental UI. A manual live check increased the sample from 12 to 13 keyframes and created one at 600 ms, so the behavior works but is unlisted.

**Concrete fix:** add an `add-keyframe` claim and test. In `/demo`, move the playhead to 600 ms, choose **Add keyframe at playhead**, and assert that exactly one new keyframe appears at 600 ms with the interpolated value. Keep the current sentences after that test exists.

### Minor — F-5-3: The export claim test does not cover the copy and three-file promises

**Location / exact quotes:** landing: **“Copy CSS, Web Animations code, or stable JSON.”** README: **“Import a JSON sketch or download CSS, Web Animations, and JSON files.”** Privacy: **“Exporting creates a file or copies text on your device.”**

**Why this matters:** `@claim:three-exports` verifies rendered text in all three tabs, then downloads only JSON. It never presses a Copy action and never downloads the CSS or Web Animations files. Those more specific public outcomes are therefore not asserted by the test attached to `three-exports`. A manual live check successfully copied CSS and downloaded `lantern-drift.css`, `lantern-drift.js`, and `lantern-drift.json`, so this is a coverage gap rather than a broken export.

**Concrete fix:** expand `@claim:three-exports` to grant clipboard permission, press each Copy action, and compare clipboard text with the visible export. Download each format and assert the filename, extension, and deterministic content. Alternatively, narrow README to **“Import a JSON sketch. Export CSS, Web Animations code, or JSON.”** and remove the copy/file-specific privacy sentence.

### Minor — F-5-4: The 404 uses metaphor instead of naming the error

**Location / exact copy:** direct 404: eyebrow **“404 · Path ended”**, h1 **“This frame does not exist”**, and body **“The address points outside this sketch.”**

**Why this matters:** “frame” and “sketch” reuse animation language as a page-not-found metaphor. A heading list does not identify the route error in plain words. This conflicts with the rule that headings name their section and that brand-lore metaphors carry no essential information.

**Concrete fix:** use **“404”**, **“Page not found”**, and **“This address does not match a page on this site.”** Keep **“Return to the sketchpad”** as the recovery action.

### Minor — F-5-5: The Terms h1 does not name the page

**Location / exact quote:** `/terms` h1: **“Use the sketchpad as it is.”**

**Why this matters:** heard without the eyebrow or route title, this sounds like an instruction and does not identify the Terms page. The route otherwise has correct metadata and structure.

**Concrete fix:** change the h1 to **“Terms for using Motion Graph Sketchpad.”**

## Copy audit

Counts exclude punctuation-only marks, treat hyphenated terms and code identifiers as one word, and count quoted multiword names normally. Repeated labels are listed once. Sample field values and generated export code are data, not authored sentences. No authored line exceeds 22 words and no banned marketing adjective appears.

### Landing page (`/`)

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Clear link |
| Motion Graph Sketchpad | 3 | Product name |
| Motion Graph Sketchpad home | 4 | Clear wordmark link name |
| Demo | 1 | Clear navigation |
| Sketchpad | 1 | Clear navigation |
| Privacy | 1 | Clear navigation |
| Terms | 1 | Clear footer navigation |
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
| 0 ms | 2 | Numeric preview label |
| Play preview | 2 | Result-naming action |
| Restart preview | 2 | Result-naming action |
| Playhead | 1 | Bound control label |
| No properties yet. | 3 | Clear empty state |
| Sketch name | 2 | Bound input label |
| Duration | 1 | Bound input label |
| ms | 1 | Duration unit |
| Import JSON | 2 | Result-naming action |
| Clear sketch | 2 | Result-naming action; privacy coverage is F-5-1 |
| Add property | 2 | Control-group label |
| Add number property | 3 | Result-naming action |
| Add colour property | 3 | Result-naming action |
| 0/8 | 1 | Property-count label |
| Add the first property | 4 | Clear empty-state h3 |
| Its keyframes and motion path will appear here. | 8 | Clear empty-state outcome |
| Three moves | 2 | Informative step count |
| How it works | 3 | Literal h2 |
| Add a motion property | 4 | Literal h3 |
| Add up to eight number or colour properties. | 8 | `eight-properties` |
| Set keyframe times | 3 | Literal h3 |
| Add keyframes, drag their times, and choose easing. | 8 | F-5-2 |
| Export animation code | 3 | Literal h3 |
| Copy CSS, Web Animations code, or stable JSON. | 8 | F-5-3 |
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
| v1.0.4 | 1 | Build identifier |
| Original generated imagery | 3 | Provenance label |

### Required demo-specific copy (`/demo`)

Common landing/footer text is not repeated here.

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
| Add keyframe at playhead | 4 | Result-naming action; claim gap is F-5-2 |
| Selected keyframe | 2 | Literal inspector label |
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
| Copy CSS | 2 | Result-naming action; test coverage is F-5-3 |
| Download file | 2 | Result is clear beside the selected format; test coverage is F-5-3 |

### README

Code-block commands are executable instructions rather than sentences; they were run as part of verification.

| Sentence, heading, or instruction | Words | Result |
| --- | ---: | --- |
| Motion Graph Sketchpad | 3 | Product name |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Plain job statement |
| The tool is for web and game creators. | 8 | Plain audience |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | F-5-2 for placing a new keyframe; other clauses are listed |
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
| Choose an easing name in the selected keyframe panel. | 9 | `five-standard-easings` |
| Import a JSON sketch or download CSS, Web Animations, and JSON files. | 12 | `json-import`; download coverage is F-5-3 |
| Data and offline use | 4 | Literal heading |
| Real sketches use one localStorage key: motion-graph-sketchpad:sketch:v1. | 7 | Exact storage detail; `local-only` |
| Demo mode does not read or write that key. | 9 | `demo-isolation` |
| After one online visit, the browser stores the files needed to reopen the app offline. | 15 | `offline-reload` |
| The app has no accounts. | 5 | `no-account-demo-network` |
| During the demo, it connects only to this website. | 9 | `no-account-demo-network` |
| See the privacy page. | 4 | Link instruction |
| Deployment | 1 | Literal heading |
| Deploy the contents of dist/ as a static site. | 9 | Developer instruction |
| staticwebapp.config.json includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 14 | Verified repository statement |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Scope statement |
| License | 1 | Literal heading |
| MIT. | 1 | License declaration |
| See LICENSE. | 2 | Link instruction |

### Terminology

| Concept | Term used | Result |
| --- | --- | --- |
| Saved experiment | sketch | Consistent |
| Animated named value | property | Consistent |
| Value at one time | keyframe | Consistent |
| Timeline position | playhead | Consistent |
| Playback surface | preview | Consistent |
| Temporary sample workspace | demo | Consistent |
| Browser animation API/export | Web Animations | Consistent |

## Demo, sandbox, privacy, and offline behavior

- One click on **Try it with sample data** changed the route to demo mode and showed the persistent banner, “Lantern drift,” Drift X, Lift, Scale, Glow colour, and Play/Restart controls before scroll. The lowest required control ended at y=702.9 in the 844 px viewport. Evidence: `/tmp/mgs-review-5/demo-after-click-390x844.png`.
- The first demo screen visibly contains a working preview. Playing it changed the time and object transform in the claim test.
- A real storage sentinel was installed before demo entry. Editing and resetting the demo left its serialized bytes unchanged. **Open my real sketch** restored the sentinel. Reset restored the sample name, four properties, and 12 keyframes.
- The live full-flow request log contained zero off-origin requests. It contained no analytics, account, payment, font-CDN, AI-provider, or provider-key request.
- `@claim:offline-reload` obtained service-worker control, switched the fresh context offline, reloaded `/demo`, and kept the demo/editor usable.
- At the bottom of the mobile document, the sticky demo banner and both actions remained visible and keyboard focusable.

## Claims verification

The repository was cloned to `/tmp/mgs-review5-clean` at the reviewed revision. `npm ci` reported zero vulnerabilities. Every command in `.factory/claims.json` was run separately from that clone. Each claim tag occurs exactly once in test source.

| Claim ID | Result | Observable evidence |
| --- | --- | --- |
| `offline-reload` | PASS | Controlled demo reloaded offline |
| `local-only` | PASS | Full demo/export/real-save flow stayed same-origin and real data persisted locally |
| `three-exports` | PASS, incomplete public-copy coverage in F-5-3 | CSS, Web Animations, and JSON output rendered; JSON downloaded and parsed |
| `demo-isolation` | PASS | Seeded real bytes were neither read into nor overwritten by demo |
| `eight-properties` | PASS | Eight properties added; ninth controls disabled |
| `deterministic-export` | PASS | All three outputs matched byte-for-byte after reload |
| `keyboard-keyframes` | PASS | Arrow moved 50 ms; Shift+Arrow moved a further 250 ms |
| `free-no-account` | PASS | Fact visible; no account/payment gate |
| `json-import` | PASS | Version 1 fixture loaded its name and property |
| `drag-keyframes` | PASS | Pointer drag changed accessible time |
| `easing-preview` | PASS | Preview time and computed transform changed |
| `demo-four-property-sample` | PASS | One phone click exposed the banner, named sample, four names, and working preview above fold |
| `five-standard-easings` | PASS | All five exact values were present and selectable |
| `no-account-demo-network` | PASS | No account field and zero off-origin requests during edit/download |
| `demo-reset` | PASS | Original name, four properties, and 12 keyframes restored |
| `waapi-registers-properties` | PASS | Each custom property was registered before `element.animate` |

No listed command failed, so there is no blocking claim-test failure. F-5-1 and F-5-2 are unlisted claims; F-5-3 identifies outcomes that the existing listed test does not assert.

## Earlier finding verification

Every earlier `review-*.md`, `polish-*.md`, and the current historical handoff was read. Earlier verification findings referenced by those records were also rechecked. A prior “fixed” label was not treated as evidence.

| Earlier finding | Live and source recheck | Result |
| --- | --- | --- |
| F-1-1 — vague headings/caption | Live and `src/main.ts` retain “Edit motion property values,” “What this sketchpad does not do,” “Tool limits,” and “Test motion. Export the code.” | Fixed |
| F-1-2 — vague action labels | Add-property, Restart preview, and Open my real sketch labels remain literal in live UI and source. | Fixed |
| F-1-3 — missing sample/easing/network/export entries | Corresponding entries exist, occur once, and their commands pass. F-5-1 through F-5-3 are different, newly identified coverage gaps. | Fixed as originally scoped |
| Verification High — mobile targets | Live 390 px regression audited every visible link, button, input, select, textarea, tab, and custom button; none was under 44 × 44 px. | Fixed |
| Verification Medium — immutable assets | Live hashed JS is `public, max-age=31536000, immutable`; `sw.js` is `no-cache, no-store, must-revalidate`. | Fixed |
| Verification Low — raw JSON errors | Syntax-invalid and structurally invalid imports produce plain recovery messages in the passing quality test. | Fixed |
| Verification Low — unknown paths returned 200 | `/missing-review-5` returned HTTP 404 with the designed shared shell. | Fixed |
| F-2-1 — desktop action below fold | At 1366 × 768, action, helper, facts, and art all fit before scroll. | Fixed |
| F-2-2 — demo banner not persistent | At document bottom on mobile, banner, Reset, and exit remained visible and keyboard reachable. | Fixed |
| F-2-3 — incomplete 44 px fix | All visible mobile interactive targets are covered by the broad geometry test and pass. | Fixed |
| F-2-4 — incomplete direct 404 shell | Direct HTTP 404 has header/footer, legal links, favicon, canonical, OG/Twitter metadata, one h1/main, and return action. Its new wording issue is F-5-4. | Fixed structurally |
| F-2-5 — stale route metadata | Demo, Privacy, and Terms set their own title, description, canonical, OG, and Twitter values. | Fixed |
| F-2-6 — Reset unlisted | `demo-reset` exists and restores the full original sample. | Fixed |
| F-2-7 — demo read isolation untested | The test seeds distinctive real bytes and proves demo neither reads nor writes them. | Fixed |
| F-2-8 — unclear/unlisted browser support | Copy names Web Animations and `waapi-registers-properties` asserts registration order. | Fixed |
| F-2-9 — metaphorical process labels | Add a motion property, Set keyframe times, Export animation code, and Export options remain literal. | Fixed |
| F-2-10 — README browser jargon | README describes offline reopening and same-site connections as user outcomes. | Fixed |
| F-2-11 — JavaScript/Web Animations inconsistency | Web Animations is used consistently for the export. | Fixed |
| Review 3 | It reported no finding; its full cold-read, demo, route, Axe, privacy, and claim checks were rerun. | No regression in its tested scope |
| F-4-1 — demo repeated the landing hero | One click now opens the compact product-first deck; all required sample controls end above y=703 at 390 × 844. | Fixed |

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/privacy`, and `/terms` return 200. Each has `lang=en`, exactly one h1/main, a route-specific title, description, canonical, Open Graph/Twitter metadata, favicon, and consistent header/footer with Privacy and Terms.
- The home title is **“Motion Graph Sketchpad — Sketch property motion.”** Demo, Privacy, and Terms use the required route-first pattern.
- `/missing-review-5` returns HTTP 404. Its skeleton and metadata pass; its wording is F-5-4.
- Client navigation focuses and announces the destination h1. Back navigation restores and focuses the preceding route. Deep links reload into the correct route.
- Every crawled link resolved: home, demo query, Privacy, Terms, and Param Factory returned 200; the skip/hash links and `mailto:` are valid explicit destinations.
- `robots.txt`, `sitemap.xml`, SVG favicon, 180 px Apple touch icon, manifest, and the 1200 × 630 social image all return 200.
- Axe reported zero violations, not merely zero serious/critical violations, on Home, Demo, Privacy, and Terms at 390 × 844. There was no console error. Reduced motion, mobile width, keyboard keyframes, focus routing, and 44 px targets all passed browser tests.
- The generated night editing bay, cyan motion paths, amber keyframes/actions, mono utility face, asymmetrical desktop hero, and chamfered panels match `.factory/design.md`. This does not look like a generic SaaS template.
- The local and live production JS/CSS hashes match. Initial JavaScript is 34.08 kB raw / 10.91 kB gzip; CSS is 22.28 kB raw / 5.72 kB gzip.

## Missed leverage

No missing AI or sync feature is implied by the brief. The job is deterministic local motion editing; adding remote generation would add key, cost, and privacy work without removing a required step. The expected interoperability exists through JSON import and CSS, Web Animations, and JSON export. No provider key or AI endpoint appears in the product.

## Verification summary

- Clean clone: `/tmp/mgs-review5-clean`
- All 16 claim commands: passed independently
- `npm test`: 10 unit tests and 27 Chromium tests passed
- `npm run build`: passed and produced `dist/`
- Live browser suite: 27/27 passed
- Live Axe: 0 violations on four real routes
- Live requests: 0 off-origin during the demo flow
- Live/local asset hashes: identical

## What would make this perfect

Add tagged claim coverage for clearing a real sketch and adding a keyframe. Expand the export claim test to exercise every promised Copy and Download outcome. Replace the 404 metaphors and the vague Terms h1 with the literal rewrites above. Then rerun the complete cold-read, copy, sandbox, claim, history, route, accessibility, and live-network checks. Those five changes are the complete remaining list from this review.
