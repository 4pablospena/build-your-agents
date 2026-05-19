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

| File | Role |
|------|------|
| **SOUL.md** | Who the agent is — voice, values, hard limits |
| **AGENTS.md** | How it operates — workflows, decision rules, escalation |
| **MEMORY.md** | Evergreen facts — one line per fact, supersede only |

Full roles, memory layers, and session read order: **[`templates/README.md`](templates/README.md)** (canonical reading map, also at `/templates/README.md` after build).

Plain `.md` you version in git, drop into a folder, and point any capable model at as system context or workspace rules.

---

## Site map

| Route | What you get |
|-------|----------------|
| [`/`](pages/index.vue) | Landing — architecture, file graph, session loop, decision rules |
| [`/start`](pages/start.vue) | **Guided checklist** — fill order, time estimates, progress in the browser |
| [`/docs`](pages/docs.vue) | Per-file templates — preview, copy, download, ZIP, curl loop |
| [`/examples`](pages/examples.vue) | Case studies from the blog (`case-study` tag) |
| [`/openclaw`](pages/openclaw.vue) | Map the seven files to OpenClaw / Cursor / MCPs |
| [`/changelog`](pages/changelog.vue) | Living spec history (`content/changelog/`) |
| [`/help`](pages/help.vue) | FAQ, utilities, GitHub Issues |
| [`/tools`](pages/tools/index.vue) | Validator, Cursor rules export, global search |
| [`/tools/validate`](pages/tools/validate.vue) | Paste `.md` — check required `##` sections |
| [`/tools/cursor-rules`](pages/tools/cursor-rules.vue) | Download merged `.cursor/rules` bundle |
| [`/tools/search`](pages/tools/search.vue) | Search blog + changelog |
| [`/blog`](pages/blog/index.vue) | Journal — tags, search, pagination |
| [`/blog/<slug>`](pages/blog/) | Single post from `content/posts/*.md` |
| [`/rss.xml`](server/routes/rss.xml.ts) | RSS 2.0 feed (blog posts, newest first) |
| [`/sitemap.xml`](server/routes/sitemap.xml.ts) | Sitemap for static routes + published posts |
| [`/templates/*.md`](public/templates/) | Raw markdown — curl-friendly |
| [`/templates/build-your-agents.zip`](public/templates/build-your-agents.zip) | All templates in one archive (~7 KB) |

---

## Highlights

### Guided journey (`/start`)

Turns [`templates/README.md`](templates/README.md) into an interactive reading map:

- Checklist in recommended fill order: **SOUL → IDENTITY → AGENTS → USER → TOOLS → MEMORY → HEARTBEAT**
- ~27 minutes total for a first pass (per-step estimates)
- Each step links to its card on [`/docs`](pages/docs.vue) and its anchor on the home page (`#file-<id>`)
- Progress stored in `localStorage` — refresh the tab, nothing is lost
- Data from [`useAgentFiles()`](composables/useAgentFiles.ts) + journey metadata in [`useStartJourney.ts`](composables/useStartJourney.ts)

### Distribution (`/docs`)

- **Download all 7** — one-click ZIP (`build-your-agents.zip`, 8 files including README)
- **Curl loop** — `BASE` uses `NUXT_PUBLIC_SITE_URL` in production (falls back to `YOUR_ORIGIN` locally)
- Per-file **Download**, **Open raw**, **Copy**, and inline preview

### Blog & feed

- Posts in `content/posts/` with `@nuxt/content` v2
- Drafts hidden in production; visible in `pnpm dev`
- [`/rss.xml`](server/routes/rss.xml.ts) — dynamic RSS 2.0 with `atom:link rel="self"`; cached at the edge (`s-maxage=600`)
- Autodiscovery via `<link rel="alternate" type="application/rss+xml">` in `nuxt.config.ts`

### Footer & navigation

- Navigation: [`composables/useSiteNav.ts`](composables/useSiteNav.ts) · prerender/sitemap: [`config/staticRoutes.ts`](config/staticRoutes.ts)
- Header: Architecture · The 7 files · Session · **Start** · Docs · Examples · Tools · **Help** · Blog · Changelog
- Footer: Spec · all **7 files** · Tools · Follow (Blog, GitHub, RSS, Changelog, Help, Issues)
- OpenClaw: `/openclaw` (footer + home “New here?” strip — not in the main header)

### Getting help

- **[`/help`](pages/help.vue)** — FAQ, links to `/start` and `/docs`, utilities under `/tools`
- **[`docs/SUPPORT.md`](docs/SUPPORT.md)** — repo index (FAQ text only in `useSiteNav.ts` / `/help`)
- **GitHub Issues** — [open with a template](https://github.com/4pablospena/build-your-agents/issues/new/choose) (bug, question, spec change)
- **Contributing** — [`CONTRIBUTING.md`](CONTRIBUTING.md) (templates + changelog policy)

---

## Design

**Brutalist colorful** — thick black strokes, saturated palette, hard shadows, asymmetric layout.

| Token | Fonts |
|-------|--------|
| Display | Archivo Black |
| Body / quotes | Fraunces |
| UI / code | Space Mono |

Landing and spec pages use handcrafted tokens in [`assets/css/main.css`](assets/css/main.css). The blog uses Tailwind + `@tailwindcss/typography` with Preflight scoped so prose does not clash with the main design system.

---

## Stack

- **Nuxt 3** — SSR, file-based routing, Nitro `vercel` preset
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
pnpm generate     # static export (.vercel/output/static)
```

Use [pnpm](https://pnpm.io/) — the repo pins `pnpm@9.15.9` under `packageManager`. Enable via Corepack:

```bash
corepack enable
corepack prepare pnpm@9.15.9 --activate
```

### Build pipeline

Every `build`, `generate`, and `postinstall` runs:

| Step | Script | Output |
|------|--------|--------|
| 1 | `scripts/sync-templates.mjs` | `templates/*.md` → `public/templates/` |
| 2 | `scripts/build-zip.mjs` | `public/templates/build-your-agents.zip` |
| 3 | `scripts/generate-og.mjs` | `public/og.png` (1200×630 from `assets/og-card.svg`) |
| 4 | `nuxt build` / `nuxt generate` | `.vercel/output/…` |

Verify the ZIP after a build:

```bash
unzip -tq public/templates/build-your-agents.zip
```

---

## Environment

Copy [`.env.example`](.env.example) to `.env` for local overrides:

| Variable | Purpose |
|----------|---------|
| `NUXT_PUBLIC_SITE_URL` | Public site URL **without** trailing slash. Used for Open Graph (`og:url`, `og:image`), the curl `BASE` on `/docs`, canonical links in `/rss.xml` and `/sitemap.xml`. |
| `NUXT_PUBLIC_REPO_URL` | GitHub repo URL for footer, `/help`, and issue links (defaults to this repository). |

On Vercel, set the same variable in **Production** and redeploy after changes.

---

## Deploy (Vercel)

1. Import the repo — Vercel detects **pnpm** from `pnpm-lock.yaml`.
2. **Build command:** `pnpm run build`
3. **Node.js:** 20.x or 22.x (`engines.node` in `package.json`)
4. **Environment:** `NUXT_PUBLIC_SITE_URL=https://your-domain.com` (no trailing slash)
5. Deploy

`sharp` is a runtime dependency so `generate-og.mjs` succeeds on Vercel’s build image.

Nitro uses `preset: 'vercel'`. Static prerender includes `/blog` and each published post (`draft: true` omitted). `/rss.xml` is **not** prerendered — it resolves the live origin at request time so feed URLs stay canonical when `NUXT_PUBLIC_SITE_URL` is set.

Validate the feed after deploy: [validator.w3.org/feed](https://validator.w3.org/feed/)

---

## Blog (`content/posts`)

Posts live under `content/posts/*.md` with YAML frontmatter:

`title`, `description`, `date`, `tags`, optional `cover`, optional `draft`, optional `author` / `authorIntro`.

| Mode | Drafts |
|------|--------|
| `pnpm dev` | Visible in index and directly reachable |
| `pnpm build` / production | Excluded from listings, 404 if visited, not prerendered |

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
│   ├── docs.vue                # templates + zip + curl
│   ├── start.vue               # guided checklist
│   ├── help.vue                # FAQ + support
│   ├── examples.vue            # case studies
│   ├── changelog.vue           # spec history
│   ├── openclaw.vue            # ecosystem map
│   ├── tools/                  # validator, cursor-rules, search
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
│   ├── useStartJourney.ts      # journey order + localStorage progress
│   ├── useSiteNav.ts           # header/footer/help navigation
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

**Shipped (waves 0–8):** ZIP + RSS, `/start`, `/examples`, `/changelog`, `/openclaw`, `FileGraph`, blog ↔ docs links, `/tools/*`, and support UX (`/help`, `useSiteNav`, GitHub issue templates).

Current and future work: [`.cursor/next-steps.md`](.cursor/next-steps.md).

---

## License

MIT — see [LICENSE](LICENSE).
