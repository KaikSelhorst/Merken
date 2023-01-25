<script setup lang="ts">
import { computed, ref } from "vue";
import { marked } from "marked";

const props = defineProps(["content"]);
defineEmits(["update:content"]);

const tranformMarkdown = computed(() => marked.parse(props.content));
const media = window.matchMedia("(max-width:1000px)").matches;
const previewMode = ref(false);
if (!media) previewMode.value = true;
</script>

<template>
  <section>
    <textarea
      :value="content"
      @input="
        $emit('update:content', ($event.target as HTMLTextAreaElement).value)
      "
    ></textarea>
    <div
      v-html="tranformMarkdown"
      class="markdown-body"
      v-show="previewMode"
    ></div>
    <button @click="previewMode = !previewMode" v-if="previewMode">
      Return
    </button>
    <button @click="previewMode = !previewMode" v-else>Preview</button>
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
button {
  display: none;
}
@media screen and (max-width: 1000px) {
  section {
    grid-template-columns: 1fr;
  }
  section > * {
    grid-area: 1/1;
    max-width: calc(100vw - 16px);
  }
  section > div {
    overflow: hidden;
  }
  button {
    display: block;
    position: fixed;
    right: 8px;
    margin: 8px;
    font-size: 1rem;
    opacity: 0.5;
    font-weight: 600;
    transition: 0.3s all;
    line-height: 1.5rem;
    top: 54px;
    color: #1a1a1a;
    background: #42b883;
    border: none;
    z-index: 1000;
  }
  :is(button:hover, button:focus) {
    opacity: 1;
  }
}
</style>
