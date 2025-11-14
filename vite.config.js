import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // For development, set base to "/" to serve public files correctly
  // For production/GitHub Pages, change this to "/portfolio/" or your repo name
  base: process.env.NODE_ENV === 'production' ? "/portfolio/" : "/",
  plugins: [react()],
})

