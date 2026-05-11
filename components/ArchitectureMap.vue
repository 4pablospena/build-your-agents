<script setup lang="ts">
// Visual map of the seven files and their relationships.
// Single responsibility: render the architecture overview as a brutalist SVG.
const { files } = useAgentFiles()

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

// Edges: agents reads from many; heartbeat reads memory+user.
const edges = [
  { from: 'agents', to: 'soul' },
  { from: 'agents', to: 'tools' },
  { from: 'agents', to: 'user' },
  { from: 'agents', to: 'memory' },
  { from: 'agents', to: 'identity' },
  { from: 'heartbeat', to: 'memory' },
  { from: 'heartbeat', to: 'user' }
]

const pos = (id: string) => nodes.find(n => n.id === id)!
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
              :key="i"
              :x1="pos(e.from).x"
              :y1="pos(e.from).y"
              :x2="pos(e.to).x"
              :y2="pos(e.to).y"
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
          :style="{
            left: n.x + '%',
            top: n.y + '%',
            background: n.color,
            color: n.text
          }"
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
        <li v-for="f in files" :key="f.id" class="arch__legend-item">
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
}
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
