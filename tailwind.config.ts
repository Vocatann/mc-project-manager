import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#181818",
        primaryText: "#F7F7F7",
        secondaryText: "#B0B0B0",
        accent1: "#FF5722",
        accent2: "#673AB7",
        hover: "#FFEB3B",
        border: "#2E2E2E",
      },
    },
  },
  plugins: [],
} satisfies Config;
