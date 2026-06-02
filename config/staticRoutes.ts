/** Public routes prerendered at build and listed in /sitemap.xml. */

export const STATIC_PUBLIC_ROUTES = [
  '/',
  '/configure',
  '/docs',
  '/blog'
] as const

export type StaticPublicRoute = (typeof STATIC_PUBLIC_ROUTES)[number]
