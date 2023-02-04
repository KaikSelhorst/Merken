<script setup lang="ts">
import { setLocal } from "@/helpers";
import { userStore } from "@/store/store";
const store = userStore();

const onClick = () => {
  const confirm = window.confirm("Do you want delete all workspaces?");
  if (confirm) {
    setLocal("workspaces", [{ id: 0, content: "" }]);
    store.updateWorks();
  }
};
</script>

<template>
  <button @click="onClick">Delete All Works</button>
</template>
<style scoped>
button {
  background: var(--orange-crayola);
  padding: 8px 16px;
  display: block;
  color: var(--white);
  font-weight: 500;
  border-radius: 2px;
}
</style>
