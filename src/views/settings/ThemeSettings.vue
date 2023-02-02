<script setup lang="ts">
import { ref } from "vue";
import { getLocal } from "@/helpers";
import type { UserConfig } from "env";
import emitter from "@/emitter";

import ButtonLarge from "@/components/buttons/ButtonLarge.vue";

const themes = [
  "Nord",
  "Vue",
  "Dracula",
  "Ballerini",
  "GruvBox",
  "Origamid",
  "Default",
];

const onClick = (theme: string) => {
  emitter.emit("UPDATE_USER_CONFIG", { theme });
  activeTheme.value = theme;
};
const activeTheme = ref(getLocal<UserConfig>("config").theme);
</script>

<template>
  <div class="settings">
    <article>
      <h1>Theme</h1>
      <ul class="grid">
        <li v-for="theme in themes" :key="theme">
          <ButtonLarge
            @click="onClick(theme)"
            :class="{
              active: theme.toLowerCase() == activeTheme.toLocaleLowerCase(),
            }"
            >{{ theme }}</ButtonLarge
          >
        </li>
      </ul>
    </article>
  </div>
</template>
<style scoped>
button.active {
  background: var(--mint);
}
</style>
