# Adversarial first-read review 7 — FAIL

**Reviewed:** 2026-08-29
**Live site:** <https://motion-graph-sketchpad.sociobot.in>
**Revision:** `c1c647f81562b64c3e82f7ac6c5ec17bafc9b1e8`

## Verdict

**FAIL.** Cold-read clarity, demo behavior, claims, privacy, build, routes, and the visual system pass. Two findings remain. The unresolved historical accessibility finding is blocking under this work order's history rule.

## Cold first read

Fresh Chromium contexts loaded the live home route before scrolling, with no application-console errors.

| Viewport | What it does | Who it is for | What to click first |
| --- | --- | --- | --- |
| 390 × 844 | Sketches property motion before coding. | Web and game creators testing animation without scripts or a full timeline editor. | **Try it with sample data**; it loads a four-property motion sketch. |
| 1440 × 900 | Same. | Same. | Same. |

This gate passes. The phone first screen contains the headline, audience sentence, action, helper, and all three facts without horizontal overflow. The night editing-bay art, cyan paths, amber editable moments, mono utility type, and chamfered panels are distinct and fit the documented visual thesis; this is not a generic SaaS template.

## Findings

### Blocking — F-7-1 (retained `V6-1`): export controls claim the ARIA tab pattern but omit its keyboard behavior

**Location / exact UI:** the **CSS**, **Web Animations**, and **JSON** controls in the demo's “Export code” section (`src/main.ts`, `exportPanel`).

**Evidence:** On live `/demo`, I focused **CSS** then pressed `ArrowRight`. Focus remained on **CSS** and `aria-selected="true"` remained on **CSS**. The live controls expose `role="tab"`, but have no `aria-controls`, no roving `tabindex`, and no associated `role="tabpanel"`. Source registers click handlers for `[data-export-kind]`; its ArrowLeft/ArrowRight handler applies only to keyframes.

**Why a visitor is misled:** keyboard and screen-reader users are told these are tabs, but their normal tab-keyboard model does not work. This is the unresolved `V6-1` recorded in `.factory/verification-6.md`; this round's history rule makes it blocking again.

**Concrete fix:** use one selected tab with `tabindex="0"` and the others `-1`; support Left/Right/Home/End selection and focus; and connect the selected tab to an output `role="tabpanel"` using `aria-controls`. Add a test that focuses CSS, presses ArrowRight, and verifies that Web Animations is focused and selected.

### Minor — F-7-2: the landing footer makes an unlisted provenance claim

**Location / exact copy:** the footer says **“v1.0.6 · Original generated imagery”**.

**Why a visitor is misled:** “Original generated imagery” is a factual provenance assertion with no `.factory/claims.json` entry or observable sandbox test. The design document records provenance, but that does not test the visitor-facing claim.

**Concrete fix:** remove the phrase from the footer and retain provenance in `.factory/design.md`, or add a meaningful reproducible provenance verification before retaining it.

## Copy audit

Counts treat hyphenated terms, code identifiers, URLs, and version identifiers as one word. Controls and headings are included because they are encountered as standalone text. No line exceeds 22 words. No banned marketing adjective, inconsistent term, vague heading, or non-result-naming control was found. `localStorage` and export-format names are concrete developer-documentation terms with accompanying plain-language explanation.

### Landing page (`/`)

| Copy | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
| Motion Graph Sketchpad | 3 | Pass wordmark |
| Demo | 1 | Pass |
| Sketchpad | 1 | Pass |
| Privacy | 1 | Pass |
| Sketch property motion before coding | 5 | Pass |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Pass |
| Try it with sample data | 6 | Pass action |
| Loads a four-property motion sketch. | 5 | `demo-four-property-sample` |
| Works offline after the first visit. | 6 | `offline-reload` |
| Sketches stay in this browser. | 5 | `local-only` |
| Free. No account. | 3 | `free-no-account` |
| A dark animation desk overlooks mountains crossed by cyan motion paths. | 10 | Pass image alternative |
| Test motion. Export the code. | 5 | Listed export result |
| The sketchpad | 2 | Pass label |
| Edit motion property values | 4 | Pass heading |
| Drag keyframes sideways. | 3 | `drag-keyframes` |
| Use arrow keys for 50 ms steps. | 7 | `keyboard-keyframes` |
| Play preview | 2 | Pass action |
| Restart preview | 2 | Pass action |
| Playhead | 1 | Pass label |
| Add property | 2 | Pass label |
| Add number property | 3 | Pass action |
| Add colour property | 3 | Pass action |
| No properties yet. | 3 | Pass empty state |
| Add the first property | 4 | Pass heading |
| Its keyframes and motion path will appear here. | 8 | Pass empty-state guidance |
| Three moves | 2 | Pass label; adjacent heading names section |
| How it works | 3 | Pass heading |
| Add a motion property | 4 | Pass heading |
| Add up to eight number or colour properties. | 8 | `eight-properties` |
| Set keyframe times | 3 | Pass heading |
| Add keyframes, drag their times, and choose easing. | 8 | `add-keyframe`, `drag-keyframes`, `easing-preview` |
| Export animation code | 3 | Pass heading |
| Copy CSS, Web Animations code, or stable JSON. | 8 | `three-exports`, `deterministic-export` |
| Tool limits | 2 | Pass label |
| What this sketchpad does not do | 6 | Pass heading |
| This tool does not rig characters, render video, or manage teams. | 11 | Pass scope limit |
| It tests plain values before you open a larger editor. | 10 | Pass scope explanation |
| No account exists. | 3 | `free-no-account` |
| Your real sketch uses local browser storage. | 7 | `local-only` |
| Demo changes disappear when you leave. | 6 | `demo-isolation` |
| Export CSS, Web Animations code, or JSON. | 6 | `three-exports` |
| Terms | 1 | Pass link |
| Built by Param Factory | 4 | Pass attribution |
| v1.0.6 · Original generated imagery | 4 | **F-7-2** |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Motion Graph Sketchpad | 3 | Pass title |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Pass |
| The tool is for web and game creators. | 9 | Pass |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Listed feature set |
| Live site: https://motion-graph-sketchpad.sociobot.in | 2 | Pass link |
| Try the isolated demo | 4 | Pass heading |
| Open https://motion-graph-sketchpad.sociobot.in/?demo=1. | 1 | Pass action |
| It opens the “Lantern drift” sample with four animated properties in a working editor. | 12 | `demo-four-property-sample` |
| Demo edits use memory only and disappear when you leave. | 9 | `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | `demo-reset` |
| Use Open my real sketch to leave the demo. | 9 | Pass guidance |
| Run locally | 2 | Pass heading |
| Requirements: Node.js 20 or newer. | 5 | Pass requirement |
| Open http://localhost:5173/?demo=1 for the sample or / for a real sketch. | 5 | Pass instruction |
| Test and build | 3 | Pass heading |
| The exact production build command is npm run build. | 8 | Pass instruction |
| It writes the static site to dist/, with dist/index.html at the root. | 10 | Pass instruction |
| Run one public claim by its tag: | 7 | Pass instruction |
| Claim definitions and sandbox steps are in .factory/claims.json. | 6 | Pass instruction |
| The demo contract is in .factory/demo.md. | 6 | Pass instruction |
| Controls | 1 | Pass heading |
| Drag a keyframe left or right to change its time. | 10 | `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 13 | `keyboard-keyframes` |
| Add a keyframe at the current playhead. | 7 | `add-keyframe` |
| Choose an easing name in the selected keyframe panel. | 9 | `five-standard-easings` |
| Import a JSON sketch or download CSS, Web Animations, and JSON files. | 12 | `json-import`, `three-exports` |
| Data and offline use | 4 | Pass heading |
| Real sketches use one localStorage key: motion-graph-sketchpad:sketch:v1. | 5 | Pass implementation detail |
| Use Clear sketch in the editor to remove a saved sketch from this browser. | 14 | `clear-sketch-data` |
| Demo mode does not read or write that key. | 9 | `demo-isolation` |
| After one online visit, the browser stores the files needed to reopen the app offline. | 14 | `offline-reload` |
| The app has no accounts. | 5 | `no-account-demo-network` |
| During the demo, it connects only to this website. | 8 | `no-account-demo-network` |
| See the privacy page. | 4 | Pass link guidance |
| Deployment | 1 | Pass heading |
| Deploy the contents of dist/ as a static site. | 9 | Pass instruction |
| staticwebapp.config.json includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 10 | Pass documentation |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Pass scope statement |
| License | 1 | Pass heading |
| MIT. | 1 | Pass license |
| See LICENSE. | 2 | Pass link guidance |

## Demo, sandbox, and claims

- One click from the live home route entered `/?demo=1`. At 390×844, the first screen showed the persistent no-save banner, reset/exit actions, **Lantern drift**, four editable properties, and a working preview. Reset restored the original sample.
- A fresh demo context had no real-sketch localStorage after edit/reset. Recorded demo requests were same-origin only.
- Every one of the 18 exact commands declared in `.factory/claims.json` passed independently in a fresh clone. Fresh `npm test` passed 11 unit and 33 Chromium tests; `npm run build` produced `dist/`.
- The same 33 Chromium tests passed against the live origin, including offline reload, request logging, demo isolation, export/download, mobile targets, routing/focus/history, reduced motion, and Axe scans.

## History verification

Every earlier review, polish report, verification report, and handoff was read. This matrix records fresh live-and-code checks, not prior labels.

| Earlier finding | Fresh result |
| --- | --- |
| F-1-1 | Fixed: literal sketchpad, limits, and export wording remain. |
| F-1-2 | Fixed: property, restart-preview, and real-sketch actions name results. |
| F-1-3 | Fixed: sample, easing, export, and same-site claims are declared and pass. |
| Initial verification: mobile targets | Fixed: complete live 390 px target audit passes. |
| Initial verification: immutable assets | Fixed: `/assets/*` receives immutable cache policy. |
| Initial verification: malformed import recovery | Fixed: suite verifies plain recovery guidance. |
| Initial verification: unknown routes returned 200 | Fixed: `/review-7-missing` returns HTTP 404. |
| F-2-1 | Fixed: action and facts fit at all five tested first-screen sizes. |
| F-2-2 | Fixed: banner stays visible and keyboard-reachable after mobile scrolling. |
| F-2-3 | Fixed: complete mobile hit-target audit passes. |
| F-2-4 | Fixed: direct 404 has the shared shell, legal links, metadata, and return action. |
| F-2-5 | Fixed: Demo, Privacy, and Terms metadata updates per route. |
| F-2-6 | Fixed: reset is declared and restores the sample. |
| F-2-7 | Fixed: demo neither reads nor writes seeded real storage. |
| F-2-8 | Fixed: Web Animations registration is concrete and output-tested. |
| F-2-9 | Fixed: process and export labels are literal. |
| F-2-10 | Fixed: README states privacy/offline outcomes plainly. |
| F-2-11 | Fixed: Web Animations terminology is consistent. |
| F-4-1 | Fixed: post-click phone demo is product-first. |
| F-5-1 | Fixed: Clear sketch is declared and tested. |
| F-5-2 | Fixed: playhead keyframe insertion is declared and tested. |
| F-5-3 | Fixed: all three exports are copied/downloaded and byte-compared. |
| F-5-4 | Fixed: 404 says “Page not found.” |
| F-5-5 | Fixed: Terms h1 names the page. |
| F-6-1 | Fixed: eight-property claim passed independently and in parallel suite. |
| V5-1 | Fixed: hero action/facts fit at 1366×768, 1440×900, 1536×864, 1920×1080, and 390×844. |
| V6-1 | **Unfixed — reopened as F-7-1.** Live ARIA export tabs still lack Arrow-key navigation and a tabpanel relationship. |

## Structure and leverage checks

- All internal and external links found on `/`, `/demo`, `/privacy`, `/terms`, and the 404 returned 200, except the explicit `mailto:` action. The deliberate missing route returned 404.
- Title, description, canonical, OG/Twitter image, favicon, `lang`, one h1, one main, skip link, shared header/footer, Privacy/Terms, sitemap, robots, CSP, designed 404, and route focus/history passed live checks.
- The brief already implies and the product supplies import/export. It does not imply AI assistance or sync; adding them would be decorative scope expansion. No provider keys or runtime third-party requests were found.

## What would make this perfect

Implement and test conventional ARIA export-tab behavior. Remove or meaningfully verify the footer provenance assertion. Then rerun this full fresh-clone and live checklist with zero findings.
