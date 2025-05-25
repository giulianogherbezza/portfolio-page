<template>
  <!-- Hamburger-Button -->
  <button class="hamburger" @click="toggleMenu" v-show="!isNavbarOpen">
    ☰
  </button>

  <!-- Navbar erhält den Status und kann sich selbst schließen -->
  <Navbar :isOpen="isNavbarOpen" @close="isNavbarOpen = false" />

  <!-- Overlay für Mobile -->
  <div 
    class="mobile-overlay" 
    v-if="isNavbarOpen && isMobile" 
    @click="isNavbarOpen = false"
  ></div>

  <main>
    <router-view />
  </main>

  <Footer />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";

const isNavbarOpen = ref(false);
const isMobile = ref(false);

const toggleMenu = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
  // Close navbar on resize to desktop
  if (!isMobile.value) {
    isNavbarOpen.value = false;
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>