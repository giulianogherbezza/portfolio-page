<template>
  <div class="resume-container">
    <h1 class="resume-title">Mein Werdegang</h1>

    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <button
        v-for="(category, index) in categories"
        :key="index"
        :class="['tab-button', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        <font-awesome-icon :icon="category.icon" />
        <span>{{ category.title }}</span>
      </button>
    </div>

    <!-- Timeline Content -->
    <div class="timeline-container">
      <transition name="fade" mode="out-in">
        <div :key="activeTab" class="timeline-content">
          <!-- Category Header -->
          <div class="category-header">
            <div class="category-icon">
              <font-awesome-icon :icon="categories[activeTab].icon" />
            </div>
            <h2>{{ categories[activeTab].title }}</h2>
            <p class="category-description">
              {{ categories[activeTab].description }}
            </p>
          </div>

          <!-- Timeline Items -->
          <div class="timeline">
            <div class="timeline-line"></div>
            <div
              v-for="(entry, idx) in categories[activeTab].entries"
              :key="idx"
              class="timeline-item"
              :class="{ right: idx % 2 === 1 }"
            >
              <div class="timeline-marker">
                <div class="marker-dot"></div>
              </div>
              <div class="timeline-card">
                <div class="card-header">
                  <h3>{{ entry.title }}</h3>
                  <span class="timeline-date">{{ entry.date }}</span>
                </div>
                <p class="card-description">{{ entry.description }}</p>
                <div v-if="entry.skills" class="skill-tags">
                  <span
                    v-for="skill in entry.skills"
                    :key="skill"
                    class="skill-tag"
                  >
                    {{ skill }}
                  </span>
                </div>
                <div v-if="entry.achievements" class="achievements">
                  <h4>Erfolge:</h4>
                  <ul>
                    <li
                      v-for="achievement in entry.achievements"
                      :key="achievement"
                    >
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Overview (nur bei Arbeitserfahrung) -->
          <div v-if="activeTab === 1" class="skills-overview">
            <h3>Kompetenzen & Sprachen</h3>
            <div class="skills-grid">
              <div
                v-for="skill in technicalSkills"
                :key="skill.name"
                class="skill-item"
              >
                <div class="skill-header">
                  <span>{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div
                    class="skill-progress"
                    :style="{ width: skill.level + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGraduationCap,
  faBriefcase,
  faBasketballBall,
} from "@fortawesome/free-solid-svg-icons";

const activeTab = ref(0);

const categories = ref([
  {
    title: "Bildung",
    icon: faGraduationCap,
    description: "Meine akademische Laufbahn und Ausbildungen",
    entries: [
      {
        title: "BSc Wirtschaftsinformatik",
        date: "2023 - Heute",
        description: "Berner Fachhochschule, Bern - Aktuell im 4. Semester",
        skills: ["Java", "Python", "Web Development", "Datenbanken"],
        achievements: [
          "Erfolgreicher Quereinstieg",
          "Engagierte Teilnahme an Projekten",
        ],
      },
      {
        title: "BSc Business Administration",
        date: "2022 - 2023",
        description:
          "Fachhochschule Nordwestschweiz, Olten - International Management (1. Semester)",
        skills: ["Business", "Management"],
        achievements: ["Neuorientierung zur Wirtschaftsinformatik"],
      },
      {
        title: "Berufsmaturität",
        date: "2021 - 2022",
        description: "BBZ-CFP Biel/Bienne - Wirtschaft & Dienstleistungen",
        skills: ["Wirtschaft", "Rechnungswesen", "Mathematik"],
        achievements: [
          "Erfolgreicher Abschluss",
          "Vorbereitung auf FH-Studium",
        ],
      },
      {
        title: "Heizungsinstallateur EFZ",
        date: "2017 - 2020",
        description: "Gewerblich/Industrielle Berufsschule (GIBB), Bern",
        skills: ["Handwerk", "Technisches Verständnis", "Projektarbeit"],
        achievements: [
          "Erfolgreicher Lehrabschluss",
          "Praktische Berufserfahrung",
        ],
      },
    ],
  },
  {
    title: "Arbeitserfahrung",
    icon: faBriefcase,
    description: "Meine beruflichen Stationen und Erfahrungen",
    entries: [
      {
        title: "Logistik / Magazinverwaltung",
        date: "April 2023 - August 2023",
        description:
          "S&F Sanitär GmbH, Biel - Organisation und Verwaltung des Warenlagers",
        skills: ["Logistik", "Organisation", "Lagerverwaltung"],
        achievements: [
          "Effiziente Prozessoptimierung",
          "Selbstständige Arbeitsweise",
        ],
      },
      {
        title: "Geldtransportfahrer",
        date: "Februar 2023 - März 2023",
        description:
          "Loomis AG, Münchenbuchsee - Sicherer Transport von Wertgegenständen",
        skills: ["Verantwortung", "Sicherheit", "Zuverlässigkeit"],
        achievements: ["Vertrauensvolle Position", "Unfallfreie Tätigkeit"],
      },
      {
        title: "Hilfsmitarbeiter im Verkauf",
        date: "Juni 2022 - Juli 2022",
        description:
          "Hornbach, Biel - Kundenberatung und Verkaufsunterstützung",
        skills: ["Kundenkontakt", "Verkauf", "Beratung"],
        achievements: ["Positive Kundenfeedbacks", "Teamarbeit"],
      },
      {
        title: "Praktikum im Immobilienbereich",
        date: "Juni 2021 - Juli 2021",
        description: "Me4you GmbH, Studen - Einblick in die Immobilienbranche",
        skills: ["Immobilien", "Administration", "Kundenkontakt"],
        achievements: ["Branchenerfahrung", "Selbstständige Projektarbeit"],
      },
      {
        title: "Heizungsinstallateur",
        date: "2017 - 2021",
        description:
          "Keller Wärme & Wasser AG / Pärli AG - Lehre und Festanstellung",
        skills: ["Handwerk", "Teamarbeit", "Problemlösung", "Kundenkontakt"],
        achievements: ["Erfolgreiche Lehre", "Vielseitige Projekterfahrung"],
      },
    ],
  },
  {
    title: "Hobbys & Interessen",
    icon: faBasketballBall,
    description: "Was mich ausserhalb der Arbeit bewegt",
    entries: [
      {
        title: "Padel & Tennis",
        date: "Seit 2020",
        description: "Regelmässiges Training und Spiel mit Freunden",
        achievements: ["Aktiver Lifestyle", "Teamgeist und Wettkampf"],
      },
      {
        title: "Fischen",
        date: "Seit 2018",
        description: "Entspannung in der Natur und am Wasser",
        achievements: ["Geduld und Ausdauer", "Naturverbundenheit"],
      },
      {
        title: "Reisen",
        date: "Laufend",
        description: "Entdeckung neuer Kulturen und Länder",
        achievements: ["19 Länder besucht", "Interkulturelle Erfahrungen"],
      },
      {
        title: "Sport & Fitness",
        date: "Laufend",
        description: "Regelmässiges Training für Gesundheit und Wohlbefinden",
        achievements: ["Disziplin", "Work-Life-Balance"],
      },
    ],
  },
]);

const technicalSkills = ref([
  { name: "Frontend Development", level: 75 },
  { name: "Backend Development", level: 60 },
  { name: "Database Design", level: 65 },
  { name: "Deutsch", level: 100 },
  { name: "Englisch", level: 85 },
  { name: "Französisch", level: 60 },
]);
</script>

<style scoped>
/* Diese Styles werden gleich in der CSS-Datei ergänzt */
</style>
