import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Optional
  },
  build: {
    outDir: "dist",
  },
  base: "./", // Ensure relative paths work
});
