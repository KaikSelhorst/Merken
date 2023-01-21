<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import type { Workspace } from "env";

const setLocal = (value: any) => {
  localStorage.setItem("workspaces", JSON.stringify(value));
};

const getLocal = (): Array<Workspace> => {
  const local = localStorage.getItem("workspaces");
  if (local === null) {
    setLocal([{ id: 0, content: "" }]);
    return JSON.parse(localStorage.getItem("workspaces")!);
  } else return JSON.parse(local);
};

const addItemLocal = (id: number) => {
  const local = getLocal();
  local.push({ id, content: "" });
  setLocal(local);
};

const addWorkspace = () => {
  if (id <= 5) {
    items.value.push(id);
    addItemLocal(id);
    id++;
  }
};

const getWorkspaces = () => {
  const arrItems: number[] = [];
  getLocal().forEach((item) => arrItems.push(item.id));
  return arrItems;
};

const items = ref(getWorkspaces());
let id = items.value.length;
</script>

<template>
  <header>
    <nav>
      <RouterLink
        :to="{ name: 'workspace', params: { id: item } }"
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </RouterLink>
    </nav>
    <button @click="addWorkspace">+</button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  padding: 4px 12px;
  justify-content: space-between;
  border: 1px solid rgba(84, 84, 84, 0.48);
  border-radius: 2px;
}
header :is(a, button) {
  color: rgba(255, 255, 255, 0.87);
}
a {
  font-size: 1.125rem;
  padding: 4px;
}
a + a {
  margin-left: 4px;
}
button {
  font-size: 1.125rem;
  line-height: 1rem;
}
button:hover {
  color: #42b883;
}
</style>
