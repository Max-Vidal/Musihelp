<template>
  <section class="hero-section">
    <img
      src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80"
      alt="Músico tocando guitarra y escribiendo partituras"
      class="hero-image"
    />
  </section>
</template>

<script>
export default {
  name: 'HeroSection'
}
</script>

<style scoped>
.hero-section {
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.hero-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  object-position: center 30%;
  display: block;
}
</style>
