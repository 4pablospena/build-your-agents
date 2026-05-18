<script setup lang="ts">
import type { SearchResult } from '~/composables/useGlobalSearch'

const props = withDefaults(
  defineProps<{
    autofocus?: boolean
    placeholder?: string
  }>(),
  {
    autofocus: false,
    placeholder: 'Search blog posts, changelog, tools…'
  }
)

const { search, pending } = useGlobalSearch()

const query = ref('')
const open = ref(false)
const activeIndex = ref(-1)
const inputId = 'global-search-input'
const listboxId = 'global-search-listbox'

const results = computed(() => search(query.value))

const activeDescendant = computed(() =>
  activeIndex.value >= 0 && results.value[activeIndex.value]
    ? `gs-option-${activeIndex.value}`
    : undefined
)

watch(query, () => {
  open.value = query.value.trim().length >= 2
  activeIndex.value = results.value.length ? 0 : -1
})

function kindLabel(kind: SearchResult['kind']) {
  if (kind === 'blog') return 'Blog'
  if (kind === 'changelog') return 'Changelog'
  return 'Tool'
}

function onInput() {
  open.value = query.value.trim().length >= 2
}

function close() {
  open.value = false
  activeIndex.value = -1
}

function goTo(item: SearchResult) {
  navigateTo(item.to)
  close()
  query.value = ''
}

function onBlur() {
  setTimeout(() => close(), 150)
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value && event.key === 'ArrowDown' && results.value.length) {
    open.value = true
    activeIndex.value = 0
    event.preventDefault()
    return
  }
  if (!open.value) return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = Math.min(
      activeIndex.value + 1,
      results.value.length - 1
    )
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (event.key === 'Enter' && activeIndex.value >= 0) {
    event.preventDefault()
    const item = results.value[activeIndex.value]
    if (item) goTo(item)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
}
</script>

<template>
  <div class="gs" :class="{ 'gs--open': open }">
    <label class="gs__label" :for="inputId">Search</label>
    <div class="gs__field">
      <input
        :id="inputId"
        v-model="query"
        class="gs__input"
        type="search"
        role="combobox"
        :aria-expanded="open"
        :aria-controls="listboxId"
        :aria-activedescendant="activeDescendant"
        aria-autocomplete="list"
        :placeholder="placeholder"
        :autofocus="autofocus"
        autocomplete="off"
        @input="onInput"
        @focus="onInput"
        @keydown="onKeydown"
        @blur="onBlur"
      />
      <span v-if="pending" class="gs__status" aria-live="polite">Loading index…</span>
    </div>

    <ul
      v-if="open"
      :id="listboxId"
      class="gs__list"
      role="listbox"
      :aria-label="`${results.length} results`"
    >
      <li v-if="!results.length" class="gs__empty" role="presentation">
        No matches for “{{ query.trim() }}”.
      </li>
      <li
        v-for="(item, i) in results"
        :id="`gs-option-${i}`"
        :key="item.id"
        role="option"
        :aria-selected="i === activeIndex"
        :class="['gs__option', { 'is-active': i === activeIndex }]"
        @mousedown.prevent="goTo(item)"
      >
        <span class="gs__kind">{{ kindLabel(item.kind) }}</span>
        <span class="gs__title">{{ item.title }}</span>
        <span class="gs__excerpt">{{ item.excerpt }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.gs {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.gs__label {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.gs__field {
  position: relative;
}
.gs__input {
  width: 100%;
  font-family: var(--mono);
  font-size: 0.95rem;
  padding: 14px 16px;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--paper);
  box-shadow: var(--shadow);
}
.gs__input:focus {
  outline: 3px solid var(--sky);
  outline-offset: 2px;
}
.gs__status {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--mono);
  font-size: 0.68rem;
  opacity: 0.7;
}
.gs__list {
  position: absolute;
  z-index: 20;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 360px;
  overflow-y: auto;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--paper);
  box-shadow: var(--shadow-lg);
}
.gs__empty {
  padding: 14px 16px;
  font-family: var(--mono);
  font-size: 0.82rem;
}
.gs__option {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 4px 12px;
  padding: 12px 14px;
  border-bottom: 2px solid var(--ink);
  cursor: pointer;
}
.gs__option:last-child {
  border-bottom: none;
}
.gs__option:hover,
.gs__option.is-active {
  background: var(--lemon);
}
.gs__kind {
  grid-row: 1 / span 2;
  font-family: var(--display);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 8px;
  border: 2px solid var(--ink);
  background: var(--paper-2);
  align-self: start;
}
.gs__title {
  font-family: var(--display);
  font-size: 0.88rem;
  text-transform: uppercase;
}
.gs__excerpt {
  grid-column: 2;
  font-family: var(--serif);
  font-size: 0.9rem;
  line-height: 1.35;
  opacity: 0.9;
}
</style>
