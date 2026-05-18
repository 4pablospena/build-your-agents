# Support

Index for repo readers. The live site mirrors most of this at **`/help`** (set `NUXT_PUBLIC_SITE_URL` on deploy).

## New here?

| Goal | Route |
|------|-------|
| Guided fill order with local progress | `/start` |
| Download or copy the seven `.md` files | `/docs` |
| See a real agent built with the spec | `/examples` |
| Map files to OpenClaw / Cursor / MCPs | `/openclaw` |
| FAQ and how to report issues | `/help` |

## FAQ

**Do not duplicate FAQ text in this file.** Answers live in:

- **Site:** `/help`
- **Code:** [`composables/useSiteNav.ts`](../composables/useSiteNav.ts) — edit the `faq` array only

## Utilities (`/tools`)

| Tool | Path |
|------|------|
| Markdown validator | `/tools/validate` |
| Cursor rules export | `/tools/cursor-rules` |
| Search blog & changelog | `/tools/search` |

## Report a problem

Open a GitHub Issue and pick a template (blank issues are disabled):

- **Bug** — broken page, layout, or build
- **Question** — how to use the seven files or this site
- **Spec change** — proposal for `templates/` plus changelog entry

Use the repo’s **Issues → New issue** chooser. Set `NUXT_PUBLIC_REPO_URL` in `.env` if you fork the project.

Spec history on the site: `/changelog` (`content/changelog/`). See [CONTRIBUTING.md](../CONTRIBUTING.md) and [CHANGELOG.md](../CHANGELOG.md).

## Scope

Personal learning documentation and a free pattern — not a company, not a service SLA, and not a substitute for your own security review. See the landing page section “Who this is for”.
