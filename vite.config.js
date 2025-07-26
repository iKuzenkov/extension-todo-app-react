import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content.jsx"),
      },
      output: {
        entryFileNames: "js/[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "css/[name][extname]";
          }
          if (
            assetInfo.name &&
            /\.(png|jpe?g|svg|gif|webp|avif|ico)$/i.test(assetInfo.name)
          ) {
            return "images/[name][extname]";
          }
          return "[name][extname]";
        },
      },
    },
  },
});
