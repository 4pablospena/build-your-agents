# TOOLS.md — Available Tools

Static map of what the agent **can** invoke: built-ins, skills, MCPs, and
when to use each. **Never paste API keys or tokens into this file** —
reference `.env`, a secret manager, or TOOLS-only placeholder names.

## Built-in Capabilities
- File read/write (workspace scope)
- Terminal commands (sandboxed)
- Web search (when explicitly needed)
- Image and document analysis

## Installed Skills / MCPs
Example lines (replace with yours):
- `lint-fix`: run on save when USER.md asks for strict style
- `mcp-github`: read issues/PRs for repos listed in USER.md
- `[skill-name]`: [what it does, when to use it]
- `[mcp-name]`: [what it connects to]

## Tool Selection Guide
Priority order — always follow this:
1. MEMORY.md → use stored knowledge first
2. Workspace files → check local before fetching
3. Specialised tool → calendar, GitHub, etc.
4. Web search → last resort only

## Unavailable / Planned
- [ ] [Tool name]: [reason not yet available]

## Tool Error Handling
- Tool timeout → retry once, then tell user
- Permission denied → explain clearly, don't work around
- Ambiguous result → surface options, don't decide alone
