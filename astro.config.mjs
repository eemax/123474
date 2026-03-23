// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://123474.xyz",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ["/pagefind/pagefind.js"],
      },
    },
  },
  integrations: [
    expressiveCode({
      themes: ["github-dark", "github-light"],
      useDarkModeMediaQuery: false,
    }),
    mdx(),
    svelte(),
  ],
});
