<script setup lang="ts">
import type { AgentFileId } from '~/composables/useAgentFiles.types'
import { ecosystemLanes } from '~/composables/useEcosystem'

const { byId } = useAgentFiles()

function fileChipStyle(color: string) {
  const onPaper = ['lemon', 'acid'].includes(color)
  return {
    background: `var(--${color})`,
    color: onPaper ? 'var(--ink)' : 'var(--paper)'
  }
}

function laneFileNote(laneId: string, fileId: AgentFileId): string {
  const lane = ecosystemLanes.find((l) => l.id === laneId)
  return lane?.fileNotes[fileId] ?? ''
}

useHead({
  title: 'OpenClaw, Cursor & MCPs — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Map the seven-file agent spec to an OpenClaw workspace, Cursor rules, and MCP tool surfaces — no vendor lock-in, plain markdown.'
    }
  ]
})
</script>

<template>
  <main class="oc">
    <AppHeader active="openclaw-page" />

    <section class="oc__hero">
      <div class="oc__deco oc__deco--a" aria-hidden="true">OPENCLAW</div>
      <div class="oc__deco oc__deco--b" aria-hidden="true">CURSOR</div>
      <div class="oc__deco oc__deco--c" aria-hidden="true">★</div>

      <div class="bya-container oc__hero-inner">
        <span class="bya-eyebrow bya-rise bya-rise-1">Ecosystem bridge</span>

        <h1 class="bya-h1 oc__title bya-rise bya-rise-2">
          Same seven files.<br />
          <span class="oc__title-accent">Your</span><br />
          <span class="oc__title-stamp">tooling.</span>
        </h1>

        <p class="bya-lede oc__lede bya-rise bya-rise-3">
          If you landed from <strong>OpenClaw</strong>, <strong>Cursor</strong>,
          or an <strong>MCP</strong> setup: this spec is plain markdown you
          already know how to host. No lock-in — copy the folder, point your
          runtime at it, and keep versioning in git.
        </p>

        <ul class="oc__quick bya-rise bya-rise-4" aria-label="60-second summary">
          <li>
            <span class="oc__quick-k">OpenClaw</span>
            <span>→ workspace folder the gateway reads each session</span>
          </li>
          <li>
            <span class="oc__quick-k">Cursor</span>
            <span>→ rules / project docs built from the same files</span>
          </li>
          <li>
            <span class="oc__quick-k">MCP</span>
            <span>→ TOOLS.md + AGENTS.md define what may be invoked</span>
          </li>
        </ul>

        <div class="oc__cta-row bya-rise bya-rise-4">
          <a class="bya-btn" href="#oc-map">
            See the mapping
            <span aria-hidden="true">↓</span>
          </a>
          <NuxtLink class="bya-btn bya-btn--ghost" to="/docs">
            Download templates
          </NuxtLink>
        </div>
      </div>
    </section>

    <MarqueeBar
      :items="[
        'Plain markdown',
        'No vendor lock-in',
        'OpenClaw workspace',
        'Cursor rules',
        'MCP map in TOOLS.md',
        'Version your soul'
      ]"
    />

    <section id="oc-map" class="oc__map">
      <div class="bya-container">
        <header class="oc__map-head">
          <span class="bya-eyebrow">The mapping</span>
          <h2 class="bya-h2">
            Seven files ≈ <span class="oc__hl">three hosts.</span>
          </h2>
          <p class="oc__map-lede">
            Pick the column that matches where you are. Every chip jumps to the
            file card below — same spec, different packaging.
          </p>
        </header>

        <div class="oc__lanes">
          <article
            v-for="lane in ecosystemLanes"
            :key="lane.id"
            :class="['oc__lane', `oc__lane--${lane.id}`]"
          >
            <header class="oc__lane-head">
              <h3 class="bya-h3 oc__lane-title">{{ lane.title }}</h3>
              <p class="oc__lane-tag">{{ lane.tagline }}</p>
            </header>
            <p class="oc__lane-summary">{{ lane.summary }}</p>
            <ul class="oc__lane-files" role="list">
              <li
                v-for="fid in lane.fileIds"
                :key="fid"
                class="oc__lane-file"
                role="listitem"
              >
                <a
                  :href="`#file-${fid}`"
                  class="oc__chip"
                  :style="fileChipStyle(byId(fid)!.color)"
                >
                  <span class="oc__chip-sym" aria-hidden="true">{{
                    byId(fid)!.symbol
                  }}</span>
                  <span class="oc__chip-name">{{ byId(fid)!.filename }}</span>
                </a>
                <p v-if="laneFileNote(lane.id, fid)" class="oc__chip-note">
                  {{ laneFileNote(lane.id, fid) }}
                </p>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <TierMap
      eyebrow="Tier map / same on OpenClaw or Cursor"
      :hide-legend="true"
    />

    <FilesGrid
      eyebrow="The seven files / open them here"
      lede="These are the same cards as on the home page — fill the brackets, drop the folder into your workspace or rules, and ship."
      :show-docs-link="true"
    />

    <section class="oc__band">
      <div class="bya-container oc__band-inner">
        <NuxtLink class="bya-btn" to="/start">
          Start the reading map
          <span aria-hidden="true">→</span>
        </NuxtLink>
        <NuxtLink class="bya-btn bya-btn--ghost" to="/">
          Full overview
          <span aria-hidden="true">↖</span>
        </NuxtLink>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.oc {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  position: relative;
  z-index: 2;
}

.oc__hero {
  position: relative;
  padding: 96px 0 56px;
  overflow: hidden;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(720px 360px at 85% 4%, rgba(37, 99, 255, 0.2), transparent 58%),
    radial-gradient(600px 320px at 5% 75%, rgba(255, 61, 0, 0.14), transparent 58%),
    var(--paper);
}
.oc__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(2.2rem, 7vw, 6.5rem);
  pointer-events: none;
  opacity: 0.42;
  z-index: 0;
}
.oc__deco--a { top: 4%; left: -3%; transform: rotate(-6deg); }
.oc__deco--b { bottom: 8%; right: -2%; -webkit-text-stroke-color: var(--sky); transform: rotate(5deg); }
.oc__deco--c {
  top: 10%; right: 6%;
  font-size: 4.5rem;
  color: var(--acid);
  -webkit-text-stroke: 3px var(--ink);
  opacity: 0.95;
}

.oc__hero-inner {
  position: relative;
  z-index: 2;
  max-width: 720px;
}
.oc__title { margin: 22px 0 24px; }
.oc__title-accent {
  display: inline-block;
  background: var(--sky);
  color: var(--paper);
  padding: 0 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 8px 8px 0 0 var(--ink);
  transform: rotate(-1.2deg);
}
.oc__title-stamp {
  display: inline-block;
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}
.oc__lede { margin: 0 0 22px; max-width: 56ch; }
.oc__lede strong { font-family: var(--display); font-weight: 400; }

.oc__quick {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 52ch;
}
.oc__quick li {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 12px;
  align-items: baseline;
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.45;
  padding: 10px 12px;
  border: 2px solid var(--ink);
  background: var(--paper-2);
  box-shadow: 4px 4px 0 0 var(--ink);
}
.oc__quick-k {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

.oc__cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.oc__map {
  padding: 72px 0;
  background: var(--paper-2);
  border-bottom: var(--stroke-fat) solid var(--ink);
  scroll-margin-top: 5.5rem;
}
.oc__map-head {
  margin-bottom: 36px;
  max-width: 640px;
}
.oc__map-head .bya-eyebrow { margin-bottom: 12px; }
.oc__hl {
  display: inline-block;
  background: var(--lemon);
  padding: 0 10px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 5px 5px 0 0 var(--ink);
}
.oc__map-lede {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 16px 0 0;
}

.oc__lanes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;
}
.oc__lane {
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow);
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.oc__lane--openclaw { border-top: 6px solid var(--hot); }
.oc__lane--cursor { border-top: 6px solid var(--sky); }
.oc__lane--mcp { border-top: 6px solid var(--grape); }

.oc__lane-title { margin: 0; font-size: 1.05rem; }
.oc__lane-tag {
  margin: 4px 0 0;
  font-family: var(--mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.75;
}
.oc__lane-summary {
  margin: 0;
  font-family: var(--serif);
  font-size: 0.98rem;
  line-height: 1.45;
}

.oc__lane-files {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.oc__lane-file {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.oc__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
  text-decoration: none;
  font-family: var(--display);
  font-size: 0.82rem;
  text-transform: uppercase;
  width: fit-content;
  transition: transform 100ms ease, box-shadow 100ms ease;
}
.oc__chip:hover {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 0 var(--ink);
}
.oc__chip-sym { font-size: 1rem; }
.oc__chip-note {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.72rem;
  line-height: 1.45;
  opacity: 0.88;
  padding-left: 4px;
}

.oc__band {
  padding: 48px 0 88px;
  background: var(--ink);
}
.oc__band-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.oc__band .bya-btn--ghost {
  background: transparent;
  color: var(--paper);
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}

@media (max-width: 960px) {
  .oc__lanes {
    grid-template-columns: 1fr;
  }
  .oc__quick li {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
