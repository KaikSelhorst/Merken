<script setup lang="ts">
import { ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import type { Workspace } from "env";

const router = useRouter();
const activeRoute = ref(router.currentRoute.value.params.id);
const workContent = ref("");

const getLocal = (): Array<Workspace> | undefined => {
  const local = localStorage.getItem("workspaces");
  if (local) return JSON.parse(local);
};

const getContentByID = (id: unknown) => {
  const local = getLocal();
  if (local && typeof id === "string" && !isNaN(Number(id))) {
    const content = local.filter((el) => (el.id === Number(id) ? true : false));
    if (content.length) workContent.value = content[0].content;
    else router.push("/workspace/0");
  }
};

onBeforeRouteUpdate((to) => {
  activeRoute.value = to.params.id;
  getContentByID(activeRoute.value);
});

getContentByID(activeRoute.value);
</script>

<template>
  <section>Rota id: {{ activeRoute }}{{ workContent }}</section>
</template>

<style scoped>
section {
  color: white;
}
</style>
