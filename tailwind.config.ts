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
          50:  "#FDFAF3",
          100: "#F8F0DC",
          200: "#F0DFB0",
          300: "#E4C87A",
          400: "#D4A84B",
          500: "#C09030",
          600: "#A07020",
          700: "#7D5218",
          800: "#5A3810",
          900: "#3A2108",
        },
        ink: {
          DEFAULT: "#0D0B08",
          50:  "#1A1710",
          100: "#252118",
          200: "#332D20",
        },
        cream: {
          DEFAULT: "#F8F4EC",
          50:  "#FDFCF8",
          100: "#F8F4EC",
          200: "#F0E8D8",
          300: "#E4D8C0",
        },
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
