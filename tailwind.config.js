/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        'slate-900': '#0f172a',
        'cyan-500': '#06b6d4',
        'cyan-400': '#22d3ee',
        'primary': '#a6b697',
        'background-light': '#f7f7f7',
        'background-dark': '#191b17',
        'deep-teal': '#2c4a44',
        'soft-brown': '#8c7e6d',
        'muted-grey': '#e5e7eb',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};