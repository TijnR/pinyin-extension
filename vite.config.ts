import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "index.html"),
        contentScript: resolve(__dirname, "src/content/index.ts"),
      },
      output: {
        entryFileNames: (assetInfo) => {
          if (assetInfo.name === "contentScript") {
            return "contentScript.js";
          }
          return "[name].js";
        },
      },
    },
  },
  server: {
    port: 5174,
  },
  define: {
    global: "globalThis",
  },
});
