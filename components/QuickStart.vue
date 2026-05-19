<script setup lang="ts">
const steps = [
  {
    n: '01',
    title: 'Clone the seven files',
    body: 'Soul · Identity · Agents · User · Memory · Heartbeat · Tools. Each is a markdown template with bracketed blanks.'
  },
  {
    n: '02',
    title: 'Fill the brackets',
    body: 'Name your agent in SOUL.md. Describe yourself in USER.md. Wire credentials in TOOLS.md. Everything is human-readable.'
  },
  {
    n: '03',
    title: 'Boot it inside a model',
    body: 'Point any capable model at the folder. It reads USER → MEMORY → today → HEARTBEAT, then greets you in the right voice.'
  },
  {
    n: '04',
    title: 'Let it remember',
    body: 'After every task, the agent writes one line to memory/[today].md. Confirmed patterns get promoted to MEMORY.md.'
  }
]
</script>

<template>
  <section class="qs">
    <div class="bya-container">
      <header class="qs__head">
        <span class="bya-eyebrow">06 / Overview</span>
        <h2 class="bya-h2">
          Four steps at a <span class="qs__hl">glance.</span>
        </h2>
        <p class="qs__lede">
          This is the short version. For fill order, time estimates, and saved
          progress, use the interactive checklist on
          <NuxtLink class="qs__link" to="/start">/start</NuxtLink>.
        </p>
        <div class="qs__cta">
          <NuxtLink class="bya-btn" to="/start">
            Follow the interactive checklist
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </header>

      <div class="qs__grid">
        <article
          v-for="(s, i) in steps"
          :key="s.n"
          :class="['qs__card', i % 2 === 0 ? 'tilt-l' : 'tilt-r']"
        >
          <span class="qs__num">{{ s.n }}</span>
          <h3 class="bya-h3 qs__title">{{ s.title }}</h3>
          <p class="qs__body">{{ s.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.qs {
  padding: 96px 0;
  background:
    radial-gradient(600px 300px at 90% 0%, rgba(200, 255, 0, 0.35), transparent 60%),
    var(--paper);
}
.qs__head { margin-bottom: 48px; max-width: 720px; }
.qs__lede {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 16px 0 0;
  max-width: 52ch;
}
.qs__link {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: inherit;
}
.qs__cta { margin-top: 22px; }
.qs__hl {
  display: inline-block;
  background: var(--acid);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-1deg);
}

.qs__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.qs__card {
  position: relative;
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow);
  padding: 24px;
  display: grid;
  gap: 10px;
}
.qs__num {
  font-family: var(--display);
  font-size: 3rem;
  line-height: 1;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}
.qs__title { font-size: 1.2rem; }
.qs__body {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 0;
}
</style>
