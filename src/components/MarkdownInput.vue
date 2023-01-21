<script setup lang="ts">
defineProps(["content"]);
defineEmits(["update:content"]);
</script>

<template>
  <textarea
    :value="content"
    @input="
      $emit('update:content', ($event.target as HTMLTextAreaElement).value)
    "
  >
  </textarea>
</template>

<style scoped>
textarea {
  border: 1px solid rgba(84, 84, 84, 0.48);
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 2px;
  background: #2f2f2f;
  resize: none;
  color: rgba(255, 255, 255, 0.87);
  outline: none;
}
</style>
