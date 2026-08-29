# Motion Graph Sketchpad — visual thesis

## Direction

**Cinematic environmental art: the night editing bay.** The sketchpad feels like a compact animation desk set beside a dark window. Cyan graph paths behave like light trails across glass. Amber keyframes resemble practical lamps and edit marks. The atmosphere gives motion work a sense of time and place without hiding the controls.

This is intentionally a single dark treatment. A bright theme would weaken the projected-light metaphor and make colour animation previews harder to judge consistently.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#090d12` | night-sky page background |
| `--deep` | `#0f171d` | editing surface |
| `--panel` | `#152128` | raised controls |
| `--line` | `#39505c` | borders and graph grid |
| `--text` | `#f4f1e8` | primary copy |
| `--muted` | `#aebdc2` | secondary copy (≥ 4.5:1) |
| `--cyan` | `#72e1e7` | graph paths and focus |
| `--amber` | `#ffc56f` | keyframes and primary actions |
| `--amber-ink` | `#241707` | text on amber |
| `--success` | `#8fe3ae` | saved/exported status |
| `--danger` | `#ff9b93` | errors and destructive controls |

## Type and rhythm

- Display: self-hosted **Bricolage Grotesque**, weight 650. Its broad shapes read like instrument labels and hold up over the environmental art.
- Utility/body: self-hosted **IBM Plex Mono**, weights 400 and 600. Numeric values align, while labels feel native to a graph workspace.
- If either font fails, the fallback is a system sans or monospace stack. Font files use `font-display: swap`.
- Spacing follows an 8 px base: 4, 8, 12, 16, 24, 32, 48, 72, and 96 px.
- Controls are chamfered rectangles, not generic rounded cards. Independent panels use a clipped upper-right corner like a film slate.

## Layout and interaction grammar

- The first screen is an asymmetrical split. Job copy sits at left; an environmental illustration and live motion specimen occupy the wider right side.
- Direct demo entry is product-first. It replaces the marketing hero with a compact editing deck that shows the sample name, all four property names, and preview controls before the full graph.
- The product surface follows immediately. On desktop, property rails and the preview share a two-column workbench. On phones, the preview comes first and each rail becomes a horizontally scrollable strip.
- Amber always means an editable moment: a keyframe, current playhead, or primary action. Cyan describes the path between moments.
- Dragging a keyframe updates the preview and its visible time. Arrow keys move a focused keyframe by 50 ms; Shift + Arrow moves it by 250 ms.
- Buttons have explicit text. Export modes use a tab list. Status is announced in a live region.

## Motion policy

- Signature motion: the preview object crosses a shallow illustrated landscape while its graph playhead sweeps in sync. It only runs after Play.
- UI transitions last 180–240 ms and use opacity or transforms.
- Nothing loops. The decorative hero curve draws once on load.
- With `prefers-reduced-motion: reduce`, the hero is static, transitions are instant, and preview playback steps to the end without travel. All editing remains available.

## Asset plan and prompt sheet

One original 3:2 hero environment will be generated, then cropped into a 1200×630 social image. The interface and icons are hand-authored HTML/CSS/SVG.

**Generation prompt:** “Wide cinematic environmental concept art of a solitary animation editing station at night, viewed across a dark glass desk toward layered distant mountain silhouettes, thin cyan light trails arching like editable motion curves, a few warm amber marker lights, atmospheric haze, subtle paper grain, deep navy and charcoal palette, high contrast practical lighting, quiet creative workspace, 35 mm anamorphic composition, generous dark negative space on the left, no people, no screens with readable content, no text, no watermark, no logos.”

**Negative list:** people, hands, brand marks, legible writing, neon cyberpunk city, purple gradient blobs, glossy SaaS illustration, busy control panels.

**Provenance:** generated for this product on 2026-08-28 with the Param Factory image deployment through `/opt/fleet/lib/gen-image.sh`. Original generated asset; no third-party or copyrighted source material. Source prompt is stored beside the image in `assets/src/hero-night-bay.json`.

## Accessibility and performance intent

- Body text starts at 16 px, controls are at least 44 px, and focus uses a 3 px cyan outline plus offset.
- Text and UI contrast target WCAG AA. Colour never carries state alone.
- The hero uses responsive WebP/AVIF files with fixed dimensions and a mobile candidate below 300 KB.
- Initial scripts remain below 200 KB gzip and CSS below 50 KB. No runtime third-party requests are allowed.
