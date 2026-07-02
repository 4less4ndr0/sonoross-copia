# Fix mobile bubble layout

## Problem
On the mobile viewport the 5 iMessage bubbles have two issues:

1. **Top bubbles overlap**: two bubbles are clustered at the top-left (6% + 8% vertical, 5% + 22% horizontal) and visually stack on top of each other.
2. **Bottom bubbles overlap the eyes/horizon**: the two lower bubbles sit at 70–72% from the top, landing directly on the colored horizon and the LED eyes instead of staying in the white space above it.

## Solution
Make the bubble positions responsive so the mobile layout differs from desktop.

### Changes in `src/routes/index.tsx`

- Refactor the `Bubble` type and `BubbleShape` component so each bubble can carry **mobile** and **desktop** position classes (or a combined responsive class string).
- Keep the existing iMessage shape, color, and floating animation unchanged.

#### Mobile layout (below `sm` breakpoint)
- **3 top bubbles**: spread horizontally across the full width and staggered vertically so none overlap.
  - left bubble: ~4% from top, ~5% from left
  - center-left bubble: ~12% from top, ~55% from left
  - right bubble: ~18% from top, ~72% from left
- **2 bottom bubbles**: move them into the white band above the horizon, around 48–54% from top, so they sit clearly below the email form but above the colored gradient/eyes.
  - left: ~50% from top, ~8% from left
  - right: ~48% from top, ~70% from left

#### Desktop layout (`sm` and up)
- Keep the current distribution: 3 bubbles above the headline and 2 bubbles near the eyes/horizon, since that works on wider screens.

### Implementation approach
- Replace the inline `top`/`left` style in `BubbleShape` with Tailwind responsive utility classes (`top-[...]`, `left-[...]`, `sm:top-[...]`, `sm:left-[...]`).
- Update the `BUBBLES` array to store the combined responsive class string for each bubble instead of a single `top`/`left` value.
- Optionally slightly reduce the width of the two mobile bottom bubbles so they fit comfortably in the white band, but only if the visual balance requires it.

## Verification
- Capture a mobile viewport screenshot (390×844) to confirm:
  - top bubbles are separated and not overlapping
  - bottom bubbles sit in the white space above the horizon and do not cover the eyes
- Capture a desktop viewport screenshot (1280×900) to confirm the desktop layout remains clean.
- Run a production build to confirm no type/style errors.