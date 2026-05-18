// “Which file does this belong in?” — scores sections + decision rules (no new agent fields).

import type { AgentFileId } from './useBlogPosts'
import { decisionRules, toolPriority } from './useDecisionRules'

export type PlacementMatch = {
  fileId: AgentFileId
  score: number
  sections: string[]
  reasons: string[]
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((t) => t.length > 2)
}

export function useFilePlacementWizard() {
  const { files, byId } = useAgentFiles()
  const query = ref('')
  const activeRuleIndex = ref<number | null>(null)
  const activePriorityIndex = ref<number | null>(null)

  const results = computed((): PlacementMatch[] => {
    const q = query.value.trim()
    const tokens = tokenize(q)
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
          bump(id, 24, `Decision rule: ${rule.when}`)
        }
      }
    }

    if (activePriorityIndex.value !== null) {
      const step = toolPriority[activePriorityIndex.value]
      if (step) {
        for (const id of step.suggests) {
          bump(id, 18, `Tool priority: ${step.label}`)
        }
      }
    }

    if (tokens.length) {
      for (const f of files) {
        const id = f.id as AgentFileId
        for (const section of f.sections) {
          const hay = section.toLowerCase()
          if (tokens.some((t) => hay.includes(t))) {
            bump(id, 12, 'Section title match', section)
          }
        }
        const roleHay = f.role.toLowerCase()
        const tagHay = f.tagline.toLowerCase()
        const excerptHay = f.excerpt.toLowerCase()
        for (const t of tokens) {
          if (roleHay.includes(t)) bump(id, 5, 'Role description')
          if (tagHay.includes(t)) bump(id, 4, 'Tagline')
          if (excerptHay.includes(t)) bump(id, 3, 'Excerpt')
          if (f.filename.toLowerCase().includes(t)) bump(id, 8, 'Filename')
        }
      }

      for (const rule of decisionRules) {
        const hay = `${rule.when} ${rule.do}`.toLowerCase()
        if (tokens.some((t) => hay.includes(t))) {
          for (const id of rule.suggests) {
            bump(id, 10, `Related rule: ${rule.when}`)
          }
        }
      }
    }

    return [...scores.values()]
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
  })

  const hasInput = computed(
    () =>
      query.value.trim().length > 0 ||
      activeRuleIndex.value !== null ||
      activePriorityIndex.value !== null
  )

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

  function fileLabel(fileId: AgentFileId) {
    return byId(fileId)?.filename ?? fileId
  }

  return {
    query,
    activeRuleIndex,
    activePriorityIndex,
    results,
    hasInput,
    pickRule,
    pickPriority,
    reset,
    fileLabel,
    decisionRules,
    toolPriority
  }
}
