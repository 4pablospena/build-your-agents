<script setup lang="ts">
import type { ChangelogEntry } from '~/composables/useChangelog'

const { files } = useAgentFiles()

const { data: raw } = await useAsyncData('changelog-list', () =>
  useChangelogListQuery().find()
)

const entries = computed(() => (raw.value as ChangelogEntry[]) ?? [])

/** Group entries by date (newest date first). */
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

useHead({
  title: 'Changelog — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Version history of the seven-file agent spec. Every template change is logged with date, file, and reason.'
    }
  ]
})
</script>

<template>
  <main class="clpg">
    <AppHeader active="changelog-page" />

    <section class="clpg__hero">
      <div class="clpg__deco clpg__deco--a" aria-hidden="true">VERSION</div>
      <div class="clpg__deco clpg__deco--b" aria-hidden="true">YOUR SOUL</div>
      <div class="clpg__deco clpg__deco--c" aria-hidden="true">★</div>

      <div class="bya-container clpg__hero-inner">
        <span class="bya-eyebrow bya-rise bya-rise-1">Living spec</span>

        <h1 class="bya-h1 clpg__title bya-rise bya-rise-2">
          Changelog<br />
          <span class="clpg__title-accent">for the</span><br />
          <span class="clpg__title-stamp">seven files.</span>
        </h1>

        <p class="bya-lede clpg__lede bya-rise bya-rise-3">
          Every edit to <code class="clpg__code">templates/*.md</code> gets an
          entry here — date, file touched, and why. Optional link to a blog post
          when the story is worth reading.
        </p>

        <p class="clpg__policy bya-rise bya-rise-4">
          Policy: same commit as the template change. See
          <a class="clpg__policy-link" href="https://github.com/4pablospena/build-your-agents/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">CHANGELOG.md</a>
          in the repo.
        </p>
      </div>
    </section>

    <MarqueeBar
      :items="[
        'Version your soul',
        'Markdown is the API',
        'One file per entry',
        'No silent edits',
        'templates/*.md',
        'See /docs'
      ]"
    />

    <section class="clpg__list-wrap">
      <div class="bya-container">
        <header class="clpg__list-head">
          <span class="bya-eyebrow">History</span>
          <h2 class="bya-h2">
            What changed <span class="clpg__hl">and when.</span>
          </h2>
        </header>

        <p v-if="!entries.length" class="clpg__empty">
          No changelog entries yet. Add markdown under
          <code class="clpg__code">content/changelog/</code>.
        </p>

        <div v-else class="clpg__timeline">
          <section
            v-for="[day, dayEntries] in byDate"
            :key="day"
            class="clpg__day"
          >
            <header class="clpg__day-head">
              <h3 class="clpg__day-date">
                <time :datetime="day">{{ formatChangelogDate(day) }}</time>
              </h3>
              <span class="clpg__day-count">{{ dayEntries.length }} file{{ dayEntries.length === 1 ? '' : 's' }}</span>
            </header>
            <div class="clpg__day-grid">
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

    <section class="clpg__band">
      <div class="bya-container clpg__band-inner">
        <NuxtLink class="bya-btn" to="/docs">
          Open templates
          <span aria-hidden="true">→</span>
        </NuxtLink>
        <NuxtLink class="bya-btn bya-btn--ghost" to="/">
          Back to overview
          <span aria-hidden="true">↖</span>
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.clpg {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  position: relative;
  z-index: 2;
}

.clpg__hero {
  position: relative;
  padding: 96px 0 56px;
  overflow: hidden;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(680px 340px at 82% 6%, rgba(255, 214, 10, 0.35), transparent 58%),
    radial-gradient(560px 300px at 4% 80%, rgba(108, 43, 217, 0.14), transparent 58%),
    var(--paper);
}
.clpg__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(2.2rem, 7vw, 6rem);
  pointer-events: none;
  opacity: 0.45;
  z-index: 0;
}
.clpg__deco--a { top: 5%; left: -2%; transform: rotate(-6deg); }
.clpg__deco--b { bottom: 10%; right: -3%; -webkit-text-stroke-color: var(--grape); transform: rotate(4deg); }
.clpg__deco--c {
  top: 8%; right: 8%;
  font-size: 4rem;
  color: var(--acid);
  -webkit-text-stroke: 3px var(--ink);
  opacity: 0.9;
}

.clpg__hero-inner {
  position: relative;
  z-index: 2;
  max-width: 720px;
}
.clpg__title { margin: 22px 0 24px; }
.clpg__title-accent {
  display: inline-block;
  background: var(--grape);
  color: var(--paper);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-1deg);
}
.clpg__title-stamp {
  display: inline-block;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}
.clpg__lede { margin: 0 0 18px; max-width: 54ch; }
.clpg__code {
  font-family: var(--mono);
  font-size: 0.88em;
  padding: 2px 6px;
  border: 2px solid var(--ink);
}
.clpg__policy {
  font-family: var(--mono);
  font-size: 0.78rem;
  margin: 0;
  max-width: 52ch;
  opacity: 0.88;
}
.clpg__policy-link {
  font-weight: 700;
  color: inherit;
}

.clpg__list-wrap {
  padding: 72px 0 80px;
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.clpg__list-head {
  margin-bottom: 40px;
  max-width: 640px;
}
.clpg__list-head .bya-eyebrow { margin-bottom: 12px; }
.clpg__hl {
  display: inline-block;
  background: var(--acid);
  padding: 0 10px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 5px 5px 0 0 var(--ink);
}

.clpg__empty {
  font-family: var(--mono);
  font-size: 0.88rem;
  padding: 24px;
  border: 3px dashed var(--ink);
  background: var(--paper-2);
  max-width: 48ch;
}

.clpg__timeline {
  display: flex;
  flex-direction: column;
  gap: 48px;
}
.clpg__day-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.clpg__day-date {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  text-transform: uppercase;
}
.clpg__day-count {
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.75;
}
.clpg__day-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.clpg__band {
  padding: 48px 0 88px;
  background: var(--ink);
}
.clpg__band-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.clpg__band .bya-btn--ghost {
  background: transparent;
  color: var(--paper);
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}
</style>
