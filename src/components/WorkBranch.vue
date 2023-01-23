<script setup lang="ts">
import { computed } from "vue";
import { marked } from "marked";

const props = defineProps(["content"]);
defineEmits(["update:content"]);

const tranformMarkdown = computed(() => marked.parse(props.content));
</script>

<template>
  <section>
    <textarea
      :value="content"
      @input="
        $emit('update:content', ($event.target as HTMLTextAreaElement).value)
      "
    ></textarea>
    <div v-html="tranformMarkdown" class="markdown-body"></div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  margin-top: 12px;
  min-height: 88vh;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
}

textarea {
  font-size: 1rem;
  background: #2f2f2f;
  resize: none;
  color: rgba(255, 255, 255, 0.87);
  outline: none;
}

section > * {
  padding: 8px 12px;
  max-width: calc(50vw - 24px);
  border-radius: 2px;
  border: 1px solid rgba(84, 84, 84, 0.48);
}
</style>
