import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, "src/contentScript/index.ts"),
      },
      output: {
        entryFileNames: () => "contentScript.js",
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
      treeshake: true,
    },
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    emptyOutDir: false,
    copyPublicDir: false,
  },
  define: {
    global: "globalThis",
  },
});
