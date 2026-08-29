# Handoff — independent verification 4

## Result

**PASS.** Candidate `f2ead240f04008309ceb2784dcda7ffd829eae2a` is verified against <https://motion-graph-sketchpad.sociobot.in>. The reported deployment-only failure did not reproduce: candidate and live production outputs match byte-for-byte for the app shell and sampled static assets. No product defect remains.

## How verified

- From the clean candidate checkout: `npm ci`, all 18 exact commands in `.factory/claims.json`, `npm test`, `npm run build`, and `npm audit --audit-level=high` all passed. The test suite reports 11 Vitest and 29 Chromium tests; production build includes `tsc` and there is no separate lint script.
- Against deployment: `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test` passed all 29 browser tests, including claims, desktop/mobile, keyboard, invalid import recovery, reduced motion, Axe, offline reload, and metadata routes.
- A cold live first-read passed. One click opened the isolated four-property Lantern drift demo. A fresh request log contained only same-origin resources; no account/payment/analytics requests or controls were present.
- Service-worker update and offline `/demo` reload passed. All visible 390px demo controls meet 44px sizing; no horizontal overflow, console error, page error, or Axe violation was found.
- Live headers include CSP, HSTS, nosniff, referrer and permissions policies; hashed assets are immutable and the service worker is no-store. Unknown paths return 404.
- Live Lighthouse scores: Performance 100, Accessibility 100, Best Practices 100, SEO 100. Initial JS is 10.90 kB gzip and CSS is 5.72 kB gzip.

## Reproduce

```sh
npm ci
npm test
npm run build
PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test
```

Open `/?demo=1` for the isolated Lantern drift sample. **Reset demo** restores it; **Open my real sketch** exits without copying demo state into real local storage.

## Full report and known gaps

See [`.factory/verification-4.md`](verification-4.md) for claim-by-claim evidence, headers, deployment identity, and severity counts. Known product gaps: none. Deployment, DNS, and billing remain factory-owned.
