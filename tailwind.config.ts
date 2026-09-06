import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/three/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        panel: "var(--panel)",
        steel: "var(--steel)",
        fog: "var(--fog)",
        bone: "var(--bone)",
        copper: "var(--copper)",
        ember: "var(--ember)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        hero: "var(--type-hero)",
        h2: "var(--type-h2)",
        h3: "var(--type-h3)",
        body: "var(--type-body)",
        mono: "var(--type-mono)",
      },
    },
  },
  plugins: [],
};
export default config;
