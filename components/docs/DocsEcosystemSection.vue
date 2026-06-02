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
</script>

<template>
  <section id="ecosystem" class="deco">
    <div class="bya-container">
      <header class="deco__head">
        <span class="bya-eyebrow">Ecosystem</span>
        <h2 class="bya-h2">
          OpenClaw, Cursor &amp; <span class="deco__hl">MCPs.</span>
        </h2>
        <p class="deco__lede">
          Same seven markdown files — different hosts. Copy the folder, point
          your runtime at it, version in git.
        </p>
      </header>

      <ul class="deco__quick" aria-label="Summary">
        <li>
          <span class="deco__quick-k">OpenClaw</span>
          <span>→ workspace folder the gateway reads each session</span>
        </li>
        <li>
          <span class="deco__quick-k">Cursor</span>
          <span>→ rules / project docs from the same files</span>
        </li>
        <li>
          <span class="deco__quick-k">MCP</span>
          <span>→ TOOLS.md + AGENTS.md define what may be invoked</span>
        </li>
      </ul>

      <div class="deco__lanes">
        <article
          v-for="lane in ecosystemLanes"
          :key="lane.id"
          :class="['deco__lane', `deco__lane--${lane.id}`]"
        >
          <header class="deco__lane-head">
            <h3 class="bya-h3 deco__lane-title">{{ lane.title }}</h3>
            <p class="deco__lane-tag">{{ lane.tagline }}</p>
          </header>
          <p class="deco__lane-summary">{{ lane.summary }}</p>
          <ul class="deco__lane-files" role="list">
            <li
              v-for="fid in lane.fileIds"
              :key="fid"
              class="deco__lane-file"
              role="listitem"
            >
              <a
                :href="`/#file-${fid}`"
                class="deco__chip"
                :style="fileChipStyle(byId(fid)!.color)"
              >
                <span class="deco__chip-sym" aria-hidden="true">{{
                  byId(fid)!.symbol
                }}</span>
                <span class="deco__chip-name">{{ byId(fid)!.filename }}</span>
              </a>
              <p v-if="laneFileNote(lane.id, fid)" class="deco__chip-note">
                {{ laneFileNote(lane.id, fid) }}
              </p>
            </li>
          </ul>
        </article>
      </div>

      <p class="deco__foot">
        Export a Cursor rules bundle from
        <NuxtLink to="/configure">Build</NuxtLink>
        after filling the questionnaire.
      </p>
    </div>
  </section>
</template>

<style scoped>
.deco {
  padding: 72px 0;
  background: var(--paper-2);
  border-top: var(--stroke-fat) solid var(--ink);
  scroll-margin-top: 5.5rem;
}
.deco__head { margin-bottom: 24px; max-width: 640px; }
.deco__hl {
  display: inline-block;
  background: var(--sky);
  color: var(--paper);
  padding: 0 10px;
  border: var(--stroke) solid var(--ink);
}
.deco__lede {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 14px 0 0;
}
.deco__quick {
  list-style: none;
  margin: 0 0 28px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--mono);
  font-size: 0.8rem;
}
.deco__quick-k {
  font-family: var(--display);
  text-transform: uppercase;
  margin-right: 8px;
}
.deco__lanes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.deco__lane {
  border: var(--stroke-fat) solid var(--ink);
  padding: 16px;
  background: var(--paper);
  box-shadow: var(--shadow);
}
.deco__lane-title { margin: 0 0 4px; font-size: 0.95rem; }
.deco__lane-tag {
  font-family: var(--mono);
  font-size: 0.72rem;
  margin: 0 0 10px;
  opacity: 0.8;
}
.deco__lane-summary {
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.5;
  margin: 0 0 12px;
}
.deco__lane-files {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.deco__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border: 2px solid var(--ink);
  text-decoration: none;
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
}
.deco__chip-note {
  margin: 4px 0 0;
  font-family: var(--mono);
  font-size: 0.68rem;
  line-height: 1.45;
  opacity: 0.85;
}
.deco__foot {
  margin: 28px 0 0;
  font-family: var(--mono);
  font-size: 0.8rem;
}
.deco__foot :deep(a) {
  font-weight: 700;
  text-decoration: underline;
}
</style>
