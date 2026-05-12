<script setup lang="ts">
const { files } = useAgentFiles()

const docStats = [
  { k: '7', v: 'starter files' },
  { k: '1', v: 'folder to boot' },
  { k: '0', v: 'vendor lock-in' }
]

const marqueeItems = [
  'Download the spec',
  'Fill the brackets',
  'Boot your agent',
  'Plain markdown',
  'Fork and version',
  'No framework'
]

const howSteps = [
  {
    n: '01',
    title: 'Download',
    body: 'Grab the seven .md files. One at a time, copy-paste, or curl them from /templates/ once your site is live. For a reading map, see README.md in the same folder.'
  },
  {
    n: '02',
    title: 'Fill the brackets',
    body: 'Replace [AgentName], [Your Name], ports, models — everything is human-readable and diff-friendly.'
  },
  {
    n: '03',
    title: 'Point your model',
    body: 'Drop the folder as system context or workspace rules. Same files power the overview on the home page.'
  },
  {
    n: '04',
    title: 'Two memory layers',
    body: 'Use memory/[date].md for daily notes and session summaries. Promote confirmed facts to MEMORY.md — evergreen, one line per fact, supersede instead of delete.'
  }
]

const openPreview = reactive<Record<string, boolean>>({})
const copied = reactive<Record<string, boolean>>({})

function togglePreview(id: string) {
  openPreview[id] = !openPreview[id]
}

function sourcePanelId(id: string) {
  return `docs-src-${id}`
}

async function copyMarkdown(id: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copied[id] = true
    setTimeout(() => {
      copied[id] = false
    }, 1600)
  } catch {
    /* clipboard denied — user can use Open raw */
  }
}

useHead({
  title: 'Markdown templates — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Download the seven starter markdown files: SOUL, IDENTITY, AGENTS, USER, MEMORY, HEARTBEAT, TOOLS. Fill the brackets and boot your agent.'
    }
  ]
})

function templateHref(filename: string) {
  return `/templates/${filename}`
}
</script>

<template>
  <main class="docs">
    <AppHeader active="docs-page" />

    <section class="docs__hero">
      <div class="docs__deco docs__deco--a" aria-hidden="true">MARKDOWN</div>
      <div class="docs__deco docs__deco--b" aria-hidden="true">TEMPLATE</div>
      <div class="docs__deco docs__deco--c" aria-hidden="true">★</div>
      <div class="docs__deco docs__deco--d" aria-hidden="true">DOWNLOAD</div>

      <div class="bya-container docs__hero-grid">
        <div class="docs__lead">
          <span class="bya-eyebrow bya-rise bya-rise-1">Documentation · templates</span>

          <h1 class="bya-h1 docs__title bya-rise bya-rise-2">
            Seven<br />
            <span class="docs__title-accent">starter</span><br />
            <span class="docs__title-stamp">templates.</span>
          </h1>

          <p class="bya-lede docs__lede bya-rise bya-rise-3">
            Plain markdown you can save, edit, and version. Download one file
            or all seven, drop them into a folder, and point your agent at them.
            Same sources as the
            <NuxtLink to="/">interactive overview</NuxtLink>.
            For a one-page map of roles and read order, open
            <a class="docs__inline-link" :href="templateHref('README.md')">README.md</a>
            (also under <code class="docs__code">/templates/</code>).
          </p>

          <div class="docs__cta-row bya-rise bya-rise-4">
            <NuxtLink class="bya-btn" to="/#files">
              Back to the spec
              <span aria-hidden="true">↖</span>
            </NuxtLink>
            <a class="bya-btn bya-btn--ghost" href="#docs-templates">
              Jump to files
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <p class="docs__note bya-rise bya-rise-4">
            Tip: if <strong>Download</strong> is blocked, use
            <strong>Open raw</strong> then “Save as…” — or
            <strong>Copy</strong> to paste straight into your editor.
          </p>
        </div>

        <aside class="docs__visual" aria-hidden="true">
          <div class="docs__poster">
            <div class="docs__poster-grid">
              <span class="docs__poster-tag docs__poster-tag--hot">SOUL.md</span>
              <span class="docs__poster-tag docs__poster-tag--sky">IDENTITY.md</span>
              <span class="docs__poster-tag docs__poster-tag--lemon">AGENTS.md</span>
              <span class="docs__poster-tag docs__poster-tag--pink">USER.md</span>
              <span class="docs__poster-tag docs__poster-tag--acid">MEMORY.md</span>
              <span class="docs__poster-tag docs__poster-tag--grape">HEARTBEAT.md</span>
              <span class="docs__poster-tag docs__poster-tag--ink">TOOLS.md</span>
            </div>
            <div class="docs__poster-footer">
              <span>downloadable</span>
              <span>↳ same as landing data</span>
              <span>↳ fill &amp; ship</span>
            </div>
          </div>
        </aside>
      </div>

      <ul class="docs__stats bya-container">
        <li v-for="s in docStats" :key="s.v" class="docs__stat">
          <span class="docs__stat-k">{{ s.k }}</span>
          <span class="docs__stat-v">{{ s.v }}</span>
        </li>
      </ul>
    </section>

    <MarqueeBar :items="marqueeItems" />

    <section id="docs-templates" class="docs__grid-wrap">
      <div class="bya-container">
        <header class="docs__section-head">
          <span class="bya-eyebrow">Templates</span>
          <h2 class="bya-h2 docs__section-title">
            Pick a file.<br />
            <span class="docs__section-hl">Own the markdown.</span>
          </h2>
        </header>

        <div class="docs__grid">
          <article
            v-for="(f, i) in files"
            :key="f.id"
            :class="[
              'docs__card',
              `docs__card--${f.color}`,
              i % 3 === 0 ? 'tilt-l' : i % 3 === 2 ? 'tilt-r' : '',
              i < 4 ? `bya-rise bya-rise-${i + 1}` : ''
            ]"
          >
            <header class="docs__card-head">
              <span class="docs__sym" aria-hidden="true">{{ f.symbol }}</span>
              <h2 class="docs__filename">{{ f.filename }}</h2>
            </header>
            <p class="docs__card-tag">{{ f.tagline }}</p>
            <p class="docs__role">{{ f.role }}</p>

            <div class="docs__actions">
              <a
                class="bya-btn"
                :class="{ 'bya-btn--on-color': ['hot', 'sky', 'pink', 'grape', 'ink'].includes(f.color) }"
                :href="templateHref(f.filename)"
                :download="f.filename"
              >
                Download
              </a>
              <a
                class="bya-btn bya-btn--ghost"
                :class="{ 'bya-btn--ghost-on-color': ['hot', 'sky', 'pink', 'grape', 'ink'].includes(f.color) }"
                :href="templateHref(f.filename)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open raw
              </a>
              <button
                type="button"
                class="bya-btn bya-btn--ghost docs__copy-btn"
                :class="{
                  'bya-btn--ghost-on-color': ['hot', 'sky', 'pink', 'grape', 'ink'].includes(f.color),
                  'is-copied': copied[f.id]
                }"
                :aria-label="`Copy ${f.filename} to clipboard`"
                @click="copyMarkdown(f.id, f.markdownContent)"
              >
                {{ copied[f.id] ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>

            <div
              :id="sourcePanelId(f.id)"
              class="docs__src"
              :class="{ 'docs__src--open': openPreview[f.id] }"
            >
              <button
                type="button"
                class="docs__src-toggle"
                :aria-expanded="!!openPreview[f.id]"
                :aria-controls="sourcePanelId(f.id)"
                :aria-label="
                  openPreview[f.id]
                    ? `Hide ${f.filename} preview`
                    : `Show ${f.filename} preview`
                "
                @click="togglePreview(f.id)"
              >
                <span class="docs__src-icon" aria-hidden="true">{ }</span>
                <span>{{ openPreview[f.id] ? 'hide preview' : 'view preview' }}</span>
                <span class="docs__src-chevron" aria-hidden="true">{{
                  openPreview[f.id] ? '▲' : '▼'
                }}</span>
              </button>

              <Transition name="docs-expand">
                <div v-if="openPreview[f.id]" class="docs__src-body">
                  <div class="docs__src-bar">
                    <span>{{ f.filename }}</span>
                    <span class="docs__src-lang">markdown</span>
                  </div>
                  <pre class="docs__src-code">{{ f.markdownContent }}</pre>
                </div>
              </Transition>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="docs__steps">
      <div class="bya-container">
        <header class="docs__steps-head">
          <span class="bya-eyebrow">How to use</span>
          <h2 class="bya-h2 docs__steps-title">
            From download to <span class="docs__steps-hl">running folder.</span>
          </h2>
        </header>
        <div class="docs__steps-grid">
          <article
            v-for="(s, i) in howSteps"
            :key="s.n"
            :class="['docs__step-card', i % 2 === 0 ? 'tilt-l' : 'tilt-r']"
          >
            <span class="docs__step-num">{{ s.n }}</span>
            <h3 class="bya-h3 docs__step-title">{{ s.title }}</h3>
            <p class="docs__step-body">{{ s.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="docs__bundle">
      <div class="bya-container docs__bundle-inner">
        <span class="bya-eyebrow docs__bundle-eyebrow">All seven · one folder</span>
        <h2 class="bya-h2 docs__bundle-title">
          Curl them in a loop<br />
          <span class="docs__bundle-hl">once you know your origin.</span>
        </h2>
        <p class="docs__bundle-lede">
          Replace <code class="docs__inline-code">YOUR_ORIGIN</code> with your
          deployed site (e.g. <code class="docs__inline-code">https://example.com</code>).
          Filenames match the templates above.
        </p>
        <pre class="bya-code docs__terminal" tabindex="0"><span class="c-cmt"># Download all seven into the current directory</span>
BASE=<span class="c-str">"YOUR_ORIGIN"</span>
<span class="c-key">for</span> n <span class="c-key">in</span> SOUL IDENTITY AGENTS USER MEMORY HEARTBEAT TOOLS; <span class="c-key">do</span>
  curl -fsSL <span class="c-str">"$BASE/templates/${n}.md"</span> -o <span class="c-str">"${n}.md"</span>
<span class="c-key">done</span></pre>
        <div class="docs__bundle-cta">
          <NuxtLink class="bya-btn" to="/">
            Back to overview
            <span aria-hidden="true">↖</span>
          </NuxtLink>
          <a
            class="bya-btn bya-btn--ghost"
            href="/templates/SOUL.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open SOUL.md raw
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.docs {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  position: relative;
  z-index: 2;
}

/* ----- Hero (landing-style) ----- */
.docs__hero {
  position: relative;
  padding: 100px 0 0;
  overflow: hidden;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(780px 380px at 78% 8%, rgba(255, 61, 0, 0.16), transparent 58%),
    radial-gradient(640px 360px at 12% 72%, rgba(37, 99, 255, 0.14), transparent 58%),
    var(--paper);
}

.docs__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(2.5rem, 8vw, 7rem);
  letter-spacing: -0.02em;
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
  z-index: 0;
}
.docs__deco--a {
  top: 5%;
  left: -3%;
  transform: rotate(-7deg);
}
.docs__deco--b {
  bottom: 22%;
  right: -4%;
  transform: rotate(5deg);
  -webkit-text-stroke-color: var(--hot);
}
.docs__deco--c {
  top: 10%;
  right: 6%;
  font-size: 5rem;
  color: var(--lemon);
  -webkit-text-stroke: 3px var(--ink);
  transform: rotate(12deg);
  opacity: 0.95;
}
.docs__deco--d {
  bottom: 14%;
  left: 4%;
  -webkit-text-stroke-color: var(--grape);
  opacity: 0.32;
}

.docs__hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: end;
  position: relative;
  z-index: 2;
  padding-bottom: 48px;
}

.docs__title {
  margin: 22px 0 26px;
}
.docs__title-accent {
  display: inline-block;
  background: var(--acid);
  padding: 0 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 8px 8px 0 0 var(--ink);
  transform: rotate(-1.4deg);
  margin: 4px 0;
}
.docs__title-stamp {
  display: inline-block;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}

.docs__lede {
  margin: 0 0 28px;
  max-width: 52ch;
}
.docs__lede :deep(a) {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.docs__inline-link {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: inherit;
}
.docs__code {
  font-family: var(--mono);
  font-size: 0.82em;
  padding: 2px 6px;
  border: 2px solid var(--ink);
  background: var(--paper);
}

.docs__cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.docs__note {
  font-family: var(--mono);
  font-size: 0.78rem;
  max-width: 52ch;
  margin: 22px 0 0;
  line-height: 1.5;
  opacity: 0.88;
}

.docs__visual {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}
.docs__poster {
  width: 100%;
  max-width: 400px;
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  padding: 20px;
  transform: rotate(2.2deg);
}
.docs__poster-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.docs__poster-tag {
  display: block;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.88rem;
  padding: 12px 10px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 4px 4px 0 0 var(--ink);
  text-align: left;
}
.docs__poster-tag--hot {
  background: var(--hot);
  color: var(--paper);
}
.docs__poster-tag--sky {
  background: var(--sky);
  color: var(--paper);
}
.docs__poster-tag--lemon {
  background: var(--lemon);
}
.docs__poster-tag--pink {
  background: var(--pink);
  color: var(--paper);
}
.docs__poster-tag--acid {
  background: var(--acid);
}
.docs__poster-tag--grape {
  background: var(--grape);
  color: var(--paper);
}
.docs__poster-tag--ink {
  background: var(--ink);
  color: var(--paper);
  grid-column: 1 / -1;
  text-align: center;
}
.docs__poster-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 16px;
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.docs__stats {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 0;
  list-style: none;
  border-top: var(--stroke-fat) solid var(--ink);
  background: var(--ink);
  color: var(--paper);
}
.docs__stat {
  padding: 26px 22px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.docs__stat + .docs__stat {
  border-left: var(--stroke-fat) solid var(--paper);
}
.docs__stat-k {
  font-family: var(--display);
  font-size: clamp(2.4rem, 5.5vw, 3.8rem);
  line-height: 1;
  color: var(--lemon);
}
.docs__stat-v {
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
}

/* ----- Grid section ----- */
.docs__grid-wrap {
  padding: 72px 0 80px;
  background: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.docs__section-head {
  margin-bottom: 44px;
  max-width: 720px;
}
.docs__section-head .bya-eyebrow {
  margin-bottom: 12px;
}
.docs__section-hl {
  display: inline-block;
  background: var(--pink);
  color: var(--paper);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.9deg);
}

.docs__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
}

.docs__card {
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--paper);
}
.docs__card--hot {
  background: var(--hot);
  color: var(--paper);
}
.docs__card--sky {
  background: var(--sky);
  color: var(--paper);
}
.docs__card--lemon {
  background: var(--lemon);
  color: var(--ink);
}
.docs__card--pink {
  background: var(--pink);
  color: var(--paper);
}
.docs__card--acid {
  background: var(--acid);
  color: var(--ink);
}
.docs__card--grape {
  background: var(--grape);
  color: var(--paper);
}
.docs__card--ink {
  background: var(--ink);
  color: var(--paper);
}

.docs__card-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.docs__sym {
  font-size: 1.6rem;
  line-height: 1;
}
.docs__filename {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  margin: 0;
  letter-spacing: 0.02em;
}
.docs__card-tag {
  font-family: var(--serif);
  font-style: italic;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.3;
}
.docs__role {
  font-family: var(--mono);
  font-size: 0.8rem;
  margin: 0 0 6px;
  line-height: 1.45;
  opacity: 0.92;
}

.docs__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}
.docs__actions .bya-btn,
.docs__actions .bya-btn--ghost,
.docs__copy-btn {
  font-size: 0.72rem;
  padding: 9px 14px;
}

/* Primary button on saturated card backgrounds */
.bya-btn--on-color {
  background: var(--paper) !important;
  color: var(--ink) !important;
  border-color: var(--ink) !important;
  box-shadow: 4px 4px 0 0 var(--ink) !important;
}
.bya-btn--on-color:hover {
  box-shadow: 7px 7px 0 0 var(--ink) !important;
}

.bya-btn--ghost-on-color {
  background: rgba(246, 241, 228, 0.2) !important;
  color: var(--paper) !important;
  border-color: var(--paper) !important;
  box-shadow: 4px 4px 0 0 var(--paper) !important;
}
.docs__card--lemon .bya-btn--ghost-on-color,
.docs__card--acid .bya-btn--ghost-on-color {
  color: var(--ink) !important;
  border-color: var(--ink) !important;
  box-shadow: 4px 4px 0 0 var(--ink) !important;
  background: rgba(10, 10, 10, 0.08) !important;
}
.bya-btn--ghost-on-color:hover {
  box-shadow: 7px 7px 0 0 currentColor !important;
}

.docs__copy-btn.is-copied {
  background: var(--acid) !important;
  color: var(--ink) !important;
  border-color: var(--ink) !important;
}

/* Preview panel (FileCard-style) */
.docs__src {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 2px solid var(--ink);
}
.docs__card--lemon .docs__src,
.docs__card--acid .docs__src {
  border-color: var(--ink);
}

.docs__src-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  background: rgba(10, 10, 10, 0.15);
  color: inherit;
  border: none;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: left;
  transition: background 100ms ease;
}
.docs__src-toggle:hover {
  background: rgba(10, 10, 10, 0.25);
}
.docs__card--lemon .docs__src-toggle,
.docs__card--acid .docs__src-toggle {
  background: rgba(10, 10, 10, 0.1);
}
.docs__card--lemon .docs__src-toggle:hover,
.docs__card--acid .docs__src-toggle:hover {
  background: rgba(10, 10, 10, 0.2);
}
.docs__card--ink .docs__src-toggle {
  background: rgba(246, 241, 228, 0.08);
}
.docs__card--ink .docs__src-toggle:hover {
  background: rgba(246, 241, 228, 0.14);
}

.docs__src-icon {
  font-family: var(--display);
  font-size: 0.9rem;
  letter-spacing: -0.05em;
}
.docs__src-chevron {
  margin-left: auto;
  font-size: 0.62rem;
}

.docs__src-body {
  border-top: 2px solid var(--ink);
  overflow: hidden;
}
.docs__src-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 14px;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.docs__src-lang {
  opacity: 0.55;
}
.docs__src-code {
  margin: 0;
  padding: 14px 12px;
  background: var(--ink);
  color: var(--acid);
  font-family: var(--mono);
  font-size: 0.74rem;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  overflow-x: hidden;
  max-height: 280px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--paper) var(--ink);
}
.docs__card--lemon .docs__src-code,
.docs__card--acid .docs__src-code {
  color: var(--paper);
}

.docs-expand-enter-active,
.docs-expand-leave-active {
  transition: max-height 250ms ease, opacity 200ms ease;
  overflow: hidden;
}
.docs-expand-enter-from,
.docs-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.docs-expand-enter-to,
.docs-expand-leave-from {
  max-height: 620px;
  opacity: 1;
}

/* ----- How to use ----- */
.docs__steps {
  padding: 72px 0 88px;
  background:
    radial-gradient(520px 260px at 88% 0%, rgba(200, 255, 0, 0.28), transparent 55%),
    var(--paper-2);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.docs__steps-head {
  margin-bottom: 40px;
  max-width: 720px;
}
.docs__steps-head .bya-eyebrow {
  margin-bottom: 12px;
  background: var(--ink);
  color: var(--paper);
}
.docs__steps-hl {
  display: inline-block;
  background: var(--acid);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.85deg);
}
.docs__steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.docs__step-card {
  position: relative;
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow);
  padding: 22px 22px 20px;
  display: grid;
  gap: 10px;
}
.docs__step-num {
  font-family: var(--display);
  font-size: 2.8rem;
  line-height: 1;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}
.docs__step-title {
  font-size: 1.15rem;
  margin: 0;
}
.docs__step-body {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 0;
}

/* ----- Closing band ----- */
.docs__bundle {
  padding: 64px 0 96px;
  background: var(--ink);
  color: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.docs__bundle-inner {
  max-width: 800px;
}
.docs__bundle-eyebrow {
  background: var(--lemon);
  color: var(--ink);
  border-color: var(--lemon);
}
.docs__bundle-title {
  margin: 16px 0 14px;
  color: var(--paper);
}
.docs__bundle-hl {
  display: inline-block;
  background: var(--hot);
  padding: 0 12px;
  border: var(--stroke) solid var(--paper);
  box-shadow: 6px 6px 0 0 var(--lemon);
  transform: rotate(-0.9deg);
}
.docs__bundle-lede {
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.55;
  margin: 0 0 18px;
  max-width: 58ch;
  opacity: 0.9;
}
.docs__inline-code {
  font-size: 0.88em;
  padding: 2px 6px;
  background: rgba(246, 241, 228, 0.12);
  border: 2px solid var(--paper);
}
.docs__terminal {
  margin: 0 0 24px;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
}
.docs__bundle-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.docs__bundle .bya-btn--ghost {
  background: transparent;
  color: var(--paper);
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}
.docs__bundle .bya-btn--ghost:hover {
  box-shadow: 7px 7px 0 0 var(--paper);
}

@media (max-width: 920px) {
  .docs__hero-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .docs__poster {
    transform: rotate(1deg);
    margin-inline: auto;
  }
  .docs__stats {
    grid-template-columns: 1fr;
  }
  .docs__stat + .docs__stat {
    border-left: 0;
    border-top: var(--stroke-fat) solid var(--paper);
  }
}
</style>
