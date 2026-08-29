# Handoff — independent verification 8

## Result

**PASS.** Candidate `a43f15c8ceead4b805747201a848930e40d774a6` is verified and deployed at <https://motion-graph-sketchpad.sociobot.in>. The full evidence is in [`.factory/verification-8.md`](verification-8.md).

## Verification summary

- Clean `npm ci`, `npm audit --audit-level=high`, exact `npm test`, and exact `npm run build` passed. The test suite has 12 unit and 39 Chromium tests.
- Every one of the 18 exact commands listed in `.factory/claims.json` passed through the shipped demo entry point.
- A cold live first read clearly states the job, intended creators, and one-click sample action. Desktop and 390 px mobile work; fresh demo mode is isolated and resettable.
- Live deployment and locally built `dist/` matched byte-for-byte for all 22 public files.
- Axe scans found no violations; keyboard focus, route focus, reduced motion, recovery states, offline reload, service-worker update state, privacy/network behavior, security headers, caching, and bundle budgets passed.
- Live mobile Lighthouse: Performance 98, Accessibility 100, Best Practices 100, SEO 100; LCP 1.5 s and 76 KiB transfer.

## How to run

```sh
npm ci
npm test
npm run build
```

Open `/?demo=1` for the isolated Lantern drift sample. See `.factory/demo.md` for reset, storage, and offline checks.

## Known gaps and next steps

No release-blocking gaps found. This is a static, account-free, local-first product; API rate-limit and identity-provider checks do not apply.

---

# Historical repair handoff — verification 7

## Repairs

1. **Reliable default test gate:** the four serial Axe scans formerly shared one 30-second Playwright test. They are now four independent tests, so each route has its own timeout and can run in parallel. The global timeout and four-worker configuration were not relaxed.
2. **Visible Import JSON focus:** the hidden file input now precedes its visible label. Keyboard focus on the input draws the product's 3 px cyan outline around the visible 78 × 61.625 px label.
3. **Explained zero duration:** `0` now clamps to the supported 200 ms minimum and announces: “Duration must be between 200 and 30,000 ms. It was set to 200 ms.” The old sketch duration is no longer restored silently.
4. **Offline update identity:** the visible build is `v1.0.8` and the service-worker cache is `motion-graph-sketchpad-v7`, ensuring the repaired shell replaces cache `v6`.
5. **Regression coverage:** browser tests assert every route-level Axe result, the visible label's exact focus treatment, and the corrected value, explanation, and error state for duration `0`. The new copy is recorded in `.factory/copy-audit.md`.

## Reproduction evidence

- Before installation, the exact `npm test` stopped at `vitest: not found`, as expected in the disposable checkout.
- After `npm ci`, two unchanged baseline `npm test` runs passed locally with 12 unit and 34 browser tests. The four-route Axe test took 15.6 s and 14.8 s. The verifier independently reproduced its 30.6 s and 31.0 s timeouts twice; the timing-sensitive concentration was therefore present even though this worker did not cross 30 seconds.
- After splitting the scan, individual routes took 3.2–7.9 s in repeated local and live runs. No test timeout was increased.

## Clean local verification

- `npm ci`: pass; 73 packages, zero vulnerabilities.
- `npm audit --audit-level=high`: pass; zero vulnerabilities.
- `npx tsc --noEmit`: pass.
- Lint: not applicable; this repository has no lint script or lint configuration.
- `npm run build`: pass; `dist/index.html` produced at the required root.
- Production output: JavaScript 34,579 B raw / 11.13 KB gzip; CSS 22,395 B raw / 5.75 KB gzip; WOFF2 fonts 52,972 B; largest hero candidate 31,994 B.
- Exact default `npm test`: pass three consecutive post-repair runs, each with 12/12 unit and 39/39 Chromium tests. The clean-install run completed in 37.9 s.
- Every one of the 18 exact `.factory/claims.json` commands: pass individually.
- Targeted repair command: 7/7 pass for four route scans, visible import focus, zero duration, and route metadata.
- Package/consumer verification: not applicable to this static web application; there is no published package surface.
- Local `/opt/fleet/lib/verify-url.sh /demo`: pass; one title, h1, and main; no missing alt, unnamed button, or console error.
- Local Lighthouse 12.8.2 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.4 s, LCP 1.4 s, TBT 0 ms, CLS 0, transfer 76 KiB.

## Browser, accessibility, privacy, and offline evidence

- Chromium at 1440 × 900 and 390 × 844: visual pass. Mobile body and viewport widths were both 390 px; the product-first sample and controls remained usable.
- Keyboard: import focus showed `rgb(114, 225, 231) solid 3px`; keyframe arrows, export-tab arrows/Home/End, route focus, and demo controls passed.
- Axe 4.10.2: zero violations on Home, Demo, Privacy, Terms, and the real 404 at both desktop and mobile sizes.
- Reduced motion, 44 px mobile targets, heading/landmark structure, one h1/main, labels, route announcements, and malformed-import recovery: pass.
- Privacy: the complete live suite and direct browser pass observed only `https://motion-graph-sketchpad.sociobot.in`; no account/payment controls or pre-offline console errors were present.
- Offline/update: active `/sw.js`, controlled page, cache `motion-graph-sketchpad-v7`, no waiting or installing worker after `registration.update()`, and `/demo` reloaded offline with its banner and editor.
- API response/rate-limit and Microsoft Entra identity checks are not applicable: this is a local-first static product with no backend, account, AI, or payment calls.

## Deployment and live evidence

- Deployment: `swa deploy ./dist --env production` to Azure Static Web App `sf-motion-graph-sketchpad` in resource group `sociobot`; custom domain unchanged.
- Live `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test`: pass; 12 unit and 39 Chromium tests in 33.4 s.
- Live `/opt/fleet/lib/verify-url.sh /demo`: pass in 640 ms with zero console errors.
- Artifact parity: all 22 public `dist/` files matched the custom-domain responses byte-for-byte by SHA-256; `staticwebapp.config.json` remained deployment-only.
- Routes: `/`, `/demo`, `/privacy`, and `/terms` return 200; a missing route returns the designed page with HTTP 404.
- Response policy: HTML uses `public, must-revalidate, max-age=30`; hashed assets use one-year immutable caching; `/sw.js` uses `no-cache, no-store, must-revalidate`. CSP includes header-only `frame-ancestors 'none'`; HSTS, nosniff, strict-origin referrer policy, and camera/microphone/geolocation restrictions are present.
- Live Lighthouse 12.8.2 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.2 s, LCP 1.3 s, TBT 90 ms, CLS 0, transfer 76 KiB.

## Known gaps and next steps

No release-blocking gaps remain. The original brief, visual system, product behavior, 18 claims, static deployment class, and local-first privacy model are unchanged.
