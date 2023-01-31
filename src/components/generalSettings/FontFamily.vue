<script setup lang="ts">
import { onMounted, ref } from "vue";
import emitter from "@/emitter";
import type { UserConfig } from "env";
import { getLocal } from "@/helpers";
import { familys } from "@/user/methods";

import SecondaryTitle from "../SecondaryTitle.vue";
import ButtonLarge from "@/components/ButtonLarge.vue";
import ButtonCustom from "../ButtonCustom.vue";

const onClick = (event: Event) => {
  const element = event.currentTarget;
  if (element && element instanceof HTMLElement) {
    emitter.emit("UPDATE_USER_CONFIG", { family: element.innerHTML });
  }
};
const handleEventChange = (family: unknown) => {
  if (typeof family === "string") {
    activeFamily.value = family;
    if (!familys.includes(family)) isCustom(true);
    else isCustom(false);
  }
};
const isCustom = (state: boolean) => {
  emitter.emit("FAMILY_IS_CUSTOM", state);
};

emitter.on("FAMILY_HAS_CHANGED", handleEventChange);
let activeFamily = ref(getLocal<UserConfig>("config").family);
onMounted(() => {
  if (!familys.includes(activeFamily.value)) isCustom(true);
});
</script>

<template>
  <div>
    <SecondaryTitle icon="font">Font-Family</SecondaryTitle>
    <ul id="family-list">
      <li v-for="family in familys" :key="family">
        <ButtonLarge
          @click="onClick"
          :id="family"
          :class="{ active: family === activeFamily }"
        >
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
