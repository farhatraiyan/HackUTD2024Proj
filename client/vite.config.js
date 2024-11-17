import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    root: './src/',
    plugins: [react()],
    build: {
        outDir: '../../server-2.0/dist',
        rollupOptions:{
            input: {
                home: './src/views/home.html', //http://localhost:5173/views/home.html
                create: './src/views/create.html', //http://localhost:5173/views/create.html
                upload: './src/views/upload.html', //http://localhost:5173/views/upload.html
                update: './src/views/update.html', //http://localhost:5173/views/update.html
                media: './src/views/media.html', //http://localhost:5173/views/media.html
                about: './src/views/about.html', //http://localhost:5173/views/about.html
                signin: './src/views/signin.html', //http://localhost:5173/views/signin.html
                user: './src/views/user.html', //http://localhost:5173/views/user.html
                media_image: './src/views/mediaid.html' //http://localhost:5173/views/media/<id>.html
            }
        }
    }
})
