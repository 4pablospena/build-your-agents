# Seven-file agent spec — reading map

Plain markdown files you drop in a folder and point your model at (system
prompt, workspace rules, or product-specific “rules” UI). **No vendor
format** — edit in any editor, diff in git.

## What each file does

| File | Role |
|------|------|
| **SOUL.md** | The *agent*: voice, values, capabilities, limits. |
| **IDENTITY.md** | Where it “lives”: metadata, models, routing hints. |
| **AGENTS.md** | The *conductor*: session order, workflows, rules. |
| **USER.md** | The *human*: preferences, projects, people, tasks. |
| **MEMORY.md** | Evergreen facts (confirmed). Not a diary. |
| **HEARTBEAT.md** | Scheduled tasks — needs an external trigger. |
| **TOOLS.md** | Capabilities map: tools, MCPs, selection order. |

## Memory: two layers

- **`memory/[YYYY-MM-DD].md`** — scratchpad for the day; session summaries;
  safe to be messy.
- **MEMORY.md** — long-term, one fact per line; supersede, never delete.
  Promote only after confirmation or repeated observation.

## Suggested read order (new session)

See **AGENTS.md → Session Start Checklist**. Short version: USER → MEMORY →
today’s `memory/` file → HEARTBEAT → greet in SOUL’s tone.

## Downloads

Each `*.md` in this folder is also available at `/templates/<filename>` on
the site for curl, save-as, or copy-paste.

## On the website

When this repo is deployed (set `NUXT_PUBLIC_SITE_URL` to your public origin):

| Path | Purpose |
|------|---------|
| `/start` | Interactive checklist — recommended fill order with local progress |
| `/docs` | Per-file preview, copy, download, and **build-your-agents.zip** |
| `/help` | FAQ, utilities, and how to open a GitHub Issue |

Relative URLs work on any host; absolute curl examples on `/docs` use your configured site URL in production.
