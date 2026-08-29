# Handoff — adversarial first-read review 6

## Result

**FAIL.** The full review is in [`.factory/review-6.md`](review-6.md). One blocking finding remains: the declared `eight-properties` claim test intermittently stopped at 7/8 during the required default clean-clone `npm test` run.

## What was done

- Reviewed the live product cold in fresh 390 × 844 and 1366 × 768 contexts.
- Audited every landing/demo sentence, heading, action, and README sentence against the plain-words and claims contracts.
- Exercised the one-click sample, preview, Reset, sticky demo banner, real-storage isolation, same-origin requests, and offline reload.
- Ran all 18 exact claim commands independently from clean clone `/tmp/mgs-review6-clean-vI7dDL`.
- Ran clean `npm test`, `npm run build`, `npm audit --audit-level=high`, the complete live browser suite, integrated Axe, Verify URL, route/link/metadata/404 checks, and asset/header/hash checks.
- Read every earlier review, polish report, and handoff, then rechecked every historical finding in live behavior and current source.

## Verification summary

- All 18 exact claim commands: passed independently.
- First clean default `npm test`: 28/29 browser tests passed; `eight-properties` failed at 7/8.
- Second clean default `npm test`: 11 unit and 29 browser tests passed.
- Focused `eight-properties` repeat: 10/10 passed.
- Live browser suite: 29/29 passed.
- Build: passed; `dist/` produced; initial JS 10.90 kB gzip.
- Dependency audit: zero vulnerabilities.
- Live Axe: zero violations on Home, Demo, Privacy, and Terms.
- Live requests: zero off-origin requests during the demo flow.
- Live and clean-build JS/CSS hashes: identical.

## Known gap and next step

Stabilize the `eight-properties` claim path by waiting for each count/rail transition after every click and fixing any remaining lost activation. Repeat the complete default suite from a clean clone before acceptance. No product code was modified in this review.
