/**
 * Example screenshots.config.ts for "FocusFlow" — a productivity/focus timer app.
 * Copy this to src/app/screenshots.config.ts in your generated project and modify it.
 *
 * This example shows:
 *  - 5 phone slides with varied layouts
 *  - Feature graphic using the gradient style
 *  - Dark theme
 *  - Single locale (English)
 */

export const config = {
  app: {
    name: "FocusFlow",
    icon: "/app-icon.png",
  },

  brand: {
    primary: "#7C3AED",       // violet — dominant brand color
    secondary: "#4F46E5",     // indigo — gradient partner
    background: "#0D0D0D",    // near-black canvas
    surface: "#1A1A2E",       // dark surface for cards
    text: "#FFFFFF",          // white headlines
    textMuted: "#A1A1AA",     // muted labels
    accent: "#F59E0B",        // amber — CTA / highlight
  },

  theme: "dark-bold",

  device: {
    color: "black",
  },

  slides: [
    {
      id: "hero",
      layout: "hero-center",
      screenshot: "/screenshots/screen-timer.png",
      label: "FOCUS DIFFERENTLY",
      headline: "Deep work.\nNo distractions.",
      // No subtext on hero — let the visual breathe
    },
    {
      id: "flow-sessions",
      layout: "hero-right",
      screenshot: "/screenshots/screen-sessions.png",
      label: "FLOW SESSIONS",
      headline: "25 minutes.\nThen breathe.",
      subtext: "Pomodoro-style sessions built around how your brain actually works.",
    },
    {
      id: "stats",
      layout: "hero-left",
      screenshot: "/screenshots/screen-stats.png",
      label: "WEEKLY INSIGHTS",
      headline: "See what's\nactually working.",
      subtext: "Visualize your focus streaks and spot your most productive hours.",
    },
    {
      id: "block",
      layout: "split-screen",
      screenshot: "/screenshots/screen-block.png",
      label: "DISTRACTION BLOCKING",
      headline: "The apps\ncan wait.",
      subtext: "Block any app during focus sessions. One tap, no willpower needed.",
    },
    {
      id: "widgets",
      layout: "hero-center",
      screenshot: "/screenshots/screen-widget.png",
      label: "HOME SCREEN WIDGETS",
      headline: "Your streak.\nRight there.",
      // No subtext — the visual says it all
    },
  ],

  featureGraphic: {
    headline: "Focus like you mean it",
    subtext: "Available on Google Play",
    style: "gradient",
  },

  tablet: {
    enabled: false,
    sizes: ["10-inch"],
  },

  locales: ["en"],
};
