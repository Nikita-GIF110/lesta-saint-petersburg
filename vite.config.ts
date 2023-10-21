import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: "/src/assets",
      core: "/src/core",
      constants: "/src/constants",
      helpers: "/src/helpers",
      hooks: "/src/hooks",
      modules: "/src/modules",
      repositories: "/src/repositories",
      shared: "/src/shared",
      types: "/src/types/index.ts",
      styles: "/src/styles",
    },
  },
});
