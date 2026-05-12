<template>
  <footer class="footer-section">
    <p class="footer-text">© 2026 MusiHelp. Todos los derechos reservados.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
.footer-section {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 16px;
  background-color: var(--blue-dark);
  color: var(--white);
  text-align: center;
  z-index: 40;
}

.footer-text {
  font-size: 14px;
  letter-spacing: 0.05em;
}
</style>
