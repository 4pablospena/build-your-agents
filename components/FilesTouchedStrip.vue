<script setup lang="ts">
import type { AgentFileId } from '~/composables/useAgentFiles.types'

const props = withDefaults(
  defineProps<{
    fileIds: AgentFileId[]
    /** `vertical` for blog sidebar; `horizontal` for example cards. */
    layout?: 'vertical' | 'horizontal'
    /** Shorter labels on cards. */
    compact?: boolean
    headline?: string
    ariaLabel?: string
  }>(),
  {
    layout: 'vertical',
    compact: false,
    headline: 'Files touched',
    ariaLabel: 'Spec files touched in this post'
  }
)

const { files, byId } = useAgentFiles()

const touched = computed(() => orderedFilesTouched(props.fileIds, files, byId))
</script>

<template>
  <aside
    v-if="touched.length"
    :class="['fts', `fts--${layout}`, { 'fts--compact': compact }]"
    :aria-label="ariaLabel"
  >
    <header class="fts__head">
      <span class="fts__label">{{ headline }}</span>
      <span class="fts__count" aria-hidden="true">{{ touched.length }}</span>
    </header>
    <ul class="fts__list" role="list">
      <li v-for="f in touched" :key="f.id" class="fts__item" role="listitem">
        <NuxtLink
          class="fts__chip"
          :class="`fts__chip--${f.color}`"
          :to="`/#file-${f.id}`"
          :title="f.role"
        >
          <span class="fts__sym" aria-hidden="true">{{ f.symbol }}</span>
          <span class="fts__name">{{ compact ? f.id.toUpperCase() : f.filename }}</span>
        </NuxtLink>
        <NuxtLink
          class="fts__docs"
          :to="`/docs#docs-card-${f.id}`"
          :aria-label="`Open ${f.filename} template`"
        >
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.fts {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: var(--mono);
}
.fts__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.fts__label {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.85;
}
.fts__count {
  font-family: var(--display);
  font-size: 0.9rem;
  padding: 2px 8px;
  border: 2px solid currentColor;
  line-height: 1;
}

.fts__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fts--horizontal .fts__list {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}
.fts--horizontal .fts__item {
  flex-direction: column;
  align-items: stretch;
  width: auto;
}

.fts__item {
  display: flex;
  align-items: stretch;
  gap: 0;
}

.fts__chip {
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: var(--stroke) solid var(--ink);
  text-decoration: none;
  color: inherit;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 3px 3px 0 0 var(--ink);
  transition: transform 100ms ease, box-shadow 100ms ease;
}
.fts__chip:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 0 var(--ink);
}
.fts--compact .fts__chip {
  padding: 6px 9px;
  font-size: 0.66rem;
}

.fts__chip--hot   { background: var(--hot);   color: var(--paper); }
.fts__chip--sky   { background: var(--sky);   color: var(--paper); }
.fts__chip--lemon { background: var(--lemon); color: var(--ink); }
.fts__chip--pink  { background: var(--pink);  color: var(--paper); }
.fts__chip--acid  { background: var(--acid);  color: var(--ink); }
.fts__chip--grape { background: var(--grape); color: var(--paper); }
.fts__chip--ink   { background: var(--ink);   color: var(--paper); }

.fts__sym {
  font-size: 1rem;
  line-height: 1;
}
.fts__name {
  font-weight: 700;
  word-break: break-all;
}

.fts__docs {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  padding: 0 8px;
  border: var(--stroke) solid var(--ink);
  border-left: none;
  background: var(--paper);
  color: var(--ink);
  text-decoration: none;
  font-size: 0.78rem;
  box-shadow: 3px 3px 0 0 var(--ink);
}
.fts__docs:hover {
  background: var(--acid);
}
.fts--horizontal .fts__docs {
  border-left: var(--stroke) solid var(--ink);
  min-width: 32px;
}

/* Blog sidebar variant */
.fts--vertical.fts:not(.fts--compact) {
  padding: 16px 14px;
  background: var(--paper-2);
  border-left: var(--stroke-fat) solid var(--ink);
  min-width: 148px;
  max-width: 180px;
}
</style>
