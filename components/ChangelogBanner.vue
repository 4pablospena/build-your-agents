<script setup lang="ts">
import type { ChangelogEntry } from '~/composables/useChangelog'

const { byId } = useAgentFiles()

const { data: entries } = await useAsyncData('changelog-all', () =>
  useChangelogListQuery().find()
)

const recent = computed(() =>
  latestRecentChangelogEntry((entries.value as ChangelogEntry[]) ?? [])
)

const fileMeta = computed(() => {
  if (!recent.value) return null
  return byId(recent.value.file)
})
</script>

<template>
  <aside
    v-if="recent && fileMeta"
    class="cl-banner"
    role="status"
    aria-live="polite"
  >
    <div class="bya-container cl-banner__inner">
      <p class="cl-banner__text">
        <span class="cl-banner__label">Spec updated</span>
        <time :datetime="recent.date">{{ formatChangelogDate(recent.date) }}</time>
        <span aria-hidden="true">—</span>
        <NuxtLink
          class="cl-banner__file"
          :to="`/#file-${fileMeta.id}`"
        >
          {{ fileMeta.filename }}
        </NuxtLink>
        <span aria-hidden="true">·</span>
        <NuxtLink class="cl-banner__cta" to="/changelog">
          see changelog
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </p>
    </div>
  </aside>
</template>

<style scoped>
.cl-banner {
  background: var(--lemon);
  color: var(--ink);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.cl-banner__inner {
  padding: 10px 0;
}
.cl-banner__text {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.cl-banner__label {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  padding: 2px 8px;
  background: var(--ink);
  color: var(--paper);
}
.cl-banner__file {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: inherit;
}
.cl-banner__cta {
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--hot);
}
.cl-banner__cta:hover {
  text-decoration: underline;
}
</style>
