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
                home: './src/views/home.html', //http://localhost:5173/views/home.html
                create: './src/views/create.html', //http://localhost:5173/views/create.html
                upload: './src/views/upload.html', //http://localhost:5173/views/upload.html
                media: './src/views/media.html', //http://localhost:5173/views/media.html
                status: './src/views/status.html', //http://localhost:5173/views/status.html
                about: './src/views/about.html', //http://localhost:5173/views/about.html
                chatbot: './src/views/chatbot.html',  //http://localhost:5173/views/chatbot.html
                signin: './src/views/signin.html', //http://localhost:5173/views/signin.html
                user: './src/views/user.html' //http://localhost:5173/views/user.html
            }
        }
    }
})
