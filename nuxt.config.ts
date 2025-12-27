import { createResolver } from "@nuxt/kit"

const r = createResolver(import.meta.url)
export default defineNuxtConfig({
  ssr: true,
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/tailwind.css"],
  experimental: { appManifest: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ["@prisma/client", "prisma"], // ✅ не трогать Prisma в dev optimize
    },
    ssr: {
      external: ["@prisma/client", "prisma"], // ✅ SSR тоже пусть не лезет внутрь
    },
  },
  nitro: {
    externals: {
      external: ["@prisma/client", "prisma"],
    },
  },
})
