# Handoff — independent verification 9

## Result

**PASS.** Candidate `931556280acf59809e08f7553af3a62467e80843` is accepted against the researched brief and factory product contract at <https://motion-graph-sketchpad.sociobot.in>.

Fresh evidence confirms that the live deployment is byte-for-byte the candidate's production output. The earlier deployment-only concern was not reproduced. No defects were found.

## What was verified

- All 18 exact commands in `.factory/claims.json` passed separately after a clean `npm ci`; every claim tag occurs exactly once.
- `npm test` passed 13 unit and 40 Chromium tests. The same 40 browser tests passed against the live deployment.
- `npm run build` passed `tsc` and Vite and produced `dist/`; `npm audit --audit-level=high` found 0 vulnerabilities. No lint task exists.
- The cold first screen states the job, audience, and first action in plain words. One click opens the isolated four-property sample.
- Independent live checks passed normal editing, preview, keyboard movement, add-keyframe interpolation, three downloads, malformed import recovery, duration limits, demo isolation, reduced motion, 200% text, 390 px layout, visible focus, and offline reload.
- Axe found zero violations on Home, Demo, Privacy, Terms, and 404 at desktop and mobile. All visible controls measured at least 44 × 44 px.
- All observed runtime requests were same-origin. Browser headers, CSP, immutable hashed-asset caching, no-store worker delivery, conditional caching, and legal routes passed.
- All 22 public files in local `dist/` matched live byte-for-byte. Unknown routes return a designed HTTP 404.
- Lighthouse mobile scored 100 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO; LCP was 1.3 s and CLS 0.031.

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
