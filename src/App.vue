<script setup lang="ts">
import TheHeader from "./components/TheHeader.vue";
import { RouterView } from "vue-router";

const getInitialLocal = () => {
  const local = localStorage.getItem("workspaces");
  if (!local)
    localStorage.setItem(
      "workspaces",
      JSON.stringify([{ id: 0, content: "" }])
    );
};

getInitialLocal();
</script>

<template>
  <TheHeader />
  <RouterView />
</template>

<style scoped></style>
