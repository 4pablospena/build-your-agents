<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'

useHead({
  title: 'Blog — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Notes on designing modular AI agents: memory, rules, tooling, and field lessons from the seven-file spec.'
    }
  ]
})

const route = useRoute()
const router = useRouter()

const { data: rawPosts } = await useAsyncData('blog-posts-all', () => useBlogPostListQuery().find() as Promise<BlogPost[]>)

const tag = computed(() => String(route.query.tag || '').trim())
const page = computed(() => Math.max(1, parseInt(String(route.query.page || '1'), 10) || 1))
const qInput = ref(String(route.query.q || ''))

watch(
  () => route.query.q,
  (v) => {
    qInput.value = String(v || '')
  }
)

let searchTimer: ReturnType<typeof setTimeout> | undefined
function scheduleSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    const q = qInput.value.trim()
    router.replace({
      path: '/blog',
      query: {
        ...route.query,
        q: q || undefined,
        page: undefined
      }
    })
  }, 320)
}

const filtered = computed(() => {
  let list = [...(rawPosts.value || [])]
  if (tag.value) {
    list = list.filter((p) => Array.isArray(p.tags) && p.tags.includes(tag.value))
  }
  const q = String(route.query.q || '')
    .trim()
    .toLowerCase()
  if (q) {
    list = list.filter((p) => {
      const title = String(p.title || '').toLowerCase()
      const desc = String(p.description || '').toLowerCase()
      return title.includes(q) || desc.includes(q)
    })
  }
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / BLOG_PAGE_SIZE)))

const safePage = computed(() => Math.min(page.value, totalPages.value))

const paged = computed(() => {
  const start = (safePage.value - 1) * BLOG_PAGE_SIZE
  return filtered.value.slice(start, start + BLOG_PAGE_SIZE)
})

function pageQuery(target: number) {
  return { path: '/blog', query: { ...route.query, page: target <= 1 ? undefined : String(target) } }
}
</script>

<template>
  <div id="blog-root" class="min-h-screen bg-paper text-ink">
    <AppHeader active="blog-page" />

    <main class="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div class="mb-10 flex flex-col gap-6 border-b-[3px] border-ink pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-ink/70">Journal</p>
          <h1 class="mt-2 font-display text-4xl text-ink sm:text-5xl">Blog</h1>
          <p class="mt-3 max-w-xl font-serif text-base leading-relaxed text-ink/90">
            Longer notes on agents, specs, and practice. Filter by tag or search titles and descriptions.
          </p>
        </div>
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 self-start rounded border-2 border-ink bg-paper-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wide hover:bg-hot hover:text-paper"
        >
          ← Back to site
        </NuxtLink>
      </div>

      <div class="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label class="flex w-full max-w-md flex-col gap-2 font-mono text-xs uppercase tracking-wide text-ink/80">
          Search
          <input
            v-model="qInput"
            type="search"
            autocomplete="off"
            class="rounded border-2 border-ink bg-paper px-3 py-2 font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-sky"
            placeholder="Title or description…"
            @input="scheduleSearch"
          />
        </label>
        <div v-if="tag" class="flex items-center gap-2 font-mono text-sm">
          <span>Filtered by</span>
          <span class="rounded border-2 border-ink bg-lemon px-2 py-1 font-bold">{{ tag }}</span>
          <NuxtLink to="/blog" class="underline decoration-2 underline-offset-2 hover:text-sky"> Clear </NuxtLink>
        </div>
      </div>

      <p v-if="!paged.length" class="rounded border-2 border-dashed border-ink/40 bg-paper-2 px-4 py-8 text-center font-mono text-sm text-ink/80">
        No posts match. Try another search or
        <NuxtLink class="font-bold underline" to="/blog">reset filters</NuxtLink>.
      </p>

      <div v-else class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <BlogCard
          v-for="post in paged"
          :key="post._path || post._id"
          :post="post"
          :reading-minutes="estimateReadingMinutesFromPost(post)"
        />
      </div>

      <nav
        v-if="totalPages > 1"
        class="mt-12 flex flex-wrap items-center justify-center gap-3 border-t-[3px] border-ink pt-8 font-mono text-sm"
        aria-label="Pagination"
      >
        <NuxtLink
          v-if="page > 1"
          :to="pageQuery(page - 1)"
          class="rounded border-2 border-ink bg-paper px-3 py-2 hover:bg-acid"
        >
          ← Newer
        </NuxtLink>
        <span class="px-2 text-ink/80"> Page {{ safePage }} / {{ totalPages }} </span>
        <NuxtLink
          v-if="page < totalPages"
          :to="pageQuery(page + 1)"
          class="rounded border-2 border-ink bg-paper px-3 py-2 hover:bg-acid"
        >
          Older →
        </NuxtLink>
      </nav>
    </main>
  </div>
</template>
