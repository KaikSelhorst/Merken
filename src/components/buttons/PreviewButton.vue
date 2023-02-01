<script lang="ts" setup>
import { ref, onMounted } from "vue";
const preview = ref(false);
const mediaQuery = matchMedia("(max-width:1000px)");
let media = ref();

onMounted(() => {
  mediaQuery.addEventListener(
    "change",
    () => (media.value = mediaQuery.matches)
  );
});

const onClick = () => {
  document.body.classList.toggle("preview-mode");
  preview.value = !preview.value;
};
</script>
<template>
  <div v-if="media">
    <button @click="onClick" v-if="preview">Edit</button>
    <button @click="onClick" v-else>Preview</button>
  </div>
</template>

<style scoped>
button {
  font-size: 1.125rem;
  line-height: 1rem;
}
</style>
