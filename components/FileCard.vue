<script setup lang="ts">
import type { AgentFile } from '~/composables/useAgentFiles.types'

const props = defineProps<{
  file: AgentFile
  index: number
}>()

const graph = useFileGraph()
const number = computed(() => String(props.index + 1).padStart(2, '0'))
const showSource = ref(false)
const sourcePanelId = computed(() => `fc-source-${props.file.id}`)

const graphRole = computed(() => graph.roleFor(props.file.id))

function onCardActivate() {
  graph.select(props.file.id)
}

function onCardClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target.closest('a, button, textarea, input, label')) return
  onCardActivate()
}
</script>

<template>
  <article
    :id="`file-${file.id}`"
    :class="[
      'fc',
      `fc--${file.color}`,
      {
        'fc--graph-dim': graph.isDimmed(file.id),
        'fc--graph-selected': graphRole === 'selected',
        'fc--graph-reads': graphRole === 'reads',
        'fc--graph-readby': graphRole === 'readBy'
      }
    ]"
    role="button"
    tabindex="0"
    :aria-pressed="graphRole === 'selected'"
    @click="onCardClick"
    @keydown.enter.prevent="onCardActivate"
    @keydown.space.prevent="onCardActivate"
  >
    <header class="fc__head">
      <span class="fc__num">{{ number }}</span>
      <span class="fc__symbol" aria-hidden="true">{{ file.symbol }}</span>
      <h3 class="bya-h3 fc__filename">{{ file.filename }}</h3>
    </header>

    <p class="fc__tag">{{ file.tagline }}</p>
    <p class="fc__role">{{ file.role }}</p>

    <div class="fc__sections" role="list">
      <span
        v-for="s in file.sections"
        :key="s"
        class="fc__section"
        role="listitem"
      >
        {{ s }}
      </span>
    </div>

    <blockquote class="fc__quote">
      <span aria-hidden="true">"</span>{{ file.excerpt }}<span aria-hidden="true">"</span>
    </blockquote>

    <!-- Markdown source viewer -->
    <div
      :id="sourcePanelId"
      class="fc__source"
      :class="{ 'fc__source--open': showSource }"
    >
      <button
        type="button"
        class="fc__source-toggle"
        :aria-expanded="showSource"
        :aria-controls="sourcePanelId"
        :aria-label="
          showSource
            ? `Hide ${file.filename} markdown source`
            : `View ${file.filename} markdown source`
        "
        @click="showSource = !showSource"
      >
        <span class="fc__source-icon" aria-hidden="true">{ }</span>
        <span>{{ showSource ? 'hide source' : 'view source' }}</span>
        <span class="fc__source-chevron" aria-hidden="true">{{ showSource ? '▲' : '▼' }}</span>
      </button>

      <Transition name="fc-expand">
        <div v-if="showSource" class="fc__source-body">
          <div class="fc__source-bar">
            <span>{{ file.filename }}</span>
            <span class="fc__source-lang">markdown</span>
          </div>
          <pre class="fc__source-code">{{ file.markdownContent }}</pre>
        </div>
      </Transition>
    </div>

    <footer v-if="file.reads.length" class="fc__reads">
      <span class="fc__reads-label">reads ↳</span>
      <span v-for="r in file.reads" :key="r" class="fc__read-chip">{{ r }}</span>
    </footer>
    <footer v-else class="fc__reads fc__reads--leaf">
      <span class="fc__reads-label">standalone ◆</span>
    </footer>
  </article>
</template>

<style scoped>
.fc {
  position: relative;
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  padding: 26px 26px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--paper);
  cursor: pointer;
  transition: opacity 120ms ease, outline 120ms ease, transform 120ms ease;
}
.fc--hot   { background: var(--hot);   color: var(--paper); }
.fc--sky   { background: var(--sky);   color: var(--paper); }
.fc--lemon { background: var(--lemon); color: var(--ink); }
.fc--pink  { background: var(--pink);  color: var(--paper); }
.fc--acid  { background: var(--acid);  color: var(--ink); }
.fc--grape { background: var(--grape); color: var(--paper); }
.fc--ink   { background: var(--ink);   color: var(--paper); }
.fc--graph-dim {
  opacity: 0.42;
  filter: grayscale(0.25);
}
.fc--graph-selected {
  outline: 5px solid var(--ink);
  outline-offset: 4px;
  transform: translate(-2px, -2px);
}
.fc--graph-reads {
  outline: 4px dashed var(--hot);
  outline-offset: 3px;
}
.fc--graph-readby {
  outline: 4px dashed var(--sky);
  outline-offset: 3px;
}

.fc__head {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 12px;
}
.fc__num {
  font-family: var(--display);
  font-size: 1.6rem;
  padding: 4px 10px;
  background: var(--paper);
  color: var(--ink);
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
}
.fc--lemon .fc__num, .fc--acid .fc__num {
  background: var(--ink); color: var(--paper);
}
.fc__symbol {
  font-size: 1.8rem;
  line-height: 1;
}
.fc__filename {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  word-break: break-all;
}

.fc__tag {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  margin: 0;
  line-height: 1.3;
}
.fc__role {
  font-family: var(--mono);
  font-size: 0.86rem;
  margin: 0;
  line-height: 1.55;
}

.fc__sections {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.fc__section {
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 4px 8px;
  background: var(--paper);
  color: var(--ink);
  border: 2px solid var(--ink);
}
.fc--lemon .fc__section, .fc--acid .fc__section {
  background: var(--ink); color: var(--paper);
}

.fc__quote {
  margin: 6px 0 0;
  padding: 12px 14px;
  border-left: var(--stroke-fat) solid var(--ink);
  background: rgba(10, 10, 10, 0.12);
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.5;
}
.fc--lemon .fc__quote, .fc--acid .fc__quote {
  background: rgba(10, 10, 10, 0.08);
}
.fc--ink .fc__quote {
  background: rgba(246, 241, 228, 0.1);
  border-left-color: var(--lemon);
}

/* ---- Source viewer ---- */
.fc__source {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 2px solid var(--ink);
}
.fc--lemon .fc__source,
.fc--acid .fc__source {
  border-color: var(--ink);
}

.fc__source-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  background: rgba(10, 10, 10, 0.15);
  color: inherit;
  border: none;
  cursor: pointer;
  font-family: var(--mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: left;
  transition: background 100ms ease;
}
.fc__source-toggle:hover {
  background: rgba(10, 10, 10, 0.25);
}
.fc--lemon .fc__source-toggle,
.fc--acid .fc__source-toggle {
  background: rgba(10, 10, 10, 0.1);
}
.fc--lemon .fc__source-toggle:hover,
.fc--acid .fc__source-toggle:hover {
  background: rgba(10, 10, 10, 0.2);
}
.fc--ink .fc__source-toggle {
  background: rgba(246, 241, 228, 0.08);
}
.fc--ink .fc__source-toggle:hover {
  background: rgba(246, 241, 228, 0.14);
}

.fc__source-icon {
  font-family: var(--display);
  font-size: 0.95rem;
  letter-spacing: -0.05em;
}
.fc__source-chevron {
  margin-left: auto;
  font-size: 0.65rem;
}

.fc__source-body {
  border-top: 2px solid var(--ink);
  overflow: hidden;
}
.fc__source-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 14px;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.fc__source-lang {
  opacity: 0.55;
}
.fc__source-code {
  margin: 0;
  padding: 16px 14px;
  background: var(--ink);
  color: var(--acid);
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  overflow-x: hidden;
  max-height: 320px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--paper) var(--ink);
}
.fc__source-code::-webkit-scrollbar { width: 6px; height: 6px; }
.fc__source-code::-webkit-scrollbar-track { background: var(--ink); }
.fc__source-code::-webkit-scrollbar-thumb { background: rgba(246,241,228,0.25); }

/* Expand/collapse animation */
.fc-expand-enter-active,
.fc-expand-leave-active {
  transition: max-height 250ms ease, opacity 200ms ease;
  overflow: hidden;
}
.fc-expand-enter-from,
.fc-expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.fc-expand-enter-to,
.fc-expand-leave-from {
  max-height: 600px;
  opacity: 1;
}

/* ---- Reads footer ---- */
.fc__reads {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding-top: 14px;
  border-top: 2px dashed currentColor;
  font-family: var(--mono);
  font-size: 0.74rem;
}
.fc__reads-label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.85;
}
.fc__read-chip {
  padding: 2px 6px;
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--ink);
}
.fc--ink .fc__read-chip { background: var(--lemon); color: var(--ink); }
</style>
