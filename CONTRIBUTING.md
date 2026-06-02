# Contributing

Thanks for helping improve **build/your/agents**. This repo ships two things:

1. **The seven-file spec** — canonical markdown in [`templates/`](templates/).
2. **The documentation site** — Nuxt app in [`pages/`](pages/), [`components/`](components/), and [`composables/`](composables/).

## Before you open a PR

1. Skim the Help section on `/docs` (FAQ lives in code: `composables/useSiteNav.ts`). Repo index: [`docs/SUPPORT.md`](docs/SUPPORT.md).
2. Open a [GitHub Issue](https://github.com/4pablospena/build-your-agents/issues/new/choose) if you are unsure which template fits.

## Changing the agent templates

Every change to `templates/*.md` **must** include a matching entry under [`content/changelog/`](content/changelog/) in the **same commit**.

See [`CHANGELOG.md`](CHANGELOG.md) for frontmatter fields (`date`, `file`, `reason`, optional `post`).

Filename pattern:

```text
content/changelog/YYYY-MM-DD-<file>-<slug>.md
```

After editing templates, run:

```bash
pnpm build
```

That syncs `templates/` → `public/templates/`, rebuilds the ZIP, and verifies the site.

## Changing the site

- **Navigation** — update [`composables/useSiteNav.ts`](composables/useSiteNav.ts) and [`config/staticRoutes.ts`](config/staticRoutes.ts). See [`.cursor/rules/site-nav.mdc`](.cursor/rules/site-nav.mdc).
- **Seven-file metadata** — prefer [`composables/useAgentFiles.ts`](composables/useAgentFiles.ts) as the single source of truth.
- **Blog posts** — add markdown under `content/posts/` with frontmatter; use tag `case-study` and optional `filesTouched` for `/examples`.

## Local development

```bash
pnpm install
pnpm dev
```

Copy [`.env.example`](.env.example) to `.env` when testing absolute URLs (Open Graph, curl `BASE`, RSS, sitemap).

| Variable | Purpose |
|----------|---------|
| `NUXT_PUBLIC_SITE_URL` | Public site URL, no trailing slash |
| `NUXT_PUBLIC_REPO_URL` | GitHub repo for issue/footer links |

## Pull request checklist

- [ ] `pnpm build` succeeds
- [ ] Template edits include `content/changelog/` entry (if applicable)
- [ ] New public routes added to `useSiteNav`, `config/staticRoutes.ts`, and README site map
- [ ] Copy stays honest (see `AudienceFit` on the landing page — no SLA or compliance claims)

## License

By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).
