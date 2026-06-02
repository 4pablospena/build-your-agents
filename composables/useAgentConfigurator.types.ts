import type { AgentFile, AgentFileId } from './useAgentFiles.types'

export type ConfiguratorQuestionType = 'text' | 'select' | 'multiline'

export type ConfiguratorQuestion = {
  id: string
  label: string
  placeholder?: string
  type?: ConfiguratorQuestionType
  options?: string[]
  multiline?: boolean
}

export type ConfiguratorSection = {
  id: AgentFileId
  file: string
  color: AgentFile['color']
  label: string
  title: string
  subtitle: string
  questions: ConfiguratorQuestion[]
}

/** Answers keyed by section id, then question id. */
export type ConfiguratorAnswers = Partial<
  Record<AgentFileId, Partial<Record<string, string>>>
>

export type GeneratedAgentFiles = Record<AgentFileId, string>
