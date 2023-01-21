import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/workspace/0",
    },
    {
      path: "/workspace/:id",
      name: "workspace",
      component: HomeView,
    },
  ],
});

export default router;
