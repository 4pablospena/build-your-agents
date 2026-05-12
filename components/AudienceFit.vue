<script setup lang="ts">
const forYou = [
  'You want to learn how to structure agent context without a proprietary black box.',
  'You like versioned markdown you can read, diff, and share with friends or students.',
  'You are experimenting with Cursor rules, MCPs, or similar — and own the risk.',
  'You want a starter pack to fork, rename, and adapt — not a finished product.'
]

const notFor = [
  'You need certification, legal guarantees, or compliance claims from this repo.',
  'You want a closed SaaS with zero files to edit — this spec lives on disk.',
  'You run safety-critical systems without your own security and data review.',
  'You expect the authors to operate or warrant your production deployment.'
]
</script>

<template>
  <section id="audience" class="aud">
    <div class="bya-container">
      <header class="aud__head">
        <span class="bya-eyebrow">01 / Who this is for</span>
        <h2 class="bya-h2 aud__title">
          Honest scope —<br />
          <span class="aud__hl">for you or not.</span>
        </h2>
        <p class="bya-lede aud__lede">
          This site is a personal learning project and a free pattern to help
          others ship clearer agents. It is not a company, a service SLA, or
          a substitute for your own judgement.
        </p>
      </header>

      <div class="aud__grid">
        <article class="aud__card aud__card--yes" aria-labelledby="aud-for-heading">
          <h3 id="aud-for-heading" class="bya-h3 aud__card-title">For you if</h3>
          <ul class="aud__list">
            <li v-for="item in forYou" :key="item" class="aud__li">{{ item }}</li>
          </ul>
        </article>

        <article class="aud__card aud__card--no" aria-labelledby="aud-not-heading">
          <h3 id="aud-not-heading" class="bya-h3 aud__card-title">Not the right fit if</h3>
          <ul class="aud__list">
            <li v-for="item in notFor" :key="item" class="aud__li">{{ item }}</li>
          </ul>
        </article>
      </div>

      <p class="aud__foot">
        Built to learn in public and to give others a leg up with the same
        seven-file spec. Take what helps; change what does not; you are
        responsible for how you deploy it.
      </p>
    </div>
  </section>
</template>

<style scoped>
.aud {
  padding: 88px 0 72px;
  background:
    radial-gradient(520px 280px at 15% 20%, rgba(200, 255, 0, 0.22), transparent 55%),
    radial-gradient(480px 260px at 92% 60%, rgba(255, 46, 147, 0.12), transparent 50%),
    var(--paper);
  border-bottom: var(--stroke-fat) solid var(--ink);
}
.aud__head {
  max-width: 720px;
  margin-bottom: 40px;
}
.aud__title {
  margin: 14px 0 12px;
}
.aud__hl {
  display: inline-block;
  background: var(--hot);
  color: var(--paper);
  padding: 0 12px;
  border: var(--stroke) solid var(--ink);
  box-shadow: 6px 6px 0 0 var(--ink);
  transform: rotate(-0.8deg);
}
.aud__lede {
  margin: 0;
}

.aud__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
  align-items: stretch;
}

.aud__card {
  margin: 0;
  padding: 24px;
  background: var(--paper);
  border: var(--stroke-fat) solid var(--ink);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.aud__card--yes {
  box-shadow: var(--shadow-color);
}
.aud__card--no {
  border-color: var(--ink);
  background: var(--paper-2);
}

.aud__card-title {
  margin: 0;
  font-size: 1.15rem;
}

.aud__list {
  margin: 0;
  padding-left: 1.15rem;
  display: grid;
  gap: 12px;
  font-family: var(--mono);
  font-size: 0.86rem;
  line-height: 1.5;
}
.aud__li {
  padding-left: 0.15rem;
}

.aud__foot {
  margin: 40px 0 0;
  max-width: 62ch;
  font-family: var(--serif);
  font-size: 1.05rem;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .aud__hl {
    transform: none;
  }
}
</style>
