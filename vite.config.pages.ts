import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Config dedicata alla build statica pubblicata su GitHub Pages.
// vite.config.ts (TanStack Start + nitro) resta la config dell'app completa:
// Pages serve solo file statici, quindi qui niente SSR e niente server functions.
// PAGES_BASE permette di ripubblicare sotto un path diverso (o "/" per un dominio custom).
export default defineConfig({
  base: process.env.PAGES_BASE ?? "/sonoross-copia/",
  plugins: [tsConfigPaths({ projects: ["./tsconfig.json"] }), react(), tailwindcss()],
  build: {
    outDir: "dist-pages",
    emptyOutDir: true,
  },
});
