<script setup lang="ts">
import type { AgentFileId } from '~/composables/useAgentFiles.types'
import { validateMarkdownSections } from '~/composables/useMarkdownValidator'

const { files } = useAgentFiles()
const selectedFileId = ref<AgentFileId>('soul')
const markdown = ref('')

const file = computed(() => files.find((f) => f.id === selectedFileId.value))
const result = computed(() => {
  if (!file.value || !markdown.value.trim()) return null
  return validateMarkdownSections(markdown.value, file.value.sections)
})
</script>

<template>
  <div class="cfg-paste">
    <h3 class="cfg-paste__title">Validate pasted markdown</h3>
    <p class="cfg-paste__lede">
      Paste a filled file to check required <code>##</code> sections (same rules as
      the spec).
    </p>
    <label class="cfg-paste__label">
      <span class="cfg-paste__label-text">File</span>
      <select v-model="selectedFileId" class="cfg-paste__select">
        <option v-for="f in files" :key="f.id" :value="f.id">{{ f.filename }}</option>
      </select>
    </label>
    <textarea
      v-model="markdown"
      class="cfg-paste__area"
      rows="5"
      placeholder="Paste markdown here…"
    />
    <div v-if="result" class="cfg-paste__result" :class="result.ok ? 'cfg-paste__result--ok' : 'cfg-paste__result--warn'">
      <p v-if="result.ok">All {{ result.expected.length }} sections present.</p>
      <p v-else>
        Missing: {{ result.missing.join(', ') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.cfg-paste {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 2px dashed #444;
}
.cfg-paste__title {
  margin: 0 0 6px;
  font-family: var(--display);
  font-size: 0.82rem;
  text-transform: uppercase;
  color: var(--lemon);
}
.cfg-paste__lede {
  margin: 0 0 12px;
  font-family: var(--mono);
  font-size: 0.72rem;
  opacity: 0.9;
}
.cfg-paste__label {
  display: block;
  margin-bottom: 8px;
}
.cfg-paste__label-text {
  display: block;
  font-family: var(--mono);
  font-size: 0.66rem;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.cfg-paste__select,
.cfg-paste__area {
  width: 100%;
  font-family: var(--mono);
  font-size: 0.78rem;
  padding: 8px;
  background: #0a0a0a;
  color: var(--paper);
  border: 2px solid #444;
  box-sizing: border-box;
}
.cfg-paste__area { margin-top: 8px; resize: vertical; }
.cfg-paste__result {
  margin-top: 10px;
  padding: 8px 10px;
  font-family: var(--mono);
  font-size: 0.72rem;
  border: 2px solid;
}
.cfg-paste__result--ok {
  border-color: var(--acid);
  color: var(--acid);
}
.cfg-paste__result--warn {
  border-color: var(--hot);
  color: var(--hot);
}
</style>
