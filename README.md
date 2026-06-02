# build/your/agents

**An open spec for personal AI agents — readable by humans, executable by models.**

Seven markdown files. No black box. No vendor lock-in. This site documents the architecture, ships the templates, and publishes field notes as you build.

<p align="center">
  <a href="https://github.com/4pablospena/build-your-agents">GitHub</a>
  ·
  <a href="templates/">Templates</a>
  ·
  <a href=".cursor/next-steps.md">Roadmap</a>
  ·
  <a href="docs/SUPPORT.md">Support</a>
  ·
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

---

## The seven files

| File          | Role                                                    |
| ------------- | ------------------------------------------------------- |
| **SOUL.md**   | Who the agent is — voice, values, hard limits           |
| **AGENTS.md** | How it operates — workflows, decision rules, escalation |
| **MEMORY.md** | Evergreen facts — one line per fact, supersede only     |

Full roles, memory layers, and session read order: **[`templates/README.md`](templates/README.md)** (canonical reading map, also at `/templates/README.md` after build).

Plain `.md` you version in git, drop into a folder, and point any capable model at as system context or workspace rules.

---

## Site map

| Route                                                                        | What you get                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [`/`](pages/index.vue)                                                       | Landing — architecture, file graph, session loop, decision rules              |
| [`/configure`](pages/configure.vue)                                          | **Agent configurator** — questionnaire → filled seven-file markdown, download |
| [`/docs`](pages/docs.vue)                                                    | Per-file templates — preview, copy, download, ZIP, curl loop                  |
| [`/blog`](pages/blog/index.vue)                                              | Journal — tags, search, pagination                                            |
| [`/blog/<slug>`](pages/blog/)                                                | Single post from `content/posts/*.md`                                         |
| [`/rss.xml`](server/routes/rss.xml.ts)                                       | RSS 2.0 feed (blog posts, newest first)                                       |
| [`/sitemap.xml`](server/routes/sitemap.xml.ts)                               | Sitemap for static routes + published posts                                   |
| [`/templates/*.md`](public/templates/)                                       | Raw markdown — curl-friendly                                                  |
| [`/templates/build-your-agents.zip`](public/templates/build-your-agents.zip) | All templates in one archive (~7 KB)                                          |

---

## Highlights

### Agent configurator (`/configure`)

Interactive questionnaire that maps your answers onto the official templates in [`templates/`](templates/) (same `##` sections as [`/docs`](pages/docs.vue)):

- Seven steps aligned with fill order: **SOUL → IDENTITY → AGENTS → USER → TOOLS → MEMORY → HEARTBEAT**
- Draft saved in `localStorage` (`bya:configure:answers:v1`)
- Export: copy, per-file download, or all seven — validated against [`useAgentFiles()`](composables/useAgentFiles.ts) sections
- Logic in [`useAgentConfigurator.renderer.ts`](composables/useAgentConfigurator.renderer.ts)

### Distribution (`/docs`)

- **Download all 7** — one-click ZIP (`build-your-agents.zip`, 8 files including README)
- **Curl loop** — `BASE` uses `NUXT_PUBLIC_SITE_URL` when set (falls back to `YOUR_ORIGIN` locally)
- Per-file **Download**, **Open raw**, **Copy**, and inline preview

### Blog & feed

- Posts in `content/posts/` with `@nuxt/content` v2
- Drafts hidden in production; visible in `pnpm dev`
- [`/rss.xml`](server/routes/rss.xml.ts) — dynamic RSS 2.0 with `atom:link rel="self"`; cached at the edge (`s-maxage=600`)
- Autodiscovery via `<link rel="alternate" type="application/rss+xml">` in `nuxt.config.ts`

### Footer & navigation

- Navigation: [`composables/useSiteNav.ts`](composables/useSiteNav.ts) · prerender/sitemap: [`config/staticRoutes.ts`](config/staticRoutes.ts)
- Header: Home · Build · Templates · Learn · Blog · Help (+ Build agent CTA)
- Footer: Spec (Build, Templates, Architecture, The 7 files, Session loop) · Follow (Blog, Case studies, Changelog, Ecosystem, Issues)

### Getting help

- **Docs Help section** — `/docs#help` (FAQ + how to get support)
- **[`docs/SUPPORT.md`](docs/SUPPORT.md)** — repo index (routes and utilities)
- **GitHub Issues** — [open with a template](https://github.com/4pablospena/build-your-agents/issues/new/choose) (bug, question, spec change)
- **Contributing** — [`CONTRIBUTING.md`](CONTRIBUTING.md) (templates + changelog policy)

---

## Design

**Brutalist colorful** — thick black strokes, saturated palette, hard shadows, asymmetric layout.

| Token         | Fonts         |
| ------------- | ------------- |
| Display       | Archivo Black |
| Body / quotes | Fraunces      |
| UI / code     | Space Mono    |

Landing and spec pages use handcrafted tokens in [`assets/css/main.css`](assets/css/main.css). The blog uses Tailwind + `@tailwindcss/typography` with Preflight scoped so prose does not clash with the main design system.

---

## Stack

- **Nuxt 3** — SSR, file-based routing
- **Vue 3** — `<script setup lang="ts">`, Composition API
- **Single source of truth** — [`composables/useAgentFiles.ts`](composables/useAgentFiles.ts) for all seven-file metadata and markdown bodies
- **Content** — `@nuxt/content` v2 for the blog
- **Build** — Node scripts for template sync, ZIP packaging, OG image generation (`sharp`)

---

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # sync templates → zip → og.png → production build
pnpm generate     # static export
```

Use [pnpm](https://pnpm.io/) — the repo pins `pnpm@9.15.9` under `packageManager`. Enable via Corepack:

```bash
corepack enable
corepack prepare pnpm@9.15.9 --activate
```

### Build pipeline

Every `build`, `generate`, and `postinstall` runs:

| Step | Script                         | Output                                                                     |
| ---- | ------------------------------ | -------------------------------------------------------------------------- |
| 1    | `scripts/sync-templates.mjs`   | `templates/*.md` → `public/templates/`                                     |
| 2    | `scripts/build-zip.mjs`        | `public/templates/build-your-agents.zip`                                   |
| 3    | `scripts/generate-og.mjs`      | `public/og.png` (1200×630 from `assets/og-card.svg`)                       |
| 4    | `nuxt build` / `nuxt generate` | Nuxt production output                                         |

Verify the ZIP after a build:

```bash
unzip -tq public/templates/build-your-agents.zip
```

---

## Environment

Copy [`.env.example`](.env.example) to `.env` for local overrides:

| Variable               | Purpose                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NUXT_PUBLIC_SITE_URL` | Public site URL **without** trailing slash. Used for Open Graph (`og:url`, `og:image`), the curl `BASE` on `/docs`, canonical links in `/rss.xml` and `/sitemap.xml`. |
| `NUXT_PUBLIC_REPO_URL` | GitHub repo URL for footer and issue links (defaults to this repository).                                                                                            |

---

## Blog (`content/posts`)

Posts live under `content/posts/*.md` with YAML frontmatter:

`title`, `description`, `date`, `tags`, optional `cover`, optional `draft`, optional `author` / `authorIntro`.

| Mode                      | Drafts                                                  |
| ------------------------- | ------------------------------------------------------- |
| `pnpm dev`                | Visible in index and directly reachable                 |
| Production build          | Excluded from listings, 404 if visited, not prerendered |

Helpers: [`composables/useBlogPosts.ts`](composables/useBlogPosts.ts) — `useBlogPostListQuery()`, reading time, prev/next navigation.

---

## Agent templates

Canonical markdown: [`templates/`](templates/). Reading map: [`templates/README.md`](templates/README.md) (also at `/templates/README.md` after sync).

```
curl -fsSL "$BASE/templates/SOUL.md" -o SOUL.md
# or grab everything:
curl -fsSL "$BASE/templates/build-your-agents.zip" -o build-your-agents.zip
```

---

## Project layout

```
build-your-agents/
├── app.vue
├── nuxt.config.ts              # head, OG, RSS autodiscovery, prerender hooks
├── pages/
│   ├── index.vue               # landing
│   ├── docs.vue                # templates + zip + curl + help/changelog/ecosystem sections
│   ├── configure.vue           # agent questionnaire → filled templates + Cursor bundle
│   └── blog/
│       ├── index.vue
│       └── [...slug].vue
├── server/
│   └── routes/
│       ├── rss.xml.ts          # dynamic RSS 2.0 feed
│       └── sitemap.xml.ts      # sitemap
├── content/posts/*.md
├── components/                 # AppHeader, HeroSection, FileCard, …
├── composables/
│   ├── useAgentFiles.ts        # seven-file spec (single source of truth)
│   ├── useAgentFiles.types.ts
│   ├── useBlogPosts.ts
│   ├── useSiteNav.ts           # header/footer navigation, FAQ, support links
│   └── (see config/staticRoutes.ts)
├── config/
│   └── staticRoutes.ts         # prerender + sitemap route list
├── templates/*.md              # canonical agent files + README
├── scripts/
│   ├── sync-templates.mjs
│   ├── build-zip.mjs
│   └── generate-og.mjs
├── assets/css/main.css
└── public/
    ├── og.png
    └── templates/              # synced .md + build-your-agents.zip
```

Route views stay thin; feature UI lives in components; shared data in composables.

---

## Roadmap

**Shipped (waves 0–8):** ZIP + RSS, `FileGraph`, `/configure` agent configurator, merged docs/help/changelog/ecosystem sections, and support UX (FAQ in `useSiteNav`, GitHub issue templates).

Current and future work: [`.cursor/next-steps.md`](.cursor/next-steps.md).

---

## License

MIT — see [LICENSE](LICENSE).
