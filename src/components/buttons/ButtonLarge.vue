<script setup lang="ts"></script>

<template>
  <button>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  border-radius: 2px;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--jet);
  transition: 0.3s all;
  padding: 8px;
  color: var(--white);
}
button:hover {
  color: var(--white);
  background: var(--mint);
}
</style>
