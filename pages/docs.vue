<script setup lang="ts">
const { files } = useAgentFiles()

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
      <div class="bya-container">
        <span class="bya-eyebrow">Documentation</span>
        <h1 class="bya-h2 docs__title">
          Seven <span class="docs__hl">starter templates</span>
        </h1>
        <p class="bya-lede docs__lede">
          Each file is plain markdown you can save, edit, and version. Download
          one or the whole set, drop them into a folder, and point your agent at
          them. The same sources power the interactive overview on the
          <NuxtLink to="/">home page</NuxtLink>.
        </p>
        <p class="docs__note">
          Tip: use your browser’s “Save link as…” on
          <strong>Open raw</strong> if the download button is blocked by your
          environment.
        </p>
      </div>
    </section>

    <section class="docs__grid-wrap">
      <div class="bya-container">
        <div class="docs__grid">
          <article
            v-for="f in files"
            :key="f.id"
            :class="['docs__card', `docs__card--${f.color}`]"
          >
            <header class="docs__card-head">
              <span class="docs__sym" aria-hidden="true">{{ f.symbol }}</span>
              <h2 class="docs__filename">{{ f.filename }}</h2>
            </header>
            <p class="docs__tag">{{ f.tagline }}</p>
            <p class="docs__role">{{ f.role }}</p>

            <div class="docs__actions">
              <a
                class="bya-btn"
                :href="templateHref(f.filename)"
                :download="f.filename"
              >
                Download
              </a>
              <a
                class="bya-btn bya-btn--ghost"
                :href="templateHref(f.filename)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open raw
              </a>
            </div>

            <details class="docs__preview">
              <summary class="docs__summary">Preview</summary>
              <pre class="docs__pre">{{ f.markdownContent }}</pre>
            </details>
          </article>
        </div>
      </div>
    </section>

    <section class="docs__bundle">
      <div class="bya-container docs__bundle-inner">
        <span class="bya-chip">All seven</span>
        <p class="docs__bundle-text">
          Copy the project’s
          <code class="docs__code">templates/</code> folder into your agent
          workspace, or download files individually above. When the site is
          deployed, each file is also served at a stable URL, for example
          <code class="docs__code">/templates/SOUL.md</code>
          through
          <code class="docs__code">/templates/TOOLS.md</code>.
        </p>
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

.docs__hero {
  padding: 72px 0 48px;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(600px 280px at 90% 0%, rgba(255, 46, 147, 0.2), transparent 55%),
    var(--paper);
}
.docs__title {
  margin: 16px 0 20px;
  max-width: 18ch;
}
.docs__hl {
  display: inline-block;
  background: var(--acid);
  padding: 0 10px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 5px 5px 0 0 var(--ink);
  transform: rotate(-0.8deg);
}
.docs__lede {
  max-width: 62ch;
  margin: 0 0 16px;
}
.docs__lede :deep(a) {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.docs__note {
  font-family: var(--mono);
  font-size: 0.8rem;
  max-width: 62ch;
  margin: 0;
  opacity: 0.85;
  line-height: 1.5;
}

.docs__grid-wrap {
  padding: 56px 0 80px;
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
.docs__card--hot   { background: var(--hot);   color: var(--paper); }
.docs__card--sky   { background: var(--sky);   color: var(--paper); }
.docs__card--lemon { background: var(--lemon); color: var(--ink); }
.docs__card--pink  { background: var(--pink);  color: var(--paper); }
.docs__card--acid  { background: var(--acid);  color: var(--ink); }
.docs__card--grape { background: var(--grape); color: var(--paper); }
.docs__card--ink   { background: var(--ink);   color: var(--paper); }

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
.docs__tag {
  font-family: var(--serif);
  font-style: italic;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.3;
}
.docs__role {
  font-family: var(--mono);
  font-size: 0.8rem;
  margin: 0 0 8px;
  line-height: 1.45;
  opacity: 0.92;
}

.docs__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}
.docs__actions .bya-btn,
.docs__actions .bya-btn--ghost {
  font-size: 0.78rem;
  padding: 10px 16px;
}

.docs__preview {
  margin-top: 8px;
  border: var(--stroke) solid var(--ink);
  background: rgba(10, 10, 10, 0.08);
}
.docs__card--ink .docs__preview {
  background: rgba(246, 241, 228, 0.06);
}
.docs__summary {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 10px 12px;
  cursor: pointer;
  list-style: none;
}
.docs__summary::-webkit-details-marker {
  display: none;
}
.docs__pre {
  margin: 0;
  padding: 12px 12px 14px;
  max-height: 240px;
  overflow: auto;
  font-family: var(--mono);
  font-size: 0.72rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  border-top: 2px solid var(--ink);
  background: var(--ink);
  color: var(--acid);
}
.docs__card--lemon .docs__pre,
.docs__card--acid .docs__pre {
  color: var(--paper);
}

.docs__bundle {
  padding: 48px 0 96px;
  border-top: var(--stroke-fat) solid var(--ink);
  background: var(--paper-2);
}
.docs__bundle-inner {
  max-width: 720px;
}
.docs__bundle-text {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 12px 0 0;
}
.docs__code {
  font-size: 0.82em;
  padding: 2px 6px;
  background: var(--paper);
  border: 2px solid var(--ink);
}
</style>
