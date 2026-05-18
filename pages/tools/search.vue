<script setup lang="ts">
useHead({
  title: 'Global search — Tools',
  meta: [
    {
      name: 'description',
      content:
        'Search blog posts, spec changelog entries, and tool pages with an accessible combobox.'
    }
  ]
})
</script>

<template>
  <ToolsShell
    active="search"
    eyebrow="Search"
    title="Find posts, changelog, tools."
    lede="Indexed from @nuxt/content — type at least two characters. Arrow keys to move, Enter to open, Escape to close."
  >
    <div class="tsea">
      <GlobalSearchCombobox autofocus />

      <p class="tsea__note">
        Results link to blog posts, changelog anchors, and other
        <NuxtLink to="/tools">/tools</NuxtLink> routes. The home page and
        /docs are not indexed here on purpose.
      </p>
    </div>
  </ToolsShell>
</template>

<style scoped>
.tsea {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.tsea__note {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.55;
  max-width: 52ch;
  opacity: 0.9;
}
.tsea__note :deep(a) {
  font-weight: 700;
  text-decoration: underline;
}
</style>
