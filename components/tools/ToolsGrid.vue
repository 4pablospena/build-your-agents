<script setup lang="ts">
import { toolsNav } from '~/composables/useToolsNav'
</script>

<template>
  <ul class="tgrid" role="list">
    <li v-for="tool in toolsNav" :key="tool.id" role="listitem">
      <NuxtLink class="tgrid__card" :to="tool.path">
        <span class="tgrid__eyebrow">{{ tool.eyebrow }}</span>
        <h2 class="tgrid__title">{{ tool.label }}</h2>
        <p class="tgrid__desc">{{ tool.description }}</p>
        <span class="tgrid__go" aria-hidden="true">→</span>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>
.tgrid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.tgrid__card {
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
.tgrid__card:hover {
  background: var(--acid);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lg);
}
.tgrid__eyebrow {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.75;
}
.tgrid__title {
  margin: 0;
  font-family: var(--display);
  font-size: 1.05rem;
  text-transform: uppercase;
}
.tgrid__desc {
  margin: 0;
  font-family: var(--serif);
  font-size: 0.95rem;
  line-height: 1.45;
  flex: 1;
}
.tgrid__go {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 1.1rem;
}
</style>
