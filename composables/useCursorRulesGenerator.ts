// Build a single .cursor/rules markdown bundle from the seven spec files.

import type { AgentFile } from './useAgentFiles.types'
import type { AgentFileId } from './useBlogPosts'

const BUNDLE_FILENAME = 'build-your-agents.cursor-rules.md'

export function buildCursorRulesMarkdown(
  files: AgentFile[],
  includeIds: AgentFileId[]
): string {
  const picked = files.filter((f) => includeIds.includes(f.id as AgentFileId))
  const parts = [
    '---',
    'description: Generated from build-your-agents seven-file spec',
    'globs:',
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

export function useCursorRulesGenerator() {
  const { files } = useAgentFiles()
  const selected = ref<AgentFileId[]>(
    files.map((f) => f.id as AgentFileId)
  )

  const preview = computed(() =>
    buildCursorRulesMarkdown(files, selected.value)
  )

  function toggle(fileId: AgentFileId) {
    if (selected.value.includes(fileId)) {
      selected.value = selected.value.filter((id) => id !== fileId)
    } else {
      selected.value = [...selected.value, fileId]
    }
  }

  function selectAll() {
    selected.value = files.map((f) => f.id as AgentFileId)
  }

  function download() {
    if (!selected.value.length) return
    downloadTextFile(BUNDLE_FILENAME, preview.value)
  }

  return {
    files,
    selected,
    preview,
    toggle,
    selectAll,
    download,
    bundleFilename: BUNDLE_FILENAME
  }
}
