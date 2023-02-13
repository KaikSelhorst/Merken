<script setup lang="ts">
defineProps({
  icon: String,
});
</script>

<template>
  <h2>
    <FontAwesome :icon="icon" v-if="icon" />
    <span>
      <slot></slot>
    </span>
  </h2>
</template>
<style scoped>
h2 svg {
  margin-right: 0.5rem;
}

h2 {
  color: var(--heading-color);
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
}
</style>
