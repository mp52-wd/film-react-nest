import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/scss']
      }
    }
  },
  server: {
    proxy: {
      '/content': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
