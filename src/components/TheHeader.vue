<script setup lang="ts">
import { ref } from "vue";
import { userWorkspaces } from "@/store/workspaces";

import { goTo } from "@/helpers";

import PreviewButton from "./buttons/PreviewButton.vue";
import SettingsButton from "./buttons/SettingsButton.vue";
import WorkItemMenuVue from "./WorkItemMenu.vue";

const removeWork = (idWork: number) => {
  if (!deleteMode.value) return false;
  const hasContent = workspaces.worksHasContent.includes(idWork);
  if (!hasContent || confirm(`Do you want to delete Workspace ${idWork}?`)) {
    workspaces.removeWork(idWork);
    goTo(workspaces.worksID.at(-1)!);
  }
};

const eventAdd = () => {
  const id = workspaces.getLastID();
  if (deleteMode.value) deleteMode.value = false;
  if (workspaces.addWork(id)) goTo(id);
};

const workspaces = userWorkspaces();
const deleteMode = ref(false);
</script>

<template>
  <header class="header">
    <nav>
      <WorkItemMenuVue
        v-for="id in workspaces.worksID"
        :key="id"
        :to="{ name: 'workspace', params: { id } }"
        :content="id"
        :class="{ hasContent: workspaces.worksHasContent.includes(id) }"
        @click="removeWork(id)"
        :disabled="deleteMode"
      />
    </nav>
    <div class="controlers">
      <button @click="deleteMode = false" v-if="deleteMode">👍</button>
      <button @click="deleteMode = true" v-else>-</button>
      <button @click="eventAdd">+</button>
      <PreviewButton />
      <SettingsButton />
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 0px 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 2px;
}

.controlers {
  display: flex;
  align-items: center;
}

header :is(a, button) {
  color: var(--font-color);
}

a[disabled="true"] {
  color: var(--alert);
}

nav {
  gap: 0.25rem;
  display: flex;
}

button {
  padding: 0px 0.125rem;

  transition: 0.3s all;
  font-size: 1.125rem;
  line-height: 1rem;
}

button + button {
  margin-left: 0.25rem;
}

button:hover {
  color: var(--primary);
}
</style>
