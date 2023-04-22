<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import { useShortcuts } from "./user/shortcuts";
import { RouterView } from "vue-router";

const getInitialLocal = () => {
  const local = localStorage.getItem("workspaces");
  if (!local)
    localStorage.setItem(
      "workspaces",
      JSON.stringify([{ id: 1, content: "" }])
    );
};

getInitialLocal();
useShortcuts();
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped></style>
