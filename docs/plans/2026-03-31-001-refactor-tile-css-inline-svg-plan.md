---
title: "refactor: Replace SVG tile image with CSS tile + inline SVG logo mark"
type: refactor
status: active
date: 2026-03-31
---

# refactor: Replace SVG tile image with CSS tile + inline SVG logo mark

## Overview

Replace the current `<img src="/images/sh-tile.svg">` tile in `SetupFlowSection` with a CSS-rendered tile container and an inline SVG logo mark. This makes the tile resolution-independent at every size, eliminates a network request, and gives CSS full control over the tile's appearance (background, border, shadow, border-radius).

## Problem Statement / Motivation

The tile is currently a single rasterized-at-export SVG loaded via `<img>`. This means:
- The rounded-rect background, border, and shadow are baked into the SVG — they can't be themed or adjusted via CSS
- The logo mark renders at the SVG's intrinsic resolution rather than being truly crisp at every container size
- It's an extra HTTP request for what is essentially a styled box + a path

## Proposed Solution

Decompose the tile into two layers:

1. **CSS tile container** — a `<div>` that replicates the rounded rect from `sh-tile.svg`:
   - `border-radius: 32px` (scaled to match the 124×124 rect within the 156×156 viewBox)
   - Linear gradient background: `#FCFCFC` (top) → `#E4E4E4` (bottom)
   - Subtle border: `1px solid rgba(82, 82, 84, 0.05)` (from the SVG's `#525254` at 5% opacity)
   - Drop shadow: `0 8px 16px rgba(0, 0, 0, 0.08)` (matches the SVG's `feOffset dy=8`, `feGaussianBlur stdDeviation=8`, 8% opacity)
   - Centered content with padding to replicate the 16px/8px inset of the original rect

2. **Inline SVG logo mark** — the "SH" path from the provided attachment SVG (82×84 viewBox), rendered directly in JSX:
   - Extract just the `<path>` with its gradient fill (`#3F3E41` → `#29292B`) and thin `#323234` stroke
   - Keep opacity 0.6 on the path (matches original)
   - Define the `<linearGradient>` in an inline `<defs>` block
   - Drop the filter/shadow from the logo SVG (the CSS container handles the shadow)

## Technical Considerations

### What changes

**`src/components/landing/setup-flow-section.tsx`:**

- **Remove** the `<img src="/images/sh-tile.svg">` element (lines 97-103)
- **Add** a new constant `SH_LOGO_MARK_PATH` containing the `d` attribute from the attachment SVG's `<path>` element
- **Add** a CSS-styled `<div>` as the tile background with the gradient, border-radius, border, and shadow
- **Add** an inline `<svg viewBox="0 0 82 84">` inside the tile div, containing:
  - A `<defs>` block with the linear gradient (`#3F3E41` → `#29292B`)
  - The logo `<path>` with `opacity="0.6"`, gradient fill, and stroke
- The existing HDR overlay layers (SDR fallback, Chrome AVIF, Safari video) remain untouched — they sit on top of the tile and are already positioned absolutely

### What stays the same

- All HDR/glow layers (lines 104-163) — unchanged, they overlay the tile via `absolute inset-0`
- The `SH_CLIP_PATH` constant — still used for Safari HDR clip path (different path data, different purpose)
- The press animation, scroll progress, glow callback — all unchanged
- `/public/images/sh-logo-mask.svg` — still used for CSS mask on glow layers
- `/public/images/sh-tile.svg` — can be deleted after this change (no longer referenced)

### Sizing & aspect ratio

The current tile wrapper already has `aspectRatio: "1 / 1"` and `width: 100%`. The inline SVG should be centered within the tile div and sized to match the original proportions. In the original SVG, the logo path sits within the 124×124 rect that starts at (16, 8) inside the 156×156 viewBox — roughly 79.5% of the tile width. The inline SVG should be `width: ~80%` centered in the tile.

### No impact on

- Other components or pages
- globals.css animations
- landing.css tokens
- Build configuration

## Acceptance Criteria

- [ ] The `<img>` tag for `sh-tile.svg` is removed from `SuperhandsTile`
- [ ] A CSS `<div>` renders the tile background with gradient, rounded corners, border, and drop shadow
- [ ] The SH logo mark renders as an inline `<svg>` inside the tile div
- [ ] The logo path has opacity 0.6 with the dark gradient fill (#3F3E41 → #29292B) and #323234 stroke
- [ ] Visual output is pixel-identical (or near-identical) to the current tile at all viewport sizes
- [ ] HDR glow layers (SDR, Chrome AVIF, Safari video) continue to work correctly on top of the new tile
- [ ] Press-to-scale animation still works
- [ ] `/public/images/sh-tile.svg` is deleted

## MVP

### src/components/landing/setup-flow-section.tsx

Replace the `<img>` block (lines 96-103) with:

```tsx
// New constant (add near top of file, after SH_CLIP_PATH)
const SH_LOGO_MARK_D = "M49.6144 15.1622C51.1204 15.3739..."; // full d from attachment

// Inside SuperhandsTile render, replace <img> with:
<div
  className="w-full h-full flex items-center justify-center"
  style={{
    borderRadius: "20.5%",
    background: "linear-gradient(to top, #E4E4E4, #FCFCFC)",
    border: "1px solid rgba(82, 82, 84, 0.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.08)",
  }}
>
  <svg
    viewBox="0 0 82 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[55%] h-auto"
  >
    <defs>
      <linearGradient id="sh-mark-grad" x1="40.6913" y1="8.19153" x2="40.6913" y2="59.3003" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3F3E41" />
        <stop offset="1" stopColor="#29292B" />
      </linearGradient>
    </defs>
    <path
      opacity="0.6"
      d={SH_LOGO_MARK_D}
      fill="url(#sh-mark-grad)"
      stroke="#323234"
      strokeWidth="0.191658"
    />
  </svg>
</div>
```

**Notes on the CSS values:**
- `borderRadius: "20.5%"` — the original SVG has `rx=32` on a 156px square, and 32/156 ≈ 20.5%
- The gradient direction `to top` matches the SVG's `y1=132, y2=8` (bottom-to-top)
- Box shadow approximates `feGaussianBlur stdDeviation=8` (≈16px blur) with `dy=8` offset
- Logo width of ~55% may need visual tuning — the original path occupies roughly that proportion of the viewBox after accounting for the filter padding in the attachment SVG

### Delete file

- `public/images/sh-tile.svg`

## Sources

- Current tile SVG: `public/images/sh-tile.svg`
- Logo mark SVG (attachment): `.context/attachments/pasted_text_2026-03-31_09-26-14.txt`
- Tile component: `src/components/landing/setup-flow-section.tsx:64-166`
