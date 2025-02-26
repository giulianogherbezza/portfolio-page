<template>
  <button @click="toggleDarkMode">
    {{ isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode" }}
  </button>
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
