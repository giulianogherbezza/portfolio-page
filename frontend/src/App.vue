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


