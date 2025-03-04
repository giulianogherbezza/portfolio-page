<template>
  <Navbar />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<style scoped>
main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
}
</style>


<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
</script>
