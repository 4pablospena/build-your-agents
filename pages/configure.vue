<script setup lang="ts">
useHead({
  title: 'Configure your agent — Build your own agents',
  meta: [
    {
      name: 'description',
      content:
        'Guided questionnaire to fill SOUL, IDENTITY, AGENTS, USER, TOOLS, MEMORY, and HEARTBEAT. Generates the seven spec markdown files for download.'
    }
  ]
})
</script>

<template>
  <div>
    <AppHeader active="configure-page" />
    <AgentConfigurator />
  </div>
</template>
