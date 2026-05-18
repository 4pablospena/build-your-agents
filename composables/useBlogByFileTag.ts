// Blog ↔ docs cross-links: posts tagged with an agent file id (e.g. tag: memory).

import type { AgentFileId, BlogPost } from './useBlogPosts'

export const AGENT_FILE_TAG_IDS: AgentFileId[] = [
  'soul',
  'identity',
  'agents',
  'user',
  'tools',
  'memory',
  'heartbeat'
]

export type PostsByFileTagMap = Record<AgentFileId, BlogPost[]>

function emptyMap(): PostsByFileTagMap {
  return Object.fromEntries(
    AGENT_FILE_TAG_IDS.map((id) => [id, [] as BlogPost[]])
  ) as PostsByFileTagMap
}

/** Group published posts by `tags` containing each `AgentFileId`. */
export async function fetchPostsGroupedByFileTag(): Promise<PostsByFileTagMap> {
  const posts = (await useBlogPostListQuery()
    .only(['_path', 'title', 'description', 'date', 'tags'])
    .find()) as BlogPost[]

  const map = emptyMap()
  for (const post of posts) {
    const tags = post.tags ?? []
    for (const fileId of AGENT_FILE_TAG_IDS) {
      if (tags.includes(fileId)) {
        map[fileId].push(post)
      }
    }
  }
  return map
}

export function usePostsGroupedByFileTag() {
  const { data, pending, error } = useAsyncData(
    'blog-posts-by-file-tag',
    fetchPostsGroupedByFileTag
  )

  function postsForFile(fileId: AgentFileId): BlogPost[] {
    return data.value?.[fileId] ?? []
  }

  return { data, pending, error, postsForFile }
}
