<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'

const props = defineProps<{
  post: BlogPost
  readingMinutes: number
}>()

const slug = computed(() => (props.post._path ? blogSlugFromPath(props.post._path) : ''))

const dateLabel = computed(() => {
  const d = props.post.date
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(new Date(d))
  } catch {
    return String(d)
  }
})
</script>

<template>
  <article
    class="group flex h-full flex-col overflow-hidden rounded-lg border-[3px] border-ink bg-paper shadow-[6px_6px_0_0_#0a0a0a] transition-transform hover:-translate-y-0.5"
  >
    <NuxtLink :to="`/blog/${slug}`" class="block shrink-0 border-b-[3px] border-ink bg-paper-2 aspect-[1200/630] overflow-hidden">
      <img
        v-if="post.cover"
        :src="post.cover"
        :alt="post.title || 'Cover'"
        class="h-full w-full object-cover"
        width="600"
        height="315"
        loading="lazy"
      />
      <div
        v-else
        class="flex h-full min-h-[140px] items-center justify-center font-display text-sm uppercase tracking-wide text-ink/50"
      >
        No cover
      </div>
    </NuxtLink>

    <div class="flex flex-1 flex-col gap-3 p-5">
      <div class="flex flex-wrap items-center gap-2 font-mono text-xs text-ink/80">
        <time v-if="dateLabel" :datetime="post.date">{{ dateLabel }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ readingMinutes }} min read</span>
      </div>

      <NuxtLink :to="`/blog/${slug}`" class="block">
        <h2 class="font-display text-xl leading-snug text-ink group-hover:underline decoration-2 underline-offset-2">
          {{ post.title }}
        </h2>
      </NuxtLink>

      <p v-if="post.description" class="line-clamp-3 font-serif text-sm leading-relaxed text-ink/90">
        {{ post.description }}
      </p>

      <div v-if="post.tags?.length" class="mt-auto flex flex-wrap gap-2">
        <NuxtLink
          v-for="t in post.tags"
          :key="t"
          :to="{ path: '/blog', query: { tag: t } }"
          class="rounded border-2 border-ink bg-lemon px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink hover:bg-acid"
          @click.stop
        >
          {{ t }}
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
