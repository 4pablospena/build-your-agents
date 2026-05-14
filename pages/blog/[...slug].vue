<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'

const route = useRoute()
const raw = route.params.slug
const slug = Array.isArray(raw) ? raw.join('/') : String(raw || '')
/** Aligns with Nuxt Content index paths (lowercased). */
const pathSlug = slug.toLowerCase()

if (!pathSlug) {
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}

const { data: doc } = await useAsyncData(`blog-doc-${pathSlug}`, () =>
  queryContent('posts').where({ _path: `/posts/${pathSlug}` }).findOne()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

if (!import.meta.dev && (doc.value as BlogPost).draft) {
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}

const post = computed(() => doc.value as BlogPost)

const readingMinutes = computed(() => estimateReadingMinutesFromPost(post.value))

const { data: chrono } = await useAsyncData('blog-chrono-nav', () => fetchPostsChronological())

const nav = computed(() => {
  const p = post.value
  if (!p?._path || !chrono.value) return { prev: null, next: null }
  return adjacentFromChronological(chrono.value, p._path)
})

const config = useRuntimeConfig()
const siteBase = computed(() => String(config.public.siteUrl || '').replace(/\/$/, ''))

const seoTitle = computed(() => (post.value?.title ? `${post.value.title} — Blog` : 'Blog'))
const seoDesc = computed(() => post.value?.description || '')
const seoUrl = computed(() =>
  siteBase.value ? `${siteBase.value}/blog/${pathSlug}` : `/blog/${pathSlug}`
)
const seoImage = computed(() => {
  const c = post.value?.cover
  if (c && siteBase.value && String(c).startsWith('/')) return `${siteBase.value}${c}`
  if (siteBase.value) return `${siteBase.value}/og.png`
  return '/og.png'
})

useSeoMeta({
  title: seoTitle,
  description: seoDesc,
  ogTitle: seoTitle,
  ogDescription: seoDesc,
  ogType: 'article',
  ogUrl: seoUrl,
  ogImage: seoImage,
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDesc,
  twitterImage: seoImage
})
</script>

<template>
  <div id="blog-root" class="min-h-screen bg-paper text-ink">
    <AppHeader active="blog-page" />

    <article class="bya-container pb-24 pt-8">
      <nav class="mb-8">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 border-[3px] border-ink bg-paper px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink shadow-[6px_6px_0_0_#0a0a0a] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_#ff3d00]"
        >
          ← All posts
        </NuxtLink>
      </nav>

      <div class="flex max-w-4xl flex-col gap-0 border-[3px] border-ink bg-paper shadow-[10px_10px_0_0_#0a0a0a] lg:flex-row">
        <div class="h-2 w-full shrink-0 bg-acid lg:hidden" aria-hidden="true" />
        <div class="hidden w-3 shrink-0 bg-acid lg:block" aria-hidden="true" />
        <div class="min-w-0 flex-1">
          <div
            v-if="post.cover"
            class="aspect-[1200/630] max-h-[min(42vh,420px)] border-b-[3px] border-ink bg-paper-2"
          >
            <img
              :src="post.cover"
              :alt="post.title || 'Cover'"
              class="h-full w-full object-cover"
              width="1200"
              height="630"
              fetchpriority="high"
            />
          </div>

          <div class="p-6 sm:p-8 lg:p-10">
            <BlogHeader
              :title="post.title || 'Untitled'"
              :description="post.description"
              :date="post.date"
              :tags="post.tags"
              :reading-minutes="readingMinutes"
              :author="post.author"
              :author-intro="post.authorIntro"
            />

            <div class="prose prose-lg prose-blog max-w-none pt-2">
              <ContentRenderer :value="doc!" />
            </div>
          </div>
        </div>
      </div>

      <nav
        class="mt-12 grid max-w-4xl gap-4 font-mono text-sm sm:grid-cols-2"
        aria-label="Adjacent posts"
      >
        <NuxtLink
          v-if="nav.prev"
          :to="`/blog/${blogSlugFromPath(nav.prev._path!)}`"
          class="border-[3px] border-ink bg-paper-2 px-4 py-4 shadow-[6px_6px_0_0_#0a0a0a] transition-transform hover:-translate-y-0.5 hover:bg-acid"
        >
          <span class="block text-xs uppercase tracking-wide text-ink/70">Previous</span>
          <span class="mt-1 block font-bold uppercase tracking-tight text-ink">{{ nav.prev.title }}</span>
        </NuxtLink>
        <div v-else class="hidden sm:block" />

        <NuxtLink
          v-if="nav.next"
          :to="`/blog/${blogSlugFromPath(nav.next._path!)}`"
          class="border-[3px] border-ink bg-paper-2 px-4 py-4 text-right shadow-[6px_6px_0_0_#0a0a0a] transition-transform hover:-translate-y-0.5 hover:bg-lemon sm:col-start-2"
        >
          <span class="block text-xs uppercase tracking-wide text-ink/70">Next</span>
          <span class="mt-1 block font-bold uppercase tracking-tight text-ink">{{ nav.next.title }}</span>
        </NuxtLink>
      </nav>
    </article>
  </div>
</template>
