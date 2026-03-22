# Play Store Screenshots Generator

## Overview & Core Philosophy

This skill generates **advertising-focused Google Play Store screenshots** using Next.js and `html-to-image`. The fundamental principle: **screenshots are advertisements, not documentation.** Each slide communicates a single outcome, feeling, or solution — not a UI tour.

Unlike the Apple App Store, Play Store also requires a **Feature Graphic** (1024×500px) — a landscape banner displayed prominently on your app's store listing page. This skill treats it as a first-class asset alongside phone screenshots.

---

## Discovery Phase: Required Questions

Before writing any code, gather these from the user:

**Essential:**
- App screenshot file paths (PNG captures from Android device or emulator)
- App icon path (PNG, ideally 512×512)
- Brand color palette (primary, background, text, accent)
- Typography preference (Google Fonts name, or "use system default")
- Top 3–6 features to highlight
- Desired slide count (2–8; Play Store minimum is 2, maximum is 8)
- Visual style direction (clean/minimal, bold/dark, colorful, editorial)

**Optional:**
- 7" or 10" tablet screenshots (for a tablet-specific listing)
- Landscape phone screenshots preference
- Multi-language localization requirements
- Feature graphic background style preference (gradient, solid, screenshot-backed)

Do not begin scaffolding until you have the essential inputs. If the user provides a vague style direction, offer three concrete examples and let them pick.

---

## Project Architecture

This skill generates **two files** in a new folder. No framework, no `npm install`, no build step.

```
play-store-screenshots/
├── index.html      ← rendering engine, export logic, overview mode (don't edit)
├── config.js       ← ALL customization: copy, colors, slides (edit this)
└── screenshots/    ← user's raw Android app screenshots + app icon
    ├── app-icon.png
    ├── screen1.png
    └── screen2.png
```

**The AI fills in `config.js`. `index.html` reads from it and renders everything.**

To use: serve the folder with a one-line local server (required for loading local images), open in Chrome, click Export All.

```bash
# Pick any one of these — whatever is available:
python3 -m http.server 8080
npx serve .
```

Then open `http://localhost:8080`.

> **Note on exported files:** Clicking "Export All" triggers browser downloads — files land in your system's **Downloads folder**. Rename and organize from there before uploading to Play Console.

### Should you commit this project to git?

No. The screenshot generator is a **disposable tool** — once you have the PNGs, the project has done its job. The only files worth keeping long-term are:
- The exported PNGs (upload to Play Console)
- `config.js` if you want to regenerate or tweak later

Work in any temporary folder. Do not add it to your app's repository.

---

## config.js Reference

`config.js` is the only file the AI needs to write. It's plain JavaScript — no TypeScript, no imports, no build step.

A complete working example for a fictional app is available at [`example-config.js`](./example-config.js) in this skill directory — copy it as a starting point.

```javascript
const config = {
  app: {
    name: "Your App",
    icon: "screenshots/app-icon.png",
  },

  brand: {
    primary: "#6366F1",       // dominant brand color
    secondary: "#4F46E5",     // gradient partner / secondary brand color
    background: "#FFFFFF",    // canvas background
    surface: "#F4F4F8",       // card / panel backgrounds
    text: "#111111",          // headline color
    textMuted: "#666666",     // caption / label color
    accent: "#F59E0B",        // highlight, call-to-action color
  },

  // "clean-light" | "dark-bold" | "vibrant" | "editorial"
  theme: "clean-light",

  device: {
    color: "black",           // "black" | "white" | "silver"
  },

  slides: [
    {
      id: "hero",
      layout: "text-top",
      screenshot: "screenshots/screen1.png",
      label: "INTRODUCING",
      headline: "Your app name.\nYour outcome.",
      // Leave subtext empty on hero — let the visual breathe
    },
    {
      id: "feature-one",
      layout: "text-bottom",
      screenshot: "screenshots/screen2.png",
      label: "FEATURE NAME",
      headline: "Short benefit\nstatement here.",
      subtext: "One supporting sentence, maximum.",
    },
    // Add 2–8 slides total
  ],

  featureGraphic: {
    headline: "The app headline goes here",
    subtext: "Available on Google Play",
    // "gradient" | "solid" | "screenshot-backed"
    style: "gradient",
    // Only used when style is "screenshot-backed"
    screenshot: "screenshots/screen1.png",
  },

  // Optional: set enabled: true and add tablet screenshots to activate
  tablet: {
    enabled: false,
    sizes: ["10-inch"],       // "7-inch" | "10-inch" | both
  },

  // Add locale codes to generate localized sets: "de", "fr", "ar", "he", etc.
  locales: ["en"],
};
```

### Multi-locale copy

When `locales` contains more than one entry, change string values to locale maps:

```javascript
slides: [
  {
    id: "hero",
    layout: "text-top",
    screenshot: { en: "screenshots/en/screen1.png", de: "screenshots/de/screen1.png" },
    label: { en: "INTRODUCING", de: "NEU" },
    headline: { en: "Your app.\nYour way.", de: "Deine App.\nDein Weg." },
  },
]
```

---

## Slide Layout Templates

### The golden rule: vertical stacking, large phone

A 1080×1920 canvas is tall and narrow. **Side-by-side horizontal layouts waste this space** — they shrink the phone to fit next to text, leaving large empty areas that look sparse and unprofessional.

Always stack vertically. The phone should be **large and dominant**, occupying 60–70% of the canvas height. Text sits above or below it.

**Default phone size for all layouts:** width = `PHONE_W * 0.82` (≈882px), maintaining the device aspect ratio (~1:2.15). This fills the canvas properly with room for a subtle drop shadow.

Five named layouts. **Vary the layout across slides — never use the same layout twice in a row.**

---

### `text-top` *(primary layout — use for most feature slides)*

Text block in the top ~32% of the canvas. Phone large and centered below, slightly cropped at the bottom edge (creates depth and focuses attention on the top of the UI).

```
┌─────────────────────┐
│      LABEL          │
│   Headline text     │  ← top 32% of canvas
│   here              │
│   Subtext line.     │
│   ┌───────────────┐ │
│   │               │ │
│   │  [screenshot] │ │  ← phone: 82% canvas width, bottom-anchored
│   │               │ │    slightly cropped at bottom
│   │               │ │
└───┴───────────────┴─┘
```

Sizing: phone `width = PHONE_W * 0.82`, centered horizontally, top edge starts at ~30% of canvas height.

---

### `text-bottom` *(use for 1–2 slides per set)*

Phone large and centered in the top ~65% of the canvas, slightly cropped at the top (status bar hidden). Text block in the bottom 35%.

```
┌───┬───────────────┬─┐
│   │               │ │
│   │  [screenshot] │ │  ← phone: 82% canvas width, top-anchored
│   │               │ │    slightly cropped at top
│   │               │ │
│   └───────────────┘ │
│      LABEL          │
│   Headline text     │  ← bottom 35% of canvas
│   Subtext line.     │
└─────────────────────┘
```

Sizing: phone `width = PHONE_W * 0.82`, top edge at -3% of canvas (crops status bar), centered horizontally.

---

### `split-screen` *(use for 1 slide per set — strong contrast)*

Canvas divided horizontally at ~38%. Top panel: solid `brand.primary` background with label and headline in white. Bottom panel: canvas background color. Phone centered, overlapping the divider by ~8% of canvas height — creates visual tension and depth.

```
┌─────────────────────┐
│ ■■■■■■■■■■■■■■■■■■■ │  ← brand.primary panel (top 38%)
│ LABEL               │
│ Headline here       │
├──────────┬──────────┤
│    ┌─────┴────┐     │
│    │          │     │  ← phone overlaps divider, centered
│    │[screenshot]    │     width = PHONE_W * 0.72
│    │          │     │
│    └──────────┘     │
└─────────────────────┘
```

---

### `full-bleed` *(use maximum 1 per set)*

App screenshot fills the entire canvas edge-to-edge with no phone frame. Short text overlay (label + 1-line headline only) at the top or bottom with a semi-transparent gradient scrim. Only use when the screenshot itself is visually rich enough to stand alone.

```
┌─────────────────────┐
│ LABEL               │  ← scrim overlay, top 20%
│ Headline            │
│                     │
│  [full screenshot   │
│   fills canvas      │
│   edge to edge]     │
│                     │
└─────────────────────┘
```

---

### `feature-graphic` *(feature graphic only — not a phone slide)*

Landscape canvas (1024×500px). No device mockup. Two composition options:

- **Icon-left:** App icon (180×180) on left third, headline + subtext on right two thirds
- **Icon-center:** App icon centered at top, headline below, subtext below that

Background fills the full canvas using the chosen `featureGraphic.style`.

---

### What happened to `hero-left` / `hero-right`?

Side-by-side horizontal layouts (text left, phone right or vice versa) consistently produce poor results on portrait canvases — the phone is forced small to fit beside text, and large empty areas appear above and below. **Do not implement these layouts.** Use `text-top` or `text-bottom` instead, which achieve layout variety while keeping the phone large.

---

## Android Device Mockup (CSS-Only)

The Android phone frame is implemented in **pure CSS — no PNG asset required.** This avoids the fragile PNG-offset coupling where exact pixel values must match a specific image file.

**Component: `<AndroidPhoneMockup>`**

Props: `screenshot` (string path), `color` ("black" | "white" | "silver"), `width` (number px), `height` (number px)

Rendered structure and key proportions (all values derived from component `width` / `height`):

```
┌──────────────────────┐  outer frame
│  ●                   │  punch-hole camera: width*0.028 diameter, centered, top height*0.018
│ ┌──────────────────┐ │  screen: left/right inset width*0.03, top/bottom inset height*0.025
│ │                  │ │
│ │   [screenshot]   │ │
│ │                  │ │
│ └──────────────────┘ │
│       ───────        │  home indicator: width*0.30 wide, height*0.003 tall, bottom height*0.015
└──────────────────────┘
```

| Property | Value |
|---|---|
| Outer corner radius | `width * 0.12` |
| Frame border thickness | `width * 0.008` |
| Screen left/right inset | `width * 0.030` |
| Screen top inset | `height * 0.025` |
| Screen bottom inset | `height * 0.028` |
| Camera diameter | `width * 0.028` |
| Camera center from top | `height * 0.018` |
| Home indicator width | `width * 0.30` |
| Home indicator height | `height * 0.003` |
| Home indicator from bottom | `height * 0.015` |

Frame colors by `color` prop:
- `"black"` → frame `#1C1C1E`, border `#3A3A3C`, screen background `#000000`
- `"white"` → frame `#F2F2F7`, border `#D1D1D6`, screen background `#FFFFFF`
- `"silver"` → frame `#8E8E93`, border `#636366`, screen background `#111111`

> **Critical:** Never use brand colors for the phone frame or border. The frame must always use one of the neutral color sets above. Using a brand color (e.g. the app's accent orange or purple) on the frame border looks amateurish and draws attention away from the screen content. The frame should recede visually, not compete with the UI.

The frame should also have a soft drop shadow to lift it off the background:
```css
box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18), 0 8px 24px rgba(0, 0, 0, 0.10);
```
Adjust opacity based on theme: lighter shadow for light backgrounds, stronger for dark.

Side buttons (optional detail, improves realism):
- Power button: right side, top 38% from top, height 8% of total height, width 0.6% of width
- Volume up/down: left side, stacked at 32% and 42% from top, same dimensions

---

## Export Specifications

### Phone Portrait (primary — always required)

**1080 × 1920px**

Design and export everything at this resolution. Play Store accepts any size with an aspect ratio between 1:2 and 2:1 — 1080×1920 covers all phones.

### Phone Landscape (optional)

**1920 × 1080px**

Useful for games and apps with landscape-first UIs. Offer this when the user's app is primarily used in landscape orientation.

### Tablet (optional)

| Screen | Dimensions |
|---|---|
| 7-inch | 1200 × 1920px |
| 10-inch | 1600 × 2560px |

### Feature Graphic (required by Play Store)

**1024 × 500px**

This is a landscape banner shown at the top of your Play Store listing. It is **not** a phone screenshot — it has no device frame. Required for all apps.

### Constants

```typescript
// Phone portrait (primary)
const PHONE_W = 1080;
const PHONE_H = 1920;

// Phone landscape (optional)
const PHONE_LAND_W = 1920;
const PHONE_LAND_H = 1080;

// Tablet 7-inch (optional)
const TAB7_W = 1200;
const TAB7_H = 1920;

// Tablet 10-inch (optional)
const TAB10_W = 1600;
const TAB10_H = 2560;

// Feature graphic (required)
const FG_W = 1024;
const FG_H = 500;
```

---

## Copy Strategy & Messaging Rules

These rules apply to every headline on every slide:

**One idea per slide.** No compound claims joined by "and" — they dilute impact and confuse the message. If you find yourself writing "and", you have two slides, not one.

**3–5 words per line.** Must be readable at thumbnail size. Break lines intentionally, not by wrapping. The line break is part of the design.

**Short, common words.** 1–2 syllables preferred. Test: would a 12-year-old understand this instantly?

**One-second test.** Hold the phone at arm's length. If meaning is unclear, rewrite. The viewer is scrolling — you have one second.

**Outcomes over features.** Describe what the user achieves, not what the app does.

| Bad | Better |
|---|---|
| "Advanced task management system" | "Done by noon.\nEvery day." |
| "Sync across all your devices" | "Your phone.\nYour tablet.\nOne list." |
| "Powerful analytics dashboard" | "See what's\nactually working." |
| "Seamless user experience" | "It just works.\nEvery time." |
| "Real-time push notifications" | "Never miss\nwhat matters." |
| "Customizable home screen widgets" | "Your info.\nRight there." |

**Feature graphic headline** follows the same rules but can be slightly longer (up to 8 words) since it has more horizontal space. Still: outcome-first, short words.

---

## Technical Implementation

### Setup

Create a new folder and two files inside it:

```bash
mkdir play-store-screenshots
cd play-store-screenshots
mkdir screenshots
# Copy the user's app screenshots and icon into ./screenshots/
```

Then create `config.js` (AI fills this in) and `index.html` (AI generates this). That's the entire setup — no package manager, no install step.

### index.html structure

The `<head>` loads everything via CDN — no local dependencies:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Google Fonts — match user's preference, default to Inter -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <!-- html-to-image for PNG export -->
  <script src="https://unpkg.com/html-to-image@1.11.11/dist/html-to-image.js"></script>
  <!-- User's config — must come before the main script -->
  <script src="config.js"></script>
</head>
<body>
  <!-- Controls bar: locale selector, theme/device switchers, export buttons -->
  <div id="controls">...</div>

  <!-- Visible preview: slides scaled to fit viewport -->
  <div id="preview">...</div>

  <!-- Overview panel: all slides in a grid at 20% scale, toggled via button -->
  <div id="overview" style="display:none">...</div>

  <!-- Off-screen export canvases: always full resolution, never scaled -->
  <div id="export-canvases" style="position:fixed;left:-9999px;top:0;z-index:-1">...</div>

  <script>
    // All rendering and export logic here
  </script>
</body>
</html>
```

### Typography

Load the font via the `<link>` tag above. Good defaults: **Inter**, **Plus Jakarta Sans**, **DM Sans**. Match the user's preference if they specified one.

Scale all font sizes relative to canvas width — never hardcode `px` values in slide rendering:

```javascript
// Typography scale — derive from canvas width W
function typography(W) {
  return {
    label:      W * 0.028,   // all-caps category label
    headline:   W * 0.090,   // standard headline (1–2 lines)
    headlineLg: W * 0.100,   // hero slide headline (larger)
    subtext:    W * 0.038,   // supporting sentence
    caption:    W * 0.030,   // small secondary text
  };
}
```

This ensures text renders correctly at all export resolutions without changes.

### Theme System

Four named themes as plain JS objects. The `config.theme` key selects between them:

```javascript
const THEMES = {
  "clean-light": {
    bg: "#FFFFFF",
    fg: "#111111",
    accent: config.brand.primary,
    muted: "#888888",
    surface: "#F4F4F8",
  },
  "dark-bold": {
    bg: "#0A0A0A",
    fg: "#FFFFFF",
    accent: config.brand.accent,
    muted: "#999999",
    surface: "#1A1A1A",
  },
  "vibrant": {
    bg: config.brand.primary,
    fg: "#FFFFFF",
    accent: config.brand.accent,
    muted: "rgba(255,255,255,0.7)",
    surface: config.brand.secondary,
  },
  "editorial": {
    bg: "#F8F5F0",
    fg: "#1A1A1A",
    accent: config.brand.primary,
    muted: "#7A7A7A",
    surface: "#EDE9E3",
  },
};

const theme = THEMES[config.theme];
```

### Preview scaling

The visible preview scales slides to fit the browser window. The off-screen export canvases stay at full resolution — never scale them:

```javascript
// Scale visible preview to container width
const previewScale = previewContainer.offsetWidth / PHONE_W;
previewSlide.style.transform = `scale(${previewScale})`;
previewSlide.style.transformOrigin = "top left";

// Export canvas: always PHONE_W × PHONE_H, no transform applied
```

### Overview mode

A toggle button switches between the normal preview (one slide at a time) and an overview grid (all slides at 20% scale in 3 columns). No separate page or route needed — just toggle `display:none` on the two sections:

```javascript
document.getElementById("btn-overview").addEventListener("click", () => {
  const isOverview = document.getElementById("overview").style.display !== "none";
  document.getElementById("preview").style.display = isOverview ? "block" : "none";
  document.getElementById("overview").style.display = isOverview ? "none" : "grid";
});
```

Overview is the fastest QA tool — see all slides together, spot layout repetition, check visual variety before exporting.

---

## Feature Graphic Implementation

The feature graphic is a standalone component, not a phone slide. It renders on its own 1024×500px canvas.

**Three styles (set via `featureGraphic.style` in config):**

### `gradient`
Full canvas diagonal gradient from `brand.primary` to `brand.secondary`. App icon on the left third (centered vertically, ~180×180px). Headline on the right two thirds.

Best for: most apps. Clean, professional, works with any brand color.

### `solid`
Flat `brand.background` fill. Horizontal rule accent line using `brand.primary`. More editorial and minimal.

Best for: utility apps, productivity tools, apps with a clean/minimal brand identity.

### `screenshot-backed`
App screenshot fills the right 55% of the canvas with a slight overlay. Left 45% is a solid `brand.primary` color panel. Headline sits on the solid panel. A feathered gradient fades between the two halves.

Best for: visually rich apps (photography, design, social) where showing the UI is itself a selling point.

**Typography for feature graphic** (scale from `FG_W = 1024`):

```typescript
const FGT = {
  headline: FG_W * 0.058,   // ~59px — larger than phone headline
  subtext:  FG_W * 0.028,   // ~29px
};
```

---

## Export Mechanism

Use `html-to-image` (preferred over `html2canvas` for superior CSS gradient, filter, and `clip-path` support).

### Critical double-call pattern

This is required for correct font and image rendering. The first call warms up lazy-loaded assets; the second produces clean output. Skipping the first call produces blurry text or missing images.

```javascript
// htmlToImage is available globally from the CDN script tag
async function exportSlide(element, filename) {
  // Move element temporarily on-screen — html-to-image requires visibility
  element.style.left = "0px";
  element.style.top = "0px";
  element.style.position = "fixed";
  element.style.zIndex = "9999";

  // First call: warms up fonts and images — result is discarded
  await htmlToImage.toPng(element, { pixelRatio: 1 });

  // Second call: clean, correct output
  const dataUrl = await htmlToImage.toPng(element, { pixelRatio: 1 });

  // Restore to off-screen position
  element.style.left = "-9999px";
  element.style.top = "0px";
  element.style.position = "fixed";
  element.style.zIndex = "-1";

  // Trigger file download
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();

  // Small delay between exports to avoid browser throttling
  await new Promise((r) => setTimeout(r, 200));
}
```

### Filename convention

Zero-padded numeric prefix ensures correct alphabetical sort order in the file system and when uploading to Play Store:

```
exports/phone/en/
├── 01-hero-1080x1920.png
├── 02-feature-one-1080x1920.png
├── 03-feature-two-1080x1920.png
├── 04-trust-1080x1920.png
└── 05-cta-1080x1920.png

exports/feature-graphic/
└── feature-graphic-1024x500.png
```

### Bulk export

```javascript
async function exportAll() {
  for (const locale of config.locales) {
    // Export phone slides
    for (let i = 0; i < config.slides.length; i++) {
      const el = document.getElementById(`canvas-${locale}-${config.slides[i].id}`);
      if (!el) continue;
      const name = `${String(i + 1).padStart(2, "0")}-${config.slides[i].id}-${PHONE_W}x${PHONE_H}.png`;
      await exportSlide(el, name);
    }

    // Export feature graphic
    const fg = document.getElementById(`canvas-${locale}-feature-graphic`);
    if (fg) await exportSlide(fg, `feature-graphic-${FG_W}x${FG_H}.png`);

    // Export tablet slides (if enabled)
    if (config.tablet && config.tablet.enabled) {
      for (const size of config.tablet.sizes) {
        const W = size === "10-inch" ? TAB10_W : TAB7_W;
        const H = size === "10-inch" ? TAB10_H : TAB7_H;
        for (let i = 0; i < config.slides.length; i++) {
          const el = document.getElementById(`canvas-tablet-${size}-${locale}-${config.slides[i].id}`);
          if (!el) continue;
          const name = `${String(i + 1).padStart(2, "0")}-${config.slides[i].id}-${W}x${H}.png`;
          await exportSlide(el, name);
        }
      }
    }
  }
}
```

---

## Multi-Language & RTL Support

Screenshots organize into locale folders under `exports/phone/`:

```
exports/phone/
├── en/
├── de/
└── ar/     ← RTL locale — layouts are mirrored
```

RTL detection and layout mirroring:

```javascript
const RTL_LOCALES = new Set(["ar", "he", "fa", "ur"]);
const isRtl = RTL_LOCALES.has(selectedLocale);

// Apply dir attribute to each slide container element:
// slideEl.setAttribute("dir", isRtl ? "rtl" : "ltr");
//
// CSS flexbox respects dir automatically — text and layout mirror
// without needing manual position overrides.
```

When `config.locales` contains multiple entries, build a locale `<select>` in the controls bar. On change, re-render all preview slides in the selected language.

---

## QA Checklist

Check all of these before exporting final assets.

**Content**
- [ ] Each slide communicates exactly one idea — no compound claims with "and"
- [ ] Every headline passes the one-second test at arm's length
- [ ] No feature is repeated across slides
- [ ] The set has a narrative arc: hook → proof → trust → CTA (or similar)
- [ ] Subtext (when present) adds information, not repetition

**Visual**
- [ ] No two consecutive slides use the same layout template
- [ ] At least one high-contrast treatment slide in the set (e.g. dark slide in a light set)
- [ ] Phone position and size varies across slides — not always centered at the same scale
- [ ] Text never overlaps with the phone frame
- [ ] The feature graphic reads clearly at 50% scale (how it appears in Play Store search results)

**Play Store compliance**
- [ ] Minimum 2 phone screenshots exported
- [ ] Maximum 8 phone screenshots per device type
- [ ] Feature graphic exported at exactly **1024 × 500px**
- [ ] All screenshots are JPEG or 24-bit PNG — **no alpha channel / transparency** in final exports
- [ ] All files are under **8MB**
- [ ] **No iOS-style UI elements** visible — no Dynamic Island, no iPhone notch shape, no iOS home indicator pill, no iOS status bar style
- [ ] No Apple branding, App Store badges, or iOS system iconography anywhere
- [ ] Background is fully opaque on all assets

**Export quality**
- [ ] All text is sharp and crisp at full resolution (no blur artifacts)
- [ ] Screenshots inside the mockup are not stretched or distorted — maintain original aspect ratio
- [ ] The double-call export pattern was used (skipping it causes blurry fonts)
- [ ] Filenames are zero-padded (`01-`, `02-`, not `1-`, `2-`)

---

## After Export: Uploading to Play Console

1. Go to [Google Play Console](https://play.google.com/console) → your app → **Store presence** → **Main store listing**
2. Under **Phone screenshots**, upload the files from `exports/phone/en/` in order
3. Under **Feature graphic**, upload `feature-graphic-1024x500.png`
4. If tablet screenshots were generated, upload them under the corresponding tablet section
5. Save and submit for review

Play Store processes uploads instantly — no waiting for asset approval before you can submit a release.
