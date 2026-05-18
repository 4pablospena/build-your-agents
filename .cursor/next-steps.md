# build/your/agents — Roadmap

> Living documentation and seven-file spec.  
> Última revisión: 2026-05-18.

## Principios

1. **Markdown sigue siendo la API.** Toda mejora debe poder describirse en `.md` versionable o en datos del composable `useAgentFiles`.
2. **Sin duplicar contenido.** `templates/`, `content/posts/`, `useAgentFiles` y rutas nuevas comparten datos; no se copia, se referencia.
3. **Audiencia honesta.** Si una pieza no encaja con `AudienceFit.vue`, se replantea antes de mergear.
4. **Una pieza, un ancla.** Cada nueva ruta o sección añade entrada en `AppHeader.vue` o `AppFooter.vue`.
5. **Build estático no se rompe.** `pnpm generate` sigue funcionando tras cada ola.
6. **Una sola fuente de verdad para navegación** — `composables/useSiteNav.ts` (header, footer, `/help`, `NewHereStrip`).

---

## Histórico — olas 0–8 (DONE)

| Prioridad | Idea | Ola | Estado |
| --------- | ---- | --- | ------ |
| Alta | Footer, curl origin, hero CTA | 0 | DONE |
| Alta | ZIP, RSS | 1 | DONE |
| Alta | `/start` guided checklist | 2 | DONE |
| Alta | `/examples` case studies | 3 | DONE |
| Alta | `/changelog` spec history | 4 | DONE |
| Alta | `/openclaw` ecosystem bridge | 5 | DONE |
| Media | FileGraph + placement wizard | 6 | DONE |
| Media | Blog ↔ docs cross-links | 7 | DONE |
| Media | `/tools/*` validator, cursor-rules, search | 8 | DONE |
| — | Newsletter / playground | — | NO |

Detalle por ola (referencia; no reabrir salvo regresión):

- [x] **Ola 0** — Footer Follow, `NUXT_PUBLIC_SITE_URL` en curl, hero → `/examples`
- [x] **Ola 1** — `build-zip.mjs`, ZIP en `/docs`, `/rss.xml`
- [x] **Ola 2** — `/start`, `useStartJourney`, header Start
- [x] **Ola 3** — `/examples`, `filesTouched`, `ExampleCard`
- [x] **Ola 4** — `content/changelog/`, `/changelog`, `ChangelogBanner` en `/docs`
- [x] **Ola 5** — `/openclaw`, `useEcosystem`
- [x] **Ola 6** — `FileGraph`, `useFilePlacementWizard`
- [x] **Ola 7** — `DocsBlogLinks`, `FilesTouchedStrip`
- [x] **Ola 8** — `/tools/validate`, `/tools/cursor-rules`, `/tools/search`

---

## Fase actual — orientación y soporte (post-roadmap)

**Objetivo:** que un visitante nuevo sepa por dónde empezar y dónde pedir ayuda.

### Documentación

- [x] Reestructurar este archivo (histórico + fase actual)
- [x] Actualizar `README.md` (site map, getting help, shipped 0–8)
- [x] `templates/README.md` — bloque “On the website”
- [x] `.cursor/README.md` — punteros a roadmap y changelog

### Sitio

- [x] `composables/useSiteNav.ts`
- [x] `pages/help.vue`
- [x] `components/NewHereStrip.vue` en home
- [x] Hero CTAs → `/start`; QuickStart → enlace a `/start`
- [x] Header simplificado (sin Overview/OpenClaw; Help + Tools)
- [x] Footer: 7 archivos + Help + Issues; `runtimeConfig.public.repoUrl`
- [x] FileGraph wizard en inglés
- [x] Prerender `/start`, `/help`

### Repositorio

- [x] `CONTRIBUTING.md`
- [x] `docs/SUPPORT.md`
- [x] `.github/ISSUE_TEMPLATE/` (bug, question, spec_change)

### Opcional

- [x] `server/routes/sitemap.xml.ts` + prerender
- [x] `.cursor/rules/site-nav.mdc`
- [x] `NUXT_PUBLIC_REPO_URL` en `.env.example`

---

## Definition of Done (fase soporte)

1. Entrada **Help** en header y footer; `/help` con FAQ y Issues.
2. `useSiteNav` consumido por header, footer, help, `NewHereStrip`.
3. `pnpm build` y `pnpm generate` sin errores.
4. README y este archivo alineados con el despliegue.

---

## Secuencia futura (ideas, no comprometidas)

- Más case studies en `/examples` (solo tag `case-study` + `filesTouched`).
- Ampliar FAQ en `useSiteNav` cuando lleguen preguntas recurrentes en Issues.
