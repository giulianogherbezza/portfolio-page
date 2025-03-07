import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "About",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/hobbys",
    name: "Hobbys",
    component: () => import("../views/MyHobbysView.vue"),
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
