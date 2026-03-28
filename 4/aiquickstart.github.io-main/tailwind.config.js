/* ================================================================
   TAILWIND.CONFIG.JS
   Ładowany po cdn.tailwindcss.com — rozszerza domyślny theme.
   ================================================================ */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        bg:      "#0a0a0a",
        surface: "#111111",
        border:  "#222222",
        accent:  "#d4ff00",
        snow:    "#f5f5f0",
        muted:   "#888888",
        danger:  "#ff3b3b",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        serif:   ['"DM Serif Display"', "serif"],
        sans:    ["Outfit", "sans-serif"],
      },
      screens: {
        xs: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        ticker:    { from: { transform: "translateX(0)" },                  to: { transform: "translateX(-50%)" } },
        gridShift: { "0%":  { transform: "translate(0,0)" },               "100%": { transform: "translate(60px,60px)" } },
        pulseGlow: { "0%,100%": { opacity: "1", transform: "scale(1)" },   "50%": { opacity: "0.4", transform: "scale(1.6)" } },
        blink:     { "0%,100%": { opacity: "1" },                          "50%": { opacity: "0" } },
      },
      animation: {
        "fu1":       "fadeUp 0.7s ease both",
        "fu2":       "fadeUp 0.7s ease 0.1s both",
        "fu3":       "fadeUp 0.7s ease 0.2s both",
        "fu4":       "fadeUp 0.7s ease 0.3s both",
        ticker:      "ticker 25s linear infinite",
        gridShift:   "gridShift 20s linear infinite",
        pulseGlow:   "pulseGlow 1.8s infinite",
        blink:       "blink 1s step-end infinite",
      },
    },
  },
};