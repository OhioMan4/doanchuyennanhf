import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig(({mode})=>{

  const env = loadEnv(mode, process.cwd(), '');

  return {
  base:'/',
  plugins: [react(),tailwindcss(),],
  define: {
    __APP_ENV__: env.APP_ENV,
  },
  server:{
    host: '0.0.0.0',
    port: 2999,
    strictPort:true,
  },
  build: {
    outDir: 'dist',
  },
}
}) 
