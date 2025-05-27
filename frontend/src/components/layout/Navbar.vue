<template>
  <nav class="navbar" :class="{ open: isOpen }">
    <!-- Close Button für Mobile -->
    <button class="close-btn" @click="$emit('close')" v-if="isOpen">✕</button>

    <!-- Dark Mode Toggle -->
    <div class="dark-mode-toggle">
      <div class="darkmode-wrapper">
        <span class="toggle-icon">☀️</span>
        <label class="toggle-switch">
          <input type="checkbox" @change="toggleDarkMode" />
          <span class="slider"></span>
        </label>
        <span class="toggle-icon">🌙</span>
      </div>
    </div>

    <!-- Navbar Content -->
    <div class="navbar-content">
      <!-- Profile Picture -->
      <div class="profile">
        <img src="@/assets/profile.jpg" alt="Profile" />
      </div>

      <!-- Navigation Links -->
      <ul>
        <li>
          <router-link to="/" @click="closeOnMobile">Mini-Games</router-link>
        </li>
        <li>
          <router-link to="/resume" @click="closeOnMobile"
            >Über mich</router-link
          >
        </li>
        <li>
          <router-link to="/travel-map" @click="closeOnMobile"
            >Reisen</router-link
          >
        </li>
        <li>
          <router-link to="/contact" @click="closeOnMobile"
            >Kontakt</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

// Props
const props = defineProps<{
  isOpen: boolean;
}>();

// Emits
const emit = defineEmits(["close"]);

// Dark Mode Toggle
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

// Close navbar on mobile after clicking a link
const closeOnMobile = () => {
  if (window.innerWidth <= 768) {
    emit("close");
  }
};
</script>
