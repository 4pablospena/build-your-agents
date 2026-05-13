<script setup lang="ts">
const props = defineProps<{
  title: string
  description?: string
  date?: string
  tags?: string[]
  readingMinutes: number
  author?: string
  authorIntro?: string
}>()

const dateLabel = computed(() => {
  if (!props.date) return ''
  try {
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(new Date(props.date))
  } catch {
    return String(props.date)
  }
})
</script>

<template>
  <header class="border-b-[3px] border-ink pb-8">
    <p class="bya-eyebrow mb-4">Blog</p>
    <h1 class="font-display text-[clamp(1.75rem,5vw,3.25rem)] uppercase leading-[0.95] tracking-tight text-ink">
      {{ title }}
    </h1>
    <p v-if="description" class="bya-lede mt-5 text-ink/95">
      {{ description }}
    </p>

    <aside
      v-if="author || authorIntro"
      class="relative mt-6 border-[3px] border-ink bg-paper-2 p-5 shadow-[6px_6px_0_0_#2563ff]"
      aria-label="Author note"
    >
      <div class="absolute left-0 top-0 h-full w-1.5 bg-hot" aria-hidden="true" />
      <p class="pl-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink/80">From the author</p>
      <p v-if="author" class="mt-2 pl-3 font-display text-sm uppercase tracking-tight text-ink">
        {{ author }}
      </p>
      <p v-if="authorIntro" class="mt-3 pl-3 font-serif text-base leading-relaxed text-ink/95">
        {{ authorIntro }}
      </p>
    </aside>

    <div class="mt-6 flex flex-wrap items-center gap-3 font-mono text-sm text-ink/85">
      <time v-if="date" :datetime="date">{{ dateLabel }}</time>
      <span v-if="date" aria-hidden="true" class="text-hot">·</span>
      <span class="bya-chip">{{ readingMinutes }} min read</span>
    </div>
    <div v-if="tags?.length" class="mt-5 flex flex-wrap gap-2">
      <NuxtLink
        v-for="t in tags"
        :key="t"
        :to="{ path: '/blog', query: { tag: t } }"
        class="border-[3px] border-ink bg-sky px-2.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-paper shadow-[4px_4px_0_0_#0a0a0a] transition-transform hover:-translate-x-px hover:-translate-y-px hover:bg-ink hover:text-paper hover:shadow-[5px_5px_0_0_#ff3d00]"
      >
        {{ t }}
      </NuxtLink>
    </div>
  </header>
</template>
