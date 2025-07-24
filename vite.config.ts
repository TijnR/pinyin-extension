import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
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
});
