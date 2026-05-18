<script setup lang="ts">
const { newHereCards, faq, toolsNav, issuesUrl, repoUrl } = useSiteNav()

useHead({
  title: 'Help — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'FAQ, recommended paths, spec utilities, and how to report bugs or propose changes via GitHub Issues.'
    }
  ]
})
</script>

<template>
  <main class="hlp">
    <AppHeader active="help-page" />

    <section class="hlp__hero">
      <div class="hlp__deco hlp__deco--a" aria-hidden="true">HELP</div>
      <div class="hlp__deco hlp__deco--b" aria-hidden="true">FAQ</div>
      <div class="hlp__deco hlp__deco--c" aria-hidden="true">★</div>

      <div class="bya-container hlp__hero-inner">
        <span class="bya-eyebrow bya-rise bya-rise-1">Support</span>

        <h1 class="bya-h1 hlp__title bya-rise bya-rise-2">
          Questions,<br />
          <span class="hlp__title-accent">paths,</span><br />
          <span class="hlp__title-stamp">and issues.</span>
        </h1>

        <p class="bya-lede hlp__lede bya-rise bya-rise-3">
          This site is a personal learning project and a free pattern — not a
          company or a service SLA. Use the routes below first; open a GitHub
          Issue when something is wrong or unclear.
        </p>

        <div class="hlp__cta-row bya-rise bya-rise-4">
          <NuxtLink class="bya-btn" to="/start">
            Start the checklist
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <a
            class="bya-btn bya-btn--ghost"
            :href="issuesUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open GitHub Issues
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>

    <section class="hlp__section">
      <div class="bya-container">
        <header class="hlp__head">
          <span class="bya-eyebrow">New here?</span>
          <h2 class="bya-h2">
            Pick a <span class="hlp__hl">starting point.</span>
          </h2>
        </header>

        <ul class="hlp__routes" role="list">
          <li v-for="card in newHereCards" :key="card.to" role="listitem">
            <NuxtLink class="hlp__route-card" :to="card.to">
              <h3 class="hlp__route-title">{{ card.title }}</h3>
              <p class="hlp__route-body">{{ card.body }}</p>
              <span class="hlp__route-cta">{{ card.cta }} →</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="hlp__section hlp__section--alt">
      <div class="bya-container">
        <header class="hlp__head">
          <span class="bya-eyebrow">FAQ</span>
          <h2 class="bya-h2">
            Common <span class="hlp__hl">questions.</span>
          </h2>
        </header>

        <dl class="hlp__faq">
          <div v-for="item in faq" :key="item.q" class="hlp__faq-item">
            <dt class="hlp__faq-q">{{ item.q }}</dt>
            <dd class="hlp__faq-a">{{ item.a }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="hlp__section">
      <div class="bya-container">
        <header class="hlp__head">
          <span class="bya-eyebrow">Utilities</span>
          <h2 class="bya-h2">
            Optional <span class="hlp__hl">tools.</span>
          </h2>
          <p class="hlp__sub">
            These live under <code class="hlp__code">/tools</code> so the main tour stays focused.
          </p>
        </header>

        <ul class="hlp__tools" role="list">
          <li v-for="tool in toolsNav" :key="tool.id" role="listitem">
            <NuxtLink class="hlp__tool-card" :to="tool.path">
              <span class="hlp__tool-eyebrow">{{ tool.eyebrow }}</span>
              <span class="hlp__tool-label">{{ tool.label }}</span>
              <span class="hlp__tool-desc">{{ tool.description }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="hlp__band">
      <div class="bya-container hlp__band-inner">
        <span class="bya-eyebrow hlp__band-eyebrow">Report &amp; contribute</span>
        <h2 class="bya-h2 hlp__band-title">
          Bugs, questions,<br />
          <span class="hlp__band-hl">spec changes.</span>
        </h2>
        <ul class="hlp__issues-list">
          <li>
            <strong>Site bug</strong> — broken page, layout, or build (use the bug template).
          </li>
          <li>
            <strong>Question</strong> — how to use the seven files or this site (question template).
          </li>
          <li>
            <strong>Spec change</strong> — propose an edit to <code class="hlp__code">templates/</code>
            plus a <code class="hlp__code">content/changelog/</code> entry in the same PR (spec template).
          </li>
        </ul>
        <div class="hlp__band-cta">
          <a
            class="bya-btn"
            :href="issuesUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            New issue (choose template)
            <span aria-hidden="true">↗</span>
          </a>
          <a
            class="bya-btn bya-btn--ghost"
            :href="repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository
            <span aria-hidden="true">↗</span>
          </a>
          <NuxtLink class="bya-btn bya-btn--ghost" to="/changelog">
            Spec changelog
          </NuxtLink>
        </div>
        <p class="hlp__band-note">
          Repo docs:
          <a
            class="hlp__link"
            :href="`${repoUrl}/blob/main/CONTRIBUTING.md`"
            target="_blank"
            rel="noopener noreferrer"
          >CONTRIBUTING.md</a>
          ·
          <a
            class="hlp__link"
            :href="`${repoUrl}/blob/main/docs/SUPPORT.md`"
            target="_blank"
            rel="noopener noreferrer"
          >docs/SUPPORT.md</a>
        </p>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.hlp {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
}
.hlp__hero {
  position: relative;
  padding: 100px 0 64px;
  overflow: hidden;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(720px 360px at 82% 10%, rgba(37, 99, 255, 0.14), transparent 58%),
    radial-gradient(560px 280px at 8% 80%, rgba(200, 255, 0, 0.2), transparent 55%),
    var(--paper);
}
.hlp__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(2.5rem, 8vw, 6.5rem);
  pointer-events: none;
  opacity: 0.45;
}
.hlp__deco--a { top: 6%; left: -2%; transform: rotate(-6deg); }
.hlp__deco--b { bottom: 18%; right: -3%; -webkit-text-stroke-color: var(--sky); }
.hlp__deco--c {
  top: 12%;
  right: 8%;
  font-size: 4rem;
  color: var(--lemon);
  -webkit-text-stroke: 3px var(--ink);
  opacity: 0.9;
}
.hlp__hero-inner { position: relative; z-index: 1; max-width: 720px; }
.hlp__title { margin: 20px 0 24px; }
.hlp__title-accent {
  display: inline-block;
  background: var(--sky);
  color: var(--paper);
  padding: 0 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 8px 8px 0 0 var(--ink);
  transform: rotate(-1deg);
}
.hlp__title-stamp {
  display: inline-block;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}
.hlp__lede { margin: 0 0 28px; max-width: 52ch; }
.hlp__cta-row { display: flex; flex-wrap: wrap; gap: 14px; }

.hlp__section {
  padding: 72px 0;
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.hlp__section--alt {
  background: var(--paper-2);
}
.hlp__head { margin-bottom: 36px; max-width: 640px; }
.hlp__head .bya-eyebrow { margin-bottom: 12px; }
.hlp__hl {
  display: inline-block;
  background: var(--acid);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.85deg);
}
.hlp__sub {
  font-family: var(--mono);
  font-size: 0.84rem;
  margin: 14px 0 0;
  line-height: 1.5;
}
.hlp__code {
  font-family: var(--mono);
  font-size: 0.88em;
  padding: 2px 6px;
  border: 2px solid var(--ink);
  background: var(--paper);
}

.hlp__routes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.hlp__route-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 160px;
  padding: 20px 18px;
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  background: var(--paper);
  text-decoration: none;
  color: inherit;
}
.hlp__route-card:hover {
  background: var(--lemon);
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 0 var(--ink);
}
.hlp__route-title {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 1.05rem;
  margin: 0;
}
.hlp__route-body {
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}
.hlp__route-cta {
  font-family: var(--mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hlp__faq {
  margin: 0;
  display: grid;
  gap: 20px;
  max-width: 720px;
}
.hlp__faq-item {
  margin: 0;
  padding: 20px 22px;
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow);
  background: var(--paper);
}
.hlp__section--alt .hlp__faq-item {
  background: var(--paper);
}
.hlp__faq-q {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 1rem;
  margin: 0 0 10px;
}
.hlp__faq-a {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 0;
}

.hlp__tools {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}
.hlp__tool-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 16px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 4px 4px 0 0 var(--ink);
  background: var(--paper);
  text-decoration: none;
  color: inherit;
}
.hlp__tool-card:hover {
  background: var(--pink);
  color: var(--paper);
  box-shadow: 7px 7px 0 0 var(--ink);
}
.hlp__tool-eyebrow {
  font-family: var(--mono);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.85;
}
.hlp__tool-label {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 1rem;
}
.hlp__tool-desc {
  font-family: var(--mono);
  font-size: 0.76rem;
  line-height: 1.45;
}

.hlp__band {
  padding: 64px 0 96px;
  background: var(--ink);
  color: var(--paper);
}
.hlp__band-inner { max-width: 680px; }
.hlp__band-eyebrow {
  background: var(--lemon);
  color: var(--ink);
  border-color: var(--lemon);
}
.hlp__band-title { margin: 16px 0 18px; color: var(--paper); }
.hlp__band-hl {
  display: inline-block;
  background: var(--hot);
  padding: 0 12px;
  border: var(--stroke) solid var(--paper);
  box-shadow: 6px 6px 0 0 var(--lemon);
}
.hlp__issues-list {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 0 0 24px;
  padding-left: 1.2rem;
  max-width: 58ch;
}
.hlp__issues-list li + li { margin-top: 10px; }
.hlp__band-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px;
}
.hlp__band .bya-btn--ghost {
  background: transparent;
  color: var(--paper);
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}
.hlp__band-note {
  font-family: var(--mono);
  font-size: 0.76rem;
  margin: 0;
  opacity: 0.88;
}
.hlp__link {
  color: var(--acid);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.hlp__band .hlp__code {
  background: rgba(246, 241, 228, 0.12);
  border-color: var(--paper);
  color: var(--paper);
}
</style>
