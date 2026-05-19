<script setup lang="ts">
// Visual map of the seven files and their relationships.
// Single responsibility: render the architecture overview as a brutalist SVG.
const { files } = useAgentFiles()
const {
  roleFor,
  isDimmed,
  isEdgeActive,
  hasSelection,
  select,
  filenameToId
} = useFileGraph()

// Stable positions for the planet diagram
const nodes = [
  { id: 'soul',      x: 50,  y: 18, label: 'SOUL',      color: 'var(--hot)',    text: 'var(--paper)' },
  { id: 'identity',  x: 82,  y: 32, label: 'IDENTITY',  color: 'var(--sky)',    text: 'var(--paper)' },
  { id: 'agents',    x: 50,  y: 50, label: 'AGENTS',    color: 'var(--lemon)',  text: 'var(--ink)' },
  { id: 'tools',     x: 18,  y: 32, label: 'TOOLS',     color: 'var(--ink)',    text: 'var(--paper)' },
  { id: 'user',      x: 18,  y: 72, label: 'USER',      color: 'var(--pink)',   text: 'var(--paper)' },
  { id: 'memory',    x: 50,  y: 84, label: 'MEMORY',    color: 'var(--acid)',   text: 'var(--ink)' },
  { id: 'heartbeat', x: 82,  y: 72, label: 'HEARTBEAT', color: 'var(--grape)',  text: 'var(--paper)' }
]

const edges = computed(() => {
  const list: { from: string; to: string }[] = []
  for (const f of files) {
    for (const dep of f.reads) {
      const toId = filenameToId(dep)
      if (toId) list.push({ from: f.id, to: toId })
    }
  }
  return list
})

const pos = (id: string) => nodes.find(n => n.id === id)!

function nodeClass(id: string) {
  const role = roleFor(id)
  return {
    'arch__node--dim': isDimmed(id),
    'arch__node--selected': role === 'selected',
    'arch__node--reads': role === 'reads',
    'arch__node--readby': role === 'readBy'
  }
}

function onNodeClick(id: string) {
  select(id)
}
</script>

<template>
  <section id="architecture" class="arch">
    <div class="bya-container">
      <header class="arch__head">
        <span class="bya-eyebrow">02 / Architecture</span>
        <h2 class="bya-h2">
          One agent.<br />
          <span class="arch__hl">Seven plain-text organs.</span>
        </h2>
        <p class="bya-lede">
          Every file owns a single responsibility. Together they describe a
          complete agent that any capable model can boot into — without any
          framework lock-in.
        </p>
      </header>

      <div class="arch__board">
        <!-- SVG connections -->
        <svg class="arch__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="var(--ink)" stroke-width="0.45" fill="none">
            <line
              v-for="(e, i) in edges"
              :key="`${e.from}-${e.to}-${i}`"
              :x1="pos(e.from).x"
              :y1="pos(e.from).y"
              :x2="pos(e.to).x"
              :y2="pos(e.to).y"
              :class="[
                'arch__wire',
                { 'arch__wire--active': isEdgeActive(e.from, e.to) },
                { 'arch__wire--dim': hasSelection && !isEdgeActive(e.from, e.to) }
              ]"
              stroke-dasharray="1.5 1"
            />
          </g>
        </svg>

        <!-- Nodes -->
        <a
          v-for="n in nodes"
          :key="n.id"
          :href="`#file-${n.id}`"
          class="arch__node"
          :class="nodeClass(n.id)"
          :style="{
            left: n.x + '%',
            top: n.y + '%',
            background: n.color,
            color: n.text
          }"
          :aria-current="roleFor(n.id) === 'selected' ? 'true' : undefined"
          @click="onNodeClick(n.id)"
        >
          <span class="arch__node-label">{{ n.label }}</span>
        </a>

        <!-- Caption stickers -->
        <div class="arch__sticker arch__sticker--a">
          AGENTS.md is the
          <strong>conductor</strong> — it reads everything else.
        </div>
        <div class="arch__sticker arch__sticker--b">
          HEARTBEAT.md is the
          <strong>autopilot</strong> — it fires on a schedule.
        </div>
      </div>

      <ul class="arch__legend">
        <li
          v-for="f in files"
          :key="f.id"
          class="arch__legend-item"
          :class="{
            'arch__legend-item--dim': isDimmed(f.id),
            'arch__legend-item--selected': roleFor(f.id) === 'selected',
            'arch__legend-item--reads': roleFor(f.id) === 'reads',
            'arch__legend-item--readby': roleFor(f.id) === 'readBy'
          }"
          role="button"
          tabindex="0"
          @click="select(f.id)"
          @keydown.enter.prevent="select(f.id)"
          @keydown.space.prevent="select(f.id)"
        >
          <span :class="['arch__dot', `arch__dot--${f.color}`]" aria-hidden="true">{{ f.symbol }}</span>
          <span class="arch__legend-name">{{ f.filename }}</span>
          <span class="arch__legend-role">{{ f.tagline }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.arch {
  padding: 96px 0;
  background:
    linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%);
  border-bottom: var(--stroke-fat) solid var(--ink);
}

.arch__head {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 36px;
  align-items: end;
  margin-bottom: 56px;
}
.arch__head .bya-eyebrow { grid-column: 1 / -1; margin-bottom: 12px; }
.arch__hl {
  background: var(--lemon);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 5px 5px 0 0 var(--ink);
  display: inline-block;
  transform: rotate(-0.8deg);
}

.arch__board {
  position: relative;
  aspect-ratio: 16 / 9;
  border: var(--stroke-fat) solid var(--ink);
  background:
    repeating-linear-gradient(90deg, transparent 0 39px, rgba(10,10,10,0.06) 39px 40px),
    repeating-linear-gradient(0deg, transparent 0 39px, rgba(10,10,10,0.06) 39px 40px),
    var(--paper);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.arch__wires {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.arch__node {
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 10px 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 5px 5px 0 0 var(--ink);
  font-family: var(--display);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(0.7rem, 1.2vw, 0.95rem);
  text-decoration: none;
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.arch__node:hover {
  transform: translate(calc(-50% - 3px), calc(-50% - 3px));
  box-shadow: 8px 8px 0 0 var(--ink);
}
.arch__node--dim {
  opacity: 0.32;
  filter: grayscale(0.4);
}
.arch__node--selected {
  outline: 4px solid var(--paper);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px var(--ink), 8px 8px 0 0 var(--ink);
  z-index: 3;
}
.arch__node--reads {
  outline: 3px dashed var(--hot);
  outline-offset: 2px;
}
.arch__node--readby {
  outline: 3px dashed var(--sky);
  outline-offset: 2px;
}

.arch__wire--active {
  stroke: var(--hot);
  stroke-width: 0.85;
  stroke-dasharray: none;
}
.arch__wire--dim {
  opacity: 0.2;
}

.arch__sticker {
  position: absolute;
  background: var(--paper);
  border: var(--stroke) solid var(--ink);
  box-shadow: 4px 4px 0 0 var(--hot);
  padding: 10px 14px;
  font-family: var(--mono);
  font-size: 0.78rem;
  max-width: 220px;
  line-height: 1.4;
}
.arch__sticker--a { top: 6%; left: 6%; transform: rotate(-3deg); }
.arch__sticker--b { bottom: 6%; right: 6%; transform: rotate(2.5deg); box-shadow: 4px 4px 0 0 var(--sky); }

.arch__legend {
  list-style: none;
  padding: 0;
  margin: 56px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}
.arch__legend-item {
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  align-items: center;
  border: var(--stroke) solid var(--ink);
  padding: 12px 14px;
  background: var(--paper);
  box-shadow: 4px 4px 0 0 var(--ink);
  cursor: pointer;
  transition: opacity 120ms ease, transform 120ms ease;
}
.arch__legend-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 0 var(--ink);
}
.arch__legend-item--dim { opacity: 0.38; }
.arch__legend-item--selected {
  background: var(--lemon);
  box-shadow: 6px 6px 0 0 var(--hot);
}
.arch__legend-item--reads { border-color: var(--hot); border-width: 3px; }
.arch__legend-item--readby { border-color: var(--sky); border-width: 3px; }
.arch__dot {
  grid-row: 1 / span 2;
  width: 36px; height: 36px;
  display: grid; place-items: center;
  border: var(--stroke) solid var(--ink);
  font-size: 1.2rem;
}
.arch__dot--hot   { background: var(--hot);   color: var(--paper); }
.arch__dot--sky   { background: var(--sky);   color: var(--paper); }
.arch__dot--lemon { background: var(--lemon); }
.arch__dot--pink  { background: var(--pink);  color: var(--paper); }
.arch__dot--acid  { background: var(--acid); }
.arch__dot--grape { background: var(--grape); color: var(--paper); }
.arch__dot--ink   { background: var(--ink);   color: var(--paper); }

.arch__legend-name {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.92rem;
}
.arch__legend-role {
  font-family: var(--mono);
  font-size: 0.78rem;
  color: #444;
}

@media (max-width: 920px) {
  .arch__head { grid-template-columns: 1fr; align-items: start; }
  .arch__board { aspect-ratio: 4 / 5; }
  .arch__node { font-size: 0.62rem; padding: 6px 8px; }
  .arch__sticker { display: none; }
}
</style>
