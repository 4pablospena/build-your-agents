// Client-side markdown validation against useAgentFiles().sections.

import type { AgentFileId } from './useAgentFiles.types'

export type SectionValidationResult = {
  ok: boolean
  found: string[]
  missing: string[]
  extra: string[]
  expected: string[]
  matched: string[]
}

function normalizeHeading(value: string): string {
  return value.toLowerCase().trim()
}

/** Extract level-2 headings (`## …`) from markdown. */
export function parseMarkdownH2Headings(markdown: string): string[] {
  const headings: string[] = []
  for (const line of markdown.split('\n')) {
    const match = line.match(/^##\s+(.+?)\s*$/)
    if (match?.[1]) headings.push(match[1].trim())
  }
  return headings
}

export function validateMarkdownSections(
  markdown: string,
  expectedSections: string[]
): SectionValidationResult {
  const found = parseMarkdownH2Headings(markdown)
  const foundNorm = new Set(found.map(normalizeHeading))
  const expectedNorm = expectedSections.map(normalizeHeading)

  const missing: string[] = []
  const matched: string[] = []
  for (const section of expectedSections) {
    if (foundNorm.has(normalizeHeading(section))) matched.push(section)
    else missing.push(section)
  }
  const extra = found.filter(
    (h) => !expectedNorm.includes(normalizeHeading(h))
  )

  return {
    ok: missing.length === 0,
    found,
    missing,
    extra,
    expected: expectedSections,
    matched
  }
}

export function useMarkdownValidator() {
  const { files, byId } = useAgentFiles()
  const selectedFileId = ref<AgentFileId>('soul')
  const markdown = ref('')

  const file = computed(() => byId(selectedFileId.value))
  const result = computed(() => {
    if (!file.value || !markdown.value.trim()) return null
    return validateMarkdownSections(markdown.value, file.value.sections)
  })

  function loadTemplate() {
    const f = file.value
    if (f) markdown.value = f.markdownContent
  }

  function clear() {
    markdown.value = ''
  }

  return {
    files,
    selectedFileId,
    markdown,
    file,
    result,
    loadTemplate,
    clear
  }
}
