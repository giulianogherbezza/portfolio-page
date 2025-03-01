<template>
  <nav :class="{ open: isOpen }">
    <!-- Dark Mode Toggle oben links -->
    <div class="dark-mode-toggle">
      <DarkModeToggle />
    </div>

    <!-- Profilbild -->
    <div class="profile">
      <!-- <img src="@/assets/profile.jpg" alt="Profilbild" /> -->
    </div>

    <!-- Navigationslinks -->
    <ul>
      <li><router-link to="/">🏠 Home</router-link></li>
      <li><router-link to="/about">🙋 About</router-link></li>
      <li><router-link to="/resume">📄 Resume</router-link></li>
      <li><router-link to="/travel-map">🗺️ Travel Map</router-link></li>
      <li><router-link to="/contact">📩 Contact</router-link></li>
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

<style scoped>
/* Stile für die Sidebar */
nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background: var(--background);
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

/* Dark Mode Toggle oben links */
.dark-mode-toggle {
  position: absolute;
  top: 10px;
  left: 10px;
}

/* Profilbild */
.profile img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 40px;
  object-fit: cover;
  border: 3px solid var(--text);
}

/* Navigationslinks */
ul {
  list-style: none;
  padding: 0;
  margin-top: 30px;
  width: 100%;
  text-align: center;
}

ul li {
  margin: 15px 0;
}

ul li a {
  text-decoration: none;
  color: var(--text);
  font-size: 18px;
  display: block;
  padding: 10px;
  transition: 0.3s;
}

ul li a:hover {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

/* Hamburger Menu (nur sichtbar für mobile Geräte) */
.menu-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  display: none;
}

/* Mobile Ansicht */
@media (max-width: 768px) {
  nav {
    width: 200px;
    transform: translateX(-100%);
  }

  nav.open {
    transform: translateX(0);
  }

  .menu-icon {
    display: block;
  }
}
</style>
