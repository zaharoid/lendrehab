import { createResolver } from "@nuxt/kit"

const r = createResolver(import.meta.url)
export default defineNuxtConfig({
  ssr: true,
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/tailwind.css", "swagger-ui-dist/swagger-ui.css"],
  experimental: { appManifest: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ["@prisma/client", "prisma"],
    },
    ssr: {
      external: ["@prisma/client", "prisma"],
    },
  },
  nitro: {
    externals: {
      external: ["@prisma/client", "prisma"],
    },
  },
})
