/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'slate-900': '#0f172a',
        'cyan-500': '#06b6d4',
        'cyan-400': '#22d3ee',
      },
    },
  },
  plugins: [],
};