<script setup lang="ts">
import { marked } from "marked";
import { computed } from "vue";
import "../assets/github-markdown.css";

const props = defineProps(["content"]);
const tranformMarkdown = computed(() => marked.parse(props.content));
</script>

<template>
  <div v-html="tranformMarkdown" class="markdown-body"></div>
</template>

<style scoped>
div {
  border: 1px solid rgba(84, 84, 84, 0.48);
  padding: 8px 12px;
  border-radius: 2px;
}
</style>
