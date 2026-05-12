# MEMORY.md — Long-Term Memory

Evergreen facts the agent should **assume true** until superseded. Not a
diary: daily scratch lives in `memory/[YYYY-MM-DD].md`. **Do not store
secrets** (passwords, API keys) here — use **Credentials References** for
*where* to look them up.

## User Preferences (confirmed)
- Prefers TypeScript strict mode
- Uses pnpm, not npm
- Dark terminals only
- Dislikes verbose code comments

## Ongoing Projects
- [Project A]: status + last action
- [Project B]: status + last action

## Known Patterns
- Always asks for the short version first
- Reviews code before deploying (never hot-push)
- Prefers dark color schemes in UI

## Important Facts
- Timezone: [UTC offset]
- Primary editor: [editor name]
- Deploys to: [platform]

## Credentials References
- API keys / tokens: stored in [e.g. 1Password item] or `.env` (never paste
  values into this file)
- SSH / signing: [e.g. macOS Keychain / hardware key]
- Repo access: [which account / PAT lives where]

## Resolved Issues
- [YYYY-MM-DD] [Problem] → [Resolution in one line]
- [YYYY-MM-DD] [Problem] → [Resolution]

## Memory Hygiene
Only promote here after confirmation or 2+ observations.
Never delete — move to Superseded with a date stamp.
Do not log PII you would not want in a shared repo.

## Superseded Information
- [YYYY-MM-DD] Was using X → now Y confirmed
