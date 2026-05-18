// Relationship explorer state — SSR-safe via useState. No changes to useAgentFiles.

import type { AgentFileId } from './useBlogPosts'

export type FileGraphRole = 'selected' | 'reads' | 'readBy'

const STATE_KEY = 'bya:file-graph:selected'

export function useFileGraph() {
  const { files, byId } = useAgentFiles()
  const selectedId = useState<string | null>(STATE_KEY, () => null)

  function filenameToId(filename: string): AgentFileId | null {
    const hit = files.find((f) => f.filename === filename)
    return (hit?.id as AgentFileId) ?? null
  }

  const selected = computed(() =>
    selectedId.value ? byId(selectedId.value) ?? null : null
  )

  const readsIds = computed((): AgentFileId[] => {
    if (!selectedId.value) return []
    const f = byId(selectedId.value)
    if (!f) return []
    return f.reads
      .map((name) => filenameToId(name))
      .filter((id): id is AgentFileId => id !== null)
  })

  const readByIds = computed((): AgentFileId[] => {
    if (!selectedId.value) return []
    const name = byId(selectedId.value)?.filename
    if (!name) return []
    return files
      .filter((f) => f.reads.includes(name))
      .map((f) => f.id as AgentFileId)
  })

  const hasSelection = computed(() => selectedId.value !== null)

  function roleFor(id: string): FileGraphRole | null {
    if (!selectedId.value) return null
    if (id === selectedId.value) return 'selected'
    if (readsIds.value.includes(id as AgentFileId)) return 'reads'
    if (readByIds.value.includes(id as AgentFileId)) return 'readBy'
    return null
  }

  function isHighlighted(id: string): boolean {
    return roleFor(id) !== null
  }

  function isDimmed(id: string): boolean {
    return hasSelection.value && !isHighlighted(id)
  }

  function select(id: string) {
    selectedId.value = selectedId.value === id ? null : id
  }

  function clear() {
    selectedId.value = null
  }

  /** Edge from reader → dependency (matches `reads` direction). */
  function isEdgeActive(fromId: string, toId: string): boolean {
    if (!selectedId.value) return false
    if (fromId === selectedId.value && readsIds.value.includes(toId as AgentFileId)) {
      return true
    }
    if (toId === selectedId.value && readByIds.value.includes(fromId as AgentFileId)) {
      return true
    }
    return false
  }

  return {
    selectedId,
    selected,
    readsIds,
    readByIds,
    hasSelection,
    roleFor,
    isHighlighted,
    isDimmed,
    select,
    clear,
    isEdgeActive,
    filenameToId
  }
}
