<script setup lang="ts">
import emitter from "@/emitter";

const onClick = () => {
  const confirm = window.confirm("Do you want delete all workspaces?");
  if (confirm) emitter.emit("UPDATE_ALL");
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
