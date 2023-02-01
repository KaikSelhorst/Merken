<script setup lang="ts">
import ButtonLarge from "@/components/buttons/ButtonLarge.vue";
import emitter from "@/emitter";

const themes = ["Nord", "Vue", "Dracula", "Ballerini", "GruvBox", "Origamid"];

const onClick = (theme: string) => {
  emitter.emit("UPDATE_USER_CONFIG", { theme });
};
</script>

<template>
  <div class="settings">
    <article>
      <h1>Theme</h1>
      <ul class="grid">
        <li v-for="theme in themes" :key="theme">
          <ButtonLarge @click="onClick(theme)">{{ theme }}</ButtonLarge>
        </li>
      </ul>
    </article>
  </div>
</template>
