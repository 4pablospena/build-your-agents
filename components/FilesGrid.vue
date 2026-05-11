<script setup lang="ts">
// Section that lists all seven file cards. Pure composition.
const { files } = useAgentFiles()
</script>

<template>
  <section id="files" class="files">
    <div class="bya-container">
      <header class="files__head">
        <span class="bya-eyebrow">03 / The seven files</span>
        <h2 class="bya-h2">
          Every file does <span class="files__hl">one thing.</span>
        </h2>
        <p class="bya-lede">
          Click any file in the architecture map above to jump here. Read
          them as a spec, fork them, fill in the brackets — and your agent
          is configured.
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
