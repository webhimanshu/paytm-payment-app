import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  server: {
    proxy: {
      "/api/v1": {
        target: "'https://paytm-payment-app-api.vercel.app",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api/v1", ""),
      },
    },
  },
  build: {
    proxy: {
      "/api/v1": {
        target: "'https://paytm-payment-app-api.vercel.app", 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace("/api/v1", ""),
      }
    }
  }
})


// server: {
//   proxy: {
//     '/api/v1': {
//       target: 'https://paytm-payment-app-api.vercel.app',
//       changeOrigin: true,
//       configure: (proxy, options) => {
//         // proxy will be an instance of 'http-proxy'
//       },
//     },
//   },
  
// },