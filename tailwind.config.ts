import type { Config } from "tailwindcss";

// Colours come from CSS variables in app/globals.css, so one attribute
// (data-theme="light" | "dark" on <html>) switches the whole site.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        ink: v("ink"),         // page background
        surface: v("surface"), // raised panels
        rule: v("rule"),       // hairlines and borders
        paper: v("paper"),     // primary text
        muted: v("muted"),     // secondary text
        marigold: v("accent"), // the single accent
      },
      fontFamily: {
        serif: ['"Newsreader Variable"', "Georgia", "Times New Roman", "serif"],
        sans: ['"Schibsted Grotesk Variable"', "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: { page: "84rem" },
    },
  },
  plugins: [],
};
export default config;
