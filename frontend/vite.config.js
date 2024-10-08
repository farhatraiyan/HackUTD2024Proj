import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    root: './src/',
    plugins: [react()],
    build: {
        rollupOptions:{
            input: {
                main: './src/index.html',
                create: './src/create/index.html',
                status: './src/status/index.html',
                about: './src/about/index.html'
            }
        }
    }
})
