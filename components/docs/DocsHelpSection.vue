<script setup lang="ts">
const { faq, issuesUrl, repoUrl } = useSiteNav()
</script>

<template>
  <section id="help" class="dhelp">
    <div class="bya-container">
      <header class="dhelp__head">
        <span class="bya-eyebrow">Help</span>
        <h2 class="bya-h2">
          FAQ &amp; <span class="dhelp__hl">support.</span>
        </h2>
        <p class="dhelp__lede">
          Personal learning project — not a service SLA. Open a GitHub Issue when
          something is wrong or unclear.
        </p>
      </header>

      <dl class="dhelp__faq">
        <div v-for="item in faq" :key="item.q" class="dhelp__faq-item">
          <dt class="dhelp__faq-q">{{ item.q }}</dt>
          <dd class="dhelp__faq-a">{{ item.a }}</dd>
        </div>
      </dl>

      <div class="dhelp__band">
        <h3 class="bya-h3 dhelp__band-title">Report &amp; contribute</h3>
        <ul class="dhelp__issues">
          <li><strong>Site bug</strong> — broken page, layout, or build.</li>
          <li><strong>Question</strong> — how to use the seven files.</li>
          <li>
            <strong>Spec change</strong> — edit
            <code>templates/</code> plus a
            <code>content/changelog/</code> entry in the same PR.
          </li>
        </ul>
        <div class="dhelp__cta">
          <a
            class="bya-btn"
            :href="issuesUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            New issue
            <span aria-hidden="true">↗</span>
          </a>
          <a
            class="bya-btn bya-btn--ghost"
            :href="repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dhelp {
  padding: 72px 0;
  background: var(--paper-2);
  border-top: var(--stroke-fat) solid var(--ink);
  scroll-margin-top: 5.5rem;
}
.dhelp__head { margin-bottom: 32px; max-width: 640px; }
.dhelp__hl {
  display: inline-block;
  background: var(--lemon);
  padding: 0 10px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 4px 4px 0 0 var(--ink);
}
.dhelp__lede {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 14px 0 0;
}
.dhelp__faq { margin: 0; }
.dhelp__faq-item {
  border: var(--stroke) solid var(--ink);
  background: var(--paper);
  padding: 14px 16px;
  margin-bottom: 10px;
  box-shadow: 4px 4px 0 0 var(--ink);
}
.dhelp__faq-q {
  font-family: var(--display);
  font-size: 0.88rem;
  text-transform: uppercase;
  margin: 0 0 8px;
}
.dhelp__faq-a {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.8rem;
  line-height: 1.55;
}
.dhelp__band {
  margin-top: 36px;
  padding: 20px;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--ink);
  color: var(--paper);
}
.dhelp__band-title { margin: 0 0 12px; color: var(--lemon); }
.dhelp__issues {
  margin: 0 0 16px;
  padding-left: 1.2rem;
  font-family: var(--mono);
  font-size: 0.8rem;
  line-height: 1.55;
}
.dhelp__cta { display: flex; flex-wrap: wrap; gap: 10px; }
.dhelp__band .bya-btn--ghost {
  color: var(--paper);
  border-color: var(--paper);
  box-shadow: 3px 3px 0 0 var(--paper);
}
</style>
