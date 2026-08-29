# Handoff — polish 8

## Result

**PASS.** All cumulative findings through adversarial review 8 are closed. The repaired static site is live at <https://motion-graph-sketchpad.sociobot.in>.

- Repair commits: `0f8904b8e637ef9f09fcfab6cec6de36a5866498`, `6d92d45a96a6644df09b948340705e7e75c2f797`
- Deployment: `8969d11d-28a4-4a91-8307-ba59c1ed7771`
- Live build: `v1.0.9`
- Artifact class: unchanged Vite static web app; `dist/index.html` is at the deployment root.

## What changed

- Expanded the Privacy contact link to a measured 190 × 44 px phone target without changing its underlined link treatment.
- Expanded the 44 px browser regression across Home, Demo, Privacy, Terms, a routed missing page, and the static 404.
- Made `package.json` version the single release-id source. Vite injects it into the app and stamps the direct `404.html` plus offline cache, preventing version drift and stale shells.
- Added a browser regression that compares normal, routed-404, and static-404 footer versions.
- Updated the verb-first catalog description and copy audit.
- Preserved the night editing-bay visual system, direct isolated `?demo=1` sample, complete claim inventory, real routing, metadata, focus behavior, and local-first storage model.

## Exact verification

- Clean clone `/tmp/mgs-polish8-final-clean-AU0cK7` at `6d92d45`: `npm ci` passed; every one of the 18 exact claim commands in `.factory/claims.json` passed independently.
- Clean `npm test`: 13 unit and 40 Chromium tests passed. `npm run build` passed; initial JS was 34.60 kB raw / 11.14 kB gzip and CSS was 22.47 kB raw / 5.76 kB gzip.
- Live `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test`: 13 unit and 40 Chromium tests passed, including claims, privacy request interception, offline reload, route focus/history, metadata, mobile geometry, reduced motion, and Axe.
- `/opt/fleet/lib/verify-url.sh` passed Home, Demo, Privacy, and Terms with correct titles, `lang=en`, one h1/main, alt text, labelled buttons, and no application console errors.
- Independent live Axe scans found zero violations on Home, `?demo=1`, Privacy, Terms, and the direct HTTP 404.
- Cold production checks found no page overflow or sub-44 px target. The direct missing route returned 404; its footer and all app routes showed `v1.0.9`.
- All 22 served artifact files matched local `dist/` byte-for-byte. The link crawl found no dead link; the contact action is an explicit `mailto:` link.
- Mobile Lighthouse: Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.296 s, CLS 0.031, TBT 132 ms.

Final evidence is under `/tmp/mgs-polish8-evidence/final/`. The complete finding-to-change-to-evidence matrix is in `.factory/polish-8.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Open `http://localhost:4173/?demo=1` after `npm run preview`, or use the live demo at <https://motion-graph-sketchpad.sociobot.in/?demo=1>.

## Known gaps and next steps

None.
