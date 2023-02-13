<script setup lang="ts">
defineProps({
  title: {
    type: String,
    require: true,
  },
  shortcuts: {
    type: Array,
    require: true,
  },
});
</script>

<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="(shortcut, i) in shortcuts" :key="i">{{ shortcut }}</li>
    </ul>
  </div>
</template>
<style scoped>
div {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

ul li {
  padding: 1px 0.5rem;
  font-weight: 600;
  letter-spacing: -0.01rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-align: center;
  display: inline-block;
  margin: 0.15625rem;
  box-shadow: 0px 0.125rem var(--border-color);
  background: var(--bg-button);
  border-radius: 0.125rem;
}
</style>
