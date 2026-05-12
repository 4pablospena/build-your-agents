<script setup lang="ts">
// Pulled from AGENTS.md "Decision Rules" + "Tool Selection Guide" from TOOLS.md
const rules = [
  { when: 'Ambiguous instruction', do: 'Ask one clarifying question before proceeding.' },
  { when: 'Destructive or irreversible action', do: 'Require explicit confirmation. No exceptions.' },
  { when: 'Missing information', do: 'Check MEMORY.md, then USER.md, then ask.' },
  { when: 'Conflicting instructions', do: 'SOUL.md limits → AGENTS.md → user request.' },
  { when: 'Unknown topic', do: 'Acknowledge the gap. Do not guess.' }
]

const priority = [
  { rank: '01', label: 'Memory first', desc: 'Already in MEMORY.md? Use it. No tool call.' },
  { rank: '02', label: 'Workspace files', desc: 'Check local files before fetching the web.' },
  { rank: '03', label: 'Specialised tool', desc: 'Calendar for dates. GitHub for code.' },
  { rank: '04', label: 'Web search last', desc: 'Only when nothing else can answer.' }
]
</script>

<template>
  <section class="rules">
    <div class="bya-container rules__grid">
      <div class="rules__col">
        <span class="bya-eyebrow">05 / Decision rules</span>
        <h2 class="bya-h2 rules__title">
          When in doubt,<br />
          <span class="rules__hl">follow the table.</span>
        </h2>
        <p class="bya-lede">
          The agent is autonomous, but not freelance. AGENTS.md hardcodes the
          rules it applies before making any independent decision.
        </p>

        <table class="rules__table">
          <thead>
            <tr>
              <th scope="col" class="rules__th-cell">If</th>
              <th scope="col" class="rules__th-cell">Then</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in rules" :key="r.when" class="rules__tr">
              <td class="rules__when">{{ r.when }}</td>
              <td class="rules__do">{{ r.do }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <aside class="rules__col rules__priority">
        <span class="bya-chip">Tool selection · priority order</span>
        <ol class="rules__list">
          <li v-for="p in priority" :key="p.rank" class="rules__item">
            <span class="rules__rank">{{ p.rank }}</span>
            <div>
              <strong class="rules__label">{{ p.label }}</strong>
              <span class="rules__desc">{{ p.desc }}</span>
            </div>
          </li>
        </ol>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.rules {
  padding: 96px 0;
  background: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.rules__grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 56px;
  align-items: start;
}

.rules__title { margin: 14px 0 12px; }
.rules__hl {
  display: inline-block;
  background: var(--sky);
  color: var(--paper);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-1deg);
}

.rules__table {
  margin-top: 28px;
  width: 100%;
  border-collapse: collapse;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--paper);
  box-shadow: var(--shadow);
  table-layout: fixed;
}
.rules__table thead tr {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.85rem;
  background: var(--ink);
  color: var(--paper);
}
.rules__th-cell {
  padding: 10px 14px;
  text-align: left;
  font-weight: 400;
  width: 38%;
}
.rules__th-cell + .rules__th-cell {
  width: 62%;
  border-left: 2px solid var(--paper);
}

.rules__tr {
  border-top: var(--stroke) solid var(--ink);
}
.rules__when,
.rules__do {
  padding: 14px;
  font-family: var(--mono);
  font-size: 0.86rem;
  vertical-align: top;
}
.rules__when {
  font-weight: 700;
  background: var(--lemon);
  border-right: var(--stroke) solid var(--ink);
  width: 38%;
}
.rules__tr:nth-child(odd) .rules__when {
  background: var(--acid);
}
.rules__do {
  line-height: 1.5;
  width: 62%;
}

.rules__priority {
  position: sticky;
  top: 6rem;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--hot);
  color: var(--paper);
  padding: 24px;
  box-shadow: var(--shadow-lg);
  transform: rotate(1.5deg);
}
.rules__priority .bya-chip {
  background: var(--paper);
  color: var(--ink);
  margin-bottom: 14px;
}
.rules__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
.rules__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: start;
  padding: 12px;
  background: var(--paper);
  color: var(--ink);
  border: var(--stroke) solid var(--ink);
}
.rules__rank {
  font-family: var(--display);
  font-size: 1.5rem;
  color: var(--hot);
  line-height: 1;
}
.rules__label {
  display: block;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.95rem;
  margin-bottom: 2px;
}
.rules__desc {
  display: block;
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.45;
}

@media (max-width: 920px) {
  .rules__grid { grid-template-columns: 1fr; }
  .rules__priority { position: static; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .rules__hl,
  .rules__priority {
    transform: none;
  }
}
</style>
