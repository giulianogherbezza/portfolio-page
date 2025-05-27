import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Mini-Games",
    component: () => import("../views/MiniGamesView.vue"),
  },
  {
    path: "/resume",
    name: "Resume",
    component: () => import("../views/ResumeView.vue"),
  },
  {
    path: "/travel-map",
    name: "TravelMap",
    component: () => import("../views/TravelMapView.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/ContactView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
