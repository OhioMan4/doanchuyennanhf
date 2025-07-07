import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig(({mode})=>{

  const env = loadEnv(mode, process.cwd(), '');

  return {
  plugins: [react(),tailwindcss(),],
  define: {
    __APP_ENV__: env.APP_ENV,
  },
  server:{
    host: '0.0.0.0',
    port: 2999,
    strictPort:true,
    proxy: {
      '/api': {
        target: env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
}
}) 
