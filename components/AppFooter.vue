<script setup lang="ts">
const year = new Date().getFullYear()
const { files } = useAgentFiles()
const { repoUrl, issuesUrl, footerSpecLinks, footerFollowLinks } = useSiteNav()
</script>

<template>
  <footer class="ft">
    <div class="bya-container ft__closing">
      <p>YOUR AGENT.<br />YOUR RULES.</p>
      <NuxtLink class="bya-btn" to="/configure">Start building</NuxtLink>
    </div>
    <div class="bya-container ft__row">
      <div class="ft__brand">
        <span class="ft__big">build/your/agents</span>
        <span class="ft__sub">An open spec for personal AI agents.</span>
      </div>

      <div class="ft__cols">
        <div class="ft__col">
          <h4 class="ft__h">Spec</h4>
          <template v-for="link in footerSpecLinks" :key="link.id">
            <a v-if="link.to.startsWith('/#')" :href="link.to">{{ link.label }}</a>
            <NuxtLink v-else :to="link.to">{{ link.label }}</NuxtLink>
          </template>
        </div>
        <div class="ft__col">
          <h4 class="ft__h">Files</h4>
          <a
            v-for="f in files"
            :key="f.id"
            :href="`/#file-${f.id}`"
          >{{ f.filename }}</a>
        </div>
        <div class="ft__col">
          <h4 class="ft__h">Follow</h4>
          <NuxtLink
            v-for="link in footerFollowLinks"
            :key="link.id"
            :to="link.to"
          >{{ link.label }}</NuxtLink>
          <a :href="repoUrl" target="_blank" rel="noopener noreferrer">
            GitHub

          </a>
          <a
            :href="issuesUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issues

          </a>
          <a href="/rss.xml" type="application/rss+xml" target="_blank" rel="noopener noreferrer">
            RSS

          </a>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
            Sitemap

          </a>
        </div>
      </div>
    </div>

    <div class="ft__meta">
      <span>© {{ year }} · build/your/agents</span>

      <span>v1.0 · public documentation</span>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  border-top: var(--stroke-fat) solid var(--line);
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
  line-height: 1;
}
.ft__sub {
  font-size: 1.05rem;
}

.ft__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.ft__col { display: flex; flex-direction: column; gap: 6px; }
.ft__h {
  margin: 0 0 8px;
  text-transform: uppercase;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}
.ft__col > a, .ft__col > span {
  font-family: var(--mono);
  font-size: 0.82rem;
  color: var(--ink);
  text-decoration: none;
}
.ft__ext {
  display: inline-block;
  margin-left: 2px;
  font-size: 0.72rem;
  opacity: 0.7;
}

.ft__meta {
  padding: 16px 24px;
  font-size: 0.74rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}
.ft__star { color: var(--accent); }

@media (max-width: 720px) {
  .ft__row { grid-template-columns: 1fr; gap: 28px; }
  .ft__cols { grid-template-columns: 1fr 1fr; }
}

.ft { background: var(--color-alarm-red); color: var(--ink); border: none; }
.ft__closing { padding-top: 72px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.ft__closing p { font-family: var(--display); font-size: clamp(60px, 9vw, 132px); line-height: .92; letter-spacing: -.025em; margin: 0; }
.ft__closing .bya-btn { min-width: 200px; padding: 24px 40px; background: var(--paper); color: var(--ink); border: none; }
.ft__closing .bya-btn:hover { background: var(--lemon); }
.ft__big { color: var(--ink); font-size: 32px; }
.ft__sub { font-family: var(--body); font-style: normal; }
.ft__h { color: var(--ink); font-family: var(--body); font-weight: 800; }
.ft__col > a { color: var(--ink); font-family: var(--body); font-size: 14px; }
.ft__col > a:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 4px; }
.ft__meta { border-top: 1px solid var(--ink); font-family: var(--body); text-transform: none; letter-spacing: 0; }
.ft__star { display: none; }
@media (max-width: 600px) { .ft__closing { align-items: flex-start; flex-direction: column; } .ft__cols { grid-template-columns: 1fr 1fr; } .ft__big { overflow-wrap: anywhere; } }
</style>
