// Single source of truth for site navigation, help copy, and support URLs.

import { toolsNav } from '~/composables/useToolsNav'

export type SiteNavLink = {
  label: string
  to: string
  id: string
  external?: boolean
}

export type NewHereCard = {
  title: string
  body: string
  to: string
  cta: string
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

  const learnLinks: SiteNavLink[] = [
    { label: 'Architecture', to: '/#architecture', id: 'architecture' },
    { label: 'The 7 files', to: '/#files', id: 'files' },
    { label: 'Session', to: '/#session-loop', id: 'session-loop' }
  ]

  const useLinks: SiteNavLink[] = [
    { label: 'Start', to: '/start', id: 'start-page' },
    { label: 'Docs', to: '/docs', id: 'docs-page' },
    { label: 'Examples', to: '/examples', id: 'examples-page' },
    { label: 'Tools', to: '/tools', id: 'tools-page' }
  ]

  const metaLinks: SiteNavLink[] = [
    { label: 'Help', to: '/help', id: 'help-page' },
    { label: 'Blog', to: '/blog', id: 'blog-page' },
    { label: 'Changelog', to: '/changelog', id: 'changelog-page' }
  ]

  /** Primary header: learn anchors + use/meta routes (no Overview, no OpenClaw). */
  const headerLinks: SiteNavLink[] = [...learnLinks, ...useLinks, ...metaLinks]

  /** Footer Spec column — stable labels, includes OpenClaw (not in header). */
  const footerSpecLinks: SiteNavLink[] = [
    ...learnLinks,
    { label: 'Reading map', to: '/start', id: 'start-page' },
    { label: 'Examples', to: '/examples', id: 'examples-page' },
    { label: 'OpenClaw & MCPs', to: '/openclaw', id: 'openclaw-page' },
    { label: 'Markdown templates', to: '/docs', id: 'docs-page' }
  ]

  /** Footer Follow column — in-site meta routes (externals rendered separately). */
  const footerFollowLinks: SiteNavLink[] = [...metaLinks]

  const newHereCards: NewHereCard[] = [
    {
      title: 'Start the checklist',
      body: 'Guided fill order with local progress — about 27 minutes for a first pass.',
      to: '/start',
      cta: 'Open /start'
    },
    {
      title: 'Download templates',
      body: 'Preview, copy, or grab all seven files as a ZIP from /docs.',
      to: '/docs',
      cta: 'Open /docs'
    },
    {
      title: 'See a real case',
      body: 'Field notes from agents shipped with the spec (e.g. B2B prospecting).',
      to: '/examples',
      cta: 'Open /examples'
    },
    {
      title: 'OpenClaw & MCPs',
      body: 'Map the seven files to a workspace, Cursor rules, or tool surfaces.',
      to: '/openclaw',
      cta: 'Open /openclaw'
    },
    {
      title: 'Get help',
      body: 'FAQ, utilities, and how to open a GitHub Issue.',
      to: '/help',
      cta: 'Open /help'
    }
  ]

  const faq: HelpFaq[] = [
    {
      q: 'Where do I start?',
      a: 'Use /start for the recommended fill order (SOUL → IDENTITY → AGENTS → USER → TOOLS → MEMORY → HEARTBEAT). Download blanks from /docs or curl the ZIP from /templates/build-your-agents.zip.'
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
      a: 'Both ship the same files from templates/. ZIP is one click on /docs; curl is better for scripts. Set NUXT_PUBLIC_SITE_URL on deploy so the curl BASE is your live origin.'
    },
    {
      q: 'Which file holds voice vs workflows?',
      a: 'SOUL.md — who the agent is and hard limits. AGENTS.md — session order, workflows, and decision rules. Use the placement wizard on the home page or /start if unsure.'
    },
    {
      q: 'How do I propose a change to the spec?',
      a: 'Open a GitHub Issue (spec change template), edit templates/*.md, and add a matching entry under content/changelog/ in the same commit. See CONTRIBUTING.md in the repo.'
    }
  ]

  return {
    repoUrl,
    issuesUrl,
    learnLinks,
    useLinks,
    metaLinks,
    headerLinks,
    footerSpecLinks,
    footerFollowLinks,
    newHereCards,
    faq,
    toolsNav
  }
}
