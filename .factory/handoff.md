# Handoff — adversarial review 8

## Result

**FAIL.** No product code was changed. Review evidence is in `.factory/review-8.md`.

## What was verified

- Fresh 390 × 844 and 1366 × 768 live first reads clearly state the job, audience, and one-click sample action.
- The live demo opens with the Lantern drift sample, four editable properties, preview controls, a sticky no-save banner, Reset demo, and real-storage isolation.
- All 18 exact commands from `.factory/claims.json` passed independently from `/tmp/mgs-review8-clean-Zf2Rtw` against the live origin. `npm run build` passed and produced `dist/`.
- Live requests remained same-origin during the demo flow. Routes, direct 404, metadata, link crawl, route focus/back behavior, reduced-motion coverage, Axe scans, and visual identity were checked.

## Remaining work

1. Reopen F-2-3: the visible Privacy email link is 190 × 20 px at 390 px, below the 44 × 44 px requirement. Expand the target-size test beyond `/demo`.
2. Fix F-8-2: direct 404 displays `v1.0.7` while normal routes display `v1.0.8`.

## How to verify after repair

```sh
npm ci
npm test
npm run build
```

Open `/?demo=1` for the isolated sample. At 390 px, inspect every visible interactive target on `/`, `/demo`, `/privacy`, `/terms`, and a direct unknown URL. Confirm the direct 404 footer build id matches the normal route footer.
