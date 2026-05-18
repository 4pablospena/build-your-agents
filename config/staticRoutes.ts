/** Public routes prerendered at build and listed in /sitemap.xml. */

export const STATIC_PUBLIC_ROUTES = [
  '/',
  '/start',
  '/help',
  '/docs',
  '/examples',
  '/openclaw',
  '/changelog',
  '/tools',
  '/tools/validate',
  '/tools/cursor-rules',
  '/tools/search',
  '/blog'
] as const

export type StaticPublicRoute = (typeof STATIC_PUBLIC_ROUTES)[number]
