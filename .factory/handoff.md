# Handoff — polish 6

## Result

**PASS — no known product gaps.** The release repair commit is `5cdc5629b42a3844f561d66c93ce5e825d28ac3a` (`fix: stabilize eight-property claim gate`). It is deployed at <https://motion-graph-sketchpad.sociobot.in> as build `v1.0.6`.

## What changed

- Fixed F-6-1 by making the `eight-properties` claim wait for the rendered count and rail total after every property addition. The test can no longer issue a later click before the preceding re-render has completed.
- Bumped the visible build label and service-worker cache to `v1.0.6` / `motion-graph-sketchpad-v5` so the repaired release is unambiguously served.
- Updated the catalog description to the verb-first sentence: “Sketch motion properties and export CSS, Web Animations, or JSON.”
- Rechecked every earlier finding, not only F-6-1. The complete mapping is in [`.factory/polish-6.md`](polish-6.md).

## Verification

- Fresh clone `/tmp/mgs-polish6-clean-YOfQDV` at `5cdc562`: `npm ci`, every one of the 18 exact `claims.json` commands, three full clean `npm test` runs, and `npm run build` all passed. The three default runs each passed 11 unit and 29 Chromium tests. Logs: `/tmp/mgs-polish6-clean-claims.log`, `/tmp/mgs-polish6-clean-default.log`, and `/tmp/mgs-polish6-clean-build.log`.
- `npm audit --audit-level=high` in the clean clone: zero vulnerabilities.
- Local build: `dist/` produced; JS is 34.09 kB raw / 10.90 kB gzip and CSS is 22.28 kB raw / 5.72 kB gzip.
- Live suite: `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test` passed 11 unit and 29 Chromium tests, including all claims, offline reload, privacy request interception, routing, focus restoration, mobile geometry, reduced motion, and AxeBuilder with zero violations on Home, Demo, Privacy, and Terms.
- `/opt/fleet/lib/verify-url.sh` passed against the live home URL with no console errors and correct title, language, landmark, h1, and alt checks. Evidence: `/tmp/mgs-polish6-live/verify-home/verify.json`.
- Lighthouse 12 mobile, live home: performance 100, accessibility 100, LCP 1,253 ms, CLS 0.031, interactive 1,296 ms. Evidence: `/tmp/mgs-polish6-live/lighthouse-home-mobile-v12.json`.
- Cold live screenshots: [home mobile](/tmp/mgs-polish6-live/home-390x844.png), [demo mobile](/tmp/mgs-polish6-live/demo-390x844.png), [home desktop](/tmp/mgs-polish6-live/home-1366x768.png), and [HTTP 404](/tmp/mgs-polish6-live/not-found-390x844.png).

## Deployment

The factory static deploy completed successfully with deployment ID `ea531dfc-eb20-40cf-97d4-d32f84be7923`. The public site serves `assets/index-DNQQ3_nQ.js`, cache `v5`, and returns HTTP 404 for `/unknown-polish-six`.

## Run and maintain

```sh
npm ci
npm test
npm run build
```

Use `/?demo=1` or `/demo` for the isolated Lantern drift sample. Real sketches remain local to the browser; demo edits are memory-only and discarded on exit.
