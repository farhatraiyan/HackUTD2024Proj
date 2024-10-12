import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    root: './src/',
    plugins: [react()],
    build: {
        outDir: '../../server/dist',
        rollupOptions:{
            input: {
                home: './src/views/home.html',
                create: './src/views/create.html',
                status: './src/views/status.html',
                about: './src/views/about.html',
                chatbot: './src/views/chatbot.html'
            }
        }
    }
})
