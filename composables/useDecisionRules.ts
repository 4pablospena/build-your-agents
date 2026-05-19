// Decision table + tool priority — mirrors templates/AGENTS.md and TOOLS.md.
// Shared by DecisionRules.vue and the file-placement wizard (FileGraph).

import type { AgentFileId } from './useAgentFiles.types'

export type DecisionRule = {
  when: string
  do: string
  /** Files to surface when this rule matches the wizard prompt. */
  suggests: AgentFileId[]
}

export type ToolPriorityStep = {
  rank: string
  label: string
  desc: string
  suggests: AgentFileId[]
}

export const decisionRules: DecisionRule[] = [
  {
    when: 'Ambiguous instruction',
    do: 'Ask one clarifying question before proceeding.',
    suggests: ['agents']
  },
  {
    when: 'Destructive or irreversible action',
    do: 'Require explicit confirmation. No exceptions.',
    suggests: ['soul', 'agents']
  },
  {
    when: 'Missing information',
    do: 'Check MEMORY.md, then USER.md, then ask.',
    suggests: ['memory', 'user']
  },
  {
    when: 'Conflicting instructions',
    do: 'SOUL.md limits → AGENTS.md → user request.',
    suggests: ['soul', 'agents']
  },
  {
    when: 'Unknown topic',
    do: 'Acknowledge the gap. Do not guess.',
    suggests: ['soul', 'agents']
  }
]

export const toolPriority: ToolPriorityStep[] = [
  {
    rank: '01',
    label: 'Memory first',
    desc: 'Already in MEMORY.md? Use it. No tool call.',
    suggests: ['memory']
  },
  {
    rank: '02',
    label: 'Workspace files',
    desc: 'Check local files before fetching the web.',
    suggests: ['agents', 'tools']
  },
  {
    rank: '03',
    label: 'Specialised tool',
    desc: 'Calendar for dates. GitHub for code.',
    suggests: ['tools']
  },
  {
    rank: '04',
    label: 'Web search last',
    desc: 'Only when nothing else can answer.',
    suggests: ['tools', 'agents']
  }
]

export function useDecisionRules() {
  return { decisionRules, toolPriority }
}
