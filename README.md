# Play Store Screenshots Generator

An AI-powered skill that generates production-ready **Google Play Store screenshots** for Android apps — designed for Claude Code, Cursor, Windsurf, and other AI coding assistants.

> Screenshots are advertisements, not documentation. This skill builds a Next.js project that exports marketing-focused slides and a Feature Graphic at all required Play Store dimensions.

---

## What it generates

| Asset | Dimensions | Required |
|---|---|---|
| Phone screenshots | 1080 × 1920px | Yes (2–8 slides) |
| Feature Graphic | 1024 × 500px | Yes |
| Tablet screenshots | 1200×1920 / 1600×2560px | No |
| Localized sets | per-language exports | No |

---

## Prerequisites

- Node.js 18 or later
- An AI assistant with skills support: [Claude Code](https://claude.ai/code), [Cursor](https://cursor.sh), or [Windsurf](https://windsurf.ai)
- Android screenshots from your device or emulator (taken beforehand)

---

## Installation

**Via `npx skills`** (recommended):

```bash
npx skills add mobile-dev-ci/play-store-screenshots
```

**Manually:**

```bash
git clone https://github.com/mobile-dev-ci/play-store-screenshots
cp -r play-store-screenshots/skills/play-store-screenshots ~/.claude/skills/
```

> `npx skills` is a CLI tool for installing AI assistant skills from GitHub. It copies the skill files to your local skills directory so your AI agent can reference them.

---

## Usage

Once installed, open your AI assistant in the folder where you want the project created and say:

> "Generate Play Store screenshots for my Android app using the play-store-screenshots skill."

The agent will walk you through the rest.

### What the agent does

1. **Asks** for your app screenshots, icon, brand colors, and top features
2. **Scaffolds** a Next.js project with a config-driven architecture
3. **Fills in** `screenshots.config.ts` with your copy, layouts, and colors
4. **Generates** 2–8 phone slides + a Feature Graphic with CSS-only Android mockups
5. **Exports** PNGs via `npm run dev` — click "Export All" in the browser

### What you do

1. Provide your raw Android screenshots (from device or emulator)
2. Answer the agent's questions about brand and features
3. Run `npm run dev` to preview
4. Click **Export All** — files download to your Downloads folder
5. Upload to [Google Play Console](https://play.google.com/console)

---

## Key features

**Config-driven architecture** — All copy, colors, and slide definitions live in `screenshots.config.ts`. The layout engine reads from it. Changing a headline never touches layout code. See [`example-config.ts`](skills/play-store-screenshots/example-config.ts) for a complete working example.

**CSS-only Android mockup** — No PNG asset required for the phone frame. Pure CSS with correct proportions, punch-hole camera, and side buttons. Works in black, white, or silver.

**Feature Graphic as first-class** — Play Store's required 1024×500 landscape banner is a full slide type with its own templates (gradient, solid, screenshot-backed) — not an afterthought.

**Six layout templates** — Named compositions (`hero-center`, `hero-left`, `hero-right`, `split-screen`, `full-bleed`, `feature-graphic`) give every run consistent, polished output.

**Overview route** — `/overview` renders all slides in a grid at reduced scale. Review narrative arc and layout variety before exporting.

**Play Store QA checklist** — Platform-specific validation built into the skill: minimum 2 screenshots, feature graphic at exact dimensions, no iOS UI elements, opaque backgrounds, files under 8MB.

---

## Tech stack

- [Next.js](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [html-to-image](https://github.com/bubkoo/html-to-image) — PNG export

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---


## License

MIT
