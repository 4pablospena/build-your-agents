<script setup lang="ts">
import type { AgentFileId, BlogPost } from '~/composables/useBlogPosts'
import { blogSlugFromPath } from '~/composables/useBlogPosts'

defineProps<{
  fileId: AgentFileId
  posts: BlogPost[]
}>()
</script>

<template>
  <div v-if="posts.length" class="dbl">
    <span class="dbl__label">Leer en el blog</span>
    <ul class="dbl__list" role="list">
      <li v-for="post in posts" :key="post._path || post._id" role="listitem">
        <NuxtLink
          v-if="post._path"
          class="dbl__link"
          :to="`/blog/${blogSlugFromPath(post._path)}`"
        >
          <span class="dbl__title">{{ post.title }}</span>
          <span v-if="post.description" class="dbl__desc">{{ post.description }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dbl {
  margin-top: 4px;
  padding-top: 12px;
  border-top: 2px dashed currentColor;
}
.dbl__label {
  display: block;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.88;
  margin-bottom: 8px;
}
.dbl__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dbl__link {
  display: block;
  padding: 10px 12px;
  border: var(--stroke) solid var(--ink);
  background: var(--paper);
  color: var(--ink);
  text-decoration: none;
  box-shadow: 3px 3px 0 0 var(--ink);
  transition: transform 100ms ease, box-shadow 100ms ease;
}
.dbl__link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 0 var(--ink);
  background: var(--lemon);
}
.dbl__title {
  display: block;
  font-family: var(--display);
  font-size: 0.82rem;
  text-transform: uppercase;
  line-height: 1.2;
  margin-bottom: 4px;
}
.dbl__desc {
  display: block;
  font-family: var(--serif);
  font-size: 0.88rem;
  line-height: 1.35;
  opacity: 0.9;
}
</style>
