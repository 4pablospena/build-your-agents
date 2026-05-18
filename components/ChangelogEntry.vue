<script setup lang="ts">
import type { ChangelogEntry } from '~/composables/useChangelog'

const props = defineProps<{
  entry: ChangelogEntry
}>()

const { byId } = useAgentFiles()

const file = computed(() => byId(props.entry.file))

const dateLabel = computed(() => formatChangelogDate(props.entry.date))

const headline = computed(() => props.entry.title || props.entry.reason)

const postHref = computed(() => changelogPostHref(props.entry.post))

const entryAnchor = computed(() =>
  props.entry._path ? changelogSlugFromPath(props.entry._path) : undefined
)
</script>

<template>
  <article
    v-if="file"
    :id="entryAnchor"
    :class="['cl-entry', `cl-entry--${file.color}`]"
  >
    <header class="cl-entry__head">
      <time class="cl-entry__date" :datetime="entry.date">{{ dateLabel }}</time>
      <NuxtLink
        class="cl-entry__file"
        :to="`/#file-${file.id}`"
        :title="file.role"
      >
        <span class="cl-entry__sym" aria-hidden="true">{{ file.symbol }}</span>
        <span>{{ file.filename }}</span>
      </NuxtLink>
    </header>

    <h2 class="cl-entry__title">{{ headline }}</h2>
    <p class="cl-entry__reason">{{ entry.reason }}</p>

    <footer class="cl-entry__foot">
      <NuxtLink class="cl-entry__link" :to="`/docs#docs-card-${file.id}`">
        Template
        <span aria-hidden="true">↗</span>
      </NuxtLink>
      <NuxtLink v-if="postHref" class="cl-entry__link" :to="postHref">
        Read post
        <span aria-hidden="true">↗</span>
      </NuxtLink>
    </footer>
  </article>
  <article v-else class="cl-entry cl-entry--unknown">
    <p class="cl-entry__reason">Unknown file id: {{ entry.file }}</p>
  </article>
</template>

<style scoped>
.cl-entry {
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow);
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--paper);
}
.cl-entry--hot   { background: var(--hot);   color: var(--paper); }
.cl-entry--sky   { background: var(--sky);   color: var(--paper); }
.cl-entry--lemon { background: var(--lemon); color: var(--ink); }
.cl-entry--pink  { background: var(--pink);  color: var(--paper); }
.cl-entry--acid  { background: var(--acid);  color: var(--ink); }
.cl-entry--grape { background: var(--grape); color: var(--paper); }
.cl-entry--ink   { background: var(--ink);   color: var(--paper); }

.cl-entry__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.cl-entry__date {
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.88;
}
.cl-entry__file {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--display);
  font-size: 0.88rem;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding: 4px 10px;
  border: var(--stroke) solid currentColor;
  background: rgba(10, 10, 10, 0.12);
}
.cl-entry--lemon .cl-entry__file,
.cl-entry--acid .cl-entry__file {
  background: rgba(10, 10, 10, 0.08);
}
.cl-entry--ink .cl-entry__file {
  background: rgba(246, 241, 228, 0.1);
  border-color: var(--lemon);
}
.cl-entry__file:hover {
  transform: translate(-1px, -1px);
}
.cl-entry__sym {
  font-size: 1.1rem;
  line-height: 1;
}

.cl-entry__title {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(1rem, 2vw, 1.25rem);
  text-transform: uppercase;
  line-height: 1.15;
}
.cl-entry__reason {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  opacity: 0.92;
}

.cl-entry__foot {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
  padding-top: 12px;
  border-top: 2px dashed currentColor;
}
.cl-entry__link {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;
  padding: 6px 10px;
  border: 2px solid currentColor;
}
.cl-entry__link:hover {
  background: rgba(10, 10, 10, 0.15);
}
.cl-entry--ink .cl-entry__link:hover {
  background: rgba(246, 241, 228, 0.12);
}
</style>
