# Handoff — polish 7

## Result

**PASS.** The released-candidate repair is deployed at <https://motion-graph-sketchpad.sociobot.in> as deployment `c729bd5b-2462-412b-a379-5ec1919acd4f`. Product repair commits are `b573f718b1c6ca1f7a91fe11c97ec0fe4003a6e1` and `8514909526b8888b11b77c77f27e577a31b39b40`.

The export picker now implements a complete ARIA tab pattern: one roving tab stop, `aria-controls`, an associated tabpanel, and wrapping Left/Right/Home/End keyboard selection. The untestable “Original generated imagery” footer assertion was removed from both the app and direct 404; original-image provenance remains in `.factory/design.md`. The catalog description is now verb-first and 65 characters.

## Verification

- Final clean clone `/tmp/mgs-polish7-final-clean-XfJTIu` at `8514909`: `npm ci`, every one of the 18 exact `.factory/claims.json` commands, and `npm run build` passed. Claim logs are `/tmp/mgs-polish7-final-claim-*.log`.
- Final local: `npm test` passed 12 unit and 34 Chromium tests; `npm run build` produced `dist/`; `npm audit --audit-level=high` found zero vulnerabilities.
- Final live: `PLAYWRIGHT_BASE_URL=https://motion-graph-sketchpad.sociobot.in npm test` passed 12 unit and 34 Chromium tests, including the offline, privacy, demo, export, routing, mobile, reduced-motion, and ARIA-tab regressions.
- `/opt/fleet/lib/verify-url.sh 'https://motion-graph-sketchpad.sociobot.in/?demo=1' /tmp/mgs-polish7-live-verify-F7vJcO` passed: no console errors, `lang=en`, one h1/main, no missing image alt text, and no unlabeled buttons.
- A live Playwright Axe scan reported zero violations on `/`, `/?demo=1`, `/privacy`, `/terms`, and `/polish-7-not-found` at 390 × 844.
- Live `/?demo=1` cold evidence: [demo phone](/tmp/mgs-polish7-live-cold-gvBjtI/demo-390x844.png). The direct [404 phone capture](/tmp/mgs-polish7-live-cold-gvBjtI/not-found-390x844.png) is HTTP 404 and retains the shared legal/footer shell.
- The 22 publicly served files in `dist/` matched the deployed origin byte-for-byte.
- Lighthouse on the final local production build: Performance 100, Accessibility 100, Best Practices 100, SEO 100; LCP 1,509 ms, TBT 0 ms, CLS 0.031. Evidence: `/tmp/mgs-polish7-lighthouse-final.json`.
- Final size: initial JS 34,424 bytes raw / 11,060 bytes gzip; CSS 22,313 bytes raw / 5,736 bytes gzip; WOFF2 fonts 52,972 bytes; largest hero candidate 31,994 bytes.

## How to run

```sh
npm ci
npm test
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/?demo=1` for the isolated sample. See `.factory/demo.md` for sandbox behavior and `.factory/claims.json` for every public claim command.

## Known gaps

None. This remains a local-first, static Vite product with no product API, accounts, payment flow, analytics, or third-party runtime resources.
