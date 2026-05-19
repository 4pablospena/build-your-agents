// Case studies are blog posts tagged `case-study`. Listing and ordering stay
// aligned with useBlogPostListQuery(); file metadata comes from useAgentFiles().

import type { AgentFile } from './useAgentFiles.types'
import type { AgentFileId } from './useAgentFiles.types'
import type { BlogPost } from './useBlogPosts'

export const CASE_STUDY_TAG = 'case-study'

/** Same draft rules as the blog index, filtered to case-study tag. */
export function useCaseStudyListQuery() {
  return useBlogPostListQuery().where({ tags: { $contains: CASE_STUDY_TAG } })
}

export function isCaseStudy(post: Pick<BlogPost, 'tags'>): boolean {
  return Array.isArray(post.tags) && post.tags.includes(CASE_STUDY_TAG)
}

/** Sort `filesTouched` in canonical spec order (useAgentFiles.files). */
export function orderedFilesTouched(
  ids: AgentFileId[] | undefined,
  files: AgentFile[],
  byId: (id: string) => AgentFile | undefined
): AgentFile[] {
  if (!ids?.length) return []
  const order = files.map((f) => f.id)
  return [...ids]
    .filter((id) => byId(id))
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .map((id) => byId(id)!)
}
