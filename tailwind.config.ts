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
        background: "#1F2124",
        foreground: "#1F2124",
        secondary: "#4B4F52",
        tertiary: '#313134',
        footer: '#171717',
        link: '#9AC3FF',
        inputHover: "#5D6367",
        tooltip: "#1A1A1E"
      },
    },
  },
  plugins: [],
} satisfies Config;
