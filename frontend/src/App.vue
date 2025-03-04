<template>
  <!-- Hamburger-Button -->
  <button class="hamburger" @click="toggleMenu">☰</button>

  <!-- Navbar erhält den Status, ob sie offen ist -->
  <Navbar :isOpen="isNavbarOpen" />
  
  <main>
    <router-view />
  </main>
  
  <Footer />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";

const isNavbarOpen = ref(false);

const toggleMenu = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};
</script>

<style scoped>
main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
}

/* Hamburger-Button */
.hamburger {
  position: fixed;
  top: 15px;
  left: 15px;
  font-size: 28px;
  padding: 8px 12px;
  background: transparent;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 2000;
  display: none;
}

/* Nur sichtbar auf kleinen Screens */
@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
}
</style>
