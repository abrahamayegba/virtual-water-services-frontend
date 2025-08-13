import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.pdf"],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
