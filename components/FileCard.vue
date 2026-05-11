<script setup lang="ts">
import type { AgentFile } from '~/composables/useAgentFiles'

const props = defineProps<{
  file: AgentFile
  index: number
}>()

const number = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <article
    :id="`file-${file.id}`"
    :class="['fc', `fc--${file.color}`]"
  >
    <header class="fc__head">
      <span class="fc__num">{{ number }}</span>
      <span class="fc__symbol" aria-hidden="true">{{ file.symbol }}</span>
      <h3 class="bya-h3 fc__filename">{{ file.filename }}</h3>
    </header>

    <p class="fc__tag">{{ file.tagline }}</p>
    <p class="fc__role">{{ file.role }}</p>

    <div class="fc__sections" role="list">
      <span
        v-for="s in file.sections"
        :key="s"
        class="fc__section"
        role="listitem"
      >
        {{ s }}
      </span>
    </div>

    <blockquote class="fc__quote">
      <span aria-hidden="true">"</span>{{ file.excerpt }}<span aria-hidden="true">"</span>
    </blockquote>

    <footer v-if="file.reads.length" class="fc__reads">
      <span class="fc__reads-label">reads ↳</span>
      <span v-for="r in file.reads" :key="r" class="fc__read-chip">{{ r }}</span>
    </footer>
    <footer v-else class="fc__reads fc__reads--leaf">
      <span class="fc__reads-label">standalone ◆</span>
    </footer>
  </article>
</template>

<style scoped>
.fc {
  position: relative;
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  padding: 26px 26px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--paper);
}
.fc--hot   { background: var(--hot);   color: var(--paper); }
.fc--sky   { background: var(--sky);   color: var(--paper); }
.fc--lemon { background: var(--lemon); color: var(--ink); }
.fc--pink  { background: var(--pink);  color: var(--paper); }
.fc--acid  { background: var(--acid);  color: var(--ink); }
.fc--grape { background: var(--grape); color: var(--paper); }
.fc--ink   { background: var(--ink);   color: var(--paper); }

.fc__head {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 12px;
}
.fc__num {
  font-family: var(--display);
  font-size: 1.6rem;
  padding: 4px 10px;
  background: var(--paper);
  color: var(--ink);
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
}
.fc--lemon .fc__num, .fc--acid .fc__num {
  background: var(--ink); color: var(--paper);
}
.fc__symbol {
  font-size: 1.8rem;
  line-height: 1;
}
.fc__filename {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  word-break: break-all;
}

.fc__tag {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  margin: 0;
  line-height: 1.3;
}
.fc__role {
  font-family: var(--mono);
  font-size: 0.86rem;
  margin: 0;
  line-height: 1.55;
}

.fc__sections {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.fc__section {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 8px;
  background: var(--paper);
  color: var(--ink);
  border: 2px solid var(--ink);
}
.fc--lemon .fc__section, .fc--acid .fc__section {
  background: var(--ink); color: var(--paper);
}

.fc__quote {
  margin: 6px 0 0;
  padding: 12px 14px;
  border-left: var(--stroke-fat) solid var(--ink);
  background: rgba(10, 10, 10, 0.12);
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.5;
}
.fc--lemon .fc__quote, .fc--acid .fc__quote {
  background: rgba(10, 10, 10, 0.08);
}
.fc--ink .fc__quote {
  background: rgba(246, 241, 228, 0.1);
  border-left-color: var(--lemon);
}

.fc__reads {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-top: 14px;
  border-top: 2px dashed currentColor;
  font-family: var(--mono);
  font-size: 0.74rem;
}
.fc__reads-label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.85;
}
.fc__read-chip {
  padding: 2px 6px;
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--ink);
}
.fc--ink .fc__read-chip { background: var(--lemon); color: var(--ink); }
</style>
