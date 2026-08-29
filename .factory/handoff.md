# Handoff — adversarial review 9

## Result

**PASS.** The live product at <https://motion-graph-sketchpad.sociobot.in> passes the adversarial first-read review. No product code was changed in this work order. The complete evidence and copy audit are in `.factory/review-9.md`.

## What was verified

- A fresh no-hardlink clone completed `npm ci`; all 18 exact commands in `.factory/claims.json` passed separately and every claim tag occurs exactly once.
- `npm test` passed 13 unit and 40 Chromium tests. The same 40 browser tests passed against the live deployment.
- `npm run build` passed `tsc` and Vite and produced `dist/`.
- The cold first screen states the job, audience, and first action in plain words. One click opens the isolated four-property sample.
- Fresh cold mobile and desktop reads identified the job, audience, and primary action without scrolling. The one-click demo enters the isolated Lantern drift sample with persistent reset/exit controls.
- Live checks passed editing, preview, keyboard movement, add-keyframe interpolation, three downloads, malformed import recovery, duration limits, demo isolation, reduced motion, 390 px layout, focus, offline reload, route handling, and link crawl.
- Axe found zero violations in the full browser suite. All observed runtime requests were same-origin, and unknown routes return a designed HTTP 404.

The full evidence and defect disposition are in `.factory/verification-9.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm run test:e2e
```

Open `http://127.0.0.1:4173/?demo=1` after `npm run preview`, or use <https://motion-graph-sketchpad.sociobot.in/?demo=1>.

## Known gaps and next steps

None. The product is a static PWA with no server API, sign-in, library package, or CLI, so those conditional checks are not applicable.
