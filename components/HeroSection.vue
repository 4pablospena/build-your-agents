<script setup lang="ts">
// Hero composition. Pure presentation. No state.
const stats = [
  { k: '7', v: 'core files' },
  { k: '1', v: 'agent, fully described' },
  { k: '0', v: 'frameworks required' }
]
</script>

<template>
  <section id="top" class="hero">
    <!-- Floating decorations -->
    <div class="hero__deco hero__deco--a" aria-hidden="true">SOUL</div>
    <div class="hero__deco hero__deco--b" aria-hidden="true">MEMORY</div>
    <div class="hero__deco hero__deco--c" aria-hidden="true">★</div>
    <div class="hero__deco hero__deco--d" aria-hidden="true">HEARTBEAT</div>

    <div class="bya-container hero__grid">
      <div class="hero__lead">
        <span class="bya-eyebrow bya-rise bya-rise-1">An open spec · v1.0</span>

        <h1 class="bya-h1 hero__title bya-rise bya-rise-2">
          Build<br />
          <span class="hero__title-accent">your own</span><br />
          <span class="hero__title-stamp">agents.</span>
        </h1>

        <p class="bya-lede hero__lede bya-rise bya-rise-3">
          A seven-file architecture for designing AI agents you can actually
          read, version, and ship. No magic. No black box. Just
          <em class="bya-serif">markdown that a model can live inside.</em>
        </p>

        <div class="hero__cta-row bya-rise bya-rise-4">
          <NuxtLink class="bya-btn" to="/start">
            Start the checklist
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink class="bya-btn bya-btn--ghost" to="/examples">
            See a real case
            <span aria-hidden="true">↗</span>
          </NuxtLink>
          <a class="bya-btn bya-btn--ghost" href="#architecture">
            Browse the architecture
            <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <aside class="hero__visual" aria-hidden="true">
        <div class="hero__poster">
          <div class="hero__poster-grid">
            <span class="hero__tag hero__tag--hot">SOUL.md</span>
            <span class="hero__tag hero__tag--sky">IDENTITY.md</span>
            <span class="hero__tag hero__tag--lemon">AGENTS.md</span>
            <span class="hero__tag hero__tag--pink">USER.md</span>
            <span class="hero__tag hero__tag--acid">MEMORY.md</span>
            <span class="hero__tag hero__tag--grape">HEARTBEAT.md</span>
            <span class="hero__tag hero__tag--ink">TOOLS.md</span>
          </div>
          <div class="hero__poster-footer">
            <span>specification</span>
            <span>↳ readable by humans</span>
            <span>↳ executable by models</span>
          </div>
        </div>
      </aside>
    </div>

    <ul class="hero__stats bya-container">
      <li v-for="s in stats" :key="s.v" class="hero__stat">
        <span class="hero__stat-k">{{ s.k }}</span>
        <span class="hero__stat-v">{{ s.v }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 120px 0 64px;
  overflow: hidden;
  background:
    radial-gradient(800px 400px at 80% 10%, rgba(255, 61, 0, 0.18), transparent 60%),
    radial-gradient(700px 400px at 10% 80%, rgba(37, 99, 255, 0.16), transparent 60%),
    var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}

.hero__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(3rem, 10vw, 9rem);
  letter-spacing: -0.02em;
  pointer-events: none;
  user-select: none;
  opacity: 0.55;
}
.hero__deco--a { top: 6%; left: -2%; transform: rotate(-8deg); }
.hero__deco--b { bottom: 4%; right: -3%; transform: rotate(6deg); -webkit-text-stroke-color: var(--hot); }
.hero__deco--c {
  top: 12%; right: 8%; font-size: 6rem;
  color: var(--lemon); -webkit-text-stroke: 3px var(--ink);
  transform: rotate(15deg);
  opacity: 1;
}
.hero__deco--d { bottom: 18%; left: 10%; -webkit-text-stroke-color: var(--grape); opacity: 0.35; }

.hero__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 56px;
  align-items: end;
  position: relative;
  z-index: 2;
}

.hero__title { margin: 24px 0 28px; }
.hero__title-accent {
  display: inline-block;
  background: var(--acid);
  padding: 0 16px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 8px 8px 0 0 var(--ink);
  transform: rotate(-1.5deg);
  margin: 6px 0;
}
.hero__title-stamp {
  display: inline-block;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
  text-stroke: 2px var(--ink);
}

.hero__lede { margin: 0 0 32px; }

.hero__cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.hero__visual {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero__poster {
  width: 100%;
  max-width: 420px;
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  padding: 22px;
  transform: rotate(2.5deg);
}
.hero__poster-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.hero__tag {
  display: block;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.95rem;
  padding: 14px 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 4px 4px 0 0 var(--ink);
  text-align: left;
}
.hero__tag--hot   { background: var(--hot);   color: var(--paper); }
.hero__tag--sky   { background: var(--sky);   color: var(--paper); }
.hero__tag--lemon { background: var(--lemon); }
.hero__tag--pink  { background: var(--pink);  color: var(--paper); }
.hero__tag--acid  { background: var(--acid); }
.hero__tag--grape { background: var(--grape); color: var(--paper); }
.hero__tag--ink   { background: var(--ink);   color: var(--paper); grid-column: 1 / -1; text-align: center; }
.hero__poster-footer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 18px;
  font-family: var(--mono);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.hero__stats {
  margin-top: 80px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  padding: 0;
  list-style: none;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--ink);
  color: var(--paper);
}
.hero__stat {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hero__stat + .hero__stat { border-left: var(--stroke-fat) solid var(--paper); }
.hero__stat-k {
  font-family: var(--display);
  font-size: clamp(2.6rem, 6vw, 4.2rem);
  line-height: 1;
  color: var(--lemon);
}
.hero__stat-v {
  font-family: var(--mono);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.82rem;
}

@media (max-width: 920px) {
  .hero__grid { grid-template-columns: 1fr; gap: 36px; }
  .hero__poster { transform: rotate(1deg); margin-inline: auto; }
  .hero__stats { grid-template-columns: 1fr; }
  .hero__stat + .hero__stat { border-left: 0; border-top: var(--stroke-fat) solid var(--paper); }
}
</style>
