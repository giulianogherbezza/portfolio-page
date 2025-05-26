<template>
  <div class="travel-container">
    <h1 class="travel-title">Meine Reisen</h1>
    
    <!-- Tab Navigation -->
    <div class="tab-navigation">
      <button 
        :class="['tab-button', { active: activeTab === 'photos' }]"
        @click="activeTab = 'photos'"
      >
        <span class="tab-icon">📸</span>
        <span class="tab-text">Fotos</span>
      </button>
      <button 
        :class="['tab-button', { active: activeTab === 'map' }]"
        @click="activeTab = 'map'"
      >
        <span class="tab-icon">🗺️</span>
        <span class="tab-text">Karte</span>
      </button>
    </div>

    <!-- Content Area -->
    <div class="travel-content">
      <transition name="fade-slide" mode="out-in">
        <!-- Photos Tab -->
        <div v-if="activeTab === 'photos'" key="photos" class="tab-content">
          <div class="photos-header">
            <div class="header-icon">
              <span>📸</span>
            </div>
            <h2>Reisefotos</h2>
            <p class="header-description">Entdecke die schönsten Momente meiner Reisen</p>
          </div>

          <!-- Photo Gallery -->
          <div class="photo-gallery">
            <div 
              v-for="(location, index) in travelLocations" 
              :key="index"
              class="photo-card"
              @click="selectedPhoto = location"
            >
              <div class="photo-image">
                <img :src="location.image" :alt="location.name" />
                <div class="photo-overlay">
                  <span class="photo-location">{{ location.name }}</span>
                  <span class="photo-country">{{ location.country }}</span>
                </div>
              </div>
              <div class="photo-info">
                <h3>{{ location.name }}</h3>
                <p>{{ location.description }}</p>
                <div class="photo-meta">
                  <span class="meta-item">
                    <span class="meta-icon">📅</span>
                    {{ location.date }}
                  </span>
                  <span class="meta-item">
                    <span class="meta-icon">🏷️</span>
                    {{ location.category }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Photo Modal -->
          <div v-if="selectedPhoto" class="photo-modal" @click="selectedPhoto = null">
            <div class="modal-content" @click.stop>
              <button class="modal-close" @click="selectedPhoto = null">✕</button>
              <img :src="selectedPhoto.image" :alt="selectedPhoto.name" />
              <div class="modal-info">
                <h3>{{ selectedPhoto.name }}, {{ selectedPhoto.country }}</h3>
                <p>{{ selectedPhoto.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Tab -->
        <div v-else-if="activeTab === 'map'" key="map" class="tab-content">
          <div class="map-header">
            <div class="header-icon">
              <span>🗺️</span>
            </div>
            <h2>Reisekarte</h2>
            <p class="header-description">Alle besuchten Orte auf einen Blick</p>
          </div>

          <!-- Map Stats -->
          <div class="map-stats">
            <div class="stat-card">
              <span class="stat-number">{{ travelLocations.length }}</span>
              <span class="stat-label">Orte besucht</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ uniqueCountries }}</span>
              <span class="stat-label">Länder erkundet</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ totalDistance }}</span>
              <span class="stat-label">Kilometer gereist</span>
            </div>
          </div>

          <!-- Map Container -->
          <div class="map-wrapper">
            <div id="travel-map" class="leaflet-map"></div>
          </div>

          <!-- Location List -->
          <div class="location-list">
            <h3>Besuchte Orte</h3>
            <div class="location-grid">
              <div 
                v-for="(location, index) in travelLocations" 
                :key="index"
                class="location-item"
                @click="flyToLocation(location)"
              >
                <div class="location-flag">{{ location.flag }}</div>
                <div class="location-details">
                  <h4>{{ location.name }}</h4>
                  <p>{{ location.country }}</p>
                </div>
                <div class="location-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// State
const activeTab = ref('photos');
const selectedPhoto = ref(null);
let map = null;

// Travel data
const travelLocations = ref([
  {
    name: "Zürich",
    country: "Schweiz",
    flag: "🇨🇭",
    coordinates: [47.3769, 8.5417],
    description: "Meine wunderschöne Heimatstadt am Zürichsee",
    image: "/api/placeholder/400/300",
    date: "Immer",
    category: "Heimat"
  },
  {
    name: "Paris",
    country: "Frankreich",
    flag: "🇫🇷",
    coordinates: [48.8566, 2.3522],
    description: "Die Stadt der Liebe mit dem beeindruckenden Eiffelturm",
    image: "/api/placeholder/400/300",
    date: "Juni 2023",
    category: "Städtereise"
  },
  {
    name: "Barcelona",
    country: "Spanien",
    flag: "🇪🇸",
    coordinates: [41.3851, 2.1734],
    description: "Gaudís Meisterwerke und mediterrane Lebensfreude",
    image: "/api/placeholder/400/300",
    date: "August 2023",
    category: "Städtereise"
  },
  {
    name: "Reykjavik",
    country: "Island",
    flag: "🇮🇸",
    coordinates: [64.1466, -21.9426],
    description: "Nordlichter und atemberaubende Naturwunder",
    image: "/api/placeholder/400/300",
    date: "Dezember 2023",
    category: "Abenteuer"
  },
  {
    name: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    coordinates: [35.6762, 139.6503],
    description: "Moderne trifft Tradition in dieser faszinierenden Metropole",
    image: "/api/placeholder/400/300",
    date: "März 2024",
    category: "Kultur"
  },
  {
    name: "New York",
    country: "USA",
    flag: "🇺🇸",
    coordinates: [40.7128, -74.0060],
    description: "Die Stadt, die niemals schläft",
    image: "/api/placeholder/400/300",
    date: "September 2024",
    category: "Städtereise"
  }
]);

// Computed
const uniqueCountries = computed(() => {
  return new Set(travelLocations.value.map(loc => loc.country)).size;
});

const totalDistance = computed(() => {
  // Simplified calculation
  return "42.000+";
});

// Methods
const initMap = async () => {
  await nextTick();
  
  if (map) {
    map.remove();
  }

  const mapElement = document.getElementById("travel-map");
  if (!mapElement) return;

  map = L.map("travel-map").setView([46.8182, 8.2275], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Add markers
  travelLocations.value.forEach((location) => {
    const marker = L.marker(location.coordinates)
      .bindPopup(
        `<div class="popup-content">
          <h3>${location.name}</h3>
          <p>${location.country}</p>
          <p class="popup-description">${location.description}</p>
        </div>`
      )
      .addTo(map);
  });

  // Connect locations with lines
  const coordinates = travelLocations.value.map(loc => loc.coordinates);
  L.polyline(coordinates, {
    color: '#42b883',
    weight: 2,
    opacity: 0.5,
    dashArray: '10, 10'
  }).addTo(map);

  setTimeout(() => {
    map.invalidateSize();
  }, 100);
};

const flyToLocation = (location) => {
  if (map) {
    map.flyTo(location.coordinates, 10, {
      animate: true,
      duration: 1.5
    });
  }
};

// Watchers
watch(activeTab, (newTab) => {
  if (newTab === 'map') {
    setTimeout(initMap, 100);
  }
});

// Lifecycle
onMounted(() => {
  if (activeTab.value === 'map') {
    initMap();
  }
});
</script>

<script>
import { computed } from 'vue';
</script>

<style scoped>
/* Styles kommen im separaten CSS-Artifact */
</style>