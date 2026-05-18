<script setup lang="ts">
useHead({
  title: 'Tools — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Optional utilities: validate markdown sections, export Cursor rules, and search blog and changelog content.'
    }
  ]
})
</script>

<template>
  <ToolsShell
    eyebrow="Utilities"
    title="Spec tools, isolated from the tour."
    lede="Validate filled markdown, export Cursor rules, or search posts and changelog — without leaving the seven-file story on the home page and /docs."
  >
    <ToolsGrid />
  </ToolsShell>
</template>
