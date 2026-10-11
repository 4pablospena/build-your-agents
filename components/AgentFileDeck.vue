<script setup lang="ts">
// Interactive file index. File content stays in the shared specification source.
const { files } = useAgentFiles()
const selected = ref(0)
const activeFile = computed(() => files[selected.value]!)

function selectWithKeyboard(event: KeyboardEvent, index: number) {
  let nextIndex: number
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % files.length
  else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + files.length) % files.length
  else if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = files.length - 1
  else return
  event.preventDefault()
  selected.value = nextIndex
  const tab = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]
  tab?.focus({ preventScroll: true })
  tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}
</script>

<template>
  <div class="deck">
    <div class="deck__caption"><span>07 files. One very personal agent.</span><span>Pick a file. See what makes it tick.</span></div>
    <div class="deck__tabs" role="tablist" aria-label="Explore the seven agent files">
      <button
        v-for="(file, index) in files"
        :id="`deck-tab-${file.id}`"
        :key="file.id"
        type="button"
        role="tab"
        class="deck__file"
        :class="[`deck__file--${file.color}`, { 'is-selected': selected === index }]"
        :aria-selected="selected === index"
        :aria-controls="`deck-panel-${file.id}`"
        :tabindex="selected === index ? 0 : -1"
        @click="selected = index"
        @keydown="selectWithKeyboard($event, index)"
      >
        <span class="deck__number">0{{ index + 1 }}<span>.md</span></span>
        <span class="deck__name">{{ file.filename.replace('.md', '') }}</span>
        <span class="deck__hint">{{ selected === index ? 'Selected' : 'Explore file' }}</span>
      </button>
    </div>
    <div class="deck__panels">
      <section
        v-for="(file, index) in files"
        v-show="selected === index"
        :id="`deck-panel-${file.id}`"
        :key="file.id"
        role="tabpanel"
        :aria-labelledby="`deck-tab-${file.id}`"
        tabindex="0"
        class="deck__panel"
      >
        <Transition name="file-switch" mode="out-in">
          <div v-if="selected === index" :key="activeFile.id" class="deck__detail">
            <h2>{{ file.tagline }}</h2>
            <p>{{ file.role }}</p>
            <NuxtLink :to="`/docs#docs-card-${file.id}`">Read {{ file.filename }}</NuxtLink>
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>

<style scoped>
.deck { margin-bottom: 38px; }
.deck__caption { display: flex; justify-content: space-between; gap: 24px; padding-bottom: 16px; font-size: 12px; font-weight: 700; }
.deck__tabs { display: flex; align-items: stretch; gap: 8px; padding-top: 16px; }
.deck__file { min-width: 0; flex: 1; display: flex; flex-direction: column; justify-content: space-between; align-items: stretch; text-align: left; padding: 20px 15px 16px; height: 184px; border: 0; border-radius: 24px 24px 0 0; cursor: pointer; color: var(--ink); transform-origin: bottom center; transition: transform 150ms ease, border-radius 150ms ease; }
.deck__file--hot { background: var(--hot); }
.deck__file--sky { background: var(--sky); color: var(--paper); }
.deck__file--lemon { background: var(--lemon); }
.deck__file--pink { background: var(--pink); }
.deck__file--acid { background: var(--acid); }
.deck__file--grape { background: var(--grape); color: var(--paper); }
.deck__file--ink { background: var(--ink); color: var(--paper); }
.deck__file:hover { transform: translateY(-8px) rotate(-2deg); border-radius: 40px 40px 0 0; }
.deck__file.is-selected { transform: translateY(-12px); border-radius: 48px 48px 0 0; }
.deck__file:active { transform: translateY(-4px); }
.deck__file:focus-visible { outline: 3px solid var(--ink); outline-offset: 4px; }
.deck__number { font-family: var(--display); font-size: 46px; line-height: 1; display: flex; align-items: baseline; justify-content: space-between; }
.deck__number > span { font-family: var(--body); font-size: 12px; font-weight: 700; }
.deck__name { font-family: var(--display); font-size: clamp(18px, 2.4vw, 33px); line-height: 1; letter-spacing: -.02em; }
.deck__hint { font-family: var(--body); font-size: 10px; margin-top: 8px; }
.deck__panels { min-height: 102px; border-top: 2px solid var(--ink); }
.deck__detail { display: grid; grid-template-columns: 1fr 1.2fr auto; gap: 32px; align-items: center; padding: 24px 0; }
.deck__detail h2 { margin: 0; font-family: var(--body); font-size: 19px; font-weight: 800; letter-spacing: -.04em; }
.deck__detail p { margin: 0; font-size: 14px; max-width: 410px; }
.deck__detail a { font-size: 13px; font-weight: 700; text-underline-offset: 5px; }
.file-switch-enter-active { transition: opacity 150ms ease, transform 150ms ease; }
.file-switch-enter-from { opacity: 0; transform: translateY(8px); }
@media (max-width: 920px) {
  .deck__file { padding: 16px 10px 12px; height: 155px; border-radius: 18px 18px 0 0; }
  .deck__number { font-size: 34px; }
  .deck__number > span { display: none; }
  .deck__name { font-size: 17px; }
  .deck__detail { grid-template-columns: 1fr 1fr; gap: 12px; }
  .deck__detail a { grid-column: 1 / -1; }
}
@media (max-width: 600px) {
  .deck__caption { font-size: 11px; }
  .deck__caption > span:last-child { max-width: 130px; text-align: right; }
  .deck__tabs { overflow-x: auto; padding: 18px 4px 0; scrollbar-width: thin; scrollbar-color: var(--ink) var(--paper); }
  .deck__file { flex: 0 0 112px; height: 150px; }
  .deck__name { font-size: 23px; }
  .deck__detail { grid-template-columns: 1fr; gap: 10px; min-height: 140px; }
  .deck__panels { min-height: 140px; }
}
</style>
