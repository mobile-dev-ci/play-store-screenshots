---
name: play-store-screenshots
description: Use when building Google Play Store screenshot pages, generating exportable marketing screenshots for Android apps,  or creating programmatic screenshot generators with Next.js. Triggers on google play store, play store, screenshots, marketing assets, phone mockup.
---

# Play Store Screenshots Generator

## Overview & Core Philosophy

This skill generates **advertising-focused Google Play Store screenshots** using Next.js and `html-to-image`. The fundamental principle: **screenshots are advertisements, not documentation.** Each slide communicates a single outcome, feeling, or solution — not a UI tour.

Unlike the Apple App Store, Play Store also requires a **Feature Graphic** (1024×500px) — a landscape banner displayed prominently on your app's store listing page. This skill treats it as a first-class asset alongside phone screenshots.

---

## Discovery Phase

The goal is to start generating as fast as possible without making wrong assumptions that waste the user's time. The approach: **ask what you must, derive what you can, always show your work and confirm before proceeding.**

---

### Step 1 — Ask first, look second

Before looking at any files, ask the one question that cannot be derived:

> "What are your top 3–6 features? For each, briefly describe what problem it solves for your users."

This is a marketing decision — no file or screenshot can answer it. The user knows their app's value proposition.

If the user gives feature names without the problem angle (e.g. "offline mode, dark theme, favourites"), follow up:

> "For each one — what would a user find frustrating if that feature didn't exist?"

Do not move to Step 2 until you have this.

---

### Step 2 — Scan and find assets

Once you have the features, scan the current directory for assets. Look for:

- **Screenshots**: `.png` / `.jpg` files in the current folder or a `screenshots/` subfolder
- **App icon**: check standard Android paths first:
  ```
  app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
  app/src/main/res/mipmap-xxhdpi/ic_launcher.png
  ```
  If not an Android project, look for any file named `icon*.png`, `logo*.png`, or `app-icon.*`

If you **find exactly what you need** — list the files and say:
> "I found these screenshots: [list]. I'll use these. Is that correct?"

If you **find multiple candidates and can't tell which is right** — show them and ask:
> "I found several PNG files. Which ones are the app screenshots to use?"

If you **find nothing** — ask directly:
> "I couldn't find any screenshots in this directory. Where are your Android app screenshots saved?"

Never guess silently when there is ambiguity. One wrong file wastes the entire run.

---

### Step 3 — Derive visual settings from the screenshots

Once you have the screenshots, analyze them visually and derive the following. **Present your findings as a short confirmation block before writing any code:**

```
Here's what I picked up from your screenshots — let me know if anything looks off:

  App name:    Aarti Mandir
  Primary:     #C9822A  (toolbar orange)
  Background:  #FFF8F0  (warm cream)
  Text:        #2D1A00  (dark brown)
  Accent:      #C9822A
  Theme:       editorial  (warm/earthy tones)
  Font:        Inter  (default — let me know if you use a specific font)
  Frame:       white  (light app)
  Slides:      5
```

Only proceed once the user confirms or corrects this. A 10-second confirmation here prevents regenerating everything because a color was wrong.

**How to derive each value:**

| Value | How to derive |
|---|---|
| App name | Read it from the screenshots (toolbar, splash screen, icon label) |
| Primary color | Dominant UI color — toolbar, header, active tab, filled buttons |
| Background color | Color behind most of the screen content |
| Text color | Infer from background — dark bg → `#FFFFFF`, light bg → `#111111` |
| Accent color | CTA buttons, highlights, toggles, active states |
| Secondary color | Gradient partner — shift primary hue 15–20 degrees, or use a visible secondary UI color |
| Theme | Dark bg → `dark-bold` · light/white bg → `clean-light` · warm/earthy bg → `editorial` · brand color fills bg → `vibrant` |
| Font | Default **Inter** unless app screenshots show a clearly distinctive typeface |
| Frame color | Dark app (dark toolbar + bg) → `black` · light app → `white` |
| Slide count | Default **5** |

**If you genuinely cannot determine a value from the screenshots** — ask. Do not guess.

> "I can't clearly make out your primary brand color from the screenshots. What hex color is your main brand color?"

---

### Step 4 — Confirm, then build

After the user confirms the summary in Step 3, proceed to generate `config.js` and `index.html`. Do not ask any more questions unless something unexpected comes up.

**Silent defaults** (never ask about these unless the user raises them):
- `tablet.enabled`: `false`
- `locales`: `["en"]`
- `featureGraphic.style`: `"gradient"`
- `featureGraphic.subtext`: `"Available on Google Play"`

---

### What to ask vs. what to derive

| Input | Approach |
|---|---|
| Features + user problems | **Always ask** — cannot be derived |
| Screenshot paths | Scan → confirm if found, ask if not found or ambiguous |
| App icon path | Scan standard paths → confirm if found, ask if not |
| App name | Read from screenshots → confirm in summary |
| Brand colors | Extract visually → confirm in summary, ask if unclear |
| Theme | Infer from bg color → confirm in summary |
| Font | Default Inter → confirm in summary, note if app uses something distinctive |
| Device frame color | Infer from app tone → confirm in summary |
| Slide count | Default 5 → state in summary, user can override |
| Tablet / locale / landscape | Default off/en/portrait → never ask, only activate if user raises it |

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
      layout: "text-top",
      screenshot: "screenshots/screen2.png",
      label: "FEATURE NAME",
      headline: "Short benefit\nstatement here.",
      subtext: "One supporting sentence, maximum.",
    },
    // Add 2–8 slides total — all use layout: "text-top"
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

## Slide Layout

### One layout. Used consistently.

Every phone slide uses the same composition: **text at the top, large phone below**. This is not a limitation — it is the correct pattern for portrait Play Store screenshots. It is what works.

```
┌─────────────────────┐
│   App Name          │  ← small, top padding ~6% of canvas height
│                     │
│   LABEL             │  ← all-caps label
│   Big headline      │  ← largest text on the slide
│   here.             │
│   Subtext sentence. │  ← optional, smaller
│                     │
│  ┌───────────────┐  │
│  │               │  │
│  │  [screenshot] │  │  ← phone, large, centered
│  │               │  │
│  │               │  │  ← bottom of phone crops off canvas (intentional)
└──┴───────────────┴──┘
```

**Standard phone sizing — use these exact values:**

| Property | Value |
|---|---|
| Phone width | `PHONE_W * 0.82` (≈885px) |
| Phone height | `phoneWidth * 2.15` (≈1903px — taller than canvas) |
| Phone left | `(PHONE_W - phoneWidth) / 2` (centered) |
| Phone top | `PHONE_H * 0.34` (≈653px from top) |
| Bottom crop | ~25% of phone height clips off canvas — intentional, adds depth |

The phone bottom extending past the canvas edge is intentional and desirable — it grounds the phone visually and removes the awkward empty space that appears when the whole frame is visible.

**Text block positioning:**

The text container spans `height: PHONE_H * 0.32` with `overflow: hidden`. Content is vertically centered within it. The phone starts at `PHONE_H * 0.34`, leaving a ~2% breathing gap between the text block bottom and the phone top edge — this prevents the label chip or last headline line from touching the device frame.

| Element | Position |
|---|---|
| App name / brand | `top: PHONE_H * 0.06`, centered |
| Label | `top: PHONE_H * 0.13`, centered |
| Headline | Below label, centered, `font-size: PHONE_W * 0.09` |
| Subtext | Below headline, centered, `font-size: PHONE_W * 0.038` |

Keep the entire text block within the top 32% of canvas height (the container enforces this with `overflow: hidden`). If text overflows, shorten the headline — do not push the phone lower.

---

### `feature-graphic` *(feature graphic only — not a phone slide)*

Landscape canvas (1024×500px). No device mockup. Two composition options:

- **Icon-left:** App icon (180×180) on left third, headline + subtext on right two thirds
- **Icon-center:** App icon centered at top, headline below, subtext below that

Background fills the full canvas using the chosen `featureGraphic.style`.

---

### Supported layouts

The template implements exactly two layouts:

- **`text-top`** — use this for most slides (described above)
- **`full-bleed`** — full-screen screenshot with a gradient overlay; text floats at the top

Any other `layout` value will render a red error box. Do not write slides with `layout: "text-bottom"`, `layout: "split-screen"`, `layout: "hero-left"`, or `layout: "hero-right"` — they are not implemented.

#### `full-bleed` layout

The screenshot fills the entire canvas (`width:100%; height:100%; object-fit:cover`). A dark gradient fades from the top (~35% height) to transparent, sitting above the screenshot. Label and headline float over this gradient at the top, in white. No device mockup.

Use this for one slide only — it works best when the app screenshot is visually compelling on its own. Never use it for screenshots showing dense UI (lists, settings). Avoid pairing consecutive `full-bleed` slides.

```
┌─────────────────────┐
│   LABEL             │  ← white text over gradient
│   Big headline      │
│   here.             │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← gradient fade
│                     │
│  [screenshot fills  │
│   entire canvas]    │
│                     │
└─────────────────────┘
```

---

## Android Device Mockup (CSS-Only)

The Android phone frame is implemented in **pure CSS — no PNG asset required.** This avoids the fragile PNG-offset coupling where exact pixel values must match a specific image file.

**Component: `<AndroidPhoneMockup>`**

Props: `screenshot` (string path), `color` ("black" | "white" | "silver"), `width` (number px), `height` (number px)

Rendered structure and key proportions (all values derived from component `width` / `height`):

```
┌──────────────────────┐  outer frame (corner radius: width*0.12)
│          ●           │  punch-hole camera: width*0.028 diameter, centered, top height*0.018
│  ┌────────────────┐  │  screen: left/right inset width*0.030, top/bottom inset height*0.025
│  │                │  │
│  │  [screenshot]  │  │
│  │                │  │
│  └────────────────┘  │
│        ───────       │  home indicator: width*0.30 wide, height*0.003 tall, bottom height*0.015
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
| Home indicator from bottom | `height * 0.014` |

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

## Premium Design Elements

The difference between a basic screenshot and a premium-looking one is entirely in the decorative layer — background treatment, label design, and subtle depth behind the phone. All of these are pure CSS applied to the slide canvas.

### Background treatments

Never use a flat solid fill for the slide background. Layer at least two elements:

1. **Base gradient** — diagonal or radial, multi-stop, using brand colors
2. **Decorative orbs** — 2–3 large, heavily blurred circles placed behind the text and phone

```css
/* Example: dark theme with purple brand */
.slide {
  background: linear-gradient(160deg, #080613 0%, #120B22 60%, #060410 100%);
  position: relative;
  overflow: hidden;
}

/* Blurred decorative orb */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  pointer-events: none;
  z-index: 1;
}

/* Top orb — sits behind the text block */
.orb-top {
  width: 700px; height: 700px;
  top: -120px; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, #7C3AED 0%, transparent 70%);
  opacity: 0.28;
}

/* Bottom orb — sits behind the phone */
.orb-bottom {
  width: 900px; height: 900px;
  top: 500px; left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle, #4338CA 0%, transparent 70%);
  opacity: 0.20;
}
```

Adjust orb opacity by theme:
- Dark themes: `0.25–0.40`
- Light themes: `0.08–0.15` (very soft tinted wash, barely visible)

### Label as pill badge

The label must be a pill-shaped badge with a background — not plain text. This single change makes slides look designed rather than assembled.

```css
/* All values below are illustrative — scale relative to W as shown in comments */
.label-pill {
  display: inline-flex;
  align-items: center;
  padding: 12px 32px;     /* W*0.011 W*0.030 */
  border-radius: 100px;
  font-size: 28px;        /* W * 0.026 */
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 32px;    /* W * 0.030 */
}

/* Dark theme — glass/translucent variant */
.label-pill-glass {
  background: rgba(255, 255, 255, 0.10);
  color: rgba(255, 255, 255, 0.80);
  border: 1.5px solid rgba(255, 255, 255, 0.14);
}

/* Dark theme — colored variant (hero slide or high-emphasis labels) */
.label-pill-accent {
  background: rgba(124, 58, 237, 0.18);   /* use brand primary at ~18% */
  color: #C4B5FD;                          /* lighter tint of primary */
  border: 1.5px solid rgba(124, 58, 237, 0.32);
}

/* Light theme */
.label-pill-light {
  background: rgba(201, 130, 42, 0.12);   /* brand primary at ~12% */
  color: #92600E;                          /* darker shade for contrast */
  border: 1.5px solid rgba(201, 130, 42, 0.25);
}
```

### Headline typography

Apply tight letter-spacing and a subtle text shadow for depth:

```css
/* font-size must be set via inline style using the proportional system — not hardcoded */
.headline {
  /* font-size: W * 0.090  (set inline, not in CSS class) */
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

/* Dark theme only */
.slide-dark .headline {
  text-shadow: 0 4px 40px rgba(0, 0, 0, 0.40);
}
```

### App icon in header

Show the app icon above the label (≈80px, rounded). This anchors brand identity on every slide without adding clutter.

```css
.app-icon {
  width: 80px; height: 80px;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.30);
  margin-bottom: 20px;
}
```

### Phone ambient glow (dark themes only)

A radial glow placed between the background and the phone makes the device feel embedded in light rather than pasted on top:

```css
.phone-glow {
  position: absolute;
  width: 900px; height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--brand-primary) 0%, transparent 65%);
  filter: blur(80px);
  opacity: 0.18;
  top: 400px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 4;   /* above background orbs, below phone */
}
```

Do not add glow on light backgrounds — it reads as a muddy stain.

### Noise texture overlay (optional, high-end finish)

A subtle SVG noise texture makes gradients feel less flat and more printed. Keep opacity very low:

```css
.slide::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.04;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 100;
}
```

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

## Copy Strategy & Messaging

Each slide has three text elements: a **label**, a **headline**, and an optional **subtext**. Each has a different job. Get all three right and the slide sells itself in one second.

---

### Step 1: Go from feature description to copy

When the user describes a feature, do not describe it back to them. Ask instead:

> *"What would make someone anxious or frustrated if this feature didn't exist?"*

That anxiety is your headline. The feature is just the solution to it.

**Example:**
- User says: *"Offline mode — the app works without internet"*
- Anxiety: Being somewhere with no signal when you need the app
- Headline: `"No signal?\nNo problem."` or `"Every prayer.\nAlways there."`
- NOT: `"Works offline"` or `"Offline support"`

**Example:**
- User says: *"You can change the font size"*
- Anxiety: Straining to read small text, especially for older users
- Headline: `"Bigger text.\nClearer words."` or `"Read your way."`
- NOT: `"Adjustable font size"` or `"Accessibility features"`

**Example:**
- User says: *"Save favourites / bookmark prayers"*
- Anxiety: Scrolling through everything to find the one you use most
- Headline: `"Your prayers.\nAlways close."` or `"Save what\nyou love."`
- NOT: `"Favourites system"` or `"Bookmark your content"`

---

### Step 2: Write the headline

The headline is the largest text on the slide. It must land in under one second at thumbnail size.

**Six formulas that work. Pick the one that fits the feature's emotional angle:**

#### Formula 1: Solve the pain
State the problem and imply the solution. Short, punchy.
> `"No signal?\nNo problem."`
> `"Stop searching.\nJust find it."`
> `"Forgot again?\nNever again."`

#### Formula 2: Own it (possessive + outcome)
Creates a sense of personal ownership. Feels intimate.
> `"Your prayers.\nAlways close."`
> `"Your pace.\nYour progress."`
> `"Your data.\nYour call."`

#### Formula 3: The moment (paint the exact instant)
Describes the specific moment the user benefits. Makes it tangible.
> `"Every prayer.\nAt your fingertips."`
> `"Done by noon.\nEvery day."`
> `"Open the app.\nStart the calm."`

#### Formula 4: Simple contrast (before vs after, implied)
Two short lines. First creates tension, second resolves it.
> `"Bigger text.\nClearer words."`
> `"One tap.\nInstant access."`
> `"Less noise.\nMore focus."`

#### Formula 5: The invitation (active verb + reward)
Starts with a verb. Energetic, direct.
> `"Save what\nyou love."`
> `"Find anything.\nInstantly."`
> `"Switch languages.\nAnytime."`

#### Formula 6: The declaration (confident statement of identity)
What the app IS, stated boldly. Best for hero slide.
> `"Every prayer.\nAt your fingertips."`
> `"Focus like\nyou mean it."`
> `"Your daily\ndevotion. Simplified."`

---

### Step 3: Write the label

The label is the small all-caps tag above the headline. Its job is to prime the reader — tell them what category of benefit is coming so the headline lands harder.

**Rules:**
- 1–3 words, all caps
- Name the benefit category, not the feature name
- Should make the reader curious about the headline below it

| Feature | Bad label | Good label |
|---|---|---|
| Offline mode | `OFFLINE MODE` | `100% OFFLINE` |
| Font size setting | `ACCESSIBILITY` | `READ COMFORTABLY` |
| Favourites | `BOOKMARKS` | `FAVOURITES` |
| Bilingual | `LANGUAGES` | `BILINGUAL` |
| Dark mode | `DARK MODE` | `EASIER ON EYES` |
| Daily reminder | `NOTIFICATIONS` | `DAILY REMINDER` |

---

### Step 4: Write the subtext

The subtext is one supporting sentence below the headline. It is optional — leave it empty when the headline is strong enough alone (especially on the hero slide).

When you do use it:
- Add ONE specific detail the headline deliberately left vague
- Make it conversational, not corporate
- Max 8–10 words
- Do not restate the headline in different words

| Headline | Bad subtext | Good subtext |
|---|---|---|
| `"Every prayer.\nAt your fingertips."` | "Access all your prayers easily in one place" | "Aarti • Chalisa • Mantra — all in one place" |
| `"No signal?\nNo problem."` | "The app works without an internet connection" | "Every prayer, always available." |
| `"Bigger text.\nClearer words."` | "You can adjust the font size for better readability" | "Adjust font size to suit you." |
| `"Save what\nyou love."` | "Save your favourite prayers as bookmarks" | "Quick access to your most-used prayers." |

---

### Rules that apply to everything

**One idea per slide.** If you find yourself writing "and", you have two slides, not one.

**3–5 words per line.** Break lines intentionally — the line break is part of the design, not an accident of wrapping.

**Short words win.** 1–2 syllables. Test: would a 10-year-old understand this instantly?

**Verbs over nouns.** "Save what you love" beats "Favourites management". "Find anything" beats "Search functionality".

**Never use these words:** seamless, powerful, advanced, robust, intuitive, innovative, comprehensive, streamlined, leverage, utilize. They say nothing.

---

### Complete bad → better reference

| Feature description | Bad headline | Good headline |
|---|---|---|
| "Task management with priorities" | "Advanced task management" | `"Done by noon.\nEvery day."` |
| "Syncs across devices" | "Cross-device sync" | `"Your phone.\nYour tablet.\nOne list."` |
| "Analytics dashboard" | "Powerful analytics" | `"See what's\nactually working."` |
| "Push notifications" | "Real-time notifications" | `"Never miss\nwhat matters."` |
| "Home screen widget" | "Customizable widgets" | `"Your info.\nRight there."` |
| "Offline mode" | "Works offline" | `"No signal?\nNo problem."` |
| "Font size control" | "Accessibility features" | `"Bigger text.\nClearer words."` |
| "Save favourites" | "Bookmark system" | `"Your prayers.\nAlways close."` |
| "Dark mode" | "Dark mode support" | `"Easier on\nyour eyes."` |
| "Language switch" | "Bilingual support" | `"Hindi or English.\nYou choose."` |

---

### Feature graphic headline

Same rules, slightly longer — up to 8 words since the landscape canvas has more room. Should capture the app's core promise in a single line. No line breaks needed.

> `"The app that changes how you pray"` ✓
> `"Every devotional. One beautiful app."` ✓
> `"Your daily devotional companion"` ✓

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
  <!-- JSZip + FileSaver — bundle all exports into a single ZIP download -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
  <!-- User's config — must come before the main script -->
  <script src="config.js"></script>
</head>
<body>
  <!-- Top bar: app name, locale selector, Export ZIP button -->
  <div id="topbar">...</div>

  <!-- Slide grid: ALL slides visible at once, each scaled to fit viewport height.
       This is the default and only view — no toggle needed. -->
  <div id="slide-grid">
    <!-- Phone slides (one .slide-wrap per slide) -->
    <!-- Feature graphic last, same row, scaled proportionally -->
  </div>

  <!-- Off-screen export canvases: always full resolution, never scaled -->
  <div id="export-canvases" style="position:fixed;left:-9999px;top:0;z-index:-1">...</div>

  <script>
    // All rendering and export logic here
  </script>
</body>
</html>
```

**Key principle: all slides are always visible in the grid. There is no "one at a time" mode and no toggle.** The grid IS the interface — it lets you QA all slides at a glance before exporting.

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

### Rendering headline newlines

**Critical:** Headlines in `config.js` use `\n` to break lines (e.g. `"Every prayer.\nAt your fingertips."`). Never rely on `white-space: pre-line` to render these — that only works with actual newline characters, not the literal two-character sequence `\n` that config values may contain. Always convert using a helper before inserting into innerHTML:

```javascript
const nl2br = (text) => text.replace(/\\n|\n/g, '<br>');
```

Use `nl2br(slide.headline)` and `nl2br(slide.subtext)` everywhere you insert these values into HTML.

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

### Slide grid scaling

Scale each phone slide so it fits comfortably within the viewport height. Compute a single scale factor and apply it to all slide wrappers:

```javascript
const TOPBAR_H = 52;  // height of the top controls bar in px

const SCALE = Math.min(
  (window.innerHeight - TOPBAR_H - 64) / PHONE_H,          // fit vertically
  (window.innerWidth - 80) / (PHONE_W * config.slides.length + 20 * (config.slides.length - 1))
);

document.querySelectorAll(".slide-wrap").forEach(wrap => {
  wrap.style.width  = `${PHONE_W * SCALE}px`;
  wrap.style.height = `${PHONE_H * SCALE}px`;
});
document.querySelectorAll(".slide").forEach(slide => {
  slide.style.transform      = `scale(${SCALE})`;
  slide.style.transformOrigin = "top left";
});
```

The feature graphic renders on the same row. Scale it proportionally so its height visually matches the phone slides:

```javascript
const fgScale = (PHONE_H * SCALE) / FG_H;
fgWrap.style.width  = `${FG_W * fgScale}px`;
fgWrap.style.height = `${FG_H * fgScale}px`;
fgEl.style.transform      = `scale(${fgScale})`;
fgEl.style.transformOrigin = "top left";
```

The off-screen export canvases are always at full resolution — never scale them.

---

## Feature Graphic Implementation

The feature graphic is a standalone component, not a phone slide. It renders on its own **1024×500px** canvas.

### Critical: enforce exact canvas dimensions

The canvas element must be explicitly sized in CSS — never let the browser size it from content:

```css
#feature-graphic-canvas {
  width: 1024px;
  height: 500px;
  position: relative;
  overflow: hidden;
  /* Never set width/height from JS or let it auto-size */
}
```

In the grid preview, apply a CSS `transform: scale(...)` to resize it visually, but keep the underlying DOM element at exactly 1024×500. If the canvas is sized any other way, the exported PNG will have wrong dimensions.

### Three styles (set via `featureGraphic.style` in config)

#### `gradient`
Full canvas diagonal gradient from `brand.primary` to `brand.secondary`. Overlay 2–3 blurred orbs for depth (same technique as phone slides). App icon on the left third (centered vertically, 180×180px). Headline right of center, subtext below.

```
┌──────────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░  gradient bg + subtle orbs  ░░░░░░░░░  │
│                                                           │
│   ┌──────┐   App Name                                     │
│   │ ICON │                                                │
│   │      │   Big headline here                            │
│   └──────┘   Available on Google Play                     │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

Best for: most apps. Clean, professional, works with any brand color.

#### `solid`
Flat `brand.background` fill with a thin horizontal accent line (`brand.primary`) and large centered app icon. Headline and subtext centered below.

Best for: utility apps, productivity tools, apps with a clean/minimal brand identity.

#### `screenshot-backed`
App screenshot fills the right 55% of the canvas (cropped, object-fit cover). Left 45% is a solid `brand.primary` panel. Feathered gradient fades between the two halves. Headline and icon sit on the solid panel.

Best for: visually rich apps (photography, design, social) where showing the UI is itself a selling point.

### Premium feature graphic composition

Apply the same decorative orbs technique to the feature graphic:

```css
.fg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
/* Large orb upper-left, behind icon */
.fg-orb-1 {
  width: 300px; height: 300px;
  top: -60px; left: -40px;
  background: radial-gradient(circle, var(--brand-secondary) 0%, transparent 70%);
  opacity: 0.40;
}
/* Smaller orb lower-right */
.fg-orb-2 {
  width: 200px; height: 200px;
  bottom: -40px; right: 80px;
  background: radial-gradient(circle, var(--brand-primary) 0%, transparent 70%);
  opacity: 0.30;
}
```

### Typography for feature graphic (scale from `FG_W = 1024`)

```javascript
const FGT = {
  headline: FG_W * 0.060,   // ~61px — confident, reads at small sizes
  subtext:  FG_W * 0.026,   // ~27px
  appName:  FG_W * 0.030,   // ~31px — shown above the headline
};
```

---

## Export Mechanism

Use `html-to-image` (preferred over `html2canvas` for superior CSS gradient, filter, and `clip-path` support). Use JSZip + FileSaver.js to bundle all exports into a single ZIP download.

### Critical double-call pattern

This is required for correct font and image rendering. The first call warms up lazy-loaded assets; the second produces clean output. Skipping the first call produces blurry text or missing images.

The `captureSlide` helper below implements this pattern and is used by `exportAll`:

```javascript
// Moves the element on-screen momentarily (required by html-to-image),
// captures twice for clean output, then returns the data URL.
async function captureSlide(element) {
  element.style.left     = "0px";
  element.style.top      = "0px";
  element.style.position = "fixed";
  element.style.zIndex   = "9999";

  // First call: warms up fonts and images — result discarded
  await htmlToImage.toPng(element, { pixelRatio: 1 });

  // Second call: clean, correct output
  const dataUrl = await htmlToImage.toPng(element, { pixelRatio: 1 });

  // Restore to off-screen position
  element.style.left     = "-9999px";
  element.style.top      = "0px";
  element.style.position = "fixed";
  element.style.zIndex   = "-1";

  await new Promise((r) => setTimeout(r, 200));
  return dataUrl;
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

### Bulk export as ZIP

All slides are collected into a single ZIP file and downloaded in one click. No individual file downloads.

```javascript
// Capture helper — double-call pattern for clean font and image rendering
async function captureSlide(element) {
  element.style.left     = "0px";
  element.style.top      = "0px";
  element.style.position = "fixed";
  element.style.zIndex   = "9999";

  // First call: warms up lazy-loaded fonts and images — result discarded
  await htmlToImage.toPng(element, { pixelRatio: 1 });
  // Second call: clean, correct output
  const dataUrl = await htmlToImage.toPng(element, { pixelRatio: 1 });

  element.style.left     = "-9999px";
  element.style.top      = "0px";
  element.style.position = "fixed";
  element.style.zIndex   = "-1";

  await new Promise((r) => setTimeout(r, 200));
  return dataUrl;
}

async function exportAll() {
  const zip = new JSZip();
  const phoneFolder = zip.folder("phone");
  const fgFolder    = zip.folder("feature-graphic");

  for (const locale of config.locales) {
    const localeFolder = phoneFolder.folder(locale);

    // Phone slides
    for (let i = 0; i < config.slides.length; i++) {
      const el = document.getElementById(`canvas-${locale}-${config.slides[i].id}`);
      if (!el) continue;
      const name = `${String(i + 1).padStart(2, "0")}-${config.slides[i].id}-${PHONE_W}x${PHONE_H}.png`;
      const dataUrl = await captureSlide(el);
      localeFolder.file(name, dataUrl.split(",")[1], { base64: true });
    }

    // Feature graphic
    const fg = document.getElementById(`canvas-${locale}-feature-graphic`);
    if (fg) {
      const dataUrl = await captureSlide(fg);
      fgFolder.file(`feature-graphic-${FG_W}x${FG_H}.png`, dataUrl.split(",")[1], { base64: true });
    }

    // Tablet slides (if enabled)
    if (config.tablet && config.tablet.enabled) {
      for (const size of config.tablet.sizes) {
        const W = size === "10-inch" ? TAB10_W : TAB7_W;
        const H = size === "10-inch" ? TAB10_H : TAB7_H;
        const tabFolder = zip.folder(`tablet-${size}/${locale}`);
        for (let i = 0; i < config.slides.length; i++) {
          const el = document.getElementById(`canvas-tablet-${size}-${locale}-${config.slides[i].id}`);
          if (!el) continue;
          const name = `${String(i + 1).padStart(2, "0")}-${config.slides[i].id}-${W}x${H}.png`;
          const dataUrl = await captureSlide(el);
          tabFolder.file(name, dataUrl.split(",")[1], { base64: true });
        }
      }
    }
  }

  // Generate and trigger download of the ZIP
  const appSlug = config.app.name.replace(/\s+/g, "-").toLowerCase();
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${appSlug}-play-store-screenshots.zip`);
}
```

One click produces `focusflow-play-store-screenshots.zip` containing all slides organized by type and locale. Ready to unzip and upload to Play Console.

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
- [ ] All slides use `layout: "text-top"` (or `"full-bleed"` for at most one slide) — no other layout values
- [ ] Text never overlaps with the phone frame (keep headline short if it risks overflow)
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
