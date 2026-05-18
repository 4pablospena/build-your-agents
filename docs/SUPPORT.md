# Support

This document mirrors the live **`/help`** page on the deployed site (set `NUXT_PUBLIC_SITE_URL` in your environment). Prefer the website when links need to stay relative to your host.

## New here?

| Goal | Route |
|------|-------|
| Guided fill order with local progress | `/start` |
| Download or copy the seven `.md` files | `/docs` |
| See a real agent built with the spec | `/examples` |
| Map files to OpenClaw / Cursor / MCPs | `/openclaw` |
| FAQ and how to report issues | `/help` |

## FAQ

### Where do I start?

Use `/start` for the recommended fill order (SOUL → IDENTITY → AGENTS → USER → TOOLS → MEMORY → HEARTBEAT). Download blanks from `/docs` or curl the ZIP from `/templates/build-your-agents.zip`.

### Daily notes vs MEMORY.md?

Use `memory/[YYYY-MM-DD].md` for scratchpad and session summaries. Promote only confirmed facts to **MEMORY.md** — one line per fact, supersede instead of delete.

### Does HEARTBEAT run by itself?

No. **HEARTBEAT.md** is the checklist an external scheduler or product trigger should run. It does not install cron — you wire triggers yourself and keep “needs confirmation” tasks explicit.

### ZIP or curl?

Both ship the same files from `templates/`. ZIP is one click on `/docs`; curl is better for scripts. Set `NUXT_PUBLIC_SITE_URL` on deploy so the curl `BASE` is your live origin.

### Which file holds voice vs workflows?

**SOUL.md** — who the agent is and hard limits. **AGENTS.md** — session order, workflows, and decision rules. Use the placement wizard on the home page or `/start` if unsure.

### How do I propose a change to the spec?

Open a [GitHub Issue](https://github.com/4pablospena/build-your-agents/issues/new/choose) (spec change template), edit `templates/*.md`, and add a matching entry under `content/changelog/` in the same PR. See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Utilities (`/tools`)

| Tool | Path |
|------|------|
| Markdown validator | `/tools/validate` |
| Cursor rules export | `/tools/cursor-rules` |
| Search blog & changelog | `/tools/search` |

## Report a problem

Use [GitHub Issues](https://github.com/4pablospena/build-your-agents/issues/new/choose) and pick a template:

- **Bug** — broken page, layout, or build
- **Question** — how to use the seven files or this site
- **Spec change** — proposal for `templates/` plus changelog entry

Blank issues are disabled. The live spec history is at `/changelog` (`content/changelog/`).

## Scope

This project is personal learning documentation and a free pattern — not a company, not a service SLA, and not a substitute for your own security and data review. See the landing page section “Who this is for”.
