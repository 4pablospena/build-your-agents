<script setup lang="ts">
const props = withDefaults(
  defineProps<{ items?: string[] }>(),
  {
    items: () => [
      'Markdown is the API',
      'Agents read themselves',
      'No black box',
      'Version your soul'
    ]
  }
)
</script>

<template>
  <div class="bya-marquee" role="presentation">
    <div class="bya-marquee__track">
      <span v-for="(t, i) in [...props.items, ...props.items]" :key="i">
        {{ t }}
        <span class="bya-marquee__star">★</span>
      </span>
    </div>
  </div>
</template>
