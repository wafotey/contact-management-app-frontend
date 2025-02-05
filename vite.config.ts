import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,  // This will open the browser automatically when you run `npm run dev`
  },
  build: {
    sourcemap: true,  // Make sure source maps are enabled for debugging
  },
  plugins: [ tailwindcss(),react()],
})
