// Interactive questionnaire → filled seven-file spec (templates + local draft).

import { CONFIGURATOR_SECTIONS } from './useAgentConfigurator.sections'
import { generateConfiguredAgentFiles } from './useAgentConfigurator.renderer'
import type { ConfiguratorAnswers } from './useAgentConfigurator.types'
import {
  buildCursorRulesMarkdown,
  downloadTextFile
} from './useCursorRulesGenerator'
import type { AgentFileId } from './useAgentFiles.types'
import { validateMarkdownSections } from './useMarkdownValidator'

const STORAGE_KEY = 'bya:configure:answers:v1'

export function useAgentConfigurator() {
  const { files, byId } = useAgentFiles()
  const sections = CONFIGURATOR_SECTIONS

  const viewMode = ref<'form' | 'guide'>('form')
  const current = ref(0)
  const answers = ref<ConfiguratorAnswers>({})
  const showExport = ref(false)
  const exportSection = ref<AgentFileId | 'all'>('all')
  const copied = ref(false)
  const hydrated = ref(false)

  const templates = computed(() => {
    const map = {} as Record<AgentFileId, string>
    for (const f of files) map[f.id] = f.markdownContent
    return map
  })

  const generated = computed(() =>
    generateConfiguredAgentFiles(answers.value, templates.value)
  )

  const section = computed(() => sections[current.value])

  const filled = computed(() =>
    sections.map((s) => {
      const a = answers.value[s.id] || {}
      const count = s.questions.filter((q) => (a[q.id] ?? '').trim().length > 0).length
      return { id: s.id, count, total: s.questions.length }
    })
  )

  const totalFilled = computed(() => filled.value.reduce((acc, b) => acc + b.count, 0))
  const totalQuestions = computed(() => filled.value.reduce((acc, b) => acc + b.total, 0))
  const progressPct = computed(() =>
    totalQuestions.value === 0
      ? 0
      : Math.round((totalFilled.value / totalQuestions.value) * 100)
  )

  const validationByFile = computed(() => {
    const out: Partial<
      Record<AgentFileId, ReturnType<typeof validateMarkdownSections>>
    > = {}
    for (const f of files) {
      out[f.id] = validateMarkdownSections(generated.value[f.id], f.sections)
    }
    return out
  })

  const allValid = computed(() =>
    files.every((f) => validationByFile.value[f.id]?.ok)
  )

  function loadDraft() {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) answers.value = JSON.parse(raw) as ConfiguratorAnswers
    } catch {
      /* ignore corrupt draft */
    }
    hydrated.value = true
  }

  function saveDraft() {
    if (!import.meta.client || !hydrated.value) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers.value))
  }

  function resetDraft() {
    answers.value = {}
    if (import.meta.client) localStorage.removeItem(STORAGE_KEY)
  }

  watch(answers, saveDraft, { deep: true })

  onMounted(loadDraft)

  function handleChange(qid: string, val: string) {
    const sid = section.value.id
    answers.value = {
      ...answers.value,
      [sid]: { ...(answers.value[sid] || {}), [qid]: val }
    }
  }

  function sectionAnswersFor(id: AgentFileId) {
    return answers.value[id] || {}
  }

  function exportMarkdown(which: AgentFileId | 'all'): string {
    if (which === 'all') {
      return files
        .map((f) => `${'='.repeat(60)}\n${generated.value[f.id]}`)
        .join('\n')
    }
    return generated.value[which]
  }

  async function copyToClipboard(which: AgentFileId | 'all' = exportSection.value) {
    if (!import.meta.client) return
    const md = exportMarkdown(which)
    await navigator.clipboard.writeText(md)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }

  function downloadFile(id: AgentFileId) {
    const f = byId(id)
    if (!f) return
    downloadTextFile(f.filename, generated.value[id])
  }

  function downloadAll() {
    for (const f of files) downloadFile(f.id)
  }

  function downloadCursorRules() {
    const ids = files.map((f) => f.id as AgentFileId)
    const md = buildCursorRulesMarkdown(files, ids)
    downloadTextFile('build-your-agents.cursor-rules.md', md)
  }

  function openStepByFileId(fileId: AgentFileId) {
    const idx = sections.findIndex((s) => s.id === fileId)
    if (idx >= 0) {
      viewMode.value = 'form'
      current.value = idx
      showExport.value = false
    }
  }

  function goToSection(index: number) {
    current.value = Math.max(0, Math.min(index, sections.length - 1))
    showExport.value = false
  }

  function next() {
    if (current.value < sections.length - 1) {
      current.value += 1
    } else {
      showExport.value = true
    }
  }

  function prev() {
    if (current.value > 0) current.value -= 1
  }

  return {
    sections,
    files,
    byId,
    viewMode,
    current,
    section,
    answers,
    showExport,
    exportSection,
    copied,
    hydrated,
    filled,
    totalFilled,
    totalQuestions,
    progressPct,
    generated,
    validationByFile,
    allValid,
    handleChange,
    sectionAnswersFor,
    exportMarkdown,
    copyToClipboard,
    downloadFile,
    downloadAll,
    downloadCursorRules,
    openStepByFileId,
    resetDraft,
    goToSection,
    next,
    prev
  }
}
