<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { userWorkspaces } from "@/user/workspaces";

import { goTo } from "@/helpers";
import Workbranch from "@/components/WorkBranch.vue";

const getID = () => +router.currentRoute.value.params.id;

const workspaces = userWorkspaces();
const router = useRouter();
const idWork = ref(getID());
const contentWork = ref("");

const getContentByID = () => {
  const content = workspaces.getWorkContent(idWork.value);

  if (content === null) goTo(0);
  else contentWork.value = content;
};

watch(contentWork, () => {
  workspaces.updateWorkContent(idWork.value, contentWork.value);
});
watch(
  () => router.currentRoute.value.params.id,
  () => {
    workspaces.updateWorks();
    idWork.value = getID();
    getContentByID();
  }
);

getContentByID();
</script>

<template>
  <main>
    <Workbranch v-model:content="contentWork" />
  </main>
</template>
