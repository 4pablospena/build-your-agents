<script setup lang="ts">
import { toolsNav } from '~/composables/useToolsNav'

useHead({
  title: 'Tools — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Optional utilities: validate markdown sections, export Cursor rules, and search blog and changelog content.'
    }
  ]
})
</script>

<template>
  <ToolsShell
    active="hub"
    eyebrow="Utilities"
    title="Spec tools, isolated from the tour."
    lede="These helpers live under /tools only — the home page and /docs stay focused on the seven-file narrative. No newsletter, no model playground."
  >
    <ul class="tlsh__grid" role="list">
      <li v-for="tool in toolsNav" :key="tool.id" role="listitem">
        <NuxtLink class="tlsh__card" :to="tool.path">
          <span class="tlsh__eyebrow">{{ tool.eyebrow }}</span>
          <h2 class="tlsh__title">{{ tool.label }}</h2>
          <p class="tlsh__desc">{{ tool.description }}</p>
          <span class="tlsh__go" aria-hidden="true">→</span>
        </NuxtLink>
      </li>
    </ul>
  </ToolsShell>
</template>

<style scoped>
.tlsh__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.tlsh__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 180px;
  padding: 20px 18px;
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  background: var(--paper);
  text-decoration: none;
  color: inherit;
  position: relative;
}
.tlsh__card:hover {
  background: var(--acid);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lg);
}
.tlsh__eyebrow {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.75;
}
.tlsh__title {
  margin: 0;
  font-family: var(--display);
  font-size: 1.05rem;
  text-transform: uppercase;
}
.tlsh__desc {
  margin: 0;
  font-family: var(--serif);
  font-size: 0.95rem;
  line-height: 1.45;
  flex: 1;
}
.tlsh__go {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 1.1rem;
}
</style>
