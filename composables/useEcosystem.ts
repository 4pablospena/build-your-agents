// Ecosystem bridge: maps the seven-file spec to OpenClaw, Cursor, and MCP
// workflows. Data lives here — pages/components only render.

import type { AgentFileId } from './useBlogPosts'

export type EcosystemLane = {
  id: 'openclaw' | 'cursor' | 'mcp'
  title: string
  tagline: string
  /** One paragraph — readable in under 20 seconds. */
  summary: string
  /** Files most relevant in this lane (subset or all seven). */
  fileIds: AgentFileId[]
  /** Short note per file for the mapping grid. */
  fileNotes: Partial<Record<AgentFileId, string>>
}

export const ecosystemLanes: EcosystemLane[] = [
  {
    id: 'openclaw',
    title: 'OpenClaw workspace',
    tagline: 'The folder your gateway loads each session',
    summary:
      'Point OpenClaw at a directory of markdown. These seven files are that directory — no proprietary schema. Add a memory/ subfolder for daily notes; the spec already describes the split.',
    fileIds: ['soul', 'identity', 'agents', 'user', 'memory', 'heartbeat', 'tools'],
    fileNotes: {
      soul: 'Personality, values, hard limits — core context on boot',
      identity: 'Model, routing, multi-agent metadata',
      agents: 'Session checklist, workflows, decision table',
      user: 'Who you are, priorities, “do not do”',
      memory: 'Evergreen facts (promote from memory/ daily files)',
      heartbeat: 'Scheduled tasks + autonomy boundaries',
      tools: 'Skills, MCPs, selection order'
    }
  },
  {
    id: 'cursor',
    title: 'Cursor rules & project docs',
    tagline: 'Same markdown, different host',
    summary:
      'In Cursor you often merge SOUL + AGENTS into .cursor/rules or AGENTS.md in the repo. TOOLS.md documents MCP servers; USER.md is optional context. You are not locked in — export or symlink the same files.',
    fileIds: ['soul', 'agents', 'tools', 'user', 'identity'],
    fileNotes: {
      soul: 'Tone and boundaries → rules or always-on context',
      agents: 'How the agent decides and escalates',
      tools: 'Which MCPs exist and when to use them',
      user: 'Preferences loaded when pair-programming',
      identity: 'Model choice hints; less critical in IDE'
    }
  },
  {
    id: 'mcp',
    title: 'MCP & tool surface',
    tagline: 'Capabilities without losing the soul',
    summary:
      'TOOLS.md is the static map of what the model may call. AGENTS.md defines selection order and failure handling. HEARTBEAT.md covers unattended checks — never confuse “can call API” with “may act without you”.',
    fileIds: ['tools', 'agents', 'heartbeat', 'memory', 'soul'],
    fileNotes: {
      tools: 'Every MCP, skill, built-in — parameters & errors',
      agents: 'Tool selection guide + escalation when tools fail',
      heartbeat: 'Rate limits, health checks, no silent destructive acts',
      memory: 'Confirmed facts before hitting external APIs again',
      soul: 'Hard limits on what tools must never do'
    }
  }
]
