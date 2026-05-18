// Reading map for the seven-file spec. This composable owns the journey-specific
// metadata (order, time-to-fill, single-line goal) and does NOT redefine file
// metadata — colors, symbols, sections and roles come from useAgentFiles().

import type { AgentFile } from './useAgentFiles.types'

export type StartStep = {
  /** 1..7 position in the journey. */
  position: number
  /** AgentFile id — used to resolve color, symbol, role, sections. */
  fileId: AgentFile['id']
  /** Realistic minutes for a first pass (filling brackets, not perfecting). */
  estMinutes: number
  /** Imperative one-liner: what you actually do in this step. */
  goal: string
}

const STORAGE_KEY = 'bya:start:progress:v1'

/**
 * Authoritative reading order for the journey (not the same as `useAgentFiles().files`
 * which is sorted for the landing grid). The user fills SOUL first because every
 * other file ends up referring to it; HEARTBEAT is last because it needs the
 * rest already drafted to be safe.
 */
export function useStartJourney() {
  const order: StartStep[] = [
    {
      position: 1,
      fileId: 'soul',
      estMinutes: 6,
      goal: 'Name the agent. Decide its voice, its values, and the hard limits it must never cross.'
    },
    {
      position: 2,
      fileId: 'identity',
      estMinutes: 3,
      goal: 'Pin model, fallback, routing port and any multi-agent metadata.'
    },
    {
      position: 3,
      fileId: 'agents',
      estMinutes: 5,
      goal: 'Write the session start checklist, decision rules and escalation paths.'
    },
    {
      position: 4,
      fileId: 'user',
      estMinutes: 4,
      goal: 'Describe yourself. Projects, standing preferences, and an explicit “do not do”.'
    },
    {
      position: 5,
      fileId: 'tools',
      estMinutes: 4,
      goal: 'List every capability and MCP with selection order. No magical tools.'
    },
    {
      position: 6,
      fileId: 'memory',
      estMinutes: 2,
      goal: 'Seed evergreen facts — or leave it empty. One line per fact, supersede only.'
    },
    {
      position: 7,
      fileId: 'heartbeat',
      estMinutes: 3,
      goal: 'Schedule what may run alone — and mark what always needs your confirmation.'
    }
  ]

  const totalMinutes = order.reduce((acc, s) => acc + s.estMinutes, 0)

  return { order, totalMinutes }
}

/**
 * Reactive progress with localStorage persistence. SSR-safe: state hydrates
 * inside `onMounted`, so the server renders the empty-progress shell and the
 * client repaints once with the stored set.
 */
export function useStartProgress() {
  const done = ref<Set<string>>(new Set())
  const hydrated = ref(false)

  function persist() {
    if (!import.meta.client) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...done.value]))
    } catch {
      /* Quota / private mode — silently fall back to in-memory state. */
    }
  }

  function hydrate() {
    if (!import.meta.client) return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          done.value = new Set(parsed.filter((x): x is string => typeof x === 'string'))
        }
      }
    } catch {
      /* Malformed payload — start fresh, keep going. */
    } finally {
      hydrated.value = true
    }
  }

  function toggle(fileId: string) {
    const next = new Set(done.value)
    if (next.has(fileId)) {
      next.delete(fileId)
    } else {
      next.add(fileId)
    }
    done.value = next
    persist()
  }

  function isDone(fileId: string): boolean {
    return done.value.has(fileId)
  }

  function reset() {
    done.value = new Set()
    persist()
  }

  onMounted(hydrate)

  return { done, hydrated, toggle, isDone, reset }
}
