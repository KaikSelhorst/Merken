<script setup lang="ts">
defineProps({
  icon: String,
});
</script>

<template>
  <h2>
    <FontAwesome :icon="icon" />
    <span>
      <slot></slot>
    </span>
  </h2>
</template>
<style scoped>
h2 span {
  margin-left: 8px;
}
h2 {
  margin-top: 32px;
  font-size: 1.125rem;
  line-height: 1.5rem;
}
</style>
