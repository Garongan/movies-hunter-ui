import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  envDir: ".",
  base: "/movies-hunter-ui",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
