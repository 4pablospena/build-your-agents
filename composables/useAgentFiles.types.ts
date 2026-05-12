export type AgentFile = {
  id: string
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
  fileIds: string[]
}
