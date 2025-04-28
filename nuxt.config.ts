// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  i18n: {
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        file: 'en.yaml'
      }
    ]
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Tikkit',
      short_name: 'Tikkit',
      description: 'An app to count scores in Mölkky games',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-icons/icon-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa-icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'pwa-icons/maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ],
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff'
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
