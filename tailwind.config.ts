import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tertiary: "#ffcd1f",
        secondary: "rgb(10,132,255)",
        primary: "rgb(0,122,255)",
        systemGray6: "rgb(28,28,30)",
        systemGray5: "rgb(44,44,46)",
        systemGray4: "rgb(58,58,60)",
        systemGray3: "rgb(72,72,74)",
        systemGray2: "rgb(99,99,102)",
        systemGray: "rgb(142,142,147)",
        _red: "rgb(255,59,48)",
        _green: "rgb(52,199,89)",
      },
    },
  },
  screens: {
    'tablet': '640px',
    // => @media (min-width: 640px) { ... }

    'laptop': '1024px',
    // => @media (min-width: 1024px) { ... }

    'desktop': '1280px',
    // => @media (min-width: 1280px) { ... }
  },
  plugins: [],
};
export default config;
