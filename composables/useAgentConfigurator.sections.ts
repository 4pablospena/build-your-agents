// Questionnaire sections — order matches useStartJourney (fill dependencies first).

import type { ConfiguratorSection } from './useAgentConfigurator.types'

export const CONFIGURATOR_SECTIONS: ConfiguratorSection[] = [
  {
    id: 'soul',
    file: 'SOUL.md',
    color: 'hot',
    label: '01',
    title: 'Who the agent is',
    subtitle: 'Identity, personality, and limits',
    questions: [
      { id: 'name', label: 'What is the agent called?', placeholder: 'e.g. Odin, Sabrina, Mark...' },
      {
        id: 'purpose',
        label: 'What is its main job in one sentence?',
        placeholder: 'e.g. Run Odoo CRM operations for the sales team'
      },
      {
        id: 'tone',
        label: 'What tone do you want?',
        type: 'select',
        options: [
          'Direct and technical',
          'Warm and conversational',
          'Formal and professional',
          'Creative and strategic'
        ]
      },
      {
        id: 'language',
        label: 'What language does it use by default?',
        placeholder: 'e.g. English, Spanish, both...'
      },
      {
        id: 'values',
        label: 'What are its 3–5 non‑negotiable values?',
        placeholder: 'e.g. Accuracy, traceability, privacy...',
        multiline: true
      },
      {
        id: 'hardlimits',
        label: 'What will it never do, even if asked?',
        placeholder: 'e.g. Never delete records, never send email without confirmation...',
        multiline: true
      },
      {
        id: 'outofscope',
        label: 'What is out of scope?',
        placeholder: 'e.g. Legal decisions, strategic accounting...',
        multiline: true
      },
      {
        id: 'businessrole',
        label: 'Does it have a business role beyond technical tasks?',
        placeholder: 'e.g. Marketing, sales, operations, support...',
        multiline: true
      }
    ]
  },
  {
    id: 'identity',
    file: 'IDENTITY.md',
    color: 'sky',
    label: '02',
    title: 'Where it lives and how it connects',
    subtitle: 'Model, channel, systems, and access',
    questions: [
      {
        id: 'llm_primary',
        label: 'Which LLM is primary?',
        placeholder: 'e.g. claude-opus-4-7, gpt-4o...'
      },
      {
        id: 'llm_fallback',
        label: 'Which model is the fallback?',
        placeholder: 'e.g. claude-haiku-4-5 for simple tasks...'
      },
      {
        id: 'channel',
        label: 'Primary messaging channel?',
        type: 'select',
        options: ['Telegram', 'Slack', 'Discord', 'Web', 'Other']
      },
      {
        id: 'systems',
        label: 'Which external systems does it connect to?',
        placeholder: 'e.g. Odoo, GitHub, Google Calendar, Notion...',
        multiline: true
      },
      {
        id: 'urls',
        label: 'URLs and connection details for those systems',
        placeholder: 'e.g. https://company.odoo.com · DB: company · User: admin@...',
        multiline: true
      },
      {
        id: 'access_levels',
        label: 'What access level does it have per system?',
        placeholder: 'e.g. Odoo: read+write CRM · GitHub: read-only...',
        multiline: true
      },
      {
        id: 'trusted_agents',
        label: 'Which other agents can it talk to?',
        placeholder: 'e.g. sabrina, mark, enzo-bot...'
      },
      {
        id: 'workspace_path',
        label: 'Absolute workspace path?',
        placeholder: 'e.g. /Users/you/.openclaw/workspace-odin/'
      }
    ]
  },
  {
    id: 'agents',
    file: 'AGENTS.md',
    color: 'lemon',
    label: '03',
    title: 'How it operates and decides',
    subtitle: 'Workflows, decision rules, and escalation',
    questions: [
      {
        id: 'workflows',
        label: 'What are the 3–5 most repeated workflows?',
        placeholder: 'e.g. Create CRM lead, send doc for signature, weekly pipeline report...',
        multiline: true
      },
      {
        id: 'needs_confirm',
        label: 'Which actions need explicit confirmation?',
        placeholder: 'e.g. Send emails, confirm sales, bulk operations...',
        multiline: true
      },
      {
        id: 'autonomous',
        label: 'What can it do on its own without asking?',
        placeholder: 'e.g. Read records, create activities, generate reports...',
        multiline: true
      },
      {
        id: 'conflict_rule',
        label: 'How does it resolve conflicting instructions?',
        placeholder: 'e.g. SOUL.md first, then AGENTS.md, then user request...'
      },
      {
        id: 'failure',
        label: 'What does it do when a tool fails or data is missing?',
        placeholder: 'e.g. Notify user, retry at most twice, never invent data...',
        multiline: true
      },
      {
        id: 'escalation',
        label: 'Who does it escalate to and how when something is beyond it?',
        placeholder: 'e.g. Notify Alex on Telegram with full context...'
      },
      {
        id: 'format',
        label: 'How should it format replies by default?',
        type: 'select',
        options: ['Tables + bullets', 'Concise prose', 'Mix by context', 'Always structured']
      }
    ]
  },
  {
    id: 'user',
    file: 'USER.md',
    color: 'pink',
    label: '04',
    title: 'Who it serves',
    subtitle: 'Profile, team, projects, and preferences',
    questions: [
      {
        id: 'owner_name',
        label: 'Who is the primary user?',
        placeholder: 'Name, role, company...'
      },
      {
        id: 'owner_email',
        label: 'Primary user email and contact details',
        placeholder: 'e.g. alex@company.com'
      },
      {
        id: 'schedule',
        label: 'Schedule and timezone?',
        placeholder: 'e.g. Mon–Fri 9:00–18:00 CET'
      },
      {
        id: 'comm_style',
        label: 'How do they prefer to receive information?',
        type: 'select',
        options: [
          'Short and direct',
          'Context and detail',
          'Bullets always',
          'Prose when complex'
        ]
      },
      {
        id: 'team',
        label: 'Other team members the agent should know?',
        placeholder: 'Name · Role · What the agent can do for them...',
        multiline: true
      },
      {
        id: 'active_projects',
        label: 'Active projects the agent should know?',
        placeholder: 'Name · Status · Key context...',
        multiline: true
      },
      {
        id: 'hates',
        label: 'What do they hate assistants doing?',
        placeholder: 'e.g. Long answers for no reason, unnecessary questions...',
        multiline: true
      },
      {
        id: 'loves',
        label: 'What do they especially value?',
        placeholder: 'e.g. Confirm before acting, concrete examples...',
        multiline: true
      },
      {
        id: 'contacts',
        label: 'Clients or third parties to know by name?',
        placeholder: 'Name · Company · Relevant context...',
        multiline: true
      }
    ]
  },
  {
    id: 'tools',
    file: 'TOOLS.md',
    color: 'ink',
    label: '05',
    title: 'What it works with',
    subtitle: 'APIs, credentials, limits, and priorities',
    questions: [
      {
        id: 'tools_list',
        label: 'Which APIs or external systems does it use?',
        placeholder: 'e.g. Odoo API, GitHub, Unipile, Lusha, Telegram, Google Calendar...',
        multiline: true
      },
      {
        id: 'tools_caps',
        label: 'Per tool: what can it do and what not?',
        placeholder: 'e.g. Odoo: read+write CRM · GitHub: read issues, comment, never close...',
        multiline: true
      },
      {
        id: 'credentials',
        label: 'Where are credentials stored?',
        type: 'select',
        options: ['.env file', 'Secrets manager', 'OpenClaw keystore', 'Other']
      },
      {
        id: 'rate_limits',
        label: 'Usage limits the agent must respect?',
        placeholder: 'e.g. LinkedIn: 100 searches/day, Odoo: 100 req/min...',
        multiline: true
      },
      {
        id: 'tool_failure',
        label: 'What if a tool fails?',
        type: 'select',
        options: [
          'Retry once and notify',
          'Notify immediately, no retry',
          'Stop and wait for instructions',
          'Continue with what it can'
        ]
      },
      {
        id: 'tool_priority',
        label: 'Tool priority when several could solve the same task?',
        placeholder: 'e.g. 1. Memory · 2. Odoo · 3. GitHub · 4. Web search...',
        multiline: true
      },
      {
        id: 'planned_tools',
        label: 'Planned tools not connected yet?',
        placeholder: 'e.g. Google Calendar (OAuth pending), Slack (token pending)...',
        multiline: true
      }
    ]
  },
  {
    id: 'memory',
    file: 'MEMORY.md',
    color: 'acid',
    label: '06',
    title: 'What it must always remember',
    subtitle: 'Facts, patterns, and persistent context',
    questions: [
      {
        id: 'business_facts',
        label: 'Company/project facts that are always relevant?',
        placeholder: 'e.g. Digital agency, 8 people, main client is X...',
        multiline: true
      },
      {
        id: 'decisions',
        label: 'Important decisions already made (do not re‑litigate)?',
        placeholder: 'e.g. Always search before create, never delete records...',
        multiline: true
      },
      {
        id: 'patterns',
        label: 'Confirmed user patterns?',
        placeholder: 'e.g. Prefers activities over email, wants pipeline view in CRM...',
        multiline: true
      },
      {
        id: 'integrations',
        label: 'Technical config the agent should remember?',
        placeholder: 'e.g. Knowledge category ID 35, webhook on port 8443, UID=2...',
        multiline: true
      },
      {
        id: 'known_issues',
        label: 'Known issues and workarounds?',
        placeholder: 'e.g. Sign does not auto-archive → archive manually after signature...',
        multiline: true
      },
      {
        id: 'private',
        label: 'Information never to mention in shared contexts?',
        placeholder: 'e.g. Financials, credentials, sensitive client data...',
        multiline: true
      },
      {
        id: 'review_cycle',
        label: 'How often will this memory be reviewed and cleaned?',
        type: 'select',
        options: ['Weekly', 'Biweekly', 'Monthly', 'Quarterly']
      }
    ]
  },
  {
    id: 'heartbeat',
    file: 'HEARTBEAT.md',
    color: 'grape',
    label: '07',
    title: 'What it does without being asked',
    subtitle: 'Briefings, alerts, and proactive automation',
    questions: [
      {
        id: 'morning_check',
        label: 'What should it check every morning?',
        placeholder: 'e.g. Overdue activities, quotes awaiting reply, today’s tasks...',
        multiline: true
      },
      { id: 'morning_time', label: 'Morning briefing time?', placeholder: 'e.g. 08:30 CET' },
      {
        id: 'morning_channel',
        label: 'Which channel?',
        type: 'select',
        options: ['Telegram', 'Slack', 'Discord', 'Email', 'Other']
      },
      {
        id: 'eod',
        label: 'End-of-day summary you need?',
        placeholder: 'e.g. Actions taken, new leads, deals won/lost...',
        multiline: true
      },
      {
        id: 'weekly',
        label: 'Weekly reviews that make sense?',
        placeholder: 'e.g. Pipeline Mondays, projects Fridays, invoices Wednesdays...',
        multiline: true
      },
      {
        id: 'alerts',
        label: 'Which alerts must be immediate?',
        placeholder: 'e.g. New lead, overdue activity, pending signature, GitHub issue...',
        multiline: true
      },
      {
        id: 'autonomous_hb',
        label: 'What can the agent run alone without permission?',
        placeholder: 'e.g. Read memory files, update MEMORY.md, internal reports...',
        multiline: true
      },
      {
        id: 'always_confirm',
        label: 'What must always wait for confirmation?',
        placeholder: 'e.g. Send email, confirm sale, archive records, close issues...',
        multiline: true
      }
    ]
  }
]
