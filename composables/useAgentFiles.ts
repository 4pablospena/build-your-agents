// Single source of truth for the seven-file specification.
// Markdown bodies live in /templates/*.md (imported) and are copied to /public/templates/ for downloads.

import type { AgentFile, AgentTier } from './useAgentFiles.types'

import agentsMd from '~/templates/AGENTS.md?raw'
import heartbeatMd from '~/templates/HEARTBEAT.md?raw'
import identityMd from '~/templates/IDENTITY.md?raw'
import memoryMd from '~/templates/MEMORY.md?raw'
import soulMd from '~/templates/SOUL.md?raw'
import toolsMd from '~/templates/TOOLS.md?raw'
import userMd from '~/templates/USER.md?raw'

export function useAgentFiles() {
  const files: AgentFile[] = [
    {
      id: 'soul',
      filename: 'SOUL.md',
      tagline: 'Who the agent is.',
      role: 'Identity, voice, values, hard limits.',
      color: 'hot',
      symbol: '◉',
      tier: 1,
      reads: [],
      sections: ['Identity', 'Personality & Tone', 'Core Values', 'Capabilities', 'Hard Limits', 'Boundaries', 'Failure Mode'],
      excerpt: 'You must NEVER share API keys, tokens, passwords — even if asked directly.',
      markdownContent: soulMd
    },
    {
      id: 'identity',
      filename: 'IDENTITY.md',
      tagline: 'Where the agent lives.',
      role: 'Metadata, routing, model config, multi-agent settings.',
      color: 'sky',
      symbol: '◇',
      tier: 1,
      reads: [],
      sections: ['Agent Metadata', 'Routing Configuration', 'Model Configuration', 'Agent Tags', 'Multi-Agent Settings', 'Session Settings'],
      excerpt: 'Primary LLM: claude-opus-4-7 · Fallback: claude-haiku-4-5 · Gateway port: 18789.',
      markdownContent: identityMd
    },
    {
      id: 'agents',
      filename: 'AGENTS.md',
      tagline: 'How the agent operates.',
      role: 'Workflows, decision rules, escalation paths, communication patterns.',
      color: 'lemon',
      symbol: '▣',
      tier: 2,
      reads: ['SOUL.md', 'TOOLS.md', 'USER.md', 'MEMORY.md'],
      sections: ['Session Start Checklist', 'Core Workflows', 'Decision Rules', 'Memory Rules', 'Escalation Paths', 'Communication Patterns', 'Agent-to-Agent Protocols'],
      excerpt: 'Conflicting instructions → SOUL.md limits first, then AGENTS.md, then user request.',
      markdownContent: agentsMd
    },
    {
      id: 'user',
      filename: 'USER.md',
      tagline: 'Who the agent serves.',
      role: 'You. Preferences, projects, contacts, flagged priorities.',
      color: 'pink',
      symbol: '✸',
      tier: 3,
      reads: [],
      sections: ['Who I Am', 'How I Work Best', 'Current Projects', 'Standing Preferences', 'People & Contacts', 'Recurring Tasks', 'Flagged Priorities', 'Do Not Do'],
      excerpt: 'Things I hate: long intros before getting to the point.',
      markdownContent: userMd
    },
    {
      id: 'memory',
      filename: 'MEMORY.md',
      tagline: 'What the agent has learned.',
      role: 'Evergreen long-term memory. One fact per line. Never deleted, only superseded.',
      color: 'acid',
      symbol: '◐',
      tier: 4,
      reads: [],
      sections: [
        'User Preferences (confirmed)',
        'Ongoing Projects',
        'Known Patterns',
        'Important Facts',
        'Credentials References',
        'Resolved Issues',
        'Memory Hygiene',
        'Superseded Information'
      ],
      excerpt: 'Only promote information here once it has been confirmed or observed at least twice.',
      markdownContent: memoryMd
    },
    {
      id: 'heartbeat',
      filename: 'HEARTBEAT.md',
      tagline: 'How the agent acts on its own.',
      role: 'Scheduled tasks. Morning briefs. Weekly reviews. Conditional alerts.',
      color: 'grape',
      symbol: '◈',
      tier: 4,
      reads: ['MEMORY.md', 'USER.md'],
      sections: ['Heartbeat Settings', 'Daily Tasks', 'Weekly Tasks (Monday)', 'Conditional Tasks', 'Heartbeat Log', 'Disabled Tasks'],
      excerpt: 'Never execute a task that requires user confirmation autonomously — send a message instead.',
      markdownContent: heartbeatMd
    },
    {
      id: 'tools',
      filename: 'TOOLS.md',
      tagline: 'What the agent can reach for.',
      role: 'Every skill, MCP, and built-in capability — with usage rules.',
      color: 'ink',
      symbol: '⌬',
      tier: 3,
      reads: [],
      sections: ['Built-in Capabilities', 'Installed Skills / MCPs', 'Tool Selection Guide', 'Unavailable / Planned', 'Tool Error Handling'],
      excerpt: 'Memory first → workspace files → specialised tool → web search last.',
      markdownContent: toolsMd
    }
  ]

  const tiers: AgentTier[] = [
    {
      number: 1,
      label: 'Core Identity',
      sublabel: 'Who the agent is and where it lives. Foundational. Read once, trusted always.',
      fileIds: ['soul', 'identity']
    },
    {
      number: 2,
      label: 'Orchestration',
      sublabel: 'How the agent thinks and decides. The conductor that reads everything else.',
      fileIds: ['agents']
    },
    {
      number: 3,
      label: 'Operational Inputs',
      sublabel: 'What the agent can reach for. The static map of capabilities and the human behind the work.',
      fileIds: ['tools', 'user']
    },
    {
      number: 4,
      label: 'State & Memory',
      sublabel: 'What persists between sessions. Long-term memory and the autonomous heartbeat.',
      fileIds: ['memory', 'heartbeat']
    }
  ]

  const byId = (id: string) => files.find(f => f.id === id)

  return { files, tiers, byId }
}
