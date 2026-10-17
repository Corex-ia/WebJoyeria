import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  "#FEFCF3",
          100: "#FBF5E0",
          200: "#F5E8B8",
          300: "#EDD680",
          400: "#C9A84C",
          500: "#B8943A",
          600: "#9A7A28",
          700: "#7A5E18",
          800: "#5A440C",
          900: "#3A2C04",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          50:  "#1A1A1A",
          100: "#2A2A2A",
          200: "#3A3A3A",
          soft:    "#6B6B6B",
        },
        surface: {
          DEFAULT: "#F5F3EF",
          50:  "#FFFFFF",
          100: "#F9F7F4",
          200: "#F0EDE7",
          300: "#E3DFD7",
          400: "#CCC7BC",
        },
        // keep cream alias for admin/cart compatibility
        cream: {
          DEFAULT: "#F5F3EF",
          50:  "#FFFFFF",
          100: "#F9F7F4",
          200: "#F0EDE7",
          300: "#E3DFD7",
        },
      },
      fontFamily: {
        sans:    ["var(--font-inter)",  "system-ui", "sans-serif"],
        serif:   ["var(--font-serif)",  "Georgia",   "serif"],
        display: ["var(--font-serif)",  "Georgia",   "serif"],
      },
      transitionTimingFunction: {
        spring:  "cubic-bezier(0.16, 1, 0.3, 1)",
        luxury:  "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "900": "900ms",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scrollDrop: {
          "0%":   { height: "0px", opacity: "1" },
          "60%":  { height: "48px", opacity: "1" },
          "100%": { height: "48px", opacity: "0" },
        },
        heroIn: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee:      "marquee 32s linear infinite",
        "scroll-drop":"scrollDrop 2.4s ease-in-out infinite",
        "hero-in":    "heroIn 1s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
