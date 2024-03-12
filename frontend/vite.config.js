import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://paytm-payment-app-api.vercel.app',
        changeOrigin: true,
        // configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
        // },
      },
    },
  },
  plugins: [react()],
})
