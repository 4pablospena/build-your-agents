<script setup lang="ts">
import type { AgentFileId } from '~/composables/useAgentFiles.types'

const props = defineProps<{
  filled: { id: AgentFileId; count: number; total: number }[]
}>()

const emit = defineEmits<{
  openStep: [fileId: AgentFileId]
}>()

const { order, totalMinutes } = useStartJourney()
const { byId } = useAgentFiles()

function position(n: number) {
  return String(n).padStart(2, '0')
}

function stepFilled(fileId: AgentFileId) {
  const f = props.filled.find((x) => x.id === fileId)
  return f ? f.count === f.total && f.total > 0 : false
}
</script>

<template>
  <div class="cfg-guide">
    <p class="cfg-guide__lede">
      Recommended fill order — about <strong>{{ totalMinutes }} minutes</strong>
      for a first pass. Open each step in the questionnaire when you are ready.
    </p>
    <ol class="cfg-guide__list">
      <li
        v-for="step in order"
        :key="step.fileId"
        class="cfg-guide__step"
        :class="{ 'cfg-guide__step--done': stepFilled(step.fileId) }"
      >
        <div class="cfg-guide__step-head">
          <span class="cfg-guide__num">{{ position(step.position) }}</span>
          <div>
            <h3 class="cfg-guide__filename">{{ byId(step.fileId)?.filename }}</h3>
            <p class="cfg-guide__goal">{{ step.goal }}</p>
          </div>
          <span class="cfg-guide__time">~{{ step.estMinutes }} min</span>
        </div>
        <button
          type="button"
          class="cfg-guide__open"
          @click="emit('openStep', step.fileId)"
        >
          {{ stepFilled(step.fileId) ? 'Edit step' : 'Open step' }}
          <span aria-hidden="true">→</span>
        </button>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.cfg-guide__lede {
  font-family: var(--mono);
  font-size: 0.8rem;
  line-height: 1.55;
  margin: 0 0 18px;
}
.cfg-guide__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cfg-guide__step {
  border: var(--stroke) solid #ccc;
  background: #fff;
  padding: 14px;
  box-shadow: 3px 3px 0 0 #ccc;
}
.cfg-guide__step--done {
  border-color: var(--acid);
  box-shadow: 3px 3px 0 0 var(--acid);
}
.cfg-guide__step-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: start;
  margin-bottom: 10px;
}
.cfg-guide__num {
  font-family: var(--display);
  font-size: 1rem;
  padding: 4px 8px;
  background: var(--ink);
  color: var(--paper);
}
.cfg-guide__filename {
  margin: 0;
  font-family: var(--display);
  font-size: 0.85rem;
  text-transform: uppercase;
}
.cfg-guide__goal {
  margin: 6px 0 0;
  font-family: var(--mono);
  font-size: 0.76rem;
  line-height: 1.5;
}
.cfg-guide__time {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.cfg-guide__open {
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 6px 12px;
  background: var(--lemon);
  border: var(--stroke) solid var(--ink);
  box-shadow: 2px 2px 0 0 var(--ink);
  cursor: pointer;
}
</style>
