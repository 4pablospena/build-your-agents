<script setup lang="ts">
// Section that lists all seven file cards. Pure composition.
withDefaults(
  defineProps<{
    eyebrow?: string
    lede?: string
    showDocsLink?: boolean
  }>(),
  {
    eyebrow: '03 / The seven files',
    lede:
      'Click a card to highlight what it reads (and who reads it) in the maps above. Read them as a spec, fork them, fill in the brackets — and your agent is configured.',
    showDocsLink: true
  }
)

const { files } = useAgentFiles()
</script>

<template>
  <section id="files" class="files">
    <div class="bya-container">
      <header class="files__head">
        <span class="bya-eyebrow">{{ eyebrow }}</span>
        <h2 class="bya-h2">
          Every file does <span class="files__hl">one thing.</span>
        </h2>
        <p class="bya-lede files__lede-wrap">
          {{ lede }}
          <NuxtLink v-if="showDocsLink" class="files__docs-link" to="/docs">
            Download the .md templates →
          </NuxtLink>
        </p>
      </header>

      <div class="files__grid">
        <FileCard
          v-for="(f, i) in files"
          :key="f.id"
          :file="f"
          :index="i"
          :class="[i % 3 === 0 ? 'tilt-l' : i % 3 === 2 ? 'tilt-r' : '']"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.files {
  padding: 96px 0;
  background: var(--paper);
}
.files__head {
  margin-bottom: 56px;
  max-width: 820px;
}
.files__head .bya-eyebrow { margin-bottom: 14px; }
.files__lede-wrap {
  display: block;
}
.files__docs-link {
  display: inline-block;
  margin-top: 14px;
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  color: var(--ink);
  text-decoration: none;
  padding: 8px 14px;
  border: var(--stroke) solid var(--ink);
  background: var(--acid);
  box-shadow: 4px 4px 0 0 var(--ink);
}
.files__docs-link:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 0 var(--ink);
}
.files__hl {
  display: inline-block;
  background: var(--pink);
  color: var(--paper);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-1deg);
}

.files__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}
@media (min-width: 1100px) {
  .files__grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
