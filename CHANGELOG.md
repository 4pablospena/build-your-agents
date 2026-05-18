# Changelog

The **living spec history** is published on the deployed site at **`/changelog`**.

## Policy

Every change to `templates/*.md` must include a matching entry under `content/changelog/` in the **same commit**.

Each entry is one file (`file: soul | identity | agents | user | tools | memory | heartbeat`) with:

| Field    | Required | Description                                      |
| -------- | -------- | ------------------------------------------------ |
| `date`   | yes      | `YYYY-MM-DD` when the template changed           |
| `file`   | yes      | Agent file id (same as `useAgentFiles`)          |
| `reason` | yes      | One-line why                                     |
| `post`   | no       | Blog slug for context (e.g. `001-sabrina`)       |
| `title`  | no       | Short list heading (defaults to `reason`)        |

Filename pattern: `content/changelog/YYYY-MM-DD-<file>-<slug>.md`

Example:

```yaml
---
date: 2026-05-12
file: agents
reason: Expanded session-loop pseudocode and decision table.
post: 001-sabrina
---
```

Optional body markdown for longer notes; the list view uses frontmatter only.

## Do not

- Edit `templates/*.md` without a changelog entry in the same commit.
- Duplicate history only in this file — **content/changelog/** is the source of truth for the site.
