/** Permanent redirects for removed or merged routes (see site restructure). */

export const SITE_REDIRECTS: Record<string, string> = {
  '/start': '/configure',
  '/examples': '/blog?tag=case-study',
  '/tools': '/configure',
  '/tools/validate': '/configure',
  '/tools/cursor-rules': '/configure',
  '/tools/search': '/blog',
  '/changelog': '/docs#changelog',
  '/openclaw': '/docs#ecosystem',
  '/help': '/docs#help'
}
