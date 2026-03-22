# Play Store Screenshots Generator

An AI-powered skill that generates production-ready **Google Play Store screenshots** for Android apps — designed for Claude Code, Cursor, Windsurf, and other AI coding assistants.

Screenshots are advertisements, not documentation. This skill builds a Next.js project that exports marketing-focused slides and a Feature Graphic at all required Play Store dimensions.

## What it generates

- **Phone screenshots** — 1080×1920px portrait (up to 8 slides)
- **Feature Graphic** — 1024×500px landscape banner (required by Play Store)
- **Tablet screenshots** — 7" and 10" sizes (optional)
- **Localized sets** — per-language exports with RTL support (optional)

## Installation

```bash
npx skills add mobile-dev-ci/play-store-screenshots
```

Or clone manually and copy the skill:

```bash
git clone https://github.com/mobile-dev-ci/play-store-screenshots
cp -r play-store-screenshots/skills/play-store-screenshots ~/.claude/skills/
```

## Usage

Once installed, ask your AI assistant:

> "Generate Play Store screenshots for my Android app using the play-store-screenshots skill."

The agent will:

1. Ask for your app screenshots, icon, brand colors, and feature priorities
2. Scaffold a Next.js project with a config-driven architecture
3. Design 2–8 marketing slides and a Feature Graphic
4. Export PNGs ready for upload to Google Play Console

## Key features

**Config-driven architecture** — All copy, colors, and slide definitions live in `screenshots.config.ts`. The layout engine in `page.tsx` reads from it. Iterating on content never touches layout code.

**CSS-only Android mockup** — No PNG asset required for the phone frame. Pure CSS with correct proportions, punch-hole camera, and side buttons. Works in black, white, or silver.

**Feature Graphic as first-class** — Play Store's required 1024×500 landscape banner is a full slide type with its own templates (gradient, solid, screenshot-backed), not an afterthought.

**Overview route** — `/overview` renders all slides in a grid at reduced scale. Review narrative arc and layout variety before exporting.

**Layout templates** — Six named compositions (`hero-center`, `hero-left`, `hero-right`, `split-screen`, `full-bleed`, `feature-graphic`) for consistent, polished output across runs.

**Play Store QA checklist** — Platform-specific validation: minimum 2 screenshots, feature graphic dimensions, no iOS UI elements, opaque backgrounds, files under 8MB.

## Tech stack

- [Next.js](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [html-to-image](https://github.com/bubkoo/html-to-image) — PNG export

## Play Store dimensions reference

| Asset | Dimensions | Required |
|---|---|---|
| Phone portrait | 1080 × 1920px | Yes (min 2) |
| Phone landscape | 1920 × 1080px | No |
| Feature Graphic | 1024 × 500px | Yes |
| Tablet 7" | 1200 × 1920px | No |
| Tablet 10" | 1600 × 2560px | No |

## License

MIT
