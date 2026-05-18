# build/your/agents — Roadmap de mejoras

> Plan de evolución del sitio **fuera del blog**, manteniendo la promesa de
> _living documentation_ y la spec de siete archivos como única fuente de verdad.
> Última revisión: 2026-05-18.

## Principios

1. **Markdown sigue siendo la API.** Toda mejora debe poder describirse en
   `.md` versionable o en datos del composable `useAgentFiles`.
2. **Sin duplicar contenido.** `templates/`, `content/posts/`, `useAgentFiles`
   y rutas nuevas comparten datos; no se copia, se referencia.
3. **Audiencia honesta.** Si una pieza no encaja con `AudienceFit.vue`, se
   replantea antes de mergear.
4. **Una pieza, un ancla.** Cada nueva ruta o sección añade entrada en
   `AppHeader.vue` o `AppFooter.vue`.
5. **Build estático no se rompe.** `pnpm generate` sigue funcionando tras
   cada ola.

---

## Resumen del backlog

| Prioridad | Idea                                    | Ola | Estado |
| --------- | --------------------------------------- | --- | ------ |
| Alta      | Hub de ejemplos / case studies          | 3   | TODO   |
| Alta      | Descarga del paquete completo (ZIP)     | 1   | TODO   |
| Alta      | Mapa de lectura interactivo (`/start`)  | 2   | TODO   |
| Alta      | Puente OpenClaw / ecosistema            | 5   | TODO   |
| Alta      | Changelog de la spec                    | 4   | TODO   |
| Media     | Explorador de relaciones entre archivos | 6   | TODO   |
| Media     | Wizard “¿en qué archivo va esto?”       | 6   | TODO   |
| Media     | Contenido cruzado blog ↔ docs           | 7   | TODO   |
| Media     | RSS/Atom del blog                       | 1   | TODO   |
| Media     | Footer y contacto con intención         | 0   | TODO   |
| Baja      | Validador de markdown                   | 8   | TODO   |
| Baja      | Generador `.cursor/rules`               | 8   | TODO   |
| Baja      | Búsqueda global (blog + templates)      | 8   | TODO   |
| Descart.  | Newsletter / playground                 | —   | NO     |

---

## Ola 0 — Ganchos rápidos en lo que ya existe

**Objetivo:** dejar el sitio “esperando” a las olas siguientes sin añadir rutas.

- [ ] Añadir columna **Blog · GitHub · RSS · Changelog** en
      `components/AppFooter.vue` (placeholders permitidos).
- [ ] Sustituir `YOUR_ORIGIN` del bloque `curl` en `pages/docs.vue` por
      `useRuntimeConfig().public.siteUrl` (`NUXT_PUBLIC_SITE_URL`).
- [ ] CTA secundario en home **“Ver ejemplo real”** apuntando al post de
      Sabrina, anticipando `/examples`.

**Criterios de hecho:** footer renderiza nuevos enlaces; comando `curl`
muestra URL real en producción; home tiene 2 CTAs claros.

---

## Ola 1 — Acceso y distribución

**Objetivo:** que cualquiera se lleve la spec en un clic y vuelva.

- [ ] Script `scripts/build-zip.mjs` que empaqueta `templates/*.md` en
      `public/templates/build-your-agents.zip`. Engancharlo en `pnpm build`
      junto a `sync-templates.mjs`.
- [ ] Botón **“Download all 7”** en `pages/docs.vue` (bloque bundle).
- [ ] Feed **RSS/Atom** en `server/routes/rss.xml.ts` usando
      `useBlogPostListQuery()`.
- [ ] Sustituir placeholders del footer (Ola 0) por enlaces reales:
      repo GitHub, RSS.

**Criterios de hecho:** ZIP descargable y verificable; `/rss.xml` válido en
[validator.w3.org](https://validator.w3.org/feed/); footer sin `#` muertos.

---

## Ola 2 — Recorrido guiado

**Objetivo:** convertir `templates/README.md` en experiencia, no fichero.

- [ ] Ruta nueva **`/start`** (o sección dedicada en `/docs`).
- [ ] Checklist visual SOUL → IDENTITY → AGENTS → USER → TOOLS → MEMORY →
      HEARTBEAT, con tiempo estimado por paso.
- [ ] Cada paso enlaza a la card de `/docs` y al ancla `#file-<id>` en home.
- [ ] Persistencia local con `localStorage` (sin backend).
- [ ] Datos del recorrido tomados de `useAgentFiles()`; no duplicar metadata.
- [ ] Entrada en `AppHeader.vue` (“Start” o “Reading map”).

**Criterios de hecho:** un visitante nuevo completa el recorrido sin volver
atrás; refrescar la página conserva el progreso.

---

## Ola 3 — Pruebas de que funciona (case studies)

**Objetivo:** responder “¿alguien ya lo hizo así?”.

- [ ] Ruta nueva **`/examples`**.
- [ ] Listado generado desde `content/posts` filtrando posts con tag
      `case-study` (Sabrina ya cumple).
- [ ] Tarjeta de ejemplo: problema → archivos tocados (color/symbol de
      `useAgentFiles`) → enlace al post.
- [ ] Frontmatter opcional `filesTouched: [memory, tools]` en posts; render
      de un strip lateral en `pages/blog/[...slug].vue`.
- [ ] CTA de home (Ola 0) deja de ser placeholder y apunta a `/examples`.

**Criterios de hecho:** Sabrina aparece en `/examples` sin tocar su `.md`
salvo añadir `filesTouched`; añadir un nuevo case study es solo crear un
post con el tag correcto.

---

## Ola 4 — Sitio como spec viva

**Objetivo:** cumplir “version your soul” de forma visible.

- [ ] **`/changelog`** renderizado desde `CHANGELOG.md` raíz **o** desde
      `content/changelog/*.md` (decidir antes de empezar).
- [ ] Cada entrada: fecha, archivo afectado, motivo, link al post si aplica.
- [ ] Banner discreto en `/docs` con la última entrada
      (“Spec updated YYYY-MM-DD — see changelog”).
- [ ] Política: cada cambio en `templates/*.md` se acompaña de entrada en
      changelog en el mismo commit.

**Criterios de hecho:** `git log` de `templates/` y `/changelog` no se
contradicen; el banner solo aparece si hay cambio en los últimos N días.

---

## Ola 5 — Contexto ecosistema (OpenClaw / Cursor / MCPs)

**Objetivo:** onboarding rápido para quien llega desde la herramienta.

- [ ] Decidir entre **sección nueva en home** o ruta **`/openclaw`** según
      tracción esperada.
- [ ] Mapeo “estos siete archivos ≈ workspace OpenClaw / reglas Cursor /
      MCP”, sin prometer vendor lock-in.
- [ ] Enlaces a Resizes, repo del sitio y posts con tag `openclaw`.
- [ ] Reaprovechar `TierMap` y `FileCard`; no diseñar UI nueva.

**Criterios de hecho:** un usuario de OpenClaw entiende en < 60 s cómo
encajan los siete archivos en su flujo actual.

---

## Ola 6 — Interactividad sobre datos ya existentes

**Objetivo:** sacar partido a `useAgentFiles` sin tocar contenido.

- [ ] **Explorador de relaciones:** clic en una card resalta `reads` y
      “reads me” en `ArchitectureMap` y `TierMap`.
- [ ] **Wizard “¿en qué archivo va esto?”** alimentado por `sections` de
      cada archivo + extractos de `DecisionRules.vue`.
- [ ] Componente compartido (p.ej. `components/FileGraph.vue`) consumido
      tanto por home como por `/start`.

**Criterios de hecho:** sin añadir nuevos campos a `useAgentFiles`; pasa
linter y mantiene SSR.

---

## Ola 7 — Cruces blog ↔ docs

**Objetivo:** unificar narrativa y spec cuando haya volumen.

- [ ] En `/docs`, cada card muestra “Leer en el blog” filtrado por
      `tag === file.id` (`memory`, `tools`, …).
- [ ] En `pages/blog/[...slug].vue`, bloque **“Archivos relacionados”**
      usando `filesTouched` (frontmatter opcional).
- [ ] Regla: si un post no declara archivos, no aparece bloque. Sin enlaces
      forzados.

**Criterios de hecho:** el cruce funciona solo con datos del propio post;
ningún hard-code de slugs en los componentes.

---

## Ola 8 — Diferenciadores opcionales

**Objetivo:** ir más allá si el proyecto lo justifica.

- [ ] **Validador de markdown** cliente: pegas `SOUL.md` y se valida contra
      `sections` del archivo en `useAgentFiles`.
- [ ] **Generador `.cursor/rules`** a partir de los siete archivos, con
      descarga local.
- [ ] **Búsqueda global** con `@nuxt/content` + combobox accesible.
- [ ] Dejar fuera **newsletter** y **playground con modelo** salvo cambio
      de estrategia del proyecto.

**Criterios de hecho:** cada herramienta cabe en su ruta propia (`/tools/*`)
y no contamina la home ni `/docs`.

---

## Definition of Done (común a todas las olas)

Una ola se considera completa cuando:

1. Tiene **entrada en `AppHeader.vue` o `AppFooter.vue`** (según corresponda).
2. **No duplica contenido** entre `templates/`, `content/posts/` y la nueva
   ruta o sección.
3. **Datos centralizados** en un composable existente o nuevo bajo
   `composables/` (no hay arrays hardcoded en `pages/`).
4. **`pnpm build` y `pnpm generate`** terminan sin errores ni warnings
   nuevos.
5. **Coherencia con `AudienceFit.vue`** verificada en revisión.
6. **Lighthouse / a11y** no empeoran respecto a la rama `main` previa.

---

## Secuencia recomendada

Ola 0 ──▶ Ola 1 ──▶ Ola 2 ──▶ Ola 3 ──▶ Ola 4 │ ▼ Ola 5 ──▶ Ola 6 ──▶ Ola 7 ──▶ Ola 8
