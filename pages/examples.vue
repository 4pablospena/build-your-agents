<script setup lang="ts">
import type { BlogPost } from '~/composables/useBlogPosts'

const { data: caseStudies } = await useAsyncData('case-studies', () =>
  useCaseStudyListQuery().find() as Promise<BlogPost[]>
)

const list = computed(() => caseStudies.value ?? [])

useHead({
  title: 'Examples — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Real agents built with the seven-file spec. Each case study shows the problem, which files were touched, and a link to the full walkthrough.'
    }
  ]
})
</script>

<template>
  <main class="expg">
    <AppHeader active="examples-page" />

    <section class="expg__hero">
      <div class="expg__deco expg__deco--a" aria-hidden="true">PROOF</div>
      <div class="expg__deco expg__deco--b" aria-hidden="true">CASES</div>
      <div class="expg__deco expg__deco--c" aria-hidden="true">★</div>

      <div class="bya-container expg__hero-inner">
        <span class="bya-eyebrow bya-rise bya-rise-1">Case studies</span>

        <h1 class="bya-h1 expg__title bya-rise bya-rise-2">
          Someone<br />
          <span class="expg__title-accent">already did</span><br />
          <span class="expg__title-stamp">it this way.</span>
        </h1>

        <p class="bya-lede expg__lede bya-rise bya-rise-3">
          Field notes from agents shipped with the seven-file spec — what broke
          in the first draft, what the PDF never said out loud, and which
          <code class="expg__code">.md</code> files actually moved.
        </p>

        <div class="expg__cta-row bya-rise bya-rise-4">
          <NuxtLink class="bya-btn" to="/start">
            Start your own folder
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink class="bya-btn bya-btn--ghost" to="/docs">
            Download templates
          </NuxtLink>
        </div>
      </div>
    </section>

    <MarqueeBar
      :items="[
        'Real agents',
        'Files touched',
        'First-draft mistakes',
        'Production lessons',
        'Read the walkthrough',
        'Tag: case-study'
      ]"
    />

    <section class="expg__list-wrap">
      <div class="bya-container">
        <header class="expg__list-head">
          <span class="bya-eyebrow">Published examples</span>
          <h2 class="bya-h2">
            Problem → <span class="expg__hl">files</span> → post.
          </h2>
          <p class="expg__list-lede">
            New case studies are blog posts tagged
            <code class="expg__code">case-study</code> with optional
            <code class="expg__code">filesTouched</code> in frontmatter. No
            hard-coded slugs in this page.
          </p>
        </header>

        <p v-if="!list.length" class="expg__empty">
          No case studies published yet. Add a post under
          <code class="expg__code">content/posts/</code> with
          <code class="expg__code">tags: [case-study]</code>.
        </p>

        <div v-else class="expg__grid">
          <ExampleCard
            v-for="(post, i) in list"
            :key="post._path || post._id"
            :post="post"
            :index="i"
          />
        </div>
      </div>
    </section>

    <section class="expg__band">
      <div class="bya-container expg__band-inner">
        <span class="bya-eyebrow expg__band-eyebrow">Your turn</span>
        <h2 class="bya-h2 expg__band-title">
          Ship one.<br />
          <span class="expg__band-hl">Tag it when you write it up.</span>
        </h2>
        <p class="expg__band-lede">
          When your agent is running in production, publish a post with
          <code class="expg__code">case-study</code> and list the files you
          changed. This page picks it up automatically.
        </p>
        <NuxtLink class="bya-btn" to="/blog">
          Read the blog
          <span aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.expg {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  position: relative;
  z-index: 2;
}

.expg__hero {
  position: relative;
  padding: 96px 0 64px;
  overflow: hidden;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(700px 340px at 78% 8%, rgba(255, 46, 147, 0.2), transparent 58%),
    radial-gradient(600px 320px at 8% 72%, rgba(255, 61, 0, 0.16), transparent 58%),
    var(--paper);
}
.expg__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(2.4rem, 7vw, 6.5rem);
  pointer-events: none;
  user-select: none;
  opacity: 0.45;
  z-index: 0;
}
.expg__deco--a { top: 6%; left: -2%; transform: rotate(-7deg); }
.expg__deco--b { bottom: 12%; right: -3%; -webkit-text-stroke-color: var(--hot); transform: rotate(5deg); }
.expg__deco--c {
  top: 10%; right: 10%;
  font-size: 4.5rem;
  color: var(--lemon);
  -webkit-text-stroke: 3px var(--ink);
  opacity: 0.9;
}

.expg__hero-inner {
  position: relative;
  z-index: 2;
  max-width: 720px;
}
.expg__title { margin: 22px 0 26px; }
.expg__title-accent {
  display: inline-block;
  background: var(--pink);
  color: var(--paper);
  padding: 0 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 8px 8px 0 0 var(--ink);
  transform: rotate(-1.2deg);
  margin: 4px 0;
}
.expg__title-stamp {
  display: inline-block;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}
.expg__lede { margin: 0 0 28px; max-width: 54ch; }
.expg__code {
  font-family: var(--mono);
  font-size: 0.88em;
  padding: 2px 6px;
  border: 2px solid var(--ink);
  background: var(--paper);
}
.expg__cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.expg__list-wrap {
  padding: 72px 0 80px;
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.expg__list-head {
  margin-bottom: 44px;
  max-width: 720px;
}
.expg__list-head .bya-eyebrow { margin-bottom: 12px; }
.expg__hl {
  display: inline-block;
  background: var(--acid);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.9deg);
}
.expg__list-lede {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 18px 0 0;
  max-width: 58ch;
}

.expg__empty {
  font-family: var(--mono);
  font-size: 0.88rem;
  padding: 28px;
  border: 3px dashed var(--ink);
  background: var(--paper-2);
  max-width: 52ch;
}

.expg__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
}

.expg__band {
  padding: 64px 0 96px;
  background: var(--ink);
  color: var(--paper);
}
.expg__band-inner { max-width: 640px; }
.expg__band-eyebrow {
  background: var(--lemon);
  color: var(--ink);
  border-color: var(--lemon);
}
.expg__band-title { margin: 16px 0 14px; }
.expg__band-hl {
  display: inline-block;
  background: var(--hot);
  padding: 0 12px;
  border: var(--stroke) solid var(--paper);
  box-shadow: 6px 6px 0 0 var(--lemon);
}
.expg__band-lede {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 0 0 22px;
  max-width: 52ch;
  opacity: 0.92;
}
.expg__band-lede .expg__code {
  background: rgba(246, 241, 228, 0.12);
  border-color: var(--paper);
  color: var(--paper);
}
</style>
