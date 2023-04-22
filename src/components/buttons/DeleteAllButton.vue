<script setup lang="ts">
import { userWorkspaces } from "@/store/workspaces";

const onClick = () => {
  const confirm = window.confirm("Do you want delete all workspaces?");
  const workspaces = userWorkspaces();
  if (confirm) workspaces.resetWorks();
};
</script>

<template>
  <button @click="onClick">Delete All Works</button>
</template>
<style scoped>
button {
  background: var(--alert);
  padding: 0.5rem 1rem;
  display: block;
  color: var(--button-color);
  font-weight: 500;
  border-radius: 2px;
}
</style>
