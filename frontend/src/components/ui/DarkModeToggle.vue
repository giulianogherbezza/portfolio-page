<template>
  <div class="darkmode-wrapper">
    <span class="toggle-icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
    <label class="toggle-switch">
      <input type="checkbox" :checked="isDarkMode" @change="toggleDarkMode" />
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDarkMode = ref(localStorage.getItem("darkMode") === "true");

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value);
  document.body.classList.toggle("dark-mode", isDarkMode.value);
};

onMounted(() => {
  document.body.classList.toggle("dark-mode", isDarkMode.value);
});
</script>

