// Human-readable copy for the relationship explorer bar (FileGraph).

import type { AgentFile } from './useAgentFiles.types'

export function formatGraphExplorerSummary(
  selected: AgentFile | null | undefined,
  readsIds: string[],
  readByIds: string[],
  filename: (id: string) => string | undefined
): { headline: string; readsLine: string | null; readByLine: string | null } {
  if (!selected) {
    return { headline: '', readsLine: null, readByLine: null }
  }

  const readsNames = readsIds
    .map((id) => filename(id))
    .filter((n): n is string => Boolean(n))
  const readByNames = readByIds
    .map((id) => filename(id))
    .filter((n): n is string => Boolean(n))

  return {
    headline: selected.filename,
    readsLine:
      readsNames.length > 0
        ? `Reads: ${readsNames.join(', ')}`
        : 'Reads: none listed in this file’s `reads` field',
    readByLine:
      readByNames.length > 0
        ? `Read by: ${readByNames.join(', ')}`
        : null
  }
}
