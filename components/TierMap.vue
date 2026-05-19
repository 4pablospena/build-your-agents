<script setup lang="ts">
// Tier map: shows the four-tier architecture as stacked horizontal bands.
// Structural hierarchy derived from the dependency graph in useAgentFiles.
withDefaults(
  defineProps<{
    eyebrow?: string
    hideLegend?: boolean
  }>(),
  {
    eyebrow: '02b / Tier Map',
    hideLegend: false
  }
)

const { files, tiers, byId } = useAgentFiles()
const {
  roleFor,
  isDimmed,
  hasSelection,
  select,
  filenameToId
} = useFileGraph()

function chipClass(fid: string) {
  const role = roleFor(fid)
  return {
    'tmap__chip--dim': isDimmed(fid),
    'tmap__chip--selected': role === 'selected',
    'tmap__chip--reads': role === 'reads',
    'tmap__chip--readby': role === 'readBy'
  }
}

function onChipClick(fid: string) {
  select(fid)
}

function depClass(filename: string) {
  const id = filenameToId(filename)
  if (!id) return {}
  const role = roleFor(id)
  return {
    'tmap__flow-dep--dim': isDimmed(id),
    'tmap__flow-dep--selected': role === 'selected',
    'tmap__flow-dep--reads': role === 'reads',
    'tmap__flow-dep--readby': role === 'readBy'
  }
}

function flowFromClass(fileId: string) {
  const role = roleFor(fileId)
  return {
    'tmap__flow-from--dim': isDimmed(fileId),
    'tmap__flow-from--selected': role === 'selected'
  }
}

const tierBg: Record<number, string> = {
  1: 'var(--ink)',
  2: 'var(--lemon)',
  3: 'var(--paper)',
  4: 'var(--paper-2)'
}
const tierFg: Record<number, string> = {
  1: 'var(--paper)',
  2: 'var(--ink)',
  3: 'var(--ink)',
  4: 'var(--ink)'
}
const tierAccent: Record<number, string> = {
  1: 'var(--hot)',
  2: 'var(--ink)',
  3: 'var(--sky)',
  4: 'var(--grape)'
}
</script>

<template>
  <section id="tiers" class="tmap">
    <div class="bya-container">
      <header class="tmap__head">
        <span class="bya-eyebrow">{{ eyebrow }}</span>
        <h2 class="bya-h2">
          Four tiers.<br />
          <span class="tmap__hl">One coherent agent.</span>
        </h2>
        <p class="bya-lede">
          The seven files sit in four dependency tiers. Lower tiers are
          read by higher ones — never the other way around.
        </p>
      </header>

      <!-- Tier bands -->
      <div class="tmap__stack">
        <div
          v-for="tier in tiers"
          :key="tier.number"
          class="tmap__band"
          :style="{
            background: tierBg[tier.number],
            color: tierFg[tier.number],
            '--band-accent': tierAccent[tier.number]
          }"
        >
          <!-- Left: tier label column -->
          <div class="tmap__label-col">
            <span class="tmap__tier-num" :style="{ color: tierAccent[tier.number] }">
              Tier {{ tier.number }}
            </span>
            <span class="tmap__arrow" aria-hidden="true">→</span>
            <strong class="tmap__tier-label">{{ tier.label }}</strong>
            <p class="tmap__tier-sub">{{ tier.sublabel }}</p>
          </div>

          <!-- Right: file chips -->
          <div class="tmap__chips">
            <a
              v-for="fid in tier.fileIds"
              :key="fid"
              :href="`#file-${fid}`"
              class="tmap__chip"
              :class="chipClass(fid)"
              :style="{
                background: `var(--${byId(fid)!.color})`,
                color: ['lemon','acid'].includes(byId(fid)!.color) ? 'var(--ink)' : 'var(--paper)'
              }"
              :aria-current="roleFor(fid) === 'selected' ? 'true' : undefined"
              @click="onChipClick(fid)"
            >
              <span class="tmap__chip-sym" aria-hidden="true">{{ byId(fid)!.symbol }}</span>
              <span class="tmap__chip-name">{{ byId(fid)!.filename }}</span>
              <span class="tmap__chip-tag">{{ byId(fid)!.tagline }}</span>
            </a>
          </div>

          <!-- Connector arrow to next tier -->
          <div
            v-if="tier.number < 4"
            class="tmap__connector"
            aria-hidden="true"
          >↓</div>
        </div>
      </div>

      <!-- Dependency legend -->
      <div v-if="!hideLegend" class="tmap__legend">
        <span class="bya-chip">Dependency flow</span>
        <div class="tmap__flow">
          <span
            v-for="f in files.filter(f => f.reads.length > 0)"
            :key="f.id"
            class="tmap__flow-item"
            :class="{ 'tmap__flow-item--dim': hasSelection && isDimmed(f.id) }"
          >
            <span
              class="tmap__flow-from"
              :class="flowFromClass(f.id)"
              :style="{
                background: `var(--${f.color})`,
                color: ['lemon','acid'].includes(f.color) ? 'var(--ink)' : 'var(--paper)'
              }"
            >{{ f.filename }}</span>
            <span class="tmap__flow-reads">reads ↳</span>
            <span
              v-for="r in f.reads"
              :key="r"
              class="tmap__flow-dep"
              :class="depClass(r)"
            >{{ r }}</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tmap {
  padding: 96px 0;
  background: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}

.tmap__head {
  margin-bottom: 56px;
  max-width: 820px;
}
.tmap__head .bya-eyebrow { margin-bottom: 14px; }
.tmap__hl {
  display: inline-block;
  background: var(--grape);
  color: var(--paper);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.8deg);
}

/* --- Stack of tier bands --- */
.tmap__stack {
  display: flex;
  flex-direction: column;
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  position: relative;
}

.tmap__band {
  position: relative;
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 1fr;
  gap: 0;
  border-bottom: var(--stroke) solid var(--ink);
}
.tmap__band:last-child { border-bottom: none; }

/* Label column */
.tmap__label-col {
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: auto auto;
  align-items: center;
  column-gap: 10px;
  padding: 28px 32px;
  border-right: var(--stroke) solid var(--ink);
}
.tmap__tier-num {
  font-family: var(--display);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.9;
  grid-row: 1;
}
.tmap__arrow {
  font-family: var(--display);
  font-size: 1rem;
  grid-row: 1;
  opacity: 0.6;
}
.tmap__tier-label {
  font-family: var(--display);
  font-size: clamp(1rem, 2vw, 1.35rem);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1;
  grid-row: 1;
}
.tmap__tier-sub {
  grid-column: 1 / -1;
  grid-row: 2;
  font-family: var(--mono);
  font-size: 0.75rem;
  line-height: 1.45;
  margin: 8px 0 0;
  opacity: 0.75;
  max-width: 38ch;
}

/* Chips column */
.tmap__chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  padding: 28px 32px;
}

.tmap__chip {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  align-items: center;
  padding: 14px 18px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 5px 5px 0 0 var(--ink);
  text-decoration: none;
  transition: transform 120ms ease, box-shadow 120ms ease;
  min-width: 180px;
}
.tmap__chip:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 0 var(--ink);
}
.tmap__chip--dim {
  opacity: 0.35;
  filter: grayscale(0.35);
}
.tmap__chip--selected {
  outline: 4px solid var(--ink);
  outline-offset: 3px;
  z-index: 2;
}
.tmap__chip--reads {
  box-shadow: 0 0 0 3px var(--hot), 5px 5px 0 0 var(--ink);
}
.tmap__chip--readby {
  box-shadow: 0 0 0 3px var(--sky), 5px 5px 0 0 var(--ink);
}

.tmap__chip-sym {
  font-size: 1.5rem;
  line-height: 1;
  grid-row: 1 / span 2;
}
.tmap__chip-name {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.95rem;
  line-height: 1;
  grid-row: 1;
}
.tmap__chip-tag {
  font-family: var(--mono);
  font-size: 0.72rem;
  line-height: 1.3;
  grid-row: 2;
  opacity: 0.8;
}

/* Connector between tiers */
.tmap__connector {
  position: absolute;
  bottom: -26px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-family: var(--display);
  font-size: 1.1rem;
  background: var(--paper);
  border: var(--stroke) solid var(--ink);
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  box-shadow: 3px 3px 0 0 var(--ink);
}

/* --- Dependency legend --- */
.tmap__legend {
  margin-top: 48px;
  display: grid;
  gap: 16px;
}
.tmap__flow {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tmap__flow-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 0.78rem;
}
.tmap__flow-from {
  font-family: var(--display);
  font-size: 0.82rem;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 2px solid var(--ink);
}
.tmap__flow-reads {
  opacity: 0.6;
  letter-spacing: 0.06em;
}
.tmap__flow-dep {
  padding: 3px 8px;
  background: var(--paper-2);
  border: 2px solid var(--ink);
}
.tmap__flow-item--dim { opacity: 0.35; }
.tmap__flow-from--selected {
  outline: 3px solid var(--ink);
  outline-offset: 2px;
}
.tmap__flow-dep--selected { background: var(--lemon); }
.tmap__flow-dep--reads { border-color: var(--hot); border-width: 3px; }
.tmap__flow-dep--readby { border-color: var(--sky); border-width: 3px; }
.tmap__flow-dep--dim,
.tmap__flow-from--dim { opacity: 0.35; }

@media (max-width: 920px) {
  .tmap__band { grid-template-columns: 1fr; }
  .tmap__label-col { border-right: none; border-bottom: var(--stroke) solid var(--ink); }
  .tmap__connector { display: none; }
}
</style>
