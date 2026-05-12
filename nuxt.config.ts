// https://nuxt.com/docs/api/configuration/nuxt-config
const description =
  'A seven-file architecture for designing personal AI agents. Soul, Identity, Agents, User, Memory, Heartbeat, Tools. Open documentation.'
const title = 'Build your own agents — A framework for modular AI agents'
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
const ogImage = siteUrl ? `${siteUrl}/og.svg` : '/og.svg'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-01',
  devtools: { enabled: true },
  ssr: true,

  // Avoid Vite 7 pre-transform trying to resolve `#app-manifest` on cold dev
  // (see nuxt/nuxt#33606). This site does not rely on experimental app manifest.
  experimental: {
    appManifest: false
  },

  vite: {
    optimizeDeps: {
      exclude: ['#app-manifest']
    }
  },

  app: {
    head: {
      title,
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: ogImage },
        { property: 'og:locale', content: 'en_US' },
        ...(siteUrl
          ? ([{ property: 'og:url', content: siteUrl }] as const)
          : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false
  }
})
