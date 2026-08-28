# Adversarial first-read review 2 — FAIL

**Reviewed:** 2026-08-28  
**Live site:** <https://motion-graph-sketchpad.sociobot.in>  
**Repository revision:** `4746a2e9fe89fc13c3421624894d1b3f9dbf961b`  
**Live build observed:** `v1.0.2`, `assets/index-DQABXrZC.js`

## Verdict

**FAIL.** There are three blocking findings and eight minor or medium findings. The declared claims and core editor work, but a common desktop viewport hides the first action, the demo warning does not remain visible, and the earlier 44 px mobile-target defect is not fully fixed.

## Cold first read

Each result came from a new Chromium context at scroll position 0.

| Viewport | What does this do? | For whom? | What should I click first? | Result |
| --- | --- | --- | --- | --- |
| 390 × 844 | Sketch numeric and colour-property motion before writing code. | Web and game creators who want to test animation without scripts or a full timeline editor. | **Try it with sample data**; the adjacent line says it loads a four-property sketch. | Pass |
| 1366 × 768 | Sketch property motion before coding. | Web and game creators; the audience line is visible at the bottom edge. | Cannot identify a first action. Only the equally weighted Demo, Sketchpad, and Privacy navigation links are visible. The intended **“Try it with sample data”** action begins at y=803, below the 768 px viewport. | **BLOCKING — F-2-1** |
| 1440 × 900 control check | Same clear job and audience. | Same. | **Try it with sample data** is visible, with its adjacent result. | The action passes, but the three facts begin at y=911 and are below the first screen; included in F-2-1. |

The phone first screen contains the headline, audience, sample action, adjacent result, and all three facts. The 1366 × 768 screenshot is `/tmp/mgs-review-2/live/desktop-1366x768-first-screen.png`; the phone screenshot is `/tmp/mgs-review-2/live/mobile-390x844-first-screen.png`.

## Findings

### Blocking — F-2-1: The desktop first screen hides the first action

**Location / exact copy:** live `/`, 1366 × 768, before scrolling. The headline **“Sketch property motion before coding”** occupies y=167–654. The audience sentence occupies y=678–771. **“Try it with sample data”** starts at y=803 and the facts start at y=884.

**Why this fails:** a first-time desktop visitor can identify the job and audience but cannot distinguish what to click first from three equally styled navigation links. The intended primary action is absent. This is the explicit blocking first-read condition. Even at 1440 × 900, the three required facts start below the viewport at y=911.

**Concrete fix:** add a height-aware desktop hero layout that keeps the complete audience sentence, primary action, adjacent result, and three facts within 1366 × 768 without hiding the art. Reduce the desktop headline size and vertical gaps at short viewport heights. Add a Playwright test at 1366 × 768 that asserts the action, helper, and `.plain-facts` are fully inside the viewport before any scroll.

### Blocking — F-2-2: The demo banner is not persistent

**Location / exact copy:** live `/demo`, **“Demo — sample data, nothing is saved”**, **Reset demo**, and **Open my real sketch**. `.demo-banner` uses `position: relative`. At mobile scrollY=5000 its rectangle is y=-5000 to -4924.66, completely outside the viewport.

**Why this fails:** a visitor editing or exporting farther down the 6506 px demo page no longer sees that work is temporary and cannot reach Reset or the real-sketch exit without returning to the top. The demo contract requires a persistent banner; a weak demo is blocking.

**Concrete fix:** make the banner sticky at the top with a non-overlapping layout and suitable z-index. Add a test that enters `/demo`, scrolls to the export panel and page bottom, and confirms the message, Reset, and Open-my-real-sketch actions remain visible and keyboard reachable.

### Blocking — F-2-3: The earlier 44 px mobile-target defect is not fully fixed

**Location / exact copy:** footer link **“Terms”** on live `/demo` at 390 px measures **40 × 44 CSS px**. The current geometry test selects only keyframes, demo actions, property-name inputs, and unit selects.

**Why this fails:** `.factory/verification.md` required **all interactive mobile hit targets** to be at least 44 × 44 px. The implementation and regression test fixed selected editor controls but missed the footer. Under the history rule, this unfixed remainder of the earlier release-blocking finding is blocking again. Axe reports no violation because it does not enforce this factory-specific 44 px rule.

**Concrete fix:** give every mobile header/footer link a minimum 44 px width and height or equivalent padding. Replace the selector-limited test with an audit of every visible `a`, `button`, `input`, `select`, textarea, and custom interactive target at 390 px, excluding only truly hidden controls.

### Medium — F-2-4: The real HTTP 404 drops the shared site skeleton and metadata

**Location / exact copy:** live `/missing-frame` and `public/404.html`. It correctly returns HTTP 404 and says **“This frame does not exist”**, but it has no site header, footer, Privacy link, Terms link, favicon, canonical, Open Graph metadata, or Twitter metadata.

**Why this matters:** an address-bar visitor lands on a visually related dead end that does not meet the required route skeleton or metadata contract. The in-app `notFoundPage()` has the shared header/footer, but the deployment serves the separate incomplete file for a direct unknown URL.

**Concrete fix:** build `404.html` from the same header/footer and metadata source as other routes while retaining the 404 response and return action. Add a direct-response test that checks status 404, one h1/main, wordmark, Privacy, Terms, favicon, canonical, OG/Twitter tags, and the return link.

### Medium — F-2-5: Route-specific social metadata stays on the home-page values

**Location / exact copy:** live `/demo`, `/privacy`, and `/terms`. Their document titles, descriptions, and canonicals change, but `og:title`, `og:description`, `og:url`, `twitter:title`, and `twitter:description` remain **“Motion Graph Sketchpad — Sketch property motion”**, **“Sketch numeric and colour property motion, then export code.”**, and the home URL.

**Why this matters:** sharing a legal or demo route describes and links the home page rather than the route being shared. `setMetadata()` updates only the title, description, and canonical.

**Concrete fix:** define route metadata once and update every OG/Twitter title, description, and URL field on initial load and client navigation. Add per-route assertions for all metadata fields.

### Minor — F-2-6: Reset behavior is an unlisted claim

**Location / exact quote:** README, **“Use Reset demo to restore the sample.”**

**Why this matters:** Reset works live, but no `.factory/claims.json` entry names it and no tagged claim test invokes the button. `demo-isolation` verifies leave and re-entry, not Reset.

**Concrete fix:** list **“Reset demo restores the original sample”** and add one `@claim:` test that changes sample data, presses Reset, and asserts the original name, four properties, and keyframes. Alternatively remove the README claim, though the demo contract still requires this behavior.

### Minor — F-2-7: The claim inventory does not test that demo mode avoids reading real storage

**Location / exact quote:** README, **“Demo mode does not read or write that key.”**

**Why this matters:** `demo-isolation` tests that a fresh demo does not write the real key. It does not pre-seed real data and prove the demo does not read it. The live manual test passed with a **“Real sentinel”** sketch, but the public claim remains outside the repeatable claim test.

**Concrete fix:** expand the declared demo-isolation claim and its tagged test: pre-seed a distinctive real sketch, enter demo, confirm only “Lantern drift” is shown, edit and Reset, exit, and require the original storage bytes and real sketch to be unchanged.

### Minor — F-2-8: The browser-support sentence is an unlisted and unclear claim

**Location / exact quote:** demo export panel, **“Registered custom properties need CSS.registerProperty.”**

**Why this matters:** this is a compatibility statement a developer may rely on, but it has no claims entry. It also uses the API name without saying which export uses it or what the call does.

**Concrete fix:** either remove it or rewrite it as **“The Web Animations export registers each custom CSS property before animating it.”** Add a claim entry and tagged output test if retained.

### Minor — F-2-9: Four labels do not make sense out of context

**Location / exact copy:** How-it-works headings **“Name a value”**, **“Place the moments”**, and **“Take the result”**; export eyebrow **“Transfer the experiment”**.

**Why this matters:** a heading-list user must infer that these mean property creation, keyframe timing, and export. “Transfer the experiment” is a metaphor rather than an export label.

**Concrete fix:** use **“Add a motion property”**, **“Set keyframe times”**, **“Export animation code”**, and **“Export options”**.

### Minor — F-2-10: README uses jargon where plain outcomes are available

**Location / exact copy:** **“The service worker caches the app shell for offline reloads after the first visit.”** and **“The app has no accounts and makes no off-origin requests during the demo.”**

**Why this matters:** “service worker,” “app shell,” and “off-origin” describe browser implementation rather than the result. A reader should not need those terms to understand offline and privacy behavior.

**Concrete fix:** use **“After one online visit, the browser stores the files needed to reopen the app offline.”** and **“The app has no accounts. During the demo, it connects only to this website.”** Update the matching claim wording without weakening its request-log test.

### Minor — F-2-11: The export format changes names in the README

**Location / exact copy:** the landing page and editor use **“Web Animations”**; the README control says **“Import a JSON sketch or download CSS, JavaScript, and JSON files.”**

**Why this matters:** “JavaScript” is broader than the specific Web Animations export and breaks the terminology table’s one-name rule.

**Concrete fix:** write **“Import a JSON sketch or download CSS, Web Animations, and JSON files.”**

## Copy audit

Counts exclude punctuation-only marks and treat hyphenated terms, URLs, and code identifiers as one word. No sentence exceeds 22 words and no sentence contains a banned marketing word. Repeated sentences on `/` and `/demo` are listed once.

### Landing and required demo sentences

| Sentence | Words | Result |
| --- | ---: | --- |
| Sketch property motion before coding | 5 | Pass headline |
| For web and game creators testing animation without scripts or a full timeline editor. | 14 | Pass |
| Loads a four-property motion sketch. | 5 | Listed: `demo-four-property-sample` |
| Works offline after the first visit. | 6 | Listed: `offline-reload` |
| Sketches stay in this browser. | 5 | Listed: `local-only` |
| Free. | 1 | Listed with next sentence: `free-no-account` |
| No account. | 2 | Listed: `free-no-account` |
| Test motion. | 2 | Covered by `easing-preview` |
| Export the code. | 3 | Covered by `three-exports` |
| Drag keyframes sideways. | 3 | Listed: `drag-keyframes` |
| Use arrow keys for 50 ms steps. | 7 | Listed: `keyboard-keyframes` |
| No properties yet. | 3 | Pass empty state |
| Its keyframes and motion path will appear here. | 8 | Pass empty-state instruction |
| Add up to eight number or colour properties. | 8 | Listed: `eight-properties` |
| Add keyframes, drag their times, and choose easing. | 8 | Listed behavior: drag and easing claims |
| Copy CSS, Web Animations code, or stable JSON. | 8 | Listed: exports and deterministic output |
| This tool does not rig characters, render video, or manage teams. | 11 | Clear scope limit |
| It tests plain values before you open a larger editor. | 10 | Clear purpose statement |
| No account exists. | 3 | Listed: `free-no-account` |
| Your real sketch uses local browser storage. | 7 | Listed: `local-only` |
| Demo changes disappear when you leave. | 6 | Listed: `demo-isolation` |
| Export CSS, Web Animations code, or JSON. | 7 | Listed: `three-exports` |
| Demo — sample data, nothing is saved. | 6 | Copy is clear; persistence fails F-2-2 |
| Output stays stable when the sketch stays the same. | 9 | Listed: `deterministic-export` |
| Choose from five standard timing functions. | 6 | Listed: `five-standard-easings` |
| Registered custom properties need CSS.registerProperty. | 5 | F-2-8 |

### Landing headings and action labels

| Copy | Words | Result |
| --- | ---: | --- |
| Edit motion property values | 4 | Pass |
| Add the first property | 4 | Pass |
| How it works | 3 | Pass |
| Name a value | 3 | F-2-9 |
| Place the moments | 3 | F-2-9 |
| Take the result | 3 | F-2-9 |
| What this sketchpad does not do | 6 | Pass |
| Transfer the experiment | 3 | F-2-9 |
| Export code | 2 | Pass |
| Try it with sample data | 6 | Pass action label; desktop placement fails F-2-1 |
| Reset demo | 2 | Pass action label |
| Open my real sketch | 4 | Pass action label |
| Play preview / Pause preview | 2 / 2 | Pass |
| Restart preview | 2 | Pass |
| Import JSON | 2 | Pass |
| Clear sketch | 2 | Pass |
| Add number property / Add colour property | 3 / 3 | Pass |
| Add keyframe at playhead | 5 | Pass |
| Delete keyframe | 2 | Pass |
| Copy CSS / Copy Web Animations / Copy JSON | 2 / 3 / 2 | Pass |
| Download file | 2 | Pass: verb and result are explicit beside the selected format |

### Landing interaction and error sentences

| Sentence template | Words | Result |
| --- | ---: | --- |
| The sketch could not be saved. | 6 | Pass |
| Free browser storage, then edit again. | 6 | Pass |
| This sketch already has eight properties. | 6 | Pass |
| Remove one before adding another. | 5 | Pass |
| A keyframe already exists at this time. | 8 | Pass |
| It is selected now. | 4 | Pass |
| Preview moved to the final frame. | 6 | Pass |
| Motion is reduced in your settings. | 6 | Pass |
| Each property needs one keyframe. | 5 | Pass |
| Add another before deleting this one. | 6 | Pass |
| This file is not valid JSON. | 6 | Pass |
| Export the sketch again, then choose that JSON file. | 9 | Pass |
| The file does not contain a sketch. | 7 | Pass |
| Choose a JSON export from this tool. | 7 | Pass |
| This sketch format is not supported. | 6 | Pass |
| Choose a version 1 JSON export. | 6 | Pass |
| The sketch needs a name. | 5 | Pass |
| The sketch duration must be between 200 and 30,000 milliseconds. | 10 | Pass |
| The sketch needs a list of properties. | 7 | Pass |
| This sketch has more than eight properties. | 7 | Pass |
| Remove extras and try again. | 5 | Pass |
| The file could not be read. | 6 | Pass |
| Choose a JSON sketch export. | 5 | Pass |
| Offline setup failed. | 3 | Pass |
| Reload while online to try again. | 6 | Pass |
| You are offline. | 3 | Pass |
| Editing and exports still work. | 5 | Pass |
| Back online. | 2 | Pass |
| Your sketch stayed available. | 4 | Pass |
| Remove “{property}” and all its keyframes? | 6 | Pass confirmation |
| Delete the keyframe at {time} ms? | 6 | Pass confirmation |
| Clear “{sketch}” and all its properties? | 6 | Pass confirmation |
| Property 1 is not a property. | 6 | Pass validation template |
| Property 1 needs an identifier. | 5 | Pass validation template |
| Property 1 repeats a property identifier. | 6 | Pass validation template |
| Property 1 needs a name. | 5 | Pass validation template |
| Property 1 must be a number or colour property. | 9 | Pass validation template |
| Property 1 has an unsupported unit. | 6 | Pass validation template |
| Property 1 needs at least one keyframe. | 7 | Pass validation template |
| Property 1, keyframe 1 is incomplete. | 6 | Pass validation template |
| Property 1, keyframe 1 needs an identifier. | 7 | Pass validation template |
| Property 1, keyframe 1 repeats a keyframe identifier. | 8 | Pass validation template |
| Property 1, keyframe 1 has a time outside the sketch duration. | 11 | Pass validation template |
| Property 1, keyframe 1 needs a numeric value. | 8 | Pass validation template |
| Property 1, keyframe 1 needs a six-digit colour value. | 9 | Pass validation template |
| Property 1, keyframe 1 has an unsupported easing. | 8 | Pass validation template |

The repeated second sentence for each property/keyframe validation error is the 9-word recovery instruction above. Status fragments are also plain and under the cap: “Saved in this browser” (4), “Keyframe added and saved” (4), “Preview finished” (2), “{format} copied” (2), “{filename} downloaded” (2), “Keyframe moved and saved” (4), “Demo reset” (2), “Preview returned to the first frame” (6), “Property removed” (2), “Keyframe deleted” (2), “Sketch cleared” (2), and “JSON imported and saved” (4).

### README sentences

| Sentence | Words | Result |
| --- | ---: | --- |
| Sketch numeric and colour property motion before committing to code or a full timeline editor. | 15 | Pass |
| The tool is for web and game creators. | 8 | Pass |
| Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON. | 17 | Listed feature set |
| Open https://motion-graph-sketchpad.sociobot.in/?demo=1. | 2 | Pass instruction |
| It loads the “Lantern drift” sample with four animated properties. | 10 | Listed: `demo-four-property-sample` |
| Demo edits use memory only and disappear when you leave. | 10 | Listed: `demo-isolation` |
| Use Reset demo to restore the sample. | 7 | F-2-6 |
| Use Open my real sketch to leave the demo. | 9 | Covered by `demo-isolation` |
| Requirements: Node.js 20 or newer. | 5 | Developer requirement |
| Open http://localhost:5173/?demo=1 for the sample or / for a real sketch. | 11 | Pass instruction |
| The exact production build command is npm run build. | 9 | Developer instruction; command passed |
| It writes the static site to dist/, with dist/index.html at the root. | 12 | Developer instruction; build verified |
| Run one public claim by its tag. | 7 | Pass instruction |
| Claim definitions and sandbox steps are in .factory/claims.json. | 8 | Pass |
| The demo contract is in .factory/demo.md. | 6 | Pass |
| Drag a keyframe left or right to change its time. | 10 | Listed: `drag-keyframes` |
| Focus a keyframe and press Left or Right Arrow for a 50 ms step. | 14 | Listed: `keyboard-keyframes` |
| Hold Shift while pressing an arrow key for a 250 ms step. | 12 | Listed: `keyboard-keyframes` |
| Choose an easing name in the selected keyframe panel. | 9 | Listed: `five-standard-easings` |
| Import a JSON sketch or download CSS, JavaScript, and JSON files. | 11 | F-2-11 |
| Real sketches use one localStorage key: motion-graph-sketchpad:sketch:v1. | 7 | Covered by `local-only` test |
| Demo mode does not read or write that key. | 9 | F-2-7 |
| The service worker caches the app shell for offline reloads after the first visit. | 14 | F-2-10; outcome is listed as `offline-reload` |
| The app has no accounts and makes no off-origin requests during the demo. | 13 | F-2-10; listed as `no-account-demo-network` |
| See the privacy page. | 4 | Pass instruction |
| Deploy the contents of dist/ as a static site. | 9 | Developer instruction |
| staticwebapp.config.json includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. | 14 | Developer instruction; inspected and built |
| Infrastructure, DNS, and billing stay outside this repository. | 8 | Scope instruction |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass instruction |

### Terminology check

| Concept | Primary term | Result |
| --- | --- | --- |
| Saved experiment | sketch | Consistent |
| Animated named value | property | Consistent |
| Value at a time | keyframe | Consistent |
| Timeline position | playhead | Consistent |
| Playback surface | preview | Consistent |
| Temporary sample workspace | demo | Consistent |
| Browser animation export | Web Animations | F-2-11: README also says JavaScript |

## Demo and sandbox verification

- One click from `/` opened `/?demo=1` with “Lantern drift,” Drift X, Lift, Scale, and Glow colour already populated.
- Reset restored “Lantern drift” after the name was changed.
- Before entering demo, the real localStorage key was seeded with a distinctive “Real sentinel” sketch. Entering, editing, and resetting the demo left its serialized bytes unchanged. **Open my real sketch** returned to that sentinel data.
- The full live load/edit/reset/exit request log contained no off-origin URL and no console error.
- After service-worker control, an offline reload retained the demo banner and editor.
- The banner’s contents and controls work at the top of the page, but its failure to persist while scrolling is F-2-2.

## Declared claims

Every command in `.factory/claims.json` was run independently from clean clone `/tmp/mgs-review2-clean-hTcvTe`. Every claim tag occurs exactly once in test source.

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
| `demo-four-property-sample` | PASS |
| `five-standard-easings` | PASS |
| `no-account-demo-network` | PASS |

The complete clean-clone suite passed: 6 Vitest tests and 19 Chromium tests. `npm run build` passed and produced `dist/`; initial JS is 32.31 kB raw / 10.56 kB gzip. The unlisted or incompletely listed public claims are F-2-6 through F-2-8.

## Earlier finding verification

| Earlier finding | Live and code recheck | Result |
| --- | --- | --- |
| F-1-1 — unexplained headings and jargon | Live and `src/main.ts` show “Edit motion property values,” “What this sketchpad does not do,” “Tool limits,” and “Test motion. Export the code.” | Fixed |
| F-1-2 — vague action names | Live and source show Add number property, Add colour property, Restart preview, and Open my real sketch. | Fixed |
| F-1-3 — unlisted sample/easing/network claims and vague footer claim | All three added claim tags occur once and passed; the footer now names CSS, Web Animations, and JSON. | Fixed |
| `verification.md` High — all mobile targets must be at least 44 × 44 px | The 21 sampled editor controls pass, but the visible Terms link is 40 × 44 px and the automated selector omits it. | **Regressed/incomplete — BLOCKING F-2-3** |
| `verification.md` Medium — immutable asset caching | Live hashed JS is `public, max-age=31536000, immutable`; `sw.js` is no-cache/no-store. | Fixed |
| `verification.md` Low — raw malformed-JSON errors | Live invalid files produced the plain JSON and property-name recovery messages; source and tests match. | Fixed |
| `verification.md` Low — unknown paths returned 200 | `/missing-frame` returns HTTP 404 and shows the designed message. | Fixed; new skeleton issue is F-2-4 |

`.factory/polish-1.md` and the prior handoff repeat the F-1 and verification resolutions above; each was checked independently rather than accepted from the document.

## Structure, routing, accessibility, and visual identity

- `/`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, favicon, Apple touch icon, manifest, and the external factory link return 200. `/missing-frame` returns 404. All crawled anchors resolve; mail and in-page anchors are valid exceptions.
- Home, Demo, Privacy, and Terms each have `lang=en`, one h1, one main, the expected title pattern, a description, canonical, favicon, and shared header/footer.
- Client navigation focuses and announces the new h1. Back restores the home route and focuses/announces its h1.
- The social image is a real 1200 × 630 product asset. Route-specific OG/Twitter values fail F-2-5. The direct 404 metadata/skeleton fails F-2-4.
- A live Playwright Axe scan reported zero violations. `verify-url.sh` passed after its output directory was created: correct title/lang, one h1/main, no missing alt text, no unlabeled buttons, and no console errors. The separate target audit found F-2-3.
- No horizontal overflow appeared at 390 px. Reduced-motion CSS is present. The generated night editing bay, cyan motion paths, amber keyframes, mono utility type, and chamfered controls match `.factory/design.md` and are recognizably product-specific rather than a generic SaaS template.

## Missed leverage

No additional AI feature is justified. The core job is direct manipulation of deterministic motion values, and optional AI would add cost and privacy complexity without removing a necessary step. The implied high-value interoperability already exists: JSON import plus CSS, Web Animations, and JSON export. No provider key, analytics script, remote font, or runtime third-party request was found.

## What would make this perfect

Resolve every finding above: fit the complete first-screen contract at 1366 × 768, keep the demo warning/actions visible throughout editing, audit every mobile target, use the shared skeleton and complete metadata on the 404, update social metadata per route, list and test every remaining public claim, and replace the flagged headings, jargon, and inconsistent export term. Then rerun this entire cold-read, sandbox, claim, history, routing, copy, and accessibility checklist from a clean clone. A PASS requires that rerun to produce zero findings.
