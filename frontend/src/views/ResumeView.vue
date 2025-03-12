<template>
  <div class="resume-container">
    <div class="timeline">
      <div v-for="(category, index) in categories" :key="index" class="timeline-section">
        <!-- Linke Icons -->
        <div class="icon-box">
          <font-awesome-icon :icon="category.icon" />
        </div>
        
        <!-- Hauptlinie mit Punkten -->
        <div class="main-line">
          <div v-for="(entry, idx) in category.entries" :key="idx" class="timeline-point"></div>
        </div>
        
        <!-- Verzweigungen -->
        <div class="sub-branches">
          <div v-for="(entry, idx) in category.entries" :key="idx" class="branch">
            <div class="resume-card">
              <h3>{{ entry.title }}</h3>
              <p>{{ entry.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGraduationCap, faBriefcase, faBasketballBall } from "@fortawesome/free-solid-svg-icons";

const categories = ref([
  {
    title: "Bildung",
    icon: faGraduationCap,
    entries: [
      { title: "Gymnasium", description: "Abschluss 2015" },
      { title: "Universität", description: "Bachelor in Informatik 2019" },
      { title: "Weiterbildung", description: "Diverse IT-Zertifikate" }
    ]
  },
  {
    title: "Arbeitserfahrung",
    icon: faBriefcase,
    entries: [
      { title: "Praktikum", description: "Software-Entwicklung 2018" },
      { title: "Junior Developer", description: "Startup-Firma 2019-2021" },
      { title: "Senior Developer", description: "Tech-Unternehmen seit 2022" }
    ]
  },
  {
    title: "Hobbys",
    icon: faBasketballBall,
    entries: [
      { title: "Basketball", description: "Vereinsmitglied seit 2010" },
      { title: "Fotografie", description: "Reise- und Naturfotos" },
      { title: "Gaming", description: "Strategie- und Rollenspiele" }
    ]
  }
]);
</script>

<style scoped>
.resume-container {
  display: flex;
  justify-content: center;
  padding: 50px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 80px;
  align-items: center;
}

.timeline-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-box {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 28px;
  color: #333;
}

.main-line {
  width: 4px;
  background-color: #333;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.timeline-point {
  width: 12px;
  height: 12px;
  background-color: #333;
  border-radius: 50%;
}

.sub-branches {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.branch {
  display: flex;
  align-items: center;
  gap: 20px;
}

.resume-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  transition: transform 0.3s ease-in-out;
}

.resume-card:hover {
  transform: scale(1.05);
}

h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
}
</style>