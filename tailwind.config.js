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
        gray: colors.zinc,
        'brand-orange': {
          50: '#fff0eb',
          100: '#ffc6b3',
          300: '#fcc8b7',
          DEFAULT: '#f58d6b',
          400: '#f58d6b',
          600: '#ff5406',
          900: '#862d04',
        }
    },
    fontFamily: {
      'sans': ['"Abel"', '"sans-serif"'],
    },
    extend: {
    },
  },
  plugins: [],
}
