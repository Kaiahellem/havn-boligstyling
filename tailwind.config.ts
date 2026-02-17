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
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
