<script setup lang="ts">
const year = new Date().getFullYear()

// External repository URL. Hardcoded for Ola 0; can be moved into runtimeConfig
// in Ola 1 alongside the RSS feed.
const repoUrl = 'https://github.com/4pablospena/build-your-agents'
</script>

<template>
  <footer class="ft">
    <div class="bya-container ft__row">
      <div class="ft__brand">
        <span class="ft__big">BUILD/YOUR/AGENTS</span>
        <span class="ft__sub">An open spec for personal AI agents.</span>
      </div>

      <div class="ft__cols">
        <div class="ft__col">
          <h4 class="ft__h">Spec</h4>
          <a href="/#architecture">Architecture</a>
          <a href="/#files">The 7 files</a>
          <a href="/#session-loop">Session loop</a>
          <NuxtLink to="/start">Reading map</NuxtLink>
          <NuxtLink to="/docs">Markdown templates</NuxtLink>
        </div>
        <div class="ft__col">
          <h4 class="ft__h">Files</h4>
          <a href="/#file-soul">SOUL.md</a>
          <a href="/#file-agents">AGENTS.md</a>
          <a href="/#file-memory">MEMORY.md</a>
          <a href="/#file-tools">TOOLS.md</a>
        </div>
        <div class="ft__col">
          <h4 class="ft__h">Principles</h4>
          <span>No black box.</span>
          <span>Markdown is the API.</span>
          <span>Version your soul.</span>
        </div>
        <div class="ft__col">
          <h4 class="ft__h">Follow</h4>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <a :href="repoUrl" target="_blank" rel="noopener noreferrer">
            GitHub
            <span class="ft__ext" aria-hidden="true">↗</span>
          </a>
          <a href="/rss.xml" type="application/rss+xml" target="_blank" rel="noopener noreferrer">
            RSS
            <span class="ft__ext" aria-hidden="true">↗</span>
          </a>
          <span class="ft__soon" aria-disabled="true">
            Changelog
            <span class="ft__badge">soon</span>
          </span>
        </div>
      </div>
    </div>

    <div class="ft__meta">
      <span>© {{ year }} · build/your/agents</span>
      <span class="ft__star" aria-hidden="true">★ ★ ★</span>
      <span>v1.0 · public documentation</span>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  background: var(--ink);
  color: var(--paper);
  border-top: var(--stroke-fat) solid var(--ink);
}
.ft__row {
  display: grid;
  grid-template-columns: 1.1fr 2fr;
  gap: 48px;
  padding: 64px 0 32px;
}
.ft__brand { display: flex; flex-direction: column; gap: 12px; }
.ft__big {
  font-family: var(--display);
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  line-height: 1;
  color: var(--lemon);
}
.ft__sub {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.05rem;
}

.ft__cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.ft__col { display: flex; flex-direction: column; gap: 6px; }
.ft__h {
  margin: 0 0 8px;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.82rem;
  color: var(--hot);
  letter-spacing: 0.08em;
}
.ft__col > a, .ft__col > span {
  font-family: var(--mono);
  font-size: 0.82rem;
  color: var(--paper);
  text-decoration: none;
}
.ft__col > a:hover { color: var(--acid); }
.ft__ext {
  display: inline-block;
  margin-left: 2px;
  font-size: 0.72rem;
  opacity: 0.7;
}
.ft__soon {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: not-allowed;
  opacity: 0.55;
}
.ft__badge {
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 2px 6px;
  border: 1px solid var(--paper);
  color: var(--lemon);
  border-color: var(--lemon);
  line-height: 1;
}

.ft__meta {
  border-top: var(--stroke) solid var(--paper);
  padding: 16px 24px;
  font-family: var(--mono);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.ft__star { color: var(--acid); }

@media (max-width: 720px) {
  .ft__row { grid-template-columns: 1fr; gap: 28px; }
  .ft__cols { grid-template-columns: 1fr 1fr; }
}
</style>
