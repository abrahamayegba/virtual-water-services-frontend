import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // ensures root-relative paths
  build: {
    outDir: "dist", // output folder is dist (no nested dist)
    emptyOutDir: true, // cleans dist before building
  },
  plugins: [react()],
  assetsInclude: ["**/*.pdf"],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
