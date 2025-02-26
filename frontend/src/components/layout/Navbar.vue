<template>
  <nav>
    <div class="menu-icon" @click="toggleMenu">☰</div>
    <ul :class="{ open: isOpen }">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/resume">Resume</router-link></li>
      <li><router-link to="/travel-map">Travel Map</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
    <DarkModeToggle />
  </nav>
</template>

<script setup>
import { ref } from "vue";
import DarkModeToggle from "../ui/DarkModeToggle.vue";

const isOpen = ref(false);
const toggleMenu = () => (isOpen.value = !isOpen.value);
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--background);
}
.menu-icon {
  font-size: 24px;
  cursor: pointer;
}
ul {
  list-style: none;
  display: flex;
  gap: 15px;
}
ul.open {
  display: block;
}
</style>
