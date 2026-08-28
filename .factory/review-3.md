# Adversarial first-read review 3 — PASS

**Reviewed:** 2026-08-28  
**Live site:** <https://motion-graph-sketchpad.sociobot.in>  
**Repository revision:** `272bd93ee6ffb0a6beee4dcfc5eb4ee01c4715aa`

## Verdict

**PASS.** This round produced zero findings. The cold-read, one-click demo, claim, privacy, history, structure, accessibility, routing, and copy checks all passed. The expected browser developer-tools message for the HTTP-404 document itself was not counted as an application console error: the page intentionally returns HTTP 404 and contains no failing script or resource.

## Cold first read

Fresh Chromium contexts opened `/` at scroll position zero, with no persisted storage or cache.

| Viewport | What it does | For whom | What to click first | Result |
| --- | --- | --- | --- | --- |
| 390 × 844 | “Sketch property motion before coding” | “For web and game creators testing animation without scripts or a full timeline editor.” | **Try it with sample data**; “Loads a four-property motion sketch.” | Pass. All three facts are also visible before scroll; no horizontal overflow. |
| 1366 × 768 | Same headline | Same audience sentence | **Try it with sample data**, with its outcome and the three facts | Pass. The action is at y=494–542 and the facts end at y=641. |

The first screen answers all three required questions. No blocking first-read text is present.

## Copy audit

Counts treat hyphenated words, product names, URLs, and code identifiers as one word. The first table covers every sentence-like piece of cold `/` copy, including labels and headings so that a heading-list or control-list reading is checked too. The product has no copy over 22 words, banned marketing adjective, unexplained heading, inconsistent product term, or non-result-naming button.

### Landing (`/`)

| Copy | Words | Result |
| --- | ---: | --- |
| Motion Graph Sketchpad | 3 | Product name; pass |
| Demo | 1 | Navigation label; pass |
| Sketchpad | 1 | Navigation label; pass |
| Privacy | 1 | Navigation label; pass |
| Sketch property motion before coding | 5 | Plain job headline; pass |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Plain audience/outcome; pass |
| Try it with sample data | 6 | Result-naming demo action; pass |
| Loads a four-property motion sketch. | 5 | Listed: `demo-four-property-sample` |
| Works offline after the first visit. | 6 | Listed: `offline-reload` |
| Sketches stay in this browser. | 5 | Listed: `local-only` |
| Free. | 1 | Listed: `free-no-account` |
| No account. | 2 | Listed: `free-no-account` |
| Test motion. | 2 | Plain caption; supported by `easing-preview` |
| Export the code. | 3 | Plain caption; supported by `three-exports` |
| The sketchpad | 2 | Section label; pass |
| Edit motion property values | 4 | Stand-alone heading; pass |
| Drag keyframes sideways. | 3 | Listed: `drag-keyframes` |
| Use arrow keys for 50 ms steps. | 7 | Listed: `keyboard-keyframes` |
| Play preview | 2 | Result-naming action; pass |
| Restart preview | 2 | Result-naming action; pass |
| Playhead | 1 | Control label; pass |
| No properties yet. | 3 | Empty state; pass |
| Add property | 2 | Control-group label; pass |
| Add number property | 3 | Result-naming action; pass |
| Add colour property | 3 | Result-naming action; pass |
| Add the first property | 4 | Empty-state heading; pass |
| Its keyframes and motion path will appear here. | 8 | Empty-state instruction; pass |
| Sketch name | 2 | Form label; pass |
| Duration | 1 | Form label; pass |
| Import JSON | 2 | Result-naming action; listed: `json-import` |
| Clear sketch | 2 | Result-naming action; pass |
| Three moves | 2 | Section label; pass |
| How it works | 3 | Stand-alone heading; pass |
| Add a motion property | 5 | Stand-alone heading; pass |
| Add up to eight number or colour properties. | 8 | Listed: `eight-properties` |
| Set keyframe times | 3 | Stand-alone heading; pass |
| Add keyframes, drag their times, and choose easing. | 8 | Covered by drag/easing claims |
| Export animation code | 3 | Stand-alone heading; pass |
| Copy CSS, Web Animations code, or stable JSON. | 8 | Listed: `three-exports`, `deterministic-export` |
| Tool limits | 2 | Section label; pass |
| What this sketchpad does not do | 6 | Stand-alone heading; pass |
| This tool does not rig characters, render video, or manage teams. | 11 | Clear scope limit; pass |
| It tests plain values before you open a larger editor. | 10 | Clear scope statement; pass |
| No account exists. | 3 | Listed: `free-no-account` |
| Your real sketch uses local browser storage. | 7 | Listed: `local-only` |
| Demo changes disappear when you leave. | 6 | Listed: `demo-isolation` |
| Export CSS, Web Animations code, or JSON. | 7 | Listed: `three-exports` |
| Built by Param Factory | 4 | Footer attribution; pass |
| Original generated imagery | 3 | Asset provenance label; pass |

### Required demo (`/demo`)

| Copy | Words | Result |
| --- | ---: | --- |
| Demo — sample data, nothing is saved | 6 | Listed: `demo-isolation` |
| Reset demo | 2 | Result-naming action; listed: `demo-reset` |
| Open my real sketch | 4 | Result-naming exit action; pass |
| Select a keyframe to edit its value and easing. | 9 | Clear instruction; pass |
| Output stays stable when the sketch stays the same. | 9 | Listed: `deterministic-export` |
| Browser support | 2 | Section label; pass |
| Choose from five standard timing functions. | 6 | Listed: `five-standard-easings` |
| The Web Animations export registers each custom CSS property before animating it. | 11 | Listed: `waapi-registers-properties` |
| Export options | 2 | Stand-alone heading; pass |
| Export code | 2 | Stand-alone heading; pass |
| Copy CSS | 2 | Result-naming action; pass |
| Download file | 2 | Result-naming action; pass |

### README

| Sentence / instruction | Words | Result |
| --- | ---: | --- |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Plain product description; pass |
| The tool is for web and game creators. | 8 | Audience statement; pass |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Covered by the listed feature claims; pass |
| Live site: https://motion-graph-sketchpad.sociobot.in | 2 | Link; pass |
| Open https://motion-graph-sketchpad.sociobot.in/?demo=1. | 2 | Instruction; pass |
| It loads the “Lantern drift” sample with four animated properties. | 10 | Listed: `demo-four-property-sample` |
| Demo edits use memory only and disappear when you leave. | 10 | Listed: `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | Listed: `demo-reset` |
| Use Open my real sketch to leave the demo. | 9 | Clear instruction; pass |
| Requirements: Node.js 20 or newer. | 5 | Developer requirement; pass |
| Open http://localhost:5173/?demo=1 for the sample or / for a real sketch. | 11 | Developer instruction; pass |
| The exact production build command is npm run build. | 9 | Developer instruction; command verified; pass |
| It writes the static site to dist/, with dist/index.html at the root. | 12 | Build result verified; pass |
| Run one public claim by its tag. | 7 | Developer instruction; pass |
| Claim definitions and sandbox steps are in .factory/claims.json. | 8 | Repository pointer; pass |
| The demo contract is in .factory/demo.md. | 6 | Repository pointer; pass |
| Drag a keyframe left or right to change its time. | 10 | Listed: `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | Listed: `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 12 | Listed: `keyboard-keyframes` |
| Choose an easing name in the selected keyframe panel. | 9 | Listed: `five-standard-easings` |
| Import a JSON sketch or download CSS, Web Animations, and JSON files. | 11 | Listed: `json-import`, `three-exports` |
| Real sketches use one localStorage key: motion-graph-sketchpad:sketch:v1. | 7 | Implementation detail verified in the isolation test; pass |
| Demo mode does not read or write that key. | 9 | Listed: `demo-isolation` |
| After one online visit, the browser stores the files needed to reopen the app offline. | 15 | Listed: `offline-reload` |
| The app has no accounts. | 5 | Listed: `no-account-demo-network` |
| During the demo, it connects only to this website. | 9 | Listed: `no-account-demo-network` |
| See the privacy page. | 4 | Link instruction; pass |
| Deploy the contents of dist/ as a static site. | 9 | Developer instruction; pass |
| staticwebapp.config.json includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 14 | Repository/deployment instruction verified by config and live headers; pass |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Scope instruction; pass |
| MIT. | 1 | License declaration; pass |
| See LICENSE. | 2 | Link instruction; pass |

## Demo, storage, privacy, and claims

- One click on **Try it with sample data** entered `?demo=1` and immediately showed the realistic four-property “Lantern drift” sketch.
- The amber banner was present. At 390 px after scrolling to the document bottom it remained at y=0–75.3 with both **Reset demo** and **Open my real sketch** reachable.
- Editing the sample and pressing **Reset demo** restored “Lantern drift.” The demo began with no real-sketch localStorage value. The declared isolation test separately seeds a real sentinel and proves demo neither reads nor writes it.
- A live full demo edit/export/reset flow produced zero off-origin requests. It made no account, payment, analytics, provider-key, or third-party-font request.
- The clean-clone offline test loaded the controlled service worker, went offline, reloaded `/demo`, and retained the banner and editor.

All 16 declared claim commands were run independently in clean clone `/tmp/mgs-review3-clean-20260828`; each passed. `npm test` then passed all 7 unit tests and all 16 claim plus 7 quality browser tests (23 browser tests total), and `npm run build` produced `dist/`.

| Claim IDs passing | 
| --- |
| `offline-reload`, `local-only`, `three-exports`, `demo-isolation`, `eight-properties`, `deterministic-export`, `keyboard-keyframes`, `free-no-account` |
| `json-import`, `drag-keyframes`, `easing-preview`, `demo-four-property-sample`, `five-standard-easings`, `no-account-demo-network`, `demo-reset`, `waapi-registers-properties` |

No claim-like visitor sentence on the landing, demo, Privacy page, or README lacks a matching observable claim test. Build/deployment instructions in the README were also executed or inspected rather than accepted as marketing claims.

## Earlier finding verification

Every earlier review, polish, verification, and handoff record was read. Live-site and source rechecks confirm the following results.

| Earlier finding | Live and code recheck | Result |
| --- | --- | --- |
| F-1-1 | Literal headings (“Edit motion property values,” “What this sketchpad does not do,” “Tool limits”) and literal hero caption remain present. | Fixed |
| F-1-2 | Add-property, restart, and real-sketch actions retain result-naming labels. | Fixed |
| F-1-3 | Four-property, five-easing, export, and same-site request claims all have passing declared tests. | Fixed |
| Verification High: 44 px targets | All 53 visible phone interactive targets measured at least 44 × 44 px. | Fixed |
| Verification Medium: asset caching | Live hashed JS/CSS responses are `max-age=31536000, immutable`; worker is no-cache/no-store. | Fixed |
| Verification Low: JSON recovery | Deep validation and plain recovery messages are covered by quality test. | Fixed |
| Verification Low: unknown-route status | `/missing-frame` returns HTTP 404 and provides the complete styled return page. | Fixed |
| F-2-1 | At 1366 × 768 action, helper, facts, and art all fit before scroll. | Fixed |
| F-2-2 | The demo banner is sticky and keyboard reachable at page bottom. | Fixed |
| F-2-3 | Header/footer links and all other visible mobile targets meet the 44 px rule. | Fixed |
| F-2-4 | Direct HTTP-404 response has header/footer, legal links, favicon, canonical, OG/Twitter metadata, one h1/main, and return link. | Fixed |
| F-2-5 | Demo, Privacy, and Terms set their own title, description, canonical, Open Graph, and Twitter metadata. | Fixed |
| F-2-6 / F-2-7 | Reset has its own claim; demo isolation proves real storage is neither read nor written. | Fixed |
| F-2-8 | Web Animations registration wording is clear and asserted in export output. | Fixed |
| F-2-9 / F-2-10 / F-2-11 | Process headings are literal, README browser jargon is removed, and “Web Animations” is used consistently. | Fixed |

## Structure, accessibility, and identity

- `/`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, favicon, and every crawled first-party/external link returned 200. `/missing-frame` correctly returned 404.
- Each normal route has the required title pattern, one h1, one main, `lang=en`, description, canonical, OG/Twitter fields, favicon, and the shared header/footer. Privacy navigation moved focus to its h1 and announced it in the polite live region; browser back returned to the prior route.
- Live Axe reported zero violations. There was no horizontal phone overflow, and no live home/demo application console error. Reduced-motion and keyboard keyframe behavior are covered by the clean-clone browser checks.
- The night editing-bay image, cyan graph paths, amber keyframes, mono utility type, asymmetrical hero, and chamfered panels visibly match `.factory/design.md`. It is product-specific rather than a generic SaaS template.

## Missed leverage

No omitted AI, sync, or import/export feature is implied by the brief. The core job is deterministic direct editing; adding an AI request would add an account/key and privacy burden without removing a necessary step. The valuable interoperability expected here already exists: JSON import plus CSS, Web Animations, and JSON export.

## What would make this perfect

Keep this exact level of verification on future edits: repeat the cold mobile/desktop check, run every declared claim independently from a clean clone, inspect the live same-origin request log, and recrawl routes and metadata after each deployment. No product change is required from this review.
