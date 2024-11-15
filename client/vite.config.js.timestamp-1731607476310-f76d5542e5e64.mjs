// vite.config.js
import { defineConfig } from "file:///C:/Users/Sudin/Desktop/HackUTD2024Proj/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Sudin/Desktop/HackUTD2024Proj/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  root: "./src/",
  plugins: [react()],
  build: {
    outDir: "../../server/dist",
    rollupOptions: {
      input: {
        home: "./src/views/home.html",
        //http://localhost:5173/views/home.html
        create: "./src/views/create.html",
        //http://localhost:5173/views/create.html
        status: "./src/views/status.html",
        //http://localhost:5173/views/status.html
        about: "./src/views/about.html",
        //http://localhost:5173/views/about.html
        chatbot: "./src/views/chatbot.html",
        //http://localhost:5173/views/chatbot.html
        signin: "./src/views/signin.html",
        //http://localhost:5173/views/signin.html
        user: "./src/views/user.html"
        //http://localhost:5173/views/user.html
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTdWRpblxcXFxEZXNrdG9wXFxcXEhhY2tVVEQyMDI0UHJvalxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFN1ZGluXFxcXERlc2t0b3BcXFxcSGFja1VURDIwMjRQcm9qXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvU3VkaW4vRGVza3RvcC9IYWNrVVREMjAyNFByb2ovY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHJvb3Q6ICcuL3NyYy8nLFxyXG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXI6ICcuLi8uLi9zZXJ2ZXIvZGlzdCcsXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczp7XHJcbiAgICAgICAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgICAgICAgICBob21lOiAnLi9zcmMvdmlld3MvaG9tZS5odG1sJywgLy9odHRwOi8vbG9jYWxob3N0OjUxNzMvdmlld3MvaG9tZS5odG1sXHJcbiAgICAgICAgICAgICAgICBjcmVhdGU6ICcuL3NyYy92aWV3cy9jcmVhdGUuaHRtbCcsIC8vaHR0cDovL2xvY2FsaG9zdDo1MTczL3ZpZXdzL2NyZWF0ZS5odG1sXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICcuL3NyYy92aWV3cy9zdGF0dXMuaHRtbCcsIC8vaHR0cDovL2xvY2FsaG9zdDo1MTczL3ZpZXdzL3N0YXR1cy5odG1sXHJcbiAgICAgICAgICAgICAgICBhYm91dDogJy4vc3JjL3ZpZXdzL2Fib3V0Lmh0bWwnLCAvL2h0dHA6Ly9sb2NhbGhvc3Q6NTE3My92aWV3cy9hYm91dC5odG1sXHJcbiAgICAgICAgICAgICAgICBjaGF0Ym90OiAnLi9zcmMvdmlld3MvY2hhdGJvdC5odG1sJywgIC8vaHR0cDovL2xvY2FsaG9zdDo1MTczL3ZpZXdzL2NoYXRib3QuaHRtbFxyXG4gICAgICAgICAgICAgICAgc2lnbmluOiAnLi9zcmMvdmlld3Mvc2lnbmluLmh0bWwnLCAvL2h0dHA6Ly9sb2NhbGhvc3Q6NTE3My92aWV3cy9zaWduaW4uaHRtbFxyXG4gICAgICAgICAgICAgICAgdXNlcjogJy4vc3JjL3ZpZXdzL3VzZXIuaHRtbCcgLy9odHRwOi8vbG9jYWxob3N0OjUxNzMvdmlld3MvdXNlci5odG1sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyxvQkFBb0I7QUFDbFcsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLE1BQU07QUFBQSxFQUNOLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixlQUFjO0FBQUEsTUFDVixPQUFPO0FBQUEsUUFDSCxNQUFNO0FBQUE7QUFBQSxRQUNOLFFBQVE7QUFBQTtBQUFBLFFBQ1IsUUFBUTtBQUFBO0FBQUEsUUFDUixPQUFPO0FBQUE7QUFBQSxRQUNQLFNBQVM7QUFBQTtBQUFBLFFBQ1QsUUFBUTtBQUFBO0FBQUEsUUFDUixNQUFNO0FBQUE7QUFBQSxNQUNWO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
