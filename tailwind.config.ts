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
        havna: {
          50: "#f5f4f3",
          100: "#ebeae8",
          200: "#e0dfdc",
          300: "#d0cec9",
          400: "#c0beba",
          500: "#b0aeaa",
          600: "#6b6765",
          700: "#5f5b59",
          800: "#54504e",
          900: "#484543",
          950: "#3d3a39",
        },
        sand: {
          50: "#f5f4f3",
          100: "#ebeae8",
          200: "#e0dfdc",
          300: "#d0cec9",
          400: "#c0beba",
          500: "#b0aeaa",
        },
        plate: "#b8b8b8",
        ink: "#544f4d",
        paper: "#f7f4ee",
        greige: "#e1ded8",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        caption: ["11px", { lineHeight: "1.2", letterSpacing: "0.23px" }],
        "body-sm": ["14px", { lineHeight: "1.25", letterSpacing: "0.29px" }],
        body: ["16px", { lineHeight: "1.5", letterSpacing: "-0.37px" }],
        subheading: ["22px", { lineHeight: "1.2", letterSpacing: "-0.79px" }],
        "heading-sm": ["24px", { lineHeight: "1.2", letterSpacing: "-0.89px" }],
        heading: ["30px", { lineHeight: "1.1", letterSpacing: "-1.2px" }],
        display: ["46px", { lineHeight: "1.05", letterSpacing: "-1.93px" }],
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(84, 79, 77, 0.08)",
        "card-hover": "0 8px 32px 0 rgba(84, 79, 77, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
