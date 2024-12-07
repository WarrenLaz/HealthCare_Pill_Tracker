/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{html,jsx,tsx}",
    "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
    "./node_modules/@rewind-ui/core/dist/theme/styles/Button.styles.js",
    "./node_modules/@rewind-ui/core/dist/theme/styles/Text.styles.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#407BFF",
        secondary: "#E6F0F9",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },

      components: {},
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
