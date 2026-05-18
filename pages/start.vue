<script setup lang="ts">
const { byId } = useAgentFiles()
const { order, totalMinutes } = useStartJourney()
const { done, hydrated, toggle, isDone, reset } = useStartProgress()

const completedCount = computed(
  () => order.filter((s) => done.value.has(s.fileId)).length
)
const percent = computed(() =>
  order.length === 0 ? 0 : Math.round((completedCount.value / order.length) * 100)
)
const minutesLeft = computed(() =>
  order
    .filter((s) => !done.value.has(s.fileId))
    .reduce((acc, s) => acc + s.estMinutes, 0)
)
const allDone = computed(() => completedCount.value === order.length)

const nextStep = computed(() => order.find((s) => !done.value.has(s.fileId)))

function position(n: number) {
  return String(n).padStart(2, '0')
}

function stepAnchor(stepId: string) {
  return `step-${stepId}`
}

function docsHref(fileId: string) {
  return `/docs#docs-card-${fileId}`
}

function homeHref(fileId: string) {
  return `/#file-${fileId}`
}

useHead({
  title: 'Start — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'A guided checklist to fill the seven markdown files in the recommended order. Progress is saved locally — no account, no backend.'
    }
  ]
})
</script>

<template>
  <main class="st">
    <AppHeader active="start-page" />

    <section class="st__hero">
      <div class="st__deco st__deco--a" aria-hidden="true">START</div>
      <div class="st__deco st__deco--b" aria-hidden="true">CHECKLIST</div>
      <div class="st__deco st__deco--c" aria-hidden="true">★</div>

      <div class="bya-container st__hero-grid">
        <div class="st__lead">
          <span class="bya-eyebrow bya-rise bya-rise-1">Guided journey</span>

          <h1 class="bya-h1 st__title bya-rise bya-rise-2">
            Seven<br />
            <span class="st__title-accent">steps,</span><br />
            <span class="st__title-stamp">one folder.</span>
          </h1>

          <p class="bya-lede st__lede bya-rise bya-rise-3">
            Fill the seven markdown files in the order they actually depend on
            each other. Around <strong>{{ totalMinutes }} minutes</strong> end
            to end for a first pass. Mark steps as you go — your progress
            stays in this browser, no account, no backend.
          </p>

          <div class="st__cta-row bya-rise bya-rise-4">
            <a
              v-if="nextStep"
              class="bya-btn"
              :href="`#${stepAnchor(nextStep.fileId)}`"
            >
              <template v-if="completedCount === 0">Begin with SOUL</template>
              <template v-else>Resume at step {{ position(nextStep.position) }}</template>
              <span aria-hidden="true">↘</span>
            </a>
            <a v-else class="bya-btn" href="#st-done">
              See finish line
              <span aria-hidden="true">↘</span>
            </a>
            <NuxtLink class="bya-btn bya-btn--ghost" to="/docs">
              Open templates
            </NuxtLink>
          </div>
        </div>

        <aside class="st__progress" aria-label="Journey progress">
          <header class="st__progress-head">
            <span class="st__progress-eyebrow">Progress</span>
            <span class="st__progress-count" aria-live="polite">
              <strong>{{ completedCount }}</strong>
              <span class="st__progress-of">/ {{ order.length }}</span>
            </span>
          </header>
          <div
            class="st__bar"
            role="progressbar"
            :aria-valuenow="percent"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`Journey ${percent}% complete`"
          >
            <div class="st__bar-fill" :style="{ width: `${percent}%` }" />
            <span class="st__bar-pct">{{ percent }}%</span>
          </div>
          <dl class="st__progress-meta">
            <div>
              <dt>Done</dt>
              <dd>{{ completedCount }}</dd>
            </div>
            <div>
              <dt>Left</dt>
              <dd>{{ order.length - completedCount }}</dd>
            </div>
            <div>
              <dt>Est. time</dt>
              <dd>~{{ minutesLeft }} min</dd>
            </div>
          </dl>
          <button
            v-if="hydrated && completedCount > 0"
            type="button"
            class="st__reset"
            @click="reset"
          >
            Reset progress
            <span aria-hidden="true">↺</span>
          </button>
        </aside>
      </div>
    </section>

    <MarqueeBar
      :items="[
        'Fill in the brackets',
        'Markdown is the API',
        'Version your soul',
        'No black box',
        'Read order matters',
        'Boot your agent'
      ]"
    />

    <section class="st__list-wrap">
      <div class="bya-container">
        <header class="st__list-head">
          <span class="bya-eyebrow">The path</span>
          <h2 class="bya-h2 st__list-title">
            Read in this <span class="st__list-hl">exact order.</span>
          </h2>
          <p class="st__list-lede">
            Every step links to its card in <NuxtLink to="/docs">/docs</NuxtLink>
            (preview &amp; download) and to its anchor on the
            <NuxtLink to="/">overview</NuxtLink>.
          </p>
        </header>

        <ol class="st__list">
          <li
            v-for="step in order"
            :id="stepAnchor(step.fileId)"
            :key="step.fileId"
            :class="[
              'st__step',
              `st__step--${byId(step.fileId)?.color}`,
              { 'st__step--done': isDone(step.fileId) }
            ]"
          >
            <div class="st__step-side" aria-hidden="true">
              <span class="st__step-num">{{ position(step.position) }}</span>
              <span class="st__step-line" />
            </div>

            <div class="st__step-body">
              <header class="st__step-head">
                <span class="st__step-symbol" aria-hidden="true">{{
                  byId(step.fileId)?.symbol
                }}</span>
                <h3 class="bya-h3 st__step-filename">
                  {{ byId(step.fileId)?.filename }}
                </h3>
                <span class="st__step-time">
                  <span aria-hidden="true">⏱</span>
                  {{ step.estMinutes }} min
                </span>
              </header>

              <p class="st__step-tag">{{ byId(step.fileId)?.tagline }}</p>
              <p class="st__step-role">{{ byId(step.fileId)?.role }}</p>

              <p class="st__step-goal">
                <span class="st__step-goal-label">Goal</span>
                <span>{{ step.goal }}</span>
              </p>

              <div
                v-if="byId(step.fileId)?.sections?.length"
                class="st__step-sections"
                role="list"
              >
                <span
                  v-for="s in byId(step.fileId)?.sections"
                  :key="s"
                  class="st__step-section"
                  role="listitem"
                >
                  {{ s }}
                </span>
              </div>

              <footer class="st__step-actions">
                <button
                  type="button"
                  class="st__step-toggle"
                  role="checkbox"
                  :aria-checked="isDone(step.fileId)"
                  :aria-label="
                    isDone(step.fileId)
                      ? `Mark step ${position(step.position)} (${byId(step.fileId)?.filename}) as not done`
                      : `Mark step ${position(step.position)} (${byId(step.fileId)?.filename}) as done`
                  "
                  @click="toggle(step.fileId)"
                  @keydown.space.prevent="toggle(step.fileId)"
                >
                  <span class="st__step-tick" aria-hidden="true">
                    {{ isDone(step.fileId) ? '✓' : '' }}
                  </span>
                  {{ isDone(step.fileId) ? 'Done' : 'Mark done' }}
                </button>

                <NuxtLink class="st__step-link" :to="docsHref(step.fileId)">
                  Open in docs
                  <span aria-hidden="true">↗</span>
                </NuxtLink>
                <NuxtLink class="st__step-link" :to="homeHref(step.fileId)">
                  See on overview
                  <span aria-hidden="true">↗</span>
                </NuxtLink>
              </footer>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section id="st-done" class="st__done" :class="{ 'st__done--lit': allDone }">
      <div class="bya-container st__done-inner">
        <span class="bya-eyebrow st__done-eyebrow">{{
          allDone ? 'All seven · ready to ship' : 'Finish line'
        }}</span>
        <h2 class="bya-h2 st__done-title">
          <template v-if="allDone">
            Folder filled.<br />
            <span class="st__done-hl">Now boot your agent.</span>
          </template>
          <template v-else>
            Almost there.<br />
            <span class="st__done-hl">{{ order.length - completedCount }} step{{ order.length - completedCount === 1 ? '' : 's' }} to go.</span>
          </template>
        </h2>
        <p class="st__done-lede">
          <template v-if="allDone">
            Save the seven <code class="st__inline-code">.md</code> files into a
            single folder and point your model at it as system context or
            workspace rules. The session loop in
            <NuxtLink to="/#session-loop">AGENTS.md</NuxtLink> describes how it
            reads itself.
          </template>
          <template v-else>
            Keep going — progress is stored locally, you can close the tab and
            come back. When all seven are filled, this band turns green.
          </template>
        </p>
        <div class="st__done-cta">
          <NuxtLink class="bya-btn" to="/docs">
            <template v-if="allDone">Download all seven</template>
            <template v-else>Open templates</template>
            <span aria-hidden="true">↗</span>
          </NuxtLink>
          <NuxtLink class="bya-btn bya-btn--ghost" to="/">
            Back to overview
            <span aria-hidden="true">↖</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.st {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  position: relative;
  z-index: 2;
}

/* ----- Hero ----- */
.st__hero {
  position: relative;
  padding: 96px 0 0;
  overflow: hidden;
  border-bottom: var(--stroke-fat) solid var(--ink);
  background:
    radial-gradient(720px 360px at 82% 6%, rgba(200, 255, 0, 0.28), transparent 58%),
    radial-gradient(620px 360px at 6% 78%, rgba(108, 43, 217, 0.18), transparent 58%),
    var(--paper);
}
.st__deco {
  position: absolute;
  font-family: var(--display);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink);
  font-size: clamp(2.5rem, 8vw, 7rem);
  letter-spacing: -0.02em;
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
  z-index: 0;
}
.st__deco--a { top: 4%; left: -3%; transform: rotate(-6deg); }
.st__deco--b {
  bottom: 18%; right: -4%; transform: rotate(5deg);
  -webkit-text-stroke-color: var(--hot);
}
.st__deco--c {
  top: 8%; right: 8%; font-size: 5rem;
  color: var(--lemon); -webkit-text-stroke: 3px var(--ink);
  transform: rotate(12deg);
  opacity: 0.95;
}

.st__hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: end;
  position: relative;
  z-index: 2;
  padding-bottom: 56px;
}

.st__title { margin: 22px 0 26px; }
.st__title-accent {
  display: inline-block;
  background: var(--acid);
  padding: 0 14px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 8px 8px 0 0 var(--ink);
  transform: rotate(-1.4deg);
  margin: 4px 0;
}
.st__title-stamp {
  display: inline-block;
  color: var(--grape);
  -webkit-text-stroke: 2px var(--ink);
}

.st__lede { margin: 0 0 28px; max-width: 54ch; }
.st__lede strong { font-family: var(--display); }
.st__cta-row { display: flex; flex-wrap: wrap; gap: 14px; }

/* Progress panel */
.st__progress {
  align-self: stretch;
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transform: rotate(1.5deg);
}
.st__progress-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.st__progress-eyebrow {
  font-family: var(--mono);
  text-transform: uppercase;
  font-size: 0.74rem;
  letter-spacing: 0.16em;
}
.st__progress-count {
  font-family: var(--display);
  font-size: 2.2rem;
  line-height: 1;
}
.st__progress-count strong {
  color: var(--hot);
  -webkit-text-stroke: 2px var(--ink);
}
.st__progress-of {
  margin-left: 6px;
  font-size: 1.1rem;
  opacity: 0.7;
}

.st__bar {
  position: relative;
  height: 24px;
  border: var(--stroke) solid var(--ink);
  background: var(--paper-2);
  overflow: hidden;
}
.st__bar-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--acid);
  border-right: var(--stroke) solid var(--ink);
  transition: width 240ms ease;
}
.st__bar-pct {
  position: relative;
  z-index: 1;
  display: block;
  text-align: center;
  font-family: var(--mono);
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 24px;
}

.st__progress-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0;
  padding: 0;
}
.st__progress-meta > div {
  border: 2px solid var(--ink);
  padding: 8px 10px;
}
.st__progress-meta dt {
  font-family: var(--mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.7;
}
.st__progress-meta dd {
  margin: 4px 0 0;
  font-family: var(--display);
  font-size: 1.15rem;
}

.st__reset {
  align-self: flex-start;
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 12px;
  background: var(--paper);
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.st__reset:hover {
  background: var(--hot);
  color: var(--paper);
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 0 var(--ink);
}

/* ----- List ----- */
.st__list-wrap {
  padding: 72px 0 84px;
  background: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.st__list-head { margin-bottom: 44px; max-width: 760px; }
.st__list-head .bya-eyebrow { margin-bottom: 12px; }
.st__list-hl {
  display: inline-block;
  background: var(--lemon);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.9deg);
}
.st__list-lede {
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.55;
  max-width: 60ch;
  margin: 18px 0 0;
}
.st__list-lede :deep(a) {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.st__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.st__step {
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 20px;
  scroll-margin-top: 6rem;
}
.st__step--hot   .st__step-body { background: var(--hot);   color: var(--paper); }
.st__step--sky   .st__step-body { background: var(--sky);   color: var(--paper); }
.st__step--lemon .st__step-body { background: var(--lemon); color: var(--ink); }
.st__step--pink  .st__step-body { background: var(--pink);  color: var(--paper); }
.st__step--acid  .st__step-body { background: var(--acid);  color: var(--ink); }
.st__step--grape .st__step-body { background: var(--grape); color: var(--paper); }
.st__step--ink   .st__step-body { background: var(--ink);   color: var(--paper); }

.st__step--done .st__step-body {
  outline: 4px dashed var(--ink);
  outline-offset: -10px;
}
.st__step--done .st__step-num {
  background: var(--ink);
  color: var(--acid);
}

.st__step-side {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
}
.st__step-num {
  font-family: var(--display);
  font-size: 1.8rem;
  padding: 6px 12px;
  background: var(--paper);
  color: var(--ink);
  border: var(--stroke) solid var(--ink);
  box-shadow: 4px 4px 0 0 var(--ink);
  z-index: 2;
}
.st__step-line {
  flex: 1;
  width: 4px;
  margin-top: 8px;
  background: var(--ink);
}
.st__step:last-child .st__step-line { display: none; }

.st__step-body {
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow);
  padding: 22px 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--paper);
}

.st__step-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
}
.st__step-symbol {
  font-size: 1.8rem;
  line-height: 1;
}
.st__step-filename {
  margin: 0;
  font-size: clamp(1.1rem, 2.2vw, 1.5rem);
  word-break: break-all;
}
.st__step-time {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  background: var(--paper);
  color: var(--ink);
  border: 2px solid var(--ink);
}
.st__step--lemon .st__step-time,
.st__step--acid .st__step-time {
  background: var(--ink);
  color: var(--paper);
}

.st__step-tag {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  margin: 0;
  line-height: 1.3;
}
.st__step-role {
  font-family: var(--mono);
  font-size: 0.86rem;
  margin: 0;
  line-height: 1.55;
  opacity: 0.92;
}

.st__step-goal {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 4px 0 0;
  padding: 12px 14px;
  border-left: var(--stroke-fat) solid currentColor;
  background: rgba(10, 10, 10, 0.16);
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.5;
}
.st__step--lemon .st__step-goal,
.st__step--acid .st__step-goal {
  background: rgba(10, 10, 10, 0.1);
}
.st__step--ink .st__step-goal {
  background: rgba(246, 241, 228, 0.1);
  border-left-color: var(--lemon);
}
.st__step-goal-label {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  padding: 2px 8px;
  background: var(--ink);
  color: var(--paper);
}
.st__step--ink .st__step-goal-label {
  background: var(--lemon);
  color: var(--ink);
}

.st__step-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.st__step-section {
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  background: var(--paper);
  color: var(--ink);
  border: 2px solid var(--ink);
}
.st__step--lemon .st__step-section,
.st__step--acid .st__step-section {
  background: var(--ink);
  color: var(--paper);
}

.st__step-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
  padding-top: 14px;
  border-top: 2px dashed currentColor;
}
.st__step-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 8px 14px;
  background: var(--paper);
  color: var(--ink);
  border: var(--stroke) solid var(--ink);
  box-shadow: 3px 3px 0 0 var(--ink);
  cursor: pointer;
  transition: transform 100ms ease, box-shadow 100ms ease;
}
.st__step-toggle:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 0 var(--ink);
}
.st__step-toggle[aria-checked='true'] {
  background: var(--acid);
  color: var(--ink);
}
.st__step--lemon .st__step-toggle[aria-checked='true'],
.st__step--acid .st__step-toggle[aria-checked='true'] {
  background: var(--ink);
  color: var(--acid);
}
.st__step-tick {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  border: 2px solid currentColor;
  font-size: 0.78rem;
  line-height: 1;
}

.st__step-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: 0.76rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 7px 12px;
  background: transparent;
  color: inherit;
  border: var(--stroke) solid currentColor;
  text-decoration: none;
}
.st__step-link:hover {
  background: rgba(10, 10, 10, 0.18);
}
.st__step--ink .st__step-link:hover {
  background: rgba(246, 241, 228, 0.1);
}

/* ----- Done band ----- */
.st__done {
  padding: 64px 0 96px;
  background: var(--ink);
  color: var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
  transition: background 240ms ease;
}
.st__done--lit {
  background: var(--acid);
  color: var(--ink);
}
.st__done-inner { max-width: 800px; }
.st__done-eyebrow {
  background: var(--lemon);
  color: var(--ink);
  border-color: var(--lemon);
}
.st__done--lit .st__done-eyebrow {
  background: var(--ink);
  color: var(--acid);
  border-color: var(--ink);
}
.st__done-title { margin: 16px 0 14px; }
.st__done-hl {
  display: inline-block;
  background: var(--hot);
  color: var(--paper);
  padding: 0 12px;
  border: var(--stroke) solid var(--paper);
  box-shadow: 6px 6px 0 0 var(--lemon);
  transform: rotate(-0.9deg);
}
.st__done--lit .st__done-hl {
  background: var(--grape);
  border-color: var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
}
.st__done-lede {
  font-family: var(--mono);
  font-size: 0.88rem;
  line-height: 1.55;
  margin: 0 0 18px;
  max-width: 58ch;
  opacity: 0.92;
}
.st__done-lede :deep(a) {
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.st__inline-code {
  font-family: var(--mono);
  font-size: 0.88em;
  padding: 2px 6px;
  background: rgba(246, 241, 228, 0.12);
  border: 2px solid var(--paper);
}
.st__done--lit .st__inline-code {
  background: rgba(10, 10, 10, 0.16);
  border-color: var(--ink);
}
.st__done-cta { display: flex; flex-wrap: wrap; gap: 14px; }
.st__done .bya-btn--ghost {
  background: transparent;
  color: var(--paper);
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}
.st__done .bya-btn--ghost:hover {
  box-shadow: 7px 7px 0 0 var(--paper);
}
.st__done--lit .bya-btn--ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--ink);
  box-shadow: 4px 4px 0 0 var(--ink);
}
.st__done--lit .bya-btn--ghost:hover {
  box-shadow: 7px 7px 0 0 var(--ink);
}

/* ----- Responsive ----- */
@media (max-width: 920px) {
  .st__hero-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .st__progress { transform: rotate(0deg); }
  .st__step {
    grid-template-columns: 60px 1fr;
    gap: 14px;
  }
  .st__step-num {
    font-size: 1.4rem;
    padding: 5px 9px;
  }
  .st__step-head {
    grid-template-columns: auto 1fr;
  }
  .st__step-time {
    grid-column: 1 / -1;
    justify-self: start;
  }
}
@media (max-width: 560px) {
  .st__step { grid-template-columns: 1fr; gap: 12px; }
  .st__step-side {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    padding-top: 0;
  }
  .st__step-line { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .st__progress { transform: none; }
  .st__bar-fill { transition: none; }
}
</style>
