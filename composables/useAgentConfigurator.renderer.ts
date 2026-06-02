// Map questionnaire answers onto the seven official templates (useAgentFiles bodies).

import type { AgentFileId } from './useAgentFiles.types'
import type { ConfiguratorAnswers, GeneratedAgentFiles } from './useAgentConfigurator.types'

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function a(answers: ConfiguratorAnswers, section: AgentFileId, key: string): string {
  return (answers[section]?.[key] ?? '').trim()
}

function ownerName(answers: ConfiguratorAnswers): string {
  return a(answers, 'user', 'owner_name') || '[Your Name]'
}

function agentName(answers: ConfiguratorAnswers): string {
  return a(answers, 'soul', 'name') || '[AgentName]'
}

/** Turn free text into markdown bullets (one per line or comma-separated). */
export function textToBullets(text: string, fallback = '- [PENDING]'): string {
  if (!text.trim()) return fallback
  const parts = text
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (!parts.length) return fallback
  return parts.map((p) => (p.startsWith('-') ? p : `- ${p}`)).join('\n')
}

/** Replace a `## Section` body until the next `##` or EOF. */
export function patchSection(markdown: string, sectionTitle: string, body: string): string {
  const escaped = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(`(^## ${escaped}\\s*\\n)([\\s\\S]*?)(?=^## |\\z)`, 'm')
  if (!re.test(markdown)) return markdown
  const trimmed = body.trimEnd()
  return markdown.replace(re, `$1${trimmed}\n\n`)
}

function replaceAllBrackets(markdown: string, pairs: Record<string, string>): string {
  let out = markdown
  for (const [key, value] of Object.entries(pairs)) {
    if (value) out = out.split(`[${key}]`).join(value)
  }
  return out
}

function renderSoul(template: string, answers: ConfiguratorAnswers): string {
  const name = agentName(answers)
  const purpose = a(answers, 'soul', 'purpose') || '[role]'
  const tone = a(answers, 'soul', 'tone')
  const language = a(answers, 'soul', 'language')
  const values = textToBullets(a(answers, 'soul', 'values'), '- Accuracy over speed. Verify before answering.')
  const hard = textToBullets(
    a(answers, 'soul', 'hardlimits'),
    '- NEVER share API keys, tokens, or passwords.\n- NEVER execute destructive actions without confirmation.'
  )
  const bounds = textToBullets(
    a(answers, 'soul', 'outofscope'),
    '- Topics you will not engage with: see Hard Limits unless USER.md authorises otherwise.'
  )
  const biz = a(answers, 'soul', 'businessrole')

  let md = replaceAllBrackets(template, {
    AgentName: name,
    role: purpose,
    owner: ownerName(answers),
    date: todayIso()
  })

  const personality = [
    tone ? `- Tone: ${tone}.` : '- Direct and concise. Skip the preamble.',
    language ? `- Default language: ${language}.` : '- Match the user\'s register — brief when they\'re brief.',
    '- Brutally honest. If something is wrong, say so.'
  ].join('\n')

  md = patchSection(md, 'Personality & Tone', personality)
  md = patchSection(md, 'Core Values', values)
  md = patchSection(
    md,
    'Capabilities',
    [
      `- Primary: ${purpose || '[Primary domain]'}.`,
      biz ? `- Business role: ${biz.replace(/\n/g, ' ')}.` : '- Secondary: say explicitly when asked.',
      language ? `- Default language: ${language}.` : '- Default depth: see USER.md unless told otherwise.'
    ].join('\n')
  )
  md = patchSection(md, 'Hard Limits', hard)
  md = patchSection(md, 'Boundaries', bounds)

  const failure = a(answers, 'agents', 'failure')
  if (failure) {
    md = patchSection(
      md,
      'Failure Mode',
      failure
        .split(/\n/)
        .map((l) => l.trim())
        .filter(Boolean)
        .join('\n')
    )
  }

  return md
}

function renderIdentity(template: string, answers: ConfiguratorAnswers): string {
  const primary = a(answers, 'identity', 'llm_primary') || 'claude-opus-4-7'
  const fallback = a(answers, 'identity', 'llm_fallback') || 'claude-haiku-4-5'
  const channel = a(answers, 'identity', 'channel')
  const systems = a(answers, 'identity', 'systems')
  const urls = a(answers, 'identity', 'urls')
  const access = a(answers, 'identity', 'access_levels')
  const trusted = a(answers, 'identity', 'trusted_agents')
  const workspace = a(answers, 'identity', 'workspace_path')

  let md = template
    .replace(/^name: \[AgentName\]/m, `name: ${agentName(answers)}`)
    .replace(/^owner: \[Your Name\]/m, `owner: ${ownerName(answers)}`)
    .replace(/^created: \[YYYY-MM-DD\]/m, `created: ${todayIso()}`)
    .replace(/^primary: .+$/m, `primary: ${primary}`)
    .replace(/^fallback: .+$/m, `fallback: ${fallback}`)

  const tags = [
    channel ? `channel:${channel.toLowerCase()}` : '',
    systems ? `systems:${systems.replace(/\n/g, ', ')}` : '',
    workspace ? `workspace:${workspace}` : ''
  ]
    .filter(Boolean)
    .join(', ')

  md = md.replace(
    /^productivity, coding, \[add tags.+\]$/m,
    tags || 'productivity, coding, [add tags for filtering or dashboards]'
  )

  if (trusted) {
    md = patchSection(
      md,
      'Multi-Agent Settings',
      `can_spawn: false\nparent_agent: none\nvisible_to: ${ownerName(answers)}\ntrusted_agents: ${trusted}`
    )
  }

  const routingNotes = [
    channel ? `notification_channel: ${channel.toLowerCase()}` : '',
    urls ? `# Connection URLs\n${urls}` : '',
    access ? `# Access levels\n${access}` : ''
  ]
    .filter(Boolean)
    .join('\n')

  if (routingNotes) {
    md = patchSection(md, 'Routing Configuration', `gateway_port: 18789\nfallback_mode: queue\n\n${routingNotes}`)
  }

  if (workspace) {
    md = patchSection(
      md,
      'Session Settings',
      `context_window: rolling-8k\nsession_timeout: 4h\nauto_save_memory: true\nworkspace_path: ${workspace}`
    )
  }

  return md
}

function renderAgents(template: string, answers: ConfiguratorAnswers): string {
  const workflows = textToBullets(
    a(answers, 'agents', 'workflows'),
    '- **Code review**: read → identify → propose fix → confirm'
  )
  const confirm = a(answers, 'agents', 'needs_confirm')
  const autonomous = a(answers, 'agents', 'autonomous')
  const conflict =
    a(answers, 'agents', 'conflict_rule') ||
    'SOUL limits → AGENTS → user request.'
  const escalation = a(answers, 'agents', 'escalation')
  const format = a(answers, 'agents', 'format')

  let md = patchSection(template, 'Core Workflows', workflows)

  const decisionBody = [
    '| If | Then |',
    '|----|------|',
    '| Ambiguous instruction | Ask one clarifying question first. |',
    confirm ? `| Requires confirmation | ${confirm.replace(/\n/g, '; ')}. |` : '',
    autonomous ? `| Autonomous (no ask) | ${autonomous.replace(/\n/g, '; ')}. |` : '',
    `| Conflicting instructions | ${conflict} |`,
    '| Unknown topic | Acknowledge the gap. Do not guess. |'
  ]
    .filter(Boolean)
    .join('\n')

  md = patchSection(md, 'Decision Rules', decisionBody)

  if (escalation) {
    md = patchSection(
      md,
      'Escalation Paths',
      `| Situation | Action |\n|-----------|--------|\n| Out of capacity | ${escalation.replace(/\n/g, ' ')} |`
    )
  }

  if (format) {
    md = patchSection(
      md,
      'Communication Patterns',
      `- Preferred format: ${format}.\n- Status updates: short, timestamped when helpful.\n- Questions: one at a time unless USER.md allows batches.`
    )
  }

  return md
}

function renderUser(template: string, answers: ConfiguratorAnswers): string {
  const name = a(answers, 'user', 'owner_name') || '[Your Name]'
  const email = a(answers, 'user', 'owner_email')
  const schedule = a(answers, 'user', 'schedule') || '[schedule / timezone]'
  const comm = a(answers, 'user', 'comm_style')
  const projects = textToBullets(a(answers, 'user', 'active_projects'), '- [Project A]: [brief description]')
  const prefs = textToBullets(a(answers, 'user', 'loves'), '- Skip the intro. Get to the answer.')
  const team = textToBullets(a(answers, 'user', 'team'), '- [Name] — [role] — [note]')
  const contacts = textToBullets(a(answers, 'user', 'contacts'), '- [Name] — [role] — [note]')
  const hates = textToBullets(
    a(answers, 'user', 'hates'),
    "- Don't start responses with \"Great question!\""
  )

  let md = template
  md = patchSection(
    md,
    'Who I Am',
    `${name}${email ? ` · ${email}` : ''}\nBased in [City]. Works ${schedule}.`
  )

  const workBest = [
    comm ? `- Communication: ${comm}.` : '- Skip the intro. Get to the answer.',
  ].join('\n')
  md = patchSection(md, 'How I Work Best', workBest || prefs)
  md = patchSection(md, 'Current Projects', projects)
  md = patchSection(md, 'Standing Preferences', prefs)
  md = patchSection(md, 'People & Contacts', `${team}\n${contacts}`.trim())
  md = patchSection(md, 'Do Not Do', hates)

  return md
}

function renderMemory(template: string, answers: ConfiguratorAnswers): string {
  let md = template
  md = patchSection(md, 'Important Facts', textToBullets(a(answers, 'memory', 'business_facts')))
  md = patchSection(md, 'Known Patterns', textToBullets(a(answers, 'memory', 'patterns')))
  md = patchSection(md, 'User Preferences (confirmed)', textToBullets(a(answers, 'memory', 'decisions')))
  md = patchSection(md, 'Credentials References', textToBullets(a(answers, 'memory', 'integrations')))
  md = patchSection(md, 'Resolved Issues', textToBullets(a(answers, 'memory', 'known_issues')))

  const review = a(answers, 'memory', 'review_cycle')
  const privateNote = a(answers, 'memory', 'private')
  const hygiene = [
    review ? `- Review cycle: ${review}.` : 'Only promote here after confirmation or 2+ observations.',
    'Never delete — move to Superseded with a date stamp.',
    privateNote ? `- Never mention in shared contexts: ${privateNote.replace(/\n/g, '; ')}.` : ''
  ]
    .filter(Boolean)
    .join('\n')
  md = patchSection(md, 'Memory Hygiene', hygiene)

  return md
}

function renderHeartbeat(template: string, answers: ConfiguratorAnswers): string {
  const time = a(answers, 'heartbeat', 'morning_time') || '09:00'
  const channel = a(answers, 'heartbeat', 'morning_channel') || 'chat'
  const morning = textToBullets(a(answers, 'heartbeat', 'morning_check'), '- [ ] Review USER.md flagged priorities')
  const eod = a(answers, 'heartbeat', 'eod')
  const weekly = textToBullets(a(answers, 'heartbeat', 'weekly'), '- [ ] Weekly project status summary')
  const alerts = textToBullets(a(answers, 'heartbeat', 'alerts'))
  const autonomous = a(answers, 'heartbeat', 'autonomous_hb')
  const confirm = a(answers, 'heartbeat', 'always_confirm')

  let md = template
  md = patchSection(
    md,
    'Heartbeat Settings',
    `frequency: daily at ${time}\nenabled: true\nnotification_channel: ${channel.toLowerCase()}`
  )
  md = patchSection(md, 'Daily Tasks', morning)
  if (eod) {
    md = patchSection(
      md,
      'Daily Tasks',
      `${morning}\n- [ ] End-of-day summary: ${eod.replace(/\n/g, '; ')}`
    )
  }
  md = patchSection(md, 'Weekly Tasks (Monday)', weekly)
  if (alerts) {
    md = patchSection(md, 'Conditional Tasks', textToBullets(alerts, '- If deploy failed overnight → alert immediately'))
  }

  const disabled = [
    autonomous ? `# May run without asking\n${autonomous}` : '',
    confirm ? `# Always wait for confirmation\n${confirm}` : ''
  ]
    .filter(Boolean)
    .join('\n\n')

  if (disabled) md = patchSection(md, 'Disabled Tasks', disabled)

  return md
}

function renderTools(template: string, answers: ConfiguratorAnswers): string {
  const list = textToBullets(a(answers, 'tools', 'tools_list'), '- File read/write (workspace scope)')
  const caps = a(answers, 'tools', 'tools_caps')
  const creds = a(answers, 'tools', 'credentials')
  const limits = a(answers, 'tools', 'rate_limits')
  const failure = a(answers, 'tools', 'tool_failure')
  const priority = a(answers, 'tools', 'tool_priority')
  const planned = textToBullets(a(answers, 'tools', 'planned_tools'), '- [ ] [Tool name]: [reason not yet available]')

  let md = template
  const skills = caps
    ? caps
        .split(/\n/)
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => (l.startsWith('-') ? l : `- ${l}`))
        .join('\n')
    : list

  md = patchSection(md, 'Installed Skills / MCPs', skills || list)
  if (priority) {
    md = patchSection(
      md,
      'Tool Selection Guide',
      `Priority order — always follow this:\n${priority}`
    )
  }
  md = patchSection(md, 'Unavailable / Planned', planned)

  const errLines = [
    failure ? `- Policy: ${failure}.` : '- Tool timeout → retry once, then tell user',
    limits ? `- Rate limits: ${limits.replace(/\n/g, '; ')}.` : '',
    creds ? `- Credentials stored in: ${creds}.` : ''
  ]
    .filter(Boolean)
    .join('\n')
  md = patchSection(md, 'Tool Error Handling', errLines)

  return md
}

const RENDERERS: Record<
  AgentFileId,
  (template: string, answers: ConfiguratorAnswers) => string
> = {
  soul: renderSoul,
  identity: renderIdentity,
  agents: renderAgents,
  user: renderUser,
  tools: renderTools,
  memory: renderMemory,
  heartbeat: renderHeartbeat
}

export function generateConfiguredAgentFiles(
  answers: ConfiguratorAnswers,
  templates: Record<AgentFileId, string>
): GeneratedAgentFiles {
  const out = {} as GeneratedAgentFiles
  for (const id of Object.keys(RENDERERS) as AgentFileId[]) {
    out[id] = RENDERERS[id](templates[id], answers)
  }
  return out
}
