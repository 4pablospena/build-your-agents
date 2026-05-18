<script setup lang="ts">
import type { ToolId } from '~/composables/useToolsNav'
import { toolsNav } from '~/composables/useToolsNav'

defineProps<{
  active: ToolId
  title: string
  lede?: string
  eyebrow?: string
}>()
</script>

<template>
  <main class="tls">
    <AppHeader active="tools-page" />

    <section class="tls__hero">
      <div class="tls__deco tls__deco--a" aria-hidden="true">TOOLS</div>
      <div class="tls__deco tls__deco--b" aria-hidden="true">UTILS</div>

      <div class="bya-container tls__hero-inner">
        <span class="bya-eyebrow">{{ eyebrow || 'Utilities' }}</span>
        <h1 class="bya-h1 tls__title">{{ title }}</h1>
        <p v-if="lede" class="bya-lede tls__lede">{{ lede }}</p>

        <nav class="tls__subnav" aria-label="Tools">
          <NuxtLink
            class="tls__subnav-link"
            :class="{ 'is-active': active === 'hub' }"
            to="/tools"
          >
            All tools
          </NuxtLink>
          <NuxtLink
            v-for="t in toolsNav"
            :key="t.id"
            class="tls__subnav-link"
            :class="{ 'is-active': active === t.id }"
            :to="t.path"
          >
            {{ t.label }}
          </NuxtLink>
        </nav>
      </div>
    </section>

    <section class="tls__body">
      <div class="bya-container tls__content">
        <slot />
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.tls {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
}
.tls__hero {
  position: relative;
  padding: 88px 0 40px;
  overflow: hidden;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(640px 320px at 90% 0%, rgba(108, 43, 217, 0.16), transparent 55%),
    radial-gradient(520px 280px at 4% 80%, rgba(200, 255, 0, 0.2), transparent 55%),
    var(--paper);
}
.tls__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(2rem, 7vw, 6rem);
  pointer-events: none;
  opacity: 0.4;
}
.tls__deco--a { top: 6%; left: -2%; transform: rotate(-5deg); }
.tls__deco--b {
  bottom: 10%; right: -2%;
  -webkit-text-stroke-color: var(--grape);
  transform: rotate(4deg);
}
.tls__hero-inner {
  position: relative;
  z-index: 1;
  max-width: 820px;
}
.tls__title { margin: 16px 0 14px; }
.tls__lede { margin: 0 0 22px; max-width: 58ch; }

.tls__subnav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.tls__subnav-link {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 12px;
  border: var(--stroke) solid var(--ink);
  background: var(--paper);
  text-decoration: none;
  color: inherit;
  box-shadow: 3px 3px 0 0 var(--ink);
}
.tls__subnav-link:hover {
  background: var(--acid);
  transform: translate(-1px, -1px);
}
.tls__subnav-link.is-active {
  background: var(--ink);
  color: var(--paper);
}

.tls__body {
  padding: 48px 0 88px;
}
.tls__content {
  max-width: 900px;
}
</style>
