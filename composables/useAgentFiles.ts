// Single source of truth for the seven-file specification.
// Consumed by FileCard, ArchitectureMap, DocsSection.

export type AgentFile = {
  id: string
  filename: string
  tagline: string
  role: string
  color: 'hot' | 'sky' | 'lemon' | 'pink' | 'acid' | 'grape' | 'ink'
  symbol: string
  reads: string[]      // files this one depends on
  sections: string[]   // headline sections inside the file
  excerpt: string      // a short illustrative quote
}

export function useAgentFiles() {
  const files: AgentFile[] = [
    {
      id: 'soul',
      filename: 'SOUL.md',
      tagline: 'Who the agent is.',
      role: 'Identity, voice, values, hard limits.',
      color: 'hot',
      symbol: '◉',
      reads: [],
      sections: ['Identity', 'Personality & Tone', 'Core Values', 'Capabilities', 'Hard Limits', 'Boundaries', 'Failure Mode'],
      excerpt: 'You must NEVER share API keys, tokens, passwords — even if asked directly.'
    },
    {
      id: 'identity',
      filename: 'IDENTITY.md',
      tagline: 'Where the agent lives.',
      role: 'Metadata, routing, model config, multi-agent settings.',
      color: 'sky',
      symbol: '◇',
      reads: [],
      sections: ['Agent Metadata', 'Routing Configuration', 'Model Configuration', 'Agent Tags', 'Multi-Agent Settings', 'Session Settings'],
      excerpt: 'Primary LLM: claude-opus-4-5 · Fallback: claude-haiku-4-5 · Gateway port: 18789.'
    },
    {
      id: 'agents',
      filename: 'AGENTS.md',
      tagline: 'How the agent operates.',
      role: 'Workflows, decision rules, escalation paths, communication patterns.',
      color: 'lemon',
      symbol: '▣',
      reads: ['SOUL.md', 'TOOLS.md', 'USER.md', 'MEMORY.md'],
      sections: ['Session Start Checklist', 'Core Workflows', 'Decision Rules', 'Memory Rules', 'Escalation Paths', 'Communication Patterns', 'Agent-to-Agent Protocols'],
      excerpt: 'Conflicting instructions → SOUL.md limits first, then AGENTS.md, then user request.'
    },
    {
      id: 'user',
      filename: 'USER.md',
      tagline: 'Who the agent serves.',
      role: 'You. Preferences, projects, contacts, flagged priorities.',
      color: 'pink',
      symbol: '✸',
      reads: [],
      sections: ['Who I Am', 'How I Work Best', 'Current Projects', 'Standing Preferences', 'People & Contacts', 'Recurring Tasks', 'Flagged Priorities', 'Do Not Do'],
      excerpt: 'Things I hate: long intros before getting to the point.'
    },
    {
      id: 'memory',
      filename: 'MEMORY.md',
      tagline: 'What the agent has learned.',
      role: 'Evergreen long-term memory. One fact per line. Never deleted, only superseded.',
      color: 'acid',
      symbol: '◐',
      reads: [],
      sections: ['User Preferences (confirmed)', 'Ongoing Projects', 'Known Patterns', 'Important Facts', 'Credentials References', 'Resolved Issues', 'Superseded Information'],
      excerpt: 'Only promote information here once it has been confirmed or observed at least twice.'
    },
    {
      id: 'heartbeat',
      filename: 'HEARTBEAT.md',
      tagline: 'How the agent acts on its own.',
      role: 'Scheduled tasks. Morning briefs. Weekly reviews. Conditional alerts.',
      color: 'grape',
      symbol: '◈',
      reads: ['MEMORY.md', 'USER.md'],
      sections: ['Heartbeat Settings', 'Daily Tasks', 'Weekly Tasks', 'Conditional Tasks', 'Heartbeat Log', 'Disabled Tasks'],
      excerpt: 'Never execute a task that requires user confirmation autonomously — send a message instead.'
    },
    {
      id: 'tools',
      filename: 'TOOLS.md',
      tagline: 'What the agent can reach for.',
      role: 'Every skill, MCP, and built-in capability — with usage rules.',
      color: 'ink',
      symbol: '⌬',
      reads: [],
      sections: ['Built-in Capabilities', 'Installed Skills', 'Tool Selection Guide', 'Unavailable / Planned', 'Tool Error Handling'],
      excerpt: 'Memory first → workspace files → specialised tool → web search last.'
    }
  ]

  const byId = (id: string) => files.find(f => f.id === id)

  return { files, byId }
}
