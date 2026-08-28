# Adversarial first-read review 1 — FAIL

**Reviewed:** 2026-08-28  
**Live site:** <https://motion-graph-sketchpad.sociobot.in>  
**Revision reviewed:** `c1ee2430745c16a5d9500203419b73d273bf2150`

## Verdict

**FAIL.** The product is clear, functional, and genuinely tryable, but this review has three remaining minor findings. A PASS requires zero findings.

## Cold first read

Fresh Chromium contexts loaded the live home page at **390 × 844** and **1440 × 900**, before scrolling. Both showed the same essential content with no console errors or horizontal overflow.

| Question | First-screen answer |
| --- | --- |
| What does it do? | “Sketch property motion before coding.” |
| For whom? | “For web and game creators testing animation without scripts or a full timeline editor.” |
| What should I click first? | **Try it with sample data** — “Loads a four-property motion sketch.” |

This gate passes. The first screen is readable on a phone, names a real user, and names the result of the first action.

## Findings

### Minor — F-1-1: Two landing headings do not explain themselves

**Location / exact copy:** the `<h2>` headings “Shape the values” (`/#sketchpad`) and “Small on purpose” (the limits section). The nearby eyebrow “A disposable motion experiment” is also jargon rather than a clear section label.

**Why this matters:** read in a screen-reader heading list or encountered after a deep link, neither heading says what section follows. “Small on purpose” asks a first-time visitor to infer that this is the feature-limit section.

**Concrete fix:** change them to **“Edit motion property values”** and **“What this sketchpad does not do”**. Replace “A disposable motion experiment” with **“Tool limits”**. Also replace the hero-art caption “Test the path. Keep the code.” with the literal **“Test motion. Export the code.”**

### Minor — F-1-2: Several action buttons do not name their result

**Location / exact copy:** editor buttons “+ Number” and “+ Colour”; transport button “Restart”; demo-exit button “Start for real.”

**Why this matters:** “+ Number” and “+ Colour” omit the object being added, “Restart” does not say what restarts, and “Start for real” is a slogan rather than the destination. This is especially avoidable on the phone editor where actions are read out of their visual context.

**Concrete fix:** use **“Add number property”**, **“Add colour property”**, **“Restart preview”**, and **“Open my real sketch”**. Keep the existing, explicit empty-state labels as the terminology source.

### Minor — F-1-3: Several visitor-facing claims are not individually listed in `.factory/claims.json`

**Location / exact copy:**

- Hero helper text: “Loads a four-property motion sketch.”
- Demo export panel: “Exports use five standard timing function names.”
- Landing footer: “Sketch property motion and export ready-to-use code.”
- README, “Data and offline use”: “There are no accounts, analytics, ads, external fonts, or runtime third-party scripts.”

**Why this matters:** the claims contract requires a claims entry and one tagged observable test for every statement a visitor could rely on. Existing tests happen to exercise parts of these statements, but no claim entry names the four-property sample, the number of timing functions, the no-analytics/no-ads assertion, or whether exported code is “ready-to-use.” The latter is also an untestable marketing adjective.

**Concrete fix:**

- Add `demo-four-property-sample` and a `@claim:demo-four-property-sample` test that opens `/demo` cold and asserts “Lantern drift” plus its four named properties.
- Add `five-standard-easings` and a test that exports the fixture and verifies the five documented easing names, or remove the count from the copy.
- Replace the README sentence with the already testable, narrower **“The app has no accounts and makes no off-origin requests during the demo.”** Then list that exact statement with a full-flow intercepted-request test. Remove “ads” unless it has a meaningful observable test.
- Replace “ready-to-use code” with **“Export CSS, Web Animations code, or JSON.”**, which is already covered by `three-exports`.

## Copy audit

Counts treat hyphenated words and code identifiers as one word. The landing table covers all visitor-facing sentence-like copy on the cold home route; the sample-only table covers text revealed by the required demo path. No line exceeds 22 words. Flags are the findings above, plus the unlisted-claim flag where noted.

### Live landing (`/`)

| Copy | Words | Result |
| --- | ---: | --- |
| Sketch property motion before coding | 5 | Pass |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Pass |
| Loads a four-property motion sketch. | 5 | F-1-3: unlisted claim |
| Works offline after the first visit. | 6 | Listed: `offline-reload` |
| Sketches stay in this browser. | 5 | Listed: `local-only` |
| Free. | 1 | Listed with the following sentence: `free-no-account` |
| No account. | 2 | Listed: `free-no-account` |
| Test the path. | 3 | F-1-1: metaphor |
| Keep the code. | 3 | F-1-1: vague result |
| Drag keyframes sideways. | 3 | Listed: `drag-keyframes` |
| Use arrow keys for 50 ms steps. | 7 | Listed: `keyboard-keyframes` |
| No properties yet. | 3 | Pass empty state |
| Its keyframes and motion path will appear here. | 8 | Pass empty state |
| Add up to eight number or colour properties. | 8 | Listed: `eight-properties` |
| Add keyframes, drag their times, and choose easing. | 8 | Covered in part by `drag-keyframes` and `easing-preview` |
| Copy CSS, Web Animations code, or stable JSON. | 8 | Listed: `three-exports`, `deterministic-export` |
| This tool does not rig characters, render video, or manage teams. | 11 | Clear scope limit |
| It tests plain values before you open a larger editor. | 10 | Pass |
| No account exists. | 3 | Listed: `free-no-account` |
| Your real sketch uses local browser storage. | 7 | Listed: `local-only` |
| Demo changes disappear when you leave. | 6 | Listed: `demo-isolation` |
| Sketch property motion and export ready-to-use code. | 7 | F-1-3: unlisted / “ready-to-use” vague |

**Heading and button checks:** “Shape the values” and “Small on purpose” are F-1-1. “+ Number”, “+ Colour”, “Restart”, and “Start for real” are F-1-2. “Try it with sample data”, “Play preview”, “Clear sketch”, “Import JSON”, “Reset demo”, and the export actions name their outcome sufficiently.

### Required demo (`/demo`)

| Copy | Words | Result |
| --- | ---: | --- |
| Demo — sample data, nothing is saved | 6 | Listed: `demo-isolation` |
| Output stays stable when the sketch stays the same. | 9 | Listed: `deterministic-export` |
| Exports use five standard timing function names. | 7 | F-1-3: unlisted claim |
| Registered custom properties need CSS.registerProperty. | 5 | Plain technical compatibility note |
| Select a keyframe to edit its value and easing. | 9 | Pass |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Pass |
| The tool is for web and game creators. | 9 | Pass |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Listed feature set |
| Open the isolated demo. | 4 | Pass |
| It loads the “Lantern drift” sample with four animated properties. | 10 | F-1-3: unlisted count claim |
| Demo edits use memory only and disappear when you leave. | 10 | Listed: `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | Listed behavior: `demo-isolation` |
| Use Start for real to open your locally saved sketch. | 10 | F-1-2 wording; behavior covered by `demo-isolation` |
| Requirements: Node.js 20 or newer. | 5 | Pass developer instruction |
| Open `http://localhost:5173/demo` for the sample or `/` for a real sketch. | 10 | Pass |
| The exact production build command is `npm run build`. | 8 | Pass developer instruction |
| It writes the static site to `dist/`, with `dist/index.html` at the root. | 11 | Pass developer instruction |
| Run one public claim by its tag. | 7 | Pass developer instruction |
| Claim definitions and sandbox steps are in `.factory/claims.json`. | 8 | Pass |
| The demo contract is in `.factory/demo.md`. | 7 | Pass |
| Drag a keyframe left or right to change its time. | 10 | Listed: `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | Listed: `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 13 | Listed: `keyboard-keyframes` |
| Choose an easing name in the selected keyframe panel. | 9 | Covered in part by `easing-preview` |
| Import a JSON sketch or download CSS, JavaScript, and JSON files. | 11 | Listed: `json-import`, `three-exports` |
| Real sketches use one localStorage key: `motion-graph-sketchpad:sketch:v1`. | 6 | Listed storage behavior: `local-only` |
| Demo mode does not read or write that key. | 9 | Listed: `demo-isolation` |
| The service worker caches the app shell for offline reloads after the first visit. | 13 | Listed: `offline-reload` |
| There are no accounts, analytics, ads, external fonts, or runtime third-party scripts. | 10 | F-1-3: no matching claims entry |
| See the privacy page. | 4 | Pass |
| Deploy the contents of `dist/` as a static site. | 9 | Pass developer instruction |
| `staticwebapp.config.json` includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 13 | Pass developer instruction |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Pass developer instruction |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

## Demo and sandbox verification

The one-click path passes:

- Clicking **Try it with sample data** on the live home page opened `/demo` directly into the realistic four-property “Lantern drift” sketch.
- The persistent banner read **“Demo — sample data, nothing is saved”** and exposed **Reset demo** and **Start for real**.
- Editing the sample did not write `motion-graph-sketchpad:sketch:v1`; Reset restored “Lantern drift”; leaving opened “Untitled motion.”
- A network interceptor recorded no off-origin request during the whole live demo/edit/export/exit flow. A service-worker-controlled `/demo` reload remained usable after the browser context was set offline.

## Declared claims

I cloned the repository to `/tmp/mgs-review-clean`, ran `npm ci`, and ran every command in `.factory/claims.json` from that clean checkout. All passed, each with its one matching tagged test.

| Claim ID | Result |
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

The complete clean-checkout suite also passed: 6 unit tests and 16 Chromium tests. `npm run build` passed and produced `dist/` (initial JS: 10.59 kB gzip).

## Earlier review and handoff verification

There are no earlier `.factory/review-*.md` or `.factory/polish-*.md` files. I read `.factory/verification.md`, `.factory/verification-2.md`, and the prior handoff and rechecked every earlier defect on the live site and in the current code:

| Earlier finding | Recheck | Result |
| --- | --- | --- |
| Mobile controls below 44 px | Live `/demo` at 390 px: 21 tested keyframes, demo actions, inputs, and selects had a minimum 44 × 44 px rectangle; no horizontal overflow. | Fixed |
| Hashed assets not immutable | Live `HEAD /assets/index-CpjtW2r3.js`: `Cache-Control: public, max-age=31536000, immutable`; service worker is `no-cache, no-store, must-revalidate`. | Fixed |
| Raw malformed-JSON errors | Live malformed imports returned “This file is not valid JSON…” and “Property 1 needs a name…”; no parser or TypeError text appeared. | Fixed |
| Unknown paths return HTTP 200 | Live `HEAD /missing-frame` returned HTTP 404 and the designed page contains “This frame does not exist.” | Fixed |

## Structure, routing, accessibility, and visual check

- Home, Demo, Privacy, Terms, robots, sitemap, favicon, Apple touch icon, social image, and every linked destination returned 200; the external factory link returned 200. The unknown route returned 404.
- `/`, `/demo`, `/privacy`, and `/terms` use the expected titles, descriptions, canonicals, one `h1`, language, favicon, and OG metadata. Client navigation moved focus to the new `h1`, updated the live announcement, and Back returned focus to the home `h1`.
- The header/footer and Privacy/Terms links are consistent. The styled 404 has a route back. No load console errors occurred.
- The dark editing-bay illustration, cyan graph trails, amber keyframe language, and chamfered controls are product-specific and visibly follow `.factory/design.md`; this does not read as a generic SaaS hero.
- The product already has the obvious implied import/export: JSON import plus CSS, Web Animations, and JSON export. The brief does not imply a necessary AI or sync feature, and no provider key is embedded.

## What would make this perfect

Make every label literal and result-naming, then either test each remaining precise visitor claim or remove/rewrite it. After the three findings above are fixed, rerun the full cold-read, demo-isolation, offline, claim, route, and mobile checks from a clean checkout.
