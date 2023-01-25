// Composables
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieDetails from "@/views/MovieDetails.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/movie-details",
    name: "details",
    component: MovieDetails,
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
