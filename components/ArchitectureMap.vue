<script setup lang="ts">
// Visual map of the seven files and their relationships.
// Single responsibility: render the architecture overview as an interactive file graph.
const { files } = useAgentFiles()
const graph = reactive(useFileGraph())

// Stable positions for the planet diagram
const nodes = [
  { id: 'soul',      x: 50,  y: 18, label: 'SOUL',      color: 'var(--hot)',    text: 'var(--ink)' },
  { id: 'identity',  x: 82,  y: 32, label: 'IDENTITY',  color: 'var(--sky)',    text: 'var(--paper)' },
  { id: 'agents',    x: 50,  y: 50, label: 'AGENTS',    color: 'var(--lemon)',  text: 'var(--ink)' },
  { id: 'tools',     x: 18,  y: 32, label: 'TOOLS',     color: 'var(--ink)',    text: 'var(--paper)' },
  { id: 'user',      x: 18,  y: 72, label: 'USER',      color: 'var(--pink)',   text: 'var(--ink)' },
  { id: 'memory',    x: 50,  y: 84, label: 'MEMORY',    color: 'var(--acid)',   text: 'var(--ink)' },
  { id: 'heartbeat', x: 82,  y: 72, label: 'HEARTBEAT', color: 'var(--grape)',  text: 'var(--paper)' }
]

const edges = computed(() => {
  const list: { from: string; to: string }[] = []
  for (const f of files) {
    for (const dep of f.reads) {
      const toId = graph.filenameToId(dep)
      if (toId) list.push({ from: f.id, to: toId })
    }
  }
  return list
})

const pos = (id: string) => nodes.find(n => n.id === id)!

function nodeClass(id: string) {
  const role = graph.roleFor(id)
  return {
    'arch__node--dim': graph.isDimmed(id),
    'arch__node--selected': role === 'selected',
    'arch__node--reads': role === 'reads',
    'arch__node--readby': role === 'readBy'
  }
}

function onNodeClick(id: string) {
  graph.select(id)
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
                { 'arch__wire--active': graph.isEdgeActive(e.from, e.to) },
                { 'arch__wire--dim': graph.hasSelection && !graph.isEdgeActive(e.from, e.to) }
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
          :aria-current="graph.roleFor(n.id) === 'selected' ? 'true' : undefined"
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
            'arch__legend-item--dim': graph.isDimmed(f.id),
            'arch__legend-item--selected': graph.roleFor(f.id) === 'selected',
            'arch__legend-item--reads': graph.roleFor(f.id) === 'reads',
            'arch__legend-item--readby': graph.roleFor(f.id) === 'readBy'
          }"
          role="button"
          tabindex="0"
          @click="graph.select(f.id)"
          @keydown.enter.prevent="graph.select(f.id)"
          @keydown.space.prevent="graph.select(f.id)"
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
  border-bottom: var(--stroke-fat) solid var(--line);
}

.arch__head {
  display: grid;
  gap: 36px;
  align-items: end;
  margin-bottom: 56px;
}
.arch__head .bya-eyebrow { grid-column: 1 / -1; margin-bottom: 12px; }
.arch__hl { color: var(--grape); font-family: var(--display); font-style: normal; font-weight: 400; }

.arch__board {
  position: relative;
  aspect-ratio: 16 / 9;
  box-shadow: none;
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
  box-shadow: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: clamp(0.7rem, 1.2vw, 0.95rem);
  text-decoration: none;
  transition: transform 150ms ease, box-shadow 150ms ease;
}
.arch__node:hover {
  box-shadow: none;
}
.arch__node--dim {
  opacity: 0.32;
  filter: grayscale(0.4);
}
.arch__node--selected {
  box-shadow: none;
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
  box-shadow: none;
  padding: 10px 14px;
  line-height: 1.4;
}
.arch__sticker--a { top: 6%; left: 6%; transform: none; }
.arch__sticker--b { bottom: 6%; right: 6%; transform: none; box-shadow: none; }

.arch__legend {
  list-style: none;
  padding: 0;
  margin: 56px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
.arch__legend-item {
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-template-rows: auto auto;
  column-gap: 12px;
  align-items: center;
  box-shadow: none;
  cursor: pointer;
  transition: opacity 120ms ease, transform 120ms ease;
}
.arch__legend-item:hover {
  box-shadow: none;
}
.arch__legend-item--dim { opacity: 0.38; }
.arch__legend-item--selected {
  background: var(--lemon);
  box-shadow: none;
}
.arch__legend-item--reads { border-color: var(--hot); border-width: 3px; }
.arch__legend-item--readby { border-color: var(--sky); border-width: 3px; }
.arch__dot {
  grid-row: 1 / span 2;
  width: 36px; height: 36px;
  display: grid; place-items: center;
  font-size: 1.2rem;
}
.arch__dot--hot   { background: var(--hot);   color: var(--ink); }
.arch__dot--sky   { background: var(--sky);   color: var(--paper); }
.arch__dot--lemon { background: var(--lemon); }
.arch__dot--pink  { background: var(--pink);  color: var(--ink); }
.arch__dot--acid  { background: var(--acid); }
.arch__dot--grape { background: var(--grape); color: var(--paper); }
.arch__dot--ink   { background: var(--ink);   color: var(--paper); }

.arch__legend-name {
  text-transform: uppercase;
  font-size: 0.92rem;
}
.arch__legend-role {
  color: var(--muted);
}

@media (max-width: 920px) {
  .arch__head { grid-template-columns: 1fr; align-items: start; }
  .arch__board { aspect-ratio: 4 / 5; }
  .arch__node { font-size: 0.62rem; padding: 6px 8px; }
  .arch__sticker { display: none; }
}

.arch { background: var(--paper); }
.arch__head { grid-template-columns: 1.2fr 1fr; }
.arch__board { border: 1px solid var(--ink); border-radius: 60px; background: var(--paper); }
.arch__node { border: 0; border-radius: 80px; padding: 16px 22px; font-family: var(--body); font-weight: 800; }
.arch__node:hover { transform: translate(-50%, -50%) scale(1.08); }
.arch__node--selected { outline: 3px solid var(--ink); outline-offset: 5px; }
.arch__sticker { border: none; max-width: 220px; font-family: var(--body); font-size: 14px; background: transparent; }
.arch__legend { gap: 0; }
.arch__legend-item { border: none; border-bottom: 1px solid var(--line); background: transparent; padding: 18px 12px; }
.arch__legend-item:hover { transform: none; background: var(--lemon); }
.arch__dot { border: none; border-radius: 50%; }
.arch__legend-name { font-family: var(--body); font-weight: 800; }
.arch__legend-role { font-family: var(--body); font-size: 13px; }
@media (max-width: 920px) { .arch__head { grid-template-columns: 1fr; } .arch__board { border-radius: 30px; } .arch__node { padding: 12px; font-size: 11px; } }

</style>
