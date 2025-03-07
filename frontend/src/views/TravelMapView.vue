<template>
  <div class="map-container">
    <h1>Meine Reisen</h1>

    <!-- Reiseberichte -->
    <div class="travel-cards">
      <div
        class="travel-card"
        v-for="n in 6"
        :key="n"
        :class="{ reverse: n % 2 === 0 }"
      >
        <div class="travel-text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
        <div class="travel-image">
          <img src="@/assets/Beispiel-Bild.jpg" alt="Reisebild" />
        </div>
      </div>
    </div>

    <!-- Leaflet Karte jetzt ganz unten -->
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

onMounted(() => {
  // Karte initialisieren
  const map = L.map("map").setView([20, 10], 2); // Weltkarte als Startansicht
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Orte, die auf der Karte markiert werden
  const locations = [
    // Italien
    { name: "Udine", coords: [46.0656, 13.2356] },
    { name: "Rom", coords: [41.9028, 12.4964] },
    { name: "Lecce", coords: [40.3523, 18.1778] },
    { name: "Sardinien", coords: [40.1209, 9.0129] },
    { name: "Genua", coords: [44.4056, 8.9463] },
    { name: "Pisa", coords: [43.7228, 10.4017] },
    { name: "Modena", coords: [44.6471, 10.9252] },
    { name: "Arenzano", coords: [44.4084, 8.6814] },

    // Frankreich
    { name: "Marseille", coords: [43.2965, 5.3698] },
    { name: "Strasbourg", coords: [48.5734, 7.7521] },

    // Deutschland
    { name: "Weil am Rhein", coords: [47.5945, 7.6208] },
    { name: "Berlin", coords: [52.52, 13.405] },
    { name: "Köln", coords: [50.9375, 6.9603] },

    // Belgien
    { name: "Namur", coords: [50.4674, 4.8719] },

    // England
    { name: "London", coords: [51.5074, -0.1278] },

    // Thailand
    { name: "Bangkok", coords: [13.7563, 100.5018] },
    { name: "Krabi", coords: [8.0863, 98.9063] },
    { name: "Koh Yao Yai", coords: [7.9489, 98.5833] },
    { name: "Koh Phi Phi", coords: [7.744, 98.7784] },
    { name: "Phuket", coords: [7.8804, 98.3923] },

    // Indien
    { name: "Mumbai", coords: [19.076, 72.8777] },

    // Türkei
    { name: "Antalya", coords: [36.8969, 30.7133] },

    // Tunesien
    { name: "Tunis", coords: [36.8065, 10.1815] },
    { name: "Djerba", coords: [33.8116, 10.8553] },
    { name: "Sousse", coords: [35.8254, 10.6361] },

    // Ägypten
    { name: "Hurghada", coords: [27.2579, 33.8116] },

    // Spanien
    { name: "Barcelona", coords: [41.3851, 2.1734] },

    // Kroatien
    { name: "Rijeka", coords: [45.3271, 14.4422] },

    // Griechenland
    { name: "Korfu", coords: [39.6243, 19.9217] },

    // Ungarn
    { name: "Budapest", coords: [47.4979, 19.0402] },

    // Österreich
    { name: "Tirol", coords: [47.2537, 11.6011] },
  ];

  // Marker auf die Karte setzen
  locations.forEach((location) => {
    L.marker(location.coords)
      .addTo(map)
      .bindPopup(`<b>${location.name}</b>`)
      .openPopup();
  });
});
</script>
