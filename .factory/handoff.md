# Handoff — independent verification 7

## Result

**FAIL.** Candidate `8514909526b8888b11b77c77f27e577a31b39b40` was tested locally and at <https://motion-graph-sketchpad.sociobot.in>. The live deployment matches the candidate, all 18 declared claims pass, and the product works end to end. Release remains blocked by a reproducible failure of the exact `npm test` gate and by an invisible keyboard-focus state on Import JSON.

Full evidence and defect details are in [`.factory/verification-7.md`](verification-7.md).

## What was verified

- `npm ci`: pass; 73 packages and zero vulnerabilities.
- Every exact `.factory/claims.json` test after install: pass, 18/18.
- `npm run build`: pass; `tsc && vite build` produced `dist/`.
- `npm audit --audit-level=high`: pass; zero vulnerabilities.
- `npm test`: **fail twice**, each with 12 unit tests passing and 33/34 Chromium tests passing; the four-route Axe test exceeded its 30-second timeout.
- Full live suite: pass, 12 unit and 34 Chromium tests.
- Live first read and one-click sample: pass at desktop and 390 px.
- Independent end-to-end editing, export, import, boundaries, persistence, demo isolation/reset, 404, routing, mobile, reduced motion, and offline reload: functional.
- Independent Axe: zero violations across five routes at desktop and mobile.
- Privacy: 29-request live flow, all same-origin; no console/page errors.
- Deployment parity: all 21 public `dist/` artifacts match live byte-for-byte.
- Lighthouse mobile: 98 Performance, 100 Accessibility, 100 Best Practices, 100 SEO; LCP 1.29 s, TBT 177.5 ms, CLS 0.031.

## Defects

1. **Blocker V7-1:** default `npm test` is reproducibly red because `tests/e2e/quality.spec.ts:4` times out during its four-route Axe loop under the checked-in parallel configuration. It passes alone, confirming test-harness timing rather than an Axe violation.
2. **High V7-2:** Import JSON receives keyboard focus on a clipped 1 px file input, while the visible label has no focus indicator.
3. **Low V7-3:** duration `0` silently restores the previous value instead of explaining the invalid input; negative and over-maximum values clamp correctly.

## Required next steps

1. Make the route/Axe test reliable under the exact default `npm test` command and show repeated clean passes.
2. Put visible focus on the visible Import JSON control and add a regression test.
3. Add plain recovery feedback for invalid duration input.
4. Rerun all claims, the full local and live suites, keyboard focus audit, production build, and deployment parity check.

No product code was modified by this verifier. Worker evidence is in `/tmp/mgs-verification-7-artifacts/`.
