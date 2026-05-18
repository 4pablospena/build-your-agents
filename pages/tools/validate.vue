<script setup lang="ts">
import type { AgentFileId } from '~/composables/useBlogPosts'

const v = useMarkdownValidator()

useHead({
  title: 'Markdown validator — Tools',
  meta: [
    {
      name: 'description',
      content:
        'Paste agent markdown and validate ## section headings against the build-your-agents spec.'
    }
  ]
})
</script>

<template>
  <ToolsShell
    eyebrow="Validator"
    title="Does your .md still match the spec?"
    lede="Checks level-2 headings (##) against the canonical section list for each spec file — entirely in your browser."
  >
    <div class="tval">
      <div class="tval__row">
        <label class="tval__label" for="tval-file">Spec file</label>
        <select id="tval-file" v-model="v.selectedFileId" class="tval__select">
          <option
            v-for="f in v.files"
            :key="f.id"
            :value="f.id as AgentFileId"
          >
            {{ f.filename }}
          </option>
        </select>
      </div>

      <p class="tval__hint">
        Expected sections for
        <strong>{{ v.file?.filename }}</strong>:
        <span v-for="s in v.file?.sections ?? []" :key="s" class="tval__chip">{{
          s
        }}</span>
      </p>

      <label class="tval__label" for="tval-md">Your markdown</label>
      <textarea
        id="tval-md"
        v-model="v.markdown"
        class="tval__textarea"
        rows="14"
        :placeholder="`Paste ${v.file?.filename ?? 'your file'} here…`"
        spellcheck="false"
      />

      <div class="tval__actions">
        <button type="button" class="bya-btn" @click="v.loadTemplate">
          Load starter template
        </button>
        <button type="button" class="bya-btn bya-btn--ghost" @click="v.clear">
          Clear
        </button>
      </div>

      <div v-if="v.result" class="tval__report" role="status">
        <p
          class="tval__verdict"
          :class="v.result.ok ? 'tval__verdict--ok' : 'tval__verdict--warn'"
        >
          <template v-if="v.result.ok">
            All {{ v.result.expected?.length ?? 0 }} sections present.
          </template>
          <template v-else>
            Missing {{ v.result.missing?.length ?? 0 }} section(s).
          </template>
        </p>

        <div v-if="v.result.missing?.length" class="tval__block">
          <h3 class="tval__block-title">Missing</h3>
          <ul>
            <li v-for="s in v.result.missing" :key="s">{{ s }}</li>
          </ul>
        </div>

        <div v-if="v.result.matched?.length" class="tval__block">
          <h3 class="tval__block-title">Found</h3>
          <ul>
            <li v-for="s in v.result.matched" :key="s">{{ s }}</li>
          </ul>
        </div>

        <div v-if="v.result.extra?.length" class="tval__block">
          <h3 class="tval__block-title">Extra headings (not in spec)</h3>
          <ul>
            <li v-for="s in v.result.extra" :key="s">{{ s }}</li>
          </ul>
          <p class="tval__note">Extra sections are allowed — only missing ones fail.</p>
        </div>
      </div>
    </div>
  </ToolsShell>
</template>

<style scoped>
.tval {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.tval__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.tval__label {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tval__select {
  font-family: var(--mono);
  font-size: 0.86rem;
  padding: 10px 12px;
  border: var(--stroke) solid var(--ink);
  background: var(--paper);
  min-width: 200px;
}
.tval__hint {
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.5;
  margin: 0;
}
.tval__chip {
  display: inline-block;
  margin: 2px 4px 2px 0;
  padding: 2px 6px;
  background: var(--lemon);
  border: 2px solid var(--ink);
  font-size: 0.7rem;
}
.tval__textarea {
  width: 100%;
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.55;
  padding: 14px;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--paper-2);
  resize: vertical;
  min-height: 280px;
}
.tval__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.tval__report {
  margin-top: 8px;
  padding: 18px;
  border: var(--stroke-fat) solid var(--ink);
  background: var(--paper);
  box-shadow: var(--shadow);
}
.tval__verdict {
  margin: 0 0 14px;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 1rem;
  padding: 10px 12px;
  border: var(--stroke) solid var(--ink);
}
.tval__verdict--ok {
  background: var(--acid);
}
.tval__verdict--warn {
  background: var(--hot);
  color: var(--paper);
}
.tval__block {
  margin-bottom: 14px;
}
.tval__block-title {
  margin: 0 0 8px;
  font-family: var(--display);
  font-size: 0.85rem;
  text-transform: uppercase;
}
.tval__block ul {
  margin: 0;
  padding-left: 1.2rem;
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.5;
}
.tval__note {
  margin: 8px 0 0;
  font-family: var(--mono);
  font-size: 0.72rem;
  opacity: 0.85;
}
</style>
