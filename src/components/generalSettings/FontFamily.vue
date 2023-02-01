<script setup lang="ts">
import { onMounted, ref } from "vue";
import emitter from "@/emitter";
import type { UserConfig } from "env";
import { getLocal } from "@/helpers";
import { familys } from "@/user/methods";

import MediumTitle from "../MediumTitle.vue";
import ButtonLarge from "@/components/buttons/ButtonLarge.vue";
import ButtonCustom from "../buttons/ButtonCustom.vue";

const onClick = (family: string) => {
  emitter.emit("UPDATE_USER_CONFIG", { family });
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
    <MediumTitle icon="font">Font-Family</MediumTitle>
    <ul id="family-list" class="grid">
      <li v-for="family in familys" :key="family">
        <ButtonLarge
          @click="onClick(family)"
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
button.active {
  background: var(--mint);
}
</style>
