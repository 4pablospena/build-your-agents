// RSS 2.0 feed for /blog. Mirrors the client-side filtering of
// useBlogPostListQuery() (composables/useBlogPosts.ts):
//   - source: posts/
//   - sorted: newest first by `date`
//   - draft posts hidden outside dev
// Kept in lock-step manually because Nuxt Content query helpers split into
// client (`queryContent`) and server (`serverQueryContent`) variants.

import { serverQueryContent } from '#content/server'
import { blogSlugFromPath } from '~/composables/useBlogPosts'

type FeedPost = {
  _path?: string
  title?: string
  description?: string
  date?: string
  tags?: string[]
  draft?: boolean
}

const SITE_TITLE = 'build/your/agents — Blog'
const SITE_DESCRIPTION =
  'Notes on designing modular AI agents: memory, rules, tooling, and field lessons from the seven-file spec.'

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Wrap user-authored text so embedded HTML/punctuation never breaks XML. */
function cdata(input: string): string {
  // CDATA cannot contain the sequence "]]>". Split it if it ever appears.
  return `<![CDATA[${input.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

function rfc822(date: string | undefined): string {
  const d = date ? new Date(date) : new Date()
  if (Number.isNaN(d.getTime())) return new Date().toUTCString()
  return d.toUTCString()
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const configOrigin = (config.public.siteUrl as string | undefined) || ''
  // Prefer the runtime-configured site URL so the feed advertises canonical
  // links. Fall back to the live request origin to stay valid on previews and
  // local dev where NUXT_PUBLIC_SITE_URL may be empty.
  const origin = (configOrigin || (() => {
    const url = getRequestURL(event)
    return `${url.protocol}//${url.host}`
  })()).replace(/\/$/, '')

  const feedUrl = `${origin}/rss.xml`
  const blogUrl = `${origin}/blog`

  const all = (await serverQueryContent(event, 'posts').sort({ date: -1 }).find()) as FeedPost[]
  const posts = import.meta.dev ? all : all.filter((p) => p.draft !== true)

  const lastBuildDate = rfc822(posts[0]?.date)

  const items = posts
    .map((post) => {
      const slug = post._path ? blogSlugFromPath(post._path) : ''
      const link = `${origin}/blog/${slug}`
      const title = xmlEscape(String(post.title || 'Untitled'))
      const description = post.description ? cdata(String(post.description)) : ''
      const pubDate = rfc822(post.date)
      const categories = Array.isArray(post.tags)
        ? post.tags.map((t) => `    <category>${xmlEscape(String(t))}</category>`).join('\n')
        : ''

      return [
        '  <item>',
        `    <title>${title}</title>`,
        `    <link>${xmlEscape(link)}</link>`,
        `    <guid isPermaLink="true">${xmlEscape(link)}</guid>`,
        `    <pubDate>${pubDate}</pubDate>`,
        description ? `    <description>${description}</description>` : '',
        categories
      ]
        .filter(Boolean)
        .join('\n')
        .concat('\n  </item>')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${xmlEscape(SITE_TITLE)}</title>
  <link>${xmlEscape(blogUrl)}</link>
  <description>${xmlEscape(SITE_DESCRIPTION)}</description>
  <language>en</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${xmlEscape(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>
`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=600, s-maxage=600')
  return xml
})
