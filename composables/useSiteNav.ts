// Single source of truth for site navigation, help copy, and support URLs.

export type SiteNavLink = {
  label: string
  to: string
  id: string
  external?: boolean
}

export type HelpFaq = {
  q: string
  a: string
}

const DEFAULT_REPO_URL = 'https://github.com/4pablospena/build-your-agents'

export function useSiteNav() {
  const config = useRuntimeConfig()
  const repoUrl = String(config.public.repoUrl || DEFAULT_REPO_URL).replace(/\/$/, '')
  const issuesUrl = `${repoUrl}/issues/new/choose`

  /** Primary header — six items + brand CTA. */
  const headerLinks: SiteNavLink[] = [
    { label: 'Home', to: '/', id: 'top' },
    { label: 'Build', to: '/configure', id: 'configure-page' },
    { label: 'Templates', to: '/docs', id: 'docs-page' },
    { label: 'Learn', to: '/#architecture', id: 'architecture' },
    { label: 'Blog', to: '/blog', id: 'blog-page' },
    { label: 'Help', to: '/docs#help', id: 'help-page' }
  ]

  const footerSpecLinks: SiteNavLink[] = [
    { label: 'Build agent', to: '/configure', id: 'configure-page' },
    { label: 'Templates', to: '/docs', id: 'docs-page' },
    { label: 'Architecture', to: '/#architecture', id: 'architecture' },
    { label: 'The 7 files', to: '/#files', id: 'files' },
    { label: 'Session loop', to: '/#session-loop', id: 'session-loop' }
  ]

  const footerFollowLinks: SiteNavLink[] = [
    { label: 'Blog', to: '/blog', id: 'blog-page' },
    { label: 'Case studies', to: '/blog?tag=case-study', id: 'examples-page' },
    { label: 'Changelog', to: '/docs#changelog', id: 'changelog-page' },
    { label: 'Ecosystem', to: '/docs#ecosystem', id: 'openclaw-page' }
  ]

  const faq: HelpFaq[] = [
    {
      q: 'Where do I start?',
      a: 'Open Build (/configure), answer the questionnaire, and download all seven files. For blank templates only, use Templates (/docs) or the ZIP.'
    },
    {
      q: 'Daily notes vs MEMORY.md?',
      a: 'Use memory/[YYYY-MM-DD].md for scratchpad and session summaries. Promote only confirmed facts to MEMORY.md — one line per fact, supersede instead of delete.'
    },
    {
      q: 'Does HEARTBEAT run by itself?',
      a: 'No. HEARTBEAT.md is the checklist an external scheduler or product trigger should run. It does not install cron — you wire triggers yourself and keep “needs confirmation” tasks explicit.'
    },
    {
      q: 'ZIP or curl?',
      a: 'Both ship the same files from templates/. ZIP is one click on /docs; curl is better for scripts. Set NUXT_PUBLIC_SITE_URL so the curl BASE is your live origin.'
    },
    {
      q: 'Which file holds voice vs workflows?',
      a: 'SOUL.md — who the agent is and hard limits. AGENTS.md — session order, workflows, and decision rules. Use the placement wizard on the home page if unsure.'
    },
    {
      q: 'How do I propose a change to the spec?',
      a: 'Open a GitHub Issue (spec change template), edit templates/*.md, and add a matching entry under content/changelog/ in the same commit. See CONTRIBUTING.md in the repo.'
    }
  ]

  return {
    repoUrl,
    issuesUrl,
    headerLinks,
    footerSpecLinks,
    footerFollowLinks,
    faq
  }
}
