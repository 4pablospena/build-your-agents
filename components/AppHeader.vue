<script setup lang="ts">
// Top navigation. Props in, events up. Thin presentation only.
defineProps<{
  active?: 'overview' | 'architecture' | 'files' | 'docs'
}>()

const links: { id: string; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'files', label: 'The 7 files' },
  { id: 'docs', label: 'Docs' }
]
</script>

<template>
  <header class="hdr">
    <div class="bya-container hdr__row">
      <a class="hdr__brand" href="#top" aria-label="Build your own agents">
        <span class="hdr__mark" aria-hidden="true">◣◥</span>
        <span class="hdr__name">build/your/agents</span>
      </a>

      <nav class="hdr__nav" aria-label="Primary">
        <a
          v-for="l in links"
          :key="l.id"
          :href="`#${l.id}`"
          :class="['hdr__link', { 'is-active': active === l.id }]"
        >
          {{ l.label }}
        </a>
      </nav>

      <a class="bya-btn hdr__cta" href="#files">
        <span>Read the spec</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.hdr__row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  padding: 14px 0;
}
.hdr__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.02em;
}
.hdr__mark {
  display: inline-block;
  background: var(--hot);
  color: var(--paper);
  padding: 6px 8px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
}
.hdr__name { font-family: var(--mono); font-size: 0.92rem; }

.hdr__nav {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}
.hdr__link {
  font-family: var(--mono);
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  padding: 8px 12px;
  border: var(--stroke) solid transparent;
  text-decoration: none;
  color: var(--ink);
}
.hdr__link:hover {
  background: var(--acid);
  border-color: var(--ink);
}
.hdr__link.is-active {
  background: var(--ink);
  color: var(--paper);
}

.hdr__cta { padding: 10px 16px; font-size: 0.82rem; }

@media (max-width: 920px) {
  .hdr__nav { display: none; }
  .hdr__row { grid-template-columns: 1fr auto; }
}
</style>
