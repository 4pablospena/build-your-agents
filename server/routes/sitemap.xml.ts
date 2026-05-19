// Sitemap for static routes + published blog posts.

import { serverQueryContent } from '#content/server'
import { STATIC_PUBLIC_ROUTES } from '../../config/staticRoutes'
import { blogSlugFromPath } from '~/composables/useBlogPosts'

type FeedPost = {
  _path?: string
  date?: string
  draft?: boolean
}

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function w3cDate(date: string | undefined): string {
  const d = date ? new Date(date) : new Date()
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10)
  return d.toISOString().slice(0, 10)
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const configOrigin = (config.public.siteUrl as string | undefined) || ''
  const origin = (configOrigin || (() => {
    const url = getRequestURL(event)
    return `${url.protocol}//${url.host}`
  })()).replace(/\/$/, '')

  const today = new Date().toISOString().slice(0, 10)

  const all = (await serverQueryContent(event, 'posts').sort({ date: -1 }).find()) as FeedPost[]
  const posts = import.meta.dev ? all : all.filter((p) => p.draft !== true)

  const staticEntries = STATIC_PUBLIC_ROUTES.map(
    (path) => `  <url>
    <loc>${xmlEscape(`${origin}${path}`)}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )

  const postEntries = posts
    .map((post) => {
      const slug = post._path ? blogSlugFromPath(post._path) : ''
      if (!slug) return ''
      const loc = `${origin}/blog/${slug}`
      return `  <url>
    <loc>${xmlEscape(loc)}</loc>
    <lastmod>${w3cDate(post.date)}</lastmod>
  </url>`
    })
    .filter(Boolean)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...postEntries].join('\n')}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=600, s-maxage=600')
  return xml
})
