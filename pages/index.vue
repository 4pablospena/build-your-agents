<script setup lang="ts">
useHead({
  title: 'Build your own agents — a seven-file architecture'
})
</script>

<template>
  <main>
    <AppHeader active="top" />
    <HeroSection />

    <MarqueeBar
      :items="[
        'Markdown is the API',
        'Agents read themselves',
        'No black box',
        'Version your soul',
        'Memory is a folder',
        'The heartbeat is a cronjob with manners'
      ]"
    />

    <AudienceFit />

    <ArchitectureMap />

    <FileGraph />

    <SessionLoop />

    <DecisionRules />

    <MarqueeBar
      :items="[
        'Open spec',
        'Public documentation',
        'Build your own agents',
        'v1.0'
      ]"
    />

    <AppFooter />
  </main>
</template>
