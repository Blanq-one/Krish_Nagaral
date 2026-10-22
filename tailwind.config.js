import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#121212',
          dark: '#1a1a1a',
          grey: '#181818',
          green: '#1db954',
          'green-hover': '#1ed760',
        },
        // Slightly brighter grays for better contrast on the dark theme
        gray: {
          300: 'rgb(220 220 220 / <alpha-value>)',
          400: 'rgb(170 170 170 / <alpha-value>)',
          500: 'rgb(150 150 150 / <alpha-value>)',
        },
        // Design v2 tokens. green, blue and cyan keep Tailwind's numbered
        // scales and add the token as DEFAULT (e.g. text-green, bg-green-hi).
        bg: '#09090a',
        surface: {
          DEFAULT: '#121214',
          2: '#18181b',
        },
        text: {
          DEFAULT: '#f5f5f7',
          2: '#a1a1a6',
          3: '#8a8a90',
        },
        green: {
          ...colors.green,
          DEFAULT: '#1db954',
          hi: '#1ed760',
        },
        blue: {
          ...colors.blue,
          DEFAULT: '#4da3ff',
        },
        cyan: {
          ...colors.cyan,
          DEFAULT: '#64d2ff',
        },
      },
      // Prefixed with "ui-" so Tailwind's own rounded-sm/md/lg/xl stay unchanged
      borderRadius: {
        'ui-xs': '10px',
        'ui-sm': '14px',
        'ui-md': '18px',
        'ui-lg': '24px',
        'ui-xl': '32px',
      },
      // Tight bento grid gap, e.g. gap-grid
      spacing: {
        grid: '6px',
      },
      fontFamily: {
        sans: [
          'Figtree',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
