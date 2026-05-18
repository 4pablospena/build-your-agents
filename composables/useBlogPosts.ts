export const BLOG_PAGE_SIZE = 6

/** Agent file ids that match `useAgentFiles().files[].id`. */
export type AgentFileId =
  | 'soul'
  | 'identity'
  | 'agents'
  | 'user'
  | 'tools'
  | 'memory'
  | 'heartbeat'

export type BlogPost = {
  _path?: string
  _id?: string
  title?: string
  description?: string
  date?: string
  tags?: string[]
  cover?: string
  draft?: boolean
  body?: unknown
  /** Optional byline for post detail (e.g. full name). */
  author?: string
  /** Short first-person note shown above the article body. */
  authorIntro?: string
  /** Case-study posts: which spec files were materially changed (see useAgentFiles). */
  filesTouched?: AgentFileId[]
}

/** Base query: all posts under content/posts, newest first; hides drafts outside dev. */
export function useBlogPostListQuery() {
  let q = queryContent('posts').sort({ date: -1 })
  if (!import.meta.dev) {
    q = q.where({ draft: { $ne: true } })
  }
  return q
}

function walkBody(node: unknown): string {
  if (node == null) return ''
  if (typeof node === 'string') return `${node} `
  if (typeof node !== 'object') return ''
  const o = node as { type?: string; value?: string; children?: unknown[] }
  if (typeof o.value === 'string' && o.value) return `${o.value} `
  if (Array.isArray(o.children)) return o.children.map(walkBody).join('')
  return ''
}

export function estimateReadingMinutesFromBody(body: unknown): number {
  const text = walkBody(body)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function estimateReadingMinutesFromPost(post: BlogPost): number {
  if (post.body) return estimateReadingMinutesFromBody(post.body)
  const fallback = [post.title, post.description].filter(Boolean).join(' ')
  const words = String(fallback).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function blogSlugFromPath(path: string): string {
  return path.replace(/^\/posts\//, '').replace(/\/$/, '')
}

/** Chronological order (oldest first) for prev/next navigation. */
export async function fetchPostsChronological(): Promise<BlogPost[]> {
  const list = (await useBlogPostListQuery().only(['_path', 'title', 'date', 'draft']).find()) as BlogPost[]
  return [...list].sort((a, b) => String(a.date).localeCompare(String(b.date)))
}

export function adjacentFromChronological(
  ordered: Pick<BlogPost, '_path' | 'title'>[],
  currentPath: string
) {
  const i = ordered.findIndex((p) => p._path === currentPath)
  if (i < 0) return { prev: null as Pick<BlogPost, '_path' | 'title'> | null, next: null }
  return {
    prev: i > 0 ? ordered[i - 1]! : null,
    next: i < ordered.length - 1 ? ordered[i + 1]! : null
  }
}
