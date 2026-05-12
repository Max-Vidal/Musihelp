<template>
  <div id="app">
    <div class="app-inner">
      <MusiHelpHeader />
      <UploadSection />
      <HeroSection />
      <AboutSection />
      <FooterSection />
    </div>
  </div>
</template>

<script>
import MusiHelpHeader from './MusiHelpHeader.vue'
import UploadSection from './UploadSection.vue'
import HeroSection from './HeroSection.vue'
import AboutSection from './AboutSection.vue'
import FooterSection from './FooterSection.vue'

export default {
  name: 'App',
  components: {
    MusiHelpHeader,
    UploadSection,
    HeroSection,
    AboutSection,
    FooterSection
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue-primary: #4A90D9;
  --blue-light: #B8D8F5;
  --blue-bg: #B8D8F5;
  --blue-sky: #B3DBF2;
  --blue-dark: #2C5F8A;
  --black: #111111;
  --white: #FFFFFF;
  --gray-text: #444444;
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

body {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.6;
  background-color: var(--blue-sky);
  color: var(--black);
  overflow-x: hidden;
  min-height: 100vh;
}

#app {
  width: 100%;
  min-height: 100vh;
  background: var(--blue-sky);
  text-align: center;
  padding: 84px 0 72px;
}

.app-inner {
  width: 50%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
