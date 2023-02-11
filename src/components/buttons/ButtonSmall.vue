<script setup lang="ts"></script>

<template>
  <button>
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  max-width: 40px;
  border-radius: 2px;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--bg-button);
  transition: 0.3s all;
  padding: 8px;
  color: var(--heading-color);
}
button:hover {
  background: var(--primary);
}
</style>
