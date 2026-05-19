// “Which file does this belong in?” — scores sections + decision rules (no new agent fields).

import type { AgentFileId } from './useAgentFiles.types'
import { decisionRules, toolPriority } from './useDecisionRules'

export const PLACEMENT_MIN_QUERY_LENGTH = 2
/** Text-only matches below this score are dropped (chips bypass via rule/priority boosts). */
export const PLACEMENT_MIN_SCORE = 8

export type PlacementMatchStrength = 'strong' | 'likely'

export type PlacementMatch = {
  fileId: AgentFileId
  score: number
  strength: PlacementMatchStrength
  sections: string[]
  reasons: string[]
}

/** Curated hints — not hard-coded slugs, only file ids from the spec. */
const KEYWORD_ROUTES: { tokens: string[]; fileIds: AgentFileId[]; reason: string }[] = [
  { tokens: ['personality', 'values', 'tone', 'soul'], fileIds: ['soul'], reason: 'Keyword: personality / limits' },
  { tokens: ['limit', 'limits', 'boundary', 'boundaries'], fileIds: ['soul', 'agents'], reason: 'Keyword: limits' },
  { tokens: ['workflow', 'escalation', 'decision', 'checklist'], fileIds: ['agents'], reason: 'Keyword: operations' },
  { tokens: ['user', 'preference', 'preferences', 'profile'], fileIds: ['user'], reason: 'Keyword: user context' },
  { tokens: ['memory', 'remember', 'fact', 'facts'], fileIds: ['memory'], reason: 'Keyword: memory' },
  { tokens: ['cron', 'schedule', 'scheduled', 'heartbeat', 'brief', 'autonomous'], fileIds: ['heartbeat'], reason: 'Keyword: scheduled tasks' },
  { tokens: ['tool', 'tools', 'mcp', 'skill', 'skills', 'api'], fileIds: ['tools'], reason: 'Keyword: tools / MCP' },
  { tokens: ['model', 'routing', 'gateway', 'identity'], fileIds: ['identity'], reason: 'Keyword: routing / identity' }
]

function tokenize(text: string): string[] {
  return [...new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/i)
      .filter((t) => t.length >= PLACEMENT_MIN_QUERY_LENGTH)
  )]
}

function matchStrength(score: number): PlacementMatchStrength {
  return score >= 22 ? 'strong' : 'likely'
}

export function useFilePlacementWizard() {
  const { files } = useAgentFiles()
  const query = ref('')
  const activeRuleIndex = ref<number | null>(null)
  const activePriorityIndex = ref<number | null>(null)

  const trimmedQuery = computed(() => query.value.trim())
  const queryTooShort = computed(
    () =>
      trimmedQuery.value.length > 0 &&
      trimmedQuery.value.length < PLACEMENT_MIN_QUERY_LENGTH
  )
  const hasChipInput = computed(
    () => activeRuleIndex.value !== null || activePriorityIndex.value !== null
  )
  const showResultsPanel = computed(
    () => hasChipInput.value || trimmedQuery.value.length >= PLACEMENT_MIN_QUERY_LENGTH
  )

  const results = computed((): PlacementMatch[] => {
    if (!showResultsPanel.value) return []

    const tokens = tokenize(trimmedQuery.value)
    const scores = new Map<AgentFileId, PlacementMatch>()

    function bump(
      fileId: AgentFileId,
      amount: number,
      reason: string,
      section?: string
    ) {
      const cur = scores.get(fileId) ?? {
        fileId,
        score: 0,
        strength: 'likely' as PlacementMatchStrength,
        sections: [],
        reasons: []
      }
      cur.score += amount
      if (reason && !cur.reasons.includes(reason)) cur.reasons.push(reason)
      if (section && !cur.sections.includes(section)) cur.sections.push(section)
      scores.set(fileId, cur)
    }

    if (activeRuleIndex.value !== null) {
      const rule = decisionRules[activeRuleIndex.value]
      if (rule) {
        for (const id of rule.suggests) {
          bump(id, 26, `Decision rule: ${rule.when}`)
        }
      }
    }

    if (activePriorityIndex.value !== null) {
      const step = toolPriority[activePriorityIndex.value]
      if (step) {
        for (const id of step.suggests) {
          bump(id, 20, `Tool priority: ${step.label}`)
        }
      }
    }

    if (tokens.length) {
      for (const route of KEYWORD_ROUTES) {
        if (tokens.some((t) => route.tokens.includes(t))) {
          for (const id of route.fileIds) {
            bump(id, 14, route.reason)
          }
        }
      }

      for (const f of files) {
        const id = f.id as AgentFileId
        for (const section of f.sections) {
          const hay = section.toLowerCase()
          if (tokens.some((t) => hay.includes(t))) {
            bump(id, 14, 'Section title match', section)
          }
        }
        const roleHay = f.role.toLowerCase()
        const tagHay = f.tagline.toLowerCase()
        const excerptHay = f.excerpt.toLowerCase()
        for (const t of tokens) {
          if (roleHay.includes(t)) bump(id, 6, 'Role description')
          if (tagHay.includes(t)) bump(id, 5, 'Tagline')
          if (excerptHay.includes(t)) bump(id, 4, 'Excerpt')
          if (f.filename.toLowerCase().includes(t)) bump(id, 10, 'Filename')
        }
      }

      for (const rule of decisionRules) {
        const hay = `${rule.when} ${rule.do}`.toLowerCase()
        if (tokens.some((t) => hay.includes(t))) {
          for (const id of rule.suggests) {
            bump(id, 12, `Related rule: ${rule.when}`)
          }
        }
      }
    }

    const minScore = hasChipInput.value ? 1 : PLACEMENT_MIN_SCORE

    return [...scores.values()]
      .map((m) => ({ ...m, strength: matchStrength(m.score) }))
      .filter((m) => m.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
  })

  function pickRule(index: number) {
    activeRuleIndex.value = activeRuleIndex.value === index ? null : index
  }

  function pickPriority(index: number) {
    activePriorityIndex.value =
      activePriorityIndex.value === index ? null : index
  }

  function reset() {
    query.value = ''
    activeRuleIndex.value = null
    activePriorityIndex.value = null
  }

  return {
    query,
    trimmedQuery,
    queryTooShort,
    hasChipInput,
    showResultsPanel,
    activeRuleIndex,
    activePriorityIndex,
    results,
    pickRule,
    pickPriority,
    reset,
    decisionRules,
    toolPriority
  }
}
