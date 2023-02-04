<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { goTo } from "@/helpers";
import { userStore } from "@/store/store";
import Workbranch from "@/components/WorkBranch.vue";

const store = userStore();
const getID = () => +router.currentRoute.value.params.id;

const router = useRouter();
const idWork = ref(getID());
const contentWork = ref("");

const getContentByID = () => {
  const content = store.getWorkContent(idWork.value);
  if (content === null) goTo(0);
  else contentWork.value = content;
};

watch(contentWork, () =>
  store.updateWorkContent(idWork.value, contentWork.value)
);

watch(
  () => router.currentRoute.value.params.id,
  () => {
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
