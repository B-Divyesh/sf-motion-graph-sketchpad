# Handoff — adversarial first-read review 5

## Result

**FAIL** for candidate `cea8e1ab621e461c348f270af9f1821ca99b08a6` at <https://motion-graph-sketchpad.sociobot.in>.

No blocking runtime behavior failed. The cold mobile/desktop read, product-first demo, isolation/reset, offline reload, routes, accessibility, build, and every declared claim command passed. Five non-blocking findings remain in `.factory/review-5.md`:

- F-5-1: privacy data removal has no declared claim test.
- F-5-2: adding a keyframe is an unlisted claim.
- F-5-3: the export test does not cover every public Copy/Download outcome.
- F-5-4: the 404 uses metaphorical copy instead of “Page not found.”
- F-5-5: the Terms h1 does not name the page.

## Verification performed

- Fresh clone `/tmp/mgs-review5-clean`: `npm ci` passed with zero vulnerabilities.
- All 16 commands in `.factory/claims.json` passed independently.
- `npm test` passed 10 unit tests and 27 Chromium tests.
- `npm run build` passed; initial JS is 10.91 kB gzip and `dist/` exists.
- The 27-test browser suite passed against the live deployment.
- Live Axe scans reported zero violations on `/`, `/demo`, `/privacy`, and `/terms`.
- Live demo request logging found no off-origin request.
- A seeded real sketch remained byte-identical through demo edit/reset/exit.
- Live and local JS/CSS hashes match.
- Live routes and linked destinations were crawled; normal routes returned 200 and the designed unknown route returned 404.

Evidence is recorded in `.factory/review-5.md`; screenshots and the live audit JSON are under `/tmp/mgs-review-5/`.

## Reproduce

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npx playwright test
```

## Product changes

None. This work order was review-only. Only `.factory/review-5.md` and this handoff were changed.

## Next step

Resolve F-5-1 through F-5-5, deploy, then rerun the entire review rather than only the changed checks.
