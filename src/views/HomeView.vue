<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import type { Workspace } from "env";

import Workbranch from "@/components/WorkBranch.vue";

const getID = () => +router.currentRoute.value.params.id;
const getLocal = (): Array<Workspace> | undefined => {
  const local = localStorage.getItem("workspaces");
  if (local) return JSON.parse(local);
};

const router = useRouter();
const idWork = ref(getID());
const contentWork = ref("");
const localWorkspace = ref(getLocal());

const setLocal = (local: unknown) => {
  localStorage.setItem("workspaces", JSON.stringify(local));
};

const getContentByID = () => {
  if (localWorkspace.value) {
    localWorkspace.value.forEach((work) => {
      if (work.id === idWork.value) contentWork.value = work.content;
    });
  } else router.push("/workspace/0");
};

const updateContent = () => {
  if (localWorkspace.value) {
    localWorkspace.value.forEach((work) => {
      if (work.id === idWork.value) work.content = contentWork.value;
    });
  }
  setLocal(localWorkspace.value);
};

watch(contentWork, () => updateContent());
onBeforeRouteUpdate((to) => {
  localWorkspace.value = getLocal();
  idWork.value = +to.params.id;
  getContentByID();
});
getContentByID();
</script>

<template>
  <main>
    <Workbranch v-model:content="contentWork" />
  </main>
</template>
