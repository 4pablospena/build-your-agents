<script setup lang="ts">
// Visual explanation of the session start sequence.
// Pulled directly from AGENTS.md "Session Start Checklist".

const steps = [
  { n: '01', file: 'USER.md',     act: 'Check flagged priorities & updates' },
  { n: '02', file: 'MEMORY.md',   act: 'Load evergreen context & standing prefs' },
  { n: '03', file: 'memory/today.md', act: "Load today's running context" },
  { n: '04', file: 'HEARTBEAT.md', act: 'Review pending scheduled tasks' },
  { n: '05', file: 'SOUL.md',     act: 'Greet the user with the right tone' }
]
</script>

<template>
  <section id="session-loop" class="loop">
    <div class="bya-container">
      <header class="loop__head">
        <span class="bya-eyebrow">04 / The session loop</span>
        <h2 class="bya-h2">
          What the agent does <span class="loop__hl">first.</span>
        </h2>
        <p class="bya-lede">
          Every session begins with the same checklist. It is short, it is
          deterministic, and it is the difference between an agent that
          remembers and an agent that performs amnesia.
        </p>
      </header>

      <ol class="loop__list">
        <li v-for="(s, i) in steps" :key="s.n" class="loop__step">
          <span class="loop__num">{{ s.n }}</span>
          <!-- Siempre misma rejilla: sin el conector en la última fila, Vite/CSS colocaban el body en la columna 2 y quedaba horizontal (bug visual). -->
          <span class="loop__connector" aria-hidden="true">{{
            i < steps.length - 1 ? '│' : '\u00a0'
          }}</span>
          <div class="loop__body">
            <span class="loop__file">{{ s.file }}</span>
            <span class="loop__act">{{ s.act }}</span>
          </div>
        </li>
      </ol>

      <div class="loop__code-wrap">
        <span class="bya-chip">excerpt · AGENTS.md</span>
        <pre class="bya-code"><span class="c-cmt"># Session Start Checklist</span>
1. Read <span class="c-key">USER.md</span>
2. Read <span class="c-key">MEMORY.md</span>
3. Check <span class="c-key">memory/[today].md</span>
4. Check <span class="c-key">HEARTBEAT.md</span>
5. Greet the user according to <span class="c-key">SOUL.md</span></pre>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loop {
  padding: 96px 0;
  background: var(--ink);
  color: var(--paper);
  border-top: var(--stroke-fat) solid var(--ink);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.loop__head {
  max-width: 760px;
  margin-bottom: 48px;
}
.loop__head .bya-eyebrow {
  background: var(--lemon);
  color: var(--ink);
  border-color: var(--lemon);
}
.loop__head .bya-h2, .loop__head .bya-lede { color: var(--paper); }
.loop__hl {
  display: inline-block;
  background: var(--hot);
  padding: 0 12px;
  border: var(--stroke) solid var(--paper);
  box-shadow: 6px 6px 0 0 var(--lemon);
  transform: rotate(-1deg);
}

.loop__list {
  list-style: none;
  padding: 0;
  margin: 0 0 48px;
  display: grid;
  gap: 0;
}
.loop__step {
  position: relative;
  display: grid;
  /* Col 2 fija: hueco del conector; el cuerpo siempre en col 3 (misma estructura en las 5 filas). */
  grid-template-columns: 80px 1.25rem 1fr;
  align-items: center;
  column-gap: 16px;
  row-gap: 0;
  padding: 22px 20px;
  border: var(--stroke) solid var(--paper);
  background: var(--ink);
}
.loop__step + .loop__step { border-top: 0; }

.loop__num {
  grid-column: 1;
  grid-row: 1;
  font-family: var(--display);
  font-size: 2.4rem;
  color: var(--acid);
  line-height: 1;
}
.loop__connector {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  font-family: var(--mono);
  font-size: 1.1rem;
  line-height: 1;
  color: var(--paper);
  opacity: 0.45;
}
.loop__body {
  grid-column: 3;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}
.loop__file {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 0.92rem;
  letter-spacing: 0.04em;
  color: var(--lemon);
}
.loop__act {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.05rem;
}

.loop__code-wrap {
  display: grid;
  gap: 12px;
  max-width: 720px;
}
</style>
