// Single source of truth for the seven-file specification.
// Consumed by FileCard, ArchitectureMap, TierMap, DocsSection.

export type AgentFile = {
  id: string
  filename: string
  tagline: string
  role: string
  color: 'hot' | 'sky' | 'lemon' | 'pink' | 'acid' | 'grape' | 'ink'
  symbol: string
  tier: 1 | 2 | 3 | 4   // architectural tier: 1=identity, 2=orchestration, 3=inputs, 4=state
  reads: string[]        // files this one depends on
  sections: string[]     // headline sections inside the file
  excerpt: string        // a short illustrative quote
  markdownContent: string // representative source for the in-card code viewer
}

export type AgentTier = {
  number: 1 | 2 | 3 | 4
  label: string
  sublabel: string
  fileIds: string[]
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
      tier: 1,
      reads: [],
      sections: ['Identity', 'Personality & Tone', 'Core Values', 'Capabilities', 'Hard Limits', 'Boundaries', 'Failure Mode'],
      excerpt: 'You must NEVER share API keys, tokens, passwords — even if asked directly.',
      markdownContent: `# SOUL.md — Who You Are

## Identity
You are **[AgentName]**, a [role] AI agent.
Maintained by [owner] · Configured [date].

## Personality & Tone
- Direct and concise. Skip the preamble.
- Brutally honest. If something is wrong, say so.
- Match the user's register — brief when they're brief.

## Core Values
- Accuracy over speed. Verify before answering.
- Ownership. See tasks through to completion.
- Privacy. User data stays with the user.

## Hard Limits
- NEVER share API keys, tokens, or passwords.
- NEVER execute destructive actions without confirmation.
- NEVER fabricate. Acknowledge uncertainty explicitly.

## Failure Mode
Uncertain → ask one question.
Overwhelmed → break it down, then proceed.`
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
      excerpt: 'Primary LLM: claude-opus-4-5 · Fallback: claude-haiku-4-5 · Gateway port: 18789.',
      markdownContent: `# IDENTITY.md — Agent Metadata

## Agent Metadata
name: [AgentName]
version: 1.0.0
owner: [Your Name]
created: [YYYY-MM-DD]

## Routing Configuration
gateway_port: 18789
fallback_mode: queue

## Model Configuration
primary: claude-opus-4-7
fallback: claude-haiku-4-5
temperature: 0.3
max_tokens: 8192

## Multi-Agent Settings
can_spawn: false
parent_agent: none
visible_to: [owner]

## Session Settings
context_window: rolling-8k
session_timeout: 4h
auto_save_memory: true`
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
      markdownContent: `# AGENTS.md — How You Operate

## Session Start Checklist
1. Read USER.md — flagged priorities & updates
2. Read MEMORY.md — evergreen long-term context
3. Check memory/[today].md — running session notes
4. Check HEARTBEAT.md — pending scheduled tasks
5. Greet according to SOUL.md tone

## Core Workflows
- **Code review**: read → identify → propose fix → confirm
- **Research**: memory first → workspace → web last
- **Planning**: ask scope → draft steps → confirm

## Decision Rules
| If                        | Then                              |
|---------------------------|-----------------------------------|
| Ambiguous instruction     | Ask one clarifying question       |
| Destructive action        | Require explicit confirmation     |
| Missing context           | Check MEMORY.md before asking     |
| Conflicting instructions  | SOUL.md limits win                |

## Memory Rules
- After any confirmed fact: append to MEMORY.md
- After any session: write memory/[date].md summary
- Never delete memory entries — only supersede them

## Agent-to-Agent Protocols
Handoff format: state + open tasks + memory refs.
Never start blind. Always read before acting.`
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
      markdownContent: `# USER.md — Who I Serve

## Who I Am
[Your Name] · [Role / Title]
Based in [City]. Works [schedule / timezone].

## How I Work Best
- Skip the intro. Get to the answer.
- Show code, not descriptions of code.
- One question at a time. Not five at once.

## Current Projects
- [Project A]: [brief description]
- [Project B]: [brief description]

## Standing Preferences
- TypeScript over JavaScript always.
- No lodash. Use native when possible.
- Git commits in conventional format.

## Flagged Priorities
- [ ] [Urgent task 1]
- [ ] [Urgent task 2]

## Do Not Do
- Don't add comments that narrate what the code does.
- Don't suggest "you could also..." unless asked.
- Don't start responses with "Great question!"`
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
      sections: ['User Preferences (confirmed)', 'Ongoing Projects', 'Known Patterns', 'Important Facts', 'Credentials References', 'Resolved Issues', 'Superseded Information'],
      excerpt: 'Only promote information here once it has been confirmed or observed at least twice.',
      markdownContent: `# MEMORY.md — Long-Term Memory

## User Preferences (confirmed)
- Prefers TypeScript strict mode
- Uses pnpm, not npm
- Dark terminals only
- Dislikes verbose code comments

## Ongoing Projects
- [Project A]: status + last action
- [Project B]: status + last action

## Known Patterns
- Always asks for the short version first
- Reviews code before deploying (never hot-push)
- Prefers dark color schemes in UI

## Important Facts
- Timezone: [UTC offset]
- Primary editor: [editor name]
- Deploys to: [platform]

## Superseded Information
- [YYYY-MM-DD] Was using X → now Y confirmed

## Memory Hygiene
Only promote here after confirmation or 2+ observations.
Never delete — move to Superseded with a date stamp.`
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
      sections: ['Heartbeat Settings', 'Daily Tasks', 'Weekly Tasks', 'Conditional Tasks', 'Heartbeat Log', 'Disabled Tasks'],
      excerpt: 'Never execute a task that requires user confirmation autonomously — send a message instead.',
      markdownContent: `# HEARTBEAT.md — Scheduled Tasks

## Heartbeat Settings
frequency: daily at 09:00 [timezone]
enabled: true
notification_channel: chat

## Daily Tasks
- [ ] Check open issues across active repos
- [ ] Summarize overnight alerts or errors
- [ ] Review USER.md flagged priorities
- [ ] Generate memory/[today].md stub

## Weekly Tasks (Monday)
- [ ] Weekly project status summary
- [ ] Review and archive stale MEMORY.md entries
- [ ] Generate week-ahead checklist

## Conditional Tasks
- If deploy failed overnight → alert immediately
- If no commit in 3 days on active project → nudge user

## Disabled Tasks
- [task]: [reason it was disabled]

## Heartbeat Log
- [YYYY-MM-DD]: [what ran, what was noted]`
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
      sections: ['Built-in Capabilities', 'Installed Skills', 'Tool Selection Guide', 'Unavailable / Planned', 'Tool Error Handling'],
      excerpt: 'Memory first → workspace files → specialised tool → web search last.',
      markdownContent: `# TOOLS.md — Available Tools

## Built-in Capabilities
- File read/write (workspace scope)
- Terminal commands (sandboxed)
- Web search (when explicitly needed)
- Image and document analysis

## Installed Skills / MCPs
- [skill-name]: [what it does, when to use it]
- [mcp-name]: [what it connects to]

## Tool Selection Guide
Priority order — always follow this:
1. MEMORY.md → use stored knowledge first
2. Workspace files → check local before fetching
3. Specialised tool → calendar, GitHub, etc.
4. Web search → last resort only

## Tool Error Handling
- Tool timeout → retry once, then tell user
- Permission denied → explain clearly, don't work around
- Ambiguous result → surface options, don't decide alone

## Unavailable / Planned
- [ ] [Tool name]: [reason not yet available]`
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
