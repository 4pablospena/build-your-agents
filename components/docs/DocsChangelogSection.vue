<script setup lang="ts">
import type { ChangelogEntry } from '~/composables/useChangelog'

const { files } = useAgentFiles()

const { data: raw } = await useAsyncData('docs-changelog-list', () =>
  useChangelogListQuery().find()
)

const entries = computed(() => (raw.value as ChangelogEntry[]) ?? [])

const byDate = computed(() => {
  const map = new Map<string, ChangelogEntry[]>()
  const order = files.map((f) => f.id)
  for (const e of entries.value) {
    const d = e.date || 'unknown'
    const list = map.get(d) ?? []
    list.push(e)
    map.set(d, list)
  }
  for (const [, list] of map) {
    list.sort((a, b) => order.indexOf(a.file) - order.indexOf(b.file))
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]))
})
</script>

<template>
  <section id="changelog" class="dcl">
    <div class="bya-container">
      <header class="dcl__head">
        <span class="bya-eyebrow">Changelog</span>
        <h2 class="bya-h2">
          Spec <span class="dcl__hl">history.</span>
        </h2>
        <p class="dcl__lede">
          Every edit to <code>templates/*.md</code> should get an entry under
          <code>content/changelog/</code> in the same commit.
        </p>
      </header>

      <p v-if="!entries.length" class="dcl__empty">
        No changelog entries yet.
      </p>

      <div v-else class="dcl__timeline">
        <section
          v-for="[day, dayEntries] in byDate"
          :key="day"
          class="dcl__day"
        >
          <header class="dcl__day-head">
            <h3 class="dcl__day-date">
              <time :datetime="day">{{ formatChangelogDate(day) }}</time>
            </h3>
            <span class="dcl__day-count">
              {{ dayEntries.length }} file{{ dayEntries.length === 1 ? '' : 's' }}
            </span>
          </header>
          <div class="dcl__day-grid">
            <ChangelogEntry
              v-for="e in dayEntries"
              :key="e._path || e._id"
              :entry="e"
            />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dcl {
  padding: 72px 0;
  background: var(--paper);
  border-top: var(--stroke-fat) solid var(--ink);
  scroll-margin-top: 5.5rem;
}
.dcl__head { margin-bottom: 32px; max-width: 720px; }
.dcl__hl {
  display: inline-block;
  background: var(--grape);
  color: var(--paper);
  padding: 0 10px;
  border: var(--stroke) solid var(--ink);
}
.dcl__lede {
  font-family: var(--mono);
  font-size: 0.84rem;
  margin: 14px 0 0;
}
.dcl__empty {
  font-family: var(--mono);
  font-size: 0.86rem;
}
.dcl__timeline { display: flex; flex-direction: column; gap: 28px; }
.dcl__day-head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 12px;
}
.dcl__day-date {
  margin: 0;
  font-family: var(--display);
  font-size: 1rem;
  text-transform: uppercase;
}
.dcl__day-count {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.dcl__day-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>
