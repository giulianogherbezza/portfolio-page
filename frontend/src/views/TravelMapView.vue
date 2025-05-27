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
        <FontAwesomeIcon :icon="faLocationDot" class="tab-icon" />
        <span class="tab-text">Orte</span>
      </button>
    </div>

    <div class="travel-content">
      <transition name="fade" mode="out-in">
        <!-- Photos Tab - BLEIBT GENAU GLEICH -->
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

        <!-- Locations Tab -->
        <div v-else-if="activeTab === 1" key="locations" class="tab-content">
          <div class="locations-header">
            <div class="header-icon">🌍</div>
            <h2>Besuchte Orte</h2>
            <p class="header-description">
              {{ travelLocations.length }} Städte in
              {{ uniqueCountries }} Ländern erkundet
            </p>
          </div>

          <div class="location-stats">
            <div class="stat-card">
              <span class="stat-number">{{ travelLocations.length }}</span>
              <span class="stat-label">Besuchte Orte</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ uniqueCountries }}</span>
              <span class="stat-label">Länder</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">50.000+</span>
              <span class="stat-label">Kilometer gereist</span>
            </div>
          </div>

          <div class="locations-list">
            <div
              class="country-section"
              v-for="country in groupedLocations"
              :key="country.name"
            >
              <h3 class="country-name">
                <span class="country-flag">{{ country.flag }}</span>
                {{ country.name }}
              </h3>
              <div class="cities-grid">
                <div
                  class="city-card"
                  v-for="city in country.cities"
                  :key="city.id"
                >
                  <FontAwesomeIcon :icon="faMapPin" class="city-icon" />
                  <div class="city-info">
                    <h4>{{ city.city }}</h4>
                    <p>{{ city.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Photo Modal - BLEIBT GENAU GLEICH -->
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
import { ref, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCamera,
  faLocationDot,
  faCalendarDays,
  faTimes,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

// Reactive state
const activeTab = ref(0);
const selectedPhoto = ref(null);

// Bilder imports - BLEIBT GENAU GLEICH
import bangkokImg from "@/assets/bangkok.jpeg";
import krabiImg from "@/assets/krabi.jpeg";
import budapestImg from "@/assets/budapest.jpeg";
import genuaImg from "@/assets/genua.jpg";
import kohphiphiImg from "@/assets/kohphiphi.jpeg";
import venedigImg from "@/assets/Venedig.jpeg";

// Photos data - BLEIBT GENAU GLEICH
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

// Alle besuchten Orte
const travelLocations = ref([
  {
    id: 1,
    city: "Zürich",
    country: "Schweiz",
    description: "Die größte Stadt der Schweiz",
  },
  {
    id: 2,
    city: "Genua",
    country: "Italien",
    description: "Historische Hafenstadt in Ligurien",
  },
  {
    id: 3,
    city: "Arenzano",
    country: "Italien",
    description: "Küstenstadt in der italienischen Riviera",
  },
  {
    id: 4,
    city: "Turin",
    country: "Italien",
    description: "Hauptstadt des Piemont",
  },
  {
    id: 5,
    city: "Venedig",
    country: "Italien",
    description: "Stadt der Kanäle und Gondeln",
  },
  { id: 6, city: "Rom", country: "Italien", description: "Die ewige Stadt" },
  {
    id: 7,
    city: "Kalabrien",
    country: "Italien",
    description: "Süditalienische Region am Mittelmeer",
  },
  {
    id: 8,
    city: "Sardinien",
    country: "Italien",
    description: "Traumhafte Mittelmeerinsel",
  },
  {
    id: 9,
    city: "Budapest",
    country: "Ungarn",
    description: "Perle an der Donau",
  },
  {
    id: 10,
    city: "Split",
    country: "Kroatien",
    description: "Historische Stadt an der Adria",
  },
  {
    id: 11,
    city: "Korfu",
    country: "Griechenland",
    description: "Grüne Insel im Ionischen Meer",
  },
  {
    id: 12,
    city: "Kairo",
    country: "Ägypten",
    description: "Stadt der Pyramiden",
  },
  {
    id: 13,
    city: "Tunis",
    country: "Tunesien",
    description: "Hauptstadt Tunesiens",
  },
  {
    id: 14,
    city: "Namur",
    country: "Belgien",
    description: "Stadt an Sambre und Maas",
  },
  {
    id: 15,
    city: "Barcelona",
    country: "Spanien",
    description: "Gaudís Meisterwerke am Mittelmeer",
  },
  {
    id: 16,
    city: "Bangkok",
    country: "Thailand",
    description: "Pulsierende Hauptstadt Thailands",
  },
  {
    id: 17,
    city: "Krabi",
    country: "Thailand",
    description: "Traumstrände und Kalksteinfelsen",
  },
  {
    id: 18,
    city: "Koh Phi Phi",
    country: "Thailand",
    description: "Paradiesische Insel",
  },
  {
    id: 19,
    city: "Phuket",
    country: "Thailand",
    description: "Thailands größte Insel",
  },
  {
    id: 20,
    city: "Istanbul",
    country: "Türkei",
    description: "Wo Europa auf Asien trifft",
  },
  {
    id: 21,
    city: "Berlin",
    country: "Deutschland",
    description: "Deutsche Hauptstadt",
  },
  {
    id: 22,
    city: "Straßburg",
    country: "Frankreich",
    description: "Europäische Hauptstadt",
  },
]);

// Computed properties
const uniqueCountries = computed(() => {
  const countries = new Set(travelLocations.value.map((loc) => loc.country));
  return countries.size;
});

// Gruppiere Orte nach Land
const groupedLocations = computed(() => {
  const grouped = {};

  travelLocations.value.forEach((location) => {
    if (!grouped[location.country]) {
      grouped[location.country] = {
        name: location.country,
        flag: getCountryFlag(location.country),
        cities: [],
      };
    }
    grouped[location.country].cities.push(location);
  });

  // Sortiere Länder alphabetisch
  return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
});

// Methode für Länderflaggen
const getCountryFlag = (country) => {
  const flags = {
    Schweiz: "🇨🇭",
    Italien: "🇮🇹",
    Ungarn: "🇭🇺",
    Kroatien: "🇭🇷",
    Griechenland: "🇬🇷",
    Ägypten: "🇪🇬",
    Tunesien: "🇹🇳",
    Belgien: "🇧🇪",
    Spanien: "🇪🇸",
    Thailand: "🇹🇭",
    Türkei: "🇹🇷",
    Deutschland: "🇩🇪",
    Frankreich: "🇫🇷",
  };
  return flags[country] || "🏳️";
};
</script>
