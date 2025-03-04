<template>
  <nav class="navbar" :class="{ open: isOpen }">

    <!-- Dark Mode Toggle oben links -->
    <div class="dark-mode-toggle">
      <DarkModeToggle />
    </div>

    <!-- Profilbild -->
    <div class="profile">
      <img src="@/assets/profile.jpg" alt="Profilbild" /> 
    </div>

    <!-- Navigationslinks -->
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/resume">Resume</router-link></li>
      <li><router-link to="/travel-map">Travel Map</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>

    <!-- Hamburger Menu für mobile Ansicht -->
    <div class="menu-icon" @click="toggleMenu">☰</div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import DarkModeToggle from "../ui/DarkModeToggle.vue";

const isOpen = ref(false);
const toggleMenu = () => (isOpen.value = !isOpen.value);
</script>

