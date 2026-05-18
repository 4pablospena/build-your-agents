// Spec changelog — one markdown file per entry under content/changelog/.
// File metadata (color, symbol, filename) comes from useAgentFiles(); this
// composable owns query helpers and the “recent update” window for /docs.

import type { AgentFileId } from './useAgentFiles.types'

/** Show the /docs banner when the latest entry is newer than this many days. */
export const CHANGELOG_RECENT_DAYS = 14

export type ChangelogEntry = {
  _path?: string
  _id?: string
  /** YYYY-MM-DD */
  date: string
  /** Agent file id — matches useAgentFiles().files[].id */
  file: AgentFileId
  /** One-line why the template changed. */
  reason: string
  /** Optional short label for the list (defaults to reason). */
  title?: string
  /** Optional blog slug (no /blog/ prefix), e.g. 001-sabrina */
  post?: string
}

export function useChangelogListQuery() {
  return queryContent<ChangelogEntry>('changelog').sort({ date: -1 })
}

export function changelogSlugFromPath(path: string): string {
  return path.replace(/^\/changelog\//, '').replace(/\/$/, '')
}

export function parseChangelogDate(date: string): Date | null {
  const d = new Date(`${date}T12:00:00`)
  return Number.isNaN(d.getTime()) ? null : d
}

export function isChangelogRecent(
  date: string,
  days: number = CHANGELOG_RECENT_DAYS,
  now: Date = new Date()
): boolean {
  const d = parseChangelogDate(date)
  if (!d) return false
  const ms = days * 24 * 60 * 60 * 1000
  return now.getTime() - d.getTime() <= ms
}

export function latestChangelogEntry(entries: ChangelogEntry[]): ChangelogEntry | null {
  if (!entries.length) return null
  return [...entries].sort((a, b) => {
    const byDate = String(b.date).localeCompare(String(a.date))
    if (byDate !== 0) return byDate
    return String(b._path || '').localeCompare(String(a._path || ''))
  })[0]!
}

/** Latest entry only if it falls inside the recent window (for /docs banner). */
export function latestRecentChangelogEntry(
  entries: ChangelogEntry[],
  days: number = CHANGELOG_RECENT_DAYS
): ChangelogEntry | null {
  const latest = latestChangelogEntry(entries)
  if (!latest || !isChangelogRecent(latest.date, days)) return null
  return latest
}

export function formatChangelogDate(date: string): string {
  const d = parseChangelogDate(date)
  if (!d) return date
  try {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(d)
  } catch {
    return date
  }
}

export function changelogPostHref(slug: string | undefined): string | null {
  const s = String(slug || '').trim()
  if (!s) return null
  return `/blog/${s.replace(/^\/blog\//, '')}`
}
