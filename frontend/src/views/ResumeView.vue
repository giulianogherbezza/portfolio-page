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
            <p class="category-description">{{ categories[activeTab].description }}</p>
          </div>

          <!-- Timeline Items -->
          <div class="timeline">
            <div class="timeline-line"></div>
            <div 
              v-for="(entry, idx) in categories[activeTab].entries" 
              :key="idx" 
              class="timeline-item"
              :class="{ 'right': idx % 2 === 1 }"
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
                  <span v-for="skill in entry.skills" :key="skill" class="skill-tag">
                    {{ skill }}
                  </span>
                </div>
                <div v-if="entry.achievements" class="achievements">
                  <h4>Erfolge:</h4>
                  <ul>
                    <li v-for="achievement in entry.achievements" :key="achievement">
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Overview (nur bei Arbeitserfahrung) -->
          <div v-if="activeTab === 1" class="skills-overview">
            <h3>Technische Fähigkeiten</h3>
            <div class="skills-grid">
              <div v-for="skill in technicalSkills" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span>{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
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
  faAward 
} from "@fortawesome/free-solid-svg-icons";

const activeTab = ref(0);

const categories = ref([
  {
    title: "Bildung",
    icon: faGraduationCap,
    description: "Meine akademische Laufbahn und Weiterbildungen",
    entries: [
      { 
        title: "Matura",
        date: "2015 - 2019",
        description: "Gymnasium mit Schwerpunkt Naturwissenschaften. Abschluss mit Auszeichnung.",
        achievements: ["Beste Matura-Arbeit des Jahrgangs", "Durchschnittsnote: 5.8"]
      },
      { 
        title: "Bachelor in Informatik",
        date: "2019 - 2023",
        description: "ETH Zürich - Fokus auf Software Engineering und Machine Learning.",
        skills: ["Java", "Python", "C++", "Machine Learning"],
        achievements: ["Dean's List 2021", "Tutor für Algorithmen & Datenstrukturen"]
      },
      { 
        title: "Zertifizierungen",
        date: "2023 - 2024",
        description: "Kontinuierliche Weiterbildung in Cloud-Technologien und DevOps.",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        achievements: ["AWS Certified Developer", "Certified Kubernetes Administrator"]
      }
    ]
  },
  {
    title: "Arbeitserfahrung",
    icon: faBriefcase,
    description: "Meine beruflichen Stationen und Projekte",
    entries: [
      { 
        title: "Praktikum - Web Developer",
        date: "2021",
        description: "6-monatiges Praktikum bei StartupXYZ. Entwicklung von React-Anwendungen.",
        skills: ["React", "Node.js", "MongoDB"],
        achievements: ["Implementierung eines neuen Buchungssystems", "Performance-Optimierung um 40%"]
      },
      { 
        title: "Junior Full-Stack Developer",
        date: "2023 - 2024",
        description: "Erste Festanstellung bei TechCorp AG. Verantwortlich für mehrere Kundenprojekte.",
        skills: ["Vue.js", "Laravel", "PostgreSQL", "Docker"],
        achievements: ["Lead Developer für 3 Projekte", "Einführung von Code Reviews"]
      },
      { 
        title: "Senior Developer",
        date: "2024 - Heute",
        description: "Technische Leitung von Entwicklungsteams und Architektur-Entscheidungen.",
        skills: ["System Design", "Team Leadership", "Cloud Architecture"],
        achievements: ["Migration zu Microservices", "Mentoring von 5 Junior Developers"]
      }
    ]
  },
  {
    title: "Hobbys & Interessen",
    icon: faBasketballBall,
    description: "Was mich außerhalb der Arbeit bewegt",
    entries: [
      { 
        title: "Basketball",
        date: "Seit 2010",
        description: "Aktiver Spieler im Verein BC Zürich. Teamkapitän seit 2022.",
        achievements: ["Kantonalmeister 2023", "MVP der Saison 2022/23"]
      },
      { 
        title: "Reisefotografie",
        date: "Seit 2018",
        description: "Leidenschaftlicher Fotograf mit Fokus auf Landschaften und Kulturen.",
        achievements: ["Instagram: @travel_captures", "Ausstellung im Café Noir 2023"]
      },
      { 
        title: "Open Source",
        date: "Seit 2020",
        description: "Aktiver Contributor bei verschiedenen Open Source Projekten.",
        achievements: ["Maintainer von 2 npm packages", "500+ GitHub Contributions 2023"]
      }
    ]
  },
  {
    title: "Auszeichnungen",
    icon: faAward,
    description: "Besondere Erfolge und Anerkennungen",
    entries: [
      { 
        title: "Hackathon Winner",
        date: "2022",
        description: "1. Platz beim Zürich Hackathon mit einer KI-basierten Lösung für Stadtplanung.",
        achievements: ["Preisgeld: CHF 10'000", "Mentoring durch Google"]
      },
      { 
        title: "Best Young Developer",
        date: "2023",
        description: "Auszeichnung der Swiss IT Association für herausragende Leistungen.",
        achievements: ["Nominierung durch 3 Unternehmen", "Keynote Speaker bei SwissIT 2024"]
      },
      { 
        title: "Innovation Award",
        date: "2024",
        description: "Firmeninterner Award für die Entwicklung eines neuen Deployment-Systems.",
        achievements: ["50% schnellere Deployments", "Implementierung in 5 Teams"]
      }
    ]
  }
]);

const technicalSkills = ref([
  { name: "Frontend Development", level: 90 },
  { name: "Backend Development", level: 85 },
  { name: "Database Design", level: 75 },
  { name: "Cloud Architecture", level: 80 },
  { name: "DevOps", level: 70 },
  { name: "UI/UX Design", level: 65 }
]);
</script>

<style scoped>
/* Diese Styles werden gleich in der CSS-Datei ergänzt */
</style>