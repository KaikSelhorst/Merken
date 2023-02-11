<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userWorkspaces } from "@/user/workspaces";

import emitter from "@/emitter";
import { goTo } from "@/helpers";

import PreviewButton from "./buttons/PreviewButton.vue";
import SettingsButton from "./buttons/SettingsButton.vue";
import WorkItemMenuVue from "./WorkItemMenu.vue";

// Disable Keybinds of navigator
document.onkeydown = function (e: KeyboardEvent) {
  if ("123456".indexOf(e.key) != -1 && e.ctrlKey) {
    e.preventDefault();
    e.stopPropagation();
  }
};
// Enable application shortscut
document.onkeyup = function (event: KeyboardEvent) {
  event.preventDefault();
  const e = event || window.event;
  if (e.ctrlKey && e.altKey && e.code == "KeyT") {
    eventAdd();
    return false;
  }
  if (e.ctrlKey && e.altKey && e.code == "KeyD") {
    deleteMode.value = true;
    removeWork(+router.currentRoute.value.params.id);
    deleteMode.value = false;
    return false;
  }
  if (e.ctrlKey && "123456".indexOf(e.key) !== -1) {
    const work = workspaces.worksID.value[+e.key - 1];
    if (work || work == 0) goTo(work);
    return false;
  }
};

const removeWork = (idWork: number) => {
  if (!deleteMode.value) return false;
  workspaces.updateWorks();
  const isEmpty = !workspaces.works.value.filter(({ id }) => id === idWork)[0]
    .content;
  let confirmed;
  if (!isEmpty) {
    confirmed = window.confirm(`Do you want to delete Workspace ${idWork}?`);
  }
  if (isEmpty || confirmed) {
    workspaces.removeWork(idWork);
    id = updateID();
  }
  if (workspaces.worksID.value.length === 0) return updateAllConf();
  if (+router.currentRoute.value.params.id === idWork) goTo(id - 1);
};

const updateAllConf = () => {
  workspaces.addWork(1);
  id = updateID();
};

const eventAdd = () => {
  if (workspaces.worksID.value.length < 5) {
    workspaces.updateWorks();
    workspaces.addWork(id);
    goTo(id);
    id = updateID();
  }
};

const updateID = () => workspaces.worksID.value.at(-1)! + 1;
const workspaces = userWorkspaces();
let id = updateID();
const router = useRouter();
const deleteMode = ref(false);
emitter.on("UPDATE_ALL", () => {
  workspaces.resetWorks();
  id = updateID();
});
emitter.on("HAS_NEW_ID_WITH_CONTENT", () => {
  workspaces.updateWorks();
  workspaces.updateHasContents();
});
</script>

<template>
  <header :class="['header', { 'delete-mode': deleteMode }]">
    <nav>
      <WorkItemMenuVue
        v-for="id in workspaces.worksID.value"
        :key="id"
        :to="{ name: 'workspace', params: { id } }"
        :content="id"
        :class="{ hasContent: workspaces.workHasContent.value.includes(id) }"
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
  padding: 0px 8px;
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
header.delete-mode a {
  color: var(--alert);
}
nav {
  gap: 4px;
  display: flex;
}
button {
  padding: 0px 2px;

  transition: 0.3s all;
  font-size: 1.125rem;
  line-height: 1rem;
}
button + button {
  margin-left: 4px;
}
button:hover {
  color: var(--primary);
}
</style>
