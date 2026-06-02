# Support

Index for repo readers. The live site mirrors most of this under **Help** on `/docs` (set `NUXT_PUBLIC_SITE_URL` on deploy).

## New here?

| Goal | Route |
|------|-------|
| Guided fill order with local progress | `/configure` (questionnaire) |
| Download or copy the seven `.md` files | `/docs` |
| See a real agent built with the spec | `/blog?tag=case-study` |
| Ecosystem (Cursor, MCPs, OpenClaw) | `/docs#ecosystem` |
| FAQ and how to report issues | `/docs#help` |

## FAQ

**Do not duplicate FAQ text in this file.** Answers live in:

- **Site:** `/docs#help`
- **Code:** [`composables/useSiteNav.ts`](../composables/useSiteNav.ts) — edit the `faq` array only

## Utilities

Utilities now live inside the **Build** flow and docs:

- **Configurator export** — download all seven files and a Cursor rules bundle from `/configure`
- **Validator** — paste-and-validate panel in the configurator guide

## Report a problem

Open a GitHub Issue and pick a template (blank issues are disabled):

- **Bug** — broken page, layout, or build
- **Question** — how to use the seven files or this site
- **Spec change** — proposal for `templates/` plus changelog entry

Use the repo’s **Issues → New issue** chooser. Set `NUXT_PUBLIC_REPO_URL` in `.env` if you fork the project.

Spec history for template changes lives under `content/changelog/` in this repo. See [CONTRIBUTING.md](../CONTRIBUTING.md) and [CHANGELOG.md](../CHANGELOG.md).

## Scope

Personal learning documentation and a free pattern — not a company, not a service SLA, and not a substitute for your own security review. See the landing page section “Who this is for”.
