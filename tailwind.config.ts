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
        secondary: "#4D5156",
        tertiary: '#313134',
        footer: '#171717'
      },
    },
  },
  plugins: [],
} satisfies Config;
