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

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run generate     # static site → .output/public
```

## Architecture (frontend)

```
build-your-agents/
├── app.vue                       # root composition surface (thin)
├── nuxt.config.ts                # head, fonts, css
├── pages/
│   └── index.vue                 # route view — wires sections only
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
│   └── useAgentFiles.ts          # the 7-file spec data (single source of truth)
└── assets/css/main.css           # design tokens + utilities
```

Following the Vue best-practices skill: route views stay thin, feature UI is
split into focused components, shared state lives in a composable, props
flow down and data is typed.
