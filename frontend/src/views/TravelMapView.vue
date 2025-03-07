<template>
  <div class="map-container">
    <h1>Meine Reisen</h1>

    <!-- Swipe Bereich -->
    <swiper
      class="travel-swiper"
      :slides-per-view="1"
      :space-between="20"
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="(item, index) in travelItems" :key="index">
        <div class="travel-card">
          <div class="travel-text">
            <h2>{{ item.title }}</h2>
            <p>{{ item.text }}</p>
          </div>
          <div class="travel-image">
            <img :src="item.image" :alt="item.title" />
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Leaflet Karte jetzt ganz unten -->
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SwiperCore from "swiper";

SwiperCore.use([Pagination]);

import Bild1 from "@/assets/Beispiel-Bild.jpg";
import Bild2 from "@/assets/Beispiel-Bild.jpg";
import Bild3 from "@/assets/Beispiel-Bild.jpg";
import Bild4 from "@/assets/Beispiel-Bild.jpg";
import Bild5 from "@/assets/Beispiel-Bild.jpg";
import Bild6 from "@/assets/Beispiel-Bild.jpg";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Swiper Pagination aktivieren
SwiperCore.use([Pagination]);

// Reiseberichte (Platzhalter)
const travelItems = ref([
  {
    title: "Italien – Rom",
    text: "Entdecke die historischen Straßen Roms und erlebe das Kolosseum hautnah.",
    image: Bild1,
  },
  {
    title: "Frankreich – Marseille",
    text: "Genieße das mediterrane Flair und probiere die beste Bouillabaisse.",
    image: Bild2,
  },
  {
    title: "Deutschland – Berlin",
    text: "Tauche ein in die Geschichte und das Nachtleben der Hauptstadt.",
    image: Bild3,
  },
  {
    title: "Thailand – Bangkok",
    text: "Erkunde die pulsierende Metropole mit ihren beeindruckenden Tempeln.",
    image: Bild4,
  },
  {
    title: "Ägypten – Hurghada",
    text: "Erlebe traumhafte Strände und faszinierende Unterwasserwelten.",
    image: Bild5,
  },
  {
    title: "England – London",
    text: "Von Big Ben bis zur Tower Bridge – entdecke Londons Highlights.",
    image: Bild6,
  },
]);

onMounted(() => {
  // Leaflet-Karte initialisieren
  const map = L.map("map").setView([20, 10], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Marker-Standorte
  const locations = [
    { name: "Udine", coords: [46.0656, 13.2356] },
    { name: "Rom", coords: [41.9028, 12.4964] },
    { name: "Lecce", coords: [40.3523, 18.1778] },
    { name: "Sardinien", coords: [40.1209, 9.0129] },
    { name: "Genua", coords: [44.4056, 8.9463] },
    { name: "Pisa", coords: [43.7228, 10.4017] },
    { name: "Modena", coords: [44.6471, 10.9252] },
    { name: "Arenzano", coords: [44.4084, 8.6814] },
    { name: "Marseille", coords: [43.2965, 5.3698] },
    { name: "Strasbourg", coords: [48.5734, 7.7521] },
    { name: "Weil am Rhein", coords: [47.5945, 7.6208] },
    { name: "Berlin", coords: [52.52, 13.405] },
    { name: "Köln", coords: [50.9375, 6.9603] },
    { name: "Namur", coords: [50.4674, 4.8719] },
    { name: "London", coords: [51.5074, -0.1278] },
    { name: "Bangkok", coords: [13.7563, 100.5018] },
    { name: "Krabi", coords: [8.0863, 98.9063] },
    { name: "Koh Yao Yai", coords: [7.9489, 98.5833] },
    { name: "Koh Phi Phi", coords: [7.744, 98.7784] },
    { name: "Phuket", coords: [7.8804, 98.3923] },
    { name: "Mumbai", coords: [19.076, 72.8777] },
    { name: "Antalya", coords: [36.8969, 30.7133] },
    { name: "Tunis", coords: [36.8065, 10.1815] },
    { name: "Djerba", coords: [33.8116, 10.8553] },
    { name: "Sousse", coords: [35.8254, 10.6361] },
    { name: "Hurghada", coords: [27.2579, 33.8116] },
    { name: "Barcelona", coords: [41.3851, 2.1734] },
    { name: "Rijeka", coords: [45.3271, 14.4422] },
    { name: "Korfu", coords: [39.6243, 19.9217] },
    { name: "Budapest", coords: [47.4979, 19.0402] },
    { name: "Tirol", coords: [47.2537, 11.6011] },
  ];

  // Marker auf der Karte platzieren
  locations.forEach((location) => {
    L.marker(location.coords)
      .addTo(map)
      .bindPopup(`<b>${location.name}</b>`)
      .openPopup();
  });
});
</script>
