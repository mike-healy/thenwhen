/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#fff',
        black: '#000',
        blue: colors.blue,
        red: colors.rose,

        slate: colors.slate,
        'brand-orange': {
          50: '#fff0eb',
          300: '#fcc8b7',
          DEFAULT: '#f58d6b',
          400: '#f58d6b',
          600: '#ff5406',
          900: '#862d04',
        }
    },
    fontFamily: {
      'sans': ['"Aleo"', '"sans-serif"'],
    },
    extend: {
    },
  },
  plugins: [],
}
