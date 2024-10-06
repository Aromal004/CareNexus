import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/dist/',
//   build: {
//     outDir: '../backend/CareNexus/dist',
//     emptyOutDir: true,
//   },
// })
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/dist/' : '/',  // Use '/dist/' for production, '/' for development
  build: {
    outDir: '../backend/CareNexus/dist',
    emptyOutDir: true,
  },
}));
