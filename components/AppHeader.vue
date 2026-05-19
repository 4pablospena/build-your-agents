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
    | 'start-page'
    | 'examples-page'
    | 'changelog-page'
    | 'openclaw-page'
    | 'tools-page'
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

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeMenu()
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <header class="hdr">
    <div class="bya-container hdr__shell">
      <NuxtLink class="hdr__brand" to="/#top" aria-label="Build your own agents">
        <span class="hdr__mark" aria-hidden="true">◣◥</span>
        <span class="hdr__name">build/your/agents</span>
      </NuxtLink>

      <button
        type="button"
        class="hdr__menu-btn"
        :aria-expanded="menuOpen"
        :aria-controls="NAV_ID"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMenu"
      >
        <span class="hdr__menu-icon" aria-hidden="true" />
      </button>

      <nav
        :id="NAV_ID"
        class="hdr__nav"
        :class="{ 'is-open': menuOpen }"
        aria-label="Primary"
      >
        <NuxtLink
          v-for="l in headerLinks"
          :key="l.id"
          :to="l.to"
          :class="['hdr__link', { 'is-active': active === l.id }]"
          @click="closeMenu"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>

      <NuxtLink class="bya-btn hdr__cta" to="/start" @click="closeMenu">
        <span>Start checklist</span>
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.hdr__shell {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  align-items: center;
  column-gap: 24px;
  row-gap: 0;
  padding: 14px 0;
}
.hdr__brand {
  grid-column: 1;
  grid-row: 1;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.02em;
  color: inherit;
}
.hdr__menu-btn {
  display: none;
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: var(--paper);
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
  cursor: pointer;
}
.hdr__menu-icon {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ink);
  box-shadow: 0 -6px 0 var(--ink), 0 6px 0 var(--ink);
}
.hdr__mark {
  display: inline-block;
  background: var(--hot);
  color: var(--paper);
  padding: 6px 8px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
}
.hdr__name { font-family: var(--mono); font-size: 0.92rem; }

.hdr__nav {
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  display: flex;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
  max-width: 100%;
}
.hdr__cta {
  grid-column: 3;
  grid-row: 1;
}
.hdr__link {
  font-family: var(--mono);
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  padding: 8px 10px;
  border: var(--stroke) solid transparent;
  text-decoration: none;
  color: var(--ink);
}
.hdr__link:hover {
  background: var(--acid);
  border-color: var(--ink);
}
.hdr__link.is-active {
  background: var(--ink);
  color: var(--paper);
}

.hdr__cta { padding: 10px 16px; font-size: 0.82rem; }

@media (max-width: 920px) {
  .hdr__shell {
    grid-template-columns: 1fr auto auto;
    column-gap: 12px;
  }
  .hdr__menu-btn {
    display: inline-flex;
  }
  .hdr__nav {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-self: stretch;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin-top: 14px;
    padding-top: 8px;
    border-top: var(--stroke) solid var(--ink);
  }
  .hdr__nav.is-open {
    display: flex;
  }
  .hdr__link {
    padding: 14px 12px;
    border: none;
    border-bottom: 2px solid var(--paper-2);
    font-size: 0.8rem;
  }
  .hdr__link:last-of-type {
    border-bottom: none;
  }
}

@media (min-width: 921px) {
  .hdr__nav {
    display: flex !important;
  }
}
</style>
