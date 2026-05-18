// Hub navigation for /tools/* — keeps routes and copy out of pages.

export type ToolId = 'hub' | 'validate' | 'cursor-rules' | 'search'

export type ToolLink = {
  id: ToolId
  path: string
  label: string
  title: string
  description: string
  eyebrow: string
}

export const toolsNav: ToolLink[] = [
  {
    id: 'validate',
    path: '/tools/validate',
    label: 'Markdown validator',
    title: 'Validate section headings',
    description:
      'Paste a filled .md file and check that every ## section from the spec appears — client-side only.',
    eyebrow: 'Validator'
  },
  {
    id: 'cursor-rules',
    path: '/tools/cursor-rules',
    label: 'Cursor rules export',
    title: 'Generate .cursor/rules bundle',
    description:
      'Merge the seven templates into one downloadable rules file for your repo.',
    eyebrow: 'Cursor'
  },
  {
    id: 'search',
    path: '/tools/search',
    label: 'Global search',
    title: 'Search blog & changelog',
    description:
      'Keyboard-friendly combobox over @nuxt/content — posts and spec changelog entries.',
    eyebrow: 'Search'
  }
]

export function toolById(id: ToolId): ToolLink | undefined {
  if (id === 'hub') return undefined
  return toolsNav.find((t) => t.id === id)
}
