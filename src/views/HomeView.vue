<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getLocal, setLocal, goTo } from "@/helpers";
import Workbranch from "@/components/WorkBranch.vue";

const getID = () => +router.currentRoute.value.params.id;

const router = useRouter();
const idWork = ref(getID());
const contentWork = ref("");
const localWorkspace = ref(getLocal());

const getContentByID = () => {
  if (localWorkspace.value) {
    let exist = false;
    localWorkspace.value.forEach((work) => {
      if (work.id === idWork.value) {
        contentWork.value = work.content;
        exist = true;
      }
    });
    if (!exist) goTo(0);
  }
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
watch(
  () => router.currentRoute.value.params.id,
  () => {
    localWorkspace.value = getLocal();

    idWork.value = +router.currentRoute.value.params.id;
    console.log(idWork.value);
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
