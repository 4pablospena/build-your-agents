/** Agent file ids that match `useAgentFiles().files[].id`. */
export type AgentFileId =
  | 'soul'
  | 'identity'
  | 'agents'
  | 'user'
  | 'tools'
  | 'memory'
  | 'heartbeat'

export type AgentFile = {
  id: AgentFileId
  filename: string
  tagline: string
  role: string
  color: 'hot' | 'sky' | 'lemon' | 'pink' | 'acid' | 'grape' | 'ink'
  symbol: string
  tier: 1 | 2 | 3 | 4
  reads: string[]
  sections: string[]
  excerpt: string
  markdownContent: string
}

export type AgentTier = {
  number: 1 | 2 | 3 | 4
  label: string
  sublabel: string
  fileIds: AgentFileId[]
}
