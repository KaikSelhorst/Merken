<script setup lang="ts">
import { ref, watch } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import type { Workspace } from "env";

import MarkdownInput from "./MarkdownInput.vue";
import MarkdownOutput from "./MarkdownOutput.vue";

const router = useRouter();
const activeRoute = ref(Number(router.currentRoute.value.params.id));
const workContent = ref("");

const getLocal = (): Array<Workspace> | undefined => {
  const local = localStorage.getItem("workspaces");
  if (local) return JSON.parse(local);
};

const getContentByID = (id: number) => {
  const local = getLocal();
  if (local) {
    const content = local.filter((el) => (el.id === id ? true : false))[0];
    if (content) workContent.value = content.content;
    else router.push("/workspace/0");
  }
};

const updateContent = (id: number, content: string) => {
  const local = getLocal();
  if (local) {
    local.forEach((el) => (el.id === id ? (el.content = content) : null));
  }
  localStorage.setItem("workspaces", JSON.stringify(local));
};

watch(workContent, () => updateContent(activeRoute.value, workContent.value));

onBeforeRouteUpdate((to) => {
  activeRoute.value = Number(to.params.id);
  getContentByID(activeRoute.value);
});

getContentByID(activeRoute.value);
</script>

<template>
  <section>
    <MarkdownInput v-model:content="workContent" />
    <MarkdownOutput :content="workContent" />
  </section>
</template>

<style scoped>
section {
  display: grid;
  margin-top: 12px;
  min-height: 88vh;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
}
</style>
