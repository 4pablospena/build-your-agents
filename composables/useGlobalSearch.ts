// Global search index: blog posts + changelog (from @nuxt/content).

import type { BlogPost } from './useBlogPosts'
import { blogSlugFromPath } from './useBlogPosts'
import {
  changelogSlugFromPath,
  type ChangelogEntry
} from './useChangelog'
import { toolsNav } from './useToolsNav'

export type SearchResultKind = 'blog' | 'changelog' | 'tool'

export type SearchResult = {
  id: string
  kind: SearchResultKind
  title: string
  excerpt: string
  to: string
  score: number
}

type SearchIndex = {
  items: SearchResult[]
}

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length >= 2)
}

function scoreText(haystack: string, tokens: string[]): number {
  const hay = haystack.toLowerCase()
  let score = 0
  for (const t of tokens) {
    if (hay.includes(t)) score += t.length >= 4 ? 3 : 2
  }
  return score
}

async function buildSearchIndex(): Promise<SearchIndex> {
  const items: SearchResult[] = []

  const posts = (await useBlogPostListQuery()
    .only(['_path', 'title', 'description', 'tags'])
    .find()) as BlogPost[]

  for (const post of posts) {
    if (!post._path || !post.title) continue
    items.push({
      id: `blog:${post._path}`,
      kind: 'blog',
      title: post.title,
      excerpt: post.description || (post.tags?.join(', ') ?? 'Blog post'),
      to: `/blog/${blogSlugFromPath(post._path)}`,
      score: 0
    })
  }

  const changelog = (await useChangelogListQuery()
    .only(['_path', 'title', 'reason', 'file', 'date'])
    .find()) as ChangelogEntry[]

  for (const entry of changelog) {
    if (!entry._path) continue
    const title =
      entry.title || `${entry.file.toUpperCase()} · ${entry.date}`
    items.push({
      id: `changelog:${entry._path}`,
      kind: 'changelog',
      title,
      excerpt: entry.reason,
      to: `/changelog#${changelogSlugFromPath(entry._path)}`,
      score: 0
    })
  }

  for (const tool of toolsNav) {
    items.push({
      id: `tool:${tool.id}`,
      kind: 'tool',
      title: tool.title,
      excerpt: tool.description,
      to: tool.path,
      score: 0
    })
  }

  items.push({
    id: 'tool:hub',
    kind: 'tool',
    title: 'Tools hub',
    excerpt: 'Markdown validator, Cursor rules export, global search',
    to: '/tools',
    score: 0
  })

  return { items }
}

export function useGlobalSearch() {
  const { data: index, pending } = useAsyncData(
    'global-search-index',
    buildSearchIndex
  )

  function search(query: string, limit = 12): SearchResult[] {
    const q = query.trim()
    if (q.length < 2 || !index.value) return []

    const tokens = tokenize(q)
    if (!tokens.length) return []

    return index.value.items
      .map((item) => {
        const blob = `${item.title} ${item.excerpt} ${item.to}`
        const score = scoreText(blob, tokens)
        return { ...item, score }
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  return { index, pending, search }
}
