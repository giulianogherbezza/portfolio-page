<template>
  <div class="travel-container">
    <h1 class="travel-title">Meine Reisen</h1>

    <div class="tab-navigation">
      <button
        @click="activeTab = 0"
        :class="['tab-button', { active: activeTab === 0 }]"
      >
        <FontAwesomeIcon :icon="faCamera" class="tab-icon" />
        <span class="tab-text">Fotos</span>
      </button>
      <button
        @click="activeTab = 1"
        :class="['tab-button', { active: activeTab === 1 }]"
      >
        <FontAwesomeIcon :icon="faMap" class="tab-icon" />
        <span class="tab-text">Karte</span>
      </button>
    </div>

    <div class="travel-content">
      <transition name="fade" mode="out-in">
        <!-- Photos Tab -->
        <div v-if="activeTab === 0" key="photos" class="tab-content">
          <div class="photos-header">
            <div class="header-icon">📸</div>
            <h2>Meine Reisefotos</h2>
            <p class="header-description">
              Erinnerungen aus {{ photos.length }} wundervollen Orten
            </p>
          </div>

          <div class="photo-gallery">
            <div
              v-for="photo in photos"
              :key="photo.id"
              @click="selectedPhoto = photo"
              class="photo-card"
            >
              <div class="photo-image">
                <img :src="photo.imageUrl" :alt="photo.location" />
                <div class="photo-overlay">
                  <span class="photo-location">{{ photo.location }}</span>
                  <span class="photo-country">{{ photo.country }}</span>
                </div>
              </div>
              <div class="photo-info">
                <h3>{{ photo.location }}</h3>
                <p>{{ photo.description }}</p>
                <div class="photo-meta">
                  <span class="meta-item">
                    <FontAwesomeIcon :icon="faCalendarDays" class="meta-icon" />
                    {{ photo.date }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Tab -->
        <div v-else-if="activeTab === 1" key="map" class="tab-content">
          <div class="map-header">
            <div class="header-icon">🗺️</div>
            <h2>Meine Reisekarte</h2>
            <p class="header-description">
              Entdecke alle Orte, die ich besucht habe
            </p>
          </div>

          <div class="map-stats">
            <div class="stat-card">
              <span class="stat-number">{{ travelLocations.length }}</span>
              <span class="stat-label">Besuchte Orte</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ uniqueCountries }}</span>
              <span class="stat-label">Länder</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ totalDistance }}</span>
              <span class="stat-label">Kilometer gereist</span>
            </div>
          </div>

          <div class="map-wrapper">
            <div id="travel-map" class="leaflet-map"></div>
          </div>

          <div class="location-list">
            <h3>Besuchte Orte</h3>
            <div class="location-grid">
              <div
                v-for="location in travelLocations"
                :key="location.id"
                @click="focusLocation(location)"
                class="location-item"
              >
                <span class="location-flag">{{
                  getCountryFlag(location.country)
                }}</span>
                <div class="location-details">
                  <h4>{{ location.city }}</h4>
                  <p>{{ location.description }}</p>
                </div>
                <FontAwesomeIcon :icon="faArrowRight" class="location-arrow" />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Photo Modal -->
    <div v-if="selectedPhoto" @click="selectedPhoto = null" class="photo-modal">
      <div class="modal-content" @click.stop>
        <button @click="selectedPhoto = null" class="modal-close">
          <FontAwesomeIcon :icon="faTimes" />
        </button>
        <img :src="selectedPhoto.imageUrl" :alt="selectedPhoto.location" />
        <div class="modal-info">
          <h3>{{ selectedPhoto.location }}, {{ selectedPhoto.country }}</h3>
          <p>{{ selectedPhoto.description }}</p>
          <p class="photo-date">{{ selectedPhoto.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCamera,
  faMap,
  faLocationDot,
  faCalendarDays,
  faArrowRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix für Leaflet Marker Icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Reactive state
const activeTab = ref(0);
const selectedPhoto = ref(null);
let map = null;

import bangkokImg from "@/assets/bangkok.jpeg";
import krabiImg from "@/assets/krabi.jpeg";
import budapestImg from "@/assets/budapest.jpeg";
import genuaImg from "@/assets/genua.jpg";
import kohphiphiImg from "@/assets/kohphiphi.jpeg";
import venedigImg from "@/assets/Venedig.jpeg";

// Photos data mit URL-Pfaden
const photos = ref([
  {
    id: 1,
    location: "Bangkok",
    country: "Thailand 🇹🇭",
    imageUrl: bangkokImg,
    description:
      "Die pulsierende Hauptstadt Thailands - Tempel, Street Food und Varane!",
    date: "Februar 2025",
  },
  {
    id: 2,
    location: "Krabi",
    country: "Thailand 🇹🇭",
    imageUrl: krabiImg,
    description:
      "Begegnung mit einem frechen Affen - der Ort ist voller Überraschungen!",
    date: "Februar 2025",
  },
  {
    id: 3,
    location: "Koh Phi Phi",
    country: "Thailand 🇹🇭",
    imageUrl: kohphiphiImg,
    description:
      "Traumhafte Strände und kristallklares Wasser - ein echtes Paradies.",
    date: "Februar 2025",
  },
  {
    id: 4,
    location: "Genua",
    country: "Italien 🇮🇹",
    imageUrl: genuaImg,
    description: "Die historische Hafenstadt Liguriens - lustige Katzen.",
    date: "Juli 2024",
  },
  {
    id: 5,
    location: "Venedig",
    country: "Italien 🇮🇹",
    imageUrl: venedigImg,
    description:
      "Die berühmte Rialtobrücke - Venedig ist einfach wunderschön mit seinen Kanälen.",
    date: "März 2024",
  },
  {
    id: 6,
    location: "Budapest",
    country: "Ungarn 🇭🇺",
    imageUrl: budapestImg,
    description:
      "Das prächtige Parlamentsgebäude bei Nacht - Budapest zeigt sich von seiner schönsten Seite.",
    date: "November 2024",
  },
]);

// Travel locations for map
const travelLocations = ref([
  {
    id: 1,
    city: "Bangkok",
    country: "Thailand",
    coordinates: [13.7563, 100.5018],
    description: "Pulsierende Hauptstadt mit Tempeln und Street Food",
  },
  {
    id: 2,
    city: "Krabi",
    country: "Thailand",
    coordinates: [8.0863, 98.9063],
    description: "Traumstrände und Kalksteinfelsen",
  },
  {
    id: 3,
    city: "Koh Phi Phi",
    country: "Thailand",
    coordinates: [7.7407, 98.7784],
    description: "Paradiesische Insel mit türkisblauem Wasser",
  },
  {
    id: 4,
    city: "Genua",
    country: "Italien",
    coordinates: [44.4056, 8.9463],
    description: "Historische Hafenstadt in Ligurien",
  },
  {
    id: 5,
    city: "Venedig",
    country: "Italien",
    coordinates: [45.4408, 12.3155],
    description: "Stadt der Kanäle und Gondeln",
  },
  {
    id: 6,
    city: "Budapest",
    country: "Ungarn",
    coordinates: [47.4979, 19.0402],
    description: "Perle an der Donau mit prächtigem Parlament",
  },
]);

// Computed properties
const uniqueCountries = computed(() => {
  const countries = new Set(travelLocations.value.map((loc) => loc.country));
  return countries.size;
});

const totalDistance = computed(() => {
  // Simplified calculation for demo
  return "15.000+";
});

// Methods
const getCountryFlag = (country) => {
  const flags = {
    Thailand: "🇹🇭",
    Italien: "🇮🇹",
    Ungarn: "🇭🇺",
  };
  return flags[country] || "🏳️";
};

const initMap = () => {
  setTimeout(() => {
    if (document.getElementById("travel-map")) {
      map = L.map("travel-map").setView([30, 15], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Add markers for each location
      travelLocations.value.forEach((location) => {
        const marker = L.marker(location.coordinates).addTo(map).bindPopup(`
            <div class="popup-content">
              <h3>${location.city}</h3>
              <p>${location.country}</p>
              <p class="popup-description">${location.description}</p>
            </div>
          `);
      });
    }
  }, 100);
};

const focusLocation = (location) => {
  if (map) {
    map.setView(location.coordinates, 10, {
      animate: true,
      duration: 1,
    });

    // Open the popup for this location
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const markerPos = layer.getLatLng();
        if (
          markerPos.lat === location.coordinates[0] &&
          markerPos.lng === location.coordinates[1]
        ) {
          layer.openPopup();
        }
      }
    });
  }
};

// Lifecycle hooks
onMounted(() => {
  if (activeTab.value === 1) {
    initMap();
  }
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

// Watch for tab changes
import { watch } from "vue";
watch(activeTab, (newTab) => {
  if (newTab === 1 && !map) {
    initMap();
  }
});
</script>

<style scoped>
/* Alle Styles sind bereits in der globalen style.css definiert */
</style>
