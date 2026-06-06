import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4090,
  },
  preview: {
    host: '0.0.0.0',
    port: 4090,
    allowedHosts: ['edustruct.saikeno.space'], // ✅ tambahkan host custom di sini
  },
})
