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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

