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
  border-bottom: var(--stroke-fat) solid var(--line);
}
.aud__head {
  margin-bottom: 40px;
}
.aud__title {
  margin: 14px 0 12px;
}
.aud__hl { font-family: var(--display); font-style: normal; font-weight: 400; }
.aud__lede {
  margin: 0;
}

.aud__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: stretch;
}

.aud__card {
  margin: 0;
  background: var(--paper);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.aud__card--yes {
  box-shadow: none;
}
.aud__card--no {
  border-color: var(--line);
}

.aud__card-title {
  margin: 0;
}

.aud__list {
  margin: 0;
  padding-left: 1.15rem;
  display: grid;
}
.aud__li {
  padding-left: 0.15rem;
}

.aud__foot {
  max-width: 62ch;
  line-height: 1.5;
}

@media (prefers-reduced-motion: reduce) {
  .aud__hl { color: var(--grape); font-family: var(--display); font-style: normal; font-weight: 400; }
}

.aud { background: var(--ink); color: var(--paper); padding: 90px 0; border: none; }
.aud__head { max-width: 800px; margin: 0 auto 50px; text-align: center; }
.aud__hl { color: var(--acid); }
.aud__lede { margin-inline: auto; }
.aud__grid { gap: 20px; }
.aud__card { padding: 44px; border: none; color: var(--ink); }
.aud__card--yes { background: var(--acid); border-radius: 80px 20px 20px 20px; }
.aud__card--no { background: var(--pink); border-radius: 20px 20px 80px 20px; }
.aud__card-title { font-size: 36px; }
.aud__list { font-family: var(--body); font-size: 16px; line-height: 1.5; gap: 16px; }
.aud__foot { font-family: var(--body); font-size: 14px; margin: 36px auto 0; text-align: center; color: var(--color-ash-taupe); }
@media (max-width: 600px) { .aud__card { padding: 34px 28px; } .aud__grid { grid-template-columns: 1fr; } }

</style>
