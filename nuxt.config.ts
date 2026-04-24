import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // Runtime configuration for API base URL
  runtimeConfig: {
    public: {
      apiBase: 'https://www.themealdb.com/api/json/v1/1'
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  }
})
