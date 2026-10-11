<script setup lang="ts">
import type { AgentFileId } from '~/composables/useAgentFiles.types'
import ConfiguratorGuide from '~/components/configure/ConfiguratorGuide.vue'
import ConfiguratorPasteValidate from '~/components/configure/ConfiguratorPasteValidate.vue'

const {
  sections,
  files,
  byId,
  viewMode,
  current,
  section,
  showExport,
  exportSection,
  copied,
  hydrated,
  filled,
  progressPct,
  validationByFile,
  allValid,
  handleChange,
  sectionAnswersFor,
  exportMarkdown,
  copyToClipboard,
  downloadFile,
  downloadAll,
  downloadCursorRules,
  openStepByFileId,
  resetDraft,
  goToSection,
  next,
  prev
} = useAgentConfigurator()

const sectionAnswers = computed(() => sectionAnswersFor(section.value.id))

const previewMd = computed(() => {
  const which = exportSection.value
  const md = exportMarkdown(which)
  if (which === 'all' && md.length > 2000) {
    return `${md.slice(0, 2000)}\n\n[… download or copy to see the full content]`
  }
  return md
})
</script>

<template>
  <div class="cfg">
    <header
      class="cfg__header"
      :class="`cfg__header--${section.color}`"
    >
      <div>
        <p class="cfg__header-eyebrow">Agent configurator · 7 files</p>
        <p class="cfg__header-title">Build your agent</p>
      </div>
      <div class="cfg__header-stat">
        <span class="cfg__header-stat-label">Complete</span>
        <span class="cfg__header-stat-value">{{ progressPct }}%</span>
      </div>
    </header>

    <div
      class="cfg__bar"
      role="progressbar"
      :aria-valuenow="progressPct"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="cfg__bar-fill"
        :class="`cfg__bar-fill--${section.color}`"
        :style="{ width: `${progressPct}%` }"
      />
    </div>

    <div class="cfg__modes" role="tablist" aria-label="Build mode">
      <button
        type="button"
        role="tab"
        class="cfg__mode"
        :class="{ 'cfg__mode--on': viewMode === 'form' }"
        :aria-selected="viewMode === 'form'"
        @click="viewMode = 'form'"
      >
        Questionnaire
      </button>
      <button
        type="button"
        role="tab"
        class="cfg__mode"
        :class="{ 'cfg__mode--on': viewMode === 'guide' }"
        :aria-selected="viewMode === 'guide'"
        @click="viewMode = 'guide'; showExport = false"
      >
        Fill order
      </button>
    </div>

    <nav
      v-show="viewMode === 'form'"
      class="cfg__nav"
      aria-label="Questionnaire sections"
    >
      <button
        v-for="(s, i) in sections"
        :key="s.id"
        type="button"
        class="cfg__nav-btn"
        :class="{
          'cfg__nav-btn--active': i === current,
          [`cfg__nav-btn--${s.color}`]: i === current || filled.find((f) => f.id === s.id)?.count === filled.find((f) => f.id === s.id)?.total
        }"
        @click="goToSection(i)"
      >
        {{ s.label }} · {{ s.file }}
        <span
          v-if="filled.find((f) => f.id === s.id)?.count === filled.find((f) => f.id === s.id)?.total && i !== current"
          aria-hidden="true"
        >
          ✓
        </span>
      </button>
      <button
        type="button"
        class="cfg__nav-export"
        :class="{ 'cfg__nav-export--on': showExport }"
        @click="showExport = !showExport"
      >
        Export
      </button>
    </nav>

    <Transition name="panel">
    <section v-if="showExport" class="cfg__export">
      <h2 class="cfg__export-title">Export markdown</h2>
      <p class="cfg__export-lede">
        We generate the seven official spec files (same
        <code>##</code> sections as
        <NuxtLink to="/docs">/docs</NuxtLink>). Validate before you boot your agent.
      </p>

      <div class="cfg__export-actions">
        <label class="cfg__export-label">
          <span class="cfg__sr-only">File</span>
          <select v-model="exportSection" class="cfg__select">
            <option value="all">All files</option>
            <option v-for="s in sections" :key="s.id" :value="s.id">
              {{ s.file }}
            </option>
          </select>
        </label>
        <button type="button" class="cfg__btn cfg__btn--lemon" @click="copyToClipboard()">
          {{ copied ? '✓ Copied' : 'Copy to clipboard' }}
        </button>
        <button
          v-if="exportSection !== 'all'"
          type="button"
          class="cfg__btn cfg__btn--ghost"
          @click="downloadFile(exportSection as AgentFileId)"
        >
          Download {{ byId(exportSection as AgentFileId)?.filename }}
        </button>
        <button type="button" class="cfg__btn" @click="downloadAll">
          Download all 7
        </button>
        <button type="button" class="cfg__btn cfg__btn--ghost" @click="downloadCursorRules">
          Cursor rules bundle
        </button>
      </div>

      <ConfiguratorPasteValidate />

      <ul class="cfg__validation" aria-label="Section validation">
        <li
          v-for="f in files"
          :key="f.id"
          :class="validationByFile[f.id]?.ok ? 'cfg__validation--ok' : 'cfg__validation--warn'"
        >
          <span>{{ f.filename }}</span>
          <span v-if="validationByFile[f.id]?.ok">✓ spec OK</span>
          <span v-else>
            missing: {{ validationByFile[f.id]?.missing?.join(', ') }}
          </span>
        </li>
      </ul>
      <p v-if="allValid" class="cfg__validation-note cfg__validation-note--ok">
        All seven files include every required spec section.
      </p>

      <pre class="cfg__preview">{{ previewMd }}</pre>

      <button
        v-if="hydrated"
        type="button"
        class="cfg__reset"
        @click="resetDraft"
      >
        Clear saved draft
      </button>
    </section>

    </Transition>

    <Transition name="step" mode="out-in">
    <div v-if="viewMode === 'guide'" key="guide" class="cfg__main bya-container">
      <ConfiguratorGuide :filled="filled" @open-step="openStepByFileId" />
    </div>

    <div v-else :key="section.id" class="cfg__main bya-container">
      <header class="cfg__section-head">
        <span
          class="cfg__badge"
          :class="`cfg__badge--${section.color}`"
          aria-hidden="true"
        >
          {{ section.label }}
        </span>
        <div>
          <p class="cfg__file">{{ section.file }}</p>
          <h1 class="cfg__section-title">{{ section.title }}</h1>
          <p class="cfg__section-sub">{{ section.subtitle }}</p>
        </div>
        <p class="cfg__section-progress">
          <span class="cfg__section-progress-label">Progress</span>
          <span :class="`cfg__section-progress-val cfg__section-progress-val--${section.color}`">
            {{ filled.find((f) => f.id === section.id)?.count }}/{{ section.questions.length }}
          </span>
        </p>
      </header>

      <form class="cfg__form" @submit.prevent="next">
        <fieldset
          v-for="(q, qi) in section.questions"
          :key="q.id"
          class="cfg__field"
          :class="{
            'cfg__field--filled': (sectionAnswers[q.id] ?? '').trim().length > 0,
            [`cfg__field--${section.color}`]: (sectionAnswers[q.id] ?? '').trim().length > 0
          }"
        >
          <legend :id="`${section.id}-${q.id}-label`" class="cfg__field-label">
            <span class="cfg__field-num" aria-hidden="true">
              {{ (sectionAnswers[q.id] ?? '').trim() ? '✓' : String(qi + 1).padStart(2, '0') }}
            </span>
            {{ q.label }}
          </legend>

          <select
            v-if="q.type === 'select'"
            :id="`${section.id}-${q.id}`"
            :aria-labelledby="`${section.id}-${q.id}-label`"
            class="cfg__input cfg__select"
            :value="sectionAnswers[q.id] ?? ''"
            @change="handleChange(q.id, ($event.target as HTMLSelectElement).value)"
          >
            <option value="">— Select —</option>
            <option v-for="o in q.options" :key="o" :value="o">{{ o }}</option>
          </select>
          <textarea
            v-else-if="q.multiline"
            :id="`${section.id}-${q.id}`"
            :aria-labelledby="`${section.id}-${q.id}-label`"
            class="cfg__input cfg__textarea"
            :value="sectionAnswers[q.id] ?? ''"
            :placeholder="q.placeholder"
            rows="3"
            @input="handleChange(q.id, ($event.target as HTMLTextAreaElement).value)"
          />
          <input
            v-else
            :id="`${section.id}-${q.id}`"
            :aria-labelledby="`${section.id}-${q.id}-label`"
            type="text"
            class="cfg__input"
            :value="sectionAnswers[q.id] ?? ''"
            :placeholder="q.placeholder"
            @input="handleChange(q.id, ($event.target as HTMLInputElement).value)"
          />
        </fieldset>
      </form>
    </div>

    </Transition>

    <footer
      class="cfg__footer"
      :class="viewMode === 'form' ? `cfg__footer--${section.color}` : 'cfg__footer--ink'"
    >
      <template v-if="viewMode === 'form'">
        <button
          type="button"
          class="cfg__footer-btn cfg__footer-btn--ghost"
          :disabled="current === 0"
          @click="prev"
        >
          Previous
        </button>
        <p class="cfg__footer-meta">
          <span :class="`cfg__footer-step cfg__footer-step--${section.color}`">{{ current + 1 }}</span>
          / 7 · {{ section.file }}
        </p>
        <button
          type="button"
          class="cfg__footer-btn"
          :class="`cfg__footer-btn--${section.color}`"
          @click="next"
        >
          {{ current < sections.length - 1 ? 'Next' : 'Export' }}
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="cfg__footer-btn cfg__footer-btn--ghost"
          @click="viewMode = 'form'"
        >
          Questionnaire
        </button>
        <p class="cfg__footer-meta">Fill order · 7 steps</p>
        <button
          type="button"
          class="cfg__footer-btn cfg__footer-btn--lemon"
          @click="showExport = true"
        >
          Export
        </button>
      </template>
    </footer>
  </div>
</template>

<style scoped>
.cfg {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  padding-bottom: 80px;
}

.cfg__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.cfg__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--stroke-fat) solid var(--hot);
}
.cfg__header--hot { border-bottom-color: var(--hot); }
.cfg__header--sky { border-bottom-color: var(--sky); }
.cfg__header--lemon { border-bottom-color: var(--lemon); }
.cfg__header--pink { border-bottom-color: var(--pink); }
.cfg__header--acid { border-bottom-color: var(--acid); }
.cfg__header--grape { border-bottom-color: var(--grape); }
.cfg__header--ink { border-bottom-color: var(--lemon); }

.cfg__header-eyebrow {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.75;
}
.cfg__header-title {
  margin: 4px 0 0;
  font-family: var(--display);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.cfg__header-stat { text-align: right; }
.cfg__header-stat-label {
  display: block;
  font-family: var(--mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.6;
}
.cfg__header-stat-value {
  font-family: var(--display);
  line-height: 1;
}

.cfg__bar {
  height: 6px;
  background: #1a1a1a;
}
.cfg__bar-fill {
  height: 100%;
  transition: width 0.35s ease;
}
.cfg__bar-fill--hot { background: var(--hot); }
.cfg__bar-fill--sky { background: var(--sky); }
.cfg__bar-fill--lemon { background: var(--lemon); }
.cfg__bar-fill--pink { background: var(--pink); }
.cfg__bar-fill--acid { background: var(--acid); }
.cfg__bar-fill--grape { background: var(--grape); }
.cfg__bar-fill--ink { background: var(--lemon); }

.cfg__modes {
  display: flex;
}
.cfg__mode {
  font-family: var(--mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: transparent;
  border-right: 2px solid var(--line);
  cursor: pointer;
}

.cfg__nav {
  display: flex;
  overflow-x: auto;
  padding: 8px 24px;
  border-bottom: 2px solid var(--line);
}
.cfg__nav-btn {
  flex-shrink: 0;
  padding: 4px 10px;
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: transparent;
  color: var(--muted);
  border: 2px solid var(--line);
  cursor: pointer;
  white-space: nowrap;
}
.cfg__nav-btn--active.cfg__nav-btn--hot,
.cfg__nav-btn--hot:not(.cfg__nav-btn--active):hover { border-color: var(--hot); color: var(--hot); }
.cfg__nav-btn--active.cfg__nav-btn--sky { background: var(--sky); color: var(--paper); border-color: var(--sky); }
.cfg__nav-btn--active.cfg__nav-btn--lemon { background: var(--lemon); color: var(--ink); border-color: var(--lemon); }
.cfg__nav-btn--active.cfg__nav-btn--pink { background: var(--pink); color: var(--ink); border-color: var(--pink); }
.cfg__nav-btn--active.cfg__nav-btn--acid { background: var(--acid); color: var(--ink); border-color: var(--acid); }
.cfg__nav-btn--active.cfg__nav-btn--grape { background: var(--grape); color: var(--paper); border-color: var(--grape); }
.cfg__nav-btn--active.cfg__nav-btn--ink { background: var(--lemon); color: var(--ink); border-color: var(--lemon); }
.cfg__nav-btn--sky:not(.cfg__nav-btn--active) { color: var(--sky); border-color: var(--sky); }
.cfg__nav-btn--hot:not(.cfg__nav-btn--active) { color: var(--hot); border-color: var(--hot); }
.cfg__nav-btn--lemon:not(.cfg__nav-btn--active) { color: var(--accent); border-color: var(--lemon); }
.cfg__nav-btn--pink:not(.cfg__nav-btn--active) { color: var(--pink); border-color: var(--pink); }
.cfg__nav-btn--acid:not(.cfg__nav-btn--active) { color: var(--accent); border-color: var(--acid); }
.cfg__nav-btn--grape:not(.cfg__nav-btn--active) { color: var(--grape); border-color: var(--grape); }

.cfg__nav-export {
  flex-shrink: 0;
  margin-left: auto;
  padding: 4px 14px;
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: transparent;
  color: var(--accent);
  border: 2px solid var(--lemon);
  cursor: pointer;
}
.cfg__nav-export--on {
  background: var(--lemon);
  color: var(--ink);
}

.cfg__export {
  margin: 16px 24px;
  padding: 20px;
  color: var(--ink);
  box-shadow: none;
}
.cfg__export-title {
  margin: 0 0 8px;
  font-family: var(--display);
  font-size: 0.95rem;
  text-transform: uppercase;
  color: var(--accent);
}
.cfg__export-lede {
  margin: 0 0 14px;
  font-family: var(--mono);
  font-size: 0.78rem;
  line-height: 1.5;
  opacity: 0.9;
}
.cfg__export-lede :deep(a) {
  color: var(--accent);
  font-weight: 700;
}
.cfg__export-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.cfg__export-label { display: flex; }
.cfg__btn {
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 8px 14px;
  background: var(--acid);
  color: var(--ink);
  border: var(--stroke) solid var(--line);
  box-shadow: none;
  cursor: pointer;
}
.cfg__btn--lemon { background: var(--lemon); }
.cfg__btn--ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--ink);
  box-shadow: none;
}
.cfg__validation {
  list-style: none;
  margin: 0 0 10px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  font-family: var(--mono);
  font-size: 0.65rem;
}
.cfg__validation li {
  padding: 4px 8px;
  border: 2px solid var(--line);
}
.cfg__validation--ok { border-color: var(--acid); color: var(--accent); }
.cfg__validation--warn { border-color: var(--hot); color: var(--hot); }
.cfg__validation-note {
  margin: 0 0 12px;
  font-family: var(--mono);
  font-size: 0.74rem;
}
.cfg__validation-note--ok { color: var(--accent); }
.cfg__preview {
  margin: 0;
  padding: 14px;
  max-height: 280px;
  overflow: auto;
  font-family: var(--mono);
  font-size: 0.68rem;
  line-height: 1.55;
  background: #0a0a0a;
  color: var(--acid);
  border: 2px solid var(--line);
}
.cfg__reset {
  margin-top: 12px;
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: transparent;
  color: var(--ink);
  border: 2px solid var(--line);
  padding: 6px 10px;
  cursor: pointer;
}
.cfg__reset:hover { border-color: var(--hot); color: var(--hot); }

.cfg__main {
  padding: 28px 24px 24px;
}
.cfg__section-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 28px;
}
.cfg__badge {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--display);
  box-shadow: none;
  flex-shrink: 0;
}
.cfg__badge--hot { background: var(--hot); color: var(--ink); }
.cfg__badge--sky { background: var(--sky); color: var(--paper); }
.cfg__badge--lemon { background: var(--lemon); color: var(--ink); }
.cfg__badge--pink { background: var(--pink); color: var(--ink); }
.cfg__badge--acid { background: var(--acid); color: var(--ink); }
.cfg__badge--grape { background: var(--grape); color: var(--paper); }
.cfg__badge--ink { background: var(--ink); color: var(--paper); }

.cfg__file {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.65;
}
.cfg__section-title {
  margin: 4px 0 0;
  font-family: var(--display);
  text-transform: uppercase;
  line-height: 1.1;
}
.cfg__section-sub {
  margin: 4px 0 0;
  font-family: var(--body);
  font-style: normal;
  font-size: 0.95rem;
  opacity: 0.8;
}
.cfg__section-progress {
  margin: 0 0 0 auto;
  text-align: right;
}
.cfg__section-progress-label {
  display: block;
  font-family: var(--mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.6;
}
.cfg__section-progress-val {
  font-family: var(--display);
  font-size: 1.1rem;
}
.cfg__section-progress-val--hot { color: var(--hot); }
.cfg__section-progress-val--sky { color: var(--sky); }
.cfg__section-progress-val--lemon { color: var(--accent); }
.cfg__section-progress-val--pink { color: var(--pink); }
.cfg__section-progress-val--acid { color: var(--accent); }
.cfg__section-progress-val--grape { color: var(--grape); }
.cfg__section-progress-val--ink { color: var(--ink); }

.cfg__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  border: none;
  margin: 0;
  padding: 0;
}
.cfg__field {
  margin: 0;
  box-shadow: none;
}
.cfg__field--filled {
  border-color: var(--line);
  box-shadow: none;
}
.cfg__field--filled.cfg__field--hot { border-color: var(--hot); box-shadow: none; }
.cfg__field--filled.cfg__field--sky { border-color: var(--sky); box-shadow: none; }
.cfg__field--filled.cfg__field--lemon { border-color: var(--lemon); box-shadow: none; }
.cfg__field--filled.cfg__field--pink { border-color: var(--pink); box-shadow: none; }
.cfg__field--filled.cfg__field--acid { border-color: var(--acid); box-shadow: none; }
.cfg__field--filled.cfg__field--grape { border-color: var(--grape); box-shadow: none; }
.cfg__field--filled.cfg__field--ink { border-color: var(--line); box-shadow: none; }

.cfg__field-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 0 0 10px;
  padding: 0;
  line-height: 1.35;
  letter-spacing: 0.02em;
}
.cfg__field-num {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono);
  font-size: 0.65rem;
  background: var(--paper-2);
  color: var(--muted);
}
.cfg__input {
  width: 100%;
  font-family: var(--body);
  background: var(--paper);
  color: var(--ink);
  box-sizing: border-box;
}
.cfg__field--filled .cfg__input { border-color: var(--line); }
.cfg__textarea { resize: vertical; min-height: 72px; line-height: 1.5; }
.cfg__select {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 0.78rem;
}

.cfg__footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: var(--stroke-fat) solid var(--hot);
  z-index: 20;
}
.cfg__footer--hot { border-top-color: var(--hot); }
.cfg__footer--sky { border-top-color: var(--sky); }
.cfg__footer--lemon { border-top-color: var(--lemon); }
.cfg__footer--pink { border-top-color: var(--pink); }
.cfg__footer--acid { border-top-color: var(--acid); }
.cfg__footer--grape { border-top-color: var(--grape); }
.cfg__footer--ink { border-top-color: var(--lemon); }

.cfg__footer-btn {
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: var(--stroke) solid var(--paper);
  cursor: pointer;
}
.cfg__footer-btn:disabled {
  opacity: 0.35;
  cursor: default;
}
.cfg__footer-btn--ghost {
  background: transparent;
}
.cfg__footer-btn--hot { background: var(--hot); color: var(--ink); border-color: var(--hot); }
.cfg__footer-btn--sky { background: var(--sky); color: var(--paper); border-color: var(--sky); }
.cfg__footer-btn--lemon { background: var(--lemon); color: var(--ink); border-color: var(--lemon); }
.cfg__footer-btn--pink { background: var(--pink); color: var(--ink); border-color: var(--pink); }
.cfg__footer-btn--acid { background: var(--acid); color: var(--ink); border-color: var(--acid); }
.cfg__footer-btn--grape { background: var(--grape); color: var(--paper); border-color: var(--grape); }
.cfg__footer-btn--ink { background: var(--lemon); color: var(--ink); border-color: var(--lemon); }

.cfg__footer-meta {
  margin: 0;
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  opacity: 0.7;
}
.cfg__footer-step { font-weight: 700; }
.cfg__footer-step--hot { color: var(--hot); }
.cfg__footer-step--sky { color: var(--sky); }
.cfg__footer-step--lemon { color: var(--accent); }
.cfg__footer-step--pink { color: var(--pink); }
.cfg__footer-step--acid { color: var(--accent); }
.cfg__footer-step--grape { color: var(--grape); }
.cfg__footer-step--ink { color: var(--accent); }

@media (max-width: 640px) {
  .cfg__section-progress {
    margin-left: 0;
    width: 100%;
    text-align: left;
  }
}

.cfg__header { padding: 28px 40px; background: var(--ink); color: var(--paper); }
.cfg__header-title { font-size: 40px; line-height: 1.1; font-weight: 400; }
.cfg__header-stat-value { font-size: 44px; }
.cfg__modes { background: var(--paper); padding: 14px 24px; gap: 8px; border-bottom: 1px solid var(--ink); }
.cfg__mode { flex: 0 1 auto; border: 1px solid var(--ink); border-radius: 80px; padding: 12px 24px; color: var(--ink); }
.cfg__mode--on { background: var(--ink); color: var(--paper); }
.cfg__nav { background: var(--paper); padding-block: 16px; gap: 8px; }
.cfg__nav-btn, .cfg__nav-export { border-radius: 48px; padding: 10px 16px; border-width: 1px; color: var(--ink); }
.cfg__nav-btn--active { background: var(--lemon); }
.cfg__main { max-width: 960px; padding-block: 42px; }
.cfg__section-title { font-size: clamp(32px, 5vw, 56px); font-weight: 400; }
.cfg__badge { border-radius: 50%; width: 64px; height: 64px; font-size: 30px; border: none; }
.cfg__field { border: 0; border-bottom: 1px solid var(--line); background: transparent; padding: 8px 0 22px; transition: border-color 150ms ease; }
.cfg__field-label { font-family: var(--body); font-size: 15px; font-weight: 700; }
.cfg__field-num { border-radius: 50%; }
.cfg__input { min-height: 48px; padding: 14px 18px; border-radius: var(--radius-input); border: 1px solid var(--ink); font-size: 16px; transition: background 150ms ease, border-color 150ms ease; }
.cfg__input:focus { background: #fffaf1; }
.cfg__field--filled .cfg__field-num { background: var(--ink); color: var(--acid); }
.cfg__footer { background: var(--ink); color: var(--paper); padding: 16px 24px; }
.cfg__footer-btn { border-radius: 80px; padding: 12px 24px; min-height: 44px; border-width: 1px; transition: transform 150ms ease; }
.cfg__footer-btn:active { transform: scale(.96); }
.cfg__footer-btn--ghost { color: var(--paper); border-color: var(--paper); }
.cfg__btn, .cfg__reset { border-radius: 48px; min-height: 44px; transition: transform 150ms ease; }
.cfg__btn:active, .cfg__reset:active { transform: scale(.96); }
.cfg__export { border-radius: 24px; background: var(--paper-2); border: 1px solid var(--ink); }
@media (max-width: 600px) {
  .cfg__header { padding: 24px 18px; }
  .cfg__header-title { font-size: 32px; }
  .cfg__main { padding-inline: 0; }
  .cfg__footer { padding: 12px; gap: 10px; }
  .cfg__footer-btn { padding: 10px 18px; }
  .cfg__footer-meta { font-size: 10px; }
  .cfg__export { margin-inline: 12px; padding: 18px; }
}

.cfg__section-progress-val { color: var(--ink); }
.cfg__nav-btn--active.cfg__nav-btn--hot { background: var(--hot); color: var(--ink); }
.cfg__footer-step { color: var(--lemon); }
</style>
