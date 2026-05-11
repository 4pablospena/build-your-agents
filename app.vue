<script setup lang="ts">
// Root composition surface — keep thin. Wiring + layout only.
useHead({
  bodyAttrs: { class: 'bya-body' }
})
</script>

<template>
  <div class="bya-shell">
    <NuxtPage />
  </div>
</template>
