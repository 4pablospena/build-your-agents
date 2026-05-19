// Build a single .cursor/rules markdown bundle from the seven spec files.

import type { AgentFile } from './useAgentFiles.types'
import type { AgentFileId } from './useAgentFiles.types'

const BUNDLE_FILENAME = 'build-your-agents.cursor-rules.md'

export function buildCursorRulesMarkdown(
  files: AgentFile[],
  includeIds: AgentFileId[]
): string {
  const picked = files.filter((f) => includeIds.includes(f.id as AgentFileId))
  const parts = [
    '---',
    'description: Generated from build-your-agents seven-file spec',
    'globs: "**/*"',
    'alwaysApply: true',
    '---',
    '',
    '# Agent spec (build-your-agents)',
    '',
    'Plain-markdown rules merged from your agent folder. Edit the source',
    '`.md` files in your repo and regenerate, or split this file per project.',
    ''
  ]

  for (const f of picked) {
    parts.push(
      `<!-- ${f.filename} -->`,
      '',
      `## ${f.filename}`,
      '',
      f.markdownContent.trim(),
      ''
    )
  }

  return `${parts.join('\n').trim()}\n`
}

export function downloadTextFile(filename: string, content: string) {
  if (!import.meta.client) return
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

function defaultSelectedIds(files: AgentFile[]): AgentFileId[] {
  return files.map((f) => f.id as AgentFileId)
}

export function useCursorRulesGenerator() {
  const { files } = useAgentFiles()
  const selected = useState<AgentFileId[]>(
    'bya-cursor-rules-selected',
    () => defaultSelectedIds(files)
  )

  function selectedIds(): AgentFileId[] {
    return Array.isArray(selected.value) ? selected.value : defaultSelectedIds(files)
  }

  function isSelected(fileId: AgentFileId): boolean {
    return selectedIds().includes(fileId)
  }

  const preview = computed(() =>
    buildCursorRulesMarkdown(files, selectedIds())
  )

  function toggle(fileId: AgentFileId) {
    const cur = selectedIds()
    if (cur.includes(fileId)) {
      selected.value = cur.filter((id) => id !== fileId)
    } else {
      selected.value = [...cur, fileId]
    }
  }

  function selectAll() {
    selected.value = defaultSelectedIds(files)
  }

  function download() {
    if (!selectedIds().length) return
    downloadTextFile(BUNDLE_FILENAME, preview.value)
  }

  const hasSelection = computed(() => selectedIds().length > 0)

  return {
    files,
    isSelected,
    hasSelection,
    preview,
    toggle,
    selectAll,
    download,
    bundleFilename: BUNDLE_FILENAME
  }
}
