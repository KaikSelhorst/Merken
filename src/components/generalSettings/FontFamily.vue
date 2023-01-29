<script setup lang="ts">
import emitter from "@/emitter";

import type { UserConfig } from "env";
import { getLocal } from "@/helpers";

import SecondaryTitle from "../SecondaryTitle.vue";
import ButtonLarge from "@/components/ButtonLarge.vue";

const handleFamilyButtons = () => {
  const btns = document.querySelectorAll<HTMLElement>("#family-list button");
  if (btns) btns.forEach((btn) => btn.classList.remove("active"));
};

const onClick = (event: Event) => {
  const element = event.currentTarget;
  handleFamilyButtons();
  if (element && element instanceof HTMLElement) {
    element.classList.add("active");
    emitter.emit("UPDATE_USER_CONFIG", { family: element.innerHTML });
  }
};

const fontFamily = [
  "Roboto Mono",
  "Segoe UI",
  "Fira Code",
  "IBM Plex Mono",
  "JetBrains Mono",
  "Source Code Pro",
  "Roboto",
  "Ubuntu",
  "Helvetica",
  "Custom",
];
const { family: initialFamily } = getLocal<UserConfig>("config");
</script>

<template>
  <div>
    <SecondaryTitle icon="font">Font-Family</SecondaryTitle>
    <ul id="family-list">
      <li v-for="family in fontFamily" :key="family">
        <ButtonLarge
          @click="onClick"
          :class="{ active: family === initialFamily }"
        >
          {{ family }}
        </ButtonLarge>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  --columns: 4;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  margin-top: 32px;
  gap: 16px;
}
@media (max-width: 980px) {
  ul {
    --columns: 3;
  }
}
@media (max-width: 700px) {
  ul {
    --columns: 2;
  }
}
@media (max-width: 380px) {
  ul {
    --columns: 1;
  }
}
button.active {
  background: var(--mint);
}
</style>
