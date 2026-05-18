<script setup lang="ts">
import type { AgentFileId } from '~/composables/useAgentFiles.types'

const props = withDefaults(
  defineProps<{
    /** On /start only the wizard is shown; maps live on home. */
    variant?: 'full' | 'wizard'
    eyebrow?: string
  }>(),
  {
    variant: 'full',
    eyebrow: '02c / Explore & place'
  }
)

const { byId } = useAgentFiles()
const graph = useFileGraph()
const wizard = useFilePlacementWizard()

function chipStyle(color: string) {
  const onPaper = ['lemon', 'acid'].includes(color)
  return {
    background: `var(--${color})`,
    color: onPaper ? 'var(--ink)' : 'var(--paper)'
  }
}

function resultHref(fileId: AgentFileId) {
  return props.variant === 'full' ? `#file-${fileId}` : `/#file-${fileId}`
}
</script>

<template>
  <section id="file-graph" class="fgraph">
    <div class="bya-container fgraph__inner">
      <header class="fgraph__head">
        <span class="bya-eyebrow">{{ eyebrow }}</span>
        <h2 class="bya-h2">
          <template v-if="variant === 'full'">
            Trace dependencies.<br />
            <span class="fgraph__hl">Place new content.</span>
          </template>
          <template v-else>
            Which file does<br />
            <span class="fgraph__hl">this belong in?</span>
          </template>
        </h2>
        <p class="fgraph__lede">
          <template v-if="variant === 'full'">
            Click any file card below (or a node in the maps) to highlight what
            it <strong>reads</strong> and who <strong>reads it</strong>. Use the
            wizard to pick a home for a new paragraph or rule.
          </template>
          <template v-else>
            Describe what you want to capture — we match your text against each
            file’s <code class="fgraph__code">sections</code> and the decision
            rules from AGENTS.md / TOOLS.md. Then open the card on the overview.
          </template>
        </p>
      </header>

      <div
        v-if="variant === 'full' && graph.hasSelection"
        class="fgraph__explorer"
        role="status"
        aria-live="polite"
      >
        <div class="fgraph__explorer-main">
          <span
            class="fgraph__explorer-chip"
            :style="chipStyle(graph.selected!.color)"
          >
            <span aria-hidden="true">{{ graph.selected!.symbol }}</span>
            {{ graph.selected!.filename }}
          </span>
          <span class="fgraph__explorer-copy">
            <template v-if="graph.readsIds.length">
              reads
              <strong>{{
                graph.readsIds.map((id) => byId(id)?.filename).join(', ')
              }}</strong>
            </template>
            <template v-else>standalone — nothing listed in reads ↳</template>
            <template v-if="graph.readByIds.length">
              · read by
              <strong>{{
                graph.readByIds.map((id) => byId(id)?.filename).join(', ')
              }}</strong>
            </template>
          </span>
        </div>
        <button type="button" class="fgraph__clear" @click="graph.clear()">
          Clear highlight
        </button>
      </div>

      <div class="fgraph__wizard">
        <h3 class="fgraph__wizard-title">Which file does this belong in?</h3>
        <label class="fgraph__label" for="fgraph-query">
          Describe what you want to document
        </label>
        <textarea
          id="fgraph-query"
          v-model="wizard.query"
          class="fgraph__textarea"
          rows="3"
          placeholder="e.g. hard limit on sharing API keys, morning brief cron, tool selection when memory already has the answer…"
        />

        <div class="fgraph__chips-row">
          <span class="fgraph__chips-label">Decision rules</span>
          <div class="fgraph__chips">
            <button
              v-for="(rule, i) in wizard.decisionRules"
              :key="rule.when"
              type="button"
              class="fgraph__chip"
              :class="{ 'fgraph__chip--on': wizard.activeRuleIndex === i }"
              @click="wizard.pickRule(i)"
            >
              {{ rule.when }}
            </button>
          </div>
        </div>

        <div class="fgraph__chips-row">
          <span class="fgraph__chips-label">Tool priority</span>
          <div class="fgraph__chips">
            <button
              v-for="(step, i) in wizard.toolPriority"
              :key="step.rank"
              type="button"
              class="fgraph__chip fgraph__chip--prio"
              :class="{
                'fgraph__chip--on': wizard.activePriorityIndex === i
              }"
              @click="wizard.pickPriority(i)"
            >
              <span class="fgraph__chip-rank" aria-hidden="true">{{ step.rank }}</span>
              {{ step.label }}
            </button>
          </div>
        </div>

        <div v-if="wizard.hasInput" class="fgraph__results">
          <header class="fgraph__results-head">
            <span class="bya-chip">Suggested files</span>
            <button type="button" class="fgraph__reset" @click="wizard.reset()">
              Reset wizard
            </button>
          </header>

          <ol v-if="wizard.results.length" class="fgraph__results-list">
            <li
              v-for="match in wizard.results"
              :key="match.fileId"
              class="fgraph__result"
            >
              <a
                :href="resultHref(match.fileId)"
                class="fgraph__result-link"
                :style="chipStyle(byId(match.fileId)!.color)"
              >
                <span class="fgraph__result-name">{{
                  byId(match.fileId)?.filename
                }}</span>
                <span class="fgraph__result-score">{{ match.score }} pts</span>
              </a>
              <p v-if="match.sections.length" class="fgraph__result-sections">
                Sections:
                <span
                  v-for="s in match.sections"
                  :key="s"
                  class="fgraph__result-section"
                  >{{ s }}</span
                >
              </p>
              <ul class="fgraph__result-reasons">
                <li v-for="r in match.reasons" :key="r">{{ r }}</li>
              </ul>
            </li>
          </ol>
          <p v-else class="fgraph__empty">
            No strong match — try a decision-rule chip or different keywords
            (personality → SOUL, cron → HEARTBEAT, MCP → TOOLS).
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fgraph {
  padding: 72px 0;
  background: var(--paper-2);
  border-bottom: var(--stroke-fat) solid var(--ink);
  scroll-margin-top: 5.5rem;
}
.fgraph__head {
  margin-bottom: 32px;
  max-width: 720px;
}
.fgraph__head .bya-eyebrow {
  margin-bottom: 12px;
}
.fgraph__hl {
  display: inline-block;
  background: var(--acid);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 5px 5px 0 0 var(--ink);
  transform: rotate(-0.8deg);
}
.fgraph__lede {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  margin: 16px 0 0;
  max-width: 58ch;
}
.fgraph__lede strong {
  font-weight: 700;
}
.fgraph__code {
  font-size: 0.9em;
  padding: 1px 5px;
  background: var(--paper);
  border: 2px solid var(--ink);
}

.fgraph__explorer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 18px;
  margin-bottom: 28px;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--lemon);
  box-shadow: var(--shadow);
}
.fgraph__explorer-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.fgraph__explorer-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.88rem;
}
.fgraph__explorer-copy {
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.45;
  max-width: 48ch;
}
.fgraph__clear {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 12px;
  background: var(--paper);
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
  cursor: pointer;
}
.fgraph__clear:hover {
  background: var(--hot);
  color: var(--paper);
}

.fgraph__wizard {
  border: var(--stroke-fat) solid var(--ink);
  background: var(--paper);
  box-shadow: var(--shadow-lg);
  padding: 24px 22px;
}
.fgraph__wizard-title {
  margin: 0 0 16px;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 1.05rem;
}
.fgraph__label {
  display: block;
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.fgraph__textarea {
  width: 100%;
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.5;
  padding: 12px 14px;
  border: var(--stroke) solid var(--ink);
  background: var(--paper-2);
  resize: vertical;
  min-height: 88px;
  margin-bottom: 18px;
}
.fgraph__textarea:focus {
  outline: 3px solid var(--sky);
  outline-offset: 2px;
}

.fgraph__chips-row {
  margin-bottom: 14px;
}
.fgraph__chips-label {
  display: block;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.75;
  margin-bottom: 8px;
}
.fgraph__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.fgraph__chip {
  font-family: var(--mono);
  font-size: 0.72rem;
  padding: 6px 10px;
  border: 2px solid var(--ink);
  background: var(--paper-2);
  cursor: pointer;
  text-align: left;
}
.fgraph__chip--on {
  background: var(--sky);
  color: var(--paper);
  box-shadow: 3px 3px 0 0 var(--ink);
}
.fgraph__chip--prio {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.fgraph__chip-rank {
  font-family: var(--display);
  font-size: 0.85rem;
  color: var(--hot);
}

.fgraph__results {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 2px dashed var(--ink);
}
.fgraph__results-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.fgraph__reset {
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 8px;
  border: 2px solid var(--ink);
  background: transparent;
  cursor: pointer;
}
.fgraph__results-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.fgraph__result-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 4px 4px 0 0 var(--ink);
  text-decoration: none;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.9rem;
  margin-bottom: 8px;
}
.fgraph__result-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 0 var(--ink);
}
.fgraph__result-score {
  font-family: var(--mono);
  font-size: 0.68rem;
  opacity: 0.85;
}
.fgraph__result-sections {
  margin: 0 0 6px;
  font-family: var(--mono);
  font-size: 0.72rem;
  line-height: 1.5;
}
.fgraph__result-section {
  display: inline-block;
  margin: 2px 4px 2px 0;
  padding: 2px 6px;
  background: var(--lemon);
  border: 2px solid var(--ink);
}
.fgraph__result-reasons {
  margin: 0;
  padding-left: 1.1rem;
  font-family: var(--mono);
  font-size: 0.7rem;
  line-height: 1.45;
  opacity: 0.88;
}
.fgraph__empty {
  margin: 0;
  font-family: var(--serif);
  font-size: 0.95rem;
  line-height: 1.45;
}
</style>
