# Play Store Screenshots Generator

**Your app deserves better than emulator screenshots.**

Most Android developers ship with raw device captures slapped directly onto Play Store. No context. No copy. No design. Meanwhile the apps ranking above them look like they hired a marketing team.

This skill closes that gap — give your AI assistant one prompt and get production-ready, marketing-focused Play Store screenshots in minutes.

---

<!-- Add a screenshot of example output here -->

---

## How it works

You answer one question. The AI does the rest.

> *"What are your top features, and what problem does each solve for your users?"*

From there the agent scans your project, extracts your brand colors directly from your screenshots, writes catchy headlines for each feature, and generates a complete set of polished slides — plus the Feature Graphic Play Store requires.

No design tools. No manual color picking. No copywriting from scratch.

```
You                          AI
─────────────────────────────────────────────────────
Answer 1 question       →    Scans your screenshots
                        →    Extracts brand colors
                        →    Writes headline + subtext per feature
                        →    Builds index.html + config.js
                        →    Generates 5 slides + Feature Graphic
Open browser            →
Click Export All        →    Downloads production PNGs
Upload to Play Console  →
```

---

## What gets generated

| Asset | Dimensions | Notes |
|---|---|---|
| Phone screenshots | 1080 × 1920px | 2–8 slides, text-top layout |
| Feature Graphic | 1024 × 500px | Required by Play Store |
| Tablet screenshots | 1200×1920 / 1600×2560px | Optional |
| Localized sets | Per-language exports | Optional, RTL-aware |

---

## Zero setup. Two files.

No npm. No framework. No `node_modules`. The entire generator is two files:

```
play-store-screenshots/
├── index.html    ← rendering engine + export logic
└── config.js     ← your copy, colors, slides (AI fills this in)
```

To preview, run one command and open Chrome:

```bash
python3 -m http.server 8080
```

That's it.

---

## Get started

**Install the skill:**

```bash
npx skills add mobile-dev-ci/play-store-screenshots
```

**Then tell your AI assistant:**

```
Generate Play Store screenshots for my Android app
using the play-store-screenshots skill.
```

Works with [Claude Code](https://claude.ai/code), [Cursor](https://cursor.sh), [Windsurf](https://windsurf.ai), and any AI assistant with skills support.

> **What is `npx skills`?** A CLI tool for installing AI assistant skills from GitHub. It copies the skill into your local `~/.claude/skills/` directory so your agent can reference it.
>
> **Prefer to install manually?**
> ```bash
> git clone https://github.com/mobile-dev-ci/play-store-screenshots
> cp -r play-store-screenshots/skills/play-store-screenshots ~/.claude/skills/
> ```

---

## What makes this different

**Headlines written around your features, not feature names.**
The AI asks what problem each feature solves — not just what it does. "Bigger text. Clearer words." lands harder than "Font size setting."

**Colors extracted from your screenshots.**
No manual hex picking. The AI reads your toolbar color, background, and accent from the screenshots you provide and builds the whole palette.

**One layout, done right.**
Text at the top, large phone below, bottom naturally cropped for depth. Every slide. The pattern that consistently produces clean, store-ready output.

**Feature Graphic as a first-class asset.**
Play Store requires a 1024×500 landscape banner that most tools ignore. This skill generates it properly alongside your slides.

**CSS-only Android mockup.**
No PNG device frame that goes stale. Pure CSS with correct proportions, punch-hole camera, and side buttons. Matches black, white, or silver.

---

## Inspired by

[app-store-screenshots](https://github.com/ParthJadhav/app-store-screenshots) by [@ParthJadhav](https://github.com/ParthJadhav) — the iOS version of this skill.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
