<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'

const props = defineProps<{
  post: BlogPost
  index: number
}>()

const slug = computed(() => (props.post._path ? blogSlugFromPath(props.post._path) : ''))

const postHref = computed(() => `/blog/${slug.value}`)

const dateLabel = computed(() => {
  const d = props.post.date
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(d))
  } catch {
    return String(d)
  }
})

const readingMinutes = computed(() => estimateReadingMinutesFromPost(props.post))
</script>

<template>
  <article
    :class="['ex', index % 2 === 0 ? 'tilt-l' : 'tilt-r']"
  >
    <header class="ex__head">
      <span class="ex__num">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="ex__badge">Case study</span>
    </header>

    <NuxtLink :to="postHref" class="ex__cover-link">
      <img
        v-if="post.cover"
        :src="post.cover"
        :alt="post.title || 'Case study cover'"
        class="ex__cover"
        width="600"
        height="315"
        loading="lazy"
      />
      <div
        v-else
        class="ex__cover ex__cover--empty"
        aria-hidden="true"
      >
        No cover
      </div>
    </NuxtLink>

    <div class="ex__body">
      <p class="ex__eyebrow">
        <time v-if="dateLabel" :datetime="post.date">{{ dateLabel }}</time>
        <span v-if="dateLabel" aria-hidden="true"> · </span>
        <span>{{ readingMinutes }} min read</span>
      </p>

      <h2 class="bya-h3 ex__title">
        <NuxtLink :to="postHref">{{ post.title }}</NuxtLink>
      </h2>

      <section class="ex__problem" aria-labelledby="ex-problem-label">
        <h3 id="ex-problem-label" class="ex__problem-label">Problem</h3>
        <p class="ex__problem-text">{{ post.description }}</p>
      </section>

      <FilesTouchedStrip
        v-if="post.filesTouched?.length"
        :file-ids="post.filesTouched"
        layout="horizontal"
        compact
      />

      <footer class="ex__foot">
        <NuxtLink class="bya-btn ex__cta" :to="postHref">
          Read the walkthrough
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </footer>
    </div>
  </article>
</template>

<style scoped>
.ex {
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}
.ex__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  background: var(--ink);
  color: var(--paper);
}
.ex__num {
  font-family: var(--display);
  font-size: 1.6rem;
  line-height: 1;
  color: var(--lemon);
  -webkit-text-stroke: 2px var(--paper);
}
.ex__badge {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  background: var(--hot);
  border: 2px solid var(--paper);
}

.ex__cover-link {
  display: block;
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.ex__cover {
  display: block;
  width: 100%;
  aspect-ratio: 1200 / 630;
  object-fit: cover;
  max-height: 220px;
}
.ex__cover--empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  background: var(--paper-2);
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.82rem;
  color: var(--ink);
  opacity: 0.45;
}

.ex__body {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px 22px 24px;
}
.ex__eyebrow {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
}
.ex__title {
  margin: 0;
  font-size: clamp(1.15rem, 2.4vw, 1.55rem);
  line-height: 1.15;
}
.ex__title a {
  color: inherit;
  text-decoration: none;
}
.ex__title a:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.ex__problem-label {
  margin: 0 0 8px;
  font-family: var(--display);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hot);
}
.ex__problem-text {
  margin: 0;
  font-family: var(--serif);
  font-size: 1.02rem;
  line-height: 1.5;
  padding: 12px 14px;
  border-left: var(--stroke-fat) solid var(--ink);
  background: var(--paper-2);
}

.ex__foot {
  margin-top: 4px;
  padding-top: 16px;
  border-top: 2px dashed var(--ink);
}
.ex__cta {
  font-size: 0.82rem;
  padding: 12px 18px;
}

@media (prefers-reduced-motion: reduce) {
  .ex.tilt-l,
  .ex.tilt-r {
    transform: none;
  }
}
</style>
