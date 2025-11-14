import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // For development, set base to "/" to serve public files correctly
  // For production/GitHub Pages, use your repo name
  base: process.env.NODE_ENV === 'production' ? "/Krish_Nagaral/" : "/",
  plugins: [react()],
})

