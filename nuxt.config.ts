// https://nuxt.com/docs/api/configuration/nuxt-config
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

function isDraftPostFile(absPath: string): boolean {
  try {
    const s = readFileSync(absPath, 'utf8')
    const m = s.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!m?.[1]) return false
    return /^draft:\s*true\s*$/m.test(m[1])
  } catch {
    return false
  }
}

function blogPrerenderRoutes(): string[] {
  // /rss.xml is intentionally NOT prerendered: it needs the live request
  // origin (or NUXT_PUBLIC_SITE_URL at runtime) to emit canonical URLs.
  // Vercel CDN caches the dynamic response via the `s-maxage` header set
  // inside server/routes/rss.xml.ts.
  const routes = [
    '/blog',
    '/examples',
    '/changelog',
    '/openclaw',
    '/tools',
    '/tools/validate',
    '/tools/cursor-rules',
    '/tools/search'
  ]
  try {
    const dir = join(process.cwd(), 'content', 'posts')
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.md')) continue
      const abs = join(dir, f)
      if (isDraftPostFile(abs)) continue
      // Match @nuxt/content _path keys (filesystem names normalized to lowercase).
      routes.push(`/blog/${f.slice(0, -3).toLowerCase()}`)
    }
  } catch {
    /* content/posts missing */
  }
  return routes
}

const description =
  'A seven-file architecture for designing personal AI agents. Soul, Identity, Agents, User, Memory, Heartbeat, Tools. Open documentation.'
const title = 'Build your own agents — A framework for modular AI agents'
const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
const ogImage = siteUrl ? `${siteUrl}/og.png` : '/og.png'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || ''
    }
  },

  compatibilityDate: '2025-05-01',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  ssr: true,

  modules: ['@nuxt/content', '@nuxtjs/tailwindcss'],

  content: {
    documentDriven: false
  },

  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },

  hooks: {
    'nitro:config'(nitroConfig) {
      const routes = blogPrerenderRoutes()
      nitroConfig.prerender = nitroConfig.prerender || {}
      const cur = nitroConfig.prerender.routes
      nitroConfig.prerender.routes = Array.isArray(cur)
        ? [...new Set([...cur, ...routes])]
        : routes
    }
  },

  // Explicit preset so CI/Vercel always emit the serverless bundle Nitro expects
  nitro: {
    preset: 'vercel'
  },

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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'build/your/agents — Blog',
          href: '/rss.xml'
        },
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
