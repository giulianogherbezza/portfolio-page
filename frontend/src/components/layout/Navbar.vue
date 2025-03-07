<template>
  <nav class="navbar" :class="{ open: props.isOpen }">
    <!-- Dark Mode Toggle -->
    <div class="dark-mode-toggle">
      <DarkModeToggle />
    </div>

    <div class="navbar-content">
      <div class="profile">
        <img src="@/assets/profile.jpg" alt="Profilbild" />
      </div>

      <ul>
        <li><router-link to="/">About</router-link></li>
        <li><router-link to="/resume">Resume</router-link></li>
        <li><router-link to="/travel-map">Travel Map</router-link></li>
        <li><router-link to="/minigames">Mini Games</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from "vue";
import DarkModeToggle from "../ui/DarkModeToggle.vue";

const props = defineProps({
  isOpen: Boolean,
});
</script>
