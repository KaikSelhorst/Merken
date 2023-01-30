<script setup lang="ts">
import { onMounted } from "vue";
import emitter from "@/emitter";
import type { UserConfig } from "env";
import { getLocal } from "@/helpers";

import SecondaryTitle from "../SecondaryTitle.vue";
import ButtonLarge from "@/components/ButtonLarge.vue";
import ButtonCustom from "../ButtonCustom.vue";

const handleFamilyButtons = () => {
  const btns = document.querySelectorAll<HTMLElement>("#family-list button");
  if (btns) btns.forEach((btn) => btn.classList.remove("active"));
};

const onClick = (event: Event) => {
  const element = event.currentTarget;
  if (element && element instanceof HTMLElement) {
    emitter.emit("UPDATE_USER_CONFIG", { family: element.innerHTML });
  }
};
const handleEventChange = (family: unknown) => {
  if (!(typeof family === "string")) return;
  handleFamilyButtons();
  if (fontFamily.includes(family)) {
    const activeEl = document.getElementById(family);
    if (activeEl) activeEl.classList.add("active");
  } else emitter.emit("FAMILY_IS_CUSTOM", family);
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
];
emitter.on("FAMILY_HAS_CHANGED", handleEventChange);

const { family: initialFamily } = getLocal<UserConfig>("config");
onMounted(() => handleEventChange(initialFamily));
</script>

<template>
  <div>
    <SecondaryTitle icon="font">Font-Family</SecondaryTitle>
    <ul id="family-list">
      <li v-for="family in fontFamily" :key="family">
        <ButtonLarge @click="onClick" :id="family">
          {{ family }}
        </ButtonLarge>
      </li>
      <li>
        <ButtonCustom />
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
