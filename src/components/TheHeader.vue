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
  local.value.push({ id, content: "" });
  setLocal(local.value);
};
const deleteAll = () => {
  const conf = window.confirm("Delete all Workbranch ?");
  if (conf) {
    setLocal([{ id: 0, content: "" }]);
    local.value = getLocal();
    items.value = getWorkspaces();
    updateId();
  }
};
const removeItemLocal = (id: number) => {
  local.value.forEach((work, index) => {
    if (work.id === id) local.value.splice(index, 1);
  });
  setLocal(local.value);
};

const removeWork = (event: MouseEvent) => {
  const work = event.target;
  if (work && work instanceof HTMLElement) {
    const idWork = Number(work.innerHTML);
    const remove = window.confirm(`Do you want to delete Workspace ${idWork}?`);
    if (remove) {
      items.value.splice(items.value.indexOf(idWork), 1);
      removeItemLocal(idWork);
      removeWorkspace();
      updateId();
    }
    if (items.value.length === 0) {
      setLocal([{ id: 0, content: "" }]);
      local.value = getLocal();
      items.value = getWorkspaces();
      updateId();
    }
  }
};

const removeWorkspace = () => {
  const deleteBtn = document.getElementById("delete");
  const workspaces = document.querySelectorAll<HTMLElement>("header nav > a");
  deleteMode.value = !deleteMode.value;
  if (!deleteBtn) return;
  if (workspaces.length && deleteMode.value) {
    deleteBtn.innerHTML = "👍";
    workspaces.forEach((a) => a.addEventListener("click", removeWork));
  } else {
    deleteBtn.innerHTML = "-";
    workspaces.forEach((a) => a.removeEventListener("click", removeWork));
  }
};

const addWorkspace = () => {
  if (items.value.length <= 5) {
    console.log(id);
    items.value.push(id);
    addItemLocal(id);
    updateId();
  }
};
const updateId = () => (id = items.value.slice(-1)[0] + 1);

const getWorkspaces = () => {
  const workItems: number[] = [];
  local.value.forEach((work) => workItems.push(work.id));
  return workItems;
};

const local = ref(getLocal());
const items = ref(getWorkspaces());

let id = items.value.slice(-1)[0] + 1;
let deleteMode = ref(false);
</script>

<template>
  <header :class="['header', { 'delete-mode': deleteMode }]">
    <nav>
      <RouterLink
        :to="{ name: 'workspace', params: { id: item } }"
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </RouterLink>
    </nav>
    <div class="controlers">
      <button @click="removeWorkspace" title="Delete Workspace" id="delete">
        -
      </button>
      <button @click="addWorkspace" title="Add Workspace">+</button>
      <button @click="deleteAll" title="Delete All">🗑️</button>
    </div>
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
.controlers {
  display: flex;
  align-items: center;
}
header :is(a, button) {
  color: rgba(255, 255, 255, 0.87);
}
header.delete-mode a {
  color: #f07178;
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
