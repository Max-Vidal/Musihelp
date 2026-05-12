<template>
  <header class="musihelp-header">
    <h1 class="header-title">MUSIHELP</h1>
  </header>
</template>

<script>
export default {
  name: 'MusiHelpHeader'
}
</script>

<style scoped>
.musihelp-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background-color: var(--blue-primary);
  padding: 14px 24px;
  text-align: center;
}

.header-title {
  font-family: var(--font-display);
  font-size: 34px;
  letter-spacing: 0.12em;
  color: var(--black);
}
</style>
