import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude:['/create/create.jsx'],
  plugins: [react()],
  build: {
    rollupOptions:{
      input:
      {
        main: resolve(__dirname, 'index.html'),
        create: resolve(__dirname, 'create', 'create/index.html'),
        status: resolve(__dirname, 'status', 'status/index.html'),
        about: resolve(__dirname, 'about', 'about/index.html'),
      }
    }
  }
})
