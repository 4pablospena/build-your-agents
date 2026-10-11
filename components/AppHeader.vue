<script setup lang="ts">
// Top navigation. Data from useSiteNav — thin presentation only.
defineProps<{
  active?:
    | 'top'
    | 'architecture'
    | 'files'
    | 'session-loop'
    | 'docs-page'
    | 'blog-page'
    | 'configure-page'
    | 'examples-page'
    | 'changelog-page'
    | 'openclaw-page'
    | 'help-page'
}>()

const { headerLinks } = useSiteNav()

const NAV_ID = 'hdr-primary-nav'
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="hdr">
    <div class="bya-container hdr__shell">
      <NuxtLink class="hdr__brand" to="/#top" aria-label="Build your own agents" @click="closeMenu">
        BUILD/YOUR/AGENTS
      </NuxtLink>
      <button type="button" class="hdr__menu-btn" :aria-expanded="menuOpen" :aria-controls="NAV_ID" @click="toggleMenu">
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
      <nav :id="NAV_ID" class="hdr__nav" :class="{ 'is-open': menuOpen }" aria-label="Primary">
        <NuxtLink v-for="link in headerLinks" :key="link.id" :to="link.to" :class="['hdr__link', { 'is-active': active === link.id }]" :aria-current="active === link.id ? 'page' : undefined" @click="closeMenu">
          {{ link.label }}
        </NuxtLink>
      </nav>
      <NuxtLink class="bya-btn hdr__cta" to="/configure" @click="closeMenu">Build agent</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.hdr { position: sticky; top: 0; z-index: 50; background: var(--paper); border-bottom: 1px solid var(--ink); }
.hdr__shell { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 20px; min-height: 84px; }
.hdr__brand { font-family: var(--display); font-size: 26px; letter-spacing: -.02em; line-height: 1; text-decoration: none; }
.hdr__nav { display: flex; justify-content: center; gap: 4px; }
.hdr__link { padding: 9px 14px; border-radius: 48px; font-size: 13px; font-weight: 700; text-decoration: none; transition: background 150ms ease, color 150ms ease; }
.hdr__link:hover { background: var(--lemon); }
.hdr__link.is-active { background: var(--ink); color: var(--paper); }
.hdr__cta { padding: 12px 24px; min-height: 44px; font-size: 13px; }
.hdr__menu-btn { display: none; border: 1px solid currentColor; background: transparent; color: var(--ink); border-radius: 48px; min-height: 44px; padding: 10px 18px; font-size: 13px; font-weight: 700; cursor: pointer; }
@media (max-width: 1000px) {
  .hdr__shell { grid-template-columns: 1fr auto auto; gap: 12px; min-height: 76px; padding-block: 12px; }
  .hdr__menu-btn { display: block; }
  .hdr__nav { display: none; grid-column: 1 / -1; grid-row: 2; flex-wrap: wrap; justify-content: flex-start; padding-block: 12px; border-top: 1px solid var(--line); }
  .hdr__nav.is-open { display: flex; animation: menu-open 150ms ease both; }
  .hdr__cta { grid-column: 3; grid-row: 1; }
}
@keyframes menu-open { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
@media (max-width: 520px) {
  .hdr__brand { font-size: 21px; }
  .hdr__shell { grid-template-columns: 1fr auto; }
  .hdr__cta { display: none; }
  .hdr__nav { gap: 8px; }
  .hdr__link { flex: 1 0 25%; text-align: center; }
}
</style>
