<script setup lang="ts">
import { getLocal, setLocal, goTo } from "@/helpers";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const removeAllWorks = () => {
  if (window.confirm("Delete all Workbranch ?")) updateAllConf();
};

const removeWorkLocal = (id: number) => {
  local.value.forEach((work, index) => {
    if (work.id === id) local.value.splice(index, 1);
  });
  setLocal(local.value);
};

const removeWork = (event: MouseEvent) => {
  const work = event.target;
  if (work && work instanceof HTMLElement) {
    local.value = getLocal();
    const idWork = Number(work.innerHTML);
    if (window.confirm(`Do you want to delete Workspace ${idWork}?`)) {
      items.value.splice(items.value.indexOf(idWork), 1);
      removeWorkLocal(idWork);
      eventRemove();
      id = updateID();
    }
    if (items.value.length === 0) return updateAllConf();
    if (+router.currentRoute.value.params.id === idWork) goTo(id - 1);
  }
};

const eventRemove = () => {
  const workspaces = document.querySelectorAll<HTMLElement>("header nav > a");
  deleteMode.value = !deleteMode.value;
  if (workspaces.length && deleteMode.value) {
    workspaces.forEach((a) => a.addEventListener("click", removeWork));
  } else {
    workspaces.forEach((a) => a.removeEventListener("click", removeWork));
  }
};

const addWorkInLocal = (id: number) => {
  local.value = getLocal();
  local.value.push({ id, content: "" });
  setLocal(local.value);
};

const updateAllConf = () => {
  setLocal([{ id: 0, content: "" }]);
  local.value = getLocal();
  items.value = getWorkspacesID();
  id = updateID();
  goTo(0);
};

const eventAdd = () => {
  if (items.value.length <= 5) {
    items.value.push(id);
    addWorkInLocal(id);
    goTo(id);
    id = updateID();
  }
};

const updateID = () => items.value.slice(-1)[0] + 1;
const getWorkspacesID = () => local.value.map(({ id }) => id);

const local = ref(getLocal());
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
      >
        {{ item }}
      </RouterLink>
    </nav>
    <div class="controlers">
      <button @click="eventRemove" v-if="deleteMode">👍</button>
      <button @click="eventRemove" v-else>-</button>
      <button @click="eventAdd">+</button>
      <button @click="removeAllWorks">🗑️</button>
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
