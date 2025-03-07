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

</style>

body {
  margin: 0;
  padding: 0;
  font-family: "Arial", sans-serif;
  background: url("background-light.jpg") no-repeat center center fixed;
  background-size: cover;
  color: var(--text-color);
  transition: background-image 0.5s ease-in-out, color 0.3s ease;
}
main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background: transparent;
}
body.dark-mode {
  background: url("background-dark.jpg") no-repeat center center fixed;
  background-size: cover;
  color: var(--text-color-dark);
}
</style>