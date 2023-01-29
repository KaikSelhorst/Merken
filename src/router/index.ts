import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SettingsView from "../views/SettingsView.vue";
import GeneralSettings from "@/views/settings/GeneralSettings.vue";
import AboutSettings from "@/views/settings/AboutSettings.vue";
import ThemeSettings from "@/views/settings/ThemeSettings.vue";

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
    {
      path: "/settings/",
      name: "settings",
      component: SettingsView,
      children: [
        {
          path: "",
          name: "about",
          component: AboutSettings,
        },
        {
          path: "general",
          name: "general",
          component: GeneralSettings,
        },
        {
          path: "theme",
          name: "theme",
          component: ThemeSettings,
        },
      ],
    },
  ],
});

export default router;
