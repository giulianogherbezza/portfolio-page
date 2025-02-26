<template>
  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }} Mein Portfolio</p>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  text-align: center;
  padding: 20px;
  background: var(--background);
  color: var(--text);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
