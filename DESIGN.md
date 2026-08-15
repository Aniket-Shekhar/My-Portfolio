# Portfolio design system (v2)

Monochrome editorial portfolio — pure black canvas, white primary CTA, grayscale gradients for depth.

## Quick Start

Copy the `@theme` block into `src/globals.css` (see file for full tokens + gradient utilities).

```css
@theme {
  --color-canvas: #000000;
  --color-white: #ffffff;
  --color-ash-gray: #9a9a9a;
  --color-silver-mist: #b8b8b8;
  --color-hairline: #212121;
  --color-graphite: #4a4a4a;

  --radius-ghost-btn: 0.5rem;
  --nav-height: 4.5rem;
}
```

## Rules

- Background: `#000000` only.
- Primary CTA: filled **white** pill, black text — one filled action color per section.
- Secondary actions: ghost-outline button (1px border, 8px radius).
- Section labels: uppercase sheen gradient text (`text-sheen`).
- Hairline dividers (`--color-hairline`) between major sections.
- Nav: blurred black backdrop + bottom hairline; sections use `scroll-margin-top: var(--nav-height)`.
- No violet/amber accents — monochrome particles, video, and hover effects only.
- Body: weight **200**; headlines: weight **400**.
