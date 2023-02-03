<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

import emitter from "@/emitter";

import type { Workspace } from "env";
import { getLocal, setLocal, goTo } from "@/helpers";

import PreviewButton from "./buttons/PreviewButton.vue";
import SettingsButton from "./buttons/SettingsButton.vue";

document.onkeyup = function (event: KeyboardEvent) {
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
};

const removeWorkLocal = (id: number) => {
  local.value.forEach((work, index) => {
    if (work.id === id) local.value.splice(index, 1);
  });
  setLocal("workspaces", local.value);
};

const removeWork = (idWork: number) => {
  if (!deleteMode.value) return false;
  local.value = getLocal<Workspace[]>("workspaces");
  if (window.confirm(`Do you want to delete Workspace ${idWork}?`)) {
    items.value.splice(items.value.indexOf(idWork), 1);
    removeWorkLocal(idWork);
    id = updateID();
  }
  if (items.value.length === 0) return updateAllConf();
  if (+router.currentRoute.value.params.id === idWork) goTo(id - 1);
};

const addWorkInLocal = (id: number) => {
  local.value = getLocal<Workspace[]>("workspaces");
  local.value.push({ id, content: "" });
  setLocal("workspaces", local.value);
};

const updateAllConf = () => {
  setLocal("workspaces", [{ id: 0, content: "" }]);
  local.value = getLocal<Workspace[]>("workspaces");
  items.value = getWorkspacesID();
  id = updateID();
};

const eventAdd = () => {
  if (items.value.length <= 5) {
    items.value.push(id);
    addWorkInLocal(id);
    goTo(id);
    id = updateID();
  }
};

emitter.on("UPDATE_ALL", updateAllConf);
const local = ref(getLocal<Workspace[]>("workspaces"));
const updateID = () => items.value.slice(-1)[0] + 1;
const getWorkspacesID = () => local.value.map(({ id }) => id);
const items = ref(getWorkspacesID());
let id = updateID();
const router = useRouter();
let deleteMode = ref(false);
</script>

<template>
  <header :class="['header', { 'delete-mode': deleteMode }]">
    <nav>
      <RouterLink
        :to="{ name: 'workspace', params: { id: item } }"
        v-for="item in items"
        :key="item"
        @click="removeWork(item)"
      >
        {{ item }}
      </RouterLink>
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
  padding: 4px 12px;
  justify-content: space-between;
  border: 1px solid var(--davys-gray);
  border-radius: 2px;
}
.controlers {
  display: flex;
  align-items: center;
}
header :is(a, button) {
  color: var(--white);
}
header.delete-mode a {
  color: var(--orange-crayola);
}
a {
  font-size: 1.125rem;
  padding: 4px;
}
a + a {
  margin-left: 4px;
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
  color: var(--mint);
}
</style>
