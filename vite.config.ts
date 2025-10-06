import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/", // ensures root-relative paths
  build: {
    outDir: "dist",
    emptyOutDir: true, // cleans dist before building
  },
  plugins: [react()],
  assetsInclude: ["**/*.pdf"],
  define: { global: "globalThis" },
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
