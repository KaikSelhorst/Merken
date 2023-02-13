<script setup lang="ts">
import { computed, ref } from "vue";
import { marked } from "marked";
import hljs from "highlight.js";

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});
const props = defineProps(["content"]);
defineEmits(["update:content"]);

const tranformMarkdown = computed(() => marked.parse(props.content));
const media = window.matchMedia("(max-width:1000px)").matches;
const previewMode = ref(false);
if (!media) previewMode.value = true;
</script>

<template>
  <section>
    <textarea :value="content" @input="
      $emit('update:content', ($event.target as HTMLTextAreaElement).value)
    "></textarea>
    <div v-html="tranformMarkdown" class="markdown-body"></div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  margin-top: 0.75rem;
  min-height: 88vh;
  gap: 0.5rem;
  grid-template-columns: 1fr 1fr;
}

textarea {
  font-size: 1rem;
  background: var(--bg-input);
  resize: none;
  color: var(--font-color);
  outline: none;
}

section>* {
  padding: 0.5rem 0.75rem;
  max-width: 50vw;
  border-radius: 2px;
  border: 1px solid var(--border-color);
}

@media screen and (max-width: 1000px) {
  section {
    grid-template-columns: 1fr;
  }

  section>* {
    grid-area: 1/1;
    max-width: calc(100vw - 16px);
  }

  section>div {
    /* Fix That */
    max-height: 88vh;
    overflow: auto;
    /* --- */
    display: none;
  }

  .preview-mode section>div {
    display: initial;
  }
}
</style>
