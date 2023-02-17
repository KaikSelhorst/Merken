<script setup lang="ts">
import emitter from "@/emitter";
import ButtonSmall from "../buttons/ButtonSmall.vue";
import MediumTitle from "../MediumTitle.vue";

import type { UserConfig } from "env";
import { getLocal } from "@/helpers";
import { ref } from "vue";
import { captalize } from "@/helpers";

const options = ["default", "cicle", "roman"];

const setType = (style: string) => {
  emitter.emit("UPDATE_USER_CONFIG", { styleItem: style });
  activeType.value = style;
};

const activeType = ref(getLocal<UserConfig>("config").styleItem);
</script>

<template>
  <div>
    <MediumTitle icon="palette">Change style of the Workspace Icon</MediumTitle>
    <ul>
      <li v-for="option in options" :key="option">
        <span>{{ captalize(option) }}</span>
        <ButtonSmall @click="setType('default')" v-if="option === activeType" class="active">
          <FontAwesome icon="close" />
        </ButtonSmall>
        <ButtonSmall @click="setType(option)" v-else>
          <FontAwesome icon="check" />
        </ButtonSmall>
      </li>
    </ul>
  </div>
</template>
<style scoped>
ul {
  margin: 1rem 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

li+li {
  margin-top: 0.75rem;
}

button.active {
  background: var(--primary);
  color: var(--button-color);
}
</style>
