import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("../views/HomeView.vue") },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/resume",
    name: "Resume",
    component: () => import("../views/ResumeView.vue"),
  },
  {
    path: "/travels",
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
