# Dala-style design system — Portfolio

Binding design spec for the personal portfolio site.

## Quick Start

Copy the `@theme` block below verbatim into `src/globals.css` (after the Google Fonts import and `@import "tailwindcss";`).

```css
@theme {
  /* Colors */
  --color-canvas: #000000;
  --color-white: #ffffff;
  --color-ash-gray: #9a9a9a;
  --color-silver-mist: #b8b8b8;
  --color-electric-iris: #8052ff;
  --color-saffron-spark: #f0b429;
  --color-deep-verdant: #1a9e8f;
  --color-magenta-flare: #d946ef;
  --color-cerulean-pulse: #38bdf8;

  /* Typography — font family */
  --font-sans: "Inter", system-ui, sans-serif;

  /* Type scale (px) — use with font-weight rules in components */
  --text-display: 7.0625rem; /* 113px */
  --text-display-md: 4.875rem; /* 78px */
  --text-heading-lg: 2.25rem; /* 36px */
  --text-heading-xs: 1.6875rem; /* 27px */
  --text-body: 1.125rem; /* 18px */
  --text-nav: 0.875rem; /* 14px */
  --text-caption: 0.75rem; /* 12px */

  /* Letter-spacing */
  --tracking-display: -0.04em;
  --tracking-nav: 0.025em;

  /* Layout */
  --width-content: 80rem; /* 1280px */

  /* Radii */
  --radius-ui: 1.5rem; /* 24px — buttons, nav, image blocks */
  --radius-pill: 9999px; /* tags only */

  /* Spacing (section rhythm) */
  --spacing-section-y: 7.5rem;
  --spacing-section-y-mobile: 5rem;
}
```

## Rules

- Background: `#000000` only (`--color-canvas`).
- One filled CTA color: `--color-electric-iris`.
- Amber highlights: `--color-saffron-spark` (labels only).
- Logo gradient: `--color-electric-iris` → `--color-deep-verdant`.
- No card borders, box-shadows, or panel backgrounds — whitespace separates content.
- Body copy: weight **200**, `--text-body`, line-height 1.5.
- Headlines: weight **400** only; hierarchy via size + tracking.
- Nav / section labels: weight **600**, `--text-nav`, uppercase, `--tracking-nav`.
