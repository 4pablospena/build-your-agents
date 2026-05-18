<script setup lang="ts">
const { newHereCards } = useSiteNav()
</script>

<template>
  <section id="new-here" class="nh" aria-labelledby="nh-heading">
    <div class="bya-container">
      <header class="nh__head">
        <span class="bya-eyebrow">00 / Orientation</span>
        <h2 id="nh-heading" class="bya-h2 nh__title">
          New here?<br />
          <span class="nh__hl">Pick a path.</span>
        </h2>
        <p class="nh__lede">
          The landing page explains the spec. These routes help you
          <em class="bya-serif">do something</em> with it in a few clicks.
        </p>
      </header>

      <ul class="nh__grid" role="list">
        <li v-for="(card, i) in newHereCards" :key="card.to" role="listitem">
          <NuxtLink
            :class="['nh__card', i % 2 === 0 ? 'tilt-l' : 'tilt-r']"
            :to="card.to"
          >
            <h3 class="nh__card-title">{{ card.title }}</h3>
            <p class="nh__card-body">{{ card.body }}</p>
            <span class="nh__card-cta">{{ card.cta }} →</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.nh {
  padding: 72px 0;
  background:
    radial-gradient(520px 260px at 12% 100%, rgba(255, 61, 0, 0.12), transparent 55%),
    var(--paper-2);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.nh__head {
  margin-bottom: 40px;
  max-width: 640px;
}
.nh__head .bya-eyebrow {
  margin-bottom: 12px;
  background: var(--ink);
  color: var(--paper);
}
.nh__hl {
  display: inline-block;
  background: var(--lemon);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.9deg);
}
.nh__lede {
  font-family: var(--mono);
  font-size: 0.84rem;
  line-height: 1.55;
  margin: 16px 0 0;
  max-width: 52ch;
}

.nh__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}
.nh__card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 150px;
  padding: 20px 18px;
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow-lg);
  background: var(--paper);
  text-decoration: none;
  color: inherit;
}
.nh__card:hover {
  background: var(--acid);
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0 0 var(--ink);
}
.nh__card-title {
  font-family: var(--display);
  text-transform: uppercase;
  font-size: 0.98rem;
  margin: 0;
  line-height: 1.15;
}
.nh__card-body {
  font-family: var(--mono);
  font-size: 0.76rem;
  line-height: 1.5;
  margin: 0;
  flex: 1;
}
.nh__card-cta {
  font-family: var(--mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
</style>
