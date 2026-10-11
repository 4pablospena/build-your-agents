<template>
  <section id="top" class="hero">
    <div class="bya-container hero__poster">
      <div class="hero__edition">
        <span>Independent thinking starts here.</span>
        <span>Open specification / Vol. 01</span>
      </div>
      <h1 class="hero__title" aria-label="Build your own agents.">
        <span class="hero__line hero__line--first" aria-hidden="true">BUILD YOUR</span>
        <span class="hero__line hero__line--second" aria-hidden="true">OWN <span class="hero__word">AGENTS.</span></span>
      </h1>
      <div class="hero__intro">
        <p>Give your AI a personality, a memory, and some ground rules.
          Seven plain-text files. Completely yours to change.</p>
        <div class="hero__actions">
          <NuxtLink class="bya-btn" to="/configure">Make it yours</NuxtLink>
          <NuxtLink class="hero__secondary" to="/docs">Get the blank files</NuxtLink>
        </div>
      </div>
      <AgentFileDeck />
    </div>
  </section>
</template>

<style scoped>
.hero { background: var(--paper); overflow: clip; }
.hero__poster { padding-top: 28px; }
.hero__edition { display: flex; justify-content: space-between; gap: 20px; font-size: 12px; font-weight: 700; }
.hero__title { margin: 54px auto 36px; max-width: 1120px; font-family: var(--display); font-size: clamp(76px, 14.6vw, 210px); font-weight: 400; line-height: 0.91; text-align: center; letter-spacing: -0.035em; }
.hero__line { display: block; }
.hero__line--second { margin-top: 8px; }
.hero__word { color: var(--hot); }
.hero__intro { display: flex; justify-content: center; align-items: center; gap: 72px; margin: 0 auto 54px; }
.hero__intro p { max-width: 370px; margin: 0; font-size: 17px; line-height: 1.4; }
.hero__actions { display: flex; align-items: center; gap: 24px; }
.hero__actions .bya-btn { padding: 19px 38px; }
.hero__secondary { font-size: 14px; font-weight: 700; text-underline-offset: 5px; text-decoration-thickness: 1px; padding-block: 15px; }
.hero__secondary:hover { text-decoration-thickness: 3px; }
@media (prefers-reduced-motion: no-preference) {
  .hero__line { animation: poster-print 550ms cubic-bezier(.16,1,.3,1) both; }
  .hero__line--second { animation-delay: 90ms; }
  .hero__intro { animation: poster-print 500ms 160ms both; }
}
@keyframes poster-print { from { opacity: 0; transform: translateY(30px) rotate(-2deg); } to { opacity: 1; transform: translateY(0) rotate(0); } }
@media (max-width: 920px) {
  .hero__intro { flex-direction: column; gap: 22px; text-align: center; }
  .hero__intro p { max-width: 440px; }
  .hero__title { margin-top: 48px; }
}
@media (max-width: 520px) {
  .hero__edition { font-size: 10px; }
  .hero__edition > span:last-child { max-width: 98px; text-align: right; }
  .hero__title { font-size: clamp(62px, 14.8vw, 78px); margin-block: 38px 28px; line-height: .96; }
  .hero__intro { margin-bottom: 38px; }
  .hero__intro p { font-size: 16px; max-width: 320px; }
  .hero__actions { flex-wrap: wrap; justify-content: center; gap: 12px 22px; }
  .hero__actions .bya-btn { padding: 16px 28px; }
}
</style>
