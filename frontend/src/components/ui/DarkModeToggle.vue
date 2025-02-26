<template>
  <button @click="toggleDarkMode">
    {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark-mode", isDarkMode.value);
};

onMounted(() => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  isDarkMode.value = prefersDark;
  document.body.classList.toggle("dark-mode", prefersDark);
});
</script>
