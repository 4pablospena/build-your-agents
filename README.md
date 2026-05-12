# build/your/agents

A Nuxt 3 + Vue 3 landing page that documents the seven-file architecture
for building personal AI agents (Soul, Identity, Agents, User, Memory,
Heartbeat, Tools).

Style: **brutalist colorful** — thick black strokes, saturated palette,
asymmetric layout, Archivo Black + Fraunces + Space Mono.

## Stack

- Nuxt 3 (SSR, file-based routing)
- Vue 3 with `<script setup lang="ts">` (Composition API)
- One composable as single source of truth: `composables/useAgentFiles.ts`
- No CSS framework — handcrafted design tokens in `assets/css/main.css`

## Pages

| Route   | Description |
| ------- | ----------- |
| `/`     | Landing: hero, architecture map, file cards, session loop, docs CTA |
| `/docs` | Full markdown documentation for each of the seven agent files |

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # sync templates → public, generate og.png, production build
npm run generate     # static site → .output/public
```

## Environment

Copy `.env.example` to `.env` when deploying:

| Variable | Purpose |
| -------- | ------- |
| `NUXT_PUBLIC_SITE_URL` | Public site URL **without** trailing slash. Used for `og:url` and absolute `og:image` / `twitter:image` in `nuxt.config.ts`. |

## Agent markdown templates

Canonical markdown lives in `templates/*.md` (Soul, Identity, Agents, User,
Memory, Heartbeat, Tools). `scripts/sync-templates.mjs` copies them into
`public/templates/` so they can be fetched or linked in production.

`assets/og-card.svg` is the vector source for the social preview image;
`scripts/generate-og.mjs` (uses `sharp`) renders `public/og.png` (1200×630) for
Facebook, LinkedIn, X, etc.

## Architecture (frontend)

```
build-your-agents/
├── app.vue                       # root composition surface (thin)
├── nuxt.config.ts                # head, fonts, css, og/twitter, favicon
├── pages/
│   ├── index.vue                 # route view — wires sections only
│   └── docs.vue                  # /docs — markdown documentation
├── components/
│   ├── AppHeader.vue             # sticky nav
│   ├── HeroSection.vue           # headline + poster
│   ├── MarqueeBar.vue            # CSS-only ticker
│   ├── ArchitectureMap.vue       # SVG diagram of the seven files
│   ├── FilesGrid.vue             # composes 7 × FileCard
│   ├── FileCard.vue              # single file presentation
│   ├── SessionLoop.vue           # session start checklist
│   ├── DecisionRules.vue         # decision table + tool priority
│   ├── QuickStart.vue            # 4-step getting started
│   └── AppFooter.vue
├── composables/
│   ├── useAgentFiles.ts          # the 7-file spec data (single source of truth)
│   └── useAgentFiles.types.ts    # shared types for file metadata
├── templates/                    # canonical *.md for each agent file
├── scripts/
│   ├── sync-templates.mjs        # templates/ → public/templates/
│   └── generate-og.mjs           # assets/og-card.svg → public/og.png
├── assets/
│   ├── css/main.css              # design tokens + utilities
│   └── og-card.svg               # OG art source (rasterized for social)
└── public/
    ├── favicon.svg
    ├── og.png
    └── templates/                # synced copy from templates/ (build/postinstall)
```

Following the Vue best-practices skill: route views stay thin, feature UI is
split into focused components, shared state lives in a composable, props
flow down and data is typed.
