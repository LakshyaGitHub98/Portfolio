import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
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
    },
  },
  plugins: [],
};
export default config;
