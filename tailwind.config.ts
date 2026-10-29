import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        chalk: "#F5F6F0",   // premium white with a green cast
        sage: "#DCE1D0",    // soft panels
        olive: "#6B7041",   // primary accent
        moss: "#3E4A2F",    // deep green
        forest: "#1E281B",  // text / dark sections
        pool: "#8DB4AE",    // the water, used sparingly
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
