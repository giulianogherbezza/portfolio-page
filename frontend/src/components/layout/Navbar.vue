<template>
  <nav>
    <div class="logo">Mein Portfolio</div>
    <button @click="isOpen = !isOpen" class="hamburger">☰</button>
    <ul :class="{ open: isOpen }">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/resume">Resume</router-link>
      <router-link to="/travels">Travels</router-link>
      <router-link to="/contact">Contact</router-link>
      <DarkModeToggle />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DarkModeToggle from "../ui/DarkModeToggle.vue";

const isOpen = ref(false);
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.hamburger {
  display: none;
}

ul {
  display: flex;
  gap: 1rem;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  ul {
    display: none;
    flex-direction: column;
  }

  ul.open {
    display: flex;
  }
}
</style>
