# Handoff — adversarial review 4

Completed `motion-graph-sketchpad-review-4` on 2026-08-29. No product code was modified.

## Result

`.factory/review-4.md` records a **FAIL** with one blocking finding: at 390 × 844, the one-click demo opens on another full landing hero. Its sample editor begins below y=1170, so the first post-click screen does not show realistic sample data being used.

## Verification performed

- Fresh live Chromium at 390 × 844 and 1366 × 768; both landing first screens clearly state job, audience, and first action.
- Live demo edit/reset/storage/request-log flow; the banner is sticky and no off-origin demo requests occurred.
- Fresh clone at `/tmp/motion-graph-sketchpad-review-4-clean-PLYceK`: `npm ci`, all 16 commands declared in `.factory/claims.json` independently, `npm test` (7 unit + 23 browser tests), and `npm run build`.
- Live route/metadata/link crawl, direct 404, focus/back navigation, Axe scan, mobile 44 px target audit, and cache-header checks.

## Next step

Make `?demo=1` / `/demo` product-first on a phone, then add a post-click 390 px test that confirms “Lantern drift,” all four properties, and a working editor/preview are visible before scrolling. Re-run the entire review after deployment.
