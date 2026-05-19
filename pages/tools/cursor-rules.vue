<script setup lang="ts">
import type { AgentFileId } from '~/composables/useAgentFiles.types'

const gen = useCursorRulesGenerator()

useHead({
  title: 'Cursor rules export — Tools',
  meta: [
    {
      name: 'description',
      content:
        'Merge the seven build-your-agents markdown templates into one downloadable file for .cursor/rules.'
    }
  ]
})
</script>

<template>
  <ToolsShell
    eyebrow="Cursor"
    title="Export .cursor/rules in one click."
    lede="Bundles the selected spec files into a single markdown file. Save it as `.cursor/rules` or merge into your existing project rules."
  >
    <div class="tcr">
      <fieldset class="tcr__pick">
        <legend class="tcr__legend">Include files</legend>
        <ul class="tcr__files" role="list">
          <li v-for="f in gen.files" :key="f.id" role="listitem">
            <label class="tcr__file">
              <input
                type="checkbox"
                :checked="gen.isSelected(f.id as AgentFileId)"
                @change="gen.toggle(f.id as AgentFileId)"
              />
              <span class="tcr__sym" aria-hidden="true">{{ f.symbol }}</span>
              <span class="tcr__name">{{ f.filename }}</span>
            </label>
          </li>
        </ul>
        <button type="button" class="tcr__all" @click="gen.selectAll">
          Select all seven
        </button>
      </fieldset>

      <div class="tcr__actions">
        <button
          type="button"
          class="bya-btn"
          :disabled="!gen.hasSelection"
          @click="gen.download"
        >
          Download {{ gen.bundleFilename }}
          <span aria-hidden="true">↓</span>
        </button>
        <p class="tcr__hint">
          Place the file in your repo under
          <code class="tcr__code">.cursor/rules/</code> (or split per file).
          Regenerate whenever you update the seven <code class="tcr__code">.md</code>
          sources. See
          <NuxtLink class="tcr__link" to="/openclaw">/openclaw</NuxtLink>
          for how the spec maps to Cursor and MCPs.
        </p>
      </div>

      <label class="tcr__preview-label" for="tcr-preview">Preview</label>
      <textarea
        id="tcr-preview"
        class="tcr__preview"
        :value="gen.preview"
        readonly
        rows="16"
        spellcheck="false"
      />
    </div>
  </ToolsShell>
</template>

<style scoped>
.tcr {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.tcr__pick {
  margin: 0;
  padding: 18px;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--paper-2);
}
.tcr__legend {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.9rem;
  padding: 0 8px;
}
.tcr__files {
  list-style: none;
  margin: 12px 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 8px;
}
.tcr__file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border: 2px solid var(--ink);
  background: var(--paper);
  cursor: pointer;
  font-family: var(--mono);
  font-size: 0.78rem;
}
.tcr__sym {
  font-size: 1.1rem;
}
.tcr__name {
  text-transform: uppercase;
  font-weight: 700;
}
.tcr__all {
  font-family: var(--mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border: 2px solid var(--ink);
  background: var(--lemon);
  cursor: pointer;
}
.tcr__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tcr__hint {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.5;
  max-width: 56ch;
}
.tcr__link {
  font-weight: 700;
  text-decoration: underline;
}
.tcr__code {
  font-size: 0.92em;
  padding: 1px 5px;
  border: 2px solid var(--ink);
  background: var(--paper);
}
.tcr__preview-label {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tcr__preview {
  width: 100%;
  font-family: var(--mono);
  font-size: 0.75rem;
  line-height: 1.5;
  padding: 14px;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--ink);
  color: var(--acid);
  resize: vertical;
  min-height: 320px;
}
</style>
